import { Before, Then, When } from "@cucumber/cucumber";
import { fail } from "assert";
import { ContactList } from "../../../../page-objects/back-office-portal/general/contact/contact-list/ContactList";
import { ContactSearchFilter } from "../../../../page-objects/back-office-portal/general/contact/contact-search-filter/ContactSearchFilter";
import { GlobalFilterDropdown } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalFilterDropdown";
import { GlobalFilterName } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalFilterName";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { GlobalPeripherals } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPeripherals";
import { GlobalSearchAndFilter } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalSearchAndFilter";
import { Login } from "../../../../page-objects/back-office-portal/general/login-logout/Login";
import { convertPathFileDataToDataRegression, logFailTestcase, logWarningMessage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { scenarioName, subErrorMessages } from "../../../../shared/variables";

let globalSearchAndFilter: GlobalSearchAndFilter;
let globalPageObject: GlobalPageObject;
let globalPeripherals: GlobalPeripherals;
let contactSearchFilter: ContactSearchFilter;
let globalFilterName: GlobalFilterName;
let globalFilterDropdown: GlobalFilterDropdown;
let contactList: ContactList;
let login: Login;

const loader = require("csv-load-sync");
Before(async function () {
    const context: ICommonContext = this.context;
    contactSearchFilter = new ContactSearchFilter(context.driverService);
    globalSearchAndFilter = new GlobalSearchAndFilter(context.driverService);
    globalPageObject = new GlobalPageObject(context.driverService);
    globalPeripherals = new GlobalPeripherals(context.driverService);
    globalFilterName = new GlobalFilterName(context.driverService);
    globalFilterDropdown = new GlobalFilterDropdown(context.driverService);
    contactList = new ContactList(context.driverService);
    login = new Login(context.driverService);
});

//Search and Filter
When("User inputs valid data on Search and Filter contact form {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));

    for (let i = 0; i < rows.length; i++) {
        logWarningMessage(`Checking Search & Filter at line ${i + 1} in csv...`);
        let temp = await globalSearchAndFilter.pressClearAtSearchAndFilter();
        logFailTestcase(temp, "Press Clear at Search and Filter failed!");
        const Name = rows[i].Name;
        const Email = rows[i].Email;
        const Phone = rows[i].Phone;
        const Account = rows[i].Account;

        if (Name) {
            temp = await contactSearchFilter.inputNameOnSearchAndFilterForm(Name);
            logFailTestcase(temp, "Input Name on Search filter form failed!");
        }
        if (Email) {
            temp = await contactSearchFilter.inputEmailOnSearchAndFilterForm(Email);
            logFailTestcase(temp, "Input Email on Search filter form failed!");
        }
        if (Phone) {
            temp = await contactSearchFilter.inputPhoneOnSearchAndFilterForm(Phone);
            logFailTestcase(temp, "Input Phone on Search filter form failed!");
        }
        if (Account) {
            temp = await contactSearchFilter.inputAccountOnSearchAndFilterForm(Account);
            logFailTestcase(temp, "Input Account on Search filter failed!");
        }
        temp = await globalPeripherals.pressEnterCurrentElement();
        logFailTestcase(temp, "Press Search at Search & Filter failed!");

        const ContactNumber = parseInt(rows[i].ContactNumber);
        const actualTotalNumber = await globalPageObject.getNumberOfTotalRecordsMainTab();

        async function validateSearchFilterResult(positionRow: number = 1) {
            if (Name) logFailTestcase(await contactList.validateValueContactList(Name, "Name", positionRow, true), `Contact name "${Name}" does not match to result!`);
            if (Email) logFailTestcase(await contactList.validateValueContactList(Email, "Email", positionRow, true), `Contact Email "${Email}" does not match to result!`);
            if (Phone) logFailTestcase(await contactList.validateValueContactList(Phone, "Phone", positionRow, true), `Contact Phone "${Phone}" does not match to result!`);
            if (Account) logFailTestcase(await contactList.validateValueContactList(Account, "Account", positionRow, true), `Contact Related Account "${Phone}" does not match to result!`);
        }

        if (ContactNumber > 1 && ContactNumber === actualTotalNumber) {
            //validate row#1 on filtered results
            validateSearchFilterResult();
            if (actualTotalNumber >= 10) {
                validateSearchFilterResult(10);
            } else if (actualTotalNumber < 10) {
                validateSearchFilterResult(actualTotalNumber);
            }
        }
        else if (ContactNumber === 1 && ContactNumber === actualTotalNumber) {
            //Validate row#1 if there's only 1 rec
            validateSearchFilterResult();
        }
        else {
            logWarningMessage(`There are ${actualTotalNumber} total records found!`);
            logFailTestcase(false, `Line ${i + 1} in csv: failed...`);
        }
        logWarningMessage(`\tLine ${i + 1} passed!`);
    }
});
When('User inputs invalid data on search and filter form from csv file {string}', async (filename) => {
    let rows = loader(convertPathFileDataToDataRegression(filename));
    let len = rows.length;
    for (let i = 0; i < len; i++) {
        logWarningMessage(`Checking Search & Filter at line ${i + 1} in csv...`);
        let temp = await globalSearchAndFilter.pressClearAtSearchAndFilter();
        logFailTestcase(temp, "Press Clear at Search and Filter failed!");
        const Email = rows[i].Email;
        const Phone = rows[i].Phone;
        console.info(`Searching at line ${i + 1} of csv file: `);
        //temp = false if we didn't get validation error message
        temp = await contactSearchFilter.inputInvalidDataToSearchAndFilterForm(
            Email,
            Phone
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



Then("System shows a list of accounts at contact list", async () => {
    //We have implemented at previous step for multiple searching account.
    console.info(scenarioName + ": Test case is passed!");
});



Then(`Search and Filter form is cleared`, async () => {
    let temp = await contactSearchFilter.validateClearedSearchAndFilterForm();
    logFailTestcase(temp, `Search and filter form is not cleared`);
});


