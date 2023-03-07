import { QuoteCreatingQuote } from "../../../../../../page-objects/back-office-portal/general/quote/quote-layouts/QuoteCreatingQuote";
import { ValidateField } from "../../../../../../shared/classes";
import { logFailTestcase, logInfoMessage } from "../../../../../../shared/functions";
import { numberToCurrency } from "../../../../../../shared/tenant-setting/tenant-setting";
import { dataTestcase } from "../../../../../../shared/variables";

export async function verifyPremiumSectionOnCreatingQuote(quoteCreatingQuote: QuoteCreatingQuote, row: any) {
    /// Cột Annual Premium
    const PremiumExlTaxAnnualPremium = row.PremiumExlTaxAnnualPremium;
    const UnderwritingAdjustmentAnnualPremium = row.UnderwritingAdjustmentAnnualPremium;
    const SalesDiscountAnnualPremium = row.SalesDiscountAnnualPremium;
    const ProductCommissionAnnualPremium = row.ProductCommissionAnnualPremium;
    const SalesCommissionAnnualPremium = row.SalesCommissionAnnualPremium;
    const TaxAnnualPremium = row.TaxAnnualPremium;
    const TotalPremiumAnnualPremium = row.TotalPremiumAnnualPremium;


    /// Cột Annual Premium check change after MTA
    const PremiumExlTaxAnnualPremiumMTA = row.PremiumExlTaxAnnualPremiumMTA; //  up@-5645789.3654 or down@5461267 or none@34663213
    const UnderwritingAdjustmentAnnualPremiumMTA = row.UnderwritingAdjustmentAnnualPremiumMTA;
    const SalesDiscountAnnualPremiumMTA = row.SalesDiscountAnnualPremiumMTA;
    const ProductCommissionAnnualPremiumMTA = row.ProductCommissionAnnualPremiumMTA;
    const SalesCommissionAnnualPremiumMTA = row.SalesCommissionAnnualPremiumMTA;
    const TaxAnnualPremiumMTA = row.TaxAnnualPremiumMTA;
    const TotalPremiumAnnualPremiumMTA = row.TotalPremiumAnnualPremiumMTA;

    // Cột Policy Premium
    const PremiumExlTaxPolicyPremium = row.PremiumExlTaxPolicyPremium;
    const UnderwritingAdjustmentPolicyPremium = row.UnderwritingAdjustmentPolicyPremium;
    const SalesDiscountPolicyPremium = row.SalesDiscountPolicyPremium;
    const ProductCommissionPolicyPremium = row.ProductCommissionPolicyPremium;
    const SalesCommissionPolicyPremium = row.SalesCommissionPolicyPremium;
    const TaxPolicyPremium = row.TaxPolicyPremium;
    const TotalPremiumPolicyPremium = row.TotalPremiumPolicyPremium;


    // Cột Policy Premium check change after MTA
    const PremiumExlTaxPolicyPremiumMTA = row.PremiumExlTaxPolicyPremiumMTA;
    const UnderwritingAdjustmentPolicyPremiumMTA = row.UnderwritingAdjustmentPolicyPremiumMTA;
    const SalesDiscountPolicyPremiumMTA = row.SalesDiscountPolicyPremiumMTA;
    const ProductCommissionPolicyPremiumMTA = row.ProductCommissionPolicyPremiumMTA;
    const SalesCommissionPolicyPremiumMTA = row.SalesCommissionPolicyPremiumMTA;
    const TaxPolicyPremiumMTA = row.TaxPolicyPremiumMTA;
    const TotalPremiumPolicyPremiumMTA = row.TotalPremiumPolicyPremiumMTA;

    const Currency = row.Currency;

    let temp = true;

    //#region Cột Annual Premium
    if (PremiumExlTaxAnnualPremium) {
        temp = await quoteCreatingQuote.validatePremiumExlTax_AnnualPremium_Premium(numberToCurrency(PremiumExlTaxAnnualPremium, true, Currency));
        logFailTestcase(temp, `Incorrect PremiumExlTaxAnnualPremium!`);
    }
    if (UnderwritingAdjustmentAnnualPremium) {
        temp = await quoteCreatingQuote.validateUnderwritingAdjustment_AnnualPremium_Premium(numberToCurrency(UnderwritingAdjustmentAnnualPremium, true, Currency));
        logFailTestcase(temp, `Incorrect UnderwritingAdjustmentAnnualPremium!`);
    }
    if (SalesDiscountAnnualPremium) {
        temp = await quoteCreatingQuote.validateSalesDiscount_AnnualPremium_Premium(numberToCurrency(SalesDiscountAnnualPremium, true, Currency));
        logFailTestcase(temp, `Incorrect SalesDiscountAnnualPremium!`);
    }
    if (ProductCommissionAnnualPremium) {
        temp = await quoteCreatingQuote.validateProductCommission_AnnualPremium_Premium(numberToCurrency(ProductCommissionAnnualPremium, true, Currency));
        logFailTestcase(temp, `Incorrect ProductCommissionAnnualPremium!`);
    }
    if (SalesCommissionAnnualPremium) {
        temp = await quoteCreatingQuote.validateSalesCommission_AnnualPremium_Premium(numberToCurrency(SalesCommissionAnnualPremium, true, Currency));
        logFailTestcase(temp, `Incorrect SalesCommissionAnnualPremium!`);
    }
    if (TaxAnnualPremium) {
        temp = await quoteCreatingQuote.validateTax_AnnualPremium_Premium(numberToCurrency(TaxAnnualPremium, true, Currency));
        logFailTestcase(temp, `Incorrect TaxAnnualPremium!`);
    }

    if (TotalPremiumAnnualPremium) {
        temp = await quoteCreatingQuote.validateTotalPremium_AnnualPremium_Premium(numberToCurrency(TotalPremiumAnnualPremium, true, Currency));
        logFailTestcase(temp, `Incorrect Total Premium Annual Premium!`);
    }
    //#endregion


    //#region Cột Annual Premium check change after MTA
    if (PremiumExlTaxAnnualPremiumMTA) {
        const option = (PremiumExlTaxAnnualPremiumMTA.split("@"))[0];
        const expectedValue = (PremiumExlTaxAnnualPremiumMTA.split("@"))[1];
        temp = await quoteCreatingQuote.validatePremiumExlTax_MTA_AnnualPremium_Premium(numberToCurrency(expectedValue, true, Currency), option);
        logFailTestcase(temp, `Incorrect PremiumExlTaxAnnualPremium_MTA!`);
    }
    if (UnderwritingAdjustmentAnnualPremiumMTA) {
        const option = (UnderwritingAdjustmentAnnualPremiumMTA.split("@"))[0];
        const expectedValue = (UnderwritingAdjustmentAnnualPremiumMTA.split("@"))[1];
        temp = await quoteCreatingQuote.validateUnderwritingAdjustment_MTA_AnnualPremium_Premium(numberToCurrency(expectedValue, true, Currency), option);
        logFailTestcase(temp, `Incorrect UnderwritingAdjustmentAnnualPremium_MTA!`);
    }
    if (SalesDiscountAnnualPremiumMTA) {
        const option = (SalesDiscountAnnualPremiumMTA.split("@"))[0];
        const expectedValue = (SalesDiscountAnnualPremiumMTA.split("@"))[1];
        temp = await quoteCreatingQuote.validateSalesDiscount_MTA_AnnualPremium_Premium(numberToCurrency(expectedValue, true, Currency), option);
        logFailTestcase(temp, `Incorrect SalesDiscountAnnualPremium_MTA!`);
    }
    if (ProductCommissionAnnualPremiumMTA) {
        const option = (ProductCommissionAnnualPremiumMTA.split("@"))[0];
        const expectedValue = (ProductCommissionAnnualPremiumMTA.split("@"))[1];
        temp = await quoteCreatingQuote.validateProductCommission_MTA_AnnualPremium_Premium(numberToCurrency(expectedValue, true, Currency), option);
        logFailTestcase(temp, `Incorrect ProductCommissionAnnualPremium_MTA!`);
    }
    if (SalesCommissionAnnualPremiumMTA) {
        const option = (SalesCommissionAnnualPremiumMTA.split("@"))[0];
        const expectedValue = (SalesCommissionAnnualPremiumMTA.split("@"))[1];
        temp = await quoteCreatingQuote.validateSalesCommission_MTA_AnnualPremium_Premium(numberToCurrency(expectedValue, true, Currency), option);
        logFailTestcase(temp, `Incorrect SalesCommissionAnnualPremium_MTA!`);
    }
    if (TaxAnnualPremiumMTA) {
        const option = (TaxAnnualPremiumMTA.split("@"))[0];
        const expectedValue = (TaxAnnualPremiumMTA.split("@"))[1];
        temp = await quoteCreatingQuote.validateTax_MTA_AnnualPremium_Premium(numberToCurrency(expectedValue, true, Currency), option);
        logFailTestcase(temp, `Incorrect TaxAnnualPremium_MTA!`);
    }
    if (TotalPremiumAnnualPremiumMTA) {
        const option = (TotalPremiumAnnualPremiumMTA.split("@"))[0];
        const expectedValue = (TotalPremiumAnnualPremiumMTA.split("@"))[1];
        temp = await quoteCreatingQuote.validateTotalPremium_MTA_AnnualPremium_Premium(numberToCurrency(expectedValue, true, Currency), option);
        logFailTestcase(temp, `Incorrect TotalPremiumAnnualPremium_MTA!`);
    }
    //#endregion


    //#region Policy Premium
    if (PremiumExlTaxPolicyPremium) {
        temp = await quoteCreatingQuote.validatePremiumExlTax_PolicyPremium_Premium(numberToCurrency(PremiumExlTaxPolicyPremium, true, Currency));
        logFailTestcase(temp, `Incorrect PremiumExlTaxPolicyPremium!`);
    }
    if (UnderwritingAdjustmentPolicyPremium) {
        temp = await quoteCreatingQuote.validateUnderwritingAdjustment_PolicyPremium_Premium(numberToCurrency(UnderwritingAdjustmentPolicyPremium, true, Currency));
        logFailTestcase(temp, `Incorrect UnderwritingAdjustmentPolicyPremium!`);
    }
    if (SalesDiscountPolicyPremium) {
        temp = await quoteCreatingQuote.validateSalesDiscount_PolicyPremium_Premium(numberToCurrency(SalesDiscountPolicyPremium, true, Currency));
        logFailTestcase(temp, `Incorrect SalesDiscountPolicyPremium!`);
    }
    if (ProductCommissionPolicyPremium) {
        temp = await quoteCreatingQuote.validateProductCommission_PolicyPremium_Premium(numberToCurrency(ProductCommissionPolicyPremium, true, Currency));
        logFailTestcase(temp, `Incorrect ProductCommissionPolicyPremium!`);
    }
    if (SalesCommissionPolicyPremium) {
        dataTestcase.push(new ValidateField("SalesCommissionPolicyPremium", 1, true, [SalesCommissionPolicyPremium], []));
        temp = await quoteCreatingQuote.validateSalesCommission_PolicyPremium_Premium(numberToCurrency(SalesCommissionPolicyPremium, true, Currency));
        logFailTestcase(temp, `Incorrect SalesCommissionPolicyPremium!`);
    }
    if (TaxPolicyPremium) {
        dataTestcase.push(new ValidateField("TaxPolicyPremium", 1, true, [TaxPolicyPremium], []));
        temp = await quoteCreatingQuote.validateTax_PolicyPremium_Premium(numberToCurrency(TaxPolicyPremium, true, Currency));
        logFailTestcase(temp, `Incorrect TaxPolicyPremium!`);
    }
    if (TotalPremiumPolicyPremium) {
        dataTestcase.push(new ValidateField("TotalPremiumPolicyPremium", 1, true, [TotalPremiumPolicyPremium], []));
        temp = await quoteCreatingQuote.validateTotalPremium_PolicyPremium_Premium(numberToCurrency(TotalPremiumPolicyPremium, true, Currency));
        logFailTestcase(temp, `Incorrect Total Premium Policy Premium!`);
    }
    //#endregion


    //#region Policy Premium check change after MTA 
    if (PremiumExlTaxPolicyPremiumMTA) {
        const option = (PremiumExlTaxPolicyPremiumMTA.split("@"))[0];
        const expectedValue = (PremiumExlTaxPolicyPremiumMTA.split("@"))[1];
        temp = await quoteCreatingQuote.validatePremiumExlTax_MTA_PolicyPremium_Premium(numberToCurrency(expectedValue, true, Currency), option);
        logFailTestcase(temp, `Incorrect PremiumExlTaxPolicyPremiumMTA!`);
    }
    if (UnderwritingAdjustmentPolicyPremiumMTA) {
        const option = (UnderwritingAdjustmentPolicyPremiumMTA.split("@"))[0];
        const expectedValue = (UnderwritingAdjustmentPolicyPremiumMTA.split("@"))[1];
        temp = await quoteCreatingQuote.validateUnderwritingAdjustment_MTA_PolicyPremium_Premium(numberToCurrency(expectedValue, true, Currency), option);
        logFailTestcase(temp, `Incorrect UnderwritingAdjustmentPolicyPremiumMTA!`);
    }
    if (SalesDiscountPolicyPremiumMTA) {
        const option = (SalesDiscountPolicyPremiumMTA.split("@"))[0];
        const expectedValue = (SalesDiscountPolicyPremiumMTA.split("@"))[1];
        temp = await quoteCreatingQuote.validateSalesDiscount_MTA_PolicyPremium_Premium(numberToCurrency(expectedValue, true, Currency), option);
        logFailTestcase(temp, `Incorrect SalesDiscountPolicyPremiumMTA!`);
    }
    if (ProductCommissionPolicyPremiumMTA) {
        const option = (ProductCommissionPolicyPremiumMTA.split("@"))[0];
        const expectedValue = (ProductCommissionPolicyPremiumMTA.split("@"))[1];
        temp = await quoteCreatingQuote.validateProductCommission_MTA_PolicyPremium_Premium(numberToCurrency(expectedValue, true, Currency), option);
        logFailTestcase(temp, `Incorrect ProductCommissionPolicyPremiumMTA!`);
    }
    if (SalesCommissionPolicyPremiumMTA) {
        const option = (SalesCommissionPolicyPremiumMTA.split("@"))[0];
        const expectedValue = (SalesCommissionPolicyPremiumMTA.split("@"))[1];
        temp = await quoteCreatingQuote.validateSalesCommission_MTA_PolicyPremium_Premium(numberToCurrency(expectedValue, true, Currency), option);
        logFailTestcase(temp, `Incorrect SalesCommissionPolicyPremiumMTA!`);
    }
    if (TaxPolicyPremiumMTA) {
        const option = (TaxPolicyPremiumMTA.split("@"))[0];
        const expectedValue = (TaxPolicyPremiumMTA.split("@"))[1];
        temp = await quoteCreatingQuote.validateTax_MTA_PolicyPremium_Premium(numberToCurrency(expectedValue, true, Currency), option);
        logFailTestcase(temp, `Incorrect TaxPolicyPremiumMTA!`);
    }
    if (TotalPremiumPolicyPremiumMTA) {
        const option = (TotalPremiumPolicyPremiumMTA.split("@"))[0];
        const expectedValue = (TotalPremiumPolicyPremiumMTA.split("@"))[1];
        temp = await quoteCreatingQuote.validateTotalPremium_MTA_PolicyPremium_Premium(numberToCurrency(expectedValue, true, Currency), option);
        logFailTestcase(temp, `Incorrect Total Premium Policy PremiumMTA!`);
    }
    //#endregion
}

export async function verifyPremiumSectionOnCreatingQuoteFromJSON(quoteCreatingQuote: QuoteCreatingQuote, row: any) {
    /// Cột Annual Premium
    const PremiumExlTaxAnnualPremium = row[0].AnnualPremium_PremiumExlTax;
    const UnderwritingAdjustmentAnnualPremium = row[0].AnnualPremium_UnderwritingAdjustment;
    const SalesDiscountAnnualPremium = row[0].AnnualPremium_SalesDiscount;
    const ProductCommissionAnnualPremium = row[0].AnnualPremium_ProductCommission;
    const SalesCommissionAnnualPremium = row[0].AnnualPremium_SalesCommission;
    const TaxAnnualPremium = row[0].AnnualPremium_Tax;
    const TotalPremiumAnnualPremium = row[0].TotalPremium_AnnualPremium;


    /// Cột Annual Premium check change after MTA
    const PremiumExlTaxAnnualPremiumMTA = row.PremiumExlTaxAnnualPremiumMTA; //  up@-5645789.3654 or down@5461267 or none@34663213
    const UnderwritingAdjustmentAnnualPremiumMTA = row.UnderwritingAdjustmentAnnualPremiumMTA;
    const SalesDiscountAnnualPremiumMTA = row.SalesDiscountAnnualPremiumMTA;
    const ProductCommissionAnnualPremiumMTA = row.ProductCommissionAnnualPremiumMTA;
    const SalesCommissionAnnualPremiumMTA = row.SalesCommissionAnnualPremiumMTA;
    const TaxAnnualPremiumMTA = row.TaxAnnualPremiumMTA;
    const TotalPremiumAnnualPremiumMTA = row.TotalPremiumAnnualPremiumMTA;

    // Cột Policy Premium
    const PremiumExlTaxPolicyPremium = row[1].PolicyPremium_PremiumExlTax;
    const UnderwritingAdjustmentPolicyPremium = row[1].PolicyPremium_UnderwritingAdjustment;
    const SalesDiscountPolicyPremium = row[1].PolicyPremium_SalesDiscount;
    const ProductCommissionPolicyPremium = row[1].PolicyPremium_ProductCommission;
    const SalesCommissionPolicyPremium = row[1].PolicyPremium_SalesCommission;
    const TaxPolicyPremium = row[1].PolicyPremium_Tax;
    const TotalPremiumPolicyPremium = row[1].TotalPremium_PremiumExlTax;


    // Cột Policy Premium check change after MTA
    const PremiumExlTaxPolicyPremiumMTA = row.PremiumExlTaxPolicyPremiumMTA;
    const UnderwritingAdjustmentPolicyPremiumMTA = row.UnderwritingAdjustmentPolicyPremiumMTA;
    const SalesDiscountPolicyPremiumMTA = row.SalesDiscountPolicyPremiumMTA;
    const ProductCommissionPolicyPremiumMTA = row.ProductCommissionPolicyPremiumMTA;
    const SalesCommissionPolicyPremiumMTA = row.SalesCommissionPolicyPremiumMTA;
    const TaxPolicyPremiumMTA = row.TaxPolicyPremiumMTA;
    const TotalPremiumPolicyPremiumMTA = row.TotalPremiumPolicyPremiumMTA;

    const Currency = row.Currency;

    let temp = true;

    //#region Cột Annual Premium
    if (PremiumExlTaxAnnualPremium) {
        temp = await quoteCreatingQuote.validatePremiumExlTax_AnnualPremium_Premium(numberToCurrency(PremiumExlTaxAnnualPremium, true, Currency));
        logFailTestcase(temp, `Incorrect PremiumExlTaxAnnualPremium!`);
    }
    if (UnderwritingAdjustmentAnnualPremium) {
        temp = await quoteCreatingQuote.validateUnderwritingAdjustment_AnnualPremium_Premium(numberToCurrency(UnderwritingAdjustmentAnnualPremium, true, Currency));
        logFailTestcase(temp, `Incorrect UnderwritingAdjustmentAnnualPremium!`);
    }
    if (SalesDiscountAnnualPremium) {
        temp = await quoteCreatingQuote.validateSalesDiscount_AnnualPremium_Premium(numberToCurrency(SalesDiscountAnnualPremium, true, Currency));
        logFailTestcase(temp, `Incorrect SalesDiscountAnnualPremium!`);
    }
    if (ProductCommissionAnnualPremium) {
        temp = await quoteCreatingQuote.validateProductCommission_AnnualPremium_Premium(numberToCurrency(ProductCommissionAnnualPremium, true, Currency));
        logFailTestcase(temp, `Incorrect ProductCommissionAnnualPremium!`);
    }
    if (SalesCommissionAnnualPremium) {
        temp = await quoteCreatingQuote.validateSalesCommission_AnnualPremium_Premium(numberToCurrency(SalesCommissionAnnualPremium, true, Currency));
        logFailTestcase(temp, `Incorrect SalesCommissionAnnualPremium!`);
    }
    if (TaxAnnualPremium) {
        temp = await quoteCreatingQuote.validateTax_AnnualPremium_Premium(numberToCurrency(TaxAnnualPremium, true, Currency));
        logFailTestcase(temp, `Incorrect TaxAnnualPremium!`);
    }

    if (TotalPremiumAnnualPremium) {
        temp = await quoteCreatingQuote.validateTotalPremium_AnnualPremium_Premium(numberToCurrency(TotalPremiumAnnualPremium, true, Currency));
        logFailTestcase(temp, `Incorrect Total Premium Annual Premium!`);
    }
    //#endregion


    //#region Cột Annual Premium check change after MTA
    if (PremiumExlTaxAnnualPremiumMTA) {
        const option = (PremiumExlTaxAnnualPremiumMTA.split("@"))[0];
        const expectedValue = (PremiumExlTaxAnnualPremiumMTA.split("@"))[1];
        temp = await quoteCreatingQuote.validatePremiumExlTax_MTA_AnnualPremium_Premium(numberToCurrency(expectedValue, true, Currency), option);
        logFailTestcase(temp, `Incorrect PremiumExlTaxAnnualPremium_MTA!`);
    }
    if (UnderwritingAdjustmentAnnualPremiumMTA) {
        const option = (UnderwritingAdjustmentAnnualPremiumMTA.split("@"))[0];
        const expectedValue = (UnderwritingAdjustmentAnnualPremiumMTA.split("@"))[1];
        temp = await quoteCreatingQuote.validateUnderwritingAdjustment_MTA_AnnualPremium_Premium(numberToCurrency(expectedValue, true, Currency), option);
        logFailTestcase(temp, `Incorrect UnderwritingAdjustmentAnnualPremium_MTA!`);
    }
    if (SalesDiscountAnnualPremiumMTA) {
        const option = (SalesDiscountAnnualPremiumMTA.split("@"))[0];
        const expectedValue = (SalesDiscountAnnualPremiumMTA.split("@"))[1];
        temp = await quoteCreatingQuote.validateSalesDiscount_MTA_AnnualPremium_Premium(numberToCurrency(expectedValue, true, Currency), option);
        logFailTestcase(temp, `Incorrect SalesDiscountAnnualPremium_MTA!`);
    }
    if (ProductCommissionAnnualPremiumMTA) {
        const option = (ProductCommissionAnnualPremiumMTA.split("@"))[0];
        const expectedValue = (ProductCommissionAnnualPremiumMTA.split("@"))[1];
        temp = await quoteCreatingQuote.validateProductCommission_MTA_AnnualPremium_Premium(numberToCurrency(expectedValue, true, Currency), option);
        logFailTestcase(temp, `Incorrect ProductCommissionAnnualPremium_MTA!`);
    }
    if (SalesCommissionAnnualPremiumMTA) {
        const option = (SalesCommissionAnnualPremiumMTA.split("@"))[0];
        const expectedValue = (SalesCommissionAnnualPremiumMTA.split("@"))[1];
        temp = await quoteCreatingQuote.validateSalesCommission_MTA_AnnualPremium_Premium(numberToCurrency(expectedValue, true, Currency), option);
        logFailTestcase(temp, `Incorrect SalesCommissionAnnualPremium_MTA!`);
    }
    if (TaxAnnualPremiumMTA) {
        const option = (TaxAnnualPremiumMTA.split("@"))[0];
        const expectedValue = (TaxAnnualPremiumMTA.split("@"))[1];
        temp = await quoteCreatingQuote.validateTax_MTA_AnnualPremium_Premium(numberToCurrency(expectedValue, true, Currency), option);
        logFailTestcase(temp, `Incorrect TaxAnnualPremium_MTA!`);
    }
    if (TotalPremiumAnnualPremiumMTA) {
        const option = (TotalPremiumAnnualPremiumMTA.split("@"))[0];
        const expectedValue = (TotalPremiumAnnualPremiumMTA.split("@"))[1];
        temp = await quoteCreatingQuote.validateTotalPremium_MTA_AnnualPremium_Premium(numberToCurrency(expectedValue, true, Currency), option);
        logFailTestcase(temp, `Incorrect TotalPremiumAnnualPremium_MTA!`);
    }
    //#endregion


    //#region Policy Premium
    if (PremiumExlTaxPolicyPremium) {
        temp = await quoteCreatingQuote.validatePremiumExlTax_PolicyPremium_Premium(numberToCurrency(PremiumExlTaxPolicyPremium, true, Currency));
        logFailTestcase(temp, `Incorrect PremiumExlTaxPolicyPremium!`);
    }
    if (UnderwritingAdjustmentPolicyPremium) {
        temp = await quoteCreatingQuote.validateUnderwritingAdjustment_PolicyPremium_Premium(numberToCurrency(UnderwritingAdjustmentPolicyPremium, true, Currency));
        logFailTestcase(temp, `Incorrect UnderwritingAdjustmentPolicyPremium!`);
    }
    if (SalesDiscountPolicyPremium) {
        temp = await quoteCreatingQuote.validateSalesDiscount_PolicyPremium_Premium(numberToCurrency(SalesDiscountPolicyPremium, true, Currency));
        logFailTestcase(temp, `Incorrect SalesDiscountPolicyPremium!`);
    }
    if (ProductCommissionPolicyPremium) {
        temp = await quoteCreatingQuote.validateProductCommission_PolicyPremium_Premium(numberToCurrency(ProductCommissionPolicyPremium, true, Currency));
        logFailTestcase(temp, `Incorrect ProductCommissionPolicyPremium!`);
    }
    if (SalesCommissionPolicyPremium) {
        dataTestcase.push(new ValidateField("SalesCommissionPolicyPremium", 1, true, [SalesCommissionPolicyPremium], []));
        temp = await quoteCreatingQuote.validateSalesCommission_PolicyPremium_Premium(numberToCurrency(SalesCommissionPolicyPremium, true, Currency));
        logFailTestcase(temp, `Incorrect SalesCommissionPolicyPremium!`);
    }
    if (TaxPolicyPremium) {
        dataTestcase.push(new ValidateField("TaxPolicyPremium", 1, true, [TaxPolicyPremium], []));
        temp = await quoteCreatingQuote.validateTax_PolicyPremium_Premium(numberToCurrency(TaxPolicyPremium, true, Currency));
        logFailTestcase(temp, `Incorrect TaxPolicyPremium!`);
    }
    if (TotalPremiumPolicyPremium) {
        dataTestcase.push(new ValidateField("TotalPremiumPolicyPremium", 1, true, [TotalPremiumPolicyPremium], []));
        temp = await quoteCreatingQuote.validateTotalPremium_PolicyPremium_Premium(numberToCurrency(TotalPremiumPolicyPremium, true, Currency));
        logFailTestcase(temp, `Incorrect Total Premium Policy Premium!`);
    }
    //#endregion


    //#region Policy Premium check change after MTA 
    if (PremiumExlTaxPolicyPremiumMTA) {
        const option = (PremiumExlTaxPolicyPremiumMTA.split("@"))[0];
        const expectedValue = (PremiumExlTaxPolicyPremiumMTA.split("@"))[1];
        temp = await quoteCreatingQuote.validatePremiumExlTax_MTA_PolicyPremium_Premium(numberToCurrency(expectedValue, true, Currency), option);
        logFailTestcase(temp, `Incorrect PremiumExlTaxPolicyPremiumMTA!`);
    }
    if (UnderwritingAdjustmentPolicyPremiumMTA) {
        const option = (UnderwritingAdjustmentPolicyPremiumMTA.split("@"))[0];
        const expectedValue = (UnderwritingAdjustmentPolicyPremiumMTA.split("@"))[1];
        temp = await quoteCreatingQuote.validateUnderwritingAdjustment_MTA_PolicyPremium_Premium(numberToCurrency(expectedValue, true, Currency), option);
        logFailTestcase(temp, `Incorrect UnderwritingAdjustmentPolicyPremiumMTA!`);
    }
    if (SalesDiscountPolicyPremiumMTA) {
        const option = (SalesDiscountPolicyPremiumMTA.split("@"))[0];
        const expectedValue = (SalesDiscountPolicyPremiumMTA.split("@"))[1];
        temp = await quoteCreatingQuote.validateSalesDiscount_MTA_PolicyPremium_Premium(numberToCurrency(expectedValue, true, Currency), option);
        logFailTestcase(temp, `Incorrect SalesDiscountPolicyPremiumMTA!`);
    }
    if (ProductCommissionPolicyPremiumMTA) {
        const option = (ProductCommissionPolicyPremiumMTA.split("@"))[0];
        const expectedValue = (ProductCommissionPolicyPremiumMTA.split("@"))[1];
        temp = await quoteCreatingQuote.validateProductCommission_MTA_PolicyPremium_Premium(numberToCurrency(expectedValue, true, Currency), option);
        logFailTestcase(temp, `Incorrect ProductCommissionPolicyPremiumMTA!`);
    }
    if (SalesCommissionPolicyPremiumMTA) {
        const option = (SalesCommissionPolicyPremiumMTA.split("@"))[0];
        const expectedValue = (SalesCommissionPolicyPremiumMTA.split("@"))[1];
        temp = await quoteCreatingQuote.validateSalesCommission_MTA_PolicyPremium_Premium(numberToCurrency(expectedValue, true, Currency), option);
        logFailTestcase(temp, `Incorrect SalesCommissionPolicyPremiumMTA!`);
    }
    if (TaxPolicyPremiumMTA) {
        const option = (TaxPolicyPremiumMTA.split("@"))[0];
        const expectedValue = (TaxPolicyPremiumMTA.split("@"))[1];
        temp = await quoteCreatingQuote.validateTax_MTA_PolicyPremium_Premium(numberToCurrency(expectedValue, true, Currency), option);
        logFailTestcase(temp, `Incorrect TaxPolicyPremiumMTA!`);
    }
    if (TotalPremiumPolicyPremiumMTA) {
        const option = (TotalPremiumPolicyPremiumMTA.split("@"))[0];
        const expectedValue = (TotalPremiumPolicyPremiumMTA.split("@"))[1];
        temp = await quoteCreatingQuote.validateTotalPremium_MTA_PolicyPremium_Premium(numberToCurrency(expectedValue, true, Currency), option);
        logFailTestcase(temp, `Incorrect Total Premium Policy PremiumMTA!`);
    }
    //#endregion
}

export async function inputPremiumSectionOnCreatingQuote(quoteCreatingQuote: QuoteCreatingQuote, row: any) {
    const UnderwritingAdjustment = row.UnderwritingAdjustment;
    const SalesDiscount = row.SalesDiscount;
    const ProductCommission = row.ProductCommission;
    const SalesCommission = row.SalesCommission;
    let temp = true;
    if (UnderwritingAdjustment) {
        temp = await quoteCreatingQuote.inputUnderwritingAdjustment_Premium(UnderwritingAdjustment);
        logFailTestcase(temp, `Input Underwriting adjustment failed!`);
    }
    if (SalesDiscount) {
        temp = await quoteCreatingQuote.inputSalesDiscount_Premium(SalesDiscount);
        logFailTestcase(temp, `Input Sales Discuount failed!`);
    }
    if (ProductCommission) {
        temp = await quoteCreatingQuote.inputProductCommission_Premium(ProductCommission);
        logFailTestcase(temp, `Input Product commission falied!`);
    }
    if (SalesCommission) {
        temp = await quoteCreatingQuote.inputSalesCommission_Premium(SalesCommission);
        logFailTestcase(temp, `Input Sales Commission failed!`);
    }
}

export async function checkValidationPremiumSectionOnCreatingQuote(quoteCreatingQuote: QuoteCreatingQuote, row: any) {

    const UnderwritingAdjustmentValidationMessage = row.UnderwritingAdjustmentValidationMessage;
    const SalesDiscountValidationMessage = row.SalesDiscountValidationMessage;
    const ProductCommissionValidationMessage = row.ProductCommissionValidationMessage;
    const SalesCommissionValidationMessage = row.SalesCommissionValidationMessage;
    let temp = true;

    if (UnderwritingAdjustmentValidationMessage) {
        temp = await quoteCreatingQuote.validateUnderwritingAdjustmentValidation_Premium(UnderwritingAdjustmentValidationMessage);
        logFailTestcase(temp, `Validate Underwriting adjustment validation failed!`);
    }

    if (SalesDiscountValidationMessage) {
        temp = await quoteCreatingQuote.validateSalesDiscountValidation_Premium(SalesDiscountValidationMessage);
        logFailTestcase(temp, `Validate Sales Discuount validation failed!`);
    }

    if (ProductCommissionValidationMessage) {
        temp = await quoteCreatingQuote.validateProductCommissionValidation_Premium(ProductCommissionValidationMessage);
        logFailTestcase(temp, `Validate Product commission validation failed!`);
    }

    if (SalesCommissionValidationMessage) {
        temp = await quoteCreatingQuote.validateSalesCommissionValidation_Premium(SalesCommissionValidationMessage);
        logFailTestcase(temp, `Validate Sales Commission validation failed!`);
    }

}

export async function verifyCoverBreakdownOnCreatingQuote(quoteCreatingQuote: QuoteCreatingQuote, rows: any, Currency: string) {
    let temp = true;
    for (let i = 0; i < rows.length; i++) {
        const Cover = rows[i].Cover;
        const AnnualPremium = rows[i].AnnualPremium;
        const AnnualIPT = rows[i].AnnualIPT;
        const Premium = rows[i].Premium;
        const IPT = rows[i].IPT;
        logInfoMessage(`Validating Cover breakdown at line ${i + 1}...`);
        temp = await quoteCreatingQuote.validateCoverTitleAtCoverBreakdown(Cover, i + 1);
        logFailTestcase(temp, `Validate Cover title failed!`);

        temp = await quoteCreatingQuote.validateAnnualPremiumAtCoverBreakdown(numberToCurrency(AnnualPremium, true, Currency), i + 1);
        logFailTestcase(temp, `Validate Annual Premium failed!`);

        temp = await quoteCreatingQuote.validateAnnualIPTAtCoverBreakdown(AnnualIPT ? numberToCurrency(AnnualIPT, true, Currency) : "N/A", i + 1);
        logFailTestcase(temp, `Validate Annual IPT failed!`);

        temp = await quoteCreatingQuote.validatePremiumAtCoverBreakdown(numberToCurrency(Premium, true, Currency), i + 1);
        logFailTestcase(temp, `Validate Premium failed!`);

        temp = await quoteCreatingQuote.validateIPTAtCoverBreakdown(IPT ? numberToCurrency(IPT, true, Currency) : "N/A", i + 1);
        logFailTestcase(temp, `Validate IPT failed!`);

    }
}