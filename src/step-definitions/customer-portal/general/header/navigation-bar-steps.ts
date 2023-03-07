import { Before, Given, When } from "@cucumber/cucumber";
import { AppNavigationCP } from "../../../../page-objects/customer-portal/general/app-header/app-navigation/AppNavigationCP";
import { AppTopRightMenuCP } from "../../../../page-objects/customer-portal/general/app-header/app-top-right-menu/AppTopRightMenuCP";
import { AppTopRightMenuCPVarsam } from "../../../../page-objects/customer-portal/varsam/app-header/app-top-right-menu/AppTopRightMenuCPVarsam";
import { logFailTestcase } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { scenarioTags } from "../../../../shared/variables";

let appNavigationCP: AppNavigationCP;
let appTopRightMenuCP: AppTopRightMenuCP;

Before(async function () {
    const context: ICommonContext = this.context;
    appNavigationCP = new AppNavigationCP(context.driverService);
    appTopRightMenuCP = new AppTopRightMenuCP(context.driverService);
    if (scenarioTags.has("@CustomerPortalVarsam")) {
        appTopRightMenuCP = new AppTopRightMenuCPVarsam(context.driverService);
    }
});

Given("User presses {string} navigation bar menu on CustomerPortal", async function (Name) {
    let temp = true;
    switch (Name) {
        case "Frame agreements":
            temp = await appNavigationCP.pressFrameAgreementsButton();
            logFailTestcase(temp, 'press Frame Agreements Button failed!');
            break;
        case "Applications":
            temp = await appNavigationCP.pressApplicationsButton();
            logFailTestcase(temp, 'press Applications Button failed!');
            break;
        case "Guarantees":
            temp = await appNavigationCP.pressGuaranteesButton();
            logFailTestcase(temp, 'press Guarantees Button failed!');
            break;
        case "Reports":
            temp = await appNavigationCP.pressReportsButton();
            logFailTestcase(temp, 'press Reports Button failed!');
            break;
        case "My Profile":
            temp = await appNavigationCP.pressMyProfileButton();
            logFailTestcase(temp, 'press My Profile Button failed!');
            break;
        case "Claims":
            temp = await appNavigationCP.pressClaimsButton();
            logFailTestcase(temp, 'press Claims Button failed!');
            break;
        case "Rewards":
            temp = await appNavigationCP.pressRewardsButton();
            logFailTestcase(temp, 'press Rewards Button failed!');
            break;
        default:
            logFailTestcase(false, `Button "${Name}" has not been implemented yet!`);
            break;
    }
});

When("User switches to {string} language at top right menu on CustomerPortal", async (language) =>{
    let temp = await appTopRightMenuCP.selectLanguage(language);
    logFailTestcase(temp, `Select "${language}" language failed!"`);
});