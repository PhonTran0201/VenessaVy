import { Before, Given } from "@cucumber/cucumber";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { GlobalPagination } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPagination";
import { GlobalSortTable } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalSortTable";
import { QuoteListInsurance } from "../../../../page-objects/back-office-portal/insurance/quote/quote-list/QuoteListInsurance";
import { logFailTestcase, logInfoMessage } from '../../../../shared/functions';
import { ICommonContext } from "../../../../shared/interfaces";


let quoteListInsurance: QuoteListInsurance;
let globalSortTable: GlobalSortTable;
let globalPageObject: GlobalPageObject;
let globalPagination: GlobalPagination;

Before(async function () {
  const context: ICommonContext = this.context;
  quoteListInsurance = new QuoteListInsurance(context.driverService);
  globalSortTable = new GlobalSortTable(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
  globalPagination = new GlobalPagination(context.driverService);
});

Given("User checks sorting at column Reference on Quote list at Account detail", async () => {
  let totalNumberOfRecords = await globalPageObject.getNumberOfTotalRecordsSubTab();
  let numberItemPage = parseInt(await globalPagination.getCurrentSelectingItemPageNumberAtSubList()) || 10;
  let count = totalNumberOfRecords >= numberItemPage ? numberItemPage : totalNumberOfRecords;

  logInfoMessage("Checking sort up...");
  let temp = await globalSortTable.pressSortUpColumnAtSubList("Reference");
  logFailTestcase(temp, `Press sort up at column "Reference" failed!`);

  let arrayReference: string[] = [];
  for (let i = 1; i <= count; i++) {
    let Reference = await quoteListInsurance.getValueReferenceOnQuoteListByRow(i);
    arrayReference.push(Reference === "N/A" ? "" : Reference);
  }
  temp = await globalSortTable.isColumnSortingUp(arrayReference);
  logFailTestcase(temp, `Sort Up at column up at column "Reference" failed!`);


  logInfoMessage("Checking sort down...");
  arrayReference = [];
  temp = await globalSortTable.pressSortDownColumnAtSubList("Reference");
  logFailTestcase(temp, `Press sort down at column "Reference" failed!`);
  for (let i = 1; i <= count; i++) {
    arrayReference.push(await quoteListInsurance.getValueReferenceOnQuoteListByRow(i));
  }
  temp = await globalSortTable.isColumnSortingDown(arrayReference);
  logFailTestcase(temp, `Sort down at column "Reference" failed!`);
});

Given("User checks sorting at column Status on Quote list at Account detail", async () => {
  let totalNumberOfRecords = await globalPageObject.getNumberOfTotalRecordsSubTab();
  let numberItemPage = parseInt(await globalPagination.getCurrentSelectingItemPageNumberAtSubList()) || 10;
  let count = totalNumberOfRecords >= numberItemPage ? numberItemPage : totalNumberOfRecords;

  logInfoMessage("Checking sort up...");
  let temp = await globalSortTable.pressSortUpColumnAtSubList("Status");
  logFailTestcase(temp, `Press sort up at column "Status" failed!`);

  let arrayStatus: string[] = [];
  for (let i = 1; i <= count; i++) {
    let Status = await quoteListInsurance.getValueStatusOnQuoteListByRow(i);
    arrayStatus.push(Status === "N/A" ? "" : Status);
  }
  temp = await globalSortTable.isColumnSortingUp(arrayStatus);
  logFailTestcase(temp, `Sort Up at column "Status" failed!`);


  logInfoMessage("Checking sort down...");
  arrayStatus = [];
  temp = await globalSortTable.pressSortDownColumnAtSubList("Status");
  logFailTestcase(temp, `Press sort down at column "Status" failed!`);
  for (let i = 1; i <= count; i++) {
    arrayStatus.push(await quoteListInsurance.getValueStatusOnQuoteListByRow(i));
  }
  temp = await globalSortTable.isColumnSortingDown(arrayStatus);
  logFailTestcase(temp, `Sort down at column "Status" failed!`);
});

Given("User checks sorting at column Created Date on Quote list at Account detail", async () => {
  let totalNumberOfRecords = await globalPageObject.getNumberOfTotalRecordsSubTab();
  let numberItemPage = parseInt(await globalPagination.getCurrentSelectingItemPageNumberAtSubList()) || 10;
  let count = totalNumberOfRecords >= numberItemPage ? numberItemPage : totalNumberOfRecords;

  logInfoMessage("Checking sort up...");
  let temp = await globalSortTable.pressSortUpColumnAtSubList("Created Date");
  logFailTestcase(temp, `Press sort up at column "Created Date" failed!`);

  let arrayCreatedDate: string[] = [];
  for (let i = 1; i <= count; i++) {
    let CreatedDate = await quoteListInsurance.getValueCreatedDateOnQuoteListByRow(i);
    arrayCreatedDate.push(CreatedDate === "N/A" ? "" : CreatedDate);
  }
  
  temp = await globalSortTable.isColumnDateSortingUp(arrayCreatedDate);
  logFailTestcase(temp, `Sort Up at column "Created Date" failed!`);


  logInfoMessage("Checking sort down...");
  arrayCreatedDate = [];
  temp = await globalSortTable.pressSortDownColumnAtSubList("Created Date");
  logFailTestcase(temp, `Press sort down at column "Created Date" failed!`);
  for (let i = 1; i <= count; i++) {
    arrayCreatedDate.push(await quoteListInsurance.getValueCreatedDateOnQuoteListByRow(i));
  }
  temp = await globalSortTable.isColumnDateSortingDown(arrayCreatedDate);
  logFailTestcase(temp, `Sort down at column "Created Date" failed!`);
});