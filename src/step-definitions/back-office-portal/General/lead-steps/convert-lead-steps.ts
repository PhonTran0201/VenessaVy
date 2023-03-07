import { Before, Given, Then, When } from "@cucumber/cucumber";
import { DataRepo } from "../../../../core/modals/DataRepo";
import { AccountForm } from "../../../../page-objects/back-office-portal/general/account/account-forms/AccountForm";
import { AccountList } from "../../../../page-objects/back-office-portal/general/account/account-list/AccountList";
import { ContactForm } from "../../../../page-objects/back-office-portal/general/contact/contact-forms/ContactForm";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { LeadList } from "../../../../page-objects/back-office-portal/general/lead/lead-list/LeadList";
import { ValidateField } from "../../../../shared/classes";
import { convertPathFileDataToDataRegression, logFailTestcase, randomModulus11ForSSN } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { dataTestcase } from "../../../../shared/variables";


const loader = require("csv-load-sync");
let leadList: LeadList;
let accountList: AccountList;
let accountForm: AccountForm;
let contactForm: ContactForm;
let globalPageObject: GlobalPageObject;
//Variable using to compare
let expectedName: string;
let expectedNIN: string;
let expectedEmail: string;
let expectedPhone: string;
let expectedAddress: string;
let expectedStatus: string;

let typeLead: string = "person";

Before(async function () {
  const context: ICommonContext = this.context;
  leadList = new LeadList(context.driverService);
  accountList = new AccountList(context.driverService);
  accountForm = new AccountForm(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
  contactForm = new ContactForm(context.driverService);
});

Given("User converts a lead to person from precondition steps", async () => {
  typeLead = "person";
  await leadList.reloadLeadList();
  let temp = await leadList.openConvertLeadToPersonForm();
  logFailTestcase(temp);
});

Given("User converts a lead to company from precondition steps", async () => {
  typeLead = "company";
  await leadList.reloadLeadList();
  let temp = await leadList.openConvertLeadToCompanyForm();
  logFailTestcase(temp);
});

Given("User opens create new person account form", async () => {
  typeLead = "person";
  let temp = await accountList.openCreateNewAccountPersonForm();
  logFailTestcase(temp, "Open Create new person account form failed!");
});

Given("User opens create new company account form", async () => {
  typeLead = "company";
  let temp = await accountList.openCreateNewAccountCompanyForm();
  logFailTestcase(temp, "Open Create new company account form failed!");
});

When("User inputs valid account data from csv file {string}", async (filename: string) => {
   const rows = (await DataRepo.getInstance().loadData(filename))[0];
  await globalPageObject.waitForProgressBarLoaded_v2();
  await globalPageObject.waitForProgressBarLoaded_v2();
  if (!typeLead) {
    typeLead = rows.TypeLead;
  }
  const Organization = rows.Organization;
  if (typeLead.localeCompare("person") === 0) {
    let NIN = rows.NIN;
    if (!NIN) {
      NIN = randomModulus11ForSSN(); //get random NIN with length = 11
      dataTestcase.push(new ValidateField("OrgNoAccount", 0, true, [NIN], []));
    }
    const firstName = rows.FirstName;
    const lastName = rows.LastName;
    const DOB = rows.DOB;
    const gender = rows.Gender;
    const address = rows.Address;
    const postcode = rows.Postcode;
    const city = rows.City;
    const country = rows.Country;
    const emailAddress = rows.EmailAddress;
    const phoneNumber = rows.PhoneNumber;
    const preferredCommunication = rows.PreferredCommunication;
    const status = rows.Status;
    const KAM = rows.KAM;
    const paymentRemarks = rows.PaymentRemarks;
    const paymentType = rows.PaymentType;
    const paymentFrequency = rows.PaymentFrequency;
    const preferredCollectionDate = rows.PreferredCollectionDate;
    const convertFromExistingAccount = rows.ConvertFromExistingAccount;

    expectedName = firstName + " " + lastName;
    expectedNIN = NIN;
    expectedEmail = emailAddress;
    expectedPhone = phoneNumber;
    expectedAddress = address;
    expectedStatus = status;

    if (Organization) {
      let temp = await accountForm.inputOrganizationAccountPersonForm(Organization);
      logFailTestcase(temp, "Input incorrect Organization");
    }
    if (NIN) {
      let temp = await accountForm.inputNINBasicInformationAccountPersonForm(NIN);
      logFailTestcase(temp, "Input incorrect NIN");
    }
    if (firstName) {
      let temp = await accountForm.inputFirstNameBasicInformationAccountPersonForm(firstName);
      logFailTestcase(temp, "Input incorrect first name");
    }
    if (lastName) {
      let temp = await accountForm.inputLastNameBasicInformationAccountPersonForm(lastName);
      logFailTestcase(temp, "Input incorrect last name");
    }
    if (DOB) {
      let temp = await accountForm.inputDOBBasicInformationAccountPersonForm(DOB);
      logFailTestcase(temp, "Input incorrect DOB");
    }
    if (gender) {
      let temp = await accountForm.inputGenderBasicInformationAccountPersonForm(gender);
      logFailTestcase(temp, "Input incorrect Gender");
    }
    if (address) {
      let temp = await accountForm.inputAddressBasicInformationAccountPersonForm(address);
      logFailTestcase(temp, "Input incorrect Address");
    }
    if (postcode) {
      let temp = await accountForm.inputPostcodeBasicInformationAccountPersonForm(postcode);
      logFailTestcase(temp, "Input incorrect Postcode");
    }
    if (city) {
      let temp = await accountForm.inputCityBasicInformationAccountPersonForm(city);
      logFailTestcase(temp, "Input incorrect City");
    }
    if (country) {
      let temp = await accountForm.inputCountryBasicInformationAccountPersonForm(country);
      logFailTestcase(temp, "Input incorrect Country");
    }
    if (emailAddress) {
      let temp = await accountForm.inputEmailAddressBasicInformationAccountPersonForm(emailAddress);
      logFailTestcase(temp, "Input incorrect Email Address");
    }
    if (phoneNumber) {
      let temp = await accountForm.inputPhoneNumberBasicInformationAccountPersonForm(phoneNumber);
      logFailTestcase(temp, "Input incorrect Phone Number");
    }
    if (preferredCommunication) {
      let temp = await accountForm.inputPreferredCommunicationBasicInformationAccountPersonForm(preferredCommunication);
      logFailTestcase(temp, "Input incorrect Preferred Communication");
    }
    if (status) {
      let temp = await accountForm.inputStatusBasicInformationAccountPersonForm(status);
      logFailTestcase(temp, "Input incorrect Status");
    }
    if (KAM) {
      let temp = await accountForm.inputKAMOtherInformationAccountPersonForm(KAM);
      logFailTestcase(temp, "Input incorrect KAM");
    }
    // if(paymentRemarks){
    //   let temp = await accountForm.inputPaymentRemarksOtherInformationAccountPersonForm(paymentRemarks);
    //   logFailTestcase(temp, `Input paymentRemarks failed!`);
    // }
    if (paymentType) {
      let temp = await accountForm.inputPaymentTypeOtherInformationAccountPersonForm(paymentType);
      logFailTestcase(temp, "Input incorrect Payment Type");
    }
    if (paymentFrequency) {
      let temp = await accountForm.inputPaymentFrequencyOtherInformationAccountPersonForm(paymentFrequency);
      logFailTestcase(temp, "Input incorrect Payment frequency");
    }
    if (preferredCollectionDate) {
      let temp = await accountForm.inputPreferredCollectionDateOtherInformationAccountPersonForm(preferredCollectionDate);
      logFailTestcase(temp, "Input incorrect Preferred Collection Date");
    }
    if (DOB) {
      let temp = await accountForm.validateDOBValueOnAccountPersonForm(DOB);
      logFailTestcase(temp, "Incorrect DOB!");
    }


  }
  if (typeLead.localeCompare("company") === 0) {
    let OrgNo = rows.OrgNo;
    if (rows.OrgNo == "") {
      OrgNo = randomModulus11ForSSN();
      dataTestcase.push(new ValidateField("OrgNoAccount", 0, true, [OrgNo], []));
    }

    const CompanyName = rows.CompanyName;
    const EmailAddress = rows.EmailAddress;
    const CompanyPhone = rows.CompanyPhone;
    const Status = rows.Status;
    const Country = rows.Country;
    const InvoiceEmail = rows.InvoiceEmail;
    const ContactPerson = rows.ContactPerson;
    const VisitingAddress = rows.VisitingAddress;
    const VisitingExtraAddress = rows.VisitingExtraAddress;
    const VisitingPostcode = rows.VisitingPostcode;
    const VisitingCity = rows.VisitingCity;
    const PostalAddress = rows.PostalAddress;
    const PostalExtraAddress = rows.PostalExtraAddress;
    const PostalPostcode = rows.PostalPostcode;
    const PostalCity = rows.PostalCity;
    const InvoiceAddress = rows.InvoiceAddress;
    const InvoiceExtraAddress = rows.InvoiceExtraAddress;
    const InvoicePostcode = rows.InvoicePostcode;
    const InvoiceCity = rows.InvoiceCity;
    const CreditScore = rows.CreditScore;
    const CreditRating = rows.CreditRating;
    const IndustryCode = rows.IndustryCode;
    const Industry = rows.Industry;
    const EducationalLevel = rows.EducationalLevel;
    const CompanyRegistrationDate = rows.CompanyRegistrationDate;
    const KAM = rows.KAM;
    const PreferredCollectionDate = rows.PreferredCollectionDate;
    // const PaymentRemarks = rows.PaymentRemarks;
    const PaymentType = rows.PaymentType;
    const PaymentFrequency = rows.PaymentFrequency;
    const DistributionMethod = rows.DistributionMethod;

    const ConvertFromExistingAccount = rows.ConvertFromExistingAccount;

    expectedName = CompanyName;
    expectedNIN = OrgNo;
    expectedEmail = EmailAddress;
    expectedPhone = CompanyPhone;
    expectedAddress = VisitingAddress;
    let temp1 = ", " + PostalAddress;
    let temp2 = ", " + InvoiceAddress;
    if (temp2.localeCompare(", ") !== 0) {
      expectedAddress = expectedAddress + temp2;
    }
    if (temp1.localeCompare(", ") !== 0) {
      expectedAddress = expectedAddress + temp1;
    }
    expectedStatus = Status;

    //input Basic informattion
    if (Organization) {
      let temp = await accountForm.inputOrganizationAccountCompanyForm(Organization);
      logFailTestcase(temp, "Input incorrect Organization on account company form");
    }
    if (OrgNo) {
      let temp = await accountForm.inputOrgNoBasicInformationAccountCompanyForm(OrgNo);
      logFailTestcase(temp, "Input Org. No on account company form failed !");
    }
    if (CompanyName) {
      let temp = await accountForm.inputCompanyNameBasicInformationAccountCompanyForm(CompanyName);
      logFailTestcase(temp, "Input Company Name on account company form failed !");
    }
    if (EmailAddress) {
      let temp = await accountForm.inputEmailAddressCompanyBasicInformationAccountCompanyForm(EmailAddress);
      logFailTestcase(temp, "Input Email Address on account company form failed !");
    }
    if (CompanyPhone) {
      let temp = await accountForm.inputCompanyPhoneBasicInformationAccountCompanyForm(CompanyPhone);
      logFailTestcase(temp, "Input Company Phone on account company form failed !");
    }
    if (Status) {
      let temp = await accountForm.inputStatusCompanyBasicInformationAccountCompanyForm(Status);
      logFailTestcase(temp, "Input status on account company form failed !");
    }
    if (Country) {
      let temp = await accountForm.inputCountryCompanyBasicInformationAccountCompanyForm(Country);
      logFailTestcase(temp, "Input Country on account company form failed !");
    }

    if (DistributionMethod) {
      let temp = await accountForm.inputDistributionMethodCompanyBasicInformationAccountCompanyForms(DistributionMethod);
      logFailTestcase(temp, "Input DistributionMethod on account company form failed !");
    }


    //#endregion
    if (InvoiceEmail) {
      let temp = await accountForm.inputInvoiceEmailBasicInformationAccountCompanyForm(InvoiceEmail);
      logFailTestcase(temp, "Input InvoiceEmail on account company form failed !");
    }
    if (ContactPerson) {
      let temp = await accountForm.inputContactPersonBasicInformationAccountCompanyForm(ContactPerson);
      logFailTestcase(temp, "Input ContactPerson on account company form failed !");
    }

    //input Address
    if (VisitingAddress) {
      let temp = await accountForm.inputVisitingAddress_Address_AccountCompanyForm(VisitingAddress);
      logFailTestcase(temp, "Input Visiting Address on account company form failed !");
    }
    if (VisitingExtraAddress) {
      let temp = await accountForm.inputVisitingExtraAddress_Address_AccountCompanyForm(VisitingExtraAddress);
      logFailTestcase(temp, "Input Visiting Extra Address on account company form failed !");
    }
    if (VisitingPostcode) {
      let temp = await accountForm.inputVisitingPostcodeAddressAccountCompanyForm(VisitingPostcode);
      logFailTestcase(temp, "Input Visiting Postcode on account company form failed !");
    }
    if (VisitingCity) {
      let temp = await accountForm.inputVisitingCityAddressAccountCompanyForm(VisitingCity);
      logFailTestcase(temp, "Input Visiting city on account company form failed !");
    }
    if (PostalAddress) {
      let temp = await accountForm.inputPostalAddress_Address_AccountCompanyForm(PostalAddress);
      logFailTestcase(temp, "Input Postal Address on account company form failed !");
    }
    if (PostalExtraAddress) {
      let temp = await accountForm.inputPostalExtraAddress_Address_AccountCompanyForm(PostalExtraAddress);
      logFailTestcase(temp, "Input Postal Extra Address on account company form failed !");
    }
    if (PostalPostcode) {
      let temp = await accountForm.inputPostalPostcodeAddressAccountCompanyForm(PostalPostcode);
      logFailTestcase(temp, "Input Postal Postcode on account company form failed !");
    }
    if (PostalCity) {
      let temp = await accountForm.inputPostalCityAddressAccountCompanyForm(PostalCity);
      logFailTestcase(temp, "Input Postal City on account company form failed !");
    }
    if (InvoiceAddress) {
      let temp = await accountForm.inputInvoiceAddress_Address_AccountCompanyForm(InvoiceAddress);
      logFailTestcase(temp, "Input Invoice Address on account company form failed !");
    }
    if (InvoiceExtraAddress) {
      let temp = await accountForm.inputInvoiceExtraAddress_Address_AccountCompanyForm(InvoiceExtraAddress);
      logFailTestcase(temp, "Input Invoice Extra Address on account company form failed !");
    }
    if (InvoicePostcode) {
      let temp = await accountForm.inputInvoicePostcodeAddressAccountCompanyForm(InvoicePostcode);
      logFailTestcase(temp, "Input Invoice Postcode on account company form failed !");
    }
    if (InvoiceCity) {
      let temp = await accountForm.inputInvoiceCityAddressAccountCompanyForm(InvoiceCity);
      logFailTestcase(temp, "Input Invoice City on account company form failed !");
    }

    //input other information
    if (CreditScore) {
      let temp = await accountForm.inputCreditScoreOtherInformationAccountCompanyForm(CreditScore);
      logFailTestcase(temp, "Input Credit Score on account company form failed !");
    }
    if (CreditRating) {
      let temp = await accountForm.inputCreditRatingOtherInformationAccountCompanyForm(CreditRating);
      logFailTestcase(temp, "Input Credit Rating on account company form failed !");
    }
    if (Industry) {
      let temp = await accountForm.inputIndustryOtherInformationAccountCompanyForm(Industry);
      logFailTestcase(temp, "Input Industry on account company form failed !");
    }
    if (IndustryCode) {
      let temp = await accountForm.inputIndustryCodeOtherInformationAccountCompanyForm(IndustryCode);
      logFailTestcase(temp, "Input Industry Code on account company form failed !");
    }
    if (EducationalLevel) {
      let temp = await accountForm.inputEducationLevelOtherInformationAccountCompanyForm(EducationalLevel);
      logFailTestcase(temp, "Input Education Level on account company form failed !");
    }
    if (CompanyRegistrationDate) {
      let temp = await accountForm.inputCompanyRegistrationDateOtherInformationAccountCompanyForm(CompanyRegistrationDate);
      logFailTestcase(temp, "Input Company Registration Date on account company form failed !");
    }
    if (KAM) {
      let temp = await accountForm.inputKAMOtherInformationAccountCompanyForm(KAM);
      logFailTestcase(temp, "Input KAM on account company form failed !");
    }
    if (PreferredCollectionDate) {
      let temp = await accountForm.inputPreferredCollectionDateOtherInformationAccountCompanyForm(PreferredCollectionDate);
      logFailTestcase(temp, "Input Preferred Collection Date on account company form failed !");
    }
    // if(PaymentRemarks){
    //   let temp = await accountForm.inputPaymentRemarksOtherInformationAccountCompanyForm(PaymentRemarks);
    //   logFailTestcase(temp, `Input PaymentRemarks on account company failed!`);
    // }
    if (PaymentType) {
      let temp = await accountForm.inputPaymentTypeOtherInformationAccountCompanyForm(PaymentType);
      logFailTestcase(temp, "Input Payment Type on account company form failed !");
    }
    if (PaymentFrequency) {
      let temp = await accountForm.inputPaymentFrequencyOtherInformationAccountCompanyForm(PaymentFrequency);
      logFailTestcase(temp, "Input Payment Frequency on account company form failed !");
    }
    if (CompanyRegistrationDate) {
      let temp = await accountForm.validateCompanyRegistrationDateValueOnAccountCompanyForm(CompanyRegistrationDate);
      logFailTestcase(temp, "Incorrect Company Registration Date  !");
    }
  }
});

When("User inputs valid contact data from csv file {string}", async (filename: string) => {
  let rows;
  if (filename.includes(".csv")) {
    rows = loader(convertPathFileDataToDataRegression(filename));
  }
  else {
    let data = (await DataRepo.getInstance().loadData(filename))[0];
    rows = data.Contacts;
  }
  // await convertLeadPage.reloadLeadList();

  for (const row of rows) {
    const firstName = row.FirstName;
    const lastName = row.LastName;
    const dateOfBirth = row.DateOfBirth;
    const email = row.Email;
    const phone = row.Phone;
    const address = row.Address;
    const postcode = row.Postcode;
    const city = row.City;
    const country = row.Country;
    const type = row.Type;
    const title = row.Title;

    if (typeLead.localeCompare("person") === 0) {
      let temp = await accountForm.openAddContactForm();
      logFailTestcase(temp, "Fails to open Add Contact Form Person");
    }
    if (typeLead.localeCompare("company") === 0) {
      let temp = await accountForm.openAddContactForm();
      logFailTestcase(temp, "Fails to open Add Contact Form Company");
    }

    if (firstName) {
      let temp = await contactForm.inputFirstNameOnContactForm(firstName);
      logFailTestcase(temp, "Fails to input First Name on Add Contact Form");
    }

    if (lastName) {
      let temp = await contactForm.inputLastNameOnContactForm(lastName);
      logFailTestcase(temp, "Fails to input Last Name on Add Contact Form");
    }

    if (dateOfBirth) {
      let temp = await contactForm.inputBirthdayOnContactForm(dateOfBirth);
      logFailTestcase(temp, "Fails to input Date of Birth on Add Contact Form");
    }

    if (email) {
      let temp = await contactForm.inputEmailOnContactForm(email);
      logFailTestcase(temp, "Fails to input Email on Add Contact Form");
    }

    if (phone) {
      let temp = await contactForm.inputPhoneOnContactForm(phone);
      logFailTestcase(temp, "Fails to input Phone on Add Contact Form");
    }

    if (address) {
      let temp = await contactForm.inputAddressOnContactForm(address);
      logFailTestcase(temp, "Fails to input Address on Add Contact Form");
    }

    if (postcode) {
      let temp = await contactForm.inputPostcodeOnContactForm(postcode);
      logFailTestcase(temp, "Fails to input Postcode on Add Contact Form");
    }

    if (city) {
      let temp = await contactForm.inputCityOnContactForm(city);
      logFailTestcase(temp, "Fails to input City on Add Contact Form");
    }

    if (country) {
      let temp = await contactForm.inputCountryOnContactForm(country);
      logFailTestcase(temp, "Fails to input Country on Add Contact Form");
    }

    if (type || title) {
      let temp = await contactForm.inputTypeOrTitleOnContactForm(type || title);
      logFailTestcase(temp, "Fails to input Type or Title on Add Contact Form");
    }

    let temp = await globalPageObject.pressSaveForm();
    logFailTestcase(temp, "Fails to save Add Contact Form");
  }

  try {
    let temp = await globalPageObject.pressSaveForm();
    logFailTestcase(temp, "Fails to save create Account");
  } catch (error) {
    console.log(error);
  }

});

Then("System shows new account in the Account list", async () => {
  //Navigate to Account list page
  let temp = await globalPageObject.navigateToMainAccountList();
  logFailTestcase(temp, "Navigate to account failed!");
  await globalPageObject.reloadTable(3000);
  await accountList.assertConvertLead(
    expectedName,
    expectedNIN,
    expectedEmail,
    expectedPhone,
    expectedAddress,
    expectedStatus);
});

When("User inputs valid contact data for Origo account from csv file {string}", async (filename: string) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  await globalPageObject.reloadTable();

  for (const row of rows) {
    const firstName = row.FirstName;
    const lastName = row.LastName;
    const dateOfBirth = row.DateOfBirth;
    const email = row.Email;
    const phone = row.Phone;
    const address = row.Address;
    const postcode = row.Postcode;
    const city = row.City;
    const country = row.Country;

    let temp = await accountForm.openAddContactForm();
    logFailTestcase(temp);
    const title = row.Title;

    // Input data to Contact company form
    if (firstName) {
      let temp = await contactForm.inputFirstNameOnContactForm(firstName);
      logFailTestcase(temp, "Fails to input First Name on Add Contact Form");
    }

    if (lastName) {
      let temp = await contactForm.inputLastNameOnContactForm(lastName);
      logFailTestcase(temp, "Fails to input Last Name on Add Contact Form");
    }

    if (dateOfBirth) {
      let temp = await contactForm.inputBirthdayOnContactForm(dateOfBirth);
      logFailTestcase(temp, "Fails to input Date of Birth on Add Contact Form");
    }

    if (email) {
      let temp = await contactForm.inputEmailOnContactForm(email);
      logFailTestcase(temp, "Fails to input Email on Add Contact Form");
    }

    if (phone) {
      let temp = await contactForm.inputPhoneOnContactForm(phone);
      logFailTestcase(temp, "Fails to input Phone on Add Contact Form");
    }

    if (address) {
      let temp = await contactForm.inputAddressOnContactForm(address);
      logFailTestcase(temp, "Fails to input Address on Add Contact Form");
    }

    if (postcode) {
      let temp = await contactForm.inputPostcodeOnContactForm(postcode);
      logFailTestcase(temp, "Fails to input Postcode on Add Contact Form");
    }

    if (city) {
      let temp = await contactForm.inputCityOnContactForm(city);
      logFailTestcase(temp, "Fails to input City on Add Contact Form");
    }

    if (country) {
      let temp = await contactForm.inputCountryOnContactForm(country);
      logFailTestcase(temp, "Fails to input Country on Add Contact Form");
    }

    if (title) {
      let temp = await contactForm.inputTypeOrTitleOnContactForm(title);
      logFailTestcase(temp, "Fails to input Type or Title on Add Contact Form");
    }

    temp = await globalPageObject.pressSaveForm();
    logFailTestcase(temp);
    await globalPageObject.waitForProgressBarLoaded_v2();
  }
  let temp = await globalPageObject.pressSaveForm();
  logFailTestcase(temp);
  temp = await globalPageObject.waitForProgressBarLoaded();
  logFailTestcase(temp);

  temp = await globalPageObject.checkToastErrorExist();
  logFailTestcase(!temp);
});

//Regression

Then("System shows filled information in convert form {string}", async (filename: string) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  for (const row of rows) {
    const firstname = row.FirstName;
    const lastname = row.LastName;
    const address = row.Adress;
    const postcode = row.Postcode;
    const city = row.City;
    const country = row.Country;
    const email = row.Email;
    const phone = row.PhoneNumber;

    await accountForm.assertFilledConvertLead(
      firstname,
      lastname,
      address,
      postcode,
      city,
      country,
      email,
      phone);
  }
  await globalPageObject.pressSaveForm();
});
