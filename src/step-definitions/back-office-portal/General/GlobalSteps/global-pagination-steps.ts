import { Before, Given, Then } from "@cucumber/cucumber";
import { GlobalPagination } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPagination";
import { GlobalPaginationCPVarsam } from "../../../../page-objects/customer-portal/varsam/global-page-object/GlobalPaginationCPVarsam";
import { logFailTestcase } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { scenarioTags } from "../../../../shared/variables";


let globalPagination: GlobalPagination;

Before(async function () {
    const context: ICommonContext = this.context;
    globalPagination = new GlobalPagination(context.driverService);
    if(scenarioTags.has("@CustomerPortalVarsam")){
        globalPagination = new GlobalPaginationCPVarsam(context.driverService);
    }
});


Given("User checks pagination for {string} list at main tab", async function (name) {
    let temp = await globalPagination.checkPagingFunctionAtMainList();
    logFailTestcase(temp, `Check pagination on ${name} list failed!`);
});

Given("User checks pagination for {string} list at sub tab", async function (name) {
    let temp = await globalPagination.checkPagingFunctionAtSubList();
    logFailTestcase(temp, `Check pagination on ${name} list in entity detail failed!`);
});

Then("System shows main table with Pagination", async function () {
    logFailTestcase(await globalPagination.checkPaginationOnMainListExist(), `Not found Pagination on table!`);
});

Then("System shows sub table with Pagination", async function () {
    logFailTestcase(await globalPagination.checkPaginationOnSubListExist(), `Not found Pagination on table!`);
});