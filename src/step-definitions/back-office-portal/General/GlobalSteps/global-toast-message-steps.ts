import { Before, Given } from "@cucumber/cucumber";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { convertPathFileDataToDataRegression, logFailTestcase } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
const loader = require("csv-load-sync");
let globalPageObject: GlobalPageObject;

Before(async function () {
  const context: ICommonContext = this.context;
  globalPageObject = new GlobalPageObject(context.driverService);
});

Given(`User verifies content on toast message {string}`, async function (filename) {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    let temp = true;
    await globalPageObject.waitForProgressBarLoaded_v2(1000);
    for(let i = 0; i < rows.length; i++){
        const content = rows[i].ContentOfToast;
        const typeOfToast = rows[i].TypeOfToast;

        switch (typeOfToast){
            case "Success":{
                temp = await globalPageObject.checkToastSuccessExistWithMessage(content);
                logFailTestcase(temp, `NOT found toast success "${content}"!`);
                break;
            }
            case "Error":{
                temp = await globalPageObject.checkToastErrorExistWithMessage(content);
                logFailTestcase(temp, `NOT found toast error "${content}"!`);
                break;
            }
            case "Warning":{
                temp = await globalPageObject.checkToastWarningExistWithMessage(content);
                logFailTestcase(temp, `NOT found toast warning "${content}"!`);
                break;
            }
            default:{
                logFailTestcase(false, `Type "${typeOfToast}" was NOT supported!`);
            }
        }
    }
});
