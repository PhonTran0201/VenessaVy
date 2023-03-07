// generate by MappingPage
import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../../core/BasePage";
import { selectDropdownOption, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../../shared/functions";
export class QuoteCreateVillahemPage extends BasePage {
    locInputstartDate: By = By.xpath(`//app-product-layout//input[contains(@id,'startDate')]`);
    locInputendDate: By = By.xpath(`//app-product-layout//input[contains(@id,'endDate')]`);
    locInputeffectiveDate: By = By.xpath(`//app-product-layout//input[contains(@id,'effectiveDate')]`);
    locInputInsuredPersonSSNTag: By = By.xpath(`//app-product-layout//input[contains(@id,'InsuredPersonSSNTag')]`);
    locInputInsuredPersonFirstNameTag: By = By.xpath(`//app-product-layout//input[contains(@id,'InsuredPersonFirstNameTag')]`);
    locInputInsuredPersonLastNameTag: By = By.xpath(`//app-product-layout//input[contains(@id,'InsuredPersonLastNameTag')]`);
    locInputInsuredPersonDOBTag: By = By.xpath(`//app-product-layout//input[contains(@id,'InsuredPersonDOBTag')]`);
    locInputOwnerAgeTag: By = By.xpath(`//app-product-layout//input[contains(@id,'OwnerAgeTag')]`);
    locInputHomeContentsHouseNameTag: By = By.xpath(`//app-product-layout//input[contains(@id,'HomeContentsHouseNameTag')]`);
    locInputHouseAddressTag: By = By.xpath(`//app-product-layout//input[contains(@id,'HouseAddressTag')]`);
    locInputHomeContentsPostCodeTag: By = By.xpath(`//app-product-layout//input[contains(@id,'HomeContentsPostCodeTag')]`);
    locInputHomeContentsCityTag: By = By.xpath(`//app-product-layout//input[contains(@id,'HomeContentsCityTag')]`);
    locInputHomeContentsAquiryDateTag: By = By.xpath(`//app-product-layout//input[contains(@id,'HomeContentsAquiryDateTag')]`);
    locInputCalculatedHomeContentsAquiryAgeTag: By = By.xpath(`//app-product-layout//input[contains(@id,'CalculatedHomeContentsAquiryAgeTag')]`);
    locInputHomeContentsHouseAreaTag: By = By.xpath(`//app-product-layout//input[contains(@id,'HomeContentsHouseAreaTag')]`);
    locInputHomeContentsHouseTag: By = By.xpath(`//app-product-layout//input[contains(@id,'HomeContentsHouseTag')]`);
    locInputCalculatedTotalAreaTag: By = By.xpath(`//app-product-layout//input[contains(@id,'CalculatedTotalAreaTag')]`);
    locInputHomeContentsHouseBuiltYearTag: By = By.xpath(`//app-product-layout//input[contains(@id,'HomeContentsHouseBuiltYearTag')]`);
    locInputHomeContentsHouseRenovationYearTag: By = By.xpath(`//app-product-layout//input[contains(@id,'HomeContentsHouseRenovationYearTag')]`);
    locTextareaExternalTextTag: By = By.xpath(`//app-product-layout//textarea[contains(@id,'ExternalTextTag')]`);
    locSelectHomeContensPreviousHomeownerTag: By = By.xpath(`//app-product-layout//select[contains(@id,'HomeContensPreviousHomeownerTag')]`);
    locSelectHomeContentsHouseMarkTag: By = By.xpath(`//app-product-layout//select[contains(@id,'HomeContentsHouseMarkTag')]`);
    locSelectHomeContentsNumberOfChildren: By = By.xpath(`//app-product-layout//select[contains(@id,'HomeContentsNumberOfChildren')]`);
    locSelectElectricityAndPlumbingReplacedAndChimneyTestedTag: By = By.xpath(`//app-product-layout//select[contains(@id,'ElectricityAndPlumbingReplacedAndChimneyTestedTag')]`);
    locSelectAreTreesCloseToHouseTag: By = By.xpath(`//app-product-layout//select[contains(@id,'AreTreesCloseToHouseTag')]`);
    locSelectNumberOfFirePlacesTag: By = By.xpath(`//app-product-layout//select[contains(@id,'NumberOfFirePlacesTag')]`);
    locSelectPlotTypeTag: By = By.xpath(`//app-product-layout//select[contains(@id,'PlotTypeTag')]`);
    locSelectHomeContentsSuterranghusTag: By = By.xpath(`//app-product-layout//select[contains(@id,'HomeContentsSuterranghusTag')]`);
    locSelectHasWaterBorneHeatingSystemTag: By = By.xpath(`//app-product-layout//select[contains(@id,'HasWaterBorneHeatingSystemTag')]`);
    locSelectHasGeothermalPumpsTag: By = By.xpath(`//app-product-layout//select[contains(@id,'HasGeothermalPumpsTag')]`);
    locSelectHasKitchenMoreThanOneWaterConnectedMachinesTag: By = By.xpath(`//app-product-layout//select[contains(@id,'HasKitchenMoreThanOneWaterConnectedMachinesTag')]`);
    locSelectHasPoolOrSpaOrHotTubTag: By = By.xpath(`//app-product-layout//select[contains(@id,'HasPoolOrSpaOrHotTubTag')]`);
    locSelectHasLargeConservatoryTag: By = By.xpath(`//app-product-layout//select[contains(@id,'HasLargeConservatoryTag')]`);
    locSelectHomeContentsMoreBuildingsTag: By = By.xpath(`//app-product-layout//select[contains(@id,'HomeContentsMoreBuildingsTag')]`);
    locSelectHomeContentsHomeInsuranceTag: By = By.xpath(`//app-product-layout//select[contains(@id,'HomeContentsHomeInsuranceTag')]`);
    locSelectContentsAllriskTag: By = By.xpath(`//app-product-layout//select[contains(@id,'ContentsAllriskTag')]`);
    locSelectTravelAllriskTag: By = By.xpath(`//app-product-layout//select[contains(@id,'TravelAllriskTag')]`);
    locSelectCancellationTag: By = By.xpath(`//app-product-layout//select[contains(@id,'CancellationTag')]`);
    locSelectPARecreationalTag: By = By.xpath(`//app-product-layout//select[contains(@id,'PARecreationalTag')]`);
    locSelectCrisisTag: By = By.xpath(`//app-product-layout//select[contains(@id,'CrisisTag')]`);
    locSelectIDTheftTag: By = By.xpath(`//app-product-layout//select[contains(@id,'IDTheftTag')]`);
    locSelectHomeContentsVillaAllRiskTag: By = By.xpath(`//app-product-layout//select[contains(@id,'HomeContentsVillaAllRiskTag')]`);
    locSelectHomeContentsVillaAdvancedDrainageTag: By = By.xpath(`//app-product-layout//select[contains(@id,'HomeContentsVillaAdvancedDrainageTag')]`);
    locSelectHomeContentsVillaBoatTag: By = By.xpath(`//app-product-layout//select[contains(@id,'HomeContentsVillaBoatTag')]`);
    locSelectHomeContentsVillaDeductibleEliminationTag: By = By.xpath(`//app-product-layout//select[contains(@id,'HomeContentsVillaDeductibleEliminationTag')]`);
    locSelectHomeContentsAgeOfChildren: By = By.xpath(`//app-product-layout//select[contains(@id,'HomeContentsAgeOfChildren')]`);
    locNgselectHomeContentsNumberOfPeopleLivingTag: By = By.xpath(`//app-product-layout//ng-select[contains(@id,'HomeContentsNumberOfPeopleLivingTag')]`);
    locNgselectHomeContentsBuildingTypeTag: By = By.xpath(`//app-product-layout//ng-select[contains(@id,'HomeContentsBuildingTypeTag')]`);
    locNgselectHomeContentsNumberOfBathAndShowerTag: By = By.xpath(`//app-product-layout//ng-select[contains(@id,'HomeContentsNumberOfBathAndShowerTag')]`);
    locNgselectHomeContentsNumberOfWCTag: By = By.xpath(`//app-product-layout//ng-select[contains(@id,'HomeContentsNumberOfWCTag')]`);
    locNgselectHomeContentsAlarmTag: By = By.xpath(`//app-product-layout//ng-select[contains(@id,'HomeContentsAlarmTag')]`);
    locNgselectHomeContentsVillaBaseExcessTag: By = By.xpath(`//app-product-layout//ng-select[contains(@id,'HomeContentsVillaBaseExcessTag')]`);
    locNgselectHomeContentsSumInsuredTag: By = By.xpath(`//app-product-layout//ng-select[contains(@id,'HomeContentsSumInsuredTag')]`);
    locNgselectHomeContentsHomeBaseExcessTag: By = By.xpath(`//app-product-layout//ng-select[contains(@id,'HomeContentsHomeBaseExcessTag')]`);
    locNgselectHomeContentsCombinationOptionalCoverTag: By = By.xpath(`//app-product-layout//ng-select[contains(@id,'HomeContentsCombinationOptionalCoverTag')]`);



    async setInputstartDate(value) {
        try {
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
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
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

    async setInputHomeContentsCityTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locInputHomeContentsCityTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputHomeContentsAquiryDateTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locInputHomeContentsAquiryDateTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputCalculatedHomeContentsAquiryAgeTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locInputCalculatedHomeContentsAquiryAgeTag);
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

    async setInputHomeContentsHouseTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locInputHomeContentsHouseTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputCalculatedTotalAreaTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locInputCalculatedTotalAreaTag);
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

    async setSelectHomeContentsHouseMarkTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locSelectHomeContentsHouseMarkTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setSelectHomeContentsNumberOfChildren(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locSelectHomeContentsNumberOfChildren);
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

    async setSelectPlotTypeTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locSelectPlotTypeTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setSelectHomeContentsSuterranghusTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locSelectHomeContentsSuterranghusTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setSelectHasWaterBorneHeatingSystemTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locSelectHasWaterBorneHeatingSystemTag);
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

    async setSelectHomeContentsMoreBuildingsTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locSelectHomeContentsMoreBuildingsTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setSelectHomeContentsHomeInsuranceTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locSelectHomeContentsHomeInsuranceTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setSelectContentsAllriskTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locSelectContentsAllriskTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setSelectTravelAllriskTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locSelectTravelAllriskTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setSelectCancellationTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locSelectCancellationTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setSelectPARecreationalTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locSelectPARecreationalTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setSelectCrisisTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locSelectCrisisTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setSelectIDTheftTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locSelectIDTheftTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setSelectHomeContentsVillaAllRiskTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locSelectHomeContentsVillaAllRiskTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setSelectHomeContentsVillaAdvancedDrainageTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locSelectHomeContentsVillaAdvancedDrainageTag);
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

    async setSelectHomeContentsVillaDeductibleEliminationTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locSelectHomeContentsVillaDeductibleEliminationTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async setSelectHomeContentsAgeOfChildren(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locSelectHomeContentsAgeOfChildren);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setNgselectHomeContentsNumberOfPeopleLivingTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locNgselectHomeContentsNumberOfPeopleLivingTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setNgselectHomeContentsBuildingTypeTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locNgselectHomeContentsBuildingTypeTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setNgselectHomeContentsNumberOfBathAndShowerTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locNgselectHomeContentsNumberOfBathAndShowerTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setNgselectHomeContentsNumberOfWCTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locNgselectHomeContentsNumberOfWCTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setNgselectHomeContentsAlarmTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locNgselectHomeContentsAlarmTag);
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

    async setNgselectHomeContentsCombinationOptionalCoverTag(value) {
        try {
            if (!value) {
                return true;
            }
            let ele = await this.getFieldType(this.locNgselectHomeContentsCombinationOptionalCoverTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setNgselectHomeContentsAdditionalBuildingTag(value, section) {
        try {
            if (!value) {
                return true;
            }
            let logNgselectHomeContentsAdditionalBuildingTag = By.xpath(`//app-product-layout//ng-select[contains(@id,'HomeContentsAdditionalBuilding${section}Tag')]`);
            let ele = await this.getFieldType(logNgselectHomeContentsAdditionalBuildingTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputHomeContentsBuildingAdditionalSpaceTag(value, section) {
        try {
            if (!value) {
                return true;
            }
            let logInputHomeContentsBuildingAdditionalSpaceTag = By.xpath(`//app-product-layout//input[contains(@id,'HomeContentsBuildingAdditionalSpace${section}Tag')]`);
            let ele = await this.getFieldType(logInputHomeContentsBuildingAdditionalSpaceTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setNgselectHomeContentsStandardTag(value, section) {
        try {
            if (!value) {
                return true;
            }
            let logNgselectHomeContentsStandardTag = By.xpath(`//app-product-layout//*[contains(@id,'HomeContentsStandard${section}Tag')]`);
            let ele = await this.getFieldType(logNgselectHomeContentsStandardTag);
            await ele.setValue(value);
            await selectDropdownOption(value, "", this.driverService);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }























































}