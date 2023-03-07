import { Before, Given, Then, When } from "@cucumber/cucumber";
import { fail } from "assert";
import { GlobalBrowserWindowHandle } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalBrowserWindowHandle";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { LeadDetailsLeftSide } from "../../../../page-objects/back-office-portal/general/lead/lead-details/left-side/LeadDetailsLeftSide";
import { LeadForm } from "../../../../page-objects/back-office-portal/general/lead/lead-forms/LeadForm";
import { LeadList } from "../../../../page-objects/back-office-portal/general/lead/lead-list/LeadList";
import { ValidateField } from "../../../../shared/classes";
import { convertPathFileDataToDataRegression, getCurrentDateTime, logFailMessage, logFailTestcase, logInfoMessage, logSuccessMessage, logWarningMessage } from '../../../../shared/functions';
import { ICommonContext } from "../../../../shared/interfaces";
import { dataTestcase, scenarioName, subErrorMessages } from "../../../../shared/variables";


let leadList: LeadList;
let leadForm: LeadForm;
let leadDetailsLeftSide: LeadDetailsLeftSide;
let globalPageObject: GlobalPageObject;
let globalBrowserWindowHandle: GlobalBrowserWindowHandle;
const loader = require("csv-load-sync");

let fileDataCreate: string = "";
let expectedName: string;

Before(async function () {
  const context: ICommonContext = this.context;
  leadList = new LeadList(context.driverService);
  leadForm = new LeadForm(context.driverService);
  leadDetailsLeftSide = new LeadDetailsLeftSide(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
  globalBrowserWindowHandle = new GlobalBrowserWindowHandle(context.driverService);
});

Given("User navigates to Lead list", async function () {
  let temp = await globalPageObject.navigateToMainLeadList();
  logFailTestcase(temp, "Fails to navigate to Lead List");
  await globalPageObject.waitForProgressBarLoaded_v2();
});

Given("User opens Create Lead form", async function () {
  const temp = await leadList.pressNewLead();
  logFailTestcase(temp, "Open create lead form failed!");
});

When("User inputs valid lead data from csv file {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  fileDataCreate = filename;

  for (let obj of rows) {
    let temp = await leadList.pressNewLead();
    logFailTestcase(temp, "Open Create new Lead failed!");

    const Organization = obj.Organization;
    const FirstName = obj.FirstName;
    const LastName = obj.LastName;
    const CompanyName = obj.CompanyName;
    const JobTitle = obj.JobTitle;
    const Email = obj.Email;
    const Mobile = obj.Mobile;
    const Address = obj.Address;
    const Postcode = obj.Postcode;
    const City = obj.City;
    const Country = obj.Country;
    const KAM = obj.KAM;
    const Source = obj.Source;

    //ACTIONS
    if (Organization) {
      temp = await leadForm.inputOrganizationOnLeadForm(Organization);
      logFailTestcase(temp, "Input Organization on form Lead failed!");
    }

    if (FirstName) {
      temp = await leadForm.inputFirstNameOnLeadForm(FirstName);
      logFailTestcase(temp, "Input First Name on form Lead failed!");
    }

    if (LastName) {
      temp = await leadForm.inputLastNameOnLeadForm(LastName);
      logFailTestcase(temp, "Input Last Name on form Lead failed!");
    }

    if (CompanyName) {
      temp = await leadForm.inputCompanyNameOnLeadForm(CompanyName);
      logFailTestcase(temp, "Input Company Name on form Lead failed!");
    }

    if (JobTitle) {
      temp = await leadForm.inputJobTitleOnLeadForm(JobTitle);
      logFailTestcase(temp, "Input Job Title on form Lead failed!");
    }

    if (Email) {
      temp = await leadForm.inputEmailOnLeadForm(Email);
      logFailTestcase(temp, "Input Email on form Lead failed!");
    }

    if (Mobile) {
      temp = await leadForm.inputMobileOnLeadForm(Mobile);
      logFailTestcase(temp, "Input Mobile on form Lead failed!");
    }

    if (Address) {
      temp = await leadForm.inputAddressOnLeadForm(Address);
      logFailTestcase(temp, "Input Address on form Lead failed!");
    }

    if (Postcode) {
      temp = await leadForm.inputPostcodeOnLeadForm(Postcode);
      logFailTestcase(temp, "Input Postcode on form Lead failed!");
    }

    if (City) {
      temp = await leadForm.inputCityOnLeadForm(City);
      logFailTestcase(temp, "Input City on form Lead failed!");
    }

    if (Country) {
      temp = await leadForm.inputCountryOnLeadForm(Country);
      logFailTestcase(temp, "Input Country on form Lead failed!");
    }

    temp = await leadForm.pressMoreInfo();
    logFailTestcase(temp, "Press More info failed!");

    if (KAM) {
      temp = await leadForm.inputKAMOnLeadForm(KAM);
      logFailTestcase(temp, "Input KAM on form Lead failed!");
    }

    if (Source) {
      temp = await leadForm.inputSourceOnLeadForm(Source);
      logFailTestcase(temp, "Input Source on form Lead failed!");
    }

    temp = await globalPageObject.pressSaveForm();
    logFailTestcase(temp);

    temp = await globalPageObject.waitForProgressBarLoaded();
    logFailTestcase(temp);
  }
});

When("User inputs single valid lead data from csv file {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];

  const Organization = row.Organization;
  const FirstName = row.FirstName;
  const LastName = row.LastName;
  const CompanyName = row.CompanyName;
  const JobTitle = row.JobTitle;
  const Email = row.Email;
  const Mobile = row.Mobile;
  const Address = row.Address;
  const Postcode = row.Postcode;
  const City = row.City;
  const Country = row.Country;
  const KAM = row.KAM;
  const Source = row.Source;

  let temp = true;

  if (Organization) {
    temp = await leadForm.inputOrganizationOnLeadForm(Organization);
    logFailTestcase(temp, "Input Organization on form Lead failed!");
  }

  if (FirstName) {
    temp = await leadForm.inputFirstNameOnLeadForm(FirstName);
    logFailTestcase(temp, "Input First Name on form Lead failed!");
  }

  if (LastName) {
    temp = await leadForm.inputLastNameOnLeadForm(LastName);
    logFailTestcase(temp, "Input Last Name on form Lead failed!");
  }

  if (CompanyName) {
    temp = await leadForm.inputCompanyNameOnLeadForm(CompanyName);
    logFailTestcase(temp, "Input Company Name on form Lead failed!");
  }

  if (JobTitle) {
    temp = await leadForm.inputJobTitleOnLeadForm(JobTitle);
    logFailTestcase(temp, "Input Job Title on form Lead failed!");
  }

  if (Email) {
    temp = await leadForm.inputEmailOnLeadForm(Email);
    logFailTestcase(temp, "Input Email on form Lead failed!");
  }

  if (Mobile) {
    temp = await leadForm.inputMobileOnLeadForm(Mobile);
    logFailTestcase(temp, "Input Mobile on form Lead failed!");
  }

  if (Address) {
    temp = await leadForm.inputAddressOnLeadForm(Address);
    logFailTestcase(temp, "Input Address on form Lead failed!");
  }

  if (Postcode) {
    temp = await leadForm.inputPostcodeOnLeadForm(Postcode);
    logFailTestcase(temp, "Input Postcode on form Lead failed!");
  }

  if (City) {
    temp = await leadForm.inputCityOnLeadForm(City);
    logFailTestcase(temp, "Input City on form Lead failed!");
  }

  if (Country) {
    temp = await leadForm.inputCountryOnLeadForm(Country);
    logFailTestcase(temp, "Input Country on form Lead failed!");
  }

  temp = await leadForm.pressMoreInfo();
  logFailTestcase(temp, "Press More info failed!");

  if (KAM) {
    temp = await leadForm.inputKAMOnLeadForm(KAM);
    logFailTestcase(temp, "Input KAM on form Lead failed!");
  }

  if (Source) {
    temp = await leadForm.inputSourceOnLeadForm(Source);
    logFailTestcase(temp, "Input Source on form Lead failed!");
  }
});

Then("User opens a lead to edit {string}", async function (filename: string) {
  await globalBrowserWindowHandle.refreshPage();
  const temp = await leadList.pressEdit();
  logFailTestcase(temp, "Can't open Edit Lead Form");
});

Then("User verifies info on Lead form {string}", async function (filename: string) {
  await leadList.reloadLeadList();
  let temp = true;

  const row = loader(convertPathFileDataToDataRegression(filename))[0];

  const firstName = row.FirstName;
  const lastName = row.LastName;
  const companyName = row.CompanyName;
  const jobTitle = row.JobTitle;
  const email = row.Email;
  const mobile = row.Mobile;
  const address = row.Address;
  const Postcode = row.Postcode;
  const city = row.City;
  const country = row.Country;
  const KAM = row.KAM;
  const source = row.Source;
  await globalPageObject.waitForProgressBarLoaded_v2(500);
  await globalPageObject.waitForProgressBarLoaded_v2(500);


  temp = await leadForm.validateValueOnLeadForm(firstName, "First Name");
  logFailTestcase(temp, "Can't find expected value in First Name Field on Edit Lead Form");

  temp = await leadForm.validateValueOnLeadForm(lastName, "Last Name");
  logFailTestcase(temp, "Can't find expected value in Last Name Field on Edit Lead Form");

  temp = await leadForm.validateValueOnLeadForm(companyName, "Company Name");
  logFailTestcase(temp, "Can't find expected value in Company Field on Edit Lead Form");

  temp = await leadForm.validateValueOnLeadForm(jobTitle, "Job Title");
  logFailTestcase(temp, "Can't find expected value in Title Field on Edit Lead Form");

  temp = await leadForm.validateValueOnLeadForm(email, "Email");
  logFailTestcase(temp, "Can't find expected value in Email Field on Edit Lead Form");

  temp = await leadForm.validateValueOnLeadForm(mobile, "Mobile");
  logFailTestcase(temp, "Can't find expected value in Mobile Field on Edit Lead Form");

  temp = await leadForm.validateValueOnLeadForm(address, "Address");
  logFailTestcase(temp, "Can't find expected value in Address Field on Edit Lead Form");

  temp = await leadForm.validateValueOnLeadForm(Postcode, "Postcode");
  logFailTestcase(temp, "Can't find expected value in Postcode Field on Edit Lead Form");

  temp = await leadForm.validateValueOnLeadForm(city, "City");
  logFailTestcase(temp, "Can't find expected value in City Field on Edit Lead Form");

  temp = await leadForm.validateValueOnLeadForm(country, "Country");
  logFailTestcase(temp, "Can't find expected value in Country Field on Edit Lead Form");

  await leadForm.pressMoreInfo();
  await globalPageObject.waitForProgressBarLoaded_v2(3000);
  await globalPageObject.waitForProgressBarLoaded_v2(500);
  temp = await leadForm.validateValueOnLeadForm(KAM, "KAM");
  logFailTestcase(temp, "Can't find expected value in KAM Field on Edit Lead Form");

  temp = await leadForm.validateValueOnLeadForm(source, "Source");
  logFailTestcase(temp, "Can't find expected value in Source Field on Edit Lead Form");
});

When("System shows new lead in the Lead list {string}", async function (filename: string) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  let len = rows.length;

  await leadList.reloadLeadList();
  await globalPageObject.expandNumberOfItemMainList();
  for (let i = len - 1, j = 1; i >= 0; i--, j++) {
    const firstName = rows[i].FirstName;
    const lastName = rows[i].LastName;
    const companyName = rows[i].CompanyName;
    const email = rows[i].Email;
    const mobile = rows[i].Mobile;

    await leadList.assertLead(
      j, //position of row want to validate
      (firstName + " " + lastName).trim(),
      companyName,
      mobile,
      email
    );
  }
  await globalPageObject.closeOpeningForm();
});

When("System deletes lead {string}", async (filename: string) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  fileDataCreate = filename;
  for (let obj of rows) {
    let deleteLead = (obj.FirstName + " " + obj.LastName).trim();
    let temp = await leadList.pressDeleteByName(deleteLead);
    logFailTestcase(temp);
    //ACTIONS
    temp = await globalPageObject.pressYesForm();
    logFailTestcase(temp);
  }
});

//Regression

When("User inputs invalid lead data from csv file {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  fileDataCreate = filename;

  for (let i = 0; i < rows.length; i++) {
    let temp = await leadList.pressNewLead();
    logFailTestcase(temp, "Open lead form failed!");

    const Organization = rows[i].Organization;
    const FirstName = rows[i].FirstName;
    const LastName = rows[i].LastName;
    const CompanyName = rows[i].CompanyName;
    const JobTitle = rows[i].JobTitle;
    const Email = rows[i].Email;
    const Mobile = rows[i].Mobile;
    const Address = rows[i].Address;
    const Postcode = rows[i].Postcode;
    const City = rows[i].City;
    const Country = rows[i].Country;
    const KAM = rows[i].KAM;
    const Source = rows[i].Source;
    let validationField = new ValidateField(FirstName, i, true, [], []);

    //ACTIONS
    if (Organization) {
      temp = await leadForm.inputOrganizationOnLeadForm(Organization);
      logFailTestcase(temp, "Input Organization on form Lead failed!");
    }

    if (FirstName) {
      temp = await leadForm.inputFirstNameOnLeadForm(FirstName);
      logFailTestcase(temp, "Input First Name on form Lead failed!");
    }

    if (LastName) {
      temp = await leadForm.inputLastNameOnLeadForm(LastName);
      logFailTestcase(temp, "Input Last Name on form Lead failed!");
    }

    if (CompanyName) {
      temp = await leadForm.inputCompanyNameOnLeadForm(CompanyName);
      logFailTestcase(temp, "Input Company Name on form Lead failed!");
    }

    if (JobTitle) {
      temp = await leadForm.inputJobTitleOnLeadForm(JobTitle);
      logFailTestcase(temp, "Input Job Title on form Lead failed!");
    }

    if (Email) {
      temp = await leadForm.inputEmailOnLeadForm(Email);
      logFailTestcase(temp, "Input Email on form Lead failed!");
    }

    if (Mobile) {
      temp = await leadForm.inputMobileOnLeadForm(Mobile);
      logFailTestcase(temp, "Input Mobile on form Lead failed!");
    }

    if (Address) {
      temp = await leadForm.inputAddressOnLeadForm(Address);
      logFailTestcase(temp, "Input Address on form Lead failed!");
    }

    if (Postcode) {
      temp = await leadForm.inputPostcodeOnLeadForm(Postcode);
      logFailTestcase(temp, "Input Postcode on form Lead failed!");
    }

    if (City) {
      temp = await leadForm.inputCityOnLeadForm(City);
      logFailTestcase(temp, "Input City on form Lead failed!");
    }

    if (Country) {
      temp = await leadForm.inputCountryOnLeadForm(Country);
      logFailTestcase(temp, "Input Country on form Lead failed!");
    }

    temp = await leadForm.pressMoreInfo();
    logFailTestcase(temp, "Press More info failed!");

    if (KAM) {
      temp = await leadForm.inputKAMOnLeadForm(KAM);
      logFailTestcase(temp, "Input KAM on form Lead failed!");
    }

    if (Source) {
      temp = await leadForm.inputSourceOnLeadForm(Source);
      logFailTestcase(temp, "Input Source on form Lead failed!");
    }

    temp = await globalPageObject.pressSaveForm();
    logFailTestcase(temp, "Can't press save form!");
    validationField = await leadForm.validateFields(validationField);
    if (!validationField.status) {
      temp = await globalPageObject.pressCancelForm();
      logFailTestcase(temp, "Can't press cancel form");
    }
    dataTestcase.push(validationField);
  }
});

Then("System shows error notifications fields Lead", async function () {
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
    } else {
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
  } else {
    logSuccessMessage(scenarioName + "\n\tStep: System shows error notifications fields Account: is passed!");
  }
});

Then("System does not show new lead in the Lead list", async function () {
  const rows = loader(convertPathFileDataToDataRegression(fileDataCreate));
  for (let obj of rows) {
    let deleteLead = (obj.FirstName + " " + obj.LastName).trim();
    let temp = await leadList.pressDeleteByName(deleteLead);
    logFailTestcase(temp);
    //ACTIONS
    temp = await globalPageObject.pressYesForm();
    logFailTestcase(temp);
  }
});

When("User updates an invalid lead from csv file {string}", async function (filename) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  fileDataCreate = filename;
  for (let i = 0; i < rows.length; i++) {
    await leadList.reloadLeadList();

    const selectedLead = rows[i].SelectedLead;
    let temp = await leadList.pressEditByName(selectedLead);
    logFailTestcase(temp);

    const FirstName = rows[i].FirstName;
    const LastName = rows[i].LastName;
    const CompanyName = rows[i].CompanyName;
    const JobTitle = rows[i].JobTitle;
    const Email = rows[i].Email;
    const Mobile = rows[i].Mobile;
    const Address = rows[i].Address;
    const Postcode = rows[i].Postcode;
    const City = rows[i].City;
    const Country = rows[i].Country;
    const KAM = rows[i].KAM;
    const Source = rows[i].Source;
    let validationField = new ValidateField(FirstName, i, true, [], []);

    //ACTIONS
    if (FirstName) {
      temp = await leadForm.inputFirstNameOnLeadForm(FirstName);
      logFailTestcase(temp, "Input First Name on form Lead failed!");
    }

    if (LastName) {
      temp = await leadForm.inputLastNameOnLeadForm(LastName);
      logFailTestcase(temp, "Input Last Name on form Lead failed!");
    }

    if (CompanyName) {
      temp = await leadForm.inputCompanyNameOnLeadForm(CompanyName);
      logFailTestcase(temp, "Input Company Name on form Lead failed!");
    }

    if (JobTitle) {
      temp = await leadForm.inputJobTitleOnLeadForm(JobTitle);
      logFailTestcase(temp, "Input Job Title on form Lead failed!");
    }

    if (Email) {
      temp = await leadForm.inputEmailOnLeadForm(Email);
      logFailTestcase(temp, "Input Email on form Lead failed!");
    }

    if (Mobile) {
      temp = await leadForm.inputMobileOnLeadForm(Mobile);
      logFailTestcase(temp, "Input Mobile on form Lead failed!");
    }

    if (Address) {
      temp = await leadForm.inputAddressOnLeadForm(Address);
      logFailTestcase(temp, "Input Address on form Lead failed!");
    }

    if (Postcode) {
      temp = await leadForm.inputPostcodeOnLeadForm(Postcode);
      logFailTestcase(temp, "Input Postcode on form Lead failed!");
    }

    if (City) {
      temp = await leadForm.inputCityOnLeadForm(City);
      logFailTestcase(temp, "Input City on form Lead failed!");
    }

    if (Country) {
      temp = await leadForm.inputCountryOnLeadForm(Country);
      logFailTestcase(temp, "Input Country on form Lead failed!");
    }

    temp = await globalPageObject.pressSaveForm();
    logFailTestcase(temp, "Can't press save form!");
    validationField = await leadForm.validateFields(validationField);
    if (!validationField.status) {
      temp = await globalPageObject.pressCancelForm();
      logFailTestcase(temp, "Can't press cancel form");
    }
    dataTestcase.push(validationField);
  }
});

When("User updates a lead for convert lead from precondition steps from csv file {string}", async function (filename) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  fileDataCreate = filename;
  for (let obj of rows) {
    console.log("A LOT OF RELOAD LIST");

    await leadList.reloadLeadList();

    const selectedLead = obj.SelectedLead;
    let temp = await leadList.pressEditByName(selectedLead);
    logFailTestcase(temp);

    const FirstName = obj.FirstName;
    const LastName = obj.LastName;
    const CompanyName = obj.CompanyName;
    const JobTitle = obj.JobTitle;
    const Email = obj.Email;
    const Mobile = obj.Mobile;
    const Address = obj.Address;
    const Postcode = obj.Postcode;
    const City = obj.City;
    const Country = obj.Country;
    const KAM = obj.KAM;
    const Source = obj.Source;
    const Status = obj.Status;

    //ACTIONS
    if (FirstName) {
      temp = await leadForm.inputFirstNameOnLeadForm(FirstName);
      logFailTestcase(temp, "Input First Name on form Lead failed!");
    }

    if (LastName) {
      temp = await leadForm.inputLastNameOnLeadForm(LastName);
      logFailTestcase(temp, "Input Last Name on form Lead failed!");
    }

    if (CompanyName) {
      temp = await leadForm.inputCompanyNameOnLeadForm(CompanyName);
      logFailTestcase(temp, "Input Company Name on form Lead failed!");
    }

    if (JobTitle) {
      temp = await leadForm.inputJobTitleOnLeadForm(JobTitle);
      logFailTestcase(temp, "Input Job Title on form Lead failed!");
    }

    if (Email) {
      temp = await leadForm.inputEmailOnLeadForm(Email);
      logFailTestcase(temp, "Input Email on form Lead failed!");
    }

    if (Mobile) {
      temp = await leadForm.inputMobileOnLeadForm(Mobile);
      logFailTestcase(temp, "Input Mobile on form Lead failed!");
    }

    if (Address) {
      temp = await leadForm.inputAddressOnLeadForm(Address);
      logFailTestcase(temp, "Input Address on form Lead failed!");
    }

    if (Postcode) {
      temp = await leadForm.inputPostcodeOnLeadForm(Postcode);
      logFailTestcase(temp, "Input Postcode on form Lead failed!");
    }

    if (City) {
      temp = await leadForm.inputCityOnLeadForm(City);
      logFailTestcase(temp, "Input City on form Lead failed!");
    }

    if (Country) {
      temp = await leadForm.inputCountryOnLeadForm(Country);
      logFailTestcase(temp, "Input Country on form Lead failed!");
    }

    temp = await leadForm.pressMoreInfo();
    logFailTestcase(temp);

    if (KAM) {
      temp = await leadForm.inputKAMOnLeadForm(KAM);
      logFailTestcase(temp, "Input KAM on form Lead failed!");
    }

    if (Source) {
      temp = await leadForm.inputSourceOnLeadForm(Source);
      logFailTestcase(temp, "Input Source on form Lead failed!");
    }

    if (Status) {
      temp = await leadForm.inputStatusOnLeadForm(Status);
      logFailTestcase(temp, "Input Source on form Lead failed!");
    }

    temp = await globalPageObject.pressSaveForm();
    logFailTestcase(temp);

    temp = await globalPageObject.waitForProgressBarLoaded();
    logFailTestcase(temp);
  }
});

Then("System shows new lead in Lead detail {string}", async function (filename: string) {
  let temp = true;
  await leadList.reloadLeadList();
  await globalBrowserWindowHandle.refreshPage();

  temp = await leadList.openLeadDetail();
  logFailTestcase(temp, "Can not load lead detail");

  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  const name = (row.FirstName + " " + row.LastName).trim();
  const mobile = row.Mobile;
  const email = row.Email;
  const address = (row.Address + ", " + row.City + ", " + row.Postcode).trim();
  const source = row.Source;


  temp = await leadDetailsLeftSide.validateLeadLeftSideDetail(name, "Name");
  logFailTestcase(temp, "Can not find expected Name in Lead detail");

  temp = await leadDetailsLeftSide.validateLeadLeftSideDetail(mobile || "N/A", "Mobile");
  logFailTestcase(temp, "Can not find expected Mobime in Lead detail");

  temp = await leadDetailsLeftSide.validateLeadLeftSideDetail(email || "N/A", "Email");
  logFailTestcase(temp, "Can not find expected Email in Lead detail");

  temp = await leadDetailsLeftSide.validateLeadLeftSideDetail(address || "N/A", "Address");
  logFailTestcase(temp, "Can not find expected Address in Lead detail");

  temp = await leadDetailsLeftSide.validateLeadLeftSideDetail(source || "N/A", "Source");
  logFailTestcase(temp, "Can not find expected Source in Lead detail");
});
Then(`System shows Import Lead button {string}`, async (filename) => {
  var fs = require('fs')
  var logger = fs.createWriteStream('./result/SAAS-13419_UI_Test_Report.csv', {
    flags: 'a' // 'a' means appending (old data will be preserved)
  })
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  let Flag = row.Flag;
  let temp = await leadList.verifyImportLeadButton();
  let tempString;
  if (temp) {
    tempString = "Yes"
  } else {
    tempString = "No"
  }

  logger.write(`\r\n` + `Leads,6,Import Lead button,` + `${Flag},` + `${tempString},` + getCurrentDateTime() + `,Under Lead list`); // append string to your file

  if ((tempString != Flag) && !(Flag == "Optional")) {
    logFailTestcase(false, `Import Lead button is expected to be ${Flag} but got ${tempString}`)
  }

})