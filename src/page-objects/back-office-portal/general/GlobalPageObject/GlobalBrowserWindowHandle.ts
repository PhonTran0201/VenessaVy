import { SeleniumWebDriverService } from "../../../../core/selenium-webdriver.service";


/**
 * Url, Back button, forward button, new tab,...
 * Scope to access is all browser, that we don't need to implements from any interface
 */
export class GlobalBrowserWindowHandle {
    constructor(protected driverService: SeleniumWebDriverService) { }

    public async getCurrentUrl() {
        try {
            return await this.driverService.getCurrentUrl();
        } catch (error) {
            console.log(error);
            return "";
        }
    }

    public async refreshPage() {
        try {
            await this.driverService.refreshPage();
        } catch (error) {
            console.log(error);
        }
    }

    public async backPage() {
        try {
            await this.driverService.back();
        } catch (error) {
            console.log(error);
        }
    }

    public async forwardPage() {
        try {
            await this.driverService.forward();
        } catch (error) {
            console.log(error);
        }
    }

    public async openNewTabBrowser() {
        try {
            await this.driverService.openNewTabBrowser();
        } catch (error) {
            console.log(error);
        }
    }

    public async switchToPreviousTabBrowser() {
        try {
            await this.driverService.switchToPreviousTabBrowser();
        } catch (error) {
            console.log(error);
        }
    }

    public async switchToSecondTabBrowser() {
        try {
            await this.driverService.switchToSecondTabBrowser();
        } catch (error) {
            console.log(error);
        }
    }

    public async getAllWindowHandles() {
        try {
            return await this.driverService.getAllWindowHandles();

        } catch (error) {
            console.log(error);
            return [];
        }
    }

    public async getWindowHandle() {
        try {
            return await this.driverService.getWindowHandle();

        } catch (error) {
            console.log(error);
            return "";
        }
    }

    public async switchToWindow(windowHandle: string) {
        try {
            await this.driverService.switchToWindow(windowHandle);
        } catch (error) {
            console.log(error);
        }
    }

    public async closeCurrentWindow() {
        try {
            await this.driverService.closeCurrentWindow();
        } catch (error) {
            console.log(error);
        }
    }

    // Using for BOP (DevTool -> Application -> localeStorage)
    public async getAccessToken() {
        try {
            const token = (await this.driverService.getAccessToken()).toString();
            return token;
        } catch (error) {
            console.log(`getAccessToken`);
            console.log(error);
            return "";
        }
    }

    public async clearLocalStorage() {
        try {
            await this.driverService.clearLocalStorage();
            return true;
        } catch (error) {
            // console.log(error);
            return false;
        }
    }

    public async deleteAllCookies(){
        try {
            await this.driverService.getDriver().manage().deleteAllCookies();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}