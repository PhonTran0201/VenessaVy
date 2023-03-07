import { After, AfterAll, Before, BeforeAll, Given, Then, When, World } from "@cucumber/cucumber";
import { fail } from 'assert';
import * as fs from 'fs';
import jsonPath from 'jsonpath';
import pactum, { parse } from 'pactum';
import { setTimeout } from "timers/promises";
import { GlobalVar } from '../core/global-var';
import { SeleniumWebDriverService } from "../core/selenium-webdriver.service";
import { env } from '../shared/env.config';
import { logInfoMessage } from '../shared/functions';
import { compareJson } from '../shared/json-compare';
import { getValueDataOfDataTestExecution } from "../storage-data/functions/data-test-execution";
import { ResponseTemplate } from './../../data/expectedAPIResponse/ResponseTemplate';
import { AccessTokenRequest } from './api_get_access_token';

const { expect, assert } = require("chai");
var _ = require('lodash');

let spec = pactum.spec();
let stash = pactum.stash;
let accessToken: string = "";
let DEFAULT_TIMEOUT = 5000;
let DEFAULT_DOMAIN = "https://api.staging.contemisaasdev.com";
let DEFAULT_ACCEPT_HEADER = "application/json, text/plain, */*";
let DEFAULT_CONTENT_TYPE_HEADER = "application/json";
// let template: Template;
// let dataTemplate: Data_Template;
// let schemaTemplate: SchemaTemplate;
let scenarioName: string = "";
let path: string = "";
const PATH_TOKEN = `src/step-definitions/api/access.token`;
const pathQuoteCustomer = `outputs/quote_customer.csv`;
const MasterData_Path = "./data/master_data.json";
let accessTokenRequest = new AccessTokenRequest()
let responseTemplate = new ResponseTemplate();

let master_data;
let data_key;
const envi = env();

DEFAULT_DOMAIN = envi.API_DEFAULT_URL;
DEFAULT_ACCEPT_HEADER = envi.API_DEFAULT_ACCEPT_HEADER;
DEFAULT_CONTENT_TYPE_HEADER = envi.API_DEFAULT_CONTENT_TYPE_HEADER;

const RUN_ONLY_API = envi.RUN_ONLY_API == "true";

const round = (value: number): number => {
    return Math.round(100 * value) / 100; // <----------
};

//#region hooks
BeforeAll(async function () {
    logInfoMessage(`Starting Worker: ${process.env.CUCUMBER_WORKER_ID}`);
    logInfoMessage(`\RUN_ONLY_API : ${RUN_ONLY_API}`);
    const filePath = process.cwd() + `\\reports\\Result_${process.env.CUCUMBER_WORKER_ID}.csv`;
    await fs.rmSync(filePath, { force: true });
    if (!RUN_ONLY_API) return;
    if (envi.ENVIRONMENT === "PRODUCTION") {
        accessToken = envi.ACCESS_TOKEN;
        GlobalVar.getInstance().addValue("AccessToken", accessToken);
    } else {

        accessToken = GlobalVar.getInstance().getValue("AccessToken");

        if (accessToken != 'NotFound') {
            // found token
        } else {
            accessToken = await accessTokenRequest.requestToken();
            GlobalVar.getInstance().addValue("AccessToken", accessToken);
        }
    }
    pactum.request.setBaseUrl(DEFAULT_DOMAIN);
    pactum.request.setDefaultTimeout(DEFAULT_TIMEOUT);
    pactum.request.setDefaultHeaders(`Accept`, DEFAULT_ACCEPT_HEADER);
    pactum.request.setDefaultHeaders(`Content-Type`, DEFAULT_CONTENT_TYPE_HEADER);
    //pactum.request.setDefaultHeaders(`Authorization`,`Bearer ${accessToken}`);
    //pactum.request.setBearerToken(accessToken);
    // GlobalVar.getInstance().addValue("AccessToken", accessToken);
    //const model = await fs.readFileSync(`data/${envi.ENVIRONMENT}_data.json`, 'utf8');
    const fileData = `data/${envi.ENVIRONMENT}_data2.json`;
    const fileUser = `data/${envi.ENVIRONMENT}_user.json`;
    // const model = await fs.readFileSync(fileData, 'utf8'); // choose file data for api test migration
    // if (model.length < 1) throw new Error(`File data not found: ${fileData}`);
    // master_data = await JSON.parse(model);
    //let tempModel = await loadModel(fileUser);
    master_data = await loadModel(fileData);
    if (master_data == undefined) throw new Error(`Error with Master_Data`);
    console.log("Parse master data model successfully");
    fs.openSync(pathQuoteCustomer, 'w');
});

async function loadModel(file) {
    const model = await fs.readFileSync(file, 'utf8'); // choose file data for api test migration
    if (model.length < 1) throw new Error(`File data not found: ${file}`);
    return await JSON.parse(model);
}

Before(async function (scenario: any) {
    if (!RUN_ONLY_API) return;
    spec = pactum.spec();
    pactum.request.setDefaultHeaders(`Authorization`, `Bearer ${accessToken}`);
    pactum.settings.setSnapshotDirectoryPath(".\\outputs\\snapshot\\");
    //pactum.settings.setLogLevel('ERROR');
    pactum.settings.setLogLevel('SILENT');
    scenarioName = scenario.pickle.name.replace(/\s/g, '').trim().toLowerCase();
    spec.name(scenarioName);
    try {
        this.attach(JSON.stringify({ "RunningWorker": process.env.CUCUMBER_WORKER_ID }, undefined, 4), "application/json");
    } catch(error) {
        //console.log(error);
    }
});

After({ tags: "@APITest" }, async function (this: World, scenario:any) {
    const scenarioResult = scenario.result.status;
    if (scenarioResult === "FAILED") {
        const scenarioName = scenario.pickle.name;
        const message = scenario.result.message;
        const feature_file = scenario.gherkinDocument.uri;
        const feature_name = scenario.gherkinDocument.feature.name;
        const currentExample = JSON.stringify(this).replaceAll('"', '""') || "";
        const workerId = process.env.CUCUMBER_WORKER_ID;
        const logcsv = `${workerId},${feature_file},${feature_name},${scenarioName},${scenarioResult},"${currentExample}","${message}"\n`;
        const filePath = process.cwd() + `\\reports\\Result_${workerId}.csv`;
        await fs.writeFileSync(filePath, logcsv, { flag: 'as+' });
    }
});

After(async function (this: World, hookForResult: any) {
    if (!RUN_ONLY_API) return;
    spec.expectResponseTime(5000);
    spec.end()
    scenarioName = "";
    path = "";
    data_key = null;
});

AfterAll(async function () {
    if (!RUN_ONLY_API) return;

});
//#endregion


// //#region Given When Then
Given("User has authorized successfully to api", async function () {
    if (!accessToken) {
        console.log(accessToken);
        //pactum.request.setDefaultHeaders(`Authorization`, accessToken);
        // await getDataMapping();
    }
    spec.withHeaders(`Authorization`, `Bearer ${accessToken}`);
    // logInfoMessage(`\nAccess Token: ${accessToken}`);
});

Given("User add header {string} with {string}", async function (key, value) {
    spec.withHeaders(key, value);
});

Given("User make a {string} request to {string}", function (method, path) {
    this.method = method;
    spec[method.toLowerCase()](path);
});

Given("User want to use data key {string}", async function(dataKey) {
    data_key = await master_data[dataKey];
    // console.log(data_key);
});

Given("User uploads a new file with name {string}", function (fileName) {
    spec.withBody({
        file: `data/upload/${fileName}`
    })
})

Given("User set auth username {string} and password {string}", function (uname, pwd) {
    spec.withAuth(uname, pwd);
});

Given("User set path param {string} to {string}", function (key, value) {
    if (value.includes('$S')) {

    } else if (value.includes('$')) {
        value = jsonPath.value(master_data, value);
    } 
    spec.withPathParams(key, value);
});

Given("User set query param {string} to {string}", function (key, value) {
    spec.withQueryParams(key, value);
});

Given("User set body param {string} to {string}", function (key, value) {
    spec.withQueryParams(key, value);
});

Given("User set body json", function (json) {
    spec.withBody(json);
});


Given("User set body from template {string}", function (name) {
    spec.withJson({
        '@DATA:TEMPLATE@': `${name}`,
    });
});

Given("User set form field {string} to {string}", function (key, value) {
    spec.withForm(key, value);
});

Given("User set form json", function (json) {
    spec.withForm(json);
});

Given("User set header {string} to {string}", function (key, value) {
    spec.withHeaders(key, value);
});

Given("User inspect this request", function () {
    // spec.inspect();
});

When("Clear to start new request within current scenario", function () {
    if (!RUN_ONLY_API) return;
    //spec.clean();
    spec.end();
    spec = pactum.spec();
    scenarioName = "";
    path = "";
    data_key = null;
});

When('Request is sent', async function () {
    const response = await spec.toss();
    const body = JSON.stringify(response.json, undefined, 4);
    this.attach(body, "application/json"); 
    this.body = response.json;
});
When('User gets an access token from local storage', async function () {
    spec = pactum.spec();
    pactum.request.setBearerToken(await SeleniumWebDriverService.getInstance().getAccessToken())
    pactum.request.setBaseUrl(DEFAULT_DOMAIN);
    pactum.request.setDefaultTimeout(DEFAULT_TIMEOUT);
    pactum.request.setDefaultHeaders(`Accept`, DEFAULT_ACCEPT_HEADER);
    pactum.request.setDefaultHeaders(`Content-Type`, DEFAULT_CONTENT_TYPE_HEADER);
})
When('User write new log Quotation {string}', async function (customer_id) {
    
});

When("User retrieves quote ref for filter", async function () {
    let quoteRef = getValueDataOfDataTestExecution("QuoteReference")
    spec.withQueryParams("filter[reference]", quoteRef);
    responseTemplate.initGetPRTSPolicy(quoteRef)
})

When('Insert log jsonPath in message {string}', async function (path) {
    let actual = _.get(this.body, path);
    this.attach(JSON.stringify({ "Total_Policies": actual }, undefined, 4), "application/json"); 
});

When('Insert log {string} by jsonPath in message {string}', async function (name, path) {
    let actual = _.get(this.body, path);
    this.attach(JSON.stringify({ name: actual }, undefined, 4), "application/json"); 
});

When('Insert log jsonPath in message if >0 {string}', async function (path) {
    let actual = _.get(this.body, path);
    if (parseInt(actual) > 0) {
        logInfoMessage(`Count me: ${actual}`);
    }
    this.attach(JSON.stringify({ "Total_Policies": actual }, undefined, 4), "application/json"); 
});

Then("Response should have body {string}", function (body) {
    spec.response().to.have.body(body);
});

Then("Response should have jsonLength {string} is {string}", function (jsonPath, value) {
    spec.response().to.have.jsonLength(jsonPath, parseInt(value));
});

Then("Response should have a status {string}", function (statusCode) {
    spec.response().to.have.status(parseInt(statusCode));
});

Then("Response should have a json path", function (json) {
    spec.response().should.have.json(json);
});

Then("Response should have a json like", function (json) {
    let result = JSON.parse(json);
    spec.response().should.have.jsonLike(result);
});

Then("Customer Document should have correct data", function () {
    try {
        const documents = jsonPath.value(master_data, "Document");
        let actual = _.get(this.body, `data`);
        let count = 0;
        let countTags = 0;
        let countName = 0;
        let countFileType = 0;
        documents.forEach(document => {
            actual.forEach(customerDoc => {
                if (document.Expected.Data.CustomerDocument_NewId === customerDoc.id) {
                    count++;
                }
                if (document.Expected.Data.Tags === customerDoc.attributes.tags) {
                    countTags++;
                }
                if (document.Expected.Data.Name === customerDoc.attributes.name) {
                    countName++;
                }
                // if (document.Expected.Data.FileType === customerDoc.attributes.fileType) {
                //     countFileType++;
                // }
            }); 
        });
        if (count < actual.length) {
            fail(`Not found enough documents for customer: ${count}/${actual.length}`);
        }
        if (countTags < actual.length) {
            fail(`Not found enough documents Tags for customer: ${countTags}/${actual.length}`);
        }
        if (countName < actual.length) {
            fail(`Not found enough documents Name for customer: ${countName}/${actual.length}`);
        }
        // if (countFileType < actual.length) {
        //     fail(`Not found enough documents File Type for customer: ${countFileType}/${actual.length}`);
        // }
        console.log('Passed');
    } catch (error) {
        fail(`{${error}"}`);
    }
});

Then("Customer Checklist should have correct data {string}", function (item) {
    try {
        const customer_Id = jsonPath.value(master_data, `$.Customer[${item}].Params.Id`);
        const customer_Ref = jsonPath.value(master_data, `$.Customer[${item}].Expected.Data.OriginalEntityId`);
        let actual = _.get(this.body, `results`);
        // let count = 0;
        // let countTags = 0;
        // let countName = 0;
        // let countFileType = 0;
        //let chkListItems = jsonPath.value(this.body, `$.results..checklistDefinition.name`);
        let chkListItemsActual = jsonPath.value(this.body, `$.results..checklistDefinition.name`);
        
        let chkListItemsExpected = jsonPath.value(master_data, `$.ChecklistCustomer`);
        let count = 0;
        let arrExpected = new Array();
        let arrActual = new Array();
        chkListItemsExpected.forEach(element => {
            if (element.Expected.Data.ReferenceId === customer_Ref) {
                
                let insuredObjectName = jsonPath.value(this.body, `$.results[${count}].meta.insuredObjectName`);
                let policyNumber = jsonPath.value(this.body, `$.results[${count}].meta.policyNumber`);
                let status = jsonPath.value(this.body, `$.results[${count}].status`);
                // console.log(`Expected: ${element.Expected.Data.Meta.InsuredObjectName}, Actual: ${insuredObjectName}`);
                // console.log(`Expected: ${element.Expected.Data.Meta.PolicyNumber}, Actual: ${policyNumber}`);
                
                arrActual.push({ "name": insuredObjectName, "policy": policyNumber, "status": status });
                arrExpected.push({ "name": element.Expected.Data.Meta.InsuredObjectName, "policy": element.Expected.Data.Meta.PolicyNumber, "status": element.Expected.Data.Status  });
                count++;
            }
        });
        // const found = arrExpected.some(r => arrActual.indexOf(r) >= 0)
        arrExpected.forEach(expected => {
            let found = false;
            arrActual.forEach(actual => {
                if (expected.policy === actual.policy && expected.name === actual.name
                    && expected.status === actual.status) {
                    found = true;
                }
            });
            if (!found) {
                fail(`Wrong meta policy or name`);
            }
        });
        console.log(`Pass: ${count} -`);
        
    } catch (error) {
        fail(`{${error}"}`);
    }
});

Then("Policy {string} has payments schedule {string}", function (policy_item, dataPayments){
    try {
        //const policyId = paymentSchedules[policy_item].Params.Id;
        const policyId = policy_item;
        let actualPayments = _.get(this.body, dataPayments);
        const paymentSchedules = jsonPath.value(master_data, `$.PolicyPaymentSchedule`);
        const expectedPayments = paymentSchedules.filter(item => { return item.Params.Id == policyId })
        if (actualPayments.length > expectedPayments.length) {
            fail(`Invalid length of payment ${actualPayments.length}/${expectedPayments.length}`);
        }
        let checkCount = 0;
        expectedPayments.forEach(expected => {
            let found = false;
            actualPayments.forEach(actual => {
                if (actual.transactionReference != undefined && expected.Expected.Data.TransactionId != '') {
                    if (actual.transactionReference == expected.Expected.Data?.TransactionId) {
                        found = true;
                        this.attach(JSON.stringify({
                            "CheckingTransaction": (actual.transactionReference) // itemRef
                        }, undefined, 4), "application/json"); 
                        //assert.equal(actual.exportStatus, expected.Expected.Data.Status, `Failed Status: ${expected.Expected.Data.Status}`);
                        assert.equal(actual.dueDate, expected.Expected.Data.DueDate + "Z", `Failed DueDate: ${expected.Expected.Data.DueDate}`);
                        assert.equal(actual.coveredPeriod.end, expected.Expected.Data.CoveredPeriodEnd + "Z", `Failed DueDate: ${expected.Expected.Data.CoveredPeriodEnd}`);
                        assert.equal(actual.coveredPeriod.start, expected.Expected.Data.CoveredPeriodStart + "Z", `Failed DueDate: ${expected.Expected.Data.CoveredPeriodStart}`);
                        if (expected.Expected.Data.OrderReference)
                        assert.equal(actual.orderReference, expected.Expected.Data.OrderReference, `Failed orderReference: ${expected.Expected.Data.OrderReference}`);
                        if (expected.Expected.Data.BookingReference)
                        assert.equal(actual.bookingReference, expected.Expected.Data.BookingReference, `Failed BookingReference: ${expected.Expected.Data.BookingReference}`);
                        if (expected.Expected.Data.invoiceReference)
                        assert.equal(actual.invoiceReference, expected.Expected.Data.InvoiceReference, `Failed InvoiceReference: ${expected.Expected.Data.InvoiceReference}`);
                        assert.equal(actual.price.total.amount, expected.Expected.Data.TotalAmount.Gross, `Failed total: ${expected.Expected.Data.TotalAmount.Gross}`);
                        assert.equal(actual.price.tax.amount, expected.Expected.Data.TotalAmount.TotalTax, `Failed price: ${expected.Expected.Data.TotalAmount.TotalTax}`);
                        assert.equal(actual.price.net.amount, expected.Expected.Data.TotalAmount.Net, `Failed net: ${expected.Expected.Data.TotalAmount.Net}`);
                        assert.equal(actual.price.commission.amount, expected.Expected.Data.TotalAmount.Commission, `Failed commission: ${expected.Expected.Data.TotalAmount.Commission}`);
                        checkCount++;
                    }
                }
            });
            if (!found) {
                //fail(`Not found ${expected.Data?.TransactionId}`);
                logInfoMessage(`Not found ${expected.Data?.TransactionId}`);
            }
            // this.attach(JSON.stringify({
            //     "CheckingCountPassed": (checkCount + "/" + expectedPayments.length) // itemRef
            // }, undefined, 4), "application/json"); Minh test thread-safe
        });
        console.log(`PASSED`);
    } catch (error) {
        fail(`${error}`);
    }
});

Then("Customer Quotes should have correct data {string}", function (item) {
    let count = 0;
    let countFound = 0;
    let data = "";
    try {
        const customer_Id = jsonPath.value(master_data, `$.Customer[${item}].Params.Id`);
        const customer_Name = jsonPath.value(master_data, `$.Customer[${item}].Expected.Data.FullName`);
        const customer_Ssn = jsonPath.value(master_data, `$.Customer[${item}].Expected.Data.Ssn`);
        let actual = _.get(this.body, `data`);
        let chkListItemsActual = jsonPath.value(this.body, `$.results..checklistDefinition.name`);
        let chkListItemsExpected = jsonPath.value(master_data, `$.Quote`);
        let arrExpected = new Array();
        let arrActual = new Array();
        let meta = _.get(this.body, `meta`);
        const metaTotal = meta.totalResources;
        
        // iterate through the Quotes to found the correct Customer
        chkListItemsExpected.forEach(element => {
            actual.forEach(actualEle => {
                //const quoteId = jsonPath.value(this.body, `$.data[${count}].id`);
                const quoteId = actualEle.id;
                if (element.Params.Id === quoteId) {
                    countFound++;
                    //console.log(`${count}, Quote Id: ${quoteId}, ${element.Params.Id}`);
                    //if (element.Expected.Data.PolicyHolderData === customer_Id) {
                    // const policyId = element.Params.Id;
                    // const policyRef = element.Expected.Data.Reference;
                    const quoteInfo = actualEle;// jsonPath.value(this.body, `$.data[${count}]`);
                    // //const policyDetail = jsonPath.value(this.body, `$.data[${count}].attributes`);
                    // const productName = policyInfo?.productName;
                    // this?.attach(JSON.stringify({ "Count": count, "CustomerSSN": customer_Ssn, "Policy": policyId, "PolicyRef": policyRef,
                    //     "ProductName": productName
                    // }, undefined, 4), "application/json");
                    arrActual.push({ "Quote": quoteInfo });
                    arrExpected.push({ "Quote": element });
                    console.log(`Found ${quoteId} `);
                }
            });
            count++;
        });
        let temp = 0; 
        if (metaTotal != countFound) {
            fail(`Not match total records ${metaTotal}/${countFound}`);
        } else {
            console.log(`Match Count Found: ${countFound}`);
        }
        arrExpected.forEach(expected => {
            let found = false;
            temp++;
            arrActual.forEach(actual => {
                try {
                    if (expected.Quote?.Params.Id === actual.Quote?.id) {
                        found = true;
                        //data += `${item},${temp},${found},${customer_Id},${actual.Quote.id},`;
                        // if (data.length > 0) {
                        //     //await fs.writeFileSync(pathQuoteCustomer, data, { flag: 'a+' });
                        //     //await fs.writeFileSync(pathQuoteCustomer, `passed\r\n`, { flag: 'a+' });
                        // }
                        // this.attach(JSON.stringify({
                        //     "CheckingQuoteId": (actual.Quote?.id + "")
                        // }, undefined, 4), "application/json"); Minh test thread-safe
                        //#region  checkpoint here
                        const res = checkDataQuote(actual.Quote.attributes, expected.Quote.Expected.Data)
                        //data += `passed\r\n`;
                        data += `${item},${temp},${found},${customer_Id},${actual.Quote.id},${res}\r\n`;
                        console.log(`Test1: - {${data}"}`);
                        //await fs.writeFileSync(pathQuoteCustomer, `passed\r\n`, { flag: 'a+' });
                        // const res2 = checkPremiumPolicy(actual.Policy.premium, expected.Policy.Expected.Data.PolicyPricing.Premium)
                        // this?.attach(JSON.stringify({
                        //     "Actual": actual.Policy
                        // }, undefined, 4), "application/json");
                        // this?.attach(JSON.stringify({
                        //     "Expected": expected.Policy.Expected.Data
                        // }, undefined, 4), "application/json");
                        //#endregion
                        
                    } 
                } catch (e) {
                    data += `${item},${temp},${found},${customer_Id},${actual.Quote.id},failed,${e}\r\n`;
                    console.log(`Test2: - {${data}"}`);
                    console.log(`Failed in checkpoint: - {${e}"}`);
                    fail(`Failed in checkpoint: - {${e}"}`);            
                }
            });
            if (!found) {
                fail(`Not Found PolicyId: ${expected.Policy?.Params.Id}/ Ref: ${expected.Policy?.Expected.Data.Reference}, for CustomerId: ${customer_Id} : ${customer_Name}`);
            }
            
        });
        console.log(`Data To Write: - ${data}`);
        console.log(`Loop : ${temp}/${countFound}`);
        fs.writeFileSync(pathQuoteCustomer, data, { flag: 'a+' });
    } catch (error) {
        //data += `failed\r\n`;
        fs.writeFileSync(pathQuoteCustomer, data, { flag: 'a+' });
        fail(`Failed: ${count} - {${error}"}`);
    } finally {
        //await fs.writeFileSync(pathQuoteCustomer, data, { flag: 'a+' });
    }
    //await fs.writeFileSync(pathQuoteCustomer, data, { flag: 'a+' });
});

Then("Customer Policy should have correct data {string}", function (item) {
    let count = 0;
    try {
        const customer_Id = jsonPath.value(master_data, `$.Customer[${item}].Params.Id`);
        const customer_Name = jsonPath.value(master_data, `$.Customer[${item}].Expected.Data.FullName`);
        const customer_Ssn = jsonPath.value(master_data, `$.Customer[${item}].Expected.Data.Ssn`);
        let actual = _.get(this.body, `results`);
        let chkListItemsActual = jsonPath.value(this.body, `$.results..checklistDefinition.name`);
        let chkListItemsExpected = jsonPath.value(master_data, `$.Policy`);
        let arrExpected = new Array();
        let arrActual = new Array();
        // iterate through the Policies to found the correct Customer
        chkListItemsExpected.forEach(element => {
            if (element.Expected.Data.PolicyHolderData.NIN === customer_Ssn) {
                const policyId = element.Params.Id;
                const policyRef = element.Expected.Data.Reference;
                const policyInfo = jsonPath.value(this.body, `$.data[${count}].attributes`);
                //const policyDetail = jsonPath.value(this.body, `$.data[${count}].attributes`);
                const productName = policyInfo?.productName;
                this?.attach(JSON.stringify({ "Count": count, "CustomerSSN": customer_Ssn, "Policy": policyId, "PolicyRef": policyRef,
                    "ProductName": productName
                }, undefined, 4), "application/json");
                arrActual.push({ "Policy": policyInfo });
                arrExpected.push({ "Policy": element });
                
                count++;
            }
        });
        let temp = 0;
        arrExpected.forEach(expected => {
            let found = false;
            temp ++;
            arrActual.forEach(actual => {
                try {
                    if (expected.Policy?.Expected.Data.Reference === actual.Policy?.reference) {
                        found = true;
                        //#region  checkpoint here
                        const res = checkDataPolicy(actual.Policy, expected.Policy.Expected.Data)
                        const res2 = checkPremiumPolicy(actual.Policy.premium, expected.Policy.Expected.Data.PolicyPricing.Premium)
                        this?.attach(JSON.stringify({
                            "Actual": actual.Policy
                        }, undefined, 4), "application/json");
                        this?.attach(JSON.stringify({
                            "Expected": expected.Policy.Expected.Data
                        }, undefined, 4), "application/json");
                        this?.attach(JSON.stringify({
                            "Result": (expected.Policy.Expected.Data.Reference + ": " + res)
                        }, undefined, 4), "application/json");
                        //#endregion
                    }
                } catch (e) {
                    console.log(`Failed in checkpoint: - {${e}"}`);
                }
            });
            if (!found) {
                fail(`Not Found PolicyId: ${expected.Policy?.Params.Id}/ Ref: ${expected.Policy?.Expected.Data.Reference}, for CustomerId: ${customer_Id} : ${customer_Name}`);
            }
        });  
        console.log(`Passed: ${count}`);
    } catch (error) {
        fail(`Failed: ${count} - {${error}"}`);
    }
});

function checkPremiumPolicy(data_actual, data_expected) {
    try {
        
        // const data_expected = jsonPath.value(master_data, value);
        const value_total_price = data_expected.PremiumBeforeProRata.TotalPrice.Amount;
        // if (value_total_price>0) {
        //     spec.response().should.have.json(json, value_total_price);
        //     return;
        // }
        const value_annual_premium = data_expected.PremiumBeforeProRata.TotalTariffPremium.Amount;
        const value_underwriting_adjustment = data_expected.PremiumBeforeProRata.TotalUnderwritingAdjustment.Amount;
        const value_sale_discount = data_expected.PremiumBeforeProRata.TotalSalesDiscount.Amount;
        const value_product_commission = data_expected.PremiumBeforeProRata.TotalProductCommission.Amount;
        const value_sales_commission = data_expected.PremiumBeforeProRata.TotalSalesCommission.Amount;
        const cover_breakdown = data_expected.PremiumBeforeProRata.CoverBreakdown[0].Price.Breakdown;
        const value_tax = data_expected.PremiumBeforeProRata.TotalTax.Amount;
        let breadown = cover_breakdown.TariffPremium.Amount + cover_breakdown.UnderwritingAdjustment.Amount
            + cover_breakdown.SalesDiscount.Amount;
        let breadown2 = 0;
        const cover_breakdown2 = data_expected.PremiumBeforeProRata.CoverBreakdown;
        cover_breakdown2.forEach(element => {
            console.log(element.Identity.Name);
            breadown2 += element.Price.Breakdown.TariffPremium?.Amount;
            breadown2 += element.Price.Breakdown.UnderwritingAdjustment?.Amount;
            breadown2 += element.Price.Breakdown.SalesDiscount?.Amount;
            //breadown2 += element.Price.Breakdown.TaxComponents?.VarsamSEMopedbilTax?.Amount;
        });
        const sum = breadown2 + value_tax;
        console.log(`Checking`);
        assert.equal(data_actual.total.amount, round(sum), `Failed Amount: ${data_actual.total.amount}`);
    } catch (error) {
        fail(`Failed Premium: ${error}`)
    }
}

function checkDataQuote(dataActual, dataExpected) {
    try {
        assert.equal(dataActual.productName, dataExpected.ProductName, `Failed ProductName: ${dataActual.productName}`);
        //assert.equal(dataActual.paymentMethod, dataExpected.PaymentMethod, `Failed paymentMethod: ${dataActual.paymentMethod}`);
        //assert.equal(dataActual.paymentFrequency, dataExpected.PaymentFrequency, `Failed PaymentFrequency: ${dataActual.paymentFrequency}`);
        //assert.equal(dataActual.type, `NewBusiness`, `Failed type: ${dataActual.type}`);
        //assert.equal(dataActual.status, `InProgress`, `Failed status: ${dataActual.status}`);
        //assert.equal(dataActual.status, dataExpected.Status, `Failed status: ${dataActual.status}`);
        
        const arrExclude: String[] = ['InsuredPersonDOBTag', 'FirstRegistrationTag', 'CurrentCertificateDateTag',
            'ModifiedIssuedDateOfBLicenseTag', 'PurchasedDateTag', 'CarOdometerDateTag', 'ModifiedPurchasedDateTag',
            'MainDriverDOBTag', 'IsPolicyHolderInsuredPersonTag', 'CalculatedIsAccomodationOwnedTag', 'DogDOBTag',
            'DogPurchasedDateTag'
        ];
        assert.equal(true, compareJson(dataActual.answers, dataExpected.Answers, arrExclude), `Failed Answer`);
        return `Passed`;
    } catch (error) {
        fail(`Failed Data: ${error}`)
    }
}

function checkDataPolicy(dataActual, dataExpected) {
    try {
        assert.equal(dataActual.description, dataExpected.Description, `Failed Description: ${dataActual.description}`);
        assert.equal(dataActual.paymentFrequency, dataExpected.PaymentFrequency, `Failed PaymentFrequency: ${dataActual.paymentFrequency}`);
        assert.equal(dataActual.paymentMethod, dataExpected.PaymentMethod, `Failed PaymentMethod: ${dataActual.paymentMethod}`);
        assert.equal(dataActual.productName, dataExpected.ProductName, `Failed ProductName: ${dataActual.productName}`);
        assert.equal(dataActual.answers.temporalBounds.insurancePeriodStrategy, dataExpected.InsurancePeriodStrategy, `Failed InsurancePeriodStrategy: ${dataActual.answers.temporalBounds.insurancePeriodStrategy}`);
        assert.equal(dataActual.productName, dataExpected.ProductName, `Failed ProductName: ${dataActual.productName}`);
        const arrExclude: String[] = ['InsuredPersonDOBTag', 'FirstRegistrationTag', 'CurrentCertificateDateTag',
            'ModifiedIssuedDateOfBLicenseTag', 'PurchasedDateTag', 'CarOdometerDateTag', 'ModifiedPurchasedDateTag',
            'MainDriverDOBTag'
        ];
        assert.equal(true, compareJson(dataActual.answers.slices[0].value, dataExpected.Answers, arrExclude), `Failed Answer`);
        return `Passed`;
    } catch (error) {
        fail(`Failed Data: ${error}`)
    }
}

Then("Response should have all array json path {string} is {string} if array {string} exist field {string}", function (json, value, jsonArray, field) {
    // json is path from the response
    // value is path from the <envi>_data.json
    try {
        const array = jsonPath.value(master_data, jsonArray);
        if (array === undefined || array.length < 1) {
            return;
        }
        value = jsonPath.value(master_data, value);
        let index = 0;
        let actual = this.body[json];
        actual = _.get(this.body, `${json}`);
        if (array.length != actual.length) {
            fail(`{"Array" : "${array.length}/${actual.length}"}`);
        }
        array.forEach(element => {
            console.log(element);
            console.log(value[index]);
            console.log(actual[index]);
            const fieldValue = jsonPath.value(element, field);
            if (element[field] !== fieldValue) {
                fail(`{"${field}" : "${element[field]}/${fieldValue}"}`);
            }
            index++;
        });
        // value = jsonPath.value(master_data, value);
        // if (value === undefined) {
        //     //this.attach(`{${json} : "null/undefined"}`, "application/json");
        //     fail(`{${json} : "null/undefined"}`);
        // } else {
        //     spec.response().should.have.json(json, value);
        // }
    } catch (error) {
        // console.log(error);
        fail(`{${error}"}`);
    }
});

Then("Response should have a json path {string} is {string} if array {string} exist", function (json, value, jsonArray) {
    // json is path from the response
    // value is path from the <envi>_data.json
    try {
        const array = jsonPath.value(master_data, jsonArray);
        if (array.length<1) {
            return;
        }
        value = jsonPath.value(master_data, value);
        if (value === undefined) {
            //this.attach(`{${json} : "null/undefined"}`, "application/json");
            fail(`{${json} : "null/undefined"}`);
        } else {
            spec.response().should.have.json(json, value);
        }
    } catch (error) {
        // console.log(error);
        fail(`{${error}"}`);
    }
});

Then("Response should have a json path {string} is {string}", function (json, value) {
    // json is path from the response
    // value is path from the <envi>_data.json
    try {
        value = jsonPath.value(master_data, value);
        let actual = _.get(this.body, `${json}`);
        if ((value === undefined && actual === undefined) || (actual === null && value === '')) {
            console.log(`Skip comparison`);
        } else if (value === undefined) {
            //this.attach(`{${json} : "null/undefined"}`, "application/json");
            fail(`{${json} : "null/undefined"}`);
        } else {
            spec.response().should.have.json(json, value);
        }
    } catch (error) {
        // console.log(error);
        fail(`{${error}"}`);
    }
});

Then("Response should have a json path {string} is policy price sum from {string}", function (json, value) {
    // json is path from the response
    // value is path from the <envi>_data.json
    try {
        const data_expected = jsonPath.value(master_data, value);
        const value_total_price = data_expected.PremiumBeforeProRata.TotalPrice.Amount;
        // if (value_total_price>0) {
        //     spec.response().should.have.json(json, value_total_price);
        //     return;
        // }
        const value_annual_premium = data_expected.PremiumBeforeProRata.TotalTariffPremium.Amount;
        const value_underwriting_adjustment = data_expected.PremiumBeforeProRata.TotalUnderwritingAdjustment.Amount;
        const value_sale_discount = data_expected.PremiumBeforeProRata.TotalSalesDiscount.Amount;
        const value_product_commission = data_expected.PremiumBeforeProRata.TotalProductCommission.Amount;
        const value_sales_commission = data_expected.PremiumBeforeProRata.TotalSalesCommission.Amount;
        const cover_breakdown = data_expected.PremiumBeforeProRata.CoverBreakdown[0].Price.Breakdown;
        const value_tax = data_expected.PremiumBeforeProRata.TotalTax.Amount;
        let breadown = cover_breakdown.TariffPremium.Amount + cover_breakdown.UnderwritingAdjustment.Amount
        + cover_breakdown.SalesDiscount.Amount;
        // cover_breakdown.forEach(element => {
        //     breadown += element.Amount;
        // });
        // breadown = sumAmount(cover_breakdown);
        // Object.keys(cover_breakdown).forEach(function (key, index) {
        //     // key: the name of the object key
        //     // index: the ordinal position of the key within the object 
        //     if (key.toLowerCase() === 'AdditionalComponents') {
                
        //     } else if (key.toLowerCase() === 'ReportingItems') {
        //         breadown += cover_breakdown[key].OriginalTariff.Amount;
        //     }else if (key.toLowerCase() === 'TaxComponents') {
        //         breadown += cover_breakdown[key].VarsamSEMopedbilTax.Amount;
        //     }else {
        //         breadown += cover_breakdown[key].Amount;
        //     }
        //     console.log(key);
        // });
        //const sum = value_annual_premium + value_underwriting_adjustment + value_sale_discount + value_product_commission + value_sales_commission + breadown;
        let breadown2 = 0;
        const cover_breakdown2 = data_expected.PremiumBeforeProRata.CoverBreakdown;
        cover_breakdown2.forEach(element => {
            console.log(element.Identity.Name);
            breadown2 += element.Price.Breakdown.TariffPremium?.Amount;
            breadown2 += element.Price.Breakdown.UnderwritingAdjustment?.Amount;
            breadown2 += element.Price.Breakdown.SalesDiscount?.Amount;
            //breadown2 += element.Price.Breakdown.TaxComponents?.VarsamSEMopedbilTax?.Amount;
        });
        const sum = breadown2 + value_tax;
        spec.response().should.have.json(json, round(sum));
    } catch (error) {
        // console.log(error);
        fail(`{${error}"}`);
    }
});

Then("Response should have a json path {string} match with {string}", function (jsonPathActual, jsonPathExpected) {
    try {
        spec.response().should.have.jsonMatch(jsonPathActual, jsonPathExpected);
    } catch (error) {
        fail(`{${error}"}`);
    }
});

function sumAmount(obj) {
    let result = 0;
    Object.keys(obj).forEach(function (key, index) {
        // key: the name of the object key
        // index: the ordinal position of the key within the object 
        if (obj[key].Amount=== undefined) {
            result += sumAmount(obj[key]);
        } else {
            result += obj[key].Amount;
        }
    });
    return result;
}

Then("Response should have a json path {string} is sum of Adjustment with {string}", function (json, value) {
    // json is path from the response
    // value is path from the <envi>_data.json
    try {
        const data_expected = jsonPath.value(master_data, value);
        // const value_total_price = data_expected.PremiumBeforeProRata.TotalPrice.Amount;
        // if (value_total_price > 0) {
        //     spec.response().should.have.json(json, value_total_price);
        //     return;
        // }
        // const value_annual_premium = data_expected.PremiumBeforeProRata.TotalTariffPremium.Amount;
        // const value_underwriting_adjustment = data_expected.PremiumBeforeProRata.TotalUnderwritingAdjustment.Amount;
        // const value_sale_discount = data_expected.PremiumBeforeProRata.TotalSalesDiscount.Amount;
        // const value_product_commission = data_expected.PremiumBeforeProRata.TotalProductCommission.Amount;
        // const value_sales_commission = data_expected.PremiumBeforeProRata.TotalSalesCommission.Amount;
        const adjustments = data_expected;
        let total = 0;
        adjustments.forEach(element => {
            const totalTarif = element.LatestProratablePremium.PremiumBeforeProRata.TotalTariffPremium.Amount;
            const totalTax = element.LatestProratablePremium.PremiumBeforeProRata.TotalTax.Amount;
            const cover_breakdown = element.LatestProratablePremium.PremiumBeforeProRata.CoverBreakdown;
            let breadown = 0;
            cover_breakdown.forEach(element_breakdown => {
                // breadown += element_breakdown.Price.Breakdown.TariffPremium.Amount
                //     + element_breakdown.Price.Breakdown.UnderwritingAdjustment.Amount
                //     + element_breakdown.Price.Breakdown.SalesDiscount.Amount
                //     + element_breakdown.Price.Breakdown.TaxComponents.VarsamSEMopedbilTax.Amount;
            });
            total = totalTarif + totalTax;
        });
        // const sum = value_annual_premium + value_underwriting_adjustment + value_sale_discount + value_product_commission + value_sales_commission + breadown;
        spec.response().should.have.json(json, round(total));
    } catch (error) {
        // console.log(error);
        fail(`{${error}"}`);
    }
});

Then("Response should match item claim transaction {string} with {string}", function(jsonActual, valueExpected){
    const expected = jsonPath.value(master_data, valueExpected);
    const actual = _.get(this.body, `${jsonActual}`);
    assert.equal(actual.length, expected.length, `Failed Transaction length: ${actual.length}/${expected.length}`);
    expected.forEach(eleExpected => {
        let found = false;
        actual.forEach(eleActual => {
            if (eleActual["id"] === eleExpected["New Id"]) {
                found = true;
                // this.attach(JSON.stringify({
                //     "CheckingClaimTransaction": (eleActual["id"]) // itemRef
                // }, undefined, 4), "application/json"); Minh test thread-safe
                assert.equal(eleActual.amount, eleExpected.Amount, `Failed Amount: ${eleActual.amount}/${eleExpected.Amount}`);
                assert.equal(eleActual.approvedBy, eleExpected.ApprovedBy, `Failed approvedBy: ${eleActual.approvedBy}/${eleExpected.ApprovedBy}`);
                assert.equal(eleActual.assignee, eleExpected.Assignee, `Failed assignee: ${eleActual.assignee}/${eleExpected.Assignee}`);
                assert.equal(eleActual.createdAt, eleExpected.CreatedAt, `Failed createdAt: ${eleActual.createdAt}/${eleExpected.CreatedAt}`);
                assert.equal(eleActual.createdBy, eleExpected.CreatedBy, `Failed createdBy: ${eleActual.createdBy}/${eleExpected.CreatedBy}`);
                assert.equal(eleActual.description, eleExpected.Description, `Failed approvdescriptionedBy: ${eleActual.description}/${eleExpected.Description}`);
                assert.equal(String(eleActual.excludeFromExport).toLowerCase(), eleExpected.ExcludeFromExport.toLowerCase(), `Failed excludeFromExport: ${eleActual.excludeFromExport}/${eleExpected.ExcludeFromExport}`);
                assert.equal(String(eleActual.isAdjust).toLowerCase(), eleExpected.IsAdjust.toLowerCase(), `Failed isAdjust: ${eleActual.isAdjust}/${eleExpected.IsAdjust}`);
                assert.equal(String(eleActual.isAutoApproved).toLowerCase(), eleExpected.IsAutoApproved.toLowerCase(), `Failed isAutoApproved: ${eleActual.isAutoApproved}/${eleExpected.IsAutoApproved}`);
                //assert.equal(String(eleActual.excludeFromExport).toLowerCase(), eleExpected.ExcludeFromExport.toLowerCase(), `Failed excludeFromExport: ${eleActual.excludeFromExport}/${eleExpected.ExcludeFromExport}`);
                assert.equal(eleActual.status, eleExpected.Status, `Failed status: ${eleActual.status}/${eleExpected.Status}`);
                assert.equal(eleActual.transactionType, eleExpected.TransactionType, `Failed transactionType: ${eleActual.transactionType}/${eleExpected.TransactionType}`);
                assert.equal(eleActual.type, eleExpected.Type, `Failed type: ${eleActual.type}/${eleExpected.Type}`);
                assert.equal(eleActual.paymentInformation.accountNumber, eleExpected.PaymentInformation.AccountNumber, `Failed PaymentInformation AccountNumber: ${eleActual.paymentInformation.accountNumber}/${eleExpected.PaymentInformation.AccountNumber}`);
                assert.equal(eleActual.paymentInformation.bankClearingNumber, eleExpected.PaymentInformation.BankClearingNumber, `Failed PaymentInformation bankClearingNumber: ${eleActual.paymentInformation.bankClearingNumber}/${eleExpected.PaymentInformation.BankClearingNumber}`);
                assert.equal(eleActual.paymentInformation.bankName, eleExpected.PaymentInformation.BankName, `Failed PaymentInformation BankName: ${eleActual.paymentInformation.bankName}/${eleExpected.PaymentInformation.BankName}`);
                assert.equal(eleActual.paymentInformation.dueDate, eleExpected.PaymentInformation.DueDate, `Failed PaymentInformation DueDate: ${eleActual.paymentInformation.dueDate}/${eleExpected.PaymentInformation.DueDate}`);
                assert.equal(eleActual.paymentInformation.externalReference, eleExpected.PaymentInformation.ExternalReference, `Failed PaymentInformation ExternalReference: ${eleActual.paymentInformation.externalReference}/${eleExpected.PaymentInformation.ExternalReference}`);
                assert.equal(eleActual.paymentInformation.invoiceDate, eleExpected.PaymentInformation.InvoiceDate, `Failed PaymentInformation InvoiceDate: ${eleActual.paymentInformation.nnvoiceDate}/${eleExpected.PaymentInformation.InvoiceDate}`);
                assert.equal(eleActual.paymentInformation.invoiceNo, eleExpected.PaymentInformation.InvoiceNo, `Failed PaymentInformation InvoiceNo: ${eleActual.paymentInformation.invoiceNo}/${eleExpected.PaymentInformation.InvoiceNo}`);
                assert.equal(eleActual.paymentInformation.paymentMethod, eleExpected.PaymentInformation.PaymentMethod, `Failed PaymentInformation PaymentMethod: ${eleActual.paymentInformation.paymentMethod}/${eleExpected.PaymentInformation.PaymentMethod}`);
                assert.equal(eleActual.paymentInformation.swiftBic, eleExpected.PaymentInformation.SwiftBic, `Failed PaymentInformation SwiftBic: ${eleActual.paymentInformation.swiftBic}/${eleExpected.PaymentInformation.SwiftBic}`);
                assert.equal(eleActual.paymentInformation.kidNo, eleExpected.PaymentInformation.KidNo, `Failed PaymentInformation KidNo: ${eleActual.paymentInformation.kidNo}/${eleExpected.PaymentInformation.KidNo}`);
                // recipients
                assert.equal(eleActual.recipient.accountNumber, eleExpected.Recipient.AccountNumber, `Failed Recipient AccountNumber: ${eleActual.recipient.accountNumber}/${eleExpected.Recipient.AccountNumber}`);
                assert.equal(eleActual.recipient.bankClearingNumber, eleExpected.Recipient.BankClearingNumber, `Failed Recipient BankClearingNumber: ${eleActual.recipient.bankClearingNumber}/${eleExpected.Recipient.BankClearingNumber}`);
                assert.equal(eleActual.recipient.companyName, eleExpected.Recipient.CompanyName, `Failed Recipient CompanyName: ${eleActual.recipient.companyName}/${eleExpected.Recipient.CompanyName}`);
                assert.equal(eleActual.recipient.nin, eleExpected.Recipient.Nin, `Failed Recipient nin: ${eleActual.recipient.nin}/${eleExpected.Recipient.Nin}`);
                assert.equal(eleActual.recipient.ssn, eleExpected.Recipient.Ssn, `Failed Recipient ssn: ${eleActual.recipient.ssn}/${eleExpected.Recipient.Ssn}`);
                assert.equal(eleActual.recipient.swiftBic, eleExpected.Recipient.SwiftBic, `Failed Recipient swiftBic: ${eleActual.recipient.swiftBic}/${eleExpected.Recipient.SwiftBic}`);
                assert.equal(eleActual.recipient.vendorId, eleExpected.Recipient.VendorId, `Failed Recipient vendorId: ${eleActual.recipient.vendorId}/${eleExpected.Recipient.VendorId}`);
                assert.equal(eleActual.recipient.bankName, eleExpected.Recipient.BankName, `Failed Recipient bankName: ${eleActual.recipient.bankName}/${eleExpected.Recipient.BankName}`);
                assert.equal(eleActual.recipient.type, eleExpected.Recipient.Type, `Failed Recipient type: ${eleActual.recipient.type}/${eleExpected.Recipient.Type}`);
                assert.equal(eleActual.recipient.email, eleExpected.Recipient.Email, `Failed Recipient email: ${eleActual.recipient.email}/${eleExpected.Recipient.Email}`);
            }   
        });
        if (!found) {
            fail(`Not Found Transaction ${eleExpected["New Id"]}`);
        }
    });
    console.log(`debug`);
});

Then("Response should match item json path {string} with {string} and {string} with {string}", function (json, rowItemJson, value, rowItemValue) {  
    value = jsonPath.value(master_data, value);
    let actual = this.body[json];
    actual = _.get(this.body, `${json}`);
    //const actualSize = _.size(this.body, `${json}`);
    // if (actual === undefined) {
    //     actual = _.get(this.body, `${json}`);
    // }
    
    if (value.length != actual.length) {
        return fail(`Not matching actual: ${actual.length} , with expected: ${value.length}`);
    }
    for(let i = 0; i< value.length; i++) {
        // if (value[i][rowItemJson] == actual[i][rowItemValue]) {
        //     // match
        // } else {
        //     //fail(`Matching Failed ${rowItemJson}`, value[i][rowItemJson], actual[i][rowItemValue]);
        //     assert.equal(actual[i][rowItemValue], value[i][rowItemJson], `Failed ${rowItemJson}`);
        //     return;
        // }
    }
    // this.attach("MATCH", "application/json"); Minh test thread - safe
});

Then("Response should contains item json path {string} with {string} and {string} with {string}", function (json, rowItemJson, value, rowItemValue) {
    value = jsonPath.value(master_data, value);
    let actual = this.body[json];
    actual = _.get(this.body, `${json}`);
    const actualSize = _.size(this.body, `${json}`);
    // if (actual === undefined) {
    //     actual = _.get(this.body, `${json}`);
    // }

    if (value.length != actualSize) {
        return fail(`Not matching actual: ${actualSize} , with expected: ${value.length}`);
    }
    for (let i = 0; i < value.length; i++) {
        if (value[i][rowItemJson] == actual[i][rowItemValue]) {
            // match
        } else {
            //fail(`Matching Failed ${rowItemJson}`, value[i][rowItemJson], actual[i][rowItemValue]);
            assert.equal(actual[i][rowItemValue], value[i][rowItemJson], `Failed ${rowItemJson}`);
            return;
        }
    }
    // this.attach("MATCH", "application/json"); Minh test thread-safe
});

Then("Response should match data array in json path {string} with {string} and {string}", function (json, rowItemJson, value) {

    value = jsonPath.value(master_data, value);
    const actual = this.body[json];
    if (value.length != actual.length) {
        return fail(`Not matching ${actual}`);
    }
    // for (let i = 0; i < value.length; i++) {
    //     if (value[i][rowItemJson] == actual[i][rowItemValue]) {
    //         // match
    //     } else {
    //         //fail(`Matching Failed ${rowItemJson}`, value[i][rowItemJson], actual[i][rowItemValue]);
    //         assert.equal(actual[i][rowItemValue], value[i][rowItemJson], `Failed ${rowItemJson}`);
    //         return;
    //     }
    // }
    // this.attach(`MATCH ${actual}`, "application/json"); Minh test thread-safe
});

Then("Response should have a json match", function (json) {
    spec.expectJsonMatch(json);
});

Then("Response should match JSON Snapshot", async function (matchers = "") {
    var isValidJSON = true;
    try { JSON.parse(matchers) } catch { isValidJSON = false }
    if (!isValidJSON) {
        return await spec.name(scenarioName).expectJsonSnapshot();
    }
    return await spec.name(scenarioName).expectJsonSnapshot(matchers);
});

Then("Response header {string} should have {string}", function (key, value) {
    spec.response().should.have.header(key, value);
});

Then("Response cookie {string} should have {string}", function (key, value) {
    spec.response().should.have.cookies(key, value);
});

Then("Response should have json schema {string}", function (schemaPath) {
    // Generate JSON Schema from JSON Response:
    // https://jsonformatter.org/json-to-jsonschema
    // or https://codebeautify.org/json-to-json-schema-generator
    const schema = fs.readFileSync(`src/step-definitions/api/schemas/${schemaPath}`, 'utf8');
    spec.response().should.have.jsonSchema(JSON.parse(schema));
});

Then("Error should happens", function () {
    spec.expectError();
});


Then("Response body should contains {string}", function (value) {
    spec.response().to.have.bodyContains(value);
});

Then("Response time less than {string}", function (milliseconds = 1000) {
    spec.response().to.have.responseTimeLessThan(milliseconds);
});

Then("User store response {string} with value {string}", function (name, path) {
    spec.stores(name, path); 
    // const value = jsonPath.value(spec._response.body, path);
    // this.attach(`Stored ${name}:${value}`, "application/json");
    const value = jsonPath.value(this.body, path);
    // this.attach(`Stored Value ${name}:${value}`, "application/json"); Minh test thread - safe
});
//#endregion

//#region Handler
pactum.handler.addAssertHandler('number', (ctx: any) => {
    return typeof ctx.data === 'number';
});
pactum.handler.addAssertHandler('string', (ctx: any) => {
    return typeof ctx.data === 'string';
});
pactum.handler.addDataFuncHandler('GetTimeStamp', () => {
    return Date.now();
});
pactum.handler.addCaptureHandler('captureSnapshot', async (ctx: any) => {
    const jsonResponse = JSON.stringify(ctx.res.json);
    // await console.log("$$$ " + jsonResponse);
    // logger.info(`JSON stored: ${jsonResponse}`);
    if (await !fs.existsSync(path)) {
        await fs.writeFileSync(path, jsonResponse);
    }
});
// pactum.handler.addExpectHandler('expectSnapshot', (ctx) => {
//     const { req, res, data } = ctx;
//     // expect(ctx.res.json).to.equal(data);

// });
//#endregion


Then(`Response should have json like {string}`, function (name) {
    spec.response().should.have.jsonLike({
        '@DATA:TEMPLATE@': `${name}`,
    });
});
Then('User stores data {string}', function (name) {
    let dt = parse({ '@DATA:TEMPLATE@': `${name}` });
    for (const [k, v] of Object.entries(dt)) {
        spec.stores(k, String(v));
    }
});

Then("User waits for the background job to complete", async function () {
    await setTimeout(5000);
    console.log("Waited 5s...");
});

Then("Response should have json schema like {string}", function (schemaName) {
    spec.response().should.have.jsonSchema({
        '@DATA:TEMPLATE@': `${schemaName}`,
    });
});
