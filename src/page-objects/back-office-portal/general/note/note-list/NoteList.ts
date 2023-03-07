import { strictEqual, notStrictEqual } from "assert";
import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2, logWarningMessage, reloadTable, closeToastMessage } from "../../../../../shared/functions";
import { scenarioName } from "../../../../../shared/variables";
import { GlobalPageObject } from "../../GlobalPageObject/GlobalPageObject";

export class NoteList {
  constructor(private driverService: SeleniumWebDriverService) { }

  protected btnEditNote = By.xpath(`//app-note-edit-delete-cell//*[@id='pgs-note-edit-btn']`);

  private lblTitle = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[1]/td[contains(@class,'pgs-note-title')]//*[self::*[text()]]");
  private lblDescription = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[1]/td[contains(@class,'pgs-note-description')]//*[self::*[text()]]");
  private lblModifiedDate = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[1]/td[contains(@class,'pgs-note-updated-date')]//*[self::*[text()]]")

  public async openNoteListByEntityType(entityType: string) {
    const globalPageObject = new GlobalPageObject(this.driverService);
    await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
    switch (entityType) {
      case 'Account':
      case 'Contact':
      case 'Sales':
        await globalPageObject.navigateToSubNotes();
        break;
      default:
        //In case of Lead detail, or Case detail, we don't have nav-item Note List
        //do nothing
        break;
    }
  }

  public async pressEditNote() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnEditNote);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.btnEditNote);
      return true;
    } catch (error) {
      console.log('pressEditNote');
      console.log(error);
      return false;
    }
  }

  public async openEditNoteByName(selectedNote: string) {
    try {
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 3000);
      await this.driverService.waitUntilElementLoaded(this.lblTitle);
      for (let i = 1; i <= 30; i++) {
        let lblNote = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${i}]/td[contains(@class,'pgs-note-title')]//*[self::*[text()]]`);
        if ((await this.driverService.isExisted(lblNote)) === false) {
          // fail(
          //   `Can't find note with name \"${selectedNote}\" in Note List`
          // );
        } else {
          let nameAccount = await this.driverService.getText(lblNote);
          if (nameAccount.localeCompare(selectedNote) === 0) {
            let btnEdit = By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[@id='pgs-note-edit-btn'])[${i}]`);
            await this.driverService.click(btnEdit);
            return true;
          }
        }
      }
      logWarningMessage(`Can't find note with name \"${selectedNote}\" in Note List`);
      return false;
    } catch (error) {
      console.log("openEditNoteTitle");
      console.log(error);
      return false;
    }
  }

  public async pressDeleteNoteByName(deleteNote: string) {
    try {
      await this.driverService.waitForSeconds(2000);
      await reloadTable(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      for (let i = 1; i <= 30; i++) {
        let txtName = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-entity-note-list//tr[${i}]/td[contains(@class,'pgs-note-title')]//*[self::*[text()]]`);
        if ((await this.driverService.isExisted(txtName)) === false) {
          // fail(`Can't find note with name \"${deleteNote}\" in Note List`);
        } else {
          let name = await this.driverService.getText(txtName);
          if (name.localeCompare(deleteNote) === 0) {
            let btnDelete = By.xpath(
              `(//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[@id='pgs-note-delete-btn'])[${i}]`
            );
            await this.driverService.click(btnDelete);
            return true;
          }
        }
      }
      logWarningMessage(`Can't find user with name \"${deleteNote}\" into User List`);
      return false;
    } catch (error) {
      console.log("pressDeleteByName");
      console.log(error);
      return false;
    }
  }

  /**
   * Assert note by Title, description and modifiedDate
   * @param title 
   * @param description 
   * @param modifiedDate 
   */
  public async assertNote(title: string, description: string, modifiedDate: string) {
    let actualTitle: string = "";
    let actualDescription: string = "";
    let actualModifiedDate: string = "";

    try {
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.waitForSeconds(2000);
      await reloadTable(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await closeToastMessage(this.driverService);
      actualTitle = (await this.driverService.getText(this.lblTitle)).trim();
      actualDescription = (await this.driverService.getText(this.lblDescription)).trim();
      actualModifiedDate = (await this.driverService.getText(this.lblModifiedDate)).trim();

    } catch (error) {
      console.log(error);
      console.log("assertNote");
    }
    //Maximize delay time is 3 minutes.
    if (actualModifiedDate.localeCompare(modifiedDate) !== 0) {
      if (Number(actualModifiedDate.substring(14, 16)) - Number(modifiedDate.substring(14, 16)) < 3) {
        modifiedDate = actualModifiedDate;
      }
    }

    await this.driverService.validateTestCase(
      scenarioName,
      [actualTitle, title, "Assert at Title: Incorrect Title!"],
      [actualDescription, description, "Assert at Desctiption!"],
      [actualModifiedDate, modifiedDate, "Assert at Modified date!"]
    );
  }

  // ??? Hàm này cần sửa lại
  public async assertNoteByRow(positionRow: number = 1, title: string, description: string) {
    let actualTitle: string = "";
    let actualDescription: string = "";

    try {
      let lblTitle = By.xpath(`//tbody[@class="ng-star-inserted"]/tr=[${positionRow}]/td[3]//div`);
      let lblDescription = By.xpath(`//tbody[@class="ng-star-inserted"]/tr[${positionRow}]/td[4]/span`)

      await this.driverService.waitUntilElementLoaded(lblTitle);
      actualTitle = await (await this.driverService.findElement(lblTitle)).getText();
      actualDescription = await (await this.driverService.findElement(lblDescription)).getText();

      return await this.driverService.validateTestCase(
        scenarioName,
        [actualTitle, title, "Assert at Title: Incorrect Title!"],
        [actualDescription, description, "Assert at Desctiption: Incorrect Description!"],
      );
    } catch (error) {
      console.log("Assert at create Note");
      console.log(error);
      return false;
    }
  }

  // ?? Hàm này cần sửa lại luôn
  public async assertNoteExistence(
    positionRow: number = 1,
    title: string,
    description: string
  ) {
    if (positionRow === -1 || positionRow === -2) {
      strictEqual("", title, `Note does not exist "${title}"`);
    } else {
      let actualTitle: string = "";
      let actualDescription: string = "";

      let txtTitle = By.xpath(
        `//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody[@class="ng-star-inserted"]/tr[${positionRow}]/td[3]//div`
      );
      let txtDescription = By.xpath(
        `//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody[@class="ng-star-inserted"]/tr[${positionRow}]/td[4]/span`
      );

      try {
        if (await this.driverService.isExisted(txtTitle)) {
          await this.driverService.waitUntilElementLoaded(txtTitle);
          actualTitle = await (
            await this.driverService.findElement(txtTitle)
          ).getText();
          actualDescription = await (
            await this.driverService.findElement(txtDescription)
          ).getText();
        } else {
          console.info("Note does not exist");
          return;
        }
      } catch (error) {
        console.error("Assert Assign note");
        console.error(error);
      }
      notStrictEqual(actualTitle, title, "Assert at Title");
      notStrictEqual(actualDescription, description, "Assert at Description");
    }
  }

  public async assertDeleteNote(
    positionRow: number = 1,
    name: string,
    description: string
  ) {
    if (positionRow === -1 || positionRow === -2) {
      logWarningMessage(`Test failed: can't find or delete note "${name}"`);
      return false;
    }
    else {
      let actualName: string = "";
      let actualDescription: string = "";
      let txtName = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-entity-note-list//tr[${positionRow}]/td[contains(@class,'pgs-note-title')]//*[self::*[text()]]`);
      let txtDescription = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-entity-note-list//tr[${positionRow}]/td[contains(@class,'pgs-note-description')]//*[self::*[text()]]`);

      try {
        await reloadTable(this.driverService);
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
        if (await this.driverService.isExisted(txtName)) {
          await this.driverService.waitUntilElementLoaded(txtName);
          actualName = await this.driverService.getText(txtName);
          actualDescription = await this.driverService.getText(txtDescription);
        } else {
          console.info("Delete note passed");
          return true;
        }
      } catch (error) {
        console.error("Assert Assign user");
        console.error(error);
        return false;
      }
      if((actualName === name) && (actualDescription === description)){
        logWarningMessage(`Note "${name}" still shows on list!`);
        return false;
      }
      else{
        return true;
      }
    }
  }
}