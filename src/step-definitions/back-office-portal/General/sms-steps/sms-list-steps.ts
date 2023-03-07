import { Given, When } from "@cucumber/cucumber";
import { PageFactory } from "../../../../page-objects/PageFactory";
import { convertPathFileDataToDataRegression, getDate, logFailTestcase, logInfoMessage } from "../../../../shared/functions";
import { UserProfileInfo } from "../../../../shared/user-profile/UserProfileInfo";

const globalPageObject = PageFactory.getInstance().createGlobalPageObjectPage();
const SMSList = PageFactory.getInstance().createSMSList();
const loader = require('csv-load-sync');


Given("User is on Send SMS popup", async function () {
    let temp = await globalPageObject.navigateToSubSms();
    logFailTestcase(temp, "Navigates to SMS list failed!");
});

When("System shows new SMS in the SMS list {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));

    const Organization = rows[0].Organization;
    const PhoneNumber = rows[0].PhoneNumber;
    const Template = rows[0].Template;
    const Customer = rows[0].Customer;
    const Content = rows[0].Content;
    let temp = true;

    await globalPageObject.reloadTable(3000);
    logInfoMessage(`Waiting for 3s...`);

    temp = await SMSList.validateValueFrom(UserProfileInfo.getDisplayName());
    logFailTestcase(temp, `Incorrect From!`);

    temp = await SMSList.validateValueTo(PhoneNumber);
    logFailTestcase(temp, `Incorrect To!`);

    temp = await SMSList.validateValueMessage(Content);
    logFailTestcase(temp, `Incorrect Content message!`);

    temp = await SMSList.validateValueSendDate(getDate());
    logFailTestcase(temp, `Incorrect Send date!`);
});

When("User opens an existing SMS Detail form {string}",async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));

    const Content = rows[0].Content;

    let temp = await SMSList.openSMSDetailByMessage(Content);
    logFailTestcase(temp, `Open Sms with content "${Content}" failed!`);
});