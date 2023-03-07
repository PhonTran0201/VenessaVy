import { compareDesc } from "date-fns";
import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2, logInfoMessage, logSuccessMessage, waitUntilHorizontalProgressBarLoaded } from "../../../../../shared/functions";


export class GuaranteeReportGuarantee {

    constructor(private driverService: SeleniumWebDriverService) { };
    private lblTotalNumberRecordSubTab = By.xpath("//app-guarantee-report-list//c-table//div[contains(text(),'Total') and contains(text(),'records')]");


    public async getNumberOfTotalRecordsGuaranteeReport() {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblTotalNumberRecordSubTab);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            let temp = await this.driverService.getText(this.lblTotalNumberRecordSubTab);
            let result = parseInt(temp.replace(/^\D+/g, ''));
            return result;
        } catch (error) {
            console.log("getNumberOfTotalRecordsGuaranteeReport");
            console.log(error);
            return -1;
        }
    }
    public async validateGuaranteeNoOnGuaranteeReportList(expectedValue: string, positionRow: number = 1) {
        try {
            let txtGuaranteeNoValue = By.xpath(`//c-table//table//tbody//tr[${positionRow}]//app-general-name-column//a`);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.waitUntilElementLoaded(txtGuaranteeNoValue);
            let actualValue = await this.driverService.getText(txtGuaranteeNoValue);
            return await this.driverService.validateRecord(`Validate GuaranteeNo`, [actualValue, expectedValue, `Incorrect GuaranteeNo!`]);
        } catch (error) {
            console.log(`validateGuaranteeNoOnGuaranteeReportList`);
            console.log(error);
            return false;
        }
    }

    public async validateAccountOnGuaranteeReportList(Account: string, positionRow: number = 1) {
        try {
            let txtAccountValue = By.xpath(`//c-table//table//tbody//tr[${positionRow}]//app-report-customer-column//a`);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.waitUntilElementLoaded(txtAccountValue);
            let ActualAccount = await this.driverService.getText(txtAccountValue);
            return await this.driverService.validateRecord(`Validate Account`, [ActualAccount, Account, `Incorrect Account!`]);
        } catch (error) {
            console.log(`validateAccountOnGuaranteeReportList`);
            console.log(error);
            return false;
        }
    }


    public async validateCurrencyOnGuaranteeReportList(Currency: string, positionRow: number = 1) {
        try {
            let txtGuaranteeFee = By.xpath(`//c-table//table//tbody//tr[${positionRow}]//app-guarantee-currency-col//span`);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.waitUntilElementLoaded(txtGuaranteeFee);
            let ActualCurrency = await this.driverService.getText(txtGuaranteeFee);
            let ActualCurrencyValue = ActualCurrency.substr(-3);
            if (Currency.toLowerCase().includes(ActualCurrencyValue.toLowerCase())) {
                ActualCurrency = Currency;
            }
            return await this.driverService.validateRecord(`Validate Currency`, [ActualCurrency, Currency, `Incorrect Currency!`]);
        } catch (error) {
            console.log(`validateCurrencyOnGuaranteeReportList`);
            console.log(error);
            return false;
        }
    }

    public async validateCreatedDateOnList(CreatedDateFrom: string, CreatedDateTo: string, positionRow: number = 1) {
        try {
            let guaranteeNo = By.xpath(`//c-table//table//tbody//tr[${positionRow}]//app-general-name-column//a`);
            await this.driverService.waitForElementEnabled(guaranteeNo);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.click(guaranteeNo);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 3000);

            let CreatedDate = By.xpath("//app-guarantee-form//label[contains(text(),'Issued date')]/following::b[1]");
            await this.driverService.waitForElementEnabled(CreatedDate);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let actualCreatedDate = await this.driverService.getText(CreatedDate);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);


            const actualCreatedDateValue = new Date(parseInt(actualCreatedDate.substring(6, 10)), parseInt(actualCreatedDate.substring(3, 5)));

            const expectedCreatedDateForm = new Date(parseInt(CreatedDateFrom.substring(3, 7)), parseInt(CreatedDateFrom.substring(0, 2)));

            const expectedCreatedDateTo = new Date(parseInt(CreatedDateTo.substring(3, 7)), parseInt(CreatedDateTo.substring(0, 2)));

            logInfoMessage("Validate Created date On List")
            logInfoMessage("Actual Created Date: " + actualCreatedDate);
            logInfoMessage("Actual Created Date Value: " + actualCreatedDateValue.toString());
            logInfoMessage("Expected Created Date From: " + expectedCreatedDateForm.toString());
            logInfoMessage("Expected Created Date To: " + expectedCreatedDateTo.toString());

            if (
                compareDesc(expectedCreatedDateForm, actualCreatedDateValue) >= 0 &&
                compareDesc(actualCreatedDateValue, expectedCreatedDateTo) >= 0
            ) {
                logSuccessMessage("Validate Created Date: Test passed!")
                return true;
            } else return false;
        } catch (error) {
            console.log("validateCreatedDateFromToOnList\n" + error);
            return false;
        }
    }

    public async openGuaranteeByRowOnGuaranteeReportList(positionRow: number = 1) {
        try {
            let txtGuaranteeNoValue = By.xpath(`//c-table//table//tbody//tr[${positionRow}]//app-general-name-column//a`);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.waitUntilElementLoaded(txtGuaranteeNoValue);
            await this.driverService.click(txtGuaranteeNoValue);
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true;

        } catch (error) {
            console.log(`openGuaranteeByRowOnGuaranteeReportList`);
            console.log(error);
            return false;
        }
    }


}