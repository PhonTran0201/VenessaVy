import { convertStringDateTimeToDate, getDurationBetweenTwoDates } from "../functions";
import { PolicyCalculation } from "./PolicyCalculation";
import { VarsamSeasonalConfig } from "./VarsamSeasonalConfig";

export class VarsamSeasonalCoverBreakdown {

    // apply for all cover: Innbo standard, Husopp,  El-Sykkel standard, ElSykkelPremium
    public static getActualTotalCover(
        initialTotalCover: number,
        rateOfUnderwritingAdjustment: number,
        rateOfSalesDiscount: number,
        rateOfProductCommission: number,
        rateOfSalesCommission: number
    ) {
        const CoverOfUnderwritingAdjustment = initialTotalCover * rateOfUnderwritingAdjustment / 100;//G13*B20/100
        const CoverOfSalesDiscount = (initialTotalCover + CoverOfUnderwritingAdjustment) * rateOfSalesDiscount / 100;
        const CoverOfProductCommission = (initialTotalCover + CoverOfUnderwritingAdjustment - CoverOfSalesDiscount) * rateOfProductCommission / 100;
        const CoverOfSalesCommission = (initialTotalCover + CoverOfUnderwritingAdjustment - CoverOfSalesDiscount + CoverOfProductCommission) * rateOfSalesCommission / 100;

        const result = initialTotalCover + CoverOfUnderwritingAdjustment - CoverOfSalesDiscount + CoverOfProductCommission + CoverOfSalesCommission;
        return result;
    }

    public static getAnnualPremiumCoverBreakdown(
        coverType: string,
        initialTotalInnboStandard: number,
        initialTotalHusopp: number,
        initialTotalElSykkelStandard: number,
        initialTotalElsykkelPremium: number,

        rateOfUnderwritingAdjustment: number,
        rateOfSalesDiscount: number,
        rateOfProductCommission: number,
        rateOfSalesCommission: number,
    ) {
        let actualTotalInnboStandard = this.getActualTotalCover(initialTotalInnboStandard, rateOfUnderwritingAdjustment, rateOfSalesDiscount, rateOfProductCommission, rateOfSalesCommission);
        let actualTotalHusopp = this.getActualTotalCover(initialTotalHusopp, rateOfUnderwritingAdjustment, rateOfSalesDiscount, rateOfProductCommission, rateOfSalesCommission);
        let actualTotalElSykkelStandard = this.getActualTotalCover(initialTotalElSykkelStandard, rateOfUnderwritingAdjustment, rateOfSalesDiscount, rateOfProductCommission, rateOfSalesCommission);
        let actualTotalElsykkelPremium = this.getActualTotalCover(initialTotalElsykkelPremium, rateOfUnderwritingAdjustment, rateOfSalesDiscount, rateOfProductCommission, rateOfSalesCommission);

        const innboStardardRatio = (VarsamSeasonalConfig.getConfigCoverBreakdownRatio()).InnboStandard[coverType];
        const hussoppRatio = (VarsamSeasonalConfig.getConfigCoverBreakdownRatio()).Hussopp[coverType];
        const elSykkelStandardRatio = (VarsamSeasonalConfig.getConfigCoverBreakdownRatio()).ElSykkelStandard[coverType];
        const elSykkelSuperRatio = (VarsamSeasonalConfig.getConfigCoverBreakdownRatio()).ElSykkelSuper[coverType];


        const innboStandardAnnualPremium = actualTotalInnboStandard * innboStardardRatio;
        const hussoppAnnualPremium = actualTotalInnboStandard * hussoppRatio + actualTotalHusopp;
        const elSykkelStandardAnnualPremium = actualTotalInnboStandard * elSykkelStandardRatio + actualTotalElSykkelStandard;
        const elSykkelSuperAnnualPremium = actualTotalInnboStandard * elSykkelSuperRatio + actualTotalElsykkelPremium;

        const result = {
            "InnboStandard": innboStandardAnnualPremium,
            "Hussopp": hussoppAnnualPremium,
            "ElSykkelStandard": elSykkelStandardAnnualPremium,
            "ElSykkelSuper": elSykkelSuperAnnualPremium
        }
        return result;
    }

    public static getCoverBreakdownWithinAYear(
        coverType = "TrafficOnly",
        initialValue = {
            "InnboStandard": 0,
            "Hussopp": 0,
            "ElSykkelStandard": 0,
            "ElSykkelSuper": 0
        },
        initialRate = {
            "rateOfUnderwritingAdjustment": 0,
            "rateOfSalesDiscount": 0,
            "rateOfProductCommission": 0,
            "rateOfSalesCommission": 0
        },
        initialIPT = {
            "InnboStandard": 0,
            "Hussopp": 0,
            "ElSykkelStandard": 0,
            "ElSykkelSuper": 0
        },
        startDate = '01/01/2000',
        endDate = '01/01/2000',
    ) {
        let annualPremium = VarsamSeasonalCoverBreakdown.getAnnualPremiumCoverBreakdown(
            coverType,
            initialValue.InnboStandard,
            initialValue.Hussopp,
            initialValue.ElSykkelStandard,
            initialValue.ElSykkelSuper,
            initialRate.rateOfUnderwritingAdjustment,
            initialRate.rateOfSalesDiscount,
            initialRate.rateOfProductCommission,
            initialRate.rateOfSalesCommission
        );
        const policyCalculation = new PolicyCalculation();
        const configRate = VarsamSeasonalConfig.getConfigRate(parseInt(startDate.split("/")[2]));
        let policyPremium = {
            "InnboStandard": policyCalculation.getPremiumExlTaxPolicyPremium(startDate, endDate, annualPremium.InnboStandard, configRate),
            "Hussopp": policyCalculation.getPremiumExlTaxPolicyPremium(startDate, endDate, annualPremium.Hussopp, configRate),
            "ElSykkelStandard": policyCalculation.getPremiumExlTaxPolicyPremium(startDate, endDate, annualPremium.ElSykkelStandard, configRate),
            "ElSykkelSuper": policyCalculation.getPremiumExlTaxPolicyPremium(startDate, endDate, annualPremium.ElSykkelSuper, configRate)
        }
        let IPT = {
            "InnboStandard": policyCalculation.getPremiumExlTaxPolicyPremium(startDate, endDate, initialIPT.InnboStandard, configRate),
            "Hussopp": policyCalculation.getPremiumExlTaxPolicyPremium(startDate, endDate, initialIPT.Hussopp, configRate),
            "ElSykkelStandard": policyCalculation.getPremiumExlTaxPolicyPremium(startDate, endDate, initialIPT.ElSykkelStandard, configRate),
            "ElSykkelSuper": policyCalculation.getPremiumExlTaxPolicyPremium(startDate, endDate, initialIPT.ElSykkelSuper, configRate)
        }

        const result = {
            "AnnualPremium": annualPremium,
            "AnnualIPT": initialIPT,
            "PolicyPremium": policyPremium,
            "IPT": IPT
        }
        return result;
    }
    public static getCoverBreakdown(
        coverType = "TrafficOnly",
        initialValue = {
            "InnboStandard": 0,
            "Hussopp": 0,
            "ElSykkelStandard": 0,
            "ElSykkelSuper": 0
        },
        initialRate = {
            "rateOfUnderwritingAdjustment": 0,
            "rateOfSalesDiscount": 0,
            "rateOfProductCommission": 0,
            "rateOfSalesCommission": 0
        },
        initialIPT = {
            "InnboStandard": 0,
            "Hussopp": 0,
            "ElSykkelStandard": 0,
            "ElSykkelSuper": 0
        },
        startDate = '01/01/2000',
        endDate = '01/01/2000',
    ) {
        let coverBreakdown: any;
        let yearOfEndDate = parseInt(endDate.split("/")[2]);
        if (startDate.split("/")[2] === endDate.split("/")[2]) {// Trường hợp start date và end date trong cùng 1 năm
            coverBreakdown = VarsamSeasonalCoverBreakdown.getCoverBreakdownWithinAYear(coverType, initialValue, initialRate, initialIPT, startDate, endDate);
        }
        else {// Trường hợp start date và end date nằm ở 2 năm khác nhau
            let yearOfStartDate1 = parseInt(startDate.split("/")[2]);
            let endDate1 = `31/12/${yearOfStartDate1}`;
            coverBreakdown = VarsamSeasonalCoverBreakdown.getCoverBreakdownWithinAYear(coverType, initialValue, initialRate, initialIPT, startDate, endDate1);

            let startDate2 = `01/01/${yearOfEndDate}`;

            let coverBreakdown2 = VarsamSeasonalCoverBreakdown.getCoverBreakdownWithinAYear(coverType, initialValue, initialRate, initialIPT, startDate2, endDate);

            coverBreakdown.PolicyPremium.InnboStandard += coverBreakdown2.PolicyPremium.InnboStandard;
            coverBreakdown.PolicyPremium.Hussopp += coverBreakdown2.PolicyPremium.Hussopp;
            coverBreakdown.PolicyPremium.ElSykkelStandard += coverBreakdown2.PolicyPremium.ElSykkelStandard;
            coverBreakdown.PolicyPremium.ElSykkelSuper += coverBreakdown2.PolicyPremium.ElSykkelSuper;

            coverBreakdown.IPT.InnboStandard += coverBreakdown2.IPT.InnboStandard;
            coverBreakdown.IPT.Hussopp += coverBreakdown2.IPT.Hussopp;
            coverBreakdown.IPT.ElSykkelStandard += coverBreakdown2.IPT.ElSykkelStandard;
            coverBreakdown.IPT.ElSykkelSuper += coverBreakdown2.IPT.ElSykkelSuper;
        }

        // Trường hợp endDate - startDate = 1 năm
        const durationStartDateEndDate = getDurationBetweenTwoDates(startDate, endDate);
        if(durationStartDateEndDate === 364){
            coverBreakdown.PolicyPremium = coverBreakdown.AnnualPremium;
            coverBreakdown.IPT = coverBreakdown.AnnualIPT;
        }


        return coverBreakdown;
    }
}

function main() {
    const initialValue = {// Account DOB = '04/04/1979'
        "InnboStandard": 2281104.04,
        "Hussopp": 504.04,
        "ElSykkelStandard": 1101.01,
        "ElSykkelSuper": 1401.01
    }

    const initialRate = {
        "rateOfUnderwritingAdjustment": 22,
        "rateOfSalesDiscount": 22,
        "rateOfProductCommission": 22,
        "rateOfSalesCommission": 22
    }

    const initialIPT = {
        "InnboStandard": 128.77,
        "Hussopp": 0,
        "ElSykkelStandard": 0,
        "ElSykkelSuper": 0
    }

    const startDate = '15/09/2021';
    const endDate = '31/12/2021';

    let a = VarsamSeasonalCoverBreakdown.getCoverBreakdown("PartialInsurance", initialValue, initialRate, initialIPT, startDate, endDate);
    console.log(a);
}
// main()