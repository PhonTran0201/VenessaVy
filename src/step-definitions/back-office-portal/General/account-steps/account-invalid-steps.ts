import { Before, Then, When } from "@cucumber/cucumber";
import { fail } from "assert";
import { AccountForm } from "../../../../page-objects/back-office-portal/general/account/account-forms/AccountForm";
import { AccountList } from "../../../../page-objects/back-office-portal/general/account/account-list/AccountList";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { ValidateField } from "../../../../shared/classes";
import { convertPathFileDataToDataRegression, logFailMessage, logFailTestcase, logInfoMessage, logSuccessMessage, logWarningMessage, randomModulus11ForSSN } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { dataTestcase, scenarioName, subErrorMessages } from '../../../../shared/variables';


const loader = require("csv-load-sync");
let accountForm: AccountForm;
let accountList: AccountList;
let globalPageObject: GlobalPageObject;

let fileDataCreate: string = "";
//Variable using to compare
let expectedName: string;
let expectedAddress: string;

Before(async function () {
  const context: ICommonContext = this.context;
  accountForm = new AccountForm(context.driverService);
  accountList = new AccountList(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
});

When("User inputs invalid new account data person from csv file {string}", async (filename) => {
  let rows = loader(convertPathFileDataToDataRegression(filename));
  fileDataCreate = filename;
  for (let i = 0; i < rows.length; i++) {
    let temp = await accountList.openCreateNewAccountPersonForm();
    logFailTestcase(temp, "Open account form failed!");
    let NIN = rows[i].NIN;
    if (rows[i].NIN == "") {
      NIN = randomModulus11ForSSN();
    }
    /*const NIN = (() => {
      if (rows[i].NIN = ""){
        return randomModulus11ForSSN();
      } else {
        return rows[i].NIN;
      }
    })*/
    //const NIN = randomModulus11ForSSN();
    const firstName = rows[i].FirstName;
    const lastName = rows[i].LastName;
    const DOB = rows[i].DOB;
    const gender = rows[i].Gender;
    const address = rows[i].Address;
    const postcode = rows[i].Postcode;
    const city = rows[i].City;
    const country = rows[i].Country;
    const emailAddress = rows[i].EmailAddress;
    const phoneNumber = rows[i].PhoneNumber;
    const preferredCommunication = rows[i].PreferredCommunication;
    const status = rows[i].Status;
    const KAM = rows[i].KAM;
    const paymentType = rows[i].PaymentType;
    const paymentFrequency = rows[i].PaymentFrequency;
    const preferredCollectionDate = rows[i].PreferredCollectionDate;
    // const source = rows[i].Source;
    // const scoring = rows[i].Scoring;
    let validationField = new ValidateField(address, i, true, [], []);

    expectedName = firstName + " " + lastName;

    if (NIN) {
      await accountForm.inputNINBasicInformationAccountPersonForm(NIN);
    }
    if (firstName) {
      await accountForm.inputFirstNameBasicInformationAccountPersonForm(firstName);
    }
    if (lastName) {
      await accountForm.inputLastNameBasicInformationAccountPersonForm(lastName);
    }
    if (DOB) {
      await accountForm.inputDOBBasicInformationAccountPersonForm(DOB);
    }
    if (gender) {
      await accountForm.inputGenderBasicInformationAccountPersonForm(gender);
    }
    if (address) {
      await accountForm.inputAddressBasicInformationAccountPersonForm(address);
    }
    if (postcode) {
      await accountForm.inputPostcodeBasicInformationAccountPersonForm(postcode);
    }
    if (city) {
      await accountForm.inputCityBasicInformationAccountPersonForm(city);
    }
    if (country) {
      await accountForm.inputCountryBasicInformationAccountPersonForm(country);
    }
    if (emailAddress) {
      await accountForm.inputEmailAddressBasicInformationAccountPersonForm(emailAddress);
    }
    if (phoneNumber) {
      await accountForm.inputPhoneNumberBasicInformationAccountPersonForm(phoneNumber);
    }
    if (preferredCommunication) {
      await accountForm.inputPreferredCommunicationBasicInformationAccountPersonForm(preferredCommunication);
    }
    if (status) {
      await accountForm.inputStatusBasicInformationAccountPersonForm(status);
    }
    if (KAM) {
      await accountForm.inputKAMOtherInformationAccountPersonForm(KAM);
    }
    if (paymentType) {
      await accountForm.inputPaymentTypeOtherInformationAccountPersonForm(paymentType);
    }
    if (paymentFrequency) {
      await accountForm.inputPaymentFrequencyOtherInformationAccountPersonForm(paymentFrequency);
    }
    if (preferredCollectionDate) {
      await accountForm.inputPreferredCollectionDateOtherInformationAccountPersonForm(preferredCollectionDate);
    }

    temp = await globalPageObject.pressSaveForm();
    logFailTestcase(temp, "Can't press save form!");
    validationField = await accountForm.validateFields(validationField);
    if (!validationField.status) {
      temp = await globalPageObject.pressCancelForm();
      logFailTestcase(temp, "Can't press cancel form");
    }
    dataTestcase.push(validationField);
  }
});

When("User updates an invalid person account from precondition steps from csv file {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  fileDataCreate = filename;
  await accountList.reloadAccountList();
  for (let i = 0; i < rows.length; i++) {
    const selectedAccount = rows[i].SelectedAccount;
    let temp = await accountList.openEditAccountFormByName(selectedAccount);
    logFailTestcase(temp);

    temp = await accountForm.clearOldDataOnAccountForm();
    logFailTestcase(temp, "Clear old data on account form failed!");
    //const NIN = row.NIN;
    let NIN = rows[i].NIN;
    if (rows[i].NIN == "") {
      NIN = randomModulus11ForSSN();
    } //get random NIN with length = 11
    const firstName = rows[i].FirstName;
    const lastName = rows[i].LastName;
    const DOB = rows[i].DOB;
    const gender = rows[i].Gender;
    const address = rows[i].Address;
    const postcode = rows[i].Postcode;
    const city = rows[i].City;
    const country = rows[i].Country;
    const emailAddress = rows[i].EmailAddress;
    const phoneNumber = rows[i].PhoneNumber;
    const preferredCommunication = rows[i].PreferredCommunication;
    const status = rows[i].Status;
    const KAM = rows[i].KAM;
    const paymentType = rows[i].PaymentType;
    const paymentFrequency = rows[i].PaymentFrequency;
    const preferredCollectionDate = rows[i].PreferredCollectionDate;
    // const source = rows[i].Source;
    // const scoring = rows[i].Scoring;
    let validationField = new ValidateField(address, i, true, [], []);
    //ACTIONS
    if (NIN) {
      temp = await accountForm.inputNINBasicInformationAccountPersonForm(NIN);
      logFailTestcase(temp, "Input NIN on Account Person Form Failed !");
    }
    if (firstName) {
      temp = await accountForm.inputFirstNameBasicInformationAccountPersonForm(firstName);
      logFailTestcase(temp, "Input First Name on Account Person Form Failed !");
    }
    if (lastName) {
      temp = await accountForm.inputLastNameBasicInformationAccountPersonForm(lastName);
      logFailTestcase(temp, "Input Last Name on Account Person Form Failed !");
    }
    if (DOB) {
      temp = await accountForm.inputDOBBasicInformationAccountPersonForm(DOB);
      logFailTestcase(temp, "Input DOB on Account Person Form Failed !");
    }
    if (gender) {
      temp = await accountForm.inputGenderBasicInformationAccountPersonForm(gender);
      logFailTestcase(temp, "Input Gender on Account Person Form Failed !");
    }
    if (address) {
      temp = await accountForm.inputAddressBasicInformationAccountPersonForm(address);
      logFailTestcase(temp, "Input Address on Account Person Form Failed !");
    }
    if (postcode) {
      temp = await accountForm.inputPostcodeBasicInformationAccountPersonForm(postcode);
      logFailTestcase(temp, "Input Postcode on Account Person Form Failed !");
    }
    if (city) {
      temp = await accountForm.inputCityBasicInformationAccountPersonForm(city);
      logFailTestcase(temp, "Input City on Account Person Form Failed !");
    }
    if (country) {
      temp = await accountForm.inputCountryBasicInformationAccountPersonForm(country);
      logFailTestcase(temp, "Input Country on Account Person Form Failed !");
    }
    if (emailAddress) {
      temp = await accountForm.inputEmailAddressBasicInformationAccountPersonForm(emailAddress);
      logFailTestcase(temp, "Input Email Address on Account Person Form Failed !");
    }
    if (phoneNumber) {
      temp = await accountForm.inputPhoneNumberBasicInformationAccountPersonForm(phoneNumber);
      logFailTestcase(temp, "Input Phone Number on Account Person Form Failed !");
    }
    if (preferredCommunication) {
      temp = await accountForm.inputPreferredCommunicationBasicInformationAccountPersonForm(preferredCommunication);
      logFailTestcase(temp, "Input Preferred Communication on Account Person Form Failed !");
    }
    if (status) {
      temp = await accountForm.inputStatusBasicInformationAccountPersonForm(status);
      logFailTestcase(temp, "Input Status on Account Person Form Failed !");
    }
    if (KAM) {
      temp = await accountForm.inputKAMOtherInformationAccountPersonForm(KAM);
      logFailTestcase(temp, "Input KAM on Account Person Form Failed !");
    }
    if (paymentType) {
      temp = await accountForm.inputPaymentTypeOtherInformationAccountPersonForm(paymentType);
      logFailTestcase(temp, "Input Payment Type on Account Person Form Failed !");
    }
    if (paymentFrequency) {
      temp = await accountForm.inputPaymentFrequencyOtherInformationAccountPersonForm(paymentFrequency);
      logFailTestcase(temp, "Input Payment Frequency on Account Person Form Failed !");
    }
    if (preferredCollectionDate) {
      temp = await accountForm.inputPreferredCollectionDateOtherInformationAccountPersonForm(preferredCollectionDate);
      logFailTestcase(temp, "Input Preferred Collection Date on Account Person Form Failed !");
    }
    await globalPageObject.pressSaveForm();
    validationField = await accountForm.validateFields(validationField);
    if (!validationField.status) {
      await globalPageObject.pressCancelForm();
    }
    dataTestcase.push(validationField);
  }
});

When("User inputs invalid new account company data from csv file {string}", async (filename: string) => {
  let rows = loader(convertPathFileDataToDataRegression(filename));
  fileDataCreate = filename;
  await accountList.reloadAccountList();
  for (let i = 0; i < rows.length; i++) {
    let temp = await accountList.openCreateNewAccountCompanyForm();
    logFailTestcase(temp);
    let OrgNo = rows[i].OrgNo;
    if (rows[i].OrgNo == "") {
      OrgNo = randomModulus11ForSSN();
    }
    //const OrgNo = row.OrgNo;
    //const OrgNo = randomModulus11ForSSN(); //get random OrgNo with length = 11

    const CompanyName = rows[i].CompanyName;
    const EmailAddress = rows[i].EmailAddress;
    const CompanyPhone = rows[i].CompanyPhone;
    const Status = rows[i].Status;
    const Country = rows[i].Country;

    const VisitingAddress = rows[i].VisitingAddress;
    const VisitingExtraAddress = rows[i].VisitingExtraAddress;
    const VisitingPostcode = rows[i].VisitingPostcode;
    const VisitingCity = rows[i].VisitingCity;

    const PostalAddress = rows[i].PostalAddress;
    const PostalExtraAddress = rows[i].PostalExtraAddress;
    const PostalPostcode = rows[i].PostalPostcode;
    const PostalCity = rows[i].PostalCity;

    const InvoiceAddress = rows[i].InvoiceAddress;
    const InvoiceExtraAddress = rows[i].InvoiceExtraAddress;
    const InvoicePostcode = rows[i].InvoicePostcode;
    const InvoiceCity = rows[i].InvoiceCity;

    const CreditScore = rows[i].CreditScore;
    const CreditRating = rows[i].CreditRating;
    const IndustryCode = rows[i].IndustryCode;
    const Industry = rows[i].Industry;
    const EducationalLevel = rows[i].EducationalLevel;
    const CompanyRegistrationDate = rows[i].CompanyRegistrationDate;
    const KAM = rows[i].KAM;
    const PreferredCollectionDate = rows[i].PreferredCollectionDate;
    const PaymentType = rows[i].PaymentType;
    const PaymentFrequency = rows[i].PaymentFrequency;


    let validationField = new ValidateField(VisitingAddress, i, true, [], []);

    expectedName = CompanyName;
    let temp1 = ", " + PostalAddress;
    let temp2 = ", " + InvoiceAddress;
    if (temp1.localeCompare(", ") !== 0) {
      expectedAddress = expectedAddress + temp2;
    }
    if (temp2.localeCompare(", ") !== 0) {
      expectedAddress = expectedAddress + temp1;
    }


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
    if (VisitingExtraAddress) {
      await accountForm.inputVisitingExtraAddress_Address_AccountCompanyForm(VisitingExtraAddress);
    }
    if (VisitingPostcode) {
      await accountForm.inputVisitingPostcodeAddressAccountCompanyForm(VisitingPostcode);
    }
    if (VisitingCity) {
      await accountForm.inputVisitingCityAddressAccountCompanyForm(VisitingCity);
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




    // We don't need to check input invalid data here
    temp = await globalPageObject.pressSaveForm();
    logFailTestcase(temp);
    validationField = await accountForm.validateFields(validationField);
    if (!validationField.status) {
      let temp = await globalPageObject.pressCancelForm();
      logFailTestcase(temp);
    }
    dataTestcase.push(validationField);
  }
});

When("User updates an invalid company account from precondition steps from csv file {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  fileDataCreate = filename;
  for (let i = 0; i < rows.length; i++) {
    logWarningMessage(`Checking at line ${i + 1}`);
    await accountList.reloadAccountList();
    const selectedAccount = rows[i].SelectedAccount;
    let temp = await accountList.openEditAccountFormByName(selectedAccount);
    logFailTestcase(temp);
    let OrgNo = rows[i].OrgNo;
    if (rows[i].OrgNo == "") {
      OrgNo = randomModulus11ForSSN();
    }
    //const OrgNo = row.OrgNo;
    //const OrgNo = randomModulus11ForSSN(); //get random OrgNo with length = 11

    const CompanyName = rows[i].CompanyName;
    const EmailAddress = rows[i].EmailAddress;
    const CompanyPhone = rows[i].CompanyPhone;
    const Status = rows[i].Status;
    const Country = rows[i].Country;

    const VisitingAddress = rows[i].VisitingAddress;
    const VisitingExtraAddress = rows[i].VisitingExtraAddress;
    const VisitingPostcode = rows[i].VisitingPostcode;
    const VisitingCity = rows[i].VisitingCity;

    const PostalAddress = rows[i].PostalAddress;
    const PostalExtraAddress = rows[i].PostalExtraAddress;
    const PostalPostcode = rows[i].PostalPostcode;
    const PostalCity = rows[i].PostalCity;

    const InvoiceAddress = rows[i].InvoiceAddress;
    const InvoiceExtraAddress = rows[i].InvoiceExtraAddress;
    const InvoicePostcode = rows[i].InvoicePostcode;
    const InvoiceCity = rows[i].InvoiceCity;

    const CreditScore = rows[i].CreditScore;
    const CreditRating = rows[i].CreditRating;
    const IndustryCode = rows[i].IndustryCode;
    const Industry = rows[i].Industry;
    const EducationalLevel = rows[i].EducationalLevel;
    const CompanyRegistrationDate = rows[i].CompanyRegistrationDate;
    const KAM = rows[i].KAM;
    const PreferredCollectionDate = rows[i].PreferredCollectionDate;
    const PaymentType = rows[i].PaymentType;
    const PaymentFrequency = rows[i].PaymentFrequency;


    let validationField = new ValidateField(VisitingAddress, i, true, [], []);

    await accountForm.clearOldDataOnAccountForm();
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
    if (VisitingExtraAddress) {
      await accountForm.inputVisitingExtraAddress_Address_AccountCompanyForm(VisitingExtraAddress);
    }
    if (VisitingPostcode) {
      await accountForm.inputVisitingPostcodeAddressAccountCompanyForm(VisitingPostcode);
    }
    if (VisitingCity) {
      await accountForm.inputVisitingCityAddressAccountCompanyForm(VisitingCity);
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

    // We don't need to check input invalid data here
    temp = await globalPageObject.pressSaveForm();
    logFailTestcase(temp);
    validationField = await accountForm.validateFields(validationField);
    if (!validationField.status) {
      temp = await globalPageObject.pressCancelForm();
      logFailTestcase(temp);
    }
    dataTestcase.push(validationField);
  }
});

Then("System shows error notifications fields Account", async function () {
  const rows = loader(convertPathFileDataToDataRegression(fileDataCreate));
  let len = rows.length;
  let countError = 0;

  for (let i = 0; i < len; i++) {
    expectedName = rows[i].CompanyName;

    console.log(`\nChecking case at Line ${i + 1} at file CSV - ${expectedName} :`);

    if (dataTestcase[i].message.length === 0 && dataTestcase[i].toastMessage.length === 0) {
      countError++;
      logWarningMessage(`\nWe didn't get any error validation messages in Account form!`);
      logFailMessage(`\n\tLine ${i + 1} is failed!`);
    }
    else {
      logInfoMessage(`\nError validation messages in Account form are:`);
      for (const record of dataTestcase[i].message) {
        logFailMessage("\t" + record);
      }
      for (const record of dataTestcase[i].toastMessage) {
        logFailMessage("\t" + record);
      }
      logSuccessMessage(`\n\tLine ${i + 1} is passed!`);
    }
  }

  if (countError > 0) {
    fail(scenarioName + ": Test case is failed!" + subErrorMessages);
  }
  else {
    logSuccessMessage(scenarioName + "\n\tStep: System shows error notifications fields Account: is passed!");
  }

});

Then("System does not show new account in the Account list", async function () {
  const rows = loader(convertPathFileDataToDataRegression(fileDataCreate));
  let len = rows.length;
  for (let i = 0; i < len; i++) {
    let name = rows[i].CompanyName;
    if (!name) {
      name = rows[i].FirstName + " " + rows[i].LastName;
    }
    name = name.toString().trim();
    let phone = rows[i].CompanyPhone;
    if (!phone) {
      phone = rows[i].PhoneNumber;
    }
    const email = rows[i].EmailAddress;

    let temp = await accountList.assertPersonExistence(
      1, //position of row want to validate
      name,
      email,
      phone
    );
    if (!temp) {
      fail(scenarioName + ": is failed!" + subErrorMessages);
    }
  }
});