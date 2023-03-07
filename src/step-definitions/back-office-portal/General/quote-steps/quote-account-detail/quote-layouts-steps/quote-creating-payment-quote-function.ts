import { QuoteCreatingPaymentQuote } from "../../../../../../page-objects/back-office-portal/general/quote/quote-layouts/QuoteCreatingPaymentQuote";
import { logFailTestcase, logInfoMessage } from "../../../../../../shared/functions";
import { numberToCurrency } from "../../../../../../shared/tenant-setting/tenant-setting";

export async function verifieInfoQuoteReadyForPurchaseOnCreatingPaymentQuoteForm(quoteCreatingPaymentQuote: QuoteCreatingPaymentQuote, row: any) {
    const Currency = row.Currency;
    const QuoteReference = row.QuoteReference;
    let startDate = row.StartDate;
    let endDate = row.EndDate;
    const TotalPremiumPolicyPremium = row.TotalPremiumPolicyPremium;
    const Product = row.Product;
    let PositionRow = row.PositionRow;

    let temp = true;
    if(Currency){
        temp = await quoteCreatingPaymentQuote.validateCurrency_QuoteReadyPurchase(Currency);
        logFailTestcase(temp, `Incorrect Currency`);
    }

    if(QuoteReference){
        temp = await quoteCreatingPaymentQuote.validateQuoteRef_QuoteReadyPurchase(QuoteReference, PositionRow);
    logFailTestcase(temp, `Incorrect Quote Ref`);
    }

    if(Product){
        temp = await quoteCreatingPaymentQuote.validateProduct_QuoteReadyPurchase(Product, PositionRow);
        logFailTestcase(temp, `Incorrect Product`);
    }

    temp = await quoteCreatingPaymentQuote.validatePolicyTerm_QuoteReadyPurchase(startDate + " - " + endDate, PositionRow);
    logFailTestcase(temp, `Incorrect Policy term`);

    logInfoMessage("Not verify Last Modified Date...");

    if(TotalPremiumPolicyPremium){
        temp = await quoteCreatingPaymentQuote.validatePremium_QuoteReadyPurchase(numberToCurrency(TotalPremiumPolicyPremium, true, Currency), PositionRow);
        logFailTestcase(temp, `Incorrect Policy Premium`);
    }
}