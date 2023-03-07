import { Before, Given, Then, When } from "@cucumber/cucumber";
import { fail } from "assert";
import { SeleniumWebDriverService } from "../../../../core/selenium-webdriver.service";
import { AccountTabQuoteCreateQuote } from "../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-quote/AccountTabQuoteCreateQuote";
import { AccountTabQuoteProductSelector } from "../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-quote/AccountTabQuoteProductSelector";
import { AccountTabQuoteCreateQuoteGeneralProductInnbo } from "../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-quote/General-channel/AccountTabQuoteCreateQuoteGeneralProductInnbo";
import { AccountTabQuoteCreateQuoteGeneralProductTravel } from "../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-quote/General-channel/AccountTabQuoteCreateQuoteGeneralProductTravel";
import { GlobalBrowserWindowHandle } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalBrowserWindowHandle";
import { GlobalConfigColumn } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalConfigColumn";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { Login } from "../../../../page-objects/back-office-portal/general/login-logout/Login";
import { QuoteList } from "../../../../page-objects/back-office-portal/general/quote/quote-list/QuoteList";
import { CreatingQuoteInsurance } from "../../../../page-objects/back-office-portal/insurance/quote/quote-layout/CreatingQuoteInsurance";
import { GlobalQuoteInsurance } from "../../../../page-objects/back-office-portal/insurance/quote/quote-layout/GlobalQuoteInsurance";
import { QuoteListInsurance } from "../../../../page-objects/back-office-portal/insurance/quote/quote-list/QuoteListInsurance";
import { ValidateField } from "../../../../shared/classes";
import { addDate, addYear, convertPathFileDataToDataRegression, getCurrentDateTime, getDate, getTheFirstFileNameByPathInFolder, logFailTestcase, logInfoMessage, logSuccessMessage, logWarningMessage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { numberToCurrency } from "../../../../shared/tenant-setting/tenant-setting";
import { dataTestcase, dataTestExecution, DownloadFilePathGlobalVariable, scenarioName, subErrorMessages } from "../../../../shared/variables";
import { getDataTestCaseObjectByNameField } from "../../../../storage-data/functions/data-test-case";
import { getValueDataOfDataTestExecution, pushObjectToDataArrayWithUniqueKey } from "../../../../storage-data/functions/data-test-execution";

const loader = require("csv-load-sync");

let globalQuoteInsurance: GlobalQuoteInsurance;
let globalPageObject: GlobalPageObject;
let creatingQuoteInsurance: CreatingQuoteInsurance;
let accountTabQuoteProductSelector: AccountTabQuoteProductSelector;
let quoteListInsurance: QuoteListInsurance;
let quoteList: QuoteList;
let globalBrowserWindowHandle: GlobalBrowserWindowHandle;

Before(async function () {
    const context: ICommonContext = this.context;
    globalQuoteInsurance = new GlobalQuoteInsurance(context.driverService);
    globalPageObject = new GlobalPageObject(context.driverService);
    accountTabQuoteProductSelector = new AccountTabQuoteProductSelector(context.driverService);
    creatingQuoteInsurance = new CreatingQuoteInsurance(context.driverService);
    quoteListInsurance = new QuoteListInsurance(context.driverService);
    quoteList = new QuoteList(context.driverService);
    globalBrowserWindowHandle = new GlobalBrowserWindowHandle(context.driverService);
});

export async function inputTravelQuote(Name: string, Age: string, NumOfTraveller: string, LuggageExcess: string, AdditionalCover: string) {
    let temp = await globalQuoteInsurance.inputInsuredPersonName(Name);
    logFailTestcase(temp, "inputInsuredPersonName failed");

    temp = await globalQuoteInsurance.inputInsuredPersonAge(Age);
    logFailTestcase(temp, "inputInsuredPersonAge failed");

    temp = await globalQuoteInsurance.chooseNumOfTraveller(NumOfTraveller);
    logFailTestcase(temp, "chooseNumOfTraveller failed")

    temp = await globalQuoteInsurance.inputLuggageExcess(LuggageExcess);
    logFailTestcase(temp, "inputLuggageExcess failed");

    temp = await globalQuoteInsurance.chooseAdditionalCover(AdditionalCover);
    logFailTestcase(temp, "chooseAdditionalCover failed");
}


Given("User is on Select a product page", async function () {
    let temp = await globalPageObject.navigateToSubQuotes();
    logFailTestcase(temp, "Navigate to quote tab failed!");
    await globalPageObject.waitForProgressBarLoaded_v2();
    await quoteListInsurance.clickCreateQuote();
});

//This step will automatically sets commissions and discounts to 0
//Commissions and Discounts can be set by another step
When("User inputs valid quote data from csv file {string}", async function (filename) {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    for (let obj of rows) {
        let startDate = obj.StartDate;
        let endDate = obj.EndDate;
        const StartDateMinusToday = obj.StartDateMinusToday;
        const EndDateMinusStartDate = obj.EndDateMinusStartDate;
        const name = obj.Name;
        const age = obj.Age;
        const numOfTraveller = obj.NumberOfTraveller;
        const luggageExcess = obj.LuggageExcess;
        const additionalCover = obj.AdditionalCover;

        //ACTIONS
        if (StartDateMinusToday && EndDateMinusStartDate) {
            startDate = getDate(StartDateMinusToday);
            if (EndDateMinusStartDate === '1Year') {
                endDate = addDate(addYear(startDate, 1),-1);
            }
            else {
                endDate = addDate(startDate, EndDateMinusStartDate);
            }
        }
        if (startDate) {
            let temp = await globalQuoteInsurance.inputStartDate(startDate);
            logFailTestcase(temp, "inputStartDate failed");
        }

        if (endDate) {
            let temp = await globalQuoteInsurance.inputEndDate(endDate);
            logFailTestcase(temp, "inputEndDate failed");
        }
        await inputTravelQuote(
            name,
            age,
            numOfTraveller,
            luggageExcess,
            additionalCover
        );

        let temp = await globalQuoteInsurance.clickNext();
        logFailTestcase(temp, "clickNext failed");

        //Preventing system setting from affecting the quote price
        temp = await creatingQuoteInsurance.inputCommission(
            "0",
            "0",
            "0",
            "0"
        );
        if (!temp) {
            logWarningMessage("Create Quote failed!");
            fail(scenarioName + ": Test case is failed!" + subErrorMessages);
        }

    }

}
);

When("User creates a quote from csv file {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));

    let temp = await quoteListInsurance.clickCreateQuote();
    logFailTestcase(temp, "clickCreateQuote failed");

    const SalesChannel = rows[0].SalesChannel;
    const ProductName = rows[0].ProductName;
    let StartDate = rows[0].StartDate;
    let EndDate = rows[0].EndDate;
    const StartDateMinusToday = rows[0].StartDateMinusToday;
    const EndDateMinusStartDate = rows[0].EndDateMinusStartDate;
    const Name = rows[0].Name;
    const Age = rows[0].Age;
    const NumOfTraveller = rows[0].NumberOfTraveller;
    const LuggageExcess = rows[0].LuggageExcess;
    const AdditionalCover = rows[0].AdditionalCover;
    const UnderwritingAdjustment = rows[0].UnderwritingAdjustment;
    const ProductCommission = rows[0].ProductCommission;
    const SalesDiscount = rows[0].SalesDiscount;
    const SalesCommission = rows[0].SalesCommission;
    const IsConstrained = rows[0].IsConstrained;
    const NumerOfDaysWillExpire = rows[0].NumerOfDaysWillExpire;
    if (StartDateMinusToday && EndDateMinusStartDate) {
        StartDate = getDate(StartDateMinusToday);
        EndDate = addDate(StartDate, EndDateMinusStartDate);
    }
    GlobalQuoteInsurance.policyTerm = StartDate + "-" + EndDate;

    temp = await accountTabQuoteProductSelector.selectAProduct(SalesChannel, ProductName);
    let temp1: boolean;
    dataTestcase.push(new ValidateField("", 0, true, [], []));
    if (!temp) {
        logWarningMessage("Select a product failed!");
        fail(scenarioName + ": Test case is failed!" + subErrorMessages);
    }

    let temp2 = await globalQuoteInsurance.getRefNumber();
    logFailTestcase(temp2.length > 0, "get Ref Number failed");
    dataTestcase.push(new ValidateField("QuoteReference", -1, true, [temp2], []));

    if (StartDate) {
        temp = await globalQuoteInsurance.inputStartDate(StartDate);
        logFailTestcase(temp, "inputStartDate failed");
    }

    if (EndDate) {
        temp = await globalQuoteInsurance.inputEndDate(EndDate);
        logFailTestcase(temp, "inputEndDate failed");
    }
    await inputTravelQuote(
        Name,
        Age,
        NumOfTraveller,
        LuggageExcess,
        AdditionalCover
    );
    temp = await globalQuoteInsurance.clickNext();
    logFailTestcase(temp, "clickNext failed");
    temp = await creatingQuoteInsurance.inputDataToCreatingQuote(
        UnderwritingAdjustment,
        ProductCommission,
        SalesDiscount,
        SalesCommission,
        "",
        "",
        "",
        "",
        "",
        ""
    );
    if (!temp) {
        logWarningMessage("Create Quote failed!");
        logFailTestcase(false, scenarioName + ": Test case is failed!" + subErrorMessages);
    }
    temp = await globalPageObject.navigateToSubQuotes();
    logFailTestcase(temp, "Navigate to quote tab failed!");
    await globalPageObject.waitForProgressBarLoaded_v2();

    logSuccessMessage("=> Step - Then User creates a quote from csv file: is passed!");
});

When("User accepts quote", async function () {
    let temp = await creatingQuoteInsurance.clickAcceptQuote();
    pushObjectToDataArrayWithUniqueKey("QuoteReference", temp.substring(12));
});
Then("System shows new quote in the Quote list {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    let description = rows[0].Name || rows[0].Address; // Address là product Innbo Seasonal của Varsam
    let product = rows[0].Product;
    let premium = numberToCurrency(rows[0].ExpectedPremium, true, rows[0].Currency);
    let type = rows[0].Type;
    let status = rows[0].ExpectedStatus;
    let StartDate = rows[0].StartDate;
    let EndDate = rows[0].EndDate;
    const StartDateMinusToday = rows[0].StartDateMinusToday;
    const EndDateMinusStartDate = rows[0].EndDateMinusStartDate;
    if (StartDateMinusToday && EndDateMinusStartDate) {
        StartDate = getDate(StartDateMinusToday);
        if (EndDateMinusStartDate === '1Year') {
          EndDate = addDate(addYear(StartDate, 1),-1);
        }
        else {
          EndDate = addDate(StartDate, EndDateMinusStartDate);
        }
    }
    let policyTerm = StartDate + " - " + EndDate;
    const createdDate = getCurrentDateTime().substring(0, 10);

    await globalQuoteInsurance.clickBackToQuoteList();
    let temp = await quoteList.validateReferenceOnQuoteList(getValueDataOfDataTestExecution("QuoteReference"));
    logFailTestcase(temp, `Incorrect reference!`);

    temp = await quoteList.validateDescriptionOnQuoteList(description);
    logFailTestcase(temp, `Incorrect description!`);

    temp = await quoteList.validateProductOnQuoteList(product);
    logFailTestcase(temp, `Incorrect Product!`);

    temp = await quoteList.validatePolicyTermOnQuoteList(policyTerm);
    logFailTestcase(temp, `Incorrect policy term!`);

    temp = await quoteList.validatePremiumOnQuoteList(premium);
    logFailTestcase(temp, `Incorrect premium!`);

    if (type) {
        temp = await quoteList.validateTypeOnQuoteList(type);
        logFailTestcase(temp, `Incorrect Type!`);
    }

    temp = await quoteList.validateStatusOnQuoteList(status);
    logFailTestcase(temp, `Incorrect status!`);
    const globalConfigColumn = new GlobalConfigColumn(SeleniumWebDriverService.getInstance());
    if ((!await globalConfigColumn.checkConfigColumnDropdownShowing())) {
        temp = await globalConfigColumn.pressConfigColumnButtonAtSubTab();
        logFailTestcase(temp, `Press config column button failed!`);
    }
    // const check = await globalConfigColumn.isConfigColumnItemCheckingByName("Created Date");
    // if(!check){
    //     await globalConfigColumn.checkConfigColumnItemByName("Created Date");
    //     await globalPageObject.waitForProgressBarLoaded_v2();
    // }
    // temp = await quoteList.validateCreatedDateOnQuoteList(createdDate);
    // logFailTestcase(temp, `Incorrect Created date!`);
    pushObjectToDataArrayWithUniqueKey("StartDate", StartDate);
    pushObjectToDataArrayWithUniqueKey("EndDate", EndDate);
    pushObjectToDataArrayWithUniqueKey("PolicyTerm", policyTerm);
});

Then("System shows new quote insurance in the Quote list {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    let description = rows[0].Name;
    let product = rows[0].Product;
    let premium = numberToCurrency(rows[0].ExpectedPremium, true, rows[0].Currency);
    let status = rows[0].ExpectedStatus;
    let StartDate = rows[0].StartDate;
    let EndDate = rows[0].EndDate;
    const StartDateMinusToday = rows[0].StartDateMinusToday;
    const EndDateMinusStartDate = rows[0].EndDateMinusStartDate;
    if (StartDateMinusToday && EndDateMinusStartDate) {
        StartDate = getDate(StartDateMinusToday);
        EndDate = addDate(StartDate, EndDateMinusStartDate);
    }
    let policyTerm = StartDate + " - " + EndDate;
    await globalQuoteInsurance.clickBackToQuoteList();
    await quoteListInsurance.assertQuoteInsurance(getValueDataOfDataTestExecution("QuoteReference"), description, product, policyTerm, premium, status);
});

Then("System shows new quote in Quote list {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    let temp = await globalPageObject.navigateToSubQuotes();
    logFailTestcase(temp, "Navigate to quote tab failed!");
    await globalPageObject.waitForProgressBarLoaded_v2();
    logInfoMessage("\tChecking Quote created at Quote list:");
    const quoteRef = getDataTestCaseObjectByNameField("QuoteReference")?.message[0];
    let description = rows[0].Name;
    let product = rows[0].ProductName;
    let StartDate = rows[0].StartDate;
    let EndDate = rows[0].EndDate;
    const StartDateMinusToday = rows[0].StartDateMinusToday;
    const EndDateMinusStartDate = rows[0].EndDateMinusStartDate;
    if (StartDateMinusToday && EndDateMinusStartDate) {
        StartDate = getDate(StartDateMinusToday);
        EndDate = addDate(StartDate, EndDateMinusStartDate);
    }
    let policyTerm = StartDate + " - " + EndDate;
    let premium = numberToCurrency(rows[0].PolicyPremium, true, rows[0].Currency);
    let status = rows[0].Status;
    temp = await quoteListInsurance.assertQuotesAtQuoteList(1, description, product, policyTerm, premium, status);
    if (!temp) {
        logWarningMessage("Check Quote created at Quote list failed!");
        logFailTestcase(temp, scenarioName + ": Test case is failed!" + subErrorMessages);
    }
    logSuccessMessage("=> Then - System shows new quote in Quote list: is passed!");
});

Then("System shows new quote in Quote widget at Summary tab {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    let len = rows.length;
    await globalPageObject.navigateToSubSummary();
    logInfoMessage("\tChecking Quotes created on Quote widget - Summary tab:");
    for (let i = len - 1, j = 1; i >= 0; i--, j++) {
        let product = rows[i].ProductName;
        let premium = numberToCurrency(rows[i].PolicyPremium, true, rows[0].Currency);
        let quoteRef = (dataTestcase[i].nameField).replace(/\D/g, "");

        let Product_QuoteRef = product + " - REF.:" + quoteRef;
        let temp = await globalQuoteInsurance.assertQuotesAtQuoteWidget(j, Product_QuoteRef, premium);
        if (!temp) {
            logWarningMessage("Check Quotes created at Quote widget failed!");
            fail(`Line ${j} in file csv:\n` + scenarioName + ": Test case is failed!" + subErrorMessages);
        }
    }
    logSuccessMessage("=> Then - System shows new quotes in Quote widget: is passed!");
});

Then("User validate the generate document on {string} documents {string}", async (type, filename) => {
    let row = loader(convertPathFileDataToDataRegression(filename))[0];
    const TemplateDocName = row.TemplateDocName;
    await globalPageObject.waitForProgressBarLoaded_v2();
    const QuoteReference = getValueDataOfDataTestExecution("QuoteReference");
    let ExpectedDownloadFileName = TemplateDocName ? TemplateDocName + " " + QuoteReference.split("/")[0] : QuoteReference;
    let temp = await globalQuoteInsurance.validateDocumentOnDocumentsSection(TemplateDocName + " " + QuoteReference);
    logFailTestcase(temp, `incorrect Generate document on ${type} document!`);

    temp = await globalQuoteInsurance.validatePDFIconOnDocumentsSection();
    logFailTestcase(temp, `incorrect PDF document icon on ${type} document!`);

    temp = await globalQuoteInsurance.downloadDocumentOnDocumentsSection();
    logFailTestcase(temp, 'download Document On Documents Section failed!');

    //validate filename after download file
    await globalPageObject.findDownloadFileAfterDownload("");
    await globalPageObject.waitForSeconds(5000);
    let ActualDownloadFileName = getTheFirstFileNameByPathInFolder(DownloadFilePathGlobalVariable, "pdf");
    console.log("ActualDownloadFileName: " + ActualDownloadFileName);
    console.log("ExpectedDownloadFileName: " + ExpectedDownloadFileName);
    if (!ActualDownloadFileName.includes(ExpectedDownloadFileName)) {
        logFailTestcase(false, "Incorrect downloaded File name !");
    } else {
        logSuccessMessage('validate the download File name: Test passed!');
    };
    pushObjectToDataArrayWithUniqueKey("url", await globalBrowserWindowHandle.getCurrentUrl());
});

When("User checks creating quote with new publish version", async () => {
    const accountTabQuoteCreateQuoteGeneralProductTravel = new AccountTabQuoteCreateQuoteGeneralProductTravel(SeleniumWebDriverService.getInstance());
    let temp = await accountTabQuoteCreateQuoteGeneralProductTravel.inputNumberOfTravellerTravellers("More than 5");
    logFailTestcase(temp, `Input number of Travellers`);

    temp = await accountTabQuoteCreateQuoteGeneralProductTravel.validateLuggageExcessTravellers("1000");
    logFailTestcase(temp, `Incorrect Luggage Excess`);

    temp = await accountTabQuoteCreateQuoteGeneralProductTravel.inputNameInsuredPerson("123");
    logFailTestcase(temp, `Input Insured Person Name failed!`);

    temp = await accountTabQuoteCreateQuoteGeneralProductTravel.pressNextButtonOnFooter();
    logFailTestcase(temp, `Press Next button failed!`);

    temp = await globalPageObject.waitToastMessageDisplay("Quote answers updated.");
    logFailTestcase(temp, `Create quote failed!`);
});