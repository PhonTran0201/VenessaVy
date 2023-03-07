import { By } from "selenium-webdriver";
import { BasePage } from "../../../../core/BasePage";
import { FieldWait } from "../../../../core/fields/FieldWait";
import { UserProfileInfo } from "../../../../shared/user-profile/UserProfileInfo";

export class TeamCreatePage extends BasePage {
    locTeamName: By = By.css("input#pgs-team-f-name");
    locOrganization: By = By.xpath(`//formly-org-autocomplete//div[contains(@class,'ng-select-container ng-has-value')]`);
    locDescription: By = By.css("textarea#pgs-team-form-description");
    locSave: By = By.css(`app-team-form button#save-btn`);

    async populateFields(data) {
        const TeamName = data.TeamName;
        // const Organization = UserProfileInfo.getOrganization();
        const Type = data.Type;
        const Description = data.Description;
        await this.inputTeamName(TeamName);
        // await this.selectOrg(Organization);
        await this.selectType(Type);
        await this.inputDescription(Description);
    }

    async clickSave() {
        try {
            let ele = await this.getFieldType(this.locSave);
            await ele.click();
            await this.waitPageProgressCompleted();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        } 
    }

    private async inputTeamName(value) {
        try {
            let ele = await this.getFieldType(this.locTeamName);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    private async inputDescription(value) {
        try {
            let ele = await this.getFieldType(this.locDescription);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    private async selectOrg(value) {
        try {
            let ele = await this.getFieldType(this.locOrganization);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    private async selectType(value) {
        try {
            const eleType = FieldWait.xpathForContainsText(`//label`, value);
            let ele = await this.getFieldType(eleType);
            await ele.click();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}