import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../core/selenium-webdriver.service";
import { GlobalPageObject } from "../../../back-office-portal/general/GlobalPageObject/GlobalPageObject";


/**
 * Form
 */
export class GlobalFormCP extends GlobalPageObject {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }

  //#region Xpaths
  protected btnSaveForm = By.xpath(`//*[contains(local-name(),'form')]//button[.//*[contains(@class,'fa-save')]]`);
  //#endregion
}