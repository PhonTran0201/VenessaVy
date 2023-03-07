import { Given, Then, When } from "@cucumber/cucumber";
import { SeleniumWebDriverService } from "../../../../core/selenium-webdriver.service";
import { GlobalConfigColumn } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalConfigColumn";
import { PageFactory } from "../../../../page-objects/PageFactory";
import { getCurrentDateTime, getLineInFileTxt, logFailTestcase } from "../../../../shared/functions";


const PageObject = PageFactory.getInstance().createGlobalPageObjectPage();
const PageObjectPagination = PageFactory.getInstance().createGlobalPaginationPage();
const PageSetting = PageFactory.getInstance().createAccountSettingPage();
const PageHistoryTab = PageFactory.getInstance().createAccountTabHistoryList();
const PageDetailLeftSide = PageFactory.getInstance().createAccountDetailsLeftSidePage();
const PageGlobalSortTable = PageFactory.getInstance().createGlobalSortTablePage();
const PagePolicyListInsurancePage = PageFactory.getInstance().createPolicyListInsurancePage();
const PageGlobalBrowser = PageFactory.getInstance().createGlobalBrowserWindowHandlePage();
const PagePolicyDetails = PageFactory.getInstance().createPolicyDetailsPage();

let driverService = SeleniumWebDriverService.getInstance();
let CustomerLifetime = "";


const loader = require("csv-load-sync");

Given("User navigates to Account Settings", async function () {
    let temp = await PageObject.navigateToMainModuleConfiguration();
    logFailTestcase(temp, "Navigate to Module configuration failed!");

    temp = await PageObject.selectDomainCardAtGlobalSetting("SEAMLESS SERVICE");
    logFailTestcase(temp, `Select "SEAMLESS SERVICE" failed!`);

    temp = await await PageObject.pressSettingAtDomainDetailItemInDomainCard("Accounts");
    logFailTestcase(temp, `Press "Setting" at Accounts domain detail failed!`);
});

When(`User selects {string} Customer Lifetime option`, async (option) => {
    let temp = await PageSetting.chooseShowCustomerLifetime(option);
    logFailTestcase(temp, `choose Show Customer Life time failed!`);
    await PageSetting.saveSettingForm();

    temp = await PageSetting.validateCustomerLifetime(option);
    logFailTestcase(temp, `Incorrect Customer Lifetime option!`);
});

Then(`User verifies Customer Lifetime is shown correctly when {string} is selected`, async (option) => {
    await PageGlobalBrowser.refreshPage();
    await PageGlobalBrowser.refreshPage();
    await PageGlobalBrowser.refreshPage();
    if (option.localeCompare(`Duration from Customer created date`) === 0) {
        let temp = await PageObject.navigateToSubHistory();
        await PageObject.waitForProgressBarLoaded_v2();
        await PageObject.waitForProgressBarLoaded_v2();
        await PageObject.waitForProgressBarLoaded_v2();
        await PageObject.waitForProgressBarLoaded_v2();
        logFailTestcase(temp, `Navigates to History tab failed!`);

        await PageObject.waitForProgressBarLoaded_v2();

        // temp = await PageHistoryTab.inputSearchKeyword("Customer created");
        // logFailTestcase(temp, `input Search Keyword failed!`);

        // temp = await PageHistoryTab.pressSearchButton();
        // logFailTestcase(temp, `Search Keyword failed!`);

        // await PageObject.reloadTable();

        temp = await PageObjectPagination.pressDoubleRightButtonOnSubList();
        logFailTestcase(temp, `press Double Right Button On Sub List failed`);

        await PageObject.reloadTable(3000);
        let timeStamp;
        for(let i = 1; i <=10 ; i ++){
            if(await PageHistoryTab.validateTypeOnHistoryList(`Customer created`,i)){
                timeStamp = await PageHistoryTab.getValueHistoryList(`Timestamp`);
                logFailTestcase(temp, `get Value History List column timestamp failed! `);
                break;
            }
        }
        CustomerLifetime = await PageDetailLeftSide.getDifferenceInDaysLifetime(timeStamp, getCurrentDateTime());

    } else if (option.localeCompare(`Duration from First Policy start date`) === 0) {
        let temp = await PageObject.navigateToSubPolicies();
        logFailTestcase(temp, `Navigates to Policies tab failed!`);

        await PageObject.waitForProgressBarLoaded_v2();

        //#region Check xem cột Created date có bị set default là untick hay không
        // Nếu untick thì mình tick
        const globalConfigColumn = new GlobalConfigColumn(SeleniumWebDriverService.getInstance());
        temp = await globalConfigColumn.pressConfigColumnButtonAtSubTab();
        logFailTestcase(temp, `Press config column at Policy list failed!`);

        temp = await globalConfigColumn.isConfigColumnItemCheckingByName("Created");
        if(!temp){
            temp = await globalConfigColumn.checkConfigColumnItemByName("Created");
            logFailTestcase(temp, `Tick "Created" at config column failed!`);
            await globalConfigColumn.pressConfigColumnButtonAtSubTab();
        }
        //#endregion

        temp = await PageGlobalSortTable.pressSortUpColumnAtSubList("Created");
        logFailTestcase(temp, `Press sort up at column "Created" failed!`);

        temp = await PagePolicyListInsurancePage.openFirstPolicy();;
        logFailTestcase(temp, `Open the first policy failed!`);

        await PageObject.waitForProgressBarLoaded_v2();
     
        CustomerLifetime = await PageDetailLeftSide.getDifferenceInDaysLifetime(await PagePolicyDetails.getEffectiveDatePolicyInfo(), getCurrentDateTime());
    } else {
        logFailTestcase(false, `can not find the option has name: '${option}'!`);
    }
    let temp = await PageDetailLeftSide.validateCustomerLifetime(CustomerLifetime);
    logFailTestcase(temp, 'validate Customer Lifetime failed!');
});