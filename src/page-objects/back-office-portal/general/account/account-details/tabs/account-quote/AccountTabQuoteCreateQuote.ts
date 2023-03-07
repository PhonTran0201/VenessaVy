
import { SeleniumWebDriverService } from "../../../../../../../core/selenium-webdriver.service";
import { QuoteCreateQuote } from "../../../../quote/quote-layouts/QuoteCreateQuote";


/**
 * Create Quote form in Account detail
 */
export class AccountTabQuoteCreateQuote extends QuoteCreateQuote {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
  protected strRootXpath = "//div[contains(@class,'tab-pane') and contains(@class,'active')]";
}