import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { logFailMessage, logWarningMessage, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";


export class RoleSetting {

  private rdiDeleteQueues = By.xpath("(//div[@class='detail-content']//table/tbody/tr/td/div[text()='Delete queues']/parent::td/following-sibling::td//input)[last()]");

  constructor(private driverService: SeleniumWebDriverService) { }

  public async openRoleSettingByName(selectedRole: string) {
    try {
      await this.driverService.waitUntilElementLoaded(By.xpath("(//app-edit-link-col//a)[1]"));
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      for (let i = 1; i <= 30; i++) {
        let lblName = By.xpath(`(//app-edit-link-col//a)[${i}]`);
        if ((await this.driverService.isExisted(lblName)) === false) {
          // do nothing
        } else {
          let nameRole = await this.driverService.getText(lblName);
          if (nameRole.localeCompare(selectedRole) === 0) {
            let btnSetting = By.xpath(
              `(//button[@id='pgs-role-act-permission'])[${i}]`
            );
            await this.driverService.click(btnSetting);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true;
          }
        }
      }
      logFailMessage(`Can't find Role with name \"${selectedRole}\" into Role List`);
      return false;
    } catch (error) {
      console.log("openRoleSettingByName");
      console.log(error);
      return false;
    }
  }

  public async waitUntilCanCheckPermission() {
    try {
      await this.driverService.waitUntilElementLoaded(this.rdiDeleteQueues);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
    } catch (error) {
      console.log("waitUntilCanCheckPermission");
      console.log(error);
    }
  }
  public async checkField(permission: string, isSelect: string) {
    try {

      let checkBox = By.xpath(
        `(//div[contains(@class,'tab-pane') and contains(@class,'active')]//table/tbody/tr/td/div[text()='${permission}']/parent::td/following-sibling::td//label[@class='input-check'])[last()]`
      );

      let checkBoxValue = By.xpath(
        `(//div[contains(@class,'tab-pane') and contains(@class,'active')]//table/tbody/tr/td/div[text()='${permission}']/parent::td/following-sibling::td//label[@class='input-check']//input)[last()]`
      );
      let lblModules = By.xpath("(//div[contains(@class,'tab-pane') and contains(@class,'active')]//span[text()='Modules'])[last()]");
      if ((await this.driverService.isExisted(checkBox))) {
        await this.driverService.click(lblModules);
        await this.driverService.scrollElementToView(await this.driverService.findElement(checkBox));
        await this.driverService.pressUpCurrentElement();
        await this.driverService.pressUpCurrentElement();
        await this.driverService.pressUpCurrentElement();
        console.log("Check at:  " + permission);
        await this.driverService.waitForSeconds(2000);
        if (isSelect.localeCompare("Yes") === 0) {
          if (await this.driverService.getAttributeValue(checkBoxValue, "checked") != 'true') {
            await this.driverService.click(checkBox);
          }
        } else if (isSelect.localeCompare("No") === 0) {
          if (await this.driverService.getAttributeValue(checkBoxValue, "checked") == 'true') {
            await this.driverService.click(checkBox);
          }
        } else {
          logFailMessage(`Can not understand isSelect with value '${isSelect}'!`);
          return false
        }
        return true;
      }

      return false;
    } catch (error) {
      console.log("checkField: " + permission);
      console.log(error);
      return false;
    }
  }
  public async assertUpdatePermission(
    permission: string,
    isSelect: string
  ): Promise<boolean> {
    let result: boolean = true;
    try {
      let checkBoxStatus = By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//table/tbody/tr/td/div[text()='${permission}']/parent::td/following-sibling::td//input[@type='checkbox'])[last()]`);
      if (!(await this.driverService.isExisted(checkBoxStatus))) {
        logWarningMessage(`Not found permission ${permission}`);
        return true;
      }
      let status = await this.driverService.getAttributeValue(checkBoxStatus, "value");
      if (isSelect.localeCompare("Yes") === 0) {
        if (status.localeCompare("true") === 0) {
          result = true;
        } else {
          logFailMessage(`Assert at ${permission}: Incorrect ${permission}`);
          result = false;
        }
      }

      if (isSelect.localeCompare("No") === 0) {
        if (status.localeCompare("true") !== 0) {
          result = true;
        } else {
          logFailMessage(`Assert at ${permission}: Incorrect ${permission}`);
          result = false;
        }
      }
      return result;
    } catch (error) {
      console.log("assignRolesToTheUser");
      console.log(error);
      return false;
    }
  }
}
