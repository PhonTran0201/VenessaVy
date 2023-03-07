import { compareDesc } from "date-fns";
import { By } from "selenium-webdriver";
import { BasePage } from "../../../../core/BasePage";
import { convertDateToStringDateTime, convertStringDateTimeToDate, logInfoMessage, logWarningMessage, waitUntilHorizontalProgressBarLoaded } from "../../../../shared/functions";

export class GlobalDateTimeContainer extends BasePage {
    protected owlDateTimeContainer = By.xpath("//owl-date-time-container");

    //#region owl-dt-calendar-control => Header

    // Previous for both month, year,...
    protected btnPrevious = By.xpath("//owl-date-time-container//button[contains(@aria-label,'Previous')]");
    protected btnNext = By.xpath("//owl-date-time-container//button[contains(@aria-label,'Next')]");
    //#endregion

    //#region owl-date-time-month-view => Date view
    protected btnFirstDate = By.xpath("//owl-date-time-calendar//owl-date-time-month-view//tbody//tr[1]/td[1]");
    protected btnLastDate = By.xpath("//owl-date-time-calendar//owl-date-time-month-view//tbody//tr[last()]/td[last()]");
    //#endregion


    //#region owl-date-time-timer
    protected txtHours = By.xpath("(//owl-date-time-container//owl-date-time-timer//owl-date-time-timer-box//input)[1]");
    protected txtMinutes = By.xpath("(//owl-date-time-container//owl-date-time-timer//owl-date-time-timer-box//input)[2]");
    //#endregion

    //#region Time Footer
    protected btnCancel = By.xpath(`//owl-date-time-container//button[./*[contains(text(),'Cancel')]]`);
    protected btnSet = By.xpath(`//owl-date-time-container//button[./*[contains(text(),'Set')]]`);
    //#endregion




    //#region Method owl-dt-calendar-control => Header

    // Previous for both month, year,...
    public async pressPreviousButton() {
        try {
            const element = await this.getFieldType(this.btnPrevious);
            await element.click();
            return true;
        } catch (error) {
            console.log('pressPreviousButton');
            console.log(error);
            return false;
        }
    }

    public async pressNextButton() {
        try {
            const element = await this.getFieldType(this.btnNext);
            await element.click();
            return true;
        } catch (error) {
            console.log('pressNextButton');
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region Method footer
    public async pressCancelButton() {
        try {
            const element = await this.getFieldType(this.btnCancel);
            await this.driverService.waitForSeconds(500);
            await element.click();
            return true;
        } catch (error) {
            console.log('pressCancelButton');
            console.log(error);
            return false;
        }
    }
    public async pressSetButton() {
        try {
            const element = await this.getFieldType(this.btnSet);
            await this.driverService.waitForSeconds(500);
            await element.click();
            return true;
        } catch (error) {
            console.log('pressSetButton');
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region Input Date time
    /**
     * 
     * @param dateTime dd/MM/yyyy HH:mm or dd/MM/yyyy
     * @returns 
     */
    public async inputDateTime(dateTime: string) {
        try {
            const dateTimeTemp = dateTime.length === 10 ? `${dateTime} 00:00` : dateTime;
            const formatTemp = "dd/MM/yyyy HH:mm";
            await this.driverService.waitUntilElementVisible(this.btnFirstDate);
            const date = convertStringDateTimeToDate(dateTimeTemp, "dd/MM/yyyy HH:mm");
            for (let i = 1; i < 20000; i++) {// 2030 * 365 / 42 = 17,642 ~ 20,000
                const strFirstDate = await this.driverService.getAttributeValue(this.btnFirstDate, 'aria-label');// Format "Month d,yyyy"
                const strLastDate = await this.driverService.getAttributeValue(this.btnLastDate, 'aria-label');
                const firstDate = convertStringDateTimeToDate(strFirstDate + " 00:00", "Month d, yyyy HH:mm");
                const lastDate = convertStringDateTimeToDate(strLastDate + " 00:00", "Month d, yyyy HH:mm");
                if (compareDesc(firstDate, date) >= 0 && compareDesc(date, lastDate) >= 0) {
                    const stringDate = convertDateToStringDateTime(date, "Month d, yyyy HH:mm");

                    const item = By.xpath(`//owl-date-time-container//owl-date-time-month-view//tbody//td[@aria-label='${stringDate.substring(0, stringDate.lastIndexOf(" "))}' and not(@aria-disabled)]`);
                    await this.driverService.waitUntilElementVisible(item);
                    await this.driverService.waitForSeconds(1000);
                    await this.driverService.click(item);
                    let HH = dateTimeTemp.substring(formatTemp.indexOf("HH"), formatTemp.indexOf("HH") + 2);
                    let mm = dateTimeTemp.substring(formatTemp.indexOf("mm"), formatTemp.indexOf("mm") + 2);
                    if(await this.driverService.isExisted(this.txtHours)){
                        await this.driverService.setText(this.txtHours, HH);
                        await this.driverService.setText(this.txtMinutes, mm);
                    }                    
                    return true;
                }
                else if (compareDesc(date, firstDate) === 1) {
                    await this.pressPreviousButton();
                    continue;
                }
                else if (compareDesc(lastDate, date) === 1) {
                    await this.pressNextButton();
                    continue;
                }
            }
            logWarningMessage(`Input "${dateTime}" failed!`);
            return false;
        } catch (error) {
            console.log("inputDateTime");
            console.log(error);
            return false;
        }
    }
    //#endregion

    public async waitUntilDateTimeContainerInvisible() {
        try {
            await this.driverService.waitUntilElementIsNotVisible(this.owlDateTimeContainer);
            return true;
        } catch (error) {
            console.log('waitUntilDateTimeContainerInvisible');
            console.log(error);
            return false;
        }
    }
}