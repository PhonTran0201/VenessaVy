import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";

export class CaseCloseCaseForm {
  private txtCommentCloseCase = By.xpath("//*[@id='pgs-close-task-form-content']");
  constructor(protected driverService: SeleniumWebDriverService) { }

  public async enterComment(comment: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtCommentCloseCase);
      await this.driverService.setText(this.txtCommentCloseCase, comment);
    } catch (error) {
      console.log("Enter comment");
      console.log(error);
    }
  }
}
