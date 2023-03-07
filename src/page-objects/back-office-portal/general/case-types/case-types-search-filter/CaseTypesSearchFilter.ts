// generate by MappingPage
import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";
export class CaseTypesSearchFilter extends BasePage {
    locInputFilterCaseTypeName: By = By.xpath(`//app-case-type-filter//input[contains(@id,'pgs-case-type-filter-name')]`);
    locInputFilterCaseTypeCode: By = By.xpath(`//app-case-type-filter//input[contains(@id,'pgs-case-type-filter-code')]`);
    locInputFilterWorkflow: By = By.xpath(`//app-case-type-filter//input[contains(@id,'pgs-case-type-filter-workflow-id')]`);
    locInputFilterQueue: By = By.xpath(`//app-case-type-filter//input[contains(@id,'pgs-case-type-filter-queue-id')]`);
    locNgselectSelectWorkflow: By = By.xpath(`//app-case-type-filter//ng-select[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"select workflow")]`);
    locNgselectSelectQueue: By = By.xpath(`//app-case-type-filter//ng-select[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"select queue")]`);
    locButtonSearch: By = By.xpath(`//app-case-type-filter//button[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"search")]`);
    locButtonSave: By = By.xpath(`//app-case-type-filter//button[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"save")]`);
    locButtonClear: By = By.xpath(`//app-case-type-filter//button[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"clear")]`);
    locLabelCaseTypeName: By = By.xpath(`//app-case-type-filter//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"case type name")]`);
    locLabelCaseTypeCode: By = By.xpath(`//app-case-type-filter//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"case type code")]`);
    locLabelWorkflow: By = By.xpath(`//app-case-type-filter//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"workflow")]`);
    locLabelQueue: By = By.xpath(`//app-case-type-filter//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"queue")]`);

    async setInputSearchFilter(fieldName, value) {
        switch (fieldName) {
            case "CaseTypeCode":
                await this.setInputFilterCaseTypeCode(value)
                return true
            case "CaseTypeName":
                await this.setInputFilterCaseTypeName(value)
                return true
            case "Workflow":
                await this.setNgselectSelectWorkflow(value)
                return true
            case "Queue":
                await this.setNgselectSelectQueue(value)
                return true
            default:
                return false
        }
    }

    async setInputFilterCaseTypeName(value) {
        try {
            let ele = await this.getFieldType(this.locInputFilterCaseTypeName);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputFilterCaseTypeCode(value) {
        try {
            let ele = await this.getFieldType(this.locInputFilterCaseTypeCode);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputFilterWorkflow(value) {
        try {
            let workflow = By.xpath(`//span[text()="${value}"]`)
            let ele = await this.getFieldType(this.locInputFilterWorkflow);
            await ele.setValue(value);
            await this.waitPageProgressCompleted()
            await this.waitForAppear(workflow)
            await ele.pressEnter()
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputFilterQueue(value) {
        try {
            let queue = By.xpath(`//span[text()="${value}"]`)
            let ele = await this.getFieldType(this.locInputFilterQueue);
            await ele.setValue(value);
            await this.waitPageProgressCompleted()
            await this.waitForAppear(queue)
            await ele.pressEnter()
            await this.waitPageProgressCompleted()
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    async setNgselectSelectWorkflow(value) {
        try {
            let ele = await this.getFieldType(this.locNgselectSelectWorkflow);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setNgselectSelectQueue(value) {
        try {
            let ele = await this.getFieldType(this.locNgselectSelectQueue);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async clickButtonSearch() {
        try {
            let ele = await this.getFieldType(this.locButtonSearch);
            await ele.click();
            await this.waitPageProgressCompleted();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async clickButtonSave() {
        try {
            let ele = await this.getFieldType(this.locButtonSave);
            await ele.click();
            await this.waitPageProgressCompleted();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async clickButtonClear() {
        try {
            let ele = await this.getFieldType(this.locButtonClear);
            await ele.click();
            await this.waitPageProgressCompleted();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

}   