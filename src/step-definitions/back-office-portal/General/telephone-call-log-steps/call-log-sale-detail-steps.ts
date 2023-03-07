import { Given, Then, When } from "@cucumber/cucumber";
import { PageFactory } from "../../../../page-objects/PageFactory";
import { convertPathFileDataToDataRegression, getCurrentDateTime, logFailMessage, logFailTestcase } from "../../../../shared/functions";
import { formatDateTime } from "../../../../shared/tenant-setting/tenant-setting";
import { UserProfileInfo } from "../../../../shared/user-profile/UserProfileInfo";

const PageList = PageFactory.getInstance().createSaleTabCallLogListPage();
const PageForm = PageFactory.getInstance().createSaleTabCallLogFormPage();
const PageGlobal = PageFactory.getInstance().createGlobalPageObjectPage();
const loader = require("csv-load-sync");
let callLogRecordBeforeAction;

Given(`User is on Call Log tab`, async () => {
    let temp = await PageList.navigateToCallLogTab();
    logFailTestcase(temp, `User navigates to Call Log tab failed!`);
});


When("User fills all required fields on Call Log form {string}", async (fileName) => {
    const row = loader(convertPathFileDataToDataRegression(fileName))[0];
    const Caller = UserProfileInfo.getDisplayName();
    const PhoneNumber = row.PhoneNumber;
    const DateAndTime = row.DateAndTime || formatDateTime(getCurrentDateTime());
    const CallType = row.CallType;
    const Duration = row.Duration;
    const DurationType = row.DurationType;
    const CallResult = row.CallResult;
    const Description = row.Description;

    let temp = await PageForm.validateCallerName(Caller);
    logFailTestcase(temp);

    temp = await PageForm.inputCallLogForm(PhoneNumber, DateAndTime, CallType, Duration, DurationType, CallResult, Description);
    logFailTestcase(temp);
});


When(`User {string} the first call log on the list`, async (action: string) => {
    let temp = true;
    if (action.localeCompare("edit") == 0) {
        temp = await PageList.editCallLogByRow(0);
        logFailTestcase(temp);
    } else if (action.localeCompare("delete") == 0) {
        await PageGlobal.waitForProgressBarLoaded_v2();
        await PageGlobal.waitForProgressBarLoaded_v2();
        await PageGlobal.waitForProgressBarLoaded_v2();
        callLogRecordBeforeAction = await PageGlobal.getNumberOfTotalRecordsSubTab();
        temp = await PageList.deleteCallLogByRow(0);
        logFailTestcase(temp);
    } else logFailMessage(`Can not find action has name '${action}' !`);
});

Then(`System shows correct call log information on the list {string}`, async (fileName) => {
    await PageGlobal.reloadTable(3000);
    const row = loader(convertPathFileDataToDataRegression(fileName))[0];
    const Caller = UserProfileInfo.getDisplayName();
    const PhoneNumber = row.PhoneNumber;
    const DateAndTime = row.DateAndTime || formatDateTime(getCurrentDateTime());
    const Duration = row.Duration;
    const DurationType = row.DurationType;
    const CallResult = row.CallResult;
    let temp = await PageList.validateCallLogList(Caller, CallResult, DateAndTime, PhoneNumber, Duration, DurationType, 0);
    logFailTestcase(temp);
});

Then(`System disable Action buttons on the call log list`, async () => {
    await PageGlobal.waitForProgressBarLoaded_v2();
    await PageGlobal.waitForProgressBarLoaded_v2();
    await PageGlobal.waitForProgressBarLoaded_v2();
    let temp = await PageList.validateActionButtonDisabled();
    logFailTestcase(temp);
})

When(`User moves mouse to the deleted call log button on the call log list`, async () => {
    let temp = await PageList.moveMouseToDeleteCallLogButton();
    logFailTestcase(temp);
});

Then(`System shows the tooltip window has messages {string}`, async (message) => {
    let temp = await PageList.validateTooltipWindow(message);
    logFailTestcase(temp);
});

Then(`System does not shown the deleted call log on the list`, async () => {
    await PageGlobal.waitForProgressBarLoaded_v2();
    await PageGlobal.reloadTable(3000);

    let callLogRecordAfterAction = await PageGlobal.getNumberOfTotalRecordsSubTab();
    if ((callLogRecordBeforeAction - callLogRecordAfterAction) != 1) {
        logFailTestcase(false, `Delete the call log failed`);
    }
});