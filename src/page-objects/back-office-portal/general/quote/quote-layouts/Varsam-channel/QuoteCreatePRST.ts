// generate by MappingPage
import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../../core/BasePage";
export class QuoteCreatePRST extends BasePage {
    protected LiQuestions = By.xpath(`//app-sales-process//li[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"questions")]`);
    protected LiReview = By.xpath(`//app-sales-process//li[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"review")]`);
    protected LiAcceptance = By.xpath(`//app-sales-process//li[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"acceptance")]`);
    protected H2CREATEQUOTE = By.xpath(`//app-sales-process//h2[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"create quote")]`);
    protected H2QUOTEREF1031452 = By.xpath(`//app-sales-process//h2[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"quote ref.: 1031452")]`);
    protected lblPOLICYTERM = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"policy term")]`);
    protected LiPolicyterm = By.xpath(`//app-sales-process//li[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"policy term")]`);
    protected lblStartDate = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"start date *")]`);
    protected txtstartDate = By.xpath(`//app-sales-process//input[contains(@id,'startDate')]`);
    protected LiPolicyholder = By.xpath(`//app-sales-process//li[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"policyholder")]`);
    protected lblEndDate = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"end date *")]`);
    protected LiBuildinginformation = By.xpath(`//app-sales-process//li[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"building information")]`);
    protected txtendDate = By.xpath(`//app-sales-process//input[contains(@id,'endDate')]`);
    protected LiInnboforsikring = By.xpath(`//app-sales-process//li[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"innboforsikring")]`);
    protected lblPOLICYHOLDER = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"policyholder")]`);
    protected lblFornavn = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"fornavn *")]`);
    protected lblEtternavn = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"etternavn *")]`);
    protected LiELsykkel = By.xpath(`//app-sales-process//li[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"el-sykkel")]`);
    protected txtPolicyHolderFirstNameTag = By.xpath(`//app-sales-process//input[contains(@id,'PolicyHolderFirstNameTag')]`);
    protected txtPolicyHolderLastNameTag = By.xpath(`//app-sales-process//input[contains(@id,'PolicyHolderLastNameTag')]`);
    protected LiOtherinformation = By.xpath(`//app-sales-process//li[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"other information")]`);
    protected lblFdselsdato = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"fødselsdato *")]`);
    protected txtPolicyHolderDOBTag = By.xpath(`//app-sales-process//input[contains(@id,'PolicyHolderDOBTag')]`);
    protected lblKredittRating = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"kreditt rating")]`);
    protected txtCustomerCreditScoreTag = By.xpath(`//app-sales-process//input[contains(@id,'CustomerCreditScoreTag')]`);
    protected lblAntallSkaderSiste3R = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"antall skader siste 3 år? *")]`);
    protected btnBackToQuotesList = By.xpath(`//app-sales-process//button[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"back to quotes list")]`);
    protected btnBack = By.xpath(`//app-sales-process//button[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"back")]`);
    protected btnNext = By.xpath(`//app-sales-process//button[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"next")]`);
    protected txtCustomerClaimCountTag = By.xpath(`//app-sales-process//input[contains(@id,'CustomerClaimCountTag')]`);
    protected lblBUILDINGINFORMATION = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"building information")]`);
    protected lblHvilkenAdresseHarBygningen = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"hvilken adresse har bygningen? *")]`);
    protected txtAddressTag = By.xpath(`//app-sales-process//input[contains(@id,'AddressTag')]`);
    protected lblPostnummer = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"postnummer *")]`);
    protected txtPostCodeTag = By.xpath(`//app-sales-process//input[contains(@id,'PostCodeTag')]`);
    protected lblPoststed = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"poststed *")]`);
    protected txtCityTag = By.xpath(`//app-sales-process//input[contains(@id,'CityTag')]`);
    protected lblTypeUtleieKunPrivat = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"type utleie (kun privat) *")]`);
    protected NgSelectRentTypeTag = By.xpath(`//app-sales-process//ng-select[contains(@id,'RentTypeTag')]`);
    protected lblAlarmsystem = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"alarmsystem *")]`);
    protected NgSelectAlarmSystemTag = By.xpath(`//app-sales-process//ng-select[contains(@id,'AlarmSystemTag')]`);
    protected lblRykvarslere = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"røykvarslere *")]`);
    protected NgSelectSmokeDetectorTag = By.xpath(`//app-sales-process//ng-select[contains(@id,'SmokeDetectorTag')]`);
    protected lblVannstoppesystem = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"vannstoppesystem *")]`);
    protected NgSelectWaterStopSystemTag = By.xpath(`//app-sales-process//ng-select[contains(@id,'WaterStopSystemTag')]`);
    protected lblElektriskAnlegg = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"elektrisk anlegg *")]`);
    protected NgSelectElectricityTag = By.xpath(`//app-sales-process//ng-select[contains(@id,'ElectricityTag')]`);
    protected lblAntallBeboere = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"antall beboere *")]`);
    protected NgSelectNumberOfResidentsTag = By.xpath(`//app-sales-process//ng-select[contains(@id,'NumberOfResidentsTag')]`);
    protected lblHussopp = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"hussopp: *")]`);
    protected SelectIncludeHussoppCoverTag = By.xpath(`//app-sales-process//select[contains(@id,'IncludeHussoppCoverTag')]`);
    protected lblINNBOFORSIKRING = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"innboforsikring")]`);
    protected lblForsikringsumInnbo = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"forsikringsum innbo *")]`);
    protected txtContentSumInsuredTag = By.xpath(`//app-sales-process//input[contains(@id,'ContentSumInsuredTag')]`);
    protected lblCoverTypeTag = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"covertypetag")]`);
    protected NgSelectCoverTypeTag = By.xpath(`//app-sales-process//ng-select[contains(@id,'CoverTypeTag')]`);
    protected lblTypeInnbo = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"type innbo *")]`);
    protected NgSelectContentTypeTag = By.xpath(`//app-sales-process//ng-select[contains(@id,'ContentTypeTag')]`);
    protected lblTypeBolig = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"type bolig *")]`);
    protected NgSelectResidenceTypeTag = By.xpath(`//app-sales-process//ng-select[contains(@id,'ResidenceTypeTag')]`);
    protected lblEgenandel = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"egenandel *")]`);
    protected NgSelectDeductibleContentTag = By.xpath(`//app-sales-process//ng-select[contains(@id,'DeductibleContentTag')]`);
    protected lblDekning = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"dekning *")]`);
    protected NgSelectContentCoverTag = By.xpath(`//app-sales-process//ng-select[contains(@id,'ContentCoverTag')]`);
    protected lblELSYKKEL = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"el-sykkel")]`);
    protected lblLeggeTilElSykkelDekning = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"legge til el-sykkel dekning?")]`);
    protected SelectAddBicycleTag1 = By.xpath(`//app-sales-process//select[contains(@id,'AddBicycleTag1')]`);
    protected lblOTHERINFORMATION = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"other information")]`);
    protected lblIntNotat = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"int. notat")]`);
    protected txtInternalNoteTag = By.xpath(`//app-sales-process//textarea[contains(@id,'InternalNoteTag')]`);
    protected lblExternTekst = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"extern tekst")]`);
    protected txtExternalTextTag = By.xpath(`//app-sales-process//textarea[contains(@id,'ExternalTextTag')]`);
    protected lblMerknaderTilOppsigelsesMal = By.xpath(`//app-sales-process//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"merknader til oppsigelses mal")]`);
    protected txtTerminationTextTag = By.xpath(`//app-sales-process//textarea[contains(@id,'TerminationTextTag')]`);











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






    async settxtPolicyHolderFirstNameTag(value) {
        try {
            if (!value) {
                console.log("The value of txtPolicyHolderFirstNameTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.txtPolicyHolderFirstNameTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validatetxtPolicyHolderFirstNameTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.txtPolicyHolderFirstNameTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate txtPolicyHolderFirstNameTag",
                [actualValue, expectedValue, "Incorrect txtPolicyHolderFirstNameTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async settxtPolicyHolderLastNameTag(value) {
        try {
            if (!value) {
                console.log("The value of txtPolicyHolderLastNameTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.txtPolicyHolderLastNameTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validatetxtPolicyHolderLastNameTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.txtPolicyHolderLastNameTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate txtPolicyHolderLastNameTag",
                [actualValue, expectedValue, "Incorrect txtPolicyHolderLastNameTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }



    async settxtPolicyHolderDOBTag(value) {
        try {
            if (!value) {
                console.log("The value of txtPolicyHolderDOBTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.txtPolicyHolderDOBTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validatetxtPolicyHolderDOBTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.txtPolicyHolderDOBTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate txtPolicyHolderDOBTag",
                [actualValue, expectedValue, "Incorrect txtPolicyHolderDOBTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    async settxtCustomerCreditScoreTag(value) {
        try {
            if (!value) {
                console.log("The value of txtCustomerCreditScoreTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.txtCustomerCreditScoreTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validatetxtCustomerCreditScoreTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.txtCustomerCreditScoreTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate txtCustomerCreditScoreTag",
                [actualValue, expectedValue, "Incorrect txtCustomerCreditScoreTag"]);
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

    async settxtCustomerClaimCountTag(value) {
        try {
            if (!value) {
                console.log("The value of txtCustomerClaimCountTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.txtCustomerClaimCountTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validatetxtCustomerClaimCountTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.txtCustomerClaimCountTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate txtCustomerClaimCountTag",
                [actualValue, expectedValue, "Incorrect txtCustomerClaimCountTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }



    async settxtAddressTag(value) {
        try {
            if (!value) {
                console.log("The value of txtAddressTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.txtAddressTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validatetxtAddressTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.txtAddressTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate txtAddressTag",
                [actualValue, expectedValue, "Incorrect txtAddressTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    async settxtPostCodeTag(value) {
        try {
            if (!value) {
                console.log("The value of txtPostCodeTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.txtPostCodeTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validatetxtPostCodeTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.txtPostCodeTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate txtPostCodeTag",
                [actualValue, expectedValue, "Incorrect txtPostCodeTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    async settxtCityTag(value) {
        try {
            if (!value) {
                console.log("The value of txtCityTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.txtCityTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validatetxtCityTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.txtCityTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate txtCityTag",
                [actualValue, expectedValue, "Incorrect txtCityTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    async setNgSelectRentTypeTag(value) {
        try {
            if (!value) {
                console.log("The value of NgSelectRentTypeTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.NgSelectRentTypeTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validateNgSelectRentTypeTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.NgSelectRentTypeTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate NgSelectRentTypeTag",
                [actualValue, expectedValue, "Incorrect NgSelectRentTypeTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    async setNgSelectAlarmSystemTag(value) {
        try {
            if (!value) {
                console.log("The value of NgSelectAlarmSystemTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.NgSelectAlarmSystemTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validateNgSelectAlarmSystemTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.NgSelectAlarmSystemTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate NgSelectAlarmSystemTag",
                [actualValue, expectedValue, "Incorrect NgSelectAlarmSystemTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    async setNgSelectSmokeDetectorTag(value) {
        try {
            if (!value) {
                console.log("The value of NgSelectSmokeDetectorTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.NgSelectSmokeDetectorTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validateNgSelectSmokeDetectorTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.NgSelectSmokeDetectorTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate NgSelectSmokeDetectorTag",
                [actualValue, expectedValue, "Incorrect NgSelectSmokeDetectorTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    async setNgSelectWaterStopSystemTag(value) {
        try {
            if (!value) {
                console.log("The value of NgSelectWaterStopSystemTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.NgSelectWaterStopSystemTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validateNgSelectWaterStopSystemTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.NgSelectWaterStopSystemTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate NgSelectWaterStopSystemTag",
                [actualValue, expectedValue, "Incorrect NgSelectWaterStopSystemTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    async setNgSelectElectricityTag(value) {
        try {
            if (!value) {
                console.log("The value of NgSelectElectricityTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.NgSelectElectricityTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validateNgSelectElectricityTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.NgSelectElectricityTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate NgSelectElectricityTag",
                [actualValue, expectedValue, "Incorrect NgSelectElectricityTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    async setNgSelectNumberOfResidentsTag(value) {
        try {
            if (!value) {
                console.log("The value of NgSelectNumberOfResidentsTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.NgSelectNumberOfResidentsTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validateNgSelectNumberOfResidentsTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.NgSelectNumberOfResidentsTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate NgSelectNumberOfResidentsTag",
                [actualValue, expectedValue, "Incorrect NgSelectNumberOfResidentsTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    async setSelectIncludeHussoppCoverTag(value) {
        try {
            if (!value) {
                console.log("The value of SelectIncludeHussoppCoverTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.SelectIncludeHussoppCoverTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validateSelectIncludeHussoppCoverTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.SelectIncludeHussoppCoverTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate SelectIncludeHussoppCoverTag",
                [actualValue, expectedValue, "Incorrect SelectIncludeHussoppCoverTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }



    async settxtContentSumInsuredTag(value) {
        try {
            if (!value) {
                console.log("The value of txtContentSumInsuredTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.txtContentSumInsuredTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validatetxtContentSumInsuredTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.txtContentSumInsuredTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate txtContentSumInsuredTag",
                [actualValue, expectedValue, "Incorrect txtContentSumInsuredTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    async setNgSelectCoverTypeTag(value) {
        try {
            if (!value) {
                console.log("The value of NgSelectCoverTypeTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.NgSelectCoverTypeTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validateNgSelectCoverTypeTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.NgSelectCoverTypeTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate NgSelectCoverTypeTag",
                [actualValue, expectedValue, "Incorrect NgSelectCoverTypeTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    async setNgSelectContentTypeTag(value) {
        try {
            if (!value) {
                console.log("The value of NgSelectContentTypeTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.NgSelectContentTypeTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validateNgSelectContentTypeTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.NgSelectContentTypeTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate NgSelectContentTypeTag",
                [actualValue, expectedValue, "Incorrect NgSelectContentTypeTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    async setNgSelectResidenceTypeTag(value) {
        try {
            if (!value) {
                console.log("The value of NgSelectResidenceTypeTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.NgSelectResidenceTypeTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validateNgSelectResidenceTypeTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.NgSelectResidenceTypeTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate NgSelectResidenceTypeTag",
                [actualValue, expectedValue, "Incorrect NgSelectResidenceTypeTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    async setNgSelectDeductibleContentTag(value) {
        try {
            if (!value) {
                console.log("The value of NgSelectDeductibleContentTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.NgSelectDeductibleContentTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validateNgSelectDeductibleContentTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.NgSelectDeductibleContentTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate NgSelectDeductibleContentTag",
                [actualValue, expectedValue, "Incorrect NgSelectDeductibleContentTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    async setNgSelectContentCoverTag(value) {
        try {
            if (!value) {
                console.log("The value of NgSelectContentCoverTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.NgSelectContentCoverTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validateNgSelectContentCoverTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.NgSelectContentCoverTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate NgSelectContentCoverTag",
                [actualValue, expectedValue, "Incorrect NgSelectContentCoverTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }



    async setSelectAddBicycleTag1(value) {
        try {
            if (!value) {
                console.log("The value of SelectAddBicycleTag1 is undefined");
                return;
            }
            let ele = await this.getFieldType(this.SelectAddBicycleTag1);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validateSelectAddBicycleTag1(expectedValue) {
        try {
            let ele = await this.getFieldType(this.SelectAddBicycleTag1);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate SelectAddBicycleTag1",
                [actualValue, expectedValue, "Incorrect SelectAddBicycleTag1"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }



    async settxtInternalNoteTag(value) {
        try {
            if (!value) {
                console.log("The value of txtInternalNoteTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.txtInternalNoteTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validatetxtInternalNoteTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.txtInternalNoteTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate txtInternalNoteTag",
                [actualValue, expectedValue, "Incorrect txtInternalNoteTag"]);
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


    async settxtTerminationTextTag(value) {
        try {
            if (!value) {
                console.log("The value of txtTerminationTextTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.txtTerminationTextTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async validatetxtTerminationTextTag(expectedValue) {
        try {
            let ele = await this.getFieldType(this.txtTerminationTextTag);
            let actualValue = await ele.getValue();
            return await this.driverService.validateRecord("Validate txtTerminationTextTag",
                [actualValue, expectedValue, "Incorrect txtTerminationTextTag"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    }


}