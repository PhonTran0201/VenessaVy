import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";
import { GuaranteeList } from "../../../../back-office-portal/guarantee/guarantee/guarantee-list/GuaranteeList";

/**
 * Guarantee List
 */
export class GuaranteeListCP extends GuaranteeList{
    //Search field
    protected txtEnterSearchKeyword = By.xpath("//app-guarantee-list//input[@placeholder='Enter search keyword']");
    protected btnSearch = By.xpath("//app-guarantee-list//div[./input[@placeholder='Enter search keyword']]//i[contains(@class,'fa-search')]");


    protected lblGuaranteeName = By.xpath(`//app-guarantee-list//tr[1]//app-guarantee-name-column/a`);
    protected lblIssuedDate = By.xpath(`//app-guarantee-list//tr[1]//app-guarantee-name-column//span[@title]`);
    protected lblDebtor = By.xpath(`//app-guarantee-list//tr[1]//td[contains(@class,'name-col')][1]/*[text()]`);
    protected lblProduct = By.xpath(`//app-guarantee-list//tr[1]//td[contains(@class,'product-col')][1]/*[text()]`);
    protected lblTotalGuaranteeFee = By.xpath(`//app-guarantee-list//tr[1]//app-application-fee-col/div[contains(@title,'Total Guarantee Fee')]/span[2]`);
    protected lblOtherFee = By.xpath(`//app-guarantee-list//tr[1]//app-application-fee-col/div[contains(@title,'Other Fee')]/span[2]`);
    protected lblCurrentPhase = By.xpath(`//app-guarantee-list//tr[1]//app-guarantee-current-phase-column/p/span`);
    protected lblAmount = By.xpath(`//app-guarantee-list//tr[1]//app-guarantee-current-phase-column/span`);
    protected lblStatus = By.xpath(`//app-guarantee-list//tr[1]//app-guarantee-name-column/div`);

    constructor(driverService: SeleniumWebDriverService) { 
        super(driverService);
    }

    //#region Validate value
    public async validateGuaranteeNameValueOnList(ExpectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
        try {
            let lblValue = By.xpath(`//app-guarantee-list//tr[${positionRow}]//app-guarantee-name-column/a`);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.waitUntilElementLoaded(lblValue);
            let ActualValue = await this.driverService.getText(lblValue);
            if (isUsedForSearch) {
                return ActualValue.toLowerCase().includes(ExpectedValue.toLowerCase());
            }
            return await this.driverService.validateRecord(`Validate Guarantee Name`,
                [ActualValue, ExpectedValue, `Incorrect Guarantee Name`]
            );
        } catch (error) {
            console.log(`validateGuaranteeNameValueOnList`);
            console.log(error);
            return false;
        }
    }

    public async validateGuaranteeIssuedDateValueOnList(ExpectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
        try {
            let lblValue = By.xpath(`//app-guarantee-list//tr[${positionRow}]//app-guarantee-name-column//span[@title]`);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.waitUntilElementLoaded(lblValue);
            let ActualValue = await (await this.driverService.getText(lblValue)).trim();
            if (isUsedForSearch) {
                return ExpectedValue.toLowerCase().includes(ActualValue.toLowerCase());
            }
            return await this.driverService.validateRecord(`Validate Issued date`,
                [ActualValue, ExpectedValue, `Incorrect Issued date`]
            );
        } catch (error) {
            console.log(`validateGuaranteeIssuedDateValueOnList`);
            console.log(error);
            return false;
        }
    }

    public async validateDebtorValueOnList(ExpectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
        try {
            let lblValue = By.xpath(`//app-guarantee-list//tr[${positionRow}]//td[contains(@class,'name-col')][1]/*[text()]`);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.waitUntilElementLoaded(lblValue);
            let ActualValue = await this.driverService.getText(lblValue);
            if (isUsedForSearch) {
                return ActualValue.toLowerCase().includes(ExpectedValue.toLowerCase());
            }
            return await this.driverService.validateRecord(`Validate Debtor`,
                [ActualValue, ExpectedValue, `Incorrect Debtor`]
            );
        } catch (error) {
            console.log(`validateDebtorValueOnList`);
            console.log(error);
            return false;
        }
    }

    public async validateProductValueOnList(ExpectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
        try {
            let lblValue = By.xpath(`//app-guarantee-list//tr[${positionRow}]//td[contains(@class,'product-col')][1]/*[text()]`);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.waitUntilElementLoaded(lblValue);
            let ActualValue = await this.driverService.getText(lblValue);
            if (isUsedForSearch) {
                return ActualValue.toLowerCase().includes(ExpectedValue.toLowerCase());
            }
            return await this.driverService.validateRecord(`Validate Product`,
                [ActualValue, ExpectedValue, `Incorrect Product`]
            );
        } catch (error) {
            console.log(`validateProductValueOnList`);
            console.log(error);
            return false;
        }
    }

    public async validateTotalGuaranteeFeeValueOnList(ExpectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
        try {
            let lblValue = By.xpath(`//app-guarantee-list//tr[${positionRow}]//app-application-fee-col/div[contains(@title,'Total Guarantee Fee')]/span[2]`);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.waitUntilElementLoaded(lblValue);
            let ActualValue = await this.driverService.getText(lblValue);
            if (isUsedForSearch) {
                return ActualValue.toLowerCase().includes(ExpectedValue.toLowerCase());
            }
            return await this.driverService.validateRecord(`Validate TotalGuaranteeFee`,
                [ActualValue, ExpectedValue, `Incorrect TotalGuaranteeFee`]
            );
        } catch (error) {
            console.log(`validateTotalGuaranteeFeeValueOnList`);
            console.log(error);
            return false;
        }
    }
    public async validateOtherFeeValueOnList(ExpectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
        try {
            let lblValue = By.xpath(`//app-guarantee-list//tr[${positionRow}]//app-application-fee-col/div[contains(@title,'Other Fee')]/span[2]`);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.waitUntilElementLoaded(lblValue);
            let ActualValue = await this.driverService.getText(lblValue);
            if (isUsedForSearch) {
                return ActualValue.toLowerCase().includes(ExpectedValue.toLowerCase());
            }
            return await this.driverService.validateRecord(`Validate OtherFee`,
                [ActualValue, ExpectedValue, `Incorrect OtherFee`]
            );
        } catch (error) {
            console.log(`validateOtherFeeValueOnList`);
            console.log(error);
            return false;
        }
    }
    public async validateCurrentPhaseValueOnList(ExpectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
        try {
            let lblValue = By.xpath(`//app-guarantee-list//tr[${positionRow}]//app-guarantee-current-phase-column/p/span`);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.waitUntilElementLoaded(lblValue);
            let ActualValue = await this.driverService.getText(lblValue);
            if (isUsedForSearch) {
                return ActualValue.toLowerCase().includes(ExpectedValue.toLowerCase());
            }
            return await this.driverService.validateRecord(`Validate CurrentPhase`,
                [ActualValue, ExpectedValue, `Incorrect CurrentPhase`]
            );
        } catch (error) {
            console.log(`validateCurrentPhaseValueOnList`);
            console.log(error);
            return false;
        }
    }

    public async validateAmountValueOnList(ExpectedValue: string, positionRow: number = 1) {
        try {
            let lblValue = By.xpath(`//app-guarantee-list//tr[${positionRow}]//app-guarantee-current-phase-column/span`);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.waitUntilElementLoaded(lblValue);
            let ActualValue = await this.driverService.getAttributeValue(lblValue, 'title');
            return await this.driverService.validateRecord(`Validate Amount`,
                [ActualValue, ExpectedValue, `Incorrect Amount`]
            );
        } catch (error) {
            console.log(`validateAmountValueOnList`);
            console.log(error);
            return false;
        }
    }

    public async validateStatusValueOnList(ExpectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
        try {
            let lblValue = By.xpath(`//app-guarantee-list//tr[${positionRow}]//app-guarantee-name-column/div`);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.waitUntilElementLoaded(lblValue);
            let ActualValue = await this.driverService.getText(lblValue);
            if (isUsedForSearch) {
                return ActualValue.toLowerCase().includes(ExpectedValue.toLowerCase());
            }
            return await this.driverService.validateRecord(`Validate Status`,
                [ActualValue, ExpectedValue, `Incorrect Status`]
            );
        } catch (error) {
            console.log(`validateStatusValueOnList`);
            console.log(error);
            return false;
        }
    }

    public async validateCreatedByValueOnList(ExpectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
        try {
            let lblValue = By.xpath(`//app-guarantee-list//tr[${positionRow}]//td[contains(@class,'name-col')][2]/*[text()]`);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.waitUntilElementLoaded(lblValue);
            let ActualValue = await this.driverService.getText(lblValue);
            if (isUsedForSearch) {
                return ActualValue.toLowerCase().includes(ExpectedValue.toLowerCase());
            }
            return await this.driverService.validateRecord(`Validate CreatedBy`,
                [ActualValue, ExpectedValue, `Incorrect CreatedBy`]
            );
        } catch (error) {
            console.log(`validateCreatedByValueOnList`);
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region Get value
    public async getValueGuaranteeNoOnList(positionRow: number = 1) {
        try {
            let lblValue = By.xpath(`//app-guarantee-list//tr[${positionRow}]//app-guarantee-name-column/a`);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.waitUntilElementLoaded(lblValue);
            const ActualValue = await this.driverService.getText(lblValue);
            return ActualValue;
        } catch (error) {
            console.log(`getValueGuaranteeNoOnList`);
            console.log(error);
            return "";
        }
    }

    public async getValueGuaranteeNoByStatusOnList(status: string) {
        try {
            let lblValue = By.xpath(`//app-guarantee-list//tr//app-guarantee-name-column[./div[text()='${status}']]//a`);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.waitUntilElementLoaded(lblValue);
            const ActualValue = await this.driverService.getText(lblValue);
            return ActualValue;
        } catch (error) {
            console.log(`getValueGuaranteeNoByStatusOnList`);
            console.log(error);
            return "";
        }
    }

    public async openGuaranteeByRowInGuaranteeList(positionRow: number = 1) {
        try {
            const lblGuaranteeNo = By.xpath(`//app-guarantee-list//tr[${positionRow}]//app-guarantee-name-column//a`);
            await this.driverService.waitForElementEnabled(lblGuaranteeNo);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.click(lblGuaranteeNo);
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true;
        } catch (error) {
            console.log("openGuaranteeByRowInGuaranteeList");
            console.log(error);
            return false;
        }
    }
    //#endregion
    //#region Search Guarantee
    public async inputSearchKeywordGuarantee(guaranteeName: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtEnterSearchKeyword);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.txtEnterSearchKeyword, guaranteeName);
            return true;
        } catch (error) {
            console.log('inputSearchKeywordGuarantee');
            console.log(error);
            return false;
        }
    }

    public async pressSearchGuarantee() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnSearch);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.click(this.btnSearch);
            return true;
        } catch (error) {
            console.log('pressSearchGuarantee');
            console.log(error);
            return false;
        }
    }
    //#endregion
}
