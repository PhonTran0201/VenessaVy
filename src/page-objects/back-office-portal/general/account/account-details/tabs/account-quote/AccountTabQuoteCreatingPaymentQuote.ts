
import { SeleniumWebDriverService } from "../../../../../../../core/selenium-webdriver.service";
import { QuoteCreatingPaymentQuote } from "../../../../quote/quote-layouts/QuoteCreatingPaymentQuote";


/**
 * Creating Payment Quote form in Account detail
 */
export class AccountTabQuoteCreatingPaymentQuote extends QuoteCreatingPaymentQuote {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
  protected strRootXpath = "//div[contains(@class,'tab-pane') and contains(@class,'active')]";
}