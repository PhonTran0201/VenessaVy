
import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../../../core/selenium-webdriver.service";
import { PolicyDetails } from "../../../../policy/policy-layouts/PolicyDetails";


export class AccountTabPolicyDetails extends PolicyDetails {
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
  protected strRootXpath = "//div[contains(@class,'active') and @role='tabpanel']";
  //#region Header
  protected lblPolicyRef_Header = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'active') and @role='tabpanel']//app-customer-policy-list-widget//div[contains(@class,'detail-content')]//h2[contains(@class,'page-title')]`);
  protected btnAdjust_Header = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'active') and @role='tabpanel']//app-customer-policy-list-widget//div[contains(@class,'page-header')]//button[text()='Adjust ']`);
  protected btnTerminate_Header = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'active') and @role='tabpanel']//app-customer-policy-list-widget//div[contains(@class,'page-header')]//button[text()='Terminate ']`);
  protected btnRenew_Header = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'active') and @role='tabpanel']//app-customer-policy-list-widget//div[contains(@class,'page-header')]//button[text()='Renew ']`);
  //#endregion

  //#region Policy Info section
  protected lblPeriod_PolicyInfo = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'active') and @role='tabpanel']//app-customer-policy-list-widget//div[./label[contains(text(),'Period')]]//span`);
  protected lblProduct_PolicyInfo = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'active') and @role='tabpanel']//app-customer-policy-list-widget//div[./label[contains(text(),'Product')]]//span`);
  protected lblProductTooltipIcon_PolicyInfo = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'active') and @role='tabpanel']//app-customer-policy-list-widget//div[./label[contains(text(),'Product')]]//a/i`);
  protected lblProductTooltipVersion_PolicyInfo = By.xpath(`//ngb-tooltip-window/div[contains(@class,'tooltip-inner')]`);
  protected lblChannel_PolicyInfo = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'active') and @role='tabpanel']//app-customer-policy-list-widget//div[./label[contains(text(),'Channel')]]//span`);
  protected lblEffectiveDate_PolicyInfo = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'active') and @role='tabpanel']//div[./label[contains(text(),'Effective date')]]//span`);
  protected lblPolicyPremium_PolicyInfo = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'active') and @role='tabpanel']//div[./label[contains(text(),'Policy Premium')]]//span`);
  protected lblAnnualPremium_PolicyInfo = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'active') and @role='tabpanel']//div[./label[contains(text(),'Annual Premium')]]//span`);
  protected lblStatus_PolicyInfo = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'active') and @role='tabpanel']//div[./label[contains(text(),'Status')]]`);
  protected lblPreviousInsurer_PolicyInfo = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'active') and @role='tabpanel']//div[./label[contains(text(),'Previous insurer')]]//span[1]`);
  protected lblPreviousInsurerPopoverIcon_PolicyInfo = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'active') and @role='tabpanel']//div[./label[contains(text(),'Previous insurer')]]//span[2]`);
  protected lblPreviousInsurerPopoverMessage_PolicyInfo = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'active') and @role='tabpanel']//div[./label[contains(text(),'Previous insurer')]]//ngb-popover-window//div[contains(@class,'popover-message-container')]`);
  protected lblRenewalMode_PolicyInfo = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'active') and @role='tabpanel']//div[./label[contains(text(),'Renewal mode')]]//span`);
  //#endregion

  //#region Premium Section
  protected lblPremiumExlTax_AnnualPremium_Premium = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'active') and @role='tabpanel']//section[.//h4[text()=' Premium ']]//tbody//tr[./th[text()=' Premium exl. Tax ']]/td[1]`);
  protected lblUnderwritingAdjustment_AnnualPremium_Premium = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'active') and @role='tabpanel']//section[.//h4[text()=' Premium ']]//tbody//tr[.//span[contains(text(),'Underwriting adjustment')]]/td[1]`);
  protected lblSalesDiscount_AnnualPremium_Premium = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'active') and @role='tabpanel']//section[.//h4[text()=' Premium ']]//tbody//tr[.//th[contains(text(),'Sales discount')]]/td[1]`);
  protected lblProductCommission_AnnualPremium_Premium = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'active') and @role='tabpanel']//section[.//h4[text()=' Premium ']]//tbody//tr[.//th[contains(text(),' Product commission ')]]/td[1]`);
  protected lblSalesCommission_AnnualPremium_Premium = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'active') and @role='tabpanel']//section[.//h4[text()=' Premium ']]//tbody//tr[.//th[contains(text(),' Sales commission ')]]/td[1]`);
  protected lblTax_AnnualPremium_Premium = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'active') and @role='tabpanel']//section[.//h4[text()=' Premium ']]//tbody//tr[.//th[text()=' Tax ']]/td[1]`);
  protected lblTotalPremium_AnnualPremium_Premium = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'active') and @role='tabpanel']//section[.//h4[text()=' Premium ']]//tbody//tr[.//th[text()=' Total premium ']]/td[1]`);

  protected lblPremiumExlTax_PolicyPremium_Premium = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'active') and @role='tabpanel']//section[.//h4[text()=' Premium ']]//tbody//tr[./th[text()=' Premium exl. Tax ']]/td[2]`);
  protected lblUnderwritingAdjustment_PolicyPremium_Premium = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'active') and @role='tabpanel']//section[.//h4[text()=' Premium ']]//tbody//tr[.//span[contains(text(),'Underwriting adjustment')]]/td[2]`);
  protected lblSalesDiscount_PolicyPremium_Premium = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'active') and @role='tabpanel']//section[.//h4[text()=' Premium ']]//tbody//tr[.//th[contains(text(),'Sales discount')]]/td[2]`);
  protected lblProductCommission_PolicyPremium_Premium = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'active') and @role='tabpanel']//section[.//h4[text()=' Premium ']]//tbody//tr[.//th[contains(text(),' Product commission ')]]/td[2]`);
  protected lblSalesCommission_PolicyPremium_Premium = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'active') and @role='tabpanel']//section[.//h4[text()=' Premium ']]//tbody//tr[.//th[contains(text(),' Sales commission ')]]/td[2]`);
  protected lblTax_PolicyPremium_Premium = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'active') and @role='tabpanel']//section[.//h4[text()=' Premium ']]//tbody//tr[.//th[text()=' Tax ']]/td[2]`);
  protected lblTotalPremium_PolicyPremium_Premium = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'active') and @role='tabpanel']//section[.//h4[text()=' Premium ']]//tbody//tr[.//th[text()=' Total premium ']]/td[2]`);

  // Cột %
  protected lblUnderwritingAdjustment_Premium = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'active') and @role='tabpanel']//section[.//h4[text()=' Premium ']]//tbody//tr[.//th[contains(text(),'Underwriting adjustment')]]/th[2]`);
  protected lblSalesDiscount_Premium = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'active') and @role='tabpanel']//section[.//h4[text()=' Premium ']]//tbody//tr[.//th[contains(text(),'Sales discount')]]/th[2]`);
  protected lblProductCommission_Premium = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'active') and @role='tabpanel']//section[.//h4[text()=' Premium ']]//tbody//tr[.//th[contains(text(),'Product commission')]]/th[2]`);
  protected lblSalesCommission_Premium = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'active') and @role='tabpanel']//section[.//h4[text()=' Premium ']]//tbody//tr[.//th[contains(text(),'Sales commission')]]/th[2]`);
  //#endregion

  //#region Documents
  protected hrefDocument = By.xpath(`//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'active') and @role='tabpanel']//div[contains(@class,'policy-document')]//a//span`);
  //#endregion
}