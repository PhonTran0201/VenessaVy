import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../core/selenium-webdriver.service";
import { GlobalPageObject } from "../../../back-office-portal/general/GlobalPageObject/GlobalPageObject";


export class GlobalPageObjectAGS extends GlobalPageObject {
    constructor(protected driverService: SeleniumWebDriverService) {
      super(driverService);
}

protected frameAgreementsBtnTab = By.xpath("//ul[@role='tablist']//li//a[./span[contains(text(),'Frame Agreements')]]");
protected applicationBtnTab = By.xpath("//ul[@role='tablist']//li//a[./span[contains(text(),'Applications')]]");
protected guaranteeBtnTab = By.xpath("//ul[@role='tablist']//li//a[./span[contains(text(),'Guarantees')]]");
}