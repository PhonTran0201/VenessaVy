import { Before, Then, When } from "@cucumber/cucumber";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { ApplicationFormBasicInformation } from "../../../../page-objects/back-office-portal/guarantee/application/application-forms/ApplicationFormBasicInformation";
import { ApplicationFormContractAndGuarantee } from "../../../../page-objects/back-office-portal/guarantee/application/application-forms/ApplicationFormContractAndGuarantee";
import { ApplicationFormGuarantorAndThirdParty } from "../../../../page-objects/back-office-portal/guarantee/application/application-forms/ApplicationFormGuarantorAndThirdParty";
import { ApplicationFormPayment } from "../../../../page-objects/back-office-portal/guarantee/application/application-forms/ApplicationFormPayment";
import { ApplicationFormBasicInformationCPGuaranteeAtlas } from "../../../../page-objects/customer-portal/guarantee/atlas/application/application-forms/ApplicationFormBasicInformationCPGuaranteeAtlas";
import { ApplicationFormContractAndGuaranteeCPGuaranteeAtlas } from "../../../../page-objects/customer-portal/guarantee/atlas/application/application-forms/ApplicationFormContractAndGuaranteeCPGuaranteeAtlas";
import { ApplicationFormPaymentCPGuaranteeAtlas } from "../../../../page-objects/customer-portal/guarantee/atlas/application/application-forms/ApplicationFormPaymentCPGuaranteeAtlas";
import { ApplicationFormBasicInformationCPGuaranteeHogs } from "../../../../page-objects/customer-portal/guarantee/hogs/application/application-forms/ApplicationFormBasicInformationCPGuaranteeHogs";
import { ApplicationFormContractAndGuaranteeCPGuaranteeHogs } from "../../../../page-objects/customer-portal/guarantee/hogs/application/application-forms/ApplicationFormContractAndGuaranteeCPGuaranteeHogs";
import { ApplicationFormPaymentCPGuaranteeHogs } from "../../../../page-objects/customer-portal/guarantee/hogs/application/application-forms/ApplicationFormPaymentCPGuaranteeHogs";
import { ValidateField } from "../../../../shared/classes";
import { addDate, addMonth, convertPathFileDataToDataRegression, getDate, logFailTestcase, logInfoMessage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { dataTestcase, dataTestExecution, scenarioTags } from "../../../../shared/variables";
import { getValueDataOfDataTestExecution } from "../../../../storage-data/functions/data-test-execution";

const loader = require("csv-load-sync");

let globalPageObject: GlobalPageObject;
let applicationFormBasicInformation: ApplicationFormBasicInformation;
let applicationFormContractAndGuarantee: ApplicationFormContractAndGuarantee;
let applicationFormGuarantorAndThirdParty: ApplicationFormGuarantorAndThirdParty;
let applicationFormPayment: ApplicationFormPayment;

Before(async function () {
  if (scenarioTags.has("@CustomerPortalAtlas")) {
    const context: ICommonContext = this.context;
    globalPageObject = new GlobalPageObject(context.driverService);
    applicationFormBasicInformation = new ApplicationFormBasicInformationCPGuaranteeAtlas(context.driverService);
    applicationFormContractAndGuarantee = new ApplicationFormContractAndGuaranteeCPGuaranteeAtlas(context.driverService);
    applicationFormGuarantorAndThirdParty = new ApplicationFormGuarantorAndThirdParty(context.driverService);
    applicationFormPayment = new ApplicationFormPaymentCPGuaranteeAtlas(context.driverService);
  }
  else if (scenarioTags.has("@CustomerPortalHogs")) {

    const context: ICommonContext = this.context;
    globalPageObject = new GlobalPageObject(context.driverService);
    applicationFormBasicInformation = new ApplicationFormBasicInformationCPGuaranteeHogs(context.driverService);
    applicationFormContractAndGuarantee = new ApplicationFormContractAndGuaranteeCPGuaranteeHogs(context.driverService);
    applicationFormGuarantorAndThirdParty = new ApplicationFormGuarantorAndThirdParty(context.driverService);
    applicationFormPayment = new ApplicationFormPaymentCPGuaranteeHogs(context.driverService);
  }
  else {
    const context: ICommonContext = this.context;
    globalPageObject = new GlobalPageObject(context.driverService);
    applicationFormBasicInformation = new ApplicationFormBasicInformation(context.driverService);
    applicationFormContractAndGuarantee = new ApplicationFormContractAndGuarantee(context.driverService);
    applicationFormGuarantorAndThirdParty = new ApplicationFormGuarantorAndThirdParty(context.driverService);
    applicationFormPayment = new ApplicationFormPayment(context.driverService);
  }
});
//#region Input Create Application form
When("User inputs valid data into Create Application form at section Basic Information {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];

  // For all check box
  const ValidateDefaultAnswerCheckbox = row.ValidateDefaultAnswerCheckbox; // For IsPerson
  const ValidateDefaultAnswerCheckboxOnDemandApplication = row.ValidateDefaultAnswerCheckboxOnDemandApplication;

  //#region Declare variables
  let ExpiryDateApplication = row.ExpiryDateApplication;
  const ExpiryDateApplicationMinusToday = row.ExpiryDateApplicationMinusToday;
  const OnDemandApplication = row.OnDemandApplication;

  const DescriptionGuarantee = row.DescriptionGuarantee;
  const GuaranteeNoGuarantee = row.GuaranteeNoGuarantee;
  let IssuedDateGuarantee = row.IssuedDateGuarantee;
  const IssuedDateGuaranteeMinusToday = row.IssuedDateGuaranteeMinusToday;

  const IsPersonBeneficiary = row.IsPersonBeneficiary;
  const BeneficiaryDataBeneficiary = row.BeneficiaryDataBeneficiary;
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

  const OrdererDebtor = row.OrdererDebtor;
  const OrganisationNumberDebtor = row.OrganisationNumberDebtor;
  const AddressDebtor = row.AddressDebtor;
  const PostcodeDebtor = row.PostcodeDebtor;
  const CityDebtor = row.CityDebtor;
  const OtherInformationDebtor = row.OtherInformationDebtor;
  //#endregion

  let temp = true;
  await globalPageObject.waitForProgressBarLoaded_v2();
  //#region  1. Application
  if (ExpiryDateApplicationMinusToday) {
    ExpiryDateApplication = getDate(ExpiryDateApplicationMinusToday);
  } else if (ExpiryDateApplication) {
    temp = await applicationFormBasicInformation.inputExpiryDateApplication(ExpiryDateApplication);
    logFailTestcase(temp, "Input ExpiryDateApplication failed!");
  }

  if (OnDemandApplication && (OnDemandApplication.localeCompare("Yes") === 0 || OnDemandApplication.localeCompare("yes") === 0)) {
    if (ValidateDefaultAnswerCheckboxOnDemandApplication && ValidateDefaultAnswerCheckboxOnDemandApplication.localeCompare("Yes") === 0) {
      temp = await applicationFormBasicInformation.isOnDemandChecked();
      logFailTestcase(temp, "Assert On Demand Checked tenant failed!");
    }
    if (!await applicationFormBasicInformation.isOnDemandChecked()) {
      temp = await applicationFormBasicInformation.checkOnDemandApplication();
      logFailTestcase(temp, "Check On Demand failed!");
    }
  } else if (OnDemandApplication && (OnDemandApplication.localeCompare("No") === 0 || OnDemandApplication.localeCompare("no") === 0)) {
    if (ValidateDefaultAnswerCheckbox && ValidateDefaultAnswerCheckbox.localeCompare("Yes") === 0) {
      temp = await applicationFormBasicInformation.isOnDemandChecked();
      logFailTestcase(temp, "Assert On Demand Checked tenant failed!");
    }
    if (await applicationFormBasicInformation.isOnDemandChecked()) {
      temp = await applicationFormBasicInformation.checkOnDemandApplication();
      logFailTestcase(temp, "Check On Demand failed!");
    }
  }
  //#endregion

  //#region 2. Guarantee
  if (DescriptionGuarantee) {
    temp = await applicationFormBasicInformation.inputDescriptionGuarantee(DescriptionGuarantee);
    logFailTestcase(temp, "Input DescriptionGuarantee failed!");
  }
  if (GuaranteeNoGuarantee) {
    temp = await applicationFormBasicInformation.inputGuaranteeNoGuarantee(GuaranteeNoGuarantee);
    logFailTestcase(temp, "Input GuaranteeNoGuarantee failed!");
  }
  if (IssuedDateGuaranteeMinusToday) {
    IssuedDateGuarantee = getDate(IssuedDateGuaranteeMinusToday);
  }
  else if (IssuedDateGuarantee) {
    temp = await applicationFormBasicInformation.inputIssuedDateGuarantee(IssuedDateGuarantee);
    logFailTestcase(temp, "Input IssuedDateGuarantee failed!");
  }
  //#endregion

  //#region 3. Beneficiary
  if (IsPersonBeneficiary && (IsPersonBeneficiary.localeCompare("Yes") === 0 || IsPersonBeneficiary.localeCompare("yes") === 0)) {
    if (ValidateDefaultAnswerCheckbox && (ValidateDefaultAnswerCheckbox.localeCompare("Yes") === 0 || ValidateDefaultAnswerCheckbox.localeCompare("yes")) === 0) {
      temp = await applicationFormBasicInformation.IsPersonBeneficiaryChecked();
      logFailTestcase(temp, "assert default Is Person Beneficiary Checked failed!");
    }
    if (!await applicationFormBasicInformation.IsPersonBeneficiaryChecked()) {
      temp = await applicationFormBasicInformation.checkIsPersonBeneficiary();
      logFailTestcase(temp, "Check IsPerson failed!");
    }
  } else if (IsPersonBeneficiary && (IsPersonBeneficiary.localeCompare("No") === 0 || IsPersonBeneficiary.localeCompare("no") === 0)) {
    if (ValidateDefaultAnswerCheckbox && (ValidateDefaultAnswerCheckbox.localeCompare("Yes") === 0 || ValidateDefaultAnswerCheckbox.localeCompare("yes") === 0)) {
      temp = await applicationFormBasicInformation.IsPersonBeneficiaryChecked();
      logFailTestcase(temp, "assert default Is Person Beneficiary Checked failed!");
    }
    if (await applicationFormBasicInformation.IsPersonBeneficiaryChecked()) {
      temp = await applicationFormBasicInformation.checkIsPersonBeneficiary();
      logFailTestcase(temp, "Check IsPerson failed!");
    }
  }

  //When checked IsPerson Checkbox
  if (DateOfBirthBeneficiary) {
    temp = await applicationFormBasicInformation.inputDateOfBirthBeneficiary(DateOfBirthBeneficiary);
    logFailTestcase(temp, "Input DateOfBirthBeneficiary failed!");
  }

  //When unchecked IsPerson checkbox
  if (OrgNrBeneficiary) {
    temp = await applicationFormBasicInformation.inputOrgNrBeneficiary(OrgNrBeneficiary);
    logFailTestcase(temp, "Input OrgNrBeneficiary failed!");
  }

  if (BeneficiaryDataBeneficiary) {
    const docs = BeneficiaryDataBeneficiary.split(";");
    for (const doc of docs) {
      const temp2 = __dirname;
      let UploadDocuments: string = "";

      if (!(__dirname.includes("jenkins") && !__dirname.includes(".jenkins"))){
        logInfoMessage("Runing on local...");
        UploadDocuments = __dirname.substring(0, __dirname.lastIndexOf("pegasus-core-aut-crm") + "pegasus-core-aut-crm".length) + "\\" + doc.replace(/\//g, "\\");
      }
      else {
        logInfoMessage("Running on jenkins...");
        let projectName = "Test-Framework";
        if (__dirname.includes("Atlas-Test-Framework")) {
          projectName = "Atlas-Test-Framework";
        }
        if (__dirname.includes("hogse-test-framework")) {
          projectName = "hogse-test-framework";
        }
        UploadDocuments = __dirname.substring(0, __dirname.lastIndexOf(projectName) + projectName.length) + "/" + doc.replace(/\\/g, "/");
      }
      logInfoMessage("\tFinal file path:");
      logInfoMessage("\t\t" + UploadDocuments);

      logInfoMessage("\tDirname:");
      logInfoMessage("\t\t" + __dirname);

      temp = await applicationFormBasicInformation.inputBeneficiaryData(UploadDocuments);
      logFailTestcase(temp, "Input BeneficiaryData failed!");
    }
  }
  if (BeneficiaryBeneficiary) {
    temp = await applicationFormBasicInformation.inputBeneficiaryBeneficiary(BeneficiaryBeneficiary);
    logFailTestcase(temp, "Input BeneficiaryBeneficiary failed!");
  }

  if (AddressBeneficiary) {
    temp = await applicationFormBasicInformation.inputAddressBeneficiary(AddressBeneficiary);
    logFailTestcase(temp, "Input AddressBeneficiary failed!");
  }
  if (PostcodeBeneficiary) {
    temp = await applicationFormBasicInformation.inputPostcodeBeneficiary(PostcodeBeneficiary);
    logFailTestcase(temp, "Input PostcodeBeneficiary failed!");
  }
  if (CityBeneficiary) {
    temp = await applicationFormBasicInformation.inputCityBeneficiary(CityBeneficiary);
    logFailTestcase(temp, "Input CityBeneficiary failed!");
  }
  if (OtherInformationBeneficiary) {
    temp = await applicationFormBasicInformation.inputOtherInformationBeneficiary(OtherInformationBeneficiary);
    logFailTestcase(temp, "Input OtherInformationBeneficiary failed!");
  }
  //#endregion 

  //#region 4. Beneficiary 2
  if (DateOfBirth2Beneficiary) {
    temp = await applicationFormBasicInformation.inputDateOfBirth2Beneficiary(DateOfBirth2Beneficiary);
    logFailTestcase(temp, "Input DateOfBirth2Beneficiary failed!");
  }

  if (OrgNr2Beneficiary) {
    temp = await applicationFormBasicInformation.inputOrgNr2Beneficiary(OrgNr2Beneficiary);
    logFailTestcase(temp, "Input OrgNr2Beneficiary failed!");
  }

  if (Beneficiary2Beneficiary) {
    temp = await applicationFormBasicInformation.inputBeneficiary2Beneficiary(Beneficiary2Beneficiary);
    logFailTestcase(temp, "Input Beneficiary2Beneficiary failed!");
  }

  if (Address2Beneficiary) {
    temp = await applicationFormBasicInformation.inputAddress2Beneficiary(Address2Beneficiary);
    logFailTestcase(temp, "Input Address2Beneficiary failed!");
  }
  if (Postcode2Beneficiary) {
    temp = await applicationFormBasicInformation.inputPostcode2Beneficiary(Postcode2Beneficiary);
    logFailTestcase(temp, "Input Postcode2Beneficiary failed!");
  }
  if (City2Beneficiary) {
    temp = await applicationFormBasicInformation.inputCity2Beneficiary(City2Beneficiary);
    logFailTestcase(temp, "Input City2Beneficiary failed!");
  }
  if (OtherInformation2Beneficiary) {
    temp = await applicationFormBasicInformation.inputOtherInformation2Beneficiary(OtherInformation2Beneficiary);
    logFailTestcase(temp, "Input OtherInformation2Beneficiary failed!");
  }
  //#endregion

  //#region 5. Debtor
  if (OrdererDebtor) {
    temp = await applicationFormBasicInformation.inputOrdererDebtor(OrdererDebtor);
    logFailTestcase(temp, "Input OrdererDebtor failed!");
  }
  if (OrganisationNumberDebtor) {
    temp = await applicationFormBasicInformation.inputOrganisationNumberDebtor(OrganisationNumberDebtor);
    logFailTestcase(temp, "Input OrganisationNumberDebtor failed!");
  }
  if (AddressDebtor) {
    temp = await applicationFormBasicInformation.inputAddressDebtor(AddressDebtor);
    logFailTestcase(temp, "Input AddressDebtor failed!");
  }
  if (PostcodeDebtor) {
    temp = await applicationFormBasicInformation.inputPostcodeDebtor(PostcodeDebtor);
    logFailTestcase(temp, "Input PostcodeDebtor failed!");
  }
  if (CityDebtor) {
    temp = await applicationFormBasicInformation.inputCityDebtor(CityDebtor);
    logFailTestcase(temp, "Input CityDebtor failed!");
  }
  if (OtherInformationDebtor) {
    temp = await applicationFormBasicInformation.inputOtherInformationDebtor(OtherInformationDebtor);
    logFailTestcase(temp, "Input OtherInformationDebtor failed!");
  }
  //#endregion
});

When("User inputs valid data into Create Application form at section Contract and Guarantee {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];

  //#region Declare variables
  const Type = row.Type;

  //#region Declare variables
  //#region 1. Underlying contract
  const TotalContractAmountUnderlying = row.TotalContractAmountUnderlying;
  const ContractReferenceUnderlying = row.ContractReferenceUnderlying;
  let ContractStartDateUnderlying = row.ContractStartDateUnderlying;//new hogs
  let ContractStartDateUnderlyingMinusToday = row.ContractStartDateUnderlyingMinusToday;//new hogs
  const DateForSignedContract = row.DateForSignedContract; //new
  const DateForSignedContractMinusToday = row.DateForSignedContractMinusToday; //new
  const UnderlyingContractDocsUnderlying = row.UnderlyingContractDocsUnderlying;
  const GeneralProvisionsUnderlying = row.GeneralProvisionsUnderlying; // hogse
  const ProjectUnderlying = row.ProjectUnderlying;
  const ProjectNameUnderlying = row.ProjectNameUnderlying; //new
  const ProjectAddressUnderlying = row.ProjectAddressUnderlying; //new
  const ProjectDescriptionUnderlying = row.ProjectDescriptionUnderlying; //new
  const ProjectNumberUnderlying = row.ProjectNumberUnderlying;//new hogs
  const ContractCommitmentUnderlying = row.ContractCommitmentUnderlying;
  const GardsnummerUnderlying = row.GardsnummerUnderlying;
  const BruksnummerUnderlying = row.BruksnummerUnderlying;
  const KommuneUnderlying = row.KommuneUnderlying;
  //#endregion

  //#region Guarantee
  // First Phase
  const PhaseName1Guarantee = row.PhaseName1Guarantee;
  let PeriodStartGuarantee = row.PeriodStartGuarantee;
  let PeriodEndGuarantee = row.PeriodEndGuarantee;
  const StartDateMinusToday = row.StartDateMinusToday;
  const EndDateMinusStartDate = row.EndDateMinusStartDate;

  const GuaranteeAmountGuarantee = row.GuaranteeAmountGuarantee;
  const GuaranteeRateGuarantee = row.GuaranteeRateGuarantee;
  const AmountInWordGuarantee = row.AmountInWordGuarantee;
  const CommentGuarantee = row.CommentGuarantee;

  // Second Phase
  const PhaseName2Guarantee = row.PhaseName2Guarantee;
  let PeriodStartGuaranteePhase2 = row.PeriodStartGuaranteePhase2;
  let PeriodEndGuaranteePhase2 = row.PeriodEndGuaranteePhase2;
  let StartDate2MinusEndDate = row.StartDate2MinusEndDate;
  let EndDate2MinusStartDate2 = row.EndDate2MinusStartDate2;

  const RenewGuaranteeGuarantee = row.RenewGuaranteeGuarantee;
  const ValidateDefaultAnswerCheckbox = row.ValidateDefaultAnswerCheckbox;
  let GuaranteeAmountGuaranteePhase2 = row.GuaranteeAmountGuaranteePhase2;
  let GuaranteeRateGuaranteePhase2 = row.GuaranteeRateGuaranteePhase2;
  let CommentGuaranteePhase2 = row.CommentGuaranteePhase2;
  //#endregion

  //#region Project Information
  const NumberOfUnitsProjectInformation = row.NumberOfUnitsProjectInformation;
  const DateForCostEstimateProjectInformationMinusToday = row.DateForCostEstimateProjectInformationMinusToday;
  //#endregion


  //#region Input forms
  let temp = true;
  await globalPageObject.waitForProgressBarLoaded_v2();

  //#region Contact and Guarantee
  //#region 1. Underlying contract
  if (TotalContractAmountUnderlying) {
    temp = await applicationFormContractAndGuarantee.inputTotalContractAmountUnderlying(TotalContractAmountUnderlying);
    logFailTestcase(temp, "Input TotalContractAmountUnderlying failed!");
  }
  if (ContractReferenceUnderlying) {
    temp = await applicationFormContractAndGuarantee.inputContractReferenceUnderlying(ContractReferenceUnderlying);
    logFailTestcase(temp, "Input ContractReferenceUnderlying failed!");
  }
  if (ContractStartDateUnderlyingMinusToday) {
    ContractStartDateUnderlying = getDate(ContractStartDateUnderlyingMinusToday);
    temp = await applicationFormContractAndGuarantee.inputContractStartDateUnderlying(ContractStartDateUnderlying);
    logFailTestcase(temp, "Input ContractStartDateUnderlying failed!");
  }
  else if (ContractStartDateUnderlying && ContractStartDateUnderlying.localeCompare("Yes") === 0) {
    temp = await applicationFormContractAndGuarantee.inputContractStartDateUnderlying(getDate(0));
    logFailTestcase(temp, "Input ContractStartDateUnderlying failed!");
  }
  if (DateForSignedContract) {
    temp = await applicationFormContractAndGuarantee.inputDateForSignedContractUnderlying(DateForSignedContract);
    logFailTestcase(temp, "Input DateForSignedContract failed!");
  }
  if (DateForSignedContractMinusToday) {
    temp = await applicationFormContractAndGuarantee.inputDateForSignedContractUnderlying(getDate(DateForSignedContractMinusToday));
    logFailTestcase(temp, "Input DateForSignedContractMinusToday failed!");
  }
  if (UnderlyingContractDocsUnderlying) {
    const docs = UnderlyingContractDocsUnderlying.split(";");
    for (const doc of docs) {
      const temp2 = __dirname;
      let UploadDocuments: string = "";

      if (!(__dirname.includes("jenkins") && !__dirname.includes(".jenkins"))){
        logInfoMessage("Runing on local...");
        UploadDocuments = __dirname.substring(0, __dirname.lastIndexOf("pegasus-core-aut-crm") + "pegasus-core-aut-crm".length) + "\\" + doc.replace(/\//g, "\\");
      }
      else {
        logInfoMessage("Running on jenkins...");
        let projectName = "Test-Framework";
        if (__dirname.includes("Atlas-Test-Framework")) {
          projectName = "Atlas-Test-Framework";
        }
        if (__dirname.includes("hogse-test-framework")) {
          projectName = "hogse-test-framework";
        }
        UploadDocuments = __dirname.substring(0, __dirname.lastIndexOf(projectName) + projectName.length) + "/" + doc.replace(/\\/g, "/");
      }
      logInfoMessage("\tFinal file path:");
      logInfoMessage("\t\t" + UploadDocuments);

      logInfoMessage("\tDirname:");
      logInfoMessage("\t\t" + __dirname);

      temp = await applicationFormContractAndGuarantee.inputUnderlyingContractDocUnderlying(UploadDocuments);
      logFailTestcase(temp, "Input UnderlyingContractDocsUnderlying failed!");
    }
  }
  if (GeneralProvisionsUnderlying) {
    temp = await applicationFormContractAndGuarantee.inputGeneralProvisionsUnderlying(GeneralProvisionsUnderlying);
    logFailTestcase(temp, "Input GeneralProvisionsUnderlying failed!");
  }

  if (ProjectUnderlying) {
    temp = await applicationFormContractAndGuarantee.inputProjectUnderlying(ProjectUnderlying);
    logFailTestcase(temp, "Input ProjectUnderlying failed!");
  }
  if (ProjectNameUnderlying) {
    temp = await applicationFormContractAndGuarantee.inputProjectNameUnderlying(ProjectNameUnderlying);
    logFailTestcase(temp, "Input ProjectNameUnderlying failed!");
  }
  if (ProjectAddressUnderlying) {
    temp = await applicationFormContractAndGuarantee.inputProjectAddressUnderlying(ProjectAddressUnderlying);
    logFailTestcase(temp, "Input ProjectAddressUnderlying failed!");
  }
  if (ProjectDescriptionUnderlying) {
    temp = await applicationFormContractAndGuarantee.inputProjectDescriptionUnderlying(ProjectDescriptionUnderlying);
    logFailTestcase(temp, "Input ProjectDescriptionUnderlying failed!");
  }
  if (ProjectNumberUnderlying) {
    temp = await applicationFormContractAndGuarantee.inputProjectNumberUnderlying(ProjectNumberUnderlying);
    logFailTestcase(temp, "Input ProjectNumberUnderlying failed!");
  }
  if (ContractCommitmentUnderlying) {
    temp = await applicationFormContractAndGuarantee.inputContractCommitmentUnderlying(ContractCommitmentUnderlying);
    logFailTestcase(temp, "Input ContractCommitmentUnderlying failed!");
  }
  if (GardsnummerUnderlying) {
    temp = await applicationFormContractAndGuarantee.inputGardsnummerUnderlying(GardsnummerUnderlying);
    logFailTestcase(temp, "Input GardsnummerUnderlying failed!");
  }
  if (BruksnummerUnderlying) {
    temp = await applicationFormContractAndGuarantee.inputBruksnummerUnderlying(BruksnummerUnderlying);
    logFailTestcase(temp, "Input BruksnummerUnderlying failed!");
  }
  if (KommuneUnderlying) {
    temp = await applicationFormContractAndGuarantee.inputKommuneUnderlying(KommuneUnderlying);
    logFailTestcase(temp, "Input KommuneUnderlying failed!");
  }
  //#endregion

  //#region 2. Guarantee
  //#region a. Start date and End date for test case Instalment
  if (StartDateMinusToday) {
    PeriodStartGuarantee = getDate(StartDateMinusToday);
    dataTestcase.push(new ValidateField("StartDate", 0, true, [PeriodStartGuarantee], []));
  }
  if (EndDateMinusStartDate) {
    PeriodEndGuarantee = addDate(PeriodStartGuarantee, EndDateMinusStartDate);
    dataTestcase.push(new ValidateField("EndDate", 0, true, [PeriodEndGuarantee], []));
  }
  if (StartDate2MinusEndDate) {
    PeriodStartGuaranteePhase2 = addDate(PeriodEndGuarantee, StartDate2MinusEndDate);
    dataTestcase.push(new ValidateField("StartDate2", 0, true, [PeriodStartGuaranteePhase2], []));
  }
  if (EndDate2MinusStartDate2) {
    PeriodEndGuaranteePhase2 = addDate(PeriodStartGuaranteePhase2, EndDate2MinusStartDate2);
    dataTestcase.push(new ValidateField("EndDate2", 0, true, [PeriodEndGuaranteePhase2], []));
  }
  //#endregion

  // Guarantee
  if (PhaseName1Guarantee) {
    temp = await applicationFormContractAndGuarantee.inputPhaseName1Guarantee(PhaseName1Guarantee);
    logFailTestcase(temp, "Input PhaseName1Guarantee failed!");
  }
  if (PeriodStartGuarantee) {
    temp = await applicationFormContractAndGuarantee.inputPeriodStartGuarantee(PeriodStartGuarantee);
    logFailTestcase(temp, "Input PeriodStartGuarantee failed!");
  }
  if (PeriodEndGuarantee) {
    temp = await applicationFormContractAndGuarantee.inputPeriodEndGuarantee(PeriodEndGuarantee);
    logFailTestcase(temp, "Input PeriodEndGuarantee failed!");
  }
  if (GuaranteeAmountGuarantee) {
    temp = await applicationFormContractAndGuarantee.inputGuaranteeAmountGuarantee(GuaranteeAmountGuarantee);
    logFailTestcase(temp, "Input GuaranteeAmountGuarantee failed!");
  }
  if (GuaranteeRateGuarantee) {
    temp = await applicationFormContractAndGuarantee.inputGuaranteeRateGuarantee(GuaranteeRateGuarantee);
    logFailTestcase(temp, "Input GuaranteeRateGuarantee failed!");
  }

  if (AmountInWordGuarantee) {
    temp = await applicationFormContractAndGuarantee.inputAmountInWordGuarantee(AmountInWordGuarantee);
    logFailTestcase(temp, "Input AmountInWordGuarantee failed!");
  }

  if (CommentGuarantee) {
    temp = await applicationFormContractAndGuarantee.inputCommentGuarantee(CommentGuarantee);
    logFailTestcase(temp, "Input CommentGuarantee failed!");
  }

  if (Type && Type.localeCompare("Two Phases") === 0) {
    if (PhaseName2Guarantee) {
      temp = await applicationFormContractAndGuarantee.inputPhaseName2Guarantee(PhaseName2Guarantee);
      logFailTestcase(temp, "Input PhaseName2Guarantee failed!");
    }
    if (PeriodStartGuaranteePhase2) {
      temp = await applicationFormContractAndGuarantee.inputPeriodStartGuaranteePhase2(PeriodStartGuaranteePhase2);
      logFailTestcase(temp, "Input PeriodStartGuaranteePhase2 failed!");
    }
    if (PeriodEndGuaranteePhase2) {
      temp = await applicationFormContractAndGuarantee.inputPeriodEndGuaranteePhase2(PeriodEndGuaranteePhase2);
      logFailTestcase(temp, "Input PeriodEndGuaranteePhase2 failed!");
    }
    if (GuaranteeAmountGuaranteePhase2) {
      temp = await applicationFormContractAndGuarantee.inputGuaranteeAmountGuaranteePhase2(GuaranteeAmountGuaranteePhase2);
      logFailTestcase(temp, "Input GuaranteeAmountGuaranteePhase2 failed!");
    }
    if (GuaranteeRateGuaranteePhase2) {
      temp = await applicationFormContractAndGuarantee.inputGuaranteeRateGuaranteePhase2(GuaranteeRateGuaranteePhase2);
      logFailTestcase(temp, "Input GuaranteeRateGuaranteePhase2 failed!");
    }
    if (CommentGuaranteePhase2) {
      temp = await applicationFormContractAndGuarantee.inputCommentGuaranteePhase2(CommentGuaranteePhase2);
      logFailTestcase(temp, "Input CommentGuaranteePhase2 failed!");
    }
  }

  if (RenewGuaranteeGuarantee && (RenewGuaranteeGuarantee.localeCompare("Yes") === 0 || RenewGuaranteeGuarantee.localeCompare("yes") === 0)) {
    if (ValidateDefaultAnswerCheckbox && ValidateDefaultAnswerCheckbox.localeCompare("Yes") === 0) {
      temp = await applicationFormContractAndGuarantee.isRenewGuaranteeChecked();
      logFailTestcase(temp, "assert Renew Guarantee Checked tenant failed! ")
    }
    if (!await applicationFormContractAndGuarantee.isRenewGuaranteeChecked()) {
      temp = await applicationFormContractAndGuarantee.checkRenewGuaranteeGuarantee();
      logFailTestcase(temp, "Check Renew Guarantee failed!");
    }

    // Input vào giá trị period start date là ngày này năm trước, period end date sẽ tự động tính là ngày hôm nay
    if (row.IsBackDatedGurantee && row.IsBackDatedGurantee.localeCompare("Yes") === 0) {
      let periodStart = getDate(-364);
      dataTestcase.push(new ValidateField("PeriodStartBackDated", 1, true, [periodStart], []));
      dataTestcase.push(new ValidateField("PeriodEndBackDated", 1, true, [getDate()], []));
      temp = await applicationFormContractAndGuarantee.inputPeriodStartGuarantee(periodStart)
      logFailTestcase(temp, "Input period start backdated failed!");
    }
  } else if (RenewGuaranteeGuarantee && (RenewGuaranteeGuarantee.localeCompare("No") === 0 || RenewGuaranteeGuarantee.localeCompare("no") === 0)) {
    if (ValidateDefaultAnswerCheckbox && ValidateDefaultAnswerCheckbox.localeCompare("Yes") === 0) {
      temp = await applicationFormContractAndGuarantee.isRenewGuaranteeChecked();
      logFailTestcase(temp, "assert Renew Guarantee Checked failed! ")
    }
    if (await applicationFormContractAndGuarantee.isRenewGuaranteeChecked()) {
      temp = await applicationFormContractAndGuarantee.checkRenewGuaranteeGuarantee();
      logFailTestcase(temp, "Check Renew Guarantee failed!");
    }
  }
  //#endregion

  //#region Project Information
  if (NumberOfUnitsProjectInformation) {
    temp = await applicationFormContractAndGuarantee.inputNumberOfUnitsProjectInformation(NumberOfUnitsProjectInformation);
    logFailTestcase(temp, "Input NumberOfUnitsProjectInformation failed!");
  }
  if (DateForCostEstimateProjectInformationMinusToday) {
    const DateForCostEstimateProjectInformation = getDate(DateForCostEstimateProjectInformationMinusToday);
    temp = await applicationFormContractAndGuarantee.inputDateForCostEstimateProjectInformation(DateForCostEstimateProjectInformation);
    logFailTestcase(temp, "Input DateForCostEstimateProjectInformation failed!");
  }
  const rowsTemp = loader(convertPathFileDataToDataRegression(filename));

  for (let i = 0; i < rowsTemp.length && rowsTemp[i].StreetNameProjectInformation && rowsTemp[i].HouseNumberProjectInformation; i++) {
    logInfoMessage(`Add Street name and House Number at line ${i + 1}`);
    temp = await applicationFormContractAndGuarantee.pressAddButtonProjectInformation();
    logFailTestcase(temp, "Press Add button Project Information failed!");

    temp = await applicationFormContractAndGuarantee.inputStreetNameProjectInformation(rowsTemp[i].StreetNameProjectInformation, i + 1);
    logFailTestcase(temp, "Input Street name failed!");

    temp = await applicationFormContractAndGuarantee.inputHouseNumberProjectInformation(rowsTemp[i].HouseNumberProjectInformation, i + 1);
    logFailTestcase(temp, "Input House name failed!");
  }
  //#endregion
});

When("User inputs valid data into Create Application form at section Payment {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  //#region Declare variables
  const EstablishmentFeeOtherFee = row.EstablishmentFeeOtherFee;
  //#endregion


  //#region Input forms
  let temp = true;
  await globalPageObject.waitForProgressBarLoaded_v2();


  //#region Payment
  // Guarantee fee

  // Other fee
  if (EstablishmentFeeOtherFee) {
    temp = await applicationFormPayment.inputEstablishmentFeeOther(EstablishmentFeeOtherFee);
    logFailTestcase(temp, "Input EstablishmentFeeOtherFee failed!");
  }
  //#endregion
});

When("User inputs valid data into Create Application form at section Guarantor and Third party {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];

  //#region Declare variables
  //GUARANTOR AND THIRD PARTY
  const GuarantorNameGuarantor = row.GuarantorNameGuarantor;
  const VisitingAddressGuarantor = row.VisitingAddressGuarantor;
  const PostcodeGuarantor = row.PostcodeGuarantor;
  const CityGuarantor = row.CityGuarantor;
  const GuaranteeIssuerGuarantor = row.GuaranteeIssuerGuarantor;
  const OnBehalfOfTheGuarantorGuarantor = row.OnBehalfOfTheGuarantorGuarantor;
  const FirmsNoGuarantor = row.FirmsNoGuarantor;
  const PostAddressGuarantor = row.PostAddressGuarantor;
  const PostZipCodeGuarantor = row.PostZipCodeGuarantor;
  const PostCityGuarantor = row.PostCityGuarantor;
  const EmailGuarantor = row.EmailGuarantor;
  const PhoneNumberGuarantor = row.PhoneNumberGuarantor;


  const CompanyNameThirdParty = row.CompanyNameThirdParty;
  const AddressThirdParty = row.AddressThirdParty;
  const PostcodeThirdParty = row.PostcodeThirdParty;
  const CityThirdParty = row.CityThirdParty;
  const PhoneNumberThirdParty = row.PhoneNumberThirdParty;
  const FaxThirdParty = row.FaxThirdParty;
  const EmailThirdParty = row.EmailThirdParty;
  const WebsiteThirdParty = row.WebsiteThirdParty;
  //#endregion


  //#region Input forms
  let temp = true;
  await globalPageObject.waitForProgressBarLoaded_v2();

  //#region Guarantor and Third Party
  // Guarantor
  if (GuarantorNameGuarantor) {
    temp = await applicationFormGuarantorAndThirdParty.inputGuarantorNameGuarantor(GuarantorNameGuarantor);
    logFailTestcase(temp, "Input GuarantorNameGuarantor failed!");
  }
  if (VisitingAddressGuarantor) {
    temp = await applicationFormGuarantorAndThirdParty.inputVisitingAddressGuarantor(VisitingAddressGuarantor);
    logFailTestcase(temp, "Input VisitingAddressGuarantor failed!");
  }
  if (PostcodeGuarantor) {
    temp = await applicationFormGuarantorAndThirdParty.inputPostcodeGuarantor(PostcodeGuarantor);
    logFailTestcase(temp, "Input PostcodeGuarantor failed!");
  }
  if (CityGuarantor) {
    temp = await applicationFormGuarantorAndThirdParty.inputCityGuarantor(CityGuarantor);
    logFailTestcase(temp, "Input CityGuarantor failed!");
  }
  if (GuaranteeIssuerGuarantor) {
    temp = await applicationFormGuarantorAndThirdParty.inputGuaranteeIssuerGuarantor(GuaranteeIssuerGuarantor);
    logFailTestcase(temp, "Input GuaranteeIssuerGuarantor failed!");
  }
  if (OnBehalfOfTheGuarantorGuarantor) {
    temp = await applicationFormGuarantorAndThirdParty.inputOnBehalfOfTheGuarantorGuarantor(OnBehalfOfTheGuarantorGuarantor);
    logFailTestcase(temp, "Input OnBehalfOfTheGuarantorGuarantor failed!");
  }
  if (FirmsNoGuarantor) {
    temp = await applicationFormGuarantorAndThirdParty.inputFirmsNoGuarantor(FirmsNoGuarantor);
    logFailTestcase(temp, "Input FirmsNoGuarantor failed!");
  }
  if (PostAddressGuarantor) {
    temp = await applicationFormGuarantorAndThirdParty.inputPostAddressGuarantor(PostAddressGuarantor);
    logFailTestcase(temp, "Input PostAddressGuarantor failed!");
  }
  if (PostZipCodeGuarantor) {
    temp = await applicationFormGuarantorAndThirdParty.inputPostZipCodeGuarantor(PostZipCodeGuarantor);
    logFailTestcase(temp, "Input PostZipCodeGuarantor failed!");
  }
  if (PostCityGuarantor) {
    temp = await applicationFormGuarantorAndThirdParty.inputPostCityGuarantor(PostCityGuarantor);
    logFailTestcase(temp, "Input PostCityGuarantor failed!");
  }
  if (EmailGuarantor) {
    temp = await applicationFormGuarantorAndThirdParty.inputEmailGuarantor(EmailGuarantor);
    logFailTestcase(temp, "Input EmailGuarantor failed!");
  }
  if (PhoneNumberGuarantor) {
    temp = await applicationFormGuarantorAndThirdParty.inputPhoneNumberGuarantor(PhoneNumberGuarantor);
    logFailTestcase(temp, "Input PhoneNumberGuarantor failed!");
  }

  // Third party
  if (CompanyNameThirdParty) {
    temp = await applicationFormGuarantorAndThirdParty.inputCompanyNameThirdParty(CompanyNameThirdParty);
    logFailTestcase(temp, "Input CompanyNameThirdParty failed!");
  }
  if (AddressThirdParty) {
    temp = await applicationFormGuarantorAndThirdParty.inputAddressThirdParty(AddressThirdParty);
    logFailTestcase(temp, "Input AddressThirdParty failed!");
  }
  if (PostcodeThirdParty) {
    temp = await applicationFormGuarantorAndThirdParty.inputPostcodeThirdParty(PostcodeThirdParty);
    logFailTestcase(temp, "Input PostcodeThirdParty failed!");
  }
  if (CityThirdParty) {
    temp = await applicationFormGuarantorAndThirdParty.inputCityThirdParty(CityThirdParty);
    logFailTestcase(temp, "Input CityThirdParty failed!");
  }
  if (PhoneNumberThirdParty) {
    temp = await applicationFormGuarantorAndThirdParty.inputPhoneNumberThirdParty(PhoneNumberThirdParty);
    logFailTestcase(temp, "Input PhoneNumberThirdParty failed!");
  }
  if (FaxThirdParty) {
    temp = await applicationFormGuarantorAndThirdParty.inputFaxThirdParty(FaxThirdParty);
    logFailTestcase(temp, "Input FaxThirdParty failed!");
  }
  if (EmailThirdParty) {
    temp = await applicationFormGuarantorAndThirdParty.inputEmailThirdParty(EmailThirdParty);
    logFailTestcase(temp, "Input EmailThirdParty failed!");
  }
  if (WebsiteThirdParty) {
    temp = await applicationFormGuarantorAndThirdParty.inputWebsiteThirdParty(WebsiteThirdParty);
    logFailTestcase(temp, "Input WebsiteThirdParty failed!");
  }
  //#endregion
  //#endregion
});
//#endregion


Then("System shows correct information at create application form section basic information {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  await globalPageObject.waitForSeconds(3000);
  //Section Application
  let ExpiryDateApplication = addMonth(getDate(), 1);
  let FrameAgreementNumberApplication = "";
  for (const iterator of dataTestcase) {
    if (iterator.nameField.localeCompare("Frame Agmt No") === 0) {
      FrameAgreementNumberApplication = iterator.message[0];
    }
  }
  if (!FrameAgreementNumberApplication) {
    FrameAgreementNumberApplication = getValueDataOfDataTestExecution("Frame Agmt No");
  }
  console.log(dataTestExecution);

  const ProductApplication = row.ProductApplication;

  //section Guarantee
  const DescriptionGuarantee = row.DescriptionGuarantee;
  const GuaranteeTypeGuarantee = row.GuaranteeTypeGuarantee;
  const IssuedDateGuarantee = getDate();

  //section Beneficiary
  const IsPersonBeneficiary = row.IsPersonBeneficiary;
  const ValidateDefaultAnswerCheckbox = row.ValidateDefaultAnswerCheckbox;
  const BeneficiaryBeneficiary = row.BeneficiaryBeneficiary;
  const OrgNrBeneficiary = row.OrgNrBeneficiary;
  const AddressBeneficiary = row.AddressBeneficiary;
  const PostcodeBeneficiary = row.PostcodeBeneficiary;
  const CityBeneficiary = row.CityBeneficiary;
  const OtherInformationBeneficiary = row.OtherInformationBeneficiary;

  //section Beneficiary 2
  const Beneficiary2Beneficiary = row.Beneficiary2Beneficiary;
  const OrgNr2Beneficiary = row.OrgNr2Beneficiary;
  const Address2Beneficiary = row.Address2Beneficiary;
  const Postcode2Beneficiary = row.Postcode2Beneficiary;
  const City2Beneficiary = row.City2Beneficiary;
  const OtherInformation2Beneficiary = row.OtherInformation2Beneficiary;

  //section Debtor
  const OrdererDebtor = row.OrdererDebtor;
  const OrganisationNumberDebtor = row.OrganisationNumberDebtor;
  const AddressDebtor = row.AddressDebtor;
  const PostcodeDebtor = row.PostcodeDebtor;
  const CityDebtor = row.CityDebtor;
  const OtherInformationDebtor = row.OtherInformationDebtor;


  let temp = true;
  //#region validate value
  //Section Application
  if (ExpiryDateApplication) {
    temp = await applicationFormBasicInformation.validateExpiryDateApplication(ExpiryDateApplication);
    logFailTestcase(temp, 'Validate ExpiryDateApplication value failed!');
  }
  if (FrameAgreementNumberApplication) {
    temp = await applicationFormBasicInformation.validateFrameAgreementNumberApplication(FrameAgreementNumberApplication);
    logFailTestcase(temp, 'Validate FrameAgreementNumberApplication value failed!');
  }
  if (ProductApplication) {
    temp = await applicationFormBasicInformation.validateProductApplication(ProductApplication);
    logFailTestcase(temp, 'Validate ProductApplication value failed!');
  }
  //section Guarantee
  if (DescriptionGuarantee) {
    temp = await applicationFormBasicInformation.validateDescriptionGuarantee(DescriptionGuarantee);
    logFailTestcase(temp, 'Validate DescriptionGuarantee value failed!');
  }
  if (GuaranteeTypeGuarantee) {
    temp = await applicationFormBasicInformation.validateGuaranteeTypeGuarantee(GuaranteeTypeGuarantee);
    logFailTestcase(temp, 'Validate GuaranteeTypeGuarantee value failed!');
  }
  if (IssuedDateGuarantee) {
    temp = await applicationFormBasicInformation.validateIssuedDateGuarantee(IssuedDateGuarantee);
    logFailTestcase(temp, 'Validate IssuedDateGuarantee value failed!');
  }
  //section beneficiary
  if (IsPersonBeneficiary && (IsPersonBeneficiary.localeCompare("Yes") === 0 || IsPersonBeneficiary.localeCompare("yes") === 0)) {
    if (ValidateDefaultAnswerCheckbox && (ValidateDefaultAnswerCheckbox.localeCompare("Yes") === 0 || ValidateDefaultAnswerCheckbox.localeCompare("yes")) === 0) {
      temp = await applicationFormBasicInformation.IsPersonBeneficiaryChecked();
      logFailTestcase(temp, "assert default Is Person Beneficiary Checked failed!");
    }
    if (!await applicationFormBasicInformation.IsPersonBeneficiaryChecked()) {
      temp = await applicationFormBasicInformation.checkIsPersonBeneficiary();
      logFailTestcase(temp, "Check IsPerson failed!");
    }
  } else if (IsPersonBeneficiary && (IsPersonBeneficiary.localeCompare("No") === 0 || IsPersonBeneficiary.localeCompare("no") === 0)) {
    if (ValidateDefaultAnswerCheckbox && (ValidateDefaultAnswerCheckbox.localeCompare("Yes") === 0 || ValidateDefaultAnswerCheckbox.localeCompare("yes") === 0)) {
      temp = await applicationFormBasicInformation.IsPersonBeneficiaryChecked();
      logFailTestcase(temp, "assert default Is Person Beneficiary Checked failed!");
    }
    if (await applicationFormBasicInformation.IsPersonBeneficiaryChecked()) {
      temp = await applicationFormBasicInformation.checkIsPersonBeneficiary();
      logFailTestcase(temp, "Check IsPerson failed!");
    }
  }
  if (BeneficiaryBeneficiary) {
    temp = await applicationFormBasicInformation.validateBeneficiaryBeneficiary(BeneficiaryBeneficiary);
    logFailTestcase(temp, 'Validate BeneficiaryBeneficiary value failed!');
  }
  if (OrgNrBeneficiary) {
    temp = await applicationFormBasicInformation.validateOrgNrBeneficiary(OrgNrBeneficiary);
    logFailTestcase(temp, 'Validate OrgNrBeneficiary value failed!');
  }
  if (AddressBeneficiary) {
    temp = await applicationFormBasicInformation.validateAddressBeneficiary(AddressBeneficiary);
    logFailTestcase(temp, 'Validate AddressBeneficiary value failed!');
  }
  if (PostcodeBeneficiary) {
    temp = await applicationFormBasicInformation.validatePostcodeBeneficiary(PostcodeBeneficiary);
    logFailTestcase(temp, 'Validate PostcodeBeneficiary value failed!');
  }
  if (CityBeneficiary) {
    temp = await applicationFormBasicInformation.validateCityBeneficiary(CityBeneficiary);
    logFailTestcase(temp, 'Validate CityBeneficiary value failed!');
  }
  if (OtherInformationBeneficiary) {
    temp = await applicationFormBasicInformation.validateOtherInformationBeneficiary(OtherInformationBeneficiary);
    logFailTestcase(temp, 'Validate OtherInformationBeneficiary value failed!');
  }

  //section Beneficiary 2
  if (Beneficiary2Beneficiary) {
    temp = await applicationFormBasicInformation.validateBeneficiary2Beneficiary(Beneficiary2Beneficiary);
    logFailTestcase(temp, 'Validate Beneficiary2Beneficiary value failed!');
  }
  if (OrgNr2Beneficiary) {
    temp = await applicationFormBasicInformation.validateOrgNr2Beneficiary(OrgNr2Beneficiary);
    logFailTestcase(temp, 'Validate OrgNr2Beneficiary value failed!');
  }
  if (Address2Beneficiary) {
    temp = await applicationFormBasicInformation.validateAddress2Beneficiary(Address2Beneficiary);
    logFailTestcase(temp, 'Validate Address2Beneficiary value failed!');
  }
  if (Postcode2Beneficiary) {
    temp = await applicationFormBasicInformation.validatePostcode2Beneficiary(Postcode2Beneficiary);
    logFailTestcase(temp, 'Validate Postcode2Beneficiary value failed!');
  }
  if (City2Beneficiary) {
    temp = await applicationFormBasicInformation.validateCity2Beneficiary(City2Beneficiary);
    logFailTestcase(temp, 'Validate City2Beneficiary value failed!');
  }
  if (OtherInformation2Beneficiary) {
    temp = await applicationFormBasicInformation.validateOtherInformation2Beneficiary(OtherInformation2Beneficiary);
    logFailTestcase(temp, 'Validate OtherInformation2Beneficiary value failed!');
  }

  //section debtor
  if (OrdererDebtor) {
    temp = await applicationFormBasicInformation.validateOrdererDebtor(OrdererDebtor);
    logFailTestcase(temp, 'Validate OrdererDebtor value failed!');
  }
  if (OrganisationNumberDebtor) {
    temp = await applicationFormBasicInformation.validateOrganisationNumberDebtor(OrganisationNumberDebtor);
    logFailTestcase(temp, 'Validate OrganisationNumberDebtor value failed!');
  }
  if (AddressDebtor) {
    temp = await applicationFormBasicInformation.validateAddressDebtor(AddressDebtor);
    logFailTestcase(temp, 'Validate AddressDebtor value failed!');
  }
  if (PostcodeDebtor) {
    temp = await applicationFormBasicInformation.validatePostcodeDebtor(PostcodeDebtor);
    logFailTestcase(temp, 'Validate PostcodeDebtor value failed!');
  }
  if (CityDebtor) {
    temp = await applicationFormBasicInformation.validateCityDebtor(CityDebtor);
    logFailTestcase(temp, 'Validate CityDebtor value failed!');
  }
  if (OtherInformationDebtor) {
    temp = await applicationFormBasicInformation.validateOtherInformationDebtor(OtherInformationDebtor);
    logFailTestcase(temp, 'Validate OtherInformationDebtor value failed!');
  }


  //#endregion

});
Then("System shows correct information at create application form section contract and guarantee {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  //Section Underlying contract
  const TotalContractAmountUnderlying = row.TotalContractAmountUnderlying;
  const ContractNoUnderlying = row.ContractNoUnderlying;
  const ContractReferenceUnderlying = row.ContractReferenceUnderlying;
  const ContractStartDateMinusToday = row.ContractStartDateMinusToday;
  const DateForSignedContractMinusToday = row.DateForSignedContractMinusToday
  const UnderlyingContractDocsUnderlying = row.UnderlyingContractDocsUnderlying;
  const ProjectUnderlying = row.ProjectUnderlying
  const ProjectNameUnderlying = row.ProjectNameUnderlying
  const ProjectNumberUnderlying = row.ProjectNumberUnderlying
  const ProjectAddressUnderlying = row.ProjectAddressUnderlying
  const ProjectDescriptionUnderlying = row.ProjectDescriptionUnderlying
  const ContractCommitmentUnderlying = row.ContractCommitmentUnderlying
  const GardsnummerUnderlying = row.GardsnummerUnderlying
  const BruksnummerUnderlying = row.BruksnummerUnderlying
  const KommuneUnderlying = row.KommuneUnderlying

  //Section Guarantee
  const StartDateMinusToday = row.StartDateMinusToday
  const EndDateMinusStartDate = row.EndDateMinusStartDate
  const StartDate2MinusEndDate = row.StartDate2MinusEndDate
  const EndDate2MinusStartDate2 = row.EndDate2MinusStartDate2
  const GuaranteeAmountGuarantee = row.GuaranteeAmountGuarantee
  const GuaranteeRateGuarantee = row.GuaranteeRateGuarantee
  const GuaranteeAmountGuaranteePhase2 = row.GuaranteeAmountGuaranteePhase2
  const GuaranteeRateGuaranteePhase2 = row.GuaranteeRateGuaranteePhase2
  const CommentGuarantee = row.CommentGuarantee
  const CommentGuaranteePhase2 = row.CommentGuaranteePhase2

  let PeriodStartGuarantee = "";
  let PeriodEndGuarantee = "";
  let PeriodStartGuaranteePhase2 = "";
  let PeriodEndGuaranteePhase2 = "";

  if (StartDateMinusToday) {
    PeriodStartGuarantee = getDate(StartDateMinusToday);
    dataTestcase.push(new ValidateField("StartDate", 0, true, [PeriodStartGuarantee], []));
  }
  if (EndDateMinusStartDate) {
    PeriodEndGuarantee = addDate(PeriodStartGuarantee, EndDateMinusStartDate);
    dataTestcase.push(new ValidateField("EndDate", 0, true, [PeriodEndGuarantee], []));
  }
  if (StartDate2MinusEndDate) {
    PeriodStartGuaranteePhase2 = addDate(PeriodEndGuarantee, StartDate2MinusEndDate);
    dataTestcase.push(new ValidateField("StartDate2", 0, true, [PeriodStartGuaranteePhase2], []));
  }
  if (EndDate2MinusStartDate2) {
    PeriodEndGuaranteePhase2 = addDate(PeriodStartGuaranteePhase2, EndDate2MinusStartDate2);
    dataTestcase.push(new ValidateField("EndDate2", 0, true, [PeriodEndGuaranteePhase2], []));
  }

  let temp = true;
  //#region validate value 
  if (TotalContractAmountUnderlying) {
    temp = await applicationFormContractAndGuarantee.validateTotalContractAmountUnderlying(TotalContractAmountUnderlying);
    logFailTestcase(temp, 'Validate TotalContractAmountUnderlying value failed!');
  }
  if (ContractNoUnderlying) {
    temp = await applicationFormContractAndGuarantee.validateContractReferenceUnderlying(ContractNoUnderlying);
    logFailTestcase(temp, 'Validate ContractNoUnderlying value failed!');
  }
  if (ContractReferenceUnderlying) {
    temp = await applicationFormContractAndGuarantee.validateContractReferenceUnderlying(ContractReferenceUnderlying);
    logFailTestcase(temp, 'Validate ContractReferenceUnderlying value failed!');
  }
  if (ContractStartDateMinusToday) {
    let ContractStartDateUnderlying = getDate(ContractStartDateMinusToday)
    temp = await applicationFormContractAndGuarantee.validateContractStartDateUnderlying(ContractStartDateUnderlying);
    logFailTestcase(temp, 'Validate ContractStartDateUnderlying value failed!');
  }
  if (DateForSignedContractMinusToday) {
    let DateForSignedContractUnderlying = getDate(DateForSignedContractMinusToday);
    temp = await applicationFormContractAndGuarantee.validateDateForSignedContractUnderlying(DateForSignedContractUnderlying);
    logFailTestcase(temp, 'Validate DateForSignedContractUnderlying value failed!');
  }
  if (UnderlyingContractDocsUnderlying) {
    temp = await applicationFormContractAndGuarantee.validateContractDocsUnderlying(UnderlyingContractDocsUnderlying);
    logFailTestcase(temp, 'Validate UnderlyingContractDocsUnderlying value failed!');
  }
  if (ProjectUnderlying) {
    temp = await applicationFormContractAndGuarantee.validateProjectUnderlying(ProjectUnderlying);
    logFailTestcase(temp, 'Validate ProjectUnderlying value failed!');
  }
   if (ProjectNameUnderlying) {
    temp = await applicationFormContractAndGuarantee.validateProjectNameUnderlying(ProjectNameUnderlying);
    logFailTestcase(temp, 'Validate ProjectNameUnderlying value failed!');
  }
  if (ProjectAddressUnderlying) {
    temp = await applicationFormContractAndGuarantee.validateProjectAddressUnderlying(ProjectAddressUnderlying);
    logFailTestcase(temp, 'Validate ProjectAddressUnderlying value failed!');
  }
  if (ProjectNumberUnderlying) {
    temp = await applicationFormContractAndGuarantee.validateProjectNumberUnderlying(ProjectNumberUnderlying);
    logFailTestcase(temp, 'Validate ProjectNumberUnderlying value failed!');
  }
  if (ProjectDescriptionUnderlying) {
    temp = await applicationFormContractAndGuarantee.validateProjectDescriptionUnderlying(ProjectDescriptionUnderlying);
    logFailTestcase(temp, 'Validate ProjectDescriptionUnderlying value failed!');
  }
  if (ContractCommitmentUnderlying) {
    temp = await applicationFormContractAndGuarantee.validateContractCommitmentUnderlying(ContractCommitmentUnderlying);
    logFailTestcase(temp, 'Validate ContractCommitmentUnderlying value failed!');
  }
  if (GardsnummerUnderlying) {
    temp = await applicationFormContractAndGuarantee.validateGardsnummerUnderlying(GardsnummerUnderlying);
    logFailTestcase(temp, 'Validate GardsnummerUnderlying value failed!');
  }
  if (BruksnummerUnderlying) {
    temp = await applicationFormContractAndGuarantee.validateBruksnummerUnderlying(BruksnummerUnderlying);
    logFailTestcase(temp, 'Validate BruksnummerUnderlying value failed!');
  }
  if (KommuneUnderlying) {
    temp = await applicationFormContractAndGuarantee.validateKommuneUnderlying(KommuneUnderlying);
    logFailTestcase(temp, 'Validate KommuneUnderlying value failed!');
  }

  //section guarantee
  if (PeriodStartGuarantee) {
    temp = await applicationFormContractAndGuarantee.validatePeriodStartGuarantee(PeriodStartGuarantee);
    logFailTestcase(temp, 'Validate PeriodStartGuarantee value failed!');
  }
  if (PeriodEndGuarantee) {
    temp = await applicationFormContractAndGuarantee.validatePeriodEndGuarantee(PeriodEndGuarantee);
    logFailTestcase(temp, 'Validate PeriodEndGuarantee value failed!');
  }
  if (GuaranteeAmountGuarantee) {
    temp = await applicationFormContractAndGuarantee.validateGuaranteeAmountGuarantee(GuaranteeAmountGuarantee);
    logFailTestcase(temp, 'Validate GuaranteeAmountGuarantee value failed!');
  }
  if (GuaranteeRateGuarantee) {
    temp = await applicationFormContractAndGuarantee.validateGuaranteeRateGuarantee(GuaranteeRateGuarantee);
    logFailTestcase(temp, 'Validate GuaranteeRateGuarantee value failed!');
  }
  if (CommentGuarantee) {
    temp = await applicationFormContractAndGuarantee.validateCommentGuarantee(CommentGuarantee);
    logFailTestcase(temp, 'Validate CommentGuarantee value failed!');
  }


  if (PeriodStartGuaranteePhase2) {
    temp = await applicationFormContractAndGuarantee.validatePeriodStartGuaranteePhase2(PeriodStartGuaranteePhase2);
    logFailTestcase(temp, 'Validate PeriodStartGuaranteePhase2 value failed!');
  }
  if (PeriodEndGuaranteePhase2) {
    temp = await applicationFormContractAndGuarantee.validatePeriodEndGuaranteePhase2(PeriodEndGuaranteePhase2);
    logFailTestcase(temp, 'Validate PeriodEndGuaranteePhase2 value failed!');
  }
  if (GuaranteeAmountGuaranteePhase2) {
    temp = await applicationFormContractAndGuarantee.validateGuaranteeAmountGuaranteePhase2(GuaranteeAmountGuaranteePhase2);
    logFailTestcase(temp, 'Validate GuaranteeAmountGuaranteePhase2 value failed!');
  }
  if (GuaranteeRateGuaranteePhase2) {
    temp = await applicationFormContractAndGuarantee.validateGuaranteeRateGuaranteePhase2(GuaranteeRateGuaranteePhase2);
    logFailTestcase(temp, 'Validate GuaranteeRateGuaranteePhase2 value failed!');
  }
  if (CommentGuaranteePhase2) {
    temp = await applicationFormContractAndGuarantee.validateCommentGuaranteePhase2(CommentGuaranteePhase2);
    logFailTestcase(temp, 'Validate CommentGuaranteePhase2 value failed!');
  }


});
Then("System shows correct information at create application form section payment {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];

  //section GuaranteeFee
  const TotalGuaranteeFeeGuaranteeFee = row.TotalGuaranteeFeeGuaranteeFee
  const GuaranteeFeeGuaranteeFee = row.GuaranteeFeeGuaranteeFee
  const GuaranteeFeeGuaranteeFeePhase2 = row.GuaranteeFeeGuaranteeFeePhase2
  const PremiumRateGuaranteeFee = row.PremiumRateGuaranteeFee
  const TotalCommissionGuaranteeFee = row.TotalCommissionGuaranteeFee
  const CommissionGuaranteeFee = row.CommissionGuaranteeFee
  const CommissionGuaranteeFeePhase2 = row.CommissionGuaranteeFeePhase2
  const CommissionRateGuaranteeFee = row.CommissionRateGuaranteeFee
  const AgentCommissionGuaranteeFee = row.AgentCommissionGuaranteeFee

  //section Other fee
  const EstablishmentFeeOtherFee = row.EstablishmentFeeOtherFee

  //#region validate value 
  let temp = true;
  if (TotalGuaranteeFeeGuaranteeFee) {
    temp = await applicationFormPayment.validateTotalGuaranteeFeeGuarantee(TotalGuaranteeFeeGuaranteeFee);
    logFailTestcase(temp, 'Validate TotalGuaranteeFeeGuaranteeFee value failed!');
  }
  if (GuaranteeFeeGuaranteeFee) {
    temp = await applicationFormPayment.validateGuaranteeFeeGuarantee(GuaranteeFeeGuaranteeFee);
    logFailTestcase(temp, 'Validate GuaranteeFeeGuaranteeFee value failed!');
  }
  if (GuaranteeFeeGuaranteeFeePhase2) {
    temp = await applicationFormPayment.validateGuaranteeFeeGuaranteePhase2(GuaranteeFeeGuaranteeFeePhase2);
    logFailTestcase(temp, 'Validate GuaranteeFeeGuaranteeFeePhase2 value failed!');
  }
  if (PremiumRateGuaranteeFee) {
    temp = await applicationFormPayment.validatePremiumRateGuarantee(PremiumRateGuaranteeFee);
    logFailTestcase(temp, 'Validate PremiumRateGuaranteeFee value failed!');
  }
  if (TotalCommissionGuaranteeFee) {
    temp = await applicationFormPayment.validateTotalCommissionGuarantee(TotalCommissionGuaranteeFee);
    logFailTestcase(temp, 'Validate TotalCommissionGuaranteeFee value failed!');
  }
  if (CommissionGuaranteeFee) {
    temp = await applicationFormPayment.validateCommissionGuarantee(CommissionGuaranteeFee);
    logFailTestcase(temp, 'Validate CommissionGuaranteeFee value failed!');
  }
  if (CommissionGuaranteeFeePhase2) {
    temp = await applicationFormPayment.validateCommissionGuaranteePhase2(CommissionGuaranteeFeePhase2);
    logFailTestcase(temp, 'Validate CommissionGuaranteeFeePhase2 value failed!');
  }
  if (CommissionRateGuaranteeFee) {
    temp = await applicationFormPayment.validateCommissionRateGuarantee(CommissionRateGuaranteeFee);
    logFailTestcase(temp, 'Validate CommissionRateGuaranteeFee value failed!');
  }
  if (AgentCommissionGuaranteeFee) {
    temp = await applicationFormPayment.validateAgentCommissionGuarantee(AgentCommissionGuaranteeFee);
    logFailTestcase(temp, 'Validate AgentCommissionGuaranteeFee value failed!');
  }
  if (EstablishmentFeeOtherFee) {
    temp = await applicationFormPayment.validateEstablishmentFeeOtherFee(EstablishmentFeeOtherFee);
    logFailTestcase(temp, 'Validate EstablishmentFeeOtherFee value failed!');
  }

});
Then("System shows correct information at create application form section guarantor and third party {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  //section Guarantor
  const GuarantorNameGuarantor = row.GuarantorNameGuarantor
  const VisitingAddressGuarantor = row.VisitingAddressGuarantor
  const PostcodeGuarantor = row.PostcodeGuarantor
  const CityGuarantor = row.CityGuarantor
  const GuaranteeIssuerGuarantor = row.GuaranteeIssuerGuarantor

  const PostAddressGuarantor = row.PostAddressGuarantor
  const PostZipCodeGuarantor = row.PostZipCodeGuarantor
  const PostCityGuarantor = row.PostCityGuarantor


  //section Third party attorney
  const CompanyNameThirdParty = row.CompanyNameThirdParty
  const AddressThirdParty = row.AddressThirdParty
  const PostcodeThirdParty = row.PostcodeThirdParty
  const CityThirdParty = row.CityThirdParty

});