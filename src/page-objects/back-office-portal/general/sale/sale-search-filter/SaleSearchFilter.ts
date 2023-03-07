import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { selectDropdownOption, selectDropdownOption_v2, waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";
import { GlobalDateTimeContainer } from "../../GlobalPageObject/GlobalDateTimeContainer";
import { GlobalSearchAndFilter } from "../../GlobalPageObject/GlobalSearchAndFilter";


export class SaleSearchFilter extends GlobalSearchAndFilter{
    //Element at Search and Filter
    protected btnSearchAndFilter = By.xpath("(//app-sale-table-view[not(@hidden)] | //app-sale-card-list[not(@hidden)])//button//span[text()='Search & Filter']");

    protected btnCloseSearchAndFilterForm = By.xpath("(//app-sale-table-view[not(@hidden)] | //app-sale-card-list[not(@hidden)])//div[contains(@class,'card-header')]/button/i[contains(@class,'fa-times')]");
  
    // Buttons on form
    protected btnSearchSearchFilter = By.xpath("(//app-sale-table-view[not(@hidden)] | //app-sale-card-list[not(@hidden)])//*[contains(local-name(),'filter')]//span[contains(@class,'fa-loading')]");
    protected btnClearSearchFilter = By.xpath("(//app-sale-table-view[not(@hidden)] | //app-sale-card-list[not(@hidden)])//*[contains(local-name(),'filter')]//button[text()='Clear ']");
    protected btnSaveSearchFilter = By.xpath("(//app-sale-table-view[not(@hidden)] | //app-sale-card-list[not(@hidden)])//*[contains(local-name(),'filter')]//button[not (@disabled)]/span[text()='Save']");

    private txtReferenceSearchFilter = By.xpath("(//app-sale-table-view[not(@hidden)] | //app-sale-card-list[not(@hidden)])//app-sales-filter//input[contains(@class,'pgs-json-schema-control-reference')]");
    private cmbAccountSearchFilter = By.xpath("(//app-sale-table-view[not(@hidden)] | //app-sale-card-list[not(@hidden)])//app-sales-filter//ng-select[contains(@class,'pgs-json-schema-control-account')]//input");
    private cmbKAMSearchFilter = By.xpath("(//app-sale-table-view[not(@hidden)] | //app-sale-card-list[not(@hidden)])//app-sales-filter//*[contains(@class,'pgs-json-schema-control-kam')]//input");
    private cmbPipelineSearchFilter = By.xpath("(//app-sale-table-view[not(@hidden)] | //app-sale-card-list[not(@hidden)])//app-sales-filter//formly-field[contains(@class,'pgs-json-schema-control-pipeline')]//input");
    private cmbSalesStageSearchFilter = By.xpath("(//app-sale-table-view[not(@hidden)] | //app-sale-card-list[not(@hidden)])//app-sales-filter//formly-field[contains(@class,'pgs-json-schema-control-sales-stage')]//input");
    private txtSaleNameSearchFilter = By.xpath("(//app-sale-table-view[not(@hidden)] | //app-sale-card-list[not(@hidden)])//app-sales-filter//input[contains(@class,'pgs-json-schema-control-sales-name')]");
    private cmbSalesRepSearchFilter = By.xpath("(//app-sale-table-view[not(@hidden)] | //app-sale-card-list[not(@hidden)])//app-sales-filter//ng-select[contains(@class,'pgs-json-schema-control-sales-rep.')]//input");
    private txtTotalDealAmountSearchFilter = By.xpath("(//app-sale-table-view[not(@hidden)] | //app-sale-card-list[not(@hidden)])//app-sales-filter//*[contains(@class,'amount')]//input");
    private cmbCurrencySearchFilter = By.xpath("(//app-sale-table-view[not(@hidden)] | //app-sale-card-list[not(@hidden)])//app-sales-filter//*[contains(@class,'pgs-json-schema-control-currency')]//input");
    private cmbProductSearchFilter = By.xpath("(//app-sale-table-view[not(@hidden)] | //app-sale-card-list[not(@hidden)])//app-sales-filter//*[contains(@class,'pgs-json-schema-control-product')]//input");
    private dtpCloseDateFromSearchFilter = By.xpath("(//app-sale-table-view[not(@hidden)] | //app-sale-card-list[not(@hidden)])//app-sales-filter//*[contains(@class,'pgs-json-schema-control-close-date-from')]//input");
    private dtpCloseDateToSearchFilter = By.xpath("(//app-sale-table-view[not(@hidden)] | //app-sale-card-list[not(@hidden)])//app-sales-filter//*[contains(@class,'pgs-json-schema-control-close-date-to')]//input");
    private txtDescriptionSearchFilter = By.xpath("(//app-sale-table-view[not(@hidden)] | //app-sale-card-list[not(@hidden)])//app-sales-filter//input[contains(@class,'pgs-json-schema-control-description')]");

    //Varsam's fields
    private cmbTeamSearchFilter = By.xpath("(//app-sale-table-view[not(@hidden)] | //app-sale-card-list[not(@hidden)])//app-sales-filter//app-team-layout//input");
    private cmbTeamMemberSearchFilter = By.xpath("(//app-sale-table-view[not(@hidden)] | //app-sale-card-list[not(@hidden)])//app-sales-filter//app-team-member-layout//input");
    private dtpTimeToCallFromSearchFilter = By.xpath("(//app-sale-table-view[not(@hidden)] | //app-sale-card-list[not(@hidden)])//app-sales-filter//formly-field[contains(@class,'pgs-json-schema-control-time-to-call-from')]//input");
    private dtpTimeToCallToSearchFilter = By.xpath("(//app-sale-table-view[not(@hidden)] | //app-sale-card-list[not(@hidden)])//app-sales-filter//formly-field[contains(@class,'pgs-json-schema-control-time-to-call-to')]//input");
    private txtPhoneSearchFilter = By.xpath("(//app-sale-table-view[not(@hidden)] | //app-sale-card-list[not(@hidden)])//app-sales-filter//input[contains(@class,'pgs-json-schema-control-phone')]");

    private dtpLastUpdatedFromSearchFilter = By.xpath("(//app-sale-table-view[not(@hidden)] | //app-sale-card-list[not(@hidden)])//app-sales-filter//formly-field[contains(@class,'pgs-json-schema-control-last-updated-from')]//input");
    private dtpLastUpdatedToSearchFilter = By.xpath("(//app-sale-table-view[not(@hidden)] | //app-sale-card-list[not(@hidden)])//app-sales-filter//formly-field[contains(@class,'pgs-json-schema-control-last-updated-to')]//input");

    //Clear button for each fields @Search and Filter form
    private btnclearReference = By.xpath(`(//input[contains(@class,"control-reference")]/following::span[contains(@class,"btn-clear")])[1]`);
    private btnclearAccount = By.xpath(`//ng-select[contains(@class,"control-account")]//span[@title="Clear all"]`);
    private btnclearKAM = By.xpath(`//ng-select[contains(@class,"control-kam")]//span[@title="Clear all"]`);
    private btnclearPipepline = By.xpath(`//formly-field[contains(@class,"control-pipeline")]//span[@title="Clear all"]`);
    private btnclearSalesStage = By.xpath(`//formly-field[contains(@class,"control-sales-stage")]//span[@title="Clear all"]`);
    private btnclearSalesRep = By.xpath(`//ng-select[contains(@class,"control-sales-rep")]//span[@title="Clear all"]`);
    private btnclearCurrency = By.xpath(`//formly-field[contains(@class,"control-currency")]//span[@title="Clear all"]`);
    private btnclearProduct = By.xpath(`//formly-field[contains(@class,"control-product")]//span[@title="Clear all"]`);
    private btnclearSalesName = By.xpath(`(//input[@placeholder="Enter Sales Name"]/following::span[contains(@class,"btn-clear")])[1]`);
    private btnclearDescription = By.xpath(`(//input[@placeholder="Enter Description"]/following::span[contains(@class,"btn-clear")])[1]`);

    //field without clear buttons
    private clearCloseDateFrom = By.xpath(`//formly-field[contains(@class,"close-date-from")]//input[contains(@class,"ng-touched")]`);
    private clearCloseDateTo = By.xpath(`//formly-field[contains(@class,"close-date-to")]//input[contains(@class,"ng-touched")]`);
    private clearTotalDealAmount = By.xpath(`//formly-field[contains(@class,"total-deal-amount")]//input[contains(@class,"ng-touched")]`);

    // Fields were removed after PBI https://contemi.atlassian.net/browse/SAAS-9477
    private txtAnnualContractValueSearchFilter = By.xpath("//app-sale-filter//input[@id='pgs-search-filter-annual-contract-value']");
    private cmbSalesTypeSearchFilter = By.xpath("//app-sale-filter//input[@id='pgs-sale-filter-type']");
    private cmbProductPLSearchFilter = By.xpath("//app-sale-filter//input[@id='pgs-search-filter-product-pl']");
    private cmbSalesStatusSearchFilter = By.xpath("//app-sale-filter//input[@id='pgs-sale-deal-status']");
    private txtCAPEXSearchFilter = By.xpath("//app-sale-filter//input[@id='pgs-sale-capital-expenditure']");
    private txtARRSearchFilter = By.xpath("//app-sale-filter//input[@id='pgs-sale-annual-recurring-revenue']");

    constructor(driverService: SeleniumWebDriverService) {
        super(driverService);
     }

    public async searchAndFilterSaleByName(name: string) {
        try {
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 2000);
            await this.driverService.waitUntilElementLoaded(this.btnSearchAndFilter);
            await this.driverService.click(this.btnSearchAndFilter);
            await this.driverService.waitUntilElementLoaded(By.xpath("//app-sale-list//div[contains(@class,'show-right-side')]"));
            await this.driverService.waitForSeconds(2000);
            await this.driverService.setText(this.txtSaleNameSearchFilter, name);
            await this.driverService.pressEnterCurrentElement();
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true;
        } catch (error) {
            console.log("searchAndFilterSaleByName");
            console.log(error);
            return false;
        }
    }

    public async inputSalesNameSearchAndFilter(salesName: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtSaleNameSearchFilter);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
            await this.driverService.setText(this.txtSaleNameSearchFilter, salesName);
            return true;
        } catch (error) {
            console.log("inputSalesNameSearchAndFilter");
            console.log(error);
            return false;
        }
    }

    public async inputReferenceSearchAndFilter(reference: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtReferenceSearchFilter);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
            await this.driverService.setText(this.txtReferenceSearchFilter, reference);
            return true;
        } catch (error) {
            console.log("inputReferenceSearchAndFilter");
            console.log(error);
            return false;
        }
    }

    public async inputAccountSearchAndFilter(Account: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbAccountSearchFilter);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
            await this.driverService.setText(this.cmbAccountSearchFilter, Account);
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await selectDropdownOption(Account, "", this.driverService);
            return true;
        } catch (error) {
            console.log("inputAccountSearchAndFilter");
            console.log(error);
            return false;
        }
    }

    public async inputKAMSearchAndFilter(KAM: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbKAMSearchFilter);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
            await this.driverService.setText(this.cmbKAMSearchFilter, KAM);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await selectDropdownOption(KAM, "", this.driverService);
            return true;
        } catch (error) {
            console.log("inputKAMSearchAndFilter");
            console.log(error);
            return false;
        }
    }

    public async inputPipelineSearchAndFilter(Pipeline: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbPipelineSearchFilter);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
            await this.driverService.setText(this.cmbPipelineSearchFilter, Pipeline);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await selectDropdownOption(Pipeline, "", this.driverService);
            return true;
        } catch (error) {
            console.log("inputPipelineSearchAndFilter");
            console.log(error);
            return false;
        }
    }

    public async inputSalesStageSearchAndFilter(SalesStage: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbSalesStageSearchFilter);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
            await this.driverService.setText(this.cmbSalesStageSearchFilter, SalesStage);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await selectDropdownOption(SalesStage, "", this.driverService);
            return true;
        } catch (error) {
            console.log("inputSalesStageSearchAndFilter");
            console.log(error);
            return false;
        }
    }

    public async inputSalesRepSearchAndFilter(SalesRep: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbSalesRepSearchFilter);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
            await this.driverService.setText(this.cmbSalesRepSearchFilter, SalesRep);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await selectDropdownOption(SalesRep, "", this.driverService);
            return true;
        } catch (error) {
            console.log("inputSalesRepSearchAndFilter");
            console.log(error);
            return false;
        }
    }

    public async inputTotalDealAmountSearchAndFilter(TotalDealAmount: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtTotalDealAmountSearchFilter);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
            await this.driverService.setText(this.txtTotalDealAmountSearchFilter, TotalDealAmount);
            return true;
        } catch (error) {
            console.log("inputTotalDealAmountSearchAndFilter");
            console.log(error);
            return false;
        }
    }

    public async inputCurrencySearchAndFilter(Currency: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbCurrencySearchFilter);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
            await this.driverService.setText(this.cmbCurrencySearchFilter, Currency);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await selectDropdownOption_v2(Currency, "", this.driverService);
            return true;
        } catch (error) {
            console.log("inputCurrencySearchAndFilter");
            console.log(error);
            return false;
        }
    }

    public async inputProductSearchAndFilter(Product: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbProductSearchFilter);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
            await this.driverService.setText(this.cmbProductSearchFilter, Product);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await selectDropdownOption(Product, "", this.driverService);
            return true;
        } catch (error) {
            console.log("inputProductSearchAndFilter");
            console.log(error);
            return false;
        }
    }

    public async inputAnnualContractValueSearchAndFilter(AnnualContractValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtAnnualContractValueSearchFilter);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
            await this.driverService.setText(this.txtAnnualContractValueSearchFilter, AnnualContractValue);
            return true;
        } catch (error) {
            console.log("inputAnnualContractValueSearchAndFilter");
            console.log(error);
            return false;
        }
    }

    public async inputSalesTypeSearchAndFilter(SalesType: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbSalesTypeSearchFilter);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
            await this.driverService.setText(this.cmbSalesTypeSearchFilter, SalesType);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await selectDropdownOption(SalesType, "", this.driverService);
            return true;
        } catch (error) {
            console.log("inputSalesTypeSearchAndFilter");
            console.log(error);
            return false;
        }
    }

    public async inputProductPLSearchAndFilter(ProductPL: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbProductPLSearchFilter);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
            await this.driverService.setText(this.cmbProductPLSearchFilter, ProductPL);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await selectDropdownOption(ProductPL, "", this.driverService);
            return true;
        } catch (error) {
            console.log("inputProductPLSearchAndFilter");
            console.log(error);
            return false;
        }
    }

    public async inputSalesStatusSearchAndFilter(SalesStatus: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbSalesStatusSearchFilter);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
            await this.driverService.setText(this.cmbSalesStatusSearchFilter, SalesStatus);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await selectDropdownOption(SalesStatus, "", this.driverService);
            return true;
        } catch (error) {
            console.log("inputSalesStatusSearchAndFilter");
            console.log(error);
            return false;
        }
    }

    public async inputCAPEXSearchAndFilter(CAPEX: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtCAPEXSearchFilter);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
            await this.driverService.setText(this.txtCAPEXSearchFilter, CAPEX);
            return true;
        } catch (error) {
            console.log("inputCAPEXSearchAndFilter");
            console.log(error);
            return false;
        }
    }

    public async inputARRSearchAndFilter(ARR: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtARRSearchFilter);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
            await this.driverService.setText(this.txtARRSearchFilter, ARR);
            return true;
        } catch (error) {
            console.log("inputARRSearchAndFilter");
            console.log(error);
            return false;
        }
    }

    public async inputCloseDateFromSearchAndFilter(CloseDateFrom: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.dtpCloseDateFromSearchFilter);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
            await this.driverService.click(this.dtpCloseDateFromSearchFilter);
            const globalDateTimeContainer = new GlobalDateTimeContainer(SeleniumWebDriverService.getInstance());
            await globalDateTimeContainer.inputDateTime(CloseDateFrom);
            return true;
        } catch (error) {
            console.log("inputCloseDateFromSearchAndFilter");
            console.log(error);
            return false;
        }
    }

    public async inputCloseDateToSearchAndFilter(CloseDateTo: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.dtpCloseDateToSearchFilter);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
            await this.driverService.click(this.dtpCloseDateToSearchFilter);
            const globalDateTimeContainer = new GlobalDateTimeContainer(SeleniumWebDriverService.getInstance());
            await globalDateTimeContainer.inputDateTime(CloseDateTo);
            return true;
        } catch (error) {
            console.log("inputCloseDateToSearchAndFilter");
            console.log(error);
            return false;
        }
    }
    public async inputLastUpdatedFromSearchAndFilter(value: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.dtpLastUpdatedFromSearchFilter);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
            await this.driverService.click(this.dtpLastUpdatedFromSearchFilter);
            const globalDateTimeContainer = new GlobalDateTimeContainer(SeleniumWebDriverService.getInstance());
            await globalDateTimeContainer.inputDateTime(value);
            await globalDateTimeContainer.pressSetButton();
            return true;
        } catch (error) {
            console.log("inputLastUpdatedFromSearchAndFilter");
            console.log(error);
            return false;
        }
    }
    public async inputLastUpdatedToSearchAndFilter(value: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.dtpLastUpdatedToSearchFilter);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
            await this.driverService.click(this.dtpLastUpdatedToSearchFilter);
            const globalDateTimeContainer = new GlobalDateTimeContainer(SeleniumWebDriverService.getInstance());
            await globalDateTimeContainer.inputDateTime(value);
            await globalDateTimeContainer.pressSetButton();
            return true;
        } catch (error) {
            console.log("inputLastUpdatedToSearchAndFilter");
            console.log(error);
            return false;
        }
    }

    public async inputDescriptionSearchAndFilter(Description: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtDescriptionSearchFilter);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
            await this.driverService.setText(this.txtDescriptionSearchFilter, Description);
            return true;
        } catch (error) {
            console.log("inputDescriptionSearchAndFilter");
            console.log(error);
            return false;
        }
    }

    public async inputTeamSearchAndFilter(value: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.cmbTeamSearchFilter);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
            await this.driverService.setText(this.cmbTeamSearchFilter, value);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await selectDropdownOption(value, "", this.driverService);
            return true;
        } catch (error) {
            console.log("inputTeamSearchAndFilter");
            console.log(error);
            return false;
        }
    }

    public async inputTeamMemberSearchAndFilter(value: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbTeamMemberSearchFilter);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
            await this.driverService.setText(this.cmbTeamMemberSearchFilter, value);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await selectDropdownOption(value, "", this.driverService);
            return true;
        } catch (error) {
            console.log("inputTeamMemberSearchAndFilter");
            console.log(error);
            return false;
        }
    }

    public async inputTimeToCallFromSearchAndFilter(value: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.dtpTimeToCallFromSearchFilter);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
            await this.driverService.click(this.dtpTimeToCallFromSearchFilter);
            const globalDateTimeContainer = new GlobalDateTimeContainer(SeleniumWebDriverService.getInstance());
            await globalDateTimeContainer.inputDateTime(value);
            await globalDateTimeContainer.pressSetButton();
            return true;
        } catch (error) {
            console.log("inputTimeToCallFromSearchAndFilter");
            console.log(error);
            return false;
        }
    }
    public async inputTimeToCallToSearchAndFilter(value: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.dtpTimeToCallToSearchFilter);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
            await this.driverService.click(this.dtpTimeToCallToSearchFilter);
            const globalDateTimeContainer = new GlobalDateTimeContainer(SeleniumWebDriverService.getInstance());
            await globalDateTimeContainer.inputDateTime(value);
            await globalDateTimeContainer.pressSetButton();
            return true;
        } catch (error) {
            console.log("inputTimeToCallToSearchAndFilter");
            console.log(error);
            return false;
        }
    }

    public async inputPhoneSearchAndFilter(value: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtPhoneSearchFilter);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
            await this.driverService.setText(this.txtPhoneSearchFilter, value);
            return true;
        } catch (error) {
            console.log("inputPhoneSearchAndFilter");
            console.log(error);
            return false;
        }
    }
    //return true if there is no clear button on every fields
    public async validateClearedSearchAndFilterForm() {
        try {
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await this.driverService.waitUntilElementLoaded(this.cmbAccountSearchFilter);
            let temp = "";
            if (await this.driverService.isExisted(this.clearTotalDealAmount)) {
                temp = await this.driverService.getAttributeValue(this.clearTotalDealAmount, 'value');
            }

            if (!(await this.driverService.isExisted(this.btnclearReference)
                || await this.driverService.isExisted(this.btnclearAccount)
                || await this.driverService.isExisted(this.btnclearKAM)
                || await this.driverService.isExisted(this.btnclearPipepline)
                || await this.driverService.isExisted(this.btnclearSalesStage)
                || await this.driverService.isExisted(this.btnclearSalesRep)
                || await this.driverService.isExisted(this.btnclearCurrency)
                || await this.driverService.isExisted(this.btnclearProduct)
                || await this.driverService.isExisted(this.btnclearSalesName)
                || await this.driverService.isExisted(this.btnclearDescription)
                || await this.driverService.isExisted(this.clearCloseDateFrom)
                || await this.driverService.isExisted(this.clearCloseDateTo)
                || !(temp == "")
            )) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(`validateClearedSearchAndFilterForm`);
            console.log(error);
            return false;
        }

    }
}
