import { Before, Given, Then, When } from "@cucumber/cucumber";
import { fail } from 'assert';
import { CaseForm } from "../../../../page-objects/back-office-portal/general/case/case-form/CaseForm";
import { GlobalSearchSearchDropdown } from "../../../../page-objects/back-office-portal/general/global-search/search-dropdown/GlobalSearchSearchDropdown";
import { GlobalSearchSearchFilterForm } from "../../../../page-objects/back-office-portal/general/global-search/search-filter-form/GlobalSearchSearchFilterForm";
import { GlobalSearchSearchResult } from "../../../../page-objects/back-office-portal/general/global-search/search-result/GlobalSearchSearchResult";
import { GlobalBrowserWindowHandle } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalBrowserWindowHandle";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { GlobalPeripherals } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPeripherals";
import { NoteForm } from "../../../../page-objects/back-office-portal/general/note/note-forms/NoteForm";
import { convertPathFileDataToDataRegression, logFailTestcase, logInfoMessage, logSuccessMessage, logWarningMessage } from '../../../../shared/functions';
import { ICommonContext } from "../../../../shared/interfaces";
import { scenarioName, subErrorMessages } from '../../../../shared/variables';


const loader = require("csv-load-sync");

let globalSearchSearchDropdown: GlobalSearchSearchDropdown;
let globalSearchSearchFilterForm: GlobalSearchSearchFilterForm;
let globalSearchSearchResult: GlobalSearchSearchResult;
let globalPageObject: GlobalPageObject;
let globalPeripherals: GlobalPeripherals;
let globalBrowserWindowHandle: GlobalBrowserWindowHandle;
let noteForm: NoteForm;
// let policyInteract: PolicyInteract;
// let quoteInteract: QuoteInteract;
let caseForm: CaseForm;
Before(async function () {
  const context: ICommonContext = this.context;
  globalSearchSearchDropdown = new GlobalSearchSearchDropdown(context.driverService);
  globalSearchSearchFilterForm = new GlobalSearchSearchFilterForm(context.driverService);
  globalSearchSearchResult = new GlobalSearchSearchResult(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
  globalPeripherals = new GlobalPeripherals(context.driverService);
  globalBrowserWindowHandle = new GlobalBrowserWindowHandle(context.driverService);
  noteForm = new NoteForm(context.driverService);
  // policyInteract = new PolicyInteract(context.driverService);
  // quoteInteract = new QuoteInteract(context.driverService);
  caseForm = new CaseForm(context.driverService);
});

Given("User selects type {string} in search field", async function (entityType) {
  let temp = await globalSearchSearchDropdown.selectEntityType(entityType);
  if (!temp) {
    logWarningMessage(`User selects type ${entityType} in search field: failed!`);
    fail(scenarioName + ": is failed!" + subErrorMessages);
  }
});

When("User selects a condition to search from csv file {string}", async function (filename) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const entityName = rows[0].EntityName;
  let temp = await globalSearchSearchDropdown.inputSearchField(entityName);
  if (!temp) {
    logWarningMessage("User selects a condition to search from csv file: failed!");
    fail(scenarioName + ": is failed!" + subErrorMessages);
  }

  temp = await globalSearchSearchDropdown.selectFirstEntityInSearchDropdown(entityName);
  if (!temp) {
    logWarningMessage(`User selects select "${entityName}" option: failed!`);
    fail(scenarioName + ": is failed!" + subErrorMessages);
  }
});

Then("System shows the found account in the screen {string}", async function (filename) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const entityName = rows[0].EntityName;
  let temp = await globalSearchSearchDropdown.assertSearchAnAccount(entityName);
  if (!temp) {
    logWarningMessage("System shows the found account in the screen: failed!");
    fail(scenarioName + ": is failed!" + subErrorMessages);
  }
});

Then("System shows the found lead in the screen {string}", async function (filename) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const entityName = rows[0].EntityName;
  let temp = await globalSearchSearchDropdown.assertSearchALead(entityName);
  if (!temp) {
    logWarningMessage("System shows the found lead in the screen: failed!");
    fail(scenarioName + ": is failed!" + subErrorMessages);
  }
});
Then("System shows the found contact in the screen {string}", async function (filename) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const entityName = rows[0].EntityName;
  let temp = await globalSearchSearchDropdown.assertSearchAContact(entityName);
  if (!temp) {
    logWarningMessage("System shows the found contact in the screen: failed!");
    fail(scenarioName + ": is failed!" + subErrorMessages);
  }
});

Then("System shows the found sale in the screen {string}", async function (filename) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const entityName = rows[0].EntityName;
  let temp = await globalSearchSearchDropdown.assertSearchASale(entityName);
  if (!temp) {
    logWarningMessage("System shows the found sale in the screen: failed!");
    fail(scenarioName + ": is failed!" + subErrorMessages);
  }
});

Then("System shows the found case in the screen {string}", async function (filename) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const entityName = rows[0].EntityName;
  let temp = await globalSearchSearchDropdown.assertSearchACase(entityName);
  if (!temp) {
    logWarningMessage("System shows the found case in the screen: failed!");
    fail(scenarioName + ": is failed!" + subErrorMessages);
  }
});

Then("System shows the found note in the screen {string}", async function (filename) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const entityName = rows[0].EntityName;
  let temp = await globalSearchSearchDropdown.assertSearchANote(entityName);
  if (!temp) {
    logWarningMessage("System shows the found note in the screen: failed!");
    fail(scenarioName + ": is failed!" + subErrorMessages);
  }
});

Given("User clicks dropdown search type at Global search", async function () {
  let temp = await globalSearchSearchDropdown.clickDropdownSearchType();
  logFailTestcase(temp, "Can't clicks dropdown search type at Global search");
});

When("User checks the existence of dropdown options at search type {string}", async function (filename) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  for (const row of rows) {
    const EntityOption = row.EntityOption;
    let temp = await globalSearchSearchDropdown.checkOptionEntityAtSearchTypeDropdownExist(EntityOption);
    logFailTestcase(temp, `Can't find entity type "${EntityOption}" in global search!`);
  }
});

Given("User inputs a keyword to dropdown options at search type {string}", async function (filename) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const EntityType = rows[0].EntityType;
  let temp = await globalSearchSearchDropdown.selectEntityType(EntityType);
  logFailTestcase(temp, `Select dropdown "${EntityType}" failed!`);
  await globalPeripherals.pressTabCurrentElement();
});

Then("User inputs a keyword to dropdown global search {string}", async function (filename) {
  await globalPeripherals.pressTabCurrentElement();
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const EntityName = rows[0].EntityName;
  let temp = await globalSearchSearchDropdown.inputSearchField(EntityName);
  logFailTestcase(temp, `Input "${EntityName}" to global search failed!`);
});

When(`User navigates to Global Search page`, async () => {
  let temp = await globalPageObject.navigatetoMainSearchList();
  logFailTestcase(temp, `Cannot navigate to Global Search Page`);
});

Then(`System shows required Search Criteria on Search Result page {string}`, async (filename) => {
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
  let temp = await globalSearchSearchResult.verifySearchedPagesOnSearchResult(columnName, flag, true, "No");

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

Then(`System shows required fields on Search & Filter page {string}`, async (filename) => {
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
  let temp = await globalSearchSearchFilterForm.verifySearchAndFilterFields(columnName, flag, true, "No");

  (async () => {
    const csv = new ObjectsToCsv(temp);
    await csv.toDisk("./result/SAAS-13419_UI_Test_Report.csv", { append: true });
  })();

  for (const iterator of temp) {
    if (iterator.expected != iterator.actual && (!(iterator.expected == "Optional"))) {
      logFailTestcase(false, `${iterator.item} (${iterator.itemid}) is expected to be ${iterator.expected} but got ${iterator.actual}`);
    }
  }
})

Then("System shows suggest result in dropdown global search {string}", async function (filename) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const EntityFounds = (rows[0].EntityFound.toString()).split(";");
  for (const Entity of EntityFounds) {
    let temp = await globalSearchSearchDropdown.checkOptionResultSuggestAtSearchDropdownExist(Entity);
    logFailTestcase(temp, `Can't not find any suggest result with type "${Entity}" in global search`);
  }
});

When("User checks tab at search result is being focused {string}", async function (filename) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const EntityFocused = rows[0].EntityFocused;
  await globalPeripherals.pressEnterCurrentElement();
  let temp = await globalSearchSearchResult.checkSearchResultTabIsFocused(EntityFocused);
  logFailTestcase(temp, `Entity "${EntityFocused}" is not focused!`);
});

Then("User checks each tab at search result {string}", async function (filename) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  for (const row of rows) {
    const columnName = (row.ColumnName).split(";");
    const EntityOption = row.EntityOption;
    const NumberOfRecord = row.NumberOfRecord;

    //Click a tab at Search result
    logInfoMessage(`Click "${EntityOption}" list:`);
    let temp = await globalSearchSearchResult.clickTabAtSearchResult(EntityOption);
    logFailTestcase(temp, `Click tab "${EntityOption}" failed!`);


    //Check a tab with number of found records
    logInfoMessage(`Checking "${EntityOption}" tab:`);
    temp = await globalSearchSearchResult.checkSearchResultTab(EntityOption, NumberOfRecord);
    logFailTestcase(temp, `"${EntityOption} (${NumberOfRecord})" is incorrect!`);
    logSuccessMessage(`\t"${EntityOption} (${NumberOfRecord})" passed!`);


    //Check name of all columns
    logInfoMessage(`Checking colums at "${EntityOption}" list`);
    for (const column of columnName) {
      temp = await globalSearchSearchResult.checkColumnAtListExist(column);
      logFailTestcase(temp, `Not found column "${column}"`);
    }
    logSuccessMessage(`Checking colums at "${EntityOption}" list passed`);

    if (parseInt(NumberOfRecord) > 0) {
      //Click open entity at search result
      logInfoMessage(`Click open entity "${EntityOption}"`);
      switch (EntityOption) {
        case "Accounts": {
          temp = await globalSearchSearchResult.openFirstAccount();
          logFailTestcase(temp, `Open first ${EntityOption} failed!`);
          break;
        }
        case "Contacts": {
          temp = await globalSearchSearchResult.openFirstContact();
          logFailTestcase(temp, `Open first ${EntityOption} failed!`);
          break;
        }
        case "Leads":
          {
            temp = await globalSearchSearchResult.openFirstLead();
            logFailTestcase(temp, `Open first ${EntityOption} failed!`);
            break;
          }
        case "Sales": {
          temp = await globalSearchSearchResult.openFirstSale();
          logFailTestcase(temp, `Open first ${EntityOption} failed!`);
          break;
        }
        case "Notes": {
          temp = await globalSearchSearchResult.openFirstNote();
          logFailTestcase(temp, `Open first ${EntityOption} failed!`);
          break;
        }
        case "Quotes": {
          temp = await globalSearchSearchResult.openFirstQuote();
          logFailTestcase(temp, `Open first ${EntityOption} failed!`);
          break;
        }
        case "Policies": {
          temp = await globalSearchSearchResult.openFirstPolicy();
          logFailTestcase(temp, `Open first ${EntityOption} failed!`);
          break;
        }
        case "Cases": {
          temp = await globalSearchSearchResult.openFirstCase();
          logFailTestcase(temp, `Open first ${EntityOption} failed!`);
          break;
        }
        default:
          {
            logFailTestcase(temp, `Can't find "${EntityOption}"!`);
            break;
          }
      }


      //Check entity detail (Account, Contact, Lead, sale) or entity form (note, policy, case, quote)
      logInfoMessage(`Checking open entity detail "${EntityOption}"`);
      switch (EntityOption) {
        case "Accounts": case "Contacts": case "Leads": case "Sales": {
          temp = await globalPageObject.checkMainEntityDetailIsOpening("");
          logFailTestcase(temp, `Can't open detail of ${EntityOption}!`);

          await globalBrowserWindowHandle.backPage();
          await globalBrowserWindowHandle.backPage();
          await globalPageObject.waitForProgressBarLoaded_v2();
          await globalPageObject.waitForProgressBarLoaded_v2();
          logSuccessMessage(`Check detail of "${EntityOption}" passed!`);
          break;
        }
        case "Notes": {
          temp = await noteForm.checkNoteFormIsOpening("");
          logFailTestcase(temp, `Can't open form of ${EntityOption}!`);

          await globalPageObject.closeOpeningForm();
          break;
        }

        // case "Policies": {
        //   temp = await policyInteract.checkPolicyDetailIsOpening("");
        //   logFailTestcase(temp, `Can't open form of ${EntityOption}!`);
        //   break;
        // }

        // case "Quotes": {
        //   temp = await quoteInteract.checkQuoteDetailIsOpening("");
        //   logFailTestcase(temp, `Can't open form of ${EntityOption}!`);
        //   break;
        // }

        case "Cases": {
          temp = await caseForm.checkCaseFormIsOpening("");
          logFailTestcase(temp, `Can't open form of ${EntityOption}!`);

          await globalPageObject.closeOpeningForm();
          break;
        }
        default:
          {
            logFailTestcase(temp, `"${EntityOption}" is not found!`);
            break;
          }
      }
    }
  }
});

Then("User checks account found at search result {string}", async function (filename) {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  const columnName = (row.ColumnName).split(";");
  const EntityOption = row.EntityOption;
  const NumberOfRecord = row.NumberOfRecord;
  let temp = await globalSearchSearchResult.openFirstAccount();
  logFailTestcase(temp, `Open first ${EntityOption} failed!`);

  temp = await globalPageObject.checkMainEntityDetailIsOpening("");
  logFailTestcase(temp, `Can't open detail of ${EntityOption}!`);

  await globalBrowserWindowHandle.backPage();
  await globalBrowserWindowHandle.backPage();
  await globalPageObject.waitForProgressBarLoaded_v2();
  await globalPageObject.waitForProgressBarLoaded_v2();
  logSuccessMessage(`Check detail of "${EntityOption}" passed!`);
});

When("User inputs valid data to Search and Filter account form at search sesult {string}", async function (filename) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const EntityType = rows[0].EntityType;
  const Keyword = rows[0].Keyword;
  const Properties = rows[0].Properties.split(";");

  const QuoteReference = rows[0].QuoteReference;
  const PolicyReference = rows[0].PolicyReference;
  const PolicyStartDateFrom = rows[0].PolicyStartDateFrom;
  const PolicyStartDateTo = rows[0].PolicyStartDateTo;
  const Product = rows[0].Product;
  // And more field here....

  let temp = await globalSearchSearchFilterForm.inputEntityTypeAtSearchAndFilter(EntityType);
  logFailTestcase(temp, `Input Entity type "${EntityType}" failed!`);

  temp = await globalSearchSearchFilterForm.inputKeywordAtSearchAndFilter(Keyword);
  logFailTestcase(temp, `Input keyword "${Keyword}" failed!`);

  for (const property of Properties) {
    temp = await globalSearchSearchFilterForm.inputPropertyAtSearchAndFilter(property);
    logFailTestcase(temp, `Input property "${property}" failed!`);
  }

  if (QuoteReference) {
    temp = await globalSearchSearchFilterForm.inputQuoteReferenceAtSearchAndFilter(QuoteReference);
    logFailTestcase(temp, `Input quote reference failed!`);
  }

  if (PolicyReference) {
    temp = await globalSearchSearchFilterForm.inputPolicyReferenceAtSearchAndFilter(PolicyReference);
    logFailTestcase(temp, `Input policy reference failed!`);
  }

  if (PolicyStartDateFrom) {
    temp = await globalSearchSearchFilterForm.inputPolicyStartDateFromAtSearchAndFilter(PolicyStartDateFrom);
    logFailTestcase(temp, `Input policy start date from failed!`);
  }

  if (PolicyStartDateTo) {
    temp = await globalSearchSearchFilterForm.inputPolicyStartDateToAtSearchAndFilter(PolicyStartDateTo);
    logFailTestcase(temp, `Input policy start date to failed!`);
  }

  if (Product) {
    temp = await globalSearchSearchFilterForm.inputProductAtSearchAndFilter(Product);
    logFailTestcase(temp, `Input product failed!`);
  }
  // Add more input here....

  temp = await globalPageObject.pressSearchSearchAndFilter();
  logFailTestcase(temp, `Press Search at Search & filter failed!`);

});

Then("User checks account tab at search result {string}", async function (filename) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const NumberOfRecord = rows[0].NumberOfRecord;
  let temp = await globalSearchSearchResult.checkSearchResultTab("Accounts", NumberOfRecord);
  logFailTestcase(temp, `Number of Account found is NOT "${NumberOfRecord}"!`);

  for (let i = 0; i < NumberOfRecord; i++) {
    const Name = rows[i].Name;
    temp = await globalSearchSearchResult.checkNameAccountAtAccountTab(Name, i + 1);
    logFailTestcase(temp, `Account "${Name}" is not found on Account list!`);
  }

  temp = await globalSearchSearchResult.openFirstAccount();
  logFailTestcase(temp, `Open first account failed!`);

  temp = await globalPageObject.checkMainEntityDetailIsOpening(rows[0].Name);
  logFailTestcase(temp, `Open detail account "${rows[0].Name}" failed!`);

  await globalBrowserWindowHandle.backPage();
  await globalBrowserWindowHandle.backPage();
});

When("User selects a tab at search result {string}", async function (filename) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const EntityType = rows[0].EntityType;
  await globalPeripherals.pressEnterCurrentElement();
  let temp = await globalSearchSearchResult.clickTabAtSearchResult(EntityType);
  logFailTestcase(temp, `Click tab "${EntityType}" failed!`);
  await globalPageObject.waitForProgressBarLoaded_v2();
});

When("User exports data at search result {string}", async function (filename) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const MessageExport = rows[0].MessageExport.replace(";", ",");
  let temp = await globalSearchSearchResult.pressExportButton();
  logFailTestcase(temp, `Can't press "Export" button!`);
  temp = await globalPageObject.waitForProgressBarLoaded();
  logFailTestcase(temp, `Press "Export" button failed!`);

  temp = await globalPageObject.checkToastSuccessExistWithMessage(MessageExport);
  logFailTestcase(temp, `Message success:\n\t"${MessageExport}" \nis NOT found!`);
});

When("User checks export history at search result {string}", async function (filename) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  // ?? Do we need to check file name and created date of data exported?

  let temp = await globalSearchSearchResult.openExportHistoryForm();
  logFailTestcase(temp, `Can't press "Export History" button!`);
  await globalPageObject.waitForProgressBarLoaded_v2();
});

Then("User downloads exported file at search result", async function () {
  await globalPageObject.waitForSeconds(5000);
  await globalPageObject.reloadTable();
  await globalPageObject.waitForProgressBarLoaded_v2();

  let temp = await globalSearchSearchResult.pressDownloadExportedData();
  logFailTestcase(temp, "Can't press download file!");
  temp = await globalPageObject.waitForProgressBarLoaded();
  logFailTestcase(temp, `Press download file failed`);
  await globalPeripherals.pressEnterCurrentElement();
});

Then("User checks Properties dropdown list on Search & Filter at search result {string}", async function (filename) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  await globalPeripherals.pressEnterCurrentElement();
  for (const row of rows) {
    const EntityType = row.EntityType;
    const Properties = row.Properties.split(";");
    logInfoMessage(`Checking at "${EntityType}"`);
    let temp = await globalSearchSearchFilterForm.inputEntityTypeAtSearchAndFilter(EntityType);
    logFailTestcase(temp, `Select entity type "${EntityType}" at Search & Filter failed!`);

    temp = await globalSearchSearchFilterForm.expandPropertiesAtSearchAndFilter();
    logFailTestcase(temp, `"${EntityType}": Expand Properties field on Search & Filter failed!`);

    for (const Property of Properties) {
      logInfoMessage(`\t\tAdding property "${Property}"`);

      temp = await globalPageObject.selectDropdownOption(Property);
      logFailTestcase(temp, `"${EntityType}": Can't select property "${Property}" at Properties on Search & Filter failed!`);

      temp = await globalSearchSearchFilterForm.checkPropertyExistAtSearchAndFilter(Property);
      logFailTestcase(temp, `"${EntityType}": Can't add property "${Property}" at Search & Filter!`);
    }
    await globalPeripherals.pressTabCurrentElement();
    await globalPeripherals.pressTabCurrentElement();
  }
});

When("User checks navigation when clicks on each tabs at Search result {string}",async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  let temp = true;
  const EntityTypes = rows[0].EntityTypes.split("=");
  for (const entityType of EntityTypes) {
      temp = await globalSearchSearchResult.clickTabAtSearchResult(entityType);
      logFailTestcase(temp, `Press tab "${entityType}" failed!`);

      temp = await globalSearchSearchResult.checkSearchResultTabIsFocused(entityType);
      logFailTestcase(temp, `Tab "${entityType}" is NOT focused!`);

      temp = await globalSearchSearchFilterForm.validateValueEntityTypeAtSearchAndFilter(entityType);
      logFailTestcase(temp);

      logInfoMessage(`\t => Navigate to "${entityType}" is passed!`);
  }
});