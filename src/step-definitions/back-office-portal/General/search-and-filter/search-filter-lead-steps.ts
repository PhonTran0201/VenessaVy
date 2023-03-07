import { Before, Then, When } from "@cucumber/cucumber";
import { GlobalFilterDropdown } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalFilterDropdown";
import { GlobalFilterName } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalFilterName";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { LeadForm } from "../../../../page-objects/back-office-portal/general/lead/lead-forms/LeadForm";
import { LeadList } from "../../../../page-objects/back-office-portal/general/lead/lead-list/LeadList";
import { LeadSearchFilter } from "../../../../page-objects/back-office-portal/general/lead/lead-search-filter/LeadSearchFilter";
import { convertPathFileDataToDataRegression, logFailTestcase, logWarningMessage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { scenarioName } from "../../../../shared/variables";

let leadList: LeadList;
let leadSearchFilter: LeadSearchFilter;
let leadForm: LeadForm;
let globalFilterDropdown: GlobalFilterDropdown;
let globalPageObject: GlobalPageObject;
let globalFilterName: GlobalFilterName;
const loader = require("csv-load-sync");

Before(async function () {
    const context: ICommonContext = this.context;
    leadList = new LeadList(context.driverService);
    leadSearchFilter = new LeadSearchFilter(context.driverService);
    leadForm = new LeadForm(context.driverService);
    globalPageObject = new GlobalPageObject(context.driverService);
    globalFilterName = new GlobalFilterName(context.driverService);
    globalFilterDropdown = new GlobalFilterDropdown(context.driverService);

});

/*
 function validate lead info after Search and Filter lead 
*/
async function validateLeadInfoAfterSearchAndFilter(
    FirstName: string,
    LastName: string,
    Mobile: string,
    Email: string,
    KAM: string,
    CompanyName: string,
    Address: string,
    Postcode: string,
    City: string,
    Country: string,
    positionRow: number = 1
) {
    try {
        let temp = true;
        if (FirstName) {
            temp = await leadList.validateValueLeadList(FirstName, "Name", positionRow, true);
            logFailTestcase(temp, `FirstName "${FirstName}" does not match to result`);
        }
        if (LastName) {
            temp = await leadList.validateValueLeadList(LastName, "Name", positionRow, true);
            logFailTestcase(temp, `LastName "${LastName}" does not match to result`);
        }
        if (Mobile) {
            temp = await leadList.validateValueLeadList(Mobile, "Mobile", positionRow, true);
            logFailTestcase(temp, `Mobile "${Mobile}" does not match to result`);
        }
        if (Email) {
            temp = await leadList.validateValueLeadList(Email, "Email", positionRow, true);
            logFailTestcase(temp, `Email "${Email}" does not match to result`);
        }
        if (CompanyName) {
            temp = await leadList.validateValueLeadList(CompanyName, "Company", positionRow, true);
            logFailTestcase(temp, `CompanyName "${CompanyName}" does not match to result`);
        }
        //if attributes not show on lead list, validate in lead form
        if (KAM || Address || Postcode || City || Country) {
            temp = await leadList.pressEditLeadFormByPositionRow(positionRow);
            logFailTestcase(temp, "Open lead form failed!");
            await globalPageObject.waitForProgressBarLoaded_v2(100);

            if (KAM) {
                temp = await leadForm.pressMoreInfo();
                logFailTestcase(temp, "Press More info failed!");
                temp = await leadForm.validateValueOnLeadForm(KAM, "KAM", true);
                logFailTestcase(temp, `KAM value "${KAM}" does not match to result!`);
                await globalPageObject.waitForProgressBarLoaded_v2();
                temp = await leadForm.pressBasicInfo();
                logFailTestcase(temp, "Press Basic info failed!");
                await globalPageObject.waitForProgressBarLoaded_v2();
            }
            if (Address) {
                temp = await leadForm.validateValueOnLeadForm(Address, "Address", true);
                logFailTestcase(temp, `Address value "${Address}" does not match to result!`);
            }
            if (Postcode) {
                temp = await leadForm.validateValueOnLeadForm(Postcode, "Postcode", true);
                logFailTestcase(temp, `Postcode value "${Postcode}" does not match to result!`);
            }
            if (City) {
                temp = await leadForm.validateValueOnLeadForm(City, "City", true);
                logFailTestcase(temp, `City value "${City}" does not match to result!`);
            }
            if (Country) {
                temp = await leadForm.validateValueOnLeadForm(Country, "Country", true);
                logFailTestcase(temp, `Country value "${Country}" does not match to result!`);
            }

            await globalPageObject.closeOpeningForm();

        }
        return true;
    } catch (error) {
        console.log("validateLeadInfoAfterSearchAndFilter");
        console.error(error);
        return false;
    }

}

//Search and Filter
When("User inputs to Search and Filter lead form with valid data from csv file {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    for (let i = 0; i < rows.length; i++) {
        logWarningMessage(`Checking Search & Filter at line ${i + 1} in csv...`);
        let temp = await globalPageObject.pressClearSearchAndFilter();
        await globalPageObject.waitForProgressBarLoaded_v2(100);

        logFailTestcase(temp, "Press Clear at Search and Filter failed!");


        // Search and Filter fields
        const FirstName = rows[i].FirstName;
        const LastName = rows[i].LastName;
        const Mobile = rows[i].Mobile;
        const Email = rows[i].Email;
        const Kam = rows[i].KAM;
        const CompanyName = rows[i].CompanyName;
        const Address = rows[i].Address;
        const Postcode = rows[i].Postcode;
        const City = rows[i].City;
        const Country = rows[i].Country;

        if (FirstName) {
            temp = await leadSearchFilter.inputFirstNameOnSearchAndFilterFormForLead(FirstName);
            logFailTestcase(temp, "Input FirstName failed !");
        }
        if (LastName) {
            temp = await leadSearchFilter.inputLastNameOnSearchAndFilterFormForLead(LastName);
            logFailTestcase(temp, "Input LastName failed !");
        }
        if (Mobile) {
            temp = await leadSearchFilter.inputMobileOnSearchAndFilterFormForLead(Mobile);
            logFailTestcase(temp, "Input Mobile failed !");
        }
        if (Email) {
            temp = await leadSearchFilter.inputEmailOnSearchAndFilterFormForLead(Email);
            logFailTestcase(temp, "Input Email failed !");
        }
        if (Kam) {
            temp = await leadSearchFilter.inputKAMOnSearchAndFilterFormForLead(Kam);
            logFailTestcase(temp, "Input KAM failed !");
        }
        if (CompanyName) {
            temp = await leadSearchFilter.inputCompanyNameOnSearchAndFilterFormForLead(CompanyName);
            logFailTestcase(temp, "Input CompanyName failed !");
        }
        if (Address) {
            temp = await leadSearchFilter.inputAddressOnSearchAndFilterFormForLead(Address);
            logFailTestcase(temp, "Input Address failed !");
        }
        if (Postcode) {
            temp = await leadSearchFilter.inputPostcodeOnSearchAndFilterFormForLead(Postcode);
            logFailTestcase(temp, "Input Postcode failed !");
        }
        if (City) {
            temp = await leadSearchFilter.inputCityOnSearchAndFilterFormForLead(City);
            logFailTestcase(temp, "Input City failed !");
        }
        if (Country) {
            temp = await leadSearchFilter.inputCountryOnSearchAndFilterFormForLead(Country);
            logFailTestcase(temp, "Input Country failed !");
        }

        temp = await globalPageObject.pressSearchSearchAndFilter();
        logFailTestcase(temp, "Press Search at Search & Filter failed!");
        await globalPageObject.waitForProgressBarLoaded_v2();
        await globalPageObject.waitForProgressBarLoaded_v2();

        const LeadNumber = parseInt(rows[i].LeadNumber);
        const actualTotalNumber = await globalPageObject.getNumberOfTotalRecordsMainTab();
        if (LeadNumber > 1 && LeadNumber === actualTotalNumber) {
            //validate a first row
            temp = await validateLeadInfoAfterSearchAndFilter(
                FirstName,
                LastName,
                Mobile,
                Email,
                Kam,
                CompanyName,
                Address,
                Postcode,
                City,
                Country,
                1
            );
            logFailTestcase(temp, "validate lead info after Search and Filter Failed !");

            //validate a last row or the 10 row
            if (actualTotalNumber >= 10) {
                temp = await validateLeadInfoAfterSearchAndFilter(
                    FirstName,
                    LastName,
                    Mobile,
                    Email,
                    Kam,
                    CompanyName,
                    Address,
                    Postcode,
                    City,
                    Country,
                    10
                );

            } else {
                temp = await validateLeadInfoAfterSearchAndFilter(
                    FirstName,
                    LastName,
                    Mobile,
                    Email,
                    Kam,
                    CompanyName,
                    Address,
                    Postcode,
                    City,
                    Country,
                    actualTotalNumber
                );
            }
            logFailTestcase(temp, "validate lead info after Search and Filter Failed !");
        }
        else if ((LeadNumber === 1 && LeadNumber === actualTotalNumber) || LeadNumber < 0) {
            temp = await validateLeadInfoAfterSearchAndFilter(
                FirstName,
                LastName,
                Mobile,
                Email,
                Kam,
                CompanyName,
                Address,
                Postcode,
                City,
                Country,
                1
            );
            logFailTestcase(temp, "validate lead info after Search and Filter Failed !");

        }
        else {
            logWarningMessage(`There are ${actualTotalNumber} total records found!`);
            logFailTestcase(false, `Line ${i + 1} in csv: failed...`);
            await globalPageObject.waitForProgressBarLoaded_v2();
        }
        logWarningMessage(`\tLine ${i + 1} passed!`);
        await globalPageObject.waitForProgressBarLoaded_v2();
    }
});
Then('System shows a list of leads on lead list', async () => {
    //We have implemented at previous step for multiple searching account.
    console.info(scenarioName + ": Test case is passed!");
});

When("User inputs data to Search and Filter lead form {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];

    const FirstName = row.FirstName;
    const LastName = row.LastName;
    const Mobile = row.Mobile;
    const Email = row.Email;
    const Kam = row.KAM;
    const CompanyName = row.CompanyName;
    const Address = row.Address;
    const Postcode = row.Postcode;
    const City = row.City;
    const Country = row.Country;

    let temp = true;

    temp = await globalPageObject.pressClearSearchAndFilter();
    logFailTestcase(temp, `Press "Clear" Search and Filter form failed!`);

    if (FirstName) {
        temp = await leadSearchFilter.inputFirstNameOnSearchAndFilterFormForLead(FirstName);
        logFailTestcase(temp, "Input FirstName failed !");
    }
    if (LastName) {
        temp = await leadSearchFilter.inputLastNameOnSearchAndFilterFormForLead(LastName);
        logFailTestcase(temp, "Input LastName failed !");
    }
    if (Mobile) {
        temp = await leadSearchFilter.inputMobileOnSearchAndFilterFormForLead(Mobile);
        logFailTestcase(temp, "Input Mobile failed !");
    }
    if (Email) {
        temp = await leadSearchFilter.inputEmailOnSearchAndFilterFormForLead(Email);
        logFailTestcase(temp, "Input Email failed !");
    }
    if (Kam) {
        temp = await leadSearchFilter.inputKAMOnSearchAndFilterFormForLead(Kam);
        logFailTestcase(temp, "Input KAM failed !");
    }
    if (CompanyName) {
        temp = await leadSearchFilter.inputCompanyNameOnSearchAndFilterFormForLead(CompanyName);
        logFailTestcase(temp, "Input CompanyName failed !");
    }
    if (Address) {
        temp = await leadSearchFilter.inputAddressOnSearchAndFilterFormForLead(Address);
        logFailTestcase(temp, "Input Address failed !");
    }
    if (Postcode) {
        temp = await leadSearchFilter.inputPostcodeOnSearchAndFilterFormForLead(Postcode);
        logFailTestcase(temp, "Input Postcode failed !");
    }
    if (City) {
        temp = await leadSearchFilter.inputCityOnSearchAndFilterFormForLead(City);
        logFailTestcase(temp, "Input City failed !");
    }
    if (Country) {
        temp = await leadSearchFilter.inputCountryOnSearchAndFilterFormForLead(Country);
        logFailTestcase(temp, "Input Country failed !");
    }
});

Then("Data in Search and Filter lead form is cleaned", async () => {
    let temp = await leadSearchFilter.checkBtnClearAllOfFirstNameOnSearchAndFilterForm();
    logFailTestcase(temp, "Clear data on First Name is fail !");

    temp = await leadSearchFilter.checkBtnClearAllOfLastNameOnSearchAndFilterForm();
    logFailTestcase(temp, "Clear data on Last Name is fail !");

    temp = await leadSearchFilter.checkBtnClearAllOfMobileOnSearchAndFilterForm();
    logFailTestcase(temp, "Clear data on Mobile is fail !");

    temp = await leadSearchFilter.checkBtnClearAllOfEmailOnSearchAndFilterForm();
    logFailTestcase(temp, "Clear data on Email is fail !");

    temp = await leadSearchFilter.checkBtnClearAllOfKAMOnSearchAndFilterForm();
    logFailTestcase(temp, "Clear data on KAM is fail !");

    temp = await leadSearchFilter.checkBtnClearAllOfCompanyNameOnSearchAndFilterForm();
    logFailTestcase(temp, "Clear data on Company Name is fail !");

    temp = await leadSearchFilter.checkBtnClearAllOfAddressOnSearchAndFilterForm();
    logFailTestcase(temp, "Clear data on Address is fail !");

    temp = await leadSearchFilter.checkBtnClearAllOfPostcodeOnSearchAndFilterForm();
    logFailTestcase(temp, "Clear data on Postcode is fail !");

    temp = await leadSearchFilter.checkBtnClearAllOfCityOnSearchAndFilterForm();
    logFailTestcase(temp, "Clear data on City is fail !");

    temp = await leadSearchFilter.checkBtnClearAllOfCountryOnSearchAndFilterForm();
    logFailTestcase(temp, "Clear data on Country is fail !");
});