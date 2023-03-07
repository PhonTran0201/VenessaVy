import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";
import { ApplicationList } from "../../../../back-office-portal/guarantee/application/application-list/ApplicationList";

/**
 * Application List Customer Portal
 */
export class ApplicationListCP extends ApplicationList {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
  //#region Validate value
  public async validateApplicationsNameValueOnList(ExpectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
    try {
      let lblValue = By.xpath(`//app-application-list//tbody//tr[${positionRow}]//app-application-name-col/a`);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.waitUntilElementLoaded(lblValue);
      let ActualValue = await this.driverService.getText(lblValue);
      if (isUsedForSearch) {
        return ActualValue.toLowerCase().includes(ExpectedValue.toLowerCase());
      }
      return await this.driverService.validateRecord(`Validate Application Name`, [ActualValue, ExpectedValue, `Incorrect Application Name`]);
    } catch (error) {
      console.log(`validateApplicationsNameValueOnList`);
      console.log(error);
      return false;
    }
  }

  public async validateApplicationsPeriodValueOnList(ExpectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
    try {
      let lblValue = By.xpath(`//app-application-list//tbody//tr[${positionRow}]//app-application-name-col//p/*[@title]`);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.waitUntilElementLoaded(lblValue);
      let ActualValue = await this.driverService.getText(lblValue);
      if (isUsedForSearch) {
        return ActualValue.toLowerCase().includes(ExpectedValue.toLowerCase());
      }
      return await this.driverService.validateRecord(`Validate Application Period`, [ActualValue, ExpectedValue, `Incorrect Application Period`]);
    } catch (error) {
      console.log(`validateApplicationsPeriodValueOnList`);
      console.log(error);
      return false;
    }
  }

  public async validateFrameAgmtNoValueOnList(ExpectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
    try {
      let lblValue = By.xpath(`//app-application-list//tbody//tr[${positionRow}]//td[contains(@class,'number-col')]/span`);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.waitUntilElementLoaded(lblValue);
      let ActualValue = await this.driverService.getText(lblValue);
      if (isUsedForSearch) {
        return ActualValue.toLowerCase().includes(ExpectedValue.toLowerCase());
      }
      return await this.driverService.validateRecord(`Validate Frame Agmt No`, [ActualValue, ExpectedValue, `Incorrect Frame Agmt No`]);
    } catch (error) {
      console.log(`validateFrameAgmtNoValueOnList`);
      console.log(error);
      return false;
    }
  }

  public async validateDebtorValueOnList(ExpectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
    try {
      let lblValue = By.xpath(`//app-application-list//tbody//tr[${positionRow}]//td[contains(@class,'name-col')][1]/span`);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.waitUntilElementLoaded(lblValue);
      let ActualValue = await this.driverService.getText(lblValue);
      if (isUsedForSearch) {
        return ActualValue.toLowerCase().includes(ExpectedValue.toLowerCase());
      }
      return await this.driverService.validateRecord(`Validate Debtor`, [ActualValue, ExpectedValue, `Incorrect Debtor`]);
    } catch (error) {
      console.log(`validateDebtorValueOnList`);
      console.log(error);
      return false;
    }
  }

  public async validateProductValueOnList(ExpectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
    try {
      let lblValue = By.xpath(`//app-application-list//tbody//tr[${positionRow}]//app-application-product-col/div`);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.waitUntilElementLoaded(lblValue);
      let ActualValue = await this.driverService.getText(lblValue);
      if (isUsedForSearch) {
        return ActualValue.toLowerCase().includes(ExpectedValue.toLowerCase());
      }
      return await this.driverService.validateRecord(`Validate Product`, [ActualValue, ExpectedValue, `Incorrect Product`]);
    } catch (error) {
      console.log(`validateProductValueOnList`);
      console.log(error);
      return false;
    }
  }

  public async validateBenificiaryValueOnList(ExpectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
    try {
      let lblValue = By.xpath(`//app-application-list//tbody//tr[${positionRow}]//td[contains(@class,'name-col')][2]/span`);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.waitUntilElementLoaded(lblValue);
      let ActualValue = await this.driverService.getText(lblValue);
      if (isUsedForSearch) {
        return ActualValue.toLowerCase().includes(ExpectedValue.toLowerCase());
      }
      return await this.driverService.validateRecord(`Validate Beneficiary`, [ActualValue, ExpectedValue, `Incorrect Beneficiary`]);
    } catch (error) {
      console.log(`validateBenificiaryValueOnList`);
      console.log(error);
      return false;
    }
  }

  public async validateStatusValueOnList(ExpectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
    try {
      let lblValue = By.xpath(`//app-application-list//tbody//tr[${positionRow}]//app-application-name-col//div`);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.waitUntilElementLoaded(lblValue);
      let ActualValue = await this.driverService.getText(lblValue);
      if (isUsedForSearch) {
        return ActualValue.toLowerCase().includes(ExpectedValue.toLowerCase());
      }
      return await this.driverService.validateRecord(`Validate Status`, [ActualValue, ExpectedValue, `Incorrect Status`]);
    } catch (error) {
      console.log(`validateStatusValueOnList`);
      console.log(error);
      return false;
    }
  }

  //#endregion

  //#region Check attribute buttons
  public async isButtonSendDisabled(positionRow = 1) {
    try {
      const btnSendDisabled = By.xpath(`//app-application-list//tbody//tr[${positionRow}]//app-application-action-col/button[@title='Send' and @disabled]`)
      await this.driverService.waitUntilElementLoaded(btnSendDisabled);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      return await this.driverService.isExisted(btnSendDisabled);
    } catch (error) {
      console.log('isButtonSendDisabled');
      console.log(error);
      return false;
    }
  }
  //#endregion
  //#region Open Form
  public async openApplicationDetailByRow(positionRow: number) {
      try {
          const lblApplicationName = By.xpath(`//app-application-list//tbody//tr[${positionRow}]//app-application-name-col/a`);
          await this.driverService.waitUntilElementLoaded(lblApplicationName);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
          await this.driverService.pressEnter(lblApplicationName);
          return true;
      } catch (error) {
          console.log('openApplicationDetailByRow');
          console.log(error);
          return false;
      }
  }
  //#endregion

  //#region Get values
  public async getValueFrameAgmtNoOnList(positionRow: number = 1) {
    try {
      let lblValue = By.xpath(`//app-application-list//tbody//tr[${positionRow}]//td[contains(@class,'number-col')]/span`);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.waitUntilElementLoaded(lblValue);
      const ActualValue = await this.driverService.getText(lblValue);
      return ActualValue;
    } catch (error) {
      console.log(`getValueFrameAgmtNoOnList`);
      console.log(error);
      return "";
    }
  }

  public async getValueProductOnList(positionRow: number = 1) {
    try {
      let lblValue = By.xpath(`//app-application-list//tbody//tr[${positionRow}]//app-application-product-col/div`);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.waitUntilElementLoaded(lblValue);
      const ActualValue = await this.driverService.getText(lblValue);
      return ActualValue;
    } catch (error) {
      console.log(`getValueProductOnList`);
      console.log(error);
      return "";
    }
  }

  public async getValueApplicationNoOnList(positionRow: number = 1) {
    try {
      let lblValue = By.xpath(`//app-application-list//tbody//tr[${positionRow}]//app-application-name-col/a`);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.waitUntilElementLoaded(lblValue);
      const ActualValue = await this.driverService.getText(lblValue);
      return ActualValue;
    } catch (error) {
      console.log(`getValueApplicationNoOnList`);
      console.log(error);
      return "";
    }
  }

  public async validateApplicationNoOnApplicationList(ExpectedValue: string, positionRow: number = 1) {
    try {
      let lblValue = By.xpath(`//app-application-list//tbody//tr[${positionRow}]//td[1]//app-application-name-col//a`);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.waitUntilElementLoaded(lblValue);
      const ActualValue = await this.driverService.getText(lblValue);
      return await this.driverService.validateRecord("Validate Application No: ", [ActualValue, ExpectedValue, "Incorrect Application No!"]);
    } catch (error) {
      console.log(`validateApplicationNoOnApplicationList`);
      console.log(error);
      return false;
    }
    //#endregion
  }
}
