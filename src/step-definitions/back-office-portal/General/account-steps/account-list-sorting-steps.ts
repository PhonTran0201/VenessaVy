import { Before, Given } from "@cucumber/cucumber";
import { AccountList } from "../../../../page-objects/back-office-portal/general/account/account-list/AccountList";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { GlobalPagination } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPagination";
import { GlobalSortTable } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalSortTable";
import { logFailTestcase, logInfoMessage } from '../../../../shared/functions';
import { ICommonContext } from "../../../../shared/interfaces";


let accountList: AccountList;
let globalSortTable: GlobalSortTable;
let globalPageObject: GlobalPageObject;
let globalPagination: GlobalPagination;


Before(async function () {
  const context: ICommonContext = this.context;
  accountList = new AccountList(context.driverService);
  globalSortTable = new GlobalSortTable(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
  globalPagination = new GlobalPagination(context.driverService);
});

Given("User checks sorting at column Name on Account list", async () => {
  let totalNumberOfRecords = await globalPageObject.getNumberOfTotalRecordsMainTab();
  let numberItemPage = parseInt(await globalPagination.getCurrentSelectingItemPageNumberAtMainList()) || 10;
  let count = totalNumberOfRecords >= numberItemPage ? numberItemPage : totalNumberOfRecords;

  logInfoMessage("Checking sort up...");
  let temp = await globalSortTable.pressSortUpColumnAtMainList("Name");
  logFailTestcase(temp, `Press sort up at column "Name" failed!`);

  let arrayName: string[] = [];
  for (let i = 1; i <= count; i++) {
    arrayName.push(await accountList.getValueNameOnAccountListByRow(i));
  }
  temp = await globalSortTable.isColumnSortingUp(arrayName);
  logFailTestcase(temp, "Sort Up at column name on Account list falied!");


  logInfoMessage("Checking sort down...");
  arrayName = [];
  temp = await globalSortTable.pressSortDownColumnAtMainList("Name");
  logFailTestcase(temp, `Press sort down at column "Name" failed!`);
  for (let i = 1; i <= count; i++) {
    arrayName.push(await accountList.getValueNameOnAccountListByRow(i));
  }
  temp = await globalSortTable.isColumnSortingDown(arrayName);
  logFailTestcase(temp, "Sort down at column name on Account list falied!");
});

Given("User checks sorting at column OrgNo on Account list", async () => {
  let totalNumberOfRecords = await globalPageObject.getNumberOfTotalRecordsMainTab();
  let numberItemPage = parseInt(await globalPagination.getCurrentSelectingItemPageNumberAtMainList()) || 10;
  let count = totalNumberOfRecords >= numberItemPage ? numberItemPage : totalNumberOfRecords;

  logInfoMessage("Checking sort up...");
  let temp = await globalSortTable.pressSortUpColumnAtMainList("NIN/Org no.");
  logFailTestcase(temp, `Press sort up at column "NIN/Org no." failed!`);

  let arrayOrg: string[] = [];
  for (let i = 1; i <= count; i++) {
    let Org = await accountList.getValueOrgOnAccountListByRow(i);
    arrayOrg.push(Org === "N/A" ? "" : Org);
  }
  temp = await globalSortTable.isColumnSortingUp(arrayOrg);
  logFailTestcase(temp, "Sort Up at column NIN/Org no. on Account list falied!");


  logInfoMessage("Checking sort down...");
  arrayOrg = [];
  temp = await globalSortTable.pressSortDownColumnAtMainList("NIN/Org no.");
  logFailTestcase(temp, `Press sort down at column "NIN/Org no." failed!`);
  for (let i = 1; i <= count; i++) {
    arrayOrg.push(await accountList.getValueOrgOnAccountListByRow(i));
  }
  temp = await globalSortTable.isColumnSortingDown(arrayOrg);
  logFailTestcase(temp, "Sort down at column Org on Account list falied!");
});

Given("User checks sorting at column Reference on Account list", async () => {
  let totalNumberOfRecords = await globalPageObject.getNumberOfTotalRecordsMainTab();
  let numberItemPage = parseInt(await globalPagination.getCurrentSelectingItemPageNumberAtMainList()) || 10;
  let count = totalNumberOfRecords >= numberItemPage ? numberItemPage : totalNumberOfRecords;

  logInfoMessage("Checking sort up...");
  let temp = await globalSortTable.pressSortUpColumnAtMainList("Reference");
  logFailTestcase(temp, `Press sort up at column "Reference" failed!`);

  let arrayReference: string[] = [];
  for (let i = 1; i <= count; i++) {
    arrayReference.push(await accountList.getValueReferenceOnAccountListByRow(i));
  }
  temp = await globalSortTable.isColumnSortingUp(arrayReference);
  logFailTestcase(temp, "Sort Up at column Reference on Account list falied!");


  logInfoMessage("Checking sort down...");
  arrayReference = [];
  temp = await globalSortTable.pressSortDownColumnAtMainList("Reference");
  logFailTestcase(temp, `Press sort down at column "Reference" failed!`);
  for (let i = 1; i <= count; i++) {
    arrayReference.push(await accountList.getValueReferenceOnAccountListByRow(i));
  }
  temp = await globalSortTable.isColumnSortingDown(arrayReference);
  logFailTestcase(temp, "Sort down at column Reference on Account list falied!");
});

Given("User checks sorting at column Status on Account list", async () => {
  let totalNumberOfRecords = await globalPageObject.getNumberOfTotalRecordsMainTab();
  let numberItemPage = parseInt(await globalPagination.getCurrentSelectingItemPageNumberAtMainList()) || 10;
  let count = totalNumberOfRecords >= numberItemPage ? numberItemPage : totalNumberOfRecords;

  logInfoMessage("Checking sort up...");
  let temp = await globalSortTable.pressSortUpColumnAtMainList("Status");
  logFailTestcase(temp, `Press sort up at column "Status" failed!`);

  let arrayStatus: string[] = [];
  for (let i = 1; i <= count; i++) {
    arrayStatus.push(await accountList.getValueStatusOnAccountListByRow(i));
  }
  temp = await globalSortTable.isColumnSortingUp(arrayStatus);
  logFailTestcase(temp, "Sort Up at column Status on Account list falied!");


  logInfoMessage("Checking sort down...");
  arrayStatus = [];
  temp = await globalSortTable.pressSortDownColumnAtMainList("Status");
  logFailTestcase(temp, `Press sort down at column "Status" failed!`);
  for (let i = 1; i <= count; i++) {
    arrayStatus.push(await accountList.getValueStatusOnAccountListByRow(i));
  }
  temp = await globalSortTable.isColumnSortingDown(arrayStatus);
  logFailTestcase(temp, "Sort down at column Status on Account list falied!");
});