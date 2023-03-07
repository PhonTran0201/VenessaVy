import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../../../../core/selenium-webdriver.service";
import { QuoteCreatingQuoteVarsamProductInnboSeasonal } from "../../../../../quote/quote-layouts/Varsam-channel/QuoteCreatingQuoteVarsamProductInnboSeasonal";

/**
 * Creating Quote in Anonymous Quote for Product InnboSeasonal
 */
export class AccountTabQuoteCreatingQuoteVarsamProductInnboSeasonal extends QuoteCreatingQuoteVarsamProductInnboSeasonal {
  //#region Header
  protected btnRequoteOnHeader = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[.//*[text()='Requote']]`);
  protected btnGenerateDocumentOnHeader = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[text()='Generate Document ']`);
  //#endregion

  //#region App Progress Indicator: Product - Question - Review - Acceptance
  ///??????????????????
  //#endregion

  //#region Created Date - Last Updated Date
  protected lblCreatedDate = By.xpath(``);///?????
  //#endregion

  //#region app-section-indicator
  //?????????
  //#endregion


  //#region Quote Documents
  protected hrefDocument_QuoteDocuments = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'quote-document')]//a/span`);
  protected imgDocument_QuoteDocuments = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'quote-document')]//a/img`);
  //#endregion


  //#region Header
  protected lblQuoteRef = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//h2[contains(text(),'Quote Ref.:')]`);
  protected lblAlertMessage = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@role,'alert')]`);
  protected lblSalesPerson = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./b[contains(text(),'Sales Person')]]`);
  protected btnAssignSalesPerson = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./b[contains(text(),'Sales Person')]]//button`);

  //#endregion

  //#region Insurance Information
  protected lblPolicyTerm_InsuranceInformation = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//section//div[./span[contains(text(),'Policy term: ')]]/span[2]`);
  protected lblExpiryDate_InsuranceInformation = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//section//div[./span[contains(text(),'Expiry Date: ')]]/span[2]`);
  protected lblProduct_InsuranceInformation = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//section//div[./span[contains(text(),'Product: ')]]/span[2]`);
  //#endregion

  //#region Previous Insurer
  protected lblPreviousInsurer_PreviousInsurer = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//section//div[./span[contains(text(),'Previous Insurer: ')]]/span[2]`);
  protected btnEditPreviousInsurer_PreviousInsurer = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//section//div[./span[contains(text(),'Previous Insurer: ')]]/span[3]/button`);
  protected lblEmail_PreviousInsurer = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//section//div[./span[contains(text(),'Email: ')]]/span[2]`);
  //#endregion


  //#region Premium
  protected btnCalculate_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[./*[contains(@class,'fa-calculator')] and not(@disabled)]]`);
  protected btnCalculateDisabled_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//section//div[./h4[text()='Premium']]//button[./*[contains(@class,'fa-calculator')] and @disabled]`);

  protected btnRevert_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//div[./h4[text()='Premium']]]//button[text()=' Revert ']`);
  protected lblAlertRevert_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//div[./h4[text()='Premium']]]//div[contains(@class,'alert-warning')]`);


  protected lblPremiumExlTax_AnnualPremium_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Premium']]//tbody//tr[./th[text()=' Premium exl. Tax ']]/td[1]`);
  protected lblUnderwritingAdjustment_AnnualPremium_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Premium']]//tbody//tr[.//span[contains(text(),'Underwriting adjustment')]]/td[1]`);
  protected lblSalesDiscount_AnnualPremium_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Premium']]//tbody//tr[.//div[contains(text(),'Sales discount')]]/td[1]`);
  protected lblProductCommission_AnnualPremium_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Premium']]//tbody//tr[.//div[contains(text(),' Product commission ')]]/td[1]`);
  protected lblSalesCommission_AnnualPremium_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Premium']]//tbody//tr[.//div[contains(text(),' Sales commission ')]]/td[1]`);
  protected lblTax_AnnualPremium_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Premium']]//tbody//tr[.//th[text()=' Tax ']]/td[1]`);
  protected lblTotalPremium_AnnualPremium_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Premium']]//tbody//tr[.//th[text()=' Total premium ']]/td[1]`);

  protected lblPremiumExlTax_PolicyPremium_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Premium']]//tbody//tr[./th[text()=' Premium exl. Tax ']]/td[2]`);
  protected lblUnderwritingAdjustment_PolicyPremium_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Premium']]//tbody//tr[.//span[contains(text(),'Underwriting adjustment')]]/td[2]`);
  protected lblSalesDiscount_PolicyPremium_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Premium']]//tbody//tr[.//div[contains(text(),'Sales discount')]]/td[2]`);
  protected lblProductCommission_PolicyPremium_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Premium']]//tbody//tr[.//div[contains(text(),' Product commission ')]]/td[2]`);
  protected lblSalesCommission_PolicyPremium_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Premium']]//tbody//tr[.//div[contains(text(),' Sales commission ')]]/td[2]`);
  protected lblTax_PolicyPremium_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Premium']]//tbody//tr[.//th[text()=' Tax ']]/td[2]`);
  protected lblTotalPremium_PolicyPremium_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Premium']]//tbody//tr[.//th[text()=' Total premium ']]/td[2]`);

  // Cột %
  protected btnAddCommentUnderwritingAdjustment_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Premium']]//tbody//tr[.//div[text()=' Underwriting adjustment ']]//button[./*[contains(@class,'comment')]]`);
  protected txtUnderwritingAdjustment_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Premium']]//tbody//tr[.//*[contains(text(),'Underwriting adjustment')]]//input`);
  protected txtSalesDiscount_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Premium']]//tbody//tr[.//div[text()=' Sales discount ']]//input`);
  protected txtProductCommission_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Premium']]//tbody//tr[.//div[text()=' Product commission ']]//input`);
  protected txtSalesCommission_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Premium']]//tbody//tr[.//div[text()=' Sales commission ']]//input`);

  // Cột % Validation
  protected lblUnderwritingAdjustmentValidation_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Premium']]//tbody//tr[.//div[text()=' Underwriting adjustment ']]//div[contains(@class,'invalid-feedback')]`);
  protected lblSalesDiscountValidation_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Premium']]//tbody//tr[.//div[text()=' Sales discount ']]//div[contains(@class,'invalid-feedback')]`);
  protected lblProductCommissionValidation_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Premium']]//tbody//tr[.//div[text()=' Product commission ']]//div[contains(@class,'invalid-feedback')]`);
  protected lblSalesCommissionValidation_Premium = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//section[.//h4[text()='Premium']]//tbody//tr[.//div[text()=' Sales commission ']]//div[contains(@class,'invalid-feedback')]`);
  //#endregion


  //#region Cover Breakdown
  /// ???????? Từng Product có cover riêng
  //#endregion


  //#region Purchase Contraints
  ///?????????????????
  //#endregion


  //#region Footer (button on Footer)
  protected btnBackToQuotesListOnFooter = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[text()='Back To Quotes List' and not(@disabled)]`);
  protected btnBackOnFooter = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[text()='Back' and not(@disabled)]`);
  protected btnCalculateOnFooter = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[text()='Calculate' and not(@disabled)]`);
  protected btnNextOnFooter = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[text()='Next' and not(@disabled)]`);
  protected btnAcceptOnFooter = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[text()=' Accept ' and not(@disabled)]`);
  protected btnApproveOnFooter = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[text()=' Approve ' and not(@disabled)]`);
  //#endregion
  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }
}