import { Before, Given, Then, When } from "@cucumber/cucumber";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { GlobalPagination } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPagination";
import { FirstNoticeOfLossDetails } from "../../../../page-objects/back-office-portal/insurance/first-notice-of-loss/FirstNoticeOfLossDetails";
import { FirstNoticeOfLossForm } from "../../../../page-objects/back-office-portal/insurance/first-notice-of-loss/FirstNoticeOfLossForm";
import { FirstNoticeOfLossList } from "../../../../page-objects/back-office-portal/insurance/first-notice-of-loss/FirstNoticeOfLossList";
import { ValidateField } from "../../../../shared/classes";
import { compareTheContentInPDFFile, convertPathFileDataToDataRegression, getCurrentDateTime, getTheFirstFileNameByPathInFolder, logFailTestcase, logInfoMessage, readFileNameInZippedFile } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { dataTestcase, DownloadFilePathGlobalVariable, ProjectNameGlobalVariable } from "../../../../shared/variables";
import { XLSX_Helper } from "../../../../shared/xlsx-helper";
import { getValueDataOfDataTestExecution, pushObjectToDataArrayWithUniqueKey } from "../../../../storage-data/functions/data-test-execution";

const loader = require("csv-load-sync");
let firstNoticeOfLossForm: FirstNoticeOfLossForm;
let firstNoticeOfLossList: FirstNoticeOfLossList;
let globalPageObject: GlobalPageObject;
let globalPagination: GlobalPagination;
let firstNoticeOfLossDetails: FirstNoticeOfLossDetails;

const xlsx = new XLSX_Helper();
Before(async function () {
    const context: ICommonContext = this.context;
    globalPageObject = new GlobalPageObject(context.driverService);
    firstNoticeOfLossForm = new FirstNoticeOfLossForm(context.driverService);
    firstNoticeOfLossList = new FirstNoticeOfLossList(context.driverService);
    globalPagination = new GlobalPagination(context.driverService);
    firstNoticeOfLossDetails = new FirstNoticeOfLossDetails(context.driverService);
});


Given("User navigates to FNOL list", async function () {
    const temp = await globalPageObject.navigateToMainFNOL();
    logFailTestcase(temp, "Navigate to FNOL list failed");

    // await firstNoticeOfLossList.openReportedByMeCaseList();
});

When("User selects a type at FNOL list {string}", async function (filename: string) {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const Queue = row.Queue;
    const temp = await firstNoticeOfLossList.switchQueue(Queue);
    logFailTestcase(temp, "Navigate to opportunity queue failed");
})

When("User inputs valid FNOL data from csv file {string}", async function (filename: string) {
    let row = loader(convertPathFileDataToDataRegression(filename))[0];
    const CaseTitle = row.CaseTitle;
    const Workflow = row.Workflow;
    const CaseType = row.CaseType;
    const SelectEntityType = row.SelectEntityType;
    const SearchEntity = row.SearchEntity;
    const Description = row.Description;
    const DueDate = row.DueDate;
    const Queue = row.Queue;
    const Priority = row.Priority;
    const AssignedTo = row.AssignedTo;

    let temp = true;
    if (CaseTitle) {
        temp = await firstNoticeOfLossForm.inputCaseTitleOnCaseForm(CaseTitle);
        logFailTestcase(temp, "Input Case Title failed");
    }

    if (Workflow) {
        temp = await firstNoticeOfLossForm.inputWorkFlowOnCaseForm(Workflow);
        logFailTestcase(temp, "Input Workflow failed");
    }

    if (CaseType) {
        temp = await firstNoticeOfLossForm.inputCaseTypeOnCaseForm(CaseType);
        logFailTestcase(temp, "Input Case Type failed");
    }

    if (SelectEntityType) {
        temp = await firstNoticeOfLossForm.inputSelectEntityTypeOnCaseForm(SelectEntityType);
        logFailTestcase(temp, "Input Select Entity Type failed");
    }

    if (SearchEntity) {
        temp = await firstNoticeOfLossForm.inputSearchEntityOnCaseForm(SearchEntity);
        logFailTestcase(temp, "Input Search Entity failed");
    }

    if (Description) {
        temp = await firstNoticeOfLossForm.inputDescriptionOnCaseForm(Description);
        logFailTestcase(temp, "Input Description failed")
    }
    if (DueDate) {
        temp = await firstNoticeOfLossForm.inputDueDateOnCaseForm(DueDate);
        logFailTestcase(temp, "Input Due Date failed");
    }
    if (Queue) {
        temp = await firstNoticeOfLossForm.inputQueueOnCaseForm(Queue);
        logFailTestcase(temp, "Input Queue failed");
    }
    if (Priority) {
        temp = await firstNoticeOfLossForm.inputPriorityOnCaseForm(Priority);
        logFailTestcase(temp, "Input Priority failed");
    }
    if (AssignedTo) {
        temp = await firstNoticeOfLossForm.inputAssignedToOnCaseForm(AssignedTo);
        logFailTestcase(temp, "Input Assigned To failed");
    }
    temp = await globalPageObject.pressSaveForm();
    logFailTestcase(temp, "Can't press save form");
});

Then("System shows new FNOL in the FNOL list {string}", async function (filename: string) {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const CaseTitle = row.CaseTitle;
    const SearchEntity = row.SearchEntity;
    const DueDate = row.DueDate;
    const Queue = row.Queue;
    const Priority = row.Priority;
    const AssignedTo = row.AssignedTo;
    const Status = row.Status;
    const CreateDate = await getCurrentDateTime();

    let temp = await globalPageObject.reloadTable(5000);
    await globalPageObject.waitForProgressBarLoaded_v2();

    temp = await firstNoticeOfLossList.validateCaseTitleValueOnList(CaseTitle);
    logFailTestcase(temp);
    // if (SearchEntity) {
    //     temp = await firstNoticeOfLossList.validateEntityValueOnList(SearchEntity);
    //     logFailTestcase(temp);
    // }
    temp = await firstNoticeOfLossList.validateCreateDateValueOnList(CreateDate);
    logFailTestcase(temp);

    //Actual due date hour always +7 from data
    temp = await firstNoticeOfLossList.validateDueDateOnList(DueDate || " N/A ");
    logFailTestcase(temp);

    temp = await firstNoticeOfLossList.validatePriorityOnList(Priority);
    logFailTestcase(temp);

    // temp = await firstNoticeOfLossList.validateAssigneeValueOnList(AssignedTo || " N/A ");
    // logFailTestcase(temp);

    // if (Queue) {
    //     temp = await firstNoticeOfLossList.validateQueueValueOnList(Queue);
    //     logFailTestcase(temp);
    // }
    if (Status) {
        temp = await firstNoticeOfLossList.validateStatusValueOnList(Status);
        logFailTestcase(temp);
    }

});

When("User updates a FNOL from preconditions steps from csv file {string}", async function (filename: string) {

    let row = loader(convertPathFileDataToDataRegression(filename))[0];
    const SelectedCase = row.SelectedCase;
    const CaseTitle = row.CaseTitle;
    const SelectEntityType = row.SelectEntityType;
    const SearchEntity = row.SearchEntity;
    const Description = row.Description;
    const DueDate = row.DueDate;
    const Queue = row.Queue;
    const Priority = row.Priority;
    const AssignedTo = row.AssignedTo;

    let temp1 = await firstNoticeOfLossList.openEditCaseFormByName(SelectedCase);
    logFailTestcase(temp1 > 0, `Enter edit FNOL form failed`);

    let temp = true;

    if (CaseTitle) {
        temp = await firstNoticeOfLossForm.inputCaseTitleOnCaseForm(CaseTitle);
        logFailTestcase(temp, "Input Case Title failed");
    }

    if (SelectEntityType) {
        temp = await firstNoticeOfLossForm.inputSelectEntityTypeOnCaseForm(SelectEntityType);
        logFailTestcase(temp, "Input Select Entity Type failed");
    }

    if (SearchEntity) {
        temp = await firstNoticeOfLossForm.inputSearchEntityOnCaseForm(SearchEntity);
        logFailTestcase(temp, "Input Search Entity failed");
    }

    if (Description) {
        temp = await firstNoticeOfLossForm.inputDescriptionOnCaseForm(Description);
        logFailTestcase(temp, "Input Description failed")
    }
    if (DueDate) {
        temp = await firstNoticeOfLossForm.inputDueDateOnCaseForm(DueDate);
        logFailTestcase(temp, "Input Due Date failed");
    }
    if (Queue) {
        temp = await firstNoticeOfLossForm.inputQueueOnCaseForm(Queue);
        logFailTestcase(temp, "Input Queue failed");
    }
    if (Priority) {
        temp = await firstNoticeOfLossForm.inputPriorityOnCaseForm(Priority);
        logFailTestcase(temp, "Input Priority failed");
    }
    if (AssignedTo) {
        temp = await firstNoticeOfLossForm.inputAssignedToOnCaseForm(AssignedTo);
        logFailTestcase(temp, "Input Assigned To failed");
    }
    temp = await globalPageObject.pressSaveForm();
    logFailTestcase(temp, "Can't press save form");
});

Then("System shows updated FNOL in the FNOL list {string}", async function (filename: string) {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const CaseTitle = row.CaseTitle;
    const SearchEntity = row.SearchEntity;
    const DueDate = row.DueDate;
    const Queue = row.Queue;
    const Priority = row.Priority;
    const AssignedTo = row.AssignedTo;

    let temp = await globalPageObject.reloadTable(5000);
    await globalPageObject.waitForProgressBarLoaded_v2();

    if (CaseTitle) {
        temp = await firstNoticeOfLossList.validateCaseTitleValueOnList(CaseTitle);
        logFailTestcase(temp);
    }

    if (SearchEntity) {
        temp = await firstNoticeOfLossList.validateEntityValueOnList(SearchEntity);
        logFailTestcase(temp);
    }

    //Actual due date hour always +7 from data
    temp = await firstNoticeOfLossList.validateDueDateOnList(DueDate || " N/A ");
    logFailTestcase(temp);

    if (Priority) {
        temp = await firstNoticeOfLossList.validatePriorityOnList(Priority);
        logFailTestcase(temp);
    }

    if (AssignedTo) {
        temp = await firstNoticeOfLossList.validateAssigneeValueOnList(AssignedTo || " N/A ");
        logFailTestcase(temp);
    }

    if (Queue) {
        temp = await firstNoticeOfLossList.validateQueueValueOnList(Queue);
        logFailTestcase(temp);
    }
});

When(`User deletes a FNOL from csv file {string}`, async function (filename) {
    let row = loader(convertPathFileDataToDataRegression(filename))[0];
    const SelectedCase = row.SelectedCase;

    let temp = true;
    temp = await globalPageObject.reloadTable(5000);
    await globalPageObject.waitForProgressBarLoaded_v2();

    let positionRow = await firstNoticeOfLossList.getRowByCaseTitle(SelectedCase);
    let refNumber = await firstNoticeOfLossList.getRefNumberByRow(positionRow);
    let validationField = new ValidateField(SelectedCase, 1, true, [refNumber.toString()], []);
    dataTestcase.push(validationField);
    if (await firstNoticeOfLossList.deleteCaseByName_v2(SelectedCase)) {
        // do nothing

    }
    else {
        logFailTestcase(false, `Delete FNOL failed`);
    }



    await globalPageObject.pressYesForm();
});

Then(`System does not show new FNOL in the FNOL list`, async function () {
    let beforeRefValue = dataTestcase.pop()!.message[0];
    await globalPageObject.reloadTable(100);
    await globalPageObject.waitForProgressBarLoaded_v2();
    if (await firstNoticeOfLossList.checkIfRefNumberExists(beforeRefValue) == true) {
        logFailTestcase(false, `FNOL still exists`);
    }

})

When(`User verifies UI at FNOL list page`, async function () {
    //do nothing
    await globalPageObject.waitForProgressBarLoaded_v2(100);
})

Then(`System shows buttons on top of FNOL table`, async function () {
    await firstNoticeOfLossList.verifyButtonsOnTopOfCaseTable();

})

Then(`System shows FNOL table with full column`, async function () {
    await firstNoticeOfLossList.verifyColumnsOfCaseTable();

})

Then(`System shows pagination buttons under of FNOL table`, async function () {
    let temp = await globalPagination.verifyPaginagtionButtonsAtMainList("FNOL");
    logFailTestcase(temp, "Verify paginagtion buttons at FNOL list: failed!");
})

When(`User opens FNOL form on Policy list`, async () => {
    let temp = await firstNoticeOfLossList.openFNOLformByRow(1);
    logFailTestcase(temp, 'opens FNOL form on Policy list failed!');
});

When(`User opens the FNOL details on FNOL list {string}`, async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const CaseTitle = row.CaseTitle;

    let temp = await firstNoticeOfLossList.openDetailCaseByName(CaseTitle);
    logFailTestcase(temp > 0, `open open Detail FNOL by Name '${CaseTitle}' failed!`);
    await globalPageObject.waitForProgressBarLoaded_v2();

});

Then(`User verifies information in FNOL details {string}`, async (filename) => {
    let Reference = await firstNoticeOfLossList.getReferenceValueOnList(1);
    pushObjectToDataArrayWithUniqueKey("Reference_FNOL", Reference);

    let temp = await firstNoticeOfLossList.openFNOLDetailByRowOnFNOLList(1);
    logFailTestcase(temp, 'opens FNOL detail on list failed!');
    await globalPageObject.waitForProgressBarLoaded();

    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const CaseTitle = row.CaseTitle;
    const DueDate = row.DueDate;
    const Priority = row.Priority;
    const AssignedTo = row.AssignedTo;
    const Workflow = "Workflow: " + row.Workflow;

    if (CaseTitle) {
        temp = await firstNoticeOfLossDetails.validateFNOLTitleInFNOLDetails(CaseTitle.toUpperCase());
        logFailTestcase(temp, 'validate FNOL title in details failed!');
    }
    if (Workflow) {
        temp = await firstNoticeOfLossDetails.validateWorkflowInFNOLDetails(Workflow);
        logFailTestcase(temp, 'validate workflow in details failed!');
    }
    if (Reference) {
        temp = await firstNoticeOfLossDetails.validateReferenceInFNOLDetails(Reference);
        logFailTestcase(temp, 'validate reference in details failed!');
    }
    if (Priority) {
        temp = await firstNoticeOfLossDetails.validatePriorityInFNOLDetails(Priority);
        logFailTestcase(temp, 'validate priority in details failed!');
    }
    if (AssignedTo) {
        temp = await firstNoticeOfLossDetails.validateAssignedToInFNOLDetails(AssignedTo);
        logFailTestcase(temp, 'validate assigned to in details failed!');
    }
    if (DueDate) {
        temp = await firstNoticeOfLossDetails.validateDueDateInFNOLDetails(DueDate);
        logFailTestcase(temp, 'validate due date in details failed!');
    }

});

When(`User inputs valid data into FNOL the information details form {string}`, async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const Organization = row.Organization;
    const Account = row.Account;
    const Policy = row.Policy;
    const DateOfLoss = row.DateOfLoss;
    const Product = row.Product;
    const ObjectName = row.ObjectName;
    const Address = row.Address;
    const ClaimHandler = row.ClaimHandler;
    const PhoneNumber = row.PhoneNumber;
    const EmailAddress = row.EmailAddress;
    const Description = row.Description;

    let temp = true;
    // if (Organization) {
    //     temp = await firstNoticeOfLossDetails.inputOrganizationClaimForm(Organization);
    //     logFailTestcase(temp, `Input organization "${Organization}" failed!`);
    // }

    temp = await firstNoticeOfLossDetails.inputAccountClaimForm(Account);
    logFailTestcase(temp, `Input account "${Account}" failed!`);

    temp = await firstNoticeOfLossDetails.inputProductClaimForm(Product);
    logFailTestcase(temp, `Input product "${Product}" failed!`);

    if (DateOfLoss) {
        temp = await firstNoticeOfLossDetails.inputDateOfLossClaimForm(DateOfLoss);
        logFailTestcase(temp, `Input Date of loss "${DateOfLoss}" failed!`);
    }

    temp = await firstNoticeOfLossDetails.inputPolicyClaimForm(Policy);
    logFailTestcase(temp, `Input policy "${Policy}" failed!`);

    if (ObjectName) {
        temp = await firstNoticeOfLossDetails.validateValueClaimForm(ObjectName, "Object name");
        logFailTestcase(temp, `Incorrect value "${ObjectName}" !`);
    }
    temp = await firstNoticeOfLossDetails.inputAddressClaimForm(Address);
    logFailTestcase(temp, `Input address "${Address}" failed!`);

    if (ClaimHandler) {
        temp = await firstNoticeOfLossDetails.inputClaimHandlerClaimForm(ClaimHandler);
        logFailTestcase(temp, `Input claim handler "${ClaimHandler}" failed!`);
    }


    temp = await firstNoticeOfLossDetails.inputPhoneNumberClaimForm(PhoneNumber);
    logFailTestcase(temp, `Input phone number "${PhoneNumber}" failed!`);

    temp = await firstNoticeOfLossDetails.inputEmailAddressClaimForm(EmailAddress);
    logFailTestcase(temp, `Input email address "${EmailAddress}" failed!`);

    if (Description) {
        temp = await firstNoticeOfLossDetails.inputDescriptionFNOLDetailsForm(Description);
        logFailTestcase(temp, `Input notes "${Description}" failed!`);
    }

    temp = await firstNoticeOfLossDetails.clickSaveButton();
    logFailTestcase(temp, `Click save button failed!`);

    await globalPageObject.waitForProgressBarLoaded();

    temp = await globalPageObject.checkToastSuccessExistWithMessage(`FNOL details saved successfully!`);
    logFailTestcase(temp, `System not show success message 'FNOL details saved successfully!'`);

});

When("User presses {string} button on FNOL details", async (btnName) => {
    let temp = true;
    if (btnName.localeCompare("Approve FNOL manually") === 0) {
        temp = await firstNoticeOfLossDetails.clickApprovalFNOLManuallyButton();
        logFailTestcase(temp, `click Approval FNOL Manually Button!`);

        temp = await globalPageObject.pressYesForm();
        logFailTestcase(temp, `press Yes confirmation form failed!`);

        // await globalPageObject.waitForProgressBarLoaded();
        try {
            temp = await globalPageObject.checkToastSuccessExistWithMessage(`First notice of loss updated successfully!`);
            logFailTestcase(temp, `Message "First notice of loss updated successfully!" not shown!`);
        } catch (error) {
            console.log(error);
        }


    } else if (btnName.localeCompare("Reject") === 0) {
        temp = await firstNoticeOfLossDetails.clickRejectButton();
        logFailTestcase(temp, `click Reject Button failed!`);
    } else {
        logFailTestcase(false, `Can not find '${btnName}' on FNOL details!`);
    }
});

//#region attachments section
When("User uploads file attachments at FNOL details page {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    for (const row of rows) {
        const temp = __dirname;
        let UploadDocuments: string = "";
        let UploadDocumentFailed = row.UploadDocumentFailed;

        if (__dirname.includes("jenkins") && !__dirname.includes(".jenkins")) {
            logInfoMessage("Running on jenkins...");
            UploadDocuments = (__dirname.substring(0, __dirname.lastIndexOf(ProjectNameGlobalVariable) + ProjectNameGlobalVariable.length) + "/" + row.UploadDocuments).replace(/\\/g, '/');
        }
        else {
            logInfoMessage("Runing on local...");
            UploadDocuments =
                (__dirname.substring(0, __dirname.lastIndexOf(ProjectNameGlobalVariable) + ProjectNameGlobalVariable.length) + "\\" + row.UploadDocuments).replace(/\//g, "\\");
        }
        logInfoMessage("\tFinal file path:");
        logInfoMessage("\t\t" + UploadDocuments);

        logInfoMessage("\tDirname:");
        logInfoMessage("\t\t" + __dirname);
        if (UploadDocumentFailed && UploadDocumentFailed.localeCompare("True") === 0) {
            let temp2 = await firstNoticeOfLossDetails.uploadFileAttachmentFNOL(UploadDocuments, true);
            logFailTestcase(temp2, `Upload file "${UploadDocuments}" failed!`);
        } else {
            let temp2 = await firstNoticeOfLossDetails.uploadFileAttachmentFNOL(UploadDocuments);
            logFailTestcase(temp2, `Upload file "${UploadDocuments}" failed!`);
        }
    }
});
When("User removes file attachments at FNOL details page {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    for (const row of rows) {
        let DocumentName = row.DocumentName;
        let temp = await firstNoticeOfLossDetails.removeFileAttachmentByFileName(DocumentName);
        logFailTestcase(temp, `Remove file "${DocumentName}" failed!`);
    }
});
When("User closes this FNOL details page", async () => {
    let temp = await firstNoticeOfLossDetails.closeActiveFNOLTab();
    logFailTestcase(temp, `Close active FNOL details page failed`);
});
Then("System does not shown file attachments at section Attachments FNOL details page {string}", async (filename) => {
    await globalPageObject.waitForProgressBarLoaded_v2();
    const rows = loader(convertPathFileDataToDataRegression(filename));
    let temp = true;
    for (const row of rows) {
        const DocumentName = row.DocumentName;
        const DocumentType = row.DocumentType;

        temp = await firstNoticeOfLossDetails.validateFileAtachmentIsDisplayed(DocumentName, DocumentType);
        logFailTestcase(!temp, `Document '${DocumentName}.${DocumentType}' still shown on Attachments section`);
    }
});
Then("System shows file attachments at section Attachments FNOL details page {string}", async (filename) => {
    await globalPageObject.waitForProgressBarLoaded_v2();
    const rows = loader(convertPathFileDataToDataRegression(filename));
    let temp = true;
    for (const row of rows) {
        const DocumentName = row.DocumentName;
        const DocumentType = row.DocumentType;

        temp = await firstNoticeOfLossDetails.validateFileAtachmentIsDisplayed(DocumentName, DocumentType);
        logFailTestcase(temp, `Can not find document '${DocumentName}.${DocumentType}' on Attachments section`);
    }
});
Then("User downloads file attachments at section Attachments FNOL details page {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    let temp = true;
    for (const row of rows) {
        const DocumentName = row.DocumentName;
        const DocumentType = row.DocumentType;

        temp = await firstNoticeOfLossDetails.downloadFileAttachmentByFileName(DocumentName);
        logFailTestcase(temp, `Can not download document '${DocumentName}.${DocumentType}' on Attachments section`);
    }
});
Then("User verifies content on the downloaded file attachments {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    for (let i = 0; i < rows.length; i++) {
        const DocumentName = rows[i].DocumentName;
        const DocumentType = rows[i].DocumentType;
        let ExpectedDownloadedFilePath = __dirname.substring(0, __dirname.lastIndexOf(ProjectNameGlobalVariable) + ProjectNameGlobalVariable.length) + "\\" + rows[i].UploadDocuments;
        let ActualDownloadedFilePath = DownloadFilePathGlobalVariable + "\\" + getTheFirstFileNameByPathInFolder(DownloadFilePathGlobalVariable, DocumentType);
        if (__dirname.includes("jenkins") && !__dirname.includes(".jenkins")) {
            logInfoMessage("Running on jenkins...");
            ExpectedDownloadedFilePath = ExpectedDownloadedFilePath.replace(/\\/g, "/");
            ActualDownloadedFilePath = ActualDownloadedFilePath.replace(/\\/g, "/");
        }
        else {
            logInfoMessage("Runing on local...");
            ExpectedDownloadedFilePath = ExpectedDownloadedFilePath.replace(/\//g, "\\");
            ActualDownloadedFilePath = ActualDownloadedFilePath.replace(/\//g, "\\");
        }
        console.log(`Actual Downloaded file Path at row ${i + 1} : ` + ActualDownloadedFilePath);
        console.log(`Expected Downloaded file Path at row ${i + 1} : ` + ExpectedDownloadedFilePath);
        if (DocumentType.localeCompare(`pdf`) === 0) {

            let temp = await compareTheContentInPDFFile(ActualDownloadedFilePath, ExpectedDownloadedFilePath);
            logFailTestcase(temp, `Incorrect the content in PDF file has name '${DocumentName}' !`);

        }
        else if (DocumentType.localeCompare(`xlsx`) === 0) {

            let ActualDataExcel = await xlsx.loadFile(ActualDownloadedFilePath, true);
            let ExpectedDataExcel = await xlsx.loadFile(ExpectedDownloadedFilePath, true);
            let temp = JSON.stringify(ExpectedDataExcel) === JSON.stringify(ActualDataExcel);
            logFailTestcase(temp, `Incorrect the downloaded excel file has name '${DocumentName}'!`);

        }
        else if (DocumentType.localeCompare(`zip`) === 0) {

            let ActualArrayFile = readFileNameInZippedFile(ActualDownloadedFilePath);
            let ExpectedArrayFile = readFileNameInZippedFile(ExpectedDownloadedFilePath);
            console.log("ActualArrayFile: " + ActualArrayFile);
            console.log("ExpectedArrayFile: " + ExpectedArrayFile);
            if (ActualArrayFile.length != ExpectedArrayFile.length) {
                logFailTestcase(false, `Incorrect the downloaded zip file has name '${DocumentName}'!`);
            }
            for (let j = 0; j < ActualArrayFile.length; j++) {
                if (ActualArrayFile[j] != ExpectedArrayFile[j]) {
                    logFailTestcase(false, `Incorrect content on the downloaded zip file has name '${DocumentName}'!`);
                }
            }
        }
    }
});
Then("System disables file attachments at section Attachments FNOL details page {string}", async (filename) => {
    await globalPageObject.waitForProgressBarLoaded_v2();
    const rows = loader(convertPathFileDataToDataRegression(filename));
    let temp = true;
    for (const row of rows) {
        const DocumentName = row.DocumentName;
        const DocumentType = row.DocumentType;

        temp = await firstNoticeOfLossDetails.validateFileAtachmentIsDisplayed(DocumentName, DocumentType, true);
        logFailTestcase(temp, `Can not find document '${DocumentName}.${DocumentType}' on Attachments section`);
    }
});
//#endregion

When("User opens details of FNOL by reference", async () => {
    const reference = getValueDataOfDataTestExecution("FNOLReference");

    let temp = await firstNoticeOfLossList.openDetailCaseByReference(reference);
    logFailTestcase(temp, `Open Detail FNOL failed!`);
});
