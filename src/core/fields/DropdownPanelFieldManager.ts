import { By } from "selenium-webdriver";
import { FieldManager } from "./FieldManager";

// this class used for popup dropdownlist displayed when click on button, link, menu, ...
class DropdownPanelFieldManager extends FieldManager {
    // constructor need webdriver & element locator By
    constructor(driver, element) {
        super(driver, element);
    }
    // several element need to input value to
    async setValue(_value): Promise<void> { };
    // and sometime we need to get its value
    async getValue(): Promise<string> { return ""; };

    // click choose item in dropdown
    async clickItemByValue(_value): Promise<void> { }

    // click choose item in dropdown by text
    async clickItemByText(_value): Promise<void> { 
        const childWebEles = await this.findChildElements();
        await childWebEles.forEach(async webEle => {
            const text = (await webEle.getAttribute("innerText"));
            if (_value === text) {
                return await webEle.click();
            }
        });
    }
}

export { DropdownPanelFieldManager };
