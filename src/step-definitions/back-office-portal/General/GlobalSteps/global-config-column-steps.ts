import { Before, Then, When } from "@cucumber/cucumber";
import { GlobalConfigColumn } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalConfigColumn";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { convertPathFileDataToDataRegression, logFailTestcase, logInfoMessage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";

const loader = require("csv-load-sync");
let globalConfigColumn: GlobalConfigColumn;
let globalPageObject: GlobalPageObject;


Before(async function () {
  const context: ICommonContext = this.context;
  globalConfigColumn = new GlobalConfigColumn(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
});

When(`User opens dropdown Config column for {string} list at main tab`, async (tabName) => {
  let temp = await globalConfigColumn.pressConfigColumnButtonAtMainTab();
  logFailTestcase(temp, `Press button Config column for ${tabName} failed!`);
});

When(`User opens dropdown Config column for {string} list at sub tab`, async (tabName) => {
  let temp = await globalConfigColumn.pressConfigColumnButtonAtSubTab();
  logFailTestcase(temp, `Press button Config column for ${tabName} failed!`);
});

When("User checks config column for {string} list at main tab {string}", async (nameList, filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  await globalPageObject.waitForProgressBarLoaded_v2();
  let temp = true;
  logInfoMessage(`Checking config column at "${nameList}" list`);
  for (let i = 0; i < rows.length; i++) {
    const Column = rows[i].Column;
    const Uncheck = rows[i].Uncheck;

    if (Uncheck && Uncheck.toLowerCase().localeCompare('yes') === 0) {
      temp = await globalConfigColumn.checkConfigColumnItemByName(Column);
      logFailTestcase(temp, `Check item "${Column}" failed!`);

      await globalPageObject.waitForProgressBarLoaded_v2(300);
      temp = await globalPageObject.checkColumnOnMainListExist(Column);
      logFailTestcase(!temp, `Column ${Column} is still on list!`);

    } else {
      temp = await globalPageObject.checkColumnOnMainListExist(Column);
      logFailTestcase(temp, `Not found colum ${Column} on list!`);
    }
  }
});

When("User checks config column for {string} list at sub tab {string}", async (nameList, filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  await globalPageObject.waitForProgressBarLoaded_v2();
  let temp = true;
  logInfoMessage(`Checking config column at "${nameList}" list`);
  for (let i = 0; i < rows.length; i++) {
    const Columns = rows[i].Columns.split(";");
    const Uncheck = rows[i].Uncheck;
    
    for(let j = 0; j < Columns.length; j++){
      if (Uncheck && Uncheck.toLowerCase().localeCompare('yes') === 0) {
        temp = await globalConfigColumn.checkConfigColumnItemByName(Columns[j]);
        logFailTestcase(temp, `Check item "${Columns[j]}" failed!`);
  
        await globalPageObject.waitForProgressBarLoaded_v2(300);
        temp = await globalPageObject.checkColumnOnSubListExist(Columns[j]);
        logFailTestcase(!temp, `Column ${Columns[j]} is still on list!`);
      } else {
        temp = await globalPageObject.checkColumnOnSubListExist(Columns[j]);
        logFailTestcase(temp, `Not found colum ${Columns[j]} on list!`);
      }
    }

    // Reset column config to default value
    for (let k = 0; k < Columns.length; k++) {
      if (!await globalConfigColumn.isConfigColumnItemCheckingByName(Columns[k])) {
        let temp = await globalConfigColumn.checkConfigColumnItemByName(Columns[k]);
        logFailTestcase(temp, `Check item "${Columns[k]}" on Dropdown config column failed!`);
      }
    }
  }
});