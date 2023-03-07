import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { AmendmentFormContractAndGuarantee } from "../../../../back-office-portal/guarantee/guarantee/amendment-forms/AmendmentFormContractAndGuarantee";


export class AmendmentFormContractAndGuaranteeCP extends AmendmentFormContractAndGuarantee {
    constructor(driverService: SeleniumWebDriverService) {
        super(driverService);
    }
}