import { Before, Then, When } from "@cucumber/cucumber";
import { CaseList } from "../../../../page-objects/back-office-portal/general/case/case-list/CaseList";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { FirstNoticeOfLossForm } from "../../../../page-objects/back-office-portal/insurance/first-notice-of-loss/FirstNoticeOfLossForm";
import { FirstNoticeOfLossList } from "../../../../page-objects/back-office-portal/insurance/first-notice-of-loss/FirstNoticeOfLossList";
import { ValidateField } from '../../../../shared/classes';
import { convertPathFileDataToDataRegression, logFailMessage, logFailTestcase, logInfoMessage, logSuccessMessage, logWarningMessage } from '../../../../shared/functions';
import { ICommonContext } from "../../../../shared/interfaces";
import { dataTestcase, scenarioName } from '../../../../shared/variables';


const loader = require("csv-load-sync");
let firstNoticeOfLossForm: FirstNoticeOfLossForm;
let firstNoticeOfLossList: FirstNoticeOfLossList;
let globalPageObject: GlobalPageObject;
let fileDataCreate: string = "";
let caseList: CaseList;

Before(async function () {
    const context: ICommonContext = this.context;
    firstNoticeOfLossForm = new FirstNoticeOfLossForm(context.driverService);
    firstNoticeOfLossList = new FirstNoticeOfLossList(context.driverService);
    caseList = new CaseList(context.driverService);
    globalPageObject = new GlobalPageObject(context.driverService);
});

When(
    "User inputs invalid FNOL data from csv file {string}",
    async function (filename) {
        const rows = loader(convertPathFileDataToDataRegression(filename));
        fileDataCreate = filename;
        for (let i = 0; i < rows.length; i++) {
            let temp = await caseList.pressCreate();
            // logFailTestcase(temp, "Can't open Create new case form!");
            const CaseTitle = rows[i].CaseTitle;
            const Workflow = rows[i].Workflow;
            const CaseType = rows[i].CaseType;
            const SelectEntityType = rows[i].SelectEntityType;
            const SearchEntity = rows[i].SearchEntity;
            const Description = rows[i].Description;
            const DueDate = rows[i].DueDate;
            const Queue = rows[i].Queue;
            const Priority = rows[i].Priority;
            let validationField = new ValidateField(CaseTitle, i, true, [], []);

            const AssignedTo = rows[i].Assignedto;

            if (CaseTitle) {
                temp = await firstNoticeOfLossForm.inputCaseTitleOnCaseForm(CaseTitle);
                logFailTestcase(temp, "Input case title On case form failed!");
            }
            if (Workflow) {
                temp = await firstNoticeOfLossForm.inputWorkFlowOnCaseForm(Workflow);
                logFailTestcase(temp, "Input workflow on case form failed!");
            }
            if (CaseType) {
                temp = await firstNoticeOfLossForm.inputCaseTypeOnCaseForm(CaseType);
                logFailTestcase(temp, "Input case type on case form failed!");
            }
            if (SelectEntityType) {
                temp = await firstNoticeOfLossForm.inputSelectEntityTypeOnCaseForm(SelectEntityType);
                logFailTestcase(temp, "Input select entity type on case form failed!");
                if (SearchEntity) {
                    temp = await firstNoticeOfLossForm.inputSearchEntityOnCaseForm(SearchEntity);
                    logFailTestcase(temp, "Input search entity on case form failed!");
                }
            }

            if (Description) {
                temp = await firstNoticeOfLossForm.inputDescriptionOnCaseForm(Description);
                logFailTestcase(temp, "Input description on case form failed!");
            }
            if (DueDate) {
                temp = await firstNoticeOfLossForm.inputDueDateOnCaseForm(DueDate);
                logFailTestcase(temp, "Input due date on case form failed!");
            }
            if (Queue) {
                temp = await firstNoticeOfLossForm.inputQueueOnCaseForm(Queue);
                logFailTestcase(temp, "Input queue On case form failed!");
                if (AssignedTo) {
                    temp = await firstNoticeOfLossForm.inputAssignedToOnCaseForm(AssignedTo);
                    logFailTestcase(temp, "Input Assigned to case form failed!");
                }
            }
            if (Priority) {
                temp = await firstNoticeOfLossForm.inputPriorityOnCaseForm(Priority);
                logFailTestcase(temp, "Input priority on case form failed!");
            }

            if (DueDate) {
                //validate Due Date
                temp = await firstNoticeOfLossForm.validateDueDateValueOnCaseForm(DueDate);
                logFailTestcase(temp, "Due date shows incorrectly !");
            }

            temp = await globalPageObject.pressSaveForm();
            validationField = await firstNoticeOfLossForm.validateFields(validationField);
            if (!validationField.status) {
                await globalPageObject.pressCancelForm();
            }
            dataTestcase.push(validationField);
        }
    }
);

Then("System shows error notifications fields FNOL", async function () {
    const rows = loader(convertPathFileDataToDataRegression(fileDataCreate));
    let len = rows.length;
    let countError = 0;

    for (let i = 0; i < len; i++) {
        const casetitle = rows[i].CaseTitle;

        console.log(`\nChecking case at Line ${i + 1} at file CSV - ${casetitle} :`);

        if (dataTestcase[i].message.length === 0 && dataTestcase[i].toastMessage.length === 0) {
            countError++;
            logWarningMessage(`\nWe didn't get any error validation messages at Case form!`);
            logFailMessage(`\n\tLine ${i + 1} is failed!`);
        }
        else {
            logInfoMessage(`\nError validation messages on Case form are:`);
            for (const record of dataTestcase[i].message) {
                logFailMessage("\t" + record);
            }
            for (const record of dataTestcase[i].toastMessage) {
                logFailMessage("\t" + record);
            }
            logSuccessMessage(`\n\tLine ${i + 1} is passed!`);
        }
    }


    if (countError > 0) {
        logFailTestcase(false);
    }
    else {
        logSuccessMessage(scenarioName + "\n\tStep: System shows error notifications fields Case: is passed!");
    }

});

Then("System does not show new FNOL in the FNOL list {string}", async function (filename: string) {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    for (const row of rows) {
        const CaseTitle = row.CaseTitle
        const temp = await caseList.checkCaseWithNameNotExisted(CaseTitle);
        logFailTestcase(temp, `Case "${CaseTitle}" is found at Case list!`);
    }
});

When("User updates invalid FNOL data from csv file {string}", async function (filename) {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    fileDataCreate = filename;
    for (let i = 0; i < rows.length; i++) {
        const selectedCase = rows[i].SelectedCase;
        let temp1 = (await firstNoticeOfLossList.openEditCaseFormByName(selectedCase));
        await globalPageObject.waitForProgressBarLoaded_v2();
        logFailTestcase(temp1 > 0, " open edit FNOL form failed !");

        const CaseTitle = rows[i].CaseTitle;
        const CaseType = rows[i].CaseType;
        const SelectEntityType = rows[i].SelectEntityType;
        const SearchEntity = rows[i].SearchEntity;
        const Description = rows[i].Description;
        const DueDate = rows[i].DueDate;
        const Queue = rows[i].Queue;
        const Priority = rows[i].Priority;
        let validationField = new ValidateField(CaseTitle, i, true, [], []);

        const AssignedTo = rows[i].Assignedto;


        let temp = true;
        temp = await firstNoticeOfLossForm.clearOldDataOfCaseTitleOnEditCaseForm();
        logFailTestcase(temp, "clear Old Data Of Case Title Failed !");
        if (CaseTitle) {
            temp = await firstNoticeOfLossForm.inputCaseTitleOnCaseForm(CaseTitle);
            logFailTestcase(temp, "Input Case Title failed !");
        }

        // temp = await firstNoticeOfLossForm.clearOldDataOfWorkflowOnEditCaseForm();
        // logFailTestcase(temp, "clear Old Data Of Workflow Failed !");

        // temp = await firstNoticeOfLossForm.clearOldDataOfCaseTypeOnEditCaseForm();
        // logFailTestcase(temp, "clear Old Data Of Case Type Failed !");
        if (CaseType) {
            temp = await firstNoticeOfLossForm.inputCaseTypeOnCaseForm(CaseType);
            logFailTestcase(temp, "Input Case Type failed !");
        }

        // temp = await firstNoticeOfLossForm.clearOldDataOfRelatedRecordsOnEditCaseForm();
        // logFailTestcase(temp, "clear Old Data Of Related Records Failed !");
        if (SelectEntityType) {
            temp = await firstNoticeOfLossForm.inputSelectEntityTypeOnCaseForm(SelectEntityType);
            logFailTestcase(temp, "Input Select Entity Type failed !");

            if (SearchEntity) {
                temp = await firstNoticeOfLossForm.inputSearchEntityOnCaseForm(SearchEntity);
                logFailTestcase(temp, "Input Search Entity failed !");
            }
        }

        if (Description) {
            temp = await firstNoticeOfLossForm.inputDescriptionOnCaseForm(Description);
            logFailTestcase(temp, "Input Description failed !");
        }

        if (DueDate) {
            temp = await firstNoticeOfLossForm.inputDueDateOnCaseForm(DueDate);
            logFailTestcase(temp, "Input DueDate failed !");
        }

        // temp = await firstNoticeOfLossForm.clearOldDataOfQueueOnEditCaseForm();
        // logFailTestcase(temp, "clear Old Data Of Queue Failed !");
        if (Queue) {
            temp = await firstNoticeOfLossForm.inputQueueOnCaseForm(Queue);
            logFailTestcase(temp, "Input Queue failed !");
            temp = await firstNoticeOfLossForm.clearOldDataOfAssignedToOnEditCaseForm();
            logFailTestcase(temp, "clear Old Data Of Assigned To Failed !");
            if (AssignedTo) {
                temp = await firstNoticeOfLossForm.inputAssignedToOnCaseForm(AssignedTo);
                logFailTestcase(temp, "Input Assigned to failed !");
            }
        }

        temp = await firstNoticeOfLossForm.clearOldDataOfPriorityOnEditCaseForm();
        logFailTestcase(temp, "clear Old Data Of Priority Failed !");
        if (Priority) {
            temp = await firstNoticeOfLossForm.inputPriorityOnCaseForm(Priority);
            logFailTestcase(temp, "Input Priority failed !");
        }

        if (DueDate) {
            //validate Due Date
            temp = await firstNoticeOfLossForm.validateDueDateValueOnCaseForm(DueDate);
            logFailTestcase(temp, "Due date shows incorrectly !");
        }

        await globalPageObject.pressSaveForm();

        validationField = await firstNoticeOfLossForm.validateFields(validationField);
        if (!validationField.status) {
            temp = await globalPageObject.pressCancelForm();
            logFailTestcase(temp, "Can't press Cancle case form!");
        }
        dataTestcase.push(validationField);

    }
}
);

