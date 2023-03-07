import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";
import { ApplicationFormContractAndGuarantee } from "../../application/application-forms/ApplicationFormContractAndGuarantee";


export class AmendmentFormContractAndGuarantee extends ApplicationFormContractAndGuarantee {


    constructor(driverService: SeleniumWebDriverService) {
        super(driverService);
    }


    protected txtEffectedDateGuarantee = By.xpath("//*[contains(local-name(),'form')]//input[@name='EffectedDateTag']");

    //Guarantee section
    public async inputEffectedDateGuarantee(EffectedDate: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtEffectedDateGuarantee);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            if (await this.driverService.canBeSetText(this.txtEffectedDateGuarantee)) {
                await this.driverService.setText(this.txtEffectedDateGuarantee, EffectedDate);
            }
            await this.driverService.pressTabCurrentElement();
            return true;
        } catch (error) {
            console.log("inputEffectedDateGuarantee");
            console.log(error);
            return false;
        }
    }
}