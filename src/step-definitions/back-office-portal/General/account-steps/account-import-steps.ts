import { Before, Then, When } from "@cucumber/cucumber";
import { AccountList } from "../../../../page-objects/back-office-portal/general/account/account-list/AccountList";
import { UploadFileTab } from "../../../../page-objects/back-office-portal/general/account/import-account/UploadFileTab";
import { SelectMappingTab } from "../../../../page-objects/back-office-portal/general/account/import-account/SelectMappingTab";
import { PreviewTab } from "../../../../page-objects/back-office-portal/general/account/import-account/PreviewTab";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { ExcelDateToJSDate, logFailMessage, logFailTestcase, logInfoMessage, logSuccessMessage, logWarningMessage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { AccountForm } from "../../../../page-objects/back-office-portal/general/account/account-forms/AccountForm";

const loader = require("csv-load-sync");
const loader_xlsx = require('read-excel-file/node');

let accountList: AccountList;
let accountForm: AccountForm;
let uploadFileTab: UploadFileTab;
let selectMappingTab: SelectMappingTab;
let previewTab: PreviewTab;
let globalPageObject: GlobalPageObject;
Before(async function () {
    const context: ICommonContext = this.context;
    accountList = new AccountList(context.driverService);
    accountForm = new AccountForm(context.driverService);
    uploadFileTab = new UploadFileTab(context.driverService);
    selectMappingTab = new SelectMappingTab(context.driverService);
    previewTab = new PreviewTab(context.driverService);
    globalPageObject = new GlobalPageObject(context.driverService);
});

When("User imports {string} accounts by uploading file {string}", async (accountType, filename) => {
    let temp = true;
    await globalPageObject.waitForSeconds(3000);

    temp = await accountList.clickImportAccountOnAccountList();
    logFailTestcase(temp, 'click Import Account On Account List failed!');
    if (filename) {
        const docs = filename.substr(2);
        const temp2 = __dirname;
        let UploadDocuments: string = "";

        if (!(__dirname.includes("jenkins") && !__dirname.includes(".jenkins"))){
            logInfoMessage("Runing on local...");
            UploadDocuments =
                __dirname.substring(0, temp2.length - 62) + "\\" + docs.replace("/", "\\");
        }
        else {
            logInfoMessage("Running on jenkins...");
            UploadDocuments = __dirname.substring(0, temp2.length - 62) + "/" + docs.replace("\\", "/");
        }
        logInfoMessage("\tFinal file path:");
        logInfoMessage("\t\t" + UploadDocuments);

        logInfoMessage("\tDirname:");
        logInfoMessage("\t\t" + __dirname);

        temp = await uploadFileTab.inputUploadFileOnImportAccountForm(UploadDocuments);
        logFailTestcase(temp, "Upload FileOnImportAccountForm failed!");

    }

    if (accountType) {
        temp = await uploadFileTab.inputAccountTypeOnImportAccountForm(accountType);
        logFailTestcase(temp, 'input Account Type On Import Account Form failed!');
    }
});

When("User verifies information is mapped on select mapping tab - import account form {string}", async (filename) => {
    let temp = true;
    await loader_xlsx(filename).then(async (rows) => {
        let OriginKey = "";
        let MapToField = "Mapped";
        let Value = "";
        let DefaultMapping = "Yes";
        for (let i = 2; i <= rows[0].length; i++) {
            OriginKey = rows[0][i - 1];
            Value = rows[1][i - 1];

            temp = await selectMappingTab.validateOriginKeyOnSelectMappingTab(OriginKey, i);
            logFailTestcase(temp, `Origin key at line ${i} is incorrect!`);

            temp = await selectMappingTab.validateMapToFieldOnSelectMappingTab(MapToField, i);
            logFailTestcase(temp, `Map To Field at line ${i} is incorrect!`);

            temp = await selectMappingTab.validateValuesOnSelectMappingTab(Value, i);
            logFailTestcase(temp, `Value at line ${i} is incorrect!`);

            temp = await selectMappingTab.validateDefaultMappingOnSelectMappingTab(DefaultMapping, i);
            logFailTestcase(temp, `Default Mapping at line ${i} is incorrect!`);

        }
    })
});

When("User verifies information is shown correctly on preview tab - import account form {string}", async (filename) => {
    let temp = true;
    await loader_xlsx(filename).then(async (rows) => {
        let count = rows.length > 10 ? 11 : rows.length;
        for (let i = 1; i < count; i++) {
            logInfoMessage(`Validating values on Preview tab line ${i}....`)
            //Person
            let FirstName = rows[i][rows[0].indexOf("FirstName")];
            let LastName = rows[i][rows[0].indexOf("LastName")];
            let DOB = rows[i][rows[0].indexOf("DOB")];
            let Gender = rows[i][rows[0].indexOf("Gender")];
            let Address = rows[i][rows[0].indexOf("Address")];
            let Postcode = rows[i][rows[0].indexOf("Postcode")];
            let City = rows[i][rows[0].indexOf("City")];
            let Country = rows[i][rows[0].indexOf("Country")];
            let EmailAddress = rows[i][rows[0].indexOf("EmailAddress")];
            let PhoneNumber = rows[i][rows[0].indexOf("PhoneNumber")];
            let PreferredCommunication = rows[i][rows[0].indexOf("PreferredCommunication")];
            let Status = rows[i][rows[0].indexOf("Status")];
            let PaymentType = rows[i][rows[0].indexOf("PaymentType")];
            let PaymentMethod = rows[i][rows[0].indexOf("PaymentMethod")];
            let KAM = rows[i][rows[0].indexOf("KAM")];

            //Company
            let CompanyName = rows[i][rows[0].indexOf("CompanyName")];
            let VisitingAddress = rows[i][rows[0].indexOf("VisitingAddress")];
            let ExtraVisitingAddress = rows[i][rows[0].indexOf("ExtraVisitingAddress")];
            let VisitingPostcode = rows[i][rows[0].indexOf("VisitingPostcode")];
            let VisitingCity = rows[i][rows[0].indexOf("VisitingCity")];
            let PostalAddress = rows[i][rows[0].indexOf("PostalAddress")];
            let PostalExtraAddress = rows[i][rows[0].indexOf("PostalExtraAddress")];
            let PostalPostcode = rows[i][rows[0].indexOf("PostalPostcode")];
            let PostalCity = rows[i][rows[0].indexOf("PostalCity")];
            let InvoiceAddress = rows[i][rows[0].indexOf("InvoiceAddress")];
            let InvoiceExtraAddress = rows[i][rows[0].indexOf("InvoiceExtraAddress")];
            let InvoicePostcode = rows[i][rows[0].indexOf("InvoicePostcode")];
            let InvoiceCity = rows[i][rows[0].indexOf("InvoiceCity")];
            let Industry = rows[i][rows[0].indexOf("Industry")];

            //#region PERSON
            if (FirstName) {
                temp = await previewTab.validateFirstNameOnPreviewTab(FirstName, i);
                logFailTestcase(temp, `FirstName On Preview Tab at line ${i} is incorrect!`);

                if (LastName) {
                    temp = await previewTab.validateLastNameOnPreviewTab(LastName, i);
                    logFailTestcase(temp, `LastName On Preview Tab at line ${i} is incorrect!`);
                }
                if (DOB) {
                    temp = await previewTab.validateDOBOnPreviewTab(DOB, i);
                    logFailTestcase(temp, `DOB On Preview Tab at line ${i} is incorrect!`);
                }
                if (Gender) {
                    temp = await previewTab.validateGenderOnPreviewTab(Gender, i);
                    logFailTestcase(temp, `Gender On Preview Tab at line ${i} is incorrect!`);
                }
                if (Address) {
                    temp = await previewTab.validateAddressOnPreviewTab(Address, i);
                    logFailTestcase(temp, `Address On Preview Tab at line ${i} is incorrect!`);
                }
                if (Postcode) {
                    temp = await previewTab.validatePostcodeOnPreviewTab(Postcode, i);
                    logFailTestcase(temp, `Postcode On Preview Tab at line ${i} is incorrect!`);
                }
                if (City) {
                    temp = await previewTab.validateCityOnPreviewTab(City, i);
                    logFailTestcase(temp, `City On Preview Tab at line ${i} is incorrect!`);
                }
                if (Country) {
                    temp = await previewTab.validateCountryOnPreviewTabPERSON(Country, i);
                    logFailTestcase(temp, `Country On Preview Tab at line ${i} is incorrect!`);
                }
                if (EmailAddress) {
                    temp = await previewTab.validateEmailAddressOnPreviewTabPERSON(EmailAddress, i);
                    logFailTestcase(temp, `EmailAddress On Preview Tab at line ${i} is incorrect!`);
                }
                if (PhoneNumber) {
                    temp = await previewTab.validatePhoneNumberOnPreviewTabPERSON(PhoneNumber, i);
                    logFailTestcase(temp, `PhoneNumber On Preview Tab at line ${i} is incorrect!`);
                }
                if (PreferredCommunication) {
                    temp = await previewTab.validatePreferredCommunicationOnPreviewTab(PreferredCommunication, i);
                    logFailTestcase(temp, `PreferredCommunication On Preview Tab at line ${i} is incorrect!`);
                }
                if (Status) {
                    temp = await previewTab.validateStatusOnPreviewTabPERSON(Status, i);
                    logFailTestcase(temp, `Status On Preview Tab at line ${i} is incorrect!`);
                }
                if (PaymentType) {
                    temp = await previewTab.validatePaymentTypeOnPreviewTabPERSON(PaymentType, i);
                    logFailTestcase(temp, `PaymentType On Preview Tab at line ${i} is incorrect!`);
                }
                if (PaymentMethod) {
                    temp = await previewTab.validatePaymentMethodOnPreviewTabPERSON(PaymentMethod, i);
                    logFailTestcase(temp, `PaymentMethod On Preview Tab at line ${i} is incorrect!`);
                }
                if (KAM) {
                    temp = await previewTab.validateKAMOnPreviewTabPERSON(KAM, i);
                    logFailTestcase(temp, `KAM On Preview Tab at line ${i} is incorrect!`);
                }
            }

            //#endregion

            //#region COMPANY
            if (CompanyName) {
                temp = await previewTab.validateFirstNameOnPreviewTab(CompanyName, i);
                logFailTestcase(temp, `CompanyName On Preview Tab at line ${i} is incorrect!`);

                if (Status) {
                    temp = await previewTab.validateStatusOnPreviewTabCOMPANY(Status, i);
                    logFailTestcase(temp, `Status On Preview Tab at line ${i} is incorrect!`);
                }
                if (EmailAddress) {
                    temp = await previewTab.validateEmailAddressOnPreviewTabCOMPANY(EmailAddress, i);
                    logFailTestcase(temp, `EmailAddress On Preview Tab at line ${i} is incorrect!`);
                }
                if (PhoneNumber) {
                    temp = await previewTab.validatePhoneNumberOnPreviewTabCOMPANY(PhoneNumber, i);
                    logFailTestcase(temp, `PhoneNumber On Preview Tab at line ${i} is incorrect!`);
                }
                if (Country) {
                    temp = await previewTab.validateCountryOnPreviewTabCOMPANY(Country, i);
                    logFailTestcase(temp, `Country On Preview Tab at line ${i} is incorrect!`);
                }
                if (VisitingAddress) {
                    temp = await previewTab.validateVisitingAddressOnPreviewTab(VisitingAddress, i);
                    logFailTestcase(temp, `VisitingAddress On Preview Tab at line ${i} is incorrect!`);
                }
                if (ExtraVisitingAddress) {
                    temp = await previewTab.validateExtraVisitingAddressOnPreviewTab(ExtraVisitingAddress, i);
                    logFailTestcase(temp, `ExtraVisitingAddress On Preview Tab at line ${i} is incorrect!`);
                }
                if (VisitingPostcode) {
                    temp = await previewTab.validateVisitingPostcodeOnPreviewTab(VisitingPostcode, i);
                    logFailTestcase(temp, `VisitingPostcode On Preview Tab at line ${i} is incorrect!`);
                }
                if (VisitingCity) {
                    temp = await previewTab.validateVisitingCityOnPreviewTab(VisitingCity, i);
                    logFailTestcase(temp, `VisitingCity On Preview Tab at line ${i} is incorrect!`);
                }
                if (PostalAddress) {
                    temp = await previewTab.validatePostalAddressOnPreviewTab(PostalAddress, i);
                    logFailTestcase(temp, `PostalAddress On Preview Tab at line ${i} is incorrect!`);
                }
                if (PostalExtraAddress) {
                    temp = await previewTab.validatePostalExtraAddressOnPreviewTab(PostalExtraAddress, i);
                    logFailTestcase(temp, `PostalExtraAddress On Preview Tab at line ${i} is incorrect!`);
                }
                if (PostalPostcode) {
                    temp = await previewTab.validatePostalPostcodeOnPreviewTab(PostalPostcode, i);
                    logFailTestcase(temp, `PostalPostcode On Preview Tab at line ${i} is incorrect!`);
                }
                if (PostalCity) {
                    temp = await previewTab.validatePostalCityOnPreviewTab(PostalCity, i);
                    logFailTestcase(temp, `PostalCity On Preview Tab at line ${i} is incorrect!`);
                }
                if (InvoiceAddress) {
                    temp = await previewTab.validateInvoiceAddressOnPreviewTab(InvoiceAddress, i);
                    logFailTestcase(temp, `InvoiceAddress On Preview Tab at line ${i} is incorrect!`);
                }
                if (InvoiceExtraAddress) {
                    temp = await previewTab.validateInvoiceExtraAddressOnPreviewTab(InvoiceExtraAddress, i);
                    logFailTestcase(temp, `InvoiceExtraAddress On Preview Tab at line ${i} is incorrect!`);
                }
                if (InvoicePostcode) {
                    temp = await previewTab.validateInvoicePostcodeOnPreviewTab(InvoicePostcode, i);
                    logFailTestcase(temp, `InvoicePostcode On Preview Tab at line ${i} is incorrect!`);
                }
                if (InvoiceCity) {
                    temp = await previewTab.validateInvoiceCityOnPreviewTab(InvoiceCity, i);
                    logFailTestcase(temp, `InvoiceCity On Preview Tab at line ${i} is incorrect!`);
                }
                if (Industry) {
                    temp = await previewTab.validateIndustryOnPreviewTab(Industry, i);
                    logFailTestcase(temp, `Industry On Preview Tab at line ${i} is incorrect!`);
                }
                if (PaymentType) {
                    temp = await previewTab.validatePaymentTypeOnPreviewTabCOMPANY(PaymentType, i);
                    logFailTestcase(temp, `PaymentType On Preview Tab at line ${i} is incorrect!`);
                }
                if (PaymentMethod) {
                    temp = await previewTab.validatePaymentMethodOnPreviewTabCOMPANY(PaymentMethod, i);
                    logFailTestcase(temp, `PaymentMethod On Preview Tab at line ${i} is incorrect!`);
                }
                if (KAM) {
                    temp = await previewTab.validateKAMOnPreviewTabCOMPANY(KAM, i);
                    logFailTestcase(temp, `KAM On Preview Tab at line ${i} is incorrect!`);
                }

            }

            //#endregion
        }
    })
});

When("User waits until the account imported process is finished", async () => {
    //step pending until bug fix

    await globalPageObject.waitForProgressBarLoaded();

});

Then("System shows correct information of imported accounts at account list {string}", async (filename) => {
    let temp = true;
    await loader_xlsx(filename).then(async (rows) => {
        const TotalOriginalrecord = await globalPageObject.getNumberOfTotalRecordsMainTab();
        await globalPageObject.expandNumberOfItemMainList(50);
        let TotalRecordActual = 0;

        for (let i = 0; i < 20; i++) {
            await globalPageObject.reloadTable(5000);
            TotalRecordActual = await globalPageObject.getNumberOfTotalRecordsMainTab();
            let TheNumberOfActualGeneratedAccount = TotalRecordActual - TotalOriginalrecord;
            if (TheNumberOfActualGeneratedAccount < rows.length - 1) {
                logWarningMessage(`Total accounts generated : ${TheNumberOfActualGeneratedAccount}, please waiting Total accounts reach to ${rows.length - 1}`);
                logInfoMessage("waiting for 3s...");
            } else if (TheNumberOfActualGeneratedAccount == 0 && i > 10) {
                logFailTestcase(false, `System does not generate guarantees on list!`);
            }
            else {
                logSuccessMessage(`Total accounts generated : ${TheNumberOfActualGeneratedAccount}`);
                break;
            }

        }
        for (let i = rows.length - 1; i > 0; i--) { // the loop on excel file
            logInfoMessage(`Validating values of excel file line ${i} on account list ....`)
            //Person
            let FirstName = rows[i][rows[0].indexOf("FirstName")];
            let LastName = rows[i][rows[0].indexOf("LastName")];
            let DOB = rows[i][rows[0].indexOf("DOB")];
            let Gender = rows[i][rows[0].indexOf("Gender")];
            let Address = rows[i][rows[0].indexOf("Address")];
            let Postcode = rows[i][rows[0].indexOf("Postcode")];
            let City = rows[i][rows[0].indexOf("City")];
            let Country = rows[i][rows[0].indexOf("Country")];
            let EmailAddress = rows[i][rows[0].indexOf("EmailAddress")];
            let PhoneNumber = rows[i][rows[0].indexOf("PhoneNumber")];
            let PreferredCommunication = rows[i][rows[0].indexOf("PreferredCommunication")];
            let Status = rows[i][rows[0].indexOf("Status")];
            let PaymentType = rows[i][rows[0].indexOf("PaymentType")];
            let PaymentMethod = rows[i][rows[0].indexOf("PaymentMethod")];
            let KAM = rows[i][rows[0].indexOf("KAM")];

            //Company
            let CompanyName = rows[i][rows[0].indexOf("CompanyName")];
            let VisitingAddress = rows[i][rows[0].indexOf("VisitingAddress")];
            let ExtraVisitingAddress = rows[i][rows[0].indexOf("ExtraVisitingAddress")];
            let VisitingPostcode = rows[i][rows[0].indexOf("VisitingPostcode")];
            let VisitingCity = rows[i][rows[0].indexOf("VisitingCity")];
            let PostalAddress = rows[i][rows[0].indexOf("PostalAddress")];
            let PostalExtraAddress = rows[i][rows[0].indexOf("PostalExtraAddress")];
            let PostalPostcode = rows[i][rows[0].indexOf("PostalPostcode")];
            let PostalCity = rows[i][rows[0].indexOf("PostalCity")];
            let InvoiceAddress = rows[i][rows[0].indexOf("InvoiceAddress")];
            let InvoiceExtraAddress = rows[i][rows[0].indexOf("InvoiceExtraAddress")];
            let InvoicePostcode = rows[i][rows[0].indexOf("InvoicePostcode")];
            let InvoiceCity = rows[i][rows[0].indexOf("InvoiceCity")];
            let Industry = rows[i][rows[0].indexOf("Industry")];
            for (let j = 1; j < rows.length; j++) {
                let expectedName = "";

                if (FirstName) {
                    expectedName = FirstName + " " + LastName
                } else {
                    expectedName  = CompanyName ;
                }
                let findAccountByName = await accountList.validateNameOnAccountList(expectedName,j);

                if (findAccountByName) {
                    //#region Validate value for PERSON account
                    if (FirstName) {
                        //#region validate value on account list
                        temp = await accountList.validateAddressOnAccountList(Address, j);
                        logFailTestcase(temp, `Incorrect Address on Account List row ${j}`);

                        temp = await accountList.validatePostcodeOnAccountList(Postcode, j);
                        logFailTestcase(temp, `Incorrect Postcode on Account List row ${j}`);

                        temp = await accountList.validateCityOnAccountList(City, j);
                        logFailTestcase(temp, `Incorrect City on Account List row ${j}`);

                        temp = await accountList.validateEmailOnAccountList(EmailAddress, j);
                        logFailTestcase(temp, `Incorrect Email on Account List row ${j}`);

                        temp = await accountList.validatePhoneOnAccountList(PhoneNumber, j);
                        logFailTestcase(temp, `Incorrect Phone on Account List row ${j}`);

                        temp = await accountList.validateKAMOnAccountList(KAM, j);
                        logFailTestcase(temp, `Incorrect KAM on Account List row ${j}`);

                        temp = await accountList.validateStatusOnAccountList(Status, j);
                        logFailTestcase(temp, `Incorrect Status on Account List row ${j}`);

                        //#endregion

                        temp = await accountList.openEditAccountFormByRow(j);
                        logFailTestcase(temp, `open Edit Account Form row ${j} failed!`);

                        await globalPageObject.waitForSeconds(3000);

                        //#region validate value on account form
                        temp = await accountForm.validateFirstNameValueOnAccountPersonForm(FirstName);
                        logFailTestcase(temp, `Incorrect FirstName on Account form`);

                        temp = await accountForm.validateLastNameValueOnAccountPersonForm(LastName);
                        logFailTestcase(temp, `Incorrect LastName on Account form`);

                        temp = await accountForm.validateDOBValueOnAccountPersonForm(ExcelDateToJSDate(DOB));
                        logFailTestcase(temp, `Incorrect DOB on Account form`);

                        temp = await accountForm.validatePhoneNumberValueOnAccountPersonForm(PhoneNumber);
                        logFailTestcase(temp, `Incorrect PhoneNumber on Account form`);

                        temp = await accountForm.validateGenderValueOnAccountPersonForm(Gender);
                        logFailTestcase(temp, `Incorrect Gender on Account form`);

                        temp = await accountForm.validateAddressValueOnAccountPersonForm(Address);
                        logFailTestcase(temp, `Incorrect Address on Account form`);

                        temp = await accountForm.validatePostcodeValueOnAccountPersonForm(Postcode);
                        logFailTestcase(temp, `Incorrect Postcode on Account form`);

                        temp = await accountForm.validateCityValueOnAccountPersonForm(City);
                        logFailTestcase(temp, `Incorrect City on Account form`);

                        temp = await accountForm.validateCountryValueOnAccountPersonForm(Country);
                        logFailTestcase(temp, `Incorrect Country on Account form`);

                        temp = await accountForm.validateEmailAddressValueOnAccountPersonForm(EmailAddress);
                        logFailTestcase(temp, `Incorrect EmailAddress on Account form`);

                        temp = await accountForm.validatePreferredCommunicationValueOnAccountPersonForm(PreferredCommunication);
                        logFailTestcase(temp, `Incorrect PreferredCommunication on Account form`);

                        temp = await accountForm.validateStatusValueOnAccountPersonForm(Status);
                        logFailTestcase(temp, `Incorrect Status on Account form`);

                        temp = await accountForm.validatePaymentTypeValueOnAccountPersonForm(PaymentType);
                        logFailTestcase(temp, `Incorrect PaymentType on Account form`);

                        temp = await accountForm.validatePaymentFrequencyValueOnAccountPersonForm(PaymentMethod);
                        logFailTestcase(temp, `Incorrect PaymentMethod on Account form`);

                        temp = await accountForm.validateKAMValueOnAccountPersonForm(KAM);
                        logFailTestcase(temp, `Incorrect KAM on Account form`);

                        await globalPageObject.closeOpeningForm();

                        //#endregion

                    }
                    //#endregion

                    //#region validate value for COMPANY account
                    if (CompanyName) {
                         //#region validate value on account list
                        temp = await accountList.validateNameOnAccountList(CompanyName, j);
                        logFailTestcase(temp, `Incorrect Name on Account List row ${j}`);

                        temp = await accountList.validateAddressOnAccountList(VisitingAddress + ", " + InvoiceAddress + ", " + PostalAddress, j);
                        logFailTestcase(temp, `Incorrect Address on Account List row ${j}`);

                        temp = await accountList.validateExtraAddressOnAccountList(ExtraVisitingAddress + ", " + InvoiceExtraAddress + ", " + PostalExtraAddress, j);
                        logFailTestcase(temp, `Incorrect Address on Account List row ${j}`);

                        temp = await accountList.validatePostcodeOnAccountList(VisitingPostcode + ", " + InvoicePostcode + ", " + PostalPostcode, j);
                        logFailTestcase(temp, `Incorrect Postcode on Account List row ${j}`);

                        temp = await accountList.validateCityOnAccountList(VisitingCity + ", " + InvoiceCity + ", " + PostalCity, j);
                        logFailTestcase(temp, `Incorrect City on Account List row ${j}`);

                        temp = await accountList.validateEmailOnAccountList(EmailAddress, j);
                        logFailTestcase(temp, `Incorrect Email on Account List row ${j}`);

                        temp = await accountList.validatePhoneOnAccountList(PhoneNumber, j);
                        logFailTestcase(temp, `Incorrect Phone on Account List row ${j}`);

                        temp = await accountList.validateKAMOnAccountList(KAM, j);
                        logFailTestcase(temp, `Incorrect KAM on Account List row ${j}`);

                        temp = await accountList.validateStatusOnAccountList(Status, j);
                        logFailTestcase(temp, `Incorrect Status on Account List row ${j}`);

                        temp = await accountList.openEditAccountFormByRow(j);
                        logFailTestcase(temp, `open Edit Account Form row ${j} failed!`);
                            
                        //#endregion

                        await globalPageObject.waitForSeconds(3000);

                
                        //#region validate value on account form
                        temp = await accountForm.validateCompanyNameValueOnAccountCompanyForm(CompanyName);
                        logFailTestcase(temp, `Incorrect CompanyName on Account form`);

                        temp = await accountForm.validateEmailAddressValueOnAccountCompanyForm(EmailAddress);
                        logFailTestcase(temp, `Incorrect EmailAddress on Account form`);

                        temp = await accountForm.validateCompanyPhoneValueOnAccountCompanyForm(PhoneNumber);
                        logFailTestcase(temp, `Incorrect CompanyPhone on Account form`);

                        temp = await accountForm.validateStatusValueOnAccountCompanyForm(Status);
                        logFailTestcase(temp, `Incorrect Status on Account form`);

                        temp = await accountForm.validateCountryValueOnAccountCompanyForm(Country);
                        logFailTestcase(temp, `Incorrect Country on Account form`);

                        temp = await accountForm.validateVisitingAddressValueOnAccountCompanyForm(VisitingAddress);
                        logFailTestcase(temp, `Incorrect VisitingAddress on Account form`);

                        temp = await accountForm.validateVisitingExtraAddressValueOnAccountCompanyForm(ExtraVisitingAddress);
                        logFailTestcase(temp, `Incorrect ExtraVisitingAddress on Account form`);

                        temp = await accountForm.validateVisitingPostcodeValueOnAccountCompanyForm(VisitingPostcode);
                        logFailTestcase(temp, `Incorrect VisitingPostcode on Account form`);

                        temp = await accountForm.validateVisitingCityValueOnAccountCompanyForm(VisitingCity);
                        logFailTestcase(temp, `Incorrect VisitingCity on Account form`);

                        temp = await accountForm.validatePostalAddressValueOnAccountCompanyForm(PostalAddress);
                        logFailTestcase(temp, `Incorrect PostalAddress on Account form`);

                        temp = await accountForm.validatePostalExtraAddressValueOnAccountCompanyForm(PostalExtraAddress);
                        logFailTestcase(temp, `Incorrect PostalExtraAddress on Account form`);

                        temp = await accountForm.validatePostalPostcodeValueOnAccountCompanyForm(PostalPostcode);
                        logFailTestcase(temp, `Incorrect PostalPostcode on Account form`);

                        temp = await accountForm.validatePostalCityValueOnAccountCompanyForm(PostalCity);
                        logFailTestcase(temp, `Incorrect PostalCity on Account form`);

                        temp = await accountForm.validateInvoiceAddressValueOnAccountCompanyForm(InvoiceAddress);
                        logFailTestcase(temp, `Incorrect InvoiceAddress on Account form`);

                        temp = await accountForm.validateInvoiceExtraAddressValueOnAccountCompanyForm(InvoiceExtraAddress);
                        logFailTestcase(temp, `Incorrect InvoiceExtraAddress on Account form`);

                        temp = await accountForm.validateInvoicePostcodeValueOnAccountCompanyForm(InvoicePostcode);
                        logFailTestcase(temp, `Incorrect InvoicePostcode on Account form`);

                        temp = await accountForm.validateInvoiceCityValueOnAccountCompanyForm(InvoiceCity);
                        logFailTestcase(temp, `Incorrect InvoiceCity on Account form`);

                        temp = await accountForm.validatePaymentTypeValueOnAccountCompanyForm(PaymentType);
                        logFailTestcase(temp, `Incorrect PaymentType on Account form`);

                        temp = await accountForm.validatePaymentFrequencyValueOnAccountCompanyForm(PaymentMethod);
                        logFailTestcase(temp, `Incorrect PaymentMethod on Account form`);

                        temp = await accountForm.validateKAMValueOnAccountCompanyForm(KAM);
                        logFailTestcase(temp, `Incorrect KAM on Account form`);

                        temp = await accountForm.validateIndustryValueOnAccountCompanyForm(Industry);
                        logFailTestcase(temp, `Incorrect Industry on Account form`);

                        await globalPageObject.closeOpeningForm();
                        //#endregion
                    }
                    //#endregion

                    break;
                }else if (findAccountByName == false && j == rows.length - 1) {
                    logFailTestcase(findAccountByName, `Can not find the account which has "${expectedName}" name`);
                    break;
                }

            }
        }


    })

});
