import { Before, Then, When } from "@cucumber/cucumber";
import { AppEntityWidgets } from "../../../../../page-objects/back-office-portal/general/app-entity-widgets/AppEntityWidgets";
import { GlobalPageObject } from "../../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { NoteList } from "../../../../../page-objects/back-office-portal/general/note/note-list/NoteList";
import { convertPathFileDataToDataRegression, logFailTestcase } from "../../../../../shared/functions";
import { ICommonContext } from "../../../../../shared/interfaces";

const loader = require("csv-load-sync");

let noteList: NoteList;
let appEntityWidgets: AppEntityWidgets;
let globalPageObject: GlobalPageObject;

let fileDataEdit: string = "";

Before(async function () {
  const context: ICommonContext = this.context;
  noteList = new NoteList(context.driverService);
  appEntityWidgets = new AppEntityWidgets(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
});

When("User deletes a note from csv file {string}", async (filename: string) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  fileDataEdit = filename;
  for (let obj of rows) {
    const deleteNote = obj.Title;
    let temp = await noteList.pressDeleteNoteByName(deleteNote);
    logFailTestcase(temp, "Press delete note failed!");
    temp = await globalPageObject.pressYesForm();
    logFailTestcase(temp, "Press Yes confirmation delete note failed!");
  }
});

Then("System does not show note in the Note list", async function () {
  const rows = loader(convertPathFileDataToDataRegression(fileDataEdit));
  let len = rows.length;

  for (let i = len - 1, j = 1; i >= 0; i--, j++) {
    const name = rows[i].Title;
    const description = rows[i].Description;

    let temp = await noteList.assertDeleteNote(
      j, //position of row want to validate
      name,
      description
    );
    logFailTestcase(temp, `Delete Note failed!`);
  }
});

Then("System does not show note in the Summary", async function () {
  const rows = loader(convertPathFileDataToDataRegression(fileDataEdit));
  let len = rows.length;
  let temp = await globalPageObject.navigateToSubSummary();
  logFailTestcase(temp, "Navigates to Summary tab failed!");

  for (let i = len - 1, j = 1; i >= 0; i--, j++) {
    const name = rows[i].Title;
    const description = rows[i].Description;

    temp = await appEntityWidgets.assertNoteWidget(
      name,
      description,
      j
    );
    logFailTestcase(!temp, `Note with title "${name}" is still on Widget!`);
  }
});