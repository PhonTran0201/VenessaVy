import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2, selectDropdownOption, logWarningMessage } from "../../../../../shared/functions";


export class ClaimSettingTabDocumentChecklistsInsurance {

  //Elements at Document Check list
  private btnAddDocumentType = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[contains(text(),'Add Document Type')]");
  private cmbFilterProduct = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./div[text()='Filter Product']]//input");
  private txtDocumentTypeIdDocumentTypeForm = By.xpath("//app-claim-element-form//div[./label[@for='pgs-form-document-type-id']]//input");
  private cmbProductDocumentTypeForm = By.xpath("//app-claim-element-form//div[./label[@for='pgs-form-document-type-product']]//input");
  private txtDocumentTypeNameDocumentTypeForm = By.xpath("//app-claim-element-form//div[./label[@for='pgs-form-document-type-name']]//input");

  constructor(private driverService: SeleniumWebDriverService) { }

  public async openAddNewDocumentTypeForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnAddDocumentType);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.btnAddDocumentType);
      return true;
    } catch (error) {
      console.log('openAddNewDocumentTypeForm');
      console.log(error);
      return false;
    }
  }

  //#region // Methods at Document check list
  public async inputDocumentTypeIdDocumentTypeForm(documentTypeId: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtDocumentTypeIdDocumentTypeForm);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.setText(this.txtDocumentTypeIdDocumentTypeForm, documentTypeId);
      return true;
    } catch (error) {
      console.log('inputDocumentTypeIdDocumentTypeForm');
      console.log(error);
      return false;
    }
  }

  public async inputProductDocumentTypeForm(product: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbProductDocumentTypeForm);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.setText(this.cmbProductDocumentTypeForm, product);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await selectDropdownOption(product, "", this.driverService);
      return true;
    } catch (error) {
      console.log('inputProductDocumentTypeForm');
      console.log(error);
      return false;
    }
  }

  public async inputDocumentTypeNameDocumentTypeForm(documentTypeName: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtDocumentTypeNameDocumentTypeForm);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.setText(this.txtDocumentTypeNameDocumentTypeForm, documentTypeName);
      return true;
    } catch (error) {
      console.log('inputDocumentTypeNameDocumentTypeForm');
      console.log(error);
      return false;
    }
  }

  public async checkValidationOnDocumentTypeFormExist() {
    const validation = By.xpath(` //app-claim-element-form//formly-validation-message`);
    return await this.driverService.isExisted(validation);
  }
  public async checkFilterProductDropdownExist() {
    return await this.driverService.isExisted(this.cmbFilterProduct);
  }

  // Validate values at Document checklist
  public async validateValueDocumentTypeList(expectedValue: string, nameOfColumn: string, positionRow: number = 1) {
    try {
      let temp = By.xpath("//div");
      switch (nameOfColumn) {
        case "Document Type Id": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-document-type-column-document-type-id')]//*[self::*[text()]]`);
          break;
        }
        case "Document Type Name": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-document-type-column-name')]//*[self::*[text()]]`);
          break;
        }
        case "Product": {
          temp = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[contains(@class,'pgs-document-type-column-product')]//*[self::*[text()]]`);
          break;
        }
        default:
          logWarningMessage(`Column with name "${nameOfColumn}" is NOT found!`);
          return false;
      }
      await this.driverService.waitUntilElementLoaded(temp);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const actualValue = await this.driverService.getText(temp);

      return await this.driverService.validateRecord(`Validate column "${nameOfColumn}"`,
        [actualValue, expectedValue, `Incorrect "${nameOfColumn}"!`]
      );
    } catch (error) {
      console.log("validateValueDocumentTypeList");
      console.log(error);
      return false;
    }
  }

  public async openUpdateDocumentTypeFormByDocumentTypeId(selectedDocumentTypeId: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnAddDocumentType);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      for (let i = 1; i <= 30; i++) {
        let lblDocumentTypeId = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${i}]/td[contains(@class,'pgs-document-type-column-document-type-id')]//*[self::*[text()]]`);
        if (await this.driverService.isExisted(lblDocumentTypeId)) {
          let documentTypeId = await this.driverService.getText(lblDocumentTypeId);
          if (documentTypeId.localeCompare(selectedDocumentTypeId) === 0) {
            const btnEdit = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${i}]/td//i[contains(@class,'fa-edit')]`);
            await this.driverService.waitForSeconds(1000);
            await this.driverService.click(btnEdit);
            return true;
          }
        }
      }
      await logWarningMessage(`Can't find document type with \"${selectedDocumentTypeId}\" into Document type list`);
      return false;
    } catch (error) {
      console.log("openUpdateDocumentTypeFormByDocumentTypeId");
      console.log(error);
      return false;
    }
  }

  public async deleteDocumentTypeByDocumentTypeId(selectedDocumentTypeId: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnAddDocumentType);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      for (let i = 1; i <= 30; i++) {
        let lblDocumentTypeId = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${i}]/td[contains(@class,'pgs-document-type-column-document-type-id')]//*[self::*[text()]]`);
        if (await this.driverService.isExisted(lblDocumentTypeId)) {
          let documentTypeId = await this.driverService.getText(lblDocumentTypeId);
          if (documentTypeId.localeCompare(selectedDocumentTypeId) === 0) {
            const btnDelete = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${i}]/td//i[contains(@class,'fa-trash')]`);
            await this.driverService.waitForSeconds(1000);
            await this.driverService.click(btnDelete);
            return true;
          }
        }
      }
      await logWarningMessage(`Can't find document type with \"${selectedDocumentTypeId}\" into Document type list`);
      return false;
    } catch (error) {
      console.log("deleteDocumentTypeByDocumentTypeId");
      console.log(error);
      return false;
    }
  }

  public async checkDocumentTypeIdOnDocumentChecklistExist(documentTypeId: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnAddDocumentType);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      const lblDocumentTypeId = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//td[contains(@class,'pgs-document-type-column-document-type-id')]//*[@title='${documentTypeId}']`);
      return await this.driverService.isExisted(lblDocumentTypeId);
    } catch (error) {
      console.log('checkDocumentTypeIdOnDocumentChecklistExist');
      console.log(error);
      return false;
    }
  }
  //#endregion
}