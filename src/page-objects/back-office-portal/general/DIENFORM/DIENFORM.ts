import { By } from "selenium-webdriver";
import { BasePage } from "../../../../core/BasePage";
import { waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../shared/functions";
import { PageFactory } from "../../../PageFactory";

export class DIENFORM extends BasePage {
    public global =  PageFactory.getInstance().createGlobalPageObjectPage();
    public btnTiep = By.xpath(`//div[@role='button']//span[text()='Tiếp']`);
    public btnGui = By.xpath(`//div[@role='button']//span[text()='Gửi']`);
    public phanHoiKhac = By.xpath(`//a[contains(text(),'Gửi ý kiến phản hồi khác')]`);



    async pressTiepButton() {
        try {
            let ele = await this.getFieldType(this.btnTiep);
            await ele.click();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }

    }
    async pressGuiButton() {
        try {
            let ele = await this.getFieldType(this.btnGui);
            await ele.click();
            await this.global.waitForSeconds(2000);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }

    }

    async pressGuiPhanHoiKhac() {
        try {
            let ele = await this.getFieldType(this.phanHoiKhac);
            await ele.click();
            await this.global.waitForSeconds(1000);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }

    }

    //#region "A. PHẦN CÂU HỎI GẠN LỌC"

    public async SelectQuestion1Options(question: string, answer: string) {
        try {
            let label = By.xpath(`//div[@class='geS5n' and  .//*[contains(text(),'${question}')]]//div[./label][${answer}]`);
            await this.global.waitForSeconds(500);
            let ele = await this.getFieldType(label);
            await ele.click();
            return true
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    public async SelectMultipleOptions(question: string, answer: string) {
        try {
            let label = By.xpath(`//div[@role ='listitem' and  .//*[contains(text(),'${question}')]]//div[@role='list']//div[@class='eBFwI'][${answer}]`);
            await this.global.waitForSeconds(500);
            let ele = await this.getFieldType(label);
            await ele.click();
            return true
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    public async doQuanTam(question, answer, row: number){
        try {
            for(let i = 1; i <= row; i++){
                let label = By.xpath(`//div[contains(@class, 'geS5n' )  and  .//*[contains(text(),'${question}')]]//div[@role ='group'][${i}]//label[${answer}]`);
                await this.global.waitForSeconds(200);
                let ele = await this.getFieldType(label);
                await ele.click();
            }
            return true
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    public async suAnhHuong(question, answer, row: number){
        try {
            for(let i = 0; i < row; i++){
                let label = By.xpath(`//div[contains(@class, 'geS5n' )  and  .//*[contains(text(),'${question}')]]//div[@data-field-index ='${i}']//div[@class='V4d7Ke'][${answer}]//div[@role='radio']`);
                await this.global.waitForSeconds(200);
                let ele = await this.getFieldType(label);
                await ele.click();
            }
            return true
        } catch (error) {
            console.log(error);
            return false;
        }
    }

}