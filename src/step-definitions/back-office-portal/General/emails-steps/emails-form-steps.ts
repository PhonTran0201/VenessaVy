import { Before, Given } from "@cucumber/cucumber";
import { MailForm } from "../../../../page-objects/back-office-portal/general/mail/mail-forms/MailForm";
import { convertPathFileDataToDataRegression, logFailTestcase, logInfoMessage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";


const loader = require("csv-load-sync");

let mailForm: MailForm;
Before(async function () {
    const context: ICommonContext = this.context;
    mailForm = new MailForm(context.driverService);
});

Given("User inputs valid data into mail form {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const row = rows[0];

    //#region Declare varaiable
    const SelectEntityType = row.SelectEntityType;
    const SearchEntities = row.SearchEntities;
    const EmailsAddressTo = row.EmailsAddressTo;
    const IsCc = row.IsCc;
    const EmailsAddressCc = row.EmailsAddressCc;
    const IsBcc = row.IsBcc;
    const EmailsAddressBcc = row.EmailsAddressBcc;
    const Template = row.Template;
    const Account = row.Account;
    const EntityType = row.EntityType;
    const EntityValue = row.EntityValue;
    const Subject = row.Subject;
    const Body = row.Body;
    const AccountDocument = row.AccountDocument;
    const Attachments = row.Attachments;
    //#endregion



    //#region Input values
    let temp = true;


    //#region  From - To
    if (SelectEntityType) {
        temp = await mailForm.inputSelectEntityType(SelectEntityType);
        logFailTestcase(temp, "Select Entity Type failed!");
    }
    if (SearchEntities) {
        let entity = SearchEntities.split(";");
        for (const iterator of entity) {
            temp = await mailForm.inputSearchEntity(iterator);
            logFailTestcase(temp, `Input Entity name "${iterator}" failed!`);
        }
    }
    if (EmailsAddressTo) {
        let EmailsTo = EmailsAddressTo.split(";");
        for (const iterator of EmailsTo) {
            temp = await mailForm.inputEmailAddressTo(iterator);
            logFailTestcase(temp, `Input email = "${iterator}" failed!`);
        }
    }
    if (IsCc && IsCc.toLowerCase().localeCompare("yes") === 0) {
        temp = await mailForm.pressCcButton();
        logFailTestcase(temp, "Press Cc button failed!");
        if (EmailsAddressCc) {
            let EmailsCc = EmailsAddressCc.split(";");
            for (const iterator of EmailsCc) {
                temp = await mailForm.inputCcEmail(iterator);
                logFailTestcase(temp, `Input email cc "${iterator} failed!`);
            }
        }
    }
    if (IsBcc && IsBcc.toLowerCase().localeCompare("yes") === 0) {
        temp = await mailForm.pressBccButton();
        logFailTestcase(temp, "Press Bcc button failed!");
        if (EmailsAddressBcc) {
            let EmailsBcc = EmailsAddressBcc.split(";");
            for (const iterator of EmailsBcc) {
                temp = await mailForm.inputBccEmail(iterator);
                logFailTestcase(temp, `Input email Bcc "${iterator} failed!`);
            }
        }
    }
    //#endregion


    //#region Template
    if (Template) {
        temp = await mailForm.inputTemplate(Template);
        logFailTestcase(temp, "Input template failed!");
    }
    if (Account) {
        temp = await mailForm.inputAccount(Account);
        logFailTestcase(temp, "Input Account failed!");
    }
    if (EntityType) {
        temp = await mailForm.inputEntityType(EntityType);
        logFailTestcase(temp, "Input Entity Type!");
    }
    if (EntityValue) {
        temp = await mailForm.inputEntityValue(EntityValue);
        logFailTestcase(temp, "Input Entity Value!");
    }
    if (Subject) {
        temp = await mailForm.inputSubject(Subject);
        logFailTestcase(temp, "Input Subject failed!");
    }
    if (Body) {
        temp = await mailForm.inputBody(Body);
        logFailTestcase(temp, "Input body failed!");
    }
    //#endregion


    //#region Document
    if (AccountDocument) {
        temp = await mailForm.inputAccountDocument(AccountDocument);
        logFailTestcase(temp, "Input account document failed!");
    }
    if (Attachments) {
        const docs = Attachments.split(";");
        for (const doc of docs) {
            const temp2 = __dirname;
            let UploadDocuments: string = "";

            if (!(__dirname.includes("jenkins") && !__dirname.includes(".jenkins"))){
                logInfoMessage("Runing on local...");
                let repoName = "pegasus-core-aut-crm";
                UploadDocuments =
                    __dirname.substring(0, __dirname.lastIndexOf(repoName) + repoName.length) + "\\" + doc.replace(/\//g, "\\");
            }
            else {
                logInfoMessage("Running on jenkins...");
                let projectName = "Test-Framework";
                if (__dirname.includes("Atlas-Test-Framework")) {
                    projectName = "Atlas-Test-Framework";
                }
                if (__dirname.includes("hogse-test-framework")) {
                    projectName = "hogse-test-framework";
                }
                UploadDocuments = __dirname.substring(0, __dirname.lastIndexOf(projectName) + projectName.length) + "/" + doc.replace(/\\/g, "/");
            }
            logInfoMessage("\tFinal file path:");
            logInfoMessage("\t\t" + UploadDocuments);

            logInfoMessage("\tDirname:");
            logInfoMessage("\t\t" + __dirname);

            temp = await mailForm.inputUploadFileAttachment(UploadDocuments);
            logFailTestcase(temp, `Input attachment "${UploadDocuments}" failed!`);
        }
    }
    //#endregion


    //#endregion
});