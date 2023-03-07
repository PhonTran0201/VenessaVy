import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { logInfoMessage, selectDropdownOption, selectDropdownOption_v2, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";

export class MailForm {
    //#region Attribute
    //#region Related Records
    private cmbSelectEntityType = By.xpath("//app-mail-form//div[./label[contains(@for,'pgs-mail-filter-relate-record')]]//div[.//div[text()='Select entity type']]//input");
    private cmbSearhEntity = By.xpath("//app-mail-form//div[./label[contains(@for,'pgs-mail-filter-relate-record')]]//div[.//div[text()='Search Entity']]//input");
    //#endregion
    //#region From - To
    private txtFrom = By.xpath("//app-mail-form//input[contains(@id,'From')]");
    private txtTo = By.xpath("//app-mail-form//input[contains(@id,'To')]");
    private btnClearAllEmailTo = By.xpath("//app-mail-form//div[./label[text()=' To ']]//span[@title='Clear all']");
    private btnCc = By.xpath("//app-mail-form//button[text()=' Cc ']");
    private btnBcc = By.xpath("//app-mail-form//button[text()=' Bcc ']");
    private txtCc = By.xpath("//app-mail-form//div[./label[text()=' Cc ']]//input");
    private txtBcc = By.xpath("//app-mail-form//div[./label[text()=' Bcc ']]//input");
    //#endregion
    //#region Template...
    private cmbTemplate = By.xpath("//app-mail-form//div[./label[text()=' Template ']]//input");
    private cmbAccount = By.xpath("//app-mail-form//div[./label[text()=' Account ']]//input");
    private cmbEntityType = By.xpath("//app-mail-form//div[./label[text()=' Entity ']]//input[contains(@id,'type')]");
    private cmbEntityValue = By.xpath("//app-mail-form//div[./label[text()=' Entity ']]//input[contains(@id,'entityValue')]");
    //#endregion
    //#region Iframe Subject
    private iframeSubject = By.xpath("//app-mail-form//div[./label[text()=' Subject ']]//iframe");
    private txtSubject = By.xpath("//body/p");
    //#endregion
    //#region Iframe body
    private iframeBody = By.xpath("//app-mail-form//div[./label[text()=' Body ']]//iframe");
    private txtBody = By.xpath("//body/p");
    //#endregion
    private cmbAccountDocument = By.xpath("//app-mail-form//input[contains(@id,'AccountDocument')]");
    private inputAttachmens = By.xpath("//app-mail-form//div[./label[text()='Attachments']]//input");
    //#endregion
    //#region Footer
    private btnDiscardDraft = By.xpath("//app-mail-form//button[text()='Discard draft']");
    //#endregion

    constructor(protected driverService: SeleniumWebDriverService) { }
    //#region Relates records
    public async inputSelectEntityType(EntityType: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbSelectEntityType);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await this.driverService.setText(this.cmbSelectEntityType, EntityType);
            await this.driverService.pressEnterCurrentElement();
            return true;
        } catch (error) {
            console.log('inputSelectEntityType');
            console.log(error);
            return false;
        }
    }

    public async inputSearchEntity(EntityName: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbSearhEntity);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await this.driverService.setText(this.cmbSearhEntity, EntityName);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await selectDropdownOption(EntityName, "", this.driverService);
            return true;
        } catch (error) {
            console.log('inputSearchEntity');
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region From To - Cc Bcc
    public async validateEmailAddressFrom(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtFrom);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getAttributeValue(this.txtFrom, 'value');
            return await this.driverService.validateRecord("Validate Email address from",
                [actualValue, expectedValue, "Incorrect address mail from!"]);
        } catch (error) {
            console.log('validateEmailAddressFrom');
            console.log(error);
            return false;
        }
    }
    public async inputEmailAddressTo(EmailTo: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtTo);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.setText(this.txtTo, EmailTo);
            await this.driverService.pressEnterCurrentElement();
            return true;
        } catch (error) {
            console.log('inputEmailAddressTo');
            console.log(error);
            return false;
        }
    }
    public async validateEmailAddressTo(expectedValue: string, position: number = 1) {
        try {
            const lblEmail = By.xpath(`(//app-mail-form//div[./label[text()=' To ']]//span[contains(@class,'ng-value-label')])[${position}]`);
            await this.driverService.waitUntilElementLoaded(lblEmail);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            const actualValue = await this.driverService.getText(lblEmail);
            return this.driverService.validateRecord(`Validate Email To`,
                [actualValue, expectedValue, "Incorrect Email To!"]);
        } catch (error) {
            console.log('validateEmailAddressTo');
            console.log(error);
            return false;
        }
    }

    public async pressClearAllEmailAddressTo() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnClearAllEmailTo);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.click(this.btnClearAllEmailTo);
            return true;
        } catch (error) {
            console.log('pressClearAllEmailAddressTo');
            console.log(error);
            return false;
        }
    }

    public async pressCcButton() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnCc);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.click(this.btnCc);
            return true;
        } catch (error) {
            console.log('pressCcButton');
            console.log(error);
            return false;
        }
    }
    public async pressBccButton() {
        try {
            await this.driverService.waitUntilElementLoaded(this.btnBcc);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.click(this.btnBcc);
            return true;
        } catch (error) {
            console.log('pressBccButton');
            console.log(error);
            return false;
        }
    }

    public async inputCcEmail(CcEmail: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtCc);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.setText(this.txtCc, CcEmail);
            await this.driverService.pressEnterCurrentElement();
            return true;
        } catch (error) {
            console.log('inputCcEmail');
            console.log(error);
            return false;
        }
    }

    public async inputBccEmail(BccEmail: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtBcc);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.setText(this.txtBcc, BccEmail);
            await this.driverService.pressEnterCurrentElement();
            return true;
        } catch (error) {
            console.log('inputBccEmail');
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region Template

    public async inputTemplate(Template: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbTemplate);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.setText(this.cmbTemplate, Template);
            await selectDropdownOption(Template, "", this.driverService);
            return true;
        } catch (error) {
            console.log('inputTemplate');
            console.log(error);
            return false;
        }
    }
    public async inputAccount(Account: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbAccount);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.setText(this.cmbAccount, Account);
            await selectDropdownOption(Account, "", this.driverService);
            return true;
        } catch (error) {
            console.log('inputAccount');
            console.log(error);
            return false;
        }
    }
    public async inputEntityType(EntityType: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbEntityType);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.setText(this.cmbEntityType, EntityType);
            await selectDropdownOption(EntityType, "", this.driverService);
            return true;
        } catch (error) {
            console.log('inputEntityType');
            console.log(error);
            return false;
        }
    }
    public async inputEntityValue(EntityValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbEntityValue);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.setText(this.cmbEntityValue, EntityValue);
            await selectDropdownOption(EntityValue, "", this.driverService);
            return true;
        } catch (error) {
            console.log('inputEntityValue');
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region Subject
    public async inputSubject(Subject: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.iframeSubject);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await this.driverService.switchToFrame(this.iframeSubject);
            await this.driverService.waitUntilElementLoaded(this.txtSubject);
            await this.driverService.setText(this.txtSubject, Subject);
            await this.driverService.switchToDefaultContent();
            return true;
        } catch (error) {
            console.log('inputSubject');
            console.log(error);
            return false;
        }
    }

    public async validateValueSubject(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.iframeSubject);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.switchToFrame(this.iframeSubject);
            await this.driverService.waitUntilElementLoaded(this.txtSubject);
            const actualValue = await this.driverService.getText(this.txtSubject);
            await this.driverService.switchToDefaultContent();
            return await this.driverService.validateRecord("Validate Subject",
                [actualValue, expectedValue, "Incorrect Subject!"]);
        } catch (error) {
            console.log('validateValueSubject');
            console.log(error);
            return false;
        }
    }
    //#endregion
    //#region Body
    public async inputBody(Body: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.iframeBody);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.switchToFrame(this.iframeBody);
            await this.driverService.waitUntilElementLoaded(this.txtBody);
            await this.driverService.setText(this.txtBody, Body);
            await this.driverService.switchToDefaultContent();
            return true;
        } catch (error) {
            console.log('inputBody');
            console.log(error);
            return false;
        }
    }
    public async validateValueBody(expectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.iframeBody);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.switchToFrame(this.iframeBody);
            await this.driverService.waitUntilElementLoaded(this.txtBody);
            const actualValue = await this.driverService.getText(this.txtBody);
            await this.driverService.switchToDefaultContent();
            return await this.driverService.validateRecord("Validate Body",
                [actualValue, expectedValue, "Incorrect Body!"]);
        } catch (error) {
            console.log('validateValueBody');
            console.log(error);
            return false;
        }
    }
    //#endregion
    //#region Account's Document
    public async inputAccountDocument(AccountDocument: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbAccountDocument);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.setText(this.cmbAccountDocument, AccountDocument);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await selectDropdownOption_v2(AccountDocument, "", this.driverService);
            return true;
        } catch (error) {
            console.log('inputAccountDocument');
            console.log(error);
            return false;
        }
    }
    public async checkAttachmentExist(AttachmentName: string, isUsedForSearch = false) {
        try {
            await this.driverService.waitUntilElementLoaded(this.cmbAccountDocument);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            let attachment = By.xpath(`//app-mail-form//div[./label[text()='Attachments']]//div[text()='${AttachmentName}']`);
            if (isUsedForSearch) {
                attachment = By.xpath(`//app-mail-form//div[./label[text()='Attachments']]//div[contains(text(),'${AttachmentName}')]`);
            }
            return await this.driverService.isExisted(attachment);
        } catch (error) {
            console.log('checkAttachmentExist');
            console.log(error);
            return false;
        }
    }

    public async inputUploadFileAttachment(UploadDocuments: string) {
        try {
            const remote = require("selenium-webdriver/remote");
            await this.driverService.waitUntilElementLoaded(this.inputAttachmens);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            if (__dirname.includes("jenkins") && !__dirname.includes(".jenkins")) {
                logInfoMessage("\tSet File Detector on Jenkins...");
                await this.driverService.getDriver().setFileDetector(new remote.FileDetector());
                logInfoMessage("File dir: " + __dirname);
            }
            await (await this.driverService.findElement(this.inputAttachmens)).sendKeys(UploadDocuments);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true;
        } catch (error) {
            console.log("inputUploadFileAttachment");
            console.log(error);
            return false;
        }
    }
    //#endregion
    //#region Footer
    public async pressButtonDiscardDraft(){
        try {
            await this.driverService.waitUntilElementLoaded(this.btnDiscardDraft);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
            await this.driverService.click(this.btnDiscardDraft);
            return true;
        } catch (error) {
            console.log('pressButtonDiscardDraft');
            console.log(error);
            return false;
        }
    }
    //#endregion
}