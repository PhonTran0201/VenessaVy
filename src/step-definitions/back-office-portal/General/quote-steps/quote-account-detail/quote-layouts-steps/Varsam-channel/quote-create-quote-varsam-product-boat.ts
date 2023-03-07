import { Given, When } from "@cucumber/cucumber";
import { da } from "date-fns/locale";
import { MappingPage } from "../../../../../../../core/MappingPage";
import { DataRepo } from "../../../../../../../core/modals/DataRepo";
import { SeleniumWebDriverService } from "../../../../../../../core/selenium-webdriver.service";
import { QuoteCreateBoatPage } from "../../../../../../../page-objects/back-office-portal/general/quote/quote-layouts/Varsam-channel/QuoteCreateBoatPage";
import { QuoteCreateHemPage } from "../../../../../../../page-objects/back-office-portal/general/quote/quote-layouts/Varsam-channel/QuoteCreateHemPage";
import { logFailTestcase } from "../../../../../../../shared/functions";
import { formatDateTime } from "../../../../../../../shared/tenant-setting/tenant-setting";


When("User fill data for product Boat {string}", async function (dataKey) {
    //#PRODUCT Boat version 32
    try {
        const data = await DataRepo.getInstance().loadData(dataKey);
        const page = new QuoteCreateBoatPage(SeleniumWebDriverService.getInstance());
        //#region FÖRSÄKRINGSINFORMATION
        await page.settxtstartDate(data.StartDate);
        await page.settxtendDate(data.EndDate);

        //#endregion
        //#region UPPGIFTER OM DIG
        await page.settxtInsuredPersonFirstNameTag(data.FirstName);
        await page.settxtInsuredPersonLastNameTag(data.LastName);
        await page.settxtInsuredPersonSSNTag(data.SSN);
        await page.setNgSelectNauticExperienceTag(data.NauticExperience);
        //#endregion
        //#region UPPGIFTER OM BÅTEN
        await page.setNgSelectBoatRegionTag(data.BoatRegion);
        await page.setNgSelectBoatNightHabourTag(data.BoatNightHabour);
        await page.settxtHomeHarbourNameTag(data.HomeHarbourName);
        await page.setSelectBoatTypeTag(data.BoatType);
        await page.setNgSelectEngineTypeTag(data.EngineType);
        await page.setNgSelectRibBoatTagTag(data.RibBoatTag);
        await page.setSelectBoatMaterialTag(data.BoatMaterial);
        await page.setSelectWoodBoatWithPlasticTag(data.WoodBoatWithPlastic);
        await page.setNgSelectBoatMakeTag(data.BoatMake);
        await page.settxtBoatModelTag(data.BoatModel);
        await page.settxtBoatSerialNoTag(data.BoatSerialNoTag);
        await page.setSelectEngineMakeTag(data.EngineMake);
        await page.setSelectBoatUsedByCompanyTag(data.BoatUsedByCompany);
        await page.settxtEnginePowerTag(data.EnginePower);
        await page.setNgSelectNumberOfEnginesTag(data.NumberOfEngines);

        if (data.NumberOfEngines != "0" && data.NumberOfEngines) {
            for (let i = 0; i < parseInt(data.NumberOfEngines); i++) {
                //#region Uppgifter om övriga byggnader - section i + 1
                await page.settxtEngineSerialNoTag(data.EngineSerialNo[i], i + 1);
                await page.settxtCogSerialNoTag(data.CogSerialNo[i], i + 1);
                //#endregion
            }
        }
        await page.setNgSelectBoatTheftProtectionTag(data.BoatTheftProtection);
        await page.settxtEngineYearTag(data.EngineYear);
        await page.settxtBoatModelYearTag(data.BoatModelYear);
        await page.settxtBoatValueTag(data.BoatValue);
        await page.settxtBoatLengthTag(data.BoatLength);
        await page.settxtBoatWidthTag(data.BoatWidth);
        await page.settxtBoatMaxspeedTag(data.BoatMaxspeed);
        await page.setNgSelectStorageTag(data.Storage);
        await page.setSelectBoatContractTag(data.BoatContract);
        await page.setSelectMaintenanceStorageTag(data.MaintenanceStorage);
        await page.settxtStorageStreetTag(data.StorageStreet);
        await page.settxtStoragePostalCodeTag(data.StoragePostalCode);
        //#endregion
        //#region  ANDRA UPPGIFTER
        await page.setNgSelectHasOtherMainInsuranceTag(data.HasOtherMainInsurance);
        //#endregion
        //#region SJÄLVRISK
        await page.setSelectPropertyDamageDeductibleTag(data.PropertyDamageDeductible);
        //#endregion
        //#region FÖRSÄKRINGENS INNEHÅLL
        await page.setSelectBoatTrailerTag(data.BoatTrailer);
        await page.settxtBoatTrailerValueTag(data.BoatTrailerValue);
        //#endregion
        //#region ÖVRIGA UPPGIFTER
        await page.settxtInternalTextTag(data.InternalText);
        await page.settxtBoatModelYearTag(data.BoatModelYear);
        await page.settxtExternalTextTag(data.ExternalText);
        //#endregion
    } catch (error) {
        logFailTestcase(false, (error as Error).message + "\r\n" + (error as Error).stack);
    }
});
