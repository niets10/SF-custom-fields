//Required libraries

//npm install config
//npm install jsforce
//npm install-excel-file

const config = require('config');
const jsforce = require('jsforce');
const salesforceConfig = config.get('salesForce');
const readline = require("readline");

let conn;
let totalMetadata =  [];

class Field {
    constructor(type, label, apiName, length, decimalPlaces, description,  helpText,
                required, unique, externalId,  startingNumber, picklistValues, displayFormat,               
                defaultValue, latLongNotation, visibleLines) {

        this.type = type;
        this.label = label;
        this.apiName = apiName;     
        this.length = length;
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

class Input {
    constructor(objectName, fileName){
        this.objectName = objectName;
        this.fileName = fileName;
    }
}

function main() {
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    let input = new Input();

    rl.question("What's the object API name? (including __c): ", function(objectName) {
        input.objectName = objectName;
        rl.question("What's your excel file name?: ", function(fileName) {
            input.fileName = fileName;
            rl.close();
        });
    });

    rl.on("close", function() {

        conn = new jsforce.Connection( {
            loginUrl: salesforceConfig.LoginUrl	
        });

        conn.login(salesforceConfig.User, salesforceConfig.Password, + salesforceConfig.SecuriyToken)
        .then( () => {
            console.log('Logged in correctly!');
            getFieldsExcel(input.objectName, input.fileName);

            }        
        )
        .catch( (error) => {
                    console.log('Error is ' + error);
                }
        )
    });

}


function getFieldsExcel(objectName, fileName){

    console.log('Getting fields from excel');
    const xlsxFile = require('read-excel-file/node');  

    let fields = [];
    let filePath = './'+fileName+'.xlsx';

    xlsxFile(filePath)
    .then((rows) => {
       
        for(row of rows){
            let type = row[0];
            let label = row[1];
            let apiName = row[2];            
            let length = row[3];
            let decimalPlaces = row[4];
            let description = row[5];
            let helpText = row[6];
            let required = row[7];
            let unique = row[8];
            let externalId = row[9];
            let startingNumber = row[10];
            let picklistValues = row[11];
            let displayFormat = row[12];
            let defaultValue = row[13];
            let latLongNotation = row[14];
            let visibleLines = row[15];

            let field = new Field(type, label, apiName, length, decimalPlaces, description,  helpText,
                                    required, unique, externalId,  startingNumber, picklistValues, displayFormat,               
                                    defaultValue, latLongNotation, visibleLines);
            fields.push(field);
        }

        //Remove first element (the header)
        fields.shift();
        createFields(fields, objectName);
    })

    .catch( (error) => {
        console.log('Error when reading the excel file ' + error);
    })

} 

function createFields(fields, objectName) {

    let objectField = objectName+"."+"AAField__c";
    
    for(field of fields) {       

        let metadata = autoNumberMetadata(field, objectName);

        totalMetadata.push(metadata);
    }

    conn.metadata.create('CustomField', totalMetadata, function(err, result){

        if(err){
            console.log('Error on creation ' + err);
        }else{
            console.log('Good result ' + JSON.stringify(result));
        }

    });

    console.log('Gettings profiles')

    queryProfiles()
    .then( (profiles) => {
        updateProfiles(profiles);
    })

}  

function queryProfiles(){
    return conn.query("SELECT Id, Name FROM Profile");
}

function updateProfiles(profiles){
	// Process in pararel all profiles
	return profiles.records.map(updateProfilePermission);
}

function updateProfilePermission(profile) {

    let profileName;

    if( profile.Name === 'System Administrator'){
        profileName = 'Admin';
    }else if( profile.Name === 'Standard User'){    
        profileName = 'Standard';
    }else{
        profileName = profile.Name;
    }

    return conn.metadata.read('Profile', profileName)
    .then(function(profile) {
     
        var updateProfile = false;
    
        //Get only not required fields since required ones will have the permission updated correctly
        let relevantFields = totalMetadata.filter(function(met){
            return !met.required;                
        }).map(function(met) {
            return met.fullName;
        });

        for(var i=0; i<profile.fieldPermissions.length; i++){
                
            for(relevantField of relevantFields){
                if(profile.fieldPermissions[i].field.startsWith(relevantField)){     
                    
                    updateProfile = true;

                    //Empty tab Visilibilites for not updating them since it was giving an error
                    // profile.tabVisibilities = [];
                    profile.fieldPermissions[i].editable = true;
                    profile.fieldPermissions[i].readable = true;

                }
            }
        }

        if(!updateProfile) return null;
		return profile;
    })
    .then(function(profile){ 

        let fullName = profile.fullName;
        
        return conn.metadata.update('Profile', {                
                fullName,
                fieldPermissions : profile.fieldPermissions
                
                }, function(err, result){

                if(err){
                    console.log('Error on update ' + err);
                }else{
                    console.log('Good result ' + JSON.stringify(result));
                }
        
        });
    });    

}

function autoNumberMetadata(field, objectName){

    console.log('Field ' + JSON.stringify(field));

    let metadata = {
        type: field.type,
        label : field.label,
        fullName : objectName+"."+field.apiName,
        description: field.description,
        inlineHelpText : field.helpText,
        externalId : field.externalId,        
        startingNumber : field.startingNumber,
        displayFormat : field.displayFormat,
    } 

    console.log('Metadata ' + JSON.stringify(metadata));

    return metadata;

}

//Execute main function
main();