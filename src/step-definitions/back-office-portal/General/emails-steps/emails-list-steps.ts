import { Before, Given, When } from "@cucumber/cucumber";
import { MailList } from "../../../../page-objects/back-office-portal/general/mail/mail-forms/MailList";
import { convertPathFileDataToDataRegression, getCurrentDateTime, logFailTestcase } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { UserProfileInfo } from "../../../../shared/user-profile/UserProfileInfo";

const loader = require("csv-load-sync");
let mailList: MailList;

Before(async function () {
    const context: ICommonContext = this.context;
    mailList = new MailList(context.driverService);
});

Given("User expands the first email at Emails list", async () => {
    let temp = await mailList.pressExpandEmailByRow();
    logFailTestcase(temp, "Expand first email on Email list failed!");
});

When("User verifies header of the first email at Emails list {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const row = rows[0];

    const Subject = row.Subject;
    const EmailAddressFrom = UserProfileInfo.getEmail();
    const EmailsAddressTo = row.EmailsAddressToOnEmailList.replace(/;/g, ",");
    const Body = row.Body;
    const SendDate = getCurrentDateTime();

    let temp = true;
    if (Subject) {
        temp = await mailList.validateSubjectHeaderOnEmailList(Subject);
        logFailTestcase(temp, "Incorrect Subject email!");
    }
    if (EmailAddressFrom) {
        temp = await mailList.validateEmailFromHeaderOnEmailList(EmailAddressFrom);
        logFailTestcase(temp, "Incorrect Email Address from!");
    }

    if (EmailsAddressTo) {
        temp = await mailList.validateEmailToHeaderOnEmailList(EmailsAddressTo);
        // logFailTestcase(temp, "Incorrect Email Address to!");
    }
    if (Body) {
        temp = await mailList.validateBodyHeaderOnEmailList(Body);
        logFailTestcase(temp, "Incorrect body header!");
    }
    if (SendDate) {
        temp = await mailList.validateSendDateHeaderEmailOnEmailList(SendDate);
        logFailTestcase(temp, "Incorrect Send date header!");
    }
});

When("User verifies details of the first email at Emails list {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const row = rows[0];

    const Attachments = row.Attachments;
    const Body = row.Body;


    //#endregion
    let temp = true;
    if (Attachments) {
        let file = Attachments.split(";");
        for (const iterator of file) {
            temp = await mailList.validateDocumentDetailOnEmailList(iterator);
            logFailTestcase(temp, `Validate document "${iterator}" failed!`);
        }
    }

    if (Body) {
        temp = await mailList.validateBodyDetailOnEmailList(Body);
        logFailTestcase(temp, "Incorrect body detail!");
    }
});