import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2, selectDropdownOption, logWarningMessage } from "../../../../../shared/functions";


export class AccountRelationshipForm {
  constructor(private driverService: SeleniumWebDriverService) { }

  private btnAddRelationship = By.xpath("//*[contains(local-name(),'form')]//button[@id='pgs-cus-add-relationship-btn']");
  private txtAccount = By.xpath("//app-customer-relationship//label[text()=' Account ']/following-sibling::*//input");
  private txtType = By.xpath("//app-customer-relationship//label[text()=' Type ']/following-sibling::*//input");



  //#region Input Relationship form
  public async inputAccountOnRelationshipForm(Account: string) {
    try {
      if (await this.driverService.canBeSetText(this.txtAccount)) {
        await this.driverService.waitUntilElementLoaded(this.txtAccount);
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
        await this.driverService.setText(this.txtAccount, Account);
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
        await selectDropdownOption(Account, "", this.driverService);
      }

      return true;
    } catch (error) {
      console.log("inputAccountOnRelationshipForm");
      console.log(error);
      return false;
    }
  }

  public async inputTypeOnRelationshipForm(Type: string) {
    try {
      if (await this.driverService.canBeSetText(this.txtType)) {
        await this.driverService.waitUntilElementLoaded(this.txtType);
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
        await this.driverService.setText(this.txtType, Type);
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
        await selectDropdownOption(Type, "", this.driverService);
      }

      return true;
    } catch (error) {
      console.log("inputTypeOnRelationshipForm");
      console.log(error);
      return false;
    }
  }
  //#endregion


  public async openCreateAccountRelationshipForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnAddRelationship);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.pressTab(this.btnAddRelationship);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.btnAddRelationship);
      return true;
    } catch (error) {
      console.log("openCreateAccountRelationshipForm");
      console.log(error);
      return false;
    }
  }

  public async openEditRelationshipFormByAccount(account: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnAddRelationship);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);

      for (let i = 1; i < 10; i++) {
        //get account data on the column
        const actualAccount = await this.driverService.getText(
          By.xpath(`//app-customer-relationship-field//table//tbody//tr[${i}]/td[count(//table/thead/tr/th[.='Account']/preceding-sibling::th)+1]`)
        );
        if (account.localeCompare(actualAccount) === 0) {
          const btnEdit = By.xpath(`//app-customer-relationship-field//table//tbody//tr[${i}]//button[@id="pgs-relationship-cell-edit"]`);
          await this.driverService.click(btnEdit);
          return true;
        }
      }

      logWarningMessage(`Can't find account with name "${account}"`);
      return false;
    } catch (error) {
      console.log("openEditRelationshipFormByAccount");
      console.log(error);
      return false;
    }
  }

  public async openDeleteRelationshipFormByAccount(account: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnAddRelationship);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);

      for (let i = 1; i < 10; i++) {
        //get account data on the column
        const actualAccount = await this.driverService.getText(
          By.xpath(`//app-customer-relationship-field//table//tbody//tr[${i}]/td[count(//table/thead/tr/th[.='Account']/preceding-sibling::th)+1]`)
        );
        if (account.localeCompare(actualAccount) === 0) {
          const btnDelete = By.xpath(`//app-customer-relationship-field//table//tbody//tr[${i}]//button[@id="pgs-relationship-cell-delete"]`);
          await this.driverService.click(btnDelete);
          return true;
        }
      }

      logWarningMessage(`Can't find account with name "${account}"`);
      return false;
    } catch (error) {
      console.log("openEditRelationshipFormByAccount");
      console.log(error);
      return false;
    }
  }

  //validation
  public async validateRelationship(expectedValue: string, nameOfColumn: string, positionRow: number = 1) {
    try {
      let temp = By.xpath("//div");
      switch (nameOfColumn) {
        case "Account": {
          temp = By.xpath(`//app-customer-relationship-field//table//tbody/tr[${positionRow}]/td[count(//table/thead/tr/th[.="Account"]/preceding-sibling::th)+1]`);
          break;
        }
        case "Type": {
          temp = By.xpath(`//app-customer-relationship-field//table//tbody/tr[${positionRow}]//app-relationship-type-cell`);
          break;
        }
        default: {
          logWarningMessage(`Column name "${nameOfColumn}" is not found`);
          return false;
        }
      }

      await this.driverService.waitUntilElementLoaded(temp);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const actualValue = await this.driverService.getText(temp);

      return await this.driverService.validateRecord(`Validate column "${nameOfColumn}"`, [actualValue, expectedValue, `Incorrect "${nameOfColumn}~"`]);
    } catch (error) {
      console.log("validateRelationship");
      console.log(error);
      return false;
    }

  }

  //get total relationship count
  // public async getRelationshipRecord() {
  //   try {
  //     await this.driverService.waitUntilElementLoaded(this.btnAddRelationship);
  //     await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);

  //     const numberOfRecords = By.xpath(
  //       "//app-customer-relationship-field//*[contains(text(),'record)]"
  //     );
  //     const str = await this.driverService.getText(numberOfRecords);
  //     var parseResult = str.replace(/[^0-9]/g, "");
  //     return parseInt(parseResult, 10);
  //   } catch (error) {
  //     console.log("getRelationshipRecord");
  //     console.log(error);
  //     return 0;
  //   }
  // }

  //works when there's only 1 record, otherwise use another approach
  public async validateDeletion() {
    try {
      await this.driverService.waitUntilElementLoaded(By.xpath(`//*[contains(local-name(),'app-customer')]//p[text()="No data here"]`));
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.findElement(By.xpath(`//*[contains(local-name(),'app-customer')]//p[text()="No data here"]`));
    } catch (error) {
      console.log("validateDeletion");
      console.log(error);
      return false;
    }
    return true;
  }
}
