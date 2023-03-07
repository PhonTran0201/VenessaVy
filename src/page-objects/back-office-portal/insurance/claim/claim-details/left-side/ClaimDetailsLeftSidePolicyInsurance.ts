import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { logWarningMessage, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../../shared/functions";

export class ClaimDetailsLeftSidePolicyInsurance {
  constructor(private driverService: SeleniumWebDriverService) { }

  //Elements at Claim detail Policy Information
  private lblDtReferencePolicyInformation = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-details-left-side-policy//label[text()=' Reference ']/following-sibling::*");
  private lblDtStatusPolicyInformation = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-details-left-side-policy//label[text()=' Status ']/following-sibling::*");
  private lblDtTermPolicyInformation = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-details-left-side-policy//label[text()='Term']/following-sibling::*");
  private lblDtPremiumPolicyInformation = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-details-left-side-policy//label[text()='Premium']/following-sibling::*");
  private lblDtProductPolicyInformation = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-details-left-side-policy//label[text()='Product']/following-sibling::*");
  private lblDtCoverPolicyInformation = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-details-left-side-policy//label[text()='Covers']/following-sibling::*");
  private lblDtDocumentPolicyInformation = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-claim-details-left-side-policy//label[text()='Documents']/following-sibling::*//*[self::*[text()]]");

  // Validate values at claim detail Policy Information
  public async validateValueClaimDetailPolicyInformation(expectedValue: string, nameOfFiled: string) {
    try {
      let temp = By.xpath("//div");
      switch (nameOfFiled) {
        case "Reference": {
          temp = this.lblDtReferencePolicyInformation;
          break;
        }
        case "Status": {
          temp = this.lblDtStatusPolicyInformation;
          break;
        }
        case "Term": {
          temp = this.lblDtTermPolicyInformation;
          break;
        }
        case "Premium": {
          temp = this.lblDtPremiumPolicyInformation;
          break;
        }
        case "Product": {
          temp = this.lblDtProductPolicyInformation;
          break;
        }
        case "Covers": {
          temp = this.lblDtCoverPolicyInformation;
          break;
        }
        case "Documents": {
          temp = this.lblDtDocumentPolicyInformation;
          break;
        }
        default:
          logWarningMessage(`Field with name "${nameOfFiled}" is NOT found!`);
          return false;
      }
      await this.driverService.waitUntilElementLoaded(temp);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const actualValue = await this.driverService.getText(temp);
      if(nameOfFiled.localeCompare("Documents") === 0 || nameOfFiled.localeCompare("Covers") === 0){
        if(actualValue.includes(expectedValue)){
          return true;
        }else{
          logWarningMessage(`Incorrect Documents: "${expectedValue}" does NOT contains in "${actualValue}"!`);
        }
      }
      return await this.driverService.validateRecord(`Validate field "${nameOfFiled}"`,
        [actualValue, expectedValue, `Incorrect "${nameOfFiled}"!`]
      );
    } catch (error) {
      console.log("validateValueClaimDetailPolicyInformation");
      console.log(error);
      return false;
    }
  }

  // Get values at claim detail Policy Information
  public async getValueClaimDetailPolicyInformation(nameOfFiled: string) {
    try {
      let temp = By.xpath("//div");
      switch (nameOfFiled) {
        case "Reference": {
          temp = this.lblDtReferencePolicyInformation;
          break;
        }
        case "Status": {
          temp = this.lblDtStatusPolicyInformation;
          break;
        }
        case "Term": {
          temp = this.lblDtTermPolicyInformation;
          break;
        }
        case "Premium": {
          temp = this.lblDtPremiumPolicyInformation;
          break;
        }
        case "Product": {
          temp = this.lblDtProductPolicyInformation;
          break;
        }
        case "Covers": {
          temp = this.lblDtCoverPolicyInformation;
          break;
        }
        case "Documents": {
          temp = this.lblDtDocumentPolicyInformation;
          break;
        }
        default:
          logWarningMessage(`Field with name "${nameOfFiled}" is NOT found!`);
          return "";
      }
      return await this.driverService.getText(temp);
    } catch (error) {
      console.log("getValueClaimDetailPolicyInformation");
      console.log(error);
      return "";
    }
  }

  // Click Reference id at Policy Information Claim detail
  public async pressReferenceIdClaimDetailPolicyInformation() {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblDtReferencePolicyInformation);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.click(this.lblDtReferencePolicyInformation);
      return true;
    } catch (error) {
      console.log('pressReferenceIdClaimDetailPolicyInformation');
      console.log(error);
      return false;
    }
  }
}