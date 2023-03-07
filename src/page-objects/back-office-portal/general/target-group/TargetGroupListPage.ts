import { By } from "selenium-webdriver";
import { BasePage } from "../../../../core/BasePage";
import { ConfirmDialogManager } from "../../../../core/fields/ConfirmDialogManager";
import { DebugElement } from "../../../../core/fields/DebugElement";
import { FieldWait } from "../../../../core/fields/FieldWait";
import { TableManager } from "../../../../core/fields/TableManager";
import { waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../shared/functions";

export class TargetGroupListPage extends BasePage {

    locBtnCreate: By = By.css("c-page-layout .btn.btn-primary-light");
    locMenuAccount: By = By.xpath("//div[@class='collapse navbar-collapse']//a[@id='navbar-NAVIGATION_ACCOUNTS']");
    locMenuItemTargetGroups: By = By.xpath("//div[@class='dropdown']//a[@title='Target groups']");

    locBtnSearchFilter: By = By.xpath("//button[contains(.,'Search & Filter')]");
    locTable = By.css(".table.c-table.table-striped.table-hover");

    async accessTargetGroup() {
        await this.waitPageLoaded();
        await this.clickAccount();
        await this.clickTargetGroup();
        await this.waitPageLoaded();
        await this.waitPageProgressCompleted();
    }

    private async clickAccount() {
        const menuAccount = await this.getFieldType(this.locMenuAccount);
        await menuAccount.click();
        await this.waitForAnyPopupDisplayed();
    }

    private async clickTargetGroup() {
        const menuMenuItemTargetGroups = await this.getFieldType(this.locMenuItemTargetGroups);
        await menuMenuItemTargetGroups.click();
        await this.waitPageProgressCompleted();
    }

    async clickCreate() {
        const btnCreate = await this.getFieldType(this.locBtnCreate);
        await btnCreate.click();
        await this.waitForModalPopupDisplayed();
    }

    async check() {
        return false;
    }

    async editCreated(itemName) {
        await this.driverService.waitUntilElementLoaded(By.xpath(`//table//tbody//tr[1]`));
        await this.driverService.waitUntilElementLoaded(By.xpath(`//*[@id='pgs-target-group-edit-btn']`));
        let eleTable = await this.getFieldType(this.locTable);
        await (eleTable as TableManager).clickRowActionEleByIndex(itemName, 0);
    }

    async deleteCreated(itemName) {
        let eleTable = await this.getFieldType(this.locTable);
        await (eleTable as TableManager).clickRowActionEleByIndex(itemName, 2);
        const confirmDialog = new ConfirmDialogManager(this.driverService);
        await confirmDialog.confirm("Yes");
        await this.waitPageProgressCompleted();
    }

    async exportCreated(itemName) {
        await this.driverService.waitUntilElementLoaded(By.xpath(`//table//tbody//tr[1]`));
        await this.driverService.waitUntilElementLoaded(By.xpath(`//*[@id='pgs-target-group-edit-btn']`));
        let eleTable = await this.getFieldType(this.locTable);
        await (eleTable as TableManager).clickRowActionEleByIndex(itemName, 1);
    }

    async clickDownloadExportFile() {
        try {
            const locDownloadLink = By.xpath(`//*[@id="toast-container"]/div/div/a`);
            const ele = await this.getFieldType(locDownloadLink);
            await ele.click();
            await this.waitPageProgressCompleted();
            // download from server are quite slow
            await this.driverService.getDriver().sleep(30000); // sometimes download are too slow to full value
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async accessTargetGroupSearch() {
        try {
            const eleSearch = await this.getFieldType(this.locBtnSearchFilter);
            await eleSearch.click();
            await this.waitForAppear(By.xpath(`//app-target-group-filter`));
        } catch (error) {
            return false;
        }
    }

    async getTotalRecords(): Promise<number> {
        try {
            let eleTable = await this.getFieldType(this.locTable);
            const count = await (eleTable as TableManager).getRowCount();
            return count;
        } catch (error) {
            console.log(error);
        }
        return 0;
    }

    async hasRecord(value): Promise<boolean> {
        try {
            let eleTable = await this.getFieldType(this.locTable);
            const foundEle = await (eleTable as TableManager).findRowElementByValue(value);
            if (!foundEle) return false;
            return true;
        } catch (error) {
            console.log(error);
        }
        return false;
    }


    async contains(name): Promise<boolean> {
        try {
            await this.waitPageLoaded();
            await this.waitPageProgressCompleted();
            let eleTable = await this.getFieldType(this.locTable);
            const ele = await (eleTable as TableManager).findRowElementByValue(name);
            //await DebugElement.getInstance().dump(ele);
            if (!ele) return false;
            return true;
        } catch (error) {
            console.log(error);
        }
        return false;
    }

    async hasNoData(): Promise<boolean> {
        try {
            let eleTable = await this.getFieldType(this.locTable);
            const result = await (eleTable as TableManager).hasNodata();
            return result;
        } catch (error) {
            console.log(error);
        }
        return false;
    }

    public async openTargetGroup(name){
        try {
            await this.waitPageLoaded();
            await this.waitPageProgressCompleted();
            let xpath = By.xpath(`(//app-target-group-list//tbody//a[contains(text(),'${name}')])[1]`)
            // let element = await this.getFieldType(xpath);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService)
            await this.driverService.click(xpath)
            //await DebugElement.getInstance().dump(ele);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService)
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}