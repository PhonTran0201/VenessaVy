import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { ApplicationDetailFormTabDocuments } from "../../../../back-office-portal/guarantee/application/application-detail-forms/ApplicationDetailFormTabDocuments";

export class ApplicationDetailFormTabDocumentsCP extends ApplicationDetailFormTabDocuments {
    constructor(driverService: SeleniumWebDriverService) {
        super(driverService);
    }
}