import { Before, When } from "@cucumber/cucumber";
import { AccountTabDocumentForm } from "../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-document/AccountTabDocumentForm";
import { AccountTabDocumentList } from "../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-document/AccountTabDocumentList";
import { AccountTabGenerateDocumentForm } from "../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-document/AccountTabGenerateDocumentForm";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { convertPathFileDataToDataRegression, logFailTestcase, logInfoMessage, logWarningMessage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";


const loader = require("csv-load-sync");
let accountTabGenerateDocumentForm: AccountTabGenerateDocumentForm;
let accountTabDocumentForm: AccountTabDocumentForm;
let globalPageObject: GlobalPageObject;

Before(async function () {
  const context: ICommonContext = this.context;
  accountTabGenerateDocumentForm = new AccountTabGenerateDocumentForm(context.driverService);
  accountTabDocumentForm = new AccountTabDocumentForm(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
});

When("User inputs valid data into Generate Documents form {string}", async (filename) =>{
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const row = rows[0];

  const DocumentTemplate = row.DocumentTemplate;
  const EntityType = row.EntityType;
  const SearchEntity = row.SearchEntity;

  let temp = true;
  if(DocumentTemplate){
    temp = await accountTabGenerateDocumentForm.inputDocumentTemplateOnGenerateDocumentForm(DocumentTemplate);
    logFailTestcase(temp, "Input document template failed!");
  }
  if(EntityType){
    temp = await accountTabGenerateDocumentForm.inputEntityTypeOnGenerateDocumentForm(EntityType);
    logFailTestcase(temp, "Input entity type failed!");
  }
  if(SearchEntity){
    temp = await accountTabGenerateDocumentForm.inputSearchEntityOnGenerateDocumentForm(SearchEntity);
    logFailTestcase(temp, "Input Search Entity failed!");
  }
});

