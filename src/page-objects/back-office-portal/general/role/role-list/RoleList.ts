import { strictEqual, notStrictEqual } from "assert";
import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { reloadTable, logWarningMessage, waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";


export class RoleList {
  private createRolebtn = By.id("pgs-create-roll-btn");
  private assignedField = By.xpath("//div[@class='form-group']//input[@id='pgs-role-assign-user-uid']");
  private Assignbtn = By.id("pgs-role-assign-user-btn");

  constructor(private driverService: SeleniumWebDriverService) { }

  public async presscreateRolebtn() {
    try {
      await this.driverService.waitUntilElementLoaded(this.createRolebtn);
      await this.driverService.click(this.createRolebtn);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async assertRole(
    positionRow: number = 1,
    name: string,
    description: string
  ) {
    let actualName: string = "";
    //let actualUserName: string = "";
    let actualDescription: string = "";

    try {
      const newName = By.xpath(
        `//tbody/tr[${positionRow}]//app-edit-link-col/a`
      );
      const newDescription = By.xpath(`//tr[${positionRow}]/td[3]/span`);

      await this.driverService.waitForSeconds(5000);
      await this.driverService.waitUntilElementLoaded(newName);
      await this.driverService.waitUntilElementLoaded(newDescription);
      await reloadTable(this.driverService);

      actualName = await this.driverService.getText(newName);
      actualDescription = await this.driverService.getText(newDescription);
    } catch (error) {
      console.log("Assert Create!");
      console.log(error);
    }
    let nameTestcase: string = "";
    await this.driverService.validateTestCase(
      nameTestcase,
      [actualName, name, "Assert at Name: Incorrect Name!"],
      [
        actualDescription,
        description,
        "Assert at Description: Incorrect Description",
      ]
    );
  }
  public async pressEditByName(selectedRole: string) {
    try {
      await this.driverService.waitUntilElementLoaded(
        By.xpath(`//table/tbody/tr[1]//app-edit-link-col/a`)
      );
      for (let i = 1; i <= 30; i++) {
        let rolebName = By.xpath(
          `//table/tbody/tr[${i}]//app-edit-link-col/a`
        );
        if ((await this.driverService.isExisted(rolebName)) === false) {
          // fail(`Can't find user with name \"${selectedRole}\" into User List`);
        } else {
          let nameRole = await this.driverService.getText(rolebName);
          if (nameRole.localeCompare(selectedRole) === 0) {
            let btnEdit = By.xpath(
              `(//app-role-actions-column/button[1]/i)[${i}]`
            );
            await this.driverService.click(btnEdit);
            return true;
          }
        }
      }
      logWarningMessage(`Can't find user with name \"${selectedRole}\" into User List`);
      return false;
    } catch (error) {
      console.log("pressEditByName");
      console.log(error);
      return false;
    }
  }
  public async pressDeleteByName(deleteRole: string) {
    try {
      await this.driverService.waitUntilElementLoaded(By.xpath(`//table/tbody/tr[1]//app-edit-link-col/a`));
      for (let i = 1; i <= 30; i++) {
        let rolebName = By.xpath(`//table/tbody/tr[${i}]//app-edit-link-col/a`);
        if ((await this.driverService.isExisted(rolebName)) === false) {
          // fail(`Can't find user with name \"${deleteRole}\" into User List`);
        } else {
          let nameRole = await this.driverService.getText(rolebName);
          if (nameRole.localeCompare(deleteRole) === 0) {
            let btnDelete = By.xpath(`(//app-role-actions-column/button[2]/i)[${i}]`);
            await this.driverService.click(btnDelete);
            return true;
          }
        }
      }
      logWarningMessage(`Can't find user with name \"${deleteRole}\" into User List`);
      return false;
    } catch (error) {
      console.log("pressDeleteByName");
      console.log(error);
      return false;
    }
  }
  public async assertDeleteRole(
    positionRow: number = 1,
    name: string,
    description: string
  ) {
    if (positionRow === -1 || positionRow === -2) {
      strictEqual("", name, `Test failed: can't find or delete role "${name}"`);
    } else {
      let actualName: string = "";
      let actualDescription: string = "";
      let txtName = By.xpath(
        `//tbody/tr[${positionRow}]//app-edit-link-col/a`
      );
      let txtDescription = By.xpath(`//tr[${positionRow}]/td[3]/span`);

      try {
        await reloadTable(this.driverService);
        if (await this.driverService.isExisted(txtName)) {
          await this.driverService.waitUntilElementLoaded(txtName);
          actualName = await (
            await this.driverService.findElement(txtName)
          ).getText();
          actualDescription = await (
            await this.driverService.findElement(txtDescription)
          ).getText();
        } else {
          console.info("Delete case passed");
          return;
        }
      } catch (error) {
        console.error("Assert Assign user");
        console.error(error);
      }
      notStrictEqual(actualName, name, "Assert at casetitle");
      notStrictEqual(actualDescription, description, "Assert at created date");
    }
  }
  public async pressSettingByName(selectedRole: string) {
    try {
      await this.driverService.waitUntilElementLoaded(
        By.xpath(`//table/tbody/tr[1]//app-edit-link-col/a`)
      );
      for (let i = 1; i <= 30; i++) {
        let rolebName = By.xpath(
          `//table/tbody/tr[${i}]//app-edit-link-col/a`
        );
        if ((await this.driverService.isExisted(rolebName)) === false) {
          // fail(`Can't find user with name \"${selectedRole}\" into User List`);
        } else {
          let nameRole = await this.driverService.getText(rolebName);
          if (nameRole.localeCompare(selectedRole) === 0) {
            let btnSetting = By.xpath(
              `(//app-role-actions-column/button[3]/i)[${i}]`
            );
            await this.driverService.waitForSeconds(2000);
            await this.driverService.click(btnSetting);
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true;
          }
        }
      }
      logWarningMessage(`Can't find user with name \"${selectedRole}\" into User List`);
      return false;
    } catch (error) {
      console.log("pressSettingByName");
      console.log(error);
      return false;
    }
  }
  public async assertAssignedRole(positionRow: number = 1, fullname: string) {
    let actualfullName: string = "";

    try {
      const newassignedName = By.xpath(`//div[@class='detail-content']//div[@class='table-responsive']//tbody/tr[${positionRow}]/td[3]/span`);
      await this.driverService.waitForSeconds(5000);
      await reloadTable(this.driverService);
      await this.driverService.waitUntilElementLoaded(newassignedName);

      actualfullName = await this.driverService.getText(newassignedName);
    } catch (error) {
      console.log("Assert Create!");
      console.log(error);
    }
    let nameTestcase: string = "";
    await this.driverService.validateTestCase(nameTestcase, [
      actualfullName,
      fullname,
      "Assert at Name: Incorrect Name!",
    ]);
  }
  public async addAssign(assigned: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.assignedField);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      //await this.driverService.click(this.assignedField);
      await this.driverService.setText(this.assignedField, assigned);
      await this.driverService.pressEnter(this.assignedField);
      await this.driverService.pressEnter(this.assignedField);
      await this.driverService.click(this.Assignbtn);
      return true;
    } catch (error) {
      console.log("addAssign\n" + error);
      return false;
    }
  }
}
