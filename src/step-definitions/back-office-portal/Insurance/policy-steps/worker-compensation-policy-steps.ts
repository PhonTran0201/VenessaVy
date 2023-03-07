import { Before, Then, When } from "@cucumber/cucumber";
import { fail } from "assert";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { GlobalPolicyInsurance } from "../../../../page-objects/back-office-portal/insurance/policy/policy-layout/GlobalPolicyInsurance";
import { PolicyConfirmationInsurance } from "../../../../page-objects/back-office-portal/insurance/policy/policy-layout/PolicyConfirmationInsurance";
import { PolicyListInsurance } from "../../../../page-objects/back-office-portal/insurance/policy/policy-list/PolicyListInsurance";
import { CreatingQuoteInsurance } from "../../../../page-objects/back-office-portal/insurance/quote/quote-layout/CreatingQuoteInsurance";
import { CreatingQuoteListInsurance } from "../../../../page-objects/back-office-portal/insurance/quote/quote-layout/CreatingQuoteListInsurance";
import { GlobalQuoteInsurance } from "../../../../page-objects/back-office-portal/insurance/quote/quote-layout/GlobalQuoteInsurance";
import { QuoteListInsurance } from "../../../../page-objects/back-office-portal/insurance/quote/quote-list/QuoteListInsurance";
import { PageFactory } from "../../../../page-objects/PageFactory";
import { ValidateField } from "../../../../shared/classes";
import { addDate, convertPathFileDataToDataRegression, logFailTestcase, logInfoMessage, logSuccessMessage, logWarningMessage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { numberToCurrency } from "../../../../shared/tenant-setting/tenant-setting";
import { dataTestcase, scenarioName, scenarioTags, subErrorMessages } from "../../../../shared/variables";
import { inputWorkerCompensation } from "../quote-steps/worker-compensation-steps";

const loader = require("csv-load-sync");

let globalQuoteInsurance: GlobalQuoteInsurance;
let globalPolicyInsurance: GlobalPolicyInsurance;
let globalPageObject: GlobalPageObject;
let creatingQuoteListInsurance: CreatingQuoteListInsurance;
let paymentOptionFormInsurance ;
let policyConfirmationInsurance: PolicyConfirmationInsurance;
let policyListInsurance: PolicyListInsurance;
let creatingQuoteInsurance: CreatingQuoteInsurance;
let quoteListInsurance: QuoteListInsurance;

Before(async function () {
  const context: ICommonContext = this.context;
  globalQuoteInsurance = new GlobalQuoteInsurance(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
  globalPolicyInsurance = new GlobalPolicyInsurance(context.driverService);
  creatingQuoteListInsurance = new CreatingQuoteListInsurance(context.driverService);
  policyListInsurance = new PolicyListInsurance(context.driverService);
  creatingQuoteInsurance = new CreatingQuoteInsurance(context.driverService);
  quoteListInsurance = new QuoteListInsurance(context.driverService);
  policyConfirmationInsurance = new PolicyConfirmationInsurance(context.driverService);
  paymentOptionFormInsurance = PageFactory.getInstance().createPaymentOptionForm();
});

When("User selectes an existing Worker Compensation quote and create policy from csv file {string}", async (filename) => {
  let rows = loader(convertPathFileDataToDataRegression(filename));

  const SelectedDescription = rows[0].SelectedDescription;
  const SelectedProductName = rows[0].SelectedProductName || rows[0].ProductName;
  const SelectedPolicyTerm = rows[0].SelectedPolicyTerm || rows[0].StartDate + " - " + rows[0].EndDate;
  const SelectedStatus = rows[0].SelectedStatus;
  const UnderwritingAdjustment = rows[0].UnderwritingAdjustment;
  const ProductCommission = rows[0].ProductCommission;
  const SalesDiscount = rows[0].SalesDiscount;
  const PaymentType = rows[0].PaymentType;
  const PaymentFrequency = rows[0].PaymentFrequency;
  const Status = rows[0].Status;
  const PolicyPremium = numberToCurrency(rows[0].PolicyPremium, true, rows[0].Currency);
  const AnnualPremium = numberToCurrency(rows[0].AnnualPremium, true, rows[0].Currency);

  if (SelectedStatus.localeCompare("Completed") !== 0) {
    logWarningMessage(`Currently, we just support creating policy from quote with status "Completed"!`);
    fail(scenarioName + ": Test case is failed!" + subErrorMessages);
  }

  let temp = await quoteListInsurance.openExistingQuoteAtQuoteList(
    SelectedDescription,
    SelectedProductName,
    SelectedPolicyTerm,
    SelectedStatus
  );
  if (!temp) {
    logWarningMessage("Open existing quote failed!");
    logFailTestcase(temp, scenarioName + ": Test case is failed!" + subErrorMessages);
  }


  temp = await creatingQuoteInsurance.inputDataToCreatingQuote(
    UnderwritingAdjustment,
    ProductCommission,
    SalesDiscount,
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  );
  if (!temp) {
    logWarningMessage("Creating quote failed!");
    fail(scenarioName + ": Test case is failed!" + subErrorMessages);
  }
  await creatingQuoteListInsurance.clickPurchase();


  temp = await paymentOptionFormInsurance.inputDataIntoSelectPaymentOptionForm(PaymentType, PaymentFrequency);
  if (!temp) {
    logWarningMessage("Select payment option failed!");
    fail(scenarioName + ": Test case is failed!" + subErrorMessages);
  }

  temp = await policyConfirmationInsurance.checkPurchaseSuccessful();
  if (!temp) {
    logWarningMessage(`There are no successful message: "POLICIES HAVE BEEN CREATED SUCCESSFULLY!."`);
    logFailTestcase(temp,scenarioName + ": Test case is failed!" + subErrorMessages);
  }

});

When("User selectes an existing Worker Compensation policy and renew policy from csv file {string}", async (filename) => {
  let rows = loader(convertPathFileDataToDataRegression(filename));

  const SalesChannel = rows[0].SalesChannel;
  const ProductName = rows[0].ProductName;
  //const StartDate = rows[0].StartDate;
  let EndDate = rows[0].EndDate;
  // const StartDateMinusToday = rows[0].StartDateMinusToday;
  const EndDateMinusStartDate = rows[0].EndDateMinusStartDate;
  const OrganizationNumber = rows[0].OrganizationNumber;
  const CompanyName = rows[0].CompanyName;
  const IndustryCode = rows[0].IndustryCode;
  const LossRatio = rows[0].LossRatio;
  const Claims5Years = rows[0].Claims5Years;
  const NumberOfPeople = rows[0].NumberOfPeople;
  const ManLabouryears = rows[0].ManLabouryears;

  const UnderwritingAdjustment = rows[0].UnderwritingAdjustment;
  const ProductCommission = rows[0].ProductCommission;
  const SalesDiscount = rows[0].SalesDiscount;
  const SalesComission = rows[0].SalesComission;
  const AnnualPremium = numberToCurrency(rows[0].AnnualPremium, true, rows[0].Currency);
  const PolicyPremium = numberToCurrency(rows[0].PolicyPremium, true, rows[0].Currency);
  const IsConstrained = rows[0].IsConstrained;
  const NumerOfDaysWillExpire = rows[0].NumerOfDaysWillExpire;

  const PaymentType = rows[0].PaymentType;
  const PaymentFrequency = rows[0].PaymentFrequency;

  logInfoMessage("Opening first policy!");
  let temp = await policyListInsurance.openFirstPolicy();
  if (!temp) {
    logWarningMessage("Can't open policy in Policy list!");
    fail(scenarioName + ": is failed!" + subErrorMessages);
  }

  logInfoMessage("Click renew policy!");
  temp = await creatingQuoteInsurance.clickRenewPolicy();
  if (!temp) {
    logWarningMessage("Can't Renew this policy!");
    fail(scenarioName + ": is failed!" + subErrorMessages);
  }

  dataTestcase.push(new ValidateField("", 0, true, [], []));

  logInfoMessage("Get start date...");
  const StartDate = await globalQuoteInsurance.getStartDateForRenewPolicy();
  if (!StartDate) {
    logWarningMessage("Can't get Start date this policy!");
    fail(scenarioName + ": is failed!" + subErrorMessages);
  }

  logInfoMessage("Input data to Create quote form!");
  if (EndDateMinusStartDate) {
    EndDate = addDate(StartDate, EndDateMinusStartDate);
  }
  temp = await globalQuoteInsurance.inputEndDate(EndDate);
  logFailTestcase(temp, "InputEnDate failed")

  await inputWorkerCompensation(
    OrganizationNumber,
    CompanyName,
    IndustryCode,
    LossRatio,
    Claims5Years,
    NumberOfPeople,
    ManLabouryears
  )

  temp = await creatingQuoteInsurance.inputDataOrigoToCreatingQuote(
    UnderwritingAdjustment,
    ProductCommission,
    SalesDiscount,
    IsConstrained,
    StartDate,
    EndDate,
    NumerOfDaysWillExpire,
    AnnualPremium,
    PolicyPremium
  );
  if (!temp) {
    fail(scenarioName + ": Test case is failed!" + subErrorMessages);
  }

  await creatingQuoteListInsurance.clickPurchase();

  temp = await paymentOptionFormInsurance.inputDataIntoSelectPaymentOptionForm(PaymentType, PaymentFrequency);
  if (!temp) {
    logWarningMessage("SELECT PAYMENT OPTION!");
    fail(scenarioName + ": Test case is failed!" + subErrorMessages);
  }

  temp = await policyConfirmationInsurance.checkPurchaseSuccessful();
  if (!temp) {
    logWarningMessage(`There are no successful message: "POLICIES HAVE BEEN CREATED SUCCESSFULLY!."`);
    fail(scenarioName + ": Test case is failed!" + subErrorMessages);
  }

  dataTestcase[0].nameField = (dataTestcase[0].nameField.split("/"))[0];
});

Then("System shows new policy in Worker Compensation Policy widget at Summary tab {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  let len = rows.length;
  await globalPageObject.navigateToSubSummary();
  logInfoMessage("\tChecking Policies created on Policies widget - Summary tab:");
  for (let i = len - 1, j = 1; i >= 0; i--, j++) {
    let product = rows[i].ProductName;
    let Currency = rows[i].Currency;
    let premium = numberToCurrency(rows[i].PolicyPremium,Currency);
    let policyRef = (dataTestcase[i].nameField).replace(/\D/g, "");
    let Product_PolicyRef = product + " - REF.:" + policyRef;
    let temp = await globalPolicyInsurance.assertPoliciesAtPolicyWidget(j, Product_PolicyRef, premium);
    if (!temp) {
      logWarningMessage("Check Policies created at Policy widget failed!");
      fail(`Line ${j} in file csv:\n` + scenarioName + ": Test case is failed!" + subErrorMessages);
    }
  }
  logSuccessMessage("=> Then - System shows new policies in Policy widget at Summary tab: is passed!");
});

When("User selectes an existing Worker Compensation policy and adjust policy from csv file {string}", async (filename) => {
  let rows = loader(convertPathFileDataToDataRegression(filename));

  const SelectedPolicyTerm = rows[0].SelectedPolicyTerm;
  const EffectiveDate = rows[0].EffectiveDate;

  const StartDate = SelectedPolicyTerm.substring(0, 10);
  const EndDate = SelectedPolicyTerm.substring(11, 21);
  const OrganizationNumber = rows[0].OrganizationNumber;
  const CompanyName = rows[0].CompanyName;
  const IndustryCode = rows[0].IndustryCode;
  const LossRatio = rows[0].LossRatio;
  const Claims5Years = rows[0].Claims5Years;
  const NumberOfPeople = rows[0].NumberOfPeople;
  const ManLabouryears = rows[0].ManLabouryears;

  const UnderwritingAdjustment = rows[0].UnderwritingAdjustment;
  const ProductCommission = rows[0].ProductCommission;
  const SalesDiscount = rows[0].SalesDiscount;
  const SalesComission = rows[0].SalesComission;
  const AnnualPremium = numberToCurrency(rows[0].AnnualPremium, true, rows[0].Currency);
  const PolicyPremium = numberToCurrency(rows[0].PolicyPremium, true, rows[0].Currency);
  const IsConstrained = rows[0].IsConstrained;
  const NumerOfDaysWillExpire = rows[0].NumerOfDaysWillExpire;

  const PaymentType = rows[0].PaymentType;
  const PaymentFrequency = rows[0].PaymentFrequency;

  logInfoMessage("Opening first policy!");
  let temp = await policyListInsurance.openFirstPolicy();
  if (!temp) {
    logWarningMessage("Can't open policy in Policy list!");
    fail(scenarioName + ": is failed!" + subErrorMessages);
  }

  logInfoMessage("Click adjust policy!");
  temp = await creatingQuoteInsurance.clickAdjustPolicy();
  if (!temp) {
    logWarningMessage("Can't Adjust this policy!");
    fail(scenarioName + ": is failed!" + subErrorMessages);
  }

  dataTestcase.push(new ValidateField("", 0, true, [], []));

  logInfoMessage("Input data to Create quote form!");
  temp = await globalQuoteInsurance.inputCreateQuoteEffectiveDate(EffectiveDate);
  if (!temp) {
    fail(scenarioName + ": Test case is failed!" + subErrorMessages);
  }

  await inputWorkerCompensation(
    OrganizationNumber,
    CompanyName,
    IndustryCode,
    LossRatio,
    Claims5Years,
    NumberOfPeople,
    ManLabouryears
  )

  temp = await creatingQuoteInsurance.assertEffectiveDateInCreatingQuoteForm(EffectiveDate);
  if (!temp) {
    fail(scenarioName + ": Test case is failed!" + subErrorMessages);
  }

  temp = await creatingQuoteInsurance.inputDataToCreatingQuote(
    UnderwritingAdjustment,
    ProductCommission,
    SalesDiscount,
    "",
    IsConstrained,
    StartDate,
    EndDate,
    NumerOfDaysWillExpire,
    AnnualPremium,
    PolicyPremium
  );
  if (!temp) {
    fail(scenarioName + ": Test case is failed!" + subErrorMessages);
  }

  await creatingQuoteListInsurance.clickPurchase();

  // temp = await policyInteract.inputDataIntoSelectPaymentOptionForm(PaymentType, PaymentFrequency);
  //   if(!temp){
  //     logWarningMessage("Can not select PAYMENT OPTION!");
  //     fail(scenarioName + ": Test case is failed!" + subErrorMessages);
  //   }

  temp = await policyConfirmationInsurance.checkPurchaseSuccessful();
  if (!temp) {
    logWarningMessage(`There are no successful message: "POLICIES HAVE BEEN CREATED SUCCESSFULLY!."`);
    fail(scenarioName + ": Test case is failed!" + subErrorMessages);
  }

  dataTestcase[0].nameField = (dataTestcase[0].nameField.split("/"))[0];
});