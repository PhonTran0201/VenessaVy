import { Before, Then, When } from "@cucumber/cucumber";
import { DataRepo } from "../../../../core/modals/DataRepo";
import { GlobalFilterDropdown } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalFilterDropdown";
import { GlobalFilterName } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalFilterName";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { GlobalSearchAndFilter } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalSearchAndFilter";
import { convertPathFileDataToDataRegression, logFailTestcase } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";

let globalFilterName: GlobalFilterName;
let globalSearchAndFilter: GlobalSearchAndFilter;
let globalPageObject: GlobalPageObject;
let globalFilterDropdown: GlobalFilterDropdown
const loader = require("csv-load-sync");

Before(async function () {
  const context: ICommonContext = this.context;
  globalSearchAndFilter = new GlobalSearchAndFilter(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
  globalFilterName = new GlobalFilterName(context.driverService);
  globalFilterDropdown = new GlobalFilterDropdown(context.driverService);
});

When('User opens Search and Filter form', async () => {  
  await globalPageObject.waitForProgressBarLoaded_v2(500);
  await globalPageObject.waitForProgressBarLoaded_v2(500);
  const temp = await globalSearchAndFilter.openSearchAndFilterForm();
  logFailTestcase(temp, "Open Search & Filter form failed!");
});

Then(
  "User presses {string} button on Search & Filter form",
  async function (buttonName) {
    switch (buttonName) {
      case "X": {
        logFailTestcase(
          await globalPageObject.pressXSearchAndFilter(),
          `Press "X" on Search and Filter form failed!`
        );
        break;
      }
      case "Search": {
        logFailTestcase(
          await globalPageObject.pressSearchSearchAndFilter(),
          `Press "Search" Search and Filter form failed!`
        );
        break;
      }
      case "Save": {
        logFailTestcase(
          await globalPageObject.pressSaveSearchAndFilter(),
          `Press "Save" Search and Filter form failed!`
        );
        break;
      }
      case "Clear": {
        logFailTestcase(
          await globalPageObject.pressClearSearchAndFilter(),
          `Press "Clear" Search and Filter form failed!`
        );
        break;
      }
      case "Cancel": {
        logFailTestcase(
          await globalPageObject.pressCancelSearchAndFilter(),
          `Press "Cancel" Search and Filter form failed!`
        );
        break;
      }
      default: {
        logFailTestcase(
          false,
          `Button "${buttonName}" was not found on Search & Filter form!`
        );
        break;
      }
    }
  }
);

// Filter Name form
When("User inputs Filter Name form {string}", async function (filename) {
  const row = (await DataRepo.getInstance().loadData(filename))[0]
  const FilterName = row.FilterName;
  const FilterType = row.FilterType;

  if (FilterName) {
    logFailTestcase(
      await globalFilterName.inputFilterNameFilterNameForm(FilterName),
      `Input filter name "${FilterName}" failed!`
    );
  }
  if (FilterType) {
    logFailTestcase(
      await globalFilterName.selectFilterTypeFilterNameForm(FilterType),
      `Select filter type "${FilterType}" failed!`
    );
  }
  // let temp = await globalFilterName.pressSaveAtFilterNameForm();
  // logFailTestcase(temp, `Cannot save Filter Name`);
  // await globalPageObject.closeOpeningForm()
});



Then(
  "User presses {string} button on Filter Name form",
  async function (buttonName) {
    await globalPageObject.waitForProgressBarLoaded_v2();
    switch (buttonName) {
      case "Cancel": {
        let temp = await globalPageObject.pressCancelForm();
        logFailTestcase(
          temp,
          `Press "${buttonName}" button on Filter Name form failed!`
        );
        break;
      }
      case "Save": {
        let temp = await globalPageObject.pressSaveForm();
        logFailTestcase(
          temp,
          `Press "${buttonName}" button on Filter Name form failed!`
        );
        break;
      }
      case "X": {
        await globalPageObject.closeOpeningForm();
        break;
      }
      default:
        logFailTestcase(
          false,
          `Press "${buttonName}" button on Filter Name form failed!`
        );
        break;
    }
  }
);

//select filter dropdown step
When("User inputs data to select filter field {string}", async (filename) => {
  await globalPageObject.closeOpeningForm();
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  const SelectedFilter = row.SelectedFilter;
  let temp = await globalFilterDropdown.inputSelectFilterDropdown(SelectedFilter);
  logFailTestcase(temp, "Input select filter failed !");

});

Then("At {string}, System shows a filter on dropdown of Select filter field {string}", async (user, filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  const FilterName = row.FilterName;
  const FilterType = row.FilterType;

  await globalPageObject.closeOpeningForm();
  let temp = true;
  if (user == "user 1") {
    temp = await globalFilterName.assertRecentFilterNameCreatedOnDropdown(FilterName);
    logFailTestcase(temp, "Filter Name not show on Recent Filter Dropdown !");
    temp = await globalFilterName.assertFilterTypeAndFilterNameCreatedOnDropdown(FilterName, FilterType);
    logFailTestcase(temp, `Filter Name not show on ${FilterType} Filter Dropdown !`);

  }
  else if (user == "user 2") {
    temp = await globalFilterName.assertFilterTypeAndFilterNameCreatedOnDropdown(FilterName, FilterType);
    logFailTestcase(temp, `Filter Name not show on ${FilterType} Filter Dropdown !`);
  }
});

Then("System shows a filter on dropdown of Select filter field {string}", async (filename) => {
  const row = (await DataRepo.getInstance().loadData(filename))[0]
  const FilterName = row.FilterName;
  const FilterType = row.FilterType;
  let temp = await globalFilterName.assertFilterTypeAndFilterNameCreatedOnDropdown(FilterName, FilterType);
  logFailTestcase(temp, `Filter Name not show on ${FilterType} Filter Dropdown !`);
})



Then("System does not show a filter on dropdown of Select filter field {string}", async (filename) => {
  const row = (await DataRepo.getInstance().loadData(filename))[0]
  const FilterName = row.FilterName;
  const FilterType = row.FilterType;
  let temp = await globalFilterName.assertFilterTypeAndFilterNameCreatedOnDropdown(FilterName, FilterType);
  logFailTestcase(!temp, `System still show a filter on dropdown!`);

});

//only delete filter on dropdown
When("User deletes filter on dropdown filter {string}", async (filename) => {
  const row = (await DataRepo.getInstance().loadData(filename))[0]
  const FilterName = row.FilterName;
  const FilterType = row.FilterType;

  let temp = await globalFilterDropdown.deleteFilterByNameAndType(FilterName, FilterType);
  logFailTestcase(temp, "Clear filter failed!");
});

//input and delete filter on dropdown
When(`User delete filter from Select Filter menu {string}`, async (filename: string) => {
  let row = (await DataRepo.getInstance().loadData(filename))[0];
  const filterName = row.FilterName;
  const filterType = row.FilterType;

  let temp = await globalFilterDropdown.inputSelectFilterDropdown(filterName);
  logFailTestcase(temp, `Input filter dropdown "${filterName}" failed!`)
  temp = await globalFilterDropdown.deleteFilterByNameAndType(filterName, filterType);
  logFailTestcase(temp, `Delete filter failed`);
});

