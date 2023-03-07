import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { ApplicationDetailFormTabDocuments } from "../../application/application-detail-forms/ApplicationDetailFormTabDocuments";


export class GuaranteeDetailFormDocuments extends ApplicationDetailFormTabDocuments {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
}