import { Before, Given, Then, When } from "@cucumber/cucumber";
import { PageFactory } from "../../../../page-objects/PageFactory";
import { convertPathFileDataToDataRegression, getCurrentDateTime, getTheFirstFileNameByPathInFolder, logFailTestcase } from "../../../../shared/functions";
import loader from "csv-load-sync";
import { DownloadFilePathGlobalVariable } from "../../../../shared/variables";
import { XLSX_Helper } from "../../../../shared/xlsx-helper";
import { filename } from "winston-daily-rotate-file";


const pageGlobal = PageFactory.getInstance().createGlobalPageObjectPage()
const pageList = PageFactory.getInstance().createTargetGroupListPage();
const pageCreate = PageFactory.getInstance().createTargetGroupCreatePage();
const pageSearch = PageFactory.getInstance().createTargetGroupSearchPage();
const pageDetail = PageFactory.getInstance().createTargetGroupDetailPage();
const pageExport = PageFactory.getInstance().createExportHistoryTargetGroupPage();

let targetGroupName: string = "";

Given("User go to Target Group page", async function () {
    await pageList.accessTargetGroup();
});

Given("User click Create button", async function () {
    await pageList.clickCreate();
});

Given("User in Target Group page", async function () {
    await pageList.refresh();
});

When("User create new Target Group {string}", async function (filename) {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    targetGroupName = rows[0].Name;
    await pageCreate.populateFields(rows[0]);
    await pageCreate.clickSave();
});

When("User create new Target Group at child organization {string}", async function (filename) {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    targetGroupName = rows[0].Name;
    await pageCreate.populateFieldsAtChildOrganization(rows[0]);
    await pageCreate.clickSave();
});



Then("System display a message {string}", async function (message) {
    await pageCreate.waitPageLoaded();
    await pageCreate.verifyMessage(message);
});

Then("System wait and display a message contains {string}", async function (message) {
    const result = await pageList.waitToastMessageDisplay(message);
    if (result == false) {
        logFailTestcase(result, `${message} is not displayed.`);
    }
});

Then("Download file and check contains 30 accounts in the target group {string}", async function (filename) {
    const result = await pageList.clickDownloadExportFile();
    if (result == false) {
        logFailTestcase(result, `Cannot download file.`);
        return;
    }
    let fileDownloadName = await pageList.getDriverService().getDownLoadedFileName();
    let filedownloadPath = DownloadFilePathGlobalVariable + "/" + getTheFirstFileNameByPathInFolder(DownloadFilePathGlobalVariable, "xlsx");
    // console.log(`filedownloadPath: ` + filedownloadPath);

    const rows = loader(convertPathFileDataToDataRegression(filename));
    targetGroupName = rows[0].Name;
    if (checkFileName(fileDownloadName, targetGroupName) == false) {
        logFailTestcase(result, `File download name ${fileDownloadName} is not as format. It should be 'yyyy-mm-dd_<Target group name>.xlsx'`);
        return;
    }

    const rowss = loader(filedownloadPath);
    const xlsx = new XLSX_Helper();
    let data = await xlsx.loadFile(filedownloadPath);
    if (data.length < 30) { // || !data[0]["Customer Id"]
        logFailTestcase(false, `Not enough data in download file ${filedownloadPath}, only ${data.length} rows found.`);
        return;
    }
});

Then("Download file and check the exported file content at the target group {string}", async function (filename) {

    let temp = await pageDetail.pressExportHistoryButton();
    logFailTestcase(temp, `press Export Customer Button failed!`);

    temp = await pageExport.downloadExportDocument();
    logFailTestcase(temp, `download Export Document failed!`);

    const xlsx = new XLSX_Helper();
    let ExpectedData = await xlsx.loadSheet(filename, "Worksheet");
    let filedownloadPath = DownloadFilePathGlobalVariable + "/" + getTheFirstFileNameByPathInFolder(DownloadFilePathGlobalVariable, "xlsx");
    let ActualData = await xlsx.loadSheet(filedownloadPath, "Worksheet");
    temp = JSON.stringify(ExpectedData) === JSON.stringify(ActualData);
    logFailTestcase(temp);

    temp = await pageExport.closeExportHistoryForm();
    logFailTestcase(temp, `close Export History Form failed!`);
});

Then("Target Group list shows created {string}", async function (filename) {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    await pageGlobal.reloadTable(5000);
    const result = await pageList.hasRecord(rows[0].Name);
    if (result == false) {
        logFailTestcase(result, `Cannot find target group ${rows[0].Name} from list after created.`);
        return;
    }
});

Then("User check pagination works correctly", async function () {
    const pagination = PageFactory.getInstance().createGlobalPaginationPage();
    const result = await pagination.checkPagingFunctionAtMainList();
    if (result == false) {
        logFailTestcase(result, `Paging work incorrectly.`);
        return;
    }
});

When("User edit existing Target Group {string}", async function (filename) {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    targetGroupName = rows[0].OldName;
    await pageList.editCreated(targetGroupName);
    await pageCreate.populateFields(rows[0]);
    await pageCreate.clickSave();
    await pageCreate.waitPageProgressCompleted();
    await pageCreate.waitPageLoaded();
});

When("User delete existing Target Group {string}", async function (filename) {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    await pageGlobal.waitForProgressBarLoaded_v2();
    await pageGlobal.waitForProgressBarLoaded_v2();
    targetGroupName = rows[0].Name;
    await pageList.deleteCreated(targetGroupName);
});

When("User export existing Target Group {string}", async function (filename) {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    targetGroupName = rows[0].Name;
    await pageList.exportCreated(targetGroupName);
    //await pageList.waitToastMessageDisplay("Export successfully! Click here to download file.");
});

When("User search Group Name {string}", async function (filename) {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    targetGroupName = rows[0].Name;
    await pageList.accessTargetGroupSearch();
    await pageSearch.searchTargetGroup(targetGroupName);
});

When("User clear Target Group Name and search", async function () {
    await pageList.accessTargetGroupSearch();
    await pageSearch.clearSearch();
});

Then("System shows correct Target Group {string}", async function (filename) {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    targetGroupName = rows[0].Name;
    const result = await pageList.contains(targetGroupName);
    if (!result) {
        logFailTestcase(result, `System return no records: ${targetGroupName}`);
    }
});

Then("System must shows all Target Groups", async function () {
    const result = (await pageList.getTotalRecords());
    if (result < 10) {
        logFailTestcase(false, `System return not enough records: ${result}`);
    }
});

Then("System returns no Target Group found", async function () {
    const result = await pageList.hasNoData();
    if (!result) {
        logFailTestcase(result, "System return some records in Target Group.");
    }
});

function checkFileName(fileName, targetGroupName) {
    const now = new Date();
    const expectedFileName = `${now.getFullYear()}-${padTo2Digits(now.getMonth() + 1)}-${padTo2Digits(now.getDate())}_${targetGroupName}.xlsx`;
    return fileName === expectedFileName;
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}


When("User open existing Target Group {string}", async (filename) => {
    await pageGlobal.waitPageLoaded();
    await pageGlobal.waitPageLoaded();
    await pageGlobal.waitPageLoaded();
    const rows = loader(convertPathFileDataToDataRegression(filename));
    targetGroupName = rows[0].TargetGroup || rows[0].Name;

    let temp = await pageList.openTargetGroup(targetGroupName);
    await pageGlobal.waitPageLoaded();
    await pageGlobal.waitForSeconds(3000);
    await pageGlobal.waitPageLoaded();
    logFailTestcase(temp, "open existing target group by name failed!");

});

Then("System shows Group Members of the Target Group {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    for (let i = 0; i < rows.length; i++) {
        const SelectedAccount = rows[i].SelectedAccount;
        let temp = await pageDetail.validateFullNameByRow(SelectedAccount);
        logFailTestcase(temp, `validate full name by row failed!`);
    }
});


When(`User presses export customer button on the detail page`, async () => {
    let temp = await pageDetail.pressExportCustomerButton();
    logFailTestcase(temp, `presses export customer button on the detail page failed!`);
});

Then(`User verifies export history of the Target Group {string}`, async (filename) => {
    let temp = await pageDetail.pressExportHistoryButton();
    logFailTestcase(temp, `press Export Customer Button failed!`);

    const rows = loader(convertPathFileDataToDataRegression(filename));
    targetGroupName = rows[0].Name || rows[0].TargetGroup;

    let actualFileName = await pageExport.getNameValueByRow(1);
    if (checkFileName(actualFileName, targetGroupName) == false) {
        logFailTestcase(false, `File download name ${actualFileName} is not as format. It should be 'yyyy-mm-dd_<Target group name>.xlsx'`);
        return;
    }

    let createdDate = getCurrentDateTime();
    temp = await pageExport.validateCreatedDateValue(createdDate);
    logFailTestcase(temp, `validate Created Date Value failed!`);

    temp = await pageExport.closeExportHistoryForm();
    logFailTestcase(temp, `close Export History Form failed!`);
});

When(`User deletes existing Group Members of the Target Group`, async () => {
    let temp = await pageDetail.pressDeleteCustomerButtonByRow(1);
    logFailTestcase(temp, `deletes existing Group Members of the Target Group failed!`)
});

Then(`System returns no Group Members found`, async () => {
let temp = await pageDetail.validateNotFoundCustomerAfterDelete();
logFailTestcase(temp, `Group Members still shown on the list!`)
});