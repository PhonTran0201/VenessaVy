// generate by MappingPage
import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";

export class SMSDetailForm extends BasePage {
    protected txtFrom: By = By.xpath(`//app-sms-detail//input[contains(@id,'pgs-sms-detail-from')]`);
    protected txtTo: By = By.xpath(`//app-sms-detail//input[contains(@id,'pgs-sms-detail-to')]`);
    protected txtCustomer: By = By.xpath(`//app-sms-detail//input[contains(@id,'pgs-sms-detail-cus-id')]`);
    protected txtMessage: By = By.xpath(`//app-sms-detail//textarea[contains(@id,'pgs-sms-detail-body')]`);
    protected btnCloseForm: By = By.xpath(`//app-sms-detail//button[contains(@id,'close-btn')]`);
    protected btnSend: By = By.xpath(`//app-sms-detail//button[contains(@id,'submit-sms-btn')]`);
    protected btnCancel: By = By.xpath(`//app-sms-detail//button[contains(@id,'close-modal-btn')]`);


    public async validateValueFrom(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.txtFrom);
            const actualValue = await this.driverService.getAttributeValue(this.txtFrom, 'value');
            return await this.driverService.validateRecord('Validate From!',
                [actualValue, expectedValue, 'Incorrect From!']);
        } catch (error) {
            console.log('validateValueFrom');
            console.log(error);
            return false;
        }
    }
    public async validateValueTo(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.txtTo);
            const actualValue = await this.driverService.getAttributeValue(this.txtTo, 'value');
            return await this.driverService.validateRecord('Validate To!',
                [actualValue, expectedValue, 'Incorrect To!']);
        } catch (error) {
            console.log('validateValueTo');
            console.log(error);
            return false;
        }
    }
    public async validateValueCustomer(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.txtCustomer);
            const actualValue = await this.driverService.getAttributeValue(this.txtCustomer, 'value');
            return await this.driverService.validateRecord('Validate Customer!',
                [actualValue, expectedValue, 'Incorrect Customer!']);
        } catch (error) {
            console.log('validateValueCustomer');
            console.log(error);
            return false;
        }
    }
    public async validateValueMessage(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.txtMessage);
            const actualValue = await this.driverService.getAttributeValue(this.txtMessage, 'value');
            return await this.driverService.validateRecord('Validate Message!',
                [actualValue, expectedValue, 'Incorrect Message!']);
        } catch (error) {
            console.log('validateValueMessage');
            console.log(error);
            return false;
        }
    }

    async pressCloseForm() {
        try {
            let ele = await this.getFieldType(this.btnCloseForm);
            await ele.click();
            await this.waitPageProgressCompleted();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async pressSendButton() {
        try {
            let ele = await this.getFieldType(this.btnSend);
            await ele.click();
            await this.waitPageProgressCompleted();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async pressCancelButton() {
        try {
            let ele = await this.getFieldType(this.btnCancel);
            await ele.click();
            await this.waitPageProgressCompleted();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}