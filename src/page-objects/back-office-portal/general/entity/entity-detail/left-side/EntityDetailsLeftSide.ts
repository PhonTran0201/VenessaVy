import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../../shared/functions";


export class EntityDetailsLeftSide {
  constructor(private driverService: SeleniumWebDriverService) { }

  //Xpath of elements on Entity detail
  private cardDetailEntity = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-entity-detail");
  private lblTitleCardDetailEntity = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-entity-detail//div[contains(@class,'card-header')]//h4");
  private lblCodeCardDetailEntity = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-entity-detail//div[contains(@class,'card-header')]//small");

  /*Begin: Entity detail*/

  /**
   * 
   * @param titleName 
   * @returns true if titleName = actualTitle
   */
  public async checkTitleSummaryPane(titleName: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cardDetailEntity);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      const actualTitle = await this.driverService.getText(this.lblTitleCardDetailEntity);
      return await this.driverService.validateRecord("Title summary pane of Entity detail",
        [actualTitle, titleName, "Incorrect title entity summary pane"]
      );
    } catch (error) {
      console.log("checkTitleSummaryPane");
      console.log(error);
      return false;
    }
  }

  // "Code" is located under Title
  public async checkCodeSummaryPane(codeName: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cardDetailEntity);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      const actualCode = await this.driverService.getText(this.lblCodeCardDetailEntity);
      return await this.driverService.validateRecord("Code summary pane of Entity detail",
        [actualCode, "Code: " + codeName.toLowerCase(), "Incorrect Code entity summary pane"]
      );
    } catch (error) {
      console.log("checkCodeSummaryPane");
      console.log(error);
      return false;
    }
  }

  public async checkInfoSummaryPane(labelName: string, content: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cardDetailEntity);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      const expectedContent = content ? content : "N/A";
      const lblContent = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-entity-detail//div[contains(@class,'card-body')]//label[text()='${labelName}']/following-sibling::*`);
      const actualContent = await this.driverService.getText(lblContent);
      return await this.driverService.validateRecord(`"${labelName}" in Entity summary pane!`,
        [actualContent, expectedContent, `Incorrect "${labelName}" entity summary pane`]
      );
    } catch (error) {
      console.log("checkInfoSummaryPane");
      console.log(error);
      return false;
    }
  }
  /*End: Entity detail*/
}