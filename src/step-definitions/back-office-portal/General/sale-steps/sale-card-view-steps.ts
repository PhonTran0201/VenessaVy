import { When } from "@cucumber/cucumber";
import { PageFactory } from "../../../../page-objects/PageFactory";
import { capitalizeWords, convertPathFileDataToDataRegression, getCurrentDateTime, logFailTestcase, logInfoMessage } from "../../../../shared/functions";
import { getCurrencyDecimalSeparator, numberToCurrency } from "../../../../shared/tenant-setting/tenant-setting";

const loader = require('csv-load-sync');
const saleCard = PageFactory.getInstance().createSaleCard();
const saleList = PageFactory.getInstance().createSaleList();
const globalPageObject = PageFactory.getInstance().createGlobalPageObjectPage();



When("User selects a pipeline at Sale Card view {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const row = rows[0];

    const Pipeline = row.Pipeline;

    let temp = await saleCard.selectPipelineFilterSaleCardView(Pipeline);
    logFailTestcase(temp, `Select pipeline failed!`);

    const saleListType = "All sales";
    logInfoMessage(`User select sale list type is "${saleListType}"`);
    temp = await saleList.inputDropdownSaleListType(saleListType);
    logFailTestcase(temp, `Input dropdown Sale list type "${saleListType}" failed!`);

    // temp = await saleCard.pressClearButtonSelectFilter();
    // logFailTestcase(temp, `Press Clear button at Select filter failed!`);
});

When("User verifies info new sale on Sale card view {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const row = rows[0];
    let temp = true;
    const ChooseFromExistingAccount = row.ChooseFromExistingAccount;
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

    temp = await saleCard.pressRefreshColumnCardview();
    logFailTestcase(temp, `Press Refresh column failed!`);
    await globalPageObject.waitForProgressBarLoaded_v2();

    const stageName = Stage.split(" - ")[0];
    temp = await saleCard.validateValueAccount(stageName, SaleName, ChooseFromExistingAccount);
    logFailTestcase(temp, `Incorrect account!`);

    temp = await saleCard.validateValueProduct(stageName, SaleName, Product);
    logFailTestcase(temp, `Incorrect Product`);

    temp = await saleCard.validateValueTotalDealAmount(stageName, SaleName, `${Currency} ${Amount}`);
    logFailTestcase(temp, `Incorrect Amount`);

    temp = await saleCard.validateValueCloseDate(stageName, SaleName, ClosedDate);
    logFailTestcase(temp, `Incorrect Closed date`);

    const LastUpdated = getCurrentDateTime();
    temp = await saleCard.validateValueLastUpdated(stageName, SaleName, LastUpdated);
    logFailTestcase(temp, `Incorrect Last Updated`);

    // temp = await saleCard.validateValueKAM(stageName, SaleName, KAM);// KAM of Account
    // logFailTestcase(temp, `Incorrect KAM of Account`);

    // temp = await saleCard.validateValueSalesRep(stageName, SaleName, SalesRep);
    // logFailTestcase(temp, `Incorrect sale rep`);

    logInfoMessage(`Skip to verify KAM, Sales Rep...`);
});

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

/**
 * input: ["NOK 5000", "CAD 3000", "NOK 6000"]
 * output: ["NOK: 11000", "CAD: 3000"]
 */
function calculateTotalDealAmount(arrayTotalDealAmount: string[]){
    let arrayCurrency: string[] = [];
    for (const iterator of arrayTotalDealAmount) {
        arrayCurrency.push(iterator.split(" ")[0]);
    }
    arrayCurrency = arrayCurrency.filter(onlyUnique);
    let result: any[] = [];
    for (const iterator of arrayCurrency) {
        let number = 0;
        for (const iterator2 of arrayTotalDealAmount) {
            if(iterator2.includes(iterator)){
                number += parseFloat(iterator2.replace(/[^0-9]/g, ""));
            }
        }
        result.push({"currency": iterator, "value": number});

        // result.push(`${iterator}: ${number}`);
    }
    return result;
}

When("User verifies total deal and sales item on Sale card view",async () => {
    let temp = true;
    const arrayStageName = await saleCard.getArrayStageName();
    logFailTestcase(arrayStageName.length > 0, `Get Array stage name failed!`);

    temp = await saleCard.pressSeeMoreButtonCardview();
    logFailTestcase(temp, `Press Seemore button failed!`);

    for (let iterator of arrayStageName) {
        console.log("\n" + iterator);
        iterator = capitalizeWords(iterator.toLowerCase());
        const numberItemSale = await saleCard.getNumberItemSalesCard(capitalizeWords(iterator.toLowerCase()));
        const arrayTotalDealAmount = await saleCard.getArrayTotalDealAmount(iterator);
        const totalDealAmounts = calculateTotalDealAmount(arrayTotalDealAmount);// dùng để so sánh
        let totalDealAmount = numberToCurrency(totalDealAmounts[0].value).split(getCurrencyDecimalSeparator())[0];
        totalDealAmount = `${totalDealAmounts[0].currency}: ${totalDealAmount}`;
        temp = await saleCard.verifyInfoStageColumnAtSaleCarview(iterator, `${numberItemSale}/${numberItemSale}`, totalDealAmount, "");
        logFailTestcase(temp, `Incorrect column ${iterator}!`);
    }
});