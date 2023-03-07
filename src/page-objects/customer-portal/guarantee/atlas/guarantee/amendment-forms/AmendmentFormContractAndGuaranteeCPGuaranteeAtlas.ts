import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { AmendmentFormContractAndGuaranteeCP } from "../../../../general/guarantee/amendment-forms/AmendmentFormContractAndGuaranteeCP";


export class AmendmentFormContractAndGuaranteeCPGuaranteeAtlas extends AmendmentFormContractAndGuaranteeCP {
    constructor(driverService: SeleniumWebDriverService) {
        super(driverService);
    }
}