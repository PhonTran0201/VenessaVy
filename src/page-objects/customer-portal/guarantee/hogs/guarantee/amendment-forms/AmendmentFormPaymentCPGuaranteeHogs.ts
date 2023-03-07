import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { AmendmentFormPaymentCP } from "../../../../general/guarantee/amendment-forms/AmendmentFormPaymentCP";


export class AmendmentFormPaymentCPGuaranteeHogs extends AmendmentFormPaymentCP {
    constructor(driverService: SeleniumWebDriverService) {
        super(driverService);
    }
}