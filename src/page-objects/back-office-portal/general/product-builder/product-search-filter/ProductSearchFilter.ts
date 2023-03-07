import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";

export class ProductSearchFilter extends BasePage{
    private txtName = By.xpath("//*[contains(local-name(),'filter-form')]//input[@id='pgs-product-filter-name']");

    private btnClearName = By.xpath("//*[contains(local-name(),'filter-form')]//div[./input[@id='pgs-product-filter-name']]/button");
    public async inputName(value: string) {
        try {
            const element = await this.getFieldType(this.txtName);
            await element.setValue(value);
            return true;
        } catch (error) {
            console.log('');
            console.log(error);
            return false;
        }
    }

    public async pressClearName(){
        try {
            const element = await this.getFieldType(this.btnClearName);
            await element.click();
            return true;
        } catch (error) {
            console.log('pressClearName');
            console.log(error);
            return false;
        }
    }
}