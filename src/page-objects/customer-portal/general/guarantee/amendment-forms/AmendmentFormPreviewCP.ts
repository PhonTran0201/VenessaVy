import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { AmendmentFormPreview } from "../../../../back-office-portal/guarantee/guarantee/amendment-forms/AmendmentFormPreview";


export class AmendmentFormPreviewCP extends AmendmentFormPreview {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
}