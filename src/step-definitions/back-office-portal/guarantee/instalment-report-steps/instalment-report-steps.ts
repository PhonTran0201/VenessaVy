import { Before, Given, When, Then } from "@cucumber/cucumber";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { FrameAgreementReports } from "../../../../page-objects/back-office-portal/guarantee/reports/frame-agreement-report/FrameAgreementReport";
import { GlobalReportGuarantee } from "../../../../page-objects/back-office-portal/guarantee/reports/global-report-guarantee/GlobalReportGuarantee";
import { ICommonContext } from "../../../../shared/interfaces";
import { dataTestcase, scenarioName, scenarioTags } from "../../../../shared/variables";
import { getPostedDateForHogsTenant } from "../../../../shared/function-hogs-project";
import { convertPathFileDataToDataRegression, getDate, logFailTestcase } from "../../../../shared/functions";
import { currencyToNumber, numberToCurrency } from "../../../../shared/tenant-setting/tenant-setting";
import { InstalmentReports } from "../../../../page-objects/back-office-portal/guarantee/reports/instalment-report/InstalmentReportGuarantee";

const loader = require("csv-load-sync");


let globalPageObject: GlobalPageObject;
let globalReportGuarantee: GlobalReportGuarantee;
let frameAgreementReports: FrameAgreementReports;
let instalmentReports: InstalmentReports;

Before(async function () {
    const context: ICommonContext = this.context;
    frameAgreementReports = new FrameAgreementReports(context.driverService);
    globalPageObject = new GlobalPageObject(context.driverService);
    globalReportGuarantee = new GlobalReportGuarantee(context.driverService);
    instalmentReports = new InstalmentReports(context.driverService);
});

Given(`User navigates to Instalment Reports`, async function () {
    let temp = await globalPageObject.navigateToMainInstalmentReportList();
    logFailTestcase(temp, "Navigate to Instalment Reports List failed");
});

When(`User opens the Instalment based on generated ID number`, async () => {
    let InstalNumber;
    for (const i of dataTestcase) {
        if (i.nameField == "Instalment No" && i.index == 1 && i.status == true) {
            InstalNumber = i.message;
        }
    };
    let temp = await instalmentReports.openInstalmentBasedOnNumber(InstalNumber);
    logFailTestcase(temp, `Open Frame Agreement Based Generated Number failed`);
});

Then(`System shows processing exported files notification on Instalment Reports page`, async () => {
    await globalPageObject.waitForProgressBarLoaded_v2();
    let temp = await globalPageObject.checkToastSuccessExistWithMessage(`is processing, we will notify to you after once it finished`);
    logFailTestcase(temp, `Processing exported files notification not found`);
});

Then('User verifies information in Instalment details {string}', async (filename: string) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];

    //#region Validate values at Details tab on FA form without Product list
    let InstalmentNumber = "InstalmentNumber";
    for (const iterator of dataTestcase) {
        if (iterator.nameField.localeCompare("Instalment No") === 0) {
            InstalmentNumber = iterator.message[0];
        }
    }
    const Type = row.Type;
    const OrdererDebtor = row.OrdererDebtor;

    let PeriodStartGuarantee = row.PeriodStartGuarantee;

    const TotalAmount = "Total: " + numberToCurrency(currencyToNumber(row.TotalAmount));
    const ProjectName = row.ProjectName;
    let TotalGuaranteeFeeGuaranteeFee = "";
    let PeriodEndGuarantee = row.PeriodEndGuarantee;
    let ActualPeriodEnd = "";

    if (row.IsBackDatedGurantee && row.IsBackDatedGurantee.localeCompare("Yes") === 0) {
        PeriodStartGuarantee = getDate(-364);
        ActualPeriodEnd = getDate();
    }



    if (Type && Type.localeCompare("One Phase") === 0) {
        // ActualPeriodEnd = PeriodEndGuarantee;
    }
    else if (Type && Type.localeCompare("Two Phases") === 0) {
        ActualPeriodEnd = row.PeriodEndGuaranteePhase2;
        TotalGuaranteeFeeGuaranteeFee = row.TotalGuaranteeFeeGuaranteeFee;
    }

    for (const iterator of dataTestcase) {
        if (iterator.nameField.localeCompare("StartDate") === 0) {
            PeriodStartGuarantee = iterator.message[0];
        }
        if (iterator.nameField.localeCompare("EndDate") === 0) {
            ActualPeriodEnd = iterator.message[0];
        }
    }

    for (const iterator of dataTestcase) {
        if (iterator.nameField.localeCompare("EndDate2") === 0) {
            ActualPeriodEnd = iterator.message[0];
        }
    }

    for (const iterator of dataTestcase) {
        if (iterator.nameField.localeCompare("NewStartDate") === 0) {
            PeriodStartGuarantee = iterator.message[0];
        }
        if (iterator.nameField.localeCompare("NewEndDate") === 0) {
            ActualPeriodEnd = iterator.message[0];
        }
    }

    for (const iterator of dataTestcase) {
        if (iterator.nameField.localeCompare("NewEndDate2") === 0) {
            ActualPeriodEnd = iterator.message[0];
        }
    }

    //#region get Posted date

    let PostedDate: string;
    if ((ProjectName && ProjectName.localeCompare("Atlas") === 0) || scenarioTags.has("@Atlas")) {
        PostedDate = getDate(+2);
    } else if (ProjectName && ProjectName.localeCompare("Hogs-NTS") === 0) {
        PostedDate = getDate(0);
    } else if (ProjectName) {
        PostedDate = getPostedDateForHogsTenant(PeriodStartGuarantee);
    }
    else PostedDate = "";
    //#endregion


    let temp = true;

    if (PostedDate) {
        temp = await instalmentReports.validatePostedDateInInstalmentReports(PostedDate)
        logFailTestcase(temp, "PostedDate on Instalment List is incorrect!");
    }

    temp = await instalmentReports.validateStartDateInInstalmentReports(PeriodStartGuarantee);
    logFailTestcase(temp, "Period Start Guarantee on Instalment List is incorrect!");

    temp = await instalmentReports.validateEndDateInInstalmentReports(ActualPeriodEnd);
    logFailTestcase(temp, "Period End Guarantee on Instalment List is incorrect!");

    temp = await instalmentReports.validateAmountInInstalmentReports(TotalAmount);
    logFailTestcase(temp, "Total Amount on Instalment List is incorrect!");

    await globalPageObject.pressCancelForm();

});

Then('User searches Instalment with Account name {string}', async (filename: string) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    let accountName = rows[0].SelectedAccount;
    let temp = await globalReportGuarantee.inputAccountToSearchField(accountName);
    logFailTestcase(temp, `Unable to input account name ${accountName} to account search field`);
    temp = await globalReportGuarantee.pressSearchReportButton();
    logFailTestcase(temp, `Unable to press Search button on Instalment Reports page`);
    temp = await frameAgreementReports.validateFrameAgreementAccountAfterSearch(accountName);
    logFailTestcase(temp, `Unable to validate Account after Search on Instalment Reports page`);

});