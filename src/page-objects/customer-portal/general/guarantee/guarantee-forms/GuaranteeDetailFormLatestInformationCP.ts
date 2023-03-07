import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { GuaranteeDetailFormLatestInformation } from "../../../../back-office-portal/guarantee/guarantee/guarantee-forms/GuaranteeDetailFormLatestInformation";

export class GuaranteeDetailFormLatestInformationCP extends GuaranteeDetailFormLatestInformation {
    constructor(driverService: SeleniumWebDriverService) {
        super(driverService);
    }
}