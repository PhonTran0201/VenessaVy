import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";
import { currencyToNumber } from "../../../../../shared/tenant-setting/tenant-setting";


/**
 * Quote Anomymous
 */
export class YourCart {
    constructor(protected driverService: SeleniumWebDriverService) { }
    private TotalAmount = By.xpath(`//*[contains(local-name(),'cart')]//div[contains(@class,'cart-total-line')]//div[2]`)

    public async validateTheQuoteIsExistInYourCart(QuoteRef: string, Product: string, TotalPremium: string) {
        try {
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            let expectedCartTitle = ("Product: " + Product + " - Ref.: " + QuoteRef).toLocaleUpperCase();
            let expectedTotalPremium = TotalPremium;
            let actualCartTitle = "";
            let actualTotalPremium = "";
            for (let i = 1; i <= 10; i++) {
                let lblCartTitle = By.xpath(`//*[contains(local-name(),'cart')]//div[./div[@class='cart-title']][${i}]//span`);
                let lblTotalPremium = By.xpath(`//*[contains(local-name(),'cart')]//div[./div[@class='cart-title']][${i}]//div[contains(@class,'cart-detail--column')][2]`);

                actualCartTitle = await this.driverService.getText(lblCartTitle);
                if (actualCartTitle.includes(expectedCartTitle)) {
                    expectedCartTitle = actualCartTitle;
                    actualTotalPremium = await this.driverService.getText(lblTotalPremium);
                    if (actualTotalPremium.includes(expectedTotalPremium)) {
                        actualTotalPremium = actualTotalPremium;
                        break;
                    }
                }
            }
            return await this.driverService.validateRecord(
                `Validate the Quote Is Exist In Your Cart: `,
                [actualCartTitle, expectedCartTitle, `Incorrect CartTitle!`],
                [actualTotalPremium, expectedTotalPremium, `Incorrect TotalPremium!`]
            );
        } catch (error) {
            console.log('validateTheQuoteIsExistInYourCart');
            console.log(error);
            return false;
        }
    }

    public async validateTotalAmountInYourCart() {
        try {
            let TotalAmount = 0;
            for (let i = 1; i <= 10; i++) {
                let lblTotalPremium = By.xpath(`//*[contains(local-name(),'cart')]//div[./div[@class='cart-title']][${i}]//div[contains(@class,'cart-detail--column')][2]`);
                if (await this.driverService.isExisted(lblTotalPremium)) {
                    let TotalPremium = currencyToNumber(await this.driverService.getText(lblTotalPremium));
                    TotalAmount += TotalPremium;
                } else break;
            }
            let expectedTotalAmount = TotalAmount.toFixed(2);
            await this.driverService.waitUntilElementLoaded(this.TotalAmount);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let actualTotalAmount = currencyToNumber(await this.driverService.getText(this.TotalAmount)).toFixed(2);
            return await this.driverService.validateRecord(`Validate Total Amount: `, [actualTotalAmount, expectedTotalAmount, "Incorrect Total Amount"]);
        } catch (error) {
            console.log('validateTotalAmountInYourCart');
            console.log(error);
            return false;
        }
    }
}