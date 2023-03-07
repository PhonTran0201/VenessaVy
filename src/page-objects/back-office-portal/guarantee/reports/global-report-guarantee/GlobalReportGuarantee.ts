import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2, selectDropdownOption, waitUntilHorizontalProgressBarLoaded } from "../../../../../shared/functions";


export class GlobalReportGuarantee {
    constructor(private driverService: SeleniumWebDriverService) { };
    private btnExportedFiles = By.xpath(`//button[contains(text(),"Exported files")]`);
    private btnExport = By.xpath(`//button[contains(@id,"ex") and contains(@id,"report") and contains(@class,"btn-white") ]`);
    private btnSearchReport = By.xpath(`//button[contains(@id,"search")]`);
    private cmbSearchReport = By.xpath(`//div[@id="searchIcon"]//input`);
    private cmbCurrency = By.xpath("//input[@id='currency-field']")
    private dtpPeriodStartDate = By.xpath("//*[contains(local-name(),'report-list')]//formly-group//formly-field[3]//input");
    private dtpPeriodEndDate = By.xpath("//*[contains(local-name(),'report-list')]//formly-group//formly-field[4]//input");
    private dtpCreatedDateFrom = By.xpath("//*[contains(local-name(),'report-list')]//formly-group//formly-field[3]//input");
    private dtpCreatedDateTo = By.xpath("//*[contains(local-name(),'report-list')]//formly-group//formly-field[4]//input");
    private btnRefreshExportHistory = By.xpath("//app-export-history//nav//li[7]//a");

    public async pressExportButton() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnExport);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.click(this.btnExport);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true;
        } catch (error) {
            console.log(`pressExportButton`);
            console.log(error);
            return false;
        }
    }
    public async pressExportedFilesButton() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnExportedFiles);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.click(this.btnExportedFiles);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true;
        } catch (error) {
            console.log(`pressExportedFilesButton`);
            console.log(error);
            return false;
        }
    }


    public async pressSearchReportButton() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnSearchReport);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.click(this.btnSearchReport);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true;
        } catch (error) {
            console.log(`pressSearchReport`);
            console.log(error);
            return false;
        }
    }


    public async inputAccountToSearchField(account: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbSearchReport);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.cmbSearchReport, account);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await selectDropdownOption(account, "", this.driverService);
            return true;
        } catch (error) {
            console.log("inputCountryOnContactForm");
            console.log(error);
            return false;
        }
    }

    public async inputCurrencyOnSearchFields(currency: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbCurrency);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.cmbCurrency, currency);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
            await selectDropdownOption(currency, "", this.driverService);
            return true;
        } catch (error) {
            console.log("inputCurrencyOnCurrencySearchField");
            console.log(error);
            return false;
        }
    }

    public async inputPeriodStartDateOnSearchFields(periodStartDate: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.dtpPeriodStartDate);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.dtpPeriodStartDate, periodStartDate);
            return true;
        } catch (error) {
            console.log("inputPeriodStartDateOnSearchFields");
            console.log(error);
            return false;
        }
    }

    public async inputPeriodEndDateOnSearchFields(periodEndDate: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.dtpPeriodEndDate);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.dtpPeriodEndDate, periodEndDate);
            return true;
        } catch (error) {
            console.log("inputPeriodEndDateOnSearchFields");
            console.log(error);
            return false;
        }
    }

    public async inputCreatedDateFromOnSearchFields(CreatedDateFrom: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.dtpCreatedDateFrom);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.dtpCreatedDateFrom, CreatedDateFrom);
            return true;
        } catch (error) {
            console.log("inputCreatedDateFromOnSearchFields");
            console.log(error);
            return false;
        }
    }


    public async inputCreatedDateToOnSearchFields(CreatedDateTo: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.dtpCreatedDateTo);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.dtpCreatedDateTo, CreatedDateTo);
            return true;
        } catch (error) {
            console.log("inputCreatedDateToOnSearchFields");
            console.log(error);
            return false;
        }
    }



    public async validateValueOnExportHistory(Name: string, createdDate: string, posisionRow: number) {
        let dd = createdDate.substring(0, 2);
        let mm = createdDate.substring(3, 5);
        let yyyy = createdDate.substring(6, 10);
        let expectedName = Name + "_" + dd + "." + mm + "." + yyyy + ".xlsx";
        let actualName: string = "";
        let actualCreatedDate: string = "";
        try {
            let lblName = By.xpath(`//app-export-history//tbody//tr[${posisionRow}]//td[1]//span`);
            let lblCreatedDate = By.xpath(`//app-export-history//tbody//tr[${posisionRow}]//td[2]//span`);
            await this.driverService.waitForElementEnabled(lblName);
            await this.driverService.waitForElementEnabled(lblCreatedDate);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            actualName = await this.driverService.getText(lblName);
            actualCreatedDate = await this.driverService.getText(lblCreatedDate);

        } catch (error) {
            console.log("validateNameOnExportHistory");
            console.log(error);
            return false;
        }

        if (actualName.toLowerCase().includes(expectedName.toLowerCase())) {
            expectedName = actualName;
        }

        //Maximize delay time is 3 minutes.
        if (actualCreatedDate.localeCompare(createdDate) !== 0) {
            if (Number(actualCreatedDate.substring(14, 16)) - Number(createdDate.substring(14, 16)) < 3) {
                createdDate = actualCreatedDate;
            }
        }

        return await this.driverService.validateRecord(
            "Export successfully",
            [actualName, expectedName, "Assert at Name: Incorrect Name"],
            [actualCreatedDate, createdDate, "Assert at Created Date: Incorrect Created Date"]
        );

    }

    public async downloadExportFileOnExportHistoryPageByRow(posisionRow: number = 1) {
        try {
            let btnDownload = By.xpath(`//app-export-history//tbody//tr[${posisionRow}]//td[3]//button`);
            await this.driverService.waitForElementEnabled(btnDownload);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.click(btnDownload);
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true;
        } catch (error) {
            console.log("downloadExportFileOnExportHistoryPageByRow");
            console.log(error);
            return false;
        }
    }

    public async refreshExportHistoryList() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnRefreshExportHistory);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.click(this.btnRefreshExportHistory);
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true;
        } catch (error) {
            console.log("refreshExportHistoryList");
            console.log(error);
            return false;
        }
    }



}