import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2, selectDropdownOption } from "../../../../../../../shared/functions";


export class AccountTabFrameAgreementProductForm {
  constructor(private driverService: SeleniumWebDriverService) { }

  //Elements for adding product
  private txtProductName = By.xpath("//app-customer-frame-agreement-product-form//div[./label[text()=' Product name ']]//input");
  private txtProductNameValue = By.xpath("//app-customer-frame-agreement-product-form//div[./label[text()=' Product name ']]//*[contains(@class,'ng-value-label')]");
  private txtPremiumRate = By.xpath("//app-customer-frame-agreement-product-form//div[./label[text()=' Premium Rate (%) ']]//input");
  private txtCommissionRate = By.xpath("//app-customer-frame-agreement-product-form//div[./label[text()=' Commission Rate (%) ']]//input");
  private cmbPaymentMethod = By.xpath("//app-customer-frame-agreement-product-form//div[./label[text()=' Payment method ']]//input");
  private cmbPaymentMethodValue = By.xpath("//app-customer-frame-agreement-product-form//div[./label[text()=' Payment method ']]//*[text() and contains(@class,'ng-value-label')]");
  private txtGuaranteeRate = By.xpath("//app-customer-frame-agreement-product-form//div[./label[text()=' Guarantee Rate (%) ']]//input");

  private txtFirstPhaseGuaranteeRate = By.xpath("//app-customer-frame-agreement-product-form//div[./label[text()=' First Phase Guarantee Rate (%) ']]//input");

  private txtSecondPhaseGuaranteeRate = By.xpath("//app-customer-frame-agreement-product-form//div[./label[text()=' Second Phase Guarantee Rate (%) ']]//input");

  private txtEstablishmentFee = By.xpath("//app-customer-frame-agreement-product-form//div[./label[text()=' Establishment Fee ']]//input");
  private txtAmendmentFee = By.xpath("//app-customer-frame-agreement-product-form//div[./label[text()=' Amendment Fee ']]//input");


  //#region Input data to Product form
  public async inputPremiumRateOnProductForm(PremiumRate: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtPremiumRate);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.setText(this.txtPremiumRate, PremiumRate);

      return true;
    } catch (error) {
      console.log('inputTotalLimitExposureOnFrameAgreementForm');
      console.log(error);
      return false;
    }
  }

  public async inputCommissionRateOnProductForm(CommissionRate: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtCommissionRate);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtCommissionRate, CommissionRate);

      return true;
    } catch (error) {
      console.log('inputCommissionRateOnProductForm');
      console.log(error);
      return false;
    }
  }

  public async inputPaymentMethodOnProductForm(PaymentMethod: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbPaymentMethod);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.cmbPaymentMethod, PaymentMethod);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      await selectDropdownOption(PaymentMethod, "", this.driverService);

      return true;
    } catch (error) {
      console.log('inputPaymentMethodOnProductForm');
      console.log(error);
      return false;
    }
  }

  public async inputGuaranteeRateOnProductForm(GuaranteeRate: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtGuaranteeRate);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtGuaranteeRate, GuaranteeRate);

      return true;
    } catch (error) {
      console.log('inputGuaranteeRateOnProductForm');
      console.log(error);
      return false;
    }
  }

  public async inputFirstPhaseGuaranteeRateOnProductForm(FirstPhaseGuaranteeRate: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtFirstPhaseGuaranteeRate);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtFirstPhaseGuaranteeRate, FirstPhaseGuaranteeRate);

      return true;
    } catch (error) {
      console.log('inputFirstPhaseGuaranteeRateOnProductForm');
      console.log(error);
      return false;
    }
  }

  public async inputSecondPhaseGuaranteeRateOnProductForm(SecondPhaseGuaranteeRate: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtSecondPhaseGuaranteeRate);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtSecondPhaseGuaranteeRate, SecondPhaseGuaranteeRate);

      return true;
    } catch (error) {
      console.log('inputSecondPhaseGuaranteeRateOnProductForm');
      console.log(error);
      return false;
    }
  }

  public async inputEstablishmentFeeOnProductForm(EstablishmentFee: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtEstablishmentFee);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtEstablishmentFee, EstablishmentFee);

      return true;
    } catch (error) {
      console.log('inputEstablishmentFeeOnProductForm');
      console.log(error);
      return false;
    }
  }

  public async inputAmendmentFeeOnProductForm(AmendmentFee: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtAmendmentFee);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtAmendmentFee, AmendmentFee);

      return true;
    } catch (error) {
      console.log('inputAmendmentFeeOnProductForm');
      console.log(error);
      return false;
    }
  }
  //#endregion
  //#region Validate values on Product form
  public async validateProductNameOnProductForm(expectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtProductName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      const acctualValue = await this.driverService.getText(this.txtProductNameValue);
      return await this.driverService.validateRecord("Validate ProductName",
        [acctualValue, expectedValue, "Incorrect ProductName"]
      );
    } catch (error) {
      console.log('validateProductNameOnProductForm');
      console.log(error);
      return false;
    }
  }

  public async validatePremiumRateOnProductForm(expectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtPremiumRate);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const acctualValue = await this.driverService.getAttributeValue(this.txtPremiumRate, 'value');
      return await this.driverService.validateRecord("Validate PremiumRate",
        [acctualValue, expectedValue, "Incorrect PremiumRate"]
      );
    } catch (error) {
      console.log('validatePremiumRateOnProductForm');
      console.log(error);
      return false;
    }
  }
  public async validateCommissionRateOnProductForm(expectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtCommissionRate);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const acctualValue = await this.driverService.getAttributeValue(this.txtCommissionRate, 'value');
      return await this.driverService.validateRecord("Validate CommissionRate",
        [acctualValue, expectedValue, "Incorrect CommissionRate"]
      );
    } catch (error) {
      console.log('validateCommissionRateOnProductForm');
      console.log(error);
      return false;
    }
  }
  public async validatePaymentMethodOnProductForm(expectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbPaymentMethodValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const acctualValue = await this.driverService.getText(this.cmbPaymentMethodValue);
      return await this.driverService.validateRecord("Validate PaymentMethod",
        [acctualValue, expectedValue, "Incorrect PaymentMethod"]
      );
    } catch (error) {
      console.log('validatePaymentMethodOnProductForm');
      console.log(error);
      return false;
    }
  }
  public async validateGuaranteeRateOnProductForm(expectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtGuaranteeRate);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const acctualValue = await this.driverService.getAttributeValue(this.txtGuaranteeRate, 'value');
      return await this.driverService.validateRecord("Validate GuaranteeRate",
        [acctualValue, expectedValue, "Incorrect GuaranteeRate"]
      );
    } catch (error) {
      console.log('validateGuaranteeRateOnProductForm');
      console.log(error);
      return false;
    }
  }
  public async validateFirstPhaseGuaranteeRateOnProductForm(expectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtFirstPhaseGuaranteeRate);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const acctualValue = await this.driverService.getAttributeValue(this.txtFirstPhaseGuaranteeRate, 'value');
      return await this.driverService.validateRecord("Validate FirstPhaseGuaranteeRate",
        [acctualValue, expectedValue, "Incorrect FirstPhaseGuaranteeRate"]
      );
    } catch (error) {
      console.log('validateFirstPhaseGuaranteeRateOnProductForm');
      console.log(error);
      return false;
    }
  }
  public async validateSecondPhaseGuaranteeRateOnProductForm(expectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtSecondPhaseGuaranteeRate);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const acctualValue = await this.driverService.getAttributeValue(this.txtSecondPhaseGuaranteeRate, 'value');
      return await this.driverService.validateRecord("Validate SecondPhaseGuaranteeRate",
        [acctualValue, expectedValue, "Incorrect SecondPhaseGuaranteeRate"]
      );
    } catch (error) {
      console.log('validateSecondPhaseGuaranteeRateOnProductForm');
      console.log(error);
      return false;
    }
  }
  public async validateEstablishmentFeeOnProductForm(expectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtEstablishmentFee);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const acctualValue = await this.driverService.getAttributeValue(this.txtEstablishmentFee, 'value');
      return await this.driverService.validateRecord("Validate EstablishmentFee",
        [acctualValue, expectedValue, "Incorrect EstablishmentFee"]
      );
    } catch (error) {
      console.log('validateEstablishmentFeeOnProductForm');
      console.log(error);
      return false;
    }
  }
  public async validateAmendmentFeeOnProductForm(expectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtAmendmentFee);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const acctualValue = await this.driverService.getAttributeValue(this.txtAmendmentFee, 'value');
      return await this.driverService.validateRecord("Validate AmendmentFee",
        [acctualValue, expectedValue, "Incorrect AmendmentFee"]
      );
    } catch (error) {
      console.log('validateAmendmentFeeOnProductForm');
      console.log(error);
      return false;
    }
  }
  //#endregion

}
