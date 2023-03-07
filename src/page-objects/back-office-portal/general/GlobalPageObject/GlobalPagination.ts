import { By } from "selenium-webdriver";
import { BasePage } from "../../../../core/BasePage";
import { closeToastMessage, logInfoMessage, logSuccessMessage, logWarningMessage, waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../shared/functions";

export class GlobalPagination extends BasePage {
    //#region I. Xpath for pagination Main tab
    protected btnDoubleLeftDisabledAtMainTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//i[contains(@class,'fa-angle-double-left')]//parent::a/parent::li[contains(@class,'disabled')]");
    protected btnDoubleLeftEnabledAtMainTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//i[contains(@class,'fa-angle-double-left')]//parent::a/parent::li[not(contains(@class,'disabled'))]");

    protected btnDoubleRightDisabledAtMainTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//i[contains(@class,'fa-angle-double-right')]//parent::a/parent::li[contains(@class,'disabled')]");
    protected btnDoubleRightEnabledAtMainTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//i[contains(@class,'fa-angle-double-right')]//parent::a/parent::li[not(contains(@class,'disabled'))]");

    protected btnPrevDisabledAtMainTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//a[text()='Prev']//parent::li[contains(@class,'disabled')]");
    protected btnPrevEnabledAtMainTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//a[text()='Prev']//parent::li[not(contains(@class,'disabled'))]");

    protected btnNextDisabledAtMainTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//a[text()='Next']//parent::li[contains(@class,'disabled')]");
    protected btnNextEnabledAtMainTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//a[text()='Next']//parent::li[not(contains(@class,'disabled'))]");

    protected btnReloadTableAtMainTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//ul[contains(@class,'pagination')]/li[./a/i[contains(@class,'fa-sync')]]");

    protected txtPageNumberAtMainTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//ul[contains(@class,'pagination')]//input");
    protected lblTotalPageNumberAtMainTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//ul[contains(@class,'pagination')]//span[contains(text(),'/ ')]");
    //#endregion

    //#region Xpath for Item/Page Main tab - Total Records
    protected btnItemPageAtMainTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[@id='pgs-expand-rows-btn']");
    protected dropdownItemPageAtMainTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'list-items')]//div[contains(@class,'dropdown-menu')]");

    protected lblTotalRecordsAtMainTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./div[contains(@class,'list-items')]]/div[contains(text(),'Total ')]");
    //#endregion

    //#region Xpath on Main table
    protected rowsTableAtMainTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tbody//tr");
    //#endregion
    // Loading...
    protected lblLoadingAtMainTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr/td[contains(text(),'Loading...')]");

    protected ulPaginationAtMainTab = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//c-table//ul[contains(@class,'pagination')]`);



    //#region II. Xpath for pagination Sub tab
    protected btnDoubleLeftDisabledAtSubTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//i[contains(@class,'fa-angle-double-left')]//parent::a/parent::li[contains(@class,'disabled')]");
    protected btnDoubleLeftEnabledAtSubTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//i[contains(@class,'fa-angle-double-left')]//parent::a/parent::li[not(contains(@class,'disabled'))]");

    protected btnDoubleRightDisabledAtSubTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//i[contains(@class,'fa-angle-double-right')]//parent::a/parent::li[contains(@class,'disabled')]");
    protected btnDoubleRightEnabledAtSubTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//i[contains(@class,'fa-angle-double-right')]//parent::a/parent::li[not(contains(@class,'disabled'))]");

    protected btnPrevDisabledAtSubTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//a[text()='Prev']//parent::li[contains(@class,'disabled')]");
    protected btnPrevEnabledAtSubTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//a[text()='Prev']//parent::li[not(contains(@class,'disabled'))]");

    protected btnNextDisabledAtSubTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//a[text()='Next']//parent::li[contains(@class,'disabled')]");
    protected btnNextEnabledAtSubTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//a[text()='Next']//parent::li[not(contains(@class,'disabled'))]");

    protected btnReloadTableAtSubTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//ul[contains(@class,'pagination')]/li[./a/i[contains(@class,'fa-sync')]]");

    protected txtPageNumberAtSubTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//ul[contains(@class,'pagination')]//input");
    protected lblTotalPageNumberAtSubTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//ul[contains(@class,'pagination')]//span[contains(text(),'/ ')]");
    //#endregion

    //#region Xpath for Item/Page Sub tab - Total Records
    protected btnItemPageAtSubTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[@id='pgs-expand-rows-btn']");
    protected dropdownItemPageAtSubTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'list-items')]//div[contains(@class,'dropdown-menu')]");

    protected lblTotalRecordsAtSubTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./div[contains(@class,'list-items')]]/div[contains(text(),'Total ')]");
    //#endregion

    //#region Xpath on Sub table
    protected rowsTableAtSubTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tbody//tr");
    //#endregion

    // Loading...
    protected lblLoadingAtSubTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr/td[contains(text(),'Loading...')]");


    protected ulPaginationAtSubTab = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//c-table//ul[contains(@class,'pagination')]`);

    //constructor(protected driverService: SeleniumWebDriverService) { }


    //#region I. Methods on Main List
    public async checkPaginationOnMainListExist() {
        return await this.driverService.isExisted(this.ulPaginationAtMainTab);
    }

    // Return array string: ["10", "30", "50"]
    public async getArrayOptionsItemPageAtMainList() {
        try {
            await this.driverService.waitUntilElementLoaded(this.dropdownItemPageAtMainTab);
            let temp = await this.driverService.getAttributeValue(this.dropdownItemPageAtMainTab, 'textContent');
            let result = temp.trim().split("  ");
            return result;
        } catch (error) {
            console.log('getArrayOptionsItemPageAtMainList');
            console.log(error);
            return [];
        }
    }

    public async getCurrentSelectingItemPageNumberAtMainList() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnItemPageAtMainTab);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            let result = await this.driverService.getText(this.btnItemPageAtMainTab);
            return result.replace(/^\D+/g, '');
        } catch (error) {
            console.log('getCurrentSelectingItemPageNumberAtMainList');
            console.log(error);
            return "";
        }
    }

    public async selectItemPageNumberAtMainList(option: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnItemPageAtMainTab);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const btnOption = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'list-items') and contains(@class,'show')]//div[contains(@class,'dropdown-menu')]//button[text()=' ${option} ']`);
            await this.driverService.click(this.btnItemPageAtMainTab);
            await this.driverService.waitUntilElementLoaded(btnOption);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await this.driverService.click(btnOption);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true;
        } catch (error) {
            console.log('selectItemPageNumberAtMainList');
            console.log(error);
            return false;
        }
    }

    public async getTotalRecordsAtMainList() {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblTotalRecordsAtMainTab);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            let temp = await this.driverService.getText(this.lblTotalRecordsAtMainTab);
            return parseInt(temp.replace(/^\D+/g, ''));
        } catch (error) {
            console.log('getTotalRecordsAtMainList');
            console.log(error);
            return -1;
        }
    }
    public async getCurrentPageNumberAtMainList() {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtPageNumberAtMainTab);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            let temp = await this.driverService.getAttributeValue(this.txtPageNumberAtMainTab, 'value');
            let result = parseInt(temp.replace(/^\D+/g, ''));
            return result;
        } catch (error) {
            console.log('getCurrentPageNumberAtMainList');
            console.log(error);
            return -1;
        }
    }
    public async getCurrentTotalPageNumberAtMainList() {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblTotalPageNumberAtMainTab);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            let temp = await this.driverService.getText(this.lblTotalPageNumberAtMainTab);
            return parseInt(temp.replace(/^\D+/g, ''));
        } catch (error) {
            console.log('getCurrentTotalPageNumberAtMainList');
            console.log(error);
            return -1;
        }
    }

    public async checkStatusOfAllButtonsPaginationAtMainList(pageNumber: number, totalPageNumber: number) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblTotalPageNumberAtMainTab);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.pressTab(this.txtPageNumberAtMainTab);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            if (pageNumber === 1) {
                if (!(await this.driverService.isExisted(this.btnDoubleLeftDisabledAtMainTab))) {
                    logWarningMessage(`"Pagingation double left" button should be disabled!`);
                    return false;
                }

                if (!(await this.driverService.isExisted(this.btnPrevDisabledAtMainTab))) {
                    logWarningMessage(`"Pagingation Prev" button should be disabled!`);
                    return false;
                }
            } else if (pageNumber > 1) {
                if (!(await this.driverService.isExisted(this.btnDoubleLeftEnabledAtMainTab))) {
                    logWarningMessage(`"Pagingation double left" button should be enabled!`);
                    return false;
                }

                if (!(await this.driverService.isExisted(this.btnPrevEnabledAtMainTab))) {
                    logWarningMessage(`"Pagingation Prev" button should be enabled!`);
                    return false;
                }

                if (pageNumber < totalPageNumber) {
                    if (!(await this.driverService.isExisted(this.btnDoubleRightEnabledAtMainTab))) {
                        logWarningMessage(`"Pagingation double right" button should be enabled!`);
                        return false;
                    }

                    if (!(await this.driverService.isExisted(this.btnNextEnabledAtMainTab))) {
                        logWarningMessage(`"Pagingation Next" button should be enabled!`);
                        return false;
                    }
                } else if (pageNumber === totalPageNumber) {
                    if (!(await this.driverService.isExisted(this.btnDoubleRightDisabledAtMainTab))) {
                        logWarningMessage(`"Pagingation double right" button should be disabled!`);
                        return false;
                    }

                    if (!(await this.driverService.isExisted(this.btnNextDisabledAtMainTab))) {
                        logWarningMessage(`"Pagingation Next" button should be disabled!`);
                        return false;
                    }
                } else {
                    logWarningMessage(`pageNumber = ${pageNumber} > totalPageNumber = ${totalPageNumber}!`);
                    return false;
                }
            } else {
                logWarningMessage(`Page number = "${pageNumber}" - Incorrect value!`);
                return false;
            }
            return true;
        } catch (error) {
            console.log('checkStatusOfAllButtonsPaginationAtMainList');
            console.log(error);
            return false;
        }
    }

    public async checkNumberRowTableShowingAtMainList(itemPageNumber: number, pageNumber: number, totalPageNumber: number) {
        try {
            await this.driverService.waitUntilElementLoaded(this.rowsTableAtMainTab);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const numberOfRow = await (await this.driverService.findElements(this.rowsTableAtMainTab)).length;
            if (pageNumber < totalPageNumber) {
                if (itemPageNumber !== numberOfRow) {
                    logWarningMessage(`There are ${numberOfRow} records found on list. It should be "${itemPageNumber}"!`);
                    return false;
                }
            } else if (pageNumber === totalPageNumber) {
                if (numberOfRow > itemPageNumber) {
                    logWarningMessage(`There are ${numberOfRow} records found on list. It should be <= ${itemPageNumber}!`);
                    return false;
                }
            } else {
                logWarningMessage(`Number of records found > ${numberOfRow}. It should be <= ${itemPageNumber}!`);
                return false;
            }
            return true;
        } catch (error) {
            console.log('checkNumberRowTableShowingAtMainList');
            console.log(error);
            return false;
        }
    }
    public async checkPagingFunctionAtMainList() {
        try {
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
            await this.driverService.waitForElementInVisible(this.lblLoadingAtMainTab);
            let arrayOptions = await this.getArrayOptionsItemPageAtMainList();
            let totalRecords = await this.getTotalRecordsAtMainList();
            if (arrayOptions.length === 0 || totalRecords < 0) {
                logWarningMessage(`Option Itemp/Page: ${arrayOptions} and Total records: ${totalRecords}`);
                return false;
            }
            let temp = true;
            for (const option of arrayOptions) {
                logInfoMessage("\n\t\tSelecting Item/Page: " + option);
                temp = await this.selectItemPageNumberAtMainList(option);
                if (!temp) {
                    logWarningMessage(`\t\tSelection Item/Page: ${option} failed!`);
                    return false;
                }
                let pageNumber = await this.getCurrentPageNumberAtMainList();
                let totalPageNumber = await this.getCurrentTotalPageNumberAtMainList();
                let expectedTotalPageNumber = Math.ceil(totalRecords / parseInt(option));
                logInfoMessage(`\t\t - Page/TotalPage: ${pageNumber}/${totalPageNumber}`);
                if (totalPageNumber !== expectedTotalPageNumber) {
                    logWarningMessage(`Total Page number should be: ${expectedTotalPageNumber}`);
                    return false;
                }
                if (totalRecords <= parseInt(option)) {
                    if (!(pageNumber === 1 && totalPageNumber === 1)) {
                        logWarningMessage(`\t\tPage Number/ Total Page should be: "1 / 1"`);
                        return false;
                    }
                    // Check status pagination
                    temp = await this.checkStatusOfAllButtonsPaginationAtMainList(pageNumber, totalPageNumber);
                    if (!temp) {
                        logWarningMessage(`Item/Page: ${option} - Page: ${pageNumber}/${totalPageNumber}: Check status pagination button failed!`);
                        return false;
                    }
                    // Check number of records showing on list
                    temp = await this.checkNumberRowTableShowingAtMainList(parseInt(option), pageNumber, totalPageNumber);
                    if (!temp) {
                        logWarningMessage(`Item/Page: ${option} - Page: ${pageNumber}/${totalPageNumber}: Check number of records showing on list failed!`);
                        return false;
                    }
                } else {
                    //#region Default value - Before click pagin button
                    // Check status pagination
                    temp = await this.checkStatusOfAllButtonsPaginationAtMainList(pageNumber, totalPageNumber);
                    if (!temp) {
                        logWarningMessage(`Item/Page: ${option} - Page: ${pageNumber}/${totalPageNumber}: Check status pagination button failed!`);
                        return false;
                    }
                    // Check number of records showing on list
                    temp = await this.checkNumberRowTableShowingAtMainList(parseInt(option), pageNumber, totalPageNumber);
                    if (!temp) {
                        logWarningMessage(`Item/Page: ${option} - Page: ${pageNumber}/${totalPageNumber}: Check number of records showing on list failed!`);
                        return false;
                    }
                    //#endregion

                    //#region - Checking Next button...
                    logInfoMessage("\t\t - Checking Next button...");
                    await this.driverService.click(this.btnNextEnabledAtMainTab);
                    await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);

                    // Check status pagination
                    temp = await this.checkStatusOfAllButtonsPaginationAtMainList(2, totalPageNumber);
                    if (!temp) {
                        logWarningMessage(`Item/Page: ${option} - Page: 2/${totalPageNumber}: Check status pagination button failed!`);
                        return false;
                    }
                    // Check number of records showing on list
                    temp = await this.checkNumberRowTableShowingAtMainList(parseInt(option), 2, totalPageNumber);
                    if (!temp) {
                        logWarningMessage(`Item/Page: ${option} - Page: 2/${totalPageNumber}: Check number of records showing on list failed!`);
                        return false;
                    }
                    //#endregion

                    //#region  - Checking Double left button...
                    logInfoMessage("\t\t - Checking Double left button...");
                    await this.driverService.click(this.btnDoubleLeftEnabledAtMainTab);
                    await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);

                    // Check status pagination
                    temp = await this.checkStatusOfAllButtonsPaginationAtMainList(1, totalPageNumber);
                    if (!temp) {
                        logWarningMessage(`Item/Page: ${option} - Page: 1/${totalPageNumber}: Check status pagination button failed!`);
                        return false;
                    }
                    // Check number of records showing on list
                    temp = await this.checkNumberRowTableShowingAtMainList(parseInt(option), 1, totalPageNumber);
                    if (!temp) {
                        logWarningMessage(`Item/Page: ${option} - Page: 1/${totalPageNumber}: Check number of records showing on list failed!`);
                        return false;
                    }
                    //#endregion

                    //#region  - Checking Double right button...
                    logInfoMessage("\t\t - Checking Double right button...");
                    await this.driverService.click(this.btnDoubleRightEnabledAtMainTab);
                    await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);

                    // Check status pagination
                    temp = await this.checkStatusOfAllButtonsPaginationAtMainList(totalPageNumber, totalPageNumber);
                    if (!temp) {
                        logWarningMessage(`Item/Page: ${option} - Page: ${totalPageNumber}/${totalPageNumber}: Check status pagination button failed!`);
                        return false;
                    }
                    // Check number of records showing on list
                    temp = await this.checkNumberRowTableShowingAtMainList(parseInt(option), totalPageNumber, totalPageNumber);
                    if (!temp) {
                        logWarningMessage(`Item/Page: ${option} - Page: ${totalPageNumber}/${totalPageNumber}: Check number of records showing on list failed!`);
                        return false;
                    }
                    //#endregion


                    //#region  - Checking Prev button...
                    logInfoMessage("\t\t - Checking Prev button...");
                    await this.driverService.click(this.btnPrevEnabledAtMainTab);
                    await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);

                    // Check status pagination
                    temp = await this.checkStatusOfAllButtonsPaginationAtMainList(totalPageNumber - 1, totalPageNumber);
                    if (!temp) {
                        logWarningMessage(`Item/Page: ${option} - Page: ${totalPageNumber - 1}/${totalPageNumber}: Check status pagination button failed!`);
                        return false;
                    }
                    // Check number of records showing on list
                    temp = await this.checkNumberRowTableShowingAtMainList(parseInt(option), totalPageNumber - 1, totalPageNumber);
                    if (!temp) {
                        logWarningMessage(`Item/Page: ${option} - Page: ${totalPageNumber - 1}/${totalPageNumber}: Check number of records showing on list failed!`);
                        return false;
                    }
                    //#endregion

                    //#region  - Checking Double left button...
                    if (await this.driverService.isExisted(this.btnDoubleLeftEnabledAtMainTab)) {
                        logInfoMessage("\t\t - Checking Double left button...");
                        await this.driverService.click(this.btnDoubleLeftEnabledAtMainTab);
                        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);

                        // Check status pagination
                        temp = await this.checkStatusOfAllButtonsPaginationAtMainList(1, totalPageNumber);
                        if (!temp) {
                            logWarningMessage(`Item/Page: ${option} - Page: 1/${totalPageNumber}: Check status pagination button failed!`);
                            return false;
                        }
                        // Check number of records showing on list
                        temp = await this.checkNumberRowTableShowingAtMainList(parseInt(option), 1, totalPageNumber);
                        if (!temp) {
                            logWarningMessage(`Item/Page: ${option} - Page: 1/${totalPageNumber}: Check number of records showing on list failed!`);
                            return false;
                        }
                    }
                    //#endregion
                }
            }
            return true;
        } catch (error) {
            console.log('checkPagingFunctionAtMainList');
            console.log(error);
            return false;
        }
    }

    public async verifyPaginagtionButtonsAtMainList(name: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblTotalRecordsAtMainTab);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await closeToastMessage(this.driverService);

            //#region I. Verify pagination buttons
            logInfoMessage(`\tI. Verify paginagtion buttons at ${name} list:`);
            //Verify "Double left" button
            if (!(await this.driverService.isExisted(this.btnDoubleLeftDisabledAtMainTab))) {
                logWarningMessage(`${name} list is missing "Pagingation double left" button!`);
                return false;
            }
            if ((await this.driverService.isExisted(this.btnDoubleLeftEnabledAtMainTab))) {
                logWarningMessage(`"Pagingation double left" button should be Disabled!`);
                return false;
            }

            //Verify "Prev" button
            if (!(await this.driverService.isExisted(this.btnPrevDisabledAtMainTab))) {
                logWarningMessage(`${name} list is missing "Pagingation Prev" button!`);
                return false;
            }
            if ((await this.driverService.isExisted(this.btnPrevEnabledAtMainTab))) {
                logWarningMessage(`"Pagingation Prev" button should be Disabled!`);
                return false;
            }
            logSuccessMessage("\t => Passed!");
            //#endregion

            //#region II. Check funtions pagination - Expand Item/Page
            logInfoMessage("\tII. Checking pagination funtion at list...");
            let temp = await this.checkPagingFunctionAtMainList();
            if (!temp) {
                logWarningMessage("Pagination funtion is working incorrect!");
                return false;
            }
            logSuccessMessage("\t => Passed!");
            //#endregion
            return true;
        } catch (error) {
            console.log('verifyPaginagtionButtonsAtMainList');
            console.log(error);
            return false;
        }
    }

    public async pressReloadTableOnMainList(timeWaitBeforeReload = 0) {
        try {
            await this.driverService.waitUntilElementVisible(this.btnReloadTableAtMainTab);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, timeWaitBeforeReload);
            await this.driverService.waitUntilElementVisible(this.btnReloadTableAtMainTab);
            await this.driverService.click(this.btnReloadTableAtMainTab);
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true;
        } catch (error) {
            console.log('pressReloadTableOnMainList');
            console.log(error);
            return false;
        }
    }

    public async pressDoubleRightButtonOnMainList(){
        try {
            const element = await this.getFieldType(this.btnDoubleRightEnabledAtMainTab);
            await element.click();
            return true;
        } catch (error) {
            console.log('pressDoubleRightButtonOnMainList');
            console.log(error);
            return false;
        }
    }
    public async pressNextButtonOnMainList(){
        try {
            const element = await this.getFieldType(this.btnNextEnabledAtMainTab);
            await element.click();
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true;
        } catch (error) {
            console.log('pressNextButtonOnMainList');
            console.log(error);
            return false;
        }
    }

    //#endregion
    //#region II. Methods on Sublist
    public async checkPaginationOnSubListExist() {
        return await this.driverService.isExisted(this.ulPaginationAtSubTab);
    }

    // Return array string: ["10", "30", "50"]
    public async getArrayOptionsItemPageAtSubList() {
        try {
            await this.driverService.waitUntilElementLoaded(this.dropdownItemPageAtSubTab);
            let temp = await this.driverService.getAttributeValue(this.dropdownItemPageAtSubTab, 'textContent');
            let result = temp.trim().split("  ");
            return result;
        } catch (error) {
            console.log('getArrayOptionsItemPageAtSubList');
            console.log(error);
            return [];
        }
    }

    public async getCurrentSelectingItemPageNumberAtSubList() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnItemPageAtSubTab);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            let result = await this.driverService.getText(this.btnItemPageAtSubTab);
            return result.replace(/^\D+/g, '');
        } catch (error) {
            console.log('getCurrentSelectingItemPageNumberAtSubList');
            console.log(error);
            return "";
        }
    }

    public async selectItemPageNumberAtSubList(option: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnItemPageAtSubTab);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const btnOption = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'list-items') and contains(@class,'show')]//div[contains(@class,'dropdown-menu')]//button[text()=' ${option} ']`);
            await this.driverService.click(this.btnItemPageAtSubTab);
            await this.driverService.waitUntilElementLoaded(btnOption);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await this.driverService.click(btnOption);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true;
        } catch (error) {
            console.log('selectItemPageNumberAtSubList');
            console.log(error);
            return false;
        }
    }

    public async getTotalRecordsAtSubList() {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblTotalRecordsAtSubTab);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            let temp = await this.driverService.getText(this.lblTotalRecordsAtSubTab);
            return parseInt(temp.replace(/^\D+/g, ''));
        } catch (error) {
            console.log('getTotalRecordsAtSubList');
            console.log(error);
            return -1;
        }
    }
    public async getCurrentPageNumberAtSubList() {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtPageNumberAtSubTab);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            let temp = await this.driverService.getAttributeValue(this.txtPageNumberAtSubTab, 'value');
            let result = parseInt(temp.replace(/^\D+/g, ''));
            return result;
        } catch (error) {
            console.log('getCurrentPageNumberAtSubList');
            console.log(error);
            return -1;
        }
    }
    public async getCurrentTotalPageNumberAtSubList() {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblTotalPageNumberAtSubTab);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            let temp = await this.driverService.getText(this.lblTotalPageNumberAtSubTab);
            return parseInt(temp.replace(/^\D+/g, ''));
        } catch (error) {
            console.log('getCurrentTotalPageNumberAtSubList');
            console.log(error);
            return -1;
        }
    }

    public async checkStatusOfAllButtonsPaginationAtSubList(pageNumber: number, totalPageNumber: number) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblTotalPageNumberAtSubTab);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.pressTab(this.txtPageNumberAtSubTab);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            if (pageNumber === 1) {
                if (!(await this.driverService.isExisted(this.btnDoubleLeftDisabledAtSubTab))) {
                    logWarningMessage(`"Pagingation double left" button should be disabled!`);
                    return false;
                }

                if (!(await this.driverService.isExisted(this.btnPrevDisabledAtSubTab))) {
                    logWarningMessage(`"Pagingation Prev" button should be disabled!`);
                    return false;
                }
            } else if (pageNumber > 1) {
                if (!(await this.driverService.isExisted(this.btnDoubleLeftEnabledAtSubTab))) {
                    logWarningMessage(`"Pagingation double left" button should be enabled!`);
                    return false;
                }

                if (!(await this.driverService.isExisted(this.btnPrevEnabledAtSubTab))) {
                    logWarningMessage(`"Pagingation Prev" button should be enabled!`);
                    return false;
                }

                if (pageNumber < totalPageNumber) {
                    if (!(await this.driverService.isExisted(this.btnDoubleRightEnabledAtSubTab))) {
                        logWarningMessage(`"Pagingation double right" button should be enabled!`);
                        return false;
                    }

                    if (!(await this.driverService.isExisted(this.btnNextEnabledAtSubTab))) {
                        logWarningMessage(`"Pagingation Next" button should be enabled!`);
                        return false;
                    }
                } else if (pageNumber === totalPageNumber) {
                    if (!(await this.driverService.isExisted(this.btnDoubleRightDisabledAtSubTab))) {
                        logWarningMessage(`"Pagingation double right" button should be disabled!`);
                        return false;
                    }

                    if (!(await this.driverService.isExisted(this.btnNextDisabledAtSubTab))) {
                        logWarningMessage(`"Pagingation Next" button should be disabled!`);
                        return false;
                    }
                } else {
                    logWarningMessage(`pageNumber = ${pageNumber} > totalPageNumber = ${totalPageNumber}!`);
                    return false;
                }
            } else {
                logWarningMessage(`Page number = "${pageNumber}" - Incorrect value!`);
                return false;
            }
            return true;
        } catch (error) {
            console.log('checkStatusOfAllButtonsPaginationAtSubList');
            console.log(error);
            return false;
        }
    }

    public async checkNumberRowTableShowingAtSubList(itemPageNumber: number, pageNumber: number, totalPageNumber: number) {
        try {
            await this.driverService.waitUntilElementLoaded(this.rowsTableAtSubTab);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const numberOfRow = await (await this.driverService.findElements(this.rowsTableAtSubTab)).length;
            if (pageNumber < totalPageNumber) {
                if (itemPageNumber !== numberOfRow) {
                    logWarningMessage(`There are ${numberOfRow} records found on list. It should be "${itemPageNumber}"!`);
                    return false;
                }
            } else if (pageNumber === totalPageNumber) {
                if (numberOfRow > itemPageNumber) {
                    logWarningMessage(`There are ${numberOfRow} records found on list. It should be <= ${itemPageNumber}!`);
                    return false;
                }
            } else {
                logWarningMessage(`Number of records found > ${numberOfRow}. It should be <= ${itemPageNumber}!`);
                return false;
            }
            return true;
        } catch (error) {
            console.log('checkNumberRowTableShowingAtSubList');
            console.log(error);
            return false;
        }
    }
    public async checkPagingFunctionAtSubList() {
        try {
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
            await this.driverService.waitForElementInVisible(this.lblLoadingAtSubTab);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);

            let arrayOptions = await this.getArrayOptionsItemPageAtSubList();
            let totalRecords = await this.getTotalRecordsAtSubList();
            if (arrayOptions.length === 0 || totalRecords < 0) {
                logWarningMessage(`Option Itemp/Page: ${arrayOptions} and Total records: ${totalRecords}`);
                return false;
            }
            let temp = true;
            for (const option of arrayOptions) {
                logInfoMessage("\n\t\tSelecting Item/Page: " + option);
                temp = await this.selectItemPageNumberAtSubList(option);
                if (!temp) {
                    logWarningMessage(`\t\tSelection Item/Page: ${option} failed!`);
                    return false;
                }
                let pageNumber = await this.getCurrentPageNumberAtSubList();
                let totalPageNumber = await this.getCurrentTotalPageNumberAtSubList();
                let expectedTotalPageNumber = Math.ceil(totalRecords / parseInt(option));
                logInfoMessage(`\t\t - Page/TotalPage: ${pageNumber}/${totalPageNumber}`);
                if (totalPageNumber !== expectedTotalPageNumber) {
                    logWarningMessage(`Total Page number should be: ${expectedTotalPageNumber}`);
                    return false;
                }
                if (totalRecords <= parseInt(option)) {
                    if (!(pageNumber === 1 && totalPageNumber === 1)) {
                        logWarningMessage(`\t\tPage Number/ Total Page should be: "1 / 1"`);
                        return false;
                    }
                    // Check status pagination
                    temp = await this.checkStatusOfAllButtonsPaginationAtSubList(pageNumber, totalPageNumber);
                    if (!temp) {
                        logWarningMessage(`Item/Page: ${option} - Page: ${pageNumber}/${totalPageNumber}: Check status pagination button failed!`);
                        return false;
                    }
                    // Check number of records showing on list
                    temp = await this.checkNumberRowTableShowingAtSubList(parseInt(option), pageNumber, totalPageNumber);
                    if (!temp) {
                        logWarningMessage(`Item/Page: ${option} - Page: ${pageNumber}/${totalPageNumber}: Check number of records showing on list failed!`);
                        return false;
                    }
                } else {
                    //#region Default value - Before click pagin button
                    // Check status pagination
                    temp = await this.checkStatusOfAllButtonsPaginationAtSubList(pageNumber, totalPageNumber);
                    if (!temp) {
                        logWarningMessage(`Item/Page: ${option} - Page: ${pageNumber}/${totalPageNumber}: Check status pagination button failed!`);
                        return false;
                    }
                    // Check number of records showing on list
                    temp = await this.checkNumberRowTableShowingAtSubList(parseInt(option), pageNumber, totalPageNumber);
                    if (!temp) {
                        logWarningMessage(`Item/Page: ${option} - Page: ${pageNumber}/${totalPageNumber}: Check number of records showing on list failed!`);
                        return false;
                    }
                    //#endregion

                    //#region - Checking Next button...
                    logInfoMessage("\t\t - Checking Next button...");
                    await this.driverService.click(this.btnNextEnabledAtSubTab);
                    await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);

                    // Check status pagination
                    temp = await this.checkStatusOfAllButtonsPaginationAtSubList(2, totalPageNumber);
                    if (!temp) {
                        logWarningMessage(`Item/Page: ${option} - Page: 2/${totalPageNumber}: Check status pagination button failed!`);
                        return false;
                    }
                    // Check number of records showing on list
                    temp = await this.checkNumberRowTableShowingAtSubList(parseInt(option), 2, totalPageNumber);
                    if (!temp) {
                        logWarningMessage(`Item/Page: ${option} - Page: 2/${totalPageNumber}: Check number of records showing on list failed!`);
                        return false;
                    }
                    //#endregion

                    //#region  - Checking Double left button...
                    logInfoMessage("\t\t - Checking Double left button...");
                    await this.driverService.click(this.btnDoubleLeftEnabledAtSubTab);
                    await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);

                    // Check status pagination
                    temp = await this.checkStatusOfAllButtonsPaginationAtSubList(1, totalPageNumber);
                    if (!temp) {
                        logWarningMessage(`Item/Page: ${option} - Page: 1/${totalPageNumber}: Check status pagination button failed!`);
                        return false;
                    }
                    // Check number of records showing on list
                    temp = await this.checkNumberRowTableShowingAtSubList(parseInt(option), 1, totalPageNumber);
                    if (!temp) {
                        logWarningMessage(`Item/Page: ${option} - Page: 1/${totalPageNumber}: Check number of records showing on list failed!`);
                        return false;
                    }
                    //#endregion

                    //#region  - Checking Double right button...
                    logInfoMessage("\t\t - Checking Double right button...");
                    await this.driverService.click(this.btnDoubleRightEnabledAtSubTab);
                    await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);

                    // Check status pagination
                    temp = await this.checkStatusOfAllButtonsPaginationAtSubList(totalPageNumber, totalPageNumber);
                    if (!temp) {
                        logWarningMessage(`Item/Page: ${option} - Page: ${totalPageNumber}/${totalPageNumber}: Check status pagination button failed!`);
                        return false;
                    }
                    // Check number of records showing on list
                    temp = await this.checkNumberRowTableShowingAtSubList(parseInt(option), totalPageNumber, totalPageNumber);
                    if (!temp) {
                        logWarningMessage(`Item/Page: ${option} - Page: ${totalPageNumber}/${totalPageNumber}: Check number of records showing on list failed!`);
                        return false;
                    }
                    //#endregion


                    //#region  - Checking Prev button...
                    logInfoMessage("\t\t - Checking Prev button...");
                    await this.driverService.click(this.btnPrevEnabledAtSubTab);
                    await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);

                    // Check status pagination
                    temp = await this.checkStatusOfAllButtonsPaginationAtSubList(totalPageNumber - 1, totalPageNumber);
                    if (!temp) {
                        logWarningMessage(`Item/Page: ${option} - Page: ${totalPageNumber - 1}/${totalPageNumber}: Check status pagination button failed!`);
                        return false;
                    }
                    // Check number of records showing on list
                    temp = await this.checkNumberRowTableShowingAtSubList(parseInt(option), totalPageNumber - 1, totalPageNumber);
                    if (!temp) {
                        logWarningMessage(`Item/Page: ${option} - Page: ${totalPageNumber - 1}/${totalPageNumber}: Check number of records showing on list failed!`);
                        return false;
                    }
                    //#endregion


                    //#region  - Checking Double left button...
                    if (await this.driverService.isExisted(this.btnDoubleLeftEnabledAtSubTab)) {
                        logInfoMessage("\t\t - Checking Double left button...");
                        await this.driverService.click(this.btnDoubleLeftEnabledAtSubTab);
                        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);

                        // Check status pagination
                        temp = await this.checkStatusOfAllButtonsPaginationAtSubList(1, totalPageNumber);
                        if (!temp) {
                            logWarningMessage(`Item/Page: ${option} - Page: 1/${totalPageNumber}: Check status pagination button failed!`);
                            return false;
                        }
                        // Check number of records showing on list
                        temp = await this.checkNumberRowTableShowingAtSubList(parseInt(option), 1, totalPageNumber);
                        if (!temp) {
                            logWarningMessage(`Item/Page: ${option} - Page: 1/${totalPageNumber}: Check number of records showing on list failed!`);
                            return false;
                        }
                    }
                    //#endregion
                }
            }
            return true;
        } catch (error) {
            console.log('checkPagingFunctionAtSubList');
            console.log(error);
            return false;
        }
    }

    public async verifyPaginagtionButtonsAtSubList(name: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblTotalRecordsAtSubTab);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await closeToastMessage(this.driverService);

            //#region I. Verify pagination buttons
            logInfoMessage(`\tI. Verify paginagtion buttons at ${name} list:`);
            //Verify "Double left" button
            if (!(await this.driverService.isExisted(this.btnDoubleLeftDisabledAtSubTab))) {
                logWarningMessage(`${name} list is missing "Pagingation double left" button!`);
                return false;
            }
            if ((await this.driverService.isExisted(this.btnDoubleLeftEnabledAtSubTab))) {
                logWarningMessage(`"Pagingation double left" button should be Disabled!`);
                return false;
            }

            //Verify "Prev" button
            if (!(await this.driverService.isExisted(this.btnPrevDisabledAtSubTab))) {
                logWarningMessage(`${name} list is missing "Pagingation Prev" button!`);
                return false;
            }
            if ((await this.driverService.isExisted(this.btnPrevEnabledAtSubTab))) {
                logWarningMessage(`"Pagingation Prev" button should be Disabled!`);
                return false;
            }
            logSuccessMessage("\t => Passed!");
            //#endregion

            //#region II. Check funtions pagination - Expand Item/Page
            logInfoMessage("\tII. Checking pagination funtion at list...");
            let temp = await this.checkPagingFunctionAtSubList();
            if (!temp) {
                logWarningMessage("Pagination funtion is working incorrect!");
                return false;
            }
            logSuccessMessage("\t => Passed!");
            //#endregion
            return true;
        } catch (error) {
            console.log('verifyPaginagtionButtonsAtSubList');
            console.log(error);
            return false;
        }
    }

    public async pressReloadTableOnSubList(timeWaitBeforeReload = 0) {
        try {
            await this.driverService.waitUntilElementVisible(this.btnReloadTableAtSubTab);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, timeWaitBeforeReload);
            await this.driverService.click(this.btnReloadTableAtSubTab);
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true;
        } catch (error) {
            console.log('pressReloadTableOnSubList');
            console.log(error);
            return false;
        }
    }

    public async pressDoubleRightButtonOnSubList(){
        try {
            if(!await this.driverService.isExisted(this.btnDoubleRightDisabledAtSubTab)){
                const element = await this.getFieldType(this.btnDoubleRightEnabledAtSubTab);
                await element.click();
                await waitUntilHorizontalProgressBarLoaded(this.driverService);
            }
            return true;
        } catch (error) {
            console.log('pressDoubleRightButtonOnSubList');
            console.log(error);
            return false;
        }
    }


    public async pressDoubleLeftButtonOnSubList(){
        try {
            if(!await this.driverService.isExisted(this.btnDoubleLeftDisabledAtSubTab)){
                const element = await this.getFieldType(this.btnDoubleLeftEnabledAtSubTab);
                await element.click();
                await waitUntilHorizontalProgressBarLoaded(this.driverService);
            }
            return true;
        } catch (error) {
            console.log('pressDoubleLeftButtonOnSubList');
            console.log(error);
            return false;
        }
    }
    //#endregion
}