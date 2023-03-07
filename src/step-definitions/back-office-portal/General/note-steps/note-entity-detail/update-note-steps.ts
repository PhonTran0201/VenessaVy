import { Before, Then, When } from "@cucumber/cucumber";
import { NoteForm } from "../../../../../page-objects/back-office-portal/general/note/note-forms/NoteForm";
import { NoteList } from "../../../../../page-objects/back-office-portal/general/note/note-list/NoteList";
import { logFailTestcase } from "../../../../../shared/functions";
import { ICommonContext } from "../../../../../shared/interfaces";

let noteList: NoteList;

Before(async function () {
  const context: ICommonContext = this.context;
  noteList = new NoteList(context.driverService);
});

When("User selects a note", async function () {
  let temp = await noteList.pressEditNote();
  logFailTestcase(temp, "Select a Note failed!");
});

Then("System shows updated note in the Note list", async function () {
  await noteList.assertNote(
    NoteForm.titleNote,
    NoteForm.descriptionNote,
    NoteForm.modifiedDate
  );
});
