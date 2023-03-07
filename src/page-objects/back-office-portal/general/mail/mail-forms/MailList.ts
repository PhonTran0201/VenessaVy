import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";

export class MailList {

    constructor(protected driverService: SeleniumWebDriverService) { }

    //#region Email List
    //#region Expand/Collapse email detail
    public async pressExpandEmailByRow(posittionRow = 1) {
        try {
            const email = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//c-details-tab-layout//app-mail-detail-outlook//div[contains(@class,'card ')][${posittionRow}]/div[1]`);
            await this.driverService.waitUntilElementLoaded(email);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.click(email);
            return true;
        } catch (error) {
            console.log('pressExpandEmailByRow');
            console.log(error);
            return false;
        }
    }
    //#endregion
    //#region Header Email
    public async validateSubjectHeaderOnEmailList(ExpectedValue: string, posittionRow = 1) {
        try {
            const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//c-details-tab-layout//app-mail-detail-outlook//div[contains(@class,'card ')][${posittionRow}]//div[./span[text()='Subject:']]/span[2]`);
            await this.driverService.waitUntilElementLoaded(lblActualValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(lblActualValue);
            return await this.driverService.validateRecord("Validate Subject email",
                [actualValue, ExpectedValue, "Incorrect subject!"]);
        } catch (error) {
            console.log('validateSubjectHeaderOnEmailList');
            console.log(error);
            return false;
        }
    }

    public async validateSendDateHeaderEmailOnEmailList(ExpectedValue: string, posittionRow = 1) {
        try {
            const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//c-details-tab-layout//app-mail-detail-outlook//div[contains(@class,'card ')][${posittionRow}]//span[@title='Date to send']`);
            await this.driverService.waitUntilElementLoaded(lblActualValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(lblActualValue);
            //Maximize delay time is 3 minutes.
            if (actualValue.localeCompare(ExpectedValue) !== 0) {
                if (Number(actualValue.substring(14, 16)) - Number(ExpectedValue.substring(14, 16)) < 3) {
                    ExpectedValue = actualValue;
                }
            }
            return await this.driverService.validateRecord("Validate Send date header",
                [actualValue, ExpectedValue, "Incorrect Send date header!"]);
        } catch (error) {
            console.log('validateSendDateHeaderEmailOnEmailList');
            console.log(error);
            return false;
        }
    }

    public async validateEmailFromHeaderOnEmailList(ExpectedValue: string, posittionRow = 1) {
        try {
            const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//c-details-tab-layout//app-mail-detail-outlook//div[contains(@class,'card ')][${posittionRow}]//div[./span[text()='From:']]/span[2]`);
            await this.driverService.waitUntilElementLoaded(lblActualValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(lblActualValue);
            return await this.driverService.validateRecord("Validate Email from",
                [actualValue, ExpectedValue, "Incorrect Email from!"]);
        } catch (error) {
            console.log('validateEmailFromHeaderOnEmailList');
            console.log(error);
            return false;
        }
    }
    public async validateEmailToHeaderOnEmailList(ExpectedValue: string, posittionRow = 1) {
        try {
            const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//c-details-tab-layout//app-mail-detail-outlook//div[contains(@class,'card ')][${posittionRow}]//div[./span[text()='To:']]/span[2]`);
            await this.driverService.waitUntilElementLoaded(lblActualValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(lblActualValue);
            return await this.driverService.validateRecord("Validate Email to",
                [actualValue, ExpectedValue, "Incorrect Email to!"]);
        } catch (error) {
            console.log('validateEmailToHeaderOnEmailList');
            console.log(error);
            return false;
        }
    }
    public async validateBodyHeaderOnEmailList(ExpectedValue: string, posittionRow = 1) {
        try {
            const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//c-details-tab-layout//app-mail-detail-outlook//div[contains(@class,'card ')][${posittionRow}]//div[contains(@class,'col-4')]`);
            await this.driverService.waitUntilElementLoaded(lblActualValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(lblActualValue);
            return await this.driverService.validateRecord("Validate Body header",
                [actualValue, ExpectedValue, "Incorrect Body header!"]);
        } catch (error) {
            console.log('validateBodyHeaderOnEmailList');
            console.log(error);
            return false;
        }
    }
    //#endregion
    //#region Detail
    public async validateDocumentDetailOnEmailList(ExpectedValue: string, posittionRow = 1) {
        try {
            const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//c-details-tab-layout//app-mail-detail-outlook//div[contains(@class,'card ')][${posittionRow}]//a[contains(@download,'${ExpectedValue}')]`);
            await this.driverService.waitUntilElementLoaded(lblActualValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getAttributeValue(lblActualValue, 'download');
            if (actualValue.includes(ExpectedValue)) {
                ExpectedValue = actualValue;
            }
            return await this.driverService.validateRecord("Validate document detail",
                [actualValue, ExpectedValue, "Incorrect document detail!"]);
        } catch (error) {
            console.log('validateDocumentDetailOnEmailList');
            console.log(error);
            return false;
        }
    }

    public async pressDownloadDocumentDetailOnEmailList(ExpectedValue: string, posittionRow = 1) {
        try {
            const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//c-details-tab-layout//app-mail-detail-outlook//div[contains(@class,'card ')][${posittionRow}]//a[contains(@download,'${ExpectedValue}')]`);
            await this.driverService.waitUntilElementLoaded(lblActualValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.click(lblActualValue);
            return true;
        } catch (error) {
            console.log('pressDownloadDocumentDetailOnEmailList');
            console.log(error);
            return false;
        }
    }
    public async validateBodyDetailOnEmailList(ExpectedValue: string, posittionRow = 1) {
        try {
            const iframeBody = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//c-details-tab-layout//app-mail-detail-outlook//div[contains(@class,'card ')][${posittionRow}]//iframe`);
            const lblActualValue = By.xpath(`//body/p`);
            await this.driverService.waitUntilElementLoaded(iframeBody);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.switchToFrame(iframeBody);
            await this.driverService.waitUntilElementLoaded(lblActualValue);
            const actualValue = await this.driverService.getText(lblActualValue);
            await this.driverService.switchToDefaultContent();
            return await this.driverService.validateRecord("Validate body detail",
                [actualValue, ExpectedValue, "Incorrect body detail!"]);
        } catch (error) {
            console.log('validateBodyDetailOnEmailList');
            console.log(error);
            return false;
        }
    }
    //#endregion
    //#endregion
}