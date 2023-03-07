import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { selectDropdownOption, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";

export class ReplicateGuaranteeOptionsForm {
    constructor(protected driverService: SeleniumWebDriverService) { }

    protected txtProduct = By.xpath(`//app-clone-guarantee-options//*[@id='pgs-ins-select-pro-product']`);
    public async inputProductToReplicateGuaranteeOptionsForm(productName:string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtProduct);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await this.driverService.setText(this.txtProduct,productName);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await selectDropdownOption(productName,"",this.driverService);
            return true;
        } catch (error) {
            console.log("inputProductToReplicateGuaranteeOptionsForm");
            console.log(error);
            return false;
        }
    }
}