import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { AmendmentFormBasicInformationCP } from "../../../../general/guarantee/amendment-forms/AmendmentFormBasicInformationCP";


export class AmendmentFormBasicInformationCPGuaranteeAtlas extends AmendmentFormBasicInformationCP {
    constructor(driverService: SeleniumWebDriverService) {
        super(driverService);
    }
}