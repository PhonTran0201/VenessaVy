import { SeleniumWebDriverService } from "../../../../../../../core/selenium-webdriver.service";
import { SaleForm } from "../../../../sale/sale-forms/SaleForm";


/**
 * Sale form in Account detail
 */
export class AccountTabSaleForm extends SaleForm {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
}