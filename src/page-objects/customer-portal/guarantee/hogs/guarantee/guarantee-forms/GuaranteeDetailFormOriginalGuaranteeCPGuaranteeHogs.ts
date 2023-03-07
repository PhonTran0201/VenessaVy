import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { GuaranteeDetailFormOriginalGuaranteeCP } from "../../../../general/guarantee/guarantee-forms/GuaranteeDetailFormOriginalGuaranteeCP";

export class GuaranteeDetailFormOriginalGuaranteeCPGuaranteeHogs extends GuaranteeDetailFormOriginalGuaranteeCP {
    constructor(driverService: SeleniumWebDriverService) {
        super(driverService);
    }
}