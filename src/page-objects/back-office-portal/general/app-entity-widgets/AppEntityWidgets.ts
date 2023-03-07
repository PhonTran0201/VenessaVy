import { notStrictEqual, strictEqual } from "assert";
import { By } from "selenium-webdriver";
import { BasePage } from "../../../../core/BasePage";
import { logWarningMessage, waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../shared/functions";
import { scenarioName } from "../../../../shared/variables";


/**
 * Widgets at Summary tab of entities details as Account, Lead, Sale,...
 */
export class AppEntityWidgets extends BasePage {

  private btnManageLayout = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-summary//button[contains(@id,'btn-more-action-summary')]`);
  private btnRefeshSummaryPage = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-summary//button[contains(@class,'btn-circle-transparent')]//i[contains(@class,'fa-sync')]`);

  private btnAddMember_HouseholdWidget = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-household-widget//button[.//i[contains(@class,'fa-plus')]]`);
  private btnRefresh_HouseholdWidget = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-household-widget//button[.//i[contains(@class,'fa-sync')]]`);

  public async refeshSummaryPage() {
    try {
      let element = await this.getFieldType(this.btnRefeshSummaryPage);
      await element.click();
      await waitUntilHorizontalProgressBarLoaded(this.driverService);
      return true;
    } catch (error) {
      console.log(`refeshSummaryPage`);
      console.log(error);
      return false;
    }
  }

  //#region Manage layouts


  public async pressManageLayout() {
    try {
      let element = await this.getFieldType(this.btnManageLayout);
      await element.click();
      return true;
    } catch (error) {
      console.log(`pressManageLayout`);
      console.log(error);
      return false;
    }
  }

  public async editCurrentView() {
    try {
      await this.pressManageLayout();
      let btnEdit = By.xpath(`//div[@ngbdropdownmenu]//button[@id='pgs-change-setting-btn']`);
      let element = await this.getFieldType(btnEdit);
      await element.click();
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      return true;
    } catch (error) {
      console.log(`editCurrentView`);
      console.log(error);
      return false;
    }
  }

  public async holdOnWidgetAndDragToSummaryLayout(widgetName: string) {
    try {
      await this.driverService.waitUntilElementLoaded(By.xpath(`//app-toolbar//div[@id='widget-list']`));
      let widgetElement = By.xpath(`//app-toolbar//div[@id='widget-list']//div[contains(text(),'${widgetName}')]`);
      let SummaryLayout = By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-main-editor//div[contains(@class,'add-column')])[1]`)
      await this.driverService.dragAndDrop(widgetElement, SummaryLayout);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  //#endregion



  public async assertEmptyQuotesWidget() {
    try {
      await this.driverService.waitUntilElementLoaded(By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-latest-quote"));
      let imgNoDataHere = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-latest-quote//img[@alt='No data here']");
      let txtNoDataHere = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-latest-quote//p[text()='No data here']");

      if (!(await this.driverService.isExisted(imgNoDataHere)) || !(await this.driverService.isExisted(txtNoDataHere))) {
        logWarningMessage("Quotes widget should be empty data!");
        return false;
      }
      return true;
    } catch (error) {
      console.log("assertEmptyQuotesWidget");
      console.log(error);
      return false;
    }
  }

  public async assertEmptyPoliciesWidget(): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-latest-policy"));
      let imgNoDataHere = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-latest-policy//img[@alt='No data here']");
      let txtNoDataHere = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-latest-policy//p[text()='No data here']");

      if (!(await this.driverService.isExisted(imgNoDataHere)) || !(await this.driverService.isExisted(txtNoDataHere))) {
        logWarningMessage("Policies widget should be empty data!");
        return false;
      }
      return true;
    } catch (error) {
      console.log("assertEmptyPoliciesWidget");
      console.log(error);
      return false;
    }
  }

  public async assertEmptySalesWidget(): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-sales-widget"));
      let imgNoDataHere = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-sales-widget//img[@alt='No data here']");
      let txtNoDataHere = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-sales-widget//p[text()='No data here']");

      if (!(await this.driverService.isExisted(imgNoDataHere)) || !(await this.driverService.isExisted(txtNoDataHere))) {
        logWarningMessage("Sales widget should be empty data!");
        return false;
      }
      return true;
    } catch (error) {
      console.log("assertEmptySalesWidget");
      console.log(error);
      return false;
    }
  }

  public async assertEmptyNotesWidget(): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-entity-note-list-widget"));
      let imgNoDataHere = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-entity-note-list-widget//img[@alt='No data here']");
      let txtNoDataHere = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-entity-note-list-widget//div[text()='No data here']");

      if (!(await this.driverService.isExisted(imgNoDataHere)) || !(await this.driverService.isExisted(txtNoDataHere))) {
        logWarningMessage("Notes widget should be empty data!");
        return false;
      }
      return true;
    } catch (error) {
      console.log("assertEmptyNotesWidget");
      console.log(error);
      return false;
    }
  }

  //#region Case widget
  public async assertEmptyCasesWidget(): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-entity-task-widget"));
      let imgNoDataHere = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-entity-task-widget//img[@alt='No data here']");
      let txtNoDataHere = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-entity-task-widget//p[text()='No data here']");

      if (!(await this.driverService.isExisted(imgNoDataHere)) || !(await this.driverService.isExisted(txtNoDataHere))) {
        logWarningMessage("Cases widget should be empty data!");
        return false;
      }
      return true;
    } catch (error) {
      console.log("assertEmptyCasesWidget");
      console.log(error);
      return false;
    }
  }

  public async assertCaseSummary(positionRow: number = 1, ExpectedName: string) {
    try {
      let newName = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-entity-task-widget//li[${positionRow}]//a`);
      await this.driverService.waitUntilElementVisible(newName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      const actualName = await this.driverService.getText(newName);
      return await this.driverService.validateRecord(
        "Validate Name Case",
        [actualName, ExpectedName, "Assert at Name: Incorrect Name!"]
      );
    } catch (error) {
      console.log("Assert Create!");
      console.log(error);
      return false;
    }
  }

  public async assertDeleteCaseSummary(
    positionRow: number = 1,
    name: string,
  ) {
    if (positionRow === -1 || positionRow === -2) {
      strictEqual("", name, `Test failed: can't find or delete case "${name}"`);
    } else {
      let actualName: string = "";
      let txtName = By.xpath(`//app-entity-task-widget//li[${positionRow}]/div/div/div/div/a`);

      try {
        if (await this.driverService.isExisted(txtName)) {
          await this.driverService.waitUntilElementLoaded(txtName);
          actualName = await (
            await this.driverService.findElement(txtName)
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
    }
  }


  public async validateCaseTitleOnCaseWidget(ExpectedValue: string, positionRow = 1) {
    try {
      const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-entity-task-widget//li[${positionRow}]//a`);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const actualValue = await this.driverService.getText(lblActualValue);
      return await this.driverService.validateRecord("Validate CaseTitle",
        [actualValue, ExpectedValue, "Incorrect CaseTitle!"]
      );
    } catch (error) {
      console.log('validateCaseTitleOnCaseWidget');
      console.log(error);
      return false;
    }
  }

  public async validateCreatedDateOnCaseWidget(ExpectedValue: string, positionRow = 1) {
    try {
      const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-entity-task-widget//li[${positionRow}]//*[contains(text(),'Created date: ')]`);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      let actualValue = (await this.driverService.getText(lblActualValue)).replace("Created date: ", "").trim();
      //Maximize delay time is 3 minutes.
      if (actualValue.localeCompare(ExpectedValue) !== 0) {
        if (Number(ExpectedValue.substring(14, 16)) - Number(actualValue.substring(14, 16)) < 3) {
          actualValue = ExpectedValue;
        }
      }
      return await this.driverService.validateRecord("Validate Created date",
        [actualValue, ExpectedValue, "Incorrect Created date!"]
      );
    } catch (error) {
      console.log('validateCreatedDateOnCaseWidget');
      console.log(error);
      return false;
    }
  }

  //#endregion

  public async assertEmptyEmailsWidget(): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-mail-widget"));
      let imgNoDataHere = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-mail-widget//img[@alt='No data here']");
      let txtNoDataHere = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-mail-widget//p[text()='No data here']");

      if (!(await this.driverService.isExisted(imgNoDataHere)) || !(await this.driverService.isExisted(txtNoDataHere))) {
        logWarningMessage("Email widget should be empty data!");
        return false;
      }
      return true;
    } catch (error) {
      console.log("assertEmptyEmailsWidget");
      console.log(error);
      return false;
    }
  }

  public async assertEmptyCallLogsWidget(): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-entity-call-log-widget"));
      let imgNoDataHere = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-entity-call-log-widget//img[@alt='No data here']");
      let txtNoDataHere = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-entity-call-log-widget//p[text()='No data here']");

      if (!(await this.driverService.isExisted(imgNoDataHere)) || !(await this.driverService.isExisted(txtNoDataHere))) {
        logWarningMessage("Call logs widget should be empty data!");
        return false;
      }
      return true;
    } catch (error) {
      console.log("assertEmptyCallLogsWidget");
      console.log(error);
      return false;
    }
  }

  public async assertEmptyContactsWidget(): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-contact-widget"));
      let imgNoDataHere = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-contact-widget//img[@alt='No data here']");
      let txtNoDataHere = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-contact-widget//p[text()='No data here']");

      if (!(await this.driverService.isExisted(imgNoDataHere)) || !(await this.driverService.isExisted(txtNoDataHere))) {
        logWarningMessage("Contacts widget should be empty data!");
        return false;
      }
      return true;
    } catch (error) {
      console.log("assertEmptyContactsWidget");
      console.log(error);
      return false;
    }
  }

  public async assertActivityLogsWidget(): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-eventlogs"));
      await this.driverService.waitForSeconds(3000);
      let lblEvent_1 = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-eventlogs//div[text()=' Customer has been created']");

      if (!(await this.driverService.isExisted(lblEvent_1))) {
        logWarningMessage(`Activity logs widget: Not found "Customer has been created" event!`);
        return false;
      }
      return true;
    } catch (error) {
      console.log("assertActivityLogsWidget");
      console.log(error);
      return false;
    }
  }

  //#region Contact Widget
  public async assertContactsWidget(arrayContact: any[]): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-contact-widget"));
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      let countError = 0;
      for (let i = 0; i < arrayContact.length; i++) {
        let lblName = By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-contact-widget//a[contains(@class,'text-body')])[${i + 1}]`);
        let lblPhone = By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-contact-widget//small)[${i + 1}]`);

        let actualName = await this.driverService.getText(lblName);
        let actualPhone = await this.driverService.getText(lblPhone);

        let temp = await this.driverService.validateRecord(`assert Contacts Widget: Contacts ${i + 1}`,
          [actualName, arrayContact[i].Name, "Assert at Name: Incorrect Name!"],
          [actualPhone, "Phone: " + arrayContact[i].Phone.toString(), "Assert at Phone: Incorrect Phone!"]
        );
        if (!temp) {
          countError++;
        }
      }
      if (countError > 0) {
        logWarningMessage("Assert contact widget failed!");
        return false;
      }
      return true;
    } catch (error) {
      console.log("assertEmptyContactsWidget");
      console.log(error);
      return false;
    }
  }

  public async assertContactSummary(
    positionRow: number = 1,
    name: string,
  ) {
    let actualName: string = "";
    try {
      let newName = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-contact-widget//li[${positionRow}]//a`);
      await this.driverService.waitUntilElementLoaded(newName);
      actualName = await this.driverService.getText(newName);
      return await this.driverService.validateRecord(
        scenarioName,
        [actualName, name, "Assert at Name: Incorrect Name!"]
      );
    } catch (error) {
      console.log("Assert Create!");
      console.log(error);
      return false;
    }
  }

  public async assertDeleteContactSummary(
    positionRow: number = 1,
    name: string,
  ) {
    if (positionRow === -1 || positionRow === -2) {
      strictEqual("", name, `Test failed: can't find or delete contact "${name}"`);
    } else {
      let actualName: string = "";
      let txtName = By.xpath(`//app-customer-contact-widget//li[${positionRow}]//a`);
      try {
        if (await this.driverService.isExisted(txtName)) {
          await this.driverService.waitUntilElementLoaded(txtName);
          actualName = await this.driverService.getText(txtName)
        } else {
          console.info("Delete contact passed");
          return;
        }
      } catch (error) {
        console.error("Assert Assign user");
        console.error(error);
      }
      notStrictEqual(actualName, name, "Assert at contact");
    }
  }
  //#endregion
  public async assertNoteWidget(title: string, description: string, positionRow: number = 1) {
    let actualTitle: string = "";
    let actualDescription: any = "";

    let lblNoteTitle = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'active') and @role='tabpanel']//app-entity-note-list-widget//li[${positionRow}]//a//h5`);
    let lblNoteDescription = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'active') and @role='tabpanel']//app-entity-note-list-widget//li[${positionRow}]//div[contains(@class,'media-body')]`);
    try {
      await this.driverService.waitUntilElementLoaded(lblNoteTitle);
      await this.driverService.waitForSeconds(2000);
      actualTitle = (await this.driverService.getText(lblNoteTitle)).trim();
      actualDescription = (await this.driverService.getText(lblNoteDescription)).trim();
      actualDescription = actualDescription.split(/\r?\n/).pop();

      return await this.driverService.validateRecord(
        scenarioName,
        [actualTitle, title, "Assert at Title: Incorrect Title!"],
        [actualDescription, description, "Assert at Desctiption!"]
      );
    } catch (error) {
      console.log("assertNoteAtWidgetOfLeadDetail");
      console.log(error);
      return false;
    }
  }

  //#region Sale widget
  //#region Validate value Sale widget
  public async validateSaleNameOnSaleWidget(ExpectedValue: string, positionRow = 1) {
    try {
      const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-sales-widget//li[${positionRow}]//app-entity-details-link/a`);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const actualValue = await this.driverService.getText(lblActualValue);
      return await this.driverService.validateRecord("Validate Sale name",
        [actualValue, ExpectedValue, "Incorrect sale name!"]
      );
    } catch (error) {
      console.log('validateSaleNameOnSaleWidget');
      console.log(error);
      return false;
    }
  }
  public async validateProductOnSaleWidget(ExpectedValue: string, positionRow = 1) {
    try {
      const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-sales-widget//li[${positionRow}]//*[contains(text(),'Product: ')]`);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const actualValue = await this.driverService.getText(lblActualValue);
      return await this.driverService.validateRecord("Validate Product",
        [actualValue, "Product: " + ExpectedValue, "Incorrect Product!"]
      );
    } catch (error) {
      console.log('validateProductOnSaleWidget');
      console.log(error);
      return false;
    }
  }

  public async validateCreatedDateOnSaleWidget(ExpectedValue: string, positionRow = 1) {
    try {
      const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-sales-widget//li[${positionRow}]//*[contains(text(),'Created date: ')]`);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      let actualValue = (await this.driverService.getText(lblActualValue)).replace("Created date: ", "").trim();
      //Maximize delay time is 3 minutes.
      if (actualValue.localeCompare(ExpectedValue) !== 0) {
        if (Number(ExpectedValue.substring(14, 16)) - Number(actualValue.substring(14, 16)) < 3) {
          actualValue = ExpectedValue;
        }
      }
      return await this.driverService.validateRecord("Validate Created date",
        [actualValue, ExpectedValue, "Incorrect Created date!"]
      );
    } catch (error) {
      console.log('validateCreatedDateOnSaleWidget');
      console.log(error);
      return false;
    }
  }

  public async validateStageOnSaleWidget(ExpectedValue: string, positionRow = 1) {
    try {
      const lblActualValueNumber = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-sales-widget//li[${positionRow}]//div[contains(@class,'text-right')]/small[1]`);
      const lblActualValueName = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-sales-widget//li[${positionRow}]//div[contains(@class,'text-right')]/small[2]`);
      await this.driverService.waitUntilElementLoaded(lblActualValueNumber);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const actualValueNumber = await this.driverService.getText(lblActualValueNumber);
      const actualValueName = await this.driverService.getText(lblActualValueName);

      return await this.driverService.validateRecord("Validate Sale stage",
        [actualValueName + " - " + actualValueNumber, ExpectedValue, "Incorrect Sale stage!"]
      );
    } catch (error) {
      console.log('validateStageOnSaleWidget');
      console.log(error);
      return false;
    }
  }
  //#endregion
  //#region Open link on Sale widget
  public async openSaleDetailOnSaleWidgetByRow(positionRow = 1) {
    try {
      const hrefSaleName = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-sales-widget//li[${positionRow}]//app-entity-details-link`);
      await this.driverService.waitUntilElementLoaded(hrefSaleName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      await this.driverService.click(hrefSaleName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      return true;
    } catch (error) {
      console.log('openSaleDetailOnSaleWidgetByRow');
      console.log(error);
      return false;
    }
  }
  public async openSaleDetailOnSaleWidgetByName(SaleName: string) {
    try {
      const hrefSaleName = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-sales-widget//app-sale-details-link[@title='${SaleName}']`);
      await this.driverService.waitUntilElementLoaded(hrefSaleName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      await this.driverService.click(hrefSaleName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      return true;
    } catch (error) {
      console.log('openSaleDetailOnSaleWidgetByName');
      console.log(error);
      return false;
    }
  }
  //#endregion
  //#endregion

  //#region Email widget
  public async pressExpandEmailByRow(posittionRow = 1) {
    try {
      const email = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-mail-widget/div[${posittionRow}][contains(@class,'card')]//div[contains(@class,'card-header')]//div[text()]`);
      await this.driverService.waitUntilElementLoaded(email);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const titleWidget = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-mail-widget//a[./h4[text()='Emails']]`);
      await this.driverService.pressTab(titleWidget);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(email);
      return true;
    } catch (error) {
      console.log('pressExpandEmailByRow');
      console.log(error);
      return false;
    }
  }
  //#region Header Email
  public async validateSubjectHeaderOnEmailWidget(ExpectedValue: string, posittionRow = 1) {
    try {
      const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-mail-widget/div[${posittionRow}][contains(@class,'card')]//div[contains(@class,'card-header')]//div[text()]`);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const actualValue = await this.driverService.getText(lblActualValue);
      return await this.driverService.validateRecord("Validate Subject email",
        [actualValue, ExpectedValue, "Incorrect subject!"]);
    } catch (error) {
      console.log('validateSubjectHeaderOnEmailWidget');
      console.log(error);
      return false;
    }
  }

  public async validateSendDateHeaderEmailOnEmailWidget(ExpectedValue: string, posittionRow = 1) {
    try {
      const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-mail-widget/div[${posittionRow}][contains(@class,'card')]//div[contains(@class,'card-header')]//small[text()]`);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const actualValue = await this.driverService.getText(lblActualValue);
      //Maximize delay time is 3 minutes.
      if (actualValue.localeCompare(ExpectedValue) !== 0) {
        if (Number(actualValue.substring(14, 16)) - Number(ExpectedValue.substring(14, 16)) < 3) {
          ExpectedValue = actualValue;
        }
      }
      return await this.driverService.validateRecord("Validate Send date header",
        [actualValue, ExpectedValue, "Incorrect Send date header!"]);
    } catch (error) {
      console.log('validateSendDateHeaderEmailOnEmailWidget');
      console.log(error);
      return false;
    }
  }
  //#endregion

  //#region Detail email
  public async validateEmailFromDetailOnEmailWidget(ExpectedValue: string, posittionRow = 1) {
    try {
      const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-mail-widget/div[${posittionRow}][contains(@class,'card') and contains(@class,'border')]//app-mail-detail//div[./span[text()='From:']]/span[2]`);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const actualValue = await this.driverService.getText(lblActualValue);
      return await this.driverService.validateRecord("Validate Email from",
        [actualValue, ExpectedValue, "Incorrect Email from!"]);
    } catch (error) {
      console.log('validateEmailFromDetailOnEmailWidget');
      console.log(error);
      return false;
    }
  }
  public async validateEmailToDetailOnEmailWidget(ExpectedValue: string, posittionRow = 1) {
    try {
      const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-mail-widget/div[${posittionRow}][contains(@class,'card') and contains(@class,'border')]//app-mail-detail//div[./span[text()='To:']]/span[2]`);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const actualValue = await this.driverService.getText(lblActualValue);
      return await this.driverService.validateRecord("Validate Email to",
        [actualValue, ExpectedValue, "Incorrect Email to!"]);
    } catch (error) {
      console.log('validateEmailToDetailOnEmailWidget');
      console.log(error);
      return false;
    }
  }

  public async validateEmailCcDetailOnEmailWidget(ExpectedValue: string, posittionRow = 1) {
    try {
      const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-mail-widget/div[${posittionRow}][contains(@class,'card') and contains(@class,'border')]//app-mail-detail//div[./span[text()='Cc:']]/span[2]`);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const actualValue = await this.driverService.getText(lblActualValue);
      return await this.driverService.validateRecord("Validate Email Cc",
        [actualValue, ExpectedValue, "Incorrect Email Cc!"]);
    } catch (error) {
      console.log('validateEmailCcDetailOnEmailWidget');
      console.log(error);
      return false;
    }
  }

  public async validateEmailBccDetailOnEmailWidget(ExpectedValue: string, posittionRow = 1) {
    try {
      const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-mail-widget/div[${posittionRow}][contains(@class,'card') and contains(@class,'border')]//app-mail-detail//div[./span[text()='Bcc:']]/span[2]`);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const actualValue = await this.driverService.getText(lblActualValue);
      return await this.driverService.validateRecord("Validate Email Bcc",
        [actualValue, ExpectedValue, "Incorrect Email Bcc!"]);
    } catch (error) {
      console.log('validateEmailBccDetailOnEmailWidget');
      console.log(error);
      return false;
    }
  }
  public async validateSendDateDetailOnEmailWidget(ExpectedValue: string, posittionRow = 1) {
    try {
      const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-mail-widget/div[${posittionRow}][contains(@class,'card') and contains(@class,'border')]//app-mail-detail//div[./span[text()='Send date:']]/span[2]`);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const actualValue = await this.driverService.getText(lblActualValue);
      //Maximize delay time is 3 minutes.
      if (actualValue.localeCompare(ExpectedValue) !== 0) {
        if (Number(actualValue.substring(14, 16)) - Number(ExpectedValue.substring(14, 16)) < 3) {
          ExpectedValue = actualValue;
        }
      }
      return await this.driverService.validateRecord("Validate Send date detail",
        [actualValue, ExpectedValue, "Incorrect Send date detail!"]);
    } catch (error) {
      console.log('validateSendDateDetailOnEmailWidget');
      console.log(error);
      return false;
    }
  }
  public async validateSubjectDetailOnEmailWidget(ExpectedValue: string, posittionRow = 1) {
    try {
      const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-mail-widget/div[${posittionRow}][contains(@class,'card') and contains(@class,'border')]//app-mail-detail//h2`);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const actualValue = await this.driverService.getText(lblActualValue);
      return await this.driverService.validateRecord("Validate Subject detail",
        [actualValue, ExpectedValue, "Incorrect Subject detail!"]);
    } catch (error) {
      console.log('validateSubjectDetailOnEmailWidget');
      console.log(error);
      return false;
    }
  }
  public async validateDocumentDetailOnEmailWidget(ExpectedValue: string, posittionRow = 1) {
    try {
      const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-mail-widget/div[${posittionRow}][contains(@class,'card') and contains(@class,'border')]//app-mail-detail//a[contains(@download,'${ExpectedValue}')]`);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const actualValue = await this.driverService.getAttributeValue(lblActualValue, 'download');
      if (actualValue.includes(ExpectedValue)) {
        ExpectedValue = actualValue;
      }
      return await this.driverService.validateRecord("Validate document detail",
        [actualValue, ExpectedValue, "Incorrect document detail!"]);
    } catch (error) {
      console.log('validateDocumentDetailOnEmailWidget');
      console.log(error);
      return false;
    }
  }
  public async pressDownloadDocumentDetailOnEmailWidget(ExpectedValue: string, posittionRow = 1) {
    try {
      const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-mail-widget/div[${posittionRow}][contains(@class,'card') and contains(@class,'border')]//app-mail-detail//a[contains(@download,'${ExpectedValue}')]`);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      await this.driverService.click(lblActualValue);
      return true;
    } catch (error) {
      console.log('pressDownloadDocumentDetailOnEmailWidget');
      console.log(error);
      return false;
    }
  }
  public async validateBodyDetailOnEmailWidget(ExpectedValue: string, posittionRow = 1) {
    try {
      const iframeBody = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-mail-widget/div[${posittionRow}][contains(@class,'card') and contains(@class,'border')]//app-mail-detail//iframe`);
      const lblActualValue = By.xpath(`//body/p`);
      await this.driverService.waitUntilElementLoaded(iframeBody);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      await this.driverService.switchToFrame(iframeBody);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      const actualValue = await this.driverService.getText(lblActualValue);
      await this.driverService.switchToDefaultContent();
      return await this.driverService.validateRecord("Validate body detail",
        [actualValue, ExpectedValue, "Incorrect body detail!"]);
    } catch (error) {
      console.log('validateBodyDetailOnEmailWidget');
      console.log(error);
      return false;
    }
  }
  //#endregion
  //#endregion

  //#region History widget
  public async validateEventLogsOnHistoryWidget(ExpectedValue: string, positionRow = 1) {
    try {
      const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-eventlogs//li[${positionRow}]//div//div//div`);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const actualValue = await this.driverService.getText(lblActualValue);
      return await this.driverService.validateRecord("Validate Event logs",
        [actualValue, ExpectedValue, "Incorrect Event logs!"]
      );
    } catch (error) {
      console.log('validateEventLogsOnHistoryWidget');
      console.log(error);
      return false;
    }
  }

  public async validateEventDescriptionOnHistoryWidget(ExpectedValue: string, positionRow = 1) {
    try {
      const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-eventlogs//li[${positionRow}]//app-event-description//*[self::*[text()]]`);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const actualValue = await this.driverService.getText(lblActualValue);
      return await this.driverService.validateRecord("Validate EventDescription",
        [actualValue, ExpectedValue, "Incorrect EventDescription!"]
      );
    } catch (error) {
      console.log('validateEventDescriptionOnHistoryWidget');
      console.log(error);
      return false;
    }
  }

  public async validateCreatedDateOnHistoryWidget(ExpectedValue: string, positionRow = 1) {
    try {
      const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-eventlogs//li[${positionRow}]//small[1]`);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const actualValue = await this.driverService.getText(lblActualValue);
      if (actualValue.localeCompare(ExpectedValue) !== 0) {
        if (Number(actualValue.substring(14, 16)) - Number(ExpectedValue.substring(14, 16)) < 3) {
          ExpectedValue = actualValue;
        }
      }
      return await this.driverService.validateRecord("Validate CreatedDate",
        [actualValue, ExpectedValue, "Incorrect CreatedDate!"]
      );
    } catch (error) {
      console.log('validateCreatedDateOnHistoryWidget');
      console.log(error);
      return false;
    }
  }

  public async validateUpdatedByOnHistoryWidget(ExpectedValue: string, positionRow = 1) {
    try {
      const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-eventlogs//li[${positionRow}]//small[2]`);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const actualValue = await this.driverService.getText(lblActualValue);
      return await this.driverService.validateRecord("Validate UpdatedBy",
        [actualValue, ExpectedValue, "Incorrect UpdatedBy!"]
      );
    } catch (error) {
      console.log('validateUpdatedByOnHistoryWidget');
      console.log(error);
      return false;
    }
  }
  //#endregion

  //#region customer score widget
  public async validateCreditScoreOnCustomerScoreWidget(ExpectedValue: string) {
    try {
      const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-scoring-widget//div[./div[contains(text(),'Credit Score')]]//span`);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const actualValue = await this.driverService.getText(lblActualValue);
      return await this.driverService.validateRecord("Validate CreditScore",
        [actualValue, ExpectedValue, "Incorrect CreditScore!"]
      );
    } catch (error) {
      console.log('validateCreditScoreOnCustomerScoreWidget');
      console.log(error);
      return false;
    }
  }

  public async validateCustomerScoreOnCustomerScoreWidget(ExpectedValue: string) {
    try {
      const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-scoring-widget//div[./div[contains(text(),'Customer Score')]]//span`);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const actualValue = await this.driverService.getText(lblActualValue);
      return await this.driverService.validateRecord("Validate CustomerScore",
        [actualValue, ExpectedValue, "Incorrect CustomerScore!"]
      );
    } catch (error) {
      console.log('validateCustomerScoreOnCustomerScoreWidget');
      console.log(error);
      return false;
    }
  }
  //#endregion


  //#region Claim Loss (or Ratio Loss widget)
  public async validateClaimPaidAndExpenseNumberOnClaimLossWidget(ExpectedValue: string, currency: string) {
    try {
      const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-ratio-loss-widget//div[contains(@class,'percentage') and .//*[contains(text(),'${currency}')]]//div[./span[text()='Claim paid & expense']]/span[2]`);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const actualValue = await this.driverService.getText(lblActualValue);

      return await this.driverService.validateRecord("Validate Claim paid and Expence",
        [actualValue, ExpectedValue + " " + currency, "Incorrect Claim paid and Expence!"]);
    } catch (error) {
      console.log('validateClaimPaidAndExpenseNumberOnClaimLossWidget');
      console.log(error);
      return false;
    }
  }

  // Là cái % mong đợi của biểu đồ
  public async validateClaimPaidAndExpenseWidthBarChartOnClaimLossWidget(ExpectedValue: string, currency: string) {
    try {
      const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-ratio-loss-widget//div[contains(@class,'percentage') and .//*[contains(text(),'${currency}')]]//div[.//span[text()='Claim paid & expense']]/following-sibling::div[1]/div`);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const temp = await this.driverService.getAttributeValue(lblActualValue, 'style');
      let actualValue = temp.split("width: ")[1].split("%; background")[0];

      return await this.driverService.validateRecord("Validate Width bar chart ClaimPaidAndExpense",
        [actualValue, ExpectedValue, "Incorrect Width bar chart ClaimPaidAndExpense!"]);
    } catch (error) {
      console.log('validateClaimPaidAndExpenseWidthBarChartOnClaimLossWidget');
      console.log(error);
      return false;
    }
  }

  public async validateWrittenPremiumNumberOnClaimLossWidget(ExpectedValue: string, currency: string) {
    try {
      const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-ratio-loss-widget//div[contains(@class,'percentage') and .//*[contains(text(),'${currency}')]]//div[./span[text()='Written premium']]/span[2]`);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const actualValue = await this.driverService.getText(lblActualValue);

      return await this.driverService.validateRecord("Validate WrittenPremium",
        [actualValue, ExpectedValue + " " + currency, "Incorrect WrittenPremium!"]);
    } catch (error) {
      console.log('validateWrittenPremiumNumberOnClaimLossWidget');
      console.log(error);
      return false;
    }
  }

  public async validateWrittenPremiumWidthBarChartOnClaimLossWidget(ExpectedValue: string, currency: string) {
    try {
      const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-ratio-loss-widget//div[contains(@class,'percentage') and .//*[contains(text(),'${currency}')]]//div[.//span[text()='Written premium']]/following-sibling::div[1]/div`);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const temp = await this.driverService.getText(lblActualValue);
      const actualValue = temp.split("width: ")[1].split("%; background")[0];

      return await this.driverService.validateRecord("Validate Width bar chart Written premium",
        [actualValue, ExpectedValue, "Incorrect Width bar chart Written premium!"]);
    } catch (error) {
      console.log('validateWrittenPremiumWidthBarChartOnClaimLossWidget');
      console.log(error);
      return false;
    }
  }

  //#endregion
  //#endregion

  //#region Last Reported Claim Widgets
  public async getPosittionRowOfReferenceIdOnLastReportedClaimWidget(ExpectedValue: string) {
    try {
      const temp = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-last-reported-claim//li");
      await this.driverService.waitUntilElementLoaded(temp);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const count = await (await this.driverService.findElements(temp)).length;
      for (let i = 1; i <= count; i++) {
        const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-last-reported-claim//li[${i}]//a`);
        await this.driverService.pressTab(lblActualValue);
        const actualValue = await this.driverService.getText(lblActualValue);
        if (actualValue.localeCompare(ExpectedValue) === 0) {
          return i;
        }
      }
      logWarningMessage(`Not find any claim id "${ExpectedValue}" on Last Reported Claim widget`);
      return -1;
    } catch (error) {
      console.log('getPosittionRowOfReferenceIdOnLastReportedClaimWidget');
      console.log(error);
      return -1;
    }
  }

  public async valdiateReferenceIdOnLastReportedClaimWidget(ExpectedValue: string, positionRow = 1) {
    try {
      const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-last-reported-claim//li[${positionRow}]//a`);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const actualValue = await this.driverService.getText(lblActualValue);
      return await this.driverService.validateRecord("Validate ReferenceId",
        [actualValue, ExpectedValue, "Incorrect ReferenceId!"]
      );
    } catch (error) {
      console.log('valdiateReferenceIdOnLastReportedClaimWidget');
      console.log(error);
      return false;
    }
  }
  public async valdiateObjectNameOnLastReportedClaimWidget(ExpectedValue: string, positionRow = 1) {
    try {
      const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-last-reported-claim//li[${positionRow}]//span[text()='Object name:']`);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const actualValue = await this.driverService.getAttributeValue(lblActualValue, 'title');
      return await this.driverService.validateRecord("Validate ObjectName",
        [actualValue, ExpectedValue, "Incorrect ObjectName!"]
      );
    } catch (error) {
      console.log('valdiateObjectNameOnLastReportedClaimWidget');
      console.log(error);
      return false;
    }
  }
  public async valdiateStatusOnLastReportedClaimWidget(ExpectedValue: string, positionRow = 1) {
    try {
      const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-last-reported-claim//li[${positionRow}]//app-claim-status-description/span`);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const actualValue = await this.driverService.getText(lblActualValue);
      return await this.driverService.validateRecord("Validate Status",
        [actualValue, ExpectedValue, "Incorrect Status!"]
      );
    } catch (error) {
      console.log('valdiateStatusOnLastReportedClaimWidget');
      console.log(error);
      return false;
    }
  }
  public async valdiateAccountOnLastReportedClaimWidget(ExpectedValue: string, positionRow = 1) {
    try {
      const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-last-reported-claim//li[${positionRow}]//small[./span[text()='Account: ']]`);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const temp = await this.driverService.getText(lblActualValue);
      const actualValue = temp.split("Account: ")[1].trim();
      return await this.driverService.validateRecord("Validate Account",
        [actualValue, ExpectedValue, "Incorrect Account!"]
      );
    } catch (error) {
      console.log('valdiateAccountOnLastReportedClaimWidget');
      console.log(error);
      return false;
    }
  }
  public async valdiateDateOfLossOnLastReportedClaimWidget(ExpectedValue: string, positionRow = 1) {
    try {
      const lblActualValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-last-reported-claim//li[${positionRow}]//small[./span[text()='DOL: ']]`);
      await this.driverService.waitUntilElementLoaded(lblActualValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const temp = await this.driverService.getText(lblActualValue);
      const actualValue = temp.split("DOL: ")[1].trim();
      return await this.driverService.validateRecord("Validate DateOfLoss",
        [actualValue, ExpectedValue, "Incorrect DateOfLoss!"]
      );
    } catch (error) {
      console.log('valdiateDateOfLossOnLastReportedClaimWidget');
      console.log(error);
      return false;
    }
  }
  //#endregion

  //#region checklist widget
  public async validateChecklistNameValue(expectedValue: string, positionRow: number = 1) {
    try {
      let lblName = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-checklist-widget//li[${positionRow}]//a[contains(text(),'${expectedValue}')]`);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      if (await this.driverService.isExisted(lblName)) {
        return true;
      } return false;
    } catch (error) {
      console.log('validateChecklistNameValue');
      console.log(error);
      return false;
    }
  }

  public async selectChecklistName(expectedValue: string, positionRow: number = 1) {
    try {
      let lblName = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-checklist-widget//li[${positionRow}]//a[contains(text(),'${expectedValue}')]`);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.click(lblName);
      await waitUntilHorizontalProgressBarLoaded(this.driverService);
      return true;
    } catch (error) {
      console.log('selectChecklistName');
      console.log(error);
      return false;
    }
  }

  public async validateInsuredObjectValue(expectedValue: string, positionRow: number = 1) {
    try {
      let lblxpath = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-checklist-widget//li[${positionRow}]//small[1][contains(text(),'${expectedValue}')]`);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      if (await this.driverService.isExisted(lblxpath)) {
        return true;
      } return false;
    } catch (error) {
      console.log('validateInsuredObjectValue');
      console.log(error);
      return false;
    }
  }
  public async validateDeadlineValue(expectedValue: string, positionRow: number = 1) {
    try {
      let lblxpath = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-checklist-widget//li[${positionRow}]//span[1][contains(text(),'${expectedValue}')]`);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      if (await this.driverService.isExisted(lblxpath)) {
        return true;
      } return false;
    } catch (error) {
      console.log('validateDeadlineValue');
      console.log(error);
      return false;
    }
  }

  public async validateStatusValue(expectedValue: string, positionRow: number = 1) {
    try {
      let lblxpath = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-checklist-widget//li[${positionRow}]//following-sibling::small[1][contains(text(),'${expectedValue}')]`);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      if (await this.driverService.isExisted(lblxpath)) {
        return true;
      } return false;
    } catch (error) {
      console.log('validateInsuredObjectValue');
      console.log(error);
      return false;
    }
  }

  public async pressSeeMoreChecklistWidget() {
    try {
      let lblxpath = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-checklist-widget//a[.//*[contains(text(),'See more')]]`);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.click(lblxpath);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      return true;
    } catch (error) {
      console.log('pressSeeMoreChecklistWidget');
      console.log(error);
      return false;
    }
  }
  //#endregion

  //#region REWARDS WIDGET
  public async assertRewardWidgetIsExistOrNot(isExisted: boolean = true) {
    try {
      let widget = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-summary-reward-widget`);
      if (isExisted) {
        if (await this.driverService.isExisted(widget)) {
          return true;
        } else return false;
      } else {
        if (await this.driverService.isExisted(widget)) {
          return false;
        } else return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async validateReferenceOnRewardsWidgets(Value: string, positionRow: number = 1) {
    try {
      let expectedValue = `REF.:` + Value;
      let ele = await this.getFieldType(By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-summary-reward-widget)[1]//li[${positionRow}]//a`));
      let actualValue = await ele.getValue();
      return await this.driverService.validateRecord('validate reference', [actualValue, expectedValue, 'Incorrect reference!']);
    } catch (error) {
      console.log(`validateReferenceOnRewardsWidgets`);
      console.log(error);
      return false;
    }
  }

  public async validatePointOnRewardsWidgets(Value: string, positionRow: number = 1) {
    try {
      let ele = await this.getFieldType(By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-summary-reward-widget)[1]//li[${positionRow}]//app-reward-point//span`));
      let actualValue = await ele.getValue();
      return await this.driverService.validateRecord('validate point', [actualValue, Value, 'Incorrect point!']);
    } catch (error) {
      console.log(`validatePointOnRewardsWidgets`);
      console.log(error);
      return false;
    }
  }
  public async validateRewardNameOnRewardsWidgets(Value: string, positionRow: number = 1) {
    try {
      let ele = await this.getFieldType(By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-summary-reward-widget)[1]//li[${positionRow}]/div/div`));
      let actualValue = await ele.getValue();
      return await this.driverService.validateRecord('validate RewardName', [actualValue, Value, 'Incorrect point!']);
    } catch (error) {
      console.log(`validateRewardNameOnRewardsWidgets`);
      console.log(error);
      return false;
    }
  }

  public async validatePointsBalanceOnRewardsWidgets(Value: string) {
    try {
      let ele = await this.getFieldType(By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-summary-reward-widget)[1]//li[./b[contains(text(),'Points balance')]]//div`));
      let actualValue = await ele.getValue();
      return await this.driverService.validateRecord('validate PointsBalance', [actualValue, Value, 'Incorrect PointsBalance!']);
    } catch (error) {
      console.log(`validatePointsBalanceOnRewardsWidgets`);
      console.log(error);
      return false;
    }
  }

  public async removeRewardsWidgetFromSummaryLayout() {
    try {
      let widget = By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-widget-layout-config//app-customer-summary-reward-widget)[1]`);
      let btnRemoveWidget = By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./app-widget-layout-config//app-customer-summary-reward-widget])[1]//a[./i[contains(@class,'fa-times')]]`);
      while (await this.driverService.isExisted(widget)) {
        await this.driverService.waitUntilElementVisible(widget)
        await this.driverService.mouseHover(widget);
        await this.driverService.waitUntilElementVisible(btnRemoveWidget);
        await this.driverService.click(btnRemoveWidget);
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      }
      return true;
    } catch (error) {
      console.log(`removeRewardsWidgetFromSummaryLayout`);
      console.log(error);
      return false;
    }

  }
  //#endregion

  //#region POLICIES WIDGET
  public async assertPoliciesWidgetIsExistOrNot(isExisted: boolean = true) {
    try {
      let widget = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-latest-policy`);
      if (isExisted) {
        if (await this.driverService.isExisted(widget)) {
          return true;
        } else return false;
      } else {
        if (await this.driverService.isExisted(widget)) {
          return false;
        } else return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async validateTitleOfThePoliciesWidget(productName: string, ReferenceId: string, positionRow: number = 1) {
    try {
      let xpath = By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-latest-policy)[1]//li[${positionRow}]//a`);
      let ele = await this.getFieldType(xpath);
      let actualValue = await ele.getValue();
      let expectedValue = `${productName} - REF.:${ReferenceId}`;
      return await this.driverService.validateRecord('validate Title of the Policies Widget', [actualValue, expectedValue, "Incorrect value!"]);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  public async validatePremiumOfThePoliciesWidget(premium: string, positionRow: number = 1) {
    try {
      let xpath = By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-latest-policy)[1]//li[${positionRow}]//div[contains(@class,'text-right')]`);
      let ele = await this.getFieldType(xpath);
      let actualValue = await ele.getValue();
      return await this.driverService.validateRecord('validate Premium', [actualValue, premium, "Incorrect value!"]);
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async validateTotalPremiumOfThePoliciesWidget(TotalPremium: string) {
    try {
      let xpath = By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-latest-policy)[1]//li[./b[contains(text(),'Total premium')]]//div`);
      let ele = await this.getFieldType(xpath);
      let actualValue = await ele.getValue();
      return await this.driverService.validateRecord('validate Total Premium', [actualValue, TotalPremium, "Incorrect value!"]);
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async getTotalPremiumOfThePoliciesWidget() {
    try {
      let xpath = By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-latest-policy)[1]//li[./b[contains(text(),'Total premium')]]//div`);
      let ele = await this.getFieldType(xpath);
      return await ele.getValue();;
    } catch (error) {
      console.log(error);
      return "";
    }
  }
  //#endregion

  //#region HouseholdWidgets
  //#region Press button
  public async pressAddMemberButtonOnHouseholdWidget() {
    try {
      const element = await this.getFieldType(this.btnAddMember_HouseholdWidget);
      await element.click();
      return true;
    } catch (error) {
      console.log('pressAddMemberButtonOnHouseholdWidget');
      console.log(error);
      return false;
    }
  }
  public async pressRefreshButtonOnHouseholdWidget() {
    try {
      const element = await this.getFieldType(this.btnRefresh_HouseholdWidget);
      await element.click();
      return true;
    } catch (error) {
      console.log('pressRefreshButtonOnHouseholdWidget');
      console.log(error);
      return false;
    }
  }
  //#endregion


  //#region  HouseholdWidget
  public async validateValueNINByAccountNameOnHouseholdWidget(accountName: string, expectedValue: string) {
    try {
      const lbl = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-household-widget//td[.//div[text()='${accountName}']]//small[contains(text(),'NIN')]`);
      const element = await this.getFieldType(lbl);
      const actualValue = await element.getValue();
      return await this.driverService.validateRecord('Validate NIN!',
        [actualValue.trim(), ("NIN: " + expectedValue).trim(), 'Incorrect NIN!']);
    } catch (error) {
      console.log('validateValueNINByAccountNameOnHouseholdWidget');
      console.log(error);
      return false;
    }
  }

  public async validateValueAddressByAccountNameOnHouseholdWidget(accountName: string, expectedValue: string) {
    try {
      const lbl = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-household-widget//td[.//div[text()='${accountName}']]//small[@title]`);
      const element = await this.getFieldType(lbl);
      const actualValue = await element.getValue();
      return await this.driverService.validateRecord('Validate Address!',
        [actualValue, expectedValue, 'Incorrect Address!']);
    } catch (error) {
      console.log('validateValueAddressByAccountNameOnHouseholdWidget');
      console.log(error);
      return false;
    }
  }

  public async validateValueTotalPremiumByAccountNameOnHouseholdWidget(accountName: string, expectedValue: string) {
    try {
      const lbl = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-household-widget//tr[.//td[.//div[text()='${accountName}']]]//td[3]`);
      const element = await this.getFieldType(lbl);
      const actualValue = await element.getValue();
      return await this.driverService.validateRecord('Validate Total Premium!',
        [actualValue, expectedValue, 'Incorrect Total Premium!']);
    } catch (error) {
      console.log('validateValueTotalPremiumByAccountNameOnHouseholdWidget');
      console.log(error);
      return false;
    }
  }
  public async validateValueTotalClaimByAccountNameOnHouseholdWidget(accountName: string, expectedValue: string) {
    try {
      const lbl = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-household-widget//tr[.//td[.//div[text()='${accountName}']]]//td[4]`);
      const element = await this.getFieldType(lbl);
      const actualValue = await element.getValue();
      return await this.driverService.validateRecord('Validate Total Claim!',
        [actualValue, expectedValue, 'Incorrect Total Claim!']);
    } catch (error) {
      console.log('validateValueTotalClaimByAccountNameOnHouseholdWidget');
      console.log(error);
      return false;
    }
  }
  public async validateValueTotalBalanceByAccountNameOnHouseholdWidget(accountName: string, expectedValue: string) {
    try {
      const lbl = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-household-widget//tr[.//td[.//div[text()='${accountName}']]]//td[5]`);
      const element = await this.getFieldType(lbl);
      const actualValue = await element.getValue();
      return await this.driverService.validateRecord('Validate Total Balance!',
        [actualValue, expectedValue, 'Incorrect Total Balance!']);
    } catch (error) {
      console.log('validateValueTotalClaimByAccountNameOnHouseholdWidget');
      console.log(error);
      return false;
    }
  }
  //#endregion
  //#region Get value
  public async getValueNINByAccountNameOnHouseholdWidget(accountName: string) {
    try {
      const lbl = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-household-widget//td[.//div[text()='${accountName}']]//small[contains(text(),'NIN')]`);
      const element = await this.getFieldType(lbl);
      const actualValue = await element.getValue();
      return actualValue;
    } catch (error) {
      console.log('getValueNINByAccountNameOnHouseholdWidget');
      console.log(error);
      return false;
    }
  }

  public async getValueAddressByAccountNameOnHouseholdWidget(accountName: string) {
    try {
      const lbl = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-household-widget//td[.//div[text()='${accountName}']]//small[@title]`);
      const element = await this.getFieldType(lbl);
      const actualValue = await element.getValue();
      return actualValue;
    } catch (error) {
      console.log('getValueAddressByAccountNameOnHouseholdWidget');
      console.log(error);
      return false;
    }
  }

  public async getValueTotalPremiumByAccountNameOnHouseholdWidget(accountName: string) {
    try {
      const lbl = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-household-widget//tr[.//td[.//div[text()='${accountName}']]]//td[3]`);
      const element = await this.getFieldType(lbl);
      const actualValue = await element.getValue();
      return actualValue;
    } catch (error) {
      console.log('getValueTotalPremiumByAccountNameOnHouseholdWidget');
      console.log(error);
      return false;
    }
  }
  public async getValueTotalClaimByAccountNameOnHouseholdWidget(accountName: string) {
    try {
      const lbl = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-household-widget//tr[.//td[.//div[text()='${accountName}']]]//td[4]`);
      const element = await this.getFieldType(lbl);
      const actualValue = await element.getValue();
      return actualValue;
    } catch (error) {
      console.log('getValueTotalClaimByAccountNameOnHouseholdWidget');
      console.log(error);
      return false;
    }
  }
  public async getValueTotalBalanceByAccountNameOnHouseholdWidget(accountName: string) {
    try {
      const lbl = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-household-widget//tr[.//td[.//div[text()='${accountName}']]]//td[5]`);
      const element = await this.getFieldType(lbl);
      const actualValue = await element.getValue();
      return actualValue;
    } catch (error) {
      console.log('getValueTotalClaimByAccountNameOnHouseholdWidget');
      console.log(error);
      return false;
    }
  }

  public async getNumberOfMembersOnHouseholdWidget() {
    try {
      const lbl = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-household-widget//tr[.//td[.//div[text()]]]`);
      await this.driverService.waitUntilElementVisible(lbl);
      const len = await (await this.driverService.findElements(lbl)).length;
    } catch (error) {
      console.log('getNumberOfMembersOnHouseholdWidget');
      console.log(error);
      return -1;
    }
  }
  //#endregion

  //#region Check account exist
  public async checkAccountNameExistOnHouseholdWidget(accountName: string) {
    try {
      const lbl = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-household-widget//td[.//div[text()='${accountName}']]`);
      return await this.driverService.isExisted(lbl);
    } catch (error) {
      console.log('checkAccountNameExistOnHouseholdWidget');
      console.log(error);
      return false;
    }
  }
  //#endregion
  //#endregion
}

//#endregion