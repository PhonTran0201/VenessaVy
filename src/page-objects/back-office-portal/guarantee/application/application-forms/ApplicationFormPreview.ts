import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { ApplicationFormPreviewInterface } from "../../../../../interfaces/guarantee/application/application-forms/ApplicationFormPreviewInterface";
import { logInfoMessage, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";


export class ApplicationFormPreview implements ApplicationFormPreviewInterface {
  constructor(protected driverService: SeleniumWebDriverService) { }

  //#region Xpaths

  //#region 1. First columns
  protected lblUploadedDataValidationStatus = By.xpath(`//*[contains(local-name(),'form')]//span[@title="Uploaded data validation status"]`);
  protected lblApprovalStatus = By.xpath(`//*[contains(local-name(),'form')]//span[@title="Approval status"]`);

  // Created by
  protected lblCreatedBy = By.xpath("//*[contains(local-name(),'form')]//div[./label[text()='Created by']]//p");

  // Issued date
  protected lblIssuedDate = By.xpath("//*[contains(local-name(),'form')]//div[./label[text()='Issued date']]//b");

  // Debtor
  protected lblDebtorName = By.xpath("//*[contains(local-name(),'form')]//div[./label[text()='Debtor']]//b");
  protected lblDebtorOrgNr = By.xpath("//*[contains(local-name(),'form')]//div[./label[text()='Debtor']]//i");
  protected lblDebtorAddress = By.xpath("//*[contains(local-name(),'form')]//div[./label[text()='Debtor']]//span[contains(@title,'debtor address')]//i");
  protected lblDebtorPostcode = By.xpath("//*[contains(local-name(),'form')]//div[./label[text()='Debtor']]//span[contains(@title,'debtor zip code')]//i");
  protected lblDebtorCity = By.xpath("//*[contains(local-name(),'form')]//div[./label[text()='Debtor']]//span[contains(@title,'debtor city')]//i");

  // Beneficiary
  protected lblBeneficiaryName = By.xpath("//*[contains(local-name(),'form')]//div[./label[text()='Beneficiary']]//b");

  protected lblBeneficiaryDOB = By.xpath("//*[contains(local-name(),'form')]//div[./label[text()='Beneficiary']]//i[contains(text(),'DOB')]");
  protected lblBeneficiaryOrgNr = By.xpath("//*[contains(local-name(),'form')]//div[./label[text()='Beneficiary']]//i[contains(text(),'Org')]");

  protected lblBeneficiaryAddress = By.xpath("//*[contains(local-name(),'form')]//div[./label[text()='Beneficiary']]//span[contains(@title,'address')]/i");
  protected lblBeneficiaryPostcode = By.xpath("//*[contains(local-name(),'form')]//div[./label[text()='Beneficiary']]//span[contains(@title,'zip code')]/i");
  protected lblBeneficiaryCity = By.xpath("//*[contains(local-name(),'form')]//div[./label[text()='Beneficiary']]//span[contains(@title,'city')]/i");

  // Beneficiary 2 
  protected lblBeneficiary2Name = By.xpath("//*[contains(local-name(),'form')]//div[./label[text()='Beneficiary 2']]//b");

  protected lblBeneficiary2DOB = By.xpath("//*[contains(local-name(),'form')]//div[./label[text()='Beneficiary 2']]//i[contains(text(),'DOB')]");
  protected lblBeneficiary2OrgNr = By.xpath("//*[contains(local-name(),'form')]//div[./label[text()='Beneficiary 2']]//i[contains(text(),'Org')]");

  protected lblBeneficiary2Address = By.xpath("//*[contains(local-name(),'form')]//div[./label[text()='Beneficiary 2']]//span[contains(@title,'address')]/i");
  protected lblBeneficiary2Postcode = By.xpath("//*[contains(local-name(),'form')]//div[./label[text()='Beneficiary 2']]//span[contains(@title,'zip code')]/i");
  protected lblBeneficiary2City = By.xpath("//*[contains(local-name(),'form')]//div[./label[text()='Beneficiary 2']]//span[contains(@title,'city')]/i");


  // Guarantor
  protected lblGuarantorName = By.xpath("//*[contains(local-name(),'form')]//div[./label[text()='Guarantor']]//b");

  protected lblGuarantorAddress = By.xpath("//*[contains(local-name(),'form')]//div[./label[text()='Guarantor']]//span[contains(@title,'address')]/i");
  protected lblGuarantorPostcode = By.xpath("//*[contains(local-name(),'form')]//div[./label[text()='Guarantor']]//span[contains(@title,'zip code')]/i");
  protected lblGuarantorCity = By.xpath("//*[contains(local-name(),'form')]//div[./label[text()='Guarantor']]//span[contains(@title,'city')]/i");

  protected lblGuarantorFirmNo = By.xpath("//*[contains(local-name(),'form')]//div[./label[text()='Guarantor']]//i[contains(text(),'Firm number')]");

  // Guarantee Inssuer
  protected lblGuaranteeIssuer = By.xpath("//*[contains(local-name(),'form')]//div[./label[text()='Guarantee issuer']]//b");

  // Underlying Contract
  protected lblUnderlyingContractReference = By.xpath("//*[contains(local-name(),'form')]//div[./label[text()='Underlying contract']]//b");

  protected lblUnderlyingContractCommitment = By.xpath("//*[contains(local-name(),'form')]//div[./label[text()='Underlying contract']]//*[contains(@title,'commitment')]/i");

  protected lblUnderlyingContractGardsnummer = By.xpath("//*[contains(local-name(),'form')]//div[./label[text()='Underlying contract']]//*[contains(@title,'farm number')]/i");
  protected lblUnderlyingContractBruksnummer = By.xpath("//*[contains(local-name(),'form')]//div[./label[text()='Underlying contract']]//*[contains(@title,'use number')]/i");
  protected lblUnderlyingContractKommune = By.xpath("//*[contains(local-name(),'form')]//div[./label[text()='Underlying contract']]//*[contains(@title,'district')]/i");

  protected lblUnderlyingContractTotalAmount = By.xpath("//*[contains(local-name(),'form')]//div[./label[text()='Underlying contract']]//*[contains(@title,'Total contract sum')]/i");
  protected lblUnderlyingDistrict = By.xpath("//*[contains(local-name(),'form')]//div[./label[text()='Underlying contract']]//*[contains(@title,'Contract district name tag')]/i");
  protected lblUnderlyingContractStartDate = By.xpath("//*[contains(local-name(),'form')]//div[./label[text()='Underlying contract']]//*[contains(@title,'Contract start tag')]/i");



  // Third Party
  protected lblThirdPartyName = By.xpath("//*[contains(local-name(),'form')]//div[./label[text()='Third party']]//b");

  protected lblThirdPartyAddress = By.xpath("//*[contains(local-name(),'form')]//div[./label[text()='Third party']]//*[contains(@title,'address')]/i");
  protected lblThirdPartyPostcode = By.xpath("//*[contains(local-name(),'form')]//div[./label[text()='Third party']]//*[contains(@title,'zip code')]/i");
  protected lblThirdPartyCity = By.xpath("//*[contains(local-name(),'form')]//div[./label[text()='Third party']]//*[contains(@title,'city')]/i");

  protected lblThirdPartyPhone = By.xpath("//*[contains(local-name(),'form')]//div[./label[text()='Third party']]//p/i");
  //#endregion


  //#region 2. Second column (Timeline)
  protected lblPeriod = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'timeline')]//span[@title='Period']");
  protected lblGuaranteeAmount = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'timeline')]//*[@title='Guarantee amount']");

  protected lblTotalGuaranteeFee = By.xpath("//*[contains(local-name(),'form')]//div[./b[text()='Total guarantee fee']]//b[2]");
  protected lblTotalCommission = By.xpath("//*[contains(local-name(),'form')]//div[./b[text()='Total commission']]//b[2]");
  protected lblEstablishmentFee = By.xpath("//*[contains(local-name(),'form')]//div[./b[text()='Establishment fee']]//b[2]")
  //#endregion

  //#region Top of form
  protected lblStatusApplication = By.xpath(`(//*[contains(local-name(),'form')]//*[contains(@class,'label-title')]/span)[last()]`);
  //#endregion

  //#region second column TWO PHASE (Timeline)
  protected lblGuaranteeAmountPhase1 = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'timeline')]//li[1]//span[@title='Guarantee amount']");
  protected lblGuaranteeAmountPhase2 = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'timeline')]//li[2]//span[@title='Guarantee amount']");
  protected lblPeriodPhase1 = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'timeline')]//li[1]//*[@title='Period']");
  protected lblPeriodPhase2 = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'timeline')]//li[2]//*[@title='Period']");
  protected lblGuaranteeFeePhase1 = By.xpath("//*[contains(local-name(),'form')]//div[@if='!IsAmend']/div[1]//li[1]//span[2]");
  protected lblGuaranteeFeePhase2 = By.xpath("//*[contains(local-name(),'form')]//div[@if='!IsAmend']/div[1]//li[2]//span[2]");
  protected lblCommissionPhase1 = By.xpath("//*[contains(local-name(),'form')]//div[@if='!IsAmend']/div[@class='commission']//li[1]//span[2]");
  protected lblCommissionPhase2 = By.xpath("//*[contains(local-name(),'form')]//div[@if='!IsAmend']/div[@class='commission']//li[2]//span[2]");


  //#endregion 

  //#region Validate value
  //#region 1. First columns

  public async validateUploadedDataValidationStatus(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblUploadedDataValidationStatus);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      let ActualValue = await this.driverService.getText(this.lblUploadedDataValidationStatus);
      return await this.driverService.validateRecord(`Validate field UploadedDataValidationStatus`, [ActualValue, ExpectedValue, `Incorrect UploadedDataValidationStatus`]);
    } catch (error) {
      console.log("UploadedDataValidationStatus");
      console.log(error);
      return false;
    }
  }

  public async validateApprovalStatus(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblApprovalStatus);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      let ActualValue = await this.driverService.getText(this.lblApprovalStatus);
      return await this.driverService.validateRecord(`Validate field ApprovalStatus`, [ActualValue, ExpectedValue, `Incorrect ApprovalStatus`]);
    } catch (error) {
      console.log("ApprovalStatus");
      console.log(error);
      return false;
    }
  }
  //#region  Created By
  public async validateCreatedBy(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblCreatedBy);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblCreatedBy);
      return await this.driverService.validateRecord(
        `Validate field CreatedBy`,
        [ActualValue, ExpectedValue, `Incorrect lblCreatedBy!`]
      );
    } catch (error) {
      console.log("validateCreatedBy");
      console.log(error);
      return false;
    }
  }
  //#endregion
  //#region  Issued date
  public async validateIssuedDate(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblIssuedDate);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblIssuedDate);
      return await this.driverService.validateRecord(
        `Validate field Issued Date`,
        [ActualValue, ExpectedValue, `Incorrect Issued Date!`]
      );
    } catch (error) {
      console.log("validateIssuedDate");
      console.log(error);
      return false;
    }
  }
  //#endregion

  //#region Debtor
  public async validateDebtorName(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblDebtorName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblDebtorName);
      return await this.driverService.validateRecord(
        `Validate field Debtor Name`,
        [ActualValue, ExpectedValue, `Incorrect Debtor Name!`]
      );
    } catch (error) {
      console.log("validateDebtorName");
      console.log(error);
      return false;
    }
  }

  public async validateDebtorOrgNr(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblDebtorOrgNr);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblDebtorOrgNr);
      return await this.driverService.validateRecord(
        `Validate field DebtorOrgNr`,
        [ActualValue, ExpectedValue, `Incorrect DebtorOrgNr!`]
      );
    } catch (error) {
      console.log("validateDebtorOrgNr");
      console.log(error);
      return false;
    }
  }

  public async validateDebtorAddress(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblDebtorAddress);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblDebtorAddress);
      return await this.driverService.validateRecord(
        `Validate field DebtorAddress`,
        [ActualValue, ExpectedValue, `Incorrect DebtorAddress!`]
      );
    } catch (error) {
      console.log("validateDebtorAddress");
      console.log(error);
      return false;
    }
  }

  public async validateDebtorPostcode(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblDebtorPostcode);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblDebtorPostcode);
      return await this.driverService.validateRecord(
        `Validate field DebtorPostcode`,
        [ActualValue, ExpectedValue, `Incorrect DebtorPostcode!`]
      );
    } catch (error) {
      console.log("validateDebtorPostcode");
      console.log(error);
      return false;
    }
  }

  public async validateDebtorCity(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblDebtorCity);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblDebtorCity);
      return await this.driverService.validateRecord(
        `Validate field DebtorCity`,
        [ActualValue, ExpectedValue, `Incorrect DebtorCity!`]
      );
    } catch (error) {
      console.log("validateDebtorCity");
      console.log(error);
      return false;
    }
  }
  //#endregion

  //#region Beneficiary
  public async validateBeneficiaryName(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblBeneficiaryName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblBeneficiaryName);
      return await this.driverService.validateRecord(
        `Validate field Beneficiary Name`,
        [ActualValue, ExpectedValue, `Incorrect Beneficiary Name!`]
      );
    } catch (error) {
      console.log("validateBeneficiaryName");
      console.log(error);
      return false;
    }
  }

  public async validateBeneficiaryOrgNr(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblBeneficiaryOrgNr);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblBeneficiaryOrgNr);
      return await this.driverService.validateRecord(
        `Validate field Beneficiary OrgNr`,
        [ActualValue, ExpectedValue, `Incorrect Beneficiary OrgNr!`]
      );
    } catch (error) {
      console.log("validateBeneficiaryOrgNr");
      console.log(error);
      return false;
    }
  }

  public async validateBeneficiaryDOB(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblBeneficiaryDOB);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblBeneficiaryDOB);
      return await this.driverService.validateRecord(
        `Validate field Beneficiary DOB`,
        [ActualValue, ExpectedValue, `Incorrect Beneficiary DOB!`]
      );
    } catch (error) {
      console.log("validateBeneficiaryDOB");
      console.log(error);
      return false;
    }
  }

  public async validateBeneficiaryAddress(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblBeneficiaryAddress);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblBeneficiaryAddress);
      return await this.driverService.validateRecord(
        `Validate field Beneficiary Address`,
        [ActualValue, ExpectedValue, `Incorrect Beneficiary Address!`]
      );
    } catch (error) {
      console.log("validateBeneficiaryAddress");
      console.log(error);
      return false;
    }
  }

  public async validateBeneficiaryPostcode(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblBeneficiaryPostcode);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblBeneficiaryPostcode);
      return await this.driverService.validateRecord(
        `Validate field Beneficiary Postcode`,
        [ActualValue, ExpectedValue, `Incorrect Beneficiary Postcode!`]
      );
    } catch (error) {
      console.log("validateBeneficiaryPostcode");
      console.log(error);
      return false;
    }
  }
  public async validateBeneficiaryCity(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblBeneficiaryCity);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblBeneficiaryCity);
      return await this.driverService.validateRecord(
        `Validate field Beneficiary City`,
        [ActualValue, ExpectedValue, `Incorrect Beneficiary City!`]
      );
    } catch (error) {
      console.log("validateBeneficiaryCity");
      console.log(error);
      return false;
    }
  }
  //#endregion

  //#region Beneficiary
  public async validateBeneficiary2Name(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblBeneficiary2Name);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblBeneficiary2Name);
      return await this.driverService.validateRecord(
        `Validate field Beneficiary2 Name`,
        [ActualValue, ExpectedValue, `Incorrect Beneficiary2 Name!`]
      );
    } catch (error) {
      console.log("validateBeneficiary2Name");
      console.log(error);
      return false;
    }
  }

  public async validateBeneficiary2OrgNr(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblBeneficiary2OrgNr);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblBeneficiary2OrgNr);
      return await this.driverService.validateRecord(
        `Validate field Beneficiary2 OrgNr`,
        [ActualValue, ExpectedValue, `Incorrect Beneficiary2 OrgNr!`]
      );
    } catch (error) {
      console.log("validateBeneficiary2OrgNr");
      console.log(error);
      return false;
    }
  }

  public async validateBeneficiary2DOB(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblBeneficiary2DOB);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblBeneficiary2DOB);
      return await this.driverService.validateRecord(
        `Validate field Beneficiary2 DOB`,
        [ActualValue, ExpectedValue, `Incorrect Beneficiary2 DOB!`]
      );
    } catch (error) {
      console.log("validateBeneficiary2DOB");
      console.log(error);
      return false;
    }
  }

  public async validateBeneficiary2Address(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblBeneficiary2Address);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblBeneficiary2Address);
      return await this.driverService.validateRecord(
        `Validate field Beneficiary2 Address`,
        [ActualValue, ExpectedValue, `Incorrect Beneficiary2 Address!`]
      );
    } catch (error) {
      console.log("validateBeneficiary2Address");
      console.log(error);
      return false;
    }
  }

  public async validateBeneficiary2Postcode(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblBeneficiary2Postcode);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblBeneficiary2Postcode);
      return await this.driverService.validateRecord(
        `Validate field Beneficiary2 Postcode`,
        [ActualValue, ExpectedValue, `Incorrect Beneficiary2 Postcode!`]
      );
    } catch (error) {
      console.log("validateBeneficiary2Postcode");
      console.log(error);
      return false;
    }
  }
  public async validateBeneficiary2City(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblBeneficiary2City);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblBeneficiary2City);
      return await this.driverService.validateRecord(
        `Validate field Beneficiary2 City`,
        [ActualValue, ExpectedValue, `Incorrect Beneficiary2 City!`]
      );
    } catch (error) {
      console.log("validateBeneficiary2City");
      console.log(error);
      return false;
    }
  }
  //#endregion


  //#region Guarantor
  public async validateGuarantorName(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblGuarantorName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblGuarantorName);
      if(ActualValue.includes(ExpectedValue)){
        ExpectedValue = ActualValue;
      }
      return await this.driverService.validateRecord(
        `Validate field GuarantorName`,
        [ActualValue, ExpectedValue, `Incorrect GuarantorName!`]
      );
    } catch (error) {
      console.log("validateGuarantorName");
      console.log(error);
      return false;
    }
  }
  public async validateGuarantorAddress(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblGuarantorAddress);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblGuarantorAddress);
      return await this.driverService.validateRecord(
        `Validate field GuarantorAddress`,
        [ActualValue, ExpectedValue, `Incorrect GuarantorAddress!`]
      );
    } catch (error) {
      console.log("validateGuarantorAddress");
      console.log(error);
      return false;
    }
  }
  public async validateGuarantorPostcode(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblGuarantorPostcode);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblGuarantorPostcode);
      return await this.driverService.validateRecord(
        `Validate field GuarantorPostcode`,
        [ActualValue, ExpectedValue, `Incorrect GuarantorPostcode!`]
      );
    } catch (error) {
      console.log("validateGuarantorPostcode");
      console.log(error);
      return false;
    }
  }
  public async validateGuarantorCity(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblGuarantorCity);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblGuarantorCity);
      return await this.driverService.validateRecord(
        `Validate field GuarantorCity`,
        [ActualValue, ExpectedValue, `Incorrect GuarantorCity!`]
      );
    } catch (error) {
      console.log("validateGuarantorCity");
      console.log(error);
      return false;
    }
  }

  public async validateGuarantorFirmNo(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblGuarantorFirmNo);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblGuarantorFirmNo);
      return await this.driverService.validateRecord(
        `Validate field GuarantorFirmNo`,
        [ActualValue, ExpectedValue, `Incorrect GuarantorFirmNo!`]
      );
    } catch (error) {
      console.log("validateGuarantorFirmNo");
      console.log(error);
      return false;
    }
  }
  //#endregion

  //#region Guarantee Issuer
  public async validateGuaranteeIssuer(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblGuaranteeIssuer);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblGuaranteeIssuer);
      return await this.driverService.validateRecord(
        `Validate field GuaranteeIssuer`,
        [ActualValue, ExpectedValue, `Incorrect GuaranteeIssuer!`]
      );
    } catch (error) {
      console.log("validateGuaranteeIssuer");
      console.log(error);
      return false;
    }
  }
  //#endregion

  //#region Underlying Contract
  public async validateUnderlyingContractReference(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblUnderlyingContractReference);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblUnderlyingContractReference);
      return await this.driverService.validateRecord(
        `Validate field UnderlyingContractReference`,
        [ActualValue, ExpectedValue, `Incorrect UnderlyingContractReference!`]
      );
    } catch (error) {
      console.log("validateUnderlyingContractReference");
      console.log(error);
      return false;
    }
  }

  public async validateUnderlyingContractCommitment(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblUnderlyingContractCommitment);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblUnderlyingContractCommitment);
      return await this.driverService.validateRecord(
        `Validate field UnderlyingContractCommitment`,
        [ActualValue, ExpectedValue, `Incorrect UnderlyingContractCommitment!`]
      );
    } catch (error) {
      console.log("validateUnderlyingContractCommitment");
      console.log(error);
      return false;
    }
  }

  public async validateUnderlyingContractGardsnummer(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblUnderlyingContractGardsnummer);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblUnderlyingContractGardsnummer);
      return await this.driverService.validateRecord(
        `Validate field UnderlyingContractGardsnummer`,
        [ActualValue, ExpectedValue, `Incorrect UnderlyingContractGardsnummer!`]
      );
    } catch (error) {
      console.log("validateUnderlyingContractGardsnummer");
      console.log(error);
      return false;
    }
  }

  public async validateUnderlyingContractBruksnummer(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblUnderlyingContractBruksnummer);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblUnderlyingContractBruksnummer);
      return await this.driverService.validateRecord(
        `Validate field UnderlyingContractBruksnummer`,
        [ActualValue, ExpectedValue, `Incorrect UnderlyingContractBruksnummer!`]
      );
    } catch (error) {
      console.log("validateUnderlyingContractBruksnummer");
      console.log(error);
      return false;
    }
  }

  public async validateUnderlyingContractKommune(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblUnderlyingContractKommune);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblUnderlyingContractKommune);
      return await this.driverService.validateRecord(
        `Validate field UnderlyingContractKommune`,
        [ActualValue, ExpectedValue, `Incorrect UnderlyingContractKommune!`]
      );
    } catch (error) {
      console.log("validateUnderlyingContractKommune");
      console.log(error);
      return false;
    }
  }

  public async validateUnderlyingContractTotalAmount(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblUnderlyingContractTotalAmount);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblUnderlyingContractTotalAmount);
      return await this.driverService.validateRecord(
        `Validate field UnderlyingContractTotalAmount`,
        [ActualValue, ExpectedValue, `Incorrect UnderlyingContractTotalAmount!`]
      );
    } catch (error) {
      console.log("validateUnderlyingContractTotalAmount");
      console.log(error);
      return false;
    }
  }

  public async validateUnderlyingDistrict(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblUnderlyingDistrict);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblUnderlyingDistrict);
      return await this.driverService.validateRecord(
        `Validate field UnderlyingDistrict`,
        [ActualValue, ExpectedValue, `Incorrect UnderlyingDistrict!`]
      );
    } catch (error) {
      console.log("validateUnderlyingDistrict");
      console.log(error);
      return false;
    }
  }

  public async validateUnderlyingContractStartDate(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblUnderlyingContractStartDate);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblUnderlyingContractStartDate);
      return await this.driverService.validateRecord(
        `Validate field ContractStartDate`,
        [ActualValue, ExpectedValue, `Incorrect ContractStartDate!`]
      );
    } catch (error) {
      console.log("validateUnderlyingContractStartDate");
      console.log(error);
      return false;
    }
  }

  //#endregion

  //#region Third Party
  public async validateThirdPartyName(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblThirdPartyName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblThirdPartyName);
      return await this.driverService.validateRecord(
        `Validate field ThirdPartyName`,
        [ActualValue, ExpectedValue, `Incorrect ThirdPartyName!`]
      );
    } catch (error) {
      console.log("validateThirdPartyName");
      console.log(error);
      return false;
    }
  }

  public async validateThirdPartyAddress(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblThirdPartyAddress);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblThirdPartyAddress);
      return await this.driverService.validateRecord(
        `Validate field ThirdPartyAddress`,
        [ActualValue, ExpectedValue, `Incorrect ThirdPartyAddress!`]
      );
    } catch (error) {
      console.log("validateThirdPartyAddress");
      console.log(error);
      return false;
    }
  }

  public async validateThirdPartyPostcode(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblThirdPartyPostcode);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblThirdPartyPostcode);
      return await this.driverService.validateRecord(
        `Validate field ThirdPartyPostcode`,
        [ActualValue, ExpectedValue, `Incorrect ThirdPartyPostcode!`]
      );
    } catch (error) {
      console.log("validateThirdPartyPostcode");
      console.log(error);
      return false;
    }
  }

  public async validateThirdPartyCity(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblThirdPartyCity);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblThirdPartyCity);
      return await this.driverService.validateRecord(
        `Validate field ThirdPartyCity`,
        [ActualValue, ExpectedValue, `Incorrect ThirdPartyCity!`]
      );
    } catch (error) {
      console.log("validateThirdPartyCity");
      console.log(error);
      return false;
    }
  }

  public async validateThirdPartyPhone(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblThirdPartyPhone);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblThirdPartyPhone);
      return await this.driverService.validateRecord(
        `Validate field ThirdPartyPhone`,
        [ActualValue, ExpectedValue, `Incorrect ThirdPartyPhone!`]
      );
    } catch (error) {
      console.log("validateThirdPartyPhone");
      console.log(error);
      return false;
    }
  }
  //#endregion
  //#endregion


  // 2. Second column (Timeline)
  public async validatePeriod(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblPeriod);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblPeriod);
      return await this.driverService.validateRecord(
        `Validate field Period`,
        [ActualValue, ExpectedValue, `Incorrect Period!`]
      );
    } catch (error) {
      console.log("validatePeriod");
      console.log(error);
      return false;
    }
  }
  public async validateGuaranteeAmount(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblGuaranteeAmount);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblGuaranteeAmount);
      return await this.driverService.validateRecord(
        `Validate field GuaranteeAmount`,
        [ActualValue, ExpectedValue, `Incorrect GuaranteeAmount!`]
      );
    } catch (error) {
      console.log("validateGuaranteeAmount");
      console.log(error);
      return false;
    }
  }

  public async validateTotalGuaranteeFee(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblTotalGuaranteeFee);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblTotalGuaranteeFee);
      return await this.driverService.validateRecord(
        `Validate field TotalGuaranteeFee`,
        [ActualValue, ExpectedValue, `Incorrect TotalGuaranteeFee!`]
      );
    } catch (error) {
      console.log("validateTotalGuaranteeFee");
      console.log(error);
      return false;
    }
  }
  public async validateTotalCommission(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblTotalCommission);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblTotalCommission);
      return await this.driverService.validateRecord(
        `Validate field TotalCommission`,
        [ActualValue, ExpectedValue, `Incorrect TotalCommission!`]
      );
    } catch (error) {
      console.log("validateTotalCommission");
      console.log(error);
      return false;
    }
  }

  public async validateEstablishmentFee(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblEstablishmentFee);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblEstablishmentFee);
      return await this.driverService.validateRecord(
        `Validate field EstablishmentFee`,
        [ActualValue, ExpectedValue, `Incorrect EstablishmentFee!`]
      );
    } catch (error) {
      console.log("validateEstablishmentFee");
      console.log(error);
      return false;
    }
  }
  //#endregion

  //#region Header application form
  public async validateStatusApplication(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblStatusApplication);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblStatusApplication);
      return await this.driverService.validateRecord(
        `Validate field Status application`,
        [ActualValue, ExpectedValue, `Incorrect Status application!`]
      );
    } catch (error) {
      console.log("validateStatusApplication");
      console.log(error);
      return false;
    }
  }
  //#endregion

  //#region validate Timeline Two Phase
  public async validatePeriodPhase1(ExpectedValue: string) { // "Period: " + ExpectedValue
    try {
      await this.driverService.waitUntilElementLoaded(this.lblPeriodPhase1);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblPeriodPhase1);
      return await this.driverService.validateRecord(
        `Validate field Period Phase 1`,
        [ActualValue, ExpectedValue, `Incorrect Period Phase 1!`]
      );
    } catch (error) {
      console.log("validatePeriodPhase1");
      console.log(error);
      return false;
    }
  }

  public async validatePeriodPhase2(ExpectedValue: string) { // "Period: " + ExpectedValue
    try {
      await this.driverService.waitUntilElementLoaded(this.lblPeriodPhase2);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblPeriodPhase2);
      return await this.driverService.validateRecord(
        `Validate field Period Phase 2`,
        [ActualValue, ExpectedValue, `Incorrect Period Phase 2!`]
      );
    } catch (error) {
      console.log("validatePeriodPhase2");
      console.log(error);
      return false;
    }
  }

  public async validateGuaranteeAmountPhase1(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblGuaranteeAmountPhase1);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblGuaranteeAmountPhase1);
      return await this.driverService.validateRecord(
        `Validate field GuaranteeAmountPhase1`,
        [ActualValue, ExpectedValue, `Incorrect GuaranteeAmountPhase1!`]
      );
    } catch (error) {
      console.log("validateGuaranteeAmountPhase1");
      console.log(error);
      return false;
    }
  }

  public async validateGuaranteeAmountPhase2(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblGuaranteeAmountPhase2);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblGuaranteeAmountPhase2);
      return await this.driverService.validateRecord(
        `Validate field GuaranteeAmountPhase2`,
        [ActualValue, ExpectedValue, `Incorrect GuaranteeAmountPhase2!`]
      );
    } catch (error) {
      console.log("validateGuaranteeAmountPhase2");
      console.log(error);
      return false;
    }
  }

  public async validateGuaranteeFeePhase1(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblGuaranteeFeePhase1);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblGuaranteeFeePhase1);
      return await this.driverService.validateRecord(
        `Validate field GuaranteeFeePhase1`,
        [ActualValue, ExpectedValue, `Incorrect GuaranteeFeePhase1!`]
      );
    } catch (error) {
      console.log("validateGuaranteeFeePhase1");
      console.log(error);
      return false;
    }
  }

  public async validateGuaranteeFeePhase2(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblGuaranteeFeePhase2);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblGuaranteeFeePhase2);
      return await this.driverService.validateRecord(
        `Validate field GuaranteeFeePhase2`,
        [ActualValue, ExpectedValue, `Incorrect GuaranteeFeePhase2!`]
      );
    } catch (error) {
      console.log("validateGuaranteeFeePhase2");
      console.log(error);
      return false;
    }
  }

  public async validateCommissionPhase1(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblCommissionPhase1);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblCommissionPhase1);
      return await this.driverService.validateRecord(
        `Validate field CommissionPhase1`,
        [ActualValue, ExpectedValue, `Incorrect CommissionPhase1!`]
      );
    } catch (error) {
      console.log("validateCommissionPhase1");
      console.log(error);
      return false;
    }
  }

  public async validateCommissionPhase2(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblCommissionPhase2);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblCommissionPhase2);
      return await this.driverService.validateRecord(
        `Validate field CommissionPhase2`,
        [ActualValue, ExpectedValue, `Incorrect CommissionPhase2!`]
      );
    } catch (error) {
      console.log("validateCommissionPhase2");
      console.log(error);
      return false;
    }
  }

  //#endregion
}
