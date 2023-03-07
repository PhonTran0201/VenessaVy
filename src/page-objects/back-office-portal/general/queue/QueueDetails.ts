import { By } from "selenium-webdriver";
import { BasePage } from "../../../../core/BasePage";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../shared/functions";

export class QueueDetails extends BasePage {

    private strRootxpath = "//div[contains(@class,'tab-pane') and contains(@class,'active')]//div[contains(@class,'tab-pane') and contains(@class,'active')]";


    public async pressNextButtonPaginationOnSubList(sectionName: string) {
        try {
            let index;
            switch (sectionName.toLocaleLowerCase()) {
                case "queue members": index = 1; break;
                case "add members": index = 2; break;
                default: return -1;
            }
            let btnNext = By.xpath(`${this.strRootxpath}//c-table[${index}]//a[text()='Next']//parent::li[not(contains(@class,'disabled'))]`);
            if (await this.driverService.isExisted(btnNext)) {
                const element = await this.getFieldType(btnNext);
                await element.click();
                await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            }
            return true;
        } catch (error) {
            console.log('pressNextButtonPaginationOnSubList');
            console.log(error);
            return false;
        }
    }

    public async pressDoubleLeftButtonPaginationOnSubList(sectionName: string) {
        try {
            let index;
            switch (sectionName.toLocaleLowerCase()) {
                case "queue members": index = 1; break;
                case "add members": index = 2; break;
                default: return -1;
            }
            let btn = By.xpath(`${this.strRootxpath}//c-table[${index}]//i[contains(@class,'fa-angle-double-left')]//parent::a/parent::li[not(contains(@class,'disabled'))]`);
            if (await this.driverService.isExisted(btn)) {
                const element = await this.getFieldType(btn);
                await element.click();
                await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 1500);
            }
            return true;
        } catch (error) {
            console.log('pressDoubleLeftButtonOnSubList');
            console.log(error);
            return false;
        }
    }

    public async getCurrentTotalPageNumberAtQueueList(sectionName: string) {
        try {
            let index;
            switch (sectionName.toLocaleLowerCase()) {
                case "queue members": index = 1; break;
                case "add members": index = 2; break;
                default: return -1;
            }
            let xpath = By.xpath(`${this.strRootxpath}//c-table[${index}]//ul[contains(@class,'pagination')]//span[contains(text(),'/ ')]`)
            let ele = await this.getFieldType(xpath);
            let temp = await ele.getValue();
            return parseInt(temp.replace(/^\D+/g, ''));
        } catch (error) {
            console.log('getCurrentTotalPageNumberAtQueueList');
            console.log(error);
            return -1;
        }
    }



    public async findMemberOnQueueList(sectionName: string, fullName: string, userName: string) {
        try {
            let index;
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService,2000);
            await this.driverService.waitUntilElementVisible(By.xpath(`${this.strRootxpath}//app-queue-member-list//*[text()='Add members']`))
            switch (sectionName.toLocaleLowerCase()) {
                case "queue members": index = 1; break;
                case "add members": index = 2; break;
                default: return false;
            }
            let memberXpath = By.xpath(`${this.strRootxpath}//app-queue-member-list//c-table[${index}]//tbody[.//app-queue-owner-col[contains(text(),'${fullName}')] and .//span[contains(text(),'${userName}')]]`);
            await this.pressDoubleLeftButtonPaginationOnSubList(sectionName);
            let totalPages = await this.getCurrentTotalPageNumberAtQueueList(sectionName);
            for (let i = 1; i <= totalPages; i++) {
                if (await this.driverService.isExisted(memberXpath)) {
                    return true;
                } else {
                    if (i == totalPages) {
                        return false;
                    }
                    await this.pressNextButtonPaginationOnSubList(sectionName);
                }
            }
            return false;
        } catch (error) {
            console.log(`findMemberOnQueueList`);
            console.log(error);
            return false;
        }
    }

    public async removeMemberFromQueueByUsername(userName: string) {
        try {
            let btnXpath = By.xpath(`${this.strRootxpath}//tbody//tr[.//span[contains(text(),'${userName}')]]//button[@id='pgs-member-remove-btn']`);
            let ele = await this.getFieldType(btnXpath);
            await ele.click();
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true;
        } catch (error) {
            console.log(`removeMemberFromQueueByUsername`);
            console.log(error);
            return false;
        }
    }

    public async addMembertoQueueByUsername(userName: string) {
        try {
            let btnXpath = By.xpath(`${this.strRootxpath}//tbody//tr[.//span[contains(text(),'${userName}')]]//button[@id='pgs-queue-d-update']`);
            let ele = await this.getFieldType(btnXpath);
            await ele.click();
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true;
        } catch (error) {
            console.log(`addMembertoQueueByUsername`);
            console.log(error);
            return false;
        }
    }

    public async validateAddMemberIconIsInVisible(userName: number) {
        try {
            let btnXpath = By.xpath(`${this.strRootxpath}//tbody//tr[.//span[contains(text(),'${userName}')]]//button[@id='pgs-queue-d-update']`);
            if (await this.driverService.isExisted(btnXpath)) {
                return false
            } else return true;
        } catch (error) {
            console.log(`validateAddMemberIconIsInVisible`);
            console.log(error);
            return false;
        }
    }

    public async validateMemberIsAddedOnQueue(fullName: string, userName: string, index:number) {
        try {
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            let fullnameXpath = By.xpath(`${this.strRootxpath}//app-queue-member-list//c-table[1]//tbody//tr[${index}]//app-queue-owner-col`);
            let usernameXpath = By.xpath(`${this.strRootxpath}//app-queue-member-list//c-table[1]//tbody//tr[${index}]//span[@title]`)
            let ele2 = await this.getFieldType(usernameXpath);
            let actualFullName = await this.driverService.getText(fullnameXpath);
            let actualUserName = await ele2.getValue();
            return await this.driverService.validateRecord("Validate queue is added: "
                , [actualFullName, fullName, "Incorrect value!"],
                [actualUserName, userName, "Incorrect Value!"])
        } catch (error) {
            console.log(`validateMemberIsAddedOnQueue`);
            console.log(error);
            return false;
        }

    }

    public async setRoleOfQueueMemberByUsername(userName: string, Role: string) {
        try {
            if (Role.localeCompare('Supervisor') == 0 || Role.localeCompare('Member') == 0) {
                let ele = await this.getFieldType(By.xpath(`${this.strRootxpath}//tbody//tr[.//span[contains(text(),'${userName}')]]//button[@id='pgs-queue-mem-role-btn']`));
                await ele.click();
                await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
                let eleOption = await this.getFieldType(By.xpath(`//div[@class='dropdown']//div[@ngbdropdownmenu]//*[@id='pgs-click-role-btn']//span[text()='${Role}']`));
                await eleOption.click();
                await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
                return true;
            }
            return false
        } catch (error) {
            console.log(`setRoleOfQueueMemberByUsername`);
            console.log(error);
            return false;
        }
    }


}