import { Before, Then, When } from "@cucumber/cucumber";
import { AccountDetailsLeftSide } from "../../../../page-objects/back-office-portal/general/account/account-details/left-side/AccountDetailsLeftSide";
import { AccountTabSummary } from "../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-summary/AccountTabSummary";
import { AccountForm } from "../../../../page-objects/back-office-portal/general/account/account-forms/AccountForm";
import { AccountList } from "../../../../page-objects/back-office-portal/general/account/account-list/AccountList";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { GlobalPeripherals } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPeripherals";
import { AccountFormInsurance } from "../../../../page-objects/back-office-portal/insurance/account/account-forms/AccountFormInsurance";
import { convertPathFileDataToDataRegression, logFailTestcase, logWarningMessage, readJsonFileToObject } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";

const loader = require("csv-load-sync");

let accountFormInsurance: AccountFormInsurance;
let accountForm: AccountForm;
let accountList: AccountList;
let accountDetailsLeftSide: AccountDetailsLeftSide;
let globalPageObject: GlobalPageObject;
let globalPeripherals: GlobalPeripherals;
let accountTabSummary: AccountTabSummary;

//Variable using to compare

Before(async function () {
  const context: ICommonContext = this.context;
  accountFormInsurance = new AccountFormInsurance(context.driverService);
  accountForm = new AccountForm(context.driverService);
  accountList = new AccountList(context.driverService);
  globalPeripherals = new GlobalPeripherals(context.driverService);
  accountDetailsLeftSide = new AccountDetailsLeftSide(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
  accountTabSummary = new AccountTabSummary(context.driverService);
});

When("User updates a Origo account from precondition steps from csv file {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));

  await accountList.reloadAccountList();

  const selectedAccount = rows[0].SelectedAccount;
  const selectedOrgNo = rows[0].SelectedOrgNo;

  let temp = await accountFormInsurance.openEditOrigoAccountFormByName_OrgNo(selectedAccount, selectedOrgNo);
  logFailTestcase(temp);

  const Origo = rows[0].SelectedOrgNo;
  const CompanyName = rows[0].CompanyName;
  const EmailAddress = rows[0].EmailAddress;
  const CompanyPhone = rows[0].CompanyPhone;
  const Status = rows[0].Status;
  const Country = rows[0].Country;

  const PostalAddress = rows[0].PostalAddress;
  const PostalExtraAddress = rows[0].PostalExtraAddress;
  const PostalPostcode = rows[0].PostalPostcode;
  const PostalCity = rows[0].PostalCity;

  const InvoiceAddress = rows[0].InvoiceAddress;
  const InvoiceExtraAddress = rows[0].InvoiceExtraAddress;
  const InvoicePostcode = rows[0].InvoicePostcode;
  const InvoiceCity = rows[0].InvoiceCity;

  const EducationalLevel = rows[0].EducationalLevel;

  const KAM = rows[0].KAM;
  const PreferredCollectionDate = rows[0].PreferredCollectionDate;
  const PaymentType = rows[0].PaymentType;
  const PaymentFrequency = rows[0].PaymentFrequency;

  //ACTIONS

  if (Origo) {
    temp = await accountForm.inputOrgNoBasicInformationAccountCompanyForm(Origo);
    logFailTestcase(temp, "Input OrgNo on Account Company Form failed! ");
  }
  if (CompanyName) {
    temp = await accountForm.inputCompanyNameBasicInformationAccountCompanyForm(CompanyName);
    logFailTestcase(temp, "Input Company Name on Account Company Form failed! ");
  }
  if (EmailAddress) {
    temp = await accountForm.inputEmailAddressCompanyBasicInformationAccountCompanyForm(EmailAddress);
    logFailTestcase(temp, "Input Email Address on Account Company Form failed! ");
  }
  if (CompanyPhone) {
    temp = await accountForm.inputCompanyPhoneBasicInformationAccountCompanyForm(CompanyPhone);
    logFailTestcase(temp, "Input Company Phone on Account Company Form failed! ");
  }
  if (Status) {
    temp = await accountForm.inputStatusCompanyBasicInformationAccountCompanyForm(Status);
    logFailTestcase(temp, "Input Status on Account Company Form failed! ");
  }
  if (Country) {
    temp = await accountForm.inputCountryCompanyBasicInformationAccountCompanyForm(Country);
    logFailTestcase(temp, "Input Country on Account Company Form failed! ");
  }




  if (PostalAddress) {
    temp = await accountForm.inputPostalAddress_Address_AccountCompanyForm(PostalAddress);
    logFailTestcase(temp, "Input Postal Address on Account Company Form failed! ");
  }
  if (PostalExtraAddress) {
    temp = await accountForm.inputPostalExtraAddress_Address_AccountCompanyForm(PostalExtraAddress);
    logFailTestcase(temp, "Input Postal Extra Address on Account Company Form failed! ");
  }
  if (PostalPostcode) {
    temp = await accountForm.inputPostalPostcodeAddressAccountCompanyForm(PostalPostcode);
    logFailTestcase(temp, "Input Postal Postcode on Account Company Form failed! ");
  }
  if (PostalCity) {
    temp = await accountForm.inputPostalCityAddressAccountCompanyForm(PostalCity);
    logFailTestcase(temp, "Input Postal City on Account Company Form failed! ");
  }
  if (InvoiceAddress) {
    temp = await accountForm.inputInvoiceAddress_Address_AccountCompanyForm(InvoiceAddress);
    logFailTestcase(temp, "Input Invoice Address on Account Company Form failed! ");
  }
  if (InvoiceExtraAddress) {
    temp = await accountForm.inputInvoiceExtraAddress_Address_AccountCompanyForm(InvoiceExtraAddress);
    logFailTestcase(temp, "Input Invoice Extra Address on Account Company Form failed! ");
  }
  if (InvoicePostcode) {
    temp = await accountForm.inputInvoicePostcodeAddressAccountCompanyForm(InvoicePostcode);
    logFailTestcase(temp, "Input Invoice Postcode on Account Company Form failed! ");
  }
  if (InvoiceCity) {
    temp = await accountForm.inputInvoiceCityAddressAccountCompanyForm(InvoiceCity);
    logFailTestcase(temp, "Input Invoice City on Account Company Form failed! ");
  }




  if (EducationalLevel) {
    temp = await accountForm.inputEducationLevelOtherInformationAccountCompanyForm(EducationalLevel);
    logFailTestcase(temp, "Input Educational Level on Account Company Form failed! ");
  }

  if (KAM) {
    temp = await accountForm.inputKAMOtherInformationAccountCompanyForm(KAM);
    logFailTestcase(temp, "Input KAM on Account Company Form failed! ");
  }
  if (PreferredCollectionDate) {
    temp = await accountForm.inputPreferredCollectionDateOtherInformationAccountCompanyForm(PreferredCollectionDate);
    logFailTestcase(temp, "Input Preferred Collection Date on Account Company Form failed! ");
  }
  if (PaymentType) {
    temp = await accountForm.inputPaymentTypeOtherInformationAccountCompanyForm(PaymentType);
    logFailTestcase(temp, "Input Payment Type on Account Company Form failed! ");
  }
  if (PaymentFrequency) {
    temp = await accountForm.inputPaymentFrequencyOtherInformationAccountCompanyForm(PaymentFrequency);
    logFailTestcase(temp, "Input Payment Frequency on Account Company Form failed! ");
  }

  temp = await globalPageObject.pressSaveForm();
  logFailTestcase(temp, "Press save edit form account failed!");
  temp = await globalPageObject.waitForProgressBarLoaded();
  logFailTestcase(temp, "Press save edit form account failed!");
});

Then("System shows updated Origo account in the Account list {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));

  await accountList.reloadAccountList();

  const expectedName = rows[0].CompanyName;
  const expectedEmail = rows[0].EmailAddress;
  const expectedPhone = rows[0].CompanyPhone;

  let expectedAddress = rows[0].VisitingAddress;

  let temp1 = ", " + rows[0].PostalAddress;
  let temp2 = ", " + rows[0].InvoiceAddress;
  if (temp1.localeCompare(", ") !== 0) {
    expectedAddress = expectedAddress + temp2;
  }
  if (temp2.localeCompare(", ") !== 0) {
    expectedAddress = expectedAddress + temp1;
  }
  const expectedKAM = rows[0].KAM;
  const expectedStatus = rows[0].Status;

  await accountList.assertEditAccount(
    1, //position of row want to validate
    expectedName,
    expectedEmail,
    expectedPhone,
    expectedAddress,
    expectedKAM,
    expectedStatus
  );
  await globalPageObject.closeOpeningForm();
});

When("User integrates with Creditsafe and inputs valid account data from csv file {string} and {string}", async (fileName1, fileName2) => {
  let object = readJsonFileToObject(fileName1);
  const rows = loader(convertPathFileDataToDataRegression(fileName2));
  let index = 0;

  const OrgNo = object[index].organisasjonsnummer;
  logWarningMessage(`Creating account with OrgNo number: "${OrgNo}"`);
  const CompanyName = object[index].navn;
  let EmailAddress = "";
  let CompanyPhone = "";
  const Country = object[index].forretningsadresse.land;
  const VisitingAddress = object[index].forretningsadresse.adresse.join().toString().replace(',', ' ').replace(',', ' ').replace(',', ' ');
  const ExtraAddress = "";
  const Postcode = object[index].forretningsadresse.postnummer;
  const City = object[index].forretningsadresse.kommune;
  const CreditScore = "";
  const CreditRating = "";
  const IndustryCode = object[index].naeringskode1.kode;
  const Industry = "";
  const CompanyRegistrationDateTemp = object[index].registreringsdatoEnhetsregisteret.toString();
  const CompanyRegistrationDate = CompanyRegistrationDateTemp.substring(8, 10) + "/" + CompanyRegistrationDateTemp.substring(5, 7) + "/" + CompanyRegistrationDateTemp.substring(0, 4);


  EmailAddress = rows[0].EmailAddress;
  CompanyPhone = rows[0].CompanyPhone;
  const Status = rows[0].Status;
  const PostalAddress = rows[0].PostalAddress;
  const PostalExtraAddress = rows[0].PostalExtraAddress;
  const PostalPostcode = rows[0].PostalPostcode;
  const PostalCity = rows[0].PostalCity;
  const InvoiceAddress = rows[0].InvoiceAddress;
  const InvoiceExtraAddress = rows[0].InvoiceExtraAddress;
  const InvoicePostcode = rows[0].InvoicePostcode;
  const InvoiceCity = rows[0].InvoiceCity;
  const EducationalLevel = rows[0].EducationalLevel;
  const KAM = rows[0].KAM;
  const PaymentType = rows[0].PaymentType;
  const PaymentFrequency = rows[0].PaymentFrequency;
  const PreferredCollectionDate = rows[0].PreferredCollectionDate;

  let temp = await accountForm.inputOrgNoNumerAndClickMagnifyingGlassIcon(OrgNo);
  logFailTestcase(temp, `Input OrgNo number "${OrgNo}" failed!`);

  temp = await accountFormInsurance.assertDataFilledInAccountFormAfterIntegrateCreditsafe(
    CompanyName,
    EmailAddress,
    CompanyPhone,
    Country,
    VisitingAddress,
    ExtraAddress,
    Postcode,
    City,
    CreditScore,
    CreditRating,
    IndustryCode,
    Industry,
    CompanyRegistrationDate
  );

  logFailTestcase(temp, `Assert data filled in Account Form after integrate with Creditsafe: OrgNo "${OrgNo}" failed!`);

  if (OrgNo) {
    await accountForm.inputOrgNoBasicInformationAccountCompanyForm(OrgNo);
  }
  if (CompanyName) {
    await accountForm.inputCompanyNameBasicInformationAccountCompanyForm(CompanyName);
  }
  if (EmailAddress) {
    await accountForm.inputEmailAddressCompanyBasicInformationAccountCompanyForm(EmailAddress);
  }
  if (CompanyPhone) {
    await accountForm.inputCompanyPhoneBasicInformationAccountCompanyForm(CompanyPhone);
  }
  if (Status) {
    await accountForm.inputStatusCompanyBasicInformationAccountCompanyForm(Status);
  }
  if (Country) {
    await accountForm.inputCountryCompanyBasicInformationAccountCompanyForm(Country);
  }
  if (VisitingAddress) {
    await accountForm.inputVisitingAddress_Address_AccountCompanyForm(VisitingAddress);
  }
  if (ExtraAddress) {
    await accountForm.inputVisitingExtraAddress_Address_AccountCompanyForm(ExtraAddress);
  }
  if (Postcode) {
    await accountForm.inputVisitingPostcodeAddressAccountCompanyForm(Postcode);
  }
  if (City) {
    await accountForm.inputVisitingCityAddressAccountCompanyForm(City);
  }
  if (PostalAddress) {
    await accountForm.inputPostalAddress_Address_AccountCompanyForm(PostalAddress);
  }
  if (PostalExtraAddress) {
    await accountForm.inputPostalExtraAddress_Address_AccountCompanyForm(PostalExtraAddress);
  }
  if (PostalPostcode) {
    await accountForm.inputPostalPostcodeAddressAccountCompanyForm(PostalPostcode);
  }
  if (PostalCity) {
    await accountForm.inputPostalCityAddressAccountCompanyForm(PostalCity);
  }
  if (InvoiceAddress) {
    await accountForm.inputInvoiceAddress_Address_AccountCompanyForm(InvoiceAddress);
  }
  if (InvoiceExtraAddress) {
    await accountForm.inputInvoiceExtraAddress_Address_AccountCompanyForm(InvoiceExtraAddress);
  }
  if (InvoicePostcode) {
    await accountForm.inputInvoicePostcodeAddressAccountCompanyForm(InvoicePostcode);
  }
  if (InvoiceCity) {
    await accountForm.inputInvoiceCityAddressAccountCompanyForm(InvoiceCity);
  }
  if (CreditScore) {
    await accountForm.inputCreditScoreOtherInformationAccountCompanyForm(CreditScore);
  }
  if (CreditRating) {
    await accountForm.inputCreditRatingOtherInformationAccountCompanyForm(CreditRating);
  }
  if (IndustryCode) {
    await accountForm.inputIndustryCodeOtherInformationAccountCompanyForm(IndustryCode);
  }
  if (Industry) {
    await accountForm.inputIndustryOtherInformationAccountCompanyForm(Industry);
  }
  if (EducationalLevel) {
    await accountForm.inputEducationLevelOtherInformationAccountCompanyForm(EducationalLevel);
  }
  if (CompanyRegistrationDate) {
    await accountForm.inputCompanyRegistrationDateOtherInformationAccountCompanyForm(CompanyRegistrationDate);
  }
  if (KAM) {
    await accountForm.inputKAMOtherInformationAccountCompanyForm(KAM);
  }
  if (PreferredCollectionDate) {
    await accountForm.inputPreferredCollectionDateOtherInformationAccountCompanyForm(PreferredCollectionDate);
  }
  if (PaymentType) {
    await accountForm.inputPaymentTypeOtherInformationAccountCompanyForm(PaymentType);
  }
  if (PaymentFrequency) {
    await accountForm.inputPaymentFrequencyOtherInformationAccountCompanyForm(PaymentFrequency);
  }

});

Then("System shows new company account integrated with Creditsafe in the Account list {string} and {string}", async (fileName1, fileName2) => {
  let object = readJsonFileToObject(fileName1);
  const rows = loader(convertPathFileDataToDataRegression(fileName2));
  let index = 0;

  await accountList.reloadAccountList();
  await accountList.reloadAccountList();

  const OrgNo = object[index].organisasjonsnummer;
  const CompanyName = object[index].navn;
  //const VisitingAddress = object[index].forretningsadresse.adresse.join().toString().replace(',',' ').replace(',',' ').replace(',',' ');
  const VisitingAddress = object[index].forretningsadresse.adresse;

  const EmailAddress = rows[0].EmailAddress;
  const CompanyPhone = rows[0].CompanyPhone;
  const PostalAddress = rows[0].PostalAddress;
  const InvoiceAddress = rows[0].InvoiceAddress;
  const KAM = rows[0].KAM;
  const Status = rows[0].Status;


  let expectedAddress = VisitingAddress;


  let temp1 = ", " + PostalAddress;
  let temp2 = ", " + InvoiceAddress;
  if (temp1.localeCompare(", ") !== 0) {
    expectedAddress = expectedAddress + temp2;
  }
  if (temp2.localeCompare(", ") !== 0) {
    expectedAddress = expectedAddress + temp1;
  }

  await accountList.assertCreateAccount(
    1, //position of row want to validate
    CompanyName,
    EmailAddress,
    CompanyPhone,
    expectedAddress,
    KAM,
    Status
  );

  await globalPageObject.closeOpeningForm();
});

Then("System shows new company account integrated with Creditsafe in account detail {string} and {string}", async (fileName1, fileName2) => {
  let object = readJsonFileToObject(fileName1);
  const rows = loader(convertPathFileDataToDataRegression(fileName2));
  let index = 0;

  await accountList.reloadAccountList();

  const OrgNo = object[index].organisasjonsnummer;
  const CompanyName = object[index].navn;
  const Address = object[index].forretningsadresse.adresse.join().toString().replace(',', ' ').replace(',', ' ').replace(',', ' ');
  const Postcode = object[index].forretningsadresse.postnummer;

  const Industry = "";
  const CreditRating = "";
  await globalPeripherals.pressTabCurrentElement();
  await accountList.openDetailAccountByName(CompanyName);
  await globalPageObject.waitForProgressBarLoaded();
  let temp = await accountTabSummary.selectSummaryViewLayout("Summary");
  logFailTestcase(temp, `Select layout for summary tab failed!`);
  await accountDetailsLeftSide.assertCreateCompanyAccountAtAccountDetail(
    CompanyName,
    OrgNo,
    Address,
    Postcode,
    Industry,
    CreditRating
  );

});