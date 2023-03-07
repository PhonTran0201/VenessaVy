import { By } from "selenium-webdriver"
import { SeleniumWebDriverService } from "../../../../../../../core/selenium-webdriver.service";
import { selectDropdownOption, waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../../../shared/functions";


export class ShareWithCustomersTab {
    private tabShareWithCustomers = By.xpath("//*[contains(local-name(), 'form')]//ul[@role='tablist']//a[contains(text(),'Share with customers')]");
    private selectMember = By.xpath("//input[@id ='pgs-members-tab-form']");
    private btnAddMember = By.xpath("//button[@title = 'Add member' and not(@disabled)]");
    constructor(private driverService: SeleniumWebDriverService) { }

    public async navigateToShareWithCustomersTab() {
        try {
            await this.driverService.waitUntilElementLoaded(this.tabShareWithCustomers);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.click(this.tabShareWithCustomers);
            return true;
        }
        catch (error) {
            console.log("navigateToShareWithCustomersTab");
            console.log(error);
            return false;
        }

    }

    public async inputMemberToShareFrameAgreement(memberName:string){
        try {
            await this.driverService.waitUntilElementLoaded(this.selectMember);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService,10);
            await this.driverService.setText(this.selectMember,memberName);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService,10);
            await selectDropdownOption(memberName, "", this.driverService);
            return true;
        } catch (error) {
            console.log("inputMemberToShareFrameAgreement");
            console.log(error);
            return false;
        }
    }

    public async clickAddMemberButton(){
        try {
            await this.driverService.waitUntilElementLoaded(this.btnAddMember);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService,10);
            await this.driverService.click(this.btnAddMember);
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true;
        } catch (error) {
            console.log("clickAddMemberButton");
            console.log(error);
            return true;
        }
    }

    public async validateNameOnShareWithCustomers(expectedValue: string, positionRow: number = 1){
        try {
            let lblName = By.xpath(`//app-customer-frame-agreement-membership-tab//table//tbody//tr[${positionRow}]//a`);
            await this.driverService.waitUntilElementLoaded(lblName);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            let actualValue = await this.driverService.getText(lblName);
            return await this.driverService.validateRecord("Validate Member name: ",[actualValue,expectedValue,"Incorrect Member name!"]);
        } catch (error) {
            console.log("validateNameOnShareWithCustomers");
            console.log(error);
            return false;
        }
        
    }

    public async removeMemberOnShareWithCustomers(positionRow: number = 1){
        try {
            let btnDelete = By.xpath(`//app-customer-frame-agreement-membership-tab//table//tbody//tr[${positionRow}]//button[@id="pgs-agm-mem--act-remove-btn"]`);
            await this.driverService.waitUntilElementLoaded(btnDelete);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await this.driverService.click(btnDelete);
            return true;
        } catch (error) {
            console.log("removeMemberOnShareWithCustomers");
            console.log(error);
            return false;
        }
        
    }
}
