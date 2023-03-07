import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../../core/BasePage";
import { logWarningMessage, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../../shared/functions";

export class SuggestionList extends BasePage{
    protected btnRefresh = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[@id='pgs-refresh-household-suggestions']`);
    public async pressRefreshButton(){
        try {
            const element = await this.getFieldType(this.btnRefresh);
            await element.click();
            return true;
        } catch (error) {
            console.log('pressRefreshButton');
            console.log(error);
            return false;
        }
    }

    public async pressCreateButtonByRow(positionRow = 1){
        try {
            const btn = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]/td/app-household-suggestion-members-cell//button[.//*[text()='Create ']]`);
            await this.driverService.waitUntilElementVisible(btn);
            await this.driverService.click(btn);
            return true;
        } catch (error) {
            console.log('pressCreateButtonByRow');
            console.log(error);
            return false;
        }
    }

    public async pressCreateButtonByAddress(address){
        try {
            const btn = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[.//div[text()='${address}']]/td/app-household-suggestion-members-cell//button[.//*[text()='Create ']]`);
            await this.driverService.waitUntilElementVisible(btn);
            await this.driverService.click(btn);
            return true;
        } catch (error) {
            console.log('pressCreateButtonByAddress');
            console.log(error);
            return false;
        }
    }

    public async validateValueAddressByRow(expectedValue: string, positionRow = 1){
        try {
            const lbl = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]/td/app-household-address-cell//*[text()]`);
            await this.driverService.waitUntilElementVisible(lbl);
            const actualValue = await this.driverService.getText(lbl);
            return await this.driverService.validateRecord('Validate Address!',
                [actualValue, expectedValue, 'Incorrect Address!']);
        } catch (error) {
            console.log('validateValueAddressByRow');
            console.log(error);
            return false;
        }
    }
 
    public async validateValueMemberByRow(expectedValue: string, positionRow = 1, positionMember = 1){
        try {
            const lbl = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//app-household-suggestion-members-cell//li[${positionMember}]//a`);
            await this.driverService.waitUntilElementVisible(lbl);
            const actualValue = await this.driverService.getText(lbl);
            return await this.driverService.validateRecord('Validate Member!',
                [actualValue, expectedValue, 'Incorrect Member!']);
        } catch (error) {
            console.log('validateValueMemberByRow');
            console.log(error);
            return false;
        }
    }
    
    public async checkMemberExistByRow(expectedValue: string, positionRow = 1){
        try {
            const lbl = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//app-household-suggestion-members-cell//li//a[text()=' ${expectedValue} ']`);
            await this.driverService.waitUntilElementVisible(this.btnRefresh);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            return await this.driverService.isExisted(lbl);
        } catch (error) {
            console.log('checkMemberExistByRow');
            console.log(error);
            return false;
        }
    }

    public async getIndexMemberByName(positionRow = 1, memberName: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.btnRefresh);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            for(let i = 1; i <= 20; i++){
                const lbl = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//app-household-suggestion-members-cell//li[${i}]//a[text()=' ${memberName} ']`);
                if(await this.driverService.isExisted(lbl)){
                    return i;
                }
            }
            logWarningMessage(`Not found any member with name "${memberName}" at row "${positionRow}"`);
           return -1;
        } catch (error) {
            console.log('getIndexMemberByName');
            console.log(error);
            return -1;
        }
    }

    public async checkStatusExistByMemberName(positionRow = 1, memberName: string, statusName: string){
        try {
            await this.driverService.waitUntilElementVisible(this.btnRefresh);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            const index = await this.getIndexMemberByName(positionRow, memberName);
            const status = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//app-household-suggestion-status-cell/div[${index}][./div[text()=' ${statusName} '] or .//span[1][text()='${statusName} ']]`);
            return await this.driverService.isExisted(status);
        } catch (error) {
            console.log('checkStatusExistByMemberName');
            console.log(error);
            return false;
        }
    }

    public async pressConnectButtonByMemberName(positionRow = 1, memberName: string){
        try {
            await this.driverService.waitUntilElementVisible(this.btnRefresh);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);

            const index = await this.getIndexMemberByName(positionRow, memberName);
            const btn = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//app-household-suggestion-status-cell/div[${index}]//button[.//span[text()='Connect ']]`);
            await this.driverService.click(btn);
            return true;
        } catch (error) {
            console.log('pressConnectButtonByMemberName');
            console.log(error);
            return false;
        }
    }

}