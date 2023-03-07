import { When } from "@cucumber/cucumber";
import { DataRepo } from "../../../../core/modals/DataRepo";
import { PageFactory } from "../../../../page-objects/PageFactory";
import { logFailTestcase } from "../../../../shared/functions";

const motorRegistryVehicleDetails = PageFactory.getInstance().createMotorRegistryVehicleDetails();
const globalPageObject = PageFactory.getInstance().createGlobalPageObjectPage();


When("User navigates to Motor Registry", async () => {
    let temp = await globalPageObject.navigateToMainMotorRegistry();
    logFailTestcase(temp, `Navigate to Motor registry failed!`);
});

When("User retrieves and verifies vehicle data on Vehicle Details tab at Motor Registry {string}", async function (dataKey) {
    const data = await DataRepo.getInstance().loadData(dataKey);
    let temp = true;
    const arrayKeys = Object.keys(data);

    const RegistrationNumber = "FakeNumber";
    temp = await motorRegistryVehicleDetails.inputRegistrationNumber(RegistrationNumber);
    logFailTestcase(temp, "Input Registration Number failed!");

    temp = await motorRegistryVehicleDetails.pressButtonGetDetails();
    logFailTestcase(temp, `Press Get Details button failed!`);

    for (const iterator of arrayKeys) {
        temp = await motorRegistryVehicleDetails.validateValueRetrieveVehicle(iterator, data[iterator]);
        logFailTestcase(temp);
    }
});
