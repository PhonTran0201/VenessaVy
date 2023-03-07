import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { ApplicationFormContractAndGuaranteeInterface } from "../../../../../interfaces/guarantee/application/application-forms/ApplicationFormContractAndGuaranteeInterface";
import { logFailMessage, logInfoMessage, logSuccessMessage, logWarningMessage, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";
import { numberToCurrency } from "../../../../../shared/tenant-setting/tenant-setting";


const remote = require("selenium-webdriver/remote");

export class ApplicationFormContractAndGuarantee implements ApplicationFormContractAndGuaranteeInterface {
  constructor(protected driverService: SeleniumWebDriverService) { }

  //#region Xpaths on CONTRACT AND GUARANTEE when input
  // 1. Underlying contract section
  protected txtTotalContractAmountUnderlying = By.xpath("//*[contains(local-name(),'form')]//input[@name='TotalContractSumTag']");
  protected txtContractReferenceUnderlying = By.xpath("//*[contains(local-name(),'form')]//input[@name='ContractNumberTag']");
  protected dtpDateForSignedContractUnderlying = By.xpath("//*[contains(local-name(),'form')]//input[@name='ContractSignedDateTag']");
  protected dtpContractStartDateUnderlying = By.xpath("//*[contains(local-name(),'form')]//input[@name='ContractStartTag']");
  protected fileUnderlyingContractDocsUnderlying = By.xpath("//*[contains(local-name(),'form')]//input[@name='UnderlyingContract' and @type='file']");
  protected cmbGeneralProvisionsUnderlying = By.xpath("//*[contains(local-name(),'form')]//select[@name='GeneralProvisionsTag']");

  protected lblTotalContractAmountUnderlying = By.xpath("//*[contains(local-name(),'form')]//input[@name='TotalContractSumTag']//preceding-sibling::p");
  protected lblContractReferenceUnderlying = By.xpath("//*[contains(local-name(),'form')]//input[@name='ContractNumberTag']//preceding-sibling::p");
  protected lblDateForSignedContractUnderlying = By.xpath("//*[contains(local-name(),'form')]//input[@name='ContractSignedDateTag']//preceding-sibling::p");
  protected lblContractStartDateUnderlying = By.xpath("//*[contains(local-name(),'form')]//input[@name='ContractStartTag']//preceding-sibling::p");
  protected lblfileUnderlyingContractDocsUnderlying = By.xpath("//*[contains(local-name(),'form')]//input[@name='UnderlyingContract' and @type='file']//following-sibling::div//a");


  protected txtProjectUnderlying = By.xpath("//*[contains(local-name(),'form')]//input[@name='ProjectNumberTag']");
  protected txtProjectNameUnderlying = By.xpath("//*[contains(local-name(),'form')]//input[@name='ProjectNameTag']");
  protected txtProjectAddressUnderlying = By.xpath("//*[contains(local-name(),'form')]//input[@name='ProjectAddressTag']");
  protected txtProjectDescriptionUnderlying = By.xpath("//*[contains(local-name(),'form')]//input[@name='ProjectDescriptionTag']");
  protected txtProjectNumberUnderlying = By.xpath("//*[contains(local-name(),'form')]//input[@name='ProjectNumberTag']");
  protected txtContractCommitmentUnderlying = By.xpath("//*[contains(local-name(),'form')]//input[@name='ContractCommitmentTag']");
  protected txtGardsnummerUnderlying = By.xpath("//*[contains(local-name(),'form')]//input[@name='ContractFarmNumberTag']");
  protected txtBruksnummerUnderlying = By.xpath("//*[contains(local-name(),'form')]//input[@name='ContractUseNumberTag']");
  protected txtKommuneUnderlying = By.xpath("//*[contains(local-name(),'form')]//input[@name='ContractDistrictNameTag']");

  protected lblProjectUnderlying = By.xpath("//*[contains(local-name(),'form')]//input[@name='ProjectNumberTag']//preceding-sibling::p");
  protected lblProjectNameUnderlying = By.xpath("//*[contains(local-name(),'form')]//input[@name='ProjectNameTag']//preceding-sibling::p");
  protected lblProjectAddressUnderlying = By.xpath("//*[contains(local-name(),'form')]//input[@name='ProjectAddressTag']//preceding-sibling::p");
  protected lblProjectDescriptionUnderlying = By.xpath("//*[contains(local-name(),'form')]//input[@name='ProjectDescriptionTag']//preceding-sibling::p");
  protected lblProjectNumberUnderlying = By.xpath("//*[contains(local-name(),'form')]//input[@name='ProjectNumberTag']//preceding-sibling::p");
  protected lblContractCommitmentUnderlying = By.xpath("//*[contains(local-name(),'form')]//input[@name='ContractCommitmentTag']//preceding-sibling::p");
  protected lblGardsnummerUnderlying = By.xpath("//*[contains(local-name(),'form')]//input[@name='ContractFarmNumberTag']//preceding-sibling::p");
  protected lblBruksnummerUnderlying = By.xpath("//*[contains(local-name(),'form')]//input[@name='ContractUseNumberTag']//preceding-sibling::p");
  protected lblKommuneUnderlying = By.xpath("//*[contains(local-name(),'form')]//input[@name='ContractDistrictNameTag']//preceding-sibling::p");

  // 2. Guarantee section
  protected txtPhaseName1Guarantee = By.xpath("//*[contains(local-name(),'form')]//input[@name='FirstPhaseNameTag']");
  protected txtPeriodStartGuarantee = By.xpath("//*[contains(local-name(),'form')]//input[@name='FirstPhasePeriodStartTag']");
  protected txtPeriodEndGuarantee = By.xpath("//*[contains(local-name(),'form')]//input[@name='FirstPhasePeriodEndTag']");
  protected txtGuaranteeAmountGuarantee = By.xpath("//*[contains(local-name(),'form')]//input[@name='FirstPhaseGuaranteeAmountTag']");
  protected txtGuaranteeRateGuarantee = By.xpath("//*[contains(local-name(),'form')]//input[@name='FirstPhaseGuaranteeRateTag']");
  protected txtAmountInWordGuarantee = By.xpath("//*[contains(local-name(),'form')]//input[@name='GuaranteeAmountInWordTag']");
  protected txtCommentGuarantee = By.xpath("//*[contains(local-name(),'form')]//textarea[@name='FirstPhaseGuaranteeCommentTag']");

  protected lblPhaseName1Guarantee = By.xpath("//*[contains(local-name(),'form')]//input[@name='FirstPhaseNameTag']//preceding-sibling::p");
  protected lblPeriodStartGuarantee = By.xpath("//*[contains(local-name(),'form')]//input[@name='FirstPhasePeriodStartTag']//preceding-sibling::p");
  protected lblPeriodEndGuarantee = By.xpath("//*[contains(local-name(),'form')]//input[@name='FirstPhasePeriodEndTag']//preceding-sibling::p");
  protected lblGuaranteeAmountGuarantee = By.xpath("//*[contains(local-name(),'form')]//input[@name='FirstPhaseGuaranteeAmountTag']//preceding-sibling::p");
  protected lblGuaranteeRateGuarantee = By.xpath("//*[contains(local-name(),'form')]//input[@name='FirstPhaseGuaranteeRateTag']//preceding-sibling::p");

  //Two phase
  protected txtPhaseName2Guarantee = By.xpath("//*[contains(local-name(),'form')]//input[@name='SecondPhaseNameTag']");
  protected txtPeriodStartGuaranteePhase2 = By.xpath("//*[contains(local-name(),'form')]//input[@name='SecondPhasePeriodStartTag']");
  protected txtPeriodEndGuaranteePhase2 = By.xpath("//*[contains(local-name(),'form')]//input[@name='SecondPhasePeriodEndTag']");
  protected txtGuaranteeAmountGuaranteePhase2 = By.xpath("//*[contains(local-name(),'form')]//input[@name='SecondPhaseGuaranteeAmountTag']");
  protected txtGuaranteeRateGuaranteePhase2 = By.xpath("//*[contains(local-name(),'form')]//input[@name='SecondPhaseGuaranteeRateTag']");
  protected txtCommentGuaranteePhase2 = By.xpath("//*[contains(local-name(),'form')]//textarea[@name='SecondPhaseGuaranteeCommentTag']");

  protected lblPhaseName2Guarantee = By.xpath("//*[contains(local-name(),'form')]//input[@name='SecondPhaseNameTag']//preceding-sibling::p");
  protected lblPeriodStartGuaranteePhase2 = By.xpath("//*[contains(local-name(),'form')]//input[@name='SecondPhasePeriodStartTag']//preceding-sibling::p");
  protected lblPeriodEndGuaranteePhase2 = By.xpath("//*[contains(local-name(),'form')]//input[@name='SecondPhasePeriodEndTag']//preceding-sibling::p");
  protected lblGuaranteeAmountGuaranteePhase2 = By.xpath("//*[contains(local-name(),'form')]//input[@name='SecondPhaseGuaranteeAmountTag']//preceding-sibling::p");
  protected lblGuaranteeRateGuaranteePhase2 = By.xpath("//*[contains(local-name(),'form')]//input[@name='SecondPhaseGuaranteeRateTag']//preceding-sibling::p");

  //Project information (specific for HOGSE product BRF Insats garanti)
  protected txtNumberOfUnitsProjectInformation = By.xpath("//*[contains(local-name(),'form')]//input[@name='NumberOfUnitsTag']");
  protected dtpDateForCostEstimateProjectInformation = By.xpath("//*[contains(local-name(),'form')]//input[@name='DateForCostEstimateTag']");
  protected btnAddProjectInformation = By.xpath("//*[contains(local-name(),'form')]//a[contains(@class,'add') and text()='Add']");

  // Product Skattetrekksgaranti
  protected cbxRenewGuaranteeGuarantee = By.xpath("//*[contains(local-name(),'form')]//input[@name ='IsRenewGuaranteeTag']");
  protected cbxRenewGuaranteeGuaranteeTick = By.xpath("//*[contains(local-name(),'form')]//input[@name ='IsRenewGuaranteeTag']//following-sibling::span");
  //#endregion
  protected cbxConfirmInformation = By.xpath(`//*[contains(local-name(),'form')]//input[@name='ConfirmInformation']//following-sibling::span`);

  //#region Methods Input values
  // 1. Underlying contract section
  public async inputTotalContractAmountUnderlying(TotalContractAmount: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtTotalContractAmountUnderlying);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtTotalContractAmountUnderlying, TotalContractAmount);
      return true;
    } catch (error) {
      console.log("inputTotalContractAmountUnderlying");
      console.log(error);
      return false;
    }
  }

  public async inputContractReferenceUnderlying(ContractReference: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtContractReferenceUnderlying);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtContractReferenceUnderlying, ContractReference);
      return true;
    } catch (error) {
      console.log("inputContractReferenceUnderlying");
      console.log(error);
      return false;
    }
  }
  public async inputDateForSignedContractUnderlying(DateForSignedContract: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.dtpDateForSignedContractUnderlying);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.dtpDateForSignedContractUnderlying, DateForSignedContract);
      return true;
    } catch (error) {
      console.log("inputDateForSignedContractUnderlying");
      console.log(error);
      return false;
    }
  }
  public async inputContractStartDateUnderlying(ContractStartDateMinusToday: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.dtpContractStartDateUnderlying);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.dtpContractStartDateUnderlying, ContractStartDateMinusToday);
      await this.driverService.pressTabCurrentElement();
      return true;
    } catch (error) {
      console.log("inputContractStartDateUnderlying");
      console.log(error);
      return false;
    }
  }

  /**
   * 
   * @param UnderlyingContractDoc Just input one file at a time.
   * @returns 
   */
  public async inputUnderlyingContractDocUnderlying(UnderlyingContractDoc: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.fileUnderlyingContractDocsUnderlying);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      // await this.driverService.pressTabCurrentElement();
      if (__dirname.includes("jenkins") && !__dirname.includes(".jenkins")) {
        logInfoMessage("\tSet File Detector on Jenkins...");
        await this.driverService.getDriver().setFileDetector(new remote.FileDetector());
        logInfoMessage("File dir: " + __dirname);
      }
      await (await this.driverService.findElement(this.fileUnderlyingContractDocsUnderlying)).sendKeys(UnderlyingContractDoc);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      return true;
    } catch (error) {
      console.log("inputUnderlyingContractDocUnderlying");
      console.log(error);
      return false;
    }
  }

  public async inputGeneralProvisionsUnderlying(GeneralProvisions: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbGeneralProvisionsUnderlying);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.click(this.cmbGeneralProvisionsUnderlying);
      const options = By.xpath(`//*[contains(local-name(),'form')]//select[@name='GeneralProvisionsTag']/option`);
      const len = await (await this.driverService.findElements(options)).length;
      for (let i = 1; i <= len; i++) {
        const option = By.xpath(`//*[contains(local-name(),'form')]//select[@name='GeneralProvisionsTag']/option[${i}]`);
        const actualGeneralProvision = await this.driverService.getText(option);
        if (actualGeneralProvision.toLocaleLowerCase().localeCompare(GeneralProvisions.toLocaleLowerCase()) === 0) {
          await this.driverService.pressEnterCurrentElement();
          return true;
        }
        else {
          await this.driverService.pressDownCurrentElement();
        }
      }
      await this.driverService.pressEnterCurrentElement();
      logWarningMessage(`Not found any General Provisions with name "${GeneralProvisions}"`);
      return false;
    } catch (error) {
      console.log("inputGeneralProvisionsUnderlying");
      console.log(error);
      return false;
    }
  }

  public async inputProjectUnderlying(Project: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtProjectUnderlying);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtProjectUnderlying, Project);
      return true;
    } catch (error) {
      console.log("inputProjectUnderlying");
      console.log(error);
      return false;
    }
  }

  public async inputProjectNameUnderlying(ProjectName: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtProjectNameUnderlying);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtProjectNameUnderlying, ProjectName);
      return true;
    } catch (error) {
      console.log("inputProjectNameUnderlying");
      console.log(error);
      return false;
    }
  }

  public async inputProjectAddressUnderlying(ProjectAddress: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtProjectAddressUnderlying);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtProjectAddressUnderlying, ProjectAddress);
      return true;
    } catch (error) {
      console.log("inputProjectAddressUnderlying");
      console.log(error);
      return false;
    }
  }

  public async inputProjectDescriptionUnderlying(ProjectDescription: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtProjectDescriptionUnderlying);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtProjectDescriptionUnderlying, ProjectDescription);
      return true;
    } catch (error) {
      console.log("inputProjectDescriptionUnderlying");
      console.log(error);
      return false;
    }
  }

  public async inputProjectNumberUnderlying(ProjectNumber: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtProjectNumberUnderlying);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtProjectNumberUnderlying, ProjectNumber);
      return true;
    } catch (error) {
      console.log("inputProjectNumberUnderlying");
      console.log(error);
      return false;
    }
  }

  public async inputContractCommitmentUnderlying(ContractCommitment: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtContractCommitmentUnderlying);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtContractCommitmentUnderlying, ContractCommitment);
      return true;
    } catch (error) {
      console.log("inputContractCommitmentUnderlying");
      console.log(error);
      return false;
    }
  }

  public async inputGardsnummerUnderlying(Gardsnummer: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtGardsnummerUnderlying);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtGardsnummerUnderlying, Gardsnummer);
      return true;
    } catch (error) {
      console.log("inputGardsnummerUnderlying");
      console.log(error);
      return false;
    }
  }

  public async inputBruksnummerUnderlying(Bruksnummer: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtBruksnummerUnderlying);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtBruksnummerUnderlying, Bruksnummer);
      return true;
    } catch (error) {
      console.log("inputBruksnummerUnderlying");
      console.log(error);
      return false;
    }
  }

  public async inputKommuneUnderlying(Kommune: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtKommuneUnderlying);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtKommuneUnderlying, Kommune);
      return true;
    } catch (error) {
      console.log("inputKommuneUnderlying");
      console.log(error);
      return false;
    }
  }
  public async checkboxConfirmInformationUnderlying() {
    try {
      await this.driverService.waitUntilElementLoaded(this.cbxConfirmInformation);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.click(this.cbxConfirmInformation);
      return true;
    } catch (error) {
      console.log("checkboxConfirmInformationUnderlying");
      console.log(error);
      return false;
    }
  }

  // 2. Guarantee section
  public async inputPhaseName1Guarantee(PhaseName1: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtPhaseName1Guarantee);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtPhaseName1Guarantee, PhaseName1);
      return true;
    } catch (error) {
      console.log("inputPhaseName1Guarantee");
      console.log(error);
      return false;
    }
  }

  public async inputPeriodStartGuarantee(PeriodStart: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtPeriodStartGuarantee);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtPeriodStartGuarantee, PeriodStart);
      return true;
    } catch (error) {
      console.log("inputPeriodStartGuarantee");
      console.log(error);
      return false;
    }
  }



  public async inputPeriodEndGuarantee(PeriodEnd: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtPeriodEndGuarantee);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtPeriodEndGuarantee, PeriodEnd);
      return true;
    } catch (error) {
      console.log("inputPeriodEndGuarantee");
      console.log(error);
      return false;
    }
  }

  public async inputGuaranteeAmountGuarantee(GuaranteeAmount: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtGuaranteeAmountGuarantee);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtGuaranteeAmountGuarantee, GuaranteeAmount);
      await this.driverService.pressEnter(this.txtGuaranteeAmountGuarantee);
      return true;
    } catch (error) {
      console.log("inputGuaranteeAmountGuarantee");
      console.log(error);
      return false;
    }
  }

  public async inputGuaranteeRateGuarantee(GuaranteeRate: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtGuaranteeRateGuarantee);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtGuaranteeRateGuarantee, GuaranteeRate);
      return true;
    } catch (error) {
      console.log("inputGuaranteeRateGuarantee");
      console.log(error);
      return false;
    }
  }

  public async inputAmountInWordGuarantee(AmountInWord: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtAmountInWordGuarantee);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtAmountInWordGuarantee, AmountInWord);
      return true;
    } catch (error) {
      console.log("inputAmountInWordGuarantee");
      console.log(error);
      return false;
    }
  }

  public async inputCommentGuarantee(Comment: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtCommentGuarantee);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtCommentGuarantee, Comment);
      return true;
    } catch (error) {
      console.log("inputCommentGuarantee");
      console.log(error);
      return false;
    }
  }

  //Phase 2
  public async inputPhaseName2Guarantee(PhaseName2: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtPhaseName2Guarantee);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtPhaseName2Guarantee, PhaseName2);
      return true;
    } catch (error) {
      console.log("inputPhaseName2Guarantee");
      console.log(error);
      return false;
    }
  }

  public async inputPeriodStartGuaranteePhase2(PeriodStartPhase2: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtPeriodStartGuaranteePhase2);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      if (await this.driverService.canBeSetText(this.txtPeriodStartGuaranteePhase2)) {
        await this.driverService.setText(this.txtPeriodStartGuaranteePhase2, PeriodStartPhase2);
      }
      return true;
    } catch (error) {
      console.log("inputPeriodStartGuaranteePhase2");
      console.log(error);
      return false;
    }
  }



  public async inputPeriodEndGuaranteePhase2(PeriodEndPhase2: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtPeriodEndGuaranteePhase2);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtPeriodEndGuaranteePhase2, PeriodEndPhase2);
      return true;
    } catch (error) {
      console.log("inputPeriodEndGuaranteePhase2");
      console.log(error);
      return false;
    }
  }

  public async inputGuaranteeAmountGuaranteePhase2(GuaranteeAmountPhase2: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtGuaranteeAmountGuaranteePhase2);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtGuaranteeAmountGuaranteePhase2, GuaranteeAmountPhase2);
      await this.driverService.pressEnter(this.txtGuaranteeAmountGuaranteePhase2);
      return true;
    } catch (error) {
      console.log("inputGuaranteeAmountGuaranteePhase2");
      console.log(error);
      return false;
    }
  }

  public async inputGuaranteeRateGuaranteePhase2(GuaranteeRatePhase2: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtGuaranteeRateGuaranteePhase2);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtGuaranteeRateGuaranteePhase2, GuaranteeRatePhase2);
      return true;
    } catch (error) {
      console.log("inputGuaranteeRateGuaranteePhase2");
      console.log(error);
      return false;
    }
  }

  public async inputCommentGuaranteePhase2(CommentPhase2: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtCommentGuaranteePhase2);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtCommentGuaranteePhase2, CommentPhase2);
      return true;
    } catch (error) {
      console.log("inputCommentGuaranteePhase2");
      console.log(error);
      return false;

    }
  }
  // Product 
  public async checkRenewGuaranteeGuarantee() {
    try {
      await this.driverService.waitUntilElementLoaded(this.cbxRenewGuaranteeGuaranteeTick);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.click(this.cbxRenewGuaranteeGuaranteeTick);
      return true;
    } catch (error) {
      console.log('checkRenewGuaranteeGuarantee');
      console.log(error);
      return false;
    }
  }

  public async isRenewGuaranteeChecked() {
    try {
      logInfoMessage("Validating default renew guarantee checkbox...");
      await this.driverService.waitUntilElementLoaded(this.cbxRenewGuaranteeGuarantee);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      return await this.driverService.getAttributeValue(this.cbxRenewGuaranteeGuarantee, "checked") === "true";
    } catch (error) {
      console.log('isRenewGuaranteeChecked');
      console.log(error);
      return false;
    }
  }
  //#endregion

  //#region 3. Project information
  public async inputNumberOfUnitsProjectInformation(NumberOfUnits: string): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtNumberOfUnitsProjectInformation);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtNumberOfUnitsProjectInformation, NumberOfUnits);
      return true;
    } catch (error) {
      console.log('inputNumberOfUnitsProjectInformation');
      console.log(error);
      return false;
    }
  }
  public async inputDateForCostEstimateProjectInformation(DateForCostEstimate: string): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(this.dtpDateForCostEstimateProjectInformation);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.dtpDateForCostEstimateProjectInformation, DateForCostEstimate);
      return true;
    } catch (error) {
      console.log('inputDateForCostEstimateProjectInformation');
      console.log(error);
      return false;
    }
  }

  public async inputStreetNameProjectInformation(StreetName: string, PositionRow: number) {
    try {
      const txtStreetName = By.xpath(`//*[contains(local-name(),'form')]//input[@name='StreetNameOrHouseNumberTag[${PositionRow - 1}][StreetNameTag]']`);
      await this.driverService.waitUntilElementLoaded(txtStreetName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.setText(txtStreetName, StreetName);
      return true;
    } catch (error) {
      console.log('inputStreetNameProjectInformation');
      console.log(error);
      return false;
    }
  }

  public async inputHouseNumberProjectInformation(HouseNumber: string, PositionRow: number) {
    try {
      const txtHouseNumber = By.xpath(`//*[contains(local-name(),'form')]//input[@name='StreetNameOrHouseNumberTag[${PositionRow - 1}][HouseNumberTag]']`);
      await this.driverService.waitUntilElementLoaded(txtHouseNumber);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.setText(txtHouseNumber, HouseNumber);
      return true;
    } catch (error) {
      console.log('inputHouseNumberProjectInformation');
      console.log(error);
      return false;
    }
  }

  public async pressAddButtonProjectInformation(): Promise<boolean> {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnAddProjectInformation);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.click(this.btnAddProjectInformation);
      return true;
    } catch (error) {
      console.log('pressAddButtonProjectInformation');
      console.log(error);
      return false;
    }
  }

  //#endregion
  public async validateTotalContractAmountMultipleGuarantee(amount: number) {
    try {
      let expectedValue = numberToCurrency(amount);
      await this.driverService.waitUntilElementLoaded(this.txtTotalContractAmountUnderlying);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let actualValue = await this.driverService.getAttributeValue(this.txtTotalContractAmountUnderlying, "value");
      return await this.driverService.validateRecord(`Validate field Total Contract Amount`, [actualValue, expectedValue, `Incorrect Total Contract Amount!`]);
    } catch (error) {
      console.log("validateTotalContractAmountMultipleGuarantee");
      console.log(error);
      return false;
    }

  }

  public async validateGuaranteeAmountPhase1MultipleGuarantee(amount: number) {
    try {
      let expectedValue = numberToCurrency(amount);
      let element = await this.driverService.findElement(this.txtGuaranteeAmountGuarantee);
      await this.driverService.scrollElementToView(element);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let actualValue = await this.driverService.getAttributeValue(this.txtGuaranteeAmountGuarantee, "value");
      return await this.driverService.validateRecord(`Validate field Guarantee Amount 1 phase`, [actualValue, expectedValue, `Incorrect Guarantee Amount 1 phase!`]);
    } catch (error) {
      console.log("validateGuaranteeAmountPhase1MultipleGuarantee");
      console.log(error);
      return false;
    }

  }
  public async validateGuaranteeAmountPhase2MultipleGuarantee(amount: number) {
    try {
      let expectedValue = numberToCurrency(amount);
      let element = await this.driverService.findElement(this.txtGuaranteeAmountGuaranteePhase2);
      await this.driverService.scrollElementToView(element);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let actualValue = await this.driverService.getAttributeValue(this.txtGuaranteeAmountGuaranteePhase2, "value");
      return await this.driverService.validateRecord(`Validate field Guarantee Amount phase 2`, [actualValue, expectedValue, `Incorrect Guarantee Amount phase 2!`]);
    } catch (error) {
      console.log("validateGuaranteeAmountPhase2MultipleGuarantee");
      console.log(error);
      return false;
    }

  }

  public async verifyRequiredFieldOnFormPhase2(sectionName: string, tagName: string) {
    try {
      let lblRequirement = By.xpath(`//h4[text()='${sectionName}']//following::div//div[.//input[@name='${tagName}']]/following-sibling::div[contains(text(), 'This field is required')]`);
      await this.driverService.waitUntilElementLoaded(lblRequirement);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      if (await this.driverService.isExisted(lblRequirement)) {
        logSuccessMessage(`Verify ${tagName} required tag name : Test passed!`);
        return true;
      }
      else {
        logFailMessage(`Verify ${tagName} required tag name : Not found!`);
        return false;
      }
    } catch (error) {
      console.log('verifyRequiredFieldOnFormPhase2');
      console.log(error);
      return false;
    }
  }

  public async verifyDisabledFieldOnFormPhase2(sectionName: string, tagName: string) {
    try {
      let lblRequirement = By.xpath(`//h4[text()='${sectionName}']/following::div//input[@name = '${tagName}' and @disabled ]`);
      await this.driverService.waitUntilElementLoaded(lblRequirement);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      if (await this.driverService.isExisted(lblRequirement)) {
        logSuccessMessage(`Verify ${tagName} disabled field : Test passed!`);
        return true;
      }
      else {
        logFailMessage(`Verify ${tagName} disabled field : Not found!`);
        return false;
      }
    } catch (error) {
      console.log('verifyDisabledFieldOnFormPhase2');
      console.log(error);
      return false;
    }
  }

  //#region validate value

  public async validateTotalContractAmountUnderlying(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtTotalContractAmountUnderlying);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getAttributeValue(this.lblTotalContractAmountUnderlying, "title");
      return await this.driverService.validateRecord(
        `Validate field TotalContractAmountUnderlying`,
        [ActualValue, ExpectedValue, `Incorrect TotalContractAmountUnderlying!`]
      );
    } catch (error) {
      console.log("validateTotalContractAmountUnderlying");
      console.log(error);
      return false;
    }
  }
  public async validateContractReferenceUnderlying(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtContractReferenceUnderlying);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getAttributeValue(this.lblContractReferenceUnderlying, "title");
      return await this.driverService.validateRecord(
        `Validate field ContractReferenceUnderlying`,
        [ActualValue, ExpectedValue, `Incorrect ContractReferenceUnderlying!`]
      );
    } catch (error) {
      console.log("validateContractReferenceUnderlying");
      console.log(error);
      return false;
    }
  }
  public async validateContractStartDateUnderlying(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.dtpContractStartDateUnderlying);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getAttributeValue(this.dtpContractStartDateUnderlying, "value");
      return await this.driverService.validateRecord(
        `Validate field ContractStartDateUnderlying`,
        [ActualValue, ExpectedValue, `Incorrect ContractStartDateUnderlying!`]
      );
    } catch (error) {
      console.log("validateContractStartDateUnderlying");
      console.log(error);
      return false;
    }
  }

  public async validateDateForSignedContractUnderlying(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblDateForSignedContractUnderlying);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getAttributeValue(this.lblDateForSignedContractUnderlying, "title");
      return await this.driverService.validateRecord(
        `Validate field DateForSignedContractUnderlying`,
        [ActualValue, ExpectedValue, `Incorrect DateForSignedContractUnderlying!`]
      );
    } catch (error) {
      console.log("validateDateForSignedContractUnderlying");
      console.log(error);
      return false;
    }
  }
  public async validateContractDocsUnderlying(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblfileUnderlyingContractDocsUnderlying);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getText(this.lblfileUnderlyingContractDocsUnderlying);
      if (ExpectedValue.includes(ActualValue)) {
        ExpectedValue = ActualValue
      }
      return await this.driverService.validateRecord(
        `Validate field ContractDocsUnderlying`,
        [ActualValue, ExpectedValue, `Incorrect ContractDocsUnderlying!`]
      );
    } catch (error) {
      console.log("validateContractDocsUnderlying");
      console.log(error);
      return false;
    }
  }

  public async validateProjectUnderlying(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblProjectUnderlying);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getAttributeValue(this.lblProjectUnderlying, "title");
      return await this.driverService.validateRecord(
        `Validate field ProjectUnderlying`,
        [ActualValue, ExpectedValue, `Incorrect ProjectUnderlying!`]
      );
    } catch (error) {
      console.log("validateProjectUnderlying");
      console.log(error);
      return false;
    }
  }

  public async validateProjectNameUnderlying(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblProjectNameUnderlying);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getAttributeValue(this.lblProjectNameUnderlying, "title");
      return await this.driverService.validateRecord(
        `Validate field ProjectNameUnderlying`,
        [ActualValue, ExpectedValue, `Incorrect ProjectNameUnderlying!`]
      );
    } catch (error) {
      console.log("validateProjectNameUnderlying");
      console.log(error);
      return false;
    }
  }

  public async validateProjectNumberUnderlying(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblProjectNumberUnderlying);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getAttributeValue(this.lblProjectNumberUnderlying, "title");
      return await this.driverService.validateRecord(
        `Validate field ProjectNumberUnderlying`,
        [ActualValue, ExpectedValue, `Incorrect ProjectNumberUnderlying!`]
      );
    } catch (error) {
      console.log("validateProjectNumberUnderlying");
      console.log(error);
      return false;
    }
  }

  public async validateProjectAddressUnderlying(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblProjectAddressUnderlying);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getAttributeValue(this.lblProjectAddressUnderlying, "title");
      return await this.driverService.validateRecord(
        `Validate field ProjectAddressUnderlying`,
        [ActualValue, ExpectedValue, `Incorrect ProjectAddressUnderlying!`]
      );
    } catch (error) {
      console.log("validateProjectAddressUnderlying");
      console.log(error);
      return false;
    }
  }

  public async validateProjectDescriptionUnderlying(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblProjectDescriptionUnderlying);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getAttributeValue(this.lblProjectDescriptionUnderlying, "title");
      return await this.driverService.validateRecord(
        `Validate field ProjectDescriptionUnderlying`,
        [ActualValue, ExpectedValue, `Incorrect ProjectDescriptionUnderlying!`]
      );
    } catch (error) {
      console.log("validateProjectDescriptionUnderlying");
      console.log(error);
      return false;
    }
  }

  public async validateContractCommitmentUnderlying(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblContractCommitmentUnderlying);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getAttributeValue(this.lblContractCommitmentUnderlying, "title");
      return await this.driverService.validateRecord(
        `Validate field ContractCommitmentUnderlying`,
        [ActualValue, ExpectedValue, `Incorrect ContractCommitmentUnderlying!`]
      );
    } catch (error) {
      console.log("validateContractCommitmentUnderlying");
      console.log(error);
      return false;
    }
  }
  public async validateGardsnummerUnderlying(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblGardsnummerUnderlying);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getAttributeValue(this.lblGardsnummerUnderlying, "title");
      return await this.driverService.validateRecord(
        `Validate field GardsnummerUnderlying`,
        [ActualValue, ExpectedValue, `Incorrect GardsnummerUnderlying!`]
      );
    } catch (error) {
      console.log("validateGardsnummerUnderlying");
      console.log(error);
      return false;
    }
  }
  public async validateBruksnummerUnderlying(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblBruksnummerUnderlying);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getAttributeValue(this.lblBruksnummerUnderlying, "title");
      return await this.driverService.validateRecord(
        `Validate field BruksnummerUnderlying`,
        [ActualValue, ExpectedValue, `Incorrect BruksnummerUnderlying!`]
      );
    } catch (error) {
      console.log("validateBruksnummerUnderlying");
      console.log(error);
      return false;
    }
  }
  public async validateKommuneUnderlying(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblKommuneUnderlying);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getAttributeValue(this.lblKommuneUnderlying, "title");
      return await this.driverService.validateRecord(
        `Validate field KommuneUnderlying`,
        [ActualValue, ExpectedValue, `Incorrect KommuneUnderlying!`]
      );
    } catch (error) {
      console.log("validateKommuneUnderlying");
      console.log(error);
      return false;
    }
  }
  public async validatePeriodStartGuarantee(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblPeriodStartGuarantee);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getAttributeValue(this.lblPeriodStartGuarantee, "title");
      return await this.driverService.validateRecord(
        `Validate field PeriodStartGuarantee`,
        [ActualValue, ExpectedValue, `Incorrect PeriodStartGuarantee!`]
      );
    } catch (error) {
      console.log("validatePeriodStartGuarantee");
      console.log(error);
      return false;
    }
  }
  public async validatePeriodEndGuarantee(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblPeriodEndGuarantee);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getAttributeValue(this.lblPeriodEndGuarantee, "title");
      return await this.driverService.validateRecord(
        `Validate field PeriodEndGuarantee`,
        [ActualValue, ExpectedValue, `Incorrect PeriodEndGuarantee!`]
      );
    } catch (error) {
      console.log("validatePeriodEndGuarantee");
      console.log(error);
      return false;
    }
  }

  public async validatePeriodStartGuaranteePhase2(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblPeriodStartGuaranteePhase2);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getAttributeValue(this.lblPeriodStartGuaranteePhase2, "title");
      return await this.driverService.validateRecord(
        `Validate field PeriodStartGuaranteePhase2`,
        [ActualValue, ExpectedValue, `Incorrect PeriodStartGuaranteePhase2!`]
      );
    } catch (error) {
      console.log("validatePeriodStartGuaranteePhase2");
      console.log(error);
      return false;
    }
  }
  public async validatePeriodEndGuaranteePhase2(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblPeriodEndGuaranteePhase2);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getAttributeValue(this.lblPeriodEndGuaranteePhase2, "title");
      return await this.driverService.validateRecord(
        `Validate field PeriodEndGuaranteePhase2`,
        [ActualValue, ExpectedValue, `Incorrect PeriodEndGuaranteePhase2!`]
      );
    } catch (error) {
      console.log("validatePeriodEndGuaranteePhase2");
      console.log(error);
      return false;
    }
  }
  public async validateGuaranteeAmountGuarantee(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblGuaranteeAmountGuarantee);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getAttributeValue(this.lblGuaranteeAmountGuarantee, "title");
      return await this.driverService.validateRecord(
        `Validate field GuaranteeAmountGuarantee`,
        [ActualValue, ExpectedValue, `Incorrect GuaranteeAmountGuarantee!`]
      );
    } catch (error) {
      console.log("validateGuaranteeAmountGuarantee");
      console.log(error);
      return false;
    }
  }
  public async validateGuaranteeAmountGuaranteePhase2(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblGuaranteeAmountGuaranteePhase2);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getAttributeValue(this.lblGuaranteeAmountGuaranteePhase2, "title");
      return await this.driverService.validateRecord(
        `Validate field GuaranteeAmountGuaranteePhase2`,
        [ActualValue, ExpectedValue, `Incorrect GuaranteeAmountGuaranteePhase2!`]
      );
    } catch (error) {
      console.log("validateGuaranteeAmountGuaranteePhase2");
      console.log(error);
      return false;
    }
  }
  public async validateGuaranteeRateGuarantee(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblGuaranteeRateGuarantee);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getAttributeValue(this.lblGuaranteeRateGuarantee, "title");
      return await this.driverService.validateRecord(
        `Validate field GuaranteeRateGuarantee`,
        [ActualValue, ExpectedValue, `Incorrect GuaranteeRateGuarantee!`]
      );
    } catch (error) {
      console.log("validateGuaranteeRateGuarantee");
      console.log(error);
      return false;
    }
  }
  public async validateGuaranteeRateGuaranteePhase2(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblGuaranteeRateGuaranteePhase2);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getAttributeValue(this.lblGuaranteeRateGuaranteePhase2, "title");
      return await this.driverService.validateRecord(
        `Validate field GuaranteeRateGuaranteePhase2`,
        [ActualValue, ExpectedValue, `Incorrect GuaranteeRateGuaranteePhase2!`]
      );
    } catch (error) {
      console.log("validateGuaranteeRateGuaranteePhase2");
      console.log(error);
      return false;
    }
  }
  public async validateCommentGuarantee(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtCommentGuarantee);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getAttributeValue(this.txtCommentGuarantee, "value");
      return await this.driverService.validateRecord(
        `Validate field CommentGuarantee`,
        [ActualValue, ExpectedValue, `Incorrect CommentGuarantee!`]
      );
    } catch (error) {
      console.log("validateCommentGuarantee");
      console.log(error);
      return false;
    }
  }
  public async validateCommentGuaranteePhase2(ExpectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtCommentGuaranteePhase2);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualValue = await this.driverService.getAttributeValue(this.txtCommentGuaranteePhase2, "value");
      return await this.driverService.validateRecord(
        `Validate field CommentGuaranteePhase2`,
        [ActualValue, ExpectedValue, `Incorrect CommentGuaranteePhase2!`]
      );
    } catch (error) {
      console.log("validateCommentGuaranteePhase2");
      console.log(error);
      return false;
    }
  }


  //#endregion

}
