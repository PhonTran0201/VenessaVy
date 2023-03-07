import { By } from "selenium-webdriver"
import { BasePage } from "../../../../../core/BasePage"

export class RewardsChecklistFormCPVarsam extends BasePage{
protected lblChecklistName : By = By.xpath(`//app-checklist-form//h3`);
protected lblDescription : By = By.xpath(`//app-checklist-form//p[1]`);

public async validateChecklistName(expectedValue:string){
    try {
        let actualValue = await this.driverService.getText(this.lblChecklistName);
        return this.driverService.validateRecord(`Validate Checklist Name: `,[actualValue, expectedValue, 'Incorrect Value!']);
    } catch (error) {
        console.log(`validateChecklistName`);
        console.log(error);
        return false;
    }
}

public async validateChecklistDescription(expectedValue:string){
    try {
        let element = await this.getFieldType(this.lblDescription);
        let actualValue = await element.getValue();
        return this.driverService.validateRecord(`Validate Checklist Description: `,[actualValue, expectedValue, 'Incorrect Value!']);
    } catch (error) {
        console.log(`validateChecklistDescription`);
        console.log(error);
        return false;
    }
}

public async tickChecklistItemByName(itemName:string){
    try {
        let element = By.xpath(`//app-checklist-form//label[.//span[contains(text(),'${itemName}')]]//input`);
        let lblelement = By.xpath(`//app-checklist-form//label[.//span[contains(text(),'${itemName}')]]//span[contains(@class,'pointer')]`);
        if (await this.driverService.getAttributeValue(element, 'checked') == 'true'){
           return true;
        }
        await this.driverService.click(lblelement);
        return true;
    } catch (error) {
        console.log(`tickChecklistItemByName`);
        console.log(error);
        return false
    }
}

public async UnTickChecklistItemByName(itemName:string){
    try {
        let element = By.xpath(`//app-checklist-form//label[.//span[contains(text(),'${itemName}')]]//input`);
        let lblelement = By.xpath(`//app-checklist-form//label[.//span[contains(text(),'${itemName}')]]//span[contains(@class,'pointer')]`);
        if (await this.driverService.getAttributeValue(element, 'checked') == 'on'){
            await this.driverService.click(lblelement);
        }
        return true;
    } catch (error) {
        console.log(`UnTickChecklistItemByName`);
        console.log(error);
        return false
    }
}


public async validateChecklistItemIsTicked(itemName:string){
    try {
        let element = By.xpath(`//app-checklist-form//label[.//span[contains(text(),'${itemName}')]]//input`);
        if(await this.driverService.getAttributeValue(element, "value") == 'on'){
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
        let element = By.xpath(`//app-checklist-form//label[.//span[contains(text(),'${itemName}')]]//input`);
        if(await this.driverService.getAttributeValue(element, "value") != 'true'){
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

}