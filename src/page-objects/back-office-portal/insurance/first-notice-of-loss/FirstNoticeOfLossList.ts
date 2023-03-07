import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../core/selenium-webdriver.service";
import { logFailMessage, waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../shared/functions";
import { CaseList } from "../../general/case/case-list/CaseList";


export class FirstNoticeOfLossList extends CaseList {

  protected lblReference = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody/tr[1]//td[contains(@class,'pgs-fnol-reference')]//*[self::*[text()]]`);
  protected lblCaseTitle = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//tbody/tr[1]//td[contains(@class,'pgs-fnol-title')]//a`);

  public async getRefNumberByRow(positionRow: number = 1) {
    try {
      let RefValue = By.xpath(`//app-first-notice-of-loss-list//table/tbody/tr[${positionRow}]/td[count(//table/thead/tr/th[.="Reference"]/preceding-sibling::th)+1]`);
      return parseInt(await this.driverService.getText(RefValue));

    } catch (error) {
      console.log(`Get Ref Number failed`);
      console.log(error);
      return 0;
    }
  }

  public async checkIfRefNumberExists(refNumber: string) {
    for (let positionRow = 1; positionRow < 10; positionRow++) {
      try {
        let RefValue = By.xpath(`//app-first-notice-of-loss-list//table/tbody/tr[${positionRow}]/td[count(//table/thead/tr/th[.="Reference"]/preceding-sibling::th)+1]`);
        if (await this.driverService.getText(RefValue) == refNumber) {
          return true;
        }
      } catch (error) {
        console.log(`checkIfRefNumberExists`);
        console.log(error);
        return false;
      }
    }
  }

  public async getRowByCaseTitle(caseTitle: string) {
    try {
      for (let positionRow = 1; positionRow < 10; positionRow++) {
        let txtTitle = By.xpath(`//app-first-notice-of-loss-list//table//tr[${positionRow}]//td[contains(@class, "pgs-fnol-title")]`);
        let txtTitleValue = await this.driverService.getText(txtTitle);
        if (txtTitleValue === caseTitle) {
          return positionRow;
        }
      }
    } catch (error) {
      console.log(`getRowByCaseTitle`);
      console.log(error);
      return 0;
    }
  }

  public async openFNOLformByRow(positionRow: number) {
    try {
      let xpathFNOL = By.xpath(`//table//tr[${positionRow}]//*[contains(local-name(),'first-notice-of-loss')]//button[./i[contains(@class,'icon-create-FNOL')]]`);
      await this.driverService.waitUntilElementLoaded(xpathFNOL);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.click(xpathFNOL);
      await waitUntilHorizontalProgressBarLoaded(this.driverService);
      return true;
    } catch (error) {
      console.log('openFNOLformByRow');
      console.log(error);
      return false;
    }
  }

  public async openFNOLDetailByRowOnFNOLList(positionRow: number) {
    try {
      let xpathFNOL = By.xpath(`//*[contains(local-name(),'first-notice-of-loss')]//tbody//tr[${positionRow}]//a`);
      let lblFNOLTitle = await this.getFieldType(xpathFNOL);
      await lblFNOLTitle.click();
      return true;
    } catch (error) {
      console.log('openFNOLDetailByRowOnFNOLList');
      console.log(error);
      return false;
    }
  }



  public async validateCaseTitleValueOnList(ExpectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
    try {
      let txtCaseTitle = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]//td[contains(@class, "pgs-task-title") or contains(@class, "pgs-fnol-title")]//a`);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.waitUntilElementLoaded(txtCaseTitle);
      let ActualCaseTitle = await this.driverService.getText(txtCaseTitle);
      if (isUsedForSearch) {
        return ActualCaseTitle.toLowerCase().includes(ExpectedValue.toLowerCase());
      }
      return await this.driverService.validateRecord(`Validate Case Title`, [ActualCaseTitle, ExpectedValue, `Incorrect Case Title`]);
    } catch (error) {
      console.log(`validateCaseTitleValueOnList`);
      console.log(error);
      return false;
    }
  }


  public async validateReferenceValueOnList(ExpectedValue: string, positionRow: number = 1, isUsedForSearch: boolean = false) {
    try {
      let txtReference = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]//td[contains(@class, "pgs-fnol-reference")]//span`);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.waitUntilElementLoaded(txtReference);
      let ActualValue = await this.driverService.getText(txtReference);
      if (isUsedForSearch) {
        return ActualValue.toLowerCase().includes(ExpectedValue.toLowerCase());
      }
      return await this.driverService.validateRecord(`Validate Reference`, [ActualValue, ExpectedValue, `Incorrect Reference`]);
    } catch (error) {
      console.log(`validateReferenceValueOnList`);
      console.log(error);
      return false;
    }
  }

  public async validateEntityValueOnList(ExpectedValue: string, positionRow: number = 1) {
    try {
      let txtEntityValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]/td[count(//table/thead/tr/th[.="Entity"]/preceding-sibling::th)+1]//app-related-entities`);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.waitUntilElementLoaded(txtEntityValue);
      let ActualEntityValue = await this.driverService.getText(txtEntityValue)
      if (ActualEntityValue.includes(ExpectedValue) == true) {
        console.log(`Validate Entity field: passed`);
        return true;
      }
      else {
        console.log(`Validate Entity field failed`);
        return false;
      }
    } catch (error) {
      console.log(`validateEntityValueOnList`);
      console.log(error);
      return false;
    }
  }

  public async validateDueDateOnList(ExpectedValue: string, positionRow: number = 1) {
    try {
      let dtpDueDateValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]//td[contains(@class, "pgs-task-due-date") or contains(@class, "pgs-fnol-due-date")]//span`);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.waitUntilElementLoaded(dtpDueDateValue);
      let ActualDueDate = await (await this.driverService.getText(dtpDueDateValue));
      return await this.driverService.validateRecord(`Validate Due Date`, [ActualDueDate, ExpectedValue, `Incorrect Due Date`]);
    } catch (error) {
      console.log(`validateDueDateOnList`);
      console.log(error);
      return false;
    }
  }

  public async validatePriorityOnList(ExpectedValue: string, positionRow: number = 1) {
    try {
      let txtPriorityValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]//td[contains(@class, "pgs-fnol-priority")]//span`);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.waitUntilElementLoaded(txtPriorityValue);
      let ActualPriority = await this.driverService.getText(txtPriorityValue);
      return await this.driverService.validateRecord(`Validate Priority`, [ActualPriority, ExpectedValue, `Incorrect Priority!`]);
    } catch (error) {
      console.log(`validatePriorityOnList`);
      console.log(error);
      return false;
    }
  }

  public async validateAssigneeValueOnList(ExpectedValue: string, positionRow: number = 1) {
    try {
      let txtAssigneeValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]//td[contains(@class, "pgs-fnol-assignee")]//span`);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.waitUntilElementLoaded(txtAssigneeValue);
      let ActualAssignee = await this.driverService.getText(txtAssigneeValue);
      return await this.driverService.validateRecord(`Validate Assignee`, [ActualAssignee, ExpectedValue, `Incorrect Assignee!`]);
    } catch (error) {
      console.log(`validateAssigneeOnList`);
      console.log(error);
      return false;
    }
  }


  public async validateCreateDateValueOnList(ExpectedValue: string, positionRow: number = 1) {
    try {
      let txtCreateDateValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]//td[contains(@class, "pgs-fnol-created-date")]//span`);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.waitUntilElementLoaded(txtCreateDateValue);
      let ActualValue = await this.driverService.getText(txtCreateDateValue);

      if (ActualValue.localeCompare(ExpectedValue) !== 0) {
        if (Number(ExpectedValue.substring(14, 16)) - Number(ActualValue.substring(14, 16)) < 3) {
          ActualValue = ExpectedValue;
        }
      }
      return await this.driverService.validateRecord(`Validate Create Date Value`, [ActualValue, ExpectedValue, `Incorrect Create Date`]);
    } catch (error) {
      console.log(`validateCreateDateOnList`);
      console.log(error);
      return false;
    }
  }

  public async validateStatusValueOnList(ExpectedValue: string, positionRow: number = 1) {
    try {
      let txtStatusValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]//td[contains(@class, "pgs-fnol-status")]//span`);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.waitUntilElementLoaded(txtStatusValue);
      let ActualValue = await this.driverService.getText(txtStatusValue);
      return await this.driverService.validateRecord(`Validate Status`, [ActualValue, ExpectedValue, `Incorrect Status!`]);
    } catch (error) {
      console.log(`validateStatusValueOnList`);
      console.log(error);
      return false;
    }
  }


  public async openEditCaseFormByName(selectedCase: string): Promise<number> {
    try {
      await this.driverService.waitForSeconds(5000);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.waitUntilElementLoaded(this.lblCaseTitle);
      await this.driverService.pressTabCurrentElement();
      await this.driverService.pressTabCurrentElement();
      for (let i = 1; i <= 30; i++) {
        let lblCaseTitle = By.xpath(`(//app-edit-link-col/a)[${i}]`);
        if ((await this.driverService.isExisted(lblCaseTitle)) === false) {
          // logFailMessage(`Can't find case with name \"${selectedCase}\" into Case List`);
        } else {
          let nameCase = await this.driverService.getText(lblCaseTitle);
          if (nameCase.localeCompare(selectedCase) === 0) {
            let btnEdit = By.xpath(`(//*[@id='pgs-edit-fnol-act'])[${i}]`);
            await this.driverService.click(btnEdit);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return i;
          }
        }
      }
      logFailMessage(`Can't find FNOL with name \"${selectedCase}\" into FNOL List`);
      return 0;
    } catch (error) {
      console.log("pressEditByName");
      console.log(error);
      return 0;
    }
  }

  public async getReferenceValueOnList(positionRow: number = 1) {
    try {
      let txtReferenceValue = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//table//tr[${positionRow}]//td[contains(@class, "pgs-fnol-reference")]//span`);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      await this.driverService.waitUntilElementLoaded(txtReferenceValue);
      let ActualValue = await this.driverService.getText(txtReferenceValue);
      return ActualValue;
    } catch (error) {
      console.log(`getReferenceValueOnList`);
      console.log(error);
      return "";
    }
  }
}




