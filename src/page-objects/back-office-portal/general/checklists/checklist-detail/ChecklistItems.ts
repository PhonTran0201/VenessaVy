import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";
import { logFailMessage, logInfoMessage, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";

export class ChecklistsItems extends BasePage {

    protected strRootXpath = "//div[contains(@class,'tab-pane') and contains(@class,'active')]";

    private titleAddChecklistItem = By.xpath(`//app-checklist-definition-item-form//*[contains(@class, 'modal-title') and contains(text(),'checklist item')]`);
    private btnCreate = By.xpath(`${this.strRootXpath}//*[@id='pgs-create-checklist-item-btn']`);
    private txtName = By.xpath(`//app-checklist-definition-item-form//*[@id = 'pgs-checklist-form-name']`);
    private txtDescription = By.xpath(`//app-checklist-definition-item-form//*[@id = 'pgs-checklist-form-description']`);


    public async pressCreateButton() {
        try {
            let element = await this.getFieldType(this.btnCreate);
            await element.click();
            return true;
        } catch (error) {
            console.log('pressCreateButton');
            console.log(error);
            return false;
        }
    }
    //#region region checklistsItems form
    public async inputNameOnChecklist(inputValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.titleAddChecklistItem);
            let element = await this.getFieldType(this.txtName);
            await element.setValue(inputValue)
            return true;
        } catch (error) {
            console.log(`inputNameOnChecklist`)
            console.log(error)
            return false;
        }
    }

    public async inputDescriptionOnChecklist(inputValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.titleAddChecklistItem);
            let element = await this.getFieldType(this.txtDescription);
            await element.setValue(inputValue)
            return true;
        } catch (error) {
            console.log(`inputDescriptionOnChecklist`)
            console.log(error)
            return false;
        }
    }


    //#endregion

    //#region validate value on the list
    public async validateNameItemsValueByRow(expectedValue: string, positionRow: number = 1) {
        try {
            let element = await this.getFieldType(By.xpath(`${this.strRootXpath}//app-checklist-definition-items//tbody//tr[${positionRow}]//td[2]//span`));
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("Validate Name Items: ", [actualValue, expectedValue, "Incorrect Value!"]);
        } catch (error) {
            console.log('validateNameItemsValueByRow');
            console.log(error);
            return false;
        }
    }

    public async validateDescriptionItemsValueByRow(expectedValue: string, positionRow: number = 1) {
        try {
            let element = await this.getFieldType(By.xpath(`${this.strRootXpath}//app-checklist-definition-items//tbody//tr[${positionRow}]//td[3]//span`));
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("Validate Description Items: ", [actualValue, expectedValue, "Incorrect Value!"]);
        } catch (error) {
            console.log('validateDescriptionItemsValueByRow');
            console.log(error);
            return false;
        }
    }

    public async validateEditActionButtonIsEnabledByRow(positionRow: number = 1) {
        try {
            let btnXpath = By.xpath(`${this.strRootXpath}//app-checklist-definition-items//tbody//tr[${positionRow}]//*[@id='pgs-checklist-act-edit']`);
            logInfoMessage(`Validating edit action button...`);
            if (await this.driverService.isExisted(btnXpath)) {
                return true;
            } else return false;
        } catch (error) {
            console.log('validateEditActionButtonIsEnabledByRow');
            console.log(error);
            return false;
        }
    }

    public async validateDeleteActionButtonIsEnabledByRow(positionRow: number = 1) {
        try {
            let btnXpath = By.xpath(`${this.strRootXpath}//app-checklist-definition-items//tbody//tr[${positionRow}]//*[@id='pgs-checklist-act-delete']`);
            logInfoMessage(`Validating delete action button...`);
            if (await this.driverService.isExisted(btnXpath)) {
                return true;
            } else return false;
        } catch (error) {
            console.log('validateDeleteActionButtonIsEnabledByRow');
            console.log(error);
            return false;
        }
    }

    //#endregion

    public async pressEditActionButtonByName(ItemName: string) {
        try {
            for (let i = 1; i <= 10; i++) {
                let btnXpath = By.xpath(`${this.strRootXpath}//app-checklist-definition-items//tbody//tr[.//*[contains(text(),'${ItemName}')]][${i}]//*[@id='pgs-checklist-act-edit']`);
                if (await this.driverService.isExisted(btnXpath)) {
                    await this.driverService.click(btnXpath);
                    await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
                    return true;
                }
            }
            logFailMessage(`Can not find Item with name ${ItemName}`);
            return false;
        } catch (error) {
            console.log('pressEditActionButtonByName');
            console.log(error);
            return false;
        }
    }


    public async pressDeleteActionButtonByName(ItemName: string) {
        try {
            for (let i = 1; i <= 10; i++) {
                let btnXpath = By.xpath(`${this.strRootXpath}//app-checklist-definition-items//tbody//tr[.//*[contains(text(),'${ItemName}')]][${i}]//*[@id='pgs-checklist-act-delete']`);
                if (await this.driverService.isExisted(btnXpath)) {
                    await this.driverService.click(btnXpath);
                    await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
                    return true;
                }
            }
            logFailMessage(`Can not find Item with name ${ItemName}`);
            return false;
        } catch (error) {
            console.log('pressDeleteActionButtonByName');
            console.log(error);
            return false;
        }
    }

}