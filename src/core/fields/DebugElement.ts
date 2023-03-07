import { By, Locator, WebElement } from "selenium-webdriver";
export class DebugElement {
    private static instance: DebugElement;

    private constructor() { }

    public static getInstance(): DebugElement {
        if (!DebugElement.instance) {
            DebugElement.instance = new DebugElement();
        }
        return DebugElement.instance;
    }

    async dump(webElement: WebElement, index = '') {
        console.log(`Start Dump ${index}:`)
        const tagName = (await webElement.getTagName());
        const isDisplay = (await webElement.isDisplayed());
        const innerHTML = (await webElement.getAttribute("innerHTML"));
        const outerHTML = (await webElement.getAttribute("outerHTML"));
        const innerText = (await webElement.getAttribute("innerText"));
        const style = (await webElement.getAttribute("style"));
        const lblfor = (await webElement.getAttribute("for"));
        const iEnabled = (await webElement.isEnabled());
        console.log(`@tagName: ${tagName}`);
        console.log(`@isDisplay: ${isDisplay}`);
        console.log(`@iEnabled: ${iEnabled}`);
        console.log(`@innerHTML: ${innerHTML}`);
        console.log(`@outerHTML: ${outerHTML}`);
        console.log(`@innerText: ${innerText}`);
        console.log(`@style: ${style}`);
        console.log(`@for: ${lblfor}`);
        console.log(`End Dump.`);
    }

    async dumps(webElements) {
        let count = 0;
        for (let webEle of webElements) {
            await this.dump(webEle, count.toString());
            count++;
            console.log(`*****`);
        }
    }

    async highlight(driverService, locator: By, renderTimeout = 0, style ="border: 3px solid #f44786;") {
        const locatorValue = JSON.stringify(locator);
        await driverService.waitUntilElementLoadedAndDisplayed(locator);
        const webEle = await driverService.waitUntilElementLoadedAndDisplayed(locator);
        //console.log(`Highlight for element ${locatorValue}`);
        //await this.dump(webEle);
        // const jsFocus = `arguments[0].scrollIntoView(true)`;
        // await driverService.driver.executeScript(jsFocus, webEle);
        // const jsAttr = 'var items = {}; for (index = 0; index < arguments[0].attributes.length; ++index) { items[arguments[0].attributes[index].name] = arguments[0].attributes[index].value }; return items;';
        // await driverService.driver.executeScript(jsAttr, webEle);
        //const jsHighlight = `arguments[0].setAttribute('style', 'background: #f44786; border: 2px solid #f44786;')`;
        const jsHighlight = `arguments[0].setAttribute('style', '${style}')`;
        await driverService.driver.executeScript(jsHighlight, webEle);
        if (renderTimeout<1) return;
        await driverService.driver.sleep(renderTimeout);
        const jsUnhighlight = `arguments[0].removeAttribute('style', '')`;
        await driverService.driver.executeScript(jsUnhighlight, webEle);
    }
}