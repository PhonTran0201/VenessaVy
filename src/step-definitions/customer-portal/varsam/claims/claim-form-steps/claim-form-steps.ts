import { When } from "@cucumber/cucumber";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { GlobalPeripherals } from "../../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPeripherals";
import { ClaimFormCPVarsam } from "../../../../../page-objects/customer-portal/varsam/claims/claim-forms/ClaimFormCPVarsam";
import { convertPathFileDataToDataRegression, getCurrentDateTime, getDate, logFailTestcase, logInfoMessage } from "../../../../../shared/functions";
import { pushObjectToDataArrayWithUniqueKey } from "../../../../../storage-data/functions/data-test-execution";
const loader = require("csv-load-sync");

When("User inputs valid data into Register claim form on CustomerPortal {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const claimFormCPVarsam = new ClaimFormCPVarsam(SeleniumWebDriverService.getInstance());
    const globalPeripherals = new GlobalPeripherals(SeleniumWebDriverService.getInstance());


    const ObjectName = row.ObjectName;
    let DateOfLoss = row.DateOfLoss;
    const Address = row.Address;
    const City = row.City;
    const CauseOfLoss = row.CauseOfLoss;
    const Attachments = row.Attachments;

    let temp = true;

    temp = await claimFormCPVarsam.inputObjectNameClaimForm(ObjectName);
    logFailTestcase(temp, `Input Object Name failed!`);

    if (DateOfLoss && DateOfLoss.includes("@Today@")) {
        DateOfLoss = getCurrentDateTime();
        pushObjectToDataArrayWithUniqueKey("DateOfLoss", DateOfLoss);
        let temp2 = await claimFormCPVarsam.inputDateOfLossClaimFormUseDefaultValue();
        logFailTestcase(temp2.length > 0, `Input Date Of Loss = Today failed!`);
        pushObjectToDataArrayWithUniqueKey("DateOfLoss", temp2);
    }
    else if (DateOfLoss) {
        temp = await claimFormCPVarsam.inputDateOfLossClaimForm(DateOfLoss);
        logFailTestcase(temp, `Input Date Of Loss failed!`);
    }
    else {
        temp = await globalPeripherals.pressTabCurrentElement();
        logFailTestcase(temp, `Press tab for the 1st time- Date Of Loss failed!`);

        temp = await globalPeripherals.pressTabCurrentElement();
        logFailTestcase(temp, `Press tab for the 2nd time- Date Of Loss failed!`);
    }

    temp = await claimFormCPVarsam.inputAddressClaimForm(Address);
    logFailTestcase(temp, `Input Address failed!`);


    temp = await claimFormCPVarsam.inputCityClaimForm(City);
    logFailTestcase(temp, `Input City failed!`);


    temp = await claimFormCPVarsam.inputCauseOfLossClaimForm(CauseOfLoss);
    logFailTestcase(temp, `Input CauseOfLoss failed!`);



    if (Attachments) {
        const docs = Attachments.split(";");
        for (const doc of docs) {
            let UploadDocuments: string = "";

            if(__dirname.includes("jenkins") && !__dirname.includes(".jenkins")){
                logInfoMessage("Running on jenkins...");
                let projectName = "Test-Framework";
                if (__dirname.includes("Atlas-Test-Framework")) {
                    projectName = "Atlas-Test-Framework";
                }
                if (__dirname.includes("hogse-test-framework")) {
                    projectName = "hogse-test-framework";
                }
                UploadDocuments = __dirname.substring(0, __dirname.lastIndexOf(projectName) + projectName.length) + "/" + doc.replace(/\\/g, "/");
            }
            else{
                logInfoMessage("Runing on local...");
                UploadDocuments = __dirname.substring(0, __dirname.lastIndexOf("pegasus-core-aut-crm") + "pegasus-core-aut-crm".length) + "\\" + doc.replace(/\//g, "\\");
            }
            logInfoMessage("\tFinal file path:");
            logInfoMessage("\t\t" + UploadDocuments);

            logInfoMessage("\tDirname:");
            logInfoMessage("\t\t" + __dirname);

            temp = await claimFormCPVarsam.inputAttachmentClaimForm(UploadDocuments);
            logFailTestcase(temp, "Input Attachment failed!");
        }
    }
});

When("User verifies validation into Register claim form on CustomerPortal {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const claimFormCPVarsam = new ClaimFormCPVarsam(SeleniumWebDriverService.getInstance());
    const globalPeripherals = new GlobalPeripherals(SeleniumWebDriverService.getInstance());

    const ObjectNameValidation = row.ObjectNameValidation;
    const DateOfLossValidation = row.DateOfLossValidation;
    const AddressValidation = row.AddressValidation;
    const CityValidation = row.CityValidation;
    const CauseOfLossValidation = row.CauseOfLossValidation;

    let temp = true;
    await globalPeripherals.pressTabCurrentElement();

    temp = await claimFormCPVarsam.validateValueInsuredObjectValidation(ObjectNameValidation);
    logFailTestcase(temp, `Input Object Name failed!`);


    temp = await claimFormCPVarsam.validateValueDateOfLossValidation(DateOfLossValidation);
    logFailTestcase(temp, `Input Date Of Loss failed!`);


    temp = await claimFormCPVarsam.validateValueAddressValidation(AddressValidation);
    logFailTestcase(temp, `Input Address failed!`);


    temp = await claimFormCPVarsam.validateValueCityValidation(CityValidation);
    logFailTestcase(temp, `Input City failed!`);


    temp = await claimFormCPVarsam.validateValueCauseOfLossValidation(CauseOfLossValidation);
    logFailTestcase(temp, `Input CauseOfLoss failed!`);
});

When("User checks options in Insured Object into Register claim form on CustomerPortal {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const claimFormCPVarsam = new ClaimFormCPVarsam(SeleniumWebDriverService.getInstance());

    const InsuredObjects = row.InsuredObjects;
    const ExcludedInsuredObjects = row.ExcludedInsuredObjects;
    let temp = true;
    if (InsuredObjects) {
        const InsuredObjectsTemp = InsuredObjects.split(";");
        for (const iterator of InsuredObjectsTemp) {
            temp = await claimFormCPVarsam.checkOptionInsuredObjectExist(iterator);
            logFailTestcase(temp, `Insured Object: Not found "${iterator}"!`);
        }
    }
    if (ExcludedInsuredObjects) {
        const ExcludedInsuredObjectsTemp = ExcludedInsuredObjects.split(";");
        for (const iterator of ExcludedInsuredObjectsTemp) {
            temp = await claimFormCPVarsam.checkOptionInsuredObjectExist(iterator);
            logFailTestcase(!temp, `Insured Object: Found "${iterator}"! It should be hidden!`);
        }
    }
});

When("User checks options in Incident Type into Register claim form on CustomerPortal {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const claimFormCPVarsam = new ClaimFormCPVarsam(SeleniumWebDriverService.getInstance());

    const IncidentTypes = row.IncidentTypes;
    const ExcludedIncidentTypes = row.ExcludedIncidentTypes;

    let temp = true;
    if (IncidentTypes) {
        const IncidentTypesTemp = IncidentTypes.split(";");
        for (const iterator of IncidentTypesTemp) {
            temp = await claimFormCPVarsam.checkOptionCauseOfLossExist(iterator);
            logFailTestcase(temp, `Incident Type: Not found "${iterator}"!`);
        }
    }
    if (ExcludedIncidentTypes) {
        const ExcludedIncidentTypesTemp = ExcludedIncidentTypes.split(";");
        for (const iterator of ExcludedIncidentTypesTemp) {
            temp = await claimFormCPVarsam.checkOptionCauseOfLossExist(iterator);
            logFailTestcase(!temp, `Incident Type: Found "${iterator}"! It should be hidden!`);
        }
    }
});

When("User checks options in Date Of Loss into Register claim form on CustomerPortal {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const claimFormCPVarsam = new ClaimFormCPVarsam(SeleniumWebDriverService.getInstance());

    const DateOfLossMinusToday = row.DateOfLossMinusToday;

    let temp = true;
    if (DateOfLossMinusToday) {
        const DateOfLoss = getDate(DateOfLossMinusToday);
        temp = await claimFormCPVarsam.inputDateOfLossClaimForm(DateOfLoss);
        logFailTestcase(!temp, `Date Of Loss accept input date > current date!`);
    }
});

When("There are no data pre-filled into Register claim form on CustomerPortal", async () => {
    const claimFormCPVarsam = new ClaimFormCPVarsam(SeleniumWebDriverService.getInstance());
    const globalPeripherals = new GlobalPeripherals(SeleniumWebDriverService.getInstance());

    const ObjectName = "Select an Insured Object";
    const DateOfLoss = "";
    const Address = "";
    const City = "";
    const CauseOfLoss = "Select an incident type";

    let temp = true;
    await globalPeripherals.pressTabCurrentElement();

    temp = await claimFormCPVarsam.validateValueInsuredObjectClaimForm(ObjectName);
    logFailTestcase(temp, `Input Object Name failed!`);


    temp = await claimFormCPVarsam.validateValueDateOfLossClaimForm(DateOfLoss);
    logFailTestcase(temp, `Input Date Of Loss failed!`);


    temp = await claimFormCPVarsam.validateValueAddressClaimForm(Address);
    logFailTestcase(temp, `Input Address failed!`);


    temp = await claimFormCPVarsam.validateValueCityClaimForm(City);
    logFailTestcase(temp, `Input City failed!`);


    temp = await claimFormCPVarsam.validateValueCauseOfLossClaimForm(CauseOfLoss);
    logFailTestcase(temp, `Input CauseOfLoss failed!`);
});