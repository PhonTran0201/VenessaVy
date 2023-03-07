import { By } from "selenium-webdriver";
import { FieldManager } from "./FieldManager";

class LabelFieldManager extends FieldManager {
    constructor(driver?, element?) {
        super(driver, element);
    }
    async setValue(value: any): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async getValue(): Promise<string> {
        try {
            this.webEle = await this.driver.waitUntilElementLoadedAndDisplayed(this.element);
            return await this.webEle.getText();
        } catch {
            throw new Error("Method not implemented.");
        }
    }
    async click(): Promise<void> {
        await super.click();
    }
    async getText(): Promise<any> {
        await super.getText();
    }

}

export { LabelFieldManager };
