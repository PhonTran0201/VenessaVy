import { getDateEndOfMonth, getDurationBetweenTwoDates, logWarningMessage } from "../functions";
import { VarsamSeasonalConfig } from "./VarsamSeasonalConfig";

export class PolicyCalculation {
    private static instance: PolicyCalculation;
    public static getInstance(): PolicyCalculation {
        if (!PolicyCalculation.instance) {
            PolicyCalculation.instance = new PolicyCalculation();
        }
        return PolicyCalculation.instance;
    }
    //#region Insuarance Infomation - New Bussiness

    //#region Annual Premium
    public getUnderwritingAdjustmentAnnualPremium(PremiumExlTaxAnnualPremium: number, rate: number) {
        let result = PremiumExlTaxAnnualPremium * rate / 100;
        return result;
    }
    public getSalesDiscountAnnualPremium(
        PremiumExlTaxAnnualPremium: number,
        rateOfUnderwritingAdjustmentAnnualPremium: number,
        rate: number) {
        let total = PremiumExlTaxAnnualPremium +
            this.getUnderwritingAdjustmentAnnualPremium(PremiumExlTaxAnnualPremium, rateOfUnderwritingAdjustmentAnnualPremium);
        let result = total * rate / 100 * (-1);
        return result;
    }
    public getProductCommissionAnnualPremium(
        PremiumExlTaxAnnualPremium: number,
        rateOfUnderwritingAdjustmentAnnualPremium: number,
        rateOfSalesDiscountAnnualPremium: number,
        rate: number) {
        let total = PremiumExlTaxAnnualPremium +
            this.getUnderwritingAdjustmentAnnualPremium(PremiumExlTaxAnnualPremium, rateOfUnderwritingAdjustmentAnnualPremium) +
            this.getSalesDiscountAnnualPremium(PremiumExlTaxAnnualPremium, rateOfUnderwritingAdjustmentAnnualPremium, rateOfSalesDiscountAnnualPremium);
        let result = total * rate / 100;
        return result;
    }
    public getSalesCommissionAnnualPremium(
        PremiumExlTaxAnnualPremium: number,
        rateOfUnderwritingAdjustmentAnnualPremium: number,
        rateOfSalesDiscountAnnualPremium: number,
        rateOfProductCommissionAnnualPremium: number,
        rate: number) {
        let total = PremiumExlTaxAnnualPremium +
            this.getUnderwritingAdjustmentAnnualPremium(PremiumExlTaxAnnualPremium, rateOfUnderwritingAdjustmentAnnualPremium) +
            this.getSalesDiscountAnnualPremium(PremiumExlTaxAnnualPremium, rateOfUnderwritingAdjustmentAnnualPremium, rateOfSalesDiscountAnnualPremium) +
            this.getProductCommissionAnnualPremium(PremiumExlTaxAnnualPremium, rateOfUnderwritingAdjustmentAnnualPremium, rateOfSalesDiscountAnnualPremium, rateOfProductCommissionAnnualPremium);
        let result = total * rate / 100;
        return result;
    }
    public getTotalPremiumAnnualPremium(
        PremiumExlTaxAnnualPremium: number,
        rateOfUnderwritingAdjustmentAnnualPremium: number,
        rateOfSalesDiscountAnnualPremium: number,
        rateOfProductCommissionAnnualPremium: number,
        rateOfSalesCommissionAnnualPremium: number,
        taxAnnualPremium: number) {
        const UnderwritingAdjustmentAnnualPremium = this.getUnderwritingAdjustmentAnnualPremium(PremiumExlTaxAnnualPremium, rateOfUnderwritingAdjustmentAnnualPremium);
        const SalesDiscountAnnualPremium = this.getSalesDiscountAnnualPremium(PremiumExlTaxAnnualPremium, rateOfUnderwritingAdjustmentAnnualPremium, rateOfSalesDiscountAnnualPremium);
        const ProductCommissionAnnualPremium = this.getProductCommissionAnnualPremium(PremiumExlTaxAnnualPremium, rateOfUnderwritingAdjustmentAnnualPremium, rateOfSalesDiscountAnnualPremium, rateOfProductCommissionAnnualPremium);
        const SalesCommissionAnnualPremium = this.getSalesCommissionAnnualPremium(PremiumExlTaxAnnualPremium, rateOfUnderwritingAdjustmentAnnualPremium, rateOfSalesDiscountAnnualPremium, rateOfProductCommissionAnnualPremium, rateOfSalesCommissionAnnualPremium);

        let result = PremiumExlTaxAnnualPremium + UnderwritingAdjustmentAnnualPremium + SalesDiscountAnnualPremium + ProductCommissionAnnualPremium + SalesCommissionAnnualPremium + taxAnnualPremium;
        return result;
    }
    //#endregion


    //#region Policy Premium
    public getUnderwritingAdjustmentPolicyPremium(PremiumExlTaxPolicyPremium: number, rate: number) {
        let result = PremiumExlTaxPolicyPremium * rate / 100;
        return result;
    }
    public getSalesDiscountPolicyPremium(
        PremiumExlTaxPolicyPremium: number,
        rateOfUnderwritingAdjustmentPolicyPremium: number,
        rate: number) {
        let total = PremiumExlTaxPolicyPremium +
            this.getUnderwritingAdjustmentPolicyPremium(PremiumExlTaxPolicyPremium, rateOfUnderwritingAdjustmentPolicyPremium);
        let result = total * rate / 100 * (-1);
        return result;
    }
    public getProductCommissionPolicyPremium(
        PremiumExlTaxPolicyPremium: number,
        rateOfUnderwritingAdjustmentPolicyPremium: number,
        rateOfSalesDiscountPolicyPremium: number,
        rate: number) {
        let total = PremiumExlTaxPolicyPremium +
            this.getUnderwritingAdjustmentPolicyPremium(PremiumExlTaxPolicyPremium, rateOfUnderwritingAdjustmentPolicyPremium) +
            this.getSalesDiscountPolicyPremium(PremiumExlTaxPolicyPremium, rateOfUnderwritingAdjustmentPolicyPremium, rateOfSalesDiscountPolicyPremium);
        let result = total * rate / 100;
        return result;
    }
    public getSalesCommissionPolicyPremium(
        PremiumExlTaxPolicyPremium: number,
        rateOfUnderwritingAdjustmentPolicyPremium: number,
        rateOfSalesDiscountPolicyPremium: number,
        rateOfProductCommissionPolicyPremium: number,
        rate: number) {
        let total = PremiumExlTaxPolicyPremium +
            this.getUnderwritingAdjustmentPolicyPremium(PremiumExlTaxPolicyPremium, rateOfUnderwritingAdjustmentPolicyPremium) +
            this.getSalesDiscountPolicyPremium(PremiumExlTaxPolicyPremium, rateOfUnderwritingAdjustmentPolicyPremium, rateOfSalesDiscountPolicyPremium) +
            this.getProductCommissionPolicyPremium(PremiumExlTaxPolicyPremium, rateOfUnderwritingAdjustmentPolicyPremium, rateOfSalesDiscountPolicyPremium, rateOfProductCommissionPolicyPremium);
        let result = total * rate / 100;
        return result;
    }
    public getTotalPremiumPolicyPremium(
        PremiumExlTaxPolicyPremium: number,
        rateOfUnderwritingAdjustmentPolicyPremium: number,
        rateOfSalesDiscountPolicyPremium: number,
        rateOfProductCommissionPolicyPremium: number,
        rateOfSalesCommissionPolicyPremium: number,
        taxPolicyPremium: number) {
        const UnderwritingAdjustmentPolicyPremium = this.getUnderwritingAdjustmentPolicyPremium(PremiumExlTaxPolicyPremium, rateOfUnderwritingAdjustmentPolicyPremium);
        const SalesDiscountPolicyPremium = this.getSalesDiscountPolicyPremium(PremiumExlTaxPolicyPremium, rateOfUnderwritingAdjustmentPolicyPremium, rateOfSalesDiscountPolicyPremium);
        const ProductCommissionPolicyPremium = this.getProductCommissionPolicyPremium(PremiumExlTaxPolicyPremium, rateOfUnderwritingAdjustmentPolicyPremium, rateOfSalesDiscountPolicyPremium, rateOfProductCommissionPolicyPremium);
        const SalesCommissionPolicyPremium = this.getSalesCommissionPolicyPremium(PremiumExlTaxPolicyPremium, rateOfUnderwritingAdjustmentPolicyPremium, rateOfSalesDiscountPolicyPremium, rateOfProductCommissionPolicyPremium, rateOfSalesCommissionPolicyPremium);

        let result = PremiumExlTaxPolicyPremium + UnderwritingAdjustmentPolicyPremium + SalesDiscountPolicyPremium + ProductCommissionPolicyPremium + SalesCommissionPolicyPremium + taxPolicyPremium;
        return result;
    }
    //#endregion

    //#endregion


    //#region Premium Exl Tax Premium
    /**
     * 
     * @param startDate dd/mm/yyyy
     * @param endDate dd/mm/yyyy
     * @param annualPremium number
     * @param configRate [object]
     */
    // Period is within a year because annualPremium specify for each years
    public getPremiumExlTaxPolicyPremium(
        startDate: string,
        endDate: string,
        annualPremium: number,
        configRate: any[]
    ) {
        let arrayTemp: any[] = [];
        const year = parseInt(startDate.split("/")[2]);
        const monthOfStartDate = parseInt(startDate.split("/")[1]);
        const monthOfEndDate = parseInt(endDate.split("/")[1]);

        if (getDurationBetweenTwoDates(startDate, endDate) < 0) {
            logWarningMessage("EndDate must be greater than StartDate!");
            return -1;
        }
        for (const iterator of configRate) {
            if (monthOfStartDate <= iterator.Value && monthOfEndDate >= iterator.Value) {
                let actualRate = iterator.Rate;
                let duration = iterator.NumberOfDays;
                if (monthOfStartDate === iterator.Value) {
                    duration = getDurationBetweenTwoDates(startDate, getDateEndOfMonth(year, monthOfStartDate)) + 1;
                    actualRate = iterator.Rate / iterator.NumberOfDays * duration;
                }
                else if (monthOfEndDate === iterator.Value) {
                    duration = getDurationBetweenTwoDates(`01/${endDate.split("/")[1]}/${year}`, endDate) + 1;
                    actualRate = iterator.Rate / iterator.NumberOfDays * duration;
                }
                let actualPremiumExlTaxPolicyPremium = annualPremium * actualRate / 100;
                arrayTemp.push(
                    {
                        "Month": iterator.Value,
                        "ActualRate": actualRate,
                        "Duration": duration,
                        "PremiumExlTaxPolicyPremium": actualPremiumExlTaxPolicyPremium
                    }
                );
            }
        }
        let result = 0.0;
        for (const iterator of arrayTemp) {
            result += iterator.PremiumExlTaxPolicyPremium;
        }
        return result;
    }
    //#endregion


    //#region Tax of Policy Premium
    // Period is within a year because annualPremium specify for each years
    public getTaxPolicyPremium(
        startDate: string,
        endDate: string,
        taxAnnualPremium: number,
        configRate: any[]
    ) {
        return this.getPremiumExlTaxPolicyPremium(startDate, endDate, taxAnnualPremium, configRate);
    }
    //#endregion

    //#region Premium Section
    public getPremiumForNewBusinessWithinAYear(
        startDate: string,
        endDate: string,
        rateOfUnderwritingAdjustment: number,
        rateOfSalesDiscount: number,
        rateOfProductCommission: number,
        rateOfSalesCommission: number,
        PremiumExlTaxAnnualPremium: number,
        TaxAnnualPremium: number,
        TaxPolicyPremium: number,
        configRate: any[]
    ) {
        const InitialRate = {
            "PremiumExlTax": null,
            "UnderwritingAdjustment": rateOfUnderwritingAdjustment,
            "SalesDiscount": rateOfSalesDiscount,
            "ProductCommission": rateOfProductCommission,
            "SalesCommission": rateOfSalesCommission,
            "Tax": null,
            "TotalPremium": null
        }

        //#region Annual Premium
        const UnderwritingAdjustmentAnnualPremium = this.getUnderwritingAdjustmentAnnualPremium(PremiumExlTaxAnnualPremium, rateOfUnderwritingAdjustment);
        const SalesDiscountAnnualPremium = this.getSalesDiscountAnnualPremium(PremiumExlTaxAnnualPremium, rateOfUnderwritingAdjustment, rateOfSalesDiscount);
        const ProductCommissionAnnualPremium = this.getProductCommissionAnnualPremium(PremiumExlTaxAnnualPremium, rateOfUnderwritingAdjustment, rateOfSalesDiscount, rateOfProductCommission);
        const SalesCommissionAnnualPremium = this.getSalesCommissionAnnualPremium(PremiumExlTaxAnnualPremium, rateOfUnderwritingAdjustment, rateOfSalesDiscount, rateOfProductCommission, rateOfSalesCommission);
        const TotalPremiumAnnualPremium = this.getTotalPremiumAnnualPremium(PremiumExlTaxAnnualPremium, rateOfUnderwritingAdjustment, rateOfSalesDiscount, rateOfProductCommission, rateOfSalesCommission, TaxAnnualPremium);

        const AnnualPremium = {
            "PremiumExlTax": PremiumExlTaxAnnualPremium,
            "UnderwritingAdjustment": UnderwritingAdjustmentAnnualPremium,
            "SalesDiscount": SalesDiscountAnnualPremium,
            "ProductCommission": ProductCommissionAnnualPremium,
            "SalesCommission": SalesCommissionAnnualPremium,
            "Tax": TaxAnnualPremium,
            "TotalPremium": TotalPremiumAnnualPremium
        }
        //#endregion

        //#region Policy Premium
        const PremiumExlTaxPolicyPremium = this.getPremiumExlTaxPolicyPremium(startDate, endDate, PremiumExlTaxAnnualPremium, configRate);
        const UnderwritingAdjustmentPolicyPremium = this.getUnderwritingAdjustmentPolicyPremium(PremiumExlTaxPolicyPremium, rateOfUnderwritingAdjustment);
        const SalesDiscountPolicyPremium = this.getSalesDiscountPolicyPremium(PremiumExlTaxPolicyPremium, rateOfUnderwritingAdjustment, rateOfSalesDiscount);
        const ProductCommissionPolicyPremium = this.getProductCommissionPolicyPremium(PremiumExlTaxPolicyPremium, rateOfUnderwritingAdjustment, rateOfSalesDiscount, rateOfProductCommission);
        const SalesCommissionPolicyPremium = this.getSalesCommissionPolicyPremium(PremiumExlTaxPolicyPremium, rateOfUnderwritingAdjustment, rateOfSalesDiscount, rateOfProductCommission, rateOfSalesCommission);
        const TotalPremiumPolicyPremium = this.getTotalPremiumPolicyPremium(PremiumExlTaxPolicyPremium, rateOfUnderwritingAdjustment, rateOfSalesDiscount, rateOfProductCommission, rateOfSalesCommission, TaxPolicyPremium);

        const PolicyPremium = {
            "PremiumExlTax": PremiumExlTaxPolicyPremium,
            "UnderwritingAdjustment": UnderwritingAdjustmentPolicyPremium,
            "SalesDiscount": SalesDiscountPolicyPremium,
            "ProductCommission": ProductCommissionPolicyPremium,
            "SalesCommission": SalesCommissionPolicyPremium,
            "Tax": TaxPolicyPremium,
            "TotalPremium": TotalPremiumPolicyPremium
        }
        //#endregion

        const result = {
            "InitialRate": InitialRate,
            "AnnualPremium": AnnualPremium,
            "PolicyPremium": PolicyPremium
        }
        return result;
    }


    /**
     * Tính Premium section for New Business với period ở 2 năm khác nhau
     * 
     * @param startDate 
     * @param endDate 
     * @param rateOfUnderwritingAdjustment 
     * @param rateOfSalesDiscount 
     * @param rateOfProductCommission 
     * @param rateOfSalesCommission 
     * @param PremiumExlTaxAnnualPremium 
     * @param TaxAnnualPremium 
     * @param TaxPolicyPremium 
     * @param configRate 
     * @returns json
     */
    public getPremiumForNewBusiness(
        startDate: string,
        endDate: string,
        rateOfUnderwritingAdjustment: number,
        rateOfSalesDiscount: number,
        rateOfProductCommission: number,
        rateOfSalesCommission: number,
        PremiumExlTaxAnnualPremium: number,
        TaxAnnualPremium: number,
        TaxPolicyPremium: number,
        configRate: any[]
    ) {
        let temp1: any;
        let yearOfEndDate = parseInt(endDate.split("/")[2]);
        if (startDate.split("/")[2] === endDate.split("/")[2]) {// Trường hợp start date và end date trong cùng 1 năm
            temp1 = this.getPremiumForNewBusinessWithinAYear(
                startDate,
                endDate,
                rateOfUnderwritingAdjustment,
                rateOfSalesDiscount,
                rateOfProductCommission,
                rateOfSalesCommission,
                PremiumExlTaxAnnualPremium,
                TaxAnnualPremium,
                TaxPolicyPremium,
                configRate
            );
        }
        else { // Trường hợp 2 start date - end date nằm ở 2 năm khác nhau
            let yearOfStartDate1 = parseInt(startDate.split("/")[2]);
            let configRate1 = VarsamSeasonalConfig.getConfigRate(yearOfStartDate1);
            let endDate1 = `31/12/${yearOfStartDate1}`;
            let taxPolicyPremium1 = this.getTaxPolicyPremium(startDate, endDate1, TaxAnnualPremium, configRate1);
            temp1 = this.getPremiumForNewBusinessWithinAYear(
                startDate,
                endDate1,
                rateOfUnderwritingAdjustment,
                rateOfSalesDiscount,
                rateOfProductCommission,
                rateOfSalesCommission,
                PremiumExlTaxAnnualPremium,
                TaxAnnualPremium,
                taxPolicyPremium1,
                configRate1
            );

            let startDate2 = `01/01/${yearOfEndDate}`;
            let configRate2 = VarsamSeasonalConfig.getConfigRate(yearOfEndDate);
            let taxPolicyPremium2 = this.getTaxPolicyPremium(startDate2, endDate, TaxAnnualPremium, configRate2);

            let temp2 = this.getPremiumForNewBusinessWithinAYear(
                startDate2,
                endDate,
                rateOfUnderwritingAdjustment,
                rateOfSalesDiscount,
                rateOfProductCommission,
                rateOfSalesCommission,
                PremiumExlTaxAnnualPremium,
                TaxAnnualPremium,
                taxPolicyPremium2,
                configRate2
            );

            temp1.PolicyPremium.PremiumExlTax += temp2.PolicyPremium.PremiumExlTax;
            temp1.PolicyPremium.UnderwritingAdjustment += temp2.PolicyPremium.UnderwritingAdjustment;
            temp1.PolicyPremium.SalesDiscount += temp2.PolicyPremium.SalesDiscount;
            temp1.PolicyPremium.ProductCommission += temp2.PolicyPremium.ProductCommission;
            temp1.PolicyPremium.SalesCommission += temp2.PolicyPremium.SalesCommission;
            temp1.PolicyPremium.Tax += temp2.PolicyPremium.Tax;
            temp1.PolicyPremium.TotalPremium += temp2.PolicyPremium.TotalPremium;
        }
        return temp1;
    }
    //#endregion
}



function main() {
    let configRate = VarsamSeasonalConfig.getConfigRate(2023);
    let policyCalculation = new PolicyCalculation();

    // Period
    const startDate = '02/02/2023';
    const endDate = '28/02/2023'; // today + 20

    // %
    const rateOfUnderwritingAdjustment = 22;
    const rateOfSalesDiscount = 22;
    const rateOfProductCommission = 22;
    const rateOfSalesCommission = 0;

    // Annual Premium
    const premiumExlTaxAnnualPremium = 2244816.00;
    const taxAnnualPremium = 119.57;

    // Policy Premium
    const taxPolicyPremium = policyCalculation.getTaxPolicyPremium(startDate, endDate, taxAnnualPremium, configRate);


    let temp = policyCalculation.getPremiumForNewBusiness(
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

    console.log(temp);
}

// main();