import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../shared/functions";

export class GlobalFilterDropdown {
    private cmbFilterDropdown = By.xpath(`//input[contains(@id,"filter-dropdown")]`);

    constructor(private driverService: SeleniumWebDriverService) { }

    public async inputSelectFilterDropdown(filter: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbFilterDropdown);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await this.driverService.setText(this.cmbFilterDropdown, filter);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            return true;
        } catch (error) {
            console.log(`inputSelectFilterDropdown`);
            console.log(error);
            return false;
        }

    }
    public async deleteFilterByNameAndType(name: string, type: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbFilterDropdown);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let btnClearOption = By.xpath(`(//span[contains(text(), "${type}")]/following::div[contains(@role,"option")]//div[@title="${name}"]/following-sibling::i)[1]`);
            await this.driverService.click(btnClearOption);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true;
        } catch (error) {
            console.log(`deleteFilterByNameAndType`);
            console.log(error);
            return false;
        }
    }
}