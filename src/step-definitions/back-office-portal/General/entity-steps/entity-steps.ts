import { Before, Given, Then, When } from "@cucumber/cucumber";
import { EntityDetailsLeftSide } from "../../../../page-objects/back-office-portal/general/entity/entity-detail/left-side/EntityDetailsLeftSide";
import { EntityList } from "../../../../page-objects/back-office-portal/general/entity/entity-list/EntityList";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { convertPathFileDataToDataRegression, logFailTestcase } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";



const loader = require("csv-load-sync");
let globalPageObject: GlobalPageObject;
let entityList: EntityList;
let entityDetailsLeftSide: EntityDetailsLeftSide;

Before(async function () {
  const context: ICommonContext = this.context;
  globalPageObject = new GlobalPageObject(context.driverService);
  entityList = new EntityList(context.driverService);
  entityDetailsLeftSide = new EntityDetailsLeftSide(context.driverService);
});

Given("User navigates to Entity list", async function () {
  await globalPageObject.waitForProgressBarLoaded_v2(10);
  const temp = await globalPageObject.navigateToMainEntities();
  logFailTestcase(temp, "Navigates to Entity list failed!");
});
When("User checks {string} is one of the items under Primary Entities section", async function (entityName) {
  const temp = await entityList.checkEntityOnPrimaryEntitiesSectionExist(entityName);
  logFailTestcase(temp, `"${entityName}" is not found on Primary entities section!`);
});

When("User clicks {string} link-text on Entity list at Primary Entities section", async function (entityName) {
  const temp = await entityList.clickEntityOnPrimaryEntitiesSection(entityName);
  logFailTestcase(temp, `Can not click link-text of "${entityName}!`);
});

Then("User checks info in Summary pane of Entity Claim detail {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const Title = rows[0].Title;
  const Code = rows[0].Code;
  const Name = rows[0].Name;
  const Description = rows[0].Description;
  const Status = rows[0].Status;
  const AddOn = rows[0].AddOn;
  const DefaultSearchField = rows[0].DefaultSearchField;

  let temp = await entityDetailsLeftSide.checkTitleSummaryPane(Title);
  logFailTestcase(temp);

  temp = await entityDetailsLeftSide.checkCodeSummaryPane(Code);
  logFailTestcase(temp);

  temp = await entityDetailsLeftSide.checkInfoSummaryPane("Name", Name);
  logFailTestcase(temp);

  temp = await entityDetailsLeftSide.checkInfoSummaryPane("Description", Description);
  logFailTestcase(temp);

  // temp = await entity.checkInfoSummaryPane("Status", Status);
  // logFailTestcase(temp);

  // temp = await entity.checkInfoSummaryPane("Add-on", AddOn);
  // logFailTestcase(temp);

  // temp = await entity.checkInfoSummaryPane("Default search field", DefaultSearchField);
  // logFailTestcase(temp);
});