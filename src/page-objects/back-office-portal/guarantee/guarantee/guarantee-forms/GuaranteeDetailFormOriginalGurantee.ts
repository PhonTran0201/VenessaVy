// Extends GuaranteeDetailFormLatestInformation

import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";
import { AmendmentFormPreview } from "../amendment-forms/AmendmentFormPreview";



export class GuaranteeDetailFormOriginalGuarantee extends AmendmentFormPreview {
    constructor(driverService: SeleniumWebDriverService) {
        super(driverService);
    }

    //#region Xpaths

    //#region 1. First columns

    // info create
    protected lblCreatedBy = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./label[text()='Created by']]//p");
    protected lblGuaranteeNo = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./label[text()='Guarantee no']]//b");
    // Issued date
    protected lblIssuedDate = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./label[text()='Issued date']]//b");

    // Debtor
    protected lblDebtorName = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./label[text()='Debtor']]//b");
    protected lblDebtorOrgNr = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./label[text()='Debtor']]//i");
    protected lblDebtorAddress = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./label[text()='Debtor']]//span[contains(@title,'debtor address')]//i");
    protected lblDebtorPostcode = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./label[text()='Debtor']]//span[contains(@title,'debtor zip code')]//i");
    protected lblDebtorCity = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./label[text()='Debtor']]//span[contains(@title,'debtor city')]//i");

    // Beneficiary
    protected lblBeneficiaryName = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./label[text()='Beneficiary']]//b");

    protected lblBeneficiaryDOB = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./label[text()='Beneficiary']]//i[contains(text(),'DOB')]");
    protected lblBeneficiaryOrgNr = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./label[text()='Beneficiary']]//i[contains(text(),'Org')]");

    protected lblBeneficiaryAddress = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./label[text()='Beneficiary']]//span[contains(@title,'address')]/i");
    protected lblBeneficiaryPostcode = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./label[text()='Beneficiary']]//span[contains(@title,'zip code')]/i");
    protected lblBeneficiaryCity = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./label[text()='Beneficiary']]//span[contains(@title,'city')]/i");

    // Beneficiary 2 
    protected lblBeneficiary2Name = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./label[text()='Beneficiary 2']]//b");

    protected lblBeneficiary2DOB = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./label[text()='Beneficiary 2']]//i[contains(text(),'DOB')]");
    protected lblBeneficiary2OrgNr = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./label[text()='Beneficiary 2']]//i[contains(text(),'Org')]");

    protected lblBeneficiary2Address = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./label[text()='Beneficiary 2']]//span[contains(@title,'address')]/i");
    protected lblBeneficiary2Postcode = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./label[text()='Beneficiary 2']]//span[contains(@title,'zip code')]/i");
    protected lblBeneficiary2City = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./label[text()='Beneficiary 2']]//span[contains(@title,'city')]/i");


    // Guarantor
    protected lblGuarantorName = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./label[text()='Guarantor']]//b");

    protected lblGuarantorAddress = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./label[text()='Guarantor']]//span[contains(@title,'address')]/i");
    protected lblGuarantorPostcode = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./label[text()='Guarantor']]//span[contains(@title,'zip code')]/i");
    protected lblGuarantorCity = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./label[text()='Guarantor']]//span[contains(@title,'city')]/i");

    protected lblGuarantorFirmNo = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./label[text()='Guarantor']]//i[contains(text(),'Firm number')]");

    // Guarantee Inssuer
    protected lblGuaranteeIssuer = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./label[text()='Guarantee issuer']]//b");

    // Underlying Contract
    protected lblUnderlyingContractReference = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./label[text()='Underlying contract']]//b");

    protected lblUnderlyingContractCommitment = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./label[text()='Underlying contract']]//*[contains(@title,'commitment')]/i");

    protected lblUnderlyingContractGardsnummer = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./label[text()='Underlying contract']]//*[contains(@title,'farm number')]/i");
    protected lblUnderlyingContractBruksnummer = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./label[text()='Underlying contract']]//*[contains(@title,'use number')]/i");
    protected lblUnderlyingContractKommune = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./label[text()='Underlying contract']]//*[contains(@title,'district')]/i");

    protected lblUnderlyingContractTotalAmount = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./label[text()='Underlying contract']]//*[contains(@title,'Total contract sum')]/i");
    protected lblUnderlyingDistrict = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./label[text()='Underlying contract']]//*[contains(@title,'Contract district name tag')]/i");
    protected lblUnderlyingContractStartDate = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./label[text()='Underlying contract']]//*[contains(@title,'Contract start tag')]/i");
  

    // Third Party
    protected lblThirdPartyName = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./label[text()='Third party']]//b");

    protected lblThirdPartyAddress = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./label[text()='Third party']]//*[contains(@title,'address')]/i");
    protected lblThirdPartyPostcode = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./label[text()='Third party']]//*[contains(@title,'zip code')]/i");
    protected lblThirdPartyCity = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./label[text()='Third party']]//*[contains(@title,'city')]/i");

    protected lblThirdPartyPhone = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./label[text()='Third party']]//p/i");
    //#endregion


    // //#region 2. Second column (Timeline)
    protected lblPeriod = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'timeline')]//span[@title='Period']");
    protected lblGuaranteeAmount = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'timeline')]//*[@title='Guarantee amount']");

    protected lblTotalGuaranteeFee = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./b[text()='Total guarantee fee']]//b[2]");
    protected lblTotalCommission = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./b[text()='Total commission']]//b[2]");
    protected lblEstablishmentFee = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./b[text()='Establishment fee']]//b[2]")
    //#endregion
    //#endregion 

    protected lblAdditionalGuaranteeFee = By.xpath("//*[contains(local-name(),'form')]//div[./b[text()='Additional guarantee fee']]//b[2]//span");
    protected lblAdditionalCommission = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./b[text()='Additional commission']]//b[2]//span");
    protected lblAmendmentFee = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[./b[text()='Amendment fee']]//b[2]//span");

    protected lblGuaranteeAmountPhase1 = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'timeline')]//li[1]//span[@title='Guarantee amount']");
    protected lblGuaranteeAmountPhase2 = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'timeline')]//li[2]//span[@title='Guarantee amount']");
    protected lblPeriodPhase1 = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'timeline')]//li[1]//*[@title='Period']");
    protected lblPeriodPhase2 = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'timeline')]//li[2]//*[@title='Period']");
    protected lblGuaranteeFeePhase1 = By.xpath("//*[contains(local-name(),'form')]//div[@id = 'previewOriginalGuaranteeRenderHere']//div[@if='!IsAmend']/div[1]//li[1]//span[2]");
    protected lblGuaranteeFeePhase2 = By.xpath("//*[contains(local-name(),'form')]//div[@id = 'previewOriginalGuaranteeRenderHere']//div[@if='!IsAmend']/div[1]//li[2]//span[2]");
    protected lblCommissionPhase1 = By.xpath("//*[contains(local-name(),'form')]//div[@id = 'previewOriginalGuaranteeRenderHere']//div[@if='!IsAmend']/div[2]//li[1]//span[2]");
    protected lblCommissionPhase2 = By.xpath("//*[contains(local-name(),'form')]//div[@id = 'previewOriginalGuaranteeRenderHere']//div[@if='!IsAmend']/div[2]//li[2]//span[2]");

    public async navigiateToOriginalGuaranteeTabInGuaranteeForm() {
        try {
            let lblValue = By.xpath(`//app-guarantee-form//ul[@role='tablist']//a[text()='Original guarantee']`);
            await this.driverService.waitUntilElementLoaded(lblValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.click(lblValue);
            return true;
        } catch (error) {
            console.log("navigiateToOriginalGuaranteeTabInGuaranteeForm");
            console.log(error);
            return false;
        }
    }

    public async checkTabExistOnGuaranteeDetailForm(tabName: string) {
        try {
            let lblTabName = By.xpath(`//app-guarantee-form//ul[@role='tablist']//a[text()='${tabName}']`);
            await this.driverService.waitUntilElementLoaded(lblTabName);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            if (await this.driverService.isExisted(lblTabName)) {
                return true;
            }
            else return false;
        } catch (error) {
            console.log("checkTabExistOnGuaranteeDetailForm");
            console.log(error);
            return false;
        }
    }



}

