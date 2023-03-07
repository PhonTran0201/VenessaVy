import { Before, Then } from "@cucumber/cucumber";
import { compareDesc } from "date-fns";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { InstalmentList } from "../../../../page-objects/back-office-portal/guarantee/instalment/instalment-list/InstalmentList";
import { InstalmentForm } from "../../../../page-objects/back-office-portal/guarantee/instalment/intstalment-forms/InstalmentForm";
import { ValidateField } from "../../../../shared/classes";
import { getPostedDateForHogsTenant } from "../../../../shared/function-hogs-project";
import { addDate, addMonth, compareDate, convertPathFileDataToDataRegression, logFailTestcase, logInfoMessage, logSuccessMessage, logWarningMessage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { getDefaultCurrency, numberToCurrency } from "../../../../shared/tenant-setting/tenant-setting";
import { dataTestcase } from "../../../../shared/variables";

const loader = require("csv-load-sync");

let globalPageObject: GlobalPageObject;
let instalmentList: InstalmentList;
let instalmentForm: InstalmentForm;

Before(async function () {
    const context: ICommonContext = this.context;
    globalPageObject = new GlobalPageObject(context.driverService);
    instalmentList = new InstalmentList(context.driverService);
    instalmentForm = new InstalmentForm(context.driverService);
});

/**
 * Calculate Effected date, Start date, EndDate for instalment BiAnnual 1 Phase
 */
function calculateDateForInstalmentBiAnnual() {
    try {
        let startDateTemp = "";
        let newEndDateTemp = "";
        for (const iterator of dataTestcase) {
            if (iterator.nameField.localeCompare("StartDate") === 0) {
                startDateTemp = iterator.message[0];
            }
        }
        for (const iterator of dataTestcase) {
            if (iterator.nameField.localeCompare("NewStartDate") === 0) {
                startDateTemp = iterator.message[0];
            }
        }

        for (let i = 1; i <= 4; i++) {
            const postedDate = addDate(startDateTemp, 1);
            const startDate = startDateTemp;
            const endDate = addDate(addMonth(startDateTemp, 6), -1);
            startDateTemp = addDate(endDate, 1);
            dataTestcase.push(new ValidateField(`Instalment Bi-Annual`, i, true, [postedDate, startDate, endDate], []));
        }

        for (const iterator of dataTestcase) {
            if (iterator.nameField.localeCompare("NewEndDate") === 0) {
                newEndDateTemp = iterator.message[0];
            }
        }

        for (let i = 0; i < dataTestcase.length; i++) {
            if (dataTestcase[i].nameField.localeCompare("Instalment Bi-Annual") === 0) {
                const newEndDate = new Date(parseInt(newEndDateTemp.substring(6, 10)), parseInt(newEndDateTemp.substring(3, 5)), parseInt(newEndDateTemp.substring(0, 2)));
                const strStartDate = dataTestcase[i].message[1];
                const strEndDate = dataTestcase[i].message[2];
                const startDate = new Date(parseInt(strStartDate.substring(6, 10)), parseInt(strStartDate.substring(3, 5)), parseInt(strStartDate.substring(0, 2)));
                const endDate = new Date(parseInt(strEndDate.substring(6, 10)), parseInt(strEndDate.substring(3, 5)), parseInt(strEndDate.substring(0, 2)));

                if (compareDesc(startDate, newEndDate) >= 0 && compareDesc(newEndDate, endDate) >= 0 && dataTestcase[i].index <= 3) {
                    dataTestcase[i + 1].message[1] = dataTestcase[i].message[1];
                    dataTestcase[i + 1].message[2] = newEndDateTemp;
                }
            }
        }


        // For instalment 5 in Task SAAS-14354
        for (let i = 0; i < dataTestcase.length; i++) {
            if (dataTestcase[i].nameField.localeCompare("Instalment Bi-Annual") === 0 && dataTestcase[i].index === 4) {
                const strStartDate = dataTestcase[i].message[1];
                const strEndDate = dataTestcase[i].message[2];
                if (compareDate(strStartDate, newEndDateTemp) === 1 && compareDate(newEndDateTemp, strEndDate) === 1) {
                    dataTestcase[i].message[2] = newEndDateTemp;
                }
            }
        }
    } catch (error) {
        console.log(error);
        logWarningMessage("calculateDateForInstalmentBiAnnual failed!");
    }
}

/**
 * Calculate Effected date, Start date, EndDate for instalment BiAnnual 1 Phase
 */
function calculateDateForInstalmentBiAnnual2Phase() {
    // Phase 1: StartDate, EndDate
    // Phase 2: StartDate2, EndDate2, NewStartDate2, NewEndDate2
    try {
        let startDateTemp = "";
        for (const iterator of dataTestcase) {
            if (iterator.nameField.localeCompare("StartDate") === 0) {
                startDateTemp = iterator.message[0];
            }
        }
        for (const iterator of dataTestcase) {
            if (iterator.nameField.localeCompare("NewStartDate") === 0) {
                startDateTemp = iterator.message[0];
            }
        }

        for (let i = 1; i <= 20; i++) {
            const postedDate = "PostedDate has been not yet calculated";
            const startDate = startDateTemp;
            const endDateTemp = addDate(addMonth(startDateTemp, 6), -1);
            let endDate = endDateTemp;

            // New End Date for Phase 1 if exist
            let NewEndDate = endDate;
            for (const iterator of dataTestcase) {
                if (iterator.nameField.localeCompare("NewEndDate") === 0) {
                    NewEndDate = iterator.message[0];
                }
            }
            if (compareDate(startDate, NewEndDate) === 1 && compareDate(NewEndDate, endDate) === 1) {
                endDate = NewEndDate;
            }


            // End Date for Phase 2 if exist
            let EndDate2 = endDate;
            for (const iterator of dataTestcase) {
                if (iterator.nameField.localeCompare("EndDate2") === 0) {
                    EndDate2 = iterator.message[0];
                }
            }
            if (compareDate(startDate, EndDate2) === 1 && compareDate(EndDate2, endDate) === 1) {
                endDate = EndDate2;
            }

            // New End Date for Phase 2 if exist
            let NewEndDate2 = endDate;
            for (const iterator of dataTestcase) {
                if (iterator.nameField.localeCompare("NewEndDate2") === 0) {
                    NewEndDate2 = iterator.message[0];
                }
            }
            if (compareDate(startDate, NewEndDate2) === 1 && compareDate(NewEndDate2, endDateTemp) === 1) {
                endDate = NewEndDate2;
            }

            startDateTemp = addDate(endDate, 1);
            dataTestcase.push(new ValidateField(`Instalment Bi-Annual`, i, true, [postedDate, startDate, endDate], []));
        }
    } catch (error) {
        console.log(error);
        logWarningMessage("calculateDateForInstalmentBiAnnual2Phase failed!");
    }
}

/**
 * This fuction is specific for Test case SAAS_14701,
 * Bi-Annual 1 Phase
 * First Instalment is new, Second instalment is exported
 * We have to shorten End date ~ 7 montnh and the second instalment will be updated and refund
 */
function calculateDateForInstalmemtTestcaseSAAS_14701() {
    let NewEndDate = "";
    for (const iterator of dataTestcase) {
        if (iterator.nameField.localeCompare("NewEndDate") === 0) {
            NewEndDate = iterator.message[0];
        }
    }
    for (let i = 0; i < dataTestcase.length; i++) {
        if (dataTestcase[i].nameField.localeCompare("Instalment Bi-Annual") === 0 && dataTestcase[i].index === 2) {
            dataTestcase[i].message[1] = NewEndDate;
            dataTestcase[i].message[2] = dataTestcase[i - 1].message[2];
        }
    }
}
/**
 * Bi_Annual 1 phase
 */
Then("System shows correct information of Instalment - Bi-Annual {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    await globalPageObject.reloadTable(3000);
    await globalPageObject.waitForProgressBarLoaded_v2();

    // Tính toán Posted date, start date, end date cho các instalment
    calculateDateForInstalmentBiAnnual();


    //#region Specific for test case SAAS-14701, Shorten end date for refund exported instalment
    const IsRefund = rows[0].IsRefund;
    if (IsRefund && (IsRefund.localeCompare("True") === 0 || IsRefund.localeCompare("true") === 0)) {
        calculateDateForInstalmemtTestcaseSAAS_14701();
    }
    //#endregion

    // Search những instalment được tạo ra theo Guarantee No
    let GuaranteeNo = "Guarantee No";
    for (const iterator of dataTestcase) {
        if (iterator.nameField.localeCompare("Guarantee No") === 0) {
            GuaranteeNo = iterator.message[0];
        }
    }
    let temp = await instalmentList.inputSearchKeywordInstalment(GuaranteeNo);
    logFailTestcase(temp, "Input Search keyword on Instalment list failed!");

    temp = await instalmentList.pressSearchInstalment();
    logFailTestcase(temp, "Press Search keyword on Instalment list failed!");
    await globalPageObject.waitForProgressBarLoaded_v2();


    //#region  Revert Sort Instalment list by Posted Date as Default (click 2 lần nữa để về như ban đầu)
    await instalmentList.revertSortingPostedDateAsDefault();
    //#endregion

    //#region  Sort Instalment list by Posted Date
    temp = await instalmentList.pressSortInstalmentListByPostedDate();
    logFailTestcase(temp, "Press Sort Instalment list by Posted date failed!");
    await globalPageObject.waitForProgressBarLoaded_v2();
    //#endregion

    //#region Position of instalments by guarantee id
    let arrayInstalment: any[] = [];

    for (let i = 0; i < rows.length; i++) {
        arrayInstalment.push({ index: i + 1, id: -1 });
        const instalmentNo = parseInt((await instalmentList.getInstalmentNoByRow(i + 1)).replace(/^\D+/g, ''));
        if (instalmentNo) {
            arrayInstalment[i].id = instalmentNo;
        }
    }

    // Remove element with id = -1
    while (arrayInstalment[arrayInstalment.length - 1].id === -1) {
        arrayInstalment.pop();
    }

    // Sort arrayInstalment by id
    arrayInstalment.sort(function (a, b) {
        return a.id - b.id;
    });

    logInfoMessage("Array Instalment");
    console.log(arrayInstalment);
    //#endregion


    // Validate all instalments
    for (let i = 0; i < rows.length; i++) {
        let instalmentIndex = arrayInstalment[i].index || i + 1;
        logWarningMessage(`Checking instalment at line ${i + 1}...`);

        const OrdererDebtor = rows[i].OrdererDebtor;
        const TotalAmount = rows[i].TotalAmount;
        const StatusInstalment = rows[i].StatusInstalment;

        const AmendmentFee = rows[i].AmendmentFee;
        const EstablishmentFeeOtherFee = rows[i].EstablishmentFeeOtherFee;
        const GuaranteeFeeGuaranteeFee = rows[i].GuaranteeFeeGuaranteeFee;


        const InstalmentNo = await instalmentList.getInstalmentNoByRow(instalmentIndex);

        // Date for each phase
        let PostedDate = "";
        let StartDate = "";
        let EndDate = "";

        for (const iterator of dataTestcase) {
            if (iterator.nameField.localeCompare("Guarantee No") === 0) {
                GuaranteeNo = iterator.message[0];
            }
            if (iterator.nameField.localeCompare("Instalment Bi-Annual") === 0 && iterator.index === i + 1) {
                PostedDate = iterator.message[0];
            }
            if (iterator.nameField.localeCompare("Instalment Bi-Annual") === 0 && iterator.index === i + 1) {
                StartDate = iterator.message[1];
            }
            if (iterator.nameField.localeCompare("Instalment Bi-Annual") === 0 && iterator.index === i + 1) {
                EndDate = iterator.message[2];
            }
        }


        //#region Validate values on Instalment list
        let temp = await instalmentList.validateGuaranteeNoOnInstalmentList(GuaranteeNo, instalmentIndex);
        logFailTestcase(temp, "GuaranteeNo on Instalment List is incorrect!");

        temp = await instalmentList.validateDebtorOnInstalmentList(OrdererDebtor, instalmentIndex);
        logFailTestcase(temp, "OrdererDebtor on Instalment List is incorrect!");

        // temp = await instalmentList.validatePostedDateOnInstalmentList(PostedDate, instalmentIndex)
        // logFailTestcase(temp, "PostedDate on Instalment List is incorrect!");

        temp = await instalmentList.validateStartDateOnInstalmentList(StartDate, instalmentIndex);
        logFailTestcase(temp, "Period Start Guarantee on Instalment List is incorrect!");

        temp = await instalmentList.validateEndDateOnInstalmentList(EndDate, instalmentIndex);
        logFailTestcase(temp, "Period End Guarantee on Instalment List is incorrect!");

        temp = await instalmentList.validateAmountOnInstalmentList(TotalAmount + " " + getDefaultCurrency(), instalmentIndex);
        logFailTestcase(temp, "Total Amount on Instalment List is incorrect!");

        temp = await instalmentList.validateStatusOnInstalmentList(StatusInstalment, instalmentIndex);
        logFailTestcase(temp, "Status on Instalment List is incorrect!");
        //#endregion 

        //#region Validate values on Instalment form
        temp = await instalmentList.openInstalmentByRowOnList(instalmentIndex);
        logFailTestcase(temp, `Open Instalment at row ${instalmentIndex} failed!`);

        temp = await instalmentForm.validateInstalmentNoOnInstalmentForm(InstalmentNo);
        logFailTestcase(temp, "InstalmentNo on Instalment Form is incorrect!");

        // temp = await instalmentForm.validatePostedDateOnInstalmentForm(PostedDate);
        // logFailTestcase(temp, "PostedDate on Instalment Form is incorrect!");

        temp = await instalmentForm.validateCurrencyCodeOnInstalmentForm(TotalAmount + " " + getDefaultCurrency());
        logFailTestcase(temp, "CurrencyCode on Instalment Form is incorrect!");


        //#region Validate values on Table on form
        // Date for amendment period
        let StartDateAmendment = "";
        let EndDateAmendment = "";
        for (const iterator of dataTestcase) {
            if (iterator.nameField.localeCompare("StartDate") === 0) {
                StartDateAmendment = iterator.message[0];
            }
            if (iterator.nameField.localeCompare("NewEndDate") === 0) {
                EndDateAmendment = iterator.message[0];
            }
        }

        // Date for initial phase (thời gian lúc đầu)
        let OldStartDate = "";
        let OldEndDate = "";
        for (const iterator of dataTestcase) {
            if (iterator.nameField.localeCompare("StartDate") === 0) {
                OldStartDate = iterator.message[0];
            }
            if (iterator.nameField.localeCompare("EndDate") === 0) {
                OldEndDate = iterator.message[0];
            }
        }

        if (AmendmentFee) {
            temp = await instalmentForm.validateValueOnListInstalmentForm(
                "Payment for amendment",
                StartDateAmendment,
                EndDateAmendment,
                AmendmentFee
            )
            logFailTestcase(temp, "Values on Payment for amendment row is incorrect");
        }

        if (GuaranteeFeeGuaranteeFee) {
            temp = await instalmentForm.validateValueOnListInstalmentForm(
                "Bi-annual payment for",
                StartDate,
                EndDate,
                GuaranteeFeeGuaranteeFee
            )
            logFailTestcase(temp, "Values on Guarantee fee row is incorrect");
        }

        if (EstablishmentFeeOtherFee) {
            temp = await instalmentForm.validateValueOnListInstalmentForm(
                "Payment for establishment",
                OldStartDate,
                OldEndDate,
                EstablishmentFeeOtherFee
            )
            logFailTestcase(temp, "Values on Payment for establishment row is incorrect");
        }
        //#endregion


        temp = await instalmentForm.validateTotalAmountOnListInstalmentForm(TotalAmount);
        logFailTestcase(temp, "Total amount on Instalment form is incorrect!")

        await instalmentForm.closeInstalmentForm();
        await globalPageObject.waitForProgressBarLoaded_v2();


        logSuccessMessage(`\t=> Checking instalment at line ${instalmentIndex} passed!`);

        //#endregion
    }
});

/**
 * Bi-Annual 1 phase
 * All instalments are paid/exported
 */
Then("System shows correct information of Instalment - Bi-Annual-all-exported {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    await globalPageObject.reloadTable(7000);
    await globalPageObject.waitForProgressBarLoaded_v2();

    // Tính toán Posted date, start date, end date cho các instalment
    calculateDateForInstalmentBiAnnual();

    // Search những instalment được tạo ra theo Guarantee No
    let GuaranteeNo = "Guarantee No";
    for (const iterator of dataTestcase) {
        if (iterator.nameField.localeCompare("Guarantee No") === 0) {
            GuaranteeNo = iterator.message[0];
        }
    }
    let temp = await instalmentList.inputSearchKeywordInstalment(GuaranteeNo);
    logFailTestcase(temp, "Input Search keyword on Instalment list failed!");

    temp = await instalmentList.pressSearchInstalment();
    logFailTestcase(temp, "Press Search keyword on Instalment list failed!");
    await globalPageObject.waitForProgressBarLoaded_v2();


    //#region  Revert Sort Instalment list by Posted Date as Default (click 2 lần nữa để về như ban đầu)
    await instalmentList.revertSortingPostedDateAsDefault();
    //#endregion

    //#region  Sort Instalment list by Posted Date
    temp = await instalmentList.pressSortInstalmentListByPostedDate();
    logFailTestcase(temp, "Press Sort Instalment list by Posted date failed!");
    await globalPageObject.waitForProgressBarLoaded_v2();
    //#endregion

    //#region Position of instalments by guarantee id
    let arrayInstalment: any[] = [];

    for (let i = 0; i < rows.length; i++) {
        arrayInstalment.push({ index: i + 1, id: -1 });
        const instalmentNo = parseInt((await instalmentList.getInstalmentNoByRow(i + 1)).replace(/^\D+/g, ''));
        if (instalmentNo) {
            arrayInstalment[i].id = instalmentNo;
        }
    }

    // Remove element with id = -1
    while (arrayInstalment[arrayInstalment.length - 1].id === -1) {
        arrayInstalment.pop();
    }

    // Sort arrayInstalment by id
    arrayInstalment.sort(function (a, b) {
        return a.id - b.id;
    });

    logInfoMessage("Array Instalment");
    console.log(arrayInstalment);
    //#endregion


    // Validate all instalments
    for (let i = 0; i < rows.length; i++) {
        let instalmentIndex = arrayInstalment[i].index || i + 1;
        logWarningMessage(`Checking instalment at line ${i + 1}...`);

        const OrdererDebtor = rows[i].OrdererDebtor;
        const TotalAmount = rows[i].TotalAmount;
        const StatusInstalment = rows[i].StatusInstalment;

        const AmendmentFee = rows[i].AmendmentFee;
        const EstablishmentFeeOtherFee = rows[i].EstablishmentFeeOtherFee;
        const GuaranteeFeeGuaranteeFee = rows[i].GuaranteeFeeGuaranteeFee;


        const InstalmentNo = await instalmentList.getInstalmentNoByRow(instalmentIndex);

        // Date for each phase
        let PostedDate = "";
        let StartDate = "";
        let EndDate = "";

        if (AmendmentFee) {
            for (const iterator of dataTestcase) {
                if (iterator.nameField.localeCompare("Guarantee No") === 0) {
                    GuaranteeNo = iterator.message[0];
                }
                if (iterator.nameField.localeCompare("Instalment Bi-Annual") === 0 && iterator.index === i) {
                    PostedDate = iterator.message[0];
                }
                if (iterator.nameField.localeCompare("Instalment Bi-Annual") === 0 && iterator.index === i) {
                    StartDate = iterator.message[1];
                }
                if (iterator.nameField.localeCompare("Instalment Bi-Annual") === 0 && iterator.index === i) {
                    EndDate = iterator.message[2];
                }
            }
        } else {
            for (const iterator of dataTestcase) {
                if (iterator.nameField.localeCompare("Guarantee No") === 0) {
                    GuaranteeNo = iterator.message[0];
                }
                if (iterator.nameField.localeCompare("Instalment Bi-Annual") === 0 && iterator.index === i + 1) {
                    PostedDate = iterator.message[0];
                }
                if (iterator.nameField.localeCompare("Instalment Bi-Annual") === 0 && iterator.index === i + 1) {
                    StartDate = iterator.message[1];
                }
                if (iterator.nameField.localeCompare("Instalment Bi-Annual") === 0 && iterator.index === i + 1) {
                    EndDate = iterator.message[2];
                }
            }
        }

        //#region Validate values on Instalment list
        let temp = await instalmentList.validateGuaranteeNoOnInstalmentList(GuaranteeNo, instalmentIndex);
        logFailTestcase(temp, "GuaranteeNo on Instalment List is incorrect!");

        temp = await instalmentList.validateDebtorOnInstalmentList(OrdererDebtor, instalmentIndex);
        logFailTestcase(temp, "OrdererDebtor on Instalment List is incorrect!");

        // temp = await instalmentList.validatePostedDateOnInstalmentList(PostedDate, instalmentIndex)
        // logFailTestcase(temp, "PostedDate on Instalment List is incorrect!");

        temp = await instalmentList.validateStartDateOnInstalmentList(StartDate, instalmentIndex);
        logFailTestcase(temp, "Period Start Guarantee on Instalment List is incorrect!");

        temp = await instalmentList.validateEndDateOnInstalmentList(EndDate, instalmentIndex);
        logFailTestcase(temp, "Period End Guarantee on Instalment List is incorrect!");

        temp = await instalmentList.validateAmountOnInstalmentList(TotalAmount + " " + getDefaultCurrency(), instalmentIndex);
        logFailTestcase(temp, "Total Amount on Instalment List is incorrect!");

        temp = await instalmentList.validateStatusOnInstalmentList(StatusInstalment, instalmentIndex);
        logFailTestcase(temp, "Status on Instalment List is incorrect!");
        //#endregion 

        //#region Validate values on Instalment form
        temp = await instalmentList.openInstalmentByRowOnList(instalmentIndex);
        logFailTestcase(temp, `Open Instalment at row ${instalmentIndex} failed!`);

        temp = await instalmentForm.validateInstalmentNoOnInstalmentForm(InstalmentNo);
        logFailTestcase(temp, "InstalmentNo on Instalment Form is incorrect!");

        // temp = await instalmentForm.validatePostedDateOnInstalmentForm(PostedDate);
        // logFailTestcase(temp, "PostedDate on Instalment Form is incorrect!");

        temp = await instalmentForm.validateCurrencyCodeOnInstalmentForm(TotalAmount + " " + getDefaultCurrency());
        logFailTestcase(temp, "CurrencyCode on Instalment Form is incorrect!");


        //#region Validate values on Table on form
        // Date for all phases
        let StartDateAllPhases = "";
        let EndDateAllPhases = "";
        for (const iterator of dataTestcase) {
            if (iterator.nameField.localeCompare("NewStartDate") === 0) {
                StartDateAllPhases = iterator.message[0];
            }
            if (iterator.nameField.localeCompare("NewEndDate") === 0) {
                EndDateAllPhases = iterator.message[0];
            }
        }
        for (const iterator of dataTestcase) {
            if (iterator.nameField.localeCompare("NewEndDate2") === 0) {
                EndDateAllPhases = iterator.message[0];
            }
        }

        // Date for initial phase (thời gian lúc đầu)
        let OldStartDate = "";
        let OldEndDate = "";
        for (const iterator of dataTestcase) {
            if (iterator.nameField.localeCompare("StartDate") === 0) {
                OldStartDate = iterator.message[0];
            }
            if (iterator.nameField.localeCompare("EndDate") === 0) {
                OldEndDate = iterator.message[0];
            }
        }

        if (AmendmentFee) {
            temp = await instalmentForm.validateValueOnListInstalmentForm(
                "Payment for amendment",
                StartDateAllPhases,
                EndDateAllPhases,
                AmendmentFee
            )
            logFailTestcase(temp, "Values on Payment for amendment row is incorrect");
        }

        if (GuaranteeFeeGuaranteeFee) {
            temp = await instalmentForm.validateValueOnListInstalmentForm(
                "Bi-annual payment for",
                StartDate,
                EndDate,
                GuaranteeFeeGuaranteeFee
            )
            logFailTestcase(temp, "Values on Guarantee fee row is incorrect");
        }

        if (EstablishmentFeeOtherFee) {
            temp = await instalmentForm.validateValueOnListInstalmentForm(
                "Payment for establishment",
                OldStartDate,
                OldEndDate,
                EstablishmentFeeOtherFee
            )
            logFailTestcase(temp, "Values on Payment for establishment row is incorrect");
        }
        //#endregion


        temp = await instalmentForm.validateTotalAmountOnListInstalmentForm(TotalAmount);
        logFailTestcase(temp, "Total amount on Instalment form is incorrect!")

        await instalmentForm.closeInstalmentForm();
        await globalPageObject.waitForProgressBarLoaded_v2();


        logSuccessMessage(`\t=> Checking instalment at line ${instalmentIndex} passed!`);

        //#endregion
    }

});

/**
 * Bi-Annual 2 phase
 * All instalments are new
 */
Then("System shows correct information of Instalment - Bi-Annual 2 phase - All instalments are new {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    await globalPageObject.reloadTable(3000);
    await globalPageObject.waitForProgressBarLoaded_v2();

    // Tính toán Posted date, start date, end date cho các instalment
    calculateDateForInstalmentBiAnnual2Phase();

    // Search những instalment được tạo ra theo Guarantee No
    let GuaranteeNo = "Guarantee No";
    for (const iterator of dataTestcase) {
        if (iterator.nameField.localeCompare("Guarantee No") === 0) {
            GuaranteeNo = iterator.message[0];
        }
    }
    let temp = await instalmentList.inputSearchKeywordInstalment(GuaranteeNo);
    logFailTestcase(temp, "Input Search keyword on Instalment list failed!");

    temp = await instalmentList.pressSearchInstalment();
    logFailTestcase(temp, "Press Search keyword on Instalment list failed!");
    await globalPageObject.waitForProgressBarLoaded_v2();


    //#region  Revert Sort Instalment list by Posted Date as Default (click 2 lần nữa để về như ban đầu)
    await instalmentList.revertSortingPostedDateAsDefault();
    //#endregion

    //#region  Sort Instalment list by Posted Date
    temp = await instalmentList.pressSortInstalmentListByPostedDate();
    logFailTestcase(temp, "Press Sort Instalment list by Posted date failed!");
    await globalPageObject.waitForProgressBarLoaded_v2();
    //#endregion

    //#region Position of instalments by guarantee id
    let arrayInstalment: any[] = [];

    for (let i = 0; i < rows.length; i++) {
        arrayInstalment.push({ index: i + 1, startDate: "", endDate: "", amount: "" });
        const startDate = await instalmentList.getStartDateByRow(i + 1);
        const endDate = await instalmentList.getEndDateByRow(i + 1);
        const amount = await instalmentList.getAmountByRow(i + 1);

        if (startDate) {
            arrayInstalment[i].startDate = startDate;
        }
        if (endDate) {
            arrayInstalment[i].endDate = endDate;
        }
        if (amount) {
            arrayInstalment[i].amount = amount;
        }
    }

    // Remove element with startDate is null
    while (!arrayInstalment[arrayInstalment.length - 1].startDate) {
        arrayInstalment.pop();
    }

    //#region Verify instalment have duplicated records (start date, end date, amount)
    const n = arrayInstalment.length;
    for (let i = 0; i <= n - 2; i++) {
        for (let j = i + 1; j <= n - 1; j++) {
            if (arrayInstalment[i].startDate === arrayInstalment[j].startDate &&
                arrayInstalment[i].endDate === arrayInstalment[j].endDate &&
                arrayInstalment[i].amount === arrayInstalment[j].amount) {
                logFailTestcase(false, `Instalment has Start Date = ${arrayInstalment[i].startDate}, EndDate = ${arrayInstalment[i].endDate} is duplicated!`);
            }
        }
    }
    //#endregion

    //#region Declare arrayInstalmentFromFile (list instalment từ file và biến dataTestcase)
    let arrayInstalmentFromFile: any[] = [];
    let i = 0;
    for (const iterator of dataTestcase) {
        if (iterator.nameField.localeCompare("Instalment Bi-Annual") === 0 && i < rows.length) {
            arrayInstalmentFromFile.push({ index: i + 1, startDate: iterator.message[1], endDate: iterator.message[2], amount: numberToCurrency(rows[i].TotalAmount, true) });
            i++;
        }
    }
    //#endregion

    // Add property "id" for arrayInstalment, and set "id" as index of arrayInstalmentFromFile
    arrayInstalment.forEach(function (element) {
        element.id = arrayInstalmentFromFile.map(function (e) { return e.startDate; }).indexOf(element.startDate);
    });

    // Sort arrayInstalment by id
    arrayInstalment.sort(function (a, b) {
        return a.id - b.id;
    });

    logInfoMessage("Array Instalment");
    console.log(arrayInstalment);
    //#endregion


    // Validate all instalments
    for (let i = 0; i < rows.length; i++) {
        let instalmentIndex = arrayInstalment[i].index || i + 1;
        logWarningMessage(`Checking instalment at line ${i + 1}...`);

        const OrdererDebtor = rows[i].OrdererDebtor;
        const TotalAmount = rows[i].TotalAmount;
        const StatusInstalment = rows[i].StatusInstalment;

        const AmendmentFee = rows[i].AmendmentFee;
        const EstablishmentFeeOtherFee = rows[i].EstablishmentFeeOtherFee;
        const GuaranteeFeeGuaranteeFee = rows[i].GuaranteeFeeGuaranteeFee;


        const InstalmentNo = await instalmentList.getInstalmentNoByRow(instalmentIndex);

        // Date for each phase
        let PostedDate = "";
        let StartDate = "";
        let EndDate = "";

        for (const iterator of dataTestcase) {
            if (iterator.nameField.localeCompare("Guarantee No") === 0) {
                GuaranteeNo = iterator.message[0];
            }
            if (iterator.nameField.localeCompare("Instalment Bi-Annual") === 0 && iterator.index === i + 1) {
                PostedDate = iterator.message[0];
            }
            if (iterator.nameField.localeCompare("Instalment Bi-Annual") === 0 && iterator.index === i + 1) {
                StartDate = iterator.message[1];
            }
            if (iterator.nameField.localeCompare("Instalment Bi-Annual") === 0 && iterator.index === i + 1) {
                EndDate = iterator.message[2];
            }
        }


        //#region Validate values on Instalment list
        let temp = await instalmentList.validateGuaranteeNoOnInstalmentList(GuaranteeNo, instalmentIndex);
        logFailTestcase(temp, "GuaranteeNo on Instalment List is incorrect!");

        temp = await instalmentList.validateDebtorOnInstalmentList(OrdererDebtor, instalmentIndex);
        logFailTestcase(temp, "OrdererDebtor on Instalment List is incorrect!");

        // temp = await instalmentList.validatePostedDateOnInstalmentList(PostedDate, instalmentIndex)
        // logFailTestcase(temp, "PostedDate on Instalment List is incorrect!");

        temp = await instalmentList.validateStartDateOnInstalmentList(StartDate, instalmentIndex);
        logFailTestcase(temp, "Period Start Guarantee on Instalment List is incorrect!");

        temp = await instalmentList.validateEndDateOnInstalmentList(EndDate, instalmentIndex);
        logFailTestcase(temp, "Period End Guarantee on Instalment List is incorrect!");

        temp = await instalmentList.validateAmountOnInstalmentList(numberToCurrency(TotalAmount, true), instalmentIndex);
        logFailTestcase(temp, "Total Amount on Instalment List is incorrect!");

        temp = await instalmentList.validateStatusOnInstalmentList(StatusInstalment, instalmentIndex);
        logFailTestcase(temp, "Status on Instalment List is incorrect!");
        //#endregion 

        //#region Validate values on Instalment form
        temp = await instalmentList.openInstalmentByRowOnList(instalmentIndex);
        logFailTestcase(temp, `Open Instalment at row ${instalmentIndex} failed!`);

        temp = await instalmentForm.validateInstalmentNoOnInstalmentForm(InstalmentNo);
        logFailTestcase(temp, "InstalmentNo on Instalment Form is incorrect!");

        // temp = await instalmentForm.validatePostedDateOnInstalmentForm(PostedDate);
        // logFailTestcase(temp, "PostedDate on Instalment Form is incorrect!");

        temp = await instalmentForm.validateCurrencyCodeOnInstalmentForm(numberToCurrency(TotalAmount, true));
        logFailTestcase(temp, "CurrencyCode on Instalment Form is incorrect!");


        //#region Validate values on Table on form
        // Date for all phases
        let StartDateAllPhases = "";
        let EndDateAllPhases = "";
        for (const iterator of dataTestcase) {
            if (iterator.nameField.localeCompare("Instalment Bi-Annual") === 0 && iterator.index === 1) {
                StartDateAllPhases = iterator.message[1];
            }
            if (iterator.nameField.localeCompare("Instalment Bi-Annual") === 0 && iterator.index === rows.length) {
                EndDateAllPhases = iterator.message[2];
            }
        }
        /**
         * Date for initial phase (thời gian lúc đầu)
         * period Establishment = start 1 đến End 2
         */
        let OldStartDate = "";
        let OldEndDate = "";
        for (const iterator of dataTestcase) {
            if (iterator.nameField.localeCompare("StartDate") === 0) {
                OldStartDate = iterator.message[0];
            }
            if (iterator.nameField.localeCompare("EndDate2") === 0) {
                OldEndDate = iterator.message[0];
            }
        }

        if (AmendmentFee) {
            temp = await instalmentForm.validateValueOnListInstalmentForm(
                "Payment for amendment",
                StartDateAllPhases,
                EndDateAllPhases,
                AmendmentFee
            )
            logFailTestcase(temp, "Values on Payment for amendment row is incorrect");
        }

        if (GuaranteeFeeGuaranteeFee) {
            temp = await instalmentForm.validateValueOnListInstalmentForm(
                "Bi-annual payment for",
                StartDate,
                EndDate,
                numberToCurrency(GuaranteeFeeGuaranteeFee)
            )
            logFailTestcase(temp, "Values on Guarantee fee row is incorrect");
        }

        if (EstablishmentFeeOtherFee) {
            temp = await instalmentForm.validateValueOnListInstalmentForm(
                "Payment for establishment",
                OldStartDate,
                OldEndDate,
                numberToCurrency(EstablishmentFeeOtherFee)
            )
            logFailTestcase(temp, "Values on Payment for establishment row is incorrect");
        }
        //#endregion


        temp = await instalmentForm.validateTotalAmountOnListInstalmentForm(numberToCurrency(TotalAmount));
        logFailTestcase(temp, "Total amount on Instalment form is incorrect!");

        await instalmentForm.closeInstalmentForm();
        await globalPageObject.waitForProgressBarLoaded_v2();

        logSuccessMessage(`\t=> Checking instalment at line ${instalmentIndex} passed!`);

        //#endregion
    }

});

/**
 * Bi-Annual 2 phase
 * Some instalments are new and paid/exported
 */
Then("System shows correct information of Instalment - Bi-Annual 2 phase - Some instalments are new and paid or exported {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    await globalPageObject.reloadTable(3000);
    await globalPageObject.waitForProgressBarLoaded_v2();

    // Tính toán Posted date, start date, end date cho các instalment
    calculateDateForInstalmentBiAnnual2Phase();

    // Search những instalment được tạo ra theo Guarantee No
    let GuaranteeNo = "Guarantee No";
    for (const iterator of dataTestcase) {
        if (iterator.nameField.localeCompare("Guarantee No") === 0) {
            GuaranteeNo = iterator.message[0];
        }
    }
    let temp = await instalmentList.inputSearchKeywordInstalment(GuaranteeNo);
    logFailTestcase(temp, "Input Search keyword on Instalment list failed!");

    temp = await instalmentList.pressSearchInstalment();
    logFailTestcase(temp, "Press Search keyword on Instalment list failed!");
    await globalPageObject.waitForProgressBarLoaded_v2();


    //#region  Revert Sort Instalment list by Posted Date as Default (click 2 lần nữa để về như ban đầu)
    await instalmentList.revertSortingPostedDateAsDefault();
    //#endregion

    //#region  Sort Instalment list by Posted Date
    temp = await instalmentList.pressSortInstalmentListByPostedDate();
    logFailTestcase(temp, "Press Sort Instalment list by Posted date failed!");
    await globalPageObject.waitForProgressBarLoaded_v2();
    //#endregion

    //#region Position of instalments by guarantee id
    let arrayInstalment: any[] = [];

    for (let i = 0; i < rows.length; i++) {
        arrayInstalment.push({ index: i + 1, startDate: "", endDate: "", amount: "" });
        const startDate = await instalmentList.getStartDateByRow(i + 1);
        const endDate = await instalmentList.getEndDateByRow(i + 1);
        const amount = await instalmentList.getAmountByRow(i + 1);

        if (startDate) {
            arrayInstalment[i].startDate = startDate;
        }
        if (endDate) {
            arrayInstalment[i].endDate = endDate;
        }
        if (amount) {
            arrayInstalment[i].amount = amount;
        }
    }

    // Remove element with startDate is null
    while (!arrayInstalment[arrayInstalment.length - 1].startDate) {
        arrayInstalment.pop();
    }

    //#endregion Verify instalment have duplicated records (start date, end date, amount)
    const n = arrayInstalment.length;
    for (let i = 0; i <= n - 2; i++) {
        for (let j = i + 1; j <= n - 1; j++) {
            if (arrayInstalment[i].startDate === arrayInstalment[j].startDate &&
                arrayInstalment[i].endDate === arrayInstalment[j].endDate &&
                arrayInstalment[i].amount === arrayInstalment[j].amount) {
                logFailTestcase(false, `Instalment has Start Date = ${arrayInstalment[i].startDate}, EndDate = ${arrayInstalment[i].endDate} is duplicated!`);
            }
        }
    }
    //#endregion

    //#region Declare arrayInstalmentFromFile (list instalment từ file và biến dataTestcase)
    let arrayInstalmentFromFile: any[] = [];
    let i = 0;
    for (const iterator of dataTestcase) {
        if (iterator.nameField.localeCompare("Instalment Bi-Annual") === 0 && i < rows.length) {
            arrayInstalmentFromFile.push({ index: i + 1, startDate: iterator.message[1], endDate: iterator.message[2], amount: numberToCurrency(rows[i].TotalAmount, true) });
            i++;
        }
    }
    //#endregion

    // Add property "id" for arrayInstalment, and set "id" as index of arrayInstalmentFromFile
    arrayInstalment.forEach(function (element) {
        element.id = arrayInstalmentFromFile.map(function (e) { return e.startDate; }).indexOf(element.startDate);
    });

    // Sort arrayInstalment by id
    arrayInstalment.sort(function (a, b) {
        return a.id - b.id;
    });

    logInfoMessage("Array Instalment");
    console.log(arrayInstalment);
    //#endregion


    // Validate all instalments
    for (let i = 0; i < rows.length; i++) {
        let instalmentIndex = arrayInstalment[i].index || i + 1;
        logWarningMessage(`Checking instalment at line ${i + 1}...`);

        const OrdererDebtor = rows[i].OrdererDebtor;
        const TotalAmount = rows[i].TotalAmount;
        const StatusInstalment = rows[i].StatusInstalment;

        const AmendmentFee = rows[i].AmendmentFee;
        const EstablishmentFeeOtherFee = rows[i].EstablishmentFeeOtherFee;
        const GuaranteeFeeGuaranteeFee = rows[i].GuaranteeFeeGuaranteeFee;


        const InstalmentNo = await instalmentList.getInstalmentNoByRow(instalmentIndex);

        // Date for each phase
        let PostedDate = "";
        let StartDate = "";
        let EndDate = "";

        for (const iterator of dataTestcase) {
            if (iterator.nameField.localeCompare("Guarantee No") === 0) {
                GuaranteeNo = iterator.message[0];
            }
            if (iterator.nameField.localeCompare("Instalment Bi-Annual") === 0 && iterator.index === i + 1) {
                PostedDate = iterator.message[0];
            }
            if (iterator.nameField.localeCompare("Instalment Bi-Annual") === 0 && iterator.index === i + 1) {
                StartDate = iterator.message[1];
            }
            if (iterator.nameField.localeCompare("Instalment Bi-Annual") === 0 && iterator.index === i + 1) {
                EndDate = iterator.message[2];
            }
        }


        //#region Validate values on Instalment list
        let temp = await instalmentList.validateGuaranteeNoOnInstalmentList(GuaranteeNo, instalmentIndex);
        logFailTestcase(temp, "GuaranteeNo on Instalment List is incorrect!");

        temp = await instalmentList.validateDebtorOnInstalmentList(OrdererDebtor, instalmentIndex);
        logFailTestcase(temp, "OrdererDebtor on Instalment List is incorrect!");

        // temp = await instalmentList.validatePostedDateOnInstalmentList(PostedDate, instalmentIndex)
        // logFailTestcase(temp, "PostedDate on Instalment List is incorrect!");

        temp = await instalmentList.validateStartDateOnInstalmentList(StartDate, instalmentIndex);
        logFailTestcase(temp, "Period Start Guarantee on Instalment List is incorrect!");

        temp = await instalmentList.validateEndDateOnInstalmentList(EndDate, instalmentIndex);
        logFailTestcase(temp, "Period End Guarantee on Instalment List is incorrect!");

        temp = await instalmentList.validateAmountOnInstalmentList(numberToCurrency(TotalAmount, true), instalmentIndex);
        logFailTestcase(temp, "Total Amount on Instalment List is incorrect!");

        temp = await instalmentList.validateStatusOnInstalmentList(StatusInstalment, instalmentIndex);
        logFailTestcase(temp, "Status on Instalment List is incorrect!");
        //#endregion 

        //#region Validate values on Instalment form
        temp = await instalmentList.openInstalmentByRowOnList(instalmentIndex);
        logFailTestcase(temp, `Open Instalment at row ${instalmentIndex} failed!`);

        temp = await instalmentForm.validateInstalmentNoOnInstalmentForm(InstalmentNo);
        logFailTestcase(temp, "InstalmentNo on Instalment Form is incorrect!");

        // temp = await instalmentForm.validatePostedDateOnInstalmentForm(PostedDate);
        // logFailTestcase(temp, "PostedDate on Instalment Form is incorrect!");

        temp = await instalmentForm.validateCurrencyCodeOnInstalmentForm(numberToCurrency(TotalAmount, true));
        logFailTestcase(temp, "CurrencyCode on Instalment Form is incorrect!");

        //#region Validate values on Table on form
        // Date for all phases
        let StartDateAllPhases = "";
        let EndDateAllPhases = "";
        for (const iterator of dataTestcase) {
            if (iterator.nameField.localeCompare("Instalment Bi-Annual") === 0 && iterator.index === 1) {
                StartDateAllPhases = iterator.message[1];
            }
            if (iterator.nameField.localeCompare("Instalment Bi-Annual") === 0 && iterator.index === rows.length) {
                EndDateAllPhases = iterator.message[2];
            }
        }

        for (const iterator of dataTestcase) {
            if (iterator.nameField.localeCompare("NewEndDate2") === 0) {
                EndDateAllPhases = iterator.message[0];
            }
        }
        /**
         * Date for initial phase (thời gian lúc đầu)
         * period Establishment = start 1 đến End 2
         */
        let OldStartDate = "";
        let OldEndDate = "";
        for (const iterator of dataTestcase) {
            if (iterator.nameField.localeCompare("StartDate") === 0) {
                OldStartDate = iterator.message[0];
            }
            if (iterator.nameField.localeCompare("EndDate2") === 0) {
                OldEndDate = iterator.message[0];
            }
        }

        if (AmendmentFee) {
            temp = await instalmentForm.validateValueOnListInstalmentForm(
                "Payment for amendment",
                StartDateAllPhases,
                EndDateAllPhases,
                AmendmentFee
            )
            logFailTestcase(temp, "Values on Payment for amendment row is incorrect");
        }

        if (GuaranteeFeeGuaranteeFee) {
            temp = await instalmentForm.validateValueOnListInstalmentForm(
                "Bi-annual payment for",
                StartDate,
                EndDate,
                numberToCurrency(GuaranteeFeeGuaranteeFee)
            )
            logFailTestcase(temp, "Values on Guarantee fee row is incorrect");
        }

        if (EstablishmentFeeOtherFee) {
            temp = await instalmentForm.validateValueOnListInstalmentForm(
                "Payment for establishment",
                OldStartDate,
                OldEndDate,
                numberToCurrency(EstablishmentFeeOtherFee)
            )
            logFailTestcase(temp, "Values on Payment for establishment row is incorrect");
        }
        //#endregion


        temp = await instalmentForm.validateTotalAmountOnListInstalmentForm(numberToCurrency(TotalAmount));
        logFailTestcase(temp, "Total amount on Instalment form is incorrect!");

        await instalmentForm.closeInstalmentForm();
        await globalPageObject.waitForProgressBarLoaded_v2();

        logSuccessMessage(`\t=> Checking instalment at line ${instalmentIndex} passed!`);

        //#endregion
    }

});

/**
 * Verify posted date for instalment list
 */
Then("User verifies posted date of Instalment in HOGS project {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    await globalPageObject.waitForProgressBarLoaded_v2();


    // Search những instalment được tạo ra theo Guarantee No
    let GuaranteeNo = "Guarantee No";
    for (const iterator of dataTestcase) {
        if (iterator.nameField.localeCompare("Guarantee No") === 0) {
            GuaranteeNo = iterator.message[0];
        }
    }
    let temp = await instalmentList.inputSearchKeywordInstalment(GuaranteeNo);
    logFailTestcase(temp, "Input Search keyword on Instalment list failed!");

    temp = await instalmentList.pressSearchInstalment();
    logFailTestcase(temp, "Press Search keyword on Instalment list failed!");
    await globalPageObject.waitForProgressBarLoaded_v2();


    // Validate all instalments
    for (let i = 0; i < rows.length; i++) {
        let instalmentIndex = i + 1;
        logWarningMessage(`\t==> Checking instalment at line ${i + 1}...`);

        const startDate = await instalmentList.getStartDateByRow(instalmentIndex);
        let postedDate = getPostedDateForHogsTenant(startDate);

        //#region For only HOGSE project test case SAAS-18167
        const status = await instalmentList.getStatusByRow(instalmentIndex);
        if(status.trim() === "Paid"){
            postedDate = '';
        }
        //#endregion

        //#region Validate values on Instalment list

        if(postedDate){
            temp = await instalmentList.validatePostedDateOnInstalmentList(postedDate, instalmentIndex)
            logFailTestcase(temp, "PostedDate on Instalment List is incorrect!");    
        }
        

        //#region Validate values on Table on form
        temp = await instalmentList.openInstalmentByRowOnList(instalmentIndex);
        logFailTestcase(temp, `Open instalment at row "${instalmentIndex}" failed!`);

        if(postedDate){
            temp = await instalmentForm.validatePostedDateOnInstalmentForm(postedDate);
            logFailTestcase(temp, "PostedDate on Instalment form is incorrect!");
        }
        
        //#endregion
        await instalmentForm.closeInstalmentForm();
        await globalPageObject.waitForProgressBarLoaded_v2();

        logSuccessMessage(`\t=> Checking instalment at line ${instalmentIndex} passed!`);

        //#endregion
    }
    await globalPageObject.waitForProgressBarLoaded_v2();
    await globalPageObject.closeOpeningForm();
    await instalmentForm.closeInstalmentForm();
});