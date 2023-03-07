import { By } from "selenium-webdriver";
import { isBuffer } from "util";
import { BasePage } from "../../../../../core/BasePage";
import { logFailMessage, logFailTestcase, waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";
import { GlobalSortTable } from "../../GlobalPageObject/GlobalSortTable";

export class ChecklistsList extends BasePage {

    private btnCreate = By.xpath(`//*[@id='pgs-create-checklist-btn']`);
    private titleChecklists = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//*[contains(@class,'page-title') and contains(text(),'Checklists')]`);

    public async clickCreateButton() {
        try {
            let btn = await this.getFieldType(this.btnCreate);
            await btn.click();
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true;
        } catch (error) {
            console.log(`clickCreateButton`);
            console.log(error);
            return false;
        }
    }

    public async sortDownCreateDateColumn() {
        try {
            let obj = new GlobalSortTable(this.driverService);
            return await obj.pressSortDownColumnAtMainList("Created date");
        } catch (error) {
            console.log(`sortDownCreateDateColumn`);
            console.log(error);
            return false;
        }
    }

    public async validatePageTitleCheckListExist() {
        try {
            if (await this.driverService.isExisted(this.titleChecklists)) {
                return true;
            } else return false;
        } catch (error) {
            console.log(`validatePageTitleCheckListExist`);
            console.log(error);
            return false;
        }
    }

    //#region validate action buttons
    public async validateEditButtonIsEnabled(positionRow: number = 1) {
        try {
            let btn = By.xpath(`//app-checklist-definition-page//tbody//tr[${positionRow}]//button[@id='pgs-checklist-act-edit']`);
            if (await this.driverService.isExisted(btn)) {
                return true;
            } else return false;
        } catch (error) {
            console.log(`validateEditButtonIsEnabled`);
            console.log(error);
            return false;
        }
    }

    public async validateDeleteButtonIsEnabled(positionRow: number = 1) {
        try {
            let btn = By.xpath(`//app-checklist-definition-page//tbody//tr[${positionRow}]//button[@id='pgs-checklist-act-delete']`);
            if (await this.driverService.isExisted(btn)) {
                return true;
            } else return false;
        } catch (error) {
            console.log(`validateDeleteButtonIsEnabled`);
            console.log(error);
            return false;
        }
    }

    public async validateSendButtonIsEnabled(positionRow: number = 1) {
        try {
            let btn = By.xpath(`//app-checklist-definition-page//tbody//tr[${positionRow}]//button[@id='pgs-checklist-act-send']`);
            if (await this.driverService.isExisted(btn)) {
                return true;
            } else return false;
        } catch (error) {
            console.log(`validateSendButtonIsEnabled`);
            console.log(error);
            return false;
        }
    }

    public async validateCloneButtonIsEnabled(positionRow: number = 1) {
        try {
            let btn = By.xpath(`//app-checklist-definition-page//tbody//tr[${positionRow}]//button[@id='pgs-checklist-act-clone']`);
            if (await this.driverService.isExisted(btn)) {
                return true;
            } else return false;
        } catch (error) {
            console.log(`validateCloneButtonIsEnabled`);
            console.log(error);
            return false;
        }
    }

    //#region press action button
    public async pressEditChecklistButtonByRow(positionRow: number = 1) {
        try {
            let btn = await this.getFieldType(By.xpath(`//app-checklist-definition-page//tbody//tr[${positionRow}]//button[@id='pgs-checklist-act-edit']`));
            await btn.click();
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true;
        } catch (error) {
            console.log(`pressEditChecklistButtonByRow`);
            console.log(error);
            return false;
        }
    }

    public async pressEditChecklistButtonByName(ChecklistName: string) {
        try {
            for (let i = 1; i <= 10; i++) {
                let btn = By.xpath(`//app-checklist-definition-page//tbody//tr[.//a[contains(text(),'${ChecklistName}')]][${i}]//button[@id='pgs-checklist-act-edit']`);
                if (await this.driverService.isExisted(btn)) {
                    await this.driverService.click(btn);
                    await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
                    return true;
                }
            }
            logFailMessage(`Can not find checklist by name ${ChecklistName}`);
            return false;
        } catch (error) {
            console.log(`pressEditChecklistButtonByName`);
            console.log(error);
            return false;
        }
    }
    
    

    public async pressDeleteChecklistButtonByRow(positionRow: number = 1) {
        try {
            let btn = await this.getFieldType(By.xpath(`//app-checklist-definition-page//tbody//tr[${positionRow}]//button[@id='pgs-checklist-act-delete']`));
            await btn.click();
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true;
        } catch (error) {
            console.log(`pressDeleteChecklistButtonByRow`);
            console.log(error);
            return false;
        }
    }

    public async pressDeleteChecklistButtonByName(ChecklistName: string) {
        try {
            for (let i = 1; i <= 10; i++) {
                let btn = By.xpath(`//app-checklist-definition-page//tbody//tr[.//a[contains(text(),'${ChecklistName}')]][${i}]//button[@id='pgs-checklist-act-delete']`);
                if (await this.driverService.isExisted(btn)) {
                    await this.driverService.click(btn);
                    await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
                    return true;
                }
            }
            logFailMessage(`Can not find checklist by name ${ChecklistName}`);
            return false;
        } catch (error) {
            console.log(`pressDeleteChecklistButtonByName`);
            console.log(error);
            return false;
        }
    }

    public async pressSendChecklistButtonByName(ChecklistName: string) {
        try {
            for (let i = 1; i <= 10; i++) {
                let btn = By.xpath(`//app-checklist-definition-page//tbody//tr[.//a[contains(text(),'${ChecklistName}')]][${i}]//button[@id='pgs-checklist-act-send']`);
                if (await this.driverService.isExisted(btn)) {
                    await this.driverService.click(btn);
                    await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
                    return true;
                }
            }
            logFailMessage(`Can not find checklist by name ${ChecklistName}`);
            return false;
        } catch (error) {
            console.log(`pressSendChecklistButtonByName`);
            console.log(error);
            return false;
        }
    }


    public async pressCloneChecklistButtonByRow(positionRow: number = 1) {
        try {
            let btn = await this.getFieldType(By.xpath(`//app-checklist-definition-page//tbody//tr[${positionRow}]//button[@id='pgs-checklist-act-clone']`));
            await btn.click();
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true;
        } catch (error) {
            console.log(`pressCloneChecklistButtonByRow`);
            console.log(error);
            return false;
        }
    }

    public async pressCloneChecklistButtonByName(ChecklistName: string) {
        try {
            for (let i = 1; i <= 10; i++) {
                let btn = By.xpath(`//app-checklist-definition-page//tbody//tr[.//a[contains(text(),'${ChecklistName}')]][${i}]//button[@id='pgs-checklist-act-clone']`);
                if (await this.driverService.isExisted(btn)) {
                    await this.driverService.click(btn);
                    await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
                    return true;
                }
            }
            logFailMessage(`Can not find checklist by name ${ChecklistName}`);
            return false;
        } catch (error) {
            console.log(`pressCloneChecklistButtonByName`);
            console.log(error);
            return false;
        }
    }

    public async pressSendChecklistButtonByRow(positionRow: number = 1) {
        try {
            let btn = await this.getFieldType(By.xpath(`//app-checklist-definition-page//tbody//tr[${positionRow}]//button[@id='pgs-checklist-act-send']`));
            await btn.click();
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true;
        } catch (error) {
            console.log(`presssendChecklistButtonByRow`);
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#endregion

    //#region validate value on checklist list
    public async validateNameValueOnList(expectedValue: string, positionRow: number = 1) {
        try {
            let element = await this.getFieldType(By.xpath(`//app-checklist-definition-page//tbody//tr[${positionRow}]//a`));
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("Validate Name: ", [actualValue, expectedValue, "Incorrect Name!"]);
        } catch (error) {
            console.log(`validateNameValueOnList`);
            console.log(error);
            return false;
        }
    }

    public async validateStatusValueOnList(expectedValue: string, positionRow: number = 1) {
        try {
            let element = await this.getFieldType(By.xpath(`//app-checklist-definition-page//tbody//tr[${positionRow}]//*[contains(@class,'pgs-checklist-definition-status')]//span`));
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("Validate Status: ", [actualValue, expectedValue, "Incorrect Status!"]);
        } catch (error) {
            console.log(`validateStatusValueOnList`);
            console.log(error);
            return false;
        }
    }

    public async validateDeadlineValueOnList(expectedValue: string, positionRow: number = 1) {
        try {
            let element = await this.getFieldType(By.xpath(`//app-checklist-definition-page//tbody//tr[${positionRow}]//*[contains(@class,'pgs-checklist-definition-deadline')]//span`));
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("Validate Deadline: ", [actualValue, expectedValue, "Incorrect Deadline!"]);
        } catch (error) {
            console.log(`validateDeadlineValueOnList`);
            console.log(error);
            return false;
        }
    }

    public async validateTargetGroupValueOnList(expectedValue: string, positionRow: number = 1) {
        try {
            let element = await this.getFieldType(By.xpath(`//app-checklist-definition-page//tbody//tr[${positionRow}]//*[contains(@class,'pgs-checklist-definition-target-group')]//span`));
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("Validate TargetGroup: ", [actualValue, expectedValue, "Incorrect TargetGroup!"]);
        } catch (error) {
            console.log(`validateTargetGroupValueOnList`);
            console.log(error);
            return false;
        }
    }

    public async validateProductValueOnList(expectedValue: string, positionRow: number = 1) {
        try {
            let element = await this.getFieldType(By.xpath(`//app-checklist-definition-page//tbody//tr[${positionRow}]//*[contains(@class,'pgs-checklist-definition-product')]//span`));
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("Validate Product: ", [actualValue, expectedValue, "Incorrect Product!"]);
        } catch (error) {
            console.log(`validateProductValueOnList`);
            console.log(error);
            return false;
        }
    }

    public async validateCreatedDateValueOnList(expectedValue: string, positionRow: number = 1) {
        try {
            let element = await this.getFieldType(By.xpath(`//app-checklist-definition-page//tbody//tr[${positionRow}]//*[contains(@class,'pgs-checklist-definition-created-at')]//span`));
            let actualValue = await element.getValue();
            //Maximize delay time is 7 minutes
            if (actualValue.localeCompare(expectedValue) !== 0) {
                if (Number(expectedValue.substring(14, 16)) - Number(actualValue.substring(14, 16)) < 7) {
                    expectedValue = actualValue;
                }
            }
            return await this.driverService.validateRecord("Validate CreatedDate: ", [actualValue, expectedValue, "Incorrect CreatedDate!"]);
        } catch (error) {
            console.log(`validateCreatedDateValueOnList`);
            console.log(error);
            return false;
        }
    }
    //#endregion

    public async openChecklistDetailByName(checklistName: string) {
        try {
            for (let i = 1; i <= 10; i++) {
                let NameXpath = By.xpath(`//app-checklist-definition-page//tbody//tr[${i}]//a[contains(text(), '${checklistName}')]`);
                if (await this.driverService.isExisted(NameXpath)) {
                    await this.driverService.click(NameXpath);
                    return true;
                }
            }
            logFailMessage(`Can not find the checklist with name '${checklistName}'!`);
            return false;
        } catch (error) {
            console.log(`openChecklistDetailByName`);
            console.log(error);
            return false;
        }
    }

    public async openChecklistDetailByRow(positionRow: number = 1) {
        try {
            let NameXpath = By.xpath(`//app-checklist-definition-page//tbody//tr[${positionRow}]//a`);
            if (await this.driverService.isExisted(NameXpath)) {
                await this.driverService.click(NameXpath);
                return true;
            }
            logFailMessage(`Can not find the checklist on row ${positionRow}'!`);
            return false;
        } catch (error) {
            console.log(`openChecklistDetailByRow`);
            console.log(error);
            return false;
        }
    }



    //#region get value
    public async getNameValueOnList(positionRow: number = 1) {
        try {
            let element = await this.getFieldType(By.xpath(`//app-checklist-definition-page//tbody//tr[${positionRow}]//a`));
            return await element.getValue();
        } catch (error) {
            console.log(`getNameValueOnList`);
            console.log(error);
            return "";
        }
    }

    public async getDeadlineValueOnList(positionRow: number = 1) {
        try {
            let element = await this.getFieldType(By.xpath(`//app-checklist-definition-page//tbody//tr[${positionRow}]//*[contains(@class,'pgs-checklist-definition-deadline')]//span`));
            return await element.getValue();
        } catch (error) {
            console.log(`getDeadlineValueOnList`);
            console.log(error);
            return "";
        }
    }
    //#endregion

}