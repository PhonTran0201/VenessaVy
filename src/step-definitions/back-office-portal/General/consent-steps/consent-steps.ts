import { Before, Given, When } from "@cucumber/cucumber";
import { AccountDetailsLeftSide } from "../../../../page-objects/back-office-portal/general/account/account-details/left-side/AccountDetailsLeftSide";
import { ConsentForm } from "../../../../page-objects/back-office-portal/general/account/account-details/left-side/ConsentForn";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { convertPathFileDataToDataRegression, getCurrentDateTime, logFailTestcase, logInfoMessage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { UserProfileInfo } from "../../../../shared/user-profile/UserProfileInfo";

const loader = require("csv-load-sync");

let globalPageObject: GlobalPageObject;
let accountDetailsLeftSide: AccountDetailsLeftSide;
let consentForm: ConsentForm;
let expectedDateTime;


Before(async function () {
    const context: ICommonContext = this.context;
    globalPageObject = new GlobalPageObject(context.driverService);
    accountDetailsLeftSide = new AccountDetailsLeftSide(context.driverService);
    consentForm = new ConsentForm(context.driverService);

});

Given("User clicks on Consents button in account detail", async () => {
    await globalPageObject.waitForSeconds(4000);
    let temp = await accountDetailsLeftSide.clickConsentsButton()
    logFailTestcase(temp, "clicks on Consents button in account detail failed!");
});

Given("User verifies all consent information on Consents pop-up {string}", async (filename) => {
    await globalPageObject.waitForSeconds(2000);
    const rows = loader(convertPathFileDataToDataRegression(filename));
    let temp = true;
    let count = 0;
    for (let i = 0; i < rows.length; i++) {
        logInfoMessage(`verify risk consent box on line ${i + 1}...`);
        const ConsentName = rows[i].ConsentName;
        const isChecked = rows[i].isChecked;
        let displayUserName = UserProfileInfo.getDisplayName();
        if (ConsentName && isChecked.localeCompare("Yes") === 0) {
            temp = await consentForm.validateConsentsCheckedOnConsentsForm(ConsentName);
            logFailTestcase(temp, `Consent check box at line ${i + 1} is 'Yes' but got 'No'!`);
            count++;
        } else if (ConsentName && isChecked.localeCompare("No") === 0) {
            temp = await consentForm.validateConsentsCheckedOnConsentsForm(ConsentName);
            logFailTestcase(!temp, `Consent check box at line ${i + 1} is 'No' but got 'Yes'!`);
        }
        if (expectedDateTime) {
            temp = await consentForm.validateLastUpdatedOnConsentsForm(ConsentName, expectedDateTime);
            logFailTestcase(temp, `Incorrect Last updated value  at line ${i + 1}!`);
        }
        if (displayUserName) {
            temp = await consentForm.validateUpdatedByOnConsentsForm(ConsentName, displayUserName);
            logFailTestcase(temp, `Consent was updated by ${displayUserName} but system shown incorrectly! `);
        }

    }
    logInfoMessage("validate check-all checkbox in consent form..");
    if (count == rows.length) {
        temp = await consentForm.validateConsentsAllCheckedOnConsentsForm();
        logFailTestcase(temp, `Consent check-all box is 'tick' but got 'untick'!`);
    } else {
        temp = await consentForm.validateConsentsAllCheckedOnConsentsForm();
        logFailTestcase(!temp, `Consent check-all box is 'untick' but got 'tick'!`);
    }
});
When("User Check on consent check boxes {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    let temp = true;
    for (let i = 0; i < rows.length; i++) {
        const ConsentName = rows[i].ConsentName;
        const isChecked = rows[i].isChecked;
        if (isChecked && isChecked.localeCompare("Yes") === 0) {
            logInfoMessage(`tick consent check box on line ${i + 1}...`);
            if (!await consentForm.validateConsentsCheckedOnConsentsForm(ConsentName)) {
                expectedDateTime = getCurrentDateTime();
                temp = await consentForm.tickConsentOnConsentForm(ConsentName);
                logFailTestcase(temp, `ticks check box at line ${i + 1} is incorrect!`);
            }
        }
        else if (isChecked && isChecked.localeCompare("No") === 0) {
            logInfoMessage(`tick consent check box on line ${i + 1}...`);
            if (await consentForm.validateConsentsCheckedOnConsentsForm(ConsentName)) {
                expectedDateTime = getCurrentDateTime();
                temp = await consentForm.tickConsentOnConsentForm(ConsentName);
                logFailTestcase(temp, `ticks check box at line ${i + 1} is incorrect!`);
            }
        }

    }
});


