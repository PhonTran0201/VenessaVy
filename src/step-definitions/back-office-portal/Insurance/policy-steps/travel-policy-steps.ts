import { Before, When } from "@cucumber/cucumber";
import { fail } from "assert";
import { GlobalBrowserWindowHandle } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalBrowserWindowHandle";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { GlobalPolicyInsurance } from "../../../../page-objects/back-office-portal/insurance/policy/policy-layout/GlobalPolicyInsurance";
import { PolicyConfirmationInsurance } from "../../../../page-objects/back-office-portal/insurance/policy/policy-layout/PolicyConfirmationInsurance";
import { TerminatePolicyFormInsurance } from "../../../../page-objects/back-office-portal/insurance/policy/policy-layout/TerminatePolicyFormInsurance";
import { PolicyListInsurance } from "../../../../page-objects/back-office-portal/insurance/policy/policy-list/PolicyListInsurance";
import { CreatingQuoteInsurance } from "../../../../page-objects/back-office-portal/insurance/quote/quote-layout/CreatingQuoteInsurance";
import { CreatingQuoteListInsurance } from "../../../../page-objects/back-office-portal/insurance/quote/quote-layout/CreatingQuoteListInsurance";
import { GlobalQuoteInsurance } from "../../../../page-objects/back-office-portal/insurance/quote/quote-layout/GlobalQuoteInsurance";
import { PageFactory } from "../../../../page-objects/PageFactory";
import { ValidateField } from "../../../../shared/classes";
import { addDate, addYear, convertPathFileDataToDataRegression, getDate, logFailTestcase, logInfoMessage, logWarningMessage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { numberToCurrency } from "../../../../shared/tenant-setting/tenant-setting";
import { dataTestcase, dataTestExecution, scenarioName, scenarioTags, subErrorMessages } from "../../../../shared/variables";
import { getValueDataOfDataTestExecution, pushObjectToDataArrayWithUniqueKey } from "../../../../storage-data/functions/data-test-execution";
import { inputTravelQuote } from "../quote-steps/travel-quote-steps";


const loader = require("csv-load-sync");

let globalQuoteInsurance: GlobalQuoteInsurance;
let globalPolicyInsurance: GlobalPolicyInsurance;
let globalPageObject: GlobalPageObject;
let globalBrowserWindowHandle: GlobalBrowserWindowHandle;
let creatingQuoteInsurance: CreatingQuoteInsurance;
let policyListInsurance: PolicyListInsurance;
let creatingQuoteListInsurance: CreatingQuoteListInsurance;
let paymentOptionFormInsurance;
let policyConfirmationInsurance: PolicyConfirmationInsurance;
let terminatePolicyFormInsurance: TerminatePolicyFormInsurance;

Before(async function () {
  const context: ICommonContext = this.context;
  globalQuoteInsurance = new GlobalQuoteInsurance(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
  globalBrowserWindowHandle = new GlobalBrowserWindowHandle(context.driverService);
  globalPolicyInsurance = new GlobalPolicyInsurance(context.driverService);
  creatingQuoteInsurance = new CreatingQuoteInsurance(context.driverService);
  policyListInsurance = new PolicyListInsurance(context.driverService);
  creatingQuoteListInsurance = new CreatingQuoteListInsurance(context.driverService);
  policyConfirmationInsurance = new PolicyConfirmationInsurance(context.driverService);
  terminatePolicyFormInsurance = new TerminatePolicyFormInsurance(context.driverService);
  paymentOptionFormInsurance = PageFactory.getInstance().createPaymentOptionForm();
});

When("User selectes an existing policy and renew policy from csv file {string}", async (filename) => {
  let rows = loader(convertPathFileDataToDataRegression(filename));

  //const StartDate = rows[0].StartDate;
  let EndDate = rows[0].EndDate;
  // const StartDateMinusToday = rows[0].StartDateMinusToday;
  const EndDateMinusStartDate = rows[0].EndDateMinusStartDate;
  const Name = rows[0].Name;
  const Age = rows[0].Age;
  const NumberOfTraveller = rows[0].NumberOfTraveller;
  const LuggageExcess = rows[0].LuggageExcess;
  const AdditionalCover = rows[0].AdditionalCover;

  const UnderwritingAdjustment = rows[0].UnderwritingAdjustment;
  const ProductCommission = rows[0].ProductCommission;
  const SalesDiscount = rows[0].SalesDiscount;
  const IsConstrained = rows[0].IsConstrained;
  const NumerOfDaysWillExpire = rows[0].NumerOfDaysWillExpire;
  const AnnualPremium = numberToCurrency(rows[0].AnnualPremium, true, rows[0].Currency);
  const PolicyPremium = numberToCurrency(rows[0].PolicyPremium, true, rows[0].Currency);

  const PaymentType = rows[0].PaymentType;
  const PaymentFrequency = rows[0].PaymentFrequency;

  logInfoMessage("Open first policy");
  let temp = await policyListInsurance.openFirstPolicy();
  logFailTestcase(temp, "Open first policy failed!");

  // Wait for 5 minute when button Renew exist
  // logWarningMessage("Wait 5 minutes...");
  // await globalPageObject.waitForSeconds(300000);

  logInfoMessage("Clicks on policy tab");
  temp = await globalPageObject.navigateToSubPolicies();
  await globalBrowserWindowHandle.refreshPage();

  await globalPageObject.waitForProgressBarLoaded_v2();
  temp = await globalPageObject.navigateToSubPolicies();
  logFailTestcase(temp, "Naviates to Policy list failed!");
  await globalPageObject.waitForProgressBarLoaded_v2();


  logInfoMessage("Open first policy again");
  temp = await policyListInsurance.openFirstPolicy();
  logFailTestcase(temp, "Open first policy failed!");
  await globalPageObject.waitForProgressBarLoaded_v2();


  logInfoMessage("Click renew policy!");
  temp = await creatingQuoteInsurance.clickRenewPolicy();
  if (!temp) {
    logWarningMessage("Can't Renew this policy!");
    fail(scenarioName + ": is failed!" + subErrorMessages);
  }
  logInfoMessage("Confirm renew policy");

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
  if (EndDate) {
    pushObjectToDataArrayWithUniqueKey("SelectedPolicyTermRenew", StartDate + " - " + EndDate);
    temp = await globalQuoteInsurance.inputEndDate(EndDate);
    logFailTestcase(temp, "inputEndDate failed");
  }
  await inputTravelQuote(
    Name,
    Age,
    NumberOfTraveller,
    LuggageExcess,
    AdditionalCover
  );

  temp = await globalQuoteInsurance.clickNext();
  logFailTestcase(temp, "clickNext failed");
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

When("User selectes an existing policy and adjust policy from csv file {string}", async (filename) => {
  let rows = loader(convertPathFileDataToDataRegression(filename));

  const SelectedPolicyTerm = rows[0].SelectedPolicyTerm || getValueDataOfDataTestExecution("PolicyTerm");
  let EffectiveDate = rows[0].EffectiveDate;
  const EffectiveDateMinusToday = rows[0].EffectiveDateMinusToday;

  if(EffectiveDateMinusToday){
    EffectiveDate = getDate(EffectiveDateMinusToday);
  }

  let StartDate = rows[0].StartDate || getValueDataOfDataTestExecution("StartDate") || SelectedPolicyTerm.substring(0, 10);
  let EndDate = rows[0].EndDate || getValueDataOfDataTestExecution("EndDate") || SelectedPolicyTerm.substring(12);


  const Name = rows[0].Name;
  const Age = rows[0].Age;
  const NumberOfTraveller = rows[0].NumberOfTraveller;
  const LuggageExcess = rows[0].LuggageExcess;
  const AdditionalCover = rows[0].AdditionalCover;

  const UnderwritingAdjustment = rows[0].UnderwritingAdjustment;
  const ProductCommission = rows[0].ProductCommission;
  const SalesDiscount = rows[0].SalesDiscount;
  const IsConstrained = rows[0].IsConstrained;
  const NumerOfDaysWillExpire = rows[0].NumerOfDaysWillExpire;
  const AnnualPremium = numberToCurrency(rows[0].AnnualPremium, true, rows[0].Currency);
  const PolicyPremium = numberToCurrency(rows[0].PolicyPremium, true, rows[0].Currency);

  const PaymentType = rows[0].PaymentType;
  const PaymentFrequency = rows[0].PaymentFrequency;
  const quoteRef = await policyListInsurance.getValueReferenceOnPolicyListByRow();
  dataTestcase.push(new ValidateField("QuoteReference", -1, true, [quoteRef], []));

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

  await inputTravelQuote(
    Name,
    Age,
    NumberOfTraveller,
    LuggageExcess,
    AdditionalCover
  );
  temp = await globalQuoteInsurance.clickNext();
  logFailTestcase(temp, "clickNext failed");
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
 logFailTestcase(temp, "Input data into Creating Quote failed!");

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

When("User selectes an existing policy and terminate policy from csv file {string}", async (filename) => {
  let rows = loader(convertPathFileDataToDataRegression(filename));

  let EffectiveFrom = rows[0].EffectiveFrom;
  const EffectiveFromMinusToday = rows[0].EffectiveFromMinusToday;
  const Reason = rows[0].Reason;
  const PolicyPremium = rows[0].PolicyPremium;
  const NewPremium = rows[0].NewPremium;
  let StartDate = rows[0].StartDate;
  let EndDate = rows[0].EndDate;
  const StartDateMinusToday = rows[0].StartDateMinusToday;
  const EndDateMinusStartDate = rows[0].EndDateMinusStartDate;
  const Currency = rows[0].Currency;

  if (StartDateMinusToday && EndDateMinusStartDate) {
    StartDate = getDate(StartDateMinusToday);
    if (EndDateMinusStartDate === '1Year') {
      EndDate = addDate(addYear(StartDate, 1),-1);
    }
    else {
      EndDate = addDate(StartDate, EndDateMinusStartDate);
    }
  }
  if (EffectiveFromMinusToday) {
    EffectiveFrom = getDate(EffectiveFromMinusToday);
  }

  const quoteRef = await policyListInsurance.getValueReferenceOnPolicyListByRow();
  dataTestcase.push(new ValidateField("QuoteReference", -1, true, [quoteRef], []));

  logInfoMessage("Open first policy");
  let temp = await policyListInsurance.openFirstPolicy();
  logFailTestcase(temp, "Open first policy failed!");

  temp = await creatingQuoteInsurance.openTerminatePolicyForm()
  logFailTestcase(temp, "Open terminate policy failed!");

  temp = await terminatePolicyFormInsurance.validateCurrentPeriodTerminatePolicyForm(StartDate + " - " + EndDate);
  logFailTestcase(temp, "Incorrect Current Period!");

  temp = await terminatePolicyFormInsurance.validateCurrentPremiumTerminatePolicyForm(numberToCurrency(PolicyPremium, true, Currency));
  logFailTestcase(temp, "Incorrect Current Premium!");

  temp = await terminatePolicyFormInsurance.inputDataToTerminatePolicyForm(EffectiveFrom, Reason);
  logFailTestcase(temp, "Input data to terminate form failed!");

  await globalPageObject.waitForProgressBarLoaded_v2(500);
  temp = await terminatePolicyFormInsurance.validateNewPremiumTerminatePolicyForm(numberToCurrency(NewPremium, true, Currency));
  logFailTestcase(temp, "Incorrect NewPremium!");

  temp = await terminatePolicyFormInsurance.clickTerminatePolicyAtTerminatePolicyForm();
  logFailTestcase(temp, "Click Terminate Policy failed!");
});