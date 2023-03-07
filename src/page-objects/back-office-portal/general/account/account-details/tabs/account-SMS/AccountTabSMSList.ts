import { By } from "selenium-webdriver";
import { SMSList } from "../../../../sms/sms-list/SMSList";

export class AccountTabSMSList extends SMSList{
    protected strRootXpath = "//div[contains(@class,'tab-pane') and contains(@class,'active')]";
    protected btnSendSMS = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[@id='send-sms-btn']`);
}