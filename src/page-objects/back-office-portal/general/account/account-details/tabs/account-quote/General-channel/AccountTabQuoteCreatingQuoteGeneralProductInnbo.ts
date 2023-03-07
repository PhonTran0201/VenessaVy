import { SeleniumWebDriverService } from "../../../../../../../../core/selenium-webdriver.service";
import { QuoteCreatingQuoteGeneralProductInnbo } from "../../../../../quote/quote-layouts/General-channel/QuoteCreatingQuoteGeneralProductInnbo";


/**
 * Create Quote in Anonymous Quote for Product Travel
 */
export class AccountTabQuoteCreatingQuoteGeneralProductInnbo extends QuoteCreatingQuoteGeneralProductInnbo {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
  protected strRootXpath = "//div[contains(@class,'tab-pane') and contains(@class,'active')]";
}