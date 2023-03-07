import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";
import { ApplicationFormPreview } from "../../../../back-office-portal/guarantee/application/application-forms/ApplicationFormPreview";

export class ApprovalFormCP {
   constructor(protected driverService: SeleniumWebDriverService) {}
   //#region Xpaths
   protected txtComment = By.xpath(`//div[contains(@class,'pop-over-comment-box') or contains(@class,'popover')]//textarea[@id='commentBoxInput']`);
   protected btnSend = By.xpath(`//div[contains(@class,'pop-over-comment-box') or contains(@class,'popover')]//button[@id='submitComment']`);
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
