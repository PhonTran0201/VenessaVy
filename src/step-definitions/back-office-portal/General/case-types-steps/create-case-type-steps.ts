import { CaseTypeForm } from './../../../../page-objects/back-office-portal/general/case-types/case-types-form/CaseTypeForm';

import { Before, Given, When } from "@cucumber/cucumber";
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
Given("User navigates to Case Management", async function () {
    let temp = await globalPageObject.navigateToMainModuleConfiguration();
    logFailTestcase(temp, "Failed to navigate to Module configuration");
    temp = await globalPageObject.selectDomainCardAtGlobalSetting("SEAMLESS FLOW")
    logFailTestcase(temp, "Failed to navigate to SEAMLESS FLOW")
    temp = await globalPageObject.pressSettingAtDomainDetailItemInDomainCard("Case Management")
    logFailTestcase(temp, "Failed to navigate to settings at Case Management")
});

When("User presses create a new case type", async () => {
    let temp = await caseTypesList.clickButtonCreateCaseType()
    logFailTestcase(temp, "Failed to press create new case type button")
})

When("User fills data on the create case type form {string}", async (dataKey) => {
    const data = await DataRepo.getInstance().loadData(dataKey);
    let temp = await caseTypeForm.setInputCaseTypeCode(data.CaseTypeCode)
    logFailTestcase(temp, "Failed to input case type code")
    temp = await caseTypeForm.setInputCaseTypeName(data.CaseTypeName)
    logFailTestcase(temp, "Failed to input case type name")
    temp = await caseTypeForm.setNgselectSelectWorkflow(data.Workflow)
    logFailTestcase(temp, "Failed to input workflow")
    temp = await caseTypeForm.setNgselectSelectQueue(data.Queue)
    logFailTestcase(temp, "Failed to input queue")
    temp = await caseTypeForm.clickButtonSave()
    logFailTestcase(temp, "Failed to click button save")
})



When("System shows new case type on case types list {string}", async (dataKey) => {
    let temp = await caseTypesList.clickButtonRefreshCaseTypesList()
    logFailTestcase(temp, "Failed to click refresh button")

    const data = await DataRepo.getInstance().loadData(dataKey);
    logFailTestcase(temp, "Failed to click button refresh case types list")

    temp = await caseTypesList.validateValueAtCaseTypesList("CaseTypeCode", data.CaseTypeCode)
    logFailTestcase(temp, "Failed to validate value Case Type Code")

    temp = await caseTypesList.validateValueAtCaseTypesList("CaseTypeName", data.CaseTypeName)
    logFailTestcase(temp, "Failed to validate value Case Type Name")

    temp = await caseTypesList.validateValueAtCaseTypesList("Workflow", data.Workflow)
    logFailTestcase(temp, "Failed to validate value Workflow Name")

    temp = await caseTypesList.validateValueAtCaseTypesList("Queue", data.Queue)
    logFailTestcase(temp, "Failed to validate value Queue")

})


