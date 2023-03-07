import { Before, Then, When } from "@cucumber/cucumber";
import { CaseList } from "../../../../page-objects/back-office-portal/general/case/case-list/CaseList";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { GlobalPagination } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPagination";
import { GlobalSortTable } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalSortTable";
import { convertPathFileDataToDataRegression, logFailTestcase, logInfoMessage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";

const loader = require("csv-load-sync");
let caseList: CaseList;
let globalPageObject: GlobalPageObject;
let globalPagination: GlobalPagination;
let globalSortTable: GlobalSortTable;


Before(async function () {
  const context: ICommonContext = this.context;
  caseList = new CaseList(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
  globalPagination = new GlobalPagination(context.driverService);
  globalSortTable = new GlobalSortTable(context.driverService);
});

When('User checks filter at column Status on Cases list at Contacts detail {string}', async (filename) => {
  let temp = await caseList.pressStatusFilterOnList();
  logFailTestcase(temp, 'press Status Filter On List failed!');
  const rows = loader(convertPathFileDataToDataRegression(filename));
  for (let i = 0; i < rows.length; i++) {
    const Status = rows[i].Status;
    const NumberCases = rows[i].NumberCases;

    temp = await caseList.selectStatusToFilterStatusColumnOnList(Status);
    logFailTestcase(temp, `select '${Status}' on status dropdown failed!`);

    let totalNumberOfRecords = await globalPageObject.getNumberOfTotalRecordsSubTab();
    let numberItemPage = parseInt(await globalPagination.getCurrentSelectingItemPageNumberAtSubList()) || 10;
    let count = totalNumberOfRecords >= numberItemPage ? numberItemPage : totalNumberOfRecords;

    logInfoMessage("Checking Status filter...");
    if (NumberCases != 0) { // expected multiple return record but not found
      logFailTestcase(count > 0, `${count} return record so Filter by '${Status}' status failed! `);
    }

    let arrayStatus: string[] = [];
    for (let i = 1; i <= count; i++) {
      let StatusValue = await caseList.getStatusValueOnList(i);
      arrayStatus.push(StatusValue === "N/A" ? "" : StatusValue);
    }

    for (let i = 0; i < arrayStatus.length; i++) {
      if (arrayStatus[i].localeCompare(Status) != 0) {
        logFailTestcase(false, `Incorrect filter status at line ${i + 1}`);
      }
    }
  }
});


Then("User checks sorting at column Created Date on Case list at Contact detail", async () => {
  let totalNumberOfRecords = await globalPageObject.getNumberOfTotalRecordsSubTab();
  let numberItemPage = parseInt(await globalPagination.getCurrentSelectingItemPageNumberAtSubList()) || 10;
  let count = totalNumberOfRecords >= numberItemPage ? numberItemPage : totalNumberOfRecords;

  logInfoMessage("Checking sort up...");
  let temp = await globalSortTable.pressSortUpColumnAtSubList("Created date");
  logFailTestcase(temp, `Press sort up at column "Created Date" failed!`);

  let arrayCreatedDate: string[] = [];
  for (let i = 1; i <= count; i++) {
    let CreatedDate = await caseList.getValueCreatedDateOnCaseListByRow(i);
    arrayCreatedDate.push(CreatedDate === "N/A" ? "" : CreatedDate);
  }

  temp = await globalSortTable.isColumnDateSortingUp(arrayCreatedDate);
  logFailTestcase(temp, `Sort Up at column "Created Date" failed!`);


  logInfoMessage("Checking sort down...");
  arrayCreatedDate = [];
  temp = await globalSortTable.pressSortDownColumnAtSubList("Created date");
  logFailTestcase(temp, `Press sort down at column "Created Date" failed!`);
  for (let i = 1; i <= count; i++) {
    arrayCreatedDate.push(await caseList.getValueCreatedDateOnCaseListByRow(i));
  }
  temp = await globalSortTable.isColumnDateSortingDown(arrayCreatedDate);
  logFailTestcase(temp, `Sort down at column "Created Date" failed!`);
});

Then("User checks sorting at column Due Date on Case list at Contact detail", async () => {
  let totalNumberOfRecords = await globalPageObject.getNumberOfTotalRecordsSubTab();
  let numberItemPage = parseInt(await globalPagination.getCurrentSelectingItemPageNumberAtSubList()) || 10;
  let count = totalNumberOfRecords >= numberItemPage ? numberItemPage : totalNumberOfRecords;

  logInfoMessage("Checking sort up...");
  let temp = await globalSortTable.pressSortUpColumnAtSubList("Due date");
  logFailTestcase(temp, `Press sort up at column "Due Date" failed!`);

  let arrayCreatedDate: string[] = [];
  for (let i = 1; i <= count; i++) {
    let CreatedDate = await caseList.getValueDueDateOnCaseListByRow(i);
    arrayCreatedDate.push(CreatedDate === "N/A" ? "" : CreatedDate);
  }

  temp = await globalSortTable.isColumnDateSortingUp(arrayCreatedDate);
  logFailTestcase(temp, `Sort Up at column "Due Date" failed!`);


  logInfoMessage("Checking sort down...");
  arrayCreatedDate = [];
  temp = await globalSortTable.pressSortDownColumnAtSubList("Due date");
  logFailTestcase(temp, `Press sort down at column "Due Date" failed!`);
  for (let i = 1; i <= count; i++) {
    arrayCreatedDate.push(await caseList.getValueDueDateOnCaseListByRow(i));
  }
  temp = await globalSortTable.isColumnDateSortingDown(arrayCreatedDate);
  logFailTestcase(temp, `Sort down at column "Due Date" failed!`);
});

Then("User checks sorting at column Priority on Case list at Contact detail {string}", async (filename) => {
  // let totalNumberOfRecords = await globalPageObject.getNumberOfTotalRecordsSubTab();
  // let numberItemPage = parseInt(await globalPagination.getCurrentSelectingItemPageNumberAtSubList()) || 10;
  // let count = totalNumberOfRecords >= numberItemPage ? numberItemPage : totalNumberOfRecords;

  // logInfoMessage("Checking sort up...");
  // let temp = await globalSortTable.pressSortUpColumnAtSubList("Priority");
  // logFailTestcase(temp, `Press sort up at column "Priority" failed!`);

  // let arrayStandardStatus: string[] = [];
  // let arrayStatus: string[] = [];


  // let rows = loader(convertPathFileDataToDataRegression(filename));
  // for (let i = 0; i < rows.length; i++) {
  //   let PriorityName = rows[i].PriorityName;
  //   let PriorityLevel = rows[i].PriorityLevel;
    
  // }


  // for (let j = 1; j <= count; j++) {
  //   let PriorityActual = await caseList.getValuePriorityOnCaseListByRow(j);
  //   if (PriorityActual.localeCompare(PriorityName) === 0) {
  //     PriorityActual = PriorityLevel;
  //   } else {
  //     PriorityActual = "N/A";
  //   }
  //   arrayStatus.push(PriorityActual === "N/A" ? "" : PriorityActual);
  // }
  // console.log(arrayStatus);

  // temp = await globalSortTable.isColumnSortingUp(arrayStatus);
  // logFailTestcase(temp, `Sort Up at column "Priority" failed!`);


  // logInfoMessage("Checking sort down...");
  // arrayStatus = [];
  // temp = await globalSortTable.pressSortDownColumnAtSubList("Priority");
  // logFailTestcase(temp, `Press sort down at column "Priority" failed!`);
  // for (let i = 1; i <= count; i++) {
  //   let Priority = await caseList.getValuePriorityOnCaseListByRow(i);
  //   if (Priority.localeCompare('Critical') === 0) {
  //     Priority = "4";
  //   } else if (Priority.localeCompare('High') === 0) {
  //     Priority = "3";
  //   } else if (Priority.localeCompare('Normal') === 0) {
  //     Priority = "2";
  //   } else if (Priority.localeCompare('Low') === 0) {
  //     Priority = "1";
  //   } else {
  //     Priority = "N/A";
  //   }
  //   arrayStatus.push(Priority);
  // }
  // temp = await globalSortTable.isColumnSortingDown(arrayStatus);
  // logFailTestcase(temp, `Sort down at column "Priority" failed!`);
});
