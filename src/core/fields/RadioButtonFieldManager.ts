import { FieldError } from "./FieldError";
import { FieldManager } from "./FieldManager";

class RadioButtonFieldManager extends FieldManager {
    // constructor need webdriver & element locator By
    constructor(driver, element) {
        super(driver, element);
    }
    async setValue(value: any): Promise<void> {
        try {
            //this.webEle = await this.driver.findElement(this.element);
            this.webEle = await this.driver.waitUntilElementLoadedAndDisplayed(this.element);
            let displayed = await this.webEle?.isDisplayed();
            if (displayed) {
                await this.driver.setText(this.element, value);
            }
        } catch {
            let error = new FieldError(this.element, value);
            console.log(error.getDetail());
        }
    }
    async getValue(): Promise<string> {
        try {
            this.webEle = await this.driver.waitUntilElementLoadedAndDisplayed(this.element);
            return await this.webEle.getAttribute("value");
        } catch {
            throw new Error("Error ???");
        }
        return "";
    }
}

export { RadioButtonFieldManager };
