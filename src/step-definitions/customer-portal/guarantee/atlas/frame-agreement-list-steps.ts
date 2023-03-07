import { Before, When } from "@cucumber/cucumber";
import { FrameAgreementFormInterface } from "../../../../interfaces/guarantee/frame-agreement/FrameAgreementFormInterface";
import { FrameAgreementListInterface } from "../../../../interfaces/guarantee/frame-agreement/FrameAgreementListInterface";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { FrameAgreementFormCPGuaranteeAtlas } from "../../../../page-objects/customer-portal/guarantee/atlas/frame-agreement/frame-agreement-forms/FrameAgreementFormCPGuaranteeAtlas";
import { FrameAgreementListCPGuaranteeAtlas } from "../../../../page-objects/customer-portal/guarantee/atlas/frame-agreement/frame-agreement-list/FrameAgreementListCPGuaranteeAtlas";
import { FrameAgreementFormCPGuaranteeHogs } from "../../../../page-objects/customer-portal/guarantee/hogs/frame-agreement/frame-agreement-forms/FrameAgreementFormCPGuaranteeHogs";
import { FrameAgreementListCPGuaranteeHogs } from "../../../../page-objects/customer-portal/guarantee/hogs/frame-agreement/frame-agreement-list/FrameAgreementListCPGuaranteeHogs";

import { logFailTestcase, logSuccessMessage, logWarningMessage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { formatDateTime, numberToCurrency } from "../../../../shared/tenant-setting/tenant-setting";
import { scenarioTags } from "../../../../shared/variables";

const loader = require("csv-load-sync");

let frameAgreementListInterface: FrameAgreementListInterface;
let frameAgreementFormInterface: FrameAgreementFormInterface;
let globalPageObject: GlobalPageObject;
Before(async function () {
    if (scenarioTags.has("@CustomerPortalAtlas")) {
        const context: ICommonContext = this.context;
        frameAgreementListInterface = new FrameAgreementListCPGuaranteeAtlas(context.driverService);
        frameAgreementFormInterface = new FrameAgreementFormCPGuaranteeAtlas(context.driverService);
        globalPageObject = new GlobalPageObject(context.driverService);
    }
    if (scenarioTags.has("@CustomerPortalHogs")) {
        const context: ICommonContext = this.context;
        frameAgreementListInterface = new FrameAgreementListCPGuaranteeHogs(context.driverService);
        frameAgreementFormInterface = new FrameAgreementFormCPGuaranteeHogs(context.driverService);
        globalPageObject = new GlobalPageObject(context.driverService);
    }
});

When("User verifies information of all frame agreements from file {string}", async function (filename) {
    const FAs = require("../../../../." + filename);
    console.log(FAs);

    for (let i = 0; i < FAs.length; i++) {
        let line = i + 1;
        logWarningMessage(`Checking FA at line ${i + 1}...`);

        const faNumber = FAs[i].frameAgreementList.frameAgmtNo;
        const faStartDate = formatDateTime(FAs[i].frameAgreementList.startDate);
        const faEndDate = formatDateTime(FAs[i].frameAgreementList.endDate);
        const limitExposure = FAs[i].frameAgreementList.limitExposure;
        const used = FAs[i].frameAgreementList.used;
        const remaining = FAs[i].frameAgreementList.remainingCapacity;
        const status = FAs[i].frameAgreementList.status;

        const faName = FAs[i].frameAgreementList.name;


        let temp = await frameAgreementListInterface.validateFrameAgmtNoOnFrameAgreementList(faNumber, line);
        logFailTestcase(temp);

        temp = await frameAgreementListInterface.validatePeriodOnFrameAgreementList(faStartDate + " - " + faEndDate, line);
        logFailTestcase(temp);

        temp = await frameAgreementListInterface.validateLimitExposureNoOnFrameAgreementList(numberToCurrency(limitExposure, true), line);
        logFailTestcase(temp);

        temp = await frameAgreementListInterface.validateCapacityOnFrameAgreementList(numberToCurrency(used, true), line);
        logFailTestcase(temp);

        temp = await frameAgreementListInterface.validateStatusOnFrameAgreementList(status, line);
        logFailTestcase(temp);

        temp = await frameAgreementListInterface.validateRemainingCapacityOnFrameAgreementList(numberToCurrency(remaining, true), line);
        logFailTestcase(temp);

        //#region Open FA detail
        temp = await frameAgreementListInterface.openFrameAgreementDetailsByRow(line);
        logFailTestcase(temp, `Open FA at row ${line} failed!`);

        //#region Validate values FA detail
        temp = await frameAgreementFormInterface.validateName_FrameAgreementForm_DetailsTab(faName);
        logFailTestcase(temp);

        temp = await frameAgreementFormInterface.validateFrameAgreementNumber_FrameAgreementForm_DetailsTab(faNumber);
        logFailTestcase(temp);

        temp = await frameAgreementFormInterface.validateTotalLimitExposure_FrameAgreementForm_DetailsTab(numberToCurrency(limitExposure, true));
        logFailTestcase(temp);

        temp = await frameAgreementFormInterface.validateUsed_FrameAgreementForm_DetailsTab(numberToCurrency(used, true));
        logFailTestcase(temp);

        temp = await frameAgreementFormInterface.validateRemainingCapacity_FrameAgreementForm_DetailsTab(numberToCurrency(remaining, true));
        logFailTestcase(temp);

        temp = await frameAgreementFormInterface.validateStartDate_FrameAgreementForm_DetailsTab(formatDateTime(faStartDate));
        logFailTestcase(temp);

        temp = await frameAgreementFormInterface.validateEndDate_FrameAgreementForm_DetailsTab(formatDateTime(faEndDate));
        logFailTestcase(temp);

        // Validate product list
        const productList = FAs[i].productList;
        for (let j = 0; j < productList.length; j++) {
            logWarningMessage(`\t\tChecking product on FA detail line "${j + 1}..."`)
            const productName = productList[j].productName;
            const parameters = productList[j].parameters;
            temp = await frameAgreementFormInterface.validateProductName_ProductList_FrameAgreementForm_DetailsTab(productName, j + 1);
            logFailTestcase(temp);

            // temp = await frameAgreementFormInterface.validateCombineParameters_ProductList_FrameAgreementForm_DetailsTab(parameters, j + 1);
            // logFailTestcase(temp);

            logSuccessMessage("\t\t\t=> Passed!");
        }

        //#endregion

        temp = await globalPageObject.pressReturnForm();
        logFailTestcase(temp, "Press Return form failed!");

        logSuccessMessage("\t=> Passed!");
        //#endregion
    }
});