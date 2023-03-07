import { Before, Then, When } from "@cucumber/cucumber";
import { AccountTabCaseList } from "../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-case/AccountTabCaseList";
import { AccountTabCaseListAssignForm } from "../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-case/AccountTabCaseListAssignForm";
import { AccountTabCaseListCloseCaseForm } from "../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-case/AccountTabCaseListCloseCaseForm";
import { AccountTabSummary } from "../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-summary/AccountTabSummary";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { convertPathFileDataToDataRegression, logFailTestcase } from '../../../../shared/functions';
import { ICommonContext } from "../../../../shared/interfaces";

const loader = require("csv-load-sync");
let accountTabCaseList: AccountTabCaseList;
let accountTabSummary: AccountTabSummary;

let accountTabCaseListAssignForm: AccountTabCaseListAssignForm;
let globalPageObject: GlobalPageObject;
let accountTabCaseListCloseCaseForm: AccountTabCaseListCloseCaseForm;
let fileData: string = "";

//Variable using to compare
let expectedAssignee: string = "";

let caseTitle: string = "";
let createdDate: string = "";
let savePositionRow: number = -2;

Before(async function () {
  const context: ICommonContext = this.context;
  accountTabCaseList = new AccountTabCaseList(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
  accountTabSummary = new AccountTabSummary(context.driverService);
  accountTabCaseListCloseCaseForm = new AccountTabCaseListCloseCaseForm(context.driverService);
  accountTabCaseListAssignForm = new AccountTabCaseListAssignForm(context.driverService);
});

When(
  "User selects a case from precondition and selects assignee from csv file {string}",
  async (filename: string) => {
    try {
      let rows = loader(convertPathFileDataToDataRegression(filename));
      const selectedCase = rows[0].SelectedCase;
      const assignee = rows[0].Assignee;
      expectedAssignee = assignee;
      await accountTabCaseList.openAssignUserFormByName(selectedCase);
      await accountTabCaseListAssignForm.selectAssignee(assignee);
      await globalPageObject.pressSaveForm();
      await globalPageObject.waitForProgressBarLoaded();
    } catch (error) {
      console.log(`User selects assignee from csv file ${filename}`);
      console.log(error);
    }
  }
);

When(
  "User open a case from precondition steps and enter comment from csv file {string}",
  async (filename: string) => {
    try {
      let rows = loader(convertPathFileDataToDataRegression(filename));
      const selectedCase = rows[0].SelectedCase;
      const comment = rows[0].Comment;
      await accountTabCaseList.openCloseCaseFormByName(selectedCase);
      await accountTabCaseListCloseCaseForm.enterComment(comment);
      await globalPageObject.pressSaveForm();
    } catch (error) {
      console.log(
        `User open a case from precondition steps and enter comment from csv file ${filename}`
      );
      console.log(error);
    }
  }
);

Then("System shows updated case with assignee in the Case list", async () => {
  await globalPageObject.reloadTable(2000);
  await accountTabCaseList.assertAssignUser(1, expectedAssignee);
});

Then("System shows case with status done in the Case list", async () => {
  let expectedStatusCase = "Done"; //When close a case, the status will be changed from "To do" to "Done"
  let expectedComment = ""; //??????
  ///////////////////////await
  await accountTabCaseList.assertCloseCase(1, expectedStatusCase);
});

When("User deletes a case from csv file {string}", async (filename: string) => {
  let rows = loader(convertPathFileDataToDataRegression(filename));
  fileData = filename;
  caseTitle = rows[0].CaseTitle;
  let temp = await accountTabCaseList.deleteCaseByName(caseTitle);
  logFailTestcase(temp, `Can Not delete case with title "${caseTitle}"!`);

  savePositionRow = temp[0];
  createdDate = temp[1];
  if (savePositionRow === -1 || savePositionRow === -2) {
    logFailTestcase(false, `Can't find or delete case with title = "${caseTitle}"`);
  }

  const temp1 = await globalPageObject.pressYesForm();
  logFailTestcase(temp1, "Press Yes confirm failed!");
});

Then("System doesn't show case in the Case list", async () => {
  await accountTabCaseList.assertDeleteCase(savePositionRow, caseTitle, createdDate);
});
Then("System does not show case in the Summary", async function () {
  const rows = loader(convertPathFileDataToDataRegression(fileData));
  let len = rows.length;
  let temp = await globalPageObject.navigateToSubSummary();
  logFailTestcase(temp, "Navigates to summary tab failed!");

  await globalPageObject.waitForProgressBarLoaded_v2();
  for (let i = len - 1, j = 1; i >= 0; i--, j++) {
    const title = rows[i].CaseTitle;

    await accountTabSummary.assertDeleteCaseSummary(
      j,
      title
    );
  }
});
