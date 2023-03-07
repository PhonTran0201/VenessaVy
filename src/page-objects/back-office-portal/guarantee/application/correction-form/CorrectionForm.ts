import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";
import { ApplicationFormPreview } from "../application-forms/ApplicationFormPreview";

export class CorrectionForm {
   constructor(protected driverService: SeleniumWebDriverService) {}
   //#region Xpaths
   protected txtComment = By.xpath(`//app-send-for-correction-form//textarea`);
   protected btnSend = By.xpath(`//app-send-for-correction-form//button[@id='pgs-cus-per-send']`);
   //#endregion

   //#region 
   public async inputComment(comment: string){
      try {
         await this.driverService.waitUntilElementLoaded(this.txtComment);
         await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
         await this.driverService.setText(this.txtComment, comment);
         return true;
      } catch (error) {
         console.log('inputComment');
         console.log(error);
         return false;
      }
   }
   /**
    * Send or Send for approval
    */
   public async pressSend(){
      try {
         await this.driverService.waitUntilElementLoaded(this.btnSend);
         await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 50);
         await this.driverService.click(this.btnSend);
         return true;
      } catch (error) {
         console.log('pressSend');
         console.log(error);
         return false;
      }
   }
   //#endregion
}
