import { Before, Given, Then, When } from "@cucumber/cucumber";
import { GlobalBrowserWindowHandle } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalBrowserWindowHandle";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { UserForm } from "../../../../page-objects/back-office-portal/general/user/user-forms/UserForm";
import { UserList } from "../../../../page-objects/back-office-portal/general/user/user-list/UserList";
import { convertPathFileDataToDataRegression, logFailTestcase } from '../../../../shared/functions';
import { ICommonContext } from "../../../../shared/interfaces";


const loader = require("csv-load-sync");


let userList: UserList;
let userForm: UserForm;
let globalPageObject: GlobalPageObject;
let globalBrowserWindowHandle: GlobalBrowserWindowHandle;

let fileDataEdit: string = "";
Before(async function () {
  const context: ICommonContext = this.context;
  userList = new UserList(context.driverService);
  userForm = new UserForm(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
  globalBrowserWindowHandle = new GlobalBrowserWindowHandle(context.driverService);
});
Given("User is on User list", async function () {
  await globalBrowserWindowHandle.refreshPage();
  let temp = await globalPageObject.navigateToMainUserList();
  logFailTestcase(temp, "User navigates to User list failed!");
});
When("User inputs a data from csv file {string} to user list", async function (filename) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  fileDataEdit = filename;
  await userList.expandNumberOfUserItemList();
  for (let obj of rows) {
    const selectedUser = obj.SelectedUser;
    let temp = await userList.pressEditByName(selectedUser);
    logFailTestcase(temp);

    //const userName = obj.UserName;
    const displayName = obj.DisplayName;
    const email = obj.Email;
    const assign = obj.AssignRole;
    const organization = obj.Organization;
    const language = obj.Language;
    //ACTIONS
    temp = await userForm.editUser(displayName, email, assign, organization, language);
    logFailTestcase(temp, "Can't input data to edit user form!");

    temp = await globalPageObject.pressSaveForm();
    logFailTestcase(temp, "Can't press save edit user!");
  }

}
);

Then("System shows updated user in the User list", async function () {
  const rows = loader(convertPathFileDataToDataRegression(fileDataEdit));
  let len = rows.length;

  await userList.expandNumberOfUserItemList();
  for (let i = len - 1, j = 1; i >= 0; i--, j++) {
    const displayName = rows[i].DisplayName;
    //const userName = rows[i].UserName;
    const email = rows[i].Email;

    await userList.assertUser(
      j, //position of row want to validate
      displayName,
      //userName,
      email
    );
  }
});
