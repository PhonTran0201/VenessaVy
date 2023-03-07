import { ValidateField } from "../../shared/classes";
import { logWarningMessage } from "../../shared/functions";
import { dataTestcase, scenarioTags } from "../../shared/variables";
const fs = require("fs");
// Store dataTestcase for debugging
export function storeDataTestCase() {
    const storeData = (data, path) => {
        try {
            fs.writeFileSync(path, JSON.stringify(data, null, 4));
        } catch (error) {
            console.error(error);
        }
    }
    if(dataTestcase.length !== 0){
        storeData(dataTestcase, `./src/storage-data/json-data-test-case/${[...scenarioTags][scenarioTags.size - 1]}.json`);
    }
}

export async function deleteAllOldFilesDataTestcase(): Promise<void> {
    await new Promise((resolve, reject) => {
        const dirname = './src/storage-data/json-data-test-case';
        fs.readdir(dirname, function (err, filenames) {
            if (err) {
                reject(err);
                return;
            }
            filenames
                .filter(filename => filename.startsWith('@'))
                .forEach(filename => {
                    fs.unlinkSync(`${dirname}/${filename}`);
                });
            resolve(undefined);
        });
    })
}

export function getDataTestCaseObjectByNameField(nameField: string) {
    for (let iterator of dataTestcase) {
        if(iterator.nameField.localeCompare(nameField) === 0){
            return iterator;
        }
    }
    logWarningMessage(`Get dataTestCase with nameField = "${nameField}" failed!`);
}
