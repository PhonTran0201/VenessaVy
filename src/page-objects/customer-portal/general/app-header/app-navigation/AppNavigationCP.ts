import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";
import { SystemLanguageIndex as sli } from "../../../../../shared/system-language-index/SystemLanguageIndex";

/**
 * AppNavigation: Navigation bar contains menu buttons: Frame agreements, Applications, Guarantees,...
 */
export class AppNavigationCP {
    constructor(protected driverService: SeleniumWebDriverService) { }

    //#region Buttons on Navigation menu
    protected btnFrameAgreements_Menu = [
        By.xpath(`//app-header//app-navigation//li[.//*[text()]=' Frame agreements ']`)
    ][sli.getValue()];
    protected btnApplications_Menu = [
        By.xpath(`//app-header//app-navigation//li[.//*[text()]=' Applications ']`)
    ][sli.getValue()];
    protected btnGuarantees_Menu = [
        By.xpath(`//app-header//app-navigation//li[.//*[text()]=' Guarantees ']`)
    ][sli.getValue()];
    protected btnCustomers_Menu = [
        By.xpath(`//app-header//app-navigation//li[.//*[text()]=' Customers ']`)
    ][sli.getValue()];
    protected btnReports_Menu = [
        By.xpath(`//app-header//app-navigation//li[.//*[text()]=' Reports ']`)
    ][sli.getValue()];

    //Varsam CP
    protected btnMyProfile_Menu = By.xpath(`//app-header[.//app-navigation | .//nav]//li[.//a[@href='/profile']]`);
    protected btnClaims_Menu = By.xpath(`//app-header[.//app-navigation | .//nav]//li[.//a[@href='/claims']]`);
    protected btnRewards_Menu = By.xpath(`//app-header[.//app-navigation | .//nav]//li[.//a[@href='/']]`);
    //#endregion

    //#region Buttons on Active Dropdown of Navigation menu
    //#region Below Reports button
    protected btnGuaranteeReport_Dropdown = [
        By.xpath(`//app-header//app-navigation//div[contains(@class,'dropdown-menu') and contains(@class,'show')]//button[.//*[text()='Guarantee Report']]`)
    ][sli.getValue()];
    //#endregion
    //#endregion

    //#region Press button on Naviagation bar
    public async pressFrameAgreementsButton() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnFrameAgreements_Menu);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await this.driverService.click(this.btnFrameAgreements_Menu);
            return true;
        } catch (error) {
            console.log('pressFrameAgreementsButton');
            console.log(error);
            return false;
        }
    }
    public async pressApplicationsButton() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnApplications_Menu);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await this.driverService.click(this.btnApplications_Menu);
            return true;
        } catch (error) {
            console.log('pressApplicationsButton');
            console.log(error);
            return false;
        }
    }
    public async pressGuaranteesButton() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnGuarantees_Menu);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await this.driverService.click(this.btnGuarantees_Menu);
            return true;
        } catch (error) {
            console.log('pressGuaranteesButton');
            console.log(error);
            return false;
        }
    }
    public async pressCustomersButton() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnCustomers_Menu);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await this.driverService.click(this.btnCustomers_Menu);
            return true;
        } catch (error) {
            console.log('pressCustomersButton');
            console.log(error);
            return false;
        }
    }
    public async pressReportsButton() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnReports_Menu);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await this.driverService.click(this.btnReports_Menu);
            return true;
        } catch (error) {
            console.log('pressReportsButton');
            console.log(error);
            return false;
        }
    }

    // Varsam CP
    public async pressMyProfileButton(){
        try {
            await this.driverService.waitUntilElementVisible(this.btnMyProfile_Menu);
            await this.driverService.click(this.btnMyProfile_Menu);
            return true;
        } catch (error) {
            console.log('pressMyProfileButton');
            console.log(error);
            return false;
        }
    }
    public async pressClaimsButton(){
        try {
            await this.driverService.waitUntilElementVisible(this.btnClaims_Menu);
            await this.driverService.click(this.btnClaims_Menu);
            return true;
        } catch (error) {
            console.log('pressClaimsButton');
            console.log(error);
            return false;
        }
    }
    public async pressRewardsButton(){
        try {
            await this.driverService.waitUntilElementVisible(this.btnRewards_Menu);
            await this.driverService.click(this.btnRewards_Menu);
            return true;
        } catch (error) {
            console.log('pressRewards');
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region Press button on Dropdown menu under Navigation bar

    //#region Below Reports menu
    public async pressGuaranteeReportButton_Dropdown() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnGuaranteeReport_Dropdown);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.click(this.btnGuaranteeReport_Dropdown);
            return true;
        } catch (error) {
            console.log('pressGuaranteeReportButton_Dropdown');
            console.log(error);
            return false;
        }
    }
    //#endregion
    //#endregion
}