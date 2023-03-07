import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { ApplicationFormBasicInformation } from "../../application/application-forms/ApplicationFormBasicInformation";


export class AmendmentFormBasicInformation extends ApplicationFormBasicInformation {
    constructor(driverService: SeleniumWebDriverService) {
        super(driverService);
    }
}