import { Before, Given, Then, When } from "@cucumber/cucumber";
import { DataRepo } from "../../../../core/modals/DataRepo";
import { SeleniumWebDriverService } from "../../../../core/selenium-webdriver.service";
import { CustomerListAGS } from "../../../../page-objects/agent-portal/hogs/customer/CustomerListAGS";
import { AccountTabDocumentForm } from "../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-document/AccountTabDocumentForm";
import { AccountTabDocumentList } from "../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-document/AccountTabDocumentList";
import { AccountList } from "../../../../page-objects/back-office-portal/general/account/account-list/AccountList";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { clearAllFileInFolder, compareTheContentInPDFFile, convertPathFileDataToDataRegression, executeCommandLine, getCurrentDateTime, getTheContentInPDFFile, getTheFirstFileNameByPathInFolder, logFailTestcase, logInfoMessage, logSuccessMessage, logWarningMessage, readFileNameInZippedFile } from '../../../../shared/functions';
import { ICommonContext } from "../../../../shared/interfaces";
import { VarsamSeasonalCoverBreakdown } from "../../../../shared/policy-calculations/VarsamSeasonalCoverBreakdown";
import { currencyToNumber } from "../../../../shared/tenant-setting/tenant-setting";
import { UserProfileInfo } from "../../../../shared/user-profile/UserProfileInfo";
import { DownloadFilePathGlobalVariable, scenarioTags } from "../../../../shared/variables";
import { getDataTestCaseObjectByNameField } from "../../../../storage-data/functions/data-test-case";
import { getValueDataOfDataTestExecution, pushObjectToDataArrayWithUniqueKey } from "../../../../storage-data/functions/data-test-execution";


const loader = require("csv-load-sync");
const fs = require('fs');

let accountTabDocumentList: AccountTabDocumentList;
let accountTabDocumentForm: AccountTabDocumentForm;
let accountList: AccountList;
let globalPageObject: GlobalPageObject;


//Variable using to compare
let expectedName: string;
let expectedDescription: string;
let expectedTags: string;
let expectedCreatedDate: string;
let fileDataUpload: string = "./data/data_document.csv";

let numberOfRecords = 0;
Before(async function () {
  const context: ICommonContext = this.context;
  accountTabDocumentList = new AccountTabDocumentList(context.driverService);
  accountTabDocumentForm = new AccountTabDocumentForm(context.driverService);
  accountList = new AccountList(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
  if (scenarioTags.has("@AgentPortalHogs")) {
    accountList = new CustomerListAGS(context.driverService);
  }
});

Given("User is on Document list", async () => {
  let temp = await globalPageObject.navigateToSubDocuments();
  logFailTestcase(temp, "Navigates to Document list faled!");
});

Given("User opens an account from precondition steps {string}", async function (filename: string) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  fileDataUpload = filename;
  const accountName = rows[0].SelectedAccount;
  let temp = await accountList.openDetailAccountByName(accountName);
  logFailTestcase(temp, `Open detail account "${accountName}" failed!`);
});

Given("User is on Document list and uploads a valid document from csv file", async () => {
  let temp = await globalPageObject.navigateToSubDocuments();
  logFailTestcase(temp, "Navigates to Document list failed!");
  const rows = loader(convertPathFileDataToDataRegression(fileDataUpload));
  for (const row of rows) {
    await accountTabDocumentList.openUploadDocumentPopup();
    const Name = row.Name;
    const Tags = row.Tags;
    const Description = row.Description;
    const temp = __dirname;
    let UploadDocuments: string = "";

    if (!(__dirname.includes("jenkins") && !__dirname.includes(".jenkins"))){
      logInfoMessage("Runing on local...");
      UploadDocuments =
        __dirname.substring(0, temp.length - 63) + "\\" + row.UploadDocuments.replace("/", "\\");
    }
    else {
      logInfoMessage("Running on jenkins...");
      UploadDocuments = __dirname.substring(0, temp.length - 63) + "/" + row.UploadDocuments.replace("\\", "/");
    }
    logInfoMessage("\tFinal file path:");
    logInfoMessage("\t\t" + UploadDocuments);

    logInfoMessage("\tDirname:");
    logInfoMessage("\t\t" + __dirname);

    expectedName = Name;
    expectedTags = Tags;
    expectedDescription = Description;

    expectedCreatedDate = getCurrentDateTime();

    if (Name) {
      let check = await accountTabDocumentForm.inputNameOnDocumentForm(Name);
      logFailTestcase(check, "Input Name on document form failed!");
    }
    if (Tags) {
      let check = await accountTabDocumentForm.inputTagOnDocumentForm(Tags);
      logFailTestcase(check, "Input Tags on document form failed!");
    }
    if (Description) {
      let check = await accountTabDocumentForm.inputDescriptionOnDocumentForm(Description);
      logFailTestcase(check, "Input Description on document form failed!");
    }
    if (UploadDocuments) {
      let check = await accountTabDocumentForm.inputUploadFileOnDocumentForm(UploadDocuments);
      logFailTestcase(check, "Upload file on document form failed!");
    }

    let check = await globalPageObject.pressSaveForm();
    logFailTestcase(check, "Can't press save upload document!");
    check = await globalPageObject.waitForProgressBarLoaded();
    logFailTestcase(check, "Can't Save upload document!");
  }
});
When("User uploads a valid document from csv file {string}", async function (filename: string) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  fileDataUpload = filename;
  for (const row of rows) {
    await accountTabDocumentList.openUploadDocumentPopup();
    const Name = row.Name;
    const Tags = row.Tags;
    const Description = row.Description;
    const temp = __dirname;
    let UploadDocuments: string = "";

    if (!(__dirname.includes("jenkins") && !__dirname.includes(".jenkins"))){
      logInfoMessage("Runing on local...");
      UploadDocuments =
        __dirname.substring(0, temp.length - 63) + "\\" + row.UploadDocuments.replace("/", "\\");
    }
    else {
      logInfoMessage("Running on jenkins...");
      UploadDocuments = __dirname.substring(0, temp.length - 63) + "/" + row.UploadDocuments.replace("\\", "/");
    }
    logInfoMessage("\tFinal file path:");
    logInfoMessage("\t\t" + UploadDocuments);

    logInfoMessage("\tDirname:");
    logInfoMessage("\t\t" + __dirname);

    expectedName = Name;
    expectedTags = Tags;
    expectedDescription = Description;

    expectedCreatedDate = getCurrentDateTime();

    if (Name) {
      let check = await accountTabDocumentForm.inputNameOnDocumentForm(Name);
      logFailTestcase(check, "Input Name on document form failed!");
    }
    if (Tags) {
      let check = await accountTabDocumentForm.inputTagOnDocumentForm(Tags);
      logFailTestcase(check, "Input Tags on document form failed!");
    }
    if (Description) {
      let check = await accountTabDocumentForm.inputDescriptionOnDocumentForm(Description);
      logFailTestcase(check, "Input Description on document form failed!");
    }
    if (UploadDocuments) {
      let check = await accountTabDocumentForm.inputUploadFileOnDocumentForm(UploadDocuments);
      logFailTestcase(check, "Upload file on document form failed!");
    }

    let check = await globalPageObject.pressSaveForm();
    logFailTestcase(check, "Can't press save upload document!");
    check = await globalPageObject.waitForProgressBarLoaded();
    logFailTestcase(check, "Can't save upload document!");
  }
});

// Cái này nó sẽ add thêm cái dd/mm/yyyy HH:mm vào trong tên file luôn cho dễ tìm kiếm
When("User inputs valid data into Document form {string}", async function (filename: string) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const row = rows[0];
  await accountTabDocumentList.openUploadDocumentPopup();
  const CreatedDate = getCurrentDateTime();
  const Name = row.Name + CreatedDate.replace(/\//g, "_").replace(" ", "_").replace(":", "_");
  const Tags = row.Tags;
  const Description = row.Description;
  const temp = __dirname;
  let UploadDocuments: string = "";

  if (!(__dirname.includes("jenkins") && !__dirname.includes(".jenkins"))){
    logInfoMessage("Runing on local...");
    UploadDocuments =
      __dirname.substring(0, temp.length - 63) + "\\" + row.UploadDocuments.replace("/", "\\");
  }
  else {
    logInfoMessage("Running on jenkins...");
    UploadDocuments = __dirname.substring(0, temp.length - 63) + "/" + row.UploadDocuments.replace("\\", "/");
  }
  logInfoMessage("\tFinal file path:");
  logInfoMessage("\t\t" + UploadDocuments);

  logInfoMessage("\tDirname:");
  logInfoMessage("\t\t" + __dirname);

  pushObjectToDataArrayWithUniqueKey("NameDocument", Name);
  pushObjectToDataArrayWithUniqueKey("TagsDocument", Tags);
  pushObjectToDataArrayWithUniqueKey("DescriptionDocument", Description);
  pushObjectToDataArrayWithUniqueKey("CreatedDateDocument", CreatedDate);

  if (Name) {
    let check = await accountTabDocumentForm.inputNameOnDocumentForm(Name);
    logFailTestcase(check, "Input Name on document form failed!");
  }
  if (Tags) {
    const tagsTemp = Tags.split(";");
    for (const tag of tagsTemp) {
      let check = await accountTabDocumentForm.inputTagOnDocumentForm(tag);
      logFailTestcase(check, `Input Tag "${tag}" on document form failed!`);
    }
  }
  if (Description) {
    let check = await accountTabDocumentForm.inputDescriptionOnDocumentForm(Description);
    logFailTestcase(check, "Input Description on document form failed!");
  }
  if (UploadDocuments) {
    let check = await accountTabDocumentForm.inputUploadFileOnDocumentForm(UploadDocuments);
    logFailTestcase(check, "Upload file on document form failed!");
  }
});

When("User deletes a valid document from precondition steps", async () => {
  await globalPageObject.waitForProgressBarLoaded_v2();
  numberOfRecords = await globalPageObject.getNumberOfTotalRecordsSubTab();
  logFailTestcase(numberOfRecords > 0, `Number of document in list is ${numberOfRecords}`);

  let temp = await accountTabDocumentList.deleteValidDocument();
  logFailTestcase(temp, "Press delete document failed");
  temp = await globalPageObject.pressYesForm();
  logFailTestcase(temp, "Press Yes form to delete document failed");
});

When("User deletes a valid document from csv file {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  fileDataUpload = filename;
  for (let row of rows) {
    const selectedDocument = row.Name;
    let temp = await accountTabDocumentList.DeleteDocumentByName(selectedDocument);
    logFailTestcase(temp, `Press delete document "${selectedDocument}" failed!`);
    temp = await globalPageObject.pressYesForm();
    logFailTestcase(temp, `Press Yes form - Document "${selectedDocument}" failed!`);
  }
});

When("User downloads a valid document from precondition steps from csv file {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const filenameDownload = rows[0].filenameDownload;
  let temp = await accountTabDocumentList.downloadDocument();
  logFailTestcase(temp, "Can't download document!");
});

When("User downloads a valid document from csv file {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  fileDataUpload = filename;
  for (let row of rows) {
    const selectedDocument = row.Name;
    let temp = await accountTabDocumentList.DownloadDocumentByName(selectedDocument);
    logFailTestcase(temp, `Can't download document with name "${selectedDocument}"!`);
  }
});

Then("System doesn't show document in the document list", async () => {
  await globalPageObject.waitForProgressBarLoaded_v2();
  await globalPageObject.waitForSeconds(4000);
  const numberOfRecordsAfter = await globalPageObject.getNumberOfTotalRecordsSubTab();
  logFailTestcase(numberOfRecordsAfter === 0 || numberOfRecords - numberOfRecordsAfter === 1, `Delete document failed due to Total record is "${numberOfRecordsAfter}"`);
  //await documentPage.assertDeleteValidDocument();
});
Then("System does not show document in the document list", async () => {
  const rows = loader(fileDataUpload);
  let len = rows.length;

  for (let i = len - 1, j = 1; i >= 0; i--, j++) {
    const documentname = rows[i].Name;

    await accountTabDocumentList.assertDeleteDocument(
      j, //position of row want to validate
      documentname,
    );
  }
});

Then("System shows new document in the Document list", async () => {
  const temp = await accountTabDocumentList.assertUploadDocument(
    expectedName,
    expectedTags,
    expectedDescription,
    expectedCreatedDate,
    1,
    UserProfileInfo.getDisplayName()
  );
  logFailTestcase(temp, "Check new document on list failed!");
});

Then("System downloads document successfully", async () => {
  // we just check that the download buttion is active
  // await documentPage.assertDownloadDocument(filenameDownload);
});

When("User downloads {string} documents by ticking checkbox of each document {string}", async (theNumberOfDocument: string, filename) => {
  await globalPageObject.waitForProgressBarLoaded_v2();
  await globalPageObject.waitForProgressBarLoaded_v2();
  let temp = true;
  let documentNumber = parseInt(theNumberOfDocument);
  let totalRecord = await globalPageObject.getNumberOfTotalRecordsSubTab();
  if (documentNumber > totalRecord) {
    logFailTestcase(false, 'the number of document needs to download is exceeded the total records on system')
  }
  let documentList = [{
    documentList: {
      DocumentName: "",
    }
  }];
  documentList.pop();
  for (let i = 1; i <= documentNumber; i++) {
    temp = await accountTabDocumentList.tickCheckBoxDocumentByRow(i);
    logFailTestcase(temp, `tick on the box to select document at row ${i} failed!`);
    let documentName = await accountTabDocumentList.getDocumentNameByRow(i);
    let docList = {
      documentList: {
        DocumentName: "",
      }
    };

    docList.documentList.DocumentName = documentName;
    documentList.push(docList);
  }
  console.log(`Document List ` + JSON.stringify(documentList));

  const storeData = (data, path) => {
    try {
      fs.writeFileSync(path, JSON.stringify(data), { flag: "w" });
    } catch (error) {
      console.error(error);
    }
  }
  storeData(documentList, filename);

  temp = await accountTabDocumentList.pressBtnDownLoadDocumentInList();
  logFailTestcase(temp, 'press Btn DownLoad Document In List failed!');

});

When("User downloads multiple documents by ticking the checked all checkbox {string}", async (filename) => {
  await globalPageObject.waitForProgressBarLoaded_v2();
  await globalPageObject.waitForProgressBarLoaded_v2();
  await globalPageObject.expandNumberOfItemSubList(10);
  let temp = true;
  let documentList = [{
    documentList: {
      DocumentName: "",
    }
  }];
  documentList.pop();
  temp = await accountTabDocumentList.tickCheckAllDocumentOnHeader();
  let totalRecord = await globalPageObject.getNumberOfTotalRecordsSubTab();
  let count = totalRecord < 10 ? totalRecord : 10;
  logFailTestcase(temp, `tick the checked all checkbox failed!`);
  for (let i = 1; i <= count; i++) {
    temp = await accountTabDocumentList.validateCheckeBoxIsTickedByRowOnDocumentList(i);
    logFailTestcase(temp, `the Checkbox at row ${i} is not checked!`);
    let documentName = await accountTabDocumentList.getDocumentNameByRow(i);
    let docList = {
      documentList: {
        DocumentName: "",
      }
    };

    docList.documentList.DocumentName = documentName;
    documentList.push(docList);
  }
  console.log(documentList);

  const storeData = (data, path) => {
    try {
      fs.writeFileSync(path, JSON.stringify(data), { flag: "w" });
    } catch (error) {
      console.error(error);
    }
  }
  storeData(documentList, filename);
  await globalPageObject.waitForSeconds(2000);
  temp = await accountTabDocumentList.pressBtnDownLoadDocumentInList();
  await globalPageObject.waitForSeconds(2000);
  //temp = await accountTabDocumentList.pressBtnDownLoadDocumentInList();
  console.log("Click download document...");
  logFailTestcase(temp, 'press Btn DownLoad Document In List failed!')
});


Then("User validates the zipped file is downloaded from Documents tab {string}", async (filename) => {
  await globalPageObject.waitForSeconds(6000);
  await globalPageObject.findDownloadFileAfterDownload("");
  await SeleniumWebDriverService.getInstance().getDownLoadedFileName();
  let DownloadLocation = DownloadFilePathGlobalVariable;
  console.log("DownloadLocation : " + DownloadLocation);
  //let file = getTheFirstFileNameByPathInFolder(DownloadFilePathGlobalVariable, "zip");
  let zipFilePath = DownloadFilePathGlobalVariable + "/" + getTheFirstFileNameByPathInFolder(DownloadFilePathGlobalVariable, "zip");
  console.log("File Path>: " + zipFilePath);
  let arrayFile = readFileNameInZippedFile(zipFilePath);
  console.log(arrayFile);
  const docList = require("../../../../." + filename);
  console.log(docList);

  for (let i = 0; i < arrayFile.length; i++) {
    logWarningMessage(`Checking docList at line ${i + 1}...`);
    const DocumentName = docList[i].documentList.DocumentName;
    for (let j = 0; j < arrayFile.length; j++) {
      if (arrayFile[j].includes(DocumentName)) {
        break;
      } else if (j == arrayFile.length - 1) {
        logFailTestcase(false, `incorrect document '${DocumentName}'`);
      }
    }
  }

});

Then("System shows new {string} document in the Document list {string}", async (type, filename) => {
  let row = loader(convertPathFileDataToDataRegression(filename))[0];
  const TemplateDocName = row.TemplateDocName;
  const TemplateDescription = row.TemplateDescription;

  await globalPageObject.reloadTable(6000);
  await globalPageObject.waitForProgressBarLoaded_v2();
  let expectedName: string = "";
  let expectedTags: string = "";
  let expectedDescription: string = "";
  let expectedCreatedDate: string = "";
  let expectedCreatedBy: string = "";
  const QuoteReference = getValueDataOfDataTestExecution("QuoteReference");

  if (type.localeCompare('Quote') === 0) {
    expectedName = TemplateDocName ? TemplateDocName + " " + QuoteReference : QuoteReference;
    expectedTags = QuoteReference;
    expectedDescription = TemplateDescription ? TemplateDescription : "NewBusiness document for quote";
    expectedCreatedDate = getCurrentDateTime();
    expectedCreatedBy = UserProfileInfo.getDisplayName();
  }
  else if (type.localeCompare('Policy') === 0) {
    expectedName = TemplateDocName ? TemplateDocName + " " + QuoteReference : QuoteReference;
    expectedTags = QuoteReference;
    expectedDescription = TemplateDescription ? TemplateDescription + " " + QuoteReference : "Policy document for policy";
    expectedCreatedDate = getCurrentDateTime();
    expectedCreatedBy = UserProfileInfo.getDisplayName();
  }
  else if (type.localeCompare('Quote summary document') === 0) {
    expectedName = type;
    expectedTags = getValueDataOfDataTestExecution("CustomerReference");
    expectedDescription = TemplateDescription ? TemplateDescription + " " + QuoteReference : "QuoteSummary document for";
    expectedCreatedDate = getCurrentDateTime();
    expectedCreatedBy = UserProfileInfo.getDisplayName();
  }
  else if (type.localeCompare('Policy Summary Document') === 0) {
    expectedName = "";
    expectedTags = getValueDataOfDataTestExecution("CustomerReference");
    expectedDescription = TemplateDescription ? TemplateDescription + " " + QuoteReference : "PolicySummary document for";
    expectedCreatedDate = getCurrentDateTime();
    expectedCreatedBy = UserProfileInfo.getDisplayName();
  }
  let temp = await accountTabDocumentList.searchDocumentOnDocumentTab(expectedName);
  logFailTestcase(temp, `Search Document with '${expectedName} failed!'`);
  await globalPageObject.waitForSeconds(2000);
  // await globalPageObject.expandNumberOfItemSubList();
  let totalRecord = await globalPageObject.getNumberOfTotalRecordsSubTab()
  logInfoMessage(`Total record: ${totalRecord}`);
  for (let i = 1; i <= totalRecord; i++) {
    temp = await accountTabDocumentList.assertUploadDocument(
      expectedName,
      expectedTags,
      expectedDescription,
      expectedCreatedDate,
      i,
      expectedCreatedBy,
    );
    if (temp) {
      break;
    } else if (!temp && i === totalRecord) {
      logFailTestcase(temp, "Check new document on list failed!");
    }
  }
});


Then("User validate content in the dowloaded file {string}", async (sampleFilePath: string) => {
  let filedownloadPath = DownloadFilePathGlobalVariable + "/" + getTheFirstFileNameByPathInFolder(DownloadFilePathGlobalVariable, "pdf");
  console.log(`filedownloadPath: ` + filedownloadPath);
  let temp = await compareTheContentInPDFFile(filedownloadPath, sampleFilePath);
  logFailTestcase(temp, 'Incorrect the content in PDF file!');
});

Then("User validate content in the dowloaded file for Varsam product Innbo Seasonal - Renewal case", async () => {
  let filedownloadPath = DownloadFilePathGlobalVariable + "/" + getTheFirstFileNameByPathInFolder(DownloadFilePathGlobalVariable, "pdf");
  console.log(`filedownloadPath: ` + filedownloadPath);
  
  const QuoteReference = getValueDataOfDataTestExecution("QuoteReference");
  const StartDate = getValueDataOfDataTestExecution("StartDate");
  const EndDate = getValueDataOfDataTestExecution("EndDate");
  const HussoppPolicyPremiumCoverBreakdown = Math.round(parseFloat(getValueDataOfDataTestExecution("HussoppPolicyPremiumCoverBreakdown"))).toString();
  const InnboStandardPolicyPremiumCoverBreakdown = Math.round(parseFloat(getValueDataOfDataTestExecution("InnboStandardPolicyPremiumCoverBreakdown"))).toString();
  const HussoppAnnualPremiumCoverBreakdown =Math.round(parseFloat(getValueDataOfDataTestExecution("HussoppAnnualPremiumCoverBreakdown"))).toString();
  const InnboStandardAnnualPremiumCoverBreakdown = Math.round(parseFloat(getValueDataOfDataTestExecution("InnboStandardAnnualPremiumCoverBreakdown"))).toString();
  
  // const expectedContentFile =
  //   (`Model.InsuranceContext.Reference ${QuoteReference}\n` +
  //   `(Model.InsuranceContext.StartDate?.Value?.ToString("dd/MM/yyyy")) -\n` +
  //   `(Model.InsuranceContext.EndDate?.Value?.ToString("dd/MM/yyyy"))\n` +
  //   `${StartDate} - ${EndDate}\n` +
  //   `period\n` +
  //   `Hussopp\n` +
  //   `${HussoppPolicyPremiumCoverBreakdown}\n` +
  //   `Innbo Standard\n` +
  //   `${InnboStandardPolicyPremiumCoverBreakdown}\n` +
  //   `annual\n` +
  //   `Hussopp\n` +
  //   `${HussoppAnnualPremiumCoverBreakdown}\n` +
  //   `Innbo Standard\n` +
  //   `${InnboStandardAnnualPremiumCoverBreakdown}`).split("\n");

  const expectedContentFile = 
  (`Policy reference: ${QuoteReference}\n` +
  `Policy period: ${StartDate} - ${EndDate}\n` +
  `Policy Payment Schedule\n` +
  `Number of payments: 1\n` +
  `Payment PeriodPayment Due DatePayment TotalPayment Status`).split("\n");
  // `${StartDate} - ${EndDate}31/01/202341,494.74 NOKPending\n`

  let actualContenInfile = (await getTheContentInPDFFile(filedownloadPath)).replace(/^\s*\n/gm, "").split("\n");
  console.log("AcctualFile: ");
  console.log(actualContenInfile);
  for (let i = 0; i < expectedContentFile.length; i++) {
    if(expectedContentFile[i] !== actualContenInfile[i]){
      logFailTestcase(false, `\t\tLine ${i + 1}: Expected: ${expectedContentFile[i]} - Actual: ${actualContenInfile[i]}`);
    }
  }
  console.log("Expected:\n");
  console.log(expectedContentFile);

  console.log("\nActual:\n");
  console.log(actualContenInfile);
  logSuccessMessage("\n\t=> Passed!");
});

Then("User validate content in the dowloaded file after renew for Varsam product Innbo Seasonal - Renewal case", async () => {
  let filedownloadPath = DownloadFilePathGlobalVariable + "/" + getTheFirstFileNameByPathInFolder(DownloadFilePathGlobalVariable, "pdf");
  console.log(`filedownloadPath: ` + filedownloadPath);
  
  const QuoteReference = getValueDataOfDataTestExecution("QuoteReference").split("/")[0];
  const StartDate = getValueDataOfDataTestExecution("StartDateAfterRenew");
  const EndDate = getValueDataOfDataTestExecution("EndDateAfterRenew");
  const HussoppPolicyPremiumCoverBreakdown = Math.round(parseFloat(getValueDataOfDataTestExecution("HussoppAnnualPremiumCoverBreakdown"))).toString();
  const InnboStandardPolicyPremiumCoverBreakdown = Math.round(parseFloat(getValueDataOfDataTestExecution("InnboStandardAnnualPremiumCoverBreakdown"))).toString();
  const HussoppAnnualPremiumCoverBreakdown = Math.round(parseFloat(getValueDataOfDataTestExecution("HussoppAnnualPremiumCoverBreakdown"))).toString();
  const InnboStandardAnnualPremiumCoverBreakdown = Math.round(parseFloat(getValueDataOfDataTestExecution("InnboStandardAnnualPremiumCoverBreakdown"))).toString();
  
  // const expectedContentFile =
  //   (`Model.InsuranceContext.Reference ${QuoteReference}\n` +
  //   `(Model.InsuranceContext.StartDate?.Value?.ToString("dd/MM/yyyy")) -\n` +
  //   `(Model.InsuranceContext.EndDate?.Value?.ToString("dd/MM/yyyy"))\n` +
  //   `${StartDate} - ${EndDate}\n` +
  //   `period\n` +
  //   `Hussopp\n` +
  //   `${HussoppPolicyPremiumCoverBreakdown}\n` +
  //   `Innbo Standard\n` +
  //   `${InnboStandardPolicyPremiumCoverBreakdown}\n` +
  //   `annual\n` +
  //   `Hussopp\n` +
  //   `${HussoppAnnualPremiumCoverBreakdown}\n` +
  //   `Innbo Standard\n` +
  //   `${InnboStandardAnnualPremiumCoverBreakdown}`).split("\n");

  const expectedContentFile = 
    (`Policy reference: ${QuoteReference}\n` +
    `Policy period: ${StartDate} - ${EndDate}\n` +
    `Policy Payment Schedule\n` +
    `Number of payments: 1\n` +
    `Payment PeriodPayment Due DatePayment TotalPayment Status`).split("\n");
    // `03/02/2023 - 02/02/202403/02/20232,136,392.02 NOKPending`
  
  let actualContenInfile = (await getTheContentInPDFFile(filedownloadPath)).replace(/^\s*\n/gm, "").split("\n");

  console.log("Expected:\n");
  console.log(expectedContentFile);

  console.log("\nActual:\n");
  console.log(actualContenInfile);

  for (let i = 0; i < expectedContentFile.length; i++) {
    if(expectedContentFile[i] !== actualContenInfile[i]){
      logFailTestcase(false, `\t\tLine ${i + 1}: Expected: ${expectedContentFile[i]} - Actual: ${actualContenInfile[i]}`);
    }
  }
  
  logSuccessMessage("\n\t=> Passed!");
});

Then("User searches document by Name from DataTestExecution", async () => {
  const name = getValueDataOfDataTestExecution("NameDocument");
  logFailTestcase(name.length > 0, `Not found DocumentName in DataTestExecution!`);

  let temp = await accountTabDocumentList.searchDocumentOnDocumentTab(name);
  logFailTestcase(temp, `Search Document with name ${name} failed!`);
});


// This step is using data stored in DataTestExecution to compare
Then("User verifies info new Document on Document list", async () => {
  const name = getValueDataOfDataTestExecution("NameDocument");
  let tags = getValueDataOfDataTestExecution("TagsDocument");
  const Description = getValueDataOfDataTestExecution("DescriptionDocument");
  const CreatedDate = getValueDataOfDataTestExecution("CreatedDateDocument");

  let temp = true;
  temp = await accountTabDocumentList.validateValueDocumentList(name, "Name", 1);
  logFailTestcase(temp, "Incorrect name");

  tags = tags.replace(/\;/g, ",").toLowerCase();
  temp = await accountTabDocumentList.validateValueDocumentList(tags, "Document tags", 1);
  logFailTestcase(temp, `Incorrect Tags`);

  temp = await accountTabDocumentList.validateValueDocumentList(Description, "Description", 1);
  logFailTestcase(temp, "Incorrect Description!");

  temp = await accountTabDocumentList.validateValueDocumentList(CreatedDate, "Created date", 1);
  logFailTestcase(temp, "Incorrect Created date");

  temp = await accountTabDocumentList.validateValueDocumentList(UserProfileInfo.getDisplayName(), "Created by", 1);
  logFailTestcase(temp, `Incorrect Created By`);
});
