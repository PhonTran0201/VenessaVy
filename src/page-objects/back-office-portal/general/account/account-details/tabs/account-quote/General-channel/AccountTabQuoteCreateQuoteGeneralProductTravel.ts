import { SeleniumWebDriverService } from "../../../../../../../../core/selenium-webdriver.service";
import { QuoteCreateQuoteGeneralProductTravel } from "../../../../../quote/quote-layouts/General-channel/QuoteCreateQuoteGeneralProductTravel";


/**
 * Create Quote in Anonymous Quote for Product Travel
 */
export class AccountTabQuoteCreateQuoteGeneralProductTravel extends QuoteCreateQuoteGeneralProductTravel {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
  protected strRootXpath = "//div[contains(@class,'tab-pane') and contains(@class,'active')]";
}