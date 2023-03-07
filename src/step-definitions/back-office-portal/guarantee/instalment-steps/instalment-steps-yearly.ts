import { Before, Then } from "@cucumber/cucumber";
import { compareDesc } from "date-fns";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { GlobalPeripherals } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPeripherals";
import { InstalmentList } from "../../../../page-objects/back-office-portal/guarantee/instalment/instalment-list/InstalmentList";
import { InstalmentForm } from "../../../../page-objects/back-office-portal/guarantee/instalment/intstalment-forms/InstalmentForm";
import { ValidateField } from "../../../../shared/classes";
import { addDate, addYear, compareDate, convertPathFileDataToDataRegression, logFailTestcase, logInfoMessage, logSuccessMessage, logWarningMessage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { numberToCurrency } from "../../../../shared/tenant-setting/tenant-setting";
import { dataTestcase } from "../../../../shared/variables";

const loader = require("csv-load-sync");

let globalPageObject: GlobalPageObject;
let globalPeripherals: GlobalPeripherals;
let instalmentList: InstalmentList;
let instalmentForm: InstalmentForm;

Before(async function () {
    const context: ICommonContext = this.context;
    globalPageObject = new GlobalPageObject(context.driverService);
    globalPeripherals = new GlobalPeripherals(context.driverService);
    instalmentList = new InstalmentList(context.driverService);
    instalmentForm = new InstalmentForm(context.driverService);
});

/**
 * Calculate Effected date, Start date, EndDate for instalment Yearly 1 Phase
 * All Instalment are new
 */
function calculateDateForInstalmentYearly1PhaseAllInstalmentAreNew() {
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

        for (let i = 1; i <= 20; i++) {
            const postedDate = addDate(startDateTemp, 1);
            const startDate = startDateTemp;
            const endDate = addDate(addYear(startDateTemp, 1), -1);
            startDateTemp = addDate(endDate, 1);
            dataTestcase.push(new ValidateField(`Instalment Yearly`, i, true, [postedDate, startDate, endDate], []));
        }

        for (const iterator of dataTestcase) {
            if (iterator.nameField.localeCompare("NewEndDate") === 0) {
                newEndDateTemp = iterator.message[0];
            }
        }

        for (let i = 0; i < dataTestcase.length; i++) {
            if (dataTestcase[i].nameField.localeCompare("Instalment Yearly") === 0) {
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

    } catch (error) {
        console.log(error);
        logWarningMessage("calculateDateForInstalmentYearly1Phase failed!");
    }
}

/**
 * Calculate Effected date, Start date, EndDate for instalment Yearly 1 Phase
 * All Instalment are new
 */
function calculateDateForInstalmentYearly1PhaseAllInstalmentArePaidExported() {
    try {
        let startDateTemp = "";
        let newEndDate = "";
        let endDate = "";
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
            const postedDate = addDate(startDateTemp, 1);
            const startDate = startDateTemp;
            const endDate = addDate(addYear(startDateTemp, 1), -1);
            startDateTemp = addDate(endDate, 1);
            dataTestcase.push(new ValidateField(`Instalment Yearly`, i, true, [postedDate, startDate, endDate], []));
        }

        for (const iterator of dataTestcase) {
            if (iterator.nameField.localeCompare("NewEndDate") === 0) {
                newEndDate = iterator.message[0];
            }
            if (iterator.nameField.localeCompare("EndDate") === 0) {
                endDate = iterator.message[0];
            }
        }

        /**
         * There are 3 case
         * Case 1: New End Date > End Date
         * Case 2: New End Date < End Date
         * Case 3: New End Date = End Date
         */
        if (compareDate(endDate, newEndDate) === 1) {
            for (const iterator of dataTestcase) {
                if (iterator.nameField.localeCompare("Instalment Yearly") === 0) {
                    const startDateIterator = iterator.message[1];
                    const endDateIterator = iterator.message[2];
                    // if startDate < newEndDate < EndDate
                    if (compareDate(startDateIterator, newEndDate) === 1 && compareDate(newEndDate, endDateIterator) === 1) {
                        iterator.message[2] = newEndDate;
                        break;
                    }
                }
            }
        }
        else if (compareDate(endDate, newEndDate) === -1) {
            for (let i = 0; i < dataTestcase.length; i++) {
                if (dataTestcase[i].nameField.localeCompare("Instalment Yearly") === 0) {
                    const startDateIterator = dataTestcase[i].message[1];
                    const endDateIterator = dataTestcase[i].message[2];
                    // if startDate < newEndDate < EndDate
                    if (compareDate(startDateIterator, newEndDate) === 1 && compareDate(newEndDate, endDateIterator) === 1) {
                        if (dataTestcase[i + 1].nameField.localeCompare("Instalment Yearly") === 0) {
                            dataTestcase[i + 1].message[1] = dataTestcase[i].message[1];
                            dataTestcase[i + 1].message[2] = newEndDate;
                            break;
                        }
                    }
                }
            }
        }
        else {
            for (let i = 0; i < dataTestcase.length; i++) {
                if (dataTestcase[i].nameField.localeCompare("Instalment Yearly") === 0) {
                    const endDateIterator = dataTestcase[i].message[2];
                    // if startDate < newEndDate < EndDate
                    if (compareDate(newEndDate, endDateIterator) === 0) {
                        if (dataTestcase[i + 1] && dataTestcase[i + 1].nameField.localeCompare("Instalment Yearly") === 0) {
                            dataTestcase[i + 1].message[1] = dataTestcase[i].message[1];
                            dataTestcase[i + 1].message[2] = dataTestcase[i].message[2];
                            break;
                        }
                    }
                }
            }
        }
    } catch (error) {
        console.log(error);
        logWarningMessage("calculateDateForInstalmentYearly1PhaseAllInstalmentArePaidExported failed!");
    }
}


/**
 * Calculate Effected date, Start date, EndDate for instalment Yearly 2 Phase
 */
function calculateDateForInstalmentYearly2Phase() {
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

        for (let i = 1; i <= 40; i++) {
            const postedDate = "PostedDate has been not yet calculated";
            const startDate = startDateTemp;
            let endDate = addDate(addYear(startDateTemp, 1), -1);

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

            // New End Date for Phase 2 if exist
            let NewEndDate2 = endDate;
            for (const iterator of dataTestcase) {
                if (iterator.nameField.localeCompare("NewEndDate2") === 0) {
                    NewEndDate2 = iterator.message[0];
                }
            }
            if (compareDate(startDate, NewEndDate2) === 1 && compareDate(NewEndDate2, endDate) === 1) {
                endDate = NewEndDate2;
            }

            startDateTemp = addDate(endDate, 1);
            dataTestcase.push(new ValidateField(`Instalment Yearly`, i, true, [postedDate, startDate, endDate], []));
        }
    } catch (error) {
        console.log(error);
        logWarningMessage("calculateDateForInstalmentYearly2Phase failed!");
    }
}


/**
 * Instalment đầu tiên có thể duplicate với instlament thứ 2
 */
function addOneMoreInstalmentExported() {
    // Phase 1: StartDate, EndDate
    // Phase 2: StartDate2, EndDate2, NewStartDate2, NewEndDate2
    try {

        for (let i = 0; i < dataTestcase.length; i++) {
            if (dataTestcase[i].nameField.localeCompare("Instalment Yearly") === 0) {

                let startDate = "";
                for (const iterator of dataTestcase) {
                    if (iterator.nameField.localeCompare("StartDate") === 0) {
                        startDate = iterator.message[0];
                    }
                }
                const endDate = addDate(addYear(startDate, 1), -1);

                const postedDate = dataTestcase[i].message[0];

                dataTestcase.splice(i, 0, new ValidateField(`Instalment Yearly`, 0, true, [postedDate, startDate, endDate], []));
                break;
            }
        }
        for (const iterator of dataTestcase) {
            if (iterator.nameField.localeCompare("Instalment Yearly") === 0) {
                iterator.index++;
            }
        }
    } catch (error) {
        console.log(error);
        logWarningMessage("addOneMoreInstalmentExported failed!");
    }
}

/**
 * Instalment Yearly 1 phase
 * All instalment are new
 */
Then("System shows correct information of Instalment - Yearly 1 phase - All instalments are new {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    await globalPageObject.reloadTable(3000);
    await globalPageObject.waitForProgressBarLoaded_v2();

    // Tính toán Posted date, start date, end date cho các instalment
    calculateDateForInstalmentYearly1PhaseAllInstalmentAreNew();

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
        if (iterator.nameField.localeCompare("Instalment Yearly") === 0 && i < rows.length) {
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
            if (iterator.nameField.localeCompare("Instalment Yearly") === 0 && iterator.index === i + 1) {
                PostedDate = iterator.message[0];
            }
            if (iterator.nameField.localeCompare("Instalment Yearly") === 0 && iterator.index === i + 1) {
                StartDate = iterator.message[1];
            }
            if (iterator.nameField.localeCompare("Instalment Yearly") === 0 && iterator.index === i + 1) {
                EndDate = iterator.message[2];
            }
        }

        for (const iterator of dataTestcase) {
            if (iterator.nameField.localeCompare("NewEndDate") === 0) {
                let newEndDate = iterator.message[0];
                if (compareDate(newEndDate, EndDate) === 1) {
                    EndDate = newEndDate;
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
        // Date for amendment
        let StartDateAmendment = "";
        let EndDateAmendment = "";
        for (const iterator of dataTestcase) {
            if (iterator.nameField.localeCompare("Instalment Yearly") === 0 && iterator.index === 1) {
                StartDateAmendment = iterator.message[1];
            }
            if (iterator.nameField.localeCompare("Instalment Yearly") === 0 && iterator.index === rows.length) {
                EndDateAmendment = iterator.message[2];
            }
        }

        let newEndDateTemp = "";
        for (const iterator of dataTestcase) {
            if (iterator.nameField.localeCompare("NewEndDate") === 0) {
                newEndDateTemp = iterator.message[0];
            }
        }

        if (compareDate(newEndDateTemp, EndDateAmendment) === 1) {
            EndDateAmendment = newEndDateTemp;
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
                "Yearly payment for",
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
 * Instalment Yearly 1 phase
 * All instalment are paid/exported
 */
Then("System shows correct information of Instalment - Yearly 1 phase - All instalments are paid or exported {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    await globalPageObject.reloadTable(3000);
    await globalPageObject.waitForProgressBarLoaded_v2();

    // Tính toán Posted date, start date, end date cho các instalment
    calculateDateForInstalmentYearly1PhaseAllInstalmentArePaidExported();

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
        if (iterator.nameField.localeCompare("Instalment Yearly") === 0 && i < rows.length) {
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
            if (iterator.nameField.localeCompare("Instalment Yearly") === 0 && iterator.index === i + 1) {
                PostedDate = iterator.message[0];
            }
            if (iterator.nameField.localeCompare("Instalment Yearly") === 0 && iterator.index === i + 1) {
                StartDate = iterator.message[1];
            }
            if (iterator.nameField.localeCompare("Instalment Yearly") === 0 && iterator.index === i + 1) {
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
        // Date for amendment
        let StartDateAmendment = "";
        let EndDateAmendment = "";
        for (const iterator of dataTestcase) {
            if (iterator.nameField.localeCompare("Instalment Yearly") === 0 && iterator.index === 1) {
                StartDateAmendment = iterator.message[1];
            }
            if (iterator.nameField.localeCompare("Instalment Yearly") === 0 && iterator.index === rows.length) {
                EndDateAmendment = iterator.message[2];
            }
        }

        let newEndDateTemp = "";
        for (const iterator of dataTestcase) {
            if (iterator.nameField.localeCompare("NewEndDate") === 0) {
                newEndDateTemp = iterator.message[0];
            }
        }

        if (compareDate(newEndDateTemp, EndDateAmendment) === 1) {
            EndDateAmendment = newEndDateTemp;
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
                "Yearly payment for",
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
 * Yearly 2 phase
 * All instalments are new
 */
Then("System shows correct information of Instalment - Yearly 2 phase - All instalments are new {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    await globalPageObject.reloadTable(3000);
    await globalPageObject.waitForProgressBarLoaded_v2();

    // Tính toán Posted date, start date, end date cho các instalment
    calculateDateForInstalmentYearly2Phase();

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

    await globalPageObject.expandNumberOfItemSubList();
    await globalPeripherals.pressTabCurrentElement();
    await globalPeripherals.pressTabCurrentElement();


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
        if (iterator.nameField.localeCompare("Instalment Yearly") === 0 && i < rows.length) {
            arrayInstalmentFromFile.push({ index: i + 1, startDate: iterator.message[1], endDate: iterator.message[2], amount: numberToCurrency(rows[i].TotalAmount, true) });
            i++;
        }
    }
    //#endregion


    logInfoMessage("Array arrayInstalmentFromFile");
    console.log(arrayInstalmentFromFile);

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
            if (iterator.nameField.localeCompare("Instalment Yearly") === 0 && iterator.index === i + 1) {
                PostedDate = iterator.message[0];
            }
            if (iterator.nameField.localeCompare("Instalment Yearly") === 0 && iterator.index === i + 1) {
                StartDate = iterator.message[1];
            }
            if (iterator.nameField.localeCompare("Instalment Yearly") === 0 && iterator.index === i + 1) {
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
            if (iterator.nameField.localeCompare("Instalment Yearly") === 0 && iterator.index === 1) {
                StartDateAllPhases = iterator.message[1];
            }
            if (iterator.nameField.localeCompare("Instalment Yearly") === 0 && iterator.index === rows.length) {
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
                "Yearly payment for",
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
 * Yearly 2 phase
 * Some instalments are new and paid/exported
 */
Then("System shows correct information of Instalment - Yearly 2 phase - Some instalments are new and paid or exported {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    await globalPageObject.reloadTable(3000);
    await globalPageObject.waitForProgressBarLoaded_v2();

    // Tính toán Posted date, start date, end date cho các instalment
    calculateDateForInstalmentYearly2Phase();

    /**
     * IsRefund: là test case có refund lại tiền
     * IsExtednPhase1: là test case mình extend Period end của Phase 1
     * IsChangeAmountPhase1: là test case mình có thay đổi (tăng hoặc giảm) guarantee amount của phase 1
     */
    const IsRefund = rows[0].IsRefund || "No";
    const IsExtendPhase1 = rows[0].IsExtendPhase1 || "No";
    const IsChangeAmountPhase1 = rows[0].IsChangeAmountPhase1 || "No";

    if (IsChangeAmountPhase1.toLocaleLowerCase().localeCompare("yes") === 0 || IsRefund.toLocaleLowerCase().localeCompare("yes") === 0) {
        addOneMoreInstalmentExported();
    }

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
        if (iterator.nameField.localeCompare("Instalment Yearly") === 0 && i < rows.length) {
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
            if (iterator.nameField.localeCompare("Instalment Yearly") === 0 && iterator.index === i + 1) {
                PostedDate = iterator.message[0];
            }
            if (iterator.nameField.localeCompare("Instalment Yearly") === 0 && iterator.index === i + 1) {
                StartDate = iterator.message[1];
            }
            if (iterator.nameField.localeCompare("Instalment Yearly") === 0 && iterator.index === i + 1) {
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
            if (iterator.nameField.localeCompare("Instalment Yearly") === 0 && iterator.index === 1) {
                StartDateAllPhases = iterator.message[1];
            }
            if (iterator.nameField.localeCompare("Instalment Yearly") === 0 && iterator.index === rows.length) {
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
                "Yearly payment for",
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