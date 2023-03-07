import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { GuaranteeListCP } from "../../../../general/guarantee/guarantee-list/GuaranteeListCP";

/**
 * Guarantee List
 */
export class GuaranteeListCPGuaranteeAtlas extends GuaranteeListCP {
    constructor(driverService: SeleniumWebDriverService) {
        super(driverService);
    }
}