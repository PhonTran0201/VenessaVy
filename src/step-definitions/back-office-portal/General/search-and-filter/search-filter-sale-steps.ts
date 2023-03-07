import { Before, Then, When } from "@cucumber/cucumber";
import { compareDesc } from "date-fns";
import { GlobalFilterDropdown } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalFilterDropdown";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { SaleDetailsLeftSide } from "../../../../page-objects/back-office-portal/general/sale/sale-details/left-side/SaleDetailsLeftSide";
import { SaleList } from "../../../../page-objects/back-office-portal/general/sale/sale-list/SaleList";
import { SaleSearchFilter } from "../../../../page-objects/back-office-portal/general/sale/sale-search-filter/SaleSearchFilter";
import { convertPathFileDataToDataRegression, logFailTestcase, logWarningMessage, reformatSalesStage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { scenarioName } from "../../../../shared/variables";

let saleList: SaleList;
let saleSearchFilter: SaleSearchFilter;
let saleDetailsLeftSide: SaleDetailsLeftSide;
let globalPageObject: GlobalPageObject;
let globalFilterDropdown: GlobalFilterDropdown;
const loader = require("csv-load-sync");

Before(async function () {
  const context: ICommonContext = this.context;
  saleList = new SaleList(context.driverService);
  saleSearchFilter = new SaleSearchFilter(context.driverService);
  saleDetailsLeftSide = new SaleDetailsLeftSide(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
  globalFilterDropdown = new GlobalFilterDropdown(context.driverService);
});

When('User opens Search and Filter form at Sale card', async () => {  
  await globalPageObject.waitForProgressBarLoaded_v2(500);
  await globalPageObject.waitForProgressBarLoaded_v2(500);
  const temp = await saleSearchFilter.openSearchAndFilterForm();
  logFailTestcase(temp, "Open Search & Filter form failed!");
});

//Search and Filter
When("User searches sale with valid data from csv file {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  for (let i = 0; i < rows.length; i++) {
    logWarningMessage(`Checking Search & Filter at line ${i + 1} in csv...`);
    let temp = await globalPageObject.pressClearSearchAndFilter();
    logFailTestcase(temp, "Press Clear at Search and Filter failed!");


    // Basic field
    const Reference = rows[i].Reference;
    const Account = rows[i].Account;
    const KAM = rows[i].KAM;
    const Pipeline = rows[i].Pipeline;
    const SalesStage = rows[i].SalesStage;
    const SalesName = rows[i].SalesName;
    const SalesRep = rows[i].SalesRep;
    const TotalDealAmount = rows[i].TotalDealAmount || rows[i].Amount;
    const Currency = rows[i].Currency;
    const Product = rows[i].Product;
    const CloseDateFrom = rows[i].CloseDateFrom;
    const CloseDateTo = rows[i].CloseDateTo;
    const Description = rows[i].Description;

    //Custom field
    const AnnualContractValue = rows[i].AnnualContractValue;
    const SalesType = rows[i].SalesType;
    const ProductPL = rows[i].ProductPL;
    const SalesStatus = rows[i].SalesStatus;
    const CAPEX = rows[i].CAPEX;
    const ARR = rows[i].ARR;


    if (Reference) logFailTestcase(await saleSearchFilter.inputReferenceSearchAndFilter(Reference), "Input reference failed!");
    if (Account) logFailTestcase(await saleSearchFilter.inputAccountSearchAndFilter(Account), "Input Account failed!");
    if (KAM) logFailTestcase(await saleSearchFilter.inputKAMSearchAndFilter(KAM), "Input KAM failed!");
    if (Pipeline) logFailTestcase(await saleSearchFilter.inputPipelineSearchAndFilter(Pipeline), "Input Pipeline failed!");
    if (SalesStage) logFailTestcase(await saleSearchFilter.inputSalesStageSearchAndFilter(SalesStage), "Input Sales Stage failed!");
    if (SalesName) logFailTestcase(await saleSearchFilter.inputSalesNameSearchAndFilter(SalesName), "Input Sales Name failed!");
    if (SalesRep) logFailTestcase(await saleSearchFilter.inputSalesRepSearchAndFilter(SalesRep), "Input Sale Rep failed");
    if (TotalDealAmount) logFailTestcase(await saleSearchFilter.inputTotalDealAmountSearchAndFilter(TotalDealAmount), "Input Total Deal Amount failed!");
    if (Currency) logFailTestcase(await saleSearchFilter.inputCurrencySearchAndFilter(Currency), "Input Currency failed!");
    if (Product) logFailTestcase(await saleSearchFilter.inputProductSearchAndFilter(Product), "Input Product failed!");
    if (CloseDateFrom) logFailTestcase(await saleSearchFilter.inputCloseDateFromSearchAndFilter(CloseDateFrom), "Input Close Date From failed!");
    if (CloseDateTo) logFailTestcase(await saleSearchFilter.inputCloseDateToSearchAndFilter(CloseDateTo), "Input Close Date To failed!");
    if (Description) logFailTestcase(await saleSearchFilter.inputDescriptionSearchAndFilter(Description), "Input Description failed!");

    if (AnnualContractValue) logFailTestcase(await saleSearchFilter.inputAnnualContractValueSearchAndFilter(AnnualContractValue), "Input Annual Contract Value failed!");
    if (SalesType) logFailTestcase(await saleSearchFilter.inputSalesTypeSearchAndFilter(SalesType), "Input Sales Type failed!");
    if (ProductPL) logFailTestcase(await saleSearchFilter.inputProductPLSearchAndFilter(ProductPL), "Input Product P & L failed!");
    if (SalesStatus) logFailTestcase(await saleSearchFilter.inputSalesStatusSearchAndFilter(SalesStatus), "Input Sales Status failed!");
    if (CAPEX) logFailTestcase(await saleSearchFilter.inputCAPEXSearchAndFilter(CAPEX), "Input CAPEX failed!");
    if (ARR) logFailTestcase(await saleSearchFilter.inputARRSearchAndFilter(ARR), "Input ARR failed!");

    temp = await globalPageObject.pressSearchSearchAndFilter();
    logFailTestcase(temp, "Press Search at Search & Filter failed!");

    const SaleNumber = parseInt(rows[i].SaleNumber);
    const actualTotalNumber = await globalPageObject.getNumberOfTotalRecordsMainTab();


    async function validateValueSearchFilterSale(positionRow: number) {
      //Validate SalesName, Account, Pipeline, SalesStage, SalesRep, Product
      if (Reference) logFailTestcase(await saleList.validateValueSaleList(Reference, "Reference", positionRow, true), `Reference "${Reference}" does not match to result`);
      if (Account) logFailTestcase(await saleList.validateValueSaleList(Account, "Account", positionRow), `Account "${Account}" does not match to result!`);
      if (KAM) logFailTestcase(await saleList.validateValueSaleList(KAM, "KAM", positionRow), `KAM "${KAM}" does not match to result!`);
      if (Pipeline) logFailTestcase(await saleList.validateValueSaleList(Pipeline, "Pipeline", positionRow), `Pipeline "${Pipeline}" does not match to result!`);
      if (SalesStage) logFailTestcase(await saleList.validateValueSaleList(reformatSalesStage(SalesStage), "Stage", positionRow), `Sale stage "${SalesStage}" does not match to result!`);
      if (SalesName) logFailTestcase(await saleList.validateValueSaleList(SalesName, "Sales", positionRow, true), `Sales name "${SalesName}" does not match to result!`);
      if (SalesRep) logFailTestcase(await saleList.validateValueSaleList(SalesRep, "Sales rep.", positionRow), `Sale Rep "${SalesRep}" does not match to result!`);
      if (TotalDealAmount) logFailTestcase(await saleList.validateValueSaleList(TotalDealAmount, "Amount", positionRow), `Total Deal Amount "${TotalDealAmount}" does not match to result!`);
      if (Currency) logFailTestcase(await saleList.validateValueSaleList(Currency, "Currency", positionRow, true), `Currency "${Currency}" does not match to result!`);
      if (Product) logFailTestcase(await saleList.validateValueSaleList(Product, "Product", positionRow), `Product "${Product}" does not match to result!`);

      //Validate , Close date From - To
      const strCloseDate = await saleList.getValueSaleList("Close Date", positionRow);
      logFailTestcase(strCloseDate.length > 0, `Get value of columns "Close Date" failed!`);

      const CloseDate = new Date(parseInt(strCloseDate.substring(6, 10)), parseInt(strCloseDate.substring(3, 5)), parseInt(strCloseDate.substring(0, 2)));
      if (CloseDateFrom) {
        const ExpectedCloseDateFrom = new Date(parseInt(CloseDateFrom.substring(6, 10)), parseInt(CloseDateFrom.substring(3, 5)), parseInt(CloseDateFrom.substring(0, 2)));
        temp = compareDesc(ExpectedCloseDateFrom, CloseDate) >= 0;
        logFailTestcase(temp, `"${CloseDateFrom}" is NOT before or equal "${strCloseDate}"!`);
      }

      if (CloseDateTo) {
        const ExpectedCloseDateTo = new Date(parseInt(CloseDateTo.substring(6, 10)), parseInt(CloseDateTo.substring(3, 5)), parseInt(CloseDateTo.substring(0, 2)));
        temp = compareDesc(CloseDate, ExpectedCloseDateTo) >= 0;
        logFailTestcase(temp, `"${strCloseDate}" is NOT before or equal "${CloseDateTo}"!`);
      }

      //validate Annual Contract Value, Sale Type, Product P & L, Sale Status, CAPEX, ARR, Description
      if (AnnualContractValue || SalesType || ProductPL || SalesStatus || CAPEX || ARR || Description) {
        temp = await saleList.openSaleDetail(positionRow);
        logFailTestcase(temp, "Open detail of the first sale failed!");
        await globalPageObject.waitForProgressBarLoaded_v2(100);

        if (AnnualContractValue) logFailTestcase(await saleDetailsLeftSide.validateValueSaleDetail(AnnualContractValue, "Annual contract value"), `Annual contract value "${AnnualContractValue}" does not match to result!`);
        if (SalesType) logFailTestcase(await saleDetailsLeftSide.validateValueSaleDetail(SalesType, "Sales Type"), `Sales Type "${SalesType}" does not match to result!`);
        if (ProductPL) logFailTestcase(await saleDetailsLeftSide.validateValueSaleDetail(ProductPL, "Product P&L"), `Product P&L "${ProductPL}" does not match to result!`);
        if (SalesStatus) logFailTestcase(await saleDetailsLeftSide.validateValueSaleDetail(SalesStatus, "Sales Status"), `Sales Status "${SalesStatus}" does not match to result!`);
        if (CAPEX) logFailTestcase(await saleDetailsLeftSide.validateValueSaleDetail(CAPEX, "CAPEX"), `CAPEX "${CAPEX}" does not match to result!`);
        if (ARR) logFailTestcase(await saleDetailsLeftSide.validateValueSaleDetail(ARR, "ARR"), `ARR "${ARR}" does not match to result!`);

        if (Description) logFailTestcase(await saleDetailsLeftSide.validateValueSaleDetail(Description, "Description", true), `Description "${Description}" does not match to result!`);

        temp = await globalPageObject.closeAllOpeningEntities();
        logFailTestcase(temp, "Close sale detail failed!");
      }
    }

    if (SaleNumber > 1 && SaleNumber === actualTotalNumber) {
      // Verify result at first row
      await validateValueSearchFilterSale(1);

      if (actualTotalNumber > 10) {
        await validateValueSearchFilterSale(10);
      }
      else {
        await validateValueSearchFilterSale(actualTotalNumber);
      }
    }
    else if ((SaleNumber === 1 && SaleNumber === actualTotalNumber) || SaleNumber < 0) {
      await validateValueSearchFilterSale(1);

      if (actualTotalNumber > 10) {
        await validateValueSearchFilterSale(10);
      }
      else {
        await validateValueSearchFilterSale(actualTotalNumber);
      }
    }
    else {
      logWarningMessage(`There are ${actualTotalNumber} total records found!`);
      logFailTestcase(false, `Line ${i + 1} in csv: failed...`);
    }
    logWarningMessage(`\tLine ${i + 1} passed!`);
  }
});
Then('System shows a list of sales at sales list', async () => {
  //We have implemented at previous step for multiple searching account.
  console.info(scenarioName + ": Test case is passed!");
});

Then(`Sale Search and Filter form is cleared`, async () => {
  let temp = await saleSearchFilter.validateClearedSearchAndFilterForm();
  logFailTestcase(temp, "Sale Search and Filter form is not cleared");
});

When("User inputs data to select filter field on Sales list {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename));
  const FilterName = row[0].FilterName;
  let temp = await globalFilterDropdown.inputSelectFilterDropdown(FilterName);
  logFailTestcase(temp, "Input select filter failed !");
});
