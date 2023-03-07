import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { GuaranteeDetailFormDocumentsCP } from "../../../../general/guarantee/guarantee-forms/GuaranteeDetailFormDocumentsCP";


export class GuaranteeDetailFormDocumentsCPGuaranteeAtlas extends GuaranteeDetailFormDocumentsCP {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
}