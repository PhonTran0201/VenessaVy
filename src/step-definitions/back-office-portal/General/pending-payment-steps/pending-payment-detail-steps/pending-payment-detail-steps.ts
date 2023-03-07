import { Before, Given } from "@cucumber/cucumber";
import { GlobalBrowserWindowHandle } from "../../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalBrowserWindowHandle";
import { GlobalPageObject } from "../../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { PendingPaymentDetail } from "../../../../../page-objects/back-office-portal/general/pending-payment/pending-payment-detail/PendingPaymetDetail";
import { getCurrentDateTime, logFailTestcase } from "../../../../../shared/functions";
import { ICommonContext } from "../../../../../shared/interfaces";
import { formatDateTime } from "../../../../../shared/tenant-setting/tenant-setting";
import { UserProfileInfo } from "../../../../../shared/user-profile/UserProfileInfo";

const loader = require("csv-load-sync");
let globalPageObject: GlobalPageObject;
let pendingPaymentDetail: PendingPaymentDetail;
let globalBrowserWindowHandle: GlobalBrowserWindowHandle;


Before(async function () {
    const context: ICommonContext = this.context;
    pendingPaymentDetail = new PendingPaymentDetail(context.driverService);
    globalPageObject = new GlobalPageObject(context.driverService);
    globalBrowserWindowHandle = new GlobalBrowserWindowHandle(context.driverService);
});

Given("User verifies detail of the approved payment", async () => {
    await globalBrowserWindowHandle.refreshPage();
    let temp = true;
    temp = await pendingPaymentDetail.validateValueStatus("Approved");
    logFailTestcase(temp, `Incorrect status!`);

    const ApprovedDate = formatDateTime((getCurrentDateTime().split(" "))[0]);
    temp = await pendingPaymentDetail.validateValueApprovedDate(ApprovedDate);
    logFailTestcase(temp, `Incorrect Approved Date`);

    temp = await pendingPaymentDetail.validateValueApprover(UserProfileInfo.getDisplayName());
    logFailTestcase(temp, `Incorrect Approver`);

    // 3 button will be hiden after approve: Hold, Approve, Reject
    temp = await globalPageObject.pressHoldTab();
    logFailTestcase(!temp, `"Hold" button should be hiden after approve!`);

    temp = await globalPageObject.pressApproveTab();
    logFailTestcase(!temp, `"Approve" button should be hiden after approve!`);

    temp = await globalPageObject.pressRejectTab();
    logFailTestcase(!temp, `"Reject" button should be hiden after approve!`);
});