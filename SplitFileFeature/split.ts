import * as fs from 'fs';

const numberOfFileSplit = 6;

const storeData = (data, path) => {
    try {
        fs.writeFileSync(path, data, "utf8");
    } catch (error) {
        console.error(error);
    }
}

async function splitFile(numberOfFileFeatureToOutput: number) {
    const data = await fs.readFileSync("./input.feature", { encoding: 'utf8', flag: 'r' });
    const lines = data.split("\n");

    let arrayTestCase = [
        {
            "id": "",
            "Content": "",
            "isUsed": false
        }
    ]
    arrayTestCase.pop();

    let j = -1;

    for (let i = 3; i < lines.length; i++) {
        let line = lines[i] + "\n";
        if (line.includes("@TEST")) {
            const id = line.trim().split(" ")[0];
            j++;
            arrayTestCase.push({
                "id": id,
                "Content": line,
                "isUsed": false
            })
        }
        else {
            arrayTestCase[j].Content = arrayTestCase[j].Content + `${line}`;
        }
    }

    let arrayGroupIdTestCase = await groupIdTestCase(numberOfFileFeatureToOutput);
    console.log("\n- Test case in each files:");
    console.log(arrayGroupIdTestCase);


    for (const item of arrayGroupIdTestCase) {
        let titleFile = `${lines[0]}\n${lines[1]}${lines[2].trimEnd()}\n`;
        for (const id of item.value) {
            //Tìm test case với id
            let testCase = arrayTestCase.find(tc => tc.id.localeCompare(`@TEST_${id}`) === 0);
            // console.log(`\t${item.fileName}\t` + testCase?.id);
            if (testCase?.id) {
                titleFile += testCase.Content;
                testCase.isUsed = true;
            }
            else {
                console.warn(`\tTest case in priority: ${item.fileName} was missed test case ${id}`);
            }
        }

        storeData(titleFile, `./${item.fileName}`)
    }

    console.log("\n\n- Test case in file feature:");
    for (const tc of arrayTestCase) {
        if (tc.isUsed === false) {
            console.warn(`\t+ Test case ${tc.id} in file feature was missed after split!`);
        }
    }
}

async function groupIdTestCase(numberOfFileFeatureToOutput: number) {
    const data = await fs.readFileSync("./testCasePriority.txt", { encoding: 'utf8', flag: 'r' });
    const rows = data.split("\n");

    let totalTestCase = 0;

    let arrayGroupTestCase = [
        {
            "len": 0,
            "value": [""],
            "isUse": false
        }
    ]
    arrayGroupTestCase.pop();

    for (let row of rows) {
        let value: string[] = [];
        if (row.trim()) {
            const arrayId = row.split(",");
            for (const id of arrayId) {
                if (id.trim()) {
                    value.push(id.trim());
                }
            }
            const len = value.length;
            totalTestCase += len;
            arrayGroupTestCase.push({
                "len": len,
                "value": value,
                "isUse": false
            })
        }
    }
    arrayGroupTestCase.sort((a, b) => {
        return b.len - a.len;
    });

    let arrayOutPut = [
        {
            "fileName": "",
            "len": 0,
            "value": [""],
            "isUsed": false
        }
    ]
    arrayOutPut.pop();


    const numberOfTestcaseInFile = Math.floor(totalTestCase / numberOfFileFeatureToOutput);


    for (let i = 1; i <= numberOfFileFeatureToOutput; i++) {
        const fileName = `file_${i}.feature`;
        let value = [""];
        let len = 0;
        for (let j = 0; j < arrayGroupTestCase.length; j++) {
            let item = arrayGroupTestCase[j];
            if (item.isUse === false) {
                if (len === 0) {// Nếu file chưa có gì thì add group lớn bao nhiêu cũng đc
                    value = item.value;
                    item.isUse = true;
                    len = item.len;
                    j--;
                }
                else {// Nếu file đã có thì...
                    if (len + item.len <= numberOfTestcaseInFile) {
                        value = value.concat(item.value);
                        item.isUse = true;
                        len += item.len;
                    }
                }
            }
        }
        arrayOutPut.push({
            "fileName": fileName,
            "len": len,
            "value": value,
            "isUsed": false
        })
    }

    for (let item of arrayGroupTestCase) {
        if (!item.isUse) {
            arrayOutPut[numberOfFileFeatureToOutput - 1].value = arrayOutPut[numberOfFileFeatureToOutput - 1].value.concat(item.value);
            arrayOutPut[numberOfFileFeatureToOutput - 1].len += item.len;
        }
    }

    return arrayOutPut;
}
splitFile(numberOfFileSplit)