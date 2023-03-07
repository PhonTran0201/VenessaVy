// generate by MappingPage
import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";
import { ConfirmDialogManager } from "../../../../../core/fields/ConfirmDialogManager";
import { TableManager } from "../../../../../core/fields/TableManager";
import { logWarningMessage, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";
export class CaseTypesList extends BasePage {
    locActable1675845620956columnconfig: By = By.xpath(`//app-case-setting//c-details-tab-layout//div//a[contains(@id,'c-table-1675845620956-column-config')]`);
    locInputpgsfilterdropdownvalue: By = By.xpath(`//app-case-setting//c-details-tab-layout//div//input[contains(@id,'pgs-filter-dropdown-value')]`);
    locNgselectSelectfilter: By = By.xpath(`//app-case-setting//c-details-tab-layout//div//ng-select[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"select filter")]`);
    locButtonCreateCaseType: By = By.xpath(`//app-case-setting//c-details-tab-layout//div//button[contains(@id,'create-pipeline')]`);
    locButtonSearchFilter: By = By.xpath(`//app-case-setting//c-details-tab-layout//div//button[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"search & filter")]`);
    locButtonpgsworklogactiondeletebtn: By = By.xpath(`//app-case-setting//c-details-tab-layout//div//button[contains(@id,'pgs-worklog-action-delete-btn')]`);
    locButtonpgsexpandrowsbtn: By = By.xpath(`//app-case-setting//c-details-tab-layout//div//button[contains(@id,'pgs-expand-rows-btn')]`);
    locLiPrev: By = By.xpath(`//app-case-setting//c-details-tab-layout//div//li[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"prev")]`);
    locLi3: By = By.xpath(`//app-case-setting//c-details-tab-layout//div//li[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"/ 3")]`);
    locLiNext: By = By.xpath(`//app-case-setting//c-details-tab-layout//div//li[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"next")]`);
    locTable: By = By.xpath(`//app-case-setting//c-details-tab-layout//div//div[contains(@class,'table-responsive')]/table`);
    locButtonRefreshCaseTypesList: By = By.xpath(`//app-case-type-list//a//i[contains(@class,"sync")]`)
    locTotalRecords: By = By.xpath(`//c-pagination//*[contains(text(),"Total")]`)

    async clickTblRowActionActable1675845620956columnconfig(value, actionIndex = 0) {
        try {
            let ele = await this.getFieldType(this.locActable1675845620956columnconfig);
            await (ele as TableManager).clickRowActionEleByIndex(value, actionIndex);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputpgsfilterdropdownvalue(value) {
        try {
            let ele = await this.getFieldType(this.locInputpgsfilterdropdownvalue);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setNgselectSelectfilter(value) {
        try {
            let ele = await this.getFieldType(this.locNgselectSelectfilter);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async clickButtonCreateCaseType() {
        try {
            let ele = await this.getFieldType(this.locButtonCreateCaseType);
            await ele.click();
            await this.waitPageProgressCompleted();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async clickButtonSearchFilter() {
        try {
            await this.waitPageLoaded()
            let ele = await this.getFieldType(this.locButtonSearchFilter);
            await ele.click();
            await this.waitPageProgressCompleted();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async clickButtonRefreshCaseTypesList() {
        try {
            await this.waitPageLoaded()
            let ele = await this.getFieldType(this.locButtonRefreshCaseTypesList);
            await ele.click();
            await this.waitPageProgressCompleted();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async clickButtonpgsworklogactiondeletebtn() {
        try {
            let ele = await this.getFieldType(this.locButtonpgsworklogactiondeletebtn);
            await ele.click();
            await this.waitPageProgressCompleted();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async clickButtonpgsexpandrowsbtn() {
        try {
            let ele = await this.getFieldType(this.locButtonpgsexpandrowsbtn);
            await ele.click();
            await this.waitPageProgressCompleted();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    async getTableElement() {
        try {
            let ele = await this.getFieldType(this.locTable);
            return await (ele as TableManager);
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }
    async getTableTotalRecords(): Promise<number> {
        try {
            let ele = await this.getFieldType(this.locTable);
            const count = await (ele as TableManager).getRowCount();
            return count;
        } catch (error) {
            console.log(error);
        }
        return 0;
    }
    async selectTableRowByText(value: string) {
        try {
            let eleTable = await this.getFieldType(this.locTable);
            await (eleTable as TableManager).setCheckboxStateByValue(value);
            return true;
        } catch (error) {
            console.log('selectTableByText');
            console.log(error);
            return false;
        }
    }
    async isTableContainsText(name): Promise<boolean> {
        try {
            let eleTable = await this.getFieldType(this.locTable);
            const ele = await (eleTable as TableManager).findRowElementByValue(name);
            if (!ele) return false;
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async clickButtonEditCaseType(row = 1) {
        try {
            await this.waitPageLoaded()
            let locButtonEditCaseType = By.xpath(`(//app-case-type-list//app-case-type-action//i[contains(@class,"edit")])[${row}]`)
            let ele = await this.getFieldType(locButtonEditCaseType)
            await ele.click()

            return true
        } catch (error) {
            console.log(error);
            return false;
        }

    }
    async clickButtonDeleteCaseType(row = 1) {
        try {
            await this.waitPageLoaded()
            let locButtonEditCaseType = By.xpath(`//app-case-type-list//tbody//tr[${row}]//app-case-type-action//button[contains(@id,"pgs-worklog-action-delete-btn")]`);
            // let ele = await this.getFieldType(locButtonEditCaseType);
            await this.driverService.waitUntilElementLoaded(locButtonEditCaseType);
            await this.driverService.click(locButtonEditCaseType);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            let confirmPage = new ConfirmDialogManager(this.driverService);
            await confirmPage.confirm("Yes");
            await this.waitPageProgressCompleted();
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }

    async validateValueAtCaseTypesList(columnName, expectedValue, row = 1, isUsedForSearch?: boolean) {
        try {
            await this.waitPageLoaded()
            await this.waitPageProgressCompleted()
            let temp = By.xpath("//div");
            switch (columnName) {
                case "CaseTypeCode": {
                    temp = By.xpath(`(//app-case-type-list//c-table//td[contains(@class,"case-type-value")]//span)[${row}]`);
                    break;
                }
                case "CaseTypeName": {
                    temp = By.xpath(`(//app-case-type-list//c-table//td[contains(@class,"case-type-name")]//span)[${row}]`);
                    break;
                }
                case "Workflow": {
                    temp = By.xpath(`(//app-case-type-list//c-table//td[contains(@class,"case-type-workflow")]//span)[${row}]`);
                    break;
                }
                case "Queue": {
                    temp = By.xpath(`(//app-case-type-list//c-table//td[contains(@class,"case-type-queue")]//span)[${row}]`);
                    break;
                }

                default: {
                    logWarningMessage(`Column with name "${columnName}" is NOT found!`);
                    return false;
                }
            }
            await this.driverService.waitUntilElementLoaded(temp);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            const actualValue = await this.driverService.getText(temp);
            if (isUsedForSearch) {
                return await this.driverService.validateRecordUsedForSearch(`Validate column "${columnName}"`,
                    [actualValue, expectedValue, `Incorrect "${columnName}"!`]
                );
            } else {
                return await this.driverService.validateRecord(`Validate column "${columnName}"`, [actualValue, expectedValue, `Incorrect "${columnName}"!`]);
            }
        }
        catch (error) {
            console.log(`validateValueAtCaseTypesList`)
            console.log(error);
            return false
        }
    }
    async getTotalRecords() {
        try {
            await this.waitPageLoaded()
            let ele = await this.getFieldType(this.locTotalRecords)
            let result = await ele.getValue()
            return result.replace(/\D/g, "");
        } catch (error) {
            console.log(error);
            return 0;
        }
    }
}