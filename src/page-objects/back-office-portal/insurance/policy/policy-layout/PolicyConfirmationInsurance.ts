import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { logInfoMessage, logWarningMessage } from "../../../../../shared/functions";
import { GlobalPolicyInsurance } from "./GlobalPolicyInsurance";

export class PolicyConfirmationInsurance {
  constructor(protected driverService: SeleniumWebDriverService) { }

  private successAlert = By.xpath("//*[text()='Policies have been created successfully!.']");
  private successRefNum = By.xpath("//app-confirmation-step//app-detail-card-col/a");

  public async checkPurchaseSuccessful(): Promise<boolean> {
    try {
      let msg: string;
      await this.driverService.waitUntilElementLoaded(this.successAlert);
      msg = await this.driverService.getText(this.successAlert);

      if (
        msg.localeCompare("POLICIES HAVE BEEN CREATED SUCCESSFULLY!.") ===
        0
      ) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async showPoliciesCreatedSuccess(): Promise<boolean> {
    if (await this.checkPurchaseSuccessful()) {
      logInfoMessage("POLICIES CREATED");
      await this.driverService.waitUntilElementLoaded(this.successRefNum);
      GlobalPolicyInsurance.realSuccessRefNum = await this.driverService.getText(
        this.successRefNum
      );
      return true;
    } else {
      logWarningMessage(`System don't show Success message: \n\t"POLICIES HAVE BEEN CREATED SUCCESSFULLY!."`);
      return false;
    }
  }
}