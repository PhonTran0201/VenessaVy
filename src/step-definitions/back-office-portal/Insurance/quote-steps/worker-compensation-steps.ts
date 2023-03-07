import { Before, Then, When } from "@cucumber/cucumber";
import { fail } from "assert";
import { AccountTabQuoteProductSelector } from "../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-quote/AccountTabQuoteProductSelector";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { CreatingQuoteInsurance } from "../../../../page-objects/back-office-portal/insurance/quote/quote-layout/CreatingQuoteInsurance";
import { GlobalQuoteInsurance } from "../../../../page-objects/back-office-portal/insurance/quote/quote-layout/GlobalQuoteInsurance";
import { QuoteListInsurance } from "../../../../page-objects/back-office-portal/insurance/quote/quote-list/QuoteListInsurance";
import { ValidateField } from "../../../../shared/classes";
import { addDate, convertPathFileDataToDataRegression, getDate, logFailTestcase, logInfoMessage, logSuccessMessage, logWarningMessage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { numberToCurrency } from "../../../../shared/tenant-setting/tenant-setting";
import { dataTestcase, scenarioName, subErrorMessages } from "../../../../shared/variables";

const loader = require("csv-load-sync");

let globalQuoteInsurance: GlobalQuoteInsurance;
let globalPageObject: GlobalPageObject;
let quoteListInsurance: QuoteListInsurance;
let accountTabQuoteProductSelector: AccountTabQuoteProductSelector;
let creatingQuoteInsurance: CreatingQuoteInsurance;

export async function inputWorkerCompensation(OrganiztionNumber: string, CompanyName: string, IndustryCode: string, LossRatio: string, Claims5Years: string, NumberOfPeople: string, ManLabouryears: string) {
    let temp = await globalQuoteInsurance.inputOrganization(OrganiztionNumber);
    logFailTestcase(temp, "input Ogranization Number failed");

    temp = await globalQuoteInsurance.inputCompanyName(CompanyName);
    logFailTestcase(temp, "input Company Name failed");

    temp = await globalQuoteInsurance.inputIndustryCode(IndustryCode);
    logFailTestcase(temp, "input Industry Code failed");

    temp = await globalQuoteInsurance.inputLossRatio(LossRatio);
    logFailTestcase(temp, "inoput Loss Ratio failed");

    temp = await globalQuoteInsurance.inputClaims5Years(Claims5Years);
    logFailTestcase(temp, "input Claim 5 years failed");

    temp = await globalQuoteInsurance.inputNumberOfPeople(NumberOfPeople);
    logFailTestcase(temp, "input Number Of People failed");

    temp = await globalQuoteInsurance.inputManLabourYears(ManLabouryears);
    logFailTestcase(temp, "input Man Labour Years failed");

    temp = await globalQuoteInsurance.clickNext();
    logFailTestcase(temp, "clickNext failed");
}

Before(async function () {
    const context: ICommonContext = this.context;
    globalQuoteInsurance = new GlobalQuoteInsurance(context.driverService);
    globalPageObject = new GlobalPageObject(context.driverService);
    quoteListInsurance = new QuoteListInsurance(context.driverService);
    accountTabQuoteProductSelector = new AccountTabQuoteProductSelector(context.driverService);
    creatingQuoteInsurance = new CreatingQuoteInsurance(context.driverService);
});

When("User creates a Worker Compensation quote from csv file {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const len = rows.length;

    for (let i = 0; i < len; i++) {
        logInfoMessage(`\tChecking at Line ${i + 1} file csv:`);

        let temp = await quoteListInsurance.clickCreateQuote();
        logFailTestcase(temp, "clickCreateQuote failed");

        const SalesChannel = rows[0].SalesChannel;
        const ProductName = rows[0].ProductName;
        let StartDate = rows[0].StartDate;
        let EndDate = rows[0].EndDate;
        const StartDateMinusToday = rows[0].StartDateMinusToday;
        const EndDateMinusStartDate = rows[0].EndDateMinusStartDate;
        const OrganizationNumber = rows[0].OrganizationNumber;
        const CompanyName = rows[0].CompanyName;
        const IndustryCode = rows[0].IndustryCode;
        const LossRatio = rows[0].LossRatio;
        const Claims5Years = rows[0].Claims5Years;
        const NumberOfPeople = rows[0].NumberOfPeople;
        const ManLabouryears = rows[0].ManLabouryears;


        const UnderwritingAdjustment = rows[0].UnderwritingAdjustment;
        const ProductCommission = rows[0].ProductCommission;
        const SalesDiscount = rows[0].SalesDiscount;
        const AnnualPremium = numberToCurrency(rows[0].AnnualPremium, true, rows[0].Currency);
        const PolicyPremium = numberToCurrency(rows[0].PolicyPremium, true, rows[0].Currency);
        const IsConstrained = rows[0].IsConstrained;
        const NumerOfDaysWillExpire = rows[0].NumerOfDaysWillExpire;

        temp = await accountTabQuoteProductSelector.selectAProduct(SalesChannel, ProductName);
        dataTestcase.push(new ValidateField("", i, true, [], []));
        if (!temp) {
            logWarningMessage("Select a product failed!");
            fail(`Line ${i + 1} in file csv:\n` + scenarioName + ": Test case is failed!" + subErrorMessages);
        }

        let temp2 = await globalQuoteInsurance.getRefNumber();
        logFailTestcase(temp2.length > 0, "get Ref Number failed");
        dataTestcase.push(new ValidateField("QuoteReference", -1, true, [temp2], []));

        if (StartDateMinusToday && EndDateMinusStartDate) {
            StartDate = getDate(StartDateMinusToday);
            EndDate = addDate(StartDate, EndDateMinusStartDate);
        }
        if (StartDate) {
            temp = await globalQuoteInsurance.inputStartDate(StartDate);
            logFailTestcase(temp, "input Start Date failed");
        }

        if (EndDate) {
            temp = await globalQuoteInsurance.inputEndDate(EndDate);
            logFailTestcase(temp, "input End Date failed");
        }

        await inputWorkerCompensation(
            OrganizationNumber,
            CompanyName,
            IndustryCode,
            LossRatio,
            Claims5Years,
            NumberOfPeople,
            ManLabouryears
        )

        temp = await creatingQuoteInsurance.inputDataToCreatingQuote(
            UnderwritingAdjustment,
            ProductCommission,
            SalesDiscount,
            "",
            IsConstrained,
            StartDate,
            EndDate,
            NumerOfDaysWillExpire,
            AnnualPremium,
            PolicyPremium
        );
        if (!temp) {
            logWarningMessage("Create Quote failed!");
            fail(`Line ${i + 1} in file csv:\n` + scenarioName + ": Test case is failed!" + subErrorMessages);
        }

        logSuccessMessage(`\n=> Line ${i + 1} file csv: passed!\n`);
        temp = await globalPageObject.navigateToSubQuotes();
        logFailTestcase(temp, "Navigate to quote tab failed!");
        await globalPageObject.waitForProgressBarLoaded_v2();
    }

    logSuccessMessage("=> Step - Then User creates many quotes from csv file: is passed!");

});

Then("System shows new Worker Compensation quote in Quote list {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    let len = rows.length;
    let temp = await globalPageObject.navigateToSubQuotes();
    logFailTestcase(temp, "Navigate to quote tab failed!");
    await globalPageObject.waitForProgressBarLoaded_v2();
    logInfoMessage("\tChecking Quotes created at Quote list:");
    for (let i = len - 1, j = 1; i >= 0; i--, j++) {
        let product = rows[i].ProductName;
        let StartDate = rows[0].StartDate;
        let EndDate = rows[0].EndDate;
        const StartDateMinusToday = rows[0].StartDateMinusToday;
        const EndDateMinusStartDate = rows[0].EndDateMinusStartDate;
        if (StartDateMinusToday && EndDateMinusStartDate) {
            StartDate = getDate(StartDateMinusToday);
            EndDate = addDate(StartDate, EndDateMinusStartDate);
        }
        let policyTerm = StartDate + " - " + EndDate;
        let premium = numberToCurrency(rows[i].PolicyPremium, true, rows[0].Currency);
        let status = rows[i].Status;
        temp = await quoteListInsurance.assertQuotesOrigoAtQuoteList(j, product, policyTerm, premium, status);
        if (!temp) {
            logWarningMessage("Check Quotes created at Quote list failed!");
            fail(`Line ${j} in file csv:\n` + scenarioName + ": Test case is failed!" + subErrorMessages);
        }
    }
    logSuccessMessage("=> Then - System shows new quotes in Quote list: is passed!");
});

Then("System shows new Worker Compensation quote in Quote widget at Summary tab {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    let len = rows.length;
    await globalPageObject.navigateToSubSummary();
    logInfoMessage("\tChecking Quotes created on Quote widget - Summary tab:");
    for (let i = len - 1, j = 1; i >= 0; i--, j++) {
        let product = numberToCurrency(rows[i].ProductName, true, rows[0].Currency);
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