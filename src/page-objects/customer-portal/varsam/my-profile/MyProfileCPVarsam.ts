import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../core/selenium-webdriver.service";
export class MyProfileCPVarsam {
    private lblTitle = By.xpath("//app-profile//h2[contains(@class,'title-page')]");

    private txtFullName = By.xpath("//app-profile//formly-horizontal-wrapper//input[contains(@id,'input_fullName')]");
    private txtSSN = By.xpath("//app-profile//formly-horizontal-wrapper//input[contains(@id,'input_ssn')]");
    private txtEmail = By.xpath("//app-profile//formly-horizontal-wrapper//input[contains(@id,'input_email')]");
    private txtMobileNumber = By.xpath("//app-profile//formly-horizontal-wrapper//input[contains(@id,'input_phone')]");
    private txtHomeNumber = By.xpath("//app-profile//formly-horizontal-wrapper//input[contains(@id,'input_homePhone')]");
    private txtAddress = By.xpath("//app-profile//formly-horizontal-wrapper//input[contains(@id,'input_address')]");
    private txtPostCode = By.xpath("//app-profile//formly-horizontal-wrapper//input[contains(@id,'input_postCode')]");
    private txtCity = By.xpath("//app-profile//formly-horizontal-wrapper//input[contains(@id,'input_city')]");

    protected readonly driverService = SeleniumWebDriverService.getInstance();

    constructor() { }

    //#region Validate value
    public async validateValueTitle(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.lblTitle);
            const actualValue = await this.driverService.getText(this.lblTitle);
            return await this.driverService.validateRecord('Validate Title!',
                [actualValue, expectedValue, 'Incorrect Title!']);
        } catch (error) {
            console.log('validateValueTitle');
            console.log(error);
            return false;
        }
    }

    public async validateValueFullName(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.txtFullName);
            const actualValue = await this.driverService.getAttributeValue(this.txtFullName, 'value');
            return await this.driverService.validateRecord('Validate FullName!',
                [actualValue, expectedValue, 'Incorrect FullName!']);
        } catch (error) {
            console.log('validateValueFullName');
            console.log(error);
            return false;
        }
    }

    public async validateValueSSN(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.txtSSN);
            const actualValue = await this.driverService.getAttributeValue(this.txtSSN, 'value');
            return await this.driverService.validateRecord('Validate SSN!',
                [actualValue, expectedValue, 'Incorrect SSN!']);
        } catch (error) {
            console.log('validateValueSSN');
            console.log(error);
            return false;
        }
    }

    public async validateValueEmail(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.txtEmail);
            const actualValue = await this.driverService.getAttributeValue(this.txtEmail, 'value');
            return await this.driverService.validateRecord('Validate Email',
                [actualValue, expectedValue, 'Incorrect Email!']);
        } catch (error) {
            console.log('validateValueEmail');
            console.log(error);
            return false;
        }
    }

    public async validateValueMobileNumber(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.txtMobileNumber);
            const actualValue = await this.driverService.getAttributeValue(this.txtMobileNumber, 'value');
            return await this.driverService.validateRecord('Validate MobileNumber!',
                [actualValue, expectedValue, 'Incorrect MobileNumber!']);
        } catch (error) {
            console.log('validateValueMobileNumber');
            console.log(error);
            return false;
        }
    }

    public async validateValueHomeNumber(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.txtHomeNumber);
            const actualValue = await this.driverService.getAttributeValue(this.txtHomeNumber, 'value');
            return await this.driverService.validateRecord('Validate HomeNumber!',
                [actualValue, expectedValue, 'Incorrect HomeNumber!']);
        } catch (error) {
            console.log('validateValueHomeNumber');
            console.log(error);
            return false;
        }
    }

    public async validateValueAddress(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.txtAddress);
            const actualValue = await this.driverService.getAttributeValue(this.txtAddress, 'value');
            return await this.driverService.validateRecord('Validate Address!',
                [actualValue, expectedValue, 'Incorrect Address!']);
        } catch (error) {
            console.log('validateValueAddress');
            console.log(error);
            return false;
        }
    }

    public async validateValuePostCode(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.txtPostCode);
            const actualValue = await this.driverService.getAttributeValue(this.txtPostCode, 'value');
            return await this.driverService.validateRecord('Validate PostCode!',
                [actualValue, expectedValue, 'Incorrect PostCode!']);
        } catch (error) {
            console.log('validateValuePostCode');
            console.log(error);
            return false;
        }
    }

    public async validateValueCity(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.txtCity);
            const actualValue = await this.driverService.getAttributeValue(this.txtCity, 'value');
            return await this.driverService.validateRecord('Validate City!',
                [actualValue, expectedValue, 'Incorrect City!']);
        } catch (error) {
            console.log('validateValueCity');
            console.log(error);
            return false;
        }
    }
    //#endregion
}