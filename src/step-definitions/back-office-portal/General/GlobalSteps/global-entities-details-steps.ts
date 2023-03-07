import { Before, Given } from "@cucumber/cucumber";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { logFailTestcase } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";

let globalPageObject: GlobalPageObject;

Before(async function () {
  const context: ICommonContext = this.context;
  globalPageObject = new GlobalPageObject(context.driverService);
});

Given(`User is on Summary tab`, async function () {
  const temp = await globalPageObject.navigateToSubSummary();
  logFailTestcase(temp, `Navigate to Summary tab failed!`);
});
