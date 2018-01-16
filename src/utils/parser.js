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

    if(isNumber(startSymbol) || startSymbol === '-') {
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
    let str = "";

    for(let i = startPosition; i < text.length; i++) {
        if(text[i] === " " || text[i] === ';' || text[i] === '\n') {
            break;
        }

        str += text[i];
    }

    if(str === 'null') {
        return null; //Ooooops...
    }

    return str === 'true';
}

function parseInteger(text, startPosition) {
    let str = "";

    if(text[startPosition] === '-') {
        str += '-';
        startPosition++;
    }

    for(let i = startPosition; i < text.length; i++) {
        if(!isNumber(text[i])) {
            break;
        }

        str += text[i];
    }

    if(str === '') {
        return 0;
    }

    return parseInt(str, 10);
}

function parseString(text, startPosition) {
    let resultString = "";
    let escape = false;
    const stringSymbol = text[startPosition]; //Check ' or "

    for(let i = startPosition + 1; i < text.length; i++) {
        if(text[i] === stringSymbol && !escape) {
            break;
        }

        escape = text[i] === '\\' && !escape;
        resultString += text[i];
    }

    return resultString;
}

function parseArray(text, startPosition) {
    let resultArray = [];

    let bracketsCount = 1;
    let arrayStr = "";

    for(let i = startPosition + 1; i < text.length; i++) {
        const currentSymbol = text[i];

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
    arrayStr = arrayStr.replace(new RegExp('\/\\*(.*)\\*\/', 'g'), '');
    arrayStr = arrayStr.replace(new RegExp('\/\/(.*?)$', 'gm'), '');
    arrayStr = arrayStr.trim();

    if(arrayStr.length === 0) {
        return [];
    }

    let start = 0;

    const specialOpen = ["\"", "[", "{"];
    const specialClose = ["\"", "]", "}"];
    let escape = false;
    let stack = [];

    for(let i = 0; i < arrayStr.length; i++) {
        const currentSymbol = arrayStr[i];

        if(currentSymbol === ' ') {
            continue;
        }

        escape = currentSymbol === '\\' && !escape;

        const openInd = specialOpen.indexOf(currentSymbol);
        const closeInd = specialClose.indexOf(currentSymbol);
        if(openInd !== -1 && !escape) {
            stack.push(currentSymbol);
        }
        
        if(closeInd !== -1 && !escape) {
            stack.splice(stack.length - 1, 1);
        }

        if((currentSymbol === ',' || i === arrayStr.length - 1) && stack.length === 0) {
            const value = parseValue(arrayStr.substring(start, i !== arrayStr.length - 1 ? i : arrayStr.length).trim(), 0);
            resultArray.push(value);            
            start = i + 1;
        }
    }

    return resultArray;
}

function parseObject(text, startPosition) { 
    let resultObject = {};

    let objectStr = "";
    let bracketsCount = 1;

    for(let i = startPosition + 1; i < text.length; i++) {
        const currentSymbol = text[i];

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
    objectStr = objectStr.replace(new RegExp('\/\\*(.*)\\*\/', 'g'), '');
    objectStr = objectStr.replace(new RegExp('\/\/(.*?)$','gm'), '');
    objectStr = objectStr.trim();


    let start = 0;
    let pos = objectStr.indexOf(":", start);

    if(pos === -1) {
        return {};
    }

    const specialOpen = ["\"", "[", "{"];
    const specialClose = ["\"", "]", "}"];
    let escape = false;
    let stack = [];
        
    for(let i = pos; i < objectStr.length; i++) {
        const currentSymbol = objectStr[i];

        if(currentSymbol === ' ') {
            continue;
        }

        escape = currentSymbol === '\\' && !escape;

        const openInd = specialOpen.indexOf(currentSymbol);
        const closeInd = specialClose.indexOf(currentSymbol);
        if(openInd !== -1 && !escape) {
            stack.push(currentSymbol);
        }

        if(closeInd !== -1 && !escape) {
            stack.splice(stack.length - 1, 1);
        }

        if((currentSymbol === ',' || i === objectStr.length - 1) && stack.length === 0) {
            const keyValue = parseKeyValue(objectStr.substring(start, i !== objectStr.length - 1 ? i : objectStr.length).trim());
            resultObject[keyValue.key] = keyValue.value;
            start = i + 1;
        }
    }

    return resultObject;
}

function parseKeyValue(strPair) {
    const index = strPair.indexOf(":");

    if(index === -1) {
        return null;
    }

    const key = strPair.substring(0, index).replace(/"/g, '').trim();
    const strValue = strPair.substring(index + 1, strPair.length).trim();
    const value = parseValue(strValue, 0);

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