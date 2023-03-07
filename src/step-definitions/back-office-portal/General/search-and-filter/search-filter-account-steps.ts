import { Before, Then, When } from "@cucumber/cucumber";
import { fail } from "assert";
import { DataRepo } from "../../../../core/modals/DataRepo";
import { AccountList } from "../../../../page-objects/back-office-portal/general/account/account-list/AccountList";
import { AccountSearchFilter } from "../../../../page-objects/back-office-portal/general/account/account-search-filter/AccountSearchFilter";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { GlobalSearchAndFilter } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalSearchAndFilter";
import { convertPathFileDataToDataRegression, logFailTestcase, logWarningMessage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { scenarioName, subErrorMessages } from "../../../../shared/variables";
import { getDataTestCaseObjectByNameField } from "../../../../storage-data/functions/data-test-case";
import { getValueDataOfDataTestExecution } from "../../../../storage-data/functions/data-test-execution";

let accountSearchFilter: AccountSearchFilter;
let globalSearchAndFilter: GlobalSearchAndFilter;
let accountList: AccountList;
let globalPageObject: GlobalPageObject;
const loader = require("csv-load-sync");

Before(async function () {
  const context: ICommonContext = this.context;
  accountSearchFilter = new AccountSearchFilter(context.driverService);
  globalSearchAndFilter = new GlobalSearchAndFilter(context.driverService);
  accountList = new AccountList(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
});

//Search and Filter
When("User searches account from csv file {string}", async (filename) => {
  const rows = await DataRepo.getInstance().loadData(filename)
  for (let i = 0; i < rows.length; i++) {
    logWarningMessage(`Checking Search & Filter at line ${i + 1} in csv...`);
    let temp;

    const Name = rows[i].Name;
    const OrgNo = rows[i].OrgNo;
    const Email = rows[i].Email;
    const Phone = rows[i].Phone;
    const KAM = rows[i].KAM;
    const Status = rows[i].Status;
    const Type = rows[i].Type;
    const Address = rows[i].Address;
    const Postcode = rows[i].Postcode;
    const City = rows[i].City;
    const Country = rows[i].Country;
    const QuoteReference = rows[i].QuoteReference;
    const PolicyReference = rows[i].PolicyReference;
    const PolicyStartDateFrom = rows[i].PolicyStartDateFrom;
    const PolicyStartDateTo = rows[i].PolicyStartDateTo;
    const PolicyEndDateFrom = rows[i].PolicyEndDateFrom;
    const PolicyEndDateTo = rows[i].PolicyEndDateTo;
    const Product = rows[i].Product;

    if (Name) {
      temp = await accountSearchFilter.inputNameOnSearchAndFilterForm(Name);
      logFailTestcase(temp, "Input Name on Search filter form failed!");
    }
    if (OrgNo) {
      temp = await accountSearchFilter.inputOrgNo_NinOnSearchAndFilterForm(OrgNo);
      logFailTestcase(temp, "Input OrgNo on Search filter form failed!");
    }
    if (Email) {
      temp = await accountSearchFilter.inputEmailOnSearchAndFilterForm(Email);
      logFailTestcase(temp, "Input Email on Search filter form failed!");
    }
    if (Phone) {
      temp = await accountSearchFilter.inputPhoneOnSearchAndFilterForm(Phone);
      logFailTestcase(temp, "Input Phone on Search filter form failed!");
    }
    if (KAM) {
      temp = await accountSearchFilter.inputKamOnSearchAndFilterForm(KAM);
      logFailTestcase(temp, "Input KAM on Search filter form failed!");
    }
    if (Status) {
      temp = await accountSearchFilter.inputStatusOnSearchAndFilterForm(Status);
      logFailTestcase(temp, "Input Status on Search filter form failed!");
    }
    if (Type) {
      temp = await accountSearchFilter.inputTypeOnSearchAndFilterForm(Type);
      logFailTestcase(temp, "Input Type on Search filter form failed!");
    }
    if (Address) {
      temp = await accountSearchFilter.inputAddressOnSearchAndFilterForm(Address);
      logFailTestcase(temp, "Input Address on Search filter form failed!");
    }
    if (Postcode) {
      temp = await accountSearchFilter.inputPostcodeOnSearchAndFilterForm(Postcode);
      logFailTestcase(temp, "Input Postcode on Search filter form failed!");
    }
    if (City) {
      temp = await accountSearchFilter.inputCityOnSearchAndFilterForm(City);
      logFailTestcase(temp, "Input City on Search filter form failed!");
    }
    if (Country) {
      temp = await accountSearchFilter.inputCountryOnSearchAndFilterForm(Country);
      logFailTestcase(temp, "Input Country on Search filter form failed!");
    }
    if (QuoteReference) {
      temp = await accountSearchFilter.inputQuoteReferenceOnSearchAndFilterForm(QuoteReference);
      logFailTestcase(temp, "Input QuoteReference on Search filter form failed!");
    }
    if (PolicyReference) {
      temp = await accountSearchFilter.inputPolicyReferenceOnSearchAndFilterForm(PolicyReference);
      logFailTestcase(temp, "Input PolicyReference on Search filter form failed!");
    }
    if (PolicyStartDateFrom) {
      temp = await accountSearchFilter.inputPolicyStartDateFromOnSearchAndFilterForm(PolicyStartDateFrom);
      logFailTestcase(temp, "Input PolicyStartDateFrom on Search filter form failed!");
    }
    if (PolicyStartDateTo) {
      temp = await accountSearchFilter.inputPolicyStartDateToOnSearchAndFilterForm(PolicyStartDateTo);
      logFailTestcase(temp, "Input PolicyStartDateTo on Search filter form failed!");
    }
    if (PolicyEndDateFrom) {
      temp = await accountSearchFilter.inputPolicyEndDateFromOnSearchAndFilterForm(PolicyEndDateFrom);
      logFailTestcase(temp, "Input PolicyEndDateFrom on Search filter form failed!");
    }
    if (PolicyEndDateTo) {
      temp = await accountSearchFilter.inputPolicyEndDateToOnSearchAndFilterForm(PolicyEndDateTo);
      logFailTestcase(temp, "Input PolicyEndDateTo on Search filter form failed!");
    }
    if (Product) {
      temp = await accountSearchFilter.inputProductOnSearchAndFilterForm(Product);
      logFailTestcase(temp, "Input Product on Search filter form failed!");
    }


    temp = await globalSearchAndFilter.pressSearchAtSearchAndFilter();
    logFailTestcase(temp, "Press Search at Search & Filter failed!");

    const AccountNumber = parseInt(rows[i].AccountNumber);
  }
});

/**
 * This steps use for Search and Filter account
 * It allows multiple rows in file data csv
 * It inputs data to form then verifies result in the same step
 */
When("User searches account with valid data from csv file {string}", async (filename) => {
  const rows = await DataRepo.getInstance().loadData(filename);
  for (let i = 0; i < rows.length; i++) {
    logWarningMessage(`Checking Search & Filter at line ${i + 1} in csv...`);
    let temp = await globalSearchAndFilter.pressClearAtSearchAndFilter();
    logFailTestcase(temp, "Press Clear at Search and Filter failed!");

    const Name = rows[i].Name;
    const OrgNo = rows[i].OrgNo || rows[i].NIN;
    const Email = rows[i].Email;
    const Phone = rows[i].Phone;
    const KAM = rows[i].KAM;
    const Status = rows[i].Status;
    const Type = rows[i].Type;
    const Address = rows[i].Address;
    const Postcode = rows[i].Postcode;
    const City = rows[i].City;
    const Country = rows[i].Country;
    const QuoteReference = rows[i].QuoteReference;
    const PolicyReference = rows[i].PolicyReference;
    const PolicyStartDateFrom = rows[i].PolicyStartDateFrom;
    const PolicyStartDateTo = rows[i].PolicyStartDateTo;
    const PolicyEndDateFrom = rows[i].PolicyEndDateFrom;
    const PolicyEndDateTo = rows[i].PolicyEndDateTo;
    const Product = rows[i].Product;

    if (Name) {
      temp = await accountSearchFilter.inputNameOnSearchAndFilterForm(Name);
      logFailTestcase(temp, "Input Name on Search filter form failed!");
    }
    if (OrgNo) {
      temp = await accountSearchFilter.inputOrgNo_NinOnSearchAndFilterForm(OrgNo);
      logFailTestcase(temp, "Input OrgNo on Search filter form failed!");
    }
    if (Email) {
      temp = await accountSearchFilter.inputEmailOnSearchAndFilterForm(Email);
      logFailTestcase(temp, "Input Email on Search filter form failed!");
    }
    if (Phone) {
      temp = await accountSearchFilter.inputPhoneOnSearchAndFilterForm(Phone);
      logFailTestcase(temp, "Input Phone on Search filter form failed!");
    }
    if (KAM) {
      temp = await accountSearchFilter.inputKamOnSearchAndFilterForm(KAM);
      logFailTestcase(temp, "Input KAM on Search filter form failed!");
    }
    if (Status) {
      temp = await accountSearchFilter.inputStatusOnSearchAndFilterForm(Status);
      logFailTestcase(temp, "Input Status on Search filter form failed!");
    }
    if (Type) {
      temp = await accountSearchFilter.inputTypeOnSearchAndFilterForm(Type);
      logFailTestcase(temp, "Input Type on Search filter form failed!");
    }
    if (Address) {
      temp = await accountSearchFilter.inputAddressOnSearchAndFilterForm(Address);
      logFailTestcase(temp, "Input Address on Search filter form failed!");
    }
    if (Postcode) {
      temp = await accountSearchFilter.inputPostcodeOnSearchAndFilterForm(Postcode);
      logFailTestcase(temp, "Input Postcode on Search filter form failed!");
    }
    if (City) {
      temp = await accountSearchFilter.inputCityOnSearchAndFilterForm(City);
      logFailTestcase(temp, "Input City on Search filter form failed!");
    }
    if (Country) {
      temp = await accountSearchFilter.inputCountryOnSearchAndFilterForm(Country);
      logFailTestcase(temp, "Input Country on Search filter form failed!");
    }
    if (QuoteReference) {
      temp = await accountSearchFilter.inputQuoteReferenceOnSearchAndFilterForm(QuoteReference);
      logFailTestcase(temp, "Input QuoteReference on Search filter form failed!");
    }
    if (PolicyReference) {
      temp = await accountSearchFilter.inputPolicyReferenceOnSearchAndFilterForm(PolicyReference);
      logFailTestcase(temp, "Input PolicyReference on Search filter form failed!");
    }
    if (PolicyStartDateFrom) {
      temp = await accountSearchFilter.inputPolicyStartDateFromOnSearchAndFilterForm(PolicyStartDateFrom);
      logFailTestcase(temp, "Input PolicyStartDateFrom on Search filter form failed!");
    }
    if (PolicyStartDateTo) {
      temp = await accountSearchFilter.inputPolicyStartDateToOnSearchAndFilterForm(PolicyStartDateTo);
      logFailTestcase(temp, "Input PolicyStartDateTo on Search filter form failed!");
    }
    if (PolicyEndDateFrom) {
      temp = await accountSearchFilter.inputPolicyEndDateFromOnSearchAndFilterForm(PolicyEndDateFrom);
      logFailTestcase(temp, "Input PolicyEndDateFrom on Search filter form failed!");
    }
    if (PolicyEndDateTo) {
      temp = await accountSearchFilter.inputPolicyEndDateToOnSearchAndFilterForm(PolicyEndDateTo);
      logFailTestcase(temp, "Input PolicyEndDateTo on Search filter form failed!");
    }
    if (Product) {
      temp = await accountSearchFilter.inputProductOnSearchAndFilterForm(Product);
      logFailTestcase(temp, "Input Product on Search filter form failed!");
    }


    temp = await globalSearchAndFilter.pressSearchAtSearchAndFilter();
    logFailTestcase(temp, "Press Search at Search & Filter failed!");

    const AccountNumber = parseInt(rows[i].AccountNumber);
    const actualTotalNumber = await globalPageObject.getNumberOfTotalRecordsMainTab();

    if ((AccountNumber > 1 && AccountNumber === actualTotalNumber) || AccountNumber < 0) {
      // logSuccessMessage(`Line ${i + 1} in csv: Search & Filter passed!`);
      // do notthing
    }
    else if (AccountNumber === 1) {
      //Validate name, orgNo, email, phone, status at Account list
      if (Name) logFailTestcase(await accountList.validateSearchAndFilterName(Name), `Account name "${Name}" does not match to result!`);
      if (OrgNo) logFailTestcase(await accountList.validateSearchAndFilterOrgNo(OrgNo), `Account OrgNo "${OrgNo}" does not match to result!`);
      if (Email) logFailTestcase(await accountList.validateSearchAndFilterEmail(Email), `Account Email "${Email}" does not match to result!`);
      if (Phone) logFailTestcase(await accountList.validateSearchAndFilterPhone(Phone), `Account Phone "${Phone}" does not match to result!`);
      // if(Address) logFailTestcase(await accountPage.validateSearchAndFilterAddress(Address), `Account Address "${Address}" does not match to result!`);
      if (KAM) logFailTestcase(await accountList.validateSearchAndFilterKAM(KAM), `Account KAM "${KAM}" does not match to result!`);
      if (Status) logFailTestcase(await accountList.validateSearchAndFilterStatus(Status), `Account Status "${Status}" does not match to result!`);

      //validate type, address, post code, city, country at account form
      if (Type || Address || Postcode || City || Country) {
        temp = await accountList.assertSearchAndFilterAccount(
          "",
          "",
          "",
          "",
          "",
          "",
          Type,
          Address,
          Postcode,
          City,
          Country
        );
        logFailTestcase(temp, `Line ${i + 1}: check Type, address, postcode, city, country are failed!`);
      }

      //validate Quote/ Policy at account detail
      if (QuoteReference) {
        temp = await accountList.openDetailOfFirstAccount();
        logFailTestcase(temp, "Open first account failed!");

        temp = await globalPageObject.navigateToSubQuotes();
        logFailTestcase(temp, "Navigate to quote tab failed!");
        await globalPageObject.waitForProgressBarLoaded_v2();

        temp = await globalPageObject.expandNumberOfItemSubList();
        logFailTestcase(temp, "Expand Item/Page at Quote list failed!");

        // Uncomment nó khi đã move Quote qua đây
        // temp = await accountList.checkQuoteReferenceExistInQuoteList(QuoteReference);
        // logFailTestcase(temp, `Can't find any quote ref "${QuoteReference}" in Quote list!`);

        await globalPageObject.closeAllOpeningEntities();
      }

      if (PolicyReference || PolicyStartDateFrom || PolicyStartDateTo || PolicyEndDateFrom || PolicyEndDateTo) {
        temp = await accountList.openDetailOfFirstAccount();
        logFailTestcase(temp, "Can Not find any account or Open first account failed!");

        temp = await globalPageObject.navigateToSubPolicies();
        logFailTestcase(temp, "Navigates to policy tab failed!");
        await globalPageObject.waitForProgressBarLoaded_v2();

        temp = await globalPageObject.expandNumberOfItemSubList();
        logFailTestcase(temp, "Expand Item/Page at Policy list failed!");

        // Uncomment nó khi đã move Quote qua đây
        // temp = await policyPage.checkPolicyExistInPolicyList(PolicyReference, Product, PolicyStartDateFrom, PolicyStartDateTo, PolicyEndDateFrom, PolicyEndDateTo);
        // logFailTestcase(temp, `Can't find any policy in Policy list!`);

        await globalPageObject.closeAllOpeningEntities();
      }

      if (Product && !(PolicyReference || PolicyStartDateFrom || PolicyStartDateTo || PolicyEndDateFrom || PolicyEndDateTo)) {
        temp = await accountList.openDetailOfFirstAccount();
        logFailTestcase(temp, "Open first account failed!");


        //Check product in Quote tab
        temp = await globalPageObject.navigateToSubQuotes();
        logFailTestcase(temp, "Navigate to quote tab failed!");
        await globalPageObject.waitForProgressBarLoaded_v2();

        temp = await globalPageObject.expandNumberOfItemSubList();
        logFailTestcase(temp, "Expand Item/Page at Quote list failed!");

        // Uncomment nó khi đã move Quote qua đây
        // const temp1 = await quotePage.checkQuoteProductExistInQuoteList(Product);
        // logFailTestcase(temp1, `Can't find any quote with Product "${Product}" in Quote list!`);


        //Check product in Policy tab
        temp = await globalPageObject.navigateToSubPolicies();
        logFailTestcase(temp, "Navigates to policy tab failed!");
        await globalPageObject.waitForProgressBarLoaded_v2();

        temp = await globalPageObject.expandNumberOfItemSubList();
        logFailTestcase(temp, "Expand Item/Page at Policy list failed!");

        // Uncomment nó khi đã move Policy qua đây
        // const temp2 = await policyPage.checkPolicyProductExistInPolicyList(Product);
        // logFailTestcase(temp || temp2, `Can't find any quote or policy with product name "${Product}"`);

        await globalPageObject.closeAllOpeningEntities();
      }

    }
    else if (AccountNumber === 0 && AccountNumber === actualTotalNumber){
      // do Nothing
    }
    else {
      logWarningMessage(`There are ${actualTotalNumber} total records found! But expecting "${AccountNumber}"`);
      logFailTestcase(false, `Line ${i + 1} in csv: failed...`);
    }
    logWarningMessage(`\tLine ${i + 1} passed!`);
  }
});

Then("System shows a list of accounts at account list", async () => {
  //We have implemented at previous step for multiple searching account.
  console.info(scenarioName + ": Test case is passed!");
});

//SAAS-5204
When('User searches account with invalid data from csv file {string}', async (filename) => {
  let rows = loader(convertPathFileDataToDataRegression(filename));
  let len = rows.length;
  for (let i = 0; i < len; i++) {
    const OrgNo_NIN = rows[i].OrgNo_NIN || getValueDataOfDataTestExecution("OrgNo_NIN");
    const Email = rows[i].Email;
    const Phone = rows[i].Phone;
    const PolicyStartDateFrom = rows[i].PolicyStartDateFrom;
    const PolicyStartDateTo = rows[i].PolicyStartDateTo;
    const PolicyEndDateFrom = rows[i].PolicyEndDateFrom;
    const PolicyEndDateTo = rows[i].PolicyEndDateTo;
    console.info(`Searching at line ${i + 1} of csv file: `);

    //temp = false if we didn't get validation error message
    let temp = await accountSearchFilter.inputInvalidDataToSearchAndFilterForm(
      OrgNo_NIN,
      Email,
      Phone,
      PolicyStartDateFrom,
      PolicyStartDateTo,
      PolicyEndDateFrom,
      PolicyEndDateTo
    );

    if (!temp) {
      fail(`Line ${i + 1} in file csv:\n` + scenarioName + ": Test case is failed!" + subErrorMessages);
    }
    else {
      temp = await globalSearchAndFilter.pressClearAtSearchAndFilter();
      logFailTestcase(temp, `Line ${i + 1} in file csv: Press "Clear" at Search and Filter failed!`);
      console.info(`Line ${i + 1} in file csv is passed!\n`);
    }
  }
});

Then("System shows validation error messages on Search and Filter form", async () => {
  //We have implemented at previous step for multiple searching account.
  console.info(scenarioName + ": Test case is passed!");
});

Then("System shows new filter and filtered account list", async () => {
  //We have implemented at previous step for multiple searching account.
  console.info(scenarioName + ": Test case is passed!");
});

When("User searches an account with data from dataTestcase", async () => {
  let temp = await globalSearchAndFilter.pressClearAtSearchAndFilter();
  logFailTestcase(temp, "Press Clear at Search and Filter failed!");

  const Name = getDataTestCaseObjectByNameField("NameAccount")?.message[0];
  const OrgNo = getDataTestCaseObjectByNameField("OrgNoAccount")?.message[0];

  if (Name) {
    temp = await accountSearchFilter.inputNameOnSearchAndFilterForm(Name);
    logFailTestcase(temp, "Input Name on Search filter form failed!");
  }
  if (OrgNo) {
    temp = await accountSearchFilter.inputOrgNo_NinOnSearchAndFilterForm(OrgNo);
    logFailTestcase(temp, "Input OrgNo on Search filter form failed!");
  }

  temp = await globalSearchAndFilter.pressSearchAtSearchAndFilter();
  logFailTestcase(temp, "Press Search at Search & Filter failed!");
});