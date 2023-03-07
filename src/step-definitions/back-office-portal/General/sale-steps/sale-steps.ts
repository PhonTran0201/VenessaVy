import { DataRepo } from './../../../../core/modals/data_repo';
import { Before, Given, Then, When } from "@cucumber/cucumber";
import { fail } from "assert";
import { AccountTabSummary } from "../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-summary/AccountTabSummary";
import { AccountList } from "../../../../page-objects/back-office-portal/general/account/account-list/AccountList";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { GlobalPagination } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPagination";
import { GlobalPeripherals } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPeripherals";
import { SaleDetailsLeftSide } from "../../../../page-objects/back-office-portal/general/sale/sale-details/left-side/SaleDetailsLeftSide";
import { SaleTabContactList } from "../../../../page-objects/back-office-portal/general/sale/sale-details/tabs/sale-contact/SaleTabContactList";
import { SaleTabSummary } from "../../../../page-objects/back-office-portal/general/sale/sale-details/tabs/sale-summary/SaleTabSummary";
import { SaleForm } from "../../../../page-objects/back-office-portal/general/sale/sale-forms/SaleForm";
import { SaleCard } from "../../../../page-objects/back-office-portal/general/sale/sale-list/SaleCard";
import { SaleList } from "../../../../page-objects/back-office-portal/general/sale/sale-list/SaleList";
import { convertPathFileDataToDataRegression, logFailTestcase, logInfoMessage, logSuccessMessage, logWarningMessage, randomModulus11ForSSN, reformatSalesStage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { currencyToNumber, formatDateTime, getCurrencyDecimalSeparator, getNumberDecimalSeparator, numberToCurrency } from "../../../../shared/tenant-setting/tenant-setting";
import { getCurrentDateTime } from '../../../../shared/functions';
import { By } from 'selenium-webdriver';


const loader = require("csv-load-sync");
const fs = require("fs");

let saleList: SaleList;
let saleCard: SaleCard;
let saleForm: SaleForm;
let saleDetailsLeftSide: SaleDetailsLeftSide;
let saleTabSummary: SaleTabSummary;
let saleTabContactList: SaleTabContactList;

let accountList: AccountList;
let accountTabSummary: AccountTabSummary;

let globalPageObject: GlobalPageObject;
let globalPeripherals: GlobalPeripherals;
let globalPagination: GlobalPagination;

//Variable using to compare
let expectedSales: string;
let expectedAccount: string;
let expectedActivities: string;
let expectedPipeline: string;
let expectedSaleRep: string;
let expectedKAM: string;
let expectedAmount: string;
let expectedCurrency: string;
let expectedClosedDate: string;
let expectedStage: string;
let expectedProduct: string;
let fileDataCreate: string = "";
let countError: number = 0;

Before(async function () {
  const context: ICommonContext = this.context;
  saleList = new SaleList(context.driverService);
  saleCard = new SaleCard(context.driverService);
  saleForm = new SaleForm(context.driverService);
  saleDetailsLeftSide = new SaleDetailsLeftSide(context.driverService);

  accountList = new AccountList(context.driverService);
  accountTabSummary = new AccountTabSummary(context.driverService);
  saleTabContactList = new SaleTabContactList(context.driverService);
  saleTabSummary = new SaleTabSummary(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
  globalPeripherals = new GlobalPeripherals(context.driverService);
  globalPagination = new GlobalPagination(context.driverService);
});

Given("User navigates to Sales list", async () => {
  let temp = await globalPageObject.navigateToMainSaleList();
  logFailTestcase(temp, "User navigates to Sales list failed!");

  temp = await saleList.clearAllFilters();
  logFailTestcase(temp, "User clears all filters failed!");

  const saleListType = "All sales";
  logInfoMessage(`User select sale list type is "${saleListType}"`);
  temp = await saleList.inputDropdownSaleListType(saleListType);
  logFailTestcase(temp, `Input dropdown Sale list type "${saleListType}" failed!`);
});
Given("User is on Sale list", async () => {
  let temp = await globalPageObject.navigateToSubSale();
  logFailTestcase(temp, "User navigates to Sales list on Entity detail failed!");
});

When("User opens Create Sale form", async () => {
  let temp = await saleList.openCreateSalesForm();
  logFailTestcase(temp, "Can't open Create Sale Person form!");
})


// @VARSAM @SALE
Then("User verifies data is correct at Sales List {string}", async (dataKey) => {
  try {
    await saleList.reloadSaleList()
    let data = await DataRepo.getInstance().getFieldValue(dataKey);
    await saleList.validateValueSaleList(data.SalesName, "Sales")
    await saleList.validateValueSaleList(data.FirstName + " " + data.LastName, "Account")
    await saleList.validateValueSaleList(data.Team, "Team")
    await saleList.validateValueSaleList(data.TeamMember, "TeamMember")
    await saleList.validateValueSaleList(data.Phone, "Phone")
    if (data.TimeToCall) {
      await saleList.validateValueSaleList(data.TimeToCall, "TimeToCall")
    } else {
      await saleList.validateValueSaleList(getCurrentDateTime(true), "TimeToCall")
    }
    await saleList.validateValueSaleList(data.SalesRep, "Sales rep.")
    await saleList.validateValueSaleList(data.Product, "Product")
    await saleList.validateValueSaleList(data.ExpectedSalesStage, "Stage")
    await saleList.validateValueSaleList(data.Organization, "Organization")
    await saleList.validateValueSaleList(getCurrentDateTime(), "Last Updated")

  }
  catch (error) {
    logFailTestcase(false, (error as Error).message + "\r\n" + (error as Error).stack);
  }
})

When("User open Create Person Sale popup and inputs valid person sale data from csv file {string}", async (filename: string) => {
  let rows = loader(convertPathFileDataToDataRegression(filename));
  fileDataCreate = filename;
  for (const row of rows) {
    let temp = await saleList.openCreateSalesPersonForm();
    logFailTestcase(temp, "Can't open Create Sale Person form!");
    //FirstName,LastName,SSN,Email,KAM,Pipeline,Stage,SaleName,SalesRep,Currency,Amount,ClosedDate

    const FirstName = row.FirstName;
    const LastName = row.LastName;

    const SSN = randomModulus11ForSSN(); //get random SSN with length = 11
    const Email = row.Email;
    const KAM = row.KAM;

    const Pipeline = row.Pipeline;
    const Stage = row.Stage;
    const SaleName = row.SaleName;
    const Product = row.Product;
    const SalesRep = row.SalesRep;
    const Currency = row.Currency;
    const Amount = row.Amount;
    const ClosedDate = row.ClosedDate;
    const Team = row.Team;
    const TeamMember = row.TeamMember;
    const Phone = row.Phone;
    const TimeToCall = row.TimeToCall;
    const AnnualContractValue = row.AnnualContractValue;
    const CloseQuarter = row.CloseQuarter;
    const Type = row.Type;
    const DealSource = row.DealSource;
    const ProductPL = row.ProductPL;
    const DealStatus = row.DealStatus;
    const Region = row.Region;
    const Capex = row.Capex;
    const RiskChallenges = row.RiskChallenges;
    const Arr = row.Arr;
    const Maintenance = row.Maintenance;
    const ProfessionalService = row.ProfessionalService;
    const DealPeriod = row.DealPeriod;
    const Description = row.Description;

    expectedSales = SaleName;
    expectedAccount = FirstName + " " + LastName;
    expectedActivities = Pipeline;
    expectedSaleRep = SalesRep;
    expectedKAM = KAM;
    expectedAmount = Amount;
    expectedCurrency = Currency;
    expectedClosedDate = ClosedDate;
    expectedStage = Stage;

    if (FirstName) {
      temp = await saleForm.inputFirstNameAccountInfoOnSaleForm(FirstName);
      logFailTestcase(temp, "Input FirstName on Sale form failed!");
    }
    if (LastName) {
      temp = await saleForm.inputLastNameAccountInfoOnSaleForm(LastName);
      logFailTestcase(temp, "Input LastName on Sale form failed!");
    }
    if (SSN) {
      temp = await saleForm.inputSSN_ORGAccountInfoOnSaleForm(SSN);
      logFailTestcase(temp, "Input SSN on Sale form failed!");
    }
    if (Email) {
      temp = await saleForm.inputEmailAccountInfoOnSaleForm(Email);
      logFailTestcase(temp, "Input Email on Sale form failed!");
    }
    if (KAM) {
      temp = await saleForm.inputKAMAccountInfoOnSaleForm(KAM);
      logFailTestcase(temp, "Input KAM on Sale form failed!");
    }
    if (Pipeline) {
      temp = await saleForm.inputPipelineSalesOnSaleForm(Pipeline);
      logFailTestcase(temp, "Input Pipeline on Sale form failed!");
    }
    if (Stage) {
      temp = await saleForm.inputSalesStageSalesAccountInfoOnSaleForm(Stage);
      logFailTestcase(temp, "Input Stage on Sale form failed!");
    }
    if (SaleName) {
      temp = await saleForm.inputSaleNameSalesOnSaleForm(SaleName);
      logFailTestcase(temp, "Input SaleName on Sale form failed!");
    }
    if (Product) {
      temp = await saleForm.inputProductSalesOnSaleForm(Product);
      logFailTestcase(temp, "Input Product on Sale form failed!");
    }
    if (SalesRep) {
      temp = await saleForm.inputSalesRepSalesOnSaleForm(SalesRep);
      logFailTestcase(temp, "Input SalesRep on Sale form failed!");
    }
    if (Currency) {
      temp = await saleForm.inputCurrencySalesOnSaleForm(Currency);
      logFailTestcase(temp, "Input Currency on Sale form failed!");
    }
    if (Amount) {
      temp = await saleForm.inputTotalDealAmountSalesOnSaleForm(Amount);
      logFailTestcase(temp, "Input Amount on Sale form failed!");
    }
    if (ClosedDate) {
      temp = await saleForm.inputClosedDateSalesOnSaleForm(ClosedDate);
      logFailTestcase(temp, "Input ClosedDate on Sale form failed!");
    }
    if (Team) {
      temp = await saleForm.inputTeamOnSaleForm(Team);
      logFailTestcase(temp, `Input Team failed!`);
    }
    if (TeamMember) {
      temp = await saleForm.inputTeamMemberOnSaleForm(TeamMember);
      logFailTestcase(temp, `Input TeamMember failed!`);
    }
    if (Phone) {
      temp = await saleForm.inputPhoneOnSaleForm(Phone);
      logFailTestcase(temp, `Input Phone failed!`);
    }
    if (TimeToCall) {
      temp = await saleForm.inputTimeToCallOnSaleForm(TimeToCall);
      logFailTestcase(temp, `Input TimeToCall failed!`);
    }
    if (AnnualContractValue) {
      temp = await saleForm.inputAnnualContractValueSalesOnSaleForm(AnnualContractValue);
      logFailTestcase(temp, "Input AnnualContractValue on Sale form failed!");
    }
    if (CloseQuarter) {
      temp = await saleForm.inputCloseQuarterSalesOnSaleForm(CloseQuarter);
      logFailTestcase(temp, "Input CloseQuarter on Sale form failed!");
    }
    if (Type) {
      temp = await saleForm.inputSalesTypeSalesOnSaleForm(Type);
      logFailTestcase(temp, "Input Type  on Sale form failed!");
    }
    if (DealSource) {
      temp = await saleForm.inputDealSourceSalesOnSaleForm(DealSource);
      logFailTestcase(temp, "Input DealSource on Sale form failed!");
    }
    if (ProductPL) {
      temp = await saleForm.inputProductPlSalesOnSaleForm(ProductPL);
      logFailTestcase(temp, "Input ProductPL on Sale form failed!");
    }
    if (DealStatus) {
      temp = await saleForm.inputDealStatusSalesOnSaleForm(DealStatus);
      logFailTestcase(temp, "Input DealStatus on Sale form failed!");
    }
    if (Region) {
      temp = await saleForm.inputRegionSalesOnSaleForm(Region);
      logFailTestcase(temp, "Input Region on Sale form failed!");
    }
    if (Capex) {
      temp = await saleForm.inputCAPEXSalesOnSaleForm(Capex);
      logFailTestcase(temp, "Input Capex on Sale form failed!");
    }
    if (RiskChallenges) {
      temp = await saleForm.inputRisksChallengesSalesOnSaleForm(RiskChallenges);
      logFailTestcase(temp, "Input RiskChallenges on Sale form failed!");
    }
    if (Arr) {
      temp = await saleForm.inputARRSalesOnSaleForm(Arr);
      logFailTestcase(temp, "Input  on Sale form failed!");
    }
    if (Maintenance) {
      temp = await saleForm.inputLicenseAndMaintenanceSalesOnSaleForm(Maintenance);
      logFailTestcase(temp, "Input Maintenance on Sale form failed!");
    }
    if (ProfessionalService) {
      temp = await saleForm.inputProfessionalServiceSalesOnSaleForm(ProfessionalService);
      logFailTestcase(temp, "Input ProfessionalService on Sale form failed!");
    }
    if (DealPeriod) {
      temp = await saleForm.inputDealPeriodSalesOnSaleForm(DealPeriod);
      logFailTestcase(temp, "Input DealPeriod on Sale form failed!");
    }
    if (Description) {
      temp = await saleForm.inputDescriptionSalesOnSaleForm(Description);
      logFailTestcase(temp, "Input Description on Sale form failed!");
    }


    temp = await globalPeripherals.pressTabCurrentElement();
    logFailTestcase(temp, "Press Tab current element failed!");

    if (ClosedDate) {
      temp = await saleForm.validateValueSaleForm(ClosedDate, "Close Date");
      logFailTestcase(temp, "Validate value on form sale after input data in first time failed!");
    }

    temp = await saleForm.saveCreateSalePerson();
    logFailTestcase(temp, "Can't press Save create sale person!");
  }
});

When("User open Create Person Sale popup and inputs valid existing person sale data from csv file {string}", async (filename: string) => {
  let rows = loader(convertPathFileDataToDataRegression(filename));
  fileDataCreate = filename;
  for (const row of rows) {
    let temp = await saleList.openCreateSalesPersonForm();
    logFailTestcase(temp, "Can't open Create Sales person form!");

    const ExistingPerson = row.ChooseFromExistingAccount;

    const Pipeline = row.Pipeline;
    const Stage = row.Stage;
    const SaleName = row.SaleName;
    const Product = row.Product;
    const SalesRep = row.SalesRep;
    const Currency = row.Currency;
    const Amount = row.Amount;
    const ClosedDate = row.ClosedDate;
    const AnnualContractValue = row.AnnualContractValue;
    const CloseQuarter = row.CloseQuarter;
    const Type = row.Type;
    const DealSource = row.DealSource;
    const ProductPL = row.ProductPL;
    const DealStatus = row.DealStatus;
    const Region = row.Region;
    const Capex = row.Capex;
    const RiskChallenges = row.RiskChallenges;
    const Arr = row.Arr;
    const Maintenance = row.Maintenance;
    const ProfessionalService = row.ProfessionalService;
    const DealPeriod = row.DealPeriod;
    const Description = row.Description;

    expectedSales = SaleName;
    expectedPipeline = Pipeline;
    expectedSaleRep = SalesRep;
    expectedAmount = Amount;
    expectedCurrency = Currency;
    expectedClosedDate = ClosedDate;
    expectedStage = Stage;


    if (ExistingPerson) {
      temp = await saleForm.inputChooseFromExistingAccountOnSaleForm(ExistingPerson);
      logFailTestcase(temp, "Input Existing account on Sale form failed!");
    }
    if (Pipeline) {
      temp = await saleForm.inputPipelineSalesOnSaleForm(Pipeline);
      logFailTestcase(temp, "Input Pipeline on Sale form failed!");
    }
    if (Stage) {
      temp = await saleForm.inputSalesStageSalesAccountInfoOnSaleForm(Stage);
      logFailTestcase(temp, "Input Stage on Sale form failed!");
    }
    if (SaleName) {
      temp = await saleForm.inputSaleNameSalesOnSaleForm(SaleName);
      logFailTestcase(temp, "Input SaleName on Sale form failed!");
    }
    if (Product) {
      temp = await saleForm.inputProductSalesOnSaleForm(Product);
      logFailTestcase(temp, "Input Product on Sale form failed!");
    }
    if (SalesRep) {
      temp = await saleForm.inputSalesRepSalesOnSaleForm(SalesRep);
      logFailTestcase(temp, "Input SalesRep on Sale form failed!");
    }
    if (Currency) {
      temp = await saleForm.inputCurrencySalesOnSaleForm(Currency);
      logFailTestcase(temp, "Input Currency on Sale form failed!");
    }
    if (Amount) {
      temp = await saleForm.inputTotalDealAmountSalesOnSaleForm(Amount);
      logFailTestcase(temp, "Input Amount on Sale form failed!");
    }
    if (ClosedDate) {
      temp = await saleForm.inputClosedDateSalesOnSaleForm(ClosedDate);
      logFailTestcase(temp, "Input ClosedDate on Sale form failed!");
    }
    if (AnnualContractValue) {
      temp = await saleForm.inputAnnualContractValueSalesOnSaleForm(AnnualContractValue);
      logFailTestcase(temp, "Input AnnualContractValue on Sale form failed!");
    }
    if (CloseQuarter) {
      temp = await saleForm.inputCloseQuarterSalesOnSaleForm(CloseQuarter);
      logFailTestcase(temp, "Input CloseQuarter on Sale form failed!");
    }
    if (Type) {
      temp = await saleForm.inputSalesTypeSalesOnSaleForm(Type);
      logFailTestcase(temp, "Input Type  on Sale form failed!");
    }
    if (DealSource) {
      temp = await saleForm.inputDealSourceSalesOnSaleForm(DealSource);
      logFailTestcase(temp, "Input DealSource on Sale form failed!");
    }
    if (ProductPL) {
      temp = await saleForm.inputProductPlSalesOnSaleForm(ProductPL);
      logFailTestcase(temp, "Input ProductPL on Sale form failed!");
    }
    if (DealStatus) {
      temp = await saleForm.inputDealStatusSalesOnSaleForm(DealStatus);
      logFailTestcase(temp, "Input DealStatus on Sale form failed!");
    }
    if (Region) {
      temp = await saleForm.inputRegionSalesOnSaleForm(Region);
      logFailTestcase(temp, "Input Region on Sale form failed!");
    }
    if (Capex) {
      temp = await saleForm.inputCAPEXSalesOnSaleForm(Capex);
      logFailTestcase(temp, "Input Capex on Sale form failed!");
    }
    if (RiskChallenges) {
      temp = await saleForm.inputRisksChallengesSalesOnSaleForm(RiskChallenges);
      logFailTestcase(temp, "Input RiskChallenges on Sale form failed!");
    }
    if (Arr) {
      temp = await saleForm.inputARRSalesOnSaleForm(Arr);
      logFailTestcase(temp, "Input  on Sale form failed!");
    }
    if (Maintenance) {
      temp = await saleForm.inputLicenseAndMaintenanceSalesOnSaleForm(Maintenance);
      logFailTestcase(temp, "Input Maintenance on Sale form failed!");
    }
    if (ProfessionalService) {
      temp = await saleForm.inputProfessionalServiceSalesOnSaleForm(ProfessionalService);
      logFailTestcase(temp, "Input ProfessionalService on Sale form failed!");
    }
    if (DealPeriod) {
      temp = await saleForm.inputDealPeriodSalesOnSaleForm(DealPeriod);
      logFailTestcase(temp, "Input DealPeriod on Sale form failed!");
    }
    if (Description) {
      temp = await saleForm.inputDescriptionSalesOnSaleForm(Description);
      logFailTestcase(temp, "Input Description on Sale form failed!");
    }



    temp = await saleForm.saveCreateSalePerson();
    logFailTestcase(temp, "Can't press Save Create sale person!");
  }
});

When("User open Create Company Sale popup and inputs valid company sale data from csv file {string}", async (filename: string) => {
  let rows = loader(convertPathFileDataToDataRegression(filename));
  fileDataCreate = filename;
  for (const row of rows) {
    let temp = await saleList.openCreateSalesCompanyForm();
    logFailTestcase(temp, "Can't open Create Sales company form!");
    //CompanyName	Org	EmailAccountInfo	KAM	FirstName	LastName	EmailContact	PhoneContact	Pipeline	Stage	SaleName	SalesRep	Currency	Amount	ClosedDate

    const CompanyName = row.CompanyName;
    //const Org = row.Org;
    const Org = randomModulus11ForSSN(); //get random Org with length = 11
    const EmailAccountInfo = row.EmailAccountInfo;
    const KAM = row.KAM;
    const FirstName = row.FirstName;
    const LastName = row.LastName;
    const EmailContact = row.EmailContact;
    const PhoneContact = row.PhoneContact;
    const Pipeline = row.Pipeline;
    const Stage = row.Stage; ////
    const SaleName = row.SaleName;
    const Product = row.Product;
    const SalesRep = row.SalesRep;
    const Currency = row.Currency;
    const Amount = row.Amount;
    const ClosedDate = row.ClosedDate;
    const Team = row.Team;
    const TeamMember = row.TeamMember;
    const Phone = row.Phone;
    const TimeToCall = row.TimeToCall;
    const AnnualContractValue = row.AnnualContractValue;
    const CloseQuarter = row.CloseQuarter;
    const Type = row.Type;
    const DealSource = row.DealSource;
    const ProductPL = row.ProductPL;
    const DealStatus = row.DealStatus;
    const Region = row.Region;
    const Capex = row.Capex;
    const RiskChallenges = row.RiskChallenges;
    const Arr = row.Arr;
    const Maintenance = row.Maintenance;
    const ProfessionalService = row.ProfessionalService;
    const DealPeriod = row.DealPeriod;
    const Description = row.Description;

    expectedSales = SaleName;
    expectedAccount = FirstName + " " + LastName;
    expectedActivities = Pipeline;
    expectedSaleRep = SalesRep;
    expectedKAM = KAM;
    expectedAmount = Amount;
    expectedCurrency = Currency;
    expectedClosedDate = ClosedDate;
    expectedStage = Stage;

    if (CompanyName) {
      temp = await saleForm.inputCompanyNameAccountInfoOnSaleForm(CompanyName);
      logFailTestcase(temp, "Input CompanyName on Sale form failed!");
    }
    if (Org) {
      temp = await saleForm.inputSSN_ORGAccountInfoOnSaleForm(Org);
      logFailTestcase(temp, "Input OrgNo on Sale form failed!");
    }
    if (EmailAccountInfo) {
      temp = await saleForm.inputEmailAccountInfoOnSaleForm(EmailAccountInfo);
      logFailTestcase(temp, "Input EmailAccountInfo on Sale form failed!");
    }
    if (KAM) {
      temp = await saleForm.inputKAMAccountInfoOnSaleForm(KAM);
      logFailTestcase(temp, "Input KAM on Sale form failed!");
    }
    if (FirstName) {
      temp = await saleForm.inputFirstNameContactOnSaleForm(FirstName);
      logFailTestcase(temp, "Input FirstName contact on Sale form failed!");
    }
    if (LastName) {
      temp = await saleForm.inputLastNameContactOnSaleForm(LastName);
      logFailTestcase(temp, "Input Last name on Sale form failed!");
    }
    if (EmailContact) {
      temp = await saleForm.inputEmailContactOnSaleForm(EmailContact);
      logFailTestcase(temp, "Input EmailContact on Sale form failed!");
    }
    if (PhoneContact) {
      temp = await saleForm.inputPhoneContactOnSaleForm(PhoneContact);
      logFailTestcase(temp, "Input PhoneContact on Sale form failed!");
    }



    if (Pipeline) {
      temp = await saleForm.inputPipelineSalesOnSaleForm(Pipeline);
      logFailTestcase(temp, "Input Pipeline on Sale form failed!");
    }
    if (Stage) {
      temp = await saleForm.inputSalesStageSalesAccountInfoOnSaleForm(Stage);
      logFailTestcase(temp, "Input Stage on Sale form failed!");
    }
    if (SaleName) {
      temp = await saleForm.inputSaleNameSalesOnSaleForm(SaleName);
      logFailTestcase(temp, "Input SaleName on Sale form failed!");
    }
    if (Product) {
      temp = await saleForm.inputProductSalesOnSaleForm(Product);
      logFailTestcase(temp, "Input Product on Sale form failed!");
    }
    if (SalesRep) {
      temp = await saleForm.inputSalesRepSalesOnSaleForm(SalesRep);
      logFailTestcase(temp, "Input SalesRep on Sale form failed!");
    }
    if (Currency) {
      temp = await saleForm.inputCurrencySalesOnSaleForm(Currency);
      logFailTestcase(temp, "Input Currency on Sale form failed!");
    }
    if (Amount) {
      temp = await saleForm.inputTotalDealAmountSalesOnSaleForm(Amount);
      logFailTestcase(temp, "Input Amount on Sale form failed!");
    }
    if (ClosedDate) {
      temp = await saleForm.inputClosedDateSalesOnSaleForm(ClosedDate);
      logFailTestcase(temp, "Input ClosedDate on Sale form failed!");
    }
    if (Team) {
      temp = await saleForm.inputTeamOnSaleForm(Team);
      logFailTestcase(temp, `Input Team failed!`);
    }
    if (TeamMember) {
      temp = await saleForm.inputTeamMemberOnSaleForm(TeamMember);
      logFailTestcase(temp, `Input TeamMember failed!`);
    }
    if (Phone) {
      temp = await saleForm.inputPhoneOnSaleForm(Phone);
      logFailTestcase(temp, `Input Phone failed!`);
    }
    if (TimeToCall) {
      temp = await saleForm.inputTimeToCallOnSaleForm(TimeToCall);
      logFailTestcase(temp, `Input TimeToCall failed!`);
    }
    if (AnnualContractValue) {
      temp = await saleForm.inputAnnualContractValueSalesOnSaleForm(AnnualContractValue);
      logFailTestcase(temp, "Input AnnualContractValue on Sale form failed!");
    }
    if (CloseQuarter) {
      temp = await saleForm.inputCloseQuarterSalesOnSaleForm(CloseQuarter);
      logFailTestcase(temp, "Input CloseQuarter on Sale form failed!");
    }
    if (Type) {
      temp = await saleForm.inputSalesTypeSalesOnSaleForm(Type);
      logFailTestcase(temp, "Input Type  on Sale form failed!");
    }
    if (DealSource) {
      temp = await saleForm.inputDealSourceSalesOnSaleForm(DealSource);
      logFailTestcase(temp, "Input DealSource on Sale form failed!");
    }
    if (ProductPL) {
      temp = await saleForm.inputProductPlSalesOnSaleForm(ProductPL);
      logFailTestcase(temp, "Input ProductPL on Sale form failed!");
    }
    if (DealStatus) {
      temp = await saleForm.inputDealStatusSalesOnSaleForm(DealStatus);
      logFailTestcase(temp, "Input DealStatus on Sale form failed!");
    }
    if (Region) {
      temp = await saleForm.inputRegionSalesOnSaleForm(Region);
      logFailTestcase(temp, "Input Region on Sale form failed!");
    }
    if (Capex) {
      temp = await saleForm.inputCAPEXSalesOnSaleForm(Capex);
      logFailTestcase(temp, "Input Capex on Sale form failed!");
    }
    if (RiskChallenges) {
      temp = await saleForm.inputRisksChallengesSalesOnSaleForm(RiskChallenges);
      logFailTestcase(temp, "Input RiskChallenges on Sale form failed!");
    }
    if (Arr) {
      temp = await saleForm.inputARRSalesOnSaleForm(Arr);
      logFailTestcase(temp, "Input  on Sale form failed!");
    }
    if (Maintenance) {
      temp = await saleForm.inputLicenseAndMaintenanceSalesOnSaleForm(Maintenance);
      logFailTestcase(temp, "Input Maintenance on Sale form failed!");
    }
    if (ProfessionalService) {
      temp = await saleForm.inputProfessionalServiceSalesOnSaleForm(ProfessionalService);
      logFailTestcase(temp, "Input ProfessionalService on Sale form failed!");
    }
    if (DealPeriod) {
      temp = await saleForm.inputDealPeriodSalesOnSaleForm(DealPeriod);
      logFailTestcase(temp, "Input DealPeriod on Sale form failed!");
    }
    if (Description) {
      temp = await saleForm.inputDescriptionSalesOnSaleForm(Description);
      logFailTestcase(temp, "Input Description on Sale form failed!");
    }

    temp = await globalPeripherals.pressTabCurrentElement();
    logFailTestcase(temp, "Press Tab current element failed!");

    if (ClosedDate) {
      temp = await saleForm.validateValueSaleForm(ClosedDate, "Close Date");
      logFailTestcase(temp, "Validate value on form sale after input data in first time failed!");
    }

    temp = await globalPageObject.pressSaveForm();
    logFailTestcase(temp, "Can't press Save create Sale Company!");
    // await globalPageObject.waitForProgressBarLoaded_v2();
  }
});

When("User open Create Company Sale popup and inputs valid existing company sale data from csv file {string}", async (filename: string) => {
  let rows = loader(convertPathFileDataToDataRegression(filename));
  fileDataCreate = filename;
  for (const row of rows) {
    let temp = await saleList.openCreateSalesCompanyForm();
    logFailTestcase(temp, "Can't opern Create Sale company form!");
    //ChooseFromExistingAccount	FirstName	LastName	EmailContact	PhoneContact	Pipeline	Stage	SaleName	Product SalesRep	Currency	Amount	ClosedDate

    const ChooseFromExistingAccount = row.ChooseFromExistingAccount;

    const FirstName = row.FirstName;
    const LastName = row.LastName;
    const EmailContact = row.EmailContact;
    const PhoneContact = row.PhoneContact;
    const Pipeline = row.Pipeline;
    const Stage = row.Stage;
    const SaleName = row.SaleName;
    const Product = row.Product;
    const SalesRep = row.SalesRep;
    const Currency = row.Currency;
    const Amount = row.Amount;
    const ClosedDate = row.ClosedDate;
    const AnnualContractValue = row.AnnualContractValue;
    const CloseQuarter = row.CloseQuarter;
    const Type = row.Type;
    const DealSource = row.DealSource;
    const ProductPL = row.ProductPL;
    const DealStatus = row.DealStatus;
    const Region = row.Region;
    const Capex = row.Capex;
    const RiskChallenges = row.RiskChallenges;
    const Arr = row.Arr;
    const Maintenance = row.Maintenance;
    const ProfessionalService = row.ProfessionalService;
    const DealPeriod = row.DealPeriod;
    const Description = row.Description;

    expectedSales = SaleName;
    expectedAccount = FirstName + " " + LastName;
    expectedActivities = Pipeline;
    expectedSaleRep = SalesRep;
    expectedAmount = Amount;
    expectedCurrency = Currency;
    expectedClosedDate = ClosedDate;
    expectedStage = Stage;
    temp = await saleForm.inputChooseFromExistingAccountOnSaleForm(ChooseFromExistingAccount);
    logFailTestcase(temp, "Can't choose from Existing account!");

    if (FirstName) {
      temp = await saleForm.inputFirstNameContactOnSaleForm(FirstName);
      logFailTestcase(temp, "Input FirstName contact on Sale form failed!");
    }
    if (LastName) {
      temp = await saleForm.inputLastNameContactOnSaleForm(LastName);
      logFailTestcase(temp, "Input Last name on Sale form failed!");
    }
    if (EmailContact) {
      temp = await saleForm.inputEmailContactOnSaleForm(EmailContact);
      logFailTestcase(temp, "Input EmailContact on Sale form failed!");
    }
    if (PhoneContact) {
      temp = await saleForm.inputPhoneContactOnSaleForm(PhoneContact);
      logFailTestcase(temp, "Input PhoneContact on Sale form failed!");
    }



    if (Pipeline) {
      temp = await saleForm.inputPipelineSalesOnSaleForm(Pipeline);
      logFailTestcase(temp, "Input Pipeline on Sale form failed!");
    }
    if (Stage) {
      temp = await saleForm.inputSalesStageSalesAccountInfoOnSaleForm(Stage);
      logFailTestcase(temp, "Input Stage on Sale form failed!");
    }
    if (SaleName) {
      temp = await saleForm.inputSaleNameSalesOnSaleForm(SaleName);
      logFailTestcase(temp, "Input SaleName on Sale form failed!");
    }
    if (Product) {
      temp = await saleForm.inputProductSalesOnSaleForm(Product);
      logFailTestcase(temp, "Input Product on Sale form failed!");
    }
    if (SalesRep) {
      temp = await saleForm.inputSalesRepSalesOnSaleForm(SalesRep);
      logFailTestcase(temp, "Input SalesRep on Sale form failed!");
    }
    if (Currency) {
      temp = await saleForm.inputCurrencySalesOnSaleForm(Currency);
      logFailTestcase(temp, "Input Currency on Sale form failed!");
    }
    if (Amount) {
      temp = await saleForm.inputTotalDealAmountSalesOnSaleForm(Amount);
      logFailTestcase(temp, "Input Amount on Sale form failed!");
    }
    if (ClosedDate) {
      temp = await saleForm.inputClosedDateSalesOnSaleForm(ClosedDate);
      logFailTestcase(temp, "Input ClosedDate on Sale form failed!");
    }
    if (AnnualContractValue) {
      temp = await saleForm.inputAnnualContractValueSalesOnSaleForm(AnnualContractValue);
      logFailTestcase(temp, "Input AnnualContractValue on Sale form failed!");
    }
    if (CloseQuarter) {
      temp = await saleForm.inputCloseQuarterSalesOnSaleForm(CloseQuarter);
      logFailTestcase(temp, "Input CloseQuarter on Sale form failed!");
    }
    if (Type) {
      temp = await saleForm.inputSalesTypeSalesOnSaleForm(Type);
      logFailTestcase(temp, "Input Type  on Sale form failed!");
    }
    if (DealSource) {
      temp = await saleForm.inputDealSourceSalesOnSaleForm(DealSource);
      logFailTestcase(temp, "Input DealSource on Sale form failed!");
    }
    if (ProductPL) {
      temp = await saleForm.inputProductPlSalesOnSaleForm(ProductPL);
      logFailTestcase(temp, "Input ProductPL on Sale form failed!");
    }
    if (DealStatus) {
      temp = await saleForm.inputDealStatusSalesOnSaleForm(DealStatus);
      logFailTestcase(temp, "Input DealStatus on Sale form failed!");
    }
    if (Region) {
      temp = await saleForm.inputRegionSalesOnSaleForm(Region);
      logFailTestcase(temp, "Input Region on Sale form failed!");
    }
    if (Capex) {
      temp = await saleForm.inputCAPEXSalesOnSaleForm(Capex);
      logFailTestcase(temp, "Input Capex on Sale form failed!");
    }
    if (RiskChallenges) {
      temp = await saleForm.inputRisksChallengesSalesOnSaleForm(RiskChallenges);
      logFailTestcase(temp, "Input RiskChallenges on Sale form failed!");
    }
    if (Arr) {
      temp = await saleForm.inputARRSalesOnSaleForm(Arr);
      logFailTestcase(temp, "Input  on Sale form failed!");
    }
    if (Maintenance) {
      temp = await saleForm.inputLicenseAndMaintenanceSalesOnSaleForm(Maintenance);
      logFailTestcase(temp, "Input Maintenance on Sale form failed!");
    }
    if (ProfessionalService) {
      temp = await saleForm.inputProfessionalServiceSalesOnSaleForm(ProfessionalService);
      logFailTestcase(temp, "Input ProfessionalService on Sale form failed!");
    }
    if (DealPeriod) {
      temp = await saleForm.inputDealPeriodSalesOnSaleForm(DealPeriod);
      logFailTestcase(temp, "Input DealPeriod on Sale form failed!");
    }
    if (Description) {
      temp = await saleForm.inputDescriptionSalesOnSaleForm(Description);
      logFailTestcase(temp, "Input Description on Sale form failed!");
    }


    temp = await globalPageObject.pressSaveForm();
    logFailTestcase(temp, "Can't press Save create sale form!");
    await globalPageObject.waitForProgressBarLoaded_v2();
  }
});

Then("System shows new person sale in the Sales list", async () => {
  const rows = loader(convertPathFileDataToDataRegression(fileDataCreate));
  let len = rows.length;
  await saleList.reloadSaleList();
  await globalPageObject.waitForProgressBarLoaded_v2();
  await globalPageObject.waitForProgressBarLoaded_v2();
  for (let i = len - 1, j = 1; i >= 0; i--, j++) {
    const FirstName = rows[i].FirstName;
    const LastName = rows[i].LastName;

    const KAM = rows[i].KAM;

    const Pipeline = rows[i].Pipeline;
    const Stage = rows[i].Stage;
    const SaleName = rows[i].SaleName;
    const Product = rows[i].Product;
    const SalesRep = rows[i].SalesRep;
    const Currency = rows[i].Currency;
    //const Amount = rows[i].Amount + ",00"; FOR PRODUCTION ONLY
    const Amount = numberToCurrency(rows[i].Amount).split(getCurrencyDecimalSeparator())[0];
    const ClosedDate = rows[i].ClosedDate;

    expectedSales = SaleName;
    expectedProduct = Product;
    expectedAccount = FirstName + " " + LastName;
    expectedActivities = Pipeline;
    expectedSaleRep = SalesRep;
    expectedKAM = KAM;
    expectedAmount = Amount;
    expectedCurrency = Currency;
    expectedClosedDate = ClosedDate;
    expectedStage = reformatSalesStage(Stage);

    await saleList.assertCreateSale(
      j,
      expectedSales,
      expectedAccount,
      expectedActivities,
      expectedSaleRep,
      expectedKAM,
      expectedAmount,
      expectedCurrency,
      expectedClosedDate,
      expectedProduct,
      expectedStage
    );
  }
});

Then("System shows new existing person sale in the Sales list", async () => {
  const rows = loader(convertPathFileDataToDataRegression(fileDataCreate));
  let len = rows.length;
  await saleList.reloadSaleList();
  await globalPageObject.waitForProgressBarLoaded_v2();
  await globalPageObject.waitForProgressBarLoaded_v2();
  for (let i = len - 1, j = 1; i >= 0; i--, j++) {
    const ExistingPerson = rows[i].ChooseFromExistingAccount;
    const Pipeline = rows[i].Pipeline;
    const Stage = rows[i].Stage;
    const SaleName = rows[i].SaleName;
    const SalesRep = rows[i].SalesRep;
    const Currency = rows[i].Currency;
    //const Amount = rows[i].Amount + ",00"; FOR PRODUCTION ONLY
    const Amount = rows[i].Amount;
    const ClosedDate = rows[i].ClosedDate;
    const Product = rows[i].Product;

    expectedSales = SaleName;
    expectedPipeline = Pipeline;
    expectedSaleRep = SalesRep;
    expectedAmount = Amount;
    expectedCurrency = Currency;
    expectedClosedDate = ClosedDate;
    expectedStage = reformatSalesStage(Stage);
    expectedAccount = ExistingPerson;
    expectedProduct = Product;

    await saleList.assertCreateSale(j, expectedSales, expectedAccount, expectedPipeline, expectedSaleRep, "", expectedAmount, expectedCurrency, expectedClosedDate, expectedProduct, expectedStage);
  }
});

Then("System shows new company sale in the Sales list", async () => {
  const rows = loader(convertPathFileDataToDataRegression(fileDataCreate));
  let len = rows.length;
  await saleList.reloadSaleList();
  await globalPageObject.waitForProgressBarLoaded_v2();
  await globalPageObject.waitForProgressBarLoaded_v2();
  for (let i = len - 1, j = 1; i >= 0; i--, j++) {
    let CompanyName = rows[i].CompanyName;
    const KAM = rows[i].KAM;
    const Pipeline = rows[i].Pipeline;
    const Stage = rows[i].Stage; ////
    const SaleName = rows[i].SaleName;
    const Product = rows[i].Product;
    const SalesRep = rows[i].SalesRep;
    const Currency = rows[i].Currency;
    //const Amount = rows[i].Amount + ",00"; FOR PRODUCTION ONLY
    const Amount = numberToCurrency(rows[i].Amount).split(getCurrencyDecimalSeparator())[0];
    const ClosedDate = rows[i].ClosedDate;

    //Incase of create sale from existing company account
    if (!CompanyName) {
      CompanyName = rows[i].ChooseFromExistingAccount;
    }

    expectedSales = SaleName;
    expectedAccount = CompanyName;
    expectedActivities = Pipeline;
    expectedSaleRep = SalesRep;
    expectedKAM = KAM;
    expectedAmount = Amount;
    expectedCurrency = Currency;
    expectedClosedDate = ClosedDate;
    expectedProduct = Product;
    expectedStage = reformatSalesStage(Stage);

    await saleList.assertCreateSale(
      j,
      expectedSales,
      expectedAccount,
      expectedActivities,
      expectedSaleRep,
      expectedKAM,
      expectedAmount,
      expectedCurrency,
      expectedClosedDate,
      expectedProduct,
      expectedStage
    );
  }
});

When("User updates a person sale from precondition steps from csv file {string}", async (filename: string) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  fileDataCreate = filename;
  await saleList.reloadSaleList();
  await globalPageObject.waitForProgressBarLoaded_v2();
  for (let row of rows) {
    const selectedSale = row.SelectedSale;
    let temp = await saleList.openEditSalesFormByName(selectedSale);
    logFailTestcase(temp, "Can't open edit sale person form!");

    const Pipeline = row.Pipeline;
    const Stage = row.Stage;
    const SaleName = row.SaleName;
    const Product = row.Product;
    const SalesRep = row.SalesRep;
    const Currency = row.Currency;
    const Amount = row.Amount;
    const ClosedDate = row.ClosedDate;
    const Team = row.Team;
    const TeamMember = row.TeamMember;
    const Phone = row.Phone;
    const TimeToCall = row.TimeToCall;
    const AnnualContractValue = row.AnnualContractValue;
    const CloseQuarter = row.CloseQuarter;
    const Type = row.Type;
    const DealSource = row.DealSource;
    const ProductPL = row.ProductPL;
    const DealStatus = row.DealStatus;
    const Region = row.Region;
    const Capex = row.Capex;
    const RiskChallenges = row.RiskChallenges;
    const Arr = row.Arr;
    const Maintenance = row.Maintenance;
    const ProfessionalService = row.ProfessionalService;
    const DealPeriod = row.DealPeriod;
    const Description = row.Description;

    // Clear old data
    temp = await saleForm.clearOldDataOnSaleForm();
    logFailTestcase(temp, "Clear old data on Sale form failed!");


    if (Pipeline) {
      temp = await saleForm.inputPipelineSalesOnSaleForm(Pipeline);
      logFailTestcase(temp, "Input Pipeline on Sale form failed!");
    }
    if (Stage) {
      temp = await saleForm.inputSalesStageSalesAccountInfoOnSaleForm(Stage);
      logFailTestcase(temp, "Input Stage on Sale form failed!");
    }
    if (SaleName) {
      temp = await saleForm.inputSaleNameSalesOnSaleForm(SaleName);
      logFailTestcase(temp, "Input SaleName on Sale form failed!");
    }
    if (Product) {
      temp = await saleForm.inputProductSalesOnSaleForm(Product);
      logFailTestcase(temp, "Input Product on Sale form failed!");
    }
    if (SalesRep) {
      temp = await saleForm.inputSalesRepSalesOnSaleForm(SalesRep);
      logFailTestcase(temp, "Input SalesRep on Sale form failed!");
    }
    if (Currency) {
      temp = await saleForm.inputCurrencySalesOnSaleForm(Currency);
      logFailTestcase(temp, "Input Currency on Sale form failed!");
    }
    if (Amount) {
      temp = await saleForm.inputTotalDealAmountSalesOnSaleForm(Amount);
      logFailTestcase(temp, "Input Amount on Sale form failed!");
    }
    if (ClosedDate) {
      temp = await saleForm.inputClosedDateSalesOnSaleForm(ClosedDate);
      logFailTestcase(temp, "Input ClosedDate on Sale form failed!");
    }
    if (Team) {
      temp = await saleForm.inputTeamOnSaleForm(Team);
      logFailTestcase(temp, `Input Team failed!`);
    }
    if (TeamMember) {
      temp = await saleForm.inputTeamMemberOnSaleForm(TeamMember);
      logFailTestcase(temp, `Input TeamMember failed!`);
    }
    if (Phone) {
      temp = await saleForm.inputPhoneOnSaleForm(Phone);
      logFailTestcase(temp, `Input Phone failed!`);
    }
    if (TimeToCall) {
      temp = await saleForm.inputTimeToCallOnSaleForm(TimeToCall);
      logFailTestcase(temp, `Input TimeToCall failed!`);
    }
    if (AnnualContractValue) {
      temp = await saleForm.inputAnnualContractValueSalesOnSaleForm(AnnualContractValue);
      logFailTestcase(temp, "Input AnnualContractValue on Sale form failed!");
    }
    if (CloseQuarter) {
      temp = await saleForm.inputCloseQuarterSalesOnSaleForm(CloseQuarter);
      logFailTestcase(temp, "Input CloseQuarter on Sale form failed!");
    }
    if (Type) {
      temp = await saleForm.inputSalesTypeSalesOnSaleForm(Type);
      logFailTestcase(temp, "Input Type on Sale form failed!");
    }
    if (DealSource) {
      temp = await saleForm.inputDealSourceSalesOnSaleForm(DealSource);
      logFailTestcase(temp, "Input DealSource on Sale form failed!");
    }
    if (ProductPL) {
      temp = await saleForm.inputProductPlSalesOnSaleForm(ProductPL);
      logFailTestcase(temp, "Input ProductPL on Sale form failed!");
    }
    if (DealStatus) {
      temp = await saleForm.inputDealStatusSalesOnSaleForm(DealStatus);
      logFailTestcase(temp, "Input DealStatus on Sale form failed!");
    }
    if (Region) {
      temp = await saleForm.inputRegionSalesOnSaleForm(Region);
      logFailTestcase(temp, "Input Region on Sale form failed!");
    }
    if (Capex) {
      temp = await saleForm.inputCAPEXSalesOnSaleForm(Capex);
      logFailTestcase(temp, "Input Capex on Sale form failed!");
    }
    if (Currency) {
      temp = await saleForm.inputCurrencySalesOnSaleForm(Currency);
      logFailTestcase(temp, "Input Currency on Sale form failed!");
    }
    if (RiskChallenges) {
      temp = await saleForm.inputRisksChallengesSalesOnSaleForm(RiskChallenges);
      logFailTestcase(temp, "Input RiskChallenges on Sale form failed!");
    }
    if (Arr) {
      temp = await saleForm.inputARRSalesOnSaleForm(Arr);
      logFailTestcase(temp, "Input Arr on Sale form failed!");
    }
    if (Maintenance) {
      temp = await saleForm.inputLicenseAndMaintenanceSalesOnSaleForm(Maintenance);
      logFailTestcase(temp, "Input License & Maintenance on Sale form failed!");
    }
    if (ProfessionalService) {
      temp = await saleForm.inputProfessionalServiceSalesOnSaleForm(ProfessionalService);
      logFailTestcase(temp, "Input ProfessionalService on Sale form failed!");
    }
    if (DealPeriod) {
      temp = await saleForm.inputDealPeriodSalesOnSaleForm(DealPeriod);
      logFailTestcase(temp, "Input DealPeriod on Sale form failed!");
    }
    if (Description) {
      temp = await saleForm.inputDescriptionSalesOnSaleForm(Description);
      logFailTestcase(temp, "Input Description on Sale form failed!");
    }


    temp = await globalPageObject.pressSaveForm();
    logFailTestcase(temp, "Can't press save company!");
    await globalPageObject.waitForProgressBarLoaded_v2();
  }
});
When("User updates a company sale from precondition steps from csv file {string}", async (filename: string) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  fileDataCreate = filename;
  await saleList.reloadSaleList();
  await globalPageObject.waitForProgressBarLoaded_v2();
  for (let row of rows) {
    const selectedSale = row.SelectedSale;
    let temp = await saleList.openEditSalesFormByName(selectedSale);
    logFailTestcase(temp, "Can't open edit sale person form!");

    const Pipeline = row.Pipeline;
    const Stage = row.Stage;
    const SaleName = row.SaleName;
    const Product = row.Product;
    const SalesRep = row.SalesRep;
    const Currency = row.Currency;
    const Amount = row.Amount;
    const ClosedDate = row.ClosedDate;
    const Team = row.Team;
    const TeamMember = row.TeamMember;
    const Phone = row.Phone;
    const TimeToCall = row.TimeToCall;
    const AnnualContractValue = row.AnnualContractValue;
    const CloseQuarter = row.CloseQuarter;
    const Type = row.Type;
    const DealSource = row.DealSource;
    const ProductPL = row.ProductPL;
    const DealStatus = row.DealStatus;
    const Region = row.Region;
    const Capex = row.Capex;
    const RiskChallenges = row.RiskChallenges;
    const Arr = row.Arr;
    const Maintenance = row.Maintenance;
    const ProfessionalService = row.ProfessionalService;
    const DealPeriod = row.DealPeriod;
    const Description = row.Description;

    // Clear old data
    temp = await saleForm.clearOldDataOnSaleForm();
    logFailTestcase(temp, "Clear old data on Sale form failed!");


    if (Pipeline) {
      temp = await saleForm.inputPipelineSalesOnSaleForm(Pipeline);
      logFailTestcase(temp, "Input Pipeline on Sale form failed!");
    }
    if (Stage) {
      temp = await saleForm.inputSalesStageSalesAccountInfoOnSaleForm(Stage);
      logFailTestcase(temp, "Input Stage on Sale form failed!");
    }
    if (SaleName) {
      temp = await saleForm.inputSaleNameSalesOnSaleForm(SaleName);
      logFailTestcase(temp, "Input SaleName on Sale form failed!");
    }
    if (Product) {
      temp = await saleForm.inputProductSalesOnSaleForm(Product);
      logFailTestcase(temp, "Input Product on Sale form failed!");
    }
    if (SalesRep) {
      temp = await saleForm.inputSalesRepSalesOnSaleForm(SalesRep);
      logFailTestcase(temp, "Input SalesRep on Sale form failed!");
    }
    if (Currency) {
      temp = await saleForm.inputCurrencySalesOnSaleForm(Currency);
      logFailTestcase(temp, "Input Currency on Sale form failed!");
    }
    if (Amount) {
      temp = await saleForm.inputTotalDealAmountSalesOnSaleForm(Amount);
      logFailTestcase(temp, "Input Amount on Sale form failed!");
    }
    if (ClosedDate) {
      temp = await saleForm.inputClosedDateSalesOnSaleForm(ClosedDate);
      logFailTestcase(temp, "Input ClosedDate on Sale form failed!");
    }
    if (Team) {
      temp = await saleForm.inputTeamOnSaleForm(Team);
      logFailTestcase(temp, "Input Team failed");
    }
    if (TeamMember) {
      temp = await saleForm.inputTeamMemberOnSaleForm(TeamMember);
      logFailTestcase(temp, "Input Team Member failed");
    }
    if (Phone) {
      temp = await saleForm.inputPhoneOnSaleForm(Phone);
      logFailTestcase(temp, "Input Phone failed");
    }
    if (TimeToCall) {
      temp = await saleForm.inputTimeToCallOnSaleForm(TimeToCall);
      logFailTestcase(temp, "Input TimeToCall failed");
    }
    if (AnnualContractValue) {
      temp = await saleForm.inputAnnualContractValueSalesOnSaleForm(AnnualContractValue);
      logFailTestcase(temp, "Input AnnualContractValue on Sale form failed!");
    }
    if (CloseQuarter) {
      temp = await saleForm.inputCloseQuarterSalesOnSaleForm(CloseQuarter);
      logFailTestcase(temp, "Input CloseQuarter on Sale form failed!");
    }
    if (Type) {
      temp = await saleForm.inputSalesTypeSalesOnSaleForm(Type);
      logFailTestcase(temp, "Input Type on Sale form failed!");
    }
    if (DealSource) {
      temp = await saleForm.inputDealSourceSalesOnSaleForm(DealSource);
      logFailTestcase(temp, "Input DealSource on Sale form failed!");
    }
    if (ProductPL) {
      temp = await saleForm.inputProductPlSalesOnSaleForm(ProductPL);
      logFailTestcase(temp, "Input ProductPL on Sale form failed!");
    }
    if (DealStatus) {
      temp = await saleForm.inputDealStatusSalesOnSaleForm(DealStatus);
      logFailTestcase(temp, "Input DealStatus on Sale form failed!");
    }
    if (Region) {
      temp = await saleForm.inputRegionSalesOnSaleForm(Region);
      logFailTestcase(temp, "Input Region on Sale form failed!");
    }
    if (Capex) {
      temp = await saleForm.inputCAPEXSalesOnSaleForm(Capex);
      logFailTestcase(temp, "Input Capex on Sale form failed!");
    }
    if (Currency) {
      temp = await saleForm.inputCurrencySalesOnSaleForm(Currency);
      logFailTestcase(temp, "Input Currency on Sale form failed!");
    }
    if (RiskChallenges) {
      temp = await saleForm.inputRisksChallengesSalesOnSaleForm(RiskChallenges);
      logFailTestcase(temp, "Input RiskChallenges on Sale form failed!");
    }
    if (Arr) {
      temp = await saleForm.inputARRSalesOnSaleForm(Arr);
      logFailTestcase(temp, "Input Arr on Sale form failed!");
    }
    if (Maintenance) {
      temp = await saleForm.inputLicenseAndMaintenanceSalesOnSaleForm(Maintenance);
      logFailTestcase(temp, "Input License & Maintenance on Sale form failed!");
    }
    if (ProfessionalService) {
      temp = await saleForm.inputProfessionalServiceSalesOnSaleForm(ProfessionalService);
      logFailTestcase(temp, "Input ProfessionalService on Sale form failed!");
    }
    if (DealPeriod) {
      temp = await saleForm.inputDealPeriodSalesOnSaleForm(DealPeriod);
      logFailTestcase(temp, "Input DealPeriod on Sale form failed!");
    }
    if (Description) {
      temp = await saleForm.inputDescriptionSalesOnSaleForm(Description);
      logFailTestcase(temp, "Input Description on Sale form failed!");
    }


    temp = await globalPageObject.pressSaveForm();
    logFailTestcase(temp, "Can't press Save edit company sale!");
    await globalPageObject.waitForProgressBarLoaded_v2();
  }
});

Then("System shows updated person sale in the Sales list", async () => {
  const rows = loader(convertPathFileDataToDataRegression(fileDataCreate));
  let len = rows.length;
  await saleList.reloadSaleList();
  await globalPageObject.waitForProgressBarLoaded_v2();
  await globalPageObject.waitForProgressBarLoaded_v2();
  for (let i = len - 1, j = 1; i >= 0; i--, j++) {
    const Pipeline = rows[i].Pipeline;
    const Stage = rows[i].Stage;
    const SaleName = rows[i].SaleName;
    const Product = rows[i].Product;
    const SalesRep = rows[i].SalesRep;
    const Currency = rows[i].Currency;
    //const Amount = rows[i].Amount + ",00"; FOR PRODUCTION ONLY
    const Amount = rows[i].Amount;
    const ClosedDate = rows[i].ClosedDate;

    expectedSales = SaleName;
    expectedProduct = Product;
    expectedActivities = Pipeline;
    expectedSaleRep = SalesRep;
    expectedAmount = Amount;
    expectedCurrency = Currency;
    expectedClosedDate = ClosedDate;
    expectedStage = reformatSalesStage(Stage);

    await saleList.assertEditSale(j, expectedSales, expectedActivities, expectedSaleRep, expectedAmount, expectedCurrency, expectedClosedDate, expectedProduct, expectedStage);
  }
});

Then("System shows updated company sale in the Sales list", async () => {
  const rows = loader(convertPathFileDataToDataRegression(fileDataCreate));
  let len = rows.length;
  await saleList.reloadSaleList();
  await globalPageObject.waitForProgressBarLoaded_v2();
  await globalPageObject.waitForProgressBarLoaded_v2();
  for (let i = len - 1, j = 1; i >= 0; i--, j++) {
    const Pipeline = rows[i].Pipeline;
    const Stage = rows[i].Stage;
    const SaleName = rows[i].SaleName;
    const Product = rows[i].Product;
    const SalesRep = rows[i].SalesRep;
    const Currency = rows[i].Currency;
    //const Amount = rows[i].Amount + ",00"; FOR PRODUCTION ONLY
    const Amount = rows[i].Amount;
    const ClosedDate = rows[i].ClosedDate;

    expectedSales = SaleName;
    expectedActivities = Pipeline;
    expectedSaleRep = SalesRep;
    expectedAmount = Amount;
    expectedCurrency = Currency;
    expectedClosedDate = ClosedDate;
    expectedProduct = Product;
    expectedStage = reformatSalesStage(Stage);

    await saleList.assertEditSale(j, expectedSales, expectedActivities, expectedSaleRep, expectedAmount, expectedCurrency, expectedClosedDate, expectedProduct, expectedStage);
  }
});

Then("User deletes this sale {string}", async (filename) => {
  let nameSale
  await saleList.reloadSaleList();
  if (!fs.existsSync(filename)) {
    let data = await DataRepo.getInstance().getFieldValue(filename);
    nameSale = data.SalesName
    await saleList.pressDeleteSaleByName(nameSale)
  } else {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    let nameSale = rows[0].SaleName;
    await saleList.pressDeleteSaleByName(nameSale);

  }
  let temp = await globalPageObject.pressYesForm();
  logFailTestcase(temp, `Delete sale "${nameSale}" failed!`);
});

/*Begin Regression Test*/
When("User verifies UI at Sale list page", async () => {
  // Do nothing
});

Then("System shows buttons on top of sale table", async () => {
  let temp = await saleList.verifyButtonsOnTopOfSaleTable();
  logFailTestcase(temp, "Verify buttons on top of Sale table failed!");
});

Then("System shows sale table with full collumn", async () => {
  let temp = await saleList.verifyColumnsOfSaleTable();
  logFailTestcase(temp, "Verify columns of Sale table failed!");
});

Then("System shows pagination buttons under of sale table", async () => {
  let temp = await globalPagination.verifyPaginagtionButtonsAtMainList("Sale");
  logFailTestcase(temp, "Verify paginagtion buttons at Sale list: failed!");
});

Then("System shows or hides the column in the Sale list {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  let countError: number = 0;
  for (const row of rows) {
    let checkError = await accountList.assertColumn(row.Column, row.Uncheck);
    if (!checkError) {
      countError++;
    }
  }
  if (countError > 0) {
    fail("Show/Hide - Column: Testcase is failed!");
  } else {
    logSuccessMessage("Show/Hide - Column: Test Case is passed!");
  }
});

When("User deletes sales from csv file {string}", async (filename) => {
  let rows = loader(convertPathFileDataToDataRegression(filename));
  countError = 0;
  for (const row of rows) {
    let saleName = row.SaleName;
    let Type = row.Type;
    let TotalRecords_1 = await saleList.getNumberOfTotalRecords();
    let positionRow = -1;
    let temp = await saleList.pressDeleteSaleByName(saleName);
    if (temp === false) {
      // logFailTestcase(temp, `Delete sale with name ${saleName}`);
      logWarningMessage(`Can't press delete sale "${saleName}"`);
      countError++;
    } else {
      positionRow = temp;
    }

    temp = await globalPageObject.pressYesForm();
    if (temp === false) {
      // logFailTestcase(temp, `Can't press Yes to confirm delete ${saleName}`);
      logWarningMessage(`Can't press delete ${saleName}`);
      countError++;
    }

    if (!Type) {
      await globalPageObject.navigateToMainSaleList();
    }
    await saleList.reloadSaleList();

    let TotalRecords_2 = await saleList.getNumberOfTotalRecords();
    if ((await saleList.assertDeleteSaleByName(saleName, positionRow)) || TotalRecords_1 - TotalRecords_2 === 1) {
      //
    } else {
      logWarningMessage(`Delete sale "${saleName}" failed!`);
      countError++;
    }
  }
});

When("User deletes {string} sales on sale list", async (numberOfSale) => {
  for (let i = 1; i <= parseInt(numberOfSale); i++) {
    await saleList.pressDeleteSaleByRow(i);
    await globalPageObject.pressYesForm();
  }
});

Then("System does not show sales in Sale list", async () => {
  logFailTestcase(countError === 0);
});

Then("System shows company sale in Sales detail from csv file {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));

  let CompanyName = rows[0].CompanyName;
  const KAM = rows[0].KAM;
  const Pipeline = rows[0].Pipeline;
  const Stage = rows[0].Stage.split(" - ")[0]; ////
  const SaleName = rows[0].SaleName;
  const Product = rows[0].Product;
  const SalesRep = rows[0].SalesRep;
  const Currency = rows[0].Currency;
  const Amount = rows[0].Amount;
  const ClosedDate = rows[0].ClosedDate;
  const Probability = rows[0].Stage.split(" - ")[1];
  let temp = await saleList.openSaleDetailByName(SaleName);
  logFailTestcase(temp, `Can't open sale "${SaleName}"`);
  //Incase of create sale from existing company account
  if (!CompanyName) {
    CompanyName = rows[0].ChooseFromExistingAccount;
  }

  expectedAccount = CompanyName;

  await saleDetailsLeftSide.assertDetailSale(
    SaleName,
    expectedAccount,
    Pipeline,
    Stage,
    SalesRep,
    // Probability,
    ClosedDate,
    KAM,
    Currency,
    Amount,
    Product
  );

  //validate value for Custom field
  const AnnualContractValue = rows[0].AnnualContractValue;
  const CloseQuarter = rows[0].CloseQuarter;
  const Type = rows[0].Type;
  const DealSource = rows[0].DealSource;
  const ProductPL = rows[0].ProductPL;
  const DealStatus = rows[0].DealStatus;
  const Region = rows[0].Region;
  const Capex = rows[0].Capex;
  const RiskChallenges = rows[0].RiskChallenges;
  const Arr = rows[0].Arr;
  const Maintenance = rows[0].Maintenance;
  const ProfessionalService = rows[0].ProfessionalService;
  /*
    temp = await saleDetailsLeftSide.validateValueSaleDetail(AnnualContractValue ? AnnualContractValue.toString() : "N/A", "Annual Contract Value");
    logFailTestcase(temp, "Incorrect Annual Contract value");
  
    temp = await saleDetailsLeftSide.validateValueSaleDetail(CloseQuarter ? CloseQuarter.toString() : "N/A", "Close Quarter");
    logFailTestcase(temp, "Incorrect Close Quarter");
  
    temp = await saleDetailsLeftSide.validateValueSaleDetail(Type ? Type.toString() : "N/A", "Sales Type");
    logFailTestcase(temp, "Incorrect Sales Type");
  
    temp = await saleDetailsLeftSide.validateValueSaleDetail(DealSource ? DealSource.toString() : "N/A", "Deal Source");
    logFailTestcase(temp, "Incorrect Deal Source");
  
    temp = await saleDetailsLeftSide.validateValueSaleDetail(ProductPL ? ProductPL.toString() : "N/A", "Product P&L");
    logFailTestcase(temp, "Incorrect Product P&L");
  
    temp = await saleDetailsLeftSide.validateValueSaleDetail(DealStatus ? DealStatus.toString() : "N/A", "Sales Status");
    logFailTestcase(temp, "Incorrect Sales Status");
  
    temp = await saleDetailsLeftSide.validateValueSaleDetail(Region ? Region.toString() : "N/A", "Region");
    logFailTestcase(temp, "Incorrect Region");
  
    temp = await saleDetailsLeftSide.validateValueSaleDetail(Capex ? Capex.toString() : "N/A", "CAPEX");
    logFailTestcase(temp, "Incorrect CAPEX");
  
    temp = await saleDetailsLeftSide.validateValueSaleDetail(RiskChallenges ? RiskChallenges.toString() : "N/A", "Risks / Challenges");
    logFailTestcase(temp, "Incorrect Risks / Challenges");
  
    temp = await saleDetailsLeftSide.validateValueSaleDetail(Arr ? Arr.toString() : "N/A", "ARR");
    logFailTestcase(temp, "Incorrect ARR");
  
    temp = await saleDetailsLeftSide.validateValueSaleDetail(Maintenance ? Maintenance.toString() : "N/A", "License & Maintenance");
    logFailTestcase(temp, "Incorrect License & Maintenance");
  
    temp = await saleDetailsLeftSide.validateValueSaleDetail(ProfessionalService ? ProfessionalService.toString() : "N/A", "Professional Service");
    logFailTestcase(temp, "Incorrect Professional Service");*/
});

Then("System shows person sale in Sales detail from csv file {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  // Basic filed
  const SaleName = rows[0].SaleName;
  const FirstName = rows[0].FirstName;
  const LastName = rows[0].LastName;
  const KAM = rows[0].KAM;
  const Pipeline = rows[0].Pipeline;
  const Stage = rows[0].Stage.split(" - ")[0]; ////
  const Amount = rows[0].Amount;
  const Currency = rows[0].Currency;
  const Product = rows[0].Product;
  const ClosedDate = rows[0].ClosedDate;
  const SalesRep = rows[0].SalesRep;

  // const Probability = (rows[0].Stage.split(" - "))[1];
  let temp = await saleList.openSaleDetailByName(SaleName);
  logFailTestcase(temp, `Can't open sale "${SaleName}"`);

  expectedAccount = (FirstName + " " + LastName).trim();
  if (!FirstName && !LastName) {
    expectedAccount = rows[0].ChooseFromExistingAccount;
  }

  //Validate value for basic fields
  await saleDetailsLeftSide.assertDetailSale(
    SaleName,
    expectedAccount,
    Pipeline,
    Stage,
    SalesRep,
    // Probability,
    ClosedDate,
    KAM,
    Currency,
    Amount,
    Product
  );

  //validate value for Custom field
  const AnnualContractValue = rows[0].AnnualContractValue;
  const CloseQuarter = rows[0].CloseQuarter;
  const Type = rows[0].Type;
  const DealSource = rows[0].DealSource;
  const ProductPL = rows[0].ProductPL;
  const DealStatus = rows[0].DealStatus;
  const Region = rows[0].Region;
  const Capex = rows[0].Capex;
  const RiskChallenges = rows[0].RiskChallenges;
  const Arr = rows[0].Arr;
  const Maintenance = rows[0].Maintenance;
  const ProfessionalService = rows[0].ProfessionalService;

  // temp = await saleDetailsLeftSide.validateValueSaleDetail(AnnualContractValue ? AnnualContractValue.toString() : "N/A", "Annual Contract Value");
  // logFailTestcase(temp, "Incorrect Annual Contract value");

  // temp = await saleDetailsLeftSide.validateValueSaleDetail(CloseQuarter ? CloseQuarter.toString() : "N/A", "Close Quarter");
  // logFailTestcase(temp, "Incorrect Close Quarter");

  // temp = await saleDetailsLeftSide.validateValueSaleDetail(Type ? Type.toString() : "N/A", "Sales Type");
  // logFailTestcase(temp, "Incorrect Sales Type");

  // temp = await saleDetailsLeftSide.validateValueSaleDetail(DealSource ? DealSource.toString() : "N/A", "Deal Source");
  // logFailTestcase(temp, "Incorrect Deal Source");

  // temp = await saleDetailsLeftSide.validateValueSaleDetail(ProductPL ? ProductPL.toString() : "N/A", "Product P&L");
  // logFailTestcase(temp, "Incorrect Product P&L");

  // temp = await saleDetailsLeftSide.validateValueSaleDetail(DealStatus ? DealStatus.toString() : "N/A", "Sales Status");
  // logFailTestcase(temp, "Incorrect Sales Status");

  // temp = await saleDetailsLeftSide.validateValueSaleDetail(Region ? Region.toString() : "N/A", "Region");
  // logFailTestcase(temp, "Incorrect Region");

  // temp = await saleDetailsLeftSide.validateValueSaleDetail(Capex ? Capex.toString() : "N/A", "CAPEX");
  // logFailTestcase(temp, "Incorrect CAPEX");

  // temp = await saleDetailsLeftSide.validateValueSaleDetail(RiskChallenges ? RiskChallenges.toString() : "N/A", "Risks / Challenges");
  // logFailTestcase(temp, "Incorrect Risks / Challenges");

  // temp = await saleDetailsLeftSide.validateValueSaleDetail(Arr ? Arr.toString() : "N/A", "ARR");
  // logFailTestcase(temp, "Incorrect ARR");

  // temp = await saleDetailsLeftSide.validateValueSaleDetail(Maintenance ? Maintenance.toString() : "N/A", "License & Maintenance");
  // logFailTestcase(temp, "Incorrect License & Maintenance");

  // temp = await saleDetailsLeftSide.validateValueSaleDetail(ProfessionalService ? ProfessionalService.toString() : "N/A", "Professional Service");
  // logFailTestcase(temp, "Incorrect Professional Service");
});

Given("User drags and drops a sale card between columns {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const SourceSaleName = rows[0].SourceSaleName;
  const SourceColumn = rows[0].SourceColumn;
  const DestinationColumn = rows[0].DestinationColumn;

  let temp = await saleCard.dragAndDropSaleCardView(SourceSaleName, SourceColumn, DestinationColumn);
  logFailTestcase(temp, `Drag and drop sale "${SourceSaleName} failed!`);
});

Given("User opens a sale from precondition steps {string}", async function (filename: string) {
  let temp
  if (!fs.existsSync(filename)) {
    let data = await DataRepo.getInstance().getFieldValue(filename);
    await globalPageObject.reloadTable(3000);
    temp = await saleList.openSaleDetailByName(data.SalesName);
  } else {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    temp = await saleList.openSaleDetailByName(rows[0].SelectedSale);
  }
  logFailTestcase(temp);
});

Then("System shows a sale in Sales detail {string}", async function (dataKey: string) {
  try {
    let data = await DataRepo.getInstance().getFieldValue(dataKey);
    await saleDetailsLeftSide.validateValueSaleDetail(data.SalesName, "Sales Name")
    await saleDetailsLeftSide.validateValueSaleDetail(data.FirstName + " " + data.LastName, "Account")
    await saleDetailsLeftSide.validateValueSaleDetail(data.KAM, "KAM")
    await saleDetailsLeftSide.validateValueSaleDetail(data.Pipeline, "Pipeline")
    await saleDetailsLeftSide.validateValueSaleDetail(data.ExpectedSalesStage.split(" - ")[1], "Sales Stage")
    await saleDetailsLeftSide.validateValueSaleDetail(data.Product, "Product")
    await saleDetailsLeftSide.validateValueSaleDetail(data.CloseDate, "Closed Date")
    await saleDetailsLeftSide.validateValueSaleDetail(data.SalesRep, "Sales Rep.")
    await saleDetailsLeftSide.validateValueSaleDetail(data.Description, "Description")
  } catch (error) {
    logFailTestcase(false, (error as Error).message + "\r\n" + (error as Error).stack);
  }
})

Given(`User opens the first sales from list`, async () => {
  let temp = await saleList.openSaleDetail(1);
  logFailTestcase(temp);
});
//Sale summary
When("User verifies widgets at Summary tab of sale", async () => {
  let countError = 0;

  if (!(await accountTabSummary.assertEmptyNotesWidget())) {
    logWarningMessage("There are no Empty Note widget in sumary tab!");
    countError++;
  }

  if (!(await accountTabSummary.assertEmptyCasesWidget())) {
    logWarningMessage("There are no Empty Case widget in sumary tab!");
    countError++;
  }

  logFailTestcase(countError === 0);
});

When("User verifies selecting item of process bar at sale Summary tab", async () => {
  let temp = await saleTabSummary.checkSelectingItemAtSaleProcessBar();
  logFailTestcase(temp, "Process bar at Sale Summary tab shows incorrect!");
});

When("User selects other items of process bar at sale Summary tab {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  for (const row of rows) {
    const stage = row.Stage;
    const probability = row.Probability;
    let temp = await saleTabSummary.clickItemAtSaleProcessBar(stage);
    logFailTestcase(temp, `Click stage "${stage}" failed!`);

    temp = await saleDetailsLeftSide.checkStageAndProbability(stage, probability);
    logFailTestcase(temp);
  }
});

Then("System changes sale stage and sale probability", async () => {
  logSuccessMessage("\tTest case passed!");
});

Then("System shows contact list at Sale detail from csv file {string}", async (filename) => {
  let rows = loader(convertPathFileDataToDataRegression(filename));
  let len = rows.length;
  let countError = 0;
  let arrayContacts: any = [];

  if (len > 0) {
    for (const row of rows) {
      let temp = {
        Name: "",
        Phone: "",
        Email: "",
      };
      temp.Name = (row.FirstName || row.FirstNameContact) + " " + (row.LastName || row.LastNameContact);
      if (row.Phone || row.PhoneContact) {
        temp.Phone = row.Phone || row.PhoneContact;
      } else {
        temp.Phone = "N/A";
      }
      if (row.Email || row.EmailContact) {
        temp.Email = row.Email || row.EmailContact;
      } else {
        temp.Email = "N/A";
      }
      arrayContacts.push(temp); //add new contact to the beginning of arrayContacts (Opposite with Push)
    }
    if (!(await saleTabContactList.assertContactsListAtSaleDetail(arrayContacts))) {
      logWarningMessage("Assert Contact list at sale detail: failed!");
      countError++;
    }
  }

  if (countError > 0) {
    logFailTestcase(false);
  }
});

/*Begin: Sale card view */
Given("User navigates to Sale card view", async () => {
  let temp = await saleList.navigateToSalesCardViewList();
  logFailTestcase(temp, "Navigates to Sale card view failed!");

  const saleType = "All sales";
  logInfoMessage(`User select sale card type is "${saleType}"`);
  temp = await saleCard.inputDropdownSaleCardType(saleType);
  logFailTestcase(temp, `Input dropdown Sale card type "${saleType}" failed!`);
});

When("User selects a pipeline at filter {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const pipeline = rows[0].Pipeline;
  let temp = await saleCard.selectPipelineFilterSaleCardView(pipeline);
  logFailTestcase(temp, `Select pipeline "${pipeline}" failed!`);
});

Then("User verifies info at Stage columns {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const len = rows.length;
  for (let i = 0; i < len; i++) {
    const StageName = rows[i].StageName;
    const NumberOfSales = rows[i].NumberOfSales;
    let TotalAmount = rows[i].Currency + ": " + numberToCurrency(rows[i].TotalAmount);
    let AnnualContract = rows[i].Currency + ": " + numberToCurrency(rows[i].AnnualContract);
    if (TotalAmount === ": ") {
      TotalAmount = "0";
    }
    if (AnnualContract === ": ") {
      AnnualContract = "0";
    }

    let temp = await saleCard.checkColumnExistByNameAtSaleCardview(StageName);
    logFailTestcase(temp, `Not found Sale card column with name stage "${StageName}"`);

    temp = await saleCard.verifyInfoStageColumnAtSaleCarview(StageName, NumberOfSales, TotalAmount, AnnualContract);
    logFailTestcase(temp);
  }
});
/* End: Sale card view*/

/*Begin: validation sale*/

When("User inputs invalid person sale data from csv file {string}", async (filename: string) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  fileDataCreate = filename;
  for (const row of rows) {
    let temp = await saleList.openCreateSalesPersonForm();
    logFailTestcase(temp, "Can't open Create Sale Person form!");
    //FirstName,LastName,SSN,Email,KAM,Pipeline,Stage,SaleName,SalesRep,Currency,Amount,ClosedDate

    const FirstName = row.FirstName;
    const LastName = row.LastName;

    const SSN = row.NIN;
    const Email = row.Email;
    const KAM = row.KAM;

    const Pipeline = row.Pipeline;
    const Stage = row.Stage;
    const SaleName = row.SaleName;
    const Product = row.Product;
    const SalesRep = row.SalesRep;
    const Currency = row.Currency;
    const Amount = row.Amount;
    const ClosedDate = row.ClosedDate;
    const AnnualContractValue = row.AnnualContractValue;
    const CloseQuarter = row.CloseQuarter;
    const Type = row.Type;
    const DealSource = row.DealSource;
    const ProductPL = row.ProductPL;
    const DealStatus = row.DealStatus;
    const Region = row.Region;
    const Capex = row.Capex;
    const RiskChallenges = row.RiskChallenges;
    const Arr = row.Arr;
    const Maintenance = row.Maintenance;
    const ProfessionalService = row.ProfessionalService;
    const DealPeriod = row.DealPeriod;
    const Description = row.Description;

    expectedSales = SaleName;
    expectedAccount = FirstName + " " + LastName;
    expectedActivities = Pipeline;
    expectedSaleRep = SalesRep;
    expectedKAM = KAM;
    expectedAmount = Amount;
    expectedCurrency = Currency;
    expectedClosedDate = ClosedDate;
    expectedStage = Stage;

    if (FirstName) {
      temp = await saleForm.inputFirstNameAccountInfoOnSaleForm(FirstName);
      logFailTestcase(temp, "Input FirstName on Sale form failed!");
    }
    if (LastName) {
      temp = await saleForm.inputLastNameAccountInfoOnSaleForm(LastName);
      logFailTestcase(temp, "Input LastName on Sale form failed!");
    }
    if (SSN) {
      temp = await saleForm.inputSSN_ORGAccountInfoOnSaleForm(SSN);
      logFailTestcase(temp, "Input SSN on Sale form failed!");
    }
    if (Email) {
      temp = await saleForm.inputEmailAccountInfoOnSaleForm(Email);
      logFailTestcase(temp, "Input Email on Sale form failed!");
    }
    if (KAM) {
      temp = await saleForm.inputKAMAccountInfoOnSaleForm(KAM);
      logFailTestcase(temp, "Input KAM on Sale form failed!");
    }
    if (Pipeline) {
      temp = await saleForm.inputPipelineSalesOnSaleForm(Pipeline);
      logFailTestcase(temp, "Input Pipeline on Sale form failed!");
    }
    if (Stage) {
      temp = await saleForm.inputSalesStageSalesAccountInfoOnSaleForm(Stage);
      logFailTestcase(temp, "Input Stage on Sale form failed!");
    }
    if (SaleName) {
      temp = await saleForm.inputSaleNameSalesOnSaleForm(SaleName);
      logFailTestcase(temp, "Input SaleName on Sale form failed!");
    }
    if (Product) {
      temp = await saleForm.inputProductSalesOnSaleForm(Product);
      logFailTestcase(temp, "Input Product on Sale form failed!");
    }
    if (SalesRep) {
      temp = await saleForm.inputSalesRepSalesOnSaleForm(SalesRep);
      logFailTestcase(temp, "Input SalesRep on Sale form failed!");
    }
    if (Currency) {
      temp = await saleForm.inputCurrencySalesOnSaleForm(Currency);
      logFailTestcase(temp, "Input Currency on Sale form failed!");
    }
    if (Amount) {
      temp = await saleForm.inputTotalDealAmountSalesOnSaleForm(Amount);
      logFailTestcase(temp, "Input Amount on Sale form failed!");
    }
    if (ClosedDate) {
      temp = await saleForm.inputClosedDateSalesOnSaleForm(ClosedDate);
      logFailTestcase(temp, "Input ClosedDate on Sale form failed!");
    }
    if (AnnualContractValue) {
      temp = await saleForm.inputAnnualContractValueSalesOnSaleForm(AnnualContractValue);
      logFailTestcase(temp, "Input AnnualContractValue on Sale form failed!");
    }
    if (CloseQuarter) {
      temp = await saleForm.inputCloseQuarterSalesOnSaleForm(CloseQuarter);
      logFailTestcase(temp, "Input CloseQuarter on Sale form failed!");
    }
    if (Type) {
      temp = await saleForm.inputSalesTypeSalesOnSaleForm(Type);
      logFailTestcase(temp, "Input Type  on Sale form failed!");
    }
    if (DealSource) {
      temp = await saleForm.inputDealSourceSalesOnSaleForm(DealSource);
      logFailTestcase(temp, "Input DealSource on Sale form failed!");
    }
    if (ProductPL) {
      temp = await saleForm.inputProductPlSalesOnSaleForm(ProductPL);
      logFailTestcase(temp, "Input ProductPL on Sale form failed!");
    }
    if (DealStatus) {
      temp = await saleForm.inputDealStatusSalesOnSaleForm(DealStatus);
      logFailTestcase(temp, "Input DealStatus on Sale form failed!");
    }
    if (Region) {
      temp = await saleForm.inputRegionSalesOnSaleForm(Region);
      logFailTestcase(temp, "Input Region on Sale form failed!");
    }
    if (Capex) {
      temp = await saleForm.inputCAPEXSalesOnSaleForm(Capex);
      logFailTestcase(temp, "Input Capex on Sale form failed!");
    }
    if (RiskChallenges) {
      temp = await saleForm.inputRisksChallengesSalesOnSaleForm(RiskChallenges);
      logFailTestcase(temp, "Input RiskChallenges on Sale form failed!");
    }
    if (Arr) {
      temp = await saleForm.inputARRSalesOnSaleForm(Arr);
      logFailTestcase(temp, "Input  on Sale form failed!");
    }
    if (Maintenance) {
      temp = await saleForm.inputLicenseAndMaintenanceSalesOnSaleForm(Maintenance);
      logFailTestcase(temp, "Input Maintenance on Sale form failed!");
    }
    if (ProfessionalService) {
      temp = await saleForm.inputProfessionalServiceSalesOnSaleForm(ProfessionalService);
      logFailTestcase(temp, "Input ProfessionalService on Sale form failed!");
    }
    if (DealPeriod) {
      temp = await saleForm.inputDealPeriodSalesOnSaleForm(DealPeriod);
      logFailTestcase(temp, "Input DealPeriod on Sale form failed!");
    }
    if (Description) {
      temp = await saleForm.inputDescriptionSalesOnSaleForm(Description);
      logFailTestcase(temp, "Input Description on Sale form failed!");
    }


    temp = await globalPageObject.pressSaveForm();
    logFailTestcase(temp, "Can't press Save create sale person!");
    await globalPageObject.waitForProgressBarLoaded_v2();


    temp = await saleForm.checkValidationErrorMessageExisted();
    logFailTestcase(temp, `Sale: "${SaleName}" -  Can't find any validation error message in sale form!`);

    temp = await globalPageObject.pressCancelForm();
    logFailTestcase(temp, "Press Cancel button on Sale form failed!");
    await globalPageObject.waitForProgressBarLoaded_v2();
  }
});

When("User inputs invalid company sale data from csv file {string}", async (filename: string) => {
  let rows = loader(convertPathFileDataToDataRegression(filename));
  fileDataCreate = filename;
  for (const row of rows) {
    let temp = await saleList.openCreateSalesCompanyForm();
    logFailTestcase(temp, "Can't open Create Sales company form!");
    //CompanyName	Org	EmailAccountInfo	KAM	FirstName	LastName	EmailContact	PhoneContact	Pipeline	Stage	SaleName	SalesRep	Currency	Amount	ClosedDate

    const CompanyName = row.CompanyName;
    const Org = row.Org;
    const EmailAccountInfo = row.EmailAccountInfo;
    const KAM = row.KAM;
    const FirstName = row.FirstName;
    const LastName = row.LastName;
    const EmailContact = row.EmailContact;
    const PhoneContact = row.PhoneContact;
    const Pipeline = row.Pipeline;
    const Stage = row.Stage; ////
    const SaleName = row.SaleName;
    const Product = row.Product;
    const SalesRep = row.SalesRep;
    const Currency = row.Currency;
    const Amount = row.Amount;
    const ClosedDate = row.ClosedDate;
    const AnnualContractValue = row.AnnualContractValue;
    const CloseQuarter = row.CloseQuarter;
    const Type = row.Type;
    const DealSource = row.DealSource;
    const ProductPL = row.ProductPL;
    const DealStatus = row.DealStatus;
    const Region = row.Region;
    const Capex = row.Capex;
    const RiskChallenges = row.RiskChallenges;
    const Arr = row.Arr;
    const Maintenance = row.Maintenance;
    const ProfessionalService = row.ProfessionalService;
    const DealPeriod = row.DealPeriod;
    const Description = row.Description;

    expectedSales = SaleName;
    expectedAccount = FirstName + " " + LastName;
    expectedActivities = Pipeline;
    expectedSaleRep = SalesRep;
    expectedKAM = KAM;
    expectedAmount = Amount;
    expectedCurrency = Currency;
    expectedClosedDate = ClosedDate;
    expectedStage = Stage;

    if (CompanyName) {
      temp = await saleForm.inputCompanyNameAccountInfoOnSaleForm(CompanyName);
      logFailTestcase(temp, "Input CompanyName on Sale form failed!");
    }
    if (Org) {
      temp = await saleForm.inputSSN_ORGAccountInfoOnSaleForm(Org);
      logFailTestcase(temp, "Input OrgNo on Sale form failed!");
    }
    if (EmailAccountInfo) {
      temp = await saleForm.inputEmailAccountInfoOnSaleForm(EmailAccountInfo);
      logFailTestcase(temp, "Input EmailAccountInfo on Sale form failed!");
    }
    if (KAM) {
      temp = await saleForm.inputKAMAccountInfoOnSaleForm(KAM);
      logFailTestcase(temp, "Input KAM on Sale form failed!");
    }
    if (FirstName) {
      temp = await saleForm.inputFirstNameContactOnSaleForm(FirstName);
      logFailTestcase(temp, "Input FirstName contact on Sale form failed!");
    }
    if (LastName) {
      temp = await saleForm.inputLastNameContactOnSaleForm(LastName);
      logFailTestcase(temp, "Input Last name on Sale form failed!");
    }
    if (EmailContact) {
      temp = await saleForm.inputEmailContactOnSaleForm(EmailContact);
      logFailTestcase(temp, "Input EmailContact on Sale form failed!");
    }
    if (PhoneContact) {
      temp = await saleForm.inputPhoneContactOnSaleForm(PhoneContact);
      logFailTestcase(temp, "Input PhoneContact on Sale form failed!");
    }



    if (Pipeline) {
      temp = await saleForm.inputPipelineSalesOnSaleForm(Pipeline);
      logFailTestcase(temp, "Input Pipeline on Sale form failed!");
    }
    if (Stage) {
      temp = await saleForm.inputSalesStageSalesAccountInfoOnSaleForm(Stage);
      logFailTestcase(temp, "Input Stage on Sale form failed!");
    }
    if (SaleName) {
      temp = await saleForm.inputSaleNameSalesOnSaleForm(SaleName);
      logFailTestcase(temp, "Input SaleName on Sale form failed!");
    }
    if (Product) {
      temp = await saleForm.inputProductSalesOnSaleForm(Product);
      logFailTestcase(temp, "Input Product on Sale form failed!");
    }
    if (SalesRep) {
      temp = await saleForm.inputSalesRepSalesOnSaleForm(SalesRep);
      logFailTestcase(temp, "Input SalesRep on Sale form failed!");
    }
    if (Currency) {
      temp = await saleForm.inputCurrencySalesOnSaleForm(Currency);
      logFailTestcase(temp, "Input Currency on Sale form failed!");
    }
    if (Amount) {
      temp = await saleForm.inputTotalDealAmountSalesOnSaleForm(Amount);
      logFailTestcase(temp, "Input Amount on Sale form failed!");
    }
    if (ClosedDate) {
      temp = await saleForm.inputClosedDateSalesOnSaleForm(ClosedDate);
      logFailTestcase(temp, "Input ClosedDate on Sale form failed!");
    }
    if (AnnualContractValue) {
      temp = await saleForm.inputAnnualContractValueSalesOnSaleForm(AnnualContractValue);
      logFailTestcase(temp, "Input AnnualContractValue on Sale form failed!");
    }
    if (CloseQuarter) {
      temp = await saleForm.inputCloseQuarterSalesOnSaleForm(CloseQuarter);
      logFailTestcase(temp, "Input CloseQuarter on Sale form failed!");
    }
    if (Type) {
      temp = await saleForm.inputSalesTypeSalesOnSaleForm(Type);
      logFailTestcase(temp, "Input Type  on Sale form failed!");
    }
    if (DealSource) {
      temp = await saleForm.inputDealSourceSalesOnSaleForm(DealSource);
      logFailTestcase(temp, "Input DealSource on Sale form failed!");
    }
    if (ProductPL) {
      temp = await saleForm.inputProductPlSalesOnSaleForm(ProductPL);
      logFailTestcase(temp, "Input ProductPL on Sale form failed!");
    }
    if (DealStatus) {
      temp = await saleForm.inputDealStatusSalesOnSaleForm(DealStatus);
      logFailTestcase(temp, "Input DealStatus on Sale form failed!");
    }
    if (Region) {
      temp = await saleForm.inputRegionSalesOnSaleForm(Region);
      logFailTestcase(temp, "Input Region on Sale form failed!");
    }
    if (Capex) {
      temp = await saleForm.inputCAPEXSalesOnSaleForm(Capex);
      logFailTestcase(temp, "Input Capex on Sale form failed!");
    }
    if (RiskChallenges) {
      temp = await saleForm.inputRisksChallengesSalesOnSaleForm(RiskChallenges);
      logFailTestcase(temp, "Input RiskChallenges on Sale form failed!");
    }
    if (Arr) {
      temp = await saleForm.inputARRSalesOnSaleForm(Arr);
      logFailTestcase(temp, "Input  on Sale form failed!");
    }
    if (Maintenance) {
      temp = await saleForm.inputLicenseAndMaintenanceSalesOnSaleForm(Maintenance);
      logFailTestcase(temp, "Input Maintenance on Sale form failed!");
    }
    if (ProfessionalService) {
      temp = await saleForm.inputProfessionalServiceSalesOnSaleForm(ProfessionalService);
      logFailTestcase(temp, "Input ProfessionalService on Sale form failed!");
    }
    if (DealPeriod) {
      temp = await saleForm.inputDealPeriodSalesOnSaleForm(DealPeriod);
      logFailTestcase(temp, "Input DealPeriod on Sale form failed!");
    }
    if (Description) {
      temp = await saleForm.inputDescriptionSalesOnSaleForm(Description);
      logFailTestcase(temp, "Input Description on Sale form failed!");
    }


    temp = await globalPageObject.pressSaveForm();
    logFailTestcase(temp, "Can't press Save create sale person!");
    await globalPageObject.waitForProgressBarLoaded_v2();


    temp = await saleForm.checkValidationErrorMessageExisted();
    logFailTestcase(temp, `Sale: "${SaleName}" -  Can't find any validation error message in sale form!`);

    temp = await globalPageObject.pressCancelForm();
    logFailTestcase(temp, "Press Cancel button on Sale form failed!");
    await globalPageObject.waitForProgressBarLoaded_v2();
  }
});
When("User updates a sale from precondition steps with invalid data {string}", async (filename: string) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  fileDataCreate = filename;
  await saleList.reloadSaleList();
  let index = 1;
  for (let row of rows) {
    logWarningMessage(`Checking line "${index++}" file csv...`);
    let temp = await saleList.openEditSalesForm();
    logFailTestcase(temp, "Can't open edit sale person form!");

    const Pipeline = row.Pipeline;
    const Stage = row.Stage;
    const SaleName = row.SaleName;
    const Product = row.Product;
    const SalesRep = row.SalesRep;
    const Currency = row.Currency;
    const Amount = row.Amount;
    const ClosedDate = row.ClosedDate;
    const AnnualContractValue = row.AnnualContractValue;
    const CloseQuarter = row.CloseQuarter;
    const Type = row.Type;
    const DealSource = row.DealSource;
    const ProductPL = row.ProductPL;
    const DealStatus = row.DealStatus;
    const Region = row.Region;
    const Capex = row.Capex;
    const RiskChallenges = row.RiskChallenges;
    const Arr = row.Arr;
    const Maintenance = row.Maintenance;
    const ProfessionalService = row.ProfessionalService;
    const DealPeriod = row.DealPeriod;
    const Description = row.Description;

    // Clear old data
    temp = await saleForm.clearOldDataOnSaleForm();
    logFailTestcase(temp, "Clear old data on Sale form failed!");

    if (Pipeline) {
      temp = await saleForm.inputPipelineSalesOnSaleForm(Pipeline);
      logFailTestcase(temp, "Input Pipeline on Sale form failed!");
    }
    if (Stage) {
      temp = await saleForm.inputSalesStageSalesAccountInfoOnSaleForm(Stage);
      logFailTestcase(temp, "Input Stage on Sale form failed!");
    }
    if (SaleName) {
      temp = await saleForm.inputSaleNameSalesOnSaleForm(SaleName);
      logFailTestcase(temp, "Input SaleName on Sale form failed!");
    }
    if (Product) {
      temp = await saleForm.inputProductSalesOnSaleForm(Product);
      logFailTestcase(temp, "Input Product on Sale form failed!");
    }
    if (SalesRep) {
      temp = await saleForm.inputSalesRepSalesOnSaleForm(SalesRep);
      logFailTestcase(temp, "Input SalesRep on Sale form failed!");
    }
    if (Currency) {
      temp = await saleForm.inputCurrencySalesOnSaleForm(Currency);
      logFailTestcase(temp, "Input Currency on Sale form failed!");
    }
    if (Amount) {
      temp = await saleForm.inputTotalDealAmountSalesOnSaleForm(Amount);
      logFailTestcase(temp, "Input Amount on Sale form failed!");
    }
    if (ClosedDate) {
      temp = await saleForm.inputClosedDateSalesOnSaleForm(ClosedDate);
      logFailTestcase(temp, "Input ClosedDate on Sale form failed!");
    }
    if (AnnualContractValue) {
      temp = await saleForm.inputAnnualContractValueSalesOnSaleForm(AnnualContractValue);
      logFailTestcase(temp, "Input AnnualContractValue on Sale form failed!");
    }
    if (CloseQuarter) {
      temp = await saleForm.inputCloseQuarterSalesOnSaleForm(CloseQuarter);
      logFailTestcase(temp, "Input CloseQuarter on Sale form failed!");
    }
    if (Type) {
      temp = await saleForm.inputSalesTypeSalesOnSaleForm(Type);
      logFailTestcase(temp, "Input Type on Sale form failed!");
    }
    if (DealSource) {
      temp = await saleForm.inputDealSourceSalesOnSaleForm(DealSource);
      logFailTestcase(temp, "Input DealSource on Sale form failed!");
    }
    if (ProductPL) {
      temp = await saleForm.inputProductPlSalesOnSaleForm(ProductPL);
      logFailTestcase(temp, "Input ProductPL on Sale form failed!");
    }
    if (DealStatus) {
      temp = await saleForm.inputDealStatusSalesOnSaleForm(DealStatus);
      logFailTestcase(temp, "Input DealStatus on Sale form failed!");
    }
    if (Region) {
      temp = await saleForm.inputRegionSalesOnSaleForm(Region);
      logFailTestcase(temp, "Input Region on Sale form failed!");
    }
    if (Capex) {
      temp = await saleForm.inputCAPEXSalesOnSaleForm(Capex);
      logFailTestcase(temp, "Input Capex on Sale form failed!");
    }
    if (Currency) {
      temp = await saleForm.inputCurrencySalesOnSaleForm(Currency);
      logFailTestcase(temp, "Input Currency on Sale form failed!");
    }
    if (RiskChallenges) {
      temp = await saleForm.inputRisksChallengesSalesOnSaleForm(RiskChallenges);
      logFailTestcase(temp, "Input RiskChallenges on Sale form failed!");
    }
    if (Arr) {
      temp = await saleForm.inputARRSalesOnSaleForm(Arr);
      logFailTestcase(temp, "Input Arr on Sale form failed!");
    }
    if (Maintenance) {
      temp = await saleForm.inputLicenseAndMaintenanceSalesOnSaleForm(Maintenance);
      logFailTestcase(temp, "Input License & Maintenance on Sale form failed!");
    }
    if (ProfessionalService) {
      temp = await saleForm.inputProfessionalServiceSalesOnSaleForm(ProfessionalService);
      logFailTestcase(temp, "Input ProfessionalService on Sale form failed!");
    }
    if (DealPeriod) {
      temp = await saleForm.inputDealPeriodSalesOnSaleForm(DealPeriod);
      logFailTestcase(temp, "Input DealPeriod on Sale form failed!");
    }
    if (Description) {
      temp = await saleForm.inputDescriptionSalesOnSaleForm(Description);
      logFailTestcase(temp, "Input Description on Sale form failed!");
    }



    temp = await globalPageObject.pressSaveForm();
    logFailTestcase(temp, "Can't press Save!");
    await globalPageObject.waitForProgressBarLoaded_v2();

    temp = await saleForm.checkValidationErrorMessageExisted();
    logFailTestcase(temp, `Sale: "${SaleName}" -  Can't find any validation error message in sale form!`);

    temp = await globalPageObject.pressCancelForm();
    logFailTestcase(temp, "Press Cancel button on Sale form failed!");
    await globalPageObject.waitForProgressBarLoaded_v2();
  }
});
When("", async (fileName) => {

})

Then("System doesn't show sale in sale list {string}", async (filename) => {
  let temp
  let SaleName
  await saleList.reloadSaleList()
  if (!fs.existsSync(filename)) {
    let data = await DataRepo.getInstance().getFieldValue(filename);
    SaleName = data.SalesName
    temp = await saleList.checkSaleWithNameNotExisted(SaleName)
  } else {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    for (const row of rows) {
      SaleName = row.SaleName;
      temp = await saleList.checkSaleWithNameNotExisted(SaleName);
    }
  }
  logFailTestcase(temp, `Sale "${SaleName}" is found at Sale list!`);
});

Then("User opens Edit sale form {string}", async (filename: string) => {
  if (!(fs.existsSync(filename))) {
    let data = await DataRepo.getInstance().getFieldValue(filename);
    await globalPageObject.reloadTable(3000);
    let temp = await saleList.openEditSalesFormByName(data.SalesName);
    logFailTestcase(temp, "Cannot open edit sale form");
  } else {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const saleName = row.SaleName;
    await globalPageObject.reloadTable(3000);
    let temp = await saleList.openEditSalesFormByName(saleName);
    logFailTestcase(temp, "Cannot open edit sale form");
  }
});

Then("User verifies info on Edit sale form {string}", async (filename: string) => {

  await globalPageObject.waitForProgressBarLoaded_v2();
  const row = loader(convertPathFileDataToDataRegression(filename))[0];

  const Pipeline = row.Pipeline;
  const Stage = row.Stage;
  const SaleName = row.SaleName;
  const Product = row.Product;
  const SalesRep = row.SalesRep;
  const Currency = row.Currency;
  const Amount = numberToCurrency(row.Amount).split(getCurrencyDecimalSeparator())[0];
  const ClosedDate = row.ClosedDate;
  const Team = row.Team;
  const TeamMember = row.TeamMember;
  const Phone = row.Phone;
  const TimeToCall = row.TimeToCall;
  const AnnualContractValue = row.AnnualContractValue;
  const CloseQuarter = row.CloseQuarter;
  const Type = row.Type;
  const DealSource = row.DealSource;
  const ProductPL = row.ProductPL;
  const DealStatus = row.DealStatus;
  const Region = row.Region;
  const Capex = row.Capex;
  const RiskChallenges = row.RiskChallenges;
  const Arr = row.Arr;
  const Maintenance = row.Maintenance;
  const ProfessionalService = row.ProfessionalService;
  const DealPeriod = row.DealPeriod;
  const Description = row.Description;
  let temp = true;

  if (Pipeline) {
    let temp = await saleForm.validateValueSaleForm(Pipeline, "Pipeline");
    logFailTestcase(temp, "Incorrect Pipeline");
  }

  if (Stage) {
    temp = await saleForm.validateValueSaleForm(Stage, "Sales Stage");
    logFailTestcase(temp, "Incorrect Sales Stage");
  }

  if (SaleName) {
    temp = await saleForm.validateValueSaleForm(SaleName, "Sales Name");
    logFailTestcase(temp, "Incorrect Sales Name");
  }

  if (SalesRep) {
    temp = await saleForm.validateValueSaleForm(SalesRep, "Sales Rep.");
    logFailTestcase(temp, "Incorrect Sales Rep.");
  }

  if (Product) {
    temp = await saleForm.validateValueSaleForm(Product, "Product");
    logFailTestcase(temp, "Incorrect Product");
  }

  if (ClosedDate) {
    temp = await saleForm.validateValueSaleForm(ClosedDate, "Close Date");
    logFailTestcase(temp, "Incorrect Close Date");
  }
  if (Team) {
    temp = await saleForm.validateValueSaleForm(Team, "Team");
    logFailTestcase(temp, "Incorrect Team");
  }
  if (TeamMember) {
    temp = await saleForm.validateValueSaleForm(TeamMember, "Team Member");
    logFailTestcase(temp, "Incorrect Team Member");
  }
  if (Phone) {
    temp = await saleForm.validateValueSaleForm(Phone, "Phone");
    logFailTestcase(temp, "Incorrect Phone");
  }
  if (TimeToCall) {
    temp = await saleForm.validateValueSaleForm(TimeToCall, "Time To Call");
    logFailTestcase(temp, "Incorrect TimeToCall");
  }

  if (Amount) {
    temp = await saleForm.validateValueSaleForm(Amount, "Total Deal Amount");
    logFailTestcase(temp, "Incorrect Total Deal Amount");
  }

  if (Currency) {
    temp = await saleForm.validateValueSaleForm(Currency, "Currency");
    logFailTestcase(temp, "Incorrect Currency");
  }

  if (AnnualContractValue) {
    temp = await saleForm.validateValueSaleForm(AnnualContractValue, "Annual Contract Value");
    logFailTestcase(temp, "Incorrect Annual Contract Value");
  }

  if (CloseQuarter) {
    temp = await saleForm.validateValueSaleForm(CloseQuarter, "Close Quarter");
    logFailTestcase(temp, "Incorrect Close Quarter");
  }

  if (Type) {
    temp = await saleForm.validateValueSaleForm(Type, "Sales Type");
    logFailTestcase(temp, "Incorrect Sales Type");
  }

  if (DealSource) {
    temp = await saleForm.validateValueSaleForm(DealSource, "Deal Source");
    logFailTestcase(temp, "Incorrect Deal Source");
  }

  if (ProductPL) {
    temp = await saleForm.validateValueSaleForm(ProductPL, "Product P&L");
    logFailTestcase(temp, "Incorrect Product  P&L");
  }

  if (DealStatus) {
    temp = await saleForm.validateValueSaleForm(DealStatus, "Sales Status");
    logFailTestcase(temp, "Incorrect Sales Status");
  }

  if (Region) {
    temp = await saleForm.validateValueSaleForm(Region, "Region");
    logFailTestcase(temp, "Incorrect Region");
  }

  if (Capex) {
    temp = await saleForm.validateValueSaleForm(Capex, "CAPEX");
    logFailTestcase(temp, "Incorrect CAPEX");
  }

  if (RiskChallenges) {
    temp = await saleForm.validateValueSaleForm(RiskChallenges, "Risks / Challenges");
    logFailTestcase(temp, "Incorrect Risks / Challenges");
  }

  if (Arr) {
    temp = await saleForm.validateValueSaleForm(Arr, "ARR");
    logFailTestcase(temp, "Incorrect Risks / Challenges");
  }

  if (Maintenance) {
    temp = await saleForm.validateValueSaleForm(Maintenance, "License & Maintenance");
    logFailTestcase(temp, "Incorrect License & Maintenance");
  }

  if (ProfessionalService) {
    temp = await saleForm.validateValueSaleForm(ProfessionalService, "Professional Service");
    logFailTestcase(temp, "Incorrect Professional Service");
  }

  if (DealPeriod) {
    temp = await saleForm.validateValueSaleForm(DealPeriod, "Deal Period");
    logFailTestcase(temp, "Incorrect Deal Period");
  }

  if (Description) {
    temp = await saleForm.validateValueSaleForm(Description, "Description");
    logFailTestcase(temp, "Incorrect Description");
  }

  temp = await globalPageObject.pressCancelForm();
  logFailTestcase(temp, "Press Cancel button on Sale form failed!");
  await globalPageObject.waitForProgressBarLoaded_v2();
});

When("User opens Account detail on Sales list from csv file {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename))[0];
  let temp = true;
  const FirstName = rows.FirstName;
  const LastName = rows.LastName;
  const CompanyName = rows.CompanyName;
  const SaleName = rows.SaleName;

  let AccountName = CompanyName ? CompanyName : FirstName + " " + LastName;

  for (let i = 1; i <= 10; i++) {
    logInfoMessage(`finding sales on line ${i}...`);
    if (await saleList.validateSalesNameOnSalesList(SaleName, i) && await saleList.validateAccountNameOnSalesList(AccountName, i)) {
      temp = await saleList.openAccountByRowOnSalesList(i);
      break;
    }
  }


});

