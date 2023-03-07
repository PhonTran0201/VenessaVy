import { By } from "selenium-webdriver";
import { BasePage } from "../../../../core/BasePage";
import { ConfirmDialogManager } from "../../../../core/fields/ConfirmDialogManager";
import { FieldWait } from "../../../../core/fields/FieldWait";
import { waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../shared/functions";

export class TargetGroupDetailPage extends BasePage {

    private btnExport = By.xpath(`//*[@id='pgs-left-side-export-target-btn']`);
    private btnExportHistory = By.xpath(`//*[@id='pgs-target-group-export-history']`);

    public async validateFullNameByRow(FullName: string, positionRow: number = 1) {
        try {
            let element = await this.getFieldType(FieldWait.xpathForContainsText(`//app-target-group-members//tbody//tr[${positionRow}]//a`, FullName));
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("Validate Full Name", [actualValue, FullName, 'Incorrect Full Name!']);
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    public async pressExportCustomerButton() {
        try {
            let element = await this.getFieldType(this.btnExport);
            await element.click();
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true;
        } catch (error) {
            console.log(`pressExportCustomerButton`);
            console.log(error);
            return false;
        }
    }

    public async pressExportHistoryButton() {
        try {
            let element = await this.getFieldType(this.btnExportHistory);
            await element.click();
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true;
        } catch (error) {
            console.log(`pressExportHistoryButton`);
            console.log(error);
            return false;
        }
    }

    public async pressDeleteCustomerButtonByRow(positionRow: number = 1) {
        try {
            let element = await this.getFieldType(By.xpath(`//app-target-group-members//tbody//tr[${positionRow}]//button[@id='pgs-t-group-member-del-btn']`));
            await element.click();
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            let ele = new ConfirmDialogManager(this.driverService);
            await ele.confirm(`yes`);
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true;
        } catch (error) {
            console.log(`pressDeleteCustomerButtonByRow`);
            console.log(error);
            return false;
        }
    }
    public async validateNotFoundCustomerAfterDelete(){
        try {
            let element = By.xpath(`//app-target-group-members//tbody//img[@src='./assets/images/no-data.png']`);
            if(await this.driverService.isExisted(element)){
                return true;
            }else{
                return false;
            }
        } catch (error) {
            console.log(`validateNotFoundCustomerAfterDelete`);
            console.log(error);
            return false
        }
    }
}