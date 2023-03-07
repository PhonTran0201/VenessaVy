import { Before, Then, When } from "@cucumber/cucumber";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { RoleList } from "../../../../page-objects/back-office-portal/general/role/role-list/RoleList";
import { convertPathFileDataToDataRegression, logFailTestcase } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";

const loader = require("csv-load-sync");

let roleList: RoleList;
let globalPageObject: GlobalPageObject;
let fileDataEdit: string = "";
Before(async function () {
  const context: ICommonContext = this.context;
  roleList = new RoleList(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
});

When(
  "User clicks Delete button and confirm the deletion role from csv file {string}",
  async (filename: string) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    fileDataEdit = filename;
    for (let obj of rows) {
      const deleteRole = obj.DeleteRole;
      let temp = await roleList.pressDeleteByName(deleteRole);
      logFailTestcase(temp, `Delete role "${deleteRole}" failed!`);
      //ACTIONS
      temp = await globalPageObject.pressYesForm();
      logFailTestcase(temp, `Press Yes form - Delete role "${deleteRole}" failed!`);
    }
  }
);

Then("System deletes this role {string}", async (filename: string) => {
  let temp = await globalPageObject.navigateToMainRoleList();
  logFailTestcase(temp, "Navigates to Role list failed!");
  await globalPageObject.closeAllToastSuccess();
  const rows = loader(convertPathFileDataToDataRegression(filename));
  let deleteRole = rows[0].Name;
  if (!deleteRole) {
    deleteRole = rows[0].EditedName;
    if (!deleteRole) {
      deleteRole = rows[0].SelectedRole;
    }
  }
  temp = await roleList.pressDeleteByName(deleteRole);
  logFailTestcase(temp, `Press delete role "${deleteRole}" failed!`);

  temp = await globalPageObject.pressYesForm();
  logFailTestcase(temp, `Press Yes - delete role "${deleteRole}" failed!`);
}
);

Then("The role is no longer found in grid", async function () {
  const rows = loader(convertPathFileDataToDataRegression(fileDataEdit));
  let len = rows.length;

  for (let i = len - 1, j = 1; i >= 0; i--, j++) {
    const name = rows[i].Name;
    const description = rows[i].Description;

    await globalPageObject.expandNumberOfItemMainList();
    await roleList.assertDeleteRole(
      j, //position of row want to validate
      name,
      description
    );
  }
});
