import { By } from "selenium-webdriver";
import { GlobalPageObject } from "../../../back-office-portal/general/GlobalPageObject/GlobalPageObject";

export class GlobalPageObjectCPVasam extends GlobalPageObject {
    protected btnCancelForm = By.xpath("//*[contains(local-name(),'form')]//a[contains(text(),'Cancel')]");

    protected lblTotalNumberRecordMainTab = By.xpath("//app-table-pagination//*[contains(text(),'Total: ')]");
    protected lblTotalNumberRecordSubTab = By.xpath("//div[@role='tabpanel' and contains(@class,'show')]//app-table-pagination//*[contains(text(),'Total: ')]");
}