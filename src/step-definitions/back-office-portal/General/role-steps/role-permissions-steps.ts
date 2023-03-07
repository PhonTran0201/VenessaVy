import { Before, Given, Then } from "@cucumber/cucumber";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { RoleForm } from "../../../../page-objects/back-office-portal/general/role/role-forms/RoleForm";
import { RoleList } from "../../../../page-objects/back-office-portal/general/role/role-list/RoleList";
import { RolePermissions } from "../../../../page-objects/back-office-portal/general/role/role-permissions/RolePermissions";
import { convertPathFileDataToDataRegression, getCurrentDateTime, logFailTestcase } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";

const loader = require("csv-load-sync");

let roleList: RoleList;
let roleForm: RoleForm;
let globalPageObject: GlobalPageObject;
let rolePermissions: RolePermissions;

Before(async function () {
    const context: ICommonContext = this.context;
    roleList = new RoleList(context.driverService);
    roleForm = new RoleForm(context.driverService);
    globalPageObject = new GlobalPageObject(context.driverService);
    rolePermissions = new RolePermissions(context.driverService);
});
Given(`User navigates to Permissions page`, async () => {
    let temp = await globalPageObject.navigateToMainPermissions();
    logFailTestcase(temp, "Navigate to Permissions page failed");
})

Then(`System shows required modules on Permissions page {string}`, async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const ObjectsToCsv = require("objects-to-csv-file");
    let columnName: string[] = [];
    let flag: string[] = [];
    for (let i = 0; i < rows.length; i++) {
        let ColumnName = rows[i].ColumnName;
        let Flag = rows[i].Flag;
        columnName.push(ColumnName);
        flag.push(Flag);
    }
    let temp = await rolePermissions.verifyPermissionModules(columnName, flag, false);

    (async () => {
        const csv = new ObjectsToCsv(temp);
        await csv.toDisk("./result/SAAS-13419_UI_Test_Report.csv", { append: true });
    })();

    for (const iterator of temp) {
        if (iterator.expected != iterator.actual && (!(iterator.expected == "Optional"))) {
            logFailTestcase(false, `${iterator.item} (${iterator.itemid}) is expected to be ${iterator.expected} but got ${iterator.actual}`);
        }
    }
})

Then(`System shows Manage Scoring permission on Permissions page {string}`, async (filename) => {
    var fs = require('fs')
    var logger = fs.createWriteStream('./result/SAAS-13419_UI_Test_Report.csv', {
        flags: 'a' // 'a' means appending (old data will be preserved)
    })
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    let Flag = row.Flag;
    let temp = await rolePermissions.verifyManageScoringPermission();

    let tempString;
    if (temp) {
        tempString = "Yes"
    } else {
        tempString = "No"
    }

    logger.write(`\r\n` + `Permissions,1,Manage Scoring permission,` + `${Flag},` + `${tempString},` + getCurrentDateTime() + `,Under Account module`); // append string to your file

    if ((tempString != Flag) && !(Flag == "Optional")) {
        logFailTestcase(false, `Manage Scoring permission is expected to be ${Flag} but got ${tempString}`)
    }

})