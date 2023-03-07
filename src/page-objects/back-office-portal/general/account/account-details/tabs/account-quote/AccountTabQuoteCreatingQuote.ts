
import { SeleniumWebDriverService } from "../../../../../../../core/selenium-webdriver.service";
import { QuoteCreatingQuote } from "../../../../quote/quote-layouts/QuoteCreatingQuote";


/**
 * Creating Quote form in Account detail
 */
export class AccountTabQuoteCreatingQuote extends QuoteCreatingQuote {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
  protected strRootXpath = "//div[contains(@class,'tab-pane') and contains(@class,'active')]";
}