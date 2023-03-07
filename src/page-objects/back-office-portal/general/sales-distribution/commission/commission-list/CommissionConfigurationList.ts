import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../../core/BasePage";

export class CommissionConfigurationList extends BasePage {
    protected btnAdd: By = By.xpath(`//app-commission-list//button[contains(@id,'pgs-user-list-add-user-btn')]`);

    async pressAddButton() {
        try {
            let ele = await this.getFieldType(this.btnAdd);
            await ele.click();
            await this.waitPageProgressCompleted();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    public async pressEditCommissionByRow(positionRow = 1) {
        try {
            const btn = By.xpath(`//app-commission-list//tbody//tr[${positionRow}]//td[contains(@class,'action')]//button[./i[contains(@class,'edit')]]`);
            let ele = await this.getFieldType(btn);
            await ele.click();
            await this.waitPageProgressCompleted();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    public async pressDeleteCommissionByRow(positionRow = 1) {
        try {
            const btn = By.xpath(`//app-commission-list//tbody//tr[${positionRow}]//td[contains(@class,'action')]//button[./i[contains(@class,'trash')]]`);
            let ele = await this.getFieldType(btn);
            await ele.click();
            await this.waitPageProgressCompleted();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    //#region Validate value
    public async validateValueProductByRow(expectedValue: string, positionRow = 1) {
        try {
            const lbl = By.xpath(`//app-commission-list//tbody//tr[${positionRow}]//td[contains(@class,'product')]//*[text()]`);
            const element = await this.getFieldType(lbl);
            const actualValue = await element.getValue();
            return await this.driverService.validateRecord('Validate Product!',
                [actualValue, expectedValue, 'Incorrect Product!']);
        } catch (error) {
            console.log('validateValueProductByRow');
            console.log(error);
            return false;
        }
    }
    public async validateValuePipelineByRow(expectedValue: string, positionRow = 1) {
        try {
            const lbl = By.xpath(`//app-commission-list//tbody//tr[${positionRow}]//td[contains(@class,'pipeline')]//*[text()]`);
            const element = await this.getFieldType(lbl);
            const actualValue = await element.getValue();
            return await this.driverService.validateRecord('Validate Pipeline!',
                [actualValue, expectedValue, 'Incorrect Pipeline!']);
        } catch (error) {
            console.log('validateValuePipelineByRow');
            console.log(error);
            return false;
        }
    }
    public async validateValueStageByRow(expectedValue: string, positionRow = 1) {
        try {
            const lbl = By.xpath(`//app-commission-list//tbody//tr[${positionRow}]//td[contains(@class,'stage')]//*[text()]`);
            const element = await this.getFieldType(lbl);
            const actualValue = await element.getValue();
            return await this.driverService.validateRecord('Validate Stage!',
                [actualValue, expectedValue, 'Incorrect Stage!']);
        } catch (error) {
            console.log('validateValueStageByRow');
            console.log(error);
            return false;
        }
    }
    public async validateValueCommissionByRow(expectedValue: string, positionRow = 1) {
        try {
            const lbl = By.xpath(`//app-commission-list//tbody//tr[${positionRow}]//td[contains(@class,'commission')]//*[text()]`);
            const element = await this.getFieldType(lbl);
            const actualValue = await element.getValue();
            return await this.driverService.validateRecord('Validate Commission!',
                [actualValue, expectedValue, 'Incorrect Commission!']);
        } catch (error) {
            console.log('validateValueCommissionByRow');
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region get value
    public async getValueProductByRow(positionRow = 1) {
        try {
            const lbl = By.xpath(`//app-commission-list//tbody//tr[${positionRow}]//td[contains(@class,'product')]//*[text()]`);
            const element = await this.getFieldType(lbl);
            const actualValue = await element.getValue();
            return actualValue;
        } catch (error) {
            console.log('getValueProductByRow');
            console.log(error);
            return "";
        }
    }
    public async getValuePipelineByRow(positionRow = 1) {
        try {
            const lbl = By.xpath(`//app-commission-list//tbody//tr[${positionRow}]//td[contains(@class,'pipeline')]//*[text()]`);
            const element = await this.getFieldType(lbl);
            const actualValue = await element.getValue();
            return actualValue;
        } catch (error) {
            console.log('getValuePipelineByRow');
            console.log(error);
            return "";
        }
    }
    public async getValueStageByRow(positionRow = 1) {
        try {
            const lbl = By.xpath(`//app-commission-list//tbody//tr[${positionRow}]//td[contains(@class,'stage')]//*[text()]`);
            const element = await this.getFieldType(lbl);
            const actualValue = await element.getValue();
            return actualValue;
        } catch (error) {
            console.log('getValueStageByRow');
            console.log(error);
            return "";
        }
    }
    public async getValueCommissionByRow(positionRow = 1) {
        try {
            const lbl = By.xpath(`//app-commission-list//tbody//tr[${positionRow}]//td[contains(@class,'commission')]/span[text()]`);
            const element = await this.getFieldType(lbl);
            const actualValue = await element.getValue();
            return actualValue;
        } catch (error) {
            console.log('getValueCommissionByRow');
            console.log(error);
            return "";
        }
    }
    //#endregion
}