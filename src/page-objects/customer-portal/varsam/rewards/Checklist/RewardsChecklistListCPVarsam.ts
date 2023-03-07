import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";
import { waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";
import { GlobalSortTableCPVarsam } from "../../global-page-object/GlobalSortTableCPVarsam";

export class RewardsChecklistListCPVarsam extends BasePage {
    tabChecklist: By = By.xpath(`//app-reward/div/ul[@id= 'pills-tab']//*[@id= 'checklist-tab']`);
    reloadTable: By = By.xpath(`//app-checklist//a[contains(@class,'page-link') and .//i[contains(@class,'fa-refresh')]]`);

    public async navigateToChecklistTab() {
        try {
            let element = await this.getFieldType(this.tabChecklist);
            await element.click();
            return true;
        } catch (error) {
            console.log(`navigateToChecklistTab`);
            console.log(error);
            return false;
        }
    }

    public async openChecklistFormByRow(row: number = 1) {
        try {
            let element = await this.getFieldType(By.xpath(`//app-checklist//table//tbody//tr[${row}]//app-checklist-name-col//a`));
            await element.click();
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true;
        } catch (error) {
            console.log(`openChecklistFormByRow`);
            console.log(error);
            return false;
        }
    }

    public async validateNameChecklistValue(expectedValue: string, positionRow: number = 1) {
        try {
            let element = By.xpath(`//app-checklist//table//tbody//tr[${positionRow}]//app-checklist-name-col//strong`);
            let actualValue = await this.driverService.getText(element);
            return await this.driverService.validateRecord(`Validate name value: `, [actualValue, expectedValue, 'Incorrect Value!']);
        } catch (error) {
            console.log(`validateNameChecklistValue`);
            console.log(error);
            return false;
        }
    }

    public async validateDeadlineChecklistValue(expectedValue: string, positionRow: number) {
        try {
            let element = await this.getFieldType(By.xpath(`//app-checklist//table//tbody//tr[${positionRow}]//app-checklist-deadline-col/span`));
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord(`Validate Deadline value: `, [actualValue, expectedValue, 'Incorrect Value!']);
        } catch (error) {
            console.log(`validateDeadlineChecklistValue`);
            console.log(error);
            return false;
        }
    }

    public async validateStatusChecklistValue(expectedValue: string, positionRow: number) {
        try {
            let element = await this.getFieldType(By.xpath(`//app-checklist//table//tbody//tr[${positionRow}]//app-checklist-status-act-col//span`));
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord(`Validate Status value: `, [actualValue, expectedValue, 'Incorrect Value!']);
        } catch (error) {
            console.log(`validateStatusChecklistValue`);
            console.log(error);
            return false;
        }
    }


    public async reloadChecklistTable() {
        try {
            let element = await this.getFieldType(this.reloadTable);
            await element.click();
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true;
        } catch (error) {
            console.log(`reloadChecklistTable`);
            console.log(error);
            return false;
        }
    }

    public async sortDownDeadlineColumn() {
        try {
            let obj = new GlobalSortTableCPVarsam(this.driverService);
            return await obj.pressSortDownColumnAtMainList("Deadline by ");
        } catch (error) {
            console.log(`sortDownDeadlineColumn`);
            console.log(error);
            return false;
        }
    }

    public async sortUpDeadlineColumn() {
        try {
            let obj = new GlobalSortTableCPVarsam(this.driverService);
            return await obj.pressSortUpColumnAtMainList("Deadline by ");
        } catch (error) {
            console.log(`sortUpDeadlineColumn`);
            console.log(error);
            return false;
        }
    }

    public async validateDisablingWhenOpenChecklistFormByRow(row:number = 1){
        try {
            let elementCanClick = By.xpath(`//app-checklist//table//tbody//tr[${row}]//app-checklist-name-col/a`);
            let elementCanNotClick = By.xpath(`//app-checklist//table//tbody//tr[${row}]//app-checklist-name-col/strong`);
            if(await this.driverService.isExisted(elementCanClick)){
                return false;
            }if(!await this.driverService.isExisted(elementCanNotClick)){
                return false;
            }
            return true;
        } catch (error) {
            console.log(`validateDisablingWhenOpenChecklistFormByRow`);
            console.log(error);
            return false;
        }
    }


    public async getDeadlineChecklistValue(positionRow: number) {
        try {
            let element = await this.getFieldType(By.xpath(`//app-checklist//table//tbody//tr[${positionRow}]//app-checklist-deadline-col/span`));
            return await element.getValue();
        } catch (error) {
            console.log(`getDeadlineChecklistValue`);
            console.log(error);
            return "";
        }
    }

}