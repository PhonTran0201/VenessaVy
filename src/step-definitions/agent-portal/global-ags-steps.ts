import { Before, Given, When } from "@cucumber/cucumber";
import { CustomerFormAGS } from "../../page-objects/agent-portal/hogs/customer/CustomerFormAGS";
import { CustomerListAGS } from "../../page-objects/agent-portal/hogs/customer/CustomerListAGS";
import { GlobalPageObject } from "../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { logFailTestcase, randomModulus11ForSSN } from "../../shared/functions";
import { ICommonContext } from "../../shared/interfaces";
import { scenarioTags } from "../../shared/variables";

const loader = require("csv-load-sync");

let customerListAGS: CustomerListAGS;
let customerFormAGS: CustomerFormAGS;
let globalPageObject: GlobalPageObject;
Before(async function () {
    const context: ICommonContext = this.context;
    customerListAGS = new CustomerListAGS(context.driverService);
    customerFormAGS = new CustomerFormAGS(context.driverService);
    globalPageObject = new GlobalPageObject(context.driverService);
    
});


Given("User presses {string} button on {string} - agent portal", async (buttonName:string, positionName) => {
    let temp = true;
    if (buttonName.localeCompare("Apply for guarantee") === 0) {
        temp = await customerListAGS.clickApplyForGuaranteeButton();
    } else if (buttonName.localeCompare("Apply for frame agreement") === 0) {
        temp = await customerListAGS.clickApplyForFrameAgreementButton();
    }
    logFailTestcase(temp, `press ${buttonName} button on ${positionName} - agent portal failed!`)
});

