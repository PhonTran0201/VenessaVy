
import { SeleniumWebDriverService } from "../../../../../../../core/selenium-webdriver.service";
import { PolicyConfirmationLadingPage } from "../../../../../insurance/policy/policy-layout/PolicyConfirmationLadingPage";


export class AccountTabPolicyConfirmationLadingPage extends PolicyConfirmationLadingPage {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
  protected strRootXpath = "//div[contains(@class,'tab-pane') and contains(@class,'active')]";
}