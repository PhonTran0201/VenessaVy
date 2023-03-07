import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { FrameAgreementListInterface } from "../../../../../interfaces/guarantee/frame-agreement/FrameAgreementListInterface";
import { waitUntilHorizontalProgressBarLoaded_v2, logInfoMessage, logWarningMessage } from "../../../../../shared/functions";
import { SystemLanguageIndex as sli } from "../../../../../shared/system-language-index/SystemLanguageIndex";
import { currencyToNumber } from "../../../../../shared/tenant-setting/tenant-setting";
export class FrameAgreementListCP implements FrameAgreementListInterface{
  constructor(protected driverService: SeleniumWebDriverService) { }

  protected lblFrameAgreementNo = By.xpath("//app-agreement-list//article//h3/a");
  //#region Methods to validate Frame agreement list
  public async validateFrameAgmtNoOnFrameAgreementList(expectedValue: string, positionRow = 1) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblFrameAgreementNo);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);

      const lblActualValue = By.xpath(`//app-agreement-list//article[${positionRow}]//h3/a`);
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

      const lblActualValue = By.xpath(`//app-agreement-list//article[${positionRow}]//div[./label[text()='Period']]//b`);
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
    return true;
  }

  public async validateLimitExposureNoOnFrameAgreementList(expectedValue: string, positionRow = 1) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblFrameAgreementNo);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);

      const lblActualValue = By.xpath(`//app-agreement-list//article[${positionRow}]//div[./label[text()='Limit exposure']]//b`);
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

      const lblActualValue = By.xpath(`//app-agreement-list//article[${positionRow}]//div[./label[text()='Used']]//b`);
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

      const lblActualValue = By.xpath(`//app-agreement-list//article[${positionRow}]//div[./label[text()='Remaining']]//b`);
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
    return true;
  }
  public async validateStatusOnFrameAgreementList(expectedValue: string, positionRow = 1) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblFrameAgreementNo);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);

      const lblActualValue = By.xpath(`//app-agreement-list//article[${positionRow}]//div[./label[text()='Status']]//b`);
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
   return true;
  }

  public async validateCreatedApplicationButton(expectedValue: string, positionRow: number = 1) {
    try {
      let BtnNTS;
      logInfoMessage("Validate status Created application button ...");
      if (expectedValue.localeCompare("NTS") === 0) {
        BtnNTS = [By.xpath(`//app-agreement-list//article[${positionRow}]//button[@title='Create application' and (@disabled)]`)][sli.getValue()];
      }else{
        BtnNTS = [By.xpath(`//app-agreement-list//article[${positionRow}]//button[@title='Create application' and not(@disabled)]`)][sli.getValue()];
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
    try {
      await this.driverService.waitUntilElementLoaded(this.lblFrameAgreementNo);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      return await this.driverService.getText(this.lblFrameAgreementNo);
    } catch (error) {
      console.log('getFrameAgreementNo');
      console.log(error);
      return "";
    }
  }

  public async openFrameAgreementDetails(selectedFrameAgreement: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblFrameAgreementNo);
      for (let i = 1; i <= 30; i++) {
        let lblFrameAgreementNo = By.xpath(`//app-agreement-list//article[${i}]//h3/a`);
        if (await this.driverService.isExisted(lblFrameAgreementNo)) {
          let nameFrameAgreement = await this.driverService.getText(lblFrameAgreementNo);
          if (nameFrameAgreement.localeCompare(selectedFrameAgreement) === 0) {
            await this.driverService.click(lblFrameAgreementNo);
            return true;
          }
        }
      }
      logWarningMessage(`Can't find frame agreement with name \"${selectedFrameAgreement}\" into Frame Agreement List`);
      return false;
    } catch (error) {
      console.log(`openFrameAgreementDetails`);
      console.log(error);
      return false;
    }
  }

  public async openFrameAgreementDetailsByRow(positionRow: number = 1) {
    try {
      const lblFrameAgmtNo = By.xpath(`//app-agreement-list//article[${positionRow}]//h3/a`);
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
      const btnCreateApplication = [By.xpath(`//app-agreement-list//article[${positionRow}]//button[@title='Create application' and not(@disabled)]`)][sli.getValue()];
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
      const lblFrameAgreementNo = By.xpath(`//app-agreement-list//article[${positionRow}]//h3/a`);
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
      const lblPeriod = By.xpath(`//app-agreement-list//article[${positionRow}]//div[./label[text()='Period']]//b`);
      return await this.driverService.getText(lblPeriod);
    } catch (error) {
      console.log('getPeriodByRow');
      console.log(error);
      return "";
    }
  }

  public async getNameByRow(positionRow = 1){
    return "";
  }

  public async getLimitExposureByRow(positionRow = 1){
    try {
      await this.driverService.waitUntilElementLoaded(this.lblFrameAgreementNo);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const lblLimitExposure = By.xpath(`//app-agreement-list//article[${positionRow}]//div[./label[text()='Limit exposure']]//b`);
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
      const lblCapacity = By.xpath(`//app-agreement-list//article[${positionRow}]//div[./label[text()='Used']]//b`);
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
      const lblRemainingCapacity = By.xpath(`//app-agreement-list//article[${positionRow}]//div[./label[text()='Remaining']]//b`);
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
      const lblStatus = By.xpath(`//app-agreement-list//article[${positionRow}]//div[./label[text()='Status']]//b`);
      return await this.driverService.getText(lblStatus);
    } catch (error) {
      console.log('getStatusByRow');
      console.log(error);
      return "";
    }
  }
  //#endregion
}
