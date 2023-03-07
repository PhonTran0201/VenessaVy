import { When } from "@cucumber/cucumber";
import { SeleniumWebDriverService } from "../../../../core/selenium-webdriver.service";
import { FirstNoticeOfLossDetails } from "../../../../page-objects/back-office-portal/insurance/first-notice-of-loss/FirstNoticeOfLossDetails";
import { convertPathFileDataToDataRegression, getDate, logFailTestcase } from "../../../../shared/functions";
import { getValueDataOfDataTestExecution } from "../../../../storage-data/functions/data-test-execution";
const loader = require("csv-load-sync");

When("User verifies info at FNOL details BOPVarsam {string}", async (filename) =>{
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const firstNoticeOfLossDetails: FirstNoticeOfLossDetails = new FirstNoticeOfLossDetails(SeleniumWebDriverService.getInstance());

    const Organization = row.Organization;
    const Account = row.Account;
    const Product = row.Product;
    const Policy = row.Policy;
    const ReportedDate = getDate();
    const DateOfLoss = row.DateOfLoss.includes("@dataTestExecution@") ? getValueDataOfDataTestExecution("DateOfLoss").replace(/-/g,"/") : row.DateOfLoss;
    const Address = row.Address;
    const City = row.City;
    const ObjectName = row.ObjectName;
    const CauseOfLoss = row.CauseOfLoss;
    const Attachments = row.Attachments;

    let temp = true;
    if(Organization){
        temp = await firstNoticeOfLossDetails.validateValueClaimForm(Organization, "Organization");
        // logFailTestcase(temp, `Incorrect Organization!`);
    }
    if(Account){
        temp = await firstNoticeOfLossDetails.validateValueClaimForm(Account, "Account");
        logFailTestcase(temp, `Incorrect Account!`);
    }
    if(Product){
        temp = await firstNoticeOfLossDetails.validateValueClaimForm(Product, "Product");
        logFailTestcase(temp, `Incorrect Product!`);
    }
    if(Policy){
        temp = await firstNoticeOfLossDetails.validateValueClaimForm(Policy, "Policy");
        logFailTestcase(temp, `Incorrect Policy!`);
    }
    if(ReportedDate){
        temp = await firstNoticeOfLossDetails.validateValueClaimForm(ReportedDate, "Reported date");
        logFailTestcase(temp, `Incorrect ReportedDate!`);
    }
    if(DateOfLoss){
        temp = await firstNoticeOfLossDetails.validateValueClaimForm(DateOfLoss.substring(0,10), "Date of loss");
        logFailTestcase(temp, `Incorrect DateOfLoss!`);
    }
    if(Address){
        temp = await firstNoticeOfLossDetails.validateValueClaimForm(Address, "Address");
        // logFailTestcase(temp, `Incorrect Address!`);
    }
    if(City){
        temp = await firstNoticeOfLossDetails.validateValueCityInFNOLDetails(City);//
        // logFailTestcase(temp, `Incorrect City!`);
    }
    if(ObjectName){
        temp = await firstNoticeOfLossDetails.validateValueClaimForm(ObjectName, "Object name");
        logFailTestcase(temp, `Incorrect ObjectName!`);
    }
    if(CauseOfLoss){
        temp = await firstNoticeOfLossDetails.validateValueIncidentTypeInFNOLDetails(CauseOfLoss);//
        logFailTestcase(temp, `Incorrect CauseOfLoss!`);
    }

    if(Attachments){
        let array = Attachments.split(";");
        for (const iterator of array) {
            temp = await firstNoticeOfLossDetails.validateFileAtachmentIsDisplayed(iterator.split(".")[0], iterator.split(".")[1]);
            logFailTestcase(temp, `Incorrect Attachments!`);
        }
      
    }
});