import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2, logWarningMessage } from "../../../../../../shared/functions";


export class LeadDetailsLeftSide {
  private txtLeadName = By.xpath(`//a[(@href) and @role='tab' and contains(@class,'active') and contains(@class,'tab-title')]`);
  private txtAddress = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//label[text()='Address']/following-sibling::p`);
  private txtEmail = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//label[text()='Email']/following-sibling::p`);
  private txtSource = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//label[text()='Source']/following-sibling::p`);
  private txtMobile = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//label[text()='Phone number']/following-sibling::p`);

  constructor(private driverService: SeleniumWebDriverService) { }

  public async validateLeadLeftSideDetail(expectedValue: string, fieldName: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtLeadName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      let temp = By.xpath(`//div`);
      switch (fieldName) {
        case "Name": {
          temp = this.txtLeadName;
          break;
        }
        case "Mobile": {
          temp = this.txtMobile;
          break;
        }
        case "Email": {
          temp = this.txtEmail;
          break;
        }
        case "Address": {
          temp = this.txtAddress;
          break;
        }
        case "Source": {
          temp = this.txtSource;
          break;
        }
        default:
          logWarningMessage(`Can not find field ${fieldName}!`);
          break;
      }
      await this.driverService.waitUntilElementLoaded(temp);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let actualValue = await this.driverService.getText(temp);
      let rs = await this.driverService.validateRecord(`Validate field "${fieldName}"`, [actualValue, expectedValue, `Incorrect "${fieldName}~"`]);;
      return rs;
    } catch (error) {
      console.log("Can not find expected value in Lead detail left side");
      console.log(error);
      return false;
    }
  }
}
