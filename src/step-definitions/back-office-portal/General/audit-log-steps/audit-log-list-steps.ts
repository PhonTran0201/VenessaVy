import { Before, Given, Then } from "@cucumber/cucumber";
import { AuditLogList } from "../../../../page-objects/back-office-portal/general/audit-logs/audit-log-list/AuditLogList";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { convertPathFileDataToDataRegression, getCurrentDateTime, logFailTestcase, logInfoMessage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { dataTestcase } from "../../../../shared/variables";
import { getDataTestCaseObjectByNameField } from "../../../../storage-data/functions/data-test-case";


const loader = require("csv-load-sync");
let auditLogList: AuditLogList;
let globalPageObject: GlobalPageObject;


Before(async function () {
  const context: ICommonContext = this.context;
  auditLogList = new AuditLogList(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
});

Given("User navigates to Audit logs list", async function () {
  const temp = await globalPageObject.navigateToMainAuditLog();
  logFailTestcase(temp, "User navigates to Audit logs list failed!");
});

Then("System shows event on Audit logs list {string}", async function (filename) {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const row = rows[0];

  const dateTime = getCurrentDateTime().substring(0, 10);
  logInfoMessage(dateTime);
  const entity = row.Entity;
  const event = row.Event;
  const idClaim = getDataTestCaseObjectByNameField("Claim ReferenceId")?.index;

  const data = `${entity} ${idClaim} ${event.toLowerCase()}`;

  const temp = await auditLogList.checkEventExist(dateTime, "", entity, event, data);
  logFailTestcase(temp, `Event ${data} is not found on Audit log list!`);
});