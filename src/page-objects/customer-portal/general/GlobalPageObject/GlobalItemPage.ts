import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../shared/functions";
import { GlobalPageObject } from "../../../back-office-portal/general/GlobalPageObject/GlobalPageObject";


/**
 * GlobalItemPage: Item/Page and Total records
 */
export class GlobalItemPage extends GlobalPageObject{
    protected lblTotalNumberRecordMainTab= By.xpath("//div[contains(text(),'Records')]");
    constructor(protected driverService: SeleniumWebDriverService) {
        super(driverService);
    }

    

   
}