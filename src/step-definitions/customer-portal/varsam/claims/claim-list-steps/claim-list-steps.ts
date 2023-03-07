import { When } from "@cucumber/cucumber";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { GlobalPageObject } from "../../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { ClaimListCPVarsam } from "../../../../../page-objects/customer-portal/varsam/claims/claim-list/ClaimListCPVarsam";
import { GlobalPageObjectCPVasam } from "../../../../../page-objects/customer-portal/varsam/global-page-object/GlobalPageObjectCPVarsam";
import { GlobalPaginationCPVarsam } from "../../../../../page-objects/customer-portal/varsam/global-page-object/GlobalPaginationCPVarsam";
import { convertPathFileDataToDataRegression, logFailTestcase, logWarningMessage } from "../../../../../shared/functions";
import { scenarioTags } from "../../../../../shared/variables";
import { getValueDataOfDataTestExecution, pushObjectToDataArrayWithUniqueKey } from "../../../../../storage-data/functions/data-test-execution";
const loader = require('csv-load-sync');

When("User presses Register Claim button at Claim list on CustomerPortal", async () => {
    let claimListCPVarsam: ClaimListCPVarsam = new ClaimListCPVarsam();
    let globalPageObject: GlobalPageObject = new GlobalPageObject(SeleniumWebDriverService.getInstance());
    if (scenarioTags.has("@CustomerPortalVarsam")) {
        globalPageObject = new GlobalPageObjectCPVasam(SeleniumWebDriverService.getInstance());
    }
    const totalRecord = await globalPageObject.getNumberOfTotalRecordsMainTab();
    pushObjectToDataArrayWithUniqueKey("TotalRecordClaimList", totalRecord);
    let temp = await claimListCPVarsam.pressRegisterClaimButton();
    logFailTestcase(temp, `Press Register Claim button failed!`);
});

When("There are no new claim created at Claim list on CustomerPortal", async () => {
    let globalPageObject: GlobalPageObject = new GlobalPageObject(SeleniumWebDriverService.getInstance());
    if (scenarioTags.has("@CustomerPortalVarsam")) {
        globalPageObject = new GlobalPageObjectCPVasam(SeleniumWebDriverService.getInstance());
    }

    const newTotalClaim = await globalPageObject.getNumberOfTotalRecordsMainTab();
    const oldTotalClaim = parseInt(getValueDataOfDataTestExecution("TotalRecordClaimList"));

    logFailTestcase(newTotalClaim - oldTotalClaim === 0, `Total record claim list has changed!`);
});

When("System shows new claim at Claim list on CustomerPortal {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const claimListCPVarsam = new ClaimListCPVarsam();

    const ObjectName = row.ObjectName;
    let DateOfLoss = row.DateOfLoss;
    const Address = row.Address;
    const City = row.City;
    const CauseOfLoss = row.CauseOfLoss;
    const Attachments = row.Attachments;
    const Status = row.Status;

    let temp = true;

    temp = await claimListCPVarsam.validateValueInsuredObject(ObjectName);
    logFailTestcase(temp, `Validate Object Name failed!`);

    if (DateOfLoss && DateOfLoss.includes("@dataTestExecution@")) {
        DateOfLoss = getValueDataOfDataTestExecution("DateOfLoss");
        temp = await claimListCPVarsam.validateValueClaimDate(DateOfLoss);
        logFailTestcase(temp, `Validate Date Of Loss = Today failed!`);
    }
    else {
        temp = await claimListCPVarsam.validateValueClaimDate(DateOfLoss);
        logFailTestcase(temp, `Validate Date Of Loss failed!`);
    }

    temp = await claimListCPVarsam.validateValueStatus(Status);
    logFailTestcase(temp, `Validate Status failed!`);

    const ClaimId = await claimListCPVarsam.getClaimIdByRow();
    pushObjectToDataArrayWithUniqueKey("ClaimIdCP", ClaimId);
    pushObjectToDataArrayWithUniqueKey("FNOLReference", ClaimId);
});

//Search
When("User searches claim with valid data on CustomerPortal {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const claimListCPVarsam = new ClaimListCPVarsam();
    const globalPaginationCPVarsam = new GlobalPaginationCPVarsam(SeleniumWebDriverService.getInstance());

    let temp = true;
    let temp1 = true;
    temp = await claimListCPVarsam.inputSearch("");
    logFailTestcase(temp, 'Input search wiht blank value failed!');

    temp = await claimListCPVarsam.pressSearchButton();
    logFailTestcase(temp, `Press search button failed!`);

    for (let i = 0; i < rows.length; i++) {
        logWarningMessage(`Checking Search claim at line ${i + 1} in csv...`);

        const SearchKeyword = rows[i].SearchKeyword;


        if (SearchKeyword) {
            temp = await claimListCPVarsam.inputSearch(SearchKeyword);
            logFailTestcase(temp, `Input Search "${SearchKeyword}" failed!`);
        }

        temp = await claimListCPVarsam.pressSearchButton();
        logFailTestcase(temp, "Press Search button failed!");


        const ClaimNumber = parseInt(rows[i].ClaimNumber);
        const actualTotalNumber = await globalPaginationCPVarsam.getTotalRecordsAtMainList();

        if (ClaimNumber > 1 && ClaimNumber === actualTotalNumber) {
            temp = await claimListCPVarsam.validateValueClaimId(SearchKeyword, 1, true);
            temp1 = await claimListCPVarsam.validateValueInsuredObject(SearchKeyword, 1, true);
            logFailTestcase(temp || temp1, `Claim at line 1 does not match to result!`);

            const lineTemp = ClaimNumber >= 10 ? 10 : ClaimNumber;
            temp = await claimListCPVarsam.validateValueClaimId(SearchKeyword, lineTemp, true);
            temp1 = await claimListCPVarsam.validateValueInsuredObject(SearchKeyword, lineTemp, true);
            logFailTestcase(temp || temp1, `Claim at line ${lineTemp} does not match to result!`);
        }
        else if (ClaimNumber === 1) {
            //Validate name, orgNo, email, phone, status at Account list
            temp = await claimListCPVarsam.validateValueClaimId(SearchKeyword, 1, true);
            temp1 = await claimListCPVarsam.validateValueInsuredObject(SearchKeyword, 1, true);
            logFailTestcase(temp || temp1, `Claim at line 1 does not match to result!`);
        }
        else if (ClaimNumber === -1) {
            temp = await claimListCPVarsam.validateValueClaimId(SearchKeyword, 1, true);
            temp1 = await claimListCPVarsam.validateValueInsuredObject(SearchKeyword, 1, true);
            logFailTestcase(temp || temp1, `Claim at line 1 does not match to result!`);

            const lineTemp = actualTotalNumber >= 10 ? 10 : actualTotalNumber;
            temp = await claimListCPVarsam.validateValueClaimId(SearchKeyword, lineTemp, true);
            temp1 = await claimListCPVarsam.validateValueInsuredObject(SearchKeyword, lineTemp, true);
            logFailTestcase(temp || temp1, `Claim at line ${lineTemp} does not match to result!`);
        }
        else if (ClaimNumber !== actualTotalNumber) {
            logWarningMessage(`There are ${actualTotalNumber} total records found!`);
            logFailTestcase(false, `Line ${i + 1} in csv: failed...`);
        }
        logWarningMessage(`\tLine ${i + 1} passed!`);

        temp = await claimListCPVarsam.inputSearch("");
        logFailTestcase(temp, 'Input search wiht blank value failed!');

        temp = await claimListCPVarsam.pressSearchButton();
        logFailTestcase(temp, `Press search button failed!`);
    }

});