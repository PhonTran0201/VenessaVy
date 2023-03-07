import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { logFailMessage, logFailTestcase, logSuccessMessage, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";
import { validateApproximateCurrency } from "../../../../../shared/tenant-setting/tenant-setting";


/**
 * 2nd Creating Quote in Anonymous Quote
 * Là cái màn hình Creating Quote thứ 2
 * or "app-payment-step"
 * Giống nhau giữa các Product
 */
export class QuoteCreatingPaymentQuote extends BasePage{
    protected strRootXpath = "";
    //#region Alert
    private lblAlertWarning = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'alert-warning')]`);
    private btnCloseAlertWarning = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'alert-warning')]/span`);
    //#endregion

    //#region App Progress Indicator: Product - Question - Review - Acceptance
    ///??????????????????
    //#endregion

    //#region Created Date - Last Updated Date
    private lblCreatedDate = By.xpath(``);///?????
    //#endregion

    //#region Quote Ready for purchase
    private lblCurrency_QuoteReadyPurchase = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Quotes ready for purchase']]//h4[2]`);

    private btnBackToQuotesList_QuoteReadyPurchase = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[text()=' Back To Quotes List ' and not(@disabled)]`);
    private btnBack_QuoteReadyPurchase = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[text()=' Back ' and not(@disabled)]`);
    private btnPurchase_QuoteReadyPurchase = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[text()='Purchase' and not(@disabled)]`);
    //#endregion


    //#region Other available quotes

    //#endregion


    //#region Other products
    //#endregion

    //#region Methods
    //#region Methods on Quote ready for purchase
    public async validateCurrency_QuoteReadyPurchase(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblCurrency_QuoteReadyPurchase);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(this.lblCurrency_QuoteReadyPurchase);
            return await this.driverService.validateRecord("Validate Currency",
                [actualValue, "CURRENCY: " + expectedValue, "Incorrect Currency"]);
        } catch (error) {
            console.log('validateCurrency_QuoteReadyPurchase');
            console.log(error);
            return false;
        }
    }

    public async validateQuoteRef_QuoteReadyPurchase(expectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
        try {
            const lblActualValue = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[1]//tbody//tr[${positionRow}]//td/app-edit-link-col/a`);
            await this.driverService.waitUntilElementLoaded(lblActualValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            const actualValue = await this.driverService.getText(lblActualValue);
            if (isUsedForSearch) {
                return await this.driverService.validateRecordUsedForSearch("Validate Quote Ref!",
                    [actualValue, expectedValue, "Incorrect Quote Ref!"]);
            } else {
                return await this.driverService.validateRecord("Validate Quote Ref!",
                    [actualValue, expectedValue, "Incorrect Quote Ref!"]);
            }
        } catch (error) {
            console.log('validateQuoteRef_QuoteReadyPurchase');
            console.log(error);
            return false;
        }
    }

    public async validateProduct_QuoteReadyPurchase(expectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
        try {
            const lblActualValue = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[1]//tbody//tr[${positionRow}]//td[3]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lblActualValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            const actualValue = await this.driverService.getText(lblActualValue);
            if (isUsedForSearch) {
                return await this.driverService.validateRecordUsedForSearch("Validate Product!",
                    [actualValue, expectedValue, "Incorrect Product!"]);
            } else {
                return await this.driverService.validateRecord("Validate Product!",
                    [actualValue, expectedValue, "Incorrect Product!"]);
            }
        } catch (error) {
            console.log('validateProduct_QuoteReadyPurchase');
            console.log(error);
            return false;
        }
    }

    public async validatePolicyTerm_QuoteReadyPurchase(expectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
        try {
            const lblActualValue = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[1]//tbody//tr[${positionRow}]//td[4]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lblActualValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            const actualValue = await this.driverService.getText(lblActualValue);
            if (isUsedForSearch) {
                return await this.driverService.validateRecordUsedForSearch("Validate PolicyTerm!",
                    [actualValue, expectedValue, "Incorrect PolicyTerm!"]);
            } else {
                return await this.driverService.validateRecord("Validate PolicyTerm!",
                    [actualValue, expectedValue, "Incorrect PolicyTerm!"]);
            }
        } catch (error) {
            console.log('validatePolicyTerm_QuoteReadyPurchase');
            console.log(error);
            return false;
        }
    }

    public async validateLastModifiedDate_QuoteReadyPurchase(expectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
        try {
            const lblActualValue = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[1]//tbody//tr[${positionRow}]//td[5]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lblActualValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            const actualValue = await this.driverService.getText(lblActualValue);
            if (isUsedForSearch) {
                return await this.driverService.validateRecordUsedForSearch("Validate LastModifiedDate!",
                    [actualValue, expectedValue, "Incorrect LastModifiedDate!"]);
            } else {
                return await this.driverService.validateRecord("Validate LastModifiedDate!",
                    [actualValue, expectedValue, "Incorrect LastModifiedDate!"]);
            }
        } catch (error) {
            console.log('validateLastModifiedDate_QuoteReadyPurchase');
            console.log(error);
            return false;
        }
    }

    public async validatePremium_QuoteReadyPurchase(expectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
        try {
            const lblActualValue = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[1]//tbody//tr[${positionRow}]//td[6]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lblActualValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            const actualValue = await this.driverService.getText(lblActualValue);
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            if (isUsedForSearch) {
                return await this.driverService.validateRecordUsedForSearch("Validate Premium!",
                    [actualValue, expectedValue, "Incorrect Premium!"]);
            } else {
                return await this.driverService.validateRecord("Validate Premium!",
                    [actualValue, expectedValue, "Incorrect Premium!"]);
            }
        } catch (error) {
            console.log('validatePremium_QuoteReadyPurchase');
            console.log(error);
            return false;
        }
    }

    //get Value methods

    public async getQuoteRefValue_QuoteReadyPurchase(positionRow: number = 2) {
        try {
            const lblActualValue = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[1]//tbody//tr[${positionRow}]//td/app-edit-link-col/a`);
            await this.driverService.waitUntilElementLoaded(lblActualValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            const actualValue = await this.driverService.getText(lblActualValue);
            return actualValue;
        } catch (error) {
            console.log('getQuoteRefValue_QuoteReadyPurchase');
            console.log(error);
            return "";
        }
    }

    public async getProductValue_QuoteReadyPurchase(positionRow: number = 2) {
        try {
            const lblActualValue = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[1]//tbody//tr[${positionRow}]//td[3]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lblActualValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            const actualValue = await this.driverService.getText(lblActualValue);
            return actualValue;
        } catch (error) {
            console.log('getProductValue_QuoteReadyPurchase');
            console.log(error);
            return "";
        }
    }

    public async getPolicyTermValue_QuoteReadyPurchase(positionRow: number = 2) {
        try {
            const lblActualValue = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[1]//tbody//tr[${positionRow}]//td[4]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lblActualValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            const actualValue = await this.driverService.getText(lblActualValue);
            return actualValue;
        } catch (error) {
            console.log('getPolicyTermValue_QuoteReadyPurchase');
            console.log(error);
            return "";
        }
    }

    public async getLastModifiedDateValue_QuoteReadyPurchase(positionRow: number = 2) {
        try {
            const lblActualValue = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[1]//tbody//tr[${positionRow}]//td[5]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lblActualValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            const actualValue = await this.driverService.getText(lblActualValue);
            return actualValue;
        } catch (error) {
            console.log('getLastModifiedDateValue_QuoteReadyPurchase');
            console.log(error);
            return "";
        }
    }

    public async getPremiumValue_QuoteReadyPurchase(positionRow: number = 2) {
        try {
            const lblActualValue = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[1]//tbody//tr[${positionRow}]//td[6]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lblActualValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            const actualValue = await this.driverService.getText(lblActualValue);
            return actualValue;
        } catch (error) {
            console.log('getPremiumValue_QuoteReadyPurchase');
            console.log(error);
            return "";
        }
    }

    public async countTotalQuoteRecord_QuoteReadyPurchase() {
        try {
            let count = 0;
            for (let i = 1; i <= 10; i++) {
                let lblRef = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[1]//tbody//tr[${i}]//td/app-edit-link-col/a`);
                if(await this.driverService.isExisted(lblRef)){
                    count++;
                }else break;
            }
            return count;
        } catch (error) {
            console.log(`countTotalQuoteRecord_QuoteReadyPurchase`);
            console.log(error);
            return 0;
        }
    }

    //#endregion
    //#region Buttons on Quote Ready for purchase
    public async pressBackToQuoteListButton_QuoteReadyPurchase() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnBackToQuotesList_QuoteReadyPurchase);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.click(this.btnBackToQuotesList_QuoteReadyPurchase);
            return true;
        } catch (error) {
            console.log('pressBackToQuoteListButton_QuoteReadyPurchase');
            console.log(error);
            return false;
        }
    }

    public async pressBackButton_QuoteReadyPurchase() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnBack_QuoteReadyPurchase);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.click(this.btnBack_QuoteReadyPurchase);
            return true;
        } catch (error) {
            console.log('pressBackButton_QuoteReadyPurchase');
            console.log(error);
            return false;
        }
    }

    public async pressPurchaseButton_QuoteReadyPurchase() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnPurchase_QuoteReadyPurchase);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.click(this.btnPurchase_QuoteReadyPurchase);
            return true;
        } catch (error) {
            console.log('pressPurchaseButton_QuoteReadyPurchase');
            console.log(error);
            return false;
        }
    }

    public async removeQuoteFromQuotesReadyForPurchaseToOtherAvailableQuotesByRow(positionRow: number = 2) {
        try {
            let btnremoveQuote = By.xpath(`//tr[.//app-cl-act-col-for-purchase-table][${positionRow}]//button`);
            await this.driverService.waitUntilElementLoaded(btnremoveQuote);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.click(btnremoveQuote);
            return true;
        } catch (error) {
            console.log('removeQuoteFromQuotesReadyForPurchaseToOtherAvailableQuotesByRow');
            console.log(error);
            return false;
        }
    }

    //#endregion


    //#regionn Methods on Other Available Quotes
    public async validateQuoteRef_OtherAvailableQuotes(expectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
        try {
            const lblActualValue = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[2]//tbody//tr[${positionRow}]//td/app-edit-link-col/a`);
            await this.driverService.waitUntilElementLoaded(lblActualValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            const actualValue = await this.driverService.getText(lblActualValue);
            if (isUsedForSearch) {
                return await this.driverService.validateRecordUsedForSearch("Validate Quote Ref!",
                    [actualValue, expectedValue, "Incorrect Quote Ref!"]);
            } else {
                return await this.driverService.validateRecord("Validate Quote Ref!",
                    [actualValue, expectedValue, "Incorrect Quote Ref!"]);
            }
        } catch (error) {
            console.log('validateQuoteRef_OtherAvailableQuotes');
            console.log(error);
            return false;
        }
    }

    public async validateProduct_OtherAvailableQuotes(expectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
        try {
            const lblActualValue = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[2]//tbody//tr[${positionRow}]//td[3]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lblActualValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            const actualValue = await this.driverService.getText(lblActualValue);
            if (isUsedForSearch) {
                return await this.driverService.validateRecordUsedForSearch("Validate Product!",
                    [actualValue, expectedValue, "Incorrect Product!"]);
            } else {
                return await this.driverService.validateRecord("Validate Product!",
                    [actualValue, expectedValue, "Incorrect Product!"]);
            }
        } catch (error) {
            console.log('validateProduct_OtherAvailableQuotes');
            console.log(error);
            return false;
        }
    }

    public async validatePolicyTerm_OtherAvailableQuotes(expectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
        try {
            const lblActualValue = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[2]//tbody//tr[${positionRow}]//td[4]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lblActualValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            const actualValue = await this.driverService.getText(lblActualValue);
            if (isUsedForSearch) {
                return await this.driverService.validateRecordUsedForSearch("Validate PolicyTerm!",
                    [actualValue, expectedValue, "Incorrect PolicyTerm!"]);
            } else {
                return await this.driverService.validateRecord("Validate PolicyTerm!",
                    [actualValue, expectedValue, "Incorrect PolicyTerm!"]);
            }
        } catch (error) {
            console.log('validatePolicyTerm_OtherAvailableQuotes');
            console.log(error);
            return false;
        }
    }

    public async validateLastModifiedDate_OtherAvailableQuotes(expectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
        try {
            const lblActualValue = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[2]//tbody//tr[${positionRow}]//td[5]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lblActualValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            const actualValue = await this.driverService.getText(lblActualValue);
            if (isUsedForSearch) {
                return await this.driverService.validateRecordUsedForSearch("Validate LastModifiedDate!",
                    [actualValue, expectedValue, "Incorrect LastModifiedDate!"]);
            } else {
                return await this.driverService.validateRecord("Validate LastModifiedDate!",
                    [actualValue, expectedValue, "Incorrect LastModifiedDate!"]);
            }
        } catch (error) {
            console.log('validateLastModifiedDate_OtherAvailableQuotes');
            console.log(error);
            return false;
        }
    }

    public async validatePremium_OtherAvailableQuotes(expectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
        try {
            const lblActualValue = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[2]//tbody//tr[${positionRow}]//td[6]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lblActualValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            const actualValue = await this.driverService.getText(lblActualValue);
            if (isUsedForSearch) {
                return await this.driverService.validateRecordUsedForSearch("Validate Premium!",
                    [actualValue, expectedValue, "Incorrect Premium!"]);
            } else {
                return await this.driverService.validateRecord("Validate Premium!",
                    [actualValue, expectedValue, "Incorrect Premium!"]);
            }
        } catch (error) {
            console.log('validatePremium_OtherAvailableQuotes');
            console.log(error);
            return false;
        }
    }

    //get Value methods

    public async getQuoteRefValue_OtherAvailableQuotes(positionRow: number = 1) {
        try {
            const lblActualValue = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[2]//tbody//tr[${positionRow}]//td/app-edit-link-col/a`);
            await this.driverService.waitUntilElementLoaded(lblActualValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            const actualValue = await this.driverService.getText(lblActualValue);
            return actualValue;
        } catch (error) {
            console.log('getQuoteRefValue_OtherAvailableQuotes');
            console.log(error);
            return "";
        }
    }

    public async getProductValue_OtherAvailableQuotes(positionRow: number = 2) {
        try {
            const lblActualValue = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[2]//tbody//tr[${positionRow}]//td[3]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lblActualValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            const actualValue = await this.driverService.getText(lblActualValue);
            return actualValue;
        } catch (error) {
            console.log('getProductValue_OtherAvailableQuotes');
            console.log(error);
            return "";
        }
    }

    public async getPolicyTermValue_OtherAvailableQuotes(positionRow: number = 2) {
        try {
            const lblActualValue = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[2]//tbody//tr[${positionRow}]//td[4]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lblActualValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            const actualValue = await this.driverService.getText(lblActualValue);
            return actualValue;
        } catch (error) {
            console.log('getPolicyTermValue_OtherAvailableQuotes');
            console.log(error);
            return "";
        }
    }

    public async getLastModifiedDateValue_OtherAvailableQuotes(positionRow: number = 2) {
        try {
            const lblActualValue = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[2]//tbody//tr[${positionRow}]//td[5]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lblActualValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            const actualValue = await this.driverService.getText(lblActualValue);
            return actualValue;
        } catch (error) {
            console.log('getLastModifiedDateValue_OtherAvailableQuotes');
            console.log(error);
            return "";
        }
    }

    public async getPremiumValue_OtherAvailableQuotes(positionRow: number = 2) {
        try {
            const lblActualValue = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[2]//tbody//tr[${positionRow}]//td[6]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lblActualValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            const actualValue = await this.driverService.getText(lblActualValue);
            return actualValue;
        } catch (error) {
            console.log('getPremiumValue_OtherAvailableQuotes');
            console.log(error);
            return "";
        }
    }
    //#endregion

    //#region Buttons on Other Available Quotes
    public async addMoreQuoteFromOtherAvailableToQuotesReadyForPurchaseByRow(positionRow: number = 1) {
        try {
            let btnAddMoreQuote = By.xpath(`//tr[.//app-cl-act-col-for-other-quotes-table][${positionRow}]//button`);
            await this.driverService.waitUntilElementLoaded(btnAddMoreQuote);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.click(btnAddMoreQuote);
            return true;
        } catch (error) {
            console.log('addMoreQuoteFormOtherAvailableToQuotesReadyForPurchaseByRow');
            console.log(error);
            return false;
        }
    }
    //#endregion
    //#endregion


    public async tickToConfigColumnByColumnName(ColumnName: string) {
        try {
            let checkboxColumn = By.xpath(`//div[@class='dropdown']//label[./span[text()='${ColumnName}']]//span[@class='check']`);
            let inputcheckboxColumn = By.xpath(`//div[@class='dropdown']//label[./span[text()='${ColumnName}']]//input`);
            await this.driverService.waitUntilElementLoaded(checkboxColumn);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            if (!(await this.driverService.getAttributeValue(inputcheckboxColumn, "checked") === 'true')) {
                await this.driverService.click(checkboxColumn);
            }
            return true;
        } catch (error) {
            console.log('tickToConfigColumnByColumnName');
            console.log(error);
            return false;
        }
    }

    public async UnTickToConfigColumnByColumnName(ColumnName: string) {
        try {
            let checkboxColumn = By.xpath(`//div[@class='dropdown']//label[./span[text()='${ColumnName}']]//span[@class='check']`);
            let inputcheckboxColumn = By.xpath(`//div[@class='dropdown']//label[./span[text()='${ColumnName}']]//input`);
            await this.driverService.waitUntilElementLoaded(checkboxColumn);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            if (await this.driverService.getAttributeValue(inputcheckboxColumn, "checked") === 'true') {
                await this.driverService.click(checkboxColumn);
            }
            return true;
        } catch (error) {
            console.log('UnTickToConfigColumnByColumnName');
            console.log(error);
            return false;
        }
    }

    public async validateTitleColumnIsVisibleByColumnName(SectionName: string, ColumnName: string) {
        try {
            let Column = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[contains(text(),'${SectionName}')]]//table//th/div/span[contains(text(),'${ColumnName}')]`);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            if (await this.driverService.isExisted(Column)) {
                logSuccessMessage(`validate ${ColumnName} Column on ${SectionName} section is visible: Test passed!`);
                return true;
            }
            logFailMessage(`validate ${ColumnName} Column on ${SectionName} section is visible: Test failed!`);
            return false;
        } catch (error) {
            console.log(`validateTitleColumnIsVisibleByColumnName`);
            console.log(error);
            return false;
        }
    }

    public async validateTitleColumnIsNotVisibleByColumnName(SectionName: string, ColumnName: string) {
        try {
            let Column = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[contains(text(),'${SectionName}')]]//table//th/div/span[contains(text(),'${ColumnName}')]`);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            if (!await this.driverService.isExisted(Column)) {
                logSuccessMessage(`validate ${ColumnName} Column on ${SectionName} section is not visible: Test passed!`);
                return true;
            }
            logFailMessage(`validate ${ColumnName} Column on ${SectionName} section is not visible: Test failed!`);
            return false;
        } catch (error) {
            console.log(`validateTitleColumnIsNotVisibleByColumnName`);
            console.log(error);
            return false;
        }
    }

    public async pressOpenDropdownConfigColumnButtonBySectionName(SectionName: string) {
        try {
            let btnConfigColumn = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[contains(text(),'${SectionName}')]]//th[contains(@class,'config-column')]//i`);
            await this.driverService.waitUntilElementLoaded(btnConfigColumn);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.click(btnConfigColumn);
            return true;
        } catch (error) {
            console.log('pressOpenDropdownConfigColumnButtonBySectionName');
            console.log(error);
            return false;
        }
    }

}
