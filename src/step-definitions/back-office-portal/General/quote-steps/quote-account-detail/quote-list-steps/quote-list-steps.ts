import { Before, Given, When } from "@cucumber/cucumber";
import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { AccountTabQuoteList } from "../../../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-quote/AccountTabQuoteList";
import { GlobalPageObject } from "../../../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { GlobalPagination } from "../../../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPagination";
import { QuoteList } from "../../../../../../page-objects/back-office-portal/general/quote/quote-list/QuoteList";
import { GlobalQuoteInsurance } from "../../../../../../page-objects/back-office-portal/insurance/quote/quote-layout/GlobalQuoteInsurance";
import { logFailTestcase, logInfoMessage } from "../../../../../../shared/functions";
import { ICommonContext } from "../../../../../../shared/interfaces";
import { getValueDataOfDataTestExecution, pushObjectToDataArrayWithUniqueKey } from "../../../../../../storage-data/functions/data-test-execution";


const loader = require("csv-load-sync");
let accountTabQuoteList: AccountTabQuoteList;
let GlobaTotalRecord;
let globalPageObject: GlobalPageObject;
let quoteList: QuoteList;

Before(async function () {
    const context: ICommonContext = this.context;
    accountTabQuoteList = new AccountTabQuoteList(context.driverService);
    globalPageObject = new GlobalPageObject(context.driverService);
    quoteList = new QuoteList(context.driverService);
});

Given("User presses Requote button of the first quote in Quote list", async function () {
    const temp = await accountTabQuoteList.pressRequoteButtonOnQuoteListByRow();
    logFailTestcase(temp, "Press Requote button of first quote failed!");
});

When("User deletes the quote from precondition steps", async () => {
    pushObjectToDataArrayWithUniqueKey("QuoteReference", await accountTabQuoteList.getReferenceValueOnQuoteListByRow(1));
    GlobaTotalRecord = await globalPageObject.getNumberOfTotalRecordsSubTab();
    let temp = await accountTabQuoteList.pressDeleteButtonOnQuoteListByRow(1);
    logFailTestcase(temp, 'press Delete Button On Quote List By Row failed!');
});

When("System does not show the quote on Quote list", async () => {
    await globalPageObject.reloadTable(5000);
    let totalRecord = await globalPageObject.getNumberOfTotalRecordsSubTab();
    if (totalRecord != (GlobaTotalRecord - 1)) {
        logFailTestcase(false, "Delete the quote failed!");
    }
    let temp = await quoteList.validateReferenceOnQuoteList(getValueDataOfDataTestExecution("QuoteReference"));
    logFailTestcase(!temp, `The Quote still displays on quote list!`);
});


When("User opens the first quote on Quote list", async () => {
    pushObjectToDataArrayWithUniqueKey("QuoteReference", await accountTabQuoteList.getReferenceValueOnQuoteListByRow(1));
    let temp = await accountTabQuoteList.openTheQuoteOnQuoteListByRow();
    logFailTestcase(temp, 'open The Quote On Quote List By Row failed!');
});
When("User checks filter at column Type on Quote list", async () => {
    const globalPagination = new GlobalPagination(SeleniumWebDriverService.getInstance());
    await globalPageObject.expandNumberOfItemSubList(50);
    await globalPageObject.reloadTable();
    let araryType = [
        {
            "Option": "New Business",
            "HasRecord": false
        },
        {
            "Option": "Renewal",
            "HasRecord": false
        },
        {
            "Option": "MTA",
            "HasRecord": false
        },
        {
            "Option": "Select all",
            "HasRecord": false
        }
    ]
    let temp = false;
    let arrayAcctualTypeInit: string[] = [];
    const totalNumberOfItems = await globalPagination.getTotalRecordsAtSubList();
    const totalLen = totalNumberOfItems >= 50 ? 50 : totalNumberOfItems;
    for (let i = 1; i <= totalLen; i++) {
        arrayAcctualTypeInit.push(await quoteList.getTypeValueOnQuoteListByRow(i));
    }
    for (let iterator of araryType) {
        if (arrayAcctualTypeInit.includes(iterator.Option)) {
            iterator.HasRecord = true;
        }
    }
    for (const iterator of araryType) {
        temp = await quoteList.openDropdownFilterTypeColumnOnQuoteList();
        logFailTestcase(temp, `Open dropdown filter Type failed!`);

        temp = await quoteList.selectOptionInFilterTypeOnQuoteList(iterator.Option);
        logFailTestcase(temp, `Select option ${iterator.Option} failed!`);

        await globalPageObject.waitForProgressBarLoaded_v2();

        let arrayAcctualTypeInitOption: string[] = [];
        const totalNumberOfItemsOption = await globalPagination.getTotalRecordsAtSubList();
        if (iterator.HasRecord && totalNumberOfItemsOption === 0) {
            logFailTestcase(temp, `Not found any record with filter type = "${iterator.Option}"`);
        }
        const totalLenOption = totalNumberOfItemsOption >= 50 ? 50 : totalNumberOfItemsOption;
        for (let i = 1; i <= totalLenOption; i++) {
            arrayAcctualTypeInitOption.push(await quoteList.getTypeValueOnQuoteListByRow(i));
        }

        if (iterator.Option === "Select all") {
            if (JSON.stringify(arrayAcctualTypeInit) !== JSON.stringify(arrayAcctualTypeInitOption)) {
                logFailTestcase(false, `The result is incorrect after filter with type = "${iterator.Option}"`);
            }
        }
        else {
            let arrayAcctualTypeUniqueOption = [...new Set(arrayAcctualTypeInitOption)];
            if (arrayAcctualTypeUniqueOption.length !== 1 || arrayAcctualTypeUniqueOption[0] !== iterator.Option) {
                logFailTestcase(false, `The result is incorrect after filter with type = "${iterator.Option}"`);
            }
        }
    }
});