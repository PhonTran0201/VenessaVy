import { Before, Given, When } from "@cucumber/cucumber";
import { LoginInterface } from "../../../../interfaces/general/login-logout/LoginInterface";
import { Login } from "../../../../page-objects/back-office-portal/general/login-logout/Login";
import { ValidateField } from "../../../../shared/classes";
import { logFailTestcase, logWarningMessage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { dataTestcase, dataTestExecution, scenarioTags } from "../../../../shared/variables";
import { getValueDataOfDataTestExecution, loadDataTestExecution, loadDataTestExecutionById, pushObjectToDataArrayWithUniqueKey, storeDataTestExecution } from "../../../../storage-data/functions/data-test-execution";

let login: LoginInterface;
Before(async function () {
    const context: ICommonContext = this.context;
    login = new Login(context.driverService);
});

// By default, DataTestExecution has id = id of Test execution on Jira
Given(`User loads default DataTestExecution`, async function () {
    const temp = loadDataTestExecution();
    logFailTestcase(temp);
    console.log(dataTestExecution);
});

Given(`User saves default DataTestExecution into json file`, async function () {
    try {
        dataTestExecution.id = dataTestExecution.id ? dataTestExecution.id : [...scenarioTags][0];
        storeDataTestExecution();
        console.log(dataTestExecution);
    } catch (error) {
        logWarningMessage("Saves default DataTestExecution into json file failed!");
        console.log(error);
        logFailTestcase(false);
    }
});

Given(`User loads DataTestExecution which has id {string}`, async function (id) {
    const temp = loadDataTestExecutionById(id);
    logFailTestcase(temp);
    console.log(dataTestExecution);
});

Given(`User saves DataTestExecution which has id {string} into json file`, async function (id) {
    try {
        dataTestExecution.id = id;
        storeDataTestExecution();
        console.log(dataTestExecution);
    } catch (error) {
        logWarningMessage("Saves DataTestExecution into json file failed!");
        console.log(error);
        logFailTestcase(false);
    }
});

Given("User navigates to url from DataTestExecution", async function () {
    const url = getValueDataOfDataTestExecution("url");
    let temp = await login.navigate(url);
    logFailTestcase(temp, `Navigate to url "${url}" failed!`);
});

When("User loads data from DataTestExecution to DataTestCase", async function () {
    const dataEx = dataTestExecution.data;
    console.log(dataEx);

    for (let i = 0; i < dataEx.length; i++) {
        let count = 0;
        for (let j = 0; j < dataTestcase.length; j++) {
            if (dataEx[i].key.localeCompare(dataTestcase[j].nameField) === 0) {
                dataTestcase[j].message[0] = dataEx[i].value;
                count++;
            }
        }
        if (count === 0) {
            dataTestcase.unshift(new ValidateField(dataEx[i].key, 0, true, [dataEx[i].value], []));
        }
    }
    console.log(dataTestcase);
});

When("System auto generates timestamp variables", async () => {
        let timeStamp1 = (Date.now()).toString();
        let timeStamp2 = (Date.now() + 10).toString();
        pushObjectToDataArrayWithUniqueKey("timeStamp1", timeStamp1);
        pushObjectToDataArrayWithUniqueKey("timeStamp2", timeStamp2);
});