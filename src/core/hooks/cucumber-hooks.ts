import { After, AfterAll, AfterStep, Before, BeforeAll, BeforeStep, setDefaultTimeout, Status, World } from "@cucumber/cucumber";
import { WebDriver } from "selenium-webdriver";
import { GlobalBrowserWindowHandle } from "../../page-objects/back-office-portal/general/GlobalPageObject/GlobalBrowserWindowHandle";
import { GlobalPageObject } from "../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { Login } from "../../page-objects/back-office-portal/general/login-logout/Login";
import { setAccessTokenBop } from "../../shared/access-token/access-token";
import { defaultTimeOut } from "../../shared/constants";
import { env } from "../../shared/env.config";
import { getLineInFileTxt, logFailTestcase, logInfoMessage } from "../../shared/functions";
import { StepScreenshot } from "../../shared/stepscreenshot";
import { SystemLanguageIndex } from "../../shared/system-language-index/SystemLanguageIndex";
import { setTenantSetting } from "../../shared/tenant-setting/tenant-setting-get-object";
import { setUserProfile } from "../../shared/user-profile/get-user-profile-object";
import { fileNameLogin, resetDataTestcase, resetSubErrorMessage, scenarioTags, setCurrentUrl, setScenarioName } from '../../shared/variables';
import { deleteAllOldFilesDataTestcase } from "../../storage-data/functions/data-test-case";
import * as logger from "../logger.service";
import { SeleniumWebDriverService } from "../selenium-webdriver.service";

let driver: WebDriver;
let driverService: SeleniumWebDriverService;
let globalPageObject: GlobalPageObject;
let globalBrowserWindowHandle: GlobalBrowserWindowHandle;
setDefaultTimeout(defaultTimeOut);

const test_execution_id = "SAAS-22292";
const test_case_id = "SAAS-22362";


const RUN_ONLY_API = env().RUN_ONLY_API == "true";
BeforeAll(async () => {
  if (RUN_ONLY_API) return;
  console.time('Execution Time');
  //driver = Utilities.createSeleniumDriverSession();
  //driverService = new SeleniumWebDriverService(driver);
  driverService = SeleniumWebDriverService.getInstance();
  driver = driverService.create();
  globalPageObject = new GlobalPageObject(driverService);
  globalBrowserWindowHandle = new GlobalBrowserWindowHandle(driverService);
  await driverService.maximizeWindow();
  await deleteAllOldFilesDataTestcase();
});

// tslint:disable-next-line: only-arrow-functions
// Before({tags: '@ignore'}, async function() {
//     return 'skipped';
// });

Before(async function (scenario) {
  if (RUN_ONLY_API) return;
  driver.manage().deleteAllCookies();
  this.context = {
    ...this.context,
    driver,
    driverService,
  };
  setScenarioName(scenario.pickle.name || '');
  scenarioTags.clear();
  scenario.pickle.tags.forEach(function (element) { scenarioTags.add(element.name) });// Add tag to scenarioTags
  resetSubErrorMessage();
  resetDataTestcase();
  SystemLanguageIndex.setValue();
  await globalPageObject.clearAllFileInFolderBeforeDownload("");
});

//This Hook use for Smoke test, browser will logout after every Testcase
After({ tags: "not @RegressionTest" }, async function (this: World, hookForResult: any) {
  if (RUN_ONLY_API) return;
  const scenarioResult = hookForResult.result.status;
  const scenarioName = hookForResult.pickle.name;
  switch (scenarioResult) {
    case Status.PASSED: {
      logger.info(`Scenario Passed: ${scenarioName}`);
      break;
    }
    case Status.FAILED: {
      logger.error(`Scenario Failed: ${scenarioName}`);

      // Attach screen shot to report
      const buffer = await driver.takeScreenshot();
      this.attach(buffer, "image/png");
      driverService.takeScreenShot(scenarioName);
      break;
    }
    case Status.PENDING: {
      // Attach screen shot to report
      const buffer = await driver.takeScreenshot();
      this.attach(buffer, "image/png");
      driverService.takeScreenShot(scenarioName);
      break;
    }
  }
  //added this to make sure "takeScreenShot the errors" happen before pressed logout
  await globalPageObject.closeOpeningForm();
  await globalPageObject.navigateToMainLogOut();
});

//This Hook use for Regresstion test, browser will NOT logout after every Testcase
After({ tags: "@RegressionTest" }, async function (this: World, hookForResult: any) {
  if (RUN_ONLY_API) return;
  const scenarioResult = hookForResult.result.status;
  const scenarioName = hookForResult.pickle.name;
  switch (scenarioResult) {
    case Status.PASSED: {
      logger.info(`Scenario Passed: ${scenarioName}`);
      break;
    }
    case Status.FAILED: {
      logger.error(`Scenario Failed: ${scenarioName}`);

      // Attach screen shot to report
      const buffer = await driver.takeScreenshot();
      this.attach(buffer, "image/png");
      driverService.takeScreenShot(scenarioName);
      break;
    }
    case Status.PENDING: {
      // Attach screen shot to report
      const buffer = await driver.takeScreenshot();
      this.attach(buffer, "image/png");
      driverService.takeScreenShot(scenarioName);
      break;
    }
  }
  await globalPageObject.closeOpeningForm();
});

BeforeStep(async function (this: World, hookForResult: any) {
  if (RUN_ONLY_API) return;
  const curUrl = await globalBrowserWindowHandle.getCurrentUrl();
  //   const url = getLineInFileTxt('./data/data_default.txt', 0).substring(4);
  //   const login = Loging
  //     await login.navigate(url);
});

AfterStep(async function (this: World, hookForResult: any) {
  if (RUN_ONLY_API) return;
  setCurrentUrl(await globalBrowserWindowHandle.getCurrentUrl());
  const scenarioName = hookForResult.pickle.name;
  if (StepScreenshot.getInstance().isCaptured()) {
    const buffer = await driver.takeScreenshot();
    this.attach(buffer, "image/png");
    driverService.takeScreenShot(scenarioName);
    StepScreenshot.getInstance().captureThisStep(false);
  }
});

AfterAll(async () => {
  if (RUN_ONLY_API) return;
  await driver.quit();
  console.timeEnd('Execution Time');
});
