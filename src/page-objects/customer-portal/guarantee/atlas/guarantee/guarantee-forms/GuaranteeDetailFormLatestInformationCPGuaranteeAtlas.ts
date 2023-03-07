import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { GuaranteeDetailFormLatestInformationCP } from "../../../../general/guarantee/guarantee-forms/GuaranteeDetailFormLatestInformationCP";

export class GuaranteeDetailFormLatestInformationCPGuaranteeAtlas extends GuaranteeDetailFormLatestInformationCP {
    constructor(driverService: SeleniumWebDriverService) {
        super(driverService);
    }
}