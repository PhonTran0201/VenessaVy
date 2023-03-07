import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";

export class ProductVersionTabSalesProcessProductBuilder extends BasePage {
    //#region app-product-version-sales-process-tools
    //#endregion

    //#region app-product-version-sales-process-layout
    public async pressClearButtonAtQuestion(questionTag: string) {
        try {
            const btn = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-version-sales-process//app-product-version-sales-process-layout//div[./app-question-layout-config//div[text()='${questionTag}']]//i[contains(@class,'fa-times')]`);
            const section = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-version-sales-process//app-product-version-sales-process-layout//app-question-layout-config//div[text()='${questionTag}']`);
            if (await this.driverService.isExisted(btn)) {
                await this.driverService.scrollElementToView(await this.driverService.findElement(section));
                await this.driverService.mouseHover(section);
                await this.driverService.waitUntilElementVisible(btn);
                await this.driverService.click(btn);
                await waitUntilHorizontalProgressBarLoaded_v2(this.driverService)
            }
            return true;

        } catch (error) {
            console.log('pressClearButtonAtQuestion');
            console.log(error);
            return false;
        }
    }

    public async dragAndDropQuestionIntoSection(questionName: string, sectionName: string, column: number) {
        try {
            const btnQuestionSource = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-version-sales-process//app-product-version-sales-process-tools//div[contains(@class,'cdk-drag')][.//div[@title='${questionName}']]`);
            const destination = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-version-sales-process-layout//div[contains(@class,'section-container')][.//span[text()='${sectionName}']]//div[contains(@class,'col-item')][${column}]//app-question-layout-config`);
            await this.driverService.waitUntilElementVisible(btnQuestionSource);
            await this.driverService.waitUntilElementVisible(destination);
            await this.driverService.dragAndDrop(btnQuestionSource, destination);
            return true;
        } catch (error) {
            console.log('dragAndDropQuestionIntoSection');
            console.log(error);
            return false;
        }
    }
    //#endregion
}