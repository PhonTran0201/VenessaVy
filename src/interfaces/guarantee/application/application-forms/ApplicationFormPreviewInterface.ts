
export interface ApplicationFormPreviewInterface {
  //#region Validate value
  //#region 1. First columns

  validateUploadedDataValidationStatus(ExpectedValue: string): Promise<boolean>;
  validateApprovalStatus(ExpectedValue: string): Promise<boolean>;
  //#region  Issued date
  validateIssuedDate(ExpectedValue: string): Promise<boolean>;
  //#endregion

  //#region Debtor
  validateDebtorName(ExpectedValue: string): Promise<boolean>;
  validateDebtorOrgNr(ExpectedValue: string): Promise<boolean>;
  validateDebtorAddress(ExpectedValue: string): Promise<boolean>;
  validateDebtorPostcode(ExpectedValue: string): Promise<boolean>;
  validateDebtorCity(ExpectedValue: string): Promise<boolean>;
  //#endregion

  //#region Beneficiary
  validateBeneficiaryName(ExpectedValue: string): Promise<boolean>;
  validateBeneficiaryOrgNr(ExpectedValue: string): Promise<boolean>;
  validateBeneficiaryDOB(ExpectedValue: string): Promise<boolean>;
  validateBeneficiaryAddress(ExpectedValue: string): Promise<boolean>;
  validateBeneficiaryPostcode(ExpectedValue: string): Promise<boolean>;
  validateBeneficiaryCity(ExpectedValue: string): Promise<boolean>;
  //#endregion

  //#region Beneficiary
  validateBeneficiary2Name(ExpectedValue: string): Promise<boolean>;
  validateBeneficiary2OrgNr(ExpectedValue: string): Promise<boolean>;
  validateBeneficiary2DOB(ExpectedValue: string): Promise<boolean>;
  validateBeneficiary2Address(ExpectedValue: string): Promise<boolean>;
  validateBeneficiary2Postcode(ExpectedValue: string): Promise<boolean>;
  validateBeneficiary2City(ExpectedValue: string): Promise<boolean>;
  //#endregion


  //#region Guarantor
  validateGuarantorName(ExpectedValue: string): Promise<boolean>;
  validateGuarantorAddress(ExpectedValue: string): Promise<boolean>;
  validateGuarantorPostcode(ExpectedValue: string): Promise<boolean>;
  validateGuarantorCity(ExpectedValue: string): Promise<boolean>;
  validateGuarantorFirmNo(ExpectedValue: string): Promise<boolean>;
  //#endregion

  //#region Guarantee Issuer
  validateGuaranteeIssuer(ExpectedValue: string): Promise<boolean>;
  //#endregion

  //#region Underlying Contract
  validateUnderlyingContractReference(ExpectedValue: string): Promise<boolean>;
  validateUnderlyingContractCommitment(ExpectedValue: string): Promise<boolean>;
  validateUnderlyingContractGardsnummer(ExpectedValue: string): Promise<boolean>;
  validateUnderlyingContractBruksnummer(ExpectedValue: string): Promise<boolean>;
  validateUnderlyingContractKommune(ExpectedValue: string): Promise<boolean>;
  validateUnderlyingContractTotalAmount(ExpectedValue: string): Promise<boolean>;
  validateUnderlyingDistrict(ExpectedValue: string): Promise<boolean>;
  validateUnderlyingContractStartDate(ExpectedValue: string): Promise<boolean>;
  //#endregion

  //#region Third Party
  validateThirdPartyName(ExpectedValue: string): Promise<boolean>;
  validateThirdPartyAddress(ExpectedValue: string): Promise<boolean>;
  validateThirdPartyPostcode(ExpectedValue: string): Promise<boolean>;
  validateThirdPartyCity(ExpectedValue: string): Promise<boolean>;
  validateThirdPartyPhone(ExpectedValue: string): Promise<boolean>;
  //#endregion
  //#endregion


  // 2. Second column (Timeline)
  validatePeriod(ExpectedValue: string): Promise<boolean>;
  validateGuaranteeAmount(ExpectedValue: string): Promise<boolean>;
  validateTotalGuaranteeFee(ExpectedValue: string): Promise<boolean>;
  validateTotalCommission(ExpectedValue: string): Promise<boolean>;
  validateEstablishmentFee(ExpectedValue: string): Promise<boolean>;
  //#endregion

  //#region  Top of form
  validateStatusApplication(ExpectedValue: string): Promise<boolean>;
  //#endregion

  //#region validate Timeline Two Phase
  validatePeriodPhase1(ExpectedValue: string): Promise<boolean>; // "Period: " + ExpectedValue
  validatePeriodPhase2(ExpectedValue: string): Promise<boolean>; // "Period: " + ExpectedValue
  validateGuaranteeAmountPhase1(ExpectedValue: string): Promise<boolean>;
  validateGuaranteeAmountPhase2(ExpectedValue: string): Promise<boolean>;
  validateGuaranteeFeePhase1(ExpectedValue: string): Promise<boolean>;
  validateGuaranteeFeePhase2(ExpectedValue: string): Promise<boolean>;
  validateCommissionPhase1(ExpectedValue: string): Promise<boolean>;
  validateCommissionPhase2(ExpectedValue: string): Promise<boolean>;
  //#endregion
}
