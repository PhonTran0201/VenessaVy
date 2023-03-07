import { When } from "@cucumber/cucumber";
import { DataRepo } from "../../../../../core/modals/DataRepo";
import { PageFactory } from "../../../../../page-objects/PageFactory";
import { logFailTestcase } from "../../../../../shared/functions";

let Pageform = PageFactory.getInstance().createAttachCustomerForm();

When(`User selects Existing Customer tab on Attach Customer form`, async () => {
    let temp = await Pageform.clickExistingCustomerTab();
    logFailTestcase(temp, `click Existing Customer Tab failed!`);
});
When(`User selects New Customer tab on Attach Customer form`, async () => {
    let temp = await Pageform.clickNewCustomerTab();
    logFailTestcase(temp, `click New Customer Tab failed!`);
});
When(`User fills the value to Account field and verifies Account field works properly {string}`, async (dataKey) => {
    const data = (await DataRepo.getInstance().loadData(dataKey))[0];
    const NIN = data.NIN;
    const Account = data.SelectedAccount || data.Name;
    let temp = true;

    temp = await Pageform.inputAccounttoSearchExistingCustomer(Account, Account);
    logFailTestcase(temp, 'input Account Name to Search Existing Customer failed!')

    if (NIN) {
        temp = await Pageform.clearAccountSearchField();
        logFailTestcase(temp, `clear Account Search Field failed!`);

        temp = await Pageform.inputAccounttoSearchExistingCustomer(NIN, Account);
        logFailTestcase(temp, 'input Account Name to Search Existing Customer failed!')
    }
});
