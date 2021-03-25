//Required libraries

//npm install config
//npm install JSFORCE
//npm install read-excel-file
//npm install exceljs

const CONFIG = require('config');
const JSFORCE = require('jsforce');
const SALESFORCE_CONFIG = CONFIG.get('salesForce');
const READLINE = require("readline");

//Create excel file to log all the errors;
const EXCELJS = require('exceljs');
let workbook = new EXCELJS.Workbook();
let worksheet = workbook.addWorksheet("Errors");
worksheet.columns = [
    { header: "Error on", key: "errorOn" },
    { header: "Error Message", key: "errorMessage" },
    { header: "Error field", key: "errorField" },
];

//module import
const metadataMapping = require('./utilities/metadata-mapping');

let conn;
let totalMetadata =  [];
let objectName;
let fileName;

class Field {
    constructor(type, label, apiName, length, precision, decimalPlaces, description,  helpText,
                required, unique, externalId,  startingNumber, picklistValues, displayFormat,               
                defaultValue, latLongNotation, visibleLines) {

        this.type = type;
        this.label = label;
        this.apiName = apiName;     
        this.length = length;
        this.precision = precision;
        this.decimalPlaces = decimalPlaces;
        this.description = description;
        this.helpText = helpText;      
        this.required = required;
        this.unique = unique;
        this.externalId = externalId;
        this.startingNumber = startingNumber;
        this.picklistValues = picklistValues;
        this.displayFormat = displayFormat;
        this.defaultValue = defaultValue;
        this.latLongNotation = latLongNotation;
        this.visibleLines = visibleLines;
    
    }
}
function main() {
  const rl = READLINE.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    "What's the object API name? (including __c): ",
    function (object) {
      objectName = object;
      rl.question("What's your excel file name?: ", function (file) {
        fileName = file;
        rl.close();
      });
    }
  );

  rl.on("close", function () {
    conn = new JSFORCE.Connection({
      loginUrl: SALESFORCE_CONFIG.LoginUrl,
    });

    conn
      .login(
        SALESFORCE_CONFIG.User,
        SALESFORCE_CONFIG.Password + SALESFORCE_CONFIG.SecurityToken
      )
      .then(() => {
        console.log("Logged in correctly!");

        getFieldsExcel(fileName)
        .then( () => {
          console.log('Finished... creating file');
          writeFile();
          console.log('File created!');
        });
        
      })
      .catch((error) => {
        console.log("Error is " + error);
        //Log error
        worksheet.addRow({
          errorOn: "On reading connecting",
          errorMessage: error,
        });
      });

  });

}

async function getFieldsExcel(fileName){

    console.log('Getting fields from excel');
    const xlsxFile = require('read-excel-file/node');  

    let fields = [];
    let filePath = './'+fileName+'.xlsx';

    await xlsxFile(filePath)
    .then( async (rows) => {
       
        for(row of rows){
            let type = row[0];
            let label = row[1];
            let apiName = row[2];            
            let length = row[3];
            let precision = row[4];
            let decimalPlaces = row[5];
            let description = row[6];
            let helpText = row[7];
            let required = row[8];
            let unique = row[9];
            let externalId = row[10];
            let startingNumber = row[11];
            let picklistValues = row[12];
            let displayFormat = row[13];
            let defaultValue = row[14];
            let latLongNotation = row[15];
            let visibleLines = row[16];

            let field = new Field(type, label, apiName, length, precision, decimalPlaces, description,  helpText,
                                    required, unique, externalId, startingNumber, picklistValues, displayFormat,               
                                    defaultValue, latLongNotation, visibleLines);
            fields.push(field);
        }

        //Remove first element (the header)
        fields.shift();
        console.log('Get fields finished!');

        //Wait for the fields to be created and when finished, continue
        await createFields(fields)
        .then( async () => {         

            //Check if any fields have been inserted, otherwise we stop the process
            if(!totalMetadata.length){
              // writeFile();
              return;
            } 
            
            console.log('Gettings profiles');

            //Wait for the profiles to be queried, when finished, continue
            await queryProfiles()
            .then( async (profiles) => {            
                //Wait for the profiles to be updated, when finished, continue
                console.log('Profiles fetched!');
                await updateProfiles(profiles)
                .then(() => {
                  console.log('Profiles updated! ');
                });
            })
            .catch( (error) => {
                worksheet.addRow({
                    errorOn: "On querying profiles",
                    errorMessage: error,
                  }); 
            })  
        })

    })
    .catch( (error) => {
        console.log('Error when reading the excel file ' + error);
        worksheet.addRow({
          errorOn: "On reading excel file",
          errorMessage: error,
        });
    })

} 

function createFields(fields){
  // Process in pararel all fields
  let promises = fields.map(createField);
  return Promise.all(promises);
}

//It will perform a connection to API, so async it should be
function createField(field) {

  // let metadata = autoNumberMetadata(field, objectName);
  let metadata = metadataMapping.generateMetadata(field, objectName);

  //Seems like using a list, maximum ten fields can be created
  //Returns a promise
  return conn.metadata.create('CustomField', metadata, function(err, result){

      if(err){
          console.log('Error on creation ' + err);
          //Log error
      }else{               
          if(result.success){                   
              console.log('Field created: ' + JSON.stringify(result));

              //If the field is created, then we add it to the list of total metadata
              totalMetadata.push(metadata); 
          }else{
              //Log error
              console.log('Error when creating the field ' + JSON.stringify(result));
              worksheet.addRow({
                  errorOn: "On creating field",
                  errorMessage: result.errors,
                  errorField: result.fullName,
                });
          }
      }
  });
}  

//It will perform a connection to API, so async it should be
function queryProfiles(){
    console.log('Querying profiles');
    //Return a promise
    return conn.query("SELECT Id, Name FROM Profile");
}
function updateProfiles(profiles){
	// Process in pararel all profiles
  let promises = profiles.records.map(updateProfile);
  return Promise.all(promises);
}
function updateProfile(profile) {
    
    let profileName;
    if( profile.Name === 'System Administrator'){
        profileName = 'Admin';
    }else if( profile.Name === 'Standard User'){    
        profileName = 'Standard';
    }else{
        profileName = profile.Name;
    }

    return conn.metadata.read('Profile', profileName)
    .then( function(profile) {

        if(profile.fieldPermissions == undefined) return;
        
        let updateProfile = false;

        try{
    
          //Get only not required fields since required ones will have the permission updated correctly
          let relevantFields = totalMetadata.filter(met => {
              return !met.required || met.required == undefined;                
          }).map( met => met.fullName);

          for(let i=0; i<profile.fieldPermissions.length; i++){
                  
              for(relevantField of relevantFields){
                  if(profile.fieldPermissions[i].field.startsWith(relevantField)){     
                      
                      updateProfile = true;
                      profile.fieldPermissions[i].editable = true;
                      profile.fieldPermissions[i].readable = true;

                  }
              }
          }

        } catch(error){
          console.log('Error ' + error);
          updateProfile = false;
        }

        if(!updateProfile) return null;

		    return profile;
    })
    .then(function(profile){ 

        if(profile == null || profile == undefined) return;

        let fullName = profile.fullName;
        
        return conn.metadata.update(
          "Profile",
          {
            fullName,
            fieldPermissions: profile.fieldPermissions,
          },
          function (err, result) {
            if (err) {
              console.log("Error on profile update: " + err);
            } else {
              console.log("Profile updated: " + JSON.stringify(result));
            }
          }
        );
    })
}
function writeFile(){
    workbook.xlsx.writeFile("Errors.xlsx");
}

//Execute main function
main();