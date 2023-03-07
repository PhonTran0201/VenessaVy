// generate by MappingPage
import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";
import { logFailMessage, selectDropdownOption } from "../../../../../shared/functions";

export class RewardLogForm extends BasePage {
    locInputpgscusrewardformname: By = By.xpath(`//app-reward-add-points-form//input[contains(@id,'pgs-cus-reward-form-name')]`);
    locInputpgscusrewardformprogram: By = By.xpath(`//app-reward-add-points-form//input[contains(@id,'pgs-cus-reward-form-program')]`);
    locInputpgscusrewardformeventtype: By = By.xpath(`//app-reward-add-points-form//input[contains(@id,'pgs-cus-reward-form-event-type')]`);
    locInputpgscusrewardformtransactiontype: By = By.xpath(`//app-reward-add-points-form//input[contains(@id,'pgs-cus-reward-form-transaction-type')]`);
    locInputpgscusrewardformpoints: By = By.xpath(`//app-reward-add-points-form//input[contains(@id,'pgs-cus-reward-form-points')]`);
    locTextareapgscusrewardformcomment: By = By.xpath(`//app-reward-add-points-form//textarea[contains(@id,'pgs-cus-reward-form-comment')]`);
    locNgselectEntername: By = By.xpath(`//app-reward-add-points-form//ng-select[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"enter name")]`);
    locNgselectSelecteventtype: By = By.xpath(`//app-reward-add-points-form//ng-select[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"select event type")]`);
    locNgselectSelecttransactiontype: By = By.xpath(`//app-reward-add-points-form//ng-select[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"select transaction type")]`);
    locButtonclosebtn: By = By.xpath(`//app-reward-add-points-form//button[contains(@id,'close-btn')]`);
    locButtonpgsrewardlogsavebtn: By = By.xpath(`//app-reward-add-points-form//button[contains(@id,'pgs-reward-log-save-btn')]`);
    locButtonpgsrewardlogcancelbtn: By = By.xpath(`//app-reward-add-points-form//button[contains(@id,'pgs-reward-log-cancel-btn')]`);
    locLabelCustomerName: By = By.xpath(`//app-reward-add-points-form//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"customer name *")]`);
    locLabelProgram: By = By.xpath(`//app-reward-add-points-form//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"program *")]`);
    locLabelEventType: By = By.xpath(`//app-reward-add-points-form//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"event type *")]`);
    locLabelTransactionType: By = By.xpath(`//app-reward-add-points-form//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"transaction type *")]`);
    locLabelPoints: By = By.xpath(`//app-reward-add-points-form//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"points *")]`);
    locLabelComment: By = By.xpath(`//app-reward-add-points-form//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"comment *")]`);
    lblCustomerNameDisabled: By = By.xpath(`//div[./label[@for='pgs-cus-reward-form-name']]//ng-select[contains(@class,'ng-select-disabled')]//span[contains(@class,'ng-value-label')]`);


    async setInputpgscusrewardformname(value) {
        try {
            let ele = await this.getFieldType(this.locInputpgscusrewardformname);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputpgscusrewardformprogram(value) {
        try {
            let ele = await this.getFieldType(this.locInputpgscusrewardformprogram);
            await ele.setValue(value);
            await selectDropdownOption(value, "", this.driverService);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputpgscusrewardformeventtype(value) {
        try {
            let ele = await this.getFieldType(this.locInputpgscusrewardformeventtype);
            await ele.setValue(value);
            await selectDropdownOption(value, "", this.driverService);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputpgscusrewardformtransactiontype(value) {
        try {
            let ele = await this.getFieldType(this.locInputpgscusrewardformtransactiontype);
            await ele.setValue(value);
            await selectDropdownOption(value, "", this.driverService);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputpgscusrewardformpoints(value) {
        try {
            let ele = await this.getFieldType(this.locInputpgscusrewardformpoints);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setTextareapgscusrewardformcomment(value) {
        try {
            let ele = await this.getFieldType(this.locTextareapgscusrewardformcomment);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setNgselectEntername(value) {
        try {
            let ele = await this.getFieldType(this.locNgselectEntername);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setNgselectSelecteventtype(value) {
        try {
            let ele = await this.getFieldType(this.locNgselectSelecteventtype);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setNgselectSelecttransactiontype(value) {
        try {
            let ele = await this.getFieldType(this.locNgselectSelecttransactiontype);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

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

    async clickButtonpgsrewardlogsavebtn() {
        try {
            let ele = await this.getFieldType(this.locButtonpgsrewardlogsavebtn);
            await ele.click();
            await this.waitPageProgressCompleted();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async clickButtonpgsrewardlogcancelbtn() {
        try {
            let ele = await this.getFieldType(this.locButtonpgsrewardlogcancelbtn);
            await ele.click();
            await this.waitPageProgressCompleted();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    public async validateCustomerName(CustomerName: string, NIN: string = "") {
        try {
            let ele = await this.getFieldType(this.lblCustomerNameDisabled);
            let actualValue = await ele.getValue();
            let expectedValue = NIN ? CustomerName + " - " + NIN : CustomerName;
            return await this.driverService.validateRecord("Validate Customer Name", [actualValue, expectedValue, "Incorrect Value!"]);
        } catch (error) {
            console.log(`validateCustomerName`);
            console.log(error);
            return false;
        }
    }

    public async inputRewardLogForm(
        CustomerName: string,
        NIN: string = "",
        ProgramName: string,
        EventType: string,
        TransactionType: string,
        Points: string,
        Comment: string,
    ) {
        try {
            if (await this.driverService.isExisted(this.lblCustomerNameDisabled)) {
                if (!await this.validateCustomerName(CustomerName, NIN)) {
                    logFailMessage(`Validate Customer Name on form failed!`);
                }
            } else {
                let value = NIN ? CustomerName + " - " + NIN : CustomerName;
                await this.setInputpgscusrewardformname(value);
            }
            await this.setInputpgscusrewardformprogram(ProgramName);
            await this.setInputpgscusrewardformeventtype(EventType);
            await this.setInputpgscusrewardformtransactiontype(TransactionType);
            await this.setInputpgscusrewardformpoints(Points);
            await this.setTextareapgscusrewardformcomment(Comment)
            return true;
        } catch (error) {
            console.log(`inputRewardLogForm`);
            console.log(error);
            return false;
        }

    }

}