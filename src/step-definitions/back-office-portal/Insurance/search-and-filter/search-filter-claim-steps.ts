
import { Before, Then, When } from "@cucumber/cucumber";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { ClaimFormInsurance } from "../../../../page-objects/back-office-portal/insurance/claim/claim-forms/ClaimFormInsurance";
import { ClaimListInsurance } from "../../../../page-objects/back-office-portal/insurance/claim/claim-list/ClaimListInsurance";
import { ClaimSearchFilterInsurance } from "../../../../page-objects/back-office-portal/insurance/claim/claim-search-filter/ClaimSearchFilterInsurance";
import { convertPathFileDataToDataRegression, logFailTestcase, logWarningMessage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { scenarioName } from "../../../../shared/variables";

let claimFormInsurance: ClaimFormInsurance;
let claimListInsurance: ClaimListInsurance;
let claimSearchFilterInsurance: ClaimSearchFilterInsurance;
let globalPageObject: GlobalPageObject;

const loader = require("csv-load-sync");

Before(async function () {
  const context: ICommonContext = this.context;
  claimFormInsurance = new ClaimFormInsurance(context.driverService);
  claimListInsurance = new ClaimListInsurance(context.driverService);
  claimSearchFilterInsurance = new ClaimSearchFilterInsurance(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
});

//Search and Filter
When("User searches claim with valid data {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  let temp = await globalPageObject.pressClearSearchAndFilter();
  logFailTestcase(temp, "Press Clear at Search and Filter failed!");

  temp = await claimSearchFilterInsurance.clearAllDefaultFieldsSearchFilterForm();
  logFailTestcase(temp, 'Clear all default fields on Search Filter Claim form!');

  for (let i = 0; i < rows.length; i++) {
    logWarningMessage(`Checking Search & Filter at line ${i + 1} in csv...`);

    const Reference = rows[i].Reference;
    const ObjectName = rows[i].ObjectName;
    const Account = rows[i].Account;
    const Status = rows[i].Status;
    const DateOfLossFrom = rows[i].DateOfLossFrom;
    const DateOfLossTo = rows[i].DateOfLossTo;
    const ReportedDateFrom = rows[i].ReportedDateFrom;
    const ReportedDateTo = rows[i].ReportedDateTo;
    const PolicyReference = rows[i].PolicyReference;
    const ClaimHandler = rows[i].ClaimHandler;
    const Product = rows[i].Product;
    const Organization = rows[i].Organization;
    const OrgNo_NIN = rows[i].OrgNo_NIN;


    if (Reference) {
      temp = await claimSearchFilterInsurance.inputReferenceSearchAndFilterForm(Reference);
      logFailTestcase(temp, `Input reference "${Reference}" failed!`);
    }

    if (ObjectName) {
      temp = await claimSearchFilterInsurance.inputObjectNameSearchAndFilterForm(ObjectName);
      logFailTestcase(temp, `Input object name "${ObjectName}" failed!`);
    }

    if (Account) {
      temp = await claimSearchFilterInsurance.inputAccountSearchAndFilterForm(Account);
      logFailTestcase(temp, `Input account "${Account}" failed!`);
    }

    if (Status) {
      temp = await claimSearchFilterInsurance.inputStatusSearchAndFilterForm(Status);
      logFailTestcase(temp, `Input Status "${Status}" failed!`);
    }

    if (DateOfLossFrom) {
      temp = await claimSearchFilterInsurance.inputDateOfLossFromSearchAndFilterForm(DateOfLossFrom);
      logFailTestcase(temp, `Input DateOfLossFrom "${DateOfLossFrom}" failed!`);
    }

    if (DateOfLossTo) {
      temp = await claimSearchFilterInsurance.inputDateOfLossToSearchAndFilterForm(DateOfLossTo);
      logFailTestcase(temp, `Input DateOfLossTo "${DateOfLossTo}" failed!`);
    }

    if (ReportedDateFrom) {
      temp = await claimSearchFilterInsurance.inputReportedDateFromSearchAndFilterForm(ReportedDateFrom);
      logFailTestcase(temp, `Input ReportedDateFrom "${ReportedDateFrom}" failed!`);
    }

    if (ReportedDateTo) {
      temp = await claimSearchFilterInsurance.inputReportedDateToSearchAndFilterForm(ReportedDateTo);
      logFailTestcase(temp, `Input ReportedDateTo "${ReportedDateTo}" failed!`);
    }

    if (PolicyReference) {
      temp = await claimSearchFilterInsurance.inputPolicyReferenceSearchAndFilterForm(PolicyReference);
      logFailTestcase(temp, `Input PolicyReference "${PolicyReference}" failed!`);
    }

    if (ClaimHandler) {
      temp = await claimSearchFilterInsurance.inputClaimHandlerSearchAndFilterForm(ClaimHandler);
      logFailTestcase(temp, `Input ClaimHandler "${ClaimHandler}" failed!`);
    }

    if (Product) {
      temp = await claimSearchFilterInsurance.inputProductSearchAndFilterForm(Product);
      logFailTestcase(temp, `Input Product "${Product}" failed!`);
    }

    if (Organization) {
      temp = await claimSearchFilterInsurance.inputOrganizationSearchAndFilterForm(Organization);
      logFailTestcase(temp, `Input Organization "${Organization}" failed!`);
    }

    
    if (OrgNo_NIN) {
      temp = await claimSearchFilterInsurance.inputOrgNo_NinOnSearchAndFilterForm(OrgNo_NIN);
      logFailTestcase(temp, `Input OrgNo_NIN "${OrgNo_NIN}" failed!`);
    }

    temp = await globalPageObject.pressSearchSearchAndFilter();
    logFailTestcase(temp, "Press Search at Search & Filter failed!");


    const ClaimNumber = parseInt(rows[i].ClaimNumber);
    const actualTotalNumber = await globalPageObject.getNumberOfTotalRecordsMainTab();

    if (ClaimNumber > 1 && ClaimNumber === actualTotalNumber) {
      // logSuccessMessage(`Line ${i + 1} in csv: Search & Filter passed!`);
      // do notthing
    } else if (ClaimNumber === 1) {
      //Validate name, orgNo, email, phone, status at Account list
      if (Reference) logFailTestcase(await claimListInsurance.validateSearchAndFilterReference(Reference), `Reference "${Reference}" does not match to result!`);
      if (ObjectName) logFailTestcase(await claimListInsurance.validateSearchAndFilterObjectName(ObjectName), `Object Name "${ObjectName}" does not match to result!`);
      if (Account) logFailTestcase(await claimListInsurance.validateSearchAndFilterAccount(Account), `Account "${Account}" does not match to result!`);
    }
    else if (ClaimNumber !== actualTotalNumber) {
      logWarningMessage(`There are ${actualTotalNumber} total records found!`);
      logFailTestcase(false, `Line ${i + 1} in csv: failed...`);
    }
    logWarningMessage(`\tLine ${i + 1} passed!`);

    temp = await globalPageObject.pressClearSearchAndFilter();
    logFailTestcase(temp, "Press Clear at Search and Filter failed!");

    temp = await claimSearchFilterInsurance.clearAllDefaultFieldsSearchFilterForm();
    logFailTestcase(temp, 'Clear all default fields on Search Filter Claim form!');
  }

});

When("User searches a claim with valid data {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename))[0];
  let temp = await globalPageObject.pressClearSearchAndFilter();
  logFailTestcase(temp, "Press Clear at Search and Filter failed!");

  temp = await claimSearchFilterInsurance.clearAllDefaultFieldsSearchFilterForm();
  logFailTestcase(temp, 'Clear all default fields on Search Filter Claim form!');

  
    const Reference = rows.Reference;
    const ObjectName = rows.ObjectName;
    const Account = rows.Account;
    const Status = rows.Status;
    const DateOfLossFrom = rows.DateOfLossFrom;
    const DateOfLossTo = rows.DateOfLossTo;
    const ReportedDateFrom = rows.ReportedDateFrom;
    const ReportedDateTo = rows.ReportedDateTo;
    const PolicyReference = rows.PolicyReference;
    const ClaimHandler = rows.ClaimHandler;
    const Product = rows.Product;
    const Organization = rows.Organization;
    const OrgNo_NIN = rows.OrgNo_NIN;


    if (Reference) {
      temp = await claimSearchFilterInsurance.inputReferenceSearchAndFilterForm(Reference);
      logFailTestcase(temp, `Input reference "${Reference}" failed!`);
    }

    if (ObjectName) {
      temp = await claimSearchFilterInsurance.inputObjectNameSearchAndFilterForm(ObjectName);
      logFailTestcase(temp, `Input object name "${ObjectName}" failed!`);
    }

    if (Account) {
      temp = await claimSearchFilterInsurance.inputAccountSearchAndFilterForm(Account);
      logFailTestcase(temp, `Input account "${Account}" failed!`);
    }

    if (Status) {
      temp = await claimSearchFilterInsurance.inputStatusSearchAndFilterForm(Status);
      logFailTestcase(temp, `Input Status "${Status}" failed!`);
    }

    if (DateOfLossFrom) {
      temp = await claimSearchFilterInsurance.inputDateOfLossFromSearchAndFilterForm(DateOfLossFrom);
      logFailTestcase(temp, `Input DateOfLossFrom "${DateOfLossFrom}" failed!`);
    }

    if (DateOfLossTo) {
      temp = await claimSearchFilterInsurance.inputDateOfLossToSearchAndFilterForm(DateOfLossTo);
      logFailTestcase(temp, `Input DateOfLossTo "${DateOfLossTo}" failed!`);
    }

    if (ReportedDateFrom) {
      temp = await claimSearchFilterInsurance.inputReportedDateFromSearchAndFilterForm(ReportedDateFrom);
      logFailTestcase(temp, `Input ReportedDateFrom "${ReportedDateFrom}" failed!`);
    }

    if (ReportedDateTo) {
      temp = await claimSearchFilterInsurance.inputReportedDateToSearchAndFilterForm(ReportedDateTo);
      logFailTestcase(temp, `Input ReportedDateTo "${ReportedDateTo}" failed!`);
    }

    if (PolicyReference) {
      temp = await claimSearchFilterInsurance.inputPolicyReferenceSearchAndFilterForm(PolicyReference);
      logFailTestcase(temp, `Input PolicyReference "${PolicyReference}" failed!`);
    }

    if (ClaimHandler) {
      temp = await claimSearchFilterInsurance.inputClaimHandlerSearchAndFilterForm(ClaimHandler);
      logFailTestcase(temp, `Input ClaimHandler "${ClaimHandler}" failed!`);
    }

    if (Product) {
      temp = await claimSearchFilterInsurance.inputProductSearchAndFilterForm(Product);
      logFailTestcase(temp, `Input Product "${Product}" failed!`);
    }

    if (Organization) {
      temp = await claimSearchFilterInsurance.inputOrganizationSearchAndFilterForm(Organization);
      logFailTestcase(temp, `Input Organization "${Organization}" failed!`);
    }

    
    if (OrgNo_NIN) {
      temp = await claimSearchFilterInsurance.inputOrgNo_NinOnSearchAndFilterForm(OrgNo_NIN);
      logFailTestcase(temp, `Input OrgNo_NIN "${OrgNo_NIN}" failed!`);
    }

    temp = await globalPageObject.pressSearchSearchAndFilter();
    logFailTestcase(temp, "Press Search at Search & Filter failed!");


    const ClaimNumber = parseInt(rows.ClaimNumber);
    const actualTotalNumber = await globalPageObject.getNumberOfTotalRecordsMainTab();

    if (ClaimNumber > 1 && ClaimNumber === actualTotalNumber) {
      // logSuccessMessage(`Line ${i + 1} in csv: Search & Filter passed!`);
      // do notthing
    } else if (ClaimNumber === 1) {
      //Validate name, orgNo, email, phone, status at Account list
      if (Reference) logFailTestcase(await claimListInsurance.validateSearchAndFilterReference(Reference), `Reference "${Reference}" does not match to result!`);
      if (ObjectName) logFailTestcase(await claimListInsurance.validateSearchAndFilterObjectName(ObjectName), `Object Name "${ObjectName}" does not match to result!`);
      if (Account) logFailTestcase(await claimListInsurance.validateSearchAndFilterAccount(Account), `Account "${Account}" does not match to result!`);
    }
    else if (ClaimNumber !== actualTotalNumber) {
      logWarningMessage(`There are ${actualTotalNumber} total records found!`);
      logFailTestcase(false, `Line 1 in csv: failed...`);
    }
});
Then('System shows result after search and filter on claim list', async () => {
  //We have implemented it at previous step
  console.info(scenarioName + ": Test case is passed!");
});

Then(`System returns no claim data found`, async() => {
  const result = await claimListInsurance.hasNoData();
  if (!result) {
      logFailTestcase(result, "System return some records in Claim list.");
  }
});
When("User inputs data into Seacrh and Filter form at claim list {string}", async function (filename) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  let temp = await globalPageObject.pressClearSearchAndFilter();
  logFailTestcase(temp, `Press Clear Search Filter failed!`);

  temp = await claimSearchFilterInsurance.clearAllDefaultFieldsSearchFilterForm();
  logFailTestcase(temp, `Clear all default fields search filter form failed!`);

  const Reference = rows[0].Reference;
  const ObjectName = rows[0].ObjectName;
  const Account = rows[0].Account;
  const OrgNo_NIN = rows[0].OrgNo_NIN;

  if (Reference) {
    temp = await claimSearchFilterInsurance.inputReferenceSearchAndFilterForm(Reference);
    logFailTestcase(temp, `Input reference "${Reference}" failed!`);
  }

  if (ObjectName) {
    temp = await claimSearchFilterInsurance.inputObjectNameSearchAndFilterForm(ObjectName);
    logFailTestcase(temp, `Input object name "${ObjectName}" failed!`);
  }

  if (Account) {
    temp = await claimSearchFilterInsurance.inputAccountSearchAndFilterForm(Account);
    logFailTestcase(temp, `Input account "${Account}" failed!`);
  }
  if (OrgNo_NIN) {
    temp = await claimSearchFilterInsurance.inputOrgNo_NinOnSearchAndFilterForm(OrgNo_NIN);
    logFailTestcase(temp, `Input OrgNo_NIN "${OrgNo_NIN}" failed!`);
  }
});

Then("User verifies filter dropdown on top of claim list", async function () {
  // do nothing
});

Then(`Claim Search and Filter form is cleared`, async () => {
  let temp = await claimSearchFilterInsurance.validateClearedSearchAndFilterClaimForm();
  logFailTestcase(temp, "Claim Search and Filter form is not cleared");
});