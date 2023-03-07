import { By } from "selenium-webdriver";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../shared/functions";
import { GlobalPagination } from "../../../back-office-portal/general/GlobalPageObject/GlobalPagination";

export class GlobalPaginationCPVarsam extends GlobalPagination{
        //#region I. Xpath for pagination Main tab
        protected btnDoubleLeftDisabledAtMainTab = By.xpath("//i[contains(@class,'fa-angle-double-left')]//parent::a/parent::li[contains(@class,'disabled')]");
        protected btnDoubleLeftEnabledAtMainTab = By.xpath("//i[contains(@class,'fa-angle-double-left')]//parent::a/parent::li[not(contains(@class,'disabled'))]");
    
        protected btnDoubleRightDisabledAtMainTab = By.xpath("//i[contains(@class,'fa-angle-double-right')]//parent::a/parent::li[contains(@class,'disabled')]");
        protected btnDoubleRightEnabledAtMainTab = By.xpath("//i[contains(@class,'fa-angle-double-right')]//parent::a/parent::li[not(contains(@class,'disabled'))]");
    
        protected btnPrevDisabledAtMainTab = By.xpath("//li[contains(@class,'disabled') and .//i[contains(@class,'fa-angle-left')]]");
        protected btnPrevEnabledAtMainTab = By.xpath("//li[not(contains(@class,'disabled')) and .//i[contains(@class,'fa-angle-left')]]");
    
        protected btnNextDisabledAtMainTab = By.xpath("//li[contains(@class,'disabled') and .//i[contains(@class,'fa-angle-right')]]");
        protected btnNextEnabledAtMainTab = By.xpath("//li[not(contains(@class,'disabled')) and .//i[contains(@class,'fa-angle-right')]]");
    
        protected btnReloadTableAtMainTab = By.xpath("//ul[contains(@class,'pagination')]/li[./a/i[contains(@class,'fa-refresh')]]");
    
        protected txtPageNumberAtMainTab = By.xpath("//ul[contains(@class,'pagination')]//input");
        protected lblTotalPageNumberAtMainTab = By.xpath("//ul[contains(@class,'pagination')]//span[contains(text(),'/')]");
        //#endregion
    
        //#region Xpath for Item/Page Main tab - Total Records
        protected btnItemPageAtMainTab = By.xpath("//select[contains(@class,'number-item')]");
        protected dropdownItemPageAtMainTab = By.xpath("//select[contains(@class,'number-item')]");
    
        protected lblTotalRecordsAtMainTab = By.xpath("//div[contains(@class,'table-pagination')]//div[contains(text(),'Total:')]");
        //#endregion
    
        //#region Xpath on Main table
        protected rowsTableAtMainTab = By.xpath("//table//tbody//tr");
        //#endregion
        // Loading...
        protected lblLoadingAtMainTab = By.xpath("//tbody//tr/td[contains(text(),'Loading...')]");
    
        protected ulPaginationAtMainTab = By.xpath(`//ul[contains(@class,'pagination')]`);


        //#region II. Xpath for pagination Sub tab
        protected btnDoubleLeftDisabledAtSubTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//i[contains(@class,'fa-angle-double-left')]//parent::a/parent::li[contains(@class,'disabled')]");
        protected btnDoubleLeftEnabledAtSubTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//i[contains(@class,'fa-angle-double-left')]//parent::a/parent::li[not(contains(@class,'disabled'))]");
    
        protected btnDoubleRightDisabledAtSubTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//i[contains(@class,'fa-angle-double-right')]//parent::a/parent::li[contains(@class,'disabled')]");
        protected btnDoubleRightEnabledAtSubTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//i[contains(@class,'fa-angle-double-right')]//parent::a/parent::li[not(contains(@class,'disabled'))]");
    
        protected btnPrevDisabledAtSubTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//li[contains(@class,'disabled') and .//i[contains(@class,'fa-angle-left')]]");
        protected btnPrevEnabledAtSubTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//li[not(contains(@class,'disabled')) and .//i[contains(@class,'fa-angle-left')]]");
    
        protected btnNextDisabledAtSubTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//li[contains(@class,'disabled') and .//i[contains(@class,'fa-angle-right')]]");
        protected btnNextEnabledAtSubTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//li[not(contains(@class,'disabled')) and .//i[contains(@class,'fa-angle-right')]]");
    
        protected btnReloadTableAtSubTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//ul[contains(@class,'pagination')]/li[./a/i[contains(@class,'fa-refresh')]]");
    
        protected txtPageNumberAtSubTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//ul[contains(@class,'pagination')]//input");
        protected lblTotalPageNumberAtSubTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//ul[contains(@class,'pagination')]//span[contains(text(),'/')]");
        //#endregion
    
        //#region Xpath for Item/Page Sub tab - Total Records
        protected btnItemPageAtSubTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//select[contains(@class,'number-item')]");
        protected dropdownItemPageAtSubTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//select[contains(@class,'number-item')]");
    
        protected lblTotalRecordsAtSubTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'table-pagination')]//div[contains(text(),'Total:')]");
        //#endregion
    
        //#region Xpath on Sub table
        protected rowsTableAtSubTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tbody//tr");
        //#endregion
    
        // Loading...
        protected lblLoadingAtSubTab = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr/td[contains(text(),'Loading...')]");
    
        protected ulPaginationAtSubTab = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//ul[contains(@class,'pagination')]`);

        
        //constructor(protected driverService: SeleniumWebDriverService) { }
    
        public async selectItemPageNumberAtMainList(option: string) {
            try {
                await this.driverService.waitUntilElementLoaded(this.btnItemPageAtMainTab);
                await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
                const btnOption = By.xpath(`//select[contains(@class,'number-item')]/option[text()=' ${option} ']`);
                await this.driverService.click(this.btnItemPageAtMainTab);
                await this.driverService.waitUntilElementLoaded(btnOption);
                await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
                await this.driverService.click(btnOption);
                await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
                return true;
            } catch (error) {
                console.log('selectItemPageNumberAtMainList');
                console.log(error);
                return false;
            }
        }

        public async selectItemPageNumberAtSubList(option: string) {
            try {
                await this.driverService.waitUntilElementLoaded(this.btnItemPageAtSubTab);
                await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
                const btnOption = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//select[contains(@class,'number-item')]/option[text()=' ${option} ']`);
                await this.driverService.click(this.btnItemPageAtSubTab);
                await this.driverService.waitUntilElementLoaded(btnOption);
                await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
                await this.driverService.click(btnOption);
                await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
                return true;
            } catch (error) {
                console.log('selectItemPageNumberAtSubList');
                console.log(error);
                return false;
            }
        }
}