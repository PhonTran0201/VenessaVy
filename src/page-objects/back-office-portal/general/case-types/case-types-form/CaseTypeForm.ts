// generate by MappingPage
import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";
import { selectDropdownOption_v2, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";
export class CaseTypeForm extends BasePage {
    locInputCaseTypeCode: By = By.xpath(`//app-case-type-form//input[contains(@id,'pgs-case-form-case-type-value')]`);
    locInputCaseTypeName: By = By.xpath(`//app-case-type-form//input[contains(@id,'pgs-case-form-case-type-name')]`);
    locInputWorkflow: By = By.xpath(`//app-case-type-form//input[contains(@id,'pgs-case-form-case-type-workflow-id')]`);
    locInputQueue: By = By.xpath(`//app-case-type-form//input[contains(@id,'pgs-case-form-case-type-queue-id')]`);
    locNgselectSelectWorkflow: By = By.xpath(`//app-case-type-form//ng-select[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"select workflow")]`);
    locNgselectSelectQueue: By = By.xpath(`//app-case-type-form//ng-select[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"select queue")]`);
    locButtonSave: By = By.xpath(`//app-case-type-form//button[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"save")]`);
    locButtonpgstaskpercancel: By = By.xpath(`//app-case-type-form//button[contains(@id,'pgs-task-per-cancel')]`);
    locLabelCaseTypeCode: By = By.xpath(`//app-case-type-form//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"case type code *")]`);
    locLabelCaseTypeName: By = By.xpath(`//app-case-type-form//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"case type name *")]`);
    locLabelWorkflow: By = By.xpath(`//app-case-type-form//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"workflow *")]`);
    locLabelQueue: By = By.xpath(`//app-case-type-form//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"queue")]`);


    async setInputCaseTypeCode(value) {
        try {
            await this.waitForAppear(this.locInputCaseTypeCode)
            let ele = await this.getFieldType(this.locInputCaseTypeCode);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputCaseTypeName(value) {
        try {
            let ele = await this.getFieldType(this.locInputCaseTypeName);
            await ele.click()
            await ele.clearValue()
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputWorkflow(value) {
        try {
            let workflow = By.xpath(`//span[text()="${value}"]`)
            let ele = await this.getFieldType(this.locInputWorkflow);
            await ele.setValue(value);
            await this.waitPageProgressCompleted()
            await this.waitForAppear(workflow)
            await ele.pressEnter()
            await this.waitPageProgressCompleted()
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputQueue(value) {
        try {
            let queue = By.xpath(`//span[text()="${value}"]`)
            let ele = await this.getFieldType(this.locInputQueue);
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
            let ele = await this.getFieldType(this.locInputQueue);
            await ele.setValue(value);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await selectDropdownOption_v2(value,"", this.driverService)
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

    async clickButtonpgstaskpercancel() {
        try {
            let ele = await this.getFieldType(this.locButtonpgstaskpercancel);
            await ele.click();
            await this.waitPageProgressCompleted();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }






}