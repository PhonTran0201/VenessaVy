import { SeleniumWebDriverService } from "../../../../../../../core/selenium-webdriver.service";
import { AccountTabHistoryList } from "../../../../../general/account/account-details/tabs/account-history/AccountTabHistoryList";

export class AccountTabHistoryListGuarantee extends AccountTabHistoryList {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
}