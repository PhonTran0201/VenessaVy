import { By, WebElement } from "selenium-webdriver";
import { FieldError } from "./FieldError";
import { FieldManager } from "./FieldManager";

class ToggleFieldManager extends FieldManager {
    // constructor need webdriver & element locator By
    constructor(driver, element) {
        super(driver, element);
    }
    async setValue(value: any): Promise<void> {
        try {
            this.webEle = await this.driver.waitUntilElementLoadedAndDisplayed(this.element);
            let displayed = await this.webEle?.isDisplayed();
            const currentState = await this.getValue();
            if (displayed) {
                if (currentState === value) {

                } else {
                    await super.click();
                }
                //await this.driver.setText(this.element, value);
            }
        } catch {
            let error = new FieldError(this.element, value);
            console.log(error.getDetail());
        }
    }
    async getValue(): Promise<string> {
        try {
            this.webEle = await this.driver.waitUntilElementLoadedAndDisplayed(this.element);
            return await this.webEle.getAttribute("aria-checked");
        } catch {
            throw new Error("Error ???");
        }
    }
}

export { ToggleFieldManager };
