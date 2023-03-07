import { Before, Given, Then, When } from "@cucumber/cucumber";
import { By } from "selenium-webdriver";
import { BasePage } from "../../core/BasePage";
import { GlobalVar } from "../../core/global-var";
import { SeleniumWebDriverService } from "../../core/selenium-webdriver.service";
import { PageFactory } from "../../page-objects/PageFactory";
import { expandNumberItemOfList } from "../../shared/functions";


When("User selects {string} items per page", async function (itemCount) {
    const driverService = SeleniumWebDriverService.getInstance();
    const anyPage = new BasePage(driverService);
    await anyPage.waitPageLoaded();
    await anyPage.waitPageProgressCompleted();
    const locPager = By.xpath("//button[@id='pgs-expand-rows-btn']");
    await driverService.waitUntilElementLoadedAndDisplayed(locPager);
    await expandNumberItemOfList(driverService, locPager, parseInt(itemCount));
    await anyPage.waitPageProgressCompleted();
    let data = '';
    GlobalVar.getInstance().addValue(`30accounts`, data);
});

