import { Before, Then, When } from "@cucumber/cucumber";
import { RoleList } from "../../../../page-objects/back-office-portal/general/role/role-list/RoleList";
import { convertPathFileDataToDataRegression, logFailTestcase } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";

const loader = require("csv-load-sync");
let roleList: RoleList;
let fileDataEdit: string = "";

Before(async function () {
  const context: ICommonContext = this.context;
  roleList = new RoleList(context.driverService);
});
When("User settings and assigns a role from precondition steps from csv file {string}", async function (filename) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  fileDataEdit = filename;
  for (let obj of rows) {
    const selectedRole = obj.SelectedRole;
    let temp = await roleList.pressSettingByName(selectedRole);
    logFailTestcase(temp, `Press setting role "${selectedRole}" failed!`);
    const assigned = obj.AssignedRole;

    //ACTIONS
    temp = await roleList.addAssign(assigned);
    logFailTestcase(temp, `Assign role "${selectedRole}" - assigned: "${assigned}" failed!`);
  }
});

Then("The role is successfully updated with the assigned users", async function () {

  const rows = loader(convertPathFileDataToDataRegression(fileDataEdit));
  let len = rows.length;

  for (let i = len - 1, j = 1; i >= 0; i--, j++) {
    const fullname = rows[i].AssignedRole;

    await roleList.assertAssignedRole(
      j,//position of row want to validate
      fullname,
    );
  }
});
