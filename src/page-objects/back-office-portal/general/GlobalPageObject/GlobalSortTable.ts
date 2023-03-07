import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../core/selenium-webdriver.service";
import { compareDate, logWarningMessage, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../shared/functions";

export class GlobalSortTable {
    constructor(protected driverService: SeleniumWebDriverService) { }

    //#region Main table
    //#region Sort for string or number
    // Sort Up = ascending (ASC)
    public async pressSortUpColumnAtMainList(columnName: string) {
        try {
            const btnSort = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//th/a[./span[text()='${columnName}']]`);
            await this.driverService.waitUntilElementLoaded(btnSort);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            for (let i = 1; i <= 4; i++) {
                const btnSortUp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//th/a[./span[text()='${columnName}'] and ./i[contains(@class,'fa-sort-up')]]`);
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
            const btnSort = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//th/a[./span[text()='${columnName}']]`);
            await this.driverService.waitUntilElementLoaded(btnSort);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            for (let i = 1; i <= 4; i++) {
                const btnSortDown = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//th/a[./span[text()='${columnName}'] and ./i[contains(@class,'fa-sort-down')]]`);
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

    //#region Sub table
    //#region Sort for string or number
    // Sort Up = ascending (ASC)
    public async pressSortUpColumnAtSubList(columnName: string) {
        try {
            const btnSort = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//th/a[./span[text()='${columnName}']]`);
            await this.driverService.waitUntilElementLoaded(btnSort);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            for (let i = 1; i <= 4; i++) {
                const btnSortUp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//th/a[./span[text()='${columnName}'] and ./i[contains(@class,'fa-sort-up')]]`);
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
            console.log('pressSortUpColumnAtSubList');
            console.log(error);
            return false;
        }
    }

    // Sort down = Descending = DESC
    public async pressSortDownColumnAtSubList(columnName: string) {
        try {
            const btnSort = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//th/a[./span[text()='${columnName}']]`);
            await this.driverService.waitUntilElementLoaded(btnSort);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            for (let i = 1; i <= 4; i++) {
                const btnSortDown = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//th/a[./span[text()='${columnName}'] and ./i[contains(@class,'fa-sort-down')]]`);
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
            console.log('pressSortDownColumnAtSubList');
            console.log(error);
            return false;
        }
    }
    //#endregion
    //#endregion

    //#region Check string/ number is sorting
    public async isColumnSortingUp(arrayString: string[]) {
        try {
            let arrayTemp = [...arrayString].map(element => {
                return element.toLowerCase();
            });
            let temp = arrayTemp.sort();
            for (let i = 0; i < arrayString.length; i++) {
                if (arrayString[i].toLowerCase() !== temp[i]) {
                    return false;
                }
            }
            return true;
        } catch (error) {
            console.log('isColumnSortingUp');
            console.log(error);
            return false;
        }
    }

    public async isColumnSortingDown(arrayString: string[]) {
        try {
            let arrayTemp = [...arrayString].map(element => {
                return element.toLowerCase();
            });
            let temp = arrayTemp.sort();
            temp = temp.reverse();
            for (let i = 0; i < arrayString.length; i++) {
                if (arrayString[i].toLowerCase() !== temp[i]) {
                    return false;
                }
            }
            return true;
        } catch (error) {
            console.log('isColumnSortingDown');
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region Sorting Date
    /**
     * 
     * @param arrayStringDate ["dd/mm/yyyy", "dd/mm/yyyy",...]
     * @returns true/false
     */
    public async isColumnDateSortingUp(arrayStringDate: string[]) {
        try {
            let arrayTempString = [...arrayStringDate];
            arrayTempString.sort(function (a, b) {
                return compareDate(b, a);
            });

            for (let i = 0; i < arrayStringDate.length; i++) {
                if (arrayTempString[i] !== arrayStringDate[i]) {
                    return false;
                }
            }
            return true;
        } catch (error) {
            console.log('isColumnDateSortingUp');
            console.log(error);
            return false;
        }
    }

    /**
     * 
     * @param arrayStringDate ["dd/mm/yyyy", "dd/mm/yyyy",...]
     * @returns true/false
     */
    public async isColumnDateSortingDown(arrayStringDate: string[]) {
        try {
            let arrayTempString = [...arrayStringDate];
            arrayTempString.sort(function (a, b) {
                return compareDate(a, b);
            });

            for (let i = 0; i < arrayStringDate.length; i++) {
                if (arrayTempString[i] !== arrayStringDate[i]) {
                    return false;
                }
            }
            return true;
        } catch (error) {
            console.log('isColumnDateSortingDown');
            console.log(error);
            return false;
        }
    }
    //#endregion


    //#region Sorting Create (timestamp - recent dates)
    /**
     * 
     * @param arrayStringDate ["5 minutes ago", "an hour ago", "15 days ago",...]
     * @returns true/false
     */
    public async isColumnRecentDatesSortingUp(arrayStringDate: string[]) {
        try {
            let arrayTempObject: any = []; // [{name: "5 minutes ago", value: 456465}]
            for (const iterator of arrayStringDate) {
                let temp = iterator.split(" ");
                let number = (temp[0] === "an" || temp[0] === "a") ? 1 : parseInt(temp[0]);
                let factor = 1;
                if (temp[1].includes("minute")) {
                    factor = 60;
                }
                else if (temp[1].includes("hour")) {
                    factor = 3600;
                }
                else if (temp[1].includes("day")) {
                    factor = 86400;
                }
                else if (temp[1].includes("month")) {
                    factor = 2592000;
                }
                else if (temp[1].includes("year")) {
                    factor = 31536000;
                }
                arrayTempObject.push({ name: iterator, value: number * factor });
            }

            arrayTempObject.sort(function (a, b) {
                return b.value - a.value;
            });

            let arrayTempString: string[] = [];
            for (const iterator of arrayTempObject) {
                arrayTempString.push(iterator.name);
            }

            for (let i = 0; i < arrayStringDate.length; i++) {
                if (arrayTempString[i] !== arrayStringDate[i]) {
                    return false;
                }
            }
            return true;
        } catch (error) {
            console.log('isColumnRecentDatesSortingUp');
            console.log(error);
            return false;
        }
    }

    /**
     * 
     * @param arrayStringDate ["5 minutes ago", "an hour ago", "15 days ago",...]
     * @returns true/false
     */
    public async isColumnRecentDatesSortingDown(arrayStringDate: string[]) {
        try {
            let arrayTempObject: any = []; // [{name: "5 minutes ago", value: 456465}]
            for (const iterator of arrayStringDate) {
                let temp = iterator.split(" ");
                let number = (temp[0] === "an" || temp[0] === "a") ? 1 : parseInt(temp[0]);
                let factor = 1;
                if (temp[1].includes("minute")) {
                    factor = 60;
                }
                else if (temp[1].includes("hour")) {
                    factor = 3600;
                }
                else if (temp[1].includes("day")) {
                    factor = 86400;
                }
                else if (temp[1].includes("month")) {
                    factor = 2592000;
                }
                else if (temp[1].includes("year")) {
                    factor = 31536000;
                }
                arrayTempObject.push({ name: iterator, value: number * factor });
            }
            arrayTempObject.sort(function (a, b) {
                return a.value - b.value;
            });
            let arrayTempString: string[] = [];
            for (const iterator of arrayTempObject) {
                arrayTempString.push(iterator.name);
            }
            for (let i = 0; i < arrayStringDate.length; i++) {
                if (arrayTempString[i] !== arrayStringDate[i]) {
                    return false;
                }
            }
            return true;
        } catch (error) {
            console.log('isColumnRecentDatesSortingDown');
            console.log(error);
            return false;
        }
    }
    //#endregion
}