import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../../../core/BasePage";
import { waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../../../shared/functions";

export class CaseDetailsInfoDetailWorkflow extends BasePage {
    public btnShowWorkflow_True = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-task-detail//div[./span[contains(text(),'Show workflow')]]//button[contains(@class,'checked') and @aria-checked='true']`);
    public btnShowWorkflow_False = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-task-detail//div[./span[contains(text(),'Show workflow')]]//button[not(contains(@class,'checked'))]`);





    public async pressShowWorkflowButton() {
        try {
            if (await this.driverService.isExisted(this.btnShowWorkflow_True)) {
                return true;
            } else {
                let ele = await this.getFieldType(this.btnShowWorkflow_False);
                await ele.click();
                await waitUntilHorizontalProgressBarLoaded_v2(this.driverService)
                return true;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    public async validateWorlflowIsShown() {
        try {
            let circleStart = By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//*[@id='chart-view']//*[local-name()='svg' and @data-element-id]//*[name()='circle'])[2]`);
            let circleEnd = By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//*[@id='chart-view']//*[local-name()='svg' and @data-element-id]//*[name()='circle'])[1]`);
            if (await this.driverService.isExisted(circleStart) && await this.driverService.isExisted(circleEnd)) {
                return true;
            }
            return false;
        } catch (error) {
            console.log(`validateWorlflowIsShown`);
            console.log(error);
            return false
        }
    }


    public async pressButtonBaseOnWorkFlow(buttonName: string) {
        try {
            let xpath = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-task-detail//div[contains(@class,'info-detail')]//button[contains(text(),'${buttonName}')]`);
            let ele = await this.getFieldType(xpath);
            await ele.click();
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true;
        } catch (error) {
            console.log(`pressButtonBaseOnWorkFlow`);
            console.log(error);
            return false
        }
    }

    public async validateButtonIsVisibleOrNotBaseOnWorkFlow(buttonName: string, isVisibled: boolean) {
        try {
            let xpath = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-task-detail//div[contains(@class,'info-detail')]//button[contains(text(),'${buttonName}')]`);
            if ((isVisibled && await this.driverService.isExisted(xpath)) || (!isVisibled && !await this.driverService.isExisted(xpath))) {
                return true;
            } return false;
        } catch (error) {
            console.log(`validateButtonIsVisibleOrNotBaseOnWorkFlow`);
            console.log(error);
            return false
        }
    }
}