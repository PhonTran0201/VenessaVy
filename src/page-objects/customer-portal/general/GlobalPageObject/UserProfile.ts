import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../shared/functions";


/**
 * GlobalItemPage: Item/Page and Total records
 */
export class UserProfile {
    constructor(protected driverService: SeleniumWebDriverService) { }

   protected dropdownUserProfile = By.xpath("//app-header//li[contains(@class, 'user-profile')]//a");
   protected btnLogout = By.xpath("//app-header//li[contains(@class, 'user-profile')]//button[./span[text()='Log out']]");

   public async navigateToUserProfileDropdown(){
       try {
           await this.driverService.waitUntilElementLoaded(this.dropdownUserProfile);
           await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
           await this.driverService.click(this.dropdownUserProfile);
           return true;
       } catch (error) {
           console.log("navigateToUserProfileDropdown");
           console.log(error);
           return false;
       }
   }
   public async clickLogoutButton(){
    try {
        await this.driverService.waitUntilElementLoaded(this.btnLogout);
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
        await this.driverService.click(this.btnLogout);
        return true;
    } catch (error) {
        console.log("clickLogoutButton");
        console.log(error);
        return false;
    }
}

}