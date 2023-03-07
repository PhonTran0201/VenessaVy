import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";
import { logFailMessage, waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";
import { validateApproximateCurrency } from "../../../../../shared/tenant-setting/tenant-setting";


/**
 * Quote Anomymous
 */
export class QuoteList extends BasePage {

    protected strRootXpath = "";

    protected btnGenerateSummary = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-quotes-list//button[contains(text(),'Generate summary')]`);
    public async getReferenceValueOnQuoteListByRow(positionRow: number = 1) {
        try {
            const lblActualValue = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//td[contains(@class,'pgs-quote-reference')]//*[text()]`);
            await this.driverService.waitUntilElementVisible(lblActualValue);
            const actualValue = await this.driverService.getText(lblActualValue);
            return actualValue;
        } catch (error) {
            console.log('getReferenceValueOnQuoteListByRow');
            console.log(error);
            return "";
        }
    }

    public async getTypeValueOnQuoteListByRow(positionRow: number = 1) {
        try {
            const lblActualValue = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//td[contains(@class,'pgs-quote-type')]//*[text()]`);
            await this.driverService.waitUntilElementVisible(lblActualValue);
            const actualValue = await this.driverService.getText(lblActualValue);
            return actualValue;
        } catch (error) {
            console.log('getTypeValueOnQuoteListByRow');
            console.log(error);
            return "";
        }
    }

    public async openTheQuoteOnQuoteListByRow(positionRow: number = 1) {
        try {
            const lblQuote = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//td[contains(@class,'pgs-quote-reference')]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lblQuote);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.click(lblQuote);
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true;
        } catch (error) {
            console.log('openTheQuoteOnQuoteListByRow');
            console.log(error);
            return false;
        }
    }

    public async openTheQuoteOnQuoteListByReference(quoteRef: string) {
        try {
            const lblQuote = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr//td[contains(@class,'pgs-quote-reference')]//*[text()='${quoteRef}']`);
            await this.driverService.waitUntilElementVisible(lblQuote, 10000);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await this.driverService.click(lblQuote);
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true;
        } catch (error) {
            console.log('openTheQuoteOnQuoteListByRow');
            console.log(error);
            return false;
        }
    }

    //#region Validate values
    public async validateReferenceOnQuoteList(expectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
        try {
            const lblActualValue = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//td[contains(@class,'pgs-quote-reference')]//*[text()]`);
            // await this.driverService.waitUntilElementLoaded(lblActualValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            const actualValue = await this.driverService.getText(lblActualValue);
            if (isUsedForSearch) {
                return await this.driverService.validateRecordUsedForSearch("Validate Reference!",
                    [actualValue, expectedValue, "Incorrect reference!"]);
            } else {
                return await this.driverService.validateRecord("Validate Reference!",
                    [actualValue, expectedValue, "Incorrect reference!"]);
            }
        } catch (error) {
            console.log('validateReferenceOnQuoteList');
            console.log(error);
            return false;
        }
    }

    public async validateDescriptionOnQuoteList(expectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
        try {
            const lblActualValue = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//td[contains(@class,'pgs-quote-description')]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lblActualValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            const actualValue = await this.driverService.getText(lblActualValue);
            if (isUsedForSearch) {
                return await this.driverService.validateRecordUsedForSearch("Validate Description!",
                    [actualValue, expectedValue, "Incorrect Description!"]);
            } else {
                return await this.driverService.validateRecord("Validate Description!",
                    [actualValue, expectedValue, "Incorrect Description!"]);
            }
        } catch (error) {
            console.log('validateDescriptionOnQuoteList');
            console.log(error);
            return false;
        }
    }

    public async validateProductOnQuoteList(expectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
        try {
            const lblActualValue = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//td[contains(@class,'pgs-quote-product')]//*[text()]`);
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
            console.log('validateProductOnQuoteList');
            console.log(error);
            return false;
        }
    }

    public async validatePolicyTermOnQuoteList(expectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
        try {
            const lblActualValue = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//td[contains(@class,'pgs-quote-policy-term')]//*[text()]`);
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
            console.log('validatePolicyTermOnQuoteList');
            console.log(error);
            return false;
        }
    }

    public async validatePremiumOnQuoteList(expectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
        try {
            const lblActualValue = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//td[contains(@class,'pgs-quote-premium')]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lblActualValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            const actualValue = await this.driverService.getText(lblActualValue);
            if (isUsedForSearch) {
                return await this.driverService.validateRecordUsedForSearch("Validate Premium!",
                    [actualValue, expectedValue, "Incorrect Premium!"]);
            } else {
                if (validateApproximateCurrency(expectedValue, actualValue)) {
                    return true;
                }
                return await this.driverService.validateRecord("Validate Premium!",
                    [actualValue, expectedValue, "Incorrect Premium!"]);
            }
        } catch (error) {
            console.log('validatePremiumOnQuoteList');
            console.log(error);
            return false;
        }
    }

    public async validateSalesPersonOnQuoteList(expectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
        try {
            const lblActualValue = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//td[contains(@class,'pgs-quote-sales-person')]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lblActualValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            const actualValue = await this.driverService.getText(lblActualValue);
            if (isUsedForSearch) {
                return await this.driverService.validateRecordUsedForSearch("Validate SalesPerson!",
                    [actualValue, expectedValue, "Incorrect SalesPerson!"]);
            } else {
                return await this.driverService.validateRecord("Validate SalesPerson!",
                    [actualValue, expectedValue, "Incorrect SalesPerson!"]);
            }
        } catch (error) {
            console.log('validateSalesPersonOnQuoteList');
            console.log(error);
            return false;
        }
    }

    public async validateOrganizationOnQuoteList(expectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
        try {
            const lblActualValue = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//td[contains(@class,'pgs-quote-organization')]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lblActualValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            const actualValue = await this.driverService.getText(lblActualValue);
            if (isUsedForSearch) {
                return await this.driverService.validateRecordUsedForSearch("Validate Organization!",
                    [actualValue, expectedValue, "Incorrect Organization!"]);
            } else {
                return await this.driverService.validateRecord("Validate Organization!",
                    [actualValue, expectedValue, "Incorrect Organization!"]);
            }
        } catch (error) {
            console.log('validateOrganizationOnQuoteList');
            console.log(error);
            return false;
        }
    }

    public async validateTypeOnQuoteList(expectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
        try {
            const lblActualValue = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//td[contains(@class,'pgs-quote-type')]//*[text()]`);
            await this.driverService.waitUntilElementVisible(lblActualValue);
            const actualValue = await this.driverService.getText(lblActualValue);
            if (isUsedForSearch) {
                return await this.driverService.validateRecordUsedForSearch("Validate Type!",
                    [actualValue, expectedValue, "Incorrect Type!"]);
            } else {
                return await this.driverService.validateRecord("Validate Type!",
                    [actualValue, expectedValue, "Incorrect Type!"]);
            }
        } catch (error) {
            console.log('validateTypeOnQuoteList');
            console.log(error);
            return false;
        }
    }

    public async validateStatusOnQuoteList(expectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
        try {
            const lblActualValue = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//td[contains(@class,'pgs-quote-status')]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lblActualValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            const actualValue = await this.driverService.getText(lblActualValue);
            if (isUsedForSearch) {
                return await this.driverService.validateRecordUsedForSearch("Validate Status!",
                    [actualValue, expectedValue, "Incorrect Status!"]);
            } else {
                return await this.driverService.validateRecord("Validate Status!",
                    [actualValue, expectedValue, "Incorrect Status!"]);
            }
        } catch (error) {
            console.log('validateStatusOnQuoteList');
            console.log(error);
            return false;
        }
    }

    public async validateCreatedDateOnQuoteList(expectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
        try {
            const lblActualValue = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//td[contains(@class,'pgs-quote-created-date')]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lblActualValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            const actualValue = await this.driverService.getText(lblActualValue);
            if (isUsedForSearch) {
                return await this.driverService.validateRecordUsedForSearch("Validate CreatedDate!",
                    [actualValue, expectedValue, "Incorrect CreatedDate!"]);
            } else {
                return await this.driverService.validateRecord("Validate CreatedDate!",
                    [actualValue, expectedValue, "Incorrect CreatedDate!"]);
            }
        } catch (error) {
            console.log('validateCreatedDateOnQuoteList');
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region Press button on list
    public async pressDeleteButtonOnQuoteListByRow(positionRow = 1) {
        try {
            const btnDelete = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//button[@id='pgs-discard-quote-btn']`);
            await this.driverService.waitUntilElementLoaded(btnDelete);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await this.driverService.click(btnDelete);
            return true;
        } catch (error) {
            console.log('pressDeleteButtonOnQuoteListByRow');
            console.log(error);
            return false;
        }
    }

    public async pressRequoteButtonOnQuoteListByRow(positionRow = 1) {
        try {
            const btnRequote = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//button[@id='pgs-requote-btn']`);
            await this.driverService.waitUntilElementLoaded(btnRequote);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await this.driverService.click(btnRequote);
            return true;
        } catch (error) {
            console.log('pressRequoteButtonOnQuoteListByRow');
            console.log(error);
            return false;
        }
    }

    public async openDropdownFilterTypeColumnOnQuoteList(){
        try {
            const dropdownFilterType = By.xpath(`//div[contains(@class,'dropdown') and contains(@class,'show')]`);
            const btnTypeFilter = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//th//div//a[./span[text()='Type']]`);
            await this.driverService.waitUntilElementVisible(this.btnGenerateSummary);
            if(!(await this.driverService.isExisted(dropdownFilterType))){
                await this.driverService.click(btnTypeFilter);
            }
            return true;
        } catch (error) {
            console.log('openDropdownFilterTypeColumnOnQuoteList');
            console.log(error);
            return false;
        }
    }

    public async selectOptionInFilterTypeOnQuoteList(optionName: string){
        try {
            const btnOption = By.xpath(`//div[contains(@class,'dropdown') and contains(@class,'show')]/div/span[text()='${optionName}']`);
            const element = await this.getFieldType(btnOption);
            await element.click();
            return true;
        } catch (error) {
            console.log('selectOptionInFilterTypeOnQuoteList');
            console.log(error);
            return false;
        }
    }
    //#endregion

    public async pressGenerateSummaryDocumentButton() {
        try {
            await this.driverService.waitUntilElementVisible(this.btnGenerateSummary)
            let btn = await this.getFieldType(this.btnGenerateSummary);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await btn.click();
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true;
        } catch (error) {
            console.log('pressGenerateSummaryDocumentButton');
            console.log(error);
            return false;
        }
    }

    public async validateGenerateSummaryDocumentDownloadSuccessfully() {
        try {
            const toast = By.xpath(`//div[@id='toast-container']/div[contains(@class,'toast-success')]/div[contains(text(),'Quote summary document has been generated.')]`);
            let Docxpath = By.xpath(`${this.strRootXpath}//app-quotes-list//div[contains(@class,'document-item-download')]//a`);
            let iconDocXpath = By.xpath(`${this.strRootXpath}//app-quotes-list//div[contains(@class,'document-item-download')]//a//img[@src="./assets/images/document/pdf.png"]`);
            await this.driverService.waitUntilElementLoaded(toast);
            if (!await this.driverService.isExisted(iconDocXpath)) {
                logFailMessage(`Summary Document PDF icon is not found!`)
                return false;
            }
            if (!await this.driverService.isExisted(iconDocXpath)) {
                logFailMessage(`Summary Document is not generated!`);
                return false;
            }
            let doc = await this.getFieldType(Docxpath);
            await doc.click();
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true;
        } catch (error) {
            console.log('validateGenerateSummaryDocumentDownloadSuccessfully');
            console.log(error);
            return false;
        }
    }
}