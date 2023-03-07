import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../../shared/functions";
import { QuoteCreateQuote } from "../QuoteCreateQuote";


/**
 * Create Quote in Anonymous Quote for Product InnboSeasonal
 */
export class QuoteCreateQuoteVarsamProductInnboSeasonal extends QuoteCreateQuote {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }

  //#region Product layouts
  //#region Section POLICYHOLDER
  protected txtFirstName_PolicyHolder = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//input[@id='PolicyHolderFirstNameTag']`);//Fornavn
  protected txtLastName_PolicyHolder = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//input[@id='PolicyHolderLastNameTag']`);//Etternavn
  protected dtpDOB_PolicyHolder = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//input[@id='PolicyHolderDOBTag']`);//Fødselsdato
  protected txtCreditRating_PolicyHolder = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//input[@id='CustomerCreditScoreTag']`);//Kreditt Rating
  protected txtCustomerClaimCount_PolicyHolder = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//input[@id='CustomerClaimCountTag']`);//Antall Skader Siste 3 År?
  //#endregion

  //#region Section BUILDING INFORMATION
  protected txtAddress_BuildingInfo = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//input[@id='AddressTag']`);//Hvilken Adresse Har Bygningen? *
  protected txtPostCode_BuildingInfo = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//input[@id='PostCodeTag']`);//Postnummer
  protected txtCity_BuildingInfo = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//input[@id='CustomerClaimCountTag']`);//CityTag
  protected cmbRentType_BuildingInfo = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//ng-select[@id='RentTypeTag']//input`);//Type Utleie (Kun Privat) 
  protected cmbAlarmSytem_BuildingInfo = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//ng-select[@id='AlarmSystemTag']//input`);//Alarmsystem 
  protected cmbSmokeDetector_BuildingInfo = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//ng-select[@id='SmokeDetectorTag']//input`);//Røykvarslere
  protected cmbWaterStopSystem_BuildingInfo = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//ng-select[@id='WaterStopSystemTag']//input`);//Vannstoppesystem
  protected cmbElectricity_BuildingInfo = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//ng-select[@id='ElectricityTag']//input`);//Elektrisk Anlegg
  protected cmbNumberOfResidents_BuildingInfo = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//ng-select[@id='NumberOfResidentsTag']//input`);//Antall Beboere
  protected cmbHussopp_BuildingInfo = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//select[@id='IncludeHussoppCoverTag']`);//Hussopp:
  //#endregion

  //#region Section INNBOFORSIKRING
  protected txtContentSumInsured_Innbofor = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//input[@id='ContentSumInsuredTag']`);//Forsikringsum Innbo
  protected cmbCoverType_Innbofor = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//ng-select[@id='CoverTypeTag']//input`);//CoverTypeTag
  protected cmbContentType_Innbofor = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//ng-select[@id='ContentTypeTag']//input`);//Type Innbo
  protected cmbResidenceType_Innbofor = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//ng-select[@id='ResidenceTypeTag']//input`);//Type Bolig
  protected cmbDeductibleContent_Innbofor = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//ng-select[@id='DeductibleContentTag']//input`);//Egenandel
  protected cmbContentCover_Innbofor = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//ng-select[@id='ContentCoverTag']//input`);//Dekning
  //#endregion

  //#region Section EL-SYKKEL
  protected cmbAddBicycle1_ElSkykel = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//select[@id='AddBicycleTag1']`);//Legge Til El-Sykkel Dekning?
  protected txtBicycleSumInsured1_ElSkykel = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//input[@id='BicycleSumInsuredTag1']`);//El-Sykkel Verdi
  protected cmbElectricBicycleCover1_ElSkykel = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//ng-select[@id='ElectricBicycleCoverTag1']//input`);//El-Sykkel Dekning
  
  protected cmbAddBicycle2_ElSkykel = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//select[@id='AddBicycleTag2']`);//Legge Til El-Sykkel Dekning?
  protected txtBicycleSumInsured2_ElSkykel = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//input[@id='BicycleSumInsuredTag2']`);//El-Sykkel Verdi
  protected cmbElectricBicycleCover2_ElSkykel = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//ng-select[@id='ElectricBicycleCoverTag2']//input`);//El-Sykkel Dekning
 
  //#endregion

  //#region OTHER INFORMATION
  protected txtInternalNote_OtherInformation = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//textarea[@id='InternalNoteTag']`);//Int. Notat
  protected txtExternalText_OtherInformation = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//textarea[@id='ExternalTextTag']`);//Extern Tekst
  protected txtTerminationText_OtherInformation = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//textarea[@id='TerminationTextTag']`);//Merknader Til Oppsigelses Mal
  //#endregion
  //#endregion

  //#region Input value on Policy Holder
  public async inputFirstName_PolicyHolder(value: string) {
    try {
      await this.driverService.waitUntilElementVisible(this.txtFirstName_PolicyHolder);
      await this.driverService.setText(this.txtFirstName_PolicyHolder, value);
      return true;
    } catch (error) {
      console.log('inputFirstName_PolicyHolder');
      console.log(error);
      return false;
    }
  }
  public async inputLastName_PolicyHolder(value: string) {
    try {
      await this.driverService.waitUntilElementVisible(this.txtLastName_PolicyHolder);
      await this.driverService.setText(this.txtLastName_PolicyHolder, value);
      return true;
    } catch (error) {
      console.log('inputLastName_PolicyHolder');
      console.log(error);
      return false;
    }
  }
  public async inputDOB_PolicyHolder(value: string) {
    try {
      await this.driverService.waitUntilElementVisible(this.dtpDOB_PolicyHolder);
      await this.driverService.setText(this.dtpDOB_PolicyHolder, value);
      return true;
    } catch (error) {
      console.log('inputDOB_PolicyHolder');
      console.log(error);
      return false;
    }
  }
  public async inputCreditRating_PolicyHolder(value: string) {
    try {
      await this.driverService.waitUntilElementVisible(this.txtCreditRating_PolicyHolder);
      await this.driverService.setText(this.txtCreditRating_PolicyHolder, value);
      return true;
    } catch (error) {
      console.log('inputCreditRating_PolicyHolder');
      console.log(error);
      return false;
    }
  }
  public async inputCustomerClaimCount_PolicyHolder(value: string) {
    try {
      let ele = await this.getFieldType(this.txtCustomerClaimCount_PolicyHolder);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService)
      await ele.setValue(value);
      return true;
    } catch (error) {
      console.log('inputCustomerClaimCount_PolicyHolder');
      console.log(error);
      return false;
    }
  }
  //#endregion

  //#region Input value on Building Information
  public async inputAddress_BuildingInfo(value: string) {
    try {
      await this.driverService.waitUntilElementVisible(this.txtAddress_BuildingInfo);
      await this.driverService.setText(this.txtAddress_BuildingInfo, value);
      return true;
    } catch (error) {
      console.log('inputAddress_BuildingInfo');
      console.log(error);
      return false;
    }
  }
  public async inputPostCode_BuildingInfo(value: string) {
    try {
      await this.driverService.waitUntilElementVisible(this.txtPostCode_BuildingInfo);
      await this.driverService.setText(this.txtPostCode_BuildingInfo, value);
      return true;
    } catch (error) {
      console.log('inputPostCode_BuildingInfo');
      console.log(error);
      return false;
    }
  }
  public async inputCity_BuildingInfo(value: string) {
    try {
      await this.driverService.waitUntilElementVisible(this.txtCity_BuildingInfo);
      await this.driverService.setText(this.txtCity_BuildingInfo, value);
      return true;
    } catch (error) {
      console.log('inputCity_BuildingInfo');
      console.log(error);
      return false;
    }
  }
  public async inputRentType_BuildingInfo(value: string) {
    try {
      await this.driverService.waitUntilElementVisible(this.cmbRentType_BuildingInfo);
      await this.driverService.setText(this.cmbRentType_BuildingInfo, value);
      const option = By.xpath(`//ng-dropdown-panel//*[contains(@class,'option') and (text()=' ${value} ')]`);
      await this.driverService.waitUntilElementVisible(option);
      await this.driverService.click(option);
      return true;
    } catch (error) {
      console.log('inputRentType_BuildingInfo');
      console.log(error);
      return false;
    }
  }
  public async inputAlarmSytem_BuildingInfo(value: string) {
    try {
      await this.driverService.waitUntilElementVisible(this.cmbAlarmSytem_BuildingInfo);
      await this.driverService.setText(this.cmbAlarmSytem_BuildingInfo, value);
      const option = By.xpath(`//ng-dropdown-panel//*[contains(@class,'option') and (text()=' ${value} ')]`);
      await this.driverService.waitUntilElementVisible(option);
      await this.driverService.click(option);
      return true;
    } catch (error) {
      console.log('inputAlarmSytem_BuildingInfo');
      console.log(error);
      return false;
    }
  }
  public async inputSmokeDetector_BuildingInfo(value: string) {
    try {
      await this.driverService.waitUntilElementVisible(this.cmbSmokeDetector_BuildingInfo);
      await this.driverService.setText(this.cmbSmokeDetector_BuildingInfo, value);
      const option = By.xpath(`//ng-dropdown-panel//*[contains(@class,'option') and (text()=' ${value} ')]`);
      await this.driverService.waitUntilElementVisible(option);
      await this.driverService.click(option);
      return true;
    } catch (error) {
      console.log('inputSmokeDetector_BuildingInfo');
      console.log(error);
      return false;
    }
  }
  public async inputWaterStopSystem_BuildingInfo(value: string) {
    try {
      await this.driverService.waitUntilElementVisible(this.cmbWaterStopSystem_BuildingInfo);
      await this.driverService.setText(this.cmbWaterStopSystem_BuildingInfo, value);
      const option = By.xpath(`//ng-dropdown-panel//*[contains(@class,'option') and (text()=' ${value} ')]`);
      await this.driverService.waitUntilElementVisible(option);
      await this.driverService.click(option);
      return true;
    } catch (error) {
      console.log('inputWaterStopSystem_BuildingInfo');
      console.log(error);
      return false;
    }
  }
  public async inputElectricity_BuildingInfo(value: string) {
    try {
      await this.driverService.waitUntilElementVisible(this.cmbElectricity_BuildingInfo);
      await this.driverService.setText(this.cmbElectricity_BuildingInfo, value);
      const option = By.xpath(`//ng-dropdown-panel//*[contains(@class,'option') and (text()=' ${value} ')]`);
      await this.driverService.waitUntilElementVisible(option);
      await this.driverService.click(option);
      return true;
    } catch (error) {
      console.log('inputElectricity_BuildingInfo');
      console.log(error);
      return false;
    }
  }
  public async inputNumberOfResidents_BuildingInfo(value: string) {
    try {
      await this.driverService.waitUntilElementVisible(this.cmbNumberOfResidents_BuildingInfo);
      await this.driverService.setText(this.cmbNumberOfResidents_BuildingInfo, value);
      const option = By.xpath(`//ng-dropdown-panel//*[contains(@class,'option') and (text()=' ${value} ')]`);
      await this.driverService.waitUntilElementVisible(option);
      await this.driverService.click(option);
      return true;
    } catch (error) {
      console.log('inputNumberOfResidents_BuildingInfo');
      console.log(error);
      return false;
    }
  }
  // public async inputHussopp_BuildingInfo(value: string) {
  //   try {
  //     await this.driverService.waitUntilElementVisible(this.cmbHussopp_BuildingInfo);
  //     await this.driverService.setText(this.cmbHussopp_BuildingInfo, value);
  //     const option = By.xpath(`//ng-dropdown-panel//*[contains(@class,'option') and (text()=' ${value} ')]`);
  //     await this.driverService.waitUntilElementVisible(option);
  //     await this.driverService.click(option);
  //     return true;
  //   } catch (error) {
  //     console.log('inputHussopp_BuildingInfo');
  //     console.log(error);
  //     return false;
  //   }
  // }
  public async inputHussopp_BuildingInfo(choice: string) {
    try {
      await this.driverService.waitUntilElementVisible(this.cmbHussopp_BuildingInfo);
      await this.driverService.pressTabCurrentElement();
      for (let i = 1; i <= 4; i++) {
        await this.driverService.pressUp(this.cmbHussopp_BuildingInfo);
      }
      if (choice.toLocaleLowerCase().localeCompare('yes') === 0) {
        await this.driverService.pressDown(this.cmbHussopp_BuildingInfo);
      }
      if (choice.toLocaleLowerCase().localeCompare('no') === 0) {
        await this.driverService.pressDown(this.cmbHussopp_BuildingInfo);
        await this.driverService.pressDown(this.cmbHussopp_BuildingInfo);
      }
      return true;
    } catch (error) {
      console.log("inputHussopp_BuildingInfo");
      console.log(error);
      return false;
    }
  }
  //#endregion

  //#region Input value INNBOFORSIKRING
  public async inputContentSumInsured_Innbofor(value: string) {
    try {
      await this.driverService.waitUntilElementVisible(this.txtContentSumInsured_Innbofor);
      await this.driverService.setText(this.txtContentSumInsured_Innbofor, value);
      return true;
    } catch (error) {
      console.log('inputContentSumInsured_Innbofor');
      console.log(error);
      return false;
    }
  }
  public async inputCoverType_Innbofor(value: string) {
    try {
      await this.driverService.waitUntilElementVisible(this.cmbCoverType_Innbofor);
      await this.driverService.setText(this.cmbCoverType_Innbofor, value);
      const option = By.xpath(`//ng-dropdown-panel//*[contains(@class,'option') and (text()=' ${value} ')]`);
      await this.driverService.waitUntilElementVisible(option);
      await this.driverService.click(option);
      return true;
    } catch (error) {
      console.log('inputCoverType_Innbofor');
      console.log(error);
      return false;
    }
  }
  public async inputContentType_Innbofor(value: string) {
    try {
      await this.driverService.waitUntilElementVisible(this.cmbContentType_Innbofor);
      await this.driverService.setText(this.cmbContentType_Innbofor, value);
      const option = By.xpath(`//ng-dropdown-panel//*[contains(@class,'option') and (text()=' ${value} ')]`);
      await this.driverService.waitUntilElementVisible(option);
      await this.driverService.click(option);
      return true;
    } catch (error) {
      console.log('inputContentType_Innbofor');
      console.log(error);
      return false;
    }
  }
  public async inputResidenceType_Innbofor(value: string) {
    try {
      await this.driverService.waitUntilElementVisible(this.cmbResidenceType_Innbofor);
      await this.driverService.setText(this.cmbResidenceType_Innbofor, value);
      const option = By.xpath(`//ng-dropdown-panel//*[contains(@class,'option') and (text()=' ${value} ')]`);
      await this.driverService.waitUntilElementVisible(option);
      await this.driverService.click(option);
      return true;
    } catch (error) {
      console.log('inputResidenceType_Innbofor');
      console.log(error);
      return false;
    }
  }
  public async inputDeductibleContent_Innbofor(value: string) {
    try {
      await this.driverService.waitUntilElementVisible(this.cmbDeductibleContent_Innbofor);
      await this.driverService.setText(this.cmbDeductibleContent_Innbofor, value);
      const option = By.xpath(`//ng-dropdown-panel//*[contains(@class,'option') and (text()=' ${value} ')]`);
      await this.driverService.waitUntilElementVisible(option);
      await this.driverService.click(option);
      return true;
    } catch (error) {
      console.log('inputDeductibleContent_Innbofor');
      console.log(error);
      return false;
    }
  }
  public async inputContentCover_Innbofor(value: string) {
    try {
      await this.driverService.waitUntilElementVisible(this.cmbContentCover_Innbofor);
      await this.driverService.setText(this.cmbContentCover_Innbofor, value);
      const option = By.xpath(`//ng-dropdown-panel//*[contains(@class,'option') and (text()=' ${value} ')]`);
      await this.driverService.waitUntilElementVisible(option);
      await this.driverService.click(option);
      return true;
    } catch (error) {
      console.log('inputContentCover_Innbofor');
      console.log(error);
      return false;
    }
  }
  //#endregion

  //#region Input value El-Skykel
  public async inputAddBicycle1_ElSkykel(choice: string) {
    try {
      await this.driverService.waitUntilElementVisible(this.cmbAddBicycle1_ElSkykel);
      await this.driverService.pressTabCurrentElement();
      for (let i = 1; i <= 4; i++) {
        await this.driverService.pressUp(this.cmbAddBicycle1_ElSkykel);
      }
      if (choice.toLocaleLowerCase().localeCompare('yes') === 0) {
        await this.driverService.pressDown(this.cmbAddBicycle1_ElSkykel);
      }
      if (choice.toLocaleLowerCase().localeCompare('no') === 0) {
        await this.driverService.pressDown(this.cmbAddBicycle1_ElSkykel);
        await this.driverService.pressDown(this.cmbAddBicycle1_ElSkykel);
      }
      return true;
    } catch (error) {
      console.log("inputAddBicycle1_ElSkykel");
      console.log(error);
      return false;
    }
  }
  public async inputBicycleSumInsured1_ElSkykel(value: string) {
    try {
      await this.driverService.waitUntilElementVisible(this.txtBicycleSumInsured1_ElSkykel);
      await this.driverService.setText(this.txtBicycleSumInsured1_ElSkykel, value);
      return true;
    } catch (error) {
      console.log('inputBicycleSumInsured1_ElSkykel');
      console.log(error);
      return false;
    }
  }
  public async inputElectricBicycleCover1_ElSkykel(value: string) {
    try {
      await this.driverService.waitUntilElementVisible(this.cmbElectricBicycleCover1_ElSkykel);
      await this.driverService.setText(this.cmbElectricBicycleCover1_ElSkykel, value);
      const option = By.xpath(`//ng-dropdown-panel//*[contains(@class,'option') and (text()=' ${value} ')]`);
      await this.driverService.waitUntilElementVisible(option);
      await this.driverService.click(option);
      return true;
    } catch (error) {
      console.log('inputElectricBicycleCover1_ElSkykel');
      console.log(error);
      return false;
    }
  }


  public async inputAddBicycle2_ElSkykel(choice: string) {
    try {
      await this.driverService.waitUntilElementVisible(this.cmbAddBicycle2_ElSkykel);
      await this.driverService.pressTabCurrentElement();
      for (let i = 1; i <= 4; i++) {
        await this.driverService.pressUp(this.cmbAddBicycle2_ElSkykel);
      }
      if (choice.toLocaleLowerCase().localeCompare('yes') === 0) {
        await this.driverService.pressDown(this.cmbAddBicycle2_ElSkykel);
      }
      if (choice.toLocaleLowerCase().localeCompare('no') === 0) {
        await this.driverService.pressDown(this.cmbAddBicycle2_ElSkykel);
        await this.driverService.pressDown(this.cmbAddBicycle2_ElSkykel);
      }
      return true;
    } catch (error) {
      console.log("inputAddBicycle2_ElSkykel");
      console.log(error);
      return false;
    }
  }
  public async inputBicycleSumInsured2_ElSkykel(value: string) {
    try {
      await this.driverService.waitUntilElementVisible(this.txtBicycleSumInsured2_ElSkykel);
      await this.driverService.setText(this.txtBicycleSumInsured2_ElSkykel, value);
      return true;
    } catch (error) {
      console.log('inputBicycleSumInsured2_ElSkykel');
      console.log(error);
      return false;
    }
  }
  public async inputElectricBicycleCover2_ElSkykel(value: string) {
    try {
      await this.driverService.waitUntilElementVisible(this.cmbElectricBicycleCover2_ElSkykel);
      await this.driverService.setText(this.cmbElectricBicycleCover2_ElSkykel, value);
      const option = By.xpath(`//ng-dropdown-panel//*[contains(@class,'option') and (text()=' ${value} ')]`);
      await this.driverService.waitUntilElementVisible(option);
      await this.driverService.click(option);
      return true;
    } catch (error) {
      console.log('inputElectricBicycleCover2_ElSkykel');
      console.log(error);
      return false;
    }
  }
  //#endregion

  //#region Input value Other Information  
  public async inputInternalNote_OtherInformation(value: string) {
    try {
      await this.driverService.waitUntilElementVisible(this.txtInternalNote_OtherInformation);
      await this.driverService.setText(this.txtInternalNote_OtherInformation, value);
      return true;
    } catch (error) {
      console.log('inputInternalNote_OtherInformation');
      console.log(error);
      return false;
    }
  }
  public async inputExternalText_OtherInformation(value: string) {
    try {
      await this.driverService.waitUntilElementVisible(this.txtExternalText_OtherInformation);
      await this.driverService.setText(this.txtExternalText_OtherInformation, value);
      return true;
    } catch (error) {
      console.log('inputExternalText_OtherInformation');
      console.log(error);
      return false;
    }
  }
  public async inputTerminationText_OtherInformation(value: string) {
    try {
      await this.driverService.waitUntilElementVisible(this.txtTerminationText_OtherInformation);
      await this.driverService.setText(this.txtTerminationText_OtherInformation, value);
      return true;
    } catch (error) {
      console.log('inputTerminationText_OtherInformation');
      console.log(error);
      return false;
    }
  }
  //#endregion
}