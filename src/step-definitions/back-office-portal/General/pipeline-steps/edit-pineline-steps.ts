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
let fileDataEdit: string = "";

Before(async function () {
  const context: ICommonContext = this.context;
  pipelineForm = new PipelineForm(context.driverService);
  pipelineList = new PipelineList(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
});

Given("User selects a pipeline from csv file {string}", async function (filename) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  fileDataEdit = filename;
  for (let obj of rows) {
    const selectedPipeline = obj.SelectedName;
    let temp = await pipelineList.pressEditByName(selectedPipeline);
    logFailTestcase(temp, `Can't press edit pipeline "${selectedPipeline}"!`);
  }
});

When("User edits valid pipeline data from csv file {string}",
  async function (filename) {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    fileDataEdit = filename;
    for (let obj of rows) {
      const name = obj.Name;
      const secondname = obj.SecondName;
      const probability = obj.Probability;

      //ACTIONS
      let temp = await pipelineForm.editPipeline(name, secondname, probability);
      logFailTestcase(temp, `Can't input data to edit pipeline!`);

      temp = await globalPageObject.pressSaveForm();
      logFailTestcase(temp, "Can't press Save!");

      temp = await globalPageObject.waitForProgressBarLoaded();
      logFailTestcase(temp, "Can't press Save!");
    }
  }
);

Then("System shows updated pipeline in the Pipeline list", async function () {
  const rows = loader(convertPathFileDataToDataRegression(fileDataEdit));
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