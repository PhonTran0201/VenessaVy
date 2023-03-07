import { Before, Then, When } from "@cucumber/cucumber";
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

When(
  "User clicks Delete button and confirm the deletion group from csv file {string}",
  async (filename: string) => {
    try {
      const rows = loader(convertPathFileDataToDataRegression(filename));
      fileDataCreate = filename;
      for (let obj of rows) {
        const deleteGroup = obj.Name;
        await targetGroup.pressDeleteByName(deleteGroup);
        //ACTIONS
        await globalPageObject.pressYesForm();
      }
    } catch (error) {
      //console.log("When: User updates a user from precondition steps from csv file");
      console.log(error);
    }
  }
);

Then("The group is no longer found in grid", async function () {
  const rows = loader(convertPathFileDataToDataRegression(fileDataCreate));
  let len = rows.length;

  for (let i = len - 1, j = 1; i >= 0; i--, j++) {
    const name = rows[i].Name;
    const type = rows[i].Type;

    await targetGroup.assertDeleteGroup(
      j, //position of row want to validate
      name,
      type
    );
  }
});
