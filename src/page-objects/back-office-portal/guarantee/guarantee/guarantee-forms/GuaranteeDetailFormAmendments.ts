import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";
import { GuaranteeDetailFormOriginalGuarantee } from "./GuaranteeDetailFormOriginalGurantee";

export class GuaranteeDetailFormAmendments extends GuaranteeDetailFormOriginalGuarantee {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }


  public async navigiateToAmendmentsTabInGuaranteeForm() {
    try {
      let lblValue = By.xpath(`//app-guarantee-form//ul[@role='tablist']//a[text()='Amendments']`);
      await this.driverService.waitUntilElementLoaded(lblValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 2000);
      await this.driverService.click(lblValue);
      return true;
    } catch (error) {
      console.log("navigiateToAmendmentsTabInGuaranteeForm");
      console.log(error);
      return false;
    }
  }

  //#region  Validate value Amendments History column
  public async validateValueGuaranteeVersionOnAmendmentHistory(ExpectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
    try {
      let lblActualValue = By.xpath(`//app-guarantee-form//div[./h5[text()='Amendments history']]//ul[${positionRow}]//h5/span`);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      let ActualValue = await this.driverService.getText(lblActualValue);
      if (isUsedForSearch) {
        return ActualValue.toLowerCase().includes(ExpectedValue.toLowerCase());
      }
      return await this.driverService.validateRecord(`Validate Guarantee Version`, [ActualValue, ExpectedValue, `Incorrect Guarantee Version`]);
    } catch (error) {
      console.log(`validateValueGuaranteeVersionOnAmendmentHistory`);
      console.log(error);
      return false;
    }
  }

  public async validateValueCreatedDateOnAmendmentHistory(ExpectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
    try {
      let lblActualValue = By.xpath(`//app-guarantee-form//div[./h5[text()='Amendments history']]//ul[${positionRow}]//small/span`);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      let ActualValue = await this.driverService.getText(lblActualValue);
      if (isUsedForSearch) {
        return ActualValue.toLowerCase().includes(ExpectedValue.toLowerCase());
      }
      return await this.driverService.validateRecord(`Validate Created Date`, [ActualValue, ExpectedValue, `Incorrect Created Date`]);
    } catch (error) {
      console.log(`validateValueCreatedDateOnAmendmentHistory`);
      console.log(error);
      return false;
    }
  }

  public async validateValueTagNameOnAmendmentHistory(ExpectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
    try {
      let lblActualValue = By.xpath(`//app-guarantee-form//div[./h5[text()='Amendments history']]//ul[${positionRow}]//div[contains(@class,'label-title')]`);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      let ActualValue = await this.driverService.getText(lblActualValue);
      if (isUsedForSearch) {
        return ActualValue.toLowerCase().includes(ExpectedValue.toLowerCase());
      }
      return await this.driverService.validateRecord(`Validate Tag Name`, [ActualValue, ExpectedValue, `Incorrect Tag Name`]);
    } catch (error) {
      console.log(`validateValueTagNameOnAmendmentHistory`);
      console.log(error);
      return false;
    }
  }

  public async validateValueAmendmentFeeOnAmendmentHistory(ExpectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
    try {
      let lblActualValue = By.xpath(`//app-guarantee-form//div[./h5[text()='Amendments history']]//ul[${positionRow}]//h5/small/span[2]`);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      let ActualValue = await this.driverService.getText(lblActualValue);
      if (isUsedForSearch) {
        return ActualValue.toLowerCase().includes(ExpectedValue.toLowerCase());
      }
      return await this.driverService.validateRecord(`Validate AmendmentFee`, [ActualValue, ExpectedValue, `Incorrect AmendmentFee`]);
    } catch (error) {
      console.log(`validateValueAmendmentFeeOnAmendmentHistory`);
      console.log(error);
      return false;
    }
  }
  //#endregion
}