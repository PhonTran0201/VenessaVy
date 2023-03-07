import { Given, Then, When } from "@cucumber/cucumber";
import { loadData } from "pactum/src/exports/stash";
import { LogTimeForm } from "../../../../page-objects/back-office-portal/insurance/claim/claim-details/tabs/claim-time-tracking/LogTimeForm";
import { PageFactory } from "../../../../page-objects/PageFactory";
import { convertPathFileDataToDataRegression, getDate, logFailTestcase } from "../../../../shared/functions";
import { getNumberDecimalSeparator } from "../../../../shared/tenant-setting/tenant-setting";
import { UserProfileInfo } from "../../../../shared/user-profile/UserProfileInfo";
import { getDataTestCaseObjectByNameField } from "../../../../storage-data/functions/data-test-case";
import { getValueDataOfDataTestExecution, pushObjectToDataArrayWithUniqueKey } from "../../../../storage-data/functions/data-test-execution";

let PageList = PageFactory.getInstance().createClaimTimeTrackingPage();
let PageForm = PageFactory.getInstance().createClaimLogTimeForm();
let PageGlobal = PageFactory.getInstance().createGlobalPageObjectPage();
const loader = require("csv-load-sync");
let TotalTimeSpentBeforeTheAction;
let DurationOfTheWorkLogBeforeAction;
let TotalRecordsBeforeAction;

Given("User navigates to Time Tracking tab", async () => {
    let temp = await PageList.navidateToTimeTrackingTab();
    logFailTestcase(temp, "User navigates to Time Tracking tab failed");
});

When("User presses Log time button", async () => {
    await PageGlobal.waitForProgressBarLoaded_v2();
    TotalTimeSpentBeforeTheAction = await PageList.getTotalTimeSpent();
    let temp = await PageList.pressLogTimeButton();
    logFailTestcase(temp, "press Log Time Button failed!");
});

Then("User verifies the required fields at log time form", async () => {
    let temp = await PageForm.validateRequiredField();
    logFailTestcase(temp, `Required field is not working correctly!`);
    await PageGlobal.closeOpeningForm();
});


When(`User input data to log time form {string}`, async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const StartDateMinusToday = row.StartDateMinusToday;
    const Duration = (row.Duration).replace(".", getNumberDecimalSeparator());
    const Type = row.Type;
    const Description = row.Description;

    let temp = true;
    let StartDate;
    if (StartDateMinusToday) {
        StartDate = getDate(StartDateMinusToday);
    }
    temp = await PageForm.inputStartDate(StartDate);
    logFailTestcase(temp, `input Start date failed!`);

    temp = await PageForm.inputDuration(Duration, Type);
    logFailTestcase(temp, `input Duration failed!`);

    temp = await PageForm.inputTypeOfDuration(Type);
    logFailTestcase(temp, `input Type Of Duration failed!`)

    if (Description) {
        temp = await PageForm.inputDescription(Description);
        logFailTestcase(temp, `input Description failed!`);
    }
});

Then(`User verifies information on logtime form is shown correctly {string}`, async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const StartDateMinusToday = row.StartDateMinusToday;
    const Duration = (row.Duration).replace(".", getNumberDecimalSeparator());
    const Type = row.Type;
    const Description = row.Description;

    let temp = true;
    let StartDate;
    if (StartDateMinusToday) {
        StartDate = getDate(StartDateMinusToday);
    }
    temp = await PageForm.validateStartDate(StartDate);
    logFailTestcase(temp, `validate Start date failed!`);

    temp = await PageForm.validateDuration(Duration, Type);
    logFailTestcase(temp, `validate Duration failed!`);

    temp = await PageForm.validateTypeOfDuration(Type, Duration);
    logFailTestcase(temp, `validate Type Of Duration failed!`)

    if (Description) {
        temp = await PageForm.validateDescription(Description);
        logFailTestcase(temp, `validate Description failed!`);
    }

    await PageGlobal.closeOpeningForm();
});

When(`User presses {string} the first work log on the list`, async (action: string) => {
    TotalTimeSpentBeforeTheAction = await PageList.getTotalTimeSpent();
    DurationOfTheWorkLogBeforeAction = await PageList.getDurationByRow(1);
    let temp = true;
    if (action.localeCompare(`edit`) === 0) {
        temp = await PageList.pressEditByRow(1);
        logFailTestcase(temp, `press Edit the first work log on list failed! `)
    } else if (action.localeCompare(`delete`) === 0) {
        TotalRecordsBeforeAction = await PageGlobal.getNumberOfTotalRecordsSubTab();
        temp = await PageList.pressDeleteByRow(1);
        logFailTestcase(temp, `press Edit the first work log on list failed! `)
    } else {
        logFailTestcase(temp, `Can not find action has name '${action}'`)
    }
});
Then(`System shows correct record on Time Tracking list {string}`, async (filename) => {
    await PageGlobal.waitForProgressBarLoaded_v2();
    await PageGlobal.reloadTable(4000);
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const User = UserProfileInfo.getDisplayName()
    const StartDateMinusToday = row.StartDateMinusToday;
    const Duration = (row.Duration).replace(".", getNumberDecimalSeparator());
    const Type = row.Type;
    const Description = row.Description;

    let StartDate;
    if (StartDateMinusToday) {
        StartDate = getDate(StartDateMinusToday);
    }
    const FormatedDuration = await PageList.formatDurationTime(Duration, Type);

    let temp = await PageList.validateUser(User);
    logFailTestcase(temp, `validate User failed!`)

    temp = await PageList.validateDate(StartDate);
    logFailTestcase(temp, `validate Start Date failed!`);

    temp = await PageList.validateDuration(FormatedDuration, 1)
    logFailTestcase(temp, `validate Duration failed!`)

    temp = await PageList.validateDescription(Description || "N/A");
    logFailTestcase(temp, `validate Description failed!`);
});

Then(`System does not show the record on Time Tracking list {string}`, async (filename) => {
    await PageGlobal.waitForProgressBarLoaded_v2();
    await PageGlobal.reloadTable(4000);
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const User = UserProfileInfo.getDisplayName()
    const StartDateMinusToday = row.StartDateMinusToday;
    const Duration = (row.Duration).replace(".", getNumberDecimalSeparator());
    const Type = row.Type;
    const Description = row.Description;

    let StartDate;
    if (StartDateMinusToday) {
        StartDate = getDate(StartDateMinusToday);
    }
    const FormatedDuration = await PageList.formatDurationTime(Duration, Type);

    let actualTotalRecord = await PageGlobal.getNumberOfTotalRecordsSubTab();

    logFailTestcase(TotalRecordsBeforeAction - actualTotalRecord == 1, 'Delete the work log failed!');

    if ((await PageList.validateUser(User))
        && (await PageList.validateDate(StartDate))
        && (await PageList.validateDuration(FormatedDuration, 1))
        && (await PageList.validateDescription(Description || "N/A"))
    ) {
        logFailTestcase(false, 'the work log still shown on the list!');
    }
});
Then(`User verifies the Total time spent on the left side after {string} {string}`, async (action: string, filename) => {
    //precondition step: "User presses Log time button" or "User presses {string} the first work log on the list"
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const Duration = (row.Duration).replace(".", getNumberDecimalSeparator());
    const Type = row.Type;
    const FormatedDuration = await PageList.formatDurationTime(Duration, Type);
    let TotalTimeSpentExpectedMinutes;

    if (action.localeCompare(`creating`) === 0) {
        TotalTimeSpentExpectedMinutes = await PageList.convertDurationTimeToTotalMinutes(TotalTimeSpentBeforeTheAction) + await PageList.convertDurationTimeToTotalMinutes(FormatedDuration);
    } else if (action.localeCompare(`editting`) === 0) {
        TotalTimeSpentExpectedMinutes = await PageList.convertDurationTimeToTotalMinutes(TotalTimeSpentBeforeTheAction) - await PageList.convertDurationTimeToTotalMinutes(DurationOfTheWorkLogBeforeAction) + await PageList.convertDurationTimeToTotalMinutes(FormatedDuration);
    } else if (action.localeCompare(`deleting`) === 0) {
        TotalTimeSpentExpectedMinutes = await PageList.convertDurationTimeToTotalMinutes(TotalTimeSpentBeforeTheAction) - await PageList.convertDurationTimeToTotalMinutes(DurationOfTheWorkLogBeforeAction)
    }else{
        logFailTestcase(false, `Incorrect action '${action}'!`);
    }

    let FormatedTotalTimeSpentExpected = await PageList.formatDurationTime(TotalTimeSpentExpectedMinutes.toString());
    let temp = await PageList.validateTotalTimeSpentOnLeftSide(FormatedTotalTimeSpentExpected);
    logFailTestcase(temp, "validate Total Time Spent On Left Side failed!");

});


