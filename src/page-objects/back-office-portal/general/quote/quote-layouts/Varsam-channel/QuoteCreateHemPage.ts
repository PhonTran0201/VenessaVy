import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../../core/BasePage";

export class QuoteCreateHemPage extends BasePage {

    locInputstartDate: By = By.xpath(`//app-product-layout//input[contains(@id,'startDate')]`);
    locInputendDate: By = By.xpath(`//app-product-layout//input[contains(@id,'endDate')]`);
    locInputInsuredPersonFirstNameTag: By = By.xpath(`//app-product-layout//input[contains(@id,'InsuredPersonFirstNameTag')]`);
    locInputInsuredPersonLastNameTag: By = By.xpath(`//app-product-layout//input[contains(@id,'InsuredPersonLastNameTag')]`);
    locInputInsuredPersonSSNTag: By = By.xpath(`//app-product-layout//input[contains(@id,'InsuredPersonSSNTag')]`);
    locInputInsuredPersonDOBTag: By = By.xpath(`//app-product-layout//input[contains(@id,'InsuredPersonDOBTag')]`);
    locInputOwnerAgeTag: By = By.xpath(`//app-product-layout//input[contains(@id,'OwnerAgeTag')]`);
    locInputHouseAddressTag: By = By.xpath(`//app-product-layout//input[contains(@id,'HouseAddressTag')]`);
    locInputHomePostCodeTag: By = By.xpath(`//app-product-layout//input[contains(@id,'HomePostCodeTag')]`);
    locInputHomeAddrLine3Tag: By = By.xpath(`//app-product-layout//input[contains(@id,'HomeAddrLine3Tag')]`);
    locTextareaExternalTextTag: By = By.xpath(`//app-product-layout//textarea[contains(@id,'ExternalTextTag')]`);
    locTextareaInternalTextTag: By = By.xpath(`//app-product-layout//textarea[contains(@id,'InternalTextTag')]`);
    locSelectAccomodationTypeTag: By = By.xpath(`//app-product-layout//select[contains(@id,'AccomodationTypeTag')]`);
    locSelectHasMoreThanOneWaterConnectedMachinesInKitchenTag: By = By.xpath(`//app-product-layout//select[contains(@id,'HasMoreThanOneWaterConnectedMachinesInKitchenTag')]`);
    locSelectHasWaterBorneHeatingSystemInApartmentTag: By = By.xpath(`//app-product-layout//select[contains(@id,'HasWaterBorneHeatingSystemInApartmentTag')]`);
    locSelectHasOldSurfaceLayersInWetRoomsTag: By = By.xpath(`//app-product-layout//select[contains(@id,'HasOldSurfaceLayersInWetRoomsTag')]`);
    locSelectHasOwnFixedCostFurnishingsTag: By = By.xpath(`//app-product-layout//select[contains(@id,'HasOwnFixedCostFurnishingsTag')]`);
    locSelectContentsAllriskTag: By = By.xpath(`//app-product-layout//select[contains(@id,'ContentsAllriskTag')]`);
    locSelectApartmentOwnershipTag: By = By.xpath(`//app-product-layout//select[contains(@id,'ApartmentOwnershipTag')]`);
    locSelectApartmentAllriskTag: By = By.xpath(`//app-product-layout//select[contains(@id,'ApartmentAllriskTag')]`);
    locSelectTravelAllriskTag: By = By.xpath(`//app-product-layout//select[contains(@id,'TravelAllriskTag')]`);
    locSelectCancellationTag: By = By.xpath(`//app-product-layout//select[contains(@id,'CancellationTag')]`);
    locSelectPARecreationalTag: By = By.xpath(`//app-product-layout//select[contains(@id,'PARecreationalTag')]`);
    locSelectCrisisTag: By = By.xpath(`//app-product-layout//select[contains(@id,'CrisisTag')]`);
    locSelectContentsBoatTag: By = By.xpath(`//app-product-layout//select[contains(@id,'ContentsBoatTag')]`);
    locSelectIDTheftTag: By = By.xpath(`//app-product-layout//select[contains(@id,'IDTheftTag')]`);
    locNgselectHomeNumberOfPeopleLivingTag: By = By.xpath(`//app-product-layout//ng-select[contains(@id,'HomeNumberOfPeopleLivingTag')]`);
    locNgselectHomeSumInsuredTag: By = By.xpath(`//app-product-layout//ng-select[contains(@id,'HomeSumInsuredTag')]`);
    locNgselectHomeExcessTag: By = By.xpath(`//app-product-layout//ng-select[contains(@id,'HomeExcessTag')]`);
    locNgselectHomeSecurityTag: By = By.xpath(`//app-product-layout//ng-select[contains(@id,'HomeSecurityTag')]`);
    locNgselectHomeCombinationOptionalCoverTag: By = By.xpath(`//app-product-layout//ng-select[contains(@id,'HomeCombinationOptionalCoverTag')]`);
 
     
        
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
    
    async setInputInsuredPersonFirstNameTag(value) {
        try {
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
            let ele = await this.getFieldType(this.locInputOwnerAgeTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    } 
    
    async setInputHouseAddressTag(value) {
        try {
            let ele = await this.getFieldType(this.locInputHouseAddressTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    } 
    
    async setInputHomePostCodeTag(value) {
        try {
            let ele = await this.getFieldType(this.locInputHomePostCodeTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    } 
    
    async setInputHomeAddrLine3Tag(value) {
        try {
            let ele = await this.getFieldType(this.locInputHomeAddrLine3Tag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    } 
    
    async setTextareaExternalTextTag(value) {
        try {
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
            let ele = await this.getFieldType(this.locTextareaInternalTextTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    } 
    
    async setSelectAccomodationTypeTag(value) {
        try {
            let ele = await this.getFieldType(this.locSelectAccomodationTypeTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    } 
    
    async setSelectHasMoreThanOneWaterConnectedMachinesInKitchenTag(value) {
        try {
            let ele = await this.getFieldType(this.locSelectHasMoreThanOneWaterConnectedMachinesInKitchenTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    } 
    
    async setSelectHasWaterBorneHeatingSystemInApartmentTag(value) {
        try {
            let ele = await this.getFieldType(this.locSelectHasWaterBorneHeatingSystemInApartmentTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    } 
    
    async setSelectHasOldSurfaceLayersInWetRoomsTag(value) {
        try {
            let ele = await this.getFieldType(this.locSelectHasOldSurfaceLayersInWetRoomsTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    } 
    
    async setSelectHasOwnFixedCostFurnishingsTag(value) {
        try {
            let ele = await this.getFieldType(this.locSelectHasOwnFixedCostFurnishingsTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    } 
    
    async setSelectContentsAllriskTag(value) {
        try {
            let ele = await this.getFieldType(this.locSelectContentsAllriskTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    } 
    
    async setSelectApartmentOwnershipTag(value) {
        try {
            let ele = await this.getFieldType(this.locSelectApartmentOwnershipTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    } 
    
    async setSelectApartmentAllriskTag(value) {
        try {
            let ele = await this.getFieldType(this.locSelectApartmentAllriskTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    } 
    
    async setSelectTravelAllriskTag(value) {
        try {
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
            let ele = await this.getFieldType(this.locSelectCrisisTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    } 
    
    async setSelectContentsBoatTag(value) {
        try {
            let ele = await this.getFieldType(this.locSelectContentsBoatTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    } 
    
    async setSelectIDTheftTag(value) {
        try {
            let ele = await this.getFieldType(this.locSelectIDTheftTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    } 
    
    async setNgselectHomeNumberOfPeopleLivingTag(value) {
        try {
            let ele = await this.getFieldType(this.locNgselectHomeNumberOfPeopleLivingTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    } 
    
    async setNgselectHomeSumInsuredTag(value) {
        try {
            let ele = await this.getFieldType(this.locNgselectHomeSumInsuredTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    } 
    
    async setNgselectHomeExcessTag(value) {
        try {
            let ele = await this.getFieldType(this.locNgselectHomeExcessTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    } 
    
    async setNgselectHomeSecurityTag(value) {
        try {
            let ele = await this.getFieldType(this.locNgselectHomeSecurityTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    } 
    
    async setNgselectHomeCombinationOptionalCoverTag(value) {
        try {
            let ele = await this.getFieldType(this.locNgselectHomeCombinationOptionalCoverTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    } 

    async validateInputInsuredPersonFirstNameTag(value) {
        try {
            let ele = await this.getFieldType(this.locInputInsuredPersonFirstNameTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate InsuredPersonFirstNameTag",[actualValue,value,'Incorrect value!'])
        } catch (error) {
            console.log(error);
            return false;
        }
    } 
    
    async validateInputInsuredPersonLastNameTag(value) {
        try {
            let ele = await this.getFieldType(this.locInputInsuredPersonLastNameTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate InsuredPersonLastNameTag",[actualValue,value,'Incorrect value!'])
        } catch (error) {
            console.log(error);
            return false;
        }
    } 
    
    async validateInputInsuredPersonSSNTag(value) {
        try {
            let ele = await this.getFieldType(this.locInputInsuredPersonSSNTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate InputInsuredPersonSSNTag",[actualValue,value,'Incorrect value!'])
        } catch (error) {
            console.log(error);
            return false;
        }
    } 
    
    async validateInputInsuredPersonDOBTag(value) {
        try {
            let ele = await this.getFieldType(this.locInputInsuredPersonDOBTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate InputInsuredPersonDOBTag",[actualValue,value,'Incorrect value!'])
        } catch (error) {
            console.log(error);
            return false;
        }
    } 
}