// generate by MappingPage
import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../../core/BasePage";
import { waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../../shared/functions";


export class QuoteCreateBoatPage extends BasePage {
    protected LiQuestions = By.xpath(`//app-customer-quote-list-widget//li[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"questions")]`);
    protected LiReview = By.xpath(`//app-customer-quote-list-widget//li[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"review")]`);
    protected LiAcceptance = By.xpath(`//app-customer-quote-list-widget//li[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"acceptance")]`);
    protected H2CREATEQUOTE = By.xpath(`//app-customer-quote-list-widget//h2[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"create quote")]`);
    protected H2QUOTEREF1027593 = By.xpath(`//app-customer-quote-list-widget//h2[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"quote ref.: 1027593")]`);
    protected lblFRSKRINGSINFORMATION = By.xpath(`//app-customer-quote-list-widget//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"försäkringsinformation")]`);
    protected LiFrskringsinformation = By.xpath(`//app-customer-quote-list-widget//li[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"försäkringsinformation")]`);
    protected lblStartDate = By.xpath(`//app-customer-quote-list-widget//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"start date *")]`);
    protected txtstartDate = By.xpath(`//app-customer-quote-list-widget//input[contains(@id,'startDate')]`);
    protected LiUppgifteromDig = By.xpath(`//app-customer-quote-list-widget//li[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"uppgifter om dig")]`);
    protected lblEndDate = By.xpath(`//app-customer-quote-list-widget//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"end date *")]`);
    protected LiUppgifteromBten = By.xpath(`//app-customer-quote-list-widget//li[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"uppgifter om båten")]`);
    protected txtendDate = By.xpath(`//app-customer-quote-list-widget//input[contains(@id,'endDate')]`);
    protected LiAndrauppgifter = By.xpath(`//app-customer-quote-list-widget//li[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"andra uppgifter")]`);
    protected lblUPPGIFTEROMDIG = By.xpath(`//app-customer-quote-list-widget//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"uppgifter om dig")]`);
    protected lblFrnamn = By.xpath(`//app-customer-quote-list-widget//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"förnamn")]`);
    protected LiSjlvrisk = By.xpath(`//app-customer-quote-list-widget//li[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"självrisk")]`);
    protected txtInsuredPersonFirstNameTag = By.xpath(`//app-customer-quote-list-widget//input[contains(@id,'InsuredPersonFirstNameTag')]`);
    protected LiFrskringensinnehll = By.xpath(`//app-customer-quote-list-widget//li[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"försäkringens innehåll")]`);
    protected lblEfternamn = By.xpath(`//app-customer-quote-list-widget//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"efternamn")]`);
    protected txtInsuredPersonLastNameTag = By.xpath(`//app-customer-quote-list-widget//input[contains(@id,'InsuredPersonLastNameTag')]`);
    protected Livrigauppgifter = By.xpath(`//app-customer-quote-list-widget//li[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"övriga uppgifter")]`);
    protected lblPersonnummer = By.xpath(`//app-customer-quote-list-widget//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"personnummer *")]`);
    protected txtInsuredPersonSSNTag = By.xpath(`//app-customer-quote-list-widget//input[contains(@id,'InsuredPersonSSNTag')]`);
    protected lblPostnummer = By.xpath(`//app-customer-quote-list-widget//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"postnummer *")]`);
    protected btnBackToQuotesList = By.xpath(`//app-customer-quote-list-widget//button[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"back to quotes list")]`);
    protected btnBack = By.xpath(`//app-customer-quote-list-widget//button[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"back")]`);
    protected btnNext = By.xpath(`//app-customer-quote-list-widget//button[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"next")]`);
    protected txtInsuredPersonAddrPostCodeTag = By.xpath(`//app-customer-quote-list-widget//input[contains(@id,'InsuredPersonAddrPostCodeTag')]`);
    protected lblNautiskKompetens = By.xpath(`//app-customer-quote-list-widget//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"nautisk kompetens? *")]`);
    protected NgSelectNauticExperienceTag = By.xpath(`//app-customer-quote-list-widget//ng-select[contains(@id,'NauticExperienceTag')]`);
    protected lblUPPGIFTEROMBTEN = By.xpath(`//app-customer-quote-list-widget//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"uppgifter om båten")]`);
    protected lblRegionDrBtenPrimrtAnvnds = By.xpath(`//app-customer-quote-list-widget//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"region där båten primärt används *")]`);
    protected NgSelectBoatRegionTag = By.xpath(`//app-customer-quote-list-widget//ng-select[contains(@id,'BoatRegionTag')]`);
    protected lblNattbevakadHemmahamn = By.xpath(`//app-customer-quote-list-widget//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"nattbevakad hemmahamn *")]`);
    protected NgSelectBoatNightHabourTag = By.xpath(`//app-customer-quote-list-widget//ng-select[contains(@id,'BoatNightHabourTag')]`);
    protected lblNamnPHemmahamn = By.xpath(`//app-customer-quote-list-widget//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"namn på hemmahamn *")]`);
    protected txtHomeHarbourNameTag = By.xpath(`//app-customer-quote-list-widget//input[contains(@id,'HomeHarbourNameTag')]`);
    protected lblTypAvBt = By.xpath(`//app-customer-quote-list-widget//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"typ av båt *")]`);
    protected SelectBoatTypeTag = By.xpath(`//app-customer-quote-list-widget//select[contains(@id,'BoatTypeTag')]`);
    protected lblTypAvMotor = By.xpath(`//app-customer-quote-list-widget//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"typ av motor *")]`);
    protected NgSelectEngineTypeTag = By.xpath(`//app-customer-quote-list-widget//ng-select[contains(@id,'EngineTypeTag')]`);
    protected lblBtensMaterial = By.xpath(`//app-customer-quote-list-widget//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"båtens material *")]`);
    protected SelectBoatMaterialTag = By.xpath(`//app-customer-quote-list-widget//select[contains(@id,'BoatMaterialTag')]`);
    protected lblBtFabrikat = By.xpath(`//app-customer-quote-list-widget//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"båt fabrikat *")]`);
    protected NgSelectBoatMakeTag = By.xpath(`//app-customer-quote-list-widget//ng-select[contains(@id,'BoatMakeTag')]`);
    protected lblBtModell = By.xpath(`//app-customer-quote-list-widget//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"båt modell *")]`);
    protected txtBoatModelTag = By.xpath(`//app-customer-quote-list-widget//input[contains(@id,'BoatModelTag')]`);
    protected lblSkrovnummer = By.xpath(`//app-customer-quote-list-widget//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"skrovnummer *")]`);
    protected txtBoatSerialNoTag = By.xpath(`//app-customer-quote-list-widget//input[contains(@id,'BoatSerialNoTag')]`);
    protected lblMotorFabrikat = By.xpath(`//app-customer-quote-list-widget//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"motor fabrikat *")]`);
    protected SelectEngineMakeTag = By.xpath(`//app-customer-quote-list-widget//select[contains(@id,'EngineMakeTag')]`);
    protected SelectBoatUsedByCompanyTag = By.xpath(`//app-customer-quote-list-widget//select[contains(@id,'BoatUsedByCompanyTag')]`);
    protected lblAngeTypAvVerksamhet = By.xpath(`//app-customer-quote-list-widget//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"ange typ av verksamhet")]`);
    protected SelectCompanyTypeTag = By.xpath(`//app-customer-quote-list-widget//select[contains(@id,'CompanyTypeTag')]`);
    protected lblTotalMotoreffektIHk = By.xpath(`//app-customer-quote-list-widget//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"total motoreffekt i hk *")]`);
    protected txtEnginePowerTag = By.xpath(`//app-customer-quote-list-widget//input[contains(@id,'EnginePowerTag')]`);
    protected lblAntalMotorer = By.xpath(`//app-customer-quote-list-widget//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"antal motorer *")]`);
    protected NgSelectNumberOfEnginesTag = By.xpath(`//app-customer-quote-list-widget//ng-select[contains(@id,'NumberOfEnginesTag')]`);
    protected lblFinnsSecumarkStldskyddEllerSprsndare = By.xpath(`//app-customer-quote-list-widget//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"finns secumark stöldskydd eller spårsändare *")]`);
    protected NgSelectBoatTheftProtectionTag = By.xpath(`//app-customer-quote-list-widget//ng-select[contains(@id,'BoatTheftProtectionTag')]`);
    protected lblrsmodellMotor = By.xpath(`//app-customer-quote-list-widget//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"årsmodell motor *")]`);
    protected txtEngineYearTag = By.xpath(`//app-customer-quote-list-widget//input[contains(@id,'EngineYearTag')]`);
    protected lbllderMotor = By.xpath(`//app-customer-quote-list-widget//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"ålder motor *")]`);
    protected txtEngineAgeTag = By.xpath(`//app-customer-quote-list-widget//input[contains(@id,'EngineAgeTag')]`);
    protected lblBtensrsmodell = By.xpath(`//app-customer-quote-list-widget//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"båtens årsmodell *")]`);
    protected txtBoatModelYearTag = By.xpath(`//app-customer-quote-list-widget//input[contains(@id,'BoatModelYearTag')]`);
    protected lblBtensMarknadsvrdeIKR = By.xpath(`//app-customer-quote-list-widget//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"båtens marknadsvärde i kr *")]`);
    protected txtBoatValueTag = By.xpath(`//app-customer-quote-list-widget//input[contains(@id,'BoatValueTag')]`);
    protected lblBtensLngdICMTex700Cm7Meter = By.xpath(`//app-customer-quote-list-widget//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"båtens längd i cm (tex 700 cm = 7 meter) *")]`);
    protected txtBoatLengthTag = By.xpath(`//app-customer-quote-list-widget//input[contains(@id,'BoatLengthTag')]`);
    protected lblBtensBreddICMTex200Cm2Meter = By.xpath(`//app-customer-quote-list-widget//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"båtens bredd i cm ( tex 200 cm = 2 meter) *")]`);
    protected txtBoatWidthTag = By.xpath(`//app-customer-quote-list-widget//input[contains(@id,'BoatWidthTag')]`);
    protected lblBtensToppfartIKnop = By.xpath(`//app-customer-quote-list-widget//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"båtens toppfart i knop *")]`);
    protected txtBoatMaxspeedTag = By.xpath(`//app-customer-quote-list-widget//input[contains(@id,'BoatMaxSpeedTag')]`);
    protected lblHurFrvarasBtenVintertid = By.xpath(`//app-customer-quote-list-widget//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"hur förvaras båten vintertid? *")]`);
    protected NgSelectStorageTag = By.xpath(`//app-customer-quote-list-widget//ng-select[contains(@id,'StorageTag')]`);
    protected lblANDRAUPPGIFTER = By.xpath(`//app-customer-quote-list-widget//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"andra uppgifter")]`);
    protected lblFinnsAnnanHuvudfrskringPDennaKund = By.xpath(`//app-customer-quote-list-widget//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"finns annan huvudförsäkring på denna kund? *")]`);
    protected NgSelectHasOtherMainInsuranceTag = By.xpath(`//app-customer-quote-list-widget//ng-select[contains(@id,'HasOtherMainInsuranceTag')]`);
    protected lblSJLVRISK = By.xpath(`//app-customer-quote-list-widget//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"självrisk")]`);
    protected lblSjlvriskEgendomsskada = By.xpath(`//app-customer-quote-list-widget//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"självrisk egendomsskada *")]`);
    protected SelectPropertyDamageDeductibleTag = By.xpath(`//app-customer-quote-list-widget//select[contains(@id,'PropertyDamageDeductibleTag')]`);
    protected lblFRSKRINGENSINNEHLL = By.xpath(`//app-customer-quote-list-widget//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"försäkringens innehåll")]`);
    protected lblVljOmfattning = By.xpath(`//app-customer-quote-list-widget//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"välj omfattning *")]`);
    protected SelectTypeOfInsuranceCoverTag = By.xpath(`//app-customer-quote-list-widget//select[contains(@id,'TypeOfInsuranceCoverTag')]`);
    protected lblFinnsOregistreradBtvagnTrailer = By.xpath(`//app-customer-quote-list-widget//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"finns oregistrerad båtvagn/trailer *")]`);
    protected SelectBoatTrailerTag = By.xpath(`//app-customer-quote-list-widget//select[contains(@id,'BoatTrailerTag')]`);
    protected SelectWoodBoatWithPlasticTag = By.xpath(`//app-customer-quote-list-widget//select[contains(@id,'WoodBoatWithPlasticTag')]`);
    protected SelectBoatContractTag = By.xpath(`//app-customer-quote-list-widget//select[contains(@id,'BoatContractTag')]`);
    protected SelectMaintenanceStorageTag = By.xpath(`//app-customer-quote-list-widget//select[contains(@id,'MaintenanceStorageTag')]`);
    protected lblVRIGAUPPGIFTER = By.xpath(`//app-customer-quote-list-widget//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"övriga uppgifter")]`);
    protected lblExterntext = By.xpath(`//app-customer-quote-list-widget//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"externtext")]`);
    protected txtExternalTextTag = By.xpath(`//app-customer-quote-list-widget//textarea[contains(@id,'ExternalTextTag')]`);
    protected lblInterntext = By.xpath(`//app-customer-quote-list-widget//label[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"interntext")]`);
    protected txtInternalTextTag = By.xpath(`//app-customer-quote-list-widget//textarea[contains(@id,'InternalTextTag')]`);
    protected txtStorageStreetTag = By.xpath(`//app-customer-quote-list-widget//input[contains(@id,'StorageStreetTag')]`);
    protected txtStoragePostalCodeTag = By.xpath(`//app-customer-quote-list-widget//input[contains(@id,'StoragePostalCodeTag')]`);
    protected txtBoatTrailerValueTag = By.xpath(`//app-customer-quote-list-widget//input[contains(@id,'BoatTrailerValueTag')]`);
    protected NgSelectRibBoatTagTag = By.xpath(`//app-customer-quote-list-widget//ng-select[contains(@id,'RibBoatTag')]`);










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


    async setNgSelectNauticExperienceTag(value) {
        try {
            if (!value) {
                console.log("The value of NgSelectNauticExperienceTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.NgSelectNauticExperienceTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }



    async setNgSelectBoatRegionTag(value) {
        try {
            if (!value) {
                console.log("The value of NgSelectBoatRegionTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.NgSelectBoatRegionTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    async setNgSelectBoatNightHabourTag(value) {
        try {
            if (!value) {
                console.log("The value of NgSelectBoatNightHabourTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.NgSelectBoatNightHabourTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    async settxtHomeHarbourNameTag(value) {
        try {
            if (!value) {
                console.log("The value of txtHomeHarbourNameTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.txtHomeHarbourNameTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    async setSelectBoatTypeTag(value) {
        try {
            if (!value) {
                console.log("The value of SelectBoatTypeTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.SelectBoatTypeTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    async setNgSelectEngineTypeTag(value) {
        try {
            if (!value) {
                console.log("The value of NgSelectEngineTypeTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.NgSelectEngineTypeTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    async setSelectBoatMaterialTag(value) {
        try {
            if (!value) {
                console.log("The value of SelectBoatMaterialTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.SelectBoatMaterialTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    async setNgSelectBoatMakeTag(value) {
        try {
            if (!value) {
                console.log("The value of NgSelectBoatMakeTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.NgSelectBoatMakeTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    async settxtBoatModelTag(value) {
        try {
            if (!value) {
                console.log("The value of txtBoatModelTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.txtBoatModelTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    async settxtBoatSerialNoTag(value) {
        try {
            if (!value) {
                console.log("The value of txtBoatSerialNoTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.txtBoatSerialNoTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    async setSelectEngineMakeTag(value) {
        try {
            if (!value) {
                console.log("The value of SelectEngineMakeTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.SelectEngineMakeTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async setSelectBoatUsedByCompanyTag(value) {
        try {
            if (!value) {
                console.log("The value of SelectBoatUsedByCompanyTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.SelectBoatUsedByCompanyTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    async setSelectCompanyTypeTag(value) {
        try {
            if (!value) {
                console.log("The value of SelectCompanyTypeTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.SelectCompanyTypeTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    async settxtEnginePowerTag(value) {
        try {
            if (!value) {
                console.log("The value of txtEnginePowerTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.txtEnginePowerTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    async setNgSelectNumberOfEnginesTag(value) {
        try {
            if (!value) {
                console.log("The value of NgSelectNumberOfEnginesTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.NgSelectNumberOfEnginesTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    async setNgSelectBoatTheftProtectionTag(value) {
        try {
            if (!value) {
                console.log("The value of NgSelectBoatTheftProtectionTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.NgSelectBoatTheftProtectionTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    async settxtEngineYearTag(value) {
        try {
            if (!value) {
                console.log("The value of txtEngineYearTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.txtEngineYearTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    async settxtEngineAgeTag(value) {
        try {
            if (!value) {
                console.log("The value of txtEngineAgeTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.txtEngineAgeTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    async settxtBoatModelYearTag(value) {
        try {
            if (!value) {
                console.log("The value of txtBoatModelYearTag is undefined");
                return;
            }
            // let ele = await this.getFieldType(this.txtBoatModelYearTag);
            await this.driverService.setText(this.txtBoatModelYearTag, value)
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    async settxtBoatValueTag(value) {
        try {
            if (!value) {
                console.log("The value of txtBoatValueTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.txtBoatValueTag);
            await ele.setValue(value);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService)
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    async settxtBoatLengthTag(value) {
        try {
            if (!value) {
                console.log("The value of txtBoatLengthTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.txtBoatLengthTag);
            await ele.setValue(value);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService)
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    async settxtBoatWidthTag(value) {
        try {
            if (!value) {
                console.log("The value of txtBoatWidthTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.txtBoatWidthTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    async settxtBoatMaxspeedTag(value) {
        try {
            if (!value) {
                console.log("The value of txtBoatMaxspeedTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.txtBoatMaxspeedTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    async setNgSelectStorageTag(value) {
        try {
            if (!value) {
                console.log("The value of NgSelectStorageTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.NgSelectStorageTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }



    async setNgSelectHasOtherMainInsuranceTag(value) {
        try {
            if (!value) {
                console.log("The value of NgSelectHasOtherMainInsuranceTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.NgSelectHasOtherMainInsuranceTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async setNgSelectRibBoatTagTag(value) {
        try {
            if (!value) {
                console.log("The value of NgSelectRibBoatTagTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.NgSelectRibBoatTagTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }



    async setSelectPropertyDamageDeductibleTag(value) {
        try {
            if (!value) {
                console.log("The value of SelectPropertyDamageDeductibleTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.SelectPropertyDamageDeductibleTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }



    async setSelectTypeOfInsuranceCoverTag(value) {
        try {
            if (!value) {
                console.log("The value of SelectTypeOfInsuranceCoverTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.SelectTypeOfInsuranceCoverTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    async setSelectBoatTrailerTag(value) {
        try {
            if (!value) {
                console.log("The value of SelectBoatTrailerTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.SelectBoatTrailerTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async setSelectWoodBoatWithPlasticTag(value) {
        try {
            if (!value) {
                console.log("The value of SelectWoodBoatWithPlasticTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.SelectWoodBoatWithPlasticTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async setSelectBoatContractTag(value) {
        try {
            if (!value) {
                console.log("The value of SelectBoatContractTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.SelectBoatContractTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async setSelectMaintenanceStorageTag(value) {
        try {
            if (!value) {
                console.log("The value of SelectMaintenanceStorageTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.SelectMaintenanceStorageTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
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

    async settxtStorageStreetTag(value) {
        try {
            if (!value) {
                console.log("The value of txtStorageStreetTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.txtStorageStreetTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async settxtStoragePostalCodeTag(value) {
        try {
            if (!value) {
                console.log("The value of txtStoragePostalCodeTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.txtStoragePostalCodeTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async settxtBoatTrailerValueTag(value) {
        try {
            if (!value) {
                console.log("The value of txtBoatTrailerValueTag is undefined");
                return;
            }
            let ele = await this.getFieldType(this.txtBoatTrailerValueTag);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async settxtEngineSerialNoTag(value, EngineSerialNo: number) {
        try {
            let xpath = By.xpath(`//app-customer-quote-list-widget//input[contains(@id,'Engine${EngineSerialNo}SerialNoTag')]`);
            if (!value) {
                console.log("The value of EngineSerialNo is undefined");
                return;
            }
            let ele = await this.getFieldType(xpath);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async settxtCogSerialNoTag(value, CogSerialNo: number) {
        try {
            let xpath = By.xpath(`//app-customer-quote-list-widget//input[contains(@id,'Cog${CogSerialNo}SerialNoTag')]`);
            if (!value) {
                console.log("The value of CogSerialNo is undefined");
                return;
            }
            let ele = await this.getFieldType(xpath);
            await ele.setValue(value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


}