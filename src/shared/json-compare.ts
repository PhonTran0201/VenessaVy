import { fail } from "assert";
import { forEach } from "lodash";

export function compareJson(jsonActual, jsonExpected, arrExcludeKeys) {
    try {
        let count = 0;
        for(var k in jsonExpected) {
            let keyActual: string = getKey(jsonActual, k);
            let keyExpected: string = getKey(jsonExpected, k);
            if (typeof jsonExpected[keyExpected] == "object" && (jsonExpected[keyExpected] !== null && jsonActual[keyActual] !== null))
                compareJson(jsonActual[keyActual], jsonExpected[keyExpected], arrExcludeKeys);
            else {
                if (String(jsonActual[keyActual]) === String(jsonExpected[keyExpected]) && (String(jsonActual[keyActual]) != 'null')) {
                    // pased
                    count++;
                } else {
                    //if (arrExcludeKeys.includes(keyActual)) {
                    if (arrExcludeKeys.some(x => x.toLowerCase() == keyActual.toLowerCase()) ||
                        arrExcludeKeys.some(x => x.toLowerCase() == keyExpected.toLowerCase())) {
                        continue; 
                    } else if (jsonActual[keyActual] || jsonExpected[keyExpected] )
                        fail(`Failed Actual ${k}: ${jsonActual[keyActual]}, Expected: ${jsonExpected[keyExpected]}`);
                }
            }
        }
        console.log(`Passed in JSON compare: ${count}`);
        return true;
    } catch (error) {
        fail(`Failed In JSON Compare: ${error}`);
        return false;
    }
}

export function getKey(object, key) {
    return String(Object.keys(object).find(k => k.toLowerCase() === key.toLowerCase()));
}