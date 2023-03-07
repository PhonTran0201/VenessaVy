import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";

export class EntityList {
  constructor(private driverService: SeleniumWebDriverService) { }

  //Xpath of elements on Entity list
  private btnNewEntity = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[contains(text(),'New entity')]`);

  public async checkEntityOnPrimaryEntitiesSectionExist(entityName: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnNewEntity);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const entity = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//h4[text()='Primary Entities']/following-sibling::c-table[1]//app-edit-link-col/a[text()='${entityName}']`);
      return await this.driverService.isExisted(entity);
    } catch (error) {
      console.log("checkEntityOnPrimaryEntitiesSectionExist");
      console.log(error);
      return false;
    }
  }

  public async clickEntityOnPrimaryEntitiesSection(entityName: string) {
    try {
      const entity = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//h4[text()='Primary Entities']/following-sibling::c-table[1]//app-edit-link-col/a[text()='${entityName}']`);
      await this.driverService.waitUntilElementLoaded(entity);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.click(entity);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      return true;
    } catch (error) {
      console.log("clickEntityOnPrimaryEntitiesSection");
      console.log(error);
      return false;
    }
  }
}