import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";
import { waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";

export class ProductListProductBuilder extends BasePage {
    private BtnSearchAndFilter = By.xpath(`//app-product-list//button[.//span[contains(text(),'Search & Filter')]]`);
    private searchFilterForm = By.xpath(`//*[contains(@class,'show-right-side')]`);
    private txtProductFilterName = By.xpath(`//*[@id='pgs-product-filter-name']`);
    private btnSearch = By.xpath(`//button[.//span[text() = 'Search']]`);
    private btnClear = By.xpath(`//button[contains(text(),'Clear')]`);
    private btnCloseFilter = By.xpath(`//*[@id = 'pgs-product-filter-frm']//button[contains(@class,'close')]`);


    public async SearchAndFilterProductName(productName: string) {
        try {
            if (!await this.driverService.isExisted(this.searchFilterForm)) {
                let searchFilter = await this.getFieldType(this.BtnSearchAndFilter);
                await searchFilter.click();
                await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
            }
            let inputProductName = await this.getFieldType(this.txtProductFilterName);
            await inputProductName.setValue(productName);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
            let search = await this.getFieldType(this.btnSearch);
            await search.click();
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true;
        } catch (error) {
            console.log(`SearchAndFilterProductName`);
            console.log(error);
            return false;
        }
    }

    public async openProductByNameOnProductList(ProductName: string) {
        try {
            for (let i = 1; i <= 10; i++) {
                let lblProductName = By.xpath(`//*[contains(local-name(),'list')]//tbody//tr[${i}]//a`);
                let ProductNameElement = await this.getFieldType(lblProductName);
                let ProductNameValue = await ProductNameElement.getValue();
                if (ProductNameValue.localeCompare(ProductName) === 0) {
                    await ProductNameElement.click();
                    await waitUntilHorizontalProgressBarLoaded(this.driverService);
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.log(`openProductByNameOnProductList`);
            console.log(error);
            return false;
        }
    }



}