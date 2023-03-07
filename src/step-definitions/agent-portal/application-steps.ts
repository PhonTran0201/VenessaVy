import { Before, Then } from "@cucumber/cucumber";
import { ApplicationListAGS } from "../../page-objects/agent-portal/hogs/application/application-list/ApplicationListAGS";
import { logFailMessage, logFailTestcase } from "../../shared/functions";
import { ICommonContext } from "../../shared/interfaces";

const loader = require("csv-load-sync");

let applicationListAGS: ApplicationListAGS;

Before(async function () {
    const context: ICommonContext = this.context;
    applicationListAGS= new ApplicationListAGS (context.driverService);
    
});

Then("System shows the success created application notification", async()=>{
    let temp = await applicationListAGS.validateAcceptedFormIsExisted("You have now finished the application");
    logFailTestcase(temp, 'System does not show the success created application notification')
});