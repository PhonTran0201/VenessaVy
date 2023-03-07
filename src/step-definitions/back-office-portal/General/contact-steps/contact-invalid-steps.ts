import { Before, Then, When } from "@cucumber/cucumber";
import { fail } from "assert";
import { AccountTabContactForm } from "../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-contact/AccountTabContactForm";
import { AccountTabContactList } from "../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-contact/AccountTabContactList";
import { ContactForm } from "../../../../page-objects/back-office-portal/general/contact/contact-forms/ContactForm";
import { ContactList } from "../../../../page-objects/back-office-portal/general/contact/contact-list/ContactList";
import { ContactSearchFilter } from "../../../../page-objects/back-office-portal/general/contact/contact-search-filter/ContactSearchFilter";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { ValidateField } from "../../../../shared/classes";
import { convertPathFileDataToDataRegression, logFailMessage, logFailTestcase, logInfoMessage, logSuccessMessage, logWarningMessage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { dataTestcase, scenarioName, subErrorMessages } from '../../../../shared/variables';


const loader = require("csv-load-sync");
let contactForm: ContactForm;
let contactList: ContactList;
let accountTabContactList: AccountTabContactList;
let accountTabContactForm: AccountTabContactForm;
let contactSearchFilter: ContactSearchFilter;
let globalPageObject: GlobalPageObject;

//Variable using to compare
let expectedName: string;
let expectedDOB: string;
let expectedType: string;
let expectedEmail: string;
let expectedPhone: string;
let fileDataCreate: string = "";
Before(async function () {
  const context: ICommonContext = this.context;
  contactForm = new ContactForm(context.driverService);
  contactList = new ContactList(context.driverService);
  contactSearchFilter = new ContactSearchFilter(context.driverService);
  accountTabContactList = new AccountTabContactList(context.driverService);
  accountTabContactForm = new AccountTabContactForm(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
});
When("User inputs invalid global contact data from csv file {string}", async (filename: string) => {
  try {
    let rows = loader(convertPathFileDataToDataRegression(filename));
    fileDataCreate = (filename);
    for (let i = 0; i < rows.length; i++) {
      await contactList.openCreateContact();
      const search = rows[i].SearchAccount;
      const firstName = rows[i].FirstName;
      const lastName = rows[i].LastName;
      const dateOfBirth = rows[i].DateOfBirth;
      const email = rows[i].Email;
      const phone = rows[i].Phone;
      const address = rows[i].Address;
      const postCode = rows[i].Postcode;
      const city = rows[i].City;
      const country = rows[i].Country;
      const typeOrTitle = rows[i].Type || rows[i].Title;
      let validateField = new ValidateField(address, i, true, [], []);

      if (search) {
        await accountTabContactForm.inputFirstNameOnContactForm(firstName);
      }

      if (firstName) {
        await accountTabContactForm.inputFirstNameOnContactForm(firstName);
      }
      if (lastName) {
        await accountTabContactForm.inputLastNameOnContactForm(lastName);
      }

      if (dateOfBirth) {
        await accountTabContactForm.inputBirthdayOnContactForm(dateOfBirth);
      }

      if (email) {
        await accountTabContactForm.inputEmailOnContactForm(email);
      }
      if (phone) {
        await accountTabContactForm.inputPhoneOnContactForm(phone);
      }
      if (address) {
        await accountTabContactForm.inputAddressOnContactForm(address);
      }
      if (city) {
        await accountTabContactForm.inputCityOnContactForm(city);
      }
      if (postCode) {
        await accountTabContactForm.inputPostcodeOnContactForm(postCode);
      }
      if (country) {
        await accountTabContactForm.inputCountryOnContactForm(country);
      }
      if (typeOrTitle) {
        await accountTabContactForm.inputTypeOrTitleOnContactForm(typeOrTitle);
      }

      await globalPageObject.pressSaveForm();
      validateField = await contactForm.validateFields(validateField);
      if (!validateField.status) {
        await globalPageObject.pressCancelForm();
      }
      dataTestcase.push(validateField);
    }
  } catch (error) {
    console.log("User inputs invalid contact data from csv");
    console.log(error);
  }
});

When(
  "User inputs invalid company contacts data from csv file {string}",
  async (filename: string) => {
    try {
      let rows = loader(convertPathFileDataToDataRegression(filename));
      fileDataCreate = (filename);
      for (let i = 0; i < rows.length; i++) {
        await accountTabContactList.pressCreateContactEntityDetail();
        //if (filename.localeCompare("./data/data_contact_company.csv") === 0) {
        const firstName = rows[i].FirstName;
        const lastName = rows[i].LastName;
        const dateOfBirth = rows[i].DateOfBirth;
        const email = rows[i].Email;
        const phone = rows[i].Phone;
        const address = rows[i].Address;
        const postCode = rows[i].Postcode;
        const city = rows[i].City;
        const country = rows[i].Country;
        const title = rows[i].Title;
        let validationField = new ValidateField(address, i, true, [], []);

        expectedName = firstName + " " + lastName;
        expectedDOB = dateOfBirth;
        expectedType = title;
        expectedEmail = email;
        expectedPhone = phone;
        if (firstName) {
          await accountTabContactForm.inputFirstNameOnContactForm(firstName);
        }
        if (lastName) {
          await accountTabContactForm.inputLastNameOnContactForm(lastName);
        }

        if (dateOfBirth) {
          await accountTabContactForm.inputBirthdayOnContactForm(dateOfBirth);
        }

        if (email) {
          await accountTabContactForm.inputEmailOnContactForm(email);
        }
        if (phone) {
          await accountTabContactForm.inputPhoneOnContactForm(phone);
        }
        if (address) {
          await accountTabContactForm.inputAddressOnContactForm(address);
        }
        if (city) {
          await accountTabContactForm.inputCityOnContactForm(city);
        }
        if (postCode) {
          await accountTabContactForm.inputPostcodeOnContactForm(postCode);
        }
        if (country) {
          await accountTabContactForm.inputCountryOnContactForm(country);
        }
        if (title) {
          await accountTabContactForm.inputTypeOrTitleOnContactForm(title);
        }

        await globalPageObject.pressSaveForm();
        validationField = await contactForm.validateFields(validationField);
        if (!validationField.status) {
          await globalPageObject.pressCancelForm();
        }
        dataTestcase.push(validationField);
      }
    } catch (error) {
      console.log("User inputs invalid contact data from csv");
      console.log(error);
    }
  }
);

When(
  "User inputs invalid company contacts data to edit from csv file {string}",
  async (filename: string) => {
    try {
      let rows = loader(convertPathFileDataToDataRegression(filename));
      fileDataCreate = (filename);
      for (let i = 0; i < rows.length; i++) {
        let selectedContact = rows[i].SelectedContact;
        await accountTabContactList.pressEditContactByName(selectedContact);

        let temp = await accountTabContactForm.clearOldDataOnContactForm();
        logFailTestcase(temp, "Clear old data on Contact form failed!");

        //if (filename.localeCompare("./data/data_contact_company.csv") === 0) {
        const firstName = rows[i].FirstName;
        const lastName = rows[i].LastName;
        const dateOfBirth = rows[i].DateOfBirth;
        const email = rows[i].Email;
        const phone = rows[i].Phone;
        const address = rows[i].Address;
        const postCode = rows[i].Postcode;
        const city = rows[i].City;
        const country = rows[i].Country;
        const type = rows[i].Type;
        let validationField = new ValidateField(address, i, true, [], []);

        expectedName = firstName + " " + lastName;
        expectedDOB = dateOfBirth;
        expectedType = type;
        expectedEmail = email;
        expectedPhone = phone;

        if (firstName) {
          await accountTabContactForm.inputFirstNameOnContactForm(firstName);
        }
        if (lastName) {
          await accountTabContactForm.inputLastNameOnContactForm(lastName);
        }

        if (dateOfBirth) {
          await accountTabContactForm.inputBirthdayOnContactForm(dateOfBirth);
        }

        if (email) {
          await accountTabContactForm.inputEmailOnContactForm(email);
        }
        if (phone) {
          await accountTabContactForm.inputPhoneOnContactForm(phone);
        }
        if (address) {
          await accountTabContactForm.inputAddressOnContactForm(address);
        }
        if (city) {
          await accountTabContactForm.inputCityOnContactForm(city);
        }
        if (postCode) {
          await accountTabContactForm.inputPostcodeOnContactForm(postCode);
        }
        if (country) {
          await accountTabContactForm.inputCountryOnContactForm(country);
        }
        if (type) {
          await accountTabContactForm.inputTypeOrTitleOnContactForm(type);
        }


        await globalPageObject.pressSaveForm();
        validationField = await contactForm.validateFields(validationField);
        if (!validationField.status) {
          await globalPageObject.pressCancelForm();
        }
        dataTestcase.push(validationField);
      }
    } catch (error) {
      console.log("User inputs invalid contact data from csv");
      console.log(error);
    }
  }
);

When(
  "User inputs invalid person contacts data from csv file {string}",
  async (filename: string) => {
    try {
      let rows = loader(convertPathFileDataToDataRegression(filename));
      fileDataCreate = (filename);
      for (let i = 0; i < rows.length; i++) {
        await accountTabContactList.pressCreateContactEntityDetail();
        //if (filename.localeCompare("./data/data_contact_company.csv") === 0) {
        const firstName = rows[i].FirstName;
        const lastName = rows[i].LastName;
        const dateOfBirth = rows[i].DateOfBirth;
        const email = rows[i].Email;
        const phone = rows[i].Phone;
        const address = rows[i].Address;
        const postCode = rows[i].Postcode;
        const city = rows[i].City;
        const country = rows[i].Country;
        const type = rows[i].Type;
        let validationField = new ValidateField(address, i, true, [], []);

        expectedName = firstName + " " + lastName;
        expectedDOB = dateOfBirth;
        expectedType = type;
        expectedEmail = email;
        expectedPhone = phone;
        if (firstName) {
          await accountTabContactForm.inputFirstNameOnContactForm(firstName);
        }
        if (lastName) {
          await accountTabContactForm.inputLastNameOnContactForm(lastName);
        }

        if (dateOfBirth) {
          await accountTabContactForm.inputBirthdayOnContactForm(dateOfBirth);
        }

        if (email) {
          await accountTabContactForm.inputEmailOnContactForm(email);
        }
        if (phone) {
          await accountTabContactForm.inputPhoneOnContactForm(phone);
        }
        if (address) {
          await accountTabContactForm.inputAddressOnContactForm(address);
        }
        if (city) {
          await accountTabContactForm.inputCityOnContactForm(city);
        }
        if (postCode) {
          await accountTabContactForm.inputPostcodeOnContactForm(postCode);
        }
        if (country) {
          await accountTabContactForm.inputCountryOnContactForm(country);
        }
        if (type) {
          await accountTabContactForm.inputTypeOrTitleOnContactForm(type);
        }

        await globalPageObject.pressSaveForm();
        validationField = await contactForm.validateFields(validationField);
        if (!validationField.status) {
          await globalPageObject.pressCancelForm();
        }
        dataTestcase.push(validationField);
      }
    } catch (error) {
      console.log("User inputs invalid contact data from csv");
      console.log(error);
    }
  }
);

When("User inputs invalid person contacts data to edit from csv file {string}", async function (filename: string) {
  try {
    let rows = loader(convertPathFileDataToDataRegression(filename));
    fileDataCreate = filename;
    for (let i = 0; i < rows.length; i++) {
      let selectedContact = rows[i].SelectedContact;
      await accountTabContactList.pressEditContactByName(selectedContact);

      let temp = await accountTabContactForm.clearOldDataOnContactForm();
      logFailTestcase(temp, "Clear old data on Contact form failed!");
      //if (filename.localeCompare("./data/data_contact_company.csv") === 0) {
      const firstName = rows[i].FirstName;
      const lastName = rows[i].LastName;
      const dateOfBirth = rows[i].DateOfBirth;
      const email = rows[i].Email;
      const phone = rows[i].Phone;
      const address = rows[i].Address;
      const postCode = rows[i].Postcode;
      const city = rows[i].City;
      const country = rows[i].Country;
      const type = rows[i].Type;
      let validationField = new ValidateField(address, i, true, [], []);

      expectedName = firstName + " " + lastName;
      expectedDOB = dateOfBirth;
      expectedType = type;
      expectedEmail = email;
      expectedPhone = phone;
      if (firstName) {
        await accountTabContactForm.inputFirstNameOnContactForm(firstName);
      }
      if (lastName) {
        await accountTabContactForm.inputLastNameOnContactForm(lastName);
      }

      if (dateOfBirth) {
        await accountTabContactForm.inputBirthdayOnContactForm(dateOfBirth);
      }

      if (email) {
        await accountTabContactForm.inputEmailOnContactForm(email);
      }
      if (phone) {
        await accountTabContactForm.inputPhoneOnContactForm(phone);
      }
      if (address) {
        await accountTabContactForm.inputAddressOnContactForm(address);
      }
      if (city) {
        await accountTabContactForm.inputCityOnContactForm(city);
      }
      if (postCode) {
        await accountTabContactForm.inputPostcodeOnContactForm(postCode);
      }
      if (country) {
        await accountTabContactForm.inputCountryOnContactForm(country);
      }
      if (type) {
        await accountTabContactForm.inputTypeOrTitleOnContactForm(type);
      }
      await globalPageObject.pressSaveForm();
      validationField = await contactForm.validateFields(validationField);
      if (!validationField.status) {
        await globalPageObject.pressCancelForm();
      }
      dataTestcase.push(validationField);
    }
  } catch (error) {
    console.log("User edits invalid person contact data from csv");
    console.log(error);
  }
})

Then("System shows error notifications fields Contact", async function () {
  const rows = loader(convertPathFileDataToDataRegression(fileDataCreate));
  let len = rows.length;
  let countError = 0;
  for (let i = len - 1, j = 1; i >= 0; i--, j++) {
    expectedName = rows[i].FirstName + " " + rows[i].LastName;
    expectedDOB = rows[i].DateOfBirth;
    expectedType = rows[i].Title;
    expectedEmail = rows[i].Email;
    expectedPhone = rows[i].Phone;

    console.log("\Checking " + expectedName + ":");
    if (dataTestcase[i].status === true) {
      if (!(await accountTabContactList.assertAddContact(
        j, //position of row want to validate
        expectedName,
        expectedDOB,
        expectedType,
        expectedEmail,
        expectedPhone
      ))) {
        countError++;
      }

    } else {
      countError++;
      j--;
      logWarningMessage("\n" + dataTestcase[i].nameField + " is failed with error messages: ");
      for (const record of dataTestcase[i].message) {
        logFailMessage("\t" + record);
      }
    }
  }

  if (countError > 0) {
    console.log("[TC_Regression] [Contacts] Negative Case - Succeed");
  }
  else {
    logSuccessMessage("[TC_Regression] [Contacts] Negative Case - Failed");
  }

});

Then("System does not show new contact in the Account contact list", async function () {
  const rows = loader(convertPathFileDataToDataRegression(fileDataCreate));
  let len = rows.length;
  for (let i = len - 1, j = 1; i >= 0; i--, j++) {
    const firstName = rows[i].FirstName;
    const lastName = rows[i].LastName;
    const dateOfBirth = rows[i].DateOfBirth;
    const email = rows[i].Email;
    const phone = rows[i].Phone;
    const type = rows[i].Type;

    await accountTabContactList.assertContactExistence(
      j, //position of row want to validate
      firstName + " " + lastName,
      dateOfBirth,
      type,
      email,
      phone
    );
  }
}
)
Then("System does not show new contact in the Contact list", async function () {
  const rows = loader(convertPathFileDataToDataRegression(fileDataCreate));
  let len = rows.length;
  for (let i = 0; i < len; i++) {
    const FirstName = rows[i].FirstName;
    const LastName = rows[i].LastName;
    let Name: string = "";
    if (FirstName) {
      Name = FirstName + " ";
    }
    if (LastName) {
      Name = Name + LastName;
      Name = Name.toString().trim();
    }
    if (!Name) {
      Name = "N/A";
    }

    let DateOfBirth = rows[i].DateOfBirth;
    if (!DateOfBirth) {
      DateOfBirth = "N/A";
    }
    let Email = rows[i].Email;
    if (!Email) {
      Email = "N/A";
    }
    let Phone = rows[i].Phone;
    if (!Phone) {
      Phone = "N/A";
    }


    await accountTabContactList.assertContactListExistence(
      1, //position of row want to validate
      Name,
      DateOfBirth,
      Email,
      Phone
    );
  }
})

//Regression
Then("System shows error notifications fields global Contact", async function () {
  const rows = loader(convertPathFileDataToDataRegression(fileDataCreate));
  let len = rows.length;
  let countError = 0;

  for (let i = 0; i < len; i++) {
    expectedName = rows[i].CompanyName;

    console.log(`\nChecking case at Line ${i + 1} at file CSV - ${expectedName} :`);

    if (dataTestcase[i].message.length === 0 && dataTestcase[i].toastMessage.length === 0) {
      countError++;
      logWarningMessage(`\nWe didn't get any error validation messages in Contact form!`);
      logFailMessage(`\n\tLine ${i + 1} is failed!`);
    }
    else {
      logInfoMessage(`\nError validation messages in Contact form are:`);
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
    logSuccessMessage(scenarioName + "\n\tStep: System shows error notifications fields Contact: is passed!");
  }

});

Then("System does not show new contact in the global Contact list", async function () {
  const rows = loader(convertPathFileDataToDataRegression(fileDataCreate));
  let len = rows.length;
  await accountTabContactList.reloadContactList();
  for (let i = len - 1, j = 1; i >= 0; i--, j++) {
    const contactname = rows[i].Contact;

    await accountTabContactList.assertDeleteContact(
      j, //position of row want to validate
      contactname,
    );
  }
});