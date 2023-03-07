import { Before, Given } from "@cucumber/cucumber";
import { AccountDetailsLeftSide } from "../../../../page-objects/back-office-portal/general/account/account-details/left-side/AccountDetailsLeftSide";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { logFailTestcase } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";


const loader = require("csv-load-sync");

let accountDetailsLeftSide: AccountDetailsLeftSide;
let globalPageObject: GlobalPageObject;
Before(async function () {
    const context: ICommonContext = this.context;
    accountDetailsLeftSide = new AccountDetailsLeftSide(context.driverService);
    globalPageObject = new GlobalPageObject(context.driverService);
});

Given("User clicks on Compose Email button in account detail", async () => {
    let temp = await accountDetailsLeftSide.clickComposeEmailAccountButton();
    logFailTestcase(temp, "click Compose Email Button on Account detail failed!");
});

Given("User is on Emails list", async () =>{
    let temp = await globalPageObject.navigateToSubEmails();
    logFailTestcase(temp, "Click on Emails tab failed!");
    await globalPageObject.waitForProgressBarLoaded_v2(500);
});