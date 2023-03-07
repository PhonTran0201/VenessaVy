import { Before, When } from "@cucumber/cucumber";
import { ApplicationProductDetailCP } from "../../../../page-objects/customer-portal/general/application/application-product-detail/ApplicationProductDetailCP";
import { ApplicationProductDetailCPGuaranteeAtlas } from "../../../../page-objects/customer-portal/guarantee/atlas/application/application-product-detail/ApplicationProductDetailCPGuaranteeAtlas";
import { ApplicationProductDetailCPGuaranteeHogs } from "../../../../page-objects/customer-portal/guarantee/hogs/application/application-product-detail/ApplicationProductDetailCPGuaranteeHogs";
import { convertPathFileDataToDataRegression, logFailTestcase } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { scenarioTags } from "../../../../shared/variables";

const loader = require("csv-load-sync");

let applicationProductDetailCP: ApplicationProductDetailCP;

Before(async function () {
    if (scenarioTags.has("@CustomerPortalAtlas")) {
        const context: ICommonContext = this.context;
        applicationProductDetailCP = new ApplicationProductDetailCPGuaranteeAtlas(context.driverService);
    }
    if (scenarioTags.has("@CustomerPortalHogs")) {
        const context: ICommonContext = this.context;
        applicationProductDetailCP = new ApplicationProductDetailCPGuaranteeHogs(context.driverService);
    }
});

When("User verifies information at Product detail Application form {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename));
    const ProductName = row[0].ProductName || row[0].Product;
    const OrdererDebtor = row[0].OrdererDebtor;


    let temp = await applicationProductDetailCP.validateProductName(ProductName);
    logFailTestcase(temp);

    temp = await applicationProductDetailCP.validateDebtor(OrdererDebtor);
    logFailTestcase(temp);
});