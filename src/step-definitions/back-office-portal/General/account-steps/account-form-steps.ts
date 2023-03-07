import { Before, Then, When } from "@cucumber/cucumber";
import { AccountForm } from "../../../../page-objects/back-office-portal/general/account/account-forms/AccountForm";
import { GlobalBrowserWindowHandle } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalBrowserWindowHandle";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { convertPathFileDataToDataRegression, logFailTestcase } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { pushObjectToDataArrayWithUniqueKey } from "../../../../storage-data/functions/data-test-execution";


const loader = require("csv-load-sync");
let globalBrowserWindowHandle: GlobalBrowserWindowHandle;
let globalPageObject: GlobalPageObject;
let accountForm: AccountForm;

Before(async function () {
  const context: ICommonContext = this.context;
  globalBrowserWindowHandle = new GlobalBrowserWindowHandle(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
  accountForm = new AccountForm(context.driverService);
});

When("User checks checkbox Create sales opportunity on account form", async function () {
  let temp = await accountForm.checkCreateSalesOpportunityOnAccountForm();
  logFailTestcase(temp, "Check checkbox Create Sales Opportunity failed!");
});
When("User checks checkbox Create contact on account form", async function () {
  let temp = await accountForm.checkCreateContactOnAccountForm();
  logFailTestcase(temp, "Check checkbox Create contact failed!");
});

Then("User checks list at KAM dropdown on Person Account form {string}", async function (filename) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const Accounts = rows[0].Accounts.split(";");
  for (const account of Accounts) {
    const temp = await accountForm.inputKAMOtherInformationAccountPersonForm(account);
    logFailTestcase(temp, `Account "${account}" is Not found on dropdown list!`);
  }

  let ExclusionAccounts = rows[0].ExclusionAccounts;
  if (ExclusionAccounts) {
    ExclusionAccounts = ExclusionAccounts.split(";");
    for (const ExclusionAccount of ExclusionAccounts) {
      const temp = await accountForm.inputKAMOtherInformationAccountPersonForm(ExclusionAccount);
      logFailTestcase(!temp, `Account "${ExclusionAccount}" is found on this tenant. It belongs to other Organization!`);
    }
  }
});

Then("User checks list at KAM dropdown on Company Account form {string}", async function (filename) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const Accounts = rows[0].Accounts.split(";");
  for (const account of Accounts) {
    const temp = await accountForm.inputKAMOtherInformationAccountCompanyForm(account);
    logFailTestcase(temp, `Account "${account}" is Not found on dropdown list!`);
  }

  let ExclusionAccounts = rows[0].ExclusionAccounts;
  if (ExclusionAccounts) {
    ExclusionAccounts = ExclusionAccounts.split(";");
    for (const ExclusionAccount of ExclusionAccounts) {
      const temp = await accountForm.inputKAMOtherInformationAccountCompanyForm(ExclusionAccount);
      logFailTestcase(!temp, `Account "${ExclusionAccount}" is found on this tenant. It belongs to other Organization!`);
    }
  }
});

Then("User saves details of person account form", async () => {
  const FirstName_AccountPerson = await accountForm.getFirstNameValueOnAccountPersonForm();
  const LastName_AccountPerson = await accountForm.getLastNameValueOnAccountPersonForm();

  const NIN_AccountPerson = await accountForm.getNINValueOnAccountPersonForm();
  const EmailAddress_AccountPerson = await accountForm.getEmailAddressValueOnAccountPersonForm();
  const PhoneNumber_AccountPerson = await accountForm.getPhoneNumberValueOnAccountPersonForm();
  const HomeNumber_AccountPerson = "";
  const Address_AccountPerson = await accountForm.getAddressValueOnAccountPersonForm();
  const Postcode_AccountPerson = await accountForm.getPostcodeValueOnAccountPersonForm();
  const City_AccountPerson = await accountForm.getCityValueOnAccountPersonForm();

  const url = await globalBrowserWindowHandle.getCurrentUrl();

  pushObjectToDataArrayWithUniqueKey("FirstName_AccountPerson", FirstName_AccountPerson);
  pushObjectToDataArrayWithUniqueKey("LastName_AccountPerson", LastName_AccountPerson);
  pushObjectToDataArrayWithUniqueKey("NIN_AccountPerson", NIN_AccountPerson);
  pushObjectToDataArrayWithUniqueKey("EmailAddress_AccountPerson", EmailAddress_AccountPerson);
  pushObjectToDataArrayWithUniqueKey("PhoneNumber_AccountPerson", PhoneNumber_AccountPerson);
  pushObjectToDataArrayWithUniqueKey("HomeNumber_AccountPerson", HomeNumber_AccountPerson);
  pushObjectToDataArrayWithUniqueKey("Address_AccountPerson", Address_AccountPerson);
  pushObjectToDataArrayWithUniqueKey("Postcode_AccountPerson", Postcode_AccountPerson);
  pushObjectToDataArrayWithUniqueKey("City_AccountPerson", City_AccountPerson);

  pushObjectToDataArrayWithUniqueKey("url", url);
  pushObjectToDataArrayWithUniqueKey("CustomerId", url.split("id=")[1].split("&")[0]);

  await globalPageObject.closeOpeningForm();
});

When("User inputs data input person account from {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const row = rows[0];
  const firstName = row.FirstName;
  const lastName = row.LastName;
  const DOB = row.DOB;
  const gender = row.Gender;
  const address = row.Address;
  const postcode = row.Postcode;
  const city = row.City;
  const country = row.Country;
  const emailAddress = row.EmailAddress;
  const phoneNumber = row.PhoneNumber;
  const preferredCommunication = row.PreferredCommunication;
  const status = row.Status;
  const KAM = row.KAM;
  const paymentRemarks = row.PaymentRemarks;
  const paymentType = row.PaymentType;
  const paymentFrequency = row.PaymentFrequency;
  const preferredCollectionDate = row.PreferredCollectionDate;
  // const source = row.Source;
  // const scoring = row.Scoring;

  let temp = true;
  //ACTIONS
  if (firstName) {
    temp = await accountForm.inputFirstNameBasicInformationAccountPersonForm(firstName);
    logFailTestcase(temp, "inputFirstNameBasicInformationAccountPersonForm fails");
  }

  if (lastName) {
    temp = await accountForm.inputLastNameBasicInformationAccountPersonForm(lastName);
    logFailTestcase(temp, "inputFirstNameBasicInformationAccountPersonForm fails");
  }

  if (DOB) {
    temp = await accountForm.inputDOBBasicInformationAccountPersonForm(DOB);
    logFailTestcase(temp, "inputDOBBasicInformationAccountPersonForm fails");
  }

  if (gender) {
    temp = await accountForm.inputGenderBasicInformationAccountPersonForm(gender);
    logFailTestcase(temp, "inputGenderBasicInformationAccountPersonForm fails");
  }

  if (address) {
    temp = await accountForm.inputAddressBasicInformationAccountPersonForm(address);
    logFailTestcase(temp, "inputAddressBasicInformationAccountPersonForm fails");
  }

  if (postcode) {
    temp = await accountForm.inputPostcodeBasicInformationAccountPersonForm(postcode);
    logFailTestcase(temp, "inputPostcodeBasicInformationAccountPersonForm fails");
  }

  if (city) {
    temp = await accountForm.inputCityBasicInformationAccountPersonForm(city);
    logFailTestcase(temp, "inputCityBasicInformationAccountPersonForm fails");
  }

  if (country) {
    temp = await accountForm.inputCountryBasicInformationAccountPersonForm(country);
    logFailTestcase(temp, "inputCountryBasicInformationAccountPersonForm fails");
  }

  if (emailAddress) {
    temp = await accountForm.inputEmailAddressBasicInformationAccountPersonForm(emailAddress);
    logFailTestcase(temp, "inputCountryBasicInformationAccountPersonForm fails");
  }

  if (phoneNumber) {
    temp = await accountForm.inputPhoneNumberBasicInformationAccountPersonForm(phoneNumber);
    logFailTestcase(temp, "inputPhoneNumberBasicInformationAccountPersonForm fails");
  }

  if (preferredCommunication) {
    temp = await accountForm.inputPreferredCommunicationBasicInformationAccountPersonForm(preferredCommunication);
    logFailTestcase(temp, "inputPreferredCommunicationBasicInformationAccountPersonForm fails");
  }

  if (status) {
    temp = await accountForm.inputStatusBasicInformationAccountPersonForm(status);
    logFailTestcase(temp, "inputStatusBasicInformationAccountPersonForm fails");
  }

  if (KAM) {
    temp = await accountForm.inputKAMOtherInformationAccountPersonForm(KAM);
    logFailTestcase(temp, "inputKAMOtherInformationAccountPersonForm fails");
  }

  // if (paymentRemarks) {
  //   temp = await accountForm.inputPaymentRemarksOtherInformationAccountPersonForm(paymentRemarks);
  //   logFailTestcase(temp, `Input paymentRemarks failed!`);
  // }

  if (paymentType) {
    temp = await accountForm.inputPaymentTypeOtherInformationAccountPersonForm(paymentType);
    logFailTestcase(temp, "inputPaymentTypeOtherInformationAccountPersonForm fails");
  }

  if (paymentFrequency) {
    temp = await accountForm.inputPaymentFrequencyOtherInformationAccountPersonForm(paymentFrequency);
    logFailTestcase(temp, "inputPaymentFrequencyOtherInformationAccountPersonForm fails");
  }

  if (preferredCollectionDate) {
    temp = await accountForm.inputPreferredCollectionDateOtherInformationAccountPersonForm(preferredCollectionDate);
    logFailTestcase(temp, "inputPreferredCollectionDateOtherInformationAccountPersonForm fails");
  }
});