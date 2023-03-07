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

    //#region Tạo đối tượng cover breakdown để verify

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

    //#region Tạo đối tượng cover breakdown để verify

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
            `Tack för förtroendet!\n` +
            `Vad roligt att du också har valt oss som din försäkringsleverantör för din älskade djur!\n` +
            `Vänligen kontrollera att uppgifterna i ditt försäkringsbrev är korrekta. \n` +
            `Om något inte stämmer ber vi dig att kontakta vår kundservice på telefonnummer \n` +
            `0500-10 10 20 utan dröjsmål.\n` +
            `Med vänliga hälsningar, \n` +
            `Varsam Försäkring\n` +
            `Kortfattat om din försäkring:\n` +
            `Veterinärvårdsförsäkringen omfattar både sjukdomar och olycksfall.\n` +
            `Du får alltid snabb och kompetent hjälp av oss om din smådjur blir sjuk eller skadad.\n` +
            `Genom att välja våra kunder i högre utsträckning kan vi erbjuda ett brett försäkringsskydd till\n` +
            `ett attraktivt pris – vi försäkrar de varsamma!\n` +
            `Vårt lojalitetsprogram – Varsam Reward\n` +
            `Genom att genomföra skadeförebyggande åtgärder och vara skadefri under året kan du samla\n` +
            `Varsam-Poäng i vår mobil-app. Dessa kan du sedan byta in mot fina premier i vår Varsam-Shop.\n` +
            `Vi premierar dig som är varsam och lojal!\n` +
            `Har du inte redan laddat ner vår app? Gör det redan idag. Du hittar den där appar finns.\n` +
            `Varsamma AB, med org.nr 556876 8674 är en svensk försäkringsförmedlare med tillstånd av \n` +
            `Finansinspektionen. Varsamma AB står under Finansinspektionens tillsyn. Besök oss på \n` +
            `www.varsamforsakring.se | Försäkringsgivare är Sveland Djurförsäkringar Ömsesidigt, med org.nr 545000–7165.\n` +
            `Försäkringsbrev\n` +
            `${formatDateTime(getCurrentDateTime(), 'yyyy-MM-dd').split(" ")[0]}\n` +
            `Försäkring för smådjur\n` +
            `FörsäkringstagareLena SmadjurFörsäkringsnummer:${getValueDataOfDataTestExecution("QuoteReference")}\n` +
            `Försäkringsperiod:${formatDateTime(getValueDataOfDataTestExecution("StartDate"), 'yyyy-MM-dd')} - ${formatDateTime(getValueDataOfDataTestExecution("EndDate"), 'yyyy-MM-dd')}\n` +
            `Adress:Kundnummer:4127\n` +
            `Postnummer:Årspremie:437,66 kr\n` +
            `Djur:SmådjurPeriodpremie:437,66 kr\n` +
            `Kön:HaneBetalningsmetod:Semi-Annually\n` +
            `Inköpsdatum:2023-01-01\n` +
            `Inköpspris:500 kr\n` +
            `Född:2010-01-01\n` +
            `Namn:Cat\n` +
            `Ras:Degus\n` +
            `Chipnr/regnr:PetChip\n` +
            `Din försäkring innehåller:\n` +
            `Försäkringsbelopp\n` +
            `Veterinärvårdsförsäkring10 000 kr\n` +
            `Fast självrisk: 2 000 kr\n` +
            `Rörlig självrisk: 20% av ersättningsbara kostnader\n` +
            `Försäkringsvillkor:\n` +
            `Varsam Djurförsäkring Allmänt Villkor Djur 2019-09-01\n` +
            `Varsam Djurförsäkring Särskilt Villkor Smådjur 2019-09-01\n` +
            `Övriga kommentarer:\n` +
            `Externtext\n` +
            `Varsamma AB, med org.nr 556876 8674 är en svensk försäkringsförmedlare med tillstånd av \n` +
            `Finansinspektionen. Varsamma AB står under Finansinspektionens tillsyn. Besök oss på \n` +
            `www.varsamforsakring.se | Försäkringsgivare är Sveland Djurförsäkringar Ömsesidigt, med org.nr 545000–7165.`).split("\n");

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
            `Din försäkring förnyas\n` +
            `Din försäkring förnyas och rullar på som vanligt. Vi ber dig kontrollera att uppgifterna fortfarande\n` +
            `stämmer. Om du vill ändra något ber vi dig att kontakta vår kundservice på telefonnummer 0500-\n` +
            `10 10 20 utan dröjsmål.\n` +
            `Om du sedan tidigare betalar via autogiro fortsätter månadsdragningarna som tidigare. \n` +
            `Betalar du helårsvis så kommer fakturan hem i brevlådan inom kort.\n` +
            `Kontakta oss gärna om du har några frågor, vi älskar att prata med våra kunder!\n` +
            `Med vänliga hälsningar, \n` +
            `Varsam Försäkring\n` +
            `Kortfattat om din försäkring:\n` +
            `Veterinärvårdsförsäkringen omfattar både sjukdomar och olycksfall.\n` +
            `Du får alltid snabb och kompetent hjälp av oss om din smådjur blir sjuk eller skadad.\n` +
            `Genom att välja våra kunder i högre utsträckning kan vi erbjuda ett brett försäkringsskydd till\n` +
            `ett attraktivt pris – vi försäkrar de varsamma!\n` +
            `Vårt lojalitetsprogram – Varsam Reward\n` +
            `Genom att genomföra skadeförebyggande åtgärder och vara skadefri under året kan du samla\n` +
            `Varsam-Poäng i vår mobil-app. Dessa kan du sedan byta in mot fina premier i vår Varsam-Shop.\n` +
            `Vi premierar dig som är varsam och lojal!\n` +
            `Har du inte redan laddat ner vår app? Gör det redan idag. Du hittar den där appar finns.\n` +
            `Varsamma AB, med org.nr 556876 8674 är en svensk försäkringsförmedlare med tillstånd av \n` +
            `Finansinspektionen. Varsamma AB står under Finansinspektionens tillsyn. Besök oss på \n` +
            `www.varsamforsakring.se | Försäkringsgivare är Sveland Djurförsäkringar Ömsesidigt, med org.nr 545000–7165.\n` +
            `Försäkringsbrev\n` +
            `(Förnyelse)\n` +
            `${formatDateTime(getCurrentDateTime(), 'yyyy-MM-dd').split(" ")[0]}\n` +
            `Försäkring för smådjur\n` +
            `FörsäkringstagareLena SmadjurFörsäkringsnummer:${getValueDataOfDataTestExecution("QuoteReference")}\n` +
            `Försäkringsperiod:${formatDateTime(getValueDataOfDataTestExecution("StartDate"), 'yyyy-MM-dd')} - ${formatDateTime(getValueDataOfDataTestExecution("EndDate"), 'yyyy-MM-dd')}\n` +
            `Adress:Kundnummer:4127\n` +
            `Postnummer:Årspremie:437,66 kr\n` +
            `Djur:SmådjurPeriodpremie:436,46 kr\n` +
            `Kön:HaneBetalningsmetod:Semi-Annually\n` +
            `Inköpsdatum:2023-01-01\n` +
            `Inköpspris:600 kr\n` +
            `Född:2011-01-01\n` +
            `Namn:Cat\n` +
            `Ras:Degus\n` +
            `Chipnr/regnr:PetChip\n` +
            `Din försäkring innehåller:\n` +
            `Försäkringsbelopp\n` +
            `Veterinärvårdsförsäkring10 000 kr\n` +
            `Fast självrisk: 2 000 kr\n` +
            `Rörlig självrisk: 20% av ersättningsbara kostnader\n` +
            `Försäkringsvillkor:\n` +
            `Varsam Djurförsäkring Allmänt Villkor Djur 2019-09-01\n` +
            `Varsam Djurförsäkring Särskilt Villkor Smådjur 2019-09-01\n` +
            `Övriga kommentarer:\n` +
            `Externtext\n` +
            `Varsamma AB, med org.nr 556876 8674 är en svensk försäkringsförmedlare med tillstånd av \n` +
            `Finansinspektionen. Varsamma AB står under Finansinspektionens tillsyn. Besök oss på \n` +
            `www.varsamforsakring.se | Försäkringsgivare är Sveland Djurförsäkringar Ömsesidigt, med org.nr 545000–7165.`).split("\n");

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
            `Tack för förtroendet!\n` +
            `Vad roligt att du också har valt oss som din försäkringsleverantör för din älskade djur!\n` +
            `Vänligen kontrollera att uppgifterna i ditt försäkringsbrev är korrekta. \n` +
            `Om något inte stämmer ber vi dig att kontakta vår kundservice på telefonnummer \n` +
            `0500-10 10 20 utan dröjsmål.\n` +
            `Med vänliga hälsningar, \n` +
            `Varsam Försäkring\n` +
            `Kortfattat om din försäkring:\n` +
            `Veterinärvårdsförsäkringen omfattar både sjukdomar och olycksfall.\n` +
            `Du får alltid snabb och kompetent hjälp av oss om din smådjur blir sjuk eller skadad.\n` +
            `Genom att välja våra kunder i högre utsträckning kan vi erbjuda ett brett försäkringsskydd till\n` +
            `ett attraktivt pris – vi försäkrar de varsamma!\n` +
            `Vårt lojalitetsprogram – Varsam Reward\n` +
            `Genom att genomföra skadeförebyggande åtgärder och vara skadefri under året kan du samla\n` +
            `Varsam-Poäng i vår mobil-app. Dessa kan du sedan byta in mot fina premier i vår Varsam-Shop.\n` +
            `Vi premierar dig som är varsam och lojal!\n` +
            `Har du inte redan laddat ner vår app? Gör det redan idag. Du hittar den där appar finns.\n` +
            `Varsamma AB, med org.nr 556876 8674 är en svensk försäkringsförmedlare med tillstånd av \n` +
            `Finansinspektionen. Varsamma AB står under Finansinspektionens tillsyn. Besök oss på \n` +
            `www.varsamforsakring.se | Försäkringsgivare är Sveland Djurförsäkringar Ömsesidigt, med org.nr 545000–7165.\n` +
            `Försäkringsbrev\n` +
            `${formatDateTime(getCurrentDateTime(), 'yyyy-MM-dd').split(" ")[0]}\n` +
            `Försäkring för smådjur\n` +
            `FörsäkringstagareLena SmadjurFörsäkringsnummer:${getValueDataOfDataTestExecution("QuoteReference")}\n` +
            `Försäkringsperiod:${formatDateTime(getValueDataOfDataTestExecution("StartDate"), 'yyyy-MM-dd')} - ${formatDateTime(getValueDataOfDataTestExecution("EndDate"), 'yyyy-MM-dd')}\n` +
            `Adress:Kundnummer:4127\n` +
            `Postnummer:Årspremie:437,66 kr\n` +
            `Djur:SmådjurPeriodpremie:437,66 kr\n` +
            `Kön:HaneBetalningsmetod:Semi-Annually\n` +
            `Inköpsdatum:2023-01-01\n` +
            `Inköpspris:900 kr\n` +
            `Född:2011-01-01\n` +
            `Namn:Cat\n` +
            `Ras:Degus\n` +
            `Chipnr/regnr:PetChip\n` +
            `Din försäkring innehåller:\n` +
            `Försäkringsbelopp\n` +
            `Veterinärvårdsförsäkring10 000 kr\n` +
            `Fast självrisk: 2 000 kr\n` +
            `Rörlig självrisk: 20% av ersättningsbara kostnader\n` +
            `Försäkringsvillkor:\n` +
            `Varsam Djurförsäkring Allmänt Villkor Djur 2019-09-01\n` +
            `Varsam Djurförsäkring Särskilt Villkor Smådjur 2019-09-01\n` +
            `Övriga kommentarer:\n` +
            `Externtext\n` +
            `Varsamma AB, med org.nr 556876 8674 är en svensk försäkringsförmedlare med tillstånd av \n` +
            `Finansinspektionen. Varsamma AB står under Finansinspektionens tillsyn. Besök oss på \n` +
            `www.varsamforsakring.se | Försäkringsgivare är Sveland Djurförsäkringar Ömsesidigt, med org.nr 545000–7165.`).split("\n");

    console.log("\nExpected content file:\n");
    console.log(expectedContentFile);

    for (let i = 0; i < expectedContentFile.length; i++) {
        if (expectedContentFile[i].trim() !== actualContenInfile[i].trim()) {
            logFailTestcase(false, `\t\tLine ${i + 1}: Expected: ${expectedContentFile[i]} - Actual: ${actualContenInfile[i]}`);
        }
    }
});