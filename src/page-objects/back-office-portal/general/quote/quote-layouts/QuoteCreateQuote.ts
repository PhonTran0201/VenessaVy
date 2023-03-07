import id from "date-fns/esm/locale/id/index.js";
import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";
import { logFailMessage, logInfoMessage, logSuccessMessage, logWarningMessage, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";
import { GlobalDateTimeContainer } from "../../GlobalPageObject/GlobalDateTimeContainer";


/**
 * Create Quote in Anonymous Quote
 * or "app-generic-layout-step"
 * Nó khác nhau giữa các Product
 */
export class QuoteCreateQuote extends BasePage {
    protected strRootXpath = "";
    //#region Header
    private btnRequoteOnHeader = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[.//*[text()='Requote']]`);
    //#endregion

    //#region App Progress Indicator: Product - Question - Review - Acceptance
    ///??????????????????
    //#endregion

    //#region Created Date - Last Updated Date
    private lblCreatedDate = By.xpath(``);///?????
    //#endregion

    //#region app-section-indicator
    //?????????
    //#endregion


    //#region Product layouts
    private lblQuoteRef = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//h2[contains(text(),'Quote Ref.:')]`);
    private dtpStartDate = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//input[@id='startDate']`);
    private dtpEndDate = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//input[@id='endDate']`);
    private dtpEffectiveDate = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//input[@id='effectiveDate']`);
    //#endregion

    //#region Footer (button on Footer)
    private btnBackToQuotesListOnFooter = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[text()='Back To Quotes List' and not(@disabled)]`);
    private btnBackOnFooter = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[text()='Back' or text()=' Back ' and not(@disabled)]`);
    private btnCalculateOnFooter = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[text()='Calculate' and not(@disabled)]`);
    private btnNextOnFooter = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[text()='Next' and not(@disabled)]`);
    //#endregion

    //#region Methods
    //#region 1. Methods header
    public async pressRequoteButtonOnHeader() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnRequoteOnHeader);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await this.driverService.click(this.btnRequoteOnHeader);
            return true;
        } catch (error) {
            console.log('pressRequoteButtonOnHeader');
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region 2. Methods Validate Product layouts
    public async getQuoteRef() {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblQuoteRef);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 200);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 200);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 200);
            const actualValue = (await this.driverService.getText(this.lblQuoteRef)).replace("QUOTE REF.: ", "");
            return actualValue;
        } catch (error) {
            console.log('getQuoteRef');
            console.log(error);
            return "";
        }
    }

    /**
     * 
     * @param expectedValue just input quote ref (NOT includes "Quote Ref.:")
     * @param isUsedForSearch 
     * @returns 
     */
    public async validateQuoteRef(expectedValue: string, isUsedForSearch: boolean = false) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblQuoteRef);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            const actualValue = await this.driverService.getText(this.lblQuoteRef);
            if (isUsedForSearch) {
                return await this.driverService.validateRecordUsedForSearch("Validate Quote Reference!",
                    [actualValue, "QUOTE REF.: " + expectedValue, "Incorrect Quote reference!"]);
            } else {
                return await this.driverService.validateRecord("Validate Quote Reference!",
                    [actualValue, "QUOTE REF.: " + expectedValue, "Incorrect Quote reference!"]);
            }
        } catch (error) {
            console.log('validateQuoteRef');
            console.log(error);
            return false;
        }
    }

    public async validateStartDate(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.dtpStartDate);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getAttributeValue(this.dtpStartDate, 'value');
            return await this.driverService.validateRecord("Validate Start Date!",
                [actualValue, expectedValue, "Incorrect Start Date!"]);
        } catch (error) {
            console.log('validateStartDate');
            console.log(error);
            return false;
        }
    }

    public async validateEndDate(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.dtpEndDate);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getAttributeValue(this.dtpEndDate, 'value');
            return await this.driverService.validateRecord("Validate End Date!",
                [actualValue, expectedValue, "Incorrect End Date!"]);
        } catch (error) {
            console.log('validateEndDate');
            console.log(error);
            return false;
        }
    }

    public async checkQuestionWithTypeExist(questionName: string, type: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.dtpStartDate);
            const question = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//input[@id='${questionName}' and @type='${type}']`);
            return await this.driverService.isExisted(question);
        } catch (error) {
            console.log('checkQuestionWithTypeExist');
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region 2.1 Methods to check QAs meet the condition
    /**
     * 
     * @param tag 
     * @param type 
     * @param prompt 
     * 
     * Dropdown - ng-select
     * MultiLine Free Text - textarea
     * Date Field - input (sau là owl-date-time)
     * Free text field - input (type = text)
     * Numerical - input (type = number hoặc (type = text và cha là app-text-number-layout))
     * @returns 
     */
    public async checkQuestionTagAndQuestionTypeAndQuestionPrompt(tag: string, type: string, prompt: string) {
        try {
            let field: By;
            switch (type) {
                case "Date Field": case "Date field": {
                    field = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//form//div[./owl-date-time and .//input[@id='${tag}']]//label`);
                    break;
                }
                case "Free text field": {
                    field = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//form//div[./div/input[@id='${tag}']]//label`);
                    break;
                }
                case "Numerical": case "Numeric": {
                    field = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//form//div[./div/input[@id='${tag}' and @type='number']]//label | //div[contains(@class,'tab-pane') and contains(@class,'active')]//form//app-text-number-layout[.//input[@id='${tag}']]//label`);
                    break;
                }
                case "MultiLine Free Text": {
                    field = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//form//div[./div/textarea[@id='${tag}']]//label`);
                    break;
                }
                case "Dropdown": {
                    field = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./label/following-sibling::div[@class='input-group']/select | ./label/following-sibling::ng-select]/label[@for='${tag}']`);
                    break;
                }
                default: {
                    logWarningMessage(`Question type "${type}" has NOT been defined!`);
                    return false;
                }
            }
            await this.driverService.waitUntilElementVisible(field);
            const actualPrompt = (await this.driverService.getText(field)).replace("*", "").trim();
            if (actualPrompt.localeCompare(prompt) !== 0) {
                logWarningMessage(`\t\tActual Prompt: ${actualPrompt} - Expected Prompt: ${prompt}`);
                return false;
            }
            return true;
        } catch (error) {
            console.log('checkQuestionTagAndQuestionTypeAndQuestionPrompt');
            console.log(error);
            return false;
        }
    }

    public async checkQuestionTagAndQuestionTypeAndMandatory(tag: string, type: string, isMandatory: boolean) {
        try {
            let field: By;
            switch (type) {
                case "Date Field": case "Date field": {
                    field = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//form//div[./owl-date-time and .//input[@id='${tag}']]//label/span[text()='*']`);
                    break;
                }
                case "Free text field": {
                    field = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//form//div[./div/input[@id='${tag}']]//label/span[text()='*']`);
                    break;
                }
                case "Numerical": case "Numeric": {
                    field = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//form//div[./div/input[@id='${tag}' and @type='number']]//label/span[text()='*'] | //div[contains(@class,'tab-pane') and contains(@class,'active')]//form//app-text-number-layout[.//input[@id='${tag}']]//label/span[text()='*']`);
                    break;
                }
                case "MultiLine Free Text": {
                    field = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//form//div[./div/textarea[@id='${tag}']]//label/span[text()='*']`);
                    break;
                }
                case "Dropdown": {
                    field = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./label/following-sibling::div[@class='input-group']/select | ./label/following-sibling::ng-select]/label[@for='${tag}']/span[text()='*']`);
                    break;
                }
                default: {
                    logWarningMessage(`Question type "${type}" has NOT been defined!`);
                    return false;
                }
            }
            let actual = await this.driverService.isExisted(field);
            if (isMandatory === actual) {
                return true;
            }
            else {
                logWarningMessage(`\tExpected: ${isMandatory} - Actual: ${actual}`);
                return false;
            }
        } catch (error) {
            console.log('checkQuestionTagAndQuestionTypeAndMandatory');
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region 2.2 Methods Manipulation on Product layouts
    public async inputStartDate(startDate: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.dtpStartDate);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.setText(this.dtpStartDate, startDate);
            return true;
        } catch (error) {
            console.log('inputStartDate');
            console.log(error);
            return false;
        }
    }

    public async inputEndDate(endDate: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.dtpEndDate);
            await this.driverService.click(this.dtpEndDate);
            let globalDateTimeContainer = new GlobalDateTimeContainer(this.driverService);
            await globalDateTimeContainer.inputDateTime(endDate);
            return true;
        } catch (error) {
            console.log('inputEndDate');
            console.log(error);
            return false;
        }
    }

    public async inputEffectiveDate(effectiveDate: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.dtpEffectiveDate);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.setText(this.dtpEffectiveDate, effectiveDate);
            return true;
        } catch (error) {
            console.log('inputEffectiveDate');
            console.log(error);
            return false;
        }
    }
    public async inputFieldById(idField: string, value:string) {
        try {
            let xpath= By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//input[@id='${idField}']`);
            await this.driverService.waitUntilElementLoaded(xpath);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.setText(xpath, value);
            return true;
        } catch (error) {
            console.log(`inputFieldById`);
            console.log(error);
            return false;
        }
    }
    public async validateFieldIsDisabledOrNotById(idField: string, status: string = "enabled") {
        try {
            let xpath;
            if (status.toLowerCase().localeCompare("enabled") === 0) {
                xpath = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//*[@id='${idField}' and not(@disabled)]`);
            } else {
                xpath = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//*[@id='${idField}' and @disabled]`);
            }
            if (await this.driverService.isExisted(xpath)) {
                logSuccessMessage(`validate field ${idField} is ${status}: Test passed!`)
                return true;
            } else {
                logFailMessage(`validate field ${idField} is ${status}: Test failed!`)
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    public async validateFieldIsExistedOrNotById(idField: string, status: boolean = true){
        try {
            let   xpath = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//*[@id='${idField}']`);
            if(status){
                if (await this.driverService.isExisted(xpath)) {
                    logSuccessMessage(`validate field ${idField}: Test passed!`)
                    return true;
                } else {
                    logFailMessage(`validate field ${idField}: Test failed!`)
                    return false;
                }
            }else{
                if (!await this.driverService.isExisted(xpath)) {
                    logSuccessMessage(`validate field ${idField}: Test passed!`)
                    return true;
                } else {
                    logFailMessage(`validate field ${idField}: Test failed!`)
                    return false;
                }
            }
        } catch (error) {
            console.log(`validateFieldIsExistedOrNotById`);
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region 3. Methods on Footer
    public async pressBackToQuoteListButtonOnFooter() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnBackToQuotesListOnFooter);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.click(this.btnBackToQuotesListOnFooter);
            return true;
        } catch (error) {
            console.log('pressBackToQuoteListButtonOnFooter');
            console.log(error);
            return false;
        }
    }

    public async pressBackButtonOnFooter() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnBackOnFooter);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.click(this.btnBackOnFooter);
            return true;
        } catch (error) {
            console.log('pressBackButtonOnFooter');
            console.log(error);
            return false;
        }
    }

    public async pressCalculateButtonOnFooter() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnCalculateOnFooter);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.click(this.btnCalculateOnFooter);
            return true;
        } catch (error) {
            console.log('pressCalculateButtonOnFooter');
            console.log(error);
            return false;
        }
    }

    public async pressNextButtonOnFooter() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnNextOnFooter);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await this.driverService.click(this.btnNextOnFooter);
            return true;
        } catch (error) {
            console.log('pressNextButtonOnFooter');
            console.log(error);
            return false;
        }
    }
    //#endregion
    //#endregion
}