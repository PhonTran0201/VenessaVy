import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../../../core/BasePage";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../../../shared/functions";
import { RewardLogPage } from "../../../../reward-programs/reward-log/RewardLogPage";

export class AccountTabRewardList extends RewardLogPage {
    protected strRootXpath = "//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]";
    protected tabRewards = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//i[contains(@id,'pgs-acc-tab-Rewards')]`);
    locButtonManualPoints: By = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//c-details-tab-layout//button[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),"manual points")]`);
    lblPointsBalance: By = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//c-details-tab-layout//span[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),"points balance:")]`);

    public async navigateToRewardTab() {
        try {
            let element = await this.getFieldType(this.tabRewards);
            await element.click();
            return true;
        } catch (error) {
            console.log(`navigateToRewardTab`);
            console.log(error);
            return false;
        }
    }

    public async validateRewardTabIsInvisible() {
        try {
            if (await this.driverService.isExisted(this.tabRewards)) {
                return false;
            } return true;
        } catch (error) {
            console.log(`validateRewardTabIsInvisible`);
            console.log(error);
            return false;
        }
    }

    public async validateRewardTabIsVisible() {
        try {
            if (await this.driverService.isExisted(this.locButtonManualPoints) && await this.driverService.isExisted(this.lblPointsBalance)) {
                return true;
            } return false;
        } catch (error) {
            console.log(`validateRewardTabIsVisible`);
            console.log(error);
            return false;
        }
    }


    //#region validate value on list

    public async validatePointsBalance(expectedValue: string) {
        try {
            let xpath = By.xpath(`${this.strRootXpath}//span[contains(text(),'Points balance:')]//span`);
            let element = await this.getFieldType(xpath);
            let actualValue = await element.getValue();
            if(expectedValue.includes(actualValue)) {
                actualValue = expectedValue;
            }
            return await this.driverService.validateRecord("validate PointsBalance", [actualValue, expectedValue, "Incorrect Value!"]);

        } catch (error) {
            console.log(`validatePointsBalance`);
            console.log(error);
            return false;
        }
    }

    public async validatePolicyID(expectedValue: string, positionRow: number = 0) {
        try {
            let xpath = By.xpath(`${this.strRootXpath}//tbody//*[@id='c-table-customer-reward-log-column-policy-number-row-${positionRow}']//a`);
            let element = await this.getFieldType(xpath);
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("Validate policy id: ", [actualValue, expectedValue, "Incorrect Value!"]);

        } catch (error) {
            console.log(`validatePolicyID`);
            console.log(error);
            return false;
        }
    }

    public async validateRewardName(expectedValue: string, positionRow: number = 0) {
        try {
            let xpath = By.xpath(`${this.strRootXpath}//tbody//*[@id='c-table-customer-reward-log-column-reward-name-row-${positionRow}']//span`);
            let element = await this.getFieldType(xpath);
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("validate Reward Name: ", [actualValue, expectedValue, "Incorrect Value!"]);

        } catch (error) {
            console.log(`validateRewardName`);
            console.log(error);
            return false;
        }
    }

    public async validateAwardedDate(expectedValue: string, positionRow: number = 0) {
        try {
            let xpath = By.xpath(`${this.strRootXpath}//tbody//*[@id='c-table-customer-reward-log-column-awarded-date-row-${positionRow}']//span`);
            let element = await this.getFieldType(xpath);
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("validate Awarded Date: ", [actualValue, expectedValue, "Incorrect Value!"]);

        } catch (error) {
            console.log(`validateAwardedDate`);
            console.log(error);
            return false;
        }
    }

    public async validatePoints(expectedValue: string, positionRow: number = 0) {
        try {
            let xpath = By.xpath(`${this.strRootXpath}//tbody//*[@id='c-table-customer-reward-log-column-points-row-${positionRow}']//span`);
            let element = await this.getFieldType(xpath);
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("validate Points: ", [actualValue, expectedValue, "Incorrect Value!"]);

        } catch (error) {
            console.log(`validatePoints`);
            console.log(error);
            return false;
        }
    }

    public async validateComments(expectedValue: string, positionRow: number = 0) {
        try {
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            let xpath = By.xpath(`${this.strRootXpath}//tbody//*[@id='c-table-customer-reward-log-column-comments-row-${positionRow}']//span`);
            let element = await this.getFieldType(xpath);
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("validate Comments", [actualValue, expectedValue, "Incorrect Value!"]);

        } catch (error) {
            console.log(`validateComments`);
            console.log(error);
            return false;
        }
    }

    //#endregion

    public async getPointsBalance() {
        try {
            let xpath = By.xpath(`${this.strRootXpath}//span[contains(text(),'Points balance:')]//span`);
            let element = await this.getFieldType(xpath);
            return await element.getValue();
        } catch (error) {
            console.log(`getPointsBalance`);
            console.log(error);
            return "";
        }
    }

    public async getPolicyID(positionRow: number = 0) {
        try {
            let xpath = By.xpath(`${this.strRootXpath}//tbody//*[@id='c-table-customer-reward-log-column-policy-number-row-${positionRow}']//a`);
            let element = await this.getFieldType(xpath);
            return await element.getValue();
        } catch (error) {
            console.log(`getPolicyID`);
            console.log(error);
            return "";
        }
    }

    public async getRewardName(positionRow: number = 0) {
        try {
            let xpath = By.xpath(`${this.strRootXpath}//tbody//*[@id='c-table-customer-reward-log-column-reward-name-row-${positionRow}']//span`);
            let element = await this.getFieldType(xpath);
            return await element.getValue();
        } catch (error) {
            console.log(`getRewardName`);
            console.log(error);
            return "";
        }
    }
    

    public async getPoints(positionRow: number = 0) {
        try {
            let xpath = By.xpath(`${this.strRootXpath}//tbody//*[@id='c-table-customer-reward-log-column-points-row-${positionRow}']//span`);
            let element = await this.getFieldType(xpath);
            return await element.getValue();
        } catch (error) {
            console.log(`validatePoints`);
            console.log(error);
            return "";
        }
    }





















}

