import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { logWarningMessage, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";


/**
 * AppTopRightMenu: App Top rigth menu contains: Language, Agent Name, User profile
 */


export class AppTopRightMenuCP {
    // Language

    // Agent name
    protected lblAgentName = By.xpath(`//app-header//*[contains(@class,'top-right-menu')]//div[contains(@class,'agent-name')]//*[text()]`);
    protected btnAgentName = this.lblAgentName;

    //User profile
    protected btnUserProfile = By.xpath(`//app-header//*[contains(@class,'user-profile')]//a`);
    protected lblUserProfile = this.btnUserProfile;

    //Language
    protected lblCurrentLanguage = By.xpath(`//app-header//div[./*[contains(@class,'fa-globe')]]//span`);


    constructor(protected driverService: SeleniumWebDriverService) { }

    //#region Agent name
    public async pressAgentNameDropdown() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnAgentName);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.click(this.btnAgentName);
            return true;
        } catch (error) {
            console.log('pressAgentNameDropdown');
            console.log(error);
            return false;
        }
    }

    public async getAgentName() {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblAgentName);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            return await this.driverService.getText(this.lblAgentName);
        } catch (error) {
            console.log('pressAgentNameDropdown');
            console.log(error);
            return "";
        }
    }

    public async validateAgentName(ExpectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblAgentName);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualValue = await this.driverService.getText(this.lblAgentName);
            return await this.driverService.validateRecord(
                `Validate Agent name on Top right menu`,
                [ActualValue, ExpectedValue, `Incorrect Agent name!`]
            );
        } catch (error) {
            console.log("validateAgentName");
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region User profile
    public async pressUserProfileButton() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnUserProfile);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.click(this.btnUserProfile);
            return true;
        } catch (error) {
            console.log('pressUserProfileButton');
            console.log(error);
            return false;
        }
    }

    public async getUserProfile() {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblUserProfile);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            return await (await this.driverService.getText(this.lblUserProfile)).trim();
        } catch (error) {
            console.log('getUserProfile');
            console.log(error);
            return "";
        }
    }

    /**
     * User profile is Email of the account which logging in the system
     * @param ExpectedValue 
     * @returns 
     */
    public async validateUserProfile(ExpectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblUserProfile);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualValue = await this.driverService.getText(this.lblUserProfile);
            return await this.driverService.validateRecord(
                `Validate User profile on Top right menu`,
                [ActualValue, ExpectedValue, `Incorrect User profile!`]
            );
        } catch (error) {
            console.log("validateUserProfile");
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region Language
    public async selectLanguage(language: string){
        try {
            await this.driverService.waitUntilElementVisible(this.lblCurrentLanguage);
            const currentLanguge = await this.driverService.getText(this.lblCurrentLanguage);
            if(language.localeCompare(currentLanguge) === 0){
                logWarningMessage(`\t=> System is using ${language}...`);
            }
            else{
                await this.driverService.click(this.lblCurrentLanguage);
                const btnLanguage = By.xpath(`//div[contains(@class,'dropdown-menu') and contains(@class,'show')]//*[text()='${language}']`);
                await this.driverService.waitUntilElementVisible(btnLanguage);
                await this.driverService.click(btnLanguage);
            }
            return true;
        } catch (error) {
            console.log('selectLanguage');
            console.log(error);
            return false;
        }
    }
    //#endregion
}