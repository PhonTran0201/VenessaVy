import { When } from "@cucumber/cucumber";
import { PageFactory } from "../../../../page-objects/PageFactory";
import { convertPathFileDataToDataRegression, logFailTestcase } from "../../../../shared/functions";
import { UserProfileInfo } from "../../../../shared/user-profile/UserProfileInfo";
const loader = require('csv-load-sync');

const SMSForm = PageFactory.getInstance().createSMSForm();
const SMSDetailForm = PageFactory.getInstance().createSMSDetailForm();

When("User inputs valid data into Send SMS form {string}", async function (filename) {
    const rows = loader(convertPathFileDataToDataRegression(filename));

    const Organization = rows[0].Organization;
    const PhoneNumber = rows[0].PhoneNumber;
    const Template = rows[0].Template;
    const Customer = rows[0].Customer;
    const Content = rows[0].Content;
    let temp = true;


    if (Organization) {
        temp = await SMSForm.inputOrganization(Organization);
        logFailTestcase(temp, `Input Organization failed!`);
    }
    if (PhoneNumber) {
        temp = await SMSForm.inputPhoneNumber(PhoneNumber);
        logFailTestcase(temp, `Input PhoneNumber failed!`);
    }
    if (Template) {
        temp = await SMSForm.inputTemplate(Template);
        logFailTestcase(temp, `Input Template failed!`);
    }
    // if (Customer) {
    //     temp = await SMSForm.inputCustomer(Customer);
    //     logFailTestcase(temp, `Input Customer failed!`);
    // }
    if (Content) {
        temp = await SMSForm.inputContent(Content);
        logFailTestcase(temp, `Input Content failed!`);
    }
});

When("User verifies info into SMS Detail form {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));

    const Organization = rows[0].Organization;
    const PhoneNumber = rows[0].PhoneNumber;
    const Template = rows[0].Template;
    const Customer = rows[0].Customer;
    const Content = rows[0].Content;
    let temp = true;

    temp = await SMSDetailForm.validateValueFrom(UserProfileInfo.getDisplayName());
    logFailTestcase(temp, `Incorrect From!`);

    temp = await SMSDetailForm.validateValueTo(PhoneNumber);
    logFailTestcase(temp, `Incorrect To!`);

    temp = await SMSDetailForm.validateValueCustomer(Customer);
    logFailTestcase(temp, `Incorrect Customer!`);

    temp = await SMSDetailForm.validateValueMessage(Content);
    logFailTestcase(temp, `Incorrect Content message!`);
});