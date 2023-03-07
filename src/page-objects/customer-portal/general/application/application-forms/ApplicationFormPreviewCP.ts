import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { ApplicationFormPreview } from "../../../../back-office-portal/guarantee/application/application-forms/ApplicationFormPreview";

export class ApplicationFormPreviewCP extends ApplicationFormPreview {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
}