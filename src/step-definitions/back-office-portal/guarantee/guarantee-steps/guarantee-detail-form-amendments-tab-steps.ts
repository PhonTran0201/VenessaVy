import { Before, Then } from "@cucumber/cucumber";
import { Type } from "selenium-webdriver/lib/logging";
import { GuaranteeDetailFormAmendments } from "../../../../page-objects/back-office-portal/guarantee/guarantee/guarantee-forms/GuaranteeDetailFormAmendments";
import { GuaranteeDetailFormAmendmentsCPGuaranteeAtlas } from "../../../../page-objects/customer-portal/guarantee/atlas/guarantee/guarantee-forms/GuaranteeDetailFormAmendmentsCPGuaranteeAtlas";
import { GuaranteeDetailFormAmendmentsCPGuaranteeHogs } from "../../../../page-objects/customer-portal/guarantee/hogs/guarantee/guarantee-forms/GuaranteeDetailFormAmendmentsCPGuaranteeHogs";
import { addDate, convertPathFileDataToDataRegression, getDate, logFailTestcase, logInfoMessage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { formatDateTime, getDefaultCurrency, numberToCurrency } from "../../../../shared/tenant-setting/tenant-setting";
import { dataTestcase, scenarioTags } from "../../../../shared/variables";

const loader = require("csv-load-sync");

let guaranteeDetailFormAmendments: GuaranteeDetailFormAmendments;

Before(async function () {
  if (scenarioTags.has("@CustomerPortalAtlas")) {
    const context: ICommonContext = this.context;
    guaranteeDetailFormAmendments = new GuaranteeDetailFormAmendmentsCPGuaranteeAtlas(context.driverService);
  }
  else if (scenarioTags.has("@CustomerPortalHogs")) {
    const context: ICommonContext = this.context;
    guaranteeDetailFormAmendments = new GuaranteeDetailFormAmendmentsCPGuaranteeHogs(context.driverService);
  }
  else {
    const context: ICommonContext = this.context;
    guaranteeDetailFormAmendments = new GuaranteeDetailFormAmendments(context.driverService);
  }
});

//#region Application Detail form tab Details First Column
Then("System shows correct information at Amendments tab Guarantee details form section Created By {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  const CreateBy = row.username;
  if (CreateBy) {
    let temp = await guaranteeDetailFormAmendments.validateCreatedBy(CreateBy);
    logFailTestcase(temp);
  }
});

Then("System shows correct information at Amendments tab Guarantee details form section Issued Date {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  let IssuedDateGuaranteeMinusToday = row.IssuedDateGuaranteeMinusToday;
  if (IssuedDateGuaranteeMinusToday) {
    let IssuedDate = formatDateTime(getDate(row.IssuedDateGuaranteeMinusToday));
    if (scenarioTags.has("@CustomerPortalHogs") || scenarioTags.has("@CustomerPortalAtlas")) {
      IssuedDate = IssuedDate.replace(/\./g, "-").replace(/\//g, "-");
    }
    let temp = await guaranteeDetailFormAmendments.validateIssuedDate(IssuedDate);
    logFailTestcase(temp);
  }
});

Then("System shows correct information at Amendments tab Guarantee details form section Debtor {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  const OrdererDebtor = row.OrdererDebtor;
  const OrganisationNumberDebtor = row.OrganisationNumberDebtor;
  const AddressDebtor = row.AddressDebtor;
  const PostcodeDebtor = row.PostcodeDebtor;
  const CityDebtor = row.CityDebtor;
  let temp = true;
  //#region Debtor
  if (OrdererDebtor) {
    temp = await guaranteeDetailFormAmendments.validateDebtorName(OrdererDebtor);
    logFailTestcase(temp);
  }
  if (OrganisationNumberDebtor) {
    temp = await guaranteeDetailFormAmendments.validateDebtorOrgNr("Org.nr.: " + OrganisationNumberDebtor);
    logFailTestcase(temp);
  }
  if (AddressDebtor) {
    temp = await guaranteeDetailFormAmendments.validateDebtorAddress(AddressDebtor);
    logFailTestcase(temp);
  }
  if (PostcodeDebtor) {
    temp = await guaranteeDetailFormAmendments.validateDebtorPostcode(PostcodeDebtor);
    logFailTestcase(temp);
  }
  if (CityDebtor) {
    temp = await guaranteeDetailFormAmendments.validateDebtorCity(CityDebtor);
    logFailTestcase(temp);
  }
  //#endregion
});

Then("System shows correct information at Amendments tab Guarantee details form section Beneficiary {string}", async (filename) => {
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
    temp = await guaranteeDetailFormAmendments.validateBeneficiaryName(BeneficiaryBeneficiary);
    logFailTestcase(temp);
  }
  if (OrgNrBeneficiary) {
    temp = await guaranteeDetailFormAmendments.validateBeneficiaryOrgNr("Org.nr.: " + OrgNrBeneficiary);
    logFailTestcase(temp);
  }
  if (AddressBeneficiary) {
    temp = await guaranteeDetailFormAmendments.validateBeneficiaryAddress(AddressBeneficiary);
    logFailTestcase(temp);
  }
  if (PostcodeBeneficiary) {
    temp = await guaranteeDetailFormAmendments.validateBeneficiaryPostcode(PostcodeBeneficiary);
    logFailTestcase(temp);
  }
  if (CityBeneficiary) {
    temp = await guaranteeDetailFormAmendments.validateBeneficiaryCity(CityBeneficiary);
    logFailTestcase(temp);
  }
  //#endregion

  //#region Beneficiary 2
  if (Beneficiary2Beneficiary) {
    temp = await guaranteeDetailFormAmendments.validateBeneficiary2Name(Beneficiary2Beneficiary);
    logFailTestcase(temp);
  }
  if (OrgNr2Beneficiary) {
    temp = await guaranteeDetailFormAmendments.validateBeneficiary2OrgNr("Org.nr.: " + OrgNr2Beneficiary);
    logFailTestcase(temp);
  }
  if (Address2Beneficiary) {
    temp = await guaranteeDetailFormAmendments.validateBeneficiary2Address(Address2Beneficiary);
    logFailTestcase(temp);
  }
  if (Postcode2Beneficiary) {
    temp = await guaranteeDetailFormAmendments.validateBeneficiary2Postcode(Postcode2Beneficiary);
    logFailTestcase(temp);
  }
  if (City2Beneficiary) {
    temp = await guaranteeDetailFormAmendments.validateBeneficiary2City(City2Beneficiary);
    logFailTestcase(temp);
  }
  //#endregion
});

Then("System shows correct information at Amendments tab Guarantee details form section Guarantor {string}", async (filename) => {
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
    temp = await guaranteeDetailFormAmendments.validateGuarantorName(GuarantorNameGuarantor);
    logFailTestcase(temp);
  }
  if (VisitingAddressGuarantor) {
    temp = await guaranteeDetailFormAmendments.validateGuarantorAddress(VisitingAddressGuarantor);
    logFailTestcase(temp);
  }
  if (PostcodeGuarantor) {
    temp = await guaranteeDetailFormAmendments.validateGuarantorPostcode(PostcodeGuarantor);
    logFailTestcase(temp);
  }
  if (CityGuarantor) {
    temp = await guaranteeDetailFormAmendments.validateGuarantorCity(CityGuarantor);
    logFailTestcase(temp);
  }
  if (FirmsNoGuarantor) {
    temp = await guaranteeDetailFormAmendments.validateGuarantorFirmNo("Firm number: " + FirmsNoGuarantor);
    logFailTestcase(temp);
  }
  //#endregion
});

Then("System shows correct information at Amendments tab Guarantee details form section Guarantee Issuer {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  const GuaranteeIssuerGuarantor = row.GuaranteeIssuerGuarantor;
  let temp = true;
  //#region Guarantee Issuer
  if (GuaranteeIssuerGuarantor) {
    temp = await guaranteeDetailFormAmendments.validateGuaranteeIssuer(GuaranteeIssuerGuarantor);
    logFailTestcase(temp);
  }
  //#endregion
});

Then("System shows correct information at Amendments tab Guarantee details form section Underlying Contract {string}", async (filename) => {
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
    temp = await guaranteeDetailFormAmendments.validateUnderlyingContractReference(ContractReferenceUnderlying);
    logFailTestcase(temp);
  }
  if (ContractCommitmentUnderlying) {
    temp = await guaranteeDetailFormAmendments.validateUnderlyingContractCommitment(ContractCommitmentUnderlying);
    logFailTestcase(temp);
  }
  if (GardsnummerUnderlying) {
    temp = await guaranteeDetailFormAmendments.validateUnderlyingContractGardsnummer("GNR " + GardsnummerUnderlying);
    logFailTestcase(temp);
  }
  if (BruksnummerUnderlying) {
    temp = await guaranteeDetailFormAmendments.validateUnderlyingContractBruksnummer("BNR " + BruksnummerUnderlying);
    logFailTestcase(temp);
  }
  if (KommuneUnderlying) {
    temp = await guaranteeDetailFormAmendments.validateUnderlyingContractKommune(KommuneUnderlying);
    logFailTestcase(temp);
  }

  if (TotalContractAmountUnderlying) {
    if (scenarioTags.has("@CustomerPortalHogs") || scenarioTags.has("@CustomerPortalAtlas")) {
      TotalContractAmountUnderlying = numberToCurrency(TotalContractAmountUnderlying) + " " + getDefaultCurrency();
    } else {
      TotalContractAmountUnderlying = numberToCurrency(TotalContractAmountUnderlying, true);
    }
    temp = await guaranteeDetailFormAmendments.validateUnderlyingContractTotalAmount(TotalContractAmountUnderlying);
    logFailTestcase(temp);
  }
  if (ContractStartDateMinusToday || ContractStartDateUnderlying) {
    let dateTemp = ContractStartDateMinusToday;
    if (ContractStartDateMinusToday) {
      dateTemp = getDate(ContractStartDateMinusToday);
    }
    if (scenarioTags.has("@CustomerPortalHogs") || scenarioTags.has("@CustomerPortalAtlas")) {
      dateTemp = dateTemp.replace(/\./g, "-").replace(/\//g, "-");
    }
    else {
      dateTemp = formatDateTime(dateTemp);
    }
    temp = await guaranteeDetailFormAmendments.validateUnderlyingContractStartDate(dateTemp);
    logFailTestcase(temp);
  }
});

Then("System shows correct information at Amendments tab Guarantee details form section Third Party {string}", async (filename) => {
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
    temp = await guaranteeDetailFormAmendments.validateThirdPartyName(CompanyNameThirdParty);
    logFailTestcase(temp);
  }
  if (AddressThirdParty) {
    temp = await guaranteeDetailFormAmendments.validateThirdPartyAddress(AddressThirdParty);
    logFailTestcase(temp);
  }
  if (PostcodeThirdParty) {
    temp = await guaranteeDetailFormAmendments.validateThirdPartyPostcode(PostcodeThirdParty);
    logFailTestcase(temp);
  }
  if (CityThirdParty) {
    temp = await guaranteeDetailFormAmendments.validateThirdPartyCity(CityThirdParty);
    logFailTestcase(temp);
  }
  if (PhoneNumberThirdParty) {
    temp = await guaranteeDetailFormAmendments.validateThirdPartyPhone("Phone " + PhoneNumberThirdParty);
    logFailTestcase(temp);
  }
  //#endregion
});
Then("System shows correct information at Amendments tab Guarantee details form section Timeline {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  //#region Declare variables

  const Type = row.Type;


  let PeriodStartGuarantee = "";
  let PeriodEndGuarantee = "";
  let GuaranteeAmountGuarantee = row.GuaranteeAmountGuarantee;
  let AdditionalGuaranteeFee = row.AdditionalGuaranteeFee;
  let AdditionalCommisstion = row.AdditionalCommisstion;
  let AmendmentFee = row.AmendmentFee;

  let StartDateMinusToday = row.StartDateMinusToday;
  let EndDateMinusStartDate = row.EndDateMinusStartDate;
  let RenewGuaranteeGuarantee = row.RenewGuaranteeGuarantee;


  //Two phases
  let PeriodStartGuaranteePhase2 = "";
  let PeriodEndGuaranteePhase2 = "";
  let AdditionalGuaranteeFeePhase2 = row.AdditionalGuaranteeFeePhase2;
  let AdditionalCommisstionPhase2 = row.AdditionalCommisstionPhase2;
  let TotalAdditionalGuaranteeFee = row.TotalAdditionalGuaranteeFee;
  let GuaranteeAmountGuaranteePhase2 = row.GuaranteeAmountGuaranteePhase2
  let StartDate2MinusEndDate = row.StartDate2MinusEndDate;
  let EndDate2MinusStartDate2 = row.EndDate2MinusStartDate2;


  //Period Date
  if (StartDateMinusToday) {
    PeriodStartGuarantee = getDate(row.StartDateMinusToday);
  }
  if (EndDateMinusStartDate) {
    PeriodEndGuarantee = addDate(PeriodStartGuarantee, row.EndDateMinusStartDate);
  }
  if (StartDate2MinusEndDate) {
    PeriodStartGuaranteePhase2 = addDate(PeriodEndGuarantee, StartDate2MinusEndDate);
  }
  if (EndDate2MinusStartDate2) {
    PeriodEndGuaranteePhase2 = addDate(PeriodStartGuaranteePhase2, EndDate2MinusStartDate2);
  }
  //#endregion



  //#region Validate value
  //#region 1. Each phases


  let temp = true;

  if (!Type || Type.localeCompare("Two Phases") != 0) {
    if (PeriodStartGuarantee && PeriodEndGuarantee) {
      let PeriodStart = formatDateTime(PeriodStartGuarantee);
      let periodEnd = formatDateTime(PeriodEndGuarantee);
      if (scenarioTags.has("@CustomerPortalHogs") || scenarioTags.has("@CustomerPortalAtlas")) {
        periodEnd = periodEnd.replace(/\./g, "-").replace(/\//g, "-");
        PeriodStart = PeriodStart.replace(/\./g, "-").replace(/\//g, "-");
      }
      if (RenewGuaranteeGuarantee) {
        temp = await guaranteeDetailFormAmendments.validatePeriod(PeriodStart);
        logFailTestcase(temp, "Incorrect Period");
      }
      else {
        temp = await guaranteeDetailFormAmendments.validatePeriod(PeriodStart + " - " + periodEnd);
        logFailTestcase(temp, "Incorrect Period");
      }
    }
    if (GuaranteeAmountGuarantee) {
      temp = await guaranteeDetailFormAmendments.validateGuaranteeAmount(numberToCurrency(GuaranteeAmountGuarantee) + " " + getDefaultCurrency());
      logFailTestcase(temp, "Incorrect GuaranteeAmount");
    }
    if (AdditionalGuaranteeFee) {
      temp = await guaranteeDetailFormAmendments.validateAdditionalGuaranteeFee(numberToCurrency(AdditionalGuaranteeFee));
      logFailTestcase(temp, "Incorrect Additional guarantee fee");
    }
    if (AdditionalCommisstion) {
      temp = await guaranteeDetailFormAmendments.validateAdditionalCommission(numberToCurrency(AdditionalCommisstion) + " " + getDefaultCurrency());
      logFailTestcase(temp, "Incorrect AdditionalCommisstion");
    }
  }
  else if (Type.localeCompare("Two Phases") === 0) {
    if (PeriodStartGuarantee && PeriodEndGuaranteePhase2) {
      let period = formatDateTime(PeriodStartGuarantee) + " - " + formatDateTime(PeriodEndGuarantee);
      let periodPhase2 = formatDateTime(PeriodStartGuaranteePhase2) + " - " + formatDateTime(PeriodEndGuaranteePhase2);
      if (scenarioTags.has("@CustomerPortalHogs") || scenarioTags.has("@CustomerPortalAtlas")) {
        periodPhase2 = periodPhase2.replace(/\./g, "-").replace(/\//g, "-");
        period = period.replace(/\./g, "-").replace(/\//g, "-");
      }
      temp = await guaranteeDetailFormAmendments.validatePeriodPhase1("Period: " + period);
      logFailTestcase(temp, "Incorrect Period Phase 1");
      temp = await guaranteeDetailFormAmendments.validatePeriodPhase2("Period: " + periodPhase2);
      logFailTestcase(temp, "Incorrect Period Phase 2");
    }
    if (GuaranteeAmountGuarantee) {
      temp = await guaranteeDetailFormAmendments.validateGuaranteeAmountPhase1(numberToCurrency(GuaranteeAmountGuarantee) + " " + getDefaultCurrency());
      logFailTestcase(temp, "Incorrect GuaranteeAmount phase 1");
    }
    if (GuaranteeAmountGuaranteePhase2) {
      temp = await guaranteeDetailFormAmendments.validateGuaranteeAmountPhase2(numberToCurrency(GuaranteeAmountGuaranteePhase2) + " " + getDefaultCurrency());
      logFailTestcase(temp, "Incorrect GuaranteeAmount phase 2");
    }
    if (AdditionalGuaranteeFee) {
      temp = await guaranteeDetailFormAmendments.validateAdditionalGuaranteeFeePhase1(numberToCurrency(AdditionalGuaranteeFee) + " " + getDefaultCurrency());
      logFailTestcase(temp, "Incorrect Additional guarantee fee Phase 1");
    }
    if (AdditionalGuaranteeFeePhase2) {
      temp = await guaranteeDetailFormAmendments.validateAdditionalGuaranteeFeePhase2(numberToCurrency(AdditionalGuaranteeFeePhase2) + " " + getDefaultCurrency());
      logFailTestcase(temp, "Incorrect Additional guarantee fee Phase 2");
    }
    if (AdditionalCommisstion) {
      temp = await guaranteeDetailFormAmendments.validateAdditionalCommissionPhase1(numberToCurrency(AdditionalCommisstion) + " " + getDefaultCurrency());
      logFailTestcase(temp, "Incorrect AdditionalCommisstion phase 1");
    }
    if (AdditionalCommisstionPhase2) {
      temp = await guaranteeDetailFormAmendments.validateAdditionalCommissionPhase2(numberToCurrency(AdditionalCommisstionPhase2) + " " + getDefaultCurrency());
      logFailTestcase(temp, "Incorrect AdditionalCommisstion phase 2");
    }
  }
  else {
    logFailTestcase(false, "Can not validate the values at Amendment Preview timeline!");
  }


  if (AmendmentFee) {
    // if (scenarioTags.has("@CustomerPortalHogs") || scenarioTags.has("@CustomerPortalAtlas")) {
    //     AmendmentFee = numberToCurrency(AmendmentFee) + " " + getDefaultCurrency();
    // }
    // else {
    //     AmendmentFee = numberToCurrency(AmendmentFee, true)
    // }
    temp = await guaranteeDetailFormAmendments.validateAmendmentFee(AmendmentFee);
    logFailTestcase(temp, "Incorrect amendment fee");
  }




});
Then("System shows correct information at Amendments tab Guarantee details form column Amendments History {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  let guaranteeVersion = "/0001";
  for (const iterator of dataTestcase) {
    if (iterator.nameField.localeCompare("Guarantee No") === 0) {
      guaranteeVersion = iterator.message[0] + "/0001";
    }
  }
  let createdDate = getDate(0);
  let tagName = row.TagName;
  const AmendmentFee = row.AmendmentFee;
  const RenewGuaranteeGuarantee = row.RenewGuaranteeGuarantee;

  // For product has Renew feature (Skattetrekksgaranti)
  if (RenewGuaranteeGuarantee && RenewGuaranteeGuarantee.localeCompare("Yes") === 0) {
    createdDate = getDate(0);
    guaranteeVersion = "/0001";
  }

  logInfoMessage("1........" + guaranteeVersion);
  logInfoMessage("2........" + createdDate);
  logInfoMessage("3........" + tagName);
  let temp = true;
  if (guaranteeVersion) {
    temp = await guaranteeDetailFormAmendments.validateValueGuaranteeVersionOnAmendmentHistory(guaranteeVersion, 1, true);
    logFailTestcase(temp, "Incorrect Guarantee version");
  }

  if (createdDate) {
    temp = await guaranteeDetailFormAmendments.validateValueCreatedDateOnAmendmentHistory("Created date: " + formatDateTime(createdDate));
    logFailTestcase(temp, "Incorrect Created date");
  }

  if (tagName) {
    temp = await guaranteeDetailFormAmendments.validateValueTagNameOnAmendmentHistory(tagName);
    logFailTestcase(temp, "Incorrect Tag Name");
  }
  if (AmendmentFee) {
    temp = await guaranteeDetailFormAmendments.validateValueAmendmentFeeOnAmendmentHistory(AmendmentFee, 1, true);
    logFailTestcase(temp, "Incorrect AmendmentFee");
  }
});
//#endregion