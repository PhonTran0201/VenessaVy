import { Before, Given, Then } from "@cucumber/cucumber";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { ClaimDetailsLeftSidePolicyInsurance } from "../../../../page-objects/back-office-portal/insurance/claim/claim-details/left-side/ClaimDetailsLeftSidePolicyInsurance";
import { ClaimTabRelatedClaimsListInsurance } from "../../../../page-objects/back-office-portal/insurance/claim/claim-details/tabs/claim-related-claims/ClaimTabRelatedClaimsListInsurance";
import { logFailTestcase } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";



let claimDetailsLeftSidePolicyInsurance: ClaimDetailsLeftSidePolicyInsurance;
let claimTabRelatedClaimsListInsurance: ClaimTabRelatedClaimsListInsurance;
let globalPageObject: GlobalPageObject;


Before(async function () {
  const context: ICommonContext = this.context;
  claimDetailsLeftSidePolicyInsurance = new ClaimDetailsLeftSidePolicyInsurance(context.driverService);
  claimTabRelatedClaimsListInsurance = new ClaimTabRelatedClaimsListInsurance(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
});

Given("User is on Related Claims list", async () => {
  const temp = await globalPageObject.navigateToSubRelatedClaims();
  logFailTestcase(temp, "Navigates to Related Claims list failed!");
});

Then("System shows claims registered on the same policy at Related Claim tab", async () => {
  await globalPageObject.waitForProgressBarLoaded_v2();
  const PolicyReference = await claimDetailsLeftSidePolicyInsurance.getValueClaimDetailPolicyInformation("Reference");
  let numberItem = await globalPageObject.getNumberOfTotalRecordsSubTab();
  numberItem = numberItem < 10 ? numberItem : 10;
  for (let i = 1; i <= numberItem; i++) {
    const temp = await claimTabRelatedClaimsListInsurance.validateValueRelatedClaimsList(PolicyReference, "Policy", i);
    logFailTestcase(temp, `Policy reference at row ${i} is NOT the same to "${PolicyReference}"!`);
  }
});