import { Given, Then, When } from "@cucumber/cucumber";
import { PageLoadStrategy } from "selenium-webdriver/lib/capabilities";
import { PageFactory } from "../../../../page-objects/PageFactory";
import { convertPathFileDataToDataRegression, logFailTestcase } from "../../../../shared/functions";

const PageSettings = PageFactory.getInstance().createTelephoneSettingsPage();
const PageObject = PageFactory.getInstance().createGlobalPageObjectPage();
const loader = require("csv-load-sync");

Given("User navigates to Telephone Settings", async function () {
    let temp = await PageObject.navigateToMainModuleConfiguration();
    logFailTestcase(temp, "Navigate to Module configuration failed!");

    temp = await PageObject.selectDomainCardAtGlobalSetting("SEAMLESS ENGAGE");
    logFailTestcase(temp, `Select "SEAMLESS ENGAGE" failed!`);

    temp = await await PageObject.pressSettingAtDomainDetailItemInDomainCard("Telephony");
    logFailTestcase(temp, `Press "Setting" at Telephony domain detail failed!`);
});

When(`User verifies {string} tab is invisible`, async (tabName) => {
    await PageObject.waitForProgressBarLoaded_v2();
    await PageObject.waitForProgressBarLoaded_v2();
    let temp = await PageSettings.verifyTabIsVisibleOrNot(tabName, false);
    logFailTestcase(temp, `Verify '${tabName}' tab is invisible failed!`);
});

When(`User verifies {string} tab is visible`, async (tabName) => {
    await PageObject.waitForProgressBarLoaded_v2();
    await PageObject.waitForProgressBarLoaded_v2();
    let temp = await PageSettings.verifyTabIsVisibleOrNot(tabName, true);
    logFailTestcase(temp, `Verify '${tabName}' tab is visible failed!`)
});

Then(`User verifies Call Center menu is invisible`, async () => {
    let temp = await PageObject.verifyCommunicationButtonMenuIsDisabled();
    logFailTestcase(temp);
});
Given(`User navigates to Call Result tab`, async () => {
    let temp = await PageSettings.navigatesToCallResultTab();
    logFailTestcase(temp);
});

When(`User presses Create button on Call Result list`, async () => {
    let temp = await PageObject.pressCreateTab();
    logFailTestcase(temp);
});

When(`User presses edit the first Call Result on the list`, async () => {
    let temp = await PageSettings.editCallResultByRow(0);
    logFailTestcase(temp);
});

When(`User inputs valid data to Call Result form {string}`, async (fileName) => {
    const row = loader(convertPathFileDataToDataRegression(fileName))[0];
    const Order = row.Order;
    const Value = row.Value;
    const Name = row.Name;
    const Active = row.Active;

    let ActiveTicked = Active.localeCompare("Yes") == 0 ? true : false;
    let temp = await PageSettings.inputOrder(Order);
    logFailTestcase(temp);

    temp = await PageSettings.inputValue(Value);
    logFailTestcase(temp);

    temp = await PageSettings.inputName(Name);
    logFailTestcase(temp);

    temp = await PageSettings.tickActiveCheckbox(ActiveTicked);
    logFailTestcase(temp);
});

Then(`System shows correct Call Result information on the list {string}`, async (fileName) => {
    const row = loader(convertPathFileDataToDataRegression(fileName))[0];
    const Order = row.Order;
    const Value = row.Value;
    const Name = row.Name;
    const Active = row.Active;

    let ActiveTicked = Active.localeCompare("Yes") == 0 ? true : false;

    await PageObject.reloadTable(4000);
    for (let i = 0; i <= 9; i++) {
        if (await PageSettings.validateOder(Order, i) && await PageSettings.validateName(Name, i)) {
            let temp = await PageSettings.validateName(Name, i);
            logFailTestcase(temp);

            temp = await PageSettings.validateValue(Value, i);
            logFailTestcase(temp);

            temp = await PageSettings.validateActiveCheckbox(ActiveTicked, i);
            logFailTestcase(temp);
            break;
        } else if (i == 9) {
            logFailTestcase(false, `can not find the call result!`);
        }
    }
});
