import { By } from "selenium-webdriver";
import { BasePage } from "../../../../core/BasePage";
import { ConfirmDialogManager } from "../../../../core/fields/ConfirmDialogManager";
import { TableManager } from "../../../../core/fields/TableManager";

export class TeamListPage extends BasePage {

    locBtnCreate: By = By.css("button#pgs-create-btn");
    locMenuSaleDistr: By = By.xpath("//div[@class='collapse navbar-collapse']//a[@id='navbar-NAVIGATION_SALES_DISTRIBUTION']");
    locMenuItemTeamMgm: By = By.xpath("//div[@class='dropdown']//a[@title='Team Management']/span[@id='navbar-sub-NAVIGATION_TEAM_MANAGEMENT']");

    async accessTeamList() {
        await this.waitPageLoaded();
        await this.clickSaleDistribution();
        await this.clickTeamManagement();
    }

    private async clickSaleDistribution() {
        const menuSaleDistr = await this.getFieldType(this.locMenuSaleDistr);
        await menuSaleDistr.click();
        await this.waitForAnyPopupDisplayed();
    }

    private async clickTeamManagement() {
        const menuMenuItemTeamMgm = await this.getFieldType(this.locMenuItemTeamMgm);
        await menuMenuItemTeamMgm.click();
        await this.waitPageProgressCompleted();
    }

    async clickCreate() {
        const btnCreate = await this.getFieldType(this.locBtnCreate);
        await btnCreate.click();
        await this.waitForModalPopupDisplayed();
    }

    async check() {
        return false;
    }

    async deleteTeam(teamName) {
        const locTable = By.css(".table.c-table.table-striped.table-hover");
        let eleTable = await this.getFieldType(locTable);
        // (eleTable as TableManager).clickRowByValue("ContemiVN");
        await (eleTable as TableManager).clickRowActionEleByIndex(teamName, 1);
        const confirmDialog = new ConfirmDialogManager(this.driverService); 
        await confirmDialog.confirm("Yes"); 
        await this.waitPageProgressCompleted(); 
    }
}