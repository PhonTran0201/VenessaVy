import { Before, Given, Then, When } from "@cucumber/cucumber";
import { fail } from "assert";
import fs from 'fs';
import { DataRepo } from "../../../../core/modals/DataRepo";
import { AccountTabPolicyConfirmationLadingPage } from "../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-policy/AccountTabPolicyConfirmationLadingPage";
import { AccountTabPolicyDetails } from "../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-policy/AccountTabPolicyDetails";
import { AccountTabQuoteCreatingPaymentQuote } from "../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-quote/AccountTabQuoteCreatingPaymentQuote";
import { AppEntityWidgets } from "../../../../page-objects/back-office-portal/general/app-entity-widgets/AppEntityWidgets";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { PolicyTimeLinePopover } from "../../../../page-objects/back-office-portal/general/policy/policy-layouts/PolicyTimeLinePopover";
import { SelectACurrencyForm } from "../../../../page-objects/back-office-portal/general/policy/policy-layouts/SelectACurrencyForm/SelectACurrencyForm";
import { QuoteCreatingPaymentQuote } from "../../../../page-objects/back-office-portal/general/quote/quote-layouts/QuoteCreatingPaymentQuote";
import { GlobalPolicyInsurance } from "../../../../page-objects/back-office-portal/insurance/policy/policy-layout/GlobalPolicyInsurance";
import { PolicyConfirmationInsurance } from "../../../../page-objects/back-office-portal/insurance/policy/policy-layout/PolicyConfirmationInsurance";
import { TerminatePolicyFormInsurance } from "../../../../page-objects/back-office-portal/insurance/policy/policy-layout/TerminatePolicyFormInsurance";
import { PolicyListInsurance } from "../../../../page-objects/back-office-portal/insurance/policy/policy-list/PolicyListInsurance";
import { CreatingQuoteInsurance } from "../../../../page-objects/back-office-portal/insurance/quote/quote-layout/CreatingQuoteInsurance";
import { CreatingQuoteListInsurance } from "../../../../page-objects/back-office-portal/insurance/quote/quote-layout/CreatingQuoteListInsurance";
import { GlobalQuoteInsurance } from "../../../../page-objects/back-office-portal/insurance/quote/quote-layout/GlobalQuoteInsurance";
import { QuoteListInsurance } from "../../../../page-objects/back-office-portal/insurance/quote/quote-list/QuoteListInsurance";
import { PageFactory } from "../../../../page-objects/PageFactory";
import { ValidateField } from "../../../../shared/classes";
import { addDate, addYear, convertPathFileDataToDataRegression, getCurrentDateTime, getDate, logFailTestcase, logWarningMessage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { currencyToNumber, getDefaultCurrency, numberToCurrency } from "../../../../shared/tenant-setting/tenant-setting";
import { dataTestcase, scenarioName, scenarioTags, subErrorMessages } from "../../../../shared/variables";
import { getDataTestCaseObjectByNameField } from "../../../../storage-data/functions/data-test-case";
import { getValueDataOfDataTestExecution, pushObjectToDataArrayWithUniqueKey } from "../../../../storage-data/functions/data-test-execution";

const loader = require("csv-load-sync");

let globalQuoteInsurance: GlobalQuoteInsurance;
let globalPolicyInsurance: GlobalPolicyInsurance;
let globalPageObject: GlobalPageObject;
let creatingQuoteListInsurance: CreatingQuoteListInsurance;
let paymentOptionFormInsurance;
let policyConfirmationInsurance: PolicyConfirmationInsurance;
let policyListInsurance: PolicyListInsurance;
let creatingQuoteInsurance: CreatingQuoteInsurance;
let terminatePolicyFormInsurance: TerminatePolicyFormInsurance;
let quoteListInsurance: QuoteListInsurance;
let accountTabPolicyDetails: AccountTabPolicyDetails;
let accountTabQuoteCreatingPaymentQuote: AccountTabQuoteCreatingPaymentQuote;
let accountTabPolicyConfirmationLadingPage: AccountTabPolicyConfirmationLadingPage;
let policyTimeLinePopover: PolicyTimeLinePopover;
let selectACurrencyForm: SelectACurrencyForm;
let appEntityWidgets: AppEntityWidgets;
let quoteCreatingPaymentQuote: QuoteCreatingPaymentQuote

Before(async function () {
  const context: ICommonContext = this.context;
  globalQuoteInsurance = new GlobalQuoteInsurance(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
  globalPolicyInsurance = new GlobalPolicyInsurance(context.driverService);
  creatingQuoteListInsurance = new CreatingQuoteListInsurance(context.driverService);
  policyListInsurance = new PolicyListInsurance(context.driverService);
  creatingQuoteInsurance = new CreatingQuoteInsurance(context.driverService);
  terminatePolicyFormInsurance = new TerminatePolicyFormInsurance(context.driverService);
  quoteListInsurance = new QuoteListInsurance(context.driverService);
  accountTabPolicyDetails = new AccountTabPolicyDetails(context.driverService);
  policyConfirmationInsurance = new PolicyConfirmationInsurance(context.driverService);
  accountTabQuoteCreatingPaymentQuote = new AccountTabQuoteCreatingPaymentQuote(context.driverService);
  accountTabPolicyConfirmationLadingPage = new AccountTabPolicyConfirmationLadingPage(context.driverService);
  policyTimeLinePopover = new PolicyTimeLinePopover(context.driverService);
  selectACurrencyForm = new SelectACurrencyForm(context.driverService);
  appEntityWidgets = new AppEntityWidgets(context.driverService);
  quoteCreatingPaymentQuote = new QuoteCreatingPaymentQuote(context.driverService);
  paymentOptionFormInsurance = PageFactory.getInstance().createPaymentOptionForm();
});

Given("User is on Policy list", async function () {
  let temp = await globalPageObject.navigateToSubPolicies();
  logFailTestcase(temp, "Navigates to policy tab failed!");
  await globalPageObject.waitForProgressBarLoaded_v2();
});

Given("Users opens Terminate policy form", async () => {
  logFailTestcase(await creatingQuoteInsurance.openTerminatePolicyForm(), "Open Terminate policy form failed!");
});


When("User purchases quote", async function () {
  await creatingQuoteListInsurance.clickPurchase();
});

When("User purchases quote at Creating Quote page", async () => {
  let count = await accountTabQuoteCreatingPaymentQuote.countTotalQuoteRecord_QuoteReadyPurchase();
  logFailTestcase(count > 0, 'Do not have any record on Quote ready for purchase section');

  console.log('Total Quote Record: ' + count);

  pushObjectToDataArrayWithUniqueKey("TotalQuotePurchase", count.toString());
  for (let i = 1; i <= count; i++) {
    let QuoteRef = await accountTabQuoteCreatingPaymentQuote.getQuoteRefValue_QuoteReadyPurchase(i);
    let Product = await accountTabQuoteCreatingPaymentQuote.getProductValue_QuoteReadyPurchase(i);
    let PolicyTerm = await accountTabQuoteCreatingPaymentQuote.getPolicyTermValue_QuoteReadyPurchase(i);
    let LastModifiedDate = await accountTabQuoteCreatingPaymentQuote.getLastModifiedDateValue_QuoteReadyPurchase(i);
    let Premium = await accountTabQuoteCreatingPaymentQuote.getPremiumValue_QuoteReadyPurchase(i);

    pushObjectToDataArrayWithUniqueKey(`QRFP_QuoteRef${i}`, QuoteRef);
    pushObjectToDataArrayWithUniqueKey(`QRFP_Product${i}`, Product);
    pushObjectToDataArrayWithUniqueKey(`QRFP_PolicyTerm${i}`, PolicyTerm);
    pushObjectToDataArrayWithUniqueKey(`QRFP_LastModifiedDate${i}`, LastModifiedDate);
    pushObjectToDataArrayWithUniqueKey(`QRFP_Premium${i}`, Premium);
  }
  let temp = await creatingQuoteListInsurance.clickPurchase();
  logFailTestcase(temp, 'Click purchase button failed!');
});

When("User purchases quote at Creating Quote Anonymous page", async () => {
  await globalPageObject.waitForProgressBarLoaded_v2();
  await globalPageObject.waitForProgressBarLoaded_v2();
  await globalPageObject.waitForProgressBarLoaded_v2();

  let count = await quoteCreatingPaymentQuote.countTotalQuoteRecord_QuoteReadyPurchase();
  logFailTestcase(count > 0, 'Do not have any record on Quote ready for purchase section');

  console.log('Total Quote Record: ' + count);

  pushObjectToDataArrayWithUniqueKey("TotalQuotePurchase", count.toString());
  for (let i = 1; i <= count; i++) {
    let QuoteRef = await quoteCreatingPaymentQuote.getQuoteRefValue_QuoteReadyPurchase(i);
    let Product = await quoteCreatingPaymentQuote.getProductValue_QuoteReadyPurchase(i);
    let PolicyTerm = await quoteCreatingPaymentQuote.getPolicyTermValue_QuoteReadyPurchase(i);
    let LastModifiedDate = await quoteCreatingPaymentQuote.getLastModifiedDateValue_QuoteReadyPurchase(i);
    let Premium = await quoteCreatingPaymentQuote.getPremiumValue_QuoteReadyPurchase(i);

    pushObjectToDataArrayWithUniqueKey(`QRFP_QuoteRef${i}`, QuoteRef);
    pushObjectToDataArrayWithUniqueKey(`QRFP_Product${i}`, Product);
    pushObjectToDataArrayWithUniqueKey(`QRFP_PolicyTerm${i}`, PolicyTerm);
    pushObjectToDataArrayWithUniqueKey(`QRFP_LastModifiedDate${i}`, LastModifiedDate);
    pushObjectToDataArrayWithUniqueKey(`QRFP_Premium${i}`, Premium);
  }
  let temp = await creatingQuoteListInsurance.clickPurchase();
  logFailTestcase(temp, 'Click purchase button failed!');
});

//used for products with only payment option and no payment frequency
When("User selects Payment Option and verifies the policy created successfully {string}", async (filename) => {
  const data = (await DataRepo.getInstance().loadData(filename))[0];
  try {
    await paymentOptionFormInsurance.setNgSelectPaymentOption(data.PaymentOption)
    await paymentOptionFormInsurance.clickOKSelectPaymentOption()
    await policyConfirmationInsurance.showPoliciesCreatedSuccess();
  } catch (error) {
    logFailTestcase(false, (error as Error).message + "\r\n" + (error as Error).stack);
  }
})

When("User selects Payment Option {string}", async (filename) => {
  let PaymentType = "";
  let PaymentFrequency = "";
  if (filename.includes(".csv") && fs.existsSync(convertPathFileDataToDataRegression(filename))) {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    PaymentType = rows[0].PaymentType;
    PaymentFrequency = rows[0].PaymentFrequency;
  } else {
    const data = await DataRepo.getInstance().loadData(filename);
    PaymentType = data.PaymentType;
    PaymentFrequency = data.PaymentFrequency;
  }

  dataTestcase.push(new ValidateField("PaymentFrequency", 1, true, [PaymentFrequency], []));
  let temp = await paymentOptionFormInsurance.inputDataIntoSelectPaymentOptionForm(PaymentType, PaymentFrequency);
  logFailTestcase(temp, `Input Payment Option failed!`);

  temp = await policyConfirmationInsurance.showPoliciesCreatedSuccess();
  logFailTestcase(temp, `Show policy created success failed!`);

});

When("User selectes an existing quote and create policy from csv file {string}", async (filename) => {
  let rows = loader(convertPathFileDataToDataRegression(filename));

  const SelectedDescription = rows[0].SelectedDescription;
  const SelectedProductName = rows[0].SelectedProductName;
  const SelectedStatus = rows[0].SelectedStatus;
  const UnderwritingAdjustment = rows[0].UnderwritingAdjustment;
  const ProductCommission = rows[0].ProductCommission;
  const SalesDiscount = rows[0].SalesDiscount;
  const SalesCommission = rows[0].SalesCommission;
  const PaymentType = rows[0].PaymentType;
  const PaymentFrequency = rows[0].PaymentFrequency;
  const StartDateMinusToday = rows[0].StartDateMinusToday;
  const EndDateMinusStartDate = rows[0].EndDateMinusStartDate;
  let StartDate = rows[0].StartDate;
  let EndDate = rows[0].EndDate;

  if (StartDateMinusToday && EndDateMinusStartDate) {
    StartDate = getDate(StartDateMinusToday);
    EndDate = addDate(StartDate, EndDateMinusStartDate);
  }
  let SelectedPolicyTerm = (StartDate && EndDate) ? StartDate + " - " + EndDate : rows[0].SelectedPolicyTerm;
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
    SalesCommission,
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
    fail(scenarioName + ": Test case is failed!" + subErrorMessages);
  }

});

When("User opens the first policy on Policy list",async () => {
  let temp = await policyListInsurance.openFirstPolicy();
  logFailTestcase(temp, `Open first policy failed!`);
  await globalPageObject.waitForProgressBarLoaded_v2();
});

When("User selects a quote from the precondition steps {string}", async function (filename) {
  let rows = loader(convertPathFileDataToDataRegression(filename));
  GlobalQuoteInsurance.status = rows[0].ExpectedStatus;
  await globalQuoteInsurance.clickFirstQuote();
});

Then("System shows new policy in the Policy list {string}", async function (filename) {
  let temp = await globalPageObject.navigateToSubPolicies();
  logFailTestcase(temp, "Navigates to policy tab failed!");
  await globalPageObject.waitForProgressBarLoaded_v2();
  let rows = loader(convertPathFileDataToDataRegression(filename));
  for (let i = 0; i < rows.length; i++) {
    GlobalQuoteInsurance.description = rows[i].Name;
    GlobalQuoteInsurance.product = rows[i].Product;
    let StartDate = rows[i].StartDate;
    let EndDate = rows[i].EndDate;
    const StartDateMinusToday = rows[i].StartDateMinusToday;
    const EndDateMinusStartDate = rows[i].EndDateMinusStartDate;
    if (StartDateMinusToday && EndDateMinusStartDate) {
      StartDate = getDate(StartDateMinusToday);
      if (EndDateMinusStartDate === '1Year') {
        EndDate = addDate(addYear(StartDate, 1),-1);
      }
      else {
        EndDate = addDate(StartDate, EndDateMinusStartDate);
      }
    }
    GlobalQuoteInsurance.policyTerm = StartDate + " - " + EndDate;
    GlobalQuoteInsurance.premium = numberToCurrency(rows[i].ExpectedPremium, true, rows[i].Currency);
    GlobalQuoteInsurance.status = rows[i].StatusPolicy || "Created";
    await policyListInsurance.assertPolicy(getValueDataOfDataTestExecution("QuoteReference"), GlobalQuoteInsurance.description, GlobalQuoteInsurance.product, GlobalQuoteInsurance.policyTerm, GlobalQuoteInsurance.premium, GlobalQuoteInsurance.status, i + 1);
    temp = await policyListInsurance.validateValueDateModified(getCurrentDateTime().substring(0,10));
  }
});

Then("System shows new policy in Policy list {string}", async (filename) => {
  let rows = loader(convertPathFileDataToDataRegression(filename));
  const quoteRef = getDataTestCaseObjectByNameField("QuoteReference")?.message[0] || "";
  let PolicyPremium = numberToCurrency(rows[0].PolicyPremium, true, rows[0].Currency);
  let SelectedDescription = rows[0].SelectedDescription;
  if (!SelectedDescription) {
    SelectedDescription = rows[0].Name;
    if (!SelectedDescription) {
      SelectedDescription = GlobalQuoteInsurance.description;
      if (!SelectedDescription) {
        SelectedDescription = "N/A";
      }
    }
  }

  let SelectedProductName = rows[0].SelectedProductName;
  if (!SelectedProductName) {
    SelectedProductName = GlobalQuoteInsurance.product;
    if (!SelectedProductName) {
      SelectedProductName = "N/A";
    }
  }

  const StartDateMinusToday = rows[0].StartDateMinusToday;
  const EndDateMinusStartDate = rows[0].EndDateMinusStartDate;
  let StartDate = rows[0].StartDate || getValueDataOfDataTestExecution("StartDate");
  let EndDate = rows[0].EndDate || getValueDataOfDataTestExecution("EndDate");
  if (StartDateMinusToday && EndDateMinusStartDate) {
    StartDate = getDate(StartDateMinusToday);
    EndDate = addDate(StartDate, EndDateMinusStartDate);
  }
  let RenewPolicy = rows[0].RenewPolicy;
  let SelectedPolicyTerm = "";
  if (!RenewPolicy) {
    if (rows[0].NewPremium) { //Terminate policy
      let EffectiveFrom = rows[0].EffectiveFrom;
      const EffectiveFromMinusToday = rows[0].EffectiveFromMinusToday;
      if(EffectiveFromMinusToday){
        EffectiveFrom = getDate(EffectiveFromMinusToday);
      }
      SelectedPolicyTerm = StartDate + " - " + addDate(EffectiveFrom, -1);
      PolicyPremium = numberToCurrency(rows[0].NewPremium, true, rows[0].Currency)
    } else { //case default
      SelectedPolicyTerm = StartDate + " - " + EndDate;
      if (!SelectedPolicyTerm) {
        SelectedPolicyTerm = GlobalQuoteInsurance.policyTerm;
        if (!SelectedPolicyTerm) {
          SelectedPolicyTerm = "N/A";
        }
      }
    }
  }
  else {//In case of Renew policy
    SelectedPolicyTerm = getValueDataOfDataTestExecution("SelectedPolicyTermRenew");
  }

  let Status = rows[0].Status;
  if (!Status) {
    Status = GlobalQuoteInsurance.status;
    if (!Status) {
      Status = "N/A";
    }
  }



  let temp = await globalPageObject.navigateToSubPolicies();
  logFailTestcase(temp, "Navigates to policy tab failed!");
  await globalPageObject.waitForProgressBarLoaded_v2();

  await policyListInsurance.assertPolicy(
    quoteRef,
    SelectedDescription,
    SelectedProductName,
    SelectedPolicyTerm,
    PolicyPremium,
    Status
  );
});

Then("System shows new policy in policy detail {string}", async (filename) => {
  let rows = loader(convertPathFileDataToDataRegression(filename));

  let PolicyPremium = numberToCurrency(rows[0].PolicyPremium, true, rows[0].Currency);
  let SelectedProductName = rows[0].SelectedProductName;
  if (!SelectedProductName) {
    SelectedProductName = GlobalQuoteInsurance.product;
    if (!SelectedProductName) {
      SelectedProductName = "N/A";
    }
  }
  const StartDateMinusToday = rows[0].StartDateMinusToday;
  const EndDateMinusStartDate = rows[0].EndDateMinusStartDate;
  let StartDate = rows[0].StartDate || getValueDataOfDataTestExecution("StartDate");
  let EndDate = rows[0].EndDate || getValueDataOfDataTestExecution("EndDate");
  if (StartDateMinusToday && EndDateMinusStartDate) {
    StartDate = getDate(StartDateMinusToday);
    if (EndDateMinusStartDate === '1Year') {
      EndDate = addDate(addYear(StartDate, 1),-1);
    }
    else {
      EndDate = addDate(StartDate, EndDateMinusStartDate);
    }
  }

  let RenewPolicy = rows[0].RenewPolicy;
  let SelectedPolicyTerm = "";
  if (!RenewPolicy) {
    SelectedPolicyTerm = StartDate + " - " + EndDate;
    if (rows[0].NewPremium) { //Terminate policy
      SelectedPolicyTerm = StartDate + " - " + addDate(rows[0].EffectiveFrom, -1);
      PolicyPremium = numberToCurrency(rows[0].NewPremium, true, rows[0].Currency);
    } else { //case default
      SelectedPolicyTerm = StartDate + " - " + EndDate;
      if (!SelectedPolicyTerm) {
        SelectedPolicyTerm = GlobalQuoteInsurance.policyTerm;
        if (!SelectedPolicyTerm) {
          SelectedPolicyTerm = "N/A";
        }
      }
    }
  }
  else {//In case of Renew policy
    SelectedPolicyTerm = getValueDataOfDataTestExecution("SelectedPolicyTermRenew");
  }

  let Status = rows[0].Status;
  if (!Status) {
    Status = GlobalQuoteInsurance.status;
    if (!Status) {
      Status = "N/A";
    }
  }

  const AnnualPremium = numberToCurrency(rows[0].AnnualPremium, true, rows[0].Currency);

  let temp = await policyListInsurance.openFirstPolicy();
  // if (!temp) {
  //   logWarningMessage(`Open first policy at Policy list fail!`);
  //   fail(scenarioName + ": Test case is failed!" + subErrorMessages);
  // }
  let policyRef = getDataTestCaseObjectByNameField("QuoteReference")?.message[0] || "";
  temp = await accountTabPolicyDetails.checkPolicyDetailIsOpening(policyRef);
  logFailTestcase(temp, `Incorrect Policy Ref`);

  temp = await accountTabPolicyDetails.validateProductPolicyInfo(SelectedProductName);
  logFailTestcase(temp, `Incorrect Product Name`);

  temp = await accountTabPolicyDetails.validatePeriodPolicyInfo(SelectedPolicyTerm);
  logFailTestcase(temp, `Incorrect Period`);

  temp = await accountTabPolicyDetails.validatePolicyPremiumPolicyInfo(PolicyPremium);
  logFailTestcase(temp, `Incorrect Policy Premium`);

  temp = await accountTabPolicyDetails.validateAnnualPremiumPolicyInfo(AnnualPremium);
  logFailTestcase(temp, `Incorrect Annual Premium`);

  temp = await accountTabPolicyDetails.validateStatusPolicyInfo(Status);
  logFailTestcase(temp, `Incorrect Status`);
});

When("User selects the first policy from the precondition steps with wait for status {string}", async function (status) {
  let temp = await globalPageObject.navigateToSubPolicies();
  logFailTestcase(temp, "Navigates to policy tab failed!");

  await policyListInsurance.waitStatusForFirstPolicy(status);
  temp = await policyListInsurance.openFirstPolicy();
  logFailTestcase(temp, 'open the first policy failed!');
});


When("User selects the first policy from the precondition steps", async function () {
  let temp = await globalPageObject.navigateToSubPolicies();
  logFailTestcase(temp, "Navigates to policy tab failed!");

  temp = await policyListInsurance.openFirstPolicy();
  logFailTestcase(temp, 'open the first policy failed!');
});


Then("User verifies policy information at Policy Created page", async () => {
  let policyRecord = parseInt(getValueDataOfDataTestExecution("TotalQuotePurchase"));
  let temp = true;

  for (let i = 1; i <= policyRecord; i++) {
    let PolicyRef = getValueDataOfDataTestExecution(`QRFP_QuoteRef${i}`);
    let Product = getValueDataOfDataTestExecution(`QRFP_Product${i}`);
    let PolicyTerm = getValueDataOfDataTestExecution(`QRFP_PolicyTerm${i}`);

    temp = await accountTabPolicyConfirmationLadingPage.validateReferenceOnPolicyConfirmationPageByRow(PolicyRef, i);
    logFailTestcase(temp, 'Incorrect PolicyRef on Policy Created page!');

    temp = await accountTabPolicyConfirmationLadingPage.validateProductOnPolicyConfirmationPageByRow(Product, i);
    logFailTestcase(temp, 'Incorrect Product on Policy Created page!');

    temp = await accountTabPolicyConfirmationLadingPage.validatePolicyTermOnPolicyConfirmationPageByRow(PolicyTerm, i);
    logFailTestcase(temp, 'Incorrect PolicyTerm on Policy Created page!');
  }

  temp = await accountTabPolicyConfirmationLadingPage.openPolicyDetailFromPolicyConfirmationPageByRow(1);
  logFailTestcase(temp, 'open Policy Detail From Policy Confirmation Page failed!');
});

Then("User verifies the status of policy after termination {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));

  const Status = rows[0].Status;
  await globalPageObject.waitForProgressBarLoaded_v2();
  await globalPageObject.waitForProgressBarLoaded_v2();
  let temp = await accountTabPolicyDetails.validateStatusPolicyInfo(Status);
  logFailTestcase(temp, `Incorrect status policy detail!`);
});


When("User presses the Generate summary button on Policy list", async () => {
  await globalPageObject.waitForSeconds(7500);
  await globalPageObject.refresh();
  await globalPageObject.waitPageLoaded();
  await globalPageObject.waitForProgressBarLoaded_v2();
  let temp = await policyListInsurance.pressGenerateSummaryDocumentButton();
  logFailTestcase(temp, 'Pressing the Generate summary button failed!');
});
When("User ticks to choose the currency of policies", async () => {
  let temp = await selectACurrencyForm.ticktoSelectACurrency();
  logFailTestcase(temp, 'Ticking the currency of policies failed!');

});
Then("System generates the policy summary document on Policy list", async () => {
  await globalPageObject.waitForProgressBarLoaded_v2();

  let temp = await policyListInsurance.validateGenerateSummaryDocumentDownloadSuccessfully();
  logFailTestcase(temp, 'The Generate summary document download failed!');
});

Then("User verifies the period of policy after temination {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));

  const StartDate = rows[0].StartDate;
  const EffectiveFrom = rows[0].EffectiveFrom;

  const period = StartDate + " - " + addDate(EffectiveFrom, -1);
  await globalPageObject.waitForProgressBarLoaded_v2(500);
  await globalPageObject.waitForProgressBarLoaded_v2(500);
  let temp = await accountTabPolicyDetails.validatePeriodPolicyInfo(period);
  logFailTestcase(temp, `Incorrect Period policy detail!`);
});

When(`User gets the Total Premium on Policies widget`, async () => {
  await globalPageObject.waitForProgressBarLoaded_v2();
  let temp = await appEntityWidgets.assertPoliciesWidgetIsExistOrNot(true);
  logFailTestcase(temp, `Can not find policies widget on Customer Summary layout`);

  let TotalPremiumWidget = await appEntityWidgets.getTotalPremiumOfThePoliciesWidget();
  pushObjectToDataArrayWithUniqueKey('TotalPremiumWidget', TotalPremiumWidget);
});


Then(`System shows correct information of new policy on Policies widget {string}`, async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];

  await appEntityWidgets.refeshSummaryPage();
  await appEntityWidgets.refeshSummaryPage();
  const Reference = getValueDataOfDataTestExecution("QuoteReference");
  let PolicyPremium = numberToCurrency(row.PolicyPremium || row.TotalPremiumPolicyPremium, true, row.Currency);
  let Product = row.Product;
  let Currency = row.Currency;
  let temp = await appEntityWidgets.validateTitleOfThePoliciesWidget(Product, Reference, 1);
  logFailTestcase(temp);
  temp = await appEntityWidgets.validatePremiumOfThePoliciesWidget(PolicyPremium, 1);
  logFailTestcase(temp);
  let TotalPremiumWidget = getValueDataOfDataTestExecution('TotalPremiumWidget');

  if (Currency.localeCompare(getDefaultCurrency()) == 0) {
    TotalPremiumWidget = numberToCurrency(currencyToNumber(TotalPremiumWidget) + currencyToNumber(PolicyPremium), true, getDefaultCurrency());
  }
  temp = await appEntityWidgets.validateTotalPremiumOfThePoliciesWidget(TotalPremiumWidget);
  logFailTestcase(temp);


});

Then('User {string} view {string} value of {string} question in pop-up policy timeline', async (status, value, IDfield) => {
  /*
  Note:
  *status: can , can not
  *value : the value of the field
  *IDfield : id of the field
  */
  if (status.localeCompare('can') === 0) {
    let temp = await policyTimeLinePopover.validateValueByFieldAtPopover(value, IDfield);
    logFailTestcase(temp, 'validate Value By Field At policy Time Line Popover failed');
  } else if (status.localeCompare('can not') === 0) {
    let temp = await policyTimeLinePopover.validateFieldAtPopoverIsNotExisted(IDfield);
    logFailTestcase(temp, 'validate Field At Popover Is Not Existed in policy Time Line Popover failed!');
  }

})