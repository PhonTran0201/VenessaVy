import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { ApplicationFormPaymentInterface } from "../../../../../interfaces/guarantee/application/application-forms/ApplicationFormPaymentInterface";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";


export class ApplicationFormPayment implements ApplicationFormPaymentInterface {
    constructor(protected driverService: SeleniumWebDriverService) { }

    //#region Xpaths on PAYMENT
    // 1. Guarantee fee section

    protected txtGuaranteeFeeGuarantee = By.xpath("//*[contains(local-name(),'form')]//input[@name='Phase1GuaranteeFeeTag']");
    protected lblGuaranteeFeeGuarantee = By.xpath("//*[contains(local-name(),'form')]//input[@name='Phase1GuaranteeFeeTag']//preceding-sibling::p");
    protected lblPremiumRateGuarantee = By.xpath("//*[contains(local-name(),'form')]//div[./input[@name='GuaranteeProvisionRateTag']]/p");
    protected cmbPaymentMethodGuarantee = By.xpath("//*[contains(local-name(),'form')]//select[@name='GuaranteePaymentMethodTag']");
    protected lblCommissionGuarantee = By.xpath("//*[contains(local-name(),'form')]//div[./input[@name='Phase1CommissionAmountTag']]/p");
    protected lblCommissionRateGuarantee = By.xpath("//*[contains(local-name(),'form')]//div[./input[@name='GuaranteeCommissionRateTag']]/p");

    // 2. Other fee section
    protected txtEstablishmentFeeOther = By.xpath("//*[contains(local-name(),'form')]//input[@name='EstablishmentFeeTag']");
    protected btnCalculatePriceOther = By.xpath("//*[contains(local-name(),'form')]//button[@name='GetPriceBtn']");
    protected btnResetOther = By.xpath("//*[contains(local-name(),'form')]//button[@name='ResetPriceBtn']");


    //Two phase
    protected txtGuaranteeFeeGuaranteePhase2 = By.xpath("//*[contains(local-name(),'form')]//input[@name='Phase2GuaranteeFeeTag']");
    protected lblGuaranteeFeeGuaranteePhase2 = By.xpath("//*[contains(local-name(),'form')]//input[@name='Phase2GuaranteeFeeTag']//preceding-sibling::p");
    protected lblTotalGuaranteeFeeGuarantee = By.xpath("//*[contains(local-name(),'form')]//input[@name='TotalGuaranteeFeeTag']//preceding-sibling::p");

    protected lblCommissionGuaranteePhase2 = By.xpath("//*[contains(local-name(),'form')]//input[@name='Phase2CommissionAmountTag']//preceding-sibling::p");
    protected lblTotalCommissionGuarantee = By.xpath("//*[contains(local-name(),'form')]//input[@name='TotalCommissionAmountTag']//preceding-sibling::p");
    protected lblAgentCommissionGuarantee = By.xpath("//*[contains(local-name(),'form')]//input[@name='AgentCommissionTag']//preceding-sibling::p");

    protected txtEstablishmentFeeOtherFee = By.xpath("//*[contains(local-name(),'form')]//input[@name='EstablishmentFeeTag']");
    //#endregion

    //#region Methods Input values
    // 1. Guarantee fee section
    // public async inputGuaranteeFeeGuarantee(GuaranteeFee: string) {
    //     try {
    //         await this.driverService.waitUntilElementLoaded(this.txtGuaranteeFeeGuarantee);
    //         await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
    //         if (await this.driverService.canBeSetText(this.txtGuaranteeFeeGuarantee)) {
    //             await this.driverService.setText(this.txtGuaranteeFeeGuarantee, GuaranteeFee);
    //         }

    //         return true;
    //     } catch (error) {
    //         console.log("inputGuaranteeFeeGuarantee");
    //         console.log(error);
    //         return false;
    //     }
    // }


    // 2. Other fee section
    public async inputEstablishmentFeeOther(EstablishmentFee: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtEstablishmentFeeOther);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.txtEstablishmentFeeOther, EstablishmentFee);
            return true;
        } catch (error) {
            console.log("inputEstablishmentFeeOther");
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region Methods validate values

    // 1. Guarantee fee section
    public async validateGuaranteeFeeGuarantee(ExpectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtGuaranteeFeeGuarantee);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let Value = await this.driverService.getAttributeValue(this.lblGuaranteeFeeGuarantee, "title");
            let ActualValue = parseFloat(Value).toFixed(2);
            return await this.driverService.validateRecord(
                `Validate field Guarantee Fee (NOK)`,
                [ActualValue, ExpectedValue, `Incorrect Guarantee Fee (NOK)!`]
            );
        } catch (error) {
            console.log("validateGuaranteeFeeGuarantee");
            console.log(error);
            return false;
        }
    }

    public async validatePremiumRateGuarantee(ExpectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblPremiumRateGuarantee);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualValue = await this.driverService.getAttributeValue(this.lblPremiumRateGuarantee,"title");
            return await this.driverService.validateRecord(
                `Validate field Premium Rate (%)`,
                [ActualValue, ExpectedValue, `Incorrect Premium Rate (%)!`]
            );
        } catch (error) {
            console.log("validatePremiumRateGuarantee");
            console.log(error);
            return false;
        }
    }

    public async validatePaymentMethodGuarantee(ExpectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbPaymentMethodGuarantee);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualValue = await this.driverService.getAttributeValue(this.cmbPaymentMethodGuarantee, "title");
            return await this.driverService.validateRecord(
                `Validate field Payment Method`,
                [ActualValue, ExpectedValue, `Incorrect Payment Method!`]
            );
        } catch (error) {
            console.log("validatePaymentMethodGuarantee");
            console.log(error);
            return false;
        }
    }

    public async validateCommissionGuarantee(ExpectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblCommissionGuarantee);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualValue = await this.driverService.getAttributeValue(this.lblCommissionGuarantee,"title");
            return await this.driverService.validateRecord(
                `Validate field Commission (NOK)`,
                [ActualValue, ExpectedValue, `Incorrect Commission (NOK)!`]
            );
        } catch (error) {
            console.log("validateCommissionGuarantee");
            console.log(error);
            return false;
        }
    }

    public async validateCommissionRateGuarantee(ExpectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblCommissionRateGuarantee);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualValue = await this.driverService.getAttributeValue(this.lblCommissionRateGuarantee,"title");
            return await this.driverService.validateRecord(
                `Validate field Commission Rate(%)`,
                [ActualValue, ExpectedValue, `Incorrect Commission Rate(%)!`]
            );
        } catch (error) {
            console.log("validateCommissionRateGuarantee");
            console.log(error);
            return false;
        }
    }

    //#region Two Phase
    public async validateGuaranteeFeeGuaranteePhase2(ExpectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblGuaranteeFeeGuaranteePhase2);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let Value = await this.driverService.getAttributeValue(this.lblGuaranteeFeeGuaranteePhase2, "title");
            let ActualValue = parseFloat(Value).toFixed(2);
            return await this.driverService.validateRecord(
                `Validate field Guarantee Fee Phase 2 (NOK)`,
                [ActualValue, ExpectedValue, `Incorrect Guarantee Fee Phase 2 (NOK)!`]
            );
        } catch (error) {
            console.log("validateGuaranteeFeeGuaranteePhase2");
            console.log(error);
            return false;
        }
    }

    public async validateTotalGuaranteeFeeGuarantee(ExpectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblTotalGuaranteeFeeGuarantee);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let Value = await this.driverService.getAttributeValue(this.lblTotalGuaranteeFeeGuarantee,"title");
            let ActualValue = parseFloat(Value).toFixed(2);
            return await this.driverService.validateRecord(
                `Validate field Total Guarantee Fee (NOK)`,
                [ActualValue, ExpectedValue, `Incorrect Total Guarantee Fee (NOK)!`]
            );
        } catch (error) {
            console.log("validateTotalGuaranteeFeeGuarantee");
            console.log(error);
            return false;
        }
    }

    public async validateCommissionGuaranteePhase2(ExpectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblCommissionGuaranteePhase2);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let Value = await this.driverService.getAttributeValue(this.lblCommissionGuaranteePhase2, "title");
            let ActualValue = parseFloat(Value).toFixed(2);
            return await this.driverService.validateRecord(
                `Validate field Commission Phase2 (NOK)`,
                [ActualValue, ExpectedValue, `Incorrect Commission Phase2 (NOK)!`]
            );
        } catch (error) {
            console.log("validateCommissionGuaranteePhase2");
            console.log(error);
            return false;
        }
    }

    public async validateTotalCommissionGuarantee(ExpectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblTotalCommissionGuarantee);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let Value = await this.driverService.getAttributeValue(this.lblTotalCommissionGuarantee,"title");
            let ActualValue = parseFloat(Value).toFixed(2);
            return await this.driverService.validateRecord(
                `Validate field Total Commission  (NOK)`,
                [ActualValue, ExpectedValue, `Incorrect Total Commission  (NOK)!`]
            );
        } catch (error) {
            console.log("validateTotalCommissionGuarantee");
            console.log(error);
            return false;
        }
    }

    public async validateAgentCommissionGuarantee(ExpectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblAgentCommissionGuarantee);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let Value = await this.driverService.getAttributeValue(this.lblAgentCommissionGuarantee,"title");
            let ActualValue = parseFloat(Value).toFixed(2);
            return await this.driverService.validateRecord(
                `Validate field Agent Commission  (NOK)`,
                [ActualValue, ExpectedValue, `Incorrect Agent Commission  (NOK)!`]
            );
        } catch (error) {
            console.log("validateAgentCommissionGuarantee");
            console.log(error);
            return false;
        }
    }

    public async validateEstablishmentFeeOtherFee(ExpectedValue: string) {
        try {
          await this.driverService.waitUntilElementLoaded(this.txtEstablishmentFeeOtherFee);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
          let ActualValue = await this.driverService.getAttributeValue(this.txtEstablishmentFeeOtherFee, "value");
          return await this.driverService.validateRecord(
            `Validate field EstablishmentFee OtherFee`,
            [ActualValue, ExpectedValue, `Incorrect EstablishmentFee OtherFee!`]
          );
        } catch (error) {
          console.log("validateEstablishmentFeeOtherFee");
          console.log(error);
          return false;
        }
      }


    //#endregion

    //#endregion

    //#region Methods press Buttons
    public async pressCalculatePriceButtonOtherFee() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnCalculatePriceOther);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.click(this.btnCalculatePriceOther);
            return true;
        } catch (error) {
            console.log('pressCalculatePriceButtonOtherFee');
            console.log(error);
            return false;
        }
    }

    public async pressResetButtonOtherFee() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnResetOther);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.click(this.btnResetOther);
            return true;
        } catch (error) {
            console.log('pressResetButtonOtherFee');
            console.log(error);
            return false;
        }
    }
    //#endregion
}
