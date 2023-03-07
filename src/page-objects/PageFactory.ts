
import { IPageFactory } from "./IPageFactory";
import { SeleniumWebDriverService } from "../core/selenium-webdriver.service";
import { Client } from "./client";
import { TeamListPage } from "./back-office-portal/general/team/TeamListPage";
import { TeamCreatePage } from "./back-office-portal/general/team/TeamCreatePage";
import { TargetGroupListPage } from "./back-office-portal/general/target-group/TargetGroupListPage";
import { TargetGroupCreatePage } from "./back-office-portal/general/target-group/TargetGroupCreatePage";
import { AccountList } from "./back-office-portal/general/account/account-list/AccountList";
import { AccountAddTargetGroupPage } from "./back-office-portal/general/account/account-target-group/AccountAddTargetGroup";
import { GlobalPagination } from "./back-office-portal/general/GlobalPageObject/GlobalPagination";
import { TargetGroupSearchPage } from "./back-office-portal/general/target-group/TargetGroupSearchPage";
import { RewardConfigurationForm } from "./back-office-portal/general/reward-programs/reward-configuration/RewardConfigurationForm";
import { RewardConfigurationList } from "./back-office-portal/general/reward-programs/reward-configuration/RewardConfigurationList";
import { GlobalPageObject } from "./back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { ProgramConfigurationForm } from "./back-office-portal/general/reward-programs/program-configuration/ProgramConfigurationForm";
import { ProgramConfigurationList } from "./back-office-portal/general/reward-programs/program-configuration/ProgramConfigurationList";
import { AccountTabChecklistList } from "./back-office-portal/general/account/account-details/tabs/account-checklist/AccountTabChecklistList";
import { GlobalSortTable } from "./back-office-portal/general/GlobalPageObject/GlobalSortTable";
import { TargetGroupDetailPage } from "./back-office-portal/general/target-group/TargetGroupDetailPage";
import { ExportHistoryTargetGroup } from "./back-office-portal/general/target-group/ExportHistoryTargetGroup";
import { ClaimTimeTracking } from "./back-office-portal/insurance/claim/claim-details/tabs/claim-time-tracking/ClaimTabTimeTracking";
import { LogTimeForm } from "./back-office-portal/insurance/claim/claim-details/tabs/claim-time-tracking/LogTimeForm";
import { RewardsChecklistListCPVarsam } from "./customer-portal/varsam/rewards/Checklist/RewardsChecklistListCPVarsam";
import { RewardsChecklistFormCPVarsam } from "./customer-portal/varsam/rewards/Checklist/RewardsChecklistFormCPVarsam";
import { AccountTabChecklistForm } from "./back-office-portal/general/account/account-details/tabs/account-checklist/AccountTabChecklistForm";
import { GlobalSortTableCPVarsam } from "./customer-portal/varsam/global-page-object/GlobalSortTableCPVarsam";
import { GlobalPageObjectCPVasam } from "./customer-portal/varsam/global-page-object/GlobalPageObjectCPVarsam";
import { GlobalPaginationCPVarsam } from "./customer-portal/varsam/global-page-object/GlobalPaginationCPVarsam";
import { AccountSetting } from "./back-office-portal/general/account/account-setting/AccountSetting";
import { AccountTabHistoryList } from "./back-office-portal/general/account/account-details/tabs/account-history/AccountTabHistoryList";
import { AccountDetailsLeftSide } from "./back-office-portal/general/account/account-details/left-side/AccountDetailsLeftSide";
import { PolicyListInsurance } from "./back-office-portal/insurance/policy/policy-list/PolicyListInsurance";
import { GlobalBrowserWindowHandle } from "./back-office-portal/general/GlobalPageObject/GlobalBrowserWindowHandle";
import { PolicyDetails } from "./back-office-portal/general/policy/policy-layouts/PolicyDetails";
import { AppEntityWidgets } from "./back-office-portal/general/app-entity-widgets/AppEntityWidgets";
import { AccountTabRewardList } from "./back-office-portal/general/account/account-details/tabs/account-rewards/AccountTabRewardList";
import { RewardLogPage } from "./back-office-portal/general/reward-programs/reward-log/RewardLogPage";
import { RewardLogForm } from "./back-office-portal/general/reward-programs/reward-log/RewardLogForm";
import { TelephoneSettings } from "./back-office-portal/general/telephony/TelephoneSettings";
import { SaleTabCallLogList } from "./back-office-portal/general/sale/sale-details/tabs/sale-call-log/SaleTabCallLogList";
import { SaleTabCallLogForm } from "./back-office-portal/general/sale/sale-details/tabs/sale-call-log/SaleTabCallLogForm";
import { MotorGeneralSettings } from "./back-office-portal/general/motor-registry-settings/MotorGeneralSettings";
import { MotorRegistryVehicleDetails } from "./back-office-portal/general/motor-registry/MotorRegistryVehicleDetails";
import { PipelineList } from "./back-office-portal/general/sales-distribution/pipeline/pipeline-list/PipelineList";
import { CommissionConfigurationForm } from "./back-office-portal/general/sales-distribution/commission/commission-form/CommissionConfigurationForm";
import { CloseClaimFormInsurance } from "./back-office-portal/insurance/claim/claim-forms/CloseClaimFormInsurance";
import { ReopenClaimFormInsurance } from "./back-office-portal/insurance/claim/claim-forms/ReopenClaimFormInsurance";
import { ClaimDetailsLeftSideInsurance } from "./back-office-portal/insurance/claim/claim-details/left-side/ClaimDetailsLeftSideInsurance";
import { ClaimListInsurance } from "./back-office-portal/insurance/claim/claim-list/ClaimListInsurance";
import { AccountTabHistoryListGuarantee } from "./back-office-portal/guarantee/account/account-details/tabs/account-history/AccountTabHistoryListGuarantee";
import { ClaimTabHistoryListInsurance } from "./back-office-portal/insurance/claim/claim-details/tabs/claim-history/ClaimTabHistoryListInsurance";
import { SaleList } from "./back-office-portal/general/sale/sale-list/SaleList";
import { SaleCard } from "./back-office-portal/general/sale/sale-list/SaleCard";
import { GlobalFilterDropdown } from "./back-office-portal/general/GlobalPageObject/GlobalFilterDropdown";
import { SaleDetailsLeftSide } from "./back-office-portal/general/sale/sale-details/left-side/SaleDetailsLeftSide";
import { SaleSearchFilter } from "./back-office-portal/general/sale/sale-search-filter/SaleSearchFilter";
import { SaleForm } from "./back-office-portal/general/sale/sale-forms/SaleForm";
import { SMSForm } from "./back-office-portal/general/sms/sms-forms/SMSForm";
import { SMSList } from "./back-office-portal/general/sms/sms-list/SMSList";
import { SMSDetailForm } from "./back-office-portal/general/sms/sms-forms/SMSDetailForm";
import { AccountTabSMSList } from "./back-office-portal/general/account/account-details/tabs/account-SMS/AccountTabSMSList";
import { CommissionConfigurationList } from "./back-office-portal/general/sales-distribution/commission/commission-list/CommissionConfigurationList";
import { RewardsIntroductionCPVarsam } from "./customer-portal/varsam/rewards/Introduction/RewardsIntroductionCPVarsam";
import { GlobalConfirmationForm } from "./back-office-portal/general/GlobalPageObject/GlobalConfirmationForm";
import { HouseholdList } from "./back-office-portal/general/household/household/household-list/HouseholdList";
import { SuggestionList } from "./back-office-portal/general/household/suggestions/suggestion-list/SuggestionList";
import { HouseholdPointReportForm } from "./back-office-portal/general/household/household/household-forms/HouseholdPointReportForm";
import { AddMemberHouseholdForm } from "./back-office-portal/general/household/household/household-forms/AddMemberHouseholdForm";
import { AccountForm } from "./back-office-portal/general/account/account-forms/AccountForm";
import { GlobalSearchAndFilter } from "./back-office-portal/general/GlobalPageObject/GlobalSearchAndFilter";
import { ExportForm } from "./back-office-portal/general/reward-programs/reward-log/ExportForm";
import { CustomerAttachForm } from "./back-office-portal/general/quote/attach-customer/CustomerAttachForm";
import { QueueList } from "./back-office-portal/general/queue/QueueList";
import { QueueDetails } from "./back-office-portal/general/queue/QueueDetails";
import { scenarioTags } from "../shared/variables";
import { PaymentOptionFormInsuranceVarsam } from "./back-office-portal/insurance/policy/policy-layout/PaymentOptionFormInsuranceVarsam";
import { PaymentOptionFormInsurance } from "./back-office-portal/insurance/policy/policy-layout/PaymentOptionFormInsurance";
import { DIENFORM } from "./back-office-portal/general/DIENFORM/DIENFORM";

export class PageFactory implements IPageFactory {
    protected static instance: PageFactory;
    protected constructor() {

    }

    public static getInstance(): PageFactory {
        if (!PageFactory.instance) {
            this.instance = new PageFactory();
        }
        return PageFactory.instance;
    }

    createDIENFORM(){
        return new DIENFORM(SeleniumWebDriverService.getInstance());
    }
    
    createGlobalPaginationPage() {
        return new GlobalPagination(SeleniumWebDriverService.getInstance());
    }

    createGlobalPageObjectPage() {
        return new GlobalPageObject(SeleniumWebDriverService.getInstance());
    }
    createGlobalSearchAndFilter() {
        return new GlobalSearchAndFilter(SeleniumWebDriverService.getInstance());
    }

    createGlobalSortTablePage() {
        return new GlobalSortTable(SeleniumWebDriverService.getInstance());
    }
    createGlobalBrowserWindowHandlePage() {
        return new GlobalBrowserWindowHandle(SeleniumWebDriverService.getInstance());
    }
    createGlobalConfirmationForm() {
        return new GlobalConfirmationForm(SeleniumWebDriverService.getInstance());
    }

    createQuotePage(client) {
        const driverService = SeleniumWebDriverService.getInstance();
        switch (client) {
            case Client.VARSAM:
            //return new VarsamQuotePage(driverService);
            default:
            //return new QuotePage(driverService);
        }
    }


    createPolicyPage(client: string) {
        throw new Error("Method not implemented.");
    }


    createClaimPage(client: string) {
        throw new Error("Method not implemented.");
    }

    createTeamListPage() {
        return new TeamListPage(SeleniumWebDriverService.getInstance());
    }

    createTeamCreatePage() {
        return new TeamCreatePage(SeleniumWebDriverService.getInstance());
    }

    createTargetGroupListPage() {
        return new TargetGroupListPage(SeleniumWebDriverService.getInstance());
    }

    createTargetGroupCreatePage() {
        return new TargetGroupCreatePage(SeleniumWebDriverService.getInstance());
    }

    createTargetGroupSearchPage() {
        return new TargetGroupSearchPage(SeleniumWebDriverService.getInstance());
    }
    createTargetGroupDetailPage() {
        return new TargetGroupDetailPage(SeleniumWebDriverService.getInstance());
    }

    createAccountListPage() {
        return new AccountList(SeleniumWebDriverService.getInstance());
    }
    createAccountForm() {
        return new AccountForm(SeleniumWebDriverService.getInstance());
    }
    createAccountSettingPage() {
        return new AccountSetting(SeleniumWebDriverService.getInstance());
    }

    createAccountTabHistoryList() {
        return new AccountTabHistoryList(SeleniumWebDriverService.getInstance());
    }

    createAccountAddTargetGroupPage() {
        return new AccountAddTargetGroupPage(SeleniumWebDriverService.getInstance());
    }

    createExportHistoryTargetGroupPage() {
        return new ExportHistoryTargetGroup(SeleniumWebDriverService.getInstance());
    }


    //#region reward-programs

    createRewardConfigurationCreatePage() {
        return new RewardConfigurationForm(SeleniumWebDriverService.getInstance());
    }

    createRewardConfigurationListPage() {
        return new RewardConfigurationList(SeleniumWebDriverService.getInstance());
    }

    createProgramConfigurationCreatePage() {
        return new ProgramConfigurationForm(SeleniumWebDriverService.getInstance());
    }

    createProgramConfigurationListPage() {
        return new ProgramConfigurationList(SeleniumWebDriverService.getInstance());
    }

    createRewardLogListPage() {
        return new RewardLogPage(SeleniumWebDriverService.getInstance());
    }
    createRewardLogForm() {
        return new RewardLogForm(SeleniumWebDriverService.getInstance());
    }
    createRewardLogExportForm() {
        return new ExportForm(SeleniumWebDriverService.getInstance());
    }
    //#endregion

    //#region account tab retail

    createAccountTabCheckListListPage() {
        return new AccountTabChecklistList(SeleniumWebDriverService.getInstance());
    }
    createAccountTabCheckListFormPage() {
        return new AccountTabChecklistForm(SeleniumWebDriverService.getInstance());
    }
    createAccountDetailsLeftSidePage() {
        return new AccountDetailsLeftSide(SeleniumWebDriverService.getInstance());
    }
    //#endregion


    //#region CLAIM
    createClaimTimeTrackingPage() {
        return new ClaimTimeTracking(SeleniumWebDriverService.getInstance());
    }
    createClaimLogTimeForm() {
        return new LogTimeForm(SeleniumWebDriverService.getInstance());
    }
    createCloseClaimFormInsurance() {
        return new CloseClaimFormInsurance(SeleniumWebDriverService.getInstance());
    }
    createReopenClaimFormInsurane() {
        return new ReopenClaimFormInsurance(SeleniumWebDriverService.getInstance());
    }
    createClaimDetailsLeftSideInsurance() {
        return new ClaimDetailsLeftSideInsurance(SeleniumWebDriverService.getInstance());
    }
    createClaimListInsurance() {
        return new ClaimListInsurance(SeleniumWebDriverService.getInstance());
    }
    //#endregion

    //#Customer portal
    createRewardsIntroductionCPVarsam() {
        return new RewardsIntroductionCPVarsam(SeleniumWebDriverService.getInstance());
    }
    createRewardsChecklistListCPVarsam() {
        return new RewardsChecklistListCPVarsam(SeleniumWebDriverService.getInstance());
    }

    createRewardsChecklistFormCPVarsam() {
        return new RewardsChecklistFormCPVarsam(SeleniumWebDriverService.getInstance());
    }

    createGlobalSortTableCPVasamPage() {
        return new GlobalSortTableCPVarsam(SeleniumWebDriverService.getInstance());
    }

    createGlobalPageObjectCPVasamPage() {
        return new GlobalPageObjectCPVasam(SeleniumWebDriverService.getInstance());
    }

    createGlobalPaginationCPVarsamPage() {
        return new GlobalPaginationCPVarsam(SeleniumWebDriverService.getInstance());
    }

    //#endregion

    createPolicyListInsurancePage() {
        return new PolicyListInsurance(SeleniumWebDriverService.getInstance());
    }
    createPolicyDetailsPage() {
        return new PolicyDetails(SeleniumWebDriverService.getInstance());
    }

    createAppEntityWidgetsPage() {
        return new AppEntityWidgets(SeleniumWebDriverService.getInstance());
    }

    createAccountTabRewardsListPage() {
        return new AccountTabRewardList(SeleniumWebDriverService.getInstance());
    }

    //#region telephone - call log
    createTelephoneSettingsPage() {
        return new TelephoneSettings(SeleniumWebDriverService.getInstance());
    }
    createSaleTabCallLogListPage() {
        return new SaleTabCallLogList(SeleniumWebDriverService.getInstance());
    }
    createSaleTabCallLogFormPage() {
        return new SaleTabCallLogForm(SeleniumWebDriverService.getInstance());
    }
    //#endregion

    createMotorGeneralSettingsPage() {
        return new MotorGeneralSettings(SeleniumWebDriverService.getInstance());
    }

    createMotorRegistryVehicleDetails() {
        return new MotorRegistryVehicleDetails(SeleniumWebDriverService.getInstance());
    }

    createPipelineList() {
        return new PipelineList(SeleniumWebDriverService.getInstance());
    }

    createCommissionConfigurationForm() {
        return new CommissionConfigurationForm(SeleniumWebDriverService.getInstance());
    }
    createCommissionConfigurationList() {
        return new CommissionConfigurationList(SeleniumWebDriverService.getInstance());
    }

    createAccountTabHistoryListGuarantee() {
        return new AccountTabHistoryListGuarantee(SeleniumWebDriverService.getInstance());
    }

    createClaimTabHistoryListInsurance() {
        return new ClaimTabHistoryListInsurance(SeleniumWebDriverService.getInstance());
    }

    //#region Sale
    createSaleList() {
        return new SaleList(SeleniumWebDriverService.getInstance());
    }
    createSaleCard() {
        return new SaleCard(SeleniumWebDriverService.getInstance());
    }
    createSaleSearchFilter() {
        return new SaleSearchFilter(SeleniumWebDriverService.getInstance());
    }
    createSaleDetailsLeftSide() {
        return new SaleDetailsLeftSide(SeleniumWebDriverService.getInstance());
    }
    createGlobalFilterDropdown() {
        return new GlobalFilterDropdown(SeleniumWebDriverService.getInstance());
    }
    createSaleForm() {
        return new SaleForm(SeleniumWebDriverService.getInstance());
    }
    //#endregion

    //#region SMS
    createSMSForm() {
        return new SMSForm(SeleniumWebDriverService.getInstance());
    }
    createSMSList() {
        return new SMSList(SeleniumWebDriverService.getInstance());
    }
    createSMSDetailForm() {
        return new SMSDetailForm(SeleniumWebDriverService.getInstance());
    }
    createAccountTabSMSList() {
        return new AccountTabSMSList(SeleniumWebDriverService.getInstance());
    }
    //#endregion

    //#region Household
    createHouseholdList() {
        return new HouseholdList(SeleniumWebDriverService.getInstance());
    }
    createSuggestionList() {
        return new SuggestionList(SeleniumWebDriverService.getInstance());
    }
    createHouseholdPointReportForm() {
        return new HouseholdPointReportForm(SeleniumWebDriverService.getInstance());
    }
    createAddMemberHouseholdForm() {
        return new AddMemberHouseholdForm(SeleniumWebDriverService.getInstance());
    }
    //#endregion

    createAttachCustomerForm() {
        return new CustomerAttachForm(SeleniumWebDriverService.getInstance());
    }

    //#region Queue
    createQueueList() {
        return new QueueList(SeleniumWebDriverService.getInstance());
    }
    createQueueDetails() {
        return new QueueDetails(SeleniumWebDriverService.getInstance());
    }
    //#endregion

    createPaymentOptionForm() {
        let result: PaymentOptionFormInsurance ;
        if (scenarioTags.has('@PaymentOptionVarsam')) {
            result = new PaymentOptionFormInsuranceVarsam(SeleniumWebDriverService.getInstance());
        } else {
            result = new PaymentOptionFormInsurance(SeleniumWebDriverService.getInstance());
        }
        return result;
    }
}