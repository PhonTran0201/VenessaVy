import { Before, Given } from "@cucumber/cucumber";
import { AccountTabQuoteCreateQuoteGeneralProductInnbo } from "../../../../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-quote/General-channel/AccountTabQuoteCreateQuoteGeneralProductInnbo";
import { AccountTabQuoteCreatingQuoteGeneralProductInnbo } from "../../../../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-quote/General-channel/AccountTabQuoteCreatingQuoteGeneralProductInnbo";
import { addDate, addYear, convertPathFileDataToDataRegression, getDate, logFailTestcase, logInfoMessage } from "../../../../../../../shared/functions";
import { ICommonContext } from "../../../../../../../shared/interfaces";
import { UserProfileInfo } from "../../../../../../../shared/user-profile/UserProfileInfo";
import { getValueDataOfDataTestExecution, pushObjectToDataArrayWithUniqueKey } from "../../../../../../../storage-data/functions/data-test-execution";
import { inputPremiumSectionOnCreatingQuote, verifyPremiumSectionOnCreatingQuote } from "../quote-creating-quote-function";



let accountTabQuoteCreateQuoteGeneralProductInnbo: AccountTabQuoteCreateQuoteGeneralProductInnbo;
let accountTabQuoteCreatingQuoteGeneralProductInnbo: AccountTabQuoteCreatingQuoteGeneralProductInnbo;
const loader = require("csv-load-sync");

Before(async function () {
    const context: ICommonContext = this.context;
    accountTabQuoteCreateQuoteGeneralProductInnbo = new AccountTabQuoteCreateQuoteGeneralProductInnbo(context.driverService);
    accountTabQuoteCreatingQuoteGeneralProductInnbo = new AccountTabQuoteCreatingQuoteGeneralProductInnbo(context.driverService);
});

Given("User verifies info on Create Quote form for General product Innbo {string}", async function (filename) {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const row = rows[0];

    const QuoteReference = await accountTabQuoteCreateQuoteGeneralProductInnbo.getQuoteRef();
    pushObjectToDataArrayWithUniqueKey("QuoteReference", QuoteReference);
    let startDate = row.StartDate;
    let endDate = row.EndDate;
    const StartDateMinusToday = row.StartDateMinusToday;
    const EndDateMinusStartDate = row.EndDateMinusStartDate;
    const FirstName = row.FirstName;
    const LastName = row.LastName;
    const DOB = row.DOB;
    const AddressLine = row.AddressLine;
    const AddressPostcode = row.AddressPostcode;
    const AddressCity = row.AddressCity;



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

    temp = await accountTabQuoteCreateQuoteGeneralProductInnbo.validateStartDate(startDate);
    logFailTestcase(temp, `Incorrect Start Date`);

    temp = await accountTabQuoteCreateQuoteGeneralProductInnbo.validateEndDate(endDate);
    logFailTestcase(temp, `Incorrect End Date`);

    //section POLISEHOLDER
    temp = await accountTabQuoteCreateQuoteGeneralProductInnbo.validateFirstName(FirstName);
    logFailTestcase(temp, `Incorrect FirstName`);

    temp = await accountTabQuoteCreateQuoteGeneralProductInnbo.validateLastName(LastName);
    logFailTestcase(temp, `Incorrect LastName`);

    temp = await accountTabQuoteCreateQuoteGeneralProductInnbo.validateDOB(DOB);
    logFailTestcase(temp, `Incorrect DOB`);

    //section BYGNINGS DETALJER

    temp = await accountTabQuoteCreateQuoteGeneralProductInnbo.validateAddressLine(AddressLine);
    logFailTestcase(temp, `Incorrect AddressLine`);

    temp = await accountTabQuoteCreateQuoteGeneralProductInnbo.validateAddressPostcode(AddressPostcode);
    logFailTestcase(temp, `Incorrect AddressPostcode`);

    temp = await accountTabQuoteCreateQuoteGeneralProductInnbo.validateAddressCity(AddressCity);
    logFailTestcase(temp, `Incorrect AddressCity`);
});

Given("User inputs data on Create Quote form for General product Innbo {string}", async function (filename) {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const row = rows[0];
    let startDate = row.StartDate;
    let endDate = row.EndDate;
    pushObjectToDataArrayWithUniqueKey("QuoteReference", await accountTabQuoteCreateQuoteGeneralProductInnbo.getQuoteRef());
    const StartDateMinusToday = row.StartDateMinusToday;
    const EndDateMinusStartDate = row.EndDateMinusStartDate;
    const FirstName = row.FirstName;
    const LastName = row.LastName;
    const DOB = row.DOB;
    const AddressLine = row.AddressLine;
    const AddressPostcode = row.AddressPostcode;
    const AddressCity = row.AddressCity;
    const ConstructionMethod = row.ConstructionMethod;
    const Alarm = row.Alarm;
    const ContentSumInsured = row.ContentSumInsured;
    const ContentDeductible = row.ContentDeductible;
    const ContentCover = row.ContentCover;
    const Mushroom = row.Mushroom;
    const FreeText = row.FreeText;
    const TerminationText = row.TerminationText;

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
    if (startDate) {
        temp = await accountTabQuoteCreateQuoteGeneralProductInnbo.inputStartDate(startDate);
        logFailTestcase(temp, `Input start date failed!`);
    }
    if (endDate) {
        temp = await accountTabQuoteCreateQuoteGeneralProductInnbo.inputEndDate(endDate);
        logFailTestcase(temp, `Input End date failed!`);
    }
    if (FirstName) {
        temp = await accountTabQuoteCreateQuoteGeneralProductInnbo.inputFirstName(FirstName);
        logFailTestcase(temp, `Input LastName falied!`);
    }
    if (LastName) {
        temp = await accountTabQuoteCreateQuoteGeneralProductInnbo.inputLastName(LastName);
        logFailTestcase(temp, `Input LastName failed!`);
    }
    if (DOB) {
        temp = await accountTabQuoteCreateQuoteGeneralProductInnbo.inputDOB(DOB);
        logFailTestcase(temp, `Input DOB failed!`);
    }
    if (AddressLine) {
        temp = await accountTabQuoteCreateQuoteGeneralProductInnbo.inputAddressLine(AddressLine);
        logFailTestcase(temp, `Input AddressLine failed!`);
    }
    if (AddressPostcode) {
        temp = await accountTabQuoteCreateQuoteGeneralProductInnbo.inputAddressPostcode(AddressPostcode);
        logFailTestcase(temp, `Input AddressPostcode falied!`);
    }
    if (AddressCity) {
        temp = await accountTabQuoteCreateQuoteGeneralProductInnbo.inputAddressCity(AddressCity);
        logFailTestcase(temp, `Input AddressCity falied!`);
    }
    if (ConstructionMethod) {
        temp = await accountTabQuoteCreateQuoteGeneralProductInnbo.inputConstructionMethod(ConstructionMethod);
        logFailTestcase(temp, `Input ConstructionMethod falied!`);
    }
    if (Alarm) {
        temp = await accountTabQuoteCreateQuoteGeneralProductInnbo.inputAlarm(Alarm);
        logFailTestcase(temp, `Input Alarm falied!`);
    }
    if (ContentSumInsured) {
        temp = await accountTabQuoteCreateQuoteGeneralProductInnbo.inputContentSumInsured(ContentSumInsured);
        logFailTestcase(temp, `Input ContentSumInsured falied!`);
    }
    if (ContentDeductible) {
        temp = await accountTabQuoteCreateQuoteGeneralProductInnbo.inputContentDeductible(ContentDeductible);
        logFailTestcase(temp, `Input ContentDeductible falied!`);
    }
    if (ContentCover) {
        temp = await accountTabQuoteCreateQuoteGeneralProductInnbo.inputContentCover(ContentCover);
        logFailTestcase(temp, `Input ContentCover falied!`);
    }
    if (Mushroom) {
        temp = await accountTabQuoteCreateQuoteGeneralProductInnbo.inputMushroom(Mushroom);
        logFailTestcase(temp, `Input Mushroom falied!`);
    }
    if (FreeText) {
        temp = await accountTabQuoteCreateQuoteGeneralProductInnbo.inputFreeText(FreeText);
        logFailTestcase(temp, `Input FreeText falied!`);
    }

    if (TerminationText) {
        temp = await accountTabQuoteCreateQuoteGeneralProductInnbo.inputTerminationText(TerminationText);
        logFailTestcase(temp, `Input TerminationText falied!`);
    }
});

Given("User inputs data at Premium section on Creating Quote form for General product Innbo {string}", async function (filename) {
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

    await inputPremiumSectionOnCreatingQuote(accountTabQuoteCreatingQuoteGeneralProductInnbo, row);
});

Given("User verifies info on Creating Quote form for General product Innbo {string}", async function (filename) {
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

    temp = await accountTabQuoteCreatingQuoteGeneralProductInnbo.validateQuoteRef(QuoteReference);
    logFailTestcase(temp, `Incorrect Quote Ref`);


    temp = await accountTabQuoteCreatingQuoteGeneralProductInnbo.validateSalesPerson(SalesPerson);
    // logFailTestcase(temp, `Incorrect SalesPerson`);

    if (AlertMessages) {
        logInfoMessage("\tALERT MESSAGES:");
        const alerts = AlertMessages.split(";");
        for (const alert of alerts) {
            temp = await accountTabQuoteCreatingQuoteGeneralProductInnbo.isAlertMessageExisted(alert);
            logFailTestcase(temp, `NOT found alert message "${alert}"!`);
        }
    }


    logInfoMessage("\tINSURANCE INFORMATION:");
    temp = await accountTabQuoteCreatingQuoteGeneralProductInnbo.validatePolicyTerm_InsuranceInformation(startDate + " - " + endDate);
    logFailTestcase(temp, `Incorrect Policy term`);

    temp = await accountTabQuoteCreatingQuoteGeneralProductInnbo.validateExpiryDate_InsuranceInformation(ExpiryDate);
    logFailTestcase(temp, `Incorrect Expiry Date`);

    temp = await accountTabQuoteCreatingQuoteGeneralProductInnbo.validateProduct_InsuranceInformation(Product);
    logFailTestcase(temp, `Incorrect Product!`);

    logInfoMessage("\tPREMIUM:");
    await verifyPremiumSectionOnCreatingQuote(accountTabQuoteCreatingQuoteGeneralProductInnbo, row);
});