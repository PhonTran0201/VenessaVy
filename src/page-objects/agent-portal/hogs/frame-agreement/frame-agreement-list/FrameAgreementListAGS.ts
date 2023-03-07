import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";
import { FrameAgreementListCP } from "../../../../customer-portal/general/frame-agreement/frame-agreement-list/FrameAgreementListCP";

export class FrameAgreementListAGS extends FrameAgreementListCP{
  constructor(protected driverService: SeleniumWebDriverService) {
    super(driverService);}

    protected lblFrameAgreementNo = By.xpath("//app-customer-agreements/div/div[1]//h4");

    public async validateFrameAgmtNoOnFrameAgreementList(expectedValue: string, positionRow = 1) {
      try {
        await this.driverService.waitUntilElementLoaded(this.lblFrameAgreementNo);
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
  
        const lblActualValue = By.xpath(`//app-customer-agreements/div/div[${positionRow}]//h4`);
        let acctualValue = await this.driverService.getText(lblActualValue);
        if(acctualValue.includes(expectedValue)){
          acctualValue = expectedValue;
        }
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
  
        const lblActualValue = By.xpath(`//app-customer-agreements/div/div[${positionRow}]//div[./label[text()='Period']]//b`);
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
  
    public async validateLimitExposureNoOnFrameAgreementList(expectedValue: string, positionRow = 1) {
      try {
        await this.driverService.waitUntilElementLoaded(this.lblFrameAgreementNo);
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
  
        const lblActualValue = By.xpath(`//app-customer-agreements/div/div[${positionRow}]//div[./label[text()='Limit exposure']]//b`);
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
  
        const lblActualValue = By.xpath(`//app-customer-agreements/div/div[${positionRow}]//div[./label[text()='Used']]//b`);
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
  
        const lblActualValue = By.xpath(`//app-customer-agreements/div/div[${positionRow}]//div[./label[text()='Remaining']]//b`);
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
    
    public async validateStatusOnFrameAgreementList(expectedValue: string, positionRow = 1) {
      try {
        await this.driverService.waitUntilElementLoaded(this.lblFrameAgreementNo);
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
  
        const lblActualValue = By.xpath(`//app-customer-agreements/div/div[${positionRow}]//div[./label[text()='Status']]//b`);
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
  
    
    
  
    public async openCreateApplicationOptionsFormByRow(positionRow: number = 1) {
      try {
        const btnCreateApplication = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'mb-5')][${positionRow}]//button[contains(text(),'Create application') and not(@disabled)]`);
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

}
