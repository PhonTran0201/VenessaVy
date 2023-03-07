// generate by MappingPage
import { By } from "selenium-webdriver";
import { QuoteCreateQuote } from "../QuoteCreateQuote";
export class QuoteCreateQuoteVarsamProductSmadjur extends QuoteCreateQuote {
    protected locInputstartDate: By = By.xpath(`//app-sales-process-layout-render//input[contains(@id,'startDate')]`);
    protected locInputendDate: By = By.xpath(`//app-sales-process-layout-render//input[contains(@id,'endDate')]`);
    protected locInputInsuredPersonFirstNameTag: By = By.xpath(`//app-sales-process-layout-render//input[contains(@id,'InsuredPersonFirstNameTag')]`);
    protected locInputInsuredPersonLastNameTag: By = By.xpath(`//app-sales-process-layout-render//input[contains(@id,'InsuredPersonLastNameTag')]`);
    protected locInputInsuredPersonSSNTag: By = By.xpath(`//app-sales-process-layout-render//input[contains(@id,'InsuredPersonSSNTag')]`);
    protected locInputInsuredPersonAddrPostCodeTag: By = By.xpath(`//app-sales-process-layout-render//input[contains(@id,'InsuredPersonAddrPostCodeTag')]`);
    protected locInputAnimalNameTag: By = By.xpath(`//app-sales-process-layout-render//input[contains(@id,'AnimalNameTag')]`);
    protected locInputPetDOBTag: By = By.xpath(`//app-sales-process-layout-render//input[contains(@id,'PetDOBTag')]`);
    protected locInputPetIDTag: By = By.xpath(`//app-sales-process-layout-render//input[contains(@id,'PetIDTag')]`);
    protected locInputPetChipTag: By = By.xpath(`//app-sales-process-layout-render//input[contains(@id,'PetChipTag')]`);
    protected locInputPetPurchasedDateTag: By = By.xpath(`//app-sales-process-layout-render//input[contains(@id,'PetPurchasedDateTag')]`);
    protected locInputPetPurchaseValueTag: By = By.xpath(`//app-sales-process-layout-render//input[contains(@id,'PetPurchaseValueTag')]`);
    protected locInputHighestCompensationTag: By = By.xpath(`//app-sales-process-layout-render//input[contains(@id,'HighestCompensationTag')]`);
    protected locTextareaExternalTextTag: By = By.xpath(`//app-sales-process-layout-render//textarea[contains(@id,'ExternalTextTag')]`);
    protected locTextareaInternalTextTag: By = By.xpath(`//app-sales-process-layout-render//textarea[contains(@id,'InternalTextTag')]`);
    protected locSelectAnimalTreatedByVetTag: By = By.xpath(`//app-sales-process-layout-render//select[contains(@id,'AnimalTreatedByVetTag')]`);
    protected locSelectAnimalTreatedWithMedicineTag: By = By.xpath(`//app-sales-process-layout-render//select[contains(@id,'AnimalTreatedWithMedicineTag')]`);
    protected locSelectAnimalHasUncheckedProblemsTag: By = By.xpath(`//app-sales-process-layout-render//select[contains(@id,'AnimalHasUncheckedProblemsTag')]`);
    protected locSelectAnimalHasClaimPaymentsTag: By = By.xpath(`//app-sales-process-layout-render//select[contains(@id,'AnimalHasClaimPaymentsTag')]`);
    protected locSelectAnimalIsHealthyTag: By = By.xpath(`//app-sales-process-layout-render//select[contains(@id,'AnimalIsHealthyTag')]`);
    protected locNgselectPreviousInsurerTag: By = By.xpath(`//app-sales-process-layout-render//ng-select[contains(@id,'PreviousInsurerTag')]`);
    protected locNgselectAnimalBreedTag: By = By.xpath(`//app-sales-process-layout-render//ng-select[contains(@id,'AnimalBreedTag')]`);
    protected locNgselectPetGenderTag: By = By.xpath(`//app-sales-process-layout-render//ng-select[contains(@id,'PetGenderTag')]`);
    protected locNgselectDeductiblePercentageTag: By = By.xpath(`//app-sales-process-layout-render//ng-select[contains(@id,'DeductiblePercentageTag')]`);
    protected locNgselectDeductibleAmountTag: By = By.xpath(`//app-sales-process-layout-render//ng-select[contains(@id,'DeductibleAmountTag')]`);


    async setInputstartDate(value) {
        try {
            let ele = await this.getFieldType(this.locInputstartDate);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputendDate(value) {
        try {
            let ele = await this.getFieldType(this.locInputendDate);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputInsuredPersonFirstNameTag(value) {
        try {
            let ele = await this.getFieldType(this.locInputInsuredPersonFirstNameTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputInsuredPersonLastNameTag(value) {
        try {
            let ele = await this.getFieldType(this.locInputInsuredPersonLastNameTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputInsuredPersonSSNTag(value) {
        try {
            let ele = await this.getFieldType(this.locInputInsuredPersonSSNTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputInsuredPersonAddrPostCodeTag(value) {
        try {
            let ele = await this.getFieldType(this.locInputInsuredPersonAddrPostCodeTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputAnimalNameTag(value) {
        try {
            let ele = await this.getFieldType(this.locInputAnimalNameTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputPetDOBTag(value) {
        try {
            let ele = await this.getFieldType(this.locInputPetDOBTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputPetIDTag(value) {
        try {
            let ele = await this.getFieldType(this.locInputPetIDTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputPetChipTag(value) {
        try {
            let ele = await this.getFieldType(this.locInputPetChipTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputPetPurchasedDateTag(value) {
        try {
            let ele = await this.getFieldType(this.locInputPetPurchasedDateTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputPetPurchaseValueTag(value) {
        try {
            let ele = await this.getFieldType(this.locInputPetPurchaseValueTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setInputHighestCompensationTag(value) {
        try {
            let ele = await this.getFieldType(this.locInputHighestCompensationTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setTextareaExternalTextTag(value) {
        try {
            let ele = await this.getFieldType(this.locTextareaExternalTextTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setTextareaInternalTextTag(value) {
        try {
            let ele = await this.getFieldType(this.locTextareaInternalTextTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setSelectAnimalTreatedByVetTag(value) {
        try {
            let ele = await this.getFieldType(this.locSelectAnimalTreatedByVetTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setSelectAnimalTreatedWithMedicineTag(value) {
        try {
            let ele = await this.getFieldType(this.locSelectAnimalTreatedWithMedicineTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setSelectAnimalHasUncheckedProblemsTag(value) {
        try {
            let ele = await this.getFieldType(this.locSelectAnimalHasUncheckedProblemsTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setSelectAnimalHasClaimPaymentsTag(value) {
        try {
            let ele = await this.getFieldType(this.locSelectAnimalHasClaimPaymentsTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setSelectAnimalIsHealthyTag(value) {
        try {
            let ele = await this.getFieldType(this.locSelectAnimalIsHealthyTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setNgselectPreviousInsurerTag(value) {
        try {
            let ele = await this.getFieldType(this.locNgselectPreviousInsurerTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setNgselectAnimalBreedTag(value) {
        try {
            let ele = await this.getFieldType(this.locNgselectAnimalBreedTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setNgselectPetGenderTag(value) {
        try {
            let ele = await this.getFieldType(this.locNgselectPetGenderTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setNgselectDeductiblePercentageTag(value) {
        try {
            let ele = await this.getFieldType(this.locNgselectDeductiblePercentageTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setNgselectDeductibleAmountTag(value) {
        try {
            let ele = await this.getFieldType(this.locNgselectDeductibleAmountTag);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    public async validateValueFirstName(expectedValue: string){
        try {
            await this.driverService.waitUntilElementVisible(this.locInputInsuredPersonFirstNameTag);
            const actualValue = await this.driverService.getAttributeValue(this.locInputInsuredPersonFirstNameTag,'value');
            return await this.driverService.validateRecord('Validate First Name!',
                [actualValue, expectedValue, 'Incorrect First Name!']);
        } catch (error) {
            console.log('validateValueFirstName');
            console.log(error);
            return false;
        }
    }
    public async validateValueLastName(expectedValue: string){
        try {
            await this.driverService.waitUntilElementVisible(this.locInputInsuredPersonLastNameTag);
            const actualValue = await this.driverService.getAttributeValue(this.locInputInsuredPersonLastNameTag,'value');
            return await this.driverService.validateRecord('Validate Last Name!',
                [actualValue, expectedValue, 'Incorrect Last Name!']);
        } catch (error) {
            console.log('validateValueLastName');
            console.log(error);
            return false;
        }
    }
    public async validateValuePersonSSN(expectedValue: string){
        try {
            await this.driverService.waitUntilElementVisible(this.locInputInsuredPersonSSNTag);
            const actualValue = await this.driverService.getAttributeValue(this.locInputInsuredPersonSSNTag,'value');
            return await this.driverService.validateRecord('Validate Person SSN!',
                [actualValue, expectedValue, 'Incorrect Person SSN!']);
        } catch (error) {
            console.log('validateValuePersonSSN');
            console.log(error);
            return false;
        }
    }
    public async validateValuePersonAddrPostCode(expectedValue: string){
        try {
            await this.driverService.waitUntilElementVisible(this.locInputInsuredPersonAddrPostCodeTag);
            const actualValue = await this.driverService.getAttributeValue(this.locInputInsuredPersonAddrPostCodeTag,'value');
            return await this.driverService.validateRecord('Validate PersonAddrPostCode!',
                [actualValue, expectedValue, 'Incorrect PersonAddrPostCode!']);
        } catch (error) {
            console.log('validateValuePersonAddrPostCode');
            console.log(error);
            return false;
        }
    }
}