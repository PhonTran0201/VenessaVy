import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";
import { logInfoMessage, waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";
import { GlobalPagination } from "../../GlobalPageObject/GlobalPagination";

export class ProductDetailsProductBuilder extends BasePage {

    private btnPublish = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-version-details//button[text()="Publish"]`);
    private btnActivate = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-version-details//button[text()="Activate"]`)
    // Product details - Not in version detail
    private lblProductTabName = By.xpath(`//app-product-page//li//a[@aria-selected='true']`);
    private lblProductName = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-details//input[@placeholder='Product Name' and @disabled]`);

    //#region Product version list
    private lblVersionActive = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr//app-product-details-edit-cell[.//span[text()='Active']]");
    private lblVersionDraft = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[./td[3]/span[text()=' Draft ']]//app-product-details-edit-cell");
    //#endregion


    //#region Button on footer
    private btnBack = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[text()=' Back ']`);
    private btnSave = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[text()='Save ']`);
    //#endregion

    public async validateProductTabNameValueProductDetails(expectedValue: string) {
        try {
            let actualValue = await (await this.getFieldType(this.lblProductTabName)).getValue();
            return this.driverService.validateRecord("Validate Product Tab Name: ", [actualValue, expectedValue, "Incorrect Product Tab Name!"]);
        } catch (error) {
            console.log('validateProductTabNameValueProductDetails');
            console.log(error);
            return false;
        }
    }

    public async validateProductNameValueProductDetails(expectedValue: string) {
        try {
            let actualValue = await (await this.getFieldType(this.lblProductName)).getValue();
            return this.driverService.validateRecord("Validate Product Tab Name: ", [actualValue, expectedValue, "Incorrect Product Tab Name!"]);
        } catch (error) {
            console.log('validateProductNameValueProductDetails');
            return true;
        }
    }

    //#region Product version list
    public async cloneProductByVersion(version: string) {
        try {
            let lblxpath = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-details//tbody//tr[.//a[text()='${version} ']]//button[@title='Clone']`);
            await (await this.getFieldType(lblxpath)).click();
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true;
        } catch (error) {
            console.log(`cloneProductByVersion`);
            console.log(error);
            return false;
        }
    }

    public async cloneProductByActiveVersion() {
        try {
            let lblxpath = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-details//tbody//tr[.//*[contains(@class,'badge') and contains(text(),'Active')]]//button[@title='Clone']`);
            await (await this.getFieldType(lblxpath)).click();
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            return true;
        } catch (error) {
            console.log(`cloneProductByActiveVersion`);
            console.log(error);
            return false;
        }
    }

    public async selectTheExistingProductVersion(ProductVersion: string) {
        try {
            let lblxpath = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-details//tbody//a[text()='${ProductVersion} ']`);
            await (await this.getFieldType(lblxpath)).click();
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true;
        } catch (error) {
            console.log(`selectTheExistingProductVersion`);
            console.log(error);
            return false;
        }
    }

    public async openProductVersionDetailWithActiveStatus() {
        try {
            const element = await this.getFieldType(this.lblVersionActive);
            await element.click();
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true;
        } catch (error) {
            console.log('openProductVersionDetailWithActiveStatus');
            console.log(error);
            return false;
        }
    }

    public async getProductVersionDetailWithActiveStatus() {
        try {
            await this.driverService.waitUntilElementVisible(this.lblVersionActive);
            const rerult = await (await this.driverService.getAttributeValue(this.lblVersionActive, 'innerText')).split(" ")[0];
            return rerult;
        } catch (error) {
            console.log('getProductVersionDetailWithActiveStatus');
            console.log(error);
            return "";
        }
    }

    public async openProductVersionDetailWithDraftStatus() {
        try {
            const element = await this.getFieldType(this.lblVersionDraft);
            await element.click();
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true;
        } catch (error) {
            console.log('openProductVersionDetailWithDraftStatus');
            console.log(error);
            return false;
        }
    }

    public async findTheProductVersionOnTheList(ProductVersion: string) {
        try {
            let productVersionXpath = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-details//tbody//a[text()='${ProductVersion} ']`);
            let pagination = new GlobalPagination(this.driverService);
            await pagination.selectItemPageNumberAtMainList("50");
            let totalPages = await pagination.getCurrentTotalPageNumberAtMainList();
            for (let i = 1; i <= totalPages; i++) {
                if (await this.driverService.isExisted(productVersionXpath)) {
                    return true;             
                } else {
                    if (i == totalPages){
                        return false;
                    }
                    await pagination.pressNextButtonOnMainList();
                }
            }
            return false;
        } catch (error) {
            console.log(`findTheProductVersionOnTheList`);
            console.log(error);
            return false;
        }

    }
    //#endregion

    //#region Footer
    public async pressBackButton() {
        try {
            const element = await this.getFieldType(this.btnBack);
            await element.click();
            return true;
        } catch (error) {
            console.log('pressBackButton');
            console.log(error);
            return false;
        }
    }

    public async pressSaveButton() {
        try {
            const element = await this.getFieldType(this.btnSave);
            await element.click();
            return true;
        } catch (error) {
            console.log('pressSaveButton');
            console.log(error);
            return false;
        }
    }
    //#endregion
    public async pressPublishButton() {
        try {
            const element = await this.getFieldType(this.btnPublish);
            await element.click();
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true;
        } catch (error) {
            console.log('pressPublishButton');
            console.log(error);
            return false;
        }
    }

    public async pressActivateButton() {
        try {
            const element = await this.getFieldType(this.btnActivate);
            await element.click();
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true;
        } catch (error) {
            console.log('pressActivateButton');
            console.log(error);
            return false;
        }
    }

}