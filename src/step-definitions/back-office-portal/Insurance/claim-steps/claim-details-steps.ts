import { Before, When } from "@cucumber/cucumber";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { ClaimDetailsLeftSideInsurance } from "../../../../page-objects/back-office-portal/insurance/claim/claim-details/left-side/ClaimDetailsLeftSideInsurance";
import { ClaimDetailsLeftSidePolicyInsurance } from "../../../../page-objects/back-office-portal/insurance/claim/claim-details/left-side/ClaimDetailsLeftSidePolicyInsurance";
import { logFailTestcase } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";

const loader = require("csv-load-sync");

let globalPageObject: GlobalPageObject;
let claimDetailsLeftSideInsurance: ClaimDetailsLeftSideInsurance;
let claimDetailsLeftSidePolicyInsurance: ClaimDetailsLeftSidePolicyInsurance;


Before(async function () {
  const context: ICommonContext = this.context;
  globalPageObject = new GlobalPageObject(context.driverService);
  claimDetailsLeftSideInsurance = new ClaimDetailsLeftSideInsurance(context.driverService);
  claimDetailsLeftSidePolicyInsurance = new ClaimDetailsLeftSidePolicyInsurance(context.driverService);
});

When("User verifies UI at Claim details left side", async ()=>{
  let temp = true;
  await globalPageObject.waitForProgressBarLoaded_v2();
  temp = await claimDetailsLeftSideInsurance.isOutstandingReserveLableExist();
  logFailTestcase(temp, 'NOT found Outstanding Reserve');

  temp = await claimDetailsLeftSideInsurance.isTotalPaymentLableExist();
  logFailTestcase(temp, 'NOT found Total Payment');

  temp = await claimDetailsLeftSideInsurance.isTotalRecoveryEstimatedLableExist();
  logFailTestcase(temp, 'NOT found Total Recovery Estimated');

  temp = await claimDetailsLeftSideInsurance.isTotalRecoveryReceivedLableExist();
  logFailTestcase(temp, 'NOT found Total Recovery Received');
});

When("User verifies sub tabs on Claim details", async () =>{
let temp = await globalPageObject.navigateToSubTransactions();
logFailTestcase(temp, 'NOT found tab Transactions');

temp = await globalPageObject.navigateToSubHistory();
logFailTestcase(temp, 'NOT found tab History');

temp = await globalPageObject.navigateToSubRelatedClaims();
logFailTestcase(temp, 'NOT found tab Related Claims');

temp = await globalPageObject.navigateToSubDocuments();
logFailTestcase(temp, 'NOT found tab Documents');

temp = await globalPageObject.navigateToSubNotes();
logFailTestcase(temp, 'NOT found tab Notes');

temp = await globalPageObject.navigateToSubClaims();
logFailTestcase(temp, 'NOT found tab Claims');
});