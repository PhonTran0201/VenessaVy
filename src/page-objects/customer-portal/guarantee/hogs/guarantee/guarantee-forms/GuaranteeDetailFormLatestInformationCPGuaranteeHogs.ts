import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { GuaranteeDetailFormLatestInformationCP } from "../../../../general/guarantee/guarantee-forms/GuaranteeDetailFormLatestInformationCP";

export class GuaranteeDetailFormLatestInformationCPGuaranteeHogs extends GuaranteeDetailFormLatestInformationCP {
    constructor(driverService: SeleniumWebDriverService) {
        super(driverService);
    }
}