import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { AmendmentFormBasicInformationCP } from "../../../../general/guarantee/amendment-forms/AmendmentFormBasicInformationCP";


export class AmendmentFormBasicInformationCPGuaranteeHogs extends AmendmentFormBasicInformationCP {
    constructor(driverService: SeleniumWebDriverService) {
        super(driverService);
    }
}