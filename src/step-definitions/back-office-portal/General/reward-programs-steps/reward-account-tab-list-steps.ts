import { Given, Then, When } from "@cucumber/cucumber";
import { MappingPage } from "../../../../core/MappingPage";
import { DataRepo } from "../../../../core/modals/DataRepo";
import { SeleniumWebDriverService } from "../../../../core/selenium-webdriver.service";
import { PageFactory } from "../../../../page-objects/PageFactory";
import { convertPathFileDataToDataRegression, getCurrentDateTime, getDate, logFailMessage, logFailTestcase } from "../../../../shared/functions";
import { currencyToNumber, numberToCurrency } from "../../../../shared/tenant-setting/tenant-setting";
import { getValueDataOfDataTestExecution, pushObjectToDataArrayWithUniqueKey } from "../../../../storage-data/functions/data-test-execution";

const PageList = PageFactory.getInstance().createAccountTabRewardsListPage();
const PageGlobal = PageFactory.getInstance().createGlobalPageObjectPage();
const PageSummaryWidget = PageFactory.getInstance().createAppEntityWidgetsPage();
// Before(async function () {
//     const context: ICommonContext = this.context;
//   });

const loader = require("csv-load-sync");
let pointsBalance = 0;
Given(`User is on Rewards tab`, async () => {
    let temp = await PageList.navigateToRewardTab();
    logFailTestcase(temp, 'User navigate to Rewards tab failed!');
    await PageGlobal.waitForProgressBarLoaded_v2(2000);

});
Given(`User gets Points Balance on Rewards tab`, async () => {
    let temp = await PageList.navigateToRewardTab();
    logFailTestcase(temp, 'User navigate to Rewards tab failed!');
    await PageGlobal.waitForProgressBarLoaded_v2(2000);
    pointsBalance = currencyToNumber(await PageList.getPointsBalance());
    console.log(`Points Balance: ` + pointsBalance);
});

When(`User verifies Rewards tab is {string} on Account details`, async (status) => {
    let temp = true;

    if (status.localeCompare("visible") === 0) {
        temp = await PageList.navigateToRewardTab();
        logFailTestcase(temp, `navigate to reward tab failed!`);

        await PageGlobal.waitForProgressBarLoaded_v2();

        temp = await PageList.validateRewardTabIsVisible();
        logFailTestcase(temp, `validate Reward Tab Is Visible failed!`);

    } else if (status.localeCompare("invisible") === 0) {
        temp = await PageList.validateRewardTabIsInvisible();
        logFailTestcase(temp, `validate Reward Tab Is Invisible failed!`);
    } else {
        logFailMessage(`Can not understand '${status}' with Rewards tab!`)
    }
});

Then("User verifies that Reward records information is correct in the Rewards tab {string}", async (filename) => {
    let rows = await DataRepo.getInstance().loadData(filename);
    if (filename.includes("json")) {
        rows = rows[0].Rewards;
    }
    await PageGlobal.waitForProgressBarLoaded_v2();
    await PageGlobal.waitForProgressBarLoaded_v2();
    await PageGlobal.waitForProgressBarLoaded_v2()
    for (let i = 0; i < rows.length; i++) {
        let policyid = "";
        let RewardName = rows[i].RewardName || rows[i].EventType;
        let AwardedDate = getDate();
        let Point = rows[i].Point;
        let Comments = rows[i].Comments;

        if (rows[i].EventType) {
            policyid = "N/A";
        } else {
            policyid = getValueDataOfDataTestExecution("QuoteReference");
        }

        if (rows[i].TransactionType && rows[i].TransactionType.localeCompare(`Deduction`) === 0) {
            Point = "-" + Point;
        } else { Point = "+" + Point; }

        for (let j = 0; j < rows.length; j++) {
            if(await PageList.validatePolicyID(policyid, j) &&
            await PageList.validateRewardName(RewardName, j) &&
            await PageList.validateAwardedDate(AwardedDate, j) &&
            await PageList.validatePoints(Point, j) &&
            await PageList.validateComments(Comments || "N/A", j)
            ){
                break;
            }else{
                if (j == rows.length - 1){
                    logFailTestcase(false, 'validate Reward records information failed!');
                }
            }
        }

    }

});

Then(`User verifies Points Balance is calculated correctly {string}`, async (filename) => {
    //precondition step "User gets Points Balance on Rewards tab" is used before adding or deduction points
    const row = loader(convertPathFileDataToDataRegression(filename));
    for (let i = 0; i < row.length; i++) {
        let Point = parseFloat(row[i].Point);
        if (row[i].TransactionType && row[i].TransactionType.localeCompare(`Deduction`) === 0) {
            pointsBalance = pointsBalance - Point;
        } else pointsBalance = pointsBalance + Point;
    }
    // for (let i = 1; i <= await PageGlobal.getNumberOfTotalRecordsSubTab(); i++) {
    //     pointsBalance = pointsBalance + await PageList.getPointsByRow(i);
    // }

    let temp = await PageList.validatePointsBalance(numberToCurrency(pointsBalance));
    logFailTestcase(temp, `Incorrect Points Balance`);
});

Then(`User verifies Manual Points button is visible on Account Rewards tab`, async () => {
    await PageGlobal.waitForProgressBarLoaded_v2();
    let temp = await PageList.validateMannualPointsButtonVisible(true);
    logFailTestcase(temp, `verifies Manual Points button is visible failed!`);
});

Then(`User verifies Manual Points button is invisible on Account Rewards tab`, async () => {
    await PageGlobal.waitForProgressBarLoaded_v2();
    let temp = await PageList.validateMannualPointsButtonVisible(false);
    logFailTestcase(temp, `verifies Manual Points button is invisible failed!`);
});

Then(`User stores {string} rows of reward data to DataExecution`, async (NumberOfRows) => {
    //#precondition steps : User is on Rewards tab
    let rows = parseInt(NumberOfRows);
    for (let i = 0; i < rows; i++) {
        pushObjectToDataArrayWithUniqueKey(`policyIDReward_row${i + 1}`, await PageList.getPolicyID(i));
        pushObjectToDataArrayWithUniqueKey(`rewardNameReward_row${i + 1}`, await PageList.getRewardName(i));
        pushObjectToDataArrayWithUniqueKey(`pointReward_row${i + 1}`, await PageList.getPoints(i));
    }
    pushObjectToDataArrayWithUniqueKey(`pointsBalance`, await PageList.getPointsBalance());

});

Then(`System shows correct {string} rows of reward data on Rewards widget`, async (NumberOfRows) => {
    //#precondition steps : User stores {string} rows of reward data to DataExecution
    // NumberOfRows <=3 
    let rows = parseInt(NumberOfRows);
    for (let i = 1; i <= rows; i++) {
        let policyId = getValueDataOfDataTestExecution(`policyIDReward_row${i}`);
        let reference = policyId.includes("N/A") ? "" : policyId;
        let rewardName = getValueDataOfDataTestExecution(`rewardNameReward_row${i}`);
        if (rewardName.localeCompare("Manual") == 0 || rewardName.localeCompare("Pre-check Cabin") == 0 || rewardName.localeCompare("Transfer") == 0 || rewardName.localeCompare("Referral") == 0) {
            rewardName = "";
        }
        let points = getValueDataOfDataTestExecution(`pointReward_row${i}`);

        let temp = await PageSummaryWidget.validateReferenceOnRewardsWidgets(reference, i);
        logFailTestcase(temp, `Incorrect reference at row ${i}`);

        temp = await PageSummaryWidget.validateRewardNameOnRewardsWidgets(rewardName, i)
        logFailTestcase(temp, `Incorrect rewardName at row ${i}`);

        temp = await PageSummaryWidget.validatePointOnRewardsWidgets(points, i)
        logFailTestcase(temp, `Incorrect points at row ${i}`);
    }
    let temp = await PageSummaryWidget.validatePointsBalanceOnRewardsWidgets(getValueDataOfDataTestExecution(`pointsBalance`));
    logFailTestcase(temp, `Incorrect points balance`);
});

When(`User adds Reward widget to Customer Summary layout`, async () => {
    let temp = await PageGlobal.navigateToSubSummary();
    logFailTestcase(temp);
    await PageGlobal.waitForProgressBarLoaded_v2();
    temp = await PageSummaryWidget.editCurrentView();
    logFailTestcase(temp);
    await PageGlobal.waitForProgressBarLoaded_v2();
    temp = await PageSummaryWidget.holdOnWidgetAndDragToSummaryLayout("Rewards");
    logFailTestcase(temp);

    temp = await PageGlobal.pressSaveTab();
    await PageGlobal.waitForProgressBarLoaded();
    await PageGlobal.waitForProgressBarLoaded_v2();
});
Then(`User verifies Rewards widget is {string} on the Customer Summary layout`, async (existedOrNot) => {
    if (existedOrNot.localeCompare(`existed`) == 0) {
        let temp = await PageSummaryWidget.assertRewardWidgetIsExistOrNot(true);
        logFailTestcase(temp, `Reward Widget is not exist on the Customer Summary layout!`);
    } else if (existedOrNot.localeCompare(`not exist`) == 0) {
        let temp = await PageSummaryWidget.assertRewardWidgetIsExistOrNot(false);
        logFailTestcase(temp, `Reward Widget is not exist on the Customer Summary layout!`);
    } else {
        logFailTestcase(false, `Can not understand '${existedOrNot}'!`);
    }
});

Then(`User removes all Rewards widget from the Customer Summary layout`, async () => {
    let temp = await PageGlobal.navigateToSubSummary();
    logFailTestcase(temp);
    await PageGlobal.waitForProgressBarLoaded_v2();
    temp = await PageSummaryWidget.editCurrentView();
    logFailTestcase(temp);
    await PageGlobal.waitForProgressBarLoaded_v2();
    temp = await PageSummaryWidget.removeRewardsWidgetFromSummaryLayout();
    logFailTestcase(temp);
    temp = await PageGlobal.pressSaveTab();
    await PageGlobal.waitForProgressBarLoaded();
    await PageGlobal.waitForProgressBarLoaded_v2();
});

When(`User verifies points balance at Rewards tab in entity details`, async () => {
    const pointsBalance = getValueDataOfDataTestExecution("PointsBalance");
    let temp = await PageList.validatePointsBalance(numberToCurrency(pointsBalance));
    logFailTestcase(temp, `Incorrect Point balance`);
});