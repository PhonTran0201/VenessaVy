import { Before, Given, Then, When } from "@cucumber/cucumber";
import { AccountDetailsLeftSide } from "../../../../../page-objects/back-office-portal/general/account/account-details/left-side/AccountDetailsLeftSide";
import { AccountTabSummary } from "../../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-summary/AccountTabSummary";
import { AppEntityWidgets } from "../../../../../page-objects/back-office-portal/general/app-entity-widgets/AppEntityWidgets";
import { GlobalPageObject } from "../../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { NoteForm } from "../../../../../page-objects/back-office-portal/general/note/note-forms/NoteForm";
import { NoteList } from "../../../../../page-objects/back-office-portal/general/note/note-list/NoteList";
import { convertPathFileDataToDataRegression, getCurrentDateTime, logFailTestcase } from "../../../../../shared/functions";
import { ICommonContext } from "../../../../../shared/interfaces";


const loader = require("csv-load-sync");

let noteList: NoteList;
let noteForm: NoteForm;

let accountDetailsLeftSide: AccountDetailsLeftSide;
let globalPageObject: GlobalPageObject;
let accountTabSummary: AccountTabSummary;

let appEntityWidgets: AppEntityWidgets;

let fileDataEdit: string = "";


Before(async function () {
  const context: ICommonContext = this.context;
  noteList = new NoteList(context.driverService);
  noteForm = new NoteForm(context.driverService);

  accountDetailsLeftSide = new AccountDetailsLeftSide(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
  appEntityWidgets = new AppEntityWidgets(context.driverService);
  accountTabSummary = new AccountTabSummary(context.driverService);
});

Given("User navigates to Note List", async function () {
  const temp = await globalPageObject.navigateToSubNotes();
  logFailTestcase(temp, "Navigate to Note List failed!");
});
Given("User opens create Note form", async () => {
  const temp = await globalPageObject.pressCreateTab();
  logFailTestcase(temp, "Open Create Note form failed!");
});

When("User inputs valid note data from csv file {string}",
  async function (filename) {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    fileDataEdit = filename;
    const organization = rows[0].Organization;
    const title = rows[0].Title;
    const description = rows[0].Description;
    const entityType = rows[0].SelectEntityType;
    const searchEntity = rows[0].SearchEntity;

    if (organization) {
      let temp = await noteForm.inputOrganizationOnNoteForm(organization);
      logFailTestcase(temp, "Input Organization to Note form failed!");
    }

    if (title) {
      let temp = await noteForm.inputTitleOnNoteForm(title);
      logFailTestcase(temp, "Input title to Note form failed!");
    }

    if (description) {
      let temp = await noteForm.inputDescriptionOnNoteForm(description);
      logFailTestcase(temp, "Input description to Note form failed!");
    }

    if (entityType) {
      let temp = await noteForm.inputSelectEntityTypeOnNoteForm(entityType);
      logFailTestcase(temp, "Select Entity type failed!");

      if (searchEntity) {
        temp = await noteForm.inputSearchEntityOnNoteForm(searchEntity);
        logFailTestcase(temp, "Input Entity name failed!");
      }
    }

    NoteForm.titleNote = title;
    NoteForm.descriptionNote = description;
    NoteForm.entityType = entityType;
    NoteForm.entity = searchEntity;
    NoteForm.modifiedDate = getCurrentDateTime();

    let temp = await globalPageObject.pressSaveForm();
    logFailTestcase(temp, "Press save Note form failed!");

    temp = await globalPageObject.waitForProgressBarLoaded();
    logFailTestcase(temp, "Press save Note form failed!");
  }
);

Then("System shows new note in the Note list", async function () {
  await globalPageObject.navigateToSubNotes();

  await noteList.assertNote(
    NoteForm.titleNote,
    NoteForm.descriptionNote,
    NoteForm.modifiedDate
  );
});
Then("System shows new note in the Summary", async function () {
  const rows = loader(convertPathFileDataToDataRegression(fileDataEdit));
  let len = rows.length;

  for (let i = len - 1, j = 1; i >= 0; i--, j++) {
    const name = rows[i].Title;
    const description = rows[i].Description;
    let temp = await globalPageObject.navigateToSubSummary();
    logFailTestcase(temp, "Navigate to Summary tab failed!");

    temp = await accountTabSummary.selectSummaryViewLayout("Summary");
    // logFailTestcase(temp, `Select layout for summary tab failed!`);

    await globalPageObject.waitForProgressBarLoaded_v2();
    temp = await appEntityWidgets.assertNoteWidget(name, description, j);
    logFailTestcase(temp, "Create note failed!");
  }
});

Given("User clicks on Create Note button in account detail", async () => {
  let temp = await accountDetailsLeftSide.clickCreateNoteAccountButton();
  logFailTestcase(temp, "click Create Note Button on Account detail failed!");
});
