import { Before, Given, Then, When } from "@cucumber/cucumber";
import { te } from "date-fns/locale";
import { AccountDetailsLeftSide } from "../../../../page-objects/back-office-portal/general/account/account-details/left-side/AccountDetailsLeftSide";
import { AccountRelationshipForm } from "../../../../page-objects/back-office-portal/general/account/account-forms/AccountRelationshipForm";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { convertPathFileDataToDataRegression, logFailTestcase } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";

const loader = require("csv-load-sync");
let accountRelationshipForm: AccountRelationshipForm;
let globalPageObject: GlobalPageObject;
let accountDetailsLeftSide: AccountDetailsLeftSide;

Before(async function () {
  const context: ICommonContext = this.context;
  accountRelationshipForm = new AccountRelationshipForm(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
  accountDetailsLeftSide = new AccountDetailsLeftSide(context.driverService)
});

Given("User presses Add Relationship on account form", async () => {
  const temp =
    await accountRelationshipForm.openCreateAccountRelationshipForm();
  logFailTestcase(temp, "Navigate to Create Account Relationship form failed!");
});

When(
  "User presses Edit Relationship on Account form {string}",
  async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const SelectedAccount = row.SelectedAccount;
    const temp =
      await accountRelationshipForm.openEditRelationshipFormByAccount(
        SelectedAccount
      );
    logFailTestcase(
      temp,
      `Open edit lead with name "${SelectedAccount}" failed!`
    );
  }
);

When(
  "User presses Delete Relationship on Account form {string}",
  async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const SelectedAccount = row.SelectedAccount;
    const temp =
      await accountRelationshipForm.openDeleteRelationshipFormByAccount(
        SelectedAccount
      );
    logFailTestcase(
      temp,
      `Open delete relationsh with account "${SelectedAccount}" failed!`
    );
  }
);
When("User presses Yes button on Delete Relationship form", async () => {
  const temp = await globalPageObject.pressYesForm();
  logFailTestcase(temp, "Cannot confirm delete relationship");
});

When("User input valid data into Add Relationship form {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  const Account = row.Account;
  const Type = row.Type;

  let temp = true;
  if (Account) {
    temp = await accountRelationshipForm.inputAccountOnRelationshipForm(Account);
    logFailTestcase(temp, "Input Account failed");
  }

  if (Type) {
    temp = await accountRelationshipForm.inputTypeOnRelationshipForm(Type);
    logFailTestcase(temp, "Input Type failed");
  }
}
);

When("User verifies dropdown Account on Add Relationship form {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const row = rows[0];

  const Accounts = row.Accounts.split(";");
  for (const acc of Accounts) {
    let temp = await accountRelationshipForm.inputAccountOnRelationshipForm(acc);
    logFailTestcase(temp, `Not found account ${acc} on dropdown!`);
  }
});

When("User presses Save button on Add Relationship form", async () => {
  const temp = await globalPageObject.pressSaveForm();
  logFailTestcase(temp, "Save Relationship Form failed!");
});

Then(
  "System shows new relationship in the Account Relationship list {string}",
  async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];

    const Account = row.Account || row.SelectedAccount;
    const Type = row.Type || row.CustomerType;

    // await globalPageObject.reloadTable();
    await globalPageObject.waitForProgressBarLoaded_v2();

    if (Account) {
      logFailTestcase(
        await accountRelationshipForm.validateRelationship(
          Account,
          "Account",
          1
        )
      );
    }

    if (Type) {
      logFailTestcase(
        await accountRelationshipForm.validateRelationship(Type, "Type", 1)
      );
    }
  }
);
Then("System shows delete relationship successfully", async () => {
  const temp = await accountRelationshipForm.validateDeletion();
  logFailTestcase(temp, "Delete Relationship failed");
});

When("User adds Child relationships with a Accounts on Edited Account form {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  const Account = row.SelectedAccount;
  const Type = row.CustomerType;


  let temp = true;
  temp = await accountDetailsLeftSide.clickEditAccountButton();
  logFailTestcase(temp, "Click edit button on Detail account failed!");

  temp = await accountRelationshipForm.openCreateAccountRelationshipForm();
  logFailTestcase(temp, "Navigate to Create Account Relationship form failed!");

  if (Account) {
    temp = await accountRelationshipForm.inputAccountOnRelationshipForm(Account);
    logFailTestcase(temp, "Input Account failed");
  }

  if (Type) {
    temp = await accountRelationshipForm.inputTypeOnRelationshipForm(Type);
    logFailTestcase(temp, "Input Type failed");
  }

  temp = await globalPageObject.pressSaveForm();
  logFailTestcase(temp, "Save Relationship Form failed!");
}

);

Then("System shows the success updated account notification", async () => {
  await globalPageObject.waitForProgressBarLoaded();
  let temp = await globalPageObject.checkToastSuccessExistWithMessage(`Updated account successfully!`);
  logFailTestcase(temp, `"Updated account successfully!" notification not found`);
});


When("User removes the relationship on Edited Account form {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  const Account = row.SelectedAccount;
  const Type = row.CustomerType;


  let temp = true;
  temp = await accountDetailsLeftSide.clickEditAccountButton();
  logFailTestcase(temp, "Click edit button on Detail account failed!");

  temp = await accountRelationshipForm.openDeleteRelationshipFormByAccount(Account);
  logFailTestcase(temp, `delete relationship with account "${Account}" failed!`);
});

Then("System shows the notification that cannot remove the relationship", async () => {
  await globalPageObject.waitForProgressBarLoaded();
  let temp = await globalPageObject.checkToastErrorExistWithMessage(`Cannot remove the relationship. This account has shared frame agreement(s) with other account(s)`);
  logFailTestcase(temp, `The "Cannot remove the relationship. This account has shared frame agreement(s) with other account(s)" message not found!`);
});

Then("System does not show the relationship on relationships list from account details", async () => {
  await globalPageObject.waitForSeconds(3000);
  let temp = await accountDetailsLeftSide.clickEditAccountButton();
  logFailTestcase(temp, "Click edit button on Detail account failed!");

  temp = await accountRelationshipForm.validateDeletion();
  logFailTestcase(temp, "Delete Relationship failed");

  await globalPageObject.closeOpeningForm();

});