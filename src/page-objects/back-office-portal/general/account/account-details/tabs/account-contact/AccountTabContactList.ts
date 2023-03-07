import { strictEqual, notStrictEqual } from "assert";
import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../../../core/selenium-webdriver.service";
import { reloadTable, waitUntilHorizontalProgressBarLoaded_v2, logWarningMessage, logInfoMessage, logFailTestcase } from "../../../../../../../shared/functions";
import { locator_progressbarNotActive } from "../../../../../../../shared/variables";
import { ContactList } from "../../../../contact/contact-list/ContactList";


export class AccountTabContactList extends ContactList {
  private btnAddContact = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//*[@id='pgs-cus-add-contact-btn']");

  //Element at Contact list at Entity detail
  private btnEdit = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//button//*[contains(@class,'fa-edit')]");
  private btnDelete = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//button//*[contains(@class,'fa-trash')]");
  protected lblName = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[1]//app-edit-link-col//*[self::*[text()]]");


  private hrefFirstContact = By.xpath("(//app-edit-link-col/a)[1]");

  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }

  public async pressCreateContactEntityDetail() {
    //Add contact at account detail
    try {
      await this.driverService.waitUntilElementLoaded(this.btnAddContact);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.btnAddContact);
      return true;
    } catch (error) {
      console.log("Open add Contacts popup");
      console.log(error);
      return false;
    }
  }

  public async pressEditContactByName(selectedContact: string) {
    try {
      await this.driverService.waitForSeconds(3000);
      await reloadTable(this.driverService);
      await this.driverService.waitUntilElementLoaded(this.lblName);
      for (let i: number = 1; i <= 30; i++) {
        let lblName = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${i}]//app-edit-link-col//*[self::*[text()]]`);
        let editContactBtn = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${i}]//app-customer-contact-act-cell//button[@id='pgs-contact-c-edit']`);
        if ((await this.driverService.isExisted(lblName)) === false) {
          // 
        } else {
          let nameContact = await this.driverService.getText(lblName);
          if (nameContact.localeCompare(selectedContact) === 0) {
            await this.driverService.click(editContactBtn);
            return i;
          }
        }
      }
      return -1;
    } catch (error) {
      console.log("pressEditContactByName");
      console.log(error);
      return -1;
    }
  }

  public async openFirstContact() {
    try {
      await this.driverService.waitUntilElementLoaded(this.hrefFirstContact);
      await this.driverService.click(this.hrefFirstContact);
      return true;
    } catch (error) {
      console.log("openFirstContact");
      console.log(error);
      return false;
    }
  }

  public async pressDeleteByName(deleteContact: string) {
    try {
      await this.driverService.waitForSeconds(4000);
      await reloadTable(this.driverService);
      await this.driverService.waitUntilElementLoaded(this.lblName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      for (let i = 1; i <= 30; i++) {
        let ContactbName = By.xpath(
          `//table/tbody/tr[${i}]//app-edit-link-col/a`
        );
        if ((await this.driverService.isExisted(ContactbName)) === false) {
          logWarningMessage(`Can't find contact with name \"${deleteContact}\" in Contact List`);
          return false;
        } else {
          let nameRole = await this.driverService.getText(ContactbName);
          if (nameRole.localeCompare(deleteContact) === 0) {
            let btnDelete = By.xpath(
              `(//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//button//*[contains(@class,'fa-trash')])[${i}]`
            );
            await this.driverService.click(btnDelete);
            return true;
          }
        }
      }
      logWarningMessage(`Can't find contact with name \"${deleteContact}\" in Contact List`);
      return false;
    } catch (error) {
      console.log("pressDeleteByName");
      console.log(error);
      return false;
    }
  }

  public async reloadContactList() {
    try {
      logInfoMessage("Wait for loading about 7s...");
      await this.driverService.waitForSeconds(7000);
      await reloadTable(this.driverService);
    } catch (error) {
      console.log("reloadContactList");
      console.log(error);
    }
  }

  public async assertAddContact(
    positionRow: number,
    name: string,
    dob: string,
    role: string,
    email: string,
    phone: string
  ) {
    let actualName: string = "";
    let actualDOB: string = "";
    let actualRole: string = "";
    let actualEmail: string = "";
    let actualPhone: string = "";

    //Locator of elements at Contact list
    let lblName = By.xpath(
      `(//app-customer-contact-list//tbody/tr/td[2])[${positionRow}]`
    );
    let lblDateOfBirth = By.xpath(
      `(//app-customer-contact-list//tbody/tr/td[3])[${positionRow}]`
    );
    let lblRole = By.xpath(
      `(//app-customer-contact-list//tbody/tr/td[4])[${positionRow}]`
    );
    let lblEmail = By.xpath(
      `(//app-customer-contact-list//tbody/tr/td[5])[${positionRow}]`
    );
    let lblPhone = By.xpath(
      `(//app-customer-contact-list//tbody/tr/td[6])[${positionRow}]`
    );

    try {
      actualName = await this.driverService.getText(lblName);
      actualDOB = await this.driverService.getText(lblDateOfBirth);
      actualRole = await this.driverService.getText(lblRole);
      actualEmail = await this.driverService.getText(lblEmail);
      actualPhone = await this.driverService.getText(lblPhone);

      return await this.driverService.validateRecord(
        "[TC] Add contact successfully!",
        [actualName, name, "Assert at Name: Incorrect Name!"],
        [actualDOB, dob, "Assert at Date of Birth: Incorrect Date of Birth!"],
        [actualRole, role, "Assert at Role: Incorrect Role!"],
        [actualEmail, email, "Assert at Email: Incorrect Email!"],
        [actualPhone, phone, "Assert at Phone: Incorrect Phone!"]
      );
    } catch (error) {
      console.log("Assert add contact");
      console.log(error);
      return false;
    }
  }

  public async assertUpdateContact(
    editedRow: number,
    name: string,
    dob: string,
    role: string,
    email: string,
    phone: string
  ) {
    let actualName: string = "";
    let actualDOB: string = "";
    let actualRole: string = "";
    let actualEmail: string = "";
    let actualPhone: string = "";

    //Locator of elements at Contact list
    let lblName = By.xpath(
      `(//app-customer-contact-list//tbody/tr/td[2])[${editedRow}]`
    );
    let lblDateOfBirth = By.xpath(
      `(//app-customer-contact-list//tbody/tr/td[3])[${editedRow}]`
    );
    let lblRole = By.xpath(
      `(//app-customer-contact-list//tbody/tr/td[4])[${editedRow}]`
    );
    let lblEmail = By.xpath(
      `(//app-customer-contact-list//tbody/tr/td[5])[${editedRow}]`
    );
    let lblPhone = By.xpath(
      `(//app-customer-contact-list//tbody/tr/td[6])[${editedRow}]`
    );

    try {
      await this.driverService.waitUntilElementLoaded(lblName);
      await this.driverService.waitForSeconds(1000);
      await this.driverService.waitUntilElementLoaded(locator_progressbarNotActive);
      await this.driverService.waitUntilElementLoaded(lblName);

      actualName = await this.driverService.getText(lblName);
      actualDOB = await this.driverService.getText(lblDateOfBirth);
      actualRole = await this.driverService.getText(lblRole);
      actualEmail = await this.driverService.getText(lblEmail);
      actualPhone = await this.driverService.getText(lblPhone);
    } catch (error) {
      console.log("assertUpdateContact");
      console.log(error);
    }

    await this.driverService.validateTestCase(
      "[TC] Update contact successfully!",
      [actualName, name, "Assert at Name: Incorrect Name!"],
      [actualDOB, dob, "Assert at Date of Birth: Incorrect Date of Birth!"],
      [actualRole, role, "Assert at Role: Incorrect Role!"],
      [actualEmail, email, "Assert at Email: Incorrect Email!"],
      [actualPhone, phone, "Assert at Phone: Incorrect Phone!"]
    );
  }

  public async assertDeleteContact(
    positionRow: number = 1,
    name: string
  ) {
    if (positionRow === -1 || positionRow === -2) {
      strictEqual("", name, `Test failed: can't find or delete contact "${name}"`);
    } else {
      let actualName: string = "";
      let txtName = By.xpath(
        `//table/tbody/tr[${positionRow}]//app-edit-link-col/a`
      );

      try {
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
        if (await this.driverService.isExisted(txtName)) {
          await this.driverService.waitUntilElementLoaded(txtName);
          actualName = await (
            await this.driverService.findElement(txtName)
          ).getText();
        } else {
          console.info("Delete contact passed");
          return;
        }
      } catch (error) {
        console.error("Assert Assign user");
        console.error(error);
      }
      notStrictEqual(actualName, name, `Contact with name "${name} was NOT deleted!"`);
    }
  }

  public async assertContactExistence(
    positionRow: number = 1,
    name: string,
    dob: string,
    type: string,
    email: string,
    phone: string,
  ) {
    if (positionRow === -1 || positionRow === -2) {
      strictEqual("", name, `Account doesn not exist "${name}"`);
    } else {
      let actualName: string = "";
      let actualDOB: string = "";
      let actualType: string = "";
      let actualEmail: string = "";
      let actualPhone: string = "";

      let txtNameAccount = By.xpath(
        `//table/tbody/tr[${positionRow}]/td[2]/app-edit-link-col/a`
      );
      let txtDOB = By.xpath(
        `//table/tbody/tr[${positionRow}]/td[3]/span`
      );
      let txtType = By.xpath(
        `//table/tbody/tr[${positionRow}]/td[4]/span[@class='ng-star-inserted']`
      )
      let txtEmailAccount = By.xpath(
        `//table/tbody/tr[${positionRow}]/td[5]/span`
      );
      let txtPhoneAccount = By.xpath(
        `//table/tbody/tr[${positionRow}]/td[6]/span`
      );

      try {
        if (await this.driverService.isExisted(txtNameAccount)) {
          await this.driverService.waitUntilElementLoaded(txtNameAccount);
          actualName = await (
            await this.driverService.findElement(txtNameAccount)
          ).getText();
          actualDOB = await (
            await this.driverService.findElement(txtDOB)
          ).getText();
          actualType = await (
            await this.driverService.findElement(txtType)
          ).getText();
          actualEmail = await (
            await this.driverService.findElement(txtEmailAccount)
          ).getText();
          actualPhone = await (
            await this.driverService.findElement(txtPhoneAccount)
          ).getText();
        } else {
          console.info("Contact does not exist");
          return;
        }
      } catch (error) {
        console.error("Assert Assign Contact");
        console.error(error);
      }
      if(name){
        notStrictEqual(actualName, name, "Assert at Name");
      }
      if(dob){
        notStrictEqual(actualDOB, dob, "Assert at DOB");
      }
      if(type){
        notStrictEqual(actualType, type, "Assert at Title");
      }
      if(email){
        notStrictEqual(actualEmail, email, "Assert at Email");
      }
      if(phone){
        notStrictEqual(actualPhone, phone, "Assert at Phone");
      }
    }
  }
  public async assertContactListExistence(
    positionRow: number = 1,
    Name: string,
    DateOfBirth: string,
    Email: string,
    Phone: string,
  ) {
    let actualName: string = "";
    let actualDateOfBirth: string = "";
    let actualEmail: string = "";
    let actualPhone: string = "";

    let lblName = By.xpath(
      `//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'active') and @role='tabpanel']//table/tbody/tr[1]/td[2]//a`
    );
    let lblDateOfBirth = By.xpath(
      `//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'active') and @role='tabpanel']//table/tbody/tr[1]/td[3]`
    );
    let lblEmail = By.xpath(
      `//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'active') and @role='tabpanel']//table/tbody/tr[1]/td[5]`
    );
    let lblPhone = By.xpath(
      `//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'active') and @role='tabpanel']//table/tbody/tr[1]/td[6]`
    );

    try {
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      if (await this.driverService.isExisted(lblName)) {
        await this.driverService.waitUntilElementLoaded(lblName);
        actualName = await this.driverService.getText(lblName);
        actualDateOfBirth = await this.driverService.getText(lblDateOfBirth);
        actualEmail = await this.driverService.getText(lblEmail);
        actualPhone = await this.driverService.getText(lblPhone);
      }
    } catch (error) {
      console.error("Assert Assign Contact");
      console.error(error);
      logFailTestcase(false);
    }
    if (Name.localeCompare(actualName) === 0 &&
      DateOfBirth.localeCompare(actualDateOfBirth) === 0 &&
      Email.localeCompare(actualEmail) === 0 &&
      Phone.localeCompare(actualPhone) === 0) {
      logFailTestcase(false, `Contact has been created:\n\tName: ${Name}\tDOB: ${DateOfBirth}\tEmail: ${Email}\tPhone: ${Phone}`);
    }
  }

  public async validateValueContactList(expectedValue: string, nameOfColumn: string, positionRow: number = 1) {
    try {
      let temp = By.xpath("//div");
      switch (nameOfColumn) {
        case "Name": {
          temp = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'active') and @role='tabpanel']//table/tbody/tr[${positionRow}]/td[2]`);
          break;
        }
        case "Date Of Birth": {
          temp = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'active') and @role='tabpanel']//table/tbody/tr[${positionRow}]/td[3]`);
          break;
        }
        case "Type": case "Title": {
          temp = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'active') and @role='tabpanel']//table/tbody/tr[${positionRow}]/td[4]`);
          break;
        }

        case "Email": {
          temp = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'active') and @role='tabpanel']//table/tbody/tr[${positionRow}]/td[5]`);
          break;
        }
        case "Phone": {
          temp = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'active') and @role='tabpanel']//table/tbody/tr[${positionRow}]/td[6]`);
          break;
        }

        default:
          logWarningMessage(`Column with name "${nameOfColumn}" is NOT found!`);
          return false;
      }
      await this.driverService.waitUntilElementLoaded(temp);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const actualValue = await this.driverService.getText(temp);

      return await this.driverService.validateRecord(`Validate column "${nameOfColumn}"`, [actualValue, expectedValue, `Incorrect "${nameOfColumn}"!`]);
    } catch (error) {
      console.log("validateValueContactList");
      console.log(error);
      return false;
    }
  }

}

