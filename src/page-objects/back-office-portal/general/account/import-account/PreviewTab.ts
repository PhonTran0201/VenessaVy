import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";

export class PreviewTab {
    constructor(protected driverService: SeleniumWebDriverService) { }

    //#region Validate value PERSON account
      public async validateFirstNameOnPreviewTab(ExpectedValue: string, positionRow = 1) {
        try {
          const lblActualValue = By.xpath(`//*[@id='preview-part']//tbody//tr[${positionRow}]//td[2]//span`);
          await this.driverService.waitUntilElementLoaded(lblActualValue);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
          const actualValue = await this.driverService.getText(lblActualValue);
          return await this.driverService.validateRecord(`Validate FirstName at line ${positionRow}: `,
            [actualValue,ExpectedValue, `Incorrect FirstName`]
          );
        } catch (error) {
          console.log('validateFirstNameOnPreviewTab');
          console.log(error);
          return false;
        }
      }

      public async validateLastNameOnPreviewTab(ExpectedValue: string, positionRow = 1) {
        try {
          const lblActualValue = By.xpath(`//*[@id='preview-part']//tbody//tr[${positionRow}]//td[3]//span`);
          await this.driverService.waitUntilElementLoaded(lblActualValue);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
          const actualValue = await this.driverService.getText(lblActualValue);
          return await this.driverService.validateRecord(`Validate LastName at line ${positionRow}: `,
            [actualValue,ExpectedValue, `Incorrect LastName`]
          );
        } catch (error) {
          console.log('validateLastNameOnPreviewTab');
          console.log(error);
          return false;
        }
      }

      public async validateDOBOnPreviewTab(ExpectedValue: string, positionRow = 1) {
        try {
          const lblActualValue = By.xpath(`//*[@id='preview-part']//tbody//tr[${positionRow}]//td[4]//span`);
          await this.driverService.waitUntilElementLoaded(lblActualValue);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
          const actualValue = await this.driverService.getText(lblActualValue);
          return await this.driverService.validateRecord(`Validate DOB at line ${positionRow}: `,
            [actualValue,ExpectedValue, `Incorrect DOB`]
          );
        } catch (error) {
          console.log('validateDOBOnPreviewTab');
          console.log(error);
          return false;
        }
      }

      public async validateGenderOnPreviewTab(ExpectedValue: string, positionRow = 1) {
        try {
          const lblActualValue = By.xpath(`//*[@id='preview-part']//tbody//tr[${positionRow}]//td[5]//span`);
          await this.driverService.waitUntilElementLoaded(lblActualValue);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
          const actualValue = await this.driverService.getText(lblActualValue);
          return await this.driverService.validateRecord(`Validate Gender at line ${positionRow}: `,
            [actualValue,ExpectedValue, `Incorrect Gender`]
          );
        } catch (error) {
          console.log('validateGenderOnPreviewTab');
          console.log(error);
          return false;
        }
      }

      public async validateAddressOnPreviewTab(ExpectedValue: string, positionRow = 1) {
        try {
          const lblActualValue = By.xpath(`//*[@id='preview-part']//tbody//tr[${positionRow}]//td[6]//span`);
          await this.driverService.waitUntilElementLoaded(lblActualValue);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
          const actualValue = await this.driverService.getText(lblActualValue);
          return await this.driverService.validateRecord(`Validate Address at line ${positionRow}: `,
            [actualValue,ExpectedValue, `Incorrect Address`]
          );
        } catch (error) {
          console.log('validateAddressOnPreviewTab');
          console.log(error);
          return false;
        }
      }

      public async validatePostcodeOnPreviewTab(ExpectedValue: string, positionRow = 1) {
        try {
          const lblActualValue = By.xpath(`//*[@id='preview-part']//tbody//tr[${positionRow}]//td[7]//span`);
          await this.driverService.waitUntilElementLoaded(lblActualValue);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
          const actualValue = await this.driverService.getText(lblActualValue);
          return await this.driverService.validateRecord(`Validate Postcode at line ${positionRow}: `,
            [actualValue,ExpectedValue, `Incorrect Postcode`]
          );
        } catch (error) {
          console.log('validatePostcodeOnPreviewTab');
          console.log(error);
          return false;
        }
      }

      public async validateCityOnPreviewTab(ExpectedValue: string, positionRow = 1) {
        try {
          const lblActualValue = By.xpath(`//*[@id='preview-part']//tbody//tr[${positionRow}]//td[8]//span`);
          await this.driverService.waitUntilElementLoaded(lblActualValue);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
          const actualValue = await this.driverService.getText(lblActualValue);
          return await this.driverService.validateRecord(`Validate City at line ${positionRow}: `,
            [actualValue,ExpectedValue, `Incorrect City`]
          );
        } catch (error) {
          console.log('validateCityOnPreviewTab');
          console.log(error);
          return false;
        }
      }

      public async validateCountryOnPreviewTabPERSON(ExpectedValue: string, positionRow = 1) {
        try {
          const lblActualValue = By.xpath(`//*[@id='preview-part']//tbody//tr[${positionRow}]//td[9]//span`);
          await this.driverService.waitUntilElementLoaded(lblActualValue);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
          const actualValue = await this.driverService.getText(lblActualValue);
          return await this.driverService.validateRecord(`Validate Country at line ${positionRow}: `,
            [actualValue,ExpectedValue, `Incorrect Country`]
          );
        } catch (error) {
          console.log('validateCountryOnPreviewTabPERSON');
          console.log(error);
          return false;
        }
      }

      public async validateEmailAddressOnPreviewTabPERSON(ExpectedValue: string, positionRow = 1) {
        try {
          const lblActualValue = By.xpath(`//*[@id='preview-part']//tbody//tr[${positionRow}]//td[10]//span`);
          await this.driverService.waitUntilElementLoaded(lblActualValue);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
          const actualValue = await this.driverService.getText(lblActualValue);
          return await this.driverService.validateRecord(`Validate EmailAddress at line ${positionRow}: `,
            [actualValue,ExpectedValue, `Incorrect EmailAddress`]
          );
        } catch (error) {
          console.log('validateEmailAddressOnPreviewTabPERSON');
          console.log(error);
          return false;
        }
      }

      public async validatePhoneNumberOnPreviewTabPERSON(ExpectedValue: string, positionRow = 1) {
        try {
          const lblActualValue = By.xpath(`//*[@id='preview-part']//tbody//tr[${positionRow}]//td[11]//span`);
          await this.driverService.waitUntilElementLoaded(lblActualValue);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
          const actualValue = await this.driverService.getText(lblActualValue);
          return await this.driverService.validateRecord(`Validate PhoneNumber at line ${positionRow}: `,
            [actualValue,ExpectedValue, `Incorrect PhoneNumber`]
          );
        } catch (error) {
          console.log('validatePhoneNumberOnPreviewTabPERSON');
          console.log(error);
          return false;
        }
      }

      public async validatePreferredCommunicationOnPreviewTab(ExpectedValue: string, positionRow = 1) {
        try {
          const lblActualValue = By.xpath(`//*[@id='preview-part']//tbody//tr[${positionRow}]//td[12]//span`);
          await this.driverService.waitUntilElementLoaded(lblActualValue);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
          const actualValue = await this.driverService.getText(lblActualValue);
          return await this.driverService.validateRecord(`Validate PreferredCommunication at line ${positionRow}: `,
            [actualValue,ExpectedValue, `Incorrect PreferredCommunication`]
          );
        } catch (error) {
          console.log('validatePreferredCommunicationOnPreviewTab');
          console.log(error);
          return false;
        }
      }

      public async validateStatusOnPreviewTabPERSON(ExpectedValue: string, positionRow = 1) {
        try {
          const lblActualValue = By.xpath(`//*[@id='preview-part']//tbody//tr[${positionRow}]//td[13]//span`);
          await this.driverService.waitUntilElementLoaded(lblActualValue);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
          const actualValue = await this.driverService.getText(lblActualValue);
          return await this.driverService.validateRecord(`Validate Status at line ${positionRow}: `,
            [actualValue,ExpectedValue, `Incorrect Status`]
          );
        } catch (error) {
          console.log('validateStatusOnPreviewTabPERSON');
          console.log(error);
          return false;
        }
      }

      public async validatePaymentTypeOnPreviewTabPERSON(ExpectedValue: string, positionRow = 1) {
        try {
          const lblActualValue = By.xpath(`//*[@id='preview-part']//tbody//tr[${positionRow}]//td[14]//span`);
          await this.driverService.waitUntilElementLoaded(lblActualValue);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
          const actualValue = await this.driverService.getText(lblActualValue);
          return await this.driverService.validateRecord(`Validate PaymentType at line ${positionRow}: `,
            [actualValue,ExpectedValue, `Incorrect PaymentType`]
          );
        } catch (error) {
          console.log('validatePaymentTypeOnPreviewTabPERSON');
          console.log(error);
          return false;
        }
      }

      public async validatePaymentMethodOnPreviewTabPERSON(ExpectedValue: string, positionRow = 1) {
        try {
          const lblActualValue = By.xpath(`//*[@id='preview-part']//tbody//tr[${positionRow}]//td[15]//span`);
          await this.driverService.waitUntilElementLoaded(lblActualValue);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
          const actualValue = await this.driverService.getText(lblActualValue);
          return await this.driverService.validateRecord(`Validate PaymentMethod at line ${positionRow}: `,
            [actualValue,ExpectedValue, `Incorrect PaymentMethod`]
          );
        } catch (error) {
          console.log('validatePaymentMethodOnPreviewTabPERSON');
          console.log(error);
          return false;
        }
      }

      public async validateKAMOnPreviewTabPERSON(ExpectedValue: string, positionRow = 1) {
        try {
          const lblActualValue = By.xpath(`//*[@id='preview-part']//tbody//tr[${positionRow}]//td[16]//span`);
          await this.driverService.waitUntilElementLoaded(lblActualValue);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
          const actualValue = await this.driverService.getText(lblActualValue);
          return await this.driverService.validateRecord(`Validate KAM at line ${positionRow}: `,
            [actualValue,ExpectedValue, `Incorrect KAM`]
          );
        } catch (error) {
          console.log('validateKAMOnPreviewTabPERSON');
          console.log(error);
          return false;
        }
      }

      //#endregion


      //#region Validate value COMPANY account
      public async validateCompanyNameOnPreviewTab(ExpectedValue: string, positionRow = 1) {
        try {
          const lblActualValue = By.xpath(`//*[@id='preview-part']//tbody//tr[${positionRow}]//td[2]//span`);
          await this.driverService.waitUntilElementLoaded(lblActualValue);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
          const actualValue = await this.driverService.getText(lblActualValue);
          return await this.driverService.validateRecord(`Validate CompanyName at line ${positionRow}: `,
            [actualValue,ExpectedValue, `Incorrect CompanyName`]
          );
        } catch (error) {
          console.log('validateCompanyNameOnPreviewTab');
          console.log(error);
          return false;
        }
      }

      public async validateStatusOnPreviewTabCOMPANY(ExpectedValue: string, positionRow = 1) {
        try {
          const lblActualValue = By.xpath(`//*[@id='preview-part']//tbody//tr[${positionRow}]//td[3]//span`);
          await this.driverService.waitUntilElementLoaded(lblActualValue);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
          const actualValue = await this.driverService.getText(lblActualValue);
          return await this.driverService.validateRecord(`Validate Status at line ${positionRow}: `,
            [actualValue,ExpectedValue, `Incorrect Status`]
          );
        } catch (error) {
          console.log('validateStatusOnPreviewTabCOMPANY');
          console.log(error);
          return false;
        }
      }

      public async validateEmailAddressOnPreviewTabCOMPANY(ExpectedValue: string, positionRow = 1) {
        try {
          const lblActualValue = By.xpath(`//*[@id='preview-part']//tbody//tr[${positionRow}]//td[4]//span`);
          await this.driverService.waitUntilElementLoaded(lblActualValue);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
          const actualValue = await this.driverService.getText(lblActualValue);
          return await this.driverService.validateRecord(`Validate EmailAddress at line ${positionRow}: `,
            [actualValue,ExpectedValue, `Incorrect EmailAddress`]
          );
        } catch (error) {
          console.log('validateEmailAddressOnPreviewTabCOMPANY');
          console.log(error);
          return false;
        }
      }

      public async validatePhoneNumberOnPreviewTabCOMPANY(ExpectedValue: string, positionRow = 1) {
        try {
          const lblActualValue = By.xpath(`//*[@id='preview-part']//tbody//tr[${positionRow}]//td[5]//span`);
          await this.driverService.waitUntilElementLoaded(lblActualValue);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
          const actualValue = await this.driverService.getText(lblActualValue);
          return await this.driverService.validateRecord(`Validate PhoneNumber at line ${positionRow}: `,
            [actualValue,ExpectedValue, `Incorrect PhoneNumber`]
          );
        } catch (error) {
          console.log('validatePhoneNumberOnPreviewTabCOMPANY');
          console.log(error);
          return false;
        }
      }

      public async validateCountryOnPreviewTabCOMPANY(ExpectedValue: string, positionRow = 1) {
        try {
          const lblActualValue = By.xpath(`//*[@id='preview-part']//tbody//tr[${positionRow}]//td[6]//span`);
          await this.driverService.waitUntilElementLoaded(lblActualValue);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
          const actualValue = await this.driverService.getText(lblActualValue);
          return await this.driverService.validateRecord(`Validate Country at line ${positionRow}: `,
            [actualValue,ExpectedValue, `Incorrect Country`]
          );
        } catch (error) {
          console.log('validateCountryOnPreviewTabCOMPANY');
          console.log(error);
          return false;
        }
      }

      public async validateVisitingAddressOnPreviewTab(ExpectedValue: string, positionRow = 1) {
        try {
          const lblActualValue = By.xpath(`//*[@id='preview-part']//tbody//tr[${positionRow}]//td[7]//span`);
          await this.driverService.waitUntilElementLoaded(lblActualValue);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
          const actualValue = await this.driverService.getText(lblActualValue);
          return await this.driverService.validateRecord(`Validate VisitingAddress at line ${positionRow}: `,
            [actualValue,ExpectedValue, `Incorrect VisitingAddress`]
          );
        } catch (error) {
          console.log('validateVisitingAddressOnPreviewTab');
          console.log(error);
          return false;
        }
      }

      public async validateExtraVisitingAddressOnPreviewTab(ExpectedValue: string, positionRow = 1) {
        try {
          const lblActualValue = By.xpath(`//*[@id='preview-part']//tbody//tr[${positionRow}]//td[8]//span`);
          await this.driverService.waitUntilElementLoaded(lblActualValue);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
          const actualValue = await this.driverService.getText(lblActualValue);
          return await this.driverService.validateRecord(`Validate ExtraVisitingAddress at line ${positionRow}: `,
            [actualValue,ExpectedValue, `Incorrect ExtraVisitingAddress`]
          );
        } catch (error) {
          console.log('validateExtraVisitingAddressOnPreviewTab');
          console.log(error);
          return false;
        }
      }

      public async validateVisitingPostcodeOnPreviewTab(ExpectedValue: string, positionRow = 1) {
        try {
          const lblActualValue = By.xpath(`//*[@id='preview-part']//tbody//tr[${positionRow}]//td[9]//span`);
          await this.driverService.waitUntilElementLoaded(lblActualValue);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
          const actualValue = await this.driverService.getText(lblActualValue);
          return await this.driverService.validateRecord(`Validate VisitingPostcode at line ${positionRow}: `,
            [actualValue,ExpectedValue, `Incorrect VisitingPostcode`]
          );
        } catch (error) {
          console.log('validateVisitingPostcodeOnPreviewTab');
          console.log(error);
          return false;
        }
      }

      public async validateVisitingCityOnPreviewTab(ExpectedValue: string, positionRow = 1) {
        try {
          const lblActualValue = By.xpath(`//*[@id='preview-part']//tbody//tr[${positionRow}]//td[10]//span`);
          await this.driverService.waitUntilElementLoaded(lblActualValue);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
          const actualValue = await this.driverService.getText(lblActualValue);
          return await this.driverService.validateRecord(`Validate VisitingCity at line ${positionRow}: `,
            [actualValue,ExpectedValue, `Incorrect VisitingCity`]
          );
        } catch (error) {
          console.log('validateVisitingCityOnPreviewTab');
          console.log(error);
          return false;
        }
      }

      public async validatePostalAddressOnPreviewTab(ExpectedValue: string, positionRow = 1) {
        try {
          const lblActualValue = By.xpath(`//*[@id='preview-part']//tbody//tr[${positionRow}]//td[11]//span`);
          await this.driverService.waitUntilElementLoaded(lblActualValue);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
          const actualValue = await this.driverService.getText(lblActualValue);
          return await this.driverService.validateRecord(`Validate PostalAddress at line ${positionRow}: `,
            [actualValue,ExpectedValue, `Incorrect PostalAddress`]
          );
        } catch (error) {
          console.log('validatePostalAddressOnPreviewTab');
          console.log(error);
          return false;
        }
      }

      public async validatePostalExtraAddressOnPreviewTab(ExpectedValue: string, positionRow = 1) {
        try {
          const lblActualValue = By.xpath(`//*[@id='preview-part']//tbody//tr[${positionRow}]//td[12]//span`);
          await this.driverService.waitUntilElementLoaded(lblActualValue);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
          const actualValue = await this.driverService.getText(lblActualValue);
          return await this.driverService.validateRecord(`Validate PostalExtraAddress at line ${positionRow}: `,
            [actualValue,ExpectedValue, `Incorrect PostalExtraAddress`]
          );
        } catch (error) {
          console.log('validatePostalExtraAddressOnPreviewTab');
          console.log(error);
          return false;
        }
      }

      public async validatePostalPostcodeOnPreviewTab(ExpectedValue: string, positionRow = 1) {
        try {
          const lblActualValue = By.xpath(`//*[@id='preview-part']//tbody//tr[${positionRow}]//td[13]//span`);
          await this.driverService.waitUntilElementLoaded(lblActualValue);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
          const actualValue = await this.driverService.getText(lblActualValue);
          return await this.driverService.validateRecord(`Validate PostalPostcode at line ${positionRow}: `,
            [actualValue,ExpectedValue, `Incorrect PostalPostcode`]
          );
        } catch (error) {
          console.log('validatePostalPostcodeOnPreviewTab');
          console.log(error);
          return false;
        }
      }

      public async validatePostalCityOnPreviewTab(ExpectedValue: string, positionRow = 1) {
        try {
          const lblActualValue = By.xpath(`//*[@id='preview-part']//tbody//tr[${positionRow}]//td[14]//span`);
          await this.driverService.waitUntilElementLoaded(lblActualValue);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
          const actualValue = await this.driverService.getText(lblActualValue);
          return await this.driverService.validateRecord(`Validate PostalCity at line ${positionRow}: `,
            [actualValue,ExpectedValue, `Incorrect PostalCity`]
          );
        } catch (error) {
          console.log('validatePostalCityOnPreviewTab');
          console.log(error);
          return false;
        }
      }

      public async validateInvoiceAddressOnPreviewTab(ExpectedValue: string, positionRow = 1) {
        try {
          const lblActualValue = By.xpath(`//*[@id='preview-part']//tbody//tr[${positionRow}]//td[15]//span`);
          await this.driverService.waitUntilElementLoaded(lblActualValue);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
          const actualValue = await this.driverService.getText(lblActualValue);
          return await this.driverService.validateRecord(`Validate InvoiceAddress at line ${positionRow}: `,
            [actualValue,ExpectedValue, `Incorrect InvoiceAddress`]
          );
        } catch (error) {
          console.log('validateInvoiceAddressOnPreviewTab');
          console.log(error);
          return false;
        }
      }

      public async validateInvoiceExtraAddressOnPreviewTab(ExpectedValue: string, positionRow = 1) {
        try {
          const lblActualValue = By.xpath(`//*[@id='preview-part']//tbody//tr[${positionRow}]//td[16]//span`);
          await this.driverService.waitUntilElementLoaded(lblActualValue);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
          const actualValue = await this.driverService.getText(lblActualValue);
          return await this.driverService.validateRecord(`Validate InvoiceExtraAddress at line ${positionRow}: `,
            [actualValue,ExpectedValue, `Incorrect InvoiceExtraAddress`]
          );
        } catch (error) {
          console.log('validateInvoiceExtraAddressOnPreviewTab');
          console.log(error);
          return false;
        }
      }

      public async validateInvoicePostcodeOnPreviewTab(ExpectedValue: string, positionRow = 1) {
        try {
          const lblActualValue = By.xpath(`//*[@id='preview-part']//tbody//tr[${positionRow}]//td[17]//span`);
          await this.driverService.waitUntilElementLoaded(lblActualValue);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
          const actualValue = await this.driverService.getText(lblActualValue);
          return await this.driverService.validateRecord(`Validate InvoicePostcode at line ${positionRow}: `,
            [actualValue,ExpectedValue, `Incorrect InvoicePostcode`]
          );
        } catch (error) {
          console.log('validateInvoicePostcodeOnPreviewTab');
          console.log(error);
          return false;
        }
      }

      public async validateInvoiceCityOnPreviewTab(ExpectedValue: string, positionRow = 1) {
        try {
          const lblActualValue = By.xpath(`//*[@id='preview-part']//tbody//tr[${positionRow}]//td[18]//span`);
          await this.driverService.waitUntilElementLoaded(lblActualValue);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
          const actualValue = await this.driverService.getText(lblActualValue);
          return await this.driverService.validateRecord(`Validate InvoiceCity at line ${positionRow}: `,
            [actualValue,ExpectedValue, `Incorrect InvoiceCity`]
          );
        } catch (error) {
          console.log('validateInvoiceCityOnPreviewTab');
          console.log(error);
          return false;
        }
      }

      public async validateIndustryOnPreviewTab(ExpectedValue: string, positionRow = 1) {
        try {
          const lblActualValue = By.xpath(`//*[@id='preview-part']//tbody//tr[${positionRow}]//td[19]//span`);
          await this.driverService.waitUntilElementLoaded(lblActualValue);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
          const actualValue = await this.driverService.getText(lblActualValue);
          return await this.driverService.validateRecord(`Validate Industry at line ${positionRow}: `,
            [actualValue,ExpectedValue, `Incorrect Industry`]
          );
        } catch (error) {
          console.log('validateIndustryOnPreviewTab');
          console.log(error);
          return false;
        }
      }

      public async validatePaymentTypeOnPreviewTabCOMPANY(ExpectedValue: string, positionRow = 1) {
        try {
          const lblActualValue = By.xpath(`//*[@id='preview-part']//tbody//tr[${positionRow}]//td[20]//span`);
          await this.driverService.waitUntilElementLoaded(lblActualValue);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
          const actualValue = await this.driverService.getText(lblActualValue);
          return await this.driverService.validateRecord(`Validate PaymentType at line ${positionRow}: `,
            [actualValue,ExpectedValue, `Incorrect PaymentType`]
          );
        } catch (error) {
          console.log('validatePaymentTypeOnPreviewTabCOMPANY');
          console.log(error);
          return false;
        }
      }

      public async validatePaymentMethodOnPreviewTabCOMPANY(ExpectedValue: string, positionRow = 1) {
        try {
          const lblActualValue = By.xpath(`//*[@id='preview-part']//tbody//tr[${positionRow}]//td[21]//span`);
          await this.driverService.waitUntilElementLoaded(lblActualValue);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
          const actualValue = await this.driverService.getText(lblActualValue);
          return await this.driverService.validateRecord(`Validate PaymentMethod at line ${positionRow}: `,
            [actualValue,ExpectedValue, `Incorrect PaymentMethod`]
          );
        } catch (error) {
          console.log('validatePaymentMethodOnPreviewTabCOMPANY');
          console.log(error);
          return false;
        }
      }

      public async validateKAMOnPreviewTabCOMPANY(ExpectedValue: string, positionRow = 1) {
        try {
          const lblActualValue = By.xpath(`//*[@id='preview-part']//tbody//tr[${positionRow}]//td[22]//span`);
          await this.driverService.waitUntilElementLoaded(lblActualValue);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
          const actualValue = await this.driverService.getText(lblActualValue);
          return await this.driverService.validateRecord(`Validate KAM at line ${positionRow}: `,
            [actualValue,ExpectedValue, `Incorrect KAM`]
          );
        } catch (error) {
          console.log('validateKAMOnPreviewTabCOMPANY');
          console.log(error);
          return false;
        }
      }
      //#endregion
}

