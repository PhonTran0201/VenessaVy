import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2, waitUntilHorizontalProgressBarLoaded, logInfoMessage, reloadTable, logWarningMessage } from "../../../../../../../shared/functions";
import { currencyToNumber } from "../../../../../../../shared/tenant-setting/tenant-setting";


export class AccountTabFrameAgreementList {
  constructor(protected driverService: SeleniumWebDriverService) { }

  //#region Elements on table at Frame agreement list
  protected btnCreateApplication = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-frame-agreement-list//table//tr[1]//button[@id='pgs-gua-frame-act-create-app-btn']`);
  protected btnTerminate = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-frame-agreement-list//table//tr[1]//button[@id='pgs-gua-frame-act-terminate-btn']`);

  protected lblFrameAgreementNo = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-frame-agreement-list//tr[1]//app-general-name-column`);
  protected lblPeriod = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-frame-agreement-list//table//tr[1]//td[.//span[text()='Period']]//small//*[@title]`);
  protected lblName = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-frame-agreement-list//table//tr[1]//td[3]//*[self::*[text()]]`);
  protected lblTotalLimitExposure = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-frame-agreement-list//table//tr[1]//td[4]//*[self::*[text()]]`);
  protected lblCapacity = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-frame-agreement-list//table//tr[1]//td[5]//*[self::*[text()]]`);
  protected lblRemainingCapacity = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-frame-agreement-list//table//tr[1]//td[6]//*[self::*[text()]]`);
  protected lblType = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-frame-agreement-list//table//tr[1]//app-agreement-type-col`);
  protected lblStatus = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-frame-agreement-list//table//tr[1]//app-guarantee-status-col//*[self::*[text()]]`);
  //#endregion


  public async selectFrameAgreementNTSType(type: string) {
    try {
      let btnNTSType = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-frame-agreement-list//button[contains(@id,'nts-btn') and text()=' ${type} ']`);
      await this.driverService.waitUntilElementLoaded(btnNTSType);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.click(btnNTSType);
      await waitUntilHorizontalProgressBarLoaded(this.driverService);
      return true;
    } catch (error) {
      console.log(`selectFrameAgreementNTSType`);
      console.log(error);
      return false;
    }
  }

  public async reloadFrameAgreementList() {
    try {
      logInfoMessage("Waiting for 7s...");
      await this.driverService.waitForSeconds(7000);
      await reloadTable(this.driverService);
    } catch (error) {
      console.log(error);
    }
  }

  //#region Methods to validate Frame agreement list
  public async validateFrameAgmtNoOnFrameAgreementList(expectedValue: string, positionRow = 1) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblFrameAgreementNo);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);

      const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-frame-agreement-list//tr[${positionRow}]//app-general-name-column`);
      const acctualValue = await this.driverService.getText(lblActualValue);
      return await this.driverService.validateRecord("Validate FrameAgmtNo",
        [acctualValue, expectedValue, "Incorrect FrameAgmtNo"]
      );
    } catch (error) {
      console.log('validateFrameAgmtNoOnFrameAgreementList');
      console.log(error);
      return false;
    }
  }
  public async validatePeriodOnFrameAgreementList(expectedValue: string, positionRow = 1) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblFrameAgreementNo);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);

      const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-frame-agreement-list//table//tr[${positionRow}]//td[2]//span[@title]`);
      const acctualValue = await this.driverService.getText(lblActualValue);
      return await this.driverService.validateRecord("Validate Period",
        [acctualValue, expectedValue, "Incorrect Period"]
      );
    } catch (error) {
      console.log('validatePeriodOnFrameAgreementList');
      console.log(error);
      return false;
    }
  }
  public async validateNameNoOnFrameAgreementList(expectedValue: string, positionRow = 1) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblFrameAgreementNo);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);

      const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-frame-agreement-list//table//tr[${positionRow}]//td[3]//*[self::*[text()]]`);
      const acctualValue = await this.driverService.getText(lblActualValue);
      return await this.driverService.validateRecord("Validate Name",
        [acctualValue, expectedValue, "Incorrect Name"]
      );
    } catch (error) {
      console.log('validateNameNoOnFrameAgreementList');
      console.log(error);
      return false;
    }
  }
  public async validateLimitExposureNoOnFrameAgreementList(expectedValue: string, positionRow = 1) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblFrameAgreementNo);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);

      const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-frame-agreement-list//table//tr[${positionRow}]//td[4]//*[self::*[text()]]`);
      const acctualValue = await this.driverService.getText(lblActualValue);
      return await this.driverService.validateRecord("Validate LimitExposure",
        [acctualValue, expectedValue, "Incorrect LimitExposure"]
      );
    } catch (error) {
      console.log('validateLimitExposureNoOnFrameAgreementList');
      console.log(error);
      return false;
    }
  }
  public async validateCapacityOnFrameAgreementList(expectedValue: string, positionRow = 1) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblFrameAgreementNo);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);

      const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-frame-agreement-list//table//tr[${positionRow}]//td[5]//*[self::*[text()]]`);
      const acctualValue = await this.driverService.getText(lblActualValue);
      return await this.driverService.validateRecord("Validate Capacity",
        [acctualValue, expectedValue, "Incorrect Capacity"]
      );
    } catch (error) {
      console.log('validateCapacityOnFrameAgreementList');
      console.log(error);
      return false;
    }
  }
  public async validateRemainingCapacityOnFrameAgreementList(expectedValue: string, positionRow = 1) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblFrameAgreementNo);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);

      const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-frame-agreement-list//table//tr[${positionRow}]//td[6]//*[self::*[text()]]`);
      const acctualValue = await this.driverService.getText(lblActualValue);
      return await this.driverService.validateRecord("Validate RemainingCapacity",
        [acctualValue, expectedValue, "Incorrect RemainingCapacity"]
      );
    } catch (error) {
      console.log('validateRemainingCapacityOnFrameAgreementList');
      console.log(error);
      return false;
    }
  }
  public async validateTypeOnFrameAgreementList(expectedValue: string, positionRow = 1) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblFrameAgreementNo);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);

      const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-frame-agreement-list//table//tr[${positionRow}]//app-agreement-type-col`);
      const acctualValue = await this.driverService.getText(lblActualValue);
      return await this.driverService.validateRecord("Validate Type",
        [acctualValue, expectedValue, "Incorrect Type"]
      );
    } catch (error) {
      console.log('validateTypeOnFrameAgreementList');
      console.log(error);
      return false;
    }
  }
  public async validateStatusOnFrameAgreementList(expectedValue: string, positionRow = 1) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblFrameAgreementNo);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);

      const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-frame-agreement-list//table//tr[${positionRow}]//app-guarantee-status-col//*[self::*[text()]]`);
      const acctualValue = await this.driverService.getText(lblActualValue);
      return await this.driverService.validateRecord("Validate Status",
        [acctualValue, expectedValue, "Incorrect Status"]
      );
    } catch (error) {
      console.log('validateStatusOnFrameAgreementList');
      console.log(error);
      return false;
    }
  }
  //#endregion


  public async validateFrameAgreementNTSType(expectedValue: string, positionRow: number = 1) {
    try {
      let lblNTSType = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]//app-agreement-type-col`);
      await this.driverService.waitUntilElementLoaded(lblNTSType);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let actualValue = await this.driverService.getText(lblNTSType);
      return await this.driverService.validateRecord(`Validate FrameAgreementNTSType: `, [actualValue, expectedValue, `Incorrect FrameAgreementNTSType!`]);
    } catch (error) {
      console.log(`validateFrameAgreementNTSType`);
      console.log(error);
      return false;
    }
  }

  public async validateCreatedApplicationButton(expectedValue: string, positionRow: number = 1) {
    try {
      let BtnNTS;
      logInfoMessage("Validate status Created application button ...");
      if (expectedValue.localeCompare("NTS") === 0) {
        BtnNTS = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]//button[@id='pgs-gua-frame-act-create-app-btn' and @disabled]`);
      }else{
        BtnNTS = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]//button[@id='pgs-gua-frame-act-create-app-btn' and not(@disabled)]`);
      }
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      if(await this.driverService.isExisted(BtnNTS)){
        logInfoMessage("Test passed!");
        return true;
      }
      else{
        logWarningMessage("Test failed!");
        return false;
      } 
    } catch (error) {
      console.log(`validateCreatedApplicationButton`);
      console.log(error);
      return false;
    }
  }

  public async getFrameAgreementNo() {
    let lblFrameAgreementNo = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[1]//td[2]//a[@title]`);

    let actualFrameAgreementNo: string = "";
    await this.driverService.waitUntilElementLoaded(lblFrameAgreementNo);
    await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
    actualFrameAgreementNo = await (await this.driverService.findElement(lblFrameAgreementNo)).getText();

    return actualFrameAgreementNo;
  }

  public async openFrameAgreementDetails(selectedFrameAgreement: string) {
    try {
      await this.driverService.waitUntilElementLoaded(By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[1]//td[2]//a`));
      for (let i = 1; i <= 30; i++) {
        let lblFrameAgreementNo = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[1]//td[2]//a[${i}]`);
        if ((await this.driverService.isExisted(lblFrameAgreementNo)) === false) {
        } else {
          let nameFrameAgreement = await this.driverService.getText(lblFrameAgreementNo);
          //console.log(`JOLIE TEST", nameFrameAgreement);
          if (nameFrameAgreement.localeCompare(selectedFrameAgreement) === 0) {
            let detailFA = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[1]//td[2]//a[${i}]`);
            await this.driverService.click(detailFA);
            return true;
          }
        }
      }
      logWarningMessage(`Can't find frame agreement with name \"${selectedFrameAgreement}\" into Frame Agreement List`);
      return false;
    } catch (error) {
      console.log(`open frame agreement details`);
      console.log(error);
      return false;
    }
  }

  public async openFrameAgreementDetailsByRow(positionRow: number = 1) {
    try {
      const lblFrameAgmtNo = By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-general-name-column)[${positionRow}]`);
      await this.driverService.waitUntilElementLoaded(lblFrameAgmtNo);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.click(lblFrameAgmtNo);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      return true;
    } catch (error) {
      console.log('openFrameAgreementDetailsByRow');
      console.log(error);
      return false;
    }
  }

  public async openCreateApplicationOptionsFormByRow(positionRow: number = 1) {
    try {
      const btnCreateApplication = By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[@id='pgs-gua-frame-act-create-app-btn'])[${positionRow}]`);
      await this.driverService.waitUntilElementLoaded(btnCreateApplication);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.click(btnCreateApplication);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      return true;
    } catch (error) {
      console.log('openCreateApplicationOptionsFormByRow');
      console.log(error);
      return false;
    }
  }

  //#region Get value on list
  public async getFrameAgreementNoByRow(positionRow = 1){
    try {
      await this.driverService.waitUntilElementLoaded(this.lblFrameAgreementNo);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const lblFrameAgreementNo = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-frame-agreement-list//tr[${positionRow}]//app-general-name-column//a[text()]`);
      return await this.driverService.getText(lblFrameAgreementNo);
    } catch (error) {
      console.log('getFrameAgreementNoByRow');
      console.log(error);
      return "";
    }
  }

  public async getPeriodByRow(positionRow = 1){
    try {
      await this.driverService.waitUntilElementLoaded(this.lblFrameAgreementNo);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const lblPeriod = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-frame-agreement-list//table//tr[${positionRow}]//td[.//span[text()='Period']]//small//*[@title]`);
      return await this.driverService.getText(lblPeriod);
    } catch (error) {
      console.log('getPeriodByRow');
      console.log(error);
      return "";
    }
  }

  public async getNameByRow(positionRow = 1){
    try {
      await this.driverService.waitUntilElementLoaded(this.lblFrameAgreementNo);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const lblName = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-frame-agreement-list//table//tr[${positionRow}]//td[3]//*[self::*[text()]]`);
      return await this.driverService.getText(lblName);
    } catch (error) {
      console.log('getNameByRow');
      console.log(error);
      return "";
    }
  }

  public async getLimitExposureByRow(positionRow = 1){
    try {
      await this.driverService.waitUntilElementLoaded(this.lblFrameAgreementNo);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const lblLimitExposure = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-frame-agreement-list//table//tr[${positionRow}]//td[4]//*[self::*[text()]]`);
      return currencyToNumber(await this.driverService.getText(lblLimitExposure));
    } catch (error) {
      console.log('getLimitExposureByRow');
      console.log(error);
      return -1;
    }
  }

  public async getCapacityByRow(positionRow = 1){
    try {
      await this.driverService.waitUntilElementLoaded(this.lblFrameAgreementNo);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const lblCapacity = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-frame-agreement-list//table//tr[${positionRow}]//td[5]//*[self::*[text()]]`);
      return currencyToNumber(await this.driverService.getText(lblCapacity));
    } catch (error) {
      console.log('getCapacityByRow');
      console.log(error);
      return -1;
    }
  }

  public async getRemainingCapacityByRow(positionRow = 1){
    try {
      await this.driverService.waitUntilElementLoaded(this.lblFrameAgreementNo);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const lblRemainingCapacity = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-frame-agreement-list//table//tr[${positionRow}]//td[6]//*[self::*[text()]]`);
      return currencyToNumber(await this.driverService.getText(lblRemainingCapacity));
    } catch (error) {
      console.log('getRemainingCapacityByRow');
      console.log(error);
      return -1;
    }
  }

  public async getStatusByRow(positionRow = 1){
    try {
      await this.driverService.waitUntilElementLoaded(this.lblFrameAgreementNo);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const lblStatus = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-frame-agreement-list//table//tr[${positionRow}]//app-guarantee-status-col//*[text()]`);
      return await this.driverService.getText(lblStatus);
    } catch (error) {
      console.log('getStatusByRow');
      console.log(error);
      return "";
    }
  }
  //#endregion
}
