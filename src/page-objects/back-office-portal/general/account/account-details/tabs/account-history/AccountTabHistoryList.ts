import { SeleniumWebDriverService } from "../../../../../../../core/selenium-webdriver.service";
import { HistoryList } from "../../../../history/history-list/HistoryList";


/**
 * History list in Account detail
 */
export class AccountTabHistoryList extends HistoryList {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
  protected strRootXpath = "//div[contains(@class,'tab-pane') and contains(@class,'active')]";
}