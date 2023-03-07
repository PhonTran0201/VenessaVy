import { Given, Then, When } from "@cucumber/cucumber";
import { da } from "date-fns/locale";
import { MappingPage } from "../../../../core/MappingPage";
import { DataRepo } from "../../../../core/modals/DataRepo";
import { SeleniumWebDriverService } from "../../../../core/selenium-webdriver.service";
import { ExportForm } from "../../../../page-objects/back-office-portal/general/reward-programs/reward-log/ExportForm";
import { PageFactory } from "../../../../page-objects/PageFactory";
import { convertPathFileDataToDataRegression, ExcelDateToJSDate, getDate, getTheFirstFileNameByPathInFolder, logFailMessage, logFailTestcase, logSuccessMessage, logWarningMessage, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../shared/functions";
import { formatDateTime } from "../../../../shared/tenant-setting/tenant-setting";
import { DownloadFilePathGlobalVariable } from "../../../../shared/variables";
import { getValueDataOfDataTestExecution, pushObjectToDataArrayWithUniqueKey } from "../../../../storage-data/functions/data-test-execution";
import * as fs from 'fs';
const PageList = PageFactory.getInstance().createRewardLogListPage();
const PageGlobal = PageFactory.getInstance().createGlobalPageObjectPage();
const PageForm = PageFactory.getInstance().createRewardLogForm();
const PageExport = PageFactory.getInstance().createRewardLogExportForm();

const loader = require("csv-load-sync");

Given(`User navigates to Reward Log page`, async () => {
    let temp = await PageList.navigateToRewardLogPage();
    logFailTestcase(temp, `User navigates to Reward Log page failed!`);
});

//#region Manual Points steps
Then(`User verifies Manual Points button is visible on Reward Log page`, async () => {
    await PageGlobal.waitForProgressBarLoaded_v2();
    let temp = await PageList.validateMannualPointsButtonVisible(true);
    logFailTestcase(temp, `verifies Manual Points button is visible failed!`);
});

Then(`User verifies Manual Points button is invisible on Reward Log page`, async () => {
    await PageGlobal.waitForProgressBarLoaded_v2();
    let temp = await PageList.validateMannualPointsButtonVisible(false);
    logFailTestcase(temp, `verifies Manual Points button is invisible failed!`);
});


When(`User opens Reward Log form`, async () => {
    let temp = await PageList.clickButtonManualPoints();
    logFailTestcase(temp, `User opens Reward Log form failed!`)
});


When(`User inputs valid data into Reward Log form {string}`, async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const CustomerName = row.CustomerName;
    const NIN = row.NIN;
    const ProgramName = row.ProgramName;
    const EventType = row.EventType;
    const TransactionType = row.TransactionType;
    const Point = row.Point;
    const Comments = row.Comments;

    let temp = await PageForm.inputRewardLogForm(CustomerName, NIN, ProgramName, EventType, TransactionType, Point, Comments);
    logFailTestcase(temp, `input Reward Log Form failed!`);
});

//#endregion

//#region export steps
When(`User opens Reward Log Export form`, async () => {
    let temp = await PageList.clickButtonExport();
    logFailTestcase(temp, `User opens Reward Log Export form failed!`);
});

When(`User presses Export button on Reward Log Export form`, async () => {
    let temp = await PageExport.clickButtonpgsrewardlogexportbtn();
    logFailTestcase(temp, 'press Export button on Reward Log Export form failed!')
});

When(`User verifies program field on Reward Log Export form works properly {string}`, async (dataKey) => {
    let data = (await DataRepo.getInstance().loadData(dataKey))[0];
    let ProgramName = data.ProgramName;

    await PageExport.tickOrUnTickSelectAllPrograms(true);
    await PageGlobal.waitForProgressBarLoaded_v2();
    let temp = await PageExport.validateSelectAllProgramsIsTickedOrNot(true);
    logFailTestcase(temp, 'User ticks select all programs failed!');

    temp = await PageExport.validateProgramFieldIsDisabledOrNot(true);
    logFailTestcase(temp, 'Program field is not disabled when ticks select all programs!');

    await PageExport.tickOrUnTickSelectAllPrograms(false);
    await PageGlobal.waitForProgressBarLoaded_v2();

    temp = await PageExport.validateSelectAllProgramsIsTickedOrNot(false);
    logFailTestcase(temp, 'User unticks select all programs failed!');

    temp = await PageExport.validateProgramFieldIsDisabledOrNot(false);
    logFailTestcase(temp, 'Program field is not enabled when unticks select all programs!');

    temp = await PageExport.setNgselectSelectaprogram(ProgramName);
    logFailTestcase(temp, 'Can not find program option on field!');

});

Then("User can not find the program option on Reward Log Export form {string}", async (dataKey) => {
    let data = (await DataRepo.getInstance().loadData(dataKey))[0];
    let ProgramName = data.ProgramName;
    await PageExport.tickOrUnTickSelectAllPrograms(false);
    await PageGlobal.waitForProgressBarLoaded_v2();
    let temp = await PageExport.validateProgramCannotFindOption(ProgramName);
    logFailTestcase(temp, 'validate Program field option failed!');
});

Then("User waits until message {string} visible", async (message) => {
    let temp = await PageGlobal.checkToastMessageVisible(message);
    logFailTestcase(temp, `check toast message '${message}' failed!`);
});

When(`User inputs data into Reward Log Export form {string}`, async (dataKey) => {
    let data = await DataRepo.getInstance().loadData(dataKey);

    let AwardedDateFrom = data.AwardedDateFrom;
    let AwardedDateTo = data.AwardedDateTo;
    let ProgramName = data.ProgramName;
    let Product = data.Product;
    let SelectAllPrograms = data.SelectAllPrograms == "true" ? true : false;
    let SelectAllProducts = data.SelectAllProducts == "true" ? true : false;
    await PageExport.tickOrUnTickSelectAllPrograms(SelectAllPrograms);
    await PageExport.setInputpgsloyaltyfromdate(AwardedDateFrom);
    await PageExport.setInputpgsloyaltytodate(AwardedDateTo);
    await PageExport.setInputpgsloyaltyprogram(ProgramName);
    await PageExport.setNgselectSelectaproduct(Product);
    await PageExport.tickOrUnTickSelectAllPProducts(SelectAllProducts);

});

Then(`User downloads exported file on Reward log Page`, async () => {

    await PageGlobal.waitForProgressBarLoaded_v2();
    await PageGlobal.waitForProgressBarLoaded_v2();
    let temp = await PageExport.downloadExportFileOnRewardLogExportForm();
    logFailTestcase(temp, 'download Export file failed!');
    await PageGlobal.waitForProgressBarLoaded_v2();
    await PageGlobal.waitForProgressBarLoaded_v2();

    await PageGlobal.closeOpeningForm();
});

When(`User stores Reward Log list {string}`, async (dataKey) => {
    let rewardLogList = [{
        RewardLog: {
            AccountName: "",
            PolicyNumber: "",
            Reward: "",
            AwardedDate: "",
            Points: "",
            Comments: "",
        }
    }];

    rewardLogList.pop();
    let totalRecord = await PageList.getNumberOfTotalRecords();
    let count = totalRecord > 10 ? 10 : totalRecord;
    for (let i = 0; i < count; i++) {
        let AccountName = await PageList.getAccountName(i);
        let PolicyNumber = await PageList.getPolicyID(i);
        let Reward = await PageList.getRewardName(i);
        let AwardedDate = await PageList.getAwardedDate(i);
        let Points = (await PageList.getPointsByRow(i)).toString();
        let Comments = await PageList.getComments(i);

        let Obj = {
            RewardLog: {
                AccountName: "",
                PolicyNumber: "",
                Reward: "",
                AwardedDate: "",
                Points: "",
                Comments: "",
            }
        };

        Obj.RewardLog.AccountName = AccountName;
        Obj.RewardLog.PolicyNumber = PolicyNumber;
        Obj.RewardLog.Reward = Reward;
        Obj.RewardLog.AwardedDate = AwardedDate;
        Obj.RewardLog.Points = Points;
        Obj.RewardLog.Comments = Comments;

        rewardLogList.push(Obj);
    }
    console.log(rewardLogList);

    let list = JSON.stringify(rewardLogList);
    pushObjectToDataArrayWithUniqueKey(dataKey, list);
});

Then(`User verifies information is shown correctly in the exported file {string}`, async (dataKey) => {
    const loader_xlsx = require('read-excel-file/node');
    let DownloadedFilePath = (DownloadFilePathGlobalVariable + "\\" + getTheFirstFileNameByPathInFolder(DownloadFilePathGlobalVariable, "xlsx")).replace(/\//g, "\\");
    let ExpectedData: any = getValueDataOfDataTestExecution(dataKey);

    if (!ExpectedData) {
        ExpectedData = await DataRepo.getInstance().loadData(dataKey);
    } else {
        ExpectedData = JSON.parse(getValueDataOfDataTestExecution(dataKey));
    }

    console.log(`Downloaded File Path: ${DownloadedFilePath}`);
    console.log(ExpectedData);

    await loader_xlsx(DownloadedFilePath).then(async (rows) => {
        for (let i = 0; i < ExpectedData.length; i++) {
            let _AccountName = ExpectedData[i].RewardLog.AccountName;
            let _AwardedDate = ExpectedData[i].RewardLog.AwardedDate;
            let _Points = ExpectedData[i].RewardLog.Points;
            let _Comments = ExpectedData[i].RewardLog.Comments;

            for (let j = 1; j < rows.length; j++) {

                const AccountName = rows[j][rows[0].indexOf("Full Name")];
                const AwardedDate = formatDateTime(rows[j][rows[0].indexOf("Awarded Date")]);
                const Points = (rows[j][rows[0].indexOf("Point")]).toString();
                let Comments = rows[j][rows[0].indexOf("Comments")];
                if (!Comments) {
                    Comments = "N/A";
                }

                if (AccountName.localeCompare(_AccountName) === 0 &&
                    AwardedDate.localeCompare(_AwardedDate) === 0 &&
                    Points.localeCompare(_Points) === 0 &&
                    Comments.localeCompare(_Comments) === 0) {
                    logSuccessMessage('Correct information!');
                    break;
                } else if (j == rows.length - 1) {
                    logFailTestcase(false, `Cannot find record has Account Name '${_AccountName}',Points: ${_Points} ,AwardedDate: ${_AwardedDate}  row ${(i + 1)} on the expected list!`);
                }
            }
        }
    })

});


//#endregion

Then("User verifies that Reward records information is correct in the Reward Log Page {string}", async (filename) => {
    let rows = await DataRepo.getInstance().loadData(filename);
    if (filename.includes("json")) {
        rows = rows[0].Rewards;
    }
    await PageGlobal.reloadTable(3000);
    for (let i = 0; i < rows.length; i++) {
        const CustomerName = rows[i].CustomerName;
        let policyid = "";
        let RewardName = rows[i].RewardName || rows[i].EventType;
        let AwardedDate = getDate();
        let Point = rows[i].Point;
        let Comments = rows[i].Comments;

        await PageGlobal.reloadTable(3000);
        if (rows[i].EventType) {
            policyid = "N/A";
        } else {
            policyid = getValueDataOfDataTestExecution("QuoteReference");
        }

        if (rows[i].TransactionType && rows[i].TransactionType.localeCompare('Deduction') === 0) {
            Point = "-" + Point;
        } else { Point = "+" + Point; }

        let temp = await PageList.validateAccountName(CustomerName, i);
        logFailTestcase(temp, `Incorrect AccountName at row ${i}`);

        temp = await PageList.validatePolicyID(policyid, i);
        logFailTestcase(temp, `Incorrect policyId at row ${i}`);

        temp = await PageList.validateRewardName(RewardName, i);
        logFailTestcase(temp, `validate Reward Name at row ${i} failed!`)

        temp = await PageList.validateAwardedDate(AwardedDate, i);
        logFailTestcase(temp, `validate Awarded Date at row ${i} failed!`);

        temp = await PageList.validatePoints(Point, i);
        logFailTestcase(temp, `validate Point at row ${i} failed!`);

        temp = await PageList.validateComments(Comments || "N/A", i);
        logFailTestcase(temp, `validate Comments at row ${i} failed!`);

    }

});
