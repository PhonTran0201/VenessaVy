import { Then, When } from "@cucumber/cucumber";
import { SaleForm } from "../../../../page-objects/back-office-portal/general/sale/sale-forms/SaleForm";
import { PageFactory } from "../../../../page-objects/PageFactory";
import { compareDate, compareDateTime, convertPathFileDataToDataRegression, logFailTestcase, logWarningMessage } from "../../../../shared/functions";
import { scenarioName } from "../../../../shared/variables";

let saleForm = PageFactory.getInstance().createSaleForm();
let saleCard = PageFactory.getInstance().createSaleCard();
let saleSearchFilter = PageFactory.getInstance().createSaleSearchFilter();
let saleDetailsLeftSide = PageFactory.getInstance().createSaleDetailsLeftSide();
let globalPageObject = PageFactory.getInstance().createGlobalPageObjectPage();
let globalFilterDropdown = PageFactory.getInstance().createGlobalFilterDropdown();
const loader = require("csv-load-sync");

//Search and Filter
When("User searches sale card view with valid data from csv file {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  for (let i = 0; i < rows.length; i++) {
    logWarningMessage(`Checking Search & Filter at line ${i + 1} in csv...`);
    let temp = await saleSearchFilter.pressClearAtSearchAndFilter();
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
    const LastUpdatedFrom = rows[i].LastUpdatedFrom;
    const LastUpdatedTo = rows[i].LastUpdatedTo;
    const Description = rows[i].Description;

    // Varsam's fields
    const Team = rows[i].Team;
    const TeamMember = rows[i].TeamMember;
    const TimeToCallFrom = rows[i].TimeToCallFrom;
    const TimeToCallTo = rows[i].TimeToCallTo;
    const Phone = rows[i].Phone;


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
    if (LastUpdatedFrom) logFailTestcase(await saleSearchFilter.inputLastUpdatedFromSearchAndFilter(LastUpdatedFrom), "Input Last Updated From failed!");
    if (LastUpdatedTo) logFailTestcase(await saleSearchFilter.inputLastUpdatedToSearchAndFilter(LastUpdatedTo), "Input Last Updated To failed!");

    if (Description) logFailTestcase(await saleSearchFilter.inputDescriptionSearchAndFilter(Description), "Input Description failed!");

    if (Team) logFailTestcase(await saleSearchFilter.inputTeamSearchAndFilter(Team), "Input Team failed!");
    if (TeamMember) logFailTestcase(await saleSearchFilter.inputTeamMemberSearchAndFilter(TeamMember), "Input Team Member failed!");
    if (TimeToCallFrom) logFailTestcase(await saleSearchFilter.inputTimeToCallFromSearchAndFilter(TimeToCallFrom), "Input Time To Call From failed!");
    if (TimeToCallTo) logFailTestcase(await saleSearchFilter.inputTimeToCallToSearchAndFilter(TimeToCallTo), "Input Time To Call To failed!");
    if (Phone) logFailTestcase(await saleSearchFilter.inputPhoneSearchAndFilter(Phone), "Input Phone failed!");

    temp = await saleSearchFilter.pressSearchAtSearchAndFilter();
    logFailTestcase(temp, "Press Search at Search & Filter failed!");

    const SaleNumber = parseInt(rows[i].SaleNumber);
    const actualTotalNumber = await saleCard.getTotalNumberItemsSalesCard();

    async function validateValueSearchFilterSale(index: number) {
      // Validate Sale Name Account, Product, TotalDealAmount, CloseDate, LastUpdateDate, KAM, SaleRep, StageValue
      if (SalesName) {
        temp = await saleCard.validateValueSaleNameByIndex(index, SalesName, true);
        logFailTestcase(temp, `Sales Name "${SalesName}" does not match to result`);
      }
      if (Account) {
        temp = await saleCard.validateValueAccountByIndex(index, Account);
        logFailTestcase(temp, `Account "${Account}" does not match to result`);
      }
      if (Product) {
        temp = await saleCard.validateValueProductByIndex(index, Product);
        logFailTestcase(temp, `Product "${Product}" does not match to result`);
      }
      if (TotalDealAmount) {
        temp = await saleCard.validateValueTotalDealAmountByIndex(index, TotalDealAmount, true);
        logFailTestcase(temp, `TotalDealAmount "${TotalDealAmount}" does not match to result`);
      }
      if (CloseDateFrom) {
        const actualCloseDate = await saleCard.getValueCloseDateByIndex(index);
        temp = compareDate(CloseDateFrom, actualCloseDate) >= 0;
        logFailTestcase(temp, `"${CloseDateFrom}" is NOT before or equal "${actualCloseDate}"!`);
      }
      if (CloseDateTo) {
        const actualCloseDate = await saleCard.getValueCloseDateByIndex(index);
        temp = compareDate(actualCloseDate, CloseDateTo) >= 0;
        logFailTestcase(temp, `"${actualCloseDate}" is NOT before or equal "${CloseDateTo}"!`);
      }
      if (LastUpdatedFrom) {
        const actualLastUpdated = await saleCard.getValueLastUpdatedByIndex(index);
        temp = compareDateTime(LastUpdatedFrom, actualLastUpdated) >= 0;
        logFailTestcase(temp, `"${LastUpdatedFrom}" is NOT before or equal "${actualLastUpdated}"!`);
      }
      if (LastUpdatedTo) {
        const actualLastUpdated = await saleCard.getValueLastUpdatedByIndex(index);
        temp = compareDateTime(actualLastUpdated, LastUpdatedTo) >= 0;
        logFailTestcase(temp, `"${actualLastUpdated}" is NOT before or equal "${LastUpdatedTo}"!`);
      }
      if (KAM) {
        temp = await saleCard.validateValueKAMByIndex(index, KAM);
        logFailTestcase(temp, `KAM "${KAM}" does not match to result`);
      }
      if (SalesRep) {
        temp = await saleCard.validateValueSalesRepByIndex(index, SalesRep);
        logFailTestcase(temp, `SalesRep "${SalesRep}" does not match to result`);
      }
      if (SalesStage) {
        const stageValue = SalesStage.split(" - ")[1];
        temp = await saleCard.validateValueStageValueByIndex(index, stageValue);
        logFailTestcase(temp, `SalesStage "${SalesStage}" does not match to result`);
      }

      //validate Description, Team, Team Memember, Time To Call, Phone
      if (Description || Team || TeamMember || TimeToCallFrom || TimeToCallTo || Phone || Description) {
        temp = await saleCard.openEditSaleFormByIndex(index);
        logFailTestcase(temp, "Open detail of the first sale failed!");

        await globalPageObject.waitForProgressBarLoaded_v2(100);

        if (Description){
          temp = await saleForm.validateValueSaleForm(Description, "Description");
          logFailTestcase(temp, `Description "${Description}" does not match to result`);
        }
        if (Team){
          temp = await saleForm.validateValueSaleForm(Team, "Team");
          logFailTestcase(temp, `Team "${Team}" does not match to result`);
        }
        if (TeamMember){
          temp = await saleForm.validateValueSaleForm(TeamMember, "Team Member");
          logFailTestcase(temp, `TeamMember "${TeamMember}" does not match to result`);
        }
        if (Phone){
          temp = await saleForm.validateValueSaleForm(Phone, "Phone");
          logFailTestcase(temp, `Phone "${Phone}" does not match to result`);
        }
        if (TimeToCallFrom) {
          const actualTimeToCall = await saleForm.getValueTimeToCall();
          temp = compareDateTime(TimeToCallFrom, actualTimeToCall) >= 0;
          logFailTestcase(temp, `"${TimeToCallFrom}" is NOT before or equal "${actualTimeToCall}"!`);
        }
        if (TimeToCallTo) {
          const actualTimeToCall = await saleForm.getValueTimeToCall();
          temp = compareDateTime(actualTimeToCall, TimeToCallTo) >= 0;
          logFailTestcase(temp, `"${actualTimeToCall}" is NOT before or equal "${TimeToCallTo}"!`);
        }
        await saleForm.pressCloseSaleFormButton();
      }
    }

    if (SaleNumber > 1 && SaleNumber === actualTotalNumber) {
      await validateValueSearchFilterSale(1);

      await validateValueSearchFilterSale(actualTotalNumber);
    }
    else if(SaleNumber === 1 && SaleNumber === actualTotalNumber){
      await validateValueSearchFilterSale(1);
    }
    else if (SaleNumber < 0) {
      await validateValueSearchFilterSale(1);

      await validateValueSearchFilterSale(actualTotalNumber);
    }
    else {
      logWarningMessage(`There are ${actualTotalNumber} total records found!`);
      logFailTestcase(false, `Line ${i + 1} in csv: failed...`);
    }
    logWarningMessage(`\tLine ${i + 1} passed!`);
  }
});

Then('System shows a list of sales at sales card', async () => {
  //We have implemented at previous step for multiple searching account.
  console.info(scenarioName + ": Test case is passed!");
});