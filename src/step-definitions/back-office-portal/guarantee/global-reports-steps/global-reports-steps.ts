import { Before, Then, When } from "@cucumber/cucumber";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { GlobalReportGuarantee } from "../../../../page-objects/back-office-portal/guarantee/reports/global-report-guarantee/GlobalReportGuarantee";
import { getCurrentDateTime, logFailTestcase } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";



let globalPageObject: GlobalPageObject;
let globalReportGuarantee: GlobalReportGuarantee;

Before(async function () {
    const context: ICommonContext = this.context;
    globalPageObject = new GlobalPageObject(context.driverService);
    globalReportGuarantee = new GlobalReportGuarantee(context.driverService);
});

When(`User presses {string} button on Reports page`, async (buttonName: string) => {
    let temp;
    if (buttonName === "Exported Files") {
        temp = await globalReportGuarantee.pressExportedFilesButton();
        logFailTestcase(temp, `Press ${buttonName} on Reports page failed`);
    }
    if (buttonName == "Export") {
        temp = await globalReportGuarantee.pressExportButton();
        logFailTestcase(temp, `Press ${buttonName} on Reports page failed`);
    }
    if (buttonName == "Search") {
        temp = await globalReportGuarantee.pressSearchReportButton();
        logFailTestcase(temp, `Press ${buttonName} on Reports page failed`);
    }
});

Then(`System shows processing exported files notification on Reports page`, async () => {
    await globalPageObject.waitForProgressBarLoaded_v2();
    let temp = await globalPageObject.checkToastSuccessExistWithMessage(`is processing, we will notify to you once it finished`);
    logFailTestcase(temp, `Processing exported files notification not found`);
});

Then(`System shows finished processing files notification on Reports page`, async () => {
    await globalPageObject.waitForProgressBarLoaded_v2();
    await globalPageObject.waitForSeconds(5000);
    let temp = await globalPageObject.checkToastSuccessExistWithMessage(`Export installment is processing, we will notify to you after once it finished.`);
    logFailTestcase(temp, `Processing finished processing files notification not found`)
});

Then(`System displays Export History page with valid {string} information`, async (name: string) => {

    await globalPageObject.waitForSeconds(2000);
    let temp = true;
    await globalPageObject.waitForProgressBarLoaded_v2();
    temp = await globalReportGuarantee.refreshExportHistoryList();
    logFailTestcase(temp, "refresh Export History List failed!");
    await globalPageObject.waitForProgressBarLoaded_v2();
    let createdDate = getCurrentDateTime();
    

    if (name.localeCompare("Frame Agreement")===0) {
        temp = await globalReportGuarantee.validateValueOnExportHistory("Frame_Agreement_Export", createdDate, 1);
        logFailTestcase(temp, "generate exported file on Export History failed!");
    } 
    else if (name.localeCompare("Instalment")===0) {
        temp = await globalReportGuarantee.validateValueOnExportHistory("Instalment_Export", createdDate, 1);
        logFailTestcase(temp, "generate exported file on Export History failed!");
    }
    else if (name.localeCompare("Guarantee")===0){
        temp = await globalReportGuarantee.validateValueOnExportHistory("Guarantee_Export", createdDate, 1);
        logFailTestcase(temp, "generate exported file on Export History failed!");
    }else{
        logFailTestcase(temp, `can not find ${name} exported file on Export History failed!`);
    };

});

Then("User presses download button on Export History page to download the exported file", async () => {
    let temp = await globalReportGuarantee.downloadExportFileOnExportHistoryPageByRow();
    logFailTestcase(temp, "download exported file on Export History failed!");
    await globalPageObject.waitForSeconds(3000);
    await globalPageObject.closeOpeningForm();
});
