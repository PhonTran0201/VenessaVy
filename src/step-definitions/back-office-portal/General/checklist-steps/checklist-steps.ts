import { Before, Given, Then, When } from "@cucumber/cucumber";
import { filename } from "winston-daily-rotate-file";
import { DataRepo } from "../../../../core/modals/data_repo";
import { ChecklistsItems } from "../../../../page-objects/back-office-portal/general/checklists/checklist-detail/ChecklistItems";
import { ChecklistsBasicInformation } from "../../../../page-objects/back-office-portal/general/checklists/checklist-detail/ChecklistsBasicInformation";
import { ChecklistsForm } from "../../../../page-objects/back-office-portal/general/checklists/checklists-form/ChecklistsForm";
import { ChecklistsList } from "../../../../page-objects/back-office-portal/general/checklists/checklists-list/ChecklistsList";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { GlobalPeripherals } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPeripherals";
import { convertPathFileDataToDataRegression, getCurrentDateTime, getDate, logFailTestcase, logSuccessMessage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { UserProfileInfo } from "../../../../shared/user-profile/UserProfileInfo";
import { pushObjectToDataArrayWithUniqueKey } from "../../../../storage-data/functions/data-test-execution";

const loader = require("csv-load-sync");
let checklistsList: ChecklistsList;
let checklistsForm: ChecklistsForm;
let checklistsBasicInformation: ChecklistsBasicInformation;
let checklistsItems: ChecklistsItems;
let globalPageObject: GlobalPageObject;
let globalPeripherals: GlobalPeripherals;

Before(async function () {
    const context: ICommonContext = this.context;
    globalPageObject = new GlobalPageObject(context.driverService);
    globalPeripherals = new GlobalPeripherals(context.driverService);
    checklistsList = new ChecklistsList(context.driverService);
    checklistsForm = new ChecklistsForm(context.driverService);
    checklistsBasicInformation = new ChecklistsBasicInformation(context.driverService);
    checklistsItems = new ChecklistsItems(context.driverService);
});
//#region  checklists form
When("User inputs valid data into Checklist form {string}", async (filename) => {
    let row: any;
    if (filename.includes(".csv")) {
        row = loader(convertPathFileDataToDataRegression(filename))[0];
    } else {
        row = await DataRepo.getInstance().getFieldValue(filename);
    }

    const Organization = UserProfileInfo.getOrganization();
    const Name = row.Name;
    const Status = row.Status;
    const DeadlineMinusToday = row.DeadlineMinusToday;
    const TargetGroup = row.TargetGroup;
    const Product = row.Product;
    const EmailTemplate = row.EmailTemplate;
    const NotificationTemplate = row.NotificationTemplate;
    const Description = row.Description;
    const RequiredField = row.RequiredField;
    let RequiredFieldArray;
    if (RequiredField) {
        RequiredFieldArray = RequiredField.split(";");
    }

    let temp = true;
    let Deadline = "";
    if (DeadlineMinusToday) {
        Deadline = getDate(DeadlineMinusToday);
    }
    if (RequiredField) {
        //validate required field on checklist form

        await globalPageObject.pressSaveForm();
        for (let i = 0; i < RequiredFieldArray.length; i++) {
            temp = await checklistsForm.validateRequiredField(RequiredFieldArray[i]);
            logFailTestcase(temp, `The '${RequiredFieldArray[i]}' field is not required!`);
        }
    }

    temp = await checklistsForm.validateStatusValue(Status);
    logFailTestcase(temp, "validate Status Value On Checklists Form failed!");
    // if (Organization) {
    //     temp = await checklistsForm.inputOrganization(Organization);
    //     logFailTestcase(temp, 'input Organization on checklist form failed!');
    // }
    if (Name) {
        temp = await checklistsForm.inputName(Name);
        logFailTestcase(temp, 'input Name on checklist form failed!');
    }
    if (Deadline) {
        temp = await checklistsForm.inputDeadline(Deadline);
        logFailTestcase(temp, 'input Deadline on checklist form failed!');
    }
    if (TargetGroup) {
        temp = await checklistsForm.inputTargetGroup(TargetGroup);
        logFailTestcase(temp, 'input TargetGroup on checklist form failed!');
    }
    if (Product) {
        temp = await checklistsForm.inputProduct(Product);
        logFailTestcase(temp, 'input Product on checklist form failed!');
    }
    if (EmailTemplate) {
        temp = await checklistsForm.inputEmailTemplate(EmailTemplate);
        logFailTestcase(temp, 'input EmailTemplate on checklist form failed!');
    }
    if (NotificationTemplate) {
        temp = await checklistsForm.inputNotificationTemplate(NotificationTemplate);
        logFailTestcase(temp, 'input NotificationTemplate on checklist form failed!');
    }
    if (Description) {
        temp = await checklistsForm.inputDescription(Description);
        logFailTestcase(temp, 'input Description on checklist form failed!');
    }

});

Then(`User verifies the checklists information on Checklists form {string}`, async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const Organization = UserProfileInfo.getOrganization();
    const Name = row.Name;
    const Status = row.Status;
    const DeadlineMinusToday = row.DeadlineMinusToday;
    const TargetGroup = row.TargetGroup;
    const Product = row.Product;
    const EmailTemplate = row.EmailTemplate;
    const NotificationTemplate = row.NotificationTemplate;
    const Description = row.Description;


    let temp = true;
    let Deadline = "";
    if (DeadlineMinusToday) {
        Deadline = getDate(DeadlineMinusToday);
    }
    //validate required field on checklist form


    temp = await checklistsForm.validateStatusValue(Status);
    logFailTestcase(temp, "validate Status Value On Checklists Form failed!");
    // if (Organization) {
    //     temp = await checklistsForm.validateOrganizationValue(Organization);
    //     logFailTestcase(temp, 'validate Organization Value On Checklists Form failed!');
    // }
    if (Name) {
        temp = await checklistsForm.validateNameValue(Name);
        logFailTestcase(temp, 'validate Name Value On Checklists Form failed!');
    }
    if (Deadline) {
        temp = await checklistsForm.validateDeadlineValue(Deadline);
        logFailTestcase(temp, 'validate Deadline Value On Checklists Form failed!');
    }
    if (TargetGroup) {
        temp = await checklistsForm.validateTargetGroupValue(TargetGroup);
        logFailTestcase(temp, 'validate TargetGroup Value On Checklists Form failed!');
    }
    if (Product) {
        temp = await checklistsForm.validateProductValue(Product);
        logFailTestcase(temp, 'validate Product Value On Checklists Form failed!');
    }
    if (EmailTemplate) {
        temp = await checklistsForm.validateEmailTemplateValue(EmailTemplate);
        logFailTestcase(temp, 'validate EmailTemplate Value On Checklists Form failed!');
    }
    if (NotificationTemplate) {
        temp = await checklistsForm.validateNotificationTemplateValue(NotificationTemplate);
        logFailTestcase(temp, 'validate NotificationTemplate Value On Checklists Form failed!');
    }
    if (Description) {
        temp = await checklistsForm.validateDescriptionValue(Description);
        logFailTestcase(temp, 'validate Description Value On Checklists Form failed!');
    }
});

//#endregion

//#region Checklists List
Given("User navigates to Checklists list", async () => {
    let temp = await globalPageObject.navigateToMainCheckLists();
    logFailTestcase(temp, "navigates to Checklists list failed!");
});

Given(`User opens the first checklist on Checklists list`, async () => {
    let temp = await checklistsList.openChecklistDetailByRow(1);
    logFailTestcase(temp, `open Checklist Detail By Row failed!`);
});
When("User presses Create button to create a new checklist", async () => {
    let temp = await checklistsList.clickCreateButton();
    logFailTestcase(temp, 'click Create Button on checklist list failed!');
});
let OriginalTotalChecklists;
When(`User {string} the checklist on Checklists list from csv file {string}`, async (action, filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const Name = row.Name;
    let temp = true;
    if (action.localeCompare(`clone`) === 0) {
        temp = await checklistsList.pressCloneChecklistButtonByName(Name);
        logFailTestcase(temp, `press Clone Checklist Button By '${Name}' Name failed!`);
    }
    else if (action.localeCompare(`edit`) === 0) {
        temp = await checklistsList.pressEditChecklistButtonByName(Name);
        logFailTestcase(temp, `press edit Checklist Button By '${Name}' Name failed!`);
    }
    else if (action.localeCompare(`delete`) === 0) {
        OriginalTotalChecklists = await globalPageObject.getNumberOfTotalRecordsMainTab();
        temp = await checklistsList.pressDeleteChecklistButtonByName(Name);
        logFailTestcase(temp, `press Delete Checklist Button By '${Name}' Name failed!`);
    }
    else if (action.localeCompare(`send`) === 0) {
        temp = await checklistsList.pressSendChecklistButtonByName(Name);
        logFailTestcase(temp, `press Send Checklist Button By '${Name}' Name failed!`);
    }
    else if (action.localeCompare(`open`) === 0) {
        temp = await checklistsList.openChecklistDetailByName(Name);
        logFailTestcase(temp, `open Checklist Detail By Name '${Name}' failed!`);
    }
    else {
        logFailTestcase(false, `Can not find the action name '${action}'`);
    }
});

When(`User sorts down created date column on Checklists list`, async () => {
    let temp = await checklistsList.sortDownCreateDateColumn()
    logFailTestcase(temp, 'sort Down Create Date Column failed!');
});


Then("System shows correct information on Checklists list {string}", async (filename) => {
    await globalPageObject.waitForProgressBarLoaded_v2(2000);
    await globalPageObject.reloadTable(3000);
    let row: any;
    if (filename.includes(".csv")) {
        row = loader(convertPathFileDataToDataRegression(filename))[0];
    } else {
        row = await DataRepo.getInstance().getFieldValue(filename);
    }
    const Name = row.Name;
    const Status = row.Status;
    const DeadlineMinusToday = row.DeadlineMinusToday;
    const TargetGroup = row.TargetGroup;
    const Product = row.Product;

    const DisplayEditButton = row.DisplayEditButton;
    const DisplayDeleteButton = row.DisplayDeleteButton;
    const DisplayCloneButton = row.DisplayCloneButton;
    const DisplaySendButton = row.DisplaySendButton;

    let temp = true;
    let Deadline = row.Deadline;
    let CreatedDate = getCurrentDateTime();
    if (DeadlineMinusToday) {
        Deadline = getDate(DeadlineMinusToday);
    }
    //#region Validate action buttons
    //EDIT BUTTON
    if (DisplayEditButton.localeCompare("Yes") === 0) {
        temp = await checklistsList.validateEditButtonIsEnabled(1);
        logFailTestcase(temp, 'validate Edit Button Is Enabled failed!');
    } else {
        temp = await checklistsList.validateEditButtonIsEnabled(1);
        logFailTestcase(!temp, 'validate Edit Button Is Disabled failed!');
    }
    //DELETE BUTTON
    if (DisplayDeleteButton.localeCompare("Yes") === 0) {
        temp = await checklistsList.validateDeleteButtonIsEnabled(1);
        logFailTestcase(temp, 'validate Delete Button Is Enabled failed!');
    } else {
        temp = await checklistsList.validateDeleteButtonIsEnabled(1);
        logFailTestcase(!temp, 'validate Delete Button Is Disabled failed!');
    }
    //SEND BUTTON
    if (DisplaySendButton.localeCompare("Yes") === 0) {
        temp = await checklistsList.validateSendButtonIsEnabled(1);
        logFailTestcase(temp, 'validate Send Button Is Enabled failed!');
    } else {
        temp = await checklistsList.validateSendButtonIsEnabled(1);
        logFailTestcase(!temp, 'validate Send Button Is Disabled failed!');
    }
    //CLONE BUTTON
    if (DisplayCloneButton.localeCompare("Yes") === 0) {
        temp = await checklistsList.validateCloneButtonIsEnabled(1);
        logFailTestcase(temp, 'validate Clone Button Is Enabled failed!');
    } else {
        temp = await checklistsList.validateCloneButtonIsEnabled(1);
        logFailTestcase(!temp, 'validate Clone Button Is Disabled failed!');
    }

    //#endregion

    //#region validate value on list
    if (Name) {
        temp = await checklistsList.validateNameValueOnList(Name);
        logFailTestcase(temp, 'validate Name Value On List failed!');
    }
    if (Status) {
        temp = await checklistsList.validateStatusValueOnList(Status);
        logFailTestcase(temp, 'validate Status Value On List failed!');
    }
    if (Deadline) {
        temp = await checklistsList.validateDeadlineValueOnList(Deadline);
        logFailTestcase(temp, 'validate Deadline Value On List failed!');
    }
    if (TargetGroup) {
        temp = await checklistsList.validateTargetGroupValueOnList(TargetGroup);
        logFailTestcase(temp, 'validate TargetGroup Value On List failed!');
    }
    if (Product) {
        temp = await checklistsList.validateProductValueOnList(Product);
        logFailTestcase(temp, 'validate Product Value On List failed!');
    }
    if (CreatedDate) {
        temp = await checklistsList.validateCreatedDateValueOnList(CreatedDate);
        logFailTestcase(temp, 'validate CreatedDate Value On List failed!');
    }

    //#endregion
});

Then(`System does not show the checklist on Checklists list {string}`, async (filename) => {
    await globalPageObject.reloadTable(5000);
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const Name = row.Name;

    let temp = true;
    let ActualTotalChecklists = await globalPageObject.getNumberOfTotalRecordsMainTab();
    if (OriginalTotalChecklistsItems - ActualTotalChecklists != 1) {
        logFailTestcase(temp, 'Delete checklist on checklist list failed!');
    }
    if (Name) {
        temp = await checklistsList.validateNameValueOnList(Name);
        logFailTestcase(!temp, 'checklist that has been deleted still shows on the list')
    }
});

//#endregion

//#region Basicinformation details page 

Then(`System shows correct information on Checklists detail page {string}`, async (filename) => {
    await globalPageObject.waitForProgressBarLoaded_v2(3000);
    await globalPageObject.waitForProgressBarLoaded_v2();
    let row;
    if (filename.includes(".csv")) {
        row = loader(convertPathFileDataToDataRegression(filename))[0];
    } else {
        row = await DataRepo.getInstance().getFieldValue(filename);
    }

    const Name = row.Name;
    const Status = row.Status;
    const DeadlineMinusToday = row.DeadlineMinusToday;
    const TargetGroup = row.TargetGroup;
    const Product = row.Product;
    const EmailTemplate = row.EmailTemplate;
    const NotificationTemplate = row.NotificationTemplate;
    const Description = row.Description;

    let temp = true;
    let Deadline = "";
    if (DeadlineMinusToday) {
        Deadline = getDate(DeadlineMinusToday);
    }

    if (await checklistsList.validatePageTitleCheckListExist()) {
        temp = await checklistsList.openChecklistDetailByName(Name);
        logFailTestcase(temp, "open Checklist Detail By Name failed!");
        await globalPageObject.waitForProgressBarLoaded_v2();
    }
    // if (Organization) {
    //     temp = await checklistsBasicInformation.validateOrganizationValue(Organization);
    //     logFailTestcase(temp, "validate Organization Value failed!");
    // }
    if (Name) {
        temp = await checklistsBasicInformation.validateNameValue(Name);
        logFailTestcase(temp, "validate Name Value failed!");
    }
    if (Status) {
        temp = await checklistsBasicInformation.validateStatusValue(Status);
        logFailTestcase(temp, "validate Status Value failed!");
    }
    if (Deadline) {
        temp = await checklistsBasicInformation.validateDeadlineValue(Deadline);
        logFailTestcase(temp, "validate Deadline Value failed!");
    }
    if (TargetGroup) {
        temp = await checklistsBasicInformation.validateTargetGroupValue(TargetGroup);
        logFailTestcase(temp, "validate TargetGroup Value failed!");
    }
    if (Product) {
        temp = await checklistsBasicInformation.validateProductValue(Product);
        logFailTestcase(temp, "validate Product Value failed!");
    }
    if (EmailTemplate) {
        temp = await checklistsBasicInformation.validateEmailTemplateValue(EmailTemplate);
        logFailTestcase(temp, "validate EmailTemplate Value failed!");
    }
    if (NotificationTemplate) {
        temp = await checklistsBasicInformation.validateNotificationTemplateValue(NotificationTemplate);
        logFailTestcase(temp, "validate NotificationTemplate Value failed!");
    }
    if (Description) {
        temp = await checklistsBasicInformation.validateDescriptionValue(Description);
        logFailTestcase(temp, "validate Description Value failed!");
    }

});

When(`User inputs valid data into basic informations of the checklists detail page {string}`, async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const Organization = UserProfileInfo.getOrganization();
    const Name = row.Name;
    const DeadlineMinusToday = row.DeadlineMinusToday;
    const TargetGroup = row.TargetGroup;
    const Product = row.Product;
    const EmailTemplate = row.EmailTemplate;
    const NotificationTemplate = row.NotificationTemplate;
    const Description = row.Description;

    let temp = true;
    let Deadline = "";
    if (DeadlineMinusToday) {
        Deadline = getDate(DeadlineMinusToday);
    }

    if (Name) {
        temp = await checklistsBasicInformation.inputName(Name);
        logFailTestcase(temp, 'input Name on basic information detail page failed!');
    }
    if (Deadline) {
        temp = await checklistsBasicInformation.inputDeadline(Deadline);
        logFailTestcase(temp, 'input Deadline on basic information detail page failed!');
    }
    if (TargetGroup) {
        temp = await checklistsBasicInformation.inputTargetGroup(TargetGroup);
        logFailTestcase(temp, 'input TargetGroup on basic information detail page failed!');
    }
    if (Product) {
        temp = await checklistsBasicInformation.inputProduct(Product);
        logFailTestcase(temp, 'input Product on basic information detail page failed!');
    }
    if (EmailTemplate) {
        temp = await checklistsBasicInformation.inputEmailTemplate(EmailTemplate);
        logFailTestcase(temp, 'input EmailTemplate on basic information detail page failed!');
    }
    if (NotificationTemplate) {
        temp = await checklistsBasicInformation.inputNotificationTemplate(NotificationTemplate);
        logFailTestcase(temp, 'input NotificationTemplate on basic information detail page failed!');
    }
    if (Description) {
        temp = await checklistsBasicInformation.inputDescription(Description);
        logFailTestcase(temp, 'input Description on basic information detail page failed!');
    }
});

Then("System shows correct information on Checklists detail page with disabled fields {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const Organization = UserProfileInfo.getOrganization();
    const Name = row.Name;
    const DeadlineMinusToday = row.DeadlineMinusToday;
    const Status = row.Status;
    const TargetGroup = row.TargetGroup;
    const Product = row.Product;
    const EmailTemplate = row.EmailTemplate;
    const NotificationTemplate = row.NotificationTemplate;
    const Description = row.Description;

    let temp = true;
    let Deadline = "";
    if (DeadlineMinusToday) {
        Deadline = getDate(DeadlineMinusToday);
    }

    await globalPageObject.waitForProgressBarLoaded_v2();
    await globalPageObject.waitForProgressBarLoaded_v2();
    await globalPageObject.waitForProgressBarLoaded_v2();

    // temp = await globalPageObject.checkToastSuccessExistWithMessage("System has been completed successfully!.");
    // logFailTestcase(temp, "Message 'System has been completed successfully!' is not shows!");

    // if (Organization) {
    //     temp = await checklistsBasicInformation.validateOrganizationValue(Organization);
    //     logFailTestcase(temp, "validate Organization Value failed!");
    // }
    if (Name) {
        temp = await checklistsBasicInformation.validateNameValue(Name, true);
        logFailTestcase(temp, "validate Name Value failed!");
    }
    if (Status) {
        temp = await checklistsBasicInformation.validateStatusValue(Status);
        logFailTestcase(temp, "validate Status Value failed!");
    }
    if (Deadline) {
        temp = await checklistsBasicInformation.validateDeadlineValue(Deadline, true);
        logFailTestcase(temp, "validate Deadline Value failed!");
    }
    if (TargetGroup) {
        temp = await checklistsBasicInformation.validateTargetGroupValue(TargetGroup, true);
        logFailTestcase(temp, "validate TargetGroup Value failed!");
    }
    if (Product) {
        temp = await checklistsBasicInformation.validateProductValue(Product, true);
        logFailTestcase(temp, "validate Product Value failed!");
    }
    if (EmailTemplate) {
        temp = await checklistsBasicInformation.validateEmailTemplateValue(EmailTemplate, true);
        logFailTestcase(temp, "validate EmailTemplate Value failed!");
    }
    if (NotificationTemplate) {
        temp = await checklistsBasicInformation.validateNotificationTemplateValue(NotificationTemplate, true);
        logFailTestcase(temp, "validate NotificationTemplate Value failed!");
    }
    if (Description) {
        temp = await checklistsBasicInformation.validateDescriptionValue(Description, true);
        logFailTestcase(temp, "validate Description Value failed!");
    }

    temp = await checklistsBasicInformation.validateSaveButtonDisabled();
    logFailTestcase(temp, 'Validate Save button is disabled failed! ')

    temp = await checklistsBasicInformation.validateCompletedButtonIsDisappear();
    logFailTestcase(temp, 'validate Completed button is disappear')

    temp = await checklistsItems.validateEditActionButtonIsEnabledByRow(1);
    logFailTestcase(!temp, 'Validate Edit Action Button Is Disappear failed!');

    temp = await checklistsItems.validateDeleteActionButtonIsEnabledByRow(1);
    logFailTestcase(!temp, 'Validate Delete Action Button Is Disappear failed!');

});
//#endregion


//#region checklist items steps
When("User presses Create button to create a new checklist item", async () => {
    let temp = await checklistsItems.pressCreateButton();
    logFailTestcase(temp, "press create new checklists item  button failed!");
});

let OriginalTotalChecklistsItems;
When(`User presses {string} the checklist item on the list {string}`, async (action, filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const ItemName = row.ItemName;
    let temp = true;
    if (action.localeCompare(`edit`) === 0) {
        temp = await checklistsItems.pressEditActionButtonByName(ItemName);
        logFailTestcase(temp, 'press Edit Action Button on checklist item list failed!');
    }
    else if (action.localeCompare(`delete`) === 0) {
        OriginalTotalChecklistsItems = await globalPageObject.getNumberOfTotalRecordsMainTab();
        temp = await checklistsItems.pressDeleteActionButtonByName(ItemName);
        logFailTestcase(temp, 'press Delete Action Button on checklist item list failed!');
    }

});


When(`User inputs valid data into Checklist item form {string}`, async (filename) => {
    let row;
    if (filename.includes(".csv")) {
        row = loader(convertPathFileDataToDataRegression(filename))[0];
    }
    else {
        let data = await DataRepo.getInstance().getFieldValue(filename);
        row = data.ChecklistItem[0];
    }
    const ItemName = row.ItemName;
    const ItemDescription = row.ItemDescription;
    let temp = true;

    if (ItemName) {
        temp = await checklistsItems.inputNameOnChecklist(ItemName);
        logFailTestcase(temp, "input name on checklist items failed!");
    }
    if (ItemDescription) {
        temp = await checklistsItems.inputDescriptionOnChecklist(ItemDescription);
        logFailTestcase(temp, 'input description on checklist items failed!')
    }
});

When(`User adds new checklist items form file {string}`, async (filename) => {
    let rows;
    if (filename.includes(".csv")) {
        rows = loader(convertPathFileDataToDataRegression(filename))[0];
    }
    else {
        let data = await DataRepo.getInstance().getFieldValue(filename);
        rows = data.ChecklistItem;
    }
    for (let i = 0; i < rows.length; i++) {
        const ItemName = rows[i].ItemName;
        const ItemDescription = rows[i].ItemDescription;
        let temp = true;
        await globalPeripherals.pressTabCurrentElement();
        temp = await globalPageObject.pressCreateTab();
        logFailTestcase(temp, "press create new checklists item  button failed!");

        if (ItemName) {
            temp = await checklistsItems.inputNameOnChecklist(ItemName);
            logFailTestcase(temp, "input name on checklist items failed!");
        }
        if (ItemDescription) {
            temp = await checklistsItems.inputDescriptionOnChecklist(ItemDescription);
            logFailTestcase(temp, 'input description on checklist items failed!')
        }

        temp = await globalPageObject.pressSaveForm();
        logFailTestcase(temp, 'Press Save form failed!');
        await globalPageObject.waitForProgressBarLoaded_v2();
    }
    await globalPageObject.closeAllToastSuccess();
});

Then(`System shows the new Checklist item on the list {string}`, async (filename) => {
    await globalPageObject.reloadTable(3000);
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const ItemName = row.ItemName;
    const ItemDescription = row.ItemDescription;
    let temp = true;
    temp = await checklistsItems.validateEditActionButtonIsEnabledByRow(1);
    logFailTestcase(temp, 'validate Edit Action Button Is Enabled failed!');

    temp = await checklistsItems.validateDeleteActionButtonIsEnabledByRow(1);
    logFailTestcase(temp, 'validate Delete Action Button Is Enabled failed!');

    if (ItemName) {
        temp = await checklistsItems.validateNameItemsValueByRow(ItemName);
        logFailTestcase(temp, 'validate Name Items Value By Row failed!');
    }
    if (ItemDescription) {
        temp = await checklistsItems.validateDescriptionItemsValueByRow(ItemDescription);
        logFailTestcase(temp, 'validate Description Items Value By Row failed!');
    }
});

Then(`System does not show the Checklist item on the list {string}`, async (filename) => {
    await globalPageObject.reloadTable(3000);
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const ItemName = row.ItemName;
    let temp = true;
    let actualTotalChecklistItem = await globalPageObject.getNumberOfTotalRecordsMainTab();
    if (OriginalTotalChecklistsItems - actualTotalChecklistItem != 1) {
        logFailTestcase(temp, 'delete checklist item failed!');
    }
    if (ItemName) {
        temp = await checklistsItems.validateNameItemsValueByRow(ItemName, 1);
        logFailTestcase(!temp, 'Name Items still show on the list!');
    }
});

//#endregion

When(`User stores the first checklist to DataTestExecution`, async () => {
    pushObjectToDataArrayWithUniqueKey("ChecklistName", await checklistsList.getNameValueOnList(1));
    pushObjectToDataArrayWithUniqueKey("ChecklistDeadline", await checklistsList.getDeadlineValueOnList(1));

});