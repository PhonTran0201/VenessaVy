import { Before, Then, When } from "@cucumber/cucumber";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { SaleTabDocumentForm } from "../../../../page-objects/back-office-portal/general/sale/sale-details/tabs/sale-document/SaleTabDocumentForm";
import { SaleTabDocumentList } from "../../../../page-objects/back-office-portal/general/sale/sale-details/tabs/sale-document/SaleTabDocumentList";
import { convertPathFileDataToDataRegression, getCurrentDateTime, logFailTestcase, logInfoMessage } from '../../../../shared/functions';
import { ICommonContext } from "../../../../shared/interfaces";
import { UserProfileInfo } from "../../../../shared/user-profile/UserProfileInfo";
import { getValueDataOfDataTestExecution, pushObjectToDataArrayWithUniqueKey } from "../../../../storage-data/functions/data-test-execution";


const loader = require("csv-load-sync");
let saleTabDocumentList: SaleTabDocumentList;
let saleTabDocumentForm: SaleTabDocumentForm;
let globalPageObject: GlobalPageObject;
Before(async function () {
  const context: ICommonContext = this.context;
  saleTabDocumentList = new SaleTabDocumentList(context.driverService);
  saleTabDocumentForm = new SaleTabDocumentForm(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
});

// Cái này nó sẽ add thêm cái dd/mm/yyyy HH:mm vào trong tên file luôn cho dễ tìm kiếm
When("User inputs valid data into Sale Document form {string}", async function (filename: string) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const row = rows[0];
  await saleTabDocumentList.openUploadDocumentPopup();
  const CreatedDate = getCurrentDateTime();
  const Name = row.Name + CreatedDate.replace(/\//g, "_").replace(" ", "_").replace(":", "_");
  const Tags = row.Tags;
  const Description = row.Description;
  const temp = __dirname;
  let UploadDocuments: string = "";

  if (!(__dirname.includes("jenkins") && !__dirname.includes(".jenkins"))){
    logInfoMessage("Runing on local...");
    let repoName = "pegasus-core-aut-crm";
    UploadDocuments =
      __dirname.substring(0, __dirname.lastIndexOf(repoName) + repoName.length) + "\\" + row.UploadDocuments.replace(/\//g, "\\");
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
    if (__dirname.includes("Test-Framework-Clone")) {
      projectName = "Test-Framework-Clone";
    }
    UploadDocuments = __dirname.substring(0, __dirname.lastIndexOf(projectName) + projectName.length) + "/" + row.UploadDocuments.replace(/\\/g, "/");
  }
  logInfoMessage("\tFinal file path:");
  logInfoMessage("\t\t" + UploadDocuments);

  logInfoMessage("\tDirname:");
  logInfoMessage("\t\t" + __dirname);

  pushObjectToDataArrayWithUniqueKey("NameDocumentSale", Name);
  pushObjectToDataArrayWithUniqueKey("TagsDocumentSale", Tags);
  pushObjectToDataArrayWithUniqueKey("DescriptionDocumentSale", Description);
  pushObjectToDataArrayWithUniqueKey("CreatedDateDocumentSale", CreatedDate);

  if (Name) {
    let check = await saleTabDocumentForm.inputNameOnDocumentForm(Name);
    logFailTestcase(check, "Input Name on document form failed!");
  }
  if (Tags) {
    const tagsTemp = Tags.split(";");
    for (const tag of tagsTemp) {
      let check = await saleTabDocumentForm.inputTagOnDocumentForm(tag);
      logFailTestcase(check, `Input Tag ${tag} on document form failed!`);
    }
  }
  if (Description) {
    let check = await saleTabDocumentForm.inputDescriptionOnDocumentForm(Description);
    logFailTestcase(check, "Input Description on document form failed!");
  }
  if (UploadDocuments) {
    let check = await saleTabDocumentForm.inputUploadFileOnDocumentForm(UploadDocuments);
    logFailTestcase(check, "Upload file on document form failed!");
  }
});

// This step is using data stored in DataTestExecution to compare
Then("User verifies info new Document on Sale Document list", async () => {
  const name = getValueDataOfDataTestExecution("NameDocumentSale");
  let tags = getValueDataOfDataTestExecution("TagsDocumentSale");
  const Description = getValueDataOfDataTestExecution("DescriptionDocumentSale");
  const CreatedDate = getValueDataOfDataTestExecution("CreatedDateDocumentSale");

  let temp = true;
  temp = await saleTabDocumentList.validateValueDocumentList(name, "Name", 1);
  logFailTestcase(temp, "Incorrect name");

  tags = tags.replace(/\;/g, ",").toLowerCase();
  temp = await saleTabDocumentList.validateValueDocumentList(tags || "N/A", "Document tags", 1);
  logFailTestcase(temp, `Incorrect Tags`);

  temp = await saleTabDocumentList.validateValueDocumentList(Description || "N/A", "Description", 1);
  logFailTestcase(temp, "Incorrect Description!");

  temp = await saleTabDocumentList.validateValueDocumentList(CreatedDate, "Created date", 1);
  logFailTestcase(temp, "Incorrect Created date");

  temp = await saleTabDocumentList.validateValueDocumentList(UserProfileInfo.getDisplayName(), "Created by", 1);
  logFailTestcase(temp, `Incorrect Created By`);
});

Then("User searches sale document by Name from DataTestExecution", async () => {
  await globalPageObject.waitForProgressBarLoaded_v2();
  const name = getValueDataOfDataTestExecution("NameDocumentSale");
  logFailTestcase(name.length > 0, `Not found DocumentName in DataTestExecution!`);

  let temp = await saleTabDocumentList.searchDocumentOnDocumentTab(name);
  logFailTestcase(temp, `Search Document with name ${name} failed!`);
});