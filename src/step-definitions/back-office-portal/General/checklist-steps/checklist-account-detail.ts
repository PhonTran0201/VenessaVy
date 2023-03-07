import { Given, Then, When } from "@cucumber/cucumber";
import { filename } from "winston-daily-rotate-file";
import { PageFactory } from "../../../../page-objects/PageFactory";
import { convertPathFileDataToDataRegression, getDate, logFailMessage, logFailTestcase, logInfoMessage, logSuccessMessage } from "../../../../shared/functions";
import { getValueDataOfDataTestExecution, pushObjectToDataArrayWithUniqueKey } from "../../../../storage-data/functions/data-test-execution";

const PageGlobal = PageFactory.getInstance().createGlobalPageObjectPage();
const PageList = PageFactory.getInstance().createAccountTabCheckListListPage();
const PageForm = PageFactory.getInstance().createAccountTabCheckListFormPage();
const PageGlobalSort = PageFactory.getInstance().createGlobalSortTablePage();
const PageGlobalPagination = PageFactory.getInstance().createGlobalPaginationPage();
const AppEntityWidgetsPage = PageFactory.getInstance().createAppEntityWidgetsPage();


let indexRowBOP = 0
const loader = require("csv-load-sync");
Given(`User is on Checklist tab`, async () => {
    let temp = await PageGlobal.navigateToSubChecklists();
    logFailTestcase(temp, "Navigate to Checklist tab failed!");

    pushObjectToDataArrayWithUniqueKey("IDAccount", await PageList.getIDofTheAccount());
});
When(`User sorts up Deadline column`, async () => {
    await PageList.sortUpDeadlineColumn();
});

When(`User sorts down Deadline column`, async () => {
    await PageList.sortDownDeadlineColumn();
});

Then(`User verifies correct information on Checklists list from account detail page {string}`, async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    let temp = true;
    for (let i = 0; i < rows.length; i++) {
        const Name = rows[i].Name;
        const InsuredObject = rows[i].InsuredObject;
        const DeadlineMinusToday = rows[i].DeadlineMinusToday;
        let Status = rows[i].Status;
        const IsSearchFound = rows[i].IsSearchFound;
        let Deadline = "";
        if (DeadlineMinusToday) {
            Deadline = getDate(DeadlineMinusToday);
        }

        if (Status.localeCompare(`On-going`) === 0) {
            Status = "Ongoing";
        }
        await PageGlobal.reloadTable();
        temp = await PageList.searchChecklistByValue(InsuredObject);
        logFailTestcase(temp, "search Checklist By Insured Object failed!");


        if (IsSearchFound.localeCompare(`No`) === 0) {
            // temp = await PageList.validateSearchingChecklistByInsuredObjectNotFound();
            // logFailTestcase(temp, `validate Searching Checklist is Not Found By Insured Object faield!`)
            let TotalRecord = await PageGlobal.getNumberOfTotalRecordsSubTab();
            if (TotalRecord != 0) {
                logFailTestcase(false, `checklist still shown on the list!`);
            }
        }
        else {
            let TotalRecord = await PageGlobal.getNumberOfTotalRecordsSubTab();
            if (TotalRecord == 0) {
                logFailTestcase(false, `checklist is not shown on the list!`);
            }
            for (let j = 1; j <= 10; j++) {

                if (await PageList.validateValue(Status, j) && await PageList.validateNameValue(Name, j) && await PageList.validateValue(Deadline, j)) {

                    indexRowBOP = j
                    if (InsuredObject) {
                        temp = await PageList.validateValue(InsuredObject, j);
                        logFailTestcase(temp, "Validate InsuredObject value on list failed!");
                    }
                    break;
                } else {
                    if (j == 10) {
                        logFailTestcase(false, `checklist is not shown on the list!`);
                    }
                }

            }
        }
    }
});

Then(`User verifies the Checklist is shown correctly on account detail page - DataTestExecution {string}`, async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    let temp = true;
    for (let i = 0; i < rows.length; i++) {
        const Name = getValueDataOfDataTestExecution("ChecklistName");
        const InsuredObject = rows[i].InsuredObject;
        let Status = rows[i].Status;
        const IsSearchFound = rows[i].IsSearchFound;
        let Deadline = getValueDataOfDataTestExecution("ChecklistDeadline");

        if (Status.localeCompare(`On-going`) === 0) {
            Status = "Ongoing";
        }
        await PageGlobal.reloadTable();
        temp = await PageList.searchChecklistByValue(InsuredObject);
        logFailTestcase(temp, "search Checklist By Insured Object failed!");


        if (IsSearchFound.localeCompare(`No`) === 0) {
            // temp = await PageList.validateSearchingChecklistByInsuredObjectNotFound();
            // logFailTestcase(temp, `validate Searching Checklist is Not Found By Insured Object faield!`)
            let TotalRecord = await PageGlobal.getNumberOfTotalRecordsSubTab();
            if (TotalRecord != 0) {
                logFailTestcase(temp, `checklist still shown on the list!`);
            }
        } else {
            for (let j = 1; j <= 10; j++) {

                if (await PageList.validateValue(Status, j) && await PageList.validateNameValue(Name, j) && await PageList.validateValue(Deadline, j)) {

                    indexRowBOP = j
                    if (InsuredObject) {
                        temp = await PageList.validateValue(InsuredObject, j);
                        logFailTestcase(temp, "Validate InsuredObject value on list failed!");
                    }
                    break;
                }

                if (j == 10) {
                    logFailTestcase(false, `Can not find this checklist on the list!`);
                }

            }
        }
    }
});

Then("User checks sorting at column Deadline on Checklists list at Account detail", async () => {
    let totalNumberOfRecords = await PageGlobal.getNumberOfTotalRecordsSubTab();
    let numberItemPage = parseInt(await PageGlobalPagination.getCurrentSelectingItemPageNumberAtSubList()) || 10;
    let count = totalNumberOfRecords >= numberItemPage ? numberItemPage : totalNumberOfRecords;

    logInfoMessage("Checking sort up...");
    let temp = await PageGlobalSort.pressSortUpColumnAtSubList("Deadline");
    logFailTestcase(temp, `Press sort up at column "Deadline" failed!`);

    let arrayDeadline: string[] = [];
    for (let i = 1; i <= count; i++) {
        let Deadline = await PageList.getDeadlineValueByRow(i);
        arrayDeadline.push(Deadline === "N/A" ? "" : Deadline);
    }

    temp = await PageGlobalSort.isColumnDateSortingUp(arrayDeadline);
    logFailTestcase(temp, `Sort Up at column "Deadline" failed!`);


    logInfoMessage("Checking sort down...");
    arrayDeadline = [];
    temp = await PageGlobalSort.pressSortDownColumnAtSubList("Deadline");
    logFailTestcase(temp, `Press sort down at column "Deadline" failed!`);
    for (let i = 1; i <= count; i++) {
        arrayDeadline.push(await PageList.getDeadlineValueByRow(i));
    }
    temp = await PageGlobalSort.isColumnDateSortingDown(arrayDeadline);
    logFailTestcase(temp, `Sort down at column "Deadline" failed!`);
});

Then("User verifies function search box by Insured Object on Checklists list at Account detail {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    let temp = true;
    for (let i = 0; i < rows.length; i++) {
        const Name = rows[i].Name;
        const InsuredObject = rows[i].InsuredObject;
        const DeadlineMinusToday = rows[i].DeadlineMinusToday;
        const Status = rows[i].Status;
        const IsSearchFound = rows[i].IsSearchFound;
        let Deadline = rows[i].Deadline;
        if (DeadlineMinusToday) {
            Deadline = getDate(DeadlineMinusToday);
        }
        let TotalRecord = 0;
        temp = await PageList.searchChecklistByValue(InsuredObject);
        logFailTestcase(temp, "search Checklist By Insured Object failed!");

        if (IsSearchFound.toLowerCase().localeCompare(`no`) === 0) {
            // temp = await PageList.validateSearchingChecklistByInsuredObjectNotFound();
            // logFailTestcase(temp, `validate Searching Checklist is Not Found By Insured Object faield!`)
            TotalRecord = await PageGlobal.getNumberOfTotalRecordsSubTab();
            if (TotalRecord != 0) {
                logFailTestcase(temp, `checklist still shown on the list!`);
            }
        } else {
            if (Name) {
                temp = await PageList.validateNameValue(Name);
                logFailTestcase(temp, "Validate Name value on list failed!");
            }
            if (Deadline) {
                temp = await PageList.validateValue(Deadline);
                logFailTestcase(temp, "Validate Deadline value on list failed!");
            }
            if (InsuredObject) {
                temp = await PageList.validateValue(InsuredObject);
                logFailTestcase(temp, "Validate InsuredObject value on list failed!");
            }
            if (Status) {
                temp = await PageList.validateValue(Status);
                logFailTestcase(temp, "Validate Deadline value on list failed!");
            }
        }

        temp = await PageList.searchChecklistByValue(Name);
        logFailTestcase(temp, "check can not search Checklist By Name failed!");
        TotalRecord = await PageGlobal.getNumberOfTotalRecordsSubTab();
        if (TotalRecord != 0) {
            logFailTestcase(temp, `checklist still shown on the list!`);
        }

        temp = await PageList.searchChecklistByValue(Status);
        logFailTestcase(temp, "check can not search Checklist By Status failed!");
        TotalRecord = await PageGlobal.getNumberOfTotalRecordsSubTab();
        if (TotalRecord != 0) {
            logFailTestcase(temp, `checklist still shown on the list!`);
        }

        temp = await PageList.searchChecklistByValue(Deadline);
        logFailTestcase(temp, "check can not search Checklist By Deadline failed!");
        TotalRecord = await PageGlobal.getNumberOfTotalRecordsSubTab();
        if (TotalRecord != 0) {
            logFailTestcase(temp, `checklist still shown on the list!`);
        }
    }
});

Then(`User verifies Checklist tab is displayed correctly {string}`, async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    let temp = true;

    temp = await PageList.pressOpenDropdownConfigColumnButton();
    logFailTestcase(temp, `press Config Column failed!`);
    await PageGlobal.waitForSeconds(2000);

    for (let i = 0; i < rows.length; i++) {
        let ColumnName = rows[i].ColumnName;
        let IsChecked = rows[i].IsChecked;

        if (IsChecked.trim().localeCompare('Yes') === 0) {
            temp = await PageList.tickToConfigColumnByColumnName(ColumnName);
            logFailTestcase(temp, 'tick To Config Column By Column Name failed!');

            temp = await PageList.validateTitleColumnIsVisibleByColumnName(ColumnName);
            logFailTestcase(temp, 'validate Title Column Is Visible By Column Name failed!');
        } else {
            temp = await PageList.UnTickToConfigColumnByColumnName(ColumnName);
            logFailTestcase(temp, 'untick To Config Column By Column Name failed!');

            temp = await PageList.validateTitleColumnIsNotVisibleByColumnName(ColumnName);
            logFailTestcase(temp, 'validate Title Column Is  Not Visible By Column Name failed!');
        }
    }

    temp = await PageList.pressOpenDropdownConfigColumnButton();
    logFailTestcase(temp, `press Config Column failed!`);
});

Then(`Checklists tab is not found on the Account detail`, async () => {
    await PageGlobal.waitForSeconds(3000);
    let temp = await PageList.valiateChecklistTabIsNotVisible();
    logFailTestcase(temp, "Checklist Tab is still Visibled on the Account detail!");
});

When(`User selects the first checklist on the Account detail page`, async () => {
    let temp = await PageList.openChecklistFormByRow(indexRowBOP == 0 ? 1 : indexRowBOP);
    logFailTestcase(temp, "open Checklist Form at Row 1 failed!");
});

Then(`User verifies checklist details on account checklist detail form {string}`, async (filename) => {
    const row2 = loader(convertPathFileDataToDataRegression(filename));
    let temp = true;
    let Description = row2[0].Description;

    if (Description) {
        temp = await PageForm.validateChecklistDescription(Description);
        logFailTestcase(temp, "validate Checklist description failed!");
    }
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

});


Then("System shows the checklist in Checklists widget at Summary tab {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename))[0];
    const Name = rows.Name;
    const InsuredObject = rows.InsuredObject;
    const DeadlineMinusToday = rows.DeadlineMinusToday;
    let Status = rows.Status;
    let Deadline = "";
    if (DeadlineMinusToday) {
        Deadline = getDate(DeadlineMinusToday);
    }

    if (Status.localeCompare(`On-going`) === 0) {
        Status = "Ongoing";
    }

    let temp = true
    await PageGlobal.navigateToSubSummary();
    temp = await AppEntityWidgetsPage.refeshSummaryPage();
    logFailTestcase(temp, `refesh Summary Page failed!`);
    await PageGlobal.waitForProgressBarLoaded_v2();
    await PageGlobal.waitForProgressBarLoaded_v2();


    logInfoMessage("\tChecking checklist created on Checklist widget - Summary tab:");
    for (let i = 1; i <= 6; i++) {
        if (i == 6) {
            logFailTestcase(false, `Can not find this checklist on checklists widget: Name "${Name}" - Status "${Status}" - Deadline "${Deadline}"!`);
        }
        if (await AppEntityWidgetsPage.validateChecklistNameValue(Name, i) && await AppEntityWidgetsPage.validateStatusValue(Status, i) && await AppEntityWidgetsPage.validateDeadlineValue(Deadline, i)) {
            temp = await AppEntityWidgetsPage.validateInsuredObjectValue(InsuredObject, i);
            logFailTestcase(temp, "validate InsuredObject Value failed!");
            logSuccessMessage("=> Then - System shows checklist in checklists widget: is passed!");
            break;
        }
    }

});

Then("System does not show the expired checklist in Checklists widget at Summary tab {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename))[0];
    const Name = rows.Name;
    const InsuredObject = rows.InsuredObject;
    const DeadlineMinusToday = rows.DeadlineMinusToday;
    let Status = rows.Status;
    let Deadline = "";
    if (DeadlineMinusToday) {
        Deadline = getDate(DeadlineMinusToday);
    }

    if (Status.localeCompare(`On-going`) === 0) {
        Status = "Ongoing";
    }

    let temp = true
    await PageGlobal.navigateToSubSummary();
    temp = await AppEntityWidgetsPage.refeshSummaryPage();
    logFailTestcase(temp, `refesh Summary Page failed!`);

    for (let i = 1; i <= 5; i++) {

        if (await AppEntityWidgetsPage.validateChecklistNameValue(Name, i) && await AppEntityWidgetsPage.validateStatusValue("Expired", i) && await AppEntityWidgetsPage.validateDeadlineValue(Deadline, i)) {
            logFailTestcase(false, 'Checklist has "Expired" status is still shown on the wwidget!')
        }
    }
    logSuccessMessage("=> Then - System does not show checklist in checklists widget: is passed!");
});


When(`User clicks hyperlink to checklist Name {string}`, async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const Name = row.Name;
    for (let i = 1; i <= 6; i++) {
        if (i == 6) {
            logFailTestcase(false, `Can not find Checklist by Name '${Name}' on widget!`);
        } else if (await AppEntityWidgetsPage.validateChecklistNameValue(Name, i)) {
            let temp = await AppEntityWidgetsPage.selectChecklistName(Name, i);
            logFailTestcase(temp, `select Checklist by Name on widget failed!`);
            await PageGlobal.waitForSeconds(2000);
            break;
        }

    }
});

When(`User presses see more hyperlink to navigate to checklist tab`, async () => {
    let temp = await AppEntityWidgetsPage.pressSeeMoreChecklistWidget();
    logFailTestcase(temp, `press See More Checklist Widget failed!`)
});