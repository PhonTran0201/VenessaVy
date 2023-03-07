import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { ValidateField } from "../../../../../shared/classes";
import { logInfoMessage, logWarningMessage, selectDropdownOption, selectDropdownOption_v2, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";
import { toastError } from "../../../../../shared/variables";

export class AccountForm extends BasePage {

    //#region Locator of elements on "Account person" form
    // Basic information
    protected cmbOrganizationPersonForm = By.xpath("//*[contains(local-name(),'form') and contains(local-name(),'customer')]//div[./label[text()=' Organization ']]//input");
    protected txtNIN = By.xpath("//*[contains(local-name(),'form') and contains(local-name(),'customer')]//input[contains(@class,'pgs-json-schema-control-nin')]");
    protected txtFirstName = By.xpath("//*[contains(local-name(),'form') and contains(local-name(),'customer')]//input[contains(@class,'pgs-json-schema-control-first-name')]");
    protected txtLastName = By.xpath("//*[contains(local-name(),'form') and contains(local-name(),'customer')]//input[contains(@class,'pgs-json-schema-control-last-name')]");
    protected dtpDOB = By.xpath("//*[contains(local-name(),'form') and contains(local-name(),'customer')]//input[contains(@class,'pgs-json-schema-control-dob')]");
    protected cmbGender = By.xpath("//*[contains(local-name(),'form') and contains(local-name(),'customer')]//ng-select[contains(@class,'pgs-json-schema-control-gender')]//input");
    protected txtAddress = By.xpath("//*[contains(local-name(),'form') and contains(local-name(),'customer')]//input[contains(@class,'pgs-json-schema-control-address')]");
    protected txtPostcode = By.xpath("//*[contains(local-name(),'form') and contains(local-name(),'customer')]//input[contains(@class,'pgs-json-schema-control-postcode')]"); //*[@id="pgs-json-schema-control-Postcode"]
    protected txtCity = By.xpath("//*[contains(local-name(),'form') and contains(local-name(),'customer')]//input[contains(@class,'pgs-json-schema-control-city')]");
    protected cmbCountry = By.xpath("//*[contains(local-name(),'form') and contains(local-name(),'customer')]//ng-select[contains(@class,'pgs-json-schema-control-country')]//input");
    protected txtEmailAddress = By.xpath("//*[contains(local-name(),'form') and contains(local-name(),'customer')]//input[contains(@class,'pgs-json-schema-control-email-address')]");
    protected txtPhoneNumber = By.xpath("//*[contains(local-name(),'form') and contains(local-name(),'customer')]//input[contains(@class,'pgs-json-schema-control-phone-number')]");
    protected cmbPreferredCommunication = By.xpath("//*[contains(local-name(),'form') and contains(local-name(),'customer')]//ng-select[contains(@class,'pgs-json-schema-control-preferred-communication')]//input");
    protected cmbStatus = By.xpath("//*[contains(local-name(),'form') and contains(local-name(),'customer')]//ng-select[contains(@class,'pgs-json-schema-control-status')]//input");

    //Other information
    protected cmbKAM = By.xpath("//*[contains(local-name(),'form') and contains(local-name(),'customer')]//ng-select[contains(@class,'pgs-json-schema-control-kam')]//input");
    protected txtPaymentRemarks = By.xpath("//*[contains(local-name(),'form') and contains(local-name(),'customer')]//div[./label[text()=' Payment Remarks ' or text()=' Payment remarks ']]//input[@id]");
    protected cmbPaymentType = By.xpath("//*[contains(local-name(),'form') and contains(local-name(),'customer')]//ng-select[contains(@class,'pgs-json-schema-control-payment-type')]//input");
    protected cmbPaymentFrequency = By.xpath("//*[contains(local-name(),'form') and contains(local-name(),'customer')]//ng-select[contains(@class,'pgs-json-schema-control-payment-frequency')]//input");
    protected cmbPreferredCollectionDate = By.xpath("//*[contains(local-name(),'form') and contains(local-name(),'customer')]//ng-select[contains(@class,'pgs-json-schema-control-preferred-collection-date')]//input");

    protected cmbConvertFromExistingAccount = By.xpath("//*[contains(local-name(),'form') and contains(local-name(),'customer')]//div[./label[text()=' Convert From Existing Account ']]//input");
    //#endregion

    //#region Locator of elements on "Account company" form

    //Basic information
    protected cmbOrganizationCompanyForm = By.xpath("//app-customer-commercial-form//div[./label[text()=' Organization ']]//input");
    protected txtOrgNo = By.xpath("//*[contains(local-name(),'form') and contains(local-name(),'customer')]//input[contains(@class,'pgs-json-schema-control-org.-no')]");
    protected btnSearchOrgNo = By.xpath("//*[contains(local-name(),'form') and contains(local-name(),'customer')]//*[./input[contains(@class,'pgs-json-schema-control-org.-no')]]//*[contains(@class,'fa-search')]");
    protected txtCompanyName = By.xpath("//*[contains(local-name(),'form') and contains(local-name(),'customer')]//input[contains(@class,'pgs-json-schema-control-company-name')]");
    protected txtEmailAddressCompany = By.xpath("//*[contains(local-name(),'form') and contains(local-name(),'customer')]//input[contains(@class,'pgs-json-schema-control-email-address')]");
    protected txtCompanyPhone = By.xpath("//*[contains(local-name(),'form') and contains(local-name(),'customer')]//input[contains(@class,'pgs-json-schema-control-company-phone')]");
    protected cmbStatusCompany = By.xpath("//*[contains(local-name(),'form') and contains(local-name(),'customer')]//ng-select[contains(@class,'pgs-json-schema-control-status')]//input");
    protected cmbCountryCompany = By.xpath("//*[contains(local-name(),'form') and contains(local-name(),'customer')]//ng-select[contains(@class,'pgs-json-schema-control-country')]//input");
    protected cmbDistributionMethodCompany = By.xpath("//ng-select[contains(@class,'pgs-json-schema-control-distribution-method')]//input");
    protected txtInvoiceEmail = By.xpath("//*[contains(local-name(),'form') and contains(local-name(),'customer')]//formly-field[contains(@class,'pgs-json-schema-control-invoice-email')]//input");
    protected cmbContactPerson = By.xpath("//*[contains(local-name(),'form') and contains(local-name(),'customer')]//ng-select[contains(@class,'pgs-json-schema-control-contact-person')]//input");


    //Address
    protected txtVisitingAddress = By.xpath("//*[contains(local-name(),'form') and contains(local-name(),'customer')]//input[contains(@class,'pgs-json-schema-control-visiting-address')]");
    protected txtVisitingExtraAddress = By.xpath("(//*[contains(local-name(),'form') and contains(local-name(),'customer')]//input[contains(@class,'pgs-json-schema-control-extra-address')])[1]");
    protected txtVisitingPostcode = By.xpath("(//*[contains(local-name(),'form') and contains(local-name(),'customer')]//input[contains(@class,'pgs-json-schema-control-postcode')])[1]");
    protected txtVisitingCity = By.xpath("(//*[contains(local-name(),'form') and contains(local-name(),'customer')]//input[contains(@class,'pgs-json-schema-control-city')])[1]");
    protected txtPostalAddress = By.xpath("//*[contains(local-name(),'form') and contains(local-name(),'customer')]//input[contains(@class,'pgs-json-schema-control-postal-address')]");
    protected txtPostalExtraAddress = By.xpath("(//*[contains(local-name(),'form') and contains(local-name(),'customer')]//input[contains(@class,'pgs-json-schema-control-extra-address')])[2]");
    protected txtPostalPostcode = By.xpath("(//*[contains(local-name(),'form') and contains(local-name(),'customer')]//input[contains(@class,'pgs-json-schema-control-postcode')])[2]");
    protected txtPostalCity = By.xpath("(//*[contains(local-name(),'form') and contains(local-name(),'customer')]//input[contains(@class,'pgs-json-schema-control-city')])[2]");
    protected txtInvoiceAddress = By.xpath("//*[contains(local-name(),'form') and contains(local-name(),'customer')]//input[contains(@class,'pgs-json-schema-control-invoice-address')]");
    protected txtInvoiceExtraAddress = By.xpath("(//*[contains(local-name(),'form') and contains(local-name(),'customer')]//input[contains(@class,'pgs-json-schema-control-extra-address')])[3]");
    protected txtInvoicePostcode = By.xpath("(//*[contains(local-name(),'form') and contains(local-name(),'customer')]//input[contains(@class,'pgs-json-schema-control-postcode')])[3]");
    protected txtInvoiceCity = By.xpath("(//*[contains(local-name(),'form') and contains(local-name(),'customer')]//input[contains(@class,'pgs-json-schema-control-city')])[3]");

    //Other information
    protected txtCreditScore = By.xpath("//*[contains(local-name(),'form') and contains(local-name(),'customer')]//input[contains(@class,'pgs-json-schema-control-credit-score')]");
    protected cmbCreditRating = By.xpath("//*[contains(local-name(),'form') and contains(local-name(),'customer')]//ng-select[contains(@class,'pgs-json-schema-control-credit-rating')]//input");
    protected cmbIndustryCode = By.xpath("//*[contains(local-name(),'form') and contains(local-name(),'customer')]//ng-select[contains(@class,'pgs-json-schema-control-industry-code')]//input");
    protected cmbIndustry = By.xpath("//*[contains(local-name(),'form') and contains(local-name(),'customer')]//ng-select[contains(@class,'pgs-json-schema-control-industry') and not(contains(@class,'industry-code'))]//input");

    protected cmbEducationaLevel = By.xpath("//*[contains(local-name(),'form') and contains(local-name(),'customer')]//ng-select[contains(@class,'pgs-json-schema-control-educational-level')]//input");
    protected dtpCompanyRegistrationDate = By.xpath("//*[contains(local-name(),'form') and contains(local-name(),'customer')]//input[contains(@class,'pgs-json-schema-control-company-registration-date')]");
    protected cmbKAMCompany = By.xpath("//app-customer-commercial-form//ng-select[contains(@class,'pgs-json-schema-control-kam')]//input");
    protected cmbPreferredCollectionDateCompany = By.xpath("//*[contains(local-name(),'form') and contains(local-name(),'customer')]//ng-select[contains(@class,'pgs-json-schema-control-preferred-collection-date')]//input");

    protected cmbPaymentTypeCompany = By.xpath("//*[contains(local-name(),'form') and contains(local-name(),'customer')]//ng-select[contains(@class,'pgs-json-schema-control-payment-type')]//input");
    protected cmbPaymentFrequencyCompany = By.xpath("//*[contains(local-name(),'form') and contains(local-name(),'customer')]//ng-select[contains(@class,'pgs-json-schema-control-payment-frequency')]//input");

    protected cmbScoringCompany = By.xpath("//*[contains(local-name(),'form') and contains(local-name(),'customer')]//*[@id='json-schema-control-Scoring']//input");
    protected cmbSourceCompany = By.xpath("//*[contains(local-name(),'form') and contains(local-name(),'customer')]//*[@id='json-schema-control-Source']//input");


    //#endregion

    //#region Xpaths at Contact list on Account form

    private btnAddContact = By.xpath("//*[@id='pgs-cus-c-f-add-contact-btn']");

    //#endregion

    //#region xpath of elements value 
    //Basic Information
    protected cmbOrganizationValue = By.xpath("//app-customer-commercial-form//label[contains(text(),'Organization')]/following-sibling::*//span[contains(@class,'ng-value-label')]");
    protected cmbGenderValue = By.xpath("//label[contains(text(),'Gender')]/following-sibling::*//span[contains(@class,'ng-value-label')]");
    protected cmbCountryValue = By.xpath("//*[contains(local-name(),'form')]//*[contains(@class,'pgs-json-schema-control-country')]//span[contains(@class,'ng-value-label')]");
    protected cmbPreferredCommunicationValue = By.xpath("//label[contains(text(),'Preferred Communication')]/following-sibling::*//span[contains(@class,'ng-value-label')]");
    protected cmbStatusValue = By.xpath("//*[contains(local-name(),'form')]//*[contains(@class,'pgs-json-schema-control-status')]//span[contains(@class,'ng-value-label')]");
    //Other Information
    protected cmbCreditRatingCompanyValue = By.xpath("//label[contains(text(),' Credit rating ')]/following-sibling::*//span[contains(@class,'ng-value-label')]");
    protected cmbIndustryCodeCompanyValue = By.xpath("//label[contains(text(),'Industry code')]/following-sibling::*//span[contains(@class,'ng-value-label')]");
    protected cmbIndustryCompanyValue = By.xpath("//label[text() = ' Industry ']/following-sibling::*//span[contains(@class,'ng-value-label')]");
    protected cmbEducationaLevelValue = By.xpath("//label[contains(text(),' Educational level ')]/following-sibling::*//span[contains(@class,'ng-value-label')]");
    protected cmbKAMValue = By.xpath("//label[contains(text(),'KAM')]/following-sibling::*//span[contains(@class,'ng-value-label')]");
    protected cmbPaymentTypeValue = By.xpath("//label[contains(text(),'Payment Type')]/following-sibling::*//span[contains(@class,'ng-value-label')]");
    protected cmbPaymentFrequencyValue = By.xpath("//label[contains(text(),'Payment Frequency')]/following-sibling::*//span[contains(@class,'ng-value-label')]");
    protected cmbPreferredCollectionDateValue = By.xpath("//label[contains(text(),'Preferred Collection Date')]/following-sibling::*//span[contains(@class,'ng-value-label')]");
    //#endregion

    //#region Xpath of Checkbox Create Sale and contact on account form
    private cbxCreateSalesOpportunity = By.xpath("//*[contains(local-name(),'form') and contains(local-name(),'customer')]//label[./input[@id='pgs-cus-confirm-create-sales']]");
    private cbxCreateContact = By.xpath("//*[contains(local-name(),'form') and contains(local-name(),'customer')]//label[./input[@id='pgs-cus-confirm-create-contacts']]");
    //#endregion

    //#region input data into Account person form for each field
    public async inputOrganizationAccountPersonForm(Organization: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbOrganizationPersonForm);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.cmbOrganizationPersonForm, Organization);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await selectDropdownOption(Organization, "", this.driverService);
            return true;
        } catch (error) {
            console.log("inputOrganizationAccountPersonForm");
            console.log(error);
            return false;
        }
    }

    public async inputNINBasicInformationAccountPersonForm(NIN: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtNIN);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            if (await this.driverService.canBeSetText(this.txtNIN)) {
                await this.driverService.setText(this.txtNIN, NIN);
            }
            return true;
        } catch (error) {
            console.log("inputNINBasicInformationAccountPersonForm");
            console.log(error);
            return false;
        }
    }

    public async inputFirstNameBasicInformationAccountPersonForm(FirstName: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtFirstName);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.txtFirstName, FirstName);
            return true;
        } catch (error) {
            console.log("inputFirstNameBasicInformationAccountPersonForm");
            console.log(error);
            return false;
        }
    }

    public async inputLastNameBasicInformationAccountPersonForm(LastName: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtLastName);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.txtLastName, LastName);
            return true;
        } catch (error) {
            console.log("inputLastNameBasicInformationAccountPersonForm");
            console.log(error);
            return false;
        }
    }

    public async inputDOBBasicInformationAccountPersonForm(DOB: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.dtpDOB);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.dtpDOB, DOB);
            return true;
        } catch (error) {
            console.log("inputDOBBasicInformationAccountPersonForm");
            console.log(error);
            return false;
        }
    }

    public async inputGenderBasicInformationAccountPersonForm(Gender: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbGender);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.cmbGender, Gender);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await selectDropdownOption(Gender, "", this.driverService);
            return true;
        } catch (error) {
            console.log("inputGenderBasicInformationAccountPersonForm");
            console.log(error);
            return false;
        }
    }

    public async inputAddressBasicInformationAccountPersonForm(Address: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtAddress);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.txtAddress, Address);
            return true;
        } catch (error) {
            console.log("inputAddressBasicInformationAccountPersonForm");
            console.log(error);
            return false;
        }
    }

    public async inputPostcodeBasicInformationAccountPersonForm(Postcode: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtPostcode);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.txtPostcode, Postcode);
            return true;
        } catch (error) {
            console.log("inputPostcodeBasicInformationAccountPersonForm");
            console.log(error);
            return false;
        }
    }

    public async inputCityBasicInformationAccountPersonForm(City: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtCity);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.txtCity, City);
            return true;
        } catch (error) {
            console.log("inputCityBasicInformationAccountPersonForm");
            console.log(error);
            return false;
        }
    }

    public async inputCountryBasicInformationAccountPersonForm(Country: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbCountry);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.cmbCountry, Country);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await selectDropdownOption(Country, "", this.driverService);
            return true;
        } catch (error) {
            console.log("inputCountryBasicInformationAccountPersonForm");
            console.log(error);
            return false;
        }
    }

    public async inputEmailAddressBasicInformationAccountPersonForm(EmailAddress: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtEmailAddress);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.txtEmailAddress, EmailAddress);
            return true;
        } catch (error) {
            console.log("inputEmailAddressBasicInformationAccountPersonForm");
            console.log(error);
            return false;
        }
    }

    public async inputPhoneNumberBasicInformationAccountPersonForm(PhoneNumber: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtPhoneNumber);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.txtPhoneNumber, PhoneNumber);
            return true;
        } catch (error) {
            console.log("inputPhoneNumberBasicInformationAccountPersonForm");
            console.log(error);
            return false;
        }
    }

    public async inputPreferredCommunicationBasicInformationAccountPersonForm(PreferredCommunication: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbPreferredCommunication);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.cmbPreferredCommunication, PreferredCommunication);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await selectDropdownOption(PreferredCommunication, "", this.driverService);
            return true;
        } catch (error) {
            console.log("inputPreferredCommunicationBasicInformationAccountPersonForm");
            console.log(error);
            return false;
        }
    }

    public async inputStatusBasicInformationAccountPersonForm(Status: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbStatus);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.cmbStatus, Status);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await selectDropdownOption(Status, "", this.driverService);
            return true;
        } catch (error) {
            console.log("inputStatusBasicInformationAccountPersonForm");
            console.log(error);
            return false;
        }
    }


    public async inputKAMOtherInformationAccountPersonForm(KAM: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbKAM);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.cmbKAM, KAM);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await selectDropdownOption_v2(KAM, "", this.driverService);
            return true;
        } catch (error) {
            console.log("inputKAMOtherInformationAccountPersonForm");
            console.log(error);
            return false;
        }
    }

    public async inputPaymentRemarksOtherInformationAccountPersonForm(value: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.txtPaymentRemarks);
            await this.driverService.setText(this.txtPaymentRemarks, value);
            return true;
        } catch (error) {
            console.log('inputPaymentRemarksOtherInformationAccountPersonForm');
            console.log(error);
            return false;
        }
    }

    public async inputPaymentTypeOtherInformationAccountPersonForm(PaymentType: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbPaymentType);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.cmbPaymentType, PaymentType);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await selectDropdownOption(PaymentType, "", this.driverService);
            return true;
        } catch (error) {
            console.log("inputPaymentTypeOtherInformationAccountPersonForm");
            console.log(error);
            return false;
        }
    }

    public async inputPaymentFrequencyOtherInformationAccountPersonForm(PaymentFrequency: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbPaymentFrequency);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.cmbPaymentFrequency, PaymentFrequency);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await selectDropdownOption(PaymentFrequency, "", this.driverService);
            return true;
        } catch (error) {
            console.log("inputPaymentFrequencyOtherInformationAccountPersonForm");
            console.log(error);
            return false;
        }
    }

    public async inputPreferredCollectionDateOtherInformationAccountPersonForm(PreferredCollectionDate: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbPreferredCollectionDate);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.cmbPreferredCollectionDate, PreferredCollectionDate);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await selectDropdownOption(PreferredCollectionDate, "", this.driverService);
            return true;
        } catch (error) {
            console.log("inputPreferredCollectionDateOtherInformationAccountPersonForm");
            console.log(error);
            return false;
        }
    }

    public async inputConvertFromExistingAccountOtherInformationAccountPersonForm(ConvertFromExistingAccount: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbConvertFromExistingAccount);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.cmbConvertFromExistingAccount, ConvertFromExistingAccount);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await selectDropdownOption(ConvertFromExistingAccount, "", this.driverService);
            return true;
        } catch (error) {
            console.log("inputConvertFromExistingAccountOtherInformationAccountPersonForm");
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region input data into Account company form for each field

    //#region BASIC INFORMATION

    public async inputOrganizationAccountCompanyForm(Organization: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbOrganizationCompanyForm);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            if (await this.driverService.canBeSetText(this.cmbOrganizationCompanyForm)) {
                await this.driverService.setText(this.cmbOrganizationCompanyForm, Organization);
                await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
                await selectDropdownOption(Organization, "", this.driverService);
            }
            return true;
        } catch (error) {
            console.log("inputOrganizationAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async inputOrgNoBasicInformationAccountCompanyForm(orgNo: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtOrgNo);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            if (await this.driverService.canBeSetText(this.txtOrgNo)) await this.driverService.setText(this.txtOrgNo, orgNo);
            return true;
        } catch (error) {
            console.log("inputOrgNoBasicInformationAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async inputCompanyNameBasicInformationAccountCompanyForm(companyName: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtCompanyName);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            if (await this.driverService.canBeSetText(this.txtCompanyName)) {
                await this.driverService.setText(this.txtCompanyName, companyName);
            }
            return true;
        } catch (error) {
            console.log("inputCompanyNameBasicInformationAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async inputEmailAddressCompanyBasicInformationAccountCompanyForm(emailAddressCompany: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtEmailAddressCompany);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            if (await this.driverService.canBeSetText(this.txtEmailAddressCompany)) await this.driverService.setText(this.txtEmailAddressCompany, emailAddressCompany);
            return true;
        } catch (error) {
            console.log("inputEmailAddressCompanyBasicInformationAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async inputCompanyPhoneBasicInformationAccountCompanyForm(companyPhone: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtCompanyPhone);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            if (await this.driverService.canBeSetText(this.txtCompanyPhone)) await this.driverService.setText(this.txtCompanyPhone, companyPhone);
            return true;
        } catch (error) {
            console.log("inputCompanyPhoneBasicInformationAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async inputStatusCompanyBasicInformationAccountCompanyForm(statusCompany: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbStatusCompany);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            if (await this.driverService.canBeSetText(this.cmbStatusCompany)) {
                await this.driverService.setText(this.cmbStatusCompany, statusCompany);
                await selectDropdownOption(statusCompany, "", this.driverService);
            }
            return true;
        } catch (error) {
            console.log("inputStatusCompanyBasicInformationAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async inputCountryCompanyBasicInformationAccountCompanyForm(countryCompany: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbCountryCompany);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            if (await this.driverService.canBeSetText(this.cmbCountryCompany)) {
                await this.driverService.setText(this.cmbCountryCompany, countryCompany);
                await selectDropdownOption(countryCompany, "", this.driverService);
            }
            return true;
        } catch (error) {
            console.log("inputCountryCompanyBasicInformationAccountCompanyForm");
            console.log(error);
            return false;
        }
    }
    public async inputDistributionMethodCompanyBasicInformationAccountCompanyForms(DistributionMethodCompany: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtCompanyName);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            if (await this.driverService.isExisted(this.cmbDistributionMethodCompany) && await this.driverService.canBeSetText(this.cmbDistributionMethodCompany)) {
                await this.driverService.setText(this.cmbDistributionMethodCompany, DistributionMethodCompany);
                await selectDropdownOption(DistributionMethodCompany, "", this.driverService);
            }
            return true;
        } catch (error) {
            console.log("inputDistributionMethodCompanyBasicInformationAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async inputInvoiceEmailBasicInformationAccountCompanyForm(InvoiceEmail: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtInvoiceEmail);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            if (await this.driverService.canBeSetText(this.txtInvoiceEmail)) await this.driverService.setText(this.txtInvoiceEmail, InvoiceEmail);
            return true;
        } catch (error) {
            console.log("inputInvoiceEmailBasicInformationAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async inputContactPersonBasicInformationAccountCompanyForm(ContactPerson: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbContactPerson);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            if (await this.driverService.canBeSetText(this.cmbContactPerson)) {
                await this.driverService.setText(this.cmbContactPerson, ContactPerson);
                await selectDropdownOption(ContactPerson, "", this.driverService);
            }
            return true;
        } catch (error) {
            console.log("inputContactPersonBasicInformationAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    //#endregion

    //#region ADDRESS

    //Visiting Address
    public async inputVisitingAddress_Address_AccountCompanyForm(visitingAddress: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtVisitingAddress);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            if (await this.driverService.canBeSetText(this.txtVisitingAddress)) await this.driverService.setText(this.txtVisitingAddress, visitingAddress);
            return true;
        } catch (error) {
            console.log("inputVisitingAddress_Address_AccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async inputVisitingExtraAddress_Address_AccountCompanyForm(visitingExtraAddress: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtVisitingExtraAddress);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            if (await this.driverService.canBeSetText(this.txtVisitingExtraAddress)) await this.driverService.setText(this.txtVisitingExtraAddress, visitingExtraAddress);
            return true;
        } catch (error) {
            console.log("inputVisitingExtraAddress_Address_AccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async inputVisitingPostcodeAddressAccountCompanyForm(visitingPostcode: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtVisitingPostcode);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            if (await this.driverService.canBeSetText(this.txtVisitingPostcode)) await this.driverService.setText(this.txtVisitingPostcode, visitingPostcode);
            return true;
        } catch (error) {
            console.log("inputVisitingPostcodeAddressAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async inputVisitingCityAddressAccountCompanyForm(VisitingCity: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtVisitingCity);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            if (await this.driverService.canBeSetText(this.txtVisitingCity)) await this.driverService.setText(this.txtVisitingCity, VisitingCity);
            return true;
        } catch (error) {
            console.log("inputVisitingCityAddressAccountCompanyForm");
            console.log(error);
            return false;
        }
    }


    //Postal Address
    public async inputPostalAddress_Address_AccountCompanyForm(PostalAddress: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtPostalAddress);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            if (await this.driverService.canBeSetText(this.txtPostalAddress)) await this.driverService.setText(this.txtPostalAddress, PostalAddress);
            return true;
        } catch (error) {
            console.log("inputPostalAddress_Address_AccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async inputPostalExtraAddress_Address_AccountCompanyForm(PostalExtraAddress: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtPostalExtraAddress);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            if (await this.driverService.canBeSetText(this.txtPostalExtraAddress)) await this.driverService.setText(this.txtPostalExtraAddress, PostalExtraAddress);
            return true;
        } catch (error) {
            console.log("inputPostalExtraAddress_Address_AccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async inputPostalPostcodeAddressAccountCompanyForm(postalPostcode: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtPostalPostcode);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            if (await this.driverService.canBeSetText(this.txtPostalPostcode)) await this.driverService.setText(this.txtPostalPostcode, postalPostcode);
            return true;
        } catch (error) {
            console.log("inputPostalPostcodeAddressAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async inputPostalCityAddressAccountCompanyForm(PostalCity: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtPostalCity);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            if (await this.driverService.canBeSetText(this.txtPostalCity)) await this.driverService.setText(this.txtPostalCity, PostalCity);
            return true;
        } catch (error) {
            console.log("inputPostalCityAddressAccountCompanyForm");
            console.log(error);
            return false;
        }
    }


    //Invoice Address
    public async inputInvoiceAddress_Address_AccountCompanyForm(InvoiceAddress: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtInvoiceAddress);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            if (await this.driverService.canBeSetText(this.txtInvoiceAddress)) await this.driverService.setText(this.txtInvoiceAddress, InvoiceAddress);
            return true;
        } catch (error) {
            console.log("inputInvoiceAddress_Address_AccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async inputInvoiceExtraAddress_Address_AccountCompanyForm(InvoiceExtraAddress: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtInvoiceExtraAddress);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            if (await this.driverService.canBeSetText(this.txtInvoiceExtraAddress)) await this.driverService.setText(this.txtInvoiceExtraAddress, InvoiceExtraAddress);
            return true;
        } catch (error) {
            console.log("inputInvoiceExtraAddress_Address_AccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async inputInvoicePostcodeAddressAccountCompanyForm(InvoicePostcode: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtInvoicePostcode);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            if (await this.driverService.canBeSetText(this.txtInvoicePostcode)) await this.driverService.setText(this.txtInvoicePostcode, InvoicePostcode);
            return true;
        } catch (error) {
            console.log("inputInvoicePostcodeAddressAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async inputInvoiceCityAddressAccountCompanyForm(InvoiceCity: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtInvoiceCity);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            if (await this.driverService.canBeSetText(this.txtInvoiceCity)) await this.driverService.setText(this.txtInvoiceCity, InvoiceCity);
            return true;
        } catch (error) {
            console.log("inputInvoiceCityAddressAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    //#endregion

    //#region OTHER INFORMATION
    public async inputCreditScoreOtherInformationAccountCompanyForm(CreditScore: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtCreditScore);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            if (await this.driverService.canBeSetText(this.txtCreditScore)) await this.driverService.setText(this.txtCreditScore, CreditScore);
            return true;
        } catch (error) {
            console.log("inputCreditScoreOtherInformationAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async inputCreditRatingOtherInformationAccountCompanyForm(CreditRating: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbCreditRating);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            if (await this.driverService.canBeSetText(this.cmbCreditRating)) {
                await this.driverService.setText(this.cmbCreditRating, CreditRating);
                await selectDropdownOption(CreditRating, "", this.driverService);
            }
            return true;
        } catch (error) {
            console.log("inputCreditRatingOtherInformationAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async inputIndustryCodeOtherInformationAccountCompanyForm(IndustryCode: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbIndustryCode);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            if (await this.driverService.canBeSetText(this.cmbIndustryCode)) {
                await this.driverService.setText(this.cmbIndustryCode, IndustryCode);
                await selectDropdownOption(IndustryCode, "", this.driverService);
            }
            return true;
        } catch (error) {
            console.log("inputIndustryCodeOtherInformationAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async inputIndustryOtherInformationAccountCompanyForm(Industry: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbIndustry);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            if (await this.driverService.canBeSetText(this.cmbIndustry)) {
                await this.driverService.setText(this.cmbIndustry, Industry);
                await selectDropdownOption(Industry, "", this.driverService);
            }
            return true;
        } catch (error) {
            console.log("inputIndustryOtherInformationAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async inputEducationLevelOtherInformationAccountCompanyForm(EducationalLevel: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbEducationaLevel);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            if (await this.driverService.canBeSetText(this.cmbEducationaLevel)) {
                await this.driverService.setText(this.cmbEducationaLevel, EducationalLevel);
                await selectDropdownOption(EducationalLevel, "", this.driverService);
            }
            return true;
        } catch (error) {
            console.log("inputEducationLevelOtherInformationAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async inputCompanyRegistrationDateOtherInformationAccountCompanyForm(CompanyRegistrationDate: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.dtpCompanyRegistrationDate);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            if (await this.driverService.canBeSetText(this.dtpCompanyRegistrationDate)) await this.driverService.setText(this.dtpCompanyRegistrationDate, CompanyRegistrationDate);
            return true;
        } catch (error) {
            console.log("inputCompanyRegistrationDateOtherInformationAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async inputKAMOtherInformationAccountCompanyForm(KAMCompany: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbKAMCompany);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            if (await this.driverService.canBeSetText(this.cmbKAMCompany)) {
                await this.driverService.setText(this.cmbKAMCompany, KAMCompany);
                await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
                await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
                await selectDropdownOption_v2(KAMCompany, "", this.driverService);
            }
            return true;
        } catch (error) {
            console.log("inputKAMOtherInformationAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async inputPreferredCollectionDateOtherInformationAccountCompanyForm(PreferredCollectionDate: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbPreferredCollectionDateCompany);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            if (await this.driverService.canBeSetText(this.cmbPreferredCollectionDateCompany)) {
                await this.driverService.setText(this.cmbPreferredCollectionDateCompany, PreferredCollectionDate);
                await selectDropdownOption(PreferredCollectionDate, "", this.driverService);
            }
            return true;
        } catch (error) {
            console.log("inputPreferredCollectionDateOtherInformationAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async inputPaymentRemarksOtherInformationAccountCompanyForm(value: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.txtPaymentRemarks);
            await this.driverService.setText(this.txtPaymentRemarks, value);
            return true;
        } catch (error) {
            console.log('inputPaymentRemarksOtherInformationAccountCompanyForm');
            console.log(error);
            return false;
        }
    }

    public async inputPaymentTypeOtherInformationAccountCompanyForm(PaymentType: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbPaymentTypeCompany);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            if (await this.driverService.canBeSetText(this.cmbPaymentTypeCompany)) {
                await this.driverService.setText(this.cmbPaymentTypeCompany, PaymentType);
                await selectDropdownOption(PaymentType, "", this.driverService);
            }
            return true;
        } catch (error) {
            console.log("inputPaymentTypeOtherInformationAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async inputPaymentFrequencyOtherInformationAccountCompanyForm(PaymentFrequency: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbPaymentFrequencyCompany);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            if (await this.driverService.canBeSetText(this.cmbPaymentFrequencyCompany)) {
                await this.driverService.setText(this.cmbPaymentFrequencyCompany, PaymentFrequency);
                await selectDropdownOption(PaymentFrequency, "", this.driverService);
            }
            return true;
        } catch (error) {
            console.log("inputPaymentFrequencyOtherInformationAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    //#endregion

    //#endregion

    //#endregion

    //#region  Clear old data on Account form
    public async clearOldDataOnAccountForm() {
        try {
            const accountForm = By.xpath("//*[self::app-customer-commercial-form or self::app-customer-personal-form]");
            await this.driverService.waitUntilElementLoaded(accountForm);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            const btnClear = By.xpath("//*[self::app-customer-commercial-form or self::app-customer-personal-form]//div[contains(@class,'modal-body')]//*[contains(@class,'btn-clear') or @title='Clear all'][./i[not(contains(@class,'search'))]]");
            for (let i = 1; i < 100; i++) {
                if (await this.driverService.isExisted(btnClear)) {
                    try {
                        await this.driverService.click(btnClear);
                    } catch (error) {
                        continue;
                    }
                }
            }
            return true;
        } catch (error) {
            console.log('clearOldDataOnAccountForm');
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region Contact list on Account form
    public async openAddContactForm() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnAddContact);
            await this.driverService.pressEnter(this.txtEmailAddress);
            await this.driverService.click(this.txtEmailAddress);
            //to collapse all cmb dropping down
            await this.driverService.click(this.btnAddContact);
            return true;
        } catch (error) {
            console.log("openAddContactForm");
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region Checkbox on Account form
    public async checkCreateSalesOpportunityOnAccountForm() {
        try {
            await this.driverService.waitUntilElementLoaded(this.cbxCreateSalesOpportunity);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.click(this.cbxCreateSalesOpportunity);
            return true;
        } catch (error) {
            console.log('checkCreateSalesOpportunityOnAccountForm');
            console.log(error);
            return false;
        }
    }
    public async checkCreateContactOnAccountForm() {
        try {
            await this.driverService.waitUntilElementLoaded(this.cbxCreateContact);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.click(this.cbxCreateContact);
            return true;
        } catch (error) {
            console.log('checkCreateContactOnAccountForm');
            console.log(error);
            return false;
        }
    }
    //#endregion
    //#region Assert/ Validate value on Account form
    public async assertFilledConvertLead(
        firstname: string,
        lastname: string,
        address: string,
        postcode: string,
        city: string,
        country: string,
        email: string,
        phone: string
    ) {
        let actualFirstName: string = "";
        let actualLastName: string = "";
        let actualAddress: string = "";
        let actualPostCode: string = "";
        let actualCity: string = "";
        let actualCountry: string = "";
        let actualEmail: string = "";
        let actualPhone: string = "";

        try {
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await this.driverService.waitForSeconds(2000);
            await this.driverService.waitUntilElementLoaded(this.txtFirstName);
            actualFirstName = await this.driverService.getText(this.txtFirstName);
            actualLastName = await this.driverService.getText(this.txtLastName);
            actualAddress = await this.driverService.getText(this.txtAddress);
            actualPostCode = await this.driverService.getText(this.txtPostcode);
            actualCity = await this.driverService.getText(this.txtCity);
            actualCountry = await this.driverService.getText(this.cmbCountry);
            actualEmail = await this.driverService.getText(this.txtEmailAddress);
            actualPhone = await this.driverService.getText(this.txtPhoneNumber);

        } catch (error) {
            console.log("Assert convert lead to person");
            console.log(error);
        }

        await this.driverService.validateTestCase(
            "Convert lead successfully!",
            [actualFirstName, firstname, "Assert at First Name field"],
            [actualLastName, lastname, "Assert at Last Name field"],
            [actualAddress, address, "Assert at Address Field"],
            [actualPostCode, postcode, "Assert at Post Code Field"],
            [actualCity, city, "Assert at City Field"],
            [actualCountry, country, "Assert at Country Field"],
            [actualEmail, email, "Assert at Email Field"],
            [actualPhone, phone, "Assert at Phone Field"]
        );
    }

    public async validateSearchAndFilterAtCompanyAccount(
        Name: string,
        OrgNo_NIN: string,
        Email: string,
        Phone: string,
        KAM: string,
        Status: string,
        Type: string,
        Address: string,
        Postcode: string,
        City: string,
        Country: string
    ) {
        try {
            logInfoMessage("Validate info at Edit Company form: ");
            let result = true;
            await this.driverService.waitUntilElementLoaded(By.xpath(" //ngb-modal-window"));
            if (Name) {
                let actualCompanyName = await this.driverService.getAttributeValue(this.txtCompanyName, 'value');
                if (!actualCompanyName.toLocaleLowerCase().includes(Name.toLocaleLowerCase())) {
                    logWarningMessage(`Company Name: "${Name}" doesn't get close match with "${actualCompanyName}"!`);
                    result = false;
                }
            }
            if (OrgNo_NIN) {
                let actualOrgNo_NIN = await this.driverService.getAttributeValue(this.txtOrgNo, 'value');
                if (!actualOrgNo_NIN.includes(OrgNo_NIN)) {
                    logWarningMessage(`OrgNo_NIN: "${OrgNo_NIN}" doesn't get close match with "${actualOrgNo_NIN}"!`);
                    result = false;
                }
            }
            if (Email) {
                let actualCompanyEmail = await this.driverService.getAttributeValue(this.txtEmailAddressCompany, 'value');
                if (!actualCompanyEmail.includes(Email)) {
                    logWarningMessage(`Company Email: "${Email}" doesn't get close match with "${actualCompanyEmail}"!`);
                    result = false;
                }
            }
            if (Phone) {
                let actualCompanyPhone = await this.driverService.getAttributeValue(this.txtCompanyPhone, 'value');
                if (!actualCompanyPhone.includes(Phone)) {
                    logWarningMessage(`Company Phone: "${Phone}" doesn't get close match with "${actualCompanyPhone}"!`);
                    result = false;
                }
            }

            if (KAM) {
                let actualCompanyKAM = await this.driverService.getText(By.xpath("//kam-select-widget//span[contains(@class,'ng-value-label')]"));
                if (!actualCompanyKAM.includes(KAM)) {
                    logWarningMessage(`Company KAM: "${KAM}" doesn't get close match with "${actualCompanyKAM}"!`);
                    result = false;
                }
            }

            if (Status) {
                let actualCompanyStatus = await this.driverService.getText(By.xpath("//*[contains(@class,'pgs-json-schema-control-status')]//span[contains(@class,'ng-value-label')]"));
                if (!actualCompanyStatus.includes(Status)) {
                    logWarningMessage(`Company Status: "${Status}" doesn't get close match with "${actualCompanyStatus}"!`);
                    result = false;
                }
            }

            if (Type) {
                if (Type.localeCompare('Person') === 0) {
                    if (!(await this.driverService.isExisted(this.txtFirstName))) {
                        logWarningMessage(`This is NOT Person account!`);
                        result = false;
                    }
                }
                else if (Type.localeCompare('Company') === 0) {
                    if (!(await this.driverService.isExisted(this.txtCompanyName))) {
                        logWarningMessage(`This is NOT Company account!`);
                        result = false;
                    }
                }
                else {
                    logWarningMessage(`Type "${Type} is NOT available!"`);
                    return false;
                }
                return true;
            }
            if (Address) {
                let actualCompanyVisitingAddress = await this.driverService.getAttributeValue(this.txtVisitingAddress, 'value');
                let actualCompanyPostalAddress = await this.driverService.getAttributeValue(this.txtPostalAddress, 'value');
                let actualCompanyInvoiceAddress = await this.driverService.getAttributeValue(this.txtInvoiceAddress, 'value');
                if (!(actualCompanyVisitingAddress.toLocaleLowerCase().includes(Address.toLocaleLowerCase()) || actualCompanyPostalAddress.toLocaleLowerCase().includes(Address.toLocaleLowerCase()) || actualCompanyInvoiceAddress.toLocaleLowerCase().includes(Address.toLocaleLowerCase()))) {
                    logWarningMessage(`Company Address: "${Address}" doesn't get close match with any "${actualCompanyVisitingAddress} , ${actualCompanyPostalAddress} , ${actualCompanyInvoiceAddress}"!`);
                    result = false;
                }
            }

            if (Postcode) {
                let actualCompanyVisitingPostcode = await this.driverService.getAttributeValue(this.txtVisitingPostcode, 'value');
                let actualCompanyPostalPostcode = await this.driverService.getAttributeValue(this.txtPostalPostcode, 'value');
                let actualCompanyInvoicePostcode = await this.driverService.getAttributeValue(this.txtInvoicePostcode, 'value');
                if (!(actualCompanyVisitingPostcode.includes(Postcode) || actualCompanyPostalPostcode.includes(Postcode) || actualCompanyInvoicePostcode.includes(Postcode))) {
                    logWarningMessage(`Company Postcode: "${Postcode}" doesn't get close match with "${actualCompanyVisitingPostcode}" or "${actualCompanyPostalPostcode}" or "${actualCompanyInvoicePostcode}"!`);
                    result = false;
                }
            }

            if (City) {
                let actualCompanyVisitingCity = await this.driverService.getAttributeValue(this.txtVisitingCity, 'value');
                let actualCompanyPostalCity = await this.driverService.getAttributeValue(this.txtPostalCity, 'value');
                let actualCompanyInvoiceCity = await this.driverService.getAttributeValue(this.txtInvoiceCity, 'value');
                if (!(actualCompanyVisitingCity.toLocaleLowerCase().includes(City.toLocaleLowerCase()) || actualCompanyPostalCity.toLocaleLowerCase().includes(City.toLocaleLowerCase()) || actualCompanyInvoiceCity.toLocaleLowerCase().includes(City.toLocaleLowerCase()))) {
                    logWarningMessage(`Company City: "${City}" doesn't get close match with "${actualCompanyVisitingCity}" or "${actualCompanyPostalCity}" or "${actualCompanyInvoiceCity}"!`);
                    result = false;
                }
            }

            if (Country) {
                let actualCompanyCountry = await this.driverService.getText(By.xpath("//*[contains(@class,'pgs-json-schema-control-country')]//span[contains(@class,'ng-value-label')]"));
                if (!actualCompanyCountry.includes(Country)) {
                    logWarningMessage(`Company Country: "${Country}" doesn't get close match with "${actualCompanyCountry}"!`);
                    result = false;
                }
            }

            return result;
        } catch (error) {
            console.log("validateSearchAndFilterAtCompanyAccount");
            console.log(error);
            return false;
        }
    }

    public async validateSearchAndFilterAtPersonAccount(
        Name: string,
        OrgNo_NIN: string,
        Email: string,
        Phone: string,
        KAM: string,
        Status: string,
        Type: string,
        Address: string,
        Postcode: string,
        City: string,
        Country: string
    ) {
        try {
            logInfoMessage("Validate info at Edit Person form: ");
            let result = true;
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            if (Name) {
                let firstName = await this.driverService.getAttributeValue(this.txtFirstName, 'value');
                let lastName = await this.driverService.getAttributeValue(this.txtLastName, 'value');
                let actualPersonName = firstName + ' ' + lastName;
                if (!actualPersonName.toLocaleLowerCase().includes(Name.toLocaleLowerCase())) {
                    logWarningMessage(`Person Name: "${Name}" doesn't get close match with "${actualPersonName}"!`);
                    result = false;
                }
            }
            if (OrgNo_NIN) {
                let actualOrgNo_NIN = await this.driverService.getAttributeValue(this.txtNIN, 'value');
                if (!actualOrgNo_NIN.includes(OrgNo_NIN)) {
                    logWarningMessage(`OrgNo_NIN: "${OrgNo_NIN}" doesn't get close match with "${actualOrgNo_NIN}"!`);
                    result = false;
                }
            }
            if (Email) {
                let actualPersonEmail = await this.driverService.getAttributeValue(this.txtEmailAddress, 'value');
                if (!actualPersonEmail.includes(Email)) {
                    logWarningMessage(`Person Email: "${Email}" doesn't get close match with "${actualPersonEmail}"!`);
                    result = false;
                }
            }
            if (Phone) {
                let actualPersonPhone = await this.driverService.getAttributeValue(this.txtPhoneNumber, 'value');
                if (!actualPersonPhone.includes(Phone)) {
                    logWarningMessage(`Person Phone: "${Phone}" doesn't get close match with "${actualPersonPhone}"!`);
                    result = false;
                }
            }
            if (KAM) {
                let actualPersonKAM = await this.driverService.getText(By.xpath("//kam-select-widget//span[contains(@class,'ng-value-label')]"));
                if (!actualPersonKAM.includes(KAM)) {
                    logWarningMessage(`Person KAM: "${KAM}" doesn't get close match with "${actualPersonKAM}"!`);
                    result = false;
                }
            }

            if (Status) {
                let actualPersonStatus = await this.driverService.getText(By.xpath("//*[contains(@class,'pgs-json-schema-control-status')]//span[contains(@class,'ng-value-label')]"));
                if (!actualPersonStatus.includes(Status)) {
                    logWarningMessage(`Person Status: "${Status}" doesn't get close match with "${actualPersonStatus}"!`);
                    result = false;
                }
            }
            if (Type) {
                if (Type.localeCompare('Person') === 0) {
                    if (!(await this.driverService.isExisted(this.txtFirstName))) {
                        logWarningMessage(`This is NOT Person account!`);
                        result = false;
                    }
                }
                else if (Type.localeCompare('Company') === 0) {
                    if (!(await this.driverService.isExisted(this.txtCompanyName))) {
                        logWarningMessage(`This is NOT Company account!`);
                        result = false;
                    }
                }
                else {
                    logWarningMessage(`Type "${Type} is NOT available!"`);
                    return false;
                }
                return true;
            }


            if (Address) {
                let actualPersonAddress = await this.driverService.getAttributeValue(this.txtAddress, 'value');
                if (!(actualPersonAddress.toLocaleLowerCase().includes(Address.toLocaleLowerCase()))) {
                    logWarningMessage(`Person Address: "${Address}" doesn't get close match with any "${actualPersonAddress}"!`);
                    result = false;
                }
            }

            if (Postcode) {
                let actualPersonPostcode = await this.driverService.getAttributeValue(this.txtPostcode, 'value');
                if (!(actualPersonPostcode.includes(Postcode))) {
                    logWarningMessage(`Person Postcode: "${Postcode}" doesn't get close match with "${actualPersonPostcode}"!`);
                    result = false;
                }
            }

            if (City) {
                let actualPersonCity = await this.driverService.getAttributeValue(this.txtCity, 'value');
                if (!(actualPersonCity.toLocaleLowerCase().includes(City.toLocaleLowerCase()))) {
                    logWarningMessage(`Person City: "${City}" doesn't get close match with "${actualPersonCity}"!`);
                    result = false;
                }
            }

            if (Country) {
                let actualPersonCountry = await this.driverService.getText(By.xpath("//*[contains(@class,'pgs-json-schema-control-country')]//span[contains(@class,'ng-value-label')]"));
                if (!actualPersonCountry.includes(Country)) {
                    logWarningMessage(`Person Country: "${Country}" doesn't get close match with "${actualPersonCountry}"!`);
                    result = false;
                }
            }

            return result;
        } catch (error) {
            console.log("validateSearchAndFilterAtCompanyAccount");
            console.log(error);
            return false;
        }
    }
    //#endregion


    public printInputInformationSearchAndFilter(
        Name: string,
        OrgNo_NIN: string,
        Email: string,
        Phone: string,
        KAM: string,
        Status: string,
        Type: string,
        Address: string,
        Postcode: string,
        City: string,
        Country: string
    ) {
        let temp: string = "";
        if (Name) { temp = `\t - Name:  ${Name}`; }
        if (OrgNo_NIN) { temp = temp + `\n\t - OrgNo_NIN: ${OrgNo_NIN}`; }
        if (Email) { temp = temp + `\n\t - Email: ${Email}`; }
        if (Phone) { temp = temp + `\n\t - Phone: ${Phone}`; }
        if (KAM) { temp = temp + `\n\t - KAM: ${KAM}`; }
        if (Status) { temp = temp + `\n\t - Status: ${Status}`; }
        if (Type) { temp = temp + `\n\t - Type: ${Type}`; }
        if (Address) { temp = temp + `\n\t - Address: ${Address}`; }
        if (Postcode) { temp = temp + `\n\t - Postcode: ${Postcode}`; }
        if (City) { temp = temp + `\n\t - City: ${City}`; }
        if (Country) { temp = temp + `\n\t - Country: ${Country}`; }
        logWarningMessage(temp);
    }

    public async inputOrgNoNumerAndClickMagnifyingGlassIcon(OrgNo: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtOrgNo);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await this.driverService.setText(this.txtOrgNo, OrgNo);
            await this.driverService.click(this.btnSearchOrgNo);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true;
        } catch (error) {
            console.log("inputOrgNoNumerAndClickMagnifyingGlassIcon");
            console.log(error);
            return false;
        }
    }

    public async validateFields(valField: ValidateField): Promise<ValidateField> {
        let valFieldResult = new ValidateField(
            valField.nameField,
            valField.index,
            valField.status,
            valField.message,
            valField.toastMessage
        );
        try {
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);

            let txtValidattionMessage = By.xpath(`(//div[contains(@class,'invalid-feedback')]/span)[1]`);
            if (await this.driverService.isExisted(txtValidattionMessage)) {
                valFieldResult.status = false;
                let countErrorField = 1;
                while (
                    await this.driverService.isExisted(
                        By.xpath(`(//div[contains(@class,'invalid-feedback')]/span)[${countErrorField}]`)
                    )
                ) {
                    let errorMessage: string = (
                        await this.driverService.getText(txtValidattionMessage)
                    ).toString();
                    valFieldResult.message.push(errorMessage);
                    countErrorField++;
                }
            }
            if (await this.driverService.isExisted(toastError)) {
                valFieldResult.status = false;
                let countErrorField = 1;
                let errortoastMessage: string = (
                    await this.driverService.getText(toastError)).toString();
                valFieldResult.toastMessage.push(errortoastMessage);
                countErrorField++;
            }
            else {
                await this.driverService.waitForSeconds(2000);
            }
            return valFieldResult;
        } catch (error) {
            console.log("validateField");
            console.log(error);
            return valFieldResult;
        }
    }

    //#region Validate value for each fields on Account Person Form
    public async validateOrganizationValueOnAccountPersonForm(ExpectedOrganization: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbOrganizationValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualOrganization = await this.driverService.getText(this.cmbOrganizationValue);
            return await this.driverService.validateRecord(`Validate field Organization`, [ActualOrganization, ExpectedOrganization, `Incorrect Organization!`]);
        } catch (error) {
            console.log("validateOrganizationValueOnAccountPersonForm");
            console.log(error);
            return false;
        }
    }

    //BASIC INFORMATION
    public async validateNINValueOnAccountPersonForm(ExpectedNIN: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtNIN);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualNIN = await this.driverService.getAttributeValue(this.txtNIN, "value");
            return await this.driverService.validateRecord(`Validate field NIN`, [ActualNIN, ExpectedNIN, `Incorrect NIN!`]);
        } catch (error) {
            console.log("validateNINValueOnAccountPersonForm");
            console.log(error);
            return false;
        }
    }

    public async validateFirstNameValueOnAccountPersonForm(ExpectedFirstName: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtFirstName);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualFirstName = await this.driverService.getAttributeValue(this.txtFirstName, "value");
            return await this.driverService.validateRecord(`Validate field FirstName`, [ActualFirstName, ExpectedFirstName, `Incorrect FirstName!`]);
        } catch (error) {
            console.log("validateFirstNameValueOnAccountPersonForm");
            console.log(error);
            return false;
        }
    }

    public async validateLastNameValueOnAccountPersonForm(ExpectedLastNameName: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtLastName);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let actualLastName = await this.driverService.getAttributeValue(this.txtLastName, "value");
            return await this.driverService.validateRecord(`Validate field LastName`, [actualLastName, ExpectedLastNameName, `Incorrect LastName!`]);
        } catch (error) {
            console.log("validateLastNameValueOnAccountPersonForm");
            console.log(error);
            return false;
        }
    }

    public async validateDOBValueOnAccountPersonForm(ExpectedDOB: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.dtpDOB);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let actualDOB = await this.driverService.getAttributeValue(this.dtpDOB, "value");
            return await this.driverService.validateRecord(`Validate field DOB`, [actualDOB, ExpectedDOB, `Incorrect DOB!`]);
        } catch (error) {
            console.log("validateDOBValueOnAccountPersonForm");
            console.log(error);
            return false;
        }
    }

    public async validateGenderValueOnAccountPersonForm(ExpectedGender: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbGenderValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualGender = await this.driverService.getText(this.cmbGenderValue);
            return await this.driverService.validateRecord(`Validate field Gender`, [ActualGender, ExpectedGender, `Incorrect Gender!`]);
        } catch (error) {
            console.log("validateGenderValueOnAccountPersonForm");
            console.log(error);
            return false;
        }
    }

    public async validateAddressValueOnAccountPersonForm(ExpectedAddress: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtAddress);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let actualAddress = await this.driverService.getAttributeValue(this.txtAddress, "value");
            return await this.driverService.validateRecord(`Validate field Address`, [actualAddress, ExpectedAddress, `Incorrect Address!`]);
        } catch (error) {
            console.log("validateAddressValueOnAccountPersonForm");
            console.log(error);
            return false;
        }
    }

    public async validatePostcodeValueOnAccountPersonForm(ExpectedPostcode: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtPostcode);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let actualPostcode = await this.driverService.getAttributeValue(this.txtPostcode, "value");
            return await this.driverService.validateRecord(`Validate field Postcode`, [actualPostcode, ExpectedPostcode, `Incorrect Postcode!`]);
        } catch (error) {
            console.log("validatePostcodeValueOnAccountPersonForm");
            console.log(error);
            return false;
        }
    }

    public async validateCityValueOnAccountPersonForm(ExpectedCity: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtCity);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let actualCity = await this.driverService.getAttributeValue(this.txtCity, "value");
            return await this.driverService.validateRecord(`Validate field City`, [actualCity, ExpectedCity, `Incorrect City!`]);
        } catch (error) {
            console.log("validateCityValueOnAccountPersonForm");
            console.log(error);
            return false;
        }
    }

    public async validateCountryValueOnAccountPersonForm(ExpectedCountry: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbCountryValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let actualCountry = await this.driverService.getText(this.cmbCountryValue);
            return await this.driverService.validateRecord(`Validate field Country`, [actualCountry, ExpectedCountry, `Incorrect Country!`]);
        } catch (error) {
            console.log("validateCountryValueOnAccountPersonForm");
            console.log(error);
            return false;
        }
    }

    public async validateEmailAddressValueOnAccountPersonForm(ExpectedEmail: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtEmailAddress);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let actualEmail = await this.driverService.getAttributeValue(this.txtEmailAddress, "value");
            return await this.driverService.validateRecord(`Validate field Email Address`, [actualEmail, ExpectedEmail, `Incorrect Email Address!`]);
        } catch (error) {
            console.log("validateEmailAddressValueOnAccountPersonForm");
            console.log(error);
            return false;
        }
    }

    public async validatePhoneNumberValueOnAccountPersonForm(ExpectedPhoneNumber: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtPhoneNumber);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let actualPhoneNumber = await this.driverService.getAttributeValue(this.txtPhoneNumber, "value");
            return await this.driverService.validateRecord(`Validate field Phone Number`, [actualPhoneNumber, ExpectedPhoneNumber, `Incorrect Phone Number!`]);
        } catch (error) {
            console.log("validatePhoneNumberValueOnAccountPersonForm");
            console.log(error);
            return false;
        }
    }

    public async validatePreferredCommunicationValueOnAccountPersonForm(ExpectedPreferredCommunication: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbPreferredCommunicationValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualPrerredCommunication = await this.driverService.getText(this.cmbPreferredCommunicationValue);
            return await this.driverService.validateRecord(`Validate field Preferred Communication`, [ActualPrerredCommunication, ExpectedPreferredCommunication, `Incorrect Preferred Communication!`]);
        } catch (error) {
            console.log("validatePreferredCommunicationValueOnAccountPersonForm");
            console.log(error);
            return false;
        }
    }

    public async validateStatusValueOnAccountPersonForm(ExpectedStatus: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbStatusValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualStatus = await this.driverService.getText(this.cmbStatusValue);
            return await this.driverService.validateRecord(`Validate field Status`, [ActualStatus, ExpectedStatus, `Incorrect Status!`]);
        } catch (error) {
            console.log("validateStatusValueOnAccountPersonForm");
            console.log(error);
            return false;
        }
    }

    //OTHER INFORMATION
    public async validatePaymentRemarksValueOnAccountPersonForm(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.txtPaymentRemarks);
            const actualValue = await this.driverService.getAttributeValue(this.txtPaymentRemarks, 'value');
            return await this.driverService.validateRecord('Validate Payment Remarks!',
                [actualValue, expectedValue, 'Incorrect Payment Remarks!']);
        } catch (error) {
            console.log('validatePaymentRemarksValueOnAccountPersonForm');
            console.log(error);
            return false;
        }
    }

    public async validatePaymentTypeValueOnAccountPersonForm(ExpectedPaymentType: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbPaymentTypeValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualPaymentType = await this.driverService.getText(this.cmbPaymentTypeValue);
            return await this.driverService.validateRecord(`Validate field Payment Type`, [ActualPaymentType, ExpectedPaymentType, `Incorrect Payment Type!`]);
        } catch (error) {
            console.log("validatePaymentTypeValueOnAccountPersonForm");
            console.log(error);
            return false;
        }
    }

    public async validatePaymentFrequencyValueOnAccountPersonForm(ExpectedPaymentFrequency: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbPaymentFrequencyValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualPaymentFrequency = await this.driverService.getText(this.cmbPaymentFrequencyValue);
            return await this.driverService.validateRecord(`Validate field Payment Frequency`, [ActualPaymentFrequency, ExpectedPaymentFrequency, `Incorrect Payment Frequency!`]);
        } catch (error) {
            console.log("validatePaymentFrequencyValueOnAccountPersonForm");
            console.log(error);
            return false;
        }
    }

    public async validatePreferredCollectionDateValueOnAccountPersonForm(ExpectedPreferredCollectionDate: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbPreferredCollectionDateValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualPreferredCollectionDate = await this.driverService.getText(this.cmbPreferredCollectionDateValue);
            return await this.driverService.validateRecord(`Validate field Preferred Collection Date`, [ActualPreferredCollectionDate, ExpectedPreferredCollectionDate, `Incorrect Preferred Collection Date!`]);
        } catch (error) {
            console.log("validatePreferredCollectionDateValueOnAccountPersonForm");
            console.log(error);
            return false;
        }
    }

    public async validateKAMValueOnAccountPersonForm(ExpectedKAM: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbKAMValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualKAM = await this.driverService.getText(this.cmbKAMValue);
            return await this.driverService.validateRecordUsedForSearch(`Validate field KAM`, [ActualKAM, ExpectedKAM, `Incorrect KAM!`]);
        } catch (error) {
            console.log("validateKAMValueOnAccountPersonForm");
            console.log(error);
            return false;
        }
    }

    //#endregion


    //#region Validate value for each fields on Account Company Form
    public async validateOrganizationValueOnAccountCompanyForm(ExpectedOrganization: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbOrganizationValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualOrganization = await this.driverService.getText(this.cmbOrganizationValue);
            return await this.driverService.validateRecord(`Validate field Organization`, [ActualOrganization, ExpectedOrganization, `Incorrect Organization!`]);
        } catch (error) {
            console.log("validateOrganizationValueOnAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    //BASIC INFORMATION
    public async validateOrgNoValueOnAccountCompanyForm(ExpectedOrgNo: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtOrgNo);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualOrgNo = await this.driverService.getAttributeValue(this.txtOrgNo, "value");
            return await this.driverService.validateRecord(`Validate field OrgNo`, [ActualOrgNo, ExpectedOrgNo, `Incorrect OrgNo!`]);
        } catch (error) {
            console.log("validateOrgNoValueOnAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async validateCompanyNameValueOnAccountCompanyForm(ExpectedCompanyName: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtCompanyName);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualCompanyName = await this.driverService.getAttributeValue(this.txtCompanyName, "value");
            return await this.driverService.validateRecord(`Validate field Company Name`, [ActualCompanyName, ExpectedCompanyName, `Incorrect Company Name!`]);
        } catch (error) {
            console.log("validateCompanyNameValueOnAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async validateEmailAddressValueOnAccountCompanyForm(ExpectedEmailAddress: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtEmailAddressCompany);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualEmailAddress = await this.driverService.getAttributeValue(this.txtEmailAddressCompany, "value");
            return await this.driverService.validateRecord(`Validate field Email Address`, [ActualEmailAddress, ExpectedEmailAddress, `Incorrect Email Address!`]);
        } catch (error) {
            console.log("validateEmailAddressValueOnAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async validateCompanyPhoneValueOnAccountCompanyForm(ExpectedCompanyPhone: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtCompanyPhone);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualCompanyPhone = await this.driverService.getAttributeValue(this.txtCompanyPhone, "value");
            return await this.driverService.validateRecord(`Validate field Company Phone`, [ActualCompanyPhone, ExpectedCompanyPhone, `Incorrect Company Phone!`]);
        } catch (error) {
            console.log("validateCompanyPhoneValueOnAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async validateStatusValueOnAccountCompanyForm(ExpectedStatus: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbStatusValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualStatus = await this.driverService.getText(this.cmbStatusValue);
            return await this.driverService.validateRecord(`Validate field Status`, [ActualStatus, ExpectedStatus, `Incorrect Status!`]);
        } catch (error) {
            console.log("validateStatusValueOnAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async validateCountryValueOnAccountCompanyForm(ExpectedCountry: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbCountryValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualCountry = await this.driverService.getText(this.cmbCountryValue);
            return await this.driverService.validateRecord(`Validate field Country`, [ActualCountry, ExpectedCountry, `Incorrect Country!`]);
        } catch (error) {
            console.log("validateCountryValueOnAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    //ADDRESS
    public async validateVisitingAddressValueOnAccountCompanyForm(ExpectedVisitingAddress: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtVisitingAddress);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualVisitingAddress = await this.driverService.getAttributeValue(this.txtVisitingAddress, "value");
            return await this.driverService.validateRecord(`Validate field Visiting Address`, [ActualVisitingAddress, ExpectedVisitingAddress, `Incorrect Visiting Address!`]);
        } catch (error) {
            console.log("validateVisitingAddressValueOnAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async validateVisitingExtraAddressValueOnAccountCompanyForm(ExpectedVisitingExtraAddress: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtVisitingExtraAddress);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualVisitingExtraAddress = await this.driverService.getAttributeValue(this.txtVisitingExtraAddress, "value");
            return await this.driverService.validateRecord(`Validate field Visiting Extra Address`, [ActualVisitingExtraAddress, ExpectedVisitingExtraAddress, `Incorrect Visiting Extra Address!`]);
        } catch (error) {
            console.log("validateVisitingExtraAddressValueOnAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async validateVisitingPostcodeValueOnAccountCompanyForm(ExpectedVisitingPostcode: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtVisitingPostcode);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualVisitingPostcode = await this.driverService.getAttributeValue(this.txtVisitingPostcode, "value");
            return await this.driverService.validateRecord(`Validate field Visiting Postcode`, [ActualVisitingPostcode, ExpectedVisitingPostcode, `Incorrect Visiting Postcode!`]);
        } catch (error) {
            console.log("validateVisitingPostcodeValueOnAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async validateVisitingCityValueOnAccountCompanyForm(ExpectedVisitingCity: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtVisitingCity);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualVisitingCity = await this.driverService.getAttributeValue(this.txtVisitingCity, "value");
            return await this.driverService.validateRecord(`Validate field Visiting City`, [ActualVisitingCity, ExpectedVisitingCity, `Incorrect VisitingCity!`]);
        } catch (error) {
            console.log("vvalidateVisitingCityValueOnAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async validatePostalAddressValueOnAccountCompanyForm(ExpectedPostalAddress: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtPostalAddress);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualPostalAddress = await this.driverService.getAttributeValue(this.txtPostalAddress, "value");
            return await this.driverService.validateRecord(`Validate field Postal Address`, [ActualPostalAddress, ExpectedPostalAddress, `Incorrect Postal Address!`]);
        } catch (error) {
            console.log("validatePostalAddressValueOnAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async validatePostalExtraAddressValueOnAccountCompanyForm(ExpectedPostalExtraAddress: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtPostalExtraAddress);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualPostalExtraAddress = await this.driverService.getAttributeValue(this.txtPostalExtraAddress, "value");
            return await this.driverService.validateRecord(`Validate field Postal Extra Address`, [ActualPostalExtraAddress, ExpectedPostalExtraAddress, `Incorrect Postal Extra Address!`]);
        } catch (error) {
            console.log("validatePostalExtraAddressValueOnAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async validatePostalPostcodeValueOnAccountCompanyForm(ExpectedPostalPostcode: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtPostalPostcode);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualPostalPostcode = await this.driverService.getAttributeValue(this.txtPostalPostcode, "value");
            return await this.driverService.validateRecord(`Validate field Postal Postcode`, [ActualPostalPostcode, ExpectedPostalPostcode, `Incorrect Postal Postcode!`]);
        } catch (error) {
            console.log("validatePostalPostcodeValueOnAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async validatePostalCityValueOnAccountCompanyForm(ExpectedPostalCity: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtPostalCity);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualPostalCity = await this.driverService.getAttributeValue(this.txtPostalCity, "value");
            return await this.driverService.validateRecord(`Validate field Postal City`, [ActualPostalCity, ExpectedPostalCity, `Incorrect Postal City!`]);
        } catch (error) {
            console.log("validatePostalCityValueOnAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async validateInvoiceAddressValueOnAccountCompanyForm(ExpectedInvoiceAddress: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtInvoiceAddress);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualInvoiceAddress = await this.driverService.getAttributeValue(this.txtInvoiceAddress, "value");
            return await this.driverService.validateRecord(`Validate field Invoice Address`, [ActualInvoiceAddress, ExpectedInvoiceAddress, `Incorrect Invoice Address!`]);
        } catch (error) {
            console.log("validateInvoiceAddressValueOnAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async validateInvoiceExtraAddressValueOnAccountCompanyForm(ExpectedInvoiceExtraAddress: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtInvoiceExtraAddress);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualInvoiceExtraAddress = await this.driverService.getAttributeValue(this.txtInvoiceExtraAddress, "value");
            return await this.driverService.validateRecord(`Validate field Invoice Extra Address`, [ActualInvoiceExtraAddress, ExpectedInvoiceExtraAddress, `Incorrect Invoice Extra Address!`]);
        } catch (error) {
            console.log("validateInvoiceExtraAddressValueOnAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async validateInvoicePostcodeValueOnAccountCompanyForm(ExpectedInvoicePostcode: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtInvoicePostcode);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualInvoicePostcode = await this.driverService.getAttributeValue(this.txtInvoicePostcode, "value");
            return await this.driverService.validateRecord(`Validate field Invoice Postcode`, [ActualInvoicePostcode, ExpectedInvoicePostcode, `Incorrect Invoice Postcode!`]);
        } catch (error) {
            console.log("validateInvoicePostcodeValueOnAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async validateInvoiceCityValueOnAccountCompanyForm(ExpectedInvoiceCity: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtInvoiceCity);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualInvoiceCity = await this.driverService.getAttributeValue(this.txtInvoiceCity, "value");
            return await this.driverService.validateRecord(`Validate field Invoice City`, [ActualInvoiceCity, ExpectedInvoiceCity, `Incorrect Invoice City!`]);
        } catch (error) {
            console.log("validateInvoiceCityValueOnAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    //OTHER INFORMATION
    public async validateCreditScoreValueOnAccountCompanyForm(ExpectedCreditScore: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtCreditScore);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualCreditScore = await this.driverService.getAttributeValue(this.txtCreditScore, "value");
            return await this.driverService.validateRecord(`Validate field Credit Score`, [ActualCreditScore, ExpectedCreditScore, `Incorrect Credit Score!`]);
        } catch (error) {
            console.log("validateCreditScoreValueOnAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async validateCreditRatingValueOnAccountCompanyForm(ExpectedCreditRating: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbCreditRatingCompanyValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualCreditRating = await this.driverService.getText(this.cmbCreditRatingCompanyValue);
            return await this.driverService.validateRecord(`Validate field Credit Rating`, [ActualCreditRating, ExpectedCreditRating, `Incorrect Credit Rating!`]);
        } catch (error) {
            console.log("validateCreditRatingValueOnAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async validateIndustryCodeValueOnAccountCompanyForm(ExpectedIndustryCode: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbIndustryCodeCompanyValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualIndustryCode = await this.driverService.getText(this.cmbIndustryCodeCompanyValue);
            return await this.driverService.validateRecord(`Validate field Industry Code`, [ActualIndustryCode, ExpectedIndustryCode, `Incorrect Industry Code!`]);
        } catch (error) {
            console.log("validateIndustryCodeValueOnAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async validateIndustryValueOnAccountCompanyForm(ExpectedIndustry: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbIndustryCompanyValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualIndustry = await this.driverService.getText(this.cmbIndustryCompanyValue);
            return await this.driverService.validateRecord(`Validate field Industry`, [ActualIndustry, ExpectedIndustry, `Incorrect Industry!`]);
        } catch (error) {
            console.log("validateIndustryValueOnAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async validateEducationalLevelValueOnAccountCompanyForm(ExpectedEducationalLevel: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbEducationaLevelValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualEducationalLevel = await this.driverService.getText(this.cmbEducationaLevelValue);
            return await this.driverService.validateRecord(`Validate field Educational Level`, [ActualEducationalLevel, ExpectedEducationalLevel, `Incorrect Educational Level!`]);
        } catch (error) {
            console.log("validateEducationalLevelValueOnAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async validateCompanyRegistrationDateValueOnAccountCompanyForm(ExpectedCompanyRegistrationDate: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.dtpCompanyRegistrationDate);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualCompanyRegistrationDate = await this.driverService.getAttributeValue(this.dtpCompanyRegistrationDate, "value");
            return await this.driverService.validateRecord(`Validate field Company Registration Date`, [ActualCompanyRegistrationDate, ExpectedCompanyRegistrationDate, `Incorrect Company Registration Date!`]);
        } catch (error) {
            console.log("validateCompanyRegistrationDateValueOnAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async validateKAMValueOnAccountCompanyForm(ExpectedKAM: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbKAMValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualKAM = await this.driverService.getText(this.cmbKAMValue);
            return await this.driverService.validateRecordUsedForSearch(`Validate field KAM`, [ActualKAM, ExpectedKAM, `Incorrect KAM!`]);
        } catch (error) {
            console.log("validateKAMValueOnAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async validatePreferredCollectionDateValueOnAccountCompanyForm(ExpectedPreferredCollectionDate: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbPreferredCollectionDateValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualPreferredCollectionDate = await this.driverService.getText(this.cmbPreferredCollectionDateValue);
            return await this.driverService.validateRecord(`Validate field Preferred Collection Date`, [ActualPreferredCollectionDate, ExpectedPreferredCollectionDate, `Incorrect Preferred Collection Date!`]);
        } catch (error) {
            console.log("validatePreferredCollectionDateValueOnAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async validatePaymentRemarksValueOnAccountCompanyForm(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.txtPaymentRemarks);
            const actualValue = await this.driverService.getAttributeValue(this.txtPaymentRemarks, 'value');
            return await this.driverService.validateRecord('Validate Payment Remarks!',
                [actualValue, expectedValue, 'Incorrect Payment Remarks!']);
        } catch (error) {
            console.log('validatePaymentRemarksValueOnAccountCompanyForm');
            console.log(error);
            return false;
        }
    }

    public async validatePaymentTypeValueOnAccountCompanyForm(ExpectedPaymentType: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbPaymentTypeValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualPaymentType = await this.driverService.getText(this.cmbPaymentTypeValue);
            return await this.driverService.validateRecord(`Validate field Payment Type`, [ActualPaymentType, ExpectedPaymentType, `Incorrect Payment Type!`]);
        } catch (error) {
            console.log("validatePaymentTypeValueOnAccountCompanyForm");
            console.log(error);
            return false;
        }
    }

    public async validatePaymentFrequencyValueOnAccountCompanyForm(ExpectedPaymentFrequency: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbPaymentFrequencyValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualPaymentFrequency = await this.driverService.getText(this.cmbPaymentFrequencyValue);
            return await this.driverService.validateRecord(`Validate field Payment Frequency`, [ActualPaymentFrequency, ExpectedPaymentFrequency, `Incorrect Payment Frequency!`]);
        } catch (error) {
            console.log("validatePaymentFrequencyValueOnAccountCompanyForm");
            console.log(error);
            return false;
        }
    }
    //#endregion


    //#region Get value for each fields on Account Person Form
    public async getOrganizationValueOnAccountPersonForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.cmbOrganizationValue);
            let actualValue = await this.driverService.getText(this.cmbOrganizationValue);
            return actualValue;
        } catch (error) {
            console.log("getOrganizationValueOnAccountPersonForm");
            console.log(error);
            return "";
        }
    }

    //BASIC INFORMATION
    public async getNINValueOnAccountPersonForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.txtNIN);
            let actualValue = await this.driverService.getAttributeValue(this.txtNIN, "value");
            return actualValue;
        } catch (error) {
            console.log("getNINValueOnAccountPersonForm");
            console.log(error);
            return "";
        }
    }

    public async getFirstNameValueOnAccountPersonForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.txtFirstName);
            let actualValue = await this.driverService.getAttributeValue(this.txtFirstName, "value");
            return actualValue;
        } catch (error) {
            console.log("getFirstNameValueOnAccountPersonForm");
            console.log(error);
            return "";
        }
    }

    public async getLastNameValueOnAccountPersonForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.txtLastName);
            let actualValue = await this.driverService.getAttributeValue(this.txtLastName, "value");
            return actualValue;
        } catch (error) {
            console.log("getLastNameValueOnAccountPersonForm");
            console.log(error);
            return "";
        }
    }

    public async getDOBValueOnAccountPersonForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.dtpDOB);
            let actualValue = await this.driverService.getAttributeValue(this.dtpDOB, "value");
            return actualValue;
        } catch (error) {
            console.log("getDOBValueOnAccountPersonForm");
            console.log(error);
            return "";
        }
    }

    public async getGenderValueOnAccountPersonForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.cmbGenderValue);
            let actualValue = await this.driverService.getText(this.cmbGenderValue);
            return actualValue;
        } catch (error) {
            console.log("getGenderValueOnAccountPersonForm");
            console.log(error);
            return "";
        }
    }

    public async getAddressValueOnAccountPersonForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.txtAddress);
            let actualValue = await this.driverService.getAttributeValue(this.txtAddress, "value");
            return actualValue;
        } catch (error) {
            console.log("getAddressValueOnAccountPersonForm");
            console.log(error);
            return "";
        }
    }

    public async getPostcodeValueOnAccountPersonForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.txtPostcode);
            let actualValue = await this.driverService.getAttributeValue(this.txtPostcode, "value");
            return actualValue;
        } catch (error) {
            console.log("getPostcodeValueOnAccountPersonForm");
            console.log(error);
            return "";
        }
    }

    public async getCityValueOnAccountPersonForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.txtCity);
            let actualValue = await this.driverService.getAttributeValue(this.txtCity, "value");
            return actualValue;
        } catch (error) {
            console.log("getCityValueOnAccountPersonForm");
            console.log(error);
            return "";
        }
    }

    public async getCountryValueOnAccountPersonForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.cmbCountryValue);
            let actualValue = await this.driverService.getText(this.cmbCountryValue);
            return actualValue;
        } catch (error) {
            console.log("getCountryValueOnAccountPersonForm");
            console.log(error);
            return "";
        }
    }

    public async getEmailAddressValueOnAccountPersonForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.txtEmailAddress);
            let actualValue = await this.driverService.getAttributeValue(this.txtEmailAddress, "value");
            return actualValue;
        } catch (error) {
            console.log("getEmailAddressValueOnAccountPersonForm");
            console.log(error);
            return "";
        }
    }

    public async getPhoneNumberValueOnAccountPersonForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.txtPhoneNumber);
            let actualValue = await this.driverService.getAttributeValue(this.txtPhoneNumber, "value");
            return actualValue;
        } catch (error) {
            console.log("getPhoneNumberValueOnAccountPersonForm");
            console.log(error);
            return "";
        }
    }

    public async getPreferredCommunicationValueOnAccountPersonForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.cmbPreferredCommunicationValue);
            let actualValue = await this.driverService.getText(this.cmbPreferredCommunicationValue);
            return actualValue;
        } catch (error) {
            console.log("getPreferredCommunicationValueOnAccountPersonForm");
            console.log(error);
            return "";
        }
    }

    public async getStatusValueOnAccountPersonForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.cmbStatusValue);
            let actualValue = await this.driverService.getText(this.cmbStatusValue);
            return actualValue;
        } catch (error) {
            console.log("getStatusValueOnAccountPersonForm");
            console.log(error);
            return "";
        }
    }

    //OTHER INFORMATION
    public async getPaymentRemarksValueOnAccountPersonForm(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.txtPaymentRemarks);
            const actualValue = await this.driverService.getAttributeValue(this.txtPaymentRemarks, 'value');
            return actualValue;
        } catch (error) {
            console.log('getPaymentRemarksValueOnAccountPersonForm');
            console.log(error);
            return "";
        }
    }

    public async getPaymentTypeValueOnAccountPersonForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.cmbPaymentTypeValue);
            let actualValue = await this.driverService.getText(this.cmbPaymentTypeValue);
            return actualValue;
        } catch (error) {
            console.log("getPaymentTypeValueOnAccountPersonForm");
            console.log(error);
            return "";
        }
    }

    public async getPaymentFrequencyValueOnAccountPersonForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.cmbPaymentFrequencyValue);
            let actualValue = await this.driverService.getText(this.cmbPaymentFrequencyValue);
            return actualValue;
        } catch (error) {
            console.log("getPaymentFrequencyValueOnAccountPersonForm");
            console.log(error);
            return "";
        }
    }

    public async getPreferredCollectionDateValueOnAccountPersonForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.cmbPreferredCollectionDateValue);
            let actualValue = await this.driverService.getText(this.cmbPreferredCollectionDateValue);
            return actualValue;
        } catch (error) {
            console.log("getPreferredCollectionDateValueOnAccountPersonForm");
            console.log(error);
            return "";
        }
    }

    public async getKAMValueOnAccountPersonForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.cmbKAMValue);
            let actualValue = await this.driverService.getText(this.cmbKAMValue);
            return actualValue;
        } catch (error) {
            console.log("getKAMValueOnAccountPersonForm");
            console.log(error);
            return "";
        }
    }
    //#endregion


    //#region get value for each fields on Account Company Form
    public async getOrganizationValueOnAccountCompanyForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.cmbOrganizationValue);
            let actualValue = await this.driverService.getText(this.cmbOrganizationValue);
            return actualValue;
        } catch (error) {
            console.log("getOrganizationValueOnAccountCompanyForm");
            console.log(error);
            return "";
        }
    }

    //BASIC INFORMATION
    public async getOrgNoValueOnAccountCompanyForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.txtOrgNo);
            let actualValue = await this.driverService.getAttributeValue(this.txtOrgNo, "value");
            return actualValue;
        } catch (error) {
            console.log("getOrgNoValueOnAccountCompanyForm");
            console.log(error);
            return "";
        }
    }

    public async getCompanyNameValueOnAccountCompanyForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.txtCompanyName);
            let actualValue = await this.driverService.getAttributeValue(this.txtCompanyName, "value");
            return actualValue;
        } catch (error) {
            console.log("getCompanyNameValueOnAccountCompanyForm");
            console.log(error);
            return "";
        }
    }

    public async getEmailAddressValueOnAccountCompanyForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.txtEmailAddressCompany);
            let actualValue = await this.driverService.getAttributeValue(this.txtEmailAddressCompany, "value");
            return actualValue;
        } catch (error) {
            console.log("getEmailAddressValueOnAccountCompanyForm");
            console.log(error);
            return "";
        }
    }

    public async getCompanyPhoneValueOnAccountCompanyForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.txtCompanyPhone);
            let actualValue = await this.driverService.getAttributeValue(this.txtCompanyPhone, "value");
            return actualValue;
        } catch (error) {
            console.log("getCompanyPhoneValueOnAccountCompanyForm");
            console.log(error);
            return "";
        }
    }

    public async getStatusValueOnAccountCompanyForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.cmbStatusValue);
            let actualValue = await this.driverService.getText(this.cmbStatusValue);
            return actualValue;
        } catch (error) {
            console.log("getStatusValueOnAccountCompanyForm");
            console.log(error);
            return "";
        }
    }

    public async getCountryValueOnAccountCompanyForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.cmbCountryValue);
            let actualValue = await this.driverService.getText(this.cmbCountryValue);
            return actualValue;
        } catch (error) {
            console.log("getCountryValueOnAccountCompanyForm");
            console.log(error);
            return "";
        }
    }

    //ADDRESS
    public async getVisitingAddressValueOnAccountCompanyForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.txtVisitingAddress);
            let actualValue = await this.driverService.getAttributeValue(this.txtVisitingAddress, "value");
            return actualValue;
        } catch (error) {
            console.log("getVisitingAddressValueOnAccountCompanyForm");
            console.log(error);
            return "";
        }
    }

    public async getVisitingExtraAddressValueOnAccountCompanyForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.txtVisitingExtraAddress);
            let actualValue = await this.driverService.getAttributeValue(this.txtVisitingExtraAddress, "value");
            return actualValue;
        } catch (error) {
            console.log("getVisitingExtraAddressValueOnAccountCompanyForm");
            console.log(error);
            return "";
        }
    }

    public async getVisitingPostcodeValueOnAccountCompanyForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.txtVisitingPostcode);
            let actualValue = await this.driverService.getAttributeValue(this.txtVisitingPostcode, "value");
            return actualValue;
        } catch (error) {
            console.log("getVisitingPostcodeValueOnAccountCompanyForm");
            console.log(error);
            return "";
        }
    }

    public async getVisitingCityValueOnAccountCompanyForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.txtVisitingCity);
            let actualValue = await this.driverService.getAttributeValue(this.txtVisitingCity, "value");
            return actualValue;
        } catch (error) {
            console.log("vgetVisitingCityValueOnAccountCompanyForm");
            console.log(error);
            return "";
        }
    }

    public async getPostalAddressValueOnAccountCompanyForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.txtPostalAddress);
            let actualValue = await this.driverService.getAttributeValue(this.txtPostalAddress, "value");
            return actualValue;
        } catch (error) {
            console.log("getPostalAddressValueOnAccountCompanyForm");
            console.log(error);
            return "";
        }
    }

    public async getPostalExtraAddressValueOnAccountCompanyForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.txtPostalExtraAddress);
            let actualValue = await this.driverService.getAttributeValue(this.txtPostalExtraAddress, "value");
            return actualValue;
        } catch (error) {
            console.log("getPostalExtraAddressValueOnAccountCompanyForm");
            console.log(error);
            return "";
        }
    }

    public async getPostalPostcodeValueOnAccountCompanyForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.txtPostalPostcode);
            let actualValue = await this.driverService.getAttributeValue(this.txtPostalPostcode, "value");
            return actualValue;
        } catch (error) {
            console.log("getPostalPostcodeValueOnAccountCompanyForm");
            console.log(error);
            return "";
        }
    }

    public async getPostalCityValueOnAccountCompanyForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.txtPostalCity);
            let actualValue = await this.driverService.getAttributeValue(this.txtPostalCity, "value");
            return actualValue;
        } catch (error) {
            console.log("getPostalCityValueOnAccountCompanyForm");
            console.log(error);
            return "";
        }
    }

    public async getInvoiceAddressValueOnAccountCompanyForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.txtInvoiceAddress);
            let actualValue = await this.driverService.getAttributeValue(this.txtInvoiceAddress, "value");
            return actualValue;
        } catch (error) {
            console.log("getInvoiceAddressValueOnAccountCompanyForm");
            console.log(error);
            return "";
        }
    }

    public async getInvoiceExtraAddressValueOnAccountCompanyForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.txtInvoiceExtraAddress);
            let actualValue = await this.driverService.getAttributeValue(this.txtInvoiceExtraAddress, "value");
            return actualValue;
        } catch (error) {
            console.log("getInvoiceExtraAddressValueOnAccountCompanyForm");
            console.log(error);
            return "";
        }
    }

    public async getInvoicePostcodeValueOnAccountCompanyForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.txtInvoicePostcode);
            let actualValue = await this.driverService.getAttributeValue(this.txtInvoicePostcode, "value");
            return actualValue;
        } catch (error) {
            console.log("getInvoicePostcodeValueOnAccountCompanyForm");
            console.log(error);
            return "";
        }
    }

    public async getInvoiceCityValueOnAccountCompanyForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.txtInvoiceCity);
            let actualValue = await this.driverService.getAttributeValue(this.txtInvoiceCity, "value");
            return actualValue;
        } catch (error) {
            console.log("getInvoiceCityValueOnAccountCompanyForm");
            console.log(error);
            return "";
        }
    }

    //OTHER INFORMATION
    public async getCreditScoreValueOnAccountCompanyForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.txtCreditScore);
            let actualValue = await this.driverService.getAttributeValue(this.txtCreditScore, "value");
            return actualValue;
        } catch (error) {
            console.log("getCreditScoreValueOnAccountCompanyForm");
            console.log(error);
            return "";
        }
    }

    public async getCreditRatingValueOnAccountCompanyForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.cmbCreditRatingCompanyValue);
            let actualValue = await this.driverService.getText(this.cmbCreditRatingCompanyValue);
            return actualValue;
        } catch (error) {
            console.log("getCreditRatingValueOnAccountCompanyForm");
            console.log(error);
            return "";
        }
    }

    public async getIndustryCodeValueOnAccountCompanyForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.cmbIndustryCodeCompanyValue);
            let actualValue = await this.driverService.getText(this.cmbIndustryCodeCompanyValue);
            return actualValue;
        } catch (error) {
            console.log("getIndustryCodeValueOnAccountCompanyForm");
            console.log(error);
            return "";
        }
    }

    public async getIndustryValueOnAccountCompanyForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.cmbIndustryCompanyValue);
            let actualValue = await this.driverService.getText(this.cmbIndustryCompanyValue);
            return actualValue;
        } catch (error) {
            console.log("getIndustryValueOnAccountCompanyForm");
            console.log(error);
            return "";
        }
    }

    public async getEducationalLevelValueOnAccountCompanyForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.cmbEducationaLevelValue);
            let actualValue = await this.driverService.getText(this.cmbEducationaLevelValue);
            return actualValue;
        } catch (error) {
            console.log("getEducationalLevelValueOnAccountCompanyForm");
            console.log(error);
            return "";
        }
    }

    public async getCompanyRegistrationDateValueOnAccountCompanyForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.dtpCompanyRegistrationDate);
            let actualValue = await this.driverService.getAttributeValue(this.dtpCompanyRegistrationDate, "value");
            return actualValue;
        } catch (error) {
            console.log("getCompanyRegistrationDateValueOnAccountCompanyForm");
            console.log(error);
            return "";
        }
    }

    public async getKAMValueOnAccountCompanyForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.cmbKAMValue);
            let actualValue = await this.driverService.getText(this.cmbKAMValue);
            return actualValue;
        } catch (error) {
            console.log("getKAMValueOnAccountCompanyForm");
            console.log(error);
            return "";
        }
    }

    public async getPreferredCollectionDateValueOnAccountCompanyForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.cmbPreferredCollectionDateValue);
            let actualValue = await this.driverService.getText(this.cmbPreferredCollectionDateValue);
            return actualValue;
        } catch (error) {
            console.log("getPreferredCollectionDateValueOnAccountCompanyForm");
            console.log(error);
            return "";
        }
    }

    public async getPaymentRemarksValueOnAccountCompanyForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.txtPaymentRemarks);
            const actualValue = await this.driverService.getAttributeValue(this.txtPaymentRemarks, 'value');
            return actualValue;
        } catch (error) {
            console.log('getPaymentRemarksValueOnAccountCompanyForm');
            console.log(error);
            return "";
        }
    }

    public async getPaymentTypeValueOnAccountCompanyForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.cmbPaymentTypeValue);
            let actualValue = await this.driverService.getText(this.cmbPaymentTypeValue);
            return actualValue;
        } catch (error) {
            console.log("getPaymentTypeValueOnAccountCompanyForm");
            console.log(error);
            return "";
        }
    }

    public async getPaymentFrequencyValueOnAccountCompanyForm() {
        try {
            await this.driverService.waitUntilElementVisible(this.cmbPaymentFrequencyValue);
            let actualValue = await this.driverService.getText(this.cmbPaymentFrequencyValue);
            return actualValue;
        } catch (error) {
            console.log("getPaymentFrequencyValueOnAccountCompanyForm");
            console.log(error);
            return "";
        }
    }
    //#endregion

}