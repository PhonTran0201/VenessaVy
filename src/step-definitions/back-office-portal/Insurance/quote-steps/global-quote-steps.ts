import { Before, Given, Then, When } from "@cucumber/cucumber";
import { By } from "selenium-webdriver";
import { TableManager } from "../../../../core/fields/TableManager";
import { AccountTabQuoteList } from "../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-quote/AccountTabQuoteList";
import { AccountTabQuoteProductSelector } from "../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-quote/AccountTabQuoteProductSelector";
import { GlobalMenu } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalMenu";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { QuoteProductSelector } from "../../../../page-objects/back-office-portal/general/quote/quote-layouts/QuoteProductSelector";
import { SelectQuoteForm } from "../../../../page-objects/back-office-portal/general/quote/select-quote-form/SelectQuoteForm";
import { GlobalQuoteInsurance } from "../../../../page-objects/back-office-portal/insurance/quote/quote-layout/GlobalQuoteInsurance";
import { VarsamCreateQuoteInsurance } from "../../../../page-objects/back-office-portal/insurance/quote/quote-layout/VarsamCreateQuoteInsurance";
import { QuoteListInsurance } from "../../../../page-objects/back-office-portal/insurance/quote/quote-list/QuoteListInsurance";
import { convertPathFileDataToDataRegression, logFailTestcase } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { pushObjectToDataArrayWithUniqueKey } from "../../../../storage-data/functions/data-test-execution";


const loader = require("csv-load-sync");

let globalPageObject: GlobalPageObject;
let globalMenu: GlobalMenu;
let globalQuoteInsurance: GlobalQuoteInsurance;
let accountTabQuoteProductSelector: AccountTabQuoteProductSelector;
let quoteProductSelector: QuoteProductSelector;
let quoteListInsurance: QuoteListInsurance;
let varsamCreateQuotePage: VarsamCreateQuoteInsurance;
let accountTabQuoteList: AccountTabQuoteList;
let selectQuoteForm: SelectQuoteForm;
let tags: any;

Before(async function (scenario: any) {
    const context: ICommonContext = this.context;
    globalQuoteInsurance = new GlobalQuoteInsurance(context.driverService);
    globalPageObject = new GlobalPageObject(context.driverService);
    accountTabQuoteProductSelector = new AccountTabQuoteProductSelector(context.driverService);
    quoteProductSelector = new QuoteProductSelector(context.driverService);
    quoteListInsurance = new QuoteListInsurance(context.driverService);
    globalMenu = new GlobalMenu(context.driverService);
    varsamCreateQuotePage = new VarsamCreateQuoteInsurance(context.driverService);
    //console.log(JSON.stringify(scenario.pickle.name) + " " + JSON.stringify(scenario.pickle.tags));
    tags = scenario.pickle.tags;
    accountTabQuoteList = new AccountTabQuoteList(context.driverService);
    selectQuoteForm = new SelectQuoteForm(context.driverService);
});

Given("User is on Quote list", async function () {
    let temp = await globalPageObject.navigateToSubQuotes();
    logFailTestcase(temp, "Navigate to quote tab failed!");
});

// Terry: try catch to reduce number of `logFailTestcase` method
When("User selects a sale channel {string} and product {string}", async function (saleChannel, product) {
    try {
        await accountTabQuoteProductSelector.selectSalesChannel(saleChannel);
        await accountTabQuoteProductSelector.inputProduct(product);
    } catch (error) {
        logFailTestcase(false, (error as Error).message);
    }
});

When("User selects product {string}", async function (product) {
    try {
        await accountTabQuoteProductSelector.selectProductOnMainQuoteList(product)
    } catch (error) {
        logFailTestcase(false, (error as Error).message);
    }
})


When("User selects a sale channel from csv file {string}", async function (filename) {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const SalesChannel = rows[0].SalesChannel;
    let temp = await accountTabQuoteProductSelector.selectSalesChannel(SalesChannel);
    logFailTestcase(temp, `Select a Sale channel "${SalesChannel}" failed!`);
});

When("User selects a product from csv file {string}", async function (filename) {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const product = rows[0].Product;
    let temp = await accountTabQuoteProductSelector.inputProduct(product);
    logFailTestcase(temp, `Select product "${product}" failed!`);
    pushObjectToDataArrayWithUniqueKey("Product", product);
});

When("User selects a product from csv file for Anonymous Quote {string}", async function (filename) {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const product = rows[0].Product;
    let temp = await quoteProductSelector.inputProduct(product);
    logFailTestcase(temp, `Select product "${product}" failed!`);
});

Given("user navigate to Insurance Quote page", async function () {
    let temp = await globalPageObject.navigateToMainQuoteList();
    logFailTestcase(temp, "Navigates to Quote list at global failed!");
    globalPageObject.waitForProgressBarLoaded_v2();
});

Given("User click create quote", async function () {
    await quoteListInsurance.clickCreateQuoteInsurance();
});

Given("User have to create new business for account from csv file {string}", async function (filename) {
    //await globalMenu.goHome();
    await globalMenu.clickMainMenu("Accounts");
    await globalMenu.clickSubMenu("Accounts");
    const rows = loader(filename);
    const account = rows[0].AccountName;
    await globalPageObject.waitPageProgressCompleted();
    // select account from table Account
    const locatorTblAccount = By.css(".table.c-table.table-striped.table-hover");
    let tblAccount = await globalPageObject.getFieldType(locatorTblAccount);
    await (tblAccount as TableManager).clickRowByValue(account);
    await globalPageObject.waitPageProgressCompleted();
    // click Create Quote
    await globalPageObject.navigateToSubQuotes();
    await globalPageObject.waitPageProgressCompleted();
    await quoteListInsurance.clickCreateQuote();
    await globalPageObject.waitPageProgressCompleted();
    console.log("Create new business for product");
});

When("User select a product and input data from csv file {string}", async function (filename) {
    const rows = loader(filename);
    const account = rows[0].AccountName;
    const product = rows[0].ProductName;
    const startDate = rows[0].StartDate;
    const endDate = rows[0].EndDate;
    const firstName = rows[0].FirstName;
    const lastName = rows[0].LastName;
    const dob = rows[0].DOB;
    const peopleInjuries = rows[0].PeopleInjuries;
    const buildingAddress = rows[0].BuildingAddress;
    const postNumber = rows[0].PostNumber;
    const sumInsured = rows[0].SumInsured;
    const underwritingAdjustment = rows[0].UnderwritingAdjustment;
    const productCommission = rows[0].ProductCommission;
    const salesDiscount = rows[0].SalesDiscount;
    const salesCommission = rows[0].SalesCommission;

    const SalesChannel = "All Sales Channel";
    await accountTabQuoteProductSelector.selectAProduct(SalesChannel, product);
    // user select product
    // wait page Create Quote loaded
    // verify element displayed

    // * policy term
    // user select start date
    await globalQuoteInsurance.inputStartDate(startDate);
    await globalQuoteInsurance.inputEndDate(endDate);

    // * policy holder
    // user enter first name
    // user enter last name
    // user enter dob

    // user enter number 3 years people accident
    await globalQuoteInsurance.inputCustomerClaimCountTag(peopleInjuries);
    // * building information
    // address 
    await varsamCreateQuotePage.inputAddress(buildingAddress);
    await varsamCreateQuotePage.inputPostNumber(postNumber);
    await varsamCreateQuotePage.inputType(`Delvis utleid`);
    await varsamCreateQuotePage.inputAlarmSystem(`Brannalarm med  lokal varsling`);
    await varsamCreateQuotePage.inputWaterStopSystemTag(`Seriekoblede Røykvarslere`);
    await varsamCreateQuotePage.inputSmokeDetectorTag(`Vannstoppesystem uten varsling`);
    await varsamCreateQuotePage.inputElectricityTag(`Elektrisk anlegg nyere enn 15 år`);
    await varsamCreateQuotePage.inputNumberOfResidentsTag(`1`);

    // loai cho thue
    // he thong bao dong
    // may do khoi
    // he thong ngan nuoc
    // nha may dien
    // so luong cu dan
    // nam 

    // * noi dung bao hiem
    // so tien bao hiem
    // kieu noi that
    // loai nha o
    // khau tru
    // phu song

    // * xe dap dien
    // pham vi 

    // * thong tin them

    // click Next button



    console.log(product);
    //let temp = await accountTabQuoteProductSelector.inputProduct(product);
    // logFailTestcase(temp, `Select product "${product}" failed!`);
});

When("User selects {string} product at Quotes tab", async (productName) => {
    let temp = await accountTabQuoteProductSelector.inputProduct(productName);
    logFailTestcase(temp, `Select "${productName}" failed!`);
});

//#region generate document steps
When("User presses the Generate summary button on Quote list", async () => {
    let temp = await accountTabQuoteList.pressGenerateSummaryDocumentButton();
    logFailTestcase(temp, "Generates summary document button on Quote list failed!");
});

When("User selects {string} quotes that need to generate document {string}", async (numberQuotes: number, filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const Currency = row.Currency;
    await globalPageObject.waitForSeconds(5000);
    let temo = await selectQuoteForm.selectCurrencyOnSelectQuotesForm(Currency);
    logFailTestcase(temo, `Select currency on select quote form failed!`);

    for (let i = 1; i <= numberQuotes; i++) {
        let temp = await selectQuoteForm.selectQuotesByRow(i);
        logFailTestcase(temp, `Select quote ${i} on select quotes form failed!`);
    }
});

Then("System generates the quote summary document on Quote list", async () => {
    let temp = await globalPageObject.checkToastSuccessExistWithMessage("Quote summary document has been generated.");
    // logFailTestcase(temp, "Check toast success message on Quote list failed!");
    temp = await accountTabQuoteList.validateGenerateSummaryDocumentDownloadSuccessfully();
    logFailTestcase(temp, `validate Generate Summary Document Download failed!`);
});
//#endregion