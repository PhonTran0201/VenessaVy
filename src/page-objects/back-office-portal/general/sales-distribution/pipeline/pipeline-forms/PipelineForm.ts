import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../../shared/functions";



export class PipelineForm {
  // Pipeline form
  private nameField = By.xpath("//app-pipeline-form//*[@id='pipeline-name']");
  private dealStageBtn = By.xpath("//formly-sales-stage//*[contains(text(),'Sales stage')]/following-sibling::button");
  private secondname = By.xpath("(//input[@id='pipeline-deal-name'])[1]");
  private newProbability = By.xpath("(//input[@id='pipeline-deal-percentage'])[1]");


  constructor(private driverService: SeleniumWebDriverService) { }

  public async inputPipeline(
    name: string,
    secondname: string,
    probability: string,
  ) {
    try {
      await this.driverService.waitUntilElementLoaded(this.nameField);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.setText(this.nameField, name);
      await this.driverService.click(this.dealStageBtn);
      await this.driverService.waitUntilElementLoaded(this.secondname);
      await this.driverService.setText(this.secondname, secondname);
      await this.driverService.setText(this.newProbability, probability);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async editPipeline(
    name: string,
    secondname: string,
    probability: string,
  ) {
    try {
      await this.driverService.waitUntilElementLoaded(this.nameField);
      await this.driverService.waitUntilElementLoaded(this.secondname);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.setText(this.nameField, name);
      await this.driverService.setText(this.secondname, secondname);
      await this.driverService.setText(this.newProbability, probability);
      return true;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }
}
