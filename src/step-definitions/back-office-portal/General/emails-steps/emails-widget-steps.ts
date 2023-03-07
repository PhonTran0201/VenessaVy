import { Before, Given, When } from "@cucumber/cucumber";
import { AppEntityWidgets } from "../../../../page-objects/back-office-portal/general/app-entity-widgets/AppEntityWidgets";
import { convertPathFileDataToDataRegression, getCurrentDateTime, logFailTestcase } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { UserProfileInfo } from "../../../../shared/user-profile/UserProfileInfo";
const loader = require("csv-load-sync");
let appEntityWidgets: AppEntityWidgets;
Before(async function () {
    const context: ICommonContext = this.context;
    appEntityWidgets = new AppEntityWidgets(context.driverService);
});

Given("User expands the first email at Email widget", async () => {
    let temp = await appEntityWidgets.pressExpandEmailByRow();
    logFailTestcase(temp, "Expand first email on Email widget failed!");
});

When("User verifies header of the first email at Email widget {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const row = rows[0];

    const Subject = row.Subject;
    const SendDate = getCurrentDateTime();

    let temp = await appEntityWidgets.validateSubjectHeaderOnEmailWidget(Subject);
    logFailTestcase(temp, "Incorrect Subject email!");

    temp = await appEntityWidgets.validateSendDateHeaderEmailOnEmailWidget(SendDate);
    logFailTestcase(temp, "Incorrect Send date email!");
});

When("User verifies details of the first email at Email widget {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const row = rows[0];

    const EmailAddressFrom = UserProfileInfo.getDisplayName() + ":<" + UserProfileInfo.getEmail() + ">";
    const EmailsAddressTo = row.EmailsAddressToOnEmailWidget.replace(/;/g, ",");
    const EmailsAddressCc = row.EmailsAddressCc.replace(/;/g, ",");
    const EmailsAddressBcc = row.EmailsAddressBcc.replace(/;/g, ",");
    const SendDate = getCurrentDateTime();
    const Subject = row.Subject;
    const Attachments = row.Attachments;
    const Body = row.Body;


    //#endregion
    let temp = true;
    if (EmailAddressFrom) {
        temp = await appEntityWidgets.validateEmailFromDetailOnEmailWidget(EmailAddressFrom);
        logFailTestcase(temp, "Incorrect Email From!");
    }
    if (EmailsAddressTo) {
        temp = await appEntityWidgets.validateEmailToDetailOnEmailWidget(EmailsAddressTo);
        // logFailTestcase(temp, "Incorrect Emails Address To!");
    }
    if (EmailsAddressCc) {
        temp = await appEntityWidgets.validateEmailCcDetailOnEmailWidget(EmailsAddressCc);
        logFailTestcase(temp, "Incorrect Emails Cc Address!");
    }

    if (EmailsAddressBcc) {
        temp = await appEntityWidgets.validateEmailBccDetailOnEmailWidget(EmailsAddressBcc);
        logFailTestcase(temp, "Incorrect Emails Bcc Address!");
    }

    if (SendDate) {
        temp = await appEntityWidgets.validateSendDateDetailOnEmailWidget(SendDate);
        logFailTestcase(temp, "Incorrect Send date detail!");
    }
    if (Subject) {
        temp = await appEntityWidgets.validateSubjectDetailOnEmailWidget(Subject);
        logFailTestcase(temp, "Incorrect Subject detail!");
    }
    if (Attachments) {
        let file = Attachments.split(";");
        for (const iterator of file) {
            temp = await appEntityWidgets.validateDocumentDetailOnEmailWidget(iterator);
            logFailTestcase(temp, `Validate document "${iterator}" failed!`);
        }
    }

    if (Body) {
        temp = await appEntityWidgets.validateBodyDetailOnEmailWidget(Body);
        logFailTestcase(temp, "Incorrect body detail!");
    }
});