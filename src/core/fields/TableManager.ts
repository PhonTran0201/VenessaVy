import { By, WebElement } from "selenium-webdriver";
import { DebugElement } from "./DebugElement";
import { FieldManager } from "./FieldManager";
import { waitForElementTimeOut } from "../../shared/constants";
import { error } from "winston";
class TableManager extends FieldManager {
    private tblHeader;
    private tblBody;
    // constructor need webdriver & element locator By
    constructor(driver, element) {
        super(driver, element);
    }
    async setValue(value: any): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async getValue(): Promise<string> {
        this.webEle = await this.driver.waitUntilElementLoadedAndDisplayed(this.element);
        let displayed = await this.webEle?.isDisplayed();
        if (displayed) {
            return "Found";
        }
        return "";
    }

    // custom method here
    async getRowHeader(): Promise<WebElement> {
        try {
            this.webEle = await this.driver.waitUntilElementLoadedAndDisplayed(this.element);
            this.tblHeader = await this.webEle.findElement(By.css("thead"));
            return this.tblHeader;
        } catch (error) {
            throw error;
        }
    }

    async getRowCount(): Promise<number> {
        let rowCount = 0;
        try {
            this.webEle = await this.driver.waitUntilElementLoadedAndDisplayed(this.element);
            this.tblBody = await this.webEle.findElement(By.css("tbody"));
            rowCount = (await this.tblBody.findElements(By.css("tr"))).length;
        } catch (error) {
            console.log(error);
        }
        return rowCount;
    }

    async getColumnCount(): Promise<number> {
        let colCount = 0;
        try {
            this.webEle = await this.driver.waitUntilElementLoadedAndDisplayed(this.element);
            let tblBodyRow = await this.webEle.findElement(By.css("tbody > tr"));
            colCount = (await tblBodyRow.findElements(By.css("td"))).length;
        } catch {

        }
        return colCount;
    }

    // need to optimize because the table display without any data
    // after a time loading, data will display
    // so wait for data displayed
    async findRowElementByValue(value): Promise<WebElement> {
        await this.waitForRowsLoaded();
        this.webEle = await this.driver.waitUntilElementLoadedAndDisplayed(this.element);
        this.tblBody = await this.webEle.findElement(By.css("tbody"));
        try {
            let rows = await this.tblBody.findElements(By.css("tr"));
            for (let row of rows) {
                if ((await row.getAttribute("innerText")).toLowerCase().includes(value.toLowerCase())) {
                    return await row;
                }
            }
        } catch (error) {
            throw error;
        }
        return await this.webEle.findElement(By.xpath(`//*[contains(.,"${value}")]`));
        //throw new Error(`Cannot find row with value ${value}`);
    }

    async findCellByValue(value): Promise<WebElement> {
        try {
            let foundRow = await this.findRowElementByValue(value);
            let cols = await foundRow?.findElements(By.css("td"));
            for (let col of cols) {
                if ((await col.getAttribute("innerText")).includes(value)) {
                    return await col;
                }
            }
        } catch (error) {
            throw error;
        }
        throw new Error(`Cannot find cell with value ${value}`);
    }

    async getRowCheckboxEleByValue(value): Promise<WebElement> {
        try {
            let foundRow = await this.findRowElementByValue(value);
            const checkboxLocator = By.css(".input-check:first-child"); //.input-check + input
            let checkbox = await foundRow?.findElement(checkboxLocator);
            //await DebugElement.getInstance().dump(checkbox);
            return await foundRow?.findElement(checkboxLocator);
        } catch (error) {
            throw error;
        }
    }

    async setCheckboxStateByValue(value, state = true): Promise<void> {
        let checkbox = await this.getRowCheckboxEleByValue(value);
        const currentState = await checkbox.isSelected();
        if (currentState == state) {
            // skip
        } else {
            return await checkbox.click();
        }
    }

    async clickRowByValue(value): Promise<void> {
        try {
            let foundRow = await this.findRowElementByValue(value);
            let link = await foundRow.findElement(By.css("a"));
            return await link.click();
        } catch (error) {
            throw error;
        }
    }

    // support for Action column: Edit / Delete / Convert
    async clickRowActionEleByValue(value, action): Promise<void> {
        try {
            let foundRow = await this.findRowElementByValue(value);
            let actions = await foundRow?.findElements(By.css("button"));
            for (let act of actions) {
                if ((await act.getAttribute("id")).toLowerCase().includes(action.toLocaleLowerCase())) {
                    return await act.click();
                }
            }
        } catch (error) {
            throw error;
        }
    }

    async clickRowActionEleByIndex(value, index = 0): Promise<void> {
        try {
            let foundRow = await this.findRowElementByValue(value);
            let actions = await foundRow?.findElements(By.css("button"));
            let count = 0;
            for (let act of actions) {
                if (count == index) {
                    return await act.click();
                }
                count++;
            }
        } catch (error) {
            throw error;
        }
    }

    private async waitForRowsLoaded(): Promise<void> {
        await this.driver.getDriver().wait(
            async () => {
                const rowsCount = await this.getRowCount();
                return await rowsCount >= 1;
            }, waitForElementTimeOut
        );
    }

    public async selectAllCheckbox(): Promise<void> {
        try {
            await this.getRowHeader();
            const chk = await this.tblHeader.findElement(By.css(`.check`));
            await chk.click();
        } catch (error) {
            throw error;
        }
    }


    public async hasNodata(): Promise<boolean> {
        try {
            const locNoData = By.css(`.mt-3.text-note-color`);
            const eleNodata = await this.driver.waitUntilElementLoadedAndDisplayed(locNoData);
            const result = (await eleNodata.getAttribute("innerText")).toLowerCase()==`no data here`;
            return result;
        } catch (error) {
            throw error;
        }
        return false;
    }
}

export { TableManager };
