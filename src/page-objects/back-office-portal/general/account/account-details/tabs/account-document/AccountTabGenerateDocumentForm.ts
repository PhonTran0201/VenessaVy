import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../../../core/selenium-webdriver.service";
import { ValidateField } from "../../../../../../../shared/classes";
import { waitUntilHorizontalProgressBarLoaded_v2, logInfoMessage, selectDropdownOption_v2, selectDropdownOption } from "../../../../../../../shared/functions";

const remote = require("selenium-webdriver/remote");

export class AccountTabGenerateDocumentForm {
  //Locator of elements at "Document" form
  private cmbDocumentTemplate = By.xpath("//app-customer-generate-template//input[@id='pgs-document-template']");
  private cmbEntityType = By.xpath("//app-customer-generate-template//div[./*[text()='Select entity type']]//input");
  private cmbSearchEntity = By.xpath("//app-customer-generate-template//div[./*[text()='Search Entity']]//input");


  constructor(private driverService: SeleniumWebDriverService) { }

  //#region Input data into Generate documents
  public async inputDocumentTemplateOnGenerateDocumentForm(DocumentTemplate: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbDocumentTemplate);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.cmbDocumentTemplate, DocumentTemplate);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await selectDropdownOption(DocumentTemplate, "", this.driverService);
      return true;
    } catch (error) {
      console.log("inputDocumentTemplateOnGenerateDocumentForm");
      console.log(error);
      return false;
    }
  }

  public async inputEntityTypeOnGenerateDocumentForm(EntityType: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbEntityType);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.cmbEntityType, EntityType);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await selectDropdownOption_v2(EntityType, "", this.driverService);
      return true;
    } catch (error) {
      console.log("inputEntityTypeOnGenerateDocumentForm");
      console.log(error);
      return false;
    }
  }

  public async inputSearchEntityOnGenerateDocumentForm(SearchEntity: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbSearchEntity);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.cmbSearchEntity, SearchEntity);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await selectDropdownOption(SearchEntity, "", this.driverService);
      return true;
    } catch (error) {
      console.log("inputSearchEntityOnGenerateDocumentForm");
      console.log(error);
      return false;
    }
  }

}