import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2, logInfoMessage, reloadTable, logWarningMessage } from "../../../../../shared/functions";
import { scenarioName } from "../../../../../shared/variables";

export class UserList {
  private inviteUserbtn = By.id("pgs-user-list-add-user-btn");
  private editUserbtn = By.id("pgs-user-act-edit");

  constructor(private driverService: SeleniumWebDriverService) { }

  // Press Invite User
  public async pressinviteUserbtn() {
    try {
      await this.driverService.waitUntilElementLoaded(this.inviteUserbtn);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.click(this.inviteUserbtn);
      return true;
    } catch (error) {
      console.log(`pressinviteUserbtn`);
      console.log(error);
      return false;
    }
  }

  public async expandNumberOfUserItemList() {
    try {
      logInfoMessage("Wait for loading 10s...");
      await this.driverService.waitForSeconds(10000);
      await reloadTable(this.driverService);
      // await expandNumberItemOfList(this.driverService);
    } catch (error) {
      console.log("expandNumberOfItemUserList");
      console.log(error);
    }
  }

  public async pressEdit() {
    try {
      await this.driverService.waitUntilElementLoaded(this.editUserbtn);
      await this.driverService.click(this.editUserbtn);
    } catch (error) {
      console.log(error);
    }
  }

  public async pressEditByName(selectedUser: string) {
    try {
      await this.driverService.waitUntilElementLoaded(
        By.xpath(`//table/tbody/tr[1]/td[2]/span`)
      );
      for (let i = 1; i <= 30; i++) {
        let userbName = By.xpath(`//table/tbody/tr[${i}]/td[2]/span`);
        if ((await this.driverService.isExisted(userbName)) === false) {
          // fail(`Can't find user with name \"${selectedUser}\" into User List`);
        } else {
          let nameUser = await this.driverService.getText(userbName);
          if (nameUser.localeCompare(selectedUser) === 0) {
            let btnEdit = By.xpath(`(//app-user-actions/button/i)[${i}]`);
            await this.driverService.click(btnEdit);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true;
          }
        }
      }
      logWarningMessage(`Can't find user with name \"${selectedUser}\" into User List`);
      return false;
    } catch (error) {
      console.log("pressEditByName");
      console.log(error);
      return false;
    }
  }

  public async assertUser(
    positionRow: number = 1,
    displayName: string,
    //username: string,
    email: string
  ) {
    let actualDisplayName: string = "";
    //let actualUserName: string = "";
    let actualEmail: string = "";

    try {
      const newDisplayName = By.xpath(`//tbody/tr[${positionRow}]/td[2]/span`);
      //const newUserName = By.xpath(`//tr[${positionRow}]/td[3]/span`); //tbody/tr[1]/td[2]/span
      const newEmail = By.xpath(`//tr[${positionRow}]/td[4]/span`);
      await this.driverService.waitForSeconds(5000);
      await this.driverService.waitUntilElementLoaded(newEmail);
      await this.driverService.waitUntilElementLoaded(newDisplayName);

      actualDisplayName = await this.driverService.getText(newDisplayName);
      //actualUserName = await this.driverService.getText(this.newUserName);
      actualEmail = await this.driverService.getText(newEmail);
    } catch (error) {
      console.log("assertUser");
      console.log(error);
    }
    await this.driverService.validateTestCase(
      scenarioName,
      [
        actualDisplayName,
        displayName,
        "Assert at DisplayName: Incorrect Name!",
      ],
      //[actualUserName, username, "Assert at UserName: Incorrect Name!"],
      [actualEmail, email, "Assert at Email: Incorrect Email!"]
    );
  }
}
