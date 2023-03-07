import { Before, Then, When } from "@cucumber/cucumber";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { AmendmentFormBasicInformation } from "../../../../page-objects/back-office-portal/guarantee/guarantee/amendment-forms/AmendmentFormBasicInformation";
import { AmendmentFormContractAndGuarantee } from "../../../../page-objects/back-office-portal/guarantee/guarantee/amendment-forms/AmendmentFormContractAndGuarantee";
import { AmendmentFormPreview } from "../../../../page-objects/back-office-portal/guarantee/guarantee/amendment-forms/AmendmentFormPreview";
import { AmendmentFormBasicInformationCPGuaranteeAtlas } from "../../../../page-objects/customer-portal/guarantee/atlas/guarantee/amendment-forms/AmendmentFormBasicInformationCPGuaranteeAtlas";
import { AmendmentFormBasicInformationCPGuaranteeHogs } from "../../../../page-objects/customer-portal/guarantee/hogs/guarantee/amendment-forms/AmendmentFormBasicInformationCPGuaranteeHogs";
import { AmendmentFormContractAndGuaranteeCPGuaranteeHogs } from "../../../../page-objects/customer-portal/guarantee/hogs/guarantee/amendment-forms/AmendmentFormContractAndGuaranteeCPGuaranteeHogs";
import { AmendmentFormPreviewCPGuaranteeHogs } from "../../../../page-objects/customer-portal/guarantee/hogs/guarantee/amendment-forms/AmendmentFormPreviewCPGuaranteeHogs";
import { ValidateField } from "../../../../shared/classes";
import { addDate, convertPathFileDataToDataRegression, getDate, logFailTestcase, logInfoMessage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { formatDateTime, getDefaultCurrency, numberToCurrency } from "../../../../shared/tenant-setting/tenant-setting";
import { dataTestcase, scenarioTags } from "../../../../shared/variables";


const loader = require("csv-load-sync");

let globalPageObject: GlobalPageObject;
let amendmentFormBasicInformation: AmendmentFormBasicInformation;
let amendmentFormContractAndGuarantee: AmendmentFormContractAndGuarantee;
let amendmentFormPreview: AmendmentFormPreview;

Before(async function () {
    if (scenarioTags.has("@CustomerPortalHogs")) {
        const context: ICommonContext = this.context;
        globalPageObject = new GlobalPageObject(context.driverService);
        amendmentFormBasicInformation = new AmendmentFormBasicInformationCPGuaranteeHogs(context.driverService);
        amendmentFormContractAndGuarantee = new AmendmentFormContractAndGuaranteeCPGuaranteeHogs(context.driverService);
        amendmentFormPreview = new AmendmentFormPreviewCPGuaranteeHogs(context.driverService);

    }
    else if (scenarioTags.has("@CustomerPortalAtlas")) {
        const context: ICommonContext = this.context;
        globalPageObject = new GlobalPageObject(context.driverService);
        amendmentFormBasicInformation = new AmendmentFormBasicInformationCPGuaranteeAtlas(context.driverService);
        amendmentFormContractAndGuarantee = new AmendmentFormContractAndGuaranteeCPGuaranteeHogs(context.driverService);
        amendmentFormPreview = new AmendmentFormPreviewCPGuaranteeHogs(context.driverService);

    }
    else {
        const context: ICommonContext = this.context;
        globalPageObject = new GlobalPageObject(context.driverService);
        amendmentFormBasicInformation = new AmendmentFormBasicInformation(context.driverService);
        amendmentFormContractAndGuarantee = new AmendmentFormContractAndGuarantee(context.driverService);
        amendmentFormPreview = new AmendmentFormPreview(context.driverService);
    }
});


//#region Verify info guarantee amendment form
// Guarantee Section (BOP) = General section (CP)
When("System shows correct information at Guarantee section of Basic Information on Guarantee Amendment form {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    await globalPageObject.waitForProgressBarLoaded_v2();

    //#region declare varaiable
    const DescriptionGuarantee = row.DescriptionGuarantee;
    const GuaranteeTypeGuarantee = row.GuaranteeTypeGuarantee;
    const CurrencyGuarantee = getDefaultCurrency();
    const IssuedDate = row.IssuedDateGuaranteeMinusToday;
    //#endregion

    //#region Validate field
    let temp = await amendmentFormBasicInformation.validateDescriptionGuarantee(DescriptionGuarantee);
    logFailTestcase(temp);

    temp = await amendmentFormBasicInformation.validateGuaranteeTypeGuarantee(GuaranteeTypeGuarantee);
    logFailTestcase(temp);

    temp = await amendmentFormBasicInformation.validateCurrencyGuarantee(CurrencyGuarantee);
    logFailTestcase(temp);

    temp = await amendmentFormBasicInformation.validateIssuedDateGuarantee(IssuedDate);
    logFailTestcase(temp);
    //#endregion
});
When("System shows correct information at Debtor section of Basic Information on Guarantee Amendment form {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    await globalPageObject.waitForProgressBarLoaded_v2();


});
//#endregion


//#region  Input Guagantee amendment form

When("User inputs valid data into Amend Basic information guarantee form {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];

    // General = Guarantee
    const DescriptionGuarantee = row.DescriptionGuarantee;
    const IssuedDate = row.IssuedDateGuaranteeMinusToday;

    // Beneficiary
    const BeneficiaryBeneficiary = row.BeneficiaryBeneficiary;
    const OrgNrBeneficiary = row.OrgNrBeneficiary;
    const AddressBeneficiary = row.AddressBeneficiary;
    const PostcodeBeneficiary = row.PostcodeBeneficiary;
    const CityBeneficiary = row.CityBeneficiary;
    const OtherInformationBeneficiary = row.OtherInformationBeneficiary;
    const IsPersonBeneficiary = row.IsPersonBeneficiary;
    const ValidateDefaultAnswerCheckbox = row.ValidateDefaultAnswerCheckbox;
    //Beneficiary 2
    const Beneficiary2Beneficiary = row.Beneficiary2Beneficiary;
    const OrgNr2Beneficiary = row.OrgNr2Beneficiary;
    const Address2Beneficiary = row.Address2Beneficiary;
    const Postcode2Beneficiary = row.Postcode2Beneficiary;
    const City2Beneficiary = row.City2Beneficiary;
    const OtherInformation2Beneficiary = row.OtherInformation2Beneficiary

    // Debtor
    const OtherInformationDebtor = row.OtherInformationDebtor;
    let temp = true;
    //#region Inputs form

    if (IsPersonBeneficiary && (IsPersonBeneficiary.localeCompare("Yes") === 0 || IsPersonBeneficiary.localeCompare("yes") === 0)) {
        if (ValidateDefaultAnswerCheckbox && (ValidateDefaultAnswerCheckbox.localeCompare("Yes") === 0 || ValidateDefaultAnswerCheckbox.localeCompare("yes")) === 0) {
            temp = await amendmentFormBasicInformation.IsPersonBeneficiaryChecked();
            logFailTestcase(temp, "assert default Is Person Beneficiary Checked failed!");
        }
        if (!await amendmentFormBasicInformation.IsPersonBeneficiaryChecked()) {
            temp = await amendmentFormBasicInformation.checkIsPersonBeneficiary();
            logFailTestcase(temp, "Check IsPerson failed!");
        }
    } else if (IsPersonBeneficiary && (IsPersonBeneficiary.localeCompare("No") === 0 || IsPersonBeneficiary.localeCompare("no") === 0)) {
        if (ValidateDefaultAnswerCheckbox && (ValidateDefaultAnswerCheckbox.localeCompare("Yes") === 0 || ValidateDefaultAnswerCheckbox.localeCompare("yes") === 0)) {
            temp = await amendmentFormBasicInformation.IsPersonBeneficiaryChecked();
            logFailTestcase(temp, "assert default Is Person Beneficiary Checked failed!");
        }
        if (await amendmentFormBasicInformation.IsPersonBeneficiaryChecked()) {
            temp = await amendmentFormBasicInformation.checkIsPersonBeneficiary();
            logFailTestcase(temp, "Check IsPerson failed!");
        }
    }

    // General = Guarantee
    if (DescriptionGuarantee) {
        temp = await amendmentFormBasicInformation.inputDescriptionGuarantee(DescriptionGuarantee);
        logFailTestcase(temp, "Input description failed!");
    }
    if (IssuedDate) {
        temp = await amendmentFormBasicInformation.inputIssuedDateGuarantee(getDate(IssuedDate));
        logFailTestcase(temp, "Input IssuedDate failed!");
    }
    // Beneficiary
    if (BeneficiaryBeneficiary) {
        temp = await amendmentFormBasicInformation.inputBeneficiaryBeneficiary(BeneficiaryBeneficiary);
        logFailTestcase(temp, "Input Beneficiary failed!");
    }

    if (OrgNrBeneficiary) {
        temp = await amendmentFormBasicInformation.inputOrgNrBeneficiary(OrgNrBeneficiary);
        logFailTestcase(temp, "Input OrgNr failed!");
    }

    if (AddressBeneficiary) {
        temp = await amendmentFormBasicInformation.inputAddressBeneficiary(AddressBeneficiary);
        logFailTestcase(temp, "Input Address failed!");
    }

    if (PostcodeBeneficiary) {
        temp = await amendmentFormBasicInformation.inputPostcodeBeneficiary(PostcodeBeneficiary);
        logFailTestcase(temp, "Input postcode failed!");
    }

    if (CityBeneficiary) {
        temp = await amendmentFormBasicInformation.inputCityBeneficiary(CityBeneficiary);
        logFailTestcase(temp, "Input City failed!");
    }

    if (OtherInformationBeneficiary) {
        temp = await amendmentFormBasicInformation.inputOtherInformationBeneficiary(OtherInformationBeneficiary);
        logFailTestcase(temp, "Input Other information Beneficiary failed!");
    }


    //Beneficiary 2
    if (Beneficiary2Beneficiary) {
        temp = await amendmentFormBasicInformation.inputBeneficiary2Beneficiary(Beneficiary2Beneficiary);
        logFailTestcase(temp, "Input Beneficiary2 failed!");
    }

    if (OrgNr2Beneficiary) {
        temp = await amendmentFormBasicInformation.inputOrgNr2Beneficiary(OrgNr2Beneficiary);
        logFailTestcase(temp, "Input OrgNr2 failed!");
    }

    if (Address2Beneficiary) {
        temp = await amendmentFormBasicInformation.inputAddress2Beneficiary(Address2Beneficiary);
        logFailTestcase(temp, "Input Address2 failed!");
    }

    if (Postcode2Beneficiary) {
        temp = await amendmentFormBasicInformation.inputPostcode2Beneficiary(Postcode2Beneficiary);
        logFailTestcase(temp, "Input postcode 2failed!");
    }

    if (City2Beneficiary) {
        temp = await amendmentFormBasicInformation.inputCity2Beneficiary(City2Beneficiary);
        logFailTestcase(temp, "Input City2 failed!");
    }

    if (OtherInformation2Beneficiary) {
        temp = await amendmentFormBasicInformation.inputOtherInformation2Beneficiary(OtherInformation2Beneficiary);
        logFailTestcase(temp, "Input Other information2 Beneficiary failed!");
    }

    //Debtor
    if (OtherInformationDebtor) {
        temp = await amendmentFormBasicInformation.inputOtherInformationDebtor(OtherInformationDebtor);
        logFailTestcase(temp, "Input Other Information debtor failed!");
    }
    //#endregion
});

When("User inputs valid data into Amend Contact and Guarantee guarantee form {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];

    //#region Declare variable
    const Type = row.Type;

    //#region 1. Underlying contract
    const TotalContractAmountUnderlying = row.TotalContractAmountUnderlying;
    const ContractReferenceUnderlying = row.ContractReferenceUnderlying;
    const DateForSignedContract = row.DateForSignedContractMinusToday ? getDate(row.DateForSignedContractMinusToday) : ""; //new
    const ContractStartDate = row.ContractStartDateMinusToday ? getDate(row.ContractStartDateMinusToday) : ""; // ContractStartDateMinusToday (hogs) ~ DateForSignedContractMinusToday (Atlas)
    const UnderlyingContractDocsUnderlying = row.UnderlyingContractDocsUnderlying;
    const ProjectUnderlying = row.ProjectUnderlying;
    const ProjectNameUnderlying = row.ProjectNameUnderlying; //new
    const ProjectAddressUnderlying = row.ProjectAddressUnderlying; //new
    const ProjectDescriptionUnderlying = row.ProjectDescriptionUnderlying; //new
    const ContractCommitmentUnderlying = row.ContractCommitmentUnderlying;
    const GardsnummerUnderlying = row.GardsnummerUnderlying;
    const BruksnummerUnderlying = row.BruksnummerUnderlying;
    const KommuneUnderlying = row.KommuneUnderlying;
    //#endregion

    //#region 2. Guarantee
    let EffectedDate = row.EffectedDateMinusToday ? getDate(row.EffectedDateMinusToday) : "";
    let PeriodStartGuarantee = row.StartDateMinusToday ? getDate(row.StartDateMinusToday) : "";
    let PeriodEndGuarantee = (PeriodStartGuarantee && row.EndDateMinusStartDate) ? addDate(PeriodStartGuarantee, row.EndDateMinusStartDate) : "";


    const GuaranteeAmountGuarantee = row.GuaranteeAmountGuarantee;
    const GuaranteeRateGuarantee = row.GuaranteeRateGuarantee;
    const AmountInWordGuarantee = row.AmountInWordGuarantee;
    const CommentGuarantee = row.CommentGuarantee;

    //#region 2.2 Guarantee if Product 2 phase
    //TWO PHASE
    let PeriodStartGuaranteePhase2 = "";
    let PeriodEndGuaranteePhase2 = "";

    let GuaranteeAmountGuaranteePhase2 = "";
    let GuaranteeRateGuaranteePhase2 = "";
    let CommentGuaranteePhase2 = "";

    if (Type && Type.localeCompare("Two Phases") === 0) {
        PeriodStartGuaranteePhase2 = addDate(PeriodEndGuarantee, row.StartDate2MinusEndDate);
        PeriodEndGuaranteePhase2 = addDate(PeriodStartGuaranteePhase2, row.EndDate2MinusStartDate2);

        GuaranteeAmountGuaranteePhase2 = row.GuaranteeAmountGuaranteePhase2;
        GuaranteeRateGuaranteePhase2 = row.GuaranteeRateGuaranteePhase2;
        CommentGuaranteePhase2 = row.CommentGuaranteePhase2;
    }
    //#endregion

    //#region For datatestcase
    // Start date and End date for test case Instalment
    dataTestcase.push(new ValidateField("StartDate", 0, true, [PeriodStartGuarantee], []));
    dataTestcase.push(new ValidateField("EndDate", 0, true, [PeriodEndGuarantee], []));
    dataTestcase.push(new ValidateField("StartDate2", 0, true, [PeriodStartGuaranteePhase2], []));
    dataTestcase.push(new ValidateField("EndDate2", 0, true, [PeriodEndGuaranteePhase2], []));
    //#endregion
    //#endregion
    //#endregion


    let temp = true;
    //#region Input valudes
    //#region  1. Underlying contract
    if (TotalContractAmountUnderlying) {
        temp = await amendmentFormContractAndGuarantee.inputTotalContractAmountUnderlying(TotalContractAmountUnderlying);
        logFailTestcase(temp, "Input TotalContractAmountUnderlying failed!");
    }
    if (ContractReferenceUnderlying) {
        temp = await amendmentFormContractAndGuarantee.inputContractReferenceUnderlying(ContractReferenceUnderlying);
        logFailTestcase(temp, "Input ContractReferenceUnderlying failed!");
    }
    if (DateForSignedContract) {
        temp = await amendmentFormContractAndGuarantee.inputDateForSignedContractUnderlying(DateForSignedContract);
        logFailTestcase(temp, "Input DateForSignedContract failed!");
    }
    if (ContractStartDate) {
        temp = await amendmentFormContractAndGuarantee.inputContractStartDateUnderlying(ContractStartDate);
        logFailTestcase(temp, "Input ContractStartDateMinusToday failed!");
    }
    if (UnderlyingContractDocsUnderlying) {
        const docs = UnderlyingContractDocsUnderlying.split(";");
        for (const doc of docs) {
            let UploadDocuments: string = "";

            if (__dirname.includes("jenkins") && !__dirname.includes(".jenkins")) {
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
            else {
                logInfoMessage("Runing on local...");
                UploadDocuments =
                    __dirname.substring(0, __dirname.lastIndexOf("pegasus-core-aut-crm") + "pegasus-core-aut-crm".length) + "\\" + doc.replace(/\//g, "\\");
            }
            logInfoMessage("\tFinal file path:");
            logInfoMessage("\t\t" + UploadDocuments);

            logInfoMessage("\tDirname:");
            logInfoMessage("\t\t" + __dirname);

            temp = await amendmentFormContractAndGuarantee.inputUnderlyingContractDocUnderlying(UploadDocuments);
            logFailTestcase(temp, "Input UnderlyingContractDocsUnderlying failed!");
        }
    }
    if (ProjectUnderlying) {
        temp = await amendmentFormContractAndGuarantee.inputProjectUnderlying(ProjectUnderlying);
        logFailTestcase(temp, "Input ProjectUnderlying failed!");
    }
    if (ProjectNameUnderlying) {
        temp = await amendmentFormContractAndGuarantee.inputProjectNameUnderlying(ProjectNameUnderlying);
        logFailTestcase(temp, "Input ProjectNameUnderlying failed!");
    }
    if (ProjectAddressUnderlying) {
        temp = await amendmentFormContractAndGuarantee.inputProjectAddressUnderlying(ProjectAddressUnderlying);
        logFailTestcase(temp, "Input ProjectAddressUnderlying failed!");
    }
    if (ProjectDescriptionUnderlying) {
        temp = await amendmentFormContractAndGuarantee.inputProjectDescriptionUnderlying(ProjectDescriptionUnderlying);
        logFailTestcase(temp, "Input ProjectDescriptionUnderlying failed!");
    }
    if (ContractCommitmentUnderlying) {
        temp = await amendmentFormContractAndGuarantee.inputContractCommitmentUnderlying(ContractCommitmentUnderlying);
        logFailTestcase(temp, "Input ContractCommitmentUnderlying failed!");
    }
    if (GardsnummerUnderlying) {
        temp = await amendmentFormContractAndGuarantee.inputGardsnummerUnderlying(GardsnummerUnderlying);
        logFailTestcase(temp, "Input GardsnummerUnderlying failed!");
    }
    if (BruksnummerUnderlying) {
        temp = await amendmentFormContractAndGuarantee.inputBruksnummerUnderlying(BruksnummerUnderlying);
        logFailTestcase(temp, "Input BruksnummerUnderlying failed!");
    }
    if (KommuneUnderlying) {
        temp = await amendmentFormContractAndGuarantee.inputKommuneUnderlying(KommuneUnderlying);
        logFailTestcase(temp, "Input KommuneUnderlying failed!");
    }
    //#endregion



    //#region 2. Guarantee
    if (EffectedDate) {
        temp = await amendmentFormContractAndGuarantee.inputEffectedDateGuarantee(EffectedDate);
        logFailTestcase(temp, "Input effected date failed!");
    }
    if (PeriodStartGuarantee) {
        temp = await amendmentFormContractAndGuarantee.inputPeriodStartGuarantee(PeriodStartGuarantee);
        logFailTestcase(temp, "Input PeriodStartGuarantee failed!");
    }
    if (PeriodEndGuarantee) {
        temp = await amendmentFormContractAndGuarantee.inputPeriodEndGuarantee(PeriodEndGuarantee);
        logFailTestcase(temp, "Input PeriodEndGuarantee failed!");
    }
    if (GuaranteeAmountGuarantee) {
        temp = await amendmentFormContractAndGuarantee.inputGuaranteeAmountGuarantee(GuaranteeAmountGuarantee);
        logFailTestcase(temp, "Input GuaranteeAmountGuarantee failed!");
    }
    if (GuaranteeRateGuarantee) {
        temp = await amendmentFormContractAndGuarantee.inputGuaranteeRateGuarantee(GuaranteeRateGuarantee);
        logFailTestcase(temp, "Input GuaranteeRateGuarantee failed!");
    }

    if (AmountInWordGuarantee) {
        temp = await amendmentFormContractAndGuarantee.inputAmountInWordGuarantee(AmountInWordGuarantee);
        logFailTestcase(temp, "Input AmountInWordGuarantee failed!");
    }

    if (CommentGuarantee) {
        temp = await amendmentFormContractAndGuarantee.inputCommentGuarantee(CommentGuarantee);
        logFailTestcase(temp, "Input CommentGuarantee failed!");
    }

    if (Type && Type.localeCompare("Two Phases") === 0) {
        if (PeriodStartGuaranteePhase2) {
            temp = await amendmentFormContractAndGuarantee.inputPeriodStartGuaranteePhase2(PeriodStartGuaranteePhase2);
            logFailTestcase(temp, "Input PeriodStartGuaranteePhase2 failed!");
        }
        if (PeriodEndGuaranteePhase2) {
            temp = await amendmentFormContractAndGuarantee.inputPeriodEndGuaranteePhase2(PeriodEndGuaranteePhase2);
            logFailTestcase(temp, "Input PeriodEndGuaranteePhase2 failed!");
        }
        if (GuaranteeAmountGuaranteePhase2) {
            temp = await amendmentFormContractAndGuarantee.inputGuaranteeAmountGuaranteePhase2(GuaranteeAmountGuaranteePhase2);
            logFailTestcase(temp, "Input GuaranteeAmountGuaranteePhase2 failed!");
        }
        if (GuaranteeRateGuaranteePhase2) {
            temp = await amendmentFormContractAndGuarantee.inputGuaranteeRateGuaranteePhase2(GuaranteeRateGuaranteePhase2);
            logFailTestcase(temp, "Input GuaranteeRateGuaranteePhase2 failed!");
        }
        if (CommentGuaranteePhase2) {
            temp = await amendmentFormContractAndGuarantee.inputCommentGuaranteePhase2(CommentGuaranteePhase2);
            logFailTestcase(temp, "Input CommentGuaranteePhase2 failed!");
        }
    }

    //#endregion
});
//#endregion

//#region Guarantee Amendment Preview form
Then("System shows correct information at Amendment Preview guarantee page section Issued Date {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    let IssuedDateGuaranteeMinusToday = row.IssuedDateGuaranteeMinusToday;
    if (IssuedDateGuaranteeMinusToday) {
        let IssuedDate = formatDateTime(getDate(row.IssuedDateGuaranteeMinusToday));
        if (scenarioTags.has("@CustomerPortalHogs") || scenarioTags.has("@CustomerPortalAtlas")) {
            IssuedDate = IssuedDate.replace(/\./g, "-").replace(/\//g, "-");
        }
        let temp = await amendmentFormPreview.validateIssuedDate(IssuedDate);
        logFailTestcase(temp);
    }
});

Then("System shows correct information at Amendment Preview guarantee page section Debtor {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const OrdererDebtor = row.OrdererDebtor;
    const OrganisationNumberDebtor = row.OrganisationNumberDebtor;
    const AddressDebtor = row.AddressDebtor;
    const PostcodeDebtor = row.PostcodeDebtor;
    const CityDebtor = row.CityDebtor;
    let temp = true;
    //#region Debtor
    if (OrdererDebtor) {
        temp = await amendmentFormPreview.validateDebtorName(OrdererDebtor);
        logFailTestcase(temp);
    }
    if (OrganisationNumberDebtor) {
        temp = await amendmentFormPreview.validateDebtorOrgNr("Org.nr.: " + OrganisationNumberDebtor);
        logFailTestcase(temp);
    }
    if (AddressDebtor) {
        temp = await amendmentFormPreview.validateDebtorAddress(AddressDebtor);
        logFailTestcase(temp);
    }
    if (PostcodeDebtor) {
        temp = await amendmentFormPreview.validateDebtorPostcode(PostcodeDebtor);
        logFailTestcase(temp);
    }
    if (CityDebtor) {
        temp = await amendmentFormPreview.validateDebtorCity(CityDebtor);
        logFailTestcase(temp);
    }
    //#endregion
});

Then("System shows correct information at Amendment Preview guarantee page section Beneficiary {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const Type = row.Type;

    const IsPersonBeneficiary = row.IsPersonBeneficiary;
    const BeneficiaryBeneficiary = row.BeneficiaryBeneficiary;
    const OrgNrBeneficiary = row.OrgNrBeneficiary;
    const DateOfBirthBeneficiary = row.DateOfBirthBeneficiary;
    const AddressBeneficiary = row.AddressBeneficiary;
    const PostcodeBeneficiary = row.PostcodeBeneficiary;
    const CityBeneficiary = row.CityBeneficiary;
    const OtherInformationBeneficiary = row.OtherInformationBeneficiary;

    const Beneficiary2Beneficiary = row.Beneficiary2Beneficiary;
    const OrgNr2Beneficiary = row.OrgNr2Beneficiary;
    const DateOfBirth2Beneficiary = row.DateOfBirth2Beneficiary;
    const Address2Beneficiary = row.Address2Beneficiary;
    const Postcode2Beneficiary = row.Postcode2Beneficiary;
    const City2Beneficiary = row.City2Beneficiary;
    const OtherInformation2Beneficiary = row.OtherInformation2Beneficiary;

    let temp = true;
    //#region Beneficiary
    if (BeneficiaryBeneficiary) {
        temp = await amendmentFormPreview.validateBeneficiaryName(BeneficiaryBeneficiary);
        logFailTestcase(temp);
    }
    if (OrgNrBeneficiary) {
        temp = await amendmentFormPreview.validateBeneficiaryOrgNr("Org.nr.: " + OrgNrBeneficiary);
        logFailTestcase(temp);
    }
    if (AddressBeneficiary) {
        temp = await amendmentFormPreview.validateBeneficiaryAddress(AddressBeneficiary);
        logFailTestcase(temp);
    }
    if (PostcodeBeneficiary) {
        temp = await amendmentFormPreview.validateBeneficiaryPostcode(PostcodeBeneficiary);
        logFailTestcase(temp);
    }
    if (CityBeneficiary) {
        temp = await amendmentFormPreview.validateBeneficiaryCity(CityBeneficiary);
        logFailTestcase(temp);
    }
    //#endregion

    //#region Beneficiary 2
    if (Beneficiary2Beneficiary) {
        temp = await amendmentFormPreview.validateBeneficiary2Name(Beneficiary2Beneficiary);
        logFailTestcase(temp);
    }
    if (OrgNr2Beneficiary) {
        temp = await amendmentFormPreview.validateBeneficiary2OrgNr("Org.nr.: " + OrgNr2Beneficiary);
        logFailTestcase(temp);
    }
    if (Address2Beneficiary) {
        temp = await amendmentFormPreview.validateBeneficiary2Address(Address2Beneficiary);
        logFailTestcase(temp);
    }
    if (Postcode2Beneficiary) {
        temp = await amendmentFormPreview.validateBeneficiary2Postcode(Postcode2Beneficiary);
        logFailTestcase(temp);
    }
    if (City2Beneficiary) {
        temp = await amendmentFormPreview.validateBeneficiary2City(City2Beneficiary);
        logFailTestcase(temp);
    }
    //#endregion
});

Then("System shows correct information at Amendment Preview guarantee page section Guarantor {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    //GUARANTOR AND THIRD PARTY
    const GuarantorNameGuarantor = row.GuarantorNameGuarantor;
    const VisitingAddressGuarantor = row.VisitingAddressGuarantor;
    const PostcodeGuarantor = row.PostcodeGuarantor;
    const CityGuarantor = row.CityGuarantor.replace(/\*/g, ",");
    const GuaranteeIssuerGuarantor = row.GuaranteeIssuerGuarantor;
    const FirmsNoGuarantor = row.FirmsNoGuarantor;
    let temp = true;
    //#region Guarantor
    if (GuarantorNameGuarantor) {
        temp = await amendmentFormPreview.validateGuarantorName(GuarantorNameGuarantor);
        logFailTestcase(temp);
    }
    if (VisitingAddressGuarantor) {
        temp = await amendmentFormPreview.validateGuarantorAddress(VisitingAddressGuarantor);
        logFailTestcase(temp);
    }
    if (PostcodeGuarantor) {
        temp = await amendmentFormPreview.validateGuarantorPostcode(PostcodeGuarantor);
        logFailTestcase(temp);
    }
    if (CityGuarantor) {
        temp = await amendmentFormPreview.validateGuarantorCity(CityGuarantor);
        logFailTestcase(temp);
    }
    if (FirmsNoGuarantor) {
        temp = await amendmentFormPreview.validateGuarantorFirmNo("Firm number: " + FirmsNoGuarantor);
        logFailTestcase(temp);
    }
    //#endregion
});

Then("System shows correct information at Amendment Preview guarantee page section Guarantee Issuer {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const GuaranteeIssuerGuarantor = row.GuaranteeIssuerGuarantor;
    let temp = true;
    //#region Guarantee Issuer
    if (GuaranteeIssuerGuarantor) {
        temp = await amendmentFormPreview.validateGuaranteeIssuer(GuaranteeIssuerGuarantor);
        logFailTestcase(temp);
    }
    //#endregion
});

Then("System shows correct information at Amendment Preview guarantee page section Underlying Contract {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    //CONTRACT AND GUARANTEE
    let TotalContractAmountUnderlying = row.TotalContractAmountUnderlying;
    const ContractReferenceUnderlying = row.ContractReferenceUnderlying;
    const ContractStartDateUnderlying = row.ContractStartDateUnderlying; //new
    const ContractStartDateMinusToday = row.ContractStartDateMinusToday; //new
    const UnderlyingContractDocsUnderlying = row.UnderlyingContractDocsUnderlying;
    const ProjectUnderlying = row.ProjectUnderlying;
    const ProjectNameUnderlying = row.ProjectNameUnderlying; //new
    const ProjectAddressUnderlying = row.ProjectAddressUnderlying; //new
    const ProjectDescriptionUnderlying = row.ProjectDescriptionUnderlying; //new
    const ContractCommitmentUnderlying = row.ContractCommitmentUnderlying;
    const GardsnummerUnderlying = row.GardsnummerUnderlying;
    const BruksnummerUnderlying = row.BruksnummerUnderlying;
    const KommuneUnderlying = row.KommuneUnderlying;
    let temp = true;
    //#region Underlying Contract
    if (ContractReferenceUnderlying) {
        temp = await amendmentFormPreview.validateUnderlyingContractReference(ContractReferenceUnderlying);
        logFailTestcase(temp);
    }
    if (ContractCommitmentUnderlying) {
        temp = await amendmentFormPreview.validateUnderlyingContractCommitment(ContractCommitmentUnderlying);
        logFailTestcase(temp);
    }
    if (GardsnummerUnderlying) {
        temp = await amendmentFormPreview.validateUnderlyingContractGardsnummer("GNR " + GardsnummerUnderlying);
        logFailTestcase(temp);
    }
    if (BruksnummerUnderlying) {
        temp = await amendmentFormPreview.validateUnderlyingContractBruksnummer("BNR " + BruksnummerUnderlying);
        logFailTestcase(temp);
    }
    if (KommuneUnderlying) {
        temp = await amendmentFormPreview.validateUnderlyingContractKommune(KommuneUnderlying);
        logFailTestcase(temp);
    }

    if (TotalContractAmountUnderlying) {
        if (scenarioTags.has("@CustomerPortalHogs") || scenarioTags.has("@CustomerPortalAtlas")) {
            TotalContractAmountUnderlying = numberToCurrency(TotalContractAmountUnderlying) + " " + getDefaultCurrency();
        } else {
            TotalContractAmountUnderlying = numberToCurrency(TotalContractAmountUnderlying, true);
        }
        temp = await amendmentFormPreview.validateUnderlyingContractTotalAmount(TotalContractAmountUnderlying);
        logFailTestcase(temp);
    }
    if (ContractStartDateMinusToday || ContractStartDateUnderlying) {
        let dateTemp = ContractStartDateMinusToday;
        if (ContractStartDateMinusToday) {
            dateTemp = getDate(ContractStartDateMinusToday);
        }
        if (scenarioTags.has("@CustomerPortalHogs") || scenarioTags.has("@CustomerPortalAtlas")) {
            dateTemp = dateTemp.replace(/\./g, "-").replace(/\//g, "-");
        }
        else {
            dateTemp = formatDateTime(dateTemp);
        }
        temp = await amendmentFormPreview.validateUnderlyingContractStartDate(dateTemp);
        logFailTestcase(temp);
    }
});

Then("System shows correct information at Amendment Preview guarantee page section Third Party {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const CompanyNameThirdParty = row.CompanyNameThirdParty;
    const AddressThirdParty = row.AddressThirdParty;
    const PostcodeThirdParty = row.PostcodeThirdParty;
    const CityThirdParty = row.CityThirdParty;
    const PhoneNumberThirdParty = row.PhoneNumberThirdParty;
    const FaxThirdParty = row.FaxThirdParty;
    const EmailThirdParty = row.EmailThirdParty;
    const WebsiteThirdParty = row.WebsiteThirdParty;
    let temp = true;
    //#region Third Party
    if (CompanyNameThirdParty) {
        temp = await amendmentFormPreview.validateThirdPartyName(CompanyNameThirdParty);
        logFailTestcase(temp);
    }
    if (AddressThirdParty) {
        temp = await amendmentFormPreview.validateThirdPartyAddress(AddressThirdParty);
        logFailTestcase(temp);
    }
    if (PostcodeThirdParty) {
        temp = await amendmentFormPreview.validateThirdPartyPostcode(PostcodeThirdParty);
        logFailTestcase(temp);
    }
    if (CityThirdParty) {
        temp = await amendmentFormPreview.validateThirdPartyCity(CityThirdParty);
        logFailTestcase(temp);
    }
    if (PhoneNumberThirdParty) {
        temp = await amendmentFormPreview.validateThirdPartyPhone("Phone " + PhoneNumberThirdParty);
        logFailTestcase(temp);
    }
    //#endregion
});

Then("System shows correct information at Amendment Preview guarantee page section Timeline {string}", async (filename) => {
    await globalPageObject.waitForSeconds(3000);
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    //#region Declare variables

    const Type = row.Type;


    let PeriodStartGuarantee = "";
    let PeriodEndGuarantee = "";
    let GuaranteeAmountGuarantee = row.GuaranteeAmountGuarantee;
    let AdditionalGuaranteeFee = row.AdditionalGuaranteeFee;
    let AdditionalCommisstion = row.AdditionalCommisstion;
    let AmendmentFee = row.AmendmentFee;

    let StartDateMinusToday = row.StartDateMinusToday;
    let EndDateMinusStartDate = row.EndDateMinusStartDate;


    //Two phases
    let PeriodStartGuaranteePhase2 = "";
    let PeriodEndGuaranteePhase2 = "";
    let AdditionalGuaranteeFeePhase2 = row.AdditionalGuaranteeFeePhase2;
    let AdditionalCommisstionPhase2 = row.AdditionalCommisstionPhase2;
    let TotalAdditionalGuaranteeFee = row.TotalAdditionalGuaranteeFee;
    let GuaranteeAmountGuaranteePhase2 = row.GuaranteeAmountGuaranteePhase2
    let StartDate2MinusEndDate = row.StartDate2MinusEndDate;
    let EndDate2MinusStartDate2 = row.EndDate2MinusStartDate2;
    let RenewGuaranteeGuarantee = row.RenewGuaranteeGuarantee;


    //Period Date
    if (StartDateMinusToday) {
        PeriodStartGuarantee = getDate(row.StartDateMinusToday);
    }
    if (EndDateMinusStartDate) {
        PeriodEndGuarantee = addDate(PeriodStartGuarantee, row.EndDateMinusStartDate);
    }
    if (StartDate2MinusEndDate) {
        PeriodStartGuaranteePhase2 = addDate(PeriodEndGuarantee, StartDate2MinusEndDate);
    }
    if (EndDate2MinusStartDate2) {
        PeriodEndGuaranteePhase2 = addDate(PeriodStartGuaranteePhase2, EndDate2MinusStartDate2);
    }
    //#endregion



    //#region Validate value
    //#region 1. Each phases


    let temp = true;

    if (!Type || Type.localeCompare("Two Phases") != 0) {
        if (PeriodStartGuarantee && PeriodEndGuarantee) {
            let periodEnd = RenewGuaranteeGuarantee ? "" : " - " + formatDateTime(PeriodEndGuarantee);
            if (scenarioTags.has("@CustomerPortalHogs") || scenarioTags.has("@CustomerPortalAtlas")) {
                periodEnd = periodEnd.replace(/\./g, "-").replace(/\//g, "-");
                PeriodStartGuarantee = formatDateTime(PeriodStartGuarantee).replace(/\./g, "-").replace(/\//g, "-");
            }
            temp = await amendmentFormPreview.validatePeriod(PeriodStartGuarantee + periodEnd);
            logFailTestcase(temp, "Incorrect Period");
        }
        if (GuaranteeAmountGuarantee) {
            temp = await amendmentFormPreview.validateGuaranteeAmount(numberToCurrency(GuaranteeAmountGuarantee) + " " + getDefaultCurrency());
            logFailTestcase(temp, "Incorrect GuaranteeAmount");
        }
        if (AdditionalGuaranteeFee) {
            temp = await amendmentFormPreview.validateAdditionalGuaranteeFee(numberToCurrency(AdditionalGuaranteeFee) + " " + getDefaultCurrency());
            logFailTestcase(temp, "Incorrect Additional guarantee fee");
        }
        if (AdditionalCommisstion) {
            temp = await amendmentFormPreview.validateAdditionalCommission(numberToCurrency(AdditionalCommisstion) + " " + getDefaultCurrency());
            logFailTestcase(temp, "Incorrect AdditionalCommisstion");
        }
    }
    else if (Type.localeCompare("Two Phases") === 0) {
        if (PeriodStartGuarantee && PeriodEndGuaranteePhase2) {
            let period = formatDateTime(PeriodStartGuarantee) + " - " + formatDateTime(PeriodEndGuarantee);
            let periodPhase2 = formatDateTime(PeriodStartGuaranteePhase2) + " - " + formatDateTime(PeriodEndGuaranteePhase2);
            if (scenarioTags.has("@CustomerPortalHogs") || scenarioTags.has("@CustomerPortalAtlas")) {
                periodPhase2 = periodPhase2.replace(/\./g, "-").replace(/\//g, "-");
                period = period.replace(/\./g, "-").replace(/\//g, "-");
            }
            temp = await amendmentFormPreview.validatePeriodPhase1("Period: " + period);
            logFailTestcase(temp, "Incorrect Period Phase 1");
            temp = await amendmentFormPreview.validatePeriodPhase2("Period: " + periodPhase2);
            logFailTestcase(temp, "Incorrect Period Phase 2");
        }
        if (GuaranteeAmountGuarantee) {
            temp = await amendmentFormPreview.validateGuaranteeAmountPhase1(numberToCurrency(GuaranteeAmountGuarantee) + " " + getDefaultCurrency());
            logFailTestcase(temp, "Incorrect GuaranteeAmount phase 1");
        }
        if (GuaranteeAmountGuaranteePhase2) {
            temp = await amendmentFormPreview.validateGuaranteeAmountPhase2(numberToCurrency(GuaranteeAmountGuaranteePhase2) + " " + getDefaultCurrency());
            logFailTestcase(temp, "Incorrect GuaranteeAmount phase 2");
        }
        if (AdditionalGuaranteeFee) {
            temp = await amendmentFormPreview.validateAdditionalGuaranteeFeePhase1(numberToCurrency(AdditionalGuaranteeFee) + " " + getDefaultCurrency());
            logFailTestcase(temp, "Incorrect Additional guarantee fee Phase 1");
        }
        if (AdditionalGuaranteeFeePhase2) {
            temp = await amendmentFormPreview.validateAdditionalGuaranteeFeePhase2(numberToCurrency(AdditionalGuaranteeFeePhase2) + " " + getDefaultCurrency());
            logFailTestcase(temp, "Incorrect Additional guarantee fee Phase 2");
        }
        if (AdditionalCommisstion) {
            temp = await amendmentFormPreview.validateAdditionalCommissionPhase1(numberToCurrency(AdditionalCommisstion) + " " + getDefaultCurrency());
            logFailTestcase(temp, "Incorrect AdditionalCommisstion phase 1");
        }
        if (AdditionalCommisstionPhase2) {
            temp = await amendmentFormPreview.validateAdditionalCommissionPhase2(numberToCurrency(AdditionalCommisstionPhase2) + " " + getDefaultCurrency());
            logFailTestcase(temp, "Incorrect AdditionalCommisstion phase 2");
        }
    }
    else {
        logFailTestcase(false, "Can not validate the values at Amendment Preview timeline!");
    }


    if (AmendmentFee) {
        if (scenarioTags.has("@CustomerPortalHogs") || scenarioTags.has("@CustomerPortalAtlas")) {
            AmendmentFee = numberToCurrency(AmendmentFee) + " " + getDefaultCurrency();
        }
        else {
            AmendmentFee = numberToCurrency(AmendmentFee, true)
        }
        temp = await amendmentFormPreview.validateAmendmentFee(AmendmentFee);
        logFailTestcase(temp, "Incorrect amendment fee");
    }



});
//#endregion