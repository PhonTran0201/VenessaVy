import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { ApplicationFormContractAndGuarantee } from "../../../../back-office-portal/guarantee/application/application-forms/ApplicationFormContractAndGuarantee";

export class ApplicationFormContractAndGuaranteeCP extends ApplicationFormContractAndGuarantee {
    constructor(driverService: SeleniumWebDriverService) {
        super(driverService);
    }
}