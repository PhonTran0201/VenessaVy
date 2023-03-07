import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { ApprovalFormCP } from "../../../../general/application/approval-form/ApprovalFormCP";

export class ApprovalFormCPGuaranteeHogs extends ApprovalFormCP {
   constructor(driverService: SeleniumWebDriverService) {
      super(driverService);
   }
}