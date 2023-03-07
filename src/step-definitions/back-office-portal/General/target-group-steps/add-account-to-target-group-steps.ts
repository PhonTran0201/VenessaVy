import { Before, Given, Then, When } from "@cucumber/cucumber";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { TargetGroup } from "../../../../page-objects/back-office-portal/general/target-group/TargetGroup";
import { convertPathFileDataToDataRegression } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";

const loader = require("csv-load-sync");

let targetGroup: TargetGroup;
let globalPageObject: GlobalPageObject;
Before(async function () {
  const context: ICommonContext = this.context;
  targetGroup = new TargetGroup(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
});

Given("User selects some accounts from precondition steps", async function () {
  await targetGroup.selectAccounts();
});

Given("User selects an account at row from csv file {string}", async function (filename) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const rowPositionAccount = rows[0].RowPositionAccount;

  // await targetGroup.selectAccounts
});
When(
  "User selects a target group from csv file {string}",
  async function (filename) {
    await targetGroup.pressAddToGroup();

    const rows = loader(convertPathFileDataToDataRegression(filename));

    const name = rows[0].Name;

    await targetGroup.inputTargetGroupType(name);

    await globalPageObject.pressSaveForm();
  }
);

Then("System shows account in the target group", async function () {
  await targetGroup.navigateToTargetGroup();
});
