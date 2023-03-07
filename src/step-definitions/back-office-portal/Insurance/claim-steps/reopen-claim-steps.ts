import { Then, When } from "@cucumber/cucumber";
import { PageFactory } from "../../../../page-objects/PageFactory";
import { convertPathFileDataToDataRegression, getCurrentDateTime, logFailTestcase } from "../../../../shared/functions";
import { UserProfileInfo } from "../../../../shared/user-profile/UserProfileInfo";
import { getValueDataOfDataTestExecution } from "../../../../storage-data/functions/data-test-execution";

//Close Claim steps
const loader = require("csv-load-sync");
const reopenClaimFormInsurance = PageFactory.getInstance().createReopenClaimFormInsurane();
const claimDetailsLeftSideInsurance = PageFactory.getInstance().createClaimDetailsLeftSideInsurance();
const claimListInsurance = PageFactory.getInstance().createClaimListInsurance();
const globalPageObject = PageFactory.getInstance().createGlobalPageObjectPage();
const claimTabHistoryListInsurance = PageFactory.getInstance().createClaimTabHistoryListInsurance();

When("User presses Reopen claim button in Claim details", async () => {
    const temp = await claimDetailsLeftSideInsurance.pressReopeClaim();
    logFailTestcase(temp, "User press Reopen Claim button failed!");
})

When("User inputs valid data into Reopen claim form {string}", async function (filename) {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const Reason = rows[0].Reason;

    let temp = true;
    if (Reason) {
        temp = await reopenClaimFormInsurance.inputReason(Reason);
        logFailTestcase(temp, `Input reason "${Reason}" failed!`);
    }
});

When(`User verifies info after reopen claim on claim detail {string}`, async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const Reason = rows[0].Reason;

    // Nó chỉ có thay đổi status chổ Claim detail leftside

    let temp = true;
    temp = await claimDetailsLeftSideInsurance.validateValueClaimDetail('Open', "Status");
    logFailTestcase(temp, `Incorrect status "Closed" at Claim detail!`);
});

When(`User verifies info after reopen claim on claim list {string}`, async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    let temp = true;
    await globalPageObject.reloadTable(3000);
    await globalPageObject.waitForProgressBarLoaded_v2();

    temp = await claimListInsurance.validateStatusClaimListByReferenceId("Open", getValueDataOfDataTestExecution("Claim ReferenceId"));
    logFailTestcase(temp);
});

Then("User verifies info after reopen claim on History Tab of the claim detail {string}", async (filename) => {
    let temp = true;
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const UpdatedBy = UserProfileInfo.getDisplayName();
    const EventLogs = "Claim reopen";
    const claimId = getValueDataOfDataTestExecution("Claim ReferenceId");

    const Reason = rows[0].Reason;
    await globalPageObject.navigateToSubHistory();
    await globalPageObject.reloadTable(3000);


    const EventDescription = `Claim ${claimId} has been reopened. Reason: ${Reason}.`;
    const CreatedDate = getCurrentDateTime();

    temp = await claimTabHistoryListInsurance.validateTypeOnHistoryList(EventLogs, 1);
    logFailTestcase(temp);
    temp = await claimTabHistoryListInsurance.validateDescriptionOnHistoryList(EventDescription, 1);
    logFailTestcase(temp);
    temp = await claimTabHistoryListInsurance.validateTimestampOnHistoryList(CreatedDate, 1);
    logFailTestcase(temp);
    temp = await claimTabHistoryListInsurance.validateUpdatedByOnHistoryList(UpdatedBy, 1);
    logFailTestcase(temp);
});