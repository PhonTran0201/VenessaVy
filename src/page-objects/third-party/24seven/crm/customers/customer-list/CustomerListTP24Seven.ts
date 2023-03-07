import { fail } from "assert";
import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";

export class CustomerListTP24Seven {
    constructor(private driverService: SeleniumWebDriverService) { }
  private txtSearchCustomer = By.xpath("//input[@id='search-filter-free-text']");



  public async searchCustomerOnCustomerList(customerName : string){
    try{
        await this.driverService.waitUntilElementLoaded(this.txtSearchCustomer);
        await this.driverService.waitUntilPageLoaded();
        await this.driverService.setText(this.txtSearchCustomer,customerName);
        await this.driverService.pressEnter(this.txtSearchCustomer);
        await this.driverService.waitUntilPageLoaded();
        return true;
    }catch(error){
        console.log("searchCustomerOnCustomerList");
        console.log(error);
        return false;
    }

  }
  public async openCustomerOnCustomerList(positionRow: number = 1){
    try{
        await this.driverService.waitUntilElementLoaded(By.xpath("//table//tbody/tr"));
        if(await this.driverService.isExisted(By.xpath("//table//tbody/tr"))){
            await this.driverService.click(By.xpath(`//table//tbody/tr[${positionRow}]//td[3]//a`));
            await this.driverService.waitForSeconds(5000);
            return true;
        }
        return false;
    }catch(error){
        console.log("openCustomerOnCustomerList");
        console.log(error);
        return false;
    }

  }


}