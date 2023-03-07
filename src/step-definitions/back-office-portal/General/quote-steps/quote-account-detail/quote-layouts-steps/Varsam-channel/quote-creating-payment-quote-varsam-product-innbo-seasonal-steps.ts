import { Before, When } from "@cucumber/cucumber";
import { AccountTabQuoteCreatingPaymentQuote } from "../../../../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-quote/AccountTabQuoteCreatingPaymentQuote";
import { GlobalPageObject } from "../../../../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { YourCart } from "../../../../../../../page-objects/back-office-portal/general/quote/your-cart/YourCart";
import { convertPathFileDataToDataRegression, logInfoMessage } from "../../../../../../../shared/functions";
import { ICommonContext } from "../../../../../../../shared/interfaces";
import { getValueDataOfDataTestExecution } from "../../../../../../../storage-data/functions/data-test-execution";
import { verifieInfoQuoteReadyForPurchaseOnCreatingPaymentQuoteForm } from "../quote-creating-payment-quote-function";

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

When("User verifies info Quote Ready for Purchase after renew on Creating Payment Quote form - Renewal case {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const row = rows[0];


    let startDate = getValueDataOfDataTestExecution("StartDateAfterRenew");
    let endDate = getValueDataOfDataTestExecution("EndDateAfterRenew");
    let premiumPolicy = getValueDataOfDataTestExecution("PolicyPremium");

    const rowTemp = {
        "Currency": row.Currency,
        "QuoteReference": getValueDataOfDataTestExecution("QuoteReference"),
        "StartDate": startDate,
        "EndDate": endDate,
        "TotalPremiumPolicyPremium": premiumPolicy,
        "Product": row.Product,
        "PositionRow": 1,
    }

    await verifieInfoQuoteReadyForPurchaseOnCreatingPaymentQuoteForm(accountTabQuoteCreatingPaymentQuote, rowTemp);
});
