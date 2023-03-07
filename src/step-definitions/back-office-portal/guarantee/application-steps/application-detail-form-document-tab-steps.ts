import { Before, Then } from "@cucumber/cucumber";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { ApplicationDetailFormTabDetail } from "../../../../page-objects/back-office-portal/guarantee/application/application-detail-forms/ApplicationDetailFormTabDetail";
import { ApplicationDetailFormTabDocuments } from "../../../../page-objects/back-office-portal/guarantee/application/application-detail-forms/ApplicationDetailFormTabDocuments";
import { ApplicationDetailFormTabDetailCPGuaranteeAtlas } from "../../../../page-objects/customer-portal/guarantee/atlas/application/application-detail-forms/ApplicationDetailFormTabDetailCPGuaranteeAtlas";
import { ApplicationDetailFormTabDocumentsCPGuaranteeAtlas } from "../../../../page-objects/customer-portal/guarantee/atlas/application/application-detail-forms/ApplicationDetailFormTabDocumentsCPGuaranteeAtlas";
import { ApplicationDetailFormTabDetailCPGuaranteeHogs } from "../../../../page-objects/customer-portal/guarantee/hogs/application/application-detail-forms/ApplicationDetailFormTabDetailCPGuaranteeHogs";
import { ApplicationDetailFormTabDocumentsCPGuaranteeHogs } from "../../../../page-objects/customer-portal/guarantee/hogs/application/application-detail-forms/ApplicationDetailFormTabDocumentsCPGuaranteeHogs";
import { convertPathFileDataToDataRegression, getDate, logFailTestcase, logInfoMessage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { formatDateTime } from "../../../../shared/tenant-setting/tenant-setting";
import { scenarioTags } from "../../../../shared/variables";

const loader = require("csv-load-sync");

let applicationDetailFormTabDocuments: ApplicationDetailFormTabDocuments;
let applicationDetailFormTabDetail: ApplicationDetailFormTabDetail;
let globalPageObject: GlobalPageObject;

Before(async function () {
  if (scenarioTags.has("@CustomerPortalAtlas")) {
    const context: ICommonContext = this.context;
    applicationDetailFormTabDocuments = new ApplicationDetailFormTabDocumentsCPGuaranteeAtlas(context.driverService);
    applicationDetailFormTabDetail = new ApplicationDetailFormTabDetailCPGuaranteeAtlas(context.driverService);
  }
  else if (scenarioTags.has("@CustomerPortalHogs")) {
    const context: ICommonContext = this.context;
    applicationDetailFormTabDocuments = new ApplicationDetailFormTabDocumentsCPGuaranteeHogs(context.driverService);
    applicationDetailFormTabDetail = new ApplicationDetailFormTabDetailCPGuaranteeHogs(context.driverService);
  }
  else {
    const context: ICommonContext = this.context;
    applicationDetailFormTabDocuments = new ApplicationDetailFormTabDocuments(context.driverService);
    applicationDetailFormTabDetail = new ApplicationDetailFormTabDetail(context.driverService);
    globalPageObject = new GlobalPageObject(context.driverService);
  }
});

//#region Application Detail form tab Details First Column
Then("System shows correct information document list at Documents tab Application detail form {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  let i = 1;
  for (const row of rows) {
    logInfoMessage(`Checking document at line "${i}" in csv file...`);
    const DocumentName = row.DocumentName;
    const Type = row.Type;
    const UploadedBy = row.UploadedBy;
    let UploadedDate = formatDateTime(getDate());
    let temp = await applicationDetailFormTabDetail.pressDocumentsTab();
    logFailTestcase(temp, "Press Documents tab failed!");
    const index = await applicationDetailFormTabDocuments.getPositionRowDocumentByName(DocumentName);
    logFailTestcase(index !== -1);

    if (DocumentName) {
      let temp = await applicationDetailFormTabDocuments.validateDocumentNameOnTableByRow(DocumentName, index);
      logFailTestcase(temp);
    }
    if (Type) {
      let temp = await applicationDetailFormTabDocuments.validateTypeOnTableByRow(Type, index);
      logFailTestcase(temp);
    }
    if (UploadedBy) {
      let temp = await applicationDetailFormTabDocuments.validateUploadedByOnTableByRow(UploadedBy, index);
      logFailTestcase(temp);
    }
    if (UploadedDate) {
      if(scenarioTags.has("@AgentPortalHogs")){
        UploadedDate = getDate().replace(/\./g,'/');
      }
      let temp = await applicationDetailFormTabDocuments.validateUploadedDateOnTableByRow(UploadedDate, index);
      logFailTestcase(temp);
    }
    logInfoMessage(`\t\t => Passed!`);

    await globalPageObject.closeAllToastSuccess();
    temp = await applicationDetailFormTabDocuments.pressDownloadButtonDocumentByRow(index);
    logFailTestcase(temp, "\tDownload document failed!");
    logInfoMessage(`\t\t => Download document passed!`);
  }
});