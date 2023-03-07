import { Before, Given, Then, When } from "@cucumber/cucumber";
import { GlobalBrowserWindowHandle } from "../../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalBrowserWindowHandle";
import { GlobalConfirmationForm } from "../../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalConfirmationForm";
import { GlobalPageObject } from "../../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { PendingPaymentList } from "../../../../../page-objects/back-office-portal/general/pending-payment/pending-payment-list/PendingPaymentList";
import { logFailTestcase } from "../../../../../shared/functions";
import { ICommonContext } from "../../../../../shared/interfaces";
import { UserProfileInfo } from "../../../../../shared/user-profile/UserProfileInfo";
import { getValueDataOfDataTestExecution, pushObjectToDataArrayWithUniqueKey } from "../../../../../storage-data/functions/data-test-execution";

const loader = require("csv-load-sync");
let globalPageObject: GlobalPageObject;
let pendingPaymentList: PendingPaymentList;
let globalConfirmationForm: GlobalConfirmationForm;
let globalBrowserWindowHandle: GlobalBrowserWindowHandle;


Before(async function () {
  const context: ICommonContext = this.context;
  pendingPaymentList = new PendingPaymentList(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
  globalConfirmationForm = new GlobalConfirmationForm(context.driverService);
  globalBrowserWindowHandle = new GlobalBrowserWindowHandle(context.driverService);
});

Given("User navigates to Pending Payment list", async () => {
  const temp = await globalPageObject.navigateToMainPendingPayment();
  logFailTestcase(temp, "Navigate to Account list failed!");
});

When("User selects {string} option at Pending Payment type", async (option) => {
  let temp = await pendingPaymentList.inputPendingPaymentType(option);
  logFailTestcase(temp, `Select "${option}" option at dropdown Pending Payment type failed!`);
  await globalPageObject.waitForProgressBarLoaded_v2();
});

When("User checks filter for {string} option on Pending Payment list", async (option) => {
  let temp = true;
  await globalPageObject.expandNumberOfItemMainList(50);
  const rowNumber = await globalPageObject.getNumberOfTotalRecordsMainTab();
  const numberTemp = rowNumber >= 50 ? 50 : rowNumber;
  switch (option) {
    case 'Payments that need my approval':
      {
        for (let i = 1; i <= numberTemp; i++) {
          temp = await pendingPaymentList.validateValueToBeApprovedBy(UserProfileInfo.getDisplayName(), i);
          logFailTestcase(temp, `"To Be Approved By" column at line ${i} falied!`);
        }
        break;
      }
    case 'All pending payments':
      {
        let toBeApprovedBy: string[] = [];
        for (let i = 1; i <= numberTemp; i++) {
          let name = await pendingPaymentList.getValueToBeApprovedBy(i);
          if (name) {
            toBeApprovedBy.push(name);
          }
          else {
            logFailTestcase(false, `"To Be Approved By" column at line ${i} has NO value!`);
          }
        }
        const allEqual = arr => arr.every(v => v === arr[0]);
        console.log(toBeApprovedBy);
        temp = !allEqual(toBeApprovedBy);
        logFailTestcase(temp, `"To Be Approved By" column should has many difference name!`);
        break;
      }
    default:
      break;
  }
});

When("User approves the first payment on Pending Payment list", async () => {
  const PaymentRef = await pendingPaymentList.getValuePaymentRef(1);
  logFailTestcase(PaymentRef.length > 0, `Get Payment Ref at first row failed!`);
  pushObjectToDataArrayWithUniqueKey("PaymentRef", PaymentRef);

  let temp = await pendingPaymentList.pressApproveButtonByRow(1);
  logFailTestcase(temp, `Press Approve button at first row failed!`);

  const confirmMessage = `Are you sure you want to approve the payment ${PaymentRef}?`;
  temp = await globalConfirmationForm.validateValueConfirmMessage(confirmMessage);
  logFailTestcase(temp, `Incorrect confirm message!`);

  temp = await globalPageObject.pressApproveForm();
  logFailTestcase(temp, `Press Approve button failed!`);
});

When("User opens first payment on Pending Payment list", async () => {
  let temp = await pendingPaymentList.openPaymentDetailByRow(1);
  logFailTestcase(temp, `Open first Payment failed!`);

  const url = await globalBrowserWindowHandle.getCurrentUrl();
  pushObjectToDataArrayWithUniqueKey("url", url);
});

Then("User doesn't find the approved payment on Pending Payment list", async () => {
  const PaymentRef = getValueDataOfDataTestExecution("PaymentRef");
  let temp = await pendingPaymentList.isPaymentExistedWithReference(PaymentRef);
  logFailTestcase(!temp, `Payment with Ref = ${PaymentRef} has NOT been removed from list!`);
});