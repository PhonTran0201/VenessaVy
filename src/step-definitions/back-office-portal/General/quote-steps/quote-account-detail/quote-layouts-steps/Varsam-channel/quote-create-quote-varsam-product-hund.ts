import { Before, Given, When } from "@cucumber/cucumber";
import { DataRepo } from "../../../../../../../core/modals/DataRepo";
import { logFailTestcase, logInfoMessage } from "../../../../../../../shared/functions";
import { ICommonContext } from "../../../../../../../shared/interfaces";
import { numberToCurrency } from "../../../../../../../shared/tenant-setting/tenant-setting";
import { QuoteCreatingQuote } from './../../../../../../../page-objects/back-office-portal/general/quote/quote-layouts/QuoteCreatingQuote';
import { QuoteCreateHundPage } from './../../../../../../../page-objects/back-office-portal/general/quote/quote-layouts/Varsam-channel/QuoteCreateHundPage';


let quoteCreateHundPage: QuoteCreateHundPage;
let quoteCreatingQuote: QuoteCreatingQuote
Before(async function () {
    const context: ICommonContext = this.context;
    quoteCreateHundPage = new QuoteCreateHundPage(context.driverService)
    quoteCreatingQuote = new QuoteCreatingQuote(context.driverService)
});

When("User fills data for product Hund {string}", async function (dataKey) {
    try {
        const data = await DataRepo.getInstance().loadData(dataKey);
        await quoteCreateHundPage.settxtstartDate(data[0].StartDate);
        await quoteCreateHundPage.settxtendDate(data[0].EndDate);
        await quoteCreateHundPage.setNgSelectPreviousInsurerTag(data[0].PreviousInsurerTag);
        await quoteCreateHundPage.settxtDogNameTag(data[0].DogNameTag);
        await quoteCreateHundPage.settxtDogDOBTag(data[0].DogDOB)
        await quoteCreateHundPage.settxtDogIDTag(data[0].DogID)
        await quoteCreateHundPage.settxtDogChipTag(data[0].DogChipTag)
        await quoteCreateHundPage.setSelectDogInsuranceProductsTag(data[0].DogInsuranceProductsTag)
        await quoteCreateHundPage.setNgSelectDogBreedTag(data[0].DogBreedTag)
        await quoteCreateHundPage.settxtDogPurchasedDateTag(data[0].DogPurchaseDateTag)
        await quoteCreateHundPage.settxtDogPurchaseValueTag(data[0].DogPurchaseValueTag)
        await quoteCreateHundPage.setSelectDogGenderTag(data[0].DogGenderTag)
        await quoteCreateHundPage.setSelectHasAnInspectionBeenCarriedOutTag(data[0].HasAnInspectionBeenCarriedOutTag)
        await quoteCreateHundPage.setSelectDogImportedTag(data[0].DogImportedTag)
        await quoteCreateHundPage.settxtDogImportedCountryTag(data[0].DogImportedCountryTag)
        await quoteCreateHundPage.setSelectDogTreatedByVetTag(data[0].DogTreatedByVetTag)
        await quoteCreateHundPage.setSelectDogTreatedWithMedicineTag(data[0].DogTreatedWithMedicineTag)
        await quoteCreateHundPage.setSelectDogHasUncheckedProblemsTag(data[0].DogHasUncheckedProblemsTag)
        await quoteCreateHundPage.setSelectDogHasClaimPaymentsTag(data[0].DogHasClaimPaymentsTag)
        await quoteCreateHundPage.setSelectDogIsHealthyTag(data[0].DogIsHealthyTag)
        await quoteCreateHundPage.setNgSelectDeductibleAmountTag(data[0].NgSelectDeductibleAmountTag)
        await quoteCreateHundPage.setSelectLifeInsuranceTag(data[0].NgSelectLifeInsuranceTag)
        await quoteCreateHundPage.setSelectPersonalAccidentTag(data[0].PersonalAccidentTag)
        await quoteCreateHundPage.clickButtonNext()
        await quoteCreatingQuote.inputUnderwritingAdjustment_Premium(data[0].UnderwritingAdjustment)
        await quoteCreatingQuote.inputSalesDiscount_Premium(data[0].SalesDiscount)
        await quoteCreatingQuote.inputProductCommission_Premium(data[0].ProductCommission)
        await quoteCreatingQuote.inputSalesCommission_Premium(data[0].SalesCommission)
        await quoteCreatingQuote.pressCalculateButton_Premium()
        //#endregion
    } catch (error) {
        logFailTestcase(false, (error as Error).message + "\r\n" + (error as Error).stack);
    }
});

Given("User verifies info on Creating Quote form for Varsam product Hund {string}", async function (dataKey) {
    const data = await DataRepo.getInstance().loadData(dataKey);
    const quoteCreatingQuote = new QuoteCreatingQuote(this.context.driverService);
    let temp = true;

    let AnnualPremium_PremiumExlTax = data[0].Premium[0].AnnualPremium_PremiumExlTax;
    let AnnualPremium_UnderwritingAdjustment = data[0].Premium[0].AnnualPremium_UnderwritingAdjustment;
    let AnnualPremium_SalesDiscount = data[0].Premium[0].AnnualPremium_SalesDiscount;
    let AnnualPremium_ProductCommission = data[0].Premium[0].AnnualPremium_ProductCommission;
    let AnnualPremium_SalesCommission = data[0].Premium[0].AnnualPremium_SalesCommission;
    let AnnualPremium_Tax = data[0].Premium[0].AnnualPremium_Tax;
    let AnnualPremium_TotalPremium = data[0].Premium[0].AnnualPremium_TotalPremium;


    let PolicyPremium_PremiumExlTax = data[0].Premium[1].PolicyPremium_PremiumExlTax;
    let PolicyPremium_UnderwritingAdjustment = data[0].Premium[1].PolicyPremium_UnderwritingAdjustment;
    let PolicyPremium_SalesDiscount = data[0].Premium[1].PolicyPremium_SalesDiscount;
    let PolicyPremium_ProductCommission = data[0].Premium[1].PolicyPremium_ProductCommission;
    let PolicyPremium_SalesCommission = data[0].Premium[1].PolicyPremium_SalesCommission;
    let PolicyPremium_Tax = data[0].Premium[1].PolicyPremium_Tax;
    let PolicyPremium_TotalPremium = data[0].Premium[1].PolicyPremium_TotalPremium;

    let Currency = data[0].Currency;


    logInfoMessage(`\tVerify PREMIUM SECTION :`);
    temp = await quoteCreatingQuote.validatePremiumExlTax_AnnualPremium_Premium(numberToCurrency(AnnualPremium_PremiumExlTax, true, Currency));
    logFailTestcase(temp, "Incorrect PremiumExlTax");

    temp = await quoteCreatingQuote.validateUnderwritingAdjustment_AnnualPremium_Premium(numberToCurrency(AnnualPremium_UnderwritingAdjustment, true, Currency));
    logFailTestcase(temp, `Incorrect UnderwritingAdjustment`);

    temp = await quoteCreatingQuote.validateSalesDiscount_AnnualPremium_Premium(numberToCurrency(AnnualPremium_SalesDiscount, true, Currency));
    logFailTestcase(temp, `Incorrect SalesDiscount`);

    temp = await quoteCreatingQuote.validateProductCommission_AnnualPremium_Premium(numberToCurrency(AnnualPremium_ProductCommission, true, Currency));
    logFailTestcase(temp, `Incorrect ProductCommission`);

    temp = await quoteCreatingQuote.validateSalesCommission_AnnualPremium_Premium(AnnualPremium_SalesCommission);
    logFailTestcase(temp, `Incorrect SalesCommission`);

    temp = await quoteCreatingQuote.validateTax_AnnualPremium_Premium(numberToCurrency(AnnualPremium_Tax, true, Currency));
    logFailTestcase(temp, `Incorrect AnnualTax`);

    temp = await quoteCreatingQuote.validateTotalPremium_AnnualPremium_Premium(numberToCurrency(AnnualPremium_TotalPremium, true, Currency));
    logFailTestcase(temp, `Incorrect TotalAnnualPremium`);



    temp = await quoteCreatingQuote.validatePremiumExlTax_PolicyPremium_Premium(numberToCurrency(PolicyPremium_PremiumExlTax, true, Currency));
    logFailTestcase(temp, "Incorrect PremiumExlTax");

    temp = await quoteCreatingQuote.validateUnderwritingAdjustment_PolicyPremium_Premium(numberToCurrency(PolicyPremium_UnderwritingAdjustment, true, Currency));
    logFailTestcase(temp, `Incorrect UnderwritingAdjustment`);

    temp = await quoteCreatingQuote.validateSalesDiscount_PolicyPremium_Premium(numberToCurrency(PolicyPremium_SalesDiscount, true, Currency));
    logFailTestcase(temp, `Incorrect SalesDiscount`);

    temp = await quoteCreatingQuote.validateProductCommission_PolicyPremium_Premium(numberToCurrency(PolicyPremium_ProductCommission, true, Currency));
    logFailTestcase(temp, `Incorrect ProductCommission`);

    temp = await quoteCreatingQuote.validateSalesCommission_PolicyPremium_Premium(PolicyPremium_SalesCommission);
    logFailTestcase(temp, `Incorrect SalesCommission`);

    temp = await quoteCreatingQuote.validateTax_PolicyPremium_Premium(numberToCurrency(PolicyPremium_Tax, true, Currency));
    logFailTestcase(temp, `Incorrect PolicyTax`);

    temp = await quoteCreatingQuote.validateTotalPremium_PolicyPremium_Premium(numberToCurrency(PolicyPremium_TotalPremium, true, Currency));
    logFailTestcase(temp, `Incorrect Tax`);


    logInfoMessage(`\tVerify COVER BREAKDOWN SECTION :`);
    let arrayKeyCoverBreakdownAnnualPremium = Object.keys(data[0].CoverBreakdown[0]);
    let arrayKeyCoverBreakdownPolicyPremium = Object.keys(data[0].CoverBreakdown[1]);

    //ANNUAL PREMIUM COLUMN
    for (let i = 0; i < arrayKeyCoverBreakdownAnnualPremium.length; i++) {
        temp = await quoteCreatingQuote.validateCoverBreakdownByIndex(numberToCurrency(data[0].CoverBreakdown[0][arrayKeyCoverBreakdownAnnualPremium[i]], true, Currency), i + 1, 2);
        logFailTestcase(temp, `Incorrect value at '${arrayKeyCoverBreakdownAnnualPremium[i]}' annual premium column`);

        temp = await quoteCreatingQuote.validateCoverBreakdownByIndex(numberToCurrency(data[0].CoverBreakdown[1][arrayKeyCoverBreakdownPolicyPremium[i]], true, Currency), i + 1, 3);
        logFailTestcase(temp, `Incorrect value at '${arrayKeyCoverBreakdownPolicyPremium[i]}' policy premium column`);
    }


});
