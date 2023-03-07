import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { GuaranteeDetailFormDocuments } from "../../../../back-office-portal/guarantee/guarantee/guarantee-forms/GuaranteeDetailFormDocuments";


export class GuaranteeDetailFormDocumentsCP extends GuaranteeDetailFormDocuments {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
}