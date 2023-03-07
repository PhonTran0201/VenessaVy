import { By, Key, WebElement } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../selenium-webdriver.service";
import { DebugElement } from "./DebugElement";

abstract class FieldManager {
    protected driver: SeleniumWebDriverService;
    protected element: By;
    public webEle: WebElement | any;

    // constructor with driver and locator
    constructor(driver: SeleniumWebDriverService, eleLocator: By) {
        this.driver = driver;
        this.element = eleLocator;
    }
    async clearValue() { }
    // several element need to input value to
    async setValue(_value): Promise<void> { };
    // and sometime we need to get its value
    async getValue(): Promise<string> { return ""; };
    // or click on it

    async click() {
        await this.driver.click(this.element);
    }

    async dump() {
        this.webEle = await this.driver.waitUntilElementLoadedAndDisplayed(this.element);
        await DebugElement.getInstance().highlight(this.driver, this.element);
    }

    async findChildElements(): Promise<WebElement[]> {
        this.webEle = await this.driver.waitUntilElementLoadedAndDisplayed(this.element);
        return await this.webEle.findElements(By.xpath("./*"));
    }

    async findParentElement(): Promise<WebElement> {
        return await this.webEle.findElement(By.xpath("./.."));
    }

    async pressTab() {
        return await this.webEle.sendKeys(Key.TAB);
    }

    async pressEnter() {
        return await this.webEle.sendKeys(Key.ENTER);
    }

    async getInnerText(): Promise<string> {
        try {
            return await this.webEle.getAttribute("innerText");
        } catch (e) {
            return (e as Error).message;
        }
    }

    async getInnerHTML(): Promise<string> {
        try {
            return await this.webEle.getAttribute("innerHTML");
        } catch (e) {
            return (e as Error).message;
        }
    }

    async getText() {
        return await this.webEle.getText();
    }

    async isEnable(){
        const innerHTML = (await this.webEle?.getAttribute("innerHTML"));
        const isDisabled = (await innerHTML?.includes(`disabled=""`));
        if (await isDisabled) {
            return false;
        }
        else{
            return await this.webEle.isEnabled();
        }
    }
}
export { FieldManager };
