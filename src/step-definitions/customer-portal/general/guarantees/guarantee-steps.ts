import { Before, Then, When } from "@cucumber/cucumber";
import { compareDesc } from "date-fns";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { GuaranteeListCP } from "../../../../page-objects/customer-portal/general/guarantee/guarantee-list/GuaranteeListCP";
import { GuaranteeListCPGuaranteeAtlas } from "../../../../page-objects/customer-portal/guarantee/atlas/guarantee/guarantee-list/GuaranteeListCPGuaranteeAtlas";
import { GuaranteeListCPGuaranteeHogs } from "../../../../page-objects/customer-portal/guarantee/hogs/guarantee/guarantee-list/GuaranteeListCPGuaranteeHogs";
import { ValidateField } from "../../../../shared/classes";
import { addDate, convertPathFileDataToDataRegression, getDate, logFailTestcase } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { formatDateTime, numberToCurrency } from "../../../../shared/tenant-setting/tenant-setting";
import { dataTestcase, scenarioTags } from "../../../../shared/variables";


const loader = require("csv-load-sync");

let globalPageObject: GlobalPageObject;


let guaranteeListCP: GuaranteeListCP;


Before(async function () {
    if (scenarioTags.has("@CustomerPortalHogs")) {
        const context: ICommonContext = this.context;
        globalPageObject = new GlobalPageObject(context.driverService);
        guaranteeListCP = new GuaranteeListCPGuaranteeHogs(context.driverService);
    }
    else if (scenarioTags.has("@CustomerPortalAtlas")) {
        const context: ICommonContext = this.context;
        globalPageObject = new GlobalPageObject(context.driverService);
        guaranteeListCP = new GuaranteeListCPGuaranteeAtlas(context.driverService);
    }
});


//#region Guarantee List
When("System shows correct information at guarantee list on Customer portal {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    await globalPageObject.reloadTable(8000);
    await globalPageObject.waitForProgressBarLoaded_v2();

    //#region declare varaiable
    const Type = row.Type;
    const IssuedDate = getDate(row.IssuedDateGuaranteeMinusToday);
    const Status = row.Status;
    const Debtor = row.OrdererDebtor;
    const Product = row.ProductName;
    let TotalGuaranteeFeeGuaranteeFee = row.GuaranteeFeeGuaranteeFee;
    if (Type && Type.localeCompare("Two Phases") === 0) {
        TotalGuaranteeFeeGuaranteeFee = row.TotalGuaranteeFeeGuaranteeFee;
    }
    const OtherFee = numberToCurrency(row.EstablishmentFeeOtherFee, true);

    // Current phase
    let Amount = row.GuaranteeAmountGuarantee;
    let PeriodStartGuarantee = getDate(row.StartDateMinusToday);
    let PeriodEndGuarantee = addDate(PeriodStartGuarantee, row.EndDateMinusStartDate);

    if (row.IsBackDatedGurantee && row.IsBackDatedGurantee.localeCompare("Yes") === 0) {
        PeriodStartGuarantee = getDate(-364);
        PeriodEndGuarantee = getDate();
    }

    const CreatedBy = row.username;
    //#endregion

    //#region Validate values
    let temp = await guaranteeListCP.validateGuaranteeIssuedDateValueOnList(formatDateTime(IssuedDate));
    logFailTestcase(temp);

    temp = await guaranteeListCP.validateStatusValueOnList(Status, 1, true);
    logFailTestcase(temp);

    temp = await guaranteeListCP.validateDebtorValueOnList(Debtor);
    logFailTestcase(temp);

    temp = await guaranteeListCP.validateProductValueOnList(Product);
    logFailTestcase(temp);

    if (TotalGuaranteeFeeGuaranteeFee) {
        temp = await guaranteeListCP.validateTotalGuaranteeFeeValueOnList(numberToCurrency(TotalGuaranteeFeeGuaranteeFee, true));
        logFailTestcase(temp);
    }

    temp = await guaranteeListCP.validateOtherFeeValueOnList(OtherFee);
    logFailTestcase(temp);

    // Tính xem today có nằm trong khoản start date và end date hay không?
    let CurrentPhase = (PeriodStartGuarantee ? formatDateTime(PeriodStartGuarantee) : "") + (PeriodEndGuarantee ? ' - ' + formatDateTime(PeriodEndGuarantee) : "");
    if (CurrentPhase) {
        let PeriodStartGuaranteeTemp = new Date(parseInt(PeriodStartGuarantee.substring(6, 10)), parseInt(PeriodStartGuarantee.substring(3, 5)), parseInt(PeriodStartGuarantee.substring(0, 2)));
        let PeriodEndGuaranteeTemp = new Date(parseInt(PeriodEndGuarantee.substring(6, 10)), parseInt(PeriodEndGuarantee.substring(3, 5)), parseInt(PeriodEndGuarantee.substring(0, 2)));
        let today = new Date(parseInt(getDate().substring(6, 10)), parseInt(getDate().substring(3, 5)), parseInt(getDate().substring(0, 2)));

        // Nếu today không nằm giữa start date và end date
        if (!(compareDesc(PeriodStartGuaranteeTemp, today) >= 0 && compareDesc(today, PeriodEndGuaranteeTemp) >= 0)) {
            CurrentPhase = "N/A - N/A";
            Amount = "";
        }
        temp = await guaranteeListCP.validateCurrentPhaseValueOnList("(" + CurrentPhase + ")");
        logFailTestcase(temp);
    }
    Amount = Amount ? numberToCurrency(Amount, true) : "N/A";
    temp = await guaranteeListCP.validateAmountValueOnList(Amount);
    logFailTestcase(temp);

    if (CreatedBy) {
        temp = await guaranteeListCP.validateCreatedByValueOnList(CreatedBy);
        logFailTestcase(temp);
    }
    //#endregion

    //#region Push datatestcase
    dataTestcase.push(new ValidateField("Guarantee No", 1, true, [await guaranteeListCP.getValueGuaranteeNoOnList()], []));
    dataTestcase.push(new ValidateField("Guarantee No Amendment", 1, true, [await guaranteeListCP.getValueGuaranteeNoOnList() + "/0001"], []));
    //#endregion
});