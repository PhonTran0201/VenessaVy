import { Before, Given, Then, When } from "@cucumber/cucumber";
import { fail } from 'assert';
import { DataRepo } from "../../../../core/modals/DataRepo";
import { AccountTabCaseList } from "../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-case/AccountTabCaseList";
import { AccountList } from "../../../../page-objects/back-office-portal/general/account/account-list/AccountList";
import { CaseDetailsInfoDetailAttachments } from "../../../../page-objects/back-office-portal/general/case/case-details/info-detail/attachments/CaseDetailsInfoDetailAttachments";
import { CaseDetailsInfoDetailNotes } from "../../../../page-objects/back-office-portal/general/case/case-details/info-detail/notes/CaseDetailsInfoDetailNotes";
import { CaseDetailsInfoDetailTask } from "../../../../page-objects/back-office-portal/general/case/case-details/info-detail/task/CaseDetailsInfoDetailTask";
import { CaseDetailsInfoDetailWorkflow } from "../../../../page-objects/back-office-portal/general/case/case-details/info-detail/workflow/CaseDetailsInfoDetailWorkflow";
import { CaseDetailsLeftSide } from "../../../../page-objects/back-office-portal/general/case/case-details/left-side/CaseDetailsLeftSide";
import { CaseForm } from "../../../../page-objects/back-office-portal/general/case/case-form/CaseForm";
import { CaseList } from "../../../../page-objects/back-office-portal/general/case/case-list/CaseList";
import { GlobalBrowserWindowHandle } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalBrowserWindowHandle";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { GlobalPagination } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPagination";
import { ValidateField } from "../../../../shared/classes";
import { convertPathFileDataToDataRegression, getCurrentDateTime, logFailMessage, logFailTestcase, logInfoMessage, logSuccessMessage, logWarningMessage, waitUntilHorizontalProgressBarLoaded } from '../../../../shared/functions';
import { ICommonContext } from "../../../../shared/interfaces";
import { dataTestcase } from "../../../../shared/variables";
import { getValueDataOfDataTestExecution } from "../../../../storage-data/functions/data-test-execution";

const loader = require("csv-load-sync");
let caseList: CaseList;
let caseForm: CaseForm;
let globalPagination: GlobalPagination;
let globalPageObject: GlobalPageObject;
let globalBrowserWindowHandle: GlobalBrowserWindowHandle;

let caseDetailsLeftSide: CaseDetailsLeftSide;
let accountList: AccountList;
let caseDetailsInfoDetailNotes: CaseDetailsInfoDetailNotes;
let caseDetailsInfoDetailAttachments: CaseDetailsInfoDetailAttachments;
let caseDetailsInfoDetailTask: CaseDetailsInfoDetailTask;
let accountTabCaseList: AccountTabCaseList;
let caseDetailsInfoDetailWorkflow: CaseDetailsInfoDetailWorkflow

let fileDataName: string = "";

Before(async function () {
  const context: ICommonContext = this.context;
  caseList = new CaseList(context.driverService);
  caseForm = new CaseForm(context.driverService);
  globalPagination = new GlobalPagination(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
  globalBrowserWindowHandle = new GlobalBrowserWindowHandle(context.driverService);

  caseDetailsInfoDetailWorkflow = new CaseDetailsInfoDetailWorkflow(context.driverService);
  caseDetailsLeftSide = new CaseDetailsLeftSide(context.driverService);
  accountList = new AccountList(context.driverService);
  caseDetailsInfoDetailNotes = new CaseDetailsInfoDetailNotes(context.driverService);
  caseDetailsInfoDetailAttachments = new CaseDetailsInfoDetailAttachments(context.driverService);
  caseDetailsInfoDetailTask = new CaseDetailsInfoDetailTask(context.driverService);
  accountTabCaseList = new AccountTabCaseList(context.driverService);
});

Given("User navigates to Case list", async () => {
  let temp = await globalPageObject.navigateToMainCaseManagementList();
  logFailTestcase(temp, "Navigates to Case management list failed!");
  await globalPageObject.waitForProgressBarLoaded_v2;
});

When("User inputs valid case management data from csv file {string}", async (filename) => {
  let rows
  if (filename.includes(".csv")) {
    rows = loader(convertPathFileDataToDataRegression(filename));
  } else {
    rows = await DataRepo.getInstance().loadData(filename);
  }
  fileDataName = filename;

  while (dataTestcase.length > 0) {//Set dataTestcase to empty array
    dataTestcase.pop();
  }
  for (let i = 0; i < rows.length; i++) {
    let temp = await caseList.pressCreate();
    logFailTestcase(temp, "Can't open case form!");
    await globalPageObject.waitForProgressBarLoaded_v2();

    const CaseTitle = rows[i].CaseTitle;
    const CaseType = rows[i].CaseType;
    const Workflow = rows[i].Workflow;
    const SelectEntityType = rows[i].SelectEntityType;
    const SearchEntity = rows[i].SearchEntity;
    const Description = rows[i].Description;
    const DueDate = rows[i].DueDate;
    const Queue = rows[i].Queue;
    const Priority = rows[i].Priority;

    const AssignedTo = rows[i].AssignedTo || rows[i].Assignedto;
    let validationField = new ValidateField(CaseTitle, i, true, [], []);


    if (CaseTitle) {
      temp = await caseForm.inputCaseTitleOnCaseForm(CaseTitle);
      logFailTestcase(temp, "Input case title On case form failed!");
    }
    if (Workflow) {
      temp = await caseForm.inputWorkFlowOnCaseForm(Workflow);
      logFailTestcase(temp, "Input workflow on case form failed!");
    }
    if (CaseType) {
      temp = await caseForm.inputCaseTypeOnCaseForm(CaseType);
      logFailTestcase(temp, "Input case type on case form failed!");
    }
    if (SelectEntityType) {
      temp = await caseForm.inputSelectEntityTypeOnCaseForm(SelectEntityType);
      logFailTestcase(temp, "Input select entity type on case form failed!");
      if (SearchEntity) {
        temp = await caseForm.inputSearchEntityOnCaseForm(SearchEntity);
        logFailTestcase(temp, "Input search entity on case form failed!");
      }
    }

    if (Description) {
      temp = await caseForm.inputDescriptionOnCaseForm(Description);
      logFailTestcase(temp, "Input description on case form failed!");
    }
    if (DueDate) {
      temp = await caseForm.inputDueDateOnCaseForm(DueDate);
      logFailTestcase(temp, "Input due date on case form failed!");
    }
    if (Queue) {
      temp = await caseForm.inputQueueOnCaseForm(Queue);
      logFailTestcase(temp, "Input queue On case form failed!");
      if (AssignedTo) {
        temp = await caseForm.inputAssignedToOnCaseForm(AssignedTo);
        logFailTestcase(temp, "Input Assigned to case form failed!");
      }
    }
    if (Priority) {
      temp = await caseForm.inputPriorityOnCaseForm(Priority);
      logFailTestcase(temp, "Input priority on case form failed!");
    }

    if (DueDate) {
      //validate Due Date
      temp = await caseForm.validateDueDateValueOnCaseForm(DueDate);
      logFailTestcase(temp, "Due date shows incorrectly !");
    }

    temp = await globalPageObject.pressSaveForm();
    logFailTestcase(temp, "Can't press save case form!");
    validationField = await (await caseForm.validateFields(validationField));
    if (validationField.status === false) {
      await globalPageObject.pressCancelForm();
    }
    else {
      await globalPageObject.waitForProgressBarLoaded_v2();
    }
    dataTestcase.push(validationField);
  }
});
When("User creates invalid case management data from csv file {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  fileDataName = filename;

  for (let i = 0; i < rows.length; i++) {
    let temp = await caseList.pressCreate();
    logFailTestcase(temp, "Can't open case form!");
    await globalPageObject.waitForProgressBarLoaded_v2();

    const CaseTitle = rows[i].CaseTitle;
    const Workflow = rows[i].Workflow;
    const CaseType = rows[i].CaseType;
    const SelectEntityType = rows[i].SelectEntityType;
    const SearchEntity = rows[i].SearchEntity;
    const Description = rows[i].Description;
    const DueDate = rows[i].DueDate;
    const Queue = rows[i].Queue;
    const Priority = rows[i].Priority;

    const AssignedTo = rows[i].AssignedTo;

    if (CaseTitle) {
      temp = await caseForm.inputCaseTitleOnCaseForm(CaseTitle);
      logFailTestcase(temp, "Input case title On case form failed!");
    }
    if (Workflow) {
      temp = await caseForm.inputWorkFlowOnCaseForm(Workflow);
      logFailTestcase(temp, "Input workflow on case form failed!");
    }
    if (CaseType) {
      temp = await caseForm.inputCaseTypeOnCaseForm(CaseType);
      logFailTestcase(temp, "Input case type on case form failed!");
    }
    if (SelectEntityType) {
      temp = await caseForm.inputSelectEntityTypeOnCaseForm(SelectEntityType);
      logFailTestcase(temp, "Input select entity type on case form failed!");
      if (SearchEntity) {
        temp = await caseForm.inputSearchEntityOnCaseForm(SearchEntity);
        logFailTestcase(temp, "Input search entity on case form failed!");
      }
    }

    if (Description) {
      temp = await caseForm.inputDescriptionOnCaseForm(Description);
      logFailTestcase(temp, "Input description on case form failed!");
    }
    if (DueDate) {
      temp = await caseForm.inputDueDateOnCaseForm(DueDate);
      logFailTestcase(temp, "Input due date on case form failed!");
    }
    if (Queue) {
      temp = await caseForm.inputQueueOnCaseForm(Queue);
      logFailTestcase(temp, "Input queue On case form failed!");
      if (AssignedTo) {
        temp = await caseForm.inputAssignedToOnCaseForm(AssignedTo);
        logFailTestcase(temp, "Input Assigned to case form failed!");
      }
    }
    if (Priority) {
      temp = await caseForm.inputPriorityOnCaseForm(Priority);
      logFailTestcase(temp, "Input priority on case form failed!");
    }

    if (DueDate) {
      //validate Due Date
      temp = await caseForm.validateDueDateValueOnCaseForm(DueDate);
      logFailTestcase(temp, "Due date shows incorrectly !");
    }

    temp = await globalPageObject.pressSaveForm();
    logFailTestcase(temp, "Can't press save case form");

    temp = await caseForm.checkValidationErrorMessageExisted();
    logFailTestcase(temp, `Case: "${CaseTitle}" -  Can't find any validation error message in case form!`);

    await globalPageObject.pressCancelForm();
  }
});
When("User updates invalid case management data from csv file {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  fileDataName = filename;

  for (let i = 0; i < rows.length; i++) {
    let temp0 = await caseList.openEditCaseFormByName(rows[0].SelectedCase);
    logFailTestcase(temp0 > 0, `Can't press edit case "${rows[0].SelectedCase}"`);
    const CaseTitle = rows[i].CaseTitle;
    const Workflow = rows[i].Workflow;
    const CaseType = rows[i].CaseType;
    const SelectEntityType = rows[i].SelectEntityType;
    const SearchEntity = rows[i].SearchEntity;
    const Description = rows[i].Description;
    const DueDate = rows[i].DueDate;
    const Queue = rows[i].Queue;
    const Priority = rows[i].Priority;

    const AssignedTo = rows[i].AssignedTo;

    let temp = await caseForm.clearOldDataOfCaseTitleOnEditCaseForm();
    logFailTestcase(temp, "clear Old Data Of Case Title Failed !");
    if (CaseTitle) {
      temp = await caseForm.inputCaseTitleOnCaseForm(CaseTitle);
      logFailTestcase(temp, "Input Case Title failed !");
    }

    temp = await caseForm.clearOldDataOfWorkflowOnEditCaseForm();
    logFailTestcase(temp, "clear Old Data Of Workflow Failed !");
    if (Workflow) {
      temp = await caseForm.inputWorkFlowOnCaseForm(Workflow);
      logFailTestcase(temp, "Input Workflow failed !");
    }

    temp = await caseForm.clearOldDataOfCaseTypeOnEditCaseForm();
    logFailTestcase(temp, "clear Old Data Of Case Type Failed !");
    if (CaseType) {
      temp = await caseForm.inputCaseTypeOnCaseForm(CaseType);
      logFailTestcase(temp, "Input Case Type failed !");
    }

    temp = await caseForm.clearOldDataOfRelatedRecordsOnEditCaseForm();
    logFailTestcase(temp, "clear Old Data Of Related Records Failed !");
    if (SelectEntityType) {
      temp = await caseForm.inputSelectEntityTypeOnCaseForm(SelectEntityType);
      logFailTestcase(temp, "Input Select Entity Type failed !");

      if (SearchEntity) {
        temp = await caseForm.inputSearchEntityOnCaseForm(SearchEntity);
        logFailTestcase(temp, "Input Search Entity failed !");
      }
    }

    if (Description) {
      temp = await caseForm.inputDescriptionOnCaseForm(Description);
      logFailTestcase(temp, "Input Description failed !");
    }

    if (DueDate) {
      temp = await caseForm.inputDueDateOnCaseForm(DueDate);
      logFailTestcase(temp, "Input DueDate failed !");
    }

    temp = await caseForm.clearOldDataOfQueueOnEditCaseForm();
    logFailTestcase(temp, "clear Old Data Of Queue Failed !");
    if (Queue) {
      temp = await caseForm.inputQueueOnCaseForm(Queue);
      logFailTestcase(temp, "Input Queue failed !");
      temp = await caseForm.clearOldDataOfAssignedToOnEditCaseForm();
      logFailTestcase(temp, "clear Old Data Of Assigned To Failed !");
      if (AssignedTo) {
        temp = await caseForm.inputAssignedToOnCaseForm(AssignedTo);
        logFailTestcase(temp, "Input Assigned to failed !");
      }
    }

    temp = await caseForm.clearOldDataOfPriorityOnEditCaseForm();
    logFailTestcase(temp, "clear Old Data Of Priority Failed !");
    if (Priority) {
      temp = await caseForm.inputPriorityOnCaseForm(Priority);
      logFailTestcase(temp, "Input Priority failed !");
    }

    if (DueDate) {
      //validate Due Date
      temp = await caseForm.validateDueDateValueOnCaseForm(DueDate);
      logFailTestcase(temp, "Due date shows incorrectly !");
    }



    await globalPageObject.pressSaveForm();

    temp = await caseForm.checkValidationErrorMessageExisted();
    logFailTestcase(temp, `Case: "${CaseTitle}" -  Can't find any validation error message in case form!`);

    await globalPageObject.pressCancelForm();
  }
});
Then("System does not show case management in the Case list {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  for (const row of rows) {
    const CaseTitle = row.CaseTitle;
    const temp = await caseList.checkCaseWithNameNotExisted(CaseTitle);
    logFailTestcase(temp, `Case "${CaseTitle}" is found at Case list!`);
  }
});

Then("System shows new case management in the Case list", async () => {
  let rows;
  if (fileDataName.includes(".csv")) {
    rows = loader(convertPathFileDataToDataRegression(fileDataName));
  } else {
    rows = await DataRepo.getInstance().loadData(fileDataName);
  }
  let len = rows.length;
  let countError = 0;
  await caseList.openReportedByMeCaseList();
  await globalPageObject.reloadTable(5000);
  for (let i = len - 1, j = 1; i >= 0; i--, j++) {
    const CaseTitle = rows[i].CaseTitle;
    const CaseType = rows[i].CaseType;
    const SelectEntityType = rows[i].SelectEntityType;
    const SearchEntity = rows[i].SearchEntity;
    const Description = rows[i].Description;
    const DueDate = rows[i].DueDate;
    const Queue = rows[i].Queue;
    const Priority = rows[i].Priority;
    const Workflow = rows[i].Workflow;

    const AssignedTo = rows[i].AssignedTo || rows[i].Assignedto;
    const CaseStatus = rows[i].CaseStatus ? rows[i].CaseStatus : "To do";

    const CreatedDate = getCurrentDateTime();


    console.log("\nChecking " + CaseTitle + ":");
    if (dataTestcase[i].status === true) {
      if (!(await caseList.assertCase(
        j,
        CaseTitle,
        CaseType,
        SearchEntity,
        //CreatedDate,
        DueDate,
        Priority,
        CaseStatus,
        AssignedTo,
        Queue,
      ))) {
        countError++;
      }

    } else {
      countError++;
      j--;
      logWarningMessage("\n" + dataTestcase[i].nameField + " is failed with error messages: ");
      for (const record of dataTestcase[i].message) {
        logFailMessage("\t" + record);
      }
    }
  }

  logFailTestcase(countError === 0);
});
Then("System shows new case management in the Case detail {string}", async (filename) => {
  let rows
  if (filename.includes(".csv")) {
    rows = loader(convertPathFileDataToDataRegression(filename));
  } else {
    rows = await DataRepo.getInstance().loadData(filename);
  }
  const selectedCase = rows[0].CaseTitle;
  let temp = await caseList.openDetailCaseByName(selectedCase);
  logFailTestcase(temp !== -1, `Open case "${selectedCase}" failed!`);
  const expectedName = rows[0].CaseTitle;
  // const expectedWorkflow = rows[0].Workflow;
  const expectedPriority = rows[0].Priority;
  const expectedAssigneTo = rows[0].AssignedTo || rows[0].Assignedto;
  const expectedRelatedTo = rows[0].SearchEntity;
  const expectedDueDate = rows[0].DueDate;
  const expectedDescription = rows[0].Description;
  await caseDetailsLeftSide.assertCreateCaseAtCaseDetail(expectedName, expectedPriority, expectedAssigneTo, expectedRelatedTo, expectedDueDate, expectedDescription);
});
When("User verifies UI at Case list page", async () => {
  // Do nothing
});
Then("System shows buttons on top of case table", async () => {
  let temp = await caseList.verifyButtonsOnTopOfCaseTable();
  logFailTestcase(temp, "Verify buttons on top of Case table failed!")
});

Then("System shows case table with full collumn", async () => {
  let temp = await caseList.verifyColumnsOfCaseTable();
  logFailTestcase(temp, "Verify columns of Case table failed!");
});
Then("System shows pagination buttons under of case table", async () => {
  let temp = await globalPagination.verifyPaginagtionButtonsAtMainList("Case");
  logFailTestcase(temp, "Verify paginagtion buttons at Case list: failed!");
});
Then("System shows or hides the column in the Case management list {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  let countError: number = 0;
  for (const row of rows) {
    let checkError = await accountList.assertColumn(
      row.Column,
      row.Uncheck
    );
    if (!checkError) {
      countError++;
    }
  }
  await globalBrowserWindowHandle.refreshPage();
  if (countError > 0) {
    fail("Show/Hide - Column: Testcase is failed!");
  } else {
    logSuccessMessage("Show/Hide - Column: Test Case is passed!");
  }
});
Given("User opens a case management from precondition steps {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const selectedCase = rows[0].SelectedCase;

  let temp = await caseList.openDetailCaseByName(selectedCase);
  logFailTestcase(temp !== -1, `Open case "${selectedCase}" failed!`);
});

When("User inputs valid data to create note at Case management {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const title = rows[0].Title;
  const description = rows[0].Description;

  let temp2 = await caseDetailsInfoDetailNotes.inputDataToCreateNoteAtCase(title, description);
  logFailTestcase(temp2, "Input data to create note failed!");

  temp2 = await caseDetailsInfoDetailNotes.pressAddNote();
  logFailTestcase(temp2, "press Add note failed!");
});
Then("System shows new note in the Note list at Case management {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const title = rows[0].Title;
  const description = rows[0].Description;
  logFailTestcase(await caseDetailsInfoDetailNotes.assertNoteAtCaseManagement(title, description), "Create new note failed!");
});
Given("User opens create Note form at Case management", async () => {
  logFailTestcase(await caseDetailsInfoDetailNotes.openCreateNoteForm(), "Open note form failed!");
});
Given("User selects a note at Case management", async () => {
  logFailTestcase(await caseDetailsInfoDetailNotes.openFirstNoteAtCase(), "Open a note failed!");
});
When("User deletes notes at Case management {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  for (const row of rows) {
    const title = row.Title;
    let temp = await caseDetailsInfoDetailNotes.pressDeleteNoteByTitle(title);
    logFailTestcase(temp, `Press delete note by name - Delete note "${title}" failed!`);
    temp = await globalPageObject.pressYesForm();
    logFailTestcase(temp, `Press Yes confirm - Delete note "${title}" failed!`);
    await globalPageObject.waitForProgressBarLoaded_v2();
  }
});
Then("System does not show that notes at Case management {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  for (const row of rows) {
    const title = row.Title;
    let temp = await caseDetailsInfoDetailNotes.checkNoteExistingByTitle(title);
    logFailTestcase(!temp, `Note "${title}" has not been deleted from note list!`);
  }
});
When("User uploads file attachments at Case management {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  for (const row of rows) {
    const temp = __dirname;
    let UploadDocuments: string = "";

    if (!(__dirname.includes("jenkins") && !__dirname.includes(".jenkins"))) {
      logInfoMessage("Runing on local...");
      UploadDocuments =
        __dirname.substring(0, temp.length - 70) + "\\" + row.UploadDocuments.replace("/", "\\");
    }
    else {
      logInfoMessage("Running on jenkins...");
      UploadDocuments = __dirname.substring(0, temp.length - 70) + "/" + row.UploadDocuments.replace("\\", "/");
    }
    logInfoMessage("\tFinal file path:");
    logInfoMessage("\t\t" + UploadDocuments);

    logInfoMessage("\tDirname:");
    logInfoMessage("\t\t" + __dirname);
    let temp2 = await caseDetailsInfoDetailAttachments.uploadFileAttachment(UploadDocuments);
    logFailTestcase(temp2, `Upload file "${UploadDocuments}" failed!`);
  }
});

Then("System shows file attachments at Case management {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  for (const row of rows) {
    const fileUpload = row.UploadDocuments;
    let temp = await caseDetailsInfoDetailAttachments.checkFileAttachmentExist(fileUpload);
    logFailTestcase(temp, `Upload file "${fileUpload}" failed!`);
  }
});

Then("User downloads file attachments at Case management {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  for (const row of rows) {
    const fileUpload = row.UploadDocuments;
    let temp = await caseDetailsInfoDetailAttachments.downloadFileAttachment(fileUpload);
    logFailTestcase(temp, `Download file "${fileUpload}" failed!`);
  }
});
Then("User removes file attachments at Case management {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  for (const row of rows) {
    const fileUpload = row.UploadDocuments;
    let temp = await caseDetailsInfoDetailAttachments.removeFileAttachment(fileUpload);
    logFailTestcase(temp, `Remove file "${fileUpload}" failed!`);

    temp = await caseDetailsInfoDetailAttachments.checkFileAttachmentExist(fileUpload);
    logFailTestcase(!temp, `File "${fileUpload}" still founded after remove!`);
  }
});
Given("User open task form at Case management", async () => {
  logFailTestcase(await caseDetailsInfoDetailTask.openTaskForm(), "Open create failed!");
});
When("User inputs valid data into task form {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  const TaskTitle = row.TaskTitle;
  const Description = row.Description;
  const Queue = "";
  const AssignedTo = row.AssignedTo;
  const Status = row.Status;
  const Priority = row.Priority;
  const DueDate = row.DueDate;
  const temp = await caseDetailsInfoDetailTask.inputDataToCreateTaskAtCase(
    TaskTitle,
    Description,
    Queue,
    AssignedTo,
    Status,
    Priority,
    DueDate
  );
  logFailTestcase(temp, "Input data to task form failed!");

  logFailTestcase(await globalPageObject.pressSaveForm(), "Can not press save task form");
});

Then("System shows task in the Task list at Case management {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  const TaskTitle = row.TaskTitle;
  const Description = row.Description;
  const AssignedTo = row.AssignedTo;
  const Status = row.Status;
  const Priority = row.Priority;
  const temp = await caseDetailsInfoDetailTask.assertTaskAtList(
    TaskTitle,
    Description,
    "",
    AssignedTo,
    Priority,
    Status
  );
  logFailTestcase(temp, "Create task at Case management failed!");
});
Given("User opens first task at Case management", async () => {
  logFailTestcase(await caseDetailsInfoDetailTask.openFirstTaskAtCase(), "Open first task at Case failed!");
});

Then("User opens Edit case form {string}", async (filename: string) => {
  await caseList.openReportedByMeCaseList();
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  const caseTitle = row.CaseTitle;
  await globalPageObject.waitForSeconds(2000);
  let temp = await caseList.openEditCaseFormByName(caseTitle);
  logFailTestcase(temp > 0, "Opens Edit case form failed!");
});


Then("User opens Edit case form at the first row {string}", async (filename: string) => {
  let temp = await accountTabCaseList.openCaseFormByRow(1);
  logFailTestcase(temp, "Opens Edit case form failed!");
});


Then("User verifies info on Edit case form {string}", async (filename: string) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  const CaseTitle = row.CaseTitle;
  const CaseType = row.CaseType;
  const Workflow = row.Workflow;
  const SearchEntity = row.SearchEntity;
  const Description = row.Description;
  const DueDate = row.DueDate;
  const Queue = row.Queue;
  const Priority = row.Priority;
  const AssignedTo = row.AssignedTo;

  let temp = await caseForm.validateCaseTitleValueOnCaseForm(CaseTitle);
  logFailTestcase(temp, "Incorrect Case Title!");

  // temp = await caseForm.validateWorkflowValueOnCaseForm(Workflow);
  // logFailTestcase(temp, "Incorrect Workflow!");

  temp = await caseForm.validateCaseTypeValueOnCaseForm(CaseType);
  logFailTestcase(temp, "Incorrect Case Type!");

  temp = await caseForm.validateRelatedRecordsValueOnCaseForm(SearchEntity);
  logFailTestcase(temp, "Incorrect Related Records");

  temp = await caseForm.validateDescriptionValueOnCaseForm(Description);
  logFailTestcase(temp, "Incorrect Description!");

  temp = await caseForm.validateDueDateValueOnCaseForm(DueDate);
  logFailTestcase(temp, "Incorrect Due Date!");

  // temp = await caseForm.validateQueueValueOnCaseForm(Queue);
  // logFailTestcase(temp, "Incorrect Queue!");

  // temp = await caseForm.validatePriorityValueOnCaseForm(Priority);
  // logFailTestcase(temp, "Incorrect Priority!");

  // temp = await caseForm.validateAssignedToValueOnCaseForm(AssignedTo);
  // logFailTestcase(temp, "Incorrect Assigned To!");

  temp = await globalPageObject.pressCancelForm();
  logFailTestcase(temp, "Can't press Cancel case form!");
});

Then("System shows new case management in the Case list {string}", async (filename) => {
  const rows = (await DataRepo.getInstance().loadData(filename))[0];
  let len = rows.length;
  let countError = 0;
  await caseList.openReportedByMeCaseList();
  await globalPageObject.reloadTable(7000);
  const CaseTitle = rows.CaseTitle;
  const DueDate = rows.DueDate;
  const Queue = rows.Queue;
  const Priority = rows.Priority;
  const Workflow = rows.Workflow;
  const status = rows.CaseStatus;

  const AssignedTo = rows.AssignedTo;

  const CreatedDate = getCurrentDateTime();

  let temp = true;

  let Reference = getValueDataOfDataTestExecution("Reference");
  if (Reference) {
    temp = await caseList.validateReferenceValueOnList(Reference);
    logFailTestcase(temp, "incorrect Reference on Case List!");
  }
  if (CaseTitle) {
    temp = await caseList.validateCaseTitleValueOnList(CaseTitle);
    logFailTestcase(temp, "incorrect CaseTitle on Case List!");
  }
  if (AssignedTo) {
    temp = await caseList.validateAssigneeValueOnList(AssignedTo);
    logFailTestcase(temp, "incorrect AssignedTo on Case List!");
  }
  if (DueDate) {
    temp = await caseList.validateDueDateOnList(DueDate);
    logFailTestcase(temp, "incorrect DueDate on Case List!");
  }
  if (CreatedDate) {
    temp = await caseList.validateCreateDateValueOnList(CreatedDate);
    logFailTestcase(temp, "incorrect CreatedDate on Case List!");
  }
  if (Queue) {
    temp = await caseList.validateQueueValueOnList(Queue);
    logFailTestcase(temp, "incorrect Queue on Case List!");
  }
  if (Priority) {
    temp = await caseList.validatePriorityOnList(Priority);
    logFailTestcase(temp, "incorrect Priority on Case List!");
  }
  if(status){
    temp = await caseList.validateStatusValueOnList(status);
    logFailTestcase(temp, "incorrect status on Case List!");
  }

});

Then(`User verifies the workflow is shown in the Case detail`, async () => {
  let temp = await caseDetailsInfoDetailWorkflow.pressShowWorkflowButton();
  logFailTestcase(temp, "press Show Workflow Button failed!");
  temp = await caseDetailsInfoDetailWorkflow.validateWorlflowIsShown();
  logFailTestcase(temp, "validate Worlflow Is Shown failed!");
});


When(`User presses {string} button on Case detail base on workflow`, async (buttonName) => {

  let temp = await caseDetailsInfoDetailWorkflow.pressButtonBaseOnWorkFlow(buttonName);
  logFailTestcase(temp, `click ${buttonName} button failed!`)


  await globalPageObject.waitForProgressBarLoaded_v2();
  await globalPageObject.waitForProgressBarLoaded_v2();


  temp = await caseDetailsInfoDetailWorkflow.validateButtonIsVisibleOrNotBaseOnWorkFlow(buttonName, false);
  logFailTestcase(temp, `${buttonName} button is not hide after clicking!`);

});
