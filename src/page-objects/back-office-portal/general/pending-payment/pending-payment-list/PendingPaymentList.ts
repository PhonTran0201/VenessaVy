import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { logWarningMessage, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";

export class PendingPaymentList {
    protected strRootXpath = "";

    //#region Header on Pending Payment list
    private btnApproveAllEnable = By.xpath(`${this.strRootXpath}//app-pending-payment-list//button[text()=' Approve All ' and not(@disabled)]`);
    private btnApproveAllDisabled = By.xpath(`${this.strRootXpath}//app-pending-payment-list//button[text()=' Approve All ' and @disabled]`);

    private cmbPendingPaymentType = By.xpath(`${this.strRootXpath}//app-pending-payment-list//input[@id='pgs-pending-list-type']`);
    private cmbPendingPaymentTypeValue = By.xpath(`${this.strRootXpath}//app-pending-payment-list//ng-select//span[contains(@class,'ng-value-label')]`);

    //#endregion

    constructor(private driverService: SeleniumWebDriverService) { }

    //#region Methods on Header
    public async pressApproveAllButton(){
        try {
            await this.driverService.waitUntilElementLoaded(this.btnApproveAllEnable);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.click(this.btnApproveAllEnable);
            return true;
        } catch (error) {
            console.log('pressApproveAllButton');
            console.log(error);
            return false;
        }
    }
    public async inputPendingPaymentType(value: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbPendingPaymentType);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.sendKeys(this.cmbPendingPaymentType, value);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.pressDownCurrentElement();
            await this.driverService.pressEnterCurrentElement();
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            const selectedValue = await this.driverService.getText(this.cmbPendingPaymentTypeValue);
            if(selectedValue !== value){
                logWarningMessage(`Pending Payment Type "${value}" is NOT selected correctly!`);
                return false;
            }
            return true;
        } catch (error) {
            console.log('inputPendingPaymentType');
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region Methods on Table
    public async pressApproveButtonByRow(positionRow = 1){
        try {
            const btn = By.xpath(`(//td[count(//app-pending-payment-list//thead//th[./div/span[text()='Action']]/preceding-sibling::*)+1])[${positionRow}]//button[./i[contains(@class,'fa-check-circle')] and not(@disabled)]`);
            await this.driverService.waitUntilElementLoaded(btn);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.click(btn);
            return true;
        } catch (error) {
            console.log('pressApproveButtonByRow');
            console.log(error);
            return false;
        }
    }

    public async pressHoldButtonByRow(positionRow = 1){
        try {
            const btn = By.xpath(`(//td[count(//app-pending-payment-list//thead//th[./div/span[text()='Action']]/preceding-sibling::*)+1])[${positionRow}]//button[./i[contains(@class,'fa-thumbtack')] and not(@disabled)]`);
            await this.driverService.waitUntilElementLoaded(btn);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.click(btn);
            return true;
        } catch (error) {
            console.log('pressHoldButtonByRow');
            console.log(error);
            return false;
        }
    }

    public async pressRejectButtonByRow(positionRow = 1){
        try {
            const btn = By.xpath(`(//td[count(//app-pending-payment-list//thead//th[./div/span[text()='Action']]/preceding-sibling::*)+1])[${positionRow}]//button[./i[contains(@class,'fa-times-circle')] and not(@disabled)]`);
            await this.driverService.waitUntilElementLoaded(btn);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.click(btn);
            return true;
        } catch (error) {
            console.log('pressRejectButtonByRow');
            console.log(error);
            return false;
        }
    }

    public async openPaymentDetailByRow(positionRow = 1){
        try {
            const lbl = By.xpath(`(//td[count(//app-pending-payment-list//thead//th[./div/span[text()='Payment Ref.']]/preceding-sibling::*)+1])[${positionRow}]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lbl);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.click(lbl);
            return true;
        } catch (error) {
            console.log('openPaymentDetailByRow');
            console.log(error);
            return false;
        }
    }
    public async openPaymentDetailByReference(PaymentRef: string){
        try {
            const lbl = By.xpath(`(//td[count(//app-pending-payment-list//thead//th[./div/span[text()='Payment Ref.']]/preceding-sibling::*)+1])//*[text()=' ${PaymentRef} ']`);
            await this.driverService.waitUntilElementLoaded(lbl);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.click(lbl);
            return true;
        } catch (error) {
            console.log('openPaymentDetailByReference');
            console.log(error);
            return false;
        }
    }

    public async isPaymentExistedWithReference(PaymentRef: string){
        try {
            const ref = By.xpath(`(//td[count(//app-pending-payment-list//thead//th[./div/span[text()='Payment Ref.']]/preceding-sibling::*)+1])//*[text()=' ${PaymentRef} ']`);
            await this.driverService.waitUntilElementLoaded(this.cmbPendingPaymentType);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            return this.driverService.isExisted(ref);
        } catch (error) {
            console.log("isPaymentExistedWithReference");
            console.log(error);
            return false;
        }
    }
    public async validateValuePaymentRef(expectedValue: string, positionRow = 1){
        try {
            const lbl = By.xpath(`(//td[count(//app-pending-payment-list//thead//th[./div/span[text()='Payment Ref.']]/preceding-sibling::*)+1])[${positionRow}]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lbl);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(lbl);
            return await this.driverService.validateRecord('Validate Payment Ref!',
                [actualValue, expectedValue, 'Incorrect Payment Ref!']);
        } catch (error) {
            console.log('validateValuePaymentRef');
            console.log(error);
            return false;
        }
    }

    public async validateValueType(expectedValue: string, positionRow = 1){
        try {
            const lbl = By.xpath(`(//td[count(//app-pending-payment-list//thead//th[./div/span[text()='Type']]/preceding-sibling::*)+1])[${positionRow}]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lbl);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(lbl);
            return await this.driverService.validateRecord('Validate Type!',
                [actualValue, expectedValue, 'Incorrect Type!']);
        } catch (error) {
            console.log('validateValueType');
            console.log(error);
            return false;
        }
    }

    public async validateValueClaimRef(expectedValue: string, positionRow = 1){
        try {
            const lbl = By.xpath(`(//td[count(//app-pending-payment-list//thead//th[./div/span[text()='Claim Ref.']]/preceding-sibling::*)+1])[${positionRow}]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lbl);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(lbl);
            return await this.driverService.validateRecord('Validate Claim Ref!',
                [actualValue, expectedValue, 'Incorrect Claim Ref!']);
        } catch (error) {
            console.log('validateValueClaimRef');
            console.log(error);
            return false;
        }
    }

    public async validateValueProduct(expectedValue: string, positionRow = 1){
        try {
            const lbl = By.xpath(`(//td[count(//app-pending-payment-list//thead//th[./div/span[text()='Product']]/preceding-sibling::*)+1])[${positionRow}]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lbl);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(lbl);
            return await this.driverService.validateRecord('Validate Product!',
                [actualValue, expectedValue, 'Incorrect Product!']);
        } catch (error) {
            console.log('validateValueProduct');
            console.log(error);
            return false;
        }
    }

    public async validateValueCover(expectedValue: string, positionRow = 1){
        try {
            const lbl = By.xpath(`(//td[count(//app-pending-payment-list//thead//th[./div/span[text()='Cover']]/preceding-sibling::*)+1])[${positionRow}]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lbl);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(lbl);
            return await this.driverService.validateRecord('Validate Cover!',
                [actualValue, expectedValue, 'Incorrect Cover!']);
        } catch (error) {
            console.log('validateValueCover');
            console.log(error);
            return false;
        }
    }

    public async validateValueClaimType(expectedValue: string, positionRow = 1){
        try {
            const lbl = By.xpath(`(//td[count(//app-pending-payment-list//thead//th[./div/span[text()='Claim Type']]/preceding-sibling::*)+1])[${positionRow}]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lbl);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(lbl);
            return await this.driverService.validateRecord('Validate Claim Type!',
                [actualValue, expectedValue, 'Incorrect Claim Type!']);
        } catch (error) {
            console.log('validateValueClaimType');
            console.log(error);
            return false;
        }
    }

    public async validateValueCauseType(expectedValue: string, positionRow = 1){
        try {
            const lbl = By.xpath(`(//td[count(//app-pending-payment-list//thead//th[./div/span[text()='Cause Type']]/preceding-sibling::*)+1])[${positionRow}]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lbl);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(lbl);
            return await this.driverService.validateRecord('Validate Cause Type!',
                [actualValue, expectedValue, 'Incorrect Cause Type!']);
        } catch (error) {
            console.log('validateValueCauseType');
            console.log(error);
            return false;
        }
    }

    public async validateValueClaimElement(expectedValue: string, positionRow = 1){
        try {
            const lbl = By.xpath(`(//td[count(//app-pending-payment-list//thead//th[./div/span[text()='Claim Element']]/preceding-sibling::*)+1])[${positionRow}]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lbl);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(lbl);
            return await this.driverService.validateRecord('Validate Claim Element!',
                [actualValue, expectedValue, 'Incorrect Claim Element!']);
        } catch (error) {
            console.log('validateValueClaimElement');
            console.log(error);
            return false;
        }
    }
    public async validateValueAmount(expectedValue: string, positionRow = 1){
        try {
            const lbl = By.xpath(`(//td[count(//app-pending-payment-list//thead//th[./div/span[text()='Amount']]/preceding-sibling::*)+1])[${positionRow}]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lbl);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(lbl);
            return await this.driverService.validateRecord('Validate Amount!',
                [actualValue, expectedValue, 'Incorrect Amount!']);
        } catch (error) {
            console.log('validateValueAmount');
            console.log(error);
            return false;
        }
    }
    public async validateValueRecipient(expectedValue: string, positionRow = 1){
        try {
            const lbl = By.xpath(`(//td[count(//app-pending-payment-list//thead//th[./div/span[text()='Recipient']]/preceding-sibling::*)+1])[${positionRow}]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lbl);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(lbl);
            return await this.driverService.validateRecord('Validate Recipient!',
                [actualValue, expectedValue, 'Incorrect Recipient!']);
        } catch (error) {
            console.log('validateValueRecipient');
            console.log(error);
            return false;
        }
    }
    public async validateValueCreatedBy(expectedValue: string, positionRow = 1){
        try {
            const lbl = By.xpath(`(//td[count(//app-pending-payment-list//thead//th[./div/span[text()='Created By']]/preceding-sibling::*)+1])[${positionRow}]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lbl);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(lbl);
            return await this.driverService.validateRecord('Validate Created By!',
                [actualValue, expectedValue, 'Incorrect Created By!']);
        } catch (error) {
            console.log('validateValueCreatedBy');
            console.log(error);
            return false;
        }
    }
    public async validateValueToBeApprovedBy(expectedValue: string, positionRow = 1){
        try {
            const lbl = By.xpath(`(//td[count(//app-pending-payment-list//thead//th[./div/span[text()='To Be Approved By']]/preceding-sibling::*)+1])[${positionRow}]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lbl);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(lbl);
            return await this.driverService.validateRecord('Validate To Be Approved By!',
                [actualValue, expectedValue, 'Incorrect To Be Approved By!']);
        } catch (error) {
            console.log('validateValueToBeApprovedBy');
            console.log(error);
            return false;
        }
    }
    public async validateValueDescription(expectedValue: string, positionRow = 1){
        try {
            const lbl = By.xpath(`(//td[count(//app-pending-payment-list//thead//th[./div/span[text()='Description']]/preceding-sibling::*)+1])[${positionRow}]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lbl);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(lbl);
            return await this.driverService.validateRecord('Validate Description!',
                [actualValue, expectedValue, 'Incorrect Description!']);
        } catch (error) {
            console.log('validateValueDescription');
            console.log(error);
            return false;
        }
    }

    public async validateValueHoldReason(expectedValue: string, positionRow = 1){
        try {
            const lbl = By.xpath(`(//td[count(//app-pending-payment-list//thead//th[./div/span[text()='Hold Reason']]/preceding-sibling::*)+1])[${positionRow}]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lbl);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(lbl);
            return await this.driverService.validateRecord('Validate Hold Reason!',
                [actualValue, expectedValue, 'Incorrect Hold Reason!']);
        } catch (error) {
            console.log('validateValueHoldReason');
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region Methods get value on Table
    public async getValuePaymentRef(positionRow = 1){
        try {
            const lbl = By.xpath(`(//td[count(//app-pending-payment-list//thead//th[./div/span[text()='Payment Ref.']]/preceding-sibling::*)+1])[${positionRow}]//*[text()]`);
            await this.driverService.waitUntilElementVisible(lbl);
            const actualValue = await this.driverService.getText(lbl);
            return actualValue;
        } catch (error) {
            console.log('getValuePaymentRef');
            console.log(error);
            return "";
        }
    }
    public async getValueToBeApprovedBy(positionRow = 1){
        try {
            const lbl = By.xpath(`(//td[count(//app-pending-payment-list//thead//th[./div/span[text()='To Be Approved By']]/preceding-sibling::*)+1])[${positionRow}]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lbl);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(lbl);
            return actualValue;
        } catch (error) {
            console.log('getValueToBeApprovedBy');
            console.log(error);
            return "";
        }
    }
    //#endregion
}