import { Before, When } from "@cucumber/cucumber";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { ApplicationProductListCP } from "../../../../page-objects/customer-portal/general/application/application-product-list/ApplicationProductListCP";
import { ApplicationProductListCPGuaranteeAtlas } from "../../../../page-objects/customer-portal/guarantee/atlas/application/application-product-list/ApplicationProductListCPGuaranteeAtlas";
import { ApplicationProductListCPGuaranteeHogs } from "../../../../page-objects/customer-portal/guarantee/hogs/application/application-product-list/ApplicationProductListCPGuaranteeHogs";
import { convertPathFileDataToDataRegression, logFailTestcase } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { scenarioTags } from "../../../../shared/variables";

const loader = require("csv-load-sync");

let applicationProductListCP: ApplicationProductListCP;
let globalPageObject: GlobalPageObject;

Before(async function () {
    const context: ICommonContext = this.context;
    globalPageObject= new  GlobalPageObject(context.driverService);
    if (scenarioTags.has("@CustomerPortalAtlas")) {
        applicationProductListCP = new ApplicationProductListCPGuaranteeAtlas(context.driverService);
    }
    if (scenarioTags.has("@CustomerPortalHogs")) {
        applicationProductListCP = new ApplicationProductListCPGuaranteeHogs(context.driverService);
    }
    if (scenarioTags.has("@AgentPortalHogs")) {
        applicationProductListCP = new ApplicationProductListCPGuaranteeHogs(context.driverService);
    }
});

When("User presses Payment Guarantee on Product page {string}", async (filename) => {
    await globalPageObject.waitForProgressBarLoaded_v2();
    await globalPageObject.waitForProgressBarLoaded_v2();
    const row = loader(convertPathFileDataToDataRegression(filename));
    const Product = row[0].Product;

    let temp = await applicationProductListCP.pressPaymentGuaranteeByProductName(Product);
    logFailTestcase(temp, `Press Payment Guarantee at product "${Product}" failed!`);
});