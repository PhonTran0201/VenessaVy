import { strictEqual, notStrictEqual, fail } from "assert";
import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";
import { TableManager } from "../../../../../core/fields/TableManager";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2, waitUntilHorizontalProgressBarLoaded, logWarningMessage, logInfoMessage, reloadTable, logSuccessMessage, getCurrentDateTime } from "../../../../../shared/functions";
import { toastError, scenarioName, resultColumn } from "../../../../../shared/variables";
import { GlobalPageObject } from "../../GlobalPageObject/GlobalPageObject";
import { AccountForm } from "../account-forms/AccountForm";


export class AccountList extends BasePage {
  protected globalPageObject = new GlobalPageObject(this.driverService);

  // menu
  locMenuAccount: By = By.xpath("//div[@class='collapse navbar-collapse']//a[@id='navbar-NAVIGATION_ACCOUNTS']");
  locMenuItemAccount: By = By.xpath("//div[@class='dropdown']//a[@title='Accounts']");

  // Account tab title
  protected btnAccountTab = By.xpath("//li[@class='nav-item']/a[@title='Accounts']");

  //#region Xpaths on Header at Account list
  protected btnCreateNewAccount = By.xpath("//*[@id='create-customer-dropdown']");
  protected btnPerson = By.xpath("//button[contains(.,'Person')]");
  protected btnCompany = By.xpath("//button[contains(.,'Company')]");

  protected btnAddToTargetGroup = By.xpath("//button[@id='pgs-recent-cus-add-to-group']");
  protected btnImportAccount = By.xpath("//button[@id='pgs-recent-cus-import-acc']");
  protected btnExportAccount = By.xpath("//button[@id='pgs-recent-cus-ex-acc']");
  protected btnMore = By.xpath("//button[@id='btnActionPage']");

  // Dropdown search
  protected txtSearchCollased = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-recent-customers//formly-autocomplete//div[@aria-expanded='false']//input");
  protected txtSearchExpanded = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-recent-customers//formly-autocomplete//div[@aria-expanded='true']//input");


  //Button Search and Filter
  protected btnSearchAndFilter = By.xpath("//button//span[text()='Search & Filter']");
  //#endregion


  //#region  Locator for elements at first row of account list
  protected lblNameAccount = By.xpath("(//table//tr[1]//td[contains(@class,'pgs-cus-name')]//*[self::*[text()]])[last()]");
  protected lblNINAccount = By.xpath("//table//tr[1]//td[contains(@class,'pgs-cus-ssn')]//*[self::*[text()]]");
  protected lblEmailAccount = By.xpath("//table//tr[1]//td[contains(@class,'pgs-cus-email')]//*[self::*[text()]]");
  protected lblPhoneAccount = By.xpath("//table//tr[1]//td[contains(@class,'pgs-cus-phone')]//*[self::*[text()]]");
  protected lblAddressAccount = By.xpath("//table//tr[1]//td[contains(@class,'pgs-cus-address')]//*[self::*[text()]]");
  protected lblKAMAccount = By.xpath("//table//tr[1]//td[contains(@class,'pgs-cus-kam')]//*[self::*[text()]]");
  protected lblStatusAccount = By.xpath("//table//tr[1]//td[contains(@class,'pgs-cus-status')]//*[self::*[text()]]");


  protected btnColumConfig = By.xpath("//i[@title='Column config']");
  //#endregion

  //#region Locator on Account Company form
  protected txtCompanyName = By.xpath("//input[contains(@class,'pgs-json-schema-control-company-name')]");

  protected btnCloseAccount = By.xpath("(//*[@type='button' and @class='btn-close ng-star-inserted' or @class='btn-close'])[1]");
  //#endregion

  //constructor(protected driverService: SeleniumWebDriverService) { }

  public async accessAccount() {
    await this.waitPageLoaded();
    const menuAccount = await this.getFieldType(this.locMenuAccount);
    await menuAccount.click();
    await this.waitForAnyPopupDisplayed();
    const menuMenuItemAccount = await this.getFieldType(this.locMenuItemAccount);
    await menuMenuItemAccount.click();
    await this.waitPageProgressCompleted();
    await this.waitPageLoaded();
  }

  // Methods on Title of Account tab
  public async clickAccountbtn() {
    try {
      await this.driverService.waitForElementEnabled(this.btnAccountTab);
      await this.driverService.click(this.btnAccountTab);
    } catch (error) {
      console.log(error);
    }
  }

  //#region Methods on Header of Account list
  // Button Create
  public async openCreateNewAccountPersonForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnCreateNewAccount);
      await this.driverService.click(this.btnCreateNewAccount);
      await this.driverService.waitUntilElementLoaded(this.btnPerson);
      await this.driverService.click(this.btnPerson);
      return true;
    } catch (error) {
      console.log("Open Create New Account Person form");
      return false;
    }
  }

  public async openCreateNewAccountCompanyForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnCreateNewAccount);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.click(this.btnCreateNewAccount);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      if (await this.driverService.isExisted(this.txtCompanyName)) {
        return true;
      }
      else {
        await this.driverService.waitUntilElementLoaded(this.btnCompany);
        await this.driverService.click(this.btnCompany);
      }
      return true;
    } catch (error) {
      console.log("Open Create New Account Company form");
      console.log(error);
      return false;
    }
  }

  public async clickImportAccountOnAccountList() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnImportAccount);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.click(this.btnImportAccount);
      await waitUntilHorizontalProgressBarLoaded(this.driverService);
      return true;
    } catch (error) {
      console.log("clickImportAccountOnAccountList");
      console.log(error);
      return false;
    }
  }
  // Dropdown Search
  public async fillNameIntoSearchField(accountName: string) {
    try {
      await this.driverService.waitUntilElementVisible(this.txtSearchCollased);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.click(this.txtSearchCollased);
      await this.driverService.waitUntilElementLoaded(this.txtSearchExpanded);
      await this.driverService.setText(this.txtSearchExpanded, accountName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      return true;
    } catch (error) {
      console.log("fillNameIntoSearchField");
      console.log(error);
      return false;
    }
  }

  public async assertListOfAccountUnderSearchField(accountName: string): Promise<boolean> {
    try {
      let options = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-recent-customers//formly-autocomplete//ng-dropdown-panel//div[contains(@class,'text-truncate')]`);
      let result = true;
      if (!(await this.driverService.isExisted(options))) {
        logWarningMessage(`Can't find any account with name "${accountName}"`);
        result = false;
      }
      else {
        let len = (await this.driverService.findElements(options)).length;
        for (let i = 1; i <= len; i++) {
          let lblAccountOption = By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-recent-customers//formly-autocomplete//ng-dropdown-panel//div[contains(@class,'text-truncate')])[${i}]`);
          let foundAccount = await this.driverService.getText(lblAccountOption);
          if (!(foundAccount.toLocaleLowerCase().includes(accountName.toLocaleLowerCase()))) {
            logWarningMessage(`"${foundAccount}" found didn't match with "${accountName}"!`);
            result = false;
          }
        }
      }
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  }


  //Search and Filter
  public async openSearchAndFilterForm() {
    try {
      let formSearchAndFilterExpanded = By.xpath("//div[contains(@class,'show-right-side')]");
      if (!(await this.driverService.isExisted(formSearchAndFilterExpanded))) {
        await this.driverService.waitUntilElementLoaded(this.btnSearchAndFilter);
        await this.driverService.click(this.btnSearchAndFilter);
        await this.driverService.waitUntilElementLoaded(formSearchAndFilterExpanded);
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      }
      return true;
    } catch (error) {
      console.log("openSearchAndFilterForm");
      console.log(error);
      return false;
    }
  }
  //#endregion


  //#region Methods on Account list
  public async assertSearchAndFilterAccount(
    Name: string,
    OrgNo_NIN: string,
    Email: string,
    Phone: string,
    KAM: string,
    Status: string,
    Type: string,
    Address: string,
    Postcode: string,
    City: string,
    Country: string
  ): Promise<boolean> {
    const accountForm = new AccountForm(this.driverService);
    if (!(await this.driverService.isExisted(this.lblNameAccount))) {
      logWarningMessage(`Can't find any account from below information:\n`);
      accountForm.printInputInformationSearchAndFilter(
        Name,
        OrgNo_NIN,
        Email,
        Phone,
        KAM,
        Status,
        Type,
        Address,
        Postcode,
        City,
        Country
      );
      return false;
    }
    else {

      //Assert at first account in result list
      let typeAccount = await this.openEditFormOfFirstAccountPage1();
      if (typeAccount.localeCompare('company') === 0) {
        let temp = await accountForm.validateSearchAndFilterAtCompanyAccount(
          Name,
          OrgNo_NIN,
          Email,
          Phone,
          KAM,
          Status,
          Type,
          Address,
          Postcode,
          City,
          Country
        );
        if (!temp) {
          return false;
        }
      }
      else {
        let temp = await accountForm.validateSearchAndFilterAtPersonAccount(
          Name,
          OrgNo_NIN,
          Email,
          Phone,
          KAM,
          Status,
          Type,
          Address,
          Postcode,
          City,
          Country
        );
        if (!temp) {
          return false;
        }
      }
      await this.globalPageObject.closeOpeningForm();

      //Assert at last account in result list
      typeAccount = await this.openEditFormOfLastAccountPage1();
      if (typeAccount.localeCompare('company') === 0) {
        let temp = await accountForm.validateSearchAndFilterAtCompanyAccount(
          Name,
          OrgNo_NIN,
          Email,
          Phone,
          KAM,
          Status,
          Type,
          Address,
          Postcode,
          City,
          Country
        );
        if (!temp) {
          return false;
        }
      }
      else {
        let temp = await accountForm.validateSearchAndFilterAtPersonAccount(
          Name,
          OrgNo_NIN,
          Email,
          Phone,
          KAM,
          Status,
          Type,
          Address,
          Postcode,
          City,
          Country
        );
        if (!temp) {
          return false;
        }
      }
      await this.globalPageObject.closeOpeningForm();
    }
    return true;
  }

  //#region Check for Negative test case
  public async assertPersonExistence(
    positionRow: number = 1,
    name: string,
    email: string,
    phone: string
  ) {
    if (positionRow === -1 || positionRow === -2) {
      strictEqual("", name, `Account doesn not exist "${name}"`);
    } else {
      let actualName: string = "";
      let actualEmail: string = "";
      let actualPhone: string = "";

      let txtNameAccount = By.xpath(`(//table//tr[${positionRow}]//td[contains(@class,'pgs-cus-name')]//*[self::*[text()]])[last()]`);
      let txtEmailAccount = By.xpath(`//table//tr[${positionRow}]//td[contains(@class,'pgs-cus-email')]//*[self::*[text()]]`);
      let txtPhoneAccount = By.xpath(`//table//tr[${positionRow}]//td[contains(@class,'pgs-cus-phone')]//*[self::*[text()]]`);

      try {
        if (await this.driverService.isExisted(txtNameAccount)) {
          await this.driverService.waitUntilElementLoaded(txtNameAccount);
          actualName = await this.driverService.getText(txtNameAccount);
          actualEmail = await this.driverService.getText(txtEmailAccount);
          actualPhone = await this.driverService.getText(txtPhoneAccount);
        } else {
          console.info("Not found any account in list!");
          return true;
        }
      } catch (error) {
        console.error("assertPersonExistence");
        console.error(error);
        return false;
      }
      if (actualName.localeCompare(name) === 0 &&
        actualEmail.localeCompare(email) === 0 &&
        actualPhone.localeCompare(phone) === 0) {
        logWarningMessage(name + " is created in Account list!");
        return false;
      } else {
        return true;
      }
    }
  }
  //#endregion

  //#endregion

  //#region Open Account form
  public async openEditAccountFormByName(selectedAccount: string) {
    try {
      await this.driverService.waitForSeconds(3000);
      await this.driverService.waitUntilElementLoaded(By.xpath('(//app-account-name-column//a)[1]'));
      for (let i = 1; i <= 30; i++) {
        let lblName = By.xpath(`(//app-account-name-column//a)[${i}]`);
        if ((await this.driverService.isExisted(lblName)) === false) {
          // logWarningMessage(
          //   `Can't find account with name \"${selectedAccount}\" into Account List`
          // );
        } else {
          let nameAccount = await this.driverService.getText(lblName);
          if (nameAccount.localeCompare(selectedAccount) === 0) {
            let btnEdit = By.xpath(`(//app-customer-act-column)[${i}]/button`);
            await this.driverService.waitForSeconds(1000);
            await this.driverService.click(btnEdit);
            return true;
          }
        }
      }
      await logWarningMessage(`Can't find account with name \"${selectedAccount}\" into Account List`);
      return false;
    } catch (error) {
      console.log("openEditAccountFormByName");
      console.log(error);
      return false;
    }
  }

  public async openEditAccountFormByRow(positionRow: number = 1) {
    try {
      await this.driverService.waitUntilElementLoaded(By.xpath('(//app-account-name-column//a)[1]'));
      let btnEdit = By.xpath(`(//app-customer-act-column)[${positionRow}]/button`);
      await this.driverService.waitUntilElementLoaded(btnEdit);
      await this.driverService.click(btnEdit);
      await waitUntilHorizontalProgressBarLoaded(this.driverService);
      return true;
    } catch (error) {
      console.log("openEditAccountFormByRow");
      console.log(error);
      return false;
    }
  }

  public async openEditFormOfFirstAccountPage1(): Promise<string> {
    try {
      logInfoMessage('\tOpening form edit of first Account...\n');
      await this.driverService.waitUntilElementLoaded(By.xpath('(//app-account-name-column//a)[1]'));
      let btnEdit = By.xpath(`(//app-customer-act-column/button)[1]`);
      await this.driverService.click(btnEdit);
      await waitUntilHorizontalProgressBarLoaded(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      if ((await this.driverService.isExisted(this.txtCompanyName))) {
        return 'company'
      }
      else {
        return 'person'
      }
    } catch (error) {
      console.log("openEditAccountFormByName");
      console.log(error);
      return 'undefined'
    }
  }

  public async openEditFormOfLastAccountPage1(): Promise<string> {
    try {
      logInfoMessage('\tOpening form edit of last Account...\n');
      await this.driverService.waitUntilElementLoaded(By.xpath('(//app-account-name-column//a)[1]'));
      for (let i = 30; i >= 1; i--) {
        if ((await this.driverService.isExisted(By.xpath(`(//app-account-name-column//a)[${i}]`)))) {
          let btnEdit = By.xpath(`(//app-customer-act-column/button//*[contains(@class,'fa-edit')])[${i}]`);
          await this.driverService.click(btnEdit);
          await waitUntilHorizontalProgressBarLoaded(this.driverService);
          if ((await this.driverService.isExisted(this.txtCompanyName))) {
            return 'company'
          }
          else {
            return 'person'
          }
        }
      }
      logWarningMessage(`Can't open the last account!`);
      return 'undefined'
    } catch (error) {
      console.log("openEditAccountFormByName");
      console.log(error);
      return 'undefined'
    }
  }

  //input: "person" or "company"
  public async openAccountFormByType(type: string) {
    try {
      let detailAccount = By.xpath("//table/tbody/tr[1]//app-account-name-column/div/a");
      if (type.localeCompare("company") === 0) {
        for (let i = 1; i <= 10; i++) {
          // In case person or company account has been created don't shows on top row, we must find the next account
          detailAccount = By.xpath(`//table/tbody/tr[${i}]//app-account-name-column/div/a`);
          await this.driverService.waitUntilElementLoaded(detailAccount);
          await this.driverService.click(detailAccount);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
          let check = await this.driverService.isExisted(By.xpath("//label[contains(.,'Org. No')]"));
          if (check) {
            break;
          } else {
            let count = 0;
            while (await this.driverService.isExisted(this.btnCloseAccount) && count++ < 20) {
              await this.driverService.click(this.btnCloseAccount);
            }
          }
        }
      } else {
        //if type = "person"
        for (let i = 1; i <= 10; i++) {
          // In case person or company account has been created don't shows on top row, we must find the next account
          detailAccount = By.xpath(`//table/tbody/tr[${i}]//app-account-name-column/div/a`);
          await this.driverService.waitUntilElementLoaded(detailAccount);
          await this.driverService.click(detailAccount);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
          let check = await this.driverService.isExisted(By.xpath("(//label[contains(.,'SSN')])[2]"));
          if (check) {
            break;
          } else {
            let count = 0;
            while (await this.driverService.isExisted(this.btnCloseAccount) && count++ < 20) {
              await this.driverService.click(this.btnCloseAccount);
            }
          }
        }
      }
      return true;
    } catch (error) {
      console.log("Open Edit Account Form");
      console.log(error);
      return false;
    }
  }
  //#endregion

  //#region Open detail account
  public async openDetailAccountByName(selectedAccount: string) {
    try {
      await this.reloadAccountList();
      await this.driverService.waitUntilElementLoaded(this.lblNameAccount);
      for (let i = 1; i <= 30; i++) {
        let lblName = By.xpath(`(//table//tr[${i}]//td[contains(@class,'pgs-cus-name')]//*[self::*[text()]])[last()]`);
        if (await this.driverService.isExisted(lblName)) {
          let nameAccount = await this.driverService.getText(lblName);
          if (nameAccount.localeCompare(selectedAccount) === 0) {
            await this.driverService.pressEnter(lblName);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true;
          }
        }
      }
      logWarningMessage(`Can't find account with name \"${selectedAccount}\" into Account List`);
      return false;
    } catch (error) {
      console.log("openDetailAccountByName");
      console.log(error);
      return false;
    }
  }

  public async openDetailOfFirstAccount() {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblNameAccount);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.click(this.lblNameAccount);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      return true;
    } catch (error) {
      console.log("openDetailOfFirstAccount");
      console.log(error);
      return false;
    }
  }

  public async openMaximumNumberOfTabsAtAccountList(count: number) {
    try {
      let hrefAccount = By.xpath("//table//app-account-name-column//a[(@href)]");
      await this.driverService.waitUntilElementLoaded(hrefAccount);
      let countAccount = (await this.driverService.findElements(hrefAccount)).length;

      if (countAccount <= count) {
        logWarningMessage(`Existing accounts should be > ${count} Account`);
      }
      for (let i = 0; i < count; i++) {
        hrefAccount = By.xpath(`(//table//app-account-name-column//a[(@href)])[${i + 1}]`);
        await this.driverService.click(hrefAccount);
        await waitUntilHorizontalProgressBarLoaded(this.driverService);
        await this.globalPageObject.navigateToMainAccountList();
      }
      await this.driverService.click(By.xpath(`(//table//app-account-name-column//a[(@href)])[${count + 1}]`))
    } catch (error) {
      console.log("openMaximumNumberOfTabsAtAccountList");
      console.log(error);
    }
  }
  //#endregion

  //#region Delete account
  public async DeleteAccountByName(selectedAccount: string) {
    try {
      await this.driverService.waitUntilElementLoaded(By.xpath('(//app-account-name-column//a)[1]'));
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      for (let i = 1; i <= 30; i++) {
        let lblName = By.xpath(`(//app-account-name-column//a)[${i}]`);
        if (await this.driverService.isExisted(lblName)) {
          let nameAccount = await this.driverService.getText(lblName);
          if (nameAccount.localeCompare(selectedAccount) === 0) {
            let btnDelete = By.xpath(`(//app-customer-act-column/button[2])[${i}]`);
            await this.driverService.click(btnDelete);
            let lblOrg = By.xpath(`(//td[contains(@class,'pgs-cus-ssn')]/span)[${i}]`);
            let Org = await this.driverService.getText(lblOrg);
            return Org;
          }
        }
      }
      logWarningMessage(`Can't find account with name \"${selectedAccount}\" in Account List`);
      return "";
    } catch (error) {
      console.log("Delete Account By Name");
      console.log(error);
      return "";
    }
  }

  public async DeleteAccountByRow(positionRow = 1) {
    try {
      const btnDelete = By.xpath(`(//app-customer-act-column/button[2])[${positionRow}]`);
      await this.driverService.waitUntilElementVisible(btnDelete);
      await this.driverService.click(btnDelete);
      return true;
    } catch (error) {
      console.log('DeleteAccountByRow');
      console.log(error);
      return false;
    }
  }
  //#endregion

  //#region Methods on Pagination
  public async reloadAccountList() {
    try {
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      logInfoMessage("Wait about 7s...");
      await this.driverService.waitForSeconds(7000);
      await reloadTable(this.driverService);
    } catch (error) {
      console.log(error);
    }
  }
  //#endregion

  //#region Validate/ Assert result on Account table
  public async assertCreateAccount(
    positionRow: number,
    name: string,
    email: string,
    phone: string,
    address: string,
    KAM: string,
    status: string
  ) {
    let actualName: string = "";
    let actualEmail: string = "";
    let actualPhone: string = "";
    let actualAddress: string = "";
    let actualKAM: string = "";
    let actualStatus: string = "";
    try {
      //Locator for elements at row {positionRow} of account list
      let lblNameAccount = By.xpath(`(//table//tr[${positionRow}]//td[contains(@class,'pgs-cus-name')]//*[self::*[text()]])[last()]`);
      let lblEmailAccount = By.xpath(`//table//tr[${positionRow}]//td[contains(@class,'pgs-cus-email')]//*[self::*[text()]]`);
      let lblPhoneAccount = By.xpath(`//table//tr[${positionRow}]//td[contains(@class,'pgs-cus-phone')]//*[self::*[text()]]`);
      let lblAddressAccount = By.xpath(`//table//tr[${positionRow}]//td[contains(@class,'pgs-cus-address')]//*[self::*[text()]]`);
      let lblKAM = By.xpath(`//table//tr[${positionRow}]//td[contains(@class,'pgs-cus-kam')]//*[self::*[text()]]`);
      let lblStatusAccount = By.xpath(`//table//tr[${positionRow}]//td[contains(@class,'pgs-cus-status')]//*[self::*[text()]]`);

      await this.driverService.waitUntilElementLoaded(lblNameAccount);
      await this.driverService.waitForSeconds(5000);
      actualName = await (
        await this.driverService.findElement(lblNameAccount)
      ).getText();
      actualEmail = await (
        await this.driverService.findElement(lblEmailAccount)
      ).getText();
      actualPhone = await (
        await this.driverService.findElement(lblPhoneAccount)
      ).getText();
      actualAddress = await (
        await this.driverService.findElement(lblAddressAccount)
      ).getText();
      if (KAM) {
        actualKAM = await this.driverService.getText(lblKAM);
      } else {
        actualKAM = "N/A";
      }
      if (status) {
        actualStatus = await (
          await this.driverService.findElement(lblStatusAccount)
        ).getText();
      } else {
        actualStatus = "";
      }
    } catch (error) {
      console.log("Assert Create account");
      console.log(error);
    }

    await this.driverService.validateTestCase(
      "Create account successfully!",
      [actualName, name, "Assert at Name: Incorrect Name!"],
      [actualEmail, email || "N/A", "Assert at Email: Incorrect Email!"],
      [actualPhone, phone, "Assert at Phone: Incorrect Phone!"],
      [actualAddress, address || "N/A", "Assert at Address: Incorrect Address!"],
      [actualKAM, KAM || "N/A", "Assert at KAM: Incorrect KAM!"],
      [actualStatus, status, "Assert at Status: Incorrect Status!"]
    );
  }

  public async assertEditAccount(
    positionRow: number,
    name: string,
    email: string,
    phone: string,
    address: string,
    KAM: string,
    status: string
  ) {
    let actualName: string = "";
    let actualEmail: string = "";
    let actualPhone: string = "";
    let actualAddress: string = "";
    let actualKAM: string = "";
    let actualStatus: string = "";
    try {
      //Locator for elements at row {positionRow} of account list
      let txtNameAccountEdit = By.xpath(`(//table//tr[${positionRow}]//td[contains(@class,'pgs-cus-name')]//*[self::*[text()]])[last()]`);
      let txtEmailAccountEdit = By.xpath(`//table//tr[${positionRow}]//td[contains(@class,'pgs-cus-email')]//*[self::*[text()]]`);
      let txtPhoneAccountEdit = By.xpath(`//table//tr[${positionRow}]//td[contains(@class,'pgs-cus-phone')]//*[self::*[text()]]`);
      let txtAddressAccountEdit = By.xpath(`//table//tr[${positionRow}]//td[contains(@class,'pgs-cus-address')]//*[self::*[text()]]`);
      let txtKAMAccountEdit = By.xpath(`//table//tr[${positionRow}]//td[contains(@class,'pgs-cus-kam')]//*[self::*[text()]]`);
      let txtStatusAccountEdit = By.xpath(`//table//tr[${positionRow}]//td[contains(@class,'pgs-cus-status')]//*[self::*[text()]]`);

      await reloadTable(this.driverService);
      await this.driverService.waitUntilElementLoaded(txtNameAccountEdit);

      actualName = await this.driverService.getText(txtNameAccountEdit);
      //actualNIN = await (await this.driverService.findElement(txtNINAccountEdit)).getText();
      actualEmail = await this.driverService.getText(txtEmailAccountEdit);
      actualPhone = await this.driverService.getText(txtPhoneAccountEdit);
      actualAddress = await this.driverService.getText(txtAddressAccountEdit);
      actualKAM = await this.driverService.getText(txtKAMAccountEdit);
      actualStatus = await this.driverService.getText(txtStatusAccountEdit);
    } catch (error) {
      console.log("Assert Edit account");
      console.log(error);
    }
    await this.driverService.validateTestCase(
      "[TC] [Accounts] Update account successfully",
      [actualName, name, "Assert at Name: Incorrect Name!"],
      [actualEmail, email, "Assert at Email: Incorrect Email!"],
      [actualPhone, phone, "Assert at Phone: Incorrect Phone!"],
      [actualAddress, address, "Assert at Address: Incorrect Address!"],
      [actualKAM, KAM, "Assert at KAM: Incorrect KAM!"],
      [actualStatus, status, "Assert at Status: Incorrect Status!"]
    );
  }

  public async assertAccountlist(
    positionRow: number,
    name: string,

  ) {
    let actualName: string = "";

    try {
      await this.driverService.waitForSeconds(5000);
      //await waitUntilHorizontalProgressBarLoaded(this.driverService);
      //Locator for elements at row {positionRow} of account list
      let txtNameAccount = By.xpath(
        `(//li[@ngbnavitem='main-tab']/following-sibling::li/a)[${positionRow}]`
      );
      await this.driverService.waitUntilElementLoaded(txtNameAccount);
      //await waitUntilHorizontalProgressBarLoaded(this.driverService);

      actualName = await this.driverService.getText(txtNameAccount);
      //actualNIN = await (await this.driverService.findElement(txtNINAccountEdit)).getText();
    } catch (error) {
      console.log("Assert Name");
      console.log(error);
    }
    await this.driverService.validateTestCase(
      "Account list",
      [actualName, name, "Assert at Name: Incorrect Name!"]
    );
  }

  public async isOrgAccountExisted(org: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblNINAccount);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      const lblOrg = By.xpath(`//td[contains(@class,'pgs-cus-ssn')]/span[text()=' ${org} ']`);
      return await this.driverService.isExisted(lblOrg);
    } catch (error) {
      console.log("isOrgAccountExisted");
      console.log(error);
      return false;
    }
  }

  public async assertConvertLead(
    name: string,
    nin: string,
    email: string,
    phone: string,
    address: string,
    status: string
  ) {
    let actualName: string = "";
    let actualNIN: string = "";
    let actualEmail: string = "";
    let actualPhone: string = "";
    let actualAddress: string = "";
    let actualStatus: string = "";

    try {
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.waitForSeconds(2000);
      await this.driverService.waitUntilElementLoaded(this.lblNameAccount);
      actualName = await this.driverService.getText(this.lblNameAccount);
      actualNIN = await this.driverService.getText(this.lblNINAccount);
      actualEmail = await this.driverService.getText(this.lblEmailAccount);
      actualPhone = await this.driverService.getText(this.lblPhoneAccount);
      actualAddress = await this.driverService.getText(this.lblAddressAccount);
      actualStatus = await this.driverService.getText(this.lblStatusAccount);
    } catch (error) {
      console.log("Assert convert lead");
      console.log(error);
    }

    await this.driverService.validateTestCase(
      "Convert lead successfully!",
      [actualName, name, "Assert at Name"],
      [actualNIN, nin, "Assert at NIN"],
      [actualEmail, email, "Assert at Email"],
      [actualPhone, phone, "Assert at Phone"],
      [actualAddress, address, "Assert at Address"],
      [actualStatus, status, "Assert at Status"]
    );
  }
  //#endregion




  //#region Verify UI element at Account list
  public async verifyButtonsOnTopOfAccountTable() {
    let countError = 0;
    try {
      logInfoMessage("\tVerify buttons at Account list:");
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);

      //Verify "Create" button
      if (!(await this.driverService.isExisted(this.btnCreateNewAccount))) {
        logWarningMessage(`'Can't find "Create" button on Account list`);
        countError++;
      }

      //Verify "Add to target group" button
      /*if(!(await this.driverService.isExisted(this.btnAddToTargetGroup))){
        logWarningMessage(`'Can't find "Add to target group" button on Account list`);
        countError++;
      }
      else{
        let temp = By.xpath("//button[@id='pgs-recent-cus-add-to-group' and not(@disabled)]");
        if((await this.driverService.isExisted(temp))){
          logWarningMessage("\"Add to target group\" button should be disabled!");
          countError++;
        }
      }*/

      //Verify "Import account" button
      if (!(await this.driverService.isExisted(this.btnImportAccount))) {
        logWarningMessage(`'Can't find "Import account" button on Account list`);
        countError++;
      }

      // //Verify "Export account" button
      // if (!(await this.driverService.isExisted(this.btnExportAccount))) {
      //   logWarningMessage(`'Can't find "Export account" button on Account list`);
      //   countError++;
      // }

      //Verify "More" button
      if (!(await this.driverService.isExisted(this.btnMore))) {
        logWarningMessage(`'Can't find "More" button on Account list`);
        countError++;
      }
      else {
        let expandedStatus = await this.driverService.getAttributeValue(this.btnMore, "aria-expanded");
        if (expandedStatus.localeCompare("true") === 0) {
          logWarningMessage("\"More\" button should not be expanded!");
          countError++;
        }
      }


    } catch (error) {
      console.log("verifyButtonsOnTopOfAccountTable");
      console.log(error);
      this.driverService.takeScreenShot("verifyButtonsOnTopOfAccountTable");
    }
    if (countError > 0) {
      fail("Verify buttons on top of Account table failed!");
    }
    else {
      logSuccessMessage("\tPassed");
    }
  }

  public async verifyColumnsOfAccountTable() {
    let countError = 0;
    try {
      logInfoMessage('\tVerify columns of Account list:');
      //Verify "Action" column
      let titleAction = By.xpath("//table//th//span[text()='Action']");
      if (!(await this.driverService.isExisted(titleAction))) {
        logWarningMessage(`Account list is missing "Action" column!`);
        countError++;
      }

      //Verify "NIN/ORG NO." column
      let titleNIN_OrgNo = By.xpath("//table//th//span[text()='NIN/Org no.']");
      if (!(await this.driverService.isExisted(titleNIN_OrgNo))) {
        logWarningMessage(`Account list is missing "NIN/ORG NO." column!`);
        countError++;
      }

      //Verify "Email" column
      let titleEmail = By.xpath("//table//th//span[text()='Email']");
      if (!(await this.driverService.isExisted(titleEmail))) {
        logWarningMessage(`Account list is missing "Email" column!`);
        countError++;
      }

      //Verify "Phone" column
      let titlePhone = By.xpath("//table//th//span[text()='Phone']");
      if (!(await this.driverService.isExisted(titlePhone))) {
        logWarningMessage(`Account list is missing "Phone" column!`);
        countError++;
      }

      //Verify "Address" column
      let titleAddress = By.xpath("//table//th//span[text()='Address']");
      if (!(await this.driverService.isExisted(titleAddress))) {
        logWarningMessage(`Account list is missing "Address" column!`);
        countError++;
      }

      //Verify "KAM" column
      let titleKAM = By.xpath("//table//th//span[text()='KAM']");
      if (!(await this.driverService.isExisted(titleKAM))) {
        logWarningMessage(`Account list is missing "KAM" column!`);
        countError++;
      }

      //Verify "Status" column
      let titleStatus = By.xpath("//table//th//span[text()='Status']");
      if (!(await this.driverService.isExisted(titleStatus))) {
        logWarningMessage(`Account list is missing "Status" column!`);
        countError++;
      }

      //Verify "Name" column
      let titleName = By.xpath("//table//th//span[text()='Name']");
      if (!(await this.driverService.isExisted(titleName))) {
        logWarningMessage(`Account list is missing "Name" column!`);
        countError++;
      }
      else {
        //Do we need check sort at Name column
      }

    } catch (error) {
      console.log("verifyColumnsOfAccountTable");
      console.log(error);
      this.driverService.takeScreenShot("verifyColumnsOfAccountTable");
    }

    if (countError > 0) {
      fail("Verify columns of Account table failed!");
    }
    else {
      logSuccessMessage("\tPassed");
    }
  }

  public async verifyErrorMessageWhenOpenMaximumNumberOfTabsAtAccountList() {
    let actualErrorMessage = "";
    let expectedErrorMessage = "Unable to open a new tab. The maximum number of tabs (5) has been reached. Please close some tabs and then try again.";
    try {
      await this.driverService.waitUntilElementLoaded(toastError);
      actualErrorMessage = (await this.driverService.getText(toastError)).toString().trim();
    } catch (error) {
      console.log("verifyErrorMessageWhenOpenMaximumNumberOfTabsAtAccountList");
      console.log(error);
    }
    await this.driverService.validateTestCase(scenarioName,
      [actualErrorMessage, expectedErrorMessage, "Assert error message: Incorrect Error message!"]
    );

    await this.globalPageObject.closeAllOpeningEntities();
  }
  //#endregion

  //#region Column config
  public async pressColumnConfig() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnColumConfig);
      await this.driverService.click(this.btnColumConfig);
      return true;
    } catch (error) {
      console.log("Colmn Config");
      console.log(error);
      return false;
    }
  }

  public async checkColumn(column: string, isSelect: string) {
    try {
      if (isSelect.localeCompare("yes") === 0) {
        let checkBox = By.xpath(
          `//div[contains(@class,'dropdown-table-config') and contains(@class,'show')]//span[text()='${column}']/parent::label`
        );
        if ((await this.driverService.isExisted(checkBox))) {
          await this.driverService.scrollElementToView(await this.driverService.findElement(checkBox));
          await this.driverService.pressUpCurrentElement();
          console.log("Uncheck at:  " + column);
          await this.driverService.waitForSeconds(1000);
          await this.driverService.click(checkBox);
        }
      }
      //await this.driverService.waitForSeconds(2000);
    } catch (error) {
      console.log("checkField");
      console.log(error);
    }
  }
  public async assertColumn(
    column: string,
    isSelect: string
  ): Promise<boolean> {
    let result: boolean = true;
    try {
      let checkColumnStatus = By.xpath(
        `//table//tr//span[text()='${column}']`
      );
      if (isSelect.localeCompare("no") === 0) {
        if (await this.driverService.isExisted(checkColumnStatus)) {
          result = true;
        } else {
          console.error(
            "\x1b[33m%s\x1b[0m",
            `Assert at ${column}: Incorrect ${column}`,
            "\x1b[0m"
          );
          result = false;
        }
      }

      if (isSelect.localeCompare("yes") === 0) {
        if (!(await this.driverService.isExisted(checkColumnStatus))) {
          result = true;
        } else {
          console.error(
            "\x1b[33m%s\x1b[0m",
            `Assert at ${column}: Incorrect ${column}`,
            "\x1b[0m"
          );
          result = false;
        }
      }
    } catch (error) {
      console.log("Assert Column");
      console.log(error);
      return false;
    }
    return result;
  }
  //#endregion

  //#region Validate fields on list for Search Filter
  public async validateSearchAndFilterName(name: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblNameAccount);
      let actualName = (await this.driverService.getText(this.lblNameAccount)).toLowerCase();
      return actualName.includes(name.toLowerCase());
    } catch (error) {
      console.log("validateSearchAndFilterName");
      console.log(error);
      return false;
    }
  }

  public async validateSearchAndFilterOrgNo(OrgNo: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblNINAccount);
      let actualOrgNo = (await this.driverService.getText(this.lblNINAccount)).toLowerCase();
      return actualOrgNo.includes(OrgNo.toLowerCase());
    } catch (error) {
      console.log("validateSearchAndFilterOrgNo");
      console.log(error);
      return false;
    }
  }

  public async validateSearchAndFilterEmail(email: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblEmailAccount);
      let actualEmail = (await this.driverService.getText(this.lblEmailAccount)).toLowerCase();
      return actualEmail.includes(email.toLowerCase());
    } catch (error) {
      console.log("validateSearchAndFilterEmail");
      console.log(error);
      return false;
    }
  }
  public async validateSearchAndFilterPhone(phone: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblPhoneAccount);
      let actualEmail = (await this.driverService.getText(this.lblPhoneAccount)).toLowerCase();
      return actualEmail.includes(phone.toLowerCase());
    } catch (error) {
      console.log("validateSearchAndFilterPhone");
      console.log(error);
      return false;
    }
  }

  public async validateSearchAndFilterAddress(address: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblAddressAccount);
      let actualAddress = (await this.driverService.getText(this.lblAddressAccount)).toLowerCase();
      return actualAddress.includes(address.toLowerCase());
    } catch (error) {
      console.log("validateSearchAndFilterAddress");
      console.log(error);
      return false;
    }
  }
  public async validateSearchAndFilterKAM(KAM: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblKAMAccount);
      let actualKAM = (await this.driverService.getText(this.lblKAMAccount)).toLowerCase();
      return actualKAM.includes(KAM.toLowerCase());
    } catch (error) {
      console.log("validateSearchAndFilterKAM");
      console.log(error);
      return false;
    }
  }

  public async validateSearchAndFilterStatus(status: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblStatusAccount);
      let actualStatus = (await this.driverService.getText(this.lblStatusAccount)).toLowerCase();
      return actualStatus.includes(status.toLowerCase());
    } catch (error) {
      console.log("validateSearchAndFilterStatus");
      console.log(error);
      return false;
    }
  }
  //#endregion

  public async verifyCreateAndOtherButtonsOnTopOfAccountTable(itemList: string[], flag: string[], extra: boolean, extraFlag?: string) {
    let result: any[] = [];
    try {
      await this.driverService.waitUntilElementLoaded(By.xpath(`//app-customer-page`));
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      let options = await this.driverService.findElements(By.xpath(`//app-customer-page//button[(contains(@id,"pgs-recent-cus") and contains(@class,"btn-default")) or (contains(@id,"create-customer"))]`));
      let allOptions: string[] = [];
      for (const option of await options) {
        let text = await option.getText();
        allOptions.push(text.toUpperCase());;
      }

      for (var i = 0; i < itemList.length; i++) {
        let temp: string;
        if (flag[i] == "Yes" || flag[i] == "No" || flag[i] == "Optional") {
          if (allOptions.includes(itemList[i])) {
            temp = "Yes";
          } else {
            temp = "No";
          }
          result.push(new resultColumn("Accounts", `4 - ${i + 1}`, itemList[i] + ` button`, flag[i], temp, getCurrentDateTime(), ""));
        }
      }
      let extraOptions = allOptions.filter(option => !itemList.includes(option));

      if (extra) {
        for (var j = 0; j < extraOptions.length; j++) {
          let temp: string;
          if (allOptions.includes(extraOptions[j])) {
            temp = "Yes";
          } else {
            temp = "No";
          }
          if (extraFlag == "Yes" || extraFlag == "No" || extraFlag == "Optional") {
            result.push(new resultColumn("Accounts", `4 - ${itemList.length + j + 1}`, extraOptions[j] + ` button`, extraFlag, temp, getCurrentDateTime(), "Extra items"))
          }
        }
      }

      return result;
    } catch (error) {
      console.log(`verifyOtherButtonsOnTopOfAccountTable`);
      console.log(error);
      return result;
    }
  }

  //#region Get value on Account list
  public async getValueNameOnAccountListByRow(positionRow: number = 1) {
    try {
      const lblValue = By.xpath(`(//table//tr[${positionRow}]//td[contains(@class,'pgs-cus-name')]//*[self::*[text()]])[last()]`);
      await this.driverService.waitUntilElementLoaded(lblValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      return await this.driverService.getText(lblValue);
    } catch (error) {
      console.log('getValueNameOnAccountListByRow');
      console.log(error);
      return "";
    }
  }

  public async getValueReferenceOnAccountListByRow(positionRow: number = 1) {
    try {
      const lblValue = By.xpath(`//table//tr[${positionRow}]//td[contains(@class,'pgs-cus-reference')]//*[self::*[text()]]`);
      await this.driverService.waitUntilElementLoaded(lblValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      return await this.driverService.getText(lblValue);
    } catch (error) {
      console.log('getValueReferenceOnAccountListByRow');
      console.log(error);
      return "";
    }
  }

  public async getValueOrgOnAccountListByRow(positionRow: number = 1) {
    try {
      const lblValue = By.xpath(`//table//tr[${positionRow}]//td[contains(@class,'pgs-cus-ssn')]//*[self::*[text()]]`);
      await this.driverService.waitUntilElementLoaded(lblValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      return await this.driverService.getText(lblValue);
    } catch (error) {
      console.log('getValueOrgOnAccountListByRow');
      console.log(error);
      return "";
    }
  }

  public async getValueStatusOnAccountListByRow(positionRow: number = 1) {
    try {
      const lblValue = By.xpath(`//table//tr[${positionRow}]//td[contains(@class,'pgs-cus-status')]//*[self::*[text()]]`);
      await this.driverService.waitUntilElementLoaded(lblValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      return await this.driverService.getText(lblValue);
    } catch (error) {
      console.log('getValueStatusOnAccountListByRow');
      console.log(error);
      return "";
    }
  }
  //#endregion

  //#region validate value on list
  public async validateNameOnAccountList(ExpectedValue: string, positionRow = 1) {
    try {
      const lblActualValue = By.xpath(`(//table//tr[${positionRow}]//td[contains(@class,'pgs-cus-name')]//*[self::*[text()]])[last()]`);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const actualValue = await this.driverService.getText(lblActualValue);
      return await this.driverService.validateRecord(`Validate Name at line ${positionRow}: `,
        [actualValue, ExpectedValue, `Incorrect Name`]
      );
    } catch (error) {
      console.log('validateNameOnAccountList');
      console.log(error);
      return false;
    }
  }

  public async validateEmailOnAccountList(ExpectedValue: string, positionRow = 1) {
    try {
      const lblActualValue = By.xpath(`//table//tr[${positionRow}]//td[contains(@class,'pgs-cus-email')]//*[self::*[text()]]`);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const actualValue = await this.driverService.getText(lblActualValue);
      return await this.driverService.validateRecord(`Validate Email at line ${positionRow}: `,
        [actualValue, ExpectedValue, `Incorrect Email`]
      );
    } catch (error) {
      console.log('validateEmailOnAccountList');
      console.log(error);
      return false;
    }
  }

  public async validatePhoneOnAccountList(ExpectedValue: string, positionRow = 1) {
    try {
      const lblActualValue = By.xpath(`//table//tr[${positionRow}]//td[contains(@class,'pgs-cus-phone')]//*[self::*[text()]]`);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const actualValue = await this.driverService.getText(lblActualValue);
      return await this.driverService.validateRecord(`Validate Phone at line ${positionRow}: `,
        [actualValue, ExpectedValue, `Incorrect Phone`]
      );
    } catch (error) {
      console.log('validatePhoneOnAccountList');
      console.log(error);
      return false;
    }
  }

  public async validateAddressOnAccountList(ExpectedValue: string, positionRow = 1) {
    try {
      const lblActualValue = By.xpath(`//table//tr[${positionRow}]//td[@class = 'pgs-cus-address']//*[self::*[text()]]`);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const actualValue = await this.driverService.getText(lblActualValue);
      return await this.driverService.validateRecord(`Validate Address at line ${positionRow}: `,
        [actualValue, ExpectedValue, `Incorrect Address`]
      );
    } catch (error) {
      console.log('validateAddressOnAccountList');
      console.log(error);
      return false;
    }
  }

  public async validateExtraAddressOnAccountList(ExpectedValue: string, positionRow = 1) {
    try {
      const lblActualValue = By.xpath(`//table//tr[${positionRow}]//td[contains(@class,'pgs-cus-address-extra')]//*[self::*[text()]]`);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const actualValue = await this.driverService.getText(lblActualValue);
      return await this.driverService.validateRecord(`Validate ExtraAddress at line ${positionRow}: `,
        [actualValue, ExpectedValue, `Incorrect ExtraAddress`]
      );
    } catch (error) {
      console.log('validateExtraAddressOnAccountList');
      console.log(error);
      return false;
    }
  }

  public async validatePostcodeOnAccountList(ExpectedValue: string, positionRow = 1) {
    try {
      const lblActualValue = By.xpath(`//table//tr[${positionRow}]//td[contains(@class,'pgs-cus-postcode')]//*[self::*[text()]]`);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const actualValue = await this.driverService.getText(lblActualValue);
      return await this.driverService.validateRecord(`Validate Postcode at line ${positionRow}: `,
        [actualValue, ExpectedValue, `Incorrect Postcode`]
      );
    } catch (error) {
      console.log('validatePostcodeOnAccountList');
      console.log(error);
      return false;
    }
  }

  public async validateCityOnAccountList(ExpectedValue: string, positionRow = 1) {
    try {
      const lblActualValue = By.xpath(`//table//tr[${positionRow}]//td[contains(@class,'pgs-cus-city')]//*[self::*[text()]]`);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const actualValue = await this.driverService.getText(lblActualValue);
      return await this.driverService.validateRecord(`Validate City at line ${positionRow}: `,
        [actualValue, ExpectedValue, `Incorrect City`]
      );
    } catch (error) {
      console.log('validateCityOnAccountList');
      console.log(error);
      return false;
    }
  }

  public async validateKAMOnAccountList(ExpectedValue: string, positionRow = 1) {
    try {
      const lblActualValue = By.xpath(`//table//tr[${positionRow}]//td[contains(@class,'pgs-cus-kam')]//*[self::*[text()]]`);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const actualValue = await this.driverService.getText(lblActualValue);
      return await this.driverService.validateRecord(`Validate KAM at line ${positionRow}: `,
        [actualValue, ExpectedValue, `Incorrect KAM`]
      );
    } catch (error) {
      console.log('validateKAMOnAccountList');
      console.log(error);
      return false;
    }
  }

  public async validateStatusOnAccountList(ExpectedValue: string, positionRow = 1) {
    try {
      const lblActualValue = By.xpath(`//table//tr[${positionRow}]//td[contains(@class,'pgs-cus-status')]//*[self::*[text()]]`);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const actualValue = await this.driverService.getText(lblActualValue);
      return await this.driverService.validateRecord(`Validate Status at line ${positionRow}: `,
        [actualValue, ExpectedValue, `Incorrect Status`]
      );
    } catch (error) {
      console.log('validateStatusOnAccountList');
      console.log(error);
      return false;
    }
  }

  //#endregion

  public async selectAll(): Promise<void> {
    const locTable = By.css(".table.c-table.table-striped.table-hover");
    let eleTable = await this.getFieldType(locTable);
    await (eleTable as TableManager).selectAllCheckbox();
    await this.driverService.waitForElementEnabled(this.btnAddToTargetGroup);
  }

  public async selectAccountByName(Name: string) {
    try {
      const TableRow = By.css("*[class='table c-table table-striped table-hover']:last-child");
      let elementTable = await this.getFieldType(TableRow);
      await (elementTable as TableManager).setCheckboxStateByValue(Name);
      return true;
    } catch (error) {
      console.log(`selectAccountByName`);
      console.log(error);
      return false;
    }

  }
  public async clickBtnAddToTargetGroup(): Promise<void> {
    const ele = await this.getFieldType(this.btnAddToTargetGroup);
    await ele.click();
    await this.waitForModalPopupDisplayed();
  }
}



