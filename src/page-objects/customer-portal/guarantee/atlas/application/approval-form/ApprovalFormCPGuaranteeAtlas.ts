import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { ApprovalFormCP } from "../../../../general/application/approval-form/ApprovalFormCP";

export class ApprovalFormCPGuaranteeAtlas extends ApprovalFormCP {
   constructor(driverService: SeleniumWebDriverService) {
      super(driverService);
   }
}