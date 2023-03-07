import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { logInfoMessage, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";


/**
 * Application List in account detail
 */
export class ApplicationList {
    protected lblApplicationName = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[1]//app-general-name-column//a`);
    protected lblApplicationPeriod = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[1]//td[1]//small/span[2]`);
    protected lblFrameAgmtNo = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[1]//td[2]//*[text()]`);
    protected lblDebtor = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[1]//td[3]//*[text()]`);
    protected lblProduct = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[1]//td[4]//*[text()]`);
    protected lblBeneficiary = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[1]//td[5]//*[text()]`);
    protected lblStatus = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[1]//td[6]//*[text()]`);

    constructor(protected driverService: SeleniumWebDriverService) { }

    //#region Validate value
    public async validateApplicationsNameValueOnList(ExpectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
        try {
            let lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//app-general-name-column//a`);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.waitUntilElementLoaded(lblValue);
            let ActualValue = await this.driverService.getText(lblValue);
            if (isUsedForSearch) {
                return ActualValue.toLowerCase().includes(ExpectedValue.toLowerCase());
            }
            return await this.driverService.validateRecord(`Validate Application Name`, [ActualValue, ExpectedValue, `Incorrect Application Name`]);
        } catch (error) {
            console.log(`validateApplicationsNameValueOnList`);
            console.log(error);
            return false;
        }
    }

    public async validateApplicationsPeriodValueOnList(ExpectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
        try {
            let lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//td[1]//small/span[2]`);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.waitUntilElementLoaded(lblValue);
            let ActualValue = await this.driverService.getText(lblValue);
            if (isUsedForSearch) {
                return ActualValue.toLowerCase().includes(ExpectedValue.toLowerCase());
            }
            return await this.driverService.validateRecord(`Validate Application Period`, [ActualValue, ExpectedValue, `Incorrect Application Period`]);
        } catch (error) {
            console.log(`validateApplicationsPeriodValueOnList`);
            console.log(error);
            return false;
        }
    }

    public async validateFrameAgmtNoValueOnList(ExpectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
        try {
            let lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//td[2]//*[text()]`);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.waitUntilElementLoaded(lblValue);
            let ActualValue = await this.driverService.getText(lblValue);
            if (isUsedForSearch) {
                return ActualValue.toLowerCase().includes(ExpectedValue.toLowerCase());
            }
            return await this.driverService.validateRecord(`Validate Frame Agmt No`, [ActualValue, ExpectedValue, `Incorrect Frame Agmt No`]);
        } catch (error) {
            console.log(`validateFrameAgmtNoValueOnList`);
            console.log(error);
            return false;
        }
    }

    public async validateDebtorValueOnList(ExpectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
        try {
            let lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//td[3]//*[text()]`);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.waitUntilElementLoaded(lblValue);
            let ActualValue = await this.driverService.getText(lblValue);
            if (isUsedForSearch) {
                return ActualValue.toLowerCase().includes(ExpectedValue.toLowerCase());
            }
            return await this.driverService.validateRecord(`Validate Debtor`, [ActualValue, ExpectedValue, `Incorrect Debtor`]);
        } catch (error) {
            console.log(`validateDebtorValueOnList`);
            console.log(error);
            return false;
        }
    }

    public async validateProductValueOnList(ExpectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
        try {
            let lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//app-guarantee-product-col//*[text()]`);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.waitUntilElementLoaded(lblValue);
            let ActualValue = await this.driverService.getText(lblValue);
            if (isUsedForSearch) {
                return ActualValue.toLowerCase().includes(ExpectedValue.toLowerCase());
            }
            return await this.driverService.validateRecord(`Validate Product`, [ActualValue, ExpectedValue, `Incorrect Product`]);
        } catch (error) {
            console.log(`validateProductValueOnList`);
            console.log(error);
            return false;
        }
    }

    public async validateBenificiaryValueOnList(ExpectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
        try {
            let lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//td[5]//*[text()]`);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.waitUntilElementLoaded(lblValue);
            let ActualValue = await this.driverService.getText(lblValue);
            if (isUsedForSearch) {
                return ActualValue.toLowerCase().includes(ExpectedValue.toLowerCase());
            }
            return await this.driverService.validateRecord(`Validate Beneficiary`, [ActualValue, ExpectedValue, `Incorrect Beneficiary`]);
        } catch (error) {
            console.log(`validateBenificiaryValueOnList`);
            console.log(error);
            return false;
        }
    }

    public async validateStatusValueOnList(ExpectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
        try {
            let lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//td[6]//*[text()]`);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.waitUntilElementLoaded(lblValue);
            let ActualValue = await this.driverService.getText(lblValue);
            if (isUsedForSearch) {
                return ActualValue.toLowerCase().includes(ExpectedValue.toLowerCase());
            }
            return await this.driverService.validateRecord(`Validate Status`, [ActualValue, ExpectedValue, `Incorrect Status`]);
        } catch (error) {
            console.log(`validateStatusValueOnList`);
            console.log(error);
            return false;
        }
    }

    //#endregion

    //#region Open Form
    public async openApplicationDetailByRow(positionRow: number) {
        try {
            const lblApplicationName = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//app-general-name-column`);
            await this.driverService.waitUntilElementLoaded(lblApplicationName);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 3000);
            await this.driverService.click(lblApplicationName);
            return true;
        } catch (error) {
            console.log('openApplicationDetailByRow');
            console.log(error);
            return false;
        }
    }
    //#endregion

    public async getValueFrameAgmtNoOnList(positionRow: number = 1) {
        try {
            let lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//td[2]//*[text()]`);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.waitUntilElementLoaded(lblValue);
            const ActualValue = await this.driverService.getText(lblValue);
            return ActualValue;
        } catch (error) {
            console.log(`getValueFrameAgmtNoOnList`);
            console.log(error);
            return "";
        }
    }

    public async getValueProductOnList(positionRow: number = 1) {
        try {
            let lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//app-guarantee-product-col//*[text()]`);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.waitUntilElementLoaded(lblValue);
            const ActualValue = await this.driverService.getText(lblValue);
            return ActualValue;
        } catch (error) {
            console.log(`getValueProductOnList`);
            console.log(error);
            return "";
        }
    }

    public async getValueApplicationNoOnList(positionRow: number = 1) {
        try {
            let lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//td[1]//*[text()]`);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.waitUntilElementLoaded(lblValue);
            const ActualValue = await this.driverService.getText(lblValue);
            return ActualValue;
        } catch (error) {
            console.log(`getValueApplicationNoOnList`);
            console.log(error);
            return "";
        }
    }
    public async validateApplicationNoOnApplicationList(ExpectedValue:string ,positionRow: number = 1) {
        try {
            let lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//td[1]//*[text()]`);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.waitUntilElementLoaded(lblValue);
            const ActualValue = await this.driverService.getText(lblValue);
            return await this.driverService.validateRecord("Validate Application No: ", [ActualValue, ExpectedValue, "Incorrect Application No!"]);
        } catch (error) {
            console.log(`validateApplicationNoOnApplicationList`);
            console.log(error);
            return false;
        }
    }


}