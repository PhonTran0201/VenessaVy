import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../core/selenium-webdriver.service";
import { logFailMessage, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../shared/functions";

export class DashboardLayout {
    constructor(private driverService: SeleniumWebDriverService) { }

    private EmptyCardLayout = By.xpath(`//div[contains(@class,"cdk-drop-list") and contains(@id,"settingDashboard")]`)
    private btnSaveDashboard = By.xpath(`//app-dashboard//button[@type="submit"]`)
    private btnConfirmSaveDashboard = By.xpath(`//app-setting-name-form//button[@type="submit"]`)
    private txtDashboardName = By.xpath(`//app-setting-name-form//input[@placeholder]`);

    //@param itemSlot - select a layout containing a number of itemSlot 
    //@param ratio - if a layout contains 2 itemSlot, please indicates the ratio of the layout in 6, 8 or 9
    public async addDashboardLayout(itemSlot: number, ratio?: number) {
        try {
            let CardLayout = By.xpath(`//div[count(.//*[contains(@class, "col-")]) = ${itemSlot} and contains(@class,"card-item")]`)
            let TwoCardLayout = By.xpath(`//div[.//div[@class="col-${ratio}"]][count(.//*[contains(@class, "col-")]) = 2 and contains(@class,"card-item")]`)
            await this.driverService.waitUntilElementLoaded(this.EmptyCardLayout);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            if (itemSlot == 2) {
                await this.driverService.dragAndDrop(TwoCardLayout, this.EmptyCardLayout)
            } else {
                await this.driverService.dragAndDrop(CardLayout, this.EmptyCardLayout)
            }
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true;
        } catch (error) {
            console.log("addDashboardLayout");
            console.log(error)
            return false;
        }
    }

    //to be used with addItemsToLayout
    public async generateWidgetXpath(widget: string) {
        try {
            let widgetXpath = By.xpath(`//div[@title ="${widget}" and contains(@class,"card")]`)
            return widgetXpath
        } catch (error) {
            console.log(`generateWidgetXpath`)
            console.log(error)
            return ""
        }
    }

    public async addItemsToLayout(itemsList: any) {
        try {
            let itemsCapacityCount = (await this.driverService.findElements(By.xpath(`//div[contains(@class,"layout-noted")]`))).length

            if (itemsList.length == itemsCapacityCount) {
                for (const element of itemsList) {
                    let itemSlot = By.xpath(`(//div[contains(.,"Please add item") and contains(@class,"layout-noted")])[1]`);
                    await this.driverService.waitUntilElementLoaded(itemSlot)
                    await this.driverService.dragAndDropv2(element, itemSlot)
                    await waitUntilHorizontalProgressBarLoaded_v2(this.driverService)
                }
                return true;
            } else {
                logFailMessage("There's not enough slots to add items")
                return false;
            }

        } catch (error) {
            console.log(`addItemsToLayout`)
            console.log(error)
            return false;
        }
    }

    //@param name - dashboard name
    //@param type - dashboard type (Global or Private)
    public async saveDashboard(name: string, type: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnSaveDashboard);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await this.driverService.click(this.btnSaveDashboard)
            await this.driverService.setText(this.txtDashboardName, name);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            let dashboardType = By.xpath(`//label[contains(@class,"custom-control") and contains(.,'${type}')]`)
            await this.driverService.click(dashboardType);
            await this.driverService.click(this.btnConfirmSaveDashboard)
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true
        } catch (error) {
            console.log(`saveLayout`)
            console.log(error)
            return false;
        }
    }
}