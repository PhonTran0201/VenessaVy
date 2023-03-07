import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { ApplicationFormPaymentCP } from "../../../../general/application/application-forms/ApplicationFormPaymentCP";

export class ApplicationFormPaymentCPGuaranteeAtlas extends ApplicationFormPaymentCP {
    constructor(driverService: SeleniumWebDriverService) {
        super(driverService);
    }
}