import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { logWarningMessage, waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";


export class ApplicationDetailFormTabDocuments {
    constructor(protected driverService: SeleniumWebDriverService) { }

    //#region Xpaths
    protected btnUpload = By.xpath(`//*[contains(local-name(),'form')]//button[@id="pgs-guar-upload-document"]`);
    protected cmbType = By.xpath(`//*[contains(local-name(),'form')]//div[./label[text()=' Type ']]//input`);
    protected inputUpload = By.xpath(`//*[contains(local-name(),'form')]//div[./label[text()='Upload document ']]//input`);
    //#endregion

    //#region Validate values on document table
    public async validateDocumentNameOnTableByRow(expectedValue: string, positionRow = 1, isUsedForSearch = false) {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnUpload);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            const lblActualItem = By.xpath(`//*[contains(local-name(),'form')]//tbody//tr[${positionRow}]//app-download-link-col/a`);
            const actualValue = await this.driverService.getText(lblActualItem);
            if(isUsedForSearch){
                if(!actualValue.toLowerCase().includes(expectedValue.toLowerCase())){
                    logWarningMessage(`"${expectedValue}" is NOT contained in "${actualValue}"!`);
                    return false;
                }
                else{
                    return true;
                }
            }
            return await this.driverService.validateRecord("Validate Document Name",
                [actualValue, expectedValue, "Incorrect Document name!"]);
        } catch (error) {
            console.log('validateDocumentNameOnTableByRow');
            console.log(error);
            return false;
        }
    }

    public async validateTypeOnTableByRow(expectedValue: string, positionRow = 1) {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnUpload);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            const lblActualItem = By.xpath(`//*[contains(local-name(),'form')]//tbody//tr[${positionRow}]//td[3]//*[text()]`);
            const actualValue = await this.driverService.getText(lblActualItem);
            return await this.driverService.validateRecord("Validate Type",
                [actualValue, expectedValue, "Incorrect Type!"]);
        } catch (error) {
            console.log('validateTypeOnTableByRow');
            console.log(error);
            return false;
        }
    }

    public async validateUploadedByOnTableByRow(expectedValue: string, positionRow = 1) {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnUpload);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            const lblActualItem = By.xpath(`//*[contains(local-name(),'form')]//tbody//tr[${positionRow}]//td[4]//*[text()]`);
            const actualValue = await this.driverService.getText(lblActualItem);
            return await this.driverService.validateRecord("Validate UploadedBy",
                [actualValue, expectedValue, "Incorrect UploadedBy!"]);
        } catch (error) {
            console.log('validateUploadedByOnTableByRow');
            console.log(error);
            return false;
        }
    }

    public async validateUploadedDateOnTableByRow(expectedValue: string, positionRow = 1) {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnUpload);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            const lblActualItem = By.xpath(`//*[contains(local-name(),'form')]//tbody//tr[${positionRow}]//td[5]//*[text()]`);
            const actualValue = await this.driverService.getText(lblActualItem);
            return await this.driverService.validateRecord("Validate Uploaded date",
                [actualValue, expectedValue, "Incorrect Uploaded date!"]);
        } catch (error) {
            console.log('validateUploadedDateOnTableByRow');
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region Get values
    public async getPositionRowDocumentByName(documentName: string){
        try {
            await this.driverService.waitUntilElementLoaded(this.btnUpload);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            const lblDocumentName = By.xpath(`//*[contains(local-name(),'form')]//tbody//app-download-link-col/a`);
            const len = await (await this.driverService.findElements(lblDocumentName)).length;
            for(let i = 1; i <= len; i++){
                const temp = By.xpath(`//*[contains(local-name(),'form')]//tbody//tr[${i}]//app-download-link-col/a`);
                const actualDocName = await this.driverService.getText(temp);
                if(documentName.localeCompare(actualDocName) === 0){
                    return i;
                }
            }
            logWarningMessage(`Document name "${documentName}" is NOT found!`);
            return -1;
        } catch (error) {
            console.log('getPositionRowDocumentByName');
            console.log(error);
            return -1;
        }
    }
    //#endregion

    //#region Press button
    public async pressDownloadButtonDocumentByRow(positionRow = 1){
        try {
            await this.driverService.waitUntilElementLoaded(this.btnUpload);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const btnDownload = By.xpath(`//*[contains(local-name(),'form')]//tbody//tr[${positionRow}]//button/i[contains(@class,'fa-download')]`);
            await this.driverService.click(btnDownload);
            await this.driverService.pressEnterCurrentElement();
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true;
        } catch (error) {
            console.log('pressDownloadButtonDocumentByRow');
            console.log(error);
            return false;
        }
    }
    //#endregion
}