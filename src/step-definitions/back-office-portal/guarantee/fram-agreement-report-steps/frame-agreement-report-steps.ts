import { Before, Given, When } from "@cucumber/cucumber";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { AccountTabFrameAgreementForm } from "../../../../page-objects/back-office-portal/guarantee/account/account-details/tabs/account-frame-agreements/AccountTabFrameAgreementForm";
import { AccountTabFrameAgreementList } from "../../../../page-objects/back-office-portal/guarantee/account/account-details/tabs/account-frame-agreements/AccountTabFrameAgreementList";
import { FrameAgreementReports } from "../../../../page-objects/back-office-portal/guarantee/reports/frame-agreement-report/FrameAgreementReport";
import { GlobalReportGuarantee } from "../../../../page-objects/back-office-portal/guarantee/reports/global-report-guarantee/GlobalReportGuarantee";
import { convertPathFileDataToDataRegression, logFailTestcase } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { dataTestcase } from "../../../../shared/variables";

const loader = require("csv-load-sync");


let globalPageObject: GlobalPageObject;
let globalReportGuarantee: GlobalReportGuarantee;
let frameAgreementReports: FrameAgreementReports;
let accountTabFrameAgreementList: AccountTabFrameAgreementList;
let accountTabFrameAgreementForm: AccountTabFrameAgreementForm;

let expectedFrameAgreementNo: string;

Before(async function () {
    const context: ICommonContext = this.context;
    frameAgreementReports = new FrameAgreementReports(context.driverService);
    accountTabFrameAgreementList = new AccountTabFrameAgreementList(context.driverService);
    accountTabFrameAgreementForm = new AccountTabFrameAgreementForm(context.driverService)
    globalPageObject = new GlobalPageObject(context.driverService);
    globalReportGuarantee = new GlobalReportGuarantee(context.driverService);
});

Given(`User navigates to Frame Agreement Reports`, async function () {
    let temp = await globalPageObject.navigateToMainFrameAgreementReportList();
    logFailTestcase(temp, "Navigate to Frame Agreement Reports List failed");
});

When(`User opens the Frame Agreement based on generated ID number`, async () => {
    let FANumber;
    for (const i of dataTestcase) {
        if (i.nameField == "Frame Agmt No" && i.index == 1 && i.status == true) {
            FANumber = i.message;
        }
    };
    let temp = await frameAgreementReports.openFrameAgreementBasedOnNumber(FANumber);
    logFailTestcase(temp, `Open Frame Agreement Based Generated Number failed`);
    // await globalPageObject.closeOpeningForm();
});

When(`User searches Frame Agreements with Account name {string}`, async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    let accountName = rows[0].Name;
    let temp = await globalReportGuarantee.inputAccountToSearchField(accountName);
    logFailTestcase(temp, `Unable to input account name ${accountName} to account search field`);
    temp = await globalReportGuarantee.pressSearchReportButton();
    logFailTestcase(temp, `Unable to press Search button on Frame Agreement Reports page`);
    temp = await frameAgreementReports.validateFrameAgreementAccountAfterSearch(accountName);
    logFailTestcase(temp, `Unable to validate Account after Search on Frame Agreement Reports page`);

});

