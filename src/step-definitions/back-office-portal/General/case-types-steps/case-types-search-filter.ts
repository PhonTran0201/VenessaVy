import { Before, When } from "@cucumber/cucumber";
import { DataRepo } from "../../../../core/modals/DataRepo";
import { CaseTypesList } from "../../../../page-objects/back-office-portal/general/case-types/case-types-list/CaseTypesList";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { logFailTestcase } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { CaseTypesSearchFilter } from './../../../../page-objects/back-office-portal/general/case-types/case-types-search-filter/CaseTypesSearchFilter';

let globalPageObject: GlobalPageObject;
let caseTypesList: CaseTypesList
let caseTypesSearchFilter: CaseTypesSearchFilter

Before(async function () {
    const context: ICommonContext = this.context;
    globalPageObject = new GlobalPageObject(context.driverService);
    caseTypesList = new CaseTypesList(context.driverService)
    caseTypesSearchFilter = new CaseTypesSearchFilter(context.driverService)
});

When("User searches case type using {string} with search parameter {string}", async (dataKey, searchParam) => {
    let temp = await caseTypesSearchFilter.clickButtonClear();
    await globalPageObject.waitForProgressBarLoaded_v2();
    logFailTestcase(temp, "Failed to clear case type search filter parameters")
    let data = (await DataRepo.getInstance().loadData(dataKey))[0]
    if (searchParam === "CaseTypeName" || searchParam === "CaseTypeCode" ||
        searchParam === "Workflow" || searchParam === "Queue") {
        temp = await caseTypesSearchFilter.setInputSearchFilter(searchParam, data[searchParam])
        logFailTestcase(temp, "Failed to input case type on search filter")

    } else if (searchParam === "All") {
        temp = await caseTypesSearchFilter.setInputFilterCaseTypeName(data.CaseTypeName)
        logFailTestcase(temp, "Failed to input case type name")
        temp = await caseTypesSearchFilter.setInputFilterCaseTypeCode(data.CaseTypeCode)
        logFailTestcase(temp, "Failed to input case type code")
        temp = await caseTypesSearchFilter.setNgselectSelectWorkflow(data.Workflow)
        logFailTestcase(temp, "Failed to input workflow")
        temp = await caseTypesSearchFilter.setNgselectSelectQueue(data.Queue)
        logFailTestcase(temp, "Failed to input queue")
    } else {
        logFailTestcase(false, `Failed to search case types using ${dataKey} with search parameter ${searchParam}`)
    }
    temp = await caseTypesSearchFilter.clickButtonSearch()
    logFailTestcase(temp, "Failed to click search button")
})



When("System shows correct data on case types list {string} with field {string}", async (dataKey, searchParam) => {
    let data = (await DataRepo.getInstance().loadData(dataKey))[0]
    let searchRecord = await caseTypesList.getTotalRecords()
    if (searchRecord > 10) {
        searchRecord = 10
    }
    if (searchRecord == 0) {
        logFailTestcase(false, "There's no record matching specified search params")
    }
    for (let i = 1; i <= searchRecord; i++) {
        let temp = await caseTypesList.validateValueAtCaseTypesList(searchParam, data[searchParam], i, true)
        logFailTestcase(temp, `Failed to validate ${searchParam}`)
    }
})