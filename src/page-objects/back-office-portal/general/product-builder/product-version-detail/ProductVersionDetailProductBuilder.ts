import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";
import { waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";

export class ProductVersionDetailProductBuilder extends BasePage {
    private lblStatusActive = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//h2/span[contains(@class,'badge-success')]");
    private lblAlertSuccess = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'alert-success')]");
    private lblAlertInfo = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'alert-info')]");
    private lblProductTitle = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-version-details//h2[contains(@class,'page-title')]");

    // Product details - In Version detail
    private tabGeneral = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//*[@id='pgs-acc-tab-General']`);
    private tabDocuments = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//*[@id='pgs-acc-tab-Documents']`);
    private tabQuestions = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//*[@id='pgs-acc-tab-Questions']`);
    private tabRules = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//*[@id='pgs-acc-tab-Rules']`);
    private tabSalesProcess = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//*[@id='pgs-acc-tab-Sales Process']`);
    private tabMultipleRisks = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//*[@id='pgs-acc-tab-Multiple Risks']`);
    private tabCovers = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//*[@id='pgs-acc-tab-Covers']`);

    //#region Product active
    public async validateValueProductTile(expectedValue: string){
        try {
            await this.driverService.waitUntilElementVisible(this.lblProductTitle);
            const actualValue = await this.driverService.getText(this.lblProductTitle);
            return await this.driverService.validateRecord('Validate Product Title!',
                [actualValue.trim(), expectedValue.trim(), 'Incorrect Product Title!']);
        } catch (error) {
            console.log('validateValueProductTile');
            console.log(error);
            return false;
        }
    }
    public async checkStatusActiveExist(){
        return await this.driverService.isExisted(this.lblStatusActive);
    }
    public async validateValueAlertSuccess(expectedValue: string){
        try {
            await this.driverService.waitUntilElementVisible(this.lblAlertSuccess);
            let actualValue = await this.driverService.getText(this.lblAlertSuccess);
            actualValue = actualValue.replace(/by(.*) and/g, "by @DisplayName@ on @DateTime@ and");
            return await this.driverService.validateRecord('Validate Alert Success!',
                [actualValue, expectedValue, 'Incorrect Alert Success!']);
        } catch (error) {
            console.log('validateValueAlertSuccess');
            console.log(error);
            return false;
        }
    }
    public async validateValueAlertInfo(expectedValue: string){
        try {
            await this.driverService.waitUntilElementVisible(this.lblAlertInfo);
            let actualValue = await this.driverService.getText(this.lblAlertInfo);
            return await this.driverService.validateRecord('Validate Alert Info!',
                [actualValue, expectedValue, 'Incorrect Alert Info!']);
        } catch (error) {
            console.log('validateValueAlertInfo');
            console.log(error);
            return false;
        }
    }
    public async getVersionOfProduct() {
        try {
            await this.driverService.waitUntilElementVisible(this.lblProductTitle);
            const title = await this.driverService.getText(this.lblProductTitle);            
            const result = title.match(/ V(\d+)/g)?.toString().trim() || "";
            return result;
        } catch (error) {
            console.log('getVersionOfProduct');
            console.log(error);
            return '';
        }
    }
    //#endregion

    //#region Navigate tabs
    public async navigateToGeneralTabProductVersion() {
        try {
            await (await this.getFieldType(this.tabGeneral)).click();
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService,2000);
            return true;
        } catch (error) {
            console.log('navigateToGeneralTabProductVersion');
            console.log(error);
            return false;
        }
    }

    public async navigateToDocumentsTabProductVersion() {
        try {
            await (await this.getFieldType(this.tabDocuments)).click();
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService,2000);
            return true;
        } catch (error) {
            console.log('navigateToDocumentsTabProductVersion');
            console.log(error);
            return false;
        }
    }

    public async navigateToQuestionsTabProductVersion() {
        try {
            await (await this.getFieldType(this.tabQuestions)).click();
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService,2000);
            return true;
        } catch (error) {
            console.log('navigateToQuestionsTabProductVersion');
            console.log(error);
            return false;
        }
    }

    public async navigateToRulesTabProductVersion() {
        try {
            await (await this.getFieldType(this.tabRules)).click();
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService,2000);
            return true;
        } catch (error) {
            console.log('navigateToRulesTabProductVersion');
            console.log(error);
            return false;
        }
    }

    public async navigateToSalesProcessTabProductVersion() {
        try {
            await (await this.getFieldType(this.tabSalesProcess)).click();
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService,2000);
            return true;
        } catch (error) {
            console.log('navigateToSalesProcessTabProductVersion');
            console.log(error);
            return false;
        }
    }

    public async navigateToMultipleRisksTabProductVersion() {
        try {
            await (await this.getFieldType(this.tabMultipleRisks)).click();
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService,2000);
            return true;
        } catch (error) {
            console.log('navigateToMultipleRisksTabProductVersion');
            console.log(error);
            return false;
        }
    }

    public async navigateToCoversTabProductVersion() {
        try {
            await (await this.getFieldType(this.tabCovers)).click();
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService,2000);
            return true;
        } catch (error) {
            console.log('navigateToCoversTabProductVersion');
            console.log(error);
            return false;
        }
    }
    //#endregion
}