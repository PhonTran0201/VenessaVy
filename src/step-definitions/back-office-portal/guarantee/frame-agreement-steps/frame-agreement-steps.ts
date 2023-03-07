import { Before, Given, Then, When } from "@cucumber/cucumber";
import { FrameAgreementListAGS } from "../../../../page-objects/agent-portal/hogs/frame-agreement/frame-agreement-list/FrameAgreementListAGS";
import { GlobalPageObjectAGS } from "../../../../page-objects/agent-portal/hogs/GlobalPageObject/GlobalPageObjectAGS";
import { AccountRelationshipForm } from "../../../../page-objects/back-office-portal/general/account/account-forms/AccountRelationshipForm";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { GlobalPeripherals } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPeripherals";
import { AccountTabFrameAgreementForm } from "../../../../page-objects/back-office-portal/guarantee/account/account-details/tabs/account-frame-agreements/AccountTabFrameAgreementForm";
import { AccountTabFrameAgreementList } from "../../../../page-objects/back-office-portal/guarantee/account/account-details/tabs/account-frame-agreements/AccountTabFrameAgreementList";
import { AccountTabFrameAgreementProductForm } from "../../../../page-objects/back-office-portal/guarantee/account/account-details/tabs/account-frame-agreements/AccountTabFrameAgreementProductForm";
import { ShareWithCustomersTab } from "../../../../page-objects/back-office-portal/guarantee/account/account-details/tabs/account-frame-agreements/ShareWithCustomersTab";
import { AccountTabHistoryListGuarantee } from "../../../../page-objects/back-office-portal/guarantee/account/account-details/tabs/account-history/AccountTabHistoryListGuarantee";
import { ValidateField } from "../../../../shared/classes";
import { addDate, convertPathFileDataToDataRegression, getCurrentDateTime, getDate, logFailTestcase, logInfoMessage, updateValueToCSVfile } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { currencyToNumber, formatDateTime, getDefaultCurrency, numberToCurrency } from "../../../../shared/tenant-setting/tenant-setting";
import { dataTestcase, scenarioTags } from "../../../../shared/variables";

const loader = require("csv-load-sync");
const fs = require('fs');

let accountTabFrameAgreementForm: AccountTabFrameAgreementForm;
let accountTabFrameAgreementList: AccountTabFrameAgreementList;
let accountTabFrameAgreementProductForm: AccountTabFrameAgreementProductForm;
let accountTabHistoryListGuarantee: AccountTabHistoryListGuarantee;
let accountRelationshipForm: AccountRelationshipForm;
let shareWithCustomersTab: ShareWithCustomersTab;
let globalPageObject: GlobalPageObject;
let globalPeripherals: GlobalPeripherals;
let frameAgreementList;

Before(async function () {
  const context: ICommonContext = this.context;
  accountTabFrameAgreementForm = new AccountTabFrameAgreementForm(context.driverService);
  accountTabFrameAgreementList = new AccountTabFrameAgreementList(context.driverService);
  accountTabFrameAgreementProductForm = new AccountTabFrameAgreementProductForm(context.driverService);
  accountTabHistoryListGuarantee = new AccountTabHistoryListGuarantee(context.driverService);
  shareWithCustomersTab = new ShareWithCustomersTab(context.driverService);
  accountRelationshipForm = new AccountRelationshipForm(context.driverService);

  globalPageObject = new GlobalPageObject(context.driverService);
  globalPeripherals = new GlobalPeripherals(context.driverService);
  if(scenarioTags.has('@AgentPortalHogs')){
    globalPageObject = new GlobalPageObjectAGS(context.driverService);
    frameAgreementList = new FrameAgreementListAGS(context.driverService);
  }
});

Given("User navigates to Frame Agreements List", async () => {
  const temp = await globalPageObject.navigateToSubFrameAgreements();
  logFailTestcase(temp, "Navigate to Frame Agreements list failed!");
});

When("User opens the first Frame agreement on Frame agreements list", async () => {
  const temp = await accountTabFrameAgreementList.openFrameAgreementDetailsByRow(1);
  logFailTestcase(temp, "Open the first Frame agreement details failed!");
});

async function validateValuesAtProductListOnFrameAgreementFormTabDetails(rows: any) {
  let temp = true;
  //#region Validate values at Product list on FA form tab Details
  for (let i = 0; i < rows.length; i++) {
    const Product = rows[i].Product;
    const Type = rows[i].Type;
    const PremiumRate = rows[i].PremiumRate;
    const CommissionRate = rows[i].CommissionRate;
    const PaymentMethod = rows[i].PaymentMethod;
    let GuaranteeRate = rows[i].GuaranteeRate;
    const FirstPhaseGuaranteeRate = rows[i].FirstPhaseGuaranteeRate;
    const SecondPhaseGuaranteeRate = rows[i].SecondPhaseGuaranteeRate;
    const EstablishmentFee = rows[i].EstablishmentFee;
    const AmendmentFee = rows[i].AmendmentFee;

    logInfoMessage(`\t => Checking product "${Product}" at line 1 file csv...`);
    const positionRow = await accountTabFrameAgreementForm.getPositionRowByProductName_ProductList_FrameAgreementForm_DetailsTab(Product);
    logFailTestcase(positionRow !== -1, `Can't find product ${Product} on FA form`);

    temp = await accountTabFrameAgreementForm.validateProductName_ProductList_FrameAgreementForm_DetailsTab(Product, positionRow);
    logFailTestcase(temp);

    temp = await accountTabFrameAgreementForm.validateParameter_ProductList_FrameAgreementForm_DetailsTab("Premium Rate (%)", PremiumRate, positionRow);
    logFailTestcase(temp);

    temp = await accountTabFrameAgreementForm.validateParameter_ProductList_FrameAgreementForm_DetailsTab("Commission Rate (%)", numberToCurrency(CommissionRate), positionRow);
    logFailTestcase(temp);

    temp = await accountTabFrameAgreementForm.validateParameter_ProductList_FrameAgreementForm_DetailsTab("Payment method", PaymentMethod, positionRow);
    logFailTestcase(temp);

    if (Type.localeCompare("One Phase") === 0) {
      if (GuaranteeRate && GuaranteeRate.localeCompare("N/A") !== 0) {

        temp = await accountTabFrameAgreementForm.validateParameter_ProductList_FrameAgreementForm_DetailsTab("Guarantee Rate (%)", GuaranteeRate, positionRow);
        logFailTestcase(temp);
      }
    }
    else {
      if (FirstPhaseGuaranteeRate) {
        temp = await accountTabFrameAgreementForm.validateParameter_ProductList_FrameAgreementForm_DetailsTab("First Phase Guarantee Rate (%)", FirstPhaseGuaranteeRate, positionRow);
        logFailTestcase(temp);
      }

      if (SecondPhaseGuaranteeRate) {
        temp = await accountTabFrameAgreementForm.validateParameter_ProductList_FrameAgreementForm_DetailsTab("Second Phase Guarantee Rate (%)", SecondPhaseGuaranteeRate, positionRow);
        logFailTestcase(temp);
      }
    }

    if (EstablishmentFee) {
      temp = await accountTabFrameAgreementForm.validateParameter_ProductList_FrameAgreementForm_DetailsTab("Establishment Fee", EstablishmentFee, positionRow);
      logFailTestcase(temp);
    }

    if (AmendmentFee) {
      temp = await accountTabFrameAgreementForm.validateParameter_ProductList_FrameAgreementForm_DetailsTab("Amendment Fee", AmendmentFee, positionRow);
      logFailTestcase(temp);
    }

    logInfoMessage(`\t=> Passed!`);


    //#region Verify Add product form after press Save Add product
    logInfoMessage(`Open product "${Product}" and verify info...`);
    let position = await accountTabFrameAgreementForm.getPositionRowByProductName_ProductList_FrameAgreementForm_DetailsTab(Product);
    logFailTestcase(position > 0, "Get position row of Product failed!");
    temp = await accountTabFrameAgreementForm.pressEditButton_ProductList_FrameAgreementForm_DetailsTab_ByPositionRow(position);
    logFailTestcase(temp, `Press edit button on  product "${Product}" failed!`);

    temp = await accountTabFrameAgreementProductForm.validateProductNameOnProductForm(Product);
    logFailTestcase(temp);

    temp = await accountTabFrameAgreementProductForm.validatePremiumRateOnProductForm(PremiumRate);
    logFailTestcase(temp);

    if (CommissionRate) {
      temp = await accountTabFrameAgreementProductForm.validateCommissionRateOnProductForm(CommissionRate);
      logFailTestcase(temp);
    }

    if (PaymentMethod) {
      temp = await accountTabFrameAgreementProductForm.validatePaymentMethodOnProductForm(PaymentMethod);
      logFailTestcase(temp);
    }

    if (Type.localeCompare("One Phase") === 0) {
      if (GuaranteeRate && GuaranteeRate.localeCompare("N/A") !== 0) {
        temp = await accountTabFrameAgreementProductForm.validateGuaranteeRateOnProductForm(GuaranteeRate);
        logFailTestcase(temp);
      }
    }
    else {
      if (FirstPhaseGuaranteeRate) {
        temp = await accountTabFrameAgreementProductForm.validateFirstPhaseGuaranteeRateOnProductForm(FirstPhaseGuaranteeRate);
        logFailTestcase(temp);
      }

      if (SecondPhaseGuaranteeRate) {
        temp = await accountTabFrameAgreementProductForm.validateSecondPhaseGuaranteeRateOnProductForm(SecondPhaseGuaranteeRate);
        logFailTestcase(temp);
      }
    }

    if (EstablishmentFee) {
      temp = await accountTabFrameAgreementProductForm.validateEstablishmentFeeOnProductForm(EstablishmentFee);
      logFailTestcase(temp);
    }

    if (AmendmentFee) {
      temp = await accountTabFrameAgreementProductForm.validateAmendmentFeeOnProductForm(AmendmentFee);
      logFailTestcase(temp);
    }
    await globalPageObject.pressCancelForm();
    logInfoMessage("\t=> Passed!");
    //#endregion

  }
  //#endregion
}

When("User inputs valid frame agreement for one phase product from csv file {string}", async (filename: string) => {
  let rows = loader(convertPathFileDataToDataRegression(filename));
  await globalPageObject.waitForProgressBarLoaded_v2();
  let temp = await globalPageObject.pressCreateTab();
  logFailTestcase(temp, `Press "Create" Frame agreement form failed!`);

  //#region Select Frame Agreement Type - for HOGS project
  const FrameAgreementType = rows[0].FrameAgreementType;
  if (FrameAgreementType) {
    temp = await accountTabFrameAgreementList.selectFrameAgreementNTSType(FrameAgreementType);
    logFailTestcase(temp, "Select Frame agreement NTS Type failed!");
  }
  //#endregion

  //#region Input data into Frame Agreement form with out Product
  const Name = rows[0].Name;
  const TotalLimitExposure = rows[0].TotalLimitExposure;
  const Security = rows[0].Security;
  let StartDate = rows[0].StartDate;
  let EndDate = rows[0].EndDate;
  const StartDateMinusToday = rows[0].StartDateMinusToday;
  const EndDateMinusStartDate = rows[0].EndDateMinusStartDate;

  if (Name) {
    temp = await accountTabFrameAgreementForm.inputNameOnFrameAgreementForm(Name);
    logFailTestcase(temp, "Input Name on Frame Agreement form failed!");
  }
  if (TotalLimitExposure) {
    temp = await accountTabFrameAgreementForm.inputTotalLimitExposureOnFrameAgreementForm(TotalLimitExposure);
    logFailTestcase(temp, "Input TotalLimitExposure on Frame Agreement form failed!");
  }
  if (Security) {
    temp = await accountTabFrameAgreementForm.inputSecurityOnFrameAgreementForm(Security);
    logFailTestcase(temp, "Input Security on Frame Agreement form failed!");
  }
  if (StartDateMinusToday) {
    StartDate = getDate(StartDateMinusToday);
  }
  if (EndDateMinusStartDate) {
    EndDate = addDate(StartDate, EndDateMinusStartDate);
  }

  if (StartDate) {
    temp = await accountTabFrameAgreementForm.inputStartDateOnFrameAgreementForm(StartDate);
    logFailTestcase(temp, "Input StartDate on Frame Agreement form failed!");
  }
  if (EndDate) {
    temp = await accountTabFrameAgreementForm.inputEndDateOnFrameAgreementForm(EndDate);
    logFailTestcase(temp, "Input EndDate on Frame Agreement form failed!");
  }
  //#endregion

  //#region Input data into Frame Agreement Product form
  // Accept to add multiple Products
  for (let i = 0; i < rows.length; i++) {
    const Product = rows[i].Product;
    const Type = rows[i].Type;
    const PremiumRate = rows[i].PremiumRate;
    const CommissionRate = rows[i].CommissionRate;
    const PaymentMethod = rows[i].PaymentMethod;
    let GuaranteeRate = rows[i].GuaranteeRate;
    const FirstPhaseGuaranteeRate = rows[i].FirstPhaseGuaranteeRate;
    const SecondPhaseGuaranteeRate = rows[i].SecondPhaseGuaranteeRate;
    const EstablishmentFee = rows[i].EstablishmentFee;
    const AmendmentFee = rows[i].AmendmentFee;

    logInfoMessage(`\tInput Product at line ${i + 1}: "${Product}"...`);
    if (Product) {
      temp = await accountTabFrameAgreementForm.inputProductOnFrameAgreementForm(Product);
      logFailTestcase(temp, "Input Product on Frame Agreement form failed!");
    }

    if (PremiumRate) {
      temp = await accountTabFrameAgreementProductForm.inputPremiumRateOnProductForm(PremiumRate);
      logFailTestcase(temp, "Input Premium Rate on Product form failed!");
    }

    temp = await accountTabFrameAgreementProductForm.inputCommissionRateOnProductForm(CommissionRate || "");
    logFailTestcase(temp, "Input Commission Rate on Product form failed!");

    if (PaymentMethod) {
      temp = await accountTabFrameAgreementProductForm.inputPaymentMethodOnProductForm(PaymentMethod);
      logFailTestcase(temp, "Input Payment Method on Product form failed!");
    }

    if (Type.localeCompare("One Phase") === 0) {
      if (GuaranteeRate && GuaranteeRate !== "N/A") {
        GuaranteeRate = GuaranteeRate.replace(";",",");
        temp = await accountTabFrameAgreementProductForm.inputGuaranteeRateOnProductForm(GuaranteeRate);
        logFailTestcase(temp, "Input Guarantee Rate failed!");
      }
    }
    if (Type.localeCompare("Two Phases") === 0) {
      if (FirstPhaseGuaranteeRate) {
        temp = await accountTabFrameAgreementProductForm.inputFirstPhaseGuaranteeRateOnProductForm(FirstPhaseGuaranteeRate);
        logFailTestcase(temp, "Input First Phase Guarantee Rate failed!");
      }
      if (SecondPhaseGuaranteeRate) {
        temp = await accountTabFrameAgreementProductForm.inputSecondPhaseGuaranteeRateOnProductForm(SecondPhaseGuaranteeRate);
        logFailTestcase(temp, "Input Second Phase Guarantee Rate failed!");
      }
    }
    if (EstablishmentFee) {
      temp = await accountTabFrameAgreementProductForm.inputEstablishmentFeeOnProductForm(EstablishmentFee);
      logFailTestcase(temp, "Input Establishment Fee on Product form failed!");
    }
    if (AmendmentFee) {
      temp = await accountTabFrameAgreementProductForm.inputAmendmentFeeOnProductForm(AmendmentFee);
      logFailTestcase(temp, "Input Amendment Fee on Product form failed!");
    }
    //#endregion

    temp = await globalPageObject.pressSaveForm();

    logFailTestcase(temp);
    logInfoMessage("\t=> Passed!");
  }

  //#region Verify Product details in Create FA form before clicking Save btn on FA form
  logInfoMessage("Check product details in Create FA form before click Save btn on FA form...");
  await validateValuesAtProductListOnFrameAgreementFormTabDetails(rows);
  logInfoMessage("\t=> Passed!");
  //#endregion

  await globalPageObject.pressSaveForm();
  await globalPageObject.waitForProgressBarLoaded();
});

Then('System shows new record in the Frame Agreement in the list {string}', async (filename: string) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  await accountTabFrameAgreementList.reloadFrameAgreementList();

  const Name = rows[0].Name;
  const TotalLimitExposure = rows[0].TotalLimitExposure;
  let expectedStartDate = rows[0].StartDate;
  let expectedEndDate = rows[0].EndDate;
  const StartDateMinusToday = rows[0].StartDateMinusToday;
  const EndDateMinusStartDate = rows[0].EndDateMinusStartDate;
  const Capacity = rows[0].Capacity;
  const RemainingCapacity = rows[0].RemainingCapacity;

  const FrameAgreementType = rows[0].FrameAgreementType; // Hogs project

  const Status = rows[0].Status;

  if (StartDateMinusToday) {
    expectedStartDate = formatDateTime(getDate(StartDateMinusToday));
  }
  if (EndDateMinusStartDate) {
    expectedEndDate = formatDateTime(addDate(getDate(StartDateMinusToday), EndDateMinusStartDate));
  }
  await globalPageObject.waitForSeconds(2000);

  let temp = true;
  if (expectedStartDate && expectedEndDate) {
    temp = await accountTabFrameAgreementList.validatePeriodOnFrameAgreementList(expectedStartDate + " - " + expectedEndDate);
    logFailTestcase(temp);
  }

  if (Name) {
    temp = await accountTabFrameAgreementList.validateNameNoOnFrameAgreementList(Name);
    logFailTestcase(temp);
  }

  if (TotalLimitExposure) {
    const expectedTotalLimitExposure = numberToCurrency(currencyToNumber(TotalLimitExposure), true);
    temp = await accountTabFrameAgreementList.validateLimitExposureNoOnFrameAgreementList(expectedTotalLimitExposure);
    logFailTestcase(temp);
  }

  if (Capacity) {
    const expectedCapacity = numberToCurrency(currencyToNumber(Capacity), true);
    temp = await accountTabFrameAgreementList.validateCapacityOnFrameAgreementList(expectedCapacity);
    logFailTestcase(temp);
  }

  if (RemainingCapacity) {
    const expectedRemainingCapacity = numberToCurrency(currencyToNumber(RemainingCapacity), true);
    temp = await accountTabFrameAgreementList.validateRemainingCapacityOnFrameAgreementList(expectedRemainingCapacity);
    logFailTestcase(temp);
  }

  if (FrameAgreementType) {
    let temp = await accountTabFrameAgreementList.validateFrameAgreementNTSType(FrameAgreementType);
    logFailTestcase(temp, "validate Frame Agreement NTS Type failed!");
    temp = await accountTabFrameAgreementList.validateCreatedApplicationButton(FrameAgreementType);
    logFailTestcase(temp, "validate Created Application Button failed!");
  }

  if (Status) {
    temp = await accountTabFrameAgreementList.validateStatusOnFrameAgreementList(Status);
    logFailTestcase(temp);
  }

  //Push Frame Agreement No into dataTestcase
  const expectedFrameAgreementNo = await accountTabFrameAgreementList.getFrameAgreementNo();
  dataTestcase.push(new ValidateField(`Frame Agmt No`, 1, true, [expectedFrameAgreementNo], []));
});

Then('User verifies information in Frame Agreement details {string}', async (filename: string) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));

  //#region Validate values at Details tab on FA form without Product list
  let FrameAgreementNumber = "FrameAgreementNumber";
  for (const iterator of dataTestcase) {
    if (iterator.nameField.localeCompare("Frame Agmt No") === 0) {
      FrameAgreementNumber = iterator.message[0];
    }
  }
  const Name = rows[0].Name;
  const TotalLimitExposure = rows[0].TotalLimitExposure;
  const expectedTotalLimitExposure = numberToCurrency(currencyToNumber(TotalLimitExposure));
  let expectedStartDate = rows[0].StartDate;
  let expectedEndDate = rows[0].EndDate;
  const StartDateMinusToday = rows[0].StartDateMinusToday;
  const EndDateMinusStartDate = rows[0].EndDateMinusStartDate;
  if (StartDateMinusToday) {
    expectedStartDate = getDate(StartDateMinusToday);
  }
  if (EndDateMinusStartDate) {
    expectedEndDate = addDate(expectedStartDate, EndDateMinusStartDate);
  }

  const Capacity = rows[0].Capacity;
  const expectedCapacity = numberToCurrency(currencyToNumber(Capacity));
  const RemainingCapacity = rows[0].RemainingCapacity;
  const expectedRemainingCapacity = numberToCurrency(currencyToNumber(RemainingCapacity));
  const Currency = rows[0].Currency;


  let temp = await accountTabFrameAgreementForm.validateFrameAgreementNumber_FrameAgreementForm_DetailsTab(FrameAgreementNumber);
  logFailTestcase(temp);

  temp = await accountTabFrameAgreementForm.validateName_FrameAgreementForm_DetailsTab(Name);
  logFailTestcase(temp);

  temp = await accountTabFrameAgreementForm.validateStartDate_FrameAgreementForm_DetailsTab(expectedStartDate);
  logFailTestcase(temp);

  temp = await accountTabFrameAgreementForm.validateEndDate_FrameAgreementForm_DetailsTab(expectedEndDate);
  logFailTestcase(temp);


  // "Used" on FA form is the same to "Capacity" on FA list
  temp = await accountTabFrameAgreementForm.validateUsed_FrameAgreementForm_DetailsTab(expectedCapacity);
  logFailTestcase(temp);

  temp = await accountTabFrameAgreementForm.validateRemainingCapacity_FrameAgreementForm_DetailsTab(expectedRemainingCapacity);
  logFailTestcase(temp);

  temp = await accountTabFrameAgreementForm.validateTotalLimitExposure_FrameAgreementForm_DetailsTab(expectedTotalLimitExposure);
  logFailTestcase(temp);

  if (Currency) {
    temp = await accountTabFrameAgreementForm.validateCurrency_FrameAgreementForm_DetailsTab(Currency);
    logFailTestcase(temp);
  }
  //#endregion

  //#region Verify Product list on FA form after FA created
  logInfoMessage("Verify Product list on FA form after FA created");
  await validateValuesAtProductListOnFrameAgreementFormTabDetails(rows);
  logInfoMessage("\t=> Passed!");
  //#endregion

  await globalPageObject.pressCancelForm();
});

Then("System shows event Agreement created in the History list at Account detail", async () => {
  let temp = await globalPageObject.navigateToSubHistory();
  logFailTestcase(temp, "Navigate to History list failed!");

  const expectedType = 'Agreement created';
  let expectedDescription = `FA NO created`;
  for (const iterator of dataTestcase) {
    if (iterator.nameField.localeCompare("Frame Agmt No") === 0) {
      expectedDescription = `${iterator.message[0]} created`;
    }
  }
  const expectedTime = getCurrentDateTime();
  const expectedUpdatedBy = "???????????"; // depend on account you are logging in

  temp = await accountTabHistoryListGuarantee.validateTypeOnHistoryList(expectedType);
  logFailTestcase(temp);

  temp = await accountTabHistoryListGuarantee.validateDescriptionOnHistoryList(expectedDescription);
  logFailTestcase(temp);

  temp = await accountTabHistoryListGuarantee.validateTimestampOnHistoryList(expectedTime);
  logFailTestcase(temp);

  // temp = await accountTabHistoryListGuarantee.validateUpdatedByOnHistoryList(expectedUpdatedBy);
  // logFailTestcase(temp);
});

Then("User saves all frame agreements information into file {string}", async (filename) => {
  const length = await globalPageObject.getNumberOfTotalRecordsSubTab();
  let faList = [{
    frameAgreementList: {
      frameAgmtNo: "",
      startDate: "",
      endDate: "",
      name: "",
      used: 0,
      limitExposure: 0,
      remainingCapacity: 0,
      status: ""
    },
    productList: [{
      productName: "",
      parameters: ""
    }]
  }];
  faList.pop();
  for (let i = 1; i <= (length >= 10 ? 10 : length); i++) {
    await globalPeripherals.pressPageDownCurrentElement();

    logInfoMessage(`Save info FA at line ${i}...`);
    const frameAgmtNo = await accountTabFrameAgreementList.getFrameAgreementNoByRow(i);
    logFailTestcase(frameAgmtNo !== "", "Get FA Number failed!");

    const startDate = (await accountTabFrameAgreementList.getPeriodByRow(i)).split(" - ")[0];
    logFailTestcase(startDate !== "", "Get startDate failed!");

    const endDate = (await accountTabFrameAgreementList.getPeriodByRow(i)).split(" - ")[1];
    logFailTestcase(endDate !== "", "Get endDate failed!");

    const name = await accountTabFrameAgreementList.getNameByRow(i);
    logFailTestcase(name !== "", "Get name failed!");

    const used = await accountTabFrameAgreementList.getCapacityByRow(i);
    logFailTestcase(used !== -1, "Get used failed!");

    const limitExposure = await accountTabFrameAgreementList.getLimitExposureByRow(i);
    logFailTestcase(limitExposure !== -1, "Get limitExposure failed!");

    const remainingCapacity = await accountTabFrameAgreementList.getRemainingCapacityByRow(i);
    logFailTestcase(remainingCapacity !== -1, "Get remainingCapacity failed!");

    const status = await accountTabFrameAgreementList.getStatusByRow(i);
    logFailTestcase(status !== "", "Get status failed!");

    let fa = {
      frameAgreementList: {
        frameAgmtNo: "",
        startDate: "",
        endDate: "",
        name: "",
        used: 0,
        limitExposure: 0,
        remainingCapacity: 0,
        status: ""
      },
      productList: [{
        productName: "",
        parameters: ""
      }]
    }

    fa.frameAgreementList.frameAgmtNo = frameAgmtNo;
    fa.frameAgreementList.startDate = startDate;
    fa.frameAgreementList.endDate = endDate;
    fa.frameAgreementList.name = name;
    fa.frameAgreementList.used = used;
    fa.frameAgreementList.limitExposure = limitExposure;
    fa.frameAgreementList.remainingCapacity = remainingCapacity;
    fa.frameAgreementList.status = status;

    // Push product list
    let temp = await accountTabFrameAgreementList.openFrameAgreementDetailsByRow(i);
    logFailTestcase(temp, "Open FA details failed!");
    fa.productList.pop();
    let j = 1;

    const productName = await accountTabFrameAgreementForm.getProductNameOnProductListByRow(j);
    const parameters = await accountTabFrameAgreementForm.getParametersOnProductListByRow(j);


    fa.productList.push({
      productName: productName,
      parameters: parameters
    });

    faList.push(fa);

    await globalPageObject.closeOpeningForm();
    logInfoMessage("\t => Passed!");
  }
  console.log(faList);

  const storeData = (data, path) => {
    try {
      fs.writeFileSync(path, JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  }
  storeData(faList, filename);
});

When("User shares the Frame Agreement with customers {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  const Account = row.SelectedAccount;
  
  let temp = await accountTabFrameAgreementList.openFrameAgreementDetailsByRow();
  logFailTestcase(temp, "open Frame Agreement Details By Row failed!");

  temp = await shareWithCustomersTab.navigateToShareWithCustomersTab();
  logFailTestcase(temp, "navigate To Share With Customers Tab failed!");

  await globalPageObject.waitForSeconds(2000);
  temp = await shareWithCustomersTab.inputMemberToShareFrameAgreement(Account);
  logFailTestcase(temp, "input Member To Share the Frame Agreement failed!");

  temp = await shareWithCustomersTab.clickAddMemberButton();
  logFailTestcase(temp, "click Add Member Button failed!");
  await globalPageObject.waitForProgressBarLoaded_v2();

  temp = await globalPageObject.checkToastSuccessExistWithMessage("Add member successfully");
  logFailTestcase(temp, `System does not show the 'Add member successfully' message!`);

  await globalPageObject.reloadTable(2000);

  temp = await shareWithCustomersTab.validateNameOnShareWithCustomers(Account);
  logFailTestcase(temp, "validate Name On Share With Customers failed!");

});

When("User un-shares the Frame Agreement with customers {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  const Account = row.SelectedAccount;

  await globalPageObject.waitForSeconds(5000);

  let temp = await accountTabFrameAgreementList.openFrameAgreementDetailsByRow();
  logFailTestcase(temp, "open Frame Agreement Details By Row failed!");

  temp = await shareWithCustomersTab.navigateToShareWithCustomersTab();
  logFailTestcase(temp, "navigate To Share With Customers Tab failed!");

  await globalPageObject.waitForSeconds(1000);
  temp = await shareWithCustomersTab.validateNameOnShareWithCustomers(Account)
  logFailTestcase(temp, "Incorrect member name on Share customer list!");

  temp = await shareWithCustomersTab.removeMemberOnShareWithCustomers();
  logFailTestcase(temp, "remove the member on Share with customer failed!");
  temp = await globalPageObject.pressYesForm();
  logFailTestcase(temp, "press Yes on Confirmation Form");

  await globalPageObject.waitForProgressBarLoaded_v2();
  await globalPageObject.reloadTable(3000);
  temp = await accountRelationshipForm.validateDeletion();
  logFailTestcase(temp, "The member still exist on Share with customer list after the remove");

  await globalPageObject.closeOpeningForm();

});

Then("System does not show the Frame Agreement in the list {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  let FrameAgreementNo = row.FrameAgreementNo;
  const SavedInformationFile = row.SavedInformationFile;
  
  if(FrameAgreementNo){
    const FA = require("../../../../." + SavedInformationFile);
    console.log(FA);
    FrameAgreementNo = FA.FrameAgreementNo;
  }

  await globalPageObject.reloadTable(5000);

  if (await globalPageObject.getNumberOfTotalRecordsSubTab() != 0) {
    let temp = await accountTabFrameAgreementList.validateFrameAgmtNoOnFrameAgreementList(FrameAgreementNo);
    logFailTestcase(!temp, "Frame Agreement still exists on the list");
  }

});

Then('System shows new record in the Frame Agreement in the Frame Agreement list {string}', async (filename: string) => {
  //this step is used when testing on agent portal or customer portal
  const rows = loader(convertPathFileDataToDataRegression(filename));
  await globalPageObject.reloadTable();


  const TotalLimitExposure = rows[0].TotalLimitExposure;
  let expectedStartDate = rows[0].StartDate;
  let expectedEndDate = rows[0].EndDate;
  const StartDateMinusToday = rows[0].StartDateMinusToday;
  const EndDateMinusStartDate = rows[0].EndDateMinusStartDate;
  const Capacity = rows[0].Capacity;
  const RemainingCapacity = rows[0].RemainingCapacity;
  let FrameAgreementNo = rows[0].FrameAgreementNo;
  const SavedInformationFile = rows[0].SavedInformationFile;
  const Status = rows[0].Status;


  if (StartDateMinusToday) {
    expectedStartDate = getDate(StartDateMinusToday);
  }
  if (EndDateMinusStartDate) {
    expectedEndDate = addDate(expectedStartDate, EndDateMinusStartDate);
  }
  await globalPageObject.waitForSeconds(2000);

  let temp = true;

  if(FrameAgreementNo){
    const FA = require("../../../../." + SavedInformationFile);
    console.log(FA);
    FrameAgreementNo = FA.FrameAgreemtNo;
    temp = await frameAgreementList.validateFrameAgmtNoOnFrameAgreementList(FrameAgreementNo);
    logFailTestcase(temp);
  }

  if (expectedStartDate && expectedEndDate) {
    temp = await frameAgreementList.validatePeriodOnFrameAgreementList(formatDateTime(expectedStartDate) + " - " + formatDateTime(expectedEndDate));
    logFailTestcase(temp);
  }

  if (TotalLimitExposure) {
    const expectedTotalLimitExposure = numberToCurrency(currencyToNumber(TotalLimitExposure), true);
    temp = await frameAgreementList.validateLimitExposureNoOnFrameAgreementList(expectedTotalLimitExposure);
    logFailTestcase(temp);
  }

  if (Capacity) {
    const expectedCapacity = Capacity.toString() === "0" ? getDefaultCurrency() + " 0" : numberToCurrency(currencyToNumber(Capacity), true);
    temp = await frameAgreementList.validateCapacityOnFrameAgreementList(expectedCapacity);
    logFailTestcase(temp);
  }

  if (RemainingCapacity) {
    const expectedRemainingCapacity = numberToCurrency(currencyToNumber(RemainingCapacity), true);
    temp = await frameAgreementList.validateRemainingCapacityOnFrameAgreementList(expectedRemainingCapacity);
    logFailTestcase(temp);
  }

  if (Status) {
    temp = await frameAgreementList.validateStatusOnFrameAgreementList(Status);
    logFailTestcase(temp);
  }

});