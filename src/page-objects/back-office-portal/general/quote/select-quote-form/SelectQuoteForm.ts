import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";
import { selectDropdownOption, waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";

export class SelectQuoteForm  extends BasePage {
    private btnDisabledSelect = By.xpath(`//app-quotes-summary-document-form//button[contains(text(),'Select') and @disabled]`);
    private btnSelect = By.xpath(`//app-quotes-summary-document-form//button[contains(text(),'Select') and not(@disabled])`);
    private btnCancel = By.xpath(`//app-quotes-summary-document-form//button[contains(text(),'Cancel') and not(@disabled])`);
    private cmbCurrency = By.xpath(`//app-quotes-summary-document-form//*[@id='currency']//input`);
    private cmbQuoteType = By.xpath(`//app-quotes-summary-document-form//*[@id='quoteType']//input`);



    public async validateInputCurrencyField() {
        try {
            if (await this.driverService.isExisted(this.cmbCurrency)) {
                return true;
            } return false;
        } catch (error) {
            console.log('validateInputCurrencyField');
            console.log(error);
            return false;
        }
    }

    public async validateInputQuoteTypeField() {
        try {
            if (await this.driverService.isExisted(this.cmbQuoteType)) {
                return true;
            } return false;
        } catch (error) {
            console.log('validateInputQuoteTypeField');
            console.log(error);
            return false;
        }
    }

    public async selectQuotesByRow(PositionRow: number = 1) {
        try {
            let statusCheckbox = By.xpath(`//app-quotes-summary-document-form//tbody//tr[${PositionRow}]//input[@type="checkbox"]`);
            let lblCheckbox = await By.xpath(`//app-quotes-summary-document-form//tbody//tr[${PositionRow}]//label[.//input[@type="checkbox"]]`);
            if (await this.driverService.getAttributeValue(statusCheckbox, 'checked') != `true`) {
                await this.driverService.click(lblCheckbox);
            }
            return true
        } catch (error) {
            console.log(`selectQuotesByRow`);
            console.log(error);
            return false;
        }
    }

    public async selectCurrencyOnSelectQuotesForm(Currency:string) {
        try {
            
            let input = await this.getFieldType(this.cmbCurrency);
            await input.setValue(Currency);
            await selectDropdownOption(Currency,"", this.driverService);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true
        } catch (error) {
            console.log(`selectCurrencyOnSelectQuotesForm`);
            console.log(error);
            return false;
        }
    }
}