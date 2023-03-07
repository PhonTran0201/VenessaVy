import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";
import { waitUntilHorizontalProgressBarLoaded } from "../../../../../shared/functions";

export class RewardsIntroductionCPVarsam extends BasePage {
    tabChecklist: By = By.xpath(`//app-reward/div/ul[@id= 'pills-tab']//*[@id= 'checklist-tab']`);
    tabIntroduction: By = By.xpath(`//app-reward/div/ul[@id= 'pills-tab']//*[@id= 'introduction-tab']`);
    reloadTable: By = By.xpath(`//app-checklist//a[contains(@class,'page-link') and .//i[contains(@class,'fa-refresh')]]`);
    inputAcceptTermsAndConditions: By = By.xpath(`//app-introduction//input[@type='checkbox']`);
    spanAcceptTermsAndConditions: By = By.xpath(`//app-introduction//span[contains(@class,'checkbox-term')]`);

    public async navigateToIntroductionTab() {
        try {
            let element = await this.getFieldType(this.tabIntroduction);
            await element.click();
            return true;
        } catch (error) {
            console.log(`navigateToIntroductionTab`);
            console.log(error);
            return false;
        }
    }

    public async acceptTermsAndConditions() {
        try {
            await this.driverService.waitUntilElementLoaded(this.inputAcceptTermsAndConditions);
            if (await this.driverService.getAttributeValue(this.inputAcceptTermsAndConditions, 'checked') == 'true') {
                return true;
            }
            else {
                let element = await this.getFieldType(this.spanAcceptTermsAndConditions);
                await element.click();
                await waitUntilHorizontalProgressBarLoaded(this.driverService);
                return true;
            }
        } catch (error) {
            console.log(`acceptTermsAndConditions`);
            console.log(error);
            return false;
        }
    }
}