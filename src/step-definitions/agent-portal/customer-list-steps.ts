import { Before, Given, When } from "@cucumber/cucumber";
import { CustomerFormAGS } from "../../page-objects/agent-portal/hogs/customer/CustomerFormAGS";
import { CustomerListAGS } from "../../page-objects/agent-portal/hogs/customer/CustomerListAGS";
import { GlobalPageObject } from "../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { convertPathFileDataToDataRegression, logFailTestcase, randomModulus11ForSSN } from "../../shared/functions";
import { ICommonContext } from "../../shared/interfaces";
import { scenarioTags } from "../../shared/variables";

const loader = require("csv-load-sync");

let customerListInterface: CustomerListAGS;
let customerFormInterface: CustomerFormAGS;
let globalPageObject: GlobalPageObject;
Before(async function () {
    const context: ICommonContext = this.context;
    customerListInterface = new CustomerListAGS(context.driverService);
    customerFormInterface = new CustomerFormAGS(context.driverService);
    globalPageObject = new GlobalPageObject(context.driverService);
    
});

Given("User searches the customer with customer name from csv file {string}", async(filename)=>{
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const SelectedAccount = row.SelectedAccount;

    let temp = await customerListInterface.searchCustomer(SelectedAccount);
    logFailTestcase(temp, "search Customer on Customer list failed!");

});




