import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../shared/functions";

export class Scoring {

    protected inputCreditRate = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-scoring//tr[./td[contains(text(),'Credit Rate')]]//td[2]//input[@disabled]`);
    protected inputEstablishedYear = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-scoring//tr[./td[contains(text(),'Established Year')]]//td[2]//input[@disabled]`);
    protected inputEducationalLevel = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-scoring//tr[./td[contains(text(),'Educational Level')]]//td[2]//input[@disabled]`);
    protected inputGeographicalArea = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-scoring//tr[./td[contains(text(),'Geographical Area')]]//td[2]//input[@disabled]`);
    protected inputPostcodePopulation = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-scoring//tr[./td[contains(text(),'Postcode - Population')]]//td[2]//input[@disabled]`);

    protected outputCreditRate = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-scoring//tr[./td[contains(text(),'Credit Rate')]]//td[3]//input[@disabled]`);
    protected outputEstablishedYear = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-scoring//tr[./td[contains(text(),'Established Year')]]//td[3]//input[@disabled]`);
    protected outputEducationalLevel = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-scoring//tr[./td[contains(text(),'Educational Level')]]//td[3]//input[@disabled]`);
    protected outputGeographicalArea = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-scoring//app-score-breakdown//tr[./td[contains(text(),'Geographical Area')]]//td[3]//input[@disabled]`);
    protected outputPostcodePopulation = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-scoring//tr[./td[contains(text(),'Postcode - Population')]]//td[3]//input[@disabled]`);

    protected lblFinalScore = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-customer-scoring//tr[./td[contains(text(),'Final Score')]]//td[3]//input[@disabled]`);





    constructor(protected driverService: SeleniumWebDriverService) { }

    //#region validate input scoring
    public async validateinputCreditRateOnScoringSubTab(ExpectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.inputCreditRate);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getAttributeValue(this.inputCreditRate, 'value');
            return await this.driverService.validateRecord("Validate inputCreditRate",
                [actualValue, ExpectedValue, "Incorrect inputCreditRate!"]
            );
        } catch (error) {
            console.log('validateinputCreditRateOnScoringSubTab');
            console.log(error);
            return false;
        }
    }

    public async validateinputEstablishedYearOnScoringSubTab(ExpectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.inputEstablishedYear);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getAttributeValue(this.inputEstablishedYear, 'value');
            return await this.driverService.validateRecord("Validate inputEstablishedYear",
                [actualValue, ExpectedValue, "Incorrect inputEstablishedYear!"]
            );
        } catch (error) {
            console.log('validateinputEstablishedYearOnScoringSubTab');
            console.log(error);
            return false;
        }
    }

    public async validateinputEducationalLevelOnScoringSubTab(ExpectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.inputEducationalLevel);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getAttributeValue(this.inputEducationalLevel, 'value');
            return await this.driverService.validateRecord("Validate inputEducationalLevel",
                [actualValue, ExpectedValue, "Incorrect inputEducationalLevel!"]
            );
        } catch (error) {
            console.log('validateinputEducationalLevelOnScoringSubTab');
            console.log(error);
            return false;
        }
    }

    public async validateinputGeographicalAreaOnScoringSubTab(ExpectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.inputGeographicalArea);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getAttributeValue(this.inputGeographicalArea, 'value');
            return await this.driverService.validateRecord("Validate inputGeographicalArea",
                [actualValue, ExpectedValue, "Incorrect inputGeographicalArea!"]
            );
        } catch (error) {
            console.log('validateinputGeographicalAreaOnScoringSubTab');
            console.log(error);
            return false;
        }
    }

    public async validateinputPostcodePopulationOnScoringSubTab(ExpectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.inputPostcodePopulation);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getAttributeValue(this.inputPostcodePopulation, 'value');
            return await this.driverService.validateRecord("Validate inputPostcodePopulation",
                [actualValue, ExpectedValue, "Incorrect inputPostcodePopulation!"]
            );
        } catch (error) {
            console.log('validateinputPostcodePopulationOnScoringSubTab');
            console.log(error);
            return false;
        }
    }

    //#endregion

    //#region validate output scoring
    public async validateoutputCreditRateOnScoringSubTab(ExpectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.outputCreditRate);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getAttributeValue(this.outputCreditRate, 'value');
            return await this.driverService.validateRecord("Validate outputCreditRate",
                [actualValue, ExpectedValue, "Incorrect outputCreditRate!"]
            );
        } catch (error) {
            console.log('validateoutputCreditRateOnScoringSubTab');
            console.log(error);
            return false;
        }
    }
    public async validateoutputEstablishedYearOnScoringSubTab(ExpectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.outputEstablishedYear);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getAttributeValue(this.outputEstablishedYear, 'value');
            return await this.driverService.validateRecord("Validate outputEstablishedYear",
                [actualValue, ExpectedValue, "Incorrect outputEstablishedYear!"]
            );
        } catch (error) {
            console.log('validateoutputEstablishedYearOnScoringSubTab');
            console.log(error);
            return false;
        }
    }
    public async validateoutputEducationalLevelOnScoringSubTab(ExpectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.outputEducationalLevel);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getAttributeValue(this.outputEducationalLevel, 'value');
            return await this.driverService.validateRecord("Validate outputEducationalLevel",
                [actualValue, ExpectedValue, "Incorrect outputEducationalLevel!"]
            );
        } catch (error) {
            console.log('validateoutputEducationalLevelOnScoringSubTab');
            console.log(error);
            return false;
        }
    }
    public async validateoutputGeographicalAreaOnScoringSubTab(ExpectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.outputGeographicalArea);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getAttributeValue(this.outputGeographicalArea, 'value');
            return await this.driverService.validateRecord("Validate outputGeographicalArea",
                [actualValue, ExpectedValue, "Incorrect outputGeographicalArea!"]
            );
        } catch (error) {
            console.log('validateoutputGeographicalAreaOnScoringSubTab');
            console.log(error);
            return false;
        }
    }
    public async validateoutputPostcodePopulationOnScoringSubTab(ExpectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.outputPostcodePopulation);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getAttributeValue(this.outputPostcodePopulation, 'value');
            return await this.driverService.validateRecord("Validate outputPostcodePopulation",
                [actualValue, ExpectedValue, "Incorrect outputPostcodePopulation!"]
            );
        } catch (error) {
            console.log('validateoutputPostcodePopulationOnScoringSubTab');
            console.log(error);
            return false;
        }
    }
    //#endregion

    public async validateFinalScoreOnScoringSubTab(ExpectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblFinalScore);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getAttributeValue(this.lblFinalScore, 'value');
            if(actualValue.includes(ExpectedValue)){
                ExpectedValue = actualValue;
            }
            return await this.driverService.validateRecord("Validate FinalScore",
                [actualValue, ExpectedValue, "Incorrect FinalScore!"]
            );
        } catch (error) {
            console.log('validateFinalScoreOnScoringSubTab');
            console.log(error);
            return false;
        }
    }

}