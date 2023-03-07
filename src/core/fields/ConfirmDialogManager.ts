import { By } from "selenium-webdriver";
import { FieldManager } from "./FieldManager";
import { FieldWait } from "./FieldWait";

class ConfirmDialogManager extends FieldManager {
    constructor(driver?, element?) {
        super(driver, element);
    }
    async setValue(value: any): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async getValue(): Promise<string> {
        throw new Error("Method not implemented.");
    }
    async click(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async confirm(text = "Yes") : Promise<void> {
        const locBtnConfirm = FieldWait.xpathForAttributeContainsText(`id`, text, `button`);
        const eleItem = await this.driver.waitUntilElementLoadedAndDisplayed(locBtnConfirm);
        await eleItem.click();
    }
}

export { ConfirmDialogManager };
