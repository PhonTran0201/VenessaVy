import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";
import { GuaranteeDetailFormOriginalGuarantee } from "./GuaranteeDetailFormOriginalGurantee";

export class GuaranteeDetailFormLatestInformation extends GuaranteeDetailFormOriginalGuarantee {
    constructor(driverService: SeleniumWebDriverService) {
        super(driverService);
    }

    protected lblGuaranteeFeePhase1 = By.xpath("//*[contains(local-name(),'form')]//div[@id = 'previewLatestInformationRenderHere']//div[@if='IsLatest']/div[1]//li[1]//span[2]");
    protected lblGuaranteeFeePhase2 = By.xpath("//*[contains(local-name(),'form')]//div[@id = 'previewLatestInformationRenderHere']//div[@if='IsLatest']/div[1]//li[2]//span[2]");
    protected lblCommissionPhase1 = By.xpath("//*[contains(local-name(),'form')]//div[@id = 'previewLatestInformationRenderHere']//div[@if='IsLatest']/div[2]//li[1]//span[2]");
    protected lblCommissionPhase2 = By.xpath("//*[contains(local-name(),'form')]//div[@id = 'previewLatestInformationRenderHere']//div[@if='IsLatest']/div[2]//li[2]//span[2]");
    protected lblAmendmentFee = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./b[text()='Total amendment fee']]//b[2]");

    public async navigiateToLatesInformationTabInGuaranteeForm() {
        try {
            let lblValue = By.xpath(`//app-guarantee-form//ul[@role='tablist']//a[text()='Latest information']`);
            await this.driverService.waitUntilElementLoaded(lblValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.click(lblValue);
            return true;
        } catch (error) {
            console.log("navigiateToLatesInformationTabInGuaranteeForm");
            console.log(error);
            return false;
        }
    }

}