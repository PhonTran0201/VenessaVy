import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { AmendmentFormPayment } from "../../../../back-office-portal/guarantee/guarantee/amendment-forms/AmendmentFormPayment";


export class AmendmentFormPaymentCP extends AmendmentFormPayment {
    constructor(driverService: SeleniumWebDriverService) {
        super(driverService);
    }
}