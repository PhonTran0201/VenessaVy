import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../../../core/selenium-webdriver.service";

export class GlobalCustomerDetail {
    constructor(private driverService: SeleniumWebDriverService) { }
    private tabInformation = By.xpath(`//div[@role="tablist"]//button[./span[contains(text(),"Information")]]`);
    private tabOrder = By.xpath(`//div[@role="tablist"]//button[./span[contains(text(),"Orders")]]`);

    private tabLedger = By.xpath(`//div[@role="tablist"]//button[./span[contains(text(),"Ledger")]]`);

    private tabContacts = By.xpath(`//div[@role="tablist"]//button[./span[contains(text(),"Contacts")]]`);

    private tabMail = By.xpath(`//div[@role="tablist"]//button[./span[contains(text(),"Mail")]]`);

    private tabDocuments = By.xpath(`//div[@role="tablist"]//button[./span[contains(text(),"Documents")]]`);

    private tabMergeDocument = By.xpath(`//div[@role="tablist"]//button[./span[contains(text(),"Merge document")]]`);

    private tabCustomForm = By.xpath(`//div[@role="tablist"]//button[./span[contains(text(),"Custom forms")]]`);

    private tabConversation = By.xpath(`//div[@role="tablist"]//button[./span[contains(text(),"Conversation")]]`);

    private tabDiscountMatrix = By.xpath(`//div[@role="tablist"]//button[./span[contains(text(),"Discount matrix")]]`);

    public async navigateToOrderTab(){
        try {
            await this.driverService.waitUntilElementLoaded(this.tabOrder);
            await this.driverService.click(this.tabOrder);
            await this.driverService.waitUntilPageLoaded();
            return true;
        } catch (error) {
            console.log("navigateToOrderTab");
            console.log(error);
            return false;
            
        }
    }

    public async navigateToLedgerTab(){
        try {
            await this.driverService.waitUntilElementLoaded(this.tabLedger);
            await this.driverService.click(this.tabLedger);
            await this.driverService.waitUntilPageLoaded();
            return true;
        } catch (error) {
            console.log("navigateToLedgerTab");
            console.log(error);
            return false;
            
        }
    }



}