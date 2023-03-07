import { Before, Given, Then, When } from "@cucumber/cucumber";
import { NoteFollowUpForm } from "../../../../../page-objects/back-office-portal/general/app-follow-up/note-follow-up/NoteFollowUpForm";
import { NoteFollowUpList } from "../../../../../page-objects/back-office-portal/general/app-follow-up/note-follow-up/NoteFollowUpList";
import { AppFooter } from "../../../../../page-objects/back-office-portal/general/app-footer/AppFooter";
import { NoteForm } from "../../../../../page-objects/back-office-portal/general/note/note-forms/NoteForm";
import { NoteList } from "../../../../../page-objects/back-office-portal/general/note/note-list/NoteList";
import { convertPathFileDataToDataRegression, getCurrentDateTime, logFailTestcase } from "../../../../../shared/functions";
import { ICommonContext } from "../../../../../shared/interfaces";

const loader = require("csv-load-sync");
let noteFollowUpForm: NoteFollowUpForm;
let noteFollowUpList: NoteFollowUpList;
let appFooter: AppFooter;
let noteList: NoteList;

Before(async function () {
  const context: ICommonContext = this.context;
  noteFollowUpForm = new NoteFollowUpForm(context.driverService);
  noteFollowUpList = new NoteFollowUpList(context.driverService);
  appFooter = new AppFooter(context.driverService);
  noteList = new NoteList(context.driverService);
});

Given("User clicks on Note button from global", async function () {
  const temp = await appFooter.pressNoteOnAppFollowUp();
  logFailTestcase(temp, "Press Note button on App Follow Up failed!");
});

When("User inputs valid global note data from csv file {string}", async function (filename) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const title = rows[0].Title;
  const description = rows[0].Description;
  const entityType = rows[0].SelectEntityType;
  const firstName = rows[0].FirstName;
  const lastName = rows[0].LastName;
  const caseTitle = rows[0].CaseTitle;
  const saleName = rows[0].SaleName;

  let entityName: string = "";
  switch (entityType) {
    case "Account":
    case "Lead":
    case "Contact":
      entityName = (firstName + " " + lastName).trim();
      break;
    case "Sales":
      entityName = saleName;
      break;
    case "Case":
      entityName = caseTitle;
      break;
    case "Call log":
      // logWarningMessage("Currently, we dont't support about creating note for Call log");
      break;
    default:
      logFailTestcase(false, `Can't find ${entityType}!`);
  }

  let temp = await noteFollowUpForm.inputTitleOnNoteForm(title);
  logFailTestcase(temp, "Input title at Note Gloabal failed!");

  temp = await noteFollowUpForm.inputDescriptionOnNoteForm(description);
  logFailTestcase(temp, "Input description at Note Gloabal failed!");

  temp = await noteFollowUpForm.inputSelectEntityTypeOnNoteForm(entityType);
  logFailTestcase(temp, "Input Entity Type at Note Gloabal failed!");

  temp = await noteFollowUpForm.inputSearchEntityOnNoteForm(entityName);
  logFailTestcase(temp, "Input Entity Name at Note Gloabal failed!");

  NoteForm.titleNote = title;
  NoteForm.descriptionNote = description;
  NoteForm.entityType = entityType;
  NoteForm.entity = entityName;
  NoteForm.entityFirstName = firstName;
  NoteForm.entityLastName = lastName;
  NoteForm.modifiedDate = getCurrentDateTime();

  temp = await noteFollowUpForm.pressSaveOnNoteForm();
  logFailTestcase(temp, "Press save global note failed!");
});

Then("System shows new note in the Note list of selected entity", async function () {
  await noteFollowUpList.openEntityTypeList(NoteForm.entityType);
  await noteFollowUpList.openEntityByName(NoteForm.entityType, NoteForm.entityFirstName, NoteForm.entityLastName, NoteForm.entity);
  await noteList.openNoteListByEntityType(NoteForm.entityType);
  await noteFollowUpList.assertCreateGlobalNote(NoteForm.entityType, NoteForm.titleNote, NoteForm.descriptionNote, NoteForm.modifiedDate);
});
