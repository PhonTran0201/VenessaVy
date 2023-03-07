import { Before, Given, When } from "@cucumber/cucumber";
import { AccountTabQuoteCreatingQuoteGeneralProductTravel } from "../../../../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-quote/General-channel/AccountTabQuoteCreatingQuoteGeneralProductTravel";
import { GlobalPageObject } from "../../../../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { UnderwritingAdjustmentReasonForm } from "../../../../../../../page-objects/back-office-portal/general/quote/underwriting-adjustment-reason/UnderwritingAdjustmentReasonForm";
import { addDate, addYear, convertPathFileDataToDataRegression, getCurrentDateTime, getDate, logFailTestcase, logInfoMessage } from "../../../../../../../shared/functions";
import { ICommonContext } from "../../../../../../../shared/interfaces";
import { UserProfileInfo } from "../../../../../../../shared/user-profile/UserProfileInfo";
import { getValueDataOfDataTestExecution, pushObjectToDataArrayWithUniqueKey } from "../../../../../../../storage-data/functions/data-test-execution";
import { checkValidationPremiumSectionOnCreatingQuote, inputPremiumSectionOnCreatingQuote, verifyCoverBreakdownOnCreatingQuote, verifyPremiumSectionOnCreatingQuote } from "../quote-creating-quote-function";


let accountTabQuoteCreatingQuoteGeneralProductTravel: AccountTabQuoteCreatingQuoteGeneralProductTravel;
let globalPageObject: GlobalPageObject;
const loader = require("csv-load-sync");
let underwritingAdjustmentReasonForm: UnderwritingAdjustmentReasonForm;

Before(async function () {
    const context: ICommonContext = this.context;
    accountTabQuoteCreatingQuoteGeneralProductTravel = new AccountTabQuoteCreatingQuoteGeneralProductTravel(context.driverService);
    globalPageObject = new GlobalPageObject(context.driverService);
    underwritingAdjustmentReasonForm = new UnderwritingAdjustmentReasonForm(context.driverService);
});

Given("User verifies info on Creating Quote form for General product Travel {string}", async function (filename) {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const row = rows[0];

    const QuoteReference = getValueDataOfDataTestExecution("QuoteReference");
    const AlertMessages = row.AlertMessages;
    let startDate = row.StartDate;
    let endDate = row.EndDate;
    const StartDateMinusToday = row.StartDateMinusToday;
    const EndDateMinusStartDate = row.EndDateMinusStartDate;
    const ExpiryDate = getDate(30);// Theo setting mặc định thì sẽ bằng 30 ngày
    const Product = row.Product;
    const SalesPerson = "Sales Person:\n " + UserProfileInfo.getDisplayName() + " - Organization: " + UserProfileInfo.getOrganization();
    const CoverBreakdownFilePath = row.CoverBreakdownFilePath;
    const Currency = row.Currency;

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

    let temp = true;

    temp = await accountTabQuoteCreatingQuoteGeneralProductTravel.validateQuoteRef(QuoteReference);
    logFailTestcase(temp, `Incorrect Quote Ref`);


    temp = await accountTabQuoteCreatingQuoteGeneralProductTravel.validateSalesPerson(SalesPerson);
    // logFailTestcase(temp, `Incorrect SalesPerson`);

    if (AlertMessages) {
        logInfoMessage("\tALERT MESSAGES:");
        const alerts = AlertMessages.split(";");
        for (const alert of alerts) {
            temp = await accountTabQuoteCreatingQuoteGeneralProductTravel.isAlertMessageExisted(alert);
            logFailTestcase(temp, `NOT found alert message "${alert}"!`);
        }
    }


    logInfoMessage("\tINSURANCE INFORMATION:");
    temp = await accountTabQuoteCreatingQuoteGeneralProductTravel.validatePolicyTerm_InsuranceInformation(startDate + " - " + endDate);
    logFailTestcase(temp, `Incorrect Policy term`);

    temp = await accountTabQuoteCreatingQuoteGeneralProductTravel.validateExpiryDate_InsuranceInformation(ExpiryDate);
    logFailTestcase(temp, `Incorrect Expiry Date`);

    temp = await accountTabQuoteCreatingQuoteGeneralProductTravel.validateProduct_InsuranceInformation(Product);
    logFailTestcase(temp, `Incorrect Product!`);

    logInfoMessage("\tPREMIUM:");
    await verifyPremiumSectionOnCreatingQuote(accountTabQuoteCreatingQuoteGeneralProductTravel, row);

    if (CoverBreakdownFilePath) {
        logInfoMessage("\tCOVER BREAKDOWN:");
        const rows = loader(convertPathFileDataToDataRegression(CoverBreakdownFilePath));
        await verifyCoverBreakdownOnCreatingQuote(accountTabQuoteCreatingQuoteGeneralProductTravel, rows, Currency);
    }
});

Given("User inputs data at Premium section on Creating Quote form for General product Travel {string}", async function (filename) {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const row = {
        "UnderwritingAdjustment": rows[0].UnderwritingAdjustment,
        "SalesDiscount": rows[0].SalesDiscount,
        "ProductCommission": rows[0].ProductCommission,
        "SalesCommission": rows[0].SalesCommission
    }
    pushObjectToDataArrayWithUniqueKey("rateOfUnderwritingAdjustment", row.UnderwritingAdjustment);
    pushObjectToDataArrayWithUniqueKey("rateOfSalesDiscount", row.SalesDiscount);
    pushObjectToDataArrayWithUniqueKey("rateOfProductCommission", row.ProductCommission);
    pushObjectToDataArrayWithUniqueKey("rateOfSalesCommission", row.SalesCommission);

    await inputPremiumSectionOnCreatingQuote(accountTabQuoteCreatingQuoteGeneralProductTravel, row);
});

When("User verifies the calculation function at Premium section on Creating Quote form for General product Travel {string}", async function (filename) {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    let temp = true;
    await globalPageObject.waitForProgressBarLoaded_v2();
    for (let i = 0; i < rows.length; i++) {
        logInfoMessage(`Checking Calculation Premium at line ${i + 1}...`);
        logInfoMessage(`\tInput value into Premium section:`);
        await inputPremiumSectionOnCreatingQuote(accountTabQuoteCreatingQuoteGeneralProductTravel, rows[i]);

        temp = await accountTabQuoteCreatingQuoteGeneralProductTravel.pressCalculateButton_Premium();
        logFailTestcase(temp, `Press Calculation at Premium section failed!`);
        await globalPageObject.waitForProgressBarLoaded_v2(500);
        await globalPageObject.waitForProgressBarLoaded_v2(500);
        await globalPageObject.waitForProgressBarLoaded_v2(500);


        logInfoMessage(`\tVerify info of Premium section`);
        await verifyPremiumSectionOnCreatingQuote(accountTabQuoteCreatingQuoteGeneralProductTravel, rows[i]);
    }
});
When("User verifies the revert function at Premium section on Creating Quote form for General product Travel {string}", async function (filename) {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    let temp = true;

    //#region Kiểm tra Revert lúc đầu (chưa Calculate)
    logInfoMessage(`\n\nCheck Revert with initial info:\n`);

    // Save initial value: Underwriting adjustment, Sales discount, Product commission, Sales commission
    logInfoMessage("\tSave initial value:");
    let UnderwritingAdjustment = await accountTabQuoteCreatingQuoteGeneralProductTravel.getValueUnderwritingAdjustment_Premium();
    let SalesDiscount = await accountTabQuoteCreatingQuoteGeneralProductTravel.getValueSalesDiscount_Premium();
    let ProductCommission = await accountTabQuoteCreatingQuoteGeneralProductTravel.getValueProductCommission_Premium();
    let SalesCommission = await accountTabQuoteCreatingQuoteGeneralProductTravel.getValueSalesCommission_Premium();
    const UnderwritingAdjustmentReason = rows[0].UnderwritingAdjustmentReason;


    logInfoMessage(`\tInput new value into Premium section:`);
    await inputPremiumSectionOnCreatingQuote(accountTabQuoteCreatingQuoteGeneralProductTravel, rows[0]);


    const AlertWarningRevert = rows[0].AlertWarningRevert;
    logInfoMessage(`\tCheck Alert warning at Premium section:`);

    temp = await accountTabQuoteCreatingQuoteGeneralProductTravel.validateAlertWarning_Premium(AlertWarningRevert);
    logFailTestcase(temp, `Incorrect Alert warning`);

    temp = await accountTabQuoteCreatingQuoteGeneralProductTravel.pressRevertButton_Premium();
    logFailTestcase(temp, `Press Revert at Premium section failed!`);

    await globalPageObject.waitForProgressBarLoaded_v2(500);
    logInfoMessage(`\tVerify input fields:`);

    temp = await accountTabQuoteCreatingQuoteGeneralProductTravel.validateValueUnderwritingAdjustment_Premium(UnderwritingAdjustment);
    logFailTestcase(temp, "Incorrect UnderwritingAdjustment");

    temp = await accountTabQuoteCreatingQuoteGeneralProductTravel.validateValueSalesDiscount_Premium(SalesDiscount);
    logFailTestcase(temp, `Incorrect SalesDiscount`);

    temp = await accountTabQuoteCreatingQuoteGeneralProductTravel.validateValueProductCommission_Premium(ProductCommission);
    logFailTestcase(temp, `Incorrect ProductCommission`);

    temp = await accountTabQuoteCreatingQuoteGeneralProductTravel.validateValueSalesCommission_Premium(SalesCommission);
    logFailTestcase(temp, `Incorrect SalesCommission`);
    logInfoMessage(`\tVerify info of Premium section`);

    await verifyPremiumSectionOnCreatingQuote(accountTabQuoteCreatingQuoteGeneralProductTravel, rows[0]);

    //#endregion



    //#region Kiểm tra Revert sau khi đã Calculate

    logInfoMessage(`\n\nCheck Revert after press Calculate:\n`);
    logInfoMessage(`\tInput new value into Premium section:`);

    await inputPremiumSectionOnCreatingQuote(accountTabQuoteCreatingQuoteGeneralProductTravel, rows[1]);
    temp = await accountTabQuoteCreatingQuoteGeneralProductTravel.pressAddCommentUnderwritingAdjustment_Premium();
    logFailTestcase(temp, `Press AddCommentUnderwritingAdjustment failed!`);

    temp = await underwritingAdjustmentReasonForm.inputUnderwritingAdjustmentReason(UnderwritingAdjustmentReason);
    logFailTestcase(temp, `Input UnderwritingAdjustmentReason failed!`);

    temp = await underwritingAdjustmentReasonForm.pressOkButton();
    logFailTestcase(temp, `Press OK button failed!`);

    temp = await accountTabQuoteCreatingQuoteGeneralProductTravel.pressCalculateButton_Premium();
    logFailTestcase(temp, `Press Calculation at Premium section failed!`);

    await globalPageObject.waitForProgressBarLoaded_v2(500);
    await globalPageObject.waitForProgressBarLoaded_v2(500);
    await globalPageObject.waitForProgressBarLoaded_v2(500);



    logInfoMessage(`\tVerify info of Premium section`);
    await verifyPremiumSectionOnCreatingQuote(accountTabQuoteCreatingQuoteGeneralProductTravel, rows[1]);


    logInfoMessage("Save initial value:");
    UnderwritingAdjustment = await accountTabQuoteCreatingQuoteGeneralProductTravel.getValueUnderwritingAdjustment_Premium();
    SalesDiscount = await accountTabQuoteCreatingQuoteGeneralProductTravel.getValueSalesDiscount_Premium();
    ProductCommission = await accountTabQuoteCreatingQuoteGeneralProductTravel.getValueProductCommission_Premium();
    SalesCommission = await accountTabQuoteCreatingQuoteGeneralProductTravel.getValueSalesCommission_Premium();


    logInfoMessage(`\tInput new value into Premium section:`);
    await inputPremiumSectionOnCreatingQuote(accountTabQuoteCreatingQuoteGeneralProductTravel, rows[0]);


    temp = await accountTabQuoteCreatingQuoteGeneralProductTravel.pressRevertButton_Premium();
    logFailTestcase(temp, `Press Revert at Premium section failed!`);
    await globalPageObject.waitForProgressBarLoaded_v2(500);

    temp = await accountTabQuoteCreatingQuoteGeneralProductTravel.pressAddCommentUnderwritingAdjustment_Premium();
    logFailTestcase(temp, `Open AddCommentUnderwritingAdjustment form failed!`);


    temp = await underwritingAdjustmentReasonForm.validateValueUnderwritingAdjustmentReason(UnderwritingAdjustmentReason);
    logFailTestcase(temp, `Incorrect UnderwritingAdjustmentReason!`);

    temp = await underwritingAdjustmentReasonForm.pressOkButton();
    logFailTestcase(temp, `Press OK button failed!`);

    logInfoMessage(`\tVerify input fields:`);
    temp = await accountTabQuoteCreatingQuoteGeneralProductTravel.validateValueUnderwritingAdjustment_Premium(UnderwritingAdjustment);
    logFailTestcase(temp, "Incorrect UnderwritingAdjustment");

    temp = await accountTabQuoteCreatingQuoteGeneralProductTravel.validateValueSalesDiscount_Premium(SalesDiscount);
    logFailTestcase(temp, `Incorrect SalesDiscount`);

    temp = await accountTabQuoteCreatingQuoteGeneralProductTravel.validateValueProductCommission_Premium(ProductCommission);
    logFailTestcase(temp, `Incorrect ProductCommission`);

    temp = await accountTabQuoteCreatingQuoteGeneralProductTravel.validateValueSalesCommission_Premium(SalesCommission);
    logFailTestcase(temp, `Incorrect SalesCommission`);



    logInfoMessage(`\tVerify info of Premium section`);

    await verifyPremiumSectionOnCreatingQuote(accountTabQuoteCreatingQuoteGeneralProductTravel, rows[1]);

    //#endregion

});


When("User verifies the validation at Premium section on Creating Quote form for General product Travel {string}", async function (filename) {

    const rows = loader(convertPathFileDataToDataRegression(filename));
    let temp = true;

    for (let i = 0; i < rows.length; i++) {
        await globalPageObject.waitForProgressBarLoaded_v2(500);
        await globalPageObject.waitForProgressBarLoaded_v2(500);
        logInfoMessage(`\n\nCheck validation at line ${i + 1}...`);
        logInfoMessage(`\tInput value into Premium section:`);
        await inputPremiumSectionOnCreatingQuote(accountTabQuoteCreatingQuoteGeneralProductTravel, rows[i]);

        await globalPageObject.waitForProgressBarLoaded_v2();
        logInfoMessage(`\tValidate validation messge at Premium section:`);
        await checkValidationPremiumSectionOnCreatingQuote(accountTabQuoteCreatingQuoteGeneralProductTravel, rows[i]);

        temp = await accountTabQuoteCreatingQuoteGeneralProductTravel.isCalculationButtonDisabled();
        logFailTestcase(temp, `Button Calculate should be disabled!`);

        temp = await accountTabQuoteCreatingQuoteGeneralProductTravel.pressRevertButton_Premium();
        logFailTestcase(temp, `Press Revert at Premium section failed!`);
        await globalPageObject.waitForProgressBarLoaded_v2(500);
    }

});

//#endregion
//#endregion