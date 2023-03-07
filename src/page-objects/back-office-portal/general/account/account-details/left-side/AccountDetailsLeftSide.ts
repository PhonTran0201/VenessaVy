import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../../core/BasePage";
import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { logInfoMessage, logWarningMessage, waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../../shared/functions";
import { scenarioName } from "../../../../../../shared/variables";

export class AccountDetailsLeftSide extends BasePage {

    //xpath of elements at account detail
    private titleTabAccountActive = By.xpath("//a[(@href) and @role='tab' and contains(@class,'active') and contains(@class,'tab-title')]");

    //1. Company account
    private lblAccountName = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-avatar/following-sibling::div/h4");
    private lblOrgNo = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//label[text()='Org. No']/following-sibling::p");
    private lblAddress = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//label[text()='Address']/following-sibling::p");
    private lblPostcode = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//label[text()='Postcode']/following-sibling::p");
    private lblIndustry = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//label[text()='Industry']/following-sibling::p");
    private lblCreditRating = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//label[text()='Credit rating']/following-sibling::p");
    private lblCustomerLifetime = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//label[text()='Customer Lifetime']/following-sibling::p")
    //2. Person account
    private lblNIN = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//label[text()='NIN']/following-sibling::p");
    private lblDateOfBirth = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//label[text()='Date of birth']/following-sibling::p");
    private lblGender = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//label[text()='Gender']/following-sibling::p");
    private lblNumber = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//label[text()='Number']/following-sibling::p");
    protected btnRiskCheck = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-details-left-side//button[./i[contains(@class,'fa-clipboard-list-check')]]");
    protected btnEdit = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[contains(@id,'pgs-edit-customer-btn')]");
    protected btnCreateNote = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[contains(@id,'pgs-create-note-customer-btn')]");
    protected btnConsent = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[contains(@id,'pgs-update-acc-customer-btn')]");
    protected btnComposeEmail = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[contains(@id,'compose-email')]");

    public async assertCreateCompanyAccountAtAccountDetail(expectedName: string, expectedOrgNo: string, expectedAddress: string, expectedPostcode: string, expectedIndustry: string, expectedCreditRating: string) {
        let actualTitleAccountTab = "";
        let actualAccountName = "";
        let actualOrgNo = "";
        let actualAddress = "";
        let actualPostcode = "";
        let actualIndustry = "";
        let actualCreditRating = "";

        try {
            await this.driverService.waitUntilElementLoaded(this.lblAccountName);
            logInfoMessage("\n\tAssert create Company account at Account detail:");
            actualTitleAccountTab = await this.driverService.getText(this.titleTabAccountActive);

            actualAccountName = await this.driverService.getText(this.lblAccountName);
            actualOrgNo = await this.driverService.getText(this.lblOrgNo);
            actualAddress = await this.driverService.getText(this.lblAddress);
            actualPostcode = await this.driverService.getText(this.lblPostcode);
            actualIndustry = await this.driverService.getText(this.lblIndustry);
            actualCreditRating = await this.driverService.getText(this.lblCreditRating);

        } catch (error) {
            console.log("assertCreateCompanyAccountAtAccountDetail");
            console.log(error);
        }
        if (expectedOrgNo.localeCompare("expectedOrgNo") === 0) {// In case of OrgNo auto generated in code
            actualOrgNo = expectedOrgNo = "expectedOrgNo";
        }
        else {//In case of OrgNo is in origo csv file
            actualIndustry = expectedIndustry = actualCreditRating = expectedCreditRating = actualPostcode = expectedPostcode = "Not defined!";
        }
        await this.driverService.validateTestCase(scenarioName,
            [actualTitleAccountTab, expectedName, "Assert at title of Account tab: Incorrect title tab!"],
            [actualAccountName, expectedName.toUpperCase(), "Assert at Account Name: Incorrect Account Name!"],
            [actualOrgNo, expectedOrgNo, "Assert at Org. No: Incorrect Org. No!"],
            [actualAddress, expectedAddress, "Assert at Address: Incorrect Address!"],
            [actualPostcode, expectedPostcode, "Assert at Postcode: Incorrect Postcode!"],
            [actualIndustry, expectedIndustry, "Assert at Industry: Incorrect Industry!"],
            [actualCreditRating, expectedCreditRating, "Assert at Credit Rating: Incorrect Credit Rating!"]
        );
    }

    public async assertCreatePersonAccountAtAccountDetail(expectedName: string, expectedNIN: string, expectedDateOfBirth: string, expectedGender: string, expectedNumber: string, expectedAddress: string, expectedPostcode: string) {
        let actualTitleAccountTab = "";
        let actualAccountName = "";
        let actualNIN = "";
        //let actualDateOfBirth = "";
        let actualGender = "";
        let actualNumber = "";
        let actualAddress = "";
        let actualPostcode = "";

        try {
            await this.driverService.waitUntilElementLoaded(this.lblAccountName);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            logInfoMessage("\n\tAssert create Person account at Account detail:");
            actualTitleAccountTab = await this.driverService.getText(this.titleTabAccountActive);

            actualAccountName = await this.driverService.getText(this.lblAccountName);
            actualNIN = await this.driverService.getText(this.lblNIN);
            //actualDateOfBirth = await this.driverService.getText(this.lblDateOfBirth);
            actualGender = await this.driverService.getText(this.lblGender);
            actualNumber = await this.driverService.getText(this.lblNumber);
            actualAddress = await this.driverService.getText(this.lblAddress);
            actualPostcode = await this.driverService.getText(this.lblPostcode);


        } catch (error) {
            console.log("assertCreateCompanyAccountAtAccountDetail");
            console.log(error);
        }
        await this.driverService.validateTestCase(scenarioName,
            [actualTitleAccountTab, expectedName, "Assert at title of Account tab: Incorrect title tab!"],
            [actualAccountName, expectedName.toUpperCase(), "Assert at Account Name: Incorrect Account Name!"],
            // [actualNIN, expectedNIN, "Assert at NIN: Incorrect NIN!"],
            //[actualDateOfBirth, expectedDateOfBirth, "Assert at Date Of Birth: Incorrect Date Of Birth!"],
            [actualGender, expectedGender, "Assert at Gender: Incorrect Gender!"],
            [actualNumber, expectedNumber, "Assert at Number: Incorrect Number!"],
            [actualAddress, expectedAddress, "Assert at Address: Incorrect Address!"],
            [actualPostcode, expectedPostcode, "Assert at Postcode: Incorrect Postcode!"],
        );
    }

    public async assertTitleOfOpeningAccountTab(accountName: string): Promise<boolean> {
        try {
            let result = true;
            await this.driverService.waitUntilElementLoaded(this.titleTabAccountActive);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService)
            let titleTab = await this.driverService.getText(this.titleTabAccountActive);
            if (!(titleTab.includes(accountName))) {
                logWarningMessage(`The opening account is "${titleTab}". It doesn't match with "${accountName}"`);
                result = false;
            }
            return result;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    public async checkAccountTabExist(accountName: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.titleTabAccountActive);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            const accountTab = By.xpath(`//a[(@href) and @role='tab' and text()=' ${accountName.trim()} ' and contains(@class,'tab-title')]`);
            return await this.driverService.isExisted(accountTab);
        } catch (error) {
            console.log("checkAccountTabExist\n" + error);
            return false;
        }
    }

    public async checkAccountOpening(): Promise<boolean> {
        let accountDetail = By.xpath("//app-customer-page//div[contains(@class,'active') and contains(@class,'tab-pane')]//app-customer-detail");
        return await this.driverService.isExisted(accountDetail);
    }
    public async clickCheckRiskButton() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnRiskCheck);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.click(this.btnRiskCheck);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true;
        } catch (error) {
            console.log("clickCheckRiskButton");
            console.log(error);
            return false;
        }
    }
    public async clickEditAccountButton() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnEdit);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.click(this.btnEdit);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true;
        } catch (error) {
            console.log("clickEditAccountButton");
            console.log(error);
            return false;
        }
    }

    public async clickCreateNoteAccountButton() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnCreateNote);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.click(this.btnCreateNote);
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true;
        } catch (error) {
            console.log("clickCreateNoteAccountButton");
            console.log(error);
            return false;
        }
    }

    public async clickConsentsButton() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnConsent);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.click(this.btnConsent);
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true;
        } catch (error) {
            console.log("clickConsentsButton");
            console.log(error);
            return false;
        }
    }

    public async clickComposeEmailAccountButton() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnComposeEmail);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.click(this.btnComposeEmail);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            return true;
        } catch (error) {
            console.log("clickComposeEmailAccountButton");
            console.log(error);
            return false;
        }
    }


    public async validateCustomerLifetime(lifetime: string) {
        try {
            let element = await this.getFieldType(this.lblCustomerLifetime);
            let actualValue = await element.getValue();
            console.log('Expected lifetime value: ' + lifetime);
            console.log('Actual lifetime value: ' + actualValue);
            return await this.driverService.validateRecord(`validate Customer Lifetime`, [actualValue, lifetime, 'Incorrect Lifetime!']);
        } catch (error) {
            console.log(`validateCustomerLifetime`);
            console.log(error);
            return false;
        }

    }


    /*
   * getDifferenceInDaysLifetime() : Calculates the difference between two dates
   * @date1 : "First Date has format "DD-MM-YYYY"
   * @date2 : "Second Date has format "DD-MM-YYYY"
   * return : x year(s) y month(s) z day(s)
   * 
   * 
   * Following US VAR-906
   * Format of Customer Lifetime: x year(s) y month(s) z day(s)
   * 30 days should be shown as 1 month
   * 12 months should be shown as 1 year
*/
    public async getDifferenceInDaysLifetime(date1: string, date2: string) {
        const dt_date1 = new Date(parseInt(date1.substring(6, 10)), parseInt(date1.substring(3, 5)) - 1, parseInt(date1.substring(0, 2)));
        const dt_date2 = new Date(parseInt(date2.substring(6, 10)), parseInt(date2.substring(3, 5)) - 1, parseInt(date2.substring(0, 2)));
        const msInDay = 24 * 60 * 60 * 1000;
        let numberOfDay = Math.round(Math.abs(Number(dt_date1.getTime()) - Number(dt_date2.getTime())) / msInDay);

        let year = Math.floor(numberOfDay / 360);
        let month = Math.floor((numberOfDay % 360) / 30);
        let day = Math.round((numberOfDay % 360) % 30);

        let formatYear = year > 1 ? year + " years" : year + " year"
        let formatMonth = month > 1 ? month + " months" : month + " month"
        let formatDay = day > 1 ? day + " days" : day + " day"
        let result;

        if (numberOfDay == 0) result = formatDay;
        else if (year < 1 && month < 1 && day >= 1) result = formatDay;
        else if (year < 1 && month >= 1 && day >= 1) result = formatMonth + " " + formatDay;
        else if (year >= 1 && month >= 1 && day >= 1) result = formatYear + " " + formatMonth + " " + formatDay;
        else if (year < 1 && month >= 1 && day < 1) result = formatMonth;
        else if (year >= 1 && month >= 1 && day < 1) result = formatYear + " " + formatMonth;
        else result = formatYear + " " + formatDay;

        return result;
    }

}