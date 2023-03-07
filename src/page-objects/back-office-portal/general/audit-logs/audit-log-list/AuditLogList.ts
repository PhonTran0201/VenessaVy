import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2, expandNumberItemOfList, logWarningMessage } from "../../../../../shared/functions";
import { GlobalPageObject } from "../../GlobalPageObject/GlobalPageObject";


export class AuditLogList {
  constructor(private driverService: SeleniumWebDriverService) { }

  private globalPageObject = new GlobalPageObject(this.driverService);

  //Xpaths of element at audit log list
  private lblId = By.xpath(`//table//tr[1]//td[1]//*[self::*[text()]]`);
  private lblDateTime = By.xpath(`//table//tr[1]//td[2]//*[self::*[text()]]`);
  private lblUser = By.xpath(`//table//tr[1]//td[3]//*[self::*[text()]]`);
  private lblEntity = By.xpath(`//table//tr[1]//td[4]//*[self::*[text()]]`);
  private lblEvent = By.xpath(`//table//tr[1]//td[5]//*[self::*[text()]]`);
  private lblData = By.xpath(`//table//tr[1]//td[6]//*[self::*[text()]]`);

  public async checkEventExist(
    dateTime: string,
    user: string,
    entity: string,
    event: string,
    data: string
  ) {
    try {
      await this.driverService.waitUntilElementLoaded(By.xpath("//table"));
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);

      await expandNumberItemOfList(this.driverService, By.xpath("//button[@id='pgs-expand-rows-btn']"), 30);
      await this.globalPageObject.waitForProgressBarLoaded_v2(100);
      await this.globalPageObject.waitForProgressBarLoaded_v2(100);

      logWarningMessage(`Expected value:`);
      logWarningMessage(`\t- Date Time: ${dateTime}`);
      logWarningMessage(`\t- User: ${user}`);
      logWarningMessage(`\t- Entity: ${entity}`);
      logWarningMessage(`\t- Event: ${event}`);
      logWarningMessage(`\t- Data: ${data}`);
      for (let i = 1; i <= 30; i++) {
        const lblDateTime = By.xpath(`//table//tr[${i}]//td[2]//*[self::*[contains(text(),'${dateTime.substring(0, 10)}')]]`);
        const lblUser = By.xpath(`//table//tr[${i}]//td[3]//*[self::*[contains(text(),'${user}')]]`);
        const lblEntity = By.xpath(`//table//tr[${i}]//td[4]//*[self::*[text()=' ${entity} ']]`);
        const lblEvent = By.xpath(`//table//tr[${i}]//td[5]//*[self::*[text()=' ${event} ']]`);
        const lblData = By.xpath(`//table//tr[${i}]//td[6]//*[self::*[text()='${data}']]`);
        try {
          logWarningMessage(`\tChecking Audit logs list line "${i}": `);
          logWarningMessage(`\t\t- Date Time: ${await this.driverService.getText(lblDateTime)}`);
          logWarningMessage(`\t\t- User: ${await this.driverService.getText(lblUser)}`);
          logWarningMessage(`\t\t- Entity: ${await this.driverService.getText(lblEntity)}`);
          logWarningMessage(`\t\t- Event: ${await this.driverService.getText(lblEvent)}`);
          logWarningMessage(`\t\t- Data: ${await this.driverService.getText(lblData)}`);
          return true;
        } catch (error) {
          continue;
        }
      }

      return false;
    } catch (error) {
      console.log("checkEventExist");
      console.log(error);
      return false;
    }
  }
}