import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2, selectDropdownOption, selectDropdownOption_v2, logWarningMessage, logInfoMessage, waitUntilHorizontalProgressBarLoaded } from "../../../../../shared/functions";
import { GlobalDateTimeContainer } from "../../../general/GlobalPageObject/GlobalDateTimeContainer";
import { GlobalPageObject } from "../../../general/GlobalPageObject/GlobalPageObject";


export class ClaimFormInsurance extends BasePage {

  //Xpath of elements on Register a claim form
  protected lblTitleForm = By.xpath(`//*[contains(local-name(),'claim-form')]//h4/span`);
  protected cmbOrganization = By.xpath(`//*[contains(local-name(),'claim-form')]//label[contains(text(),'Organization')]/following-sibling::*//input`);
  protected cmbOrganizationValue = By.xpath(`//*[contains(local-name(),'claim-form')]//label[contains(text(),'Organization')]/following-sibling::*//span[contains(@class,'ng-value-label')]`);
  protected cmbAccount = By.xpath(`//*[contains(local-name(),'claim-form')]//*[contains(@class,'pgs-json-schema-control-account')]//input`);
  protected cmbAccountValue = By.xpath(`//*[contains(local-name(),'claim-form')]//*[contains(@class,'pgs-json-schema-control-account')]//span[contains(@class,'ng-value-label')]`);
  protected cmbPolicy = By.xpath(`//*[contains(local-name(),'claim-form')]//*[contains(@class,'pgs-json-schema-control-policy')]//input`);
  protected cmbPolicyValue = By.xpath(`(//*[contains(local-name(),'claim-form')]//*[contains(@class,'pgs-json-schema-control-policy')]//*[contains(@class,'ng-value')])[last()]`);
  protected dtpDateOfLoss = By.xpath(`//*[contains(local-name(),'claim-form')]//*[contains(@class,'pgs-json-schema-control-date-of-loss')]`);
  protected cmbProduct = By.xpath(`//*[contains(local-name(),'claim-form')]//*[contains(@class,'pgs-json-schema-control-product')]//input`);
  protected cmbProductValue = By.xpath(`//*[contains(local-name(),'claim-form')]//*[contains(@class,'pgs-json-schema-control-product')]//span[contains(@class,'ng-value-label')]`);
  protected dtpReportedDate = By.xpath(`//*[contains(local-name(),'claim-form')]//*[contains(@class,'pgs-json-schema-control-reported-date')]`);
  protected cmbObjectName = By.xpath(`//*[contains(@class,'pgs-json-schema-control-object-name')]//span[contains(@class,'ng-value-label')]`);
  protected txtAddress = By.xpath(`//*[contains(local-name(),'claim-form')]//*[contains(@class,'pgs-json-schema-control-claimant-address') or contains(@class,'pgs-json-schema-control-address')]`);
  protected cmbClaimHandler = By.xpath(`//*[contains(local-name(),'claim-form')]//*[contains(@class,'pgs-json-schema-control-claim-handler')]//input`);
  protected cmbClaimHandlerValue = By.xpath(`//*[contains(local-name(),'claim-form')]//*[contains(@class,'pgs-json-schema-control-claim-handler')]//span[contains(@class,'ng-value-label')]`);
  protected txtPhoneNumber = By.xpath(`//*[contains(local-name(),'claim-form')]//*[contains(@class,'pgs-json-schema-control-claimant-phone') or contains(@class,'pgs-json-schema-control-phone-number')]`);
  protected txtEmailAddress = By.xpath(`//*[contains(local-name(),'claim-form')]//*[contains(@class,'pgs-json-schema-control-claimant-email') or contains(@class,'pgs-json-schema-control-email-address')]`);
  protected txtNotes = By.xpath(`//*[contains(local-name(),'claim-form')]//*[contains(@class,'pgs-json-schema-control-notes')]`);

  //Xpath "x" - clear-all on Register a claim form
  private btnClearOrganization = By.xpath(`//*[contains(local-name(),'claim-form')]//formly-org-autocomplete//*[contains(@title,'Clear all')]`);
  private btnClearAccount = By.xpath(`//*[contains(local-name(),'claim-form')]//*[contains(@class,'pgs-json-schema-control-account')]//*[contains(@title,'Clear all')]`);
  private btnClearPolicy = By.xpath(`//*[contains(local-name(),'claim-form')]//*[contains(@class,'pgs-json-schema-control-policy')]//*[contains(@title,'Clear all')]`);
  private btnClearAddress = By.xpath(`//*[contains(local-name(),'claim-form')]//*[contains(@class,'pgs-json-schema-control-address')]/following-sibling::*[contains(@class,'btn-clear')]`);
  private btnClearClaimHandler = By.xpath(`//*[contains(local-name(),'claim-form')]//*[contains(@class,'pgs-json-schema-control-claim-handler')]//*[contains(@title,'Clear all')]`);
  private btnClearPhoneNumber = By.xpath(`//*[contains(local-name(),'claim-form')]//*[contains(@class,'pgs-json-schema-control-phone-number')]/following-sibling::*[contains(@class,'btn-clear')]`);
  private btnClearEmailAddress = By.xpath(`//*[contains(local-name(),'claim-form')]//*[contains(@class,'pgs-json-schema-control-email-address')]/following-sibling::*[contains(@class,'btn-clear')]`);

  // Methods on Register a claim form
  public async inputOrganizationClaimForm(Organization: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbOrganization);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.cmbOrganization, Organization);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await selectDropdownOption(Organization, "", this.driverService);
      return true;
    } catch (error) {
      console.log("inputOrganizationClaimForm\n" + error);
      return false;
    }
  }

  public async inputAccountClaimForm(SelectedAccount: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbAccount);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.click(this.cmbAccount);
      await this.driverService.setText(this.cmbAccount, SelectedAccount);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.waitForSeconds(5000);
      await selectDropdownOption(SelectedAccount, "", this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      return true;
    } catch (error) {
      console.log("inputAccountClaimForm\n" + error);
      return false;
    }
  }

  public async inputProductClaimForm(Product: string) {
    try {
      await this.driverService.waitUntilElementVisible(this.cmbProduct);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.cmbProduct, Product);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.click(this.cmbProduct);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await selectDropdownOption(Product, "", this.driverService);
      return true;
    } catch (error) {
      console.log("inputProductClaimForm\n" + error);
      return false;
    }
  }

  public async inputPolicyClaimForm(PolicyId: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbPolicy);
      await this.driverService.click(this.cmbPolicy);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.cmbPolicy, PolicyId);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await selectDropdownOption_v2(PolicyId, "", this.driverService);
      return true;
    } catch (error) {
      console.log("inputPolicyClaimForm\n" + error);
      return false;
    }
  }

  public async inputDateOfLossClaimForm(DateOfLoss: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.dtpDateOfLoss);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.click(this.dtpDateOfLoss);
      const globalDateTimeContainer = new GlobalDateTimeContainer(SeleniumWebDriverService.getInstance());
      await globalDateTimeContainer.inputDateTime(DateOfLoss);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService,500);
      return true;
    } catch (error) {
      console.log("inputDateOfLossClaimForm\n" + error);
      return false;
    }
  }

  public async inputDateOfLossClaimFormUseDefaultValue() {
    try {
      await this.driverService.waitUntilElementLoaded(this.dtpDateOfLoss);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.click(this.dtpDateOfLoss);
      const globalDateTimeContainer = new GlobalDateTimeContainer(SeleniumWebDriverService.getInstance());
      await globalDateTimeContainer.pressSetButton();
      await globalDateTimeContainer.waitUntilDateTimeContainerInvisible();
      const result = await this.driverService.getAttributeValue(this.dtpDateOfLoss, 'value');
      return result;
    } catch (error) {
      console.log("inputDateOfLossClaimFormUseDefaultValue\n" + error);
      return "";
    }
  }

  public async inputObjectNameClaimForm(value: string) {
    try {
      await this.driverService.waitUntilElementVisible(this.cmbObjectName);
      await this.driverService.setText(this.cmbObjectName, value);
      return true;
    } catch (error) {
      console.log('inputObjectNameClaimForm');
      console.log(error);
      return false;
    }
  }

  // Incident Type Customer portal
  public async inputCauseOfLossClaimForm(value: string): Promise<boolean> {
    throw new Error("Method is Not implemented yet!");
  }
  public async inputCityClaimForm(value: string): Promise<boolean> {
    throw new Error("Method is Not implemented yet!");
  }
  public async inputAddressClaimForm(Address: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtAddress);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtAddress, Address);
      return true;
    } catch (error) {
      console.log("inputAddressClaimForm\n" + error);
      return false;
    }
  }

  public async inputClaimHandlerClaimForm(ClaimHandler: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbClaimHandler);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.cmbClaimHandler, ClaimHandler);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await selectDropdownOption_v2(ClaimHandler, "", this.driverService);
      return true;
    } catch (error) {
      console.log("inputClaimHandlerClaimForm\n" + error);
      return false;
    }
  }

  public async inputPhoneNumberClaimForm(PhoneNumber: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtPhoneNumber);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtPhoneNumber, PhoneNumber);
      return true;
    } catch (error) {
      console.log("inputPhoneNumberClaimForm\n" + error);
      return false;
    }
  }

  public async inputEmailAddressClaimForm(EmailAddress: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtEmailAddress);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtEmailAddress, EmailAddress);
      return true;
    } catch (error) {
      console.log("inputEmailAddressClaimForm\n" + error);
      return false;
    }
  }

  public async inputNotesClaimForm(Notes: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtNotes);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtNotes, Notes);
      return true;
    } catch (error) {
      console.log("inputNotesClaimForm\n" + error);
      return false;
    }
  }

  // Method to clear data into field on Register a claim form
  public async clearDataOrganizationClaimForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbOrganization);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      if (await this.driverService.isExisted(this.btnClearOrganization)) {
        await this.driverService.click(this.btnClearOrganization);
      }
      return true;
    } catch (error) {
      console.log("clearDataOrganizationClaimForm\n" + error);
      return false;
    }
  }

  public async clearDataAccountClaimForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbAccount);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      if (await this.driverService.isExisted(this.btnClearAccount)) {
        await this.driverService.click(this.btnClearAccount);
      }
      return true;
    } catch (error) {
      console.log("clearDataAccountClaimForm\n" + error);
      return false;
    }
  }

  public async clearDataPolicyClaimForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbPolicy);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      if (await this.driverService.isExisted(this.btnClearPolicy)) {
        await this.driverService.click(this.btnClearPolicy);
      }
      return true;
    } catch (error) {
      console.log("clearDataPolicyClaimForm\n" + error);
      return false;
    }
  }

  public async clearDataDateOfLossClaimForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.dtpDateOfLoss);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.clearOldDataIntoField(this.dtpDateOfLoss);
      return true;
    } catch (error) {
      console.log("clearDataDateOfLossClaimForm\n" + error);
      return false;
    }
  }

  public async clearDataAddressClaimForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtAddress);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      if (await this.driverService.isExisted(this.btnClearAddress)) {
        await this.driverService.click(this.btnClearAddress);
      }
      return true;
    } catch (error) {
      console.log("clearDataAddressClaimForm\n" + error);
      return false;
    }
  }

  public async clearDataClaimHandlerClaimForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbClaimHandler);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      if (await this.driverService.isExisted(this.btnClearClaimHandler)) {
        await this.driverService.click(this.btnClearClaimHandler);
      }
      return true;
    } catch (error) {
      console.log("clearDataClaimHandlerClaimForm\n" + error);
      return false;
    }
  }

  public async clearDataPhoneNumberClaimForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtPhoneNumber);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      if (await this.driverService.isExisted(this.btnClearPhoneNumber)) {
        await this.driverService.click(this.btnClearPhoneNumber);
      }
      return true;
    } catch (error) {
      console.log("clearDataPhoneNumberClaimForm\n" + error);
      return false;
    }
  }

  public async clearDataEmailAddressClaimForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtEmailAddress);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      if (await this.driverService.isExisted(this.btnClearEmailAddress)) {
        await this.driverService.click(this.btnClearEmailAddress);
      }
      return true;
    } catch (error) {
      console.log("clearDataEmailAddressClaimForm\n" + error);
      return false;
    }
  }

  public async clearDataNotesClaimForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtNotes);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.clearOldDataIntoField(this.txtNotes);
      return true;
    } catch (error) {
      console.log("clearDataNotesClaimForm\n" + error);
      return false;
    }
  }

  // Validate values at claim form
  public async validateProductClaimForm(Product: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbProductValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const actualProduct = await this.driverService.getText(this.cmbProductValue);
      return await this.driverService.validateRecord("Validate product",
        [actualProduct, Product, "Incorrect product"]
      );
    } catch (error) {
      console.log("validateProductClaimForm\n" + error);
      return false;
    }
  }

  public async validateValueClaimForm(expectedValue: string, nameOfField: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbAccount);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let actualValue = "";
      switch (nameOfField) {
        case "Reference": {
          actualValue = await this.driverService.getText(this.lblTitleForm);
          expectedValue = "UPDATE CLAIM " + expectedValue;
          break;
        }
        case "Claim ReferenceId": {
          actualValue = await this.driverService.getText(this.lblTitleForm);
          expectedValue = "UPDATE CLAIM " + expectedValue;
          break;
        }
        case "Organization": {
          actualValue = await this.driverService.getText(this.cmbOrganizationValue);
          break;
        }
        case "Account": {
          actualValue = await this.driverService.getText(this.cmbAccountValue);
          break;
        }
        case "Policy": {
          actualValue = await this.driverService.getText(this.cmbPolicyValue);
          break;
        }
        case "Date of loss": {
          actualValue = await this.driverService.getAttributeValue(this.dtpDateOfLoss, 'value');
          break;
        }
        case "Product": {
          actualValue = await this.driverService.getText(this.cmbProductValue)
          break;
        }
        case "Reported date": {
          actualValue = await this.driverService.getAttributeValue(this.dtpReportedDate, 'value');
          break;
        }
        case "Object name": {
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 3000);
          actualValue = await this.driverService.getText(this.cmbObjectName);
          break;
        }
        case "Address": {
          actualValue = await this.driverService.getAttributeValue(this.txtAddress, 'value');
          break;
        }
        case "Claim handler": {
          if (await this.driverService.isExisted(this.cmbClaimHandlerValue)) {
            actualValue = await this.driverService.getText(this.cmbClaimHandlerValue);
          }
          else {
            actualValue = "";// = N/A if enhancement approved
          }
          break;
        }
        case "Phone number": {
          actualValue = await this.driverService.getAttributeValue(this.txtPhoneNumber, 'value');
          break;
        }
        case "Email address": {
          actualValue = await this.driverService.getAttributeValue(this.txtEmailAddress, 'value');
          break;
        }
        case "Notes": {
          actualValue = await this.driverService.getAttributeValue(this.txtNotes, 'value');
          break;
        }
        default:
          logWarningMessage(`Field with name "${nameOfField}" is NOT found!`);
          return false;
      }
      if (nameOfField.localeCompare("Policy") === 0 || nameOfField.localeCompare("Claim handler") === 0) {
        if (actualValue.includes(expectedValue)) {// Policy dropdown has format "Reference - Term: dd/mm/YYYY - dd/mm/YYYY - Name"
          actualValue = expectedValue = "temp";
        }
      }
      return await this.driverService.validateRecord(`Validate field "${nameOfField}"`,
        [actualValue, expectedValue, `Incorrect "${nameOfField}"!`]
      );
    } catch (error) {
      console.log("validateValueClaimForm\n" + error);
      return false;
    }
  }

  public async checkValidationClaimFormExist(message: string = "") {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbAccount);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      const lblValidationMessage = message ? By.xpath(`//app-claim-form//*[contains(local-name(),'form')]//*[contains(@class,"invalid-feedback")]/*[text()='${message}']`) : By.xpath(`//app-claim-form//*[contains(local-name(),'form')]//*[contains(@class,"invalid-feedback")]/*`);
      return await this.driverService.isExisted(lblValidationMessage);
    } catch (error) {
      console.log("checkValidationClaimFormExist");
      console.log(error);
      return false;
    }
  }

  public async waitUntilClaimFormClosed() {
    try {
      await this.driverService.waitForElementInVisible(this.lblTitleForm);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      return true;
    } catch (error) {
      console.log('waitUntilClaimFormClosed');
      console.log(error);
      return false;
    }
  }
}