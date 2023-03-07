import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";
import { logWarningMessage, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";


/**
 * Product selector in Anonymous quote
 */
export class QuoteProductSelector extends BasePage {
    //constructor(protected driverService: SeleniumWebDriverService) { }
    protected strRootXpath = "";
    private cmbSalesChannel = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//*[@id='pgs-sale-channel']`);
    private btnProductName = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//*[@id='pgs-product-name-Travel']`);

    public async selectProductOnMainQuoteList(product: string) {
        try {
            const btnProductName = By.xpath(`//*[contains(@id,${product})]`)
            const btnProduct = await this.getFieldType(btnProductName);
            await btnProduct.click();
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await this.waitPageProgressCompleted();
            return true;

        } catch (error) {
            console.log('inputProduct');
            console.log(error);
            throw new Error(`Select product "${product}" failed!`);
        }
    }
    public async inputProduct(product: string) {
        try {
            const btnProductName = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//*[contains(@id,'pgs-product-name-${product}') and not(contains(@id,'show/hide'))]`);
            //await this.driverService.waitUntilElementLoaded(btnProductName);
            //await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            //await this.driverService.click(btnProductName);
            //await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            const btnProduct = await this.getFieldType(btnProductName);
            await btnProduct.click();
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await this.waitPageProgressCompleted();
            return true;
        } catch (error) {
            console.log('inputProduct');
            console.log(error);
            throw new Error(`Select product "${product}" failed!`);
        }

    }

    public async selectAProduct(SalesChannel: string, ProductName: string): Promise<boolean> {
        try {
            const btnProductName = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//*[@id='pgs-product-name-${ProductName}']`);

            await this.driverService.waitUntilElementLoaded(this.cmbSalesChannel);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await this.selectSalesChannel(SalesChannel);
            await this.driverService.scrollElementToView(await this.driverService.findElement(btnProductName));
            await this.driverService.click(btnProductName);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            return true;
        } catch (error) {
            console.log("selectAProduct");
            console.log(error);
            return false;
        }
    }

    public async selectSalesChannel(SalesChannel: string): Promise<boolean> {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbSalesChannel);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            for (let i = 1; i <= 20; i++) {
                await this.driverService.pressUp(this.cmbSalesChannel);
            }
            if (SalesChannel.localeCompare("All Sales Channel") === 0) {
                return true;
            }
            for (let i = 1; i <= 30; i++) {
                const lblSalesChannelSelecting = By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'product-selection')]/div/h4)[1]`);
                const SaleChannel = await this.driverService.getText(lblSalesChannelSelecting);
                if (SaleChannel.localeCompare(SalesChannel.toUpperCase()) === 0) {
                    return true;
                } else {
                    await this.driverService.pressDown(this.cmbSalesChannel);
                    await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 300);
                }
            }
            logWarningMessage(`Not found Sales Channel "${SalesChannel}"`);
            return false;
        } catch (error) {
            console.log("selectSalesChannel");
            console.log(error);
            throw new Error(`Select a Sale channel "${SalesChannel}" failed!`);
        }
    }
}