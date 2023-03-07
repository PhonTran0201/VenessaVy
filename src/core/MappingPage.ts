import * as fs from 'fs';
import { By, WebElement } from "selenium-webdriver";
import { capitalizeWords } from '../shared/functions';
import { ACTION } from "./action.";
import { BasePage } from "./BasePage";
import { DebugElement } from "./fields/DebugElement";
import { DropdownFieldManager } from "./fields/DropdownFieldManager";
export interface FieldMaper {
    locator: By;
    action: ACTION;
    value: string;
    wait: boolean;
    ignoreIfNotFound: boolean;
}

export class MappingPage extends BasePage {
    modal = {};
    private readonly arrTags = [
        "//h1",
        "//h2",
        "//a",
        "//input",
        "//textarea",
        "//select",
        "//ng-select",
        "//button",
        "//label",
        "//ul/li",
        "//img",
        "//table",
    ];
    async addToModal(fieldName: string, fieldMaper: FieldMaper) {
        this.modal[fieldName] = fieldMaper;
    }

    protected async addModalMapArray(arr) {
        await arr.forEach(async item => {
            await this.addToModal(item[0], { locator: item[1], action: item[2], value: item[3], wait: item[4], ignoreIfNotFound: item[5] });
        });
    }

    private capitalizeFirstLetter(string) {
        let r = string.charAt(0).toUpperCase() + string.slice(1);
        return r.replace(/[^a-zA-Z0-9 ]/g, '').replace(' ', '');
    }

    async populate() {
        for (let key in this.modal) {
            if (this.modal[key].value === undefined) {
                throw new Error(`Missing field data in master_data.json: ${key}`);
            }
            const fieldMaper = await (this.modal[key] as FieldMaper);
            try {
                const ele = await this.getFieldType(fieldMaper.locator);
                console.info(`Found element: ${key}...`);
                //await console.time();
                switch (Number(fieldMaper.action)) {
                    case ACTION.CLICK:
                        await ele.click();
                        break;
                    case ACTION.INPUT:
                        await ele.setValue(fieldMaper.value);
                        break;
                    case ACTION.SELECT:
                        await (ele as DropdownFieldManager).clickItem(By.css("div.ng-dropdown-panel-items"), fieldMaper.value);
                        break;
                    default:
                        break;
                }
            } catch (e) {
                //if (this.modal[key].ignoreIfNotFound && (e as Error))
                throw new Error(`Couldn't excute action ${ACTION[fieldMaper.action]} for field ${key} (${fieldMaper.locator}) with data ${fieldMaper.value}: ${(e as Error).message}. \r\n${(e as Error).stack}`);
            } finally {
                if (fieldMaper.wait) {
                    await this.waitPageProgressCompleted();
                }
            }
            //await console.timeEnd();
        }
    }

    /**
     * Sort array le
     * @param arrayElements [{"element": any, "x": x, "y":y},...]
     */
    private async sortArrayElements(arrayElements: any) {
        let len = await arrayElements.length;
        arrayElements = arrayElements.sort(function (a, b) {
            return a.y - b.y;
        });
        for (let i = 0; i < len - 1; i++) {
            for (let j = i + 1; j < len; j++) {
                if (arrayElements[i].y === arrayElements[j].y) {
                    if (arrayElements[i].x > arrayElements[j].x) {
                        let temp = arrayElements[i];
                        arrayElements[i] = arrayElements[j];
                        arrayElements[j] = temp;
                    }
                }
            }
        }
        return arrayElements;
    }

    // scan from root node and generate script POM
    async scan(rootNode = "", generate = true) {
        try {
            const arrResult: string[] = [];
            const dictResult = {};
            let count = 0;
            let elements: any[] = [];
            for (const locator of this.arrTags) {
                let elementsTemp = await this.driverService.findElements(By.xpath(rootNode + locator));
                elements = elements.concat(elementsTemp);
            }

            let arrayElements: any[] = [];
            for (const iterator of elements) {
                if (await iterator.getTagName() === 'input' && (await iterator.getAttribute("autocomplete")).length > 0) {
                    continue;
                }
                const x = (await iterator.getRect()).x;
                const y = (await iterator.getRect()).y;
                arrayElements.push({ "element": iterator, "x": x, "y": y });
            }

            arrayElements = await this.sortArrayElements(arrayElements);

            for (let elementTemp of arrayElements) {
                let element: WebElement = elementTemp.element;
                let cssClass = await element.getAttribute("class");
                //let name = await element.getAttribute("name");
                let tagName = await element.getTagName();
                let value = await element.getAttribute("value");
                let text = await element.getText();
                let title = await element.getAttribute("title");
                let id = await element.getAttribute("id");
                let formcontrolname = await element.getAttribute("formcontrolname");
                let displayed = await element.isDisplayed();
                if (displayed) {
                    let xpath: string = "";
                    let key: string = "";
                    if (id) {
                        key = tagName + id;
                        xpath = `${rootNode}//${tagName}[contains(@id,'${id}')]`;
                    } else if (title) {
                        key = tagName + this.capitalizeFirstLetter(title.trim());
                        xpath = `${rootNode}//${tagName}[contains(translate(@title,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"${title.trim().toLowerCase()}")]`;
                    } else if (tagName === "table") {
                        key = tagName;
                        xpath = `${rootNode}//div[contains(@class,'table-responsive')]/table`;
                    } else if (text && text.length < 50) {
                        key = tagName + this.capitalizeFirstLetter(text.trim());
                        xpath = `${rootNode}//${tagName}[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"${text.trim().toLowerCase()}")]`;
                    } else if (value) {
                        key = tagName + this.capitalizeFirstLetter(value);
                        xpath = `${rootNode}//${tagName}[contains(.,'${value.trim()}')]`;
                    } else if (formcontrolname) {
                        key = tagName + this.capitalizeFirstLetter(formcontrolname.trim());
                        xpath = `${rootNode}//${tagName}[contains(translate(@formcontrolname,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"${formcontrolname.trim().toLowerCase()}")]`;
                    }
                    else {
                        continue;
                    }
                    try {
                        const listItems = await this.driverService.findElements(By.xpath(xpath));
                        if (listItems.length == 1 || key != "table") {
                            count++;
                            console.log(`Found ${count}: ${xpath}`);
                            await DebugElement.getInstance().highlight(this.driverService, By.xpath(xpath), 0, "border: 3px dotted #AAFF00;");
                            arrResult.push(xpath);
                            dictResult[key] = xpath;
                        }
                    } catch { }
                }
            };

            if (generate) {
                await this.generateScript(dictResult);
            }
        } catch (error) {
            throw error;
        }
    }

    private async generateFile(path, data) {
        await fs.writeFileSync(path, data);
        await console.log(`Generated ${data.length}`);
    }

    private async generateScript(dictResult) {
        // generate page object model
        const title = await this.getDriverService().getDriver().getTitle();
        let locators = "";
        let methods = "";

        //await Object.entries(dictResult).forEach(
        for (let k in dictResult) {
            let v = dictResult[k];
            k = capitalizeWords(k.replace(/-/g, " ")).replace(/ /g, "");
            let locatorTemplate = ``;
            if (v.includes("label")) {
                k = k.replace("Label", 'lbl');
                locatorTemplate = `protected ${k} = By.xpath(\`` + v + `\`);`;
            }
            else if (v.includes("button")) {
                k = k.replace("Button", 'btn');
                locatorTemplate = `protected ${k} = By.xpath(\`` + v + `\`);`;
            }
            else if (v.includes("input")) {
                k = k.replace("Input", 'txt');
                locatorTemplate = `protected ${k} = By.xpath(\`` + v + `\`);`;
            }
            else if (v.includes("textarea")) {
                k = k.replace("Textarea", 'txt');
                locatorTemplate = `protected ${k} = By.xpath(\`` + v + `\`);`;
            }
            else {
                locatorTemplate = `protected ${k} = By.xpath(\`` + v + `\`);`;
            }
            locators += `${locatorTemplate}\r`;
            let methodTemplate = '';
            if ((v as string).includes("button")) {
                let keyTemp = k.replace('btn', 'Button');
                methodTemplate = `
async click${keyTemp}() {
    try {
        let ele = await this.getFieldType(this.${k});
        await ele.click();
        await this.waitPageProgressCompleted();
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}`;
            } else if ((v as string).includes("input") || (v as string).includes("select") || (v as string).includes("ng-select") || (v as string).includes("textarea")) {
                methodTemplate = `
async set${k}(value) {
    try {
        if(!value){
            console.log("The value of ${k} is undefined");
            return;
        }
        let ele = await this.getFieldType(this.${k});
        await ele.setValue(value);
    } catch (error) {
        console.log(error);
        throw error;
    }
}
async validate${k}(expectedValue) {
    try {
        let ele = await this.getFieldType(this.${k});
        let actualValue = await ele.getValue();
        return await this.driverService.validateRecord("Validate ${k}",
        [actualValue, expectedValue, "Incorrect ${k}"]);
    } catch (error) {
        console.log(error);
        return false;
    }
}`;
            } else if ((v as string).includes("table")) {
                methodTemplate = `
async clickTblRowAction${k}(value, actionIndex = 0) {
    try {
        let ele = await this.getFieldType(this.loc${k});
        await (ele as TableManager).clickRowActionEleByIndex(value, actionIndex);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
async getTableElement() {
    try {
        let ele = await this.getFieldType(this.loc${k});
        return await (ele as TableManager);
    } catch (error) {
        console.log(error);
        return undefined;
    }
}
async getTableTotalRecords() {
    try {
        let ele = await this.getFieldType(this.loc${k});
        const count = await (ele as TableManager).getRowCount();
        return count;
    } catch (error) {
        console.log(error);
        return -1;
    }
}
async selectTableRowByText(value) {
    try {
      let eleTable = await this.getFieldType(this.loc${k});
      await (eleTable as TableManager).setCheckboxStateByValue(value);
      return true;
    } catch (error) {
      console.log('selectTableByText');
      console.log(error);
      return false;
    }
}
async isTableContainsText(name) {
    try {
        let eleTable = await this.getFieldType(this.loc${k});
        const ele = await (eleTable as TableManager).findRowElementByValue(name);
        if (!ele) return false;
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}`;
            }
            methods += `${methodTemplate} \r\n`;
        }
        let POM = `// generate by MappingPage
import { By } from "selenium-webdriver";
import { BasePage } from "../../core/BasePage";
import { TableManager } from "../../core/fields/TableManager";
export class ${this.capitalizeFirstLetter(title)} extends BasePage {
    ${locators}\r\n
    ${methods}\r\n
}`;
        // save to file
        await this.generateFile(`./GENERATE_SCRIPT.ts`, POM);
        await this.generateCucumberSteps("./GENERATE_STEPS.ts", methods);

    }

    private async generateCucumberSteps(outPut: string, methods: string) {
        const arrayMethods = methods.split("\n");
        let arrayTemp: string[] = [];
        for(const i of arrayMethods){
            if(i.includes("async")){
                arrayTemp.push(i);
            }    
        }
        arrayTemp = arrayTemp.sort();

        let temp: string = `
import { When } from "@cucumber/cucumber";
import { logFailTestcase } from "./src/shared/functions";
import { SeleniumWebDriverService } from "./src/core/selenium-webdriver.service";
import { DataRepo } from "./src/core/modals/data_repo";
When("", async function (dataKey) {
    try {
        const data = await DataRepo.getInstance().getFieldValue(dataKey);
        const page = new QuoteCreateFritidshusPage(SeleniumWebDriverService.getInstance());\n`;
        for (const i of arrayTemp) {
            temp += "\t" + i.replace("async ", "await page.").replace(" {", ";").replace("value", "data.") + "\n";
        }
        temp += `
    } catch (error) {
        logFailTestcase(false, (error as Error).message + "\\r\\n" + (error as Error).stack);
    }
});`;
        await this.generateFile(outPut, temp);
    }
}