import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { AmendmentFormGuarantorAndThirdPartyCP } from "../../../../general/guarantee/amendment-forms/AmendmentFormGuarantorThirdPartyCP";

export class AmendmentFormGuarantorAndThirdPartyCPGuaranteeAtlas extends AmendmentFormGuarantorAndThirdPartyCP {
    constructor(driverService: SeleniumWebDriverService) {
        super(driverService);
    }
}