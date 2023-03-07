import { Before, Then, When } from "@cucumber/cucumber";
import { fail } from 'assert';
import { CaseForm } from "../../../../page-objects/back-office-portal/general/case/case-form/CaseForm";
import { CaseList } from "../../../../page-objects/back-office-portal/general/case/case-list/CaseList";
import { GlobalBrowserWindowHandle } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalBrowserWindowHandle";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { ValidateField } from "../../../../shared/classes";
import { convertPathFileDataToDataRegression, getCurrentDateTime, logFailTestcase, logWarningMessage } from '../../../../shared/functions';
import { ICommonContext } from "../../../../shared/interfaces";
import { subErrorMessages } from "../../../../shared/variables";

const loader = require("csv-load-sync");
let caseList: CaseList;
let caseForm: CaseForm;
let globalPageObject: GlobalPageObject;
let globalBrowserWindowHandle: GlobalBrowserWindowHandle;
let fileDataName: string = "";
let editedPositionRow: number = -1;

Before(async function () {
  const context: ICommonContext = this.context;
  caseList = new CaseList(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
  globalBrowserWindowHandle = new GlobalBrowserWindowHandle(context.driverService);
  caseForm = new CaseForm(context.driverService);
});

When(
  "User updates a case management from preconditions steps from csv file {string}",
  async function (filename) {

    const rows = loader(convertPathFileDataToDataRegression(filename));
    fileDataName = filename;
    await globalBrowserWindowHandle.refreshPage();
    await globalPageObject.reloadTable(5000);
    await caseList.openReportedByMeCaseList();

    const selectedCase = rows[0].SelectedCase;
    editedPositionRow = await caseList.openEditCaseFormByName(selectedCase);
    logFailTestcase(editedPositionRow > 0, "Open Edit case form failed!");
    const CaseTitle = rows[0].CaseTitle;
    const Workflow = rows[0].Workflow;
    const CaseType = rows[0].CaseType;
    const SelectEntityType = rows[0].SelectEntityType;
    const SearchEntity = rows[0].SearchEntity;
    const Description = rows[0].Description;
    const DueDate = rows[0].DueDate;
    const Queue = rows[0].Queue;
    const Priority = rows[0].Priority;
    const AssignedTo = rows[0].AssignedTo;
    let validationField = new ValidateField(CaseTitle, 0, true, [], []);

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
    validationField = await caseForm.validateFields(validationField);
    if (!validationField.status) {
      await globalPageObject.pressCancelForm();
      logWarningMessage("\n" + validationField.nameField + " is failed with error messages: ");
      fail("[TC] [Cases Management] Edit a case successfully: Testcase is failed!");
    }
    else {
      await caseList.waitToastMessageVisible();
    }
  });

Then("System shows updated case management in the Case list", async function () {
  const rows = loader(convertPathFileDataToDataRegression(fileDataName));
  await caseList.openReportedByMeCaseList();

  const CaseTitle = rows[0].CaseTitle;
  const CaseType = rows[0].CaseType;
  const SelectEntityType = rows[0].SelectEntityType;
  const SearchEntity = rows[0].SearchEntity;
  const Description = rows[0].Description;
  const DueDate = rows[0].DueDate;
  const Queue = rows[0].Queue;
  const Priority = rows[0].Priority;
  const Workflow = rows[0].Workflow;

  const AssignedTo = rows[0].AssignedTo;

  const CreatedDate = getCurrentDateTime();

  let temp = await caseList.assertCase(
    editedPositionRow,
    CaseTitle,
    CaseType,
    SearchEntity,
    //CreatedDate,
    DueDate,
    Priority,
    "To do",
    AssignedTo,
    Queue
  );
  if (temp === false) {
    fail("[TC] [Cases Management] Edit a case successfully: Test case is failed!" + subErrorMessages);
  }
});