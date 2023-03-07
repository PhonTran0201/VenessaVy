import { SeleniumWebDriverService } from "../../../../../../../../core/selenium-webdriver.service";
import { QuoteCreatingQuoteGeneralProductTravel } from "../../../../../quote/quote-layouts/General-channel/QuoteCreatingQuoteGeneralProductTravel";


/**
 * Creating Quote in Anonymous Quote for Product Travel
 */
export class AccountTabQuoteCreatingQuoteGeneralProductTravel extends QuoteCreatingQuoteGeneralProductTravel {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
  protected strRootXpath = "//div[contains(@class,'tab-pane') and contains(@class,'active')]";
}