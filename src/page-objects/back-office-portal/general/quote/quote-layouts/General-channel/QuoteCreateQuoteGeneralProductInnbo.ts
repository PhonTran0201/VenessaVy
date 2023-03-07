import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { logInfoMessage, logWarningMessage, selectDropdownOption, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../../shared/functions";
import { QuoteCreateQuote } from "../QuoteCreateQuote";


/**
 * Create Quote in Anonymous Quote for Product Travel
 */
export class QuoteCreateQuoteGeneralProductInnbo extends QuoteCreateQuote {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }

  //#region Product layouts
  //#region Section POLISEHOLDER
  protected txtFirstName = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//input[@id='FirstNameTag']`);
  protected txtLastName = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//input[@id='LastNameTag']`);
  protected dtpDOB = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//input[@id='DOBTag']`);
  //#endregion

  //#region Section BYGNINGS DETALJER
  protected txtAddressLine = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//input[@id='AddressLineTag']`);
  protected txtAddressPostcode = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//input[@id='AddrPostCodeTag']`);
  protected txtAddressCity = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//input[@id='AddrCityTag']`);
  protected cmbConstructionMethod = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//ng-select[@id='ConstructionMethodTag']`);
  protected cmbAlarm = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//ng-select[@id='AlarmTag']`);
  protected txtAlarmCompany = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//input[@id='AlarmCompanyTag']`);
  //#endregion

  //#region Section INNBOFORSIKRING
  protected txtContentSumInsured = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//input[@id='ContentSumInsuredTag']`);
  protected cmbContentDeductible = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//ng-select[@id='ContentDeductibleTag']`);
  protected cmbContentCover = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//ng-select[@id='ContentCoverTag']`);
  protected cmbMushroom = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//ng-select[@id='MushroomTag']`);
  protected txtFreeText= By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//textarea[@id='FreeTextTag']`);
  protected txtTerminationText = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//textarea[@id='TerminationTextTag']`);
  //#endregion
  //#endregion

  //#region Validate value on Product layout
  public async validateFirstName(expectedValue: string, isUsedForSearch: boolean = false) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtFirstName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const actualValue = await this.driverService.getAttributeValue(this.txtFirstName, 'value');
      if (isUsedForSearch) {
        return await this.driverService.validateRecordUsedForSearch("Validate FirstName!",
          [actualValue, expectedValue, "Incorrect FirstName!"]);
      } else {
        return await this.driverService.validateRecord("Validate FirstName!",
          [actualValue, expectedValue, "Incorrect FirstName!"]);
      }
    } catch (error) {
      console.log('validateFirstName');
      console.log(error);
      return false;
    }
  }

  public async validateLastName(expectedValue: string, isUsedForSearch: boolean = false) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtLastName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const actualValue = await this.driverService.getAttributeValue(this.txtLastName, 'value');
      if (isUsedForSearch) {
        return await this.driverService.validateRecordUsedForSearch("Validate LastName!",
          [actualValue, expectedValue, "Incorrect LastName!"]);
      } else {
        return await this.driverService.validateRecord("Validate LastName!",
          [actualValue, expectedValue, "Incorrect LastName!"]);
      }
    } catch (error) {
      console.log('validateLastName');
      console.log(error);
      return false;
    }
  }

  public async validateDOB(expectedValue: string, isUsedForSearch: boolean = false) {
    try {
      await this.driverService.waitUntilElementLoaded(this.dtpDOB);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const actualValue = await this.driverService.getAttributeValue(this.dtpDOB, 'value');
      if (isUsedForSearch) {
        return await this.driverService.validateRecordUsedForSearch("Validate DOB!",
          [actualValue, expectedValue, "Incorrect DOB!"]);
      } else {
        return await this.driverService.validateRecord("Validate DOB!",
          [actualValue, expectedValue, "Incorrect DOB!"]);
      }
    } catch (error) {
      console.log('validateDOB');
      console.log(error);
      return false;
    }
  }

  public async validateAddressLine(expectedValue: string, isUsedForSearch: boolean = false) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtAddressLine);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const actualValue = await this.driverService.getAttributeValue(this.txtAddressLine, 'value');
      if (isUsedForSearch) {
        return await this.driverService.validateRecordUsedForSearch("Validate AddressLine!",
          [actualValue, expectedValue, "Incorrect AddressLine!"]);
      } else {
        return await this.driverService.validateRecord("Validate AddressLine!",
          [actualValue, expectedValue, "Incorrect AddressLine!"]);
      }
    } catch (error) {
      console.log('validateAddressLine');
      console.log(error);
      return false;
    }
  }

  public async validateAddressPostcode(expectedValue: string, isUsedForSearch: boolean = false) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtAddressPostcode);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const actualValue = await this.driverService.getAttributeValue(this.txtAddressPostcode, 'value');
      if (isUsedForSearch) {
        return await this.driverService.validateRecordUsedForSearch("Validate AddressPostcode!",
          [actualValue, expectedValue, "Incorrect AddressPostcode!"]);
      } else {
        return await this.driverService.validateRecord("Validate AddressPostcode!",
          [actualValue, expectedValue, "Incorrect AddressPostcode!"]);
      }
    } catch (error) {
      console.log('validateAddressPostcode');
      console.log(error);
      return false;
    }
  }

  public async validateAddressCity(expectedValue: string, isUsedForSearch: boolean = false) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtAddressPostcode);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const actualValue = await this.driverService.getAttributeValue(this.txtAddressCity, 'value');
      if (isUsedForSearch) {
        return await this.driverService.validateRecordUsedForSearch("Validate AddressCity!",
          [actualValue, expectedValue, "Incorrect AddressCity!"]);
      } else {
        return await this.driverService.validateRecord("Validate AddressCity!",
          [actualValue, expectedValue, "Incorrect AddressCity!"]);
      }
    } catch (error) {
      console.log('validateAddressCity');
      console.log(error);
      return false;
    }
  }

 
  //#endregion

  //#region Input value on Product layout

  //Section FORSIKRINGSPERIODE
  public async inputFirstName(FirstName: string) {
    try {
      let field = await this.getFieldType(this.txtFirstName);
      await field.setValue(FirstName);
      return true;
    } catch (error) {
      console.log("inputFirstName");
      console.log(error);
      return false;
    }
  }

  public async inputLastName(LastName: string) {
    try {
      let field = await this.getFieldType(this.txtLastName);
      await field.setValue(LastName);
      return true;
    } catch (error) {
      console.log("inputLastName");
      console.log(error);
      return false;
    }
  }

  public async inputDOB(DOB: string) {
    try {
      let field = await this.getFieldType(this.dtpDOB);
      await field.setValue(DOB);
      return true;
    } catch (error) {
      console.log("inputDOB");
      console.log(error);
      return false;
    }
  }

  //Section BYGNINGS DETALJER
  public async inputAddressLine(AddressLine: string) {
    try {
      let field = await this.getFieldType(this.txtAddressLine);
      await field.setValue(AddressLine);
      return true;
    } catch (error) {
      console.log("inputAddressLine");
      console.log(error);
      return false;
    }
  }

  public async inputAddressPostcode(AddressPostcode: string) {
    try {
      let field = await this.getFieldType(this.txtAddressPostcode);
      await field.setValue(AddressPostcode);
      return true;
    } catch (error) {
      console.log("inputAddressPostcode");
      console.log(error);
      return false;
    }
  }

  public async inputAddressCity(AddressCity: string) {
    try {
      let field = await this.getFieldType(this.txtAddressCity);
      await field.setValue(AddressCity);
      return true;
    } catch (error) {
      console.log("inputAddressCity");
      console.log(error);
      return false;
    }
  }

  public async inputConstructionMethod(ConstructionMethod: string) {
    try {
      let field = await this.getFieldType(this.cmbConstructionMethod);
      await field.setValue(ConstructionMethod);
      return true;
    } catch (error) {
      console.log("inputConstructionMethod");
      console.log(error);
      return false;
    }
  }

  public async inputAlarm(Alarm: string) {
    try {
      let field = await this.getFieldType(this.cmbAlarm);
      await field.setValue(Alarm);
      return true;
    } catch (error) {
      console.log("inputAlarm");
      console.log(error);
      return false;
    }
  }

  public async inputAlarmCompany(AlarmCompany: string) {
    try {
      let field = await this.getFieldType(this.txtAlarmCompany);
      await field.setValue(AlarmCompany);
      return true;
    } catch (error) {
      console.log("inputAlarmCompany");
      console.log(error);
      return false;
    }
  }



  //Section INNBOFORSIKRING
  public async inputContentSumInsured(ContentSumInsured: string) {
    try {
      let field = await this.getFieldType(this.txtContentSumInsured);
      await field.setValue(ContentSumInsured);
      return true;
    } catch (error) {
      console.log("inputContentSumInsured");
      console.log(error);
      return false;
    }
  }

  public async inputContentDeductible(ContentDeductible: string) {
    try {
      let field = await this.getFieldType(this.cmbContentDeductible);
      await field.setValue(ContentDeductible);
      return true;
    } catch (error) {
      console.log("inputContentDeductible");
      console.log(error);
      return false;
    }
  }

  public async inputContentCover(ContentCover: string) {
    try {
      let field = await this.getFieldType(this.cmbContentCover);
      await field.setValue(ContentCover);
      return true;
    } catch (error) {
      console.log("inputContentCover");
      console.log(error);
      return false;
    }
  }

  public async inputMushroom(Mushroom: string) {
    try {
      let field = await this.getFieldType(this.cmbMushroom);
      await field.setValue(Mushroom);
      return true;
    } catch (error) {
      console.log("inputMushroom");
      console.log(error);
      return false;
    }
  }

  public async inputFreeText(FreeText: string) {
    try {
      let field = await this.getFieldType(this.txtFreeText);
      await field.setValue(FreeText);
      return true;
    } catch (error) {
      console.log("inputFreeText");
      console.log(error);
      return false;
    }
  }

  public async inputTerminationText(TerminationText: string) {
    try {
      let field = await this.getFieldType(this.txtTerminationText);
      await field.setValue(TerminationText);
      return true;
    } catch (error) {
      console.log("inputTerminationText");
      console.log(error);
      return false;
    }
  }


  
  //#endregion
}