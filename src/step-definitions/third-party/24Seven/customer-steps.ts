import { Before, Given, When } from "@cucumber/cucumber";
import { GlobalCustomerDetail } from "../../../page-objects/third-party/24seven/crm/customers/customer-detail/general/GlobalCustomerDetail";
import { CustomerListTP24Seven } from "../../../page-objects/third-party/24seven/crm/customers/customer-list/CustomerListTP24Seven";
import { convertPathFileDataToDataRegression, logFailMessage, logFailTestcase } from "../../../shared/functions";
import { ICommonContext } from "../../../shared/interfaces";



const loader = require("csv-load-sync");
let customerListTP24Seven: CustomerListTP24Seven;
let globalCustomerDetail: GlobalCustomerDetail;




Before(async function () {
  const context: ICommonContext = this.context;
  customerListTP24Seven = new CustomerListTP24Seven(context.driverService);
  globalCustomerDetail = new GlobalCustomerDetail(context.driverService);
});

Given("User searches the customer with valid information {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename))[0];
    const customerName = rows.CustomerName;
    let temp = true;
    temp = await customerListTP24Seven.searchCustomerOnCustomerList(customerName);
    logFailTestcase(temp,"Search customer in 24Seven on customer list failed!");

    temp = await customerListTP24Seven.openCustomerOnCustomerList(1);
    logFailTestcase(temp,"open customer in 24Seven on customer list failed!");


});

Given("User navigates to Order tab in customer detail", async()=>{
    let temp = await globalCustomerDetail.navigateToOrderTab();
    logFailTestcase(temp, "Navigates to Order tab in customer detail failed!");
});

Given("User navigates to Ledger tab in customer detail", async()=>{
    let temp = await globalCustomerDetail.navigateToLedgerTab();
    logFailTestcase(temp, "Navigates to Ledger tab in customer detail failed!");
});