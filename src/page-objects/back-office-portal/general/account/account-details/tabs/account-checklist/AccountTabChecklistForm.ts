import { By } from "selenium-webdriver";
import { RewardsChecklistFormCPVarsam } from "../../../../../../customer-portal/varsam/rewards/Checklist/RewardsChecklistFormCPVarsam";

export class AccountTabChecklistForm extends RewardsChecklistFormCPVarsam{

    public async validateChecklistItemIsTicked(itemName:string){
        try {
            let element = By.xpath(`//app-checklist-instance-form//div[.//label[contains(text(),'${itemName}')]]/input`);
            if(await this.driverService.getAttributeValue(element, "checked") == 'true'){
                return true;
            }else{
                return false;
            }
        } catch (error) {
            console.log(`validateChecklistItemIsTicked`);
            console.log(error);
            return false;
        }
    }
    
    public async validateChecklistItemIsUnTicked(itemName:string){
        try {
            let element = By.xpath(`//app-checklist-instance-form//div[.//label[contains(text(),'${itemName}')]]/input`);
            if(await this.driverService.getAttributeValue(element, "checked") != 'true'){
                return true;
            }else{
                return false;
            }
        } catch (error) {
            console.log(`validateChecklistItemIsUnTicked`);
            console.log(error);
            return false;
        }
    }

    public async validateChecklistDescription(expectedValue:string){
        try {
            let element = By.xpath(`//app-checklist-instance-form//*[contains(text(),'check checklist on customer portal')]`);
          if(await this.driverService.isExisted(element)){
            return true;
          }return false;
        } catch (error) {
            console.log(`validateChecklistDescription`);
            console.log(error);
            return false;
        }
    }
}