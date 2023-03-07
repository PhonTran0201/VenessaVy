import { PolicyDetails } from "../../../../../../page-objects/back-office-portal/general/policy/policy-layouts/PolicyDetails";
import { logFailTestcase, logInfoMessage } from "../../../../../../shared/functions";
import { numberToCurrency } from "../../../../../../shared/tenant-setting/tenant-setting";


export async function verifyPolicyInforOnPolicyDetails(policyDetails: PolicyDetails, row: any, Currency: string) {
    let temp = true;
    //#region POLICY INFO
    logInfoMessage("\n\t => Policy Info Section:\n");

    let Period = row.Period;
    let Product = row.Product;
    let SalesChannel = row.SalesChannel;
    let EffectiveDate = row.EffectiveDate;
    let TotalPremiumAnnualPremium = row.TotalPremiumAnnualPremium;
    let TotalPremiumPolicyPremium = row.TotalPremiumPolicyPremium;
    let StatusPolicy = row.StatusPolicy;
    let NameOfPreviousInsurer = row.NameOfPreviousInsurer;
    let RenewalMode = row.RenewalMode;

    if (Period) {
        temp = await policyDetails.validatePeriodPolicyInfo(Period);
        logFailTestcase(temp, `validate Period Policy Info failed!`);
    }

    if (Product) {
        temp = await policyDetails.validateProductPolicyInfo(Product);
        logFailTestcase(temp, `validate Product Policy Info failed!`);
    }


    if (SalesChannel) {
        temp = await policyDetails.validateChannelPolicyInfo(SalesChannel);
        logFailTestcase(temp, `validate Channel Policy Info failed!`);
    }


    if (EffectiveDate) {
        temp = await policyDetails.validateEffectiveDatePolicyInfo(EffectiveDate);
        logFailTestcase(temp, `validate EffectiveDate Policy Info failed!`);
    }


    if (TotalPremiumAnnualPremium) {
        temp = await policyDetails.validateAnnualPremiumPolicyInfo(numberToCurrency(TotalPremiumAnnualPremium, true, Currency));
        logFailTestcase(temp, `validate AnnualPremium Policy Info failed!`);
    }


    if (TotalPremiumPolicyPremium) {
        temp = await policyDetails.validatePolicyPremiumPolicyInfo(numberToCurrency(TotalPremiumPolicyPremium, true, Currency));
        logFailTestcase(temp, `validate PolicyPremium Policy Info failed!`);
    }


    if (StatusPolicy) {
        temp = await policyDetails.validateStatusPolicyInfo(StatusPolicy);
        logFailTestcase(temp, `validate StatusPolicy Policy Info failed`);
    }

    if (NameOfPreviousInsurer) {
        temp = await policyDetails.validatePreviousInsurerPolicyInfo(NameOfPreviousInsurer);
        logFailTestcase(temp, `validate NameOfPreviousInsurer Policy Info failed`);
    }

    if (RenewalMode) {
        temp = await policyDetails.validateRenewalModePolicyInfo(RenewalMode);
        logFailTestcase(temp, `validate RenewalMode Policy Info failed`);
    }
    //#endregion

}

export async function verifyCoverBreakdownOnPolicyDetails(policyDetails: PolicyDetails, rows: any, Currency: string) {
    let temp = true;
    for (let i = 0; i < rows.length; i++) {
        const Cover = rows[i].Cover;
        const AnnualPremium = rows[i].AnnualPremium;
        const AnnualIPT = rows[i].AnnualIPT;
        const Premium = rows[i].Premium;
        const IPT = rows[i].IPT;
        logInfoMessage(`Validating Cover breakdown at line ${i + 1}...`);
        temp = await policyDetails.validateCoverTitleAtCoverBreakdown(Cover, i + 1);
        logFailTestcase(temp, `Validate Cover title failed!`);

        temp = await policyDetails.validateAnnualPremiumAtCoverBreakdown(numberToCurrency(AnnualPremium, true, Currency), i + 1);
        logFailTestcase(temp, `Validate Annual Premium failed!`);

        temp = await policyDetails.validateAnnualIPTAtCoverBreakdown(AnnualIPT ? numberToCurrency(AnnualIPT, true, Currency) : "N/A", i + 1);
        logFailTestcase(temp, `Validate Annual IPT failed!`);

        temp = await policyDetails.validatePremiumAtCoverBreakdown(numberToCurrency(Premium, true, Currency), i + 1);
        logFailTestcase(temp, `Validate Premium failed!`);

        temp = await policyDetails.validateIPTAtCoverBreakdown(IPT ? numberToCurrency(IPT, true, Currency) : "N/A", i + 1);
        logFailTestcase(temp, `Validate IPT failed!`);
    }
}

export async function verifyPremiumSectionOnPolicyDetails(policyDetails: PolicyDetails, row: any, Currency: string) {
    let temp = true;
    // Cột Annual Premium
    const PremiumExlTaxAnnualPremium = row.PremiumExlTaxAnnualPremium;
    const UnderwritingAdjustmentAnnualPremium = row.UnderwritingAdjustmentAnnualPremium;
    const SalesDiscountAnnualPremium = row.SalesDiscountAnnualPremium;
    const ProductCommissionAnnualPremium = row.ProductCommissionAnnualPremium;
    const SalesCommissionAnnualPremium = row.SalesCommissionAnnualPremium;
    const TaxAnnualPremium = row.TaxAnnualPremium;
    const TotalPremiumAnnualPremium = row.TotalPremiumAnnualPremium;

    // Cột Policy Premium
    const PremiumExlTaxPolicyPremium = row.PremiumExlTaxPolicyPremium;
    const UnderwritingAdjustmentPolicyPremium = row.UnderwritingAdjustmentPolicyPremium;
    const SalesDiscountPolicyPremium = row.SalesDiscountPolicyPremium;
    const ProductCommissionPolicyPremium = row.ProductCommissionPolicyPremium;
    const SalesCommissionPolicyPremium = row.SalesCommissionPolicyPremium;
    const TaxPolicyPremium = row.TaxPolicyPremium;
    const TotalPremiumPolicyPremium = row.TotalPremiumPolicyPremium;

    //#region Cột Annual Premium
    if (PremiumExlTaxAnnualPremium) {
        temp = await policyDetails.validatePremiumExlTax_AnnualPremium_Premium(numberToCurrency(PremiumExlTaxAnnualPremium, true, Currency));
        logFailTestcase(temp, `Incorrect PremiumExlTaxAnnualPremium!`);
    }
    if (UnderwritingAdjustmentAnnualPremium) {
        temp = await policyDetails.validateUnderwritingAdjustment_AnnualPremium_Premium(numberToCurrency(UnderwritingAdjustmentAnnualPremium, true, Currency));
        logFailTestcase(temp, `Incorrect UnderwritingAdjustmentAnnualPremium!`);
    }
    if (SalesDiscountAnnualPremium) {
        temp = await policyDetails.validateSalesDiscount_AnnualPremium_Premium(numberToCurrency(SalesDiscountAnnualPremium, true, Currency));
        logFailTestcase(temp, `Incorrect SalesDiscountAnnualPremium!`);
    }
    if (ProductCommissionAnnualPremium) {
        temp = await policyDetails.validateProductCommission_AnnualPremium_Premium(numberToCurrency(ProductCommissionAnnualPremium, true, Currency));
        logFailTestcase(temp, `Incorrect ProductCommissionAnnualPremium!`);
    }
    if (SalesCommissionAnnualPremium) {
        temp = await policyDetails.validateSalesCommission_AnnualPremium_Premium(numberToCurrency(SalesCommissionAnnualPremium, true, Currency));
        logFailTestcase(temp, `Incorrect SalesCommissionAnnualPremium!`);
    }
    if (TaxAnnualPremium) {
        temp = await policyDetails.validateTax_AnnualPremium_Premium(numberToCurrency(TaxAnnualPremium, true, Currency));
        logFailTestcase(temp, `Incorrect TaxAnnualPremium!`);
    }

    if (TotalPremiumAnnualPremium) {
        temp = await policyDetails.validateTotalPremium_AnnualPremium_Premium(numberToCurrency(TotalPremiumAnnualPremium, true, Currency));
        logFailTestcase(temp, `Incorrect Total Premium Annual Premium!`);
    }
    //#endregion

    //#region Policy Premium
    if (PremiumExlTaxPolicyPremium) {
        temp = await policyDetails.validatePremiumExlTax_PolicyPremium_Premium(numberToCurrency(PremiumExlTaxPolicyPremium, true, Currency));
        logFailTestcase(temp, `Incorrect PremiumExlTaxPolicyPremium!`);
    }
    if (UnderwritingAdjustmentPolicyPremium) {
        temp = await policyDetails.validateUnderwritingAdjustment_PolicyPremium_Premium(numberToCurrency(UnderwritingAdjustmentPolicyPremium, true, Currency));
        logFailTestcase(temp, `Incorrect UnderwritingAdjustmentPolicyPremium!`);
    }
    if (SalesDiscountPolicyPremium) {
        temp = await policyDetails.validateSalesDiscount_PolicyPremium_Premium(numberToCurrency(SalesDiscountPolicyPremium, true, Currency));
        logFailTestcase(temp, `Incorrect SalesDiscountPolicyPremium!`);
    }
    if (ProductCommissionPolicyPremium) {
        temp = await policyDetails.validateProductCommission_PolicyPremium_Premium(numberToCurrency(ProductCommissionPolicyPremium, true, Currency));
        logFailTestcase(temp, `Incorrect ProductCommissionPolicyPremium!`);
    }
    if (SalesCommissionPolicyPremium) {
        temp = await policyDetails.validateSalesCommission_PolicyPremium_Premium(numberToCurrency(SalesCommissionPolicyPremium, true, Currency));
        logFailTestcase(temp, `Incorrect SalesCommissionPolicyPremium!`);
    }
    if (TaxPolicyPremium) {
        temp = await policyDetails.validateTax_PolicyPremium_Premium(numberToCurrency(TaxPolicyPremium, true, Currency));
        logFailTestcase(temp, `Incorrect TaxPolicyPremium!`);
    }
    if (TotalPremiumPolicyPremium) {
        temp = await policyDetails.validateTotalPremium_PolicyPremium_Premium(numberToCurrency(TotalPremiumPolicyPremium, true, Currency));
        logFailTestcase(temp, `Incorrect Total Premium Policy Premium!`);
    }
}
