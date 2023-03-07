import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { logInfoMessage, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";
import { GlobalDateTimeContainer } from "../../../../back-office-portal/general/GlobalPageObject/GlobalDateTimeContainer";
import { ClaimFormInsurance } from "../../../../back-office-portal/insurance/claim/claim-forms/ClaimFormInsurance";
const remote = require("selenium-webdriver/remote");

export class ClaimFormCPVarsam extends ClaimFormInsurance {
    //#region Xpath
    protected cmbInsuredObject = By.xpath("//app-claim-form//select[contains(@id,'policyId')]");
    protected dtpDateOfLoss = By.xpath("//app-claim-form//input[contains(@id,'dateOfLoss')]");
    protected txtAddress = By.xpath("//app-claim-form//textarea[contains(@id,'textarea_place')]");
    protected txtCity = By.xpath("//app-claim-form//textarea[contains(@id,'textarea_city')]");
    protected cmbCauseOfLoss = By.xpath("//app-claim-form//select[contains(@id,'causeOfLoss')]");
    protected fileAttachment = By.xpath("//app-claim-form//input[@type='file']");


    // Validation
    protected lblInsuredObjectValidation = By.xpath("//app-claim-form//formly-horizontal-wrapper[.//select[contains(@id,'policyId')]]//formly-validation-message");
    protected lblDateOfLossValidation = By.xpath("//app-claim-form//formly-horizontal-wrapper[.//input[contains(@id,'dateOfLoss')]]//formly-validation-message");
    protected lblAddressValidation = By.xpath("//app-claim-form//formly-horizontal-wrapper[.//textarea[contains(@id,'textarea_place')]]//formly-validation-message");
    protected lblCityValidation = By.xpath("//app-claim-form//formly-horizontal-wrapper[.//textarea[contains(@id,'textarea_city')]]//formly-validation-message");
    protected lblCauseOfLossValidation = By.xpath("//app-claim-form//formly-horizontal-wrapper[.//select[contains(@id,'causeOfLoss')]]//formly-validation-message");
    //#endregion

    //#region 
    public async inputObjectNameClaimForm(value: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.cmbInsuredObject);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);

            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);

            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);

            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);

            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);

            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);

            await this.driverService.pressTabCurrentElement();
            await this.driverService.click(this.cmbInsuredObject);
            await this.driverService.waitForSeconds(500);
            const option = By.xpath(`//app-claim-form//select[contains(@id,'policyId')]//option[text()='${value}']`);
            await this.driverService.click(option);
            await this.driverService.waitForSeconds(500);
            const isSelected = (await this.driverService.getAttributeValue(option, "selected")) === "true";
            return isSelected;
        } catch (error) {
            console.log('inputObjectNameClaimForm');
            console.log(error);
            return false;
        }
    }

    public async inputObjectNameClaimFormByIndex(index: number) {
        try {
            await this.driverService.waitUntilElementVisible(this.cmbInsuredObject);
            await this.driverService.click(this.cmbInsuredObject);
            await this.driverService.waitForSeconds(500);
            const option = By.xpath(`//app-claim-form//select[contains(@id,'policyId')]//option[${index + 1}]`);
            await this.driverService.click(option);
            await this.driverService.waitForSeconds(500);
            const isSelected = (await this.driverService.getAttributeValue(option, "selected")) === "true";
            return isSelected;
        } catch (error) {
            console.log('inputObjectNameClaimFormByIndex');
            console.log(error);
            return false;
        }
    }

    public async inputCauseOfLossClaimForm(value: string): Promise<boolean> {
        try {
            await this.driverService.waitUntilElementVisible(this.cmbCauseOfLoss);
            await this.driverService.click(this.cmbCauseOfLoss);
            await this.driverService.waitForSeconds(1000);
            const option = By.xpath(`//app-claim-form//select[contains(@id,'causeOfLoss')]//option[text()='${value}']`);
            await this.driverService.click(option);
            await this.driverService.waitForSeconds(500);
            const isSelected = (await this.driverService.getAttributeValue(option, "selected")) === "true";
            return isSelected;
        } catch (error) {
            console.log('inputCauseOfLossClaimForm');
            console.log(error);
            return false;
        }
    }

    public async inputCauseOfLossClaimFormByIndex(index: number): Promise<boolean> {
        try {
            await this.driverService.waitUntilElementVisible(this.cmbCauseOfLoss);
            await this.driverService.click(this.cmbCauseOfLoss);
            await this.driverService.waitForSeconds(500);
            const option = By.xpath(`//app-claim-form//select[contains(@id,'causeOfLoss')]//option[${index + 1}]`);
            await this.driverService.click(option);
            await this.driverService.waitForSeconds(500);
            const isSelected = (await this.driverService.getAttributeValue(option, "selected")) === "true";
            return isSelected;
        } catch (error) {
            console.log('inputCauseOfLossClaimFormByIndex');
            console.log(error);
            return false;
        }
    }

    public async inputDateOfLossClaimForm(DateOfLoss: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.dtpDateOfLoss);
            await this.driverService.click(this.dtpDateOfLoss);
            const globalDateTimeContainer = new GlobalDateTimeContainer(SeleniumWebDriverService.getInstance());
            let temp1 = await globalDateTimeContainer.inputDateTime(DateOfLoss);
            let temp2 = await globalDateTimeContainer.pressSetButton();
            return temp1 && temp2;
        } catch (error) {
            console.log("inputDateOfLossClaimForm");
            console.log(error);
            return false;
        }
    }

    public async inputAttachmentClaimForm(UploadDocuments: string) {
        try {
            // await this.driverService.waitUntilElementVisible(this.fileAttachment);
            // await this.driverService.pressTabCurrentElement();
            if (__dirname.includes("jenkins") && !__dirname.includes(".jenkins")) {
                logInfoMessage("\tSet File Detector on Jenkins...");
                await this.driverService.getDriver().setFileDetector(new remote.FileDetector());
                logInfoMessage("File dir: " + __dirname);
            }
            await this.driverService.sendKeys(this.fileAttachment, UploadDocuments);
            await this.driverService.waitForSeconds(1000);
            return true;
        } catch (error) {
            console.log("inputAttachmentClaimForm");
            console.log(error);
            return false;
        }
    }

    public async inputCityClaimForm(value: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.txtCity);
            await this.driverService.setText(this.txtCity, value);
            return true;
        } catch (error) {
            console.log('inputCityClaimForm');
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region Check validation
    public async validateValueInsuredObjectValidation(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.lblInsuredObjectValidation);
            const actualValue = await this.driverService.getText(this.lblInsuredObjectValidation);
            return await this.driverService.validateRecord('Validate InsuredObjectValidation!',
                [actualValue, expectedValue, 'Incorrect InsuredObjectValidation!']);
        } catch (error) {
            console.log('validateValueInsuredObjectValidation');
            console.log(error);
            return false;
        }
    }

    public async validateValueDateOfLossValidation(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.lblDateOfLossValidation);
            const actualValue = await this.driverService.getText(this.lblDateOfLossValidation);
            return await this.driverService.validateRecord('Validate DateOfLossValidation!',
                [actualValue, expectedValue, 'Incorrect DateOfLossValidation!']);
        } catch (error) {
            console.log('validateValueDateOfLossValidation');
            console.log(error);
            return false;
        }
    }

    public async validateValueAddressValidation(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.lblAddressValidation);
            const actualValue = await this.driverService.getText(this.lblAddressValidation);
            return await this.driverService.validateRecord('Validate AddressValidation!',
                [actualValue, expectedValue, 'Incorrect AddressValidation!']);
        } catch (error) {
            console.log('validateValueAddressValidation');
            console.log(error);
            return false;
        }
    }

    public async validateValueCityValidation(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.lblCityValidation);
            const actualValue = await this.driverService.getText(this.lblCityValidation);
            return await this.driverService.validateRecord('Validate CityValidation!',
                [actualValue, expectedValue, 'Incorrect CityValidation!']);
        } catch (error) {
            console.log('validateValueCityValidation');
            console.log(error);
            return false;
        }
    }

    public async validateValueCauseOfLossValidation(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.lblCauseOfLossValidation);
            const actualValue = await this.driverService.getText(this.lblCauseOfLossValidation);
            return await this.driverService.validateRecord('Validate CauseOfLossValidation!',
                [actualValue, expectedValue, 'Incorrect CauseOfLossValidation!']);
        } catch (error) {
            console.log('validateValueCauseOfLossValidation');
            console.log(error);
            return false;
        }
    }
    //#endregion


    //#region Check option exist on dropdown
    public async checkOptionInsuredObjectExist(option: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.cmbInsuredObject);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            const optionItem = By.xpath(`//app-claim-form//select[contains(@id,'policyId')]//option[text()='${option}']`);
            await this.driverService.click(optionItem);
            return this.driverService.isExisted(optionItem);
        } catch (error) {
            console.log('checkOptionInsuredObjectExist');
            console.log(error);
            return false;
        }
    }

    // Incident Type
    public async checkOptionCauseOfLossExist(option: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.cmbCauseOfLoss);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            const optionItem = By.xpath(`//app-claim-form//select[contains(@id,'causeOfLoss')]//option[text()='${option}']`);
            await this.driverService.click(optionItem);
            return this.driverService.isExisted(optionItem);
        } catch (error) {
            console.log('checkOptionCauseOfLossExist');
            console.log(error);
            return false;
        }
    }
    //#endregion


    //#region Validate value on Claim form
    public async validateValueInsuredObjectClaimForm(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.cmbInsuredObject);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            const selectedIndex = parseInt(await this.driverService.getAttributeValue(this.cmbInsuredObject, 'selectedIndex')) + 1;
            const selectedOption = By.xpath(`(//app-claim-form//select[contains(@id,'policyId')]//option)[${selectedIndex}]`);
            const actualValue = await this.driverService.getText(selectedOption);
            return this.driverService.validateRecord("Validate Object Name",
                [actualValue, expectedValue, "Incorrect Object Name!"]
            );
        } catch (error) {
            console.log('validateValueInsuredObjectClaimForm');
            console.log(error);
            return false;
        }
    }

    public async validateValueDateOfLossClaimForm(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.dtpDateOfLoss);
            const actualValue = await this.driverService.getAttributeValue(this.dtpDateOfLoss, 'value');
            return await this.driverService.validateRecord('Validate DateOfLoss!',
                [actualValue, expectedValue, 'Incorrect DateOfLoss!']);
        } catch (error) {
            console.log('validateValueDateOfLossClaimForm');
            console.log(error);
            return false;
        }
    }
    public async validateValueAddressClaimForm(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.txtAddress);
            const actualValue = await this.driverService.getAttributeValue(this.txtAddress, 'value');
            return await this.driverService.validateRecord('Validate Address!',
                [actualValue, expectedValue, 'Incorrect Address!']);
        } catch (error) {
            console.log('validateValueAddressClaimForm');
            console.log(error);
            return false;
        }
    }
    public async validateValueCityClaimForm(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.txtCity);
            const actualValue = await this.driverService.getAttributeValue(this.txtCity, 'value');
            return await this.driverService.validateRecord('Validate City!',
                [actualValue, expectedValue, 'Incorrect City!']);
        } catch (error) {
            console.log('validateValueCityClaimForm');
            console.log(error);
            return false;
        }
    }
    public async validateValueCauseOfLossClaimForm(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.cmbCauseOfLoss);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            const selectedIndex = parseInt(await this.driverService.getAttributeValue(this.cmbCauseOfLoss, 'selectedIndex')) + 1;
            const selectedOption = By.xpath(`(//app-claim-form//select[contains(@id,'causeOfLoss')]//option)[${selectedIndex}]`);
            const actualValue = await this.driverService.getText(selectedOption);
            return this.driverService.validateRecord("Validate CauseOfLoss",
                [actualValue, expectedValue, "Incorrect CauseOfLoss!"]
            );
        } catch (error) {
            console.log('validateValueCauseOfLossClaimForm');
            console.log(error);
            return false;
        }
    }
    //#endregion
}