import { SeleniumWebDriverService } from "../../../../../../../core/selenium-webdriver.service";
import { HistoryList } from "../../../../../general/history/history-list/HistoryList";


/**
 * History list in Claim detail
 */
export class ClaimTabHistoryListInsurance extends HistoryList {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
  protected strRootXpath = "//div[contains(@class,'tab-pane') and contains(@class,'active')]";
}