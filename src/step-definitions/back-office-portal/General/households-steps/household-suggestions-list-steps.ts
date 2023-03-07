import { Given, When } from "@cucumber/cucumber";
import { DataRepo } from "../../../../core/modals/DataRepo";
import { PageFactory } from "../../../../page-objects/PageFactory";
import { logFailTestcase, logWarningTestcase } from "../../../../shared/functions";
import { getValueDataOfDataTestExecution } from "../../../../storage-data/functions/data-test-execution";

const globalPageObject = PageFactory.getInstance().createGlobalPageObjectPage();
const suggestionList = PageFactory.getInstance().createSuggestionList();
const globalConfirmationForm = PageFactory.getInstance().createGlobalConfirmationForm();

const loader = require('csv-load-sync');

Given("User is on Suggestions Household tab", async () => {
    let temp = await globalPageObject.pressTabWithTitle("Suggestions");
    logFailTestcase(temp, `Press Suggestion tab failed!`);
});

When("User verifies suggestions household list {string}", async (filename) => {
    const rows = await DataRepo.getInstance().loadData(filename);

    await suggestionList.pressRefreshButton();
    await globalPageObject.waitForProgressBarLoaded();
    await globalPageObject.reloadTable();
    await globalPageObject.waitForProgressBarLoaded_v2();

    const timeStamp1 = getValueDataOfDataTestExecution("timeStamp1");
    const Address = rows[0].Address + timeStamp1;
    const Postcode = rows[0].Postcode;
    const City = rows[0].City;
    const Country = rows[0].Country;

    const address = `${Address}, ${Postcode}, ${City}, ${Country}`;
    let temp = await suggestionList.validateValueAddressByRow(address);
    logFailTestcase(temp, `Incorrect Address of the first Suggestion`);

    for (let i = 0; i < rows.length; i++) {
        const member = `${rows[i].FirstName} ${rows[i].LastName}`;
        const status = rows[i].Status;
        temp = await suggestionList.checkMemberExistByRow(member, 1);
        logFailTestcase(temp, `Not Found Member ${member} at row 1`);

        if (status) {
            temp = await suggestionList.checkStatusExistByMemberName(1, member, status);
            logFailTestcase(temp, `Member "${member}" incorrect status: Expected "${status}"`);
        }
    }
});

When("User creates a household from the suggestion {string}", async (filename) => {

    const rows = await DataRepo.getInstance().loadData(filename);
    const timeStamp1 = getValueDataOfDataTestExecution("timeStamp1");


    const Address = rows[0].Address + timeStamp1;
    const Postcode = rows[0].Postcode;
    const City = rows[0].City;
    const Country = rows[0].Country;

    const address = `${Address}, ${Postcode}, ${City}, ${Country}`;
    let temp = await suggestionList.pressCreateButtonByAddress(address);
    logFailTestcase(temp, `Press Create button at row has address "${address}" failed!`);

    await globalPageObject.waitForProgressBarLoaded_v2(3000);
    await globalPageObject.waitForProgressBarLoaded_v2();

    const message = 'Household created successfully!';
    temp = await globalPageObject.checkToastSuccessExistWithMessage(message);
    logWarningTestcase(temp, `Not found message "${message}`);

    temp = await suggestionList.pressRefreshButton();
    logFailTestcase(temp, `Press Refresh button failed!`);

    await globalPageObject.waitForProgressBarLoaded_v2(3000);

    temp = await suggestionList.validateValueAddressByRow(address);
    logFailTestcase(!temp, `The Suggestion still shows on list after create household`);
});

When("User connects a member to household on Suggestion List {string}", async (filename) => {
    const rows = await DataRepo.getInstance().loadData(filename);

    await suggestionList.pressRefreshButton();
    await globalPageObject.waitForProgressBarLoaded();
    await globalPageObject.reloadTable();
    await globalPageObject.waitForProgressBarLoaded_v2();
    const Address = rows[0].Address;
    const Postcode = rows[0].Postcode;
    const City = rows[0].City;
    const Country = rows[0].Country;
    const ConfirmMessage = rows[0].ConfirmMessage;

    const address = `${Address}, ${Postcode}, ${City}, ${Country}`;
    const member = `${rows[0].FirstName} ${rows[0].LastName}`;

    let temp = await suggestionList.pressConnectButtonByMemberName(1, member);
    logFailTestcase(temp, `Press Connect for member "${member}" failed!`);

    if(ConfirmMessage){
        temp = await globalConfirmationForm.validateValueConfirmMessage(ConfirmMessage);
        logFailTestcase(temp, `Incorrect confirmation message!`);
        await globalPageObject.pressYesForm();
    }
    

    await globalPageObject.waitForProgressBarLoaded_v2();
    temp = await globalPageObject.checkToastSuccessExistWithMessage("Connect customer to household successfully!");
    logFailTestcase(temp, `Incorrect toast message!`);

    // Account is hiden on Suggestion list
    await globalPageObject.waitForProgressBarLoaded_v2();
    temp = await suggestionList.checkMemberExistByRow(member, 1);
    logFailTestcase(!temp, `Member "${member}" should be hidden from sugguestion list!`);
});