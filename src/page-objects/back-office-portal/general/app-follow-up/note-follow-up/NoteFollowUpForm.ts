import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";
import { NoteForm } from "../../note/note-forms/NoteForm";

export class NoteFollowUpForm extends NoteForm {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }

  //Xpath of elements on Note form - input field
  protected cmbOrganization = By.xpath(`//app-follow-up//app-note-form//div[./label[text()=' Organization ']]//input`);
  protected txtTitle = By.xpath(`//app-follow-up//app-note-form//div[./label[text()=' Title ']]//input`);
  protected iframeDescription = By.xpath("//app-follow-up//app-note-form//iframe");
  protected txtDescription = By.xpath(`//body/p`);
  protected cmbSelectEntityType = By.xpath(`(//app-follow-up//app-note-form//div[./label[text()=' Related records ']]//input)[1]`);
  protected cmbSearchEntity = By.xpath(`(//app-follow-up//app-note-form//div[./label[text()=' Related records ']]//input)[2]`);

  //Xpath "x" - clear-all on Register a claim form
  protected btnClearOrganization = By.xpath(`//app-follow-up//app-note-form//formly-org-autocomplete//*[contains(@title,'Clear all')]`);
  protected btnClearTitle = By.xpath(`//app-follow-up//app-note-form//div[./label[text()=' Title ']]//button`);
  protected btnClearRelatedRecords = By.xpath(`(//app-follow-up//app-note-form//div[contains(@class,'entity-items-select')]//i)[2]`);

  // Footer
  protected btnSave = By.xpath(`//app-follow-up//app-note-form//button//*[contains(text(),'Save')]`);

  //#region Buttons on footer
  public async pressSaveOnNoteForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnSave);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.click(this.btnSave);
      return true;
    } catch (error) {
      console.log("pressSaveOnNoteForm");
      console.log(error);
      return false;
    }
  }
  //#endregion
}