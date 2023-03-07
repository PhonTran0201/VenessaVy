import { Before, Given, When } from "@cucumber/cucumber";
import { AccountTabQuoteCreateQuote } from "../../../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-quote/AccountTabQuoteCreateQuote";
import { GlobalPageObject } from "../../../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { QuoteProductSelector } from "../../../../../../page-objects/back-office-portal/general/quote/quote-layouts/QuoteProductSelector";
import { capitalizeWords, convertPathFileDataToDataRegression, logFailTestcase, logInfoMessage, logWarningMessage } from "../../../../../../shared/functions";
import { ICommonContext } from "../../../../../../shared/interfaces";
import { XLSX_Helper } from "../../../../../../shared/xlsx-helper";
import { getValueDataOfDataTestExecution } from "../../../../../../storage-data/functions/data-test-execution";

const loader = require('csv-load-sync');
let accountTabQuoteCreateQuote: AccountTabQuoteCreateQuote;
let globalPageObject: GlobalPageObject;
let quoteProductSelector: QuoteProductSelector;
Before(async function () {
    const context: ICommonContext = this.context;
    accountTabQuoteCreateQuote = new AccountTabQuoteCreateQuote(context.driverService);
    globalPageObject = new GlobalPageObject(context.driverService);
    quoteProductSelector = new QuoteProductSelector(context.driverService);
});

Given("User presses Next button on Create Quote form", async function () {
    let temp = await accountTabQuoteCreateQuote.pressNextButtonOnFooter();
    logFailTestcase(temp, `Press Next button failed!`);

    await globalPageObject.waitForProgressBarLoaded_v2(500);
    // await globalPageObject.waitForProgressBarLoaded_v2(2000);

    const message = "Quote answers updated.";
    temp = await globalPageObject.checkToastSuccessExistWithMessage(message);
    logFailTestcase(temp, `Not found success message "${message}"`);
});
Given("User presses Back To Quotes List button on Create Quote form", async function () {
    let temp = await accountTabQuoteCreateQuote.pressBackToQuoteListButtonOnFooter();
    logFailTestcase(temp, `Press Back To Quotes List button failed!`);
});
Given("User presses Back button on Create Quote form", async function () {
    let temp = await accountTabQuoteCreateQuote.pressBackButtonOnFooter();
    logFailTestcase(temp, `Press Back button failed!`);
});
When("User checks field on Create quote form after edit questions {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const ProductName = row.ProductName;
    const questionName = getValueDataOfDataTestExecution("questionEdited");
    const questionType = getValueDataOfDataTestExecution("questionType").toLocaleLowerCase();
    let temp = await globalPageObject.pressCreateTab();
    logFailTestcase(temp, `Press Create button failed!`);

    temp = await quoteProductSelector.inputProduct(ProductName);
    logFailTestcase(temp, `Input Product failed!`);

    temp = await accountTabQuoteCreateQuote.checkQuestionWithTypeExist(questionName, questionType);
    logFailTestcase(temp, `Not found any question with name "${questionName}" and Type = "${questionType}"!`);
});

When("User verifies QAs of product from file {string}", async (filename) => {
    const xlsx_helper = new XLSX_Helper();
    const questions: any[] = await xlsx_helper.loadSheet(convertPathFileDataToDataRegression(filename), "QA");
    for (const iterator of questions) {
        if (iterator['Question Ref'] && iterator['QA Tag'] && iterator['Skip'] !== 'Yes') {
            console.log(iterator);
            const questionTag = iterator['QA Tag'].trim();
            const questionType = iterator['Type of Field'].trim();
            const questionPromptEN = capitalizeWords(iterator['Question Prompt (EN)']).trim();
            const questionPromptSE = capitalizeWords(iterator['Question Prompt (SE)']).trim();
            const questionMandatory = iterator['Mandatory'];

            logInfoMessage(`\tChecking question tag "${questionTag}"`);

            if (questionTag !== "AdjustmentEffectiveDateTag") {
                const temp1 = await accountTabQuoteCreateQuote.checkQuestionTagAndQuestionTypeAndQuestionPrompt(questionTag, questionType, questionPromptEN);
                const temp2 = await accountTabQuoteCreateQuote.checkQuestionTagAndQuestionTypeAndQuestionPrompt(questionTag, questionType, questionPromptSE);
                logFailTestcase(temp1 || temp2, `Question tag "${questionTag}": Incorrect Question Prompt!`);
            }

            let tempMandatory: any = true;
            if(questionMandatory === 'Yes'){
                tempMandatory = true;
            }
            else if(questionMandatory === 'No'){
                tempMandatory = false;
            }
            else{
                tempMandatory = undefined;
            }
            if(tempMandatory === true || tempMandatory === false){
                const temp = await accountTabQuoteCreateQuote.checkQuestionTagAndQuestionTypeAndMandatory(questionTag, questionType, tempMandatory);///////////?????????????????
                if(!temp) logWarningMessage(`Question tag "${questionTag}": Check mandatory failed!`);
            }
        }
    }
});