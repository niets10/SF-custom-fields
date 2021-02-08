function generateMetadata(field) {

    let metadata;

    


    return metadata;
}

function autoNumberMetadata(field, objectName){
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
    return metadata;
}

function checkboxMetadata(field, objectName){
    let metadata = {
        type: field.type,
        label : field.label,
        fullName : objectName+"."+field.apiName,
        description: field.description,
        inlineHelpText : field.helpText,
        defaultValue : field.defaultValue
    }
    return metadata;
}
function currencyMetadata(field, objectName){
    let metadata = {
        type: field.type,
        label : field.label,
        fullName : objectName+"."+field.apiName,            
        length: field.length,
        scale: field.decimalPlaces,
        description: field.description,
        inlineHelpText : field.helpText,
        required : field.required
    }
    return metadata;
}

function currencyMetadata(field, objectName){
    let metadata = {
        type: field.type,
        label : field.label,
        fullName : objectName+"."+field.apiName,            
        length: field.length,
        scale: field.decimalPlaces,
        description: field.description,
        inlineHelpText : field.helpText,
        required : field.required
    }
    return metadata;
}

function dataDataTimeMetadata(field, objectName){
    let metadata = {
        type: field.type,
        label : field.label,
        fullName : objectName+"."+field.apiName,
        description: field.description,
        inlineHelpText : field.helpText,
        required : field.required
    }
    return metadata;
}

function emailMetadata(field, objectName){
    let metadata = {
        type: field.type,
        label : field.label,
        fullName : objectName+"."+field.apiName,
        description: field.description,
        inlineHelpText : field.helpText,
        required : field.required,
        unique: field.unique,
        externalId : field.externalId
    }
    return metadata;
}

function locationMetadata(field, objectName){

    let displayDecimals;
    if(field.displayFormat === 'Decimals'){
        displayDecimals = true;
    }else if(field.displayFormat === 'Degrees, minutes, seconds'){
        displayDecimals = false;
    }

    let metadata = {
        type: field.type,
        label : field.label,
        fullName : objectName+"."+field.apiName,
        scale: field.decimalPlaces,
        description: field.description,
        inlineHelpText : field.helpText,
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
        length: field.length,
        scale: field.decimalPlaces,
        description: field.description,
        inlineHelpText : field.helpText,
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
        length: field.length,
        scale: field.decimalPlaces,
        description: field.description,
        inlineHelpText : field.helpText,
        required : field.required
    }
    return metadata;
}
function phoneMetadata(field, objectName){
    let metadata = {
        type: field.type,
        label : field.label,
        fullName : objectName+"."+field.apiName,
        description: field.description,
        inlineHelpText : field.helpText,
        required : field.required
    }
    return metadata;
}
function picklistMetadata(field, objectName){
    let metadata = {
        type: field.type,
        label : field.label,
        fullName : objectName+"."+field.apiName,
        description: field.description,
        inlineHelpText : field.helpText,
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
        description: field.description,
        inlineHelpText : field.helpText,
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
        description: field.description,
        inlineHelpText : field.helpText,
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
        description: field.description,
        inlineHelpText : field.helpText,
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
        description: field.description,
        inlineHelpText : field.helpText
    }
    return metadata;
}
function richTextAreaMetadata(field, objectName){
    let metadata = {
        type: field.type,
        label : field.label,
        fullName : objectName+"."+field.apiName,            
        length: field.length,
        description: field.description,
        inlineHelpText : field.helpText,
        visibleLines : field.visibleLines,
    }
    return metadata;
}
function timeMetadata(field, objectName){
    let metadata = {
        type: field.type,
        label : field.label,
        fullName : objectName+"."+field.apiName,
        description: field.description,
        inlineHelpText : field.helpText,
        required : field.required
    }
    return metadata;
}
function urlMetadata(field, objectName){
    let metadata = {
        type: field.type,
        label : field.label,
        fullName : objectName+"."+field.apiName,
        description: field.description,
        inlineHelpText : field.helpText,
        required : field.required
    }
    return metadata;
}

export { autoNumberMetadata, checkboxMetadata };