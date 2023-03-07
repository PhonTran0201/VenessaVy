import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2, selectDropdownOption } from "../../../../../../../shared/functions";
import { AppEntityWidgets } from "../../../../app-entity-widgets/AppEntityWidgets";


export class AccountTabSummary extends AppEntityWidgets {
  private cmbSummaryView = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//*[@id='pgs-customer-summary-setting']");
  private widgetCustomerScore = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-scoring-widget`);
  private btnRefreshLayout = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//c-details-layout//button[./i[contains(@class,'fa-sync')]]");

  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }

  /**
   * Select layout at dropdown summary view
   * @param layoutName Name of layout at Summary tab
   */
  public async selectSummaryViewLayout(layoutName: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbSummaryView);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.setText(this.cmbSummaryView, layoutName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await selectDropdownOption(layoutName, "", this.driverService);

      return true;
    } catch (error) {
      console.log('selectSummaryViewLayout');
      console.log(error);
      return false;
    }
  }

  public async verifyCustomerScoreWidget() {
    try {
      await this.driverService.waitUntilElementLoaded(By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-scoring-widget`));
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      let temp = await this.driverService.isExisted(this.widgetCustomerScore);
      return temp;
    } catch (error) {
      console.log(`verifyGenerateDocumentButton`);
      console.log(error);
      return false;
    }
  }

  public async pressRefreshLayoutButton(){
    try {
      await this.driverService.waitUntilElementLoaded(this.btnRefreshLayout);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      await this.driverService.click(this.btnRefreshLayout);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      return true;
    } catch (error) {
      console.log('pressRefreshLayoutButton');
      console.log(error);
      return false;
    }
  }
}

