import { Before, Given, Then } from "@cucumber/cucumber";
import { AccountTabSummary } from "../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-summary/AccountTabSummary";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { Scoring } from "../../../../page-objects/back-office-portal/general/scoring/Scoring";
import { AccountTabHistoryListGuarantee } from "../../../../page-objects/back-office-portal/guarantee/account/account-details/tabs/account-history/AccountTabHistoryListGuarantee";
import { convertPathFileDataToDataRegression, getCurrentDateTime, logFailTestcase } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { UserProfileInfo } from "../../../../shared/user-profile/UserProfileInfo";

const loader = require("csv-load-sync");
let globalPageObject: GlobalPageObject;
let accountTabHistoryListGuarantee: AccountTabHistoryListGuarantee;
let scoring: Scoring;
let accountTabSummary: AccountTabSummary;

Before(async function () {
    const context: ICommonContext = this.context;
    globalPageObject = new GlobalPageObject(context.driverService);
    accountTabHistoryListGuarantee = new AccountTabHistoryListGuarantee(context.driverService);
    scoring = new Scoring(context.driverService);
    accountTabSummary = new AccountTabSummary(context.driverService);
});

Then("User verifies info on History Tab of the account detail {string}", async (filename) => {
    let temp = true;
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const UpdatedBy = UserProfileInfo.getDisplayName();

    await globalPageObject.navigateToSubHistory();
    await globalPageObject.reloadTable(3000);

    for (let i = 0; i < rows.length; i++) {
        const EventLogs = rows[i].EventLogs;
        const EventDescription = rows[i].EventDescription;
        const CreatedDate = getCurrentDateTime();

        for (let j = 1; j <= rows.length; j++) {

            if (await accountTabHistoryListGuarantee.validateTypeOnHistoryList(EventLogs, j)) {

                temp = await accountTabHistoryListGuarantee.validateDescriptionOnHistoryList(EventDescription, j);
                logFailTestcase(temp);

                temp = await accountTabHistoryListGuarantee.validateTimestampOnHistoryList(CreatedDate, j);
                logFailTestcase(temp);

                temp = await accountTabHistoryListGuarantee.validateUpdatedByOnHistoryList(UpdatedBy, j);
                logFailTestcase(temp);
                break;

            } else if (j == rows.length) {
                logFailTestcase(false, 'Cant not find the event on History Tab');
                break;
            }
        }
    }
});

Then("User verifies info on Scoring tab of the account detail {string}", async (filename) => {
    let temp = true;
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const CreditRateInput = row.CreditRateInput
    const EstablishedYearInput = row.EstablishedYearInput
    const EducationalLevelInput = row.EducationalLevelInput
    const GeographicalAreaInput = row.GeographicalAreaInput
    const PostcodePopulationInput = row.PostcodePopulationInput

    const CreditRateOutput = row.CreditRateOutput
    const EstablishedYearOutput = row.EstablishedYearOutput
    const EducationalLevelOutput = row.EducationalLevelOutput
    const GeographicalAreaOutput = row.GeographicalAreaOutput
    const PostcodePopulationOutput = row.PostcodePopulationOutput

    const FinalScore = row.FinalScore;



    temp = await globalPageObject.navigateToSubScoring();
    logFailTestcase(temp, `navigate to scoring tab failed!`);

    await globalPageObject.waitForSeconds(3000);

    temp = await scoring.validateinputCreditRateOnScoringSubTab(CreditRateInput);
    logFailTestcase(temp, 'Incorrect Credit Rate Input!');

    temp = await scoring.validateinputEstablishedYearOnScoringSubTab(EstablishedYearInput);
    logFailTestcase(temp, 'Incorrect Established Year Input!');

    temp = await scoring.validateinputEducationalLevelOnScoringSubTab(EducationalLevelInput);
    logFailTestcase(temp, 'Incorrect Educational Level Input!');

    temp = await scoring.validateinputGeographicalAreaOnScoringSubTab(GeographicalAreaInput);
    logFailTestcase(temp, 'Incorrect Geographical Area Input!');

    temp = await scoring.validateinputPostcodePopulationOnScoringSubTab(PostcodePopulationInput);
    logFailTestcase(temp, 'Incorrect Postcode Population Input!');


    //OUTPUT
    temp = await scoring.validateoutputCreditRateOnScoringSubTab(CreditRateOutput);
    logFailTestcase(temp, 'Incorrect Credit Rate Output!');

    temp = await scoring.validateoutputEstablishedYearOnScoringSubTab(EstablishedYearOutput);
    logFailTestcase(temp, 'Incorrect Established Year Output!');

    temp = await scoring.validateoutputEducationalLevelOnScoringSubTab(EducationalLevelOutput);
    logFailTestcase(temp, 'Incorrect Educational Level Output!');

    temp = await scoring.validateoutputGeographicalAreaOnScoringSubTab(GeographicalAreaOutput);
    logFailTestcase(temp, 'Incorrect Geographical Area Output!');

    temp = await scoring.validateoutputPostcodePopulationOnScoringSubTab(PostcodePopulationOutput);
    logFailTestcase(temp, 'Incorrect Postcode Population Output!');

    temp = await scoring.validateFinalScoreOnScoringSubTab(FinalScore);
    logFailTestcase(temp, 'Incorrect FinalScore!');

});

Given("User navigates to Summary", async () => {
    let temp = await globalPageObject.navigateToSubSummary();
    logFailTestcase(temp, "User navigates to Summary failed!");

    await globalPageObject.waitForProgressBarLoaded_v2();
    //reload summary widget
    temp = await accountTabSummary.pressRefreshLayoutButton();
    logFailTestcase(temp, "press Refresh Layout Button on summary tab failed!");

});
