import { Before, Given } from "@cucumber/cucumber";
import { GlobalAlert } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalAlert";
import { convertPathFileDataToDataRegression, logFailTestcase } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";

let globalAlert: GlobalAlert;
const loader = require('csv-load-sync');

Before(async function () {
  const context: ICommonContext = this.context;
  globalAlert = new GlobalAlert(context.driverService);
});


Given(`User accepts alert`, async function () {
  const temp = await globalAlert.acceptAlert();
  logFailTestcase(temp, `Accept alert failed!`);
});
Given(`User dismisses alert`, async function () {
  const temp = await globalAlert.dismissAlert();
  logFailTestcase(temp, `Dismiss alert failed!`);
});

Given(`User verifies content of alert {string}`, async function (filename) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const row = rows[0];

  const ContentOfAlert = row.ContentOfAlert;
  const temp = await globalAlert.validateContentOfAlert(ContentOfAlert);
  logFailTestcase(temp, `Incorrect content of Alert!`);
});
