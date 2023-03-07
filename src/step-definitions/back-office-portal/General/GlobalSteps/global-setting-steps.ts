import { Before, Given } from "@cucumber/cucumber";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { logFailTestcase } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";

let globalPageObject: GlobalPageObject;

Before(async function () {
  const context: ICommonContext = this.context;
  globalPageObject = new GlobalPageObject(context.driverService);
});

//Navigate items on module config page
Given(`User selects {string} domain card at Global setting`, async function (string) {
  const temp = await globalPageObject.selectDomainCardAtGlobalSetting(string);
  logFailTestcase(temp, `Cannot select ${string} at Global setting`);
});
// Press settings button on items inside domain
Given(`User presses Setting button on {string} domain detail item at Global setting`, async function (string) {
  const temp = await globalPageObject.pressSettingAtDomainDetailItemInDomainCard(string);
  logFailTestcase(temp, `Cannot open ${string} settings`);
});
