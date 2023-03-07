import { Before, Given, When } from "@cucumber/cucumber";
import { DataRepo } from "../../../../../../../core/modals/data_repo";
import { DataRepo as DataRepo2 } from "../../../../../../../core/modals/DataRepo";
import { SeleniumWebDriverService } from "../../../../../../../core/selenium-webdriver.service";
import { AccountTabQuoteList } from "../../../../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-quote/AccountTabQuoteList";
import { AccountTabQuoteCreateQuoteVarsamProductInnboSeasonal } from "../../../../../../../page-objects/back-office-portal/general/account/account-details/tabs/account-quote/Varsam-channel/AccountTabQuoteCreateQuoteVarsamProductInnboSeasonal";
import { GlobalPageObject } from "../../../../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { GlobalPagination } from "../../../../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPagination";
import { QuoteCreatingQuote } from "../../../../../../../page-objects/back-office-portal/general/quote/quote-layouts/QuoteCreatingQuote";
import { QuoteCreateCabinPage } from "../../../../../../../page-objects/back-office-portal/general/quote/quote-layouts/Varsam-channel/QuoteCreateCabinPage";
import { QuoteCreateFritidshusPage } from "../../../../../../../page-objects/back-office-portal/general/quote/quote-layouts/Varsam-channel/QuoteCreateFritidshusPage";
import { QuoteCreateQuoteVarsamProductSmadjur } from "../../../../../../../page-objects/back-office-portal/general/quote/quote-layouts/Varsam-channel/QuoteCreateQuoteVarsamProductSmadjur";
import { QuoteCreateVillahemPage } from "../../../../../../../page-objects/back-office-portal/general/quote/quote-layouts/Varsam-channel/QuoteCreateVillahemPage";
import { CreatingQuoteInsurance } from "../../../../../../../page-objects/back-office-portal/insurance/quote/quote-layout/CreatingQuoteInsurance";
import { addDate, addYear, convertPathFileDataToDataRegression, getCurrentDateTime, getDate, getTheContentInPDFFile, getTheFirstFileNameByPathInFolder, logFailTestcase, logInfoMessage, logWarningMessage } from "../../../../../../../shared/functions";
import { ICommonContext } from "../../../../../../../shared/interfaces";
import { formatDateTime, numberToCurrency } from "../../../../../../../shared/tenant-setting/tenant-setting";
import { DownloadFilePathGlobalVariable } from "../../../../../../../shared/variables";
import { getValueDataOfDataTestExecution, pushObjectToDataArrayWithUniqueKey } from "../../../../../../../storage-data/functions/data-test-execution";
import { inputPremiumSectionOnCreatingQuote } from "../quote-creating-quote-function";
import { UserProfileInfo } from "../../../../../../../shared/user-profile/UserProfileInfo";


let accountTabQuoteCreateQuoteVarsamProductInnboSeasonal: AccountTabQuoteCreateQuoteVarsamProductInnboSeasonal;
let accountTabQuoteList: AccountTabQuoteList;
let globalPageObject: GlobalPageObject;
let globalPagination: GlobalPagination;


const loader = require("csv-load-sync");

Before(async function () {
    const context: ICommonContext = this.context;
    accountTabQuoteCreateQuoteVarsamProductInnboSeasonal = new AccountTabQuoteCreateQuoteVarsamProductInnboSeasonal(context.driverService);
    accountTabQuoteList = new AccountTabQuoteList(context.driverService);
    globalPageObject = new GlobalPageObject(context.driverService);
    globalPagination = new GlobalPagination(context.driverService);
});

Given("User fill data for product Fritidshus {string}", async function (dataKey) {
    try {
        //#PRODUCT Fritidshus (Cabin) version 23
        // const mapPage = new MappingPage(SeleniumWebDriverService.getInstance());
        // await mapPage.scan(true, "//app-product-layout");
        const data = await DataRepo2.getInstance().loadData(dataKey);
        const page = new QuoteCreateFritidshusPage(this.context.driverService);
        //#region Försäkringsinformation
        await page.setInputstartDate(formatDateTime(data.StartDate));
        await page.setInputendDate(formatDateTime(data.EndDate));
        await page.setInputeffectiveDate(formatDateTime(data.EffectiveDate));
        //#endregion

        //#region Uppgifter om dig
        await page.setInputInsuredPersonFirstNameTag(data.FirstName);
        await page.setInputInsuredPersonLastNameTag(data.LastName);
        await page.setInputInsuredPersonSSNTag(data.SSN);//N
        if (data.DOB) {
            await page.setInputInsuredPersonDOBTag(formatDateTime(data.DOB));
        }
        //#endregion

        //#region Uppgifter om försäkringen
        await page.setInputHomeContentsHouseNameTag(data.HouseName);
        await page.setInputHouseAddressTag(data.HouseAddress);
        await page.setInputHomeContentsPostCodeTag(data.PostCode);
        await page.setNgselectAcquiryYearTag(data.AcquiryYear);
        await page.setSelectHomeContensPreviousHomeownerTag(data.PreviousHomeowner);
        await page.setInputHomeContentsHouseAreaTag(data.HouseArea);
        await page.setInputTotalAreaTag(data.TotalArea);
        await page.setInputHomeContentsHouseBuiltYearTag(data.BuiltYear);
        await page.setSelectElectricityAndPlumbingReplacedAndChimneyTestedTag(data.ElectricityAndPlumbingReplacedAndChimneyTested);
        await page.setInputHomeContentsHouseRenovationYearTag(data.RenovationYear);
        await page.setNgselectPropertyTypeTag(data.PropertyType);
        await page.setNgselectPlotTypeTag(data.PlotType);
        await page.setNgselectFrameworkTypeTag(data.FrameworkType);
        await page.setSelectWinterUsageTag(data.WinterUsage);
        await page.setNgselectWetSpaceTag(data.WetSpace);
        await page.setSelectSummerWaterTag(data.SummerWater);
        await page.setNgselectHasWaterBorneHeatingSystemTag(data.HasWaterBorneHeatingSystem);
        await page.setSelectHomeContentsNumberOfWCTag(data.NumberOfWC);
        await page.setSelectHasGeothermalPumpsTag(data.HasGeothermalPumps);
        await page.setNgselectLeakomaticTag(data.Leakomatic);
        await page.setSelectHasKitchenMoreThanOneWaterConnectedMachinesTag(data.HasKitchenMoreThanOneWaterConnectedMachines);
        await page.setSelectAreTreesCloseToHouseTag(data.AreTreesCloseToHouse);
        await page.setSelectNumberOfFirePlacesTag(data.NumberOfFirePlaces);
        await page.setSelectTotalFloorsTag(data.TotalFloors);
        await page.setSelectAirHeaterTag(data.AirHeater);
        await page.setSelectHasPoolOrSpaOrHotTubTag(data.HasPoolOrSpaOrHotTub);
        await page.setSelectCentralFireAlarmTag(data.CentralFireAlarm);
        await page.setSelectCameraTag(data.Camera);
        await page.setSelectHasLargeConservatoryTag(data.HasLargeConservatory);
        //#endregion

        //#region Andra uppgifter
        await page.setNgselectHasOtherMainInsuranceTag(data.HasOtherMainInsurance);
        //#endregion

        //#region Uppgifter om övriga byggnader
        await page.setNgselectHomeContentsMoreBuildingsTag(data.MoreBuildings);
        //#endregion


        //#region Övriga byggnader 1
        await page.setInputHomeContentsBuildingAdditionalSpace1Tag(data.BuildingAdditionalSpace1);
        await page.setSelectWinterUsageBuilding1Tag(data.WinterUsageBuilding1);
        await page.setNgselectWetSpaceBuilding1Tag(data.WetSpaceBuilding1);
        await page.setSelectTotalFloorBuilding1Tag(data.TotalFloorBuilding1);
        //#endregion

        //#region Övriga byggnader 2
        await page.setInputHomeContentsBuildingAdditionalSpace2Tag(data.BuildingAdditionalSpace2);
        await page.setSelectWinterUsageBuilding2Tag(data.WinterUsageBuilding2);
        await page.setNgselectWetSpaceBuilding2Tag(data.WetSpaceBuilding2);
        await page.setSelectTotalFloorBuilding2Tag(data.TotalFloorBuilding2);
        //#endregion

        //#region Omfattning
        await page.setNgselectProductTag(data.Product);
        await page.setNgselectHomeContentsVillaBaseExcessTag(data.VillaBaseExcess);
        //#endregion

        //#region Lösöre
        await page.setNgselectHomeContentsSumInsuredTag(data.SumInsured);//N
        await page.setNgselectHomeContentsHomeBaseExcessTag(data.BaseExcess);
        //#endregion

        //#region Tilläggsförsäkringar
        if (data.RentOut) {
            await page.setNgselectRentOutTag(data.RentOut);
            if ((data.RentOut).localeCompare("Ja") === 0) {
                await page.setInputTotalBedsForRentTag(data.TotalBedsForRent);
            }
        }
        if (data.VillaBoat) {
            await page.setSelectHomeContentsVillaBoatTag(data.VillaBoat);
            if ((data.VillaBoat).localeCompare("Yes") === 0) {
                await page.setNgselectBoatWithEngineTag(data.BoatWithEngine);
            }
        }
        //#endregion

        //#region PLUS-paketet
        await page.setSelectAllRiskBuildingsTag(data.AllRiskBuildings);//N
        await page.setSelectBathroomProtectionTag(data.BathroomProtection);//N
        await page.setSelectReducedCostTag(data.ReducedCost);//N
        await page.setSelectWaterProtectionTag(data.WaterProtection);//N
        await page.setSelectContentsPlusTag(data.ContentsPlus);//N
        //#endregion

        //#region Övriga uppgifter
        await page.setTextareaInternalTextTag(data.InternalText);
        await page.setTextareaExternalTextTag(data.ExternalText);
        //#endregion

    } catch (error) {
        logFailTestcase(false, (error as Error).message + "\r\n" + (error as Error).stack);
    }
});

// Given("User fill data for product Fritidshus {string}", async function (dataKey) {
//     try {
//         // const mapPage = new MappingPage(SeleniumWebDriverService.getInstance());
//         // await mapPage.scan(true, "//app-product-layout");
//         const data = await DataRepo.getInstance().getFieldValue(dataKey);
//         const page = new QuoteCreateVillahemPage(this.context.driverService);
//         // FÖRSÄKRINGENS GILTIGHETSTID
//         await page.setInputstartDate(data.StartDate);
//         await page.setInputendDate(data.EndDate);
//         // UPPGIFTER OM FÖRSÄKRINGSTAGAREN
//         await page.setInputInsuredPersonSSNTag(data.GoodPersonNumber);
//         await page.setInputInsuredPersonFirstNameTag(data.FirstName);
//         await page.setInputInsuredPersonLastNameTag(data.LastName);
//         await page.setInputInsuredPersonDOBTag(data.DOB);
//         // UPPGIFTER OM VILLAFÖRSÄKRINGEN
//         await page.setInputHomeContentsHouseNameTag(data.HouseName);
//         await page.setInputHouseAddressTag(data.HouseAddress);
//         await page.setInputHomeContentsPostCodeTag(data.PostCode);
//         await page.setInputHomeContentsAcquiryDateTag(data.AcquiryDate);
//         await page.setSelectHomeContensPreviousHomeownerTag(data.PreviousHomeowner);
//         
//         console.log("yeah");
//     } catch (error) {
//         logFailTestcase(false, (error as Error).message);
//     }
// });

Given("User fill data for product Vattenskoter {string} for renew", async function (dataKey) {
    try {
        const data = await DataRepo2.getInstance().loadData(dataKey);
        // const mapPage = new MappingPage(SeleniumWebDriverService.getInstance());
        // await mapPage.scan(true);
        const VattenskoterPage = new QuoteCreateCabinPage(this.context.driverService);
        await VattenskoterPage.setInputstartDate(formatDateTime(data.StartDate));
        await VattenskoterPage.setInputendDate(formatDateTime(data.EndDate));
        await VattenskoterPage.setInputInsuredPersonFirstNameTag(data.FirstName);
        await VattenskoterPage.setInputInsuredPersonLastNameTag(data.LastName);
        const goodCustomer = true;
        if (goodCustomer) {
            await VattenskoterPage.setInputInsuredPersonSSNTag(data.GoodPersonNumber);
        } else {
            await VattenskoterPage.setInputInsuredPersonSSNTag(data.BadPersonNumber);
        }

        await VattenskoterPage.setInputStoragePostalCodeTag(data.Postnummer);
        await VattenskoterPage.setInputInsuredPersonDOBTag(formatDateTime(data.DOB));
        await VattenskoterPage.setNgselectMakeTag(data.MakeTag);
        await VattenskoterPage.setInputSerialNoTag(data.SerialNo);
        await VattenskoterPage.setInputModelYearTag(data.ModelYear);
        await VattenskoterPage.setNgselectVattenskoterValueTag(data.VattenskoterValue);
        await VattenskoterPage.setNgselectVattenskoterPowerTag(data.VattenskoterPower);
        await VattenskoterPage.setNgselectVattenskoterRegionTag(data.VattenskoterRegion);
        await VattenskoterPage.setNgselectStorageSeasonTag(data.StorageSeason);
        await VattenskoterPage.setNgselectStorageWinterTag(data.StorageWinter);
        await VattenskoterPage.setSelectVattenskoterUsedByCompanyTag(data.UsedByCompany);
        await VattenskoterPage.setInputStorageStreetTag(data.StorageStreet);
        await VattenskoterPage.setInputStoragePostalCodeTag(data.StoragePostalCode);
        await VattenskoterPage.setSelectVattenskoterTheftProtectionTag(data.TheftProtection);
        await VattenskoterPage.setNgselectGPSTrackerTag(data.GPSTracker);
        await VattenskoterPage.setNgselectVattenskoterEquippedReverseTag(data.EquippedReverse);
        await VattenskoterPage.setNgselectHasOtherMainInsuranceTag(data.HasOtherMainInsuranc);
        await VattenskoterPage.setSelectTypeOfInsuranceCoverTag(data.TypeOfInsuranceCover);
        await VattenskoterPage.setNgselectExcessTag(data.Excess);
        await VattenskoterPage.setSelectTrailerTag(data.Trailer);
        await VattenskoterPage.setTextareaInternalTextTag(data.InternalText);
        await VattenskoterPage.setTextareaExternalTextTag(data.ExternalText);
    } catch (error) {
        logFailTestcase(false, (error as Error).message);
    }
});

Given("User fill data for product Vattenskoter {string}", async function (dataKey) {
    try {
        const data = await DataRepo.getInstance().getFieldValue(dataKey);
        // const mapPage = new MappingPage(SeleniumWebDriverService.getInstance());
        // await mapPage.scan(true);
        const VattenskoterPage = new QuoteCreateCabinPage(this.context.driverService);
        await VattenskoterPage.setInputstartDate(formatDateTime(data.StartDate));
        await VattenskoterPage.setInputendDate(formatDateTime(data.EndDate));
        await VattenskoterPage.setInputInsuredPersonFirstNameTag(data.FirstName);
        await VattenskoterPage.setInputInsuredPersonLastNameTag(data.LastName);
        const goodCustomer = true;
        if (goodCustomer) {
            await VattenskoterPage.setInputInsuredPersonSSNTag(data.GoodPersonNumber);
        } else {
            await VattenskoterPage.setInputInsuredPersonSSNTag(data.BadPersonNumber);
        }

        await VattenskoterPage.setInputStoragePostalCodeTag(data.Postnummer);
        await VattenskoterPage.setInputInsuredPersonDOBTag(formatDateTime(data.DOB));
        await VattenskoterPage.setNgselectMakeTag(data.MakeTag);
        await VattenskoterPage.setInputSerialNoTag(data.SerialNo);
        await VattenskoterPage.setInputModelYearTag(data.ModelYear);
        await VattenskoterPage.setNgselectVattenskoterValueTag(data.VattenskoterValue);
        await VattenskoterPage.setNgselectVattenskoterPowerTag(data.VattenskoterPower);
        await VattenskoterPage.setNgselectVattenskoterRegionTag(data.VattenskoterRegion);
        await VattenskoterPage.setNgselectStorageSeasonTag(data.StorageSeason);
        await VattenskoterPage.setNgselectStorageWinterTag(data.StorageWinter);
        await VattenskoterPage.setSelectVattenskoterUsedByCompanyTag(data.UsedByCompany);
        await VattenskoterPage.setInputStorageStreetTag(data.StorageStreet);
        await VattenskoterPage.setInputStoragePostalCodeTag(data.StoragePostalCode);
        await VattenskoterPage.setSelectVattenskoterTheftProtectionTag(data.TheftProtection);
        await VattenskoterPage.setNgselectGPSTrackerTag(data.GPSTracker);
        await VattenskoterPage.setNgselectVattenskoterEquippedReverseTag(data.EquippedReverse);
        await VattenskoterPage.setNgselectHasOtherMainInsuranceTag(data.HasOtherMainInsuranc);
        await VattenskoterPage.setSelectTypeOfInsuranceCoverTag(data.TypeOfInsuranceCover);
        await VattenskoterPage.setNgselectExcessTag(data.Excess);
        await VattenskoterPage.setSelectTrailerTag(data.Trailer);
        await VattenskoterPage.setTextareaInternalTextTag(data.InternalText);
        await VattenskoterPage.setTextareaExternalTextTag(data.ExternalText);
    } catch (error) {
        logFailTestcase(false, (error as Error).message);
    }
});

Given("User fill data for product Villahem {string}", async function (dataKey) {
    try {
        //#PRODUCT Villahem version 30
        // const mapPage = new MappingPage(SeleniumWebDriverService.getInstance());
        // await mapPage.scan(true, "//app-product-layout");
        const data = await DataRepo.getInstance().getFieldValue(dataKey);
        const page = new QuoteCreateVillahemPage(this.context.driverService);
        //#region Försäkringsinformation
        await page.setInputstartDate(formatDateTime(data.StartDate));
        await page.setInputendDate(formatDateTime(data.EndDate));
        await page.setInputeffectiveDate(formatDateTime(data.EffectiveDate));
        //#endregion

        //#region Uppgifter om dig
        await page.setInputInsuredPersonSSNTag(data.SSN);
        await page.setInputInsuredPersonFirstNameTag(data.FirstName);
        await page.setInputInsuredPersonLastNameTag(data.LastName);
        if (data.DOB) {
            await page.setInputInsuredPersonDOBTag(formatDateTime(data.DOB));
        }
        //#endregion

        //#region Uppgifter om villaförsäkringen
        await page.setInputHomeContentsHouseNameTag(data.HouseName);
        await page.setInputHouseAddressTag(data.HouseAddress);
        await page.setInputHomeContentsPostCodeTag(data.PostCode);
        await page.setInputHomeContentsAquiryDateTag(data.AquiryDate);
        await page.setSelectHomeContensPreviousHomeownerTag(data.PreviousHomeowner);
        await page.setSelectHomeContentsHouseMarkTag(data.HouseMark);//new
        await page.setInputHomeContentsHouseAreaTag(data.HouseArea);
        await page.setInputHomeContentsHouseTag(data.House); //new
        await page.setNgselectHomeContentsNumberOfPeopleLivingTag(data.NumberOfPeopleLiving); //new
        await page.setSelectHomeContentsNumberOfChildren(data.NumberOfChildren);
        await page.setSelectHomeContentsAgeOfChildren(data.AgeOfChildren);//new
        await page.setInputHomeContentsHouseBuiltYearTag(data.BuiltYear);
        await page.setSelectElectricityAndPlumbingReplacedAndChimneyTestedTag(data.ElectricityAndPlumbingReplacedAndChimneyTested);
        await page.setInputHomeContentsHouseRenovationYearTag(data.HouseRenovationYear);
        await page.setSelectAreTreesCloseToHouseTag(data.AreTreesCloseToHouse);
        await page.setSelectNumberOfFirePlacesTag(data.NumberOfFirePlaces);
        await page.setNgselectHomeContentsBuildingTypeTag(data.BuildingType);//new
        await page.setSelectPlotTypeTag(data.PlotType); //new
        await page.setSelectHomeContentsSuterranghusTag(data.Suterranghus); //new
        await page.setSelectHasWaterBorneHeatingSystemTag(data.HasWaterBorneHeatingSystem); //new
        await page.setSelectHasGeothermalPumpsTag(data.HasGeothermalPumps);
        await page.setSelectHasKitchenMoreThanOneWaterConnectedMachinesTag(data.HasKitchenMoreThanOneWaterConnectedMachines);
        await page.setNgselectHomeContentsNumberOfBathAndShowerTag(data.NumberOfBathAndShower); //new
        await page.setNgselectHomeContentsNumberOfWCTag(data.NumberOfWC); //new
        await page.setSelectHasPoolOrSpaOrHotTubTag(data.HasPoolOrSpaOrHotTub); //new
        await page.setNgselectHomeContentsAlarmTag(data.Alarm); //new
        await page.setSelectHasLargeConservatoryTag(data.HasLargeConservatory);
        await page.setNgselectHomeContentsVillaBaseExcessTag(data.VillaBaseExcess);
        //#endregion

        //#region Uppgifter om övriga byggnader
        await page.setSelectHomeContentsMoreBuildingsTag(data.MoreBuildings);
        if (data.MoreBuildings != "0" && data.MoreBuildings) {
            for (let i = 0; i < data.MoreBuildings; i++) {
                //#region Uppgifter om övriga byggnader - section i + 1
                await page.setNgselectHomeContentsAdditionalBuildingTag(data.AdditionalBuilding[i], i + 1);
                await page.setInputHomeContentsBuildingAdditionalSpaceTag(data.BuildingAdditionalSpace[i], i + 1);
                await page.setNgselectHomeContentsStandardTag(data.Standard[i], i + 1);
                //#endregion
            }
        }
        //#endregion

        //#region Uppgifter om hemförsäkringen
        await page.setSelectHomeContentsHomeInsuranceTag(data.HomeInsurance); //new
        await page.setNgselectHomeContentsSumInsuredTag(data.SumInsured);
        await page.setNgselectHomeContentsHomeBaseExcessTag(data.BaseExcess);
        await page.setNgselectHomeContentsCombinationOptionalCoverTag(data.CombinationOptionalCover); //new
        await page.setSelectContentsAllriskTag(data.Allrisk); //new
        await page.setSelectTravelAllriskTag(data.TravelAllrisk); //new
        await page.setSelectCancellationTag(data.Cancellation); //new
        await page.setSelectPARecreationalTag(data.PARecreational); //new
        await page.setSelectCrisisTag(data.Crisis);//new
        await page.setSelectIDTheftTag(data.IDTheft); //new
        //#endregion

        //#region Tilläggsförsäkringar villa
        await page.setSelectHomeContentsVillaAllRiskTag(data.VillaAllRisk); //new
        await page.setSelectHomeContentsVillaBoatTag(data.VillaBoat);
        await page.setSelectHomeContentsVillaDeductibleEliminationTag(data.VillaDeductibleElimination); //new
        //#endregion

        //#region Övriga uppgifter
        await page.setTextareaExternalTextTag(data.ExternalText);
        //#endregion

    } catch (error) {
        logFailTestcase(false, (error as Error).message + "\r\n" + (error as Error).stack);
    }
});



Given("User change to Bad Credit Customer {string} for renew", async function (dataKey) {
    try {
        const data = await DataRepo2.getInstance().loadData(dataKey);
        const VattenskoterPage = new QuoteCreateCabinPage(this.context.driverService);
        await VattenskoterPage.waitPageLoaded();
        await VattenskoterPage.waitPageProgressCompleted();
        await VattenskoterPage.setInputInsuredPersonSSNTag(data.BadPersonNumber);
    } catch (error) {
        logFailTestcase(false, (error as Error).message);
    }
});

Given("User change to Bad Credit Customer {string}", async function (dataKey) {
    try {
        const data = await DataRepo.getInstance().getFieldValue(dataKey);
        const VattenskoterPage = new QuoteCreateCabinPage(this.context.driverService);
        await VattenskoterPage.setInputInsuredPersonSSNTag(data.BadPersonNumber);
        await VattenskoterPage.setInputEffectiveDate(data.EffectiveDate);
    } catch (error) {
        logFailTestcase(false, (error as Error).message);
    }
});

Given("User click button Adjust policy", async function () {
    try {
        const creatingQuoteInsurance = new CreatingQuoteInsurance(this.context.driverService);
        const temp = await creatingQuoteInsurance.clickAdjustPolicy();
        if (!temp) {
            logWarningMessage("Can't Adjust this policy!");
        }
    } catch (error) {
        logFailTestcase(false, (error as Error).message);
    }
});

Given("User click button Renew policy after change to blacklist customer", async function () {
    try {
        const creatingQuoteInsurance = new CreatingQuoteInsurance(this.context.driverService);
        const temp = await creatingQuoteInsurance.clickRenewPolicy();
        if (!temp) {
            logWarningMessage("Can't Renew this policy!");
        }
    } catch (error) {
        logFailTestcase(false, (error as Error).message);
    }
});

Given("User verifies info on Quote form of Bad Credit Customer for Varsam product {string}", async function (dataKey) {
    try {
        const data = await DataRepo.getInstance().getFieldValue(dataKey);
        const quoteCreatingQuote = new QuoteCreatingQuote(this.context.driverService);
        let temp = true;

        logInfoMessage(`\tVerify input fields:`);
        temp = await quoteCreatingQuote.validatePremiumExlTax_AnnualPremium_Premium(data.BadCustomer_PremiumExlTag);
        logFailTestcase(temp, "Incorrect UnderwritingAdjustment");

        temp = await quoteCreatingQuote.validateUnderwritingAdjustment_AnnualPremium_Premium(data.BadCustomer_AnnualPremium_SalesDiscount);
        logFailTestcase(temp, `Incorrect SalesDiscount`);

        temp = await quoteCreatingQuote.validateProductCommission_AnnualPremium_Premium(data.BadCustomer_AnnualPremium_ProductCommission);
        logFailTestcase(temp, `Incorrect ProductCommission`);

        temp = await quoteCreatingQuote.validateValueSalesCommission_Premium(data.BadCustomer_AnnualPremium_SalesCommission);
        logFailTestcase(temp, `Incorrect SalesCommission`);

        //
        temp = await quoteCreatingQuote.validatePremiumExlTax_PolicyPremium_Premium(data.BadCustomer_PolicyPremium_PremiumExlTag);
        logFailTestcase(temp, "Incorrect PremiumExlTax Policy Premium");

        temp = await quoteCreatingQuote.validateUnderwritingAdjustment_PolicyPremium_Premium(data.BadCustomer_PolicyPremium_UnderwritingAdjustment);
        logFailTestcase(temp, "Incorrect UnderwritingAdjustment Policy Premium");

        temp = await quoteCreatingQuote.validateUnderwritingAdjustment_PolicyPremium_Premium(data.BadCustomer_PolicyPremium_SalesDiscount);
        logFailTestcase(temp, "Incorrect SalesDiscount Policy Premium");

        temp = await quoteCreatingQuote.validateUnderwritingAdjustment_PolicyPremium_Premium(data.BadCustomer_PolicyPremium_ProductCommission);
        logFailTestcase(temp, "Incorrect ProductCommission Policy Premium");

        temp = await quoteCreatingQuote.validateUnderwritingAdjustment_PolicyPremium_Premium(data.BadCustomer_PolicyPremium_SalesCommission);
        logFailTestcase(temp, "Incorrect SalesCommission Policy Premium");

        // cover breakdown validation
        temp = await quoteCreatingQuote.validateCoverBreakdownByIndex(data.BadCustomer_AnnualLegalProtection, 1, 2);
        logFailTestcase(temp, `Incorrect Cover Breakdown Annual Legal Protection`);

        temp = await quoteCreatingQuote.validateCoverBreakdownByIndex(data.BadCustomer_AnnualLiability, 2, 2);
        logFailTestcase(temp, `Incorrect Cover Breakdown Annual Liability`);

        temp = await quoteCreatingQuote.validateCoverBreakdownByIndex(data.BadCustomer_AnnualMachineryBreakdown, 3, 2);
        logFailTestcase(temp, `Incorrect Cover Breakdown Annual Machinery`);

        temp = await quoteCreatingQuote.validateCoverBreakdownByIndex(data.BadCustomer_AnnualPropertyDamage, 4, 2);
        logFailTestcase(temp, `Incorrect Cover Breakdown Annual Property Damaged`);

        temp = await quoteCreatingQuote.validateCoverBreakdownByIndex(data.BadCustomer_PremiumLegalProtection, 1, 3);
        logFailTestcase(temp, `Incorrect Cover Breakdown Premium Legal Protection`);

        temp = await quoteCreatingQuote.validateCoverBreakdownByIndex(data.BadCustomer_PremiumLiability, 2, 3);
        logFailTestcase(temp, `Incorrect Cover Breakdown Premium Liability`);

        temp = await quoteCreatingQuote.validateCoverBreakdownByIndex(data.BadCustomer_PremiumMachineryBreakdown, 3, 3);
        logFailTestcase(temp, `Incorrect Cover Breakdown Premium Machinery`);

        temp = await quoteCreatingQuote.validateCoverBreakdownByIndex(data.BadCustomer_PremiumPropertyDamage, 4, 3);
        logFailTestcase(temp, `Incorrect Cover Breakdown Premium Property Damaged`);

    } catch (error) {
        logFailTestcase(false, (error as Error).message);
    }
});

Given("User verifies info on Creating Quote form for Varsam product Fritidshus {string}", async function (dataKey) {
    const data = await DataRepo2.getInstance().loadData(dataKey);
    const quoteCreatingQuote = new QuoteCreatingQuote(this.context.driverService);
    let temp = true;

    let AnnualPremium_PremiumExlTax = data.Premium[0].AnnualPremium_PremiumExlTax;
    let AnnualPremium_UnderwritingAdjustment = data.Premium[0].AnnualPremium_UnderwritingAdjustment;
    let AnnualPremium_SalesDiscount = data.Premium[0].AnnualPremium_SalesDiscount;
    let AnnualPremium_ProductCommission = data.Premium[0].AnnualPremium_ProductCommission;
    let AnnualPremium_SalesCommission = data.Premium[0].AnnualPremium_SalesCommission;
    let AnnualPremium_Tax = data.Premium[0].AnnualPremium_Tax;
    let TotalPremium_AnnualPremium = data.Premium[0].TotalPremium_AnnualPremium;


    let PolicyPremium_PremiumExlTax = data.Premium[1].PolicyPremium_PremiumExlTax;
    let PolicyPremium_UnderwritingAdjustment = data.Premium[1].PolicyPremium_UnderwritingAdjustment;
    let PolicyPremium_SalesDiscount = data.Premium[1].PolicyPremium_SalesDiscount;
    let PolicyPremium_ProductCommission = data.Premium[1].PolicyPremium_ProductCommission;
    let PolicyPremium_SalesCommission = data.Premium[1].PolicyPremium_SalesCommission;
    let PolicyPremium_Tax = data.Premium[1].PolicyPremium_Tax;
    let TotalPremium_PolicyPremium = data.Premium[1].TotalPremium_PolicyPremium;

    let Currency = data.Currency;


    logInfoMessage(`\tVerify PREMIUM SECTION :`);
    temp = await quoteCreatingQuote.validatePremiumExlTax_AnnualPremium_Premium(numberToCurrency(AnnualPremium_PremiumExlTax, true, Currency));
    logFailTestcase(temp, "Incorrect PremiumExlTax");

    temp = await quoteCreatingQuote.validateUnderwritingAdjustment_AnnualPremium_Premium(numberToCurrency(AnnualPremium_UnderwritingAdjustment, true, Currency));
    logFailTestcase(temp, `Incorrect UnderwritingAdjustment`);

    temp = await quoteCreatingQuote.validateSalesDiscount_AnnualPremium_Premium(numberToCurrency(AnnualPremium_SalesDiscount, true, Currency));
    logFailTestcase(temp, `Incorrect SalesDiscount`);

    temp = await quoteCreatingQuote.validateProductCommission_AnnualPremium_Premium(numberToCurrency(AnnualPremium_ProductCommission, true, Currency));
    logFailTestcase(temp, `Incorrect ProductCommission`);

    temp = await quoteCreatingQuote.validateSalesCommission_AnnualPremium_Premium(AnnualPremium_SalesCommission);
    logFailTestcase(temp, `Incorrect SalesCommission`);

    temp = await quoteCreatingQuote.validateTax_AnnualPremium_Premium(numberToCurrency(AnnualPremium_Tax, true, Currency));
    logFailTestcase(temp, `Incorrect AnnualTax`);

    temp = await quoteCreatingQuote.validateTotalPremium_AnnualPremium_Premium(numberToCurrency(TotalPremium_AnnualPremium, true, Currency));
    logFailTestcase(temp, `Incorrect TotalAnnualPremium`);



    temp = await quoteCreatingQuote.validatePremiumExlTax_PolicyPremium_Premium(numberToCurrency(PolicyPremium_PremiumExlTax, true, Currency));
    logFailTestcase(temp, "Incorrect PremiumExlTax");

    temp = await quoteCreatingQuote.validateUnderwritingAdjustment_PolicyPremium_Premium(numberToCurrency(PolicyPremium_UnderwritingAdjustment, true, Currency));
    logFailTestcase(temp, `Incorrect UnderwritingAdjustment`);

    temp = await quoteCreatingQuote.validateSalesDiscount_PolicyPremium_Premium(numberToCurrency(PolicyPremium_SalesDiscount, true, Currency));
    logFailTestcase(temp, `Incorrect SalesDiscount`);

    temp = await quoteCreatingQuote.validateProductCommission_PolicyPremium_Premium(numberToCurrency(PolicyPremium_ProductCommission, true, Currency));
    logFailTestcase(temp, `Incorrect ProductCommission`);

    temp = await quoteCreatingQuote.validateSalesCommission_PolicyPremium_Premium(PolicyPremium_SalesCommission);
    logFailTestcase(temp, `Incorrect SalesCommission`);

    temp = await quoteCreatingQuote.validateTax_PolicyPremium_Premium(numberToCurrency(PolicyPremium_Tax, true, Currency));
    logFailTestcase(temp, `Incorrect PolicyTax`);

    temp = await quoteCreatingQuote.validateTotalPremium_PolicyPremium_Premium(numberToCurrency(TotalPremium_PolicyPremium, true, Currency));
    logFailTestcase(temp, `Incorrect Tax`);


    if (data.CoverBreakdown) {
        logInfoMessage(`\tVerify COVER BREAKDOWN SECTION :`);
        let arrayKeyCoverBreakdownAnnualPremium = Object.keys(data.CoverBreakdown[0]);
        let arrayKeyCoverBreakdownPolicyPremium = Object.keys(data.CoverBreakdown[1]);

        //ANNUAL PREMIUM COLUMN
        for (let i = 0; i < arrayKeyCoverBreakdownAnnualPremium.length; i++) {
            temp = await quoteCreatingQuote.validateCoverBreakdownByIndex(numberToCurrency(data.CoverBreakdown[0][arrayKeyCoverBreakdownAnnualPremium[i]], true, Currency), i + 1, 2);
            logFailTestcase(temp, `Incorrect value at '${arrayKeyCoverBreakdownAnnualPremium[i]}' annual premium column`);

            temp = await quoteCreatingQuote.validateCoverBreakdownByIndex(numberToCurrency(data.CoverBreakdown[1][arrayKeyCoverBreakdownPolicyPremium[i]], true, Currency), i + 1, 3);
            logFailTestcase(temp, `Incorrect value at '${arrayKeyCoverBreakdownPolicyPremium[i]}' policy premium column`);
        }

    }
});

Given("User verifies info on Creating Quote form for Varsam product section Adjustment {string}", async function (dataKey) {
    const data = await DataRepo.getInstance().getFieldValue(dataKey);
    const quoteCreatingQuote = new QuoteCreatingQuote(this.context.driverService);
    let temp = true;

    temp = await quoteCreatingQuote.validatePremiumExlTax_MTA_AnnualPremium_Premium(numberToCurrency(data.Premium[0].AnnualPremium_PremiumExlTaxMTA[1], true, data.Currency), data.Premium[0].AnnualPremium_PremiumExlTaxMTA[0]);
    logFailTestcase(temp, `Incorrect PremiumExlTaxAnnualPremium_MTA!`);

    temp = await quoteCreatingQuote.validateUnderwritingAdjustment_MTA_AnnualPremium_Premium(numberToCurrency(data.Premium[0].AnnualPremium_UnderwritingAdjustmentMTA[1], true, data.Currency), data.Premium[0].AnnualPremium_UnderwritingAdjustmentMTA[0]);
    logFailTestcase(temp, `Incorrect UnderwritingAdjustmentAnnualPremium_MTA!`);


    temp = await quoteCreatingQuote.validateSalesDiscount_MTA_AnnualPremium_Premium(numberToCurrency(data.Premium[0].AnnualPremium_SalesDiscountMTA[1], true, data.Currency), data.Premium[0].AnnualPremium_SalesDiscountMTA[0]);
    logFailTestcase(temp, `Incorrect SalesDiscountAnnualPremium_MTA!`);


    temp = await quoteCreatingQuote.validateProductCommission_MTA_AnnualPremium_Premium(numberToCurrency(data.Premium[0].AnnualPremium_ProductCommissionMTA[1], true, data.Currency), data.Premium[0].AnnualPremium_ProductCommissionMTA[0]);
    logFailTestcase(temp, `Incorrect ProductCommissionAnnualPremium_MTA!`);


    temp = await quoteCreatingQuote.validateSalesCommission_MTA_AnnualPremium_Premium(numberToCurrency(data.Premium[0].AnnualPremium_SalesCommissionMTA[1], true, data.Currency), data.Premium[0].AnnualPremium_SalesCommissionMTA[0]);
    logFailTestcase(temp, `Incorrect SalesCommissionAnnualPremium_MTA!`);


    temp = await quoteCreatingQuote.validateTax_MTA_AnnualPremium_Premium(numberToCurrency(data.Premium[0].AnnualPremium_TaxMTA[1], true, data.Currency), data.Premium[0].AnnualPremium_TaxMTA[0]);
    logFailTestcase(temp, `Incorrect TaxAnnualPremium_MTA!`);


    temp = await quoteCreatingQuote.validateTotalPremium_MTA_AnnualPremium_Premium(numberToCurrency(data.Premium[0].TotalPremium_AnnualPremiumMTA[1], true, data.Currency), data.Premium[0].TotalPremium_AnnualPremiumMTA[0]);
    logFailTestcase(temp, `Incorrect TotalPremiumAnnualPremium_MTA!`);

    //#endregion

    //#region Policy Premium check change after MTA 
    temp = await quoteCreatingQuote.validatePremiumExlTax_MTA_PolicyPremium_Premium(numberToCurrency(data.Premium[1].PolicyPremium_PremiumExlTaxMTA[1], true, data.Currency), data.Premium[1].PolicyPremium_PremiumExlTaxMTA[0]);
    logFailTestcase(temp, `Incorrect PremiumExlTaxPolicyPremiumMTA!`);


    temp = await quoteCreatingQuote.validateUnderwritingAdjustment_MTA_PolicyPremium_Premium(numberToCurrency(data.Premium[1].PolicyPremium_UnderwritingAdjustmentMTA[1], true, data.Currency), data.Premium[1].PolicyPremium_UnderwritingAdjustmentMTA[0]);
    logFailTestcase(temp, `Incorrect UnderwritingAdjustmentPolicyPremiumMTA!`);


    temp = await quoteCreatingQuote.validateSalesDiscount_MTA_PolicyPremium_Premium(numberToCurrency(data.Premium[1].PolicyPremium_SalesDiscountMTA[1], true, data.Currency), data.Premium[1].PolicyPremium_SalesDiscountMTA[0]);
    logFailTestcase(temp, `Incorrect SalesDiscountPolicyPremiumMTA!`);


    temp = await quoteCreatingQuote.validateProductCommission_MTA_PolicyPremium_Premium(numberToCurrency(data.Premium[1].PolicyPremium_ProductCommissionMTA[1], true, data.Currency), data.Premium[1].PolicyPremium_ProductCommissionMTA[0]);
    logFailTestcase(temp, `Incorrect ProductCommissionPolicyPremiumMTA!`);


    temp = await quoteCreatingQuote.validateSalesCommission_MTA_PolicyPremium_Premium(numberToCurrency(data.Premium[1].PolicyPremium_SalesCommissionMTA[1], true, data.Currency), data.Premium[1].PolicyPremium_SalesCommissionMTA[0]);
    logFailTestcase(temp, `Incorrect SalesCommissionPolicyPremiumMTA!`);


    temp = await quoteCreatingQuote.validateTax_MTA_PolicyPremium_Premium(numberToCurrency(data.Premium[1].PolicyPremium_TaxMTA[1], true, data.Currency), data.Premium[1].PolicyPremium_TaxMTA[0]);
    logFailTestcase(temp, `Incorrect TaxPolicyPremiumMTA!`);


    temp = await quoteCreatingQuote.validateTotalPremium_MTA_PolicyPremium_Premium(numberToCurrency(data.Premium[1].TotalPremium_PolicyPremiumMTA[1], true, data.Currency), data.Premium[1].TotalPremium_PolicyPremiumMTA[0]);
    logFailTestcase(temp, `Incorrect Total Premium Policy PremiumMTA!`);

    //#endregion


});

Given("User inputs data at Premium section on Creating Quote form for Varsam product {string}", async function (dataKey) {
    const data = await DataRepo2.getInstance().loadData(dataKey);
    const quoteCreatingQuote = new QuoteCreatingQuote(this.context.driverService);
    await inputPremiumSectionOnCreatingQuote(quoteCreatingQuote, data);
});

Given("User inputs data on Create Quote form for Varsam product Innbo Seasonal {string}", async function (filename) {
    let rows = await DataRepo2.getInstance().loadData(filename);
    let row = rows[0];
    if (filename.includes("json")) {
        row = rows;
    }
    pushObjectToDataArrayWithUniqueKey("QuoteReference", await accountTabQuoteCreateQuoteVarsamProductInnboSeasonal.getQuoteRef());
    // POLICY TERM
    let startDate = row.StartDate;
    let endDate = row.EndDate;
    const StartDateMinusToday = row.StartDateMinusToday;
    const EndDateMinusStartDate = row.EndDateMinusStartDate;
    const EndDateMinusToday = row.EndDateMinusToday;

    if (StartDateMinusToday) {
        startDate = getDate(StartDateMinusToday);
    }
    if (EndDateMinusStartDate) {
        endDate = addDate(startDate, EndDateMinusStartDate);
    }
    if (EndDateMinusToday) {
        endDate = getDate(EndDateMinusToday);
    }

    // EffectiveDate for MTA policy
    let effectiveDate = row.EffectiveDate;
    const EffectiveDateMinusToday = row.EffectiveDateMinusToday;
    if (EffectiveDateMinusToday) {
        effectiveDate = getDate(EffectiveDateMinusToday);
    }

    // POLICYHOLDER
    const FirstName = row.FirstName;
    const LastName = row.LastName;
    const DOB = row.DOB;
    const CreditRating = row.CreditRating;
    const CustomerClaimCount = row.CustomerClaimCount;

    // BUILDING INFORMATION
    const Address = row.Address;
    const PostCode = row.PostCode;
    const City = row.City;
    const RentType = row.RentType;
    const AlarmSytem = row.AlarmSytem;
    const SmokeDetector = row.SmokeDetector;
    const WaterStopSystem = row.WaterStopSystem;
    const Electricity = row.Electricity;
    const NumberOfResidents = row.NumberOfResidents;
    const Hussopp = row.Hussopp;

    // INNBOFORSIKRING
    const ContentSumInsured = row.ContentSumInsured;
    const CoverType = row.CoverType;
    if (CoverType && CoverType.toString().toLowerCase() === "traffic only") {
        pushObjectToDataArrayWithUniqueKey("CoverTypeConfig", "TrafficOnly");
    }
    else if (CoverType && CoverType.toString().toLowerCase() === "partial insurance") {
        pushObjectToDataArrayWithUniqueKey("CoverTypeConfig", "PartialInsurance");
    }
    else if (CoverType && CoverType.toString().toLowerCase() === "full insurance") {
        pushObjectToDataArrayWithUniqueKey("CoverTypeConfig", "FullInsurance");
    }

    const ContentType = row.ContentType;
    const ResidenceType = row.ResidenceType;
    const DeductibleContent = row.DeductibleContent;
    const ContentCover = row.ContentCover;

    // EL-SYKKEL
    const AddBicycle1 = row.AddBicycle1;
    const BicycleSumInsured1 = row.BicycleSumInsured1;
    const ElectricBicycleCover1 = row.ElectricBicycleCover1;

    const AddBicycle2 = row.AddBicycle2;
    const BicycleSumInsured2 = row.BicycleSumInsured2;
    const ElectricBicycleCover2 = row.ElectricBicycleCover2;

    // OTHER INFORMATION
    const InternalNote = row.InternalNote;
    const ExternalText = row.ExternalText;
    const TerminationText = row.TerminationText;

    let temp = true;
    //#region Policy term
    if (startDate) {
        temp = await accountTabQuoteCreateQuoteVarsamProductInnboSeasonal.inputStartDate(startDate);
        logFailTestcase(temp, `Input start date failed!`);
    }
    if (endDate) {
        temp = await accountTabQuoteCreateQuoteVarsamProductInnboSeasonal.inputEndDate(endDate);
        logFailTestcase(temp, `Input End date failed!`);
    }

    if (effectiveDate) {
        temp = await accountTabQuoteCreateQuoteVarsamProductInnboSeasonal.inputEffectiveDate(effectiveDate);
        logFailTestcase(temp, `Input Effective Date failed!`);
    }
    //#endregion

    //#region Policy Holder
    if (FirstName) {
        temp = await accountTabQuoteCreateQuoteVarsamProductInnboSeasonal.inputFirstName_PolicyHolder(FirstName);
        logFailTestcase(temp, `Input First Name falied!`);
    }
    if (LastName) {
        temp = await accountTabQuoteCreateQuoteVarsamProductInnboSeasonal.inputLastName_PolicyHolder(LastName);
        logFailTestcase(temp, `Input Last Name failed!`);
    }
    if (DOB) {
        temp = await accountTabQuoteCreateQuoteVarsamProductInnboSeasonal.inputDOB_PolicyHolder(DOB);
        logFailTestcase(temp, `Input DOB failed!`);
    }
    if (CreditRating) {
        temp = await accountTabQuoteCreateQuoteVarsamProductInnboSeasonal.inputCreditRating_PolicyHolder(CreditRating);
        logFailTestcase(temp, `Input CreditRating failed!`);
    }
    //#endregion

    //#region BUILDING INFORMATION
    if (Address) {
        temp = await accountTabQuoteCreateQuoteVarsamProductInnboSeasonal.inputAddress_BuildingInfo(Address);
        logFailTestcase(temp, `Input Address failed!`);
    }
    if (PostCode) {
        temp = await accountTabQuoteCreateQuoteVarsamProductInnboSeasonal.inputPostCode_BuildingInfo(PostCode);
        logFailTestcase(temp, `Input PostCode failed!`);
    }
    if (City) {
        temp = await accountTabQuoteCreateQuoteVarsamProductInnboSeasonal.inputCity_BuildingInfo(City);
        logFailTestcase(temp, `Input City failed!`);
    }
    if (RentType) {
        temp = await accountTabQuoteCreateQuoteVarsamProductInnboSeasonal.inputRentType_BuildingInfo(RentType);
        logFailTestcase(temp, `Input RentType failed!`);
    }
    if (AlarmSytem) {
        temp = await accountTabQuoteCreateQuoteVarsamProductInnboSeasonal.inputAlarmSytem_BuildingInfo(AlarmSytem);
        logFailTestcase(temp, `Input AlarmSytem failed!`);
    }
    if (SmokeDetector) {
        temp = await accountTabQuoteCreateQuoteVarsamProductInnboSeasonal.inputSmokeDetector_BuildingInfo(SmokeDetector);
        logFailTestcase(temp, `Input SmokeDetector failed!`);
    }
    if (WaterStopSystem) {
        temp = await accountTabQuoteCreateQuoteVarsamProductInnboSeasonal.inputWaterStopSystem_BuildingInfo(WaterStopSystem);
        logFailTestcase(temp, `Input WaterStopSystem failed!`);
    }
    if (Electricity) {
        temp = await accountTabQuoteCreateQuoteVarsamProductInnboSeasonal.inputElectricity_BuildingInfo(Electricity);
        logFailTestcase(temp, `Input Electricity failed!`);
    }
    if (NumberOfResidents) {
        temp = await accountTabQuoteCreateQuoteVarsamProductInnboSeasonal.inputNumberOfResidents_BuildingInfo(NumberOfResidents);
        logFailTestcase(temp, `Input NumberOfResidents failed!`);
    }
    if (Hussopp) {
        temp = await accountTabQuoteCreateQuoteVarsamProductInnboSeasonal.inputHussopp_BuildingInfo(Hussopp);
        logFailTestcase(temp, `Input Hussopp failed!`);
    }
    //#endregion

    //#region INNBOFORSIKRING
    if (ContentSumInsured) {
        temp = await accountTabQuoteCreateQuoteVarsamProductInnboSeasonal.inputContentSumInsured_Innbofor(ContentSumInsured);
        logFailTestcase(temp, `Input ContentSumInsured failed!`);
    }
    if (CoverType) {
        temp = await accountTabQuoteCreateQuoteVarsamProductInnboSeasonal.inputCoverType_Innbofor(CoverType);
        logFailTestcase(temp, `Input CoverType failed!`);
    }
    if (ContentType) {
        temp = await accountTabQuoteCreateQuoteVarsamProductInnboSeasonal.inputContentType_Innbofor(ContentType);
        logFailTestcase(temp, `Input ContentType failed!`);
    }
    if (ResidenceType) {
        temp = await accountTabQuoteCreateQuoteVarsamProductInnboSeasonal.inputResidenceType_Innbofor(ResidenceType);
        logFailTestcase(temp, `Input ResidenceType failed!`);
    }
    if (DeductibleContent) {
        temp = await accountTabQuoteCreateQuoteVarsamProductInnboSeasonal.inputDeductibleContent_Innbofor(DeductibleContent);
        logFailTestcase(temp, `Input DeductibleContent failed!`);
    }
    if (ContentCover) {
        temp = await accountTabQuoteCreateQuoteVarsamProductInnboSeasonal.inputContentCover_Innbofor(ContentCover);
        logFailTestcase(temp, `Input ContentCover failed!`);
    }
    //#endregion

    //#region EL-SYKKEL
    if (AddBicycle1) {
        temp = await accountTabQuoteCreateQuoteVarsamProductInnboSeasonal.inputAddBicycle1_ElSkykel(AddBicycle1);
        logFailTestcase(temp, `Input AddBicycle1 failed!`);
    }
    if (BicycleSumInsured1) {
        temp = await accountTabQuoteCreateQuoteVarsamProductInnboSeasonal.inputBicycleSumInsured1_ElSkykel(BicycleSumInsured1);
        logFailTestcase(temp, `Input BicycleSumInsured1 failed!`);
    }
    if (ElectricBicycleCover1) {
        temp = await accountTabQuoteCreateQuoteVarsamProductInnboSeasonal.inputElectricBicycleCover1_ElSkykel(ElectricBicycleCover1);
        logFailTestcase(temp, `Input ElectricBicycleCover1 failed!`);
    }

    if (AddBicycle2) {
        temp = await accountTabQuoteCreateQuoteVarsamProductInnboSeasonal.inputAddBicycle2_ElSkykel(AddBicycle2);
        logFailTestcase(temp, `Input AddBicycle2 failed!`);
    }
    if (BicycleSumInsured2) {
        temp = await accountTabQuoteCreateQuoteVarsamProductInnboSeasonal.inputBicycleSumInsured2_ElSkykel(BicycleSumInsured2);
        logFailTestcase(temp, `Input BicycleSumInsured2 failed!`);
    }
    if (ElectricBicycleCover2) {
        temp = await accountTabQuoteCreateQuoteVarsamProductInnboSeasonal.inputElectricBicycleCover2_ElSkykel(ElectricBicycleCover2);
        logFailTestcase(temp, `Input ElectricBicycleCover2 failed!`);
    }
    //#endregion

    //#region OTHER INFORMATION
    if (InternalNote) {
        temp = await accountTabQuoteCreateQuoteVarsamProductInnboSeasonal.inputInternalNote_OtherInformation(InternalNote);
        logFailTestcase(temp, `Input InternalNote failed!`);
    }
    if (ExternalText) {
        temp = await accountTabQuoteCreateQuoteVarsamProductInnboSeasonal.inputExternalText_OtherInformation(ExternalText);
        logFailTestcase(temp, `Input ExternalText failed!`);
    }
    if (TerminationText) {
        temp = await accountTabQuoteCreateQuoteVarsamProductInnboSeasonal.inputTerminationText_OtherInformation(TerminationText);
        logFailTestcase(temp, `Input TerminationText failed!`);
    }
    if (CustomerClaimCount) {
        temp = await accountTabQuoteCreateQuoteVarsamProductInnboSeasonal.inputCustomerClaimCount_PolicyHolder(CustomerClaimCount);
        logFailTestcase(temp, `Input CustomerClaimCount failed!`);
    }
    //#endregion

    //#region Push info to dataTestExecution
    if (Address) {
        pushObjectToDataArrayWithUniqueKey("PolicyDescription", Address);
    }
    pushObjectToDataArrayWithUniqueKey("SalesPersonPolicy", UserProfileInfo.getDisplayName());
    //#endregion
});

Given("User verifies info of Create quote form after renew for Varsam product Innbo Seasonal - Renewal case", async function () {
    const QuoteReference = getValueDataOfDataTestExecution("QuoteReference") + "/001";
    pushObjectToDataArrayWithUniqueKey("QuoteReference", QuoteReference);

    const StartDate = addDate(getValueDataOfDataTestExecution("EndDate"), 1);
    const EndDate = addDate(addYear(StartDate, 1), -1);

    pushObjectToDataArrayWithUniqueKey("StartDateAfterRenew", StartDate);
    pushObjectToDataArrayWithUniqueKey("EndDateAfterRenew", EndDate);

    let temp = true;

    await globalPageObject.expandNumberOfItemSubList(10);
    for (let i = 1; i <= 6; i++) {
        await globalPagination.pressReloadTableOnSubList(1000);
        temp = await accountTabQuoteList.openTheQuoteOnQuoteListByReference(QuoteReference);
        if (temp) {
            break;
        }
        else if (i === 40) {
            logFailTestcase(false, `Open quote "${QuoteReference}" failed!`);
        }
    }
    await globalPageObject.waitForProgressBarLoaded_v2(500);
    await globalPageObject.waitForProgressBarLoaded_v2(500);



    //#region Create Quote form
    temp = await accountTabQuoteCreateQuoteVarsamProductInnboSeasonal.validateQuoteRef(QuoteReference);
    logFailTestcase(temp, `Incorrect Quote Ref`);

    temp = await accountTabQuoteCreateQuoteVarsamProductInnboSeasonal.validateStartDate(StartDate);
    logFailTestcase(temp, `Incorrect Start Date`);

    temp = await accountTabQuoteCreateQuoteVarsamProductInnboSeasonal.validateEndDate(EndDate);
    logFailTestcase(temp, `Incorrect End Date`);
    //#endregion

    temp = await accountTabQuoteCreateQuoteVarsamProductInnboSeasonal.pressNextButtonOnFooter();
    logFailTestcase(temp, `Press Next Button failed!`);
});

Given("User verifies info of Create quote form after renew for Varsam product Innbo Seasonal - Manual Renewal case", async function () {
    let QuoteReference = getValueDataOfDataTestExecution("QuoteReference");
    let lastNumber = 1;
    if (QuoteReference.includes("/")) {
        lastNumber = parseInt(QuoteReference.substring(QuoteReference.length - 1)) + 1;
    }
    QuoteReference = QuoteReference.split("/")[0] + `/00${lastNumber}`;

    pushObjectToDataArrayWithUniqueKey("QuoteReference", QuoteReference);

    const StartDate = addDate(getValueDataOfDataTestExecution("EndDate"), 1);
    const EndDate = addDate(StartDate, 364);

    pushObjectToDataArrayWithUniqueKey("StartDateAfterRenew", StartDate);
    pushObjectToDataArrayWithUniqueKey("EndDateAfterRenew", EndDate);

    let temp = true;

    //#region Create Quote form
    temp = await accountTabQuoteCreateQuoteVarsamProductInnboSeasonal.validateQuoteRef(QuoteReference);
    logFailTestcase(temp, `Incorrect Quote Ref`);

    temp = await accountTabQuoteCreateQuoteVarsamProductInnboSeasonal.validateStartDate(StartDate);
    logFailTestcase(temp, `Incorrect Start Date`);

    temp = await accountTabQuoteCreateQuoteVarsamProductInnboSeasonal.validateEndDate(EndDate);
    logFailTestcase(temp, `Incorrect End Date`);
    //#endregion

    temp = await accountTabQuoteCreateQuoteVarsamProductInnboSeasonal.pressNextButtonOnFooter();
    logFailTestcase(temp, `Press Next Button failed!`);
});

When("User inputs Cover Type as {string} then presses Next button on Create quote form for Varsam product Innbo Seasonal", async (coverType) => {
    let temp = await accountTabQuoteCreateQuoteVarsamProductInnboSeasonal.inputCoverType_Innbofor(coverType);
    logFailTestcase(temp, `Input cover type "${coverType}" failed!`);

    let temp1 = coverType.trim().replace(/  /g, " ").split(" ");
    let result = "";
    for (let i of temp1) {
        result += i[0].toUpperCase() + i.substring(1);
    }
    pushObjectToDataArrayWithUniqueKey("CoverTypeConfig", result);

    temp = await accountTabQuoteCreateQuoteVarsamProductInnboSeasonal.pressNextButtonOnFooter();
    logFailTestcase(temp, `Press Next button failed!`);
});

Given("User fill data for product Smadjur {string}", async function (dataKey) {
    const data = await DataRepo2.getInstance().loadData(dataKey);
    const page = new QuoteCreateQuoteVarsamProductSmadjur(this.context.driverService);
    let temp = true;
    const startDate = getDate(data.StartDateMinusToday);
    temp = await page.setInputstartDate(startDate);
    logFailTestcase(temp, `Input StartDate failed`);
    pushObjectToDataArrayWithUniqueKey("StartDate", startDate);

    const endDate = getDate(data.EndDateMinusToday);
    temp = await page.setInputendDate(endDate);
    logFailTestcase(temp, `Input EndDate failed`);
    pushObjectToDataArrayWithUniqueKey("EndDate", endDate);


    temp = await page.validateValuePersonSSN(data.SSN);
    logFailTestcase(temp, `Incorrect Person SSN`);

    temp = await page.setNgselectPreviousInsurerTag(data.PreviousInsurer);
    logFailTestcase(temp, `Input PreviousInsurer failed`);

    temp = await globalPageObject.waitForProgressBarLoaded_v2();
    logFailTestcase(temp, `Input failed`);

    temp = await page.validateValueFirstName(data.FirstName);
    logFailTestcase(temp, `Incorrect First Name`);

    temp = await page.validateValueLastName(data.LastName);
    logFailTestcase(temp, `Incorect Last Name`);

    temp = await globalPageObject.waitForProgressBarLoaded_v2();
    temp = await page.validateValuePersonAddrPostCode(data.AddrPostCode);
    // logFailTestcase(temp, `Incorrect AddrPostCode`);

    temp = await page.setInputAnimalNameTag(data.AnimalName);
    logFailTestcase(temp, `Input AnimalName failed`);

    temp = await page.setInputPetDOBTag(data.PetDOB);
    logFailTestcase(temp, `Input PetDOB failed`);

    temp = await page.setInputPetIDTag(data.PetID);
    logFailTestcase(temp, `Input PetID failed`);

    temp = await page.setInputPetChipTag(data.PetChip);
    logFailTestcase(temp, `Input PetChip failed`);

    temp = await page.setNgselectAnimalBreedTag(data.AnimalBreed);
    logFailTestcase(temp, `Input AnimalBreed failed`);

    temp = await page.setInputPetPurchasedDateTag(data.PetPurchasedDate);
    logFailTestcase(temp, `Input PetPurchasedDate failed`);

    temp = await page.setInputPetPurchaseValueTag(data.PetPurchaseValue);
    logFailTestcase(temp, `Input PetPurchaseValue failed`);

    temp = await page.setNgselectPetGenderTag(data.PetGender);
    logFailTestcase(temp, `Input PetGender failed`);

    temp = await page.setSelectAnimalTreatedWithMedicineTag(data.AnimalTreatedWithMedicine);
    logFailTestcase(temp, `Input AnimalTreatedWithMedicine failed`);

    // temp = await page.setInputHighestCompensationTag(data.HighestCompensation);
    temp = await page.setTextareaExternalTextTag(data.ExternalText);
    logFailTestcase(temp, `Input ExternalText failed`);

    temp = await page.setTextareaInternalTextTag(data.InternalText);
    logFailTestcase(temp, `Input InternalText failed`);

    temp = await page.setSelectAnimalTreatedByVetTag(data.AnimalTreatedByVet);
    logFailTestcase(temp, `Input AnimalTreatedByVet failed`);

    temp = await page.setSelectAnimalHasUncheckedProblemsTag(data.AnimalHasUncheckedProblems);
    logFailTestcase(temp, `Input AnimalHasUncheckedProblems failed`);

    temp = await page.setSelectAnimalHasClaimPaymentsTag(data.AnimalHasClaimPayments);
    logFailTestcase(temp, `Input AnimalHasClaimPayments failed`);

    temp = await page.setSelectAnimalIsHealthyTag(data.AnimalIsHealthy);
    logFailTestcase(temp, `Input AnimalIsHealthy failed`);

    // temp = await page.setNgselectDeductiblePercentageTag(data.DeductiblePercentage);
    // temp = await page.setNgselectDeductibleAmountTag(data.DeductibleAmount);

    const quoteRef = await page.getQuoteRef();
    logFailTestcase(quoteRef.length > 0, `Get Quote ref failed!`);
    pushObjectToDataArrayWithUniqueKey("QuoteReference", quoteRef);
});

Given("User fill data for renewal product Smadjur {string}", async function (dataKey) {
    const data = await DataRepo2.getInstance().loadData(dataKey);
    const page = new QuoteCreateQuoteVarsamProductSmadjur(this.context.driverService);
    let temp = true;
    const startDate = getDate(data.StartDateMinusToday);
    temp = await page.validateStartDate(startDate);
    logFailTestcase(temp, `Validate StartDate failed`);
    pushObjectToDataArrayWithUniqueKey("StartDate", startDate);

    const endDate = getDate(data.EndDateMinusToday);
    temp = await page.setInputendDate(endDate);
    logFailTestcase(temp, `Input EndDate failed`);
    pushObjectToDataArrayWithUniqueKey("EndDate", endDate);


    temp = await page.validateValuePersonSSN(data.SSN);
    logFailTestcase(temp, `Incorrect Person SSN`);

    temp = await page.setNgselectPreviousInsurerTag(data.PreviousInsurer);
    logFailTestcase(temp, `Input PreviousInsurer failed`);

    temp = await globalPageObject.waitForProgressBarLoaded_v2();
    logFailTestcase(temp, `Input failed`);

    temp = await page.validateValueFirstName(data.FirstName);
    logFailTestcase(temp, `Incorrect First Name`);

    temp = await page.validateValueLastName(data.LastName);
    logFailTestcase(temp, `Incorect Last Name`);

    temp = await globalPageObject.waitForProgressBarLoaded_v2();
    temp = await page.validateValuePersonAddrPostCode(data.AddrPostCode);
    // logFailTestcase(temp, `Incorrect AddrPostCode`);

    temp = await page.setInputAnimalNameTag(data.AnimalName);
    logFailTestcase(temp, `Input AnimalName failed`);

    temp = await page.setInputPetDOBTag(data.PetDOB);
    logFailTestcase(temp, `Input PetDOB failed`);

    temp = await page.setInputPetIDTag(data.PetID);
    logFailTestcase(temp, `Input PetID failed`);

    temp = await page.setInputPetChipTag(data.PetChip);
    logFailTestcase(temp, `Input PetChip failed`);

    temp = await page.setNgselectAnimalBreedTag(data.AnimalBreed);
    logFailTestcase(temp, `Input AnimalBreed failed`);

    temp = await page.setInputPetPurchasedDateTag(data.PetPurchasedDate);
    logFailTestcase(temp, `Input PetPurchasedDate failed`);

    temp = await page.setInputPetPurchaseValueTag(data.PetPurchaseValue);
    logFailTestcase(temp, `Input PetPurchaseValue failed`);

    temp = await page.setNgselectPetGenderTag(data.PetGender);
    logFailTestcase(temp, `Input PetGender failed`);

    temp = await page.setSelectAnimalTreatedWithMedicineTag(data.AnimalTreatedWithMedicine);
    logFailTestcase(temp, `Input AnimalTreatedWithMedicine failed`);

    // temp = await page.setInputHighestCompensationTag(data.HighestCompensation);
    temp = await page.setTextareaExternalTextTag(data.ExternalText);
    logFailTestcase(temp, `Input ExternalText failed`);

    temp = await page.setTextareaInternalTextTag(data.InternalText);
    logFailTestcase(temp, `Input InternalText failed`);

    temp = await page.setSelectAnimalTreatedByVetTag(data.AnimalTreatedByVet);
    logFailTestcase(temp, `Input AnimalTreatedByVet failed`);

    temp = await page.setSelectAnimalHasUncheckedProblemsTag(data.AnimalHasUncheckedProblems);
    logFailTestcase(temp, `Input AnimalHasUncheckedProblems failed`);

    temp = await page.setSelectAnimalHasClaimPaymentsTag(data.AnimalHasClaimPayments);
    logFailTestcase(temp, `Input AnimalHasClaimPayments failed`);

    temp = await page.setSelectAnimalIsHealthyTag(data.AnimalIsHealthy);
    logFailTestcase(temp, `Input AnimalIsHealthy failed`);

    // temp = await page.setNgselectDeductiblePercentageTag(data.DeductiblePercentage);
    // temp = await page.setNgselectDeductibleAmountTag(data.DeductibleAmount);

    const quoteRef = await page.getQuoteRef();
    logFailTestcase(quoteRef.length > 0, `Get Quote ref failed!`);
    pushObjectToDataArrayWithUniqueKey("QuoteReference", quoteRef);
});

Given("User fill data for MTA product Smadjur {string}", async function (dataKey) {
    const data = await DataRepo2.getInstance().loadData(dataKey);
    const page = new QuoteCreateQuoteVarsamProductSmadjur(this.context.driverService);
    let temp = true;
    const startDate = getDate(data.StartDateMinusToday);
    temp = await page.validateStartDate(startDate);
    logFailTestcase(temp, `Validate StartDate failed`);
    pushObjectToDataArrayWithUniqueKey("StartDate", startDate);

    const endDate = getDate(data.EndDateMinusToday);
    temp = await page.validateEndDate(endDate);
    logFailTestcase(temp, `Incorrect EndDate`);
    pushObjectToDataArrayWithUniqueKey("EndDate", endDate);


    const EffectiveDateMinusToday = data.EffectiveDateMinusToday;
    if (EffectiveDateMinusToday) {
        let effectiveDate = getDate(EffectiveDateMinusToday);
        temp = await page.inputEffectiveDate(effectiveDate);
        logFailTestcase(temp, `Input Effective Date failed!`);
    }

    temp = await page.validateValuePersonSSN(data.SSN);
    logFailTestcase(temp, `Incorrect Person SSN`);

    temp = await page.setNgselectPreviousInsurerTag(data.PreviousInsurer);
    logFailTestcase(temp, `Input PreviousInsurer failed`);

    temp = await globalPageObject.waitForProgressBarLoaded_v2();
    logFailTestcase(temp, `Input failed`);

    temp = await page.validateValueFirstName(data.FirstName);
    logFailTestcase(temp, `Incorrect First Name`);

    temp = await page.validateValueLastName(data.LastName);
    logFailTestcase(temp, `Incorect Last Name`);

    temp = await globalPageObject.waitForProgressBarLoaded_v2();
    temp = await page.validateValuePersonAddrPostCode(data.AddrPostCode);
    // logFailTestcase(temp, `Incorrect AddrPostCode`);

    temp = await page.setInputAnimalNameTag(data.AnimalName);
    logFailTestcase(temp, `Input AnimalName failed`);

    temp = await page.setInputPetDOBTag(data.PetDOB);
    logFailTestcase(temp, `Input PetDOB failed`);

    temp = await page.setInputPetIDTag(data.PetID);
    logFailTestcase(temp, `Input PetID failed`);

    temp = await page.setInputPetChipTag(data.PetChip);
    logFailTestcase(temp, `Input PetChip failed`);

    temp = await page.setNgselectAnimalBreedTag(data.AnimalBreed);
    logFailTestcase(temp, `Input AnimalBreed failed`);

    temp = await page.setInputPetPurchasedDateTag(data.PetPurchasedDate);
    logFailTestcase(temp, `Input PetPurchasedDate failed`);

    temp = await page.setInputPetPurchaseValueTag(data.PetPurchaseValue);
    logFailTestcase(temp, `Input PetPurchaseValue failed`);

    temp = await page.setNgselectPetGenderTag(data.PetGender);
    logFailTestcase(temp, `Input PetGender failed`);

    temp = await page.setSelectAnimalTreatedWithMedicineTag(data.AnimalTreatedWithMedicine);
    logFailTestcase(temp, `Input AnimalTreatedWithMedicine failed`);

    // temp = await page.setInputHighestCompensationTag(data.HighestCompensation);
    temp = await page.setTextareaExternalTextTag(data.ExternalText);
    logFailTestcase(temp, `Input ExternalText failed`);

    temp = await page.setTextareaInternalTextTag(data.InternalText);
    logFailTestcase(temp, `Input InternalText failed`);

    temp = await page.setSelectAnimalTreatedByVetTag(data.AnimalTreatedByVet);
    logFailTestcase(temp, `Input AnimalTreatedByVet failed`);

    temp = await page.setSelectAnimalHasUncheckedProblemsTag(data.AnimalHasUncheckedProblems);
    logFailTestcase(temp, `Input AnimalHasUncheckedProblems failed`);

    temp = await page.setSelectAnimalHasClaimPaymentsTag(data.AnimalHasClaimPayments);
    logFailTestcase(temp, `Input AnimalHasClaimPayments failed`);

    temp = await page.setSelectAnimalIsHealthyTag(data.AnimalIsHealthy);
    logFailTestcase(temp, `Input AnimalIsHealthy failed`);

    // temp = await page.setNgselectDeductiblePercentageTag(data.DeductiblePercentage);
    // temp = await page.setNgselectDeductibleAmountTag(data.DeductibleAmount);

    const quoteRef = await page.getQuoteRef();
    logFailTestcase(quoteRef.length > 0, `Get Quote ref failed!`);
    pushObjectToDataArrayWithUniqueKey("QuoteReference", quoteRef);
});

When("User verifies content of New Business Quote document for product Smadjur", async () => {
    let filedownloadPath = DownloadFilePathGlobalVariable + "/" + getTheFirstFileNameByPathInFolder(DownloadFilePathGlobalVariable, "pdf");
    console.log(`filedownloadPath: ` + filedownloadPath);

    let actualContenInfile = (await getTheContentInPDFFile(filedownloadPath)).replace(/^\s*\n/gm, "").split("\n");
    console.log("AcctualFile: ");
    console.log(actualContenInfile);

    let expectedContentFile =
        (`Lena Smadjur\n` +
            `${formatDateTime(getCurrentDateTime(), 'yyyy-MM-dd').split(" ")[0]}\n` +
            `Hej!\n` +
            `Vad kul att du också är intresserad av vår djurförsäkring!\n` +
            `Vi har sammanfattat de viktigaste punkterna i den försäkring vi föreslår för dig längre ned på\n` +
            `denna sida, i resten av brevet finner du mer information om vad din försäkring innehåller.\n` +
            `Vi älskar att prata med våra kunder!\n` +
            `Om du har några frågor eller vill teckna försäkringen - ring vår kundservice på 0500-10 10 20.\n` +
            `Kortfattat om din försäkring:\n` +
            `Veterinärvårdsförsäkringen omfattar både sjukdomar och olycksfall.\n` +
            `Du får alltid snabb och kompetent hjälp av oss om din smådjur blir sjuk eller skadad.\n` +
            `Genom att välja våra kunder i högre utsträckning kan vi erbjuda ett brett försäkringsskydd till\n` +
            `ett attraktivt pris – vi försäkrar de varsamma!\n` +
            `Vårt lojalitetsprogram – Varsam Reward\n` +
            `Genom att genomföra skadeförebyggande åtgärder och vara skadefri under året kan du samla\n` +
            `Varsam-Poäng i vår mobil-app. Dessa kan du sedan byta in mot fina premier i vår Varsam-Shop.\n` +
            `Vi premierar dig som är varsam och lojal!\n` +
            `Har du inte redan laddat ner vår app? Gör det redan idag. Du hittar den där appar finns.\n` +
            `Varsamma AB, med org.nr 556876 8674 är en svensk försäkringsförmedlare med tillstånd av\n` +
            `Finansinspektionen. Varsamma AB står under Finansinspektionens tillsyn. Besök oss på\n` +
            `www.varsamforsakring.se | Försäkringsgivare är Sveland Djurförsäkringar Ömsesidigt, med org.nr 545000–7165.\n` +
            `Offert (giltig 30 dagar)\n` +
            `Försäkring för smådjur\n` +
            `FörsäkringstagareLena SmadjurFörsäkringsnummer:${getValueDataOfDataTestExecution("QuoteReference")}\n` +
            `Försäkringsperiod:${formatDateTime(getValueDataOfDataTestExecution("StartDate"), 'yyyy-MM-dd')} - ${formatDateTime(getValueDataOfDataTestExecution("EndDate"), 'yyyy-MM-dd')}\n` +
            `Adress:Kundnummer:4127\n` +
            `Postnummer:Årspremie:437,66 kr\n` +
            `Djur:SmådjurPeriodpremie:437,66 kr\n` +
            `Kön:HaneBetalningsmetod:\n` +
            `Inköpsdatum:2023-01-01\n` +
            `Inköpspris:500 kr\n` +
            `Född:2010-01-01\n` +
            `Namn:Cat\n` +
            `Ras:Degus\n` +
            `Chipnr/regnr:PetChip\n` +
            `Din försäkring innehåller:\n` +
            `Försäkringsbelopp\n` +
            `Veterinärvårdsförsäkring10 000 kr\n` +
            `Fast självrisk: 2 000 kr\n` +
            `Rörlig självrisk: 20% av ersättningsbara kostnader\n` +
            `Försäkringsvillkor:\n` +
            `Varsam Djurförsäkring Allmänt Villkor Djur 2019-09-01\n` +
            `Varsam Djurförsäkring Särskilt Villkor Smådjur 2019-09-01\n` +
            `Övriga kommentarer:\n` +
            `Externtext\n` +
            `Varsamma AB, med org.nr 556876 8674 är en svensk försäkringsförmedlare med tillstånd av\n` +
            `Finansinspektionen. Varsamma AB står under Finansinspektionens tillsyn. Besök oss på\n` +
            `www.varsamforsakring.se | Försäkringsgivare är Sveland Djurförsäkringar Ömsesidigt, med org.nr 545000–7165.`).split("\n");
    console.log("\nExpected content file:\n");
    console.log(expectedContentFile);

    for (let i = 0; i < expectedContentFile.length; i++) {
        if (expectedContentFile[i].trim() !== actualContenInfile[i].trim()) {
            logFailTestcase(false, `\t\tLine ${i + 1}: Expected: ${expectedContentFile[i]} - Actual: ${actualContenInfile[i]}`);
        }
    }
});