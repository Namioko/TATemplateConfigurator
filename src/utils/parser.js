//TODO: Refactoring
export function extractVariable(text, varName) {
    var result = text.match(new RegExp('static\\s+(var|const)\\s+' + varName + '\\s+=\\s+'));

    if(!result) {
        return null;
    }

    var startPos = result.index + result[0].length;
    
    return parseValue(text, startPos);
}

function parseValue(text, startPos) {
    var startSymbol = text[startPos];

    if(isLetter(startSymbol)) {
        return parseBoolean(text, startPos);
    }

    if(isNumber(startSymbol)) {
        return parseInteger(text, startPos);
    }

    if(startSymbol === '"' || startSymbol === '\'') {
        return parseString(text, startPos);
    }

    if(startSymbol === '[') {
        return parseArray(text, startPos);
    }

    if(startSymbol === '{') {
        return parseObject(text, startPos);
    }

    return null;
}

function parseBoolean(text, startPosition) {
    var str = "";

    for(var i = startPosition; i < text.length; i++) {
        if(text[i] === " " || text[i] === ';' || text[i] === '\n') {
            break;
        }

        str += text[i];
    }

    return str === 'true';
}

function parseInteger(text, startPosition) {
    var str = "";

    for(var i = startPosition; i < text.length; i++) {
        if(!isNumber(text[i])) {
            break;
        }

        str += text[i];
    }

    if(str === '') {
        return 0;
    }

    return parseInt(str);
}

function parseString(text, startPosition) {
    var resultString = "";
    var escape = false;
    var stringSymbol = text[startPosition]; //Check ' or "

    for(var i = startPosition + 1; i < text.length; i++) {
        if(text[i] == stringSymbol && !escape) {
            break;
        }

        escape = text[i] === '\\' && !escape;
        resultString += text[i];
    }

    return resultString;
}

function parseArray(text, startPosition) {
    var resultArray = [];

    var bracketsCount = 1;
    var arrayStr = "";

    for(var i = startPosition + 1; i < text.length; i++) {
        var currentSymbol = text[i];

        if(currentSymbol === '[') {
            bracketsCount++;
        }

        if(currentSymbol === ']') {
            bracketsCount--;
        }
        
        if(bracketsCount === 0) {
            break;
        }

        arrayStr += currentSymbol;
    }
    
    //Remove comments
    arrayStr = arrayStr.replace(new RegExp('\/\\*(.*)\\*\/', 'gs'), '');
    arrayStr = arrayStr.replace(new RegExp('\/\/(.*?)$','gm'), '');
    arrayStr = arrayStr.trim();

    if(arrayStr.length === 0) {
        return [];
    }

    var start = 0;

    var specialOpen = ["\"", "[", "{"];
    var specialClose = ["\"", "]", "}"];
    var escape = false;
    var stack = [];

    for(var i = 0; i < arrayStr.length; i++) {
        var currentSymbol = arrayStr[i];

        if(currentSymbol === ' ') {
            continue;
        }

        escape = currentSymbol === '\\' && !escape;

        var openInd = specialOpen.indexOf(currentSymbol);
        var closeInd = specialClose.indexOf(currentSymbol);
        if(openInd !== -1 && !escape) {
            stack.push(currentSymbol);
        }
        
        if(closeInd !== -1 && !escape) {
            stack.splice(stack.length - 1, 1);
        }

        if((currentSymbol === ',' || i === arrayStr.length - 1) && stack.length === 0) {
            var value = parseValue(arrayStr.substring(start, i !== arrayStr.length - 1 ? i : arrayStr.length).trim(), 0);
            resultArray.push(value);            
            start = i + 1;
        }
    }

    return resultArray;
}

function parseObject(text, startPosition) { 
    var resultObject = {};

    var objectStr = "";
    var bracketsCount = 1;

    for(var i = startPosition + 1; i < text.length; i++) {
        var currentSymbol = text[i];

        if(currentSymbol === "{") {
            bracketsCount++;
        }

        if(currentSymbol === "}") {
            bracketsCount--;
        }

        if(bracketsCount === 0) {
            break;
        }

        objectStr += currentSymbol;
    }

    //Remove comments
    objectStr = objectStr.replace(new RegExp('\/\\*(.*)\\*\/', 'gs'), '');
    objectStr = objectStr.replace(new RegExp('\/\/(.*?)$','gm'), '');
    objectStr = objectStr.trim();


    var start = 0;
    var pos = objectStr.indexOf(":", start);

    if(pos === -1) {
        return {};
    }

    var specialOpen = ["\"", "[", "{"];
    var specialClose = ["\"", "]", "}"];
    var escape = false;
    var stack = [];
        
    for(var i = pos; i < objectStr.length; i++) {
        var currentSymbol = objectStr[i];

        if(currentSymbol === ' ') {
            continue;
        }

        escape = currentSymbol === '\\' && !escape;

        var openInd = specialOpen.indexOf(currentSymbol);
        var closeInd = specialClose.indexOf(currentSymbol);
        if(openInd !== -1 && !escape) {
            stack.push(currentSymbol);
        }

        if(closeInd !== -1 && !escape) {
            stack.splice(stack.length - 1, 1);
        }

        if((currentSymbol === ',' || i === objectStr.length - 1) && stack.length === 0) {
            var keyValue = parseKeyValue(objectStr.substring(start, i !== objectStr.length - 1 ? i : objectStr.length).trim());
            resultObject[keyValue.key] = keyValue.value;
            start = i + 1;
        }
    }

    return resultObject;
}

function parseKeyValue(strPair) {
    var index = strPair.indexOf(":");

    if(index === -1) {
        return null;
    }

    var key = strPair.substring(0, index).trim();
    var strValue = strPair.substring(index + 1, strPair.length).trim();
    var value = parseValue(strValue, 0);

    return {
        key: key,
        value: value
    }
}

function isLetter(str) {
    return str != null && str.length === 1 && str.match(/[a-z]/i);
}

function isNumber(str) {
    return '0123456789'.indexOf(str) !== -1;
}