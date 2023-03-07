import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../../../core/selenium-webdriver.service";
import { AccountTabDocumentForm } from "../../../../account/account-details/tabs/account-document/AccountTabDocumentForm";


export class SaleTabDocumentForm extends AccountTabDocumentForm {
  //Locator of elements at "Document" form
  protected txtName = By.xpath("//app-sale-document-form//*[@id='pgs-sale-doc-filename']");
  protected cmbTags = By.xpath("//app-sale-document-form//*[@id='pgs-sale-doc-tag']");
  protected txtDescription = By.xpath("//app-sale-document-form//*[@id='pgs-sale-doc-descriptipn']");
  protected inputFile = By.xpath("//app-sale-document-form//input[@type='file']");
  protected clearTagsbtn = By.xpath("//app-sale-document-form//*[@title='Clear all']");

  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }

}