import { fail } from "assert";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import {
  Key,
  Locator,
  WebDriver,
  WebElement,
  until
} from "selenium-webdriver";
import { waitForElementTimeOut } from "../shared/constants";
import { settings } from "../shared/settings";
import { StepScreenshot } from "../shared/stepscreenshot";
// import { ExpectedConditions } from 'protractor/globals';
import { pushSubErrorMessage, subErrorMessages } from '../shared/variables';
import { Utilities } from "./utilities";
export class SeleniumWebDriverService {
  protected driver: WebDriver | any;

  private constructor() {

  }

  private static instance: SeleniumWebDriverService;

  public static getInstance(): SeleniumWebDriverService {
    if (!SeleniumWebDriverService.instance) {
      SeleniumWebDriverService.instance = new SeleniumWebDriverService();
    }
    return SeleniumWebDriverService.instance;
  }

  public create(): WebDriver {
    if (this.driver == null) {
      this.driver = Utilities.createSeleniumDriverSession();
    }
    return this.driver;
  }

  public getDriver() {
    return this.driver;
  }

  public async goto(url: string) {
    return await this.driver.get(url);
  }

  //Author: Bruce 
  //Use to clear localStorage which contains authentication info and will log users out
  public async clearLocalStorage() {
    await this.driver.executeScript(`localStorage.clear()`);
    await this.refreshPage();
  };

  //use to get accessToken from localStorage
  public async getAccessToken() {
    let r: any;
    r = await this.driver.executeScript(`return JSON.parse(JSON.stringify(localStorage))`);
    let accessToken: any;
    for (var i in Object.keys(r)) {
      if (Object.keys(r)[i].includes('accessToken')) {
        accessToken = Object.keys(r)[i];
      }
    }
    return r[accessToken];
  }


  public async checkDisplay(locator: Locator) {
    let check = await (await this.driver.findElement(locator)).isDisplayed();
    return check;
  }

  //Author: Will
  //Use to format all date to DD/MM/YYYY format
  public formatDate(date: string) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("/");
  }

  //Author: Henry
  //Input: parameter 1: Name of TestCase - string
  //       parameter 2,3,4...: array of string with size = 3,
  ///       ["acutalValue", "ExpectedValue", "Message if Failed"]
  public async validateTestCase(nameTestCase: string, ...assert: any[]) {
    let count = 0;
    for (const element of assert) {
      //name: Name of TestCase to validate
      //in array assert[]:  assert[0] = actual,   assert[1] = expected,   assert[2] = message
      if (element[0].localeCompare(element[1]) === 0) {
        //console.log(element[1] + ": OK");
      } else {
        count++;
        console.log("");
        console.warn("\x1b[36m", element[2]); //Warning by message (Cyan foreground color)
        console.error("\x1b[33m%s\x1b[0m", "Actual: " + element[0]); //Yellow foreground color = \x1b[33m%s\x1b[0m
        console.error(
          "\x1b[33m%s\x1b[0m",
          "Expected: " + element[1],
          "\x1b[0m"
        ); // then reset foreground color

        pushSubErrorMessage(element[2] + "\n\t\t\tActual: " + element[0] + "\n\t\t\tExpected: " + element[1]);
      }
    }

    if (count === 0) {
      //If passed
      console.info(
        "\x1b[32m",
        nameTestCase + ": Test Case is passed!",
        "\x1b[0m"
      ); //Green foreground color = "\x1b[32m", then reset color "\x1b[0m"
    } else {
      fail("\n" + nameTestCase + ": Test Case is failed!" + subErrorMessages);
    }
  }


  /**
   * 
   * @param nameRecord Name of record - string
   * @param assert 
   * parameter 2,3,4...: array of string with size = 3,
   * ["acutalValue", "ExpectedValue", "Message if Failed"]
   * @returns true if actualValue === ExpectedValue
   */
  public async validateRecord(nameRecord: string, ...assert: any[]): Promise<boolean> {
    let count = 0;
    for (const element of assert) {
      //name: Name of Record to validate
      //in array assert[]:  assert[0] = actual,   assert[1] = expected,   assert[2] = message
      if (element[0].localeCompare(element[1]) === 0) {
        //Show something...
      } else {
        count++;
        console.warn("\x1b[36m", element[2]); //Warning by message (Cyan foreground color)
        console.error("\x1b[33m%s\x1b[0m", "\tActual: " + element[0]); //Yellow foreground color = \x1b[33m%s\x1b[0m
        console.error(
          "\x1b[33m%s\x1b[0m",
          "\tExpected: " + element[1],
          "\x1b[0m"
        ); // then reset foreground color

        pushSubErrorMessage(element[2] + "\n\t\t\tActual: " + element[0] + "\n\t\t\tExpected: " + element[1]);
      }
    }

    if (count === 0) {
      //If passed
      console.info("\x1b[32m", nameRecord + ": Test passed!", "\x1b[0m"); //Green foreground color = "\x1b[32m", then reset color "\x1b[0m"
      return true;
    } else {
      console.info("\x1b[31m" + nameRecord + ": Test failed!", "\x1b[0m");
      return false;
    }
  }

  public async validateRecordUsedForSearch(nameRecord: string, ...assert: any[]): Promise<boolean> {
    let count = 0;
    for (const element of assert) {
      //name: Name of Record to validate
      //in array assert[]:  assert[0] = actual,   assert[1] = expected,   assert[2] = message
      if (element[0].toLowerCase().trim().includes(element[1].toLowerCase().trim())) {
        //Show something...
      } else {
        count++;
        console.warn("\x1b[36m", element[2]); //Warning by message (Cyan foreground color)
        console.error("\x1b[33m%s\x1b[0m", "\tActual: " + element[0]); //Yellow foreground color = \x1b[33m%s\x1b[0m
        console.error(
          "\x1b[33m%s\x1b[0m",
          `\tExpected: "${element[1]}" should be included in "${element[0]}"`,
          "\x1b[0m"
        ); // then reset foreground color

        pushSubErrorMessage(element[2] + "\n\t\t\tActual: " + element[0] + `\n\t\t\tExpected: "${element[1]}" should be included in "${element[0]}"`);
      }
    }

    if (count === 0) {
      //If passed
      console.info("\x1b[32m", nameRecord + ": Test passed!", "\x1b[0m"); //Green foreground color = "\x1b[32m", then reset color "\x1b[0m"
      return true;
    } else {
      console.info("\x1b[31m" + nameRecord + ": Test failed!", "\x1b[0m");
      return false;
    }
  }

  public async canBeSetText(locator: Locator): Promise<boolean> {
    try {
      await (await this.driver.findElement(locator)).sendKeys(Key.CONTROL + "a");
      await (await this.driver.findElement(locator)).sendKeys(Key.DELETE);
      return true;
    } catch (error) {
      return false;
    }
  }
  //Author: Henry
  public async isExisted(locator: Locator): Promise<boolean> {
    let count = (await this.driver.findElements(locator)).length;
    if (count > 0) {
      return true;
    } else {
      return false;
    }
  }
  //Author: Henry
  public async getActiveElement(): Promise<WebElement> {
    return await this.driver.switchTo().activeElement();
  }

  //Author: Henry
  public async pressTabCurrentElement() {
    await (await this.getActiveElement()).sendKeys(Key.TAB);
  }

  //Author: Henry
  public async pressEnterCurrentElement() {
    await (await this.getActiveElement()).sendKeys(Key.ENTER);
  }

  //Author: Henry
  public async waitUntilElementLoaded(locator: Locator, TimeOut: number = waitForElementTimeOut) {
    await this.driver.wait(until.elementLocated(locator), TimeOut, `\n-\t${locator}\n\t=> Element was not located!`);
  }

  //Author: Henry
  public async waitUntilElementVisible(locator: Locator, TimeOut: number = waitForElementTimeOut) {
    const webElement = await this.driver.wait(until.elementLocated(locator), TimeOut, `\n-\t${locator}\n\t=> Element was not located!`);
    await this.driver.wait(until.elementIsVisible(webElement), TimeOut, `\n-\t${locator}\n\t=> Element was not visible!`);
    await this.scrollElementToView(await this.findElement(locator));
    await this.driver.sleep(10);
  }

  //Author: Henry
  public async waitUntilElementIsNotVisible(locator: Locator, TimeOut: number = waitForElementTimeOut) {
    if(await this.isExisted(locator)){
      await this.driver.wait(until.elementIsNotVisible(await this.findElement(locator)), TimeOut, `\n-\t${locator}\n\t=> Element is still visible!`);
    }
  }

  //Author: Harry
  public async acceptAlert() {
    await this.driver.wait(until.alertIsPresent(), waitForElementTimeOut, "Alert was not presented");
    await this.driver.switchTo().alert().accept();
  }
  public async dismissAlert() {
    await this.driver.switchTo().alert().dismiss();
  }
  public async getTextAlert(){
    await this.driver.switchTo().alert().getText();
  }
  //Author: Henry
  // Switch_to the <iframe>
  public async switchToFrame(locator: Locator) {
    await this.driver.switchTo().frame(await this.driver.findElement(locator));
  }

  //Author: Henry
  // switch back to the default content (out of the <iframe>)
  public async switchToDefaultContent() {
    await this.driver.switchTo().defaultContent();
  }

  //Author: Henry
  public async clearOldDataIntoField(...locators: Locator[]) {
    for (const element of locators) {
      await (await this.driver.findElement(element)).sendKeys(
        Key.CONTROL + "a"
      );
      await (await this.driver.findElement(element)).sendKeys(Key.DELETE);
    }
  }

  //Author: Henry
  //This function is used for drag and drog Sale card view at Sale list
  public async dragAndDrop(sourceLocator: Locator, destinationLocator: Locator) {
    let source = await this.driver.findElement(sourceLocator);
    let destination = await this.driver.findElement(destinationLocator);
    let actions = this.driver.actions();
    await actions.move({ duration: 1000, origin: source }).press().move({ duration: 2000, origin: destination }).press().move({ duration: 2000, origin: destination }).release().perform();
  }

  //This function will drag the source to the rightmost position of destination 
  public async dragAndDropv2(sourceLocator: Locator, destinationLocator: Locator) {
    let source = await this.driver.findElement(sourceLocator);
    let destination = await this.driver.findElement(destinationLocator);
    let actions = this.driver.actions();
    await actions.move({ duration: 2000, origin: source }).press().move({ duration: 2000, origin: destination }).press().move({ duration: 2000, origin: destination, x: 120, y: 20 }).release().perform();
  }

  //Author: Will
  public async waitUntilDisplayed2Click(locator: Locator) {
    if (await this.checkDisplay(locator)) {
      (await this.driver.findElement(locator)).click();
    } else {
      await this.waitUntilElementLoaded(locator);
      (await this.driver.findElement(locator)).click();
    }
  }

  //Author: Will
  public async waitUntilElementCanBeClickable(
    locator: Locator,
    TimeOut: number = waitForElementTimeOut
  ) {
    let element: WebElement;
    element = this.driver.findElement(locator);

    try {
      await (await this.driver.findElement(locator)).click();
    } catch (error) {
      await this.driver.wait(until.elementTextIs(element, ""), TimeOut);
      await (await this.driver.findElement(locator)).click();
    }
  }

  public async pressTab(locator: Locator) {
    const element = await this.findElement(locator);
    await element.sendKeys(Key.TAB);
  }

  public async pressShift_TabCurrentElement() {
    let keys = Key.chord(Key.SHIFT, Key.TAB);
    await (await this.getActiveElement()).sendKeys(keys);
  }

  public async pressEnter(locator: Locator) {
    const element = await this.findElement(locator);
    await element.sendKeys(Key.ENTER);
  }
  public async pressBackspace(locator: Locator) {
    const element = await this.findElement(locator);
    await element.sendKeys(Key.BACK_SPACE);
  }
  public async pressEscape(locator: Locator) {
    const element = await this.findElement(locator);
    await element.sendKeys(Key.ESCAPE);
  }
  public async pressUpCurrentElement() {
    await (await this.getActiveElement()).sendKeys(Key.ARROW_UP);
  }
  public async pressDownCurrentElement() {
    await (await this.getActiveElement()).sendKeys(Key.ARROW_DOWN);
  }
  public async pressPageUpCurrentElement() {
    await (await this.getActiveElement()).sendKeys(Key.PAGE_UP);
  }
  public async pressPageDownCurrentElement() {
    await (await this.getActiveElement()).sendKeys(Key.PAGE_DOWN);
  }
  public async pressCtrlCurrentElement() {
    await (await this.getActiveElement()).sendKeys(Key.CONTROL);
  }
  public async pressUp(locator: Locator) {
    const element = await this.findElement(locator);
    await element.sendKeys(Key.ARROW_UP);
  }
  public async pressPageUp(locator: Locator) {
    const element = await this.findElement(locator);
    await element.sendKeys(Key.PAGE_UP);
  }
  public async pressDown(locator: Locator) {
    const element = await this.findElement(locator);
    await element.sendKeys(Key.ARROW_DOWN);
  }
  public async getCurrentUrl(): Promise<string> {
    return await this.driver.getCurrentUrl();
  }

  public async findElement(locator: Locator): Promise<WebElement> {
    return await this.driver.findElement(locator);
  }

  public async findElements(locator: Locator): Promise<WebElement[]> {
    return await this.driver.findElements(locator);
  }

  public async checkElementExist(locator: Locator) {
    try {
      if (await this.driver.findElement(locator) != null) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  public async waitForSeconds(time: number) {
    await this.driver.sleep(time);
  }

  public async waitUntilPageLoaded() {
    this.driver.wait(async () => {
      return await this.driver
        .executeScript("return document.readyState")
        .then((readyState) => {
          return readyState === "complete";
        });
    });
  }

  public async waitUntilElementLoadedAndDisplayed(
    locator: Locator
  ): Promise<WebElement> {
    const locatorValue = JSON.stringify(locator);
    await this.driver.wait(
      until.elementLocated(locator),
      waitForElementTimeOut,
      `Element not located: ${locatorValue}`
    );
    const element = await this.findElement(locator);
    await this.driver.wait(
      until.elementIsVisible(element),
      waitForElementTimeOut,
      `Element not visible: ${locatorValue}`
    );

    return await this.driver.findElement(locator);

  }

  public async waitUntilPageElementsLoadedAndDisplayed(
    locators: Locator[]
  ): Promise<WebElement[]> {
    const elements = locators.map(async (locator) =>
      this.waitUntilElementLoadedAndDisplayed(locator)
    );

    return Promise.all(elements);
  }

  public async waitForElementInVisible(locator: Locator): Promise<any> {
    const locatorValue = JSON.stringify(locator);
    await this.driver.wait(
      async () => (await this.findElements(locator)).length === 0,
      waitForElementTimeOut,
      `Element not invisible: ${locatorValue}`
    );
  }

  public async setScreenSize(width: number, height: number) {
    await this.driver.manage().window().setSize(width, height);
  }

  public async maximizeWindow() {
    await this.driver.manage().window().maximize();
  }

  public async openNewTabBrowser() {
    // await (await this.getActiveElement()).sendKeys(Key.CONTROL + Key.ENTER);
    const handle = (await this.getAllWindowHandles())[(await this.getAllWindowHandles()).length - 1];
    // await this.switchToWindow(handle);
    //await this.waitForSeconds(1000);
    await this.driver.switchTo().newWindow(handle);
  }

  // public async closeTabBrowser(){
  //   await this.driver.close();
  // }
  public async closeTabBrowser() {
    await this.waitForSeconds(1000);
    await this.driver.close()[0];
  }
  public async switchToPreviousTabBrowser() {
    const previousHandleIndex = 0;
    const handle = (await this.getAllWindowHandles())[previousHandleIndex];
    await this.switchToWindow(handle);
  }

  public async switchToSecondTabBrowser() {
    const handle = (await this.getAllWindowHandles())[1];
    await this.switchToWindow(handle);
  }

  public async getAllWindowHandles() {
    return await this.driver.getAllWindowHandles();
  }

  public async getWindowHandle() {
    return await this.driver.getWindowHandle();
  }

  public async switchToWindow(windowHandle: string) {
    await this.driver.switchTo().window(windowHandle);
  }

  public async closeCurrentWindow() {
    await this.driver.close();
  }

  public async click(locator: Locator) {
    await this.driver.findElement(locator).click();
  }

  public async submit(locator: Locator) {
    await this.driver.findElement(locator).submit();
  }

  public async getText(locator: Locator): Promise<string> {
    return await this.driver.findElement(locator).getText();
  }

  public async isEmpty(locator: Locator): Promise<boolean> {
    let check = await this.driver.findElement(locator).getText();
    if (check.localeCompare("") === 0) {
      return true;
    } else return false;
  }

  public async getAttributeValue(
    locator: Locator,
    attribute: string
  ): Promise<string> {
    var returnText = "";
    await this.driver
      .findElement(locator)
      .getAttribute(attribute)
      .then(async function (text) {
        returnText = text;
      });
    return returnText;
  }

  public async setText(locator: Locator, value: string) {
    await (await this.driver.findElement(locator)).sendKeys(Key.CONTROL + "a");
    await (await this.driver.findElement(locator)).sendKeys(Key.DELETE);
    await this.driver.findElement(locator).sendKeys(value);
  }

  public async sendKeys(locator: Locator, keys: any) {
    await (await this.driver.findElement(locator)).sendKeys(keys);
  }

  public async clearText(locator: Locator) {
    const element = await this.findElement(locator);
    const text = await element.getAttribute("value");
    const textLength = text.length;

    for (let i = 0; i < textLength; i++) {
      await element.sendKeys(Key.BACK_SPACE);
    }
  }

  public async refreshPage() {
    await this.driver.navigate().refresh();
  }

  public async back() {
    await this.driver.navigate().back();
  }

  public async forward() {
    await this.driver.navigate().forward();
  }

  public async waitForElementEnabled(locator: Locator) {
    await this.driver.wait(
      until.elementIsEnabled(await this.findElement(locator)),
      waitForElementTimeOut,
      "Element should be enabled"
    );
  }

  public async scrollElementToView(element: WebElement) {
    await this.driver.executeScript(
      "arguments[0].scrollIntoView(true); window.scrollBy(0, -window.innerHeight / 4);",
      element
    );
  }

  public async takeScreenShot(name: string) {
    if (!name) {
      throw new Error("Unable to save screenshot, the name is not defined");
    }

    const data = await this.driver.takeScreenshot();

    const screenshotPath = join(
      settings.outputs.path,
      settings.outputs.screenShotPath
    );

    if (!existsSync(screenshotPath)) {
      mkdirSync(screenshotPath, { recursive: true });
    }
    try {
      const filename = join(screenshotPath, `${name}.png`);
      writeFileSync(filename, data, { encoding: "base64", flag: "w" });
      console.log("File name is: " + filename);
    } catch (error) {
      console.log(error);
    }
  }

  //Author: James
  public async getDownLoadedPath() {
    try {
      await this.openNewTabBrowser();
      await this.driver.sleep(3000);
      // # navigate to chrome downloads
      await this.driver.get('chrome://downloads');
      let FilePath = "";
      FilePath = await this.driver.executeScript("return document.querySelector('downloads-manager').shadowRoot.querySelector('#downloadsList downloads-item').shadowRoot.querySelector('div#content  #show').title");
      await this.switchToPreviousTabBrowser();
      return FilePath;
    }
    catch (error) {
      console.log('getDownLoadedPath');
      console.log(error);
      return "";
    }
  }

  //Author: James
  public async getDownLoadedFileName() {
    try {
      await this.openNewTabBrowser();
      //await this.driver.sleep(3000);
      // # navigate to chrome downloads
      await this.driver.get('chrome://downloads');
      await StepScreenshot.getInstance().captureThisStep(true);
      let FilePath = "";
      let downloadPercentage = 0;
      let waitCount = 0;
      const getPercentJS = "return document.querySelector('downloads-manager').shadowRoot.querySelector('#downloadsList downloads-item').shadowRoot.querySelector('#progress').value";
      const getFileJS = "return document.querySelector('downloads-manager').shadowRoot.querySelector('#downloadsList downloads-item').shadowRoot.querySelector('div#content  #file-link').text";
      while (waitCount <=30) {
        waitCount++;
        await this.driver.sleep(1000);
        try {
          FilePath = await this.driver.executeScript(getFileJS);
        } catch (e) {
          console.warn(e);
        }
        if (FilePath != "") {
          await this.switchToPreviousTabBrowser();
          return FilePath;
        }
      }
      // let downloadPercentage = await this.driver.execute_script(
      //   "return document.querySelector('downloads-manager').shadowRoot.querySelector('#downloadsList downloads-item').shadowRoot.querySelector('#progress').value")
      // FilePath = await this.driver.executeScript("return document.querySelector('downloads-manager').shadowRoot.querySelector('#downloadsList downloads-item').shadowRoot.querySelector('div#content  #file-link').text");
      // await this.switchToPreviousTabBrowser();
      // return FilePath;
    }
    catch (error) {
      console.log('getDownLoadedFileName');
      console.log(error);
      return "";
    }
  }

  public async mouseHover(locator: Locator) {
    let destination = await this.driver.findElement(locator);
    let actions = this.driver.actions();
    await actions.move({ duration: 1000, origin: destination }).perform();
  }
}
