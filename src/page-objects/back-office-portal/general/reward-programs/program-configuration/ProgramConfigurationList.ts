import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";
import { ConfirmDialogManager } from "../../../../../core/fields/ConfirmDialogManager";
import { TableManager } from "../../../../../core/fields/TableManager";
import { waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";
import { GlobalPageObject } from "../../GlobalPageObject/GlobalPageObject";
import { GlobalPagination } from "../../GlobalPageObject/GlobalPagination";

export class ProgramConfigurationList extends BasePage {


    private ProgramTab = By.xpath(`//app-loyalty-page//a[@title='Programs']`);
    private btnCreate = By.xpath(`//button[@id='create-program-dropdown']`);
    private btnRemovePrograms = By.xpath(`//app-program-list//*[@id='delete-program-dropdown' and not (@disabled)]`);

    public async navigateToProgramsTab() {
        try {
            let element = await this.getFieldType(this.ProgramTab);
            await element.click();
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true;
        } catch (error) {
            console.log(`navigateToProgramsTab`);
            console.log(error);
            return false;
        }
    }
    public async clickCreateButton() {
        try {
            if (!await this.driverService.isExisted(By.xpath(`//app-program-form`))) {
                let element = await this.getFieldType(this.btnCreate);
                await element.click();
                await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            }
            return true;
        } catch (error) {
            console.log(`clickCreateButton`);
            console.log(error);
            return false;
        }
    }

    public async clickRemoveProgramsButton() {
        try {
            let element = await this.getFieldType(this.btnRemovePrograms);
            await element.click();
            const confirmDialog = new ConfirmDialogManager(this.driverService);
            await confirmDialog.confirm("Yes");
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true;
        } catch (error) {
            console.log(`clickRemoveProgramsButton`);
            console.log(error);
            return false;
        }
    }
    //#region action button
    public async clickEditButtonByRow(positionRow: number = 1) {
        try {
            let element = await this.getFieldType(By.xpath(`//app-program-list//tbody//tr[${positionRow}]//button[./i[contains(@class,'fa-edit')]]`));
            await element.click();
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true
        } catch (error) {
            console.log(`clickEditButtonByRow`);
            console.log(error);
            return false;
        }
    }

    public async clickEditButtonByProgramName(ProgramName: string) {
        try {
            let element = await this.getFieldType(By.xpath(`//app-program-list//tbody//tr[.//span[contains(@title,'${ProgramName}')]][1]//button[./i[contains(@class,'fa-edit')]]`));
            await element.click();
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true
        } catch (error) {
            console.log(`clickEditButtonByProgramName`);
            console.log(error);
            return false;
        }
    }

    public async clickDeleteButtonByRow(positionRow: number = 1) {
        try {
            let element = await this.getFieldType(By.xpath(`//app-program-list//tbody//tr[${positionRow}]//button[@id='pgs-worklog-action-delete-btn']`));
            await element.click();
            const confirmDialog = new ConfirmDialogManager(this.driverService);
            await confirmDialog.confirm("Yes");
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true
        } catch (error) {
            console.log(`clickDeleteButtonByRow`);
            console.log(error);
            return false;
        }
    }

    public async clickDeleteButtonByProgramName(ProgramName: string) {
        try {
            let element = await this.getFieldType(By.xpath(`//app-program-list//tbody//tr[.//span[contains(@title,'${ProgramName}')]][1]//button[@id='pgs-worklog-action-delete-btn']`));
            await element.click();
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true
        } catch (error) {
            console.log(`clickDeleteButtonByProgramName`);
            console.log(error);
            return false;
        }
    }

    public async clickDeleteProgramExistedOnList(ProgramName: string) {
        try {
            let xpathProgramName = By.xpath(`//app-program-list//table//tbody//tr[.//span[contains(@title,'${ProgramName}')]][1]`);
            for (let i = 1; i <= 10; i++) {
                if (await this.driverService.isExisted(xpathProgramName)) {
                    let row = parseInt(await this.driverService.getAttributeValue(xpathProgramName, "rowIndex"));
                    await this.clickDeleteButtonByRow(row);
                    let page = new GlobalPageObject(this.driverService);
                    await page.reloadTable();
                };
            }
            return true
        } catch (error) {
            console.log(`clickDeleteProgramExistedOnList`);
            console.log(error);
            return false;
        }
    }

    public async tickProgramCheckboxRemoveByRow(PositionRow: number = 1) {
        try {
            let checkboxValue = By.xpath(`//app-program-list//tbody//tr[${PositionRow}]//input[@type='checkbox']`);
            let checkbox = By.xpath(`//app-program-list//tbody//tr[${PositionRow}]//span[@class='check']`);
            if (await this.driverService.getAttributeValue(checkboxValue, 'checked') != 'true') {
                await this.driverService.click(checkbox);
            }
            return true;
        } catch (error) {
            console.log(`tickProgramCheckboxRemoveByRow`);
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region validate value on list
    public async validateValueOnList(expectedValue: string, positionRow: number = 1) {
        try {
            let element = await this.getFieldType(By.xpath(`//app-program-list//tbody//tr[${positionRow}]//span[contains(text(),'${expectedValue}')]`));
            let actualValue = await element.getValue();
            return this.driverService.validateRecord(`Validate '${expectedValue}' Value in list: `, [actualValue, expectedValue, 'Incorrect Value!']);
        } catch (error) {
            console.log(`validateValueOnList`);
            console.log(error);
            return false;
        }
    }

    public async validateProgrameNameNotShowOnList(expectedValue: string, positionRow: number = 1) {
        try {
            let ProgramNameXpath = By.xpath(`//app-program-list//tbody//tr[${positionRow}]//span[contains(text(),'${expectedValue}')]`);
            if (await this.driverService.isExisted(ProgramNameXpath)) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(`validateProgrameNameNotShowOnList`);
            console.log(error);
            return false;
        }
    }


    //#endregion
}