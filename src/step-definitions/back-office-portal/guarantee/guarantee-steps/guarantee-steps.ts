import { Before, Given, Then, When } from "@cucumber/cucumber";
import { compareDesc } from "date-fns";
import { GlobalBrowserWindowHandle } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalBrowserWindowHandle";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { AccountTabDocumentListGuarantee } from "../../../../page-objects/back-office-portal/guarantee/account/account-details/tabs/account-document/AccountTabDocumentListGuarantee";
import { AccountTabFrameAgreementList } from "../../../../page-objects/back-office-portal/guarantee/account/account-details/tabs/account-frame-agreements/AccountTabFrameAgreementList";
import { ApplicationList } from "../../../../page-objects/back-office-portal/guarantee/application/application-list/ApplicationList";
import { AmendmentFormBasicInformation } from "../../../../page-objects/back-office-portal/guarantee/guarantee/amendment-forms/AmendmentFormBasicInformation";
import { AmendmentFormContractAndGuarantee } from "../../../../page-objects/back-office-portal/guarantee/guarantee/amendment-forms/AmendmentFormContractAndGuarantee";
import { AmendmentFormGuarantorAndThirdParty } from "../../../../page-objects/back-office-portal/guarantee/guarantee/amendment-forms/AmendmentFormGuarantorThirdParty";
import { AmendmentFormPayment } from "../../../../page-objects/back-office-portal/guarantee/guarantee/amendment-forms/AmendmentFormPayment";
import { AmendmentFormPreview } from "../../../../page-objects/back-office-portal/guarantee/guarantee/amendment-forms/AmendmentFormPreview";
import { GuaranteeDetailFormAmendments } from "../../../../page-objects/back-office-portal/guarantee/guarantee/guarantee-forms/GuaranteeDetailFormAmendments";
import { GuaranteeDetailFormLatestInformation } from "../../../../page-objects/back-office-portal/guarantee/guarantee/guarantee-forms/GuaranteeDetailFormLatestInformation";
import { GuaranteeDetailFormOriginalGuarantee } from "../../../../page-objects/back-office-portal/guarantee/guarantee/guarantee-forms/GuaranteeDetailFormOriginalGurantee";
import { ReplicateGuaranteeOptionsForm } from "../../../../page-objects/back-office-portal/guarantee/guarantee/guarantee-forms/ReplicateGuaranteeOptionsForm";
import { GuaranteeList } from "../../../../page-objects/back-office-portal/guarantee/guarantee/guarantee-list/GuaranteeList";
import { AppNavigationCP } from "../../../../page-objects/customer-portal/general/app-header/app-navigation/AppNavigationCP";
import { ApplicationListCP } from "../../../../page-objects/customer-portal/general/application/application-list/ApplicationListCP";
import { GlobalItemPage } from "../../../../page-objects/customer-portal/general/GlobalPageObject/GlobalItemPage";
import { GuaranteeListCP } from "../../../../page-objects/customer-portal/general/guarantee/guarantee-list/GuaranteeListCP";
import { GuaranteeListCPGuaranteeAtlas } from "../../../../page-objects/customer-portal/guarantee/atlas/guarantee/guarantee-list/GuaranteeListCPGuaranteeAtlas";
import { GuaranteeListCPGuaranteeHogs } from "../../../../page-objects/customer-portal/guarantee/hogs/guarantee/guarantee-list/GuaranteeListCPGuaranteeHogs";
import { ValidateField } from "../../../../shared/classes";
import { addDate, convertPathFileDataToDataRegression, ExcelDateToJSDate, getCurrentDateTime, getDate, logFailTestcase, logInfoMessage, logSuccessMessage, logWarningMessage, updateValueToCSVfile } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { currencyToNumber, formatDateTime, numberToCurrency } from "../../../../shared/tenant-setting/tenant-setting";
import { dataTestcase, dataTestExecution, scenarioTags } from "../../../../shared/variables";
import { getValueDataOfDataTestExecution, pushObjectToDataArrayWithUniqueKey } from "../../../../storage-data/functions/data-test-execution";


const loader = require("csv-load-sync");
const loader_xlsx = require('read-excel-file/node');
const fs = require('fs');

let globalPageObject: GlobalPageObject;


let guaranteeList: GuaranteeList
let guaranteeDetailFormAmendments: GuaranteeDetailFormAmendments;
let guaranteeDetailFormLatestInformation: GuaranteeDetailFormLatestInformation;
let guaranteeDetailFormOriginalGuarantee: GuaranteeDetailFormOriginalGuarantee;
let accountTabDocumentListGuarantee: AccountTabDocumentListGuarantee;
let amendmentFormBasicInformation: AmendmentFormBasicInformation;
let amendmentFormContractAndGuarantee: AmendmentFormContractAndGuarantee;
let amendmentFormGuarantorAndThirdParty: AmendmentFormGuarantorAndThirdParty;
let amendmentFormPayment: AmendmentFormPayment;
let amendmentFormPreview: AmendmentFormPreview;
let accountTabFrameAgreementList: AccountTabFrameAgreementList
let applicationList: ApplicationList;
let appNavigationCP: AppNavigationCP;
let frameAgreementList: AccountTabFrameAgreementList;
let globalBrowserWindowHandle: GlobalBrowserWindowHandle;
let replicateGuaranteeOptionsForm: ReplicateGuaranteeOptionsForm;
//Customer portal
let globalItemPage: GlobalItemPage;
Before(async function () {
    const context: ICommonContext = this.context;
    globalPageObject = new GlobalPageObject(context.driverService);
    guaranteeList = new GuaranteeList(context.driverService);
    guaranteeDetailFormAmendments = new GuaranteeDetailFormAmendments(context.driverService);
    guaranteeDetailFormLatestInformation = new GuaranteeDetailFormLatestInformation(context.driverService);
    guaranteeDetailFormOriginalGuarantee = new GuaranteeDetailFormOriginalGuarantee(context.driverService);
    accountTabDocumentListGuarantee = new AccountTabDocumentListGuarantee(context.driverService);
    amendmentFormBasicInformation = new AmendmentFormBasicInformation(context.driverService);
    amendmentFormContractAndGuarantee = new AmendmentFormContractAndGuarantee(context.driverService);
    amendmentFormGuarantorAndThirdParty = new AmendmentFormGuarantorAndThirdParty(context.driverService);
    amendmentFormPayment = new AmendmentFormPayment(context.driverService);
    amendmentFormPreview = new AmendmentFormPreview(context.driverService);
    accountTabFrameAgreementList = new AccountTabFrameAgreementList(context.driverService);
    applicationList = new ApplicationList(context.driverService)
    globalItemPage = new GlobalItemPage(context.driverService)
    frameAgreementList = new AccountTabFrameAgreementList(context.driverService);
    globalBrowserWindowHandle = new GlobalBrowserWindowHandle(context.driverService);
    replicateGuaranteeOptionsForm = new ReplicateGuaranteeOptionsForm(context.driverService);
    if (scenarioTags.has("@CustomerPortalHogs")) {
        guaranteeList = new GuaranteeListCPGuaranteeHogs(context.driverService);
        applicationList = new ApplicationListCP(context.driverService);
        appNavigationCP = new AppNavigationCP(context.driverService);
    }
    if (scenarioTags.has("@CustomerPortalAtlas")) {
        guaranteeList = new GuaranteeListCPGuaranteeAtlas(context.driverService);
        applicationList = new ApplicationListCP(context.driverService);
        appNavigationCP = new AppNavigationCP(context.driverService);
    }
});


//#region Guarantee List
When("System shows correct information at guarantee list {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    await globalPageObject.reloadTable(8000);
    await globalPageObject.waitForProgressBarLoaded_v2();

    const Type = row.Type;
    let IssuedDate = row.IssuedDateGuarantee || getDate(row.IssuedDateGuaranteeMinusToday);
    const Debtor = row.OrdererDebtor;
    const Beneficiary = row.BeneficiaryBeneficiary;
    const ContractCommitment = row.ContractCommitmentUnderlying;
    let PeriodStartGuarantee = row.PeriodStartGuarantee;
    let PeriodEndGuarantee = row.PeriodEndGuarantee;
    let StartDateMinusToday = row.StartDateMinusToday;
    let EndDateMinusStartDate = row.EndDateMinusStartDate;

    let Amount = row.GuaranteeAmountGuarantee;
    let GuaranteeRate = row.GuaranteeRateGuarantee;
    const GuaranteeFee = numberToCurrency(currencyToNumber(row.GuaranteeFeeGuaranteeFee), true);
    const Status = row.Status;
    let TotalGuaranteeFeeGuaranteeFee = "";
    if (Type && Type.localeCompare("Two Phases") === 0) {
        TotalGuaranteeFeeGuaranteeFee = row.TotalGuaranteeFeeGuaranteeFee;
    }

    if (StartDateMinusToday) {
        PeriodStartGuarantee = getDate(StartDateMinusToday);
    }
    if (EndDateMinusStartDate) {
        PeriodEndGuarantee = addDate(PeriodStartGuarantee, EndDateMinusStartDate);
    }

    if (row.IsBackDatedGurantee && row.IsBackDatedGurantee.localeCompare("Yes") === 0) {
        PeriodStartGuarantee = getDate(-364);
        PeriodEndGuarantee = getDate();
    }

    let temp = await guaranteeList.validateGuaranteeIssuedDateValueOnList(formatDateTime(IssuedDate));
    logFailTestcase(temp, "Incorrect IssuedDate");

    temp = await guaranteeList.validateDebtorValueOnList(Debtor);
    logFailTestcase(temp);

    temp = await guaranteeList.validateBeneficiaryValueOnList(Beneficiary);
    logFailTestcase(temp);

    temp = await guaranteeList.validateContactCommitmentValueOnList(ContractCommitment || "N/A");
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
            GuaranteeRate = "";
        }
        temp = await guaranteeList.validateCurrentPhaseValueOnList(CurrentPhase);
        logFailTestcase(temp);
    }
    Amount = Amount ? numberToCurrency(Amount, true) : "N/A";
    temp = await guaranteeList.validateAmountValueOnList(Amount);
    logFailTestcase(temp);

    if (GuaranteeRate) {
        temp = await guaranteeList.validateGuaranteeRateValueOnList(GuaranteeRate || "N/A");
        logFailTestcase(temp);
    }

    if (Type && Type.localeCompare("Two Phases") === 0) {
        temp = await guaranteeList.validateGuaranteeFeeValueOnList(numberToCurrency(TotalGuaranteeFeeGuaranteeFee, true));
        logFailTestcase(temp);
    } else {
        temp = await guaranteeList.validateGuaranteeFeeValueOnList(GuaranteeFee);
        logFailTestcase(temp);
    }

    temp = await guaranteeList.validateStatusValueOnList(Status, 1, true);
    logFailTestcase(temp, "Incorrect status");



    dataTestcase.push(new ValidateField("Guarantee No", 1, true, [await guaranteeList.getValueGuaranteeNoOnList()], []));
    dataTestcase.push(new ValidateField("Guarantee No Amendment", 1, true, [await guaranteeList.getValueGuaranteeNoOnList() + "/0001"], []));
});

Then("User opens first guarantee at guarantee list", async () => {
    dataTestcase.push(new ValidateField("Guarantee No", 1, true, [await guaranteeList.getValueGuaranteeNoOnList()], []));

    const temp = await guaranteeList.openGuaranteeByRowInGuaranteeList(1);
    logFailTestcase(temp, "Open first guarantee failed!");
});

Given("User searches a guarantee has status is Amended", async () => {
    const guaranteeName = await guaranteeList.getValueGuaranteeNoByStatusOnList("Amended");
    logFailTestcase(guaranteeName.length > 0, 'Get guarantee name with status Amended failed!');

    let temp = await guaranteeList.inputSearchKeywordGuarantee(guaranteeName);
    logFailTestcase(temp, "Input guarantee name failed!");

    temp = await guaranteeList.pressSearchGuarantee();
    logFailTestcase(temp, "Press search guarantee failed!");
});

Given("User searches a guarantee at Guarantee list from DataTestCase", async () => {
    let GuaranteeNo = "InValidGuaranteeNo";
    for (const iterator of dataTestcase) {
        if (iterator.nameField.localeCompare("Guarantee No") === 0) {
            GuaranteeNo = iterator.message[0];
            break;
        }
    }
    await globalPageObject.waitForProgressBarLoaded_v2();
    let temp = await guaranteeList.inputSearchKeywordGuarantee(GuaranteeNo);
    logFailTestcase(temp, "Input Guarantee No into Search Keyword field!");

    temp = await guaranteeList.pressSearchGuarantee();
    logFailTestcase(temp, "Press search Guarantee list failed!");

    await globalPageObject.waitForProgressBarLoaded_v2();
});

Given("User searches a guarantee at Guarantee list from DataTestExecution", async () => {
    let GuaranteeNo = "InValidGuaranteeNo";
    GuaranteeNo = getValueDataOfDataTestExecution("Guarantee No");
    await globalPageObject.waitForProgressBarLoaded_v2();
    let temp = await guaranteeList.inputSearchKeywordGuarantee(GuaranteeNo);
    logFailTestcase(temp, "Input Guarantee No into Search Keyword field!");

    temp = await guaranteeList.pressSearchGuarantee();
    logFailTestcase(temp, "Press search Guarantee list failed!");

    await globalPageObject.waitForProgressBarLoaded_v2();
});

//#endregion


Then("System shows correct information at {string} tab on detail guarantee page {string}", async (tabName: string, filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    //#region Declare variables
    //BASICINFFORMATION
    const Type = row.Type;

    const ExpiryDateApplication = row.ExpiryDateApplication;
    const DescriptionGuarantee = row.DescriptionGuarantee;
    const IssuedDateGuarantee = row.IssuedDateGuarantee;

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


    const OrdererDebtor = row.OrdererDebtor;
    const OrganisationNumberDebtor = row.OrganisationNumberDebtor;
    const AddressDebtor = row.AddressDebtor;
    const PostcodeDebtor = row.PostcodeDebtor;
    const CityDebtor = row.CityDebtor;
    const OtherInformationDebtor = row.OtherInformationDebtor;


    //CONTRACT AND GUARANTEE
    const TotalContractAmountUnderlying = row.TotalContractAmountUnderlying;
    const ContractReferenceUnderlying = row.ContractReferenceUnderlying;
    const DateForSignedContract = row.DateForSignedContract; //new
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
    const PeriodEndGuarantee = row.PeriodEndGuarantee;
    const GuaranteeAmountGuarantee = row.GuaranteeAmountGuarantee;
    const GuaranteeRateGuarantee = row.GuaranteeRateGuarantee;
    const CommentGuarantee = row.CommentGuarantee;
    const RenewGuaranteeGuarantee = row.RenewGuaranteeGuarantee;

    //PAYMENT
    const GuaranteeFeeGuaranteeFee = row.GuaranteeFeeGuaranteeFee;
    const Commission = row.Commission; //new
    const EstablishmentFeeOtherFee = row.EstablishmentFeeOtherFee;


    //GUARANTOR AND THIRD PARTY
    const GuarantorNameGuarantor = row.GuarantorNameGuarantor;
    const VisitingAddressGuarantor = row.VisitingAddressGuarantor;
    const PostcodeGuarantor = row.PostcodeGuarantor;
    const CityGuarantor = row.CityGuarantor;
    const GuaranteeIssuerGuarantor = row.GuaranteeIssuerGuarantor;
    const OnBehalfOfTheGuarantorGuarantor = row.OnBehalfOfTheGuarantorGuarantor;
    const FirmsNoGuarantor = row.FirmsNoGuarantor;
    const PostAddressGuarantor = row.PostAddressGuarantor;
    const PostZipCodeGuarantor = row.PostZipCodeGuarantor;
    const PostCityGuarantor = row.PostCityGuarantor;
    const EmailGuarantor = row.EmailGuarantor;
    const PhoneNumberGuarantor = row.PhoneNumberGuarantor;


    const CompanyNameThirdParty = row.CompanyNameThirdParty;
    const AddressThirdParty = row.AddressThirdParty;
    const PostcodeThirdParty = row.PostcodeThirdParty;
    const CityThirdParty = row.CityThirdParty;
    const PhoneNumberThirdParty = row.PhoneNumberThirdParty;
    const FaxThirdParty = row.FaxThirdParty;
    const EmailThirdParty = row.EmailThirdParty;
    const WebsiteThirdParty = row.WebsiteThirdParty;


    const AmendmentFee = row.AmendmentFee;
    const AdditionalGuaranteeFee = row.AdditionalGuaranteeFee
    const AdditionalCommission = row.AdditionalCommission;

    //TWO PHASE
    let PeriodStartGuaranteePhase2 = "";
    let PeriodEndGuaranteePhase2 = "";
    let GuaranteeAmountGuaranteePhase2 = "";
    let GuaranteeRateGuaranteePhase2 = "";
    let CommentGuaranteePhase2 = "";

    let GuaranteeFeeGuaranteeFeePhase2 = "";
    let TotalGuaranteeFeeGuaranteeFee = "";
    let CommissionPhase2 = "";
    let TotalCommission = "";

    let AdditionalGuaranteeFeePhase2 = "";
    let TotalAdditionalGuaranteeFee = "";
    let AdditionalCommissionPhase2 = "";
    let TotalAdditionalCommission = "";



    if (Type && Type.localeCompare("Two Phases") === 0) {
        PeriodStartGuaranteePhase2 = row.PeriodStartGuaranteePhase2;
        PeriodEndGuaranteePhase2 = row.PeriodEndGuaranteePhase2;
        GuaranteeAmountGuaranteePhase2 = row.GuaranteeAmountGuaranteePhase2;
        GuaranteeRateGuaranteePhase2 = row.GuaranteeRateGuaranteePhase2;
        CommentGuaranteePhase2 = row.CommentGuaranteePhase2;

        GuaranteeFeeGuaranteeFeePhase2 = row.GuaranteeFeeGuaranteeFeePhase2;
        TotalGuaranteeFeeGuaranteeFee = row.TotalGuaranteeFeeGuaranteeFee;
        CommissionPhase2 = row.CommissionPhase2;
        TotalCommission = row.TotalCommission;

        AdditionalGuaranteeFeePhase2 = row.AdditionalGuaranteeFeePhase2;
        TotalAdditionalGuaranteeFee = row.TotalAdditionalGuaranteeFee;
        AdditionalCommissionPhase2 = row.AdditionalCommissionPhase2;
        TotalAdditionalCommission = row.TotalAdditionalCommission;

    }




    //#endregion

    let temp = true;

    //#region Phase - Time line

    if (tabName && tabName.localeCompare("Original guarantee") === 0) {
        temp = await guaranteeDetailFormOriginalGuarantee.navigiateToOriginalGuaranteeTabInGuaranteeForm();
        await globalPageObject.waitForProgressBarLoaded_v2();
        logFailTestcase(temp, "navigate to Original guarantee tab failed! ");
        await globalPageObject.waitForSeconds(1500);
        if (Type && Type.localeCompare("One Phase") === 0) {
            if (PeriodStartGuarantee || PeriodEndGuarantee) {
                let periodEnd = RenewGuaranteeGuarantee ? "" : " - " + PeriodEndGuarantee;
                // Do những product tự động renew thì không có PeriodEnd (Product: Skattetrekksgaranti và Tollgaranti)
                temp = await guaranteeDetailFormOriginalGuarantee.validatePeriod(PeriodStartGuarantee + periodEnd);
                logFailTestcase(temp);
            }
            if (GuaranteeAmountGuarantee) {
                temp = await guaranteeDetailFormOriginalGuarantee.validateGuaranteeAmount(numberToCurrency(currencyToNumber(GuaranteeAmountGuarantee), true));
                logFailTestcase(temp);
            }
            if (GuaranteeFeeGuaranteeFee) {
                temp = await guaranteeDetailFormOriginalGuarantee.validateTotalGuaranteeFee(numberToCurrency(currencyToNumber(GuaranteeFeeGuaranteeFee), true));
                logFailTestcase(temp);
            }
            if (Commission) {
                temp = await guaranteeDetailFormOriginalGuarantee.validateTotalCommission(numberToCurrency(currencyToNumber(Commission), true));
                logFailTestcase(temp);
            }
            if (EstablishmentFeeOtherFee) {
                temp = await guaranteeDetailFormOriginalGuarantee.validateEstablishmentFee(numberToCurrency(currencyToNumber(EstablishmentFeeOtherFee), true));
                logFailTestcase(temp);
            }
        } else {
            if (PeriodStartGuarantee && PeriodEndGuarantee) {
                temp = await guaranteeDetailFormOriginalGuarantee.validatePeriodPhase1("Period: " + PeriodStartGuarantee + " - " + PeriodEndGuarantee);
                logFailTestcase(temp);
            }
            if (PeriodStartGuaranteePhase2 && PeriodEndGuaranteePhase2) {
                temp = await guaranteeDetailFormOriginalGuarantee.validatePeriodPhase2("Period: " + PeriodStartGuaranteePhase2 + " - " + PeriodEndGuaranteePhase2);
                logFailTestcase(temp);
            }
            if (GuaranteeAmountGuarantee) {
                temp = await guaranteeDetailFormOriginalGuarantee.validateGuaranteeAmountPhase1(numberToCurrency(currencyToNumber(GuaranteeAmountGuarantee), true));
                logFailTestcase(temp);
            }
            if (GuaranteeAmountGuaranteePhase2) {
                temp = await guaranteeDetailFormOriginalGuarantee.validateGuaranteeAmountPhase2(numberToCurrency(currencyToNumber(GuaranteeAmountGuaranteePhase2), true));
                logFailTestcase(temp);
            }
            if (GuaranteeFeeGuaranteeFee) {
                temp = await guaranteeDetailFormOriginalGuarantee.validateGuaranteeFeePhase1(numberToCurrency(currencyToNumber(GuaranteeFeeGuaranteeFee), true));
                logFailTestcase(temp);
            }
            if (GuaranteeFeeGuaranteeFeePhase2) {
                temp = await guaranteeDetailFormOriginalGuarantee.validateGuaranteeFeePhase2(numberToCurrency(currencyToNumber(GuaranteeFeeGuaranteeFeePhase2), true));
                logFailTestcase(temp);
            }
            if (TotalGuaranteeFeeGuaranteeFee) {
                temp = await guaranteeDetailFormOriginalGuarantee.validateTotalGuaranteeFee(numberToCurrency(currencyToNumber(TotalGuaranteeFeeGuaranteeFee), true));
                logFailTestcase(temp);
            }
            if (Commission) {
                temp = await guaranteeDetailFormOriginalGuarantee.validateCommissionPhase1(numberToCurrency(currencyToNumber(Commission), true));
                logFailTestcase(temp);
            }
            if (CommissionPhase2) {
                temp = await guaranteeDetailFormOriginalGuarantee.validateCommissionPhase2(numberToCurrency(currencyToNumber(CommissionPhase2), true));
                logFailTestcase(temp);
            }
            if (TotalCommission) {
                temp = await guaranteeDetailFormOriginalGuarantee.validateTotalCommission(numberToCurrency(currencyToNumber(TotalCommission), true));
                logFailTestcase(temp);
            }
            if (EstablishmentFeeOtherFee) {
                temp = await guaranteeDetailFormOriginalGuarantee.validateEstablishmentFee(numberToCurrency(currencyToNumber(EstablishmentFeeOtherFee), true));
                logFailTestcase(temp);
            }
        }
    } else if (tabName && tabName.localeCompare("Amendments") === 0) {
        temp = await guaranteeDetailFormAmendments.navigiateToAmendmentsTabInGuaranteeForm();
        await globalPageObject.waitForProgressBarLoaded_v2();
        logFailTestcase(temp, "navigate to Amendments tab failed! ");
        await globalPageObject.waitForSeconds(1500);
        if (Type && Type.localeCompare("One Phase") === 0) {
            if (row.IsBackDatedGurantee && row.IsBackDatedGurantee.localeCompare("Yes") === 0) {
                PeriodStartGuarantee = addDate(getValueDataOfDataTestExecution("PeriodEndBackDated"), 1);
            }
            if (PeriodStartGuarantee || PeriodEndGuarantee) {
                let periodEnd = RenewGuaranteeGuarantee ? "" : " - " + PeriodEndGuarantee;
                // Do những product tự động renew thì không có PeriodEnd (Product: Skattetrekksgaranti và Tollgaranti)

                temp = await guaranteeDetailFormAmendments.validatePeriod(PeriodStartGuarantee + periodEnd);
                logFailTestcase(temp);
            }
            if (GuaranteeAmountGuarantee) {
                temp = await guaranteeDetailFormAmendments.validateGuaranteeAmount(numberToCurrency(currencyToNumber(GuaranteeAmountGuarantee), true));
                logFailTestcase(temp);
            }
            if (AdditionalGuaranteeFee) {
                temp = await guaranteeDetailFormAmendments.validateAdditionalGuaranteeFee(AdditionalGuaranteeFee)
                logFailTestcase(temp);
            }
            if (AdditionalCommission) {
                temp = await guaranteeDetailFormAmendments.validateAdditionalCommission(numberToCurrency(AdditionalCommission));
                logFailTestcase(temp);
            }
            if (AmendmentFee) {
                temp = await guaranteeDetailFormAmendments.validateAmendmentFee(AmendmentFee);
                logFailTestcase(temp);
            }
        } else {
            if (PeriodStartGuarantee && PeriodEndGuarantee) {
                temp = await guaranteeDetailFormAmendments.validatePeriodPhase1("Period: " + PeriodStartGuarantee + " - " + PeriodEndGuarantee);
                logFailTestcase(temp);
            }
            if (PeriodStartGuaranteePhase2 && PeriodEndGuaranteePhase2) {
                temp = await guaranteeDetailFormAmendments.validatePeriodPhase2("Period: " + PeriodStartGuaranteePhase2 + " - " + PeriodEndGuaranteePhase2);
                logFailTestcase(temp);
            }
            if (GuaranteeAmountGuarantee) {
                temp = await guaranteeDetailFormAmendments.validateGuaranteeAmountPhase1(numberToCurrency(currencyToNumber(GuaranteeAmountGuarantee), true));
                logFailTestcase(temp);
            }
            if (GuaranteeAmountGuaranteePhase2) {
                temp = await guaranteeDetailFormAmendments.validateGuaranteeAmountPhase2(numberToCurrency(currencyToNumber(GuaranteeAmountGuaranteePhase2), true));
                logFailTestcase(temp);
            }
            if (AdditionalGuaranteeFee) {
                temp = await guaranteeDetailFormAmendments.validateAdditionalGuaranteeFeePhase1(numberToCurrency(currencyToNumber(AdditionalGuaranteeFee), true));
                logFailTestcase(temp);
            }
            if (AdditionalGuaranteeFeePhase2) {
                temp = await guaranteeDetailFormAmendments.validateAdditionalGuaranteeFeePhase2(numberToCurrency(currencyToNumber(AdditionalGuaranteeFeePhase2), true));
                logFailTestcase(temp);
            }
            if (TotalAdditionalGuaranteeFee) {
                temp = await guaranteeDetailFormAmendments.validateAdditionalGuaranteeFee(TotalAdditionalGuaranteeFee);
                logFailTestcase(temp);
            }
            if (AdditionalCommission) {
                temp = await guaranteeDetailFormAmendments.validateAdditionalCommissionPhase1(numberToCurrency(currencyToNumber(AdditionalCommission), true));
                logFailTestcase(temp);
            }
            if (AdditionalCommissionPhase2) {
                temp = await guaranteeDetailFormAmendments.validateAdditionalCommissionPhase2(numberToCurrency(currencyToNumber(AdditionalCommissionPhase2), true));
                logFailTestcase(temp);
            }
            if (TotalAdditionalCommission) {
                temp = await guaranteeDetailFormAmendments.validateAdditionalCommission(TotalAdditionalCommission);
                logFailTestcase(temp);
            }
            if (AmendmentFee) {
                temp = await guaranteeDetailFormAmendments.validateAmendmentFee(AmendmentFee);
                logFailTestcase(temp);
            }

        }
    } else if (tabName && tabName.localeCompare("Latest Information") === 0) {
        temp = await guaranteeDetailFormLatestInformation.navigiateToLatesInformationTabInGuaranteeForm();
        await globalPageObject.waitForProgressBarLoaded_v2();
        logFailTestcase(temp, "navigate to Latest Information tab failed! ");
        await globalPageObject.waitForSeconds(1500);
        if (Type && Type.localeCompare("One Phase") === 0) {
            if (PeriodStartGuarantee && PeriodEndGuarantee) {

                let periodEnd = RenewGuaranteeGuarantee ? "" : " - " + PeriodEndGuarantee;
                // Do những product tự động renew thì không có PeriodEnd (Product: Skattetrekksgaranti và Tollgaranti)

                temp = await guaranteeDetailFormLatestInformation.validatePeriod(PeriodStartGuarantee + periodEnd);
                logFailTestcase(temp);
            }
            if (GuaranteeAmountGuarantee) {
                temp = await guaranteeDetailFormLatestInformation.validateGuaranteeAmount(numberToCurrency(currencyToNumber(GuaranteeAmountGuarantee), true));
                logFailTestcase(temp);
            }
            if (GuaranteeFeeGuaranteeFee) {
                temp = await guaranteeDetailFormLatestInformation.validateTotalGuaranteeFee(numberToCurrency(currencyToNumber(GuaranteeFeeGuaranteeFee), true))
                logFailTestcase(temp);
            }
            if (Commission) {
                temp = await guaranteeDetailFormLatestInformation.validateTotalCommission(numberToCurrency(currencyToNumber(Commission), true));
                logFailTestcase(temp);
            }
            if (EstablishmentFeeOtherFee) {
                temp = await guaranteeDetailFormLatestInformation.validateEstablishmentFee(numberToCurrency(currencyToNumber(EstablishmentFeeOtherFee), true));
                logFailTestcase(temp);
            }
            if (AmendmentFee) {
                temp = await guaranteeDetailFormLatestInformation.validateAmendmentFee(numberToCurrency(currencyToNumber(AmendmentFee), true));
                logFailTestcase(temp);
            }
        } else {
            if (PeriodStartGuarantee && PeriodEndGuarantee) {
                temp = await guaranteeDetailFormLatestInformation.validatePeriodPhase1("Period: " + PeriodStartGuarantee + " - " + PeriodEndGuarantee);
                logFailTestcase(temp);
            }
            if (PeriodStartGuaranteePhase2 && PeriodEndGuaranteePhase2) {
                temp = await guaranteeDetailFormLatestInformation.validatePeriodPhase2("Period: " + PeriodStartGuaranteePhase2 + " - " + PeriodEndGuaranteePhase2);
                logFailTestcase(temp);
            }
            if (GuaranteeAmountGuarantee) {
                temp = await guaranteeDetailFormLatestInformation.validateGuaranteeAmountPhase1(numberToCurrency(currencyToNumber(GuaranteeAmountGuarantee), true));
                logFailTestcase(temp);
            }
            if (GuaranteeAmountGuaranteePhase2) {
                temp = await guaranteeDetailFormLatestInformation.validateGuaranteeAmountPhase2(numberToCurrency(currencyToNumber(GuaranteeAmountGuaranteePhase2), true));
                logFailTestcase(temp);
            }
            if (GuaranteeFeeGuaranteeFee) {
                temp = await guaranteeDetailFormLatestInformation.validateGuaranteeFeePhase1(numberToCurrency(currencyToNumber(GuaranteeFeeGuaranteeFee), true))
                logFailTestcase(temp);
            }
            if (GuaranteeFeeGuaranteeFeePhase2) {
                temp = await guaranteeDetailFormLatestInformation.validateGuaranteeFeePhase2(numberToCurrency(currencyToNumber(GuaranteeFeeGuaranteeFeePhase2), true))
                logFailTestcase(temp);
            }
            if (TotalGuaranteeFeeGuaranteeFee) {
                temp = await guaranteeDetailFormLatestInformation.validateTotalGuaranteeFee(numberToCurrency(currencyToNumber(TotalGuaranteeFeeGuaranteeFee), true))
                logFailTestcase(temp);
            }
            if (Commission) {
                temp = await guaranteeDetailFormLatestInformation.validateCommissionPhase1(numberToCurrency(currencyToNumber(Commission), true));
                logFailTestcase(temp);
            }
            if (CommissionPhase2) {
                temp = await guaranteeDetailFormLatestInformation.validateCommissionPhase2(numberToCurrency(currencyToNumber(CommissionPhase2), true));
                logFailTestcase(temp);
            }
            if (TotalCommission) {
                temp = await guaranteeDetailFormLatestInformation.validateTotalCommission(numberToCurrency(currencyToNumber(TotalCommission), true));
                logFailTestcase(temp);
            }
            if (EstablishmentFeeOtherFee) {
                temp = await guaranteeDetailFormLatestInformation.validateEstablishmentFee(numberToCurrency(currencyToNumber(EstablishmentFeeOtherFee), true));
                logFailTestcase(temp);
            }
            if (AmendmentFee) {
                temp = await guaranteeDetailFormLatestInformation.validateAmendmentFee(numberToCurrency(currencyToNumber(AmendmentFee), true));
                logFailTestcase(temp);
            }


        }
    } else {
        logFailTestcase(false, `Tab with name "${tabName}" is NOT found!`);
    }
    //#endregion

    //#region Issued Date
    if (IssuedDateGuarantee) {
        temp = await guaranteeDetailFormOriginalGuarantee.validateIssuedDate(IssuedDateGuarantee);
        logFailTestcase(temp);
    }
    //#endregion

    //#region Debtor
    if (OrdererDebtor) {
        temp = await guaranteeDetailFormOriginalGuarantee.validateDebtorName(OrdererDebtor);
        logFailTestcase(temp);
    }
    if (OrganisationNumberDebtor) {
        temp = await guaranteeDetailFormOriginalGuarantee.validateDebtorOrgNr("Org.nr.: " + OrganisationNumberDebtor);
        logFailTestcase(temp);
    }
    if (AddressDebtor) {
        temp = await guaranteeDetailFormOriginalGuarantee.validateDebtorAddress(AddressDebtor);
        logFailTestcase(temp);
    }
    if (PostcodeDebtor) {
        temp = await guaranteeDetailFormOriginalGuarantee.validateDebtorPostcode(PostcodeDebtor);
        logFailTestcase(temp);
    }
    if (CityDebtor) {
        temp = await guaranteeDetailFormOriginalGuarantee.validateDebtorCity(CityDebtor);
        logFailTestcase(temp);
    }
    //#endregion

    //#region Beneficiary
    if (BeneficiaryBeneficiary) {
        temp = await guaranteeDetailFormOriginalGuarantee.validateBeneficiaryName(BeneficiaryBeneficiary);
        logFailTestcase(temp);
    }
    if (OrgNrBeneficiary) {
        temp = await guaranteeDetailFormOriginalGuarantee.validateBeneficiaryOrgNr("Org.nr.: " + OrgNrBeneficiary);
        logFailTestcase(temp);
    }
    if (AddressBeneficiary) {
        temp = await guaranteeDetailFormOriginalGuarantee.validateBeneficiaryAddress(AddressBeneficiary);
        logFailTestcase(temp);
    }
    if (PostcodeBeneficiary) {
        temp = await guaranteeDetailFormOriginalGuarantee.validateBeneficiaryPostcode(PostcodeBeneficiary);
        logFailTestcase(temp);
    }
    if (CityBeneficiary) {
        temp = await guaranteeDetailFormOriginalGuarantee.validateBeneficiaryCity(CityBeneficiary);
        logFailTestcase(temp);
    }
    //#endregion

    //#region Beneficiary 2

    if (Beneficiary2Beneficiary) {
        temp = await guaranteeDetailFormOriginalGuarantee.validateBeneficiary2Name(Beneficiary2Beneficiary);
        logFailTestcase(temp);
    }
    if (OrgNr2Beneficiary) {
        temp = await guaranteeDetailFormOriginalGuarantee.validateBeneficiary2OrgNr("Org.nr.: " + OrgNr2Beneficiary);
        logFailTestcase(temp);
    }
    if (Address2Beneficiary) {
        temp = await guaranteeDetailFormOriginalGuarantee.validateBeneficiary2Address(Address2Beneficiary);
        logFailTestcase(temp);
    }
    if (Postcode2Beneficiary) {
        temp = await guaranteeDetailFormOriginalGuarantee.validateBeneficiary2Postcode(Postcode2Beneficiary);
        logFailTestcase(temp);
    }
    if (City2Beneficiary) {
        temp = await guaranteeDetailFormOriginalGuarantee.validateBeneficiary2City(City2Beneficiary);
        logFailTestcase(temp);
    }
    //#endregion

    //#region Guarantor
    if (GuarantorNameGuarantor) {
        temp = await guaranteeDetailFormOriginalGuarantee.validateGuarantorName(GuarantorNameGuarantor);
        logFailTestcase(temp);
    }
    if (VisitingAddressGuarantor) {
        temp = await guaranteeDetailFormOriginalGuarantee.validateGuarantorAddress(VisitingAddressGuarantor);
        logFailTestcase(temp);
    }
    if (PostcodeGuarantor) {
        temp = await guaranteeDetailFormOriginalGuarantee.validateGuarantorPostcode(PostcodeGuarantor);
        logFailTestcase(temp);
    }
    if (CityGuarantor) {
        temp = await guaranteeDetailFormOriginalGuarantee.validateGuarantorCity(CityGuarantor);
        logFailTestcase(temp);
    }
    if (FirmsNoGuarantor) {
        temp = await guaranteeDetailFormOriginalGuarantee.validateGuarantorFirmNo("Firm number: " + FirmsNoGuarantor);
        logFailTestcase(temp);
    }
    //#endregion

    //#region Guarantee Issuer
    if (GuaranteeIssuerGuarantor) {
        temp = await guaranteeDetailFormOriginalGuarantee.validateGuaranteeIssuer(GuaranteeIssuerGuarantor);
        logFailTestcase(temp);
    }
    //#endregion

    //#region Underlying Contract
    if (ContractReferenceUnderlying) {
        temp = await guaranteeDetailFormOriginalGuarantee.validateUnderlyingContractReference(ContractReferenceUnderlying);
        logFailTestcase(temp);
    }
    if (ContractCommitmentUnderlying) {
        temp = await guaranteeDetailFormOriginalGuarantee.validateUnderlyingContractCommitment(ContractCommitmentUnderlying);
        logFailTestcase(temp);
    }

    if (GardsnummerUnderlying) {
        temp = await guaranteeDetailFormOriginalGuarantee.validateUnderlyingContractGardsnummer("GNR " + GardsnummerUnderlying);
        logFailTestcase(temp);
    }
    if (BruksnummerUnderlying) {
        temp = await guaranteeDetailFormOriginalGuarantee.validateUnderlyingContractBruksnummer("BNR " + BruksnummerUnderlying);
        logFailTestcase(temp);
    }
    if (KommuneUnderlying) {
        temp = await guaranteeDetailFormOriginalGuarantee.validateUnderlyingContractKommune(KommuneUnderlying);
        logFailTestcase(temp);
    }
    if (TotalContractAmountUnderlying) {
        temp = await guaranteeDetailFormOriginalGuarantee.validateUnderlyingContractTotalAmount(numberToCurrency(currencyToNumber(TotalContractAmountUnderlying), true));
        logFailTestcase(temp);
    }
    //#endregion

    //#region Third Party
    if (CompanyNameThirdParty) {
        temp = await guaranteeDetailFormOriginalGuarantee.validateThirdPartyName(CompanyNameThirdParty);
        logFailTestcase(temp);
    }
    if (AddressThirdParty) {
        temp = await guaranteeDetailFormOriginalGuarantee.validateThirdPartyAddress(AddressThirdParty);
        logFailTestcase(temp);
    }
    if (PostcodeThirdParty) {
        temp = await guaranteeDetailFormOriginalGuarantee.validateThirdPartyPostcode(PostcodeThirdParty);
        logFailTestcase(temp);
    }
    if (CityThirdParty) {
        temp = await guaranteeDetailFormOriginalGuarantee.validateThirdPartyCity(CityThirdParty);
        logFailTestcase(temp);
    }
    if (PhoneNumberThirdParty) {
        temp = await guaranteeDetailFormOriginalGuarantee.validateThirdPartyPhone("Phone " + PhoneNumberThirdParty);
        logFailTestcase(temp);
    }
    //#endregion


});

Then("System shows correct information at detail guarantee page tab Documents", async () => {
    let expectedCreatedDate = getCurrentDateTime();
    let expectedDocumentName = "Document Name";
    for (const iterator of dataTestcase) {
        if (iterator.nameField.localeCompare("Guarantee No") === 0) {
            expectedDocumentName = iterator.message[0];
        }
    }


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




When("User inputs valid data into Create Amendment form {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];

    //#region Declare variables
    const Type = row.Type;

    //#region 1. BASICINFFORMATION

    let ExpiryDateApplication = row.ExpiryDateApplication;
    const ExpiryDateApplicationMinusToday = row.ExpiryDateApplicationMinusToday;
    const OnDemandApplication = row.OnDemandApplication;

    const DescriptionGuarantee = row.DescriptionGuarantee;
    let IssuedDateGuarantee = row.IssuedDateGuarantee;
    const IssuedDateGuaranteeMinusToday = row.IssuedDateGuaranteeMinusToday;
    const GuaranteeNoGuarantee = row.GuaranteeNoGuarantee;

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


    const OrdererDebtor = row.OrdererDebtor;
    const OrganisationNumberDebtor = row.OrganisationNumberDebtor;
    const AddressDebtor = row.AddressDebtor;
    const PostcodeDebtor = row.PostcodeDebtor;
    const CityDebtor = row.CityDebtor;
    const OtherInformationDebtor = row.OtherInformationDebtor;
    //#endregion

    //#region 2. CONTRACT AND GUARANTEE
    const TotalContractAmountUnderlying = row.TotalContractAmountUnderlying;
    const ContractReferenceUnderlying = row.ContractReferenceUnderlying;
    const DateForSignedContract = row.DateForSignedContract; //new
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

    //#region Cho test cases Instalment
    const EffectedDateMinusEndDate = row.EffectedDateMinusEndDate;
    const EffectedDateMinusStartDate = row.EffectedDateMinusStartDate;
    const NewEndDateMinusEndDate = row.NewEndDateMinusEndDate;
    const NewStartDateMinusStartDate = row.NewStartDateMinusStartDate;

    // Instalment 2 phase
    const NewEndDateMinusNewStartDate = row.NewEndDateMinusNewStartDate;
    const NewStartDate2MinusStartDate = row.NewStartDate2MinusStartDate;
    const NewStartDate2MinusStartDate2 = row.NewStartDate2MinusStartDate2;
    const NewStartDate2MinusNewEndDate = row.NewStartDate2MinusNewEndDate;
    const NewEndDate2MinusNewStartDate2 = row.NewEndDate2MinusNewStartDate2;
    const NewEndDate2MinusEndDate2 = row.NewEndDate2MinusEndDate2;
    const EffectedDateMinusNewStartDate = row.EffectedDateMinusNewStartDate;
    const EffectedDateMinusToday = row.EffectedDateMinusToday;

    //#endregion

    const GuaranteeAmountGuarantee = row.GuaranteeAmountGuarantee;
    const GuaranteeRateGuarantee = row.GuaranteeRateGuarantee;
    const AmountInWordGuarantee = row.AmountInWordGuarantee;
    const CommentGuarantee = row.CommentGuarantee;
    //#endregion

    //#region Project Information
    const NumberOfUnitsProjectInformation = row.NumberOfUnitsProjectInformation;
    const DateForCostEstimateProjectInformationMinusToday = row.DateForCostEstimateProjectInformationMinusToday;
    //#endregion

    //#region 3. PAYMENT
    const GuaranteeFeeGuaranteeFee = row.GuaranteeFeeGuaranteeFee;
    const Commission = row.Commission; //new
    const EstablishmentFeeOtherFee = row.EstablishmentFeeOtherFee;
    const AmendmentFee = row.AmendmentFee;
    //#endregion

    //#region 4. GUARANTOR AND THIRD PARTY
    const GuarantorNameGuarantor = row.GuarantorNameGuarantor;
    const VisitingAddressGuarantor = row.VisitingAddressGuarantor;
    const PostcodeGuarantor = row.PostcodeGuarantor;
    const CityGuarantor = row.CityGuarantor;
    const GuaranteeIssuerGuarantor = row.GuaranteeIssuerGuarantor;
    const OnBehalfOfTheGuarantorGuarantor = row.OnBehalfOfTheGuarantorGuarantor;
    const FirmsNoGuarantor = row.FirmsNoGuarantor;
    const PostAddressGuarantor = row.PostAddressGuarantor;
    const PostZipCodeGuarantor = row.PostZipCodeGuarantor;
    const PostCityGuarantor = row.PostCityGuarantor;
    const EmailGuarantor = row.EmailGuarantor;
    const PhoneNumberGuarantor = row.PhoneNumberGuarantor;


    const CompanyNameThirdParty = row.CompanyNameThirdParty;
    const AddressThirdParty = row.AddressThirdParty;
    const PostcodeThirdParty = row.PostcodeThirdParty;
    const CityThirdParty = row.CityThirdParty;
    const PhoneNumberThirdParty = row.PhoneNumberThirdParty;
    const FaxThirdParty = row.FaxThirdParty;
    const EmailThirdParty = row.EmailThirdParty;
    const WebsiteThirdParty = row.WebsiteThirdParty;
    //#endregion

    const AdditionalGuaranteeFee = row.AdditionalGuaranteeFee
    const AdditionalCommission = row.AdditionalCommission;

    //TWO PHASE
    let PeriodStartGuaranteePhase2 = "";
    let PeriodEndGuaranteePhase2 = "";
    let GuaranteeAmountGuaranteePhase2 = "";
    let GuaranteeRateGuaranteePhase2 = "";
    let CommentGuaranteePhase2 = "";

    let GuaranteeFeeGuaranteeFeePhase2 = "";
    let TotalGuaranteeFeeGuaranteeFee = "";
    let CommissionPhase2 = "";
    let TotalCommission = "";

    let AdditionalGuaranteeFeePhase2 = "";
    let TotalAdditionalGuaranteeFee = "";
    let AdditionalCommissionPhase2 = "";
    let TotalAdditionalCommission = "";



    if (Type && Type.localeCompare("Two Phases") === 0) {
        PeriodStartGuaranteePhase2 = row.PeriodStartGuaranteePhase2;
        PeriodEndGuaranteePhase2 = row.PeriodEndGuaranteePhase2;
        GuaranteeAmountGuaranteePhase2 = row.GuaranteeAmountGuaranteePhase2;
        GuaranteeRateGuaranteePhase2 = row.GuaranteeRateGuaranteePhase2;
        CommentGuaranteePhase2 = row.CommentGuaranteePhase2;

        GuaranteeFeeGuaranteeFeePhase2 = row.GuaranteeFeeGuaranteeFeePhase2;
        TotalGuaranteeFeeGuaranteeFee = row.TotalGuaranteeFeeGuaranteeFee;
        CommissionPhase2 = row.CommissionPhase2;
        TotalCommission = row.TotalCommission;

        AdditionalGuaranteeFeePhase2 = row.AdditionalGuaranteeFeePhase2;
        TotalAdditionalGuaranteeFee = row.TotalAdditionalGuaranteeFee;
        AdditionalCommissionPhase2 = row.AdditionalCommissionPhase2;
        TotalAdditionalCommission = row.TotalAdditionalCommission;

    }
    let EffectedDate = row.EffectedDate;
    //#endregion


    //#region Input forms
    let temp = true;
    await globalPageObject.waitForProgressBarLoaded_v2();
    //#region Basic infomation
    //Application
    if (ExpiryDateApplicationMinusToday) {
        ExpiryDateApplication = getDate(ExpiryDateApplicationMinusToday);
    }
    else if (ExpiryDateApplication) {
        temp = await amendmentFormBasicInformation.inputExpiryDateApplication(ExpiryDateApplication);
        logFailTestcase(temp, "Input ExpiryDateApplication failed!");
    }

    // Guarantee
    if (DescriptionGuarantee) {
        temp = await amendmentFormBasicInformation.inputDescriptionGuarantee(DescriptionGuarantee);
        logFailTestcase(temp, "Input DescriptionGuarantee failed!");
    }
    if (GuaranteeNoGuarantee) {
        temp = await amendmentFormBasicInformation.inputGuaranteeNoGuarantee(GuaranteeNoGuarantee);
        logFailTestcase(temp, "Input GuaranteeNoGuarantee failed!");
    }
    // if (IssuedDateGuarantee) {
    //     temp = await amendmentFormBasicInformation.inputIssuedDateGuarantee(IssuedDateGuarantee);
    //     logFailTestcase(temp, "Input IssuedDateGuarantee failed!");
    // }

    // Beneficiary
    if (IsPersonBeneficiary && (IsPersonBeneficiary.localeCompare("Yes") === 0 || IsPersonBeneficiary.localeCompare("yes") === 0)) {
        temp = await amendmentFormBasicInformation.checkIsPersonBeneficiary();
        logFailTestcase(temp, "Check IsPerson failed!");

        temp = await amendmentFormBasicInformation.inputDateOfBirthBeneficiary(DateOfBirthBeneficiary);
        logFailTestcase(temp, "Input DateOfBirthBeneficiary failed!");
    }
    else {
        if (OrgNrBeneficiary) {
            temp = await amendmentFormBasicInformation.inputOrgNrBeneficiary(OrgNrBeneficiary);
            logFailTestcase(temp, "Input OrgNrBeneficiary failed!");
        }
    }
    if (BeneficiaryBeneficiary) {
        temp = await amendmentFormBasicInformation.inputBeneficiaryBeneficiary(BeneficiaryBeneficiary);
        logFailTestcase(temp, "Input BeneficiaryBeneficiary failed!");
    }

    if (AddressBeneficiary) {
        temp = await amendmentFormBasicInformation.inputAddressBeneficiary(AddressBeneficiary);
        logFailTestcase(temp, "Input AddressBeneficiary failed!");
    }
    if (PostcodeBeneficiary) {
        temp = await amendmentFormBasicInformation.inputPostcodeBeneficiary(PostcodeBeneficiary);
        logFailTestcase(temp, "Input PostcodeBeneficiary failed!");
    }
    if (CityBeneficiary) {
        temp = await amendmentFormBasicInformation.inputCityBeneficiary(CityBeneficiary);
        logFailTestcase(temp, "Input CityBeneficiary failed!");
    }
    if (OtherInformationBeneficiary) {
        temp = await amendmentFormBasicInformation.inputOtherInformationBeneficiary(OtherInformationBeneficiary);
        logFailTestcase(temp, "Input OtherInformationBeneficiary failed!");
    }

    // Beneficiary 2
    if (Type.localeCompare("Two Phases") === 0 || scenarioTags.has("@HOGSE")) {// vì product 1 phase cũng có 2 Beneficiary
        if (IsPersonBeneficiary && (IsPersonBeneficiary.localeCompare("Yes") === 0 || IsPersonBeneficiary.localeCompare("yes") === 0)) {
            if (DateOfBirth2Beneficiary) {
                temp = await amendmentFormBasicInformation.inputDateOfBirth2Beneficiary(DateOfBirth2Beneficiary);
                logFailTestcase(temp, "Input DateOfBirth2Beneficiary failed!");
            }
        }
        else {
            if (OrgNr2Beneficiary) {
                temp = await amendmentFormBasicInformation.inputOrgNr2Beneficiary(OrgNr2Beneficiary);
                logFailTestcase(temp, "Input OrgNr2Beneficiary failed!");
            }
        }
        if (Beneficiary2Beneficiary) {
            temp = await amendmentFormBasicInformation.inputBeneficiary2Beneficiary(Beneficiary2Beneficiary);
            logFailTestcase(temp, "Input Beneficiary2Beneficiary failed!");
        }

        if (Address2Beneficiary) {
            temp = await amendmentFormBasicInformation.inputAddress2Beneficiary(Address2Beneficiary);
            logFailTestcase(temp, "Input Address2Beneficiary failed!");
        }
        if (Postcode2Beneficiary) {
            temp = await amendmentFormBasicInformation.inputPostcode2Beneficiary(Postcode2Beneficiary);
            logFailTestcase(temp, "Input Postcode2Beneficiary failed!");
        }
        if (City2Beneficiary) {
            temp = await amendmentFormBasicInformation.inputCity2Beneficiary(City2Beneficiary);
            logFailTestcase(temp, "Input City2Beneficiary failed!");
        }
        if (OtherInformation2Beneficiary) {
            temp = await amendmentFormBasicInformation.inputOtherInformation2Beneficiary(OtherInformation2Beneficiary);
            logFailTestcase(temp, "Input OtherInformation2Beneficiary failed!");
        }
    }


    // Debtor
    if (OrdererDebtor) {
        temp = await amendmentFormBasicInformation.inputOrdererDebtor(OrdererDebtor);
        logFailTestcase(temp, "Input OrdererDebtor failed!");
    }
    if (OrganisationNumberDebtor) {
        temp = await amendmentFormBasicInformation.inputOrganisationNumberDebtor(OrganisationNumberDebtor);
        logFailTestcase(temp, "Input OrganisationNumberDebtor failed!");
    }
    if (AddressDebtor) {
        temp = await amendmentFormBasicInformation.inputAddressDebtor(AddressDebtor);
        logFailTestcase(temp, "Input AddressDebtor failed!");
    }
    if (PostcodeDebtor) {
        temp = await amendmentFormBasicInformation.inputPostcodeDebtor(PostcodeDebtor);
        logFailTestcase(temp, "Input PostcodeDebtor failed!");
    }
    if (CityDebtor) {
        temp = await amendmentFormBasicInformation.inputCityDebtor(CityDebtor);
        logFailTestcase(temp, "Input CityDebtor failed!");
    }
    if (OtherInformationDebtor) {
        temp = await amendmentFormBasicInformation.inputOtherInformationDebtor(OtherInformationDebtor);
        logFailTestcase(temp, "Input OtherInformationDebtor failed!");
    }
    //#endregion

    //#region Contact and Guarantee
    // Underlying contract
    if (TotalContractAmountUnderlying) {
        temp = await amendmentFormContractAndGuarantee.inputTotalContractAmountUnderlying(TotalContractAmountUnderlying);
        logFailTestcase(temp, "Input TotalContractAmountUnderlying failed!");
    }
    if (ContractReferenceUnderlying) {
        temp = await amendmentFormContractAndGuarantee.inputContractReferenceUnderlying(ContractReferenceUnderlying);
        logFailTestcase(temp, "Input ContractReferenceUnderlying failed!");
    }

    if (UnderlyingContractDocsUnderlying) {
        const docs = UnderlyingContractDocsUnderlying.split(";");
        for (const doc of docs) {
            const temp2 = __dirname;
            let UploadDocuments: string = "";

            if (!(__dirname.includes("jenkins") && !__dirname.includes(".jenkins"))){
                logInfoMessage("Runing on local...");
                UploadDocuments =
                    __dirname.substring(0, temp2.length - 66) + "\\" + doc.replace("/", "\\");
            }
            else {
                logInfoMessage("Running on jenkins...");
                UploadDocuments = __dirname.substring(0, temp2.length - 66) + "/" + doc.replace("\\", "/");
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

    // Guarantee
    if (EffectedDateMinusEndDate) {
        for (const iterator of dataTestcase) {
            if (iterator.nameField.localeCompare("EndDate") === 0) {
                EffectedDate = addDate(iterator.message[0], EffectedDateMinusEndDate);
            }
        }
    }
    if (EffectedDateMinusStartDate) {
        for (const iterator of dataTestcase) {
            if (iterator.nameField.localeCompare("StartDate") === 0) {
                EffectedDate = addDate(iterator.message[0], EffectedDateMinusStartDate);
            }
        }
    }
    if (NewStartDateMinusStartDate) {
        for (const iterator of dataTestcase) {
            if (iterator.nameField.localeCompare("StartDate") === 0) {
                PeriodStartGuarantee = addDate(iterator.message[0], NewStartDateMinusStartDate);
            }
        }
    }
    if (NewEndDateMinusEndDate) {
        for (const iterator of dataTestcase) {
            if (iterator.nameField.localeCompare("EndDate") === 0) {
                PeriodEndGuarantee = addDate(iterator.message[0], NewEndDateMinusEndDate);
            }
        }
    }

    if (NewEndDateMinusNewStartDate) {
        PeriodEndGuarantee = addDate(PeriodStartGuarantee, NewEndDateMinusNewStartDate);
    }

    if (NewStartDate2MinusNewEndDate) {
        PeriodStartGuaranteePhase2 = addDate(PeriodEndGuarantee, NewStartDate2MinusNewEndDate);
    }

    if (NewStartDate2MinusStartDate) {
        PeriodStartGuaranteePhase2 = addDate(PeriodStartGuarantee, NewStartDate2MinusStartDate);
    }

    if (NewStartDate2MinusStartDate2) {
        for (const iterator of dataTestcase) {
            if (iterator.nameField.localeCompare("StartDate2") === 0) {
                PeriodStartGuaranteePhase2 = addDate(iterator.message[0], NewStartDate2MinusStartDate2);
            }
        }
    }
    if (NewEndDate2MinusEndDate2) {
        let temp = "0";
        for (const iterator of dataTestcase) {
            if (iterator.nameField.localeCompare("EndDate2") === 0) {
                temp = iterator.message[0];
            }
        }
        PeriodEndGuaranteePhase2 = addDate(temp, NewEndDate2MinusEndDate2);
        dataTestcase.push(new ValidateField("NewEndDate2", 2, true, [PeriodEndGuaranteePhase2], []));
    }

    if (NewEndDate2MinusNewStartDate2) {
        PeriodEndGuaranteePhase2 = addDate(PeriodStartGuaranteePhase2, NewEndDate2MinusNewStartDate2);
        dataTestcase.push(new ValidateField("NewEndDate2", 2, true, [PeriodEndGuaranteePhase2], []));
    }

    if (EffectedDateMinusNewStartDate) {
        EffectedDate = addDate(PeriodStartGuarantee, EffectedDateMinusNewStartDate);
    }

    if (EffectedDateMinusToday) {
        EffectedDate = getDate(EffectedDateMinusToday);
    }

    if (EffectedDate) {
        temp = await amendmentFormContractAndGuarantee.inputEffectedDateGuarantee(EffectedDate);
        logFailTestcase(temp, "Input EffectedDate failed!");
    }
    let OldStartDate = "";
    for (const iterator of dataTestcase) {
        if (iterator.nameField.localeCompare("StartDate") === 0) {
            OldStartDate = iterator.message[0];
        }
    }

    let OldEndDate = "";
    for (const iterator of dataTestcase) {
        if (iterator.nameField.localeCompare("EndDate") === 0) {
            OldEndDate = iterator.message[0];
        }
    }
    dataTestcase.push(new ValidateField("NewEndDate", 3, true, [PeriodEndGuarantee || OldEndDate], []));
    dataTestcase.push(new ValidateField("NewStartDate", 2, true, [PeriodStartGuarantee || OldStartDate], []));
    //DISABLED periedStartGuarantee field so It can't input.
    // if (PeriodStartGuarantee) {
    //     temp = await amendmentFormContractAndGuarantee.inputPeriodStartGuarantee(PeriodStartGuarantee);
    //     logFailTestcase(temp, "Input PeriodStartGuarantee failed!");
    // }
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

    //#region Project Information
    if (NumberOfUnitsProjectInformation) {
        temp = await amendmentFormContractAndGuarantee.inputNumberOfUnitsProjectInformation(NumberOfUnitsProjectInformation);
        logFailTestcase(temp, "Input NumberOfUnitsProjectInformation failed!");
    }
    if (DateForCostEstimateProjectInformationMinusToday) {
        const DateForCostEstimateProjectInformation = getDate(DateForCostEstimateProjectInformationMinusToday);
        temp = await amendmentFormContractAndGuarantee.inputDateForCostEstimateProjectInformation(DateForCostEstimateProjectInformation);
        logFailTestcase(temp, "Input DateForCostEstimateProjectInformation failed!");
    }
    const rowsTemp = loader(convertPathFileDataToDataRegression(filename));

    for (let i = 0; i < rowsTemp.length && rowsTemp[i].StreetNameProjectInformation && rowsTemp[i].HouseNumberProjectInformation; i++) {
        logInfoMessage(`Amend Street name and House Number at line ${i + 1}`);

        temp = await amendmentFormContractAndGuarantee.inputStreetNameProjectInformation(rowsTemp[i].StreetNameProjectInformation, i + 1);
        logFailTestcase(temp, "Input Street name failed!");

        temp = await amendmentFormContractAndGuarantee.inputHouseNumberProjectInformation(rowsTemp[i].HouseNumberProjectInformation, i + 1);
        logFailTestcase(temp, "Input House name failed!");
    }
    //#endregion

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

    //#region Payment
    // Other fee
    if (AmendmentFee) {
        temp = await amendmentFormPayment.inputAmendmentFeeOther(AmendmentFee);
        logFailTestcase(temp, "Input AmendmentFee failed!");
    }

    //#endregion


    //#region Guarantor and Third Party
    // Guarantor
    if (GuarantorNameGuarantor) {
        temp = await amendmentFormGuarantorAndThirdParty.inputGuarantorNameGuarantor(GuarantorNameGuarantor);
        logFailTestcase(temp, "Input GuarantorNameGuarantor failed!");
    }
    if (VisitingAddressGuarantor) {
        temp = await amendmentFormGuarantorAndThirdParty.inputVisitingAddressGuarantor(VisitingAddressGuarantor);
        logFailTestcase(temp, "Input VisitingAddressGuarantor failed!");
    }
    if (PostcodeGuarantor) {
        temp = await amendmentFormGuarantorAndThirdParty.inputPostcodeGuarantor(PostcodeGuarantor);
        logFailTestcase(temp, "Input PostcodeGuarantor failed!");
    }
    if (CityGuarantor) {
        temp = await amendmentFormGuarantorAndThirdParty.inputCityGuarantor(CityGuarantor);
        logFailTestcase(temp, "Input CityGuarantor failed!");
    }
    if (GuaranteeIssuerGuarantor) {
        temp = await amendmentFormGuarantorAndThirdParty.inputGuaranteeIssuerGuarantor(GuaranteeIssuerGuarantor);
        logFailTestcase(temp, "Input GuaranteeIssuerGuarantor failed!");
    }
    if (OnBehalfOfTheGuarantorGuarantor) {
        temp = await amendmentFormGuarantorAndThirdParty.inputOnBehalfOfTheGuarantorGuarantor(OnBehalfOfTheGuarantorGuarantor);
        logFailTestcase(temp, "Input OnBehalfOfTheGuarantorGuarantor failed!");
    }
    if (FirmsNoGuarantor) {
        temp = await amendmentFormGuarantorAndThirdParty.inputFirmsNoGuarantor(FirmsNoGuarantor);
        logFailTestcase(temp, "Input FirmsNoGuarantor failed!");
    }
    if (PostAddressGuarantor) {
        temp = await amendmentFormGuarantorAndThirdParty.inputPostAddressGuarantor(PostAddressGuarantor);
        logFailTestcase(temp, "Input PostAddressGuarantor failed!");
    }
    if (PostZipCodeGuarantor) {
        temp = await amendmentFormGuarantorAndThirdParty.inputPostZipCodeGuarantor(PostZipCodeGuarantor);
        logFailTestcase(temp, "Input PostZipCodeGuarantor failed!");
    }
    if (PostCityGuarantor) {
        temp = await amendmentFormGuarantorAndThirdParty.inputPostCityGuarantor(PostCityGuarantor);
        logFailTestcase(temp, "Input PostCityGuarantor failed!");
    }
    if (EmailGuarantor) {
        temp = await amendmentFormGuarantorAndThirdParty.inputEmailGuarantor(EmailGuarantor);
        logFailTestcase(temp, "Input EmailGuarantor failed!");
    }
    if (PhoneNumberGuarantor) {
        temp = await amendmentFormGuarantorAndThirdParty.inputPhoneNumberGuarantor(PhoneNumberGuarantor);
        logFailTestcase(temp, "Input PhoneNumberGuarantor failed!");
    }

    // Third party
    if (CompanyNameThirdParty) {
        temp = await amendmentFormGuarantorAndThirdParty.inputCompanyNameThirdParty(CompanyNameThirdParty);
        logFailTestcase(temp, "Input CompanyNameThirdParty failed!");
    }
    if (AddressThirdParty) {
        temp = await amendmentFormGuarantorAndThirdParty.inputAddressThirdParty(AddressThirdParty);
        logFailTestcase(temp, "Input AddressThirdParty failed!");
    }
    if (PostcodeThirdParty) {
        temp = await amendmentFormGuarantorAndThirdParty.inputPostcodeThirdParty(PostcodeThirdParty);
        logFailTestcase(temp, "Input PostcodeThirdParty failed!");
    }
    if (CityThirdParty) {
        temp = await amendmentFormGuarantorAndThirdParty.inputCityThirdParty(CityThirdParty);
        logFailTestcase(temp, "Input CityThirdParty failed!");
    }
    if (PhoneNumberThirdParty) {
        temp = await amendmentFormGuarantorAndThirdParty.inputPhoneNumberThirdParty(PhoneNumberThirdParty);
        logFailTestcase(temp, "Input PhoneNumberThirdParty failed!");
    }
    if (FaxThirdParty) {
        temp = await amendmentFormGuarantorAndThirdParty.inputFaxThirdParty(FaxThirdParty);
        logFailTestcase(temp, "Input FaxThirdParty failed!");
    }
    if (EmailThirdParty) {
        temp = await amendmentFormGuarantorAndThirdParty.inputEmailThirdParty(EmailThirdParty);
        logFailTestcase(temp, "Input EmailThirdParty failed!");
    }
    if (WebsiteThirdParty) {
        temp = await amendmentFormGuarantorAndThirdParty.inputWebsiteThirdParty(WebsiteThirdParty);
        logFailTestcase(temp, "Input WebsiteThirdParty failed!");
    }
    //#endregion
    //#endregion

});

When("User calculates price on Create Amendment form {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    let temp = await amendmentFormPayment.pressCalculatePriceButtonOtherFee();
    await globalPageObject.waitForProgressBarLoaded();
    logFailTestcase(temp, "Press Calculate price failed!");
});

Then("System shows correct information at {string} amendment page {string}", async (pageName: string, filename) => {
    logInfoMessage(`Validate value at ${pageName} amendment page!`)
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    //#region Declare variables
    //BASICINFFORMATION
    const Type = row.Type;

    const ExpiryDateApplication = row.ExpiryDateApplication;
    const DescriptionGuarantee = row.DescriptionGuarantee;
    const IssuedDateGuarantee = row.IssuedDateGuarantee;

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


    const OrdererDebtor = row.OrdererDebtor;
    const OrganisationNumberDebtor = row.OrganisationNumberDebtor;
    const AddressDebtor = row.AddressDebtor;
    const PostcodeDebtor = row.PostcodeDebtor;
    const CityDebtor = row.CityDebtor;
    const OtherInformationDebtor = row.OtherInformationDebtor;


    //CONTRACT AND GUARANTEE
    let TotalContractAmountUnderlying = row.TotalContractAmountUnderlying;
    if (TotalContractAmountUnderlying) {
        TotalContractAmountUnderlying = numberToCurrency(currencyToNumber(row.TotalContractAmountUnderlying));
    }
    const ContractReferenceUnderlying = row.ContractReferenceUnderlying;
    const DateForSignedContract = row.DateForSignedContract; //new
    const UnderlyingContractDocsUnderlying = row.UnderlyingContractDocsUnderlying;
    const ProjectUnderlying = row.ProjectUnderlying;
    const ProjectNameUnderlying = row.ProjectNameUnderlying; //new
    const ProjectAddressUnderlying = row.ProjectAddressUnderlying; //new
    const ProjectDescriptionUnderlying = row.ProjectDescriptionUnderlying; //new
    const ContractCommitmentUnderlying = row.ContractCommitmentUnderlying;
    const GardsnummerUnderlying = row.GardsnummerUnderlying;
    const BruksnummerUnderlying = row.BruksnummerUnderlying;
    const KommuneUnderlying = row.KommuneUnderlying;


    const PeriodStartGuarantee = row.PeriodStartGuarantee;
    const PeriodEndGuarantee = row.PeriodEndGuarantee;
    const GuaranteeAmountGuarantee = numberToCurrency(currencyToNumber(row.GuaranteeAmountGuarantee));
    const GuaranteeRateGuarantee = row.GuaranteeRateGuarantee;
    const CommentGuarantee = row.CommentGuarantee;
    const RenewGuaranteeGuarantee = row.RenewGuaranteeGuarantee;

    //PAYMENT
    const GuaranteeFeeGuaranteeFee = row.GuaranteeFeeGuaranteeFee;
    const Commission = row.Commission; //new
    const EstablishmentFeeOtherFee = row.EstablishmentFeeOtherFee;


    //GUARANTOR AND THIRD PARTY
    const GuarantorNameGuarantor = row.GuarantorNameGuarantor;
    const VisitingAddressGuarantor = row.VisitingAddressGuarantor;
    const PostcodeGuarantor = row.PostcodeGuarantor;
    const CityGuarantor = row.CityGuarantor;
    const GuaranteeIssuerGuarantor = row.GuaranteeIssuerGuarantor;
    const OnBehalfOfTheGuarantorGuarantor = row.OnBehalfOfTheGuarantorGuarantor;
    const FirmsNoGuarantor = row.FirmsNoGuarantor;
    const PostAddressGuarantor = row.PostAddressGuarantor;
    const PostZipCodeGuarantor = row.PostZipCodeGuarantor;
    const PostCityGuarantor = row.PostCityGuarantor;
    const EmailGuarantor = row.EmailGuarantor;
    const PhoneNumberGuarantor = row.PhoneNumberGuarantor;


    const CompanyNameThirdParty = row.CompanyNameThirdParty;
    const AddressThirdParty = row.AddressThirdParty;
    const PostcodeThirdParty = row.PostcodeThirdParty;
    const CityThirdParty = row.CityThirdParty;
    const PhoneNumberThirdParty = row.PhoneNumberThirdParty;
    const FaxThirdParty = row.FaxThirdParty;
    const EmailThirdParty = row.EmailThirdParty;
    const WebsiteThirdParty = row.WebsiteThirdParty;


    const AmendmentFee = row.AmendmentFee;
    const AdditionalGuaranteeFee = row.AdditionalGuaranteeFee
    const AdditionalCommission = row.AdditionalCommission;

    //TWO PHASE
    let PeriodStartGuaranteePhase2 = "";
    let PeriodEndGuaranteePhase2 = "";
    let GuaranteeAmountGuaranteePhase2 = "";
    let GuaranteeRateGuaranteePhase2 = "";
    let CommentGuaranteePhase2 = "";

    let GuaranteeFeeGuaranteeFeePhase2 = "";
    let TotalGuaranteeFeeGuaranteeFee = "";
    let CommissionPhase2 = "";
    let TotalCommission = "";

    let AdditionalGuaranteeFeePhase2 = "";
    let TotalAdditionalGuaranteeFee = "";
    let AdditionalCommissionPhase2 = "";
    let TotalAdditionalCommission = "";



    if (Type && Type.localeCompare("Two Phases") === 0) {
        PeriodStartGuaranteePhase2 = row.PeriodStartGuaranteePhase2;
        PeriodEndGuaranteePhase2 = row.PeriodEndGuaranteePhase2;
        GuaranteeAmountGuaranteePhase2 = numberToCurrency(currencyToNumber(row.GuaranteeAmountGuaranteePhase2));
        GuaranteeRateGuaranteePhase2 = row.GuaranteeRateGuaranteePhase2;
        CommentGuaranteePhase2 = row.CommentGuaranteePhase2;

        GuaranteeFeeGuaranteeFeePhase2 = row.GuaranteeFeeGuaranteeFeePhase2;
        TotalGuaranteeFeeGuaranteeFee = row.TotalGuaranteeFeeGuaranteeFee;
        CommissionPhase2 = row.CommissionPhase2;
        TotalCommission = row.TotalCommission;

        AdditionalGuaranteeFeePhase2 = row.AdditionalGuaranteeFeePhase2;
        TotalAdditionalGuaranteeFee = row.TotalAdditionalGuaranteeFee;
        AdditionalCommissionPhase2 = row.AdditionalCommissionPhase2;
        TotalAdditionalCommission = row.TotalAdditionalCommission;

    }



    //#endregion

    let temp = true;
    //#region Issued Date
    if (IssuedDateGuarantee) {
        temp = await amendmentFormPreview.validateIssuedDate(IssuedDateGuarantee);
        logFailTestcase(temp);
    }
    //#endregion

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

    //#region Guarantee Issuer
    if (GuaranteeIssuerGuarantor) {
        temp = await amendmentFormPreview.validateGuaranteeIssuer(GuaranteeIssuerGuarantor);
        logFailTestcase(temp);
    }
    //#endregion

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
        temp = await amendmentFormPreview.validateUnderlyingContractTotalAmount(numberToCurrency(currencyToNumber(TotalContractAmountUnderlying), true));
        logFailTestcase(temp);
    }
    //#endregion

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

    //#region Phase - Time line
    if (Type && Type.localeCompare("One Phase") === 0) {
        if (PeriodStartGuarantee && PeriodEndGuarantee) {
            let periodEnd = RenewGuaranteeGuarantee ? "" : " - " + PeriodEndGuarantee;
            // Do những product tự động renew thì không có PeriodEnd (Product: Skattetrekksgaranti và Tollgaranti)

            temp = await amendmentFormPreview.validatePeriod(PeriodStartGuarantee + periodEnd);
            logFailTestcase(temp);
        }
        if (GuaranteeAmountGuarantee) {
            temp = await amendmentFormPreview.validateGuaranteeAmount(numberToCurrency(currencyToNumber(GuaranteeAmountGuarantee), true));
            logFailTestcase(temp);
        }
        if (AdditionalGuaranteeFee) {
            temp = await amendmentFormPreview.validateAdditionalGuaranteeFee(numberToCurrency(currencyToNumber(AdditionalGuaranteeFee), true));
            logFailTestcase(temp);
        }
        if (AdditionalCommission) {
            temp = await amendmentFormPreview.validateAdditionalCommission(numberToCurrency(currencyToNumber(AdditionalCommission), true));
            logFailTestcase(temp);
        }
        if (AmendmentFee) {
            temp = await amendmentFormPreview.validateAmendmentFee(numberToCurrency(currencyToNumber(AmendmentFee), true));
            logFailTestcase(temp);
        }
    } else {
        if (PeriodStartGuarantee && PeriodEndGuarantee) {
            temp = await amendmentFormPreview.validatePeriodPhase1("Period: " + PeriodStartGuarantee + " - " + PeriodEndGuarantee);
            logFailTestcase(temp);
        }
        if (PeriodStartGuaranteePhase2 && PeriodEndGuaranteePhase2) {
            temp = await amendmentFormPreview.validatePeriodPhase2("Period: " + PeriodStartGuaranteePhase2 + " - " + PeriodEndGuaranteePhase2);
            logFailTestcase(temp);
        }
        if (GuaranteeAmountGuarantee) {
            temp = await amendmentFormPreview.validateGuaranteeAmountPhase1(numberToCurrency(currencyToNumber(GuaranteeAmountGuarantee), true));
            logFailTestcase(temp);
        }
        if (GuaranteeAmountGuaranteePhase2) {
            temp = await amendmentFormPreview.validateGuaranteeAmountPhase2(numberToCurrency(currencyToNumber(GuaranteeAmountGuaranteePhase2), true));
            logFailTestcase(temp);
        }
        if (AdditionalGuaranteeFee) {
            temp = await amendmentFormPreview.validateAdditionalGuaranteeFeePhase1(numberToCurrency(currencyToNumber(AdditionalGuaranteeFee), true));
            logFailTestcase(temp);
        }
        if (AdditionalGuaranteeFeePhase2) {
            temp = await amendmentFormPreview.validateAdditionalGuaranteeFeePhase2(numberToCurrency(currencyToNumber(AdditionalGuaranteeFeePhase2), true));
            logFailTestcase(temp);
        }
        if (TotalAdditionalGuaranteeFee) {
            temp = await amendmentFormPreview.validateAdditionalGuaranteeFee(numberToCurrency(currencyToNumber(TotalAdditionalGuaranteeFee), true));
            logFailTestcase(temp);
        }
        if (AdditionalCommission) {
            temp = await amendmentFormPreview.validateAdditionalCommissionPhase1(numberToCurrency(currencyToNumber(AdditionalCommission), true));
            logFailTestcase(temp);
        }
        if (AdditionalCommissionPhase2) {
            temp = await amendmentFormPreview.validateAdditionalCommissionPhase2(numberToCurrency(currencyToNumber(AdditionalCommissionPhase2), true));
            logFailTestcase(temp);
        }
        if (TotalAdditionalCommission) {
            temp = await amendmentFormPreview.validateAdditionalCommission(numberToCurrency(currencyToNumber(TotalAdditionalCommission), true));
            logFailTestcase(temp);
        }
        if (AmendmentFee) {
            temp = await amendmentFormPreview.validateAmendmentFee(numberToCurrency(currencyToNumber(AmendmentFee), true));
            logFailTestcase(temp);
        }
    }

    //#endregion
});

Then("User verifies timeline at Create Amendment form {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    //#region Declare variables
    //BASICINFFORMATION
    const Type = row.Type;

    //CONTRACT AND GUARANTEE
    let TotalContractAmountUnderlying = row.TotalContractAmountUnderlying;
    if (TotalContractAmountUnderlying) {
        TotalContractAmountUnderlying = numberToCurrency(currencyToNumber(row.TotalContractAmountUnderlying));
    }

    const PeriodStartGuarantee = row.PeriodStartGuarantee;
    const PeriodEndGuarantee = row.PeriodEndGuarantee;
    const GuaranteeAmountGuarantee = numberToCurrency(currencyToNumber(row.GuaranteeAmountGuarantee));
    const RenewGuaranteeGuarantee = row.RenewGuaranteeGuarantee;

    const AmendmentFee = row.AmendmentFee;
    const AdditionalGuaranteeFee = row.AdditionalGuaranteeFee
    const AdditionalCommission = row.AdditionalCommission;

    //TWO PHASE
    let PeriodStartGuaranteePhase2 = "";
    let PeriodEndGuaranteePhase2 = "";
    let GuaranteeAmountGuaranteePhase2 = "";
    let GuaranteeRateGuaranteePhase2 = "";
    let CommentGuaranteePhase2 = "";

    let GuaranteeFeeGuaranteeFeePhase2 = "";
    let TotalGuaranteeFeeGuaranteeFee = "";
    let CommissionPhase2 = "";
    let TotalCommission = "";

    let AdditionalGuaranteeFeePhase2 = "";
    let TotalAdditionalGuaranteeFee = "";
    let AdditionalCommissionPhase2 = "";
    let TotalAdditionalCommission = "";



    if (Type && Type.localeCompare("Two Phases") === 0) {
        PeriodStartGuaranteePhase2 = row.PeriodStartGuaranteePhase2;
        PeriodEndGuaranteePhase2 = row.PeriodEndGuaranteePhase2;
        GuaranteeAmountGuaranteePhase2 = numberToCurrency(currencyToNumber(row.GuaranteeAmountGuaranteePhase2));
        GuaranteeRateGuaranteePhase2 = row.GuaranteeRateGuaranteePhase2;
        CommentGuaranteePhase2 = row.CommentGuaranteePhase2;

        GuaranteeFeeGuaranteeFeePhase2 = row.GuaranteeFeeGuaranteeFeePhase2;
        TotalGuaranteeFeeGuaranteeFee = row.TotalGuaranteeFeeGuaranteeFee;
        CommissionPhase2 = row.CommissionPhase2;
        TotalCommission = row.TotalCommission;

        AdditionalGuaranteeFeePhase2 = row.AdditionalGuaranteeFeePhase2;
        TotalAdditionalGuaranteeFee = row.TotalAdditionalGuaranteeFee;
        AdditionalCommissionPhase2 = row.AdditionalCommissionPhase2;
        TotalAdditionalCommission = row.TotalAdditionalCommission;

    }



    //#endregion

    let temp = true;
    //#region Phase - Time line
    if (Type && Type.localeCompare("One Phase") === 0) {
        if (PeriodStartGuarantee && PeriodEndGuarantee) {
            let periodEnd = RenewGuaranteeGuarantee ? "" : " - " + PeriodEndGuarantee;
            // Do những product tự động renew thì không có PeriodEnd (Product: Skattetrekksgaranti và Tollgaranti)

            temp = await amendmentFormPreview.validatePeriod(PeriodStartGuarantee + periodEnd);
            logFailTestcase(temp);
        }
        if (GuaranteeAmountGuarantee) {
            temp = await amendmentFormPreview.validateGuaranteeAmount(numberToCurrency(currencyToNumber(GuaranteeAmountGuarantee), true));
            logFailTestcase(temp);
        }
        if (AdditionalGuaranteeFee) {
            temp = await amendmentFormPreview.validateAdditionalGuaranteeFee(numberToCurrency(currencyToNumber(AdditionalGuaranteeFee), true));
            logFailTestcase(temp);
        }
        if (AdditionalCommission) {
            temp = await amendmentFormPreview.validateAdditionalCommission(numberToCurrency(currencyToNumber(AdditionalCommission), true));
            logFailTestcase(temp);
        }
        if (AmendmentFee) {
            temp = await amendmentFormPreview.validateAmendmentFee(numberToCurrency(currencyToNumber(AmendmentFee), true));
            logFailTestcase(temp);
        }
    } else {
        if (PeriodStartGuarantee && PeriodEndGuarantee) {
            temp = await amendmentFormPreview.validatePeriodPhase1("Period: " + PeriodStartGuarantee + " - " + PeriodEndGuarantee);
            logFailTestcase(temp);
        }
        if (PeriodStartGuaranteePhase2 && PeriodEndGuaranteePhase2) {
            temp = await amendmentFormPreview.validatePeriodPhase2("Period: " + PeriodStartGuaranteePhase2 + " - " + PeriodEndGuaranteePhase2);
            logFailTestcase(temp);
        }
        if (GuaranteeAmountGuarantee) {
            temp = await amendmentFormPreview.validateGuaranteeAmountPhase1(numberToCurrency(currencyToNumber(GuaranteeAmountGuarantee), true));
            logFailTestcase(temp);
        }
        if (GuaranteeAmountGuaranteePhase2) {
            temp = await amendmentFormPreview.validateGuaranteeAmountPhase2(numberToCurrency(currencyToNumber(GuaranteeAmountGuaranteePhase2), true));
            logFailTestcase(temp);
        }
        if (AdditionalGuaranteeFee) {
            temp = await amendmentFormPreview.validateAdditionalGuaranteeFeePhase1(numberToCurrency(currencyToNumber(AdditionalGuaranteeFee), true));
            logFailTestcase(temp);
        }
        if (AdditionalGuaranteeFeePhase2) {
            temp = await amendmentFormPreview.validateAdditionalGuaranteeFeePhase2(numberToCurrency(currencyToNumber(AdditionalGuaranteeFeePhase2), true));
            logFailTestcase(temp);
        }
        if (TotalAdditionalGuaranteeFee) {
            temp = await amendmentFormPreview.validateAdditionalGuaranteeFee(numberToCurrency(currencyToNumber(TotalAdditionalGuaranteeFee), true));
            logFailTestcase(temp);
        }
        if (AdditionalCommission) {
            temp = await amendmentFormPreview.validateAdditionalCommissionPhase1(numberToCurrency(currencyToNumber(AdditionalCommission), true));
            logFailTestcase(temp);
        }
        if (AdditionalCommissionPhase2) {
            temp = await amendmentFormPreview.validateAdditionalCommissionPhase2(numberToCurrency(currencyToNumber(AdditionalCommissionPhase2), true));
            logFailTestcase(temp);
        }
        if (TotalAdditionalCommission) {
            temp = await amendmentFormPreview.validateAdditionalCommission(numberToCurrency(currencyToNumber(TotalAdditionalCommission), true));
            logFailTestcase(temp);
        }
        if (AmendmentFee) {
            temp = await amendmentFormPreview.validateAmendmentFee(numberToCurrency(currencyToNumber(AmendmentFee), true));
            logFailTestcase(temp);
        }
    }
    //#endregion
});

Then("System changes status of the guarantee to {string} at gurantee list", async (status: string) => {
    await globalPageObject.reloadTable(7000);
    await globalPageObject.waitForProgressBarLoaded_v2();
    let temp = await guaranteeList.validateStatusValueOnList(status, 1, true);
    logFailTestcase(temp, `System changes ${status} status of the application failed`);
});


Then("System shows tabs on Guarantee details form {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const NameOfColumns = rows[0].NameOfColumns.split(";");
    for (const columnName of NameOfColumns) {
        const temp = await guaranteeDetailFormOriginalGuarantee.checkTabExistOnGuaranteeDetailForm(columnName);
        logFailTestcase(temp, `Not found tab "${columnName}" `);
        logSuccessMessage(`Verify tab "${columnName}" : passed!`);
    }
});

Then("System shows correct information at detail guarantee page tab Amendments column Amendments History {string}", async (filename) => {
    let temp = await guaranteeDetailFormAmendments.navigiateToAmendmentsTabInGuaranteeForm();
    await globalPageObject.waitForProgressBarLoaded_v2();
    logFailTestcase(temp, "Navigate to Amendments tab failed! ");

    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    let guaranteeVersion = row.GuaranteeVersion;
    let createdDate = row.CreatedDate;
    let tagName = row.TagName;
    const RenewGuaranteeGuarantee = row.RenewGuaranteeGuarantee;

    // For product has Renew feature (Skattetrekksgaranti)
    if (RenewGuaranteeGuarantee && RenewGuaranteeGuarantee.localeCompare("Yes") === 0) {
        let GuaranteeNo = getValueDataOfDataTestExecution("Guarantee No");
        let PeriodEndBackDated = getValueDataOfDataTestExecution("PeriodEndBackDated");
        createdDate = addDate(PeriodEndBackDated, 1);
        guaranteeVersion = GuaranteeNo + "/0001";
    }

    logInfoMessage("1........" + guaranteeVersion);
    logInfoMessage("2........" + createdDate);
    logInfoMessage("3........" + tagName);

    if (guaranteeVersion) {
        temp = await guaranteeDetailFormAmendments.validateValueGuaranteeVersionOnAmendmentHistory(guaranteeVersion, 1, true);
        logFailTestcase(temp, "Incorrect Guarantee version");
    }

    if (createdDate) {
        temp = await guaranteeDetailFormAmendments.validateValueCreatedDateOnAmendmentHistory("Created date: " + createdDate);
        logFailTestcase(temp, "Incorrect Created date");
    }

    if (tagName) {
        temp = await guaranteeDetailFormAmendments.validateValueTagNameOnAmendmentHistory(tagName);
        logFailTestcase(temp, "Incorrect Tag Name");
    }
});
Given('User waits until the system generates whole guarantees from excel file {string}', async function (filename) {

    await loader_xlsx(filename).then(async (rows) => {
        // const rows = loader_xlsx.readFile(filename);

        let TotalOriginalrecord = 0;
        for (const interator of dataTestcase) {
            if (interator.nameField.localeCompare("Total original guarantee record") === 0) {
                TotalOriginalrecord = interator.index;
            }
        }

        let TotalRecordActual = 0;

        for (let i = 0; i < 20; i++) {
            await globalPageObject.waitForSeconds(2000);
            TotalRecordActual = await globalPageObject.getNumberOfTotalRecordsSubTab();
            let TheNumberOfRecordActual = TotalRecordActual - TotalOriginalrecord;
            if (TheNumberOfRecordActual < rows.length - 1) {
                logWarningMessage(`Total records generated : ${TheNumberOfRecordActual}, please waiting Total records reach to ${rows.length - 1}`);
                logInfoMessage("waiting for 5s...");
                await globalPageObject.reloadTable();
                await globalPageObject.waitForSeconds(5000);
            } else if (TheNumberOfRecordActual == 0 && i > 10) {
                logFailTestcase(false, `System does not generate guarantees on list!`);
            }
            else {
                logSuccessMessage(`Total records generated : ${TheNumberOfRecordActual}`);
                break;
            }

        }

    });
})

function getFileNames(link: string) {
    try {
        let array = link.split("/");
        let fileName = array[array.length - 1];
        return fileName;
    } catch (error) {
        console.log("getFileNames");
        console.log(error);
    }
}

Then("System shows correct informations of multiple guarantee at guarantee list {string}", async (filename) => {
    let temp = true;
    await globalPageObject.expandNumberOfItemSubList();
    await loader_xlsx(filename).then(async (rows) => {
        for (let i = rows.length - 1; i > 0; i--) {
            logWarningMessage(`Validating data at line ${i} on excel file.................`);

            const BeneficiaryBeneficiary = rows[i][rows[0].indexOf("Beneficiary")];
            const OrgNrBeneficiary = rows[i][rows[0].indexOf("Beneficiary Organisation")];
            const DateOfBirthBeneficiary = ExcelDateToJSDate(rows[i][rows[0].indexOf("Beneficiary DOB")]);
            const AddressBeneficiary = rows[i][rows[0].indexOf("Beneficiary Address")];
            const PostcodeBeneficiary = rows[i][rows[0].indexOf("Beneficiary ZipCode")];
            const CityBeneficiary = rows[i][rows[0].indexOf("Beneficiary City")];
            const Beneficiary2Beneficiary = rows[i][rows[0].indexOf("Beneficiary 2")];
            const OrgNr2Beneficiary = rows[i][rows[0].indexOf("Beneficiary Organisation 2")];
            const DateOfBirth2Beneficiary = ExcelDateToJSDate(rows[i][rows[0].indexOf("Beneficiary DOB 2")]);
            const Address2Beneficiary = rows[i][rows[0].indexOf("Beneficiary Address 2")];
            const Postcode2Beneficiary = rows[i][rows[0].indexOf("Beneficiary ZipCode 2")];
            const City2Beneficiary = rows[i][rows[0].indexOf("Beneficiary City 2")];


            const TotalContractAmountUnderlying = rows[i][rows[0].indexOf("Contract Amount")];
            const ContractReferenceUnderlying = rows[i][rows[0].indexOf("Contract no.")];
            const ContractStartDateUnderlying = ExcelDateToJSDate(rows[i][rows[0].indexOf("Contract Date")]);
            const ContractCommitmentUnderlying = rows[i][rows[0].indexOf("Contract Commitment")];
            const GardsnummerUnderlying = rows[i][rows[0].indexOf("Gardsnummer")];
            const BruksnummerUnderlying = rows[i][rows[0].indexOf("Bruksnummer")];
            const DistrictUnderlying = rows[i][rows[0].indexOf("District")];
            const PeriodStartGuarantee = ExcelDateToJSDate(rows[i][rows[0].indexOf("First Phase Period Start Date")]);
            const PeriodEndGuarantee = ExcelDateToJSDate(rows[i][rows[0].indexOf("First Phase Period End Date")]);
            const PeriodStartGuaranteePhase2 = addDate(PeriodEndGuarantee, 1);
            const PeriodEndGuaranteePhase2 = ExcelDateToJSDate(rows[i][rows[0].indexOf("Second Phase End")]);
            let GuaranteeRateGuarantee = rows[i][rows[0].indexOf("First Phase Guarantee Rate")];
            const GuaranteeRateGuaranteePhase2 = rows[i][rows[0].indexOf("Second Phase Guarantee Rate")];
            let UnderlyingContractDocsUnderlying = rows[i][rows[0].indexOf("Underlying Contract Documents")];
            if (UnderlyingContractDocsUnderlying) {
                UnderlyingContractDocsUnderlying = getFileNames(UnderlyingContractDocsUnderlying);
            }

            const IssuedDate = getDate();


            let CurrentPhase = (PeriodStartGuarantee ? PeriodStartGuarantee : "") + (PeriodEndGuarantee ? ' - ' + PeriodEndGuarantee : "");
            for (let j = 1; j < rows.length; j++) {
                // logInfoMessage(`Checking info at line ${j} ...`);
                let temp2 = await guaranteeList.findContactCommitmentValueOnList(ContractCommitmentUnderlying, j);
                if (temp2) {
                    //#region Valdate value on guarantee list

                    temp = await guaranteeList.validateContactCommitmentValueOnList(ContractCommitmentUnderlying, j);
                    logFailTestcase(temp);

                    temp = await guaranteeList.validateGuaranteeIssuedDateValueOnList(IssuedDate, j);
                    logFailTestcase(temp);

                    temp = await guaranteeList.validateBeneficiaryValueOnList(BeneficiaryBeneficiary, j);
                    logFailTestcase(temp);

                    // Tính xem today có nằm trong khoản start date và end date hay không?
                    if (CurrentPhase) {
                        logInfoMessage("Start: " + PeriodStartGuarantee);
                        logInfoMessage("End: " + PeriodEndGuarantee);
                        logInfoMessage("Current phase: " + CurrentPhase);
                        let PeriodStartGuaranteeTemp = new Date(parseInt(PeriodStartGuarantee.substring(6, 10)), parseInt(PeriodStartGuarantee.substring(3, 5)), parseInt(PeriodStartGuarantee.substring(0, 2)));
                        let PeriodEndGuaranteeTemp = new Date(parseInt(PeriodEndGuarantee.substring(6, 10)), parseInt(PeriodEndGuarantee.substring(3, 5)), parseInt(PeriodEndGuarantee.substring(0, 2)));
                        let today = new Date(parseInt(getDate().substring(6, 10)), parseInt(getDate().substring(3, 5)), parseInt(getDate().substring(0, 2)));

                        // Nếu today không nằm giữa start date và end date
                        if (!(compareDesc(PeriodStartGuaranteeTemp, today) >= 0 && compareDesc(today, PeriodEndGuaranteeTemp) >= 0)) {
                            CurrentPhase = "N/A - N/A";
                            GuaranteeRateGuarantee = "";
                        }
                        temp = await guaranteeList.validateCurrentPhaseValueOnList(CurrentPhase, j);
                        logFailTestcase(temp);
                    }

                    if (GuaranteeRateGuarantee) {
                        temp = await guaranteeList.validateGuaranteeRateValueOnList(GuaranteeRateGuarantee, j);
                        logFailTestcase(temp);
                    }
                    //#endregion


                    //#region Validate value on guarantee detail pages (check on 6 records)
                    if (i > 14) {
                        temp = await guaranteeList.openGuaranteeByRowInGuaranteeList(j);
                        logFailTestcase(temp, `Open Guarantee detail page on row ${j} failed!`);
                        await globalPageObject.waitForProgressBarLoaded_v2();
                        await globalPageObject.waitForProgressBarLoaded_v2();
                        //#region Validate period on Timeline
                        //product 1 phase
                        if (PeriodEndGuaranteePhase2.localeCompare("NaN/NaN/NaN") === 0) {
                            temp = await guaranteeDetailFormOriginalGuarantee.validatePeriod(PeriodStartGuarantee + " - " + PeriodEndGuarantee);
                            logFailTestcase(temp);
                        }
                        //product 2 phases
                        else {
                            temp = await guaranteeDetailFormOriginalGuarantee.validatePeriodPhase1("Period: " + PeriodStartGuarantee + " - " + PeriodEndGuarantee);
                            logFailTestcase(temp);

                            temp = await guaranteeDetailFormOriginalGuarantee.validatePeriodPhase2("Period: " + PeriodStartGuaranteePhase2 + " - " + PeriodEndGuaranteePhase2);
                            logFailTestcase(temp);
                        }
                        //#endregion

                        //#region Beneficiary
                        if (BeneficiaryBeneficiary) {
                            temp = await guaranteeDetailFormOriginalGuarantee.validateBeneficiaryName(BeneficiaryBeneficiary);
                            logFailTestcase(temp);
                        }
                        if (OrgNrBeneficiary) {
                            temp = await guaranteeDetailFormOriginalGuarantee.validateBeneficiaryOrgNr("Org.nr.: " + OrgNrBeneficiary);
                            logFailTestcase(temp);
                        }
                        if (!OrgNrBeneficiary) {
                            temp = await guaranteeDetailFormOriginalGuarantee.validateBeneficiaryDOB("DOB: " + DateOfBirthBeneficiary);
                            logFailTestcase(temp);
                        }
                        if (AddressBeneficiary) {
                            temp = await guaranteeDetailFormOriginalGuarantee.validateBeneficiaryAddress(AddressBeneficiary);
                            logFailTestcase(temp);
                        }
                        if (PostcodeBeneficiary) {
                            temp = await guaranteeDetailFormOriginalGuarantee.validateBeneficiaryPostcode(PostcodeBeneficiary);
                            logFailTestcase(temp);
                        }
                        if (CityBeneficiary) {
                            temp = await guaranteeDetailFormOriginalGuarantee.validateBeneficiaryCity(CityBeneficiary);
                            logFailTestcase(temp);
                        }
                        //#endregion

                        //#region Beneficiary 2
                        if (Beneficiary2Beneficiary) {
                            temp = await guaranteeDetailFormOriginalGuarantee.validateBeneficiary2Name(Beneficiary2Beneficiary);
                            logFailTestcase(temp);
                        }
                        if (OrgNr2Beneficiary) {
                            temp = await guaranteeDetailFormOriginalGuarantee.validateBeneficiary2OrgNr("Org.nr.: " + OrgNr2Beneficiary);
                            logFailTestcase(temp);
                        }
                        if (!OrgNr2Beneficiary && DateOfBirth2Beneficiary) {
                            temp = await guaranteeDetailFormOriginalGuarantee.validateBeneficiary2DOB("DOB: " + DateOfBirth2Beneficiary);
                            logFailTestcase(temp);
                        }
                        if (Address2Beneficiary) {
                            temp = await guaranteeDetailFormOriginalGuarantee.validateBeneficiary2Address(Address2Beneficiary);
                            logFailTestcase(temp);
                        }
                        if (Postcode2Beneficiary) {
                            temp = await guaranteeDetailFormOriginalGuarantee.validateBeneficiary2Postcode(Postcode2Beneficiary);
                            logFailTestcase(temp);
                        }
                        if (City2Beneficiary) {
                            temp = await guaranteeDetailFormOriginalGuarantee.validateBeneficiary2City(City2Beneficiary);
                            logFailTestcase(temp);
                        }
                        //#endregion
                        //#region Underlying Contract
                        if (ContractReferenceUnderlying) {
                            temp = await guaranteeDetailFormOriginalGuarantee.validateUnderlyingContractReference(ContractReferenceUnderlying);
                            logFailTestcase(temp);
                        }
                        if (ContractCommitmentUnderlying) {
                            temp = await guaranteeDetailFormOriginalGuarantee.validateUnderlyingContractCommitment(ContractCommitmentUnderlying);
                            logFailTestcase(temp);
                        }

                        if (GardsnummerUnderlying) {
                            temp = await guaranteeDetailFormOriginalGuarantee.validateUnderlyingContractGardsnummer("GNR " + GardsnummerUnderlying);
                            logFailTestcase(temp);
                        }
                        if (BruksnummerUnderlying) {
                            temp = await guaranteeDetailFormOriginalGuarantee.validateUnderlyingContractBruksnummer("BNR " + BruksnummerUnderlying);
                            logFailTestcase(temp);
                        }
                        if (DistrictUnderlying) {
                            temp = await guaranteeDetailFormOriginalGuarantee.validateUnderlyingDistrict(DistrictUnderlying);
                            logFailTestcase(temp);
                        }

                        if (TotalContractAmountUnderlying) {
                            temp = await guaranteeDetailFormOriginalGuarantee.validateUnderlyingContractTotalAmount(numberToCurrency(TotalContractAmountUnderlying, true));
                            logFailTestcase(temp);
                        }
                        if (ContractStartDateUnderlying) {
                            temp = await guaranteeDetailFormOriginalGuarantee.validateUnderlyingContractStartDate(ContractStartDateUnderlying);
                            logFailTestcase(temp);
                        }
                        //#endregion

                        //region validate document on guarantee form
                        if (UnderlyingContractDocsUnderlying) {
                            let uploadedDate = getCurrentDateTime();
                            temp = await accountTabDocumentListGuarantee.navigateToDocumentTabInDetailForm();
                            logFailTestcase(temp, "Navigate to Documents tab failed !");
                            await globalPageObject.waitForProgressBarLoaded_v2();
                            await globalPageObject.waitForProgressBarLoaded_v2();
                            let TotalRecord = await accountTabDocumentListGuarantee.getNumberOfTotalRecordsInDocumentTabDetailForm();
                            temp = await accountTabDocumentListGuarantee.assertDocumentInDetailForm(
                                UnderlyingContractDocsUnderlying,
                                uploadedDate,
                                "Underlying contract",
                                TotalRecord
                            );
                            logFailTestcase(temp, "assert Document in Guarantee detail form failed!");
                        }
                        //#endregion

                        await globalPageObject.closeOpeningForm();

                    }
                    //#endregion

                    break;

                } else if (temp2 == false && j == rows.length - 1) {
                    logFailTestcase(temp2, `Can not find the guarantee which has "${ContractCommitmentUnderlying}" contract commitment`);
                    break;
                }
            }
        }
    });

})

When("User saves some guarantee information to csv file {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    let FrameAgreemtNo = row.FrameAgreementNo;
    let ApplicationNo = row.ApplicationNo;
    let GuaranteeNo = row.GuaranteeNo;
    const SavedInformationFile = row.SavedInformationFile;

    let IDList = {
        FrameAgreemtNo: "",
        ApplicationNo: "",
        GuaranteeNo: "",
    };
    let temp = true;

    if (scenarioTags.has('@CustomerPortalHogs') || scenarioTags.has('@CustomerPortalAtlas')) {

        if (FrameAgreemtNo) {
            temp = await appNavigationCP.pressApplicationsButton();
            logFailTestcase(temp, "Navigate to Applications list failed!");
            FrameAgreemtNo = await applicationList.getValueFrameAgmtNoOnList();
            pushObjectToDataArrayWithUniqueKey("Frame Agmt No", FrameAgreemtNo);
        }

        if (ApplicationNo) {
            temp = await appNavigationCP.pressApplicationsButton();
            logFailTestcase(temp, "Navigate to Applications list failed!");
            ApplicationNo = await applicationList.getValueApplicationNoOnList();
            pushObjectToDataArrayWithUniqueKey("Application No", ApplicationNo);
        }
        if (GuaranteeNo) {
            temp = await appNavigationCP.pressGuaranteesButton();
            logFailTestcase(temp, "Navigate to Guarantees list failed!");
            GuaranteeNo = await guaranteeList.getValueGuaranteeNoOnList();
            pushObjectToDataArrayWithUniqueKey("Guarantee No", GuaranteeNo);
        }

    }
    else {
        if (FrameAgreemtNo) {
            temp = await globalPageObject.navigateToSubFrameAgreements()
            logFailTestcase(temp, "Navigate to Frame Agreements list failed!");
            FrameAgreemtNo = await frameAgreementList.getFrameAgreementNoByRow();
            pushObjectToDataArrayWithUniqueKey("Frame Agmt No", FrameAgreemtNo);
        }

        if (ApplicationNo) {
            temp = await globalPageObject.navigateToSubApplications();
            logFailTestcase(temp, "Navigate to Applications list failed!");
            ApplicationNo = await applicationList.getValueApplicationNoOnList();
            pushObjectToDataArrayWithUniqueKey("Application No", ApplicationNo);
        }
        if (GuaranteeNo) {
            temp = await globalPageObject.navigateToSubGuarantees();
            logFailTestcase(temp, "Navigate to Guarantees list failed!");
            GuaranteeNo = await guaranteeList.getValueGuaranteeNoOnList();
            pushObjectToDataArrayWithUniqueKey("Guarantee No", GuaranteeNo);
        }
    }

    IDList.FrameAgreemtNo = FrameAgreemtNo;
    IDList.ApplicationNo = ApplicationNo;
    IDList.GuaranteeNo = GuaranteeNo;

    if (SavedInformationFile) {
        const storeData = (data, path) => {
            try {
                fs.writeFileSync(path, JSON.stringify(data), { flag: "w" });
            } catch (error) {
                console.error(error);
            }
        }
        storeData(IDList, SavedInformationFile);
    }


});

Then("System does not show the guarantee in guarantee list {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    let GuaranteeNo = row.GuaranteeNo;
    const SavedInformationFile = row.SavedInformationFile;
    let temp = true;

    if (GuaranteeNo) {
        const app = require("../../../../." + SavedInformationFile);
        console.log(app);
        GuaranteeNo = app.GuaranteeNo;
    }

    await globalPageObject.reloadTable(3000);

    if (scenarioTags.has("@CustomerPortalHogs") || scenarioTags.has("@CustomerPortalAtlas")) {
        if (await globalItemPage.getNumberOfTotalRecordsMainTab() != 0) {
            temp = await guaranteeList.validateGuaranteeNameValueOnList(GuaranteeNo);
            logFailTestcase(!temp, "System still shows the guarantee in guarantee list");
        }
    }

    else {
        if (await globalPageObject.getNumberOfTotalRecordsSubTab() != 0) {
            temp = await guaranteeList.validateGuaranteeNoOnGuaranteeList(GuaranteeNo);
            logFailTestcase(!temp, "System still shows the guarantee in guarantee list");
        }
    }

});

When("User stores the guarantee - Quarterly 1 phase - All instalment are new to Data Test Execution {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    let GuaranteeNo = "Guarantee No";
    for (const iterator of dataTestcase) {
        if (iterator.nameField.localeCompare("Guarantee No") === 0) {
            GuaranteeNo = iterator.message[0];
        }
    }
    const url = await globalBrowserWindowHandle.getCurrentUrl();

    const StartDateMinusToday = rows[0].StartDateMinusToday;
    const EndDateMinusStartDate = rows[0].EndDateMinusStartDate;
    const StartDate = getDate(StartDateMinusToday);
    const EndDate = addDate(StartDate, EndDateMinusStartDate);
    const EndDateMinusToday = parseInt(StartDateMinusToday) + parseInt(EndDateMinusStartDate);
    const NewStartDate = getDate(EndDateMinusToday + 1);
    const NewEndDate = addDate(NewStartDate, parseInt(EndDateMinusStartDate));

    pushObjectToDataArrayWithUniqueKey("Guarantee No", GuaranteeNo);
    pushObjectToDataArrayWithUniqueKey("url", url);
    pushObjectToDataArrayWithUniqueKey("StartDate", StartDate);
    pushObjectToDataArrayWithUniqueKey("EndDate", EndDate);
    pushObjectToDataArrayWithUniqueKey("NewStartDate", NewStartDate);
    pushObjectToDataArrayWithUniqueKey("NewEndDate", NewEndDate);
});


When("User stores the guarantee to Data Test Execution {string}", async (filename) => {
    // const rows = loader(convertPathFileDataToDataRegression(filename));
    let GuaranteeNo = "Guarantee No";
    let FrameAgmtNo = "Frame Agmt No";
    let ApplicationNo = "Application No";
    let Product = "Product";
    let PeriodStartBackDated = "PeriodStartBackDated";
    let PeriodEndBackDated = "PeriodEndBackDated";
    for (const iterator of dataTestcase) {
        if (iterator.nameField.localeCompare("Guarantee No") === 0) {
            GuaranteeNo = iterator.message[0];
        }
        if (iterator.nameField.localeCompare("Frame Agmt No") === 0) {
            FrameAgmtNo = iterator.message[0];
        }
        if (iterator.nameField.localeCompare("Application No") === 0) {
            ApplicationNo = iterator.message[0];
        }
        if (iterator.nameField.localeCompare("Product") === 0) {
            Product = iterator.message[0];
        }
        if (iterator.nameField.localeCompare("PeriodStartBackDated") === 0) {
            PeriodStartBackDated = iterator.message[0];
        }
        if (iterator.nameField.localeCompare("PeriodEndBackDated") === 0) {
            PeriodEndBackDated = iterator.message[0];
        }
    }
    const url = await globalBrowserWindowHandle.getCurrentUrl();

    pushObjectToDataArrayWithUniqueKey("Guarantee No", GuaranteeNo);
    pushObjectToDataArrayWithUniqueKey("Frame Agmt No", FrameAgmtNo);
    pushObjectToDataArrayWithUniqueKey("Application No", ApplicationNo);
    pushObjectToDataArrayWithUniqueKey("Product", Product);
    pushObjectToDataArrayWithUniqueKey("PeriodStartBackDated", PeriodStartBackDated);
    pushObjectToDataArrayWithUniqueKey("PeriodEndBackDated", PeriodEndBackDated);
    pushObjectToDataArrayWithUniqueKey("url", url);
});

When("User replicates the first guarantee at guarantee list", async () => {
    let GuaranteeNo;
    for (const iterator of dataTestcase) {
        if (iterator.nameField.localeCompare("Guarantee No") === 0) {
            GuaranteeNo = iterator.message[0];
        }
    }
    let temp = await guaranteeList.validateGuaranteeNoOnGuaranteeList(GuaranteeNo, 1);
    logFailTestcase(temp, "Incorrect guarantee on the first row ");
    temp = await guaranteeList.clickReplicateButtonByRowOnGuaranteeList();
    logFailTestcase(temp, "click Replicate Button By Row On Guarantee List failed!");
});

When("User selects product on Replicate guarantee options form {string}", async (filename) => {
    let row = loader(convertPathFileDataToDataRegression(filename))[0];
    const Product = row.Product;
    let temp = await replicateGuaranteeOptionsForm.inputProductToReplicateGuaranteeOptionsForm(Product);
    logFailTestcase(temp, "input Product To Replicate Guarantee Options Form failed!");
});
