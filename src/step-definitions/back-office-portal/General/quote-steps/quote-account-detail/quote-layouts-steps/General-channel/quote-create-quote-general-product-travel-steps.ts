import { Before, Given, Then } from "@cucumber/cucumber";
import { AccountTabQuoteCreateQuoteGeneralProductTravel } from "../../../../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-quote/General-channel/AccountTabQuoteCreateQuoteGeneralProductTravel";
import { GlobalPageObject } from "../../../../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { addDate, addYear, convertPathFileDataToDataRegression, getDate, logFailTestcase } from "../../../../../../../shared/functions";
import { ICommonContext } from "../../../../../../../shared/interfaces";
import { getValueDataOfDataTestExecution, pushObjectToDataArrayWithUniqueKey } from "../../../../../../../storage-data/functions/data-test-execution";


let accountTabQuoteCreateQuoteGeneralProductTravel: AccountTabQuoteCreateQuoteGeneralProductTravel;
let globalPageObject: GlobalPageObject;
const loader = require("csv-load-sync");

Before(async function () {
    const context: ICommonContext = this.context;
    accountTabQuoteCreateQuoteGeneralProductTravel = new AccountTabQuoteCreateQuoteGeneralProductTravel(context.driverService);
    globalPageObject = new GlobalPageObject(context.driverService);

});

Given("User verifies info on Create Quote form for General product Travel {string}", async function (filename) {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const row = rows[0];

    const QuoteReference = await accountTabQuoteCreateQuoteGeneralProductTravel.getQuoteRef();
    pushObjectToDataArrayWithUniqueKey("QuoteReference", QuoteReference);
    let startDate = row.StartDate;
    let endDate = row.EndDate;
    const StartDateMinusToday = row.StartDateMinusToday;
    const EndDateMinusStartDate = row.EndDateMinusStartDate;
    const name = row.Name;
    const age = row.Age;
    const numOfTraveller = row.NumberOfTraveller;
    const luggageExcess = row.LuggageExcess;
    const additionalCover = row.AdditionalCover;

    //ACTIONS
    if (StartDateMinusToday && EndDateMinusStartDate) {
        startDate = getDate(StartDateMinusToday);
        endDate = addDate(startDate, EndDateMinusStartDate);
    }

    let temp = true;

    temp = await accountTabQuoteCreateQuoteGeneralProductTravel.validateStartDate(startDate);
    logFailTestcase(temp, `Incorrect Start Date`);

    temp = await accountTabQuoteCreateQuoteGeneralProductTravel.validateEndDate(endDate);
    logFailTestcase(temp, `Incorrect End Date`);

    temp = await accountTabQuoteCreateQuoteGeneralProductTravel.validateNameInsuredPerson(name);
    logFailTestcase(temp, `Incorrect Name Insured person`);

    temp = await accountTabQuoteCreateQuoteGeneralProductTravel.validateAgeInsuredPerson(age);
    logFailTestcase(temp, `Incorrect Age Insured Person`);

    temp = await accountTabQuoteCreateQuoteGeneralProductTravel.validateNumberOfTravellerTravellers(numOfTraveller);
    logFailTestcase(temp, `Incorrect Number of Traveler`);

    temp = await accountTabQuoteCreateQuoteGeneralProductTravel.validateLuggageExcessTravellers(luggageExcess);
    logFailTestcase(temp, `Incorrect Luggage Excess`);

    temp = await accountTabQuoteCreateQuoteGeneralProductTravel.validateAdditionalCoverCover(additionalCover);
    logFailTestcase(temp, `Incorrect Additional Cover`);
});

Given("User inputs data on Create Quote form for General product Travel {string}", async function (filename) {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const row = rows[0];

    pushObjectToDataArrayWithUniqueKey("QuoteReference", await accountTabQuoteCreateQuoteGeneralProductTravel.getQuoteRef());
    let startDate = row.StartDate;
    let endDate = row.EndDate;
    const StartDateMinusToday = row.StartDateMinusToday;
    const EndDateMinusStartDate = row.EndDateMinusStartDate;
    const name = row.Name;
    const age = row.Age;
    const numOfTraveller = row.NumberOfTraveller;
    const luggageExcess = row.LuggageExcess;
    const additionalCover = row.AdditionalCover;

    //ACTIONS
    if (StartDateMinusToday && EndDateMinusStartDate) {
        startDate = getDate(StartDateMinusToday);
        if (EndDateMinusStartDate === '1Year') {
          endDate = addDate(addYear(startDate, 1),-1);
        }
        else {
          endDate = addDate(startDate, EndDateMinusStartDate);
        }
    }

    let temp = true;
    if (startDate) {
        temp = await accountTabQuoteCreateQuoteGeneralProductTravel.inputStartDate(startDate);
        logFailTestcase(temp, `Input start date failed!`);
    }
    if (endDate) {
        temp = await accountTabQuoteCreateQuoteGeneralProductTravel.inputEndDate(endDate);
        logFailTestcase(temp, `Input End date failed!`);
    }
    if (name) {
        temp = await accountTabQuoteCreateQuoteGeneralProductTravel.inputNameInsuredPerson(name);
        logFailTestcase(temp, `Input Name falied!`);
    }
    if (age) {
        temp = await accountTabQuoteCreateQuoteGeneralProductTravel.inputAgeInsuredPerson(age);
        logFailTestcase(temp, `Input age failed!`);
    }
    if (numOfTraveller) {
        temp = await accountTabQuoteCreateQuoteGeneralProductTravel.inputNumberOfTravellerTravellers(numOfTraveller);
        logFailTestcase(temp, `Input Number of Traveler failed!`);
    }
    if (luggageExcess) {
        temp = await accountTabQuoteCreateQuoteGeneralProductTravel.inputLuggageExcessTravellers(luggageExcess);
        logFailTestcase(temp, `Input Luggage Excess failed!`);
    }
    if (additionalCover) {
        temp = await accountTabQuoteCreateQuoteGeneralProductTravel.inputAdditionalCover(additionalCover);
        logFailTestcase(temp, `Input Additional cover falied!`);
    }
});

Then(`User verifies {string} field is {string} on Create Quote form`, async (fieldName, StatusOfField) => {
    /*
Note: 
    + fieldName : is the id or field name of the field
    + StatusOfField : is the status of the field base on permission
                      We have 4 statuses are defined : enabled, disabled, visible, invisible
    */

    await globalPageObject.waitForProgressBarLoaded_v2();
    await globalPageObject.waitForProgressBarLoaded_v2();
    if (StatusOfField.localeCompare(`invisible`) === 0) {
        let temp = await accountTabQuoteCreateQuoteGeneralProductTravel.validateFieldIsExistedOrNotById(fieldName, false);
        logFailTestcase(temp, `User verifies ${fieldName} field is ${StatusOfField} failed!`);
    } else if (StatusOfField.localeCompare(`visible`) === 0) {
        let temp = await accountTabQuoteCreateQuoteGeneralProductTravel.validateFieldIsExistedOrNotById(fieldName, true);
        logFailTestcase(temp, `User verifies ${fieldName} field is ${StatusOfField} failed!`);
    } else {
        let temp = await accountTabQuoteCreateQuoteGeneralProductTravel.validateFieldIsDisabledOrNotById(fieldName, StatusOfField);
        logFailTestcase(temp, `User verifies ${fieldName} field is ${StatusOfField} failed!`);
    }
});

Then(`User inputs {string} value to {string} field on Create Quote form`, async (value, IDfield) => {

      /*
Note: 
    + value : is the value needs to input to the field
    + IDfield : is the id of the field
    
    */

    let temp = await accountTabQuoteCreateQuoteGeneralProductTravel.inputFieldById(IDfield, value)
    logFailTestcase(temp, `User inputs ${value} value to ${IDfield} field failed!`);
});
