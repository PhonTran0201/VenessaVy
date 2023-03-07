import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { ValidateField } from "../../../../../shared/classes";
import { waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2, selectDropdownOption } from "../../../../../shared/functions";


export class CaseForm {
  //xpath of elements at Case management form
  protected cmbOrganization = By.xpath("//div[@role='document']//app-task-form//label[contains(text(),' Organization ')]/following-sibling::*//input");
  protected txtCaseTitle = By.xpath("//div[@role='document']//app-task-form//div[./label[contains(text(),'Case title')]]//input");
  protected cmbWorkFlow = By.xpath("//div[@role='document']//app-task-form//*[@id='pgs-task-form-ref-type']");
  protected cmbCaseType = By.xpath("//div[@role='document']//app-task-form//*[@id='pgs-task-form-case-type']");
  protected cmbSelectEntityType = By.xpath("//div[@role='document']//app-task-form//*[text()='Select entity type']/following-sibling::div/input");
  protected cmbSearhEntity = By.xpath("//div[@role='document']//app-task-form//*[text()='Search Entity']/following-sibling::div/input");
  protected dtpDueDate = By.xpath("//div[@role='document']//app-task-form//*[@id='pgs-task-form-due-date']");
  protected cmbQueue = By.xpath("//div[@role='document']//app-task-form//*[@id='pgs-task-form-queue-id']");
  protected cmbPriority = By.xpath("//div[@role='document']//app-task-form//*[@id='pgs-task-form-priority']");
  protected cmbAssignedTo = By.xpath("//div[@role='document']//app-task-form//*[@id='pgs-task-form-assignee' and  not(@disabled)]");
  // locOrganization: By = By.xpath(`//formly-org-autocomplete//div[contains(@class,'ng-select-container ng-has-value')]`);???????????
  protected iframeDescrition = By.xpath("//div[@role='document']//app-task-form//iframe");
  protected txtDescription = By.xpath("//body/p");

  protected txtValidationMessage = By.xpath("//app-task-form//formly-validation-message");

  //xpath of elements value
  protected cmbOrganizationValue = By.xpath("//div[@role='document']//app-task-form//label[contains(text(),'Organization')]/following-sibling::*//span[contains(@class,'ng-value-label')]");
  protected cmbWorkflowValue = By.xpath("//app-task-form//label[contains(text(),'Workflow')]/following-sibling::*//span[contains(@class,'ng-value-label')]");
  protected cmbCaseTypeValue = By.xpath("//app-task-form//label[contains(text(),' Case type ')]/following-sibling::*//span[contains(@class,'ng-value-label')]");
  protected cmbRelatedRecords = By.xpath("//app-task-form//label[contains(text(),' Related records ')]/following-sibling::*//span[contains(@class,'text-truncate')]");
  protected cmbQueueValue = By.xpath("//app-task-form//label[contains(text(),' Queue ')]/following-sibling::*//span[contains(@class,'ng-value-label')]");
  protected cmbPriorityValue = By.xpath("//div[@role='document']//app-task-form//label[contains(text(),' Priority ')]/following-sibling::*//div[@class='ng-value ng-star-inserted']");
  protected cmbAssignedToValue = By.xpath("//div[@role='document'] //app-task-form//label[contains(text(),' Assigned to ')]/following-sibling::*//div[./img]/div");

  //xpath of clear old data to Edit 
  protected btnClearOrganization = By.xpath("//div[@role='document']//app-task-form//label[contains(text(),' Organization ')]/following-sibling::*//span[@title='Clear all']");
  protected btnClearCaseTitle = By.xpath("//div[@role='document']//app-task-form//*[@id='pgs-task-form-title']/preceding-sibling::button");
  protected btnClearWorkflow = By.xpath("//div[@role='document']//app-task-form//label[contains(text(),'Workflow')]/following-sibling::*//span[@title='Clear all']");
  protected btnClearCaseType = By.xpath("//div[@role='document']//app-task-form//label[contains(text(),' Case type ')]/following-sibling::*//span[@title='Clear all']");
  protected btnClearSelectEntityType = By.xpath("//div[@role='document']//app-task-form//label[contains(text(),' Related records ')]/following-sibling::*//span[@title='Clear all']");
  protected btnClearSearchEntity = By.xpath("//div[@role='document']//app-task-form//div[contains(@class,'entity-items-select')]/div/i");
  protected btnClearQueue = By.xpath("//div[@role='document']//app-task-form//label[contains(text(),'Queue')]/following-sibling::*//span[@title='Clear all']");
  protected btnClearPriority = By.xpath("//div[@role='document']//app-task-form//label[contains(text(),'Priority')]/following-sibling::*//span[@title='Clear all']");
  protected btnClearAssignedTo = By.xpath("//div[@role='document']//app-task-form//label[contains(text(),' Assigned to ')]/following-sibling::*//span[@title='Clear all']");



  constructor(protected driverService: SeleniumWebDriverService) { }

  public async validateFields(valField: ValidateField): Promise<ValidateField> {
    let valFieldResult = new ValidateField(
      valField.nameField,
      valField.index,
      valField.status,
      valField.message,
      valField.toastMessage
    );
    try {
      let txtValidattionMessage = By.xpath(`(//formly-validation-message)[1]`);
      if (await this.driverService.isExisted(txtValidattionMessage)) {
        valFieldResult.status = false;
        let countErrorField = 1;
        while (
          await this.driverService.isExisted(
            By.xpath(`(//formly-validation-message)[${countErrorField}]`)
          )
        ) {
          let errorMessage: string = (
            await this.driverService.getText(txtValidattionMessage)
          ).toString();
          valFieldResult.message.push(errorMessage);
          countErrorField++;
        }
      } else {
        await waitUntilHorizontalProgressBarLoaded(this.driverService);
      }
    } catch (error) {
      console.log("validateField");
      console.log(error);
      return valFieldResult;
    }
    return valFieldResult;
  }

  // => Replace this method
  public async inputDataToCaseForm(
    caseTitle: string,
    workFlow: string,
    caseType: string,
    relatedRecords: string,
    searchEntity: string,
    description: string,
    dueDate: string,
    queue: string,
    priority: string,
    assignedTo: string
  ) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtCaseTitle);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      if (caseTitle) await this.driverService.setText(this.txtCaseTitle, caseTitle);

      if (workFlow) {
        await this.driverService.setText(this.cmbWorkFlow, workFlow);
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
        await selectDropdownOption(workFlow, "", this.driverService);
        //await this.driverService.pressEnterCurrentElement();
      }
      if (caseType) {
        await this.driverService.setText(this.cmbCaseType, caseType);
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService)
        await selectDropdownOption(caseType, "", this.driverService);
      }

      if (relatedRecords) {
        await this.driverService.setText(this.cmbSelectEntityType, relatedRecords);
        await this.driverService.waitForSeconds(1000);
        await this.driverService.pressEnterCurrentElement();

        if (searchEntity && await this.driverService.canBeSetText(this.cmbSearhEntity)) {
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
          await this.driverService.setText(this.cmbSearhEntity, searchEntity);
          await waitUntilHorizontalProgressBarLoaded(this.driverService);
          await selectDropdownOption(searchEntity, "", this.driverService);
          await this.driverService.pressTabCurrentElement();
        }
      }

      if (description) {
        await this.driverService.switchToFrame(this.iframeDescrition);
        await this.driverService.waitUntilElementLoaded(this.txtDescription);
        await this.driverService.setText(this.txtDescription, description);
        await this.driverService.switchToDefaultContent();
      }

      if (dueDate) {
        await this.driverService.waitUntilElementLoaded(this.dtpDueDate);
        await this.driverService.setText(this.dtpDueDate, dueDate);
      }

      if (queue) {
        await this.driverService.setText(this.cmbQueue, queue);
        await this.driverService.waitForSeconds(1000);
        await selectDropdownOption(queue, "", this.driverService);
      }

      if (priority) {
        await this.driverService.setText(this.cmbPriority, priority);
        await this.driverService.waitForSeconds(1000);
        await this.driverService.pressEnter(this.cmbPriority);
      }

      await this.driverService.waitForSeconds(2000);
      if (await this.driverService.canBeSetText(this.cmbAssignedTo)) {
        await this.driverService.setText(this.cmbAssignedTo, assignedTo);
        await this.driverService.waitForSeconds(1000);
        await selectDropdownOption(assignedTo, "", this.driverService);
      }
      return true;
    } catch (error) {
      console.log("inputDataToCaseForm");
      console.log(error);
      return false;
    }
  }

  // => Replace this method
  public async inputDataToEditCaseForm(
    caseTitle: string,
    workFlow: string,
    caseType: string,
    relatedRecords: string,
    searchEntity: string,
    description: string,
    dueDate: string,
    queue: string,
    priority: string,
    assignedTo: string
  ) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtCaseTitle);

      await this.driverService.setText(this.txtCaseTitle, caseTitle);

      let btnClearAllCaseType = By.xpath("//div/app-task-form//*[@id='pgs-task-form-ref-type']/parent::div/parent::div/following-sibling::span[@title='Clear all']");
      if ((await this.driverService.isExisted(btnClearAllCaseType))) {
        await this.driverService.click(btnClearAllCaseType);
      }
      if (workFlow && (await this.driverService.canBeSetText(this.cmbWorkFlow))) {
        await this.driverService.click(this.cmbWorkFlow);
        await this.driverService.setText(this.cmbWorkFlow, workFlow);
        await this.driverService.waitForSeconds(1000);
        await this.driverService.pressEnter(this.cmbCaseType);
      }
      if (caseType && (await this.driverService.canBeSetText(this.cmbCaseType))) {
        await this.driverService.click(this.cmbCaseType);
        await this.driverService.setText(this.cmbCaseType, caseType);
        await this.driverService.waitForSeconds(1000);
        await this.driverService.pressEnter(this.cmbCaseType);
      }


      let entityItem = By.xpath("//formly-entities-select//div/i");
      let count = 0;
      while ((await this.driverService.isExisted(entityItem)) && count++ < 20) {
        await this.driverService.waitForSeconds(2000);
        await this.driverService.click(entityItem);
      }
      if (relatedRecords && searchEntity) {
        await this.driverService.setText(
          this.cmbSelectEntityType,
          relatedRecords
        );
        await this.driverService.waitForSeconds(1000);
        await this.driverService.pressEnter(this.cmbSelectEntityType);

        if (await this.driverService.canBeSetText(this.cmbSearhEntity)) {
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
          await this.driverService.setText(this.cmbSearhEntity, searchEntity);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
          await selectDropdownOption(searchEntity, "", this.driverService);
          await this.driverService.pressTabCurrentElement();
        }
      }

      if (description) {
        await this.driverService.switchToFrame(this.iframeDescrition);
        await this.driverService.waitUntilElementLoaded(this.txtDescription);
        await this.driverService.setText(this.txtDescription, description);
        await this.driverService.switchToDefaultContent();
      }

      if (dueDate) {
        await this.driverService.waitUntilElementLoaded(this.dtpDueDate);
        await this.driverService.setText(this.dtpDueDate, dueDate);
      }

      let btnClearAllQueue = By.xpath("//div/app-task-form//*[@id='pgs-task-form-queue-id']/parent::div/parent::div/following-sibling::span[@title='Clear all']");
      if ((await this.driverService.isExisted(btnClearAllQueue))) {
        await this.driverService.click(btnClearAllQueue);
      }
      if (queue) {
        await this.driverService.click(this.cmbQueue);
        await this.driverService.setText(this.cmbQueue, queue);
        await this.driverService.waitForSeconds(1000);
        await selectDropdownOption(queue, "", this.driverService);

        if (await this.driverService.canBeSetText(this.cmbAssignedTo)) {
          await this.driverService.setText(this.cmbAssignedTo, assignedTo);
          await this.driverService.waitForSeconds(1000);
          await selectDropdownOption(assignedTo, "", this.driverService);
        }
      }


      let btnClearAllPriority = By.xpath("//div/app-task-form//*[@id='pgs-task-form-priority']/parent::div/parent::div/following-sibling::span[@title='Clear all']");
      if ((await this.driverService.isExisted(btnClearAllPriority))) {
        await this.driverService.click(btnClearAllPriority);
      }
      if (priority) {
        await this.driverService.setText(this.cmbPriority, priority);
        await this.driverService.waitForSeconds(1000);
        await this.driverService.pressEnter(this.cmbPriority);
      }

      return true;
    } catch (error) {
      console.log("inputDataToEditCaseForm");
      console.log(error);
      return false;
    }
  }

  public async checkCaseFormIsOpening(caseTitle: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtCaseTitle);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      if (caseTitle) {
        const actualNoteTitle = await this.driverService.getAttributeValue(this.txtCaseTitle, 'value');
        return actualNoteTitle.includes(caseTitle);
      }
      return true;
    } catch (error) {
      console.log("checkCaseFormIsOpening\n" + error);
      return false;
    }
  }

  public async checkValidationErrorMessageExisted() {
    await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
    return await this.driverService.isExisted(this.txtValidationMessage);
  }

  //#region Input value for each fields on Case form
  public async inputOrganizationOnCaseForm(organization: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbOrganization);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      if (await this.driverService.canBeSetText(this.cmbOrganization)) {
        await this.driverService.setText(this.cmbOrganization, organization);
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
        await selectDropdownOption(organization, "", this.driverService);
      }
      return true;
    } catch (error) {
      console.log("inputOrganizationOnCaseForm");
      console.log(error);
      return false;
    }
  }

  public async inputCaseTitleOnCaseForm(caseTitle: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtCaseTitle);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.setText(this.txtCaseTitle, caseTitle);
      return true;
    } catch (error) {
      console.log("inputCaseTitleOnCaseForm");
      console.log(error);
      return false;
    }
  }

  public async inputWorkFlowOnCaseForm(workFlow: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbWorkFlow);
      if (await this.driverService.canBeSetText(this.cmbWorkFlow)) {
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
        await this.driverService.setText(this.cmbWorkFlow, workFlow);
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
        await selectDropdownOption(workFlow, "", this.driverService);
      }
      return true;
    } catch (error) {
      console.log("inputWorkFlowOnCaseForm");
      console.log(error);
      return false;
    }
  }

  public async inputCaseTypeOnCaseForm(caseType: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbCaseType);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      if (await this.driverService.canBeSetText(this.cmbCaseType)) {
        await this.driverService.setText(this.cmbCaseType, caseType);
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
        await selectDropdownOption(caseType, "", this.driverService);
      }
      return true;
    } catch (error) {
      console.log("inputCaseTypeOnCaseForm");
      console.log(error);
      return false;
    }
  }

  public async inputSelectEntityTypeOnCaseForm(selectEntityType: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbSelectEntityType);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      if (await this.driverService.canBeSetText(this.cmbSelectEntityType)) {
        await this.driverService.setText(this.cmbSelectEntityType, selectEntityType);
        await this.driverService.waitForSeconds(1000);
        await this.driverService.pressEnter(this.cmbSelectEntityType);
      }
      return true;
    } catch (error) {
      console.log("inputSelectEntityTypeOnCaseForm");
      console.log(error);
      return false;
    }
  }

  public async inputSearchEntityOnCaseForm(searchEntity: string) {
    try {
      if (await this.driverService.canBeSetText(this.cmbSearhEntity)) {
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
        if (await this.driverService.canBeSetText(this.cmbSearhEntity)) {
          await this.driverService.setText(this.cmbSearhEntity, searchEntity);
          await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
          await selectDropdownOption(searchEntity, "", this.driverService);
          await this.driverService.pressTabCurrentElement();
        }
      }
      return true;
    } catch (error) {
      console.log("inputSearchEntityOnCaseForm");
      console.log(error);
      return false;
    }
  }

  public async inputDescriptionOnCaseForm(description: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.iframeDescrition);
      await this.driverService.switchToFrame(this.iframeDescrition);
      await this.driverService.waitUntilElementLoaded(this.txtDescription);
      if (await this.driverService.canBeSetText(this.txtDescription)) {
        await this.driverService.setText(this.txtDescription, description);
      }
      await this.driverService.switchToDefaultContent();
      return true;
    } catch (error) {
      console.log("inputDescriptionOnCaseForm");
      console.log(error);
      return false;
    }
  }

  public async inputDueDateOnCaseForm(dueDate: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.dtpDueDate);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      if (await this.driverService.canBeSetText(this.dtpDueDate)) {
        await this.driverService.setText(this.dtpDueDate, dueDate);
      }
      return true;
    } catch (error) {
      console.log("inputDueDateOnCaseForm");
      console.log(error);
      return false;
    }
  }

  public async inputQueueOnCaseForm(queue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbQueue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      if (await this.driverService.canBeSetText(this.cmbQueue)) {
        await this.driverService.setText(this.cmbQueue, queue);
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
        await selectDropdownOption(queue, "", this.driverService);
      }
      return true;
    } catch (error) {
      console.log("inputQueueOnCaseForm");
      console.log(error);
      return false;
    }
  }

  public async inputPriorityOnCaseForm(priority: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbPriority);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      if (await this.driverService.canBeSetText(this.cmbPriority)) {
        await this.driverService.setText(this.cmbPriority, priority);
        await this.driverService.waitForSeconds(1000);
        await this.driverService.pressEnter(this.cmbPriority);
      }
      return true;
    } catch (error) {
      console.log("inputPriorityOnCaseForm");
      console.log(error);
      return false;
    }
  }

  public async inputAssignedToOnCaseForm(assignedTo: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbAssignedTo);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      if (await this.driverService.canBeSetText(this.cmbAssignedTo)) {
        await this.driverService.setText(this.cmbAssignedTo, assignedTo);
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
        await selectDropdownOption(assignedTo, "", this.driverService);
      }
      return true;
    } catch (error) {
      console.log("inputAssignedToOnCaseForm");
      console.log(error);
      return false;
    }
  }
  //#endregion

  //#region Validate value for each fields on Case form

  public async validateOrganizationValueOnCaseForm(ExpectedOrganization: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbOrganizationValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualOrganization = await this.driverService.getText(this.cmbOrganizationValue);
      return await this.driverService.validateRecord(`Validate field Organization`, [ActualOrganization, ExpectedOrganization, `Incorrect Organization!`]);
    } catch (error) {
      console.log("validateOrganizationValueOnCaseForm");
      console.log(error);
      return false;
    }
  }

  public async validateCaseTitleValueOnCaseForm(ExpectedCaseTitle: string) {
    try {
      await this.driverService.waitUntilElementVisible(this.txtCaseTitle);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      let ActualCaseTitle = await this.driverService.getAttributeValue(this.txtCaseTitle, "value");
      return await this.driverService.validateRecord(`Validate field Case Title`, [ActualCaseTitle, ExpectedCaseTitle, `Incorrect Case Title!`]);
    } catch (error) {
      console.log("validatevalueCaseTitleOnCaseForm");
      console.log(error);
      return false;
    }
  }

  public async validateWorkflowValueOnCaseForm(ExpectedWorkflow: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbWorkflowValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualWorkflow = await this.driverService.getText(this.cmbWorkflowValue);
      return await this.driverService.validateRecord(`Validate field Workflow`, [ActualWorkflow, ExpectedWorkflow, `Incorrect Workflow!`]);
    } catch (error) {
      console.log("validateWorkflowValueOnCaseForm");
      console.log(error);
      return false;
    }
  }

  public async validateCaseTypeValueOnCaseForm(ExpectedCaseType: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbCaseTypeValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualCaseType = await this.driverService.getText(this.cmbCaseTypeValue);
      return await this.driverService.validateRecord(`Validate field Case Type`, [ActualCaseType, ExpectedCaseType, `Incorrect Case Type!`]);
    } catch (error) {
      console.log("validateCaseTypeValueOnCaseForm");
      console.log(error);
      return false;
    }
  }

  // This function needs to consider
  public async validateRelatedRecordsValueOnCaseForm(ExpectedRelatedRecords: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbRelatedRecords);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualRelatedRecords = await this.driverService.getText(this.cmbRelatedRecords);
      return await this.driverService.validateRecord(`Validate field Related Records`, [ActualRelatedRecords, ExpectedRelatedRecords, `Incorrect Related records!`]);
    } catch (error) {
      console.log("validateRelatedRecordsValueOnCaseForm");
      console.log(error);
      return false;
    }
  }

  public async validateDescriptionValueOnCaseForm(ExpectedDescription: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.iframeDescrition);
      await this.driverService.switchToFrame(this.iframeDescrition);
      await this.driverService.waitUntilElementLoaded(this.txtDescription);
      let ActualDescription = await this.driverService.getText(this.txtDescription);
      await this.driverService.switchToDefaultContent();
      return await this.driverService.validateRecord(`Validate field Description`, [ActualDescription, ExpectedDescription, `Incorrect Description!`]);
    } catch (error) {
      console.log("validateDescriptionValueOnCaseForm");
      console.log(error);
      return false;
    }
  }

  public async validateDueDateValueOnCaseForm(ExpectedDueDate: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.dtpDueDate);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualDueDate = await this.driverService.getAttributeValue(this.dtpDueDate, "value");
      return await this.driverService.validateRecord(`Validate field Due Date`, [ActualDueDate, ExpectedDueDate, `Incorrect Due Date!`]);
    } catch (error) {
      console.log("validateDueDateValueOnCaseForm");
      console.log(error);
      return false;
    }
  }

  public async validateQueueValueOnCaseForm(ExpectedQueue: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbQueueValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.scrollElementToView(await this.driverService.findElement(this.cmbQueueValue));
      let ActualQueue = await this.driverService.getText(this.cmbQueueValue);
      return await this.driverService.validateRecord(`Validate field Queue`, [ActualQueue, ExpectedQueue, `Incorrect Queue!`]);
    } catch (error) {
      console.log("validateQueueValueOnCaseForm");
      console.log(error);
      return false;
    }
  }

  public async validatePriorityValueOnCaseForm(ExpectedPriority: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbPriorityValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualPriority = await this.driverService.getText(this.cmbPriorityValue);
      return await this.driverService.validateRecord(`Validate field Priority`, [ActualPriority, ExpectedPriority, `Incorrect Priority!`]);
    } catch (error) {
      console.log("validatePriorityValueOnCaseForm");
      console.log(error);
      return false;
    }
  }

  public async validateAssignedToValueOnCaseForm(ExpectedAssignedTo: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbAssignedToValue);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let ActualAssignedTo = await this.driverService.getText(this.cmbAssignedToValue);
      return await this.driverService.validateRecord(`Validate field Assigned To`, [ActualAssignedTo, ExpectedAssignedTo, `Incorrect Assigned to!`]);
    } catch (error) {
      console.log("validateAssignedToValueOnCaseForm");
      console.log(error);
      return false;
    }
  }

  //#endregion

  //#region Methods clear field on Case edit form

  public async clearOldDataOfOrganizationOnEditCaseForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbOrganization);
      if (await this.driverService.isExisted(this.btnClearOrganization)) {
        await this.driverService.click(this.btnClearOrganization);
      }
      return true;
    } catch (error) {
      console.log("clearOldDataOfOrganizationOnEditCaseForm");
      console.log(error);
      return false;
    }
  }

  public async clearOldDataOfCaseTitleOnEditCaseForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.txtCaseTitle);
      if (await this.driverService.isExisted(this.btnClearCaseTitle)) {
        await this.driverService.click(this.btnClearCaseTitle);
      }
      return true;
    } catch (error) {
      console.log("clearOldDataOfCaseTitleOnEditCaseForm");
      console.log(error);
      return false;
    }
  }

  public async clearOldDataOfWorkflowOnEditCaseForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbWorkFlow);
      if (await this.driverService.isExisted(this.btnClearWorkflow)) {
        await this.driverService.click(this.btnClearWorkflow);
      }
      return true;
    } catch (error) {
      console.log("clearOldDataOfWorkflowOnEditCaseForm");
      console.log(error);
      return false;
    }
  }

  public async clearOldDataOfCaseTypeOnEditCaseForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbCaseType);
      if (await this.driverService.isExisted(this.btnClearCaseType)) {
        await this.driverService.click(this.btnClearCaseType);
      }
      return true;
    } catch (error) {
      console.log("clearOldDataOfCaseTypeOnEditCaseForm");
      console.log(error);
      return false;
    }
  }

  public async clearOldDataOfRelatedRecordsOnEditCaseForm() {
    try {
      let count = 0;
      while ((await this.driverService.isExisted(this.btnClearSearchEntity)) && count++ < 20) {
        await this.driverService.waitForSeconds(2000);
        await this.driverService.click(this.btnClearSearchEntity);
      }
      return true;
    } catch (error) {
      console.log("clearOldDataOfRelatedRecordsOnEditCaseForm");
      console.log(error);
      return false;
    }
  }

  public async clearOldDataOfQueueOnEditCaseForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbQueue);
      if (await this.driverService.isExisted(this.btnClearQueue)) {
        await this.driverService.click(this.btnClearQueue);
      }
      return true;
    } catch (error) {
      console.log("clearOldDataOfQueueOnEditCaseForm");
      console.log(error);
      return false;
    }
  }

  public async clearOldDataOfPriorityOnEditCaseForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbPriority);
      if (await this.driverService.isExisted(this.btnClearPriority)) {
        await this.driverService.click(this.btnClearPriority);
      }
      return true;
    } catch (error) {
      console.log("clearOldDataOfPriorityOnEditCaseForm");
      console.log(error);
      return false;
    }
  }

  public async clearOldDataOfAssignedToOnEditCaseForm() {
    try {
      await this.driverService.waitUntilElementLoaded(this.cmbAssignedTo);
      if (await this.driverService.isExisted(this.btnClearAssignedTo)) {
        await this.driverService.click(this.btnClearAssignedTo);
      }
      return true;
    } catch (error) {
      console.log("clearOldDataOfAssignedToOnEditCaseForm");
      console.log(error);
      return false;
    }
  }


  //#endregion

}
