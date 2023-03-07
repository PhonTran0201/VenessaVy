import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { ApplicationOptionsFormInterface } from "../../../../../interfaces/guarantee/application/application-forms/ApplicationOptionsFormInterface";
import { selectDropdownOption, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";


export class ApplicationOptionsForm implements ApplicationOptionsFormInterface {
    constructor(protected driverService: SeleniumWebDriverService) { }

    //#region Xpaths on form input
    protected cmbProduct = By.xpath("//app-select-product-form//input[@id='pgs-ins-select-pro-product']");
    protected cmbApplicationType = By.xpath("//app-select-product-form//input[@id='pgs-gua-select-application-type']");
    protected cmbDebtor = By.xpath("//app-select-product-form//input[@id='pgs-debtor-select-debtor']");
    //#endregion

    //#region Xpaths on form value
    protected cmbProductValue = By.xpath("//app-select-product-form//ng-select[.//input[@id='pgs-ins-select-pro-product']]//*[contains(@class,'ng-value-label')]");
    protected cmbApplicationTypeValue = By.xpath("//app-select-product-form//ng-select[.//input[@id='pgs-gua-select-application-type']]//*[contains(@class,'ng-value-label')]");
    protected cmbDebtorValue = By.xpath("//app-select-product-form//ng-select[.//input[@id='pgs-debtor-select-debtor']]//*[contains(@class,'ng-value-label')]");
    //#endregion

    //#region Methods Input values
    public async inputProduct(Product: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbProduct);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await this.driverService.setText(this.cmbProduct, Product);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await selectDropdownOption(Product, "", this.driverService);
            return true;
        } catch (error) {
            console.log("inputProduct");
            console.log(error);
            return false;
        }
    }

    public async inputApplicationType(ApplicationType: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbApplicationType);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.cmbApplicationType, ApplicationType);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await selectDropdownOption(ApplicationType, "", this.driverService);
            return true;
        } catch (error) {
            console.log("inputApplicationType");
            console.log(error);
            return false;
        }
    }

    public async inputDebtor(Debtor: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbDebtor);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.cmbDebtor, Debtor);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await selectDropdownOption(Debtor, "", this.driverService);
            return true;
        } catch (error) {
            console.log("inputDebtor");
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region Methods validate values
    public async validateProduct(ExpectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbProductValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualValue = await this.driverService.getText(this.cmbProductValue);
            return await this.driverService.validateRecord(
                `Validate field Product`,
                [ActualValue, ExpectedValue, `Incorrect Product!`]
            );
        } catch (error) {
            console.log("validateProduct");
            console.log(error);
            return false;
        }
    }

    public async validateApplicationType(ExpectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbApplicationTypeValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualValue = await this.driverService.getText(this.cmbApplicationTypeValue);
            return await this.driverService.validateRecord(
                `Validate field ApplicationType`,
                [ActualValue, ExpectedValue, `Incorrect ApplicationType!`]
            );
        } catch (error) {
            console.log("validateProduct");
            console.log(error);
            return false;
        }
    }

    public async validateDebtor(ExpectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbDebtorValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualValue = await this.driverService.getText(this.cmbDebtorValue);
            return await this.driverService.validateRecord(
                `Validate field Debtor`,
                [ActualValue, ExpectedValue, `Incorrect Debtor!`]
            );
        } catch (error) {
            console.log("validateDebtor");
            console.log(error);
            return false;
        }
    }
    //#endregion
}
