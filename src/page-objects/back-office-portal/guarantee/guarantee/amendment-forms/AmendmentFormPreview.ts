import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";
import { ApplicationFormPreview } from "../../application/application-forms/ApplicationFormPreview";


export class AmendmentFormPreview extends ApplicationFormPreview {
  constructor(protected driverService: SeleniumWebDriverService) {
    super(driverService);
  }
  protected lblAdditionalGuaranteeFee = By.xpath("//*[contains(local-name(),'form')]//div[./b[contains(text(),'Additional guarantee')]]//b[2]");
  protected lblAdditionalCommission = By.xpath("//*[contains(local-name(),'form')]//div[./b[text()='Additional commission']]//b[2]");
  protected lblAmendmentFee = By.xpath("//*[contains(local-name(),'form')]//div[./b[text()='Amendment fee']]//b[2]");

  //two phase
  protected lblAdditionalGuaranteeFeePhase1 = By.xpath("//*[contains(local-name(),'form')]//div[@if='!IsRenew']/div[1]//li[1]//span[2]");
  protected lblAdditionalGuaranteeFeePhase2 = By.xpath("//*[contains(local-name(),'form')]//div[@if='!IsRenew']/div[1]//li[2]//span[2]");
  protected lblAdditionalCommissionPhase1 = By.xpath("//*[contains(local-name(),'form')]//div[@if='!IsRenew']/div[2]//li[1]//span[2]");
  protected lblAdditionalCommissionPhase2 = By.xpath("//*[contains(local-name(),'form')]//div[@if='!IsRenew']/div[2]//li[2]//span[2]");



  public async validateAdditionalGuaranteeFee(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblAdditionalGuaranteeFee);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblAdditionalGuaranteeFee);
      return await this.driverService.validateRecord(
        `Validate field AdditionalGuaranteeFee`,
        [ActualValue, ExpectedValue, `Incorrect AdditionalGuaranteeFee!`]
      );
    } catch (error) {
      console.log("validateAdditionalGuaranteeFee");
      console.log(error);
      return false;
    }
  }

  public async validateAdditionalCommission(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblAdditionalCommission);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblAdditionalCommission);
      return await this.driverService.validateRecord(
        `Validate field AdditionalCommission`,
        [ActualValue, ExpectedValue, `Incorrect AdditionalCommission!`]
      );
    } catch (error) {
      console.log("validateAdditionalCommission");
      console.log(error);
      return false;
    }
  }
  public async validateAmendmentFee(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblAmendmentFee);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblAmendmentFee);
      return await this.driverService.validateRecord(
        `Validate field AmendmentFee`,
        [ActualValue, ExpectedValue, `Incorrect AmendmentFee!`]
      );
    } catch (error) {
      console.log("validateAmendmentFee");
      console.log(error);
      return false;
    }
  }

  //Two phase
  public async validateAdditionalGuaranteeFeePhase1(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblAdditionalGuaranteeFeePhase1);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblAdditionalGuaranteeFeePhase1);
      return await this.driverService.validateRecord(
        `Validate field AdditionalGuaranteeFeePhase1`,
        [ActualValue, ExpectedValue, `Incorrect AdditionalGuaranteeFeePhase1!`]
      );
    } catch (error) {
      console.log("validateAdditionalGuaranteeFeePhase1");
      console.log(error);
      return false;
    }
  }

  public async validateAdditionalGuaranteeFeePhase2(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblAdditionalGuaranteeFeePhase2);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblAdditionalGuaranteeFeePhase2);
      return await this.driverService.validateRecord(
        `Validate field AdditionalGuaranteeFeePhase2`,
        [ActualValue, ExpectedValue, `Incorrect AdditionalGuaranteeFeePhase2!`]
      );
    } catch (error) {
      console.log("validateAdditionalGuaranteeFeePhase2");
      console.log(error);
      return false;
    }
  }

  public async validateAdditionalCommissionPhase1(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblAdditionalCommissionPhase1);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblAdditionalCommissionPhase1);
      return await this.driverService.validateRecord(
        `Validate field AdditionalCommissionPhase1`,
        [ActualValue, ExpectedValue, `Incorrect AdditionalCommissionPhase1!`]
      );
    } catch (error) {
      console.log("validateAdditionalCommissionPhase1");
      console.log(error);
      return false;
    }
  }

  public async validateAdditionalCommissionPhase2(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblAdditionalCommissionPhase2);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblAdditionalCommissionPhase2);
      return await this.driverService.validateRecord(
        `Validate field AdditionalCommissionPhase2`,
        [ActualValue, ExpectedValue, `Incorrect AdditionalCommissionPhase2!`]
      );
    } catch (error) {
      console.log("validateAdditionalCommissionPhase2");
      console.log(error);
      return false;
    }
  }
}