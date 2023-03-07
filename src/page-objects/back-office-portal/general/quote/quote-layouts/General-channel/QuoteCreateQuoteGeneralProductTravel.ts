import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { logInfoMessage, logWarningMessage, selectDropdownOption, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../../shared/functions";
import { QuoteCreateQuote } from "../QuoteCreateQuote";


/**
 * Create Quote in Anonymous Quote for Product Travel
 */
export class QuoteCreateQuoteGeneralProductTravel extends QuoteCreateQuote {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }

  //#region Product layouts
  //#region Section Insured Person
  protected txtNameInsuredPerson = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//input[@id='InsuredPersonNameTag']`);
  protected txtAgeInsuredPerson = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//input[@id='InsuredPersonAgeTag']`);
  //#endregion

  //#region Section Travellers
  protected cmbNumberOfTravellerTravellers = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//*[@id='NoOfTravellers']`);
  protected cmbLuggageExcessTravellers = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//ng-select[@id='LuggageExcessTag']//input`);
  protected cmbLuggageExcessValueTravellers = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//ng-select[@id='LuggageExcessTag']//span[contains(@class,'ng-value-label')]`);
  //#endregion

  //#region Section Cover
  protected cmbAdditionalCoverCover = By.xpath(`${this.strRootXpath}//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-layout//select[@id='AdditionalCoverTag']`);
  //#endregion
  //#endregion

  //#region Validate value on Product layout
  public async validateNameInsuredPerson(expectedValue: string, isUsedForSearch: boolean = false) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtNameInsuredPerson);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const actualValue = await this.driverService.getAttributeValue(this.txtNameInsuredPerson, 'value');
      if (isUsedForSearch) {
        return await this.driverService.validateRecordUsedForSearch("Validate Name Insured!",
          [actualValue, expectedValue, "Incorrect Name Insured!"]);
      } else {
        return await this.driverService.validateRecord("Validate Name Insured!",
          [actualValue, expectedValue, "Incorrect Name Insured!"]);
      }
    } catch (error) {
      console.log('validateNameInsuredPerson');
      console.log(error);
      return false;
    }
  }

  public async validateAgeInsuredPerson(expectedValue: string, isUsedForSearch: boolean = false) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtAgeInsuredPerson);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const actualValue = await this.driverService.getAttributeValue(this.txtAgeInsuredPerson, 'value');
      if (isUsedForSearch) {
        return await this.driverService.validateRecordUsedForSearch("Validate Age Insured!",
          [actualValue, expectedValue, "Incorrect Age Insured!"]);
      } else {
        return await this.driverService.validateRecord("Validate Age Insured!",
          [actualValue, expectedValue, "Incorrect Age Insured!"]);
      }
    } catch (error) {
      console.log('validateAgeInsuredPerson');
      console.log(error);
      return false;
    }
  }

  public async validateNumberOfTravellerTravellers(expectedValue: string, isUsedForSearch: boolean = false) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbNumberOfTravellerTravellers);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const arrayOption = [
        {value: 1, key: "Single Adult"},
        {value: 2, key: "Two Adults"},
        {value: 4, key: "Family"},
        {value: 5, key: "More than 5"}
    ]
      const valueIndex = parseInt(await this.driverService.getAttributeValue(this.cmbNumberOfTravellerTravellers, 'value'));
      const actualValue = (arrayOption.filter(obj => obj.value === valueIndex))[0].key;
      if (isUsedForSearch) {
        return await this.driverService.validateRecordUsedForSearch("Validate NumberOfTraveller!",
          [actualValue, expectedValue, "Incorrect NumberOfTraveller!"]);
      } else {
        return await this.driverService.validateRecord("Validate NumberOfTraveller!",
          [actualValue, expectedValue, "Incorrect NumberOfTraveller!"]);
      }
    } catch (error) {
      console.log('validateNumberOfTravellerTravellers');
      console.log(error);
      return false;
    }
  }

  public async validateLuggageExcessTravellers(expectedValue: string, isUsedForSearch: boolean = false) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbLuggageExcessValueTravellers);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      const actualValue = await this.driverService.getText(this.cmbLuggageExcessValueTravellers);
      if (isUsedForSearch) {
        return await this.driverService.validateRecordUsedForSearch("Validate LuggageExcessTravellers!",
          [actualValue, expectedValue, "Incorrect LuggageExcessTravellers!"]);
      } else {
        return await this.driverService.validateRecord("Validate LuggageExcessTravellers!",
          [actualValue, expectedValue, "Incorrect LuggageExcessTravellers!"]);
      }
    } catch (error) {
      console.log('validateLuggageExcessTravellers');
      console.log(error);
      return false;
    }
  }

  public async validateAdditionalCoverCover(expectedValue: string, isUsedForSearch: boolean = false) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbAdditionalCoverCover);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      let actualValue = await this.driverService.getAttributeValue(this.cmbAdditionalCoverCover, 'value');
      if (actualValue.localeCompare("0: null") === 0) {
        actualValue = "Please select";
      } else if (actualValue.localeCompare("1: true") === 0) {
        actualValue = "Yes";
      } else if (actualValue.localeCompare("2: false") === 0) {
        actualValue = "No";
      } else {
        actualValue = "UndefinedAdditionCover!";
      }

      if (isUsedForSearch) {
        return await this.driverService.validateRecordUsedForSearch("Validate AdditionalCover!",
          [actualValue, expectedValue, "Incorrect AdditionalCover!"]);
      } else {
        return await this.driverService.validateRecord("Validate AdditionalCover!",
          [actualValue, expectedValue, "Incorrect AdditionalCover!"]);
      }
    } catch (error) {
      console.log('validateAdditionalCoverCover');
      console.log(error);
      return false;
    }
  }
  //#endregion

  //#region Input value on Product layout
  public async inputNameInsuredPerson(name: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtNameInsuredPerson);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtNameInsuredPerson, name);
      return true;
    } catch (error) {
      console.log("inputNameInsuredPerson");
      console.log(error);
      return false;
    }
  }

  public async inputAgeInsuredPerson(age: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtAgeInsuredPerson);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtAgeInsuredPerson, age);
      return true;
    } catch (error) {
      console.log("inputAgeInsuredPerson");
      console.log(error);
      return false;
    }
  }

  public async inputNumberOfTravellerTravellers(numberOfTraveller: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbNumberOfTravellerTravellers);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      await this.driverService.scrollElementToView(await this.driverService.findElement(this.cmbNumberOfTravellerTravellers))
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.click(this.cmbNumberOfTravellerTravellers);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 300);
      for (let i = 1; i <= 5; i++) {
        await this.driverService.pressUpCurrentElement();
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 300);
      }

      const array = ["Single Adult", "Two Adults", "Family", "More than 5"];
      let index = array.indexOf(numberOfTraveller);
      if (index === -1) {
        logWarningMessage(`"${numberOfTraveller}" is NOT defined in code!`);
        return false;
      }
      else {
        index;
      }
      for (let i = 1; i <= index; i++) {
        await this.driverService.pressDownCurrentElement();
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 300);
        await this.driverService.pressEnterCurrentElement();
      }
      return true;
    } catch (error) {
      console.log('inputNumberOfTravellerTravellers');
      console.log(error);
      return false;
    }
  }

  public async inputLuggageExcessTravellers(LuggageExcess: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbLuggageExcessTravellers);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.cmbLuggageExcessTravellers, LuggageExcess);
      await selectDropdownOption(LuggageExcess, "", this.driverService);
      return true;
    } catch (error) {
      console.log("inputLuggageExcessTravellers");
      console.log(error);
      return false;
    }
  }

  public async inputAdditionalCover(choice: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbAdditionalCoverCover);
      await this.driverService.pressTabCurrentElement();
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      for (let i = 1; i <= 4; i++) {
        await this.driverService.pressUp(this.cmbAdditionalCoverCover);
      }
      if (choice.toLocaleLowerCase().localeCompare('yes') === 0) {
        await this.driverService.pressDown(this.cmbAdditionalCoverCover);
      }
      if (choice.toLocaleLowerCase().localeCompare('no') === 0) {
        await this.driverService.pressDown(this.cmbAdditionalCoverCover);
        await this.driverService.pressDown(this.cmbAdditionalCoverCover);
      }
      return true;
    } catch (error) {
      console.log("inputAdditionalCover")
      console.log(error);
      return false;
    }
  }
  //#endregion
}