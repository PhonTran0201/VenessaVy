import * as fs from 'fs';
import jsonPath from 'jsonpath';
import { convertDateToStringDateTime } from '../../shared/functions';

export class DataRepo {
    private arrDateFunc = [
        "CurrentDate",
        "30daysFromDate",
        "1YearFromToday"
    ];
    private readonly MasterData_Path = "./data/master_data.json";
    private master_data: any;
    private loader = require("csv-load-sync");
    private constructor() {

    }

    private static instance: DataRepo;

    public static getInstance(): DataRepo {
        if (!DataRepo.instance) {
            DataRepo.instance = new DataRepo();
        }
        return new DataRepo();
    }

    private async loadData() {
        if (!fs.existsSync(this.MasterData_Path)) {
            fs.writeFileSync(this.MasterData_Path, `{}`);
        }
        const model = await fs.readFileSync(this.MasterData_Path, 'utf8');
        if (model.length > 0 || this.master_data != undefined) {
            this.master_data = await JSON.parse(model);
        }
    }

    public async getFieldValue(fieldName: string) {
        await this.loadData();
        const value = await this.master_data[fieldName];
        if (typeof value === 'string') {
            return (this.isDateFunc(value) == true) ? this.getDateValue(value) : value;
        } else {
            try {
                await Object.entries(value).forEach(
                    async ([k, v]) => {
                        if ((v as string).includes(`$`)) {
                            value[k] = jsonPath.value(this.master_data, (v as string).trim());
                            value[k] = (this.isDateFunc(value[k]) == true) ? this.getDateValue(value[k]) : value[k];
                        }
                    }
                );
            } catch (error) {
                console.log(error);
            }
        }
        return value;
    }


    public async getArrayValues(dataKey: string) {
        if (!fs.existsSync(this.MasterData_Path)) {
            fs.writeFileSync(this.MasterData_Path, `{}`);
        }
        let model = await fs.readFileSync(this.MasterData_Path, 'utf8');
        let arr_data: any = await JSON.parse(model);
        return arr_data[dataKey];
    }

    // public async getFieldData(fileName, fieldName): Promise<string> {
    //     const rows = await this.loader(convertPathFileDataToDataRegression(fileName));
    //     if (rows.length > 0 && rows[0][fieldName]) return rows[0][fieldName];
    //     await this.loadData();
    //     try {
    //         return await this.master_data[fieldName];
    //     } catch (e) {
    //         throw e;
    //     }
    // }

    private isDateFunc(value) {
        if (value === "CurrentDate" || value === "Get30daysFromDate" ||
            value === "Get1YearFromToday" || value === "Tomorrow" || value === "Get1YearBeforeToday" ||
            value === "GetPeriod1YearFromNext30days"
        )
            return true;
        return false;
    }

    private getDateValue(value) {
        const now = new Date(); // mm/dd/yyyy
        let result = ""; // to dd/mm/yyyy
        if (value === "CurrentDate") {
            result = convertDateToStringDateTime(now);
        } else if (value === "Tomorrow") {
            const temp = new Date(now.setDate(now.getDate() + 1));
            result = convertDateToStringDateTime(temp);
        } else if (value === "Get30daysFromDate") {
            const temp = new Date(now.setDate(now.getDate() + 30));
            result = convertDateToStringDateTime(temp);
        } else if (value === "Get1YearFromToday") {
            const temp = new Date(now.setDate(now.getDate() + 364));
            result = convertDateToStringDateTime(temp)
        } else if (value === "Get1YearBeforeToday") {
            const temp = new Date(now.setDate(now.getDate() - 363));
            result = convertDateToStringDateTime(temp);
        } else if (value === "GetPeriod1YearFromNext30days") {
            const temp = new Date(now.setDate(now.getDate() + 30 - 364));
            result = convertDateToStringDateTime(temp);
        } else if (value === "CurrentDateWithHourAndMinute") {
            result = convertDateToStringDateTime(now, "dd/MM/yyyy HH:mm")
        }    
        return result;
    }

    public async getMasterData_Path() {
        return this.MasterData_Path;
    }
}