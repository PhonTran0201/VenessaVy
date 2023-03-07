import { Before, Given } from "@cucumber/cucumber";
import { SeleniumWebDriverService } from "../../../../core/selenium-webdriver.service";
import { GlobalBrowserWindowHandle } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalBrowserWindowHandle";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { GlobalPeripherals } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPeripherals";
import { Login } from "../../../../page-objects/back-office-portal/general/login-logout/Login";
import { ICommonContext } from "../../../../shared/interfaces";


let globalBrowserWindowHandle: GlobalBrowserWindowHandle;
let globalPeripherals: GlobalPeripherals;
let globalPageObject: GlobalPageObject;


Before(async function () {
    const context: ICommonContext = this.context;
    globalBrowserWindowHandle = new GlobalBrowserWindowHandle(context.driverService);
    globalPeripherals = new GlobalPeripherals(context.driverService);
    globalPageObject = new GlobalPageObject(context.driverService);
});


/**
 * It means that press hot key "Ctrl + t" to open new tab on the same browser
 */
Given("User opens a new tab on browser", async function () {
    await globalPeripherals.pressTabCurrentElement();
    await globalBrowserWindowHandle.openNewTabBrowser();
});

/**
 * It means that press hot key "Ctrl + Shift + Tab" to switch previos tab
 * We just allow open maximun 2 tab in the same time
 */
Given(`User switches to previous tab on browser`, async function () {
    await globalBrowserWindowHandle.switchToPreviousTabBrowser();
});

/**
 * It means that press hot key "Ctrl + Tab + 2" to switch second tab
 * We just allow open maximun 2 tab in the same time
 */
Given(`User switches to second tab on browser`, async function () {
    await globalBrowserWindowHandle.switchToSecondTabBrowser();
});

Given(`User clears browser cache`, async function () {
    await globalBrowserWindowHandle.switchToPreviousTabBrowser();
    await globalBrowserWindowHandle.deleteAllCookies();
});

// Close all the other tab but keep first tab
Given(`User keeps the first tab and closes all the other tabs on browser`, async function () {
    await globalBrowserWindowHandle.switchToPreviousTabBrowser();
    let arrays = await globalBrowserWindowHandle.getAllWindowHandles();
    for (let i = 1; i < arrays.length; i++) {
        await globalBrowserWindowHandle.switchToWindow(arrays[i]);
        await globalBrowserWindowHandle.clearLocalStorage();
        await globalPageObject.waitForProgressBarLoaded_v2();
        await globalBrowserWindowHandle.closeCurrentWindow();
        await globalBrowserWindowHandle.switchToPreviousTabBrowser();
    }
});

Given(`User clears local storage of browser`, async () => {
    const globalPageObject = new GlobalPageObject(SeleniumWebDriverService.getInstance());
    await globalBrowserWindowHandle.clearLocalStorage();
    await globalPageObject.waitForSeconds(1000);
});