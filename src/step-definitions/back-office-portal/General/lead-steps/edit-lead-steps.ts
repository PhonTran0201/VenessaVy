import { Before, Then, When } from "@cucumber/cucumber";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { LeadForm } from "../../../../page-objects/back-office-portal/general/lead/lead-forms/LeadForm";
import { LeadList } from "../../../../page-objects/back-office-portal/general/lead/lead-list/LeadList";
import { convertPathFileDataToDataRegression, logFailTestcase } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";


let leadList: LeadList;
let leadForm: LeadForm;

const loader = require("csv-load-sync");

let globalPageObject: GlobalPageObject;

Before(async function () {
  const context: ICommonContext = this.context;
  leadList = new LeadList(context.driverService);
  leadForm = new LeadForm(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
});

When(
  "User updates a lead from precondition steps from csv file {string}",
  async function (filename) {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    for (let obj of rows) {
      console.log("A LOT OF RELOAD LIST");

      await leadList.reloadLeadList();

      const selectedLead = obj.SelectedLead;
      let temp = await leadList.pressEditByName(selectedLead);
      logFailTestcase(temp);

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
  }
);

Then("System shows updated lead in the Lead list {string}", async function (filename) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  let len = rows.length;

  await globalPageObject.navigateToMainLeadList();
  await globalPageObject.waitForProgressBarLoaded_v2();
  await leadList.reloadLeadList();
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
