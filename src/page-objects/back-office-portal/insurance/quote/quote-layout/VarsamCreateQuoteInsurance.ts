import { By } from "selenium-webdriver";
import { GlobalQuoteInsurance } from "./GlobalQuoteInsurance";

export class VarsamCreateQuoteInsurance extends GlobalQuoteInsurance {
    locAddress: By = By.css("input#AddressTag");
    locPostnumber: By = By.css("input#PostCodeTag");

    // dropdownlis
    locType: By = By.css("ng-select#RentTypeTag");
    locAlarmSystem: By = By.css("ng-select#AlarmSystemTag");
    locWaterStopSystemTag: By = By.css("ng-select#WaterStopSystemTag");
    locSmokeDetectorTag: By = By.css("ng-select#SmokeDetectorTag");
    locElectricityTag: By = By.css("ng-select#ElectricityTag");
    locNumberOfResidentsTag: By = By.css("ng-select#NumberOfResidentsTag");

    async inputValue(loc, value, errLog) {
        try {
            let ele = await this.getFieldType(loc);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(errLog);
            console.log(error);
            return false;
        }
    }
    //#region populate data
    async inputAddress(value) {
        return await this.inputValue(this.locAddress, value, "inputCreateQuoteAddress");
        // try {
        //     let ele = await this.getFieldType(this.locAddress);
        //     await ele.setValue(value);
        //     return true;
        // } catch (error) {
        //     console.log("inputCreateQuoteAddress");
        //     console.log(error);
        //     return false;
        // }
    }

    async inputPostNumber(value) {
        return await this.inputValue(this.locPostnumber, value, "inputCreateQuotePostnumber");
        // try {
        //     let ele = await this.getFieldType(this.locPostnumber);
        //     await ele.setValue(value);
        //     return true;
        // } catch (error) {
        //     console.log("inputCreateQuotePostnumber");
        //     console.log(error);
        //     return false;
        // }
    }

    async inputType(value) {
        return await this.inputValue(this.locType, value, "inputCreateQuoteType");
        // try {
        //     let ele = await this.getFieldType(this.locType);
        //     await ele.setValue(value);
        //     return true;
        // } catch (error) {
        //     console.log("inputCreateQuoteType");
        //     console.log(error);
        //     return false;
        // }
    }

    async inputAlarmSystem(value) {
        return await this.inputValue(this.locAlarmSystem, value, "inputCreateQuoteAlarmSystem");
        // try {
        //     let ele = await this.getFieldType(this.locAlarmSystem);
        //     await ele.setValue(value);
        //     return true;
        // } catch (error) {
        //     console.log("inputCreateQuoteAlarmSystem"); 
        //     console.log(error);
        //     return false;
        // }
    }

    async inputWaterStopSystemTag(value) {
        return await this.inputValue(this.locWaterStopSystemTag, value, "inputCreateWaterStopSystemTag");
        // try {
        //     let ele = await this.getFieldType(this.locWaterStopSystemTag);
        //     await ele.setValue(value);
        //     return true;
        // } catch (error) {
        //     console.log("inputCreateWaterStopSystemTag");
        //     console.log(error);
        //     return false;
        // }
    }

    async inputSmokeDetectorTag(value) {
        return await this.inputValue(this.locSmokeDetectorTag, value, "inputCreateQuoteSmokeDetectpr");
        // try {
        //     let ele = await this.getFieldType(this.locSmokeDetectorTag);
        //     await ele.setValue(value);
        //     return true;
        // } catch (error) {
        //     console.log("inputCreateQuoteSmokeDetectpr");
        //     console.log(error);
        //     return false;
        // }
    }

    async inputElectricityTag(value) {
        return await this.inputValue(this.locElectricityTag, value, "inputCreateQuoteinputElectricityTag");
        // try {
        //     let ele = await this.getFieldType(this.locElectricityTag);
        //     await ele.setValue(value);
        //     return true;
        // } catch (error) {
        //     console.log("inputCreateQuoteinputElectricityTag");
        //     console.log(error);
        //     return false;
        // }
    }

    async inputNumberOfResidentsTag(value) {
        return await this.inputValue(this.locNumberOfResidentsTag, value, "inputCreateQuoteType");
        // try {
        //     let ele = await this.getFieldType(this.locNumberOfResidentsTag);
        //     await ele.setValue(value);
        //     return true;
        // } catch (error) {
        //     console.log("inputCreateQuoteType");
        //     console.log(error);
        //     return false;
        // }
    }

    //#endregion
}