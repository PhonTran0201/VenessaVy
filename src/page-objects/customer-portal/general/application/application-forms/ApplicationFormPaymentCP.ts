import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { ApplicationFormPayment } from "../../../../back-office-portal/guarantee/application/application-forms/ApplicationFormPayment";

export class ApplicationFormPaymentCP extends ApplicationFormPayment {
    constructor(driverService: SeleniumWebDriverService) {
        super(driverService);
    }
}