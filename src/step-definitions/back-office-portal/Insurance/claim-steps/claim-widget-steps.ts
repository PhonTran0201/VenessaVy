import { Before, When } from "@cucumber/cucumber";
import { AppEntityWidgets } from "../../../../page-objects/back-office-portal/general/app-entity-widgets/AppEntityWidgets";
import { ClaimListInsurance } from "../../../../page-objects/back-office-portal/insurance/claim/claim-list/ClaimListInsurance";
import { convertPathFileDataToDataRegression, logFailTestcase, logInfoMessage, logSuccessMessage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { numberToCurrency } from "../../../../shared/tenant-setting/tenant-setting";
import { getDataTestCaseObjectByNameField } from "../../../../storage-data/functions/data-test-case";

const loader = require("csv-load-sync");
let appEntityWidgets: AppEntityWidgets;

Before(async function () {
  const context: ICommonContext = this.context;
  appEntityWidgets = new AppEntityWidgets(context.driverService);
});

//#region Last Reported Claim Widget
When("User verifies event on Last Reported Claims widget {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const row = rows[0];
  const claimReferenceId = getDataTestCaseObjectByNameField("Claim ReferenceId")?.message[0];
  const ObjectName = row.ObjectName;
  const Account = row.Account;
  const ExpectedStatus = row.ExpectedStatus;
  const DateOfLoss = row.DateOfLoss;
  let temp = true;
  let index = await appEntityWidgets.getPosittionRowOfReferenceIdOnLastReportedClaimWidget(claimReferenceId || "IncorrectId");
  logFailTestcase(index >= 0, `Get Posittion row Claim reference "${claimReferenceId}" failed!`);

  temp = await appEntityWidgets.valdiateObjectNameOnLastReportedClaimWidget(ObjectName, index);
  logFailTestcase(temp, `Validate Object Name failed!`);

  temp = await appEntityWidgets.valdiateAccountOnLastReportedClaimWidget(Account, index);
  logFailTestcase(temp, `Validate Account failed!`);

  temp = await appEntityWidgets.valdiateStatusOnLastReportedClaimWidget(ExpectedStatus, index);
  logFailTestcase(temp, `Validate Status failed!`);

  temp = await appEntityWidgets.valdiateDateOfLossOnLastReportedClaimWidget(DateOfLoss, index);
  logFailTestcase(temp, `Validate Date of loss failed!`);
});
//#endregion

//#region Claim loss widget
When("User verifies info on Claim Loss widget {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));

  for (let i = 0; i < rows.length; i++) {
    logInfoMessage(`Checking Claim loss at line "${i + 1}" in file csv...`);
    const row = rows[i];
    const ClaimPaidAndExpense = row.ClaimPaidAndExpense;
    const WrittenPremium = row.WrittenPremium;
    const Currency = row.Currency;

    let temp = true;

    if (ClaimPaidAndExpense) {
      temp = await appEntityWidgets.validateClaimPaidAndExpenseNumberOnClaimLossWidget(ClaimPaidAndExpense, Currency);
      logFailTestcase(temp, "Incorrect ClaimPaidAndExpense!");
    }
    if (WrittenPremium) {
      temp = await appEntityWidgets.validateWrittenPremiumNumberOnClaimLossWidget(numberToCurrency(WrittenPremium), Currency);
      logFailTestcase(temp, "Incorrect WrittenPremium!");
    }
    if (ClaimPaidAndExpense && WrittenPremium) {
      const percent = ClaimPaidAndExpense == 0 ? "0" : (parseFloat(ClaimPaidAndExpense) / parseFloat(WrittenPremium) * 100).toFixed(5);
      temp = await appEntityWidgets.validateClaimPaidAndExpenseWidthBarChartOnClaimLossWidget(percent, Currency);
      logFailTestcase(temp, "Incorrect Percent Bar chart Claim paid & Expense");
    }
    logSuccessMessage("\t=> Passed!");
  }
});
//#endregion