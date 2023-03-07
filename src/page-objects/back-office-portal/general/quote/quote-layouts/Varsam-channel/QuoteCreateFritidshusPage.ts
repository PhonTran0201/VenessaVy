// generate by MappingPage
import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../../core/BasePage";
import { waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../../shared/functions";
export class QuoteCreateFritidshusPage extends BasePage {
    locInputstartDate: By = By.xpath(`//app-product-layout//input[contains(@id,'startDate')]`);
    locInputendDate: By = By.xpath(`//app-product-layout//input[contains(@id,'endDate')]`);
    locInputeffectiveDate: By = By.xpath(`//app-product-layout//input[contains(@id,'effectiveDate')]`);
    locInputInsuredPersonFirstNameTag: By = By.xpath(`//app-product-layout//input[contains(@id,'InsuredPersonFirstNameTag')]`);
    locInputInsuredPersonLastNameTag: By = By.xpath(`//app-product-layout//input[contains(@id,'InsuredPersonLastNameTag')]`);
    locInputInsuredPersonSSNTag: By = By.xpath(`//app-product-layout//input[contains(@id,'InsuredPersonSSNTag')]`);
    locInputInsuredPersonDOBTag: By = By.xpath(`//app-product-layout//input[contains(@id,'InsuredPersonDOBTag')]`);
    locInputOwnerAgeTag: By = By.xpath(`//app-product-layout//input[contains(@id,'OwnerAgeTag')]`);
    locInputHomeContentsHouseNameTag: By = By.xpath(`//app-product-layout//input[contains(@id,'HomeContentsHouseNameTag')]`);
    locInputHouseAddressTag: By = By.xpath(`//app-product-layout//input[contains(@id,'HouseAddressTag')]`);
    locInputHomeContentsPostCodeTag: By = By.xpath(`//app-product-layout//input[contains(@id,'HomeContentsPostCodeTag')]`);
    locInputHomeContentsAddrLine3Tag: By = By.xpath(`//app-product-layout//input[contains(@id,'HomeContentsAddrLine3Tag')]`);
    locInputHomeContentsHouseAreaTag: By = By.xpath(`//app-product-layout//input[contains(@id,'HomeContentsHouseAreaTag')]`);
    locInputTotalAreaTag: By = By.xpath(`//app-product-layout//input[contains(@id,'TotalAreaTag')]`);
    locInputHomeContentsHouseBuiltYearTag: By = By.xpath(`//app-product-layout//input[contains(@id,'HomeContentsHouseBuiltYearTag')]`);
    locInputHomeContentsHouseRenovationYearTag: By = By.xpath(`//app-product-layout//input[contains(@id,'HomeContentsHouseRenovationYearTag')]`);
    locInputHomeContentsBuildingAdditionalSpace1Tag: By = By.xpath(`//app-product-layout//input[contains(@id,'HomeContentsBuildingAdditionalSpace1Tag')]`);
    locInputHomeContentsBuildingAdditionalSpace2Tag: By = By.xpath(`//app-product-layout//input[contains(@id,'HomeContentsBuildingAdditionalSpace2Tag')]`);
    locInputTotalBedsForRentTag: By = By.xpath(`//app-product-layout//input[contains(@id,'TotalBedsForRentTag')]`);
    locTextareaExternalTextTag: By = By.xpath(`//app-product-layout//textarea[contains(@id,'ExternalTextTag')]`);
    locTextareaInternalTextTag: By = By.xpath(`//app-product-layout//textarea[contains(@id,'InternalTextTag')]`);
    locSelectHomeContensPreviousHomeownerTag: By = By.xpath(`//app-product-layout//select[contains(@id,'HomeContensPreviousHomeownerTag')]`);
    locSelectElectricityAndPlumbingReplacedAndChimneyTestedTag: By = By.xpath(`//app-product-layout//select[contains(@id,'ElectricityAndPlumbingReplacedAndChimneyTestedTag')]`);
    locSelectWinterUsageTag: By = By.xpath(`//app-product-layout//select[contains(@id,'WinterUsageTag')]`);
    locSelectSummerWaterTag: By = By.xpath(`//app-product-layout//select[contains(@id,'SummerWaterTag')]`);
    locSelectHomeContentsNumberOfWCTag: By = By.xpath(`//app-product-layout//select[contains(@id,'HomeContentsNumberOfWCTag')]`);
    locSelectHasGeothermalPumpsTag: By = By.xpath(`//app-product-layout//select[contains(@id,'HasGeothermalPumpsTag')]`);
    locSelectHasKitchenMoreThanOneWaterConnectedMachinesTag: By = By.xpath(`//app-product-layout//select[contains(@id,'HasKitchenMoreThanOneWaterConnectedMachinesTag')]`);
    locSelectAreTreesCloseToHouseTag: By = By.xpath(`//app-product-layout//select[contains(@id,'AreTreesCloseToHouseTag')]`);
    locSelectNumberOfFirePlacesTag: By = By.xpath(`//app-product-layout//select[contains(@id,'NumberOfFirePlacesTag')]`);
    locSelectTotalFloorsTag: By = By.xpath(`//app-product-layout//select[contains(@id,'TotalFloorsTag')]`);
    locSelectAirHeaterTag: By = By.xpath(`//app-product-layout//select[contains(@id,'AirHeaterTag')]`);
    locSelectHasPoolOrSpaOrHotTubTag: By = By.xpath(`//app-product-layout//select[contains(@id,'HasPoolOrSpaOrHotTubTag')]`);
    locSelectCentralFireAlarmTag: By = By.xpath(`//app-product-layout//select[contains(@id,'CentralFireAlarmTag')]`);
    locSelectCameraTag: By = By.xpath(`//app-product-layout//select[contains(@id,'CameraTag')]`);
    locSelectHasLargeConservatoryTag: By = By.xpath(`//app-product-layout//select[contains(@id,'HasLargeConservatoryTag')]`);
    locSelectHomeContentsVillaBoatTag: By = By.xpath(`//app-product-layout//select[contains(@id,'HomeContentsVillaBoatTag')]`);
    locSelectAllRiskBuildingsTag: By = By.xpath(`//app-product-layout//select[contains(@id,'AllRiskBuildingsTag')]`);
    locSelectBathroomProtectionTag: By = By.xpath(`//app-product-layout//select[contains(@id,'BathroomProtectionTag')]`);
    locSelectReducedCostTag: By = By.xpath(`//app-product-layout//select[contains(@id,'ReducedCostTag')]`);
    locSelectWaterProtectionTag: By = By.xpath(`//app-product-layout//select[contains(@id,'WaterProtectionTag')]`);
    locSelectContentsPlusTag: By = By.xpath(`//app-product-layout//select[contains(@id,'ContentsPlusTag')]`);
    locSelectWinterUsageBuilding1Tag: By = By.xpath(`//app-product-layout//select[contains(@id,'WinterUsageBuilding1Tag')]`);
    locSelectTotalFloorBuilding1Tag: By = By.xpath(`//app-product-layout//select[contains(@id,'TotalFloorBuilding1Tag')]`);
    locSelectWinterUsageBuilding2Tag: By = By.xpath(`//app-product-layout//select[contains(@id,'WinterUsageBuilding2Tag')]`);
    locSelectTotalFloorBuilding2Tag: By = By.xpath(`//app-product-layout//select[contains(@id,'TotalFloorBuilding2Tag')]`);
    locNgselectAcquiryYearTag: By = By.xpath(`//app-product-layout//ng-select[contains(@id,'AcquiryYearTag')]`);
    locNgselectPropertyTypeTag: By = By.xpath(`//app-product-layout//ng-select[contains(@id,'PropertyTypeTag')]`);
    locNgselectPlotTypeTag: By = By.xpath(`//app-product-layout//ng-select[contains(@id,'PlotTypeTag')]`);
    locNgselectFrameworkTypeTag: By = By.xpath(`//app-product-layout//ng-select[contains(@id,'FrameworkTypeTag')]`);
    locNgselectWetSpaceTag: By = By.xpath(`//app-product-layout//ng-select[contains(@id,'WetSpaceTag')]`);
    locNgselectHasWaterBorneHeatingSystemTag: By = By.xpath(`//app-product-layout//ng-select[contains(@id,'HasWaterBorneHeatingSystemTag')]`);
    locNgselectLeakomaticTag: By = By.xpath(`//app-product-layout//ng-select[contains(@id,'LeakomaticTag')]`);
    locNgselectHasOtherMainInsuranceTag: By = By.xpath(`//app-product-layout//ng-select[contains(@id,'HasOtherMainInsuranceTag')]`);
    locNgselectHomeContentsMoreBuildingsTag: By = By.xpath(`//app-product-layout//ng-select[contains(@id,'HomeContentsMoreBuildingsTag')]`);
    locNgselectProductTag: By = By.xpath(`//app-product-layout//ng-select[contains(@id,'ProductTag')]`);
    locNgselectHomeContentsVillaBaseExcessTag: By = By.xpath(`//app-product-layout//ng-select[contains(@id,'HomeContentsVillaBaseExcessTag')]`);
    locNgselectHomeContentsSumInsuredTag: By = By.xpath(`//app-product-layout//ng-select[contains(@id,'HomeContentsSumInsuredTag')]//input`);
    locNgselectHomeContentsHomeBaseExcessTag: By = By.xpath(`//app-product-layout//ng-select[contains(@id,'HomeContentsHomeBaseExcessTag')]`);
    locNgselectWetSpaceBuilding1Tag: By = By.xpath(`//app-product-layout//ng-select[contains(@id,'WetSpaceBuilding1Tag')]`);
    locNgselectWetSpaceBuilding2Tag: By = By.xpath(`//app-product-layout//ng-select[contains(@id,'WetSpaceBuilding2Tag')]`);
    locNgselectBoatWithEngineTag: By = By.xpath(`//app-product-layout//ng-select[contains(@id,'BoatWithEngineTag')]`);
    locNgselectRentOutTag: By = By.xpath(`//app-product-layout//ng-select[contains(@id,'RentOutTag')]`);

    async setInputstartDate(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locInputstartDate);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputendDate(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locInputendDate);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputeffectiveDate(value) {
        try {
            if (!value || !(await this.driverService.isExisted(this.locInputeffectiveDate))) {
                return true;
            }
            let ele = await this.getFieldType(this.locInputeffectiveDate);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputInsuredPersonFirstNameTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locInputInsuredPersonFirstNameTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputInsuredPersonLastNameTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locInputInsuredPersonLastNameTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputInsuredPersonSSNTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locInputInsuredPersonSSNTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputInsuredPersonDOBTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locInputInsuredPersonDOBTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputOwnerAgeTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locInputOwnerAgeTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputHomeContentsHouseNameTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locInputHomeContentsHouseNameTag);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService,500);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputHouseAddressTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locInputHouseAddressTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputHomeContentsPostCodeTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locInputHomeContentsPostCodeTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputHomeContentsAddrLine3Tag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locInputHomeContentsAddrLine3Tag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputHomeContentsHouseAreaTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locInputHomeContentsHouseAreaTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputTotalAreaTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locInputTotalAreaTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputHomeContentsHouseBuiltYearTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locInputHomeContentsHouseBuiltYearTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputHomeContentsBuildingAdditionalSpace1Tag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locInputHomeContentsBuildingAdditionalSpace1Tag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputHomeContentsBuildingAdditionalSpace2Tag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locInputHomeContentsBuildingAdditionalSpace2Tag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputTotalBedsForRentTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locInputTotalBedsForRentTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setTextareaExternalTextTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locTextareaExternalTextTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setTextareaInternalTextTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locTextareaInternalTextTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setSelectHomeContensPreviousHomeownerTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locSelectHomeContensPreviousHomeownerTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputHomeContentsHouseRenovationYearTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locInputHomeContentsHouseRenovationYearTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setSelectElectricityAndPlumbingReplacedAndChimneyTestedTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locSelectElectricityAndPlumbingReplacedAndChimneyTestedTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setSelectWinterUsageTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locSelectWinterUsageTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setSelectSummerWaterTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locSelectSummerWaterTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setSelectHomeContentsNumberOfWCTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locSelectHomeContentsNumberOfWCTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setSelectHasGeothermalPumpsTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locSelectHasGeothermalPumpsTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setSelectHasKitchenMoreThanOneWaterConnectedMachinesTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locSelectHasKitchenMoreThanOneWaterConnectedMachinesTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setSelectAreTreesCloseToHouseTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locSelectAreTreesCloseToHouseTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setSelectNumberOfFirePlacesTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locSelectNumberOfFirePlacesTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setSelectTotalFloorsTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locSelectTotalFloorsTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setSelectAirHeaterTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locSelectAirHeaterTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setSelectHasPoolOrSpaOrHotTubTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locSelectHasPoolOrSpaOrHotTubTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setSelectCentralFireAlarmTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locSelectCentralFireAlarmTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setSelectCameraTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locSelectCameraTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setSelectHasLargeConservatoryTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locSelectHasLargeConservatoryTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setSelectHomeContentsVillaBoatTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locSelectHomeContentsVillaBoatTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setSelectAllRiskBuildingsTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locSelectAllRiskBuildingsTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setSelectBathroomProtectionTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locSelectBathroomProtectionTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setSelectReducedCostTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locSelectReducedCostTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setSelectWaterProtectionTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locSelectWaterProtectionTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setSelectContentsPlusTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locSelectContentsPlusTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setSelectWinterUsageBuilding1Tag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locSelectWinterUsageBuilding1Tag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async setSelectTotalFloorBuilding1Tag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locSelectTotalFloorBuilding1Tag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async setSelectWinterUsageBuilding2Tag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locSelectWinterUsageBuilding2Tag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async setSelectTotalFloorBuilding2Tag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locSelectTotalFloorBuilding2Tag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setNgselectAcquiryYearTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locNgselectAcquiryYearTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setNgselectPropertyTypeTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locNgselectPropertyTypeTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setNgselectPlotTypeTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locNgselectPlotTypeTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setNgselectFrameworkTypeTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locNgselectFrameworkTypeTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setNgselectWetSpaceTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locNgselectWetSpaceTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setNgselectHasWaterBorneHeatingSystemTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locNgselectHasWaterBorneHeatingSystemTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setNgselectLeakomaticTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locNgselectLeakomaticTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setNgselectHasOtherMainInsuranceTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locNgselectHasOtherMainInsuranceTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setNgselectHomeContentsMoreBuildingsTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locNgselectHomeContentsMoreBuildingsTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setNgselectProductTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locNgselectProductTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setNgselectHomeContentsVillaBaseExcessTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locNgselectHomeContentsVillaBaseExcessTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setNgselectHomeContentsSumInsuredTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locNgselectHomeContentsSumInsuredTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setNgselectHomeContentsHomeBaseExcessTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locNgselectHomeContentsHomeBaseExcessTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async setNgselectWetSpaceBuilding1Tag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locNgselectWetSpaceBuilding1Tag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async setNgselectWetSpaceBuilding2Tag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locNgselectWetSpaceBuilding2Tag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async setNgselectBoatWithEngineTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locNgselectBoatWithEngineTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setNgselectRentOutTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locNgselectRentOutTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
























































}