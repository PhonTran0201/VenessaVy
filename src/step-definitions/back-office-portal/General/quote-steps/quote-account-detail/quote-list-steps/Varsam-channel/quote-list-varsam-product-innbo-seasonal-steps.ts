import { Then } from "@cucumber/cucumber";
import { SeleniumWebDriverService } from "../../../../../../../core/selenium-webdriver.service";
import { AccountTabQuoteList } from "../../../../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-quote/AccountTabQuoteList";
import { GlobalConfigColumn } from "../../../../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalConfigColumn";
import { GlobalPageObject } from "../../../../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { GlobalQuoteInsurance } from "../../../../../../../page-objects/back-office-portal/insurance/quote/quote-layout/GlobalQuoteInsurance";
import { getCurrentDateTime, logFailTestcase } from "../../../../../../../shared/functions";
import { numberToCurrency } from "../../../../../../../shared/tenant-setting/tenant-setting";
import { getValueDataOfDataTestExecution } from "../../../../../../../storage-data/functions/data-test-execution";


Then("System shows new quote in the Quote list after renew for Varsam product Innbo Seasonal - Renewal case", async () => {
    const quoteList = new AccountTabQuoteList(SeleniumWebDriverService.getInstance());
    const globalPageObject = new GlobalPageObject(SeleniumWebDriverService.getInstance());

    let product = getValueDataOfDataTestExecution("Product");
    let premium = numberToCurrency(getValueDataOfDataTestExecution("PolicyPremium"), true, getValueDataOfDataTestExecution("Currency"));
    let type = "Renewal";
    let status = "In Progress";
    let policyTerm = getValueDataOfDataTestExecution("StartDateAfterRenew") + " - " + getValueDataOfDataTestExecution("EndDateAfterRenew");

    await globalPageObject.navigateToSubQuotes();
    let temp = await quoteList.validateReferenceOnQuoteList(getValueDataOfDataTestExecution("QuoteReference"));
    logFailTestcase(temp, `Incorrect reference!`);


    temp = await quoteList.validateProductOnQuoteList(product);
    logFailTestcase(temp, `Incorrect Product!`);

    temp = await quoteList.validatePolicyTermOnQuoteList(policyTerm);
    logFailTestcase(temp, `Incorrect policy term!`);

    temp = await quoteList.validatePremiumOnQuoteList(premium);
    logFailTestcase(temp, `Incorrect premium!`);

    if (type) {
        temp = await quoteList.validateTypeOnQuoteList(type);
        logFailTestcase(temp, `Incorrect Type!`);
    }

    temp = await quoteList.validateStatusOnQuoteList(status);
    logFailTestcase(temp, `Incorrect status!`);
    const globalConfigColumn = new GlobalConfigColumn(SeleniumWebDriverService.getInstance());
    if ((!await globalConfigColumn.checkConfigColumnDropdownShowing())) {
        temp = await globalConfigColumn.pressConfigColumnButtonAtSubTab();
        logFailTestcase(temp, `Press config column button failed!`);
    }
});