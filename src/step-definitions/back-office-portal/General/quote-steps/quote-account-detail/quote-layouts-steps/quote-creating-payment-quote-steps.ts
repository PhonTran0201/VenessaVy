import { Before, Given, Then, When } from "@cucumber/cucumber";
import { DataRepo } from "../../../../../../core/modals/DataRepo";
import { AccountTabQuoteCreatingPaymentQuote } from "../../../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-quote/AccountTabQuoteCreatingPaymentQuote";
import { GlobalPageObject } from "../../../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { YourCart } from "../../../../../../page-objects/back-office-portal/general/quote/your-cart/YourCart";
import { addDate, addYear, convertPathFileDataToDataRegression, getDate, logFailTestcase } from "../../../../../../shared/functions";
import { ICommonContext } from "../../../../../../shared/interfaces";
import { PolicyCalculation } from "../../../../../../shared/policy-calculations/PolicyCalculation";
import { VarsamSeasonalConfig } from "../../../../../../shared/policy-calculations/VarsamSeasonalConfig";
import { numberToCurrency } from "../../../../../../shared/tenant-setting/tenant-setting";
import { getValueDataOfDataTestExecution } from "../../../../../../storage-data/functions/data-test-execution";
import { verifieInfoQuoteReadyForPurchaseOnCreatingPaymentQuoteForm } from "./quote-creating-payment-quote-function";

let accountTabQuoteCreatingPaymentQuote: AccountTabQuoteCreatingPaymentQuote;
let globalPageObject: GlobalPageObject;
let yourCart: YourCart;
const loader = require("csv-load-sync");

Before(async function () {
    const context: ICommonContext = this.context;
    accountTabQuoteCreatingPaymentQuote = new AccountTabQuoteCreatingPaymentQuote(context.driverService);
    globalPageObject = new GlobalPageObject(context.driverService);
    yourCart = new YourCart(context.driverService);
});

Given("User presses Purchase button on Creating Payment Quote form", async function () {
    let temp = await accountTabQuoteCreatingPaymentQuote.pressPurchaseButton_QuoteReadyPurchase();
    logFailTestcase(temp, `Press Purchase button failed!`);
});
Given("User presses Back To Quotes List button on Creating Payment Quote form", async function () {
    let temp = await accountTabQuoteCreatingPaymentQuote.pressBackToQuoteListButton_QuoteReadyPurchase();
    logFailTestcase(temp, `Press Back To Quotes List button failed!`);
});
Given("User presses Back button on Creating Payment Quote form", async function () {
    let temp = await accountTabQuoteCreatingPaymentQuote.pressBackButton_QuoteReadyPurchase();
    logFailTestcase(temp, `Press Back button failed!`);
});

When("User verifies info Quote Ready for Purchase on Creating Payment Quote form {string}", async (filename) => {
    let rows = await DataRepo.getInstance().loadData(filename);
    let row = rows[0];
    if (filename.includes('json')) {
        row = rows;
    }

    let startDate = row.StartDate;
    let endDate = row.EndDate;
    const StartDateMinusToday = row.StartDateMinusToday;
    const EndDateMinusStartDate = row.EndDateMinusStartDate;
    const EndDateMinusToday = row.EndDateMinusToday;

    let PositionRow = row.PositionRow;
    if (PositionRow) {
        PositionRow = parseInt(PositionRow);
    } else {
        PositionRow = 1;
    }

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
    if (EndDateMinusToday) {
        endDate = getDate(EndDateMinusToday);
    }

    const rowTemp = {
        "Currency": row.Currency,
        "QuoteReference": getValueDataOfDataTestExecution("QuoteReference"),
        "StartDate": startDate,
        "EndDate": endDate,
        "TotalPremiumPolicyPremium": row.TotalPremiumPolicyPremium || row.Premium[1].TotalPremium_PolicyPremium,
        "Product": row.Product || row.ProductName,
        "PositionRow": PositionRow,
    }

    await verifieInfoQuoteReadyForPurchaseOnCreatingPaymentQuoteForm(accountTabQuoteCreatingPaymentQuote, rowTemp);
});

When("User verifies info Quote Ready for Purchase on Creating Payment Quote form - Renewal case", async () => {
    const rowTemp = {
        "Currency": getValueDataOfDataTestExecution("Currency"),
        "QuoteReference": getValueDataOfDataTestExecution("QuoteReference"),
        "StartDate": getValueDataOfDataTestExecution("StartDate"),
        "EndDate": getValueDataOfDataTestExecution("EndDate"),
        "TotalPremiumPolicyPremium": getValueDataOfDataTestExecution("PolicyPremium"),
        "Product": getValueDataOfDataTestExecution("Product"),
        "PositionRow": 1,
    }

    await verifieInfoQuoteReadyForPurchaseOnCreatingPaymentQuoteForm(accountTabQuoteCreatingPaymentQuote, rowTemp);
});
Then("User shows or hides column at column config of the table {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    let temp = true;
    const SectionName = rows[0].SectionName;

    temp = await accountTabQuoteCreatingPaymentQuote.pressOpenDropdownConfigColumnButtonBySectionName(SectionName);
    logFailTestcase(temp, `press Config Column At Cover Breakdown failed!`);
    await globalPageObject.waitForSeconds(2000);

    for (let i = 0; i < rows.length; i++) {
        let ColumnName = rows[i].ColumnName;
        let IsChecked = rows[i].IsChecked;

        if (IsChecked.trim().localeCompare('Yes') === 0) {
            temp = await accountTabQuoteCreatingPaymentQuote.tickToConfigColumnByColumnName(ColumnName);
            logFailTestcase(temp, 'tick To Config Column By Column Name failed!');

            temp = await accountTabQuoteCreatingPaymentQuote.validateTitleColumnIsVisibleByColumnName(SectionName, ColumnName);
            logFailTestcase(temp, 'validate Title Column Is Visible By Column Name failed!');
        } else {
            temp = await accountTabQuoteCreatingPaymentQuote.UnTickToConfigColumnByColumnName(ColumnName);
            logFailTestcase(temp, 'untick To Config Column By Column Name failed!');

            temp = await accountTabQuoteCreatingPaymentQuote.validateTitleColumnIsNotVisibleByColumnName(SectionName, ColumnName);
            logFailTestcase(temp, 'validate Title Column Is  Not Visible By Column Name failed!');
        }
    }

    temp = await accountTabQuoteCreatingPaymentQuote.pressOpenDropdownConfigColumnButtonBySectionName(SectionName);
    logFailTestcase(temp, `press Config Column At Cover Breakdown failed!`);
});


Then("User verifies Quote info on Your Cart {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const row = rows[0];
    const QuoteReference = getValueDataOfDataTestExecution("QuoteReference");
    const Currency = row.Currency;
    const TotalPremiumPolicyPremium = numberToCurrency(row.TotalPremiumPolicyPremium, true, Currency);
    const Product = row.Product;

    let temp = await yourCart.validateTheQuoteIsExistInYourCart(QuoteReference, Product, TotalPremiumPolicyPremium);
    logFailTestcase(temp, `The quote is not exist in Your Cart!`);
});

Then("User adds more quote to Quote Ready for Purchase on Creating Payment Quote form", async () => {
    let temp = true;

    //get value at row 1 Other Available Quotes
    let QuoteRef = await accountTabQuoteCreatingPaymentQuote.getQuoteRefValue_OtherAvailableQuotes(1);
    let Product = await accountTabQuoteCreatingPaymentQuote.getProductValue_OtherAvailableQuotes(1);
    let PolicyTerm = await accountTabQuoteCreatingPaymentQuote.getPolicyTermValue_OtherAvailableQuotes(1);
    let LastModifiedDate = await accountTabQuoteCreatingPaymentQuote.getLastModifiedDateValue_OtherAvailableQuotes(1);
    let Premium = await accountTabQuoteCreatingPaymentQuote.getPremiumValue_OtherAvailableQuotes(1);

    //add Quote at row 1 to Quote Ready for Purchase
    temp = await accountTabQuoteCreatingPaymentQuote.addMoreQuoteFromOtherAvailableToQuotesReadyForPurchaseByRow(1);
    logFailTestcase(temp, `add More Quote From Other Available To Quotes Ready For Purchase failed!`);

    //Validate Quote value have added on Quote Ready for Purchase
    for (let i = 1; i <= 5; i++) {
        if (await accountTabQuoteCreatingPaymentQuote.validateQuoteRef_QuoteReadyPurchase(QuoteRef, i)) {
            temp = await accountTabQuoteCreatingPaymentQuote.validateProduct_QuoteReadyPurchase(Product, i);
            logFailTestcase(temp, `Incorrect Product on Quote Ready for Purchase!`);

            temp = await accountTabQuoteCreatingPaymentQuote.validatePolicyTerm_QuoteReadyPurchase(PolicyTerm, i);
            logFailTestcase(temp, `Incorrect PolicyTerm on Quote Ready for Purchase!`);

            temp = await accountTabQuoteCreatingPaymentQuote.validateLastModifiedDate_QuoteReadyPurchase(LastModifiedDate, i);
            logFailTestcase(temp, `Incorrect LastModifiedDate on Quote Ready for Purchase!`);

            temp = await accountTabQuoteCreatingPaymentQuote.validatePremium_QuoteReadyPurchase(Premium, i);
            logFailTestcase(temp, `Incorrect Premium on Quote Ready for Purchase!`);
            break;
        } else if (i == 5) {
            logFailTestcase(false, `can not find the quote has '${QuoteRef}' quote ref. on Quote Ready for Purchase!`);
        }
    }

    //Validate the quote is display on Your cart
    temp = await yourCart.validateTheQuoteIsExistInYourCart(QuoteRef, Product, Premium);
    logFailTestcase(temp, `The quote is not exist in Your Cart!`);

    temp = await yourCart.validateTotalAmountInYourCart();
    logFailTestcase(temp, `Incorrect Total amount in Your Cart!`);
});

Then("User removes the quote from Quote Ready for Purchase on Creating Payment Quote form", async () => {
    let temp = true;

    //get value at row 1 section Quote Ready For Purchase
    let QuoteRef = await accountTabQuoteCreatingPaymentQuote.getQuoteRefValue_QuoteReadyPurchase(1);
    let Product = await accountTabQuoteCreatingPaymentQuote.getProductValue_QuoteReadyPurchase(1);
    let PolicyTerm = await accountTabQuoteCreatingPaymentQuote.getPolicyTermValue_QuoteReadyPurchase(1);
    let LastModifiedDate = await accountTabQuoteCreatingPaymentQuote.getLastModifiedDateValue_QuoteReadyPurchase(1);
    let Premium = await accountTabQuoteCreatingPaymentQuote.getPremiumValue_QuoteReadyPurchase(1);

    //remove Quote at row 1 to Other available quotes
    temp = await accountTabQuoteCreatingPaymentQuote.removeQuoteFromQuotesReadyForPurchaseToOtherAvailableQuotesByRow(1);
    logFailTestcase(temp, `remove Quote From Quotes Ready For Purchase To Other Available Quotes By Row failed!`);

    //Validate Quote value have removed that is displayed on Other Available Quotes
    for (let i = 1; i <= 5; i++) {
        if (await accountTabQuoteCreatingPaymentQuote.validateQuoteRef_OtherAvailableQuotes(QuoteRef, i)) {
            temp = await accountTabQuoteCreatingPaymentQuote.validateProduct_OtherAvailableQuotes(Product, i);
            logFailTestcase(temp, `Incorrect Product on Quote Ready for Purchase!`);

            temp = await accountTabQuoteCreatingPaymentQuote.validatePolicyTerm_OtherAvailableQuotes(PolicyTerm, i);
            logFailTestcase(temp, `Incorrect PolicyTerm on Quote Ready for Purchase!`);

            temp = await accountTabQuoteCreatingPaymentQuote.validateLastModifiedDate_OtherAvailableQuotes(LastModifiedDate, i);
            logFailTestcase(temp, `Incorrect LastModifiedDate on Quote Ready for Purchase!`);

            temp = await accountTabQuoteCreatingPaymentQuote.validatePremium_OtherAvailableQuotes(Premium, i);
            logFailTestcase(temp, `Incorrect Premium on Quote Ready for Purchase!`);
            break;
        } else if (i == 5) {
            logFailTestcase(false, `can not find the quote has '${QuoteRef}' quote ref. on Quote Ready for Purchase!`);
        }
    }

    //Validate the quote is displayed on Your cart
    temp = await yourCart.validateTheQuoteIsExistInYourCart(QuoteRef, Product, Premium);
    logFailTestcase(!temp, `The quote is still exist in Your Cart!`);

    temp = await yourCart.validateTotalAmountInYourCart();
    logFailTestcase(temp, `Incorrect Total amount in Your Cart!`);
});