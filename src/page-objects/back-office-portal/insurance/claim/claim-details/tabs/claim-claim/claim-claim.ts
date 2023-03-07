import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../../../core/BasePage";
import { SeleniumWebDriverService } from "../../../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2, selectDropdownOption, logWarningMessage, logInfoMessage, logSuccessMessage, waitUntilHorizontalProgressBarLoaded } from "../../../../../../../shared/functions";

// Claim tab at Claim detail
export class ClaimTabClaimInsurance extends BasePage {

  private btnCopyFromPolicyholder = By.xpath(" //div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[text()=' Copy from Policyholder ']");
  private checkboxUpdateToRecipientList = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//formly-field-checkbox[.//label[contains(text(),'Update to Recipient List')]]//input");
  private labelUpdateToRecipientList = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//label[contains(text(),'Update to Recipient List')]");
  private checkboxAddToRecipientList = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//formly-field-checkbox[.//label[contains(text(),'Add to Recipient List')]]//input");
  private labelAddToRecipientList = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//label[contains(text(),'Add to Recipient List')]");

  //Elements at Claim Details
  private dtpDateOccurredClaimDetails = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-information//input[contains(@class,'pgs-json-schema-control-date-occurred')]");
  private dtpTimeOccurredClaimDetails = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-information//input[contains(@class,'pgs-json-schema-control-time-occurred')]")

  private txtDescriptionOfLossInDetailsClaimDetails = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-information//textarea[contains(@class,'pgs-json-schema-control-description-of-loss-damage')]");
  private txtHowWasItCauseClaimDetails = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-information//textarea[contains(@class,'pgs-json-schema-control-how-was-it-caused')]");

  private rdbYesWasAnotherPersonReponsibleForTheLossClaimDetails = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-information//label[./input[@name='wasResponsibleForLoss' and @value='yes']]");
  private rdbYesWasAnotherPersonReponsibleForTheLossClaimDetails_inputTag = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-information//label/input[@name='wasResponsibleForLoss' and @value='yes']");
  private rdbNoWasAnotherPersonReponsibleForTheLossClaimDetails = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-information//label[./input[@name='wasResponsibleForLoss' and @value='no']]");
  private rdbNoWasAnotherPersonReponsibleForTheLossClaimDetails_inputTag = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-information//label/input[@name='wasResponsibleForLoss' and @value='no']");

  private rdbYesWereThereAnyWitnessesToTheLossClaimDetails = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-information//label[./input[@name='hasWitnesses' and @value='yes']]");
  private rdbYesWereThereAnyWitnessesToTheLossClaimDetails_inputTag = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-information//label/input[@name='hasWitnesses' and @value='yes']");
  private rdbNoWereThereAnyWitnessesToTheLossClaimDetails = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-information//label[./input[@name='hasWitnesses' and @value='no']]");
  private rdbNoWereThereAnyWitnessesToTheLossClaimDetails_inputTag = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-information//label/input[@name='hasWitnesses' and @value='no']");

  private txtNameAndContactPersonResponsibleForTheLossClaimDetails = By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-information//div[./label[contains(text(),'If "Yes", please provide the name and contact')]]//textarea)[1]`);
  private txtNameAndContactWitnessesToTheLossClaimDetails = By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-information//div[./label[contains(text(),'If "Yes", please provide the name and contact')]]//textarea)[2]`);



  //Elements at Others
  private txtAdditionalInformationOthers = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-information//textarea[contains(@class,'pgs-json-schema-control-additional-information')]`);
  //#region /*Begin: Input data into field at section Claimant*/

  public async selectType(Type: string = 'Person') {
    try {
      let xpathSelect = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-information//formly-wrapper-form-field[.//label[text()=' Type ']]//select`);
      await this.driverService.waitUntilElementVisible(xpathSelect);
      await this.driverService.click(xpathSelect);

      let xpathOption = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-information//formly-wrapper-form-field[.//label[text()=' Type ']]//option[contains(text(),'${Type}')]`);
      await this.driverService.waitUntilElementVisible(xpathOption);
      await this.driverService.click(xpathOption);
      return true;
    } catch (error) {
      console.log('selectType');
      console.log(error);
      return false;
    }
  }

  public async inputValueClaimant(nameOfField: string, value: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnCopyFromPolicyholder);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const inputLocator = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-information//formly-wrapper-form-field[.//label[text()=' ${nameOfField} ']]//input`);

      if (nameOfField.localeCompare("Country") === 0 || nameOfField.localeCompare("or select from Recipient List") === 0) {
        await this.driverService.setText(inputLocator, value);
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
        await selectDropdownOption(value, "", this.driverService);
      }
      else {
        await this.driverService.setText(inputLocator, value);
      }
      return true;
    } catch (error) {
      logWarningMessage(`Input value = "${value}" into "${nameOfField}" at Claimant failed!`);
      console.log('inputValueClaimant');
      console.log(error);
      return false;
    }
  }
  //#endregion

  public async UpdateToRecipientList() {
    try {
      await this.driverService.waitUntilElementLoaded(this.checkboxUpdateToRecipientList);
      let isChecked = await this.driverService.getAttributeValue(this.checkboxUpdateToRecipientList, "checked");
      if (isChecked != 'true') {
        await this.driverService.click(this.labelUpdateToRecipientList);
      }
      return true;
    } catch (error) {
      console.log("UpdateToRecipientList");
      console.log(error);
      return false;
    }
  }

  public async UnAddToRecipientList() {
    try {
      await this.driverService.waitUntilElementLoaded(this.checkboxAddToRecipientList);
      let isChecked = await this.driverService.getAttributeValue(this.checkboxAddToRecipientList, "checked");
      if (isChecked == 'true') {
        await this.driverService.click(this.labelAddToRecipientList);
      }
      return true;
    } catch (error) {
      console.log("UnAddToRecipientList");
      console.log(error);
      return false;
    }
  }


  //#region /*Begin: Input data into field at section Claim detail*/
  public async inputDateOccuredClaimDetails(DateOccurred: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.dtpDateOccurredClaimDetails);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.dtpDateOccurredClaimDetails, DateOccurred);
      return true;
    } catch (error) {
      console.log('inputDateOccuredClaimDetails');
      console.log(error);
      return false;
    }
  }

  public async inputTimeOccuredClaimDetails(TimeOccurred: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.dtpTimeOccurredClaimDetails);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.dtpTimeOccurredClaimDetails, TimeOccurred);
      return true;
    } catch (error) {
      console.log('inputTimeOccuredClaimDetails');
      console.log(error);
      return false;
    }
  }


  public async inputDescriptionOfLossInDetailClaimDetails(DescriptionOfLoss: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtDescriptionOfLossInDetailsClaimDetails);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtDescriptionOfLossInDetailsClaimDetails, DescriptionOfLoss);
      return true;
    } catch (error) {
      console.log('inputDescriptionOfLossInDetailClaimDetails');
      console.log(error);
      return false;
    }
  }

  public async inputHowWasItCausedClaimDetails(HowWasItCaused: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtHowWasItCauseClaimDetails);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtHowWasItCauseClaimDetails, HowWasItCaused);
      return true;
    } catch (error) {
      console.log('inputHowWasItCausedClaimDetails');
      console.log(error);
      return false;
    }
  }

  public async inputWasAnotherPersonResponsibleForTheLossClaimDetails(option: string) {
    try {
      switch (option) {
        case 'yes': case 'Yes': case 'YES': case 'true': {
          await this.driverService.waitUntilElementLoaded(this.rdbYesWasAnotherPersonReponsibleForTheLossClaimDetails);
          await this.driverService.scrollElementToView(await this.driverService.findElement(this.rdbYesWasAnotherPersonReponsibleForTheLossClaimDetails));
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
          await this.driverService.click(this.rdbYesWasAnotherPersonReponsibleForTheLossClaimDetails);
          break;
        }
        case 'no': case 'No': case 'NO': case 'false': {
          await this.driverService.waitUntilElementLoaded(this.rdbNoWasAnotherPersonReponsibleForTheLossClaimDetails);
          await this.driverService.scrollElementToView(await this.driverService.findElement(this.rdbNoWasAnotherPersonReponsibleForTheLossClaimDetails));
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
          await this.driverService.click(this.rdbNoWasAnotherPersonReponsibleForTheLossClaimDetails);
          break;
        }
        default: {
          logWarningMessage(`Option "${option}" is incorrect. It must be  "Yes" or "No"!`);
          return false;
        }
      }
      return true;
    } catch (error) {
      console.log('inputWasAnotherPersonResponsibleForTheLossClaimDetails');
      console.log(error);
      return false;
    }
  }

  public async inputWereThereAnyWitnessesToTheLossClaimDetails(option: string) {
    try {
      switch (option) {
        case 'yes': case 'Yes': case 'YES': case 'true': {
          await this.driverService.waitUntilElementLoaded(this.rdbYesWereThereAnyWitnessesToTheLossClaimDetails);
          await this.driverService.scrollElementToView(await this.driverService.findElement(this.rdbYesWereThereAnyWitnessesToTheLossClaimDetails));
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
          await this.driverService.click(this.rdbYesWereThereAnyWitnessesToTheLossClaimDetails);
          break;
        }
        case 'no': case 'No': case 'NO': case 'false': {
          await this.driverService.waitUntilElementLoaded(this.rdbNoWereThereAnyWitnessesToTheLossClaimDetails);
          await this.driverService.scrollElementToView(await this.driverService.findElement(this.rdbNoWereThereAnyWitnessesToTheLossClaimDetails));
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
          await this.driverService.click(this.rdbNoWereThereAnyWitnessesToTheLossClaimDetails);
          break;
        }
        default: {
          logWarningMessage(`Option "${option}" is incorrect. It must be  "Yes" or "No"!`);
          return false;
        }
      }
      return true;
    } catch (error) {
      console.log('inputWereThereAnyWitnessesToTheLossClaimDetails');
      console.log(error);
      return false;
    }
  }

  public async inputNameAndContactPersonResponsibleOfTheLossClaimDetails(NameAndContact: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtNameAndContactPersonResponsibleForTheLossClaimDetails);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtNameAndContactPersonResponsibleForTheLossClaimDetails, NameAndContact);
      return true;
    } catch (error) {
      console.log('inputNameAndContactPersonResponsibleOfTheLossClaimDetails');
      console.log(error);
      return false;
    }
  }

  public async inputNameAndContactWitnessesToTheLossClaimDetail(NameAndContact: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtNameAndContactWitnessesToTheLossClaimDetails);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtNameAndContactWitnessesToTheLossClaimDetails, NameAndContact);
      return true;
    } catch (error) {
      console.log('inputNameAndContactWitnessesToTheLossClaimDetail');
      console.log(error);
      return false;
    }
  }
  //#endregion


  //#region Begin: Input data into field at section Others
  public async inputAdditionalInformationOthers(details: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtAdditionalInformationOthers);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtAdditionalInformationOthers, details);
      return true;
    } catch (error) {
      console.log('inputAdditionalInformationOthers');
      console.log(error);
      return false;
    }
  }
  //#region 


  //#region /*Begin: Get value into field at section Claimant*/
  public async getValueClaimant(nameOfField: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnCopyFromPolicyholder);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const locator = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-information//formly-wrapper-form-field[.//label[text()=' ${nameOfField} ']]//input`);

      return await this.driverService.getAttributeValue(locator, 'value');
    } catch (error) {
      logWarningMessage(`Get value into "${nameOfField}" at Claimant failed!`);
      console.log('getValueClaimant');
      console.log(error);
      return "";
    }
  }
  //#endregion


  //#region /*Begin: Get value into field at section Claim detail*/
  public async getValueDateOccuredClaimDetails() {
    try {
      await this.driverService.waitUntilElementLoaded(this.dtpDateOccurredClaimDetails);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      return await this.driverService.getAttributeValue(this.dtpDateOccurredClaimDetails, 'value');
    } catch (error) {
      console.log('getValueDateOccuredClaimDetails');
      console.log(error);
      return "";
    }
  }

  public async getValueTimeOccuredClaimDetails() {
    try {
      await this.driverService.waitUntilElementLoaded(this.dtpTimeOccurredClaimDetails);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      return await this.driverService.getAttributeValue(this.dtpTimeOccurredClaimDetails, 'value');
    } catch (error) {
      console.log('getValueTimeOccuredClaimDetails');
      console.log(error);
      return "";
    }
  }


  public async getValueDescriptionOfLossInDetailClaimDetails() {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtDescriptionOfLossInDetailsClaimDetails);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      return await this.driverService.getAttributeValue(this.txtDescriptionOfLossInDetailsClaimDetails, 'value');
    } catch (error) {
      console.log('getValueDescriptionOfLossInDetailClaimDetails');
      console.log(error);
      return "";
    }
  }

  public async getValueHowWasItCausedClaimDetails() {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtHowWasItCauseClaimDetails);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      return await this.driverService.getAttributeValue(this.txtHowWasItCauseClaimDetails, 'value');
    } catch (error) {
      console.log('getValueHowWasItCausedClaimDetails');
      console.log(error);
      return "";
    }
  }

  public async getValueWasAnotherPersonResponsibleForTheLossClaimDetails(option: string) {
    try {
      switch (option) {
        case 'yes': case 'Yes': case 'YES': case 'true': {
          await this.driverService.waitUntilElementLoaded(this.rdbYesWasAnotherPersonReponsibleForTheLossClaimDetails_inputTag);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
          return await this.driverService.getAttributeValue(this.rdbYesWasAnotherPersonReponsibleForTheLossClaimDetails_inputTag, 'checked');
        }
        case 'no': case 'No': case 'NO': case 'false': {
          await this.driverService.waitUntilElementLoaded(this.rdbNoWasAnotherPersonReponsibleForTheLossClaimDetails_inputTag);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
          return await this.driverService.getAttributeValue(this.rdbNoWasAnotherPersonReponsibleForTheLossClaimDetails_inputTag, 'checked');
        }
        default: {
          logWarningMessage(`Option "${option}" is incorrect. It must be  "Yes" or "No"!`);
          return "";
        }
      }
    } catch (error) {
      console.log('getValueWasAnotherPersonResponsibleForTheLossClaimDetails');
      console.log(error);
      return "";
    }
  }

  public async getValueWereThereAnyWitnessesToTheLossClaimDetails(option: string) {
    try {
      switch (option) {
        case 'yes': case 'Yes': case 'YES': case 'true': {
          await this.driverService.waitUntilElementLoaded(this.rdbYesWereThereAnyWitnessesToTheLossClaimDetails_inputTag);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
          return await this.driverService.getAttributeValue(this.rdbYesWereThereAnyWitnessesToTheLossClaimDetails_inputTag, 'checked');
        }
        case 'no': case 'No': case 'NO': case 'false': {
          await this.driverService.waitUntilElementLoaded(this.rdbNoWereThereAnyWitnessesToTheLossClaimDetails_inputTag);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
          return await this.driverService.getAttributeValue(this.rdbNoWereThereAnyWitnessesToTheLossClaimDetails_inputTag, 'checked');
        }
        default: {
          logWarningMessage(`Option "${option}" is incorrect. It must be  "Yes" or "No"!`);
          return "";
        }
      }
    } catch (error) {
      console.log('inputWereThereAnyWitnessesToTheLossClaimDetails');
      console.log(error);
      return "";
    }
  }

  public async getValueNameAndContactPersonResponsibleOfTheLossClaimDetails() {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtNameAndContactPersonResponsibleForTheLossClaimDetails);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      return await this.driverService.getAttributeValue(this.txtNameAndContactPersonResponsibleForTheLossClaimDetails, 'value');
    } catch (error) {
      console.log('getValueNameAndContactPersonResponsibleOfTheLossClaimDetails');
      console.log(error);
      return "";
    }
  }

  public async getValueNameAndContactWitnessesToTheLossClaimDetail() {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtNameAndContactWitnessesToTheLossClaimDetails);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      return await this.driverService.getAttributeValue(this.txtNameAndContactWitnessesToTheLossClaimDetails, 'value');
    } catch (error) {
      console.log('getValueNameAndContactWitnessesToTheLossClaimDetail');
      console.log(error);
      return "";
    }
  }
  //#endregion

  //#region Begin: Input data into field at section Others
  public async getValueAdditionalInformationOthers() {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtAdditionalInformationOthers);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      return await this.driverService.getText(this.txtAdditionalInformationOthers);
    } catch (error) {
      console.log('getValueAdditionalInformationOthers');
      console.log(error);
      return '';
    }
  }
  //#endregion

  //#region /*Begin: Validate data into field at section Claimant*/
  public async validateValueClaimant(nameOfField: string, expectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnCopyFromPolicyholder);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let inputLocator = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-information//formly-wrapper-form-field[.//label[text()=' ${nameOfField} ']]//input`);
      const actualValue = await this.driverService.getAttributeValue(inputLocator, 'value');
      return await this.driverService.validateRecord(`Validate field "${nameOfField}"`,
        [actualValue, expectedValue, "Incorrect " + nameOfField]
      );
    } catch (error) {
      console.log('validateValueClaimant');
      console.log(error);
      return false;
    }
  }

  public async validateCountryValueClaimant(expectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnCopyFromPolicyholder);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let inputLocator = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-information//formly-wrapper-form-field//div[./div[text()='Country']]//span[2]`);
      let actualValue = await this.driverService.getText(inputLocator);
      return await this.driverService.validateRecord(`Validate field "Country"`,
        [actualValue, expectedValue, "Incorrect Country!"]
      );
    } catch (error) {
      console.log('validateCountryValueClaimant');
      console.log(error);
      return false;
    }
  }

  public async validateTypeValueClaimant(expectedValue: string) {
    try {
      const inputLocator = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-information//formly-wrapper-form-field[.//label[contains(text(),'Type')]]//option[contains(text(),'${expectedValue}')]`);
      if (await this.driverService.isExisted(inputLocator)) {
        logSuccessMessage(`Validate Type value on Claimant: Test passed!`);
        return true;
      };
      logSuccessMessage(`Validate Type value on Claimant: Test failed!`);
      return false;

    } catch (error) {
      console.log('validateValueClaimant');
      console.log(error);
      return false;
    }
  }
  //#endregion

  public async clickCopyFromPolicyholderButton(){
    try {
      let Elements = await this.getFieldType(this.btnCopyFromPolicyholder);
      await Elements.click();
      await waitUntilHorizontalProgressBarLoaded(this.driverService);
      return true;
    } catch (error) {
      console.log('clickCopyFromPolicyholderButton');
      console.log(error);
      return false;
    }
  }
}