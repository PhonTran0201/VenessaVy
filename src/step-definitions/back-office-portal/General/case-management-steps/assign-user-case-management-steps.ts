import { Before, Then, When } from "@cucumber/cucumber";
import { CaseAssignForm } from "../../../../page-objects/back-office-portal/general/case/case-list/CaseAssignForm";
import { CaseList } from "../../../../page-objects/back-office-portal/general/case/case-list/CaseList";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { convertPathFileDataToDataRegression, logFailTestcase } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";


const loader = require("csv-load-sync");
let caseList: CaseList;
let caseAssignForm: CaseAssignForm;
let globalPageObject: GlobalPageObject;
let fileDataName: string = "";
let assignedPositionRow: number = -1;
Before(async function () {
  const context: ICommonContext = this.context;
  caseList = new CaseList(context.driverService);
  caseAssignForm = new CaseAssignForm(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
});

When(
  "User assigns a case management from preconditions steps from csv file {string}",
  async function (filename) {

    const rows = loader(convertPathFileDataToDataRegression(filename));
    fileDataName = filename;

    const SelectedCase = rows[0].SelectedCase;
    const AssignedTo = rows[0].AssignedTo;
    let temp = await caseList.openReportedByMeCaseList();
    logFailTestcase(temp);
    assignedPositionRow = await caseList.openAssignUserFormByName(SelectedCase);
    temp = await caseAssignForm.selectAssignee(AssignedTo);
    logFailTestcase(temp, `Select "${AssignedTo}" failed!`);

    temp = await globalPageObject.pressSaveForm();
    logFailTestcase(temp);

    temp = await globalPageObject.waitForProgressBarLoaded();
    logFailTestcase(temp);

    temp = await caseList.openReportedByMeCaseList();
    logFailTestcase(temp);
  });

Then("System assigns user successfully", async function () {
  const rows = loader(convertPathFileDataToDataRegression(fileDataName));
  const AssignedTo = rows[0].AssignedTo;

  await caseList.assertAssignUser(assignedPositionRow, AssignedTo);
});
