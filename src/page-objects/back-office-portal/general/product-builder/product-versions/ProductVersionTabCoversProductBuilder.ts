import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";
import { logFailMessage, logSuccessMessage, selectDropdownOption, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";
import { GlobalPageObject } from "../../GlobalPageObject/GlobalPageObject";

export class ProductVersionTabCoversProductBuilder extends BasePage {

    private lblCoverTitle = By.xpath(`//app-product-version-cover-general-form//legend`);
    private inputNameOfCover = By.xpath(`//input[@name="addCoverTitle"]`);
    private btnAddNewCover = By.xpath(`//button[contains(@class,'btn-add-cover') and not(@disabled)]`);
    private btnAddNewCoverDisabled = By.xpath(`//button[contains(@class,'btn-add-cover') and @disabled]`);

    private txtCoverName = By.xpath(`//input[@id = 'coverTitle']`);
    private txtCoverID = By.xpath(`//input[@id = 'coverId']`);
    private txtDisplayName = By.xpath(`//input[@id = 'displayName']`);
    private txtIndustryCode = By.xpath(`//input[@id = 'industryCode']`);
    private txtReportingCode = By.xpath(`//input[@id = 'reportingCode']`);

    private cmbSelectionStrategyType = By.xpath(`//app-product-version-cover-selection-form//ng-select[@id = 'selectionStrategyType']`);
    private cmbSourceQuestion = By.xpath(`//ng-select[@id = 'sourceQuestion']//input`);
    private cmbOperation = By.xpath(`//*[@id = 'operation']//input`);
    private cmbCombineComparisonsWith = By.xpath(`//*[@id = 'combineComparisonsWith']//input`);

    private lblSelectionStrategyType = By.xpath(`//*[@id = 'selectionStrategyType']//span[contains(@class,'ng-value-label')]`);
    private lblSourceQuestion = By.xpath(`//*[@id = 'sourceQuestion']//span[contains(@class,'ng-value-label')]`);
    private lblOperation = By.xpath(`//*[@id = 'operation']//span[contains(@class,'ng-value-label')]`);
    private lblCombineComparisonsWith = By.xpath(`//*[@id = 'combineComparisonsWith']//span[contains(@class,'ng-value-label')]`);

    btnSave = By.xpath(`//app-product-version-details//button[contains(text(),'Save')]`);


    //#region Cover list
    public async pressSaveButton() {
        try {
            let element = await this.getFieldType(this.btnSave);
            await element.click();
            return true;
        } catch (error) {
            console.log(`pressSaveButton`);
            console.log(error);
            return false;
        }
    }
    public async selectCoverByName(coverName: string) {
        try {
            let lblCover = By.xpath(`//app-product-version-covers//ul//li//span[contains(text(),'${coverName}')]`);
            let selectedCover = await this.getFieldType(lblCover);
            await selectedCover.click();
            return true;
        } catch (error) {
            console.log(`selectCoverByName`);
            console.log(error);
            return false;
        }
    }

    public async selectCoverByRow(positionRow: number = 1) {
        try {
            let lblCover = By.xpath(`//app-product-version-covers//ul//li[${positionRow}]`);
            let selectedCover = await this.getFieldType(lblCover);
            await selectedCover.click();
            return true;
        } catch (error) {
            console.log(`selectCoverByRow`);
            console.log(error);
            return false;
        }
    }

    public async getCoverNameByRow(positionRow: number = 1) {
        try {
            let lblCover = By.xpath(`//app-product-version-covers//ul//li[${positionRow}]//*[self::*[text()]]`);
            let element = await this.getFieldType(lblCover);
            let CoverName = await element.getValue();
            return CoverName;
        } catch (error) {
            console.log(`getCoverNameByRow`);
            console.log(error);
            return "";
        }
    }

    public async validateCoverIsAdded(coverName: string) {
        try {
            let lblCover = By.xpath(`//app-product-version-covers//ul//li//span[contains(text(),'${coverName}')]`);
            if (await this.driverService.isExisted(lblCover)) {
                return true;
            }
            return false;
        } catch (error) {
            console.log(`validateCoverIsAdded`);
            console.log(error);
            return false;
        }
    }

    public async addNewCover(coverName: string) {
        try {
            await this.removeCoverByName(coverName);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            let inputCover = await this.getFieldType(this.inputNameOfCover);
            await inputCover.setValue(coverName);
            let btnAdd = await this.getFieldType(this.btnAddNewCover);
            await btnAdd.click();
            return true;
        } catch (error) {
            console.log(`addNewCover`);
            console.log(error);
            return false;
        }
    }

    public async cloneCoverByName(coverName: string) {
        try {
            let lblCover = By.xpath(`//app-product-version-covers//ul//li[.//span[contains(text(),'${coverName}')]]//*[@title='Clone']`);
            if (await this.driverService.findElement(lblCover)) {
                await this.driverService.click(lblCover);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(`cloneCoverByName`);
            console.log(error);
            return false;
        }
    }

    public async removeCoverByName(coverName: string) {
        try {
            let lblCover = By.xpath(`//app-product-version-covers//ul//li[.//span[contains(text(),'${coverName}')]]//*[@title='Delete']`);
            if (await this.driverService.findElement(lblCover)) {
                await this.driverService.click(lblCover);
                let gb = new GlobalPageObject(this.driverService);
                await gb.pressYesForm();
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(`removeCoverByName`);
            console.log(error);
            return false;
        }
    }

    public async countTheNumberOfCoverOnList() {
        try {
            let lblCover = By.xpath(`//app-product-version-covers//ul//li`);
            return (await this.driverService.findElements(lblCover)).length;
        } catch (error) {
            console.log(`countTheNumberOfCoverOnList`);
            console.log(error);
            return 0;
        }
    }

    public async validateAddCoverButtonIsDisabled(coverName: string) {
        try {
            let inputCover = await this.getFieldType(this.inputNameOfCover);
            await inputCover.setValue(coverName);
            if (await this.driverService.findElements(this.btnAddNewCoverDisabled)) {
                return true;
            } else return false;
        } catch (error) {
            console.log(`validateAddCoverButtonIsDisabled`);
            console.log(error);
            return false;
        }
    }

    public async validateRemoveCoverButtonIsExistedOnEachCover(positionRow: number = 1) {
        try {
            let RemoveCover = By.xpath(`//app-product-version-covers//ul//li[${positionRow}]//*[@title='Delete']`);
            if (await this.driverService.isExisted(RemoveCover)) {
                return true;
            } else return false;
        } catch (error) {
            console.log(`validateRemoveCoverButtonIsExistedOnEachCover`);
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region input cover details
    public async inputCoverName(inputValue: string) {
        try {
            let input = await this.getFieldType(this.txtCoverName);
            await input.setValue(inputValue);
            return true;
        } catch (error) {
            console.log(`inputCoverName`);
            console.log(error);
            return false;
        }
    }

    public async inputCoverID(inputValue: string) {
        try {
            let input = await this.getFieldType(this.txtCoverID);
            await input.setValue(inputValue);
            return true;
        } catch (error) {
            console.log(`inputCoverID`);
            console.log(error);
            return false;
        }
    }

    public async inputDisplayName(inputValue: string) {
        try {
            let input = await this.getFieldType(this.txtDisplayName);
            await input.setValue(inputValue);
            return true;
        } catch (error) {
            console.log(`inputDisplayName`);
            console.log(error);
            return false;
        }
    }

    public async inputIndustryCode(inputValue: string) {
        try {
            let input = await this.getFieldType(this.txtIndustryCode);
            await input.setValue(inputValue);
            return true;
        } catch (error) {
            console.log(`inputIndustryCode`);
            console.log(error);
            return false;
        }
    }

    public async inputReportingCode(inputValue: string) {
        try {
            let input = await this.getFieldType(this.txtReportingCode);
            await input.setValue(inputValue);
            return true;
        } catch (error) {
            console.log(`inputReportingCode`);
            console.log(error);
            return false;
        }
    }

    public async inputStrategyType(inputValue: string) {
        try {
            let input = await this.getFieldType(this.cmbSelectionStrategyType);
            await input.setValue(inputValue);
            return true;
        } catch (error) {
            console.log(`inputStrategyType`);
            console.log(error);
            return false;
        }
    }

    public async inputSourceQuestion(inputValue: string) {
        try {
            let input = await this.getFieldType(this.cmbSourceQuestion);
            await input.setValue(inputValue);
            await selectDropdownOption(inputValue, "", this.driverService)
            return true;
        } catch (error) {
            console.log(`inputSourceQuestion`);
            console.log(error);
            return false;
        }
    }

    public async inputOperation(inputValue: string) {
        try {
            let input = await this.getFieldType(this.cmbOperation);
            await input.setValue(inputValue);
            await selectDropdownOption(inputValue, "", this.driverService);
            return true;
        } catch (error) {
            console.log(`inputOperation`);
            console.log(error);
            return false;
        }
    }

    public async inputTargetValue(inputValue: string, positionTargetValue: number = 0) {
        try {
            let xpath = By.xpath(`//*[@id = 'targetValue${positionTargetValue}']`);
            let input = await this.getFieldType(xpath);
            await input.setValue(inputValue);
            return true;
        } catch (error) {
            console.log(`inputTargetValue`);
            console.log(error);
            return false;
        }
    }

    public async inputCombineComparisonsWith(inputValue: string) {
        try {
            let input = await this.getFieldType(this.cmbCombineComparisonsWith);
            await input.setValue(inputValue);
            return true;
        } catch (error) {
            console.log(`inputCombineComparisonsWith`);
            console.log(error);
            return false;
        }
    }

    //#endregion

    //#region validate cover details
    public async validateCoverTitleValue(expectedValue: string) {
        try {
            let element = await this.getFieldType(this.lblCoverTitle);
            let actualValue = await element.getValue()
            return await this.driverService.validateRecord("Validate CoverTitle ", [actualValue.toLocaleLowerCase(), expectedValue.toLocaleLowerCase(), "Incorrect CoverTitle!"]);
        } catch (error) {
            console.log(`validateCoverTitleValue`);
            console.log(error);
            return false;
        }
    }

    public async validateCoverNameValue(expectedValue: string) {
        try {
            let element = await this.getFieldType(this.txtCoverName);
            let actualValue = element.webEle.getAttributeValue(this.txtCoverName, "value");
            return await this.driverService.validateRecord("Validate CoverNameValue ", [actualValue, expectedValue, "Incorrect Cover Name!"]);
        } catch (error) {
            console.log(`validateCoverNameValue`);
            console.log(error);
            return false;
        }
    }

    public async validateCoverIDValue(expectedValue: string) {
        try {
            let actualValue = await this.driverService.getAttributeValue(this.txtCoverID, "value");
            return await this.driverService.validateRecord("Validate CoverIDValue ", [actualValue, expectedValue, "Incorrect Cover ID!"]);
        } catch (error) {
            console.log(`validateCoverIDValue`);
            console.log(error);
            return false;
        }
    }

    public async validateDisplayNameValue(expectedValue: string) {
        try {
            let actualValue = await this.driverService.getAttributeValue(this.txtDisplayName, "value");
            return await this.driverService.validateRecord("Validate DisplayNameValue ", [actualValue, expectedValue, "Incorrect Display Name!"]);
        } catch (error) {
            console.log(`validateDisplayNameValue`);
            console.log(error);
            return false;
        }
    }

    public async validateIndustryCodeValue(expectedValue: string) {
        try {
            let actualValue = await this.driverService.getAttributeValue(this.txtIndustryCode, "value");
            return await this.driverService.validateRecord("Validate IndustryCodeValue ", [actualValue, expectedValue, "Incorrect IndustryCode!"]);
        } catch (error) {
            console.log(`validateIndustryCodeValue`);
            console.log(error);
            return false;
        }
    }

    public async validateReportingCodeValue(expectedValue: string) {
        try {
            let actualValue = await this.driverService.getAttributeValue(this.txtReportingCode, "value");
            return await this.driverService.validateRecord("Validate ReportingCodeValue ", [actualValue, expectedValue, "Incorrect ReportingCode!"]);
        } catch (error) {
            console.log(`validateReportingCodeValue`);
            console.log(error);
            return false;
        }
    }

    public async validateStrategyTypeValue(expectedValue: string) {
        try {
            let element = await this.getFieldType(this.lblSelectionStrategyType);
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("Validate StrategyTypeValue ", [actualValue, expectedValue, "Incorrect StrategyType!"]);
        } catch (error) {
            console.log(`validateStrategyTypeValue`);
            console.log(error);
            return false;
        }
    }

    public async validateSourceQuestionValue(expectedValue: string) {
        try {
            let element = await this.getFieldType(this.lblSourceQuestion);
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("Validate SourceQuestionValue ", [actualValue, expectedValue, "Incorrect SourceQuestion!"]);
        } catch (error) {
            console.log(`validateSourceQuestionValue`);
            console.log(error);
            return false;
        }
    }

    public async validateOperationValue(expectedValue: string) {
        try {
            let element = await this.getFieldType(this.lblOperation);
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("Validate OperationValue ", [actualValue, expectedValue, "Incorrect Operation!"]);
        } catch (error) {
            console.log(`validateOperationValue`);
            console.log(error);
            return false;
        }
    }

    public async validateTargetValue(expectedValue: string, positionTargetValue: number = 0) {
        try {
            let xpath = By.xpath(`//*[@id = 'targetValue${positionTargetValue}']`);
            let actualValue = await this.driverService.getAttributeValue(xpath, "value");
            return await this.driverService.validateRecord("Validate TargetValue ", [actualValue, expectedValue, "Incorrect TargetValue!"]);
        } catch (error) {
            console.log(`validateTargetValue`);
            console.log(error);
            return false;
        }
    }

    public async validateCombineComparisonsWithValue(expectedValue: string) {
        try {
            let element = await this.getFieldType(this.lblCombineComparisonsWith);
            let actualValue = await element.getValue();
            return await this.driverService.validateRecord("Validate CombineComparisonsWithValue ", [actualValue, expectedValue, "Incorrect CombineComparisonsWith!"]);
        } catch (error) {
            console.log(`validateCombineComparisonsWithValue`);
            console.log(error);
            return false;
        }
    }


    //#endregion
}