import { Before, Given, Then, When } from "@cucumber/cucumber";
import { GlobalBrowserWindowHandle } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalBrowserWindowHandle";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { UserForm } from "../../../../page-objects/back-office-portal/general/user/user-forms/UserForm";
import { UserList } from "../../../../page-objects/back-office-portal/general/user/user-list/UserList";
import { convertPathFileDataToDataRegression, getCurrentDateTime, logFailTestcase, randomModulus11ForSSN } from '../../../../shared/functions';
import { ICommonContext } from "../../../../shared/interfaces";


let userForm: UserForm;
let userList: UserList
let globalPageObject: GlobalPageObject;
let globalBrowserWindowHandle: GlobalBrowserWindowHandle;

const loader = require("csv-load-sync");

let fileDataCreate: string = "";

Before(async function () {
  const context: ICommonContext = this.context;
  userForm = new UserForm(context.driverService);
  userList = new UserList(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
  globalBrowserWindowHandle = new GlobalBrowserWindowHandle(context.driverService);
});

Given("User is on Invite User popup", async function () {
  await globalBrowserWindowHandle.refreshPage();
  let temp = await globalPageObject.navigateToMainUserList();
  logFailTestcase(temp, "User is on Invite User popup");
});

When(`User opens Invite User form`, async () => {
  let temp = await userList.pressinviteUserbtn();
  logFailTestcase(temp, "Failed to click Invite User button");
})

When("User inputs a user data from csv file {string}", async (filename) => {
  //Imp
  // await leadInteract.pressNewLead();

  //CONVERT DATAS
  const rows = loader(convertPathFileDataToDataRegression(filename));
  fileDataCreate = filename;
  // console.log(LeadInteract.state + "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

  for (let obj of rows) {
    await userList.pressinviteUserbtn();
    const userName = randomModulus11ForSSN();
    const displayName = obj.DisplayName;
    const email = obj.Email;
    const assign = obj.AssignRole;
    const organization = obj.Organization;
    const language = obj.Language;
    //ACTIONS
    let temp = await userForm.inputUser(userName, displayName, email, assign, organization, language);
    logFailTestcase(temp, "Can't input data to create user form!");

    temp = await globalPageObject.pressSaveForm();
    logFailTestcase(temp, "Can't press Save user form");
  }
});

Then("System invites user successfully", async function () {
  const rows = loader(convertPathFileDataToDataRegression(fileDataCreate));
  let len = rows.length;

  await globalBrowserWindowHandle.refreshPage();
  await globalPageObject.navigateToMainUserList();
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
Then(`System shows {string} option on Invite User popup {string}`, async (language, filename) => {
  var fs = require('fs')
  var logger = fs.createWriteStream('./result/SAAS-13419_UI_Test_Report.csv', {
    flags: 'a' // 'a' means appending (old data will be preserved)
  })
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  let Flag = row.Flag;
  let temp = await userForm.inputLanguage(language);

  let tempString;
  if (temp) {
    tempString = "Yes"
  } else {
    tempString = "No"
  }

  logger.write(`\r\n` + `User Management,10,${language},` + `${Flag},` + `${tempString},` + getCurrentDateTime() + `,Under Language option`); // append string to your file

  if ((tempString != Flag) && !(Flag == "Optional")) {
    logFailTestcase(false, `Invite User form language option is expected to be ${Flag} but got ${tempString}`)
  }

})