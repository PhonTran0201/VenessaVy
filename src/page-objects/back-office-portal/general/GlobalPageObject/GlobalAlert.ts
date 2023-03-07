import { SeleniumWebDriverService } from "../../../../core/selenium-webdriver.service";


/**
 * 
 * 
 */
export class GlobalAlert {
    constructor(protected driverService: SeleniumWebDriverService) { }

    public async acceptAlert(){
        try {
            await this.driverService.acceptAlert();
            return true;
        } catch (error) {
            console.log('acceptAlert');
            console.log(error);
            return false;
        }
    }
    public async dismissAlert(){
        try {
            await this.driverService.dismissAlert();
            return true;
        } catch (error) {
            console.log('dismissAlert');
            console.log(error);
            return false;
        }
    }
    public async getTextAlert() {
        try {
            const result = await this.driverService.getTextAlert();
            return result;
        } catch (error) {
            console.log('getTextAlert');
            console.log(error);
            return '';
        }
    }
    public async validateContentOfAlert(expectedValue: string){
        try {
            const actualValue = await this.driverService.getTextAlert();
            return await this.driverService.validateRecord('Validate content of Alert!',
                [actualValue, expectedValue, 'Incorrect content of Alert!']);
        } catch (error) {
            console.log('validateContentOfAlert');
            console.log(error);
            return false;
        }
    }
}