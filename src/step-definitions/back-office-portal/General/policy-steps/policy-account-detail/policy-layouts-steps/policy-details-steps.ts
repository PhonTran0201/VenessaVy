import { Before, Given, Then, When } from "@cucumber/cucumber";
import { DataRepo } from "../../../../../../core/modals/DataRepo";
import { AccountTabPolicyDetails } from "../../../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-policy/AccountTabPolicyDetails";
import { AccountTabPolicyTimeLinePopover } from "../../../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-policy/AccountTabPolicyTimeLinePopover";
import { GlobalAlert } from "../../../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalAlert";
import { GlobalBrowserWindowHandle } from "../../../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalBrowserWindowHandle";
import { GlobalPageObject } from "../../../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { Login } from "../../../../../../page-objects/back-office-portal/general/login-logout/Login";
import { PolicyDetails } from "../../../../../../page-objects/back-office-portal/general/policy/policy-layouts/PolicyDetails";
import { ValidateField } from "../../../../../../shared/classes";
import { addDate, addMonth, addYear, compareDate, convertPathFileDataToDataRegression, getDate, getTheFirstFileNameByPathInFolder, logFailTestcase, logInfoMessage, logSuccessMessage } from "../../../../../../shared/functions";
import { ICommonContext } from "../../../../../../shared/interfaces";
import { currencyToNumber, numberToCurrency } from "../../../../../../shared/tenant-setting/tenant-setting";
import { dataTestcase, DownloadFilePathGlobalVariable } from "../../../../../../shared/variables";
import { getDataTestCaseObjectByNameField } from "../../../../../../storage-data/functions/data-test-case";
import { getValueDataOfDataTestExecution } from "../../../../../../storage-data/functions/data-test-execution";
import { verifyCoverBreakdownOnPolicyDetails, verifyPolicyInforOnPolicyDetails, verifyPremiumSectionOnPolicyDetails } from "./policy-details-functions";


let accountTabPolicyDetails: AccountTabPolicyDetails;
let globalPageObject: GlobalPageObject;
let globalBrowserWindowHandle: GlobalBrowserWindowHandle;
let login: Login;
let accountTabPolicyTimeLinePopover: AccountTabPolicyTimeLinePopover;
let globalAlert: GlobalAlert;
let policyDetails: PolicyDetails;




const loader = require("csv-load-sync");

Before(async function () {
    const context: ICommonContext = this.context;
    accountTabPolicyDetails = new AccountTabPolicyDetails(context.driverService);
    globalPageObject = new GlobalPageObject(context.driverService);
    globalBrowserWindowHandle = new GlobalBrowserWindowHandle(context.driverService);
    accountTabPolicyTimeLinePopover = new AccountTabPolicyTimeLinePopover(context.driverService);
    login = new Login(context.driverService);
    globalAlert = new GlobalAlert(context.driverService);
    policyDetails = new PolicyDetails(context.driverService);
});

//#region Header of policy detail
Given("User adjusts policy at Policy detail", async () => {
    let temp = await accountTabPolicyDetails.pressAdjustButton_OnHeader();
    logFailTestcase(temp, `Press Adjust button at policy detail failed!`);

    try {
        temp = await globalAlert.acceptAlert();
    } catch (error) {
        console.log(error);
    }
});

Given("User renews policy at Policy detail", async () => {
    let temp = await accountTabPolicyDetails.pressRenew_OnHeader();
    logFailTestcase(temp, `Press Renew button at policy detail failed!`);

    try {
        temp = await globalAlert.acceptAlert();
    } catch (error) {
        console.log(error);
    }
});
Given("User terminates policy at Policy detail", async () => {
    let temp = await accountTabPolicyDetails.pressTerminate_OnHeader();
    logFailTestcase(temp, `Press Terminate button at policy detail failed!`);
});
//#endregion

When("User verifies tooltip Product version at policy detail page {string}", async function (filename) {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const ProductVersion = row.ProductVersion;
    const Product = row.Product;
    const url = await globalBrowserWindowHandle.getCurrentUrl();

    let temp = true;
    if (ProductVersion) {
        temp = await accountTabPolicyDetails.validateValueProductTooltipVersionPolicyInfo(ProductVersion);
        logFailTestcase(temp, `Incorrect Product version!`);
    }

    logInfoMessage("\n\t => Check hypelink of Product tooltip");
    temp = await accountTabPolicyDetails.pressProductTooltipVersion();
    await globalPageObject.waitForProgressBarLoaded_v2();

    temp = await globalPageObject.checkMainEntityDetailIsOpening(Product);
    logFailTestcase(temp, `Product Builder of "${Product}" is NOT opened!`);

    temp = await login.navigate(url);
    logFailTestcase(temp, `Navigate to "${url}" falied!`);
    logInfoMessage("\t\t=> Passed!");
});

When("User verifies popover Previous Insurer at policy detail page {string}", async function (filename) {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const PreviousInsurerPopoverMessage = row.PreviousInsurerPopoverMessage;

    if (PreviousInsurerPopoverMessage) {
        let temp = await accountTabPolicyDetails.validateValuePreviousInsurerPopoverPolicyInfo(PreviousInsurerPopoverMessage);
        logFailTestcase(temp, `Incorrect PreviousInsurerPopoverMessage`);
    }
});

Then(`User verifies policy information at policy detail page {string}`, async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];

    let SalesChannel = row.SalesChannel;
    let Product = row.Product
    let StartDate = row.StartDate;
    let EndDate = row.EndDate;
    let StartDateMinusToday = row.StartDateMinusToday;
    let EndDateMinusStartDate = row.EndDateMinusStartDate;
    let TotalPremiumAnnualPremium = row.TotalPremiumAnnualPremium;
    let TotalPremiumPolicyPremium = row.TotalPremiumPolicyPremium;
    let StatusPolicy = row.StatusPolicy;
    let NameOfPreviousInsurer = row.NameOfPreviousInsurer;
    let RenewalMode = row.RenewalMode;
    let Currency = row.Currency;
    let Name = row.Name;
    let Age = row.Age;
    let NumberOfTraveller = row.NumberOfTraveller;
    let AdditionalCover = row.AdditionalCover;
    let LuggageExcess = row.LuggageExcess;
    let TemplateDocName = row.TemplateDocName;
    let QuoteReference = getValueDataOfDataTestExecution("QuoteReference");

    let ExpectedDownloadFileName = TemplateDocName ? TemplateDocName + " " + QuoteReference.split("/")[0] : QuoteReference;
    let CoverBreakdownFilePath = row.CoverBreakdownFilePath;
    let PremiumFilePath = row.PremiumFilePath;

    if (StartDateMinusToday && EndDateMinusStartDate) {
        StartDate = getDate(StartDateMinusToday);
        EndDate = addDate(StartDate, EndDateMinusStartDate);
    }
    let EffectiveDate = row.EffectiveDate;
    if (!EffectiveDate) {
        EffectiveDate = StartDate;
        if (row.EffectiveDateMinusToday) {
            EffectiveDate = getDate(row.EffectiveDateMinusToday);
        }
    }
    switch (NumberOfTraveller) {
        case "Single Adult":
            NumberOfTraveller = '1';
            break;
        case "Two Adults":
            NumberOfTraveller = '2';
            break;
        case "Family":
            NumberOfTraveller = '4';
            break;
        case "More than 5":
            NumberOfTraveller = '5';
            break;
    }

    let temp = true;
    //#region POLICY INFO
    logInfoMessage("\n\t => Policy Info Section:\n");
    let rowTemp0 = {
        "Period": StartDate + " - " + EndDate,
        "Product": Product,
        "SalesChannel": SalesChannel,
        "EffectiveDate": EffectiveDate,
        "TotalPremiumAnnualPremium": TotalPremiumAnnualPremium,
        "TotalPremiumPolicyPremium": TotalPremiumPolicyPremium,
        "StatusPolicy": StatusPolicy,
        "NameOfPreviousInsurer": NameOfPreviousInsurer,
        "RenewalMode": RenewalMode,
    }
    await verifyPolicyInforOnPolicyDetails(accountTabPolicyDetails, rowTemp0, Currency);
    //#endregion


    //#region POLICY TIMELINE
    //start date popover validation
    temp = await accountTabPolicyTimeLinePopover.clickStartDateButtonOnPolicyTimeline();
    logFailTestcase(temp, `policy TimeLine Popover was not shown on policy timeline!`);

    temp = await accountTabPolicyTimeLinePopover.waitPopoverWindowIsExisted()
    logFailTestcase(temp);

    temp = await accountTabPolicyTimeLinePopover.validatePopoverTitle("DETAILS FROM " + StartDate);
    logFailTestcase(temp, `policy TimeLine Popover start date title is not valid!`);

    if (Name) {
        temp = await accountTabPolicyTimeLinePopover.validateValueByFieldAtPopover(Name, "Name");
        logFailTestcase(temp, `policy TimeLine Popover Name field Value is not valid!`);
    }
    if (Age) {
        temp = await accountTabPolicyTimeLinePopover.validateValueByFieldAtPopover(Age, "Age");
        logFailTestcase(temp, `policy TimeLine Popover Age field Value is not valid!`);
    }
    if (NumberOfTraveller) {
        temp = await accountTabPolicyTimeLinePopover.validateValueByFieldAtPopover(NumberOfTraveller, "Number of traveller");
        logFailTestcase(temp, `policy TimeLine Popover Age field Value is not valid!`);
    }
    if (AdditionalCover) {
        temp = await accountTabPolicyTimeLinePopover.validateValueByFieldAtPopover(AdditionalCover === 'Yes' ? `true` : `false`, "Additional cover");
        logFailTestcase(temp, `policy TimeLine Popover AdditionalCover field Value is not valid!`);
    }

    if (LuggageExcess) {
        temp = await accountTabPolicyTimeLinePopover.validateValueByFieldAtPopover(LuggageExcess, "Luggage Excess");
        logFailTestcase(temp, `policy TimeLine Popover LuggageExcess field Value is not valid!`);
    }
    await accountTabPolicyTimeLinePopover.clickStartDateButtonOnPolicyTimeline();

    await globalPageObject.closeAllToastSuccess();
    await globalPageObject.closeAllToastError();
    temp = await accountTabPolicyTimeLinePopover.validateValueByFieldAtPopover(ExpectedDownloadFileName, "Insurance Certificate");
    logFailTestcase(temp, `policy TimeLine Popover Insurance Certificate field Value is not valid!`);

    temp = await accountTabPolicyTimeLinePopover.validateInsuranceCertificateIcon();
    logFailTestcase(temp, `Insurance CertificateIcon is not valid!`);

    //verify download policy document on popover
    temp = await accountTabPolicyTimeLinePopover.downloadInsuranceCertificateDocument();
    logFailTestcase(temp, `Can not download certificate on popover!`);
    await globalPageObject.waitForProgressBarLoaded_v2();
    let downloadedDocumentName = getTheFirstFileNameByPathInFolder(DownloadFilePathGlobalVariable, "pdf");
    logInfoMessage(`The downloaded Document Name: ` + downloadedDocumentName);


    if (downloadedDocumentName.includes(ExpectedDownloadFileName)) {
        logSuccessMessage(`Validate the downloaded Document Name: Test passed!`);
    } else {
        logFailTestcase(false, `Incorrect the downloaded Document Name!`);
    }

    //expiry popover validation
    temp = await accountTabPolicyTimeLinePopover.clickExpiryButtonOnPolicyTimeline();
    logFailTestcase(temp, `policy Expiry TimeLine Popover was not shown on policy timeline!`);

    await globalPageObject.waitForSeconds(1000);
    temp = await accountTabPolicyTimeLinePopover.validatePopoverTitle("END DATE: " + EndDate);
    logFailTestcase(temp, `policy TimeLine Popover end date title is not valid!`);
    //#endregion

    //#region PREMIUM
    logInfoMessage("\n\t => Premium Section:");
    if (PremiumFilePath) {
        const row = loader(convertPathFileDataToDataRegression(PremiumFilePath))[0];
        const rowTemp = {
            "PremiumExlTaxAnnualPremium": row.PremiumExlTaxAnnualPremium,
            "UnderwritingAdjustmentAnnualPremium": row.UnderwritingAdjustmentAnnualPremium,
            "SalesDiscountAnnualPremium": row.SalesDiscountAnnualPremium,
            "ProductCommissionAnnualPremium": row.ProductCommissionAnnualPremium,
            "SalesCommissionAnnualPremium": row.SalesCommissionAnnualPremium,
            "TaxAnnualPremium": row.TaxAnnualPremium,
            "TotalPremiumAnnualPremium": TotalPremiumAnnualPremium, /// lấy của file khác

            "PremiumExlTaxPolicyPremium": row.PremiumExlTaxPolicyPremium,
            "UnderwritingAdjustmentPolicyPremium": row.UnderwritingAdjustmentPolicyPremium,
            "SalesDiscountPolicyPremium": row.SalesDiscountPolicyPremium,
            "ProductCommissionPolicyPremium": row.ProductCommissionPolicyPremium,
            "SalesCommissionPolicyPremium": row.SalesCommissionPolicyPremium,
            "TaxPolicyPremium": row.TaxPolicyPremium,
            "TotalPremiumPolicyPremium": TotalPremiumPolicyPremium ///
        }
        await verifyPremiumSectionOnPolicyDetails(accountTabPolicyDetails, rowTemp, Currency);
    }
    //COVER BREAKDOWN 
    if (CoverBreakdownFilePath) {
        const rows = loader(convertPathFileDataToDataRegression(CoverBreakdownFilePath));
        await verifyCoverBreakdownOnPolicyDetails(accountTabPolicyDetails, rows, Currency);
    }
    //#endregion


    //#endregion
});

Then(`User verifies policy information at policy detail page for Varsam product {string}`, async (dataKey) => {
    // const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const data = await DataRepo.getInstance().loadData(dataKey);
    // const page = new QuoteCreateFritidshusPage(this.context.driverService);

    let SalesChannel = data.SalesChannel;
    let Product = data.ProductName
    let StartDate = data.StartDate;
    let EndDate = data.EndDate;
    let StartDateMinusToday = data.StartDateMinusToday;
    let EndDateMinusStartDate = data.EndDateMinusStartDate;
    let TotalPremiumAnnualPremium = data.TotalPremium_AnnualPremium;
    let TotalPremiumPolicyPremium = data.TotalPremium_PolicyPremium;
    let StatusPolicy = data.StatusPolicy;
    let NameOfPreviousInsurer = data.NameOfPreviousInsurer;
    let RenewalMode = data.RenewalMode;
    let Currency = data.Currency;
    let TemplateDocName = data.TemplateDocName;
    let QuoteReference = getValueDataOfDataTestExecution("QuoteReference").split("/")[0];

    let ExpectedDownloadFileName = TemplateDocName ? TemplateDocName + " " + QuoteReference.split("/")[0] : QuoteReference;

    if (StartDateMinusToday && EndDateMinusStartDate) {
        StartDate = getDate(StartDateMinusToday);
        EndDate = addDate(StartDate, EndDateMinusStartDate);
    }
    let EffectiveDate = data.EffectiveDate;
    if (!EffectiveDate) {
        EffectiveDate = StartDate;
        if (data.EffectiveDateMinusToday) {
            EffectiveDate = getDate(data.EffectiveDateMinusToday);
        }
    }

    let temp = true;
    //#region POLICY INFO
    logInfoMessage("\n\t => Policy Info Section:\n");
    let rowTemp0 = {
        "Period": StartDate + " - " + EndDate,
        "Product": Product,
        "SalesChannel": SalesChannel,
        "EffectiveDate": EffectiveDate,
        "TotalPremiumAnnualPremium": TotalPremiumAnnualPremium,
        "TotalPremiumPolicyPremium": TotalPremiumPolicyPremium,
        "StatusPolicy": StatusPolicy,
        "NameOfPreviousInsurer": NameOfPreviousInsurer,
        "RenewalMode": RenewalMode,
    }
    await verifyPolicyInforOnPolicyDetails(accountTabPolicyDetails, rowTemp0, Currency);
    // #endregion


    //#region POLICY TIMELINE
    //start date popover validation
    let dataStartDatePolicyTimeLine;
    let dataAdjustmentEffectedDateTimeline;
    try {
        dataStartDatePolicyTimeLine = data.PolicyTimelineStartDatePopover[0];
        dataAdjustmentEffectedDateTimeline = data.PolicyTimelineAdjustmentEffectedDatePopover[0];
    } catch (error) {
        console.log(error);
    }

    if (dataStartDatePolicyTimeLine) {
        await globalPageObject.waitForSeconds(2000);
        temp = await accountTabPolicyTimeLinePopover.clickStartDateButtonOnPolicyTimeline();
        logFailTestcase(temp, `policy TimeLine Popover was not shown on policy timeline!`);
        await globalPageObject.waitForSeconds(3000);
        temp = await accountTabPolicyTimeLinePopover.validatePopoverTitle("DETAILS FROM " + StartDate);
        logFailTestcase(temp, `policy TimeLine Popover start date title is not valid!`);

        let dataStartDateKey = Object.keys(dataStartDatePolicyTimeLine);
        for (const key of dataStartDateKey) {
            temp = await accountTabPolicyTimeLinePopover.validateValueByFieldAtPopover(dataStartDatePolicyTimeLine[key], key);
            logFailTestcase(temp, `policy TimeLine ${key} field Value is not valid!`);
        }
        await accountTabPolicyTimeLinePopover.clickStartDateButtonOnPolicyTimeline();
    }


    if (dataAdjustmentEffectedDateTimeline) {
        temp = await accountTabPolicyTimeLinePopover.clickAdjustmentEffectedDateButtonOnPolicyTimeline();
        logFailTestcase(temp, `policy TimeLine Popover was not shown on policy timeline!`);

        temp = await accountTabPolicyTimeLinePopover.validatePopoverTitle("DETAILS FROM " + EffectiveDate);
        logFailTestcase(temp, `policy TimeLine Popover Effective Date title is not valid!`);

        let dataEffectedDateKey = Object.keys(dataAdjustmentEffectedDateTimeline);
        for (const key of dataEffectedDateKey) {
            temp = await accountTabPolicyTimeLinePopover.validateValueByFieldAtPopover(dataAdjustmentEffectedDateTimeline[key], key);
            logFailTestcase(temp, `policy TimeLine Popover  field Value is not valid!`);
        }

    }

    await globalPageObject.closeAllToastSuccess();
    await globalPageObject.closeAllToastError();
    temp = await accountTabPolicyTimeLinePopover.validateValueByFieldAtPopover(ExpectedDownloadFileName, "Insurance Certificate");
    logFailTestcase(temp, `policy TimeLine Popover Insurance Certificate field Value is not valid!`);

    temp = await accountTabPolicyTimeLinePopover.validateInsuranceCertificateIcon();
    logFailTestcase(temp, `Insurance CertificateIcon is not valid!`);

    //verify download policy document on popover
    temp = await accountTabPolicyTimeLinePopover.downloadInsuranceCertificateDocument();
    logFailTestcase(temp, `Can not download certificate on popover!`);
    await globalPageObject.waitForProgressBarLoaded_v2();
    let downloadedDocumentName = getTheFirstFileNameByPathInFolder(DownloadFilePathGlobalVariable, "pdf");
    logInfoMessage(`The downloaded Document Name: ` + downloadedDocumentName);


    if (downloadedDocumentName.includes(ExpectedDownloadFileName)) {
        logSuccessMessage(`Validate the downloaded Document Name: Test passed!`);
    } else {
        logFailTestcase(false, `Incorrect the downloaded Document Name!`);
    }

    //expiry popover validation
    temp = await accountTabPolicyTimeLinePopover.clickExpiryButtonOnPolicyTimeline();
    logFailTestcase(temp, `policy Expiry TimeLine Popover was not shown on policy timeline!`);

    await globalPageObject.waitForSeconds(1000);
    temp = await accountTabPolicyTimeLinePopover.validatePopoverTitle("END DATE: " + EndDate);
    logFailTestcase(temp, `policy TimeLine Popover end date title is not valid!`);
    //#endregion

    // #region PREMIUM
    logInfoMessage("\n\t => Premium Section:");
    const rowTemp = {
        "PremiumExlTaxAnnualPremium": data.Premium[0].AnnualPremium_PremiumExlTax,
        "UnderwritingAdjustmentAnnualPremium": data.Premium[0].AnnualPremium_UnderwritingAdjustment,
        "SalesDiscountAnnualPremium": data.Premium[0].AnnualPremium_SalesDiscount,
        "ProductCommissionAnnualPremium": data.Premium[0].AnnualPremium_ProductCommission,
        "SalesCommissionAnnualPremium": data.Premium[0].AnnualPremium_SalesCommission,
        "TaxAnnualPremium": data.Premium[0].AnnualPremium_Tax,
        "TotalPremiumAnnualPremium": data.Premium[0].TotalPremium_AnnualPremium,

        "PremiumExlTaxPolicyPremium": data.Premium[1].PolicyPremium_PremiumExlTax,
        "UnderwritingAdjustmentPolicyPremium": data.Premium[1].PolicyPremium_UnderwritingAdjustment,
        "SalesDiscountPolicyPremium": data.Premium[1].PolicyPremium_SalesDiscount,
        "ProductCommissionPolicyPremium": data.Premium[1].PolicyPremium_ProductCommission,
        "SalesCommissionPolicyPremium": data.Premium[1].PolicyPremium_SalesCommission,
        "TaxPolicyPremium": data.Premium[1].PolicyPremium_Tax,
        "TotalPremium_PolicyPremium": data.Premium[1].TotalPremium_PolicyPremium
    }
    await verifyPremiumSectionOnPolicyDetails(accountTabPolicyDetails, rowTemp, Currency);


    //COVER BREAKDOWN 
    logInfoMessage("\n\t => COVER BREAKDOWN Section:");
    if (data.CoverBreakdown.length == 2) { 
        /* Dùng cho trường hợp product có COVER BREAKDOWN có 3 cột:
        - Cover
        - Annual Premium
        - Policy Premium
        */
        let arrayKeyCoverBreakdownAnnualPremium = Object.keys(data.CoverBreakdown[0]);
        let arrayKeyCoverBreakdownPolicyPremium = Object.keys(data.CoverBreakdown[1]);

        for (let i = 0; i < arrayKeyCoverBreakdownAnnualPremium.length; i++) {

            temp = await policyDetails.validateCoverBreakdownByIndex(numberToCurrency(data.CoverBreakdown[0][arrayKeyCoverBreakdownAnnualPremium[i]], true, Currency), i + 1, 2);
            logFailTestcase(temp, `Validate Cover BreakDown Annual Premium field ${arrayKeyCoverBreakdownAnnualPremium[i]} failed!`);

            temp = await policyDetails.validateCoverBreakdownByIndex(numberToCurrency(data.CoverBreakdown[1][arrayKeyCoverBreakdownPolicyPremium[i]], true, Currency), i + 1, 3);
            logFailTestcase(temp, `Validate Cover BreakDown Policy Premium field ${arrayKeyCoverBreakdownPolicyPremium[i]} failed!`);
        }
    }else if(data.CoverBreakdown.length > 2){
        /* Dùng cho trường hợp product có COVER BREAKDOWN có 5 cột:
        - Cover
        - Annual Premium
        - Annual Naturskade
        - Policy Premium
        - Naturskade
        */
       
        for (let i = 0; i < data.CoverBreakdown.length; i++) {
            let arrayKeyCoverBreakdownKeys = Object.keys(data.CoverBreakdown[i]);

            let Cover = data.CoverBreakdown[i][arrayKeyCoverBreakdownKeys[0]];
            let AnnualPremium = data.CoverBreakdown[i][arrayKeyCoverBreakdownKeys[1]];
            let AnnualIPT = data.CoverBreakdown[i][arrayKeyCoverBreakdownKeys[2]];
            let Premium = data.CoverBreakdown[i][arrayKeyCoverBreakdownKeys[3]];
            let IPT = data.CoverBreakdown[i][arrayKeyCoverBreakdownKeys[4]];

            temp = await policyDetails.validateCoverBreakdownByIndex(Cover, i+1 , 1);
            logFailTestcase(temp, `Validate Cover BreakDown field Cover failed!`);

            temp = await policyDetails.validateCoverBreakdownByIndex(AnnualPremium ? numberToCurrency(AnnualPremium, true, Currency) : "N/A", i+1 , 2);
            logFailTestcase(temp, `Validate Cover BreakDown field AnnualPremium failed!`);

            temp = await policyDetails.validateCoverBreakdownByIndex(AnnualIPT ? numberToCurrency(AnnualIPT, true, Currency) : "N/A", i+1 , 3);
            logFailTestcase(temp, `Validate Cover BreakDown field AnnualIPT failed!`);

            temp = await policyDetails.validateCoverBreakdownByIndex(Premium ? numberToCurrency(Premium, true, Currency) : "N/A", i+1 , 4);
            logFailTestcase(temp, `Validate Cover BreakDown field Premium failed!`);

            temp = await policyDetails.validateCoverBreakdownByIndex(IPT ? numberToCurrency(IPT, true, Currency) : "N/A", i+1 , 5);
            logFailTestcase(temp, `Validate Cover BreakDown field IPT failed!`);
        }
    }

    //#endregion


    //#endregion
});

When("User downloads first document on Policy detail", async () => {
    let temp = await policyDetails.pressDownloadDocument();
    logFailTestcase(temp, `Press hyperlink to download document failed!`);
});

When("User verifies Payment schedule at Policy detail page {string}", async (filename) => {
    let row = await DataRepo.getInstance().loadData(filename);
    if (filename.includes("csv")) {
        row = row[0];
    }

    let StartDate = row.StartDate;
    let EndDate = row.EndDate;
    let StartDateMinusToday = row.StartDateMinusToday;
    let EndDateMinusStartDate = row.EndDateMinusStartDate;

    // Cột Policy Premium
    const SalesCommissionPolicyPremium = getDataTestCaseObjectByNameField("SalesCommissionPolicyPremium")?.message[0];
    const TaxPolicyPremium = getDataTestCaseObjectByNameField("TaxPolicyPremium")?.message[0];
    const TotalPremiumPolicyPremium = row.TotalPremiumPolicyPremium || row.Premium[1].TotalPremium_PolicyPremium;
    const Currency = row.Currency;
    const PaymentFrequency = getDataTestCaseObjectByNameField("PaymentFrequency")?.message[0];

    if (StartDateMinusToday && EndDateMinusStartDate) {
        StartDate = getDate(StartDateMinusToday);
        EndDate = addDate(StartDate, EndDateMinusStartDate);
    }

    switch (PaymentFrequency) {
        case 'Annually': {
            calculatePriceForPaymentScheduleAnnually(StartDate, EndDate, TotalPremiumPolicyPremium, SalesCommissionPolicyPremium, TaxPolicyPremium);
            break;
        }
        case 'Monthly': {
            calculatePriceForPaymentScheduleMonthly(StartDate, EndDate, TotalPremiumPolicyPremium, SalesCommissionPolicyPremium, TaxPolicyPremium);
            break;
        }
        case 'Semi-Annually': {
            calculatePriceForPaymentScheduleSemiAnnually(StartDate, EndDate, TotalPremiumPolicyPremium, SalesCommissionPolicyPremium, TaxPolicyPremium);
            break;
        }
        case 'Quarterly': {
            calculatePriceForPaymentScheduleQuarterly(StartDate, EndDate, TotalPremiumPolicyPremium, SalesCommissionPolicyPremium, TaxPolicyPremium);
            break;
        }
        default: {
            logFailTestcase(false, `We have NOT supported for "${PaymentFrequency}"!`);
            break;
        }
    }
    let temp = true;
    let i = 1;
    for (const iterator of dataTestcase) {
        if (iterator.nameField.includes("PaymentSchedule")) {
            logInfoMessage(`Checking at line ${i} at Payment schedule...`);
            temp = await accountTabPolicyDetails.validateValueType_PaymentSchedule("Normal", i);
            logFailTestcase(temp, "Incorrect type");

            temp = await accountTabPolicyDetails.validateValueTotal_PaymentSchedule(`${iterator.message[2]} ${Currency}`, i);
            logFailTestcase(temp, `Incorrect Total`);

            temp = await accountTabPolicyDetails.validateValueTax_PaymentSchedule(`${iterator.message[3]} ${Currency}`, i);
            logFailTestcase(temp, `Incorrect Tax`);

            temp = await accountTabPolicyDetails.validateValueCommission_PaymentSchedule(`${iterator.message[4]} ${Currency}`, i);
            logFailTestcase(temp, `Incorrect Commission`);

            temp = await accountTabPolicyDetails.validateValuePeriod_PaymentSchedule(`${iterator.message[0]} - ${iterator.message[1]}`, i);
            logFailTestcase(temp, `Incorrect Period`);

            // DueDate, BookingRef, BookingOn, Status?????
            logInfoMessage(`DueDate, BookingRef, BookingOn, Status are NOT verified...`);
            logSuccessMessage(`\t=> Line ${i} passed!`);
            i++;
        }
    }
});

//#region Function Calculate prices for Payment schedule at Policy detail
//#region Annually
function calculatePriceForPaymentScheduleAnnually(startDate: any, endDate: any, totalPremiumPolicyPremium: any, saleCommissionPolicyPremium: any, taxPolicyPremium: any) {
    let startDateTemp = startDate;
    let count = 0;
    for (let i = 1, j = 0; i <= 20 && j === 0; i++) {
        let endDateTemp = addDate(addYear(startDateTemp, 1), -1);
        if (compareDate(endDate, endDateTemp) >= 0) {
            endDateTemp = endDate;
            j++;
        }
        dataTestcase.push(new ValidateField("PaymentScheduleAnnually", i, true, [startDateTemp, endDateTemp, 0, 0, 0, "bookingOn?", "dueDate?", "bookingRef?", "Status?"], []));
        startDateTemp = addDate(endDateTemp, 1);
        count++;
    }
    const total = currencyToNumber(numberToCurrency(parseFloat(totalPremiumPolicyPremium) / count));
    const tax = currencyToNumber(numberToCurrency(parseFloat(taxPolicyPremium) / count));
    const commission = currencyToNumber(numberToCurrency(parseFloat(saleCommissionPolicyPremium) / count));
    for (let iterator of dataTestcase) {
        if (iterator.nameField === "PaymentScheduleAnnually") {
            if (iterator.index === 1) {
                iterator.message[2] = numberToCurrency((parseFloat(totalPremiumPolicyPremium) - total * (count - 1)).toString());
                iterator.message[3] = numberToCurrency((parseFloat(taxPolicyPremium) - tax * (count - 1)).toString());
                iterator.message[4] = numberToCurrency((parseFloat(saleCommissionPolicyPremium) - commission * (count - 1)).toString());
            }
            else {
                iterator.message[2] = numberToCurrency(total);
                iterator.message[3] = numberToCurrency(tax);
                iterator.message[4] = numberToCurrency(commission);
            }
        }
    }
}
//#endregion

//#region Monthly
function calculatePriceForPaymentScheduleMonthly(startDate: any, endDate: any, totalPremiumPolicyPremium: any, saleCommissionPolicyPremium: any, taxPolicyPremium: any) {
    let startDateTemp = startDate;
    let count = 0;
    for (let i = 1, j = 0; i <= 20 && j === 0; i++) {
        let endDateTemp = addDate(addMonth(startDateTemp, 1), -1);
        if (compareDate(endDate, endDateTemp) >= 0) {
            endDateTemp = endDate;
            j++;
        }
        dataTestcase.push(new ValidateField("PaymentScheduleMonthly", i, true, [startDateTemp, endDateTemp, 0, 0, 0, "bookingOn?", "dueDate?", "bookingRef?", "Status?"], []));
        startDateTemp = addDate(endDateTemp, 1);
        count++;
    }
    const total = currencyToNumber(numberToCurrency(parseFloat(totalPremiumPolicyPremium) / count));
    const tax = currencyToNumber(numberToCurrency(parseFloat(taxPolicyPremium) / count));
    const commission = currencyToNumber(numberToCurrency(parseFloat(saleCommissionPolicyPremium) / count));
    for (let iterator of dataTestcase) {
        if (iterator.nameField === "PaymentScheduleMonthly") {
            if (iterator.index === 1) {
                iterator.message[2] = numberToCurrency((parseFloat(totalPremiumPolicyPremium) - total * (count - 1)).toString());
                iterator.message[3] = numberToCurrency((parseFloat(taxPolicyPremium) - tax * (count - 1)).toString());
                iterator.message[4] = numberToCurrency((parseFloat(saleCommissionPolicyPremium) - commission * (count - 1)).toString());
            }
            else {
                iterator.message[2] = numberToCurrency(total);
                iterator.message[3] = numberToCurrency(tax);
                iterator.message[4] = numberToCurrency(commission);
            }
        }
    }
}
//#endregion

//#region Semi-Annually
function calculatePriceForPaymentScheduleSemiAnnually(startDate: any, endDate: any, totalPremiumPolicyPremium: any, saleCommissionPolicyPremium: any, taxPolicyPremium: any) {
    let startDateTemp = startDate;
    let count = 0;
    for (let i = 1, j = 0; i <= 20 && j === 0; i++) {
        let endDateTemp = addDate(addMonth(startDateTemp, 6), -1);
        if (compareDate(endDate, endDateTemp) >= 0) {
            endDateTemp = endDate;
            j++;
        }
        dataTestcase.push(new ValidateField("PaymentScheduleSemiAnnually", i, true, [startDateTemp, endDateTemp, 0, 0, 0, "bookingOn?", "dueDate?", "bookingRef?", "Status?"], []));
        startDateTemp = addDate(endDateTemp, 1);
        count++;
    }
    const total = currencyToNumber(numberToCurrency(parseFloat(totalPremiumPolicyPremium) / count));
    const tax = currencyToNumber(numberToCurrency(parseFloat(taxPolicyPremium) / count));
    const commission = currencyToNumber(numberToCurrency(parseFloat(saleCommissionPolicyPremium) / count));
    for (let iterator of dataTestcase) {
        if (iterator.nameField === "PaymentScheduleSemiAnnually") {
            if (iterator.index === 1) {
                iterator.message[2] = numberToCurrency((parseFloat(totalPremiumPolicyPremium) - total * (count - 1)).toString());
                iterator.message[3] = numberToCurrency((parseFloat(taxPolicyPremium) - tax * (count - 1)).toString());
                iterator.message[4] = numberToCurrency((parseFloat(saleCommissionPolicyPremium) - commission * (count - 1)).toString());
            }
            else {
                iterator.message[2] = numberToCurrency(total);
                iterator.message[3] = numberToCurrency(tax);
                iterator.message[4] = numberToCurrency(commission);
            }
        }
    }
}
//#endregion

//#region Quarterly
function calculatePriceForPaymentScheduleQuarterly(startDate: any, endDate: any, totalPremiumPolicyPremium: any, saleCommissionPolicyPremium: any, taxPolicyPremium: any) {
    let startDateTemp = startDate;
    let count = 0;
    for (let i = 1, j = 0; i <= 20 && j === 0; i++) {
        let endDateTemp = addDate(addMonth(startDateTemp, 3), -1);
        if (compareDate(endDate, endDateTemp) >= 0) {
            endDateTemp = endDate;
            j++;
        }
        dataTestcase.push(new ValidateField("PaymentScheduleQuarterly", i, true, [startDateTemp, endDateTemp, 0, 0, 0, "bookingOn?", "dueDate?", "bookingRef?", "Status?"], []));
        startDateTemp = addDate(endDateTemp, 1);
        count++;
    }
    const total = currencyToNumber(numberToCurrency(parseFloat(totalPremiumPolicyPremium) / count));
    const tax = currencyToNumber(numberToCurrency(parseFloat(taxPolicyPremium) / count));
    const commission = currencyToNumber(numberToCurrency(parseFloat(saleCommissionPolicyPremium) / count));
    for (let iterator of dataTestcase) {
        if (iterator.nameField === "PaymentScheduleQuarterly") {
            if (iterator.index === 1) {
                iterator.message[2] = numberToCurrency((parseFloat(totalPremiumPolicyPremium) - total * (count - 1)).toString());
                iterator.message[3] = numberToCurrency((parseFloat(taxPolicyPremium) - tax * (count - 1)).toString());
                iterator.message[4] = numberToCurrency((parseFloat(saleCommissionPolicyPremium) - commission * (count - 1)).toString());
            }
            else {
                iterator.message[2] = numberToCurrency(total);
                iterator.message[3] = numberToCurrency(tax);
                iterator.message[4] = numberToCurrency(commission);
            }
        }
    }
}
//#endregion
//#endregion