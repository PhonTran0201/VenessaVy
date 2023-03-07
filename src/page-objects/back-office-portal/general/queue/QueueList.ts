import { By } from "selenium-webdriver";
import { BasePage } from "../../../../core/BasePage";
import { waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../shared/functions";

export class QueueList extends BasePage {
    protected cmbQueueTypeCollapse = By.xpath(`//ng-select[@id='pgs-queue-select' and not(contains(@class,'ng-select-opened'))]`);
    protected cmbQueueTypeExpand = By.xpath(`//ng-select[@id='pgs-queue-select' and contains(@class,'ng-select-opened')]`);
    protected txtsearchQueues = By.xpath(`//input[@id='pgs-search-queue-field']`);
    protected btnSearchQueues = By.xpath(`//button[@id='queue-search-magnify-icon']`);


    public async selectQueueType(type: string) {
        try {
            let option = By.xpath(`//ng-select[@id='pgs-queue-select']//ng-dropdown-panel[@aria-label = 'Options list']//span[text()='${type}']`);
            if (!await this.driverService.isExisted(this.cmbQueueTypeExpand)) {
                let ele = await this.getFieldType(this.cmbQueueTypeCollapse);
                await ele.click();
            }
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService,500);
            let ele2 = await this.getFieldType(option);
            await ele2.click();
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService,500);
            return true;
        } catch (error) {
            console.log(`selectQueueType`);
            console.log(error);
            return false;
        }
    }

    public async searchQueueOnTheList(queueName: string) {
        try {
            let eleInput = await this.getFieldType(this.txtsearchQueues);
            await eleInput.setValue(queueName);
            let eleButton = await this.getFieldType(this.btnSearchQueues);
            await eleButton.click();
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true;
        } catch (error) {
            console.log(`searchQueueOnTheList`);
            console.log(error);
            return false;
        }
    }

    public async openQueueDetailByIndex(index: number = 1) {
        try {
            await this.driverService.waitUntilElementVisible(By.xpath(`//app-queue-list`));
            let queue = By.xpath(`//app-queue-list//table//tr[${index}]//app-edit-link-col//a`);
            let ele = await this.getFieldType(queue);
            await ele.click();
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 1500);
            return true
        } catch (error) {
            console.log(`openQueueDetailByIndex`);
            console.log(error);
            return false;
        }
    }


}