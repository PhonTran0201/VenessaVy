import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../../../core/selenium-webdriver.service";
import { FrameAgreementFormInterface } from "../../../../../../../interfaces/guarantee/frame-agreement/FrameAgreementFormInterface";
import { selectDropdownOption, waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../../../shared/functions";

export class AccountTabFrameAgreementForm implements FrameAgreementFormInterface {
  constructor(protected driverService: SeleniumWebDriverService) { }

  //#region Elemments for Creating frame agreement
  protected txtName = By.xpath("//app-customer-frame-agreement-form//div[./label[text()=' Name ']]//input");
  protected dtpStartDate = By.xpath("//app-customer-frame-agreement-form//div[./label[text()=' Start date ']]//input");
  protected dtpEndDate = By.xpath("//app-customer-frame-agreement-form//div[./label[text()=' End date ']]//input");
  protected txtTotalLimitExposure = By.xpath("//app-customer-frame-agreement-form//div[./label[text()=' Total limit exposure ']]//input");
  protected txtSecurity = By.xpath("//app-customer-frame-agreement-form//div[./label[text()=' Security ']]//textarea");
  protected cmbProduct = By.xpath("//app-customer-frame-agreement-form//div[./label[text()=' Product name ']]//input");
  //#endregion

  //#region Element for checking frame agreement details
  protected txtFrameAgreementNumber = By.xpath("//app-customer-frame-agreement-form//div[./label[text()=' Frame agreement number ']]//input");
  protected txtUsed = By.xpath("//app-customer-frame-agreement-form//div[./label[text()=' Used ']]//input");
  protected txtRemainingCapacity = By.xpath("//app-customer-frame-agreement-form//div[./label[text()=' Remaining capacity ']]//input");
  protected txtCurrency = By.xpath("//app-customer-frame-agreement-form//div[./label[text()=' Currency ']]//input");
  //#endregion


  //#region Elements for Product list on Frame Agreement Detail form
  private btnEditOnProductList = By.xpath("//app-customer-frame-agreement-product-field//div//table//tr[1]//td[1]//button[1]");

  private lblProductNameOnProductList = By.xpath("//app-customer-frame-agreement-product-field//div//table//tr[1]//td[2]/span");
  private lblPremiumRateOnProductList = By.xpath("//app-customer-frame-agreement-product-field//app-gua-frame-product-parameter-act-cell//span[contains(text(),'Premium Rate')]");
  private lblCommissionRate = By.xpath("//app-customer-frame-agreement-product-field//app-gua-frame-product-parameter-act-cell//span[contains(text(),'Commission Rate')]");
  private lblPaymentMethod = By.xpath("//app-customer-frame-agreement-product-field//app-gua-frame-product-parameter-act-cell//span[contains(text(),'Payment method')]");
  private lblGuaranteeRate = By.xpath("//app-customer-frame-agreement-product-field//app-gua-frame-product-parameter-act-cell//span[contains(text(),'Guarantee Rate')]");
  private lblEstablishmentFee = By.xpath("//app-customer-frame-agreement-product-field//app-gua-frame-product-parameter-act-cell//span[contains(text(),'Establishment Fee')]");
  private lblAmendmentFee = By.xpath("//app-customer-frame-agreement-product-field//app-gua-frame-product-parameter-act-cell//span[contains(text(),'Amendment Fee')]");
  private lblFirstPhaseGuaranteeRate = By.xpath("//app-customer-frame-agreement-product-field//app-gua-frame-product-parameter-act-cell//span[contains(text(),'First Phase Guarantee Rate')]");
  private lblSecondPhaseGuaranteeRate = By.xpath("//app-customer-frame-agreement-product-field//app-gua-frame-product-parameter-act-cell//span[contains(text(),'Second Phase Guarantee Rate')]");
  //#endregion

  // Elements for Tabs on FA form
  private tabDocuments = By.xpath("//app-customer-frame-agreement-form//a[text()='Documents']");

  //#region Input data on Frame Agreement form
  public async inputNameOnFrameAgreementForm(Name: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.setText(this.txtName, Name);
      return true;
    } catch (error) {
      console.log('inputNameOnFrameAgreementForm');
      console.log(error);
      return false;
    }
  }

  public async inputTotalLimitExposureOnFrameAgreementForm(TotalLimitExposure: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtTotalLimitExposure);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtTotalLimitExposure, TotalLimitExposure);
      return true;
    } catch (error) {
      console.log('inputTotalLimitExposureOnFrameAgreementForm');
      console.log(error);
      return false;
    }
  }

  public async inputSecurityOnFrameAgreementForm(Security: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtSecurity);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtSecurity, Security);
      return true;
    } catch (error) {
      console.log('inputSecurityOnFrameAgreementForm');
      console.log(error);
      return false;
    }
  }

  public async inputStartDateOnFrameAgreementForm(StartDate: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.dtpStartDate);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.dtpStartDate, StartDate);
      return true;
    } catch (error) {
      console.log('inputStartDateOnFrameAgreementForm');
      console.log(error);
      return false;
    }
  }

  public async inputEndDateOnFrameAgreementForm(EndDate: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.dtpEndDate);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.dtpEndDate, EndDate);
      return true;
    } catch (error) {
      console.log('inputEndDateOnFrameAgreementForm');
      console.log(error);
      return false;
    }
  }

  public async inputProductOnFrameAgreementForm(Product: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbProduct);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.cmbProduct, Product);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await selectDropdownOption(Product, "", this.driverService);

      return true;
    } catch (error) {
      console.log('inputProductOnFrameAgreementForm');
      console.log(error);
      return false;
    }
  }
  //#endregion

  //#region Validate values Details tab on FA form without Product list
  public async validateFrameAgreementNumber_FrameAgreementForm_DetailsTab(expectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtFrameAgreementNumber);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      const acctualValue = await this.driverService.getAttributeValue(this.txtFrameAgreementNumber, 'value');
      return await this.driverService.validateRecord("Validate FrameAgreementNumber",
        [acctualValue, expectedValue, "Incorrect FrameAgreementNumber"]
      );
    } catch (error) {
      console.log('validateFrameAgreementNumber_FrameAgreementForm_DetailsTab');
      console.log(error);
      return false;
    }
  }
  public async validateName_FrameAgreementForm_DetailsTab(expectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtFrameAgreementNumber);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const acctualValue = await this.driverService.getAttributeValue(this.txtName, 'value');
      return await this.driverService.validateRecord("Validate Name",
        [acctualValue, expectedValue, "Incorrect Name"]
      );
    } catch (error) {
      console.log('validateName_FrameAgreementForm_DetailsTab');
      console.log(error);
      return false;
    }
  }
  public async validateStartDate_FrameAgreementForm_DetailsTab(expectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtFrameAgreementNumber);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const acctualValue = await this.driverService.getAttributeValue(this.dtpStartDate, 'value');
      return await this.driverService.validateRecord("Validate StartDate",
        [acctualValue, expectedValue, "Incorrect StartDate"]
      );
    } catch (error) {
      console.log('validateStartDate_FrameAgreementForm_DetailsTab');
      console.log(error);
      return false;
    }
  }
  public async validateEndDate_FrameAgreementForm_DetailsTab(expectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtFrameAgreementNumber);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const acctualValue = await this.driverService.getAttributeValue(this.dtpEndDate, 'value');
      return await this.driverService.validateRecord("Validate EndDate",
        [acctualValue.trim(), expectedValue.trim(), "Incorrect EndDate"]
      );
    } catch (error) {
      console.log('validateEndDate_FrameAgreementForm_DetailsTab');
      console.log(error);
      return false;
    }
  }
  public async validateUsed_FrameAgreementForm_DetailsTab(expectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtFrameAgreementNumber);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const acctualValue = await this.driverService.getAttributeValue(this.txtUsed, 'value');
      return await this.driverService.validateRecord("Validate Used",
        [acctualValue.trim(), expectedValue.trim(), "Incorrect Used"]
      );
    } catch (error) {
      console.log('validateUsed_FrameAgreementForm_DetailsTab');
      console.log(error);
      return false;
    }
  }
  public async validateRemainingCapacity_FrameAgreementForm_DetailsTab(expectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtFrameAgreementNumber);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const acctualValue = await this.driverService.getAttributeValue(this.txtRemainingCapacity, 'value');
      return await this.driverService.validateRecord("Validate RemainingCapacity",
        [acctualValue.trim(), expectedValue.trim(), "Incorrect RemainingCapacity"]
      );
    } catch (error) {
      console.log('validateRemainingCapacity_FrameAgreementForm_DetailsTab');
      console.log(error);
      return false;
    }
  }
  public async validateTotalLimitExposure_FrameAgreementForm_DetailsTab(expectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtFrameAgreementNumber);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const acctualValue = await this.driverService.getAttributeValue(this.txtTotalLimitExposure, 'value');
      return await this.driverService.validateRecord("Validate TotalLimitExposure",
        [acctualValue.trim(), expectedValue.trim(), "Incorrect TotalLimitExposure"]
      );
    } catch (error) {
      console.log('validateTotalLimitExposure_FrameAgreementForm_DetailsTab');
      console.log(error);
      return false;
    }
  }
  public async validateCurrency_FrameAgreementForm_DetailsTab(expectedValue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtFrameAgreementNumber);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const acctualValue = await this.driverService.getAttributeValue(this.txtCurrency, 'value');
      return await this.driverService.validateRecord("Validate Currency",
        [acctualValue.trim(), expectedValue.trim(), "Incorrect Currency"]
      );
    } catch (error) {
      console.log('validateCurrency_FrameAgreementForm_DetailsTab');
      console.log(error);
      return false;
    }
  }
  //#endregion

  //#region Methods at Product list on FA form at tab Details
  public async getPositionRowByProductName_ProductList_FrameAgreementForm_DetailsTab(productName: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtFrameAgreementNumber);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);

      // Để màn hình scroll xuống product list
      await this.driverService.pressTab(this.btnEditOnProductList);
      for (let i = 1; i < 10; i++) {
        const lblProductNameOnProductList = By.xpath(`//app-customer-frame-agreement-form//app-customer-frame-agreement-product-field//tbody//tr[${i}]//td[2]//*[contains(text(),'${productName}')]`);
        if (await this.driverService.isExisted(lblProductNameOnProductList)) {
          return i;
        }
      }
      return -1;
    } catch (error) {
      console.log('getPositionRowByProductName_ProductList_FrameAgreementForm_DetailsTab');
      console.log(error);
      return -1;
    }
  }
  public async pressEditButton_ProductList_FrameAgreementForm_DetailsTab_ByPositionRow(positionRow = 1) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtFrameAgreementNumber);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const btnEditOnProductList = By.xpath(`//app-customer-frame-agreement-product-field//div//table//tr[${positionRow}]//button[.//*[contains(@class,'fa-edit')]]`);
      await this.driverService.click(btnEditOnProductList);
      return true;
    } catch (error) {
      console.log('pressEditButton_ProductList_FrameAgreementForm_DetailsTab_ByPositionRow');
      console.log(error);
      return false;
    }
  }

  //#region Validate values Products list on FA form at tab Details
  public async validateProductName_ProductList_FrameAgreementForm_DetailsTab(expectedValue: string, positionRow = 1) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtFrameAgreementNumber);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const lblActualValue = By.xpath(`//app-customer-frame-agreement-form//app-customer-frame-agreement-product-field//tbody//tr[${positionRow}]//td[2]//*[text()]`);
      const acctualValue = await this.driverService.getText(lblActualValue);
      return await this.driverService.validateRecord("Validate ProductName",
        [acctualValue.trim(), expectedValue.trim(), "Incorrect ProductName"]
      );
    } catch (error) {
      console.log('validateProductName_ProductList_FrameAgreementForm_DetailsTab');
      console.log(error);
      return false;
    }
  }

  /**
   * 
   * @param parameterName One of these items: Premium Rate, Commistion Rate, Payment method,...
   * @param expectedValue Value of the parameter
   * @param positionRow position of product that you want to validate valude
   * @returns 
   */
  public async validateParameter_ProductList_FrameAgreementForm_DetailsTab(parameterName: string, expectedValue: string, positionRow = 1) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtFrameAgreementNumber);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const lblActualValue = By.xpath(`//app-customer-frame-agreement-form//app-customer-frame-agreement-product-field//tbody//tr[${positionRow}]//td[3]//*[contains(text(),'${parameterName}')]`);
      const acctualValue = await this.driverService.getText(lblActualValue);
      const expectedValueTemp = parameterName + " : " + expectedValue;
      return await this.driverService.validateRecord(`Validate ${parameterName}`,
        [acctualValue.trim(), expectedValueTemp.trim(), `Incorrect ${parameterName}`]
      );
    } catch (error) {
      console.log('validateParameter_ProductList_FrameAgreementForm_DetailsTab');
      console.log(error);
      return false;
    }
  }

  /**
   * 
   * @param expectedValue Value of the all parameters
   * @param positionRow position of product that you want to validate valude
   * @returns 
   */
   public async validateCombineParameters_ProductList_FrameAgreementForm_DetailsTab(expectedValue: string, positionRow = 1) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtFrameAgreementNumber);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const lblActualValue = By.xpath(`//app-agreement-form//tbody//tr[${positionRow}]//app-gua-frame-product-parameter-act-cell`);
      const acctualValue = await this.driverService.getText(lblActualValue);
      return await this.driverService.validateRecord(`Validate All parameters`,
        [acctualValue.trim().replace(/\./g,",").toLocaleLowerCase(), expectedValue.trim().toString().replace(/ :/g, ":").replace(/\./g,",").toLocaleLowerCase(), `Incorrect parameters`]
      );
    } catch (error) {
      console.log('validateCombineParameters_ProductList_FrameAgreementForm_DetailsTab');
      console.log(error);
      return false;
    }
  }
  //#endregion
  //#endregion

  //#region Method on Ducument tab
  public async navigateToDocumentsTab() {
    try {
      await this.driverService.waitUntilElementLoaded(this.tabDocuments);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.click(this.tabDocuments);
      return true;
    } catch (error) {
      console.log("navigateToDocumentsTab");
      console.log(error);
      return false;
    }
  }

  public async openDocumentListByVersion(version: string) {
    try {
      let versionLocator = By.xpath(`//app-customer-frame-agreement-document-tab//h5[text()='${version}']`);
      await this.driverService.waitUntilElementLoaded(versionLocator);
      await this.driverService.click(versionLocator);
      return true;
    } catch (error) {
      console.log("openDocumentListByVersion");
      console.log(error);
      return false;
    }
  }

  public async assertFrameAgreementDocument(Name: string, CreatedDate: string, status: string = "N/A") {
    let actualName: string = "";
    let actualCreatedDate: string = "";
    let actualStatus: string = "";

    try {
      // await this.driverService.waitForSeconds(3000);
      const lblName = By.xpath("//app-customer-frame-agreement-document-tab//tbody//td[2]//span");
      const lblCreatedDate = By.xpath("//app-customer-frame-agreement-document-tab//tbody//td[3]//span");
      const lblStatus = By.xpath("//app-customer-frame-agreement-document-tab//tbody//td[4]//span");
      await this.driverService.waitUntilElementLoaded(By.xpath("//app-customer-frame-agreement-document-tab//tbody"));
      actualName = await this.driverService.getText(lblName);
      actualCreatedDate = await this.driverService.getText(lblCreatedDate);

      //Maximize delay time is 3 minutes.
      if (actualCreatedDate.localeCompare(CreatedDate) !== 0) {
        if (Number(actualCreatedDate.substring(14, 16)) - Number(CreatedDate.substring(14, 16)) < 3) {
          CreatedDate = actualCreatedDate;
        }
      }

      if (actualName.toLowerCase().includes(Name.toLowerCase())) {
        Name = actualName;
      }
      if (await this.driverService.isExisted(lblStatus)) {
        actualStatus = await this.driverService.getText(lblStatus);
      } else actualStatus = status;

      return await this.driverService.validateRecord(
        "The document is created successfully",
        [actualName, Name, "Assert at Name: Incorrect Name"],
        [actualCreatedDate, CreatedDate, "Assert at Created Date: Incorrect Created Date"],
        [actualStatus, status, "Assert at Status document: Incorrect document status"]
      );
    } catch (error) {
      console.log("assertFrameAgreementDocumentt");
      console.log(error);
      return false;
    }
  }

  public async openMoreDropdownButtonOnDocumentList() {
    try {
      let DocumentMore = By.xpath("//app-document-application-action-cell//button[@id='document-more']");
      await this.driverService.waitUntilElementLoaded(DocumentMore);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.click(DocumentMore);
      return true;
    } catch (error) {
      console.log("openMoreDropdownButtonOnDocumentList");
      console.log(error);
      return false;
    }
  }
  public async selectTheOptionOnMoreDropdown(option: string) {
    try {
      let optionXpath = By.xpath(`//div[@class='dropdown-menu show']//button[contains(text(),'${option}')]`);
      await this.driverService.waitUntilElementLoaded(optionXpath);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.click(optionXpath);
      await waitUntilHorizontalProgressBarLoaded(this.driverService);
      await waitUntilHorizontalProgressBarLoaded(this.driverService);
      return true
    }
    catch (error) {
      console.log("selectTheOptionOnMoreDropdown");
      console.log(error);
      return false;
    }
  }

  //#endregion

  //#region Methods get values on Detail tab Product list
  public async getProductNameOnProductListByRow(positionRow = 1) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtFrameAgreementNumber);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const lblProductNameOnProductList = By.xpath(`//app-customer-frame-agreement-product-field//div//table//tr[${positionRow}]//td[2]/span`);
      return await this.driverService.getText(lblProductNameOnProductList);
    } catch (error) {
      console.log('getProductNameOnProductListByRow');
      console.log(error);
      return "";
    }
  }

  public async getParametersOnProductListByRow(positionRow = 1) {// Get all paramters of the product
    try {
      await this.driverService.waitUntilElementLoaded(this.txtFrameAgreementNumber);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const lblProductParametersOnProductList = By.xpath(`//app-customer-frame-agreement-product-field//div//table//tr[${positionRow}]//app-gua-frame-product-parameter-act-cell//div[@class='guarantee-parameters']`);
      return await this.driverService.getText(lblProductParametersOnProductList);
    } catch (error) {
      console.log('getParametersOnProductListByRow');
      console.log(error);
      return "";
    }
  }
  //#endregion
}
