import { By } from "selenium-webdriver";
import { BasePage } from "../../../../core/BasePage";

export class MotorGeneralSettings extends BasePage{
    private lblTitle = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//h2[@class='page-title']");
    
    public async validateValueTitle(expectedValue: string){
        try {
            const element = await this.getFieldType(this.lblTitle);
			const actualValue = await element.getValue();
            return await this.driverService.validateRecord('Validate Title!',
                [actualValue, expectedValue, 'Incorrect Title!']);
        } catch (error) {
            console.log('validateValueTitle');
            console.log(error);
            return false;
        }
    }

    public async tickCheckIntegrationProviderOption(option: string){
        try {
            const btn = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//form//label[./input and ./h5[text()='${option}']]`);
            const element = await this.getFieldType(btn);
            await element.click();
            return true;
        } catch (error) {
            console.log('tickCheckIntegrationProviderOption');
            console.log(error);
            return false;
        }
    }

}