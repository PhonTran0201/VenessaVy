import { Before, Then, When } from "@cucumber/cucumber";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { RoleForm } from "../../../../page-objects/back-office-portal/general/role/role-forms/RoleForm";
import { RoleList } from "../../../../page-objects/back-office-portal/general/role/role-list/RoleList";
import { convertPathFileDataToDataRegression, logFailTestcase } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";

const loader = require("csv-load-sync");

let roleList: RoleList;
let roleForm: RoleForm;
let globalPageObject: GlobalPageObject;
let fileDataEdit: string = "";
Before(async function () {
  const context: ICommonContext = this.context;
  roleList = new RoleList(context.driverService);
  roleForm = new RoleForm(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
});

When("User inputs selected role with valid role data from csv file {string}", async function (filename) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  fileDataEdit = filename;
  for (let obj of rows) {
    const selectedRole = obj.SelectedRole;
    let temp = await roleList.pressEditByName(selectedRole);
    logFailTestcase(temp, `Press edit role "${selectedRole}" failed!`);

    const description = obj.EditedDescription;

    //ACTIONS
    temp = await roleForm.inputDescriptionOnRoleForm(description);
    logFailTestcase(temp, `Edit role "${selectedRole}" failed!`);

    temp = await globalPageObject.pressSaveForm();
    logFailTestcase(temp, `Save edit role "${selectedRole}" failed!`);
  }
});

Then("System shows updated role in the Role list", async function () {
  const rows = loader(convertPathFileDataToDataRegression(fileDataEdit));
  let len = rows.length;

  for (let i = len - 1, j = 1; i >= 0; i--, j++) {
    const name = rows[i].EditedName;
    const description = rows[i].EditedDescription;

    await roleList.assertRole(
      j, //position of row want to validate
      name,
      description
    );
  }
});
