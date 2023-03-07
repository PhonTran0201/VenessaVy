import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { ValidateField } from "../../../../../shared/classes";
import { logInfoMessage, logWarningMessage, waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";
import { dataTestcase } from "../../../../../shared/variables";


export class QuoteListInsurance {
    constructor(protected driverService: SeleniumWebDriverService) { }

    private actualReference = By.xpath("(//app-customer-quote-list-widget//app-edit-link-col/a)[1]");
    private actualDescription = By.xpath("//app-customer-quote-list-widget//tbody/tr[1]/td[contains(@class,'pgs-quote-description')]//*[self::*[text()]]");
    private actualProduct = By.xpath("//app-customer-quote-list-widget//tbody/tr[1]/td[contains(@class,'pgs-quote-product')]//*[self::*[text()]]");
    private actualPolicyTerm = By.xpath("//app-customer-quote-list-widget//tbody/tr[1]/td[contains(@class,'pgs-quote-policy-term')]//*[self::*[text()]]");
    private actualPremium = By.xpath("//app-customer-quote-list-widget//tbody/tr[1]/td[contains(@class,'pgs-quote-premium')]//*[self::*[text()]]");
    private actualStatus = By.xpath("//app-customer-quote-list-widget//tbody/tr[1]/td[contains(@class,'pgs-quote-status')]//*[self::*[text()]]");
    private quoteRefNum = By.xpath("//h2[@class='quote-ref']");

    public static refNum: string = "";
    public static description: string = "";
    public static product: string = "";
    public static state: string = "default";
    public static policyTerm: string = "default";
    public static premium: string = "";
    public static status: string = "default";


    //Xpath of elements on Quote List

    private CreateQuoteInsBtn = By.xpath('//*[@id="create-quote-btn"]');
    private CreateQuoteBtn = By.xpath('//*[@id="create-quote-btn"]');

    public async clickCreateQuoteInsurance() {
        try {
            await this.driverService.waitUntilElementLoaded(this.CreateQuoteInsBtn);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await this.driverService.click(this.CreateQuoteInsBtn);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    public async clickCreateQuote() {
        try {
            await this.driverService.waitUntilElementLoaded(this.CreateQuoteBtn);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await this.driverService.click(this.CreateQuoteBtn);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    public async assertQuotesAtQuoteList(
        selectedRow: number,
        expectedDescription: string,
        expectedProduct: string,
        expectedPolicyTerm: string,
        expectedPremium: string,
        expectedStatus: string): Promise<boolean> {
        try {
            await this.driverService.waitUntilElementLoaded(this.actualReference);
            await this.driverService.waitForSeconds(2000);

            let lblReference = By.xpath(`(//app-customer-quote-list-widget//app-edit-link-col/a)[${selectedRow}]`);
            let lblDescription = By.xpath(`//app-customer-quote-list-widget//tbody/tr[${selectedRow}]/td[contains(@class,'pgs-quote-description')]//*[self::*[text()]]`);
            let lblProduct = By.xpath(`//app-customer-quote-list-widget//tbody/tr[${selectedRow}]/td[contains(@class,'pgs-quote-product')]//*[self::*[text()]]`);
            let lblPolicyTerm = By.xpath(`//app-customer-quote-list-widget//tbody/tr[${selectedRow}]/td[contains(@class,'pgs-quote-policy-term')]//*[self::*[text()]]`);
            let lblPremium = By.xpath(`//app-customer-quote-list-widget//tbody/tr[${selectedRow}]/td[contains(@class,'pgs-quote-premium')]//*[self::*[text()]]`);
            let lblStatus = By.xpath(`//app-customer-quote-list-widget//tbody/tr[${selectedRow}]/td[contains(@class,'pgs-quote-status')]//*[self::*[text()]]`);

            let actualReference = await this.driverService.getText(lblReference);
            let actualDescription = await this.driverService.getText(lblDescription);
            let actualProduct = await this.driverService.getText(lblProduct);
            let actualPolicyTerm = await this.driverService.getText(lblPolicyTerm);
            let actualPremium = await this.driverService.getText(lblPremium);
            let actualStatus = await this.driverService.getText(lblStatus);


            let temp = await this.driverService.validateRecord(`Create quote - \"${actualReference}\"`,
                [actualDescription, expectedDescription, "Assert at Description: Incorrect Description!"],
                [actualProduct, expectedProduct, "Assert at Product: Incorrect Product!"],
                [actualPolicyTerm, expectedPolicyTerm, "Assert at Policy Term: Incorrect Policy Term!"],
                [actualPremium, expectedPremium, "Assert at Premium: Incorrect Premium!"],
                [actualStatus, expectedStatus, "Assert at Status: Incorrect Status!"]
            );
            if (!temp) {
                return false;
            }

            return true;
        } catch (error) {
            console.log("assertQuotesAtQuoteList");
            console.log(error);
            return false;
        }
    }

    public async assertQuotesOrigoAtQuoteList(
        selectedRow: number,
        expectedProduct: string,
        expectedPolicyTerm: string,
        expectedPremium: string,
        expectedStatus: string): Promise<boolean> {
        try {
            await this.driverService.waitUntilElementLoaded(this.actualReference);
            await this.driverService.waitForSeconds(2000);

            let lblReference = By.xpath(`(//app-customer-quote-list-widget//app-edit-link-col/a)[${selectedRow}]`);
            let lblProduct = By.xpath(`//app-customer-quote-list-widget//tbody/tr[${selectedRow}]/td[contains(@class,'pgs-quote-product')]//*[self::*[text()]]`);
            let lblPolicyTerm = By.xpath(`//app-customer-quote-list-widget//tbody/tr[${selectedRow}]/td[contains(@class,'pgs-quote-policy-term')]//*[self::*[text()]]`);
            let lblPremium = By.xpath(`//app-customer-quote-list-widget//tbody/tr[${selectedRow}]/td[contains(@class,'pgs-quote-premium')]//*[self::*[text()]]`);
            let lblStatus = By.xpath(`//app-customer-quote-list-widget//tbody/tr[${selectedRow}]/td[contains(@class,'pgs-quote-status')]//*[self::*[text()]]`);

            let actualReference = await this.driverService.getText(lblReference);
            let actualProduct = await this.driverService.getText(lblProduct);
            let actualPolicyTerm = await this.driverService.getText(lblPolicyTerm);
            let actualPremium = await this.driverService.getText(lblPremium);
            let actualStatus = await this.driverService.getText(lblStatus);


            let temp = await this.driverService.validateRecord(`Create quote - \"${actualReference}\"`,
                [actualProduct, expectedProduct, "Assert at Product: Incorrect Product!"],
                [actualPolicyTerm, expectedPolicyTerm, "Assert at Policy Term: Incorrect Policy Term!"],
                [actualPremium, expectedPremium, "Assert at Premium: Incorrect Premium!"],
                [actualStatus, expectedStatus, "Assert at Status: Incorrect Status!"]
            );
            if (!temp) {
                return false;
            }

            return true;
        } catch (error) {
            console.log("assertQuotesAtQuoteList");
            console.log(error);
            return false;
        }
    }

    public async assertQuote(expectedRefNum: string, expectedDescription: string, expectedProduct: string, expectedPolicyTerm: string, expectedPremium: string, expectedStatus: string) {
        await this.driverService.waitUntilElementLoaded(this.actualReference);

        let actualReference = await this.driverService.getText(this.actualReference);
        let actualDescription = await this.driverService.getText(this.actualDescription);
        let actualProduct = await this.driverService.getText(this.actualProduct);
        let actualPolicyTerm = await this.driverService.getText(this.actualPolicyTerm);
        let actualPremium = await this.driverService.getText(this.actualPremium);
        let actualStatus = await this.driverService.getText(this.actualStatus);


        QuoteListInsurance.refNum = actualReference;
        QuoteListInsurance.description = actualDescription;
        QuoteListInsurance.product = actualProduct;
        QuoteListInsurance.policyTerm = actualPolicyTerm;
        QuoteListInsurance.premium = actualPremium;
        QuoteListInsurance.status = actualStatus;

        await this.driverService.validateTestCase(`[TC] [Quote] Create quote \"${expectedRefNum}\" successfully`,
            [actualReference, expectedRefNum, "Assert at Reference: Incorrect reference!"],
            [actualDescription, expectedDescription, "Assert at Description: Incorrect Description!"],
            [actualProduct, expectedProduct, "Assert at Product: Incorrect Product!"],
            [actualPolicyTerm, expectedPolicyTerm, "Assert at Policy Term: Incorrect Policy Term!"],
            [actualPremium, expectedPremium, "Assert at Premium: Incorrect Premium!"],
            [actualStatus, expectedStatus, "Assert at Status: Incorrect Status!"]
        );
    }
    public async assertQuoteInsurance(expectedRefNum: string, expectedDescription: string, expectedProduct: string, expectedPolicyTerm: string, expectedPremium: string, expectedStatus: string) {
        let lblReference = By.xpath("//app-edit-link-col/a[1]");
        let lblDescription = By.xpath("//tbody/tr[1]/td[contains(@class,'pgs-quote-description')]//*[self::*[text()]]");
        let lblProduct = By.xpath("//tbody/tr[1]/td[contains(@class,'pgs-quote-product')]//*[self::*[text()]]");
        let lblPolicyTerm = By.xpath("//tbody/tr[1]/td[contains(@class,'pgs-quote-policy-term')]//*[self::*[text()]]");
        let lblPremium = By.xpath("//tbody/tr[1]/td[contains(@class,'pgs-quote-premium')]//*[self::*[text()]]");
        let lblStatus = By.xpath("//tbody/tr[1]/td[contains(@class,'pgs-quote-status')]//*[self::*[text()]]");

        await this.driverService.waitUntilElementLoaded(lblReference);

        let actualReference = await this.driverService.getText(lblReference);
        let actualDescription = await this.driverService.getText(lblDescription);
        let actualProduct = await this.driverService.getText(lblProduct);
        let actualPolicyTerm = await this.driverService.getText(lblPolicyTerm);
        let actualPremium = await this.driverService.getText(lblPremium);
        let actualStatus = await this.driverService.getText(lblStatus);

        await this.driverService.validateTestCase(`[TC] [Quote] Create quote \"${expectedRefNum}\" successfully`,
            [actualReference, expectedRefNum, "Assert at Reference: Incorrect reference!"],
            [actualDescription, expectedDescription, "Assert at Description: Incorrect Description!"],
            [actualProduct, expectedProduct, "Assert at Product: Incorrect Product!"],
            [actualPolicyTerm, expectedPolicyTerm, "Assert at Policy Term: Incorrect Policy Term!"],
            [actualPremium, expectedPremium, "Assert at Premium: Incorrect Premium!"],
            [actualStatus, expectedStatus, "Assert at Status: Incorrect Status!"]
        );
    }

    public async checkQuoteReferenceExistInQuoteList(quoteReference: string) {
        try {
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await this.driverService.waitForSeconds(3000);
            let lblReference = By.xpath(`//app-quotes-list//table//app-edit-link-col/a[contains(text(),'${quoteReference}')]`);
            return await this.driverService.isExisted(lblReference);
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    public async checkQuoteProductExistInQuoteList(product: string) {
        try {
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await this.driverService.waitForSeconds(3000);
            let lblProduct = By.xpath(`//app-quotes-list//table//td[4]/span[text()=' ${product} ']`);
            return await this.driverService.isExisted(lblProduct);
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    public async checkQuoteDetailIsOpening(quoteRef: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.quoteRefNum);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            if (quoteRef) {
                const actualPolicyRef = await this.driverService.getText(this.quoteRefNum);
                return actualPolicyRef.includes(quoteRef);
            }
            return true;
        } catch (error) {
            console.log("checkQuoteDetailIsOpening\n" + error);
            return false;
        }
    }

    public async openExistingQuoteAtQuoteList(
        SelectedDescription: string,
        SelectedProductName: string,
        SelectedPolicyTerm: string,
        SelectedStatus: string
    ): Promise<boolean> {
        try {
            logInfoMessage('Opening quote with name: ' + SelectedDescription);
            await this.driverService.waitForSeconds(3000);
            await this.driverService.waitUntilElementLoaded(By.xpath("//ng-progress/div[@class='ng-progress-bar']"));
            let len = (await this.driverService.findElements(By.xpath("//app-customer-quote-list-widget//table//app-edit-link-col"))).length;
            for (let i = 1; i <= len; i++) {
                let lblDescription = By.xpath(`//app-customer-quote-list-widget//tbody/tr[${i}]/td[contains(@class,'pgs-quote-description')]//*[self::*[text()]]`);
                let lblProductName = By.xpath(`//app-customer-quote-list-widget//tbody/tr[${i}]/td[contains(@class,'pgs-quote-product')]//*[self::*[text()]]`);
                let lblPolicyTerm = By.xpath(`//app-customer-quote-list-widget//tbody/tr[${i}]/td[contains(@class,'pgs-quote-policy-term')]//*[self::*[text()]]`);
                let lblStatus = By.xpath(`//app-customer-quote-list-widget//tbody/tr[${i}]/td[contains(@class,'pgs-quote-status')]//*[self::*[text()]]`);

                let lblRefNumber = By.xpath(`//app-customer-quote-list-widget//table//tr[${i}]//app-edit-link-col/a`);

                let description = await this.driverService.getText(lblDescription);
                let productName = await this.driverService.getText(lblProductName);
                let policyTerm = await this.driverService.getText(lblPolicyTerm);
                let status = await this.driverService.getText(lblStatus);

                let refNumber = await this.driverService.getText(lblRefNumber);
                dataTestcase.push(new ValidateField(refNumber, 0, true, [], []));

                if (
                    description.localeCompare(SelectedDescription) === 0 &&
                    productName.localeCompare(SelectedProductName) === 0 &&
                    policyTerm.localeCompare(SelectedPolicyTerm) === 0 &&
                    status.localeCompare(SelectedStatus) === 0
                ) {
                    dataTestcase[0].nameField = (await this.driverService.getText(By.xpath(`//app-customer-quote-list-widget//table//tr[${i}]//app-edit-link-col/a`)));
                    await this.driverService.click(By.xpath(`(//app-customer-quote-list-widget//table//app-edit-link-col/a)[${i}]`));
                    await waitUntilHorizontalProgressBarLoaded(this.driverService);
                    return true;
                }
            }
            logWarningMessage(`Can NOT find any quote with info: ${SelectedProductName} - ${SelectedDescription} - ${SelectedPolicyTerm} - ${SelectedStatus}`);
            return false;
        } catch (error) {
            console.log("openExistingQuoteAtQuoteList");
            console.log(error);
            return false;
        }
    }

    //#region Get value on Quote list in entity detail
    public async getValueReferenceOnQuoteListByRow(positionRow: number = 1) {
        try {
            const lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]//td[contains(@class,'pgs-quote-reference')]//*[self::*[text()]]`);
            await this.driverService.waitUntilElementLoaded(lblValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            return await this.driverService.getText(lblValue);
        } catch (error) {
            console.log('getValueReferenceOnQuoteListByRow');
            console.log(error);
            return "";
        }
    }
    public async getValueStatusOnQuoteListByRow(positionRow: number = 1) {
        try {
            const lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]//td[contains(@class,'pgs-quote-status')]//*[self::*[text()]]`);
            await this.driverService.waitUntilElementLoaded(lblValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            return await this.driverService.getText(lblValue);
        } catch (error) {
            console.log('getValueStatusOnQuoteListByRow');
            console.log(error);
            return "";
        }
    }
    public async getValueCreatedDateOnQuoteListByRow(positionRow: number = 1) {
        try {
            const lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]//td[contains(@class,'pgs-quote-created-date')]//*[self::*[text()]]`);
            await this.driverService.waitUntilElementLoaded(lblValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            return await this.driverService.getText(lblValue);
        } catch (error) {
            console.log('getValueCreatedDateOnQuoteListByRow');
            console.log(error);
            return "";
        }
    }
    //#endregion
}