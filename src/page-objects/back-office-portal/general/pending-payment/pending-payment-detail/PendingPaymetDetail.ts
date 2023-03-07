import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";

export class PendingPaymentDetail {
    protected strRootXpath = "";
    constructor(protected driverService: SeleniumWebDriverService) { }

    //#region Xpath for section 1
    private lblTitleHeader = By.xpath(`${this.strRootXpath}`);

    private txtStatus = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-pending-payment-detail//input[@id='pgs-pending-approval-status']`);
    private lblType = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-pending-payment-detail//div[./label[@for='pgs-pending-approval-type']]//span[contains(@class,'ng-value-label')]`);
    private txtCover = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-pending-payment-detail//input[@id='pgs-pending-approval-cover']`);
    private txtCauseType = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-pending-payment-detail//input[@id='pgs-pending-approval-causeType']`);
    private txtAmountNumber = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-pending-payment-detail//input[@id='pgs-pending-approval-amount']`);
    private lblAmountCurrency = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-pending-payment-detail//formly-group[contains(@class,'form-input-group') and .//input[@id='pgs-pending-approval-amount']]//span[contains(@class,'ng-value-label')]`);
    private cbxAdjustReserve = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-pending-payment-detail//label[.//span[text()='Adjust Reserve']]`);

    private dtpApprovedDate = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-pending-payment-detail//input[@id='pgs-pending-approval-approvedAt']`);
    private txtApprover = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-pending-payment-detail//input[@id='pgs-pending-approval-approvedBy']`);
    private txtClaimType = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-pending-payment-detail//input[@id='pgs-pending-approval-claimType']`);
    private txtClaimElement = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-pending-payment-detail//input[@id='pgs-pending-approval-claimElement']`);
    private txtDescription = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-pending-payment-detail//textarea[@id='pgs-pending-approval-description']`);
    private cbxExcludeFromExport = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-pending-payment-detail//label[./span[text()='Exclude from export']]/input`);
    //#endregion

    //#region Recipient
    private lblType_Recipient = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-pending-payment-detail//select[@id='pgs-pending-approval-recipient-type']`);
    private txtFirstName_Recipient = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-pending-payment-detail//input[@id='pgs-pending-approval-recipient-firstName']`);
    private txtAddress_Recipient = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-pending-payment-detail//input[@id='pgs-pending-approval-recipient-address']`);
    private txtCity_Recipient = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-pending-payment-detail//input[@id='pgs-pending-approval-recipient-city']`);
    private txtPhoneNumber_Recipient = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-pending-payment-detail//input[@id='pgs-pending-approval-recipient-phoneNumber']`);
    private txtOrgNo_Recipient = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-pending-payment-detail//input[@id='pgs-pending-approval-recipient-nin']`);
    private txtLastName_Recipient = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-pending-payment-detail//input[@id='pgs-pending-approval-recipient-lastName']`);
    private txtPostalCode_Recipient = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-pending-payment-detail//input[@id='pgs-pending-approval-recipient-postcode']`);
    private txtCountry_Recipient = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-pending-payment-detail//input[@id='pgs-pending-approval-recipient-country']`);
    private txtEmailAddress_Recipient = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-pending-payment-detail//input[@id='pgs-pending-approval-recipient-email']`);
    //#endregion

    //#region Payment Information
    private lblPaymentMethod_PaymentInformation = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-pending-payment-detail//div[./label[text()=' Payment Method ']]//span[contains(@class,'ng-value-label')]`);
    private txtBankName_PaymentInformation = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-pending-payment-detail//input[@id='pgs-pending-approval-bankName']`);
    private txtInvoiceNo_PaymentInformation = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-pending-payment-detail//input[@id='pgs-pending-approval-invoiceNo']`);
    private txtKIDNo_PaymentInformation = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-pending-payment-detail//input[@id='pgs-pending-approval-kidNo']`);
    private txtAccountNumber_PaymentInformation = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-pending-payment-detail//input[@id='pgs-pending-approval-accountNumber']`);
    private txtSWIFT_BIC_PaymentInformation = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-pending-payment-detail//input[@id='pgs-pending-approval-swiftBic']`);
    private dtpInvoiceDate_PaymentInformation = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-pending-payment-detail//input[@id='pgs-pending-approval-invoiceDate']`);
    private dtpDueDate_PaymentInformation = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-pending-payment-detail//input[@id='pgs-pending-approval-dueDate']`);
    //#endregion


    //#region Methods
    public async validateValueTitleHeader(expectedValue: string){
        try {
            await this.driverService.waitUntilElementLoaded(this.lblTitleHeader);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(this.lblTitleHeader);
            return await this.driverService.validateRecord('Validate Title Header!',
                [actualValue, "PAYMENT " + expectedValue, 'Incorrect Title Header!']);
        } catch (error) {
            console.log('validateValueTitleHeader');
            console.log(error);
            return false;
        }
    }
    //#region Section 1
    public async validateValueStatus(expectedValue: string){
        try {
            await this.driverService.waitUntilElementLoaded(this.txtStatus);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getAttributeValue(this.txtStatus,'value');
            return await this.driverService.validateRecord('Validate Status!',
                [actualValue, expectedValue, 'Incorrect Status!']);
        } catch (error) {
            console.log('validateValueStatus');
            console.log(error);
            return false;
        }
    }
    public async validateValueType(expectedValue: string){
        try {
            await this.driverService.waitUntilElementLoaded(this.lblType);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(this.lblType);
            return await this.driverService.validateRecord('Validate Type!',
                [actualValue, expectedValue, 'Incorrect Type!']);
        } catch (error) {
            console.log('validateValueType');
            console.log(error);
            return false;
        }
    }
    public async validateValueCover(expectedValue: string){
        try {
            await this.driverService.waitUntilElementLoaded(this.txtCover);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getAttributeValue(this.txtCover,'value');
            return await this.driverService.validateRecord('Validate Cover!',
                [actualValue, expectedValue, 'Incorrect Cover!']);
        } catch (error) {
            console.log('validateValueCover');
            console.log(error);
            return false;
        }
    }
    public async validateValueCauseType(expectedValue: string){
        try {
            await this.driverService.waitUntilElementLoaded(this.txtCauseType);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getAttributeValue(this.txtCauseType,'value');
            return await this.driverService.validateRecord('Validate Cause Type!',
                [actualValue, expectedValue, 'Incorrect Cause Type!']);
        } catch (error) {
            console.log('validateValueCauseType');
            console.log(error);
            return false;
        }
    }
    public async validateValueAmountNumber(expectedValue: string){
        try {
            await this.driverService.waitUntilElementLoaded(this.txtAmountNumber);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getAttributeValue(this.txtAmountNumber,'value');
            return await this.driverService.validateRecord('Validate Amount Number!',
                [actualValue, expectedValue, 'Incorrect Amount Number!']);
        } catch (error) {
            console.log('validateValueAmountNumber');
            console.log(error);
            return false;
        }
    }
    public async validateValueAmountCurrency(expectedValue: string){
        try {
            await this.driverService.waitUntilElementLoaded(this.lblAmountCurrency);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(this.lblAmountCurrency);
            return await this.driverService.validateRecord('Validate Amount Currency!',
                [actualValue, expectedValue, 'Incorrect Amount Currency!']);
        } catch (error) {
            console.log('validateValueAmountCurrency');
            console.log(error);
            return false;
        }
    }
    public async checkAdjustReserve(){
        try {
            await this.driverService.waitUntilElementLoaded(this.cbxAdjustReserve);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.click(this.cbxAdjustReserve);
            return true;
        } catch (error) {
            console.log('checkAdjustReserve');
            console.log(error);
            return false;
        }
    }
    public async validateValueApprovedDate(expectedValue: string){
        try {
            await this.driverService.waitUntilElementLoaded(this.dtpApprovedDate);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getAttributeValue(this.dtpApprovedDate,'value');
            return await this.driverService.validateRecord('Validate Approved Date!',
                [actualValue, expectedValue, 'Incorrect Approved Date!']);
        } catch (error) {
            console.log('validateValueApprovedDate');
            console.log(error);
            return false;
        }
    }
    public async validateValueApprover(expectedValue: string){
        try {
            await this.driverService.waitUntilElementLoaded(this.txtApprover);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getAttributeValue(this.txtApprover,'value');
            return await this.driverService.validateRecord('Validate Approver!',
                [actualValue, expectedValue, 'Incorrect Approver!']);
        } catch (error) {
            console.log('validateValueApprover');
            console.log(error);
            return false;
        }
    }
    public async validateValueClaimTpye(expectedValue: string){
        try {
            await this.driverService.waitUntilElementLoaded(this.txtClaimType);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getAttributeValue(this.txtClaimType,'value');
            return await this.driverService.validateRecord('Validate Claim Type!',
                [actualValue, expectedValue, 'Incorrect Claim Type!']);
        } catch (error) {
            console.log('validateValueClaimTpye');
            console.log(error);
            return false;
        }
    }
    public async validateValueClaimElement(expectedValue: string){
        try {
            await this.driverService.waitUntilElementLoaded(this.txtClaimElement);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getAttributeValue(this.txtClaimElement,'value');
            return await this.driverService.validateRecord('Validate Claim Element!',
                [actualValue, expectedValue, 'Incorrect Claim Element!']);
        } catch (error) {
            console.log('validateValueClaimElement');
            console.log(error);
            return false;
        }
    }
    public async validateValueDescription(expectedValue: string){
        try {
            await this.driverService.waitUntilElementLoaded(this.txtDescription);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getAttributeValue(this.txtDescription,'value');
            return await this.driverService.validateRecord('Validate Description!',
                [actualValue, expectedValue, 'Incorrect Description!']);
        } catch (error) {
            console.log('validateValueDescription');
            console.log(error);
            return false;
        }
    }
    public async checkExcludeFromExport(){
        try {
            await this.driverService.waitUntilElementLoaded(this.cbxExcludeFromExport);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.click(this.cbxExcludeFromExport);
            return true;
        } catch (error) {
            console.log('checkExcludeFromExport');
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region Method at Recipient
    public async validateValueType_Recipient(expectedValue: string){
        try {
            await this.driverService.waitUntilElementLoaded(this.lblType_Recipient);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValueTemp = await this.driverService.getAttributeValue(this.lblType_Recipient, 'value');
            const actualValue = actualValueTemp === "0: pl" ? "Person" : actualValueTemp === "1: cl" ? "Company" : "Undefined!";
            return await this.driverService.validateRecord('Validate Type_Recipient!',
                [actualValue, expectedValue, 'Incorrect Type_Recipient!']);
        } catch (error) {
            console.log('validateValueType_Recipient');
            console.log(error);
            return false;
        }
    }
    public async validateValueFirstName_Recipient(expectedValue: string){
        try {
            await this.driverService.waitUntilElementLoaded(this.txtFirstName_Recipient);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getAttributeValue(this.txtFirstName_Recipient,'value');
            return await this.driverService.validateRecord('Validate FirstName_Recipient!',
                [actualValue, expectedValue, 'Incorrect FirstName_Recipient!']);
        } catch (error) {
            console.log('validateValueFirstName_Recipient');
            console.log(error);
            return false;
        }
    }
    public async validateValueAddress_Recipient(expectedValue: string){
        try {
            await this.driverService.waitUntilElementLoaded(this.txtAddress_Recipient);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getAttributeValue(this.txtAddress_Recipient,'value');
            return await this.driverService.validateRecord('Validate Address_Recipient!',
                [actualValue, expectedValue, 'Incorrect Address_Recipient!']);
        } catch (error) {
            console.log('validateValueAddress_Recipient');
            console.log(error);
            return false;
        }
    }
    public async validateValueCity_Recipient(expectedValue: string){
        try {
            await this.driverService.waitUntilElementLoaded(this.txtCity_Recipient);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getAttributeValue(this.txtCity_Recipient,'value');
            return await this.driverService.validateRecord('Validate City_Recipient!',
                [actualValue, expectedValue, 'Incorrect City_Recipient!']);
        } catch (error) {
            console.log('validateValueCity_Recipient');
            console.log(error);
            return false;
        }
    }
    public async validateValuePhoneNumber_Recipient(expectedValue: string){
        try {
            await this.driverService.waitUntilElementLoaded(this.txtPhoneNumber_Recipient);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getAttributeValue(this.txtPhoneNumber_Recipient,'value');
            return await this.driverService.validateRecord('Validate PhoneNumber_Recipient!',
                [actualValue, expectedValue, 'Incorrect PhoneNumber_Recipient!']);
        } catch (error) {
            console.log('validateValuePhoneNumber_Recipient');
            console.log(error);
            return false;
        }
    }
    public async validateValueOrgNo_Recipient(expectedValue: string){
        try {
            await this.driverService.waitUntilElementLoaded(this.txtOrgNo_Recipient);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getAttributeValue(this.txtOrgNo_Recipient,'value');
            return await this.driverService.validateRecord('Validate OrgNo_Recipient!',
                [actualValue, expectedValue, 'Incorrect OrgNo_Recipient!']);
        } catch (error) {
            console.log('validateValueOrgNo_Recipient');
            console.log(error);
            return false;
        }
    }
    public async validateValueLastName_Recipient(expectedValue: string){
        try {
            await this.driverService.waitUntilElementLoaded(this.txtLastName_Recipient);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getAttributeValue(this.txtLastName_Recipient,'value');
            return await this.driverService.validateRecord('Validate LastName_Recipient!',
                [actualValue, expectedValue, 'Incorrect LastName_Recipient!']);
        } catch (error) {
            console.log('validateValueLastName_Recipient');
            console.log(error);
            return false;
        }
    }
    public async validateValuePostalCode_Recipient(expectedValue: string){
        try {
            await this.driverService.waitUntilElementLoaded(this.txtPostalCode_Recipient);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getAttributeValue(this.txtPostalCode_Recipient,'value');
            return await this.driverService.validateRecord('Validate PostalCode_Recipient!',
                [actualValue, expectedValue, 'Incorrect PostalCode_Recipient!']);
        } catch (error) {
            console.log('validateValuePostalCode_Recipient');
            console.log(error);
            return false;
        }
    }
    public async validateValueCountry_Recipient(expectedValue: string){
        try {
            await this.driverService.waitUntilElementLoaded(this.txtCountry_Recipient);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getAttributeValue(this.txtCountry_Recipient,'value');
            return await this.driverService.validateRecord('Validate Country_Recipient!',
                [actualValue, expectedValue, 'Incorrect Country_Recipient!']);
        } catch (error) {
            console.log('validateValueCountry_Recipient');
            console.log(error);
            return false;
        }
    }
    public async validateValueEmailAddress_Recipient(expectedValue: string){
        try {
            await this.driverService.waitUntilElementLoaded(this.txtEmailAddress_Recipient);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getAttributeValue(this.txtEmailAddress_Recipient,'value');
            return await this.driverService.validateRecord('Validate EmailAddress_Recipient!',
                [actualValue, expectedValue, 'Incorrect EmailAddress_Recipient!']);
        } catch (error) {
            console.log('validateValueEmailAddress_Recipient');
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region Methods Payment Information
    public async validateValuePaymentMethod_PaymentInformation(expectedValue: string){
        try {
            await this.driverService.waitUntilElementLoaded(this.lblPaymentMethod_PaymentInformation);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(this.lblPaymentMethod_PaymentInformation);
            return await this.driverService.validateRecord('Validate PaymentMethod_PaymentInformation!',
                [actualValue, expectedValue, 'Incorrect PaymentMethod_PaymentInformation!']);
        } catch (error) {
            console.log('validateValuePaymentMethod_PaymentInformation');
            console.log(error);
            return false;
        }
    }
    public async validateValueBankName_PaymentInformation(expectedValue: string){
        try {
            await this.driverService.waitUntilElementLoaded(this.txtBankName_PaymentInformation);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getAttributeValue(this.txtBankName_PaymentInformation,'value');
            return await this.driverService.validateRecord('Validate BankName_PaymentInformation!',
                [actualValue, expectedValue, 'Incorrect BankName_PaymentInformation!']);
        } catch (error) {
            console.log('validateValueBankName_PaymentInformation');
            console.log(error);
            return false;
        }
    }
    public async validateValueInvoiceNo_PaymentInformation(expectedValue: string){
        try {
            await this.driverService.waitUntilElementLoaded(this.txtInvoiceNo_PaymentInformation);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getAttributeValue(this.txtInvoiceNo_PaymentInformation,'value');
            return await this.driverService.validateRecord('Validate InvoiceNo_PaymentInformation!',
                [actualValue, expectedValue, 'Incorrect InvoiceNo_PaymentInformation!']);
        } catch (error) {
            console.log('validateValueInvoiceNo_PaymentInformation');
            console.log(error);
            return false;
        }
    }
    public async validateValueKIDNo_PaymentInformation(expectedValue: string){
        try {
            await this.driverService.waitUntilElementLoaded(this.txtKIDNo_PaymentInformation);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getAttributeValue(this.txtKIDNo_PaymentInformation,'value');
            return await this.driverService.validateRecord('Validate KIDNo_PaymentInformation!',
                [actualValue, expectedValue, 'Incorrect KIDNo_PaymentInformation!']);
        } catch (error) {
            console.log('validateValueKIDNo_PaymentInformation');
            console.log(error);
            return false;
        }
    }
    public async validateValueAccountNumber_PaymentInformation(expectedValue: string){
        try {
            await this.driverService.waitUntilElementLoaded(this.txtAccountNumber_PaymentInformation);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getAttributeValue(this.txtAccountNumber_PaymentInformation,'value');
            return await this.driverService.validateRecord('Validate AccountNumber_PaymentInformation!',
                [actualValue, expectedValue, 'Incorrect AccountNumber_PaymentInformation!']);
        } catch (error) {
            console.log('validateValueAccountNumber_PaymentInformation');
            console.log(error);
            return false;
        }
    }
    public async validateValueSWIFT_BIC_PaymentInformation(expectedValue: string){
        try {
            await this.driverService.waitUntilElementLoaded(this.txtSWIFT_BIC_PaymentInformation);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getAttributeValue(this.txtSWIFT_BIC_PaymentInformation,'value');
            return await this.driverService.validateRecord('Validate SWIFT_BIC_PaymentInformation!',
                [actualValue, expectedValue, 'Incorrect SWIFT_BIC_PaymentInformation!']);
        } catch (error) {
            console.log('validateValueSWIFT_BIC_PaymentInformation');
            console.log(error);
            return false;
        }
    }
    public async validateValueInvoiceDate_PaymentInformation(expectedValue: string){
        try {
            await this.driverService.waitUntilElementLoaded(this.dtpInvoiceDate_PaymentInformation);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getAttributeValue(this.dtpInvoiceDate_PaymentInformation,'value');
            return await this.driverService.validateRecord('Validate InvoiceDate_PaymentInformation!',
                [actualValue, expectedValue, 'Incorrect InvoiceDate_PaymentInformation!']);
        } catch (error) {
            console.log('validateValueInvoiceDate_PaymentInformation');
            console.log(error);
            return false;
        }
    }
    public async validateValueDueDate_PaymentInformation(expectedValue: string){
        try {
            await this.driverService.waitUntilElementLoaded(this.dtpDueDate_PaymentInformation);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getAttributeValue(this.dtpDueDate_PaymentInformation,'value');
            return await this.driverService.validateRecord('Validate DueDate_PaymentInformation!',
                [actualValue, expectedValue, 'Incorrect DueDate_PaymentInformation!']);
        } catch (error) {
            console.log('validateValueDueDate_PaymentInformation');
            console.log(error);
            return false;
        }
    }
    //#endregion
    //#endregion
}