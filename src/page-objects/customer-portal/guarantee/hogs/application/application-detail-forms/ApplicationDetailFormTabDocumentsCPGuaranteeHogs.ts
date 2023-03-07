import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { ApplicationDetailFormTabDocumentsCP } from "../../../../general/application/application-detail-forms/ApplicationDetailFormTabDocumentsCP";

export class ApplicationDetailFormTabDocumentsCPGuaranteeHogs extends ApplicationDetailFormTabDocumentsCP {
    constructor(driverService: SeleniumWebDriverService) {
        super(driverService);
    }
}