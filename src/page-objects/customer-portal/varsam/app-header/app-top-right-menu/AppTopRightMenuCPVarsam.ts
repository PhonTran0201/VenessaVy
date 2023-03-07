import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { AppTopRightMenuCP } from "../../../general/app-header/app-top-right-menu/AppTopRightMenuCP";

export class AppTopRightMenuCPVarsam extends AppTopRightMenuCP{
    constructor(driverService: SeleniumWebDriverService){
        super(driverService);
    }
    protected lblCurrentLanguage = By.xpath(`//app-header//span[./*[contains(@class,'fa-language')]]/following-sibling::span`);
    protected btnLogout = By.xpath(`//app-header//a[text()='Log out']`);

    public async pressLogoutButton(){
        try {
            await this.driverService.waitUntilElementVisible(this.btnLogout);
            await this.driverService.click(this.btnLogout);
            return true;
        } catch (error) {
            console.log('pressLogoutButton');
            console.log(error);
            return false;
        }
    }
}
