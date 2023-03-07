import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { QuoteCreatingQuote } from "../QuoteCreatingQuote";


/**
 * Creating Quote in Anonymous Quote for Product Travel
 */
export class QuoteCreatingQuoteGeneralProductTravel extends QuoteCreatingQuote {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }

}