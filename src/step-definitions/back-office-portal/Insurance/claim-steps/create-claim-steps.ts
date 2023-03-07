import { Before, Given, Then, When } from "@cucumber/cucumber";
import { AccountDetailsLeftSide } from "../../../../page-objects/back-office-portal/general/account/account-details/left-side/AccountDetailsLeftSide";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { GlobalPagination } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPagination";
import { Login } from "../../../../page-objects/back-office-portal/general/login-logout/Login";
import { ClaimDetailsLeftSideInsurance } from "../../../../page-objects/back-office-portal/insurance/claim/claim-details/left-side/ClaimDetailsLeftSideInsurance";
import { ClaimDetailsLeftSidePolicyInsurance } from "../../../../page-objects/back-office-portal/insurance/claim/claim-details/left-side/ClaimDetailsLeftSidePolicyInsurance";
import { ClaimFormInsurance } from "../../../../page-objects/back-office-portal/insurance/claim/claim-forms/ClaimFormInsurance";
import { ClaimListInsurance } from "../../../../page-objects/back-office-portal/insurance/claim/claim-list/ClaimListInsurance";
import { ValidateField } from "../../../../shared/classes";
import { addDate, convertPathFileDataToDataRegression, getCurrentDateTime, getDate, logFailTestcase, logInfoMessage, logSuccessMessage, logWarningMessage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { numberToCurrency } from "../../../../shared/tenant-setting/tenant-setting";
import { UserProfileInfo } from "../../../../shared/user-profile/UserProfileInfo";
import { dataTestcase } from "../../../../shared/variables";
import { getDataTestCaseObjectByNameField } from "../../../../storage-data/functions/data-test-case";

const loader = require("csv-load-sync");
let claimListInsurance: ClaimListInsurance;
let claimFormInsurance: ClaimFormInsurance;
let login: Login;
let globalPageObject: GlobalPageObject;
let claimDetailsLeftSideInsurance: ClaimDetailsLeftSideInsurance;
let claimDetailsLeftSidePolicyInsurance: ClaimDetailsLeftSidePolicyInsurance;
let accountDetailsLeftSide: AccountDetailsLeftSide;
let globalPagination: GlobalPagination;

Before(async function () {
  const context: ICommonContext = this.context;
  claimListInsurance = new ClaimListInsurance(context.driverService);
  claimFormInsurance = new ClaimFormInsurance(context.driverService);
  login = new Login(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
  claimDetailsLeftSideInsurance = new ClaimDetailsLeftSideInsurance(context.driverService);
  claimDetailsLeftSidePolicyInsurance = new ClaimDetailsLeftSidePolicyInsurance(context.driverService);
  accountDetailsLeftSide = new AccountDetailsLeftSide(context.driverService);
  globalPagination = new GlobalPagination(context.driverService);
});

When("User logs in and checks for Claims in the top menu {string}", async function (filename) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  for (let i = 0; i < rows.length; i++) {
    logWarningMessage(`Checking line ${i + 1} in file csv:`);
    const username = rows[i].username;
    const password = rows[i].password;
    let temp = await login.inputUsername(username);
    logFailTestcase(temp, "Input user name failed!");
    temp = await login.inputPassword(password);
    logFailTestcase(temp, "Input password failed");

    temp = await login.pressLogin();
    logFailTestcase(temp, "Press login buttion failed!");

    await globalPageObject.waitForProgressBarLoaded_v2(2000);
    await globalPageObject.waitForProgressBarLoaded_v2(2000);
    await globalPageObject.waitForProgressBarLoaded_v2(2000);
    await globalPageObject.waitForProgressBarLoaded_v2(2000);

    temp = await globalPageObject.checkClaimButtonMenuExist();
    logFailTestcase(temp, "Not found Claims on top menu!");

    temp = await globalPageObject.navigateToMainLogOut();
    logFailTestcase(temp, "Can't log out!");

    logSuccessMessage(`\t=> Line ${i + 1} passed!`);
  }
});
Then("User finds Claims in the top menu", async function () {
  // do nothing
});

Given("User navigates to Claim list", async function () {
  const temp = await globalPageObject.navigateToMainClaimList();
  logFailTestcase(temp, "User navigates to Claim list failed!");
});

Given("User is on Claim list", async () => {
  let temp = await globalPageObject.navigateToSubClaims();
  logFailTestcase(temp, "Navigates to Claim list faled!");
});

Given("User opens Register a claim form", async function () {
  const temp = await claimListInsurance.pressCreateNewClaim();
  logFailTestcase(temp, "User opens Register a claim form failed!");
});

Then("User selects an organization on Register a Claim form {string}", async function (filename) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const IsOrganizationDropdownExist: string = rows[0].IsOrganizationDropdownExist.toString();
  const Organization = rows[0].Organization || UserProfileInfo.getOrganization();
  if ((!IsOrganizationDropdownExist) || IsOrganizationDropdownExist.localeCompare('yes') === 0 || IsOrganizationDropdownExist.localeCompare('Yes') === 0) {
    logInfoMessage(`Organization: "${Organization}"`);
    const temp = await claimFormInsurance.inputOrganizationClaimForm(Organization);
    logFailTestcase(temp, `Input Organization "${Organization}" failed!`);
  }
});

Then("User checks list at Account dropdown on Rigister a Claim form {string}", async function (filename) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const Accounts = rows[0].Accounts.split(";");
  for (const account of Accounts) {
    const temp = await claimFormInsurance.inputAccountClaimForm(account);
    logFailTestcase(temp, `Account "${account}" is not found on dropdown list!`);
  }

  let ExclusionAccounts = rows[0].ExclusionAccounts;
  if (ExclusionAccounts) {
    ExclusionAccounts = ExclusionAccounts.split(";");
    for (const ExclusionAccount of ExclusionAccounts) {
      const temp = await claimFormInsurance.inputAccountClaimForm(ExclusionAccount);
      logFailTestcase(!temp, `Account "${ExclusionAccount}" is found on this tenant. It belongs to other Organization!`);
    }
  }
});

Then("User selects an account on Register a Claim form {string}", async function (filename) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const Account = rows[0].Account;
  const temp = await claimFormInsurance.inputAccountClaimForm(Account);
  logFailTestcase(temp, `Account "${Account}" is not found on dropdown list!`);
});

Then("User checks list at Policy dropdown on Rigister a Claim form {string}", async function (filename) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const Policies = rows[0].Policies.split(";");
  for (const policy of Policies) {
    const temp = await claimFormInsurance.inputPolicyClaimForm(policy);
    logFailTestcase(temp, `Policy "${policy}" is not found on dropdown list!`);
  }
});

Then("User selects a policy on Register a Claim form {string}", async function (filename) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const Policy = rows[0].Policy;
  const temp = await claimFormInsurance.inputPolicyClaimForm(Policy);
  logFailTestcase(temp, `Policy "${Policy}" is not found on dropdown list!`);
});

Then("User checks product on Register a Claim form {string}", async function (filename) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const Product = rows[0].Product;
  const temp = await claimFormInsurance.validateProductClaimForm(Product);
  logFailTestcase(temp);
});

Then("User checks list at Claim Handler dropdown on Rigister a Claim form {string}", async function (filename) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const ClaimHandlers = rows[0].ClaimHandlers.split(";");
  for (const ClaimHandler of ClaimHandlers) {
    const temp = await claimFormInsurance.inputClaimHandlerClaimForm(ClaimHandler);
    logFailTestcase(temp, `Claim Handlers "${ClaimHandler}" is not found on dropdown list!`);
  }
});

When("User inputs valid data into Register a claim form {string}", async function (filename) {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  const Organization = row.Organization;
  const Account = row.Account;
  const Policy = (dataTestcase.length > 0 && dataTestcase[0].nameField) ? dataTestcase[0].nameField : row.Policy;
  let DateOfLoss = row.DateOfLoss;
  const DateOfLossMinusToday = row.DateOfLossMinusToday;
  const Product = row.Product;
  const ObjectName = row.ObjectName;
  const Address = row.Address;
  const ClaimHandler = row.ClaimHandler;
  const PhoneNumber = row.PhoneNumber;
  const EmailAddress = row.EmailAddress;
  const Notes = row.Notes;

  if (DateOfLossMinusToday) {
    DateOfLoss = getDate(DateOfLossMinusToday);
  }
  let temp = true;
  // if (Organization) {
  //   temp = await claimFormInsurance.inputOrganizationClaimForm(Organization);
  //   logFailTestcase(temp, `Input organization "${Organization}" failed!`);
  // }

  temp = await claimFormInsurance.inputAccountClaimForm(Account);
  logFailTestcase(temp, `Input account "${Account}" failed!`);

  temp = await claimFormInsurance.inputProductClaimForm(Product);
  logFailTestcase(temp, `Input product "${Product}" failed!`);

  if (DateOfLoss) {
    temp = await claimFormInsurance.inputDateOfLossClaimForm(DateOfLoss);
    logFailTestcase(temp, `Input Date of loss "${DateOfLoss}" failed!`);
  }

  temp = await claimFormInsurance.inputPolicyClaimForm(Policy);
  logFailTestcase(temp, `Input policy "${Policy}" failed!`);


  temp = await claimFormInsurance.inputAddressClaimForm(Address);
  logFailTestcase(temp, `Input address "${Address}" failed!`);

  if (ClaimHandler) {
    temp = await claimFormInsurance.inputClaimHandlerClaimForm(ClaimHandler);
    logFailTestcase(temp, `Input claim handler "${ClaimHandler}" failed!`);
  }


  temp = await claimFormInsurance.inputPhoneNumberClaimForm(PhoneNumber);
  logFailTestcase(temp, `Input phone number "${PhoneNumber}" failed!`);

  temp = await claimFormInsurance.inputEmailAddressClaimForm(EmailAddress);
  logFailTestcase(temp, `Input email address "${EmailAddress}" failed!`);

  temp = await claimFormInsurance.inputNotesClaimForm(Notes);
  logFailTestcase(temp, `Input notes "${Notes}" failed!`);
});

When("User inputs invalid data and checks validation on Claim form {string}", async function (filename) {
  const rows = loader(convertPathFileDataToDataRegression(filename));

  for (let i = 0; i < rows.length; i++) {
    const Organization = rows[i].Organization;
    const Account = rows[i].Account;
    const Policy = rows[i].Policy;
    const DateOfLoss = rows[i].DateOfLoss;
    const Product = rows[i].Product;
    const ObjectName = rows[i].ObjectName;
    const Address = rows[i].Address;
    const ClaimHandler = rows[i].ClaimHandler;
    const PhoneNumber = rows[i].PhoneNumber;
    const EmailAddress = rows[i].EmailAddress;
    const Notes = rows[i].Notes;
    logWarningMessage(`Checking line "${i + 1}" file csv...`)
    let temp = true;
    await claimFormInsurance.clearDataOrganizationClaimForm();
    if (Organization) {
      temp = await claimFormInsurance.inputOrganizationClaimForm(Organization);
    }

    await claimFormInsurance.clearDataAccountClaimForm();
    if (Account) {
      temp = await claimFormInsurance.inputAccountClaimForm(Account);
    }

    await claimFormInsurance.clearDataPolicyClaimForm();
    if (Policy) {
      temp = await claimFormInsurance.inputPolicyClaimForm(Policy);
    }

    await claimFormInsurance.clearDataDateOfLossClaimForm();
    if (DateOfLoss) {
      temp = await claimFormInsurance.inputDateOfLossClaimForm(DateOfLoss);
      logFailTestcase(temp, `Input Date of loss "${DateOfLoss}" failed!`);
    }

    await claimFormInsurance.clearDataAddressClaimForm();
    if (Address) {
      temp = await claimFormInsurance.inputAddressClaimForm(Address);
    }

    if (ClaimHandler) {
      temp = await claimFormInsurance.inputClaimHandlerClaimForm(ClaimHandler);
    }

    await claimFormInsurance.clearDataPhoneNumberClaimForm();
    if (PhoneNumber) {
      temp = await claimFormInsurance.inputPhoneNumberClaimForm(PhoneNumber);
      logFailTestcase(temp, `Input phone number "${PhoneNumber}" failed!`);
    }

    await claimFormInsurance.clearDataEmailAddressClaimForm();
    if (EmailAddress) {
      temp = await claimFormInsurance.inputEmailAddressClaimForm(EmailAddress);
    }

    if (Notes) {
      temp = await claimFormInsurance.inputNotesClaimForm(Notes);
    }

    temp = await globalPageObject.pressRegisterForm();
    logFailTestcase(temp, "Press Register claim form failed!");

    temp = await claimFormInsurance.checkValidationClaimFormExist();
    logFailTestcase(temp, `Not found any validation message on claim form!`);

    logWarningMessage(`\tLine "${i + 1}" is passed!`);
  }
});

When("User inputs invalid data and checks validation on Update Claim form {string}", async function (filename) {
  const rows = loader(convertPathFileDataToDataRegression(filename));

  for (const row of rows) {
    const Organization = row.Organization;
    const Account = row.Account;
    const Policy = row.Policy;
    const DateOfLoss = row.DateOfLoss;
    const Product = row.Product;
    const ObjectName = row.ObjectName;
    const Address = row.Address;
    const ClaimHandler = row.ClaimHandler;
    const PhoneNumber = row.PhoneNumber;
    const EmailAddress = row.EmailAddress;
    const Notes = row.Notes;

    let temp = true;
    await claimFormInsurance.clearDataOrganizationClaimForm();
    if (Organization) {
      temp = await claimFormInsurance.inputOrganizationClaimForm(Organization);
    }

    await claimFormInsurance.clearDataAccountClaimForm();
    if (Account) {
      temp = await claimFormInsurance.inputAccountClaimForm(Account);
    }

    await claimFormInsurance.clearDataPolicyClaimForm();
    if (Policy) {
      temp = await claimFormInsurance.inputPolicyClaimForm(Policy);
    }

    await claimFormInsurance.clearDataDateOfLossClaimForm();
    if (DateOfLoss) {
      temp = await claimFormInsurance.inputDateOfLossClaimForm(DateOfLoss);
      logFailTestcase(temp, `Input Date of loss "${DateOfLoss}" failed!`);
    }

    await claimFormInsurance.clearDataAddressClaimForm();
    if (Address) {
      temp = await claimFormInsurance.inputAddressClaimForm(Address);
    }

    if (ClaimHandler) {
      temp = await claimFormInsurance.inputClaimHandlerClaimForm(ClaimHandler);
    }

    await claimFormInsurance.clearDataPhoneNumberClaimForm();
    if (PhoneNumber) {
      temp = await claimFormInsurance.inputPhoneNumberClaimForm(PhoneNumber);
      logFailTestcase(temp, `Input phone number "${PhoneNumber}" failed!`);
    }

    await claimFormInsurance.clearDataEmailAddressClaimForm();
    if (EmailAddress) {
      temp = await claimFormInsurance.inputEmailAddressClaimForm(EmailAddress);
    }

    if (Notes) {
      temp = await claimFormInsurance.inputNotesClaimForm(Notes);
    }

    temp = await globalPageObject.pressSaveForm();
    logFailTestcase(temp, "Press Save claim form failed!");

    temp = await claimFormInsurance.checkValidationClaimFormExist();
    logFailTestcase(temp, `Not found any validation message on claim form!`);
  }
});

Then("User press {string} button on Claim form", async function (buttonName) {
  await globalPageObject.waitForProgressBarLoaded_v2(500);
  switch (buttonName) {
    case "Register": {
      let temp = await globalPageObject.pressRegisterForm();
      logFailTestcase(temp, `Press "${buttonName}" button on Claim form failed!`);
      break;
    }
    case "Cancel": {
      let temp = await globalPageObject.pressCancelForm();
      logFailTestcase(temp, `Press "${buttonName}" button on Claim form failed!`);
      break;
    }
    case "Save": {
      let temp = await globalPageObject.pressSaveForm();
      logFailTestcase(temp, `Press "${buttonName}" button on Claim form failed!`);
      break;
    }
    case "X": {
      await globalPageObject.closeOpeningForm();
      break;
    }
    default:
      logFailTestcase(false, `Press "${buttonName}" button on Claim form failed!`);
      break;
  }
});

Then("System shows new claim in Claim list {string}", async function (filename) {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];

  const Organization = row.Organization;
  const Account = row.Account;
  const Policy = (dataTestcase.length > 0 && dataTestcase[0].nameField && dataTestcase[0].nameField !== "Claim ReferenceId") ? dataTestcase[0].nameField : row.Policy;
  let DateOfLoss = row.DateOfLoss;
  const DateOfLossMinusToday = row.DateOfLossMinusToday;
  const ReportedDate = getCurrentDateTime().substring(0, 10);
  const Product = row.Product;
  const ObjectName = row.ObjectName;
  const ClaimHandler = row.ClaimHandler;
  const ExpectedStatus = row.ExpectedStatus;

  let temp = await globalPageObject.reloadTable(5000);
  await globalPageObject.waitForProgressBarLoaded_v2();

  temp = await claimListInsurance.validateValueClaimList(Organization, "Organization");
  logFailTestcase(temp);

  temp = await claimListInsurance.validateValueClaimList(Account, "Account name");
  logFailTestcase(temp);

  temp = await claimListInsurance.validateValueClaimList(Policy, "Policy");
  logFailTestcase(temp);

  if (DateOfLossMinusToday) {
    DateOfLoss = getDate(DateOfLossMinusToday);
  }
  if (!DateOfLoss && !DateOfLossMinusToday) {
    DateOfLoss = ReportedDate
  }
  temp = await claimListInsurance.validateValueClaimList(DateOfLoss, "Date of loss");
  logFailTestcase(temp);

  temp = await claimListInsurance.validateValueClaimList(ReportedDate, "Reported date");
  logFailTestcase(temp);

  temp = await claimListInsurance.validateValueClaimList(ExpectedStatus, "Status");
  logFailTestcase(temp);


  temp = await claimListInsurance.validateValueClaimList(Product, "Product");
  logFailTestcase(temp);

  temp = await claimListInsurance.validateValueClaimList(ObjectName, "Object name");
  logFailTestcase(temp);

  temp = await claimListInsurance.validateValueClaimList(ClaimHandler, "Claim handler");
  logFailTestcase(temp);
});

Then("User verifies claim info at Claim detail {string}", async function (filename) {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];


  let temp = await claimFormInsurance.waitUntilClaimFormClosed();
  logFailTestcase(temp, `Claim form is opening. It should be closed!`);
  await globalPageObject.waitForProgressBarLoaded_v2();

  const ClaimReferenceIDFormToast = await (await globalPageObject.getTextToastSuccess()).replace(/[^0-9]/g, '');
  if (ClaimReferenceIDFormToast) {
    dataTestcase.push(new ValidateField("Claim ReferenceId", 1, true, [ClaimReferenceIDFormToast], []));
  }

  const ReferenceId = getDataTestCaseObjectByNameField("Claim ReferenceId")?.message[0] || "";
  const Organization = row.Organization;
  let DateOfLoss = row.DateOfLoss;
  const ReportedDate = getCurrentDateTime().substring(0, 10);
  const Product = row.Product;
  const ObjectName = row.ObjectName;
  const ClaimHandler = row.ClaimHandler; // ~ AssignedTo
  const Account = row.Account;
  const PhoneNumber = row.PhoneNumber;
  const Email = row.Email;
  const OrgNo = row.OrgNo;
  const ExpectedStatus = row.ExpectedStatus;
  const DateOfLossMinusToday = row.DateOfLossMinusToday;

  if (ReferenceId) {
    temp = await claimDetailsLeftSideInsurance.validateValueClaimDetail(ReferenceId, "Reference");
    logFailTestcase(temp);
  }
  if (ClaimHandler) {
    temp = await claimDetailsLeftSideInsurance.validateValueClaimDetail(ClaimHandler, "Assigned To");
    logFailTestcase(temp);
  }
  if (Product) {
    temp = await claimDetailsLeftSideInsurance.validateValueClaimDetail(Product, "Product");
    logFailTestcase(temp);
  }
  if (Organization) {
    temp = await claimDetailsLeftSideInsurance.validateValueClaimDetail(Organization, "Organization");
    logFailTestcase(temp);
  }

  if (ReportedDate) {
    temp = await claimDetailsLeftSideInsurance.validateValueClaimDetail(ReportedDate, "Reported Date");
    logFailTestcase(temp);
  }

  if (DateOfLossMinusToday) {
    DateOfLoss = getDate(DateOfLossMinusToday);
  }
  if (!DateOfLoss && !DateOfLossMinusToday) {
    DateOfLoss = ReportedDate;
  }
  temp = await claimDetailsLeftSideInsurance.validateValueClaimDetail(DateOfLoss, "Date Of Loss");
  logFailTestcase(temp);


  if (ExpectedStatus) {
    temp = await claimDetailsLeftSideInsurance.validateValueClaimDetail(ExpectedStatus, "Status");
    logFailTestcase(temp);
  }
  if (Account) {
    temp = await claimDetailsLeftSideInsurance.validateValueClaimDetail(Account, "Account");
    logFailTestcase(temp);
  }
  if (PhoneNumber) {
    temp = await claimDetailsLeftSideInsurance.validateValueClaimDetail(PhoneNumber, "Phone Number");
    logFailTestcase(temp);
  }
  if (Email) {
    temp = await claimDetailsLeftSideInsurance.validateValueClaimDetail(Email, "Email");
    logFailTestcase(temp);
  }
  if (OrgNo) {
    temp = await claimDetailsLeftSideInsurance.validateValueClaimDetail(OrgNo, "NIN/Org. No.");
    logFailTestcase(temp);
  }


});

Then("User verifies Policy information at Claim detail {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];

  const Reference = getDataTestCaseObjectByNameField("QuoteReference")?.message[0] || row.Policy;
  const Status = row.Status;
  const StartDateMinusToday = row.StartDateMinusToday;
  const EndDateMinusStartDate = row.EndDateMinusStartDate;
  let Premium = row.PolicyPremium;
  const Currency = row.Currency;
  const Product = row.ProductName;
  const Covers = row.Covers;
  const Documents = row.Documents || Reference;
  let StartDate = row.StartDate;
  let EndDate = row.EndDate;
  if (StartDateMinusToday && EndDateMinusStartDate) {
    StartDate = getDate(StartDateMinusToday);
    EndDate = addDate(StartDate, EndDateMinusStartDate);
  }
  if (row.NewPremium) { // Terminate case
    EndDate = addDate(row.EffectiveFrom, -1);
    Premium = row.NewPremium;
  }
  let Term = StartDate + " - " + EndDate;

  if (Reference) logFailTestcase(await claimDetailsLeftSidePolicyInsurance.validateValueClaimDetailPolicyInformation(Reference, "Reference"));
  if (Status) logFailTestcase(await claimDetailsLeftSidePolicyInsurance.validateValueClaimDetailPolicyInformation(Status, "Status"));
  if (Term) logFailTestcase(await claimDetailsLeftSidePolicyInsurance.validateValueClaimDetailPolicyInformation(Term, "Term"));
  if (Premium) logFailTestcase(await claimDetailsLeftSidePolicyInsurance.validateValueClaimDetailPolicyInformation(numberToCurrency(Premium, true, Currency), "Premium"));
  if (Product) logFailTestcase(await claimDetailsLeftSidePolicyInsurance.validateValueClaimDetailPolicyInformation(Product, "Product"));
  if (Documents) logFailTestcase(await claimDetailsLeftSidePolicyInsurance.validateValueClaimDetailPolicyInformation(Documents, "Documents"));//We just vefify name of document is the same to Policy reference
  if (Covers) logFailTestcase(await claimDetailsLeftSidePolicyInsurance.validateValueClaimDetailPolicyInformation(Covers, "Covers"));

});

Given("User presses Reference id Policy information at Claim detail", async () => {
  logFailTestcase(await claimDetailsLeftSidePolicyInsurance.pressReferenceIdClaimDetailPolicyInformation(), 'Press Reference id at Policy Information failed!');
});

Then("System does not show new claim in Claim list {string}", async function (filename) {
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
  let temp = await globalPageObject.reloadTable(5000);
  await globalPageObject.waitForProgressBarLoaded_v2();

  let temp1 = await claimListInsurance.validateValueClaimList(Organization, "Organization");

  let temp2 = await claimListInsurance.validateValueClaimList(Account, "Account name");

  let temp3 = await claimListInsurance.validateValueClaimList(Policy, "Policy");

  if (!DateOfLoss) {
    DateOfLoss = ReportedDate
  }

  let temp4 = await claimListInsurance.validateValueClaimList(DateOfLoss, "Date of loss");

  let temp5 = await claimListInsurance.validateValueClaimList(ReportedDate, "Reported date");

  let temp6 = await claimListInsurance.validateValueClaimList(ExpectedStatus, "Status");

  let temp7 = await claimListInsurance.validateValueClaimList(Product, "Product");

  let temp8 = await claimListInsurance.validateValueClaimList(ObjectName, "Object name");

  let temp9 = await claimListInsurance.validateValueClaimList(ClaimHandler, "Claim handler");

  const check = !(temp1 && temp2 && temp3 && temp4 && temp5 && temp6 && temp7 && temp8 && temp9);
  logFailTestcase(check, `The claim is still created on Claim list`);
});


When("User checks event after create claim at Audit logs list", async function () {
  // Do nothing
});

When("User checks event after udpate claim at Audit logs list", async function () {
  // Do nothing
});
Given("User saves reference id of new claim", async function () {
  const referenceId = await claimListInsurance.getReferenceIdClaimList(1);
  dataTestcase.push(new ValidateField("Claim ReferenceId", 1, true, [referenceId.toString()], []));
  await globalPageObject.waitForProgressBarLoaded_v2(10000);

});
Given("User verifies UI at Claim list page", async function () {
  // do nothing
  await globalPageObject.waitForProgressBarLoaded_v2(100);
});

Then("System shows buttons on top of claim table", async () => {
  let temp = await claimListInsurance.verifyButtonsOnTopOfClaimTable();
  logFailTestcase(temp, "Verify buttons on top of claim table failed");
});

Then("System shows claim table with full collumn", async function () {
  let temp = await claimListInsurance.verifyColumnsOfClaimTable();
  logFailTestcase(temp, "Verify columns of claim table failed!");
});

Then("System shows pagination buttons under of claim table", async () => {
  let temp = await globalPagination.verifyPaginagtionButtonsAtMainList("Claim");
  logFailTestcase(temp, "Verify paginagtion buttons at Claim list: failed!");
});

When("User checks claim list for the sort order", async function () {
  //do nothing
});

Then("System shows the claims sorted by Reported date descending", async function () {
  let temp = await globalPageObject.expandNumberOfItemMainList(30);
  logFailTestcase(temp, "Expand item/ page at Claim list failed!")
  await globalPageObject.waitForProgressBarLoaded_v2(100);

  temp = await claimListInsurance.checkColumnReportedDateSortedDescending();
  logFailTestcase(temp, "Check sorted by Reported date descending failed!");
});

When("User clicks on Account Name of first claim at Claim list", async () => {
  const accountName = await claimListInsurance.getAccountNameClaimList(1);
  logFailTestcase(accountName.length > 0, "Get account name of first claim failed!");
  logWarningMessage(`Click on Account Name "${accountName}"`);

  let temp = await claimListInsurance.pressAccountNameClaimList(1);
  logFailTestcase(temp, `Click on Account Name hypelick of first claim failed!`);
  dataTestcase.push(new ValidateField(accountName, 0, true, [], []));
});

Then("System navigates to the corresponding Account Profile page", async () => {
  await globalPageObject.waitForProgressBarLoaded_v2(100);
  await globalPageObject.waitForProgressBarLoaded_v2(100);
  const expectedAccountName = dataTestcase[dataTestcase.length - 1].nameField;
  const temp = await accountDetailsLeftSide.assertTitleOfOpeningAccountTab(expectedAccountName);
  logFailTestcase(temp, `Then opening account is NOT "${expectedAccountName}"`);
});

When("User clicks on Account Name of other claim at Claim list", async () => {
  let selectedAccounts: string[] = [];
  for (const element of dataTestcase) {
    selectedAccounts.push(element.nameField);
  }
  let temp = await globalPageObject.expandNumberOfItemMainList(30);
  logFailTestcase(temp, "Expand Item/Page at Claim list failed!");

  await globalPageObject.waitForProgressBarLoaded_v2(100);
  for (let i = 1; i <= 30; i++) {
    let temp2 = await claimListInsurance.getAccountNameClaimList(i);
    if (temp2 && !selectedAccounts.includes(temp2)) {
      temp = await claimListInsurance.pressAccountNameClaimList(i);
      logFailTestcase(temp, `Press Account Name hyperlink at row "${i}" failed!`);

      dataTestcase.push(new ValidateField(temp2, 0, true, [], []));
      break;
    }
  }

});

Then("The first Account tab is still there", async () => {
  const firstAccount = dataTestcase[0].nameField;
  let temp = await accountDetailsLeftSide.checkAccountTabExist(firstAccount);

  logFailTestcase(temp, `Account tab with name "${firstAccount}" is NOT still there!`);
});


When("User open the first Claim on Claim list", async () => {
  await globalPageObject.waitForProgressBarLoaded_v2(2000);
  let temp = await claimListInsurance.pressReferenceIdClaimList(1);
  logFailTestcase(temp, `User open the first Claim on Claim list failed!`);
});
