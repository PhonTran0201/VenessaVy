import { strictEqual, notStrictEqual } from "assert";
import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2, waitUntilHorizontalProgressBarLoaded, reloadTable, logWarningMessage } from "../../../../../../../shared/functions";
import { AccountTabDocumentList } from "../../../../account/account-details/tabs/account-document/AccountTabDocumentList";

export class SaleTabDocumentList extends AccountTabDocumentList{
  //#region Attribure
  //#region Top on table
  protected txtsearchDocument = By.xpath("//app-sale-documents//*[contains(@class,'input-search')]//input");
  //#endregion

  //#region Locator of elements at the first row of Document list
  protected lblName = By.xpath("//app-sale-documents//tbody/tr[1]//app-download-link-col/a");
  protected lblDescription = By.xpath("//app-sale-documents//table/tbody/tr/td[4]/span");
  protected lblTags = By.xpath("//app-sale-documents//table/tbody/tr/td[5]//span");
  protected lblCreatedDate = By.xpath("//app-sale-documents//table/tbody/tr/td[7]/span");
  //#endregion
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
   }
}