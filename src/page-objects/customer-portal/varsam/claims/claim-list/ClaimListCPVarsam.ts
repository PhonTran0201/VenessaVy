import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";

export class ClaimListCPVarsam {
    protected readonly driverService = SeleniumWebDriverService.getInstance();

    // Header
    private btnRegisterClaim = By.xpath("//app-claims//a[@href='/claims/register-claim']");
    private lblTitle = By.xpath("//app-claims//h2[contains(@class,'title-page')]");

    // Search
    private txtSearch = By.xpath("//app-claims//input[@type='search']");
    private btnSearch = By.xpath("//app-claims//button[@type='submit']");


    //#region Method on Header
    public async pressRegisterClaimButton() {
        try {
            await this.driverService.waitUntilElementVisible(this.btnRegisterClaim);
            await this.driverService.click(this.btnRegisterClaim);
            return true;
        } catch (error) {
            console.log('pressRegisterClaimButton');
            console.log(error);
            return false;
        }
    }
    public async validateValueTitle(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.lblTitle);
            const actualValue = await this.driverService.getText(this.lblTitle);
            return await this.driverService.validateRecord('Validate Title!',
                [actualValue, expectedValue, 'Incorrect Title!']);
        } catch (error) {
            console.log('validateValueTitle');
            console.log(error);
            return false;
        }
    }
    //#endregion


    //#region Method Search
    public async inputSearch(value: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.txtSearch);
            await this.driverService.setText(this.txtSearch, value);
            return true;
        } catch (error) {
            console.log('inputSearch');
            console.log(error);
            return false;
        }
    }
    public async pressSearchButton() {
        try {
            await this.driverService.waitUntilElementVisible(this.btnSearch);
            await this.driverService.click(this.btnSearch);
            return true;
        } catch (error) {
            console.log('pressSearchButton');
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region Method on List
    public async validateValueClaimId(expectedValue: string, positionRow: number = 1, isUsedForSearch = false) {
        try {
            const lblActualValue = By.xpath(`//app-claims//tbody//tr[${positionRow}]//td[contains(@class,'claim-id')]//a`);
            await this.driverService.waitUntilElementVisible(lblActualValue);
            const actualValue = await this.driverService.getText(lblActualValue);
            if (isUsedForSearch) {
                return await this.driverService.validateRecordUsedForSearch('Validate Claim Id!',
                    [actualValue, expectedValue, 'Incorrect Claim Id!']);
            }
            return await this.driverService.validateRecord('Validate Claim Id!',
                [actualValue, expectedValue, 'Incorrect Claim Id!']);
        } catch (error) {
            console.log('validateValueClaimId');
            console.log(error);
            return false;
        }
    }

    public async validateValueClaimDate(expectedValue: string, positionRow: number = 1) {
        try {
            const lblActualValue = By.xpath(`//app-claims//tbody//tr[${positionRow}]//td[2]//*[text()]`);
            await this.driverService.waitUntilElementVisible(lblActualValue);
            const actualValue = await this.driverService.getText(lblActualValue);
            //Maximize delay time is 3 minutes.
            if (actualValue.localeCompare(expectedValue) !== 0) {
                if (Number(expectedValue.substring(14, 16)) - Number(actualValue.substring(14, 16)) < 3) {
                    expectedValue = actualValue;
                }
            }
            return await this.driverService.validateRecord('Validate Claim Date!',
                [actualValue, expectedValue, 'Incorrect Claim Date!']);
        } catch (error) {
            console.log('validateValueClaimDate');
            console.log(error);
            return false;
        }
    }

    public async validateValueInsuredObject(expectedValue: string, positionRow: number = 1, isUsedForSearch = false) {
        try {
            const lblActualValue = By.xpath(`//app-claims//tbody//tr[${positionRow}]//td//app-policy-id-and-insured-object-col//*[text()]`);
            await this.driverService.waitUntilElementVisible(lblActualValue);
            const actualValue = await this.driverService.getText(lblActualValue);
            if (isUsedForSearch) {
                return await this.driverService.validateRecordUsedForSearch('Validate Insured Object!',
                    [actualValue, expectedValue, 'Incorrect Insured Object!']);
            }
            return await this.driverService.validateRecord('Validate Insured Object!',
                [actualValue, expectedValue, 'Incorrect Insured Object!']);
        } catch (error) {
            console.log('validateValueInsuredObject');
            console.log(error);
            return false;
        }
    }

    public async validateValueProgress(expectedValue: string, positionRow: number = 1) {
        try {
            const lblActualValue = By.xpath(`//app-claims//tbody//tr[${positionRow}]//td//app-claim-progress-col//div[@data-percent]`);
            await this.driverService.waitUntilElementVisible(lblActualValue);
            const actualValue = await this.driverService.getAttributeValue(lblActualValue, 'data-percent');
            return await this.driverService.validateRecord('Validate !',
                [actualValue, expectedValue, 'Incorrect !']);
        } catch (error) {
            console.log('validateValueProgress');
            console.log(error);
            return false;
        }
    }

    public async validateValueStatus(expectedValue: string, positionRow: number = 1) {
        try {
            const lblActualValue = By.xpath(`//app-claims//tbody//tr[${positionRow}]//td//app-claim-status-col//*[text()]`);
            await this.driverService.waitUntilElementVisible(lblActualValue);
            const actualValue = await (await this.driverService.getText(lblActualValue)).trim();
            return await this.driverService.validateRecord('Validate Status!',
                [actualValue, expectedValue, 'Incorrect Status!']);
        } catch (error) {
            console.log('validateValueStatus');
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region Get Value Claim list
    public async getClaimIdByRow(positionRow = 1) {
        try {
            const lblClaimId = By.xpath(`(//tbody//tr[1]//app-claim-id-col/a)[${positionRow}]`);
            await this.driverService.waitUntilElementVisible(lblClaimId);
            const result = await this.driverService.getText(lblClaimId);
            return result;
        } catch (error) {
            console.log('getClaimIdByRow');
            console.log(error);
            return '';
        }
    }
    //#endregion
}