import * as fs from 'fs';
import MasterData from "../../../data_json/master_data.json";
import { convertDateToStringDateTime, convertPathFileDataToDataRegression } from '../../shared/functions';
import { fileNameLogin } from '../../shared/variables';

export class DataRepo {
    private loader = require("csv-load-sync");
    private constructor() { }

    private static instance: DataRepo;

    public static getInstance(): DataRepo {
        if (!DataRepo.instance) {
            DataRepo.instance = new DataRepo();
        }
        return DataRepo.instance;
    }

    private async getEnvironment() {
        try {
            let result = "";
            const data = await fs.readFileSync(fileNameLogin, { encoding: 'utf8', flag: 'r' });
            const url = data.split('\n')[0].substring(4);
            if (url.includes("app.staging.contemisaasdev.com")) {
                result = "staging";
            }
            else if (url.includes("app.seamless.insure")) {
                result = "uat";
            }
            else {
                console.error(`Url "${url}" has not yet defined environment!`);
            }
            return result.trim();
        } catch (error) {
            console.log(error);
            return "";
        }
    }
    private async getTenantId() {
        try {
            let result = "";
            const data = await fs.readFileSync(fileNameLogin, { encoding: 'utf8', flag: 'r' });
            const username = data.split('\n')[1].substring(9);
            result = username.split("@")[1];
            return result.trim();
        } catch (error) {
            console.log(error);
            return "";
        }
    }

    public async loadData(fileName: string) {
        let result: any;
        try {
            if (fileName.includes(".csv")) {
                result = this.loader(convertPathFileDataToDataRegression(fileName));
            }
            else if (fileName.includes(".json")) {
                if (!(await fs.existsSync(fileName))) {
                    console.error(`File "${fileName}" not found!`);
                    result = {};
                }
                else {
                    const model = await fs.readFileSync(fileName, 'utf8');
                    if (model.length <= 0) {
                        console.error(`File ${fileName} empty`);
                        result = {};
                    } else {
                        result = await JSON.parse(model);
                        const env = await this.getEnvironment();
                        const tenantId = await this.getTenantId();
                        const key = `${env}_${tenantId}`;
                        result = result[key];
                        if (!result) {
                            console.error(`Not found any key "${key}" in file ${fileName}`);
                            result = {};
                        }
                    }
                }
            }
        } catch (error) {
            console.error(error);
            return {};
        }
        result = await this.reformatFieldValue(result);
        return result;
    }

    public async loadMasterData(key:string) {
        let result:any;
        try {
            const env = await this.getEnvironment();
            const tenantId = await this.getTenantId();
            const  temp = `${env}_${tenantId}`;
            result = MasterData[temp][key];
            return result;
        } catch (error) {
            console.error(error);
            return "";
        }
    }

    public async reformatFieldValue(value: any) {
        try {
            for (const k in value) {
                let v = value[k];
                if (typeof v === "string" && v.includes("%.")) {
                    value[k] = this.getDateValue(v.substring(2));
                }
                else if (typeof v === "string" && v.includes("$.")) {
                    const env = await this.getEnvironment();
                    const tenantId = await this.getTenantId();
                    const key = `${env}_${tenantId}`;
                    value[k] = MasterData[key][v.substring(2)];
                }
            }
            return value;
        } catch (error) {
            console.log(error);
            return value
        }
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
        }
        return result;
    }
}