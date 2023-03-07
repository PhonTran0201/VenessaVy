import { Before, Given, Then, When } from "@cucumber/cucumber";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { PipelineForm } from "../../../../page-objects/back-office-portal/general/sales-distribution/pipeline/pipeline-forms/PipelineForm";
import { PipelineList } from "../../../../page-objects/back-office-portal/general/sales-distribution/pipeline/pipeline-list/PipelineList";
import { convertPathFileDataToDataRegression, logFailTestcase, logInfoMessage } from '../../../../shared/functions';
import { ICommonContext } from "../../../../shared/interfaces";

const loader = require("csv-load-sync");

let pipelineForm: PipelineForm;
let pipelineList: PipelineList;
let globalPageObject: GlobalPageObject;
let fileDataCreate: string = "";

Before(async function () {
  const context: ICommonContext = this.context;
  globalPageObject = new GlobalPageObject(context.driverService);
  pipelineForm = new PipelineForm(context.driverService);
  pipelineList = new PipelineList(context.driverService);
});

Given("User navigates to Pipeline list", async function () {
  // await globalPageObject.waitForProgressBarLoaded_v2();
  let temp = await globalPageObject.navigateToMainPipelineManagement();
  logFailTestcase(temp, "Navigates to Pipeline list failed!");
});

When(
  "User inputs valid pipeline data from csv file {string}",
  async function (filename) {
    //CONVERT DATA
    const rows = loader(convertPathFileDataToDataRegression(filename));
    fileDataCreate = filename;

    for (let obj of rows) {
      let temp = await pipelineList.pressCreatePipeline();
      logFailTestcase(temp, "Can't open create new pipeline form!");
      await globalPageObject.waitForProgressBarLoaded_v2();
      const name = obj.Name;
      const secondname = obj.SecondName;
      const probability = obj.Probability;

      //ACTIONS
      temp = await pipelineForm.inputPipeline(name, secondname, probability);
      logFailTestcase(temp, "Can't input data to pipeline form!");

      temp = await globalPageObject.pressSaveForm();
      logFailTestcase(temp, "Can't press Save pipeline!");

      temp = await globalPageObject.waitForProgressBarLoaded();
      logFailTestcase(temp, "Can't press Save pipeline!");
    }

  });

Then("System shows new pipeline in the Pipeline list", async function () {
  const rows = loader(convertPathFileDataToDataRegression(fileDataCreate));
  let len = rows.length;
  logInfoMessage("Wait for loading 3s...");
  await globalPageObject.reloadTable(3000);
  for (let i = len - 1, j = 1; i >= 0; i--, j++) {
    const name = rows[i].Name;

    await pipelineList.assertPipeline(
      j, //position of row want to validate
      name,
    );
  }
});
