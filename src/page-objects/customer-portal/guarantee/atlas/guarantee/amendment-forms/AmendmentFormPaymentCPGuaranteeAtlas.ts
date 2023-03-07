import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { AmendmentFormPaymentCP } from "../../../../general/guarantee/amendment-forms/AmendmentFormPaymentCP";


export class AmendmentFormPaymentCPGuaranteeAtlas extends AmendmentFormPaymentCP {
    constructor(driverService: SeleniumWebDriverService) {
        super(driverService);
    }
}