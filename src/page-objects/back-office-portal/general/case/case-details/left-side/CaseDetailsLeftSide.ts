import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2, logInfoMessage, logWarningMessage, waitUntilHorizontalProgressBarLoaded } from "../../../../../../shared/functions";
import { scenarioName } from "../../../../../../shared/variables";


export class CaseDetailsLeftSide {
  //Element at Case detail
  private lblDtCaseName = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-task-detail//app-task-details-left-side//h4");
  private lblDtWorkflow = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-task-detail//app-task-details-left-side//div[contains(@class,'card-header')]//small");
  private lblDtPriority = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-task-detail//app-task-details-left-side//div[contains(@class,'card-body')]//small");
  private lblDtAssignedTo = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-task-detail//app-task-details-left-side//div[contains(@class,'card-body')]//label[text()='Assigned to']/following-sibling::p");
  private lblDtRelatedTo = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-task-detail//app-task-details-left-side//div[contains(@class,'card-body')]//label[text()='Related to']/following-sibling::p//*[text()]");
  private lblDtDueDate = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-task-detail//app-task-details-left-side//div[contains(@class,'card-body')]//label[text()='Due date']/following-sibling::p");
  private lblDtDescription = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-task-detail//app-task-details-left-side//div[contains(@class,'card-body')]//label[text()='Description']/following-sibling::*//*[text()]");
  private titleCaseActive = By.xpath(`//a[@class="tab-title text-truncate nav-link active"]`)

  constructor(private driverService: SeleniumWebDriverService) { }


  public async assertCreateCaseAtCaseDetail(expectedName: string, expectedPriority: string, expectedAssigneTo: string, expectedRelatedTo: string, expectedDueDate: string, expectedDescription: string) {
    let actualName = "";
    let actualPriority = "";
    let actualAssignTo = "";
    let actualRelatedTo = "";
    let actualDueDate = "";
    let actualDescription = "";

    try {
      await this.driverService.waitUntilElementLoaded(this.lblDtCaseName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      logInfoMessage("\n\tAssert create case at detail:");

      actualName = await this.driverService.getText(this.lblDtCaseName);
      actualPriority = await this.driverService.getText(this.lblDtPriority);
      actualAssignTo = await this.driverService.getText(this.lblDtAssignedTo);
      actualRelatedTo = await this.driverService.getText(this.lblDtRelatedTo);
      actualDueDate = await this.driverService.getText(this.lblDtDueDate);
      actualDescription = await this.driverService.getText(this.lblDtDescription);

      expectedDueDate = expectedDueDate || "N/A";
      expectedDescription = expectedDescription || "No Description";
      if (!expectedRelatedTo) {
        expectedRelatedTo = actualRelatedTo;
      }
    } catch (error) {
      console.log("assertCreateCaseAtCaseDetail");
      console.log(error);
    }

    await this.driverService.validateTestCase(scenarioName,
      [actualName, expectedName.toUpperCase(), "Incorrect name"],
      [actualPriority, expectedPriority, "Incorrect priority"],
      [actualAssignTo, expectedAssigneTo, "Incorrect Assigned to"],
      [actualRelatedTo, expectedRelatedTo, "Incorrect related to"],
      //[actualDueDate, expectedDueDate, "Incorrect due date"],
      [actualDescription, expectedDescription, "Incorrect Description"]
    );
  }


  public async assertTitleOfOpeningCaseTab(caseName: string): Promise<boolean> {
    try {
      let result = true;
      await this.driverService.waitUntilElementLoaded(this.titleCaseActive);
      await waitUntilHorizontalProgressBarLoaded(this.driverService)
      let titleTab = await this.driverService.getText(this.titleCaseActive);
      if (!(titleTab.includes(caseName))) {
        logWarningMessage(`The opening case is "${titleTab}". It doesn't match with "${caseName}"`);
        result = false;
      }
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
