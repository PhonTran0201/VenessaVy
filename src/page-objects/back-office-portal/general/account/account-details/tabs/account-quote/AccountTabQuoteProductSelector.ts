
import { SeleniumWebDriverService } from "../../../../../../../core/selenium-webdriver.service";
import { QuoteProductSelector } from "../../../../quote/quote-layouts/QuoteProductSelector";


/**
 * Quote Product selector in account detail
 */
export class AccountTabQuoteProductSelector extends QuoteProductSelector {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
  protected strRootXpath = "//div[contains(@class,'tab-pane') and contains(@class,'active')]";
}