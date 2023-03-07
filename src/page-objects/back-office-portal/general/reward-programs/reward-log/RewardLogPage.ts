import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";
import { waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";

export class RewardLogPage extends BasePage {
    protected strRootXpath = "";
    protected tabRewards = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//i[contains(@id,'pgs-acc-tab-Rewards')]`);
    locButtonManualPoints: By = By.xpath(`//button[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),"manual points")]`);
    locButtonExport: By = By.xpath(`//button[@id= 'pgs-loyalty-reward-log-export']`);
    private SalesAndDistribution = By.xpath(`//*[@id='navbarSupportedContent']//a[@id='navbar-NAVIGATION_SALES_DISTRIBUTION']`);
    private RewardLogSubMenu = By.xpath(`//div[@class='dropdown']//span[@id='navbar-sub-NAVIGATION_REWARD_LOG']`);
    lblTotalNumberRecordMainTab: By = By.xpath(`//div[contains(text(),'Total') and contains(text(),'records')]`)

    public async navigateToRewardLogPage() {
        try {
            let SalesAndDistribution = await this.getFieldType(this.SalesAndDistribution);
            await SalesAndDistribution.click();
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            let RewardLogSubMenu = await this.getFieldType(this.RewardLogSubMenu);
            await RewardLogSubMenu.click();
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true;
        } catch (error) {
            console.log(`navigateToRewardLogPage`);
            console.log(error);
            return false;
        }
    }


    public async getNumberOfTotalRecords() {
        try {
          await this.driverService.waitUntilElementLoaded(this.lblTotalNumberRecordMainTab);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
          let temp = await this.driverService.getText(this.lblTotalNumberRecordMainTab);
          let result = parseInt(temp.replace(/^\D+/g, ''));
          return result;
        } catch (error) {
          console.log("getNumberOfTotalRecords");
          console.log(error);
          return -1;
        }
      }

    // generate by MappingPage

    async clickButtonManualPoints() {
        try {
            let ele = await this.getFieldType(this.locButtonManualPoints);
            await ele.click();
            await this.waitPageProgressCompleted();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    public async clickButtonExport() {
        try {
            let ele = await this.getFieldType(this.locButtonExport);
            await ele.click();
            await this.waitPageProgressCompleted();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    public async validateMannualPointsButtonVisible(isVisible: boolean = true) {
        try {
            if (isVisible) {
                return await this.driverService.isExisted(this.locButtonManualPoints);
            } else return !(await this.driverService.isExisted(this.locButtonManualPoints));
        } catch (error) {
            console.log(`validateMannualPointsButtonVisible`);
            console.log(error);
            return false;
        }
    }

    //#region validate value on list
    public async validateAccountName(expectedValue: string, positionRow: number = 1) {
        try {
            let xpath = By.xpath(`${this.strRootXpath}//tbody//*[@id='c-table-reward-log-column-account-row-${positionRow}']//a`);
            let element = await this.getFieldType(xpath);
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("Validate Account Name: ", [actualValue, expectedValue, "Incorrect Value!"]);

        } catch (error) {
            console.log(`validateAccountName`);
            console.log(error);
            return false;
        }
    }

    public async validatePolicyID(expectedValue: string, positionRow: number = 1) {
        try {
            let xpath = By.xpath(`${this.strRootXpath}//tbody//*[@id='c-table-reward-log-column-policy-number-row-${positionRow}']//span`);
            let element = await this.getFieldType(xpath);
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("Validate policy id: ", [actualValue, expectedValue, "Incorrect Value!"]);

        } catch (error) {
            console.log(`validatePolicyID`);
            console.log(error);
            return false;
        }
    }

    public async validateRewardName(expectedValue: string, positionRow: number = 1) {
        try {
            let xpath = By.xpath(`${this.strRootXpath}//tbody//*[@id='c-table-reward-log-column-reward-name-row-${positionRow}']//span`);
            let element = await this.getFieldType(xpath);
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("validate Reward Name: ", [actualValue, expectedValue, "Incorrect Value!"]);

        } catch (error) {
            console.log(`validateRewardName`);
            console.log(error);
            return false;
        }
    }

    public async validateAwardedDate(expectedValue: string, positionRow: number = 1) {
        try {
            let xpath = By.xpath(`${this.strRootXpath}//tbody//*[@id='c-table-reward-log-column-awarded-date-row-${positionRow}']//span`);
            let element = await this.getFieldType(xpath);
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("validate Awarded Date: ", [actualValue, expectedValue, "Incorrect Value!"]);

        } catch (error) {
            console.log(`validateAwardedDate`);
            console.log(error);
            return false;
        }
    }

    public async validatePoints(expectedValue: string, positionRow: number = 1) {
        try {
            let xpath = By.xpath(`${this.strRootXpath}//tbody//*[@id='c-table-reward-log-column-point-row-${positionRow}']//span`);
            let element = await this.getFieldType(xpath);
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("validate Points: ", [actualValue, expectedValue, "Incorrect Value!"]);

        } catch (error) {
            console.log(`validatePoints`);
            console.log(error);
            return false;
        }
    }

    public async validateComments(expectedValue: string, positionRow: number = 1) {
        try {
            let xpath = By.xpath(`${this.strRootXpath}//tbody//*[@id='c-table-reward-log-column-comments-row-${positionRow}']//span`);
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

    //#region get Value on list
    public async getAccountName(positionRow: number = 1) {
        try {
            let xpath = By.xpath(`${this.strRootXpath}//tbody//*[@id='c-table-reward-log-column-account-row-${positionRow}']//a`);
            let element = await this.getFieldType(xpath);
            return await element.getValue();
        } catch (error) {
            console.log(`getAccountName`);
            console.log(error);
            return "";
        }
    }

    public async getPolicyID(positionRow: number = 1) {
        try {
            let xpath = By.xpath(`${this.strRootXpath}//tbody//*[@id='c-table-reward-log-column-policy-number-row-${positionRow}']//span`);
            let element = await this.getFieldType(xpath);
            return await element.getValue();
        } catch (error) {
            console.log(`getPolicyID`);
            console.log(error);
            return "";
        }
    }

    public async getRewardName(positionRow: number = 1) {
        try {
            let xpath = By.xpath(`${this.strRootXpath}//tbody//*[@id='c-table-reward-log-column-reward-name-row-${positionRow}']//span`);
            let element = await this.getFieldType(xpath);
            return await element.getValue();
        } catch (error) {
            console.log(`getRewardName`);
            console.log(error);
            return "";
        }
    }

    public async getAwardedDate(positionRow: number = 1) {
        try {
            let xpath = By.xpath(`${this.strRootXpath}//tbody//*[@id='c-table-reward-log-column-awarded-date-row-${positionRow}']//span`);
            let element = await this.getFieldType(xpath);
            return await element.getValue();
        } catch (error) {
            console.log(`getAwardedDate`);
            console.log(error);
            return "";
        }
    }

    public async getPoints(positionRow: number = 1) {
        try {
            let xpath = By.xpath(`${this.strRootXpath}//tbody//*[@id='c-table-reward-log-column-point-row-${positionRow}']//span`);
            let element = await this.getFieldType(xpath);
            return await element.getValue();
        } catch (error) {
            console.log(`getPoints`);
            console.log(error);
            return "";
        }
    }

    public async getComments(positionRow: number = 1) {
        try {
            let xpath = By.xpath(`${this.strRootXpath}//tbody//*[@id='c-table-reward-log-column-comments-row-${positionRow}']//span`);
            let element = await this.getFieldType(xpath);
            return await element.getValue();
        } catch (error) {
            console.log(`getComments`);
            console.log(error);
            return "";
        }
    }
    //#endregion

    public async getPointsByRow(positionRow: number = 1) {
        try {
            let xpath = By.xpath(`${this.strRootXpath}//tbody//*[@id='c-table-reward-log-column-point-row-${positionRow}']//span`);
            let element = await this.getFieldType(xpath);
            return parseFloat((await element.getValue()).substring(1));
        } catch (error) {
            console.log(`validatePoints`);
            console.log(error);
            return 0;
        }
    }

    






















}

