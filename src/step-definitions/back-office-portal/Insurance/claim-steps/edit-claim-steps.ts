import { Before, Given, Then, When } from "@cucumber/cucumber";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { ClaimFormInsurance } from "../../../../page-objects/back-office-portal/insurance/claim/claim-forms/ClaimFormInsurance";
import { ClaimListInsurance } from "../../../../page-objects/back-office-portal/insurance/claim/claim-list/ClaimListInsurance";
import { ValidateField } from "../../../../shared/classes";
import { convertPathFileDataToDataRegression, getCurrentDateTime, logFailTestcase, logInfoMessage, logSuccessMessage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { dataTestcase, resetDataTestcase } from "../../../../shared/variables";
import { getDataTestCaseObjectByNameField } from "../../../../storage-data/functions/data-test-case";
import { pushObjectToDataArrayWithUniqueKey } from "../../../../storage-data/functions/data-test-execution";


const loader = require("csv-load-sync");
let claimListInsurance: ClaimListInsurance;
let claimFormInsurance: ClaimFormInsurance;
let globalPageObject: GlobalPageObject;


Before(async function () {
  const context: ICommonContext = this.context;
  claimListInsurance = new ClaimListInsurance(context.driverService);
  claimFormInsurance = new ClaimFormInsurance(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
});

Given("User opens Update claim form", async function () {
  const temp = await claimListInsurance.pressEditClaim();
  logFailTestcase(temp, "User opens Update claim form failed!");

  const ClaimReference = await (await claimListInsurance.getReferenceIdClaimList(1)).toString();
  dataTestcase.push(new ValidateField("Claim ReferenceId", 1, true, [ClaimReference], []));
});

Given("User opens Update claim form at row {string}", async function (row) {
  const temp = await claimListInsurance.pressEditClaim(parseInt(row));
  logFailTestcase(temp, `User opens Update claim form at row "${row}" failed!`);
});

Given("User opens detail of first claim on Claim list", async () => {
  const refClaimId = await claimListInsurance.getReferenceIdClaimList(1);
  logFailTestcase(refClaimId > 0, 'Get Reference claim id failed!');
  dataTestcase.push(new ValidateField("Claim ReferenceId", 1, true, [refClaimId.toString()], []));
  pushObjectToDataArrayWithUniqueKey("Claim ReferenceId",refClaimId.toString());
  
  const temp = await claimListInsurance.pressReferenceIdClaimList(1);
  logFailTestcase(temp, "Open detail of first claim failed!");
});

Given("User opens detail of first account on Claim list", async () => {
  const temp = await claimListInsurance.pressAccountNameClaimList(1);
  logFailTestcase(temp, "Open detail of first account failed!");
});

Given("User opens detail a claim on Claim list with product {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  const Product = row.Product;
  let temp = await globalPageObject.expandNumberOfItemMainList(30);
  logFailTestcase(temp, "Expand number Item/Page failed!");

  for (let i = 1; i <= 30; i++) {
    const actualProduct = await claimListInsurance.getProductClaimList(i);
    if (actualProduct.localeCompare(Product) === 0) {
      temp = await claimListInsurance.pressReferenceIdClaimList(i);
      logFailTestcase(temp, `Press reference id of claim at row "${i}" failed!`);
      break;
    }
  }
});

When("User inputs valid data into Update claim form {string}", async function (filename) {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];

  //const Organization = row.Organization;
  //const Account = row.Account;
  //const Policy = row.Policy;
  //const PolicyTerm = row.PolicyTerm;
  //const DateOfLoss = row.DateOfLoss;
  //const Product = row.Product;
  //const ObjectName = row.ObjectName;
  const Address = row.Address;
  const ClaimHandler = row.ClaimHandler;
  const PhoneNumber = row.PhoneNumber;
  const EmailAddress = row.EmailAddress;
  const Notes = row.Notes;

  let temp = true;

  const ClaimReference = getDataTestCaseObjectByNameField("Claim ReferenceId")?.message[0];
  if(ClaimReference){
    temp = await claimFormInsurance.validateValueClaimForm(ClaimReference, "Reference");
    logFailTestcase(temp, `Incorrect Claim Reference`);
  }


  // if (Organization) {
  //   temp = await claimFormInsurance.inputOrganizationClaimForm(Organization);
  //   logFailTestcase(temp, `Input organization "${Organization}" failed!`);
  // }

  // if (Account) {
  //   temp = await claimFormInsurance.clearDataAccountClaimForm();
  //   logFailTestcase(temp, `Clear old data at Account field failed!`);
  //   await globalPageObject.waitForProgressBarLoaded_v2();

  //   temp = await claimFormInsurance.inputAccountClaimForm(Account);
  //   logFailTestcase(temp, `Input account "${Account}" failed!`);

  //   temp = await claimFormInsurance.inputProductClaimForm(Product);
  //   logFailTestcase(temp, `Input product "${Product}" failed!`);

  //   temp = await claimFormInsurance.inputPolicyClaimForm(Policy);
  //   logFailTestcase(temp, `Input policy "${Policy}" failed!`);
  // }

  // if (DateOfLoss) {
  //   temp = await claimFormInsurance.inputDateOfLossClaimForm(DateOfLoss);
  //   logFailTestcase(temp, `Input Date of loss "${DateOfLoss}" failed!`);
  // }

  if (Address) {
    temp = await claimFormInsurance.inputAddressClaimForm(Address);
    logFailTestcase(temp, `Input address "${Address}" failed!`);
  }

  if (ClaimHandler) {
    temp = await claimFormInsurance.inputClaimHandlerClaimForm(ClaimHandler);
    logFailTestcase(temp, `Input claim handler "${ClaimHandler}" failed!`);
  }


  if (PhoneNumber) {
    temp = await claimFormInsurance.inputPhoneNumberClaimForm(PhoneNumber);
    logFailTestcase(temp, `Input phone number "${PhoneNumber}" failed!`);
  }

  if (EmailAddress) {
    temp = await claimFormInsurance.inputEmailAddressClaimForm(EmailAddress);
    logFailTestcase(temp, `Input email address "${EmailAddress}" failed!`);
  }

  if (Notes) {
    temp = await claimFormInsurance.inputNotesClaimForm(Notes);
    logFailTestcase(temp, `Input notes "${Notes}" failed!`);
  }
});

Then("System shows updated claim in Claim list {string}", async function (filename) {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];

  const Organization = row.Organization;
  const Account = row.Account;
  const Policy = row.Policy;
  let DateOfLoss = row.DateOfLoss;
  const ReportedDate = getCurrentDateTime().substring(0, 10);
  const Product = row.Product;
  const ObjectName = row.ObjectName;
  const ClaimHandler = row.ClaimHandler;


  const ExpectedStatus = row.ExpectedStatus;
  let temp = true;
  temp = await claimFormInsurance.waitUntilClaimFormClosed();
  logFailTestcase(temp, `Claim form is opening. It should be closed!`);

  await globalPageObject.waitForProgressBarLoaded_v2();
  const ClaimReference = getDataTestCaseObjectByNameField("Claim ReferenceId")?.message[0] || "";
  if(ClaimReference){
    temp = await globalPageObject.checkToastSuccessExistWithMessage(`Claim ${ClaimReference} is updated successfully.`);
    logFailTestcase(temp, `Incorrect Claim Reference`);
    logSuccessMessage("Validate Claim Reference: Passed!");
  }

  temp = await globalPageObject.reloadTable(5000);
  await globalPageObject.waitForProgressBarLoaded_v2(500);

  if (Organization) {
    temp = await claimListInsurance.validateValueClaimList(Organization, "Organization");
    logFailTestcase(temp);
  }

  if (Account) {
    temp = await claimListInsurance.validateValueClaimList(Account, "Account name");
    logFailTestcase(temp);

    temp = await claimListInsurance.validateValueClaimList(Policy, "Policy");
    logFailTestcase(temp);
  }


  if (!DateOfLoss) {
    DateOfLoss = ReportedDate;
  }
  temp = await claimListInsurance.validateValueClaimList(DateOfLoss, "Date of loss");
  logFailTestcase(temp);

  temp = await claimListInsurance.validateValueClaimList(Product, "Product");
  logFailTestcase(temp);

  temp = await claimListInsurance.validateValueClaimList(ObjectName, "Object name");
  logFailTestcase(temp);

  temp = await claimListInsurance.validateValueClaimList(ReportedDate, "Reported date");
  logFailTestcase(temp);

  temp = await claimListInsurance.validateValueClaimList(ExpectedStatus, "Status");
  logFailTestcase(temp);

  if (ClaimHandler) {
    temp = await claimListInsurance.validateValueClaimList(ClaimHandler, "Claim handler");
    logFailTestcase(temp);
  }
});

Given("User saves info the claim at row {string}", async function (row) {
  resetDataTestcase();
  row = parseInt(row);
  const reference = await claimListInsurance.getReferenceIdClaimList(row);
  const account = await claimListInsurance.getAccountNameClaimList(row);
  const objectName = await claimListInsurance.getObjectNameClaimList(row);
  const dateOfLoss = await claimListInsurance.getDateOfLossClaimList(row);
  const reportedDate = await claimListInsurance.getReportedDateClaimList(row);
  const policy = await claimListInsurance.getPolicyClaimList(row);
  const product = await claimListInsurance.getProductClaimList(row);
  const claimHandler = await claimListInsurance.getClaimHandlerClaimList(row);
  const organization = await claimListInsurance.getOrganizationClaimList(row);

  dataTestcase.push(new ValidateField("Reference", 0, true, [reference.toString()], []));
  dataTestcase.push(new ValidateField("Organization", 0, true, [organization], []));
  dataTestcase.push(new ValidateField("Account", 0, true, [account], []));
  dataTestcase.push(new ValidateField("Object name", 1, true, [objectName], []));
  dataTestcase.push(new ValidateField("Date of loss", 2, true, [dateOfLoss], []));
  dataTestcase.push(new ValidateField("Reported date", 3, true, [reportedDate], []));
  dataTestcase.push(new ValidateField("Policy", 4, true, [policy], []));
  dataTestcase.push(new ValidateField("Product", 5, true, [product], []));
  dataTestcase.push(new ValidateField("Claim handler", 6, true, [claimHandler], []));
});

Then("User checks info at Update claim form", async function () {
  let countError = 0;
  for (const element of dataTestcase) {
    const nameField = element.nameField;
    if (nameField.localeCompare("Account") === 0) {
      await globalPageObject.waitForProgressBarLoaded_v2(5000);
    }
    const temp = await claimFormInsurance.validateValueClaimForm(element.message[0], element.nameField);
    if (!temp) {
      countError++;
    }
  }
  logFailTestcase(countError === 0, "User checks info at Update claim form failed!");

  logFailTestcase(await globalPageObject.checkSaveButtonFormExist(), `Not found button "Save" on Claim form!`);
  logFailTestcase(await globalPageObject.checkCancelButtonFormExist(), `Not found button "Cancel" on Claim form!`);
});