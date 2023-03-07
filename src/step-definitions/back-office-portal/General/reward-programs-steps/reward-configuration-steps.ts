import { Given, Then, When } from "@cucumber/cucumber";
import { DataRepo } from "../../../../core/modals/DataRepo";
import { PageFactory } from "../../../../page-objects/PageFactory";
import { convertPathFileDataToDataRegression, logFailTestcase, reloadTable } from "../../../../shared/functions";
import { getValueDataOfDataTestExecution, pushObjectToDataArrayWithUniqueKey } from "../../../../storage-data/functions/data-test-execution";

const PageObject = PageFactory.getInstance().createGlobalPageObjectPage();
const PageForm = PageFactory.getInstance().createRewardConfigurationCreatePage();
const PageList = PageFactory.getInstance().createRewardConfigurationListPage();
const PageListProgram = PageFactory.getInstance().createProgramConfigurationListPage();


const loader = require("csv-load-sync");

Given("User navigates to Reward Programs", async function () {
    let temp = await PageObject.navigateToMainModuleConfiguration();
    logFailTestcase(temp, "Navigate to Module configuration failed!");

    temp = await PageObject.selectDomainCardAtGlobalSetting("SEAMLESS LOYALTY");
    logFailTestcase(temp, `Select "SEAMLESS LOYALTY" failed!`);

    temp = await await PageObject.pressSettingAtDomainDetailItemInDomainCard("Reward Programs");
    logFailTestcase(temp, `Press "Setting" at Reward Programs domain detail failed!`);
});

When("User selects {string} tab in Reward Programs", async (tabName: string) => {
    if (tabName.localeCompare("Programs") === 0) {
        let temp = await PageListProgram.navigateToProgramsTab();
        logFailTestcase(temp, 'navigate To Programs Tab failed!')
    } else if (tabName.localeCompare("Rewards") === 0) {
        let temp = await PageList.navigateToRewardTab();
        logFailTestcase(temp, 'navigate To Reward Tab failed!')
    } else {
        logFailTestcase(false, `Can not find any tab has name '${tabName}'`);
    }
});

When("User presses create button on Reward configuration", async () => {
    let temp = await PageList.pressCreateButton();
    logFailTestcase(temp, `press Create Button failed!`);
});
When("User presses Remove Rewards button on Reward configuration", async () => {
    let temp = await PageList.pressRemoveRewardsButton();
    logFailTestcase(temp, `press Remove Rewards Button Button failed!`);
});

When("User presses {string} a reward on the list {string}", async (actionButton, filename) => {
    const row = (await DataRepo.getInstance().loadData(filename))[0];
    const RewardName = row.RewardName;

    let temp = true;
    if (actionButton.localeCompare("edit") === 0) {
        temp = await PageList.editTheRewardByName(RewardName);
        logFailTestcase(temp, `edit The Reward By Name '${RewardName}' failed!`)
    } else if (actionButton.localeCompare("delete") === 0) {
        pushObjectToDataArrayWithUniqueKey("OriginalTotalRecord", await (await PageObject.getNumberOfTotalRecordsMainTab()).toString())
        temp = await PageList.deleteTheRewardByName(RewardName);
        logFailTestcase(temp, `delete The Reward By Name '${RewardName}' failed!`)
    } else {
        logFailTestcase(false, `Can not Interactive with action '${actionButton}' !`);
    }
});

When("User inputs valid data into reward form {string}", async (filename) => {
    const row = (await DataRepo.getInstance().loadData(filename))[0];
    const RewardName = row.RewardName;
    const Program = row.Program || row.ProgramName;
    const Product = row.Product;
    const Event = row.Event;
    const PointAwarded = row.PointAwarded;
    const AttributeTag = row.AttributeTag;
    const Value = row.Value;
    const WorkflowEventIdentificationKey = row.WorkflowEventIdentificationKey;

    let temp = true;
    if (RewardName) {
        temp = await PageForm.inputRewardNameOnRewardForm(RewardName);
        logFailTestcase(temp, `input reward name on form failed!`);
    }
    if (Program) {
        temp = await PageForm.inputProgramOnRewardForm(Program);
        logFailTestcase(temp, `input Program on form failed!`);
    }
    if (Product) {
        temp = await PageForm.inputProductOnRewardForm(Product);
        logFailTestcase(temp, `input Product on form failed!`);
    }
    if (Event) {
        temp = await PageForm.inputEventOnRewardForm(Event);
        logFailTestcase(temp, `input Event on form failed!`);
    }
    if (PointAwarded) {
        temp = await PageForm.inputPointAwardedOnRewardForm(PointAwarded);
        logFailTestcase(temp, `input PointAwarded on form failed!`);
    }
    if (AttributeTag) {
        temp = await PageForm.inputAttributeTagOnRewardForm(AttributeTag);
        logFailTestcase(temp, `input AttributeTag on form failed!`);
    }
    if (Value) {
        temp = await PageForm.inputValueOnRewardForm(Value);
        logFailTestcase(temp, `input Value on form failed!`);
    }
    if(WorkflowEventIdentificationKey){
        temp = await PageForm.inputWorkflowEventIdentificationKeyOnRewardForm(WorkflowEventIdentificationKey);
        logFailTestcase(temp, `input WorkflowEventIdentificationKey on form failed!`);
    }

    temp = await PageObject.pressSaveForm();
    logFailTestcase(temp, "Presses Save form failed!");
});

Then("User verifies information is shown correctly on reward form {string}", async (filename) => {
    await PageObject.waitForProgressBarLoaded_v2();
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const RewardName = row.RewardName;
    const Program = row.Program;
    const Product = row.Product;
    const Event = row.Event;
    const PointAwarded = row.PointAwarded;
    const AttributeTag = row.AttributeTag;
    const Value = row.Value;

    let temp = true;
    if (Program) {
        temp = await PageForm.validateProgramValueOnRewardForm(Program);
        logFailTestcase(temp, "validate program value on reward form failed!");
    }
    if (RewardName) {
        temp = await PageForm.validateRewardValueOnRewardForm(RewardName);
        logFailTestcase(temp, "validate RewardName value on reward form failed!");
    }
    if (Product) {
        temp = await PageForm.validateProductValueOnRewardForm(Product);
        logFailTestcase(temp, "validate Product value on reward form failed!");
    }
    if (Event) {
        temp = await PageForm.validateEventValueOnRewardForm(Event);
        logFailTestcase(temp, "validate Event value on reward form failed!");
    }
    if (PointAwarded) {
        temp = await PageForm.validatePointAwardedValueOnRewardForm(PointAwarded);
        logFailTestcase(temp, "validate PointAwarded value on reward form failed!");
    }
    if (AttributeTag) {
        temp = await PageForm.validateAttributeTagValueOnRewardForm(AttributeTag);
        logFailTestcase(temp, "validate AttributeTag value on reward form failed!");
    }
    if (Value) {
        temp = await PageForm.validateValueFieldOnRewardForm(Value);
        logFailTestcase(temp, "validate value field on reward form failed!");
    }
    await PageObject.closeOpeningForm();

});

Then("System shows correct information of the reward on the list {string}", async (filename) => {
    await PageObject.reloadTable(4000);
    const row = (await DataRepo.getInstance().loadData(filename))[0];
    const RewardName = row.RewardName;
    const Program = row.Program;
    const Product = row.Product;
    const Event = row.Event;
    const PointAwarded = row.PointAwarded;
    const AttributeTag = row.AttributeTag;
    const Value = row.Value;

    let temp = true;
    if (Program) {
        temp = await PageList.validateProgramValueOnRewardList(Program);
        logFailTestcase(temp, "validate program value on reward List failed!");
    }
    if (RewardName) {
        temp = await PageList.validateRewardValueOnRewardList(RewardName);
        logFailTestcase(temp, "validate RewardName value on reward List failed!");
    }
    if (Product) {
        temp = await PageList.validateProductValueOnRewardList(Product);
        logFailTestcase(temp, "validate Product value on reward List failed!");
    }
    // if (Event) {
    //     temp = await rewardConfiguration.validateEventValueOnRewardList(Event);
    //     logFailTestcase(temp, "validate Event value on reward List failed!");
    // }
    if (PointAwarded) {
        temp = await PageList.validatePointAwardedValueOnRewardList(PointAwarded);
        logFailTestcase(temp, "validate PointAwarded value on reward List failed!");
    }
    if (AttributeTag) {
        temp = await PageList.validateAttributeTagValueOnRewardList(AttributeTag);
        logFailTestcase(temp, "validate AttributeTag value on reward List failed!");
    }
    if (Value) {
        temp = await PageList.validateValueOnRewardList(Value);
        logFailTestcase(temp, "validate value field on reward List failed!");
    }
});

Then("System does not show the reward on the list {string}", async (filename) => {
    await PageObject.reloadTable(4000);
    let OriginalTotalRecord = parseInt(getValueDataOfDataTestExecution("OriginalTotalRecord"));
    let ActualTotalRecord = await PageObject.getNumberOfTotalRecordsMainTab();
    const row = (await DataRepo.getInstance().loadData(filename))[0];
    const RewardName = row.RewardName;

    if (OriginalTotalRecord - ActualTotalRecord != 1) {
        logFailTestcase(false, "Remove the reward from the list failed!");
    }

    if (RewardName) {
        let temp = await PageList.validateRewardValueNotShowOnRewardList(RewardName, 1);
        logFailTestcase(temp, "The reward is still shown on the list!");
    }
});


When("User selects {string} rewards need to removes them from the list", async (theNumberOfRewards: string) => {
    let TheNumberOfRewards = parseInt(theNumberOfRewards);
    let temp = true;
    for (let i = 1; i <= TheNumberOfRewards; i++) {
        temp = await PageList.tickCheckboxToDeleteRewardByRow(i);
        logFailTestcase(temp, `tick Checkbox To Delete Reward on row ${i} failed!`);

    }
    pushObjectToDataArrayWithUniqueKey("OriginalTotalRecord", await (await PageObject.getNumberOfTotalRecordsMainTab()).toString())
});

Then("User verifies {string} rewards have been removed from the list", async (theNumberOfRewards) => {
    await PageObject.waitForProgressBarLoaded_v2();
    await PageObject.waitForProgressBarLoaded_v2();
    await PageObject.reloadTable(5000);
    let TheNumberOfRewards = parseInt(theNumberOfRewards);
    let OriginalTotalRecord = parseInt(getValueDataOfDataTestExecution("OriginalTotalRecord"));
    let ActualTotalRecord = await PageObject.getNumberOfTotalRecordsMainTab();

    if (OriginalTotalRecord - TheNumberOfRewards != ActualTotalRecord) {
        logFailTestcase(false, `${TheNumberOfRewards} rewards have not been removed from the list`)
    }
});