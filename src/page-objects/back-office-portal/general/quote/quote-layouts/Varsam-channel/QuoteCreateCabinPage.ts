import { By } from "selenium-webdriver/lib/by";
import { ACTION } from "../../../../../../core/action.";
import { BasePage } from "../../../../../../core/BasePage";
import { IEleMapping } from "../../../../../../core/IEleMapping";
import { MappingPage } from "../../../../../../core/MappingPage";

export class QuoteCreateCabinPage extends BasePage {
    
    // async addModalMapFields(data: any) {
    //     const mapper = [
    //         ["StartDate", By.css(`input#startDate`), ACTION.INPUT, data.StartDate, false, true],
    //         ["EndDate", By.css(`input#endDate`), ACTION.INPUT, data.EndDate, false, true],
    //         //["PersonNumber", By.css(`input#CustomerAndInsuredPersonSocialSecurityTag`), ACTION.INPUT, data.PersonNumber, false, true],
    //         ["PersonNumber", By.css(`input#InsuredPersonSSNTag`), ACTION.INPUT, data.PersonNumber, false, true],
    //         //["FirstName", By.css(`input#CustomerAndInsuredPersonFirstNameTag`), ACTION.INPUT, data.FirstName, false, true],
    //         ["FirstName", By.css(`input#InsuredPersonFirstNameTag`), ACTION.INPUT, data.FirstName, false, true],
    //         ["LastName", By.css(`input#CustomerAndInsuredPersonLastNameTag`), ACTION.INPUT, data.LastName, false, true],
    //         //["DOB", By.css(`input#DateOfBirthTag`), ACTION.INPUT, data.DOB, false, true],
    //         ["DOB", By.css(`input#InsuredPersonDOBTag`), ACTION.INPUT, data.DOB, false, true],
    //         ["HouseName", By.css(`input#HomeContentsHouseNameTag`), ACTION.INPUT, data.HouseName, false, true],
    //         ["Address", By.css(`input#HouseAddressTag`), ACTION.INPUT, data.Address, false, true],
    //         ["MakeTag", By.xpath(`//app-layout-control-dynamic-options//ng-select[contains(@id,'MakeTag')]`), ACTION.INPUT, data.MakeTag, false, true],
    //         //["Postnummer", By.css(`input#HomeContentsPostCodeTag`), ACTION.INPUT, data.Postnummer, true, true],
    //         // ["Postnummer", By.css(`input#InsuredPersonAddrPostCodeTag`), ACTION.INPUT, data.Postnummer, true, true],
    //         // ["AcquiryYear", By.xpath(`//app-layout-control-dynamic-options//ng-select[contains(@id,'AcquiryYearTag')]`), ACTION.INPUT, data.AcquiryYear, true, true],
    //         // ["PreviousHomeowne", By.css(`select#HomeContensPreviousHomeownerTag`), ACTION.INPUT, data.PreviousHomeowne, false, true],
    //         // ["HouseArea", By.css(`input#HomeContentsHouseAreaTag`), ACTION.INPUT, data.HouseArea, false, true],
    //         // ["TotalArea", By.css(`input#TotalAreaTag`), ACTION.INPUT, data.TotalArea, false, true],
    //         // ["HouseBuiltYear", By.css(`input#HomeContentsHouseBuiltYearTag`), ACTION.INPUT, data.HouseBuiltYear, false, true],
    //         // ["ElectricityPlumbingReplacedChimneyTested", By.css(`select#ElectricityAndPlumbingReplacedAndChimneyTestedTag`), ACTION.INPUT, data.ElectricityPlumbingReplacedChimneyTested, false, true],
    //         // ["PropertyType", By.xpath(`//app-layout-control-dynamic-options//ng-select[contains(@id,'PropertyTypeTag')]`), ACTION.INPUT, data.PropertyType, false, true],
    //         // ["PlotType", By.xpath(`//app-layout-control-dynamic-options//ng-select[contains(@id,'PlotTypeTag')]`), ACTION.INPUT, data.PlotType, false, true],
    //         // ["FrameworkType", By.xpath(`//app-layout-control-dynamic-options//ng-select[contains(@id,'FrameworkTypeTag')]`), ACTION.INPUT, data.FrameworkType, false, true],
    //         // ["WinterUsage", By.css(`select#WinterUsageTag`), ACTION.INPUT, data.WinterUsage, false, true],
    //         // ["WetSpace", By.xpath(`//app-layout-control-dynamic-options//ng-select[contains(@id,'WetSpaceTag')]`), ACTION.INPUT, data.WetSpace, false, true],
    //         // ["SummerWater", By.css(`select#SummerWaterTag`), ACTION.INPUT, data.SummerWater, false, true],
    //         // ["HasWaterBorneHeatingSystem", By.xpath(`//app-layout-control-dynamic-options//ng-select[contains(@id,'HasWaterBorneHeatingSystemTag')]`), ACTION.INPUT, data.HasWaterBorneHeatingSystem, false, true],
    //         // ["NumberOfWC", By.css(`select#HomeContentsNumberOfWCTag`), ACTION.INPUT, data.NumberOfWC, false, true],
    //         // ["HasGeothermalPumps", By.css(`select#HasGeothermalPumpsTag`), ACTION.INPUT, data.HasGeothermalPumps, false, true],
    //         // ["Leakomatic", By.xpath(`//app-layout-control-dynamic-options//ng-select[contains(@id,'LeakomaticTag')]`), ACTION.INPUT, data.Leakomatic, false, true],
    //         // ["HasKitchenMoreThanOneWaterConnectedMachines", By.css(`select#HasKitchenMoreThanOneWaterConnectedMachinesTag`), ACTION.INPUT, data.HasKitchenMoreThanOneWaterConnectedMachines, false, true],
    //         // ["AreTreesCloseToHouse", By.css(`select#AreTreesCloseToHouseTag`), ACTION.INPUT, data.AreTreesCloseToHouse, false, true],
    //         // ["NumberOfFirePlaces", By.css(`select#NumberOfFirePlacesTag`), ACTION.INPUT, data.NumberOfFirePlaces, false, true],
    //         // ["TotalFloors", By.css(`select#TotalFloorsTag`), ACTION.INPUT, data.TotalFloors, false, true],
    //         // ["AirHeater", By.css(`select#AirHeaterTag`), ACTION.INPUT, data.AirHeater, false, true],
    //         // ["HasPoolOrSpaOrHotTub", By.css(`select#HasPoolOrSpaOrHotTubTag`), ACTION.INPUT, data.HasPoolOrSpaOrHotTub, false, true],
    //         // ["CentralFireAlarm", By.css(`select#CentralFireAlarmTag`), ACTION.INPUT, data.CentralFireAlarm, false, true],
    //         // ["Camera", By.css(`select#CameraTag`), ACTION.INPUT, data.Camera, false, true],
    //         // ["HasLargeConservatory", By.css(`select#HasLargeConservatoryTag`), ACTION.INPUT, data.HasLargeConservatory, false, true],
    //         // ["HasOtherMainInsurance", By.xpath(`//app-layout-control-dynamic-options//ng-select[contains(@id,'HasOtherMainInsuranceTag')]`), ACTION.INPUT, data.HasOtherMainInsurance, false, true],
    //         // ["MoreBuildings", By.css(`select#HomeContentsMoreBuildingsTag`), ACTION.INPUT, data.MoreBuildings, false, true],
    //         // ["Product", By.xpath(`//app-layout-control-dynamic-options//ng-select[contains(@id,'Product')]`), ACTION.INPUT, data.Product, false, true],
    //         // ["VillaBaseExcess", By.xpath(`//app-layout-control-dynamic-options//ng-select[contains(@id,'HomeContentsVillaBaseExcessTag')]`), ACTION.INPUT, data.VillaBaseExcess, false, true],
    //         // // ["SumInsured", By.xpath(`//app-layout-control-dynamic-options//ng-select[contains(@id,'HomeContentsSumInsuredTag')]`), ACTION.INPUT, data.SumInsured, false, true],
    //         // ["HomeBaseExcess", By.xpath(`//app-layout-control-dynamic-options//ng-select[contains(@id,'HomeContentsHomeBaseExcessTag')]`), ACTION.INPUT, data.HomeBaseExcess, false, true],
    //         // //["RentOut", By.xpath(`//app-layout-control-dynamic-options//ng-select[contains(@id,'RentOutTag')]`), ACTION.INPUT, data.RentOut, false],
    //         // ["VillaBoat", By.css(`select#HomeContentsVillaBoatTag`), ACTION.INPUT, data.VillaBoat, false, true],
    //         // ["AllRiskBuildings", By.css(`select#AllRiskBuildingsTag`), ACTION.INPUT, data.AllRiskBuildings, false, true],
    //         // ["BathroomProtection", By.css(`select#BathroomProtectionTag`), ACTION.INPUT, data.BathroomProtection, false, true],
    //         // ["ReducedCost", By.css(`select#ReducedCostTag`), ACTION.INPUT, data.ReducedCost, false, true],
    //         // ["WaterProtection", By.css(`select#WaterProtectionTag`), ACTION.INPUT, data.WaterProtection, false, true],
    //         // ["ContentsPlus", By.css(`select#ContentsPlusTag`), ACTION.INPUT, data.ContentsPlus, false, true],
    //         ["ExternalText", By.css(`textarea#ExternalTextTag`), ACTION.INPUT, data.ExternalText, false, true],
    //         ["InternalText", By.css(`textarea#InternalTextTag`), ACTION.INPUT, data.InternalText, false, true],
    //     ];
    //     await this.addModalMapArray(mapper);
        
    // }
    
    locH2CREATEQUOTE: By = By.xpath(`//h2[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"create quote")]`);
    locH2QUOTEREF1019038: By = By.xpath(`//h2[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"quote ref.: 1019038")]`);
    locAnotificationheader: By = By.xpath(`//a[contains(@id,'notification-header')]`);
    locAngbnav0: By = By.xpath(`//a[contains(@id,'ngb-nav-0')]`);
    locAngbnav9: By = By.xpath(`//a[contains(@id,'ngb-nav-9')]`);
    locAngbnav11: By = By.xpath(`//a[contains(@id,'ngb-nav-11')]`);
    locAngbnav12: By = By.xpath(`//a[contains(@id,'ngb-nav-12')]`);
    locAngbnav13: By = By.xpath(`//a[contains(@id,'ngb-nav-13')]`);
    locAngbnav14: By = By.xpath(`//a[contains(@id,'ngb-nav-14')]`);
    locAngbnav15: By = By.xpath(`//a[contains(@id,'ngb-nav-15')]`);
    locAngbnav16: By = By.xpath(`//a[contains(@id,'ngb-nav-16')]`);
    locAngbnav17: By = By.xpath(`//a[contains(@id,'ngb-nav-17')]`);
    locAngbnav18: By = By.xpath(`//a[contains(@id,'ngb-nav-18')]`);
    locAngbnav19: By = By.xpath(`//a[contains(@id,'ngb-nav-19')]`);
    locAngbnav21: By = By.xpath(`//a[contains(@id,'ngb-nav-21')]`);
    locAngbnav22: By = By.xpath(`//a[contains(@id,'ngb-nav-22')]`);
    locAngbnav23: By = By.xpath(`//a[contains(@id,'ngb-nav-23')]`);
    locAngbnav24: By = By.xpath(`//a[contains(@id,'ngb-nav-24')]`);
    locASupport: By = By.xpath(`//a[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"support")]`);
    locABugReport: By = By.xpath(`//a[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"bug report")]`);
    locInputformly_6_autocomplete_type_0: By = By.xpath(`//input[contains(@id,'formly_6_autocomplete_type_0')]`);
    locInputformly_6_autocomplete_name_1: By = By.xpath(`//input[contains(@id,'formly_6_autocomplete_name_1')]`);
    locInputstartDate: By = By.xpath(`//input[contains(@id,'startDate')]`);
    locInputendDate: By = By.xpath(`//input[contains(@id,'endDate')]`);
    locInputEffectiveDate: By = By.xpath(`//input[contains(@id,'effectiveDate')]`);
    locInputInsuredPersonFirstNameTag: By = By.xpath(`//input[contains(@id,'InsuredPersonFirstNameTag')]`);
    locInputInsuredPersonLastNameTag: By = By.xpath(`//input[contains(@id,'InsuredPersonLastNameTag')]`);
    locInputInsuredPersonSSNTag: By = By.xpath(`//input[contains(@id,'InsuredPersonSSNTag')]`);
    locInputInsuredPersonAddrPostCodeTag: By = By.xpath(`//input[contains(@id,'InsuredPersonAddrPostCodeTag')]`);
    locInputInsuredPersonDOBTag: By = By.xpath(`//input[contains(@id,'InsuredPersonDOBTag')]`);
    locInputOwnerAgeTag: By = By.xpath(`//input[contains(@id,'OwnerAgeTag')]`);
    locInputSerialNoTag: By = By.xpath(`//input[contains(@id,'SerialNoTag')]`);
    locInputModelYearTag: By = By.xpath(`//input[contains(@id,'ModelYearTag')]`);
    locInputStorageStreetTag: By = By.xpath(`//input[contains(@id,'StorageStreetTag')]`);
    locInputStoragePostalCodeTag: By = By.xpath(`//input[contains(@id,'StoragePostalCodeTag')]`);
    locInputStorageCityTag: By = By.xpath(`//input[contains(@id,'StorageCityTag')]`);
    locTextareaInternalTextTag: By = By.xpath(`//textarea[contains(@id,'InternalTextTag')]`);
    locTextareaExternalTextTag: By = By.xpath(`//textarea[contains(@id,'ExternalTextTag')]`);
    locSelectCameraTag: By = By.xpath(`//select[contains(@id,'CameraTag')]`);
    locSelectVattenskoterUsedByCompanyTag: By = By.xpath(`//select[contains(@id,'VattenskoterUsedByCompanyTag')]`);
    locSelectCompanyTypeTag: By = By.xpath(`//select[contains(@id,'CompanyTypeTag')]`);
    locSelectVattenskoterTheftProtectionTag: By = By.xpath(`//select[contains(@id,'VattenskoterTheftProtectionTag')]`);
    locSelectTypeOfInsuranceCoverTag: By = By.xpath(`//select[contains(@id,'TypeOfInsuranceCoverTag')]`);
    locSelectTrailerTag: By = By.xpath(`//select[contains(@id,'TrailerTag')]`);
    locNgselectAllEntities: By = By.xpath(`//ng-select[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"all entities")]`);
    locNgselectMakeTag: By = By.xpath(`//ng-select[contains(@id,'MakeTag')]`);
    locNgselectVattenskoterValueTag: By = By.xpath(`//ng-select[contains(@id,'VattenskoterValueTag')]`);
    locNgselectVattenskoterPowerTag: By = By.xpath(`//ng-select[contains(@id,'VattenskoterPowerTag')]`);
    locNgselectVattenskoterRegionTag: By = By.xpath(`//ng-select[contains(@id,'VattenskoterRegionTag')]`);
    locNgselectStorageSeasonTag: By = By.xpath(`//ng-select[contains(@id,'StorageSeasonTag')]`);
    locNgselectStorageWinterTag: By = By.xpath(`//ng-select[contains(@id,'StorageWinterTag')]`);
    locNgselectApprovedAlarmSystemTag: By = By.xpath(`//ng-select[contains(@id,'ApprovedAlarmSystemTag')]`);
    locNgselectGPSTrackerTag: By = By.xpath(`//ng-select[contains(@id,'GPSTrackerTag')]`);
    locNgselectVattenskoterEquippedReverseTag: By = By.xpath(`//ng-select[contains(@id,'VattenskoterEquippedReverseTag')]`);
    locNgselectHasOtherMainInsuranceTag: By = By.xpath(`//ng-select[contains(@id,'HasOtherMainInsuranceTag')]`);
    locNgselectExcessTag: By = By.xpath(`//ng-select[contains(@id,'ExcessTag')]`);
    locButtonpgsclosetabbtn: By = By.xpath(`//button[contains(@id,'pgs-close-tab-btn')]`);
    locButtonpgseditcustomerbtn: By = By.xpath(`//button[contains(@id,'pgs-edit-customer-btn')]`);
    locButtonpgscreatenotecustomerbtn: By = By.xpath(`//button[contains(@id,'pgs-create-note-customer-btn')]`);
    locButtonpgsupdateacccustomerbtn: By = By.xpath(`//button[contains(@id,'pgs-update-acc-customer-btn')]`);
    locButtonBackToQuotesList: By = By.xpath(`//button[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"back to quotes list")]`);
    locButtonCalculate: By = By.xpath(`//button[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"calculate")]`);
    locButtonNext: By = By.xpath(`//button[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"next")]`);
    locLabelGender: By = By.xpath(`//label[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"gender")]`);
    locLabelNumber: By = By.xpath(`//label[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"number")]`);
    locLabelCustomerLifetime: By = By.xpath(`//label[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"customer lifetime")]`);
    locLabelFÖRSÄKRINGENSGILTIGHETSTID: By = By.xpath(`//label[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"försäkringens giltighetstid")]`);
    locLabelStartDate: By = By.xpath(`//label[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"start date *")]`);
    locLabelEndDate: By = By.xpath(`//label[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"end date *")]`);
    locLabelUPPGIFTEROMDIG: By = By.xpath(`//label[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"uppgifter om dig")]`);
    locLabelFörnamn: By = By.xpath(`//label[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"förnamn")]`);
    locLabelEfternamn: By = By.xpath(`//label[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"efternamn")]`);
    locLabelPersonnummer: By = By.xpath(`//label[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"personnummer")]`);
    locLabelFödelsedatum: By = By.xpath(`//label[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"födelsedatum *")]`);
    locLabelUPPGIFTEROMVATTENSKOTERN: By = By.xpath(`//label[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"uppgifter om vattenskotern")]`);
    locLabelFabrikatPåVattenskotern: By = By.xpath(`//label[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"fabrikat på vattenskotern *")]`);
    locLabelTillverkningsnummer: By = By.xpath(`//label[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"tillverkningsnummer *")]`);
    locLabelVattenskoternsMarknadsvärde: By = By.xpath(`//label[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"vattenskoterns marknadsvärde *")]`);
    locLabelVattenskoternsEffekt: By = By.xpath(`//label[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"vattenskoterns effekt *")]`);
    locLabelRegionDärVattenskoternPrimärtAnvänds: By = By.xpath(`//label[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"region där vattenskotern primärt används *")]`);
    locLabelHurFörvarasVattenskoternUnderSäsong: By = By.xpath(`//label[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"hur förvaras vattenskotern under säsong *")]`);
    locLabelHurFörvarasVattenskoternVintertid: By = By.xpath(`//label[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"hur förvaras vattenskotern vintertid *")]`);
    locLabelFinnsKameraövervakning: By = By.xpath(`//label[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"finns kameraövervakning?")]`);
    locLabelKommerVattenskoternAnvändasYrkesmässigtHeltEllerDelvis: By = By.xpath(`//label[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"kommer vattenskotern användas yrkesmässigt, helt eller delvis? *")]`);
    locLabelAngeTypAvVerksamhet: By = By.xpath(`//label[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"ange typ av verksamhet *")]`);
    locLabelGatuadressTillFastighetDärVattenskoternFörvaras: By = By.xpath(`//label[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"gatuadress till fastighet där vattenskotern förvaras *")]`);
    locLabelPostnummerTillFastighetDärVattenskoterFörvaras: By = By.xpath(`//label[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"postnummer till fastighet där vattenskoter förvaras *")]`);
    locLabelOrtTillFastighetDärBåtenFörvaras: By = By.xpath(`//label[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"ort till fastighet där båten förvaras")]`);
    locLabelFinnsAnnanHuvudförsäkring: By = By.xpath(`//label[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"finns annan huvudförsäkring? *")]`);
    locLabelVäljOmfattning: By = By.xpath(`//label[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"välj omfattning *")]`);
    locLabelSjälvrisk: By = By.xpath(`//label[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"självrisk *")]`);
    locLabelFinnsOregistreradTrailer: By = By.xpath(`//label[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"finns oregistrerad trailer *")]`);
    locLabelExterntext: By = By.xpath(`//label[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"externtext")]`);
    locLabelInterntext: By = By.xpath(`//label[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"interntext")]`); 
    locLiSUMMARY: By = By.xpath(`//li[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"summary")]`);
    locLiPOLICIES: By = By.xpath(`//li[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"policies")]`);
    locLiDOCUMENTS: By = By.xpath(`//li[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"documents")]`);
    locLiHISTORY: By = By.xpath(`//li[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"history")]`);
    locLiCASES: By = By.xpath(`//li[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"cases")]`);
    locLiNOTES: By = By.xpath(`//li[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"notes")]`);
    locLiSCORING: By = By.xpath(`//li[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"scoring")]`);
    locLiREWARDS: By = By.xpath(`//li[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"rewards")]`);
    locLiQuestions: By = By.xpath(`//li[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"questions")]`);
    locLiReview: By = By.xpath(`//li[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"review")]`);
    locLiAcceptance: By = By.xpath(`//li[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"acceptance")]`);
    locLiFörsäkringensgiltighetstid: By = By.xpath(`//li[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"försäkringens giltighetstid")]`);
    locLiUppgifteromdig: By = By.xpath(`//li[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"uppgifter om dig")]`);
    locLiUppgifteromvattenskotern: By = By.xpath(`//li[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"uppgifter om vattenskotern")]`);
    locLiOmfattning: By = By.xpath(`//li[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"omfattning")]`);
    locLipgsnote: By = By.xpath(`//li[contains(@id,'pgs-note')]`);
    locSpanSUMMARY: By = By.xpath(`//span[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"summary")]`);
    locSpanPOLICIES: By = By.xpath(`//span[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"policies")]`);
    locSpanDOCUMENTS: By = By.xpath(`//span[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"documents")]`);
    locSpanHISTORY: By = By.xpath(`//span[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"history")]`);
    locSpanCASES: By = By.xpath(`//span[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"cases")]`);
    locSpanNOTES: By = By.xpath(`//span[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"notes")]`);
    locSpanSCORING: By = By.xpath(`//span[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"scoring")]`);
    locSpanREWARDS: By = By.xpath(`//span[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"rewards")]`);
    locSpanQuestions: By = By.xpath(`//span[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"questions")]`);
    locSpanReview: By = By.xpath(`//span[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"review")]`);
    locSpanAcceptance: By = By.xpath(`//span[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"acceptance")]`);
    locSpan10000: By = By.xpath(`//span[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"10000")]`);
    locSpanFörsäkringensgiltighetstid: By = By.xpath(`//span[contains(translate(@title,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"försäkringens giltighetstid")]`);
    locSpanUppgifteromdig: By = By.xpath(`//span[contains(translate(@title,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"uppgifter om dig")]`);
    locSpanUppgifteromvattenskotern: By = By.xpath(`//span[contains(translate(@title,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"uppgifter om vattenskotern")]`);
    locSpanOmfattning: By = By.xpath(`//span[contains(translate(@title,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"omfattning")]`);
    locSpanTenantvarsamstaging: By = By.xpath(`//span[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"tenant: varsam-staging")]`);
    locSpanSeamless2022Contemiv202211174: By = By.xpath(`//span[contains(translate(@title,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"seamless 2022 © contemi (v20221117.4)")]`);
    locSpanWhatsnew: By = By.xpath(`//span[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"what's new")]`);
    locP1346: By = By.xpath(`//p[contains(translate(@title,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"1346")]`);
    locPNull: By = By.xpath(`//p[contains(translate(@title,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"null")]`);
    locPFemale: By = By.xpath(`//p[contains(translate(@title,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"female")]`);
    locP93: By = By.xpath(`//p[contains(translate(@title,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"+93")]`);
    locP123DBP: By = By.xpath(`//p[contains(translate(@title,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"123 dbp")]`);
    locP5545: By = By.xpath(`//p[contains(translate(@title,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"5545")]`);
    locP1year6months11days: By = By.xpath(`//p[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),"1 year 6 months 11 days")]`);
    async setH2CREATEQUOTE(value) {
        try {
            let ele = await this.getFieldType(this.locH2CREATEQUOTE);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setH2QUOTEREF1019038(value) {
        try {
            let ele = await this.getFieldType(this.locH2QUOTEREF1019038);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setAnotificationheader(value) {
        try {
            let ele = await this.getFieldType(this.locAnotificationheader);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setAngbnav0(value) {
        try {
            let ele = await this.getFieldType(this.locAngbnav0);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setAngbnav9(value) {
        try {
            let ele = await this.getFieldType(this.locAngbnav9);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setAngbnav11(value) {
        try {
            let ele = await this.getFieldType(this.locAngbnav11);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setAngbnav12(value) {
        try {
            let ele = await this.getFieldType(this.locAngbnav12);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setAngbnav13(value) {
        try {
            let ele = await this.getFieldType(this.locAngbnav13);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setAngbnav14(value) {
        try {
            let ele = await this.getFieldType(this.locAngbnav14);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setAngbnav15(value) {
        try {
            let ele = await this.getFieldType(this.locAngbnav15);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setAngbnav16(value) {
        try {
            let ele = await this.getFieldType(this.locAngbnav16);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setAngbnav17(value) {
        try {
            let ele = await this.getFieldType(this.locAngbnav17);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setAngbnav18(value) {
        try {
            let ele = await this.getFieldType(this.locAngbnav18);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setAngbnav19(value) {
        try {
            let ele = await this.getFieldType(this.locAngbnav19);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setAngbnav21(value) {
        try {
            let ele = await this.getFieldType(this.locAngbnav21);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setAngbnav22(value) {
        try {
            let ele = await this.getFieldType(this.locAngbnav22);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setAngbnav23(value) {
        try {
            let ele = await this.getFieldType(this.locAngbnav23);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setAngbnav24(value) {
        try {
            let ele = await this.getFieldType(this.locAngbnav24);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setASupport(value) {
        try {
            let ele = await this.getFieldType(this.locASupport);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setABugReport(value) {
        try {
            let ele = await this.getFieldType(this.locABugReport);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setInputformly_6_autocomplete_type_0(value) {
        try {
            let ele = await this.getFieldType(this.locInputformly_6_autocomplete_type_0);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setInputformly_6_autocomplete_name_1(value) {
        try {
            let ele = await this.getFieldType(this.locInputformly_6_autocomplete_name_1);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setInputstartDate(value) {
        try {
            let ele = await this.getFieldType(this.locInputstartDate);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setInputendDate(value) {
        try {
            let ele = await this.getFieldType(this.locInputendDate);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setInputInsuredPersonFirstNameTag(value) {
        try {
            let ele = await this.getFieldType(this.locInputInsuredPersonFirstNameTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setInputInsuredPersonLastNameTag(value) {
        try {
            let ele = await this.getFieldType(this.locInputInsuredPersonLastNameTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setInputInsuredPersonSSNTag(value) {
        try {
            let ele = await this.getFieldType(this.locInputInsuredPersonSSNTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setInputEffectiveDate(value) {
        try {
            let ele = await this.getFieldType(this.locInputEffectiveDate);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setInputInsuredPersonAddrPostCodeTag(value) {
        try {
            let ele = await this.getFieldType(this.locInputInsuredPersonAddrPostCodeTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setInputInsuredPersonDOBTag(value) {
        try {
            let ele = await this.getFieldType(this.locInputInsuredPersonDOBTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setInputOwnerAgeTag(value) {
        try {
            let ele = await this.getFieldType(this.locInputOwnerAgeTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setInputSerialNoTag(value) {
        try {
            let ele = await this.getFieldType(this.locInputSerialNoTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setInputModelYearTag(value) {
        try {
            let ele = await this.getFieldType(this.locInputModelYearTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setInputStorageStreetTag(value) {
        try {
            let ele = await this.getFieldType(this.locInputStorageStreetTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setInputStoragePostalCodeTag(value) {
        try {
            let ele = await this.getFieldType(this.locInputStoragePostalCodeTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async setInputStorageCityTag(value) {
        try {
            let ele = await this.getFieldType(this.locInputStorageCityTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setTextareaInternalTextTag(value) {
        try {
            let ele = await this.getFieldType(this.locTextareaInternalTextTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setTextareaExternalTextTag(value) {
        try {
            let ele = await this.getFieldType(this.locTextareaExternalTextTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async setSelectCameraTag(value) {
        try {
            let ele = await this.getFieldType(this.locSelectCameraTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async setSelectVattenskoterUsedByCompanyTag(value) {
        try {
            let ele = await this.getFieldType(this.locSelectVattenskoterUsedByCompanyTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setSelectCompanyTypeTag(value) {
        try {
            let ele = await this.getFieldType(this.locSelectCompanyTypeTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async setSelectVattenskoterTheftProtectionTag(value) {
        try {
            let ele = await this.getFieldType(this.locSelectVattenskoterTheftProtectionTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setSelectTypeOfInsuranceCoverTag(value) {
        try {
            let ele = await this.getFieldType(this.locSelectTypeOfInsuranceCoverTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setSelectTrailerTag(value) {
        try {
            let ele = await this.getFieldType(this.locSelectTrailerTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setNgselectAllEntities(value) {
        try {
            let ele = await this.getFieldType(this.locNgselectAllEntities);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setNgselectMakeTag(value) {
        try {
            let ele = await this.getFieldType(this.locNgselectMakeTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setNgselectVattenskoterValueTag(value) {
        try {
            let ele = await this.getFieldType(this.locNgselectVattenskoterValueTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setNgselectVattenskoterPowerTag(value) {
        try {
            let ele = await this.getFieldType(this.locNgselectVattenskoterPowerTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setNgselectVattenskoterRegionTag(value) {
        try {
            let ele = await this.getFieldType(this.locNgselectVattenskoterRegionTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setNgselectStorageSeasonTag(value) {
        try {
            let ele = await this.getFieldType(this.locNgselectStorageSeasonTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setNgselectStorageWinterTag(value) {
        try {
            let ele = await this.getFieldType(this.locNgselectStorageWinterTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setNgselectApprovedAlarmSystemTag(value) {
        try {
            let ele = await this.getFieldType(this.locNgselectApprovedAlarmSystemTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setNgselectGPSTrackerTag(value) {
        try {
            let ele = await this.getFieldType(this.locNgselectGPSTrackerTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setNgselectVattenskoterEquippedReverseTag(value) {
        try {
            let ele = await this.getFieldType(this.locNgselectVattenskoterEquippedReverseTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setNgselectHasOtherMainInsuranceTag(value) {
        try {
            let ele = await this.getFieldType(this.locNgselectHasOtherMainInsuranceTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setNgselectExcessTag(value) {
        try {
            let ele = await this.getFieldType(this.locNgselectExcessTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async clickButtonpgsclosetabbtn() {
        try {
            let ele = await this.getFieldType(this.locButtonpgsclosetabbtn);
            await ele.click();
            await this.waitPageProgressCompleted();
            return true;
        } catch (error) {
            throw error;
        }
    }
    async clickButtonpgseditcustomerbtn() {
        try {
            let ele = await this.getFieldType(this.locButtonpgseditcustomerbtn);
            await ele.click();
            await this.waitPageProgressCompleted();
            return true;
        } catch (error) {
            throw error;
        }
    }
    async clickButtonpgscreatenotecustomerbtn() {
        try {
            let ele = await this.getFieldType(this.locButtonpgscreatenotecustomerbtn);
            await ele.click();
            await this.waitPageProgressCompleted();
            return true;
        } catch (error) {
            throw error;
        }
    }
    async clickButtonpgsupdateacccustomerbtn() {
        try {
            let ele = await this.getFieldType(this.locButtonpgsupdateacccustomerbtn);
            await ele.click();
            await this.waitPageProgressCompleted();
            return true;
        } catch (error) {
            throw error;
        }
    }
    async clickButtonBackToQuotesList() {
        try {
            let ele = await this.getFieldType(this.locButtonBackToQuotesList);
            await ele.click();
            await this.waitPageProgressCompleted();
            return true;
        } catch (error) {
            throw error;
        }
    }
    async clickButtonCalculate() {
        try {
            let ele = await this.getFieldType(this.locButtonCalculate);
            await ele.click();
            await this.waitPageProgressCompleted();
            return true;
        } catch (error) {
            throw error;
        }
    }
    async clickButtonNext() {
        try {
            let ele = await this.getFieldType(this.locButtonNext);
            await ele.click();
            await this.waitPageProgressCompleted();
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setLabelGender(value) {
        try {
            let ele = await this.getFieldType(this.locLabelGender);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setLabelNumber(value) {
        try {
            let ele = await this.getFieldType(this.locLabelNumber);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setLabelCustomerLifetime(value) {
        try {
            let ele = await this.getFieldType(this.locLabelCustomerLifetime);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setLabelFÖRSÄKRINGENSGILTIGHETSTID(value) {
        try {
            let ele = await this.getFieldType(this.locLabelFÖRSÄKRINGENSGILTIGHETSTID);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setLabelStartDate(value) {
        try {
            let ele = await this.getFieldType(this.locLabelStartDate);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setLabelEndDate(value) {
        try {
            let ele = await this.getFieldType(this.locLabelEndDate);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setLabelUPPGIFTEROMDIG(value) {
        try {
            let ele = await this.getFieldType(this.locLabelUPPGIFTEROMDIG);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setLabelFörnamn(value) {
        try {
            let ele = await this.getFieldType(this.locLabelFörnamn);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setLabelEfternamn(value) {
        try {
            let ele = await this.getFieldType(this.locLabelEfternamn);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setLabelPersonnummer(value) {
        try {
            let ele = await this.getFieldType(this.locLabelPersonnummer);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setLabelFödelsedatum(value) {
        try {
            let ele = await this.getFieldType(this.locLabelFödelsedatum);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async setLabelUPPGIFTEROMVATTENSKOTERN(value) {
        try {
            let ele = await this.getFieldType(this.locLabelUPPGIFTEROMVATTENSKOTERN);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async setLabelFabrikatPåVattenskotern(value) {
        try {
            let ele = await this.getFieldType(this.locLabelFabrikatPåVattenskotern);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async setLabelTillverkningsnummer(value) {
        try {
            let ele = await this.getFieldType(this.locLabelTillverkningsnummer);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async setLabelVattenskoternsMarknadsvärde(value) {
        try {
            let ele = await this.getFieldType(this.locLabelVattenskoternsMarknadsvärde);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async setLabelVattenskoternsEffekt(value) {
        try {
            let ele = await this.getFieldType(this.locLabelVattenskoternsEffekt);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async setLabelRegionDärVattenskoternPrimärtAnvänds(value) {
        try {
            let ele = await this.getFieldType(this.locLabelRegionDärVattenskoternPrimärtAnvänds);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async setLabelHurFörvarasVattenskoternUnderSäsong(value) {
        try {
            let ele = await this.getFieldType(this.locLabelHurFörvarasVattenskoternUnderSäsong);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setLabelHurFörvarasVattenskoternVintertid(value) {
        try {
            let ele = await this.getFieldType(this.locLabelHurFörvarasVattenskoternVintertid);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setLabelFinnsKameraövervakning(value) {
        try {
            let ele = await this.getFieldType(this.locLabelFinnsKameraövervakning);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setLabelKommerVattenskoternAnvändasYrkesmässigtHeltEllerDelvis(value) {
        try {
            let ele = await this.getFieldType(this.locLabelKommerVattenskoternAnvändasYrkesmässigtHeltEllerDelvis);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setLabelAngeTypAvVerksamhet(value) {
        try {
            let ele = await this.getFieldType(this.locLabelAngeTypAvVerksamhet);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setLabelGatuadressTillFastighetDärVattenskoternFörvaras(value) {
        try {
            let ele = await this.getFieldType(this.locLabelGatuadressTillFastighetDärVattenskoternFörvaras);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setLabelPostnummerTillFastighetDärVattenskoterFörvaras(value) {
        try {
            let ele = await this.getFieldType(this.locLabelPostnummerTillFastighetDärVattenskoterFörvaras);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setLabelOrtTillFastighetDärBåtenFörvaras(value) {
        try {
            let ele = await this.getFieldType(this.locLabelOrtTillFastighetDärBåtenFörvaras);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setLabelFinnsAnnanHuvudförsäkring(value) {
        try {
            let ele = await this.getFieldType(this.locLabelFinnsAnnanHuvudförsäkring);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setLabelVäljOmfattning(value) {
        try {
            let ele = await this.getFieldType(this.locLabelVäljOmfattning);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setLabelSjälvrisk(value) {
        try {
            let ele = await this.getFieldType(this.locLabelSjälvrisk);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setLabelFinnsOregistreradTrailer(value) {
        try {
            let ele = await this.getFieldType(this.locLabelFinnsOregistreradTrailer);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setLabelExterntext(value) {
        try {
            let ele = await this.getFieldType(this.locLabelExterntext);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setLabelInterntext(value) {
        try {
            let ele = await this.getFieldType(this.locLabelInterntext);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setLiSUMMARY(value) {
        try {
            let ele = await this.getFieldType(this.locLiSUMMARY);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setLiPOLICIES(value) {
        try {
            let ele = await this.getFieldType(this.locLiPOLICIES);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setLiDOCUMENTS(value) {
        try {
            let ele = await this.getFieldType(this.locLiDOCUMENTS);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setLiHISTORY(value) {
        try {
            let ele = await this.getFieldType(this.locLiHISTORY);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setLiCASES(value) {
        try {
            let ele = await this.getFieldType(this.locLiCASES);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setLiNOTES(value) {
        try {
            let ele = await this.getFieldType(this.locLiNOTES);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setLiSCORING(value) {
        try {
            let ele = await this.getFieldType(this.locLiSCORING);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setLiREWARDS(value) {
        try {
            let ele = await this.getFieldType(this.locLiREWARDS);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setLiQuestions(value) {
        try {
            let ele = await this.getFieldType(this.locLiQuestions);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setLiReview(value) {
        try {
            let ele = await this.getFieldType(this.locLiReview);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setLiAcceptance(value) {
        try {
            let ele = await this.getFieldType(this.locLiAcceptance);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setLiFörsäkringensgiltighetstid(value) {
        try {
            let ele = await this.getFieldType(this.locLiFörsäkringensgiltighetstid);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setLiUppgifteromdig(value) {
        try {
            let ele = await this.getFieldType(this.locLiUppgifteromdig);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setLiUppgifteromvattenskotern(value) {
        try {
            let ele = await this.getFieldType(this.locLiUppgifteromvattenskotern);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setLiOmfattning(value) {
        try {
            let ele = await this.getFieldType(this.locLiOmfattning);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setLipgsnote(value) {
        try {
            let ele = await this.getFieldType(this.locLipgsnote);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setSpanSUMMARY(value) {
        try {
            let ele = await this.getFieldType(this.locSpanSUMMARY);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setSpanPOLICIES(value) {
        try {
            let ele = await this.getFieldType(this.locSpanPOLICIES);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setSpanDOCUMENTS(value) {
        try {
            let ele = await this.getFieldType(this.locSpanDOCUMENTS);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setSpanHISTORY(value) {
        try {
            let ele = await this.getFieldType(this.locSpanHISTORY);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setSpanCASES(value) {
        try {
            let ele = await this.getFieldType(this.locSpanCASES);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setSpanNOTES(value) {
        try {
            let ele = await this.getFieldType(this.locSpanNOTES);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setSpanSCORING(value) {
        try {
            let ele = await this.getFieldType(this.locSpanSCORING);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setSpanREWARDS(value) {
        try {
            let ele = await this.getFieldType(this.locSpanREWARDS);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setSpanQuestions(value) {
        try {
            let ele = await this.getFieldType(this.locSpanQuestions);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setSpanReview(value) {
        try {
            let ele = await this.getFieldType(this.locSpanReview);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setSpanAcceptance(value) {
        try {
            let ele = await this.getFieldType(this.locSpanAcceptance);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setSpan10000(value) {
        try {
            let ele = await this.getFieldType(this.locSpan10000);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setSpanFörsäkringensgiltighetstid(value) {
        try {
            let ele = await this.getFieldType(this.locSpanFörsäkringensgiltighetstid);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setSpanUppgifteromdig(value) {
        try {
            let ele = await this.getFieldType(this.locSpanUppgifteromdig);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setSpanUppgifteromvattenskotern(value) {
        try {
            let ele = await this.getFieldType(this.locSpanUppgifteromvattenskotern);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setSpanOmfattning(value) {
        try {
            let ele = await this.getFieldType(this.locSpanOmfattning);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setSpanTenantvarsamstaging(value) {
        try {
            let ele = await this.getFieldType(this.locSpanTenantvarsamstaging);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setSpanSeamless2022Contemiv202211174(value) {
        try {
            let ele = await this.getFieldType(this.locSpanSeamless2022Contemiv202211174);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async setSpanWhatsnew(value) {
        try {
            let ele = await this.getFieldType(this.locSpanWhatsnew);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async setP1346(value) {
        try {
            let ele = await this.getFieldType(this.locP1346);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async setPNull(value) {
        try {
            let ele = await this.getFieldType(this.locPNull);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async setPFemale(value) {
        try {
            let ele = await this.getFieldType(this.locPFemale);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async setP93(value) {
        try {
            let ele = await this.getFieldType(this.locP93);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async setP123DBP(value) {
        try {
            let ele = await this.getFieldType(this.locP123DBP);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }




    async setP5545(value) {
        try {
            let ele = await this.getFieldType(this.locP5545);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }




    async setP1year6months11days(value) {
        try {
            let ele = await this.getFieldType(this.locP1year6months11days);
            await ele.setValue(value);
            return true;
        } catch (error) {
            throw error;
        }
    }
}