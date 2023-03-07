import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2, selectDropdownOption } from "../../../../../shared/functions";
import { GlobalDateTimeContainer } from "../../../general/GlobalPageObject/GlobalDateTimeContainer";

export class CloseClaimFormInsurance {
  constructor(private driverService: SeleniumWebDriverService) { }

  //xpath of elements on Close Claim form
  private cmbResolution = By.xpath(`//input[@id='pgs-claim-form-claim-element-id']`);
  private dtpDateClaimsPaidFinal = By.xpath(`//app-claim-close-form//div[./label[text()=' Date Claims Paid (Final) ']]//input`);
  private dtpDateFeesPaidFinal = By.xpath(`//app-claim-close-form//div[./label[text()=' Date Fees Paid (Final) ']]//input`);
  private dtpActionDate = By.xpath(`//app-claim-close-form//div[./label[text()=' Action date ']]//input`);
  private txtComments = By.xpath(`//app-claim-close-form//textarea[@id='pgs-claim-form-claim-element-name']`);
  private btnCloseClaim = By.xpath(`//app-claim-close-form//button[@form='pgs-claim-close-form']`);

  //Method on Close Claim input
  public async inputResolution(Resolution: string = "") {
    try {
      await this.driverService.waitUntilElementVisible(this.cmbResolution);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.cmbResolution, Resolution);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await selectDropdownOption(Resolution, "", this.driverService);
      return true;
    } catch (error) {
      console.log("inputResolution\n" + error);
      return false;
    }
  }

  public async inputDateClaimsPaidFinal(value: string) {
    try {
      await this.driverService.waitUntilElementVisible(this.dtpDateClaimsPaidFinal);
      await this.driverService.click(this.dtpDateClaimsPaidFinal);
      const globalDateTimeContainer = new GlobalDateTimeContainer(SeleniumWebDriverService.getInstance());
      await globalDateTimeContainer.inputDateTime(value);
      return true;
    } catch (error) {
      console.log('inputDateClaimsPaidFinal');
      console.log(error);
      return false;
    }
  }

  public async inputDateFeesPaidFinal(value: string) {
    try {
      await this.driverService.waitUntilElementVisible(this.dtpDateFeesPaidFinal);
      await this.driverService.click(this.dtpDateFeesPaidFinal);
      const globalDateTimeContainer = new GlobalDateTimeContainer(SeleniumWebDriverService.getInstance());
      await globalDateTimeContainer.inputDateTime(value);
      return true;
    } catch (error) {
      console.log('inputDateFeesPaidFinal');
      console.log(error);
      return false;
    }
  }

  public async inputActionDate(value: string) {
    try {
      await this.driverService.waitUntilElementVisible(this.dtpActionDate);
      await this.driverService.click(this.dtpActionDate);
      const globalDateTimeContainer = new GlobalDateTimeContainer(SeleniumWebDriverService.getInstance());
      await globalDateTimeContainer.inputDateTime(value);
      return true;
    } catch (error) {
      console.log('inputActionDate');
      console.log(error);
      return false;
    }
  }

  public async inputComments(Comment: string = "") {
    try {
      await this.driverService.waitUntilElementVisible(this.txtComments);
      await this.driverService.setText(this.txtComments, Comment);
      return true;
    } catch (error) {
      console.log("inputComments\n" + error);
      return false;
    }
  }

  public async clickCloseClaim() {
    try {
      await this.driverService.waitUntilElementVisible(this.btnCloseClaim);
      await this.driverService.click(this.btnCloseClaim);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      return true;
    } catch (error) {
      console.log("Click Close Claim faile\n" + error);
      return false;
    }
  }
}