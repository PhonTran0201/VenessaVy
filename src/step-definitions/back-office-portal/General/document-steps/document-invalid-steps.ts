import { Before, Then, When } from "@cucumber/cucumber";
import { fail } from "assert";
import { AccountTabDocumentForm } from "../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-document/AccountTabDocumentForm";
import { AccountTabDocumentList } from "../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-document/AccountTabDocumentList";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { ValidateField } from '../../../../shared/classes';
import { convertPathFileDataToDataRegression, logFailMessage, logInfoMessage, logSuccessMessage, logWarningMessage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { dataTestcase, scenarioName, subErrorMessages } from '../../../../shared/variables';


const loader = require("csv-load-sync");

let fileDataCreate: string = "";
let accountTabDocumentList: AccountTabDocumentList;
let accountTabDocumentForm: AccountTabDocumentForm;
let globalPageObject: GlobalPageObject;

Before(async function () {
  const context: ICommonContext = this.context;
  accountTabDocumentList = new AccountTabDocumentList(context.driverService);
  accountTabDocumentForm = new AccountTabDocumentForm(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
});

When("User uploads invalid document from csv file {string}",
  async function (filename) {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    fileDataCreate = filename;
    for (let i = 0; i < rows.length; i++) {
      try {
        await accountTabDocumentList.openUploadDocumentPopup();
        const Name = rows[i].Name;
        const Tags = rows[i].Tags;
        const Description = rows[i].Description;
        const temp = __dirname;
        let UploadDocuments = "";

        if (!(__dirname.includes("jenkins") && !__dirname.includes(".jenkins"))){
          logInfoMessage("Runing on local...");
          UploadDocuments =
            __dirname.substring(0, temp.length - 54) + "\\" + rows[i].UploadDocuments;
        }
        else {
          logInfoMessage("Running on jenkins...");
          UploadDocuments = __dirname.substring(0, temp.length - 54) + "/" + rows[i].UploadDocuments.replace("\\", "/");
        }
        logInfoMessage("\tFinal file path:");
        logInfoMessage("\t\t" + UploadDocuments);

        let validationField = new ValidateField(Tags, i, true, [], []);

        if (Name) {
          await accountTabDocumentForm.inputNameOnDocumentForm(Name);
        }
        if (Tags) {
          await accountTabDocumentForm.inputTagOnDocumentForm(Tags);
        }
        if (Description) {
          await accountTabDocumentForm.inputDescriptionOnDocumentForm(Description);
        }
        if (UploadDocuments) {
          await accountTabDocumentForm.inputUploadFileOnDocumentForm(UploadDocuments);
        }

        await globalPageObject.pressSaveForm();
        validationField = await accountTabDocumentForm.validateFields(validationField);
        if (!validationField.status) {
          await globalPageObject.pressCancelForm();
        }
        dataTestcase.push(validationField);
      } catch (error) {
        console.log("User uploads invalid document from csv file");
        console.log(error);
      }
    }
  }
);

Then("System shows error notifications fields Document", async () => {
  const rows = loader(convertPathFileDataToDataRegression(fileDataCreate));
  let len = rows.length;
  let countError = 0;

  for (let i = 0; i < len; i++) {
    const casetitle = rows[i].CaseTitle;

    console.log(`\nChecking case at Line ${i + 1} at file CSV - ${casetitle} :`);

    if (dataTestcase[i].message.length === 0) {//Trường hợp mình không Case form không có xuất bất cứ cái error validation nào => Sai so với mong đợi
      countError++;
      logWarningMessage(`\nWe didn't get any error validation messages at Case form!`);
      logFailMessage(`\n\tLine ${i + 1} is failed!`);
    }
    else {//Trường hợp có xuất hiện error validation trên form => Đúng mong đợi
      logInfoMessage(`\nError validation messages on Case form are:`);
      for (const record of dataTestcase[i].message) {
        logFailMessage("\t" + record);
      }
      for (const record of dataTestcase[i].toastMessage) {
        logFailMessage("\t" + record);
      }
      logSuccessMessage(`\n\tLine ${i + 1} is passed!`);
    }
  }


  if (countError > 0) {//Ngay tại bước này là Test case bị dừng luôn, sẽ không cần đến bước "Then" tiếp theo 
    fail(scenarioName + ": Test case is failed!" + subErrorMessages);
  }
  else {
    logSuccessMessage(scenarioName + "\n\tStep: System shows error notifications fields Document: is passed!");
  }

});


Then("System does not show new document in the Document list", async () => {
  const rows = loader(convertPathFileDataToDataRegression(fileDataCreate));
  let len = rows.length;

  for (let i = len - 1, j = 1; i >= 0; i--, j++) {
    const name = rows[i].Name;
    const tags = rows[i].Tags;
    const description = rows[i].Description;

    await accountTabDocumentList.assertDocumentExistence(
      j, //position of row want to validate
      name,
      tags,
      description
    );
  }
});