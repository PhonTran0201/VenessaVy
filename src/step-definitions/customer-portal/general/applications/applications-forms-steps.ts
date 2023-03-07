import { Before, Then, When } from "@cucumber/cucumber";
import { ApplicationFormBasicInformationAGSHogs } from "../../../../page-objects/agent-portal/hogs/application/application-form/ApplicationFormBasicInformationAGSHogs";
import { ApplicationFormContractAndGuaranteeAGSHogs } from "../../../../page-objects/agent-portal/hogs/application/application-form/ApplicationFormContractAndGuaranteeAGSHogs";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { ApplicationFormBasicInformation } from "../../../../page-objects/back-office-portal/guarantee/application/application-forms/ApplicationFormBasicInformation";
import { ApplicationFormContractAndGuarantee } from "../../../../page-objects/back-office-portal/guarantee/application/application-forms/ApplicationFormContractAndGuarantee";
import { ApplicationFormPayment } from "../../../../page-objects/back-office-portal/guarantee/application/application-forms/ApplicationFormPayment";
import { CorrectionForm } from "../../../../page-objects/back-office-portal/guarantee/application/correction-form/CorrectionForm";
import { ApprovalFormCP } from "../../../../page-objects/customer-portal/general/application/approval-form/ApprovalFormCP";
import { ApplicationFormBasicInformationCPGuaranteeAtlas } from "../../../../page-objects/customer-portal/guarantee/atlas/application/application-forms/ApplicationFormBasicInformationCPGuaranteeAtlas";
import { ApplicationFormContractAndGuaranteeCPGuaranteeAtlas } from "../../../../page-objects/customer-portal/guarantee/atlas/application/application-forms/ApplicationFormContractAndGuaranteeCPGuaranteeAtlas";
import { ApplicationFormPaymentCPGuaranteeAtlas } from "../../../../page-objects/customer-portal/guarantee/atlas/application/application-forms/ApplicationFormPaymentCPGuaranteeAtlas";
import { ApplicationFormPreviewCPGuaranteeAtlas } from "../../../../page-objects/customer-portal/guarantee/atlas/application/application-forms/ApplicationFormPreviewCPGuaranteeAtlas";
import { ApprovalFormCPGuaranteeAtlas } from "../../../../page-objects/customer-portal/guarantee/atlas/application/approval-form/ApprovalFormCPGuaranteeAtlas";
import { ApplicationFormBasicInformationCPGuaranteeHogs } from "../../../../page-objects/customer-portal/guarantee/hogs/application/application-forms/ApplicationFormBasicInformationCPGuaranteeHogs";
import { ApplicationFormContractAndGuaranteeCPGuaranteeHogs } from "../../../../page-objects/customer-portal/guarantee/hogs/application/application-forms/ApplicationFormContractAndGuaranteeCPGuaranteeHogs";
import { ApplicationFormPaymentCPGuaranteeHogs } from "../../../../page-objects/customer-portal/guarantee/hogs/application/application-forms/ApplicationFormPaymentCPGuaranteeHogs";
import { ApplicationFormPreviewCPGuaranteeHogs } from "../../../../page-objects/customer-portal/guarantee/hogs/application/application-forms/ApplicationFormPreviewCPGuaranteeHogs";
import { ApprovalFormCPGuaranteeHogs } from "../../../../page-objects/customer-portal/guarantee/hogs/application/approval-form/ApprovalFormCPGuaranteeHogs";
import { ValidateField } from "../../../../shared/classes";
import { addDate, convertPathFileDataToDataRegression, getDate, logFailTestcase, logInfoMessage, logWarningMessage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { currencyToNumber, formatDateTime, getDefaultCurrency, numberToCurrency } from "../../../../shared/tenant-setting/tenant-setting";
import { dataTestcase, scenarioTags } from "../../../../shared/variables";

const loader = require("csv-load-sync");

let applicationFormBasicInformation: ApplicationFormBasicInformation;
let applicationFormContractAndGuarantee: ApplicationFormContractAndGuarantee;
let applicationFormPaymentCPGuaranteeAtlas: ApplicationFormPayment;
let applicationFormPreviewCPGuaranteeAtlas: ApplicationFormPreviewCPGuaranteeAtlas;
let approvalFormCP: ApprovalFormCP;
let correctionForm: CorrectionForm;
let globalPageObject: GlobalPageObject;

Before(async function () {
    const context: ICommonContext = this.context;
    if (scenarioTags.has("@CustomerPortalAtlas")) {
        applicationFormBasicInformation = new ApplicationFormBasicInformationCPGuaranteeAtlas(context.driverService);
        applicationFormContractAndGuarantee = new ApplicationFormContractAndGuaranteeCPGuaranteeAtlas(context.driverService);
        applicationFormPaymentCPGuaranteeAtlas = new ApplicationFormPaymentCPGuaranteeAtlas(context.driverService);
        applicationFormPreviewCPGuaranteeAtlas = new ApplicationFormPreviewCPGuaranteeAtlas(context.driverService);
        approvalFormCP = new ApprovalFormCPGuaranteeAtlas(context.driverService);
        globalPageObject = new GlobalPageObject(context.driverService);
    }
    if (scenarioTags.has("@CustomerPortalHogs")) {
        applicationFormBasicInformation = new ApplicationFormBasicInformationCPGuaranteeHogs(context.driverService);
        applicationFormContractAndGuarantee = new ApplicationFormContractAndGuaranteeCPGuaranteeHogs(context.driverService);
        applicationFormPaymentCPGuaranteeAtlas = new ApplicationFormPaymentCPGuaranteeHogs(context.driverService);
        applicationFormPreviewCPGuaranteeAtlas = new ApplicationFormPreviewCPGuaranteeHogs(context.driverService);
        approvalFormCP = new ApprovalFormCPGuaranteeHogs(context.driverService);
        globalPageObject = new GlobalPageObject(context.driverService);
    }
    if (scenarioTags.has("@AgentPortalHogs")) {
        applicationFormBasicInformation = new ApplicationFormBasicInformationAGSHogs(context.driverService);
        applicationFormContractAndGuarantee = new ApplicationFormContractAndGuaranteeAGSHogs(context.driverService);
        applicationFormPaymentCPGuaranteeAtlas = new ApplicationFormPaymentCPGuaranteeHogs(context.driverService);
        applicationFormPreviewCPGuaranteeAtlas = new ApplicationFormPreviewCPGuaranteeHogs(context.driverService);
    }
    else {
        const context: ICommonContext = this.context;
        correctionForm = new CorrectionForm(context.driverService);
        globalPageObject = new GlobalPageObject(context.driverService);
    }
});

When("User verifies information at Basic information Application form {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const DescriptionGuarantee = rows[0].DescriptionGuarantee;
    const GuaranteeTypeGuarantee = rows[0].GuaranteeTypeGuarantee;
    const CurrencyGuarantee = getDefaultCurrency();
    const OrdererDebtor = rows[0].OrdererDebtor;


    let temp = await applicationFormBasicInformation.validateDescriptionGuarantee(DescriptionGuarantee);
    logFailTestcase(temp);

    temp = await applicationFormBasicInformation.validateGuaranteeTypeGuarantee(GuaranteeTypeGuarantee);
    logFailTestcase(temp);

    temp = await applicationFormBasicInformation.validateCurrencyGuarantee(CurrencyGuarantee);
    logFailTestcase(temp);

    temp = await applicationFormBasicInformation.validateOrdererDebtor(OrdererDebtor);
    logFailTestcase(temp);
});

When("User inputs valid data into Basic information Application form {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];

    // General = Guarantee
    const DescriptionGuarantee = row.DescriptionGuarantee;

    // Beneficiary
    const ValidateDefaultAnswerCheckbox = row.ValidateDefaultAnswerCheckbox;
    const IsPersonBeneficiary = row.IsPersonBeneficiary;
    const BeneficiaryBeneficiary = row.BeneficiaryBeneficiary;
    const DateOfBirthBeneficiary = row.DateOfBirthBeneficiary;
    const OrgNrBeneficiary = row.OrgNrBeneficiary;
    const AddressBeneficiary = row.AddressBeneficiary;
    const PostcodeBeneficiary = row.PostcodeBeneficiary;
    const CityBeneficiary = row.CityBeneficiary;
    const OtherInformationBeneficiary = row.OtherInformationBeneficiary;

    //Beneficiary 2
    const Beneficiary2Beneficiary = row.Beneficiary2Beneficiary;
    const DateOfBirth2Beneficiary = row.DateOfBirth2Beneficiary;
    const OrgNr2Beneficiary = row.OrgNr2Beneficiary;
    const Address2Beneficiary = row.Address2Beneficiary;
    const Postcode2Beneficiary = row.Postcode2Beneficiary;
    const City2Beneficiary = row.City2Beneficiary;
    const OtherInformation2Beneficiary = row.OtherInformation2Beneficiary;


    // Debtor
    const OtherInformationDebtor = row.OtherInformationDebtor;
    let temp = true;
    //#region Inputs form
    // General = Guarantee
    if (DescriptionGuarantee) {
        temp = await applicationFormBasicInformation.inputDescriptionGuarantee(DescriptionGuarantee);
        logFailTestcase(temp, "Input description failed!");
    }

    // Beneficiary
    if (IsPersonBeneficiary && (IsPersonBeneficiary.localeCompare("Yes") === 0 || IsPersonBeneficiary.localeCompare("yes") === 0)) {
        if (ValidateDefaultAnswerCheckbox && (ValidateDefaultAnswerCheckbox.localeCompare("Yes") === 0 || ValidateDefaultAnswerCheckbox.localeCompare("yes")) === 0) {
            temp = await applicationFormBasicInformation.IsPersonBeneficiaryChecked();
            logFailTestcase(temp, "assert default Is Person Beneficiary Checked failed!");
        }
        if (!await applicationFormBasicInformation.IsPersonBeneficiaryChecked()) {
            temp = await applicationFormBasicInformation.checkIsPersonBeneficiary();
            logFailTestcase(temp, "Check IsPerson failed!");
        }
    } else if (IsPersonBeneficiary && (IsPersonBeneficiary.localeCompare("No") === 0 || IsPersonBeneficiary.localeCompare("no") === 0)) {
        if (ValidateDefaultAnswerCheckbox && (ValidateDefaultAnswerCheckbox.localeCompare("Yes") === 0 || ValidateDefaultAnswerCheckbox.localeCompare("yes") === 0)) {
            temp = await applicationFormBasicInformation.IsPersonBeneficiaryChecked();
            logFailTestcase(temp, "assert default Is Person Beneficiary Checked failed!");
        }
        if (await applicationFormBasicInformation.IsPersonBeneficiaryChecked()) {
            temp = await applicationFormBasicInformation.checkIsPersonBeneficiary();
            logFailTestcase(temp, "Check IsPerson failed!");
        }
    }

    if (BeneficiaryBeneficiary) {
        temp = await applicationFormBasicInformation.inputBeneficiaryBeneficiary(BeneficiaryBeneficiary);
        logFailTestcase(temp, "Input Beneficiary failed!");
    }

    if (OrgNrBeneficiary) {
        temp = await applicationFormBasicInformation.inputOrgNrBeneficiary(OrgNrBeneficiary);
        logFailTestcase(temp, "Input OrgNr failed!");
    }

    if (DateOfBirthBeneficiary) {
        temp = await applicationFormBasicInformation.inputDateOfBirthBeneficiary(DateOfBirthBeneficiary);
        logFailTestcase(temp, "Input DateOfBirth failed!");
    }

    if (AddressBeneficiary) {
        temp = await applicationFormBasicInformation.inputAddressBeneficiary(AddressBeneficiary);
        logFailTestcase(temp, "Input Address failed!");
    }

    if (PostcodeBeneficiary) {
        temp = await applicationFormBasicInformation.inputPostcodeBeneficiary(PostcodeBeneficiary);
        logFailTestcase(temp, "Input postcode failed!");
    }

    if (CityBeneficiary) {
        temp = await applicationFormBasicInformation.inputCityBeneficiary(CityBeneficiary);
        logFailTestcase(temp, "Input City failed!");
    }

    if (OtherInformationBeneficiary) {
        temp = await applicationFormBasicInformation.inputOtherInformationBeneficiary(OtherInformationBeneficiary);
        logFailTestcase(temp, "Input Other information Beneficiary failed!");
    }

    //Beneficiary 2
    if (Beneficiary2Beneficiary) {
        temp = await applicationFormBasicInformation.inputBeneficiary2Beneficiary(Beneficiary2Beneficiary);
        logFailTestcase(temp, "Input Beneficiary 2 failed!");
    }

    if (OrgNr2Beneficiary) {
        temp = await applicationFormBasicInformation.inputOrgNr2Beneficiary(OrgNr2Beneficiary);
        logFailTestcase(temp, "Input OrgNr 2 failed!");
    }

    if (DateOfBirth2Beneficiary) {
        temp = await applicationFormBasicInformation.inputDateOfBirth2Beneficiary(DateOfBirth2Beneficiary);
        logFailTestcase(temp, "Input DateOfBirth 2 failed!");
    }

    if (Address2Beneficiary) {
        temp = await applicationFormBasicInformation.inputAddress2Beneficiary(Address2Beneficiary);
        logFailTestcase(temp, "Input Address 2 failed!");
    }

    if (Postcode2Beneficiary) {
        temp = await applicationFormBasicInformation.inputPostcode2Beneficiary(Postcode2Beneficiary);
        logFailTestcase(temp, "Input postcode 2 failed!");
    }

    if (City2Beneficiary) {
        temp = await applicationFormBasicInformation.inputCity2Beneficiary(City2Beneficiary);
        logFailTestcase(temp, "Input City 2 failed!");
    }

    if (OtherInformation2Beneficiary) {
        temp = await applicationFormBasicInformation.inputOtherInformation2Beneficiary(OtherInformation2Beneficiary);
        logFailTestcase(temp, "Input Other information 2 Beneficiary failed!");
    }


    //Debtor
    if (OtherInformationDebtor) {
        temp = await applicationFormBasicInformation.inputOtherInformationDebtor(OtherInformationDebtor);
        logFailTestcase(temp, "Input Other Information debtor failed!");
    }
    //#endregion
});

When("User verifies required and disabled fields at Application form {string}", async (filename) => {
    let temp = true;
    const rows = loader(convertPathFileDataToDataRegression(filename));
    for (let i = 0; i < rows.length; i++) {
        const SectionName = rows[i].SectionName;
        const FieldName = rows[i].FieldName;
        const IsRequired = rows[i].IsRequired;
        const IsDisabled = rows[i].IsDisabled;
        const UseTagNameFor2Phases = rows[i].UseTagNameFor2Phases;

        logInfoMessage(`Verify field on line ${i + 1}...`);
        if (UseTagNameFor2Phases) { // the case is used for product 2 phases when Its has the same FieldName on 2 phases
            if (IsRequired && IsRequired.localeCompare('Yes') === 0) {
                temp = await applicationFormContractAndGuarantee.verifyRequiredFieldOnFormPhase2(SectionName,UseTagNameFor2Phases);
                logFailTestcase(temp, `verify Required Field has '${UseTagNameFor2Phases}' tag name On '${SectionName}' section failed!`);
            }
            if (IsDisabled && IsDisabled.localeCompare('Yes') === 0) {
                temp = await applicationFormContractAndGuarantee.verifyDisabledFieldOnFormPhase2(SectionName,UseTagNameFor2Phases);
                logFailTestcase(temp, `verify Disabled Field has '${UseTagNameFor2Phases}' tag name On '${SectionName}' section failed!`);
            }
        } else {
            if (IsRequired && IsRequired.localeCompare('Yes') === 0) {
                let temp = await globalPageObject.verifyRequiredFieldOnForm(SectionName, FieldName);
                logFailTestcase(temp, `verify '${FieldName}' Required Field On '${SectionName}' section failed!`);
            }
            if (IsDisabled && IsDisabled.localeCompare('Yes') === 0) {
                let temp = await globalPageObject.verifyDisabledFieldOnForm(SectionName, FieldName);
                logFailTestcase(temp, `verify '${FieldName}' Disabled Field On '${SectionName}' section failed!`);
            }
        }
    }
});

When("User inputs valid data into Contact and Guarantee Application form {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const Type = row.Type;

    //CONTRACT AND GUARANTEE
    const TotalContractAmountUnderlying = row.TotalContractAmountUnderlying;
    const ContractReferenceUnderlying = row.ContractReferenceUnderlying;
    const DateForSignedContract = row.DateForSignedContract; //new
    const DateForSignedContractMinusToday = row.DateForSignedContractMinusToday; //new
    const ContractStartDateMinusToday = row.ContractStartDateMinusToday; // ContractStartDateMinusToday (hogs) ~ DateForSignedContractMinusToday (Atlas)
    const UnderlyingContractDocsUnderlying = row.UnderlyingContractDocsUnderlying;
    const ProjectUnderlying = row.ProjectUnderlying;
    const ProjectNameUnderlying = row.ProjectNameUnderlying; //new
    const ProjectAddressUnderlying = row.ProjectAddressUnderlying; //new
    const ProjectDescriptionUnderlying = row.ProjectDescriptionUnderlying; //new
    const ContractCommitmentUnderlying = row.ContractCommitmentUnderlying;
    const GardsnummerUnderlying = row.GardsnummerUnderlying;
    const BruksnummerUnderlying = row.BruksnummerUnderlying;
    const KommuneUnderlying = row.KommuneUnderlying;


    let PeriodStartGuarantee = row.PeriodStartGuarantee;
    let PeriodEndGuarantee = row.PeriodEndGuarantee;
    const StartDateMinusToday = row.StartDateMinusToday;
    const EndDateMinusStartDate = row.EndDateMinusStartDate;

    const GuaranteeAmountGuarantee = row.GuaranteeAmountGuarantee;
    const GuaranteeRateGuarantee = row.GuaranteeRateGuarantee;
    const AmountInWordGuarantee = row.AmountInWordGuarantee;
    const CommentGuarantee = row.CommentGuarantee;
    const ConfirmInformation = row.ConfirmInformation;


    //TWO PHASE
    let PeriodStartGuaranteePhase2 = "";
    let PeriodEndGuaranteePhase2 = "";
    let StartDate2MinusEndDate = row.StartDate2MinusEndDate;
    let EndDate2MinusStartDate2 = row.EndDate2MinusStartDate2;

    let GuaranteeAmountGuaranteePhase2 = row.GuaranteeAmountGuaranteePhase2;
    let GuaranteeRateGuaranteePhase2 = row.GuaranteeRateGuaranteePhase2;
    let CommentGuaranteePhase2 = row.CommentGuaranteePhase2;

    let GuaranteeFeeGuaranteeFeePhase2 = row.GuaranteeFeeGuaranteeFeePhase2;
    let TotalGuaranteeFeeGuaranteeFee = row.TotalGuaranteeFeeGuaranteeFee;



    let temp = true;
    //#region Contact and Guarantee
    // Underlying contract
    if (TotalContractAmountUnderlying) {
        temp = await applicationFormContractAndGuarantee.inputTotalContractAmountUnderlying(TotalContractAmountUnderlying);
        logFailTestcase(temp, "Input TotalContractAmountUnderlying failed!");
    }
    if (ContractReferenceUnderlying) {
        temp = await applicationFormContractAndGuarantee.inputContractReferenceUnderlying(ContractReferenceUnderlying);
        logFailTestcase(temp, "Input ContractReferenceUnderlying failed!");
    }
    if (DateForSignedContract) {
        temp = await applicationFormContractAndGuarantee.inputDateForSignedContractUnderlying(DateForSignedContract);
        logFailTestcase(temp, "Input DateForSignedContract failed!");
    }
    if (DateForSignedContractMinusToday) {
        temp = await applicationFormContractAndGuarantee.inputDateForSignedContractUnderlying(getDate(DateForSignedContractMinusToday));
        logFailTestcase(temp, "Input DateForSignedContractMinusToday failed!");
    }
    if (ContractStartDateMinusToday) {
        temp = await applicationFormContractAndGuarantee.inputContractStartDateUnderlying(getDate(ContractStartDateMinusToday));
        logFailTestcase(temp, "Input ContractStartDateMinusToday failed!");
    }
    if (UnderlyingContractDocsUnderlying) {
        const docs = UnderlyingContractDocsUnderlying.split(";");
        for (const doc of docs) {
            const temp2 = __dirname;
            let UploadDocuments: string = "";
            
            if (__dirname.includes("jenkins") && !__dirname.includes(".jenkins")){
                logInfoMessage("Running on jenkins...");
                UploadDocuments = __dirname.substring(0, temp2.length - 58) + "/" + doc.replace("\\", "/");
            }
            else {
                logInfoMessage("Runing on local...");
                UploadDocuments = __dirname.substring(0, temp2.length - 58) + "\\" + doc.replace("/", "\\");
            }
            logInfoMessage("\tFinal file path:");
            logInfoMessage("\t\t" + UploadDocuments);

            logInfoMessage("\tDirname:");
            logInfoMessage("\t\t" + __dirname);

            temp = await applicationFormContractAndGuarantee.inputUnderlyingContractDocUnderlying(UploadDocuments);
            logFailTestcase(temp, "Input UnderlyingContractDocsUnderlying failed!");
        }
    }
    if(ConfirmInformation && ConfirmInformation.localeCompare('Yes')===0){
        temp = await applicationFormContractAndGuarantee.checkboxConfirmInformationUnderlying();
        logFailTestcase(temp, "check confirm Information failed!");
    }
    if (ProjectUnderlying) {
        temp = await applicationFormContractAndGuarantee.inputProjectUnderlying(ProjectUnderlying);
        logFailTestcase(temp, "Input ProjectUnderlying failed!");
    }
    if (ProjectNameUnderlying) {
        temp = await applicationFormContractAndGuarantee.inputProjectNameUnderlying(ProjectNameUnderlying);
        logFailTestcase(temp, "Input ProjectNameUnderlying failed!");
    }
    if (ProjectAddressUnderlying) {
        temp = await applicationFormContractAndGuarantee.inputProjectAddressUnderlying(ProjectAddressUnderlying);
        logFailTestcase(temp, "Input ProjectAddressUnderlying failed!");
    }
    if (ProjectDescriptionUnderlying) {
        temp = await applicationFormContractAndGuarantee.inputProjectDescriptionUnderlying(ProjectDescriptionUnderlying);
        logFailTestcase(temp, "Input ProjectDescriptionUnderlying failed!");
    }
    if (ContractCommitmentUnderlying) {
        temp = await applicationFormContractAndGuarantee.inputContractCommitmentUnderlying(ContractCommitmentUnderlying);
        logFailTestcase(temp, "Input ContractCommitmentUnderlying failed!");
    }
    if (GardsnummerUnderlying) {
        temp = await applicationFormContractAndGuarantee.inputGardsnummerUnderlying(GardsnummerUnderlying);
        logFailTestcase(temp, "Input GardsnummerUnderlying failed!");
    }
    if (BruksnummerUnderlying) {
        temp = await applicationFormContractAndGuarantee.inputBruksnummerUnderlying(BruksnummerUnderlying);
        logFailTestcase(temp, "Input BruksnummerUnderlying failed!");
    }
    if (KommuneUnderlying) {
        temp = await applicationFormContractAndGuarantee.inputKommuneUnderlying(KommuneUnderlying);
        logFailTestcase(temp, "Input KommuneUnderlying failed!");
    }


    // Start date and End date for test case Instalment
    if (StartDateMinusToday) {
        PeriodStartGuarantee = getDate(StartDateMinusToday);
        dataTestcase.push(new ValidateField("StartDate", 0, true, [PeriodStartGuarantee], []));
    }
    if (EndDateMinusStartDate) {
        PeriodEndGuarantee = addDate(PeriodStartGuarantee, EndDateMinusStartDate);
        dataTestcase.push(new ValidateField("EndDate", 0, true, [PeriodEndGuarantee], []));
    }
    if (StartDate2MinusEndDate) {
        PeriodStartGuaranteePhase2 = addDate(PeriodEndGuarantee, StartDate2MinusEndDate);
        dataTestcase.push(new ValidateField("StartDate2", 0, true, [PeriodStartGuaranteePhase2], []));
    }
    if (EndDate2MinusStartDate2) {
        PeriodEndGuaranteePhase2 = addDate(PeriodStartGuaranteePhase2, EndDate2MinusStartDate2);
        dataTestcase.push(new ValidateField("EndDate2", 0, true, [PeriodEndGuaranteePhase2], []));
    }

    // Guarantee
    if (PeriodStartGuarantee) {
        temp = await applicationFormContractAndGuarantee.inputPeriodStartGuarantee(PeriodStartGuarantee);
        logFailTestcase(temp, "Input PeriodStartGuarantee failed!");
    }
    if (PeriodEndGuarantee) {
        temp = await applicationFormContractAndGuarantee.inputPeriodEndGuarantee(PeriodEndGuarantee);
        logFailTestcase(temp, "Input PeriodEndGuarantee failed!");
    }
    if (GuaranteeAmountGuarantee) {
        temp = await applicationFormContractAndGuarantee.inputGuaranteeAmountGuarantee(GuaranteeAmountGuarantee);
        logFailTestcase(temp, "Input GuaranteeAmountGuarantee failed!");
    }
    if (GuaranteeRateGuarantee) {
        temp = await applicationFormContractAndGuarantee.inputGuaranteeRateGuarantee(GuaranteeRateGuarantee);
        logFailTestcase(temp, "Input GuaranteeRateGuarantee failed!");
    }

    if (AmountInWordGuarantee) {
        temp = await applicationFormContractAndGuarantee.inputAmountInWordGuarantee(AmountInWordGuarantee);
        logFailTestcase(temp, "Input AmountInWordGuarantee failed!");
    }

    if (CommentGuarantee) {
        temp = await applicationFormContractAndGuarantee.inputCommentGuarantee(CommentGuarantee);
        logFailTestcase(temp, "Input CommentGuarantee failed!");
    }

    if (Type && Type.localeCompare("Two Phases") === 0) {
        if (PeriodStartGuaranteePhase2) {
            temp = await applicationFormContractAndGuarantee.inputPeriodStartGuaranteePhase2(PeriodStartGuaranteePhase2);
            logFailTestcase(temp, "Input PeriodStartGuaranteePhase2 failed!");
        }
        if (PeriodEndGuaranteePhase2) {
            temp = await applicationFormContractAndGuarantee.inputPeriodEndGuaranteePhase2(PeriodEndGuaranteePhase2);
            logFailTestcase(temp, "Input PeriodEndGuaranteePhase2 failed!");
        }
        if (GuaranteeAmountGuaranteePhase2) {
            temp = await applicationFormContractAndGuarantee.inputGuaranteeAmountGuaranteePhase2(GuaranteeAmountGuaranteePhase2);
            logFailTestcase(temp, "Input GuaranteeAmountGuaranteePhase2 failed!");
        }
        if (GuaranteeRateGuaranteePhase2) {
            temp = await applicationFormContractAndGuarantee.inputGuaranteeRateGuaranteePhase2(GuaranteeRateGuaranteePhase2);
            logFailTestcase(temp, "Input GuaranteeRateGuaranteePhase2 failed!");
        }
        if (CommentGuaranteePhase2) {
            temp = await applicationFormContractAndGuarantee.inputCommentGuaranteePhase2(CommentGuaranteePhase2);
            logFailTestcase(temp, "Input CommentGuaranteePhase2 failed!");
        }
    }

    //#endregion
});

When("User verifies information at Payment Application form {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const PaymentMethod = row.PaymentMethod;

    let temp = await applicationFormPaymentCPGuaranteeAtlas.validatePaymentMethodGuarantee(PaymentMethod);
    logFailTestcase(temp);
});

Then("User verifies information at Application Preview tab Detail Application form of Basic Information {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    logInfoMessage("Waiting for 5s...");
    await globalPageObject.waitForProgressBarLoaded_v2(5000);

    const UploadedDataValidationStatus = row.UploadedDataValidationStatus;
    const ApprovalStatus = row.ApprovalStatus;
    //#region Declare variables
    //BASICINFFORMATION
    const Type = row.Type;

    const ExpiryDateApplication = row.ExpiryDateApplication;
    const DescriptionGuarantee = row.DescriptionGuarantee;
    let IssuedDateGuarantee = row.IssuedDateGuarantee || getDate(row.IssuedDateGuaranteeMinusToday);

    const IsPersonBeneficiary = row.IsPersonBeneficiary;
    const BeneficiaryBeneficiary = row.BeneficiaryBeneficiary;
    const OrgNrBeneficiary = row.OrgNrBeneficiary;
    let DateOfBirthBeneficiary = row.DateOfBirthBeneficiary;
    const AddressBeneficiary = row.AddressBeneficiary;
    const PostcodeBeneficiary = row.PostcodeBeneficiary;
    const CityBeneficiary = row.CityBeneficiary;
    const OtherInformationBeneficiary = row.OtherInformationBeneficiary;

    const Beneficiary2Beneficiary = row.Beneficiary2Beneficiary;
    const OrgNr2Beneficiary = row.OrgNr2Beneficiary;
    let DateOfBirth2Beneficiary = row.DateOfBirth2Beneficiary;
    const Address2Beneficiary = row.Address2Beneficiary;
    const Postcode2Beneficiary = row.Postcode2Beneficiary;
    const City2Beneficiary = row.City2Beneficiary;
    const OtherInformation2Beneficiary = row.OtherInformation2Beneficiary;


    const OrdererDebtor = row.OrdererDebtor;
    const OrganisationNumberDebtor = row.OrganisationNumberDebtor;
    const AddressDebtor = row.AddressDebtor;
    const PostcodeDebtor = row.PostcodeDebtor;
    const CityDebtor = row.CityDebtor;
    const OtherInformationDebtor = row.OtherInformationDebtor;

    //#endregion
    let temp = true;
    if (UploadedDataValidationStatus) {
        temp = await applicationFormPreviewCPGuaranteeAtlas.validateUploadedDataValidationStatus(UploadedDataValidationStatus);
        logFailTestcase(temp);
    }
    if (ApprovalStatus) {
        temp = await applicationFormPreviewCPGuaranteeAtlas.validateApprovalStatus(ApprovalStatus);
        logFailTestcase(temp);
    }
    //#region Issued Date
    if (IssuedDateGuarantee) {
        if (scenarioTags.has("@CustomerPortalHogs") || scenarioTags.has("@CustomerPortalAtlas") || scenarioTags.has("@AgentPortalHogs")) {
            IssuedDateGuarantee = IssuedDateGuarantee.replace(/\//g, "-");
        }
        temp = await applicationFormPreviewCPGuaranteeAtlas.validateIssuedDate(IssuedDateGuarantee);
        logFailTestcase(temp);
    }
    //#endregion

    //#region Debtor
    if (OrdererDebtor) {
        temp = await applicationFormPreviewCPGuaranteeAtlas.validateDebtorName(OrdererDebtor);
        logFailTestcase(temp);
    }
    if (OrganisationNumberDebtor) {
        temp = await applicationFormPreviewCPGuaranteeAtlas.validateDebtorOrgNr("Org.nr.: " + OrganisationNumberDebtor);
        logFailTestcase(temp);
    }
    if (AddressDebtor) {
        temp = await applicationFormPreviewCPGuaranteeAtlas.validateDebtorAddress(AddressDebtor);
        logFailTestcase(temp);
    }
    if (PostcodeDebtor) {
        temp = await applicationFormPreviewCPGuaranteeAtlas.validateDebtorPostcode(PostcodeDebtor);
        logFailTestcase(temp);
    }
    if (CityDebtor) {
        temp = await applicationFormPreviewCPGuaranteeAtlas.validateDebtorCity(CityDebtor);
        logFailTestcase(temp);
    }
    //#endregion

    //#region Beneficiary
    if (BeneficiaryBeneficiary) {
        temp = await applicationFormPreviewCPGuaranteeAtlas.validateBeneficiaryName(BeneficiaryBeneficiary);
        logFailTestcase(temp);
    }
    if (OrgNrBeneficiary) {
        temp = await applicationFormPreviewCPGuaranteeAtlas.validateBeneficiaryOrgNr("Org.nr.: " + OrgNrBeneficiary);
        logFailTestcase(temp);
    }
    if (DateOfBirthBeneficiary) {
        if (scenarioTags.has("@CustomerPortalHogs") || scenarioTags.has("@CustomerPortalAtlas")) {
            DateOfBirthBeneficiary = DateOfBirthBeneficiary.replace(/\//g, "-");
        }
        temp = await applicationFormPreviewCPGuaranteeAtlas.validateBeneficiaryDOB("DOB: " + DateOfBirthBeneficiary);
        logFailTestcase(temp);
    }
    if (AddressBeneficiary) {
        temp = await applicationFormPreviewCPGuaranteeAtlas.validateBeneficiaryAddress(AddressBeneficiary);
        logFailTestcase(temp);
    }
    if (PostcodeBeneficiary) {
        temp = await applicationFormPreviewCPGuaranteeAtlas.validateBeneficiaryPostcode(PostcodeBeneficiary);
        logFailTestcase(temp);
    }
    if (CityBeneficiary) {
        temp = await applicationFormPreviewCPGuaranteeAtlas.validateBeneficiaryCity(CityBeneficiary);
        logFailTestcase(temp);
    }
    //#endregion

    //#region Beneficiary 2
    if (Beneficiary2Beneficiary) {
        temp = await applicationFormPreviewCPGuaranteeAtlas.validateBeneficiary2Name(Beneficiary2Beneficiary);
        logFailTestcase(temp);
    }
    if (OrgNr2Beneficiary) {
        temp = await applicationFormPreviewCPGuaranteeAtlas.validateBeneficiary2OrgNr("Org.nr.: " + OrgNr2Beneficiary);
        logFailTestcase(temp);
    }
    if (DateOfBirth2Beneficiary) {
        if (scenarioTags.has("@CustomerPortalHogs") || scenarioTags.has("@CustomerPortalAtlas")) {
            DateOfBirth2Beneficiary = DateOfBirth2Beneficiary.replace(/\//g, "-");
        }
        temp = await applicationFormPreviewCPGuaranteeAtlas.validateBeneficiary2DOB("DOB: " + DateOfBirth2Beneficiary);
        logFailTestcase(temp);
    }
    if (Address2Beneficiary) {
        temp = await applicationFormPreviewCPGuaranteeAtlas.validateBeneficiary2Address(Address2Beneficiary);
        logFailTestcase(temp);
    }
    if (Postcode2Beneficiary) {
        temp = await applicationFormPreviewCPGuaranteeAtlas.validateBeneficiary2Postcode(Postcode2Beneficiary);
        logFailTestcase(temp);
    }
    if (City2Beneficiary) {
        temp = await applicationFormPreviewCPGuaranteeAtlas.validateBeneficiary2City(City2Beneficiary);
        logFailTestcase(temp);
    }
    //#endregion
});

Then("User verifies information at Application Preview tab Detail Application form of Contract and Guarantee {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const Type = row.Type;

    //CONTRACT AND GUARANTEE
    const TotalContractAmountUnderlying = row.TotalContractAmountUnderlying;
    const ContractReferenceUnderlying = row.ContractReferenceUnderlying;
    const DateForSignedContract = row.DateForSignedContract; //new
    const DateForSignedContractMinusToday = row.DateForSignedContractMinusToday; //new
    const UnderlyingContractDocsUnderlying = row.UnderlyingContractDocsUnderlying;
    const ProjectUnderlying = row.ProjectUnderlying;
    const ProjectNameUnderlying = row.ProjectNameUnderlying; //new
    const ProjectAddressUnderlying = row.ProjectAddressUnderlying; //new
    const ProjectDescriptionUnderlying = row.ProjectDescriptionUnderlying; //new
    const ContractCommitmentUnderlying = row.ContractCommitmentUnderlying;
    const GardsnummerUnderlying = row.GardsnummerUnderlying;
    const BruksnummerUnderlying = row.BruksnummerUnderlying;
    const KommuneUnderlying = row.KommuneUnderlying;


    let PeriodStartGuarantee = row.PeriodStartGuarantee;
    let PeriodEndGuarantee = row.PeriodEndGuarantee;
    const StartDateMinusToday = row.StartDateMinusToday;
    const EndDateMinusStartDate = row.EndDateMinusStartDate;

    const GuaranteeAmountGuarantee = row.GuaranteeAmountGuarantee;
    const GuaranteeRateGuarantee = row.GuaranteeRateGuarantee;
    const CommentGuarantee = row.CommentGuarantee;


    //TWO PHASE
    let PeriodStartGuaranteePhase2 = "";
    let PeriodEndGuaranteePhase2 = "";
    let StartDate2MinusEndDate: any;
    let EndDate2MinusStartDate2: any;

    let GuaranteeAmountGuaranteePhase2 = "";
    let GuaranteeRateGuaranteePhase2 = "";
    let CommentGuaranteePhase2 = "";

    let GuaranteeFeeGuaranteeFeePhase2 = "";
    let TotalGuaranteeFeeGuaranteeFee = "";
    let CommissionPhase2 = "";
    let TotalCommission = "";
    if (Type && Type.localeCompare("Two Phases") === 0) {
        PeriodStartGuaranteePhase2 = row.PeriodStartGuaranteePhase2;
        PeriodEndGuaranteePhase2 = row.PeriodEndGuaranteePhase2;
        StartDate2MinusEndDate = row.StartDate2MinusEndDate;
        EndDate2MinusStartDate2 = row.EndDate2MinusStartDate2;

        GuaranteeAmountGuaranteePhase2 = row.GuaranteeAmountGuaranteePhase2;
        GuaranteeRateGuaranteePhase2 = row.GuaranteeRateGuaranteePhase2;
        CommentGuaranteePhase2 = row.CommentGuaranteePhase2;

        GuaranteeFeeGuaranteeFeePhase2 = row.GuaranteeFeeGuaranteeFeePhase2;
        TotalGuaranteeFeeGuaranteeFee = row.TotalGuaranteeFeeGuaranteeFee;
        CommissionPhase2 = row.CommissionPhase2;
        TotalCommission = row.TotalCommission;

    }
    //PAYMENT
    const RenewGuaranteeGuarantee = row.RenewGuaranteeGuarantee;

    const GuaranteeFeeGuaranteeFee = row.GuaranteeFeeGuaranteeFee;
    const Commission = row.Commission; //new
    const EstablishmentFeeOtherFee = row.EstablishmentFeeOtherFee;
    let temp = true;

    //#endregion

    //#region Underlying Contract
    if (ContractReferenceUnderlying) {
        temp = await applicationFormPreviewCPGuaranteeAtlas.validateUnderlyingContractReference(ContractReferenceUnderlying);
        logFailTestcase(temp);
    }
    if (ContractCommitmentUnderlying) {
        temp = await applicationFormPreviewCPGuaranteeAtlas.validateUnderlyingContractCommitment(ContractCommitmentUnderlying);
        logFailTestcase(temp);
    }

    if (GardsnummerUnderlying) {
        temp = await applicationFormPreviewCPGuaranteeAtlas.validateUnderlyingContractGardsnummer("GNR " + GardsnummerUnderlying);
        logFailTestcase(temp);
    }
    if (BruksnummerUnderlying) {
        temp = await applicationFormPreviewCPGuaranteeAtlas.validateUnderlyingContractBruksnummer("BNR " + BruksnummerUnderlying);
        logFailTestcase(temp);
    }
    if (KommuneUnderlying) {
        temp = await applicationFormPreviewCPGuaranteeAtlas.validateUnderlyingContractKommune(KommuneUnderlying);
        logFailTestcase(temp);
    }
    if (TotalContractAmountUnderlying) {
        temp = await applicationFormPreviewCPGuaranteeAtlas.validateUnderlyingContractTotalAmount(numberToCurrency(currencyToNumber(TotalContractAmountUnderlying)) + " " + getDefaultCurrency());
        logFailTestcase(temp);
    }
    //#endregion

    //#region Phase - Timeline
    if (Type && Type.localeCompare("One Phase") === 0) {
        if (PeriodStartGuarantee && PeriodEndGuarantee) {
            let periodEnd = RenewGuaranteeGuarantee ? "" : " - " + PeriodEndGuarantee;
            // Do những product tự động renew thì không có PeriodEnd (Product: Skattetrekksgaranti và Tollgaranti)

            temp = await applicationFormPreviewCPGuaranteeAtlas.validatePeriod(PeriodStartGuarantee + periodEnd);
            logFailTestcase(temp);
        }
        if (GuaranteeAmountGuarantee) {
            temp = await applicationFormPreviewCPGuaranteeAtlas.validateGuaranteeAmount(numberToCurrency(currencyToNumber(GuaranteeAmountGuarantee)) + " " + getDefaultCurrency());
            logFailTestcase(temp);
        }
        if (GuaranteeFeeGuaranteeFee) {
            temp = await applicationFormPreviewCPGuaranteeAtlas.validateTotalGuaranteeFee(numberToCurrency(GuaranteeFeeGuaranteeFee) + " " + getDefaultCurrency());
            logFailTestcase(temp);
        }
        if (Commission) {
            temp = await applicationFormPreviewCPGuaranteeAtlas.validateTotalCommission(Commission + " " + getDefaultCurrency());
            logFailTestcase(temp);
        }

    } else if (Type && Type.localeCompare("Two Phases") === 0) {
        if (PeriodStartGuarantee && PeriodEndGuarantee) {
            temp = await applicationFormPreviewCPGuaranteeAtlas.validatePeriodPhase1("Period: " + PeriodStartGuarantee + " - " + PeriodEndGuarantee);
            logFailTestcase(temp);
        }
        if (PeriodStartGuaranteePhase2 && PeriodEndGuaranteePhase2) {
            temp = await applicationFormPreviewCPGuaranteeAtlas.validatePeriodPhase2("Period: " + PeriodStartGuaranteePhase2 + " - " + PeriodEndGuaranteePhase2);
            logFailTestcase(temp);
        }
        if (GuaranteeAmountGuarantee) {
            temp = await applicationFormPreviewCPGuaranteeAtlas.validateGuaranteeAmountPhase1(numberToCurrency(GuaranteeAmountGuarantee) + " " + getDefaultCurrency());
            logFailTestcase(temp);
        }
        if (GuaranteeAmountGuaranteePhase2) {
            temp = await applicationFormPreviewCPGuaranteeAtlas.validateGuaranteeAmountPhase2(numberToCurrency(GuaranteeAmountGuaranteePhase2) + " " + getDefaultCurrency());
            logFailTestcase(temp);
        }

        if (GuaranteeFeeGuaranteeFee) {
            temp = await applicationFormPreviewCPGuaranteeAtlas.validateGuaranteeFeePhase1(numberToCurrency(GuaranteeFeeGuaranteeFee) + " " + getDefaultCurrency());
            logFailTestcase(temp);
        }
        if (GuaranteeFeeGuaranteeFeePhase2) {
            temp = await applicationFormPreviewCPGuaranteeAtlas.validateGuaranteeFeePhase2(numberToCurrency(GuaranteeFeeGuaranteeFeePhase2) + " " + getDefaultCurrency());
            logFailTestcase(temp);
        }
        if (TotalGuaranteeFeeGuaranteeFee) {
            temp = await applicationFormPreviewCPGuaranteeAtlas.validateTotalGuaranteeFee(numberToCurrency(TotalGuaranteeFeeGuaranteeFee) + " " + getDefaultCurrency());
            logFailTestcase(temp);
        }
        if (Commission) {
            temp = await applicationFormPreviewCPGuaranteeAtlas.validateCommissionPhase1(numberToCurrency(Commission) + " " + getDefaultCurrency());
            logFailTestcase(temp);
        }
        if (CommissionPhase2) {
            temp = await applicationFormPreviewCPGuaranteeAtlas.validateCommissionPhase2(numberToCurrency(CommissionPhase2) + " " + getDefaultCurrency());
            logFailTestcase(temp);
        }
        if (TotalCommission) {
            temp = await applicationFormPreviewCPGuaranteeAtlas.validateTotalCommission(numberToCurrency(TotalCommission) + " " + getDefaultCurrency());
            logFailTestcase(temp);
        }
    }
    if (EstablishmentFeeOtherFee) {
        temp = await applicationFormPreviewCPGuaranteeAtlas.validateEstablishmentFee(numberToCurrency(EstablishmentFeeOtherFee) + " " + getDefaultCurrency());
        logFailTestcase(temp);
    }
    //#endregion
});

Then("User verifies information at Application Preview tab Detail Application form of Timeline {string}", async (filename) => {
    await globalPageObject.waitForSeconds(3000);
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    let PeriodStartGuarantee = "";
    let PeriodEndGuarantee = "";
    const GuaranteeAmountGuarantee = row.GuaranteeAmountGuarantee;
    const UploadedDataValidationStatus = row.UploadedDataValidationStatus;
    const ApprovalStatus = row.ApprovalStatus;
    //#region Declare variables
    //BASICINFFORMATION
    const Type = row.Type;


    //PAYMENT
    const RenewGuaranteeGuarantee = row.RenewGuaranteeGuarantee;

    const GuaranteeFeeGuaranteeFee = row.GuaranteeFeeGuaranteeFee;
    const Commission = row.Commission; //new
    const EstablishmentFeeOtherFee = row.EstablishmentFeeOtherFee;



    //TWO PHASE
    let GuaranteeAmountGuaranteePhase2 = row.GuaranteeAmountGuaranteePhase2;
    let GuaranteeRateGuaranteePhase2 = row.GuaranteeRateGuaranteePhase2;
    let CommentGuaranteePhase2 = row.CommentGuaranteePhase2;
    let PeriodStartGuaranteePhase2 = "";
    let PeriodEndGuaranteePhase2 = "";

    let GuaranteeFeeGuaranteeFeePhase2 = row.GuaranteeFeeGuaranteeFeePhase2;
    let TotalGuaranteeFeeGuaranteeFee = row.TotalGuaranteeFeeGuaranteeFee;


    // Dynamic date
    const StartDateMinusToday = row.StartDateMinusToday;
    const EndDateMinusStartDate = row.EndDateMinusStartDate;
    const StartDate2MinusEndDate = row.StartDate2MinusEndDate;
    const EndDate2MinusStartDate2 = row.EndDate2MinusStartDate2


    if (StartDateMinusToday) {
        PeriodStartGuarantee = getDate(StartDateMinusToday);
    }
    if (EndDateMinusStartDate) {
        PeriodEndGuarantee = addDate(PeriodStartGuarantee, EndDateMinusStartDate);
    }
    if (StartDate2MinusEndDate) {
        PeriodStartGuaranteePhase2 = addDate(PeriodEndGuarantee, StartDate2MinusEndDate);
    }
    if (EndDate2MinusStartDate2) {
        PeriodEndGuaranteePhase2 = addDate(PeriodStartGuaranteePhase2, EndDate2MinusStartDate2);
    }
    //#endregion

    let temp = true;
    if (UploadedDataValidationStatus) {
        temp = await applicationFormPreviewCPGuaranteeAtlas.validateUploadedDataValidationStatus(UploadedDataValidationStatus);
        logFailTestcase(temp);
    }
    if (ApprovalStatus) {
        temp = await applicationFormPreviewCPGuaranteeAtlas.validateApprovalStatus(ApprovalStatus);
        logFailTestcase(temp);
    }


    //#region Phase - Timeline
    if (Type && Type.localeCompare("One Phase") === 0) {
        if (PeriodStartGuarantee && PeriodEndGuarantee) {
            let periodEnd = RenewGuaranteeGuarantee ? "" : " - " + PeriodEndGuarantee;
            // Do những product tự động renew thì không có PeriodEnd (Product: Skattetrekksgaranti và Tollgaranti)
            if (scenarioTags.has("@CustomerPortalHogs") || scenarioTags.has("@CustomerPortalAtlas") || scenarioTags.has("@AgentPortalHogs")) {
                PeriodStartGuarantee = PeriodStartGuarantee.replace(/\//g, "-");
                periodEnd = periodEnd.replace(/\//g, "-");
            }
            temp = await applicationFormPreviewCPGuaranteeAtlas.validatePeriod(PeriodStartGuarantee + periodEnd);
            logFailTestcase(temp);
        }
        if (GuaranteeAmountGuarantee) {
            temp = await applicationFormPreviewCPGuaranteeAtlas.validateGuaranteeAmount(numberToCurrency(currencyToNumber(GuaranteeAmountGuarantee)) + " " + getDefaultCurrency());
            logFailTestcase(temp);
        }
        if (GuaranteeFeeGuaranteeFee) {
            temp = await applicationFormPreviewCPGuaranteeAtlas.validateTotalGuaranteeFee(numberToCurrency(GuaranteeFeeGuaranteeFee) + " " + getDefaultCurrency());
            logFailTestcase(temp);
        }
        if (Commission) {
            temp = await applicationFormPreviewCPGuaranteeAtlas.validateTotalCommission(Commission + " " + getDefaultCurrency());
            logFailTestcase(temp);
        }

    } else if (Type && Type.localeCompare("Two Phases") === 0) {
        if (PeriodStartGuarantee && PeriodEndGuaranteePhase2) {
            if (scenarioTags.has("@CustomerPortalHogs") || scenarioTags.has("@CustomerPortalAtlas") || scenarioTags.has("@AgentPortalHogs") ) {
                PeriodStartGuarantee = PeriodStartGuarantee.replace(/\//g, "-");
                PeriodEndGuarantee = PeriodEndGuarantee.replace(/\//g, "-");

                PeriodStartGuaranteePhase2 = PeriodStartGuaranteePhase2.replace(/\//g, "-");
                PeriodEndGuaranteePhase2 = PeriodEndGuaranteePhase2.replace(/\//g, "-");
            }else{
                PeriodStartGuarantee = formatDateTime(PeriodStartGuarantee);
                PeriodEndGuarantee = formatDateTime(PeriodEndGuarantee);

                PeriodStartGuaranteePhase2 = formatDateTime(PeriodStartGuaranteePhase2);
                PeriodEndGuaranteePhase2 = formatDateTime(PeriodEndGuaranteePhase2);
            }
            temp = await applicationFormPreviewCPGuaranteeAtlas.validatePeriodPhase1("Period: " + PeriodStartGuarantee + " - " + PeriodEndGuarantee);
            logFailTestcase(temp);
            temp = await applicationFormPreviewCPGuaranteeAtlas.validatePeriodPhase2("Period: " + PeriodStartGuaranteePhase2 + " - " + PeriodEndGuaranteePhase2);
            logFailTestcase(temp);
        }
        if (GuaranteeAmountGuarantee) {
            temp = await applicationFormPreviewCPGuaranteeAtlas.validateGuaranteeAmountPhase1(numberToCurrency(GuaranteeAmountGuarantee) + " " + getDefaultCurrency());
            logFailTestcase(temp);
        }
        if (GuaranteeAmountGuaranteePhase2) {
            temp = await applicationFormPreviewCPGuaranteeAtlas.validateGuaranteeAmountPhase2(numberToCurrency(GuaranteeAmountGuaranteePhase2) + " " + getDefaultCurrency());
            logFailTestcase(temp);
        }

        if (GuaranteeFeeGuaranteeFee) {
            temp = await applicationFormPreviewCPGuaranteeAtlas.validateGuaranteeFeePhase1(numberToCurrency(GuaranteeFeeGuaranteeFee) + " " + getDefaultCurrency());
            logFailTestcase(temp);
        }
        if (GuaranteeFeeGuaranteeFeePhase2) {
            temp = await applicationFormPreviewCPGuaranteeAtlas.validateGuaranteeFeePhase2(numberToCurrency(GuaranteeFeeGuaranteeFeePhase2) + " " + getDefaultCurrency());
            logFailTestcase(temp);
        }
        if (TotalGuaranteeFeeGuaranteeFee) {
            temp = await applicationFormPreviewCPGuaranteeAtlas.validateTotalGuaranteeFee(numberToCurrency(TotalGuaranteeFeeGuaranteeFee) + " " + getDefaultCurrency());
            logFailTestcase(temp);
        }
    }
    if (EstablishmentFeeOtherFee) {
        temp = await applicationFormPreviewCPGuaranteeAtlas.validateEstablishmentFee(numberToCurrency(EstablishmentFeeOtherFee) + " " + getDefaultCurrency());
        logFailTestcase(temp);
    }
    //#endregion
});
//#endregion
Then("User inputs comment to send for approval {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const comment = row.CommentForApproval;

    let temp = await approvalFormCP.inputComment(comment);
    logFailTestcase(temp, "Input comment failed!");

    temp = await approvalFormCP.pressSend();
    logFailTestcase(temp, "Press Send button faile!");
});

Then("User inputs comment to send for correction {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const comment = row.CommentForCorrection;

    let temp = await correctionForm.inputComment(comment);
    logFailTestcase(temp, "Input comment failed!");

    temp = await correctionForm.pressSend();
    logFailTestcase(temp, "Press Send button faile!");
});