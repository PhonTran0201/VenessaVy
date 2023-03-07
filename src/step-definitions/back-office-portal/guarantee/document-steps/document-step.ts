import { Before, Given, Then, When } from "@cucumber/cucumber";
import { AccountList } from "../../../../page-objects/back-office-portal/general/account/account-list/AccountList";
import { GlobalBrowserWindowHandle } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalBrowserWindowHandle";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { AccountTabDocumentListGuarantee } from "../../../../page-objects/back-office-portal/guarantee/account/account-details/tabs/account-document/AccountTabDocumentListGuarantee";
import { AccountTabFrameAgreementForm } from "../../../../page-objects/back-office-portal/guarantee/account/account-details/tabs/account-frame-agreements/AccountTabFrameAgreementForm";
import { AccountTabFrameAgreementList } from "../../../../page-objects/back-office-portal/guarantee/account/account-details/tabs/account-frame-agreements/AccountTabFrameAgreementList";
import { AccountTabFrameAgreementProductForm } from "../../../../page-objects/back-office-portal/guarantee/account/account-details/tabs/account-frame-agreements/AccountTabFrameAgreementProductForm";
import { AmendmentFormContractAndGuarantee } from "../../../../page-objects/back-office-portal/guarantee/guarantee/amendment-forms/AmendmentFormContractAndGuarantee";
import { AmendmentFormPayment } from "../../../../page-objects/back-office-portal/guarantee/guarantee/amendment-forms/AmendmentFormPayment";
import { GuaranteeList } from "../../../../page-objects/back-office-portal/guarantee/guarantee/guarantee-list/GuaranteeList";
import { GlobalQuoteInsurance } from "../../../../page-objects/back-office-portal/insurance/quote/quote-layout/GlobalQuoteInsurance";
import { QuoteListInsurance } from "../../../../page-objects/back-office-portal/insurance/quote/quote-list/QuoteListInsurance";
import { GlobalHeaderCP } from "../../../../page-objects/customer-portal/general/GlobalPageObject/GlobalHeaderCP";
import { GlobalHeaderCPGuaranteeAtlas } from "../../../../page-objects/customer-portal/guarantee/atlas/GlobalPageObject/GlobalHeaderCPGuaranteeAtlas";
import { GlobalHeaderCPGuaranteeHogs } from "../../../../page-objects/customer-portal/guarantee/hogs/GlobalPageObject/GlobalHeaderCPGuaranteeHogs";
import { convertPathFileDataToDataRegression, getCurrentDateTime, logFailTestcase, logInfoMessage } from '../../../../shared/functions';
import { ICommonContext } from "../../../../shared/interfaces";
import { formatDateTime } from "../../../../shared/tenant-setting/tenant-setting";
import { scenarioTags } from "../../../../shared/variables";
import { getValueDataOfDataTestExecution } from "../../../../storage-data/functions/data-test-execution";


const loader = require("csv-load-sync");
let accountTabDocumentListGuarantee: AccountTabDocumentListGuarantee
let globalHeaderCP: GlobalHeaderCP;
let accountList: AccountList;
let globalPageObject: GlobalPageObject;
let globalBrowserWindowHandle: GlobalBrowserWindowHandle;
let accountTabFrameAgreementList: AccountTabFrameAgreementList;
let accountTabFrameAgreementForm: AccountTabFrameAgreementForm
let accountTabFrameAgreementProductForm: AccountTabFrameAgreementProductForm
let guaranteeList: GuaranteeList;
let amendmentFormContractAndGuarantee: AmendmentFormContractAndGuarantee;
let amendmentFormPayment: AmendmentFormPayment;


//Variable using to compare
let expectedCreatedDate: string;
let versionFA: string;
let expectedDocumentName: string;

Before(async function () {
    const context: ICommonContext = this.context;
    accountTabDocumentListGuarantee = new AccountTabDocumentListGuarantee(context.driverService);
    accountList = new AccountList(context.driverService);
    globalPageObject = new GlobalPageObject(context.driverService);
    globalBrowserWindowHandle = new GlobalBrowserWindowHandle(context.driverService);
    accountTabFrameAgreementList = new AccountTabFrameAgreementList(context.driverService);
    accountTabFrameAgreementProductForm = new AccountTabFrameAgreementProductForm(context.driverService);
    accountTabFrameAgreementForm = new AccountTabFrameAgreementForm(context.driverService);
    guaranteeList = new GuaranteeList(context.driverService);
    amendmentFormContractAndGuarantee = new AmendmentFormContractAndGuarantee(context.driverService);
    amendmentFormPayment = new AmendmentFormPayment(context.driverService);
    if (scenarioTags.has("@CustomerPortalAtlas")) {
        globalHeaderCP = new GlobalHeaderCPGuaranteeAtlas(context.driverService);
    }
    if (scenarioTags.has("@CustomerPortalHogs")) {
        globalHeaderCP = new GlobalHeaderCPGuaranteeHogs(context.driverService);
    }
});


Then("System shows new document at {string} in Frame Agreement detail", async (version: string) => {

    await accountTabFrameAgreementList.reloadFrameAgreementList();
    let temp = true;
    let status = "N/A";
    await globalPageObject.waitForSeconds(2000);

    expectedDocumentName = await accountTabFrameAgreementList.getFrameAgreementNo()

    temp = await accountTabFrameAgreementList.openFrameAgreementDetails(expectedDocumentName);
    logFailTestcase(temp, "open Frame Agreement Details failed! ");

    temp = await accountTabFrameAgreementForm.navigateToDocumentsTab();
    logFailTestcase(temp, "navigate to Documents tab failed! ");

    expectedCreatedDate = getCurrentDateTime();

    await globalPageObject.waitForSeconds(1000);
    temp = await accountTabFrameAgreementForm.openDocumentListByVersion(version);
    await globalPageObject.waitForSeconds(3000);
    temp = await accountTabFrameAgreementForm.assertFrameAgreementDocument(
        expectedDocumentName,
        expectedCreatedDate,
        status
    );
    logFailTestcase(temp, "Check new document on detail list failed!");

    if (version == "Version 1") { versionFA = "version_1"; }
    else { versionFA = "version_2" }
});

Then("System changes status to {string} on document frame agreement details", async (status: string) => {

    await globalPageObject.waitForProgressBarLoaded_v2();
    await globalPageObject.waitForProgressBarLoaded_v2();
    await globalPageObject.waitForSeconds(2000);
    let temp = true;

    temp = await accountTabFrameAgreementForm.navigateToDocumentsTab();
    logFailTestcase(temp, "navigate to Documents tab failed! ");
    temp = await accountTabFrameAgreementForm.assertFrameAgreementDocument(
        expectedDocumentName,
        expectedCreatedDate,
        status
    );
    logFailTestcase(temp, "Check new document on detail list failed!");

});
Then("User selects {string} the document on document frame agreement details", async (status: string) => {

    let temp = await accountTabFrameAgreementForm.openMoreDropdownButtonOnDocumentList();
    logFailTestcase(temp, "open More Dropdown Button On Document List failed!");
    temp = await accountTabFrameAgreementForm.selectTheOptionOnMoreDropdown(status);
    logFailTestcase(temp, "select The Option On More Dropdown failed!");

});

Then("User downloads a valid document in Frame Agreement detail", async () => {
    let temp = await accountTabDocumentListGuarantee.downloadDocumentByNameinFrameAgreementDetail(expectedDocumentName);
    logFailTestcase(temp, "downloads a valid document in Frame Agreement detail failed!");
});

Then("System shows new {string} document in the Document list Guarantee", async (type) => {

    await globalBrowserWindowHandle.refreshPage();
    await globalPageObject.waitForSeconds(5000);
    await globalPageObject.waitForProgressBarLoaded_v2();
    let temp = await accountTabDocumentListGuarantee.searchDocumentOnDocumentTab(expectedDocumentName);
    logFailTestcase(temp, `Search Document with '${expectedDocumentName} failed!'`);
    await globalPageObject.waitForSeconds(2000);
    // await globalPageObject.expandNumberOfItemSubList();
    let totalRecord = await globalPageObject.getNumberOfTotalRecordsSubTab()
    logInfoMessage(`Total record: ${totalRecord}`);
    if (type == "Frame Agreement") {
        for (let i = 1; i <= totalRecord; i++) {
            temp = await accountTabDocumentListGuarantee.assertUploadDocument(
                expectedDocumentName,
                "facility_letter," + expectedDocumentName + "," + versionFA,
                "Agreement document",
                expectedCreatedDate,
                i
            );
            if (temp) {
                break;
            } else if (!temp && i === totalRecord) {
                logFailTestcase(temp, "Check new document on list failed!");
            }
        }

    } else if (type == "Application") {
        temp = await accountTabDocumentListGuarantee.assertUploadDocument(
            expectedDocumentName,
            "underlying_contract",
            "Application document",
            expectedCreatedDate,
            totalRecord
        );
        logFailTestcase(temp, "Check new document on list failed!");
    } else if (type == "Guarantee") {
        temp = await accountTabDocumentListGuarantee.assertUploadDocument(
            expectedDocumentName,//document name
            "guarantee_document",
            "Guarantee document",
            expectedCreatedDate,
            totalRecord
        );
        logFailTestcase(temp, "Check new document on list failed!");
    } else if (type == "Other Guarantee") {
        temp = await accountTabDocumentListGuarantee.assertUploadDocument(
            expectedDocumentName,//document name
            "other",
            "Guarantee document",
            expectedCreatedDate,
            totalRecord);
    } else {
        temp = await accountTabDocumentListGuarantee.assertUploadDocument(
            expectedDocumentName,//document name
            "other",
            "Application document",
            expectedCreatedDate,
            totalRecord
        );
        logFailTestcase(temp, "Check new document on list failed!");
    }
});

Then("User downloads a valid {string} document in Document List", async (documentType) => {
    if(documentType.localeCompare("Quote")===0 || documentType.localeCompare("Policy")===0){
        expectedDocumentName = getValueDataOfDataTestExecution("QuoteReference");
    }
    let totalRecord = await globalPageObject.getNumberOfTotalRecordsSubTab();
    let temp = await accountTabDocumentListGuarantee.downloadDocumentByNameInDocumentTab(expectedDocumentName, totalRecord);
    logFailTestcase(temp, "downloads a valid document in Documents tab failed!");
});

Then("User is on Document list Guarantee", async () => {
    await globalPageObject.closeOpeningForm();
    await globalPageObject.waitForSeconds(1000);
    let temp = await globalPageObject.navigateToSubDocuments();
    logFailTestcase(temp, "Navigates to Document list failed!");
});

When("User add more product to the frame agreement from csv file {string}", async (filename) => {

    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const Type = row.Type;
    const Product = row.Product;
    const PremiumRate = row.PremiumRate;
    const CommissionRate = row.CommissionRate;
    const PaymentMethod = row.PaymentMethod;
    const GuaranteeRate = row.GuaranteeRate;
    const FirstPhaseGuaranteeRate = row.FirstPhaseGuaranteeRate;
    const SecondPhaseGuaranteeRate = row.SecondPhaseGuaranteeRate;
    const EstablishmentFee = row.EstablishmentFee;
    const AmendmentFee = row.AmendmentFee;
    let temp = await accountTabFrameAgreementList.openFrameAgreementDetails(expectedDocumentName);
    logFailTestcase(temp, "open Frame Agreement Details failed! ");

    if (Product) {
        temp = await accountTabFrameAgreementForm.inputProductOnFrameAgreementForm(Product);
        logFailTestcase(temp, "Input Product on Frame Agreement form failed!");
    }

    //#region Input data into Frame Agreement Product form
    if (PremiumRate) {
        temp = await accountTabFrameAgreementProductForm.inputPremiumRateOnProductForm(PremiumRate);
        logFailTestcase(temp, "Input Premium Rate on Product form failed!");
    }
    if (CommissionRate) {
        temp = await accountTabFrameAgreementProductForm.inputCommissionRateOnProductForm(CommissionRate);
        logFailTestcase(temp, "Input Commission Rate on Product form failed!");
    }
    if (PaymentMethod) {
        temp = await accountTabFrameAgreementProductForm.inputPaymentMethodOnProductForm(PaymentMethod);
        logFailTestcase(temp, "Input Payment Method on Product form failed!");
    }

    if (Type.localeCompare("One Phase") === 0) {
        if (GuaranteeRate) {
            temp = await accountTabFrameAgreementProductForm.inputGuaranteeRateOnProductForm(GuaranteeRate);
            logFailTestcase(temp, "Input Guarantee Rate failed!");
        }
    }
    if (Type.localeCompare("Two Phases") === 0) {
        if (FirstPhaseGuaranteeRate) {
            temp = await accountTabFrameAgreementProductForm.inputFirstPhaseGuaranteeRateOnProductForm(FirstPhaseGuaranteeRate);
            logFailTestcase(temp, "Input First Phase Guarantee Rate failed!");
        }
        if (SecondPhaseGuaranteeRate) {
            temp = await accountTabFrameAgreementProductForm.inputSecondPhaseGuaranteeRateOnProductForm(SecondPhaseGuaranteeRate);
            logFailTestcase(temp, "Input Second Phase Guarantee Rate failed!");
        }
    }
    if (EstablishmentFee) {
        temp = await accountTabFrameAgreementProductForm.inputEstablishmentFeeOnProductForm(EstablishmentFee);
        logFailTestcase(temp, "Input Establishment Fee on Product form failed!");
    }
    if (AmendmentFee) {
        temp = await accountTabFrameAgreementProductForm.inputAmendmentFeeOnProductForm(AmendmentFee);
        logFailTestcase(temp, "Input Amendment Fee on Product form failed!");
    }
    //#endregion


    temp = await globalPageObject.pressSaveForm();
    logFailTestcase(temp);

    await globalPageObject.pressSaveForm();
    await globalPageObject.waitForProgressBarLoaded();


});


Then("User downloads a valid document in detail form", async () => {
    let TotalRecord = await accountTabDocumentListGuarantee.getNumberOfTotalRecordsInDocumentTabDetailForm();
    let temp = true;
    for (let i = 1; i <= TotalRecord; i++) {
        temp = await accountTabDocumentListGuarantee.downloadDocumentByNameInDetailForm(expectedDocumentName, i);
        if (temp) { break; }
        else if (!temp && i === TotalRecord) {
            logFailTestcase(temp, "downloads a valid document in detail form failed!");
        }
    }

});

When("User uploads a valid document in {string} detail form {string}", async (type: string, filename) => {

    let temp2 = true;
    await globalPageObject.waitForProgressBarLoaded_v2();
    await globalPageObject.waitForProgressBarLoaded_v2();
    if (type == "Application") {
        temp2 = await accountTabDocumentListGuarantee.openApplicationByRowOnApplicationList();
        logFailTestcase(temp2, "open Application by row failed ! ");
    } else {
        temp2 = await guaranteeList.openGuaranteeByRowInGuaranteeList();
        logFailTestcase(temp2, "open Guarantee by row failed ! ");
    }

    await globalPageObject.waitForProgressBarLoaded_v2();
    temp2 = await accountTabDocumentListGuarantee.navigateToDocumentTabInDetailForm();
    logFailTestcase(temp2, "navigate to Documents tab failed ! ");

    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const UnderlyingContractDocsUnderlying = row.UnderlyingContractDocsUnderlying;
    const Type = row.Type;

    if (Type) {
        await globalPageObject.waitForProgressBarLoaded_v2();
        await globalPageObject.waitForSeconds(1000);
        let temp = await accountTabDocumentListGuarantee.inputTypeOfUploadedDocument(Type);
        logFailTestcase(temp, "input Type Of Uploaded Document failed!");
    }

    const docs = UnderlyingContractDocsUnderlying.split(";");
    for (const doc of docs) {
        const temp2 = __dirname;
        let UploadDocuments: string = "";

        if (!(__dirname.includes("jenkins") && !__dirname.includes(".jenkins"))){
            logInfoMessage("Runing on local...");
            UploadDocuments =
                __dirname.substring(0, temp2.length - 65) + "\\" + doc.replace("/", "\\");
        }
        else {
            logInfoMessage("Running on jenkins...");
            UploadDocuments = __dirname.substring(0, temp2.length - 65) + "/" + doc.replace("\\", "/");
        }
        logInfoMessage("\tFinal file path:");
        logInfoMessage("\t\t" + UploadDocuments);

        logInfoMessage("\tDirname:");
        logInfoMessage("\t\t" + __dirname);

        let check = await accountTabDocumentListGuarantee.inputUploadFileOnDocumentInDetailForm(UploadDocuments);
        logFailTestcase(check, "Upload file on document form failed!");
    }


    temp2 = await accountTabDocumentListGuarantee.clickBtnUploadInDetailForm();
    await globalPageObject.waitForProgressBarLoaded_v2();
    logFailTestcase(temp2, "click Upload button failed ");


});

Then("System shows new document on document list in detail form {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const UnderlyingContractDocsUnderlying = row.UnderlyingContractDocsUnderlying.replace(/\\/g, "/");
    const Type = row.Type;

    expectedDocumentName = UnderlyingContractDocsUnderlying.substring(UnderlyingContractDocsUnderlying.lastIndexOf("/") + 1, UnderlyingContractDocsUnderlying.lastIndexOf("."));
    expectedCreatedDate = formatDateTime(getCurrentDateTime());


    let temp = await accountTabDocumentListGuarantee.navigateToDocumentTabInDetailForm();
    logFailTestcase(temp, "Navigate to Documents tab failed !");
    await globalPageObject.waitForProgressBarLoaded_v2();
    await globalPageObject.waitForProgressBarLoaded_v2();
    let TotalRecord = await accountTabDocumentListGuarantee.getNumberOfTotalRecordsInDocumentTabDetailForm();
    temp = await accountTabDocumentListGuarantee.assertDocumentInDetailForm(
        expectedDocumentName,
        expectedCreatedDate,
        Type,
        TotalRecord
    );
    logFailTestcase(temp, "assert Document in detail form failed!");

});

Then("System shows new document on document list in Guarantee detail form", async () => {

    expectedCreatedDate = getCurrentDateTime();


    let temp = await accountTabDocumentListGuarantee.navigateToDocumentTabInDetailForm();
    logFailTestcase(temp, "Navigate to Documents tab failed !");
    await globalPageObject.waitForProgressBarLoaded_v2();
    await globalPageObject.waitForProgressBarLoaded_v2();
    let TotalRecord = await accountTabDocumentListGuarantee.getNumberOfTotalRecordsInDocumentTabDetailForm();
    temp = await accountTabDocumentListGuarantee.assertDocumentInDetailForm(
        expectedDocumentName,
        expectedCreatedDate,
        "Guarantee document",
        TotalRecord
    );
    logFailTestcase(temp, "assert Document in detail form failed!");

});

When("User ticks on the box to select mutiple guarantees", async () => {
    await globalPageObject.waitForProgressBarLoaded_v2();
    await globalPageObject.waitForProgressBarLoaded_v2();

    let temp = await accountTabDocumentListGuarantee.tickCheckBoxByGuaranteeRow(1);
    logFailTestcase(temp, "tick on the first box to select guarantee failed!");

});

When("User presses download mutiple guarantee document button in Guarantee List", async () => {
    let temp = await accountTabDocumentListGuarantee.pressBtnDownLoadDocumentInList();
    logFailTestcase(temp, "press Download mutiple guarantee document failed");
});

When("User opens and approves the application", async () => {
    await globalPageObject.waitForProgressBarLoaded_v2();
    let temp = await accountTabDocumentListGuarantee.openApplicationByRowOnApplicationList();
    logFailTestcase(temp, "open Application On Application List failed!");

    await globalPageObject.waitForProgressBarLoaded_v2();
    temp = await accountTabDocumentListGuarantee.approveApplicationOnApplicationDetailForm();
    logFailTestcase(temp, "approve Application on Application List failed!");
});

Given("User navigates to Guarantee List", async () => {
    if (scenarioTags.has("@CustomerPortalHogs") || scenarioTags.has("@CustomerPortalAtlas")) {
        const temp = await globalHeaderCP.navigateToMainGuarantee();
        logFailTestcase(temp, "User navigates to Guarantee List failed!");
    } else {
        const temp = await globalPageObject.navigateToSubGuarantees();
        logFailTestcase(temp, "User navigates to Guarantee List failed!");
    }
});

Then("System shows new record in the Guarantee list", async () => {

    await globalBrowserWindowHandle.refreshPage();
    await globalPageObject.waitForSeconds(3000);
    await globalPageObject.waitForProgressBarLoaded_v2();
    await globalPageObject.waitForProgressBarLoaded_v2();
    expectedDocumentName = await guaranteeList.getValueGuaranteeNoOnList();
    let temp = await guaranteeList.openGuaranteeByRowInGuaranteeList();
    logFailTestcase(temp, "open a guarantee failed! ");
});

When("User amends the guarantee in Guarantee List", async () => {
    await globalPageObject.waitForProgressBarLoaded_v2();
    await globalPageObject.waitForProgressBarLoaded_v2();
    let temp = await guaranteeList.openGuaranteeByRowInGuaranteeList();
    logFailTestcase(temp, "open a guarantee failed! ");
    await globalPageObject.waitForProgressBarLoaded_v2();
    await globalPageObject.waitForProgressBarLoaded_v2();
    temp = await accountTabDocumentListGuarantee.clickAmendButtonInGuaranteeDetailForm();
    logFailTestcase(temp, "click Amend Button In Guarantee Detail Form failed! ");
});


When("User searchs document by name on Documents tab {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));

    for (let i = 0; i < rows.length; i++) {
        const Name = rows[i].Name;
        const Description = rows[i].Description;
        const Tags = rows[i].Tags;
        const CreatedDate = rows[i].CreatedDate;
        let temp = await accountTabDocumentListGuarantee.searchDocumentOnDocumentTab(Name);
        logFailTestcase(temp, `Search Document with ${Name} failed!`);
        await globalPageObject.waitForSeconds(2000);

        temp = await accountTabDocumentListGuarantee.assertUploadDocument(
            Name,
            Tags,
            Description,
            CreatedDate,
            1
        );
        logFailTestcase(temp, `Incorrect information on document list line ${i + 1}`);

        await globalPageObject.reloadTable(3000);
    }
});

When("System shows correct information on Document List {string}", async (filename) => {
    //this step is processed at previous step
});



