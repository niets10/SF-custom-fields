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

module.exports = { autoNumberMetadata };