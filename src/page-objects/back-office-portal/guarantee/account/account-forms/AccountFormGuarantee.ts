import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { AccountForm } from "../../../general/account/account-forms/AccountForm";


export class AccountFormGuarantee extends AccountForm {
    constructor(driverService: SeleniumWebDriverService) {
        super(driverService);
    }

    public async assertDataFilledInAccountFormAfterIntegrateBisnode(
        CompanyName: string,
        EmailAddress: string,
        CompanyPhone: string,
        Country: string,
        VisitingAddress: string,
        ExtraAddress: string,
        Postcode: string,
        City: string,
        CreditScore: string,
        CreditRating: string,
        IndustryCode: string,
        Industry: string,
        CompanyRegristrationDate: string
    ): Promise<boolean> {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtCompanyName);

            let actualCompanyName = await this.driverService.getAttributeValue(this.txtCompanyName, 'value');
            let actualEmailAddress = await this.driverService.getAttributeValue(this.txtEmailAddressCompany, 'value');
            let actualCompanyPhone = await this.driverService.getAttributeValue(this.txtCompanyPhone, 'value');

            let txtCountry = By.xpath("//ng-select[contains(@class,'pgs-json-schema-control-country')]//span[contains(@class,'ng-value-label')]");
            let actualCountry = await this.driverService.getText(txtCountry);
            let actualVisitingAddress = await this.driverService.getAttributeValue(this.txtVisitingAddress, 'value');
            let actualExtraAddress = await this.driverService.getAttributeValue(this.txtVisitingExtraAddress, 'value');
            let actualPostcode = await this.driverService.getAttributeValue(this.txtVisitingPostcode, 'value');
            let actualCity = await this.driverService.getAttributeValue(this.txtVisitingCity, 'value');
            let actualCreditScore = await this.driverService.getAttributeValue(this.txtCreditScore, 'value');
            let cmbCreditRating = By.xpath("//ng-select[contains(@class,'pgs-json-schema-control-credit-rating')]//span[contains(@class,'ng-value-label')]");
            let actualCreditRating = await this.driverService.getText(cmbCreditRating);

            let txtIndustryCode = By.xpath("//ng-select[contains(@class,'pgs-json-schema-control-industry-code')]//div[contains(@class,'ng-value-container')]");
            let actualIndustryCode = await this.driverService.getText(txtIndustryCode);
            let actualIndustry = await this.driverService.getAttributeValue(this.cmbIndustry, 'value');
            let actualCompanyRegristrationDate = await this.driverService.getAttributeValue(this.dtpCompanyRegistrationDate, 'value');


            return this.driverService.validateRecord(
                "assert Data Filled In Account Form After Integrate Creditsafe",
                [actualCompanyName, CompanyName, "Incorrect at Company Name!"],
                // [actualEmailAddress, EmailAddress, "Incorrect at Email Address!"],
                [actualCompanyPhone, CompanyPhone, "Incorrect at Company Phone!"],
                [actualCountry, Country, "Incorrect at Country!"],
                [actualVisitingAddress, VisitingAddress, "Incorrect at Visiting Address!"],
                // [actualExtraAddress, ExtraAddress,"Incorrect at ExtraAddress!"],
                [actualPostcode, Postcode, "Incorrect at Postcode!"],
                [actualCity, City, "Incorrect at City!"],
                [actualCreditScore, CreditScore, "Incorrect at Credit Score!"],
                [actualCreditRating, CreditRating, "Incorrect at Credit Rating!"],
                //[actualIndustryCode, IndustryCode, "Incorrect at Industry code!"],
                // [actualIndustry, Industry, "Incorrect at Industry!"],
                [actualCompanyRegristrationDate, CompanyRegristrationDate, "Incorrect at Company Regristration Date!"]
            );
        } catch (error) {
            console.log("assertDataFilledInAccountFormAfterIntegrateCreditsafe");
            console.log(error);
            return false;
        }
    }
}

