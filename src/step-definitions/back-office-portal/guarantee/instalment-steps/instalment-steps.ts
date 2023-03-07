import { Before, Then, When } from "@cucumber/cucumber";
import { filename } from "winston-daily-rotate-file";
import { GlobalBrowserWindowHandle } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalBrowserWindowHandle";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { InstalmentList } from "../../../../page-objects/back-office-portal/guarantee/instalment/instalment-list/InstalmentList";
import { InstalmentForm } from "../../../../page-objects/back-office-portal/guarantee/instalment/intstalment-forms/InstalmentForm";
import { updateInstalment } from "../../../../shared/function-api-bisnode";
import { getPostedDateForHogsTenant } from "../../../../shared/function-hogs-project";
import { convertPathFileDataToDataRegression, getDate, getLineInFileTxt, logFailTestcase, logInfoMessage, updateValueToCSVfile } from "../../../../shared/functions";
import { Helpers } from "../../../../shared/helpers";
import { ICommonContext } from "../../../../shared/interfaces";
import { currencyToNumber, getDefaultCurrency, numberToCurrency } from "../../../../shared/tenant-setting/tenant-setting";
import { dataTestcase, dataTestExecution, fileNameLogin, scenarioTags } from "../../../../shared/variables";
import { ValidateField } from "../../../../shared/classes";
import { getValueDataOfDataTestExecution, pushObjectToDataArrayWithUniqueKey } from "../../../../storage-data/functions/data-test-execution";

const loader = require("csv-load-sync");

let globalPageObject: GlobalPageObject;
let globalBrowserWindowHandle: GlobalBrowserWindowHandle;
let instalmentList: InstalmentList;
let instalmentForm: InstalmentForm;

Before(async function () {
    const context: ICommonContext = this.context;
    globalPageObject = new GlobalPageObject(context.driverService);
    globalBrowserWindowHandle = new GlobalBrowserWindowHandle(context.driverService);
    instalmentList = new InstalmentList(context.driverService);
    instalmentForm = new InstalmentForm(context.driverService);
});


Then("User navigates to Instalment List", async () => {
    let temp = await globalPageObject.navigateToSubInstalment();
    logFailTestcase(temp, "navigates to Instalment List failed!");

    //#region  Revert Sort Instalment list by Posted Date as Default (click 2 lần nữa để về như ban đầu)
    await instalmentList.revertSortingPostedDateAsDefault();
    //#endregion
});

/**In this steps, we will use API to send request to update Posted date and Status of Instalment.
 * Because in manually, we will wait for about some days Instalment auto update status to Exported
 */
When("User exports an instalment at Instalment list {string}", async (filename) => {
    // Call API to changes Installment
    const username = getLineInFileTxt(fileNameLogin, 1).substring(9);
    const passwordEncode = getLineInFileTxt(fileNameLogin, 2).substring(9);
    const passwordDecode = Helpers.decode(passwordEncode);
    await instalmentForm.closeInstalmentForm();
    const rows = loader(convertPathFileDataToDataRegression(filename));
    for (let i = 0; i < rows.length; i++) {
        const PostedDateMinusToday = rows[i].PostedDateMinusToday;
        const StatusInstalment = rows[i].StatusInstalment;

        const PostedDate = getDate(PostedDateMinusToday);

        // Get Id instalment
        let temp = await instalmentList.openInstalmentByRowOnList(i + 1);
        logFailTestcase(temp, "Open Instalment failed!");

        const url = await globalBrowserWindowHandle.getCurrentUrl();
        const id = url.substring(url.lastIndexOf("=") + 1, url.length);

        temp = await updateInstalment(PostedDate, StatusInstalment, username, passwordDecode, id);
        logFailTestcase(temp && temp.toString() === "200", "Update Instalment failed!");

        await globalPageObject.closeOpeningForm();
    }

    await globalPageObject.reloadTable(7000);
});

/**In this steps, we will use API to send request to update Posted date and Status of Instalment.
 * Because in manually, we will wait for about some days Instalment auto update status to Exported
 * Dùng steps này trường hợp Instalment không sort theo Instalment No
 */
When("User exports instalments at Instalment list sorted by Instalment No {string}", async (filename) => {
    // Call API to changes Installment
    const username = getLineInFileTxt(fileNameLogin, 1).substring(9);
    const passwordEncode = getLineInFileTxt(fileNameLogin, 2).substring(9);
    const passwordDecode = Helpers.decode(passwordEncode);


    const rows = loader(convertPathFileDataToDataRegression(filename));

    //#region Position of instalments by guarantee id
    let arrayInstalment: any[] = [];
    const TotalInstalments = parseInt(rows[0].TotalInstalments); // Tổng số instalment được tạo ra
    for (let i = 0; i < TotalInstalments; i++) {
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



    for (let i = 0; i < rows.length; i++) {
        const PostedDateMinusToday = rows[i].PostedDateMinusToday;
        const StatusInstalment = rows[i].StatusInstalment;

        const PostedDate = getDate(PostedDateMinusToday);

        // Get Id instalment
        let temp = await instalmentList.openInstalmentByRowOnList(arrayInstalment[i].index);
        logFailTestcase(temp, "Open Instalment failed!");

        const url = await globalBrowserWindowHandle.getCurrentUrl();
        const id = url.substring(url.lastIndexOf("=") + 1, url.length);

        temp = await updateInstalment(PostedDate, StatusInstalment, username, passwordDecode, id);
        logFailTestcase(temp && temp.toString() === "200", "Update Instalment failed!");

        await globalPageObject.closeOpeningForm();
    }

    await globalPageObject.reloadTable(7000);
});

Then("System shows correct information at Instalment list {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    await globalPageObject.reloadTable(6000);
    await globalPageObject.waitForProgressBarLoaded_v2();

    const Type = row.Type;
    const OrdererDebtor = row.OrdererDebtor;

    let PeriodStartGuarantee = row.PeriodStartGuarantee;

    const TotalAmount = numberToCurrency(currencyToNumber(row.TotalAmount));
    const StatusInstalment = row.StatusInstalment;
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
    // Không thể để chung 1 dòng for được, phải để riêng dòng for và thứ tự cần phải để đúng

    let GuaranteeNo = "Guarantee No";
    for (const iterator of dataTestcase) {
        if (iterator.nameField.localeCompare("Guarantee No") === 0) {
            GuaranteeNo = iterator.message[0];
        }
    }

    //#region get Posted date

    let PostedDate: string;
    if ((ProjectName && ProjectName.localeCompare("Atlas") === 0) || scenarioTags.has("@Atlas")) {
        PostedDate = getDate(+2);
    } else if (ProjectName && ProjectName.localeCompare("Hogs-NTS") === 0) {
        PostedDate = getDate(0);
    } else{
        PostedDate = getPostedDateForHogsTenant(PeriodStartGuarantee);
    }
    //#endregion


    let temp = true;
    if (!ProjectName || ProjectName.localeCompare("Hogs-NTS") != 0) {
        temp = await instalmentList.validateGuaranteeNoOnInstalmentList(GuaranteeNo);
        logFailTestcase(temp, "GuaranteeNo on Instalment List is incorrect!");
    }

    if(OrdererDebtor){
        if(scenarioTags.has("@HOGSE")){
            temp = await instalmentList.validateDebtorOnInstalmentList(OrdererDebtor);
            logFailTestcase(temp, "OrdererDebtor on Instalment List is incorrect!");
        }
    }
    if (PostedDate) {
        temp = await instalmentList.validatePostedDateOnInstalmentList(PostedDate);
        logFailTestcase(temp, "PostedDate on Instalment List is incorrect!");
    }

    temp = await instalmentList.validateStartDateOnInstalmentList(PeriodStartGuarantee);
    logFailTestcase(temp, "Period Start Guarantee on Instalment List is incorrect!");

    temp = await instalmentList.validateEndDateOnInstalmentList(ActualPeriodEnd);
    logFailTestcase(temp, "Period End Guarantee on Instalment List is incorrect!");

    temp = await instalmentList.validateAmountOnInstalmentList(TotalAmount + " " + getDefaultCurrency());
    logFailTestcase(temp, "Total Amount on Instalment List is incorrect!");

    temp = await instalmentList.validateStatusOnInstalmentList(StatusInstalment);
    logFailTestcase(temp, "Status on Instalment List is incorrect!");

    const InstalmentNo = await instalmentList.getInstalmentNoByRow(1);
    dataTestcase.push(new ValidateField("Instalment No", 1, true, [InstalmentNo], []));
});

Then("System changes status of the instalment to {string} at instalment list", async (statusName) => {
    await globalPageObject.reloadTable(3000);
    await globalPageObject.waitForProgressBarLoaded_v2();
    let temp = await instalmentList.validateStatusOnInstalmentList(statusName, 1);
    logFailTestcase(temp, `System changes ${statusName} status of the instalment failed`);
});

Then("System shows correct information at Instalment form {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    await globalPageObject.reloadTable(3000);
    await globalPageObject.waitForProgressBarLoaded_v2();

    const Type = row.Type;
    const OrdererDebtor = row.OrdererDebtor;

    let PeriodStartGuarantee = row.PeriodStartGuarantee;


    const GuaranteeFeeGuaranteeFee = numberToCurrency(currencyToNumber(row.GuaranteeFeeGuaranteeFee || "NaN"));
    const EstablishmentFeeOtherFee = row.EstablishmentFeeOtherFee;
    const TotalAmount = numberToCurrency(currencyToNumber(row.TotalAmount));
    const AmendmentFee = row.AmendmentFee;
    const ProjectName = row.ProjectName;
    let TotalGuaranteeFeeGuaranteeFee = "";
    let PeriodEndGuarantee = row.PeriodEndGuarantee;
    let ActualPeriodEnd = "";
    let temp = true;

    if (Type && Type.localeCompare("One Phase") === 0) {
        TotalGuaranteeFeeGuaranteeFee = GuaranteeFeeGuaranteeFee;
    }
    else {
        ActualPeriodEnd = row.PeriodEndGuaranteePhase2;
        TotalGuaranteeFeeGuaranteeFee = numberToCurrency(row.TotalGuaranteeFeeGuaranteeFee || "NaN");
    }


    if (row.IsBackDatedGurantee && row.IsBackDatedGurantee.localeCompare("Yes") === 0) {
        PeriodStartGuarantee = getDate(-364);
        PeriodEndGuarantee = getDate();
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




    const InstalmentNo = await instalmentList.getInstalmentNoByRow(1);

    temp = await instalmentList.openInstalmentByRowOnList(1);
    await globalPageObject.waitForProgressBarLoaded_v2();
    logFailTestcase(temp, "open Instalment By Row failed!");

    if (EstablishmentFeeOtherFee) {
        temp = await instalmentForm.validateValueOnListInstalmentForm(
            "Payment for establishment",
            PeriodStartGuarantee,
            ActualPeriodEnd,
            EstablishmentFeeOtherFee
        )
        logFailTestcase(temp, "Values on Payment for establishment row is incorrect");
    }

    //#region get Posted date

    let PostedDate: string;
    if ((ProjectName && ProjectName.localeCompare("Atlas") === 0) || scenarioTags.has("@Atlas")){
        PostedDate = getDate(+2);
    } else if (ProjectName && ProjectName.localeCompare("Hogs-NTS") === 0) {
        PostedDate = getDate(0);
    } else{
        PostedDate = getPostedDateForHogsTenant(PeriodStartGuarantee);
    }
    //#endregion

    temp = await instalmentForm.validateInstalmentNoOnInstalmentForm(InstalmentNo);
    logFailTestcase(temp, "InstalmentNo on Instalment Form is incorrect!");

    if (PostedDate) {
        temp = await instalmentForm.validatePostedDateOnInstalmentForm(PostedDate);
        logFailTestcase(temp, "PostedDate on Instalment Form is incorrect!");
    }

    temp = await instalmentForm.validateCurrencyCodeOnInstalmentForm(TotalAmount + " " + getDefaultCurrency());
    logFailTestcase(temp, "CurrencyCode on Instalment Form is incorrect!");

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

    temp = await instalmentForm.validateValueOnListInstalmentForm(
        "Upfront payment",
        PeriodStartGuarantee,
        ActualPeriodEnd,
        TotalGuaranteeFeeGuaranteeFee
    )
    logFailTestcase(temp, "Values on Upfront payment row is incorrect!");


    if (AmendmentFee) {
        temp = await instalmentForm.validateValueOnListInstalmentForm(
            "Payment for amendment",
            PeriodStartGuarantee,
            ActualPeriodEnd,
            AmendmentFee
        )
        logFailTestcase(temp, "Values on Payment for amendment row is incorrect");
    }

    temp = await instalmentForm.validateTotalAmountOnListInstalmentForm(TotalAmount);
    logFailTestcase(temp, "Total amount on Instalment form is incorrect!")

    await instalmentForm.closeInstalmentForm();
    await globalPageObject.closeOpeningForm();
    await globalPageObject.waitForProgressBarLoaded_v2();
});

When("User searches instalments by created guarantee", async () => {
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
});

When("User presses {string} button at the first instalment on Instalment list {string}", async (buttonName, filename) => {
    let temp = true;
    if (buttonName.localeCompare("Synchoronize") === 0) {
        temp = await instalmentList.synchronizeInstalmentTo24SevenByRow();
        logFailTestcase(temp, "press Synchoronize button on instalment list failed!");
    }else if (buttonName.localeCompare("Mark as paid") === 0){
        temp = await instalmentList.clickMarkAsPaidInstalmentByRow();
        logFailTestcase(temp, "press mark as paid button on instalment list failed!");
    }

});

When("User stores the instalment has been changed Posted date to Data Test Execution", async ()=>{
    const instalmentNo = await instalmentList.getInstalmentNoByRow(1);
    const url = await globalBrowserWindowHandle.getCurrentUrl();
    dataTestExecution.data[0].key = "url";
    dataTestExecution.data[0].value = url;
    pushObjectToDataArrayWithUniqueKey("Instalment No", instalmentNo);
});

Then("User searches an Instalment at Instalment list from DataTestExecution", async () => {
    const instalmentNo = getValueDataOfDataTestExecution("Instalment No");
    let temp = await instalmentList.inputSearchKeywordInstalment(instalmentNo);
    logFailTestcase(temp, `Input instlamentNo = ${instalmentNo} into Search Key word failed!`);
    temp = await instalmentList.pressSearchInstalment();
    logFailTestcase(temp, "Press search Instalment failed!");
});

Then("User presses Mark as paid button of the first instalment at instalment list", async () =>{
    const temp = await instalmentList.pressMarkAsPaidInstalmentByRowOnList();
    logFailTestcase(temp, "Press Mark as Paid at row 1 failed!");
});

Then("User presses Mark as paid button of instalment line {string} at instalment list", async (line) =>{
    const temp = await instalmentList.pressMarkAsPaidInstalmentByRowOnList(parseInt(line));
    logFailTestcase(temp, `Press Mark as Paid at row ${parseInt(line)} failed!`);
});