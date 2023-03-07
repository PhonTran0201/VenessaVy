// generate by MappingPage
import { By } from "selenium-webdriver";
import { BasePage } from "../../../../core/BasePage";

export class MotorRegistryVehicleDetails extends BasePage {
    txtRegistrationNumber: By = By.xpath(`//app-motor-registry-vehicle-details//input[contains(@id,'registrationNumber')]`);
    btnGetDetails: By = By.xpath(`//app-motor-registry-vehicle-details//button[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"get details")]`);
    btnClear: By = By.xpath(`//app-motor-registry-vehicle-details//button[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"clear")]`);


    async inputRegistrationNumber(value) {
        try {
            let ele = await this.getFieldType(this.txtRegistrationNumber);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async pressButtonGetDetails() {
        try {
            let ele = await this.getFieldType(this.btnGetDetails);
            await ele.click();
            await this.waitPageProgressCompleted();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async pressButtonClear() {
        try {
            let ele = await this.getFieldType(this.btnClear);
            await ele.click();
            await this.waitPageProgressCompleted();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    public async validateValueRetrieveVehicle(nameOfField: string, expectedValue: string){
        try {
            const xpath = By.xpath(`//app-motor-registry-vehicle-details//div[./h3]//div[@class='form-group' and ./label[text()='${nameOfField}']]/p`);
            const element = await this.getFieldType(xpath);
            const actualValue = await element.getValue();
            return await this.driverService.validateRecord(`Validate ${nameOfField}!`,
                [actualValue, expectedValue, `Incorrect ${nameOfField}!`]);
        } catch (error) {
            console.log('validateValueRetrieveVehicle');
            console.log(error);
            return false;
        }
    }
}