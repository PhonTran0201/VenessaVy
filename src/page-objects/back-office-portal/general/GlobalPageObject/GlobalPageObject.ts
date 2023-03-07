import { By, Locator, WebElement } from "selenium-webdriver";
import { BasePage } from "../../../../core/BasePage";
import { GlobalPageObjectInterface } from "../../../../interfaces/general/GlobalPageObject/GlobalPageObjectInterface";
import { clearAllFileInFolder, closeToastMessage, executeCommandLine, executeCommandLineWithOutput, expandNumberItemOfList, getCurrentDateTime, logFailMessage, logInfoMessage, logSuccessMessage, reloadTable, selectDropdownOption, waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../shared/functions";
import { DownloadFilePathGlobalVariable, locator_progressbarActive, resultColumn, toastError, toastSuccess } from "../../../../shared/variables";
export class GlobalPageObject extends BasePage implements GlobalPageObjectInterface {
  //constructor(protected driverService: SeleniumWebDriverService) { }

  //Xpaths of elements at Header
  protected dashboardBtnMenu = By.xpath("(//*[@id='navbarSupportedContent']//*[text()='Dashboard'])[1]");
  protected accountsBtnMenu = By.xpath("(//*[@id='navbarSupportedContent']//*[text()='Accounts'])[1]");
  protected saleAndDistributionBtnMenu = By.xpath("//*[@id='navbarSupportedContent']//li[not(@hidden)]//*[text()='Sales & Distribution']");
  protected communicationsBtnMenu = By.xpath("(//*[@id='navbarSupportedContent']//li[not(@hidden)]//*[text()='Communications'])[1]");
  protected workflowsBtnMenu = By.xpath("(//*[@id='navbarSupportedContent']//*[text()='Workflows'])[1]");
  protected insuranceBtnMenu = By.xpath("(//*[@id='navbarSupportedContent']//*[text()='Insurance'])[1]");
  protected reportsBtnMenu = By.xpath("(//*[@id='navbarSupportedContent']//*[text()='Reports'])[1]");
  protected claimsBtnMenu = By.xpath(`(//*[@id='navbarSupportedContent']//span[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"claims")])[1]`);

  protected entitiesBtnMenu = By.xpath("(//*[@id='navbarSupportedContent']//*[text()='Entities'])[1]");
  protected notificationBtnMenu = By.xpath("//app-header-notification-list//*[@title='Notification']");
  protected settingBtnMenu = By.xpath("(//app-header//i[contains(@class,'fa-cog')])[1]");
  protected txtGlobalSearch = By.xpath(`//app-global-search//input[contains(@id,"name")]`);
  protected userProfileBtnMenu = By.xpath("(//app-header//*[contains(@class,'user-profile')])[1]");

  //Xpaths of elements as options of Header
  protected accountsBtnOption = By.xpath("(//div[@class='dropdown']//span[text()='Accounts'])");
  protected leadsBtnOption = By.xpath("(//div[@class='dropdown']//span[text()='Leads'])");
  protected contactsBtnOption = By.xpath("(//div[@class='dropdown']//span[text()='Contacts'])");
  protected checklistBtnOption = By.xpath("(//div[@class='dropdown']//span[text()='Checklists'])");
  protected householdsBtnOption = By.xpath("(//div[@class='dropdown']//span[text()='Households'])");

  protected salesBtnOption = By.xpath("(//div[@class='dropdown']//span[text()='Sales'])");
  protected pipelineManagementBtnOption = By.xpath("(//div[@class='dropdown']//span[text()='Pipeline Management'])");

  protected mailBtnOption = By.xpath("(//div[@class='dropdown']//span[text()='Mail'])");
  protected callCenterBtnOption = By.xpath("(//div[@class='dropdown']//span[text()='Call Center'])");

  protected caseManagementBtnOption = By.xpath("(//div[@class='dropdown']//span[text()='Case Management'])");
  protected WorkflowSetupBtnOption = By.xpath("(//div[@class='dropdown']//span[text()='Workflow Setup'])");

  protected frameAgreementReportBtnOption = By.xpath(`//div[@class="dropdown"]//a[contains(@title,"agreement report")]`);
  protected instalmentReportBtnOption = By.xpath(`//div[@class="dropdown"]//a[contains(@title,"Instalment report")]`);

  protected productBuilderBtnOption = By.xpath("(//div[@class='dropdown']//span[text()='Product Builder'])");
  protected documentTemplatesBtnOption = By.xpath("(//div[@class='dropdown']//span[text()='Document Templates'])");
  protected quotesBtnOption = By.xpath("(//div[@class='dropdown']//span[text()='Quotes'])");
  protected motorRegistryBtnOption = By.xpath("(//div[@class='dropdown']//span[text()='Motor Registry'])");


  protected claimListBtnOption = By.xpath("(//div[@class='dropdown']//span[text()='Claim List'])");
  protected FNOLBtnOption = By.xpath("(//div[@class='dropdown']//span[text()='FNOL'])");
  protected pendingPaymentBtnOption = By.xpath("(//div[@class='dropdown']//span[text()='Pending Payments'])");
  protected guaranteeReportOption = By.xpath("//div[@class='dropdown']//a[@title='Guarantee report']");

  //xpaths of elements at Setting dropdown
  protected usersBtnOptionSetting = By.xpath("//div[contains(@class,'dropdown-menu') and contains(@class,'show')]//button//span[text()='Users']");
  protected rolesBtnOptionSetting = By.xpath("//div[contains(@class,'dropdown-menu') and contains(@class,'show')]//button//span[text()='Roles']");
  protected queueBtnOptionSetting = By.xpath("//div[contains(@class,'dropdown-menu') and contains(@class,'show')]//button//span[text()='Queue']");
  protected moduleConfigurationBtnOptionSetting = By.xpath("//div[contains(@class,'dropdown-menu') and contains(@class,'show')]//button//span[text()='Module Configuration']");
  protected entitiesBtnOptionSetting = By.xpath("//div[contains(@class,'dropdown-menu') and contains(@class,'show')]//button//span[text()='Entities']");
  protected auditLogsBtnOptionSetting = By.xpath("//div[contains(@class,'dropdown-menu') and contains(@class,'show')]//button//span[text()='Audit Logs']");
  protected motorRegistrySetting = By.xpath("//div[contains(@class,'dropdown-menu') and contains(@class,'show')]//button//span[text()='Motor Registry Settings']");

  //xpaths of elements at Module Configuration
  protected seamlessgrowBtn = By.xpath("//*[@id='seamless-grow}']");
  protected saleanddistributionSettingBtn = By.xpath("//div[contains(@class,'domain-detail-item') and .//h4[text()='Sales & Distribution']]//button[contains(text(),'Settings')]");
  protected seamlessflowBtn = By.xpath("//*[@id='seamless-flow}']");
  protected workflowSettingBtn = By.xpath("//div[contains(@class,'domain-detail-item')][2]//button[contains(text(),'Settings')]");

  //xpaths of elements at User profile
  protected myProfileBtnOptionUserProfile = By.xpath("//app-header//*[contains(@class,'user-profile') and contains(@class,'show')]//button[contains(text(),'My profile')]");
  protected logOutBtnOptionUserProfile = By.xpath("//app-header//*[contains(@class,'user-profile') and contains(@class,'show')]//button[contains(text(),'Log out')]");

  //xpath of elements at Roles page
  protected permissionsSettingsTab = By.xpath(`//app-role-page//li[@title="Permissions"]`);

  //xpaths of elements at detail entities
  protected summaryBtnTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//c-details-tab-layout//*[@id='pgs-acc-tab-Summary']");
  protected quotesBtnTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//c-details-tab-layout//*[@id='pgs-acc-tab-Quotes']");
  protected policiesBtnTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//c-details-tab-layout//*[@id='pgs-acc-tab-Policies']");
  protected claimsBtnTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//c-details-tab-layout//*[contains(@id,'pgs-acc-tab-Claim')]");
  protected documentsBtnTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//c-details-tab-layout//*[@id='pgs-acc-tab-Documents']");
  protected saleBtnTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//c-details-tab-layout//*[@id='pgs-acc-tab-Sale']");
  protected historyBtnTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//c-details-tab-layout//*[@id='pgs-acc-tab-History']");
  protected transactionsBtnTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//c-details-tab-layout//*[@id='pgs-acc-tab-Transactions']");
  protected casesBtnTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//c-details-tab-layout//*[@id='pgs-acc-tab-Cases']");
  protected notesBtnTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//c-details-tab-layout//*[@id='pgs-acc-tab-Notes']");
  protected smsBtnTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//c-details-tab-layout//*[@id='pgs-acc-tab-SMS']");
  protected contactsBtnTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//c-details-tab-layout//*[@id='pgs-acc-tab-Contacts']");
  protected entitiesBtnTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//c-details-tab-layout//*[@id='pgs-acc-tab-Entities']");
  protected scoringBtnTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//c-details-tab-layout//*[@id='pgs-acc-tab-Scoring']");
  protected relatedClaimsBtnTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//c-details-tab-layout//*[@title='Related Claims']");
  protected frameAgreementsBtnTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//c-details-tab-layout//*[@id='pgs-acc-tab-Frame agreements']");
  protected applicationBtnTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//c-details-tab-layout//*[@id='pgs-acc-tab-Applications']");
  protected guaranteeBtnTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//c-details-tab-layout//*[@id='pgs-acc-tab-Guarantees']");
  protected instalmentBtnTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//c-details-tab-layout//*[@id='pgs-acc-tab-Payment schedule']");
  protected emailsBtnTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//c-details-tab-layout//*[@id='pgs-acc-tab-Emails']");
  protected checklistBtnTab = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//*[@id='pgs-acc-tab-Checklists']`)

  protected titleTabEntityActive = By.xpath("//a[(@href) and @role='tab' and contains(@class,'active') and contains(@class,'tab-title')]");

  //Xpath of element on Search & Filter
  protected btnSearchSearchAndFilter = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'card-footer')]//*[text()='Search']");
  protected btnSaveSearchAndFilter = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'card-footer')]//*[text()='Save']");
  protected btnClearSearchAndFilter = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'card-footer')]//*[contains(text(),'Clear')]");
  protected btnCancelSearchAndFilter = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'card-footer')]//*[contains(text(),'Cancel')]");
  protected btnXSearchAndFilter = By.xpath(`//*[contains(local-name(),'form')]//button[contains(@class,"close")]`)

  //Xpath of element on Filter Name form
  protected txtFilterNameFilterNameForm = By.xpath("//app-c-filter-name-form//label[contains(text(),'Filter name')]/following-sibling::formly-input//input");
  protected rdbGlobalFilterFilterNameForm = By.xpath("//app-c-filter-name-form//label[contains(text(),'Global Filter')]");
  protected rdbprotectedFilterFilterNameForm = By.xpath("//app-c-filter-name-form//label[contains(text(),'protected Filter')]");

  //Xpath of element on form
  protected btnSaveForm = By.xpath("(//*[contains(local-name(),'form') or contains(local-name(),'relationship') or contains(local-name(),'risk-check') or contains(local-name(),'app')] //*[contains(text(),'Save')])[last()]");
  protected btnCancelForm = By.xpath("(//*[contains(local-name(),'form')]//div[contains(@class,'modal-footer')]//*[contains(text(),'Cancel')])[last()]");
  protected btnYesForm = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'modal-footer')]//*[contains(text(),'Yes')]");
  protected btnNoForm = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'modal-footer')]//*[contains(text(),'No')]");
  protected btnRegisterForm = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'modal-footer')]//*[contains(text(),'Register')]");
  protected btnRecalculateForm = By.xpath("//*[contains(local-name(),'form')]//div//button[contains(text(),'Recalculate')]");
  protected btnCreateForm = By.xpath("//*[contains(local-name(),'form')]//div//button[contains(text(),'Create') or @title='Create']");
  protected btnPreviewForm = By.xpath("//*[contains(local-name(),'form')]//div//button//span[contains(text(),'Preview')]");
  protected btnTerminateForm = By.xpath("//*[contains(local-name(),'form')]//div[contains(@class,'modal-footer')]//*[contains(text(),'Terminate')]");
  protected btnEditForm = By.xpath("//*[contains(local-name(),'form')]//div//button//span[contains(text(),'Edit')]");
  protected btnApproveForm = By.xpath("//*[contains(local-name(),'form')]//div//button//span[contains(text(),'Approve')]");
  protected btnApplicationForm = By.xpath("//*[contains(local-name(),'form')]//div//button//span[contains(text(),'Application')]");
  protected btnCreateApplicationForm = By.xpath("//*[contains(local-name(),'form')]//div//button//span[contains(text(),'Create application')]");
  protected btnAcceptForm = By.xpath("//*[contains(local-name(),'form')]//div//button//span[contains(text(),'Accept')]");
  protected btnAmendForm = By.xpath("//*[contains(local-name(),'form')]//div//button[contains(text(),'Amend') or .//*[text()='Amend']]");
  protected btnRejectForm = By.xpath("//*[contains(local-name(),'form')]//div//button//span[contains(text(),'Reject')]");
  protected btnSendForm = By.xpath("//*[contains(local-name(),'form')]//div//button//span[contains(text(),'Send')]");
  protected btnResendForm = By.xpath("//*[contains(local-name(),'form')]//div//button//span[contains(text(),'Resend')]");
  protected btnReturnForm = By.xpath("//*[contains(local-name(),'form')]//button[contains(text(),'Return') or ./span[text()='Return']]");
  protected btnNextStepForm = By.xpath("//*[contains(local-name(),'form')]//button[.//*[contains(text(),'Next step')] or contains(text(),'Next step')]");
  protected btnNextForm = By.xpath("//*[contains(local-name(),'app') or contains(local-name(),'form')]//button[contains(text(),'Next') or .//span[contains(text(),'Next')]]");
  protected btnSaveAndAcceptForm = By.xpath("//*[contains(local-name(),'form')]//button[.//*[contains(text(),'Save & Accept')]]");
  protected btnReplicateForm = By.xpath("//*[contains(local-name(),'form') or contains(local-name(),'app') ]//button[contains(text(),'Replicate')]");
  protected btnImportForm = By.xpath("//*[contains(local-name(),'app-sale-import')]//button[contains(text(),'Import')]");
  protected btnCloseClaimForm = By.xpath("//*[contains(local-name(),'app-claim-close-form')]//button[.//*[text()='Close claim']]");
  protected btnSelectForm = By.xpath("//*[contains(local-name(),'form')]//button[.//*[text()=' Select '] or contains(text(), 'Select')]");
  protected btnSubmitForm = By.xpath("//*[contains(local-name(),'form')]//button[.//*[text()=' Submit '] or contains(text(), 'Submit')]");
  protected btnSavingForm = By.xpath("//*[contains(local-name(),'form')]//button[contains(text(),'Saving') and ./i[contains(@class,'fa-spinner')]]");
  protected btnAddForm = By.xpath("//*[contains(local-name(),'form')]//button[.//*[text()='Add '] or contains(text(), 'Add')]");




  //Xpath of element on Active tab (both main tab and sub tab)
  protected btnSaveTab = By.xpath("(//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//*[contains(text(),'Save')] | (//div[contains(@class,'tab-pane') and contains(@class,'active')]//*[contains(text(),'Save')])[1])[last()]");
  protected btnResetTab = By.xpath("(//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//*[contains(text(),'Reset')] | (//div[contains(@class,'tab-pane') and contains(@class,'active')]//*[contains(text(),'Reset')])[1])[last()]");
  protected btnCreateTab = By.xpath("(//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[contains(text(),'Create')] | (//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[contains(text(),'Create')])[1])[last()]");
  protected btnHoldTab = By.xpath("(//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[contains(text(),'Hold')] | (//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[contains(text(),'Hold')])[1])[last()]");
  protected btnApproveTab = By.xpath("(//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[contains(text(),'Approve')] | (//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[contains(text(),'Approve')])[1])[last()]");
  protected btnRejectTab = By.xpath("(//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[contains(text(),'Reject')] | (//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[contains(text(),'Reject')])[1])[last()]");
  protected btnCompleteTab = By.xpath("(//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[contains(text(),'Reject')] | (//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[contains(text(),'Complete')])[1])[last()]");
  protected btnBackTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[contains(text(),'Back')]");
  protected btnSendSMSTab = By.xpath("(//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[contains(text(),'Send SMS')] | (//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[contains(text(),'Send SMS')])[1])[last()]");
  protected btnPublish = By.xpath("(//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[contains(text(),'Publish')] | (//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[contains(text(),'Publish')])[1])[last()]");
  protected btnActivate = By.xpath("(//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[contains(text(),'Activate')] | (//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[contains(text(),'Activate')])[1])[last()]");

  // Xpath of element on Active sub tab
  protected lblTotalNumberRecordSubTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(text(),'Total') and contains(text(),'records')]");


  // Xpath of element on Active main tab
  protected lblTotalNumberRecordMainTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(text(),'Total') and contains(text(),'records')]");

  // quan trọng
  // (//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[1]//td[4] | (//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[1]//td[4])[1])[last()]

  //#region /* 1. Begin -- Navigate to Main List */
  public async navigateToMainDashBoard() {
    try {
      await this.driverService.waitUntilElementLoaded(this.dashboardBtnMenu);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.dashboardBtnMenu);
      await this.driverService.waitUntilElementLoaded(By.xpath(`//app-dashboard//app-main`))
      return true;
    } catch (error) {
      console.log("navigateToMainDashBoard");
      console.log(error);
      return false;
    }
  }
  //#region Account tab
  public async navigateToMainAccountList() {
    try {
      await this.driverService.waitUntilElementLoaded(this.accountsBtnMenu);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.accountsBtnMenu);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.waitUntilElementLoaded(this.accountsBtnOption);
      await this.driverService.click(this.accountsBtnOption);
      return true;
    } catch (error) {
      console.log("navigateToMainAccountList");
      console.log(error);
      return false;
    }
  }

  public async navigateToMainLeadList() {
    try {
      await this.driverService.waitUntilElementLoaded(this.accountsBtnMenu);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.accountsBtnMenu);
      await this.driverService.waitUntilElementLoaded(this.leadsBtnOption);
      await this.driverService.click(this.leadsBtnOption);
      return true;
    } catch (error) {
      console.log("navigateToMainLeadList");
      console.log(error);
      return false;
    }
  }
  public async navigatetoMainSearchList() {
    try {
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.waitUntilElementLoaded(this.txtGlobalSearch);
      await this.driverService.setText(this.txtGlobalSearch, "");
      await this.driverService.pressEnterCurrentElement();
      return true;
    } catch (error) {
      console.log(`navigatetoMainSearchList`);
      console.log(error);
      return false;
    }
  }
  public async navigateToMainContactList() {
    try {
      await this.driverService.waitUntilElementLoaded(this.accountsBtnMenu);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.accountsBtnMenu);
      await this.driverService.waitUntilElementLoaded(this.contactsBtnOption);
      await this.driverService.click(this.contactsBtnOption);
      return true;
    } catch (error) {
      console.log("navigateToMainContactList");
      console.log(error);
      return false;
    }
  }

  public async navigateToMainCheckLists() {
    try {
      await this.driverService.waitUntilElementLoaded(this.accountsBtnMenu);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.accountsBtnMenu);
      await this.driverService.waitUntilElementLoaded(this.checklistBtnOption);
      await this.driverService.click(this.checklistBtnOption);
      return true;
    } catch (error) {
      console.log("navigateToMainCheckLists");
      console.log(error);
      return false;
    }
  }

  public async navigateToMainCommissionList() {
    try {
      await this.driverService.waitUntilElementLoaded(this.accountsBtnMenu);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.accountsBtnMenu);
      await this.driverService.waitUntilElementLoaded(this.checklistBtnOption);
      await this.driverService.click(this.checklistBtnOption);
      return true;
    } catch (error) {
      console.log("navigateToMainCommissionList");
      console.log(error);
      return false;
    }
  }
  public async navigateToMainHouseholdsList() {
    try {
      await this.driverService.waitUntilElementVisible(this.accountsBtnMenu);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.accountsBtnMenu);
      await this.driverService.waitUntilElementVisible(this.householdsBtnOption);
      await this.driverService.click(this.householdsBtnOption);
      return true;
    } catch (error) {
      console.log("navigateToMainHouseholdsList");
      console.log(error);
      return false;
    }
  }
  //#endregion

  public async navigateToMainFrameAgreementReportList() {
    try {
      await this.driverService.waitUntilElementLoaded(this.reportsBtnMenu);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.click(this.reportsBtnMenu);
      await this.driverService.waitUntilElementLoaded(this.frameAgreementReportBtnOption);
      await this.driverService.click(this.frameAgreementReportBtnOption);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.waitForSeconds(100);
      return true;
    } catch (error) {
      console.log(`navigateToMainFrameAgreementReportList`);
      console.log(error);
      return false;
    }
  }

  public async navigateToMainInstalmentReportList() {
    try {
      await this.driverService.waitUntilElementLoaded(this.reportsBtnMenu);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.click(this.reportsBtnMenu);
      await this.driverService.waitUntilElementLoaded(this.instalmentReportBtnOption);
      await this.driverService.click(this.instalmentReportBtnOption);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.waitForSeconds(100);
      return true;
    } catch (error) {
      console.log(`navigateToMainInstalmentReportList`);
      console.log(error);
      return false;
    }
  }

  protected btnSaleListViewEnabled = By.xpath("(//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[@id='pgs-slist-list-view-btn' and not(@disabled)])[last()]");
  protected btnSaleListViewDisabled = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[@id='pgs-slist-list-view-btn' and (@disabled)]");
  public async navigateToMainSaleList() {
    try {
      await this.driverService.waitUntilElementLoaded(this.saleAndDistributionBtnMenu);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      if (await this.driverService.isExisted(this.btnSaleListViewEnabled)) {
        await this.driverService.click(this.btnSaleListViewEnabled);
        await this.driverService.waitUntilElementLoaded(this.btnSaleListViewDisabled);
      }
      else {
        await this.driverService.waitUntilElementLoaded(this.saleAndDistributionBtnMenu);
        await this.driverService.click(this.saleAndDistributionBtnMenu);
        await this.driverService.waitUntilElementLoaded(this.salesBtnOption);
        await this.driverService.click(this.salesBtnOption);
      }
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      return true;
    } catch (error) {
      console.log("navigateToMainSaleList");
      console.log(error);
      return false;
    }
  }
  public async navigateToMainPipelineManagement() {
    try {
      await this.driverService.waitUntilElementLoaded(this.settingBtnMenu);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.settingBtnMenu);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.waitUntilElementLoaded(this.moduleConfigurationBtnOptionSetting);
      await this.driverService.click(this.moduleConfigurationBtnOptionSetting);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.waitUntilElementLoaded(this.seamlessgrowBtn);
      await this.driverService.click(this.seamlessgrowBtn);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.waitForElementEnabled(this.saleanddistributionSettingBtn);
      await this.driverService.click(this.saleanddistributionSettingBtn);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      return true;
    } catch (error) {
      console.log("navigateToMainPipelineManagement");
      console.log(error);
      return false;
    }
  }
  public async navigateToMainCaseManagementList() {
    try {
      await this.driverService.waitUntilElementLoaded(this.workflowsBtnMenu);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.workflowsBtnMenu);
      await this.driverService.waitUntilElementLoaded(this.caseManagementBtnOption);
      await this.driverService.click(this.caseManagementBtnOption);
      return true;
    } catch (error) {
      console.log("navigateToMainCaseManagementList");
      console.log(error);
      return false;
    }
  }
  public async navigateToMainWorkflowSetup() {
    try {
      await this.driverService.waitUntilElementLoaded(this.workflowsBtnMenu);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.workflowsBtnMenu);
      await this.driverService.waitUntilElementLoaded(this.WorkflowSetupBtnOption);
      await this.driverService.click(this.WorkflowSetupBtnOption);
      return true;
    } catch (error) {
      console.log("navigateToMainWorkflowSetup");
      console.log(error);
      return false;
    }
  }
  //Incase Workflow Setup move to Module Configuration -> Seamless Flow -> Workflow Setting
  /*public async navigateToMainWorkflowSetup() {
    try {
      await this.driverService.waitUntilElementLoaded(this.settingBtnMenu);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.settingBtnMenu);
      await this.driverService.waitUntilElementLoaded(this.moduleConfigurationBtnOptionSetting);
      await this.driverService.click(this.moduleConfigurationBtnOptionSetting);
      await this.driverService.waitUntilElementLoaded(this.seamlessflowBtn);
      await this.driverService.click(this.seamlessflowBtn);
      await this.driverService.waitForElementEnabled(this.workflowSettingBtn);
      await this.driverService.click(this.workflowSettingBtn);
      return true;
    } catch (error) {
      console.log("navigateToMainWorkflowSetup");
      console.log(error);
      return false;
    }
  }*/
  public async navigateToMainQuoteList() {
    try {
      await this.driverService.waitUntilElementLoaded(this.insuranceBtnMenu);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.insuranceBtnMenu);
      await this.driverService.waitUntilElementLoaded(this.quotesBtnOption);
      await this.driverService.click(this.quotesBtnOption);
      return true;
    } catch (error) {
      console.log("navigateToMainQuoteList");
      console.log(error);
      return false;
    }
  }
  public async navigateToMainClaimList() {
    try {
      await this.driverService.waitUntilElementVisible(this.claimsBtnMenu);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 200);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 200);
      await this.driverService.click(this.claimsBtnMenu);
      await this.driverService.waitUntilElementVisible(this.claimListBtnOption);
      await this.driverService.click(this.claimListBtnOption);
      return true;
    } catch (error) {
      console.log("navigateToMainClaimList");
      console.log(error);
      return false;
    }
  }
  public async navigateToMainFNOL() {
    try {
      await this.driverService.waitUntilElementLoaded(this.claimsBtnMenu);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.claimsBtnMenu);
      await this.driverService.waitUntilElementLoaded(this.FNOLBtnOption);
      await this.driverService.click(this.FNOLBtnOption);
      return true;
    } catch (error) {
      console.log("navigateToMainFNOL");
      console.log(error);
      return false;
    }
  }
  public async navigateToMainPendingPayment() {
    try {
      await this.driverService.waitUntilElementLoaded(this.claimsBtnMenu);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.claimsBtnMenu);
      await this.driverService.waitUntilElementLoaded(this.pendingPaymentBtnOption);
      await this.driverService.click(this.pendingPaymentBtnOption);
      return true;
    } catch (error) {
      console.log("navigateToMainPendingPayment");
      console.log(error);
      return false;
    }
  }
  public async navigateToMainUserList() {
    try {
      await this.driverService.waitUntilElementLoaded(this.settingBtnMenu);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.settingBtnMenu);
      await this.driverService.waitUntilElementLoaded(this.usersBtnOptionSetting);
      await this.driverService.click(this.usersBtnOptionSetting);
      return true;
    } catch (error) {
      console.log("navigateToMainUserList");
      console.log(error);
      return false;
    }
  }
  public async navigateToMainRoleList() {
    try {
      await this.driverService.waitUntilElementLoaded(this.settingBtnMenu);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.settingBtnMenu);
      await this.driverService.waitUntilElementLoaded(this.rolesBtnOptionSetting);
      await this.driverService.click(this.rolesBtnOptionSetting);
      return true;
    } catch (error) {
      console.log("navigateToMainRoleList");
      console.log(error);
      return false;
    }
  }

  public async navigateToMainQueueList() {
    try {
      let eleSetting = await this.getFieldType(this.settingBtnMenu);
      await eleSetting.click();
      let eleQueue = await this.getFieldType(this.queueBtnOptionSetting);
      await eleQueue.click();
      return true;
    } catch (error) {
      console.log("navigateToMainQueueList");
      console.log(error);
      return false;
    }
  }

  public async navigateToMainPermissions() {
    try {
      await this.driverService.waitUntilElementLoaded(this.settingBtnMenu);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.settingBtnMenu);
      await this.driverService.waitUntilElementLoaded(this.rolesBtnOptionSetting);
      await this.driverService.click(this.rolesBtnOptionSetting);
      await this.driverService.waitUntilElementLoaded(this.permissionsSettingsTab);
      await this.driverService.click(this.permissionsSettingsTab);
      return true;
    } catch (error) {
      console.log("navigateToMainPermissionsList");
      console.log(error);
      return false;
    }
  }
  public async navigateToMainModuleConfiguration() {
    try {
      await this.driverService.waitUntilElementLoaded(this.settingBtnMenu);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.settingBtnMenu);
      await this.driverService.waitUntilElementLoaded(this.moduleConfigurationBtnOptionSetting);
      await this.driverService.click(this.moduleConfigurationBtnOptionSetting);
      return true;
    } catch (error) {
      console.log("navigateToMainModuleConfiguration");
      console.log(error);
      return false;
    }
  }
  public async navigateToMainEntities() {
    try {
      await this.driverService.waitUntilElementLoaded(this.settingBtnMenu);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.settingBtnMenu);
      await this.driverService.waitUntilElementLoaded(this.entitiesBtnOptionSetting);
      await this.driverService.click(this.entitiesBtnOptionSetting);
      return true;
    } catch (error) {
      console.log("navigateToMainEntities");
      console.log(error);
      return false;
    }
  }
  public async navigateToMainAuditLog() {
    try {
      await this.driverService.waitUntilElementLoaded(this.settingBtnMenu);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.settingBtnMenu);
      await this.driverService.waitUntilElementLoaded(this.auditLogsBtnOptionSetting);
      await this.driverService.click(this.auditLogsBtnOptionSetting);
      return true;
    } catch (error) {
      console.log("navigateToMainAuditLog");
      console.log(error);
      return false;
    }
  }
  public async navigateToMainMotorRegistrySetting() {
    try {
      await this.driverService.waitUntilElementVisible(this.settingBtnMenu);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.settingBtnMenu);
      await this.driverService.waitUntilElementVisible(this.motorRegistrySetting);
      await this.driverService.click(this.motorRegistrySetting);
      return true;
    } catch (error) {
      console.log("navigateToMainMotorRegistrySetting");
      console.log(error);
      return false;
    }
  }
  public async navigateToMainLogOut() {
    try {
      await this.driverService.waitUntilElementLoaded(this.userProfileBtnMenu);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.userProfileBtnMenu);
      await this.driverService.waitUntilElementLoaded(this.logOutBtnOptionUserProfile);
      await this.driverService.click(this.logOutBtnOptionUserProfile);
      return true;
    } catch (error) {
      console.log("navigateToMainLogOut");
      console.log(error);
      return false;
    }
  }

  public async navigateToMainProductBuilder() {
    try {
      await this.driverService.waitUntilElementLoaded(this.insuranceBtnMenu);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.insuranceBtnMenu);
      await this.driverService.waitUntilElementLoaded(this.productBuilderBtnOption);
      await this.driverService.click(this.productBuilderBtnOption);
      return true;
    } catch (error) {
      console.log("navigateToMainProductBuilder");
      console.log(error);
      return false;
    }
  }

  public async navigateToMainMotorRegistry() {
    try {
      await this.driverService.waitUntilElementVisible(this.insuranceBtnMenu);
      await this.driverService.click(this.insuranceBtnMenu);
      await this.driverService.waitUntilElementVisible(this.motorRegistryBtnOption);
      await this.driverService.click(this.motorRegistryBtnOption);
      return true;
    } catch (error) {
      console.log("navigateToMainMotorRegistry");
      console.log(error);
      return false;
    }
  }
  //#endregion /* 1. End -- Navigate to Main List */

  //#region /*2. Begin -- Navigate to Sub tab*/
  public async navigateToSubSummary() {
    try {
      await this.driverService.waitUntilElementLoaded(this.summaryBtnTab);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.summaryBtnTab);
      return true;
    } catch (error) {
      console.log("navigateToSubSummary");
      console.log(error);
      return false;
    }
  }
  public async navigateToSubQuotes() {
    try {
      await this.driverService.waitUntilElementLoaded(this.quotesBtnTab);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.quotesBtnTab);
      return true;
    } catch (error) {
      console.log("navigateToSubQuotes");
      console.log(error);
      return false;
    }
  }
  public async navigateToSubPolicies() {
    try {
      await this.driverService.waitUntilElementLoaded(this.policiesBtnTab);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.policiesBtnTab);
      return true;
    } catch (error) {
      console.log("navigateToSubPolicies");
      console.log(error);
      return false;
    }
  }
  public async navigateToSubClaims() {
    try {
      await this.driverService.waitUntilElementLoaded(this.claimsBtnTab);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.claimsBtnTab);
      return true;
    } catch (error) {
      console.log("navigateToSubClaims");
      console.log(error);
      return false;
    }
  }
  public async navigateToSubDocuments() {
    try {
      await this.driverService.waitUntilElementLoaded(this.documentsBtnTab);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.documentsBtnTab);
      return true;
    } catch (error) {
      console.log("navigateToSubDocuments");
      console.log(error);
      return false;
    }
  }
  public async navigateToSubSale() {
    try {
      await this.driverService.waitUntilElementLoaded(this.saleBtnTab);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.saleBtnTab);
      return true;
    } catch (error) {
      console.log("navigateToSubSale");
      console.log(error);
      return false;
    }
  }
  public async navigateToSubHistory() {
    try {
      await this.driverService.waitUntilElementLoaded(this.historyBtnTab);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      await this.driverService.click(this.historyBtnTab);
      return true;
    } catch (error) {
      console.log("navigateToSubHistory");
      console.log(error);
      return false;
    }
  }
  public async navigateToSubTransactions() {
    try {
      await this.driverService.waitUntilElementLoaded(this.transactionsBtnTab);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      await this.driverService.click(this.transactionsBtnTab);
      return true;
    } catch (error) {
      console.log("navigateToSubTransactions");
      console.log(error);
      return false;
    }
  }
  public async navigateToSubCases() {
    try {
      await this.driverService.waitUntilElementLoaded(this.casesBtnTab);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.casesBtnTab);
      return true;
    } catch (error) {
      console.log("navigateToSubCases");
      console.log(error);
      return false;
    }
  }
  public async navigateToSubNotes() {
    try {
      await this.driverService.waitUntilElementLoaded(this.notesBtnTab);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.notesBtnTab);
      return true;
    } catch (error) {
      console.log("navigateToSubNotes");
      console.log(error);
      return false;
    }
  }
  public async navigateToSubSms() {
    try {
      await this.driverService.waitUntilElementLoaded(this.smsBtnTab);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.smsBtnTab);
      return true;
    } catch (error) {
      console.log("navigateToSubSms");
      console.log(error);
      return false;
    }
  }
  public async navigateToSubContacts() {
    try {
      await this.driverService.waitUntilElementLoaded(this.contactsBtnTab);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.contactsBtnTab);
      return true;
    } catch (error) {
      console.log("navigateToSubContacts");
      console.log(error);
      return false;
    }
  }
  public async navigateToSubEntities() {
    try {
      await this.driverService.waitUntilElementLoaded(this.entitiesBtnTab);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.entitiesBtnTab);
      return true;
    } catch (error) {
      console.log("navigateToSubEntities");
      console.log(error);
      return false;
    }
  }
  public async navigateToSubScoring() {
    try {
      await this.driverService.waitUntilElementLoaded(this.scoringBtnTab);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.scoringBtnTab);
      return true;
    } catch (error) {
      console.log("navigateToSubScoring");
      console.log(error);
      return false;
    }
  }
  public async navigateToSubRelatedClaims() {
    try {
      await this.driverService.waitUntilElementLoaded(this.relatedClaimsBtnTab);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.relatedClaimsBtnTab);
      return true;
    } catch (error) {
      console.log("navigateToSubRelatedClaims");
      console.log(error);
      return false;
    }
  }

  public async navigateToSubFrameAgreements() {
    try {
      await this.driverService.waitUntilElementLoaded(this.frameAgreementsBtnTab);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.frameAgreementsBtnTab);
      return true;
    } catch (error) {
      console.log("navigateToSubFrameAgreements");
      console.log(error);
      return false;
    }
  }

  public async navigateToSubApplications() {
    try {
      await this.driverService.waitUntilElementLoaded(this.applicationBtnTab);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.click(this.applicationBtnTab);
      return true;
    } catch (error) {
      console.log("navigateToSubApplications");
      console.log(error);
      return false;
    }
  }

  public async navigateToSubGuarantees() {
    try {
      await this.driverService.waitUntilElementLoaded(this.guaranteeBtnTab);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.click(this.guaranteeBtnTab);
      return true;
    } catch (error) {
      console.log("navigateToSubGuarantees");
      console.log(error);
      return false;
    }
  }

  public async navigateToGuaranteeReportList() {
    try {
      await this.driverService.waitUntilElementLoaded(this.reportsBtnMenu);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.reportsBtnMenu);
      await this.driverService.waitUntilElementLoaded(this.guaranteeReportOption);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.click(this.guaranteeReportOption);
      return true;
    } catch (error) {
      console.log("navigateToGuaranteeReportList");
      console.log(error);
      return false;
    }
  }

  public async navigateToSubInstalment() {
    try {
      await this.driverService.waitUntilElementLoaded(this.instalmentBtnTab);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.click(this.instalmentBtnTab);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      return true;
    } catch (error) {
      console.log("navigateToSubInstalment");
      console.log(error);
      return false;
    }
  }

  public async navigateToSubEmails() {
    try {
      await this.driverService.waitUntilElementLoaded(this.emailsBtnTab);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.click(this.emailsBtnTab);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      return true;
    } catch (error) {
      console.log("navigateToSubEmails");
      console.log(error);
      return false;
    }
  }

  public async navigateToSubChecklists() {
    try {
      await this.driverService.waitUntilElementLoaded(this.checklistBtnTab);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.click(this.checklistBtnTab);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      return true;
    } catch (error) {
      console.log("navigateToSubChecklists");
      console.log(error);
      return false;
    }
  }
  //#endregion /*2. End -- Navigate to Sub tab*/

  //#region /*Begin: Entity detail*/
  public async checkMainEntityDetailIsOpening(entityName: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.titleTabEntityActive);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      if (entityName) {
        const actualTitleTab = await this.driverService.getText(this.titleTabEntityActive);
        return actualTitleTab.includes(entityName);
      }
      return true;
    } catch (error) {
      console.log("checkMainEntityDetailIsOpening");
      console.log(error);
      return false;
    }
  }
  //#endregion /*End: Entity detail*/

  //#region  /* 3. Begin -- On Form*/
  public async closeOpeningForm() {
    let btnCloseForm = By.xpath("//*[contains(local-name(), 'form') or contains(local-name(),'app-follow-up') or contains(local-name(),'app-payment-option') or contains(local-name(),'app-export-history') or contains(local-name(),'risk-check') or contains(local-name(),'app-application-accepted') or contains(local-name(),'app-customer-relationship')]//button[@aria-label='Close' or contains(@class,'close')]");
    let len = (await this.driverService.findElements(btnCloseForm)).length;
    for (let i = 1; i <= len; i++) {
      try {
        btnCloseForm = By.xpath(`(//*[contains(local-name(), 'form') or contains(local-name(),'app-follow-up') or contains(local-name(),'app-payment-option') or contains(local-name(),'app-export-history') or contains(local-name(),'risk-check')or contains(local-name(),'app-application-accepted') or contains(local-name(),'app-customer-relationship')]//button[@aria-label='Close' or contains(@class,'close')])[${i}]`);
        await this.driverService.click(btnCloseForm);
        await this.driverService.waitForSeconds(1000);
        i = 1;
        len--;
      } catch (error) {
        continue;
      }
    }
  }

  public async pressSaveForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnSaveForm);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.btnSaveForm);
      return true;
    } catch (error) {
      console.log("pressSaveForm");
      console.log(error);
      return false;
    }
  }
  public async pressCancelForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnCancelForm);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.btnCancelForm);
      return true;
    } catch (error) {
      console.log("pressCancelForm");
      console.log(error);
      return false;
    }
  }
  public async pressYesForm() {
    try {
      await this.driverService.waitUntilElementVisible(this.btnYesForm);
      await this.driverService.click(this.btnYesForm);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      return true;
    } catch (error) {
      console.log("pressYesForm");
      console.log(error);
      return false;
    }
  }
  public async pressNoForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnNoForm);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.btnNoForm);
      return true;
    } catch (error) {
      console.log("pressNoForm");
      console.log(error);
      return false;
    }
  }
  public async pressRegisterForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnRegisterForm);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.btnRegisterForm);
      return true;
    } catch (error) {
      console.log("pressRegisterForm");
      console.log(error);
      return false;
    }
  }
  public async pressRecalculateForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnRecalculateForm);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.btnRecalculateForm);
      return true;
    } catch (error) {
      console.log("pressRecalculateForm");
      console.log(error);
      return false;
    }
  }
  public async pressCreateForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnCreateForm);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.btnCreateForm);
      return true;
    } catch (error) {
      console.log("pressCreateForm");
      console.log(error);
      return false;
    }
  }
  public async pressPreviewForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnPreviewForm);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.btnPreviewForm);
      return true;
    } catch (error) {
      console.log("pressPreviewForm");
      console.log(error);
      return false;
    }
  }
  public async pressTerminateForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnTerminateForm);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.btnTerminateForm);
      return true;
    } catch (error) {
      console.log("pressTerminateForm");
      console.log(error);
      return false;
    }
  }
  public async pressEditForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnEditForm);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.btnEditForm);
      return true;
    } catch (error) {
      console.log("pressEditForm");
      console.log(error);
      return false;
    }
  }
  public async pressApproveForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnApproveForm);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.btnApproveForm);
      return true;
    } catch (error) {
      console.log("pressApproveForm");
      console.log(error);
      return false;
    }
  }
  public async pressApplicationForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnApplicationForm);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.btnApplicationForm);
      return true;
    } catch (error) {
      console.log("pressApplicationForm");
      console.log(error);
      return false;
    }
  }
  public async pressCreateApplicationForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnCreateApplicationForm);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.btnCreateApplicationForm);
      return true;
    } catch (error) {
      console.log("pressCreateApplicationForm");
      console.log(error);
      return false;
    }
  }
  public async pressAcceptForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnAcceptForm);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.btnAcceptForm);
      return true;
    } catch (error) {
      console.log("pressAcceptForm");
      console.log(error);
      return false;
    }
  }


  public async pressAmendForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnAmendForm);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.btnAmendForm);
      return true;
    } catch (error) {
      console.log("pressAmendForm");
      console.log(error);
      return false;
    }
  }
  public async pressRejectForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnRejectForm);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.btnRejectForm);
      return true;
    } catch (error) {
      console.log("pressRejectForm");
      console.log(error);
      return false;
    }
  }
  public async pressSendForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnSendForm);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.btnSendForm);
      return true;
    } catch (error) {
      console.log("pressSendForm");
      console.log(error);
      return false;
    }
  }
  public async pressResendForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnResendForm);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.btnResendForm);
      return true;
    } catch (error) {
      console.log("pressResendForm");
      console.log(error);
      return false;
    }
  }
  public async pressReturnForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnReturnForm);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.btnReturnForm);
      return true;
    } catch (error) {
      console.log("pressReturnForm");
      console.log(error);
      return false;
    }
  }
  public async pressNextStepForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnNextStepForm);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.btnNextStepForm);
      return true;
    } catch (error) {
      console.log("pressNextStepForm");
      console.log(error);
      return false;
    }
  }
  public async pressNextForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnNextForm);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.btnNextForm);
      return true;
    } catch (error) {
      console.log("pressNextForm");
      console.log(error);
      return false;
    }
  }
  public async pressSaveAndAcceptForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnSaveAndAcceptForm);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.btnSaveAndAcceptForm);
      return true;
    } catch (error) {
      console.log("pressSaveAndAcceptForm");
      console.log(error);
      return false;
    }
  }
  public async pressReplicateForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnReplicateForm);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.btnReplicateForm);
      return true;
    } catch (error) {
      console.log("pressReplicateForm");
      console.log(error);
      return false;
    }
  }

  public async pressImportForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnImportForm);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.btnImportForm);
      return true;
    } catch (error) {
      console.log("pressImportForm");
      console.log(error);
      return false;
    }
  }
  public async pressCloseClaimForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnCloseClaimForm);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.btnCloseClaimForm);
      return true;
    } catch (error) {
      console.log("pressCloseClaimForm");
      console.log(error);
      return false;
    }
  }
  public async pressSelectForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnSelectForm);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      await this.driverService.click(this.btnSelectForm);
      return true;
    } catch (error) {
      console.log("pressSelectForm");
      console.log(error);
      return false;
    }
  }
  public async pressSubmitForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnSubmitForm);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      await this.driverService.click(this.btnSubmitForm);
      return true;
    } catch (error) {
      console.log("pressSubmitForm");
      console.log(error);
      return false;
    }
  }
  public async pressAddForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnAddForm);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      await this.driverService.click(this.btnAddForm);
      return true;
    } catch (error) {
      console.log("pressAddForm");
      console.log(error);
      return false;
    }
  }
  public async waitUntilSavingButtonInvisible() {
    try {
      await this.driverService.waitUntilElementIsNotVisible(this.btnSavingForm);
      return true;
    } catch (error) {
      console.log("waitUntilSavingButtonInvisible");
      console.log(error);
      return false;
    }
  }
  public async selectDropdownOption(optionName: string) {
    try {
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await selectDropdownOption(optionName, "", this.driverService);
      return true;
    } catch (error) {
      console.log("selectDropdownOption");
      console.log(error);
      return false;
    }
  }

  public async checkSaveButtonFormExist() {
    try {
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      return await this.driverService.isExisted(this.btnSaveForm);
    } catch (error) {
      console.log("checkSaveButtonFormExist");
      console.log(error);
      return false;
    }
  }

  public async checkCancelButtonFormExist() {
    try {
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      return await this.driverService.isExisted(this.btnCancelForm);
    } catch (error) {
      console.log("checkCancelButtonFormExist");
      console.log(error);
      return false;
    }
  }
  //#endregion /* 3. End -- On Form*/

  //#region Press tab on form
  public async pressTabOnForm(tabName: string) {
    try {
      const btnTabName = By.xpath(`//*[contains(local-name(),'form')]//li/*[@role='tab' and contains(text(),'${tabName}')]`);
      await this.driverService.waitUntilElementLoaded(btnTabName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
      await this.driverService.click(btnTabName);
      return true;
    } catch (error) {
      console.log('pressTabOnForm');
      console.log(error);
      return false;
    }
  }
  //#endregion

  public async waitForProgressBarLoaded() {
    try {
      await waitUntilHorizontalProgressBarLoaded(this.driverService);
      return true;
    } catch (error) {
      console.log("waitForProgressBarLoaded");
      console.log(error);
      return false;
    }
  }
  public async waitForProgressBarLoaded_v2(millisecondNumber: number = 1000) {
    try {
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, millisecondNumber);
      return true;
    } catch (error) {
      console.log("waitForProgressBarLoaded_v2");
      console.log(error);
      return false;
    }
  }
  public async checkProgressBarLoading(millisecondNumber: number = 5000) {
    try {
      await this.driverService.waitUntilElementLoaded(locator_progressbarActive, millisecondNumber);
      return true;
    } catch (error) {
      return false;
    }
  }
  public async waitForSeconds(millisecondNumber: number) {
    try {
      await this.driverService.waitForSeconds(millisecondNumber);
      return true;
    } catch (error) {
      console.log("waitForSeconds");
      console.log(error);
      return false;
    }
  }

  public async waitElementVisible(locator: Locator) {
    try {
      await this.driverService.waitUntilElementVisible(locator);
      return true;
    } catch (error) {
      console.log("waitForSeconds");
      console.log(error);
      return false;
    }
  }


  public async expandNumberOfItemMainList(numberItem: number = 30) {
    try {
      const btnItemPage = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[@id='pgs-expand-rows-btn']");
      await expandNumberItemOfList(this.driverService, btnItemPage, numberItem);
      return true;
    } catch (error) {
      console.log("expandNumberOfItemMainList");
      console.log(error);
      return false;
    }
  }

  public async checkColumnOnMainListExist(columnName: string) {
    const column = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//th//span[text()='${columnName}']`);
    return await this.driverService.isExisted(column);
  }

  public async checkConfigColumnOnMainListExist() {
    const configColumn = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//th[contains(@class,'config-column')]`);
    return await this.driverService.isExisted(configColumn);
  }
  public async reloadTable(timeWaitBeforeReload: number = 0) {
    try {
      await this.driverService.waitForSeconds(timeWaitBeforeReload);
      await this.driverService.pressPageDownCurrentElement();
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await reloadTable(this.driverService);
      return true;
    } catch (error) {
      console.log("reloadItemMainList");
      console.log(error);
      return false;
    }
  }
  public async expandNumberOfItemSubList(numberItem: number = 30) {
    try {
      const btnItemPage = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[@id='pgs-expand-rows-btn']");
      await expandNumberItemOfList(this.driverService, btnItemPage, numberItem);
      return true;
    } catch (error) {
      console.log("expandNumberOfItemSubList");
      console.log(error);
      return false;
    }
  }

  public async checkColumnOnSubListExist(columnName: string) {
    const column = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//th//span[text()='${columnName}']`);
    return await this.driverService.isExisted(column);
  }

  public async checkConfigColumnOnSubListExist() {
    const configColumn = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//th[contains(@class,'config-column')]`);
    return await this.driverService.isExisted(configColumn);
  }

  // Close all opening accounts, leads, sales, contacts, cases,...
  public async closeAllOpeningEntities() {
    try {
      const btnCloseEntity = By.xpath("(//*[@type='button' and @class='btn-close ng-star-inserted' or @class='btn-close'])[1]");
      let count = 0;
      while (await this.driverService.isExisted(btnCloseEntity) && count++ < 20) {
        await this.driverService.waitUntilElementLoaded(btnCloseEntity);
        await this.driverService.click(btnCloseEntity);
        await this.driverService.waitForSeconds(500);
      }
      return true;
    } catch (error) {
      console.log("closeAllOpeningEntities\n" + error);
      return false;
    }
  }

  public async checkToastErrorExist() {
    return await this.driverService.isExisted(toastError);
  }

  public async checkToastSuccessExistWithMessage(message: string) {
    const toast = By.xpath(`//div[@id='toast-container']/div[contains(@class,'toast-success')]/div[contains(text(),'${message}')]`);
    // await this.driverService.waitUntilElementVisible(toast);
    return await this.driverService.isExisted(toast);
  }

  public async checkToastErrorExistWithMessage(message: string) {
    const toast = By.xpath(`//div[@id='toast-container']/div[contains(@class,'toast-error')]/div[contains(text(),'${message}')]`);
    return await this.driverService.isExisted(toast);
  }

  public async checkToastWarningExistWithMessage(message: string) {
    const toast = By.xpath(`//div[@id='toast-container']/div[contains(@class,'toast-warning')]/div[contains(text(),'${message}')]`);
    return await this.driverService.isExisted(toast);
  }

  public async checkToastMessageVisible(message: string) {
    try {
      const toast = By.xpath(`//div[@id='toast-container']//div[contains(.,'${message}') and contains(@class,'toast-message')]`);
      await this.driverService.waitUntilElementVisible(toast, 100000)
      return true;
    } catch (error) {
      console.log(`checkToastMessageVisible`);
      console.log(error);
      return false;
    }

  }

  public async getTextToastSuccess() {
    try {
      const toast = await this.driverService.getText(toastSuccess);
      return toast;
    } catch (error) {
      console.log('getTextToastSuccess');
      console.log(error);
      return "";
    }
  }

  public async closeAllToastError() {
    for (let i = 1; i < 100; i++) {
      if (await this.driverService.isExisted(toastError)) {
        await this.driverService.click(toastError);
        await this.driverService.waitForSeconds(500);
      }
      else {
        break;
      }
    }
  }
  public async closeAllToastSuccess() {
    for (let i = 1; i < 100; i++) {
      if (await this.driverService.isExisted(toastSuccess)) {
        await this.driverService.click(toastSuccess);
        await this.driverService.waitForSeconds(500);
      }
      else {
        break;
      }
    }
  }
  //Input: column name
  //Output: Index of that column in table. Start index = 1
  public async getIndexColumnByName(columnName: string, rootXpath: string = "") {
    let result = -1;
    const header = By.xpath(rootXpath + "//table//th//span[(text())]");
    const len = await (await this.driverService.findElements(header)).length;
    for (let i = 1; i <= len; i++) {
      const actualName = await this.driverService.getText(By.xpath(`(${rootXpath}//table//th//span[(text())])[${i}]`));
      if (columnName.localeCompare(actualName) === 0) {
        result = i;
        break;
      }
    }
    return result;
  }


  //#region /* Begin: Search & Filter form*/
  public async pressSearchSearchAndFilter() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnSearchSearchAndFilter);
      await closeToastMessage(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.btnSearchSearchAndFilter);
      return true;
    } catch (error) {
      console.log("pressSearchSearchAndFilter");
      console.log(error);
      return false;
    }
  }

  public async pressSaveSearchAndFilter() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnSaveSearchAndFilter);
      await closeToastMessage(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.btnSaveSearchAndFilter);
      return true;
    } catch (error) {
      console.log("pressSaveSearchAndFilter");
      console.log(error);
      return false;
    }
  }

  public async pressClearSearchAndFilter() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnClearSearchAndFilter);
      await closeToastMessage(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.btnClearSearchAndFilter);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      return true;
    } catch (error) {
      console.log("pressClearSearchAndFilter");
      console.log(error);
      return false;
    }
  }

  public async pressCancelSearchAndFilter() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnCancelSearchAndFilter);
      await closeToastMessage(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.btnCancelSearchAndFilter);
      return true;
    } catch (error) {
      console.log("pressCancelSearchAndFilter");
      console.log(error);
      return false;
    }
  }

  public async pressXSearchAndFilter() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnXSearchAndFilter);
      await closeToastMessage(this.driverService);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.btnXSearchAndFilter);
      return true;
    } catch (error) {
      console.log("pressXSearchAndFilter");
      console.log(error);
      return false;
    }
  }

  //#endregion /* End: Search & Filter form*/


  //#region /*Begin: Active tab*/
  public async pressCreateTab() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnCreateTab);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      await this.driverService.click(this.btnCreateTab);
      return true;
    } catch (error) {
      console.log("pressCreateTab");
      console.log(error);
      return false;
    }
  }
  public async pressSaveTab() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnSaveTab);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.btnSaveTab);
      return true;
    } catch (error) {
      console.log("pressSaveTab");
      console.log(error);
      return false;
    }
  }

  public async pressResetTab() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnResetTab);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.btnResetTab);
      return true;
    } catch (error) {
      console.log("pressResetTab");
      console.log(error);
      return false;
    }
  }

  public async pressHoldTab() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnHoldTab);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.btnHoldTab);
      return true;
    } catch (error) {
      console.log("pressHoldTab");
      console.log(error);
      return false;
    }
  }

  public async pressApproveTab() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnApproveTab);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.btnApproveTab);
      return true;
    } catch (error) {
      console.log("pressApproveTab");
      console.log(error);
      return false;
    }
  }

  public async pressRejectTab() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnRejectTab);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.btnRejectTab);
      return true;
    } catch (error) {
      console.log("pressRejectTab");
      console.log(error);
      return false;
    }
  }
  public async pressCompleteTab() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnCompleteTab);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.btnCompleteTab);
      return true;
    } catch (error) {
      console.log("pressCompleteTab");
      console.log(error);
      return false;
    }
  }
  public async pressBackTab() {
    try {
      await this.driverService.waitUntilElementLoaded(this.btnBackTab);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(this.btnBackTab);
      return true;
    } catch (error) {
      console.log("pressBackTab");
      console.log(error);
      return false;
    }
  }
  public async pressSendSMSTab() {
    try {
      await this.driverService.waitUntilElementVisible(this.btnSendSMSTab);
      await this.driverService.click(this.btnSendSMSTab);
      return true;
    } catch (error) {
      console.log("pressBackTab");
      console.log(error);
      return false;
    }
  }
  public async pressPublishTab() {
    try {
      const element = await this.getFieldType(this.btnPublish);
      await element.click();
      return true;
    } catch (error) {
      console.log('pressPublishTab');
      console.log(error);
      return false;
    }
  }
  public async pressActivateTab() {
    try {
      const element = await this.getFieldType(this.btnActivate);
      await element.click();
      return true;
    } catch (error) {
      console.log('pressActivateTab');
      console.log(error);
      return false;
    }
  }
  // Sub tab
  public async getNumberOfTotalRecordsSubTab() {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblTotalNumberRecordSubTab);
      // await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      let temp = await this.driverService.getText(this.lblTotalNumberRecordSubTab);
      let result = parseInt(temp.replace(/^\D+/g, ''));
      return result;
    } catch (error) {
      console.log("getNumberOfTotalRecordsSubTab");
      console.log(error);
      return -1;
    }
  }

  // Main tab
  public async getNumberOfTotalRecordsMainTab() {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblTotalNumberRecordMainTab);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      let temp = await this.driverService.getText(this.lblTotalNumberRecordMainTab);
      let result = parseInt(temp.replace(/^\D+/g, ''));
      return result;
    } catch (error) {
      console.log("getNumberOfTotalRecordsMainTab");
      console.log(error);
      return -1;
    }
  }
  //#endregion /*End: Active tab*/

  //#region /*Begin: Check button menu header exist*/
  public async checkDashboardButtonMenuExist() {
    try {
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      return await this.driverService.isExisted(this.dashboardBtnMenu);
    } catch (error) {
      console.log("checkDashboardButtonMenuExist");
      console.log(error);
      return false;
    }
  }

  public async checkClaimButtonMenuExist() {
    try {
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      return await this.driverService.isExisted(this.claimsBtnMenu);
    } catch (error) {
      console.log("checkClaimButtonMenuExist");
      console.log(error);
      return false;
    }
  }
  /*End: Check button menu header exist*/
  //#endregion

  //#region /*Methods at Module configuration - Global setting*/
  /**
   * we will open an item at Global setting
   * @param nameOfDomainItem 
   */
  public async selectDomainCardAtGlobalSetting(nameOfDomainItem: string) {
    try {
      const domainItem = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-domain-card//div[text()='${nameOfDomainItem}']`);
      await this.driverService.waitUntilElementLoaded(domainItem);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(domainItem);
      return true;
    } catch (error) {
      console.log('selectDomainCardAtGlobalSetting');
      console.log(error);
      return false;
    }
  }

  /**
   * We will press Setting button at a Domain detail item in a Domain card at Global Setting
   * @param nameOfDomainDetailItem 
   */
  public async pressSettingAtDomainDetailItemInDomainCard(nameOfDomainDetailItem: string) {
    try {
      const domainDetailItem = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-configuration-list//div[contains(@class,'domain-detail-item') and .//h4[text()='${nameOfDomainDetailItem}']]//button[contains(text(),'Settings')]`);
      await this.driverService.waitUntilElementLoaded(domainDetailItem);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      await this.driverService.click(domainDetailItem);
      return true;
    } catch (error) {
      console.log('pressSettingAtDomainDetailItemInDomainCard');
      console.log(error);
      return false;
    }
  }
  //#endregion

  //#region Check button menu exist 

  public async verifyGlobalMenuItems(itemList: string[], flag: string[], extra: boolean, extraFlag?: string) {
    let result: any[] = [];
    try {
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      let options = await this.driverService.findElements(By.xpath(`//div[@id="navbarSupportedContent"]//ul//li[not(@hidden)]`));
      let allOptions: string[] = [];

      for (const option of await options) {
        let text = await option.getText();
        allOptions.push(text.toUpperCase());;
      }

      for (var i = 0; i < itemList.length; i++) {
        let temp: string;
        if (allOptions.includes(itemList[i])) {
          temp = "Yes";
        } else {
          temp = "No";
        }
        if (flag[i] == "Yes" || flag[i] == "No" || flag[i] == "Optional") {
          result.push(new resultColumn("Global Menu", `7 - ${i + 1}`, itemList[i], flag[i], temp, getCurrentDateTime(), ""));
        }
      }

      let extraOptions = allOptions.filter(option => !itemList.includes(option));
      if (extra) {
        for (var j = 0; j < extraOptions.length; j++) {
          let temp: string;
          if (allOptions.includes(extraOptions[j])) {
            temp = "Yes";
          } else {
            temp = "No";
          }
          if (extraFlag == "Yes" || extraFlag == "No" || extraFlag == "Optional") {
            result.push(new resultColumn("Global Menu", `7 - ${itemList.length + j + 1}`, extraOptions[j], extraFlag, temp, getCurrentDateTime(), "Extra items"))
          }
        }
      }
      return result;
    } catch (error) {
      console.log(`verifyGlobalMenu`);
      console.log(error);
      return result;
    }
  }
  //#endregion

  //#region Check button Setting dropdonw (cogwheel) exist
  public async verifyCogwheelMenuItems(itemList: string[], flag: string[], extra: boolean, extraFlag?: string) {
    let result: any[] = [];

    try {
      await this.driverService.waitUntilElementLoaded(this.settingBtnMenu);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.click(this.settingBtnMenu);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      let options = await this.driverService.findElements(By.xpath(`(//app-header//i[contains(@class,'fa-cog')])[1]/following::button[@routerlinkactive]`));
      let allOptions: string[] = [];

      for (const option of await options) {
        let text = await option.getText();
        allOptions.push(text.toUpperCase());
      }

      for (var i = 0; i < itemList.length; i++) {
        let temp: string;
        if (flag[i] == "Yes" || flag[i] == "No" || flag[i] == "Optional") {
          if (allOptions.includes(itemList[i])) {
            temp = "Yes";
          } else {
            temp = "No";
          }
          result.push(new resultColumn("Cogwheel", `8 - ${i + 1}`, itemList[i], flag[i], temp, getCurrentDateTime(), ""));
        }
      }
      let extraOptions = allOptions.filter(option => !itemList.includes(option));
      if (extra) {
        for (var j = 0; j < extraOptions.length; j++) {
          let temp: string;
          if (allOptions.includes(extraOptions[j])) {
            temp = "Yes";
          } else {
            temp = "No";
          }
          if (extraFlag == "Yes" || extraFlag == "No" || extraFlag == "Optional") {
            result.push(new resultColumn("Cogwheel", `8 - ${itemList.length + j + 1}`, extraOptions[j], extraFlag, temp, getCurrentDateTime(), "Extra items"))
          }
        }
      }
      return result;
    } catch (error) {
      console.log(`verifyCogWheelMenu`);
      console.log(error);
      return result;
    }
  }
  //#endregion

  //#region s Check Reports menu
  public async verifyReportsMenuItems(itemList: string[], flag: string[], extra: boolean, extraFlag?: string) {
    let result: any[] = [];
    try {
      await this.driverService.waitUntilElementLoaded(this.reportsBtnMenu);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.click(this.reportsBtnMenu);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      let options = await this.driverService.findElements(By.xpath(`//div[@class="dropdown"]//a[contains(@href,"report")]`));
      let allOptions: string[] = [];
      for (const option of await options) {
        let text = await option.getText();
        allOptions.push(text.toUpperCase());;
      }

      for (var i = 0; i < itemList.length; i++) {
        let temp: string;
        if (flag[i] == "Yes" || flag[i] == "No" || flag[i] == "Optional") {
          if (allOptions.includes(itemList[i])) {
            temp = "Yes";
          } else {
            temp = "No";
          }
          result.push(new resultColumn("Reports Menu", `9 - ${i + 1}`, itemList[i], flag[i], temp, getCurrentDateTime(), ""));
        }
      }
      let extraOptions = allOptions.filter(option => !itemList.includes(option));

      if (extra) {
        for (var j = 0; j < extraOptions.length; j++) {
          let temp: string;
          if (allOptions.includes(extraOptions[j])) {
            temp = "Yes";
          } else {
            temp = "No";
          }
          if (extraFlag == "Yes" || extraFlag == "No" || extraFlag == "Optional") {
            result.push(new resultColumn("Reports Menu", `9 - ${itemList.length + j + 1}`, extraOptions[j], extraFlag, temp, getCurrentDateTime(), "Extra items"))
          }
        }
      }
      return result;
    } catch (error) {
      console.log("verifyReportsMenu");
      console.log(error);
      return result;
    }
  }
  //#endregion

  public async verifyEntityTab(itemList: string[], flag: string[], extra: boolean, extraFlag?: string) {
    let result: any[] = [];
    try {
      await this.driverService.waitUntilElementLoaded(By.xpath(`//c-details-layout`));
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      let options = await this.driverService.findElements(By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//ul[@role="tablist"]//a[contains(@class,"nav-link")]`));
      let allOptions: string[] = [];
      for (const option of await options) {
        let text = await option.getText();
        allOptions.push(text.toUpperCase());;
      }
      for (var i = 0; i < itemList.length; i++) {
        let temp: string;
        if (flag[i] == "Yes" || flag[i] == "No" || flag[i] == "Optional") {
          if (allOptions.includes(itemList[i])) {
            temp = "Yes";
          } else {
            temp = "No";
          }
          result.push(new resultColumn("Entity Tabs", `5 - ${i + 1}`, itemList[i] + " tab", flag[i], temp, getCurrentDateTime(), ""));
        }
      }
      let extraOptions = allOptions.filter(option => !itemList.includes(option));
      if (extra) {
        for (var j = 0; j < extraOptions.length; j++) {
          let temp: string;
          if (allOptions.includes(extraOptions[j])) {
            temp = "Yes";
          } else {
            temp = "No";
          }
          if (extraFlag == "Yes" || extraFlag == "No" || extraFlag == "Optional") {
            result.push(new resultColumn("Entity Tabs", `5 - ${itemList.length + j + 1}`, extraOptions[j] + ` tab`, extraFlag, temp, getCurrentDateTime(), "Extra items"))
          }
        }
      }
      return result;
    } catch (error) {
      console.log(`verifyEntityTab`);
      console.log(error);
      return result;
    }
  }

  public async enterDocumentsTab() {
    try {
      await this.driverService.waitUntilElementLoaded(this.documentsBtnTab);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.click(this.documentsBtnTab);
      return true;
    } catch (error) {
      console.log(`enterScoringTab`);
      console.log(error);
      return false;
    }
  }

  public async enterSummaryTab() {
    try {
      await this.driverService.waitUntilElementLoaded(this.summaryBtnTab);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.click(this.summaryBtnTab);
      return true;
    } catch (error) {
      console.log(`enterScoringTab`);
      console.log(error);
      return false;
    }
  }

  public async enterMyProfile() {
    try {
      await this.driverService.waitUntilElementLoaded(this.userProfileBtnMenu);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.click(this.userProfileBtnMenu);
      await this.driverService.waitUntilElementLoaded(this.myProfileBtnOptionUserProfile);
      await this.driverService.click(this.myProfileBtnOptionUserProfile);
      return true;
    } catch (error) {
      console.log(`enterMyProfile`);
      console.log(error);
      return false;
    }
  }

  public async validateApproveButtonDisplay(isEnable: boolean = true) {
    try {
      await this.driverService.waitForElementEnabled(this.btnApproveForm);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let approveDisplaybutton;
      if (isEnable) {
        approveDisplaybutton = By.xpath(`//*[contains(local-name(),'form')]//div//button[contains(@title,'Approve') and not (@disabled)]`);
      } else {
        approveDisplaybutton = By.xpath(`//*[contains(local-name(),'form')]//div//button[contains(@title,'Approve') and @disabled]`);
      }
      if (await this.driverService.isExisted(approveDisplaybutton)) {
        return true;
      } else return false;
    } catch (error) {
      console.log("validateApproveButtonDisplay");
      console.log(error);
      return false;
    }
  }

  public async navigateToAccountTabByName(AccountName: string) {
    try {
      let accountTab = By.xpath(`//app-customer-page//ul[@role='tablist']//a[contains(text(),'${AccountName}')]`);
      await this.driverService.waitUntilElementLoaded(accountTab);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.click(accountTab);
      return true;
    }
    catch (error) {
      console.log("navigateToAccountTabByName");
      console.log(error);
      return false;
    }

  }

  public async verifyCommunicationButtonMenuIsDisabled() {
    try {
      if (await this.driverService.isExisted(this.communicationsBtnMenu)) {
        return false;
      } else return true;
    } catch (error) {
      console.log(`verifyCommunicationButtonmenuIsDisabled`);
      console.log(error)
      return false;
    }
  }

  public async verifyRequiredFieldOnForm(sectionName: string, fieldName: string) {
    try {
      let lblRequirement = By.xpath(`//*[contains(local-name(),'form')]//div[./h4[text()='${sectionName}']]//div[./label and .//*[contains(text(),'${fieldName}')]]//div[contains(text(), 'This field is required')]`);
      await this.driverService.waitUntilElementLoaded(lblRequirement);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      if (await this.driverService.isExisted(lblRequirement)) {
        logSuccessMessage(`Verify ${fieldName} required field : Test passed!`);
        return true;
      }
      else {
        logFailMessage(`Verify ${fieldName} required field : Not found!`);
        return false;
      }
    } catch (error) {
      console.log('verifyRequiredField');
      console.log(error);
      return false;
    }
  }

  public async verifyDisabledFieldOnForm(sectionName: string, fieldName: string) {
    try {
      let lblRequirement = By.xpath(`//h4[text()='${sectionName}']//following-sibling::div//label[./span[contains(text(), '${fieldName}')]]//following-sibling::div//input[@readonly or @disabled]`);
      await this.driverService.waitUntilElementLoaded(lblRequirement);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      if (await this.driverService.isExisted(lblRequirement)) {
        logSuccessMessage(`Verify ${fieldName} disabled field : Test passed!`);
        return true;
      }
      else {
        logFailMessage(`Verify ${fieldName} disabled field : Not found!`);
        return false;
      }
    } catch (error) {
      console.log('verifyDisabledField');
      console.log(error);
      return false;
    }
  }

  public async getThePathOfDownloadFile() {
    return await this.driverService.getDownLoadedPath();
  }

  public async getTheNameOfDownloadFile() {
    return await this.driverService.getDownLoadedFileName();
  }

  public async findDownloadFileAfterDownload(ServerName: string) {
    // const containerIds = await executeCommandLineWithOutput(`dir`);
    // console.log(containerIds);
    if (__dirname.includes("jenkins") && !__dirname.includes(".jenkins")) {
      //const containerIDs = [`2abb90b4e299`, `bc1ec1684ea1`, `739ed8e3ee85`, `a4b3be5ef670`, `4b4c669262d7`, `79d6b7b5f6cc`];
      await logInfoMessage("Terry test >>>");
      //const containerIds = await executeCommandLine(`docker container ls -a | awk 'NR>1 {print $1}'`);
      const containerIds = await executeCommandLineWithOutput(`docker container ls -a | awk 'NR>1 {print $1}'`);
      //const current_containerId = await executeCommandLineSync(`docker ps -a -q`);
      // await logInfoMessage(`Terry done <<< ${JSON.stringify(containerIds)}`);
      for (const containerId of containerIds.split("\n")) {
        if (containerId.trim().length > 0) {
          ServerName = containerId;
          await executeCommandLine(`docker cp ${ServerName}:/home/seluser/Downloads/ ${DownloadFilePathGlobalVariable}`);
          await this.waitForSeconds(10000);
          executeCommandLine(`echo "Copy downloaded files from /home/seluser/Downloads/ to ${DownloadFilePathGlobalVariable}"`);
          await this.waitForSeconds(3000);
          logInfoMessage(`All file in Downloads folder: `);
          await executeCommandLine(`ls -R ${DownloadFilePathGlobalVariable}`);
          await executeCommandLine(`docker exec ${ServerName} ls -R /home/seluser/Downloads`);
          await executeCommandLine(`ls -R /home/seluser/Downloads`);
          await executeCommandLine(`ls -R ./tempDownload`);
        }
      }
      //console.log(`DONE ${containerIds.length}`);
      //ServerName = containerId;
      // await executeCommandLine(`docker cp ${ServerName}:/home/seluser/Downloads/ ${DownloadFilePathGlobalVariable}`);
      // await this.waitForSeconds(10000);
      // executeCommandLine(`echo "Copy downloaded files from /home/seluser/Downloads/ to ${DownloadFilePathGlobalVariable}"`);
      // await this.waitForSeconds(3000);
      // logInfoMessage(`All file in Downloads folder: `);
      // await executeCommandLine(`ls -R ${DownloadFilePathGlobalVariable}`);
      // await executeCommandLine(`docker exec ${ServerName} ls -R /home/seluser/Downloads`);
      // await executeCommandLine(`ls -R /home/seluser/Downloads`);
      // await executeCommandLine(`ls -R ./tempDownload`);
    }
  }

  public async clearAllFileInFolderBeforeDownload(ServerName: string) {
    if (__dirname.includes("jenkins") && !__dirname.includes(".jenkins")) {
      executeCommandLine(`docker exec ${ServerName} rm -rf /home/seluser/Downloads/*`);
      executeCommandLine(`echo "Clear all files in /home/seluser/Downloads/"`);
    } else {
      clearAllFileInFolder(DownloadFilePathGlobalVariable);
    }
  }

  public async pressTabWithTitle(titleName: string) {
    try {
      const btn = By.xpath(`//ul[@role='tablist']//*[@title='${titleName}']`);
      const element = await this.getFieldType(btn);
      await element.click();
      return true;
    } catch (error) {
      console.log('pressTabWithTitle');
      console.log(error);
      return false;
    }
  }
}


