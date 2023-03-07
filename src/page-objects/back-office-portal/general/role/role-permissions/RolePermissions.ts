import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2, getCurrentDateTime } from "../../../../../shared/functions";
import { resultColumn } from "../../../../../shared/variables";

export class RolePermissions {
    constructor(private driverService: SeleniumWebDriverService) { }
    private lblManageScoring = By.xpath(`//app-roles-permissions-template//div[contains(text(),"Manage scoring")]`);
    public async verifyPermissionModules(itemList: string[], flag: string[], extra: boolean, extraFlag?: string) {
        let result: any[] = [];
        try {
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await this.driverService.waitUntilElementLoaded(By.xpath(`(//app-roles-permissions-template//h4)[1]`));
            let options = await this.driverService.findElements(By.xpath(`//app-roles-permissions-template//h4`));
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
                    result.push(new resultColumn("Permissions", `1 - ${i + 1}`, itemList[i], flag[i], temp, getCurrentDateTime(), ""));
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
                        result.push(new resultColumn("Permissions", `1 - ${itemList.length + j + 1}`, extraOptions[j], extraFlag, temp, getCurrentDateTime(), "Extra items"))
                    }
                }
            }
            return result;
        } catch (error) {
            console.log(`verifyPermissionModules`);
            console.log(error);
            return result;
        }
    }

    public async verifyManageScoringPermission() {
        try {
            await this.driverService.waitUntilElementLoaded(By.xpath(`//app-roles-permissions-template`));
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            let temp = await this.driverService.isExisted(this.lblManageScoring);
            return temp;
        } catch (error) {
            console.log(`verifyImportLeadButton`);
            console.log(error);
            return false;
        }
    }
}
