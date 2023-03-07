import { By } from "selenium-webdriver";
import { BasePage } from "../../../../core/BasePage";
import { DebugElement } from "../../../../core/fields/DebugElement";
import { FieldWait } from "../../../../core/fields/FieldWait";

export class GlobalMenu extends BasePage {

    async goHome() {
        //await this.clickMainMenu("Dashboard");
        //await this.waitPageLoaded();
        await this.waitPageProgressCompleted();
    }
    async clickMainMenu(label) {
        const locMenu = By.xpath(`//div[@class="collapse navbar-collapse"]//a[@id="navbar-NAVIGATION_${label.toUpperCase()}"]`);
        const menuMain = await this.getFieldType(locMenu);
        await menuMain.click();
        await this.waitForAnyPopupDisplayed();
    }
    async clickSubMenu(label) {
        const menuLocator = FieldWait.xpathParentChildContainsExactlyAttribute(`class`, `show`, `id`, `navbar-sub-NAVIGATION_${label.toUpperCase()}`, `div`);
        const webEle = await this.driverService.waitUntilElementLoadedAndDisplayed(menuLocator);
        await webEle.click();
        await this.waitPageProgressCompleted();
    }
}