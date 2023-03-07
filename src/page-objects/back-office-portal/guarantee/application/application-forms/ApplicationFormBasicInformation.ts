import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { ApplicationFormBasicInformationInterface } from "../../../../../interfaces/guarantee/application/application-forms/ApplicationFormBasicInformationInterface";
import { logInfoMessage, waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";

const remote = require("selenium-webdriver/remote");

export class ApplicationFormBasicInformation implements ApplicationFormBasicInformationInterface {
  constructor(protected driverService: SeleniumWebDriverService) { }

  //#region Xpaths on Basic information when input
  // 1. Applicaiton section
  protected dtpExpiryDateApplication = By.xpath("//*[contains(local-name(),'form')]//input[@name='ApplicationExpiryDateTag']");
  protected lblExpiryDateApplication = By.xpath(`//*[contains(local-name(),'form')]//label[./span[text()='Expiry date']]//following-sibling::div/p`);
  protected lblFrameAgreementNumberApplication = By.xpath("//*[contains(local-name(),'form')]//div[.//input[@name='AgreementNumberTag']]/p");
  protected lblProductApplication = By.xpath("//*[contains(local-name(),'form')]//div[.//input[@name='ProductNameTag']]/p");
  protected cbxOnDemand = By.xpath("//*[contains(local-name(),'form')]//label[./input[@name='OnDemandTag']]");
  protected cbxOnDemandValue = By.xpath("//*[contains(local-name(),'form')]//input[@name='OnDemandTag']");

  // 2. Guarantee section
  protected lblGuaranteeNoGuarantee = By.xpath("//*[contains(local-name(),'form')]//div[.//input[@name='GuaranteeNumberTag']]/p");
  protected txtGuaranteeNoGuarantee = By.xpath("//*[contains(local-name(),'form')]//div[.//input[@name='GuaranteeNumberTag']]/input");
  protected txtDescriptionGuarantee = By.xpath("//*[contains(local-name(),'form')]//input[@name='GuaranteeNameTag']");
  protected lblDescriptionGuarantee = By.xpath("//*[contains(local-name(),'form')]//input[@name='GuaranteeNameTag']//preceding-sibling::p");
  protected lblGuaranteeTypeGuarantee = By.xpath("//*[contains(local-name(),'form')]//div[.//*[@name='GuaranteeTypeTag']]/p");
  protected lblCurrencyGuarantee = By.xpath(`//*[contains(local-name(),'form')]//div[./*[@name='GuaranteeCurrencyTag']]/p`);
  protected dtpIssuedDateGuarantee = By.xpath("//*[contains(local-name(),'form')]//input[@name='GuaranteeIssuedDateTag']");

  // 3. Beneficiary section
  protected cbxIsPerson = By.xpath("//*[contains(local-name(),'form')]//input[@name='IsPerson']");
  protected cbxIsPersonTick = By.xpath("//*[contains(local-name(),'form')]//input[@name='IsPerson']//following-sibling::span");
  protected fileBeneficiaryDataBeneficiary = By.xpath("//*[contains(local-name(),'form')]//input[@name='MultipleGuaranteesDocument' and @type='file']");
  protected txtBeneficiaryBeneficiary = By.xpath("//*[contains(local-name(),'form')]//input[@name='BeneficiaryTag']");
  protected lblBeneficiaryBeneficiary = By.xpath("//*[contains(local-name(),'form')]//input[@name='BeneficiaryTag']//preceding-sibling::p");

  protected txtOrgNrBeneficiary = By.xpath("//*[contains(local-name(),'form')]//input[@name='BeneficiaryOrganisationNumberTag']");
  protected lblOrgNrBeneficiary = By.xpath("//*[contains(local-name(),'form')]//input[@name='BeneficiaryOrganisationNumberTag']//preceding-sibling::p");
  protected dtpDateOfBirthBeneficiary = By.xpath("//*[contains(local-name(),'form')]//input[@name='BeneficiaryDOB']");
  protected lblDateOfBirthBeneficiary = By.xpath("//*[contains(local-name(),'form')]//input[@name='BeneficiaryDOB']//preceding-sibling::p");

  protected txtAddressBeneficiary = By.xpath("//*[contains(local-name(),'form')]//input[@name='BeneficiaryAddressTag']");
  protected lblAddressBeneficiary = By.xpath("//*[contains(local-name(),'form')]//input[@name='BeneficiaryAddressTag']//preceding-sibling::p");
  protected txtPostcodeBeneficiary = By.xpath("//*[contains(local-name(),'form')]//input[@name='BeneficiaryZipCodeTag']");
  protected lblPostcodeBeneficiary = By.xpath("//*[contains(local-name(),'form')]//input[@name='BeneficiaryZipCodeTag']//preceding-sibling::p");
  protected txtCityBeneficiary = By.xpath("//*[contains(local-name(),'form')]//input[@name='BeneficiaryCityTag']");
  protected lblCityBeneficiary = By.xpath("//*[contains(local-name(),'form')]//input[@name='BeneficiaryCityTag']//preceding-sibling::p");
  protected txtOtherInformationBeneficiary = By.xpath("//*[contains(local-name(),'form')]//textarea[@name='BeneficiaryOtherInfoTag']");


  // 3.2 Beneficiary 2 section
  protected txtBeneficiary2Beneficiary = By.xpath("//*[contains(local-name(),'form')]//input[@name='Beneficiary2Tag']");
  protected lblBeneficiary2Beneficiary = By.xpath("//*[contains(local-name(),'form')]//input[@name='Beneficiary2Tag']//preceding-sibling::p");

  protected txtOrgNr2Beneficiary = By.xpath("//*[contains(local-name(),'form')]//input[@name='Beneficiary2OrganisationNumberTag']");
  protected lblOrgNr2Beneficiary = By.xpath("//*[contains(local-name(),'form')]//input[@name='Beneficiary2OrganisationNumberTag']//preceding-sibling::p");
  protected dtpDateOfBirth2Beneficiary = By.xpath("//*[contains(local-name(),'form')]//input[@name='Beneficiary2DOB']");
  protected lblDateOfBirth2Beneficiary = By.xpath("//*[contains(local-name(),'form')]//input[@name='Beneficiary2DOB']//preceding-sibling::p");

  protected txtAddress2Beneficiary = By.xpath("//*[contains(local-name(),'form')]//input[@name='Beneficiary2AddressTag']");
  protected lblAddress2Beneficiary = By.xpath("//*[contains(local-name(),'form')]//input[@name='Beneficiary2AddressTag']//preceding-sibling::p");
  protected txtPostcode2Beneficiary = By.xpath("//*[contains(local-name(),'form')]//input[@name='Beneficiary2ZipCodeTag']");
  protected lblPostcode2Beneficiary = By.xpath("//*[contains(local-name(),'form')]//input[@name='Beneficiary2ZipCodeTag']//preceding-sibling::p");
  protected txtCity2Beneficiary = By.xpath("//*[contains(local-name(),'form')]//input[@name='Beneficiary2CityTag']");
  protected lblCity2Beneficiary = By.xpath("//*[contains(local-name(),'form')]//input[@name='Beneficiary2CityTag']//preceding-sibling::p");
  protected txtOtherInformation2Beneficiary = By.xpath("//*[contains(local-name(),'form')]//textarea[@name='Beneficiary2OtherInfoTag']");


  // 4. Debtor
  protected txtOrdererDebtor = By.xpath("//*[contains(local-name(),'form')]//input[@name='GuaranteedebitorTag']");
  protected txtOrganisationNumberDebtor = By.xpath("//*[contains(local-name(),'form')]//input[@name='GuaranteedebitorOrganisationNumberTag']");
  protected txtAddressDebtor = By.xpath("//*[contains(local-name(),'form')]//input[@name='GuaranteedebitorAddressTag']");
  protected txtPostcodeDebtor = By.xpath("//*[contains(local-name(),'form')]//input[@name='GuaranteedebitorZipCodeTag']");
  protected txtCityDebtor = By.xpath("//*[contains(local-name(),'form')]//input[@name='GuaranteedebitorCityTag']");
  protected txtOtherInformationDebtor = By.xpath("//*[contains(local-name(),'form')]//textarea[@name='GuaranteedebitorOtherInfoTag']");

  protected lblOrdererDebtor = By.xpath("//*[contains(local-name(),'form')]//input[@name='GuaranteedebitorTag']//preceding-sibling::p");
  protected lblOrganisationNumberDebtor = By.xpath("//*[contains(local-name(),'form')]//input[@name='GuaranteedebitorOrganisationNumberTag']//preceding-sibling::p");
  protected lblAddressDebtor = By.xpath("//*[contains(local-name(),'form')]//input[@name='GuaranteedebitorAddressTag']//preceding-sibling::p");
  protected lblPostcodeDebtor = By.xpath("//*[contains(local-name(),'form')]//input[@name='GuaranteedebitorZipCodeTag']//preceding-sibling::p");
  protected lblCityDebtor = By.xpath("//*[contains(local-name(),'form')]//input[@name='GuaranteedebitorCityTag']//preceding-sibling::p");
  //#endregion


  //#region Xpaths on Basic information when get value
  // 1. Applicaiton section
  protected dtpExpiryDateApplicationValue = By.xpath("//*[contains(local-name(),'form')]//div[.//input[@name='ApplicationExpiryDateTag']]/p");

  // 2. Guarantee section
  protected dtpIssuedDateGuaranteeValue = By.xpath("//*[contains(local-name(),'form')]//div[.//input[@name='GuaranteeIssuedDateTag']]/p");
  //#endregion

  //#region Input value
  // 1. Application section
  public async inputExpiryDateApplication(ExpiryDate: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.dtpExpiryDateApplication);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.setText(this.dtpExpiryDateApplication, ExpiryDate);
      await this.driverService.pressTabCurrentElement();
      return true;
    } catch (error) {
      console.log("inputExpiryDateApplication");
      console.log(error);
      return false;
    }
  }

  // 2. Guarantee section
  public async inputDescriptionGuarantee(Description: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtDescriptionGuarantee);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtDescriptionGuarantee, Description);
      return true;
    } catch (error) {
      console.log("inputDescriptionGuarantee");
      console.log(error);
      return false;
    }
  }

  public async inputGuaranteeNoGuarantee(GuaranteeNo: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtGuaranteeNoGuarantee);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtGuaranteeNoGuarantee, GuaranteeNo);
      return true;
    } catch (error) {
      console.log("inputGuaranteeNoGuarantee");
      console.log(error);
      return false;
    }
  }

  public async inputIssuedDateGuarantee(IssuedDate: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.dtpIssuedDateGuarantee);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.dtpIssuedDateGuarantee, IssuedDate);
      await this.driverService.pressTabCurrentElement();
      return true;
    } catch (error) {
      console.log("inputIssuedDateGuarantee");
      console.log(error);
      return false;
    }
  }

 

  /**
     * 
     * @param BeneficiaryData Just input one file at a time.
     * @returns 
     */
  public async inputBeneficiaryData(BeneficiaryData: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.fileBeneficiaryDataBeneficiary);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      if (__dirname.includes("jenkins") && !__dirname.includes(".jenkins")) {
        logInfoMessage("\tSet File Detector on Jenkins...");
        await this.driverService.getDriver().setFileDetector(new remote.FileDetector());
        logInfoMessage("File dir: " + __dirname);
      }
      await (await this.driverService.findElement(this.fileBeneficiaryDataBeneficiary)).sendKeys(BeneficiaryData);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      return true;
    } catch (error) {
      console.log("inputBeneficiaryData");
      console.log(error);
      return false;
    }
  }

  public async inputBeneficiaryBeneficiary(Beneficiary: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtBeneficiaryBeneficiary);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtBeneficiaryBeneficiary, Beneficiary);
      return true;
    } catch (error) {
      console.log("inputBeneficiaryBeneficiary");
      console.log(error);
      return false;
    }
  }

  public async inputOrgNrBeneficiary(OrgNr: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtOrgNrBeneficiary);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 1500);
      await this.driverService.setText(this.txtOrgNrBeneficiary, OrgNr);
      return true;
    } catch (error) {
      console.log("inputOrgNrBeneficiary");
      console.log(error);
      return false;
    }
  }

  public async inputDateOfBirthBeneficiary(DateOfBirth: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.dtpDateOfBirthBeneficiary);
      await this.driverService.pressTabCurrentElement();
      await this.driverService.pressTabCurrentElement();
      await this.driverService.pressTabCurrentElement();
      await this.driverService.pressTabCurrentElement();
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 1500);
      await this.driverService.setText(this.dtpDateOfBirthBeneficiary, DateOfBirth);
      await this.driverService.pressTabCurrentElement();
      return true;
    } catch (error) {
      console.log("inputDateOfBirthBeneficiary");
      console.log(error);
      return false;
    }
  }

  public async inputAddressBeneficiary(Address: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtAddressBeneficiary);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtAddressBeneficiary, Address);
      return true;
    } catch (error) {
      console.log("inputAddressBeneficiary");
      console.log(error);
      return false;
    }
  }

  public async inputPostcodeBeneficiary(Postcode: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtPostcodeBeneficiary);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtPostcodeBeneficiary, Postcode);
      return true;
    } catch (error) {
      console.log("inputPostcodeBeneficiary");
      console.log(error);
      return false;
    }
  }

  public async inputCityBeneficiary(City: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtCityBeneficiary);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtCityBeneficiary, City);
      return true;
    } catch (error) {
      console.log("inputCityBeneficiary");
      console.log(error);
      return false;
    }
  }

  public async inputOtherInformationBeneficiary(OtherInformation: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtOtherInformationBeneficiary);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtOtherInformationBeneficiary, OtherInformation);
      return true;
    } catch (error) {
      console.log("inputOtherInformationBeneficiary");
      console.log(error);
      return false;
    }
  }


  // 3.2 Beneficiary2 section
  public async inputBeneficiary2Beneficiary(Beneficiary2: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtBeneficiary2Beneficiary);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtBeneficiary2Beneficiary, Beneficiary2);
      return true;
    } catch (error) {
      console.log("inputBeneficiary2Beneficiary");
      console.log(error);
      return false;
    }
  }

  public async inputOrgNr2Beneficiary(OrgNr2: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtOrgNr2Beneficiary);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 1500);
      await this.driverService.setText(this.txtOrgNr2Beneficiary, OrgNr2);
      return true;
    } catch (error) {
      console.log("inputOrgNr2Beneficiary");
      console.log(error);
      return false;
    }
  }

  public async inputDateOfBirth2Beneficiary(DateOfBirth2: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.dtpDateOfBirth2Beneficiary);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.dtpDateOfBirth2Beneficiary, DateOfBirth2);
      await this.driverService.pressTabCurrentElement();
      return true;
    } catch (error) {
      console.log("inputDateOfBirth2Beneficiary");
      console.log(error);
      return false;
    }
  }

  public async inputAddress2Beneficiary(Address2: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtAddress2Beneficiary);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtAddress2Beneficiary, Address2);
      return true;
    } catch (error) {
      console.log("inputAddress2Beneficiary");
      console.log(error);
      return false;
    }
  }

  public async inputPostcode2Beneficiary(Postcode2: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtPostcode2Beneficiary);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtPostcode2Beneficiary, Postcode2);
      return true;
    } catch (error) {
      console.log("inputPostcode2Beneficiary");
      console.log(error);
      return false;
    }
  }

  public async inputCity2Beneficiary(City2: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtCity2Beneficiary);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtCity2Beneficiary, City2);
      return true;
    } catch (error) {
      console.log("inputCity2Beneficiary");
      console.log(error);
      return false;
    }
  }

  public async inputOtherInformation2Beneficiary(OtherInformation2: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtOtherInformation2Beneficiary);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtOtherInformation2Beneficiary, OtherInformation2);
      return true;
    } catch (error) {
      console.log("inputOtherInformation2Beneficiary");
      console.log(error);
      return false;
    }
  }

  // 4. Debtor section
  public async inputOrdererDebtor(Orderer: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtOrdererDebtor);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtOrdererDebtor, Orderer);
      return true;
    } catch (error) {
      console.log("inputOrdererDebtor");
      console.log(error);
      return false;
    }
  }

  public async inputOrganisationNumberDebtor(OrganisationNumber: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtOrganisationNumberDebtor);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      if (await this.driverService.canBeSetText(this.txtOrganisationNumberDebtor)) {
        await this.driverService.setText(this.txtOrganisationNumberDebtor, OrganisationNumber);
      }
      return true;
    } catch (error) {
      console.log("inputOrganisationNumberDebtor");
      console.log(error);
      return false;
    }
  }

  public async inputAddressDebtor(Address: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtAddressDebtor);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtAddressDebtor, Address);
      return true;
    } catch (error) {
      console.log("inputAddressDebtor");
      console.log(error);
      return false;
    }
  }

  public async inputPostcodeDebtor(Postcode: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtPostcodeDebtor);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtPostcodeDebtor, Postcode);
      return true;
    } catch (error) {
      console.log("inputPostcodeDebtor");
      console.log(error);
      return false;
    }
  }

  public async inputCityDebtor(City: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtCityDebtor);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtCityDebtor, City);
      return true;
    } catch (error) {
      console.log("inputCityDebtor");
      console.log(error);
      return false;
    }
  }

  public async inputOtherInformationDebtor(OtherInformation: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtOtherInformationDebtor);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtOtherInformationDebtor, OtherInformation);
      return true;
    } catch (error) {
      console.log("inputOtherInformationDebtor");
      console.log(error);
      return false;
    }
  }

  //#endregion

  //#region Validate value
  // 1. Application section
  public async validateExpiryDateApplication(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.dtpExpiryDateApplicationValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getAttributeValue(this.dtpExpiryDateApplicationValue,"title");
      return await this.driverService.validateRecord(
        `Validate field Expiry Date Application`,
        [ActualValue, ExpectedValue, `Incorrect Expiry Date Application!`]
      );
    } catch (error) {
      console.log("validateExpiryDateApplication");
      console.log(error);
      return false;
    }
  }

  public async validateFrameAgreementNumberApplication(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblFrameAgreementNumberApplication);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblFrameAgreementNumberApplication);
      return await this.driverService.validateRecord(
        `Validate field Frame Agreement Number Application`,
        [ActualValue, ExpectedValue, `Incorrect Frame Agreement Number Application!`]
      );
    } catch (error) {
      console.log("validateFrameAgreementNumberApplication");
      console.log(error);
      return false;
    }
  }

  public async validateProductApplication(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblProductApplication);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblProductApplication);
      return await this.driverService.validateRecord(
        `Validate field Product Application`,
        [ActualValue, ExpectedValue, `Incorrect Product Application!`]
      );
    } catch (error) {
      console.log("validateProductApplication");
      console.log(error);
      return false;
    }
  }
  public async checkOnDemandApplication() {
    try {
      await this.driverService.waitUntilElementLoaded(this.cbxOnDemand);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.click(this.cbxOnDemand);
      return true;
    } catch (error) {
      console.log('checkOnDemandApplication');
      console.log(error);
      return false;
    }
  }

  public async isOnDemandChecked() {
    try {
      logInfoMessage("Validating default On Demand checkbox...");
      await this.driverService.waitUntilElementLoaded(this.cbxOnDemandValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      return await this.driverService.getAttributeValue(this.cbxOnDemandValue, "checked") === "true";
    } catch (error) {
      console.log('isOnDemandChecked');
      console.log(error);
      return false;
    }
  }
  // 2. Guarantee section
  public async validateGuaranteeNoGuarantee(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblGuaranteeNoGuarantee);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblGuaranteeNoGuarantee);
      return await this.driverService.validateRecord(
        `Validate field Guarantee No Guarantee`,
        [ActualValue, ExpectedValue, `Incorrect Guarantee No Guarantee!`]
      );
    } catch (error) {
      console.log("validateGuaranteeNoGuarantee");
      console.log(error);
      return false;
    }
  }

  public async validateDescriptionGuarantee(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtDescriptionGuarantee);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getAttributeValue(this.txtDescriptionGuarantee, "title");
      if (ActualValue.includes(ExpectedValue)) {
        ExpectedValue = ActualValue;
      }
      return await this.driverService.validateRecord(
        `Validate field Description Guarantee`,
        [ActualValue, ExpectedValue, `Incorrect Description Guarantee!`]
      );
    } catch (error) {
      console.log("validateDescriptionGuarantee");
      console.log(error);
      return false;
    }
  }

  public async validateGuaranteeTypeGuarantee(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblGuaranteeTypeGuarantee);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblGuaranteeTypeGuarantee);
      return await this.driverService.validateRecord(
        `Validate field Guarantee Type Guarantee`,
        [ActualValue, ExpectedValue, `Incorrect Guarantee Type Guarantee!`]
      );
    } catch (error) {
      console.log("validateGuaranteeTypeGuarantee");
      console.log(error);
      return false;
    }
  }
  public async validateCurrencyGuarantee(expectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblCurrencyGuarantee);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const actualValue = await this.driverService.getText(this.lblCurrencyGuarantee);
      return await this.driverService.validateRecord("Validate Currency",
        [actualValue, expectedValue, "Incorrect Currency"]
      );
    } catch (error) {
      console.log('validateCurrencyGuarantee');
      console.log(error);
      return false;
    }
  }
  public async validateIssuedDateGuarantee(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.dtpIssuedDateGuaranteeValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getAttributeValue(this.dtpIssuedDateGuaranteeValue,"title");
      return await this.driverService.validateRecord(
        `Validate field Issued Date Guarantee`,
        [ActualValue, ExpectedValue, `Incorrect Issued Date Guarantee!`]
      );
    } catch (error) {
      console.log("validateIssuedDateGuarantee");
      console.log(error);
      return false;
    }
  }
   // 3. Beneficiary section
   public async checkIsPersonBeneficiary() {
    try {
      await this.driverService.waitUntilElementLoaded(this.cbxIsPersonTick);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.click(this.cbxIsPersonTick);
      return true;
    } catch (error) {
      console.log('checkIsPersonBeneficiary');
      console.log(error);
      return false;
    }
  }
  public async IsPersonBeneficiaryChecked() {
    try {
      logInfoMessage("Validating default Isperson checkbox...");
      await this.driverService.waitUntilElementLoaded(this.cbxIsPerson);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      return await this.driverService.getAttributeValue(this.cbxIsPerson, "checked") === "true";
    } catch (error) {
      console.log('IsPersonBeneficiaryChecked');
      console.log(error);
      return false;
    }
  }

  public async validateBeneficiaryBeneficiary(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtBeneficiaryBeneficiary);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getAttributeValue(this.txtBeneficiaryBeneficiary, "title");
      return await this.driverService.validateRecord(
        `Validate field Beneficiary`,
        [ActualValue, ExpectedValue, `Incorrect Beneficiary!`]
      );
    } catch (error) {
      console.log("validateBeneficiaryBeneficiary");
      console.log(error);
      return false;
    }
  }
  public async validateOrgNrBeneficiary(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtOrgNrBeneficiary);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getAttributeValue(this.txtOrgNrBeneficiary, "title");
      return await this.driverService.validateRecord(
        `Validate field OrgNrBeneficiary`,
        [ActualValue, ExpectedValue, `Incorrect OrgNrBeneficiary!`]
      );
    } catch (error) {
      console.log("validateOrgNrBeneficiary");
      console.log(error);
      return false;
    }
  }
  public async validateAddressBeneficiary(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtAddressBeneficiary);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getAttributeValue(this.txtAddressBeneficiary, "title");
      return await this.driverService.validateRecord(
        `Validate field AddressBeneficiary`,
        [ActualValue, ExpectedValue, `Incorrect AddressBeneficiary!`]
      );
    } catch (error) {
      console.log("validateAddressBeneficiary");
      console.log(error);
      return false;
    }
  }

  public async validatePostcodeBeneficiary(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtPostcodeBeneficiary);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getAttributeValue(this.txtPostcodeBeneficiary, "title");
      return await this.driverService.validateRecord(
        `Validate field PostcodeBeneficiary`,
        [ActualValue, ExpectedValue, `Incorrect PostcodeBeneficiary!`]
      );
    } catch (error) {
      console.log("validatePostcodeBeneficiary");
      console.log(error);
      return false;
    }
  }

  public async validateCityBeneficiary(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtCityBeneficiary);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getAttributeValue(this.txtCityBeneficiary, "title");
      return await this.driverService.validateRecord(
        `Validate field CityBeneficiary`,
        [ActualValue, ExpectedValue, `Incorrect CityBeneficiary!`]
      );
    } catch (error) {
      console.log("validateCityBeneficiary");
      console.log(error);
      return false;
    }
  }

  public async validateOtherInformationBeneficiary(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtOtherInformationBeneficiary);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getAttributeValue(this.txtOtherInformationBeneficiary,"value");
      return await this.driverService.validateRecord(
        `Validate field OtherInformationBeneficiary`,
        [ActualValue, ExpectedValue, `Incorrect OtherInformationBeneficiary!`]
      );
    } catch (error) {
      console.log("validateOtherInformationBeneficiary");
      console.log(error);
      return false;
    }
  }

  public async validateDOBBeneficiary(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.dtpDateOfBirthBeneficiary);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getAttributeValue(this.dtpDateOfBirthBeneficiary, "title");
      return await this.driverService.validateRecord(
        `Validate field Date Of Birth Beneficiary`,
        [ActualValue, ExpectedValue, `Incorrect Date Of Birth Beneficiary!`]
      );
    } catch (error) {
      console.log("validateDOBBeneficiary");
      console.log(error);
      return false;
    }
  }

  //Beneficiary 2
  public async validateBeneficiary2Beneficiary(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtBeneficiary2Beneficiary);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getAttributeValue(this.txtBeneficiary2Beneficiary, "title");
      return await this.driverService.validateRecord(
        `Validate field Beneficiary2`,
        [ActualValue, ExpectedValue, `Incorrect Beneficiary2!`]
      );
    } catch (error) {
      console.log("validateBeneficiary2Beneficiary");
      console.log(error);
      return false;
    }
  }
  public async validateOrgNr2Beneficiary(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtOrgNr2Beneficiary);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getAttributeValue(this.txtOrgNr2Beneficiary, "title");
      return await this.driverService.validateRecord(
        `Validate field OrgNr2Beneficiary`,
        [ActualValue, ExpectedValue, `Incorrect OrgNr2Beneficiary!`]
      );
    } catch (error) {
      console.log("validateOrgNr2Beneficiary");
      console.log(error);
      return false;
    }
  }
  public async validateAddress2Beneficiary(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtAddress2Beneficiary);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getAttributeValue(this.txtAddress2Beneficiary, "title");
      return await this.driverService.validateRecord(
        `Validate field Address2Beneficiary`,
        [ActualValue, ExpectedValue, `Incorrect Address2Beneficiary!`]
      );
    } catch (error) {
      console.log("validateAddress2Beneficiary");
      console.log(error);
      return false;
    }
  }

  public async validatePostcode2Beneficiary(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtPostcode2Beneficiary);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getAttributeValue(this.txtPostcode2Beneficiary, "title");
      return await this.driverService.validateRecord(
        `Validate field Postcode2Beneficiary`,
        [ActualValue, ExpectedValue, `Incorrect Postcode2Beneficiary!`]
      );
    } catch (error) {
      console.log("validatePostcode2Beneficiary");
      console.log(error);
      return false;
    }
  }

  public async validateCity2Beneficiary(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtCity2Beneficiary);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getAttributeValue(this.txtCity2Beneficiary, "title");
      return await this.driverService.validateRecord(
        `Validate field City2Beneficiary`,
        [ActualValue, ExpectedValue, `Incorrect City2Beneficiary!`]
      );
    } catch (error) {
      console.log("validateCity2Beneficiary");
      console.log(error);
      return false;
    }
  }

  public async validateOtherInformation2Beneficiary(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtOtherInformation2Beneficiary);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getAttributeValue(this.txtOtherInformation2Beneficiary, "value");
      return await this.driverService.validateRecord(
        `Validate field OtherInformation2Beneficiary`,
        [ActualValue, ExpectedValue, `Incorrect OtherInformation2Beneficiary!`]
      );
    } catch (error) {
      console.log("validateOtherInformation2Beneficiary");
      console.log(error);
      return false;
    }
  }


  // 4. Debtor section
  public async validateOrdererDebtor(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtOrdererDebtor);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getAttributeValue(this.txtOrdererDebtor, "title");
      return await this.driverService.validateRecord(
        `Validate field Orderer Debtor`,
        [ActualValue, ExpectedValue, `Incorrect Orderer Debtor!`]
      );
    } catch (error) {
      console.log("validateOrdererDebtor");
      console.log(error);
      return false;
    }
  }

  public async validateOrganisationNumberDebtor(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtOrganisationNumberDebtor);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getAttributeValue(this.txtOrganisationNumberDebtor, "title");
      return await this.driverService.validateRecord(
        `Validate field Organisation Number Debtor`,
        [ActualValue, ExpectedValue, `Incorrect Organisation Number Debtor!`]
      );
    } catch (error) {
      console.log("validateOrganisationNumberDebtor");
      console.log(error);
      return false;
    }
  }

  public async validateAddressDebtor(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtAddressDebtor);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getAttributeValue(this.txtAddressDebtor, "title");
      return await this.driverService.validateRecord(
        `Validate field Address Debtor`,
        [ActualValue, ExpectedValue, `Incorrect Address Debtor!`]
      );
    } catch (error) {
      console.log("validateAddressDebtor");
      console.log(error);
      return false;
    }
  }

  public async validatePostcodeDebtor(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtPostcodeDebtor);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getAttributeValue(this.txtPostcodeDebtor, "title");
      return await this.driverService.validateRecord(
        `Validate field Postcode Debtor`,
        [ActualValue, ExpectedValue, `Incorrect Postcode Debtor!`]
      );
    } catch (error) {
      console.log("validatePostcodeDebtor");
      console.log(error);
      return false;
    }
  }

  public async validateCityDebtor(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtCityDebtor);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getAttributeValue(this.txtCityDebtor, "title");
      return await this.driverService.validateRecord(
        `Validate field City Debtor`,
        [ActualValue, ExpectedValue, `Incorrect City Debtor!`]
      );
    } catch (error) {
      console.log("validateCityDebtor");
      console.log(error);
      return false;
    }
  }

  public async validateOtherInformationDebtor(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtOtherInformationDebtor);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getAttributeValue(this.txtOtherInformationDebtor, "value");
      return await this.driverService.validateRecord(
        `Validate field OtherInformation Debtor`,
        [ActualValue, ExpectedValue, `Incorrect OtherInformation Debtor!`]
      );
    } catch (error) {
      console.log("validateOtherInformationDebtor");
      console.log(error);
      return false;
    }
  }
  //#endregion

}