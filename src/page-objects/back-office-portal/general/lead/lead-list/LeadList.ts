import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2, reloadTable, logWarningMessage } from "../../../../../shared/functions";
import { scenarioName } from "../../../../../shared/variables";

export class LeadList {
  private createLeadBtn = By.xpath("(//c-page-layout/div/div/div/div/button)[1]");
  private editLeadBtn = By.id("pgs-lead-edit-lead-button");
  private importLeadBtn = By.xpath(`//button[@id="pgs-lead-import-lead-btn"]`);

  //Convert lead
  private convertBtn_1 = By.xpath("(//*[@id='pgs-convert-lead'])[1]"); //Lead on the top of Lead list
  private convertToPersonBtn = By.xpath("//body/div[@class='dropdown']//*[@id='lead-convert-to-person-acc']");
  private convertToCompanyBtn = By.xpath("//body/div[@class='dropdown']//*[@id='pgs-lead-convert-to-company-acc']");


  //Xpath of elements in first row Lead list
  private lblName = By.xpath("//table//tr[1]//td[contains(@class,'pgs-lead-name')]//*[self::*[text()]]");
  private lblCompany = By.xpath("//table//tr[1]//td[contains(@class,'pgs-lead-company')]//*[self::*[text()]]");
  private lblMobile = By.xpath("//table//tr[1]//td[contains(@class,'pgs-lead-mobile')]//*[self::*[text()]]");
  private lblEmail = By.xpath("//table//tr[1]//td[contains(@class,'pgs-lead-email')]//*[self::*[text()]]");
  private lblOrganization = By.xpath("//table//tr[1]//td[contains(@class,'pgs-lead-organization')]//*[self::*[text()]]");

  public static state: string = "";

  constructor(private driverService: SeleniumWebDriverService) { }

  public async pressNewLead() {
    try {
      await this.driverService.waitUntilElementLoaded(this.createLeadBtn);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.click(this.createLeadBtn);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async reloadLeadList() {
    try {
      await this.driverService.waitForSeconds(3000);
      await reloadTable(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 2000);
    } catch (error) {
      console.log("reloadLeadList");
      console.log(error);
    }
  }

  //#region Convert lead
  public async openConvertLeadToPersonForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.convertBtn_1);
      await this.driverService.click(this.convertBtn_1);
      await this.driverService.waitUntilElementLoaded(By.xpath("//body/div[@class='dropdown']"));
      await this.driverService.click(this.convertToPersonBtn);
      return true;
    } catch (error) {
      console.log("Open Convert Lead to Person form");
      console.log(error);
      return false;
    }
  }

  public async openConvertLeadToCompanyForm() {
    try {
      await reloadTable(this.driverService);
      await this.driverService.waitUntilElementLoaded(this.convertBtn_1);
      await this.driverService.click(this.convertBtn_1);
      await this.driverService.waitUntilElementLoaded(this.convertToCompanyBtn);
      await this.driverService.click(this.convertToCompanyBtn);
      return true;
    } catch (error) {
      console.log("Open convert lead to Company form");
      console.log(error);
      return false;
    }
  }
  //#endregion

  public async pressEdit() {
    try {
      await this.driverService.waitUntilElementLoaded(this.editLeadBtn);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.click(this.editLeadBtn);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  //Input: name of lead
  //Output: form edit of that lead is opened
  public async pressEditByName(selectedLead: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      for (let i = 1; i <= 30; i++) {
        let lblName = By.xpath(`//table//tr[${i}]//td[contains(@class,'pgs-lead-name')]//*[self::*[text()]]`);
        if (await this.driverService.isExisted(lblName)) {
          let nameLead = await this.driverService.getText(lblName);
          if (nameLead.localeCompare(selectedLead) === 0) {
            let btnEdit = By.xpath(`//table//tr[${i}]//*[@id='pgs-lead-edit-lead-button']`);
            await this.driverService.click(btnEdit);
            return true;
          }
        }
      }
      logWarningMessage(`Can't find lead with name \"${selectedLead}\" into Lead List`);
      return false;
    } catch (error) {
      console.log("pressEditByName");
      console.log(error);
      return false;
    }
  }

  public async pressEditLeadFormByPositionRow(positionRow: number = 1) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      let btnEdit = By.xpath(`//table//tr[${positionRow}]//*[@id='pgs-lead-edit-lead-button']`);
      await this.driverService.click(btnEdit);
      return true;
    } catch (error) {
      console.log("pressEditLeadFormByPositionRow");
      console.log(error);
      return false;
    }
  }

  public async openLeadDetail() {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.click(this.lblName);
      return true;
    } catch (error) {
      console.log('openLeadDetail');
      console.log(error);
      return false;
    }
  }
  public async verifyImportLeadButton() {
    try {
      await this.driverService.waitUntilElementLoaded(By.xpath(`//app-lead-page`));
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      let temp = await this.driverService.isExisted(this.importLeadBtn);

      return temp;
    } catch (error) {
      console.log(`verifyImportLeadButton`);
      console.log(error);
      return false;
    }
  }

  //Input: name of lead
  //Output: detail of that lead is opened
  public async openDetailLeadByName(selectedLead: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      for (let i = 1; i <= 30; i++) {
        let lblName = By.xpath(`//table//tr[${i}]//td[contains(@class,'pgs-lead-name')]//*[self::*[text()]]`);
        if (await this.driverService.isExisted(lblName)) {
          let nameLead = await this.driverService.getText(lblName);
          if (nameLead.localeCompare(selectedLead) === 0) {
            await this.driverService.click(lblName);
            return true;
          }
        }
      }
      logWarningMessage(`Can't find lead with name \"${selectedLead}\" into Lead List`);
      return false;
    } catch (error) {
      console.log("openDetailLeadByName");
      console.log(error);
      return false;
    }
  }

  public async assertLead(
    positionRow: number = 1,
    name: string,
    company: string,
    mobile: string,
    email: string
  ) {
    let actualName: string = "";
    let actualCompany: string = "";
    let actualMobile: string = "";
    let actualEmail: string = "";

    try {
      const lblName = By.xpath(`//table//tr[${positionRow}]//td[contains(@class,'pgs-lead-name')]//*[self::*[text()]]`);
      const lblCompany = By.xpath(`//table//tr[${positionRow}]//td[contains(@class,'pgs-lead-company')]//*[self::*[text()]]`);
      const lblMobile = By.xpath(`//table//tr[${positionRow}]//td[contains(@class,'pgs-lead-mobile')]//*[self::*[text()]]`);
      const lblEmail = By.xpath(`//table//tr[${positionRow}]//td[contains(@class,'pgs-lead-email')]//*[self::*[text()]]`);
      await this.driverService.waitForSeconds(10000);
      await this.driverService.waitUntilElementLoaded(lblName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);

      actualName = await this.driverService.getText(lblName);
      actualCompany = await this.driverService.getText(lblCompany);
      actualMobile = await this.driverService.getText(lblMobile);
      actualEmail = await this.driverService.getText(lblEmail);
    } catch (error) {
      console.log("Assert Create - edit lead!");
      console.log(error);
    }

    await this.driverService.validateTestCase(
      scenarioName,
      [actualName, name, "Assert at Name: Incorrect Name!"],
      [actualEmail, email, "Assert at email: Incorrect Email!"],
      [actualMobile, mobile, "Assert at Phone: Incorrect Phone!"],
      [actualCompany, company, "Assert at Address: Incorrect Company!"]
    );
  }

  public async pressDeleteByName(deleteLead: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      for (let i = 1; i <= 30; i++) {
        let lblName = By.xpath(`//table//tr[${i}]//td[contains(@class,'pgs-lead-name')]//*[self::*[text()]]`);
        if ((await this.driverService.isExisted(lblName)) === false) {
          // fail(`Can't find lead with name \"${deleteLead}\" into Lead List`);
        } else {
          let leadName = await this.driverService.getText(lblName);
          if (leadName.localeCompare(deleteLead) === 0) {
            let btnDelete = By.xpath(`//table//tr[${i}]//*[@id='pgs-lead-act-delete-btn']`);
            await this.driverService.click(btnDelete);
            return true;
          }
        }
      }
      logWarningMessage(`Can't find lead with name \"${deleteLead}\" into Lead List`);
      return false;
    } catch (error) {
      console.log("pressDeleteByName");
      console.log(error);
      return true;
    }
  }

  // Validate values at Lead list
  public async validateValueLeadList(expectedValue: string, nameOfColumn: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
    try {
      let temp = By.xpath("//div");
      switch (nameOfColumn) {
        case "Name": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-lead-name')]//*[self::*[text()]]`);
          break;
        }
        case "Company": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-lead-company')]//*[self::*[text()]]`);
          break;
        }
        case "Mobile": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-lead-mobile')]//*[self::*[text()]]`);
          break;
        }
        case "Email": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-lead-email')]//*[self::*[text()]]`);
          break;
        }
        default:
          logWarningMessage(`Column with name "${nameOfColumn}" is NOT found!`);
          return false;
      }
      await this.driverService.waitUntilElementLoaded(temp);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let actualValue = await this.driverService.getText(temp);

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

