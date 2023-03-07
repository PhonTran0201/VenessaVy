import { Before, Given, Then, When } from "@cucumber/cucumber";
import { DataRepo } from "../../../../core/modals/DataRepo";
import { AccountTabContactForm } from "../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-contact/AccountTabContactForm";
import { AccountTabContactList } from "../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-contact/AccountTabContactList";
import { AccountTabSummary } from "../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-summary/AccountTabSummary";
import { AccountList } from "../../../../page-objects/back-office-portal/general/account/account-list/AccountList";
import { AppEntityWidgets } from "../../../../page-objects/back-office-portal/general/app-entity-widgets/AppEntityWidgets";
import { ContactDetailsLeftSide } from "../../../../page-objects/back-office-portal/general/contact/contact-details/left-side/ContactDetailsLeftSide";
import { ContactForm } from "../../../../page-objects/back-office-portal/general/contact/contact-forms/ContactForm";
import { ContactList } from "../../../../page-objects/back-office-portal/general/contact/contact-list/ContactList";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { GlobalPeripherals } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPeripherals";
import { convertPathFileDataToDataRegression, logFailTestcase } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";


const loader = require("csv-load-sync");
let contactForm: ContactForm;
let contactList: ContactList;
let contactDetailsLeftSide: ContactDetailsLeftSide;
let accountTabContactList: AccountTabContactList;
let accountTabContactForm: AccountTabContactForm;
let accountTabSummary: AccountTabSummary;
let accountList: AccountList;
let globalPeripherals: GlobalPeripherals;
let globalPageObject: GlobalPageObject;
let appEntityWidgets: AppEntityWidgets;
let fileDataEdit: string = "";
//Variable using to compare
let expectedName: string;
let expectedDOB: string;
let expectedType: string;
let expectedEmail: string;
let expectedPhone: string;
//Regression variable
let expectedRelatedAccount: string;
let expectedOrganization: string;

let editedRow: number;
let GlobalFileName = "";
Before(async function () {
  const context: ICommonContext = this.context;
  contactForm = new ContactForm(context.driverService);
  contactList = new ContactList(context.driverService);
  accountTabSummary = new AccountTabSummary(context.driverService);
  accountTabContactList = new AccountTabContactList(context.driverService);
  accountTabContactForm = new AccountTabContactForm(context.driverService);
  accountList = new AccountList(context.driverService);
  globalPeripherals = new GlobalPeripherals(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
  contactDetailsLeftSide = new ContactDetailsLeftSide(context.driverService);
  appEntityWidgets = new AppEntityWidgets(context.driverService);
});

Given("User opens an account person from csv file {string}", async (fileName: string) => {
  await globalPageObject.closeAllOpeningEntities();
  await globalPageObject.navigateToMainAccountList();
  let rows = loader(convertPathFileDataToDataRegression(fileName));
  GlobalFileName = fileName;
  let selectedAccount = rows[0].SelectedAccount;
  await globalPeripherals.pressTabCurrentElement();
  await accountList.openDetailAccountByName(selectedAccount);
});
Given("User opens an account company from csv file {string}", async (fileName: string) => {
  await globalPageObject.closeAllOpeningEntities();
  await globalPageObject.navigateToMainAccountList();
  let rows = loader(convertPathFileDataToDataRegression(fileName));
  GlobalFileName = fileName;
  let selectedAccount = rows[0].SelectedAccount;
  await globalPeripherals.pressTabCurrentElement();
  await accountList.openDetailAccountByName(selectedAccount);
});

Given("User edits a person contact from csv file {string}", async (fileName: string) => {
  let rows = loader(convertPathFileDataToDataRegression(fileName));
  GlobalFileName = fileName;
  let selectedContact = rows[0].SelectedContact;
  await accountTabContactList.pressEditContactByName(selectedContact);
});
Given("User edits a company contact from csv file {string}", async (fileName: string) => {
  let rows = loader(convertPathFileDataToDataRegression(fileName));
  GlobalFileName = fileName;
  let selectedContact = rows[0].SelectedContact;
  editedRow = await accountTabContactList.pressEditContactByName(selectedContact);
});
Given("User opens an account company from precondition steps", async () => {
  await globalPageObject.closeAllOpeningEntities();
  let temp = await globalPageObject.navigateToMainAccountList();
  logFailTestcase(temp, "Navigate to Account list failed");
  temp = await accountList.openAccountFormByType("company");
  logFailTestcase(temp);
});

// Navigates to Contact tab at Entity detail: Account, Sale,....
Given("User is on Contacts popup", async () => {
  let temp = await globalPageObject.navigateToSubContacts();
  logFailTestcase(temp, "Navigates to Contacts tab failed!");
});

//Navigates to Contact list at Contac global
Given("User navigates to Contact list", async () => {
  let temp = await globalPageObject.navigateToMainContactList();
  logFailTestcase(temp, "Navigates to Contact list failed!");
  await globalPageObject.closeAllOpeningEntities();
});

When("User inputs valid person contacts data", async () => {
  let rows = loader(convertPathFileDataToDataRegression(GlobalFileName));
  for (const row of rows) {
    await globalPageObject.waitForProgressBarLoaded_v2(500);
    await globalPageObject.waitForProgressBarLoaded_v2(500);
    let temp = await accountTabContactList.pressCreateContactEntityDetail();
    logFailTestcase(temp, "Press create contact failed!");
    const firstName = row.FirstName;
    const lastName = row.LastName;
    const dateOfBirth = row.DateOfBirth;
    const email = row.Email;
    const phone = row.Phone;
    const address = row.Address;
    const postCode = row.Postcode;
    const city = row.City;
    const country = row.Country;
    const type = row.Type;
    if (firstName) {
      let temp = await accountTabContactForm.inputFirstNameOnContactForm(firstName);
      logFailTestcase(temp, "inputFirstNameOnContactForm falied!");
    }
    if (lastName) {
      let temp = await accountTabContactForm.inputLastNameOnContactForm(lastName);
      logFailTestcase(temp, "inputLastNameOnContactForm falied!");
    }
    if (dateOfBirth) {
      let temp = await accountTabContactForm.inputBirthdayOnContactForm(dateOfBirth);
      logFailTestcase(temp, "inputBirthdayOnContactForm falied!");
    }

    if (email) {
      let temp = await accountTabContactForm.inputEmailOnContactForm(email);
      logFailTestcase(temp, "inputEmailOnContactForm falied!");
    }

    if (phone) {
      let temp = await accountTabContactForm.inputPhoneOnContactForm(phone);
      logFailTestcase(temp, "inputPhoneOnContactForm falied!");
    }
    if (address) {
      let temp = await accountTabContactForm.inputAddressOnContactForm(address);
      logFailTestcase(temp, "inputAddressOnContactForm falied!");
    }

    if (postCode) {
      let temp = await accountTabContactForm.inputPostcodeOnContactForm(postCode);
      logFailTestcase(temp, "inputPostcodeOnContactForm falied!");
    }
    if (city) {
      let temp = await accountTabContactForm.inputCityOnContactForm(city);
      logFailTestcase(temp, "inputCityOnContactForm falied!");
    }
    if (country) {
      let temp = await accountTabContactForm.inputCountryOnContactForm(country);
      logFailTestcase(temp, "inputCountryOnContactForm falied!");
    }
    if (type) {
      let temp = await accountTabContactForm.inputTypeOrTitleOnContactForm(type);
      logFailTestcase(temp, "inputTypeOrTitleOnContactForm falied!");
    }
    temp = await globalPageObject.pressSaveForm();
    await globalPageObject.waitForProgressBarLoaded_v2();

    logFailTestcase(temp, "Can't save contact form!");
  }
});

When("User inputs valid person contacts data from csv file {string}", async (fileName: string) => {
  let rows = loader(convertPathFileDataToDataRegression(fileName));
  GlobalFileName = fileName;

  for (const row of rows) {
    let temp = await accountTabContactList.pressCreateContactEntityDetail();
    logFailTestcase(temp, "Press create contact failed!");
    const firstName = row.FirstName;
    const lastName = row.LastName;
    const dateOfBirth = row.DateOfBirth;
    const email = row.Email;
    const phone = row.Phone;
    const address = row.Address;
    const postCode = row.Postcode;
    const city = row.City;
    const country = row.Country;
    const type = row.Type;

    if (firstName) {
      let temp = await accountTabContactForm.inputFirstNameOnContactForm(firstName);
      logFailTestcase(temp);
    }
    if (lastName) {
      let temp = await accountTabContactForm.inputLastNameOnContactForm(lastName);
      logFailTestcase(temp);
    }
    if (dateOfBirth) {
      let temp = await accountTabContactForm.inputBirthdayOnContactForm(dateOfBirth);
      logFailTestcase(temp);
    }

    if (email) {
      let temp = await accountTabContactForm.inputEmailOnContactForm(email);
      logFailTestcase(temp);
    }

    if (phone) {
      let temp = await accountTabContactForm.inputPhoneOnContactForm(phone);
      logFailTestcase(temp);
    }
    if (address) {
      let temp = await accountTabContactForm.inputAddressOnContactForm(address);
      logFailTestcase(temp);
    }

    if (postCode) {
      let temp = await accountTabContactForm.inputPostcodeOnContactForm(postCode);
      logFailTestcase(temp);
    }
    if (city) {
      let temp = await accountTabContactForm.inputCityOnContactForm(city);
      logFailTestcase(temp);
    }
    if (country) {
      let temp = await accountTabContactForm.inputCountryOnContactForm(country);
      logFailTestcase(temp);
    }
    if (type) {
      let temp = await accountTabContactForm.inputTypeOrTitleOnContactForm(type);
      logFailTestcase(temp);
    }
    await globalPageObject.pressSaveForm();
    let save = await globalPageObject.waitForProgressBarLoaded();

    logFailTestcase(save, "Press save contact form failed!");
  }
});

When("User inputs valid person contacts data to edit", async () => {
  let rows = loader(convertPathFileDataToDataRegression(GlobalFileName));

  let row = rows[0];
  const firstName = row.FirstName;
  const lastName = row.LastName;
  const dateOfBirth = row.DateOfBirth;
  const email = row.Email;
  const phone = row.Phone;
  const address = row.Address;
  const postCode = row.Postcode;
  const city = row.City;
  const country = row.Country;
  const type = row.Type;

  // let temp = await accountTabContactForm.clearOldDataOnContactForm();
  // logFailTestcase(temp, "Clear old data on Contact form failed!");

  if (firstName) {
    let temp = await accountTabContactForm.inputFirstNameOnContactForm(firstName);
    logFailTestcase(temp);
  }
  if (lastName) {
    let temp = await accountTabContactForm.inputLastNameOnContactForm(lastName);
    logFailTestcase(temp);
  }
  if (dateOfBirth) {
    let temp = await accountTabContactForm.inputBirthdayOnContactForm(dateOfBirth);
    logFailTestcase(temp);
  }

  if (email) {
    let temp = await accountTabContactForm.inputEmailOnContactForm(email);
    logFailTestcase(temp);
  }

  if (phone) {
    let temp = await accountTabContactForm.inputPhoneOnContactForm(phone);
    logFailTestcase(temp);
  }
  if (address) {
    let temp = await accountTabContactForm.inputAddressOnContactForm(address);
    logFailTestcase(temp);
  }

  if (postCode) {
    let temp = await accountTabContactForm.inputPostcodeOnContactForm(postCode);
    logFailTestcase(temp);
  }
  if (city) {
    let temp = await accountTabContactForm.inputCityOnContactForm(city);
    logFailTestcase(temp);
  }
  if (country) {
    let temp = await accountTabContactForm.inputCountryOnContactForm(country);
    logFailTestcase(temp);
  }
  if (type) {
    let temp = await accountTabContactForm.inputTypeOrTitleOnContactForm(type);
    logFailTestcase(temp);
  }

  await globalPageObject.pressSaveForm();
  let save = await globalPageObject.waitForProgressBarLoaded();
  logFailTestcase(save, "Press save contact form failed!");
});

When("User inputs valid person contacts data to edit from csv file {string}", async function (fileName: string) {
  const rows = loader(convertPathFileDataToDataRegression(fileName));
  GlobalFileName = fileName;
  let row = rows[0];
  const firstName = row.FirstName;
  const lastName = row.LastName;
  const dateOfBirth = row.DateOfBirth;
  const email = row.Email;
  const phone = row.Phone;
  const address = row.Address;
  const postCode = row.Postcode;
  const city = row.City;
  const country = row.Country;
  const type = row.Type;

  if (firstName) {
    let temp = await accountTabContactForm.inputFirstNameOnContactForm(firstName);
    logFailTestcase(temp);
  }
  if (lastName) {
    let temp = await accountTabContactForm.inputLastNameOnContactForm(lastName);
    logFailTestcase(temp);
  }
  if (dateOfBirth) {
    let temp = await accountTabContactForm.inputBirthdayOnContactForm(dateOfBirth);
    logFailTestcase(temp);
  }

  if (email) {
    let temp = await accountTabContactForm.inputEmailOnContactForm(email);
    logFailTestcase(temp);
  }

  if (phone) {
    let temp = await accountTabContactForm.inputPhoneOnContactForm(phone);
    logFailTestcase(temp);
  }
  if (address) {
    let temp = await accountTabContactForm.inputAddressOnContactForm(address);
    logFailTestcase(temp);
  }

  if (postCode) {
    let temp = await accountTabContactForm.inputPostcodeOnContactForm(postCode);
    logFailTestcase(temp);
  }
  if (city) {
    let temp = await accountTabContactForm.inputCityOnContactForm(city);
    logFailTestcase(temp);
  }
  if (country) {
    let temp = await accountTabContactForm.inputCountryOnContactForm(country);
    logFailTestcase(temp);
  }
  if (type) {
    let temp = await accountTabContactForm.inputTypeOrTitleOnContactForm(type);
    logFailTestcase(temp);
  }
  await globalPageObject.pressSaveForm();
  let save = await globalPageObject.waitForProgressBarLoaded();
  logFailTestcase(save, "Press save contact form failed!");
});

When("User inputs valid company contacts data to edit", async () => {
  let rows = loader(convertPathFileDataToDataRegression(GlobalFileName));

  let row = rows[0];
  const firstName = row.FirstName;
  const lastName = row.LastName;
  const dateOfBirth = row.DateOfBirth;
  const email = row.Email;
  const phone = row.Phone;
  const address = row.Address;
  const postCode = row.Postcode;
  const city = row.City;
  const country = row.Country;
  const title = row.Title;

  if (firstName) {
    let temp = await accountTabContactForm.inputFirstNameOnContactForm(firstName);
    logFailTestcase(temp, "Input First name failed!");
  }
  if (lastName) {
    let temp = await accountTabContactForm.inputLastNameOnContactForm(lastName);
    logFailTestcase(temp, "Input Last name failed!");
  }
  if (dateOfBirth) {
    let temp = await accountTabContactForm.inputBirthdayOnContactForm(dateOfBirth);
    logFailTestcase(temp, "Input date of birth failed!");
  }

  if (email) {
    let temp = await accountTabContactForm.inputEmailOnContactForm(email);
    logFailTestcase(temp, "Input email failed!");
  }

  if (phone) {
    let temp = await accountTabContactForm.inputPhoneOnContactForm(phone);
    logFailTestcase(temp, "Input phone failed!");
  }
  if (address) {
    let temp = await accountTabContactForm.inputAddressOnContactForm(address);
    logFailTestcase(temp, "Input address failed!");
  }

  if (postCode) {
    let temp = await accountTabContactForm.inputPostcodeOnContactForm(postCode);
    logFailTestcase(temp, "Input post code failed!");
  }
  if (city) {
    let temp = await accountTabContactForm.inputCityOnContactForm(city);
    logFailTestcase(temp, "Input city failed!");
  }
  if (country) {
    let temp = await accountTabContactForm.inputCountryOnContactForm(country);
    logFailTestcase(temp, "Input country failed!");
  }
  if (title) {
    let temp = await accountTabContactForm.inputTypeOrTitleOnContactForm(title);
    logFailTestcase(temp, "Input title failed!");
  }
  await globalPageObject.pressSaveForm();
  let save = await globalPageObject.waitForProgressBarLoaded();
  logFailTestcase(save, "Press save contact form failed!");
});
When("User inputs valid company contacts data", async () => {
  let rows = loader(convertPathFileDataToDataRegression(GlobalFileName));

  for (const row of rows) {
    await globalPageObject.waitForProgressBarLoaded_v2(500);
    await globalPageObject.waitForProgressBarLoaded_v2(500);
    let temp = await accountTabContactList.pressCreateContactEntityDetail();
    logFailTestcase(temp, "Press create Contact failed!");
    const firstName = row.FirstName;
    const lastName = row.LastName;
    const dateOfBirth = row.DateOfBirth;
    const email = row.Email;
    const phone = row.Phone;
    const address = row.Address;
    const postCode = row.Postcode;
    const city = row.City;
    const country = row.Country;
    const title = row.Title;

    if (firstName) {
      let temp = await accountTabContactForm.inputFirstNameOnContactForm(firstName);
      logFailTestcase(temp, "inputFirstNameOnContactForm falied!");
    }
    if (lastName) {
      let temp = await accountTabContactForm.inputLastNameOnContactForm(lastName);
      logFailTestcase(temp, "inputLastNameOnContactForm falied!");
    }
    if (dateOfBirth) {
      let temp = await accountTabContactForm.inputBirthdayOnContactForm(dateOfBirth);
      logFailTestcase(temp, "inputBirthdayOnContactForm falied!");
    }

    if (email) {
      let temp = await accountTabContactForm.inputEmailOnContactForm(email);
      logFailTestcase(temp, "inputEmailOnContactForm falied!");
    }

    if (phone) {
      let temp = await accountTabContactForm.inputPhoneOnContactForm(phone);
      logFailTestcase(temp, "inputPhoneOnContactForm falied!");
    }
    if (address) {
      let temp = await accountTabContactForm.inputAddressOnContactForm(address);
      logFailTestcase(temp, "inputAddressOnContactForm falied!");
    }

    if (postCode) {
      let temp = await accountTabContactForm.inputPostcodeOnContactForm(postCode);
      logFailTestcase(temp, "inputPostcodeOnContactForm falied!");
    }
    if (city) {
      let temp = await accountTabContactForm.inputCityOnContactForm(city);
      logFailTestcase(temp, "inputCityOnContactForm falied!");
    }
    if (country) {
      let temp = await accountTabContactForm.inputCountryOnContactForm(country);
      logFailTestcase(temp, "inputCountryOnContactForm falied!");
    }
    if (title) {
      let temp = await accountTabContactForm.inputTypeOrTitleOnContactForm(title);
      logFailTestcase(temp, "inputTypeOrTitleOnContactForm falied!");
    }
    await globalPageObject.pressSaveForm();
    let save = await globalPageObject.waitForProgressBarLoaded();

    logFailTestcase(save, "Press save contact form failed!");
  }
});
When("User inputs valid company contacts data from csv file {string}", async (fileName: string) => {
  let rows = loader(convertPathFileDataToDataRegression(fileName));
  GlobalFileName = fileName;
  for (const row of rows) {
    let temp = await accountTabContactList.pressCreateContactEntityDetail();
    logFailTestcase(temp, "Press create contact failed");
    const firstName = row.FirstName;
    const lastName = row.LastName;
    const dateOfBirth = row.DateOfBirth;
    const email = row.Email;
    const phone = row.Phone;
    const address = row.Address;
    const postCode = row.Postcode;
    const city = row.City;
    const country = row.Country;
    const title = row.Title;

    expectedName = firstName + " " + lastName;
    expectedDOB = dateOfBirth;
    expectedType = title;
    expectedEmail = email;
    expectedPhone = phone;

    if (firstName) {
      let temp = await accountTabContactForm.inputFirstNameOnContactForm(firstName);
      logFailTestcase(temp);
    }
    if (lastName) {
      let temp = await accountTabContactForm.inputLastNameOnContactForm(lastName);
      logFailTestcase(temp);
    }
    if (dateOfBirth) {
      let temp = await accountTabContactForm.inputBirthdayOnContactForm(dateOfBirth);
      logFailTestcase(temp);
    }

    if (email) {
      let temp = await accountTabContactForm.inputEmailOnContactForm(email);
      logFailTestcase(temp);
    }

    if (phone) {
      let temp = await accountTabContactForm.inputPhoneOnContactForm(phone);
      logFailTestcase(temp);
    }
    if (address) {
      let temp = await accountTabContactForm.inputAddressOnContactForm(address);
      logFailTestcase(temp);
    }

    if (postCode) {
      let temp = await accountTabContactForm.inputPostcodeOnContactForm(postCode);
      logFailTestcase(temp);
    }
    if (city) {
      let temp = await accountTabContactForm.inputCityOnContactForm(city);
      logFailTestcase(temp);
    }
    if (country) {
      let temp = await accountTabContactForm.inputCountryOnContactForm(country);
      logFailTestcase(temp);
    }
    if (title) {
      await accountTabContactForm.inputTypeOrTitleOnContactForm(title);
      logFailTestcase(temp);
    }
    await globalPageObject.pressSaveForm();
    let save = await globalPageObject.waitForProgressBarLoaded();

    logFailTestcase(save, "Press save contact form failed!");
  }
});

When("User inputs valid person contact data from csv file {string}", async (fileName: string) => {
  let rows = loader(convertPathFileDataToDataRegression(fileName));
  GlobalFileName = fileName;
  const firstName = rows[0].FirstName;
  const lastName = rows[0].LastName;
  const dateOfBirth = rows[0].DateOfBirth;
  const email = rows[0].Email;
  const phone = rows[0].Phone;
  const address = rows[0].Address;
  const postCode = rows[0].Postcode;
  const city = rows[0].City;
  const country = rows[0].Country;
  const type = rows[0].Type;

  expectedName = firstName + " " + lastName;
  expectedDOB = dateOfBirth;
  expectedType = type;
  expectedEmail = email;
  expectedPhone = phone;
  if (firstName) {
    let temp = await accountTabContactForm.inputFirstNameOnContactForm(firstName);
    logFailTestcase(temp);
  }
  if (lastName) {
    let temp = await accountTabContactForm.inputLastNameOnContactForm(lastName);
    logFailTestcase(temp);
  }
  if (dateOfBirth) {
    let temp = await accountTabContactForm.inputBirthdayOnContactForm(dateOfBirth);
    logFailTestcase(temp);
  }

  if (email) {
    let temp = await accountTabContactForm.inputEmailOnContactForm(email);
    logFailTestcase(temp);
  }

  if (phone) {
    let temp = await accountTabContactForm.inputPhoneOnContactForm(phone);
    logFailTestcase(temp);
  }
  if (address) {
    let temp = await accountTabContactForm.inputAddressOnContactForm(address);
    logFailTestcase(temp);
  }

  if (postCode) {
    let temp = await accountTabContactForm.inputPostcodeOnContactForm(postCode);
    logFailTestcase(temp);
  }
  if (city) {
    let temp = await accountTabContactForm.inputCityOnContactForm(city);
    logFailTestcase(temp);
  }
  if (country) {
    let temp = await accountTabContactForm.inputCountryOnContactForm(country);
    logFailTestcase(temp);
  }
  if (type) {
    let temp = await accountTabContactForm.inputTypeOrTitleOnContactForm(type);
    logFailTestcase(temp);
  }
  await globalPageObject.pressSaveForm();
  let save = await globalPageObject.waitForProgressBarLoaded();

  logFailTestcase(save, "Press save contact form failed!");
});

When("User inputs valid company contact data from csv file {string}", async (fileName: string) => {
  let rows = loader(convertPathFileDataToDataRegression(fileName));
  GlobalFileName = fileName;
  const firstName = rows[0].FirstName;
  const lastName = rows[0].LastName;
  const dateOfBirth = rows[0].DateOfBirth;
  const email = rows[0].Email;
  const phone = rows[0].Phone;
  const address = rows[0].Address;
  const postCode = rows[0].Postcode;
  const city = rows[0].City;
  const country = rows[0].Country;
  const title = rows[0].Title;

  expectedName = firstName + " " + lastName;
  expectedDOB = dateOfBirth;
  expectedType = title;
  expectedEmail = email;
  expectedPhone = phone;
  if (firstName) {
    let temp = await accountTabContactForm.inputFirstNameOnContactForm(firstName);
    logFailTestcase(temp);
  }
  if (lastName) {
    let temp = await accountTabContactForm.inputLastNameOnContactForm(lastName);
    logFailTestcase(temp);
  }
  if (dateOfBirth) {
    let temp = await accountTabContactForm.inputBirthdayOnContactForm(dateOfBirth);
    logFailTestcase(temp);
  }

  if (email) {
    let temp = await accountTabContactForm.inputEmailOnContactForm(email);
    logFailTestcase(temp);
  }

  if (phone) {
    let temp = await accountTabContactForm.inputPhoneOnContactForm(phone);
    logFailTestcase(temp);
  }
  if (address) {
    let temp = await accountTabContactForm.inputAddressOnContactForm(address);
    logFailTestcase(temp);
  }

  if (postCode) {
    let temp = await accountTabContactForm.inputPostcodeOnContactForm(postCode);
    logFailTestcase(temp);
  }
  if (city) {
    let temp = await accountTabContactForm.inputCityOnContactForm(city);
    logFailTestcase(temp);
  }
  if (country) {
    let temp = await accountTabContactForm.inputCountryOnContactForm(country);
    logFailTestcase(temp);
  }
  if (title) {
    let temp = await accountTabContactForm.inputTypeOrTitleOnContactForm(title);
    logFailTestcase(temp);
  }
  await globalPageObject.pressSaveForm();
  let save = await globalPageObject.waitForProgressBarLoaded();

  logFailTestcase(save, "Press save contact form failed!");
});

When("User selects a person contact", async () => {
  logFailTestcase(await accountTabContactList.openFirstContact(), "Open first contact failed!");
});

When("User selects a company contact", async () => {
  logFailTestcase(await accountTabContactList.openFirstContact(), "Open first contact failed!");
});

Given("User opens a contact from precondition steps", async () => {
  await globalPageObject.closeAllOpeningEntities();
  let temp = await contactList.enterContactTabByRow(1);
  logFailTestcase(temp, "Open first contact failed!");
});

Then("System shows new person contact in the Contact list", async () => {
  const rows = loader(convertPathFileDataToDataRegression(GlobalFileName));
  let len = rows.length;
  await accountTabContactList.reloadContactList();
  for (let i = len - 1, j = 1; i >= 0; i--, j++) {
    const firstName = rows[i].FirstName;
    const lastName = rows[i].LastName;
    const dateOfBirth = rows[i].DateOfBirth;
    const email = rows[i].Email;
    const phone = rows[i].Phone;
    const type = rows[i].Type;

    expectedName = firstName + " " + lastName;
    expectedDOB = dateOfBirth;
    expectedType = type;
    expectedEmail = email;
    expectedPhone = phone;

    const temp = await accountTabContactList.assertAddContact(
      j, //position of row want to validate
      expectedName,
      expectedDOB,
      expectedType,
      expectedEmail,
      expectedPhone
    );
    logFailTestcase(temp);
  }
  await globalPageObject.closeOpeningForm();
});

Then("System shows new company contact in the Contact list", async () => {
  const rows = loader(convertPathFileDataToDataRegression(GlobalFileName));
  let len = rows.length;
  await accountTabContactList.reloadContactList();
  for (let i = len - 1, j = 1; i >= 0; i--, j++) {
    const firstName = rows[i].FirstName;
    const lastName = rows[i].LastName;
    const dateOfBirth = rows[i].DateOfBirth;
    const email = rows[i].Email;
    const phone = rows[i].Phone;
    const title = rows[i].Title;

    expectedName = firstName + " " + lastName;
    expectedDOB = dateOfBirth;
    expectedType = title;
    expectedEmail = email;
    expectedPhone = phone;

    const temp = await accountTabContactList.assertAddContact(
      j, //position of row want to validate
      expectedName,
      expectedDOB,
      expectedType,
      expectedEmail,
      expectedPhone
    );
    logFailTestcase(temp);
  }
  await globalPageObject.closeOpeningForm();
});

Then("System shows updated person contact in the Contact list", async () => {
  const rows = loader(convertPathFileDataToDataRegression(GlobalFileName));
  await accountTabContactList.reloadContactList();
  const firstName = rows[0].FirstName;
  const lastName = rows[0].LastName;
  const dateOfBirth = rows[0].DateOfBirth;
  const email = rows[0].Email;
  const phone = rows[0].Phone;
  const type = rows[0].Type;

  expectedName = firstName + " " + lastName;
  expectedDOB = dateOfBirth;
  expectedType = type;
  expectedEmail = email;
  expectedPhone = phone;

  await accountTabContactList.assertUpdateContact(1, expectedName, expectedDOB, expectedType, expectedEmail, expectedPhone);
  await globalPageObject.closeOpeningForm();
});
Then("System shows updated company contact in the Contact list", async () => {
  const rows = loader(convertPathFileDataToDataRegression(GlobalFileName));
  await accountTabContactList.reloadContactList();
  const firstName = rows[0].FirstName;
  const lastName = rows[0].LastName;
  const dateOfBirth = rows[0].DateOfBirth;
  const email = rows[0].Email;
  const phone = rows[0].Phone;
  const title = rows[0].Title;

  expectedName = firstName + " " + lastName;
  expectedDOB = dateOfBirth;
  expectedType = title;
  expectedEmail = email;
  expectedPhone = phone;

  await accountTabContactList.assertUpdateContact(editedRow, expectedName, expectedDOB, expectedType, expectedEmail, expectedPhone);
  await globalPageObject.closeOpeningForm();
});

When("User deletes a contact from csv file {string}", async (filename: string) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  fileDataEdit = filename;
  for (let obj of rows) {
    const deleteContact = obj.Contact;
    let temp = await accountTabContactList.pressDeleteByName(deleteContact);
    logFailTestcase(temp, `Press delete contact "${deleteContact}" failed!`);
    //ACTIONS
    await globalPageObject.pressYesForm();
  }
});

Then("System does not show contact in the Contact list", async function () {
  const rows = loader(convertPathFileDataToDataRegression(fileDataEdit));
  let len = rows.length;
  await accountTabContactList.reloadContactList();
  for (let i = len - 1, j = 1; i >= 0; i--, j++) {
    const contactname = rows[i].Contact;

    await accountTabContactList.assertDeleteContact(
      j, //position of row want to validate
      contactname
    );
  }
});

Then("System shows new contact in the Summary", async function () {
  const rows = loader(convertPathFileDataToDataRegression(GlobalFileName));
  let len = rows.length;
  let temp = await globalPageObject.navigateToSubSummary();
  logFailTestcase(temp, "Navigate to Summary tab failed!");

  temp = await accountTabSummary.selectSummaryViewLayout("Summary");
  // logFailTestcase(temp, `Select layout for summary tab failed!`);

  await globalPageObject.waitForProgressBarLoaded_v2();
  for (let i = len - 1, j = 1; i >= 0; i--, j++) {
    const firstName = rows[i].FirstName;
    const lastName = rows[i].LastName;

    expectedName = firstName + " " + lastName;

    temp = await appEntityWidgets.assertContactSummary(j, expectedName);
    logFailTestcase(temp, `AssertContactSummary failed`);
  }
});

Then("System does not show contact in the Summary", async function () {
  const rows = loader(convertPathFileDataToDataRegression(GlobalFileName));
  let len = rows.length;
  let temp = await globalPageObject.navigateToSubSummary();
  logFailTestcase(temp);
  await globalPageObject.waitForProgressBarLoaded_v2();
  for (let i = len - 1, j = 1; i >= 0; i--, j++) {
    const contact = rows[i].Contact;
    await appEntityWidgets.assertDeleteContactSummary(
      j,
      contact
    );
  }
});

//Regression Global Contact

When("User inputs valid global contact data from csv file {string}", async (fileName: string) => {
  let rows = loader(convertPathFileDataToDataRegression(fileName));
  GlobalFileName = fileName;
  for (const row of rows) {
    let temp = await contactList.openCreateContact();
    logFailTestcase(temp, "Open Contact form failed!");
    await globalPageObject.waitForProgressBarLoaded_v2();
    const account = row.SearchAccount;
    const firstName = row.FirstName;
    const lastName = row.LastName;
    const dateOfBirth = row.DateOfBirth;
    const email = row.Email;
    const phone = row.Phone;
    const address = row.Address;
    const postCode = row.Postcode;
    const city = row.City;
    const country = row.Country;
    const role = row.Title || row.Type;

    if (account) {
      temp = await accountTabContactForm.inputAccountOnContactForm(account);
      logFailTestcase(temp, "Input account on Contact form failed!");
    }

    if (firstName) {
      temp = await accountTabContactForm.inputFirstNameOnContactForm(firstName);
      logFailTestcase(temp, "Input firstName on Contact form failed!");
    }
    if (lastName) {
      temp = await accountTabContactForm.inputLastNameOnContactForm(lastName);
      logFailTestcase(temp, "Input lastName on Contact form failed!");
    }

    if (dateOfBirth) {
      temp = await accountTabContactForm.inputBirthdayOnContactForm(dateOfBirth);
      logFailTestcase(temp, "Input dateOfBirth on Contact form failed!");
    }

    if (email) {
      temp = await accountTabContactForm.inputEmailOnContactForm(email);
      logFailTestcase(temp, "Input email on Contact form failed!");
    }
    if (phone) {
      temp = await accountTabContactForm.inputPhoneOnContactForm(phone);
      logFailTestcase(temp, "Input phone on Contact form failed!");
    }
    if (address) {
      temp = await accountTabContactForm.inputAddressOnContactForm(address);
      logFailTestcase(temp, "Input address on Contact form failed!");
    }
    if (city) {
      temp = await accountTabContactForm.inputCityOnContactForm(city);
      logFailTestcase(temp, "Input city on Contact form failed!");
    }
    if (postCode) {
      temp = await accountTabContactForm.inputPostcodeOnContactForm(postCode);
      logFailTestcase(temp, "Input postCode on Contact form failed!");
    }
    if (country) {
      temp = await accountTabContactForm.inputCountryOnContactForm(country);
      logFailTestcase(temp, "Input country on Contact form failed!");
    }
    if (role) {
      temp = await accountTabContactForm.inputTypeOrTitleOnContactForm(role);
      logFailTestcase(temp, "Input title/type on Contact form failed!");
    }

    temp = await globalPageObject.pressSaveForm();
    logFailTestcase(temp, "Can't press save form!");
  }
});
When("User inputs valid data into Edit Contact form {string}", async (fileName: string) => {
  let row = loader(convertPathFileDataToDataRegression(fileName))[0];

  await globalPageObject.waitForProgressBarLoaded_v2();
  const account = row.SearchAccount;
  const firstName = row.FirstName;
  const lastName = row.LastName;
  const dateOfBirth = row.DateOfBirth;
  const email = row.Email;
  const phone = row.Phone;
  const address = row.Address;
  const postCode = row.Postcode;
  const city = row.City;
  const country = row.Country;
  const role = row.Title || row.Type;
  let temp = true;
  if (account) {
    temp = await accountTabContactForm.inputAccountOnContactForm(account);
    logFailTestcase(temp, "Input account on Contact form failed!");
  }

  if (firstName) {
    temp = await accountTabContactForm.inputFirstNameOnContactForm(firstName);
    logFailTestcase(temp, "Input firstName on Contact form failed!");
  }
  if (lastName) {
    temp = await accountTabContactForm.inputLastNameOnContactForm(lastName);
    logFailTestcase(temp, "Input lastName on Contact form failed!");
  }

  if (dateOfBirth) {
    temp = await accountTabContactForm.inputBirthdayOnContactForm(dateOfBirth);
    logFailTestcase(temp, "Input dateOfBirth on Contact form failed!");
  }

  if (email) {
    temp = await accountTabContactForm.inputEmailOnContactForm(email);
    logFailTestcase(temp, "Input email on Contact form failed!");
  }
  if (phone) {
    temp = await accountTabContactForm.inputPhoneOnContactForm(phone);
    logFailTestcase(temp, "Input phone on Contact form failed!");
  }
  if (address) {
    temp = await accountTabContactForm.inputAddressOnContactForm(address);
    logFailTestcase(temp, "Input address on Contact form failed!");
  }
  if (city) {
    temp = await accountTabContactForm.inputCityOnContactForm(city);
    logFailTestcase(temp, "Input city on Contact form failed!");
  }
  if (postCode) {
    temp = await accountTabContactForm.inputPostcodeOnContactForm(postCode);
    logFailTestcase(temp, "Input postCode on Contact form failed!");
  }
  if (country) {
    temp = await accountTabContactForm.inputCountryOnContactForm(country);
    logFailTestcase(temp, "Input country on Contact form failed!");
  }
  if (role) {
    temp = await accountTabContactForm.inputTypeOrTitleOnContactForm(role);
    logFailTestcase(temp, "Input title/type on Contact form failed!");
  }
});
Then("System shows new contact in the Contact list", async () => {
  const rows = loader(convertPathFileDataToDataRegression(GlobalFileName));
  let len = rows.length;
  await globalPageObject.waitForProgressBarLoaded_v2();
  await accountTabContactList.reloadContactList();
  await globalPageObject.waitForProgressBarLoaded_v2();

  for (let i = len - 1, j = 1; i >= 0; i--, j++) {
    const firstName = rows[i].FirstName;
    const lastName = rows[i].LastName;
    const relatedAccount = rows[i].SearchAccount;
    const phone = rows[i].Phone;
    const email = rows[i].Email;
    // const organization = rows[i].Organization;

    expectedName = firstName + " " + lastName;
    expectedRelatedAccount = relatedAccount;
    expectedPhone = phone;
    expectedEmail = email;
    // expectedOrganization = organization;

    await contactList.assertCreateContact(
      j, //position of row want to validate
      expectedName,
      expectedRelatedAccount,
      expectedPhone,
      expectedEmail
      // expectedOrganization
    );
  }
});
Then("System shows contact in Contacts details {string}", async (fileName: string) => {
  const row = loader(convertPathFileDataToDataRegression(fileName))[0];

  const FirstName = row.FirstName;
  const LastName = row.LastName;
  const DateOfBirth = row.DateOfBirth;
  const Email = row.Email;
  const Phone = row.Phone;
  const Title = row.Title;
  const Role = row.Type;
  const Address = row.Address;
  const Postcode = row.Postcode;
  const City = row.City;
  const Country = row.Country;
  const RelatedAccount = row.SelectedAccount;
  logFailTestcase(await contactList.enterContactTabByRow(1));
  await globalPageObject.waitForProgressBarLoaded_v2();
  await globalPageObject.waitForProgressBarLoaded_v2();

  if (FirstName) {
    logFailTestcase(await contactDetailsLeftSide.validateDetailsLeftSide(FirstName, "First Name"));
  }
  if (LastName) {
    logFailTestcase(await contactDetailsLeftSide.validateDetailsLeftSide(LastName, "Last Name"));
  }
  if (DateOfBirth) {
    logFailTestcase(await contactDetailsLeftSide.validateDetailsLeftSide(DateOfBirth, "Date Of Birth"));
  }
  if (Email) {
    logFailTestcase(await contactDetailsLeftSide.validateDetailsLeftSide(Email, "Email"));
  }
  if (Phone) {
    logFailTestcase(await contactDetailsLeftSide.validateDetailsLeftSide(Phone, "Phone"));
  }
  if (Title) {
    logFailTestcase(await contactDetailsLeftSide.validateDetailsLeftSide(Title, "Title"));
  }
  // if (Role) {
  //   logFailTestcase(await contactDetailsLeftSide.validateDetailsLeftSide(Role, "Role"));
  // }
  if (Address) {
    logFailTestcase(await contactDetailsLeftSide.validateDetailsLeftSide(Address, "Address"));
  }
  if (Postcode) {
    logFailTestcase(await contactDetailsLeftSide.validateDetailsLeftSide(Postcode, "Postcode"));
  }
  if (City) {
    logFailTestcase(await contactDetailsLeftSide.validateDetailsLeftSide(City, "City"));
  }
  if (Country) {
    logFailTestcase(await contactDetailsLeftSide.validateDetailsLeftSide(Address, "Address"));
  }
  if (RelatedAccount) {
    logFailTestcase(await contactDetailsLeftSide.validateDetailsLeftSide(RelatedAccount, "Related Account"));
  }
});
Then("User presses Edit button in Contacts details", async () => {
  logFailTestcase(await contactDetailsLeftSide.enterEditContactForm());
});

Then("User verifies info on Edit contacts form {string}", async (fileName: string) => {
  const row = loader(convertPathFileDataToDataRegression(fileName))[0];
  GlobalFileName = fileName;
  const FirstName = row.FirstName;
  const LastName = row.LastName;
  const DateOfBirth = row.DateOfBirth;
  const Email = row.Email;
  const Phone = row.Phone;
  const Address = row.Address;
  const Postcode = row.Postcode;
  const City = row.City;
  const Country = row.Country;
  const Title = row.Title;
  const SearchAccount = row.SearchAccount;

  if (SearchAccount) {
    logFailTestcase(await contactForm.validateValueOnForm(SearchAccount, "Search Account"));
  }
  if (FirstName) {
    logFailTestcase(await contactForm.validateValueOnForm(FirstName, "First Name"));
  }
  if (LastName) {
    logFailTestcase(await contactForm.validateValueOnForm(LastName, "Last Name"));
  }
  if (DateOfBirth) {
    logFailTestcase(await contactForm.validateValueOnForm(DateOfBirth, "Date Of Birth"));
  }
  if (Email) {
    logFailTestcase(await contactForm.validateValueOnForm(Email, "Email"));
  }
  if (Phone) {
    logFailTestcase(await contactForm.validateValueOnForm(Phone, "Phone"));
  }
  if (Address) {
    logFailTestcase(await contactForm.validateValueOnForm(Address, "Address"));
  }
  if (Postcode) {
    logFailTestcase(await contactForm.validateValueOnForm(Postcode, "Postcode"));
  }
  if (City) {
    logFailTestcase(await contactForm.validateValueOnForm(City, "City"));
  }
  if (Country) {
    logFailTestcase(await contactForm.validateValueOnForm(Country, "Country"));
  }
  if (Title) {
    logFailTestcase(await contactForm.validateValueOnForm(Title, "Title"));
  }
});

Then("User verifies info on contact list in entity detail {string}", async (fileName) => {
  let rows;
  if (fileName.includes(".csv")) {
    rows = loader(convertPathFileDataToDataRegression(fileName));
  } else {
    let data = (await DataRepo.getInstance().loadData(fileName))[0];
    rows = data.Contacts;
  }
  const len = rows.length;

  await globalPageObject.waitForProgressBarLoaded_v2();
  await globalPageObject.reloadTable(3000);
  let temp = true;
  for (let i = 0; i < len; i++) {
    const FirstName = rows[i].FirstName;
    const LastName = rows[i].LastName;
    const DateOfBirth = rows[i].DateOfBirth;
    const Email = rows[i].Email;
    const Phone = rows[i].Phone;
    const Role = rows[i].Type || rows[i].Title;

    if (FirstName && LastName) {
      temp = await accountTabContactList.validateValueContactList((FirstName + " " + LastName).trim(), "Name", i + 1);
      logFailTestcase(temp, `Incorrect name contact!`);
    }
    if (DateOfBirth) {
      temp = await accountTabContactList.validateValueContactList(DateOfBirth, "Date Of Birth", i + 1);
      logFailTestcase(temp, `Incorrect Date of birth!`);
    }
    if (Role) {
      temp = await accountTabContactList.validateValueContactList(Role, "Type", i + 1);
      logFailTestcase(temp, `Incorrect Role!`);
    }
    if (Email) {
      temp = await accountTabContactList.validateValueContactList(Email, "Email", i + 1);
      logFailTestcase(temp, `Incorrect Email!`);
    }
    if (Phone) {
      temp = await accountTabContactList.validateValueContactList(Phone, "Phone", i + 1);
      logFailTestcase(temp, "Incorrect phone!");
    }
  }
});