import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { AmendmentFormGuarantorAndThirdParty } from "../../../../back-office-portal/guarantee/guarantee/amendment-forms/AmendmentFormGuarantorThirdParty";

export class AmendmentFormGuarantorAndThirdPartyCP extends AmendmentFormGuarantorAndThirdParty {
    constructor(driverService: SeleniumWebDriverService) {
        super(driverService);
    }
}