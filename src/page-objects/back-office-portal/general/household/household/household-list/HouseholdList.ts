import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../../core/BasePage";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../../shared/functions";

export class HouseholdList extends BasePage {
    protected btnPointReport = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[@id='pgs-household-point-report']`);
    
    //#region Press button
    public async pressPointReportButton() {
        try {
            const element = await this.getFieldType(this.btnPointReport);
            await element.click();
            return true;
        } catch (error) {
            console.log('pressPointReportButton');
            console.log(error);
            return false;
        }
    }

    public async pressAddMemberButtonByRow(positionRow = 1) {
        try {
            const lbl = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//app-household-list-members-cell//button`);
            const element = await this.getFieldType(lbl);
            await element.click();
            return true;
        } catch (error) {
            console.log('pressAddMemberButtonByRow');
            console.log(error);
            return false;
        }
    }

    public async pressAddMemberButtonByAddress(Address: string) {
        try {
            const lbl = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[.//div[text()='${Address}']]//app-household-list-members-cell//button`);
            const element = await this.getFieldType(lbl);
            await element.click();
            return true;
        } catch (error) {
            console.log('pressAddMemberButtonByAddress');
            console.log(error);
            return false;
        }
    }

    public async pressRemoveButtonByRow(positionRow = 1, buttonIndex = 1) {
        try {
            const lbl = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//app-household-member-remove-cell//li[${buttonIndex}]//button`);
            const element = await this.getFieldType(lbl);
            await element.click();
            return true;
        } catch (error) {
            console.log('pressRemoveButtonByRow');
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region Validate value
    public async validateValueAddressByRow(expectedValue: string, positionRow = 1) {
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

    public async validateValueTotalPointsByRow(expectedValue: string, positionRow = 1) {
        try {
            const lbl = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]/td[contains(@class,'household-total-points-column')]//*[text()]`);
            await this.driverService.waitUntilElementVisible(lbl);
            const actualValue = await this.driverService.getText(lbl);
            return await this.driverService.validateRecord('Validate Address!',
                [actualValue, expectedValue, 'Incorrect Address!']);
        } catch (error) {
            console.log('validateValueTotalPointsByRow');
            console.log(error);
            return false;
        }
    }

    public async validateValueMemberByRow(expectedValue: string, positionRow = 1, positionMember = 1) {
        try {
            const lbl = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//app-household-list-members-cell//li[${positionMember}]//a`);
            await this.driverService.waitUntilElementVisible(lbl);
            const actualValue =   await this.driverService.getText(lbl);
            return await this.driverService.validateRecord('Validate Member!',
                [actualValue, expectedValue, 'Incorrect Member!']);
        } catch (error) {
            console.log('validateValueMemberByRow');
            console.log(error);
            return false;
        }
    }

    

    public async validateValuePointsByRow(expectedValue: string, positionRow = 1, positionMember = 1) {
        try {
            const lbl = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//app-household-member-points-cell//li[${positionMember}]//div`);
            const element = await this.getFieldType(lbl);
            const actualValue = await element.getText();
            return await this.driverService.validateRecord('Validate Points!',
                [actualValue, expectedValue, 'Incorrect Points!']);
        } catch (error) {
            console.log('validateValuePointsByRow');
            console.log(error);
            return false;
        }
    }
    //#endregion


    //#region Get Value
    public async getMemberByRow(positionRow = 1, positionMember = 1) {
        try {
            const lbl = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//app-household-list-members-cell//li[${positionMember}]//a`);
            await this.driverService.waitUntilElementVisible(lbl);
            const actualValue = await this.driverService.getText(lbl);
            return actualValue;
        } catch (error) {
            console.log('getMemberByRow');
            console.log(error);
            return "";
        }
    }

    public async getPointOfMemberByRow(positionRow = 1, positionMember = 1) {
        try {
            const lbl = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//app-household-member-points-cell//li[${positionMember}]//div`);
            await this.driverService.waitUntilElementVisible(lbl);
            const actualValue = await this.driverService.getText(lbl);
            return parseInt(actualValue);
        } catch (error) {
            console.log('getMemberByRow');
            console.log(error);
            return -1;
        }
    }
    

    public async getIndexHouseholdByAddress(address: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.btnPointReport);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            for (let i = 1; i <= 50; i++) {
                const lbl = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${i}]//app-household-address-cell//div[text()='${address}']`);
                if (await this.driverService.isExisted(lbl)) {
                    return i;
                }
            }
            return -1;
        } catch (error) {
            console.log('getIndexHouseholdByAddress');
            console.log(error);
            return -1;
        }
    }

    public async openMemberByRow(name: string, positionRow = 1) {
        try {
            const lbl = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//app-household-list-members-cell//app-customer-details-link[contains(@title,'${name}')]`);
            await this.driverService.waitUntilElementVisible(lbl);
            await this.driverService.click(lbl);
            return true;
        } catch (error) {
            console.log('openMemberByRow');
            console.log(error);
            return false;
        }
    }

    public async getNumberOfMemberByRow(positionRow: number) {
        try {
            const lbl = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//app-household-list-members-cell//app-customer-details-link`);
            await this.getFieldType(this.btnPointReport);
            return await (await this.driverService.findElements(lbl)).length;
        } catch (error) {
            console.log('getNumberOfMemberByRow');
            console.log(error);
            return -1;
        }
    }
    public async getNumberOfRemoveButtonByRow(positionRow: number) {
        try {
            const lbl = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//app-household-member-remove-cell//button`);
            await this.getFieldType(this.btnPointReport);
            return await (await this.driverService.findElements(lbl)).length;
        } catch (error) {
            console.log('getNumberOfRemoveButtonByRow');
            console.log(error);
            return -1;
        }
    }

    public async getTotalPointsByRow(positionRow = 1) {
        try {
            const lbl = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]/td[contains(@class,'household-total-points-column')]//*[text()]`);
            await this.driverService.waitUntilElementVisible(lbl);
            const actualValue = await this.driverService.getText(lbl);
            return parseInt(actualValue);
        } catch (error) {
            console.log('getTotalPointsByRow');
            console.log(error);
            return -1;
        }
    }
    //#endregion

    //#region Check element exist
    public async checkMemberExistByRow(expectedValue: string, positionRow = 1) {
        try {
            const lbl = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//app-household-list-members-cell//li//a[text()=' ${expectedValue} ']`);
            await this.driverService.waitUntilElementVisible(this.btnPointReport);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            return await this.driverService.isExisted(lbl);
        } catch (error) {
            console.log('checkMemberExistByRow');
            console.log(error);
            return false;
        }
    }
    public async checkRemoveButtonExistByRow(positionRow: number, buttonIndex: number) {
        try {
            const lbl = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//app-household-member-remove-cell//li[${buttonIndex}]/button`);
            await this.driverService.waitUntilElementVisible(this.btnPointReport);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            return await this.driverService.isExisted(lbl);
        } catch (error) {
            console.log('checkRemoveButtonExistByRow');
            console.log(error);
            return false;
        }
    }

    //#endregion
}
