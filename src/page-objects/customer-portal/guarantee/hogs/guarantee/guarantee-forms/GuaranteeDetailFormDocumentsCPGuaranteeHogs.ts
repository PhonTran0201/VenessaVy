import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { GuaranteeDetailFormDocumentsCP } from "../../../../general/guarantee/guarantee-forms/GuaranteeDetailFormDocumentsCP";


export class GuaranteeDetailFormDocumentsCPGuaranteeHogs extends GuaranteeDetailFormDocumentsCP {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
}