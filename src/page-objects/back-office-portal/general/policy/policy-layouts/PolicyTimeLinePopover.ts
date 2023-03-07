import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";
import { waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";

export class PolicyTimeLinePopover extends BasePage {
    protected strRootXpath = "";

    protected btnStartDate = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//*[contains(local-name(),'timeline')]//button[@title="Start date"]`);
    protected btnAdjustmentEffectedDate = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//*[contains(local-name(),'timeline')]//button[.//i[contains(@class,'fa-edit')]]`);
    protected btnExpiry = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//*[contains(local-name(),'timeline')]//button[@title="Expiry"]`);

    // Popover form duy nhất chỉ 1 nên không cần override
    private lblPopoverTitle = By.xpath(`//*[contains(local-name(),'popover')]//div[contains(@class,"popover-title")]`);
    private InsuranceCertificateIcon = By.xpath(`//*[contains(local-name(),'popover')]//div[contains(@class,"popover-content")]//div[./div[contains(@title,'Insurance Certificate')]]//img[@src='./assets/images/document/pdf.png']`);
    private InsuranceCertificateDocument = By.xpath(`//*[contains(local-name(),'popover')]//div[contains(@class,"popover-content")]//div[./div[contains(@title,'Insurance Certificate')]]//a`);
    //button functions
    public async clickStartDateButtonOnPolicyTimeline() {
        try {
            let button = await this.getFieldType(this.btnStartDate);
            await button.click();
            return true;
        } catch (error) {
            console.log(`clickStartDateButtonOnPolicyTimeline`);
            console.log(error);
            return false;
        }
    }

    public async clickAdjustmentEffectedDateButtonOnPolicyTimeline() {
        try {
            let button = await this.getFieldType(this.btnAdjustmentEffectedDate);
            await button.click();
            return true;
        } catch (error) {
            console.log(`clickAdjustmentEffectedDateButtonOnPolicyTimeline`);
            console.log(error);
            return false;
        }
    }

    public async clickExpiryButtonOnPolicyTimeline() {
        try {
            let button = await this.getFieldType(this.btnExpiry);
            await button.click();
            return true;
        } catch (error) {
            console.log(`clickExpiryButtonOnPolicyTimeline`);
            console.log(error);
            return false;
        }
    }

    public async waitPopoverWindowIsExisted(){
        try {
            let xpath = By.xpath(`//ngb-popover-window`);
            while(!await this.driverService.isExisted(xpath)){
                await this.clickExpiryButtonOnPolicyTimeline();
            }
            return await this.driverService.isExisted(xpath);
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    //validate Popover function
    public async validatePopoverTitle(expectedValue: string) {
        try {
            let lblPopoverTitle = await this.getFieldType(this.lblPopoverTitle);
            let actualValue = await lblPopoverTitle.getValue();
            return await this.driverService.validateRecord("Validate Popover Title: ", [actualValue, expectedValue, "Incorrect Popover Title!"]);
        } catch (error) {
            console.log(`validatePopoverTitle`);
            console.log(error);
            return false;
        }
    }

    public async validateValueByFieldAtPopover(expectedValue: string, fieldName: string) {
        try {
            let temp = By.xpath(`//*[contains(local-name(),'popover')]//div[contains(@class,"popover-content")]//div[./div[contains(@title,'${fieldName}')]]//span//*[self::*[text()]]`);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            if (!(await this.driverService.isExisted(temp))) {
                await this.clickStartDateButtonOnPolicyTimeline();
                await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
                if (!(await this.driverService.isExisted(temp))) {
                    return false;
                }
            }
            let lblPopoverValue = await this.getFieldType(temp);
            await this.driverService.waitUntilElementVisible(temp);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService,10);
            let actualValue = await lblPopoverValue.getValue();
            return await this.driverService.validateRecord(`Validate ${fieldName} Popover Value: `, [actualValue, expectedValue, `Incorrect ${fieldName} Value!`]);
        } catch (error) {
            console.log(`validateValueByFieldAtPopover`);
            console.log(error);
            return false;
        }
    }
    public async validateFieldAtPopoverIsNotExisted(fieldName: string) {
        try {
            if (!await this.driverService.isExisted(By.xpath('//ngb-popover-window'))) {
                await this.clickStartDateButtonOnPolicyTimeline();
                await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            }
            let temp = By.xpath(`//*[contains(local-name(),'popover')]//div[contains(@class,"popover-content")]//div[./div[contains(@title,'${fieldName}')]]//span//*[self::*[text()]]`);
            if (await this.driverService.isExisted(temp)) {
                return false
            }
            return true;
        } catch (error) {
            console.log(`validateFieldAtPopoverIsNotExisted`);
            console.log(error);
            return false;
        }
    }

    public async validateInsuranceCertificateIcon() {
        try {
            if (await this.driverService.isExisted(this.InsuranceCertificateIcon)) {
                return true;
            }
            return false;
        } catch (error) {
            console.log(`validateInsuranceCertificateIcon`);
            console.log(error);
            return false;
        }
    }
    public async downloadInsuranceCertificateDocument() {
        try {
            let element = await this.getFieldType(this.InsuranceCertificateDocument);
            await element.click();
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true;
        } catch (error) {
            console.log(`downloadInsuranceCertificateDocument`);
            console.log(error);
            return false;
        }
    }
}