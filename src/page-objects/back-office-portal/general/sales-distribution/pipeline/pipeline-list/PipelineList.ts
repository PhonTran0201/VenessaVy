import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../../core/BasePage";
import { logInfoMessage, logSuccessMessage, logWarningMessage, reloadTable, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../../shared/functions";

export class PipelineList extends BasePage {

  private newPipelineBtn = By.id("create-pipeline");
  private lblName = By.xpath("//tbody/tr[1]/td[contains(@class,'pgs-pipeline-activity-name')]//*[self::*[text()]]");

  private btnPipeline = By.xpath(`//app-sale-setting//*[@title='Pipeline']`);
  private btnFieldAndLayouts = By.xpath(`//app-sale-setting//*[@title='Fields & Layouts']`);
  private btnCommission = By.xpath(`//app-sale-setting//*[@title='Commission']`);
  private btnImporters = By.xpath(`//app-sale-setting//*[@title='Importers']`);

  //#region Button on header
  public async pressPipelineTab() {
    try {
      const element = await this.getFieldType(this.btnPipeline);
      await element.click();
      return true;
    } catch (error) {
      console.log('pressPipelineTab');
      console.log(error);
      return false;
    }
  }

  public async pressFieldsAndLayoutsTab() {
    try {
      const element = await this.getFieldType(this.btnFieldAndLayouts);
      await element.click();
      return true;
    } catch (error) {
      console.log('pressFieldsAndLayoutsTab');
      console.log(error);
      return false;
    }
  }

  public async pressCommissionTab() {
    try {
      const element = await this.getFieldType(this.btnCommission);
      await element.click();
      return true;
    } catch (error) {
      console.log('pressCommissionTab');
      console.log(error);
      return false;
    }
  }

  public async pressImporterTab() {
    try {
      const element = await this.getFieldType(this.btnImporters);
      await element.click();
      return true;
    } catch (error) {
      console.log('pressImporterTab');
      console.log(error);
      return false;
    }
  }
  //#endregion

  public async pressCreatePipeline() {
    try {
      await this.driverService.waitUntilElementLoaded(this.newPipelineBtn);
      await this.driverService.click(this.newPipelineBtn);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async reloadTable() {
    try {
      logInfoMessage("Wait for loading 3s...");
      await this.driverService.waitForSeconds(3000);
      await reloadTable(this.driverService);
    } catch (error) {
      console.log(error);
    }
  }

  public async assertPipeline(positionRow: number = 1, name: string) {
    let actualName: string = "";

    try {
      let lblName = By.xpath(`//tbody/tr[${positionRow}]/td[contains(@class,'pgs-pipeline-activity-name')]//*[self::*[text()]]`);
      await this.driverService.waitUntilElementLoaded(lblName);
      actualName = await this.driverService.getText(lblName);
    } catch (error) {
      console.log(error);
    }
    let nameTestcase: string = "";
    await this.driverService.validateTestCase(
      nameTestcase,
      [actualName, name, "Assert at Name: Incorrect Name"]
    );
  }

  public async pressEditByName(selectedPipeline: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      for (let i = 1; i <= 30; i++) {
        let lblName = By.xpath(`//tbody/tr[${i}]/td[contains(@class,'pgs-pipeline-activity-name')]//*[self::*[text()]]`);
        if ((await this.driverService.isExisted(lblName)) === false) {
          // logInfoMessage(`Can't find pipeline with name \"${selectedPipeline}\" in Pipeline List`);
        } else {
          let nameRole = await this.driverService.getText(lblName);
          if (nameRole.localeCompare(selectedPipeline) === 0) {
            let btnEdit = By.xpath(`//tbody/tr[${i}]/td[contains(@class,'pgs-pipeline-action')]//*[contains(@class,'fa-edit')]`);
            await this.driverService.click(btnEdit);
            return true;
          }
        }
      }
      logWarningMessage(`Can't find pipeline with name \"${selectedPipeline}\" in Pipeline List`);
      return false;
    } catch (error) {
      console.log("pressEditByName");
      console.log(error);
      return false;
    }
  }

  public async pressDeleteByName(deletePipeline: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      for (let i = 1; i <= 30; i++) {
        let pipeLineName = By.xpath(`//tbody/tr[${i}]/td[contains(@class,'pgs-pipeline-activity-name')]//*[self::*[text()]]`);
        if ((await this.driverService.isExisted(pipeLineName)) === false) {
          // logInfoMessage(`Can't find the pipeline with name \"${deletePipeline}\" in Pipeline List`);
        } else {
          let nameRole = await this.driverService.getText(pipeLineName);
          if (nameRole.localeCompare(deletePipeline) === 0) {
            let btnDelete = By.xpath(
              `//tbody/tr[${i}]/td[contains(@class,'pgs-pipeline-action')]//*[contains(@class,'fa-trash')]`
            );
            await this.driverService.click(btnDelete);
            return true;
          }
        }
      }
      logWarningMessage(`Can't find pipeline with name \"${deletePipeline}\" in Pipeline List`);
      return false;
    } catch (error) {
      console.log("pressDeleteByName");
      console.log(error);
      return false;
    }
  }

  public async pressDeleteByRow(positionRow: number = 1) {
    try {
      let btnDelete = By.xpath(`//tbody/tr[${positionRow}]/td[contains(@class,'pgs-pipeline-action')]//*[contains(@class,'fa-trash')]`);
      await this.driverService.waitUntilElementVisible(btnDelete);
      await this.driverService.mouseHover(btnDelete);
      await this.driverService.click(btnDelete);
      return true;
    } catch (error) {
      console.log("pressDeleteByRow");
      console.log(error);
      return false;
    }
  }

  public async getNameByRow(positionRow: number = 1) {
    try {
      let lblName = By.xpath(`//tbody/tr[${positionRow}]/td[contains(@class,'pgs-pipeline-activity-name')]//*[text()]`);
      await this.driverService.waitUntilElementVisible(lblName);
      const actualName = await this.driverService.getText(lblName);
      return actualName;
    } catch (error) {
      console.log("getNameByRow");
      console.log(error);
      return "";
    }
  }

  public async assertDeletePipeline(name: string) {
    let lblName = By.xpath(`//tbody/tr/td[contains(@class,'pgs-pipeline-activity-name')]//*[contains(text(),'${name}')]`);
    try {
      await reloadTable(this.driverService);
      if (await this.driverService.isExisted(lblName)) {
        logWarningMessage(`Pipeline '${name}' still shown in Pipeline List!`);
        return false;
      } else {
        logSuccessMessage("\tDelete pipeline passed");
        return true;
      }
    } catch (error) {
      console.error("Assert Assign pipeline");
      console.error(error);
      return false;
    }
  }

  public async validateValueNameByRow(expectedValue: string, positionRow = 1) {
    try {
        const lbl = By.xpath(`//tbody/tr[${positionRow}]/td[contains(@class,'pgs-pipeline-activity-name')]//*[text()]`);
        const element = await this.getFieldType(lbl);
        const actualValue = await element.getValue();
        return await this.driverService.validateRecord('Validate Name!',
            [actualValue, expectedValue, 'Incorrect Name!']);
    } catch (error) {
        console.log('validateValueNameByRow');
        console.log(error);
        return false;
    }
}
}