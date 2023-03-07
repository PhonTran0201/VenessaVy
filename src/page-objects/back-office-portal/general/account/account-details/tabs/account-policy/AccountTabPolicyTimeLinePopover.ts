import { By } from "selenium-webdriver";
import { PolicyTimeLinePopover } from "../../../../policy/policy-layouts/PolicyTimeLinePopover";

export class AccountTabPolicyTimeLinePopover extends PolicyTimeLinePopover {
    protected strRootXpath = "//div[contains(@class,'active') and @role='tabpanel']";

    protected btnStartDate = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'active') and @role='tabpanel']//*[contains(local-name(),'timeline')]//button[@title="Start date"]`);
    protected btnExpiry = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'active') and @role='tabpanel']//*[contains(local-name(),'timeline')]//button[@title="Expiry"]`);
}