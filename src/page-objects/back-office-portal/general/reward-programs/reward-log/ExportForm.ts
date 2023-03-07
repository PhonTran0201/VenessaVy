// generate by MappingPage
import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";
import { TableManager } from "../../../../../core/fields/TableManager";
import { getCurrentDateTime, logFailMessage, selectDropdownOption, selectDropdownOption_v2, waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";
import { GlobalPageObject } from "../../GlobalPageObject/GlobalPageObject";
import { RewardLogPage } from "./RewardLogPage";

export class ExportForm extends BasePage {
    locAPrev: By = By.xpath(`//app-reward-log-export-form//a[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"prev")]`);
    locANext: By = By.xpath(`//app-reward-log-export-form//a[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"next")]`);
    locInputpgsloyaltyfromdate: By = By.xpath(`//app-reward-log-export-form//input[contains(@id,'pgs-loyalty-from-date')]`);
    locInputpgsloyaltytodate: By = By.xpath(`//app-reward-log-export-form//input[contains(@id,'pgs-loyalty-to-date')]`);
    locInputpgsloyaltyprogram: By = By.xpath(`//app-reward-log-export-form//input[contains(@id,'pgs-loyalty-program')]`);
    locInputpgsloyaltyproduct: By = By.xpath(`//app-reward-log-export-form//input[contains(@id,'pgs-loyalty-product')]`);
    locNgselectSelectaprogram: By = By.xpath(`//app-reward-log-export-form//ng-select[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"select a program")]`);
    locNgselectSelectaproduct: By = By.xpath(`//app-reward-log-export-form//ng-select[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"select a product")]`);
    locButtonclosebtn: By = By.xpath(`//app-reward-log-export-form//button[contains(@id,'close-btn')]`);
    locButtonpgsloyaltyexportbtn: By = By.xpath(`//app-reward-log-export-form//button[contains(@id,'pgs-loyalty-export-btn')]`);
    locButtonpgsexpandrowsbtn: By = By.xpath(`//app-reward-log-export-form//button[contains(@id,'pgs-expand-rows-btn')]`);
    locButtonpgsrewardlogexportbtn: By = By.xpath(`//app-reward-log-export-form//button[contains(@id,'pgs-reward-log-export-btn')]`);
    locButtonpgsrewardlogcancelbtn: By = By.xpath(`//app-reward-log-export-form//button[contains(@id,'pgs-reward-log-cancel-btn')]`);
    locInputSelectAllPrograms: By = By.xpath(`//app-reward-log-export-form//input[contains(@id,'pgs-loyalty-all-programs')]`);
    locCheckboxSelectAllPrograms: By = By.xpath(`//app-reward-log-export-form//label[./input[contains(@id,'pgs-loyalty-all-programs')]]//span[@class='check']`);
    locInputSelectAllProducts: By = By.xpath(`//app-reward-log-export-form//input[contains(@id,'pgs-loyalty-all-products')]`);
    locCheckboxSelectAllProducts: By = By.xpath(`//app-reward-log-export-form//label[./input[contains(@id,'pgs-loyalty-all-products')]]//span[@class='check']`);




    async setInputpgsloyaltyfromdate(value) {
        try {
            if(!value){
                return true;
            }
            let ele = await this.getFieldType(this.locInputpgsloyaltyfromdate);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputpgsloyaltytodate(value) {
        try {
            if(!value){
                return true;
            }
            let ele = await this.getFieldType(this.locInputpgsloyaltytodate)

            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputpgsloyaltyprogram(value) {
        try {
            if(!value){
                return true;
            }
            let ele = await this.getFieldType(this.locInputpgsloyaltyprogram)
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputpgsloyaltyproduct(value) {
        try {
            if(!value){
                return true;
            }
            let ele = await this.getFieldType(this.locInputpgsloyaltyproduct)
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setNgselectSelectaprogram(value) {
        try {
            if(!value){
                return true;
            }
            await this.driverService.waitUntilElementLoaded(this.locInputpgsloyaltyprogram)
            await this.driverService.setText(this.locInputpgsloyaltyprogram, value)
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService,2000);
            await selectDropdownOption(value,"", this.driverService);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setNgselectSelectaproduct(value) {
        try {
            if(!value){
                return true;
            }
            let ele = await this.getFieldType(this.locNgselectSelectaproduct);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async clickButtonclosebtn() {
        try {
            let ele = await this.getFieldType(this.locButtonclosebtn);
            await ele.click();
            await this.waitPageProgressCompleted();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async clickButtonpgsloyaltyexportbtn() {
        try {
            let ele = await this.getFieldType(this.locButtonpgsloyaltyexportbtn);
            await ele.click();
            await this.waitPageProgressCompleted();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    async clickButtonpgsrewardlogexportbtn() {
        try {
            let ele = await this.getFieldType(this.locButtonpgsrewardlogexportbtn);
            await ele.click();
            await this.waitPageProgressCompleted();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async clickButtonpgsrewardlogcancelbtn() {
        try {
            let ele = await this.getFieldType(this.locButtonpgsrewardlogcancelbtn);
            await ele.click();
            await this.waitPageProgressCompleted();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async validateProgramCannotFindOption(ProgramName: string) {
        try {
            await this.driverService.sendKeys(this.locInputpgsloyaltyprogram, ProgramName);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 2000);
            let option1 = By.xpath(`//ng-dropdown-panel//div/*[self::*[contains(text(),'No items found')]]`);
            let option2 = By.xpath(`//ng-dropdown-panel//div/*[self::*[contains(text(),'No data here')]]`);
            if (await this.driverService.isExisted(option1) || await this.driverService.isExisted(option2)) {
                return true;
            } return false;
        } catch (error) {
            console.log(`validateProgramCannotFindOption`);
            console.log(error);
            return false;
        }
    }

    //#region checkbox
    public async tickOrUnTickSelectAllPrograms(isTicked: boolean = true) {
        try {
            let ele = await this.getFieldType(this.locCheckboxSelectAllPrograms);
            if (isTicked) {
                if (await this.driverService.getAttributeValue(this.locInputSelectAllPrograms, 'checked') == 'false') {
                    await ele.click()
                }
                return true;
            } else {
                if (await this.driverService.getAttributeValue(this.locInputSelectAllPrograms, 'checked') == 'true') {
                    await ele.click()
                }
                return true;
            }
        } catch (error) {
            console.log('tickOrUnTickSelectAllProgram');
            console.log(error);
            return false;
        }
    }

    public async validateSelectAllProgramsIsTickedOrNot(isTicked: boolean) {
        try {
            let isChecked = await this.driverService.getAttributeValue(this.locInputSelectAllPrograms, 'checked');
            if (isTicked) {
                if (isChecked == (isTicked.toString().toLocaleLowerCase())) {
                    return true;
                }
                return false;
            } else {
                if (isChecked != 'true') {
                    return true;
                }
                return false;
            }

        } catch (error) {
            console.log('validateSelectAllProgramsIsTickedOrNot');
            console.log(error);
            return false;
        }
    }


    public async tickOrUnTickSelectAllPProducts(isTicked: boolean = false) {
        try {
            let ele = await this.getFieldType(this.locCheckboxSelectAllProducts);
            if (isTicked) {
                if (await this.driverService.getAttributeValue(this.locInputSelectAllProducts, 'checked') == 'false') {
                    await ele.click();
                }
                return true;
            } else {
                if (await this.driverService.getAttributeValue(this.locInputSelectAllProducts, 'checked') == 'true') {
                    await ele.click();
                }
                return true;
            }
        } catch (error) {
            console.log('tickOrUnTickSelectAllProducts');
            console.log(error);
            return false;
        }
    }

    public async validateSelectAllProductsIsTickedOrNot(isTicked: boolean) {
        try {
            let isChecked = await this.driverService.getAttributeValue(this.locInputSelectAllProducts, 'checked');
            if (isTicked) {
                if (isChecked == (isTicked.toString().toLocaleLowerCase())) {
                    return true;
                }
                return false;
            } else {
                if (isChecked != 'true') {
                    return true;
                }
                return false;
            }

        } catch (error) {
            console.log('validateSelectAllProductsIsTickedOrNot');
            console.log(error);
            return false;
        }
    }

    public async validateProgramFieldIsDisabledOrNot(isDisable: boolean) {
        try {
            if (isDisable) {
                if (await this.driverService.isExisted(By.xpath(`//*[@id='reward-log-form']//div[./label[@for='pgs-loyalty-program']]//ng-select[contains(@class,'ng-select-disabled')]`))) {
                    return true;
                } else return false;
            } else {
                if (await this.driverService.isExisted(By.xpath(`//*[@id='reward-log-form']//div[./label[@for='pgs-loyalty-program']]//ng-select[not(contains(@class,'ng-select-disabled'))]`))) {
                    return true;
                } else return false;
            }
        } catch (error) {
            console.log('validateProgramFieldIsDisabledOrNot');
            console.log(error);
            return false;
        }

    }
    //#endregion

    public async downloadExportFileByClickingToToastMessage() {
        try {
            let message = By.xpath(`//div[@id='toast-container']//div[contains(@class,'toast-message')]//a`);
            await this.driverService.waitForElementInVisible(message);
            let ele = await this.getFieldType(message);
            await ele.click();
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true;
        } catch (error) {
            console.log(`downloadExportFileByClickingToToastMessage`);
            console.log(error);
            return false;
        }
    }

    public async downloadExportFileOnRewardLogExportForm() {
        try {
            while (!await this.driverService.isExisted(By.xpath(`//app-reward-log-export-form`))) {
                let page = new RewardLogPage(this.driverService);
                await page.clickButtonExport();
            }
            let xpathCreateDate = By.xpath(`//*[@id='reward-log-form']//table//tbody//tr[1]//td[@colspan='2']`);
            let xpathDownload = By.xpath(`//*[@id='reward-log-form']//table//tbody//tr[1]//button[@id='pgs-loyalty-export-btn']`);

            await this.driverService.waitUntilElementVisible(xpathCreateDate);
            let expectedValue = getCurrentDateTime();
            let pageGlobal = new GlobalPageObject(this.driverService);
            let actualValue = await (await this.getFieldType(xpathCreateDate)).getValue();
            //Maximize delay time is 1 minutes.
            for (let i = 0; i < 20; i++) {
                if (actualValue.localeCompare(expectedValue) !== 0) {
                    if (Number(expectedValue.substring(14, 16)) - Number(actualValue.substring(14, 16)) < 1) {
                        await (await this.getFieldType(xpathDownload)).click();
                        await waitUntilHorizontalProgressBarLoaded(this.driverService);
                        return true;
                    }else {
                        await pageGlobal.reloadTable(3000);
                        actualValue = await (await this.getFieldType(xpathCreateDate)).getValue();
                    }
                }else{
                    await (await this.getFieldType(xpathDownload)).click();
                    await waitUntilHorizontalProgressBarLoaded(this.driverService);
                    return true;
                }
            }
            logFailMessage(`Can not find the exported file!`);
            return false;
            } catch (error) {
                console.log(`downloadExportFileOnRewardLogExportForm`);
                console.log(error);
                return false;
            }
        }



}