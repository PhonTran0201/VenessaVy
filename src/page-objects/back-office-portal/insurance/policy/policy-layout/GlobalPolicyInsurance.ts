import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";


export class GlobalPolicyInsurance {
  constructor(protected driverService: SeleniumWebDriverService) { }
  public static realSuccessRefNum: string = "default";

  private startDateField = By.xpath('//*[@id="startDate"]');


  public async assertPoliciesAtPolicyWidget(
    selectedRow: number,
    expectedProduct_PolicyRef: string,
    expectedPremium: string): Promise<boolean> {
    try {
      let hrefProduct_PolicyRef = By.xpath(`(//app-customer-latest-policy//app-entity-details-link/a)[${selectedRow}]`);
      let lblPremium = By.xpath(`(//app-customer-latest-policy//app-customer-details-link/following-sibling::div[2])[${selectedRow}]`);

      await this.driverService.waitUntilElementLoaded(hrefProduct_PolicyRef);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);

      let actualProduct_QuoteRef = await this.driverService.getText(hrefProduct_PolicyRef);
      let actualPremium = await this.driverService.getText(lblPremium);


      let temp = await this.driverService.validateRecord(`Create policy - \"${expectedProduct_PolicyRef}\"`,
        [actualProduct_QuoteRef, expectedProduct_PolicyRef, "Assert at Product - Policy ref: Incorrect Product - Policy ref!"],
        [actualPremium, expectedPremium, "Assert at Premium: Incorrect Premium!"]
      );
      if (!temp) {
        return false;
      }

      return true;
    } catch (error) {
      console.log("assertPoliciesAtPolicyWidget");
      console.log(error);
      return false;
    }
  }
}
