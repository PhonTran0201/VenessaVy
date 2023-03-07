import { By } from "selenium-webdriver";
import { FieldManager } from "./FieldManager";

export class AlertMessage {
    locAlertMsg: By = By.css("div[role='alert']");
    private static instance: AlertMessage;

    private constructor() { }

    public static getInstance(): AlertMessage {
        if (!AlertMessage.instance) {
            AlertMessage.instance = new AlertMessage();
        }
        return AlertMessage.instance;
    }

    async getValue(driverService): Promise<string> {
        try {
            const webEle = await driverService.waitUntilElementLoadedAndDisplayed(this.locAlertMsg);
            return await webEle.getText();
        } catch {
            throw new Error("Cannot get value from alert message.");
        }
    }

    async isExistsMsg(driverService, message) {
        try {
            //const locMsg = By.xpath(`//div[@id='toast-container']/div[contains(@class,'toast-success')]/div[contains(text(),'${message}')]`);
            const locMsg = By.xpath(`//div[@id='toast-container']/div[contains(@class,'toast')]/div[contains(text(),'${message}')]`);
            await driverService.waitUntilElementVisible(locMsg);
            await (await driverService.findElement(locMsg)).click();
            return true;
        } catch (error) {
            throw error;
        }
    }
}
