import { BasePage } from "./BasePage";
import { SeleniumWebDriverService } from "./selenium-webdriver.service";

export class TabDetailPage extends BasePage {
    protected strRootXpath = "//div[contains(@class,'tab-pane') and contains(@class,'active')]";
    constructor(driverService: SeleniumWebDriverService, tabName: string) {
        super(driverService);
    }

    ////i[@id='pgs-acc-tab-Quotes']
}