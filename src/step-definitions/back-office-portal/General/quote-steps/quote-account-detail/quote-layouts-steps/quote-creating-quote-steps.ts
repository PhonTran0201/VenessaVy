import { Before, Given, When } from "@cucumber/cucumber";
import { AccountTabQuoteCreatingQuote } from "../../../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-quote/AccountTabQuoteCreatingQuote";
import { GlobalConfirmationForm } from "../../../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalConfirmationForm";
import { GlobalPageObject } from "../../../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { SalesPersonListForm } from "../../../../../../page-objects/back-office-portal/general/quote/sales-person-list-form/SalesPersonListForm";
import { convertPathFileDataToDataRegression, logFailTestcase, logInfoMessage } from "../../../../../../shared/functions";
import { ICommonContext } from "../../../../../../shared/interfaces";
import { UserProfileInfo } from "../../../../../../shared/user-profile/UserProfileInfo";
import { getValueDataOfDataTestExecution, pushObjectToDataArrayWithUniqueKey } from "../../../../../../storage-data/functions/data-test-execution";


let accountTabQuoteCreatingQuote: AccountTabQuoteCreatingQuote;
let salesPersonListForm: SalesPersonListForm;
let globalPageObject: GlobalPageObject;
let globalConfirmationForm: GlobalConfirmationForm;
const loader = require("csv-load-sync");

Before(async function () {
    const context: ICommonContext = this.context;
    accountTabQuoteCreatingQuote = new AccountTabQuoteCreatingQuote(context.driverService);
    salesPersonListForm = new SalesPersonListForm(context.driverService);
    globalPageObject = new GlobalPageObject(context.driverService);
    globalConfirmationForm = new GlobalConfirmationForm(context.driverService);
});

Given("User presses Accept button on Creating Quote form", async function () {
    await globalPageObject.waitForProgressBarLoaded_v2();
    pushObjectToDataArrayWithUniqueKey("QuoteReference", await accountTabQuoteCreatingQuote.getQuoteRef());
    let temp = await accountTabQuoteCreatingQuote.pressAcceptButtonOnFooter();
    logFailTestcase(temp, `Press Accept button failed!`);
    await globalPageObject.waitForProgressBarLoaded_v2(3000);
    temp = await globalPageObject.checkToastSuccessExistWithMessage("Quote completed at version");
    logFailTestcase(temp, `Toast message "Quote completed at version" is not shown!`);
});
Given("User presses Back To Quotes List button on Creating Quote form", async function () {
    let temp = await accountTabQuoteCreatingQuote.pressBackToQuoteListButtonOnFooter();
    logFailTestcase(temp, `Press Back To Quotes List button failed!`);
});
Given("User presses Back button on Creating Quote form", async function () {
    let temp = await accountTabQuoteCreatingQuote.pressBackButtonOnFooter();
    logFailTestcase(temp, `Press Back button failed!`);
});

Given("User presses Requote button on Creating Quote form", async function () {
    let temp = await accountTabQuoteCreatingQuote.pressRequoteButtonOnHeader();
    logFailTestcase(temp, `Press Back button failed!`);
});

Given("User presses Approve button on Creating Quote form", async function () {
    pushObjectToDataArrayWithUniqueKey("QuoteReference", await accountTabQuoteCreatingQuote.getQuoteRef());
    let temp = await accountTabQuoteCreatingQuote.pressApproveButtonOnFooter();
    logFailTestcase(temp, `Press Approve button failed!`);
});

Given("User presses Calculate button at Premium section on Creating Quote form", async function () {
    let temp = await accountTabQuoteCreatingQuote.pressCalculateButton_Premium();
    logFailTestcase(temp, `Press Calculate Premium button failed!`);
});

Given("User verifies info at Purchase Constraints on Creating Quote form {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    let temp = true;
    for (let i = 0; i < rows.length; i++) {
        logInfoMessage(`Checking Purchase constraint at line ${i + 1}`)
        const ConstraintPurchaseConstraint = rows[i].ConstraintPurchaseConstraint;
        const ValuePurchaseConstraint = rows[i].ValuePurchaseConstraint;
        const ApprovedPurchaseConstraint = rows[i].ApprovedPurchaseConstraint;

        temp = await accountTabQuoteCreatingQuote.validateConstraint_PurchaseConstraint(ConstraintPurchaseConstraint);
        logFailTestcase(temp, `Incorrect ConstraintPurchaseConstraint`);

        temp = await accountTabQuoteCreatingQuote.validateValue_PurchaseConstraint(ValuePurchaseConstraint);
        logFailTestcase(temp, `Incorrect ValuePurchaseConstraint`);

        temp = await accountTabQuoteCreatingQuote.validateApproved_PurchaseConstraint(ApprovedPurchaseConstraint);
        logFailTestcase(temp, `Incorrect ApprovedPurchaseConstraint`);
    }
});

Given("User assigns the Sales person on Creating Quote form {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const row = rows[0];

    let SalesPersonCreatingQuote = row.SalesPersonCreatingQuote;
    const OrganizationOfSalesPerson = UserProfileInfo.getOrganization();
    const QuoteReference = getValueDataOfDataTestExecution("QuoteReference");

    let temp = true;
    temp = await accountTabQuoteCreatingQuote.pressAssignSalesPersonButton();
    logFailTestcase(temp, `Press Assign Sale person failed!`);

    temp = await salesPersonListForm.inputSearchUser(SalesPersonCreatingQuote);
    logFailTestcase(temp, `Input Search User failed!`);

    temp = await salesPersonListForm.pressSearchUserButton();
    logFailTestcase(temp, `Press Search User Button failed!`);
    await globalPageObject.waitForProgressBarLoaded_v2();

    let SalesPersonTemp = SalesPersonCreatingQuote;
    if(SalesPersonCreatingQuote.localeCompare(UserProfileInfo.getDisplayName()) === 0){
        SalesPersonTemp+= " (assign to me)";
    }
    temp = await salesPersonListForm.tickCheckboxByName(SalesPersonTemp);
    logFailTestcase(temp, `Tick check box at name = "${SalesPersonTemp}" falied!`);

    temp = await globalPageObject.pressSelectForm();
    logFailTestcase(temp, `Press Select button on form failed!`);

    let confirmMessage = `Are you sure you want to assign this quote ${QuoteReference} to ${SalesPersonCreatingQuote} in ${OrganizationOfSalesPerson}? The new sales person might not see this quote if he/she is not allowed to access.`
    if(SalesPersonCreatingQuote.localeCompare(UserProfileInfo.getDisplayName()) === 0){
        confirmMessage = `Are you sure you want to assign this quote ${QuoteReference} to you?`;
    }
    temp = await globalConfirmationForm.validateValueConfirmMessage(confirmMessage);
    logFailTestcase(temp, `Incorrect confirmation message!`);

    temp = await globalPageObject.pressYesForm();
    logFailTestcase(temp, `Press Yes button on Confirmation failed!`);
    await globalPageObject.waitForProgressBarLoaded_v2(500);
    await globalPageObject.waitForProgressBarLoaded_v2(500);
});

Given("User verifies the Sales person on Creating Quote form {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const row = rows[0];

    const SalesPersonCreatingQuote = row.SalesPersonCreatingQuote;
    const OrganizationOfSalesPerson = UserProfileInfo.getOrganization();

    const SalesPerson = "Sales Person:\n " + SalesPersonCreatingQuote + " - Organization: " + OrganizationOfSalesPerson;

    let temp = await accountTabQuoteCreatingQuote.validateSalesPerson(SalesPerson);
    logFailTestcase(temp, `Incorrect Sale Person!`);
});

When("User selects the Previous Insurer on Creating Quote form {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const row = rows[0];
    const NameOfPreviousInsurer = row.NameOfPreviousInsurer;

    let temp = await accountTabQuoteCreatingQuote.pressEditButton_PreviousInsurer();
    logFailTestcase(temp, `Press Edit button Previous Insurer failed!`);

    temp = await accountTabQuoteCreatingQuote.selectPreviousInsurerOnDropdown_PreviousInsurer(NameOfPreviousInsurer);
    logFailTestcase(temp, `Select Previous Insurer ${NameOfPreviousInsurer} falied!`);
});

When("User verifies the Previous Insurer on Creating Quote form {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const row = rows[0];
    const NameOfPreviousInsurer = row.NameOfPreviousInsurer;
    const EmailOfPreviousInsurer = row.EmailOfPreviousInsurer;

    let temp = await accountTabQuoteCreatingQuote.validateValueName_PreviousInsurer(NameOfPreviousInsurer);
    logFailTestcase(temp, `Incorrect Name of Previous Insurer!`);

    temp = await accountTabQuoteCreatingQuote.validateValueEmail_PreviousInsurer(EmailOfPreviousInsurer);
    logFailTestcase(temp, `Incorrect Email of Previous Insurer!`);
});

When("User downloads first document on Creating Quote form", async () => {
   let temp =  await accountTabQuoteCreatingQuote.pressDownloadDocument_QuoteDocuments();
   logFailTestcase(temp, `Press hyperlink to download document failed!`);
});