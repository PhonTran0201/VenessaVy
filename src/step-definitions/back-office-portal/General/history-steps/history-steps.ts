import { Before, Given } from "@cucumber/cucumber";
import { AccountTabHistoryList } from "../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-history/AccountTabHistoryList";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { logFailTestcase } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";


let accountTabHistoryList: AccountTabHistoryList;
let globalPageObject: GlobalPageObject;
Before(async function () {
    const context: ICommonContext = this.context;
    accountTabHistoryList = new AccountTabHistoryList(context.driverService);
    globalPageObject = new GlobalPageObject(context.driverService);
});


Given("User is on History list", async function () {
    let temp = await globalPageObject.navigateToSubHistory();
    logFailTestcase(temp, `Navigates to History tab failed!`);
});