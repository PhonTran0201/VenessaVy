import { Before, Then, When } from "@cucumber/cucumber";
import { GlobalPageObject } from "../../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { NoteForm } from "../../../../../page-objects/back-office-portal/general/note/note-forms/NoteForm";
import { NoteList } from "../../../../../page-objects/back-office-portal/general/note/note-list/NoteList";
import { ValidateField } from "../../../../../shared/classes";
import { convertPathFileDataToDataRegression, logFailMessage, logSuccessMessage, logWarningMessage } from "../../../../../shared/functions";
import { ICommonContext } from "../../../../../shared/interfaces";
import { dataTestcase } from "../../../../../shared/variables";



const loader = require("csv-load-sync");

let noteList: NoteList;
let noteForm: NoteForm;
let globalPageObject: GlobalPageObject;
let fileDataCreate: string = "";

let expectedTitle: string;
let expectedDescription: string;

Before(async function () {
  const context: ICommonContext = this.context;
  noteList = new NoteList(context.driverService);
  noteForm = new NoteForm(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
});

When("User inputs invalid note data from csv file {string}", async function (filename: string) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  fileDataCreate = filename;
  for (let i = 0; i < rows.length; i++) {
    try {
      await globalPageObject.pressCreateTab();
      const title = rows[i].Title;
      const description = rows[i].Description;
      let validationField = new ValidateField(title, i, true, [], []);

      expectedTitle = title;
      expectedDescription = description;

      if (title) {
        await noteForm.inputTitleOnNoteForm(title);
      }

      if (description) {
        await noteForm.inputDescriptionOnNoteForm(description);
      }

      await globalPageObject.pressSaveForm();
      validationField = await noteForm.validateFields(validationField);
      if (!validationField.status) {
        await globalPageObject.pressCancelForm();
      }
      dataTestcase.push(validationField);
    } catch (error) {
      console.log("User inputs invalid note data from csv file");
      console.log(error);
    }
  }
});

When("User edits invalid note data from csv file {string}", async function (filename: string) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  fileDataCreate = filename;
  for (let i = 0; i < rows.length; i++) {
    try {
      await globalPageObject.reloadTable();
      const selectedNote = rows[i].SelectedNote;
      await noteList.openEditNoteByName(selectedNote);
      const title = rows[i].Title;
      const description = rows[i].Description;
      let validationField = new ValidateField(title, i, true, [], []);

      expectedTitle = title;
      expectedDescription = description;

      if (title) {
        await noteForm.inputTitleOnNoteForm(title);
      }

      if (description) {
        await noteForm.inputDescriptionOnNoteForm(description);
      }

      await globalPageObject.pressSaveForm();
      validationField = await noteForm.validateFields(validationField);
      if (!validationField.status) {
        await globalPageObject.pressCancelForm();
      }
      dataTestcase.push(validationField);
    } catch (error) {
      console.log("User inputs invalid note data from csv file");
      console.log(error);
    }
  }
});

Then("System shows error notifications fields Note", async function () {
  const rows = loader(convertPathFileDataToDataRegression(fileDataCreate));
  let len = rows.length;
  let countError = 0;

  for (let i = len - 1, j = 1; i >= 0; i--, j++) {
    expectedTitle = rows[i].Title;
    expectedDescription = rows[i].Description;

    console.log("\nChecking " + expectedTitle + ":");
    if (dataTestcase[i].status === true) {
      if (!(await noteList.assertNoteByRow(j, expectedTitle, expectedDescription))) {
        countError++;
      }
    } else {
      countError++;
      j--;
      logWarningMessage("\n" + dataTestcase[i].nameField + " is failed with error messages: ");
      for (const record of dataTestcase[i].message) {
        logFailMessage("\t" + record);
      }
      for (const record of dataTestcase[i].toastMessage) {
        logFailMessage("\t" + record);
      }
    }
  }

  if (countError > 0) {
    console.log("[TC_Regression] [Notes] Negative Case - Succeed");
  }
  else {
    logSuccessMessage("[TC_Regression] [Notes] Negative Case - failed");
  }
});

Then("System does not show new note in the Note list", async function () {
  const rows = loader(convertPathFileDataToDataRegression(fileDataCreate));
  let len = rows.length;

  for (let i = len - 1, j = 1; i >= 0; i--, j++) {
    const title = rows[i].Title;
    const description = rows[i].Description;

    await noteList.assertNoteExistence(
      j, //position of row want to validate
      title,
      description,
    );
  }
});
