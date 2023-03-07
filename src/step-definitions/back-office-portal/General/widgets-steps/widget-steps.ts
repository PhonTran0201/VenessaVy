import { Before, Then, When } from "@cucumber/cucumber";
import { AccountTabSummary } from "../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-summary/AccountTabSummary";
import { AccountForm } from "../../../../page-objects/back-office-portal/general/account/account-forms/AccountForm";
import { AppEntityWidgets } from "../../../../page-objects/back-office-portal/general/app-entity-widgets/AppEntityWidgets";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { AccountTabHistoryListGuarantee } from "../../../../page-objects/back-office-portal/guarantee/account/account-details/tabs/account-history/AccountTabHistoryListGuarantee";
import { convertPathFileDataToDataRegression, getCurrentDateTime, logFailTestcase } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { UserProfileInfo } from "../../../../shared/user-profile/UserProfileInfo";


const loader = require("csv-load-sync");
let appEntityWidgets: AppEntityWidgets;
let accountTabSummary: AccountTabSummary;
let globalPageObject: GlobalPageObject;
let accountTabHistoryListGuarantee: AccountTabHistoryListGuarantee;

Before(async function () {
    const context: ICommonContext = this.context;
    appEntityWidgets = new AppEntityWidgets(context.driverService);
    accountTabSummary = new AccountTabSummary(context.driverService);
    globalPageObject = new GlobalPageObject(context.driverService);
    accountTabHistoryListGuarantee = new AccountTabHistoryListGuarantee(context.driverService);
});

//#region Sale widgets
When("User opens the first sale on sale widget", async () => {
    let temp = await appEntityWidgets.openSaleDetailOnSaleWidgetByRow();
    logFailTestcase(temp, "Open first sale on Sale widget failed!");
});

When("User opens the sale on sale widget {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const SaleName = row.SaleName
    let temp = await appEntityWidgets.openSaleDetailOnSaleWidgetByName(SaleName);
    logFailTestcase(temp, `Open sale "${SaleName}" on sale widget failed!`);
});

Then("User verifies info on Sales widget of the account detail {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const Stage = row.Stage;
    const Product = row.Product;
    const SaleName = row.SaleName;
    const CreateDate = getCurrentDateTime();
    let temp = true;
    
    temp = await accountTabSummary.selectSummaryViewLayout("Summary");
    // logFailTestcase(temp, `Select layout for summary tab failed!`);
    await globalPageObject.waitForProgressBarLoaded_v2();

    for (let i = 1; i <= 4; i++) {
        if (SaleName && await appEntityWidgets.validateCreatedDateOnSaleWidget(CreateDate), i) {
            if (Product) {
                temp = await appEntityWidgets.validateProductOnSaleWidget(Product, i);
                logFailTestcase(temp, 'validate Product Sales widget of the account detail failed!')
            }
            if (Stage) {
                temp = await appEntityWidgets.validateStageOnSaleWidget(Stage, i);
                logFailTestcase(temp, 'validate Stage Sales widget of the account detail failed!')
            }
            if (SaleName) {
                temp = await appEntityWidgets.validateSaleNameOnSaleWidget(SaleName, i);
                logFailTestcase(temp, 'validate Sale Name Sales widget of the account detail failed!')
            }
            break;
        }
        if (i == 4) {
            logFailTestcase(temp, 'validate CreateDate Sale widget of the account detail failed!');
        }
    }

});

Then("User verifies info on History widget of the account detail {string}", async (filename) => {
    let temp = true;
    const rows = loader(convertPathFileDataToDataRegression(filename));
    await globalPageObject.waitForProgressBarLoaded_v2(3000);
    await accountTabSummary.pressRefreshLayoutButton();
    await globalPageObject.waitForProgressBarLoaded_v2();
    const UpdatedBy = UserProfileInfo.getDisplayName();

    for (let i = 0; i < rows.length; i++) {
        const EventLogs = rows[i].EventLogs;
        const EventDescription = rows[i].EventDescription;
        const CreatedDate = getCurrentDateTime();
        for (let j = 1; j <= 5; j++) {

            if (await appEntityWidgets.validateEventLogsOnHistoryWidget(EventLogs, j)) {

                temp = await appEntityWidgets.validateEventDescriptionOnHistoryWidget(EventDescription, j);
                logFailTestcase(temp, 'validate EventDescription on History widget of the account detail failed!');

                temp = await appEntityWidgets.validateCreatedDateOnHistoryWidget(CreatedDate, j);
                logFailTestcase(temp, 'validate CreatedDate on History widget of the account detail failed!');

                temp = await appEntityWidgets.validateUpdatedByOnHistoryWidget(UpdatedBy, j);
                logFailTestcase(temp, 'validate CreateBy on History widget of the account detail failed!');

                break;

            } else if (j == 5) {
                logFailTestcase(false, 'Cant not find the event on History widget');
                break;
            }
        }
    }

});


Then("User verifies info on Customer Score widget of the account detail {string}", async (filename) => {
    let temp = true;
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const CreditScore = row.CreditScore;
    const CustomerScore = row.CustomerScore;

    await globalPageObject.navigateToSubSummary();
    await globalPageObject.waitForSeconds(2000);

    temp = await appEntityWidgets.validateCreditScoreOnCustomerScoreWidget(CreditScore);
    logFailTestcase(temp, 'Incorrect Credit score on Customer widget!');

    temp = await appEntityWidgets.validateCustomerScoreOnCustomerScoreWidget(CustomerScore);
    logFailTestcase(temp, 'Incorrect Customer Score on Customer widget!')

});

Then("User verifies info on Cases widget of the account detail {string}", async(filename)=>{
    let temp = true;
    const rows = loader(convertPathFileDataToDataRegression(filename))[0];
    const CaseTitle = rows.CaseTitle;
    const CreatedDate = getCurrentDateTime();

    temp = await appEntityWidgets.validateCaseTitleOnCaseWidget(CaseTitle);
    logFailTestcase(temp, 'Incorrect CaseTitle on Case widget!');

    temp = await appEntityWidgets.validateCreatedDateOnCaseWidget(CreatedDate);
    logFailTestcase(temp, 'Incorrect CreatedDate on Case widget!');

});





//#endregion