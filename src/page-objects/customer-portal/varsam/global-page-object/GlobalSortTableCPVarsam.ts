import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../core/selenium-webdriver.service";
import { logWarningMessage, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../shared/functions";
import { GlobalSortTable } from "../../../back-office-portal/general/GlobalPageObject/GlobalSortTable";

export class GlobalSortTableCPVarsam extends GlobalSortTable {
    constructor(driverService: SeleniumWebDriverService) {
        super(driverService);
      }

    //#region Main table
    //#region Sort for string or number
    // Sort Up = ascending (ASC)
    public async pressSortUpColumnAtMainList(columnName: string) {
        try {
            const btnSort = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//th//a[./span[text()='${columnName}']]`);
            await this.driverService.waitUntilElementLoaded(btnSort);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            for (let i = 1; i <= 4; i++) {
                const btnSortUp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//th//a[./span[text()='${columnName}'] and .//i[contains(@class,'fa-sort-up')]]`);
                const temp = await this.driverService.isExisted(btnSortUp);
                if (temp) {
                    return true;
                } else {
                    await this.driverService.click(btnSort);
                    await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
                }
            }
            logWarningMessage(`Can NOT sort up at column ${columnName}`);
            return false;
        } catch (error) {
            console.log('pressSortUpColumnAtMainList');
            console.log(error);
            return false;
        }
    }

    // Sort down = Descending = DESC
    public async pressSortDownColumnAtMainList(columnName: string) {
        try {
            const btnSort = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//th//a[./span[text()='${columnName}']]`);
            await this.driverService.waitUntilElementLoaded(btnSort);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            for (let i = 1; i <= 4; i++) {
                const btnSortDown = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//th//a[./span[text()='${columnName}'] and .//i[contains(@class,'fa-sort-down')]]`);
                const temp = await this.driverService.isExisted(btnSortDown);
                if (temp) {
                    return true;
                } else {
                    await this.driverService.click(btnSort);
                    await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
                }
            }
            logWarningMessage(`Can NOT sort up at column ${columnName}`);
            return false;
        } catch (error) {
            console.log('pressSortDownColumnAtMainList');
            console.log(error);
            return false;
        }
    }
    //#endregion
    //#endregion

    
}