import { Given, Then, When } from "@cucumber/cucumber";
import { PageFactory } from "../../../../page-objects/PageFactory";
import { convertPathFileDataToDataRegression, getDate, logFailTestcase, logInfoMessage } from "../../../../shared/functions";
import { formatDateTime } from "../../../../shared/tenant-setting/tenant-setting";

let PageList = PageFactory.getInstance().createRewardsChecklistListCPVarsam();
let PageForm = PageFactory.getInstance().createRewardsChecklistFormCPVarsam();
let PageGlobalCP = PageFactory.getInstance().createGlobalPageObjectCPVasamPage();
let PageGlobalPaginationCP = PageFactory.getInstance().createGlobalPaginationCPVarsamPage();
let PageGlobalSortCP = PageFactory.getInstance().createGlobalSortTableCPVasamPage();
let PageIntroduction = PageFactory.getInstance().createRewardsIntroductionCPVarsam();


let indexRowCP = 0;
const loader = require("csv-load-sync");


Given(`User presses {string} tab on Rewards menu Customer Portal`, async (tabName: string) => {
    let temp = true;
    await PageIntroduction.navigateToIntroductionTab();

    temp = await PageIntroduction.acceptTermsAndConditions();
    logFailTestcase(temp);

    if (tabName.localeCompare('Checklist') === 0) {
        temp = await PageList.navigateToChecklistTab();
        logFailTestcase(temp, `press checklist tab failed!`);
    }
    else if (tabName.localeCompare('Event log') === 0) {

    }
    else if (tabName.localeCompare('Introduction') === 0) {

    }
    else if (tabName.localeCompare('Household') === 0) {

    }
    else if (tabName.localeCompare('Photo Documentation') === 0) {

    }
    else {
        logFailTestcase(false, `can not find '${tabName}' !`);
    }
});

When(`User sorts up Deadline column checklist Customer Portal`, async()=>{
    await PageList.sortUpDeadlineColumn();
});

When(`User sorts down Deadline column checklist Customer Portal`, async()=>{
    await PageList.sortDownDeadlineColumn();
});

Then(`User verifies the checklist information on the list Customer Portal {string}`, async (filename: string) => {
    await PageList.reloadChecklistTable();
    let temp = true;
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const Name = row.Name;
    const Status = row.Status;
    const DeadlineMinusToday = row.DeadlineMinusToday;
    const InsuredObject = row.InsuredObject;
    let Deadline = "";
    if (DeadlineMinusToday) {
        Deadline = formatDateTime(getDate(DeadlineMinusToday));
    }

    for (let i = 1; i <= 10; i++) {
        if (await PageList.validateStatusChecklistValue(Status, i) && await PageList.validateNameChecklistValue(Name + " - " + InsuredObject, i)) {
            indexRowCP = i
            if (DeadlineMinusToday) {
                temp = await PageList.validateDeadlineChecklistValue(Deadline, i);
                logFailTestcase(temp, `validate Deadline Checklist Value failded!`)
            }
            break;
        }
    }
});


When(`User selects the first checklist on the list Customer Portal`, async () => {
    let positionRow = indexRowCP == 0 ? 1 : indexRowCP;
    let temp = await PageList.openChecklistFormByRow(positionRow);
    logFailTestcase(temp, `open Checklist Form at Row ${positionRow} failed!`);
    await PageGlobalCP.waitForSeconds(1000);
});

Then(`User verifies checklist details on pop-up Customer Portal {string}`, async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const Name = row.Name;
    const Description = row.Description;
    const ChecklistItemPath = row.ChecklistItemPath;
    let temp = true;
    if (Name) {
        temp = await PageForm.validateChecklistName(Name);
        logFailTestcase(temp);
    }
    if (Description) {
        temp = await PageForm.validateChecklistDescription(Description);
        logFailTestcase(temp);
    }
    if (ChecklistItemPath) {
        const row2 = loader(convertPathFileDataToDataRegression(ChecklistItemPath));
        for (let i = 0; i < row2.length; i++) {
            const ItemName = row2[i].ItemName;
            const IsChecked = row2[i].IsChecked;

            if (IsChecked.localeCompare('Yes') === 0) {
                temp = await PageForm.validateChecklistItemIsTicked(ItemName);
                logFailTestcase(temp);
            } else {
                temp = await PageForm.validateChecklistItemIsUnTicked(ItemName);
                logFailTestcase(temp);
            }
        }
    }
});

Then(`User ticks checklist items on pop-up Customer Portal {string}`, async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename));
    let temp = true;
    for (let i = 0; i < row.length; i++) {
        const ItemName = row[i].ItemName;
        const IsChecked = row[i].IsChecked;

        if (IsChecked.localeCompare('Yes') === 0) {
            temp = await PageForm.tickChecklistItemByName(ItemName);
            logFailTestcase(temp);
        } else {
            temp = await PageForm.UnTickChecklistItemByName(ItemName);
            logFailTestcase(temp);
        }
    }
});
Then(`User can not open the first checklist name on the list Customer Portal`, async () => {
    let temp = await PageList.validateDisablingWhenOpenChecklistFormByRow(indexRowCP);
    logFailTestcase(temp);
})


Then("User checks sorting at column Deadline on Checklists list at Customer Portal", async () => {
    let totalNumberOfRecords = await PageGlobalCP.getNumberOfTotalRecordsSubTab();
    let numberItemPage = parseInt(await PageGlobalPaginationCP.getCurrentSelectingItemPageNumberAtSubList()) || 10;
    let count = totalNumberOfRecords >= numberItemPage ? numberItemPage : totalNumberOfRecords;

    logInfoMessage("Checking sort up...");
    let temp = await PageGlobalSortCP.pressSortUpColumnAtMainList("Deadline by ");
    logFailTestcase(temp, `Press sort up at column "Deadline" failed!`);

    let arrayDeadline: string[] = [];
    for (let i = 1; i <= count; i++) {
        let Deadline = await PageList.getDeadlineChecklistValue(i);
        arrayDeadline.push(Deadline === "N/A" ? "" : Deadline);
    }

    temp = await PageGlobalSortCP.isColumnDateSortingUp(arrayDeadline);
    logFailTestcase(temp, `Sort Up at column "Deadline" failed!`);


    logInfoMessage("Checking sort down...");
    arrayDeadline = [];
    temp = await PageGlobalSortCP.pressSortDownColumnAtMainList("Deadline by ");
    logFailTestcase(temp, `Press sort down at column "Deadline" failed!`);
    for (let i = 1; i <= count; i++) {
        arrayDeadline.push(await PageList.getDeadlineChecklistValue(i));
    }
    temp = await PageGlobalSortCP.isColumnDateSortingDown(arrayDeadline);
    logFailTestcase(temp, `Sort down at column "Deadline" failed!`);
});