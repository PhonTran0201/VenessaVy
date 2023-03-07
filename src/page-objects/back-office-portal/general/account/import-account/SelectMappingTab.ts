import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";

export class SelectMappingTab {
    constructor(protected driverService: SeleniumWebDriverService) { }


    public async validateOriginKeyOnSelectMappingTab(ExpectedValue: string, positionRow = 1) {
        try {
          const lblActualValue = By.xpath(`//*[@id='mapping-part']//tbody//tr[${positionRow}]//td[1]//span`);
          await this.driverService.waitUntilElementLoaded(lblActualValue);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
          const actualValue = await this.driverService.getText(lblActualValue);
          return await this.driverService.validateRecord(`Validate Origin Key at line ${positionRow}: `,
            [actualValue,ExpectedValue, `Incorrect Origin Key`]
          );
        } catch (error) {
          console.log('validateOriginKeyOnSelectMappingTab');
          console.log(error);
          return false;
        }
      }

      public async validateMapToFieldOnSelectMappingTab(ExpectedValue: string, positionRow = 1) {
        try {
          const lblActualValue = By.xpath(`//*[@id='mapping-part']//tbody//tr[${positionRow}]//td[2]//span[2]`);
          await this.driverService.waitUntilElementLoaded(lblActualValue);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
          const actualValue = await this.driverService.getText(lblActualValue);
          return await this.driverService.validateRecord(`Validate Map To Field at line ${positionRow}: `,
            [actualValue,ExpectedValue, `Incorrect Map To Field`]
          );
        } catch (error) {
          console.log('validateMapToFieldOnSelectMappingTab');
          console.log(error);
          return false;
        }
      }

      public async validateValuesOnSelectMappingTab(ExpectedValue: string, positionRow = 1) {
        try {
          const lblActualValue = By.xpath(`//*[@id='mapping-part']//tbody//tr[${positionRow}]//td[3]//span`);
          await this.driverService.waitUntilElementLoaded(lblActualValue);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
          const actualValue = await this.driverService.getText(lblActualValue);
          return await this.driverService.validateRecord(`Validate Value at line ${positionRow}: `,
            [actualValue,ExpectedValue, `Incorrect Value`]
          );
        } catch (error) {
          console.log('validateValuesOnSelectMappingTab');
          console.log(error);
          return false;
        }
      }

      public async validateDefaultMappingOnSelectMappingTab(ExpectedValue: string, positionRow = 1) {
        try {
          const lblActualValue = By.xpath(`//*[@id='mapping-part']//tbody//tr[${positionRow}]//td[4]//span`);
          await this.driverService.waitUntilElementLoaded(lblActualValue);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
          const actualValue = await this.driverService.getText(lblActualValue);
          return await this.driverService.validateRecord(`Validate Default mapping at line ${positionRow}: `,
            [actualValue,ExpectedValue, `Incorrect Default mapping`]
          );
        } catch (error) {
          console.log('validateDefaultMappingOnSelectMappingTab');
          console.log(error);
          return false;
        }
      }
}