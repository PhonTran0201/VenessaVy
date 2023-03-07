import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { AmendmentFormBasicInformation } from "../../../../back-office-portal/guarantee/guarantee/amendment-forms/AmendmentFormBasicInformation";


export class AmendmentFormBasicInformationCP extends AmendmentFormBasicInformation {
    constructor(driverService: SeleniumWebDriverService) {
        super(driverService);
    }
}