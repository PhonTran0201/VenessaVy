import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { ApplicationDetailFormTabDetail } from "../../../../back-office-portal/guarantee/application/application-detail-forms/ApplicationDetailFormTabDetail";

export class ApplicationDetailFormTabDetailCP extends ApplicationDetailFormTabDetail {
   constructor(driverService: SeleniumWebDriverService) {
      super(driverService);
   }
}
