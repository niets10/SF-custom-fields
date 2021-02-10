function generateMetadata(field, objectName) {

    let metadata;

    switch (field.type) {
        case 'AutoNumber':
            metadata = autoNumberMetadata(field, objectName);
            break;
        case 'Checkbox':
            metadata = checkboxMetadata(field, objectName);
            break;
        case 'Currency':
            metadata = currencyMetadata(field, objectName);
            break;
        case 'Date':
            metadata = dataDataTimeMetadata(field, objectName);
            break;
        case 'DateTime':
            metadata = dataDataTimeMetadata(field, objectName);
            break;
        case 'Email':
            metadata = emailMetadata(field, objectName);
            break;
        case 'Location':
            metadata = locationMetadata(field, objectName);
            break;
        case 'Number':
            metadata = numberMetadata(field, objectName);
            break;
        case 'Percent':
            metadata = percentMetadata(field, objectName);
            break;
        case 'Phone':
            metadata = phoneMetadata(field, objectName);
            break;
        case 'Picklist':
            metadata = picklistMetadata(field, objectName);
            break;
        case 'MultiselectPicklist':
            metadata = multiPicklistMetadata(field, objectName);
            break;
        case 'Text':
            metadata = textMetadata(field, objectName);
            break;
        case 'TextArea':
            metadata = textAreaMetadata(field, objectName);
            break;
        case 'LongTextArea':
            metadata = longTextAreaMetadata(field, objectName);
            break;
        case 'Html':
            metadata = richTextAreaMetadata(field, objectName);
            break;
        case 'Time':
            metadata = timeMetadata(field, objectName);
            break;
        case 'Url':
            metadata = urlMetadata(field, objectName);
            break;

      }

    return metadata;
}

function autoNumberMetadata(field, objectName){
    let metadata = {
        type: field.type,
        label : field.label,
        fullName : objectName+"."+field.apiName,
        description: field.description !== null ? field.description : '',
        inlineHelpText : field.helpText !== null ? field.helpText : '',
        externalId : field.externalId,        
        startingNumber : field.startingNumber,
        displayFormat : field.displayFormat,
    } 
    return metadata;
}
function checkboxMetadata(field, objectName){
    let metadata = {
        type: field.type,
        label : field.label,
        fullName : objectName+"."+field.apiName,
        description: field.description !== null ? field.description : '',
        inlineHelpText : field.helpText !== null ? field.helpText : '',
        defaultValue : field.defaultValue
    }
    return metadata;
}
function currencyMetadata(field, objectName){
    let metadata = {
        type: field.type,
        label : field.label,
        fullName : objectName+"."+field.apiName,            
        precision: field.precision,
        scale: field.decimalPlaces,
        description: field.description !== null ? field.description : '',
        inlineHelpText : field.helpText !== null ? field.helpText : '',
        required : field.required
    }
    return metadata;
}
function dataDataTimeMetadata(field, objectName){
    let metadata = {
        type: field.type,
        label : field.label,
        fullName : objectName+"."+field.apiName,
        description: field.description !== null ? field.description : '',
        inlineHelpText : field.helpText !== null ? field.helpText : '',
        required : field.required
    }
    return metadata;
}
function emailMetadata(field, objectName){
    let metadata = {
        type: field.type,
        label : field.label,
        fullName : objectName+"."+field.apiName,
        description: field.description !== null ? field.description : '',
        inlineHelpText : field.helpText !== null ? field.helpText : '',
        required : field.required,
        unique: field.unique,
        externalId : field.externalId
    }
    return metadata;
}
function locationMetadata(field, objectName){

    let displayDecimals;
    if(field.latLongNotation == 'Decimals'){
        displayDecimals = true;
    }else if(field.latLongNotation == 'Degrees, minutes, seconds'){
        displayDecimals = false;
    }

    let metadata = {
        type: field.type,
        label : field.label,
        fullName : objectName+"."+field.apiName,
        scale: field.decimalPlaces,
        description: field.description !== null ? field.description : '',
        inlineHelpText : field.helpText !== null ? field.helpText : '',
        required : field.required,
        displayLocationInDecimal: displayDecimals
    }
    return metadata;
}
function numberMetadata(field, objectName){
    let metadata = {
        type: field.type,
        label : field.label,
        fullName : objectName+"."+field.apiName,            
        precision: field.precision,
        scale: field.decimalPlaces,
        description: field.description !== null ? field.description : '',
        inlineHelpText : field.helpText !== null ? field.helpText : '',
        required : field.required,
        unique: field.unique,
        externalId : field.externalId
    }
    return metadata;
}
function percentMetadata(field, objectName){
    let metadata = {
        type: field.type,
        label : field.label,
        fullName : objectName+"."+field.apiName,            
        precision: field.precision,
        scale: field.decimalPlaces,
        description: field.description !== null ? field.description : '',
        inlineHelpText : field.helpText !== null ? field.helpText : '',
        required : field.required
    }
    return metadata;
}
function phoneMetadata(field, objectName){
    let metadata = {
        type: field.type,
        label : field.label,
        fullName : objectName+"."+field.apiName,
        description: field.description !== null ? field.description : '',
        inlineHelpText : field.helpText !== null ? field.helpText : '',
        required : field.required
    }
    return metadata;
}
function picklistMetadata(field, objectName){
    let metadata = {
        type: field.type,
        label : field.label,
        fullName : objectName+"."+field.apiName,
        description: field.description !== null ? field.description : '',
        inlineHelpText : field.helpText !== null ? field.helpText : '',
        required : field.required,
        valueSet: field.picklistValues
    }
    return metadata;
}
function multiPicklistMetadata(field, objectName){
    let metadata = {
        type: field.type,
        label : field.label,
        fullName : objectName+"."+field.apiName,
        description: field.description !== null ? field.description : '',
        inlineHelpText : field.helpText !== null ? field.helpText : '',
        required : field.required,
        valueSet: field.picklistValues,
        visibleLines : field.visibleLines
    }
    return metadata;
}
function textMetadata(field, objectName){

    let metadata = {
        type: field.type,
        label : field.label,
        fullName : objectName+"."+field.apiName,            
        length: field.length,
        description: field.description !== null ? field.description : '',
        inlineHelpText : field.helpText !== null ? field.helpText : '',
        required : field.required,
        unique: field.unique,
        externalId : field.externalId,
    }
    return metadata;
}
function textAreaMetadata(field, objectName){
    let metadata = {
        type: field.type,
        label : field.label,
        fullName : objectName+"."+field.apiName,
        description: field.description !== null ? field.description : '',
        inlineHelpText : field.helpText !== null ? field.helpText : '',
        required : field.required
    }
    return metadata;
}
function longTextAreaMetadata(field, objectName){
    let metadata = {
        type: field.type,
        label : field.label,
        fullName : objectName+"."+field.apiName,            
        length: field.length,
        description: field.description !== null ? field.description : '',
        inlineHelpText : field.helpText !== null ? field.helpText : '',
        visibleLines : field.visibleLines,
    }
    return metadata;
}
function richTextAreaMetadata(field, objectName){
    let metadata = {
        type: field.type,
        label : field.label,
        fullName : objectName+"."+field.apiName,            
        length: field.length,
        description: field.description !== null ? field.description : '',
        inlineHelpText : field.helpText !== null ? field.helpText : '',
        visibleLines : field.visibleLines,
    }
    return metadata;
}
function timeMetadata(field, objectName){
    let metadata = {
        type: field.type,
        label : field.label,
        fullName : objectName+"."+field.apiName,
        description: field.description !== null ? field.description : '',
        inlineHelpText : field.helpText !== null ? field.helpText : '',
        required : field.required
    }
    return metadata;
}
function urlMetadata(field, objectName){
    let metadata = {
        type: field.type,
        label : field.label,
        fullName : objectName+"."+field.apiName,
        description: field.description !== null ? field.description : '',
        inlineHelpText : field.helpText !== null ? field.helpText : '',
        required : field.required
    }
    return metadata;
}

module.exports = { generateMetadata };