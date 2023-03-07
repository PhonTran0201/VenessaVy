import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2, logSuccessMessage, logWarningMessage } from "../../../../../../../shared/functions";


export class CaseDetailsInfoDetailNotes {
  //Element at Note widget
  private txtTitleNote = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-task-note-list//input");
  private txtDescriptionNote = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-task-note-list//textarea");
  private btnAddNote = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-task-note-list//button[not(@disabled)]//*[contains(text(),'Add Note')]");

  private lblTitleNote = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-task-note-list//*[(@appnotedetailstrigger)]");
  private lblDescriptionNote = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-task-note-list//li[1]/div[contains(@class,'media-body')]");

  constructor(private driverService: SeleniumWebDriverService) { }

  public async inputDataToCreateNoteAtCase(title: string, descrtiption: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtTitleNote);
      await this.driverService.setText(this.txtTitleNote, title);
      await this.driverService.setText(this.txtDescriptionNote, descrtiption);
      return true;
    } catch (error) {
      console.log("inputDataToCreateNoteAtCase");
      console.log(error);
      return false;
    }
  }

  public async pressAddNote() {
    try {
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.click(this.btnAddNote);
      return true;
    } catch (error) {
      console.log("pressAddNote");
      console.log(error);
      return false;
    }
  }

  public async assertNoteAtCaseManagement(title: string, description) {
    try {
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      const actualTitle = await (await this.driverService.getText(this.lblTitleNote)).trim();
      const actualDescription = (await this.driverService.getText(this.lblDescriptionNote)).split("\n")[3];
      logSuccessMessage(actualDescription);
      return await this.driverService.validateRecord("assert note at case management",
        [actualTitle, title, "Incorrect title"],
        [actualDescription, description, "Incorrect description"]);
    } catch (error) {
      console.log("assertNoteAtCaseManagement");
      console.log(error);
      return false;
    }
  }

  public async openCreateNoteForm() {
    try {
      const btnAddNote = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-task-note-list//button/i[contains(@class,'fa-plus')]");
      await this.driverService.waitUntilElementLoaded(btnAddNote);
      await this.driverService.click(btnAddNote);
      return true;
    } catch (error) {
      console.log("openCreateNoteForm");
      console.log(error);
      return false;
    }
  }

  public async openFirstNoteAtCase() {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblTitleNote);
      await this.driverService.click(this.lblTitleNote);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      return true;
    } catch (error) {
      console.log("openFirstNoteAtCase");
      console.log(error);
      return false;
    }
  }

  public async pressDeleteNoteByTitle(title: string) {
    try {
      const len = await (await this.driverService.findElements(this.lblTitleNote)).length;
      for (let i = 1; i <= len; i++) {
        const lblTitleNote = By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-task-note-list//*[(@appnotedetailstrigger)])[${i}]`);
        if ((await this.driverService.getText(lblTitleNote)).localeCompare(title) === 0) {
          const btnMediaAction = By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-task-note-list//button[@id='dropdown-edit-note'])[${i}]`);
          await this.driverService.click(btnMediaAction);
          await this.driverService.waitForSeconds(1000);
          const btnDeteleNote = By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-task-note-list//button/i[contains(@class,'fa-trash')])[${i}]`);
          await this.driverService.click(btnDeteleNote);
          return true;
        }
      }
      logWarningMessage(`Can not find note "${title}" in note list!`);
      return false;
    } catch (error) {
      console.log("pressDeleteNoteByTitle");
      console.log(error);
      return false;
    }
  }

  public async checkNoteExistingByTitle(title: string) {
    await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
    const titleNote = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-task-note-list//*[(@appnotedetailstrigger) and text()='${title}']`);
    return await this.driverService.isExisted(titleNote);
  }
}
