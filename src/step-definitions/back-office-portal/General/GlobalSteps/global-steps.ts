import { Before, Given, Then, When } from "@cucumber/cucumber";
import { GlobalBrowserWindowHandle } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalBrowserWindowHandle";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { ProfileForm } from "../../../../page-objects/back-office-portal/general/user-profile/profile-form/ProfileForm";
import { GlobalFormCP } from "../../../../page-objects/customer-portal/general/GlobalPageObject/GlobalFormCP";
import { GlobalPageObjectCPVasam } from "../../../../page-objects/customer-portal/varsam/global-page-object/GlobalPageObjectCPVarsam";
import { PageFactory } from "../../../../page-objects/PageFactory";
import { convertPathFileDataToDataRegression, logFailTestcase, logInfoMessage, logSuccessMessage, logWarningMessage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { scenarioTags } from "../../../../shared/variables";

const loader = require("csv-load-sync");

let globalPageObject: GlobalPageObject;
let globalBrowserWindowHandle: GlobalBrowserWindowHandle;
let profileForm: ProfileForm;
Before(async function () {
  const context: ICommonContext = this.context;
  globalPageObject = new GlobalPageObject(context.driverService);
  globalBrowserWindowHandle = new GlobalBrowserWindowHandle(context.driverService);
  profileForm = new ProfileForm(context.driverService);
  if (scenarioTags.has("@CustomerPortalHogs") || scenarioTags.has("CustomerPortalAtlas")) {
    globalPageObject = new GlobalFormCP(context.driverService);
  }
  else if(scenarioTags.has("@CustomerPortalVarsam")){
    globalPageObject = new GlobalPageObjectCPVasam(context.driverService);
  }
  
});

Given("The system does not request any service", async function () {
  logFailTestcase(!(await globalPageObject.checkProgressBarLoading()), "Some service was requested");
});

Given(`User clicks on "Back" button on page {string} times`, async function (number) {
  for (let i = 0; i < parseInt(number); i++) {
    await globalBrowserWindowHandle.backPage();
  }
});

Then("User reloads page", async () => {
  await globalBrowserWindowHandle.refreshPage();
});

When("User waits {string} seconds", async (numberOfSeconds) => {
  await globalPageObject.waitForSeconds(parseInt(numberOfSeconds) * 1000);
})
//Verify existence of column at sub list
When("User verifies columns on list at {string} tab {string}", async (entityName, filename) => {
  logWarningMessage(`Checking colums on list at "${entityName}" tab:`);
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const NameOfColumns = rows[0].NameOfColumns.split(";");
  await globalPageObject.waitForProgressBarLoaded_v2(500);
  await globalPageObject.waitForProgressBarLoaded_v2(500);
  for (const columnName of NameOfColumns) {
    const temp = await globalPageObject.checkColumnOnSubListExist(columnName);
    logFailTestcase(temp, `Not found column "${columnName}"`);
    logSuccessMessage(`Verify column "${columnName}": passed!`);
  }
});

//Verify existence of column at main list
When("User verifies columns on {string} list {string}", async (entityName, filename) => {
  logWarningMessage(`Checking colums on "${entityName}" list:`);
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const NameOfColumns = rows[0].NameOfColumns.split(";");
  for (const columnName of NameOfColumns) {
    const temp = await globalPageObject.checkColumnOnMainListExist(columnName);
    logFailTestcase(temp, `Not found column "${columnName}"`);
    logSuccessMessage(`Verify column "${columnName}": passed!`);
  }
});

Then("User verifies Column Config icon on list at {string} tab", async (entityName) => {
  const temp = await globalPageObject.checkConfigColumnOnSubListExist();
  logFailTestcase(temp, `Not foung "Config column" on List at "${entityName}" tab`);
});


When("User checks {string} entity detail is opening", async (entityName) => {
  logFailTestcase(await globalPageObject.checkMainEntityDetailIsOpening(""), `Open detail of "${entityName}" failed!`);
});

//#region Begin: Steps at Active tab
Then("User presses {string} button at {string} tab", async function (buttonName, nameTab) {
  await globalPageObject.waitForProgressBarLoaded_v2(500);
  const message = `Press "${buttonName}" button at "${nameTab}" failed!`;
  let temp = true;
  switch (buttonName) {
    case "Create": {
      temp = await globalPageObject.pressCreateTab();
      break;
    }
    case "Save": {
      temp = await globalPageObject.pressSaveTab();
      break;
    }
    case "Reset": {
      temp = await globalPageObject.pressResetTab();
      break;
    }
    case "Hold":{
      temp = await globalPageObject.pressHoldTab();
      break;
    }
    case "Approve":{
      temp = await globalPageObject.pressApproveTab();
      break;
    }
    case "Reject":{
      temp = await globalPageObject.pressRejectTab();
      break;
    }
    case "Complete":{
      temp = await globalPageObject.pressCompleteTab();
      break;
    }
    case "Back":{
      temp = await globalPageObject.pressBackTab();
      break;
    }
    case "Send SMS":{
      temp = await globalPageObject.pressSendSMSTab();
      break;
    }
    default:
      temp = false;
      break;
  }
  logFailTestcase(temp, message);
});
//#region 

//#region Begin: Steps on form
Then("User presses {string} button on {string} form", async function (buttonName, nameForm) {
  await globalPageObject.waitForProgressBarLoaded_v2(500);
  const message = `Press "${buttonName}" button at "${nameForm}" failed!`;
  let temp = true;
  switch (buttonName) {
    case "Register": {
      temp = await globalPageObject.pressRegisterForm();
      break;
    }
    case "Cancel": {
      temp = await globalPageObject.pressCancelForm();
      break;
    }
    case "Save": {
      temp = await globalPageObject.pressSaveForm();
      break;
    }
    case "Terminate": {
      temp = await globalPageObject.pressTerminateForm();
      break;
    }
    case "Recalculate": {
      temp = await globalPageObject.pressRecalculateForm();
      break;
    }
    case "Create": {
      temp = await globalPageObject.pressCreateForm();
      break;
    }
    case "Preview": {
      temp = await globalPageObject.pressPreviewForm();
      break;
    }
    case "Yes": {
      temp = await globalPageObject.pressYesForm();
      break;
    }
    case "No": {
      temp = await globalPageObject.pressNoForm();
      break;
    }
    case "Edit": {
      temp = await globalPageObject.pressEditForm();
      break;
    }
    case "Approve": {
      temp = await globalPageObject.pressApproveForm();
      break;
    }
    case "Application": {
      temp = await globalPageObject.pressApplicationForm();
      break;
    }
    case "Create application": {
      temp = await globalPageObject.pressCreateApplicationForm();
      break;
    }
    case "Accept": {
      temp = await globalPageObject.pressAcceptForm();
      break;
    }
    case "Amend": {
      temp = await globalPageObject.pressAmendForm();
      break;
    }
    case "Reject": {
      temp = await globalPageObject.pressRejectForm();
      break;
    }
    case "Send": {
      temp = await globalPageObject.pressSendForm();
      break;
    }
    case "Resend": {
      temp = await globalPageObject.pressResendForm();
      break;
    }
    case "Next step": {
      temp = await globalPageObject.pressNextStepForm();
      break;
    }
    case "Next": {
      temp = await globalPageObject.pressNextForm();
      break;
    }
    case "X": {
      await globalPageObject.closeOpeningForm();
      break;
    }
    case "Return": {
      temp = await globalPageObject.pressReturnForm();
      break;
    }
    case "Save & Accept":{
      temp = await globalPageObject.pressSaveAndAcceptForm();
      break;
    }
    case "Replicate": {
      temp = await globalPageObject.pressReplicateForm();
      break;
    }
    case "Import": {
      temp = await globalPageObject.pressImportForm();
      break;
    }
    case "Close claim": {
      temp = await globalPageObject.pressCloseClaimForm();
      break;
    }
    case "Select": {
      temp = await globalPageObject.pressSelectForm();
      break;
    }
    case "Submit": {
      temp = await globalPageObject.pressSubmitForm();
      break;
    }
    default:
      logWarningMessage(`Button "${buttonName}" has been NOT defined!`);
      temp = false;
      break;
  }
  logFailTestcase(temp, message);
});


Then(`System shows required menus on Global Menu {string}`, async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const ObjectsToCsv = require("objects-to-csv-file");
  let columnName: string[] = [];
  let flag: string[] = [];
  for (let i = 0; i < rows.length; i++) {
    let ColumnName = rows[i].ColumnName;
    let Flag = rows[i].Flag;
    columnName.push(ColumnName);
    flag.push(Flag);
  }

  let temp1 = await profileForm.verifyOutlookStatus();
  for (let i = 0; i < columnName.length; i++) {
    if (columnName[i] == "COMMUNICATIONS" && temp1 == false) {
      flag[i] = "No";
    }
  }

  let temp = await globalPageObject.verifyGlobalMenuItems(columnName, flag, true, "Optional");

  (async () => {
    const csv = new ObjectsToCsv(temp);
    await csv.toDisk("./result/SAAS-13419_UI_Test_Report.csv");
  })();

  for (const iterator of temp) {
    if (iterator.expected != iterator.actual && (!(iterator.expected == "Optional"))) {
      logFailTestcase(false, `${iterator.item} (${iterator.itemid}) is expected to be ${iterator.expected} but got ${iterator.actual}`);
    }
  }

});
When(`User checks for required UI`, async () => {
  //do nothing
});
Given(`User navigates to My Profile form`, async () => {
  let temp = await globalPageObject.enterMyProfile();
  logFailTestcase(temp, `Navigate to My Profile failed`);
})

Then(`System shows required menus on Cogwheel {string}`, async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const ObjectsToCsv = require("objects-to-csv-file");
  let columnName: string[] = [];
  let flag: string[] = [];
  for (let i = 0; i < rows.length; i++) {
    let ColumnName = rows[i].ColumnName;
    let Flag = rows[i].Flag;
    columnName.push(ColumnName);
    flag.push(Flag);
  }
  let temp = await globalPageObject.verifyCogwheelMenuItems(columnName, flag, true);

  //export to csv
  (async () => {
    const csv = new ObjectsToCsv(temp);
    await csv.toDisk("./result/SAAS-13419_UI_Test_Report.csv", { append: true });
  })();

  //validation
  for (const iterator of temp) {
    if (iterator.expected != iterator.actual && (!(iterator.expected == "Optional"))) {
      logFailTestcase(false, `${iterator.item} (${iterator.itemid}) is expected to be ${iterator.expected} but got ${iterator.actual}`);
    }
  }

});

Then(`System shows required menus on Reports Menu {string}`, async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const ObjectsToCsv = require("objects-to-csv-file");
  let columnName: string[] = [];
  let flag: string[] = [];
  for (let i = 0; i < rows.length; i++) {
    let ColumnName = rows[i].ColumnName;
    let Flag = rows[i].Flag;
    columnName.push(ColumnName);
    flag.push(Flag);
  }
  let temp = await globalPageObject.verifyReportsMenuItems(columnName, flag, true, "No");

  (async () => {
    const csv = new ObjectsToCsv(temp);
    await csv.toDisk("./result/SAAS-13419_UI_Test_Report.csv", { append: true });
  })();

  for (const iterator of temp) {
    if (iterator.expected != iterator.actual && (!(iterator.expected == "Optional"))) {
      logFailTestcase(false, `${iterator.item} (${iterator.itemid}) is expected to be ${iterator.expected} but got ${iterator.actual}`);
    }
  }
});
When("User presses {string} tab on {string} form", async (nameTab, nameForm) => {
  await globalPageObject.waitForProgressBarLoaded_v2(10);
  const message = `Press "${nameTab}" tab at "${nameForm}" failed!`;
  let temp = await globalPageObject.pressTabOnForm(nameTab);
  logFailTestcase(temp, message);
});

When("User verifies the {string} button on {string} form {string}", async (buttonName: string, formName: string, status: string) => {
  let temp = true;
  if (buttonName.localeCompare("Approve") === 0 && status.localeCompare("is disabled") === 0) {
    temp = await globalPageObject.validateApproveButtonDisplay(false);
    logFailTestcase(temp, `verifies the ${buttonName} button on ${formName} failed!`);
  }
  else if (buttonName.localeCompare("Approve") === 0 && status.localeCompare("is enabled") === 0) {
    temp = await globalPageObject.validateApproveButtonDisplay(true);
    logFailTestcase(temp, `verifies the ${buttonName} button on ${formName} failed!`);
  }
});

Given("User navigates to Account tab from csv file {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  const AccountName = row.SelectedAccount;
  let temp = await globalPageObject.navigateToAccountTabByName(AccountName);
  logFailTestcase(temp, `navigate To "${AccountName}" Account Tab failed!`);
});

Given("User closes all opening entities", async () => {
  let globalSearchAndFilter = PageFactory.getInstance().createGlobalSearchAndFilter();
  if(await globalSearchAndFilter.checkFormSearchFilterShowing()){
    await globalSearchAndFilter.pressClearAtSearchAndFilter();
    await globalPageObject.waitForProgressBarLoaded_v2();
  }
  let temp = await globalPageObject.closeAllOpeningEntities();
  logFailTestcase(temp, "Close all opening entities failed!");
});
