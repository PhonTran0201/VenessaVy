import { By } from "selenium-webdriver";
import { isBuffer } from "util";
import { logInfoMessage, waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../shared/functions";
import { ClaimFormInsurance } from "../claim/claim-forms/ClaimFormInsurance";

const remote = require("selenium-webdriver/remote");
export class FirstNoticeOfLossDetails extends ClaimFormInsurance {
  protected strRootXpath = `//div[contains(@class,'tab-pane') and contains(@class,'active')]`;

  protected lblFNOLTitle = By.xpath(`${this.strRootXpath}//app-fnol-details-left-side//h4`);
  protected lblWorkflow = By.xpath(`${this.strRootXpath}//app-fnol-details-left-side//h4//following-sibling::small`);
  protected lblReference = By.xpath(`${this.strRootXpath}//app-fnol-details//div[contains(label,'Reference')]//p`);
  protected lblPriority = By.xpath(`${this.strRootXpath}//app-fnol-details//div[contains(label,'Priority')]//p`);
  protected lblAssignedTo = By.xpath(`${this.strRootXpath}//app-fnol-details//div[contains(label,'Assigned to')]//p`);
  protected lblDueDate = By.xpath(`${this.strRootXpath}//app-fnol-details//div[contains(label,'Due date')]//p`);

  protected txtDescription = By.xpath(`${this.strRootXpath}//*[contains(local-name(),'form')]//*[contains(@class,'pgs-json-schema-control-description')]`);

  protected btnApproveFNOLManually = By.xpath(`${this.strRootXpath}//app-fnol-details//button[contains(text(),'Approve FNOL manually')]`);
  protected btnReject = By.xpath(`${this.strRootXpath}//app-fnol-details//button[contains(text(),'Reject')]`);
  protected btnSave = By.xpath(`${this.strRootXpath}//app-fnol-details//button[contains(@id,'pgs-save-fnol-fnol-form-btn') and not (@disabled)]`);
  protected cmbPolicy = By.xpath(`//*[contains(local-name(),'app-fnol-metadata-details-form')]//*[contains(@class,'pgs-json-schema-control-policy')]//input`);

  //Xpath of elements on Register a claim form
  protected lblTitleForm = By.xpath(`//*[contains(local-name(),'app-fnol-metadata-details')]//h4/span`);
  protected cmbOrganization = By.xpath(`//*[contains(local-name(),'app-fnol-metadata-details')]//label[contains(text(),'Organization')]/following-sibling::*//input`);
  protected cmbOrganizationValue = By.xpath(`//*[contains(local-name(),'app-fnol-metadata-details')]//label[contains(text(),'Organization')]/following-sibling::*//span[contains(@class,'ng-value-label')]`);
  protected cmbAccount = By.xpath(`//*[contains(local-name(),'app-fnol-metadata-details')]//*[contains(@class,'pgs-json-schema-control-account')]//input`);
  protected cmbAccountValue = By.xpath(`//*[contains(local-name(),'app-fnol-metadata-details')]//*[contains(@class,'pgs-json-schema-control-account')]//span[contains(@class,'ng-value-label')]`);
  // protected cmbPolicy = By.xpath(`//*[contains(local-name(),'app-fnol-metadata-details')]//*[contains(@class,'pgs-json-schema-control-policy')]//input`);
  protected cmbPolicyValue = By.xpath(`(//*[contains(local-name(),'app-fnol-metadata-details')]//*[contains(@class,'pgs-json-schema-control-policy')]//*[contains(@class,'ng-value')])[last()]`);
  protected dtpDateOfLoss = By.xpath(`//*[contains(local-name(),'app-fnol-metadata-details')]//*[contains(@class,'pgs-json-schema-control-date-of-loss') or contains(@class,'pgs-json-schema-control-date-and-time')]`);
  protected cmbProduct = By.xpath(`//*[contains(local-name(),'app-fnol-metadata-details')]//*[contains(@class,'pgs-json-schema-control-product')]//input`);
  protected cmbProductValue = By.xpath(`//*[contains(local-name(),'app-fnol-metadata-details')]//*[contains(@class,'pgs-json-schema-control-product')]//span[contains(@class,'ng-value-label')]`);
  protected dtpReportedDate = By.xpath(`//*[contains(local-name(),'app-fnol-metadata-details')]//*[contains(@class,'pgs-json-schema-control-reported-date')]`);
  protected txtObjectName = By.xpath(`//*[contains(local-name(),'app-fnol-metadata-details')]//*[contains(@class,'pgs-json-schema-control-object-name')]`);
  protected txtAddress = By.xpath(`//*[contains(local-name(),'app-fnol-metadata-details')]//*[contains(@class,'pgs-json-schema-control-claimant-address') or contains(@class,'pgs-json-schema-control-address')]`);
  protected cmbClaimHandler = By.xpath(`//*[contains(local-name(),'app-fnol-metadata-details')]//*[contains(@class,'pgs-json-schema-control-claim-handler')]//input`);
  protected cmbClaimHandlerValue = By.xpath(`//*[contains(local-name(),'app-fnol-metadata-details')]//*[contains(@class,'pgs-json-schema-control-claim-handler')]//span[contains(@class,'ng-value-label')]`);
  protected txtPhoneNumber = By.xpath(`//*[contains(local-name(),'app-fnol-metadata-details')]//*[contains(@class,'pgs-json-schema-control-claimant-phone') or contains(@class,'pgs-json-schema-control-phone-number')]`);
  protected txtEmailAddress = By.xpath(`//*[contains(local-name(),'app-fnol-metadata-details')]//*[contains(@class,'pgs-json-schema-control-claimant-email') or contains(@class,'pgs-json-schema-control-email-address')]`);
  protected txtNotes = By.xpath(`//*[contains(local-name(),'app-fnol-metadata-details')]//*[contains(@class,'pgs-json-schema-control-notes')]`);
  protected cmbInsuredObjectValue = By.xpath("//*[contains(local-name(),'app-fnol-metadata-details')]//*[contains(@class,'pgs-json-schema-control-insured-object')]//*[contains(@class,'ng-value ')]");
  protected cmbIncidentTypeValue = By.xpath("//*[contains(local-name(),'app-fnol-metadata-details')]//*[contains(@class,'pgs-json-schema-control-incident-type')]//span[contains(@class,'ng-value-label')]");
  protected txtCity = By.xpath("//*[contains(local-name(),'app-fnol-metadata-details')]//*[contains(@class,'pgs-json-schema-control-city')]");
  protected cmbObjectName = By.xpath(`//*[contains(@class,'pgs-json-schema-control-object-name')]//span[contains(@class,'ng-value-label')]`);
  protected btnDownloadCloud = By.xpath(`//button[.//span[contains(@class,'fa-cloud-download')]]`);
  protected btnCloseDownloadCloud = By.xpath(`//button[.//span[contains(@class,'fa-times')]]`);

  public async validateFNOLTitleInFNOLDetails(expectedValue: string) {
    try {
      let lblValue = await this.getFieldType(this.lblFNOLTitle);
      let actualValue = await lblValue.getValue();
      return await this.driverService.validateRecord("Validate Title in FNOL Details: ", [actualValue, expectedValue, "Incorrect value!"]);
    } catch (error) {
      console.log('validateFNOLTitleInFNOLDetails');
      console.log(error);
      return false;
    }
  }

  public async validateWorkflowInFNOLDetails(expectedValue: string) {
    try {
      let lblValue = await this.getFieldType(this.lblWorkflow);
      let actualValue = await lblValue.getValue();
      return await this.driverService.validateRecord("Validate Title in FNOL Details: ", [actualValue, expectedValue, "Incorrect value!"]);
    } catch (error) {
      console.log('validateWorkflowInFNOLDetails');
      console.log(error);
      return false;
    }
  }

  public async validateReferenceInFNOLDetails(expectedValue: string) {
    try {
      let lblValue = await this.getFieldType(this.lblReference);
      let actualValue = await lblValue.getValue();
      return await this.driverService.validateRecord("Validate Reference in FNOL Details: ", [actualValue, expectedValue, "Incorrect value!"]);
    } catch (error) {
      console.log('validateReferenceInFNOLDetails');
      console.log(error);
      return false;
    }
  }

  public async validatePriorityInFNOLDetails(expectedValue: string) {
    try {
      let lblValue = await this.getFieldType(this.lblPriority);
      let actualValue = await lblValue.getValue();
      return await this.driverService.validateRecord("Validate Priority in FNOL Details: ", [actualValue, expectedValue, "Incorrect value!"]);
    } catch (error) {
      console.log('validatePriorityInFNOLDetails');
      console.log(error);
      return false;
    }
  }

  public async validateAssignedToInFNOLDetails(expectedValue: string) {
    try {
      let lblValue = await this.getFieldType(this.lblAssignedTo);
      let actualValue = await lblValue.getValue();
      return await this.driverService.validateRecord("Validate AssignedTo in FNOL Details: ", [actualValue, expectedValue, "Incorrect value!"]);
    } catch (error) {
      console.log('validateAssignedToInFNOLDetails');
      console.log(error);
      return false;
    }
  }

  public async validateDueDateInFNOLDetails(expectedValue: string) {
    try {
      let lblValue = await this.getFieldType(this.lblDueDate);
      let actualValue = await lblValue.getValue();
      if (actualValue.includes(expectedValue)) {
        expectedValue = actualValue;
      }
      return await this.driverService.validateRecord("Validate DueDate in FNOL Details: ", [actualValue, expectedValue, "Incorrect value!"]);
    } catch (error) {
      console.log('validateDueDateInFNOLDetails');
      console.log(error);
      return false;
    }
  }

  public async validateValueInsuredObjectInFNOLDetails(expectedValue: string){
    try {
      await this.driverService.waitUntilElementVisible(this.cmbInsuredObjectValue);
      const actualValue = await this.driverService.getText(this.cmbInsuredObjectValue);
      return await this.driverService.validateRecord('Validate InsuredObject!',
        [actualValue, expectedValue, 'Incorrect InsuredObject!']);
    } catch (error) {
      console.log('validateValueInsuredObjectInFNOLDetails');
      console.log(error);
      return false;
    }
  }

  public async validateValueIncidentTypeInFNOLDetails(expectedValue: string){
    try {
      await this.driverService.waitUntilElementVisible(this.cmbIncidentTypeValue);
      const actualValue = await this.driverService.getText(this.cmbIncidentTypeValue);
      return await this.driverService.validateRecord('Validate Incident Type!',
        [actualValue, expectedValue, 'Incorrect Incident Type!']);
    } catch (error) {
      console.log('validateValueIncidentTypeInFNOLDetails');
      console.log(error);
      return false;
    }
  }

  public async validateValueCityInFNOLDetails(expectedValue: string){
    try {
      await this.driverService.waitUntilElementVisible(this.txtCity);
      const actualValue = await this.driverService.getAttributeValue(this.txtCity,'value');
      return await this.driverService.validateRecord('Validate City!',
        [actualValue, expectedValue, 'Incorrect City!']);
    } catch (error) {
      console.log('validateValueCityInFNOLDetails');
      console.log(error);
      return false;
    }
  }
  public async inputDescriptionFNOLDetailsForm(Description: string) {
    try {
      let lblValue = await this.getFieldType(this.txtDescription);
      await lblValue.setValue(Description);
      return true;
    } catch (error) {
      console.log("inputDescriptionFNOLDetailsForm\n" + error);
      return false;
    }
  }

  public async clickApprovalFNOLManuallyButton() {
    try {
      let btnValue = await this.getFieldType(this.btnApproveFNOLManually);
      await btnValue.click();
      return true;
    } catch (error) {
      console.log("btnApproveFNOLManually\n" + error);
      return false;
    }
  }

  public async clickRejectButton() {
    try {
      let btnValue = await this.getFieldType(this.btnReject);
      await btnValue.click();
      return true;
    } catch (error) {
      console.log("clickRejectButton\n" + error);
      return false;
    }
  }

  public async clickSaveButton() {
    try {
      let btnValue = await this.getFieldType(this.btnSave);
      await btnValue.click();
      return true;
    } catch (error) {
      console.log("clickSaveButton\n" + error);
      return false;
    }
  }

  public async closeActiveFNOLTab() {
    try {
      let element = await this.getFieldType(By.xpath(`//app-first-notice-of-loss-page//*[contains(@class,'active')]//button[@id='pgs-close-tab-btn']`));
      await element.click();
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
      return true;
    } catch (error) {
      console.log(`closeActiveFNOLTab`);
      console.log(error);
      return false;
    }
  }


  //#region ATTACHMENT section 


  public async uploadFileAttachmentFNOL(UploadDocuments: string, WaitUploadSuccess: boolean = false) {
    try {
      const inputUploadFile = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-fnol-attachment//input[contains(@type,'file')]");
      await this.driverService.waitUntilElementLoaded(inputUploadFile);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      if (__dirname.includes("jenkins") && !__dirname.includes(".jenkins")) {
        logInfoMessage("\tSet File Detector on Jenkins...");
        await this.driverService.getDriver().setFileDetector(new remote.FileDetector());
        logInfoMessage("File dir: " + __dirname);
      }
      await (await this.driverService.findElement(inputUploadFile)).sendKeys(UploadDocuments);
      if (!WaitUploadSuccess) {
        await waitUntilHorizontalProgressBarLoaded(this.driverService);
      }
      return true;
    } catch (error) {
      console.log("uploadFileAttachmentFNOL");
      console.log(error);
      return true;
    }
  }


  public async validateFileAtachmentIsDisplayed(DocumentName: string, DocumentType: string, isDisabled: boolean = false) {
    try {
      // let FileUpload = By.xpath(`//*[contains(@class,'active')]//app-fnol-attachment//div[contains(@class, 'upload-table')]//a[.//div[contains(text(),'${fileName}.{${fileType}}')]]`);
      logInfoMessage(`Validating file '${DocumentName}.${DocumentType}'...`);
      let srcIcoin = "./assets/images/document/";
      if (DocumentType.localeCompare('pdf') === 0) {
        srcIcoin += "pdf.png";
      } else if (DocumentType.localeCompare('gif') === 0) {
        srcIcoin += "file-alt.png";
      } else if (DocumentType.localeCompare('docx') === 0 || DocumentType.localeCompare('doc') === 0) {
        srcIcoin += "word.png";
      } else if (DocumentType.localeCompare('jpeg') === 0 || DocumentType.localeCompare('jpg') === 0 || DocumentType.localeCompare('png') === 0) {
        srcIcoin += "image.png";
      } else if (DocumentType.localeCompare('xlsx') === 0) {
        srcIcoin += "excel.png";
      }else if (DocumentType.localeCompare('txt') === 0) {
        srcIcoin += "text.png";
      }else if (DocumentType.localeCompare('zip') === 0) {
        srcIcoin += "zip.png";
      }
      let FileUploadIcoin = By.xpath(`(//*[contains(@class,'active')]//app-fnol-attachment//div[contains(@class, 'upload-table')]//a[.//div[contains(text(),'${DocumentName}.${DocumentType}')]]//img[@src = '${srcIcoin}'])[last()]`);
      if (isDisabled) {
        FileUploadIcoin = By.xpath(`(//*[contains(@class,'active')]//app-fnol-attachment//div[contains(@class, 'upload-table')]//div[./a[.//div[contains(text(),'${DocumentName}.${DocumentType}')]]//img[@src = '${srcIcoin}']]//*[contains(@class,'delete-file') and @hidden])[last()]`);
      }
      if (await this.driverService.isExisted(FileUploadIcoin)) {
        return true;
      } return false;
    } catch (error) {
      console.log(`validateFileAtachmentIsDisplayed`);
      console.log(error);
      return false;
    }
  }

  public async downloadFileAttachmentByFileName(DocumentName: string) {
    try {
      let FileUpload = By.xpath(`//*[contains(@class,'active')]//app-fnol-attachment//div[contains(@class, 'upload-table')]//a[.//div[contains(text(),'${DocumentName}')]]`);
      let element = await this.getFieldType(FileUpload);

      await element.click();
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.waitUntilElementVisible(this.btnDownloadCloud);
      await this.driverService.click(this.btnDownloadCloud);
      await waitUntilHorizontalProgressBarLoaded(this.driverService);
      await this.driverService.mouseHover(By.xpath(`//app-preview-attachment-modal`));
      await this.driverService.click(this.btnCloseDownloadCloud);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      return true;
    } catch (error) {
      console.log(`downloadFileAttachmentByFileName`);
      console.log(error);
      return false;
    }
  }

  public async removeFileAttachmentByFileName(fileName: string) {
    try {
      let btnRemoveFileUpload = By.xpath(`//*[contains(@class,'active')]//app-fnol-attachment//div[contains(@class, 'upload-table')]//div[./a[.//div[contains(text(),'${fileName}')]]]//*[contains(@class,'delete-file')]`);
      let element = await this.getFieldType(btnRemoveFileUpload);
      await element.click();
      await waitUntilHorizontalProgressBarLoaded(this.driverService);
      return true;
    } catch (error) {
      console.log(`removeFileAttachmentByFileName`);
      console.log(error);
      return false;
    }
  }


  //#endregion
}