import { Before, Then, When } from "@cucumber/cucumber";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { GlobalPeripherals } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPeripherals";
import { PipelineList } from "../../../../page-objects/back-office-portal/general/sales-distribution/pipeline/pipeline-list/PipelineList";
import { PageFactory } from "../../../../page-objects/PageFactory";
import { convertPathFileDataToDataRegression, logFailTestcase } from '../../../../shared/functions';
import { ICommonContext } from "../../../../shared/interfaces";


const loader = require("csv-load-sync");

let pipelineList: PipelineList;
let globalPageObject: GlobalPageObject;
let globalPeripherals: GlobalPeripherals;
let fileDataEdit: string = "";
const globalConfirmationForm = PageFactory.getInstance().createGlobalConfirmationForm();

Before(async function () {
  const context: ICommonContext = this.context;
  pipelineList = new PipelineList(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
  globalPeripherals = new GlobalPeripherals(context.driverService);
});

When("User deletes a pipeline from csv file {string}",
  async (filename: string) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    fileDataEdit = filename;
    await pipelineList.reloadTable();
    for (let obj of rows) {
      const deletePipeline = obj.Name;
      let temp = await pipelineList.pressDeleteByName(deletePipeline);
      logFailTestcase(temp, `Can't delete pipeline "${deletePipeline}"`);
      //ACTIONS
      temp = await globalPageObject.pressYesForm();
      logFailTestcase(temp, `Can't press Yes button to confirm delete piline!`);
    }
  }
);

When("User deletes multiple pipelines", async () => {
    await pipelineList.reloadTable();
      for(let i = 1; i <= 10; i++){
        await pipelineList.pressDeleteByRow(i);
        await globalPageObject.pressYesForm(); 
    }
});

Then("System does not show this pipeline in the Pipeline list", async function () {
  await globalPageObject.waitForSeconds(5000);
  const rows = loader(convertPathFileDataToDataRegression(fileDataEdit));
  let len = rows.length;
  let temp = true;

  for (let i = len - 1, j = 1; i >= 0; i--, j++) {
    const name = rows[i].Name;

    temp = await pipelineList.assertDeletePipeline(name);
    logFailTestcase(temp, `Can't delete pipeline "${name}"`);
  }
});


Then("User deletes pipeline from csv file {string}",
  async (filename: string) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    fileDataEdit = filename;
    await pipelineList.reloadTable();
    for (let obj of rows) {
      const deletePipeline = obj.Name;
      let temp = await pipelineList.pressDeleteByName(deletePipeline);
      logFailTestcase(temp, `Can't delete pipeline "${deletePipeline}"`);
      //ACTIONS
      temp = await globalPageObject.pressYesForm();
      logFailTestcase(temp, `Can't press Yes button to confirm delete piline!`);
    }
});

When("User deletes a pipeline",async () => {
  await globalPageObject.waitForProgressBarLoaded_v2(100);

  const Name = await pipelineList.getNameByRow();
  logFailTestcase(Name.length > 0, `Get Product failed!`);

  await globalPeripherals.pressTabCurrentElement();

  let temp = await pipelineList.pressDeleteByRow();
  logFailTestcase(temp, `Press Delete button at row 1 failed!`);

  temp = await globalConfirmationForm.validateValueConfirmMessage("Are you sure you want to delete this item?");
  logFailTestcase(temp, `Incorrect Message confirmation!`);

  const numberRecordBefore = await globalPageObject.getNumberOfTotalRecordsMainTab();
  logFailTestcase(numberRecordBefore >= 0, `Get Number Commission failed!`);

  temp = await globalPageObject.pressYesForm();
  logFailTestcase(temp, `Press Yes button failed!`);

  await globalPageObject.waitForProgressBarLoaded_v2();
  await globalPageObject.reloadTable();
  
  const numberRecordAfter = await globalPageObject.getNumberOfTotalRecordsMainTab();
  logFailTestcase(numberRecordAfter >= 0, `Get Number Commission failed!`);

  logFailTestcase(numberRecordBefore - numberRecordAfter === 1, `Number of record commission has NOT changed!`);

  let temp1 = await pipelineList.validateValueNameByRow(Name);

  logFailTestcase(!temp1, `Pipeline "${Name}" has NOT been deleted`);
});
