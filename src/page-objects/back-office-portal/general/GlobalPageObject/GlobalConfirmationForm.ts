import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../shared/functions";



export class GlobalConfirmationForm {
    constructor(protected driverService: SeleniumWebDriverService) { }
    private lblConfirmMessage = By.xpath(`//*[contains(local-name(),'c-confirm') or contains(local-name(),'app-confirm')]//div[contains(@class,'modal-body')]/div`);
    
    public async validateValueConfirmMessage(expectedValue: string){
        try {
            await this.driverService.waitUntilElementVisible(this.lblConfirmMessage);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            const actualValue = await this.driverService.getText(this.lblConfirmMessage);
            return await this.driverService.validateRecord('Validate ConfirmMessage!',
                [actualValue, expectedValue, 'Incorrect ConfirmMessage!']);
        } catch (error) {
            console.log('validateValueConfirmMessage');
            console.log(error);
            return false;
        }
    }
}