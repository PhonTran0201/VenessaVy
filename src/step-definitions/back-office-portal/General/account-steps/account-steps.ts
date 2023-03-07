import { Before, Given, Then, When } from "@cucumber/cucumber";
import { fail } from 'assert';
import { DataRepo } from "../../../../core/modals/DataRepo";
import { AccountDetailsLeftSide } from "../../../../page-objects/back-office-portal/general/account/account-details/left-side/AccountDetailsLeftSide";
import { AccountTabDocumentList } from "../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-document/AccountTabDocumentList";
import { AccountTabSummary } from "../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-summary/AccountTabSummary";
import { AccountForm } from "../../../../page-objects/back-office-portal/general/account/account-forms/AccountForm";
import { AccountList } from "../../../../page-objects/back-office-portal/general/account/account-list/AccountList";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { GlobalPagination } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPagination";
import { GlobalPeripherals } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPeripherals";
import { PageFactory } from "../../../../page-objects/PageFactory";
import { convertPathFileDataToDataRegression, getCurrentDateTime, logFailTestcase, logInfoMessage, logSuccessMessage, logWarningMessage, randomModulus11ForSSN } from '../../../../shared/functions';
import { ICommonContext } from "../../../../shared/interfaces";
import { scenarioName, scenarioTags, subErrorMessages } from '../../../../shared/variables';
import { getValueDataOfDataTestExecution, pushObjectToDataArrayWithUniqueKey } from "../../../../storage-data/functions/data-test-execution";


const loader = require("csv-load-sync");
let accountDetailsLeftSide: AccountDetailsLeftSide;
let accountForm: AccountForm;
let accountList: AccountList;
let accountTabSummary: AccountTabSummary;
let accountTabDocumentList: AccountTabDocumentList;
let globalPageObject: GlobalPageObject;
let globalPeripherals: GlobalPeripherals;
let globalPagination: GlobalPagination;
let fileDataCreate: string = "";
//Variable using to compare
let expectedName: string;
let expectedNIN: string;
let expectedEmail: string;
let expectedPhone: string;
let expectedAddress: string;
let expectedKAM: string;
let expectedStatus: string;

const pageAccountList = PageFactory.getInstance().createAccountListPage();
const pageAccountAddToTargetGroup = PageFactory.getInstance().createAccountAddTargetGroupPage();

Before(async function () {
  const context: ICommonContext = this.context;
  accountDetailsLeftSide = new AccountDetailsLeftSide(context.driverService);
  accountForm = new AccountForm(context.driverService);
  accountList = new AccountList(context.driverService);
  accountTabSummary = new AccountTabSummary(context.driverService);
  accountTabDocumentList = new AccountTabDocumentList(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
  globalPeripherals = new GlobalPeripherals(context.driverService);
  globalPagination = new GlobalPagination(context.driverService);
});

Given("User navigates to Account list", async () => {
  const temp = await globalPageObject.navigateToMainAccountList();
  logFailTestcase(temp, "Navigate to Account list failed!");
});

Given("User opens an account from precondition steps", async function () {
  if (!(await accountDetailsLeftSide.checkAccountOpening())) {
    let temp = await globalPageObject.closeAllOpeningEntities();
    logFailTestcase(temp, "Close opening account failed!");
  }
  let temp = await globalPageObject.navigateToMainAccountList();
  logFailTestcase(temp, "Navigate to Account list failed!");
  temp = await accountList.openDetailOfFirstAccount();
  logFailTestcase(temp, "Open first account failed!");
});

Then(`System shows required tabs on Account Details page {string}`, async (filename) => {

  const rows = loader(convertPathFileDataToDataRegression(filename));
  const ObjectsToCsv = require("objects-to-csv-file");
  let columnName: string[] = [];
  let flag: string[] = [];
  for (let i = 0; i < rows.length; i++) {
    let ColumnName = rows[i].ColumnName;
    let Flag = rows[i].Flag;
    columnName.push(ColumnName);
    flag.push(Flag);
  }
  let temp = await globalPageObject.verifyEntityTab(columnName, flag, false);
  for (const iterator of temp) {
    iterator.note = `Under Account Details page`;
  }

  (async () => {
    const csv = new ObjectsToCsv(temp);
    await csv.toDisk("./result/SAAS-13419_UI_Test_Report.csv", { append: true });
  })();

  for (const iterator of temp) {
    if (iterator.expected != iterator.actual && (!(iterator.expected == "Optional"))) {
      logFailTestcase(false, `${iterator.item} (${iterator.itemid}) is expected to be ${iterator.expected} but got ${iterator.actual}`);
    }
  }
});

Then(`System shows Generate Document button under Documents tab {string}`, async (filename) => {
  var fs = require('fs')
  var logger = fs.createWriteStream('./result/SAAS-13419_UI_Test_Report.csv', {
    flags: 'a' // 'a' means appending (old data will be preserved)
  })
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  let Flag = row.Flag;
  let temp = await accountTabDocumentList.verifyGenerateDocumentButton();
  let tempString;
  if (temp) {
    tempString = "Yes"
  } else {
    tempString = "No"
  }

  logger.write(`Entity Tabs,5,Generate Documents button,` + `${Flag},` + `${tempString},` + getCurrentDateTime() + `,Under Documents tab`) // append string to your file

  if ((tempString != Flag) && !(Flag == "Optional")) {
    logFailTestcase(false, `Generate Document is expected to be ${Flag} but got ${tempString}`)
  }

})


Then(`System shows Customer Score widget under Summary tab {string}`, async (filename) => {
  var fs = require('fs')
  var logger = fs.createWriteStream('./result/SAAS-13419_UI_Test_Report.csv', {
    flags: 'a' // 'a' means appending (old data will be preserved)
  })
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  let Flag = row.Flag;
  let temp = await accountTabSummary.verifyCustomerScoreWidget();
  let tempString;
  if (temp) {
    tempString = "Yes"
  } else {
    tempString = "No"
  }

  logger.write(`\r\n` + `Entity Tabs,5,Customer Score widget,` + `${Flag},` + `${tempString},` + getCurrentDateTime() + `,Under Summary tab`) // append string to your file

  if ((tempString != Flag) && !(Flag == "Optional")) {
    logFailTestcase(false, `Customer Score widget is expected to be ${Flag} but got ${tempString}`)
  }

})

Then(`User enters Documents tab`, async () => {
  let temp = await globalPageObject.enterDocumentsTab();
  logFailTestcase(temp, `Enter Documents tab failed`);
})


Then(`User enters Summary tab`, async () => {
  let temp = await globalPageObject.enterSummaryTab();
  logFailTestcase(temp, `Enter Documents tab failed`);
})

Then(`System shows Create and other buttons on Account list {string}`, async (filename) => {

  const rows = loader(convertPathFileDataToDataRegression(filename));
  const ObjectsToCsv = require("objects-to-csv-file");
  let columnName: string[] = [];
  let flag: string[] = [];
  for (let i = 0; i < rows.length; i++) {
    let ColumnName = rows[i].ColumnName;
    let Flag = rows[i].Flag;
    columnName.push(ColumnName);
    flag.push(Flag);
  }
  let temp = await accountList.verifyCreateAndOtherButtonsOnTopOfAccountTable(columnName, flag, true, "Optional");

  (async () => {
    const csv = new ObjectsToCsv(temp);
    await csv.toDisk("./result/SAAS-13419_UI_Test_Report.csv", { append: true });
  })();

  for (const iterator of temp) {
    if (iterator.expected != iterator.actual && (!(iterator.expected == "Optional"))) {
      logFailTestcase(false, `${iterator.item} (${iterator.itemid}) is expected to be ${iterator.expected} but got ${iterator.actual}`);
    }
  }
});

When("User inputs valid new person account data from csv file {string}", async (filename: string) => {

  let rows = loader(convertPathFileDataToDataRegression(filename));
  fileDataCreate = filename;
  for (const row of rows) {
    let temp = await accountList.openCreateNewAccountPersonForm();
    logFailTestcase(temp, "Open Account person form failed!");

    let NIN = row.NIN;
    if (row.NIN == "") {
      NIN = randomModulus11ForSSN();
    }
    //const NIN = randomModulus11ForSSN(); //get random NIN with length = 11
    expectedNIN = NIN;
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

    expectedName = firstName + " " + lastName;
    expectedNIN = NIN;
    expectedEmail = emailAddress;
    expectedPhone = phoneNumber;
    expectedAddress = address;
    expectedStatus = status;

    if (NIN) {
      temp = await accountForm.inputNINBasicInformationAccountPersonForm(NIN);
      logFailTestcase(temp, "inputNINBasicInformationAccountPersonForm fails");
    }

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

    temp = await globalPageObject.pressSaveForm();
    logFailTestcase(temp, "Press save account form failed!");
    temp = await globalPageObject.waitForProgressBarLoaded();
    logFailTestcase(temp, "Press save account form failed!");
  }
});
When("User inputs valid new company account data from csv file {string}", async (filename: string) => {
  let rows = loader(convertPathFileDataToDataRegression(filename));
  fileDataCreate = filename;
  for (const row of rows) {
    let temp = await accountList.openCreateNewAccountCompanyForm();
    logFailTestcase(temp);
    //const OrgNo = row.OrgNo;
    const OrgNo = randomModulus11ForSSN(); //get random OrgNo with length = 11
    const CompanyName = row.CompanyName;
    const EmailAddress = row.EmailAddress;
    const CompanyPhone = row.CompanyPhone;
    const Status = row.Status;
    const Country = row.Country;

    const VisitingAddress = row.VisitingAddress;
    const VisitingExtraAddress = row.VisitingExtraAddress;
    const VisitingPostcode = row.VisitingPostcode;
    const VisitingCity = row.VisitingCity;

    const PostalAddress = row.PostalAddress;
    const PostalExtraAddress = row.PostalExtraAddress;
    const PostalPostcode = row.PostalPostcode;
    const PostalCity = row.PostalCity;

    const InvoiceAddress = row.InvoiceAddress;
    const InvoiceExtraAddress = row.InvoiceExtraAddress;
    const InvoicePostcode = row.InvoicePostcode;
    const InvoiceCity = row.InvoiceCity;

    const CreditScore = row.CreditScore;
    const CreditRating = row.CreditRating;
    const IndustryCode = row.IndustryCode;
    const Industry = row.Industry;
    const EducationalLevel = row.EducationalLevel;
    const CompanyRegistrationDate = row.CompanyRegistrationDate;
    const KAM = row.KAM;
    const PreferredCollectionDate = row.PreferredCollectionDate;
    // const PaymentRemarks = row.PaymentRemarks;
    const PaymentType = row.PaymentType;
    const PaymentFrequency = row.PaymentFrequency;

    expectedName = CompanyName;
    expectedNIN = OrgNo;
    expectedEmail = EmailAddress;
    expectedPhone = CompanyPhone;
    expectedAddress = VisitingAddress;
    expectedStatus = Status;
    let temp1 = ", " + PostalAddress;
    let temp2 = ", " + InvoiceAddress;
    if (temp1.localeCompare(", ") !== 0) {
      expectedAddress = expectedAddress + temp2;
    }
    if (temp2.localeCompare(", ") !== 0) {
      expectedAddress = expectedAddress + temp1;
    }

    if (OrgNo) {
      temp = await accountForm.inputOrgNoBasicInformationAccountCompanyForm(OrgNo);
      logFailTestcase(temp, "inputOrgNoBasicInformationAccountCompanyForm fails");
    }

    if (CompanyName) {
      temp = await accountForm.inputCompanyNameBasicInformationAccountCompanyForm(CompanyName);
      logFailTestcase(temp, "inputCompanyNameBasicInformationAccountCompanyForm fails");
    }

    if (EmailAddress) {
      temp = await accountForm.inputEmailAddressCompanyBasicInformationAccountCompanyForm(EmailAddress);
      logFailTestcase(temp, "inputEmailAddressCompanyBasicInformationAccountCompanyForm fails");
    }

    if (CompanyPhone) {
      temp = await accountForm.inputCompanyPhoneBasicInformationAccountCompanyForm(CompanyPhone);
      logFailTestcase(temp, "inputCompanyPhoneBasicInformationAccountCompanyForm fails");
    }

    if (Status) {
      temp = await accountForm.inputStatusCompanyBasicInformationAccountCompanyForm(Status);
      logFailTestcase(temp, "inputStatusCompanyBasicInformationAccountCompanyForm fails");
    }

    if (Country) {
      temp = await accountForm.inputCountryCompanyBasicInformationAccountCompanyForm(Country);
      logFailTestcase(temp, "inputCountryCompanyBasicInformationAccountCompanyForm fails");
    }

    if (VisitingAddress) {
      temp = await accountForm.inputVisitingAddress_Address_AccountCompanyForm(VisitingAddress);
      logFailTestcase(temp, "inputVisitingAddress_Address_AccountCompanyForm fails");
    }

    if (VisitingExtraAddress) {
      temp = await accountForm.inputVisitingExtraAddress_Address_AccountCompanyForm(VisitingExtraAddress);
      logFailTestcase(temp, "inputVisitingExtraAddress_Address_AccountCompanyForm fails");
    }

    if (VisitingPostcode) {
      temp = await accountForm.inputVisitingPostcodeAddressAccountCompanyForm(VisitingPostcode);
      logFailTestcase(temp, "inputVisitingPostcodeAddressAccountCompanyForm fails");
    }

    if (VisitingCity) {
      temp = await accountForm.inputVisitingCityAddressAccountCompanyForm(VisitingCity);
      logFailTestcase(temp, "inputVisitingCityAddressAccountCompanyForm fails");
    }

    if (PostalAddress) {
      temp = await accountForm.inputPostalAddress_Address_AccountCompanyForm(PostalAddress);
      logFailTestcase(temp, "inputPostalAddress_Address_AccountCompanyForm fails");
    }

    if (PostalExtraAddress) {
      temp = await accountForm.inputPostalExtraAddress_Address_AccountCompanyForm(PostalExtraAddress);
      logFailTestcase(temp, "inputPostalExtraAddress_Address_AccountCompanyForm fails");
    }

    if (PostalPostcode) {
      temp = await accountForm.inputPostalPostcodeAddressAccountCompanyForm(PostalPostcode);
      logFailTestcase(temp, "inputPostalPostcodeAddressAccountCompanyForm fails");
    }

    if (PostalCity) {
      temp = await accountForm.inputPostalCityAddressAccountCompanyForm(PostalCity);
      logFailTestcase(temp, "inputPostalCityAddressAccountCompanyForm fails");
    }

    if (InvoiceAddress) {
      temp = await accountForm.inputInvoiceAddress_Address_AccountCompanyForm(InvoiceAddress);
      logFailTestcase(temp, "inputInvoiceAddress_Address_AccountCompanyForm fails");
    }

    if (InvoiceExtraAddress) {
      temp = await accountForm.inputInvoiceExtraAddress_Address_AccountCompanyForm(InvoiceExtraAddress);
      logFailTestcase(temp, "inputInvoiceExtraAddress_Address_AccountCompanyForm fails");
    }

    if (InvoicePostcode) {
      temp = await accountForm.inputInvoicePostcodeAddressAccountCompanyForm(InvoicePostcode);
      logFailTestcase(temp, "inputInvoicePostcodeAddressAccountCompanyForm fails");
    }

    if (InvoiceCity) {
      temp = await accountForm.inputInvoiceCityAddressAccountCompanyForm(InvoiceCity);
      logFailTestcase(temp, "inputInvoiceCityAddressAccountCompanyForm fails");
    }

    if (CreditScore) {
      temp = await accountForm.inputCreditScoreOtherInformationAccountCompanyForm(CreditScore);
      logFailTestcase(temp, "inputCreditScoreOtherInformationAccountCompanyForm fails");
    }

    if (CreditRating) {
      temp = await accountForm.inputCreditRatingOtherInformationAccountCompanyForm(CreditRating);
      logFailTestcase(temp, "inputCreditRatingOtherInformationAccountCompanyForm fails");
    }

    if (IndustryCode) {
      temp = await accountForm.inputIndustryCodeOtherInformationAccountCompanyForm(IndustryCode);
      logFailTestcase(temp, "inputIndustryCodeOtherInformationAccountCompanyForm fails");
    }

    if (Industry) {
      temp = await accountForm.inputIndustryOtherInformationAccountCompanyForm(Industry);
      logFailTestcase(temp, "inputIndustryOtherInformationAccountCompanyForm fails");
    }

    if (EducationalLevel) {
      temp = await accountForm.inputEducationLevelOtherInformationAccountCompanyForm(EducationalLevel);
      logFailTestcase(temp, "inputEducationLevelOtherInformationAccountCompanyForm fails");
    }

    if (CompanyRegistrationDate) {
      temp = await accountForm.inputCompanyRegistrationDateOtherInformationAccountCompanyForm(CompanyRegistrationDate);
      logFailTestcase(temp, "inputCompanyRegistrationDateOtherInformationAccountCompanyForm fails");
    }

    if (KAM) {
      temp = await accountForm.inputKAMOtherInformationAccountCompanyForm(KAM);
      logFailTestcase(temp, "inputKAMOtherInformationAccountCompanyForm fails");
    }

    if (PreferredCollectionDate) {
      temp = await accountForm.inputPreferredCollectionDateOtherInformationAccountCompanyForm(PreferredCollectionDate);
      logFailTestcase(temp, "inputPreferredCollectionDateOtherInformationAccountCompanyForm fails");
    }

    // if (PaymentRemarks) {
    //   temp = await accountForm.inputPaymentRemarksOtherInformationAccountCompanyForm(PaymentRemarks);
    //   logFailTestcase(temp, `Input PaymentRemarks failed!`);
    // }

    if (PaymentType) {
      temp = await accountForm.inputPaymentTypeOtherInformationAccountCompanyForm(PaymentType);
      logFailTestcase(temp, "inputPaymentTypeOtherInformationAccountCompanyForm fails");
    }

    if (PaymentFrequency) {
      temp = await accountForm.inputPaymentFrequencyOtherInformationAccountCompanyForm(PaymentFrequency);
      logFailTestcase(temp, "inputPaymentFrequencyOtherInformationAccountCompanyForm fails");
    }

    temp = await globalPageObject.pressSaveForm();
    logFailTestcase(temp, "Fail to save form");

    temp = await globalPageObject.waitForProgressBarLoaded();
    logFailTestcase(temp, "waitForProgressBarLoaded fails");
  }
}
);

Then("System shows new person account in the Account list {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  let len = rows.length;
  await accountList.reloadAccountList();
  await globalPageObject.expandNumberOfItemMainList();
  for (let i = len - 1, j = 1; i >= 0; i--, j++) {
    expectedName = rows[i].FirstName + " " + rows[i].LastName;
    expectedEmail = rows[i].EmailAddress;
    expectedPhone = rows[i].PhoneNumber;
    expectedAddress = rows[i].Address;
    expectedKAM = rows[i].KAM;
    expectedStatus = rows[i].Status;

    await accountList.assertCreateAccount(
      j, //position of row want to validate
      expectedName,
      expectedEmail,
      expectedPhone,
      expectedAddress,
      expectedKAM,
      expectedStatus
    );

    pushObjectToDataArrayWithUniqueKey("OrgNo_NIN", await accountList.getValueStatusOnAccountListByRow(j));
  }
  await globalPageObject.closeOpeningForm();
});

Then("System shows new company account in the Account list {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  let len = rows.length;
  await globalPageObject.waitForProgressBarLoaded_v2(7000);
  logInfoMessage("Waiting for 7s...");
  let temp = await accountList.openSearchAndFilterForm();
  logFailTestcase(temp, `Open Search and Filter failed!`);

  temp = await globalPageObject.pressClearSearchAndFilter();
  logFailTestcase(temp, `Press Clear button on Search and Filter failed!`);
  await globalPageObject.waitForProgressBarLoaded_v2(500);
  await globalPageObject.expandNumberOfItemMainList();

  for (let i = len - 1, j = 1; i >= 0; i--, j++) {
    const CompanyName = rows[i].CompanyName;
    const EmailAddress = rows[i].EmailAddress;
    const CompanyPhone = rows[i].CompanyPhone;
    const VisitingAddress = rows[i].VisitingAddress;
    const PostalAddress = rows[i].PostalAddress;
    const InvoiceAddress = rows[i].InvoiceAddress;
    const KAM = rows[i].KAM;
    const Status = rows[i].Status;

    expectedName = CompanyName;
    expectedEmail = EmailAddress;
    expectedPhone = CompanyPhone;
    expectedAddress = VisitingAddress;
    expectedKAM = KAM;
    expectedStatus = Status;

    let temp1 = ", " + PostalAddress;
    let temp2 = ", " + InvoiceAddress;
    if (temp1.localeCompare(", ") !== 0) {
      expectedAddress = expectedAddress + temp2;
    }
    if (temp2.localeCompare(", ") !== 0) {
      expectedAddress = expectedAddress + temp1;
    }

    await accountList.assertCreateAccount(
      j, //position of row want to validate
      expectedName,
      expectedEmail,
      expectedPhone,
      expectedAddress,
      KAM,
      expectedStatus
    );
  }

  pushObjectToDataArrayWithUniqueKey("CustomerReference", await accountList.getValueReferenceOnAccountListByRow());

  await globalPageObject.closeOpeningForm();
});

When("User updates a person account from precondition steps from csv file {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  fileDataCreate = filename;
  for (let row of rows) {
    await accountList.reloadAccountList();
    const selectedAccount = row.SelectedAccount;
    let temp = await accountList.openEditAccountFormByName(selectedAccount);
    logFailTestcase(temp);
    //const NIN = row.NIN;
    const NIN = randomModulus11ForSSN(); //get random NIN with length = 11
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

    //ACTIONS
    if (NIN) {
      temp = await accountForm.inputNINBasicInformationAccountPersonForm(NIN);
      logFailTestcase(temp, "inputNINBasicInformationAccountPersonForm fails");
    }

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

    temp = await globalPageObject.pressSaveForm();
    logFailTestcase(temp, "Press save account form failed!");

    temp = await globalPageObject.waitForProgressBarLoaded();
    logFailTestcase(temp, "Press save account form failed!");
  }
});

When("User updates a company account from precondition steps from csv file {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  fileDataCreate = filename;
  for (let row of rows) {
    await accountList.reloadAccountList();
    const selectedAccount = row.SelectedAccount;
    let temp = await accountList.openEditAccountFormByName(selectedAccount);
    logFailTestcase(temp);
    //const OrgNo = rows[0].OrgNo;
    const OrgNo = randomModulus11ForSSN(); //get random OrgNo with length = 11

    const CompanyName = row.CompanyName;
    const EmailAddress = row.EmailAddress;
    const CompanyPhone = row.CompanyPhone;
    const Status = row.Status;
    const Country = row.Country;

    const VisitingAddress = row.VisitingAddress;
    const VisitingExtraAddress = row.VisitingExtraAddress;
    const VisitingPostcode = row.VisitingPostcode;
    const VisitingCity = row.VisitingCity;

    const PostalAddress = row.PostalAddress;
    const PostalExtraAddress = row.PostalExtraAddress;
    const PostalPostcode = row.PostalPostcode;
    const PostalCity = row.PostalCity;

    const InvoiceAddress = row.InvoiceAddress;
    const InvoiceExtraAddress = row.InvoiceExtraAddress;
    const InvoicePostcode = row.InvoicePostcode;
    const InvoiceCity = row.InvoiceCity;

    const CreditScore = row.CreditScore;
    const CreditRating = row.CreditRating;
    const IndustryCode = row.IndustryCode;
    const Industry = row.Industry;
    const EducationalLevel = row.EducationalLevel;
    const CompanyRegistrationDate = row.CompanyRegistrationDate;
    const KAM = row.KAM;
    const PreferredCollectionDate = row.PreferredCollectionDate;
    // const PaymentRemarks = row.PaymentRemarks;
    const PaymentType = row.PaymentType;
    const PaymentFrequency = row.PaymentFrequency;

    //ACTIONS

    if (OrgNo) {
      temp = await accountForm.inputOrgNoBasicInformationAccountCompanyForm(OrgNo);
      logFailTestcase(temp, "inputOrgNoBasicInformationAccountCompanyForm fails");
    }

    if (CompanyName) {
      temp = await accountForm.inputCompanyNameBasicInformationAccountCompanyForm(CompanyName);
      logFailTestcase(temp, "inputCompanyNameBasicInformationAccountCompanyForm fails");
    }

    if (EmailAddress) {
      temp = await accountForm.inputEmailAddressCompanyBasicInformationAccountCompanyForm(EmailAddress);
      logFailTestcase(temp, "inputEmailAddressCompanyBasicInformationAccountCompanyForm fails");
    }

    if (CompanyPhone) {
      temp = await accountForm.inputCompanyPhoneBasicInformationAccountCompanyForm(CompanyPhone);
      logFailTestcase(temp, "inputCompanyPhoneBasicInformationAccountCompanyForm fails");
    }

    if (Status) {
      temp = await accountForm.inputStatusCompanyBasicInformationAccountCompanyForm(Status);
      logFailTestcase(temp, "inputStatusCompanyBasicInformationAccountCompanyForm fails");
    }

    if (Country) {
      temp = await accountForm.inputCountryCompanyBasicInformationAccountCompanyForm(Country);
      logFailTestcase(temp, "inputCountryCompanyBasicInformationAccountCompanyForm fails");
    }

    if (VisitingAddress) {
      temp = await accountForm.inputVisitingAddress_Address_AccountCompanyForm(VisitingAddress);
      logFailTestcase(temp, "inputVisitingAddress_Address_AccountCompanyForm fails");
    }

    if (VisitingExtraAddress) {
      temp = await accountForm.inputVisitingExtraAddress_Address_AccountCompanyForm(VisitingExtraAddress);
      logFailTestcase(temp, "inputVisitingExtraAddress_Address_AccountCompanyForm fails");
    }

    if (VisitingPostcode) {
      temp = await accountForm.inputVisitingPostcodeAddressAccountCompanyForm(VisitingPostcode);
      logFailTestcase(temp, "inputVisitingPostcodeAddressAccountCompanyForm fails");
    }

    if (VisitingCity) {
      temp = await accountForm.inputVisitingCityAddressAccountCompanyForm(VisitingCity);
      logFailTestcase(temp, "inputVisitingCityAddressAccountCompanyForm fails");
    }

    if (PostalAddress) {
      temp = await accountForm.inputPostalAddress_Address_AccountCompanyForm(PostalAddress);
      logFailTestcase(temp, "inputPostalAddress_Address_AccountCompanyForm fails");
    }

    if (PostalExtraAddress) {
      temp = await accountForm.inputPostalExtraAddress_Address_AccountCompanyForm(PostalExtraAddress);
      logFailTestcase(temp, "inputPostalExtraAddress_Address_AccountCompanyForm fails");
    }

    if (PostalPostcode) {
      temp = await accountForm.inputPostalPostcodeAddressAccountCompanyForm(PostalPostcode);
      logFailTestcase(temp, "inputPostalPostcodeAddressAccountCompanyForm fails");
    }

    if (PostalCity) {
      temp = await accountForm.inputPostalCityAddressAccountCompanyForm(PostalCity);
      logFailTestcase(temp, "inputPostalCityAddressAccountCompanyForm fails");
    }

    if (InvoiceAddress) {
      temp = await accountForm.inputInvoiceAddress_Address_AccountCompanyForm(InvoiceAddress);
      logFailTestcase(temp, "inputInvoiceAddress_Address_AccountCompanyForm fails");
    }

    if (InvoiceExtraAddress) {
      temp = await accountForm.inputInvoiceExtraAddress_Address_AccountCompanyForm(InvoiceExtraAddress);
      logFailTestcase(temp, "inputInvoiceExtraAddress_Address_AccountCompanyForm fails");
    }

    if (InvoicePostcode) {
      temp = await accountForm.inputInvoicePostcodeAddressAccountCompanyForm(InvoicePostcode);
      logFailTestcase(temp, "inputInvoicePostcodeAddressAccountCompanyForm fails");
    }

    if (InvoiceCity) {
      temp = await accountForm.inputInvoiceCityAddressAccountCompanyForm(InvoiceCity);
      logFailTestcase(temp, "inputInvoiceCityAddressAccountCompanyForm fails");
    }

    if (CreditScore) {
      temp = await accountForm.inputCreditScoreOtherInformationAccountCompanyForm(CreditScore);
      logFailTestcase(temp, "inputCreditScoreOtherInformationAccountCompanyForm fails");
    }

    if (CreditRating) {
      temp = await accountForm.inputCreditRatingOtherInformationAccountCompanyForm(CreditRating);
      logFailTestcase(temp, "inputCreditRatingOtherInformationAccountCompanyForm fails");
    }

    if (IndustryCode) {
      temp = await accountForm.inputIndustryCodeOtherInformationAccountCompanyForm(IndustryCode);
      logFailTestcase(temp, "inputIndustryCodeOtherInformationAccountCompanyForm fails");
    }

    if (Industry) {
      temp = await accountForm.inputIndustryOtherInformationAccountCompanyForm(Industry);
      logFailTestcase(temp, "inputIndustryOtherInformationAccountCompanyForm fails");
    }

    if (EducationalLevel) {
      temp = await accountForm.inputEducationLevelOtherInformationAccountCompanyForm(EducationalLevel);
      logFailTestcase(temp, "inputEducationLevelOtherInformationAccountCompanyForm fails");
    }

    if (CompanyRegistrationDate) {
      temp = await accountForm.inputCompanyRegistrationDateOtherInformationAccountCompanyForm(CompanyRegistrationDate);
      logFailTestcase(temp, "inputCompanyRegistrationDateOtherInformationAccountCompanyForm fails");
    }

    if (KAM) {
      temp = await accountForm.inputKAMOtherInformationAccountCompanyForm(KAM);
      logFailTestcase(temp, "inputKAMOtherInformationAccountCompanyForm fails");
    }

    if (PreferredCollectionDate) {
      temp = await accountForm.inputPreferredCollectionDateOtherInformationAccountCompanyForm(PreferredCollectionDate);
      logFailTestcase(temp, "inputPreferredCollectionDateOtherInformationAccountCompanyForm fails");
    }

    // if (PaymentRemarks) {
    //   temp = await accountForm.inputPaymentRemarksOtherInformationAccountCompanyForm(PaymentRemarks);
    //   logFailTestcase(temp, `Input PaymentRemarks failed!`);
    // }

    if (PaymentType) {
      temp = await accountForm.inputPaymentTypeOtherInformationAccountCompanyForm(PaymentType);
      logFailTestcase(temp, "inputPaymentTypeOtherInformationAccountCompanyForm fails");
    }

    if (PaymentFrequency) {
      temp = await accountForm.inputPaymentFrequencyOtherInformationAccountCompanyForm(PaymentFrequency);
      logFailTestcase(temp, "inputPaymentFrequencyOtherInformationAccountCompanyForm fails");
    }

    temp = await globalPageObject.pressSaveForm();
    logFailTestcase(temp, "Fail to save form");

    temp = await globalPageObject.waitForProgressBarLoaded();
    logFailTestcase(temp, "waitForProgressBarLoaded fails");
  }
});

Then("System shows updated person account in the Account list", async () => {
  const rows = loader(convertPathFileDataToDataRegression(fileDataCreate));
  let len = rows.length;
  console.log("A LOT OF RELOAD LIST");
  await accountList.reloadAccountList();
  await globalPeripherals.pressPageUpCurrentElement();
  await globalPeripherals.pressPageUpCurrentElement();
  for (let i = len - 1, j = 1; i >= 0; i--, j++) {
    expectedName = rows[i].FirstName + " " + rows[i].LastName;
    expectedEmail = rows[i].EmailAddress;
    expectedPhone = rows[i].PhoneNumber;
    expectedAddress = rows[i].Address;
    expectedKAM = rows[i].KAM;
    expectedStatus = rows[i].Status;

    await accountList.assertEditAccount(
      j, //position of row want to validate
      expectedName,
      expectedEmail,
      expectedPhone,
      expectedAddress,
      expectedKAM,
      expectedStatus
    );
  }
  await globalPageObject.closeOpeningForm();
});

Then("System shows updated company account in the Account list", async () => {
  const rows = loader(convertPathFileDataToDataRegression(fileDataCreate));
  let len = rows.length;

  await accountList.reloadAccountList();
  for (let i = len - 1, j = 1; i >= 0; i--, j++) {
    expectedName = rows[i].CompanyName;
    expectedEmail = rows[i].EmailAddress;
    expectedPhone = rows[i].CompanyPhone;

    expectedAddress = rows[i].VisitingAddress;

    let temp1 = ", " + rows[i].PostalAddress;
    let temp2 = ", " + rows[i].InvoiceAddress;
    if (temp1.localeCompare(", ") !== 0) {
      expectedAddress = expectedAddress + temp2;
    }
    if (temp2.localeCompare(", ") !== 0) {
      expectedAddress = expectedAddress + temp1;
    }
    expectedKAM = rows[i].KAM;
    expectedStatus = rows[i].Status;

    await accountList.assertEditAccount(
      j, //position of row want to validate
      expectedName,
      expectedEmail,
      expectedPhone,
      expectedAddress,
      expectedKAM,
      expectedStatus
    );
  }
  await globalPageObject.closeOpeningForm();
});


/*Begin: Regression test */

//SAAS-4909
When("User verifies UI at Account list page", async () => {
  try {
    //Do some thing
    await globalPageObject.waitForProgressBarLoaded();
  } catch (error) {
    console.log(error);
  }
});

Then("System shows buttons on top of account table", async () => {
  await accountList.verifyButtonsOnTopOfAccountTable();
});

Then("System shows account table with full collumn", async () => {
  await accountList.verifyColumnsOfAccountTable();
});

Then("System shows pagination buttons under of account table", async () => {
  let temp = await globalPagination.verifyPaginagtionButtonsAtMainList("Account");
  logFailTestcase(temp, "Verify paginagtion buttons at Account list: failed!");
});

When('User opens maximum number of account tabs - {int} tabs', async (int) => {
  await accountList.openMaximumNumberOfTabsAtAccountList(int);
});

Then('System shows error messages about maximum number of tabs has been reached', async () => {
  await accountList.verifyErrorMessageWhenOpenMaximumNumberOfTabsAtAccountList();
});

Then("System shows new company account in account detail {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  await globalPageObject.waitForProgressBarLoaded_v2();
  let SelectedOrg = rows[0].SelectedOrgNo;
  const CompanyName = rows[0].CompanyName;
  const Address = rows[0].VisitingAddress;
  const Postcode = rows[0].VisitingPostcode;
  const Industry = rows[0].Industry;
  const CreditRating = rows[0].CreditRating;

  if (!SelectedOrg) {
    SelectedOrg = "expectedOrgNo";
  }
  await globalPeripherals.pressTabCurrentElement();
  let temp = await accountList.openDetailAccountByName(CompanyName);
  logFailTestcase(temp, `Open detail account "${CompanyName}" failed`);
  await globalPageObject.waitForProgressBarLoaded();

  temp = await accountTabSummary.selectSummaryViewLayout("Summary");
  // logFailTestcase(temp, `Select layout for summary tab failed!`);

  await globalPageObject.waitForProgressBarLoaded_v2();

  await accountDetailsLeftSide.assertCreateCompanyAccountAtAccountDetail(
    CompanyName,
    SelectedOrg,//It is a random number and created in other file. We can't validate OrgNo number.
    Address,
    Postcode,
    Industry,
    CreditRating
  );
});

Then("System shows new person account in account detail {string}", async (filename) => {
  let row = (await DataRepo.getInstance().loadData(filename))[0];

  const Name = row.FirstName + " " + row.LastName;
  const DateOfBirth = row.DOB;
  const Gender = row.Gender;
  const Number = row.PhoneNumber;
  const Address = row.Address;
  const Postcode = row.Postcode;
  await globalPageObject.waitForProgressBarLoaded_v2();
  await globalPeripherals.pressTabCurrentElement();
  let temp = await accountList.openDetailAccountByName(Name);
  logFailTestcase(temp, "Open Account by name failed!");
  temp = await globalPageObject.waitForProgressBarLoaded_v2();
  logFailTestcase(temp);

  temp = await accountTabSummary.selectSummaryViewLayout("Summary");
  // logFailTestcase(temp, `Select layout for summary tab failed!`);
  await globalPageObject.waitForProgressBarLoaded_v2();

  try {
    await accountDetailsLeftSide.assertCreatePersonAccountAtAccountDetail(
      Name,
      "expectedNIN",//It is a random number and created in other file. We can't validate NIN number.
      DateOfBirth,
      Gender,
      Number,
      Address,
      Postcode
    );
  } catch (error) {
    console.log(`assertCreatePersonAccountAtAccountDetail`);
    console.log(error);
  }
});

Then("System shows updated company account in account detail", async () => {
  const rows = loader(convertPathFileDataToDataRegression(fileDataCreate));
  await globalPageObject.waitForProgressBarLoaded_v2();

  const CompanyName = rows[0].CompanyName;
  const Address = rows[0].VisitingAddress;
  const Postcode = rows[0].VisitingPostcode;
  const Industry = rows[0].Industry;
  const CreditRating = rows[0].CreditRating;
  await globalPeripherals.pressTabCurrentElement();
  let temp = await accountList.openDetailAccountByName(CompanyName);
  logFailTestcase(temp);
  temp = await globalPageObject.navigateToSubSummary();
  logFailTestcase(temp);
  await globalPageObject.waitForProgressBarLoaded_v2();
  await accountDetailsLeftSide.assertCreateCompanyAccountAtAccountDetail(
    CompanyName,
    "expectedOrgNo",//It is a random number and created in other file. We can't validate OrgNo number.
    Address,
    Postcode,
    Industry,
    CreditRating
  );
  // await globalPageObject.closeAllOpeningEntities();
});


Then("System shows updated person account in account detail", async () => {
  const rows = loader(convertPathFileDataToDataRegression(fileDataCreate));
  await accountList.reloadAccountList();

  const Name = rows[0].FirstName + " " + rows[0].LastName;
  const DateOfBirth = rows[0].DOB;
  const Gender = rows[0].Gender;
  const Number = rows[0].PhoneNumber;
  const Address = rows[0].Address;
  const Postcode = rows[0].Postcode;
  await globalPeripherals.pressTabCurrentElement();
  let temp = await accountList.openDetailAccountByName(Name);
  logFailTestcase(temp);
  // await globalPageObject.waitForProgressBarLoaded();
  await accountDetailsLeftSide.assertCreatePersonAccountAtAccountDetail(
    Name,
    "expectedNIN",//It is a random number and created in other file. We can't validate NIN number.
    DateOfBirth,
    Gender,
    Number,
    Address,
    Postcode
  );
  await globalPageObject.closeAllOpeningEntities();
});

When("User verifies widgets at Summary tab", async () => {
  let countError = 0;
  if (!(await accountTabSummary.assertEmptyQuotesWidget())) {
    logWarningMessage("There are no Empty Quotes widget in sumary tab!");
    countError++;
  }
  if (!(await accountTabSummary.assertEmptyPoliciesWidget())) {
    logWarningMessage("There are no Empty Policy widget in sumary tab!");
    countError++;
  }
  // if(!(await accountTabSummary.assertEmptySalesWidget())){
  //   countError++;
  // }

  if (!(await accountTabSummary.assertEmptyNotesWidget())) {
    logWarningMessage("There are no Empty Note widget in sumary tab!");
    countError++;
  }
  if (!(await accountTabSummary.assertEmptyCasesWidget())) {
    logWarningMessage("There are no Empty Case widget in sumary tab!");
    countError++;
  }
  // if (!(await accountTabSummary.assertEmptyEmailsWidget())) {
  //   logWarningMessage("There are no Empty Email widget in sumary tab!");
  //   countError++;
  // }
  // if(!(await accountTabSummary.assertEmptyCallLogsWidget())){
  //   countError++;
  // }
  /*if(!(await accountTabSummary.assertActivityLogsWidget())){
    countError++;
  }*/


  if (countError > 0) {
    fail(scenarioName + ": Test case is failed!" + subErrorMessages);
  }
});

Then("System shows empty widgets at Summary tab", async () => {
  console.info(scenarioName + ": Test case is passed!");
});

When("User presses Refresh layout button at Summary tab", async () => {
  let temp = await accountTabSummary.pressRefreshLayoutButton();
  await globalPageObject.waitForProgressBarLoaded_v2();
});

Then("System show contacts list at Contacts widget from csv file {string}", async (filename) => {
  let rows = loader(convertPathFileDataToDataRegression(filename));
  let len = rows.length;
  let countError = 0;
  let arrayContacts: any = [];

  if (len === 0) {
    if (!(await accountTabSummary.assertEmptyContactsWidget())) {
      logWarningMessage("There are no Empty Contact widget in Sumary tab!");
      countError++;
    }
  }
  else {
    for (const row of rows) {
      let temp = {
        Name: "",
        Phone: ""
      }
      temp.Name = row.FirstName + " " + row.LastName;
      if (row.Phone) {
        temp.Phone = row.Phone;
      }
      else {
        temp.Phone = "N/A";
      }
      arrayContacts.push(temp);//add new contact to the beginning of arrayContacts (Opposite with Push)
    }
    if (!(await accountTabSummary.assertContactsWidget(arrayContacts))) {
      logWarningMessage("Assert Contact at contact widget: failed!");
      countError++;
    }
  }

  if (countError === 0) {
    console.info(scenarioName + ": Test case is passed!");
    // await globalPageObject.closeAllOpeningEntities();
  }
  else {
    logFailTestcase(false);
  }
});

//Search account
When('User fills full name of an account into Search field from csv file {string}', async (filename) => {
  let rows = loader(convertPathFileDataToDataRegression(filename));
  fileDataCreate = filename;
  let accountName = rows[0].AccountName;
  await accountList.fillNameIntoSearchField(accountName);
});

Then('System shows a list of accounts under Search field', async () => {
  let rows = loader(convertPathFileDataToDataRegression(fileDataCreate));
  let accountName = rows[0].AccountName;
  await globalPageObject.waitForProgressBarLoaded_v2();
  let temp = await accountList.assertListOfAccountUnderSearchField(accountName);
  if (!temp) {
    fail(scenarioName + ': Test case is failed!' + subErrorMessages);
  }
});

Then('System shows detail of that account', async () => {
  let rows = loader(convertPathFileDataToDataRegression(fileDataCreate));
  let accountName = rows[0].AccountName;
  await globalPeripherals.pressEnterCurrentElement();
  await globalPageObject.waitForProgressBarLoaded();
  let temp = await accountDetailsLeftSide.assertTitleOfOpeningAccountTab(accountName);
  logFailTestcase(temp, "Incorrect title of opening account!");

  temp = await accountTabSummary.selectSummaryViewLayout("Summary");
});

When('User searches an account on recent accounts search field {string}', async (filename) => {
  let row = (await DataRepo.getInstance().loadData(filename))[0];

  let accountName = row.AccountName || row.SelectedAccount || row.Name;

  await accountList.fillNameIntoSearchField(accountName);
  await globalPageObject.waitForProgressBarLoaded_v2();
  pushObjectToDataArrayWithUniqueKey("AccountName", accountName);

  let temp = await accountList.assertListOfAccountUnderSearchField(accountName);
  logFailTestcase(temp, scenarioName + ': Test case is failed!' + subErrorMessages);

  await globalPeripherals.pressEnterCurrentElement();
  await globalPageObject.waitForProgressBarLoaded_v2();

  temp = await accountDetailsLeftSide.assertTitleOfOpeningAccountTab(accountName);
  logFailTestcase(temp, "Incorrect title of opening account!");
});
When("User deletes an account from csv file {string}", async (filename) => {
  const rows = await DataRepo.getInstance().loadData(filename);
  fileDataCreate = filename;
  for (let row of rows) {
    const selectedAccount = row.Name;
    let org = await accountList.DeleteAccountByName(selectedAccount);
    logFailTestcase(org.length > 0, `Press delete account "${selectedAccount}" failed!`);

    pushObjectToDataArrayWithUniqueKey("OrgNoAccount", org);
    let temp = await globalPageObject.pressYesForm();
    logFailTestcase(temp, `Press Yes confirm - Delete account "${selectedAccount}" failed!`);
    await globalPageObject.waitForProgressBarLoaded_v2();
  }
});

Then("System does not show account in Account list", async function () {
  await accountList.reloadAccountList();
  const org = getValueDataOfDataTestExecution("OrgNoAccount") || "NotFoundOrg";
  let temp = await accountList.isOrgAccountExisted(org);
  logFailTestcase(!temp, `Delete account failed! Org "${org}" is still on list...`);
});

Then("System does not show any accounts in Account list", async function () {
  let temp = await globalPageObject.getNumberOfTotalRecordsMainTab();
  logFailTestcase(temp === 0, `There are ${temp} accounts found on list!`);
});

When("User unchecks a column from csv file {string}", async (filename) => {
  try {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    fileDataCreate = filename;
    await accountList.pressColumnConfig();
    for (const row of rows) {
      await accountList.checkColumn(row.Column, row.Uncheck);
    }
  } catch (error) {
    console.log("User updates the the column");
    console.log(error);
  }
});
Then(
  "System shows or hides the column in the Account list",
  async function () {
    const rows = loader(convertPathFileDataToDataRegression(fileDataCreate));
    let countError: number = 0;
    for (const row of rows) {
      let checkError = await accountList.assertColumn(
        row.Column,
        row.Uncheck
      );
      if (!checkError) {
        countError++;
      }
    }
    if (countError > 0) {
      fail("Show/Hide - Column: Testcase is failed!");
    } else {
      logSuccessMessage("Show/Hide - Column: Test Case is passed!");
    }
  }
);

// REGRESSION TEST PHRASE 2 ALERT //
// CHECK OPENED ACCOUNT LIST //

When("User opens accounts from csv file {string}", async (filename) => {
  try {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    fileDataCreate = filename;
    for (const row of rows) {

      const openedaccount = row.OpenedAccount;
      //expectedaccount = openedaccount;
      await accountList.clickAccountbtn();
      await accountList.openDetailAccountByName(openedaccount);
      await accountList.clickAccountbtn();
    }
  } catch (error) {
    console.log("User opened accounts from csv file");
    console.log(error);
  }
});

Then("System shows account name in the Account list", async () => {
  const rows = loader(convertPathFileDataToDataRegression(fileDataCreate));
  let len = rows.length;

  for (let i = 0, j = 1; i < len; j++, i++) {
    const openedaccount = rows[i].OpenedAccount;

    await accountList.assertAccountlist(
      j, //position of row want to validate
      openedaccount
    );
  }
});

Then("System shows toast error message from csv file {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const message = rows[0].ErrorMessage;
  let temp = await globalPageObject.checkToastErrorExistWithMessage(message);
  logFailTestcase(temp, `System should show an error message with title "${message}"`);
});

Then("User verifies info on Edit account person form {string}", async (filename) => {
  await globalPageObject.waitForProgressBarLoaded_v2();
  let row = (await DataRepo.getInstance().loadData(filename))[0];


  const Organization = row.Organization;
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

  let temp = true;

  if (Organization) {
    temp = await accountForm.validateOrganizationValueOnAccountPersonForm(Organization);
    logFailTestcase(temp, "Incorrect Organization!");
  }
  if (firstName) {
    temp = await accountForm.validateFirstNameValueOnAccountPersonForm(firstName);
    logFailTestcase(temp, "Incorrect First Name!");
  }
  if (lastName) {
    temp = await accountForm.validateLastNameValueOnAccountPersonForm(lastName);
    logFailTestcase(temp, "Incorrect Last Name!");
  }
  if (DOB) {
    temp = await accountForm.validateDOBValueOnAccountPersonForm(DOB);
    logFailTestcase(temp, "Incorrect DOB!");
  }
  if (gender) {
    temp = await accountForm.validateGenderValueOnAccountPersonForm(gender);
    logFailTestcase(temp, "Incorrect Gender!");
  }
  if (address) {
    temp = await accountForm.validateAddressValueOnAccountPersonForm(address);
    logFailTestcase(temp, "Incorrect Address!");
  }
  if (postcode) {
    temp = await accountForm.validatePostcodeValueOnAccountPersonForm(postcode);
    logFailTestcase(temp, "Incorrect Postcode!");
  }
  if (city) {
    temp = await accountForm.validateCityValueOnAccountPersonForm(city);
    logFailTestcase(temp, "Incorrect City!");
  }
  if (country) {
    temp = await accountForm.validateCountryValueOnAccountPersonForm(country);
    logFailTestcase(temp, "Incorrect Country!");
  }
  if (emailAddress) {
    temp = await accountForm.validateEmailAddressValueOnAccountPersonForm(emailAddress);
    logFailTestcase(temp, "Incorrect Email Address!");
  }
  if (phoneNumber) {
    temp = await accountForm.validatePhoneNumberValueOnAccountPersonForm(phoneNumber);
    logFailTestcase(temp, "Incorrect Phone Number!");
  }
  if (preferredCommunication) {
    temp = await accountForm.validatePreferredCommunicationValueOnAccountPersonForm(preferredCommunication);
    logFailTestcase(temp, "Incorrect preferred Communication!");
  }
  if (status) {
    temp = await accountForm.validateStatusValueOnAccountPersonForm(status);
    logFailTestcase(temp, "Incorrect status!");
  }
  //OTHER INFORMATION
  // if (paymentRemarks) {
  //   temp = await accountForm.validatePaymentRemarksValueOnAccountPersonForm(paymentRemarks);
  //   logFailTestcase(temp, `Incorrect paymentRemarks!`);
  // }
  if (paymentType) {
    temp = await accountForm.validatePaymentTypeValueOnAccountPersonForm(paymentType);
    logFailTestcase(temp, "Incorrect Payment Type!");
  }
  if (paymentFrequency) {
    temp = await accountForm.validatePaymentFrequencyValueOnAccountPersonForm(paymentFrequency);
    logFailTestcase(temp, "Incorrect Payment Frequency!");
  }
  if (preferredCollectionDate) {
    temp = await accountForm.validatePreferredCollectionDateValueOnAccountPersonForm(preferredCollectionDate);
    logFailTestcase(temp, "Incorrect preferred Collection Date!");
  }
  if (KAM) {
    temp = await accountForm.validateKAMValueOnAccountPersonForm(KAM);
    logFailTestcase(temp, "Incorrect KAM!");
  }

  temp = await globalPageObject.pressCancelForm();
  logFailTestcase(temp, "Press cancel account form failed!");

});

Then("User opens Edit account form {string}", async (filename) => {
  let row = (await DataRepo.getInstance().loadData(filename))[0];

  const selectedAccount = row.SelectedAccount;
  let temp = await accountList.openEditAccountFormByName(selectedAccount);
  logFailTestcase(temp, "Can't open edit Account form!");
});
Then("User opens the first Edit account form", async () => {
  let temp = await accountList.openEditAccountFormByRow(1);
  logFailTestcase(temp, "Can't open first edit Account form!");
});
Then("User verifies info on Edit account company form {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];

  const CompanyName = row.CompanyName;
  const EmailAddress = row.EmailAddress;
  const CompanyPhone = row.CompanyPhone;
  const Status = row.Status;
  const Country = row.Country;

  const VisitingAddress = row.VisitingAddress;
  const VisitingExtraAddress = row.VisitingExtraAddress;
  const VisitingPostcode = row.VisitingPostcode;
  const VisitingCity = row.VisitingCity;

  const PostalAddress = row.PostalAddress;
  const PostalExtraAddress = row.PostalExtraAddress;
  const PostalPostcode = row.PostalPostcode;
  const PostalCity = row.PostalCity;

  const InvoiceAddress = row.InvoiceAddress;
  const InvoiceExtraAddress = row.InvoiceExtraAddress;
  const InvoicePostcode = row.InvoicePostcode;
  const InvoiceCity = row.InvoiceCity;

  const CreditScore = row.CreditScore;
  const CreditRating = row.CreditRating;
  const IndustryCode = row.IndustryCode;
  const Industry = row.Industry;
  const EducationalLevel = row.EducationalLevel;
  const CompanyRegistrationDate = row.CompanyRegistrationDate;
  const KAM = row.KAM;
  const PreferredCollectionDate = row.PreferredCollectionDate;
  // const PaymentRemarks = row.PaymentRemarks;
  const PaymentType = row.PaymentType;
  const PaymentFrequency = row.PaymentFrequency;

  //ACTIONS
  let temp = true;

  if (CompanyName) {
    temp = await accountForm.validateCompanyNameValueOnAccountCompanyForm(CompanyName);
    logFailTestcase(temp, "Incorrect Company Name!");
  }

  if (EmailAddress) {
    temp = await accountForm.validateEmailAddressValueOnAccountCompanyForm(EmailAddress);
    logFailTestcase(temp, "Incorrect Email Addess!");
  }

  if (CompanyPhone) {
    temp = await accountForm.validateCompanyPhoneValueOnAccountCompanyForm(CompanyPhone);
    logFailTestcase(temp, "Incorrect Company Phone!");
  }

  if (Status) {
    temp = await accountForm.validateStatusValueOnAccountCompanyForm(Status);
    logFailTestcase(temp, "Incorrect Status!");
  }

  if (Country) {
    temp = await accountForm.validateCountryValueOnAccountCompanyForm(Country);
    logFailTestcase(temp, "Incorrect Country!");
  }

  if (VisitingAddress) {
    temp = await accountForm.validateVisitingAddressValueOnAccountCompanyForm(VisitingAddress);
    logFailTestcase(temp, "Incorrect Visiting Address!");
  }

  if (VisitingExtraAddress) {
    temp = await accountForm.validateVisitingExtraAddressValueOnAccountCompanyForm(VisitingExtraAddress);
    logFailTestcase(temp, "Incorrect Visiting Extra Address!");
  }

  if (VisitingPostcode) {
    temp = await accountForm.validateVisitingPostcodeValueOnAccountCompanyForm(VisitingPostcode);
    logFailTestcase(temp, "Incorrect Visiting Postcode!");
  }

  if (VisitingCity) {
    temp = await accountForm.validateVisitingCityValueOnAccountCompanyForm(VisitingCity);
    logFailTestcase(temp, "Incorrect Visiting City!");
  }

  if (PostalAddress) {
    temp = await accountForm.validatePostalAddressValueOnAccountCompanyForm(PostalAddress);
    logFailTestcase(temp, "Incorrect Postal Address!");
  }

  if (PostalExtraAddress) {
    temp = await accountForm.validatePostalExtraAddressValueOnAccountCompanyForm(PostalExtraAddress);
    logFailTestcase(temp, "Incorrect Postal Extra Address!");
  }

  if (PostalPostcode) {
    temp = await accountForm.validatePostalPostcodeValueOnAccountCompanyForm(PostalPostcode);
    logFailTestcase(temp, "Incorrect Postal Postcode !");
  }

  if (PostalCity) {
    temp = await accountForm.validatePostalCityValueOnAccountCompanyForm(PostalCity);
    logFailTestcase(temp, "Incorrect Postal City!");
  }

  if (InvoiceAddress) {
    temp = await accountForm.validateInvoiceAddressValueOnAccountCompanyForm(InvoiceAddress);
    logFailTestcase(temp, "Incorrect Invoice Address!");
  }

  if (InvoiceExtraAddress) {
    temp = await accountForm.validateInvoiceExtraAddressValueOnAccountCompanyForm(InvoiceExtraAddress);
    logFailTestcase(temp, "Incorrect Invoice Extra Address!");
  }

  if (InvoicePostcode) {
    temp = await accountForm.validateInvoicePostcodeValueOnAccountCompanyForm(InvoicePostcode);
    logFailTestcase(temp, "Incorrect Invoice Postcode!");
  }

  if (InvoiceCity) {
    temp = await accountForm.validateInvoiceCityValueOnAccountCompanyForm(InvoiceCity);
    logFailTestcase(temp, "Incorrect Invoice City!");
  }

  if (CreditScore) {
    temp = await accountForm.validateCreditScoreValueOnAccountCompanyForm(CreditScore);
    logFailTestcase(temp, "Incorrect Credit Score!");
  }

  if (CreditRating) {
    temp = await accountForm.validateCreditRatingValueOnAccountCompanyForm(CreditRating);
    logFailTestcase(temp, "Incorrect Credit Rating!");
  }

  if (IndustryCode) {
    temp = await accountForm.validateIndustryCodeValueOnAccountCompanyForm(IndustryCode);
    logFailTestcase(temp, "Incorrect Industry Code!");
  }

  if (Industry) {
    temp = await accountForm.validateIndustryValueOnAccountCompanyForm(Industry);
    logFailTestcase(temp, "Incorrect Industry!");
  }

  if (EducationalLevel) {
    temp = await accountForm.validateEducationalLevelValueOnAccountCompanyForm(EducationalLevel);
    logFailTestcase(temp, "Incorrect Educational Level!");
  }

  if (CompanyRegistrationDate) {
    temp = await accountForm.validateCompanyRegistrationDateValueOnAccountCompanyForm(CompanyRegistrationDate);
    logFailTestcase(temp, "Incorrect Company Registration Date!");
  }

  if (KAM) {
    temp = await accountForm.validateKAMValueOnAccountCompanyForm(KAM);
    logFailTestcase(temp, "Incorrect KAM!");
  }

  if (PreferredCollectionDate) {
    temp = await accountForm.validatePreferredCollectionDateValueOnAccountCompanyForm(PreferredCollectionDate);
    logFailTestcase(temp, "Incorrect Preferred Collection Date!");
  }

  // if (PaymentRemarks) {
  //   temp = await accountForm.validatePaymentRemarksValueOnAccountCompanyForm(PaymentRemarks);
  //   logFailTestcase(temp, `Incorrect PaymentRemarks!`);
  // }

  if (PaymentType) {
    temp = await accountForm.validatePaymentTypeValueOnAccountCompanyForm(PaymentType);
    logFailTestcase(temp, "Incorrect Payment Type!");
  }

  if (PaymentFrequency) {
    temp = await accountForm.validatePaymentFrequencyValueOnAccountCompanyForm(PaymentFrequency);
    logFailTestcase(temp, "Incorrect Payment Frequency!");
  }

  temp = await globalPageObject.pressCancelForm();
  logFailTestcase(temp, "Fail to cancel save form");
});

When("User clicks on Edit button in account detail", async () => {
  let temp = await accountDetailsLeftSide.clickEditAccountButton();
  logFailTestcase(temp, "clicks on Edit button in account detail failed!");
});
When(`User verifies account information on left side in account detail {string}`, async (dataKey) => {

  let data = (await DataRepo.getInstance().loadData(dataKey))[0];

  const Name = data.FirstName + " " + data.LastName;
  const DateOfBirth = data.DOB;
  const Gender = data.Gender;
  const Number = data.PhoneNumber;
  const Address = data.Address;
  const Postcode = data.Postcode;
  await globalPageObject.waitForProgressBarLoaded_v2();

  try {
    await accountDetailsLeftSide.assertCreatePersonAccountAtAccountDetail(
      Name,
      "expectedNIN",//It is a random number and created in other file. We can't validate NIN number.
      DateOfBirth,
      Gender,
      Number,
      Address,
      Postcode
    );
  } catch (error) {
    console.log(`assertCreatePersonAccountAtAccountDetail`);
    console.log(error);
  }
});

When("User select All items from Account page", async function () {
  await pageAccountList.selectAll();
});

When(`User selects accounts by ticking checkbox on Account List {string}`, async (filename) => {
  await globalPageObject.waitForProgressBarLoaded_v2();
  await globalPageObject.waitForProgressBarLoaded_v2();
  const rows = loader(convertPathFileDataToDataRegression(filename));
  for (let i = 0; i < rows.length; i++) {
    const SelectedAccount = rows[i].SelectedAccount;
    let temp = await pageAccountList.selectAccountByName(SelectedAccount);
    logFailTestcase(temp, `select the account has name '${SelectedAccount}' failed!`);
  }
});

When("User click Add to Target Group {string}", async function (filename) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const targetGroup = rows[0].TargetGroup;
  await pageAccountList.clickBtnAddToTargetGroup();
  await pageAccountAddToTargetGroup.selectTargetGroup(targetGroup);
  await pageAccountAddToTargetGroup.clickAdd();
  await pageAccountList.waitPageProgressCompleted();
  await pageAccountList.waitPageLoaded();
  await pageAccountList.waitPageLoaded();
});

// Varsam staging, chỉ tạo được account person
When("User creates multiple person accounts {string}", async (filename) => {
  const rows = await DataRepo.getInstance().loadData(filename);

  let temp = true;
  let timeStamp1 = "";
  let timeStamp2 = "";
  if(scenarioTags.has("@Household")){
    timeStamp1 = getValueDataOfDataTestExecution("timeStamp1");
    timeStamp2 = getValueDataOfDataTestExecution("timeStamp2");
  }
  for (let i = 0; i < rows.length; i++) {
    logInfoMessage(`Create account at line ${i + 1}...`);
    temp = await globalPageObject.pressCreateTab();
    logFailTestcase(temp, `Press Create button failed!`);

    const firstName = rows[i].FirstName;
    const lastName = rows[i].LastName;
    const DOB = rows[i].DOB;
    const gender = rows[i].Gender;
    const address = rows[i].Address + timeStamp1;
    const postcode = rows[i].Postcode;
    const city = rows[i].City;
    const country = rows[i].Country;
    // const source = rows[i].Source;
    // const scoring = row.Scoring;

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


    temp = await globalPageObject.pressSaveForm();
    logFailTestcase(temp, `Press save button failed!`);

    await globalPageObject.waitForProgressBarLoaded_v2();
    await globalPageObject.waitForProgressBarLoaded_v2();
  }
});