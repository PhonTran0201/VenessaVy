import { When } from "@cucumber/cucumber";
import { SeleniumWebDriverService } from "../../../../core/selenium-webdriver.service";
import { GlobalPageObjectAGS } from "../../../../page-objects/agent-portal/hogs/GlobalPageObject/GlobalPageObjectAGS";
import { AppEntityWidgets } from "../../../../page-objects/back-office-portal/general/app-entity-widgets/AppEntityWidgets";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { HouseholdList } from "../../../../page-objects/back-office-portal/general/household/household/household-list/HouseholdList";
import { logFailTestcase } from "../../../../shared/functions";
import { getCurrencyDecimalSeparator, getCurrencyGroupSeparator, numberToCurrency } from "../../../../shared/tenant-setting/tenant-setting";
import { getValueDataOfDataTestExecution, pushObjectToDataArrayWithUniqueKey } from "../../../../storage-data/functions/data-test-execution";

When("User opens an account member on household list and checks the household Widget", async () => {
    const appEntityWidgets = new AppEntityWidgets(SeleniumWebDriverService.getInstance());
    const globalPageObject = new GlobalPageObject(SeleniumWebDriverService.getInstance());
    const householdList = new HouseholdList(SeleniumWebDriverService.getInstance());


    const totalPointOfMember = JSON.parse(getValueDataOfDataTestExecution("totalPointOfMember"));
    const arrayMember = totalPointOfMember.Member;
    let temp = true;

    let memberOpen: any;
    for (const member of arrayMember) {
        if(member.Point > 0){
            memberOpen = member;
            pushObjectToDataArrayWithUniqueKey("PointsBalance", member.Point);
            break;
        }
    }
    let householdRow = totalPointOfMember.HouseholdRow;
    temp = await householdList.openMemberByRow(memberOpen.MemberName, householdRow);
    logFailTestcase(temp, `Household row =  ${householdRow}, Open account member "${memberOpen.MemberName}" failed!`);
    await globalPageObject.waitForProgressBarLoaded_v2();


    await appEntityWidgets.pressRefreshButtonOnHouseholdWidget();
    await globalPageObject.waitForProgressBarLoaded_v2();

    for (const member of arrayMember) {
        temp = await appEntityWidgets.validateValueNINByAccountNameOnHouseholdWidget(member.MemberName, member.SSN);
        logFailTestcase(temp, `Account ${member.MemberName} has incorrect NIN`);

        let balancePoint = numberToCurrency(member.Point).split(getCurrencyDecimalSeparator())[0];
        if(parseFloat(balancePoint) === 0){
            balancePoint = "0";
        }
        temp = await appEntityWidgets.validateValueTotalBalanceByAccountNameOnHouseholdWidget(member.MemberName, balancePoint);
        logFailTestcase(temp, `Account ${member.MemberName} has incorrect point balance`);
    }
});