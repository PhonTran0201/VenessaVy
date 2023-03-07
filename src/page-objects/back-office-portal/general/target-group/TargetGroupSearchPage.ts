import { By } from "selenium-webdriver";
import { BasePage } from "../../../../core/BasePage";
import { ConfirmDialogManager } from "../../../../core/fields/ConfirmDialogManager";
import { TableManager } from "../../../../core/fields/TableManager";

export class TargetGroupSearchPage extends BasePage {

    // form search
    locBtnSearch: By = By.xpath("//app-target-group-filter//button[contains(.,'Search')]");
    locBtnClear: By = By.xpath("//app-target-group-filter//button[contains(.,'Clear')]");
    locBtnSave: By = By.xpath("//app-target-group-filter//button[contains(.,'Save')]");
    loctxtName: By = By.xpath("//app-target-group-filter//input");
    locBtnClose: By = By.xpath("//app-target-group-filter//button[contains(@class,'close')]/i");
    
    private async clickBtnSearch() {
        const ele = await this.getFieldType(this.locBtnSearch);
        await ele.click();
        await this.waitPageProgressCompleted();
    }

    private async clickBtnClear() {
        const ele = await this.getFieldType(this.locBtnClear);
        await ele.click();
        await this.waitPageProgressCompleted();
    }

    private async clickBtnSave() {
        const ele = await this.getFieldType(this.locBtnSave);
        await ele.click();
        //await wait for popup displays
        // const confirmDialog = new ConfirmDialogManager(this.driverService);
        // await confirmDialog.confirm("Save");
        // await this.waitPageProgressCompleted();
    }

    private async clickBtnClose() {
        const ele = await this.getFieldType(this.locBtnClose);
        await ele.click();
        // await this.waitForDisappear(By.xpath(`//app-target-group-filter`));
    }

    private async inputName(value) {
        const ele = await this.getFieldType(this.loctxtName);
        await ele.setValue(value);
    }

    async searchTargetGroup(name) {
        try {
            await this.inputName(name);
            await this.clickBtnSearch();
            await this.waitPageProgressCompleted();
            await this.clickBtnClose();
        } catch (error) {
            return false;
        }
    }

    async clearSearch() {
        try {
            await this.clickBtnClear();
            await this.waitPageProgressCompleted();
            await this.clickBtnClose();
        } catch (error) {
            return false;
        }
    }
}