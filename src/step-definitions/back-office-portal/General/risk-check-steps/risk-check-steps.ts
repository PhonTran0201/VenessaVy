import { Before, Given, Then, When } from "@cucumber/cucumber";
import { AccountDetailsLeftSide } from "../../../../page-objects/back-office-portal/general/account/account-details/left-side/AccountDetailsLeftSide";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { RiskCheckForm } from "../../../../page-objects/back-office-portal/general/risk-check/RiskCheckForm";
import { ApplicationDetailFormTabDetail } from "../../../../page-objects/back-office-portal/guarantee/application/application-detail-forms/ApplicationDetailFormTabDetail";
import { convertPathFileDataToDataRegression, logFailTestcase, logInfoMessage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";

const loader = require("csv-load-sync");

let globalPageObject: GlobalPageObject;
let accountDetailsLeftSide: AccountDetailsLeftSide;
let riskCheckForm: RiskCheckForm;
let applicationDetailFormTabDetail: ApplicationDetailFormTabDetail;


Before(async function () {
    const context: ICommonContext = this.context;
    globalPageObject = new GlobalPageObject(context.driverService);
    accountDetailsLeftSide = new AccountDetailsLeftSide(context.driverService);
    riskCheckForm = new RiskCheckForm(context.driverService);
    applicationDetailFormTabDetail = new ApplicationDetailFormTabDetail(context.driverService);

});

Given("User clicks on Risk Check button in account detail", async () => {
    let temp = await accountDetailsLeftSide.clickCheckRiskButton();
    logFailTestcase(temp, "clicks on Risk Check button in account detail failed!");
});

Given("User verifies all risk factors check box on Risk Check pop-up {string}", async (filename) => {
    await globalPageObject.waitForSeconds(2000);
    const rows = loader(convertPathFileDataToDataRegression(filename));
    let temp = true;
    for (let i = 0; i < rows.length; i++) {
        logInfoMessage(`verify risk factor check box on line ${i + 1}...`);
        const RiskFactor = rows[i].RiskFactor;
        const isChecked = rows[i].isChecked;
        if (RiskFactor && isChecked.localeCompare("Yes") === 0) {
            temp = await riskCheckForm.validateRiskFactorCheckedOnRiskCheckForm(RiskFactor);
            logFailTestcase(temp, `risk factor check box at line ${i + 1} is 'Yes' but got 'No'!`);
        } else if (RiskFactor && isChecked.localeCompare("No") === 0) {
            temp = await riskCheckForm.validateRiskFactorCheckedOnRiskCheckForm(RiskFactor);
            logFailTestcase(!temp, `risk factor check box at line ${i + 1} is 'No' but got 'Yes'!`);
        }

    }
});
When("User Check on all risk factors check boxes {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    let temp = true;
    for (let i = 0; i < rows.length; i++) {
        const RiskFactor = rows[i].RiskFactor;
        const isChecked = rows[i].isChecked;
        if (isChecked && isChecked.localeCompare("Yes") === 0) {
            logInfoMessage(`tick risk factor check box on line ${i + 1}...`);
            if (!await riskCheckForm.validateRiskFactorCheckedOnRiskCheckForm(RiskFactor)) {
                temp = await riskCheckForm.tickRiskFactorOnRiskCheckForm(RiskFactor);
                logFailTestcase(temp, `ticks risk factor check box at line ${i + 1} is incorrect!`);
            }
        }

    }
});

Then("User verifies Risk warning message on Application form {string}", async (status: string) => {
    let temp = true;
    await globalPageObject.waitForProgressBarLoaded_v2(2000);
    await globalPageObject.waitForSeconds(3000);
    if (status.localeCompare("is shown") === 0) {
        temp = await applicationDetailFormTabDetail.validateLabelStatusWarningOnApplicationDetailForm("PLEASE CONFIRM THAT YOU HAVE VERIFIED ALL RISK FACTORS");
        logFailTestcase(temp, "The label status warning is not shown on application detail form");
    } else if (status.localeCompare("is not shown") === 0) {
        temp = await applicationDetailFormTabDetail.validateLabelStatusWarningOnApplicationDetailForm("PLEASE CONFIRM THAT YOU HAVE VERIFIED ALL RISK FACTORS");
        logFailTestcase(!temp, "The label status warning is still shown on application detail form");
    }
});


