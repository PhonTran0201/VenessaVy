import { When } from "@cucumber/cucumber";
import { PageFactory } from "../../../../page-objects/PageFactory";
import { convertPathFileDataToDataRegression, logFailTestcase } from "../../../../shared/functions";
import { getDefaultCurrency } from "../../../../shared/tenant-setting/tenant-setting";
const loader = require('csv-load-sync');

const pipelineList = PageFactory.getInstance().createPipelineList();
const globalConfirmationForm = PageFactory.getInstance().createGlobalConfirmationForm();
const commissionConfigurationList = PageFactory.getInstance().createCommissionConfigurationList();
const globalPageObject = PageFactory.getInstance().createGlobalPageObjectPage();

When("User is on Commission Configuration list", async () => {
    let temp = await pipelineList.pressCommissionTab();
    logFailTestcase(temp, `Press commission button failed!`);
});

When("User opens Create Commission Configuration form", async () => {
    let temp = await commissionConfigurationList.pressAddButton();
    logFailTestcase(temp, `Press Add button at Commission Configuration list failed!`);
    await globalPageObject.waitForProgressBarLoaded_v2();
});

When("User opens Update Commission Configuration form at first row", async () => {
    let temp = await commissionConfigurationList.pressEditCommissionByRow();
    logFailTestcase(temp, `Press Edit button at Commission Configuration list failed!`);
    await globalPageObject.waitForProgressBarLoaded_v2();
});

When("User verifies info at Commission Configuration list {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));

    const Product = rows[0].Product;
    const Pipeline = rows[0].Pipeline;
    const Stage = rows[0].Stage;
    const Commission = rows[0].Commission;

    await globalPageObject.reloadTable(3000);

    let temp = await commissionConfigurationList.validateValueProductByRow(Product);
    logFailTestcase(temp);

    temp = await commissionConfigurationList.validateValuePipelineByRow(Pipeline);
    logFailTestcase(temp);

    const stageTemp = `${Stage.split(" - ")[1]} - ${Stage.split(" - ")[0]}`;
    temp = await commissionConfigurationList.validateValueStageByRow(stageTemp);
    logFailTestcase(temp);

    temp = await commissionConfigurationList.validateValueCommissionByRow(`${Commission} ${getDefaultCurrency()}`);
    logFailTestcase(temp);
});

When("User deletes a commission configuration",async () => {
    await globalPageObject.waitForProgressBarLoaded_v2();

    const Product = await commissionConfigurationList.getValueProductByRow();
    logFailTestcase(Product.length > 0, `Get Product failed!`);

    const Pipeline = await commissionConfigurationList.getValuePipelineByRow();
    logFailTestcase(Pipeline.length > 0, `Get Pipeline failed!`);

    const Stage = await commissionConfigurationList.getValueStageByRow();
    logFailTestcase(Stage.length > 0, `Get Stage failed!`);

    const Commission = await commissionConfigurationList.getValueCommissionByRow();
    logFailTestcase(Commission.length > 0, `Get Commission failed!`);


    let temp = await commissionConfigurationList.pressDeleteCommissionByRow();
    logFailTestcase(temp, `Press Delete button at row 1 failed!`);

    temp = await globalConfirmationForm.validateValueConfirmMessage("Are you sure you want to delete this item?");
    logFailTestcase(temp, `Incorrect Message confirmation!`);

    const numberRecordBefore = await globalPageObject.getNumberOfTotalRecordsMainTab();
    logFailTestcase(numberRecordBefore >= 0, `Get Number Commission failed!`);

    temp = await globalPageObject.pressYesForm();
    logFailTestcase(temp, `Press Yes button failed!`);

    await globalPageObject.waitForProgressBarLoaded_v2();
    await globalPageObject.reloadTable();
    
    const numberRecordAfter = await globalPageObject.getNumberOfTotalRecordsMainTab();
    logFailTestcase(numberRecordAfter >= 0, `Get Number Commission failed!`);

    logFailTestcase(numberRecordBefore - numberRecordAfter === 1, `Number of record commission has NOT changed!`);

    let temp1 = await commissionConfigurationList.validateValueProductByRow(Product);
    let temp2 = await commissionConfigurationList.validateValuePipelineByRow(Pipeline);
    let temp3 = await commissionConfigurationList.validateValueStageByRow(Stage);
    let temp4 = await commissionConfigurationList.validateValueCommissionByRow(Commission);

    logFailTestcase(!(temp1 && temp2 && temp3 && temp4), `The commission still shows on list and does not deleted`);
});