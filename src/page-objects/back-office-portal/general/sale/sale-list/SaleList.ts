import { fail } from "assert";
import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";
import { getCurrentDateTime, logFailMessage, logInfoMessage, logWarningMessage, reloadTable, selectDropdownOption, waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";

export class SaleList extends BasePage {
    protected strRootXpath = "";
    private btnCreateSale = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//*[(local-name()='app-sale-card-list' and not(@hidden)) or (local-name()='app-sale-table-view' and not(@hidden))]//*[@id='pgs-slist-create-btn']");
    private btnPerson = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//*[(local-name()='app-sale-card-list' and not(@hidden)) or (local-name()='app-sale-table-view' and not(@hidden))]//*[@id='pgs-slist-create-per-btn']");
    private btnCompany = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//*[(local-name()='app-sale-card-list' and not(@hidden)) or (local-name()='app-sale-table-view' and not(@hidden))]//*[@id='pgs-slist-create-company-btn']");
    private btnSearchAndFilter = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//*[(local-name()='app-sale-card-list' and not(@hidden)) or (local-name()='app-sale-table-view' and not(@hidden))]//button//span[text()='Search & Filter']");

    // Button List view and Card view
    private btnListView = By.xpath("//*[@id='pgs-slist-list-view-btn']");
    private btnCardView = By.xpath("//*[@id='pgs-slist-card-view-btn']");


    //Dropdown at sale list
    private cmbSaleListType = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//*[(local-name()='app-sale-card-list' and not(@hidden)) or (local-name()='app-sale-table-view' and not(@hidden))]//*[@id='pgs-sale-list-type' or @id='pgs-sale-card-sales-rep']`);


    //Locator for elements at first row of sales list
    private lblSales = By.xpath(this.strRootXpath + "//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[1]//app-opportunity-cell/a");
    private lblAccount = By.xpath(this.strRootXpath + "//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[1]//td[contains(@class,'pgs-sale-account')]//*[self::*[text()]]");
    private lblPipeline = By.xpath(this.strRootXpath + "//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[1]//td[contains(@class,'pgs-sale-pipeline')]//*[self::*[text()]]");
    private lblProduct = By.xpath(this.strRootXpath + "//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[1]//td[contains(@class,'pgs-sale-product')]//*[self::*[text()]]");
    private lblSalesRep = By.xpath(this.strRootXpath + "//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[1]//td[contains(@class,'pgs-sale-sale-rep')]//*[self::*[text()]]");
    private lblKAM = By.xpath(this.strRootXpath + "//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[1]//td[contains(@class,'pgs-sale-kam')]//*[self::*[text()]]");
    private lblAmount = By.xpath(this.strRootXpath + "//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[1]//td[contains(@class,'pgs-sale-amount')]//*[self::*[text()]]");
    private lblCurrency = By.xpath(this.strRootXpath + "//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[1]//td[contains(@class,'pgs-sale-currency')]//*[self::*[text()]]");
    private lblCloseDate = By.xpath(this.strRootXpath + "//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[1]//td[contains(@class,'pgs-sale-closed-date')]//*[self::*[text()]]");
    private lblStage = By.xpath(this.strRootXpath + "//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[1]//td[contains(@class,'pgs-sale-stage')]//*[self::*[text()]]");

    //btn Edit sale at first row in sales list
    private btnEditSale = By.xpath(this.strRootXpath + `//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[1]//*[@id="pgs-sale-l-act-edit-btn"]`);

    private lblTotalRecords = By.xpath(this.strRootXpath + "//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(text(),'Total') and contains(text(),'records')]");



    public async navigateToSalesCardViewList() {
        try {
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await this.driverService.waitUntilElementLoaded(this.btnCardView);
            await this.driverService.click(this.btnCardView);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true;
        } catch (error) {
            console.log("navigateToSalesCardViewList");
            console.log(error);
            return false;
        }
    }

    public async openCreateSalesForm() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnCreateSale);
            await this.driverService.click(this.btnCreateSale);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true
        } catch (error) {
            console.log("openCreateSalesForm");
            console.log(error);
            return false;

        }
    }

    public async openCreateSalesPersonForm() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnCreateSale);
            await this.driverService.click(this.btnCreateSale);
            await this.driverService.waitUntilElementLoaded(this.btnPerson);
            await this.driverService.click(this.btnPerson);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true;
        } catch (error) {
            console.log("openCreateSalesPersonForm");
            console.log(error);
            return false;
        }
    }

    public async openCreateSalesCompanyForm() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnCreateSale);
            await this.driverService.click(this.btnCreateSale);
            await this.driverService.waitUntilElementLoaded(this.btnCompany);
            await this.driverService.click(this.btnCompany);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true;
        } catch (error) {
            console.log("openCreateSalesCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async openEditSalesForm(positionRow = 1) {
        try {
            const btnEditSale = By.xpath(`(//*[@id="pgs-sale-l-act-edit-btn"])[${positionRow}]`);
            await this.driverService.waitUntilElementLoaded(btnEditSale);
            await this.driverService.click(btnEditSale);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true;
        } catch (error) {
            console.log("openEditSalesForm");
            console.log(error);
            return false;
        }
    }
    public async openEditSalesFormByName(selectedSale: string) {
        try {
            await this.driverService.waitUntilElementLoaded(By.xpath(`(//app-opportunity-cell/a)[1]`));
            await this.driverService.waitForSeconds(4000);
            await reloadTable(this.driverService);
            for (let i = 1; i <= 30; i++) {
                let lblSale = By.xpath(`(//app-opportunity-cell/a)[${i}]`);
                if ((await this.driverService.isExisted(lblSale)) === false) {
                    fail(`Can't find sale with name \"${selectedSale}\" into Sale List`);
                } else {
                    let nameSale = await this.driverService.getText(lblSale);
                    if (nameSale.localeCompare(selectedSale) === 0) {
                        let btnEdit = By.xpath(`(//button[@id='pgs-sale-l-act-edit-btn'])[${2 * i - 1}]`);
                        await this.driverService.click(btnEdit);
                        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
                        return true;
                    }
                }
            }
            logFailMessage(`Can't find sale with name \"${selectedSale}\" into Sale List`);
            return false;
        } catch (error) {
            console.log("openEditSalesFormByName");
            console.log(error);
            return false;
        }
    }
    public async inputDropdownSaleListType(typeName: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbSaleListType);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await this.driverService.setText(this.cmbSaleListType, typeName);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await selectDropdownOption(typeName, "", this.driverService);

            return true;
        } catch (error) {
            console.log("inputDropdownSaleListType");
            console.log(error);
            return false;
        }
    }

    // Validate values at Sale list
    public async validateValueSaleList(expectedValue: string, nameOfColumn: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
        try {
            let temp = By.xpath("//div");
            switch (nameOfColumn) {
                case "Sales": {
                    temp = By.xpath(this.strRootXpath + `//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-sale-sale-name')]//*[self::*[text()]]`);
                    break;
                }
                case "Reference": {
                    temp = By.xpath(this.strRootXpath + `//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-sale-reference')]//*[self::*[text()]]`);
                    break;
                }
                case "Account": {
                    temp = By.xpath(this.strRootXpath + `//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-sale-account')]//*[self::*[text()]]`);
                    break;
                }
                case "Pipeline": {
                    temp = By.xpath(this.strRootXpath + `//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-sale-pipeline')]//*[self::*[text()]]`);
                    break;
                }
                case "Sales rep.": {
                    temp = By.xpath(this.strRootXpath + `//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-sale-sale-rep')]//*[self::*[text()]]`);
                    break;
                }
                case "KAM": {
                    temp = By.xpath(this.strRootXpath + `//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-sale-kam')]//*[self::*[text()]]`);
                    break;
                }
                case "Status": {
                    temp = By.xpath(this.strRootXpath + `//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-sale-status')]//*[self::*[text()]]`);
                    break;
                }
                case "Amount": {
                    temp = By.xpath(this.strRootXpath + `//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-sale-amount')]//*[self::*[text()]]`);
                    break;
                }
                case "Currency": {
                    temp = By.xpath(this.strRootXpath + `//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-sale-currency')]//*[self::*[text()]]`);
                    break;
                }
                case "Close Date": {
                    temp = By.xpath(this.strRootXpath + `//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-sale-closed-date')]//*[self::*[text()]]`);
                    break;
                }
                case "Product": {
                    temp = By.xpath(this.strRootXpath + `//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-sale-product')]//*[self::*[text()]]`);
                    break;
                }
                case "Stage": {
                    temp = By.xpath(this.strRootXpath + `//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-sale-stage')]//*[self::*[text()]]`);
                    break;
                }
                case "Last Updated": {
                    temp = By.xpath(this.strRootXpath + `//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-sale-last-updated')]//*[self::*[text()]]`);
                    break;
                }
                case "Organization": {
                    temp = By.xpath(this.strRootXpath + `//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]//app-org-cell`);
                    break;
                }

                case "Team": {
                    temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-sale-team')]//*[self::*[text()]]`)
                    break
                }

                case "TeamMember": {
                    temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-sale-teammember')]//*[self::*[text()]]`)
                    break
                }

                case "Phone": {
                    temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-sale-mobile')]//*[self::*[text()]]`)
                    break
                }
                case "TimeToCall": {
                    temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@id,'column-7')]//*[self::*[text()]]`)
                    break
                }

                default:
                    logWarningMessage(`Column with name "${nameOfColumn}" is NOT found!`);
                    return false;
            }
            await this.driverService.waitUntilElementLoaded(temp);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let actualValue = await this.driverService.getText(temp);
            //Maximize delay time is 3 minutes.
            if (nameOfColumn.localeCompare("Last Updated") === 0 && actualValue.localeCompare(expectedValue) !== 0) {
                if (Number(actualValue.substring(14, 16)) - Number(expectedValue.substring(14, 16)) < 3) {
                    expectedValue = actualValue;
                }
            }
            if (isUsedForSearch) {
                if (nameOfColumn.localeCompare("Currency") === 0) {
                    const temp1 = actualValue;
                    actualValue = expectedValue;
                    expectedValue = temp1;
                }
                return actualValue.toLowerCase().includes(expectedValue.toLowerCase());
            }
            else {
                return await this.driverService.validateRecord(`Validate column "${nameOfColumn}"`,
                    [actualValue, expectedValue, `Incorrect "${nameOfColumn}"!`]
                );
            }
        } catch (error) {
            console.log("validateValueSaleList");
            console.log(error);
            return false;
        }
    }

    /*Begin: get value at sale list*/
    public async getValueSaleList(nameOfColumn: string, positionRow: number = 1) {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnCreateSale);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let temp = By.xpath("//div");
            switch (nameOfColumn) {
                case "Sales": {
                    temp = By.xpath(this.strRootXpath + `//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-sale-sale-name')]//*[self::*[text()]]`);
                    break;
                }
                case "Reference": {
                    temp = By.xpath(this.strRootXpath + `//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-sale-reference')]//*[self::*[text()]]`);
                    break;
                }
                case "Account": {
                    temp = By.xpath(this.strRootXpath + `//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-sale-account')]//*[self::*[text()]]`);
                    break;
                }
                case "Pipeline": {
                    temp = By.xpath(this.strRootXpath + `//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-sale-pipeline')]//*[self::*[text()]]`);
                    break;
                }
                case "Sales rep.": {
                    temp = By.xpath(this.strRootXpath + `//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-sale-sale-rep')]//*[self::*[text()]]`);
                    break;
                }
                case "KAM": {
                    temp = By.xpath(this.strRootXpath + `//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-sale-kam')]//*[self::*[text()]]`);
                    break;
                }
                case "Status": {
                    temp = By.xpath(this.strRootXpath + `//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-sale-status')]//*[self::*[text()]]`);
                    break;
                }
                case "Amount": {
                    temp = By.xpath(this.strRootXpath + `//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-sale-amount')]//*[self::*[text()]]`);
                    break;
                }
                case "Currency": {
                    temp = By.xpath(this.strRootXpath + `//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-sale-currency')]//*[self::*[text()]]`);
                    break;
                }
                case "Close Date": {
                    temp = By.xpath(this.strRootXpath + `//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-sale-closed-date')]//*[self::*[text()]]`);
                    break;
                }
                case "Product": {
                    temp = By.xpath(this.strRootXpath + `//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-sale-product')]//*[self::*[text()]]`);
                    break;
                }
                case "Stage": {
                    temp = By.xpath(this.strRootXpath + `//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-sale-stage')]//*[self::*[text()]]`);
                    break;
                }
                case "Last Updated": {
                    temp = By.xpath(this.strRootXpath + `//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-sale-last-updated')]//*[self::*[text()]]`);
                    break;
                }
                case "Organization": {
                    temp = By.xpath(this.strRootXpath + `//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]//app-org-cell`);
                    break;
                }
                default:
                    logWarningMessage(`Column with name "${nameOfColumn}" is NOT found!`);
                    return "";
            }

            return await this.driverService.getText(temp);
        } catch (error) {
            console.log("getValueSaleList");
            console.log(error);
            return "";
        }
    }
    /*End: get value at claim list*/

    public async openSaleDetailByName(selectedSale: string) {
        try {
            await this.driverService.waitUntilElementLoaded(By.xpath(`(//app-opportunity-cell/a)[1]`));
            for (let i = 1; i <= 30; i++) {
                let lblSale = By.xpath(`(//app-opportunity-cell/a)[${i}]`);
                if ((await this.driverService.isExisted(lblSale)) === false) {
                    // do nothing
                } else {
                    let nameSale = await this.driverService.getText(lblSale);
                    if (nameSale.localeCompare(selectedSale) === 0) {
                        let detailSale = By.xpath(`(//app-opportunity-cell/a)[${i}]`);
                        await this.driverService.click(detailSale);
                        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
                        return true;
                    }
                }
            }
            logWarningMessage(`Can't find sale with name \"${selectedSale}\" into Sale List`);
            return false;
        } catch (error) {
            console.log("openSaleDetailByName");
            console.log(error);
            return false;
        }
    }

    public async openSaleDetail(positionRow: number = 1) {
        try {
            const lblSalesName = By.xpath(`(${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-opportunity-cell)[${positionRow}]`)
            await this.driverService.waitUntilElementLoaded(lblSalesName);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
            await this.driverService.click(lblSalesName);
            await this.waitPageProgressCompleted();
            return true;
        } catch (error) {
            console.log("openSaleDetail");
            console.log(error);
            return false;
        }
    }

    public async reloadSaleList() {
        try {
            logInfoMessage("Wait for loading about 10s....");
            await this.driverService.waitForSeconds(10000);
            await reloadTable(this.driverService);
            await this.driverService.waitForSeconds(5000);
            await reloadTable(this.driverService);
        } catch (error) {
            console.log("reloadSaleList");
            console.log(error);
            return false;
        }
    }

    public async assertCreateSale(
        positionRow: number = 1,
        sales: string,
        account: string,
        pipeline: string,
        salesRep: string,
        KAM: string,
        amount: string,
        currency: string,
        closedDate: string,
        product: string,
        stage: string
    ) {
        let actualSales: string = "";
        let actualAccount: string = "";
        let actualPipeline: string = "";
        let actualSalesRep: string = "";
        let actualKAM: string = "";
        let actualAmount: string = "";
        let actualCurrency: string = "";
        let actualClosedDate: string = "";
        let actualLastUpdated: string = "";
        let actualProduct: string = "";
        let actualStage: string = "";
        try {
            const lblSales = By.xpath(`(//app-opportunity-cell/a)[${positionRow}]`);
            const lblAccount = By.xpath(`//table//tr[${positionRow}]//td[contains(@class,'pgs-sale-account')]//*[self::*[text()]]`);
            const lblPipeline = By.xpath(`//table//tr[${positionRow}]//td[contains(@class,'pgs-sale-pipeline')]//*[self::*[text()]]`);
            const lblSalesRep = By.xpath(`//table//tr[${positionRow}]//td[contains(@class,'pgs-sale-sale-rep')]//*[self::*[text()]]`);
            const lblKAM = By.xpath(`//table//tr[${positionRow}]//td[contains(@class,'pgs-sale-kam')]//*[self::*[text()]]`);
            const lblAmount = By.xpath(`//table//tr[${positionRow}]//td[contains(@class,'pgs-sale-amount')]//*[self::*[text()]]`);
            const lblCurrency = By.xpath(`//table//tr[${positionRow}]//td[contains(@class,'pgs-sale-currency')]//*[self::*[text()]]`);
            const lblCloseDate = By.xpath(`//table//tr[${positionRow}]//td[contains(@class,'pgs-sale-closed-date')]//*[self::*[text()]]`);
            const lblLastUpdated = By.xpath(`//table//tr[${positionRow}]//td[contains(@class,'pgs-sale-last-updated')]//*[self::*[text()]]`);
            const lblProduct = By.xpath(`//table//tr[${positionRow}]//td[contains(@class,'pgs-sale-product')]//*[self::*[text()]]`);
            const lblStage = By.xpath(`//table//tr[${positionRow}]//td[contains(@class,'pgs-sale-stage')]//*[self::*[text()]]`);
            await this.driverService.waitUntilElementLoaded(lblAccount);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);


            actualSales = await this.driverService.getText(lblSales);
            actualAccount = await this.driverService.getText(lblAccount);
            actualPipeline = await this.driverService.getText(lblPipeline);
            actualSalesRep = await this.driverService.getText(lblSalesRep);
            actualKAM = await this.driverService.getText(lblKAM);
            actualAmount = await this.driverService.getText(lblAmount);
            actualCurrency = await this.driverService.getText(lblCurrency);
            actualClosedDate = await this.driverService.getText(lblCloseDate);
            actualLastUpdated = await (await this.driverService.getText(lblLastUpdated)).substring(0, 10);
            actualProduct = await this.driverService.getText(lblProduct);
            actualStage = await this.driverService.getText(lblStage);
        } catch (error) {
            console.log("assertCreateSale");
            console.log(error);
        }

        if (!KAM) {
            actualKAM = KAM = " ";
        }
        const expectedLastUpdated = getCurrentDateTime().substring(0, 10);
        await this.driverService.validateTestCase(
            "Create Sale successfully!",
            [actualSales, sales, "Assert at sales"],
            [actualAccount, account, "Assert at account"],
            [actualPipeline, pipeline, "Assert at pipeline"],
            [actualSalesRep, salesRep, "Assert at salesRep"],
            [actualKAM, KAM, "Assert at KAM"],
            [actualAmount, amount, "Assert at amount"],
            [actualCurrency, currency, "Assert at currency"],
            [actualClosedDate, closedDate, "Assert at closedDate"],
            [actualLastUpdated, expectedLastUpdated, "Assert at Last updated"],
            [actualProduct, product, "Assert at product"],
            [actualStage, stage, "Assert at stage"]
        );
    }

    public async assertEditSale(
        positionRow: number,
        sales: string,
        activities: string,
        salesRep: string,
        amount: string,
        currency: string,
        closedDate: string,
        product: string,
        stage: string
    ) {
        let actualSales: string = "";
        let actualActivities: string = "";
        let actualSalesRep: string = "";
        let actualAmount: string = "";
        let actualCurrency: string = "";
        let actualClosedDate: string = "";
        let actualProduct: string = "";
        let actualStage: string = "";
        try {
            //Locator for elements at first row of sales list
            let lblSales = By.xpath(`(//app-opportunity-cell/a)[${positionRow}]`);
            let lblPipeline = By.xpath(`//table//tr[${positionRow}]//td[contains(@class,'pgs-sale-pipeline')]//*[self::*[text()]]`);
            let lblSalesRep = By.xpath(`//table//tr[${positionRow}]//td[contains(@class,'pgs-sale-sale-rep')]//*[self::*[text()]]`);
            let lblAmount = By.xpath(`//table//tr[${positionRow}]//td[contains(@class,'pgs-sale-amount')]//*[self::*[text()]]`);
            let lblCurrency = By.xpath(`//table//tr[${positionRow}]//td[contains(@class,'pgs-sale-currency')]//*[self::*[text()]]`);
            let lblCloseDate = By.xpath(`//table//tr[${positionRow}]//td[contains(@class,'pgs-sale-closed-date')]//*[self::*[text()]]`);
            let lblProduct = By.xpath(`//table//tr[${positionRow}]//td[contains(@class,'pgs-sale-product')]//*[self::*[text()]]`);
            let lblStage = By.xpath(`//table//tr[${positionRow}]//td[contains(@class,'pgs-sale-stage')]//*[self::*[text()]]`);
            await this.driverService.waitUntilElementLoaded(lblSales);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);

            actualSales = await this.driverService.getText(lblSales);
            actualActivities = await this.driverService.getText(lblPipeline);
            actualSalesRep = await this.driverService.getText(lblSalesRep);
            actualAmount = await this.driverService.getText(lblAmount);
            actualCurrency = await this.driverService.getText(lblCurrency);
            actualClosedDate = await this.driverService.getText(lblCloseDate);
            actualProduct = await this.driverService.getText(lblProduct);
            actualStage = await this.driverService.getText(lblStage);
        } catch (error) {
            console.log("assertEditSale");
            console.log(error);
        }
        await this.driverService.validateTestCase(
            "Edit sale successfully",
            [actualSales, sales, "Assert at sales: Incorrect Sale!"],
            [actualActivities, activities, "Assert at activities: Incorrect Activities!"],
            [actualSalesRep, salesRep, "Assert at salesRep: Incorrect SalesRep!"],
            [actualAmount, amount, "Assert at amount: Incorrect Amount!"],
            [actualCurrency, currency, "Assert at currency: Incorrect Currency!"],
            [actualClosedDate, closedDate, "Assert at closedDate: Incorrect Closed Date!"],
            [actualProduct, product, "Assert at product: Incorrect Product!"],
            [actualStage, stage, "Assert at stage: Incorrect Stage!"]
        );
    }

    public async pressDeleteSaleByName(nameSale: string) {
        try {
            await this.driverService.waitUntilElementLoaded(By.xpath(`//*[contains(local-name(),'app')]//app-opportunity-cell/a`));
            for (let i = 1; i <= 30; i++) {
                let saleName = By.xpath(`(//*[contains(local-name(),'app')]//app-opportunity-cell/a)[${i}]`);
                if ((await this.driverService.isExisted(saleName)) === false) {
                    // logInfoMessage(`Can't find sale with name \"${nameSale}\" into Sale List`);
                } else {
                    let actualName = await this.driverService.getText(saleName);
                    if (actualName.localeCompare(nameSale) === 0) {
                        let btnDelete = By.xpath(
                            `(//*[@id='pgs-sale-l-act-delete-btn']/i[contains(@class,'fa-trash')])[${i}]`
                        );
                        await this.driverService.click(btnDelete);
                        return i;
                    }
                }
            }
            logFailMessage(`Can't find sale with name \"${nameSale}\" into sale List`);
            return false;
        } catch (error) {
            console.log("pressDeleteSaleByName");
            console.log(error);
            return false;
        }
    }

    public async pressDeleteSaleByRow(positionRow: number = 1) {
        try {
            let btnDelete = By.xpath(`(//*[@id='pgs-sale-l-act-delete-btn']/i[contains(@class,'fa-trash')])[${positionRow}]`);
            await this.driverService.waitUntilElementVisible(btnDelete);
            await this.driverService.click(btnDelete);
            return true;
        } catch (error) {
            console.log("pressDeleteSaleByRow");
            console.log(error);
            return false;
        }
    }

    /*Begin Regression*/
    public async verifyButtonsOnTopOfSaleTable() {
        let countError = 0;
        try {
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            logInfoMessage("\tVerify buttons at Sale list:");

            //Verify "Create" button
            if (!(await this.driverService.isExisted(this.btnCreateSale))) {
                logWarningMessage(`'Can't find "Create" button on Sale list`);
                countError++;
            }
            // else{
            //   console.log(this.btnCreateSale);
            //   let expandedStatus = await this.driverService.getAttributeValue(this.btnCreateSale, "aria-expanded");
            //   if(expandedStatus.localeCompare("true") === 0){
            //     logWarningMessage("\"Create\" button should not be expanded!");
            //     countError++;
            //   }
            // }

            //Verify "List View" button
            if (!(await this.driverService.isExisted(this.btnListView))) {
                logWarningMessage(`'Can't find "List View" button on Sale list`);
                countError++;
            }
            else {
                let temp = By.xpath("//button[@id='pgs-slist-list-view-btn' and not(@disabled)]");
                if ((await this.driverService.isExisted(temp))) {
                    logWarningMessage("\"List View\" button should be disabled!");
                    countError++;
                }
            }

            //Verify "Card View" button
            if (!(await this.driverService.isExisted(this.btnCardView))) {
                logWarningMessage(`'Can't find "Card View" button on Sale list`);
                countError++;
            }

            //Verify "Search and Filter" button
            if (!(await this.driverService.isExisted(this.btnSearchAndFilter))) {
                logWarningMessage(`'Can't find "Search & Filter" button on Account list`);
                countError++;
            }
        } catch (error) {
            console.log("verifyButtonsOnTopOfSaleTable");
            console.log(error);
            return false;
        }
        if (countError > 0) {
            return false;
        }
        else {
            return true;
        }
    }

    public async verifyColumnsOfSaleTable() {
        let countError = 0;
        try {
            logInfoMessage('\tVerify columns of Sale list:');

            const titleColumns = ["Action", "Sales Name", "Reference", "Account", "Pipeline", "Sales Stage", "Sales Rep.",
                "KAM", "Total Deal Amount", "Currency", "Close Date", "Product"];

            for (const element of titleColumns) {
                const title = By.xpath(`//table//th//span[text()='${element}']`);
                if (!(await this.driverService.isExisted(title))) {
                    logWarningMessage(`Case list is missing "${element}" column!`);
                    countError++;
                }
            }
        } catch (error) {
            console.log("verifyColumnsOfSaleTable");
            console.log(error);
            return false;
        }
        return countError === 0;
    }


    public async getNumberOfTotalRecords() {
        try {
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            let temp = await this.driverService.getText(this.lblTotalRecords);
            let result = parseInt(temp.replace(/^\D+/g, ''));
            return result;
        } catch (error) {
            console.log(error);
            return -1;
        }
    }

    public async assertDeleteSaleByName(saleName: string, positionRow: number) {
        try {
            let lblSales = By.xpath(`(//*[contains(local-name(),'app')]//app-opportunity-cell/a)[${positionRow}]`);
            let actualSaleName = await this.driverService.getText(lblSales);
            if (saleName.localeCompare(actualSaleName) === 0) {
                return false;
            }
            else {
                return true;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    //Check a sale with name find in first row of Sale list
    public async checkSaleWithNameNotExisted(saleName: string) {
        try {
            const lblFirstSaleName = By.xpath('//table//tr[1]//app-opportunity-cell/a');
            await this.driverService.waitUntilElementLoaded(lblFirstSaleName);
            const actualSaleName = await this.driverService.getText(lblFirstSaleName);
            return saleName.localeCompare(actualSaleName) !== 0;
        } catch (error) {
            console.log("checkSaleWithNameExisted");
            console.log(error);
            return false;
        }
    }
    /*End Regression*/

    //#region Validate value on sale list
    public async validateSalesNameOnSalesList(expetedValue: string, positionRow: number = 1) {
        try {
            let xpathValue = By.xpath(`//app-sale-list//table//tbody//tr[${positionRow}]//app-opportunity-cell//a`);
            await this.driverService.waitUntilElementLoaded(xpathValue);
            let actualValue = await this.driverService.getText(xpathValue);
            return await this.driverService.validateRecord("Validate Sales name: ", [actualValue, expetedValue, "Incorrect Sales name"]);
        } catch (error) {
            console.log('validateSalesNameOnSalesList');
            console.log(error);
            return false;
        }
    }

    public async validateAccountNameOnSalesList(expetedValue: string, positionRow: number = 1) {
        try {
            let xpathValue = By.xpath(`//app-sale-list//table//tbody//tr[${positionRow}]//app-detail-card-col//a`);
            await this.driverService.waitUntilElementLoaded(xpathValue);
            let actualValue = await this.driverService.getText(xpathValue);
            return await this.driverService.validateRecord("Validate Account name: ", [actualValue, expetedValue, "Incorrect Account name"]);
        } catch (error) {
            console.log('validateAccountNameOnSalesList');
            console.log(error);
            return false;
        }
    }

    public async openAccountByRowOnSalesList(positionRow: number = 1) {
        try {
            let xpathValue = By.xpath(`//app-sale-list//table//tbody//tr[${positionRow}]//app-detail-card-col//a`);
            await this.driverService.waitUntilElementLoaded(xpathValue);
            await this.driverService.click(xpathValue);
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true;
        } catch (error) {
            console.log("openAccountByRowOnSalesList");
            console.log(error);
            return false;
        }
    }
    async clearAllFilters() {
        try {
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            let filterXpath = By.xpath(`//c-filter-dropdown//span[@title='Clear all']`);
            if (await this.driverService.isExisted(filterXpath)) {
                await this.driverService.click(filterXpath);
                await waitUntilHorizontalProgressBarLoaded(this.driverService);
            }
            return true;
        } catch (error) {
            console.log(`clearAllFilters`);
            console.log(error);
            return false;
        }
    }
}
