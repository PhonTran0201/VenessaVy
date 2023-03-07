import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { ReportListCP } from "../../../../general/report/report-list/ReportListCP";

export class GuaranteeReportListCPGuaranteeAtlas extends ReportListCP {
    constructor(driverService: SeleniumWebDriverService) {
        super(driverService);
    }
}