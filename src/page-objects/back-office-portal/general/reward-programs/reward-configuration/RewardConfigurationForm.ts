import { Console } from "console";
import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";
import { ConfirmDialogManager } from "../../../../../core/fields/ConfirmDialogManager";
import { logFailMessage, selectDropdownOption, waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";

export class RewardConfigurationForm extends BasePage {
    private cmbProgram = By.xpath(`//*[@id='pgs-loyalty-reward-program-name']`);
    private txtRewardName = By.xpath(`//app-reward-form//div[./label[text()=' Reward ']]//input`);
    private cmbProduct = By.xpath(`//app-reward-form//div[./label[text()=' Product ']]//input`);
    private cmbEvent = By.xpath(`//app-reward-form//div[./label[text()=' Event ']]//input`);
    private txtPointAwarded = By.xpath(`//app-reward-form//div[./label[text()=' Point Awarded ']]//input`);
    private txtAttributeTag = By.xpath(`//app-reward-form//div[./label[text()=' Attribute Tag ']]//input`);
    private txtWorkflowEventIdentificationKey  = By.xpath(`//app-reward-form//div[./label[text()=' Workflow Event Identification Key ']]//input`);
    private txtValue = By.xpath(`//app-reward-form//div[./label[text()=' Value ']]//input`);

    private lblProgram = By.xpath(`//div[./label[contains(text(),'Program')]]//span[contains(@class,'ng-value-label')]`);
    private lblProduct = By.xpath(`//div[./label[contains(text(),'Product')]]//span[contains(@class,'ng-value-label')]`);
    private lblEvent = By.xpath(`//div[./label[contains(text(),'Event')]]//span[contains(@class,'ng-value-label')]`);



    //#region  input value to form
    public async inputProgramOnRewardForm(Program: string) {
        try {
            let element = await this.getFieldType(this.cmbProgram);
            await element.setValue(Program);
            await selectDropdownOption(Program, "", this.driverService);
            return true;
        } catch (error) {
            console.log(`inputProgramOnRewardForm`);
            console.log(error);
            return false;
        }
    }

    public async inputRewardNameOnRewardForm(RewardName: string) {
        try {
            let element = await this.getFieldType(this.txtRewardName);
            await element.setValue(RewardName);
            return true;
        } catch (error) {
            console.log(`inputRewardNameOnRewardForm`);
            console.log(error);
            return false;
        }
    }

    public async inputProductOnRewardForm(Product: string) {
        try {
            let element = await this.getFieldType(this.cmbProduct);
            await element.setValue(Product);
            await selectDropdownOption(Product, "", this.driverService);
            return true;
        } catch (error) {
            console.log(`inputProductOnRewardForm`);
            console.log(error);
            return false;
        }
    }

    public async inputEventOnRewardForm(Event: string) {
        try {
            let element = await this.getFieldType(this.cmbEvent);
            await element.setValue(Event);
            await selectDropdownOption(Event, "", this.driverService);
            return true;
        } catch (error) {
            console.log(`inputEventOnRewardForm`);
            console.log(error);
            return false;
        }
    }

    public async inputPointAwardedOnRewardForm(PointAwarded: string) {
        try {
            let element = await this.getFieldType(this.txtPointAwarded);
            await element.setValue(PointAwarded);
            return true;
        } catch (error) {
            console.log(`inputPointAwardedOnRewardForm`);
            console.log(error);
            return false;
        }
    }

    public async inputAttributeTagOnRewardForm(AttributeTag: string) {
        try {
            let element = await this.getFieldType(this.txtAttributeTag);
            await element.setValue(AttributeTag);
            return true;
        } catch (error) {
            console.log(`inputAttributeTagOnRewardForm`);
            console.log(error);
            return false;
        }
    }


    public async inputWorkflowEventIdentificationKeyOnRewardForm(WorkflowEventIdentificationKey: string) {
        try {
            let element = await this.getFieldType(this.txtWorkflowEventIdentificationKey);
            await element.setValue(WorkflowEventIdentificationKey);
            return true;
        } catch (error) {
            console.log(`inputWorkflowEventIdentificationKeyOnRewardForm`);
            console.log(error);
            return false;
        }
    }

    public async inputValueOnRewardForm(Value: string) {
        try {
            let element = await this.getFieldType(this.txtValue);
            await element.setValue(Value);
            return true;
        } catch (error) {
            console.log(`inputValueOnRewardForm`);
            console.log(error);
            return false;
        }
    }

    //#endregion

    //#region Validate value on form
    public async validateProgramValueOnRewardForm(expectedValue: string) {
        try {
            let element = await this.getFieldType(this.lblProgram);
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("Validate Program: ", [actualValue, expectedValue, "Incorrect Value!"]);
        } catch (error) {
            console.log('validateProgramValueOnRewardForm');
            console.log(error);
            return false;
        }
    }

    public async validateRewardValueOnRewardForm(expectedValue: string) {
        try {
            let element = await this.getFieldType(this.txtRewardName);
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("Validate Reward: ", [actualValue, expectedValue, "Incorrect Value!"]);
        } catch (error) {
            console.log('validateRewardValueOnRewardForm');
            console.log(error);
            return false;
        }
    }

    public async validateProductValueOnRewardForm(expectedValue: string) {
        try {
            let element = await this.getFieldType(this.lblProduct);
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("Validate Product: ", [actualValue, expectedValue, "Incorrect Value!"]);
        } catch (error) {
            console.log('validateProductValueOnRewardForm');
            console.log(error);
            return false;
        }
    }
    public async validateEventValueOnRewardForm(expectedValue: string) {
        try {
            let element = await this.getFieldType(this.lblEvent);
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("Validate Event: ", [actualValue, expectedValue, "Incorrect Value!"]);
        } catch (error) {
            console.log('validateEventValueOnRewardForm');
            console.log(error);
            return false;
        }
    }

    public async validatePointAwardedValueOnRewardForm(expectedValue: string) {
        try {
            let element = await this.getFieldType(this.txtPointAwarded);
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("Validate PointAwarded: ", [actualValue, expectedValue, "Incorrect Value!"]);
        } catch (error) {
            console.log('validatePointAwardedValueOnRewardForm');
            console.log(error);
            return false;
        }
    }

    public async validateAttributeTagValueOnRewardForm(expectedValue: string) {
        try {
            let element = await this.getFieldType(this.txtAttributeTag);
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("Validate AttributeTag: ", [actualValue, expectedValue, "Incorrect Value!"]);
        } catch (error) {
            console.log('validateAttributeTagValueOnRewardForm');
            console.log(error);
            return false;
        }
    }
    public async validateValueFieldOnRewardForm(expectedValue: string) {
        try {
            let element = await this.getFieldType(this.txtValue);
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("Validate Value Field: ", [actualValue, expectedValue, "Incorrect Value!"]);
        } catch (error) {
            console.log('validateValueFieldOnRewardForm');
            console.log(error);
            return false;
        }
    }
    //#endregion

}

