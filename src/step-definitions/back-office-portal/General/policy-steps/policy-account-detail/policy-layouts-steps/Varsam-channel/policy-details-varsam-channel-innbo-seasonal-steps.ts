import { Before, Then, When } from "@cucumber/cucumber";
import { AccountTabPolicyDetails } from "../../../../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-policy/AccountTabPolicyDetails";
import { GlobalPageObject } from "../../../../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { addDate, convertPathFileDataToDataRegression, getAge, getCurrentDateTime, getDate, getTheContentInPDFFile, getTheFirstFileNameByPathInFolder, logFailTestcase, logInfoMessage } from "../../../../../../../shared/functions";
import { ICommonContext } from "../../../../../../../shared/interfaces";
import { PolicyCalculation } from "../../../../../../../shared/policy-calculations/PolicyCalculation";
import { VarsamSeasonalConfig } from "../../../../../../../shared/policy-calculations/VarsamSeasonalConfig";
import { VarsamSeasonalCoverBreakdown } from "../../../../../../../shared/policy-calculations/VarsamSeasonalCoverBreakdown";
import { VarsamSeasonalInitialValue } from "../../../../../../../shared/policy-calculations/VarsamSeasonalInitialValue";
import { formatDateTime } from "../../../../../../../shared/tenant-setting/tenant-setting";
import { dataTestExecution, DownloadFilePathGlobalVariable } from "../../../../../../../shared/variables";
import { getValueDataOfDataTestExecution, pushObjectToDataArrayWithUniqueKey } from "../../../../../../../storage-data/functions/data-test-execution";
import { verifyCoverBreakdownOnPolicyDetails, verifyPolicyInforOnPolicyDetails, verifyPremiumSectionOnPolicyDetails } from "../policy-details-functions";

let accountTabPolicyDetails: AccountTabPolicyDetails;
let globalPageObject: GlobalPageObject;


const loader = require("csv-load-sync");

Before(async function () {
    const context: ICommonContext = this.context;
    accountTabPolicyDetails = new AccountTabPolicyDetails(context.driverService);
    globalPageObject = new GlobalPageObject(context.driverService);
});

Then(`User verifies policy information at policy detail page for Varsam product Innbo Seasonal - Renewal case {string}`, async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];

    let SalesChannel = row.SalesChannel;
    let Product = row.Product
    let startDate = row.StartDate;
    let endDate = row.EndDate;
    let StartDateMinusToday = row.StartDateMinusToday;
    let EndDateMinusStartDate = row.EndDateMinusStartDate;
    let EndDateMinusToday = row.EndDateMinusToday;

    let DOB = row.DOB;
    let StatusPolicy = row.StatusPolicy;
    let NameOfPreviousInsurer = row.NameOfPreviousInsurer;
    let RenewalMode = row.RenewalMode;
    let Currency = row.Currency;

    const Hussopp = row.Hussopp;
    // EL-SYKKEL
    const AddBicycle1 = row.AddBicycle1;
    const BicycleSumInsured1 = row.BicycleSumInsured1;
    const ElectricBicycleCover1 = row.ElectricBicycleCover1;
    const AddBicycle2 = row.AddBicycle2;
    const BicycleSumInsured2 = row.BicycleSumInsured2;
    const ElectricBicycleCover2 = row.ElectricBicycleCover2;

    let CoverBreakdownFilePath = row.CoverBreakdownFilePath;
    let PremiumFilePath = row.PremiumFilePath;

    if (StartDateMinusToday) {
        startDate = getDate(StartDateMinusToday);
    }
    if (EndDateMinusStartDate) {
        endDate = addDate(startDate, EndDateMinusStartDate);
    }
    if (EndDateMinusToday) {
        endDate = getDate(EndDateMinusToday);
    }

    let EffectiveDate = row.EffectiveDate;
    if (!EffectiveDate) {
        EffectiveDate = startDate;
    }

    //#region POLICY INFO
    //#region Initial value InnboSeasonal
    let yearOfStartDate = parseInt(startDate.split("/")[2]);
    let configRate = VarsamSeasonalConfig.getConfigRate(yearOfStartDate);
    let policyCalculation = new PolicyCalculation();

    // %
    const rateOfUnderwritingAdjustment = Number(getValueDataOfDataTestExecution("rateOfUnderwritingAdjustment"));
    const rateOfSalesDiscount = Number(getValueDataOfDataTestExecution("rateOfSalesDiscount"));
    const rateOfProductCommission = Number(getValueDataOfDataTestExecution("rateOfProductCommission"));
    const rateOfSalesCommission = Number(getValueDataOfDataTestExecution("rateOfSalesCommission"));

    // Annual Premium
    const initialValuePremium = VarsamSeasonalInitialValue.getInitialValuePremium(
        Product,
        getValueDataOfDataTestExecution("CoverTypeConfig"),
        getAge(DOB, startDate),
        Hussopp && Hussopp === "Yes" ? true : false,
        AddBicycle1 && AddBicycle1 === "Yes" ? true : false,
        AddBicycle2 && AddBicycle2 === "Yes" ? true : false
    );

    const premiumExlTaxAnnualPremium = initialValuePremium.PremiumExlTax;

    const taxAnnualPremium = initialValuePremium.Tax;

    // Policy Premium
    const taxPolicyPremium = policyCalculation.getTaxPolicyPremium(startDate, endDate, taxAnnualPremium, configRate);
    //#endregion

    let temp2 = policyCalculation.getPremiumForNewBusiness(
        startDate,
        endDate,
        rateOfUnderwritingAdjustment,
        rateOfSalesDiscount,
        rateOfProductCommission,
        rateOfSalesCommission,
        premiumExlTaxAnnualPremium,
        taxAnnualPremium,
        taxPolicyPremium,
        configRate
    );

    logInfoMessage("\n\t => Policy Info Section:\n");
    let rowTemp0 = {
        "Period": startDate + " - " + endDate,
        "Product": Product,
        "SalesChannel": SalesChannel,
        "EffectiveDate": EffectiveDate,
        "TotalPremiumAnnualPremium": temp2.AnnualPremium.TotalPremium,
        "TotalPremiumPolicyPremium": temp2.PolicyPremium.TotalPremium,
        "StatusPolicy": StatusPolicy,
        "NameOfPreviousInsurer": NameOfPreviousInsurer,
        "RenewalMode": RenewalMode,
    }
    console.log("\n");
    console.log(dataTestExecution);
    console.log("\n");


    await verifyPolicyInforOnPolicyDetails(accountTabPolicyDetails, rowTemp0, Currency);
    //#endregion

    //#region PREMIUM
    logInfoMessage("\n\t => Premium Section:");


    const _row = {
        "PremiumExlTaxAnnualPremium": temp2.AnnualPremium.PremiumExlTax,
        "UnderwritingAdjustmentAnnualPremium": temp2.AnnualPremium.UnderwritingAdjustment,
        "SalesDiscountAnnualPremium": temp2.AnnualPremium.SalesDiscount,
        "ProductCommissionAnnualPremium": temp2.AnnualPremium.ProductCommission,
        "SalesCommissionAnnualPremium": temp2.AnnualPremium.SalesCommission,
        "TaxAnnualPremium": temp2.AnnualPremium.Tax,
        "TotalPremiumAnnualPremium": temp2.AnnualPremium.TotalPremium,

        "PremiumExlTaxPolicyPremium": temp2.PolicyPremium.PremiumExlTax,
        "UnderwritingAdjustmentPolicyPremium": temp2.PolicyPremium.UnderwritingAdjustment,
        "SalesDiscountPolicyPremium": temp2.PolicyPremium.SalesDiscount,
        "ProductCommissionPolicyPremium": temp2.PolicyPremium.ProductCommission,
        "SalesCommissionPolicyPremium": temp2.PolicyPremium.SalesCommission,
        "TaxPolicyPremium": temp2.PolicyPremium.Tax,
        "TotalPremiumPolicyPremium": temp2.PolicyPremium.TotalPremium
    }
    await verifyPremiumSectionOnPolicyDetails(accountTabPolicyDetails, _row, Currency);

    //COVER BREAKDOWN 
    logInfoMessage("\tCheck Cover Breakdown:\n");

    //#region Initital value for Cover Breakdown
    const initialValue = VarsamSeasonalInitialValue.getInitialValueCoverBreakdown(Product, getAge(DOB, startDate)).initialValue;

    const initialRate = {
        "rateOfUnderwritingAdjustment": rateOfUnderwritingAdjustment,
        "rateOfSalesDiscount": rateOfSalesDiscount,
        "rateOfProductCommission": rateOfProductCommission,
        "rateOfSalesCommission": rateOfSalesCommission
    }

    const initialIPT = VarsamSeasonalInitialValue.getInitialValueCoverBreakdown(Product, getAge(DOB, startDate)).initialIPT;

    let coverBreakdown = VarsamSeasonalCoverBreakdown.getCoverBreakdown(getValueDataOfDataTestExecution("CoverTypeConfig"), initialValue, initialRate, initialIPT, startDate, endDate);
    //#endregion

    //#region T???o ?????i t?????ng cover breakdown ????? verify

    let temp3 = [
        {
            "Cover": "Innbo Standard",
            "AnnualPremium": coverBreakdown.AnnualPremium.InnboStandard,
            "AnnualIPT": coverBreakdown.AnnualIPT.InnboStandard,
            "Premium": coverBreakdown.PolicyPremium.InnboStandard,
            "IPT": coverBreakdown.IPT.InnboStandard
        }
    ]
    if (Hussopp && Hussopp.localeCompare("Yes") === 0) {
        temp3.unshift(
            {
                "Cover": "Hussopp",
                "AnnualPremium": coverBreakdown.AnnualPremium.Hussopp,
                "AnnualIPT": coverBreakdown.AnnualIPT.Hussopp,
                "Premium": coverBreakdown.PolicyPremium.Hussopp === 0 ? "" : coverBreakdown.PolicyPremium.Hussopp,
                "IPT": coverBreakdown.IPT.Hussopp === 0 ? "" : coverBreakdown.IPT.Hussopp
            }
        );
    }
    if ((ElectricBicycleCover1 && ElectricBicycleCover1.localeCompare("Standard dekning") === 0) || (ElectricBicycleCover2 && ElectricBicycleCover2.localeCompare("Standard dekning") === 0)) {
        temp3.unshift(
            {
                "Cover": "EL-sykkel Standard",
                "AnnualPremium": coverBreakdown.AnnualPremium.ElSykkelStandard,
                "AnnualIPT": coverBreakdown.AnnualIPT.ElSykkelStandard,
                "Premium": coverBreakdown.PolicyPremium.ElSykkelStandard === 0 ? "" : coverBreakdown.PolicyPremium.ElSykkelStandard,
                "IPT": coverBreakdown.IPT.ElSykkelStandard === 0 ? "" : coverBreakdown.IPT.ElSykkelStandard
            }
        );
    }
    if ((ElectricBicycleCover1 && ElectricBicycleCover1.localeCompare("Super dekning") === 0) || (ElectricBicycleCover2 && ElectricBicycleCover2.localeCompare("Super dekning") === 0)) {
        temp3.unshift(
            {
                "Cover": "EL-sykkel Super",
                "AnnualPremium": coverBreakdown.AnnualPremium.ElSykkelSuper,
                "AnnualIPT": coverBreakdown.AnnualIPT.ElSykkelSuper,
                "Premium": coverBreakdown.PolicyPremium.ElSykkelSuper === 0 ? "" : coverBreakdown.PolicyPremium.ElSykkelSuper,
                "IPT": coverBreakdown.IPT.ElSykkelSuper === 0 ? "" : coverBreakdown.IPT.ElSykkelSuper
            }
        );
    }
    //#endregion

    await verifyCoverBreakdownOnPolicyDetails(accountTabPolicyDetails, temp3, Currency);
    //#endregion

    //#region Save these values for check fields on Download file
    pushObjectToDataArrayWithUniqueKey("StartDate", startDate);
    pushObjectToDataArrayWithUniqueKey("EndDate", endDate);
    pushObjectToDataArrayWithUniqueKey("HussoppPolicyPremiumCoverBreakdown", temp3[0].Premium.toString());
    pushObjectToDataArrayWithUniqueKey("InnboStandardPolicyPremiumCoverBreakdown", temp3[1].Premium.toString());
    pushObjectToDataArrayWithUniqueKey("HussoppAnnualPremiumCoverBreakdown", temp3[0].AnnualPremium.toString());
    pushObjectToDataArrayWithUniqueKey("InnboStandardAnnualPremiumCoverBreakdown", temp3[1].AnnualPremium.toString());
    //#endregion

});

Then(`User verifies policy information at policy detail page after renew for Varsam product Innbo Seasonal - Renewal case {string}`, async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];

    let SalesChannel = row.SalesChannel;
    let Product = row.Product
    let startDate = getValueDataOfDataTestExecution("StartDateAfterRenew");
    let endDate = getValueDataOfDataTestExecution("EndDateAfterRenew");

    const Hussopp = row.Hussopp;
    // EL-SYKKEL
    const AddBicycle1 = row.AddBicycle1;
    const BicycleSumInsured1 = row.BicycleSumInsured1;
    const ElectricBicycleCover1 = row.ElectricBicycleCover1;
    const AddBicycle2 = row.AddBicycle2;
    const BicycleSumInsured2 = row.BicycleSumInsured2;
    const ElectricBicycleCover2 = row.ElectricBicycleCover2;

    let DOB = row.DOB;
    let StatusPolicy = row.StatusPolicy;
    let NameOfPreviousInsurer = row.NameOfPreviousInsurer;
    let RenewalMode = row.RenewalMode;
    let Currency = row.Currency;

    let EffectiveDate = startDate;


    //#region POLICY INFO
    //#region Initial value InnboSeasonal
    let yearOfStartDate = parseInt(startDate.split("/")[2]);
    let configRate = VarsamSeasonalConfig.getConfigRate(yearOfStartDate);
    let policyCalculation = new PolicyCalculation();

    // %
    const rateOfUnderwritingAdjustment = Number(getValueDataOfDataTestExecution("rateOfUnderwritingAdjustment"));
    const rateOfSalesDiscount = Number(getValueDataOfDataTestExecution("rateOfSalesDiscount"));
    const rateOfProductCommission = Number(getValueDataOfDataTestExecution("rateOfProductCommission"));
    const rateOfSalesCommission = Number(getValueDataOfDataTestExecution("rateOfSalesCommission"));

    // Annual Premium
    const initialValuePremium = VarsamSeasonalInitialValue.getInitialValuePremium(
        Product,
        getValueDataOfDataTestExecution("CoverTypeConfig"),
        getAge(DOB, startDate),
        Hussopp && Hussopp === "Yes" ? true : false,
        AddBicycle1 && AddBicycle1 === "Yes" ? true : false,
        AddBicycle2 && AddBicycle2 === "Yes" ? true : false
    );
    const premiumExlTaxAnnualPremium = initialValuePremium.PremiumExlTax;
    const taxAnnualPremium = initialValuePremium.Tax;

    // Policy Premium
    const taxPolicyPremium = policyCalculation.getTaxPolicyPremium(startDate, endDate, taxAnnualPremium, configRate);
    //#endregion

    let temp2 = policyCalculation.getPremiumForNewBusiness(
        startDate,
        endDate,
        rateOfUnderwritingAdjustment,
        rateOfSalesDiscount,
        rateOfProductCommission,
        rateOfSalesCommission,
        premiumExlTaxAnnualPremium,
        taxAnnualPremium,
        taxPolicyPremium,
        configRate
    );

    logInfoMessage("\n\t => Policy Info Section:\n");
    let rowTemp0 = {
        "Period": startDate + " - " + endDate,
        "Product": Product,
        "SalesChannel": SalesChannel,
        "EffectiveDate": EffectiveDate,
        "TotalPremiumAnnualPremium": temp2.AnnualPremium.TotalPremium,
        "TotalPremiumPolicyPremium": temp2.AnnualPremium.TotalPremium,
        "StatusPolicy": StatusPolicy,
        "NameOfPreviousInsurer": NameOfPreviousInsurer,
        "RenewalMode": RenewalMode,
    }
    await verifyPolicyInforOnPolicyDetails(accountTabPolicyDetails, rowTemp0, Currency);
    //#endregion

    //#region PREMIUM
    logInfoMessage("\n\t => Premium Section:");


    const _row = {
        "PremiumExlTaxAnnualPremium": temp2.AnnualPremium.PremiumExlTax,
        "UnderwritingAdjustmentAnnualPremium": temp2.AnnualPremium.UnderwritingAdjustment,
        "SalesDiscountAnnualPremium": temp2.AnnualPremium.SalesDiscount,
        "ProductCommissionAnnualPremium": temp2.AnnualPremium.ProductCommission,
        "SalesCommissionAnnualPremium": temp2.AnnualPremium.SalesCommission,
        "TaxAnnualPremium": temp2.AnnualPremium.Tax,
        "TotalPremiumAnnualPremium": temp2.AnnualPremium.TotalPremium,

        "PremiumExlTaxPolicyPremium": temp2.AnnualPremium.PremiumExlTax,
        "UnderwritingAdjustmentPolicyPremium": temp2.AnnualPremium.UnderwritingAdjustment,
        "SalesDiscountPolicyPremium": temp2.AnnualPremium.SalesDiscount,
        "ProductCommissionPolicyPremium": temp2.AnnualPremium.ProductCommission,
        "SalesCommissionPolicyPremium": temp2.AnnualPremium.SalesCommission,
        "TaxPolicyPremium": temp2.AnnualPremium.Tax,
        "TotalPremiumPolicyPremium": temp2.AnnualPremium.TotalPremium
    }
    await verifyPremiumSectionOnPolicyDetails(accountTabPolicyDetails, _row, Currency);

    //COVER BREAKDOWN 
    logInfoMessage("\tCheck Cover Breakdown:\n");
    //#region Initital value for Cover Breakdown
    const initialValue = VarsamSeasonalInitialValue.getInitialValueCoverBreakdown(Product, getAge(DOB, startDate)).initialValue;

    const initialRate = {
        "rateOfUnderwritingAdjustment": rateOfUnderwritingAdjustment,
        "rateOfSalesDiscount": rateOfSalesDiscount,
        "rateOfProductCommission": rateOfProductCommission,
        "rateOfSalesCommission": rateOfSalesCommission
    }

    const initialIPT = VarsamSeasonalInitialValue.getInitialValueCoverBreakdown(Product, getAge(DOB, startDate)).initialIPT;


    let coverBreakdown = VarsamSeasonalCoverBreakdown.getCoverBreakdown(getValueDataOfDataTestExecution("CoverTypeConfig"), initialValue, initialRate, initialIPT, startDate, endDate);
    //#endregion

    //#region T???o ?????i t?????ng cover breakdown ????? verify

    let temp3 = [
        {
            "Cover": "Innbo Standard",
            "AnnualPremium": coverBreakdown.AnnualPremium.InnboStandard,
            "AnnualIPT": coverBreakdown.AnnualIPT.InnboStandard,
            "Premium": coverBreakdown.PolicyPremium.InnboStandard,
            "IPT": coverBreakdown.IPT.InnboStandard
        }
    ]
    if (Hussopp && Hussopp.localeCompare("Yes") === 0) {
        temp3.unshift(
            {
                "Cover": "Hussopp",
                "AnnualPremium": coverBreakdown.AnnualPremium.Hussopp,
                "AnnualIPT": coverBreakdown.AnnualIPT.Hussopp,
                "Premium": coverBreakdown.PolicyPremium.Hussopp === 0 ? "" : coverBreakdown.PolicyPremium.Hussopp,
                "IPT": coverBreakdown.IPT.Hussopp === 0 ? "" : coverBreakdown.IPT.Hussopp
            }
        );
    }
    if ((ElectricBicycleCover1 && ElectricBicycleCover1.localeCompare("Standard dekning") === 0) || (ElectricBicycleCover2 && ElectricBicycleCover2.localeCompare("Standard dekning") === 0)) {
        temp3.unshift(
            {
                "Cover": "EL-sykkel Standard",
                "AnnualPremium": coverBreakdown.AnnualPremium.ElSykkelStandard,
                "AnnualIPT": coverBreakdown.AnnualIPT.ElSykkelStandard,
                "Premium": coverBreakdown.PolicyPremium.ElSykkelStandard === 0 ? "" : coverBreakdown.PolicyPremium.ElSykkelStandard,
                "IPT": coverBreakdown.IPT.ElSykkelStandard === 0 ? "" : coverBreakdown.IPT.ElSykkelStandard
            }
        );
    }
    if ((ElectricBicycleCover1 && ElectricBicycleCover1.localeCompare("Super dekning") === 0) || (ElectricBicycleCover2 && ElectricBicycleCover2.localeCompare("Super dekning") === 0)) {
        temp3.unshift(
            {
                "Cover": "EL-sykkel Super",
                "AnnualPremium": coverBreakdown.AnnualPremium.ElSykkelSuper,
                "AnnualIPT": coverBreakdown.AnnualIPT.ElSykkelSuper,
                "Premium": coverBreakdown.PolicyPremium.ElSykkelSuper === 0 ? "" : coverBreakdown.PolicyPremium.ElSykkelSuper,
                "IPT": coverBreakdown.IPT.ElSykkelSuper === 0 ? "" : coverBreakdown.IPT.ElSykkelSuper
            }
        );
    }
    //#endregion


    await verifyCoverBreakdownOnPolicyDetails(accountTabPolicyDetails, temp3, Currency);
    //#endregion

    //#region Save these values for check fields on Download file
    pushObjectToDataArrayWithUniqueKey("StartDate", startDate);
    pushObjectToDataArrayWithUniqueKey("EndDate", endDate);
    pushObjectToDataArrayWithUniqueKey("HussoppPolicyPremiumCoverBreakdown", temp3[0].Premium.toString());
    pushObjectToDataArrayWithUniqueKey("InnboStandardPolicyPremiumCoverBreakdown", temp3[1].Premium.toString());
    pushObjectToDataArrayWithUniqueKey("HussoppAnnualPremiumCoverBreakdown", temp3[0].AnnualPremium.toString());
    pushObjectToDataArrayWithUniqueKey("InnboStandardAnnualPremiumCoverBreakdown", temp3[1].AnnualPremium.toString());
    //#endregion
});

When("User verifies content of New Business Policy document for product Smadjur", async () => {
    let filedownloadPath = DownloadFilePathGlobalVariable + "/" + getTheFirstFileNameByPathInFolder(DownloadFilePathGlobalVariable, "pdf");
    console.log(`filedownloadPath: ` + filedownloadPath);

    let actualContenInfile = (await getTheContentInPDFFile(filedownloadPath)).replace(/^\s*\n/gm, "").split("\n");
    console.log("AcctualFile: ");
    console.log(actualContenInfile);
    // const fs = require('fs');

    // const content = 'Some content!';

    // fs.writeFile('./test.txt', actualContenInfile, err => {
    //     if (err) {
    //         console.error(err);
    //     }
    //     // file written successfully
    // });
    let expectedContentFile =
        (`Lena Smadjur \n` +
            `${formatDateTime(getCurrentDateTime(), 'yyyy-MM-dd').split(" ")[0]}\n` +
            `Tack f??r f??rtroendet!\n` +
            `Vad roligt att du ocks?? har valt oss som din f??rs??kringsleverant??r f??r din ??lskade djur!\n` +
            `V??nligen kontrollera att uppgifterna i ditt f??rs??kringsbrev ??r korrekta. \n` +
            `Om n??got inte st??mmer ber vi dig att kontakta v??r kundservice p?? telefonnummer \n` +
            `0500-10 10 20 utan dr??jsm??l.\n` +
            `Med v??nliga h??lsningar, \n` +
            `Varsam F??rs??kring\n` +
            `Kortfattat om din f??rs??kring:\n` +
            `Veterin??rv??rdsf??rs??kringen omfattar b??de sjukdomar och olycksfall.\n` +
            `Du f??r alltid snabb och kompetent hj??lp av oss om din sm??djur blir sjuk eller skadad.\n` +
            `Genom att v??lja v??ra kunder i h??gre utstr??ckning kan vi erbjuda ett brett f??rs??kringsskydd till\n` +
            `ett attraktivt pris ??? vi f??rs??krar de varsamma!\n` +
            `V??rt lojalitetsprogram ??? Varsam Reward\n` +
            `Genom att genomf??ra skadef??rebyggande ??tg??rder och vara skadefri under ??ret kan du samla\n` +
            `Varsam-Po??ng i v??r mobil-app. Dessa kan du sedan byta in mot fina premier i v??r Varsam-Shop.\n` +
            `Vi premierar dig som ??r varsam och lojal!\n` +
            `Har du inte redan laddat ner v??r app? G??r det redan idag. Du hittar den d??r appar finns.\n` +
            `Varsamma AB, med org.nr 556876 8674 ??r en svensk f??rs??kringsf??rmedlare med tillst??nd av \n` +
            `Finansinspektionen. Varsamma AB st??r under Finansinspektionens tillsyn. Bes??k oss p?? \n` +
            `www.varsamforsakring.se | F??rs??kringsgivare ??r Sveland Djurf??rs??kringar ??msesidigt, med org.nr 545000???7165.\n` +
            `F??rs??kringsbrev\n` +
            `${formatDateTime(getCurrentDateTime(), 'yyyy-MM-dd').split(" ")[0]}\n` +
            `F??rs??kring f??r sm??djur\n` +
            `F??rs??kringstagareLena SmadjurF??rs??kringsnummer:${getValueDataOfDataTestExecution("QuoteReference")}\n` +
            `F??rs??kringsperiod:${formatDateTime(getValueDataOfDataTestExecution("StartDate"), 'yyyy-MM-dd')} - ${formatDateTime(getValueDataOfDataTestExecution("EndDate"), 'yyyy-MM-dd')}\n` +
            `Adress:Kundnummer:4127\n` +
            `Postnummer:??rspremie:437,66 kr\n` +
            `Djur:Sm??djurPeriodpremie:437,66 kr\n` +
            `K??n:HaneBetalningsmetod:Semi-Annually\n` +
            `Ink??psdatum:2023-01-01\n` +
            `Ink??pspris:500 kr\n` +
            `F??dd:2010-01-01\n` +
            `Namn:Cat\n` +
            `Ras:Degus\n` +
            `Chipnr/regnr:PetChip\n` +
            `Din f??rs??kring inneh??ller:\n` +
            `F??rs??kringsbelopp\n` +
            `Veterin??rv??rdsf??rs??kring10 000 kr\n` +
            `Fast sj??lvrisk: 2 000 kr\n` +
            `R??rlig sj??lvrisk: 20% av ers??ttningsbara kostnader\n` +
            `F??rs??kringsvillkor:\n` +
            `Varsam Djurf??rs??kring Allm??nt Villkor Djur 2019-09-01\n` +
            `Varsam Djurf??rs??kring S??rskilt Villkor Sm??djur 2019-09-01\n` +
            `??vriga kommentarer:\n` +
            `Externtext\n` +
            `Varsamma AB, med org.nr 556876 8674 ??r en svensk f??rs??kringsf??rmedlare med tillst??nd av \n` +
            `Finansinspektionen. Varsamma AB st??r under Finansinspektionens tillsyn. Bes??k oss p?? \n` +
            `www.varsamforsakring.se | F??rs??kringsgivare ??r Sveland Djurf??rs??kringar ??msesidigt, med org.nr 545000???7165.`).split("\n");

    console.log("\nExpected content file:\n");
    console.log(expectedContentFile);

    for (let i = 0; i < expectedContentFile.length; i++) {
        if (expectedContentFile[i].trim() !== actualContenInfile[i].trim()) {
            logFailTestcase(false, `\t\tLine ${i + 1}: Expected: ${expectedContentFile[i]} - Actual: ${actualContenInfile[i]}`);
        }
    }
});

When("User verifies content of Renewal Policy document for product Smadjur", async () => {
    let filedownloadPath = DownloadFilePathGlobalVariable + "/" + getTheFirstFileNameByPathInFolder(DownloadFilePathGlobalVariable, "pdf");
    console.log(`filedownloadPath: ` + filedownloadPath);

    let actualContenInfile = (await getTheContentInPDFFile(filedownloadPath)).replace(/^\s*\n/gm, "").split("\n");
    console.log("AcctualFile: ");
    console.log(actualContenInfile);

    // const fs = require('fs');
    // const content = 'Some content!';
    // fs.writeFile('./test2.txt', actualContenInfile, err => {
    //     if (err) {
    //         console.error(err);
    //     }
    //     // file written successfully
    // });

    let expectedContentFile =
        (`Lena Smadjur \n` +
            `${formatDateTime(getCurrentDateTime(), 'yyyy-MM-dd').split(" ")[0]}\n` +
            `Din f??rs??kring f??rnyas\n` +
            `Din f??rs??kring f??rnyas och rullar p?? som vanligt. Vi ber dig kontrollera att uppgifterna fortfarande\n` +
            `st??mmer. Om du vill ??ndra n??got ber vi dig att kontakta v??r kundservice p?? telefonnummer 0500-\n` +
            `10 10 20 utan dr??jsm??l.\n` +
            `Om du sedan tidigare betalar via autogiro forts??tter m??nadsdragningarna som tidigare. \n` +
            `Betalar du hel??rsvis s?? kommer fakturan hem i brevl??dan inom kort.\n` +
            `Kontakta oss g??rna om du har n??gra fr??gor, vi ??lskar att prata med v??ra kunder!\n` +
            `Med v??nliga h??lsningar, \n` +
            `Varsam F??rs??kring\n` +
            `Kortfattat om din f??rs??kring:\n` +
            `Veterin??rv??rdsf??rs??kringen omfattar b??de sjukdomar och olycksfall.\n` +
            `Du f??r alltid snabb och kompetent hj??lp av oss om din sm??djur blir sjuk eller skadad.\n` +
            `Genom att v??lja v??ra kunder i h??gre utstr??ckning kan vi erbjuda ett brett f??rs??kringsskydd till\n` +
            `ett attraktivt pris ??? vi f??rs??krar de varsamma!\n` +
            `V??rt lojalitetsprogram ??? Varsam Reward\n` +
            `Genom att genomf??ra skadef??rebyggande ??tg??rder och vara skadefri under ??ret kan du samla\n` +
            `Varsam-Po??ng i v??r mobil-app. Dessa kan du sedan byta in mot fina premier i v??r Varsam-Shop.\n` +
            `Vi premierar dig som ??r varsam och lojal!\n` +
            `Har du inte redan laddat ner v??r app? G??r det redan idag. Du hittar den d??r appar finns.\n` +
            `Varsamma AB, med org.nr 556876 8674 ??r en svensk f??rs??kringsf??rmedlare med tillst??nd av \n` +
            `Finansinspektionen. Varsamma AB st??r under Finansinspektionens tillsyn. Bes??k oss p?? \n` +
            `www.varsamforsakring.se | F??rs??kringsgivare ??r Sveland Djurf??rs??kringar ??msesidigt, med org.nr 545000???7165.\n` +
            `F??rs??kringsbrev\n` +
            `(F??rnyelse)\n` +
            `${formatDateTime(getCurrentDateTime(), 'yyyy-MM-dd').split(" ")[0]}\n` +
            `F??rs??kring f??r sm??djur\n` +
            `F??rs??kringstagareLena SmadjurF??rs??kringsnummer:${getValueDataOfDataTestExecution("QuoteReference")}\n` +
            `F??rs??kringsperiod:${formatDateTime(getValueDataOfDataTestExecution("StartDate"), 'yyyy-MM-dd')} - ${formatDateTime(getValueDataOfDataTestExecution("EndDate"), 'yyyy-MM-dd')}\n` +
            `Adress:Kundnummer:4127\n` +
            `Postnummer:??rspremie:437,66 kr\n` +
            `Djur:Sm??djurPeriodpremie:436,46 kr\n` +
            `K??n:HaneBetalningsmetod:Semi-Annually\n` +
            `Ink??psdatum:2023-01-01\n` +
            `Ink??pspris:600 kr\n` +
            `F??dd:2011-01-01\n` +
            `Namn:Cat\n` +
            `Ras:Degus\n` +
            `Chipnr/regnr:PetChip\n` +
            `Din f??rs??kring inneh??ller:\n` +
            `F??rs??kringsbelopp\n` +
            `Veterin??rv??rdsf??rs??kring10 000 kr\n` +
            `Fast sj??lvrisk: 2 000 kr\n` +
            `R??rlig sj??lvrisk: 20% av ers??ttningsbara kostnader\n` +
            `F??rs??kringsvillkor:\n` +
            `Varsam Djurf??rs??kring Allm??nt Villkor Djur 2019-09-01\n` +
            `Varsam Djurf??rs??kring S??rskilt Villkor Sm??djur 2019-09-01\n` +
            `??vriga kommentarer:\n` +
            `Externtext\n` +
            `Varsamma AB, med org.nr 556876 8674 ??r en svensk f??rs??kringsf??rmedlare med tillst??nd av \n` +
            `Finansinspektionen. Varsamma AB st??r under Finansinspektionens tillsyn. Bes??k oss p?? \n` +
            `www.varsamforsakring.se | F??rs??kringsgivare ??r Sveland Djurf??rs??kringar ??msesidigt, med org.nr 545000???7165.`).split("\n");

    console.log("\nExpected content file:\n");
    console.log(expectedContentFile);

    for (let i = 0; i < expectedContentFile.length; i++) {
        if (expectedContentFile[i].trim() !== actualContenInfile[i].trim()) {
            logFailTestcase(false, `\t\tLine ${i + 1}: Expected: ${expectedContentFile[i]} - Actual: ${actualContenInfile[i]}`);
        }
    }
});

When("User verifies content of MTA Policy document for product Smadjur", async () => {
    let filedownloadPath = DownloadFilePathGlobalVariable + "/" + getTheFirstFileNameByPathInFolder(DownloadFilePathGlobalVariable, "pdf");
    console.log(`filedownloadPath: ` + filedownloadPath);

    let actualContenInfile = (await getTheContentInPDFFile(filedownloadPath)).replace(/^\s*\n/gm, "").split("\n");
    console.log("AcctualFile: ");
    console.log(actualContenInfile);

    // const fs = require('fs');
    // const content = 'Some content!';
    // fs.writeFile('./test2.txt', actualContenInfile, err => {
    //     if (err) {
    //         console.error(err);
    //     }
    //     // file written successfully
    // });

    let expectedContentFile =
        (`Lena Smadjur \n` +
            `${formatDateTime(getCurrentDateTime(), 'yyyy-MM-dd').split(" ")[0]}\n` +
            `Tack f??r f??rtroendet!\n` +
            `Vad roligt att du ocks?? har valt oss som din f??rs??kringsleverant??r f??r din ??lskade djur!\n` +
            `V??nligen kontrollera att uppgifterna i ditt f??rs??kringsbrev ??r korrekta. \n` +
            `Om n??got inte st??mmer ber vi dig att kontakta v??r kundservice p?? telefonnummer \n` +
            `0500-10 10 20 utan dr??jsm??l.\n` +
            `Med v??nliga h??lsningar, \n` +
            `Varsam F??rs??kring\n` +
            `Kortfattat om din f??rs??kring:\n` +
            `Veterin??rv??rdsf??rs??kringen omfattar b??de sjukdomar och olycksfall.\n` +
            `Du f??r alltid snabb och kompetent hj??lp av oss om din sm??djur blir sjuk eller skadad.\n` +
            `Genom att v??lja v??ra kunder i h??gre utstr??ckning kan vi erbjuda ett brett f??rs??kringsskydd till\n` +
            `ett attraktivt pris ??? vi f??rs??krar de varsamma!\n` +
            `V??rt lojalitetsprogram ??? Varsam Reward\n` +
            `Genom att genomf??ra skadef??rebyggande ??tg??rder och vara skadefri under ??ret kan du samla\n` +
            `Varsam-Po??ng i v??r mobil-app. Dessa kan du sedan byta in mot fina premier i v??r Varsam-Shop.\n` +
            `Vi premierar dig som ??r varsam och lojal!\n` +
            `Har du inte redan laddat ner v??r app? G??r det redan idag. Du hittar den d??r appar finns.\n` +
            `Varsamma AB, med org.nr 556876 8674 ??r en svensk f??rs??kringsf??rmedlare med tillst??nd av \n` +
            `Finansinspektionen. Varsamma AB st??r under Finansinspektionens tillsyn. Bes??k oss p?? \n` +
            `www.varsamforsakring.se | F??rs??kringsgivare ??r Sveland Djurf??rs??kringar ??msesidigt, med org.nr 545000???7165.\n` +
            `F??rs??kringsbrev\n` +
            `${formatDateTime(getCurrentDateTime(), 'yyyy-MM-dd').split(" ")[0]}\n` +
            `F??rs??kring f??r sm??djur\n` +
            `F??rs??kringstagareLena SmadjurF??rs??kringsnummer:${getValueDataOfDataTestExecution("QuoteReference")}\n` +
            `F??rs??kringsperiod:${formatDateTime(getValueDataOfDataTestExecution("StartDate"), 'yyyy-MM-dd')} - ${formatDateTime(getValueDataOfDataTestExecution("EndDate"), 'yyyy-MM-dd')}\n` +
            `Adress:Kundnummer:4127\n` +
            `Postnummer:??rspremie:437,66 kr\n` +
            `Djur:Sm??djurPeriodpremie:437,66 kr\n` +
            `K??n:HaneBetalningsmetod:Semi-Annually\n` +
            `Ink??psdatum:2023-01-01\n` +
            `Ink??pspris:900 kr\n` +
            `F??dd:2011-01-01\n` +
            `Namn:Cat\n` +
            `Ras:Degus\n` +
            `Chipnr/regnr:PetChip\n` +
            `Din f??rs??kring inneh??ller:\n` +
            `F??rs??kringsbelopp\n` +
            `Veterin??rv??rdsf??rs??kring10 000 kr\n` +
            `Fast sj??lvrisk: 2 000 kr\n` +
            `R??rlig sj??lvrisk: 20% av ers??ttningsbara kostnader\n` +
            `F??rs??kringsvillkor:\n` +
            `Varsam Djurf??rs??kring Allm??nt Villkor Djur 2019-09-01\n` +
            `Varsam Djurf??rs??kring S??rskilt Villkor Sm??djur 2019-09-01\n` +
            `??vriga kommentarer:\n` +
            `Externtext\n` +
            `Varsamma AB, med org.nr 556876 8674 ??r en svensk f??rs??kringsf??rmedlare med tillst??nd av \n` +
            `Finansinspektionen. Varsamma AB st??r under Finansinspektionens tillsyn. Bes??k oss p?? \n` +
            `www.varsamforsakring.se | F??rs??kringsgivare ??r Sveland Djurf??rs??kringar ??msesidigt, med org.nr 545000???7165.`).split("\n");

    console.log("\nExpected content file:\n");
    console.log(expectedContentFile);

    for (let i = 0; i < expectedContentFile.length; i++) {
        if (expectedContentFile[i].trim() !== actualContenInfile[i].trim()) {
            logFailTestcase(false, `\t\tLine ${i + 1}: Expected: ${expectedContentFile[i]} - Actual: ${actualContenInfile[i]}`);
        }
    }
});