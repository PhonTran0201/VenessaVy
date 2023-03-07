import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2, waitUntilHorizontalProgressBarLoaded } from "../../../../../shared/functions";


/**
 * Guarantee List in account detail
 */


export class InstalmentList {
    protected txtEnterSearchKeyword = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-instalment-list//input[@placeholder='Enter search keyword']");
    protected btnSearch = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-instalment-list//div[./input[@placeholder='Enter search keyword']]//i[contains(@class,'fa-search')]");

    // Elements at Header of table Instalmet
    protected btnSortPostedDate = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-instalment-list//th/a/*[text()='Posted date']");

    constructor(protected driverService: SeleniumWebDriverService) { }


    //#region  region for validation value
    public async validateGuaranteeNoOnInstalmentList(ExpectedValue: string, positionRow: number = 1) {
        try {
            let lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//td[4]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lblValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualValue = await this.driverService.getText(lblValue);
            return await this.driverService.validateRecord(`Validate Guarantee No`, [ActualValue, ExpectedValue, `Incorrect Guarantee No`]);
        } catch (error) {
            console.log(`validateGuaranteeNoOnInstalmentList`);
            console.log(error);
            return false;
        }
    }

    public async validateDebtorOnInstalmentList(ExpectedValue: string, positionRow: number = 1) {
        try {
            let lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//td[5]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lblValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualValue = await this.driverService.getText(lblValue);
            return await this.driverService.validateRecord(`Validate Debtor`, [ActualValue, ExpectedValue, `Incorrect Debtor`]);
        } catch (error) {
            console.log(`validateDebtorOnInstalmentList`);
            console.log(error);
            return false;
        }
    }

    public async validatePostedDateOnInstalmentList(ExpectedValue: string, positionRow: number = 1) {
        try {
            let lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//td[6]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lblValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualValue = await this.driverService.getText(lblValue);
            if (ExpectedValue.toLowerCase().includes(ActualValue.toLowerCase())) {
                ExpectedValue = ActualValue;
            }
            return await this.driverService.validateRecord(`Validate Posted date`, [ActualValue, ExpectedValue, `Incorrect Posted date`]);
        } catch (error) {
            console.log(`validatePostedDateOnInstalmentList`);
            console.log(error);
            return false;
        }
    }

    public async validateStartDateOnInstalmentList(ExpectedValue: string, positionRow: number = 1) {
        try {
            let lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//td[7]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lblValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualValue = await this.driverService.getText(lblValue);
            return await this.driverService.validateRecord(`Validate Start date`, [ActualValue, ExpectedValue, `Incorrect Start date`]);
        } catch (error) {
            console.log(`validateStartDateOnInstalmentList`);
            console.log(error);
            return false;
        }
    }

    public async validateEndDateOnInstalmentList(ExpectedValue: string, positionRow: number = 1) {
        try {
            let lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//td[8]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lblValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualValue = await this.driverService.getText(lblValue);
            return await this.driverService.validateRecord(`Validate End date`, [ActualValue, ExpectedValue, `Incorrect End date`]);
        } catch (error) {
            console.log(`validateEndDateOnInstalmentList`);
            console.log(error);
            return false;
        }
    }

    public async validateAmountOnInstalmentList(ExpectedValue: string, positionRow: number = 1) {
        try {
            let lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//td[11]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lblValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualValue = await this.driverService.getText(lblValue);
            return await this.driverService.validateRecord(`Validate Amount`, [ActualValue, ExpectedValue, `Incorrect Amount`]);
        } catch (error) {
            console.log(`validateAmountOnInstalmentList`);
            console.log(error);
            return false;
        }
    }

    public async validateStatusOnInstalmentList(ExpectedValue: string, positionRow: number = 1) {
        try {
            let lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//td[12]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lblValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualValue = await this.driverService.getText(lblValue);
            return await this.driverService.validateRecord(`Validate Status`, [ActualValue, ExpectedValue, `Incorrect Status`]);
        } catch (error) {
            console.log(`validateStatusOnInstalmentList`);
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region Press Element on Instalment list
    public async openInstalmentByRowOnList(positionRow: number = 1) {
        try {
            let lblInstalmentNo = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//app-instalment-type-column-cell//a`);
            await this.driverService.waitUntilElementLoaded(lblInstalmentNo);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.click(lblInstalmentNo);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true;
        } catch (error) {
            console.log("openInstalmentByRowOnList");
            console.log(error);
            return false;
        }
    }

    public async pressMarkAsPaidInstalmentByRowOnList(positionRow: number = 1){
        try {
            const btnMarkAsPaid = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//app-gua-instalment-act-cell//button[not(@disabled)]/i[contains(@class,'fa-credit-card')]`);
            await this.driverService.waitUntilElementLoaded(btnMarkAsPaid);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.click(btnMarkAsPaid);
            return true;
        } catch (error) {
            console.log('pressMarkAsPaidInstalmentByRowOnList');
            console.log(error);
            return false;
        }
    }

    public async pressEditInstalmentByRowOnList(positionRow: number = 1){
        try {
            const btnEdit = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[$${positionRow}]//app-gua-instalment-act-cell//button/i[contains(@class,'fa-edit')]`);
            await this.driverService.waitUntilElementLoaded(btnEdit);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.click(btnEdit);
            return true;
        } catch (error) {
            console.log('pressEditInstalmentByRowOnList');
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region Get value on Instalment list
    public async getInstalmentNoByRow(positionRow: number = 1) {
        try {
            let lblInstalmentNo = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//app-instalment-type-column-cell//a`);
            await this.driverService.waitUntilElementLoaded(lblInstalmentNo);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let actualInstalmentNo = await this.driverService.getText(lblInstalmentNo);
            return actualInstalmentNo;
        } catch (error) {
            console.log("getInstalmentNoByRow");
            console.log(error);
            return "";
        }
    }
    public async getStartDateByRow(positionRow: number = 1) {
        try {
            let lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-instalment-list//tbody/tr[${positionRow}]/td[count(//table/thead/tr/th[.="Start date"]/preceding-sibling::th)+1]`);
            await this.driverService.waitUntilElementLoaded(lblValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let actualInstalmentNo = await this.driverService.getText(lblValue);
            return actualInstalmentNo;
        } catch (error) {
            console.log("getStartDateByRow");
            console.log(error);
            return "";
        }
    }
    public async getEndDateByRow(positionRow: number = 1) {
        try {
            let lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-instalment-list//tbody/tr[${positionRow}]/td[count(//table/thead/tr/th[.="End date"]/preceding-sibling::th)+1]`);
            await this.driverService.waitUntilElementLoaded(lblValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let actualInstalmentNo = await this.driverService.getText(lblValue);
            return actualInstalmentNo;
        } catch (error) {
            console.log("getEndDateByRow");
            console.log(error);
            return "";
        }
    }
    public async getAmountByRow(positionRow: number = 1) {
        try {
            let lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-instalment-list//tbody/tr[${positionRow}]//app-guarantee-currency-col//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lblValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let actualInstalmentNo = await this.driverService.getText(lblValue);
            return actualInstalmentNo;
        } catch (error) {
            console.log("getAmountByRow");
            console.log(error);
            return "";
        }
    }
    public async getStatusByRow(positionRow: number = 1) {
        try {
            let lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-instalment-list//tbody/tr[${positionRow}]//app-instalment-status-col//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lblValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let actualInstalmentNo = await this.driverService.getText(lblValue);
            return actualInstalmentNo;
        } catch (error) {
            console.log("getStatusByRow");
            console.log(error);
            return "";
        }
    }
    //#endregion

    //#region Search Instalment (Input vào Instalment No, Guarantee No đều được)
    public async inputSearchKeywordInstalment(keyword: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtEnterSearchKeyword);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.txtEnterSearchKeyword, keyword);
            return true;
        } catch (error) {
            console.log('inputSearchKeywordInstalment');
            console.log(error);
            return false;
        }
    }

    public async pressSearchInstalment() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnSearch);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.click(this.btnSearch);
            return true;
        } catch (error) {
            console.log('pressSearchInstalment');
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region Sort Instalment list
    public async pressSortInstalmentListByPostedDate() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnSortPostedDate);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.click(this.btnSortPostedDate);
            return true;
        } catch (error) {
            console.log('pressSortInstalmentListByPostedDate');
            console.log(error);
            return false;
        }
    }

    public async revertSortingPostedDateAsDefault() {
        const lblIsSorting = By.xpath("//app-customer-instalment-list//th[./a/*[text()='Posted date']]//i[contains(@class,'fa-sort-')]");
        for (let i = 1; i <= 10; i++) {
            if (await this.driverService.isExisted(lblIsSorting)) {
                await this.pressSortInstalmentListByPostedDate();
                continue;
            }
            break;
        }
    }

    //#endregion

    public async synchronizeInstalmentTo24SevenByRow(positionRow: number = 1) {
        try {
            let btnSynchronize = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-instalment-list//table//tbody//tr[${positionRow}]//app-gua-instalment-act-cell//button[./i[contains(@class,'fa-sync')]]`);
            await this.driverService.waitUntilElementLoaded(btnSynchronize);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.click(btnSynchronize);
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true;
        } catch (error) {
            console.log("synchronizeInstalmentTo24SevenByRow");
            console.log(error);
            return false;

        }
    }

    public async clickMarkAsPaidInstalmentByRow(positionRow: number = 1) {
        try {
            let btnMarkAsPaid = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-instalment-list//table//tbody//tr[${positionRow}]//app-gua-instalment-act-cell//button[./i[contains(@class,'fa-credit-card')]]`);
            await this.driverService.waitUntilElementLoaded(btnMarkAsPaid);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.click(btnMarkAsPaid);
            return true;
        } catch (error) {
            console.log("clickMarkAsPaidInstalmentByRow");
            console.log(error);
            return false;

        }
    }

    public async getOrderNoOnInstalmentListByRow(positionRow: number = 1) {
        try {
            let lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-instalment-list//tbody/tr[${positionRow}]/td[count(//table/thead/tr/th[.="Order no."]/preceding-sibling::th)+1]`);
            await this.driverService.waitUntilElementLoaded(lblValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualValue = await this.driverService.getText(lblValue);
            if (ActualValue.includes('N/A')) {
                return "";
            }
            return ActualValue;

        } catch (error) {
            console.log("getOrderNoOnInstalmentListByRow");
            console.log(error);
            return "";

        }
    }

    public async getInvoiceNoOnInstalmentListByRow(positionRow: number = 1) {
        try {
            let lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-instalment-list//tbody/tr[${positionRow}]/td[count(//table/thead/tr/th[.="Invoice no."]/preceding-sibling::th)+1]`);
            await this.driverService.waitUntilElementLoaded(lblValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualValue = await this.driverService.getText(lblValue);
            if (ActualValue.includes('N/A')) {
                return "";
            }
            return ActualValue;

        } catch (error) {
            console.log("getInvoiceNoOnInstalmentListByRow");
            console.log(error);
            return "";

        }
    }
}