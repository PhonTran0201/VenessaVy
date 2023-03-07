import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";
import { DropdownFieldManager } from "../../../../../core/fields/DropdownFieldManager";
import { waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";


export class AccountAddTargetGroupPage extends BasePage {
    locDrpTargetGroup: By = By.xpath(`//app-target-group-account-form//div[contains(@class,'ng-select-container')]`);
    locBtnAdd: By = By.xpath("//button[@id='pgs-target-group-save-btn']");
    locBtnCancel: By = By.xpath("//button[@id='pgs-target-group-cancel-btn']");

    async selectTargetGroup(value): Promise<void> {
        let ele = await this.getFieldType(this.locDrpTargetGroup);
        await ele.click();
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService,3000);
        await (ele as DropdownFieldManager).setValue(value);
    }

    async clickAdd(): Promise<void> {
        const ele = await this.getFieldType(this.locBtnAdd);
        await ele.click();
        await this.waitPageProgressCompleted();
    }

    async clickCancel(): Promise<void> {
        const ele = await this.getFieldType(this.locBtnCancel);
        await ele.click();
    }
}