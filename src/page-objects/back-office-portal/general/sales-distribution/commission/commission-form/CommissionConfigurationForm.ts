import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../../core/BasePage";
import { defaultTimeOut } from "../../../../../../shared/constants";
import { waitUntilHorizontalProgressBarLoaded_v2, selectDropdownOption, selectDropdownOption_v2 } from "../../../../../../shared/functions";

export class CommissionConfigurationForm extends BasePage {
    protected cmbProduct: By = By.xpath(`//app-commission-form//input[contains(@id,'productId')]`);
    protected cmbPipeline: By = By.xpath(`//app-commission-form//input[contains(@id,'pipelineCode')]`);
    protected cmbStage: By = By.xpath(`//app-commission-form//input[contains(@id,'stageId')]`);
    protected txtCommission: By = By.xpath(`//app-commission-form//input[contains(@id,'commission')]`);

    protected cmbProductValue: By = By.xpath(`//app-commission-form//ng-select[.//input[contains(@id,'productId')]]//span[contains(@class,'ng-value-label')]`);
    protected cmbPipelineValue: By = By.xpath(`//app-commission-form//ng-select[.//input[contains(@id,'pipelineCode')]]//span[contains(@class,'ng-value-label')]`);
    protected cmbStageValue: By = By.xpath(`//app-commission-form//ng-select[.//input[contains(@id,'stageId')]]//span[contains(@class,'ng-value-label')]`);

    //#region Input value
    public async inputProduct(value: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.cmbProduct);
            await this.driverService.setText(this.cmbProduct, value);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await selectDropdownOption(value, '', this.driverService);
            return true;
        } catch (error) {
            console.log('');
            console.log(error);
            return false;
        }
    }
   
    public async inputPipeline(value: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.cmbPipeline);
            await this.driverService.setText(this.cmbPipeline, value);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await selectDropdownOption(value, '', this.driverService);
            return true;
        } catch (error) {
            console.log('inputPipeline');
            console.log(error);
            return false;
        }
    }

    public async selectTheOtherExistingPipeline() {
        try {
            await this.driverService.waitUntilElementVisible(this.cmbPipeline);
            await this.driverService.click(this.cmbPipeline);
            await this.driverService.pressDownCurrentElement();
            await this.driverService.pressEnterCurrentElement();
            return true;
        } catch (error) {
            console.log('selectTheOtherExistingPipeline');
            console.log(error);
            return false;
        }
    }
   
    public async inputStage(value: string, TimeOut = defaultTimeOut) {
        try {
            await this.driverService.waitUntilElementVisible(this.cmbStage, TimeOut);
            await this.driverService.setText(this.cmbStage, value);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await selectDropdownOption_v2(value, '', this.driverService);
            return true;
        } catch (error) {
            console.log('inputStage');
            console.log(error);
            return false;
        }
    }
   
    async inputCommisstion(value) {
        try {
            let ele = await this.getFieldType(this.txtCommission);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region Validate value
    public async validateValueProduct(expectedValue: string){
        try {
            await this.driverService.waitUntilElementVisible(this.cmbProductValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);            
            const actualValue = await this.driverService.getText(this.cmbProductValue);
            return await this.driverService.validateRecord('Validate Product!',
                [actualValue, expectedValue, 'Incorrect Product!']);
        } catch (error) {
            console.log('validateValueProduct');
            console.log(error);
            return false;
        }
    }
    public async validateValuePipeline(expectedValue: string){
        try {
            await this.driverService.waitUntilElementVisible(this.cmbPipelineValue);
            const actualValue = await this.driverService.getText(this.cmbPipelineValue);
            return await this.driverService.validateRecord('Validate Pipeline!',
                [actualValue, expectedValue, 'Incorrect Pipeline!']);
        } catch (error) {
            console.log('validateValuePipeline');
            console.log(error);
            return false;
        }
    }
    public async validateValueStage(expectedValue: string){
        try {
            await this.driverService.waitUntilElementVisible(this.cmbStageValue);
            const actualValue = await this.driverService.getText(this.cmbStageValue);
            return await this.driverService.validateRecord('Validate Stage!',
                [actualValue, expectedValue, 'Incorrect Stage!']);
        } catch (error) {
            console.log('validateValueStage');
            console.log(error);
            return false;
        }
    }
    public async validateValueCommission(expectedValue: string){
        try {
            const element = await this.getFieldType(this.txtCommission);
            const actualValue = await element.getValue();
            return await this.driverService.validateRecord('Validate Commission!',
                [actualValue, expectedValue, 'Incorrect Commission!']);
        } catch (error) {
            console.log('validateValueCommission');
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region Check field exist
    public async isStageValueExisted(){
        try {
            await this.driverService.waitUntilElementVisible(this.cmbStage);
            return await this.driverService.isExisted(this.cmbStageValue);
        } catch (error) {
            console.log('isStageValueExisted');
            console.log(error);
            return false;
        }
    }
    //#endregion
}