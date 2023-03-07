import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";
import { selectDropdownOption, waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";


export class SaleCard extends BasePage {
    //Elements at Sale Card view
    private cmbPipelineFilter = By.xpath("//input[@id='pgs-sale-card-sales-type']");

    //Dropdown at Sale card
    private cmbSaleCardType = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//*[@id='pgs-sale-card-sales-rep']`);

    private cmbSelectFilter = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-sale-card-list//input[@id='pgs-filter-dropdown-value']`);
    private btnClearSelectFilter = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-sale-card-list//ng-select[.//input[contains(@id,"filter-dropdown")]]//span[@title='Clear all']`);

    private btnRefreshColumnCardview = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//em[contains(@class,'fa-sync')]`);
    private btnSeeMoreButtonCardview = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//button/i[contains(@class,'fa-angle-double-down')]`);

    public async selectPipelineFilterSaleCardView(pipeline: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbPipelineFilter);
            await this.driverService.setText(this.cmbPipelineFilter, pipeline);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await selectDropdownOption(pipeline, "", this.driverService);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true;
        } catch (error) {
            console.log("selectPipelineFilterSaleCardView");
            console.log(error);
            return false;
        }
    }

    public async inputDropdownSaleCardType(typeName: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbSaleCardType);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await this.driverService.setText(this.cmbSaleCardType, typeName);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await selectDropdownOption(typeName, "", this.driverService);

            return true;
        } catch (error) {
            console.log("inputDropdownSaleCardType");
            console.log(error);
            return false;
        }
    }

    public async checkColumnExistByNameAtSaleCardview(stageName: string) {
        const lblStageName = By.xpath(`//app-sale-card-list//header//h6//*[text()='${stageName}']`);
        return await this.driverService.isExisted(lblStageName);
    }

    public async getArrayStageName() {
        try {
            const result: string[] = [];
            const col = By.xpath(`//app-sale-card-list//*[contains(@class,'card-col')]/header//h6/span[text()]`);
            await this.driverService.waitUntilElementVisible(col);
            const len = await (await this.driverService.findElements(col)).length;
            for (let i = 1; i <= len; i++) {
                const temp = By.xpath(`(//app-sale-card-list//*[contains(@class,'card-col')]/header//h6/span[text()])[${i}]`);
                result.push(await this.driverService.getText(temp));
            }
            return result;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    public async pressSeeMoreButtonCardview() {
        try {
            await this.driverService.waitUntilElementVisible(this.btnRefreshColumnCardview);
            for (let i = 1; i <= 50; i++) {
                if (await this.driverService.isExisted(this.btnSeeMoreButtonCardview)) {
                    await this.driverService.click(this.btnSeeMoreButtonCardview);
                    await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
                }
                else {
                    break;
                }
            }
            return true;
        } catch (error) {
            console.log('pressSeeMoreButtonCardview');
            console.log(error);
            return false;
        }
    }

    public async getNumberItemSalesCard(stageName: string) {
        try {
            const itemCard = By.xpath(`//app-sale-card-list//*[contains(@class,'card-col') and ./header//h6/span[text()='${stageName}']]//app-sale-card`);
            await this.driverService.waitUntilElementVisible(itemCard);
            const len = await (await this.driverService.findElements(itemCard)).length;
            return len;
        } catch (error) {
            console.log('getNumberItemSalesCard');
            console.log(error);
            return -1;
        }
    }

    public async getTotalNumberItemsSalesCard() {
        try {
            const itemCard = By.xpath(`//app-sale-card-list//*[contains(@class,'card-col') and ./header//h6/span[text()]]//app-sale-card`);
            await this.driverService.waitUntilElementVisible(itemCard);
            const len = await (await this.driverService.findElements(itemCard)).length;
            return len;
        } catch (error) {
            console.log('getNumberOfTotalItemsSalesCard');
            console.log(error);
            return -1;
        }
    }

    public async getArrayTotalDealAmount(stageName: string) {
        try {
            let result: string[] = [];
            let temp = By.xpath(`//div[contains(@class,'card-col') and .//h6/span[text()='${stageName}']]//app-sale-card//div[./span[text()='Total Deal Amount:']]/span[2]`);
            const element = await this.getFieldType(temp);
            const len = await (await this.driverService.findElements(temp)).length;
            for (let i = 1; i <= len; i++) {
                temp = By.xpath(`(//div[contains(@class,'card-col') and .//h6/span[text()='${stageName}']]//app-sale-card//div[./span[text()='Total Deal Amount:']]/span[2])[${i}]`);
                result.push(await this.driverService.getText(temp));
            }
            return result;
        } catch (error) {
            console.log('getArrayTotalDealAmount');
            console.log(error);
            return [];
        }
    }

    public async verifyInfoStageColumnAtSaleCarview(stageName: string, numberOfSales: string, totalAmount: string, annualContact: string) {
        try {
            const lblNumberOfSales = By.xpath(`//app-sale-card-list//*[contains(@class,'card-col') and ./header//h6/span[text()='${stageName}']]//*[contains(@class,'sales-items-total')]`);
            const lblTotalAmount = By.xpath(`//app-sale-card-list//*[contains(@class,'card-col') and ./header//h6/span[text()='${stageName}']]//app-sale-card-currency-value-list[1]//span[2]`);
            const lblAnnualContract = By.xpath(`//app-sale-card-list//*[contains(@class,'card-col') and ./header//h6/span[text()='${stageName}']]//app-sale-card-currency-value-list[2]//span[2]`);

            const actualNumberOfSales = await this.driverService.getText(lblNumberOfSales);
            const actualTotalAmount = await this.driverService.getText(lblTotalAmount);
            const actualAnnualContract = await this.driverService.getText(lblAnnualContract);

            // In case of you don't want to verify each fields below
            if (!numberOfSales) numberOfSales = actualNumberOfSales;
            if (!totalAmount) totalAmount = actualTotalAmount;
            if (!annualContact) annualContact = actualAnnualContract;

            return await this.driverService.validateRecord("Verify info column sale card view",
                [actualNumberOfSales, numberOfSales, "Incorrect number of sales!"],
                [actualTotalAmount, totalAmount, "Incorrect total amount!"],
                [actualAnnualContract, annualContact, "Incorrect annual contract!"]
            );
        } catch (error) {
            console.log("verifyInfoStageColumnAtSaleCarview");
            console.log(error);
            return false;
        }
    }

    public async dragAndDropSaleCardView(saleName: string, sourceColumnName: string, destinationColumnName: string): Promise<boolean> {
        try {
            const saleToDragAndDrop = By.xpath(`//app-sale-card-list//div[header//h6/*[text()='${sourceColumnName}']]//div[(@cdkdrag)][.//h5[text()='${saleName}']]`);
            const destinationColumn = By.xpath(`//app-sale-card-list//div[header//h6/*[text()='${destinationColumnName}']]//div[(@cdkdrag)]`);
            await this.driverService.waitUntilElementLoaded(saleToDragAndDrop);
            await this.driverService.waitUntilElementLoaded(destinationColumn);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);

            await this.driverService.dragAndDrop(saleToDragAndDrop, destinationColumn);
            await waitUntilHorizontalProgressBarLoaded(this.driverService);

            return true;
        } catch (error) {
            console.log("dragAndDropSaleCardView");
            console.log(error);
            return false;
        }
    }

    public async pressClearButtonSelectFilter() {
        try {
            const element = await this.getFieldType(this.btnClearSelectFilter);
            await element.click();
            return true;
        } catch (error) {
            console.log('pressClearButtonSelectFilter');
            console.log(error);
            return false;
        }
    }

    public async pressRefreshColumnCardview() {
        try {
            const len = await (await this.driverService.findElements(this.btnRefreshColumnCardview)).length;
            for (let i = 1; i <= len; i++) {
                const btn = By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//em[contains(@class,'fa-sync')])[${i}]`);
                const element = await this.getFieldType(btn);
                await element.click();
                await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            }
            return true;
        } catch (error) {
            console.log('pressRefreshColumnCardview');
            console.log(error);
            return false;
        }
    }

    public async openEditSaleFormByIndex(index: number) {
        try {
            const btnEllipsis = By.xpath(`(//div[contains(@class,'card-col') and .//h6/span]//app-sale-card)[${index}]//button[@id='edit-oppotunities']`);
            const btnEdit = By.xpath(`(//div[contains(@class,'card-col') and .//h6/span]//app-sale-card)[${index}]//button[@ngbdropdownitem and ./i[contains(@class,'fa-edit')]]`);
            let element = await this.getFieldType(btnEllipsis);
            await element.click();
            element = await this.getFieldType(btnEdit);
            await element.click();
            return true;
        } catch (error) {
            console.log('openEditSaleFormByIndex');
            console.log(error);
            return false;
        }
    }
    //#region Validate value sale card (by StageName, SaleName)
    public async validateValueAccount(stageName: string, saleName: string, expectedValue: string) {
        try {
            const lbl = By.xpath(`//div[contains(@class,'card-col') and .//h6/span[text()='${stageName}']]//app-sale-card[.//h5[text()='${saleName}']]//app-entity-details-link/a`);
            const element = await this.getFieldType(lbl);
            const actualValue = await element.getValue();
            return await this.driverService.validateRecord('Validate Account!',
                [actualValue, expectedValue, 'Incorrect Account!']);
        } catch (error) {
            console.log('validateValueAccount');
            console.log(error);
            return false;
        }
    }
    public async validateValueProduct(stageName: string, saleName: string, expectedValue: string) {
        try {
            const lbl = By.xpath(`//div[contains(@class,'card-col') and .//h6/span[text()='${stageName}']]//app-sale-card[.//h5[text()='${saleName}']]//div[./span[text()='Product:']]/div`);
            const element = await this.getFieldType(lbl);
            const actualValue = await element.getValue();
            return await this.driverService.validateRecord('Validate Product!',
                [actualValue, expectedValue, 'Incorrect Product!']);
        } catch (error) {
            console.log('validateValueProduct');
            console.log(error);
            return false;
        }
    }
    public async validateValueTotalDealAmount(stageName: string, saleName: string, expectedValue: string) {
        try {
            const lbl = By.xpath(`//div[contains(@class,'card-col') and .//h6/span[text()='${stageName}']]//app-sale-card[.//h5[text()='${saleName}']]//div[./span[text()='Total Deal Amount:']]/span[2]`);
            const element = await this.getFieldType(lbl);
            const actualValue = await element.getValue();
            return await this.driverService.validateRecord('Validate Total Deal Amount!',
                [actualValue, expectedValue, 'Incorrect Total Deal Amount!']);
        } catch (error) {
            console.log('validateValueTotalDealAmount');
            console.log(error);
            return false;
        }
    }
    public async validateValueCloseDate(stageName: string, saleName: string, expectedValue: string) {
        try {
            const lbl = By.xpath(`//div[contains(@class,'card-col') and .//h6/span[text()='${stageName}']]//app-sale-card[.//h5[text()='${saleName}']]//div[./span[text()='Close Date']]/span[2]`);
            const element = await this.getFieldType(lbl);
            const actualValue = await element.getValue();
            return await this.driverService.validateRecord('Validate Close Date!',
                [actualValue, expectedValue, 'Incorrect Close Date!']);
        } catch (error) {
            console.log('validateValueCloseDate');
            console.log(error);
            return false;
        }
    }
    public async validateValueLastUpdated(stageName: string, saleName: string, expectedValue: string) {
        try {
            const lbl = By.xpath(`//div[contains(@class,'card-col') and .//h6/span[text()='${stageName}']]//app-sale-card[.//h5[text()='${saleName}']]//div[./span[text()='Last Updated']]/span[2]`);
            const element = await this.getFieldType(lbl);
            const actualValue = await element.getValue();
            return await this.driverService.validateRecord('Validate Last Updated!',
                [actualValue.split(":")[0], expectedValue.split(":")[0], 'Incorrect Last Update!']);
        } catch (error) {
            console.log('validateValueLastUpdated');
            console.log(error);
            return false;
        }
    }
    public async validateValueStageValue(stageName: string, saleName: string, expectedValue: string) {
        try {
            const lbl = By.xpath(`//div[contains(@class,'card-col') and .//h6/span[text()='${stageName}']]//app-sale-card[.//h5[text()='${saleName}']]//div[./img][2]/span`);
            const element = await this.getFieldType(lbl);
            const actualValue = await element.getValue();
            return await this.driverService.validateRecord('Validate Stage Value!',
                [actualValue, expectedValue, 'Incorrect Stage Value!']);
        } catch (error) {
            console.log('validateValueStageValue');
            console.log(error);
            return false;
        }
    }

    public async validateValueKAM(stageName: string, saleName: string, expectedValue: string) {
        try {
            const img = By.xpath(`//div[contains(@class,'card-col') and .//h6/span[text()='${stageName}']]//app-sale-card[.//h5[text()='${saleName}']]//div[./img][2]/img[1]`);
            const lbl = By.xpath(`//div[contains(@class,'card-col') and .//h6/span[text()='${stageName}']]//app-sale-card[.//h5[text()='${saleName}']]//div[./img][2]/ngb-tooltip-window/div[text()]`);
            await this.driverService.waitUntilElementVisible(img);
            await this.driverService.mouseHover(img);
            const element = await this.getFieldType(lbl);
            const actualValue = (await element.getValue()).replace("KAM: ", "");
            return await this.driverService.validateRecord('Validate KAM!',
                [actualValue, expectedValue, 'Incorrect KAM!']);
        } catch (error) {
            console.log('validateValueKAM');
            console.log(error);
            return false;
        }
    }

    public async validateValueSalesRep(stageName: string, saleName: string, expectedValue: string) {
        try {
            const img = By.xpath(`//div[contains(@class,'card-col') and .//h6/span[text()='${stageName}']]//app-sale-card[.//h5[text()='${saleName}']]//div[./img][2]/img[2]`);
            const lbl = By.xpath(`//div[contains(@class,'card-col') and .//h6/span[text()='${stageName}']]//app-sale-card[.//h5[text()='${saleName}']]//div[./img][2]/ngb-tooltip-window/div[text()]`);
            await this.driverService.waitUntilElementVisible(img);
            await this.driverService.mouseHover(img);
            const element = await this.getFieldType(lbl);
            const actualValue = (await element.getValue()).replace("Sales rep.: ", "");
            return await this.driverService.validateRecord('Validate Sales Rep!',
                [actualValue, expectedValue, 'Incorrect Sales Rep!']);
        } catch (error) {
            console.log('validateValueSalesRep');
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region Validate value sale card (by Index)
    public async validateValueSaleNameByIndex(index: number, expectedValue: string, isUsedForSearch = false) {
        try {
            const lbl = By.xpath(`(//div[contains(@class,'card-col') and .//h6/span]//app-sale-card)[${index}]//h5`);
            await this.driverService.waitUntilElementVisible(lbl);
            const actualValue = await this.driverService.getText(lbl);
            if (isUsedForSearch) {
                return await this.driverService.validateRecordUsedForSearch('Validate Sale Name!',
                    [actualValue, expectedValue, 'Incorrect Sale Name!']
                );
            }
            return await this.driverService.validateRecord('Validate Sale Name!',
                [actualValue, expectedValue, 'Incorrect Sale Name!']);
        } catch (error) {
            console.log('validateValueSaleNameByIndex');
            console.log(error);
            return false;
        }
    }
    public async validateValueAccountByIndex(index: number, expectedValue: string) {
        try {
            const lbl = By.xpath(`(//div[contains(@class,'card-col') and .//h6/span]//app-sale-card)[${index}]//app-entity-details-link/a`);
            const element = await this.getFieldType(lbl);
            const actualValue = await element.getValue();
            return await this.driverService.validateRecord('Validate Account!',
                [actualValue, expectedValue, 'Incorrect Account!']);
        } catch (error) {
            console.log('validateValueAccount');
            console.log(error);
            return false;
        }
    }
    public async validateValueProductByIndex(index: number, expectedValue: string) {
        try {
            const lbl = By.xpath(`(//div[contains(@class,'card-col') and .//h6/span]//app-sale-card)[${index}]//div[./span[text()='Product:']]/div`);
            const element = await this.getFieldType(lbl);
            const actualValue = await element.getValue();
            return await this.driverService.validateRecord('Validate Product!',
                [actualValue, expectedValue, 'Incorrect Product!']);
        } catch (error) {
            console.log('validateValueProduct');
            console.log(error);
            return false;
        }
    }
    public async validateValueTotalDealAmountByIndex(index: number, expectedValue: string, isUsedForSearch = false) {
        try {
            const lbl = By.xpath(`(//div[contains(@class,'card-col') and .//h6/span]//app-sale-card)[${index}]//div[./span[text()='Total Deal Amount:']]/span[2]`);
            const element = await this.getFieldType(lbl);
            const actualValue = await element.getValue();
            if (isUsedForSearch) {
                return await this.driverService.validateRecordUsedForSearch('Validate Total Deal Amount!',
                    [actualValue, expectedValue, 'Incorrect Total Deal Amount!']
                );
            }
            return await this.driverService.validateRecord('Validate Total Deal Amount!',
                [actualValue, expectedValue, 'Incorrect Total Deal Amount!']
            );
        } catch (error) {
            console.log('validateValueTotalDealAmount');
            console.log(error);
            return false;
        }
    }
    public async validateValueCloseDateByIndex(index: number, expectedValue: string) {
        try {
            const lbl = By.xpath(`(//div[contains(@class,'card-col') and .//h6/span]//app-sale-card)[${index}]//div[./span[text()='Close Date']]/span[2]`);
            const element = await this.getFieldType(lbl);
            const actualValue = await element.getValue();
            return await this.driverService.validateRecord('Validate Close Date!',
                [actualValue, expectedValue, 'Incorrect Close Date!']);
        } catch (error) {
            console.log('validateValueCloseDate');
            console.log(error);
            return false;
        }
    }
    public async validateValueLastUpdatedByIndex(index: number, expectedValue: string) {
        try {
            const lbl = By.xpath(`(//div[contains(@class,'card-col') and .//h6/span]//app-sale-card)[${index}]//div[./span[text()='Last Updated']]/span[2]`);
            const element = await this.getFieldType(lbl);
            const actualValue = await element.getValue();
            return await this.driverService.validateRecord('Validate Last Updated!',
                [actualValue.split(":")[0], expectedValue.split(":")[0], 'Incorrect Last Update!']);
        } catch (error) {
            console.log('validateValueLastUpdated');
            console.log(error);
            return false;
        }
    }
    public async validateValueStageValueByIndex(index: number, expectedValue: string) {
        try {
            const lbl = By.xpath(`(//div[contains(@class,'card-col') and .//h6/span]//app-sale-card)[${index}]//div[./img][2]/span`);
            const element = await this.getFieldType(lbl);
            const actualValue = await element.getValue();
            return await this.driverService.validateRecord('Validate Stage Value!',
                [actualValue, expectedValue, 'Incorrect Stage Value!']);
        } catch (error) {
            console.log('validateValueStageValue');
            console.log(error);
            return false;
        }
    }

    public async validateValueKAMByIndex(index: number, expectedValue: string) {
        try {
            const img = By.xpath(`(//div[contains(@class,'card-col') and .//h6/span]//app-sale-card)[${index}]//div[./img][2]/img[1]`);
            const lbl = By.xpath(`(//div[contains(@class,'card-col') and .//h6/span]//app-sale-card)[${index}]//div[./img][2]/ngb-tooltip-window/div[text()]`);
            await this.driverService.waitUntilElementVisible(img);
            await this.driverService.mouseHover(img);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            const element = await this.getFieldType(lbl);
            const actualValue = (await element.getValue()).replace("KAM: ", "");
            return await this.driverService.validateRecord('Validate KAM!',
                [actualValue, expectedValue, 'Incorrect KAM!']);
        } catch (error) {
            console.log('validateValueKAM');
            console.log(error);
            return false;
        }
    }

    public async validateValueSalesRepByIndex(index: number, expectedValue: string) {
        try {
            const img = By.xpath(`(//div[contains(@class,'card-col') and .//h6/span]//app-sale-card)[${index}]//div[./img][2]/img[2]`);
            const lbl = By.xpath(`(//div[contains(@class,'card-col') and .//h6/span]//app-sale-card)[${index}]//div[./img][2]/ngb-tooltip-window/div[text()]`);
            await this.driverService.waitUntilElementVisible(img);
            await this.driverService.mouseHover(img);
            const element = await this.getFieldType(lbl);
            const actualValue = (await element.getValue()).replace("Sales rep.: ", "");
            return await this.driverService.validateRecord('Validate Sales Rep!',
                [actualValue, expectedValue, 'Incorrect Sales Rep!']);
        } catch (error) {
            console.log('validateValueSalesRep');
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region Get value sale card (by Index)
    public async getValueAccountByIndex(index: number) {
        try {
            const lbl = By.xpath(`(//div[contains(@class,'card-col') and .//h6/span]//app-sale-card)[${index}]//app-entity-details-link/a`);
            const element = await this.getFieldType(lbl);
            const actualValue = await element.getValue();
            return actualValue;
        } catch (error) {
            console.log('getValueAccount');
            console.log(error);
            return "";
        }
    }
    public async getValueProductByIndex(index: number) {
        try {
            const lbl = By.xpath(`(//div[contains(@class,'card-col') and .//h6/span]//app-sale-card)[${index}]//div[./span[text()='Product:']]/div`);
            const element = await this.getFieldType(lbl);
            const actualValue = await element.getValue();
            return actualValue;
        } catch (error) {
            console.log('getValueProduct');
            console.log(error);
            return "";
        }
    }
    public async getValueTotalDealAmountByIndex(index: number) {
        try {
            const lbl = By.xpath(`(//div[contains(@class,'card-col') and .//h6/span]//app-sale-card)[${index}]//div[./span[text()='Total Deal Amount:']]/span[2]`);
            const element = await this.getFieldType(lbl);
            const actualValue = await element.getValue();
            return actualValue;
        } catch (error) {
            console.log('getValueTotalDealAmount');
            console.log(error);
            return "";
        }
    }
    public async getValueCloseDateByIndex(index: number) {
        try {
            const lbl = By.xpath(`(//div[contains(@class,'card-col') and .//h6/span]//app-sale-card)[${index}]//div[./span[text()='Close Date']]/span[2]`);
            const element = await this.getFieldType(lbl);
            const actualValue = await element.getValue();
            return actualValue;
        } catch (error) {
            console.log('getValueCloseDate');
            console.log(error);
            return "";
        }
    }
    public async getValueLastUpdatedByIndex(index: number) {
        try {
            const lbl = By.xpath(`(//div[contains(@class,'card-col') and .//h6/span]//app-sale-card)[${index}]//div[./span[text()='Last Updated']]/span[2]`);
            const element = await this.getFieldType(lbl);
            const actualValue = await element.getValue();
            return actualValue;
        } catch (error) {
            console.log('getValueLastUpdated');
            console.log(error);
            return "";
        }
    }
    public async getValueStageValueByIndex(index: number) {
        try {
            const lbl = By.xpath(`(//div[contains(@class,'card-col') and .//h6/span]//app-sale-card)[${index}]//div[./img][2]/span`);
            const element = await this.getFieldType(lbl);
            const actualValue = await element.getValue();
            return actualValue;
        } catch (error) {
            console.log('getValueStageValue');
            console.log(error);
            return "";
        }
    }

    public async getValueKAMByIndex(index: number) {
        try {
            const img = By.xpath(`(//div[contains(@class,'card-col') and .//h6/span]//app-sale-card)[${index}]//div[./img][2]/img[1]`);
            const lbl = By.xpath(`(//div[contains(@class,'card-col') and .//h6/span]//app-sale-card)[${index}]//div[./img][2]/ngb-tooltip-window/div[text()]`);
            await this.driverService.waitUntilElementVisible(img);
            await this.driverService.mouseHover(img);
            const element = await this.getFieldType(lbl);
            const actualValue = (await element.getValue()).replace("KAM: ", "");
            return actualValue;
        } catch (error) {
            console.log('getValueKAM');
            console.log(error);
            return "";
        }
    }

    public async getValueSalesRepByIndex(index: number) {
        try {
            const img = By.xpath(`(//div[contains(@class,'card-col') and .//h6/span]//app-sale-card)[${index}]//div[./img][2]/img[2]`);
            const lbl = By.xpath(`(//div[contains(@class,'card-col') and .//h6/span]//app-sale-card)[${index}]//div[./img][2]/ngb-tooltip-window/div[text()]`);
            await this.driverService.waitUntilElementVisible(img);
            await this.driverService.mouseHover(img);
            const element = await this.getFieldType(lbl);
            const actualValue = (await element.getValue()).replace("Sales rep.: ", "");
            return actualValue;
        } catch (error) {
            console.log('getValueSalesRep');
            console.log(error);
            return "";
        }
    }
    //#endregion
}
