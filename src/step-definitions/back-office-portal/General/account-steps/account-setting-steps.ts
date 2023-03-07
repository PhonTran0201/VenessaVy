import { Before, Given, Then, When } from "@cucumber/cucumber";
import { AccountSetting } from "../../../../page-objects/back-office-portal/general/account/account-setting/AccountSetting";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { convertPathFileDataToDataRegression, logFailTestcase } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";

const loader = require("csv-load-sync");

let accountSetting: AccountSetting;
let globalPageObject: GlobalPageObject;

Before(async function () {
  const context: ICommonContext = this.context;
  accountSetting = new AccountSetting(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
});

Given("User navigates to Module configuration", async function () {
  const temp = await globalPageObject.navigateToMainModuleConfiguration();
  logFailTestcase(temp, "Navigate to Module configuration failed!");
});

Then("System updates configuration successfully", async () => {
  //do nothing
});

When("System inputs data to Account setting page {string}", async function (filename) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const accountRefStart = rows[0].AccountRefStart;
  const accountCountries = rows[0].AccountCountries;
  const phonePrefix = rows[0].PhonePrefix;
  const accountTypes = rows[0].AccountTypes;
  const extOrgNo = rows[0].ExtOrgNo;
  const extSSN = rows[0].ExtSSN;
  const mod11 = rows[0].Mod11;
  const scoringFeature = rows[0].ScoringFeature;

  //insert default value here
  let temp = await accountSetting.enterAccountReferenceStartValue(accountRefStart);
  logFailTestcase(temp, "Choose Account Reference Start Value failed");

  temp = await accountSetting.chooseAccountType(accountTypes.split(";"));
  logFailTestcase(temp, "Choose account type failed!");

  temp = await accountSetting.enterAccountPhonePrefix(phonePrefix);
  logFailTestcase(temp, "Enter phone prefix failed!");

  temp = await accountSetting.chooseAccountCountry(accountCountries.split(";"));
  logFailTestcase(temp, "Choose account country failed!");

  temp = await accountSetting.getExtLookupOrgStatus();
  if ((temp === false && extOrgNo === "Yes") || (temp === true && extOrgNo === "No")) {
    let check = await accountSetting.changeExtLookupOrgStatus();
    logFailTestcase(check, "Change org no. status failed!");
  }

  temp = await accountSetting.getExtLookupSSNStatus();
  if ((temp === false && extSSN === "Yes") || (temp === false && extSSN === "Yes")) {
    let check = await accountSetting.changeExtLookupSSNStatus();
    logFailTestcase(check, "Change SSN status failed!");
  }

  temp = await accountSetting.getModulus11Status();
  if ((temp === true && mod11 === "No") || (temp === false && mod11 === "Yes")) {
    let check = await accountSetting.changeModulus11Status();
    logFailTestcase(check, "Change Modulus 11 status failed!");
  }

  temp = await accountSetting.getScoringFeatureStatus();
  if ((temp === false && scoringFeature === "Yes") || (temp === true && scoringFeature === "No")) {
    let check = await accountSetting.changeScoringFeatureStatus();
    logFailTestcase(check, "Change scoring feature status failed!");
  }

  temp = await accountSetting.saveSettingForm();
  logFailTestcase(temp, "Save settings failed");
  //end of value insertion
});
