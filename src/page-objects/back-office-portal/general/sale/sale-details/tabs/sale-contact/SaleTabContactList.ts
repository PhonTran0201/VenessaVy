import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../../../core/selenium-webdriver.service";
import { logWarningMessage } from "../../../../../../../shared/functions";

export class SaleTabContactList {
    constructor(private driverService: SeleniumWebDriverService) { }

    public async assertContactsListAtSaleDetail(arrayContact: any[]): Promise<boolean> {
        try {
            await this.driverService.waitUntilElementLoaded(By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-sale-contacts"));
            await this.driverService.waitForSeconds(3000);
            let countError = 0;
            for (let i = 0; i < arrayContact.length; i++) {
                let lblName = By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-sale-contacts//app-edit-link-col/*)[${i + 1}]`);
                let lblPhone = By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-sale-contacts//td[2]/*)[${i + 1}]`);
                let lblEmail = By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-sale-contacts//td[3]/*)[${i + 1}]`);

                let actualName = await this.driverService.getText(lblName);
                let actualPhone = await this.driverService.getText(lblPhone);
                let actualEmail = await this.driverService.getText(lblEmail);
                let temp = await this.driverService.validateRecord(`assert Contacts Widget: Contacts ${i + 1}`,
                    [actualName, arrayContact[i].Name, "Assert at Name: Incorrect Name!"],
                    [actualPhone, arrayContact[i].Phone.toString(), "Assert at Phone: Incorrect Phone!"],
                    [actualEmail, arrayContact[i].Email, "Assert at Email: Incorrect Email!"]
                );
                if (!temp) {
                    logWarningMessage(`Checking contact at line ${i + 1} failed!`);
                    countError++;
                }
            }
            if (countError > 0) {
                return false;
            }
            return true;
        } catch (error) {
            console.log("assertEmptyContactsWidget");
            console.log(error);
            return false;
        }
    }
}
