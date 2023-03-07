import { Before, Then, When } from "@cucumber/cucumber";
import { CaseList } from "../../../../page-objects/back-office-portal/general/case/case-list/CaseList";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { convertPathFileDataToDataRegression, logFailTestcase } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
const loader = require("csv-load-sync");
let caseList: CaseList;
let globalPageObject: GlobalPageObject;
let fileDataName: string = "";


//for assert deleting
let deletedRow: number = -1;
let deletedCaseTitle: string = "";
let deletedCreatedDate: any;

Before(async function () {
  const context: ICommonContext = this.context;
  caseList = new CaseList(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
});

When(
  "User deletes a case management from csv file {string}",
  async function (filename) {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    let temp = await caseList.openReportedByMeCaseList();
    logFailTestcase(temp);
    fileDataName = filename;
    deletedCaseTitle = rows[0].SelectedCase;

    let temp2 = await caseList.deleteCaseByName(deletedCaseTitle);
    deletedRow = temp2[0];
    deletedCreatedDate = temp2[1];
    temp = await globalPageObject.pressYesForm();
    logFailTestcase(temp);
  });

Then("System doesn't show case management in the Case list", async function () {
  await caseList.openReportedByMeCaseList();
  await caseList.assertDeleteCase(deletedRow, deletedCaseTitle, deletedCreatedDate);
});

Then(
  "User deletes case management from csv file {string}",
  async function (filename) {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    let temp = await caseList.openReportedByMeCaseList();
    logFailTestcase(temp);
    fileDataName = filename;
    deletedCaseTitle = rows[0].SelectedCase;

    let temp2 = (await caseList.deleteCaseByName(deletedCaseTitle));
    deletedRow = temp2[0];
    deletedCreatedDate = temp2[1];
    temp = await globalPageObject.pressYesForm();
    logFailTestcase(temp);
  });
