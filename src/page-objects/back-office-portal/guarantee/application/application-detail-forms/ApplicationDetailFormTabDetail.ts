import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";
import { ApplicationFormPreview } from "../application-forms/ApplicationFormPreview";

export class ApplicationDetailFormTabDetail extends ApplicationFormPreview {
   constructor(driverService: SeleniumWebDriverService) {
      super(driverService);
   }
   //#region Xpaths of alert
   protected lblAlertCorrection = By.xpath(`//*[contains(local-name(),'form')]//div[contains(@class,'alert')]`);
   //#endregion

   //#region Xpaths tab title
   protected btnDetailTab = By.xpath(`//*[contains(local-name(),'form')]//a[@role='tab' and contains(text(),'Detail')]`);
   protected btnDocumentsTab = By.xpath(`//*[contains(local-name(),'form')]//a[@role='tab' and contains(text(),'Documents')]`);
   //#endregion
   protected lblFrameAgreementNo = By.xpath("//*[contains(@class,'heading-primary') and contains(text(),'Frame agreement no')]//*[self::*[text()]]");
   protected lblApplicationNo = By.xpath("//*[contains(@class,'heading-primary') and contains(text(),'Application no')]//*[self::*[text()]]");
   protected lblGuaranteeNo = By.xpath("//*[contains(@class,'heading-primary') and contains(text(),'Guarantee number')]//*[self::*[text()]]")

   //#region Press tab
   public async pressDetailTab() {
      try {
         await this.driverService.waitUntilElementLoaded(this.btnDetailTab);
         await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
         await this.driverService.click(this.btnDetailTab);
         await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
         return true;
      } catch (error) {
         console.log('pressDetailTab');
         console.log(error);
         return false;
      }
   }
   public async pressDocumentsTab() {
      try {
         await this.driverService.waitUntilElementLoaded(this.btnDocumentsTab);
         await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
         await this.driverService.click(this.btnDocumentsTab);
         return true;
      } catch (error) {
         console.log('pressDocumentsTab');
         console.log(error);
         return false;
      }
   }
   //#endregion

   //#region Validate alert
   public async validateAlertCommentCorrection(expectedComment: string) {
      try {
         await this.driverService.waitUntilElementLoaded(this.lblAlertCorrection);
         await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
         const actualComment = await this.driverService.getText(this.lblAlertCorrection);
         return await this.driverService.validateRecord("Validate comment correction",
            [actualComment, expectedComment, "Incorrect comment"]);
      } catch (error) {
         console.log('validateAlertCommentCorrection');
         console.log(error);
         return false;
      }
   }
   //#endregion

   //#region Validate comment list
   public async isCommentExisted(comment: string) {
      try {
         const lblComment = By.xpath(`//*[contains(local-name(),'form')]//article//li/span[text()=": ${comment}"]`);
         await this.driverService.waitUntilElementLoaded(lblComment);
         await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
         return await this.driverService.isExisted(lblComment);
      } catch (error) {
         console.log('isCommentExisted');
         console.log(error);
         return false;
      }
   }
   //#endregion

   public async validateLabelStatusWarningOnApplicationDetailForm(status: string) {
      try {
         let lblStatusWarning = By.xpath(`//*[contains(local-name(),'form')]//div[contains(@class,'label-status-warning')]//*[self::*[text()]]`);
         await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 2000);
         let actualValue = "";
         if (await this.driverService.isExisted(lblStatusWarning)) {
            actualValue = await this.driverService.getText(lblStatusWarning);
         }
         if (actualValue.includes(status)) {
            return true;
         } else
            return false;
      } catch (error) {
         console.log("validateLabelStatusWarningOnApplicationDetailForm");
         console.log(error);
         return false;
      }
   }

   public async validateFrameAgreementNoOnApplicationDetailForm(ExpectedValue: string) {
      try {
         await this.driverService.waitUntilElementLoaded(this.lblFrameAgreementNo);
         await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
         let ActualValue = await this.driverService.getText(this.lblFrameAgreementNo);
         return await this.driverService.validateRecord("Validate Frame Agreement No: ", [ActualValue, ExpectedValue, "Incorrect Frame Agreement No.!"]);

      } catch (error) {
         console.log("validateFrameAgreementNoOnApplicationDetailForm");
         console.log(error);
         return true;
      }
   }

   public async validateApplicationNoOnApplicationDetailForm(ExpectedValue: string) {
      try {
         await this.driverService.waitUntilElementLoaded(this.lblApplicationNo);
         await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
         let ActualValue = await this.driverService.getText(this.lblApplicationNo);
         return await this.driverService.validateRecord("Validate Application No: ", [ActualValue, ExpectedValue, "Incorrect Application No.!"]);

      } catch (error) {
         console.log("validateApplicationNoOnApplicationDetailForm");
         console.log(error);
         return true;
      }
   }

   public async validateGuaranteeNoOnGuaranteeDetailForm(ExpectedValue: string) {
      try {
         await this.driverService.waitUntilElementLoaded(this.lblGuaranteeNo);
         await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
         let ActualValue = await this.driverService.getText(this.lblGuaranteeNo);
         return await this.driverService.validateRecord("Validate Guarantee No: ", [ActualValue, ExpectedValue, "Incorrect Guarantee No.!"]);

      } catch (error) {
         console.log("validateGuaranteeNoOnGuaranteeDetailForm");
         console.log(error);
         return true;
      }
   }

}
