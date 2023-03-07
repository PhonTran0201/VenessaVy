import { bg } from "date-fns/locale";
import { By } from "selenium-webdriver";
import { DebugElement } from "./DebugElement";
import { FieldError } from "./FieldError";
import { FieldManager } from "./FieldManager";

class CheckboxFieldManager extends FieldManager {
    // constructor need webdriver & element locator By
    constructor(driver, element) {
        super(driver, element);
    }
    async setValue(value: any): Promise<void> {
        try {
            this.webEle = await this.driver.findElement(this.element);
            //this.webEle = await this.driver.waitUntilElementLoadedAndDisplayed(this.element);
            let displayed = await this.webEle?.isDisplayed();
            const currentState = await this.getValue();
            if (displayed) {
                //await this.driver.setText(this.element, value);
                if (currentState === value) {

                } else {
                    await super.click();
                }
            }
        } catch {
            let error = new FieldError(this.element, value);
            console.log(error.getDetail());
        }
    }
    async getValue(): Promise<string> {
        try {
            this.webEle = await this.driver.waitUntilElementLoadedAndDisplayed(this.element);
            let isCheck = await this.webEle.getAttribute("checked");
            if (isCheck == null) {
                const input = await this.webEle.findElement(By.css(`span`));
                const bgColor = await input.getCssValue("background-color");
                //isCheck = await input.getAttribute("checked"); 
                (bgColor == 'rgba(0, 0, 0, 0)')? isCheck = "false" : isCheck = "true";
            }
            return isCheck;
        } catch {
            throw new Error("Error ???");
        }
    }
}

export { CheckboxFieldManager };
