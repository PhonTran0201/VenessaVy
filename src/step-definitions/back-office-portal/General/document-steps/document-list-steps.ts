import { Before, When } from "@cucumber/cucumber";
import { AccountTabDocumentList } from "../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-document/AccountTabDocumentList";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { convertPathFileDataToDataRegression, getCurrentDateTime, logFailTestcase, logInfoMessage, logWarningMessage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { UserProfileInfo } from "../../../../shared/user-profile/UserProfileInfo";


const loader = require("csv-load-sync");
let accountTabDocumentList: AccountTabDocumentList;
let globalPageObject: GlobalPageObject;

Before(async function () {
  const context: ICommonContext = this.context;
  accountTabDocumentList = new AccountTabDocumentList(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
});

When("User presses Generate Documents button in entity detail", async () => {
  let temp = await accountTabDocumentList.openGenerateDocumentsForm();
  logFailTestcase(temp, `Press Generate Documents button failed!`);
});

When("User searches document with valid data from csv file {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  for (let i = 0; i < rows.length; i++) {
    logWarningMessage(`Checking Search at line ${i + 1} in csv...`);
    let temp = true;
    // let temp = await accountTabDocumentList.searchDocumentOnDocumentTab("");
    // logFailTestcase(temp, "Reset search field failed!");


    // Basic field
    const SearchKeyword = rows[i].SearchKeyword;


    if (SearchKeyword) {
      temp = await accountTabDocumentList.searchDocumentOnDocumentTab(SearchKeyword);
      logFailTestcase(temp, `Input and Search key word "${SearchKeyword}" failed!`);
    }

    const DocumentNumber = parseInt(rows[i].DocumentNumber);
    const actualTotalNumber = await globalPageObject.getNumberOfTotalRecordsSubTab();


    async function validateValueSearchDocument(positionRow: number) {
      //Validate SalesName, Account, Pipeline, SalesStage, SalesRep, Product
      if (SearchKeyword) {
        temp = await accountTabDocumentList.validateValueDocumentList(SearchKeyword, "Name", positionRow, true);
        logFailTestcase(temp, `Name "${SearchKeyword}" does not match to result`);
      }
    }

    if (DocumentNumber >= 1 && DocumentNumber === actualTotalNumber) {
      let countTemp = actualTotalNumber >= 10 ? 10 : actualTotalNumber;
      for (let j = 1; j <= countTemp; j++) {
        await validateValueSearchDocument(j);
      }
    } else if (DocumentNumber === 0 && DocumentNumber === actualTotalNumber) {
      logInfoMessage(`There is NO records found on list!`);
    }
    else if (DocumentNumber < 0 && actualTotalNumber > 0) {
      let countTemp = actualTotalNumber >= 10 ? 10 : actualTotalNumber;
      for (let j = 1; j <= countTemp; j++) {
        await validateValueSearchDocument(j);
      }
    }
    else {
      logWarningMessage(`There are ${actualTotalNumber} total records found!`);
      logFailTestcase(false, `Line ${i + 1} in csv: failed...`);
    }
    logWarningMessage(`\tLine ${i + 1} passed!`);
  }
});

When("User verifies document on Document list in entity detail {string}", async (filename) =>{
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const row = rows[0];

  const IsGenerateDocument = row.IsGenerateDocument; // Specific for Generate Document tc
  const NameAccount = row.NameAccount; // Specific for Generate Document tc
  const DisplayNameDocumentTemplate = row.DisplayNameDocumentTemplate; // Specific for Generate Document tc

  const NameDocument = row.NameDocument;
  let documentNameFully = NameDocument;
  const Description = row.DescriptionDocument;
  const DocumentTags = row.DocumentTags;
  const CreatedBy = row.CreatedBy || UserProfileInfo.getDisplayName();
  const CreatedDate = getCurrentDateTime();

  let temp = true;
  if (IsGenerateDocument && IsGenerateDocument.toLowerCase() === "yes") {
    if (DisplayNameDocumentTemplate) {
      documentNameFully = DisplayNameDocumentTemplate;
    }
    else {
      let currentDateTime = getCurrentDateTime().substring(0, 10).split("/");
      let createdDate = `${currentDateTime[2]}-${currentDateTime[1]}-${currentDateTime[0]}`;
      documentNameFully = `${NameDocument} - ${NameAccount} - ${createdDate}`;
    }
  }


  if (documentNameFully) {
    temp = await accountTabDocumentList.searchDocumentOnDocumentTab(documentNameFully);
    logFailTestcase(temp, `Input and Search key word "${documentNameFully}" failed!`);
  }

  temp = await accountTabDocumentList.validateValueDocumentList(documentNameFully, "Name", 1);
  logFailTestcase(temp, "Incorrect document name!");

  temp = await accountTabDocumentList.validateValueDocumentList(Description, "Description", 1);
  logFailTestcase(temp, "Incorrect Description!");

  temp = await accountTabDocumentList.validateValueDocumentList(DocumentTags, "Document tags", 1);
  logFailTestcase(temp, "Incorrect Document tags!");

  temp = await accountTabDocumentList.validateValueDocumentList(CreatedBy, "Created by", 1);
  logFailTestcase(temp, "Incorrect created by!");

  temp = await accountTabDocumentList.validateValueDocumentList(CreatedDate, "Created date", 1);
  logFailTestcase(temp, "Incorrect created date!");
});