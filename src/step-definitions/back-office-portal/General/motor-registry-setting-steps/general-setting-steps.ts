import { When } from "@cucumber/cucumber";
import { PageFactory } from "../../../../page-objects/PageFactory";
import { logFailTestcase } from "../../../../shared/functions";
const globalPageObject = PageFactory.getInstance().createGlobalPageObjectPage();
const motorGeneralSetting = PageFactory.getInstance().createMotorGeneralSettingsPage();
When("User navigates to Motor Registry Settings", async () => {
   let temp = await globalPageObject.navigateToMainMotorRegistrySetting();
   logFailTestcase(temp, `Navigate to Motor Registry Setting failed!`);
});

When("User selects {string} Integration Provider at Motor Registry Settings", async (option) => {
   let temp = await motorGeneralSetting.tickCheckIntegrationProviderOption(option);
   logFailTestcase(temp, `Tick option "${option}" Integration Provider failed!`);
});