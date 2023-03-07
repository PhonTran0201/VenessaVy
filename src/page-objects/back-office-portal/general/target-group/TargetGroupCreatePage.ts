import { By } from "selenium-webdriver";
import { BasePage } from "../../../../core/BasePage";
import { AlertMessage } from "../../../../core/fields/AlertMessage";
import { FieldWait } from "../../../../core/fields/FieldWait";
import { logFailTestcase } from "../../../../shared/functions";
import { UserProfileInfo } from "../../../../shared/user-profile/UserProfileInfo";

export class TargetGroupCreatePage extends BasePage {
    locName: By = By.xpath("//input[@id='pgs-tg-form-name']");
    locOrganization: By = By.xpath(`//formly-org-autocomplete//div[contains(@class,'ng-select-container ng-has-value')]`);
    lblOrganization: By = By.xpath(`//*[contains(local-name(),'form')]//label[contains(text(),'Organization')]`);
    locDescription: By = By.css("textarea#pgs-target-group-form-description");
    locSave: By = By.css(`c-modal-layout button#save-btn`);

    async populateFields(data) {
        const Name = data.Name;
        const Organization = UserProfileInfo.getOrganization();
        const Type = data.Type;
        const Description = data.Description;
        await this.inputTargetGroupName(Name);
        // await this.selectOrg(Organization);
        await this.selectType(Type);
        await this.inputDescription(Description);
    }

    async populateFieldsAtChildOrganization(data) {
        const Name = data.Name;
        const Type = data.Type;
        const Description = data.Description;
        await this.inputTargetGroupName(Name);
        await this.verifyOrganizationNotExist();
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

    private async inputTargetGroupName(value) {
        try {
            let ele = await this.getFieldType(this.locName);
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

    public async verifyMessage(message) {
        const result = await AlertMessage.getInstance().isExistsMsg(this.driverService, message);
        logFailTestcase(result, "Failed to verify message when create new Target Group");
    }

    public async verifyOrganizationNotExist() {
        try {
            if (await this.driverService.isExisted(this.lblOrganization)) {
                return false;
            }
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}