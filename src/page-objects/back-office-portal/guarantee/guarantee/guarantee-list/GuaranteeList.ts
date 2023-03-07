import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { getIndexByColumnNameSubTab, waitUntilHorizontalProgressBarLoaded_v2, waitUntilHorizontalProgressBarLoaded, logInfoMessage } from "../../../../../shared/functions";

/**
 * Guarantee List in account detail
 */
export class GuaranteeList {
    //Search field
    protected txtEnterSearchKeyword = By.xpath("//app-customer-guarantee-list//input[@placeholder='Enter search keyword']");
    protected btnSearch = By.xpath("//app-customer-guarantee-list//div[./input[@placeholder='Enter search keyword']]//i[contains(@class,'fa-search')]");

    protected btnTerminate = By.xpath(`//app-customer-guarantee-list//tr[1]//button[contains(@id,'terminate')]`);
    protected btnDownloadDocument = By.xpath(`//app-customer-guarantee-list//tr[1]//button[contains(@id,'download')]`);
    protected lblGuaranteeName = By.xpath(`//app-customer-guarantee-list//tr[1]//app-guarantee-name-column/a`);
    protected lblIssuedDate = By.xpath(`//app-customer-guarantee-list//tr[1]//app-guarantee-name-column//span[@title]`);
    protected lblDebtor = By.xpath(`//app-customer-guarantee-list//tr[1]//td[${getIndexByColumnNameSubTab("Debtor")}]//*[text()]`);
    protected lblBeneficiary = By.xpath(`//app-customer-guarantee-list//tr[1]//td[${getIndexByColumnNameSubTab("Beneficiary")}]//*[text()]`);
    protected lblContactCommitment = By.xpath(`//app-customer-guarantee-list//tr[1]//td[${getIndexByColumnNameSubTab("Contract commitment")}]//*[text()]`);
    protected lblCurrentPhase = By.xpath(`//app-customer-guarantee-list//tr[1]//td[${getIndexByColumnNameSubTab("Current phase")}]//*[text()]`);
    protected lblAmount = By.xpath(`//app-customer-guarantee-list//tr[1]//td[${getIndexByColumnNameSubTab("Amount")}]//*[text()]`);
    protected lblGuaranteeRate = By.xpath(`//app-customer-guarantee-list//tr[1]//td[${getIndexByColumnNameSubTab("Guarantee rate")}]//*[text()]`);
    protected lblGuaranteeFee = By.xpath(`//app-customer-guarantee-list//tr[1]//td[${getIndexByColumnNameSubTab("Guarantee fee")}]//*[text()]`);
    protected lblStatus = By.xpath(`//app-customer-guarantee-list//tr[1]//td[${getIndexByColumnNameSubTab("Status")}]//*[text()]`);

    constructor(protected driverService: SeleniumWebDriverService) { }

    //#region Validate value
    public async validateGuaranteeNameValueOnList(ExpectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
        try {
            let lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//app-guarantee-name-column//a`);
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
            let lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//td[3]//span[2]`);
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
            let lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//td[4]//*[text()]`);
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

    public async validateBeneficiaryValueOnList(ExpectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
        try {
            let lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//td[5]//*[text()]`);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.waitUntilElementLoaded(lblValue);
            let ActualValue = await this.driverService.getText(lblValue);
            if (isUsedForSearch) {
                return ActualValue.toLowerCase().includes(ExpectedValue.toLowerCase());
            }
            return await this.driverService.validateRecord(`Validate Beneficiary`,
                [ActualValue, ExpectedValue, `Incorrect Beneficiary`]
            );
        } catch (error) {
            console.log(`validateBeneficiaryValueOnList`);
            console.log(error);
            return false;
        }
    }

    public async validateContactCommitmentValueOnList(ExpectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
        try {
            let lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//td[6]//*[text()]`);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.waitUntilElementLoaded(lblValue);
            let ActualValue = await this.driverService.getText(lblValue);
            if (isUsedForSearch) {
                return ActualValue.toLowerCase().includes(ExpectedValue.toLowerCase());
            }
            return await this.driverService.validateRecord(`Validate Contact Commitment`,
                [ActualValue, ExpectedValue, `Incorrect Contact Commitment`]
            );
        } catch (error) {
            console.log(`validateContactCommitmentValueOnList`);
            console.log(error);
            return false;
        }
    }

    public async validateCurrentPhaseValueOnList(ExpectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
        try {
            let lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//td[7]//*[text()]`);
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
            let lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//td[8]//*[text()]`);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.waitUntilElementLoaded(lblValue);
            let ActualValue = await this.driverService.getText(lblValue);
            return await this.driverService.validateRecord(`Validate Amount`,
                [ActualValue, ExpectedValue, `Incorrect Amount`]
            );
        } catch (error) {
            console.log(`validateAmountValueOnList`);
            console.log(error);
            return false;
        }
    }

    public async validateGuaranteeRateValueOnList(ExpectedValue: string, positionRow: number = 1) {
        try {
            
            let ExpectedValue2 = parseFloat(ExpectedValue).toFixed(1).toString();
            let lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//td[9]//*[text()]`);
            await this.driverService.waitUntilElementLoaded(lblValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualValue = await this.driverService.getText(lblValue);
            let ActualValue2 = parseFloat(ActualValue.substring(0, ActualValue.length - 1)).toFixed(1).toString();
            return await this.driverService.validateRecord(`Validate GuaranteeRate`,
                [ActualValue2, ExpectedValue2, `Incorrect GuaranteeRate`]
            );
        } catch (error) {
            console.log(`validateGuaranteeRateValueOnList`);
            console.log(error);
            return false;
        }
    }

    public async validateGuaranteeFeeValueOnList(ExpectedValue: string, positionRow: number = 1) {
        try {
            let lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//td[10]//*[text()]`);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.waitUntilElementLoaded(lblValue);
            let ActualValue = await this.driverService.getText(lblValue);
            // if (isUsedForSearch) {
            //     return ActualValue.toLowerCase().includes(ExpectedValue.toLowerCase());
            // }
            return await this.driverService.validateRecord(`Validate GuaranteeFee`,
                [ActualValue, ExpectedValue, `Incorrect GuaranteeFee`]
            );
        } catch (error) {
            console.log(`validateGuaranteeFeeValueOnList`);
            console.log(error);
            return false;
        }
    }

    public async validateStatusValueOnList(ExpectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
        try {
            let lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//td[11]//*[text()]`);
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
    //#endregion

    public async getValueGuaranteeNoOnList(positionRow: number = 1) {
        try {
            let lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//app-guarantee-name-column//a`);
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

    public async validateGuaranteeNoOnGuaranteeList(ExpectedValue : string, positionRow: number = 1) {
        try {
            let lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//app-guarantee-name-column//a`);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.waitUntilElementLoaded(lblValue);
            const ActualValue = await this.driverService.getText(lblValue);
            return await this.driverService.validateRecord("Validate GuaranteeNo: ",[ActualValue, ExpectedValue, "Incorrect GuaranteeNo!"]);
        } catch (error) {
            console.log(`validateGuaranteeNoOnGuaranteeList`);
            console.log(error);
            return false;
        }
    }

    public async getValueGuaranteeNoByStatusOnList(status: string) {
        try {
            let lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[.//app-guarantee-status-col/div[text()=' ${status} ']]//app-guarantee-name-column//a`);
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

    public async openGuaranteeByRowInGuaranteeList(posisionRow: number = 1) {
        try {
            const lblGuaranteeNo = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${posisionRow}]//app-guarantee-name-column/a`);
            await this.driverService.waitForElementEnabled(lblGuaranteeNo);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.scrollElementToView(await this.driverService.findElement(lblGuaranteeNo));
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await this.driverService.click(lblGuaranteeNo);
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true;
        } catch (error) {
            console.log("openGuaranteeByRowInGuaranteeList");
            console.log(error);
            return false;
        }
    }

    public async findContactCommitmentValueOnList(ExpectedValue: string, positionRow: number = 1) {
        try {
            let lblValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody//tr[${positionRow}]//td[6]//*[text()]`);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.waitUntilElementLoaded(lblValue);
            let ActualValue = await this.driverService.getText(lblValue);
            logInfoMessage(`Finding ${ExpectedValue} on line ${positionRow}....`);
            if (ExpectedValue.localeCompare(ActualValue) === 0) {
                return true;
            }
            return false;
        } catch (error) {
            console.log(`findContactCommitmentValueOnList`);
            console.log(error);
            return false;
        }
    }
    
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

    public async clickReplicateButtonByRowOnGuaranteeList(posisionRow:number = 1){
        try {
            let btn = By.xpath(`//*[contains(local-name(),'list')]//table//tbody//tr[${posisionRow}]//app-guarantee-list-act-cell//button[./i[contains(@class,'fa-clone')]]`);
            await this.driverService.waitForElementEnabled(btn);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService,10);
            await this.driverService.click(btn);
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true;
        } catch (error) {
            console.log('clickReplicateButtonByRowOnGuaranteeList');
            console.log(error);
            return false;
        }
    }
    //#endregion
}
