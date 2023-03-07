import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";
import { getDefaultCurrency } from "../../../../../shared/tenant-setting/tenant-setting";
import { ApplicationFormPayment } from "../../application/application-forms/ApplicationFormPayment";




export class AmendmentFormPayment extends ApplicationFormPayment {
    constructor(driverService: SeleniumWebDriverService) {
        super(driverService);
    }

    protected txtAmendmentFeeOther = By.xpath("//*[contains(local-name(),'form')]//input[@name='AmendmentFeeTag']");
    protected txtAdditionalGuaranteeFeeGuarantee = By.xpath("//*[contains(local-name(),'form')]//input[@name='AdditionalPhase1GuaranteeFeeTag']/preceding-sibling::p");
    protected txtAdditionalCommissionGuarantee = By.xpath("//*[contains(local-name(),'form')]//input[@name='AdditionalPhase1CommissionAmountTag']//preceding-sibling::p");

    public async inputAmendmentFeeOther(AmendmentFee: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtAmendmentFeeOther);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.txtAmendmentFeeOther, AmendmentFee);
            return true;
        } catch (error) {
            console.log("inputAmendmentFeeOther");
            console.log(error);
            return false;
        }
    }

    public async validateAdditionalGuaranteeFeeGuarantee(ExpectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtAdditionalGuaranteeFeeGuarantee);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualValueText = await this.driverService.getAttributeValue(this.txtAdditionalGuaranteeFeeGuarantee, "title");
            let ActualValue = parseFloat(ActualValueText).toFixed(2);

            // if (ActualValue.toLowerCase().includes(ExpectedValue.toLowerCase())) {
            //     ActualValue = ExpectedValue;
            // }
            return await this.driverService.validateRecord(
                `Validate field Additional Guarantee Fee (${getDefaultCurrency()})`,
                [ActualValue, ExpectedValue, `Incorrect Additional Guarantee Fee (${getDefaultCurrency()})!`]
            );
        } catch (error) {
            console.log("validateAdditionalGuaranteeFeeGuarantee");
            console.log(error);
            return false;
        }
    }

    public async validateAdditionalComissionGuarantee(ExpectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtAdditionalCommissionGuarantee);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualValueText = await this.driverService.getAttributeValue(this.txtAdditionalCommissionGuarantee, "title");
            let ActualValue = parseFloat(ActualValueText).toFixed(2);
            // if (ActualValue.toLowerCase().includes(ExpectedValue.toLowerCase())) {
            //     ActualValue = ExpectedValue;
            // }
            return await this.driverService.validateRecord(
                `Validate field Additional Commission (${getDefaultCurrency()})`,
                [ActualValue, ExpectedValue, `Incorrect Additional Commission (${getDefaultCurrency()})!`]
            );
        } catch (error) {
            console.log("validateAdditionalComissionGuarantee");
            console.log(error);
            return false;
        }
    }

    public async getAdditionalGuaranteeFeeValue() {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtAdditionalGuaranteeFeeGuarantee);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualValue = await this.driverService.getAttributeValue(this.txtAdditionalGuaranteeFeeGuarantee, "title");
            return ActualValue;
        } catch (error) {
            console.log("getAdditionalGuaranteeFeeValue");
            console.log(error);
            return "";
        }
    }

    public async getAdditionalCommissionValue() {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtAdditionalCommissionGuarantee);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualValue = await this.driverService.getAttributeValue(this.txtAdditionalCommissionGuarantee, "title");
            return ActualValue;
        } catch (error) {
            console.log("getAdditionalCommissionValue");
            console.log(error);
            return "";
        }
    }


}