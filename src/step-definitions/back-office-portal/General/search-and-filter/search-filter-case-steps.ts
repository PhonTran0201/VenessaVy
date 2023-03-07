import { Before, Given, Then, When } from "@cucumber/cucumber";
import { CaseForm } from "../../../../page-objects/back-office-portal/general/case/case-form/CaseForm";
import { CaseList } from "../../../../page-objects/back-office-portal/general/case/case-list/CaseList";
import { CaseSearchFilter } from "../../../../page-objects/back-office-portal/general/case/case-search-filter/CaseSearchFilter";
import { GlobalFilterDropdown } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalFilterDropdown";
import { GlobalFilterName } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalFilterName";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { convertPathFileDataToDataRegression, logFailTestcase, logWarningMessage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { scenarioName } from "../../../../shared/variables";


let caseList: CaseList;
let caseSearchFilter: CaseSearchFilter;
let caseForm: CaseForm;
let globalFilterDropdown: GlobalFilterDropdown;
let globalPageObject: GlobalPageObject;
let globalFilterName: GlobalFilterName;
const loader = require("csv-load-sync");

Before(async function () {
  const context: ICommonContext = this.context;
  caseList = new CaseList(context.driverService);
  caseSearchFilter = new CaseSearchFilter(context.driverService);
  caseForm = new CaseForm(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
  globalFilterName = new GlobalFilterName(context.driverService);
  globalFilterDropdown = new GlobalFilterDropdown(context.driverService);

});

/*
 function validate case info after Search and Filter lead 
*/
async function validateCaseInfoAfterSearchAndFilter(
  CaseTitle: string,
  CaseID: string,
  SearchEntity: string,
  Status: string,
  Assignee: string,
  DueDateFrom: string,
  DueDateTo: string,
  CreatedDateFrom: string,
  CreatedDateTo: string,
  positionRow: number = 1
) {
  try {
    let temp = true;
    if (CaseTitle) {
      temp = await caseList.validateCaseTitleValueOnList(CaseTitle, positionRow, true);
      logFailTestcase(temp, `Case Title "${CaseTitle}" does not match to result`);
    }
    if (CaseID) {
      temp = await caseList.validateReferenceValueOnList(CaseID, positionRow);
      logFailTestcase(temp, `Case ID or Reference "${CaseID}" does not match to result`);
    }
    if (SearchEntity) {
      temp = await caseList.validateEntityValueOnList(SearchEntity, positionRow);
      logFailTestcase(temp, `Entity "${SearchEntity}" does not match to result`);
    }
    if (Status) {
      temp = await caseList.validateStatusValueOnList(Status, positionRow);
      logFailTestcase(temp, `Status "${Status}" does not match to result`);
    }
    if (Assignee) {
      temp = await caseList.validateAssigneeValueOnList(Assignee, positionRow)
      logFailTestcase(temp, `Assignee "${Assignee}" does not match to result`);
    }
    if (DueDateFrom || DueDateTo) {
      temp = await caseList.validateDueDateFromToOnList(DueDateFrom, DueDateTo, positionRow);
      logFailTestcase(temp, `Due Date does not match to result`);
    }

    if (CreatedDateFrom || CreatedDateTo) {
      temp = await caseList.validateCreatedDateFromToOnList(CreatedDateFrom, CreatedDateTo, positionRow);
      logFailTestcase(temp, `Created Date does not match to result`);
    }

    return true;
  } catch (error) {
    console.log("validateLeadInfoAfterSearchAndFilter");
    console.error(error);
    return false;
  }

}

Given("User switches to {string} queue on Case Management", async function (queue) {
  let temp = true;
  switch (queue) {
    case "Reported by me": {
      temp = await caseList.switchQueue("Reported by me");
      logFailTestcase(temp, `Switch to Reported by me queue failed!`);
      break;
    }
    case "Opportunity": {
      temp = await caseList.switchQueue("Opportunity");
      logFailTestcase(temp, `Switch to Opportunity queue failed!`);
      break;
    }
    case "QueueTest": {
      temp = await caseList.switchQueue("QueueTest");
      logFailTestcase(temp, `Switch to QueueTest queue failed!`);
      break;
    }
    default: {
      logFailTestcase(false, `Queue "${queue}" was not found on Case Management`);
      break;
    }
  }
});

When("User inputs to Search and Filter Case form with valid data from csv file {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  for (let i = 0; i < rows.length; i++) {
    logWarningMessage(`Checking Search & Filter at line ${i + 1} in csv...`);
    let temp = await globalPageObject.pressClearSearchAndFilter();
    logFailTestcase(temp, "Press Clear at Search and Filter failed!");

    await globalPageObject.waitForProgressBarLoaded_v2(1000);
    await globalPageObject.waitForProgressBarLoaded_v2(1000);


    // Search and Filter fields
    const CaseTitle = rows[i].CaseTitle;
    const CaseID = rows[i].CaseID;
    const SelectEntityType = rows[i].SelectEntityType;
    const SearchEntity = rows[i].SearchEntity;
    const Status = rows[i].Status;
    const Assignee = rows[i].Assignee;
    const DueDateFrom = rows[i].DueDateFrom;
    const DueDateTo = rows[i].DueDateTo;
    const CreatedDateFrom = rows[i].CreatedDateFrom;
    const CreatedDateTo = rows[i].CreatedDateTo;



    if (CaseTitle || CaseID) {
      temp = await caseSearchFilter.inputKeywordOnSearchAndFilterFormForCase(CaseTitle || CaseID);
      logFailTestcase(temp, "Input Keyword failed !");
    }
    if (SelectEntityType) {
      temp = await caseSearchFilter.inputSelectEntityTypeOnSearchAndFilterFormForCase(SelectEntityType);
      logFailTestcase(temp, "Input Select Entity Type failed !");
      if (SearchEntity) {
        temp = await caseSearchFilter.inputSearchEntityOnSearchAndFilterFormForCase(SearchEntity);
        logFailTestcase(temp, "Input Search Entity failed !");
      }
    }
    if (Status) {
      temp = await caseSearchFilter.inputStatusOnSearchAndFilterFormForCase(Status);
      logFailTestcase(temp, "Input Status failed !");
    }
    if (Assignee) {
      temp = await caseSearchFilter.inputAssigneeOnSearchAndFilterFormForCase(Assignee);
      logFailTestcase(temp, "Input Assignee failed !");
    }
    if (DueDateFrom) {
      temp = await caseSearchFilter.inputDueDateFromOnSearchAndFilterFormForCase(DueDateFrom);
      logFailTestcase(temp, "Input Due Date From failed !");
    }
    if (DueDateTo) {
      temp = await caseSearchFilter.inputDueDateToOnSearchAndFilterFormForCase(DueDateTo);
      logFailTestcase(temp, "Input Due Date To failed !");
    }
    if (CreatedDateFrom) {
      temp = await caseSearchFilter.inputCreatedDateFromOnSearchAndFilterFormForCase(CreatedDateFrom);
      logFailTestcase(temp, "Input Created Date From failed !");
    }
    if (CreatedDateTo) {
      temp = await caseSearchFilter.inputCreatedDateToOnSearchAndFilterFormForCase(CreatedDateTo);
      logFailTestcase(temp, "Input Created Date To failed !");
    }


    await globalPageObject.closeAllToastError();
    await globalPageObject.closeAllToastSuccess();
    await globalPageObject.waitForProgressBarLoaded_v2();
    temp = await globalPageObject.pressSearchSearchAndFilter();
    logFailTestcase(temp, "Press Search at Search & Filter failed!");

    await globalPageObject.waitForProgressBarLoaded_v2();
    await globalPageObject.waitForProgressBarLoaded_v2();


    const caseNumber = parseInt(rows[i].CaseNumber);
    const actualTotalNumber = await globalPageObject.getNumberOfTotalRecordsMainTab();

    if (caseNumber > 1 && caseNumber === actualTotalNumber) {
      //validate a first row
      temp = await validateCaseInfoAfterSearchAndFilter(
        CaseTitle,
        CaseID,
        SearchEntity,
        Status,
        Assignee,
        DueDateFrom,
        DueDateTo,
        CreatedDateFrom,
        CreatedDateTo,
        1
      );
      logFailTestcase(temp, "validate case info after Search and Filter Failed !");

      //validate a last row or the 10 row
      if (actualTotalNumber >= 10) {
        temp = await validateCaseInfoAfterSearchAndFilter(
          CaseTitle,
          CaseID,
          SearchEntity,
          Status,
          Assignee,
          DueDateFrom,
          DueDateTo,
          CreatedDateFrom,
          CreatedDateTo,
          10
        );

      } else {
        temp = await validateCaseInfoAfterSearchAndFilter(
          CaseTitle,
          CaseID,
          SearchEntity,
          Status,
          Assignee,
          DueDateFrom,
          DueDateTo,
          CreatedDateFrom,
          CreatedDateTo,
          actualTotalNumber
        );
      }
      logFailTestcase(temp, "validate Case info after Search and Filter Failed !");
    }
    else if ((caseNumber === 1 && caseNumber === actualTotalNumber) || caseNumber < 0) {
      temp = await validateCaseInfoAfterSearchAndFilter(
        CaseTitle,
        CaseID,
        SearchEntity,
        Status,
        Assignee,
        DueDateFrom,
        DueDateTo,
        CreatedDateFrom,
        CreatedDateTo,
        1
      );
      logFailTestcase(temp, "validate case info after Search and Filter Failed !");

    }
    else {
      logWarningMessage(`There are ${actualTotalNumber} total records found... BUT expecting "${caseNumber}"`);
      logFailTestcase(false, `Line ${i + 1} in csv: failed...`);
    }
    logWarningMessage(`\tLine ${i + 1} passed!`);
  }
});

Then("System shows a list of case on Case list", async () => {
  //We have implemented at previous step for multiple searching account.
  console.info(scenarioName + ": Test case is passed!");
});

When("User inputs data to Search and Filter Case form {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];

  const CaseTitle = row.CaseTitle;
  const CaseID = row.CaseID;
  const SelectEntityType = row.SelectEntityType;
  const SearchEntity = row.SearchEntity;
  const Status = row.Status;
  const Assignee = row.Assignee;
  const DueDateFrom = row.DueDateFrom;
  const DueDateTo = row.DueDateTo;
  const CreatedDateFrom = row.CreatedDateFrom;
  const CreatedDateTo = row.CreatedDateTo;

  let temp = true;

  temp = await globalPageObject.pressClearSearchAndFilter();
  logFailTestcase(temp, `Press "Clear" Search and Filter form failed!`);

  if (CaseTitle || CaseID) {
    temp = await caseSearchFilter.inputKeywordOnSearchAndFilterFormForCase(CaseTitle || CaseID);
    logFailTestcase(temp, "Input Keyword failed !");
  }
  if (SelectEntityType) {
    temp = await caseSearchFilter.inputSelectEntityTypeOnSearchAndFilterFormForCase(SelectEntityType);
    logFailTestcase(temp, "Input Select Entity Type failed !");
    if (SearchEntity) {
      temp = await caseSearchFilter.inputSearchEntityOnSearchAndFilterFormForCase(SearchEntity);
      logFailTestcase(temp, "Input Search Entity failed !");
    }
  }
  if (Status) {
    temp = await caseSearchFilter.inputStatusOnSearchAndFilterFormForCase(Status);
    logFailTestcase(temp, "Input Status failed !");
  }
  if (Assignee) {
    temp = await caseSearchFilter.inputAssigneeOnSearchAndFilterFormForCase(Assignee);
    logFailTestcase(temp, "Input Assignee failed !");
  }
  if (DueDateFrom) {
    temp = await caseSearchFilter.inputDueDateFromOnSearchAndFilterFormForCase(DueDateFrom);
    logFailTestcase(temp, "Input Due Date From failed !");
  }
  if (DueDateTo) {
    temp = await caseSearchFilter.inputDueDateToOnSearchAndFilterFormForCase(DueDateTo);
    logFailTestcase(temp, "Input Due Date To failed !");
  }
  if (CreatedDateFrom) {
    temp = await caseSearchFilter.inputCreatedDateFromOnSearchAndFilterFormForCase(CreatedDateFrom);
    logFailTestcase(temp, "Input Created Date From failed !");
  }
  if (CreatedDateTo) {
    temp = await caseSearchFilter.inputCreatedDateToOnSearchAndFilterFormForCase(DueDateTo);
    logFailTestcase(temp, "Input Created Date To failed !");
  }


});

Then("Data in Search and Filter case form is cleaned", async () => {
  let temp = await caseSearchFilter.checkBtnClearAllOfKeywordOnSearchAndFilterForm();
  logFailTestcase(temp, "Clear data on Keyword is fail !");

  temp = await caseSearchFilter.checkBtnClearAllOfSelectEntityTypeOnSearchAndFilterForm();
  logFailTestcase(temp, "Clear data on Select Entity Type is fail !");

  temp = await caseSearchFilter.checkBtnClearAllOfSearchEntityOnSearchAndFilterForm();
  logFailTestcase(temp, "Clear data on Search Entity is fail !");

  temp = await caseSearchFilter.checkBtnClearAllOfStatusOnSearchAndFilterForm();
  logFailTestcase(temp, "Clear data on Status is fail !");

  temp = await caseSearchFilter.checkBtnClearAllOfAssigneeOnSearchAndFilterForm();
  logFailTestcase(temp, "Clear data on Assignee is fail !");

  temp = await caseSearchFilter.checkClearAllOfDueDateFromOnSearchAndFilterForm();
  logFailTestcase(temp, "Clear text on Due Date From is fail !");

  temp = await caseSearchFilter.checkClearAllOfDueDateToOnSearchAndFilterForm();
  logFailTestcase(temp, "Clear text on Due Date To is fail !");

  temp = await caseSearchFilter.checkClearAllOfCreatedDateFromOnSearchAndFilterForm();
  logFailTestcase(temp, "Clear text on Created Date From is fail !");

  temp = await caseSearchFilter.checkClearAllOfCreatedDateToOnSearchAndFilterForm();
  logFailTestcase(temp, "Clear text on Created Date To is fail !");

});

Then(
  "User inputs valid datetime data to Search and Filter Case form successfully {string}",
  async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    for (let i = 0; i < rows.length; i++) {
      logWarningMessage(`Checking Search & Filter at line ${i + 1} in csv...`);
      let temp = await globalPageObject.pressClearSearchAndFilter();
      logFailTestcase(temp, "Press Clear at Search and Filter failed!");


      // Search and Filter fields
      const DueDateFrom = rows[i].DueDateFrom;
      const DueDateTo = rows[i].DueDateTo;
      const CreatedDateFrom = rows[i].CreatedDateFrom;
      const CreatedDateTo = rows[i].CreatedDateTo;

      const DueDateFromSecond = rows[i].DueDateFromSecond;
      const DueDateToSecond = rows[i].DueDateToSecond;
      const CreatedDateFromSecond = rows[i].CreatedDateFromSecond;
      const CreatedDateToSecond = rows[i].CreatedDateToSecond;

      if (DueDateFrom) {
        temp = await caseSearchFilter.inputDueDateFromOnSearchAndFilterFormForCase(DueDateFrom);
        logFailTestcase(temp, "Input Due Date From failed !");
      }
      if (DueDateTo) {
        temp = await caseSearchFilter.inputDueDateToOnSearchAndFilterFormForCase(DueDateTo);
        logFailTestcase(temp, "Input Due Date To failed !");
      }
      if (CreatedDateFrom) {
        temp = await caseSearchFilter.inputCreatedDateFromOnSearchAndFilterFormForCase(CreatedDateFrom);
        logFailTestcase(temp, "Input Created Date From failed !");
      }
      if (CreatedDateTo) {
        temp = await caseSearchFilter.inputCreatedDateToOnSearchAndFilterFormForCase(DueDateTo);
        logFailTestcase(temp, "Input Created Date To failed !");
      }


      temp = await globalPageObject.pressClearSearchAndFilter();
      logFailTestcase(temp, "Press Clear at Search and Filter failed!");


      if (DueDateFromSecond) {
        temp = await caseSearchFilter.inputDueDateFromOnSearchAndFilterFormForCase(DueDateFromSecond, true);
        logFailTestcase(temp, "Clear data Due Data To failed !");
      }
      if (DueDateToSecond) {
        temp = await caseSearchFilter.inputDueDateToOnSearchAndFilterFormForCase(DueDateToSecond, true);
        logFailTestcase(temp, "Clear data Due Date From failed !");
      }
      if (CreatedDateFromSecond) {
        temp = await caseSearchFilter.inputCreatedDateFromOnSearchAndFilterFormForCase(CreatedDateFromSecond, true);
        logFailTestcase(temp, "Clear data Created Date To failed !");
      }
      if (CreatedDateToSecond) {
        temp = await caseSearchFilter.inputCreatedDateToOnSearchAndFilterFormForCase(CreatedDateToSecond, true);
        logFailTestcase(temp, "Clear data Created Date From failed ");
      }

    }
  });