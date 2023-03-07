import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";


export class ProfileForm {

    private txtOutlook = By.xpath(`//input[@id="outlook-email-field"]`);
    constructor(private driverService: SeleniumWebDriverService) { }

    //verify if user is connected to their outlook
    public async verifyOutlookStatus() {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtOutlook);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            let temp = await this.driverService.getAttributeValue(this.txtOutlook, `value`);
            if (temp) {
                return true;
            }
            return false;
        } catch (error) {
            console.log(`verifyOutlookStatus`);
            console.log(error);
            return false;
        }
    }
}
