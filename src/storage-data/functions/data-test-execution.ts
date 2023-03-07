import { dataTestExecution, scenarioTags } from "../../shared/variables";
import dataTestExecutionLocals from "../../../reports/dataTestExecutionObjects.json";
import dataTestExecutionLocalsPROD from "../../../reports/dataTestExecutionObjectsPROD.json";
import { getTestingEnvironment, logWarningMessage } from "../../shared/functions";
import { compareDesc } from "date-fns";
const fs = require('fs');

// Get Data Test Execution Objects
export function loadDataTestExecution() {
    if (__dirname.includes("jenddkins")) {
        // Waiting for DevOp support to store file on cloud
    }
    else {
        let environment = getTestingEnvironment();
        let data;
        if (environment.localeCompare("staging")===0){
            data = dataTestExecutionLocals;
        }else{
            data = dataTestExecutionLocalsPROD;
        }
        for (let i = 0; i < data.length; i++) {
            if (data[i].id.localeCompare([...scenarioTags][0]) === 0) {
                dataTestExecution.data = data[i].data;
                dataTestExecution.description = data[i].description;
                dataTestExecution.id = data[i].id;
                dataTestExecution.name = data[i].name;
                dataTestExecution.updatedDate = data[i].updatedDate;
                return true;
            }
        }
    }
    logWarningMessage(`dataTestExecution with id = "${[...scenarioTags][0]}" has NOT saved before!`);
    resetDataTestExecution();
    dataTestExecution.id = [...scenarioTags][0] || "UndefinedTags";
    return false;
}

// Get Data Test Execution Objects
export function loadDataTestExecutionById(id: string) {
    if (__dirname.includes("jenddkins")) {
        // Waiting for DevOp support to store file on cloud
    }
    else {
        let environment = getTestingEnvironment();
        let data;
        if (environment.localeCompare("staging")===0){
            data = dataTestExecutionLocals;
        }else{
            data = dataTestExecutionLocalsPROD;
        }
        for (let i = 0; i < data.length; i++) {
            if (data[i].id.localeCompare(id) === 0) {
                dataTestExecution.data = data[i].data;
                dataTestExecution.description = data[i].description;
                dataTestExecution.id = data[i].id;
                dataTestExecution.name = data[i].name;
                dataTestExecution.updatedDate = data[i].updatedDate;
                return true;
            }
        }
    }
    logWarningMessage(`dataTestExecution has NOT contained element with id = "${id}"!`);
    return false;
}

// Store Data Test Execution to local or cloud when running on Jenkins
export function storeDataTestExecution() {
    let dataTestExecutions: any = dataTestExecutionLocals;
    if (__dirname.includes("jenddkins")) {
        // Waiting for DevOp support to store file on cloud
    }
    else {
        const storeData = (data, path) => {
            try {
                fs.writeFileSync(path, JSON.stringify(data, null, 4));
            } catch (error) {
                console.error(error);
            }
        }
        dataTestExecution.updatedDate = (new Date()).toUTCString();
        dataTestExecutions = pushObjectToArrayWithUniqueId(dataTestExecution, dataTestExecutions);
        dataTestExecutions = removeDuplicateDataTestExecutionById(dataTestExecutions);
        let environment = getTestingEnvironment();
        if (environment.localeCompare("staging")===0){
            storeData(dataTestExecutions, "./reports/dataTestExecutionObjects.json");
        }else{
            storeData(dataTestExecutions, "./reports/dataTestExecutionObjectsPROD.json");
        }
           
    }
}

// Reset Data Test Execution to null
export function resetDataTestExecution() {
    dataTestExecution.data = [
        {
            "key": "",
            "value": ""
        }
    ];
    dataTestExecution.id = "";
    dataTestExecution.description = "";
    dataTestExecution.name = "";
}


// dataTestExection to array with Unique ID
function pushObjectToArrayWithUniqueId(object: any, arrayObject: any) {
    for (let i = 0; i < arrayObject.length; i++) {
        if (object.id.localeCompare(arrayObject[i].id) === 0) {
            arrayObject[i] = object;
            return arrayObject;
        }
    }
    arrayObject.push(object);
    return arrayObject;
}

// Search dataTestExecution with key
export function getValueDataOfDataTestExecution(nameKey: string) {
    const data = dataTestExecution.data;
    for (var i = 0; i < data.length; i++) {
        if (data[i].key === nameKey) {
            return data[i].value;
        }
    }
    return "";
}

// Pust object data array of DataTestExecution with Unique key
export function pushObjectToDataArrayWithUniqueKey(key: string, value: any) {
    const strValue = value.toString();
    for (let i = 0; i < dataTestExecution.data.length; i++) {
        if (dataTestExecution.data[i].key.localeCompare(key) === 0) {
            dataTestExecution.data[i].value = strValue;
            return;
        }
    }
    // Remove first element if key = ""
    if (!dataTestExecution.data[0].key) {
        dataTestExecution.data.shift();
    }
    dataTestExecution.data.push({ "key": key, "value": strValue });
}

function compareDataTestExecutionById(a: any, b: any) {
    return a.id.localeCompare(b.id);
}

function sortDataTestExecutionById(arrayObjects: any) {
    if (arrayObjects) {
        arrayObjects.sort(compareDataTestExecutionById);
    }
    return arrayObjects;
}

/**
 * 
 * @param arrayObjects 
 * @returns array DataTestExecution with the last element has unique id
 */
function removeDuplicateDataTestExecutionById(arrayObjects: any) {
    arrayObjects = sortDataTestExecutionById(arrayObjects);
    let results: any = [];
    results.push(arrayObjects[0]);
    for (let i = 1; i < arrayObjects.length; i++) {
        let lastResult = results[results.length - 1];
        let objectTemp = arrayObjects[i];
        if (lastResult.id.localeCompare(objectTemp.id) === 0) {
            let dateLastResult = new Date(lastResult.updatedDate);
            let dateObjectTemp = new Date(objectTemp.updatedDate);
            if (compareDesc(dateLastResult, dateObjectTemp) === 1) {
                lastResult = objectTemp;
            }
        }
        else {
            results.push(objectTemp);
        }
    }
    return results;
}