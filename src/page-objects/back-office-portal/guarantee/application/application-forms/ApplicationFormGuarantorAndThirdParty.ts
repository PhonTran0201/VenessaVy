import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { ApplicationFormGuarantorAndThirdPartyInterface } from "../../../../../interfaces/guarantee/application/application-forms/ApplicationFormGuarantorAndThirdPartyInterface";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";


export class ApplicationFormGuarantorAndThirdParty implements ApplicationFormGuarantorAndThirdPartyInterface {
    constructor(protected driverService: SeleniumWebDriverService) { }

    //#region Xpaths on GUARANTOR AND THIRD PARTY when input
    // 1. Guarantor section
    protected txtGuarantorNameGuarantor = By.xpath("//*[contains(local-name(),'form')]//input[@name='GuarantorNameTag']");
    protected txtVisitingAddressGuarantor = By.xpath("//*[contains(local-name(),'form')]//input[@name='GuarantorAddressTag']");
    protected txtPostcodeGuarantor = By.xpath("//*[contains(local-name(),'form')]//input[@name='GuarantorZipCodeTag']");
    protected txtCityGuarantor = By.xpath("//*[contains(local-name(),'form')]//input[@name='GuarantorCityTag']");
    protected txtGuaranteeIssuerGuarantor = By.xpath("//*[contains(local-name(),'form')]//input[@name='GuaranteeIssuerTag']");
    protected txtOnBehalfOfTheGuarantorGuarantor = By.xpath("//*[contains(local-name(),'form')]//input[@name='GuarantorFrontMenNameTag']");

    protected txtFirmsNoGuarantor = By.xpath("//*[contains(local-name(),'form')]//input[@name='GuarantorFirmNumberTag']");
    protected txtPostAddressGuarantor = By.xpath("//*[contains(local-name(),'form')]//input[@name='GuarantorPostAddressTag']");
    protected txtPostZipCodeGuarantor = By.xpath("//*[contains(local-name(),'form')]//input[@name='GuarantorPostZipCodeTag']");
    protected txtPostCityGuarantor = By.xpath("//*[contains(local-name(),'form')]//input[@name='GuarantorPostCityTag']");
    protected txtEmailGuarantor = By.xpath("//*[contains(local-name(),'form')]//input[@name='GuarantorFrontMenEmailTag']");
    protected txtPhoneNumberGuarantor = By.xpath("//*[contains(local-name(),'form')]//input[@name='GuarantorFrontMenPhoneTag']");

    protected lblGuarantorNameGuarantor = By.xpath("//*[contains(local-name(),'form')]//input[@name='GuarantorNameTag']//preceding-sibling::p");
    protected lblVisitingAddressGuarantor = By.xpath("//*[contains(local-name(),'form')]//input[@name='GuarantorAddressTag']//preceding-sibling::p");
    protected lblPostcodeGuarantor = By.xpath("//*[contains(local-name(),'form')]//input[@name='GuarantorZipCodeTag']//preceding-sibling::p");
    protected lblCityGuarantor = By.xpath("//*[contains(local-name(),'form')]//input[@name='GuarantorCityTag']//preceding-sibling::p");
    protected lblGuaranteeIssuerGuarantor = By.xpath("//*[contains(local-name(),'form')]//input[@name='GuaranteeIssuerTag']//preceding-sibling::p");
    protected lblOnBehalfOfTheGuarantorGuarantor = By.xpath("//*[contains(local-name(),'form')]//input[@name='GuarantorFrontMenNameTag']//preceding-sibling::p");

    protected lblFirmsNoGuarantor = By.xpath("//*[contains(local-name(),'form')]//input[@name='GuarantorFirmNumberTag']//preceding-sibling::p");
    protected lblPostAddressGuarantor = By.xpath("//*[contains(local-name(),'form')]//input[@name='GuarantorPostAddressTag']//preceding-sibling::p");
    protected lblPostZipCodeGuarantor = By.xpath("//*[contains(local-name(),'form')]//input[@name='GuarantorPostZipCodeTag']//preceding-sibling::p");
    protected lblPostCityGuarantor = By.xpath("//*[contains(local-name(),'form')]//input[@name='GuarantorPostCityTag']//preceding-sibling::p");
    protected lblEmailGuarantor = By.xpath("//*[contains(local-name(),'form')]//input[@name='GuarantorFrontMenEmailTag']//preceding-sibling::p");
    protected lblPhoneNumberGuarantor = By.xpath("//*[contains(local-name(),'form')]//input[@name='GuarantorFrontMenPhoneTag']//preceding-sibling::p");


    // 2. Third party attorney section
    protected txtCompanyNameThirdParty = By.xpath("//*[contains(local-name(),'form')]//input[@name='ThirdPartyAttorneyCompanyNameTag']");
    protected txtAddressThirdParty = By.xpath("//*[contains(local-name(),'form')]//input[@name='ThirdPartyAttorneyAddressTag']");
    protected txtPostcodeThirdParty = By.xpath("//*[contains(local-name(),'form')]//input[@name='ThirdPartyAttorneyZipCodeTag']");
    protected txtCityThirdParty = By.xpath("//*[contains(local-name(),'form')]//input[@name='ThirdPartyAttorneyCityTag']");

    protected txtPhoneNumberThirdParty = By.xpath("//*[contains(local-name(),'form')]//input[@name='ThirdPartyAttorneyPhoneTag']");
    protected txtFaxThirdParty = By.xpath("//*[contains(local-name(),'form')]//input[@name='ThirdPartyAttorneyFaxTag']");
    protected txtEmailThirdParty = By.xpath("//*[contains(local-name(),'form')]//input[@name='ThirdPartyAttorneyEmailTag']");
    protected txtWebsiteThirdParty = By.xpath("//*[contains(local-name(),'form')]//input[@name='ThirdPartyAttorneyWebTag']");

    protected lblCompanyNameThirdParty = By.xpath("//*[contains(local-name(),'form')]//input[@name='ThirdPartyAttorneyCompanyNameTag']//preceding-sibling::p");
    protected lblAddressThirdParty = By.xpath("//*[contains(local-name(),'form')]//input[@name='ThirdPartyAttorneyAddressTag']//preceding-sibling::p");
    protected lblPostcodeThirdParty = By.xpath("//*[contains(local-name(),'form')]//input[@name='ThirdPartyAttorneyZipCodeTag']//preceding-sibling::p");
    protected lblCityThirdParty = By.xpath("//*[contains(local-name(),'form')]//input[@name='ThirdPartyAttorneyCityTag']//preceding-sibling::p");

    protected lblPhoneNumberThirdParty = By.xpath("//*[contains(local-name(),'form')]//input[@name='ThirdPartyAttorneyPhoneTag']//preceding-sibling::p");
    protected lblFaxThirdParty = By.xpath("//*[contains(local-name(),'form')]//input[@name='ThirdPartyAttorneyFaxTag']//preceding-sibling::p");
    protected lblEmailThirdParty = By.xpath("//*[contains(local-name(),'form')]//input[@name='ThirdPartyAttorneyEmailTag']//preceding-sibling::p");
    protected lblWebsiteThirdParty = By.xpath("//*[contains(local-name(),'form')]//input[@name='ThirdPartyAttorneyWebTag']//preceding-sibling::p");

    //#endregion

    //#region Methods Input values

    //#region 1. Guarantor section
    public async inputGuarantorNameGuarantor(GuarantorName: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtGuarantorNameGuarantor);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.txtGuarantorNameGuarantor, GuarantorName);
            return true;
        } catch (error) {
            console.log("inputGuarantorNameGuarantor");
            console.log(error);
            return false;
        }
    }

    public async inputVisitingAddressGuarantor(VisitingAddress: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtVisitingAddressGuarantor);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.txtVisitingAddressGuarantor, VisitingAddress);
            return true;
        } catch (error) {
            console.log("inputVisitingAddressGuarantor");
            console.log(error);
            return false;
        }
    }
    public async inputPostcodeGuarantor(Postcode: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtPostcodeGuarantor);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.txtPostcodeGuarantor, Postcode);
            return true;
        } catch (error) {
            console.log("inputPostcodeGuarantor");
            console.log(error);
            return false;
        }
    }
    public async inputCityGuarantor(City: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtCityGuarantor);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.txtCityGuarantor, City);
            return true;
        } catch (error) {
            console.log("inputCityGuarantor");
            console.log(error);
            return false;
        }
    }
    public async inputGuaranteeIssuerGuarantor(GuaranteeIssuer: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtGuaranteeIssuerGuarantor);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.txtGuaranteeIssuerGuarantor, GuaranteeIssuer);
            return true;
        } catch (error) {
            console.log("inputGuaranteeIssuerGuarantor");
            console.log(error);
            return false;
        }
    }
    public async inputOnBehalfOfTheGuarantorGuarantor(OnBehalfOfTheGuarantor: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtOnBehalfOfTheGuarantorGuarantor);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.txtOnBehalfOfTheGuarantorGuarantor, OnBehalfOfTheGuarantor);
            return true;
        } catch (error) {
            console.log("inputOnBehalfOfTheGuarantorGuarantor");
            console.log(error);
            return false;
        }
    }
    public async inputFirmsNoGuarantor(FirmsNo: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtFirmsNoGuarantor);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.txtFirmsNoGuarantor, FirmsNo);
            return true;
        } catch (error) {
            console.log("inputFirmsNoGuarantor");
            console.log(error);
            return false;
        }
    }
    public async inputPostAddressGuarantor(PostAddress: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtPostAddressGuarantor);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.txtPostAddressGuarantor, PostAddress);
            return true;
        } catch (error) {
            console.log("inputPostAddressGuarantor");
            console.log(error);
            return false;
        }
    }

    // PostZipCode = Postcode but in 2nd column
    public async inputPostZipCodeGuarantor(PostZipCode: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtPostZipCodeGuarantor);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.txtPostZipCodeGuarantor, PostZipCode);
            return true;
        } catch (error) {
            console.log("inputPostZipCodeGuarantor");
            console.log(error);
            return false;
        }
    }

    public async inputPostCityGuarantor(PostCity: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtPostCityGuarantor);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.txtPostCityGuarantor, PostCity);
            return true;
        } catch (error) {
            console.log("inputPostCityGuarantor");
            console.log(error);
            return false;
        }
    }

    public async inputEmailGuarantor(Email: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtEmailGuarantor);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.txtEmailGuarantor, Email);
            return true;
        } catch (error) {
            console.log("inputEmailGuarantor");
            console.log(error);
            return false;
        }
    }

    public async inputPhoneNumberGuarantor(PhoneNumber: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtPhoneNumberGuarantor);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.txtPhoneNumberGuarantor, PhoneNumber);
            return true;
        } catch (error) {
            console.log("inputPhoneNumberGuarantor");
            console.log(error);
            return false;
        }
    }
    //#endregion


    //#region 2. Third party attorney section
    public async inputCompanyNameThirdParty(CompanyName: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtCompanyNameThirdParty);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.txtCompanyNameThirdParty, CompanyName);
            return true;
        } catch (error) {
            console.log("inputCompanyNameThirdParty");
            console.log(error);
            return false;
        }
    }
    public async inputAddressThirdParty(Address: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtAddressThirdParty);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.txtAddressThirdParty, Address);
            return true;
        } catch (error) {
            console.log("inputAddressThirdParty");
            console.log(error);
            return false;
        }
    }
    public async inputPostcodeThirdParty(Postcode: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtPostcodeThirdParty);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.txtPostcodeThirdParty, Postcode);
            return true;
        } catch (error) {
            console.log("inputPostcodeThirdParty");
            console.log(error);
            return false;
        }
    }
    public async inputCityThirdParty(City: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtCityThirdParty);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.txtCityThirdParty, City);
            return true;
        } catch (error) {
            console.log("inputCityThirdParty");
            console.log(error);
            return false;
        }
    }
    public async inputPhoneNumberThirdParty(PhoneNumber: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtPhoneNumberThirdParty);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.txtPhoneNumberThirdParty, PhoneNumber);
            return true;
        } catch (error) {
            console.log("inputPhoneNumberThirdParty");
            console.log(error);
            return false;
        }
    }
    public async inputFaxThirdParty(Fax: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtFaxThirdParty);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.txtFaxThirdParty, Fax);
            return true;
        } catch (error) {
            console.log("inputFaxThirdParty");
            console.log(error);
            return false;
        }
    }
    public async inputEmailThirdParty(Email: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtEmailThirdParty);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.txtEmailThirdParty, Email);
            return true;
        } catch (error) {
            console.log("inputEmailThirdParty");
            console.log(error);
            return false;
        }
    }
    public async inputWebsiteThirdParty(Website: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtWebsiteThirdParty);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.txtWebsiteThirdParty, Website);
            return true;
        } catch (error) {
            console.log("inputWebsiteThirdParty");
            console.log(error);
            return false;
        }
    }
    //#endregion

}