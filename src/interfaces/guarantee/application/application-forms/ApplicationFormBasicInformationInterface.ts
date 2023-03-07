export interface ApplicationFormBasicInformationInterface {
  //#region Input value
  // 1. Application section
  inputExpiryDateApplication(ExpiryDate: string): Promise<boolean>;
  // 2. Guarantee section
  inputDescriptionGuarantee(Description: string): Promise<boolean>;
  inputIssuedDateGuarantee(IssuedDate: string): Promise<boolean>;
  // 3. Beneficiary section
  checkIsPersonBeneficiary(): Promise<boolean>;

  /**
     * 
     * @param BeneficiaryData Just input one file at a time.
     * @returns 
     */
  inputBeneficiaryData(BeneficiaryData: string): Promise<boolean>;
  inputBeneficiaryBeneficiary(Beneficiary: string): Promise<boolean>;
  inputOrgNrBeneficiary(OrgNr: string): Promise<boolean>;
  inputDateOfBirthBeneficiary(DateOfBirth: string): Promise<boolean>;
  inputAddressBeneficiary(Address: string): Promise<boolean>;
  inputPostcodeBeneficiary(Postcode: string): Promise<boolean>;
  inputCityBeneficiary(City: string): Promise<boolean>;
  inputOtherInformationBeneficiary(OtherInformation: string): Promise<boolean>;


  // 3.2 Beneficiary2 section
  inputBeneficiary2Beneficiary(Beneficiary2: string): Promise<boolean>;
  inputOrgNr2Beneficiary(OrgNr2: string): Promise<boolean>;
  inputDateOfBirth2Beneficiary(DateOfBirth2: string): Promise<boolean>;
  inputAddress2Beneficiary(Address2: string): Promise<boolean>;
  inputPostcode2Beneficiary(Postcode2: string): Promise<boolean>;
  inputCity2Beneficiary(City2: string): Promise<boolean>;
  inputOtherInformation2Beneficiary(OtherInformation2: string): Promise<boolean>;

  // 4. Debtor section
  inputOrdererDebtor(Orderer: string): Promise<boolean>;
  inputOrganisationNumberDebtor(OrganisationNumber: string): Promise<boolean>;
  inputAddressDebtor(Address: string): Promise<boolean>;
  inputPostcodeDebtor(Postcode: string): Promise<boolean>;
  inputCityDebtor(City: string): Promise<boolean>;
  inputOtherInformationDebtor(OtherInformation: string): Promise<boolean>;
  //#endregion

  //#region Validate value
  // 1. Application section
  validateExpiryDateApplication(ExpectedValue: string): Promise<boolean>;
  validateFrameAgreementNumberApplication(ExpectedValue: string): Promise<boolean>;
  validateProductApplication(ExpectedValue: string): Promise<boolean>;

  // 2. Guarantee section
  validateGuaranteeNoGuarantee(ExpectedValue: string): Promise<boolean>;
  validateDescriptionGuarantee(ExpectedValue: string): Promise<boolean>;
  validateGuaranteeTypeGuarantee(ExpectedValue: string): Promise<boolean>;
  validateIssuedDateGuarantee(ExpectedValue: string): Promise<boolean>;

  // 4. Debtor section
  validateOrdererDebtor(ExpectedValue: string): Promise<boolean>;
  validateOrganisationNumberDebtor(ExpectedValue: string): Promise<boolean>;
  validateAddressDebtor(ExpectedValue: string): Promise<boolean>;
  validatePostcodeDebtor(ExpectedValue: string): Promise<boolean>;
  //#endregion
}
