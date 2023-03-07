import { SeleniumWebDriverService } from "../../../../../../../core/selenium-webdriver.service";
import { AppEntityWidgets } from "../../../../app-entity-widgets/AppEntityWidgets";

export class LeadTabSummary extends AppEntityWidgets {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
}

