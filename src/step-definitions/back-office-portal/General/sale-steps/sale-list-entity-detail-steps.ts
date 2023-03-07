import { Before, When } from "@cucumber/cucumber";
import { AccountTabSaleList } from "../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-sale/AccountTabSaleList";
import { AppEntityWidgets } from "../../../../page-objects/back-office-portal/general/app-entity-widgets/AppEntityWidgets";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { convertPathFileDataToDataRegression, getCurrentDateTime, logFailTestcase, logInfoMessage, reformatSalesStage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";


const loader = require("csv-load-sync");

let accountTabSaleList: AccountTabSaleList;
let appEntityWidgets: AppEntityWidgets;
let globalPageObject: GlobalPageObject;
Before(async function () {
    const context: ICommonContext = this.context;
    accountTabSaleList = new AccountTabSaleList(context.driverService);
    appEntityWidgets = new AppEntityWidgets(context.driverService);
    globalPageObject = new GlobalPageObject(context.driverService);
});

When("System shows new sale on sale list in entity detail {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const row = rows[0];

    const SaleName = row.SaleName;
    const Pipeline = row.Pipeline;
    const Stage = row.Stage;
    const SalesRep = row.SalesRep;
    const Amount = row.Amount;
    const ClosedDate = row.ClosedDate;
    const LastUpdated = getCurrentDateTime();

    await globalPageObject.reloadTable(5000);
    let temp = true;
    if (SaleName) {
        temp = await accountTabSaleList.validateValueSaleList(SaleName, "Sales", 1);
        logFailTestcase(temp, `Sales name "${SaleName}" does not match to result!`);
    }
    if (Pipeline) {
        temp = await accountTabSaleList.validateValueSaleList(Pipeline, "Pipeline", 1);
        logFailTestcase(temp, `Pipeline "${Pipeline}" does not match to result!`);
    }
    if (Stage) {
        temp = await accountTabSaleList.validateValueSaleList(reformatSalesStage(Stage), "Stage", 1);
        logFailTestcase(temp, `Sale stage "${Stage}" does not match to result!`);
    }
    if (SalesRep) {
        temp = await accountTabSaleList.validateValueSaleList(SalesRep, "Sales rep.", 1);
        logFailTestcase(temp, `Sale Rep "${SalesRep}" does not match to result!`);
    }
    if (Amount) {
        temp = await accountTabSaleList.validateValueSaleList(Amount, "Amount", 1);
        logFailTestcase(temp, `Total Deal Amount "${Amount}" does not match to result!`);
    }

    if (ClosedDate) {
        temp = await accountTabSaleList.validateValueSaleList(ClosedDate, "Close Date", 1);
        logFailTestcase(temp, `ClosedDate "${ClosedDate}" does not match to result!`);
    }
    if (LastUpdated) {
        temp = await accountTabSaleList.validateValueSaleList(LastUpdated, "Last Updated", 1);
    } logFailTestcase(temp, `LastUpdated "${LastUpdated}" does not match to result!`);

});

When("System shows new sale on sale widget in entity detail {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const row = rows[0];

    const SaleName = row.SaleName;
    const Product = row.Product;
    const Stage = row.Stage;
    const LastUpdated = getCurrentDateTime();
    let temp = true;

    logInfoMessage("Navigate to summary tab");
    temp = await globalPageObject.navigateToSubSummary();
    logFailTestcase(temp, "Navigate to Summary tab failed!");
    await globalPageObject.waitForProgressBarLoaded_v2(500);
    if(SaleName){
        temp = await appEntityWidgets.validateSaleNameOnSaleWidget(SaleName);
        logFailTestcase(temp);
    }
    if(Product){
        temp = await appEntityWidgets.validateProductOnSaleWidget(Product);
        logFailTestcase(temp);
    }
    if(LastUpdated){
        temp = await appEntityWidgets.validateCreatedDateOnSaleWidget(LastUpdated);
        logFailTestcase(temp);
    }
    if(Stage){
        temp = await appEntityWidgets.validateStageOnSaleWidget(Stage);
        logFailTestcase(temp);
    }
});
