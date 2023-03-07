import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { reloadTable, logFailMessage, logWarningMessage, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";

export class ContactList {
  private btnCreateContact = By.id("pgs-create-contact-list-btn");

  protected lblName = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[1]//app-edit-link-col//*[self::*[text()]]");

  constructor(protected driverService: SeleniumWebDriverService) { }

  public async openCreateContact() {
    //Add contact at account detail
    try {
      await this.driverService.waitUntilElementLoaded(this.btnCreateContact);
      await this.driverService.click(this.btnCreateContact);
      return true;
    } catch (error) {
      console.log("Open add Contacts popup");
      console.log(error);
      return false;
    }
  }

  public async openContactByName(selectedContact: string): Promise<number> {
    try {
      await this.driverService.waitForSeconds(3000);
      await reloadTable(this.driverService);
      await this.driverService.waitUntilElementLoaded(this.lblName);
      for (let i: number = 1; i <= 30; i++) {
        let lblName = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${i}]//app-edit-link-col//*[self::*[text()]]`);
        if ((await this.driverService.isExisted(lblName)) === false) {
          // 
        } else {
          let nameContact = await this.driverService.getText(lblName);
          if (nameContact.localeCompare(selectedContact) === 0) {
            await this.driverService.click(lblName);
            return i;
          }
        }
      }
      logFailMessage(`Can't find contact with name \"${selectedContact}\" into Contact List`);
      return -1;
    } catch (error) {
      console.log("openContactByName");
      console.log(error);
      return -1;
    }
  }

  public async enterContactTabByRow(positionRow: number) {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnCreateContact);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 200);
      let temp = By.xpath(`//app-contact-list//table//tbody/tr[${positionRow}]/td[count(//table/thead/tr/th[.="Name"]/preceding-sibling::th)+1]`);
      await this.driverService.click(temp);
      return true;
    } catch (error) {
      console.log("enterContactTabByName");
      console.log(error);
      return false;
    }
  }

  // Assert after Create Global contact
  public async assertCreateContact(
    positionRow: number,
    name: string,
    relatedaccount: string,
    phone: string,
    email: string
    // organization: string
  ) {
    let actualName: string = "";
    let actualRelatedAccount: string = "";
    let actualPhone: string = "";
    let actualEmail: string = "";
    // let actualOrganization: string = "";

    //Locator of elements at Contact list
    let lblName = By.xpath(`//tbody//tr[${positionRow}]//td[contains(@class,'pgs-contact-name')]//a`);
    let lblRelatedAccount = By.xpath(`//tbody//tr[${positionRow}]//td[contains(@class,'pgs-contact-related-account')]//a`);
    let lblPhone = By.xpath(`//tbody//tr[${positionRow}]//td[contains(@class,'pgs-contact-phone')]//span`);
    let lblEmail = By.xpath(`//tbody//tr[${positionRow}]//td[contains(@class,'pgs-contact-email')]//a`);
    // let lblOrganization = By.xpath(
    //   `//tbody//tr[${positionRow}]//td[contains(@class,'pgs-contact-organization')]//app-org-cell`
    // );

    try {
      // await reloadTable(this.driverService);
      await this.driverService.waitUntilElementLoaded(lblName);
      // await this.driverService.waitForSeconds(5000);
      // await reloadTable(this.driverService);
      actualName = await this.driverService.getText(lblName);
      actualRelatedAccount = await this.driverService.getText(lblRelatedAccount);
      actualPhone = await this.driverService.getText(lblPhone);
      actualEmail = await this.driverService.getText(lblEmail);
      // actualOrganization = await this.driverService.getText(lblOrganization);
    } catch (error) {
      console.log("assertCreateContact");
      console.log(error);
    }
    await this.driverService.validateTestCase(
      "[TC] Add contact successfully!",
      [actualName, name, "Assert at Name: Incorrect Name!"],
      [actualRelatedAccount, relatedaccount, "Assert at Related Account: Incorrect Related Account!"],
      [actualPhone, phone, "Assert at Phone: Incorrect Phone!"],
      [actualEmail, email, "Assert at Email: Incorrect Email!"]
      // [actualOrganization, organization, "Assert at Organization: Incorrect Organization!"]
    );
  }

  // Validate values at contact list

  public async validateValueContactList(expectedValue: string, nameOfColumn: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
    try {
      let temp = By.xpath("//div");
      switch (nameOfColumn) {
        case "Name": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tr[${positionRow}]/td[contains(@class,'pgs-contact-name')]//*[self::*[text()]]`);
          break;
        }
        case "Phone": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tr[${positionRow}]/td[contains(@class,'pgs-contact-phone')]//*[self::*[text()]]`);
          break;
        }
        case "Email": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tr[${positionRow}]/td[contains(@class,'pgs-contact-email')]//*[self::*[text()]]`);
          break;
        }
        case "Account": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tr[${positionRow}]/td[contains(@class,'pgs-contact-related-account')]//*[self::*[text()]]`);
          break;
        }
        default:
          logWarningMessage(`Column with name "${nameOfColumn}" is NOT found!`);
          return false;
      }
      await this.driverService.waitUntilElementLoaded(temp);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let actualValue = await (await this.driverService.getText(temp)).trim();
      if (isUsedForSearch) {
        return actualValue.toLowerCase().includes(expectedValue.toLowerCase());
      }
      else {
        return await this.driverService.validateRecord(`Validate column "${nameOfColumn}"`,
          [actualValue, expectedValue, `Incorrect "${nameOfColumn}"!`]
        );
      }


    } catch (error) {
      console.log("validateValueLeadList");
      console.log(error);
      return false;
    }

  }
}
