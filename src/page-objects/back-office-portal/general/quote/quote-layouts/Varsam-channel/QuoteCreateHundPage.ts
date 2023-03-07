// generate by MappingPage
import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../../core/BasePage";
export class QuoteCreateHundPage extends BasePage {
    protected LiQuestions = By.xpath(`//app-sales-process//li[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"questions")]`);
    protected LiReview = By.xpath(`//app-sales-process//li[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"review")]`);
    protected LiAcceptance = By.xpath(`//app-sales-process//li[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"acceptance")]`);
    protected H2CREATEQUOTE = By.xpath(`//app-sales-process//h2[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"create quote")]`);
    protected H2QUOTEREF1028653 = By.xpath(`//app-sales-process//h2[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"quote ref.: 1028653")]`);
    protected lblFRSKRINGSINFORMATION = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"försäkringsinformation")]`);
    protected LiFrskringsinformation = By.xpath(`//app-sales-process//li[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"försäkringsinformation")]`);
    protected lblStartDate = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"start date *")]`);
    protected txtstartDate = By.xpath(`//app-sales-process//input[contains(@id,'startDate')]`);
    protected LiUppgifteromDig = By.xpath(`//app-sales-process//li[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"uppgifter om dig")]`);
    protected lblEndDate = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"end date *")]`);
    protected LiUppgifteromHunden = By.xpath(`//app-sales-process//li[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"uppgifter om hunden")]`);
    protected txtendDate = By.xpath(`//app-sales-process//input[contains(@id,'endDate')]`);
    protected LiFrskringensinnehll = By.xpath(`//app-sales-process//li[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"försäkringens innehåll")]`);
    protected lblUPPGIFTEROMDIG = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"uppgifter om dig")]`);
    protected lblFrnamn = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"förnamn")]`);
    protected Livrigauppgifter = By.xpath(`//app-sales-process//li[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"övriga uppgifter")]`);
    protected txtInsuredPersonFirstNameTag = By.xpath(`//app-sales-process//input[contains(@id,'InsuredPersonFirstNameTag')]`);
    protected lblEfternamn = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"efternamn")]`);
    protected txtInsuredPersonLastNameTag = By.xpath(`//app-sales-process//input[contains(@id,'InsuredPersonLastNameTag')]`);
    protected lblPersonnummer = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"personnummer *")]`);
    protected txtInsuredPersonSSNTag = By.xpath(`//app-sales-process//input[contains(@id,'InsuredPersonSSNTag')]`);
    protected lblPostnummer = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"postnummer *")]`);
    protected txtInsuredPersonAddrPostCodeTag = By.xpath(`//app-sales-process//input[contains(@id,'InsuredPersonAddrPostCodeTag')]`);
    protected btnBackToQuotesList = By.xpath(`//app-sales-process//button[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"back to quotes list")]`);
    protected btnBack = By.xpath(`//app-sales-process//button[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"back")]`);
    protected btnNext = By.xpath(`//app-sales-process//button[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"next")]`);
    protected lblUPPGIFTEROMHUNDEN = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"uppgifter om hunden")]`);
    protected lblTidigareFrskringsbolag = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"tidigare försäkringsbolag *")]`);
    protected NgSelectPreviousInsurerTag = By.xpath(`//app-sales-process//ng-select[contains(@id,'PreviousInsurerTag')]`);
    protected lblHundensTilltalsnamn = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"hundens tilltalsnamn *")]`);
    protected txtDogNameTag = By.xpath(`//app-sales-process//input[contains(@id,'DogNameTag')]`);
    protected lblFdelsedatum = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"födelsedatum *")]`);
    protected txtDogDOBTag = By.xpath(`//app-sales-process//input[contains(@id,'DogDOBTag')]`);
    protected lblID = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"id")]`);
    protected txtDogIDTag = By.xpath(`//app-sales-process//input[contains(@id,'DogIDTag')]`);
    protected lblChip15Siffror = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"chip (15 siffror) *")]`);
    protected txtDogChipTag = By.xpath(`//app-sales-process//input[contains(@id,'DogChipTag')]`);
    protected lblVljFrskringsprodukt = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"välj försäkringsprodukt *")]`);
    protected SelectDogInsuranceProductsTag = By.xpath(`//app-sales-process//select[contains(@id,'DogInsuranceProductsTag')]`);
    protected lblHundensRastillhrighet = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"hundens rastillhörighet *")]`);
    protected NgSelectDogBreedTag = By.xpath(`//app-sales-process//ng-select[contains(@id,'DogBreedTag')]`);
    protected lblInkpsdatum = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"inköpsdatum *")]`);
    protected txtDogPurchasedDateTag = By.xpath(`//app-sales-process//input[contains(@id,'DogPurchasedDateTag')]`);
    protected lblInkpspris = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"inköpspris *")]`);
    protected txtDogPurchaseValueTag = By.xpath(`//app-sales-process//input[contains(@id,'DogPurchaseValueTag')]`);
    protected lblHundensKn = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"hundens kön")]`);
    protected SelectDogGenderTag = By.xpath(`//app-sales-process//select[contains(@id,'DogGenderTag')]`);
    protected lblHarEnBesiktningGenomfrts = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"har en besiktning genomförts? *")]`);
    protected SelectHasAnInspectionBeenCarriedOutTag = By.xpath(`//app-sales-process//select[contains(@id,'HasAnInspectionBeenCarriedOutTag')]`);
    protected SelectDogImportedTag = By.xpath(`//app-sales-process//select[contains(@id,'DogImportedTag')]`);
    protected lblFrnVilketLandRDjuretImporteratIfrn = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"från vilket land är djuret importerat ifrån?")]`);
    protected txtDogImportedCountryTag = By.xpath(`//app-sales-process//input[contains(@id,'DogImportedCountryTag')]`);
    protected lblHarDjuretNgonGngBehandlatsAvVeterinr = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"har djuret någon gång behandlats av veterinär? *")]`);
    protected SelectDogTreatedByVetTag = By.xpath(`//app-sales-process//select[contains(@id,'DogTreatedByVetTag')]`);
    protected lblBehandlasDjuretMedLkemedel = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"behandlas djuret med läkemedel? *")]`);
    protected SelectDogTreatedWithMedicineTag = By.xpath(`//app-sales-process//select[contains(@id,'DogTreatedWithMedicineTag')]`);
    protected SelectDogHasUncheckedProblemsTag = By.xpath(`//app-sales-process//select[contains(@id,'DogHasUncheckedProblemsTag')]`);
    protected SelectDogHasClaimPaymentsTag = By.xpath(`//app-sales-process//select[contains(@id,'DogHasClaimPaymentsTag')]`);
    protected SelectDogIsHealthyTag = By.xpath(`//app-sales-process//select[contains(@id,'DogIsHealthyTag')]`);
    protected lblFRSKRINGENSINNEHLL = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"försäkringens innehåll")]`);
    protected lblHgstaErsttning = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"högsta ersättning *")]`);
    protected txtHighestCompensationTag = By.xpath(`//app-sales-process//input[contains(@id,'HighestCompensationTag')]`);
    protected lblRrligSjlvrisk = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"rörlig självrisk *")]`);
    protected NgSelectDeductiblePercentageTag = By.xpath(`//app-sales-process//ng-select[contains(@id,'DeductiblePercentageTag')]`);
    protected lblFastSjlvrisk = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"fast självrisk *")]`);
    protected NgSelectDeductibleAmountTag = By.xpath(`//app-sales-process//ng-select[contains(@id,'DeductibleAmountTag')]`);
    protected lblInkluderaLivfrskring = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"inkludera livförsäkring *")]`);
    protected SelectLifeInsuranceTag = By.xpath(`//app-sales-process//select[contains(@id,'LifeInsuranceTag')]`);
    protected lblInkluderaPersonolycksfall = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"inkludera personolycksfall *")]`);
    protected SelectPersonalAccidentTag = By.xpath(`//app-sales-process//select[contains(@id,'PersonalAccidentTag')]`);
    protected lblVRIGAUPPGIFTER = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"övriga uppgifter")]`);
    protected lblExterntext = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"externtext")]`);
    protected txtExternalTextTag = By.xpath(`//app-sales-process//textarea[contains(@id,'ExternalTextTag')]`);
    protected lblInterntext = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"interntext")]`);
    protected txtInternalTextTag = By.xpath(`//app-sales-process//textarea[contains(@id,'InternalTextTag')]`);











    async settxtstartDate(value) {
        try {
            if (!value) {
                console.log("The value of txtstartDate is undefined");
                return;
            }
            let ele = await this.getFieldType(this.txtstartDate);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validatetxtstartDate(expectedValue) {
        try {
            let ele = await this.getFieldType(this.txtstartDate);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate txtstartDate",
                [actualValue, expectedValue, "Incorrect txtstartDate"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }




    async settxtendDate(value) {
        try {
            if (!value) {
                console.log("The value of txtendDate is undefined");
                return;
            }
            let ele = await this.getFieldType(this.txtendDate);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validatetxtendDate(expectedValue) {
        try {
            let ele = await this.getFieldType(this.txtendDate);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate txtendDate",
                [actualValue, expectedValue, "Incorrect txtendDate"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }





    async settxtInsuredPersonFirstNameTag(value) {
        try {
            if (!value) {
                console.log("The value of txtInsuredPersonFirstNameTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.txtInsuredPersonFirstNameTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validatetxtInsuredPersonFirstNameTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.txtInsuredPersonFirstNameTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate txtInsuredPersonFirstNameTag",
                [actualValue, expectedValue, "Incorrect txtInsuredPersonFirstNameTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    async settxtInsuredPersonLastNameTag(value) {
        try {
            if (!value) {
                console.log("The value of txtInsuredPersonLastNameTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.txtInsuredPersonLastNameTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validatetxtInsuredPersonLastNameTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.txtInsuredPersonLastNameTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate txtInsuredPersonLastNameTag",
                [actualValue, expectedValue, "Incorrect txtInsuredPersonLastNameTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    async settxtInsuredPersonSSNTag(value) {
        try {
            if (!value) {
                console.log("The value of txtInsuredPersonSSNTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.txtInsuredPersonSSNTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validatetxtInsuredPersonSSNTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.txtInsuredPersonSSNTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate txtInsuredPersonSSNTag",
                [actualValue, expectedValue, "Incorrect txtInsuredPersonSSNTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    async settxtInsuredPersonAddrPostCodeTag(value) {
        try {
            if (!value) {
                console.log("The value of txtInsuredPersonAddrPostCodeTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.txtInsuredPersonAddrPostCodeTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validatetxtInsuredPersonAddrPostCodeTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.txtInsuredPersonAddrPostCodeTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate txtInsuredPersonAddrPostCodeTag",
                [actualValue, expectedValue, "Incorrect txtInsuredPersonAddrPostCodeTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async clickButtonBackToQuotesList() {
        try {
            let ele = await this.getFieldType(this.btnBackToQuotesList);
            await ele.click();
            await this.waitPageProgressCompleted();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async clickButtonBack() {
        try {
            let ele = await this.getFieldType(this.btnBack);
            await ele.click();
            await this.waitPageProgressCompleted();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async clickButtonNext() {
        try {
            let ele = await this.getFieldType(this.btnNext);
            await ele.click();
            await this.waitPageProgressCompleted();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }



    async setNgSelectPreviousInsurerTag(value) {
        try {
            if (!value) {
                console.log("The value of NgSelectPreviousInsurerTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.NgSelectPreviousInsurerTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validateNgSelectPreviousInsurerTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.NgSelectPreviousInsurerTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate NgSelectPreviousInsurerTag",
                [actualValue, expectedValue, "Incorrect NgSelectPreviousInsurerTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    async settxtDogNameTag(value) {
        try {
            if (!value) {
                console.log("The value of txtDogNameTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.txtDogNameTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validatetxtDogNameTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.txtDogNameTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate txtDogNameTag",
                [actualValue, expectedValue, "Incorrect txtDogNameTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    async settxtDogDOBTag(value) {
        try {
            if (!value) {
                console.log("The value of txtDogDOBTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.txtDogDOBTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validatetxtDogDOBTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.txtDogDOBTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate txtDogDOBTag",
                [actualValue, expectedValue, "Incorrect txtDogDOBTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    async settxtDogIDTag(value) {
        try {
            if (!value) {
                console.log("The value of txtDogIDTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.txtDogIDTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validatetxtDogIDTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.txtDogIDTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate txtDogIDTag",
                [actualValue, expectedValue, "Incorrect txtDogIDTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    async settxtDogChipTag(value) {
        try {
            if (!value) {
                console.log("The value of txtDogChipTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.txtDogChipTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validatetxtDogChipTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.txtDogChipTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate txtDogChipTag",
                [actualValue, expectedValue, "Incorrect txtDogChipTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    async setSelectDogInsuranceProductsTag(value) {
        try {
            if (!value) {
                console.log("The value of SelectDogInsuranceProductsTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.SelectDogInsuranceProductsTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validateSelectDogInsuranceProductsTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.SelectDogInsuranceProductsTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate SelectDogInsuranceProductsTag",
                [actualValue, expectedValue, "Incorrect SelectDogInsuranceProductsTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    async setNgSelectDogBreedTag(value) {
        try {
            if (!value) {
                console.log("The value of NgSelectDogBreedTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.NgSelectDogBreedTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validateNgSelectDogBreedTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.NgSelectDogBreedTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate NgSelectDogBreedTag",
                [actualValue, expectedValue, "Incorrect NgSelectDogBreedTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    async settxtDogPurchasedDateTag(value) {
        try {
            if (!value) {
                console.log("The value of txtDogPurchasedDateTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.txtDogPurchasedDateTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validatetxtDogPurchasedDateTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.txtDogPurchasedDateTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate txtDogPurchasedDateTag",
                [actualValue, expectedValue, "Incorrect txtDogPurchasedDateTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    async settxtDogPurchaseValueTag(value) {
        try {
            if (!value) {
                console.log("The value of txtDogPurchaseValueTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.txtDogPurchaseValueTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validatetxtDogPurchaseValueTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.txtDogPurchaseValueTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate txtDogPurchaseValueTag",
                [actualValue, expectedValue, "Incorrect txtDogPurchaseValueTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    async setSelectDogGenderTag(value) {
        try {
            if (!value) {
                console.log("The value of SelectDogGenderTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.SelectDogGenderTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validateSelectDogGenderTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.SelectDogGenderTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate SelectDogGenderTag",
                [actualValue, expectedValue, "Incorrect SelectDogGenderTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    async setSelectHasAnInspectionBeenCarriedOutTag(value) {
        try {
            if (!value) {
                console.log("The value of SelectHasAnInspectionBeenCarriedOutTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.SelectHasAnInspectionBeenCarriedOutTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validateSelectHasAnInspectionBeenCarriedOutTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.SelectHasAnInspectionBeenCarriedOutTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate SelectHasAnInspectionBeenCarriedOutTag",
                [actualValue, expectedValue, "Incorrect SelectHasAnInspectionBeenCarriedOutTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setSelectDogImportedTag(value) {
        try {
            if (!value) {
                console.log("The value of SelectDogImportedTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.SelectDogImportedTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validateSelectDogImportedTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.SelectDogImportedTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate SelectDogImportedTag",
                [actualValue, expectedValue, "Incorrect SelectDogImportedTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    async settxtDogImportedCountryTag(value) {
        try {
            if (!value) {
                console.log("The value of txtDogImportedCountryTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.txtDogImportedCountryTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validatetxtDogImportedCountryTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.txtDogImportedCountryTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate txtDogImportedCountryTag",
                [actualValue, expectedValue, "Incorrect txtDogImportedCountryTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    async setSelectDogTreatedByVetTag(value) {
        try {
            if (!value) {
                console.log("The value of SelectDogTreatedByVetTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.SelectDogTreatedByVetTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validateSelectDogTreatedByVetTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.SelectDogTreatedByVetTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate SelectDogTreatedByVetTag",
                [actualValue, expectedValue, "Incorrect SelectDogTreatedByVetTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    async setSelectDogTreatedWithMedicineTag(value) {
        try {
            if (!value) {
                console.log("The value of SelectDogTreatedWithMedicineTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.SelectDogTreatedWithMedicineTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validateSelectDogTreatedWithMedicineTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.SelectDogTreatedWithMedicineTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate SelectDogTreatedWithMedicineTag",
                [actualValue, expectedValue, "Incorrect SelectDogTreatedWithMedicineTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setSelectDogHasUncheckedProblemsTag(value) {
        try {
            if (!value) {
                console.log("The value of SelectDogHasUncheckedProblemsTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.SelectDogHasUncheckedProblemsTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validateSelectDogHasUncheckedProblemsTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.SelectDogHasUncheckedProblemsTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate SelectDogHasUncheckedProblemsTag",
                [actualValue, expectedValue, "Incorrect SelectDogHasUncheckedProblemsTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setSelectDogHasClaimPaymentsTag(value) {
        try {
            if (!value) {
                console.log("The value of SelectDogHasClaimPaymentsTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.SelectDogHasClaimPaymentsTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validateSelectDogHasClaimPaymentsTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.SelectDogHasClaimPaymentsTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate SelectDogHasClaimPaymentsTag",
                [actualValue, expectedValue, "Incorrect SelectDogHasClaimPaymentsTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setSelectDogIsHealthyTag(value) {
        try {
            if (!value) {
                console.log("The value of SelectDogIsHealthyTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.SelectDogIsHealthyTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validateSelectDogIsHealthyTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.SelectDogIsHealthyTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate SelectDogIsHealthyTag",
                [actualValue, expectedValue, "Incorrect SelectDogIsHealthyTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }



    async settxtHighestCompensationTag(value) {
        try {
            if (!value) {
                console.log("The value of txtHighestCompensationTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.txtHighestCompensationTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validatetxtHighestCompensationTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.txtHighestCompensationTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate txtHighestCompensationTag",
                [actualValue, expectedValue, "Incorrect txtHighestCompensationTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    async setNgSelectDeductiblePercentageTag(value) {
        try {
            if (!value) {
                console.log("The value of NgSelectDeductiblePercentageTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.NgSelectDeductiblePercentageTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validateNgSelectDeductiblePercentageTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.NgSelectDeductiblePercentageTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate NgSelectDeductiblePercentageTag",
                [actualValue, expectedValue, "Incorrect NgSelectDeductiblePercentageTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    async setNgSelectDeductibleAmountTag(value) {
        try {
            if (!value) {
                console.log("The value of NgSelectDeductibleAmountTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.NgSelectDeductibleAmountTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validateNgSelectDeductibleAmountTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.NgSelectDeductibleAmountTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate NgSelectDeductibleAmountTag",
                [actualValue, expectedValue, "Incorrect NgSelectDeductibleAmountTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    async setSelectLifeInsuranceTag(value) {
        try {
            if (!value) {
                console.log("The value of SelectLifeInsuranceTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.SelectLifeInsuranceTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validateSelectLifeInsuranceTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.SelectLifeInsuranceTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate SelectLifeInsuranceTag",
                [actualValue, expectedValue, "Incorrect SelectLifeInsuranceTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    async setSelectPersonalAccidentTag(value) {
        try {
            if (!value) {
                console.log("The value of SelectPersonalAccidentTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.SelectPersonalAccidentTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validateSelectPersonalAccidentTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.SelectPersonalAccidentTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate SelectPersonalAccidentTag",
                [actualValue, expectedValue, "Incorrect SelectPersonalAccidentTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }



    async settxtExternalTextTag(value) {
        try {
            if (!value) {
                console.log("The value of txtExternalTextTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.txtExternalTextTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validatetxtExternalTextTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.txtExternalTextTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate txtExternalTextTag",
                [actualValue, expectedValue, "Incorrect txtExternalTextTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    async settxtInternalTextTag(value) {
        try {
            if (!value) {
                console.log("The value of txtInternalTextTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.txtInternalTextTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validatetxtInternalTextTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.txtInternalTextTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate txtInternalTextTag",
                [actualValue, expectedValue, "Incorrect txtInternalTextTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }


}