import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { AccountTabFrameAgreementForm } from "../../../../back-office-portal/guarantee/account/account-details/tabs/account-frame-agreements/AccountTabFrameAgreementForm";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";
import { SystemLanguageIndex as sli } from "../../../../../shared/system-language-index/SystemLanguageIndex";
export class FrameAgreementFormDetailCP extends AccountTabFrameAgreementForm {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
  //#region Elemments for Creating frame agreement
  protected txtName = [By.xpath("//app-agreement-form//div[./label[text()='Name']]/div")][sli.getValue()];
  protected dtpStartDate = [By.xpath("//app-agreement-form//div[./label[text()='Start date']]/div")][sli.getValue()];
  protected dtpEndDate = [By.xpath("//app-agreement-form//div[./label[text()='End date']]/div")][sli.getValue()];
  protected txtTotalLimitExposure = [By.xpath("//app-agreement-form//div[./label[text()='Limit exposure']]/div")][sli.getValue()];
  protected txtSecurity = [By.xpath("//app-agreement-form//div[./label[text()='Security']]/div")][sli.getValue()];
  //#endregion

  //#region Element for checking frame agreement details
  protected txtFrameAgreementNumber = [By.xpath("//app-agreement-form//div[./label[text()='Frame agreement no.']]/div")][sli.getValue()];
  protected txtUsed = [By.xpath("//app-agreement-form//div[./label[text()='Used']]/div")][sli.getValue()];
  protected txtRemainingCapacity = [By.xpath("//app-agreement-form//div[./label[text()='Remaining']]/div")][sli.getValue()];
  protected txtCurrency = [By.xpath("//app-agreement-form//div[./label[text()='Currency']]/div")][sli.getValue()];
  //#endregion


  //#region Validate values Details tab on FA form without Product list
  public async validateFrameAgreementNumber_FrameAgreementForm_DetailsTab(expectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtFrameAgreementNumber);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      const acctualValue = await this.driverService.getText(this.txtFrameAgreementNumber);
      return await this.driverService.validateRecord("Validate FrameAgreementNumber",
        [acctualValue, expectedValue, "Incorrect FrameAgreementNumber"]
      );
    } catch (error) {
      console.log('validateFrameAgreementNumber_FrameAgreementForm_DetailsTab');
      console.log(error);
      return false;
    }
  }
  public async validateName_FrameAgreementForm_DetailsTab(expectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtFrameAgreementNumber);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const acctualValue = await this.driverService.getText(this.txtName);
      return await this.driverService.validateRecord("Validate Name",
        [acctualValue, expectedValue, "Incorrect Name"]
      );
    } catch (error) {
      console.log('validateName_FrameAgreementForm_DetailsTab');
      console.log(error);
      return false;
    }
  }
  public async validateStartDate_FrameAgreementForm_DetailsTab(expectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtFrameAgreementNumber);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const acctualValue = await this.driverService.getText(this.dtpStartDate);
      return await this.driverService.validateRecord("Validate StartDate",
        [acctualValue, expectedValue, "Incorrect StartDate"]
      );
    } catch (error) {
      console.log('validateStartDate_FrameAgreementForm_DetailsTab');
      console.log(error);
      return false;
    }
  }
  public async validateEndDate_FrameAgreementForm_DetailsTab(expectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtFrameAgreementNumber);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const acctualValue = await this.driverService.getText(this.dtpEndDate);
      return await this.driverService.validateRecord("Validate EndDate",
        [acctualValue.trim(), expectedValue.trim(), "Incorrect EndDate"]
      );
    } catch (error) {
      console.log('validateEndDate_FrameAgreementForm_DetailsTab');
      console.log(error);
      return false;
    }
  }
  public async validateUsed_FrameAgreementForm_DetailsTab(expectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtFrameAgreementNumber);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const acctualValue = await this.driverService.getText(this.txtUsed);
      return await this.driverService.validateRecord("Validate Used",
        [acctualValue.trim(), expectedValue.trim(), "Incorrect Used"]
      );
    } catch (error) {
      console.log('validateUsed_FrameAgreementForm_DetailsTab');
      console.log(error);
      return false;
    }
  }
  public async validateRemainingCapacity_FrameAgreementForm_DetailsTab(expectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtFrameAgreementNumber);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const acctualValue = await this.driverService.getText(this.txtRemainingCapacity);
      return await this.driverService.validateRecord("Validate RemainingCapacity",
        [acctualValue.trim(), expectedValue.trim(), "Incorrect RemainingCapacity"]
      );
    } catch (error) {
      console.log('validateRemainingCapacity_FrameAgreementForm_DetailsTab');
      console.log(error);
      return false;
    }
  }
  public async validateTotalLimitExposure_FrameAgreementForm_DetailsTab(expectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtFrameAgreementNumber);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const acctualValue = await this.driverService.getText(this.txtTotalLimitExposure);
      return await this.driverService.validateRecord("Validate TotalLimitExposure",
        [acctualValue.trim(), expectedValue.trim(), "Incorrect TotalLimitExposure"]
      );
    } catch (error) {
      console.log('validateTotalLimitExposure_FrameAgreementForm_DetailsTab');
      console.log(error);
      return false;
    }
  }
  public async validateCurrency_FrameAgreementForm_DetailsTab(expectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtFrameAgreementNumber);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const acctualValue = await this.driverService.getText(this.txtCurrency);
      return await this.driverService.validateRecord("Validate Currency",
        [acctualValue.trim(), expectedValue.trim(), "Incorrect Currency"]
      );
    } catch (error) {
      console.log('validateCurrency_FrameAgreementForm_DetailsTab');
      console.log(error);
      return false;
    }
  }
  //#endregion

   //#region Validate values Products list on FA form at tab Details
   public async validateProductName_ProductList_FrameAgreementForm_DetailsTab(expectedValue: string, positionRow = 1) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtFrameAgreementNumber);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const lblActualValue = By.xpath(`//app-agreement-form//tbody//tr[${positionRow}]//td[1]//*[text()]`);
      const acctualValue = await this.driverService.getText(lblActualValue);
      return await this.driverService.validateRecord("Validate ProductName",
        [acctualValue.trim(), expectedValue.trim(), "Incorrect ProductName"]
      );
    } catch (error) {
      console.log('validateProductName_ProductList_FrameAgreementForm_DetailsTab');
      console.log(error);
      return false;
    }
  }
  //#endregion
}