import { SeleniumWebDriverService } from "../../../../../../../core/selenium-webdriver.service";
import { SaleList } from "../../../../sale/sale-list/SaleList";


/**
 * Sale list in Account detail
 */
export class AccountTabSaleList extends SaleList {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
  protected strRootXpath = "//div[contains(@class,'tab-pane') and contains(@class,'active')]";
}