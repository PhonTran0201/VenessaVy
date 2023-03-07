import { Before, Given, When } from "@cucumber/cucumber";
import { compareDesc } from "date-fns";
import { AccountTabHistoryList } from "../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-history/AccountTabHistoryList";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { convertPathFileDataToDataRegression, convertStringDateTimeToDate, logFailTestcase, logInfoMessage, logWarningMessage, reformatSalesStage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";

const loader = require("csv-load-sync");

let accountTabHistoryList: AccountTabHistoryList;
let globalPageObject: GlobalPageObject;
Before(async function () {
  const context: ICommonContext = this.context;
  accountTabHistoryList = new AccountTabHistoryList(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
});

//Search and Filter
When("User searches history with valid data from csv file {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  for (let i = 0; i < rows.length; i++) {
    logWarningMessage(`Checking Search History at line ${i + 1} in csv...`);

    //#region Declare varaiable
    const SearchKeyword = rows[i].SearchKeyword;
    const From = rows[i].SearchFrom;
    const To = rows[i].SearchTo;
    //#endregion

    let temp = true;

    //#region Clear all value on fields
    temp = await accountTabHistoryList.inputSearchKeyword("");
    logFailTestcase(temp, "Clear Search Keyword failed!");

    temp = await accountTabHistoryList.inputSearchFrom("");
    logFailTestcase(temp, "Clear From failed!");

    temp = await accountTabHistoryList.inputSearchTo(To);
    logFailTestcase(temp, "Clear To failed!");
    //#endregion

    //#region Input fields
    if (SearchKeyword) {
      temp = await accountTabHistoryList.inputSearchKeyword(SearchKeyword);
      logFailTestcase(temp, "Input Search Keyword failed!");
    }
    if (From) {
      temp = await accountTabHistoryList.inputSearchFrom(From);
      logFailTestcase(temp, "Input From failed!");
    }
    if (To) {
      temp = await accountTabHistoryList.inputSearchTo(To);
      logFailTestcase(temp, "Input To failed!");
    }
    //#endregion

    temp = await accountTabHistoryList.pressSearchButton();
    logFailTestcase(temp, "Press Search button failed!");
    await globalPageObject.waitForProgressBarLoaded_v2();

    const HistoryNumber = parseInt(rows[i].HistoryNumber);
    const actualTotalNumber = await globalPageObject.getNumberOfTotalRecordsSubTab();

    async function validateValueSearchHistory(positionRow: number) {
      //Validate Search keyword
      if (SearchKeyword) {
        temp = await accountTabHistoryList.validateTypeOnHistoryList(SearchKeyword, positionRow, true);
        logFailTestcase(temp, `Type "${SearchKeyword}" does not match to result`);
      }

      //Validate From - To
      const strTimestamp = await accountTabHistoryList.getValueHistoryList("Timestamp", positionRow);
      logFailTestcase(strTimestamp.length > 0, `Get value of columns "Timestamp" failed!`);

      if (From) {
        temp = compareDesc(convertStringDateTimeToDate(From), convertStringDateTimeToDate(strTimestamp)) >= 0;
        logFailTestcase(temp, `"${From}" is NOT before or equal "${strTimestamp}"!`);
      }
      if (To) {
        temp = compareDesc(convertStringDateTimeToDate(strTimestamp), convertStringDateTimeToDate(To)) >= 0;
        logFailTestcase(temp, `"${strTimestamp}" is NOT before or equal "${To}"!`);

      }
    }

    if (HistoryNumber >= 1 && HistoryNumber === actualTotalNumber) {
      let countTemp = actualTotalNumber >= 10 ? 10 : actualTotalNumber;
      for (let j = 1; j < countTemp; j++) {
        await validateValueSearchHistory(j);
      }
    } else if (HistoryNumber === 0 && HistoryNumber === actualTotalNumber) {
      logInfoMessage(`There is NO records found on list!`);
    }
    else if (HistoryNumber < 0 && actualTotalNumber > 0) {
      let countTemp = actualTotalNumber >= 10 ? 10 : actualTotalNumber;
      for (let j = 1; j < countTemp; j++) {
        await validateValueSearchHistory(j);
      }
    }
    else {
      logWarningMessage(`There are ${actualTotalNumber} total records found!`);
      logFailTestcase(false, `Line ${i + 1} in csv: failed...`);
    }
    logWarningMessage(`\tLine ${i + 1} passed!`);
  }
});