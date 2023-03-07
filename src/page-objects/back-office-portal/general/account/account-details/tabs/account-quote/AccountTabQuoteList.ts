
import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../../../core/selenium-webdriver.service";
import { QuoteList } from "../../../../quote/quote-list/QuoteList";


/**
 * Quote list in Account detail
 */
export class AccountTabQuoteList extends QuoteList {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
  protected strRootXpath = "//div[contains(@class,'tab-pane') and contains(@class,'active')]";
  protected btnGenerateSummary = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-quotes-list//button[contains(text(),'Generate summary')]`);
}