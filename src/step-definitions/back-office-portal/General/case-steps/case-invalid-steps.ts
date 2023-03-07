import { Before, Then, When } from "@cucumber/cucumber";
import { AccountTabCaseForm } from "../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-case/AccountTabCaseForm";
import { AccountTabCaseList } from "../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-case/AccountTabCaseList";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { ValidateField } from '../../../../shared/classes';
import { convertPathFileDataToDataRegression, logFailMessage, logFailTestcase, logInfoMessage, logSuccessMessage, logWarningMessage } from '../../../../shared/functions';
import { ICommonContext } from "../../../../shared/interfaces";
import { dataTestcase, scenarioName } from '../../../../shared/variables';


const loader = require("csv-load-sync");
let accountTabCaseForm: AccountTabCaseForm;
let accountTabCaseList: AccountTabCaseList;
let globalPageObject: GlobalPageObject;
let fileDataCreate: string = "";

Before(async function () {
  const context: ICommonContext = this.context;
  accountTabCaseForm = new AccountTabCaseForm(context.driverService);
  accountTabCaseList = new AccountTabCaseList(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
});

When(
  "User inputs invalid case data from csv file {string}",
  async function (filename) {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    fileDataCreate = filename;
    for (let i = 0; i < rows.length; i++) {
      let temp = await accountTabCaseList.pressCreate();
      // logFailTestcase(temp, "Can't open Create new case form!");
      const CaseTitle = rows[i].CaseTitle;
      const Workflow = rows[i].Workflow;
      const CaseType = rows[i].CaseType;
      const SelectEntityType = rows[i].SelectEntityType;
      const SearchEntity = rows[i].Entity;
      const Description = rows[i].Description;
      const DueDate = rows[i].Duedate;
      const Queue = rows[i].Queue;
      const Priority = rows[i].Priority;
      let validationField = new ValidateField(CaseTitle, i, true, [], []);

      const AssignedTo = rows[i].Assignedto;

      if (CaseTitle) {
        temp = await accountTabCaseForm.inputCaseTitleOnCaseForm(CaseTitle);
        logFailTestcase(temp, "Input case title On case form failed!");
      }
      if (Workflow) {
        temp = await accountTabCaseForm.inputWorkFlowOnCaseForm(Workflow);
        logFailTestcase(temp, "Input workflow on case form failed!");
      }
      if (CaseType) {
        temp = await accountTabCaseForm.inputCaseTypeOnCaseForm(CaseType);
        logFailTestcase(temp, "Input case type on case form failed!");
      }
      if (SelectEntityType) {
        temp = await accountTabCaseForm.inputSelectEntityTypeOnCaseForm(SelectEntityType);
        logFailTestcase(temp, "Input select entity type on case form failed!");
        if (SearchEntity) {
          temp = await accountTabCaseForm.inputSearchEntityOnCaseForm(SearchEntity);
          logFailTestcase(temp, "Input search entity on case form failed!");
        }
      }

      if (Description) {
        temp = await accountTabCaseForm.inputDescriptionOnCaseForm(Description);
        logFailTestcase(temp, "Input description on case form failed!");
      }
      if (DueDate) {
        temp = await accountTabCaseForm.inputDueDateOnCaseForm(DueDate);
        logFailTestcase(temp, "Input due date on case form failed!");
      }
      if (Queue) {
        temp = await accountTabCaseForm.inputQueueOnCaseForm(Queue);
        logFailTestcase(temp, "Input queue On case form failed!");
        if (AssignedTo) {
          temp = await accountTabCaseForm.inputAssignedToOnCaseForm(AssignedTo);
          logFailTestcase(temp, "Input Assigned to case form failed!");
        }
      }
      if (Priority) {
        temp = await accountTabCaseForm.inputPriorityOnCaseForm(Priority);
        logFailTestcase(temp, "Input priority on case form failed!");
      }

      if (DueDate) {
        //validate Due Date
        temp = await accountTabCaseForm.validateDueDateValueOnCaseForm(DueDate);
        logFailTestcase(temp, "Due date shows incorrectly !");
      }

      temp = await globalPageObject.pressSaveForm();
      validationField = await accountTabCaseForm.validateFields(validationField);
      if (!validationField.status) {
        await globalPageObject.pressCancelForm();
      }
      dataTestcase.push(validationField);
    }
  }
);

When("User selects a case from precondition and updates invalid case from csv file {string}", async function (filename) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  fileDataCreate = filename;
  for (let i = 0; i < rows.length; i++) {
    const selectedCase = rows[i].SelectedCase;
    let temp = (await accountTabCaseList.openEditCaseFormByName(selectedCase))[0];
    if (temp === -1) {
      logFailTestcase(false, `Can't open case with name "${selectedCase}"`);
    }
    const CaseTitle = rows[i].CaseTitle;
    const CaseType = rows[i].CaseType;
    const SelectEntityType = rows[i].Selectentitytype;
    const SearchEntity = rows[i].Entity;
    const Description = rows[i].Description;
    const DueDate = rows[i].Duedate;
    const Queue = rows[i].Queue;
    const Priority = rows[i].Priority;
    let validationField = new ValidateField(CaseTitle, i, true, [], []);

    const AssignedTo = rows[i].Assignedto;


    temp = await accountTabCaseForm.clearOldDataOfCaseTitleOnEditCaseForm();
    logFailTestcase(temp, "clear Old Data Of Case Title Failed !");
    if (CaseTitle) {
      temp = await accountTabCaseForm.inputCaseTitleOnCaseForm(CaseTitle);
      logFailTestcase(temp, "Input Case Title failed !");
    }

    temp = await accountTabCaseForm.clearOldDataOfWorkflowOnEditCaseForm();
    logFailTestcase(temp, "clear Old Data Of Workflow Failed !");

    temp = await accountTabCaseForm.clearOldDataOfCaseTypeOnEditCaseForm();
    logFailTestcase(temp, "clear Old Data Of Case Type Failed !");
    if (CaseType) {
      temp = await accountTabCaseForm.inputCaseTypeOnCaseForm(CaseType);
      logFailTestcase(temp, "Input Case Type failed !");
    }

    temp = await accountTabCaseForm.clearOldDataOfRelatedRecordsOnEditCaseForm();
    logFailTestcase(temp, "clear Old Data Of Related Records Failed !");
    if (SelectEntityType) {
      temp = await accountTabCaseForm.inputSelectEntityTypeOnCaseForm(SelectEntityType);
      logFailTestcase(temp, "Input Select Entity Type failed !");

      if (SearchEntity) {
        temp = await accountTabCaseForm.inputSearchEntityOnCaseForm(SearchEntity);
        logFailTestcase(temp, "Input Search Entity failed !");
      }
    }

    if (Description) {
      temp = await accountTabCaseForm.inputDescriptionOnCaseForm(Description);
      logFailTestcase(temp, "Input Description failed !");
    }

    if (DueDate) {
      temp = await accountTabCaseForm.inputDueDateOnCaseForm(DueDate);
      logFailTestcase(temp, "Input DueDate failed !");
    }

    temp = await accountTabCaseForm.clearOldDataOfQueueOnEditCaseForm();
    logFailTestcase(temp, "clear Old Data Of Queue Failed !");
    if (Queue) {
      temp = await accountTabCaseForm.inputQueueOnCaseForm(Queue);
      logFailTestcase(temp, "Input Queue failed !");
      temp = await accountTabCaseForm.clearOldDataOfAssignedToOnEditCaseForm();
      logFailTestcase(temp, "clear Old Data Of Assigned To Failed !");
      if (AssignedTo) {
        temp = await accountTabCaseForm.inputAssignedToOnCaseForm(AssignedTo);
        logFailTestcase(temp, "Input Assigned to failed !");
      }
    }

    temp = await accountTabCaseForm.clearOldDataOfPriorityOnEditCaseForm();
    logFailTestcase(temp, "clear Old Data Of Priority Failed !");
    if (Priority) {
      temp = await accountTabCaseForm.inputPriorityOnCaseForm(Priority);
      logFailTestcase(temp, "Input Priority failed !");
    }

    if (DueDate) {
      //validate Due Date
      temp = await accountTabCaseForm.validateDueDateValueOnCaseForm(DueDate);
      logFailTestcase(temp, "Due date shows incorrectly !");
    }

    await globalPageObject.pressSaveForm();

    validationField = await accountTabCaseForm.validateFields(validationField);
    if (!validationField.status) {
      temp = await globalPageObject.pressCancelForm();
      logFailTestcase(temp, "Can't press Cancle case form!");
    }
    dataTestcase.push(validationField);

  }
}
);

Then("System shows error notifications fields Case", async function () {
  const rows = loader(convertPathFileDataToDataRegression(fileDataCreate));
  let len = rows.length;
  let countError = 0;

  for (let i = 0; i < len; i++) {
    const casetitle = rows[i].CaseTitle;

    console.log(`\nChecking case at Line ${i + 1} at file CSV - ${casetitle} :`);

    if (dataTestcase[i].message.length === 0 && dataTestcase[i].toastMessage.length === 0) {
      countError++;
      logWarningMessage(`\nWe didn't get any error validation messages at Case form!`);
      logFailMessage(`\n\tLine ${i + 1} is failed!`);
    }
    else {
      logInfoMessage(`\nError validation messages on Case form are:`);
      for (const record of dataTestcase[i].message) {
        logFailMessage("\t" + record);
      }
      for (const record of dataTestcase[i].toastMessage) {
        logFailMessage("\t" + record);
      }
      logSuccessMessage(`\n\tLine ${i + 1} is passed!`);
    }
  }


  if (countError > 0) {
    logFailTestcase(false);
  }
  else {
    logSuccessMessage(scenarioName + "\n\tStep: System shows error notifications fields Case: is passed!");
  }

});

Then("System does not show new case in the Case list", async function () {
  const rows = loader(convertPathFileDataToDataRegression(fileDataCreate));
  let len = rows.length;

  for (let i = len - 1, j = 1; i >= 0; i--, j++) {
    const casetitle = rows[i].CaseTitle;
    const queue = rows[i].Queue;
    const priority = rows[i].Priority;
    const duedate = rows[i].DueDate;

    await accountTabCaseList.assertCaseExistence(
      j, //position of row want to validate
      casetitle,
      queue,
      priority,
      duedate
    );
  }
});
