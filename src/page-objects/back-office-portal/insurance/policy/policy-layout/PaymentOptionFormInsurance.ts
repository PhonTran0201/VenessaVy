import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { logWarningMessage, selectDropdownOption, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";

export class PaymentOptionFormInsurance extends BasePage {
    constructor(protected driverService: SeleniumWebDriverService) {
        super(driverService)
    }

    protected cmbPaymentTypeCollapsed = By.xpath("//app-payment-option//label[text()=' Payment Type ']//following-sibling::ng-select//div[@aria-expanded='false']");
    protected cmbPaymentTypeExpanded = By.xpath("//app-payment-option//label[text()=' Payment Type ']//following-sibling::ng-select//div[@aria-expanded='true']//input");
    protected cmbPaymentFrequencyCollapsed = By.xpath("//app-payment-option//label[text()=' Payment Frequency ']//following-sibling::ng-select//div[@aria-expanded='false']");
    protected cmbPaymentFrequencyExpanded = By.xpath("//app-payment-option//label[text()=' Payment Frequency ']//following-sibling::ng-select//div[@aria-expanded='true']//input");
    protected btnOKSelectPaymentOptionEnabled = By.xpath("//app-payment-option//button[@id='btn-select-cus' and not(@disabled)]");
    protected NgSelectPaymentOption = By.xpath(`//form[@id="payment-option-form"]//ng-select`)

    async setNgSelectPaymentOption(value) {
        try {
            if (!value) {
                console.log("The value of NgSelectPaymentOption is undefined");
                return;
            }
            await this.waitForAppear(this.NgSelectPaymentOption)
            let ele = await this.getFieldType(this.NgSelectPaymentOption);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async clickOKSelectPaymentOption() {
        try {
            let ele = await this.getFieldType(this.btnOKSelectPaymentOptionEnabled);
            await ele.click();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    public async inputDataIntoSelectPaymentOptionForm(PaymentType: string, PaymentFrequency: string): Promise<boolean> {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbPaymentTypeCollapsed);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            if (!PaymentType) {
                await this.driverService.click(this.cmbPaymentTypeCollapsed);
                await this.driverService.pressTabCurrentElement();
            }
            else {
                await this.driverService.click(this.cmbPaymentTypeCollapsed);
                await this.driverService.waitUntilElementLoaded(this.cmbPaymentTypeExpanded);
                await this.driverService.setText(this.cmbPaymentTypeExpanded, PaymentType);
                await this.driverService.waitForSeconds(1000);
                await this.driverService.pressEnterCurrentElement();
                await this.driverService.pressTabCurrentElement();
            }

            if (!PaymentFrequency) {
                await this.driverService.click(this.cmbPaymentFrequencyCollapsed);
                await this.driverService.pressTabCurrentElement();
            }
            else {
                await this.driverService.click(this.cmbPaymentFrequencyCollapsed);
                await this.driverService.waitUntilElementLoaded(this.cmbPaymentFrequencyExpanded);
                await this.driverService.setText(this.cmbPaymentFrequencyExpanded, PaymentFrequency);
                await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
                await selectDropdownOption(PaymentFrequency, "", this.driverService);
                await this.driverService.pressTabCurrentElement();
            }
            await this.driverService.waitForSeconds(1000);

            let txtErrorValidationMessage = By.xpath("//app-payment-option//div[contains(@class,'invalid-feedback')]");
            let len = (await this.driverService.findElements(txtErrorValidationMessage)).length;
            if (len > 0) {
                logWarningMessage("Select Payment Option form has validation messages:");
                while (len > 0) {
                    let temp = By.xpath(`(//app-payment-option//div[contains(@class,'invalid-feedback')])[${len}]`);
                    if (await this.driverService.isExisted(temp)) {
                        logWarningMessage(await this.driverService.getText(temp));
                    }
                    len--;
                }
                return false;
            }

            await this.driverService.waitUntilElementLoaded(this.btnOKSelectPaymentOptionEnabled);
            await this.driverService.click(this.btnOKSelectPaymentOptionEnabled);
            return true;
        } catch (error) {
            console.log("inputDataIntoSelectPaymentOptionForm");
            console.log(error);
            return false;
        }
    }
}