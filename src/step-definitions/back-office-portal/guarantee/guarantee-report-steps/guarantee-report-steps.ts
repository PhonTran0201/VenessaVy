import { Before, Given, Then, When } from "@cucumber/cucumber";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { GlobalReportGuarantee } from "../../../../page-objects/back-office-portal/guarantee/reports/global-report-guarantee/GlobalReportGuarantee";
import { GuaranteeReportGuarantee } from "../../../../page-objects/back-office-portal/guarantee/reports/guarantee-report/GuaranteeReportGuarantee";
import { convertPathFileDataToDataRegression, logFailTestcase, logWarningMessage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { dataTestcase } from "../../../../shared/variables";


const loader = require("csv-load-sync");
let globalPageObject: GlobalPageObject;
let globalReportGuarantee: GlobalReportGuarantee
let guaranteeReportGuarantee: GuaranteeReportGuarantee



Before(async function () {
    const context: ICommonContext = this.context;
    globalPageObject = new GlobalPageObject(context.driverService);
    globalReportGuarantee = new GlobalReportGuarantee(context.driverService);
    guaranteeReportGuarantee = new GuaranteeReportGuarantee(context.driverService);

});


Given("User navigates to Guarantee Report", async () => {
    let temp = await globalPageObject.navigateToGuaranteeReportList();
    logFailTestcase(temp, "navigate to Guarantee Report List failed!");
});



When("User inputs the current test account into search fields {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const Account = row.Account;
    const Currency = row.Currency;
    const CreatedDateFrom = row.CreatedDateFrom;
    const CreatedDateTo = row.CreatedDateTo;
    let temp = true;
    if (Account) {
        temp = await globalReportGuarantee.inputAccountToSearchField(Account);
        logFailTestcase(temp, "input Account into Search field failed!");
    }
    if (Currency) {
        temp = await globalReportGuarantee.inputCurrencyOnSearchFields(Currency);
        logFailTestcase(temp, "input Currency into Search field failed!");
    }
    if (CreatedDateFrom) {
        temp = await globalReportGuarantee.inputCreatedDateFromOnSearchFields(CreatedDateFrom);
        logFailTestcase(temp, "input CreatedDateFrom into Search field failed!");
    }
    if (CreatedDateTo) {
        temp = await globalReportGuarantee.inputCreatedDateToOnSearchFields(CreatedDateTo);
        logFailTestcase(temp, "input CreatedDateTo into Search field failed!");
    }

    temp = await globalReportGuarantee.pressSearchReportButton();
    await globalPageObject.waitForProgressBarLoaded_v2();
    logFailTestcase(temp, "press search report failed!");


});

/*
 function validate report info after Search  
*/
async function validateGuaranteeReportInfoAfterSearch(
    GuaranteeNo: string,
    Account: string,
    Currency: string,
    CreatedDateFrom: string,
    CreatedDateTo: string,
    positionRow: number = 1
) {
    try {
        let temp = true;
        if (GuaranteeNo) {
            temp = await guaranteeReportGuarantee.validateGuaranteeNoOnGuaranteeReportList(GuaranteeNo, positionRow);
            logFailTestcase(temp, `GuaranteeNo "${GuaranteeNo}" does not match to result`);
        }
        if (Account) {
            temp = await guaranteeReportGuarantee.validateAccountOnGuaranteeReportList(Account, positionRow);
            logFailTestcase(temp, `Account "${Account}" does not match to result`);
        }

        if (Currency) {
            temp = await guaranteeReportGuarantee.validateCurrencyOnGuaranteeReportList(Currency, positionRow);
            logFailTestcase(temp, `Currency "${Currency}" does not match to result`);
        }

        if (CreatedDateFrom || CreatedDateTo) {
            temp = await guaranteeReportGuarantee.validateCreatedDateOnList(CreatedDateFrom, CreatedDateTo, positionRow);
            logFailTestcase(temp, `Created Date does not match to result`);
        }

        return true;
    } catch (error) {
        console.log("validateGuaranteeReportInfoAfterSearch");
        console.error(error);
        return false;
    }

}

Then("System returns all the guarantees of the account {string}", async (filename) => {
    await globalPageObject.waitForSeconds(2000);
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const Account = row.Account;
    const Currency = row.Currency;
    const CreatedDateFrom = row.CreatedDateFrom;
    const CreatedDateTo = row.CreatedDateTo;

    let GuaranteeNo = "Guarantee No";
    for (const iterator of dataTestcase) {
        if (iterator.nameField.localeCompare("Guarantee No") === 0) {
            GuaranteeNo = iterator.message[0];
        }
    }
    let GuaranteeNoAmendment = "Guarantee No Amendment";
    for (const interator of dataTestcase) {
        if (interator.nameField.localeCompare("Guarantee No Amendment") === 0) {
            GuaranteeNoAmendment = interator.message[0];
        }
    }


    let temp = true;
    const actualTotalNumber = await guaranteeReportGuarantee.getNumberOfTotalRecordsGuaranteeReport();

    if (actualTotalNumber > 0) {
        //validate a first row
        temp = await validateGuaranteeReportInfoAfterSearch(
            GuaranteeNoAmendment,
            Account,
            Currency,
            CreatedDateFrom,
            CreatedDateTo,
            1
        );
        logFailTestcase(temp, "validate guarantee report info at first row after Search Failed !");

        //validate a second row
        temp = await validateGuaranteeReportInfoAfterSearch(
            GuaranteeNo,
            Account,
            Currency,
            CreatedDateFrom,
            CreatedDateTo,
            2
        );
        logFailTestcase(temp, "validate guarantee report info at Second row after Search Failed !");

    }
    else {
        logWarningMessage(`There are ${actualTotalNumber} total records found!`);
        logFailTestcase(false, `"validate guarantee report info after Search Failed !"`);
    }
    logWarningMessage(`Testcase passed!`);
    await globalPageObject.closeOpeningForm();
});


Then("User opens the {string} guarantee on guarantee report list", async (guaranteeVersion) => {
    if (guaranteeVersion.localeCompare("Amendment") === 0) {
        let temp = await guaranteeReportGuarantee.openGuaranteeByRowOnGuaranteeReportList(1);
        logFailTestcase(temp, `open ${guaranteeVersion} Guarantee By Row On Guarantee Report List Failed!`);
    }

    else if (guaranteeVersion.localeCompare("Original") === 0) {
        let temp = await guaranteeReportGuarantee.openGuaranteeByRowOnGuaranteeReportList(2);
        logFailTestcase(temp, `open ${guaranteeVersion} Guarantee By Row On Guarantee Report List Failed!`);
    }
})