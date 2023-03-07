import { SeleniumWebDriverService } from "../../../../../../../../core/selenium-webdriver.service";
import { QuoteCreateQuoteGeneralProductInnbo } from "../../../../../quote/quote-layouts/General-channel/QuoteCreateQuoteGeneralProductInnbo";


/**
 * Create Quote in Anonymous Quote for Product Travel
 */
export class AccountTabQuoteCreateQuoteGeneralProductInnbo extends QuoteCreateQuoteGeneralProductInnbo {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
  protected strRootXpath = "//div[contains(@class,'tab-pane') and contains(@class,'active')]";
}