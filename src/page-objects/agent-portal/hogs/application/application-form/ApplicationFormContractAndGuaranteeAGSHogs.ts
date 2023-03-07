import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";
import { ApplicationFormContractAndGuarantee } from "../../../../back-office-portal/guarantee/application/application-forms/ApplicationFormContractAndGuarantee";


export class ApplicationFormContractAndGuaranteeAGSHogs extends ApplicationFormContractAndGuarantee {
    constructor(driverService: SeleniumWebDriverService) {
        super(driverService);
    }
}
