import { When } from "@cucumber/cucumber";
import { PageFactory } from "../../../../page-objects/PageFactory";
import { convertPathFileDataToDataRegression, logFailTestcase } from "../../../../shared/functions";
import { getDefaultCurrency } from "../../../../shared/tenant-setting/tenant-setting";
const loader = require('csv-load-sync');

const pipelineList = PageFactory.getInstance().createPipelineList();
const commissionConfigurationForm = PageFactory.getInstance().createCommissionConfigurationForm();
const commissionConfigurationList = PageFactory.getInstance().createCommissionConfigurationList();
const globalPageObject = PageFactory.getInstance().createGlobalPageObjectPage();


When("User inputs valid data into Commission Configuration form {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const Product = rows[0].Product;
    const Pipeline = rows[0].Pipeline;
    const Stage = rows[0].Stage;
    const Commission = rows[0].Commission;


    let temp = await commissionConfigurationForm.inputProduct(Product);
    logFailTestcase(temp, `Input Product failed!`);

    temp = await commissionConfigurationForm.inputPipeline(Pipeline);
    logFailTestcase(temp, `Input Pipeline failed!`);

    temp = await commissionConfigurationForm.inputStage(Stage);
    logFailTestcase(temp, `Input Stage failed!`);

    temp = await commissionConfigurationForm.inputCommisstion(Commission);
    logFailTestcase(temp, `Input Commission failed!`);
});

When("User verifies info into Commission Configuration form {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const Product = rows[0].Product;
    const Pipeline = rows[0].Pipeline;
    const Stage = rows[0].Stage;
    const Commission = rows[0].Commission;


    let temp = await commissionConfigurationForm.validateValueProduct(Product);
    logFailTestcase(temp);

    temp = await commissionConfigurationForm.validateValuePipeline(Pipeline);
    logFailTestcase(temp);

    temp = await commissionConfigurationForm.validateValueStage(Stage);
    logFailTestcase(temp);

    temp = await commissionConfigurationForm.validateValueCommission(Commission);
    logFailTestcase(temp);
});


When("User checks options in Sale Stage on Commission Configuration form {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const Product = rows[0].Product;
    const Pipeline = rows[0].Pipeline;
    const Stage = rows[0].Stage;

    const IncludedStages = rows[0].IncludedStages.split("=");

    let temp = await commissionConfigurationForm.inputProduct(Product);
    logFailTestcase(temp, `Input Product failed!`);

    temp = await commissionConfigurationForm.inputPipeline(Pipeline);
    logFailTestcase(temp, `Input Pipeline failed!`);

    temp = await commissionConfigurationForm.inputStage(Stage, 5000);
    logFailTestcase(!temp, `Stage "${Stage}" should be hidden!`);

    for (const iterator of IncludedStages) {
        temp = await commissionConfigurationForm.inputStage(iterator);
        logFailTestcase(temp, `Stage "${iterator}" is NOT found!`);
    }
});

When("User verifies fields on Update Commission Configuration form",async () => {
    await globalPageObject.waitForProgressBarLoaded_v2();
    await globalPageObject.waitForProgressBarLoaded_v2();

    const Product = await commissionConfigurationList.getValueProductByRow();
    logFailTestcase(Product.length > 0, `Get Product failed!`);

    const Pipeline = await commissionConfigurationList.getValuePipelineByRow();
    logFailTestcase(Pipeline.length > 0, `Get Pipeline failed!`);

    const StageTemp = await commissionConfigurationList.getValueStageByRow();
    const Stage = `${StageTemp.split(" - ")[1]} - ${StageTemp.split(" - ")[0]}`;
    logFailTestcase(Stage.length > 0, `Get Stage failed!`);

    const Commission = await (await commissionConfigurationList.getValueCommissionByRow()).replace(` ${getDefaultCurrency()}`, "");
    logFailTestcase(Commission.length > 0, `Get Commission failed!`);


    let temp = await commissionConfigurationList.pressEditCommissionByRow();
    logFailTestcase(temp, `Press Edit button at row 1 failed!`);

    temp = await commissionConfigurationForm.validateValueProduct(Product);
    logFailTestcase(temp);

    temp = await commissionConfigurationForm.validateValuePipeline(Pipeline);
    logFailTestcase(temp);

    temp = await commissionConfigurationForm.validateValueStage(Stage);
    logFailTestcase(temp);

    temp = await commissionConfigurationForm.validateValueCommission(Commission);
    logFailTestcase(temp);


    /// Re-select pipeline
    temp = await commissionConfigurationForm.selectTheOtherExistingPipeline();
    logFailTestcase(temp, `Re-select pipeline failed!`);

    temp = await commissionConfigurationForm.isStageValueExisted();
    logFailTestcase(!temp, `Stage is NOT cleared!`);
});