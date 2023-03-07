import { Before, Given, Then, When } from "@cucumber/cucumber";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { ClaimSettingInsurance } from "../../../../page-objects/back-office-portal/insurance/claim/claim-setting/ClaimSettingInsurance";
import { ClaimSettingTabDocumentChecklistsInsurance } from "../../../../page-objects/back-office-portal/insurance/claim/claim-setting/ClaimSettingTabDocumentChecklistsInsurance";
import { ClaimSettingTabRecipientManagementInsurance } from "../../../../page-objects/back-office-portal/insurance/claim/claim-setting/ClaimSettingTabRecipientManagementInsurance";
import { convertPathFileDataToDataRegression, logFailTestcase, logWarningMessage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { getDataTestCaseObjectByNameField } from "../../../../storage-data/functions/data-test-case";
import { getValueDataOfDataTestExecution, pushObjectToDataArrayWithUniqueKey } from "../../../../storage-data/functions/data-test-execution";

const loader = require("csv-load-sync");

let claimSettingInsurance: ClaimSettingInsurance;
let claimSettingTabDocumentChecklistsInsurance: ClaimSettingTabDocumentChecklistsInsurance;
let claimSettingTabRecipientManagementInsurance: ClaimSettingTabRecipientManagementInsurance;
let globalPageObject: GlobalPageObject;

Before(async function () {
  const context: ICommonContext = this.context;
  claimSettingInsurance = new ClaimSettingInsurance(context.driverService);
  claimSettingTabDocumentChecklistsInsurance = new ClaimSettingTabDocumentChecklistsInsurance(context.driverService);
  claimSettingTabRecipientManagementInsurance = new ClaimSettingTabRecipientManagementInsurance(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
});

Given("User navigates to Claim setting", async function () {
  let temp = await globalPageObject.navigateToMainModuleConfiguration();
  logFailTestcase(temp, "Navigate to Module configuration failed!");

  temp = await globalPageObject.selectDomainCardAtGlobalSetting("SEAMLESS CLAIMS");
  logFailTestcase(temp, `Select "SEAMLESS CLAIMS" failed!`);

  temp = await await globalPageObject.pressSettingAtDomainDetailItemInDomainCard("Claims");
  logFailTestcase(temp, `Press "Setting" at Claims domain detail failed!`);
});

When("User navigates to {string} tab at Claim Setting", async (nameOfTab) => {
  let temp = await claimSettingInsurance.openTabOnClaimSetting(nameOfTab);
  logFailTestcase(temp, `Open tab "${nameOfTab}" at Claim setting failed!`);
});

//#region Steps at Document Checklist
When("System shows Filter Product dropdown on Document Checklist at Claim Setting", async () => {
  let temp = await claimSettingTabDocumentChecklistsInsurance.checkFilterProductDropdownExist();
  logFailTestcase(temp, `Dropdown "Filter Product" is NOT found on Document Checklist`);
});

Given("User opens Add new document type form", async () => {
  let temp = await claimSettingTabDocumentChecklistsInsurance.openAddNewDocumentTypeForm()
  logFailTestcase(temp, "Open Add new document type form failed!");
});

When("User inputs valid data into Add new document type form {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const DocumentTypeId = rows[0].DocumentTypeId;
  const Product = rows[0].Product;
  const DocumentTypeName = rows[0].DocumentTypeName;

  let temp = await claimSettingTabDocumentChecklistsInsurance.inputDocumentTypeIdDocumentTypeForm(DocumentTypeId);
  logFailTestcase(temp, `Input Document Type id "${DocumentTypeId}" failed!`);

  temp = await claimSettingTabDocumentChecklistsInsurance.inputProductDocumentTypeForm(Product);
  logFailTestcase(temp, `Input Product "${Product}" failed!`);

  temp = await claimSettingTabDocumentChecklistsInsurance.inputDocumentTypeNameDocumentTypeForm(DocumentTypeName);
  logFailTestcase(temp, `Input Document Type Name "${DocumentTypeName}" failed!`);

  temp = await globalPageObject.pressSaveForm();
  logFailTestcase(temp, "Press save Add new document form failed!");

  temp = await globalPageObject.expandNumberOfItemMainList(30);
  logFailTestcase(temp, `Expand Item/Page on list failed!`);
});

When("User inputs valid data into Update document type form {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const DocumentTypeId = rows[0].DocumentTypeId;
  const Product = rows[0].Product;
  const DocumentTypeName = rows[0].DocumentTypeName;

  let temp = await claimSettingTabDocumentChecklistsInsurance.inputDocumentTypeIdDocumentTypeForm(DocumentTypeId);
  logFailTestcase(temp, `Input Document Type id "${DocumentTypeId}" failed!`);

  temp = await claimSettingTabDocumentChecklistsInsurance.inputProductDocumentTypeForm(Product);
  logFailTestcase(temp, `Input Product "${Product}" failed!`);

  temp = await claimSettingTabDocumentChecklistsInsurance.inputDocumentTypeNameDocumentTypeForm(DocumentTypeName);
  logFailTestcase(temp, `Input Document Type Name "${DocumentTypeName}" failed!`);

  temp = await globalPageObject.pressSaveForm();
  logFailTestcase(temp, "Press save Update document form failed!");
});

When("User inputs invalid data into Add new document type form and checks validation {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const len = rows.length;
  for (let i = 0; i < len; i++) {
    logWarningMessage(`Checking line "${i + 1}" file csv...`);

    const DocumentTypeId = rows[i].DocumentTypeId;
    const Product = rows[i].Product;
    const DocumentTypeName = rows[i].DocumentTypeName;
    let temp = true;
    if (DocumentTypeId) {
      temp = await claimSettingTabDocumentChecklistsInsurance.inputDocumentTypeIdDocumentTypeForm(DocumentTypeId);
      logFailTestcase(temp, `Input Document Type id "${DocumentTypeId}" failed!`);
    }

    if (Product) {
      temp = await claimSettingTabDocumentChecklistsInsurance.inputProductDocumentTypeForm(Product);
      logFailTestcase(temp, `Input Product "${Product}" failed!`);
    }

    if (DocumentTypeName) {
      temp = await claimSettingTabDocumentChecklistsInsurance.inputDocumentTypeNameDocumentTypeForm(DocumentTypeName);
      logFailTestcase(temp, `Input Document Type Name "${DocumentTypeName}" failed!`);
    }

    temp = await globalPageObject.pressSaveForm();
    logFailTestcase(temp, "Press save Update document form failed!");

    temp = await globalPageObject.checkProgressBarLoading();
    logFailTestcase(!temp, `System calls some servive after press "Save" button!`);

    temp = await claimSettingTabDocumentChecklistsInsurance.checkValidationOnDocumentTypeFormExist();
    logFailTestcase(temp, 'There is no validation message on Document type form!');

    await globalPageObject.closeOpeningForm();
    logWarningMessage(`\tLine "${i + 1}" passed!`);

    temp = await claimSettingTabDocumentChecklistsInsurance.openAddNewDocumentTypeForm();
    logFailTestcase(temp, "Open Doucment Type form failed!")
  }
});

Then("System shows document type on Document checklist {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const DocumentTypeId = rows[0].DocumentTypeId;
  const Product = rows[0].Product;
  const DocumentTypeName = rows[0].DocumentTypeName;
  logWarningMessage(`Check document type at row 1...`)
  let temp = await claimSettingTabDocumentChecklistsInsurance.validateValueDocumentTypeList(DocumentTypeId, "Document Type Id", 1);
  logFailTestcase(temp);

  temp = await claimSettingTabDocumentChecklistsInsurance.validateValueDocumentTypeList(DocumentTypeName, "Document Type Name", 1);
  logFailTestcase(temp);

  temp = await claimSettingTabDocumentChecklistsInsurance.validateValueDocumentTypeList(Product, "Product", 1);
  logFailTestcase(temp);
});

Given("User opens Update document type form {string}", async function (filename) {
  const SelectedDocumentTypeId = loader(convertPathFileDataToDataRegression(filename))[0].SelectedDocumentTypeId;
  let temp = await claimSettingTabDocumentChecklistsInsurance.openUpdateDocumentTypeFormByDocumentTypeId(SelectedDocumentTypeId);
  logFailTestcase(temp, `Open Document type with id "${SelectedDocumentTypeId}" failed!`);
});


Given("User deletes a document type on Document Checklist {string}", async function (filename) {
  const SelectedDocumentTypeId = loader(convertPathFileDataToDataRegression(filename))[0].SelectedDocumentTypeId;
  let temp = await claimSettingTabDocumentChecklistsInsurance.deleteDocumentTypeByDocumentTypeId(SelectedDocumentTypeId);
  logFailTestcase(temp, `Delete Document type with id "${SelectedDocumentTypeId}" failed!`);

  temp = await globalPageObject.pressYesForm();
  logFailTestcase(temp, "Press Yes comfirmation failed!");
});

Then("User can't find document type on Document checklist {string}", async function (filename) {
  const SelectedDocumentTypeId = loader(convertPathFileDataToDataRegression(filename))[0].SelectedDocumentTypeId;
  let temp = await claimSettingTabDocumentChecklistsInsurance.checkDocumentTypeIdOnDocumentChecklistExist(SelectedDocumentTypeId);
  logFailTestcase(!temp, `Delete Document type with id "${SelectedDocumentTypeId}" failed!\n\t\t Because it's still on Document checklist!`);
});

//#region RECIPIENT MANAGEMENT steps
Then("System shows new recipient on recipient list {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  const CustomerType = row.CustomerType;
  let Organization = row.Organization;
  const FirstName = row.FirstName;
  const LastName = row.LastName;
  const CompanyName = row.CompanyName;
  const Address = row.Address;
  const Postcode = row.Postcode;
  const City = row.City;
  const Country = row.Country;
  const PhoneNumber = row.PhoneNumber;
  const EmailAddress = row.EmailAddress;
  const FullAddress = row.FullAddress;
  let Name = FirstName ? FirstName + " " + LastName : CompanyName;
  let temp = true;

  if (!Organization) {
    Organization = getValueDataOfDataTestExecution("Organization_recipient");
  }


  if (Name) {
    temp = await claimSettingTabRecipientManagementInsurance.validateNameValueOnRecipientListByRow(Name);
    logFailTestcase(temp, 'Incorrect Name on Recipient List!');
  }
  if (Organization) {
    temp = await claimSettingTabRecipientManagementInsurance.validateNIN_OrganizationValueOnRecipientListByRow(Organization);
    logFailTestcase(temp, 'Incorrect Organization/NIN on Recipient List!');
  }
  if (FullAddress) {
    temp = await claimSettingTabRecipientManagementInsurance.validateAddressValueOnRecipientListByRow(FullAddress);
    logFailTestcase(temp, 'Incorrect Address on Recipient List!');
  }
  if (PhoneNumber) {
    temp = await claimSettingTabRecipientManagementInsurance.validatePhoneValueOnRecipientListByRow(PhoneNumber);
    logFailTestcase(temp, 'Incorrect PhoneNumber on Recipient List!');
  }
  if (EmailAddress) {
    temp = await claimSettingTabRecipientManagementInsurance.validateEmailValueOnRecipientListByRow(EmailAddress);
    logFailTestcase(temp, 'Incorrect EmailAddress on Recipient List!');
  }
  if (CustomerType) {
    temp = await claimSettingTabRecipientManagementInsurance.validateCustomerTypeValueOnRecipientListByRow(CustomerType);
    logFailTestcase(temp, 'Incorrect CustomerType on Recipient List!');
  }



});
//#endregion

//#endregion