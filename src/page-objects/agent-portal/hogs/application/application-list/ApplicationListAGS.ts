import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { logSuccessMessage, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";
import { ApplicationListCP } from "../../../../customer-portal/general/application/application-list/ApplicationListCP";

export class ApplicationListAGS extends ApplicationListCP {
    constructor(protected driverService: SeleniumWebDriverService) {
      super(driverService);

    }
    public async validateAcceptedFormIsExisted(message :string){
      try {
        let formAccepted = By.xpath(`//*[contains(local-name(),'accepted')]//*[contains(text(), '${message}')]`);
        await this.driverService.waitUntilElementLoaded(formAccepted);
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
        if(await this.driverService.isExisted(formAccepted)){
          logSuccessMessage(`validate accepted form is display: Test passed!`);
          return true;
        }else{
          return false;
        }
      } catch (error) {
        console.log('validateAcceptedFormIsExisted');
        console.log(error);
        return false;
      }
    }
  }