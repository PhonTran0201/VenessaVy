import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { ValidateField } from "../../../../../shared/classes";
import { waitUntilHorizontalProgressBarLoaded_v2, selectDropdownOption } from "../../../../../shared/functions";

export class NoteForm {
  public static titleNote: string;
  public static descriptionNote: string;
  public static modifiedDate: string;
  public static entityType: string;
  public static entity: string;
  public static entityFirstName: string;
  public static entityLastName: string;

  //Xpath of elements on Note form - input field
  protected cmbOrganization = By.xpath(`//ngb-modal-window//app-note-form//div[./label[text()=' Organization ']]//input`);
  protected txtTitle = By.xpath(`//ngb-modal-window//app-note-form//div[./label[text()=' Title ']]//input`);
  protected iframeDescription = By.xpath("//ngb-modal-window//app-note-form//iframe");
  protected txtDescription = By.xpath(`//body/p`);
  protected cmbSelectEntityType = By.xpath(`(//ngb-modal-window//app-note-form//div[./label[text()=' Related records ']]//input)[1]`);
  protected cmbSearchEntity = By.xpath(`(//ngb-modal-window//app-note-form//div[./label[text()=' Related records ']]//input)[2]`);


  //Xpath "x" - clear-all on Register a claim form
  protected btnClearOrganization = By.xpath(`//ngb-modal-window//app-note-form//formly-org-autocomplete//*[contains(@title,'Clear all')]`);
  protected btnClearTitle = By.xpath(`//ngb-modal-window//app-note-form//div[./label[text()=' Title ']]//button`);
  protected btnClearRelatedRecords = By.xpath(`(//ngb-modal-window//app-note-form//div[contains(@class,'entity-items-select')]//i)[2]`);

  // Footer
  protected btnSave = By.xpath(`//ngb-modal-window//app-note-form//button//*[contains(text(),'Save')]`);

  constructor(protected driverService: SeleniumWebDriverService) { }

  //#region Method input data to Note form
  public async inputOrganizationOnNoteForm(Organization: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbOrganization);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.cmbOrganization, Organization);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await selectDropdownOption(Organization, "", this.driverService);
      return true;
    } catch (error) {
      console.log("inputOrganizationNoteForm\n" + error);
      return false;
    }
  }

  public async inputTitleOnNoteForm(Title: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtTitle);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtTitle, Title);
      return true;
    } catch (error) {
      console.log("inputTitleNoteForm\n" + error);
      return false;
    }
  }

  public async inputDescriptionOnNoteForm(Description: string) {
    try {
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.waitUntilElementLoaded(this.iframeDescription);
      await this.driverService.switchToFrame(this.iframeDescription);
      await this.driverService.waitUntilElementLoaded(this.txtDescription);
      await this.driverService.setText(this.txtDescription, Description);
      await this.driverService.switchToDefaultContent();
      return true;
    } catch (error) {
      console.log("inputDescriptionOnNoteForm\n" + error);
      return false;
    }
  }

  public async inputSelectEntityTypeOnNoteForm(SelectEntityType: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbSelectEntityType);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.cmbSelectEntityType, SelectEntityType);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.pressEnterCurrentElement();
      // await selectDropdownOption(SelectEntityType, "", this.driverService);
      return true;
    } catch (error) {
      console.log("inputSelectEntityTypeOnNoteForm\n" + error);
      return false;
    }
  }

  public async inputSearchEntityOnNoteForm(SearchEntity: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbSearchEntity);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.cmbSearchEntity, SearchEntity);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await selectDropdownOption(SearchEntity, "", this.driverService);
      return true;
    } catch (error) {
      console.log("inputSearchEntityOnNoteForm\n" + error);
      return false;
    }
  }
  //#endregion

  //#region  Method to clear data into field on Note form
  public async clearDataOrganizationOnNoteForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbOrganization);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      if (await this.driverService.isExisted(this.btnClearOrganization)) {
        await this.driverService.click(this.btnClearOrganization);
      }
      return true;
    } catch (error) {
      console.log("clearDataOrganizationOnNoteForm\n" + error);
      return false;
    }
  }

  public async clearDataTitleOnNoteForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtTitle);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      if (await this.driverService.isExisted(this.btnClearTitle)) {
        await this.driverService.click(this.btnClearTitle);
      }
      return true;
    } catch (error) {
      console.log("clearDataTitleOnNoteForm\n" + error);
      return false;
    }
  }

  public async clearRelatedRecordsOnNoteForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbSearchEntity);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let count = 0;
      while (await this.driverService.isExisted(this.btnClearRelatedRecords) && count++ < 20) {
        await this.driverService.click(this.btnClearRelatedRecords);
      }
      return true;
    } catch (error) {
      console.log("clearRelatedRecordsOnNoteForm\n" + error);
      return false;
    }
  }
  //#endregion

  //#region Validation
  public async validateFields(valField: ValidateField): Promise<ValidateField> {
    let valFieldResult = new ValidateField(
      valField.nameField,
      valField.index,
      valField.status,
      valField.message,
      valField.toastMessage
    );
    try {
      await this.driverService.waitForSeconds(2000);

      let txtValidattionMessage = By.xpath(`(//div[contains(@class,'invalid-feedback')]/formly-validation-message)[1]`);
      if (await this.driverService.isExisted(txtValidattionMessage)) {
        valFieldResult.status = false;
        let countErrorField = 1;
        while (
          await this.driverService.isExisted(
            By.xpath(`(//div[contains(@class,'invalid-feedback')]/formly-validation-message)[${countErrorField}]`)
          )
        ) {
          let errorMessage: string = (
            await this.driverService.getText(txtValidattionMessage)
          ).toString();
          valFieldResult.message.push(errorMessage);
          countErrorField++;
        }
      }
      else {
        await this.driverService.waitForSeconds(2000);
      }
      return valFieldResult;
    } catch (error) {
      console.log("validateField");
      console.log(error);
      return valFieldResult;
    }
  }
  //#endregion

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

  public async checkNoteFormIsOpening(noteTitle: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtTitle);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      if (noteTitle) {
        const actualNoteTitle = await this.driverService.getAttributeValue(this.txtTitle, 'value');
        return actualNoteTitle.includes(noteTitle);
      }
      return true;
    } catch (error) {
      console.log("checkNoteFormIsOpening\n" + error);
      return false;
    }
  }
}