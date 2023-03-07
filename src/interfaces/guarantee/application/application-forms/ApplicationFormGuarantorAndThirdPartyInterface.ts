export interface ApplicationFormGuarantorAndThirdPartyInterface {
    //#region Methods Input values

    //#region 1. Guarantor section
    inputGuarantorNameGuarantor(GuarantorName: string): Promise<boolean>;
    inputVisitingAddressGuarantor(VisitingAddress: string): Promise<boolean>;
    inputPostcodeGuarantor(Postcode: string): Promise<boolean>;
    inputCityGuarantor(City: string): Promise<boolean>;
    inputGuaranteeIssuerGuarantor(GuaranteeIssuer: string): Promise<boolean>;
    inputOnBehalfOfTheGuarantorGuarantor(OnBehalfOfTheGuarantor: string): Promise<boolean>;
    inputFirmsNoGuarantor(FirmsNo: string): Promise<boolean>;
    inputPostAddressGuarantor(PostAddress: string): Promise<boolean>;
    // PostZipCode = Postcode but in 2nd column
    inputPostZipCodeGuarantor(PostZipCode: string): Promise<boolean>;
    inputPostCityGuarantor(PostCity: string): Promise<boolean>;
    inputEmailGuarantor(Email: string): Promise<boolean>;
    inputPhoneNumberGuarantor(PhoneNumber: string): Promise<boolean>;
    //#endregion


    //#region 2. Third party attorney section
    inputCompanyNameThirdParty(CompanyName: string): Promise<boolean>;
    inputAddressThirdParty(Address: string): Promise<boolean>;
    inputPostcodeThirdParty(Postcode: string): Promise<boolean>;
    inputCityThirdParty(City: string): Promise<boolean>;
    inputPhoneNumberThirdParty(PhoneNumber: string): Promise<boolean>;
    inputFaxThirdParty(Fax: string): Promise<boolean>;
    inputEmailThirdParty(Email: string): Promise<boolean>;
    inputWebsiteThirdParty(Website: string): Promise<boolean>;
    //#endregion
}