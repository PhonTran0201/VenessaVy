import { Before, Given, Then, When } from "@cucumber/cucumber";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { TargetGroup } from "../../../../page-objects/back-office-portal/general/target-group/TargetGroup";
import { convertPathFileDataToDataRegression } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";

const loader = require("csv-load-sync");
let fileDataCreate: string = "";
let targetGroup: TargetGroup;
let globalPageObject: GlobalPageObject;

Before(async function () {
  const context: ICommonContext = this.context;
  targetGroup = new TargetGroup(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
});

Given("User navigates to Target Group list", async function () {
  await targetGroup.navigateToTargetGroup();
});

When(
  "User inputs valid target group data from csv file {string}",
  async function (filename) {
    try {
      const rows = loader(convertPathFileDataToDataRegression(filename));
      fileDataCreate = filename;

      for (let obj of rows) {
        await targetGroup.pressNewTargetGroup();
        const name = obj.Name;
        const type = obj.Type;

        //ACTIONS
        await targetGroup.inputNewTargetGroup(name, type);

        await globalPageObject.pressSaveForm();
      }
    } catch (error) {
      console.log(error);
    }
  });

Then("System shows new target group in the Target Group list", async function () {
  const rows = loader(convertPathFileDataToDataRegression(fileDataCreate));
  let len = rows.length;

  for (let i = len - 1, j = 1; i >= 0; i--, j++) {
    const name = rows[i].Name;
    const type = rows[i].Type;

    await targetGroup.assertNewTarget(
      j, //position of row want to validate
      name,
      type
    );
  }
});
