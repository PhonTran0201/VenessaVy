import { Then, When } from "@cucumber/cucumber";
import { DataRepo } from "../../../../core/modals/DataRepo";
import { PageFactory } from "../../../../page-objects/PageFactory";
import { addDate, convertPathFileDataToDataRegression, getDate, logFailTestcase } from "../../../../shared/functions";
import { getValueDataOfDataTestExecution, pushObjectToDataArrayWithUniqueKey } from "../../../../storage-data/functions/data-test-execution";

const PageObject = PageFactory.getInstance().createGlobalPageObjectPage();
const PageForm = PageFactory.getInstance().createProgramConfigurationCreatePage();
const PageList = PageFactory.getInstance().createProgramConfigurationListPage();

const loader = require("csv-load-sync");
//#region form step

When(`User presses create button on Program configuration`, async () => {
    let temp = await PageList.clickCreateButton();
    logFailTestcase(temp, 'Click create button on program list fail!');
});

When(`User inputs valid data into program form {string}`, async (dataKey) => {
    await PageObject.closeOpeningForm();
    await PageObject.waitForProgressBarLoaded_v2();
    let  data = (await DataRepo.getInstance().loadData(dataKey))[0];
    const ProgramName = data.ProgramName;
    const StartDateMinusToday = data.StartDateMinusToday;
    const EndDateMinusStartDate = data.EndDateMinusStartDate;
    let StartDate = data.StartDate;
    let EndDate = data.EndDate;
    const NotificationTemplate = data.NotificationTemplate;
    const EmailTemplate = data.EmailTemplate;
    const Description = data.Description;

    await PageList.clickDeleteProgramExistedOnList(ProgramName);
    await PageList.clickCreateButton();

    let temp = true;
    if (StartDateMinusToday || EndDateMinusStartDate) {
        StartDate = getDate(StartDateMinusToday);
        EndDate = addDate(StartDate, EndDateMinusStartDate);
    }
    if (ProgramName) {
        temp = await PageForm.inputName(ProgramName);
        logFailTestcase(temp, `input ProgramName on form failed!`)
    }
    if (StartDate) {
        temp = await PageForm.inputStartDate(StartDate);
        logFailTestcase(temp, `input StartDate on form failed!`)
    }
    if (EndDate) {
        temp = await PageForm.inputEndDate(EndDate);
        logFailTestcase(temp, `input EndDate on form failed!`)
    }
    if (NotificationTemplate) {
        temp = await PageForm.inputNotificationTemplate(NotificationTemplate);
        logFailTestcase(temp, `input NotificationTemplate on form failed!`)
    }
    if (EmailTemplate) {
        temp = await PageForm.inputEmailTemplate(EmailTemplate);
        logFailTestcase(temp, `input EmailTemplate on form failed!`)
    }
    if (Description) {
        temp = await PageForm.inputDescription(Description);
        logFailTestcase(temp, `input Description on form failed!`)
    }

    await PageObject.pressSaveForm();
    logFailTestcase(temp, 'Click save form failed!');

});

Then(`User verifies information is shown correctly on program form {string}`, async (dataKey) => {
    let data = (await DataRepo.getInstance().loadData(dataKey))[0];
    
    const ProgramName = data.ProgramName;
    let StartDate = data.StartDate;
    let EndDate = data.EndDate;
    const NotificationTemplate = data.NotificationTemplate;
    const EmailTemplate = data.EmailTemplate;
    const Description = data.Description;
    const StartDateMinusToday = data.StartDateMinusToday;
    const EndDateMinusStartDate = data.EndDateMinusStartDate;


    if (StartDateMinusToday && EndDateMinusStartDate) {
        StartDate = getDate(StartDateMinusToday);
        EndDate = addDate(StartDate, EndDateMinusStartDate);
    }
    let temp = true;


    if (ProgramName) {
        temp = await PageForm.validateNameValue(ProgramName);
        logFailTestcase(temp, `validate ProgramName Value On Form failed!`);
    }
    if (StartDate) {
        temp = await PageForm.validateStartDateValue(StartDate);
        logFailTestcase(temp, `validate StartDate Value On Form failed!`);
    }
    if (EndDate) {
        temp = await PageForm.validateEndDateValue(EndDate);
        logFailTestcase(temp, `validate EndDate Value On Form failed!`);
    }
    if (NotificationTemplate) {
        temp = await PageForm.validateNotificationTemplateValue(NotificationTemplate);
        logFailTestcase(temp, `validate NotificationTemplate Value On Form failed!`);
    }
    if (EmailTemplate) {
        temp = await PageForm.validateEmailTemplateValue(EmailTemplate);
        logFailTestcase(temp, `validate EmailTemplate Value On Form failed!`);
    }
    if (Description) {
        temp = await PageForm.validateDescriptionValue(Description);
        logFailTestcase(temp, `validate Description Value On Form failed!`);
    }

    await PageObject.closeOpeningForm();

});

//#endregion

//#region List step

Then(`System shows correct information of the program on the list {string}`, async (dataKey) => {
    let data = (await DataRepo.getInstance().loadData(dataKey))[0];
    
    const ProgramName = data.ProgramName;
    const StartDateMinusToday = data.StartDateMinusToday;
    const EndDateMinusStartDate = data.EndDateMinusStartDate;
    let StartDate = data.StartDate;
    let EndDate = data.EndDate;
    const Description = data.Description;

    if (StartDateMinusToday && EndDateMinusStartDate) {
        StartDate = getDate(StartDateMinusToday);
        EndDate = addDate(StartDate, EndDateMinusStartDate);
    }
    let temp = true;

    await PageObject.reloadTable(4000);
    if (ProgramName) {
        temp = await PageList.validateValueOnList(ProgramName, 1);
        logFailTestcase(temp, `validate ProgramName Value On List failed!`);
    }
    if (StartDate) {
        temp = await PageList.validateValueOnList(StartDate, 1);
        logFailTestcase(temp, `validate StartDate Value On List failed!`);
    }
    if (EndDate) {
        temp = await PageList.validateValueOnList(EndDate, 1);
        logFailTestcase(temp, `validate EndDate Value On List failed!`);
    }
    if (Description) {
        temp = await PageList.validateValueOnList(Description, 1);
        logFailTestcase(temp, `validate Description Value On List failed!`);
    }
});


When(`User presses {string} a program on the list`, async (actionButton) => {
    if (actionButton.localeCompare(`edit`) == 0) {
        let temp = await PageList.clickEditButtonByRow(1);
        logFailTestcase(temp, `user clicked edit button on list failed!`)
    } else if (actionButton.localeCompare(`delete`) == 0) {
        pushObjectToDataArrayWithUniqueKey("OriginalTotalRecord", await (await PageObject.getNumberOfTotalRecordsMainTab()).toString());
        let temp = await PageList.clickDeleteButtonByRow(1)
        logFailTestcase(temp, `user clicked delete button on list failed!`)
    } else {
        logFailTestcase(false, `Can not find action button with name '${actionButton}' `)
    }

});

Then(`System does not show the program on the list {string}`, async (dataKey) => {
    let data = (await DataRepo.getInstance().loadData(dataKey))[0];
    
    const ProgramName = data.ProgramName;
    const OriginalTotalRecord = parseInt(getValueDataOfDataTestExecution("OriginalTotalRecord"));
    const actualValue = await PageObject.getNumberOfTotalRecordsMainTab();
    const positionRow = data.PositionRow ? parseInt(data.PositionRow) : 1;

    if (OriginalTotalRecord - actualValue != 1) {
        logFailTestcase(false, `delete program failed!`);
    }
    for (let i = 1; i <= positionRow; i++) {
        if (ProgramName) {
            let temp = await PageList.validateProgrameNameNotShowOnList(ProgramName, i);
            logFailTestcase(!temp, `the program ${ProgramName} still shown on list!`);
        }
    }
});


When("User selects {string} programs need to removes them from the list", async (theNumberOfPrograms: string) => {
    pushObjectToDataArrayWithUniqueKey("OriginalTotalRecord", await (await PageObject.getNumberOfTotalRecordsMainTab()).toString());
    let TheNumberOfPrograms = parseInt(theNumberOfPrograms);
    for (let i = 1; i <= TheNumberOfPrograms; i++) {
        let temp = await PageList.tickProgramCheckboxRemoveByRow(i);
        logFailTestcase(temp, `tick to delete the program at line ${i} failed!`);
    }
});

When("User presses Remove Programs button on Program configuration", async () => {
    let temp = await PageList.clickRemoveProgramsButton();
    logFailTestcase(temp, `click remove programs button on program configuration failed!`);
});

//#endregion