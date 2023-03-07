import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";
import { logWarningMessage, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";
import { validateApproximateCurrency } from "../../../../../shared/tenant-setting/tenant-setting";


/**
 * Creating Quote in Anonymous Quote
 * or "app-quick-review-step"
 * Nó hơi khác nhau giữa các Product
 */
export class QuoteCreatingQuote extends BasePage {
    //#region Header
    protected btnRequoteOnHeader = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[.//*[text()='Requote']]`);
    protected btnGenerateDocumentOnHeader = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[text()='Generate Document ']`);
    //#endregion

    //#region App Progress Indicator: Product - Question - Review - Acceptance
    ///??????????????????
    //#endregion

    //#region Created Date - Last Updated Date
    protected lblCreatedDate = By.xpath(``);///?????
    //#endregion

    //#region app-section-indicator
    //?????????
    //#endregion


    //#region Quote Documents
    protected hrefDocument_QuoteDocuments = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'quote-document')]//a/span`);
    protected imgDocument_QuoteDocuments = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'quote-document')]//a/img`);
    //#endregion


    //#region Header
    protected lblQuoteRef = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//h2[contains(text(),'Quote Ref.:')]`);
    protected lblAlertMessage = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@role,'alert')]`);
    protected lblSalesPerson = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./b[contains(text(),'Sales Person')]]`);
    protected btnAssignSalesPerson = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./b[contains(text(),'Sales Person')]]//button`);

    //#endregion

    //#region Insurance Information
    protected lblPolicyTerm_InsuranceInformation = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//section//div[./span[contains(text(),'Policy term: ')]]/span[2]`);
    protected lblExpiryDate_InsuranceInformation = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//section//div[./span[contains(text(),'Expiry Date: ')]]/span[2]`);
    protected lblProduct_InsuranceInformation = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//section//div[./span[contains(text(),'Product: ')]]/span[2]`);
    //#endregion

    //#region Previous Insurer
    protected lblPreviousInsurer_PreviousInsurer = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//section//div[./span[contains(text(),'Previous Insurer: ')]]/span[2]`);
    protected btnEditPreviousInsurer_PreviousInsurer = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//section//div[./span[contains(text(),'Previous Insurer: ')]]/span[3]/button`);
    protected lblEmail_PreviousInsurer = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//section//div[./span[contains(text(),'Email: ')]]/span[2]`);
    //#endregion


    //#region Premium
    protected btnCalculate_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//section//button[./*[contains(@class,'fa-calculator')] and not(@disabled)]`);
    protected btnCalculateDisabled_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//section//button[./*[contains(@class,'fa-calculator')] and @disabled]`);

    protected btnRevert_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//div[./h4[text()='Premium']]]//button[text()=' Revert ']`);
    protected lblAlertRevert_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//div[./h4[text()='Premium']]]//div[contains(@class,'alert-warning')]`);


    protected lblPremiumExlTax_AnnualPremium_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Premium']]//tbody//tr[./th[text()=' Premium exl. Tax ']]/td[1]`);
    protected lblUnderwritingAdjustment_AnnualPremium_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Premium']]//tbody//tr[.//span[contains(text(),'Underwriting adjustment')]]/td[1]`);
    protected lblSalesDiscount_AnnualPremium_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Premium']]//tbody//tr[.//div[contains(text(),'Sales discount')]]/td[1]`);
    protected lblProductCommission_AnnualPremium_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Premium']]//tbody//tr[.//div[contains(text(),' Product commission ')]]/td[1]`);
    protected lblSalesCommission_AnnualPremium_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Premium']]//tbody//tr[.//div[contains(text(),' Sales commission ')]]/td[1]`);
    protected lblTax_AnnualPremium_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Premium']]//tbody//tr[.//th[text()=' Tax ']]/td[1]`);
    protected lblTotalPremium_AnnualPremium_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Premium']]//tbody//tr[.//th[text()=' Total premium ']]/td[1]`);

    protected lblPremiumExlTax_PolicyPremium_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Premium']]//tbody//tr[./th[text()=' Premium exl. Tax ']]/td[2]`);
    protected lblUnderwritingAdjustment_PolicyPremium_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Premium']]//tbody//tr[.//span[contains(text(),'Underwriting adjustment')]]/td[2]`);
    protected lblSalesDiscount_PolicyPremium_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Premium']]//tbody//tr[.//div[contains(text(),'Sales discount')]]/td[2]`);
    protected lblProductCommission_PolicyPremium_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Premium']]//tbody//tr[.//div[contains(text(),' Product commission ')]]/td[2]`);
    protected lblSalesCommission_PolicyPremium_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Premium']]//tbody//tr[.//div[contains(text(),' Sales commission ')]]/td[2]`);
    protected lblTax_PolicyPremium_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Premium']]//tbody//tr[.//th[text()=' Tax ']]/td[2]`);
    protected lblTotalPremium_PolicyPremium_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Premium']]//tbody//tr[.//th[text()=' Total premium ']]/td[2]`);

    // Cột %
    protected btnAddCommentUnderwritingAdjustment_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Premium']]//tbody//tr[.//div[text()=' Underwriting adjustment ']]//button[./*[contains(@class,'comment')]]`);
    protected txtUnderwritingAdjustment_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Premium']]//tbody//tr[.//span[contains(text(),'Underwriting')]]//input`);
    protected txtSalesDiscount_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Premium']]//tbody//tr[.//div[text()=' Sales discount ']]//input`);
    protected txtProductCommission_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Premium']]//tbody//tr[.//div[text()=' Product commission ']]//input`);
    protected txtSalesCommission_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Premium']]//tbody//tr[.//div[text()=' Sales commission ']]//input`);

    // Cột % Validation
    protected lblUnderwritingAdjustmentValidation_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Premium']]//tbody//tr[.//div[text()=' Underwriting adjustment ']]//div[contains(@class,'invalid-feedback')]`);
    protected lblSalesDiscountValidation_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Premium']]//tbody//tr[.//div[text()=' Sales discount ']]//div[contains(@class,'invalid-feedback')]`);
    protected lblProductCommissionValidation_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Premium']]//tbody//tr[.//div[text()=' Product commission ']]//div[contains(@class,'invalid-feedback')]`);
    protected lblSalesCommissionValidation_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Premium']]//tbody//tr[.//div[text()=' Sales commission ']]//div[contains(@class,'invalid-feedback')]`);
    //#endregion


    //#region Cover Breakdown
    /// ???????? Từng Product có cover riêng
    //#endregion


    //#region Purchase Contraints
    ///?????????????????
    //#endregion


    //#region Footer (button on Footer)
    protected btnBackToQuotesListOnFooter = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[text()='Back To Quotes List' and not(@disabled)]`);
    protected btnBackOnFooter = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[text()='Back' and not(@disabled)]`);
    protected btnCalculateOnFooter = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[text()='Calculate' and not(@disabled)]`);
    protected btnNextOnFooter = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[text()='Next' and not(@disabled)]`);
    protected btnAcceptOnFooter = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[text()=' Accept ' and not(@disabled)]`);
    protected btnApproveOnFooter = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[text()=' Approve ' and not(@disabled)]`);
    //#endregion

    //#region Methods
    //#region 0. Methods Quote Documents
    public async validateDocumentName_QuoteDocuments(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.hrefDocument_QuoteDocuments);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(this.hrefDocument_QuoteDocuments);
            return await this.driverService.validateRecord("Validate Documents name!",
                [actualValue.trim(), expectedValue, "Incorrect Documents name!"]);
        } catch (error) {
            console.log('validateDocumentName_QuoteDocuments');
            console.log(error);
            return false;
        }
    }

    public async pressDownloadDocument_QuoteDocuments() {
        try {
            await this.driverService.waitUntilElementLoaded(this.hrefDocument_QuoteDocuments);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.click(this.hrefDocument_QuoteDocuments);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true;
        } catch (error) {
            console.log('pressDownloadDocument_QuoteDocuments');
            console.log(error);
            return false;
        }
    }

    public async validateImageIconDocument_QuoteDocuments(src: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.imgDocument_QuoteDocuments);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getAttributeValue(this.imgDocument_QuoteDocuments, 'src');
            return await this.driverService.validateRecord("Validate src image document",
                [actualValue, src, "Incorrect src image document"]);
        } catch (error) {
            console.log('validateImageIconDocument_QuoteDocuments');
            console.log(error);
            return false;
        }
    }
    //#endregion


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

    public async pressGenerateDocumentButtonOnHeader() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnGenerateDocumentOnHeader);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await this.driverService.click(this.btnGenerateDocumentOnHeader);
            return true;
        } catch (error) {
            console.log('pressGenerateDocumentButtonOnHeader');
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region 2. Methods Validate Product layouts Quote Ref
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

    public async validateSalesPerson(expectedValue: string, isUsedForSearch: boolean = false) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblSalesPerson);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            const actualValue = await this.driverService.getText(this.lblSalesPerson);
            if (isUsedForSearch) {
                return await this.driverService.validateRecordUsedForSearch("Validate Sales Person!",
                    [actualValue.trim(), expectedValue, "Incorrect Sales Person"]);
            } else {
                return await this.driverService.validateRecord("Validate SalesPerson!",
                    [actualValue.trim(), expectedValue, "Incorrect Sales Person!"]);
            }
        } catch (error) {
            console.log('validateSalesPerson');
            console.log(error);
            return false;
        }
    }
    public async pressAssignSalesPersonButton() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnAssignSalesPerson);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.click(this.btnAssignSalesPerson);
            return true;
        } catch (error) {
            console.log('pressAssignSalesPersonButton');
            console.log(error);
            return false;
        }
    }
    public async getQuoteRef() {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblQuoteRef);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            const value = await this.driverService.getText(this.lblQuoteRef);
            let array = value.split(' ');
            return array[array.length - 1];
        } catch (error) {
            console.log('getQuoteRef');
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region 2.1 Methods Validate alert Creating quote
    public async isAlertMessageExisted(message: string) {
        try {

            await this.driverService.waitUntilElementLoaded(this.lblAlertMessage);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const lblAlert = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@role,'alert') and text()=' ${message} ']`);
            return await this.driverService.isExisted(lblAlert);
        } catch (error) {
            console.log('isAlertMessageExisted');
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
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.click(this.btnNextOnFooter);
            return true;
        } catch (error) {
            console.log('pressNextButtonOnFooter');
            console.log(error);
            return false;
        }
    }

    public async pressAcceptButtonOnFooter() {
        try {
            await this.driverService.waitUntilElementVisible(this.btnAcceptOnFooter);
            await this.driverService.click(this.btnAcceptOnFooter);
            return true;
        } catch (error) {
            console.log('pressAcceptButtonOnFooter');
            console.log(error);
            return false;
        }
    }

    public async pressApproveButtonOnFooter() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnApproveOnFooter);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.click(this.btnApproveOnFooter);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 3000);
            return true;
        } catch (error) {
            console.log('pressApproveButtonOnFooter');
            console.log(error);
            return false;
        }
    }
    //#endregion
    //#endregion

    //#region 4. Methods Insurance Information
    public async validatePolicyTerm_InsuranceInformation(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblPolicyTerm_InsuranceInformation);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(this.lblPolicyTerm_InsuranceInformation);
            return await this.driverService.validateRecord("Validate Policy term!",
                [actualValue.trim(), expectedValue, "Incorrect Policy term!"]);
        } catch (error) {
            console.log('validatePolicyTerm_InsuranceInformation');
            console.log(error);
            return false;
        }
    }

    public async validateExpiryDate_InsuranceInformation(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblExpiryDate_InsuranceInformation);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(this.lblExpiryDate_InsuranceInformation);
            return await this.driverService.validateRecord("Validate Expiry Date!",
                [actualValue.trim(), expectedValue, "Incorrect Expiry Date!"]);
        } catch (error) {
            console.log('validateExpiryDate_InsuranceInformation');
            console.log(error);
            return false;
        }
    }

    public async validateProduct_InsuranceInformation(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblProduct_InsuranceInformation);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(this.lblProduct_InsuranceInformation);
            return await this.driverService.validateRecord("Validate Product!",
                [actualValue.trim(), expectedValue, "Incorrect Product!"]);
        } catch (error) {
            console.log('validateProduct_InsuranceInformation');
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region Previous Insurer
    public async pressEditButton_PreviousInsurer() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnEditPreviousInsurer_PreviousInsurer);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.click(this.btnEditPreviousInsurer_PreviousInsurer);
            return true;
        } catch (error) {
            console.log('pressEditButton_PreviousInsurer');
            console.log(error);
            return false;
        }
    }

    public async selectPreviousInsurerOnDropdown_PreviousInsurer(value: string) {
        try {
            const option = By.xpath(`//div[@id='previous-insurer-dropdown-menu' and contains(@class,'show')]//button[text()=' Henry Company ']`);
            await this.driverService.waitUntilElementLoaded(option);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
            try {
                await this.driverService.click(option);
                return true;
            } catch (error) {
                await this.driverService.pressTab(option);
                await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
            }
            await this.driverService.click(option);
            return true;
        } catch (error) {
            console.log('selectPreviousInsurerOnDropdown_PreviousInsurer');
            console.log(error);
            return false;
        }
    }

    public async validateValueName_PreviousInsurer(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblPreviousInsurer_PreviousInsurer);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(this.lblPreviousInsurer_PreviousInsurer);
            return await this.driverService.validateRecord('Validate Name PreviousInsurer!',
                [actualValue.trim(), expectedValue, 'Incorrect Name PreviousInsurer!']);
        } catch (error) {
            console.log('validateValueName_PreviousInsurer');
            console.log(error);
            return false;
        }
    }

    public async validateValueEmail_PreviousInsurer(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblEmail_PreviousInsurer);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(this.lblEmail_PreviousInsurer);
            return await this.driverService.validateRecord('Validate Email PreviousInsurer!',
                [actualValue.trim(), expectedValue, 'Incorrect Email PreviousInsurer!']);
        } catch (error) {
            console.log('validateValueEmail_PreviousInsurer');
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region 5. Methods Manipulate Premium
    public async pressCalculateButton_Premium() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnCalculate_Premium);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.click(this.btnCalculate_Premium);
            await this.waitPageProgressCompleted()
            await this.waitPageProgressCompleted()
            return true;
        } catch (error) {
            console.log('pressCalculateButton_Premium');
            console.log(error);
            return false;
        }
    }
    public async isCalculationButtonDisabled() {
        try {
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            return await this.driverService.isExisted(this.btnCalculateDisabled_Premium);
        } catch (error) {
            console.log('isCalculationButtonDisabled');
            console.log(error);
            return false;
        }
    }
    public async pressRevertButton_Premium() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnRevert_Premium);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.click(this.btnRevert_Premium);
            return true;
        } catch (error) {
            console.log('pressRevertButton_Premium');
            console.log(error);
            return false;
        }
    }

    public async validateAlertWarning_Premium(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblAlertRevert_Premium);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(this.lblAlertRevert_Premium);
            return await this.driverService.validateRecord("Validate AlertRevert_Premium!",
                [actualValue.trim(), expectedValue + "\nRevert", "Incorrect AlertRevert_Premium!"]);
        } catch (error) {
            console.log('validateAlertWarning_Premium');
            console.log(error);
            return false;
        }
    }

    public async pressAddCommentUnderwritingAdjustment_Premium() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnAddCommentUnderwritingAdjustment_Premium);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.click(this.btnAddCommentUnderwritingAdjustment_Premium);
            return true;
        } catch (error) {
            console.log('pressAddCommentUnderwritingAdjustment_Premium');
            console.log(error);
            return false;
        }
    }

    public async inputUnderwritingAdjustment_Premium(UnderwritingAdjustment: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtUnderwritingAdjustment_Premium);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await this.driverService.setText(this.txtUnderwritingAdjustment_Premium, UnderwritingAdjustment);
            return true;
        } catch (error) {
            console.log('inputUnderwritingAdjustment_Premium');
            console.log(error);
            return false;
        }
    }

    public async inputSalesDiscount_Premium(SalesDiscount: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtSalesDiscount_Premium);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.setText(this.txtSalesDiscount_Premium, SalesDiscount);
            return true;
        } catch (error) {
            console.log('inputSalesDiscount_Premium');
            console.log(error);
            return false;
        }
    }

    public async inputProductCommission_Premium(ProductCommission: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtProductCommission_Premium);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.setText(this.txtProductCommission_Premium, ProductCommission);
            return true;
        } catch (error) {
            console.log('inputProductCommission_Premium');
            console.log(error);
            return false;
        }
    }

    public async inputSalesCommission_Premium(SalesCommission: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtSalesCommission_Premium);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.setText(this.txtSalesCommission_Premium, SalesCommission);
            return true;
        } catch (error) {
            console.log('inputSalesCommission_Premium');
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region 5.0 Methods get value of text field at Premium section
    public async getValueUnderwritingAdjustment_Premium() {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtUnderwritingAdjustment_Premium);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            let result = await this.driverService.getAttributeValue(this.txtUnderwritingAdjustment_Premium, 'value');
            return result;
        } catch (error) {
            console.log('getValueUnderwritingAdjustment_Premium');
            console.log(error);
            return "";
        }
    }

    public async getValueSalesDiscount_Premium() {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtSalesDiscount_Premium);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            let result = await this.driverService.getAttributeValue(this.txtSalesDiscount_Premium, 'value');
            return result;
        } catch (error) {
            console.log('getValueSalesDiscount_Premium');
            console.log(error);
            return "";
        }
    }

    public async getValueProductCommission_Premium() {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtProductCommission_Premium);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            let result = await this.driverService.getAttributeValue(this.txtProductCommission_Premium, 'value');
            return result;
        } catch (error) {
            console.log('getValueProductCommission_Premium');
            console.log(error);
            return "";
        }
    }

    public async getValueSalesCommission_Premium() {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtSalesCommission_Premium);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            let result = await this.driverService.getAttributeValue(this.txtSalesCommission_Premium, 'value');
            return result;
        } catch (error) {
            console.log('getValueSalesCommission_Premium');
            console.log(error);
            return "";
        }
    }
    //#endregion


    //#region 5.01 Methods get value of text field at Premium section
    public async validateValueUnderwritingAdjustment_Premium(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtUnderwritingAdjustment_Premium);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getAttributeValue(this.txtUnderwritingAdjustment_Premium, 'value');
            return await this.driverService.validateRecord("Validate UnderwritingAdjustment!",
                [actualValue.trim(), expectedValue, "Incorrect UnderwritingAdjustment!"]);
        } catch (error) {
            console.log('validateValueUnderwritingAdjustment_Premium');
            console.log(error);
            return false;
        }
    }

    public async validateValueSalesDiscount_Premium(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtSalesDiscount_Premium);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getAttributeValue(this.txtSalesDiscount_Premium, 'value');
            return await this.driverService.validateRecord("Validate SalesDiscount!",
                [actualValue.trim(), expectedValue, "Incorrect SalesDiscount!"]);
        } catch (error) {
            console.log('validateValueSalesDiscount_Premium');
            console.log(error);
            return false;
        }
    }

    public async validateValueProductCommission_Premium(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtProductCommission_Premium);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getAttributeValue(this.txtProductCommission_Premium, 'value');
            return await this.driverService.validateRecord("Validate ProductCommission!",
                [actualValue.trim(), expectedValue, "Incorrect ProductCommission!"]);
        } catch (error) {
            console.log('validateValueProductCommission_Premium');
            console.log(error);
            return false;
        }
    }

    public async validateValueSalesCommission_Premium(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtSalesCommission_Premium);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getAttributeValue(this.txtSalesCommission_Premium, 'value');
            return await this.driverService.validateRecord("Validate SalesCommission!",
                [actualValue.trim(), expectedValue, "Incorrect SalesCommission!"]);
        } catch (error) {
            console.log('validateValueSalesCommission_Premium');
            console.log(error);
            return false;
        }
    }
    //#endregion


    //#region 5.1 Methods check validation at Premium section
    public async validateUnderwritingAdjustmentValidation_Premium(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblUnderwritingAdjustmentValidation_Premium);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(this.lblUnderwritingAdjustmentValidation_Premium);
            return await this.driverService.validateRecord("Validate UnderwritingAdjustmentValidation_Premium!",
                [actualValue.trim(), expectedValue, "Incorrect UnderwritingAdjustmentValidation_Premium!"]);
        } catch (error) {
            console.log('validateUnderwritingAdjustmentValidation_Premium');
            console.log(error);
            return false;
        }
    }

    public async validateSalesDiscountValidation_Premium(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblSalesDiscountValidation_Premium);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(this.lblSalesDiscountValidation_Premium);
            return await this.driverService.validateRecord("Validate SalesDiscountValidation_Premium!",
                [actualValue.trim(), expectedValue, "Incorrect SalesDiscountValidation_Premium!"]);
        } catch (error) {
            console.log('validateSalesDiscountValidation_Premium');
            console.log(error);
            return false;
        }
    }

    public async validateProductCommissionValidation_Premium(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblProductCommissionValidation_Premium);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(this.lblProductCommissionValidation_Premium);
            return await this.driverService.validateRecord("Validate ProductCommissionValidation_Premium!",
                [actualValue.trim(), expectedValue, "Incorrect ProductCommissionValidation_Premium!"]);
        } catch (error) {
            console.log('validateProductCommissionValidation_Premium');
            console.log(error);
            return false;
        }
    }

    public async validateSalesCommissionValidation_Premium(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblSalesCommissionValidation_Premium);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(this.lblSalesCommissionValidation_Premium);
            return await this.driverService.validateRecord("Validate SalesCommissionValidation_Premium!",
                [actualValue.trim(), expectedValue, "Incorrect SalesCommissionValidation_Premium!"]);
        } catch (error) {
            console.log('validateSalesCommissionValidation_Premium');
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region 6. Methods validate Annual Premium
    public async validatePremiumExlTax_AnnualPremium_Premium(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblPremiumExlTax_AnnualPremium_Premium);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = ((await this.driverService.getText(this.lblPremiumExlTax_AnnualPremium_Premium)).split("\n"))[0];
            if (validateApproximateCurrency(expectedValue, actualValue.trim())) {
                return true;
            }
            return await this.driverService.validateRecord("Validate PremiumExlTax_AnnualPremium_Premium!",
                [actualValue.trim(), expectedValue, "Incorrect PremiumExlTax_AnnualPremium_Premium!"]);
        } catch (error) {
            console.log('validatePremiumExlTax_AnnualPremium_Premium');
            console.log(error);
            return false;
        }
    }
    public async validateUnderwritingAdjustment_AnnualPremium_Premium(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblUnderwritingAdjustment_AnnualPremium_Premium);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            const actualValue = ((await this.driverService.getText(this.lblUnderwritingAdjustment_AnnualPremium_Premium)).split("\n"))[0];
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate UnderwritingAdjustment_AnnualPremium_Premium!",
                [actualValue.trim(), expectedValue, "Incorrect UnderwritingAdjustment_AnnualPremium_Premium!"]);
        } catch (error) {
            console.log('validateUnderwritingAdjustment_AnnualPremium_Premium');
            console.log(error);
            return false;
        }
    }
    public async validateSalesDiscount_AnnualPremium_Premium(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblSalesDiscount_AnnualPremium_Premium);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = ((await this.driverService.getText(this.lblSalesDiscount_AnnualPremium_Premium)).split("\n"))[0];
            if (validateApproximateCurrency(expectedValue, actualValue, 1)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate SalesDiscount_AnnualPremium_Premium!",
                [actualValue.trim(), expectedValue, "Incorrect SalesDiscount_AnnualPremium_Premium!"]);
        } catch (error) {
            console.log('validateSalesDiscount_AnnualPremium_Premium');
            console.log(error);
            return false;
        }
    }
    public async validateProductCommission_AnnualPremium_Premium(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblProductCommission_AnnualPremium_Premium);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = ((await this.driverService.getText(this.lblProductCommission_AnnualPremium_Premium)).split("\n"))[0];
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate ProductCommission_AnnualPremium_Premium!",
                [actualValue.trim(), expectedValue, "Incorrect ProductCommission_AnnualPremium_Premium!"]);
        } catch (error) {
            console.log('validateProductCommission_AnnualPremium_Premium');
            console.log(error);
            return false;
        }
    }
    public async validateSalesCommission_AnnualPremium_Premium(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblSalesCommission_AnnualPremium_Premium);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = ((await this.driverService.getText(this.lblSalesCommission_AnnualPremium_Premium)).split("\n"))[0];
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate SalesCommission_AnnualPremium_Premium!",
                [actualValue.trim(), expectedValue, "Incorrect SalesCommission_AnnualPremium_Premium!"]);
        } catch (error) {
            console.log('validateSalesCommission_AnnualPremium_Premium');
            console.log(error);
            return false;
        }
    }
    public async validateTax_AnnualPremium_Premium(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblTax_AnnualPremium_Premium);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = ((await this.driverService.getText(this.lblTax_AnnualPremium_Premium)).split("\n"))[0];
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate Tax_AnnualPremium_Premium!",
                [actualValue.trim(), expectedValue, "Incorrect Tax_AnnualPremium_Premium!"]);
        } catch (error) {
            console.log('validateTax_AnnualPremium_Premium');
            console.log(error);
            return false;
        }
    }
    public async validateTotalPremium_AnnualPremium_Premium(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblTotalPremium_AnnualPremium_Premium);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = ((await this.driverService.getText(this.lblTotalPremium_AnnualPremium_Premium)).split("\n"))[0];
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate TotalPremium_AnnualPremium_Premium!",
                [actualValue.trim(), expectedValue, "Incorrect TotalPremium_AnnualPremium_Premium!"]);
        } catch (error) {
            console.log('validateTotalPremium_AnnualPremium_Premium');
            console.log(error);
            return false;
        }
    }
    //#endregion


    /**
     * 
     * @param innerHTMLPartern 
     * @param option "up", "down", "none"
     */
    protected checkOptionAfterMTA(innerHTMLPartern: string, option: string) {
        try {
            if (innerHTMLPartern.includes("fa-arrow-up")) {
                if (option !== "up") {
                    logWarningMessage(`\tActual: up\t\tExpected: ${option}`);
                    return false;
                }
            } else if (innerHTMLPartern.includes("fa-arrow-down")) {
                if (option !== "down") {
                    logWarningMessage(`\tActual: down\t\tExpected: ${option}`);
                    return false;
                }
            } else {
                if (option !== "none") {
                    logWarningMessage(`\tActual: none\t\tExpected: ${option}`);
                    return false;
                }
            }
            return true;
        } catch (error) {
            console.log("checkOptionAfterMTA");
            console.log(error);
            return false;
        }
    }
    //#region 6.?? Methods validate Annual Premium for after MTA
    public async validatePremiumExlTax_MTA_AnnualPremium_Premium(expectedValue: string, option: string = "none" || "up" || "down") {
        try {
            if(option.localeCompare('none')==0){
                return true;
            }
            await this.driverService.waitUntilElementVisible(this.lblPremiumExlTax_AnnualPremium_Premium);
            const innerHTMLPartern = await this.driverService.getAttributeValue(this.lblPremiumExlTax_AnnualPremium_Premium, "innerHTML");
            if (!this.checkOptionAfterMTA(innerHTMLPartern, option)) {
                return false;
            }
            const actualValue = ((await this.driverService.getText(this.lblPremiumExlTax_AnnualPremium_Premium)).split("\n"))[1];
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate PremiumExlTax_MTA_AnnualPremium_Premium!",
                [actualValue.trim(), expectedValue, "Incorrect PremiumExlTax_MTA_AnnualPremium_Premium!"]);
        } catch (error) {
            console.log('validatePremiumExlTax_MTA_AnnualPremium_Premium');
            console.log(error);
            return false;
        }
    }
    public async validateUnderwritingAdjustment_MTA_AnnualPremium_Premium(expectedValue: string, option: string = "none" || "up" || "down") {
        try {
            if(option.localeCompare('none')==0){
                return true;
            }
            await this.driverService.waitUntilElementVisible(this.lblUnderwritingAdjustment_AnnualPremium_Premium);
            const innerHTMLPartern = await this.driverService.getAttributeValue(this.lblUnderwritingAdjustment_AnnualPremium_Premium, "innerHTML");
            if (!this.checkOptionAfterMTA(innerHTMLPartern, option)) {
                return false;
            }
            const actualValue = ((await this.driverService.getText(this.lblUnderwritingAdjustment_AnnualPremium_Premium)).split("\n"))[1];
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate UnderwritingAdjustment_MTA_AnnualPremium_Premium!",
                [actualValue.trim(), expectedValue, "Incorrect UnderwritingAdjustment_MTA_AnnualPremium_Premium!"]);
        } catch (error) {
            console.log('validateUnderwritingAdjustment_MTA_AnnualPremium_Premium');
            console.log(error);
            return false;
        }
    }
    public async validateSalesDiscount_MTA_AnnualPremium_Premium(expectedValue: string, option: string = "none" || "up" || "down") {
        try {
            if(option.localeCompare('none')==0){
                return true;
            }
            await this.driverService.waitUntilElementVisible(this.lblSalesDiscount_AnnualPremium_Premium);
            const innerHTMLPartern = await this.driverService.getAttributeValue(this.lblSalesDiscount_AnnualPremium_Premium, "innerHTML");
            if (!this.checkOptionAfterMTA(innerHTMLPartern, option)) {
                return false;
            }
            const actualValue = ((await this.driverService.getText(this.lblSalesDiscount_AnnualPremium_Premium)).split("\n"))[1];
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate SalesDiscount_MTA_AnnualPremium_Premium!",
                [actualValue.trim(), expectedValue, "Incorrect SalesDiscount_MTA_AnnualPremium_Premium!"]);
        } catch (error) {
            console.log('validateSalesDiscount_MTA_AnnualPremium_Premium');
            console.log(error);
            return false;
        }
    }
    public async validateProductCommission_MTA_AnnualPremium_Premium(expectedValue: string, option: string = "none" || "up" || "down") {
        try {
            if(option.localeCompare('none')==0){
                return true;
            }
            await this.driverService.waitUntilElementVisible(this.lblProductCommission_AnnualPremium_Premium);
            const innerHTMLPartern = await this.driverService.getAttributeValue(this.lblProductCommission_AnnualPremium_Premium, "innerHTML");
            if (!this.checkOptionAfterMTA(innerHTMLPartern, option)) {
                return false;
            }
            const actualValue = ((await this.driverService.getText(this.lblProductCommission_AnnualPremium_Premium)).split("\n"))[1];
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate ProductCommission_MTA_AnnualPremium_Premium!",
                [actualValue.trim(), expectedValue, "Incorrect ProductCommission_MTA_AnnualPremium_Premium!"]);
        } catch (error) {
            console.log('validateProductCommission_MTA_AnnualPremium_Premium');
            console.log(error);
            return false;
        }
    }
    public async validateSalesCommission_MTA_AnnualPremium_Premium(expectedValue: string, option: string = "none" || "up" || "down") {
        try {
            if(option.localeCompare('none')==0){
                return true;
            }
            await this.driverService.waitUntilElementVisible(this.lblSalesCommission_AnnualPremium_Premium);
            const innerHTMLPartern = await this.driverService.getAttributeValue(this.lblSalesCommission_AnnualPremium_Premium, "innerHTML");
            if (!this.checkOptionAfterMTA(innerHTMLPartern, option)) {
                return false;
            }
            const actualValue = ((await this.driverService.getText(this.lblSalesCommission_AnnualPremium_Premium)).split("\n"))[1];
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate SalesCommission_MTA_AnnualPremium_Premium!",
                [actualValue.trim(), expectedValue, "Incorrect SalesCommission_MTA_AnnualPremium_Premium!"]);
        } catch (error) {
            console.log('validateSalesCommission_MTA_AnnualPremium_Premium');
            console.log(error);
            return false;
        }
    }
    public async validateTax_MTA_AnnualPremium_Premium(expectedValue: string, option: string = "none" || "up" || "down") {
        try {
            if(option.localeCompare('none')==0){
                return true;
            }
            await this.driverService.waitUntilElementVisible(this.lblTax_AnnualPremium_Premium);
            const innerHTMLPartern = await this.driverService.getAttributeValue(this.lblTax_AnnualPremium_Premium, "innerHTML");
            if (!this.checkOptionAfterMTA(innerHTMLPartern, option)) {
                return false;
            }
            const actualValue = ((await this.driverService.getText(this.lblTax_AnnualPremium_Premium)).split("\n"))[1];
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate Tax_MTA_AnnualPremium_Premium!",
                [actualValue.trim(), expectedValue, "Incorrect Tax_MTA_AnnualPremium_Premium!"]);
        } catch (error) {
            console.log('validateTax_MTA_AnnualPremium_Premium');
            console.log(error);
            return false;
        }
    }
    public async validateTotalPremium_MTA_AnnualPremium_Premium(expectedValue: string, option: string = "none" || "up" || "down") {
        try {
            if(option.localeCompare('none')==0){
                return true;
            }
            await this.driverService.waitUntilElementVisible(this.lblTotalPremium_AnnualPremium_Premium);
            const innerHTMLPartern = await this.driverService.getAttributeValue(this.lblTotalPremium_AnnualPremium_Premium, "innerHTML");
            if (!this.checkOptionAfterMTA(innerHTMLPartern, option)) {
                return false;
            }
            const actualValue = ((await this.driverService.getText(this.lblTotalPremium_AnnualPremium_Premium)).split("\n"))[1];
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate TotalPremium_MTA_AnnualPremium_Premium!",
                [actualValue.trim(), expectedValue, "Incorrect TotalPremium_MTA_AnnualPremium_Premium!"]);
        } catch (error) {
            console.log('validateTotalPremium_MTA_AnnualPremium_Premium');
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region 6.2 Methods validate Policy Premium
    public async validatePremiumExlTax_PolicyPremium_Premium(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblPremiumExlTax_PolicyPremium_Premium);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = ((await this.driverService.getText(this.lblPremiumExlTax_PolicyPremium_Premium)).split("\n"))[0];
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate PremiumExlTax_PolicyPremium_Premium!",
                [actualValue.trim(), expectedValue, "Incorrect PremiumExlTax_PolicyPremium_Premium!"]);
        } catch (error) {
            console.log('validatePremiumExlTax_PolicyPremium_Premium');
            console.log(error);
            return false;
        }
    }
    public async validateUnderwritingAdjustment_PolicyPremium_Premium(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblUnderwritingAdjustment_PolicyPremium_Premium);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = ((await this.driverService.getText(this.lblUnderwritingAdjustment_PolicyPremium_Premium)).split("\n"))[0];
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate UnderwritingAdjustment_PolicyPremium_Premium!",
                [actualValue.trim(), expectedValue, "Incorrect UnderwritingAdjustment_PolicyPremium_Premium!"]);
        } catch (error) {
            console.log('validateUnderwritingAdjustment_PolicyPremium_Premium');
            console.log(error);
            return false;
        }
    }
    public async validateSalesDiscount_PolicyPremium_Premium(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblSalesDiscount_PolicyPremium_Premium);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = ((await this.driverService.getText(this.lblSalesDiscount_PolicyPremium_Premium)).split("\n"))[0];
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate SalesDiscount_PolicyPremium_Premium!",
                [actualValue.trim(), expectedValue, "Incorrect SalesDiscount_PolicyPremium_Premium!"]);
        } catch (error) {
            console.log('validateSalesDiscount_PolicyPremium_Premium');
            console.log(error);
            return false;
        }
    }
    public async validateProductCommission_PolicyPremium_Premium(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblProductCommission_PolicyPremium_Premium);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = ((await this.driverService.getText(this.lblProductCommission_PolicyPremium_Premium)).split("\n"))[0];
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate ProductCommission_PolicyPremium_Premium!",
                [actualValue.trim(), expectedValue, "Incorrect ProductCommission_PolicyPremium_Premium!"]);
        } catch (error) {
            console.log('validateProductCommission_PolicyPremium_Premium');
            console.log(error);
            return false;
        }
    }
    public async validateSalesCommission_PolicyPremium_Premium(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblSalesCommission_PolicyPremium_Premium);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = ((await this.driverService.getText(this.lblSalesCommission_PolicyPremium_Premium)).split("\n"))[0];
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate SalesCommission_PolicyPremium_Premium!",
                [actualValue.trim(), expectedValue, "Incorrect SalesCommission_PolicyPremium_Premium!"]);
        } catch (error) {
            console.log('validateSalesCommission_PolicyPremium_Premium');
            console.log(error);
            return false;
        }
    }
    public async validateTax_PolicyPremium_Premium(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblTax_PolicyPremium_Premium);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = ((await this.driverService.getText(this.lblTax_PolicyPremium_Premium)).split("\n"))[0];
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate Tax_PolicyPremium_Premium!",
                [actualValue.trim(), expectedValue, "Incorrect Tax_PolicyPremium_Premium!"]);
        } catch (error) {
            console.log('validateTax_PolicyPremium_Premium');
            console.log(error);
            return false;
        }
    }
    public async validateTotalPremium_PolicyPremium_Premium(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblTotalPremium_PolicyPremium_Premium);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = ((await this.driverService.getText(this.lblTotalPremium_PolicyPremium_Premium)).split("\n"))[0];
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate TotalPremium_PolicyPremium_Premium!",
                [actualValue.trim(), expectedValue, "Incorrect TotalPremium_PolicyPremium_Premium!"]);
        } catch (error) {
            console.log('validateTotalPremium_PolicyPremium_Premium');
            console.log(error);
            return false;
        }
    }
    //#endregion


    //#region 6.2.1 Methods validate Policy Premium after MTA
    public async validatePremiumExlTax_MTA_PolicyPremium_Premium(expectedValue: string, option: string = "none" || "up" || "down") {
        try {
            if(option.localeCompare('none')==0){
                return true;
            }
            await this.driverService.waitUntilElementVisible(this.lblPremiumExlTax_PolicyPremium_Premium);
            const innerHTMLPartern = await this.driverService.getAttributeValue(this.lblPremiumExlTax_PolicyPremium_Premium, "innerHTML");
            if (!this.checkOptionAfterMTA(innerHTMLPartern, option)) {
                return false;
            }
            const actualValue = ((await this.driverService.getText(this.lblPremiumExlTax_PolicyPremium_Premium)).split("\n"))[1];
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate PremiumExlTax_MTA_PolicyPremium_Premium!",
                [actualValue.trim(), expectedValue, "Incorrect PremiumExlTax_MTA_PolicyPremium_Premium!"]);
        } catch (error) {
            console.log('validatePremiumExlTax_MTA_PolicyPremium_Premium');
            console.log(error);
            return false;
        }
    }
    public async validateUnderwritingAdjustment_MTA_PolicyPremium_Premium(expectedValue: string, option: string = "none" || "up" || "down") {
        try {
            if(option.localeCompare('none')==0){
                return true;
            }
            await this.driverService.waitUntilElementVisible(this.lblUnderwritingAdjustment_PolicyPremium_Premium);
            const innerHTMLPartern = await this.driverService.getAttributeValue(this.lblUnderwritingAdjustment_PolicyPremium_Premium, "innerHTML");
            if (!this.checkOptionAfterMTA(innerHTMLPartern, option)) {
                return false;
            }
            const actualValue = ((await this.driverService.getText(this.lblUnderwritingAdjustment_PolicyPremium_Premium)).split("\n"))[1];
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate UnderwritingAdjustment_MTA_PolicyPremium_Premium!",
                [actualValue.trim(), expectedValue, "Incorrect UnderwritingAdjustment_MTA_PolicyPremium_Premium!"]);
        } catch (error) {
            console.log('validateUnderwritingAdjustment_MTA_PolicyPremium_Premium');
            console.log(error);
            return false;
        }
    }
    public async validateSalesDiscount_MTA_PolicyPremium_Premium(expectedValue: string, option: string = "none" || "up" || "down") {
        try {
            if(option.localeCompare('none')==0){
                return true;
            }
            await this.driverService.waitUntilElementVisible(this.lblSalesDiscount_PolicyPremium_Premium);
            const innerHTMLPartern = await this.driverService.getAttributeValue(this.lblSalesDiscount_PolicyPremium_Premium, "innerHTML");
            if (!this.checkOptionAfterMTA(innerHTMLPartern, option)) {
                return false;
            }
            const actualValue = ((await this.driverService.getText(this.lblSalesDiscount_PolicyPremium_Premium)).split("\n"))[1];
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate SalesDiscount_MTA_PolicyPremium_Premium!",
                [actualValue.trim(), expectedValue, "Incorrect SalesDiscount_MTA_PolicyPremium_Premium!"]);
        } catch (error) {
            console.log('validateSalesDiscount_MTA_PolicyPremium_Premium');
            console.log(error);
            return false;
        }
    }
    public async validateProductCommission_MTA_PolicyPremium_Premium(expectedValue: string, option: string = "none" || "up" || "down") {
        try {
            if(option.localeCompare('none')==0){
                return true;
            }
            await this.driverService.waitUntilElementVisible(this.lblProductCommission_PolicyPremium_Premium);
            const innerHTMLPartern = await this.driverService.getAttributeValue(this.lblProductCommission_PolicyPremium_Premium, "innerHTML");
            if (!this.checkOptionAfterMTA(innerHTMLPartern, option)) {
                return false;
            }
            const actualValue = ((await this.driverService.getText(this.lblProductCommission_PolicyPremium_Premium)).split("\n"))[1];
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate ProductCommission_MTA_PolicyPremium_Premium!",
                [actualValue.trim(), expectedValue, "Incorrect ProductCommission_MTA_PolicyPremium_Premium!"]);
        } catch (error) {
            console.log('validateProductCommission_MTA_PolicyPremium_Premium');
            console.log(error);
            return false;
        }
    }
    public async validateSalesCommission_MTA_PolicyPremium_Premium(expectedValue: string, option: string = "none" || "up" || "down") {
        try {
            if(option.localeCompare('none')==0){
                return true;
            }
            await this.driverService.waitUntilElementVisible(this.lblSalesCommission_PolicyPremium_Premium);
            const innerHTMLPartern = await this.driverService.getAttributeValue(this.lblSalesCommission_PolicyPremium_Premium, "innerHTML");
            if (!this.checkOptionAfterMTA(innerHTMLPartern, option)) {
                return false;
            }
            const actualValue = ((await this.driverService.getText(this.lblSalesCommission_PolicyPremium_Premium)).split("\n"))[1];
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate SalesCommission_MTA_PolicyPremium_Premium!",
                [actualValue.trim(), expectedValue, "Incorrect SalesCommission_MTA_PolicyPremium_Premium!"]);
        } catch (error) {
            console.log('validateSalesCommission_MTA_PolicyPremium_Premium');
            console.log(error);
            return false;
        }
    }
    public async validateTax_MTA_PolicyPremium_Premium(expectedValue: string, option: string = "none" || "up" || "down") {
        try {
            if(option.localeCompare('none')==0){
                return true;
            }
            await this.driverService.waitUntilElementVisible(this.lblTax_PolicyPremium_Premium);
            const innerHTMLPartern = await this.driverService.getAttributeValue(this.lblTax_PolicyPremium_Premium, "innerHTML");
            if (!this.checkOptionAfterMTA(innerHTMLPartern, option)) {
                return false;
            }
            const actualValue = ((await this.driverService.getText(this.lblTax_PolicyPremium_Premium)).split("\n"))[1];
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate Tax_MTA_PolicyPremium_Premium!",
                [actualValue.trim(), expectedValue, "Incorrect Tax_MTA_PolicyPremium_Premium!"]);
        } catch (error) {
            console.log('validateTax_MTA_PolicyPremium_Premium');
            console.log(error);
            return false;
        }
    }
    public async validateTotalPremium_MTA_PolicyPremium_Premium(expectedValue: string, option: string = "none" || "up" || "down") {
        try {
            if(option.localeCompare('none')==0){
                return true;
            }
            await this.driverService.waitUntilElementVisible(this.lblTotalPremium_PolicyPremium_Premium);
            const innerHTMLPartern = await this.driverService.getAttributeValue(this.lblTotalPremium_PolicyPremium_Premium, "innerHTML");
            if (!this.checkOptionAfterMTA(innerHTMLPartern, option)) {
                return false;
            }
            const actualValue = ((await this.driverService.getText(this.lblTotalPremium_PolicyPremium_Premium)).split("\n"))[1];
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate TotalPremium_MTA_PolicyPremium_Premium!",
                [actualValue.trim(), expectedValue, "Incorrect TotalPremium_MTA_PolicyPremium_Premium!"]);
        } catch (error) {
            console.log('validateTotalPremium_MTA_PolicyPremium_Premium');
            console.log(error);
            return false;
        }
    }
    //#endregion


    //#region 7. Purchase Contraints
    public async validateConstraint_PurchaseConstraint(expectedValue: string, positionRow: number = 1) {
        try {
            const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Purchase Constraints']]//tbody//tr[${positionRow}]/td[1]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lblActualValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(lblActualValue);
            return await this.driverService.validateRecord("Validate Constraint!",
                [actualValue.trim(), expectedValue, "Incorrect Constraint!"]);

        } catch (error) {
            console.log('validateConstraint_PurchaseConstraint');
            console.log(error);
            return false;
        }
    }
    public async validateValue_PurchaseConstraint(expectedValue: string, positionRow: number = 1) {
        try {
            const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Purchase Constraints']]//tbody//tr[${positionRow}]/td[2]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lblActualValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(lblActualValue);
            return await this.driverService.validateRecord("Validate Value!",
                [actualValue.trim(), expectedValue, "Incorrect Value!"]);

        } catch (error) {
            console.log('validateValue_PurchaseConstraint');
            console.log(error);
            return false;
        }
    }
    public async validateApproved_PurchaseConstraint(expectedValue: string, positionRow: number = 1) {
        try {
            const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Purchase Constraints']]//tbody//tr[${positionRow}]/td[3]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lblActualValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(lblActualValue);
            return await this.driverService.validateRecord("Validate Approved!",
                [actualValue.trim(), expectedValue, "Incorrect Approved!"]);

        } catch (error) {
            console.log('validateApproved_PurchaseConstraint');
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region 8. Cover Breakdown
    public async validateCoverTitleAtCoverBreakdown(expectedValue: string, positionRow: number = 1) {
        try {
            let lblValueType = await this.getFieldType(By.xpath(`//section[.//h4[contains(text(),'Cover Breakdown')]]//tbody//tr[${positionRow}]//td[1]//span`));
            let actualValue = await lblValueType.getValue();
            return await this.driverService.validateRecord("Validate cover title: ", [actualValue.trim(), expectedValue, "Incorrect cover value!"]);
        } catch (error) {
            console.log('validateCoverTitleAtCoverBreakdown');
            console.log(error);
            return false;
        }
    }

    public async validateAnnualPremiumAtCoverBreakdown(expectedValue: string, positionRow: number = 1) {
        try {
            let lblValueType = await this.getFieldType(By.xpath(`//section[.//h4[contains(text(),'Cover Breakdown')]]//tbody//tr[${positionRow}]//td[2]//span`));
            let actualValue = await lblValueType.getValue();
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate Annual Premium: ", [actualValue.trim(), expectedValue, "Incorrect Annual Premium!"]);
        } catch (error) {
            console.log('validateAnnualPremiumAtCoverBreakdown');
            console.log(error);
            return false;
        }
    }

    public async validateAnnualIPTAtCoverBreakdown(expectedValue: string, positionRow: number = 1) {
        try {
            let lblValueType = await this.getFieldType(By.xpath(`//section[.//h4[contains(text(),'Cover Breakdown')]]//tbody//tr[${positionRow}]//td[3]//span`));
            let actualValue = await lblValueType.getValue();
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate Annual IPT: ", [actualValue.trim(), expectedValue, "Incorrect Annual IPT!"]);
        } catch (error) {
            console.log('validateAnnualIPTAtCoverBreakdown');
            console.log(error);
            return false;
        }
    }

    public async validatePremiumAtCoverBreakdown(expectedValue: string, positionRow: number = 1) {
        try {
            let lblValueType = await this.getFieldType(By.xpath(`//section[.//h4[contains(text(),'Cover Breakdown')]]//tbody//tr[${positionRow}]//td[4]//span`));
            let actualValue = await lblValueType.getValue();
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate Premium: ", [actualValue.trim(), expectedValue, "Incorrect Premium!"]);
        } catch (error) {
            console.log('validatePremiumAtCoverBreakdown');
            console.log(error);
            return false;
        }
    }

    public async validateIPTAtCoverBreakdown(expectedValue: string, positionRow: number = 1) {
        try {
            let lblValueType = await this.getFieldType(By.xpath(`//section[.//h4[contains(text(),'Cover Breakdown')]]//tbody//tr[${positionRow}]//td[5]//span`));
            let actualValue = await lblValueType.getValue();
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate IPT: ", [actualValue.trim(), expectedValue, "Incorrect IPT!"]);
        } catch (error) {
            console.log('validateIPTAtCoverBreakdown');
            console.log(error);
            return false;
        }
    }

    public async validateCoverBreakdownByIndex(expectedValue: string, positionRow: number = 1, positionCol: number = 1): Promise<boolean> {
        try {
            let lblValueType = await this.getFieldType(By.xpath(`//section[.//h4[contains(text(),'Cover Breakdown')]]//tbody//tr[${positionRow}]//td[${positionCol}]//span`));
            let actualValue = await lblValueType.getValue();
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate: ", [actualValue.trim(), expectedValue, "Incorrect CoverBreakdown!"]);
        } catch (error) {
            console.log('validateCoverBreakdownByIndex');
            console.log(error);
            return false;
        }
    }

    //#endregion
}