import { SeleniumWebDriverService } from "../../../../../../../../core/selenium-webdriver.service";
import { QuoteCreateQuoteVarsamProductInnboSeasonal } from "../../../../../quote/quote-layouts/Varsam-channel/QuoteCreateQuoteVarsamProductInnboSeasonal";


/**
 * Create Quote in Anonymous Quote for Product InnboSeasonal
 */
export class AccountTabQuoteCreateQuoteVarsamProductInnboSeasonal extends QuoteCreateQuoteVarsamProductInnboSeasonal {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
  protected strRootXpath = "//div[contains(@class,'tab-pane') and contains(@class,'active')]";
}