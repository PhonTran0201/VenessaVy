import { Before, When } from "@cucumber/cucumber";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { ClaimDetailsLeftSideInsurance } from "../../../../page-objects/back-office-portal/insurance/claim/claim-details/left-side/ClaimDetailsLeftSideInsurance";
import { ClaimClosedPopoverInsurance } from "../../../../page-objects/back-office-portal/insurance/claim/claim-forms/ClaimClosedPopoverInsurance";
import { CloseClaimFormInsurance } from "../../../../page-objects/back-office-portal/insurance/claim/claim-forms/CloseClaimFormInsurance";
import { ClaimListInsurance } from "../../../../page-objects/back-office-portal/insurance/claim/claim-list/ClaimListInsurance";
import { convertPathFileDataToDataRegression, getDate, logFailTestcase } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { getValueDataOfDataTestExecution } from "../../../../storage-data/functions/data-test-execution";

//Close Claim steps
const loader = require("csv-load-sync");
let closeClaimFormInsurance: CloseClaimFormInsurance;
let claimClosedPopoverInsurance: ClaimClosedPopoverInsurance;
let claimDetailsLeftSideInsurance: ClaimDetailsLeftSideInsurance;
let claimListInsurance: ClaimListInsurance;
let globalPageObject: GlobalPageObject;
Before(async function () {
    const context: ICommonContext = this.context;
    closeClaimFormInsurance = new CloseClaimFormInsurance(context.driverService);
    claimDetailsLeftSideInsurance = new ClaimDetailsLeftSideInsurance(context.driverService);
    claimClosedPopoverInsurance = new ClaimClosedPopoverInsurance(context.driverService);
    claimListInsurance = new ClaimListInsurance(context.driverService);
    globalPageObject = new GlobalPageObject(context.driverService);
});

When("User press Close Claim button in Claim details", async () => {
    const temp = await claimDetailsLeftSideInsurance.pressCloseClaim();
    logFailTestcase(temp, "User press Close Claim button failed!");
})

When("User input valid data into Close Claim form {string}", async function (filename) {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const Resolution = rows[0].Resolution;
    let DateClaimsPaid = rows[0].DateClaimsPaid;
    const DateClaimsPaidMinusToday = rows[0].DateClaimsPaidMinusToday;
    let DateFeesPaid = rows[0].DateFeesPaid;
    const DateFeesPaidMinusToday = rows[0].DateFeesPaidMinusToday;
    let ActionDate = rows[0].ActionDate;
    const ActionDateMinusToday = rows[0].ActionDateMinusToday;
    const Comments = rows[0].Comments;
    if(DateClaimsPaidMinusToday){
        DateClaimsPaid = getDate(DateClaimsPaidMinusToday);
    }
    if(DateFeesPaidMinusToday){
        DateFeesPaid = getDate(DateFeesPaidMinusToday);
    }
    if(ActionDateMinusToday){
        ActionDate = getDate(ActionDateMinusToday);
    }
    
    let temp = true;
    if (Resolution) {
        temp = await closeClaimFormInsurance.inputResolution(Resolution);
        logFailTestcase(temp, `Resolution "${Resolution}" is not found on dropdown list!`);
    }
    if(DateClaimsPaid){
        temp = await closeClaimFormInsurance.inputDateClaimsPaidFinal(DateClaimsPaid);
        logFailTestcase(temp, `Input Date Claim paid failed!`);
    }
    if(DateFeesPaid){
        temp = await closeClaimFormInsurance.inputDateFeesPaidFinal(DateFeesPaid);
        logFailTestcase(temp, `Input Date Fees paid failed!`);
    }
    if(ActionDate){
        temp = await closeClaimFormInsurance.inputActionDate(ActionDate);
        logFailTestcase(temp, `Input Action Date failed!`);
    }
    if (Comments) {
        temp = await closeClaimFormInsurance.inputComments(Comments);
        logFailTestcase(temp, `input "${Comments} failed`);
    }
});

When(`User verifies info after close claim on claim detail {string}`, async (filename) => {
   const rows = loader(convertPathFileDataToDataRegression(filename));
    const Resolution = rows[0].Resolution;
    let DateClaimsPaid = rows[0].DateClaimsPaid;
    const DateClaimsPaidMinusToday = rows[0].DateClaimsPaidMinusToday;
    let DateFeesPaid = rows[0].DateFeesPaid;
    const DateFeesPaidMinusToday = rows[0].DateFeesPaidMinusToday;
    let ActionDate = rows[0].ActionDate;
    const ActionDateMinusToday = rows[0].ActionDateMinusToday;
    const Comments = rows[0].Comments;
    if(DateClaimsPaidMinusToday){
        DateClaimsPaid = getDate(DateClaimsPaidMinusToday);
    }
    if(DateFeesPaidMinusToday){
        DateFeesPaid = getDate(DateFeesPaidMinusToday);
    }
    if(ActionDateMinusToday){
        ActionDate = getDate(ActionDateMinusToday);
    }
    
    let temp = true;
    temp = await claimDetailsLeftSideInsurance.validateValueClaimDetail('Closed', "Status");
    logFailTestcase(temp, `Incorrect status "Closed" at Claim detail!`);

    temp = await claimDetailsLeftSideInsurance.pressStatusButtonClaimDetail();
    logFailTestcase(temp, `Press status Closed to Open Claim Closed popover failed!`);

    if (Resolution) {
        temp = await claimClosedPopoverInsurance.validateValueResolution(Resolution);
        logFailTestcase(temp);
    }
    if(DateClaimsPaid){
        temp = await claimClosedPopoverInsurance.validateValueDateClaimsPaid(DateClaimsPaid);
        logFailTestcase(temp);
    }
    if(DateFeesPaid){
        temp = await claimClosedPopoverInsurance.validateValueDateFeesPaids(DateFeesPaid);
        logFailTestcase(temp);
    }
    if(ActionDate){
        temp = await claimClosedPopoverInsurance.validateValueActionDate(ActionDate);
        logFailTestcase(temp);
    }
    if (Comments) {
        temp = await claimClosedPopoverInsurance.validateValueComment(Comments);
        logFailTestcase(temp);
    }    
});

When(`User verifies info after close claim on claim list {string}`, async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
     const Resolution = rows[0].Resolution;
     let DateClaimsPaid = rows[0].DateClaimsPaid;
     const DateClaimsPaidMinusToday = rows[0].DateClaimsPaidMinusToday;
     let DateFeesPaid = rows[0].DateFeesPaid;
     const DateFeesPaidMinusToday = rows[0].DateFeesPaidMinusToday;
     let ActionDate = rows[0].ActionDate;
     const ActionDateMinusToday = rows[0].ActionDateMinusToday;
     const Comments = rows[0].Comments;
     if(DateClaimsPaidMinusToday){
         DateClaimsPaid = getDate(DateClaimsPaidMinusToday);
     }
     if(DateFeesPaidMinusToday){
         DateFeesPaid = getDate(DateFeesPaidMinusToday);
     }
     if(ActionDateMinusToday){
         ActionDate = getDate(ActionDateMinusToday);
     }
     
     let temp = true;
     await globalPageObject.reloadTable(3000);
     await globalPageObject.waitForProgressBarLoaded_v2();
     
     temp = await claimListInsurance.validateStatusClaimListByReferenceId("Closed", getValueDataOfDataTestExecution("Claim ReferenceId"));
     logFailTestcase(temp);

     temp = await claimListInsurance.pressStatusClaimListByReferenceId(getValueDataOfDataTestExecution("Claim ReferenceId"));
 
     if (Resolution) {
         temp = await claimClosedPopoverInsurance.validateValueResolution(Resolution);
         logFailTestcase(temp);
     }
     if(DateClaimsPaid){
         temp = await claimClosedPopoverInsurance.validateValueDateClaimsPaid(DateClaimsPaid);
         logFailTestcase(temp);
     }
     if(DateFeesPaid){
         temp = await claimClosedPopoverInsurance.validateValueDateFeesPaids(DateFeesPaid);
         logFailTestcase(temp);
     }
     if(ActionDate){
         temp = await claimClosedPopoverInsurance.validateValueActionDate(ActionDate);
         logFailTestcase(temp);
     }
     if (Comments) {
         temp = await claimClosedPopoverInsurance.validateValueComment(Comments);
         logFailTestcase(temp);
     }     
 });