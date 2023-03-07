import { Before, Then, When } from "@cucumber/cucumber";
import { fail } from "assert";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { RoleSetting } from "../../../../page-objects/back-office-portal/general/role/role-setting/RoleSetting";
import { convertPathFileDataToDataRegression, logFailTestcase, logInfoMessage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";



let roleSetting: RoleSetting;
let globalPageObject: GlobalPageObject;
const loader = require("csv-load-sync");
let fileDataCreate: string = "";

Before(async function () {
  const context: ICommonContext = this.context;
  roleSetting = new RoleSetting(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
});

When("User settings a role from precondition steps from csv file {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  fileDataCreate = filename;
  let selectedRole = rows[0].SelectedRole;
  let temp = await roleSetting.openRoleSettingByName(selectedRole);
  logFailTestcase(temp, `Open role setting "${selectedRole}" failed!`);

  await globalPageObject.waitForProgressBarLoaded_v2();
});

When("User updates the role with permissions from csv file", async () => {
  const rows = loader(convertPathFileDataToDataRegression(fileDataCreate));
  for (const row of rows) {
    let temp = await roleSetting.checkField(row.Permission, row.Selected);
    logFailTestcase(temp, `Check field "${row.Permission}" failed!`);
  }
  let temp = await globalPageObject.pressSaveTab();
  logFailTestcase(temp, "Press Save failed!");
});
Then("The role is successfully updated with the selected permissions", async function () {
  // await globalPageObject.waitForSeconds(30000000);
  await roleSetting.waitUntilCanCheckPermission();
  const rows = loader(convertPathFileDataToDataRegression(fileDataCreate));
  let countError: number = 0;
  for (const row of rows) {
    let checkError = await roleSetting.assertUpdatePermission(
      row.Permission,
      row.Selected
    );
    if (!checkError) {
      countError++;
    }
  }
  logFailTestcase(countError === 0, `Role Settings - Update Permissions: Testcase is failed!`);
});
