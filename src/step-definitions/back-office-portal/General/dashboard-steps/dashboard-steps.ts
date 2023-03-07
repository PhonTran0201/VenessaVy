import { SaleDetailsLeftSide } from './../../../../page-objects/back-office-portal/general/sale/sale-details/left-side/SaleDetailsLeftSide';
import { AccountTabPolicyDetails } from './../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-policy/AccountTabPolicyDetails';
import { AccountTabQuoteCreateQuote } from './../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-quote/AccountTabQuoteCreateQuote';
import { LeadDetailsLeftSide } from './../../../../page-objects/back-office-portal/general/lead/lead-details/left-side/LeadDetailsLeftSide';
import { CaseDetailsLeftSide } from './../../../../page-objects/back-office-portal/general/case/case-details/left-side/CaseDetailsLeftSide';
import { Before, Given, Then, When } from "@cucumber/cucumber";
import { logFailTestcase, convertPathFileDataToDataRegression } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { Dashboard } from "../../../../page-objects/general/dashboard/Dashboard";
import { DashboardLayout } from "../../../../page-objects/general/dashboard/DashboardLayout"
import { ClaimDetailsLeftSideInsurance } from "../../../../page-objects/back-office-portal/insurance/claim/claim-details/left-side/ClaimDetailsLeftSideInsurance";
import { AccountDetailsLeftSide } from "../../../../page-objects/back-office-portal/general/account/account-details/left-side/AccountDetailsLeftSide";


const loader = require("csv-load-sync");

let globalPageObject: GlobalPageObject;
let dashboard: Dashboard;
let dashboardLayout: DashboardLayout;
let claimDetailsLeftSideInsurance: ClaimDetailsLeftSideInsurance;
let accountDetailsLeftSide: AccountDetailsLeftSide
let caseDetailsLeftSide: CaseDetailsLeftSide
let leadDetailsLeftSide: LeadDetailsLeftSide
let accountTabQuoteCreateQuote: AccountTabQuoteCreateQuote
let accountTabPolicyDetails: AccountTabPolicyDetails
let saleDetailsLeftSide: SaleDetailsLeftSide

Before(async function () {
    const context: ICommonContext = this.context;
    globalPageObject = new GlobalPageObject(context.driverService);
    dashboard = new Dashboard(context.driverService);
    dashboardLayout = new DashboardLayout(context.driverService);
    claimDetailsLeftSideInsurance = new ClaimDetailsLeftSideInsurance(context.driverService);
    accountDetailsLeftSide = new AccountDetailsLeftSide(context.driverService);
    caseDetailsLeftSide = new CaseDetailsLeftSide(context.driverService)
    leadDetailsLeftSide = new LeadDetailsLeftSide(context.driverService)
    accountTabQuoteCreateQuote = new AccountTabQuoteCreateQuote(context.driverService)
    accountTabPolicyDetails = new AccountTabPolicyDetails(context.driverService)
    saleDetailsLeftSide = new SaleDetailsLeftSide(context.driverService)
});

Given(`User navigates to Dashboard page`, async () => {
    let temp = await globalPageObject.navigateToMainDashBoard();
    logFailTestcase(temp, `Navigate to Dashboard page failed`);
});

When(`User creates a new dashboard`, async () => {
    let temp = await dashboard.createNewDashboard();
    logFailTestcase(temp, "Fail to create a new dashboard")
})

When(`User adds a layout to the dashboard {string}`, async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const itemSlot = rows[0].ItemSlot
    const ratio = rows[0].Ratio
    let temp = await dashboardLayout.addDashboardLayout(itemSlot, ratio);
    logFailTestcase(temp, "Fail to add a new layout")
})

When(`User adds items to the dashboard {string}`, async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const items = rows[0].Items.slice(1, -1).split(';');
    let itemsXpath: any = []
    for (const element of items) {
        let tempXpath = await dashboardLayout.generateWidgetXpath(element);
        itemsXpath.push(tempXpath)
    }
    let temp = await dashboardLayout.addItemsToLayout(itemsXpath);
    logFailTestcase(temp, "Fail to add items to the layout")
})

Then(`User saves the new dashboard {string}`, async (filename) => {
    const rows = loader(filename);
    const dashboardName = rows[0].DashboardName;
    const dashboardType = rows[0].DashboardType;
    let temp = await dashboardLayout.saveDashboard(dashboardName, dashboardType)
    logFailTestcase(temp, "Failed to save the new dashboard")
})

Then('System shows the new dashboard {string}', async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const dashboardName = rows[0].DashboardName;
    const dashboardType = rows[0].DashboardType;
    let temp = await dashboard.verifySavedDashboard(dashboardName, dashboardType)
    logFailTestcase(temp, "Failed to verify the saved dashboard")
})

Then(`User deletes the new dashboard`, async () => {
    let temp = await dashboard.deleteCurrentDashboard();
    logFailTestcase(temp, "Failed to delete the current dashboard")
})

Then('System no longer shows the new dashboard {string}', async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const dashboardName = rows[0].DashboardName;
    const dashboardType = rows[0].DashboardType;
    let temp = await dashboard.verifySavedDashboard(dashboardName, dashboardType)
    logFailTestcase(!temp, "Failed to verify the deleted dashboard")
})

When('User accesses first item on each widget {string}', async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const items = rows[0].Items.slice(1, -1).split(';');
    for (const element of items) {
        let temp1 = await dashboard.getFirstItemNameOnWidget(element);
        logFailTestcase(temp1.length > 0, `Failed to get first item name of ${element}`)
        let temp = await dashboard.enterFirstItemOfWidget(element)
        logFailTestcase(temp, `Failed to enter first item of ${element}`)

        switch (element) {
            case "Last reported claims":
            case "Claims":
                temp = await claimDetailsLeftSideInsurance.validateValueClaimDetail(temp1, "Reference")
                logFailTestcase(temp, `Fail to verify ${element}`)
                break;

            case "Customer":
                temp = await accountDetailsLeftSide.assertTitleOfOpeningAccountTab(temp1);
                logFailTestcase(temp, `Fail to verify ${element}`)
                break;

            case "Cases":
                temp = await caseDetailsLeftSide.assertTitleOfOpeningCaseTab(temp1)
                logFailTestcase(temp, `Fail to verify ${element}`)
                break;

            case "Lead":
                temp = await leadDetailsLeftSide.validateLeadLeftSideDetail(temp1, "Name")
                logFailTestcase(temp, `Fail to verify ${element}`)
                break;

            case "Quotes":
                temp = await accountTabQuoteCreateQuote.validateQuoteRef(temp1, true)
                logFailTestcase(temp, `Fail to verifiy ${element}`)
                break;

            case "Policies":
                temp = await accountTabPolicyDetails.checkPolicyDetailIsOpening(temp1)
                logFailTestcase(temp, `Fail to verifiy ${element}`)
                break;

            case "Sales":
                temp = await saleDetailsLeftSide.validateValueSaleDetail(temp1, "Sales Name")
                logFailTestcase(temp, `Fail to verify ${element}`)
                break

        }

        temp = await globalPageObject.navigateToMainDashBoard();
        logFailTestcase(temp, `Navigate to Dashboard page failed`);
    }

})

