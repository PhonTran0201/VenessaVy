import { Before, Given, Then, When } from "@cucumber/cucumber";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { RoleForm } from "../../../../page-objects/back-office-portal/general/role/role-forms/RoleForm";
import { RoleList } from "../../../../page-objects/back-office-portal/general/role/role-list/RoleList";
import { convertPathFileDataToDataRegression, logFailTestcase } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";

let roleList: RoleList;
let roleForm: RoleForm;
let globalPageObject: GlobalPageObject;
const loader = require("csv-load-sync");
let fileDataCreate: string = "";

Before(async function () {
  const context: ICommonContext = this.context;
  roleList = new RoleList(context.driverService);
  roleForm = new RoleForm(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
});

Given("User navigates to Roles page", async function () {
  let temp = await globalPageObject.navigateToMainRoleList();
  logFailTestcase(temp, "Navigates to Role list failed!");
});

When("User inputs valid role data from csv file {string}", async (filename) => {
  //CONVERT DATAS
  const rows = loader(convertPathFileDataToDataRegression(filename));
  fileDataCreate = filename;

  for (let obj of rows) {
    await roleList.presscreateRolebtn();
    const name = obj.Name;
    const description = obj.Description;

    //ACTIONS
    await roleForm.inputNameOnRoleForm(name);
    await roleForm.inputDescriptionOnRoleForm(description);

    await globalPageObject.pressSaveForm();
    await globalPageObject.waitForProgressBarLoaded_v2();
    await globalPageObject.waitForProgressBarLoaded_v2();
  }
});

Then("System shows new role in the Role list", async function () {
  const rows = loader(convertPathFileDataToDataRegression(fileDataCreate));
  let len = rows.length;

  await globalPageObject.navigateToMainRoleList();
  await globalPageObject.expandNumberOfItemMainList();
  for (let i = len - 1, j = 1; i >= 0; i--, j++) {
    const name = rows[i].Name;
    const description = rows[i].Description;

    await roleList.assertRole(
      j, //position of row want to validate
      name,
      description
    );
  }
});
