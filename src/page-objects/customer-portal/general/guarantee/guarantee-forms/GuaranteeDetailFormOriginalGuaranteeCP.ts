import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { GuaranteeDetailFormOriginalGuarantee } from "../../../../back-office-portal/guarantee/guarantee/guarantee-forms/GuaranteeDetailFormOriginalGurantee";


export class GuaranteeDetailFormOriginalGuaranteeCP extends GuaranteeDetailFormOriginalGuarantee {
    constructor(driverService: SeleniumWebDriverService) {
       super(driverService);
    }
}