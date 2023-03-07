import { DataConfig } from "./data_config";
import * as fs from 'fs';
export class DataHelper {
    private static modal: any;
    private constructor() {

    }

    private static instance: DataHelper;

    public static getInstance(): DataHelper {
        if (!DataHelper.instance) {
            DataHelper.instance = new DataHelper();
            const file = `src/core/modals/data/${DataConfig.TENANT}/${DataConfig.ENV.toLowerCase()}/${DataConfig.TENANT}.json`;
            const data = fs.readFileSync(file, 'utf8');
            this.modal = JSON.parse(data);
        }
        return DataHelper.instance;
    }

    async getData(fieldName) {
        console.log(DataHelper.modal[`${fieldName}`]);
        return DataHelper.modal[`${fieldName}`];
    }
}