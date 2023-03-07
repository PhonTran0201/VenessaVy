import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../../../core/BasePage";
import { selectDropdownOption, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../../../shared/functions";

export class SaleTabCallLogForm extends BasePage {

    // generate by MappingPage
    locInputpgscccalllogentityname: By = By.xpath(`//app-sale-call-log-form//input[contains(@id,'pgs-cc-call-log-entity-name')]`);
    labelpgscccalllogentityname: By = By.xpath(`//app-sale-call-log-form//ng-select[.//*[contains(@id,'pgs-cc-call-log-entity-name')] and contains(@class,'ng-select-disabled')]//span[contains(@class,'ng-value-label')]`);
    locInputpgscccalllogphonenumber: By = By.xpath(`//app-sale-call-log-form//input[contains(@id,'pgs-cc-call-log-phone-number')]`);
    locInputpgscccalllogoccurtime: By = By.xpath(`//app-sale-call-log-form//input[contains(@id,'pgs-cc-call-log-occur-time')]`);
    locInputCallType3: By = By.xpath(`//app-sale-call-log-form//input[contains(@id,'CallType_3')]`);
    locInputpgsworklogworklogduration: By = By.xpath(`//app-sale-call-log-form//input[contains(@id,'pgs-worklog-worklog-duration')]`);
    locInputpgsworklogworklogtimetype: By = By.xpath(`//app-sale-call-log-form//input[contains(@id,'pgs-worklog-worklog-time-type')]`);
    locInputpgscccalllogcallresult: By = By.xpath(`//app-sale-call-log-form//input[contains(@id,'pgs-cc-call-log-call-result')]`);
    locTextareapgscccalllogdescription: By = By.xpath(`//app-sale-call-log-form//textarea[contains(@id,'pgs-cc-call-log-description')]`);
    locNgselectOutgoingcall: By = By.xpath(`//app-sale-call-log-form//ng-select[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"outgoing call")]`);
    locNgselectHour: By = By.xpath(`//app-sale-call-log-form//ng-select[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"hour")]`);
    locNgselectSelectCallResult: By = By.xpath(`//app-sale-call-log-form//ng-select[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"select call result")]`);
    locButtonclosebtn: By = By.xpath(`//app-sale-call-log-form//button[contains(@id,'close-btn')]`);
    locButtonpgscalllogsave: By = By.xpath(`//app-sale-call-log-form//button[contains(@id,'pgs-call-log-save')]`);
    locButtonpgscalllogcancel: By = By.xpath(`//app-sale-call-log-form//button[contains(@id,'pgs-call-log-cancel')]`);
    locLabelCaller: By = By.xpath(`//app-sale-call-log-form//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"caller *")]`);
    locLabelPhoneNumber: By = By.xpath(`//app-sale-call-log-form//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"phone number *")]`);
    locLabelDateAndTime: By = By.xpath(`//app-sale-call-log-form//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"date and time *")]`);
    locLabelType: By = By.xpath(`//app-sale-call-log-form//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"type")]`);
    locLabelDuration: By = By.xpath(`//app-sale-call-log-form//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"duration")]`);
    locLabelCallResult: By = By.xpath(`//app-sale-call-log-form//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"call result *")]`);
    locLabelDescription: By = By.xpath(`//app-sale-call-log-form//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"description")]`);



    //#region set input
    // async setInputpgscccalllogentityname(value) {
    //     try {
    //         let ele = await this.getFieldType(this.locInputpgscccalllogentityname);
    //         await ele.setValue(value);
    //         return true;
    //     } catch (error) {
    //         console.log(error);
    //         return false;
    //     }
    // }

    async validateCallerName(expectedValue: string) {
        try {
            let ele = await this.getFieldType(this.labelpgscccalllogentityname);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord(`Validate Caller Name`, [actualValue, expectedValue, 'Incorrect Value!']);
        } catch (error) {
            console.log(`validateCallerName`);
            console.log(error);
            return false;
        }
    }


    async setInputpgscccalllogphonenumber(value) {
        try {
            let ele = await this.getFieldType(this.locInputpgscccalllogphonenumber);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputCallType(value) {
        try {
            let ele = await this.getFieldType(this.locInputCallType3);
            await ele.setValue(value);
            await selectDropdownOption(value, "", this.driverService);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputpgscccalllogoccurtime(value) {
        try {
            let ele = await this.getFieldType(this.locInputpgscccalllogoccurtime);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    async setInputpgsworklogworklogduration(value) {
        try {
            let ele = await this.getFieldType(this.locInputpgsworklogworklogduration);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputpgsworklogworklogtimetype(value) {
        try {
            let ele = await this.getFieldType(this.locInputpgsworklogworklogtimetype);
            await ele.setValue(value);
            await selectDropdownOption(value, "", this.driverService);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputpgscccalllogcallresult(value) {
        try {
            let ele = await this.getFieldType(this.locNgselectSelectCallResult);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setTextareapgscccalllogdescription(value) {
        try {
            let ele = await this.getFieldType(this.locTextareapgscccalllogdescription);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    async inputCallLogForm(
        PhoneNumber: string,
        DateAndTime: string,
        CallType: string,
        Duration: string,
        DurationType: string,
        CallResult: string,
        Description: string
    ) {
        try {
            if (
                await this.setInputpgscccalllogphonenumber(PhoneNumber) &&
                await this.setInputpgscccalllogoccurtime(DateAndTime) &&
                await this.setInputCallType(CallType) &&
                await this.setInputpgsworklogworklogduration(Duration) &&
                await this.setInputpgsworklogworklogtimetype(DurationType) &&
                await this.setInputpgscccalllogcallresult(CallResult) &&
                await this.setTextareapgscccalllogdescription(Description)) {
                return true;
            } return false;
        } catch (error) {
            console.log(`inputCallLogForm`);
            console.log(error);
            return false;
        }
    }

    //#endregion

    async clickButtonclosebtn() {
        try {
            let ele = await this.getFieldType(this.locButtonclosebtn);
            await ele.click();
            await this.waitPageProgressCompleted();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async clickButtonpgscalllogsave() {
        try {
            let ele = await this.getFieldType(this.locButtonpgscalllogsave);
            await ele.click();
            await this.waitPageProgressCompleted();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async clickButtonpgscalllogcancel() {
        try {
            let ele = await this.getFieldType(this.locButtonpgscalllogcancel);
            await ele.click();
            await this.waitPageProgressCompleted();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }


}



