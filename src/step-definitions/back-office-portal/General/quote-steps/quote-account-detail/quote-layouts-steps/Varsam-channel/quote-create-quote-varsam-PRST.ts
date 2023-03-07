import { Before, Given, When } from "@cucumber/cucumber";
import { DataRepo } from "../../../../../../../core/modals/DataRepo";
import { QuoteCreatePRST } from "../../../../../../../page-objects/back-office-portal/general/quote/quote-layouts/Varsam-channel/QuoteCreatePRST";
import { logFailTestcase, logInfoMessage } from "../../../../../../../shared/functions";
import { ICommonContext } from "../../../../../../../shared/interfaces";
import { numberToCurrency } from "../../../../../../../shared/tenant-setting/tenant-setting";
import { QuoteCreatingQuote } from './../../../../../../../page-objects/back-office-portal/general/quote/quote-layouts/QuoteCreatingQuote';



let quoteCreatingQuote: QuoteCreatingQuote
let quoteCreatePRST: QuoteCreatePRST
const loader = require("csv-load-sync");
Before(async function () {
    const context: ICommonContext = this.context;
    quoteCreatePRST = new QuoteCreatePRST(context.driverService)
    quoteCreatingQuote = new QuoteCreatingQuote(context.driverService)
});

When("User fills data for product Premium redistribution seasonal tariff {string}", async function (dataKey) {
    try {
        const data = await DataRepo.getInstance().loadData(dataKey);
        await quoteCreatePRST.settxtstartDate(data[0].StartDate);
        await quoteCreatePRST.settxtendDate(data[0].EndDate);
        await quoteCreatePRST.settxtPostCodeTag(data[0].PostcodeTag);
        await quoteCreatePRST.settxtPolicyHolderDOBTag(data[0].PolicyHolderDOBTag)

        await quoteCreatePRST.settxtCustomerClaimCountTag(data[0].CustomerClaimCountTag);
        await quoteCreatePRST.setNgSelectRentTypeTag(data[0].RentTypeTag)
        await quoteCreatePRST.setNgSelectAlarmSystemTag(data[0].AlarmSystemTag)
        await quoteCreatePRST.setNgSelectSmokeDetectorTag(data[0].SmokeDetectorTag)
        await quoteCreatePRST.setNgSelectWaterStopSystemTag(data[0].WaterStopSystemTag)
        await quoteCreatePRST.setNgSelectElectricityTag(data[0].ElectricityTag)
        await quoteCreatePRST.setNgSelectNumberOfResidentsTag(data[0].NumberOfResidentsTag)
        await quoteCreatePRST.setSelectIncludeHussoppCoverTag(data[0].IncludeHussoppCoverTag)
        await quoteCreatePRST.settxtContentSumInsuredTag(data[0].ContentSumInsuredTag)
        await quoteCreatePRST.setNgSelectCoverTypeTag(data[0].CoverTypeTag)
        await quoteCreatePRST.setNgSelectContentTypeTag(data[0].ContentTypeTag)
        await quoteCreatePRST.setNgSelectResidenceTypeTag(data[0].ResidentTypeTag)
        await quoteCreatePRST.setNgSelectDeductibleContentTag(data[0].DeductibleContentTag)
        await quoteCreatePRST.setNgSelectContentCoverTag(data[0].ContentCoverTag)
        await quoteCreatePRST.clickButtonNext()
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

Given("User verifies info on Creating Quote form for Varsam product PRST {string}", async function (filename) {
    const data = await DataRepo.getInstance().loadData(filename);
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

    for (let i = 0; i < data[0].CoverBreakdown.length; i++) {
        let arrayKeyCoverBreakdownKeys = Object.keys(data[0].CoverBreakdown[i]);

        let Cover = data[0].CoverBreakdown[i][arrayKeyCoverBreakdownKeys[0]];
        let AnnualPremium = data[0].CoverBreakdown[i][arrayKeyCoverBreakdownKeys[1]];
        let AnnualIPT = data[0].CoverBreakdown[i][arrayKeyCoverBreakdownKeys[2]];
        let Premium = data[0].CoverBreakdown[i][arrayKeyCoverBreakdownKeys[3]];
        let IPT = data[0].CoverBreakdown[i][arrayKeyCoverBreakdownKeys[4]];

        temp = await quoteCreatingQuote.validateCoverBreakdownByIndex(Cover, i + 1, 1);
        logFailTestcase(temp, `Validate Cover BreakDown field Cover failed!`);

        temp = await quoteCreatingQuote.validateCoverBreakdownByIndex(AnnualPremium ? numberToCurrency(AnnualPremium, true, Currency) : "N/A", i + 1, 2);
        logFailTestcase(temp, `Validate Cover BreakDown field AnnualPremium failed!`);

        temp = await quoteCreatingQuote.validateCoverBreakdownByIndex(AnnualIPT ? numberToCurrency(AnnualIPT, true, Currency) : "N/A", i + 1, 3);
        logFailTestcase(temp, `Validate Cover BreakDown field AnnualIPT failed!`);

        temp = await quoteCreatingQuote.validateCoverBreakdownByIndex(Premium ? numberToCurrency(Premium, true, Currency) : "N/A", i + 1, 4);
        logFailTestcase(temp, `Validate Cover BreakDown field Premium failed!`);

        temp = await quoteCreatingQuote.validateCoverBreakdownByIndex(IPT ? numberToCurrency(IPT, true, Currency) : "N/A", i + 1, 5);
        logFailTestcase(temp, `Validate Cover BreakDown field IPT failed!`);

    }

});
