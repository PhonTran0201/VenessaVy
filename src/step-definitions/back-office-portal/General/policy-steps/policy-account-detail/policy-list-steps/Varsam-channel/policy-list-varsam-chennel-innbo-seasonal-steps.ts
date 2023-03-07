import { Then } from "@cucumber/cucumber";
import { SeleniumWebDriverService } from "../../../../../../../core/selenium-webdriver.service";
import { GlobalPageObject } from "../../../../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { PolicyListInsurance } from "../../../../../../../page-objects/back-office-portal/insurance/policy/policy-list/PolicyListInsurance";
import { logFailTestcase, getCurrentDateTime, logInfoMessage } from "../../../../../../../shared/functions";
import { formatDateTime } from "../../../../../../../shared/tenant-setting/tenant-setting";
import { dataTestExecution } from "../../../../../../../shared/variables";
import { getValueDataOfDataTestExecution } from "../../../../../../../storage-data/functions/data-test-execution";

  const policyListInsurance = new PolicyListInsurance(SeleniumWebDriverService.getInstance());
  const globalPageObject = new GlobalPageObject(SeleniumWebDriverService.getInstance());

  
Then("User verifies info in the Policy list from dataTestExecution", async function () {
  /// Các biến lấy từ dataTestExecution
  /// "QuoteReference", "PolicyDescription" (Address khi tạo quote), "Product", "PolicyTerm", "PolicyPremium", "PolicySalesPerson"

  let temp = await globalPageObject.navigateToSubPolicies();
  logFailTestcase(temp, "Navigates to policy tab failed!");
  await globalPageObject.waitForProgressBarLoaded_v2();
  const Reference = getValueDataOfDataTestExecution("QuoteReference");
  const Description = getValueDataOfDataTestExecution("PolicyDescription");
  const Product = getValueDataOfDataTestExecution("Product");
  const Period = getValueDataOfDataTestExecution("PolicyTerm");
  const PolicyPremium = getValueDataOfDataTestExecution("PolicyPremium") || getValueDataOfDataTestExecution("QRFP_Premium1") ;
  const SalesPerson = getValueDataOfDataTestExecution("PolicySalesPerson");
  const DateModified = formatDateTime(getCurrentDateTime().substring(0, 10));

  if(Reference){
    temp = await policyListInsurance.validateValueReference(Reference);
    logFailTestcase(temp, `Incorrect Reference`);
  }
  

  if(Description){
    temp = await policyListInsurance.validateValueDescription(Description);
  logFailTestcase(temp, `Incorrect Description`);
  }
  

  if(Product){
    temp = await policyListInsurance.validateValueProduct(Product);
  logFailTestcase(temp, `Incorrect Product`);
  }
  

  if(Period){
    temp = await policyListInsurance.validateValuePeriod(Period);
    logFailTestcase(temp, `Incorrect Period`);
  }
 

  if(PolicyPremium){
    temp = await policyListInsurance.validateValuePolicyPremium(PolicyPremium);
    logFailTestcase(temp, `Incorrect PolicyPremium`);
  }
 

  if(SalesPerson){
    temp = await policyListInsurance.validateValueSalesPerson(SalesPerson);
  logFailTestcase(temp, `Incorrect SalesPerson`);
  }
  

  if(DateModified){
    temp = await policyListInsurance.validateValueDateModified(DateModified);
  logFailTestcase(temp, `Incorrect DateModified`);
  }
});