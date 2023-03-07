import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";
import { ConfirmDialogManager } from "../../../../../core/fields/ConfirmDialogManager";
import { logFailMessage, waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";


export class RewardConfigurationList extends BasePage {
    private tabRewards = By.xpath(`//*[@id='pgs-acc-tab-Rewards']`);
    private btnCreate = By.xpath(`//*[@id='create-reward-dropdown']`);
    private btnRemove = By.xpath(`//*[@id='delete-reward-dropdown' and not (@disabled)]`);
    private btnRemoveDisabled = By.xpath(`//*[@id='delete-reward-dropdown' and (@disabled)]`);
    public async navigateToRewardTab() {
        try {
            let element = await this.getFieldType(this.tabRewards);
            await element.click();
            return true;
        } catch (error) {
            console.log(`navigateToRewardTab`);
            console.log(error);
            return false;
        }
    }

    public async pressCreateButton() {
        try {
            let element = await this.getFieldType(this.btnCreate);
            await element.click();
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true;
        } catch (error) {
            console.log(`pressCreateButton`);
            console.log(error);
            return false;
        }
    }

    public async pressRemoveRewardsButton() {
        try {
            let element = await this.getFieldType(this.btnRemove);
            await element.click();
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true;
        } catch (error) {
            console.log(`pressRemoveRewardsButton`);
            console.log(error);
            return false;
        }
    }
    //#region validate value on list
    public async validateProgramValueOnRewardList(expectedValue: string, positionRow: number = 1) {
        try {
            let element = await this.getFieldType(By.xpath(`//app-reward-list//tbody//tr[${positionRow}]//app-program-cell//*[self::*[text()]]`));
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("Validate Program: ", [actualValue, expectedValue, "Incorrect Value!"]);
        } catch (error) {
            console.log('validateProgramValueOnRewardList');
            console.log(error);
            return false;
        }
    }

    public async validateRewardValueOnRewardList(expectedValue: string, positionRow: number = 1) {
        try {
            let element = await this.getFieldType(By.xpath(`//app-reward-list//tbody//tr[${positionRow}]//td//span[contains(text(),'${expectedValue}')]`));
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("Validate Reward: ", [actualValue, expectedValue, "Incorrect Value!"]);
        } catch (error) {
            console.log('validateRewardValueOnRewardList');
            console.log(error);
            return false;
        }
    }

    public async validateRewardValueNotShowOnRewardList(expectedValue: string, positionRow: number = 1) {
        try {
            let element = By.xpath(`//app-reward-list//tbody//tr[${positionRow}]//td//span[contains(text(),'${expectedValue}')]`);
            if(await this.driverService.isExisted(element)){
                return false;
            }else{
                return true;
            }
        } catch (error) {
            console.log('validateRewardValueNotShowOnRewardList');
            console.log(error);
            return false;
        }
    }

    public async validateProductValueOnRewardList(expectedValue: string, positionRow: number = 1) {
        try {
            let element = await this.getFieldType(By.xpath(`//app-reward-list//tbody//tr[${positionRow}]//app-product-cell//*[self::*[text()]]`));
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("Validate Product: ", [actualValue, expectedValue, "Incorrect Value!"]);
        } catch (error) {
            console.log('validateProductValueOnRewardList');
            console.log(error);
            return false;
        }
    }

    public async validateEventValueOnRewardList(expectedValue: string, positionRow: number = 1) {
        try {
            let element = await this.getFieldType(By.xpath(`//app-reward-list//tbody//tr[${positionRow}]//td//span[contains(text(),'${expectedValue}')]`));
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("Validate Event: ", [actualValue, expectedValue, "Incorrect Value!"]);
        } catch (error) {
            console.log('validateEventValueOnRewardList');
            console.log(error);
            return false;
        }
    }

    public async validatePointAwardedValueOnRewardList(expectedValue: string, positionRow: number = 1) {
        try {
            let element = await this.getFieldType(By.xpath(`//app-reward-list//tbody//tr[${positionRow}]//td//span[contains(text(),'${expectedValue}')]`));
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("Validate PointAwarded: ", [actualValue, expectedValue, "Incorrect Value!"]);
        } catch (error) {
            console.log('validatePointAwardedValueOnRewardList');
            console.log(error);
            return false;
        }
    }

    public async validateAttributeTagValueOnRewardList(expectedValue: string, positionRow: number = 1) {
        try {
            let element = await this.getFieldType(By.xpath(`//app-reward-list//tbody//tr[${positionRow}]//td//span[contains(text(),'${expectedValue}')]`));
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("Validate AttributeTag: ", [actualValue, expectedValue, "Incorrect Value!"]);
        } catch (error) {
            console.log('validateAttributeTagValueOnRewardList');
            console.log(error);
            return false;
        }
    }

    public async validateValueOnRewardList(expectedValue: string, positionRow: number = 1) {
        try {
            let element = await this.getFieldType(By.xpath(`//app-reward-list//tbody//tr[${positionRow}]//td//span[text()=' ${expectedValue} ']`));
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("Validate Value : ", [actualValue, expectedValue, "Incorrect Value!"]);
        } catch (error) {
            console.log('validateValueOnRewardList');
            console.log(error);
            return false;
        }
    }

    //#endregion

    public async editTheRewardByName(rewardName: string) {
        try {
            for (let i = 1; i <= 10; i++) {
                let btnEdit = By.xpath(`//app-reward-list//tbody//tr[.//td//span[contains(text(),'${rewardName}')]][${i}]//button[.//i[contains(@class,'fa-edit')]]`);
                if (await this.driverService.isExisted(btnEdit)) {
                    await this.driverService.click(btnEdit);
                    await waitUntilHorizontalProgressBarLoaded(this.driverService);
                    return true;
                }
            }
            logFailMessage(`Can not find '${rewardName}' in reward list!`);
            return false;
        } catch (error) {
            console.log(`editTheRewardByName`);
            console.log(error);
            return false;
        }
    }

    public async deleteTheRewardByName(rewardName: string) {
        try {
            for (let i = 1; i <= 10; i++) {
                let btnDelete = By.xpath(`//app-reward-list//tbody//tr[.//td//span[contains(text(),'${rewardName}')]][${i}]//button[@id='pgs-reward-action-delete-btn']`);
                if (await this.driverService.isExisted(btnDelete)) {
                    await this.driverService.click(btnDelete);
                    const confirmDialog = new ConfirmDialogManager(this.driverService);
                    await confirmDialog.confirm("Yes");
                    await waitUntilHorizontalProgressBarLoaded(this.driverService);
                    return true;
                }
            }
            logFailMessage(`Can not find '${rewardName}' in reward list!`);
            return false;
        } catch (error) {
            console.log(`deleteTheRewardByName`);
            console.log(error);
            return false;
        }
    }

    public async tickCheckboxToDeleteRewardByRow(positionRow: number = 1) {
        try {
            let Value = By.xpath(`//app-reward-list//tbody//tr[${positionRow}]//app-check-box-cell//input`);
            let element = By.xpath(`//app-reward-list//tbody//tr[${positionRow}]//app-check-box-cell//span`);
            if (!await this.driverService.isExisted(Value)) {
                return false;
            } else if (await this.driverService.getAttributeValue(Value, 'checked') != 'true') {
                await this.driverService.click(element);
                return true;
            } else return true;
        } catch (error) {
            console.log(`tickCheckboxToDeleteRewardByRow`);
            console.log(error);
            return false;
        }
    }
}