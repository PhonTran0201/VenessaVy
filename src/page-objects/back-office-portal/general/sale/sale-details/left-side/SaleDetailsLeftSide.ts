import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2, logWarningMessage, logFailTestcase } from "../../../../../../shared/functions";


export class SaleDetailsLeftSide {
    //Elements at Sale detail
    private lblDtSalesName = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-sale-details-left-side//label[text()='Sales Name']/following-sibling::*");
    private lblDtAccountName = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-sale-details-left-side//label[text()='Account']/following-sibling::*");
    private lblDtPipeline = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-sale-details-left-side//label[text()='Pipeline']/following-sibling::*");
    private lblDtStage = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-sale-details-left-side//label[text()='Sales Stage']/following-sibling::*");
    private lblDtSaleRep = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-sale-details-left-side//label[text()='Sales Rep.']/following-sibling::*");
    private lblDtProbability = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-sale-details-left-side//label[text()='Probability']/following-sibling::*");
    private lblDtClosedDate = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-sale-details-left-side//label[text()='Close Date']/following-sibling::*");
    private lblDtKAM = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-sale-details-left-side//label[text()='KAM']/following-sibling::*");
    private lblDtCurrency = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-sale-details-left-side//label[text()='Currency']/following-sibling::*");
    private lblDtAmount = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-sale-details-left-side//label[contains(text(),'Amount')]/following-sibling::*");
    private lblDtProduct = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-sale-details-left-side//label[text()='Product']/following-sibling::*");
    private lblDtDescription = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-sale-details-left-side//label[text()='Description']/following-sibling::*`)
    private lblDtSalesStage = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-sale-details-left-side//label[text()='Sales Stage']/following-sibling::*`)

    constructor(private driverService: SeleniumWebDriverService) { }

    public async validateValueSaleDetail(expectedValue: string, nameOfField: string, isUsedForSearch: boolean = false) {
        try {
            // //app-sale-details-left-side//div[contains(@class,'card-body')]//label//following-sibling::*[self::*[text()] | child::*[text()]]
            await this.driverService.waitUntilElementLoaded(this.lblDtAccountName);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
            logWarningMessage(`Validate value at field "${nameOfField}":`);
            let actualValue = "N/A";
            switch (nameOfField) {
                case "Account": {
                    actualValue = await this.driverService.getText(this.lblDtAccountName);
                    break;
                }
                case "Sales Rep.": {
                    actualValue = await this.driverService.getText(this.lblDtSaleRep);
                    break;
                }
                case "KAM":
                    {
                        actualValue = await this.driverService.getText(this.lblDtKAM);
                        break;
                    }
                case "Sales Name": {
                    actualValue = await this.driverService.getText(this.lblDtSalesName)
                    break
                }
                case "Amount": {
                    actualValue = await this.driverService.getText(this.lblDtAmount);
                    break;

                }
                case "Product": {
                    actualValue = await this.driverService.getText(this.lblDtProduct);
                    break;

                }
                case "Closed Date": {
                    actualValue = await this.driverService.getText(this.lblDtClosedDate);
                    break;

                }
                case "Description": {
                    actualValue = await this.driverService.getText(this.lblDtDescription);
                    break;

                }
                case "Sales Stage": {
                    actualValue = await this.driverService.getText(this.lblDtSalesStage);
                    break;
                }
                case "Pipeline": {
                    actualValue = await this.driverService.getText(this.lblDtPipeline);
                    break;
                }
                default:
                    {
                        const temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-sale-details-left-side//div[contains(@class,'card-body')]//label[text()='${nameOfField}']//following-sibling::*[self::*[text()]]`);
                        actualValue = await this.driverService.getText(temp);
                        break;
                    }
            }

            if (isUsedForSearch) {
                return actualValue.toLowerCase().includes(expectedValue.toLowerCase());
            }
            else {
                return await this.driverService.validateRecord(`Validate field "${nameOfField}"`,
                    [actualValue, expectedValue, `Incorrect "${nameOfField}"!`]
                );
            }
        } catch (error) {
            console.log("validateValueSaleDetail");
            console.log(error);
            return false;
        }
    }


    public async checkStageAndProbability(stage: string, probability: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblDtStage);
            let actualStage = await this.driverService.getText(this.lblDtStage);
            // let actualProbability = await this.driverService.getText(this.lblDtProbability);
            return this.driverService.validateRecord("Check Stage and Probability",
                [actualStage, stage, "Incorrect stage!"],
                // [actualProbability, probability + "%", "Incorrect probability!"] //=> The label Probability was disabled
            );
        } catch (error) {
            console.log("checkStageAndProbability");
            console.log(error);
            return false;
        }
    }

    public async assertDetailSale(
        salesName: string,
        accountName: string,
        pipeline: string,
        stage: string,
        salesRep: string,
        // probability: string,
        closedDate: string,
        KAM: string,
        currency: string,
        amount: string,
        product: string
    ) {
        let actualSalesName: string = "";
        let actualAccountName: string = "";
        let actualPipeline: string = "";
        let actualStage: string = "";
        let actualSalesRep: string = "";
        let actualProbability: string = "";
        let actualClosedDate: string = "";
        let actualKAM: string = "";
        let actualCurrency: string = "";
        let actualAmount: string = "";
        let actualProduct: string = "";
        try {
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await this.driverService.waitUntilElementLoaded(this.lblDtAccountName);

            actualSalesName = await this.driverService.getText(this.lblDtSalesName);
            actualAccountName = await this.driverService.getText(this.lblDtAccountName);
            actualPipeline = await this.driverService.getText(this.lblDtPipeline);
            actualStage = await this.driverService.getText(this.lblDtStage);
            actualSalesRep = await this.driverService.getText(this.lblDtSaleRep);
            // actualProbability = await this.driverService.getText(this.lblDtProbability);
            actualClosedDate = await this.driverService.getText(this.lblDtClosedDate);
            actualKAM = await this.driverService.getText(this.lblDtKAM);
            actualCurrency = await this.driverService.getText(this.lblDtCurrency);
            actualAmount = await this.driverService.getText(this.lblDtAmount);
            actualProduct = await this.driverService.getText(this.lblDtProduct);
        } catch (error) {
            console.log("assertDetailSale");
            console.log(error);
            logFailTestcase(false);
        }

        if (!salesRep) {
            salesRep = "N/A";
        }
        if (!closedDate) {
            closedDate = "N/A";
        }
        if (!KAM) {
            actualKAM = KAM = "N/A";
        }
        if (!currency) {
            currency = "N/A";
        }
        if (!product) {
            product = "N/A";
        }
        if (!accountName) {
            actualAccountName = accountName = "N/A";
        }

        await this.driverService.validateTestCase(
            "Validate sale at Sale detail",
            [actualSalesName, salesName, "Incorrect sales name!"],
            [actualAccountName, accountName, "Incorrect account name!"],
            [actualPipeline, pipeline, "Incorrect pipeline!"],
            [actualStage, stage, "Incorrect stage!"],
            [actualSalesRep, salesRep, "Incorrect sales rep!"],
            // [actualProbability, probability, "Incorrect probability!"],
            [actualClosedDate, closedDate, "Incorrect closed date!"],
            [actualKAM, KAM, "Incorrect KAM!"],
            [actualCurrency, currency, "Incorrect currency!"],
            [actualAmount, amount, "Incorrect amount!"],
            [actualProduct, product, "Incorrect product!"]
        );
    }
}
