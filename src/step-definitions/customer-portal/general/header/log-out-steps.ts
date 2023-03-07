import { Before, Then } from "@cucumber/cucumber";
import { SeleniumWebDriverService } from "../../../../core/selenium-webdriver.service";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { UserProfile } from "../../../../page-objects/customer-portal/general/GlobalPageObject/UserProfile";
import { AppNavigationCPVarsam } from "../../../../page-objects/customer-portal/varsam/app-header/app-navigation/AppNavigationCPVarsam";
import { AppTopRightMenuCPVarsam } from "../../../../page-objects/customer-portal/varsam/app-header/app-top-right-menu/AppTopRightMenuCPVarsam";
import { logFailMessage, logFailTestcase } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { scenarioTags } from "../../../../shared/variables";


let userProfile: UserProfile;
let globalPageObject: GlobalPageObject;
Before(async function () {
    const context: ICommonContext = this.context;
    userProfile = new UserProfile(context.driverService);
    globalPageObject = new GlobalPageObject(context.driverService);
});

Then("User logs out if already logged in on CustomerPortal", async function () {
    let temp = true;
    if(scenarioTags.has("@CustomerPortalVarsam")){
        const appTopRightMenuCPVarsam: AppTopRightMenuCPVarsam = new AppTopRightMenuCPVarsam(SeleniumWebDriverService.getInstance());
        temp = await appTopRightMenuCPVarsam.pressLogoutButton();
        logFailTestcase(temp, `Press Logout button failed!`);
        return;
    }

    temp = await userProfile.navigateToUserProfileDropdown();
    logFailTestcase(temp, "navigate To User Profile Dropdown failed!");

    temp = await userProfile.clickLogoutButton();
    logFailTestcase(temp, "click Logout Button failed!");

    await globalPageObject.waitForSeconds(3000);

});