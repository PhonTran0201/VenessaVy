import { FieldManager } from "./fields/FieldManager";
import { TextFieldManager } from "./fields/TextFieldManager";
import { SeleniumWebDriverService } from "./selenium-webdriver.service";
import { UndefinedFieldManager } from "./fields/UndefinedFieldManager";
import { PasswordFieldManager } from "./fields/PasswordFieldManager";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../shared/functions";
import { ButtonFieldManager } from "./fields/ButtonFieldManager";
import { TableManager } from "./fields/TableManager";
import { MenuFieldManager } from "./fields/MenuFieldManager";
import { By, Locator, until, WebElement } from "selenium-webdriver";
import { DropdownPanelFieldManager } from "./fields/DropdownPanelFieldManager";
import { DropdownFieldManager } from "./fields/DropdownFieldManager";
import { DebugElement } from "./fields/DebugElement";
import { CalendarFieldManager } from "./fields/CalendarFieldManager";
import { ToggleFieldManager } from "./fields/ToggleFieldManager";
import { TabbedFieldManager } from "./fields/TabbedFieldManager";
import { CheckboxFieldManager } from "./fields/CheckboxFieldManager";
import { LabelFieldManager } from "./fields/LabelFieldManager";
import { defaultTimeOut, waitForElementTimeOut } from "../shared/constants";

// BasePage to use for common method in any web pages
export class BasePage {
    protected readonly UPPER_CASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ";
    protected readonly LOWER_CASE = "abcdefghijklmnopqrstuvwxyzæøåöüçğş";
    constructor(protected driverService: SeleniumWebDriverService) { }

    getDriverService(): SeleniumWebDriverService {
        return this.driverService;
    }

    // check field type by list array for conditions
    isCorrectType(arrChecks: string[]): boolean {
        let arr = arrChecks.map(ele => {
            let temp = ele.split("=", 2);
            if (temp[0].toLowerCase() === temp[1].toLowerCase())
                return true;
            return false;
        });
        return arr.every(element => element === true);
    }

    isContainsAttribute(arrChecks: string[]): boolean {
        let arr = arrChecks.map(ele => {
            let temp = ele.split("=", 2);
            if (temp[0].toLowerCase().includes(temp[1].toLowerCase()))
                return true;
            return false;
        });
        return arr.every(element => element === true);
    }

    // get field type of any web element : textbox, checkbox, radio button,...
    async getFieldType(locator: Locator): Promise<FieldManager> {
        await this.driverService.waitUntilElementVisible(locator);
        let element = await this.driverService.findElement(locator);
        await this.getDriverService().scrollElementToView(element);
        try {
            let cssClass = await element.getAttribute("class");
            let tagName = await element.getTagName();
            let required = await element.getAttribute("required");
            let placeHolder = await element.getAttribute("placeholder");
            let type = await element.getAttribute("type");
            let value = await element.getAttribute("value");
            let innerText = await element.getAttribute("innerText");
            let title = await element.getAttribute("title");
            await DebugElement.getInstance().highlight(this.driverService, (locator as By));
            // check for a textbox
            if (this. isCorrectType([`${tagName}=input`, `${type}=text`]) || this.isCorrectType([`${tagName}=textarea`]) || this.isCorrectType([`${tagName}=input`, `${type}=number`])) {
                return await new TextFieldManager(this.driverService, locator);
            }

            // check for a password
            if (this.isCorrectType([`${tagName}=input`, `${type}=password`])) {
                return await new PasswordFieldManager(this.driverService, locator);
            }

            // check for a menu
            if ((this.isCorrectType([`${tagName}=a`]) && this.isContainsAttribute([`${cssClass}=dropdown-toggle`]))
                || (this.isCorrectType([`${tagName}=a`, `${type}=button`]) && this.isContainsAttribute([`${cssClass}=sub-menu-item`]))) {
                return await new MenuFieldManager(this.driverService, locator);
            }

            // check for a table
            if (this.isCorrectType([`${tagName}=table`])) {
                return await new TableManager(this.driverService, locator);
            }

            // check for a tab panel
            if (this.isCorrectType([`${tagName}=a`]) && this.isContainsAttribute([`${cssClass}=nav-link`])) {
                return await new TabbedFieldManager(this.driverService, locator);
            }

            // check for a popup dropdown menu as panel
            if (this.isCorrectType([`${tagName}=div`]) && this.isContainsAttribute([`${cssClass}=dropdown-menu`])) {
                return await new DropdownPanelFieldManager(this.driverService, locator);
            }

            // check for a popup dropdown from input
            if (this.isCorrectType([`${tagName}=div`]) && (this.isContainsAttribute([`${cssClass}=ng-select-container`] ||
                this.isContainsAttribute([`${cssClass}=ng-value-container`])))
                || ((this.isCorrectType([`${tagName}=ng-select`])))
                || ((this.isCorrectType([`${tagName}=select`])))
            ) {
                return await new DropdownFieldManager(this.driverService, locator);
            }

            // check for a datetime picker/ calendar
            if ((this.isCorrectType([`${tagName}=div`]) && this.isContainsAttribute([`${cssClass}=input-calendar`]))
                || (this.isCorrectType([`${tagName}=input`]) && placeHolder.toLowerCase().includes("date"))
            ) {
                return await new CalendarFieldManager(this.driverService, locator);
            }

            // check for a toggle / switch
            if (this.isCorrectType([`${tagName}=button`]) && this.isContainsAttribute([`${cssClass}=switch`])) {
                return await new ToggleFieldManager(this.driverService, locator);
            }

            // check for a button
            if (this.isCorrectType([`${tagName}=button`, `${type}=submit`])
                || this.isCorrectType([`${tagName}=button`, `${type}=button`])) {
                return await new ButtonFieldManager(this.driverService, locator);
            }

            // check for a checkbox
            if (this.isCorrectType([`${tagName}=input`, `${type}=checkbox`]) ||
                (this.isCorrectType([`${tagName}=label`]) && this.isContainsAttribute([`${cssClass}=input-check`]))) {
                return await new CheckboxFieldManager(this.driverService, locator);
            }

            //check for a label
            if (this.isCorrectType([`${tagName}=span`]) || this.isCorrectType([`${tagName}=td`]) || this.isCorrectType([`${tagName}=div`]) || this.isCorrectType([`${tagName}=p`]) || title || this.isCorrectType([`${tagName}=small`])
                || this.isCorrectType([`${tagName}=a`]) || this.isCorrectType([`${tagName}=legend`]) || this.isCorrectType([`${tagName}=b`])  || this.isCorrectType([`${tagName}=i`])) {
                return await new LabelFieldManager(this.driverService, locator);
            }

            return await new UndefinedFieldManager(this.driverService, locator);

        } catch (error) {
            throw error;
        }
    }

    async waitPageProgressCompleted() {
        const progressBy = By.css(".ng-bar-placeholder .ng-bar");
        const progressEle = await this.driverService.findElement(progressBy);
        const expectedAttr = "transform: translate3d(0%, 0px, 0px); background-color: rgb(27, 149, 224); transition: none 0s ease 0s;";
        await this.waitForAttribute(progressEle, "style", expectedAttr);
    }

    async waitPageLoaded() {
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
    }

    async waitForAnyPopupDisplayed() {
        try {
            await this.driverService.waitUntilElementLoadedAndDisplayed(By.css(`.dropdown > .animated.dropdown-menu.fadeInUp.show.sub-menu`));
            //await this.driverService.waitUntilElementLoadedAndDisplayed(By.xpath(`//*[contains(@style,"position: absolute")]`));
            // await this.driverService.waitUntilElementLoadedAndDisplayed(By.xpath(`//ng-dropdown-panel`));
            // await this.driverService.waitUntilElementLoadedAndDisplayed(By.xpath(`//*[contains(@class,"dropdown-menu bg-white dropdown-menu-right")]`));
        } catch {

        }
    }

    async waitForModalPopupDisplayed() {
        try {
            await this.driverService.waitUntilElementLoadedAndDisplayed(By.xpath(`//div[@class='modal-content']`));
        }
        catch {

        }
    }

    async closeDialog() {
        try {
            const btnClose = await this.driverService.waitUntilElementLoadedAndDisplayed(By.xpath(`//div[@class="modal-content"]//button[@class="close"]`));
            await btnClose.click();
        } catch {
            console.log("Cannot close dialog.");
        }
    }

    async waitForAppear(locator: By) {
        try {
            //await this.driverService.waitUntilElementLoaded(locator);
            return await this.driverService.waitUntilElementLoadedAndDisplayed(locator);
        } catch (error) {
            return null;
        }
    }
    async waitForDisappear(locator: By): Promise<void> {
        await this.driverService.waitForElementInVisible(locator);
    }

    async waitToastMessageDisplay(message: string, retry: number = 3) {
        try {
            const locToast = By.xpath(`//div[@id='toast-container']/div[contains(@class,'toast')]/div[contains(text(),'${message}')]`);
            for (let i = 0; i < retry; i++) {
                const ele = await this.waitForAppear(locToast);
                if (ele) {
                    return true;
                }
            }
            return false;
        } catch (error) {
            throw error;
        }
    }

    // sometime element exists in dom, but it's not visible 
    // because attribute from css
    // so we need to wait attribute
    async waitForAttribute(webEle: WebElement, attribute: string, value: string): Promise<void> {
        await this.driverService.getDriver().wait(
            async () => {
                const att = await webEle.getAttribute(attribute);
                return await att === value;
            }, waitForElementTimeOut
        );
    }

    async findElementByAttribute(attributeName: string, attributeValue: string, tagName: string = '') {
        if (tagName === '') {
            return await this.driverService.findElement(By.xpath(`//*[@${attributeName}='${attributeValue}']`));
        }
        return await this.driverService.findElement(By.css(`${tagName}[${attributeName}:'${attributeValue}']`));
    }

    async smartFindElementByText(label): Promise<[WebElement, By] | null> {
        await this.waitPageLoaded();
        label = label.toLowerCase();
        const arrBy = [
            By.xpath(`//*[translate(text(),'${this.UPPER_CASE}','${this.LOWER_CASE}')="${label}"]`),
            By.xpath(`//*[contains(translate(text(),'${this.UPPER_CASE}','${this.LOWER_CASE}'), "${label}")]`),
            By.xpath(`//*[normalize-space()="${label}"]`),
            By.xpath(`//*[contains(@for, "${label}")]`),
        ];
        for (let locator of arrBy) {
            const isEleExist = await this.driverService.checkElementExist(locator);
            if (isEleExist) {
                const labelEles = await this.driverService.findElements(locator);
                for (let labelEle of labelEles) {
                    const lblfor = (await labelEle.getAttribute("for"));
                    try {
                        if (lblfor.length > 0) {
                            // find 
                            const foundLocator = By.xpath(`//*[@id="${lblfor}"]`);
                            await DebugElement.getInstance().highlight(this.driverService, foundLocator);
                            const webEle = await this.driverService.findElement(foundLocator);
                            return await [webEle, foundLocator];
                        } else {
                            // if this is not a label for input
                            // find sibling, parent until it is a input or ng-select or ..
                            const arrTagToStop = [
                                'ng-select',
                                'button',
                            ];
                        }
                    } catch (error) {
                        console.log((error as Error).message);
                    }
                }
                console.log("Exists to Found but not enough information");
                return [await this.driverService.findElement(locator), locator];
            }
        }
        console.log("Not Found");
        return null;
    }

    // input all required fields from data csv
    async populateFields(data: any) {

    }

    async input(locator: By, value: string, fieldNameToLog: string = "") {
        try {
            const ele = await this.getFieldType(locator);
            await ele.setValue(value);
            await this.waitPageProgressCompleted();
        } catch (error) {
            throw new Error(`Couldn't interactive with ${fieldNameToLog}. Detail: ${(error as Error).message}.`);
        }
    }

    async click(locator: By, btnNameToLog: string = "") {
        try {
            const ele = await this.getFieldType(locator);
            await this.waitPageProgressCompleted();
        } catch (error) {
            throw new Error(`Couldn't click with ${btnNameToLog}. Detail: ${(error as Error).message}.`);
        }
    }

    // refresh page
    async refresh() {
        await this.driverService.refreshPage();
        await this.waitPageLoaded();
        await this.waitPageProgressCompleted();
    }

    // use for debug
    async pause(waitInSeconds: number = 3600) {
        await this.driverService.getDriver().sleep(waitInSeconds * 1000);
    }
}
