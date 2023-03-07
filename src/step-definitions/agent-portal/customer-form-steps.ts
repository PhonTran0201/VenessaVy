import { Before, Then, When } from "@cucumber/cucumber";
import { CustomerFormAGS } from "../../page-objects/agent-portal/hogs/customer/CustomerFormAGS";
import { GlobalBrowserWindowHandle } from "../../page-objects/back-office-portal/general/GlobalPageObject/GlobalBrowserWindowHandle";
import { compareRawData, getRawData } from "../../shared/function-api-redpill";
import { addDate, convertPathFileDataToDataRegression, getDate, logFailTestcase } from "../../shared/functions";
import { ICommonContext } from "../../shared/interfaces";
import { formatDateTime } from "../../shared/tenant-setting/tenant-setting";

const loader = require("csv-load-sync");
const fs = require('fs');

let customerFormAGS: CustomerFormAGS;
let globalBrowserWindowHandle: GlobalBrowserWindowHandle;
Before(async function () {
    const context: ICommonContext = this.context;
    customerFormAGS = new CustomerFormAGS(context.driverService);
    globalBrowserWindowHandle = new GlobalBrowserWindowHandle(context.driverService);
});


When("User inputs a brand new Org. No. on {string} form", async (formName) => {
    const OrgNo = Math.floor(100000000 + Math.random() * 900000000).toString();
    console.log(OrgNo);
    if (OrgNo) {
        let temp = await customerFormAGS.inputOrgNoBasicInformationAccountCompanyForm(OrgNo);
        logFailTestcase(temp, `Input Org. No on ${formName} form failed !`);
    }
    const applyFG = require("../../../result/data_global.json");
    console.log(applyFG);
    applyFG[0].ApplyForGuarantee.OrgNo = OrgNo;
    applyFG.push();

    const storeData = (data, path) => {
        try {
            fs.writeFileSync(path, JSON.stringify(data));
        } catch (error) {
            console.error(error);
        }
    }
    storeData(applyFG, "./result/data_global.json");
    let temp = await customerFormAGS.clickNextNotSendToR();
    logFailTestcase(temp, "click Next - Not Send To R failed!");

});

When("User checks a company info using Org No. {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const OrgNo = rows[0].OrgNo;

    let temp = await customerFormAGS.inputOrgNoBasicInformationAccountCompanyForm(OrgNo);
    logFailTestcase(temp, "Input OrgNo failed");

    temp = await customerFormAGS.clickNext();
    logFailTestcase(temp, "Failed to click Next button");
})


When("User input valid data to the Customer form {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    let CustomerName = row.CustomerName;
    const CompanyName = row.CompanyName;
    const Product = row.Product;
    const Address = row.Address;
    const Postcode = row.Postcode;
    const City = row.City;
    const ContractAmount = row.ContractAmount;
    const NumberOfEmployees = row.NumberOfEmployees;
    const GuaranteeAmount = row.GuaranteeAmount;
    const StartDateMinusToday = row.StartDateMinusToday;
    const EndDateMinusStartDate = row.EndDateMinusStartDate;
    const Industry = row.Industry;
    let StartDate = "";
    let EndDate = "";
    if (row.StartDateMinusToday) {
        StartDate = getDate(StartDateMinusToday);
    }
    if (row.EndDateMinusStartDate) {
        EndDate = addDate(StartDate, EndDateMinusStartDate);
    }

    //#region get customerNumber from global json file
    // const applyFG = require("../../../result/data_global.json");
    // console.log(applyFG);
    // let customerNumber1 = applyFG[0].ApplyForGuarantee.customerNumber;
    // customerNumber1++;
    // CustomerName = CustomerName + " " + customerNumber1
    // applyFG[0].ApplyForGuarantee.customerNumber = customerNumber1;
    // applyFG.push();

    // const storeData = (data, path) => {
    //     try {
    //         fs.writeFileSync(path, JSON.stringify(data));
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
    // storeData(applyFG, "./result/data_global.json");
    //#endregion


    let temp = true;

    if (CustomerName) {
        temp = await customerFormAGS.inputCompanyNameBasicInformationAccountCompanyForm(CustomerName);
        logFailTestcase(temp, "input customer name on basic information customer form failed!");
    }
    if (CompanyName) {
        temp = await customerFormAGS.inputCompanyNameBasicInformationAccountCompanyForm(CompanyName);
        logFailTestcase(temp, "Input Company Name on Basic Information failed");
    }
    if (Product) {
        temp = await customerFormAGS.inputProductOnBasicInformationCustomerForm(Product);
        logFailTestcase(temp, "input product on basic information customer form failed!");
    }
    if (Address) {
        temp = await customerFormAGS.inputAddressOnBasicInformationCustomerForm(Address);
        logFailTestcase(temp, "input Address on basic information customer form failed!");
    }
    if (Postcode) {
        temp = await customerFormAGS.inputPostcodeOnBasicInformationCustomerForm(Postcode);
        logFailTestcase(temp, "input Postcode on basic information customer form failed!");
    }
    if (City) {
        temp = await customerFormAGS.inputCityOnBasicInformationCustomerForm(City);
        logFailTestcase(temp, "input City on basic information customer form failed!");
    }
    if (ContractAmount) {
        temp = await customerFormAGS.inputContractAmountOnBasicInformationCustomerForm(ContractAmount);
        logFailTestcase(temp, "input ContractAmount on basic information customer form failed!");
    }
    if (NumberOfEmployees) {
        temp = await customerFormAGS.inputNumberOfEmployeesOnBasicInformationCustomerForm(NumberOfEmployees);
        logFailTestcase(temp, "input NumberOfEmployees on basic information customer form failed!");
    }
    if (GuaranteeAmount) {
        temp = await customerFormAGS.inputGuaranteeAmountOnBasicInformationCustomerForm(GuaranteeAmount);
        logFailTestcase(temp, "input GuaranteeAmount on basic information customer form failed!");
        // console.log(numberToCurrency(GuaranteeAmount));
    }
    if (StartDate) {
        temp = await customerFormAGS.inputStartDateOnBasicInformationCustomerForm(StartDate);
        logFailTestcase(temp, "input StartDate on basic information customer form failed!");
    }
    if (EndDate) {
        temp = await customerFormAGS.inputEndDateOnBasicInformationCustomerForm(EndDate);
        logFailTestcase(temp, "input EndDate on basic information customer form failed!");
    }
    if (Industry) {
        temp = await customerFormAGS.inputIndustryOnBasicInformationCustomerForm(Industry);
        logFailTestcase(temp, "input Industry on basic information customer form failed!");
    }

    // temp = await customerFormAGS.clickNext();
    // logFailTestcase(temp, "click Next on basic information customer form failed!");
})

Then("System shows correct Basic Information on the company {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const OrgNo = rows[0].OrgNo;
    const CompanyName = rows[0].CompanyName;
    const Address = rows[0].VisitingAddress;
    const Postcode = rows[0].Postcode;
    const City = rows[0].City;
    const Currency = rows[0].Currency;
    const StartDateMinusToday = rows[0].StartDateMinusToday;
    const EndDateMinusStartDate = rows[0].EndDateMinusStartDate;
    const Industry = rows[0].Industry;

    let StartDate = "";
    if (rows[0].StartDateMinusToday) {
        StartDate = getDate(StartDateMinusToday);
    }
    let EndDate = "";
    if (rows[0].EndDateMinusStartDate) {
        EndDate = addDate(StartDate, EndDateMinusStartDate);
    }

    let temp = true;

    if (OrgNo) {
        temp = await customerFormAGS.validateOrgNoOnBasicInformationCustomerForm(OrgNo);
        logFailTestcase(temp, "Validate OrgNo failed");
    }


    if (CompanyName) {
        temp = await customerFormAGS.validateCompanyNameOnBasicInformationCustomerForm(CompanyName);
        logFailTestcase(temp, "Validate Company Name failed");
    }
    if (Address) {
        temp = await customerFormAGS.validateAddressOnBasicInformationCustomerForm(Address);
        logFailTestcase(temp, "Validate Address failed");
    }
    if (Postcode) {
        temp = await customerFormAGS.validatePostcodeOnBasicInformationCustomerForm(Postcode);
        logFailTestcase(temp, "Validate Postcode failed");
    }

    if (City) {
        temp = await customerFormAGS.validateCityOnBasicInformationCustomerForm(City);
        logFailTestcase(temp, "Validate City failed");
    }


    if (Currency) {
        temp = await customerFormAGS.validateCurrencyOnBasicInformationCustomerForm(Currency);
        logFailTestcase(temp, "Validate Currency failed");
    }

    if (Industry) {
        temp = await customerFormAGS.validateIndustryOnBasicInformationCustomerForm(Industry);
        logFailTestcase(temp, "Validate Industry failed");
    }
    if (StartDate) {
        temp = await customerFormAGS.validateStartDateOnBasicInformationCustomerForm(formatDateTime(StartDate));
        logFailTestcase(temp, "input StartDate on basic information customer form failed!");
    }

    temp = await customerFormAGS.clickNext();
    logFailTestcase(temp, "Click Next button failed");

})

Then("System shows response returned by API comparing to data returned by Chrome DevTool", async () => {
    let token = await globalBrowserWindowHandle.getAccessToken();
    let temp = await compareRawData(await getRawData(token));
    logFailTestcase(temp, "Actual Raw Data returned is different from expected Raw Data");
})