import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";
import { validateApproximateCurrency } from "../../../../../shared/tenant-setting/tenant-setting";

/**
 * Policy in anonymous
 * Giao diện giống giữa các product
 */
export class PolicyDetails extends BasePage {

    protected strRootXpath = "";
    //#region Header
    protected lblPolicyRef_Header = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//app-customer-policy-list-widget//div[contains(@class,'detail-content')]//h2[contains(@class,'page-title')]`);
    protected btnAdjust_Header = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//app-customer-policy-list-widget//div[contains(@class,'page-header')]//button[text()='Adjust ']`);
    protected btnTerminate_Header = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//app-customer-policy-list-widget//div[contains(@class,'page-header')]//button[text()='Terminate ']`);
    protected btnRenew_Header = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//app-customer-policy-list-widget//div[contains(@class,'page-header')]//button[text()='Renew ']`);
    //#endregion

    //#region Policy Info section
    protected lblPeriod_PolicyInfo = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//app-customer-policy-list-widget//div[./label[contains(text(),'Period')]]//span`);
    protected lblProduct_PolicyInfo = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//app-customer-policy-list-widget//div[./label[contains(text(),'Product')]]//span`);
    protected lblProductTooltipIcon_PolicyInfo = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//app-customer-policy-list-widget//div[./label[contains(text(),'Product')]]//a/i`);
    protected lblProductTooltipVersion_PolicyInfo = By.xpath(`//ngb-tooltip-window/div[contains(@class,'tooltip-inner')]`);
    protected lblChannel_PolicyInfo = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//app-customer-policy-list-widget//div[./label[contains(text(),'Channel')]]//span`);
    protected lblEffectiveDate_PolicyInfo = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[./label[contains(text(),'Effective date')]]//span`);
    protected lblPolicyPremium_PolicyInfo = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[./label[contains(text(),'Policy Premium')]]//span`);
    protected lblAnnualPremium_PolicyInfo = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[./label[contains(text(),'Annual Premium')]]//span`);
    protected lblStatus_PolicyInfo = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[./label[contains(text(),'Status')]]`);
    protected lblPreviousInsurer_PolicyInfo = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[./label[contains(text(),'Previous insurer')]]//span[1]`);
    protected lblPreviousInsurerPopoverIcon_PolicyInfo = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[./label[contains(text(),'Previous insurer')]]//span[2]`);
    protected lblPreviousInsurerPopoverMessage_PolicyInfo = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[./label[contains(text(),'Previous insurer')]]//ngb-popover-window//div[contains(@class,'popover-message-container')]`);
    protected lblRenewalMode_PolicyInfo = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[./label[contains(text(),'Renewal mode')]]//span`);
    //#endregion

    //#region Premium Section
    protected lblPremiumExlTax_AnnualPremium_Premium = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//section[.//h4[text()=' Premium ']]//tbody//tr[./th[text()=' Premium exl. Tax ']]/td[1]`);
    protected lblUnderwritingAdjustment_AnnualPremium_Premium = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//section[.//h4[text()=' Premium ']]//tbody//tr[.//span[contains(text(),'Underwriting adjustment')]]/td[1]`);
    protected lblSalesDiscount_AnnualPremium_Premium = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//section[.//h4[text()=' Premium ']]//tbody//tr[.//th[contains(text(),'Sales discount')]]/td[1]`);
    protected lblProductCommission_AnnualPremium_Premium = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//section[.//h4[text()=' Premium ']]//tbody//tr[.//th[contains(text(),' Product commission ')]]/td[1]`);
    protected lblSalesCommission_AnnualPremium_Premium = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//section[.//h4[text()=' Premium ']]//tbody//tr[.//th[contains(text(),' Sales commission ')]]/td[1]`);
    protected lblTax_AnnualPremium_Premium = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//section[.//h4[text()=' Premium ']]//tbody//tr[.//th[text()=' Tax ']]/td[1]`);
    protected lblTotalPremium_AnnualPremium_Premium = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//section[.//h4[text()=' Premium ']]//tbody//tr[.//th[text()=' Total premium ']]/td[1]`);

    protected lblPremiumExlTax_PolicyPremium_Premium = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//section[.//h4[text()=' Premium ']]//tbody//tr[./th[text()=' Premium exl. Tax ']]/td[2]`);
    protected lblUnderwritingAdjustment_PolicyPremium_Premium = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//section[.//h4[text()=' Premium ']]//tbody//tr[.//span[contains(text(),'Underwriting adjustment')]]/td[2]`);
    protected lblSalesDiscount_PolicyPremium_Premium = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//section[.//h4[text()=' Premium ']]//tbody//tr[.//th[contains(text(),'Sales discount')]]/td[2]`);
    protected lblProductCommission_PolicyPremium_Premium = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//section[.//h4[text()=' Premium ']]//tbody//tr[.//th[contains(text(),' Product commission ')]]/td[2]`);
    protected lblSalesCommission_PolicyPremium_Premium = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//section[.//h4[text()=' Premium ']]//tbody//tr[.//th[contains(text(),' Sales commission ')]]/td[2]`);
    protected lblTax_PolicyPremium_Premium = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//section[.//h4[text()=' Premium ']]//tbody//tr[.//th[text()=' Tax ']]/td[2]`);
    protected lblTotalPremium_PolicyPremium_Premium = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//section[.//h4[text()=' Premium ']]//tbody//tr[.//th[text()=' Total premium ']]/td[2]`);

    // Cột %
    protected lblUnderwritingAdjustment_Premium = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//section[.//h4[text()=' Premium ']]//tbody//tr[.//th[contains(text(),'Underwriting adjustment')]]/th[2]`);
    protected lblSalesDiscount_Premium = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//section[.//h4[text()=' Premium ']]//tbody//tr[.//th[contains(text(),'Sales discount')]]/th[2]`);
    protected lblProductCommission_Premium = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//section[.//h4[text()=' Premium ']]//tbody//tr[.//th[contains(text(),'Product commission')]]/th[2]`);
    protected lblSalesCommission_Premium = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//section[.//h4[text()=' Premium ']]//tbody//tr[.//th[contains(text(),'Sales commission')]]/th[2]`);
    //#endregion

    //#region Documents
    protected hrefDocument = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'policy-document')]//a//span`);
    //#endregion

    public async getEffectiveDatePolicyInfo() {
        try {
            let bp = new BasePage(this.driverService);
            let lblValue = await bp.getFieldType(this.lblEffectiveDate_PolicyInfo);
            return await lblValue.getValue();
        } catch (error) {
            console.log(`getEffectiveDatePolicyInfo`);
            console.log(error);
            return "";
        }
    }

    public async checkPolicyDetailIsOpening(policyRef: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblPolicyRef_Header);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            if (policyRef) {
                const actualPolicyRef = await this.driverService.getText(this.lblPolicyRef_Header);
                return actualPolicyRef.includes(policyRef);
            }
            return true;
        } catch (error) {
            console.log("checkPolicyDetailIsOpening\n" + error);
            return false;
        }
    }
    public async pressAdjustButton_OnHeader(){
        try {
            await this.driverService.waitUntilElementVisible(this.btnAdjust_Header);
            await this.driverService.click(this.btnAdjust_Header);
            return true;
        } catch (error) {
            console.log('pressAdjustButton_OnHeader');
            console.log(error);
            return false;
        }
    }
    public async pressTerminate_OnHeader(){
        try {
            await this.driverService.waitUntilElementVisible(this.btnTerminate_Header);
            await this.driverService.click(this.btnTerminate_Header);
            return true;
        } catch (error) {
            console.log('pressTerminate_OnHeader');
            console.log(error);
            return false;
        }
    }
    public async pressRenew_OnHeader(){
        try {
            await this.driverService.waitUntilElementVisible(this.btnRenew_Header);
            await this.driverService.click(this.btnRenew_Header);
            return true;
        } catch (error) {
            console.log('pressRenew_OnHeader');
            console.log(error);
            return false;
        }
    }
    //#region Section Policy Info
    public async validatePeriodPolicyInfo(expectedValue: string) {
        try {
            let bp = new BasePage(this.driverService);
            let lblValue = await bp.getFieldType(this.lblPeriod_PolicyInfo);
            let actualValue = await lblValue.getValue();
            return await this.driverService.validateRecord('Validate Period: ', [actualValue, expectedValue, 'Incorrect Period!']);
        } catch (error) {
            console.log(`validatePeriodPolicyInfo`);
            console.log(error);
            return false;
        }
    }

    public async validateProductPolicyInfo(expectedValue: string) {
        try {
            let bp = new BasePage(this.driverService);
            let lblValue = await bp.getFieldType(this.lblProduct_PolicyInfo);
            let actualValue = await lblValue.getValue();
            return await this.driverService.validateRecord('Validate Product: ', [actualValue, expectedValue, 'Incorrect Product!']);
        } catch (error) {
            console.log(`validateProductPolicyInfo`);
            console.log(error);
            return false;
        }
    }

    public async validateValueProductTooltipVersionPolicyInfo(expectedValue: string){
        try {
            await this.driverService.waitUntilElementLoaded(this.lblProductTooltipIcon_PolicyInfo);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.mouseHover(this.lblProductTooltipIcon_PolicyInfo);
            await this.driverService.waitUntilElementLoaded(this.lblProductTooltipVersion_PolicyInfo);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
            const actualValue = await this.driverService.getText(this.lblProductTooltipVersion_PolicyInfo);
            return await this.driverService.validateRecord('Validate Product version!',
                [actualValue, expectedValue, 'Incorrect Product version!']);
        } catch (error) {
            console.log('validateValueProductTooltipVersionPolicyInfo');
            console.log(error);
            return false;
        }
    }

    public async pressProductTooltipVersion(){
        try {
            await this.driverService.waitUntilElementLoaded(this.lblProductTooltipIcon_PolicyInfo);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.click(this.lblProductTooltipIcon_PolicyInfo);
            return true;
        } catch (error) {
            console.log('pressProductTooltipVersion');
            console.log(error);
            return false;
        }
    }

    public async validateChannelPolicyInfo(expectedValue: string) {
        try {
            let lblValue = await this.getFieldType(this.lblChannel_PolicyInfo);
            let actualValue = await lblValue.getValue();
            return await this.driverService.validateRecord('Validate Channel: ', [actualValue, expectedValue, 'Incorrect Channel!']);
        } catch (error) {
            console.log(`validateChannelPolicyInfo`);
            console.log(error);
            return false;
        }
    }

    public async validateEffectiveDatePolicyInfo(expectedValue: string) {
        try {
            let bp = new BasePage(this.driverService);
            let lblValue = await bp.getFieldType(this.lblEffectiveDate_PolicyInfo);
            let actualValue = await lblValue.getValue();
            return await this.driverService.validateRecord('Validate EffectiveDate: ', [actualValue, expectedValue, 'Incorrect EffectiveDate!']);
        } catch (error) {
            console.log(`validateEffectiveDatePolicyInfo`);
            console.log(error);
            return false;
        }
    }

    public async validatePolicyPremiumPolicyInfo(expectedValue: string) {
        try {
            let bp = new BasePage(this.driverService);
            let lblValue = await bp.getFieldType(this.lblPolicyPremium_PolicyInfo);
            let actualValue = await lblValue.getValue();
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord('Validate PolicyPremium: ', [actualValue, expectedValue, 'Incorrect PolicyPremium!']);
        } catch (error) {
            console.log(`validatePolicyPremiumPolicyInfo`);
            console.log(error);
            return false;
        }
    }

    public async validateAnnualPremiumPolicyInfo(expectedValue: string) {
        try {
            let bp = new BasePage(this.driverService);
            let lblValue = await bp.getFieldType(this.lblAnnualPremium_PolicyInfo);
            let actualValue = await lblValue.getValue();
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord('Validate AnnualPremium: ', [actualValue, expectedValue, 'Incorrect AnnualPremium!']);
        } catch (error) {
            console.log(`validateAnnualPremiumPolicyInfo`);
            console.log(error);
            return false;
        }
    }

    public async validateStatusPolicyInfo(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.lblStatus_PolicyInfo);
            let actualValue = (await this.driverService.getAttributeValue(this.lblStatus_PolicyInfo, 'innerText')).split("\n")[1];
            return await this.driverService.validateRecord('Validate Status: ', [actualValue, expectedValue, 'Incorrect Status!']);
        } catch (error) {
            console.log(`validateStatusPolicyInfo`);
            console.log(error);
            return false;
        }
    }

    public async validatePreviousInsurerPolicyInfo(expectedValue: string) {
        try {
            let bp = new BasePage(this.driverService);
            let lblValue = await bp.getFieldType(this.lblPreviousInsurer_PolicyInfo);
            let actualValue = await lblValue.getValue();
            return await this.driverService.validateRecord('Validate PreviousInsurer: ', [actualValue, expectedValue, 'Incorrect PreviousInsurer!']);
        } catch (error) {
            console.log(`validatePreviousInsurerPolicyInfo`);
            console.log(error);
            return false;
        }
    }

    public async validateValuePreviousInsurerPopoverPolicyInfo(expectedValue: string){
        try {
            await this.driverService.waitUntilElementVisible(this.lblPreviousInsurerPopoverIcon_PolicyInfo);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await this.driverService.mouseHover(this.lblPreviousInsurerPopoverIcon_PolicyInfo);
            await this.driverService.waitUntilElementVisible(this.lblPreviousInsurerPopoverMessage_PolicyInfo);
            const actualValue = await this.driverService.getText(this.lblPreviousInsurerPopoverMessage_PolicyInfo);
            return await this.driverService.validateRecord('Validate Previous Insurer Popover message!',
                [actualValue, expectedValue, 'Incorrect Previous Insurer Popover message!']);
        } catch (error) {
            console.log('validateValuePreviousInsurerPopoverPolicyInfo');
            console.log(error);
            return false;
        }
    }

    public async validateRenewalModePolicyInfo(expectedValue: string) {
        try {
            let bp = new BasePage(this.driverService);
            let lblValue = await bp.getFieldType(this.lblRenewalMode_PolicyInfo);
            let actualValue = await lblValue.getValue();
            return await this.driverService.validateRecord('Validate RenewalMode: ', [actualValue, expectedValue, 'Incorrect RenewalMode!']);
        } catch (error) {
            console.log(`validateRenewalModePolicyInfo`);
            console.log(error);
            return false;
        }
    }
    //#endregion

        //#region 0. Methods Quote Documents
        public async validateDocumentName(expectedValue: string) {
            try {
                await this.driverService.waitUntilElementLoaded(this.hrefDocument);
                await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
                const actualValue = await this.driverService.getText(this.hrefDocument);
                return await this.driverService.validateRecord("Validate Documents name!",
                    [actualValue.trim(), expectedValue, "Incorrect Documents name!"]);
            } catch (error) {
                console.log('validateDocumentName');
                console.log(error);
                return false;
            }
        }
    
        public async pressDownloadDocument() {
            try {
                await this.driverService.waitUntilElementLoaded(this.hrefDocument);
                await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
                await this.driverService.click(this.hrefDocument);
                await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
                return true;
            } catch (error) {
                console.log('pressDownloadDocument');
                console.log(error);
                return false;
            }
        }
        //#endregion

    //#region Premium section - column Annual Premium
    public async validatePremiumExlTax_AnnualPremium_Premium(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblPremiumExlTax_AnnualPremium_Premium);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(this.lblPremiumExlTax_AnnualPremium_Premium);
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate PremiumExlTax_AnnualPremium_Premium!",
                [actualValue, expectedValue, "Incorrect PremiumExlTax_AnnualPremium_Premium!"]);
        } catch (error) {
            console.log('validatePremiumExlTax_AnnualPremium_Premium');
            console.log(error);
            return false;
        }
    }
    public async validateUnderwritingAdjustment_AnnualPremium_Premium(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblUnderwritingAdjustment_AnnualPremium_Premium);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(this.lblUnderwritingAdjustment_AnnualPremium_Premium);
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate UnderwritingAdjustment_AnnualPremium_Premium!",
                [actualValue, expectedValue, "Incorrect UnderwritingAdjustment_AnnualPremium_Premium!"]);
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
            const actualValue = await this.driverService.getText(this.lblSalesDiscount_AnnualPremium_Premium);
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate SalesDiscount_AnnualPremium_Premium!",
                [actualValue, expectedValue, "Incorrect SalesDiscount_AnnualPremium_Premium!"]);
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
            const actualValue = await this.driverService.getText(this.lblProductCommission_AnnualPremium_Premium);
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate ProductCommission_AnnualPremium_Premium!",
                [actualValue, expectedValue, "Incorrect ProductCommission_AnnualPremium_Premium!"]);
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
            const actualValue = await this.driverService.getText(this.lblSalesCommission_AnnualPremium_Premium);
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate SalesCommission_AnnualPremium_Premium!",
                [actualValue, expectedValue, "Incorrect SalesCommission_AnnualPremium_Premium!"]);
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
            const actualValue = await this.driverService.getText(this.lblTax_AnnualPremium_Premium);
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate Tax_AnnualPremium_Premium!",
                [actualValue, expectedValue, "Incorrect Tax_AnnualPremium_Premium!"]);
        } catch (error) {
            console.log('validateTax_AnnualPremium_Premium');
            console.log(error);
            return false;
        }
    }
    
    public async validateTotalPremium_AnnualPremium_Premium(expectedValue: string) {
        try {
            let bp = new BasePage(this.driverService);
            let lblValue = await bp.getFieldType(this.lblTotalPremium_AnnualPremium_Premium);
            let actualValue = await lblValue.getValue();
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord('Validate AnnualPremium: ', [actualValue, expectedValue, 'Incorrect AnnualPremium!']);
        } catch (error) {
            console.log(`validateTotalPremium_AnnualPremium_Premium`);
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region Premium section - Policy Premium
    public async validatePremiumExlTax_PolicyPremium_Premium(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblPremiumExlTax_PolicyPremium_Premium);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(this.lblPremiumExlTax_PolicyPremium_Premium);
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate PremiumExlTax_PolicyPremium_Premium!",
                [actualValue, expectedValue, "Incorrect PremiumExlTax_PolicyPremium_Premium!"]);
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
            const actualValue = await this.driverService.getText(this.lblUnderwritingAdjustment_PolicyPremium_Premium);
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate UnderwritingAdjustment_PolicyPremium_Premium!",
                [actualValue, expectedValue, "Incorrect UnderwritingAdjustment_PolicyPremium_Premium!"]);
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
            const actualValue = await this.driverService.getText(this.lblSalesDiscount_PolicyPremium_Premium);
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate SalesDiscount_PolicyPremium_Premium!",
                [actualValue, expectedValue, "Incorrect SalesDiscount_PolicyPremium_Premium!"]);
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
            const actualValue = await this.driverService.getText(this.lblProductCommission_PolicyPremium_Premium);
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate ProductCommission_PolicyPremium_Premium!",
                [actualValue, expectedValue, "Incorrect ProductCommission_PolicyPremium_Premium!"]);
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
            const actualValue = await this.driverService.getText(this.lblSalesCommission_PolicyPremium_Premium);
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate SalesCommission_PolicyPremium_Premium!",
                [actualValue, expectedValue, "Incorrect SalesCommission_PolicyPremium_Premium!"]);
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
            const actualValue = await this.driverService.getText(this.lblTax_PolicyPremium_Premium);
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate Tax_PolicyPremium_Premium!",
                [actualValue, expectedValue, "Incorrect Tax_PolicyPremium_Premium!"]);
        } catch (error) {
            console.log('validateTax_PolicyPremium_Premium');
            console.log(error);
            return false;
        }
    }
    public async validateTotalPremium_PolicyPremium_Premium(expectedValue: string) {
        try {
            let bp = new BasePage(this.driverService);
            let lblValue = await bp.getFieldType(this.lblTotalPremium_PolicyPremium_Premium);
            let actualValue = await lblValue.getValue();
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord('Validate PolicyPremium: ', [actualValue, expectedValue, 'Incorrect PolicyPremium!']);
        } catch (error) {
            console.log(`validateTotalPremium_PolicyPremium_Premium`);
            console.log(error);
            return false;
        }
    }
    //#endregion


    //#region Section Premium - Validate column %
    public async validateValueUnderwritingAdjustment_Premium(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblUnderwritingAdjustment_Premium);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(this.lblUnderwritingAdjustment_Premium);
            return await this.driverService.validateRecord("Validate UnderwritingAdjustment!",
                [actualValue, expectedValue, "Incorrect UnderwritingAdjustment!"]);
        } catch (error) {
            console.log('validateValueUnderwritingAdjustment_Premium');
            console.log(error);
            return false;
        }
    }

    public async validateValueSalesDiscount_Premium(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblSalesDiscount_Premium);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(this.lblSalesDiscount_Premium);
            return await this.driverService.validateRecord("Validate SalesDiscount!",
                [actualValue, expectedValue, "Incorrect SalesDiscount!"]);
        } catch (error) {
            console.log('validateValueSalesDiscount_Premium');
            console.log(error);
            return false;
        }
    }

    public async validateValueProductCommission_Premium(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblProductCommission_Premium);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(this.lblProductCommission_Premium);
            return await this.driverService.validateRecord("Validate ProductCommission!",
                [actualValue, expectedValue, "Incorrect ProductCommission!"]);
        } catch (error) {
            console.log('validateValueProductCommission_Premium');
            console.log(error);
            return false;
        }
    }

    public async validateValueSalesCommission_Premium(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblSalesCommission_Premium);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(this.lblSalesCommission_Premium);
            return await this.driverService.validateRecord("Validate SalesCommission!",
                [actualValue, expectedValue, "Incorrect SalesCommission!"]);
        } catch (error) {
            console.log('validateValueSalesCommission_Premium');
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region 8. Cover Breakdown
    public async validateCoverTitleAtCoverBreakdown(expectedValue:string, positionRow:number = 1){
        try{
            let lblValueType = await this.getFieldType(By.xpath(`//section[.//h4[contains(text(),'Cover breakdown')]]//tbody//tr[${positionRow}]//td[1]//span`));
            let actualValue = await lblValueType.getValue();
            return await this.driverService.validateRecord("Validate cover title: ",[actualValue,expectedValue, "Incorrect cover value!"]);
        }catch (error) {
            console.log('validateCoverTitleAtCoverBreakdown');
            console.log(error);
            return false;
        }
    }

    public async validateAnnualPremiumAtCoverBreakdown(expectedValue:string, positionRow:number = 1){
        try{
            let lblValueType = await this.getFieldType(By.xpath(`//section[.//h4[contains(text(),'Cover breakdown')]]//tbody//tr[${positionRow}]//td[2]//span`));
            let actualValue = await lblValueType.getValue();
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate Annual Premium: ",[actualValue,expectedValue, "Incorrect Annual Premium!"]);
        }catch (error) {
            console.log('validateAnnualPremiumAtCoverBreakdown');
            console.log(error);
            return false;
        }
    }

    public async validateAnnualIPTAtCoverBreakdown(expectedValue:string, positionRow:number = 1){
        try{
            let lblValueType = await this.getFieldType(By.xpath(`//section[.//h4[contains(text(),'Cover breakdown')]]//tbody//tr[${positionRow}]//td[3]//span`));
            let actualValue = await lblValueType.getValue();
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate Annual IPT: ",[actualValue,expectedValue, "Incorrect Annual IPT!"]);
        }catch (error) {
            console.log('validateAnnualIPTAtCoverBreakdown');
            console.log(error);
            return false;
        }
    }

    public async validatePremiumAtCoverBreakdown(expectedValue:string, positionRow:number = 1){
        try{
            let lblValueType = await this.getFieldType(By.xpath(`//section[.//h4[contains(text(),'Cover breakdown')]]//tbody//tr[${positionRow}]//td[4]//span`));
            let actualValue = await lblValueType.getValue();
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate Premium: ",[actualValue,expectedValue, "Incorrect Premium!"]);
        }catch (error) {
            console.log('validatePremiumAtCoverBreakdown');
            console.log(error);
            return false;
        }
    }

    public async validateIPTAtCoverBreakdown(expectedValue:string, positionRow:number = 1){
        try{
            let lblValueType = await this.getFieldType(By.xpath(`//section[.//h4[contains(text(),'Cover breakdown')]]//tbody//tr[${positionRow}]//td[5]//span`));
            let actualValue = await lblValueType.getValue();
            if (validateApproximateCurrency(expectedValue, actualValue)) {
                return true;
            }
            return await this.driverService.validateRecord("Validate IPT: ",[actualValue,expectedValue, "Incorrect IPT!"]);
        }catch (error) {
            console.log('validateIPTAtCoverBreakdown');
            console.log(error);
            return false;
        }
    }
    public async validateCoverBreakdownByIndex(expectedValue: string, positionRow: number = 1, positionCol: number = 1): Promise<boolean> {
        try {
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService,100);
            let lblValueType = await this.getFieldType(By.xpath(`${this.strRootXpath}//section[.//h4[contains(text(),'Cover breakdown')]]//tbody//tr[${positionRow}]//td[${positionCol}]//span`));
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


    //#region  Validate value at Payment schedule
    public async validateValueType_PaymentSchedule(expectedValue: string, positionRow = 1){
        try {
            const lblAcctualValue = By.xpath(`${this.strRootXpath}//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'schedule-list')]//li[${positionRow}]//div[./span[text()=' Type: ']]`);
            await this.driverService.waitUntilElementLoaded(lblAcctualValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(lblAcctualValue);
            return await this.driverService.validateRecord('Validate Type_PaymentSchedule!',
                [actualValue.trim().replace("Type: ", ""), expectedValue, 'Incorrect Type_PaymentSchedule!']);
        } catch (error) {
            console.log('validateValueType_PaymentSchedule');
            console.log(error);
            return false;
        }
    }
    public async validateValueOrder_PaymentSchedule(expectedValue: string, positionRow = 1){
        try {
            const lblAcctualValue = By.xpath(`${this.strRootXpath}//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'schedule-list')]//li[${positionRow}]//div[./span[text()=' Order: ']]`);
            await this.driverService.waitUntilElementLoaded(lblAcctualValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(lblAcctualValue);
            return await this.driverService.validateRecord('Validate Order_PaymentSchedule!',
                [actualValue, expectedValue, 'Incorrect Order_PaymentSchedule!']);
        } catch (error) {
            console.log('validateValueOrder_PaymentSchedule');
            console.log(error);
            return false;
        }
    }

    public async validateValueTotal_PaymentSchedule(expectedValue: string, positionRow = 1){
        try {
            const lblAcctualValue = By.xpath(`${this.strRootXpath}//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'schedule-list')]//li[${positionRow}]//div[./div[text()=' Total ']]/div[2]`);
            await this.driverService.waitUntilElementLoaded(lblAcctualValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(lblAcctualValue);
            return await this.driverService.validateRecord('Validate Total_PaymentSchedule!',
                [actualValue, expectedValue, 'Incorrect Total_PaymentSchedule!']);
        } catch (error) {
            console.log('validateValueTotal_PaymentSchedule');
            console.log(error);
            return false;
        }
    }

    public async validateValueTax_PaymentSchedule(expectedValue: string, positionRow = 1){
        try {
            const lblAcctualValue = By.xpath(`${this.strRootXpath}//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'schedule-list')]//li[${positionRow}]//div[./div[text()=' Tax ']]/div[2]`);
            await this.driverService.waitUntilElementLoaded(lblAcctualValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(lblAcctualValue);
            return await this.driverService.validateRecord('Validate Tax_PaymentSchedule!',
                [actualValue, expectedValue, 'Incorrect Tax_PaymentSchedule!']);
        } catch (error) {
            console.log('validateValueTax_PaymentSchedule');
            console.log(error);
            return false;
        }
    }
    public async validateValueCommission_PaymentSchedule(expectedValue: string, positionRow = 1){
        try {
            const lblAcctualValue = By.xpath(`${this.strRootXpath}//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'schedule-list')]//li[${positionRow}]//div[./div[text()=' Commission ']]/div[2]`);
            await this.driverService.waitUntilElementLoaded(lblAcctualValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(lblAcctualValue);
            return await this.driverService.validateRecord('Validate Commission_PaymentSchedule!',
                [actualValue, expectedValue, 'Incorrect Commission_PaymentSchedule!']);
        } catch (error) {
            console.log('validateValueCommission_PaymentSchedule');
            console.log(error);
            return false;
        }
    }
    public async validateValuePeriod_PaymentSchedule(expectedValue: string, positionRow = 1){
        try {
            const lblAcctualValue = By.xpath(`${this.strRootXpath}//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'schedule-list')]//li[${positionRow}]//div[./div[text()=' Period ']]/div[2]`);
            await this.driverService.waitUntilElementLoaded(lblAcctualValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(lblAcctualValue);
            return await this.driverService.validateRecord('Validate Period_PaymentSchedule!',
                [actualValue, expectedValue, 'Incorrect Period_PaymentSchedule!']);
        } catch (error) {
            console.log('validateValuePeriod_PaymentSchedule');
            console.log(error);
            return false;
        }
    }
    public async validateValueDueDate_PaymentSchedule(expectedValue: string, positionRow = 1){
        try {
            const lblAcctualValue = By.xpath(`${this.strRootXpath}//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'schedule-list')]//li[${positionRow}]//div[./div[text()=' Due Date ']]/div[2]`);
            await this.driverService.waitUntilElementLoaded(lblAcctualValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(lblAcctualValue);
            return await this.driverService.validateRecord('Validate DueDate_PaymentSchedule!',
                [actualValue, expectedValue, 'Incorrect DueDate_PaymentSchedule!']);
        } catch (error) {
            console.log('validateValueDueDate_PaymentSchedule');
            console.log(error);
            return false;
        }
    }
    public async validateValueBookingRef_PaymentSchedule(expectedValue: string, positionRow = 1){
        try {
            const lblAcctualValue = By.xpath(`$${this.strRootXpath}//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'schedule-list')]//li[${positionRow}]//div[./div[text()=' Booking Ref. ']]/div[2]`);
            await this.driverService.waitUntilElementLoaded(lblAcctualValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(lblAcctualValue);
            return await this.driverService.validateRecord('Validate BookingRef_PaymentSchedule!',
                [actualValue, expectedValue, 'Incorrect BookingRef_PaymentSchedule!']);
        } catch (error) {
            console.log('validateValueBookingRef_PaymentSchedule');
            console.log(error);
            return false;
        }
    }
    public async validateValueBookingOn_PaymentSchedule(expectedValue: string, positionRow = 1){
        try {
            const lblAcctualValue = By.xpath(`${this.strRootXpath}//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'schedule-list')]//li[${positionRow}]//div[./div[text()=' Booking On ']]/div[2]`);
            await this.driverService.waitUntilElementLoaded(lblAcctualValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(lblAcctualValue);
            return await this.driverService.validateRecord('Validate BookingOn_PaymentSchedule!',
                [actualValue, expectedValue, 'Incorrect BookingOn_PaymentSchedule!']);
        } catch (error) {
            console.log('validateValueBookingOn_PaymentSchedule');
            console.log(error);
            return false;
        }
    }
    public async validateValueStatus_PaymentSchedule(expectedValue: string, positionRow = 1){
        try {
            const lblAcctualValue = By.xpath(`${this.strRootXpath}//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'schedule-list')]//li[${positionRow}]//div[./div[text()=' Status ']]/div[2]`);
            await this.driverService.waitUntilElementLoaded(lblAcctualValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(lblAcctualValue);
            return await this.driverService.validateRecord('Validate Status_PaymentSchedule!',
                [actualValue, expectedValue, 'Incorrect Status_PaymentSchedule!']);
        } catch (error) {
            console.log('validateValueStatus_PaymentSchedule');
            console.log(error);
            return false;
        }
    }
    //#endregion
}