import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../../../core/BasePage";
import { TableManager } from "../../../../../../../core/fields/TableManager";
import { logFailMessage, logSuccessMessage, waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../../../shared/functions";
import { GlobalSortTable } from "../../../../GlobalPageObject/GlobalSortTable";

export class AccountTabChecklistList extends BasePage {

    protected strRootXpath = "//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]";
    private txtSearch = By.xpath(`${this.strRootXpath}//app-checklist-list-widget//input[@placeholder="Search"]`);
    protected checklistBtnTab = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//*[@id='pgs-acc-tab-Checklists']`)


    public async getIDofTheAccount(){
        try {
            let location = await this.driverService.getCurrentUrl();
            let start = location.lastIndexOf("id=")+3;
            let end =  location.indexOf("&tab") ;
            let result = end > 0 ? location.substring(start,end) : location.substring(start);
            return result
        } catch (error) {
            console.log("getIDofTheAccount");
            console.log(error);
            return "";
        }
    }
    logFailTes
    public async valiateChecklistTabIsNotVisible() {
        try {
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            if (await this.driverService.isExisted(this.checklistBtnTab)) {
                return false;
            }
            return true;
        } catch (error) {
            console.log(`valiateChecklistTabIsNotVisible`);
            console.log(error);
            return false;
        }
    }
    public async searchChecklistByValue(searchName: string) {
        try {
            let element = await this.getFieldType(this.txtSearch);
            await element.setValue(searchName);
            await element.pressEnter();
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true;
        } catch (error) {
            console.log(`searchChecklistByInsuredObject`);
            console.log(error);;
            return false;
        }
    }

    public async validateSearchingChecklistByInsuredObjectNotFound() {
        try {
            const locTable = By.xpath(`${this.strRootXpath}//table`);
            let eleTable = await this.getFieldType(locTable);
            return await (eleTable as TableManager).hasNodata();
        } catch (error) {
            console.log(`validateSearchingChecklistByInsuredObjectNotFound`);
            console.log(error);
            return false;
        }
    }

    public async validateNameValue(expectedValue: string, positionRow: number = 1) {
        try {
            let xpath = By.xpath(`${this.strRootXpath}//tbody//tr[${positionRow}]//app-checklist-name//a`);
            let element = await this.getFieldType(xpath);
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("Validate Name value", [actualValue, expectedValue, "Incorrect Value!"]);
        } catch (error) {
            console.log(`validateNameValue`);
            console.log(error);
            return false;
        }
    }

    public async validateValue(expectedValue: string, positionRow: number = 1) {
        try {
            let xpath = By.xpath(`${this.strRootXpath}//tbody//tr[${positionRow}]//td//span[contains(text(),'${expectedValue}')]`);
            if (await this.driverService.isExisted(xpath)) {
                return true;
            }
            return false;
        } catch (error) {
            console.log(`validateValue`);
            console.log(error);
            return false;
        }
    }

    public async getDeadlineValueByRow(positionRow: number = 1) {
        try {
            let xpath = By.xpath(`${this.strRootXpath}//tbody//tr[${positionRow}]//td[3]//span`);
            let element = await this.getFieldType(xpath);
            let actualValue = await element.getValue();
            return actualValue;
        } catch (error) {
            console.log(`getDeadlineValueByRow`);
            console.log(error);
            return "";
        }
    }


    public async pressOpenDropdownConfigColumnButton() {
        try {
            let element = await this.getFieldType(By.xpath(`${this.strRootXpath}//app-checklist-list-widget//i[@title='Column config']`));
            await element.click();
            return true;
        } catch (error) {
            console.log((`pressOpenDropdownConfigColumnButton`));
            console.log(error);
            return false;
        }
    }

    public async tickToConfigColumnByColumnName(ColumnName: string) {
        try {
            let checkboxColumn = By.xpath(`//div[@class='dropdown']//label[./span[text()='${ColumnName}']]//span[@class='check']`);
            let inputcheckboxColumn = By.xpath(`//div[@class='dropdown']//label[./span[text()='${ColumnName}']]//input`);
            await this.driverService.waitUntilElementLoaded(checkboxColumn);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            if (!(await this.driverService.getAttributeValue(inputcheckboxColumn, "checked") === 'true')) {
                await this.driverService.click(checkboxColumn);
            }
            return true;
        } catch (error) {
            console.log('tickToConfigColumnByColumnName');
            console.log(error);
            return false;
        }
    }


    public async UnTickToConfigColumnByColumnName(ColumnName: string) {
        try {
            let checkboxColumn = By.xpath(`//div[@class='dropdown']//label[./span[text()='${ColumnName}']]//span[@class='check']`);
            let inputcheckboxColumn = By.xpath(`//div[@class='dropdown']//label[./span[text()='${ColumnName}']]//input`);
            await this.driverService.waitUntilElementLoaded(checkboxColumn);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            if (await this.driverService.getAttributeValue(inputcheckboxColumn, "checked") === 'true') {
                await this.driverService.click(checkboxColumn);
            }
            return true;
        } catch (error) {
            console.log('UnTickToConfigColumnByColumnName');
            console.log(error);
            return false;
        }
    }


    public async validateTitleColumnIsVisibleByColumnName(ColumnName: string) {
        try {
            let Column = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//th//span[contains(text(),'${ColumnName}')]`);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            if (await this.driverService.isExisted(Column)) {
                logSuccessMessage(`validate ${ColumnName} Column is visible: Test passed!`);
                return true;
            }
            logFailMessage(`validate ${ColumnName} Column is visible: Test failed!`);
            return false;
        } catch (error) {
            console.log(`validateTitleColumnIsVisibleByColumnName`);
            console.log(error);
            return false;
        }
    }


    public async validateTitleColumnIsNotVisibleByColumnName(ColumnName: string) {
        try {
            let Column = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//th/div/span[contains(text(),'${ColumnName}')]`);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            if (!await this.driverService.isExisted(Column)) {
                logSuccessMessage(`validate ${ColumnName} Column is not visible: Test passed!`);
                return true;
            }
            logFailMessage(`validate ${ColumnName} Column is not visible: Test failed!`);
            return false;
        } catch (error) {
            console.log(`validateTitleColumnIsNotVisibleByColumnName`);
            console.log(error);
            return false;
        }
    }



    public async sortDownDeadlineColumn() {
        try {
            let obj = new GlobalSortTable(this.driverService);
            return await obj.pressSortDownColumnAtSubList("Deadline");
        } catch (error) {
            console.log(`sortDownDeadlineColumn`);
            console.log(error);
            return false;
        }
    }

    public async sortUpDeadlineColumn() {
        try {
            let obj = new GlobalSortTable(this.driverService);
            return await obj.pressSortUpColumnAtSubList("Deadline");
        } catch (error) {
            console.log(`sortUpDeadlineColumn`);
            console.log(error);
            return false;
        }
    }

    public async openChecklistFormByRow(positionRow: number = 1) {
        try {
            let xpath = By.xpath(`${this.strRootXpath}//tbody//tr[${positionRow}]//app-checklist-name//a`);
            let element = await this.getFieldType(xpath);
            await element.click();
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true;
        } catch (error) {
            console.log(`openChecklistFormByRow`);
            console.log(error);
            return false;
        }
    }
}