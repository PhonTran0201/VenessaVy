import { Before, Given } from "@cucumber/cucumber";
import { SeleniumWebDriverService } from "../../../../core/selenium-webdriver.service";
import { GlobalConfigColumn } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalConfigColumn";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { GlobalPagination } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPagination";
import { GlobalSortTable } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalSortTable";
import { PolicyListInsurance } from "../../../../page-objects/back-office-portal/insurance/policy/policy-list/PolicyListInsurance";
import { logFailTestcase, logInfoMessage } from '../../../../shared/functions';
import { ICommonContext } from "../../../../shared/interfaces";


let policyListInsurance: PolicyListInsurance;
let globalSortTable: GlobalSortTable;
let globalPageObject: GlobalPageObject;
let globalPagination: GlobalPagination;

Before(async function () {
  const context: ICommonContext = this.context;
  policyListInsurance = new PolicyListInsurance(context.driverService);
  globalSortTable = new GlobalSortTable(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
  globalPagination = new GlobalPagination(context.driverService);
});

Given("User checks sorting at column Reference on Policy list at Account detail", async () => {
  let totalNumberOfRecords = await globalPageObject.getNumberOfTotalRecordsSubTab();
  let numberItemPage = parseInt(await globalPagination.getCurrentSelectingItemPageNumberAtSubList()) || 10;
  let count = totalNumberOfRecords >= numberItemPage ? numberItemPage : totalNumberOfRecords;

  logInfoMessage("Checking sort up...");
  let temp = await globalSortTable.pressSortUpColumnAtSubList("Reference");
  logFailTestcase(temp, `Press sort up at column "Reference" failed!`);

  let arrayReference: string[] = [];
  for (let i = 1; i <= count; i++) {
    let Reference = await policyListInsurance.getValueReferenceOnPolicyListByRow(i);
    arrayReference.push(Reference === "N/A" ? "" : Reference);
  }
  temp = await globalSortTable.isColumnSortingUp(arrayReference);
  logFailTestcase(temp, `Sort Up at column up at column "Reference" failed!`);


  logInfoMessage("Checking sort down...");
  arrayReference = [];
  temp = await globalSortTable.pressSortDownColumnAtSubList("Reference");
  logFailTestcase(temp, `Press sort down at column "Reference" failed!`);
  for (let i = 1; i <= count; i++) {
    let Reference = await policyListInsurance.getValueReferenceOnPolicyListByRow(i);
    arrayReference.push(Reference === "N/A" ? "" : Reference);
  }
  temp = await globalSortTable.isColumnSortingDown(arrayReference);
  logFailTestcase(temp, `Sort down at column "Reference" failed!`);
});

Given("User checks sorting at column Description on Policy list at Account detail", async () => {
  let totalNumberOfRecords = await globalPageObject.getNumberOfTotalRecordsSubTab();
  let numberItemPage = parseInt(await globalPagination.getCurrentSelectingItemPageNumberAtSubList()) || 10;
  let count = totalNumberOfRecords >= numberItemPage ? numberItemPage : totalNumberOfRecords;

  logInfoMessage("Checking sort up...");
  let temp = await globalSortTable.pressSortUpColumnAtSubList("Description");
  logFailTestcase(temp, `Press sort up at column "Description" failed!`);

  let arrayDescription: string[] = [];
  for (let i = 1; i <= count; i++) {
    let Description = await policyListInsurance.getValueDescriptionOnPolicyListByRow(i);
    arrayDescription.push(Description === "N/A" ? "" : Description);
  }
  temp = await globalSortTable.isColumnSortingUp(arrayDescription);
  logFailTestcase(temp, `Sort Up at column up at column "Description" failed!`);


  logInfoMessage("Checking sort down...");
  arrayDescription = [];
  temp = await globalSortTable.pressSortDownColumnAtSubList("Description");
  logFailTestcase(temp, `Press sort down at column "Description" failed!`);
  for (let i = 1; i <= count; i++) {
    let Description = await policyListInsurance.getValueDescriptionOnPolicyListByRow(i);
    arrayDescription.push(Description === "N/A" ? "" : Description);
  }
  temp = await globalSortTable.isColumnSortingDown(arrayDescription);
  logFailTestcase(temp, `Sort down at column "Description" failed!`);
});

Given("User checks sorting at column Product on Policy list at Account detail", async () => {
  let totalNumberOfRecords = await globalPageObject.getNumberOfTotalRecordsSubTab();
  let numberItemPage = parseInt(await globalPagination.getCurrentSelectingItemPageNumberAtSubList()) || 10;
  let count = totalNumberOfRecords >= numberItemPage ? numberItemPage : totalNumberOfRecords;

  logInfoMessage("Checking sort up...");
  let temp = await globalSortTable.pressSortUpColumnAtSubList("Product");
  logFailTestcase(temp, `Press sort up at column "Product" failed!`);

  let arrayProduct: string[] = [];
  for (let i = 1; i <= count; i++) {
    let Product = await policyListInsurance.getValueProductOnPolicyListByRow(i);
    arrayProduct.push(Product === "N/A" ? "" : Product);
  }
  temp = await globalSortTable.isColumnSortingUp(arrayProduct);
  logFailTestcase(temp, `Sort Up at column up at column "Product" failed!`);


  logInfoMessage("Checking sort down...");
  arrayProduct = [];
  temp = await globalSortTable.pressSortDownColumnAtSubList("Product");
  logFailTestcase(temp, `Press sort down at column "Product" failed!`);
  for (let i = 1; i <= count; i++) {
    let Product = await policyListInsurance.getValueProductOnPolicyListByRow(i);
    arrayProduct.push(Product === "N/A" ? "" : Product);
  }
  temp = await globalSortTable.isColumnSortingDown(arrayProduct);
  logFailTestcase(temp, `Sort down at column "Product" failed!`);
});

Given("User checks sorting at column Status on Policy list at Account detail", async () => {
  let totalNumberOfRecords = await globalPageObject.getNumberOfTotalRecordsSubTab();
  let numberItemPage = parseInt(await globalPagination.getCurrentSelectingItemPageNumberAtSubList()) || 10;
  let count = totalNumberOfRecords >= numberItemPage ? numberItemPage : totalNumberOfRecords;

  logInfoMessage("Checking sort up...");
  let temp = await globalSortTable.pressSortUpColumnAtSubList("Status");
  logFailTestcase(temp, `Press sort up at column "Status" failed!`);

  let arrayStatus: string[] = [];
  for (let i = 1; i <= count; i++) {
    let Status = await policyListInsurance.getValueStatusOnPolicyListByRow(i);
    arrayStatus.push(Status === "N/A" ? "" : Status);
  }
  temp = await globalSortTable.isColumnSortingUp(arrayStatus);
  logFailTestcase(temp, `Sort Up at column "Status" failed!`);


  logInfoMessage("Checking sort down...");
  arrayStatus = [];
  temp = await globalSortTable.pressSortDownColumnAtSubList("Status");
  logFailTestcase(temp, `Press sort down at column "Status" failed!`);
  for (let i = 1; i <= count; i++) {
    let Status = await policyListInsurance.getValueStatusOnPolicyListByRow(i);
    arrayStatus.push(Status === "N/A" ? "" : Status);
  }
  temp = await globalSortTable.isColumnSortingDown(arrayStatus);
  logFailTestcase(temp, `Sort down at column "Status" failed!`);
});

Given("User checks sorting at column Created on Policy list at Account detail", async () => {
  await globalPageObject.expandNumberOfItemSubList(50);
  await globalPageObject.waitForProgressBarLoaded_v2();
  let totalNumberOfRecords = await globalPageObject.getNumberOfTotalRecordsSubTab();
  let numberItemPage = parseInt(await globalPagination.getCurrentSelectingItemPageNumberAtSubList()) || 10;
  let count = totalNumberOfRecords >= numberItemPage ? numberItemPage : totalNumberOfRecords;

  let temp = true;
  //#region Check xem cột Created date có bị set default là untick hay không
  // Nếu untick thì mình tick
  const globalConfigColumn = new GlobalConfigColumn(SeleniumWebDriverService.getInstance());
  temp = await globalConfigColumn.pressConfigColumnButtonAtSubTab();
  logFailTestcase(temp, `Press config column at Policy list failed!`);

  temp = await globalConfigColumn.isConfigColumnItemCheckingByName("Created");
  if (!temp) {
    temp = await globalConfigColumn.checkConfigColumnItemByName("Created");
    logFailTestcase(temp, `Tick "Created" at config column failed!`);
    await globalConfigColumn.pressConfigColumnButtonAtSubTab();
  }
  //#endregion

  logInfoMessage("Checking sort up...");
  temp = await globalSortTable.pressSortUpColumnAtSubList("Created");
  logFailTestcase(temp, `Press sort up at column "Created" failed!`);

  let arrayCreated: string[] = [];
  for (let i = 1; i <= count; i++) {
    let Created = await policyListInsurance.getValueCreatedOnPolicyListByRow(i);
    arrayCreated.push(Created === "N/A" ? "" : Created);
  }
  temp = await globalSortTable.isColumnRecentDatesSortingUp(arrayCreated);
  logFailTestcase(temp, `Sort Up at column up at column "Created" failed!`);


  logInfoMessage("Checking sort down...");
  arrayCreated = [];
  temp = await globalSortTable.pressSortDownColumnAtSubList("Created");
  logFailTestcase(temp, `Press sort down at column "Created" failed!`);
  for (let i = 1; i <= count; i++) {
    let Created = await policyListInsurance.getValueCreatedOnPolicyListByRow(i);
    arrayCreated.push(Created === "N/A" ? "" : Created);
  }
  temp = await globalSortTable.isColumnRecentDatesSortingDown(arrayCreated);
  logFailTestcase(temp, `Sort down at column "Created" failed!`);
});