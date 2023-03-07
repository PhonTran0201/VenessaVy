import * as fs from 'fs';
var XLSX = require("xlsx");

export class XLSX_Helper {
    async loadFile(filePath: string, isDebug: boolean = false) {
        var workbook = XLSX.readFile(filePath);
        var sheet_name_list = workbook.SheetNames;
        //console.log(sheet_name_list);
        const data = XLSX.utils.sheet_to_json(workbook.Sheets.Worksheet);
        if (isDebug) {
            data.forEach(item => {
                console.log(item);
            });
        }
        return data;
    }

    async loadSheet(filePath: string, sheet: string = 'Sheet1') {
        var workbook = XLSX.readFile(filePath);
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        return data;
    }


    
}