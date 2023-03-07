import { Before, When } from "@cucumber/cucumber";
import { ClaimListInsurance } from "../../../../page-objects/back-office-portal/insurance/claim/claim-list/ClaimListInsurance";
import { logFailTestcase } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";

const loader = require("csv-load-sync");
let claimListInsurance: ClaimListInsurance;

Before(async function () {
  const context: ICommonContext = this.context;
  claimListInsurance = new ClaimListInsurance(context.driverService);
});

When("User presses the first account hypelink on Claim list", async () => {
  const temp = await claimListInsurance.pressAccountNameClaimList(1);
  logFailTestcase(temp, `Presses on Account name hypelink at Claim list failed!`);
});