import { Given } from "@cucumber/cucumber";
import { MappingPage } from "../../../../../../../core/MappingPage";
import { DataRepo } from "../../../../../../../core/modals/DataRepo";
import { SeleniumWebDriverService } from "../../../../../../../core/selenium-webdriver.service";
import { QuoteCreateHemPage } from "../../../../../../../page-objects/back-office-portal/general/quote/quote-layouts/Varsam-channel/QuoteCreateHemPage";
import { PageFactory } from "../../../../../../../page-objects/PageFactory";
import { logFailTestcase } from "../../../../../../../shared/functions";
import { formatDateTime } from "../../../../../../../shared/tenant-setting/tenant-setting";

let PageGlobal = PageFactory.getInstance().createGlobalPageObjectPage(); 

Given("User fill data for product Hem {string}", async function (dataKey) {
    try {
        //#PRODUCT Hem version 20
        // const mapPage = new MappingPage(SeleniumWebDriverService.getInstance());
        // await mapPage.scan(true, "//app-product-layout");
        const data = await DataRepo.getInstance().loadData(dataKey);
        const page = new QuoteCreateHemPage(this.context.driverService);
        //#region Försäkringsinformation
        await page.setInputstartDate(formatDateTime(data.StartDate));
        await page.setInputendDate(formatDateTime(data.EndDate));
        //#endregion

        //#region Uppgifter om dig
        await page.validateInputInsuredPersonSSNTag(data.SSN);
        await page.validateInputInsuredPersonFirstNameTag(data.FirstName);
        await page.validateInputInsuredPersonLastNameTag(data.LastName);
        await page.validateInputInsuredPersonDOBTag(formatDateTime(data.DOB));
        //#endregion

        //#region UPPGIFTER OM HEMFÖRSÄKRINGEN
        await page.setInputHouseAddressTag(data.HouseAddress);
        await page.setInputHomePostCodeTag(data.PostCode);
        await page.setSelectAccomodationTypeTag(data.AccomodationType);
        await page.setSelectHasMoreThanOneWaterConnectedMachinesInKitchenTag(data.HasMoreThanOneWaterConnectedMachines);
        await page.setSelectHasWaterBorneHeatingSystemInApartmentTag(data.HasWaterBorneHeatingSystem);
        await page.setSelectHasOldSurfaceLayersInWetRoomsTag(data.HasOldSurfaceLayers);
        await page.setSelectHasOwnFixedCostFurnishingsTag(data.HasOwnFixedCostFurnishings);
        await page.setNgselectHomeNumberOfPeopleLivingTag(data.NumberOfPeopleLiving); 
        await page.setNgselectHomeSumInsuredTag(data.HomeSumInsured); //new
        await page.setNgselectHomeExcessTag(data.HomeExcess);
        await page.setNgselectHomeSecurityTag(data.HomeSecurity);//new
        //#endregion
        //#region TILLÄGGSFÖRSÄKRINGAR
        await page.setNgselectHomeCombinationOptionalCoverTag(data.HomeCombinationOptionalCover);
        await page.setSelectContentsAllriskTag(data.ContentsAllrisk);
        await page.setSelectApartmentOwnershipTag(data.ApartmentOwnership);
        await page.setSelectApartmentAllriskTag(data.ApartmentAllrisk);
        await page.setSelectTravelAllriskTag(data.TravelAllrisk);
        await page.setSelectCancellationTag(data.Cancellation);//new
        await page.setSelectPARecreationalTag(data.PARecreational); //new
        await page.setSelectCrisisTag(data.Crisis); //new
        await page.setSelectContentsBoatTag(data.ContentsBoat); //new
        await page.setSelectIDTheftTag(data.IDTheft);
      
        //#endregion

        //#region Övriga uppgifter
        await page.setTextareaExternalTextTag(data.ExternalText);
        await page.setTextareaInternalTextTag(data.InternalText);

        //#endregion
        await PageGlobal.waitForSeconds(4000);

    } catch (error) {
        logFailTestcase(false, (error as Error).message + "\r\n" + (error as Error).stack);
    }
});