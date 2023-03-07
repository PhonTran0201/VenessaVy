import { Before, Then } from "@cucumber/cucumber";
import { AppFooter } from "../../../../page-objects/back-office-portal/general/app-footer/AppFooter";
import { convertPathFileDataToDataRegression, getDate, logFailTestcase } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { UserProfileInfo } from "../../../../shared/user-profile/UserProfileInfo";


const loader = require("csv-load-sync");
let appFooter: AppFooter;

Before(async function () {
    const context: ICommonContext = this.context;
    appFooter = new AppFooter(context.driverService);
});

Then('System shows correct information at the footer {string}', async (filename) => {

    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const TenantName = UserProfileInfo.getTenantId();
    const SystemName = row.SystemName;
    const Copyright = row.Copyright;

    let temp = await appFooter.validateTenantNameIsVisible(TenantName);
    logFailTestcase(temp, 'Incorrect TenantName on the footer!');

    temp = await appFooter.validateCopyrightIsVisible(SystemName + " " + getDate().split("/")[2] + " " + Copyright);
    logFailTestcase(temp, 'Incorrect Copyright on the footer!');

    temp = await appFooter.validatebtnSupportIsVisible();
    logFailTestcase(temp, 'Incorrect Support button on the footer!');

    temp = await appFooter.validatebtnBugReportIsVisible();
    logFailTestcase(temp, 'Incorrect Bug Report button on the footer!');
});