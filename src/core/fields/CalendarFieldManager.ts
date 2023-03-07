import { By } from "selenium-webdriver";
import { FieldManager } from "./FieldManager";

class CalendarFieldManager extends FieldManager {
    // protected calendarControl = By.xpath("//owl-date-time-container");
    // protected yearControl = By.css("button.owl-dt-control-period-button");
    // protected monthControl = By.xpath("//owl-date-time-container");
    // protected dayControl = By.xpath("//owl-date-time-container");
    // protected nextControl = By.xpath("//owl-date-time-container");
    // protected previousControl = By.xpath("//owl-date-time-container");
    // protected today = new Date();
    // // constructor need webdriver & element locator By
    constructor(driver, element) {
        super(driver, element);
    }
    async setValue(value: any): Promise<void> {
        this.webEle = await this.driver.waitUntilElementLoadedAndDisplayed(this.element);
        this.webEle.clear();
        this.webEle.setText(value);
    }
    async getValue(): Promise<string> {
        try {
            this.webEle = await this.driver.waitUntilElementLoadedAndDisplayed(this.element);
            return await this.webEle.getAttribute("value");
        } catch (error){
            throw error;
        }
    }

    // async selectValue(year, month, day): Promise<void> {
    //     try {
    //         await super.click();
    //         const curYear = this.today.getFullYear();
    //         const curMonth = this.today.getMonth();
    //         const curDay = this.today.getDay();
    //         this.webEle = await this.driver.waitUntilElementLoadedAndDisplayed(this.calendarControl);
    //         let yearCtrl = await this.webEle.findElement(this.yearControl);

    //     } catch (error) {
    //         throw error;
    //     }
    // }
}

export { CalendarFieldManager };
