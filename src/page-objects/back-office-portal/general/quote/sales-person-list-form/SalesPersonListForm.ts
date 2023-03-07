import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";

export class SalesPersonListForm {
    // Header
    private btnAssignToMe = By.xpath("//app-sales-person-list-form//button[text()=' Assign to Me ']");
    private txtSearchUser = By.xpath("//app-sales-person-list-form//input[@id='btn-search-cus']");
    private btnSearchUser = By.xpath("//app-sales-person-list-form//button[.//*[contains(@class,'fa-search')]]");


    // Footer
    constructor(private driverService: SeleniumWebDriverService) { }

    public async pressAssignToMeButton(){
        try {
            await this.driverService.waitUntilElementLoaded(this.btnAssignToMe);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.click(this.btnAssignToMe);
            return true;
        } catch (error) {
            console.log('pressAssignToMeButton');
            console.log(error);
            return false;
        }
    }

    public async pressSearchUserButton(){
        try {
            await this.driverService.waitUntilElementLoaded(this.btnSearchUser);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.click(this.btnSearchUser);
            return true;
        } catch (error) {
            console.log('pressSearchUserButton');
            console.log(error);
            return false;
        }
    }
    public async inputSearchUser(value: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtSearchUser);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
            await this.driverService.setText(this.txtSearchUser, value);
            return true;
        } catch (error) {
            console.log('inputSearchUser');
            console.log(error);
            return false;
        }
    }

    public async tickCheckboxByName(value: string){
        try {
            const cbxUser = By.xpath(`//app-sales-person-list-form//tbody//tr[./td/span[text()=' ${value} ']]//app-check-box-cell/label`);
            await this.driverService.waitUntilElementLoaded(cbxUser);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await this.driverService.click(cbxUser);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}