import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2, logWarningMessage, waitUntilHorizontalProgressBarLoaded, logInfoMessage } from "../../../../shared/functions";


export class GlobalConfigColumn {
  // Main tab
  private btnConfigColumnAtMainTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//th[contains(@class,'config-colum')]");
  
  // Sub tab
  private btnConfigColumnAtSubTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//th[contains(@class,'config-colum')]");

  


  constructor(private driverService: SeleniumWebDriverService) { }
  
  public async pressConfigColumnButtonAtMainTab(){
    try {
      await this.driverService.waitUntilElementLoaded(this.btnConfigColumnAtMainTab);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      await this.driverService.click(this.btnConfigColumnAtMainTab);
      return true;
    } catch (error) {
      console.log('pressConfigColumnButtonAtMainTab');
      console.log(error);
      return false;
    }
  }

  public async pressConfigColumnButtonAtSubTab(){
    try {
      await this.driverService.waitUntilElementLoaded(this.btnConfigColumnAtSubTab);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      await this.driverService.click(this.btnConfigColumnAtSubTab);
      return true;
    } catch (error) {
      console.log('pressConfigColumnButtonAtSubTab');
      console.log(error);
      return false;
    }
  }

  public async checkConfigColumnItemByName(name: string){
    try {
      const item = By.xpath(`//div[contains(@class,'dropdown-menu') and contains(@class,'show')]/div/label[./span[text()='${name}']]`);
      await this.driverService.waitUntilElementLoaded(item);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      await this.driverService.click(item);
      return true;
    } catch (error) {
      console.log('checkConfigColumnItemByName');
      console.log(error);
      return false;
    }
  }

  public async checkConfigColumnDropdownShowing(){
    try {
      const item = By.xpath(`//div[contains(@class,'dropdown-menu') and contains(@class,'show')]`);
      return await this.driverService.isExisted(item);
    } catch (error) {
      console.log('checkConfigColumnDropdownShowing');
      console.log(error);
      return false;
    }
  }

  public async isConfigColumnItemCheckingByName(name: string){
    try {
      const item = By.xpath(`//div[contains(@class,'dropdown-menu') and contains(@class,'show')]/div/label[./span[text()='${name}']]/input`);
      await this.driverService.waitUntilElementLoaded(item);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const status = await this.driverService.getAttributeValue(item, 'checked');
      if(status && status.localeCompare("true") === 0){
        return true;
      }else{
        return false;
      }
    } catch (error) {
      console.log('isConfigColumnItemCheckingByName');
      console.log(error);
      return false;
    }
  }
}
