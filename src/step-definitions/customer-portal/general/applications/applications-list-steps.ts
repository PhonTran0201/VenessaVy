import { Before, When } from "@cucumber/cucumber";
import { ApplicationListCP } from "../../../../page-objects/customer-portal/general/application/application-list/ApplicationListCP";
import { ApplicationListCPGuaranteeAtlas } from "../../../../page-objects/customer-portal/guarantee/atlas/application/application-list/ApplicationListCPGuaranteeAtlas";
import { ApplicationListCPGuaranteeHogs } from "../../../../page-objects/customer-portal/guarantee/hogs/application/application-list/ApplicationListCPGuaranteeHogs";
import { logFailTestcase } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { scenarioTags } from "../../../../shared/variables";
let applicationListCP: ApplicationListCP;

Before(async function () {
    if (scenarioTags.has("@CustomerPortalAtlas")) {
        const context: ICommonContext = this.context;
        applicationListCP = new ApplicationListCPGuaranteeAtlas(context.driverService);
    }
    if (scenarioTags.has("@CustomerPortalHogs")) {
        const context: ICommonContext = this.context;
        applicationListCP = new ApplicationListCPGuaranteeHogs(context.driverService);
    }
});

When("System changes status of the Send button to {string} at application list", async (status) => {
    let temp = true;
    if (status.toLowerCase().localeCompare("disabled") === 0) {
        temp = await applicationListCP.isButtonSendDisabled();
        logFailTestcase(temp, "Button Send is NOT disabled!");
    }
});

