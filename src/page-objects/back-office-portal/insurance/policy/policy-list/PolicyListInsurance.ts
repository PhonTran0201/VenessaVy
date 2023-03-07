import { compareDesc } from "date-fns";
import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";
import { logFailMessage, logInfoMessage, logSuccessMessage, reloadTable, waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";
import { pushObjectToDataArrayWithUniqueKey } from "../../../../../storage-data/functions/data-test-execution";
import { GlobalBrowserWindowHandle } from "../../../general/GlobalPageObject/GlobalBrowserWindowHandle";
import { GlobalQuoteInsurance } from "../../quote/quote-layout/GlobalQuoteInsurance";

export class PolicyListInsurance extends BasePage {

    private actualReference = By.xpath("//app-customer-policy-list-widget//tbody/tr[1]//td[contains(@class,'pgs-policy-reference')]//*[self::*[text()]]");
    private actualDescription = By.xpath("//app-customer-policy-list-widget//tbody/tr[1]//td[contains(@class,'pgs-policy-description')]//*[self::*[text()]]");
    private actualProduct = By.xpath("//app-customer-policy-list-widget//tbody/tr[1]//td[contains(@class,'pgs-policy-product')]//*[self::*[text()]]");
    private actualPeriod = By.xpath("//app-customer-policy-list-widget//tbody/tr[1]//td[contains(@class,'pgs-policy-period')]//*[self::*[text()]]");
    private actualPremium = By.xpath("//app-customer-policy-list-widget//tbody/tr[1]//td[contains(@class,'pgs-policy-policy-premium')]//*[self::*[text()]]");
    private actualStatus = By.xpath("//app-customer-policy-list-widget//tbody/tr[1]//td[contains(@class,'pgs-policy-status')]//*[self::*[text()]]");
    private actualSalesPerson = By.xpath("//app-customer-policy-list-widget//tbody/tr[1]//td[contains(@class,'pgs-policy-sales-person')]//*[self::*[text()]]");
    private actualDateModified = By.xpath("//app-customer-policy-list-widget//tbody/tr[1]//td[contains(@class,'pgs-policy-created')]//*[self::*[text()]]");

    private btnGenerateSummary = By.xpath("//app-policy-list//button[contains(text(),'Generate Summary')]");

    public async waitStatusForFirstPolicy(status: string){
        try {
            await this.driverService.waitUntilElementVisible(this.actualReference);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            let list_status = await this.driverService.getText(this.actualStatus);
            let count = 0;
            while (!list_status.includes(status)) {
                await this.driverService.refreshPage();
                await this.waitPageProgressCompleted();
                await this.waitPageLoaded();
                await this.waitPageProgressCompleted();
                await this.pause(5);
                count++;
                list_status = await this.driverService.getText(this.actualStatus);
                if (count >= 60) {
                    break;
                }
            }
        } catch (error) {
            throw error;
        }
    }

    public async openFirstPolicy() {
        try {
            await this.driverService.waitUntilElementLoaded(this.actualReference);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            pushObjectToDataArrayWithUniqueKey("QuoteReference", await this.driverService.getText(this.actualReference));
            GlobalQuoteInsurance.description = await this.driverService.getText(this.actualDescription);
            GlobalQuoteInsurance.product = await this.driverService.getText(this.actualProduct);
            GlobalQuoteInsurance.policyTerm = await this.driverService.getText(this.actualPeriod);
            GlobalQuoteInsurance.status = await this.driverService.getText(this.actualStatus);
            await this.driverService.click(this.actualReference);
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true;
        } catch (error) {
            console.log("openFirstPolicy");
            console.log(error);
            return false;
        }
    }

    public async assertPolicy(expectedReference: string, expectedDescription: string, expectedProduct: string, expectedPeriod: string, expectedPremium: string, expectedStatus: string, positionRow: number = 1) {
        if (expectedStatus.localeCompare("Created") != 0 && expectedStatus.localeCompare("Active") != 0 && expectedStatus.localeCompare("Expired") != 0) {
            await this.driverService.waitForSeconds(50000);
        }
        let gb = new GlobalBrowserWindowHandle(this.driverService);
        await gb.refreshPage();
        await this.driverService.waitForSeconds(5000);
        await reloadTable(this.driverService);
        let actualReferenceXpath = By.xpath(`//app-customer-policy-list-widget//tbody/tr[${positionRow}]//td[contains(@class,'pgs-policy-reference')]//*[self::*[text()]]`);
        let actualDescriptionXpath = By.xpath(`//app-customer-policy-list-widget//tbody/tr[${positionRow}]//td[contains(@class,'pgs-policy-description')]//*[self::*[text()]]`);
        let actualProductXpath = By.xpath(`//app-customer-policy-list-widget//tbody/tr[${positionRow}]//td[contains(@class,'pgs-policy-product')]//*[self::*[text()]]`);
        let actualPeriodXpath = By.xpath(`//app-customer-policy-list-widget//tbody/tr[${positionRow}]//td[contains(@class,'pgs-policy-period')]//*[self::*[text()]]`);
        let actualPremiumXpath = By.xpath(`//app-customer-policy-list-widget//tbody/tr[${positionRow}]//td[contains(@class,'pgs-policy-policy-premium')]//*[self::*[text()]]`);
        let actualStatusXpath = By.xpath(`//app-customer-policy-list-widget//tbody/tr[${positionRow}]//td[contains(@class,'pgs-policy-status')]//*[self::*[text()]]`);
        await this.driverService.waitUntilElementLoaded(actualReferenceXpath);
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);

        let actualReference = await this.driverService.getText(actualReferenceXpath);
        let actualDescription = await this.driverService.getText(actualDescriptionXpath);
        let actualProduct = await this.driverService.getText(actualProductXpath);
        let actualPeriod = await this.driverService.getText(actualPeriodXpath);
        let actualPremium = await this.driverService.getText(actualPremiumXpath);
        let actualStatus = await this.driverService.getText(actualStatusXpath);

        // let AccountId = await this.driverService.getText(By.xpath("//label[text()='NIN' or text()='Org. No']/following-sibling::p"));

        // logSuccessMessage(`Create policy at: \n\tAccount SSN/Org. No: ${AccountId}\n\tReference number: ${expectedReference}`)

        await this.driverService.validateTestCase("[TC] [Policy] Create policy successfully",
            [actualReference, expectedReference, "Assert at Reference: Incorrect reference!"],
            [actualDescription, expectedDescription, "Assert at Description: Incorrect Description!"],
            [actualProduct, expectedProduct, "Assert at Product: Incorrect Product!"],
            [actualPeriod, expectedPeriod, "Assert at Period: Incorrect Period!"],
            [actualPremium, expectedPremium, "Assert at Premium: Incorrect Premium!"],
            [actualStatus, expectedStatus, "Assert at Status: Incorrect Status!"]
        );
    }

    public async assertPoliciesAtPolicyList(
        selectedRow: number,
        expectedDescription: string,
        expectedProduct: string,
        expectedPeriod: string,
        expectedPolicyPremium: string,
        expectedStatus: string): Promise<boolean> {
        try {
            await this.driverService.waitUntilElementLoaded(this.actualReference);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);

            let lblReference = By.xpath(`(//app-customer-policy-list-widget//app-detail-card-col/a)[${selectedRow}]`);
            let lblDescription = By.xpath(`//app-customer-policy-list-widget//tbody/tr[${selectedRow}]//td[contains(@class,'pgs-policy-description')]//*[self::*[text()]]`);
            let lblProduct = By.xpath(`//app-customer-policy-list-widget//tbody/tr[${selectedRow}]//td[contains(@class,'pgs-policy-product')]//*[self::*[text()]]`);
            let lblPolicyTerm = By.xpath(`//app-customer-policy-list-widget//tbody/tr[${selectedRow}]//td[contains(@class,'pgs-policy-period')]//*[self::*[text()]]`);
            let lblPremium = By.xpath(`//app-customer-policy-list-widget//tbody/tr[${selectedRow}]//td[contains(@class,'pgs-policy-policy-premium')]//*[self::*[text()]]`);
            let lblStatus = By.xpath(`//app-customer-policy-list-widget//tbody/tr[${selectedRow}]//td[contains(@class,'pgs-policy-status')]//*[self::*[text()]]`);

            let actualReference = await this.driverService.getText(lblReference);
            let actualDescription = await this.driverService.getText(lblDescription);
            let actualProduct = await this.driverService.getText(lblProduct);
            let actualPeriod = await this.driverService.getText(lblPolicyTerm);
            let actualPolicyPremium = await this.driverService.getText(lblPremium);
            let actualStatus = await this.driverService.getText(lblStatus);


            let temp = await this.driverService.validateRecord(`Create policy - \"${actualReference}\"`,
                [actualDescription, expectedDescription, "Assert at Description: Incorrect Description!"],
                [actualProduct, expectedProduct, "Assert at Product: Incorrect Product!"],
                [actualPeriod, expectedPeriod, "Assert at Period: Incorrect Period!"],
                [actualPolicyPremium, expectedPolicyPremium, "Assert at Policy Premium: Incorrect Policy Premium!"],
                [actualStatus, expectedStatus, "Assert at Status: Incorrect Status!"]
            );
            if (!temp) {
                return false;
            }

            return true;
        } catch (error) {
            console.log("assertPoliciesAtPolicyList");
            console.log(error);
            return false;
        }
    }

    //#region Validate value
    public async validateValueReference(expectedValue: string){
        try {
            const element = await this.getFieldType(this.actualReference);
            const actualValue = await element.getValue();
            return await this.driverService.validateRecord('Validate Reference!',
                [actualValue, expectedValue, 'Incorrect Reference!']);
        } catch (error) {
            console.log('validateValueReference');
            console.log(error);
            return false;
        }
    }
    public async validateValueDescription(expectedValue: string){
        try {
            const element = await this.getFieldType(this.actualDescription);
            const actualValue = await element.getValue();
            return await this.driverService.validateRecord('Validate Description!',
                [actualValue, expectedValue, 'Incorrect Description!']);
        } catch (error) {
            console.log('validateValueDescription');
            console.log(error);
            return false;
        }
    }
    public async validateValueProduct(expectedValue: string){
        try {
            const element = await this.getFieldType(this.actualProduct);
            const actualValue = await element.getValue();
            return await this.driverService.validateRecord('Validate Product!',
                [actualValue, expectedValue, 'Incorrect Product!']);
        } catch (error) {
            console.log('validateValueProduct');
            console.log(error);
            return false;
        }
    }

    public async validateValuePeriod(expectedValue: string){
        try {
            const element = await this.getFieldType(this.actualPeriod);
            const actualValue = await element.getValue();
            return await this.driverService.validateRecord('Validate Period!',
                [actualValue, expectedValue, 'Incorrect Period!']);
        } catch (error) {
            console.log('validateValuePeriod');
            console.log(error);
            return false;
        }
    }

    public async validateValuePolicyPremium(expectedValue: string){
        try {
            const element = await this.getFieldType(this.actualPremium);
            const actualValue = await element.getValue();
            return await this.driverService.validateRecord('Validate Premium!',
                [actualValue, expectedValue, 'Incorrect Premium!']);
        } catch (error) {
            console.log('validateValuePolicyPremium');
            console.log(error);
            return false;
        }
    }

    public async validateValueSalesPerson(expectedValue: string){
        try {
            const element = await this.getFieldType(this.actualSalesPerson);
            const actualValue = await element.getValue();
            return await this.driverService.validateRecord('Validate SalesPerson!',
                [actualValue, expectedValue, 'Incorrect SalesPerson!']);
        } catch (error) {
            console.log('validateValueSalesPerson');
            console.log(error);
            return false;
        }
    }
    public async validateValueDateModified(expectedValue: string){
        try {
            const element = await this.getFieldType(this.actualDateModified);
            const actualValue = await element.getValue();
            return await this.driverService.validateRecord('Validate Date Modified!',
                [actualValue, expectedValue, 'Incorrect Date Modified!']);
        } catch (error) {
            console.log('validateValueDateModified');
            console.log(error);
            return false;
        }
    }
    //#endregion
    public async checkPolicyExistInPolicyList(PolicyReference: string, Product: string, PolicyStartDateFrom: string, PolicyStartDateTo: string, PolicyEndDateFrom: string, PolicyEndDateTo: string) {
        try {
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            let lblReference = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-policy-list//table//app-detail-card-col/a");
            const len = await (await this.driverService.findElements(lblReference)).length;
            for (let i = 1; i <= len; i++) {
                lblReference = By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-policy-list//table//app-detail-card-col/a)[${i}]`);
                const temp = await this.driverService.getText(lblReference);
                if (temp.includes(PolicyReference)) {
                    const actualProduct = await this.driverService.getText(By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-policy-list-widget//tbody/tr[${i}]//td[contains(@class,'pgs-policy-product')]//*[self::*[text()]]`));

                    const actualPeriod = await this.driverService.getText(By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-policy-list-widget//tbody/tr[${i}]//td[contains(@class,'pgs-policy-period')]//*[self::*[text()]]`));

                    const actualStartDate = new Date(parseInt(actualPeriod.substring(6, 10)), parseInt(actualPeriod.substring(3, 5)), parseInt(actualPeriod.substring(0, 2)));
                    const actualEndDate = new Date(parseInt(actualPeriod.substring(17, 21)), parseInt(actualPeriod.substring(14, 16)), parseInt(actualPeriod.substring(11, 13)));

                    const expectedPolicyStartDateForm = PolicyStartDateFrom ? new Date(parseInt(PolicyStartDateFrom.substring(6, 10)), parseInt(PolicyStartDateFrom.substring(3, 5)), parseInt(PolicyStartDateFrom.substring(0, 2))) : new Date(0);

                    const expectedPolicyStartDateTo = PolicyStartDateTo ? new Date(parseInt(PolicyStartDateTo.substring(6, 10)), parseInt(PolicyStartDateTo.substring(3, 5)), parseInt(PolicyStartDateTo.substring(0, 2))) : new Date(8640000000000000);

                    const expectedPolicyEndDateForm = PolicyEndDateFrom ? new Date(parseInt(PolicyEndDateFrom.substring(6, 10)), parseInt(PolicyEndDateFrom.substring(3, 5)), parseInt(PolicyEndDateFrom.substring(0, 2))) : new Date(0);

                    const expectedPolicyEndDateTo = PolicyEndDateTo ? new Date(parseInt(PolicyEndDateTo.substring(6, 10)), parseInt(PolicyEndDateTo.substring(3, 5)), parseInt(PolicyEndDateTo.substring(0, 2))) : new Date(8640000000000000);

                    logInfoMessage(actualPeriod);
                    logInfoMessage(actualStartDate.toString());
                    logInfoMessage(actualEndDate.toString());
                    logInfoMessage(expectedPolicyStartDateForm.toString());
                    logInfoMessage(expectedPolicyStartDateTo.toString());
                    logInfoMessage(expectedPolicyEndDateForm.toString());
                    logInfoMessage(expectedPolicyEndDateTo.toString());
                    Product = !Product ? actualProduct : Product;
                    if (
                        actualProduct.localeCompare(Product) === 0 &&

                        compareDesc(expectedPolicyStartDateForm, actualStartDate) >= 0 &&
                        compareDesc(actualStartDate, expectedPolicyStartDateTo) >= 0 &&
                        compareDesc(expectedPolicyEndDateForm, actualEndDate) >= 0 &&
                        compareDesc(actualEndDate, expectedPolicyEndDateTo) >= 0
                    ) {
                        logInfoMessage(i.toString());
                        return true;
                    }
                }
            }
            return false;
        } catch (error) {
            console.log("checkPolicyExistInPolicyList\n" + error);
            return false;
        }
    }

    public async checkPolicyProductExistInPolicyList(product: string) {
        try {
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await this.driverService.waitForSeconds(3000);
            let lblProduct = By.xpath(`//app-policy-list//table//td[contains(@class,'pgs-policy-product')]/span[text()=' ${product} ']`);
            return await this.driverService.isExisted(lblProduct);
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    //#region Get value on Policy list in entity detail
    public async getValueReferenceOnPolicyListByRow(positionRow: number = 1) {
        try {
            const lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]//td[contains(@class,'pgs-policy-reference')]//*[self::*[text()]]`);
            await this.driverService.waitUntilElementLoaded(lblValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            return await (await this.driverService.getText(lblValue)).trim();
        } catch (error) {
            console.log('getValueReferenceOnPolicyListByRow');
            console.log(error);
            return "";
        }
    }

    public async getValueDescriptionOnPolicyListByRow(positionRow: number = 1) {
        try {
            const lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]//td[contains(@class,'pgs-policy-description')]//*[self::*[text()]]`);
            await this.driverService.waitUntilElementLoaded(lblValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            return await (await this.driverService.getText(lblValue)).trim();
        } catch (error) {
            console.log('getValueDescriptionOnPolicyListByRow');
            console.log(error);
            return "";
        }
    }

    public async getValueProductOnPolicyListByRow(positionRow: number = 1) {
        try {
            const lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]//td[contains(@class,'pgs-policy-product')]//*[self::*[text()]]`);
            await this.driverService.waitUntilElementLoaded(lblValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            return await (await this.driverService.getText(lblValue)).trim();
        } catch (error) {
            console.log('getValueProductOnPolicyListByRow');
            console.log(error);
            return "";
        }
    }

    public async getValueStatusOnPolicyListByRow(positionRow: number = 1) {
        try {
            const lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]//td[contains(@class,'pgs-policy-status')]//*[self::*[text()]]`);
            await this.driverService.waitUntilElementLoaded(lblValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            return await (await this.driverService.getText(lblValue)).trim();
        } catch (error) {
            console.log('getValueStatusOnPolicyListByRow');
            console.log(error);
            return "";
        }
    }
    public async getValueCreatedOnPolicyListByRow(positionRow: number = 1) {
        try {
            const lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]//td[contains(@class,'pgs-policy-created')]//*[self::*[text()]]`);
            await this.driverService.waitUntilElementLoaded(lblValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            return await (await this.driverService.getText(lblValue)).trim();
        } catch (error) {
            console.log('getValueCreatedOnPolicyListByRow');
            console.log(error);
            return "";
        }
    }
    public async getValuePolicyPremiumOnPolicyListByRow(positionRow: number = 1) {
        try {
            const lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]//td[contains(@class,'pgs-policy-policy-premium')]//*[self::*[text()]]`);
            await this.driverService.waitUntilElementLoaded(lblValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            return await (await this.driverService.getText(lblValue)).trim();
        } catch (error) {
            console.log('getValuePolicyPremiumOnPolicyListByRow');
            console.log(error);
            return "";
        }
    }
    //#endregion

    public async pressGenerateSummaryDocumentButton() {
        try {
            let btn = await this.getFieldType(this.btnGenerateSummary);
            await btn.click();
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true;
        } catch (error) {
            console.log('pressGenerateSummaryDocumentButton');
            console.log(error);
            return false;
        }
    }

    public async validateGenerateSummaryDocumentDownloadSuccessfully() {
        try {
            const toast = By.xpath(`//div[@id='toast-container']/div[contains(@class,'toast-success')]/div[contains(text(),'Policy summary document has been generated.')]`);
            let Docxpath = By.xpath(`//app-policy-list//div[contains(@class,'document-item-download')]//a`);
            let iconDocXpath = By.xpath(`//app-policy-list//div[contains(@class,'document-item-download')]//a//img[@src="./assets/images/document/pdf.png"]`);
            await this.driverService.waitUntilElementLoaded(toast);
            if (!await this.driverService.isExisted(iconDocXpath)) {
                logFailMessage(`Summary Document PDF icon is not found!`)
                return false;
            }
            if (!await this.driverService.isExisted(iconDocXpath)) {
                logFailMessage(`Summary Document is not generated!`);
                return false;
            }
            let doc = await this.getFieldType(Docxpath);
            await doc.click();
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true;
        } catch (error) {
            console.log('validateGenerateSummaryDocumentDownloadSuccessfully');
            console.log(error);
            return false;
        }
    }


}