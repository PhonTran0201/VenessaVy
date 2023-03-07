import { By } from "selenium-webdriver";
import { DriverService } from "selenium-webdriver/remote";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../shared/functions";
import { DebugElement } from "./DebugElement";
import { FieldManager } from "./FieldManager";
import { FieldWait } from "./FieldWait";

// this used for combobox, dropdown listbox
class DropdownFieldManager extends FieldManager {
    // constructor need webdriver & element locator By
    constructor(driver, element) {
        super(driver, element);
    }
    // several element need to input value to
    async setValue(_value): Promise<void> {
        await super.click();
        const webEle = await this.driver.findElement(this.element);
        //await DebugElement.getInstance().dump(webEle);
        if (webEle === undefined) {
            throw new Error(`Cannot find element ${this.element}`);
        }
        const tagName = (await webEle.getTagName());
        if (tagName.toLowerCase() != `select`) {

            try {
                const innerHTML = (await this.webEle?.getAttribute("innerHTML"));
                const isDisabled = (await innerHTML?.includes(`disabled=""`));
                if (await isDisabled) {
                    console.log("Dropdown has disabled.");
                    return;
                }
            } catch (e) {
                throw e;
            }
            try {
                //const panelList = By.css("div.ng-dropdown-panel-items");
                //const ngPanel = await this.driver.findElement(panelList);
                // we need wait for element item to displayed before clicked
                //const eleItem = await this.driver.waitUntilElementLoadedAndDisplayed(FieldWait.xpathForContainsExactlyText(`//div[contains(@class,'ng-option')]`, _value));
                const eleItem = await this.driver.waitUntilElementLoadedAndDisplayed(FieldWait.xpathForContainsText(`//div[contains(@class,'ng-option')]`, _value));
                await eleItem.click();
                await this.driver.waitForElementInVisible(By.xpath(`//div[contains(@class,'ng-option')]`));
                return;
            } catch (error) {
                throw new Error(`Cannot find the value in the dropdown panel. ${(error as Error).stack}`);
            }
        } else {

            // another try with dropdown type SELECT tag
            try {
                const childWebEles = await this.findChildElements();
                for (let item of childWebEles) {
                    const text = (await item.getAttribute("innerText")).trim().toLowerCase();
                    const isDisplay = (await item.isDisplayed());
                    if (_value.toLowerCase() === text && isDisplay) {
                        await item.click();
                        return;
                    }
                }
            } catch (error) {
                console.warn(`<<<< ${error}`);
                throw error;
            }
        }
    };

    // and sometime we need to get its value
    async getValue(): Promise<string> {
        try {
            this.webEle = await this.driver.waitUntilElementLoadedAndDisplayed(this.element);
            const valueEle = await this.webEle.findElement(By.css(`span.ng-value-label`));
            return (await valueEle.getAttribute("innerText"));
        } catch (error) {
            return "";
        }
    };

    // click item from popup
    async clickItem(listLocator: By, _value: string): Promise<boolean> {
        let items = await this.driver.findElements(listLocator);
        if (items.length < 1) {
            return false;
        }
        for (let item of items) {
            const text = (await item.getAttribute("innerText")).trim();
            const isDisplay = (await item.isDisplayed());
            if (_value === text && isDisplay) {
                await item.click();
                return true;
            }
        }
        return false;
    }
}

export { DropdownFieldManager };
