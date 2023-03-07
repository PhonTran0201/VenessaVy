import { By } from "selenium-webdriver";
import { BasePage } from "../../../../core/BasePage";
import { waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../shared/functions";

export class TelephoneSettings extends BasePage {
    protected txtOrder = By.xpath(`//*[@id='pgs-call-result-order']`); protected txtValue = By.xpath(`//*[@id='pgs-call-result-value']`);
    protected txtName = By.xpath(`//*[@id='call-result-name']`);
    public async verifyTabIsVisibleOrNot(tabName: string, IsVisible: boolean = true) {
        try {
            let xpath = By.xpath(`//c-details-tab-layout//ul[@role='tablist']//li//a[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"${tabName}")]`);
            if (IsVisible) {
                if (await this.driverService.isExisted(xpath)) {
                    return true;
                }
                return false;
            } else {
                if (await this.driverService.isExisted(xpath)) {
                    return false
                }
                return true;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async navigatesToCallResultTab() {
        try {
            let xpath = By.xpath(`//c-details-tab-layout//ul[@role='tablist']//li//a[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"call result")]`);
            let ele = await this.getFieldType(xpath);
            await ele.click();
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true;
        } catch (error) {
            console.log(`navigatesToCallResultTab`);
            console.log(error);
            return false;
        }
    }

    //#region Call result form
    async inputOrder(value: string) {
        try {
            let ele = await this.getFieldType(this.txtOrder);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(`inputOrder`);
            console.log(error);
            return false;
        }
    }

    async inputValue(value: string) {
        try {
            let ele = await this.getFieldType(this.txtValue);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(`inputValue`);
            console.log(error);
            return false;
        }
    }

    async inputName(value: string) {
        try {
            let ele = await this.getFieldType(this.txtName);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(`inputName`);
            console.log(error);
            return false;
        }
    }

    async tickActiveCheckbox(isTicked: boolean = true) {
        try {
            let inputActive = By.xpath(`//*[@id='call-result-is-active']`);
            let spanActive = By.xpath(`//label[./*[@id='call-result-is-active']]//span`);
            if (isTicked) {
                if (await this.driverService.getAttributeValue(inputActive, "checked") == 'false') {
                    await this.driverService.click(spanActive);
                }
                return true;
            } else {
                if (await this.driverService.getAttributeValue(inputActive, "checked") == 'true') {
                    await this.driverService.click(spanActive);
                }
                return true;
            }
        } catch (error) {
            console.log(`tickActiveCheckbox`);
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region Call result list
    async validateName(expectedValue: string, positionRow: number = 0) {
        try {
            let ele = await this.getFieldType(By.xpath(`//app-call-result-list//tbody//td[contains(@id,'column-1-row-${positionRow}')]//span`));
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord(`validate Name`, [actualValue, expectedValue, 'Incorrect value!']);
        } catch (error) {
            console.log(`validateName`);
            console.log(error);
            return false;
        }
    }

    async validateOder(expectedValue: string, positionRow: number = 0) {
        try {
            let ele = await this.getFieldType(By.xpath(`//app-call-result-list//tbody//td[contains(@id,'column-2-row-${positionRow}')]//span`));
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord(`validate Order`, [actualValue, expectedValue, 'Incorrect value!']);
        } catch (error) {
            console.log(`validateOder`);
            console.log(error);
            return false;
        }
    }


    async validateValue(expectedValue: string, positionRow: number = 0) {
        try {
            let ele = await this.getFieldType(By.xpath(`//app-call-result-list//tbody//td[contains(@id,'column-3-row-${positionRow}')]//span`));
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord(`validate Value`, [actualValue, expectedValue, 'Incorrect value!']);
        } catch (error) {
            console.log(`validateValue`);
            console.log(error);
            return false;
        }
    }

    async validateActiveCheckbox(isChecked: boolean = true, positionRow: number = 0) {
        try {
            let ele = By.xpath(`//app-call-result-list//tbody//td[contains(@id,'column-4-row-${positionRow}')]//input`);
            if (isChecked) {
                if (await this.driverService.getAttributeValue(ele, "checked") == "true") {
                    return true;
                } else return false;
            } else {
                if (await this.driverService.getAttributeValue(ele, "checked") == "true") {
                    return false;
                } else return true;
            }
        } catch (error) {
            console.log(`validateActiveCheckbox`);
            console.log(error);
            return false;
        }
    }
    //#endregion

    async editCallResultByRow(positionRow: number = 0) {
        try {
            let ele = await this.getFieldType(By.xpath(`//app-call-result-list//tbody//td[contains(@id,'column-0-row-${positionRow}')]//button[./i[contains(@class,'fa-edit')]]`));
            await ele.click();
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true;
        } catch (error) {
            console.log(`editCallResultByRow`);
            console.log(error);
            return false;
        }
    }
}