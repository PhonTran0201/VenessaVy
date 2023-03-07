import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { AmendmentFormContractAndGuaranteeCP } from "../../../../general/guarantee/amendment-forms/AmendmentFormContractAndGuaranteeCP";


export class AmendmentFormContractAndGuaranteeCPGuaranteeHogs extends AmendmentFormContractAndGuaranteeCP {
    constructor(driverService: SeleniumWebDriverService) {
        super(driverService);
    }
}