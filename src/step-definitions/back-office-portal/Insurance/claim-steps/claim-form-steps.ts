import { Before, When } from "@cucumber/cucumber";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { ClaimFormInsurance } from "../../../../page-objects/back-office-portal/insurance/claim/claim-forms/ClaimFormInsurance";
import { convertPathFileDataToDataRegression, getCurrentDateTime, logFailTestcase, logInfoMessage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { dataTestcase } from "../../../../shared/variables";

const loader = require("csv-load-sync");
let claimFormInsurance: ClaimFormInsurance;
let globalPageObject: GlobalPageObject;


Before(async function () {
  const context: ICommonContext = this.context;
  claimFormInsurance = new ClaimFormInsurance(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
});

When("User verifies info on Update claim form {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const row = rows[0];

  const Organization = row.Organization;
  const Account = row.Account;
  const Policy = (dataTestcase.length > 0 && dataTestcase[0].nameField && dataTestcase[0].nameField !== "Claim ReferenceId") ? dataTestcase[0].nameField : row.Policy;
  let DateOfLoss = row.DateOfLoss;
  const ReportedDate = getCurrentDateTime().substring(0, 10);
  const Product = row.Product;
  const ObjectName = row.ObjectName;
  const Address = row.Address;
  const ClaimHandler = row.ClaimHandler;
  const PhoneNumber = row.PhoneNumber;
  const EmailAddress = row.EmailAddress;
  const Notes = row.Notes;
  await globalPageObject.waitForProgressBarLoaded_v2(3000);
  let temp = true;
  if (Organization) {
    temp = await claimFormInsurance.validateValueClaimForm(Organization, "Organization");
    logFailTestcase(temp, "Incorrect Organization!");
  }
  if (Account) {
    temp = await claimFormInsurance.validateValueClaimForm(Account, "Account");
    logFailTestcase(temp, "Incorrect Account!");
  }
  if (Product) {
    temp = await claimFormInsurance.validateValueClaimForm(Product, "Product");
    logFailTestcase(temp, "Incorrect Product!");
  }
  if (DateOfLoss) {
    temp = await claimFormInsurance.validateValueClaimForm(DateOfLoss, "Date of loss");
    logFailTestcase(temp, "Incorrect Date Of loss!");
  }
  if (Policy) {
    logInfoMessage("Policy has NOT been veirified!");
  }
  if (ReportedDate) {
    temp = await claimFormInsurance.validateValueClaimForm(ReportedDate, "Reported date");
    logFailTestcase(temp, "Incorrect Reported Date!");
  }
  if (ObjectName) {
    temp = await claimFormInsurance.validateValueClaimForm(ObjectName, "Object name");
    logFailTestcase(temp, "Incorrect Object Name!");
  }
  if (Address) {
    temp = await claimFormInsurance.validateValueClaimForm(Address, "Address");
    logFailTestcase(temp, "Incorrect Address!");
  }
  if (ClaimHandler) {
    temp = await claimFormInsurance.validateValueClaimForm(ClaimHandler, "Claim handler");
    logFailTestcase(temp, "Incorrect Claim Handler!");
  }
  if (PhoneNumber) {
    temp = await claimFormInsurance.validateValueClaimForm(PhoneNumber, "Phone number");
    logFailTestcase(temp, 'Incorrect Phone Number!');
  }
  if (EmailAddress) {
    temp = await claimFormInsurance.validateValueClaimForm(EmailAddress, "Email address");
    logFailTestcase(temp, 'Incorrect Email Address!');
  }
  if (Notes) {
    temp = await claimFormInsurance.validateValueClaimForm(Notes, "Notes");
    logFailTestcase(temp, 'Incorrect Notes!');
  }
});