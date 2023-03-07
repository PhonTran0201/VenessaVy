import { Before, Given, Then, When } from "@cucumber/cucumber";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { ClaimTabDocumentFormInsurance } from "../../../../page-objects/back-office-portal/insurance/claim/claim-details/tabs/claim-document/ClaimTabDocumentFormInsurance";
import { ClaimTabDocumentListInsurance } from "../../../../page-objects/back-office-portal/insurance/claim/claim-details/tabs/claim-document/ClaimTabDocumentListInsurance";
import { ValidateField } from "../../../../shared/classes";
import { convertPathFileDataToDataRegression, getCurrentDateTime, logFailTestcase, logInfoMessage, logWarningMessage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { UserProfileInfo } from "../../../../shared/user-profile/UserProfileInfo";
import { dataTestcase } from "../../../../shared/variables";
import { getDataTestCaseObjectByNameField } from "../../../../storage-data/functions/data-test-case";


const loader = require("csv-load-sync");
let claimTabDocumentListInsurance: ClaimTabDocumentListInsurance;
let claimTabDocumentFormInsurance: ClaimTabDocumentFormInsurance;
let globalPageObject: GlobalPageObject;


Before(async function () {
  const context: ICommonContext = this.context;
  claimTabDocumentListInsurance = new ClaimTabDocumentListInsurance(context.driverService);
  claimTabDocumentFormInsurance = new ClaimTabDocumentFormInsurance(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
});

Given("User opens Claim documents form", async function () {
  const temp = await claimTabDocumentListInsurance.openDocumentForm();
  logFailTestcase(temp, "User Claim document form failed!");
});

When("User inputs valid data into Claim document form {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];

  const FileName = row.FileName;
  const DocumentType = row.DocumentType;

  const temp = __dirname;
  let UploadDocuments: string = "";

  if (row.UploadDocuments) {
    if (!(__dirname.includes("jenkins") && !__dirname.includes(".jenkins"))){
      logInfoMessage("Runing on local...");
      UploadDocuments =
        __dirname.substring(0, temp.length - 62) + "\\" + row.UploadDocuments.replace("/", "\\");
    }
    else {
      logInfoMessage("Running on jenkins...");
      UploadDocuments = __dirname.substring(0, temp.length - 62) + "/" + row.UploadDocuments.replace("\\", "/");
    }
    logInfoMessage("\tFinal file path:");
    logInfoMessage("\t\t" + UploadDocuments);

    logInfoMessage("\tDirname:");
    logInfoMessage("\t\t" + __dirname);
  }

  if (FileName) {
    let temp1 = await claimTabDocumentFormInsurance.inputFileNameDocumentForm(FileName);
    logFailTestcase(temp1, `Inputs File name on Claim document form failed!`);
  }

  if (DocumentType) {
    let temp1 = await claimTabDocumentFormInsurance.inputDocumentTypeDocumentForm(DocumentType);
    logFailTestcase(temp1, `Inputs Document fype on Claim document form failed!`);
  }

  if (UploadDocuments) {
    let temp1 = await claimTabDocumentFormInsurance.inputFileDocumentForm(UploadDocuments);
    logFailTestcase(temp1, `Upload file on Claim document form failed!`);
  }

});

Then("User presses {string} button on Claim document form", async function (buttonName) {
  await globalPageObject.waitForProgressBarLoaded_v2(500);
  switch (buttonName) {
    case "Cancel": {
      let temp = await globalPageObject.pressCancelForm();
      logFailTestcase(temp, `Press "${buttonName}" button on Claim form failed!`);
      break;
    }
    case "Save": {
      let temp = await globalPageObject.pressSaveForm();
      logFailTestcase(temp, `Press "${buttonName}" button on Claim form failed!`);
      break;
    }
    case "X": {
      await globalPageObject.closeOpeningForm();
      break;
    }
    default:
      logFailTestcase(false, `Press "${buttonName}" button on Claim form failed!`);
      break;
  }
});

Then("System shows Claim document on Document list {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];

  const FileName = row.FileName;
  const DocumentType = row.DocumentType;
  const Size = row.Size;
  const UploadedBy = UserProfileInfo.getDisplayName();
  const Date = getCurrentDateTime();

  let temp = await claimTabDocumentListInsurance.validateValueClaimDocumentList(FileName, "File Name", 1, false);
  logFailTestcase(temp);

  temp = await claimTabDocumentListInsurance.validateValueClaimDocumentList(DocumentType, "Type", 1, false);
  logFailTestcase(temp);

  if (Size) {
    temp = await claimTabDocumentListInsurance.validateValueClaimDocumentList(Size, "Size", 1, false);
    logFailTestcase(temp);
  }

  if (UploadedBy) {
    temp = await claimTabDocumentListInsurance.validateValueClaimDocumentList(UploadedBy, "Uploaded By", 1, false);
    logFailTestcase(temp);
  }

  temp = await claimTabDocumentListInsurance.validateValueClaimDocumentList(Date, "Date", 1, false);
  logFailTestcase(temp, `Expected date "${Date}" failed!`);
});

Then("System does not show Claim document on Document list {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];

  const FileName = row.FileName;
  const DocumentType = row.DocumentType;
  const Size = row.Size;
  const Date = getCurrentDateTime().substring(0, 10);

  let temp1 = await claimTabDocumentListInsurance.validateValueClaimDocumentList(FileName, "File Name", 1, false);

  let temp2 = await claimTabDocumentListInsurance.validateValueClaimDocumentList(DocumentType, "Type", 1, false);

  let temp3 = await claimTabDocumentListInsurance.validateValueClaimDocumentList(Size, "Size", 1, false);

  let temp4 = await claimTabDocumentListInsurance.validateValueClaimDocumentList(Date, "Date", 1, true);

  const check = !(temp1 && temp2 && temp3 && temp4);
  logFailTestcase(check, `The claim document is still created on Claim document list`);
});

When("User downloads a valid document on Claim document list {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const selectedDocument = rows[0].FileName;
  let temp = await claimTabDocumentListInsurance.DownloadDocumentByName(selectedDocument);
  logFailTestcase(temp, `Can't press download document with name "${selectedDocument}"!`);

  temp = await globalPageObject.waitForProgressBarLoaded();
  logFailTestcase(temp, `There is no service requested after press download document!`);
});

When("User removes a valid document on Claim document list {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const selectedDocument = rows[0].FileName;

  const positionRow = await claimTabDocumentListInsurance.getPositionRowDocumentByName(selectedDocument);
  logFailTestcase(positionRow > 0, `Get position of document "${selectedDocument}" failed!`);

  const createDateDocument = await claimTabDocumentListInsurance.getValueClaimDocumentList("Date", positionRow);
  logFailTestcase(createDateDocument.length > 0, `Get date at line "${createDateDocument}" failed!`);

  dataTestcase.push(new ValidateField("DocumentPositionRow", 1, true, [positionRow.toString()], []));
  dataTestcase.push(new ValidateField("DocumentFileName", 1, true, [selectedDocument], []));
  dataTestcase.push(new ValidateField("DocumentCreatedDate", 1, true, [createDateDocument], []));

  let temp = await claimTabDocumentListInsurance.RemoveDocumentByName(selectedDocument);
  logFailTestcase(temp, `Can't press remove document with name "${selectedDocument}"!`);

  logWarningMessage(`Press remove document with name "${selectedDocument}" and date "${createDateDocument}":`);

  temp = await globalPageObject.pressYesForm();
  logFailTestcase(temp, "Press Yes confirmation failed!");
});

Then("System removes Claim document successfully", async () => {
  const positionOfRemovedRow = parseInt(getDataTestCaseObjectByNameField("DocumentPositionRow")?.message[0] || "-1");
  const fileName = getDataTestCaseObjectByNameField("DocumentFileName")?.message[0] || "";
  const date = getDataTestCaseObjectByNameField("DocumentCreatedDate")?.message[0] || "";

  const actualFileName = await claimTabDocumentListInsurance.getValueClaimDocumentList("File Name", positionOfRemovedRow);
  const actualDate = await claimTabDocumentListInsurance.getValueClaimDocumentList("Date", positionOfRemovedRow);
  if (fileName.localeCompare(actualFileName) === 0 && date.localeCompare(actualDate) === 0) {
    logFailTestcase(false, `Document with file name is "${actualFileName}" and date is "${actualDate}" isn't removed!`);
  }
});

When("User inputs invalid data into Claim document form and checks validation {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const len = rows.length;
  for (let i = 0; i < len; i++) {
    logWarningMessage(`Checking line "${i + 1}" file csv...`);
    const FileName = rows[i].FileName;
    const DocumentType = rows[i].DocumentType;

    const dirname = __dirname;
    let UploadDocuments: string = "";
    if (rows[i].UploadDocuments) {
      if (!(__dirname.includes("jenkins") && !__dirname.includes(".jenkins"))){
        logInfoMessage("Runing on local...");
        UploadDocuments = __dirname.substring(0, dirname.length - 62) + "\\" + rows[i].UploadDocuments;
      }
      else {
        logInfoMessage("Running on jenkins...");
        UploadDocuments = __dirname.substring(0, dirname.length - 62) + "/" + rows[i].UploadDocuments.replace("\\", "/");
      }
      logInfoMessage("\tFinal file path:");
      logInfoMessage("\t\t" + UploadDocuments);

      logInfoMessage("\tDirname:");
      logInfoMessage("\t\t" + __dirname);
    }
    let temp = true;
    if (filename) {
      temp = await claimTabDocumentFormInsurance.inputFileNameDocumentForm(filename);
      logFailTestcase(temp, `Input File Name "${FileName}" failed!`);
    }

    if (DocumentType) {
      temp = await claimTabDocumentFormInsurance.inputDocumentTypeDocumentForm(DocumentType);
      logFailTestcase(temp, `Input Document Type "${DocumentType}" failed!`);
    }

    if (UploadDocuments) {
      temp = await claimTabDocumentFormInsurance.inputFileDocumentForm(UploadDocuments);
      logFailTestcase(temp, `Upload file "${UploadDocuments}" failed!`);
    }

    temp = await globalPageObject.pressSaveForm();
    logFailTestcase(temp, "Press save Upload Claim document form failed!");

    temp = await globalPageObject.checkProgressBarLoading();
    logFailTestcase(!temp, `System calls some servive after press "Save" button!`);

    temp = await claimTabDocumentFormInsurance.checkValidationOnClaimDocumentFormExist();
    // let temp2 = await globalPageObject.checkToastErrorExist();
    // logFailTestcase(temp || temp2, 'There is no validation message on Claim Document form!');

    logFailTestcase(temp, 'There is no validation message on Claim Document form!');

    await globalPageObject.closeOpeningForm();
    logWarningMessage(`\tLine "${i + 1}" passed!`);

    temp = await claimTabDocumentListInsurance.openDocumentForm();
    logFailTestcase(temp, "Open Claim document form failed!");

    await globalPageObject.closeAllToastError();
  }
});

Then("User checks document type exists on Claim document form {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const DocumentTypeName = rows[0].DocumentTypeName;

  let temp = await claimTabDocumentFormInsurance.inputDocumentTypeDocumentForm(DocumentTypeName);
  logFailTestcase(temp, `Document type "${DocumentTypeName}" is not found on Claim document form!`);

  await globalPageObject.closeOpeningForm();
});