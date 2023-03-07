import { fail, strictEqual, notStrictEqual } from "assert";
import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../core/selenium-webdriver.service";
import { logWarningMessage, reloadTable, logFailMessage } from "../../../../shared/functions";

const numbOfSelectedAcc: number = 3;

export class TargetGroup {
  constructor(private driverService: SeleniumWebDriverService) { }

  private firstAccount = By.xpath("(//app-account-name-column/div/a)[1]");

  private addToTargetGroupBtn = By.xpath(
    "//button[contains(.,'Add to target group')]"
  );

  private newTargetGroupBtn = By.id('pgs-create-tg-btn');


  private targetGroupTypeField = By.xpath("//div[text()='Select Type']/following-sibling::div/input");

  public async selectAccounts() {
    try {
      await this.driverService.waitUntilElementLoaded(this.firstAccount);
      for (let i = 1; i <= numbOfSelectedAcc; i++) {
        await this.driverService.click(
          By.xpath("(//app-check-box-cell/label/span)[" + i + "]")
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async checkCheckboxAccountAtRow(rowPosition: number): Promise<boolean> {
    try {
      let checkboxAccount = By.xpath('//app-customer-page//app-customer-list//app-check-box-cell//input');
      let lenAccount = (await this.driverService.findElements(checkboxAccount)).length;
      if (rowPosition < 1 || rowPosition > lenAccount) {
        logWarningMessage(`RowPosition = ${rowPosition}. It should be in range [1,${lenAccount}]!`);
        return false;
      }
      else {
        checkboxAccount = By.xpath(`(//app-customer-page//app-customer-list//app-check-box-cell//input)[${rowPosition}]`);
        await this.driverService.click(checkboxAccount);
      }
      return true;
    } catch (error) {
      console.log("checkCheckboxAccountAtRow");
      console.log(error);
      return false;
    }
  }
  public async pressAddToGroup() {
    try {
      await this.driverService.waitUntilElementLoaded(this.addToTargetGroupBtn);
      await this.driverService.click(this.addToTargetGroupBtn);
      await this.driverService.waitForSeconds(3000);
    } catch (error) {
      console.log(error);
    }
  }

  public async inputTargetGroupType(name: string) {
    await this.driverService.waitUntilElementLoaded(this.targetGroupTypeField);
    await this.driverService.click(this.targetGroupTypeField);

    await this.driverService.waitForSeconds(2000);
    await this.driverService.setText(this.targetGroupTypeField, name);
    await this.driverService.waitForSeconds(4000);
    // await this.driverService.waitUntilPageLoaded();

    await this.driverService.pressEnter(this.targetGroupTypeField);
  }

  private settingBtn = By.xpath(
    "/html/body/app-root/x-layout/app-header/header/nav/div[2]/ul/li[2]/div/a/i"
  );
  private targetGroupBtn = By.xpath(
    "//span[text()='Target Group']/parent::button"
  );

  public async navigateToTargetGroup() {
    try {
      await this.driverService.waitUntilElementLoaded(this.settingBtn);
      await this.driverService.click(this.settingBtn);

      await this.driverService.waitUntilElementLoaded(this.targetGroupBtn);
      await this.driverService.click(this.targetGroupBtn);

      await this.driverService.waitForSeconds(5000);
    } catch (error) {
      console.log(error);
    }
  }
  public async reloadTable() {
    await reloadTable(this.driverService);
  }

  private nameField = By.xpath('//*[@id="pgs-tg-form-name"]');
  private typeField = By.xpath('//*[@id="pgs-tg-form-type"]');

  private saveTargetGroupBtn = By.xpath('(//*[@id="save-btn"])[3]');

  private firstRow = By.xpath("//app-edit-link-col/a");

  public async inputNewTargetGroup(name: string, type: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.nameField);
      await this.driverService.setText(this.nameField, name);

      await this.driverService.waitUntilElementLoaded(this.typeField);
      await this.driverService.setText(this.typeField, type);

      await this.driverService.pressEnter(this.typeField);

    } catch (error) {
      console.log(error);
    }
  }

  public async pressNewTargetGroup() {
    try {
      await this.driverService.waitUntilElementLoaded(this.newTargetGroupBtn);
      await this.driverService.click(this.newTargetGroupBtn);
    } catch (error) {
      console.log(error);
    }
  }
  private newName = By.xpath('//tbody/tr[1]//td[3]//a');
  private newType = By.xpath('//tbody/tr[1]//td[5]/span');

  public async assertNewTarget(
    positionRow: number = 1,
    name: string,
    type: string
  ) {
    let actualName: string = "";
    //let actualUserName: string = "";
    let actualType: string = "";

    try {
      this.newName = By.xpath(
        `//tbody/tr[${positionRow}]//td[3]//a`
      );
      this.newType = By.xpath(`//tr[${positionRow}]//td[5]/span`);
      await this.driverService.waitForSeconds(5000);
      await this.driverService.waitUntilElementLoaded(this.newName);
      await this.driverService.waitUntilElementLoaded(this.newType);

      actualName = await this.driverService.getText(this.newName);
      actualType = await this.driverService.getText(this.newType);
    } catch (error) {
      console.log("Assert Create!");
      console.log(error);
    }
    let nameTestcase: string = "";
    await this.driverService.validateTestCase(
      nameTestcase,
      [actualName, name, "Assert at Name: Incorrect Name!"],
      [
        actualType,
        type,
        "Assert at Type: Incorrect Type",
      ]
    );
  }

  private groupbName = By.xpath(`//tbody/tr[1]//td[3]//a`)

  public async pressDeleteByName(deleteGroup: string) {
    try {
      await this.driverService.waitUntilElementLoaded(
        By.xpath(`//tbody/tr[1]//td[3]//a`)
      );
      for (let i = 1; i <= 30; i++) {
        let groupbName = By.xpath(
          `//tbody/tr[${i}]//td[3]//a`
        );
        if ((await this.driverService.isExisted(groupbName)) === false) {
          fail(`Can't find group with name \"${deleteGroup}\" in Target Group List`);
        } else {
          let nameRole = await this.driverService.getText(groupbName);
          if (nameRole.localeCompare(deleteGroup) === 0) {
            let btnDelete = By.xpath(
              `(//app-target-group-act-cell/button[2]/i)[${i}]`
            );
            await this.driverService.click(btnDelete);
            return;
          }
        }
      }
      logFailMessage(`Can't find group with name \"${deleteGroup}\" in Target Group List`);
    } catch (error) {
      console.log("pressDeleteByName");
      console.log(error);
    }
  }
  public async assertDeleteGroup(
    positionRow: number = 1,
    name: string,
    type: string
  ) {
    if (positionRow === -1 || positionRow === -2) {
      strictEqual("", name, `Test failed: can't find or delete group "${name}"`);
    } else {
      let actualName: string = "";
      let actualType: string = "";
      this.newName = By.xpath(
        `//tbody/tr[${positionRow}]//td[3]//a`
      );
      this.newType = By.xpath(`//tr[${positionRow}]//td[5]/span`);

      try {
        await reloadTable(this.driverService);
        if (await this.driverService.isExisted(this.newName)) {
          await this.driverService.waitUntilElementLoaded(this.newName);
          actualName = await (
            await this.driverService.findElement(this.newName)
          ).getText();
          actualType = await (
            await this.driverService.findElement(this.newType)
          ).getText();
        } else {
          console.info("Delete case passed");
          return;
        }
      } catch (error) {
        console.error("Assert Assign user");
        console.error(error);
      }
      notStrictEqual(actualName, name, "Assert at Name");
      notStrictEqual(actualType, type, "Assert at Type");
    }
  }
}
