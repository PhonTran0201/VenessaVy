import { Before, Then } from "@cucumber/cucumber";
import { MyProfileCPVarsam } from "../../../../page-objects/customer-portal/varsam/my-profile/MyProfileCPVarsam";
import { convertPathFileDataToDataRegression, logFailTestcase } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { getValueDataOfDataTestExecution } from "../../../../storage-data/functions/data-test-execution";

const loader = require("csv-load-sync");

let myProfileCPVarsam: MyProfileCPVarsam;
Before(async function () {
    const context: ICommonContext = this.context;
    myProfileCPVarsam = new MyProfileCPVarsam();
});

Then("User verifies info of account details at My profile tab on CustomerPortal {string}", async function (filename) {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const row = rows[0];

    let FirstName = row.FirstName;
    let LastName = row.LastName;
    let NIN = row.NIN;
    let EmailAddress = row.EmailAddress;
    let PhoneNumber = row.PhoneNumber;
    let HomeNumber = row.HomeNumber;
    let Address = row.Address;
    let Postcode = row.Postcode;
    let City = row.City;


    let temp = true;
    if(FirstName && LastName){
        if(FirstName === "@dataTestExecution@" && LastName === "@dataTestExecution@"){
            FirstName = getValueDataOfDataTestExecution("FirstName_AccountPerson");
            LastName = getValueDataOfDataTestExecution("LastName_AccountPerson");
        }
        temp = await myProfileCPVarsam.validateValueFullName(`${FirstName} ${LastName}`.trim());
        logFailTestcase(temp, `Incorrect Full Name`);
    }
    if(NIN){
        if(NIN === "@dataTestExecution@"){
            NIN = getValueDataOfDataTestExecution("NIN_AccountPerson");
        }
        temp = await myProfileCPVarsam.validateValueSSN(NIN);
        logFailTestcase(temp, `Incorrect SSN`);
    }
    if(EmailAddress){
        if(EmailAddress === "@dataTestExecution@"){
            EmailAddress = getValueDataOfDataTestExecution("EmailAddress_AccountPerson");
        }
        temp = await myProfileCPVarsam.validateValueEmail(EmailAddress);
        logFailTestcase(temp, `Incorrect Email`);
    }
    if(PhoneNumber){
        if(PhoneNumber === "@dataTestExecution@"){
            PhoneNumber = getValueDataOfDataTestExecution("PhoneNumber_AccountPerson")
        }
        temp = await myProfileCPVarsam.validateValueMobileNumber(PhoneNumber);
        logFailTestcase(temp, `Incorrect Mobile Number`);
    }
    if(HomeNumber){
        temp = await myProfileCPVarsam.validateValueHomeNumber(HomeNumber);
        logFailTestcase(temp, `Incorrect Home Number`);
    }
    if(Address){
        if(Address === "@dataTestExecution@"){
            Address = getValueDataOfDataTestExecution("Address_AccountPerson");
        }
        temp = await myProfileCPVarsam.validateValueAddress(Address);
        logFailTestcase(temp, `Incorrect Address!`);
    }
    if(Postcode){
        if(Postcode === "@dataTestExecution@"){
            Postcode = getValueDataOfDataTestExecution("Postcode_AccountPerson");
        }
        temp = await myProfileCPVarsam.validateValuePostCode(Postcode);
        logFailTestcase(temp, `Incorrect Postcode!`);
    }
    if(City){
        if(City === "@dataTestExecution@"){
            City = getValueDataOfDataTestExecution("City_AccountPerson");
        }
        temp = await myProfileCPVarsam.validateValueCity(City);
        logFailTestcase(temp, `Incorrect City`);
    }

});