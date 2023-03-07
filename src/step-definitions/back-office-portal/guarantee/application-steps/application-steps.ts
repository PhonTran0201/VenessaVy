import { Before, Given, Then, When } from "@cucumber/cucumber";
import { FrameAgreementListInterface } from "../../../../interfaces/guarantee/frame-agreement/FrameAgreementListInterface";
import { ApplicationListAGS } from "../../../../page-objects/agent-portal/hogs/application/application-list/ApplicationListAGS";
import { FrameAgreementListAGS } from "../../../../page-objects/agent-portal/hogs/frame-agreement/frame-agreement-list/FrameAgreementListAGS";
import { GlobalPageObjectAGS } from "../../../../page-objects/agent-portal/hogs/GlobalPageObject/GlobalPageObjectAGS";
import { GlobalBrowserWindowHandle } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalBrowserWindowHandle";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { GlobalPeripherals } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPeripherals";
import { AccountTabFrameAgreementList } from "../../../../page-objects/back-office-portal/guarantee/account/account-details/tabs/account-frame-agreements/AccountTabFrameAgreementList";
import { ApplicationDetailFormTabDetail } from "../../../../page-objects/back-office-portal/guarantee/application/application-detail-forms/ApplicationDetailFormTabDetail";
import { ApplicationFormBasicInformation } from "../../../../page-objects/back-office-portal/guarantee/application/application-forms/ApplicationFormBasicInformation";
import { ApplicationFormContractAndGuarantee } from "../../../../page-objects/back-office-portal/guarantee/application/application-forms/ApplicationFormContractAndGuarantee";
import { ApplicationFormGuarantorAndThirdParty } from "../../../../page-objects/back-office-portal/guarantee/application/application-forms/ApplicationFormGuarantorAndThirdParty";
import { ApplicationFormPayment } from "../../../../page-objects/back-office-portal/guarantee/application/application-forms/ApplicationFormPayment";
import { ApplicationFormPreview } from "../../../../page-objects/back-office-portal/guarantee/application/application-forms/ApplicationFormPreview";
import { ApplicationOptionsForm } from "../../../../page-objects/back-office-portal/guarantee/application/application-forms/ApplicationOptionsForm";
import { ApplicationList } from "../../../../page-objects/back-office-portal/guarantee/application/application-list/ApplicationList";
import { ApplicationListCP } from "../../../../page-objects/customer-portal/general/application/application-list/ApplicationListCP";
import { GlobalHeaderCP } from "../../../../page-objects/customer-portal/general/GlobalPageObject/GlobalHeaderCP";
import { GlobalItemPage } from "../../../../page-objects/customer-portal/general/GlobalPageObject/GlobalItemPage";
import { ApplicationFormBasicInformationCPGuaranteeAtlas } from "../../../../page-objects/customer-portal/guarantee/atlas/application/application-forms/ApplicationFormBasicInformationCPGuaranteeAtlas";
import { ApplicationFormContractAndGuaranteeCPGuaranteeAtlas } from "../../../../page-objects/customer-portal/guarantee/atlas/application/application-forms/ApplicationFormContractAndGuaranteeCPGuaranteeAtlas";
import { ApplicationFormPaymentCPGuaranteeAtlas } from "../../../../page-objects/customer-portal/guarantee/atlas/application/application-forms/ApplicationFormPaymentCPGuaranteeAtlas";
import { ApplicationFormPreviewCPGuaranteeAtlas } from "../../../../page-objects/customer-portal/guarantee/atlas/application/application-forms/ApplicationFormPreviewCPGuaranteeAtlas";
import { ApplicationListCPGuaranteeAtlas } from "../../../../page-objects/customer-portal/guarantee/atlas/application/application-list/ApplicationListCPGuaranteeAtlas";
import { FrameAgreementListCPGuaranteeAtlas } from "../../../../page-objects/customer-portal/guarantee/atlas/frame-agreement/frame-agreement-list/FrameAgreementListCPGuaranteeAtlas";
import { GlobalHeaderCPGuaranteeAtlas } from "../../../../page-objects/customer-portal/guarantee/atlas/GlobalPageObject/GlobalHeaderCPGuaranteeAtlas";
import { ApplicationFormBasicInformationCPGuaranteeHogs } from "../../../../page-objects/customer-portal/guarantee/hogs/application/application-forms/ApplicationFormBasicInformationCPGuaranteeHogs";
import { ApplicationFormContractAndGuaranteeCPGuaranteeHogs } from "../../../../page-objects/customer-portal/guarantee/hogs/application/application-forms/ApplicationFormContractAndGuaranteeCPGuaranteeHogs";
import { ApplicationFormPaymentCPGuaranteeHogs } from "../../../../page-objects/customer-portal/guarantee/hogs/application/application-forms/ApplicationFormPaymentCPGuaranteeHogs";
import { ApplicationFormPreviewCPGuaranteeHogs } from "../../../../page-objects/customer-portal/guarantee/hogs/application/application-forms/ApplicationFormPreviewCPGuaranteeHogs";
import { ApplicationListCPGuaranteeHogs } from "../../../../page-objects/customer-portal/guarantee/hogs/application/application-list/ApplicationListCPGuaranteeHogs";
import { FrameAgreementListCPGuaranteeHogs } from "../../../../page-objects/customer-portal/guarantee/hogs/frame-agreement/frame-agreement-list/FrameAgreementListCPGuaranteeHogs";
import { GlobalHeaderCPGuaranteeHogs } from "../../../../page-objects/customer-portal/guarantee/hogs/GlobalPageObject/GlobalHeaderCPGuaranteeHogs";
import { ValidateField } from "../../../../shared/classes";
import { addDate, convertPathFileDataToDataRegression, getDate, logFailTestcase, logInfoMessage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { currencyToNumber, formatDateTime, getDefaultCurrency, numberToCurrency } from "../../../../shared/tenant-setting/tenant-setting";
import { dataTestcase, scenarioTags } from "../../../../shared/variables";
import { getValueDataOfDataTestExecution } from "../../../../storage-data/functions/data-test-execution";


const loader = require("csv-load-sync");
const loader_xlsx = require('read-excel-file/node');

let globalPageObject: GlobalPageObject;
let globalPeripherals: GlobalPeripherals;
let frameAgreementListInterface: FrameAgreementListInterface;
let applicationOptionsForm: ApplicationOptionsForm;

let applicationFormBasicInformation: ApplicationFormBasicInformation;
let applicationFormContractAndGuarantee: ApplicationFormContractAndGuarantee;
let applicationFormGuarantorAndThirdParty: ApplicationFormGuarantorAndThirdParty;
let applicationFormPayment: ApplicationFormPayment;

let applicationFormPreview: ApplicationFormPreview;
let applicationDetailFormTabDetail: ApplicationDetailFormTabDetail;

let applicationList: ApplicationList;


// Customer portal
let globalHeaderCP: GlobalHeaderCP;
let globalItemPage: GlobalItemPage;
let applicationListCP: ApplicationListCP;

Before(async function () {
  const context: ICommonContext = this.context;
  if (scenarioTags.has("@CustomerPortalAtlas")) {
    globalPageObject = new GlobalPageObject(context.driverService);
    globalPeripherals = new GlobalPeripherals(context.driverService);
    frameAgreementListInterface = new FrameAgreementListCPGuaranteeAtlas(context.driverService);
    applicationOptionsForm = new ApplicationOptionsForm(context.driverService);

    applicationFormBasicInformation = new ApplicationFormBasicInformationCPGuaranteeAtlas(context.driverService);
    applicationFormContractAndGuarantee = new ApplicationFormContractAndGuaranteeCPGuaranteeAtlas(context.driverService);
    applicationFormGuarantorAndThirdParty = new ApplicationFormGuarantorAndThirdParty(context.driverService);
    applicationFormPayment = new ApplicationFormPaymentCPGuaranteeAtlas(context.driverService);

    applicationFormPreview = new ApplicationFormPreviewCPGuaranteeAtlas(context.driverService);
    applicationDetailFormTabDetail = new ApplicationDetailFormTabDetail(context.driverService);

    applicationList = new ApplicationListCPGuaranteeAtlas(context.driverService);

    // Atlas
    globalHeaderCP = new GlobalHeaderCPGuaranteeAtlas(context.driverService);
    globalItemPage = new GlobalItemPage(context.driverService);
    applicationListCP = new ApplicationListCPGuaranteeAtlas(context.driverService);
  }
  else if (scenarioTags.has("@CustomerPortalHogs")) {
    globalPageObject = new GlobalPageObject(context.driverService);
    globalPeripherals = new GlobalPeripherals(context.driverService);
    frameAgreementListInterface = new FrameAgreementListCPGuaranteeHogs(context.driverService);
    applicationOptionsForm = new ApplicationOptionsForm(context.driverService);

    applicationFormBasicInformation = new ApplicationFormBasicInformationCPGuaranteeHogs(context.driverService);
    applicationFormContractAndGuarantee = new ApplicationFormContractAndGuaranteeCPGuaranteeHogs(context.driverService);
    applicationFormGuarantorAndThirdParty = new ApplicationFormGuarantorAndThirdParty(context.driverService);
    applicationFormPayment = new ApplicationFormPaymentCPGuaranteeHogs(context.driverService);

    applicationFormPreview = new ApplicationFormPreviewCPGuaranteeHogs(context.driverService);
    applicationDetailFormTabDetail = new ApplicationDetailFormTabDetail(context.driverService);
    applicationList = new ApplicationListAGS(context.driverService);

    // Hogs
    globalItemPage = new GlobalItemPage(context.driverService);
    globalHeaderCP = new GlobalHeaderCPGuaranteeHogs(context.driverService);
    applicationListCP = new ApplicationListCPGuaranteeHogs(context.driverService);
  }

  else if (scenarioTags.has('@AgentPortalHogs')) {
    globalPageObject = new GlobalPageObjectAGS(context.driverService);
    frameAgreementListInterface = new FrameAgreementListAGS(context.driverService)
    applicationList = new ApplicationListCPGuaranteeHogs(context.driverService);
  }
  else {
    globalPageObject = new GlobalPageObject(context.driverService);
    globalPeripherals = new GlobalPeripherals(context.driverService);
    frameAgreementListInterface = new AccountTabFrameAgreementList(context.driverService);
    applicationOptionsForm = new ApplicationOptionsForm(context.driverService);

    applicationFormBasicInformation = new ApplicationFormBasicInformation(context.driverService);
    applicationFormContractAndGuarantee = new ApplicationFormContractAndGuarantee(context.driverService);
    applicationFormGuarantorAndThirdParty = new ApplicationFormGuarantorAndThirdParty(context.driverService);
    applicationFormPayment = new ApplicationFormPayment(context.driverService);

    applicationFormPreview = new ApplicationFormPreview(context.driverService);
    applicationDetailFormTabDetail = new ApplicationDetailFormTabDetail(context.driverService);

    applicationList = new ApplicationList(context.driverService);
  }
});

//#region Application List
Given("User navigates to Application List", async () => {
  if (scenarioTags.has("@CustomerPortalHogs") || scenarioTags.has("@CustomerPortalAtlas")) {
    const temp = await globalHeaderCP.navigateToMainApplication();
    logFailTestcase(temp, "User navigates to Application List failed!");
  }
  else {
    const temp = await globalPageObject.navigateToSubApplications();
    logFailTestcase(temp, "User navigates to Application List failed!");
  }
});

Given("User opens first application at application list", async () => {
  dataTestcase.push(new ValidateField("Frame Agmt No", 1, true, [await applicationList.getValueFrameAgmtNoOnList()], []));
  dataTestcase.push(new ValidateField("Product", 1, true, [await applicationList.getValueProductOnList()], []));
  dataTestcase.push(new ValidateField("Application No", 1, true, [await applicationList.getValueApplicationNoOnList()], []));
  await globalPageObject.reloadTable(7000);
  const temp = await applicationList.openApplicationDetailByRow(1);
  logFailTestcase(temp, "Open first application failed!");
});

Then("System shows correct information at application list {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  await globalPageObject.reloadTable(7000);
  await globalPageObject.waitForProgressBarLoaded_v2();

  const Type = row.Type;
  let PeriodStartGuarantee = row.PeriodStartGuarantee;
  let PeriodEndGuarantee = row.PeriodEndGuarantee;
  const StartDateMinusToday = row.StartDateMinusToday;
  const EndDateMinusStartDate = row.EndDateMinusStartDate;
  // Start date and End date for test case Instalment
  if (StartDateMinusToday) {
    PeriodStartGuarantee = getDate(StartDateMinusToday);
  }
  if (EndDateMinusStartDate) {
    PeriodEndGuarantee = addDate(PeriodStartGuarantee, EndDateMinusStartDate);
  }

  if (row.IsBackDatedGurantee && row.IsBackDatedGurantee.localeCompare("Yes") === 0) {
    PeriodStartGuarantee = getDate(-364);
    PeriodEndGuarantee = getDate();
  }

  let ApplicationPeriod = "";


  if (Type && Type.localeCompare("Two Phases") === 0) {
    let PeriodEndGuaranteePhase2 = row.PeriodEndGuaranteePhase2;
    for (const iterator of dataTestcase) {
      if (iterator.nameField.localeCompare("EndDate2") === 0) {
        PeriodEndGuaranteePhase2 = iterator.message[0];
      }
    }
    ApplicationPeriod = formatDateTime(PeriodStartGuarantee) + ' - ' + formatDateTime(PeriodEndGuaranteePhase2);
  } else {
    ApplicationPeriod = formatDateTime(PeriodStartGuarantee) + ' - ' + formatDateTime(PeriodEndGuarantee);
  }

  let FrameAgmtNo = "Frame Agmt No";
  for (const iterator of dataTestcase) {
    if (iterator.nameField.localeCompare("Frame Agmt No") === 0) {
      FrameAgmtNo = iterator.message[0] || iterator.message[1];
    }
  }
  if (FrameAgmtNo.localeCompare("Frame Agmt No") === 0) {
    FrameAgmtNo = getValueDataOfDataTestExecution("Frame Agmt No");
  }

  const Debtor = row.OrdererDebtor;
  let Product = row.Product;
  for (const iterator of dataTestcase) {
    if (iterator.nameField.localeCompare("Product") === 0) {
      Product = iterator.message[0];
    }
  }

  const Beneficiary = row.BeneficiaryBeneficiary;
  const Status = "Waiting for approval";


  // Validate value
  // let temp = await applicationList.validateApplicationsNameValueOnList(ApplicationName);
  // logFailTestcase(temp);
  let temp = true;
  if (StartDateMinusToday || EndDateMinusStartDate) {
    let temp = await applicationList.validateApplicationsPeriodValueOnList(ApplicationPeriod);
    logFailTestcase(temp);
  }

  temp = await applicationList.validateFrameAgmtNoValueOnList(FrameAgmtNo);
  logFailTestcase(temp);

  temp = await applicationList.validateDebtorValueOnList(Debtor);
  logFailTestcase(temp);

  temp = await applicationList.validateProductValueOnList(Product);
  logFailTestcase(temp);

  if (Beneficiary) {
    temp = await applicationList.validateBenificiaryValueOnList(Beneficiary);
    logFailTestcase(temp);
  }

  temp = await applicationList.validateStatusValueOnList(Status);
  logFailTestcase(temp);

});

Then("System changes status of the application to {string} at application list", async (status) => {
  await globalPageObject.reloadTable(10000);
  await globalPageObject.reloadTable();
  await globalPageObject.waitForProgressBarLoaded_v2();
  let temp = await applicationList.validateStatusValueOnList(status, 1, true);
  logFailTestcase(temp, `System changes ${status} status of the application failed`);
});
//#endregion

Given("User opens Create Application Options form", async () => {
  if (scenarioTags.has("@CustomerPortalAtlas") || scenarioTags.has("@CustomerPortalHogs") || scenarioTags.has("@AgentPortalHogs")) {
    await globalPageObject.waitForProgressBarLoaded_v2();
    dataTestcase.push(new ValidateField("Frame Agmt No", 1, true, [await frameAgreementListInterface.getFrameAgreementNo()], []));

    await globalPageObject.reloadTable();
    await globalPageObject.waitForSeconds(2000);
    const temp = await frameAgreementListInterface.openCreateApplicationOptionsFormByRow();
    logFailTestcase(temp, "User opens Create Application Options form failed!");
  }
  else {
    //#region get Total Original Guarantee record of The Account before create Application
    await globalPageObject.navigateToSubGuarantees();
    await globalPageObject.waitForProgressBarLoaded_v2();
    await globalPageObject.reloadTable();
    const TotalRecords = await globalPageObject.getNumberOfTotalRecordsSubTab();
    dataTestcase.push(new ValidateField("Total original guarantee record", TotalRecords, true, [], []));
    logInfoMessage("Total original guarantee record: " + TotalRecords);
    //#endregion
    await globalPageObject.navigateToSubFrameAgreements();
    await globalPageObject.waitForProgressBarLoaded_v2();
    dataTestcase.push(new ValidateField("Frame Agmt No", 1, true, [await frameAgreementListInterface.getFrameAgreementNo()], []));

    await globalPageObject.reloadTable();
    await globalPageObject.waitForSeconds(2000);
    const temp = await frameAgreementListInterface.openCreateApplicationOptionsFormByRow();
    logFailTestcase(temp, "User opens Create Application Options form failed!");
  }
});

//#region Create Application Options Form
Given("User inputs valid data into Create Application Options form {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  const Product = row.Product;
  const ApplicationType = row.ApplicationType;
  const Debtor = row.Debtor;

  let temp = await applicationOptionsForm.inputProduct(Product);
  logFailTestcase(temp, "Input Product failed!");

  dataTestcase.push(new ValidateField("Product", 0, true, [Product], []));

  temp = await applicationOptionsForm.inputApplicationType(ApplicationType);
  logFailTestcase(temp, "Input Application Type failed!");

  temp = await applicationOptionsForm.inputDebtor(Debtor);
  logFailTestcase(temp, "Input Debtor failed!");
});
//#endregion

//#region Create Application form
When("User inputs valid data into Create Application form {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];

  //#region Declare variables
  //BASICINFFORMATION
  const Type = row.Type;

  const ExpiryDateApplication = row.ExpiryDateApplication;
  const OnDemandApplication = row.OnDemandApplication;
  const DescriptionGuarantee = row.DescriptionGuarantee;
  const IssuedDateGuarantee = row.IssuedDateGuarantee;

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


  //CONTRACT AND GUARANTEE
  const TotalContractAmountUnderlying = row.TotalContractAmountUnderlying;
  const ContractReferenceUnderlying = row.ContractReferenceUnderlying;
  const ContractStartDateUnderlying = row.ContractStartDateUnderlying;//new hogs
  const DateForSignedContract = row.DateForSignedContract; //new
  const DateForSignedContractMinusToday = row.DateForSignedContractMinusToday; //new
  const UnderlyingContractDocsUnderlying = row.UnderlyingContractDocsUnderlying;
  const ProjectUnderlying = row.ProjectUnderlying;
  const ProjectNameUnderlying = row.ProjectNameUnderlying; //new
  const ProjectAddressUnderlying = row.ProjectAddressUnderlying; //new
  const ProjectDescriptionUnderlying = row.ProjectDescriptionUnderlying; //new
  const ProjectNumberUnderlying = row.ProjectNumberUnderlying;//new hogs
  const ContractCommitmentUnderlying = row.ContractCommitmentUnderlying;
  const GardsnummerUnderlying = row.GardsnummerUnderlying;
  const BruksnummerUnderlying = row.BruksnummerUnderlying;
  const KommuneUnderlying = row.KommuneUnderlying;


  let PeriodStartGuarantee = row.PeriodStartGuarantee;
  let PeriodEndGuarantee = row.PeriodEndGuarantee;
  const StartDateMinusToday = row.StartDateMinusToday;
  const EndDateMinusStartDate = row.EndDateMinusStartDate;

  const GuaranteeAmountGuarantee = row.GuaranteeAmountGuarantee;
  const GuaranteeRateGuarantee = row.GuaranteeRateGuarantee;
  const AmountInWordGuarantee = row.AmountInWordGuarantee;
  const CommentGuarantee = row.CommentGuarantee;

  //PAYMENT
  const RenewGuaranteeGuarantee = row.RenewGuaranteeGuarantee;

  const GuaranteeFeeGuaranteeFee = row.GuaranteeFeeGuaranteeFee;
  const Commission = row.Commission; //new
  const EstablishmentFeeOtherFee = row.EstablishmentFeeOtherFee;


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
  const ValidateDefaultAnswerCheckbox = row.ValidateDefaultAnswerCheckbox;

  //TWO PHASE
  let PeriodStartGuaranteePhase2 = "";
  let PeriodEndGuaranteePhase2 = "";
  let StartDate2MinusEndDate: any;
  let EndDate2MinusStartDate2: any;

  let GuaranteeAmountGuaranteePhase2 = "";
  let GuaranteeRateGuaranteePhase2 = "";
  let CommentGuaranteePhase2 = "";

  let GuaranteeFeeGuaranteeFeePhase2 = "";
  let TotalGuaranteeFeeGuaranteeFee = "";
  let CommissionPhase2 = "";
  let TotalCommission = "";
  if (Type && Type.localeCompare("Two Phases") === 0) {
    PeriodStartGuaranteePhase2 = row.PeriodStartGuaranteePhase2;
    PeriodEndGuaranteePhase2 = row.PeriodEndGuaranteePhase2;
    StartDate2MinusEndDate = row.StartDate2MinusEndDate;
    EndDate2MinusStartDate2 = row.EndDate2MinusStartDate2;

    GuaranteeAmountGuaranteePhase2 = row.GuaranteeAmountGuaranteePhase2;
    GuaranteeRateGuaranteePhase2 = row.GuaranteeRateGuaranteePhase2;
    CommentGuaranteePhase2 = row.CommentGuaranteePhase2;

    GuaranteeFeeGuaranteeFeePhase2 = row.GuaranteeFeeGuaranteeFeePhase2;
    TotalGuaranteeFeeGuaranteeFee = row.TotalGuaranteeFeeGuaranteeFee;
    CommissionPhase2 = row.CommissionPhase2;
    TotalCommission = row.TotalCommission;

  }



  //#endregion


  //#region Input forms
  let temp = true;
  await globalPageObject.waitForProgressBarLoaded_v2();
  //#region Basic infomation
  //Application
  if (ExpiryDateApplication) {
    temp = await applicationFormBasicInformation.inputExpiryDateApplication(ExpiryDateApplication);
    logFailTestcase(temp, "Input ExpiryDateApplication failed!");
  }

  if (OnDemandApplication && (OnDemandApplication.localeCompare("Yes") === 0 || OnDemandApplication.localeCompare("yes") === 0)) {
    if (ValidateDefaultAnswerCheckbox && ValidateDefaultAnswerCheckbox.localeCompare("Yes") === 0) {
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


  // Guarantee
  if (DescriptionGuarantee) {
    temp = await applicationFormBasicInformation.inputDescriptionGuarantee(DescriptionGuarantee);
    logFailTestcase(temp, "Input DescriptionGuarantee failed!");
  }
  if (IssuedDateGuarantee) {
    temp = await applicationFormBasicInformation.inputIssuedDateGuarantee(IssuedDateGuarantee);
    logFailTestcase(temp, "Input IssuedDateGuarantee failed!");
  }

  // Beneficiary
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
      console.log("sssssssssssssssssssssss :" + ValidateDefaultAnswerCheckbox);
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
        UploadDocuments =
          __dirname.substring(0, temp2.length - 68) + "\\" + doc.replace("/", "\\");
      }
      else {
        logInfoMessage("Running on jenkins...");
        UploadDocuments = __dirname.substring(0, temp2.length - 68) + "/" + doc.replace("\\", "/");
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

  // Beneficiary 2
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


  // Debtor
  if (OrdererDebtor) {
    await globalPageObject.waitForProgressBarLoaded_v2();
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

  //#region Contact and Guarantee
  // Underlying contract
  if (TotalContractAmountUnderlying) {
    temp = await applicationFormContractAndGuarantee.inputTotalContractAmountUnderlying(TotalContractAmountUnderlying);
    logFailTestcase(temp, "Input TotalContractAmountUnderlying failed!");
  }
  if (ContractReferenceUnderlying) {
    temp = await applicationFormContractAndGuarantee.inputContractReferenceUnderlying(ContractReferenceUnderlying);
    logFailTestcase(temp, "Input ContractReferenceUnderlying failed!");
  }
  if (ContractStartDateUnderlying && ContractStartDateUnderlying.localeCompare("Yes") === 0) {
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
        UploadDocuments =
          __dirname.substring(0, temp2.length - 68) + "\\" + doc.replace("/", "\\");
      }
      else {
        logInfoMessage("Running on jenkins...");
        UploadDocuments = __dirname.substring(0, temp2.length - 68) + "/" + doc.replace("\\", "/");
      }
      logInfoMessage("\tFinal file path:");
      logInfoMessage("\t\t" + UploadDocuments);

      logInfoMessage("\tDirname:");
      logInfoMessage("\t\t" + __dirname);

      temp = await applicationFormContractAndGuarantee.inputUnderlyingContractDocUnderlying(UploadDocuments);
      logFailTestcase(temp, "Input UnderlyingContractDocsUnderlying failed!");
    }
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


  // Start date and End date for test case Instalment
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

  // Guarantee
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

  //#region Payment
  // Guarantee fee

  // Other fee
  if (EstablishmentFeeOtherFee) {
    temp = await applicationFormPayment.inputEstablishmentFeeOther(EstablishmentFeeOtherFee);
    logFailTestcase(temp, "Input EstablishmentFeeOtherFee failed!");
  }

  //#endregion


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

//#region Press button on Application form
When("User calculates price on Create Application form", async () => {
  const temp = await applicationFormPayment.pressCalculatePriceButtonOtherFee();
  logFailTestcase(temp, "Press Calculate price failed!");
  await globalPageObject.waitForProgressBarLoaded_v2();
});
//#endregion

//#region Application Preview form
Then("System shows correct information at review application page {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  //#region Declare variables
  const Type = row.Type;

  const ExpiryDateApplication = row.ExpiryDateApplication;

  const DescriptionGuarantee = row.DescriptionGuarantee;
  const IssuedDateGuarantee = row.IssuedDateGuarantee;

  const BeneficiaryBeneficiary = row.BeneficiaryBeneficiary;
  const OrgNrBeneficiary = row.OrgNrBeneficiary;
  const AddressBeneficiary = row.AddressBeneficiary;
  const PostcodeBeneficiary = row.PostcodeBeneficiary;
  const CityBeneficiary = row.CityBeneficiary;
  const OtherInformationBeneficiary = row.OtherInformationBeneficiary;


  const OrdererDebtor = row.OrdererDebtor;
  const OrganisationNumberDebtor = row.OrganisationNumberDebtor;
  const AddressDebtor = row.AddressDebtor;
  const PostcodeDebtor = row.PostcodeDebtor;
  const CityDebtor = row.CityDebtor;
  const OtherInformationDebtor = row.OtherInformationDebtor;


  const TotalContractAmountUnderlying = row.TotalContractAmountUnderlying;
  const ContractReferenceUnderlying = row.ContractReferenceUnderlying;
  const UnderlyingContractDocsUnderlying = row.UnderlyingContractDocsUnderlying;
  const ProjectUnderlying = row.ProjectUnderlying;
  const ContractCommitmentUnderlying = row.ContractCommitmentUnderlying;
  const GardsnummerUnderlying = row.GardsnummerUnderlying;
  const BruksnummerUnderlying = row.BruksnummerUnderlying;
  const KommuneUnderlying = row.KommuneUnderlying;


  const PeriodStartGuarantee = row.PeriodStartGuarantee;
  const PeriodEndGuarantee = row.PeriodEndGuarantee;
  const GuaranteeAmountGuarantee = row.GuaranteeAmountGuarantee;
  const GuaranteeRateGuarantee = row.GuaranteeRateGuarantee;
  const CommentGuarantee = row.CommentGuarantee;
  const RenewGuaranteeGuarantee = row.RenewGuaranteeGuarantee;

  const GuaranteeFeeGuaranteeFee = row.GuaranteeFeeGuaranteeFee;

  const EstablishmentFeeOtherFee = row.EstablishmentFeeOtherFee;


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

  let temp = true;
  //#region Issued Date
  if (IssuedDateGuarantee) {
    temp = await applicationFormPreview.validateIssuedDate(IssuedDateGuarantee);
    logFailTestcase(temp);
  }
  //#endregion

  //#region Debtor
  if (OrdererDebtor) {
    temp = await applicationFormPreview.validateDebtorName(OrdererDebtor);
    logFailTestcase(temp);
  }
  if (OrganisationNumberDebtor) {
    temp = await applicationFormPreview.validateDebtorOrgNr("Org.nr.: " + OrganisationNumberDebtor);
    logFailTestcase(temp);
  }
  if (AddressDebtor) {
    temp = await applicationFormPreview.validateDebtorAddress(AddressDebtor);
    logFailTestcase(temp);
  }
  if (PostcodeDebtor) {
    temp = await applicationFormPreview.validateDebtorPostcode(PostcodeDebtor);
    logFailTestcase(temp);
  }
  if (CityDebtor) {
    temp = await applicationFormPreview.validateDebtorCity(CityDebtor);
    logFailTestcase(temp);
  }
  //#endregion

  //#region Beneficiary
  if (BeneficiaryBeneficiary) {
    temp = await applicationFormPreview.validateBeneficiaryName(BeneficiaryBeneficiary);
    logFailTestcase(temp);
  }
  if (OrgNrBeneficiary) {
    temp = await applicationFormPreview.validateBeneficiaryOrgNr("Org.nr.: " + OrgNrBeneficiary);
    logFailTestcase(temp);
  }
  if (AddressBeneficiary) {
    temp = await applicationFormPreview.validateBeneficiaryAddress(AddressBeneficiary);
    logFailTestcase(temp);
  }
  if (PostcodeBeneficiary) {
    temp = await applicationFormPreview.validateBeneficiaryPostcode(PostcodeBeneficiary);
    logFailTestcase(temp);
  }
  if (CityBeneficiary) {
    temp = await applicationFormPreview.validateBeneficiaryCity(CityBeneficiary);
    logFailTestcase(temp);
  }
  //#endregion

  //#region Guarantor
  if (GuarantorNameGuarantor) {
    temp = await applicationFormPreview.validateGuarantorName(GuarantorNameGuarantor);
    logFailTestcase(temp);
  }
  if (VisitingAddressGuarantor) {
    temp = await applicationFormPreview.validateGuarantorAddress(VisitingAddressGuarantor);
    logFailTestcase(temp);
  }
  if (PostcodeGuarantor) {
    temp = await applicationFormPreview.validateGuarantorPostcode(PostcodeGuarantor);
    logFailTestcase(temp);
  }
  if (CityGuarantor) {
    temp = await applicationFormPreview.validateGuarantorCity(CityGuarantor);
    logFailTestcase(temp);
  }
  if (FirmsNoGuarantor) {
    temp = await applicationFormPreview.validateGuarantorFirmNo("Firm number: " + FirmsNoGuarantor);
    logFailTestcase(temp);
  }
  //#endregion

  //#region Guarantee Issuer
  if (GuaranteeIssuerGuarantor) {
    temp = await applicationFormPreview.validateGuaranteeIssuer(GuaranteeIssuerGuarantor);
    logFailTestcase(temp);
  }
  //#endregion

  //#region Underlying Contract
  if (ContractReferenceUnderlying) {
    temp = await applicationFormPreview.validateUnderlyingContractReference(ContractReferenceUnderlying);
    logFailTestcase(temp);
  }
  if (ContractCommitmentUnderlying) {
    temp = await applicationFormPreview.validateUnderlyingContractCommitment(ContractCommitmentUnderlying);
    logFailTestcase(temp);
  }

  if (GardsnummerUnderlying) {
    temp = await applicationFormPreview.validateUnderlyingContractGardsnummer("GNR " + GardsnummerUnderlying);
    logFailTestcase(temp);
  }
  if (BruksnummerUnderlying) {
    temp = await applicationFormPreview.validateUnderlyingContractBruksnummer("BNR " + BruksnummerUnderlying);
    logFailTestcase(temp);
  }
  if (KommuneUnderlying) {
    temp = await applicationFormPreview.validateUnderlyingContractKommune(KommuneUnderlying);
    logFailTestcase(temp);
  }
  if (TotalContractAmountUnderlying) {
    temp = await applicationFormPreview.validateUnderlyingContractTotalAmount(TotalContractAmountUnderlying + " " + getDefaultCurrency());
    logFailTestcase(temp);
  }
  //#endregion

  //#region Third Party
  if (CompanyNameThirdParty) {
    temp = await applicationFormPreview.validateThirdPartyName(CompanyNameThirdParty);
    logFailTestcase(temp);
  }
  if (AddressThirdParty) {
    temp = await applicationFormPreview.validateThirdPartyAddress(AddressThirdParty);
    logFailTestcase(temp);
  }
  if (PostcodeThirdParty) {
    temp = await applicationFormPreview.validateThirdPartyPostcode(PostcodeThirdParty);
    logFailTestcase(temp);
  }
  if (CityThirdParty) {
    temp = await applicationFormPreview.validateThirdPartyCity(CityThirdParty);
    logFailTestcase(temp);
  }
  if (PhoneNumberThirdParty) {
    temp = await applicationFormPreview.validateThirdPartyPhone("Phone " + PhoneNumberThirdParty);
    logFailTestcase(temp);
  }
  //#endregion

  //#region Phase - Time line
  if (Type && Type.localeCompare("One Phase") === 0) {
    if (PeriodStartGuarantee && PeriodEndGuarantee) {
      let periodEnd = RenewGuaranteeGuarantee ? "" : " - " + PeriodEndGuarantee;
      // Do những product tự động renew thì không có PeriodEnd (Product: Skattetrekksgaranti và Tollgaranti)

      temp = await applicationFormPreview.validatePeriod(PeriodStartGuarantee + periodEnd);
      logFailTestcase(temp);
    }
    if (GuaranteeAmountGuarantee) {
      temp = await applicationFormPreview.validateGuaranteeAmount(GuaranteeAmountGuarantee + " " + getDefaultCurrency());
      logFailTestcase(temp);
    }
    if (GuaranteeFeeGuaranteeFee) {
      temp = await applicationFormPreview.validateTotalGuaranteeFee(numberToCurrency(GuaranteeFeeGuaranteeFee, true));
      logFailTestcase(temp);
    }
    // if(Commission?????){
    //   temp = await applicationFormPreview.validateGuaranteeAmount(GuaranteeAmountGuarantee + " " + getDefaultCurrency());
    //   logFailTestcase(temp);
    // }
    if (EstablishmentFeeOtherFee) {
      temp = await applicationFormPreview.validateEstablishmentFee(EstablishmentFeeOtherFee + " " + getDefaultCurrency());
      logFailTestcase(temp);
    }
  }
  //#endregion
});
//#endregion


//#region Application Detail form tab Details
Then("System shows correct information at detail application page {string}", async (filename) => {
  // await globalBrowserWindowHandle.refreshPage();
  await globalPeripherals.pressTabCurrentElement();
  await globalPageObject.waitForSeconds(7000);
  const row = loader(convertPathFileDataToDataRegression(filename))[0];

  const UploadedDataValidationStatus = row.UploadedDataValidationStatus;
  const ApprovalStatus = row.ApprovalStatus;
  //#region Declare variables
  //BASICINFFORMATION
  const Type = row.Type;

  const ExpiryDateApplication = row.ExpiryDateApplication;
  const DescriptionGuarantee = row.DescriptionGuarantee;
  const IssuedDateGuarantee = row.IssuedDateGuarantee;

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


  const OrdererDebtor = row.OrdererDebtor;
  const OrganisationNumberDebtor = row.OrganisationNumberDebtor;
  const AddressDebtor = row.AddressDebtor;
  const PostcodeDebtor = row.PostcodeDebtor;
  const CityDebtor = row.CityDebtor;
  const OtherInformationDebtor = row.OtherInformationDebtor;


  //CONTRACT AND GUARANTEE
  const TotalContractAmountUnderlying = row.TotalContractAmountUnderlying;
  const ContractReferenceUnderlying = row.ContractReferenceUnderlying;
  const ContractStartDateUnderlying = row.ContractStartDateUnderlying;
  const DateForSignedContract = row.DateForSignedContract; //new
  const UnderlyingContractDocsUnderlying = row.UnderlyingContractDocsUnderlying;
  const ProjectUnderlying = row.ProjectUnderlying;
  const ProjectNameUnderlying = row.ProjectNameUnderlying; //new
  const ProjectAddressUnderlying = row.ProjectAddressUnderlying; //new
  const ProjectDescriptionUnderlying = row.ProjectDescriptionUnderlying; //new
  const ContractCommitmentUnderlying = row.ContractCommitmentUnderlying;
  const GardsnummerUnderlying = row.GardsnummerUnderlying;
  const BruksnummerUnderlying = row.BruksnummerUnderlying;
  const KommuneUnderlying = row.KommuneUnderlying;


  let PeriodStartGuarantee = row.PeriodStartGuarantee;
  let PeriodEndGuarantee = row.PeriodEndGuarantee;
  const GuaranteeAmountGuarantee = row.GuaranteeAmountGuarantee;
  const GuaranteeRateGuarantee = row.GuaranteeRateGuarantee;
  const CommentGuarantee = row.CommentGuarantee;

  //PAYMENT
  const RenewGuaranteeGuarantee = row.RenewGuaranteeGuarantee;

  const GuaranteeFeeGuaranteeFee = row.GuaranteeFeeGuaranteeFee;
  const Commission = row.Commission; //new
  const EstablishmentFeeOtherFee = row.EstablishmentFeeOtherFee;


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

  //TWO PHASE
  let PeriodStartGuaranteePhase2 = "";
  let PeriodEndGuaranteePhase2 = "";
  let GuaranteeAmountGuaranteePhase2 = "";
  let GuaranteeRateGuaranteePhase2 = "";
  let CommentGuaranteePhase2 = "";

  let GuaranteeFeeGuaranteeFeePhase2 = "";
  let TotalGuaranteeFeeGuaranteeFee = "";
  let CommissionPhase2 = "";
  let TotalCommission = "";
  if (Type && Type.localeCompare("Two Phases") === 0) {
    PeriodStartGuaranteePhase2 = row.PeriodStartGuaranteePhase2;
    PeriodEndGuaranteePhase2 = row.PeriodEndGuaranteePhase2;
    GuaranteeAmountGuaranteePhase2 = row.GuaranteeAmountGuaranteePhase2;
    GuaranteeRateGuaranteePhase2 = row.GuaranteeRateGuaranteePhase2;
    CommentGuaranteePhase2 = row.CommentGuaranteePhase2;

    GuaranteeFeeGuaranteeFeePhase2 = row.GuaranteeFeeGuaranteeFeePhase2;
    TotalGuaranteeFeeGuaranteeFee = row.TotalGuaranteeFeeGuaranteeFee;
    CommissionPhase2 = row.CommissionPhase2;
    TotalCommission = row.TotalCommission;

  }


  // Dynamic date
  const StartDateMinusToday = row.StartDateMinusToday;
  const EndDateMinusStartDate = row.EndDateMinusStartDate;


  if (StartDateMinusToday) {
    PeriodStartGuarantee = getDate(StartDateMinusToday);

  }
  if (EndDateMinusStartDate) {
    PeriodEndGuarantee = addDate(PeriodStartGuarantee, EndDateMinusStartDate);
  }

  //#endregion

  let temp = true;
  if (UploadedDataValidationStatus) {
    temp = await applicationDetailFormTabDetail.validateUploadedDataValidationStatus(UploadedDataValidationStatus);
    logFailTestcase(temp);
  }
  if (ApprovalStatus) {
    temp = await applicationDetailFormTabDetail.validateApprovalStatus(ApprovalStatus);
    logFailTestcase(temp);
  }
  //#region Issued Date
  if (IssuedDateGuarantee) {
    temp = await applicationDetailFormTabDetail.validateIssuedDate(IssuedDateGuarantee);
    logFailTestcase(temp);
  }
  //#endregion

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

  //#region Guarantee Issuer
  if (GuaranteeIssuerGuarantor) {
    temp = await applicationDetailFormTabDetail.validateGuaranteeIssuer(GuaranteeIssuerGuarantor);
    logFailTestcase(temp);
  }
  //#endregion

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
    temp = await applicationDetailFormTabDetail.validateUnderlyingContractTotalAmount(numberToCurrency(currencyToNumber(TotalContractAmountUnderlying), true));
    logFailTestcase(temp);
  }
  if (ContractStartDateUnderlying) {
    temp = await applicationDetailFormTabDetail.validateUnderlyingContractStartDate(getDate(0));
    logFailTestcase(temp);
  }
  //#endregion

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

  //#region Phase - Timeline
  if (Type && Type.localeCompare("One Phase") === 0) {
    if (PeriodStartGuarantee && PeriodEndGuarantee) {
      let periodEnd = RenewGuaranteeGuarantee ? "" : " - " + formatDateTime(PeriodEndGuarantee);
      PeriodStartGuarantee = formatDateTime(PeriodStartGuarantee);
      // Do những product tự động renew thì không có PeriodEnd (Product: Skattetrekksgaranti và Tollgaranti)

      temp = await applicationDetailFormTabDetail.validatePeriod(PeriodStartGuarantee + periodEnd);
      logFailTestcase(temp);
    }
    if (GuaranteeAmountGuarantee) {
      temp = await applicationDetailFormTabDetail.validateGuaranteeAmount(numberToCurrency(currencyToNumber(GuaranteeAmountGuarantee), true));
      logFailTestcase(temp);
    }
    if (GuaranteeFeeGuaranteeFee) {
      temp = await applicationDetailFormTabDetail.validateTotalGuaranteeFee(numberToCurrency(GuaranteeFeeGuaranteeFee, true));
      logFailTestcase(temp);
    }
    if (Commission) {
      temp = await applicationDetailFormTabDetail.validateTotalCommission(Commission + " " + getDefaultCurrency());
      logFailTestcase(temp);
    }

  } else if (Type && Type.localeCompare("Two Phases") === 0) {
    if (PeriodStartGuarantee && PeriodEndGuarantee) {
      temp = await applicationDetailFormTabDetail.validatePeriodPhase1("Period: " + PeriodStartGuarantee + " - " + PeriodEndGuarantee);
      logFailTestcase(temp);
    }
    if (PeriodStartGuaranteePhase2 && PeriodEndGuaranteePhase2) {
      temp = await applicationDetailFormTabDetail.validatePeriodPhase2("Period: " + PeriodStartGuaranteePhase2 + " - " + PeriodEndGuaranteePhase2);
      logFailTestcase(temp);
    }
    if (GuaranteeAmountGuarantee) {
      temp = await applicationDetailFormTabDetail.validateGuaranteeAmountPhase1(numberToCurrency(currencyToNumber(GuaranteeAmountGuarantee), true));
      logFailTestcase(temp);
    }
    if (GuaranteeAmountGuaranteePhase2) {
      temp = await applicationDetailFormTabDetail.validateGuaranteeAmountPhase2(numberToCurrency(currencyToNumber(GuaranteeAmountGuaranteePhase2), true));
      logFailTestcase(temp);
    }

    if (GuaranteeFeeGuaranteeFee) {
      temp = await applicationDetailFormTabDetail.validateGuaranteeFeePhase1(numberToCurrency(currencyToNumber(GuaranteeFeeGuaranteeFee), true));
      logFailTestcase(temp);
    }
    if (GuaranteeFeeGuaranteeFeePhase2) {
      temp = await applicationDetailFormTabDetail.validateGuaranteeFeePhase2(numberToCurrency(currencyToNumber(GuaranteeFeeGuaranteeFeePhase2), true));
      logFailTestcase(temp);
    }
    if (TotalGuaranteeFeeGuaranteeFee) {
      temp = await applicationDetailFormTabDetail.validateTotalGuaranteeFee(numberToCurrency(currencyToNumber(TotalGuaranteeFeeGuaranteeFee), true));
      logFailTestcase(temp);
    }
    if (Commission) {
      temp = await applicationDetailFormTabDetail.validateCommissionPhase1(numberToCurrency(currencyToNumber(Commission), true));
      logFailTestcase(temp);
    }
    if (CommissionPhase2) {
      temp = await applicationDetailFormTabDetail.validateCommissionPhase2(numberToCurrency(currencyToNumber(CommissionPhase2), true));
      logFailTestcase(temp);
    }
    if (TotalCommission) {
      temp = await applicationDetailFormTabDetail.validateTotalCommission(numberToCurrency(currencyToNumber(TotalCommission), true));
      logFailTestcase(temp);
    }
  }
  if (EstablishmentFeeOtherFee) {
    temp = await applicationDetailFormTabDetail.validateEstablishmentFee(numberToCurrency(currencyToNumber(EstablishmentFeeOtherFee), true));
    logFailTestcase(temp);
  }



  //#endregion
});
//#endregion


Then("User validates contract and guarantee amounts are calulated correctly {string}", async (filename) => {
  let temp = true;
  let SumContractAmount = 0;
  let SumGuaranteeAmountPhase1 = 0;
  let SumGuaranteeAmountPhase2 = 0;
  await loader_xlsx(filename).then(async (rows) => {
    for (let i = 1; i < rows.length; i++) {
      let TotalContractAmountUnderlying = rows[i][rows[0].indexOf("Contract Amount")];
      let GuaranteeRateGuarantee = rows[i][rows[0].indexOf("First Phase Guarantee Rate")];
      let GuaranteeRateGuaranteePhase2 = rows[i][rows[0].indexOf("Second Phase Guarantee Rate")];

      if (TotalContractAmountUnderlying) {
        SumContractAmount += parseFloat(TotalContractAmountUnderlying);
      }
      if (GuaranteeRateGuarantee) {
        SumGuaranteeAmountPhase1 += parseFloat(GuaranteeRateGuarantee) / 100 * parseFloat(TotalContractAmountUnderlying);
      }
      if (GuaranteeRateGuaranteePhase2) {
        SumGuaranteeAmountPhase2 += parseFloat(GuaranteeRateGuaranteePhase2) / 100 * parseFloat(TotalContractAmountUnderlying);
      }
    }

    // Leone confirm: Không cần check vì nó luôn bằng 0
    // if (SumContractAmount != 0) {
    //   temp = await applicationFormContractAndGuarantee.validateTotalContractAmountMultipleGuarantee(SumContractAmount);
    //   logFailTestcase(temp, "validate Total Contract Amount on application input form failed!")
    // }
    // if (SumGuaranteeAmountPhase1 != 0) {
    //   temp = await applicationFormContractAndGuarantee.validateGuaranteeAmountPhase1MultipleGuarantee(SumGuaranteeAmountPhase1);
    //   logFailTestcase(temp, "validate Guarantee Amount on application input form failed!")
    // }
    // if (SumGuaranteeAmountPhase2 != 0) {
    //   temp = await applicationFormContractAndGuarantee.validateGuaranteeAmountPhase2MultipleGuarantee(SumGuaranteeAmountPhase2);
    //   logFailTestcase(temp, "validate Guarantee Amount on application input form failed!")
    // }
  })
});

Then("User verifies comment after send for correction {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];

  const comment = row.CommentForCorrection;
  await globalPageObject.waitForProgressBarLoaded_v2(2000);
  if (scenarioTags.has("@CustomerPortalHogs")) {
    let temp = await applicationDetailFormTabDetail.validateAlertCommentCorrection(comment);
    logFailTestcase(temp, "Verify commet on alert label failed!");
  }

  let temp = await applicationDetailFormTabDetail.isCommentExisted(comment);
  logFailTestcase(temp, `Comment for correction "${comment}" is NOT found on alert!`);

});
When("System changes status of the application to {string} at application form", async (status) => {
  const temp = await applicationDetailFormTabDetail.validateStatusApplication(status);
  logFailTestcase(temp, "Incorrect status application!");
});

Then("System does not show the application in application list {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  let ApplicationNo = row.ApplicationNo;
  const SavedInformationFile = row.SavedInformationFile;
  let temp = true;

  await globalPageObject.reloadTable(3000);

  if (ApplicationNo) {
    const app = require("../../../../." + SavedInformationFile);
    console.log(app);
    ApplicationNo = app.ApplicationNo;
  }

  if (scenarioTags.has("@CustomerPortalHogs") || scenarioTags.has("@CustomerPortalAtlas")) {
    if (await globalItemPage.getNumberOfTotalRecordsMainTab() != 0) {
      temp = await applicationListCP.validateApplicationNoOnApplicationList(ApplicationNo);
      logFailTestcase(!temp, "System still shows the application in application list");
    }
  } else {
    if (await globalPageObject.getNumberOfTotalRecordsSubTab() != 0) {
      temp = await applicationList.validateApplicationNoOnApplicationList(ApplicationNo);
      logFailTestcase(!temp, "System still shows the application in application list");
    }
  }

});