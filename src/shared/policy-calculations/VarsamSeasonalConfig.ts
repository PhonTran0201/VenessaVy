import { getDaysInMonth } from "../functions";

export class VarsamSeasonalConfig {
    private static configRate = [
        {
            "Month": "Jan",
            "Value": 1,
            "Rate": 1.9
        },
        {
            "Month": "Feb",
            "Value": 2,
            "Rate": 2.9
        },
        {
            "Month": "Mar",
            "Value": 3,
            "Rate": 3.9
        },
        {
            "Month": "Apr",
            "Value": 4,
            "Rate": 4.9
        },
        {
            "Month": "May",
            "Value": 5,
            "Rate": 5.94
        },
        {
            "Month": "Jun",
            "Value": 6,
            "Rate": 6.94
        },
        {
            "Month": "July",
            "Value": 7,
            "Rate": 7.94
        },
        {
            "Month": "Aug",
            "Value": 8,
            "Rate": 8.94
        },
        {
            "Month": "Sep",
            "Value": 9,
            "Rate": 9.94
        },
        {
            "Month": "Oct",
            "Value": 10,
            "Rate": 10.9
        },
        {
            "Month": "Nov",
            "Value": 11,
            "Rate": 11.9
        },
        {
            "Month": "Dec",
            "Value": 12,
            "Rate": 23.9
        }
    ]

    private static configCoverBreakdownRatio = {
        "InnboStandard":{
            "TrafficOnly": 1,
            "PartialInsurance": 0.5,
            "FullInsurance": 0.5,
            "TrafficAndHussopp": 0.8
        },
        "Hussopp":{
            "TrafficOnly": 0,
            "PartialInsurance": 0.1,
            "FullInsurance": 0.165,
            "TrafficAndHussopp": 0.3
        },
        "ElSykkelStandard":{
            "TrafficOnly": 0,
            "PartialInsurance": 0.2,
            "FullInsurance": 0.265,
            "TrafficAndHussopp": 0
        },
        "ElSykkelSuper":{
            "TrafficOnly": 0,
            "PartialInsurance": 0.2,
            "FullInsurance": 0.395,
            "TrafficAndHussopp": 0
        }
    }
    //#region Configuration Rate
    private static formatConfigRate(year: number) {
        let result: any[] = [];
        for (const iterator of this.configRate) {
            const temp = getDaysInMonth(year, iterator.Value);
            result.push(
                {
                    "Month": iterator.Month,
                    "Value": iterator.Value,
                    "Rate": iterator.Rate,
                    "NumberOfDays": temp
                }
            );
        }
        return result;
    }

    public static getConfigRate(year: number){
        const result = this.formatConfigRate(year);
        return result;
    }
    //#endregion

    //#region Cover breakdown
    public static getConfigCoverBreakdownRatio(){
        return this.configCoverBreakdownRatio;
    }
    //#endregion
}