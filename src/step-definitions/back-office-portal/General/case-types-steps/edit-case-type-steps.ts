import { CaseTypeForm } from './../../../../page-objects/back-office-portal/general/case-types/case-types-form/CaseTypeForm';

import { Before, When } from "@cucumber/cucumber";
import { DataRepo } from '../../../../core/modals/DataRepo';
import { CaseTypesList } from "../../../../page-objects/back-office-portal/general/case-types/case-types-list/CaseTypesList";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { logFailTestcase } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";


let globalPageObject: GlobalPageObject;
let caseTypesList: CaseTypesList
let caseTypeForm: CaseTypeForm

Before(async function () {
    const context: ICommonContext = this.context;
    globalPageObject = new GlobalPageObject(context.driverService);
    caseTypesList = new CaseTypesList(context.driverService)
    caseTypeForm = new CaseTypeForm(context.driverService)

});
When("User presses edit case type button", async function () {
    let temp = await caseTypesList.clickButtonEditCaseType()
    logFailTestcase(temp, "Failed to click edit case type button")
})

When("User presses delete case type button", async function () {
    await globalPageObject.waitForProgressBarLoaded_v2();
    let temp = await caseTypesList.clickButtonDeleteCaseType()
    logFailTestcase(temp, "Failed to click delete case type");
})


When("User fills data on the edit case type form {string}", async (dataKey) => {
    const data = await DataRepo.getInstance().loadData(dataKey);
    let temp = await caseTypeForm.setInputCaseTypeName(data.CaseTypeName)
    logFailTestcase(temp, "Failed to input case type name")
    temp = await caseTypeForm.setNgselectSelectWorkflow(data.Workflow)
    logFailTestcase(temp, "Failed to input workflow")
    temp = await caseTypeForm.setNgselectSelectQueue(data.Queue)
    logFailTestcase(temp, "Failed to input queue")
    temp = await caseTypeForm.clickButtonSave()
    logFailTestcase(temp, "Failed to click button save")
})



