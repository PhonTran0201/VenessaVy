import { Before, Given, Then, When } from "@cucumber/cucumber";
import { MappingPage } from "../../../../core/MappingPage";
import { DataRepo } from "../../../../core/modals/DataRepo";
import { SeleniumWebDriverService } from "../../../../core/selenium-webdriver.service";
import { GlobalPageObjectInterface } from "../../../../interfaces/general/GlobalPageObject/GlobalPageObjectInterface";
import { LoginInterface } from "../../../../interfaces/general/login-logout/LoginInterface";
import { LoginAGSHogs } from "../../../../page-objects/agent-portal/hogs/app-login/LoginAGSHogs";
import { GlobalBrowserWindowHandle } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalBrowserWindowHandle";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { Login } from "../../../../page-objects/back-office-portal/general/login-logout/Login";
import { LoginCPGuaranteeAtlas } from "../../../../page-objects/customer-portal/guarantee/atlas/app-login/LoginCPGuaranteeAtlas";
import { LoginCPGuaranteeHogs } from "../../../../page-objects/customer-portal/guarantee/hogs/app-login/LoginCPGuaranteeHogs";
import { LoginCPVarsam } from "../../../../page-objects/customer-portal/varsam/app-login/LoginCPVarsam";
import { LoginTP24Seven } from "../../../../page-objects/third-party/24seven/login-logout/LoginTP24Seven";
import { setAccessTokenBop } from "../../../../shared/access-token/access-token";
import { convertPathFileDataToDataRegression, getLineInFileTxt, logFailTestcase, logInfoMessage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { setTenantSetting } from "../../../../shared/tenant-setting/tenant-setting-get-object";
import { setUserProfile } from "../../../../shared/user-profile/get-user-profile-object";
import { scenarioTags } from "../../../../shared/variables";
import { getValueDataOfDataTestExecution } from "../../../../storage-data/functions/data-test-execution";
const loader = require("csv-load-sync");
let login: LoginInterface;
let globalPageObject: GlobalPageObject;
let globalBrowserWindowHandle: GlobalBrowserWindowHandle;


Before(async function () {
  const context: ICommonContext = this.context;
  login = new Login(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
  globalBrowserWindowHandle = new GlobalBrowserWindowHandle(context.driverService);

  if (scenarioTags.has("@CustomerPortalHogs")) {
    login = new LoginCPGuaranteeHogs(context.driverService);
  }
  else if (scenarioTags.has("@CustomerPortalAtlas")) {
    login = new LoginCPGuaranteeAtlas(context.driverService);
  }
  else if (scenarioTags.has("@ThirdParty24Senven")) {
    login = new LoginTP24Seven(context.driverService);
  }
  else if (scenarioTags.has("@AgentPortalHogs")) {
    login = new LoginAGSHogs(context.driverService);
  }
  else if (scenarioTags.has("@CustomerPortalVarsam")) {
    login = new LoginCPVarsam(context.driverService);
  }
  else if (scenarioTags.has("@BOP")) {
    login = new Login(context.driverService);
  }
});

When("User tests loading data from json file {string}", async (fileName) => {
  const data = await DataRepo.getInstance().loadData(fileName);

  console.log(data);
});

Given("User navigate to login page {string}", async (filename) => {
  try {
    const url = getLineInFileTxt('./data/data_default.txt', 0).substring(4);
    await login.navigate(url);
  } catch (error) {
    console.log(error);
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const url = rows[0].url;
    await login.navigate(url);
  }
});

When("User input credentials data from csv file {string}", async (filename) => {
  try {
    const username = getLineInFileTxt('./data/data_default.txt', 1).substring(9);
    const passwordEncode = getLineInFileTxt('./data/data_default.txt', 2).substring(9);

    await login.inputLogin(username, "username");
    await login.inputLogin(passwordEncode, "password");
  } catch (error) {
    console.log(error);
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const username = rows[0].username;
    const passwordEncode = rows[0].password;

    await login.inputLogin(username, "username");
    await login.inputLogin(passwordEncode, "password");
  }
});

When("User clicks {string} button", async function (string) {
  if (string == "Login") {
    let temp = await login.pressLogin();
    logFailTestcase(temp, "Press login button failed!");

    await globalPageObject.waitForProgressBarLoaded_v2();
  }
  if (string == "Logout") {
    await globalPageObject.navigateToMainLogOut();
  }
});

Then("User is navigated to {string} page", async function (string) {
  const temp = await login.isNavigatingInMainPageByName(string);
  logFailTestcase(temp);

  const tokenLogin = await globalBrowserWindowHandle.getAccessToken();
  setAccessTokenBop(tokenLogin);

  logInfoMessage("\n\t => Setting user profile...");
  await setUserProfile();

  logInfoMessage("\n\t => Setting tenant-setting...");
  await setTenantSetting();

});

When(`User scans page {string} with xpath {string}`, async (linkNavigate: string, xpathElement: string) => {
  await login.navigate(linkNavigate);
  await globalPageObject.waitForProgressBarLoaded_v2();
  await globalPageObject.waitForProgressBarLoaded_v2();
  await globalPageObject.waitForProgressBarLoaded_v2();
  await globalPageObject.waitForProgressBarLoaded_v2();
  await globalPageObject.waitForProgressBarLoaded_v2();
  await globalPageObject.waitForProgressBarLoaded_v2(5000);
  const mapPage = new MappingPage(SeleniumWebDriverService.getInstance());
  await mapPage.scan(xpathElement);
});

When(`User goes to the page that has link {string}`, async (linkNavigate: string) => {
  await login.navigate(linkNavigate);
  await globalPageObject.waitForSeconds(7000);
});


Then("User logs out if already logged in", async function () {
  const currentUrl = await globalBrowserWindowHandle.getCurrentUrl();
  const url = getLineInFileTxt('./data/data_default.txt', 0).substring(4);
  if (!currentUrl.includes('http')) {
    let temp = await login.navigate(url);
    logFailTestcase(temp, `Navigate to link: ${url} failed!`);
    return;
  }
  await globalPageObject.waitForProgressBarLoaded_v2(500);
  await globalPageObject.waitForProgressBarLoaded_v2(500);
  await globalPageObject.waitForProgressBarLoaded_v2(500);
  await globalPageObject.waitForProgressBarLoaded_v2(500);
  await globalPageObject.waitForProgressBarLoaded_v2(500);
  await globalPageObject.waitForProgressBarLoaded_v2(500);
  await globalPageObject.waitForProgressBarLoaded_v2(500);


  let temp = await globalPageObject.checkDashboardButtonMenuExist();
  if (temp) {
    temp = await globalPageObject.navigateToMainLogOut();
    logFailTestcase(temp, "Press log out failed!");
    await globalPageObject.waitForProgressBarLoaded_v2();
  } else {
    temp = await login.navigate(url);
    logFailTestcase(temp, `Navigate to link: ${url} failed!`);
  }
});

When("User inputs login information {string}", async function (filename) {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];

  const username = row.username;
  const password = row.password;
  let customerId = row.customerId || getValueDataOfDataTestExecution("IDAccount");

  let temp = await login.inputUsername(username);
  logFailTestcase(temp, `Input username "${username}" failed!`);

  temp = await login.inputPassword(password);
  logFailTestcase(temp, `Input password "${password}" failed!`);

  if (customerId) {
    if (customerId === "@dataTestExecution@") {
      customerId = getValueDataOfDataTestExecution("CustomerId");
    }
    // temp = await login.inputCustomerId(customerId);
    // logFailTestcase(temp, `Input customerId failed!`);
  }
});

When("User inputs url information {string}", async function (filename) {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  const url = row.url;

  let temp = await login.navigate(url);
  logFailTestcase(temp, `Input url "${url}" failed!`);
});