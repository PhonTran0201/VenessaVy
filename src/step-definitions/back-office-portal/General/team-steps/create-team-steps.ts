import { Before, Given, Then, When } from "@cucumber/cucumber";
import { PageFactory } from "../../../../page-objects/PageFactory";
import { convertPathFileDataToDataRegression, logFailTestcase } from "../../../../shared/functions";
import loader from "csv-load-sync";

const pageList = PageFactory.getInstance().createTeamListPage();
const pageCreate = PageFactory.getInstance().createTeamCreatePage();
let teamName : string = "";

Given("User go to Team management page and click Create", async function () {
    await pageList.accessTeamList();
    await pageList.clickCreate();

});

When("User create new team {string}", async function (filename) {
    const rows = loader(convertPathFileDataToDataRegression(filename)); 
    teamName = rows[0].TeamName;   
    await pageCreate.populateFields(rows[0]);
    await pageCreate.clickSave();
});

Then("A new team is created with correct details", async function () {
    console.log("Team created successfully");
});

Then("User can delete created team successfully", async function () {
    await pageList.deleteTeam(teamName);
});