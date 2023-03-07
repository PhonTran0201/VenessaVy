import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { ApplicationFormGuarantorAndThirdParty } from "../../application/application-forms/ApplicationFormGuarantorAndThirdParty";

export class AmendmentFormGuarantorAndThirdParty extends ApplicationFormGuarantorAndThirdParty {
    constructor(driverService: SeleniumWebDriverService) {
        super(driverService);
    }
}