import { Before, Then } from "@cucumber/cucumber";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { GlobalPagination } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPagination";
import { GlobalSortTable } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalSortTable";
import { ClaimListInsurance } from "../../../../page-objects/back-office-portal/insurance/claim/claim-list/ClaimListInsurance";
import { logFailTestcase, logInfoMessage } from '../../../../shared/functions';
import { ICommonContext } from "../../../../shared/interfaces";


let claimListInsurance: ClaimListInsurance;
let globalSortTable: GlobalSortTable;
let globalPageObject: GlobalPageObject;
let globalPagination: GlobalPagination;

Before(async function () {
  const context: ICommonContext = this.context;
  claimListInsurance = new ClaimListInsurance(context.driverService);
  globalSortTable = new GlobalSortTable(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
  globalPagination = new GlobalPagination(context.driverService);
});

Then("User checks sorting at Reference column on Claim list", async () => {
  let totalNumberOfRecords = await globalPageObject.getNumberOfTotalRecordsMainTab();
  let numberItemPage = parseInt(await globalPagination.getCurrentSelectingItemPageNumberAtMainList()) || 10;
  let count = totalNumberOfRecords >= numberItemPage ? numberItemPage : totalNumberOfRecords;

  logInfoMessage("Checking sort up...");
  let temp = await globalSortTable.pressSortUpColumnAtMainList("Reference");
  logFailTestcase(temp, `Press sort up at column "Reference" failed!`);

  let arrayReference: string[] = [];
  for (let i = 1; i <= count; i++) {
    let Reference = (await claimListInsurance.getReferenceIdClaimList(i)).toString();
    arrayReference.push(Reference);
  }
  temp = await globalSortTable.isColumnSortingUp(arrayReference);
  logFailTestcase(temp, `Sort Up at column up at column "Reference" failed!`);


  logInfoMessage("Checking sort down...");
  arrayReference = [];
  temp = await globalSortTable.pressSortDownColumnAtMainList("Reference");
  logFailTestcase(temp, `Press sort down at column "Reference" failed!`);
  for (let i = 1; i <= count; i++) {
    arrayReference.push((await claimListInsurance.getReferenceIdClaimList(i)).toString());
  }
  temp = await globalSortTable.isColumnSortingDown(arrayReference);
  logFailTestcase(temp, `Sort down at column "Reference" failed!`);
});

Then("User checks sorting at Object Name column on Claim list", async () => {
  let totalNumberOfRecords = await globalPageObject.getNumberOfTotalRecordsMainTab();
  let numberItemPage = parseInt(await globalPagination.getCurrentSelectingItemPageNumberAtMainList()) || 10;
  let count = totalNumberOfRecords >= numberItemPage ? numberItemPage : totalNumberOfRecords;

  logInfoMessage("Checking sort up...");
  let temp = await globalSortTable.pressSortUpColumnAtMainList("Object name");
  logFailTestcase(temp, `Press sort up at column "Object Name" failed!`);

  let arrayObjectName: string[] = [];
  for (let i = 1; i <= count; i++) {
    let ObjectName = await claimListInsurance.getObjectNameClaimList(i)
    arrayObjectName.push(ObjectName === "N/A" ? "" : ObjectName);
  }
  temp = await globalSortTable.isColumnSortingUp(arrayObjectName);
  logFailTestcase(temp, `Sort Up at column "Object Name" failed!`);


  logInfoMessage("Checking sort down...");
  arrayObjectName = [];
  temp = await globalSortTable.pressSortDownColumnAtMainList("Object name");
  logFailTestcase(temp, `Press sort down at column "Object Name" failed!`);
  for (let i = 1; i <= count; i++) {
    arrayObjectName.push(await claimListInsurance.getObjectNameClaimList(i));
  }
  temp = await globalSortTable.isColumnSortingDown(arrayObjectName);
  logFailTestcase(temp, `Sort down at column "Object Name" failed!`);
});

Then("User checks sorting at Date Of Loss column on Claim list",async () => {
  let totalNumberOfRecords = await globalPageObject.getNumberOfTotalRecordsMainTab();
  let numberItemPage = parseInt(await globalPagination.getCurrentSelectingItemPageNumberAtMainList()) || 10;
  let count = totalNumberOfRecords >= numberItemPage ? numberItemPage : totalNumberOfRecords;

  logInfoMessage("Checking sort up...");
  let temp = await globalSortTable.pressSortUpColumnAtMainList("Date of loss");
  logFailTestcase(temp, `Press sort up at column "Date Of Loss" failed!`);

  let arrayDateOfLoss: string[] = [];
  for (let i = 1; i <= count; i++) {
    let DateOfLoss = await claimListInsurance.getDateOfLossClaimList(i);
    arrayDateOfLoss.push(DateOfLoss === "N/A" ? "" : DateOfLoss);
  }
  
  temp = await globalSortTable.isColumnDateSortingUp(arrayDateOfLoss);
  logFailTestcase(temp, `Sort Up at column "Date Of Loss" failed!`);


  logInfoMessage("Checking sort down...");
  arrayDateOfLoss = [];
  temp = await globalSortTable.pressSortDownColumnAtMainList("Date of loss");
  logFailTestcase(temp, `Press sort down at column "Date Of Loss" failed!`);
  for (let i = 1; i <= count; i++) {
    arrayDateOfLoss.push(await claimListInsurance.getDateOfLossClaimList(i));
  }
  temp = await globalSortTable.isColumnDateSortingDown(arrayDateOfLoss);
  logFailTestcase(temp, `Sort down at column "Date Of Loss" failed!`);
});


Then("User checks sorting at Reported Date column on Claim list",async () => {
  let totalNumberOfRecords = await globalPageObject.getNumberOfTotalRecordsMainTab();
  let numberItemPage = parseInt(await globalPagination.getCurrentSelectingItemPageNumberAtMainList()) || 10;
  let count = totalNumberOfRecords >= numberItemPage ? numberItemPage : totalNumberOfRecords;

  logInfoMessage("Checking sort up...");
  let temp = await globalSortTable.pressSortUpColumnAtMainList("Reported date");
  logFailTestcase(temp, `Press sort up at column "Reported date" failed!`);

  let arrayReportedDate: string[] = [];
  for (let i = 1; i <= count; i++) {
    let ReportedDate = await claimListInsurance.getReportedDateClaimList(i);
    arrayReportedDate.push(ReportedDate === "N/A" ? "" : ReportedDate);
  }
  
  temp = await globalSortTable.isColumnDateSortingUp(arrayReportedDate);
  logFailTestcase(temp, `Sort Up at column "Reported date" failed!`);


  logInfoMessage("Checking sort down...");
  arrayReportedDate = [];
  temp = await globalSortTable.pressSortDownColumnAtMainList("Reported date");
  logFailTestcase(temp, `Press sort down at column "Reported date" failed!`);
  for (let i = 1; i <= count; i++) {
    arrayReportedDate.push(await claimListInsurance.getReportedDateClaimList(i));
  }
  temp = await globalSortTable.isColumnDateSortingDown(arrayReportedDate);
  logFailTestcase(temp, `Sort down at column "Reported date" failed!`);
});


Then("User checks sorting at Status column on Claim list", async () => {
  let totalNumberOfRecords = await globalPageObject.getNumberOfTotalRecordsMainTab();
  let numberItemPage = parseInt(await globalPagination.getCurrentSelectingItemPageNumberAtMainList()) || 10;
  let count = totalNumberOfRecords >= numberItemPage ? numberItemPage : totalNumberOfRecords;

  logInfoMessage("Checking sort up...");
  let temp = await globalSortTable.pressSortUpColumnAtMainList("Status");
  logFailTestcase(temp, `Press sort up at column "Status" failed!`);

  let arrayStatus: string[] = [];
  for (let i = 1; i <= count; i++) {
    let Status = await claimListInsurance.getStatusClaimList(i)
    arrayStatus.push(Status === "N/A" ? "" : Status);
  }
  temp = await globalSortTable.isColumnSortingUp(arrayStatus);
  logFailTestcase(temp, `Sort Up at column "Status" failed!`);


  logInfoMessage("Checking sort down...");
  arrayStatus = [];
  temp = await globalSortTable.pressSortDownColumnAtMainList("Status");
  logFailTestcase(temp, `Press sort down at column "Status" failed!`);
  for (let i = 1; i <= count; i++) {
    arrayStatus.push(await claimListInsurance.getStatusClaimList(i));
  }
  temp = await globalSortTable.isColumnSortingDown(arrayStatus);
  logFailTestcase(temp, `Sort down at column "Status" failed!`);
});


Then("User checks sorting at Product column on Claim list", async () => {
  let totalNumberOfRecords = await globalPageObject.getNumberOfTotalRecordsMainTab();
  let numberItemPage = parseInt(await globalPagination.getCurrentSelectingItemPageNumberAtMainList()) || 10;
  let count = totalNumberOfRecords >= numberItemPage ? numberItemPage : totalNumberOfRecords;

  logInfoMessage("Checking sort up...");
  let temp = await globalSortTable.pressSortUpColumnAtMainList("Product");
  logFailTestcase(temp, `Press sort up at column "Product" failed!`);

  let arrayProduct: string[] = [];
  for (let i = 1; i <= count; i++) {
    let Product = await claimListInsurance.getProductClaimList(i)
    arrayProduct.push(Product === "N/A" ? "" : Product);
  }
  temp = await globalSortTable.isColumnSortingUp(arrayProduct);
  logFailTestcase(temp, `Sort Up at column "Product" failed!`);


  logInfoMessage("Checking sort down...");
  arrayProduct = [];
  temp = await globalSortTable.pressSortDownColumnAtMainList("Product");
  logFailTestcase(temp, `Press sort down at column "Product" failed!`);
  for (let i = 1; i <= count; i++) {
    arrayProduct.push(await claimListInsurance.getProductClaimList(i));
  }
  temp = await globalSortTable.isColumnSortingDown(arrayProduct);
  logFailTestcase(temp, `Sort down at column "Product" failed!`);
});

