import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";

export class AppNavigationCPVarsam{
    private btnMyProfile = By.xpath("//app-header//ul/li[.//*[text()='My profile']]");
    private btnClaims = By.xpath("//app-header//ul/li[.//*[text()='Claims']]");
    private btnRewards = By.xpath("//app-header//ul/li[.//*[text()='Rewards']]");

    private btnItemNavigationActive = By.xpath("//app-header//ul/li[contains(@class,'active')]//*[text()]");
    protected driverService = SeleniumWebDriverService.getInstance();

    public async pressMyProfileButton(){
        try {
            await this.driverService.waitUntilElementVisible(this.btnMyProfile);
            await this.driverService.click(this.btnMyProfile);
            return true;
        } catch (error) {
            console.log('pressMyProfileButton');
            console.log(error);
            return false;
        }
    }

    public async pressClaimsButton(){
        try {
            await this.driverService.waitUntilElementVisible(this.btnClaims);
            await this.driverService.click(this.btnClaims);
            return true;
        } catch (error) {
            console.log('pressClaimsButton');
            console.log(error);
            return false;
        }
    }

    public async pressRewardsButton(){
        try {
            await this.driverService.waitUntilElementVisible(this.btnRewards);
            await this.driverService.click(this.btnRewards);
            return true;
        } catch (error) {
            console.log('pressRewardsButton');
            console.log(error);
            return false;
        }
    }

    public async getItemVavigationBarActive(){
        try {
            await this.driverService.waitUntilElementVisible(this.btnItemNavigationActive);
            let result = await this.driverService.getText(this.btnItemNavigationActive);
            return result;
        } catch (error) {
            console.log('getItemVavigationBarActive');
            console.log(error);
            return "";
        }
    }
}