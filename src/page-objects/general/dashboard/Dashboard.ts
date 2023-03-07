import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../core/selenium-webdriver.service";
import { logFailMessage, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../shared/functions";

export class Dashboard {
    constructor(private driverService: SeleniumWebDriverService) { }

    private btnMoreActionDashboard = By.xpath(`//button[@id="btn-more-action-dashboard"]`)
    private btnCreateDashboard = By.xpath(`//button[@id="pgs-create-dashboard"]`);
    private btnDeleteDashboard = By.xpath(`//button[contains(.,"Delete dashboard")]`);
    private btnConfirmDeletion = By.xpath(`//c-confirm//button[@id="yes-confirm-btn"]`)
    private dropdownDashboardOptions = By.xpath(`//div[@role="combobox" and .//input[@id="pgs-dashboard-setting"]]`)

    public async createNewDashboard() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnMoreActionDashboard);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await this.driverService.click(this.btnMoreActionDashboard)
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await this.driverService.click(this.btnCreateDashboard);
            return true;
        } catch (error) {
            console.log("createDashboard");
            console.log(error)
            return false;
        }
    }

    public async verifySavedDashboard(name: string, type: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.dropdownDashboardOptions)
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await this.driverService.click(this.dropdownDashboardOptions)
            let dashboardOption = await this.driverService.findElement(By.xpath(`//div[contains(.,"${type}") and @role="group"]/following::div[@title="${name}"]`))
            if (dashboardOption) {
                return true;
            }
            return false;
        } catch (error) {
            console.log(`verifySavedDashboard`)
            console.log(error)
            return false;
        }
    }

    public async deleteCurrentDashboard() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnMoreActionDashboard);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService)
            await this.driverService.waitUntilElementLoaded(this.btnMoreActionDashboard);
            await this.driverService.click(this.btnMoreActionDashboard)
            await this.driverService.waitUntilElementLoaded(this.btnDeleteDashboard);
            await this.driverService.click(this.btnDeleteDashboard)
            await this.driverService.waitUntilElementLoaded(this.btnConfirmDeletion);
            await this.driverService.click(this.btnConfirmDeletion)
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService)
            return true
        } catch (error) {
            console.log(`deleteCurrentDashboard`)
            console.log(error)
            return false;
        }
    }

    public async enterFirstItemOnLastUpdatedClaims() {
        try {
            let firstItem = By.xpath(`(//app-claim-reference-cell//a)[1]`)
            await this.driverService.waitUntilElementLoaded(firstItem)
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService)
            await this.driverService.click(firstItem)
            await this.driverService.waitUntilElementLoaded(By.xpath(`//app-claim-page`))
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService)
            return true

        } catch (error) {
            console.log(`enterFirstItemOnLastUpdatedClaims`)
            console.log(error)
            return false;
        }
    }
    public async enterFirstItemOnLastReportedClaims() {
        try {
            let firstItem = By.xpath(`(//app-dashboard-last-reported-claims//ul//li//a)[1]`);
            await this.driverService.waitUntilElementLoaded(firstItem)
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService)
            await this.driverService.click(firstItem)
            await this.driverService.waitUntilElementLoaded(By.xpath(`//app-claim-page`))
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService)
            return true
        } catch (error) {
            console.log(`enterFirstItemOnLastReportedClaims`)
            console.log(error)
            return false
        }
    }

    public async enterFirstItemOnLastUpdatedLeads() {
        try {
            let firstItem = By.xpath(`(//app-dashboard-lead-widget//app-detail-card-col//a)[1]`)
            await this.driverService.waitUntilElementLoaded(firstItem)
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService)
            await this.driverService.click(firstItem)
            await this.driverService.waitUntilElementLoaded(By.xpath(`//app-lead-page`))
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService)
            return true
        } catch (error) {
            console.log(`enterFirstItemOnLastUpdatedLeads`)
            console.log(error)
            return false
        }
    }

    public async enterFirstItemOnLastCreatedQuotes() {
        try {
            let firstItem = By.xpath(`(//app-dashboard-latest-quotes//app-edit-link-col//a)[1]`)
            await this.driverService.waitUntilElementLoaded(firstItem)
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService)
            await this.driverService.click(firstItem)
            await this.driverService.waitUntilElementLoaded(By.xpath(`//app-customer-detail//a[@title="Quotes"]`))
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService)
            return true
        } catch (error) {
            console.log(`enterFirstItemOnLastCreatedQuotes`)
            console.log(error)
            return false
        }
    }

    public async enterFirstItemOnLastCreatedPolicies() {
        try {
            let firstItem = By.xpath(`(//app-dashboard-latest-policy//app-detail-card-col//a)[1]`)
            await this.driverService.waitUntilElementLoaded(firstItem)
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService)
            await this.driverService.click(firstItem)
            await this.driverService.waitUntilElementLoaded(By.xpath(`//app-customer-detail//a[@title="Policies"]`))
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService)
            return true
        } catch (error) {
            console.log(`enterFirsItemOnLastCreatedPolicies`)
            console.log(error)
            return false
        }
    }

    public async enterFirstItemOnSales() {
        try {
            let firstItem = By.xpath(`(//app-dashboard-sales-widget//div[@class="card-body"]//div//a)[1]`)
            await this.driverService.waitUntilElementLoaded(firstItem)
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService)
            await this.driverService.click(firstItem)
            await this.driverService.waitUntilElementLoaded(By.xpath(`//app-sale-page`))
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService)
            return true
        } catch (error) {
            console.log(`enterFirstItemOnSales`)
            console.log(error)
            return false
        }
    }

    public async enterFirstItemOnLastUpdatedAccounts() {
        try {
            let firstItem = By.xpath(`(//app-account-name-column//a)[1]`);
            await this.driverService.waitUntilElementLoaded(firstItem)
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService)
            await this.driverService.click(firstItem)
            await this.driverService.waitUntilElementLoaded(By.xpath(`//app-customer-page`))
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService)
            return true
        } catch (error) {
            console.log(`enterFirstItemOnLastUpdatedAccount`)
            console.log(error)
            return false
        }
    }

    public async enterFirstItemOnCases() {
        try {
            let firstItem = By.xpath(`(//c-widget-layout[contains(@class,"case-widget")]//li)[1]//a`);
            await this.driverService.waitUntilElementLoaded(firstItem)
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService)
            await this.driverService.click(firstItem)
            return true
        } catch (error) {
            console.log(`enterFirstItemOnCases`)
            console.log(error)
            return false
        }
    }

    public async enterFirstItemOfWidget(widgetName: string) {
        try {
            switch (widgetName) {
                case "Claims":
                    return await this.enterFirstItemOnLastUpdatedClaims()
                case "Customer":
                    return await this.enterFirstItemOnLastUpdatedAccounts()
                case "Last reported claims":
                    return await this.enterFirstItemOnLastReportedClaims()
                case "Cases":
                    return await this.enterFirstItemOnCases()
                case "Lead":
                    return await this.enterFirstItemOnLastUpdatedLeads()
                case "Quotes":
                    return await this.enterFirstItemOnLastCreatedQuotes()
                case "Policies":
                    return await this.enterFirstItemOnLastCreatedPolicies()
                case "Sales":
                    return await this.enterFirstItemOnSales()
                default:
                    logFailMessage(`No widget found with ${widgetName} name`)
                    return false
            }
        } catch (error) {
            console.log(`enterFirstItemWidget`)
            console.log(error)
            return false
        }
    }

    public async getFirstItemNameOnWidget(widgetName: string) {
        try {
            let firstElement: any
            switch (widgetName) {
                case "Claims":
                    firstElement = By.xpath(`(//app-claim-reference-cell//a//strong)[1]`);
                    await this.driverService.waitUntilElementLoaded(firstElement)
                    await waitUntilHorizontalProgressBarLoaded_v2(this.driverService)
                    return await this.driverService.getText(firstElement)

                case "Customer":
                    firstElement = By.xpath(`(//app-account-name-column//a)[1]`);
                    await this.driverService.waitUntilElementLoaded(firstElement)
                    await waitUntilHorizontalProgressBarLoaded_v2(this.driverService)
                    return await this.driverService.getText(firstElement)

                case "Last reported claims":
                    firstElement = By.xpath(`(//app-dashboard-last-reported-claims//a)[1]`);
                    await this.driverService.waitUntilElementLoaded(firstElement)
                    await waitUntilHorizontalProgressBarLoaded_v2(this.driverService)
                    return await this.driverService.getText(firstElement)

                case "Cases":
                    firstElement = By.xpath(`(//c-widget-layout[contains(@class,"case")]//ul//a)[1]`);
                    await this.driverService.waitUntilElementLoaded(firstElement)
                    await waitUntilHorizontalProgressBarLoaded_v2(this.driverService)
                    return await this.driverService.getText(firstElement)

                case "Lead":
                    firstElement = By.xpath(`(//app-dashboard-lead-widget//app-detail-card-col//a)[1]`);
                    await this.driverService.waitUntilElementLoaded(firstElement)
                    await waitUntilHorizontalProgressBarLoaded_v2(this.driverService)
                    return await this.driverService.getText(firstElement)

                case "Quotes":
                    firstElement = By.xpath(`(//app-dashboard-latest-quotes//app-edit-link-col//a)[1]`);
                    await this.driverService.waitUntilElementLoaded(firstElement)
                    await waitUntilHorizontalProgressBarLoaded_v2(this.driverService)
                    return await this.driverService.getText(firstElement)

                case "Policies":
                    firstElement = By.xpath(`(//app-dashboard-latest-policy//app-detail-card-col//a)[1]`);
                    await this.driverService.waitUntilElementLoaded(firstElement)
                    await waitUntilHorizontalProgressBarLoaded_v2(this.driverService)
                    return await this.driverService.getText(firstElement)

                case "Sales":
                    firstElement = By.xpath(`(//app-dashboard-sales-widget//div[@class="card-body"]//div//a)[1]`);
                    await this.driverService.waitUntilElementLoaded(firstElement)
                    await waitUntilHorizontalProgressBarLoaded_v2(this.driverService)
                    return await this.driverService.getText(firstElement)

                default:
                    logFailMessage(`Cannot get first item on ${widgetName}`)
                    return ""
            }
        } catch (error) {
            console.log(`getFirstItemNameOnWidget`);
            console.log(error)
            return ""
        }
    }




}