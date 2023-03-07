import { Before, Then } from "@cucumber/cucumber";
import { GlobalBrowserWindowHandle } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalBrowserWindowHandle";
import { ApplicationDetailFormTabDetail } from "../../../../page-objects/back-office-portal/guarantee/application/application-detail-forms/ApplicationDetailFormTabDetail";
import { ApplicationDetailFormTabDetailCPGuaranteeAtlas } from "../../../../page-objects/customer-portal/guarantee/atlas/application/application-detail-forms/ApplicationDetailFormTabDetailCPGuaranteeAtlas";
import { ApplicationDetailFormTabDetailCPGuaranteeHogs } from "../../../../page-objects/customer-portal/guarantee/hogs/application/application-detail-forms/ApplicationDetailFormTabDetailCPGuaranteeHogs";
import { addDate, convertPathFileDataToDataRegression, getDate, logFailTestcase } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { formatDateTime, getDefaultCurrency, numberToCurrency } from "../../../../shared/tenant-setting/tenant-setting";
import { scenarioTags } from "../../../../shared/variables";

const loader = require("csv-load-sync");

let applicationDetailFormTabDetail: ApplicationDetailFormTabDetail;
let globalBrowserWindowHandle: GlobalBrowserWindowHandle;

Before(async function () {
  if (scenarioTags.has("@CustomerPortalAtlas")) {
    const context: ICommonContext = this.context;
    applicationDetailFormTabDetail = new ApplicationDetailFormTabDetailCPGuaranteeAtlas(context.driverService);
    globalBrowserWindowHandle = new GlobalBrowserWindowHandle(context.driverService);
  }
  else if (scenarioTags.has("@CustomerPortalHogs")) {
    const context: ICommonContext = this.context;
    applicationDetailFormTabDetail = new ApplicationDetailFormTabDetailCPGuaranteeHogs(context.driverService);
    globalBrowserWindowHandle = new GlobalBrowserWindowHandle(context.driverService);
  }
  else {
    const context: ICommonContext = this.context;
    applicationDetailFormTabDetail = new ApplicationDetailFormTabDetail(context.driverService);
    globalBrowserWindowHandle = new GlobalBrowserWindowHandle(context.driverService);
  }
});

//#region Application Detail form tab Details First Column
Then("System shows correct information at detail application page section Created By {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  const CreateBy = row.username;
  if (CreateBy) {
    let temp = await applicationDetailFormTabDetail.validateCreatedBy(CreateBy);
    logFailTestcase(temp);
  }
});

Then("System shows correct information at detail application page section Issued Date {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  let IssuedDateGuaranteeMinusToday = row.IssuedDateGuaranteeMinusToday;
    if (IssuedDateGuaranteeMinusToday) {
        let IssuedDate = formatDateTime(getDate(row.IssuedDateGuaranteeMinusToday));
        if (scenarioTags.has("@CustomerPortalHogs") || scenarioTags.has("@CustomerPortalAtlas") || scenarioTags.has("@AgentPortalHogs")) {
            IssuedDate = IssuedDate.replace(/\./g, "-").replace(/\//g, "-");
        }
        let temp = await applicationDetailFormTabDetail.validateIssuedDate(IssuedDate);
        logFailTestcase(temp);
    }
});

Then("System shows correct information at detail application page section Debtor {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  const OrdererDebtor = row.OrdererDebtor;
  const OrganisationNumberDebtor = row.OrganisationNumberDebtor;
  const AddressDebtor = row.AddressDebtor;
  const PostcodeDebtor = row.PostcodeDebtor;
  const CityDebtor = row.CityDebtor;
  let temp = true;
  //#region Debtor
  if (OrdererDebtor) {
    temp = await applicationDetailFormTabDetail.validateDebtorName(OrdererDebtor);
    logFailTestcase(temp);
  }
  if (OrganisationNumberDebtor) {
    temp = await applicationDetailFormTabDetail.validateDebtorOrgNr("Org.nr.: " + OrganisationNumberDebtor);
    logFailTestcase(temp);
  }
  if (AddressDebtor) {
    temp = await applicationDetailFormTabDetail.validateDebtorAddress(AddressDebtor);
    logFailTestcase(temp);
  }
  if (PostcodeDebtor) {
    temp = await applicationDetailFormTabDetail.validateDebtorPostcode(PostcodeDebtor);
    logFailTestcase(temp);
  }
  if (CityDebtor) {
    temp = await applicationDetailFormTabDetail.validateDebtorCity(CityDebtor);
    logFailTestcase(temp);
  }
  //#endregion
});

Then("System shows correct information at detail application page section Beneficiary {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  const Type = row.Type;

  const IsPersonBeneficiary = row.IsPersonBeneficiary;
  const BeneficiaryBeneficiary = row.BeneficiaryBeneficiary;
  const OrgNrBeneficiary = row.OrgNrBeneficiary;
  const DateOfBirthBeneficiary = row.DateOfBirthBeneficiary;
  const AddressBeneficiary = row.AddressBeneficiary;
  const PostcodeBeneficiary = row.PostcodeBeneficiary;
  const CityBeneficiary = row.CityBeneficiary;
  const OtherInformationBeneficiary = row.OtherInformationBeneficiary;

  const Beneficiary2Beneficiary = row.Beneficiary2Beneficiary;
  const OrgNr2Beneficiary = row.OrgNr2Beneficiary;
  const DateOfBirth2Beneficiary = row.DateOfBirth2Beneficiary;
  const Address2Beneficiary = row.Address2Beneficiary;
  const Postcode2Beneficiary = row.Postcode2Beneficiary;
  const City2Beneficiary = row.City2Beneficiary;
  const OtherInformation2Beneficiary = row.OtherInformation2Beneficiary;

  let temp = true;
  //#region Beneficiary
  if (BeneficiaryBeneficiary) {
    temp = await applicationDetailFormTabDetail.validateBeneficiaryName(BeneficiaryBeneficiary);
    logFailTestcase(temp);
  }
  if (OrgNrBeneficiary) {
    temp = await applicationDetailFormTabDetail.validateBeneficiaryOrgNr("Org.nr.: " + OrgNrBeneficiary);
    logFailTestcase(temp);
  }
  if (AddressBeneficiary) {
    temp = await applicationDetailFormTabDetail.validateBeneficiaryAddress(AddressBeneficiary);
    logFailTestcase(temp);
  }
  if (PostcodeBeneficiary) {
    temp = await applicationDetailFormTabDetail.validateBeneficiaryPostcode(PostcodeBeneficiary);
    logFailTestcase(temp);
  }
  if (CityBeneficiary) {
    temp = await applicationDetailFormTabDetail.validateBeneficiaryCity(CityBeneficiary);
    logFailTestcase(temp);
  }
  //#endregion

  //#region Beneficiary 2
  if (Beneficiary2Beneficiary) {
    temp = await applicationDetailFormTabDetail.validateBeneficiary2Name(Beneficiary2Beneficiary);
    logFailTestcase(temp);
  }
  if (OrgNr2Beneficiary) {
    temp = await applicationDetailFormTabDetail.validateBeneficiary2OrgNr("Org.nr.: " + OrgNr2Beneficiary);
    logFailTestcase(temp);
  }
  if (Address2Beneficiary) {
    temp = await applicationDetailFormTabDetail.validateBeneficiary2Address(Address2Beneficiary);
    logFailTestcase(temp);
  }
  if (Postcode2Beneficiary) {
    temp = await applicationDetailFormTabDetail.validateBeneficiary2Postcode(Postcode2Beneficiary);
    logFailTestcase(temp);
  }
  if (City2Beneficiary) {
    temp = await applicationDetailFormTabDetail.validateBeneficiary2City(City2Beneficiary);
    logFailTestcase(temp);
  }
  //#endregion
});

Then("System shows correct information at detail application page section Guarantor {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  //GUARANTOR AND THIRD PARTY
  const GuarantorNameGuarantor = row.GuarantorNameGuarantor;
  const VisitingAddressGuarantor = row.VisitingAddressGuarantor;
  const PostcodeGuarantor = row.PostcodeGuarantor;
  const CityGuarantor = row.CityGuarantor.replace(/\*/g, ",");
  const GuaranteeIssuerGuarantor = row.GuaranteeIssuerGuarantor;
  const FirmsNoGuarantor = row.FirmsNoGuarantor;
  let temp = true;
  //#region Guarantor
  if (GuarantorNameGuarantor) {
    temp = await applicationDetailFormTabDetail.validateGuarantorName(GuarantorNameGuarantor);
    logFailTestcase(temp);
  }
  if (VisitingAddressGuarantor) {
    temp = await applicationDetailFormTabDetail.validateGuarantorAddress(VisitingAddressGuarantor);
    logFailTestcase(temp);
  }
  if (PostcodeGuarantor) {
    temp = await applicationDetailFormTabDetail.validateGuarantorPostcode(PostcodeGuarantor);
    logFailTestcase(temp);
  }
  if (CityGuarantor) {
    temp = await applicationDetailFormTabDetail.validateGuarantorCity(CityGuarantor);
    logFailTestcase(temp);
  }
  if (FirmsNoGuarantor) {
    temp = await applicationDetailFormTabDetail.validateGuarantorFirmNo("Firm number: " + FirmsNoGuarantor);
    logFailTestcase(temp);
  }
  //#endregion
});

Then("System shows correct information at detail application page section Guarantee Issuer {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  const GuaranteeIssuerGuarantor = row.GuaranteeIssuerGuarantor;
  let temp = true;
  //#region Guarantee Issuer
  if (GuaranteeIssuerGuarantor) {
    temp = await applicationDetailFormTabDetail.validateGuaranteeIssuer(GuaranteeIssuerGuarantor);
    logFailTestcase(temp);
  }
  //#endregion
});

Then("System shows correct information at detail application page section Underlying Contract {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  //CONTRACT AND GUARANTEE
  let TotalContractAmountUnderlying = row.TotalContractAmountUnderlying;
  const ContractReferenceUnderlying = row.ContractReferenceUnderlying;
  const ContractStartDateUnderlying = row.ContractStartDateUnderlying; //new
  const ContractStartDateMinusToday = row.ContractStartDateMinusToday; //new
  const UnderlyingContractDocsUnderlying = row.UnderlyingContractDocsUnderlying;
  const ProjectUnderlying = row.ProjectUnderlying;
  const ProjectNameUnderlying = row.ProjectNameUnderlying; //new
  const ProjectAddressUnderlying = row.ProjectAddressUnderlying; //new
  const ProjectDescriptionUnderlying = row.ProjectDescriptionUnderlying; //new
  const ContractCommitmentUnderlying = row.ContractCommitmentUnderlying;
  const GardsnummerUnderlying = row.GardsnummerUnderlying;
  const BruksnummerUnderlying = row.BruksnummerUnderlying;
  const KommuneUnderlying = row.KommuneUnderlying;
  let temp = true;
  //#region Underlying Contract
  if (ContractReferenceUnderlying) {
    temp = await applicationDetailFormTabDetail.validateUnderlyingContractReference(ContractReferenceUnderlying);
    logFailTestcase(temp);
  }
  if (ContractCommitmentUnderlying) {
    temp = await applicationDetailFormTabDetail.validateUnderlyingContractCommitment(ContractCommitmentUnderlying);
    logFailTestcase(temp);
  }
  if (GardsnummerUnderlying) {
    temp = await applicationDetailFormTabDetail.validateUnderlyingContractGardsnummer("GNR " + GardsnummerUnderlying);
    logFailTestcase(temp);
  }
  if (BruksnummerUnderlying) {
    temp = await applicationDetailFormTabDetail.validateUnderlyingContractBruksnummer("BNR " + BruksnummerUnderlying);
    logFailTestcase(temp);
  }
  if (KommuneUnderlying) {
    temp = await applicationDetailFormTabDetail.validateUnderlyingContractKommune(KommuneUnderlying);
    logFailTestcase(temp);
  }

  if (TotalContractAmountUnderlying) {
    if (scenarioTags.has("@CustomerPortalHogs") || scenarioTags.has("@CustomerPortalAtlas") || scenarioTags.has("@AgentPortalHogs")){
      TotalContractAmountUnderlying = numberToCurrency(TotalContractAmountUnderlying) + " " + getDefaultCurrency();
    } else {
      TotalContractAmountUnderlying = numberToCurrency(TotalContractAmountUnderlying, true);
    }
    temp = await applicationDetailFormTabDetail.validateUnderlyingContractTotalAmount(TotalContractAmountUnderlying);
    logFailTestcase(temp);
  }
  if (ContractStartDateMinusToday || ContractStartDateUnderlying) {
    let dateTemp = ContractStartDateMinusToday;
    if (ContractStartDateMinusToday) {
      dateTemp = getDate(ContractStartDateMinusToday);
    }
    if (scenarioTags.has("@CustomerPortalHogs") || scenarioTags.has("@CustomerPortalAtlas") || scenarioTags.has("@AgentPortalHogs")) {
      dateTemp = dateTemp.replace(/\./g, "-").replace(/\//g, "-");
    }
    else {
      dateTemp = formatDateTime(dateTemp);
    }
    temp = await applicationDetailFormTabDetail.validateUnderlyingContractStartDate(dateTemp);
    logFailTestcase(temp);
  }
});

Then("System shows correct information at detail application page section Third Party {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  const CompanyNameThirdParty = row.CompanyNameThirdParty;
  const AddressThirdParty = row.AddressThirdParty;
  const PostcodeThirdParty = row.PostcodeThirdParty;
  const CityThirdParty = row.CityThirdParty;
  const PhoneNumberThirdParty = row.PhoneNumberThirdParty;
  const FaxThirdParty = row.FaxThirdParty;
  const EmailThirdParty = row.EmailThirdParty;
  const WebsiteThirdParty = row.WebsiteThirdParty;
  let temp = true;
  //#region Third Party
  if (CompanyNameThirdParty) {
    temp = await applicationDetailFormTabDetail.validateThirdPartyName(CompanyNameThirdParty);
    logFailTestcase(temp);
  }
  if (AddressThirdParty) {
    temp = await applicationDetailFormTabDetail.validateThirdPartyAddress(AddressThirdParty);
    logFailTestcase(temp);
  }
  if (PostcodeThirdParty) {
    temp = await applicationDetailFormTabDetail.validateThirdPartyPostcode(PostcodeThirdParty);
    logFailTestcase(temp);
  }
  if (CityThirdParty) {
    temp = await applicationDetailFormTabDetail.validateThirdPartyCity(CityThirdParty);
    logFailTestcase(temp);
  }
  if (PhoneNumberThirdParty) {
    temp = await applicationDetailFormTabDetail.validateThirdPartyPhone("Phone " + PhoneNumberThirdParty);
    logFailTestcase(temp);
  }
  //#endregion
});

Then ("System shows correct information at detail application page section Heading Primary {string}", async(filename)=>{
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  let ApplicationNo = row.ApplicationNo;
  let FrameAgreementNo = row.FrameAgreementNo;
  const SavedInformationFile = row.SavedInformationFile;
  let temp = true;

  const app = require("../../../../." + SavedInformationFile);
  console.log(app);
  if(FrameAgreementNo){
    FrameAgreementNo = app.FrameAgreemtNo;
    temp = await applicationDetailFormTabDetail.validateFrameAgreementNoOnApplicationDetailForm(FrameAgreementNo);
    logFailTestcase(temp);
  }
  if(ApplicationNo){
    ApplicationNo = app.ApplicationNo;
    temp = await applicationDetailFormTabDetail.validateApplicationNoOnApplicationDetailForm(ApplicationNo);
    logFailTestcase(temp);
  }
});

Then ("System shows correct information at detail guarantee page section Heading Primary {string}", async(filename)=>{
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  let GuaranteeNo = row.GuaranteeNo;
  const SavedInformationFile = row.SavedInformationFile;
  let temp = true;

  if(GuaranteeNo){
    const app = require("../../../../." + SavedInformationFile);
    GuaranteeNo = app.GuaranteeNo;
    temp = await applicationDetailFormTabDetail.validateGuaranteeNoOnGuaranteeDetailForm(GuaranteeNo);
    logFailTestcase(temp);
  }
});

Then("User navigates to {string} tab on {string} form", async(tabName:string, formName:string)=>{
  let temp = true;
if(tabName.localeCompare("Detail")===0){
  temp = await applicationDetailFormTabDetail.pressDetailTab();
  logFailTestcase(temp,`press Detail Tab on ${formName} form failed!`);
}else if(tabName.localeCompare("Documents")===0){
  temp = await applicationDetailFormTabDetail.pressDocumentsTab();
  logFailTestcase(temp,`press Documents Tab on ${formName} form failed!`);
}else{
  logFailTestcase(temp,`can not find '${tabName}' tab on ${formName} form`);
}
});
//#endregion