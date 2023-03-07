import { Before, Given, When } from "@cucumber/cucumber";
import { DataRepo } from "../../../../../../../core/modals/data_repo";
import { DataRepo as DataRepo2 } from "../../../../../../../core/modals/DataRepo";
import { AccountTabQuoteCreatingQuoteVarsamProductInnboSeasonal } from "../../../../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-quote/Varsam-channel/AccountTabQuoteCreatingQuoteVarsamProductInnboSeasonal";
import { GlobalPageObject } from "../../../../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { QuoteCreatingQuote } from "../../../../../../../page-objects/back-office-portal/general/quote/quote-layouts/QuoteCreatingQuote";
import { UnderwritingAdjustmentReasonForm } from "../../../../../../../page-objects/back-office-portal/general/quote/underwriting-adjustment-reason/UnderwritingAdjustmentReasonForm";
import { addDate, convertPathFileDataToDataRegression, getAge, getDate, logFailTestcase, logInfoMessage, logWarningTestcase } from "../../../../../../../shared/functions";
import { ICommonContext } from "../../../../../../../shared/interfaces";
import { PolicyCalculation } from "../../../../../../../shared/policy-calculations/PolicyCalculation";
import { VarsamSeasonalConfig } from "../../../../../../../shared/policy-calculations/VarsamSeasonalConfig";
import { VarsamSeasonalCoverBreakdown } from "../../../../../../../shared/policy-calculations/VarsamSeasonalCoverBreakdown";
import { VarsamSeasonalInitialValue } from "../../../../../../../shared/policy-calculations/VarsamSeasonalInitialValue";
import { UserProfileInfo } from "../../../../../../../shared/user-profile/UserProfileInfo";
import { getValueDataOfDataTestExecution, pushObjectToDataArrayWithUniqueKey } from "../../../../../../../storage-data/functions/data-test-execution";
import { checkValidationPremiumSectionOnCreatingQuote, inputPremiumSectionOnCreatingQuote, verifyCoverBreakdownOnCreatingQuote, verifyPremiumSectionOnCreatingQuote, verifyPremiumSectionOnCreatingQuoteFromJSON } from "../quote-creating-quote-function";


let accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal: AccountTabQuoteCreatingQuoteVarsamProductInnboSeasonal;
let globalPageObject: GlobalPageObject;
const loader = require("csv-load-sync");
let underwritingAdjustmentReasonForm: UnderwritingAdjustmentReasonForm;

Before(async function () {
    const context: ICommonContext = this.context;
    accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal = new AccountTabQuoteCreatingQuoteVarsamProductInnboSeasonal(context.driverService);
    globalPageObject = new GlobalPageObject(context.driverService);
    underwritingAdjustmentReasonForm = new UnderwritingAdjustmentReasonForm(context.driverService);
});

Given("User verifies info on Creating Quote form for Varsam product Innbo Seasonal {string}", async function (filename) {
    let rows = await DataRepo2.getInstance().loadData(filename);
    let row = rows[0];
    if (filename.includes('json')) {
        row = rows;
    }

    const QuoteReference = getValueDataOfDataTestExecution("QuoteReference");
    const AlertMessages = row.AlertMessages;
    let startDate = row.StartDate;
    let endDate = row.EndDate;
    const StartDateMinusToday = row.StartDateMinusToday;
    const EndDateMinusStartDate = row.EndDateMinusStartDate;
    const ExpiryDate = getDate(30);// Theo setting mặc định thì sẽ bằng 30 ngày
    const Product = row.Product || row.ProductName;
    const SalesPerson = "Sales Person:\n " + UserProfileInfo.getDisplayName() + " - Organization: " + UserProfileInfo.getOrganization();
    const PremiumFilePath = row.PremiumFilePath || row.Premium;
    const CoverBreakdownFilePath = row.CoverBreakdownFilePath || row.CoverBreakdown;
    const Currency = row.Currency;

    //ACTIONS
    if (StartDateMinusToday && EndDateMinusStartDate) {
        startDate = getDate(StartDateMinusToday);
        endDate = addDate(startDate, EndDateMinusStartDate);
    }

    let temp = true;

    temp = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.validateQuoteRef(QuoteReference);
    logFailTestcase(temp, `Incorrect Quote Ref`);


    temp = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.validateSalesPerson(SalesPerson);
    // logFailTestcase(temp, `Incorrect SalesPerson`);

    if (AlertMessages) {
        logInfoMessage("\tALERT MESSAGES:");
        const alerts = AlertMessages.split(";");
        for (const alert of alerts) {
            temp = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.isAlertMessageExisted(alert);
            logFailTestcase(temp, `NOT found alert message "${alert}"!`);
        }
    }


    logInfoMessage("\tINSURANCE INFORMATION:");
    temp = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.validatePolicyTerm_InsuranceInformation(startDate + " - " + endDate);
    logFailTestcase(temp, `Incorrect Policy term`);

    temp = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.validateExpiryDate_InsuranceInformation(ExpiryDate);
    logWarningTestcase(temp, `Incorrect Expiry Date`);

    temp = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.validateProduct_InsuranceInformation(Product);
    logFailTestcase(temp, `Incorrect Product!`);

    logInfoMessage("\tPREMIUM:");
    if (PremiumFilePath) {
        let _row;
        if (row.PremiumFilePath) {
            _row = loader(convertPathFileDataToDataRegression(PremiumFilePath))[0];
            await verifyPremiumSectionOnCreatingQuote(accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal, _row);
        }
        else { 
            _row = PremiumFilePath; 
            await verifyPremiumSectionOnCreatingQuoteFromJSON(accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal, _row); 
        }
    }

    if (CoverBreakdownFilePath) {
        let rows;
        logInfoMessage("\tCOVER BREAKDOWN:");
        if (row.CoverBreakdownFilePath) {
            rows = loader(convertPathFileDataToDataRegression(CoverBreakdownFilePath));
        } else { rows = CoverBreakdownFilePath }
        await verifyCoverBreakdownOnCreatingQuote(accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal, rows, Currency);
    }
});

Given("User verifies info on Creating Quote form for Varsam product Innbo Seasonal - Renewal case {string}", async function (filename) {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const row = rows[0];

    const QuoteReference = getValueDataOfDataTestExecution("QuoteReference");
    const AlertMessages = row.AlertMessages;
    let startDate = row.StartDate;
    let endDate = row.EndDate;
    const StartDateMinusToday = row.StartDateMinusToday;
    const EndDateMinusStartDate = row.EndDateMinusStartDate;
    const EndDateMinusToday = row.EndDateMinusToday;

    const Hussopp = row.Hussopp;
    // EL-SYKKEL
    const AddBicycle1 = row.AddBicycle1;
    const BicycleSumInsured1 = row.BicycleSumInsured1;
    const ElectricBicycleCover1 = row.ElectricBicycleCover1;
    const AddBicycle2 = row.AddBicycle2;
    const BicycleSumInsured2 = row.BicycleSumInsured2;
    const ElectricBicycleCover2 = row.ElectricBicycleCover2;

    const DOB = row.DOB;
    const ExpiryDate = getDate(30);// Theo setting mặc định thì sẽ bằng 30 ngày
    const Product = row.Product;
    const SalesPerson = "Sales Person:\n " + UserProfileInfo.getDisplayName() + " - Organization: " + UserProfileInfo.getOrganization();
    const Currency = row.Currency;

    //ACTIONS
    if (StartDateMinusToday) {
        startDate = getDate(StartDateMinusToday);
    }
    if (EndDateMinusStartDate) {
        endDate = addDate(startDate, EndDateMinusStartDate);
    }
    if (EndDateMinusToday) {
        endDate = getDate(EndDateMinusToday);
    }
    let temp = true;

    temp = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.validateQuoteRef(QuoteReference);
    logFailTestcase(temp, `Incorrect Quote Ref`);


    temp = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.validateSalesPerson(SalesPerson);
    // logFailTestcase(temp, `Incorrect SalesPerson`);

    if (AlertMessages) {
        logInfoMessage("\tALERT MESSAGES:");
        const alerts = AlertMessages.split(";");
        for (const alert of alerts) {
            temp = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.isAlertMessageExisted(alert);
            logFailTestcase(temp, `NOT found alert message "${alert}"!`);
        }
    }


    logInfoMessage("\tINSURANCE INFORMATION:");
    temp = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.validatePolicyTerm_InsuranceInformation(startDate + " - " + endDate);
    logFailTestcase(temp, `Incorrect Policy term`);

    temp = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.validateExpiryDate_InsuranceInformation(ExpiryDate);
    logFailTestcase(temp, `Incorrect Expiry Date`);

    temp = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.validateProduct_InsuranceInformation(Product);
    logFailTestcase(temp, `Incorrect Product!`);


    //#region PREMIUM
    logInfoMessage("\tPREMIUM:");
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
    // const premiumExlTaxAnnualPremium = 1840104.04;
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
        "TotalPremiumPolicyPremium": temp2.PolicyPremium.TotalPremium,


        "Currency": Currency
    }
    await verifyPremiumSectionOnCreatingQuote(accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal, _row);
    pushObjectToDataArrayWithUniqueKey("Product", Product);
    pushObjectToDataArrayWithUniqueKey("Currency", Currency);
    pushObjectToDataArrayWithUniqueKey("StartDate", startDate);
    pushObjectToDataArrayWithUniqueKey("EndDate", endDate);
    pushObjectToDataArrayWithUniqueKey("PolicyPremium", _row.TotalPremiumPolicyPremium.toString());
    //#endregion

    //#region Cover Breakdown
    logInfoMessage("\tCOVER BREAKDOWN:");

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


    await verifyCoverBreakdownOnCreatingQuote(accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal, temp3, Currency);
    //#endregion
});

// For case VAR-1167
Given("User verifies info on Creating Quote form for Varsam product Innbo Seasonal - Renewal case - Partial Insurance {string}", async function (filename) {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const row = rows[0];

    const QuoteReference = getValueDataOfDataTestExecution("QuoteReference");
    const AlertMessages = row.AlertMessages;
    let startDate = row.StartDate;
    let endDate = row.EndDate;
    const StartDateMinusToday = row.StartDateMinusToday;
    const EndDateMinusStartDate = row.EndDateMinusStartDate;
    const EndDateMinusToday = row.EndDateMinusToday;

    const Hussopp = row.Hussopp;
    // EL-SYKKEL
    const AddBicycle1 = row.AddBicycle1;
    const BicycleSumInsured1 = row.BicycleSumInsured1;
    const ElectricBicycleCover1 = row.ElectricBicycleCover1;
    const AddBicycle2 = row.AddBicycle2;
    const BicycleSumInsured2 = row.BicycleSumInsured2;
    const ElectricBicycleCover2 = row.ElectricBicycleCover2;

    const DOB = row.DOB;
    const ExpiryDate = getDate(30);// Theo setting mặc định thì sẽ bằng 30 ngày
    const Product = row.Product;
    const SalesPerson = "Sales Person:\n " + UserProfileInfo.getDisplayName() + " - Organization: " + UserProfileInfo.getOrganization();
    const Currency = row.Currency;

    //ACTIONS
    if (StartDateMinusToday) {
        startDate = getDate(StartDateMinusToday);
    }
    if (EndDateMinusStartDate) {
        endDate = addDate(startDate, EndDateMinusStartDate);
    }
    if (EndDateMinusToday) {
        endDate = getDate(EndDateMinusToday);
    }
    let temp = true;

    temp = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.validateQuoteRef(QuoteReference);
    logFailTestcase(temp, `Incorrect Quote Ref`);


    temp = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.validateSalesPerson(SalesPerson);
    // logFailTestcase(temp, `Incorrect SalesPerson`);

    if (AlertMessages) {
        logInfoMessage("\tALERT MESSAGES:");
        const alerts = AlertMessages.split(";");
        for (const alert of alerts) {
            temp = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.isAlertMessageExisted(alert);
            logFailTestcase(temp, `NOT found alert message "${alert}"!`);
        }
    }


    logInfoMessage("\tINSURANCE INFORMATION:");
    temp = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.validatePolicyTerm_InsuranceInformation(startDate + " - " + endDate);
    logFailTestcase(temp, `Incorrect Policy term`);

    temp = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.validateExpiryDate_InsuranceInformation(ExpiryDate);
    logFailTestcase(temp, `Incorrect Expiry Date`);

    temp = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.validateProduct_InsuranceInformation(Product);
    logFailTestcase(temp, `Incorrect Product!`);


    //#region PREMIUM
    logInfoMessage("\tPREMIUM:");
    //#region Initial value InnboSeasonal
    let yearOfStartDate = parseInt(startDate.split("/")[2]);
    let yearOfEndDate = parseInt(endDate.split("/")[2]);
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
    console.log(getValueDataOfDataTestExecution("CoverTypeConfig"));
    console.log(getAge(DOB, startDate));
    console.log(Hussopp && Hussopp === "Yes" ? true : false);
    console.log(AddBicycle1 && AddBicycle1 === "Yes" ? true : false);
    console.log(AddBicycle2 && AddBicycle2 === "Yes" ? true : false);

    const premiumExlTaxAnnualPremium = initialValuePremium.PremiumExlTax;
    const taxAnnualPremium = initialValuePremium.Tax;

    // Policy Premium
    let taxPolicyPremium = policyCalculation.getTaxPolicyPremium(startDate, endDate, taxAnnualPremium, configRate);

    //#endregion
    let temp1 = policyCalculation.getPremiumForNewBusiness(
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

    const _row = {
        "PremiumExlTaxAnnualPremium": temp1.AnnualPremium.PremiumExlTax,
        "UnderwritingAdjustmentAnnualPremium": temp1.AnnualPremium.UnderwritingAdjustment,
        "SalesDiscountAnnualPremium": temp1.AnnualPremium.SalesDiscount,
        "ProductCommissionAnnualPremium": temp1.AnnualPremium.ProductCommission,
        "SalesCommissionAnnualPremium": temp1.AnnualPremium.SalesCommission,
        "TaxAnnualPremium": temp1.AnnualPremium.Tax,
        "TotalPremiumAnnualPremium": temp1.AnnualPremium.TotalPremium,

        "PremiumExlTaxPolicyPremium": temp1.PolicyPremium.PremiumExlTax,
        "UnderwritingAdjustmentPolicyPremium": temp1.PolicyPremium.UnderwritingAdjustment,
        "SalesDiscountPolicyPremium": temp1.PolicyPremium.SalesDiscount,
        "ProductCommissionPolicyPremium": temp1.PolicyPremium.ProductCommission,
        "SalesCommissionPolicyPremium": temp1.PolicyPremium.SalesCommission,
        "TaxPolicyPremium": temp1.PolicyPremium.Tax,
        "TotalPremiumPolicyPremium": temp1.PolicyPremium.TotalPremium,


        "Currency": Currency
    }
    await verifyPremiumSectionOnCreatingQuote(accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal, _row);
    pushObjectToDataArrayWithUniqueKey("Product", Product);
    pushObjectToDataArrayWithUniqueKey("Currency", Currency);
    pushObjectToDataArrayWithUniqueKey("StartDate", startDate);
    pushObjectToDataArrayWithUniqueKey("EndDate", endDate);
    pushObjectToDataArrayWithUniqueKey("PolicyPremium", _row.TotalPremiumPolicyPremium);
    //#endregion

    //#region Cover Breakdown
    logInfoMessage("\tCOVER BREAKDOWN:");

    //#region Initital value for Cover Breakdown
    const initialValue = VarsamSeasonalInitialValue.getInitialValueCoverBreakdown(Product, getAge(DOB, startDate)).initialValue;


    const initialRate = {
        "rateOfUnderwritingAdjustment": rateOfUnderwritingAdjustment,
        "rateOfSalesDiscount": rateOfSalesDiscount,
        "rateOfProductCommission": rateOfProductCommission,
        "rateOfSalesCommission": rateOfSalesCommission
    }

    const initialIPT = VarsamSeasonalInitialValue.getInitialValueCoverBreakdown(Product, getAge(DOB, startDate)).initialIPT;

    // const startDate = '15/09/2021';
    // const endDate = '31/12/2021';
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

    await verifyCoverBreakdownOnCreatingQuote(accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal, temp3, Currency);
    //#endregion
});

Given("User verifies info on Creating Quote form after renew for Varsam product Innbo Seasonal - Renewal case {string}", async function (filename) {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const row = rows[0];

    const QuoteReference = getValueDataOfDataTestExecution("QuoteReference");
    let startDate = row.StartDate;
    let endDate = row.EndDate;
    const StartDateMinusToday = row.StartDateMinusToday;
    const EndDateMinusStartDate = row.EndDateMinusStartDate;
    const EndDateMinusToday = row.EndDateMinusToday;

    const Hussopp = row.Hussopp;
    // EL-SYKKEL
    const AddBicycle1 = row.AddBicycle1;
    const BicycleSumInsured1 = row.BicycleSumInsured1;
    const ElectricBicycleCover1 = row.ElectricBicycleCover1;
    const AddBicycle2 = row.AddBicycle2;
    const BicycleSumInsured2 = row.BicycleSumInsured2;
    const ElectricBicycleCover2 = row.ElectricBicycleCover2;

    const DOB = row.DOB;
    const ExpiryDate = getDate(30);// Theo setting mặc định thì sẽ bằng 30 ngày
    const Product = row.Product;
    const SalesPerson = "Sales Person:\n " + UserProfileInfo.getDisplayName() + " - Organization: " + UserProfileInfo.getOrganization();
    const Currency = row.Currency;

    //ACTIONS
    if (StartDateMinusToday) {
        startDate = getDate(StartDateMinusToday);
    }
    if (EndDateMinusStartDate) {
        endDate = addDate(startDate, EndDateMinusStartDate);
    }
    if (EndDateMinusToday) {
        endDate = getDate(EndDateMinusToday);
    }

    // Nếu đã tự động renew
    let StartDateAfterRenew = getValueDataOfDataTestExecution("StartDateAfterRenew");
    let EndDateAfterRenew = getValueDataOfDataTestExecution("EndDateAfterRenew");
    if (StartDateAfterRenew) {
        startDate = StartDateAfterRenew;
    }
    if (EndDateAfterRenew) {
        endDate = EndDateAfterRenew;
    }

    let temp = true;

    temp = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.validateQuoteRef(QuoteReference);
    logFailTestcase(temp, `Incorrect Quote Ref`);


    temp = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.validateSalesPerson(SalesPerson);
    // logFailTestcase(temp, `Incorrect SalesPerson`);


    logInfoMessage("\tINSURANCE INFORMATION:");
    temp = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.validatePolicyTerm_InsuranceInformation(startDate + " - " + endDate);
    logFailTestcase(temp, `Incorrect Policy term`);

    temp = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.validateExpiryDate_InsuranceInformation(ExpiryDate);
    logFailTestcase(temp, `Incorrect Expiry Date`);

    temp = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.validateProduct_InsuranceInformation(Product);
    logFailTestcase(temp, `Incorrect Product!`);


    //#region PREMIUM
    logInfoMessage("\tPREMIUM:");
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
    // const premiumExlTaxAnnualPremium = Number(getValueDataOfDataTestExecution("premiumExlTaxAnnualPremium"));
    const configInitialValue = VarsamSeasonalInitialValue.getInitialValuePremium(
        Product,
        getValueDataOfDataTestExecution("CoverTypeConfig"),
        getAge(DOB, startDate),
        Hussopp && Hussopp === "Yes" ? true : false,
        AddBicycle1 && AddBicycle1 === "Yes" ? true : false,
        AddBicycle2 && AddBicycle2 === "Yes" ? true : false
    );
    const premiumExlTaxAnnualPremium = configInitialValue.PremiumExlTax;
    // const taxAnnualPremium = Number(getValueDataOfDataTestExecution("taxAnnualPremium"));
    const taxAnnualPremium = configInitialValue.Tax;

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
        "TotalPremiumPolicyPremium": temp2.AnnualPremium.TotalPremium,


        "Currency": Currency
    }
    pushObjectToDataArrayWithUniqueKey("PolicyPremium", temp2.AnnualPremium.TotalPremium.toString());
    await globalPageObject.waitForProgressBarLoaded_v2();
    await verifyPremiumSectionOnCreatingQuote(accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal, _row);
    //#endregion

    //#region Cover Breakdown
    logInfoMessage("\tCOVER BREAKDOWN:");

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
    await verifyCoverBreakdownOnCreatingQuote(accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal, temp3, Currency);
    //#endregion
});

Given("User inputs data at Premium section on Creating Quote form for Varsam product Innbo Seasonal {string}", async function (filename) {
    const rows = await DataRepo2.getInstance().loadData(filename);
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

    await globalPageObject.waitForProgressBarLoaded_v2();
    await globalPageObject.waitForProgressBarLoaded_v2();
    await inputPremiumSectionOnCreatingQuote(accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal, row);
});

When("User verifies the calculation function at Premium section on Creating Quote form for Varsam product Innbo Seasonal {string}", async function (filename) {
    let rows = await DataRepo2.getInstance().loadData(filename);
    let temp = true;
    await globalPageObject.waitForProgressBarLoaded_v2();
    for (let i = 0; i < rows.length; i++) {
        logInfoMessage(`Checking Calculation Premium at line ${i + 1}...`);
        logInfoMessage(`\tInput value into Premium section:`);
        await inputPremiumSectionOnCreatingQuote(accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal, rows[i]);

        temp = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.pressCalculateButton_Premium();
        logFailTestcase(temp, `Press Calculation at Premium section failed!`);
        await globalPageObject.waitForProgressBarLoaded_v2(500);
        await globalPageObject.waitForProgressBarLoaded_v2(500);
        await globalPageObject.waitForProgressBarLoaded_v2(500);


        logInfoMessage(`\tVerify info of Premium section`);
        await verifyPremiumSectionOnCreatingQuote(accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal, rows[i]);
    }
});
When("User verifies the revert function at Premium section on Creating Quote form for Varsam product Innbo Seasonal {string}", async function (filename) {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    let temp = true;

    //#region Kiểm tra Revert lúc đầu (chưa Calculate)
    logInfoMessage(`\n\nCheck Revert with initial info:\n`);

    // Save initial value: Underwriting adjustment, Sales discount, Product commission, Sales commission
    logInfoMessage("\tSave initial value:");
    let UnderwritingAdjustment = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.getValueUnderwritingAdjustment_Premium();
    let SalesDiscount = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.getValueSalesDiscount_Premium();
    let ProductCommission = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.getValueProductCommission_Premium();
    let SalesCommission = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.getValueSalesCommission_Premium();
    const UnderwritingAdjustmentReason = rows[0].UnderwritingAdjustmentReason;


    logInfoMessage(`\tInput new value into Premium section:`);
    await inputPremiumSectionOnCreatingQuote(accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal, rows[0]);


    const AlertWarningRevert = rows[0].AlertWarningRevert;
    logInfoMessage(`\tCheck Alert warning at Premium section:`);

    temp = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.validateAlertWarning_Premium(AlertWarningRevert);
    logFailTestcase(temp, `Incorrect Alert warning`);

    temp = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.pressRevertButton_Premium();
    logFailTestcase(temp, `Press Revert at Premium section failed!`);

    await globalPageObject.waitForProgressBarLoaded_v2(500);
    logInfoMessage(`\tVerify input fields:`);

    temp = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.validateValueUnderwritingAdjustment_Premium(UnderwritingAdjustment);
    logFailTestcase(temp, "Incorrect UnderwritingAdjustment");

    temp = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.validateValueSalesDiscount_Premium(SalesDiscount);
    logFailTestcase(temp, `Incorrect SalesDiscount`);

    temp = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.validateValueProductCommission_Premium(ProductCommission);
    logFailTestcase(temp, `Incorrect ProductCommission`);

    temp = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.validateValueSalesCommission_Premium(SalesCommission);
    logFailTestcase(temp, `Incorrect SalesCommission`);
    logInfoMessage(`\tVerify info of Premium section`);

    await verifyPremiumSectionOnCreatingQuote(accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal, rows[0]);

    //#endregion



    //#region Kiểm tra Revert sau khi đã Calculate

    logInfoMessage(`\n\nCheck Revert after press Calculate:\n`);
    logInfoMessage(`\tInput new value into Premium section:`);

    await inputPremiumSectionOnCreatingQuote(accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal, rows[1]);
    temp = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.pressAddCommentUnderwritingAdjustment_Premium();
    logFailTestcase(temp, `Press AddCommentUnderwritingAdjustment failed!`);

    temp = await underwritingAdjustmentReasonForm.inputUnderwritingAdjustmentReason(UnderwritingAdjustmentReason);
    logFailTestcase(temp, `Input UnderwritingAdjustmentReason failed!`);

    temp = await underwritingAdjustmentReasonForm.pressOkButton();
    logFailTestcase(temp, `Press OK button failed!`);

    temp = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.pressCalculateButton_Premium();
    logFailTestcase(temp, `Press Calculation at Premium section failed!`);

    await globalPageObject.waitForProgressBarLoaded_v2(500);
    await globalPageObject.waitForProgressBarLoaded_v2(500);
    await globalPageObject.waitForProgressBarLoaded_v2(500);



    logInfoMessage(`\tVerify info of Premium section`);
    await verifyPremiumSectionOnCreatingQuote(accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal, rows[1]);


    logInfoMessage("Save initial value:");
    UnderwritingAdjustment = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.getValueUnderwritingAdjustment_Premium();
    SalesDiscount = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.getValueSalesDiscount_Premium();
    ProductCommission = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.getValueProductCommission_Premium();
    SalesCommission = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.getValueSalesCommission_Premium();


    logInfoMessage(`\tInput new value into Premium section:`);
    await inputPremiumSectionOnCreatingQuote(accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal, rows[0]);


    temp = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.pressRevertButton_Premium();
    logFailTestcase(temp, `Press Revert at Premium section failed!`);
    await globalPageObject.waitForProgressBarLoaded_v2(500);

    temp = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.pressAddCommentUnderwritingAdjustment_Premium();
    logFailTestcase(temp, `Open AddCommentUnderwritingAdjustment form failed!`);


    temp = await underwritingAdjustmentReasonForm.validateValueUnderwritingAdjustmentReason(UnderwritingAdjustmentReason);
    logFailTestcase(temp, `Incorrect UnderwritingAdjustmentReason!`);

    temp = await underwritingAdjustmentReasonForm.pressOkButton();
    logFailTestcase(temp, `Press OK button failed!`);

    logInfoMessage(`\tVerify input fields:`);
    temp = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.validateValueUnderwritingAdjustment_Premium(UnderwritingAdjustment);
    logFailTestcase(temp, "Incorrect UnderwritingAdjustment");

    temp = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.validateValueSalesDiscount_Premium(SalesDiscount);
    logFailTestcase(temp, `Incorrect SalesDiscount`);

    temp = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.validateValueProductCommission_Premium(ProductCommission);
    logFailTestcase(temp, `Incorrect ProductCommission`);

    temp = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.validateValueSalesCommission_Premium(SalesCommission);
    logFailTestcase(temp, `Incorrect SalesCommission`);



    logInfoMessage(`\tVerify info of Premium section`);

    await verifyPremiumSectionOnCreatingQuote(accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal, rows[1]);

    //#endregion

});


When("User verifies the validation at Premium section on Creating Quote form for Varsam product Innbo Seasonal {string}", async function (filename) {

    const rows = loader(convertPathFileDataToDataRegression(filename));
    let temp = true;

    for (let i = 0; i < rows.length; i++) {
        await globalPageObject.waitForProgressBarLoaded_v2(500);
        await globalPageObject.waitForProgressBarLoaded_v2(500);
        logInfoMessage(`\n\nCheck validation at line ${i + 1}...`);
        logInfoMessage(`\tInput value into Premium section:`);
        await inputPremiumSectionOnCreatingQuote(accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal, rows[i]);

        await globalPageObject.waitForProgressBarLoaded_v2();
        logInfoMessage(`\tValidate validation messge at Premium section:`);
        await checkValidationPremiumSectionOnCreatingQuote(accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal, rows[i]);

        temp = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.isCalculationButtonDisabled();
        logFailTestcase(temp, `Button Calculate should be disabled!`);

        temp = await accountTabQuoteCreatingQuoteVarsamProductInnboSeasonal.pressRevertButton_Premium();
        logFailTestcase(temp, `Press Revert at Premium section failed!`);
        await globalPageObject.waitForProgressBarLoaded_v2(500);
    }

});

Given("User verifies info on Creating Quote form for Varsam product {string}", async function (dataKey) {
    const data = await DataRepo.getInstance().getFieldValue(dataKey);
    const quoteCreatingQuote = new QuoteCreatingQuote(this.context.driverService);
    let temp = true;

    logInfoMessage(`\tVerify input fields:`);
    temp = await quoteCreatingQuote.validatePremiumExlTax_AnnualPremium_Premium(data.AnnualPremium_UnderwritingAdjustment);
    logFailTestcase(temp, "Incorrect UnderwritingAdjustment");

    temp = await quoteCreatingQuote.validateUnderwritingAdjustment_AnnualPremium_Premium(data.AnnualPremium_SalesDiscount);
    logFailTestcase(temp, `Incorrect SalesDiscount`);

    temp = await quoteCreatingQuote.validateProductCommission_AnnualPremium_Premium(data.AnnualPremium_ProductCommission);
    logFailTestcase(temp, `Incorrect ProductCommission`);

    temp = await quoteCreatingQuote.validateValueSalesCommission_Premium(data.AnnualPremium_SalesCommission);
    logFailTestcase(temp, `Incorrect SalesCommission`);


});

//#endregion
//#endregion