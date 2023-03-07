import { Given, When } from "@cucumber/cucumber";
import { DataRepo } from "../../../../core/modals/DataRepo";
import { SeleniumWebDriverService } from "../../../../core/selenium-webdriver.service";
import { AppEntityWidgets } from "../../../../page-objects/back-office-portal/general/app-entity-widgets/AppEntityWidgets";
import { PageFactory } from "../../../../page-objects/PageFactory";
import { logFailTestcase, logWarningTestcase } from "../../../../shared/functions";
import { getValueDataOfDataTestExecution, pushObjectToDataArrayWithUniqueKey } from "../../../../storage-data/functions/data-test-execution";

const globalPageObject = PageFactory.getInstance().createGlobalPageObjectPage();
const householdList = PageFactory.getInstance().createHouseholdList();
const accountForm = PageFactory.getInstance().createAccountForm();
const accountDetailsLeftSide = PageFactory.getInstance().createAccountDetailsLeftSidePage();
const addMemberHouseholdForm = PageFactory.getInstance().createAddMemberHouseholdForm();
const globalConfirmationForm = PageFactory.getInstance().createGlobalConfirmationForm();


const loader = require('csv-load-sync');

Given("User navigates to Household list", async () => {
    let temp = await globalPageObject.navigateToMainHouseholdsList();
    logFailTestcase(temp, `Navigate to Households list failed!`);
});

When("User verifies household list {string}", async (filename) => {
    const rows = await DataRepo.getInstance().loadData(filename);
    const timeStamp1 = getValueDataOfDataTestExecution("timeStamp1");

    await globalPageObject.reloadTable(3000);
    const Address = rows[0].Address + timeStamp1;
    const Postcode = rows[0].Postcode;
    const City = rows[0].City;
    const Country = rows[0].Country;

    const address = `${Address}, ${Postcode}, ${City}, ${Country}`;
    let temp = await householdList.validateValueAddressByRow(address);
    logFailTestcase(temp, `Incorrect Address of the first Suggestion`);

    for (let i = 0; i < rows.length; i++) {
        const member = `${rows[i].FirstName} ${rows[i].LastName}`;
        temp = await householdList.checkMemberExistByRow(member, 1);
        logFailTestcase(temp, `Not Found Member ${member} at row 1`);
    }
    if (rows.length >= 3) {
        for (let i = 1; i <= rows.length; i++) {
            temp = await householdList.checkRemoveButtonExistByRow(1, i);
            logFailTestcase(temp, `There are ${rows.length} accounts but not found Remove button!`);
        }
    }
    else {
        for (let i = 1; i <= 2; i++) {
            temp = await householdList.checkRemoveButtonExistByRow(1, i);
            logFailTestcase(!temp, `There are ${rows.length} accounts, The Remove button should be hidden!`);
        }
    }
});

When("User updates address of account from household list {string}", async (filename) => {
    const rows = await DataRepo.getInstance().loadData(filename);
    const timeStamp1 = getValueDataOfDataTestExecution("timeStamp1");


    const member = `${rows[0].FirstName} ${rows[0].LastName}`;
    const address = `${rows[0].Address + timeStamp1}, ${rows[0].Postcode}, ${rows[0].City}, ${rows[0].Country}`;
    const indexHousehold = await householdList.getIndexHouseholdByAddress(address);
    logFailTestcase(indexHousehold >= 0, `Not found any household with address "${address}"`);

    let temp = await householdList.openMemberByRow(member, indexHousehold);
    logFailTestcase(temp, `Open Member ${member} of address "${address}" failed!`);

    temp = await accountDetailsLeftSide.clickEditAccountButton();
    logFailTestcase(temp, "Clicks on Edit button in account detail failed!");



    const newAddress = rows[0].NewAddress + timeStamp1;
    const newPostcode = rows[0].NewPostcode;
    const newCity = rows[0].NewCity;
    const newCountry = rows[0].NewCountry;


    temp = true;
    //ACTIONS

    if (newAddress) {
        temp = await accountForm.inputAddressBasicInformationAccountPersonForm(newAddress);
        logFailTestcase(temp, "inputAddressBasicInformationAccountPersonForm fails");
    }

    if (newPostcode) {
        temp = await accountForm.inputPostcodeBasicInformationAccountPersonForm(newPostcode);
        logFailTestcase(temp, "inputPostcodeBasicInformationAccountPersonForm fails");
    }

    if (newCity) {
        temp = await accountForm.inputCityBasicInformationAccountPersonForm(newCity);
        logFailTestcase(temp, "inputCityBasicInformationAccountPersonForm fails");
    }

    if (newCountry) {
        temp = await accountForm.inputCountryBasicInformationAccountPersonForm(newCountry);
        logFailTestcase(temp, "inputCountryBasicInformationAccountPersonForm fails");
    }

    temp = await globalPageObject.pressSaveForm();
    logFailTestcase(temp, `Press save button failed!`);
});

When("User add member to househouse {string}", async (filename) => {
    const rows = await DataRepo.getInstance().loadData(filename);


    const customerName = rows[0].CustomerName;

    let temp = await householdList.pressAddMemberButtonByRow(1);
    logFailTestcase(temp, `Press add Member at row 1 failed!`);

    temp = await addMemberHouseholdForm.inputCustomerName(customerName);
    logFailTestcase(temp, `Input Customer name failed!`);

    await globalPageObject.closeAllToastSuccess();
    temp = await globalPageObject.pressAddForm();
    logFailTestcase(temp, `Press Add button failed!`);

    await globalPageObject.waitForProgressBarLoaded_v2();
    const message = "Member added successfully!";
    temp = await globalPageObject.checkToastSuccessExistWithMessage(message);
    logFailTestcase(temp, `Not found toast "${message}"`);
    await globalPageObject.reloadTable(2000);


    const member = customerName;
    temp = await householdList.checkMemberExistByRow(member, 1);
    logFailTestcase(temp, `Not Found Member ${member} at row 1`);
});

When("User add multiple members to househouse {string}", async (filename) => {
    const rows = await DataRepo.getInstance().loadData(filename);
    await globalPageObject.waitForProgressBarLoaded_v2(2000);
    await globalPageObject.reloadTable();
    for (const row of rows) {
        const member = `${row.FirstName} ${row.LastName}`;
        const address = `${rows[0].Address + getValueDataOfDataTestExecution("timeStamp1")}, ${rows[0].Postcode}, ${rows[0].City}, ${rows[0].Country}`;

        let temp = await householdList.pressAddMemberButtonByAddress(address);
        logFailTestcase(temp, `Press add Member at row 1 failed!`);

        temp = await addMemberHouseholdForm.inputCustomerName(member);
        logFailTestcase(temp, `Input Customer name failed!`);

        await globalPageObject.closeAllToastSuccess();
        temp = await globalPageObject.pressAddForm();
        logFailTestcase(temp, `Press Add button failed!`);

        await globalPageObject.waitForProgressBarLoaded_v2();
    }
    await globalPageObject.reloadTable(2000);
});

When("User checks Remove button of each member on Household list", async () => {
    const totalNumberOfRecord = await globalPageObject.getNumberOfTotalRecordsMainTab();
    const len = totalNumberOfRecord <= 10 ? totalNumberOfRecord : 10;

    for (let i = 1; i <= len; i++) {
        const numberMember = await householdList.getNumberOfMemberByRow(i);
        logFailTestcase(numberMember >= 0, `Get Number Member at row "${i}" failed!`);

        const numberRemoveButton = await householdList.getNumberOfRemoveButtonByRow(i);
        logFailTestcase(numberMember >= 0, `Get Number Remove button at row "${i}" failed!`);

        if (numberMember <= 2 && numberRemoveButton > 0) {
            logFailTestcase(false, `It shouldn't has Remove button when number of member <= 2 at row "${i}"`);
        }
        if (numberMember >= 3 && numberRemoveButton <= 0) {
            logFailTestcase(false, `It should has ${numberMember} Remove button found at row "${i}"`);
        }
    }
});

When("User removes a member on Household list", async () => {
    const totalNumberOfRecord = await globalPageObject.getNumberOfTotalRecordsMainTab();
    const len = totalNumberOfRecord <= 10 ? totalNumberOfRecord : 10;
    let temp = true;
    for (let i = 1; i <= len; i++) {
        const numberMember = await householdList.getNumberOfMemberByRow(i);
        logFailTestcase(numberMember >= 0, `Get Number Member at row "${i}" failed!`);

        const numberRemoveButton = await householdList.getNumberOfRemoveButtonByRow(i);
        logFailTestcase(numberMember >= 0, `Get Number Remove button at row "${i}" failed!`);

        if (numberMember >= 3 && numberRemoveButton === numberMember) {
            // Cancel to Confirm remove Member
            const memberName = await householdList.getMemberByRow(i, 1);
            logFailTestcase(memberName.length > 0, `Get Member name failed!`);

            temp = await householdList.pressRemoveButtonByRow(i, 1);
            logFailTestcase(temp, `Press Remove button failed!`);

            let message = `Would you like to remove ${memberName.split(" - ")[0]} from the existing household?`;
            temp = await globalConfirmationForm.validateValueConfirmMessage(message);
            logFailTestcase(temp, `Incorrect confirmation message!`);

            await globalPageObject.pressNoForm();
            await globalPageObject.waitForProgressBarLoaded_v2();
            await globalPageObject.waitForProgressBarLoaded_v2();
            await globalPageObject.reloadTable();
            temp = await householdList.validateValueMemberByRow(memberName, i, 1);
            logFailTestcase(temp, `Member "${memberName}" should still show on household list!`);

            // Yes to Confirm remove Member
            temp = await householdList.pressRemoveButtonByRow(i, 1);
            logFailTestcase(temp, `Press Remove button failed!`);

            await globalPageObject.pressYesForm();
            await globalPageObject.waitForProgressBarLoaded_v2();
            await globalPageObject.waitForProgressBarLoaded_v2();

            const toastSuccess = `Member removed successfully!`;
            temp = await globalPageObject.checkToastSuccessExistWithMessage(toastSuccess);
            logWarningTestcase(temp, `Not found toast success "${toastSuccess}"`);
            await globalPageObject.reloadTable();

            temp = await householdList.validateValueMemberByRow(memberName, i, 1);
            logFailTestcase(!temp, `Member "${memberName}" should not show on household list!`);
        }
    }
});

When("User saves all members of the household which has total points greater than 0", async () => {
    await globalPageObject.expandNumberOfItemMainList(50);
    const totalRecords = await globalPageObject.getNumberOfTotalRecordsMainTab();
    const len = totalRecords > 50 ? 50 : totalRecords;
    let totalPointOfMember = {
        "HouseholdRow": 0,
        "TotalPoint": 0,
        "Member": [{ "MemberName": "", "SSN": "", "Point": 0 }]
    }
    totalPointOfMember.Member.pop();

    for (let i = 1; i <= len; i++) {
        let totalPoint = await householdList.getTotalPointsByRow(i);
        totalPointOfMember.TotalPoint = totalPoint;
        if (totalPoint > 0) {
            let numberOfMember = await householdList.getNumberOfMemberByRow(i);
            logFailTestcase(numberOfMember > 0, `Not found any member of the household at row "${i}"`);

            totalPointOfMember.HouseholdRow = i;
            for (let j = 1; j <= numberOfMember; j++) {
                let memberName = await householdList.getMemberByRow(i, j);
                logFailTestcase(memberName.length > 0, `Get member name at i = ${i} j = ${j}`);
                let pointOfMember = await householdList.getPointOfMemberByRow(i, j);
                logFailTestcase(pointOfMember >= 0, `Get point of member at i = ${i} j = ${j}`);

                totalPointOfMember.Member.push({ "MemberName": memberName.split(" - ")[0], "SSN": memberName.split(" - ")[1] || "", "Point": pointOfMember });
            }
            break;
        }
        else if (totalPoint === 0) {
            continue;
        }
        else {
            logFailTestcase(false, `Get total point at row "${i}" failed!`);
        }
    }
    pushObjectToDataArrayWithUniqueKey("totalPointOfMember", JSON.stringify(totalPointOfMember));
});

When("User verifies household widget at entity detail {string}", async (filename) => {
    const rows = await DataRepo.getInstance().loadData(filename);
    const appEntityWidgets = new AppEntityWidgets(SeleniumWebDriverService.getInstance());
 
    const timeStamp1 = getValueDataOfDataTestExecution("timeStamp1");
    let temp = true;

    const NumberOfMembers = rows[0].NumberOfMembers;
    if(NumberOfMembers){
        let temp2 = await appEntityWidgets.getNumberOfMembersOnHouseholdWidget();
        logFailTestcase(temp2 !== NumberOfMembers, `Number of household should be equal "${NumberOfMembers}"!`);
    }
    for (const row of rows) {
        const member = `${row.FirstName} ${row.LastName}`;
        const excludedAccount = row.ExcludedAccount;
        const address = `${row.Address + timeStamp1}, ${row.Postcode}, ${row.City}, ${row.Country}`;

        temp = await appEntityWidgets.validateValueAddressByAccountNameOnHouseholdWidget(member, address);
        logFailTestcase(temp, `Account "${member}" has incorrect address!`);

        if(excludedAccount){
            temp = await appEntityWidgets.checkAccountNameExistOnHouseholdWidget(excludedAccount);
            logFailTestcase(!temp, `Account "${excludedAccount} should NOT show on household widget`);
        }
    }    
});