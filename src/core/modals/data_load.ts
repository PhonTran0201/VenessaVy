import { faker } from '@faker-js/faker';
import * as fs from 'fs';
import { recursiveSearchKey, recursiveSearchValue } from '../../shared/functions';
import { XLSX_Helper } from '../../shared/xlsx-helper';
import loader from "csv-load-sync";
import { User } from './base/user.modal';
import { DataAccess } from './data_access';
import { DataConfig } from './data_config';
import { DataHelper } from './data_helper';

export class DataLoad {
    dataAccess: DataAccess;
    //#region class generated
    user: User;
    //#endregion
    xlsx: XLSX_Helper;

    

    constructor() {
        console.log(DataConfig.MODAL_PATH);
        this.dataAccess = new DataAccess();
        this.user = new User(DataConfig.TENANT);
        this.xlsx = new XLSX_Helper();
        DataHelper.getInstance().getData("KAM");
    }

    private async loadFileMapping() {
        let fieldMap = await this.xlsx.loadSheet(DataConfig.DATA_MAPPING_PATH);
        await fieldMap.forEach(async element => {
            await this.updateData(element);
        });
    }

    private async updateData(element) {
        if (await element.Updated !== `Y`) return ;
        
        const fieldName = element.Field;
        let rows: any;
        let old: string = ``;
        if (element.Path != undefined || element.Path != null) {
            rows = loader(element.Path);
            old = rows[0][fieldName];
        }
        const oldV = `,${old},`;
        const data = fs.readFileSync(element.Path, 'utf8');
        const json = await this.dataAccess.send_request(element.Method, element.API_EndPoint, "", {}, true);
        let fieldValue = await this.dataAccess.getJsonValue(json, element.JSON_Path);
        if (fieldValue == null || fieldValue == undefined) {
            const success = await this.addData(element.API_Post, element.Body);
            if (await success) {
                fieldValue = element.Field_Post_Value;
            } 
        }
        if (element.JSON_Output === `Y`) {
            const file = `src/core/modals/data/${element.Name}/${element.Environment.toLowerCase()}/${element.Name}.json`;
            if (!fs.existsSync(file)) {
                await fs.writeFileSync(file, `{}`);
            }
            const data = fs.readFileSync(file, 'utf8');
            const modal = JSON.parse(data);
            modal[fieldName] = fieldValue;
            await fs.writeFileSync(file, JSON.stringify(modal));
        };
        const newData = data.replace(oldV, `,${fieldValue},`);
        console.log(newData);
        //await fs.writeFileSync(path, newData);
    }

    private async addData(api_post, jsonBody) {
        try {
            const json = await this.dataAccess.send_request(`post`, api_post, jsonBody);
            return json!==null;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    private async save(object, name: string, key: string) {
        // const value = await findKey(object, key);
        // this.setValueData(name, value);
        // console.log(this.fullData);
        const value1 = await recursiveSearchKey(object, `languageCode`);
        //const value2 = await findValue(object, `[A] Org`);
        //const value3 = await recursiveSearchValue(object, `[A] Org QC`);
        // console.log(`>>>> ` + value1);
    }

    async generate() {
        // access to api and get master data base on environment & tenant
        await this.dataAccess.loadAccessToken();
        await this.loadFileMapping();
        // await this.dataAccess.getUserData();
        // await this.dataAccess.getSalesChannels();
        // await this.dataAccess.getOrganization();
        // const org = await this.dataAccess.getChildOrganization();
        // await this.save(org, 'organization', 'name');
        //await this.dataAccess.getUserList();
        //await this.dataAccess.getDetailsRequest();
        //await this.dataAccess.getProductsList();
        //await this.dataAccess.getProductInfo();
        //await this.loadFeatures(DataConfig.ENV);
        // create basic data or update required data
        // create basic account auto for testing
        // export data to json file
    }

    async loadFeatures(env) {

    }



    async loadBaseData(env) {
        await this.loadUser();
    }



    //#region export data to json
    async loadUser() {
        await this.user.dump();
        console.log(this.user.modal[`email`]);
        //await this.user.save(this.DATA_PATH);
    }
    //#endregion

}