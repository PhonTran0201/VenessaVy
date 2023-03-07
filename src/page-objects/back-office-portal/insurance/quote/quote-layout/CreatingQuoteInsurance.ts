import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";
import { logInfoMessage, logWarningMessage, waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";
import { QuoteListInsurance } from "../quote-list/QuoteListInsurance";

export class CreatingQuoteInsurance extends BasePage {

    private btnCaculatePremium = By.xpath("//*[contains(@class,'fa-calculator')]/parent::button");
    private lblQuoteConstrainedMessage = By.xpath("//div[contains(text(),'This quote is constrained!')]");

    private lblPolicyTerm = By.xpath("//span[text()='Policy term: ']/following-sibling::span");
    private lblExpiryDate = By.xpath("//span[text()='Expiry Date: ']/following-sibling::span");
    private lblEffectiveFrom = By.xpath("//span[text()='Effective From: ']/following-sibling::span");

    private txtUnderwritingAdjustment = By.xpath("//tr[.//span[contains(text(),'Underwriting')]]//input");
    private txtProductCommission = By.xpath("(//div[contains(text(),'Product commission')]//following::input)[1]");
    private txtSalesDiscount = By.xpath("(//div[contains(text(),'Sales discount')]//following::input)[1]");
    private txtSalesCommission = By.xpath("(//div[contains(text(),'Sales commission')]//following::input)[1]");
    private ApproveQuoteBtn = By.xpath("//button[contains(text(),'Approve')]");
    private AcceptQuoteBtn = By.xpath("//*[contains(text(),'Accept') and contains(@class,'btn-primary-light')]");


    private btnGenerateDocument = By.xpath("//button[contains(text(),'Generate Document')]");
    private btnGenerateDocument_v2 = By.xpath("//button//span[text()='Generate Document']");
    private btnDropdownSendDocument = By.xpath("//*[contains(text(),'Send Document')]/parent::button/following::div/button/i[contains(@class,'fa-chevron-down')]");

    private lblQuoteRefNum = By.xpath("//h2[@class='quote-ref']");

    private btnAdjust = By.xpath("//button[contains(text(),'Adjust')]");
    private btnRenew = By.xpath("//button[contains(text(),'Renew')]");
    private btnTerminate = By.xpath("//button[contains(text(),'Terminate ')]");

    //acceptQuoteBtn
    public async clickAcceptQuote(): Promise<string> {
        try {
            await this.driverService.waitUntilElementVisible(this.AcceptQuoteBtn);
            await this.driverService.waitUntilElementVisible(this.lblQuoteRefNum);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            let quoteRef = await this.driverService.getText(this.lblQuoteRefNum);
            QuoteListInsurance.refNum = await this.driverService.getText(this.lblQuoteRefNum);
            await this.driverService.click(this.AcceptQuoteBtn);
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return quoteRef;
        } catch (error) {
            console.log(error);
            return "-1";
        }
    }

    public async clickGenerateDocument(): Promise<boolean> {
        try {
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 3000);
            if (await this.driverService.isExisted(this.btnDropdownSendDocument)) {
                await this.driverService.click(this.btnDropdownSendDocument);
                await this.driverService.waitUntilElementLoaded(this.btnGenerateDocument_v2);
                await this.driverService.click(this.btnGenerateDocument_v2);
            }
            else {
                await this.driverService.waitUntilElementLoaded(this.btnGenerateDocument);
                await this.driverService.waitForSeconds(2000);
                await this.driverService.click(this.btnGenerateDocument);
            }

            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            let btnDownload = By.xpath("//h4[contains(text(),'Quote Documents')]/following-sibling::div//span[text()='Download']");
            await this.driverService.waitUntilElementLoaded(btnDownload);
            return true;
        } catch (error) {
            console.log("clickGenerateDocument");
            console.log(error);
            return false;
        }
    }

    public async inputDataToCreatingQuote(
        UnderwritingAdjustment: string,
        ProductCommission: string,
        SalesDiscount: string,
        SalesCommission: string,
        IsConstrained: string,
        StartDate: string,
        EndDate: string,
        NumerOfDaysWillExpire: string,
        AnnualPremium: string,
        PolicyPremium: string
    ): Promise<boolean> {
        try {

            await this.driverService.waitUntilElementLoaded(this.txtProductCommission);
            await this.driverService.waitUntilElementLoaded(this.txtSalesDiscount);
            await this.driverService.waitForSeconds(2000);

            let quoteRefNumber = await this.driverService.getText(this.lblQuoteRefNum);

            logInfoMessage(`\tCreating Quote:  ${quoteRefNumber}`);


            //Input ProductCommission and Sales Discount
            await this.driverService.setText(this.txtUnderwritingAdjustment, UnderwritingAdjustment);
            await this.driverService.setText(this.txtSalesDiscount, SalesDiscount);
            await this.driverService.setText(this.txtProductCommission, ProductCommission);
            if (SalesCommission) {
                await this.driverService.setText(this.txtSalesCommission, SalesCommission);
            }

            await this.driverService.pressTabCurrentElement();
            await this.driverService.waitForSeconds(1000);


            let lblErrorValidationMessage = By.xpath(`//*[contains(@class,"invalid-feedback")]`);
            if (await this.driverService.isExisted(lblErrorValidationMessage)) {
                logWarningMessage(`Creating Quote: ${quoteRefNumber} has invalid data:`);
                let len = (await this.driverService.findElements(lblErrorValidationMessage)).length;
                for (let i = 1; i <= len; i++) {
                    let temp = By.xpath(`(//*[contains(@class,"invalid-feedback")])${i}`);
                    logWarningMessage(await this.driverService.getText(temp));
                }
                return false;
            }
            await this.driverService.click(this.btnCaculatePremium);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await this.driverService.waitForSeconds(5000);


            if (IsConstrained) {//If IsConstrained != "", it means we are creating policy with existing quote
                //Check info at Creating Quote form
                if (IsConstrained.localeCompare("Yes") === 0 || IsConstrained.localeCompare("YES") === 0 || IsConstrained.localeCompare("yes") === 0) {
                    if (!(await this.driverService.isExisted(this.lblQuoteConstrainedMessage))) {
                        logWarningMessage('\tThere is no "This quote is constrained!" message!');
                        return false;
                    }
                    await this.driverService.waitUntilElementLoaded(this.ApproveQuoteBtn);
                    await this.driverService.click(this.ApproveQuoteBtn);
                    await waitUntilHorizontalProgressBarLoaded(this.driverService);
                }
                else {
                    if ((await this.driverService.isExisted(this.lblQuoteConstrainedMessage))) {
                        logWarningMessage('\t"This quote is constrained!" message should NOT be shown!');
                        return false;
                    }
                }

                let temp = await this.driverService.validateRecord(
                    "Policy Term",
                    [await this.driverService.getText(this.lblPolicyTerm), StartDate + " - " + EndDate, "Incorrect Policy Term!"]
                );
                if (!temp) {
                    return false;
                }

                let today = new Date();
                let numberOfDaysToAdd = parseInt(NumerOfDaysWillExpire);
                today.setDate(today.getDate() + numberOfDaysToAdd);
                let dd = String(today.getDate()).padStart(2, "0");
                let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
                let yyyy = today.getFullYear();

                let expectedExpiryDate = `${dd}/${mm}/${yyyy}`;
                temp = await this.driverService.validateRecord(
                    "Expiry Date",
                    [await this.driverService.getText(this.lblExpiryDate), expectedExpiryDate]
                );
                if (!temp) {
                    return false;
                }

                //Check Total premium
                let lblAnnualPremium = By.xpath("//app-quick-review-step//th[contains(text(),'Total premium')]/following-sibling::td[1]");
                let lblPolicyPremium = By.xpath("//app-quick-review-step//th[contains(text(),'Total premium')]/following-sibling::td[2]");

                let actualAnnualPremium = (await this.driverService.getText(lblAnnualPremium)).split("\n")[0];
                let actualPolicyPremium = (await this.driverService.getText(lblPolicyPremium)).split("\n")[0];

                temp = await this.driverService.validateRecord("\tCheck Total premium",
                    [actualAnnualPremium, AnnualPremium, "Annual Premium: Incorrect Annual premium!"],
                    [actualPolicyPremium, PolicyPremium, "Policy Premium: Incorrect Policy premium!"]
                )
                if (!temp) {
                    return false;
                }
            }


            await this.driverService.waitForSeconds(3000);
            if (await this.driverService.isExisted(this.ApproveQuoteBtn)) {
                await this.driverService.click(this.ApproveQuoteBtn);
                await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            }
            await this.driverService.click(this.AcceptQuoteBtn);
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true;
        } catch (error) {
            console.log("inputDataToCreatingQuote");
            console.log(error);
            return false;
        }

    }

    public async inputCommission(
        UnderwritingAdjustment: string,
        ProductCommission: string,
        SalesDiscount: string,
        SalesCommission: string
    ): Promise<boolean> {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtProductCommission);
            await this.driverService.waitUntilElementLoaded(this.txtSalesDiscount);
            await this.driverService.waitForSeconds(2000);

            let quoteRefNumber = await this.driverService.getText(this.lblQuoteRefNum);

            logInfoMessage(`\tCreating Quote:  ${quoteRefNumber}`);


            //Input ProductCommission and Sales Discount
            await this.driverService.setText(this.txtUnderwritingAdjustment, UnderwritingAdjustment);
            await this.driverService.setText(this.txtSalesDiscount, SalesDiscount);
            await this.driverService.setText(this.txtProductCommission, ProductCommission);
            await this.driverService.setText(this.txtSalesCommission, SalesCommission);


            await this.driverService.pressTabCurrentElement();
            await this.driverService.waitForSeconds(1000);


            let lblErrorValidationMessage = By.xpath(`//*[contains(@class,"invalid-feedback")]`);
            if (await this.driverService.isExisted(lblErrorValidationMessage)) {
                logWarningMessage(`Creating Quote: ${quoteRefNumber} has invalid data:`);
                let len = (await this.driverService.findElements(lblErrorValidationMessage)).length;
                for (let i = 1; i <= len; i++) {
                    let temp = By.xpath(`(//*[contains(@class,"invalid-feedback")])${i}`);
                    logWarningMessage(await this.driverService.getText(temp));
                }
                return false;
            }
            await this.driverService.click(this.btnCaculatePremium);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await this.driverService.waitForSeconds(3500);
            return true;
        } catch (error) {
            console.log("inputCommission");
            console.log(error);
            return false;
        }
    }


    public async assertEffectiveDateInCreatingQuoteForm(EffectiveDate: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblEffectiveFrom);
            const actualEffectiveDate = await this.driverService.getText(this.lblEffectiveFrom);
            const temp = await this.driverService.validateRecord("Assert at Effective From",
                [actualEffectiveDate, EffectiveDate]
            );
            return temp;
        } catch (error) {
            console.log("assertEffectiveDateInCreatingQuoteForm");
            console.log(error);
            return false;
        }
    }

    /*RENEWAL ORIGO*/
    public async inputDataOrigoToCreatingQuote(
        UnderwritingAdjustment: string,
        ProductCommission: string,
        SalesDiscount: string,
        IsConstrained: string,
        StartDate: string,
        EndDate: string,
        NumerOfDaysWillExpire: string,
        AnnualPremium: string,
        PolicyPremium: string
    ): Promise<boolean> {
        try {

            await this.driverService.waitUntilElementLoaded(this.txtProductCommission);
            await this.driverService.waitUntilElementLoaded(this.txtSalesDiscount);
            await this.driverService.waitForSeconds(2000);

            let quoteRefNumber = await this.driverService.getText(this.lblQuoteRefNum);

            logInfoMessage(`\tCreating Quote:  ${quoteRefNumber}`);


            //Input ProductCommission and Sales Discount
            await this.driverService.setText(this.txtUnderwritingAdjustment, UnderwritingAdjustment);
            await this.driverService.setText(this.txtProductCommission, ProductCommission);
            await this.driverService.setText(this.txtSalesDiscount, SalesDiscount);

            await this.driverService.pressTabCurrentElement();
            await this.driverService.waitForSeconds(1000);


            let lblErrorValidationMessage = By.xpath(`//*[contains(@class,"invalid-feedback")]`);
            if (await this.driverService.isExisted(lblErrorValidationMessage)) {
                logWarningMessage(`Creating Quote: ${quoteRefNumber} has invalid data:`);
                let len = (await this.driverService.findElements(lblErrorValidationMessage)).length;
                for (let i = 1; i <= len; i++) {
                    let temp = By.xpath(`(//*[contains(@class,"invalid-feedback")])${i}`);
                    logWarningMessage(await this.driverService.getText(temp));
                }
                return false;
            }
            await this.driverService.click(this.btnCaculatePremium);
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await this.driverService.waitForSeconds(5000);


            if (IsConstrained) {//If IsConstrained != "", it means we are creating policy with existing quote
                //Check info at Creating Quote form
                if (IsConstrained.localeCompare("Yes") === 0 || IsConstrained.localeCompare("YES") === 0 || IsConstrained.localeCompare("yes") === 0) {
                    if (!(await this.driverService.isExisted(this.lblQuoteConstrainedMessage))) {
                        logWarningMessage('\tThere is no "This quote is constrained!" message!');
                        return false;
                    }
                    await this.driverService.waitUntilElementLoaded(this.AcceptQuoteBtn);
                    await this.driverService.click(this.AcceptQuoteBtn);
                    await waitUntilHorizontalProgressBarLoaded(this.driverService);
                }
                else {
                    if ((await this.driverService.isExisted(this.lblQuoteConstrainedMessage))) {
                        logWarningMessage('\t"This quote is constrained!" message should NOT be shown!');
                        return false;
                    }
                }

                let temp = await this.driverService.validateRecord(
                    "Policy Term",
                    [await this.driverService.getText(this.lblPolicyTerm), StartDate + "-" + EndDate, "Incorrect Policy Term!"]
                );
                if (!temp) {
                    return false;
                }

                let today = new Date();
                let numberOfDaysToAdd = parseInt(NumerOfDaysWillExpire);
                today.setDate(today.getDate() + numberOfDaysToAdd);
                let dd = String(today.getDate()).padStart(2, "0");
                let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
                let yyyy = today.getFullYear();

                let expectedExpiryDate = `${dd}/${mm}/${yyyy}`;
                temp = await this.driverService.validateRecord(
                    "Expiry Date",
                    [await this.driverService.getText(this.lblExpiryDate), expectedExpiryDate]
                );
                if (!temp) {
                    return false;
                }

                //Check Total premium
                let lblAnnualPremium = By.xpath("//app-quick-review-step//th[contains(text(),'Total premium')]/following-sibling::td[1]");
                let lblPolicyPremium = By.xpath("//app-quick-review-step//th[contains(text(),'Total premium')]/following-sibling::td[2]");

                let actualAnnualPremium = await this.driverService.getText(lblAnnualPremium);
                let actualPolicyPremium = await this.driverService.getText(lblPolicyPremium);

                temp = await this.driverService.validateRecord("\tCheck Total premium",
                    [actualAnnualPremium, AnnualPremium, "Annual Premium: Incorrect Annual premium!"],
                    [actualPolicyPremium, PolicyPremium, "Policy Premium: Incorrect Policy premium!"]
                )
                if (!temp) {
                    return false;
                }
            }


            await this.driverService.waitUntilElementLoaded(this.ApproveQuoteBtn);
            await this.driverService.waitForSeconds(3000);
            await this.driverService.click(this.ApproveQuoteBtn);
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);

            return true;
        } catch (error) {
            console.log("inputDataToCreatingQuote");
            console.log(error);
            return false;
        }

    }

    public async clickRenewPolicy() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnRenew);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await this.driverService.click(this.btnRenew);
            await this.driverService.acceptAlert();
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true;
        } catch (error) {
            console.log("clickRenewPolicy");
            console.log(error);
            return false;
        }
    }

    public async clickAdjustPolicy() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnAdjust);
            await this.driverService.click(this.btnAdjust);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true;
        } catch (error) {
            console.log("clickAdjustPolicy");
            console.log(error);
            return false;
        }
    }

    public async openTerminatePolicyForm(): Promise<boolean> {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnTerminate);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await this.driverService.click(this.btnTerminate);
            return true;
        } catch (error) {
            console.log("openTerminatePolicyForm");
            console.log(error);
            return false;
        }
    }

}