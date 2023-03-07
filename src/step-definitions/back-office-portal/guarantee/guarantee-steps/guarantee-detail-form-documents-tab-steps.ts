import { Before, Then } from "@cucumber/cucumber";
import { GuaranteeDetailFormDocuments } from "../../../../page-objects/back-office-portal/guarantee/guarantee/guarantee-forms/GuaranteeDetailFormDocuments";
import { GuaranteeDetailFormDocumentsCPGuaranteeAtlas } from "../../../../page-objects/customer-portal/guarantee/atlas/guarantee/guarantee-forms/GuaranteeDetailFormDocumentsCPGuaranteeAtlas";
import { GuaranteeDetailFormDocumentsCPGuaranteeHogs } from "../../../../page-objects/customer-portal/guarantee/hogs/guarantee/guarantee-forms/GuaranteeDetailFormDocumentsCPGuaranteeHogs";
import { convertPathFileDataToDataRegression, getDate, logFailTestcase, logInfoMessage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { formatDateTime } from "../../../../shared/tenant-setting/tenant-setting";
import { dataTestcase, scenarioTags } from "../../../../shared/variables";

const loader = require("csv-load-sync");

let guaranteeDetailFormDocuments: GuaranteeDetailFormDocuments;

Before(async function () {
  if (scenarioTags.has("@CustomerPortalAtlas")) {
    const context: ICommonContext = this.context;
    guaranteeDetailFormDocuments = new GuaranteeDetailFormDocumentsCPGuaranteeAtlas(context.driverService);
  }
  else if (scenarioTags.has("@CustomerPortalHogs")) {
    const context: ICommonContext = this.context;
    guaranteeDetailFormDocuments = new GuaranteeDetailFormDocumentsCPGuaranteeHogs(context.driverService);
  }
  else {
    const context: ICommonContext = this.context;
    guaranteeDetailFormDocuments = new GuaranteeDetailFormDocuments(context.driverService);
  }
});

//#region Application Detail form tab Details First Column
Then("System shows correct information at Documents tab Guarantee details form {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
 
  let GuaranteeNo = "GuaranteeNo";
  for (const element of dataTestcase) {
    if(element.nameField.localeCompare("Guarantee No") === 0){
      GuaranteeNo = element.message[0];
    }
  }
  const DocumentName = GuaranteeNo + "/0001_";//???????????????? Tên file actual = "HOGS-G015795/0001_Contract Commitment _2022.Apr.25.02.04.02"
  const DocumentType = row.DocumentType;
  const UploadedBy = row.UploadedBy;
  const UploadedDate = getDate(0);

  let temp = await guaranteeDetailFormDocuments.validateDocumentNameOnTableByRow(DocumentName, 1, true);
  logFailTestcase(temp);

  temp = await guaranteeDetailFormDocuments.validateTypeOnTableByRow(DocumentType);
  logFailTestcase(temp);

  temp = await guaranteeDetailFormDocuments.validateUploadedByOnTableByRow(UploadedBy);
  logFailTestcase(temp);

  temp = await guaranteeDetailFormDocuments.validateUploadedDateOnTableByRow(formatDateTime(UploadedDate));
  logFailTestcase(temp);
});
//#endregion