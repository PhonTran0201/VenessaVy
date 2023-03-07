import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";

export class SMSList extends BasePage{
    protected strRootXpath = "";
    protected btnSendSMS = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//*[contains(local-name(),'sms-list')]//button[@id='send-sms-btn']`);

    //#region Validate value
    public async validateValueFrom(expectedValue: string, positionRow = 1){
        try {
            const lbl = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//*[contains(local-name(),'sms-list')]//tbody//tr[${positionRow}]/td[1]/span`);
            const element = await this.getFieldType(lbl);
            const actualValue = await element.getValue();
            return await this.driverService.validateRecord('Validate From!',
                [actualValue, expectedValue, 'Incorrect From!']);
        } catch (error) {
            console.log('validateValueFrom');
            console.log(error);
            return false;
        }
    }
    public async validateValueTo(expectedValue: string, positionRow = 1){
        try {
            const lbl = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//*[contains(local-name(),'sms-list')]//tbody//tr[${positionRow}]/td[2]/span`);
            const element = await this.getFieldType(lbl);
            const actualValue = await element.getValue();
            return await this.driverService.validateRecord('Validate To!',
                [actualValue, expectedValue, 'Incorrect To!']);
        } catch (error) {
            console.log('validateValueTo');
            console.log(error);
            return false;
        }
    }
    public async validateValueMessage(expectedValue: string, positionRow = 1){
        try {
            const lbl = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//*[contains(local-name(),'sms-list')]//tbody//tr[${positionRow}]/td[3]//*[text()]`);
            const element = await this.getFieldType(lbl);
            const actualValue = await element.getValue();
            return await this.driverService.validateRecord('Validate Message!',
                [actualValue, expectedValue, 'Incorrect Message!']);
        } catch (error) {
            console.log('validateValueMessage');
            console.log(error);
            return false;
        }
    }
    public async validateValueSendDate(expectedValue: string, positionRow = 1){
        try {
            const lbl = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//*[contains(local-name(),'sms-list')]//tbody//tr[${positionRow}]/td[4]/span`);
            const element = await this.getFieldType(lbl);
            const actualValue = await element.getValue();
            return await this.driverService.validateRecord('Validate SendDate!',
                [actualValue, expectedValue, 'Incorrect SendDate!']);
        } catch (error) {
            console.log('validateValueSendDate');
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region
    public async openSMSDetailByMessage(messageContent: string){
        try {
            const lbl = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//*[contains(local-name(),'sms-list')]//tbody//tr[1]/td[3]//*[text()]`);
            const element = await this.getFieldType(lbl);
            await element.click();
            return true;
        } catch (error) {
            console.log('openSMSDetail');
            console.log(error);
            return false;
        }
    }

    public async pressSendSMSButton(){
        try {
            const element = await this.getFieldType(this.btnSendSMS);
            await element.click();
            return true;
        } catch (error) {
            console.log('pressSendSMSButton');
            console.log(error);
            return false;
        }
    }
    //#endregion
}