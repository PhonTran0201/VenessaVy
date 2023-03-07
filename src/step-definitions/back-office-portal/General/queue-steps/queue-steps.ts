import { Given, Then, When } from "@cucumber/cucumber";
import { DataRepo } from "../../../../core/modals/DataRepo";
import { PageFactory } from "../../../../page-objects/PageFactory";
import { logFailTestcase } from "../../../../shared/functions";

let pageList = PageFactory.getInstance().createQueueList();
let pageDetails = PageFactory.getInstance().createQueueDetails();
let pageGlobal = PageFactory.getInstance().createGlobalPageObjectPage();

Given(`User navigates to Queue List`, async () => {
    let temp = await pageGlobal.navigateToMainQueueList();
    logFailTestcase(temp, `navigates to Queue List failed!`)
});


Given(`User searches queue on Queue List {string}`, async (filename) => {
    const data = await DataRepo.getInstance().loadData(filename);
    let temp = await pageList.selectQueueType(data.QueueType);
    logFailTestcase(temp, `select Queue Type failed`);
    temp = await pageList.searchQueueOnTheList(data.QueueName);
    logFailTestcase(temp, `search Queue On The List failed!`)
});

Given(`User opens the first queue on Queue List`, async () => {
    let temp = await pageList.openQueueDetailByIndex(1);
    logFailTestcase(temp, `open Queue Detail By Index failed!`)
});

When(`User adds members to Queue {string}`, async (filename) => {
    const data = await DataRepo.getInstance().loadData(filename);
    const dataMember = data.QueueMember;
    let temp = true;
    for (let i = 0; i < dataMember.length; i++) {
        temp = await pageDetails.findMemberOnQueueList("Add members", dataMember[i].FullName, dataMember[i].UserName);
        logFailTestcase(temp, `can not find Member has full name : ${dataMember[i].FullName} On Add members List`);

        temp = await pageDetails.addMembertoQueueByUsername(dataMember[i].UserName)
        logFailTestcase(temp, `add Member to Queue By Username failed`);
    }
});
When(`User sets role for member on Queue {string}`, async (filename) => {
    const data = await DataRepo.getInstance().loadData(filename);
    const dataMember = data.QueueMember;
    let temp = true;
    for (let i = 0; i < dataMember.length; i++) {
        temp = await pageDetails.findMemberOnQueueList("Queue members", dataMember[i].FullName, dataMember[i].UserName);
        logFailTestcase(temp, `can not find Member has full name : ${dataMember[i].FullName} On Queue List`);

        temp = await pageDetails.setRoleOfQueueMemberByUsername(dataMember[i].UserName, dataMember[i].Role);
        logFailTestcase(temp, `set Role Of Queue Member By Username failed`);
    }

});


When(`User removes members from Queue {string}`, async (filename) => {
    const data = await DataRepo.getInstance().loadData(filename);
    const dataMember = data.QueueMember;
    let temp = true;
    for (let i = 0; i < dataMember.length; i++) {
        temp = await pageDetails.findMemberOnQueueList("Queue members", dataMember[i].FullName, dataMember[i].UserName);
        logFailTestcase(temp, `can not find Member has full name : ${dataMember[i].FullName} On Queue List`);

        temp = await pageDetails.removeMemberFromQueueByUsername(dataMember[i].UserName)
        logFailTestcase(temp, `remove Member From Queue By Username failed`);
    }
});

Then(`System does not show info of member on Queue {string}`, async (filename) => {
    const data = await DataRepo.getInstance().loadData(filename);
    const dataMember = data.QueueMember;

    for (let i = 0; i < dataMember.length; i++) {
        let temp = await pageDetails.validateMemberIsAddedOnQueue(dataMember[i].FullName, dataMember[i].UserName, dataMember.length-i);
        logFailTestcase(!temp, `Member Is still On Queue!`);

        temp = await pageDetails.findMemberOnQueueList("Add members", dataMember[i].FullName, dataMember[i].UserName);
        logFailTestcase(temp, `can not find Member has full name : ${dataMember[i].FullName} On Add members List`);

        temp = await pageDetails.validateAddMemberIconIsInVisible(dataMember[i].UserName);
        logFailTestcase(!temp, `validate Add Member Icon Is Visible failed!`)
    }



});

Then(`System shows info of member on Queue {string}`, async (filename) => {
    const data = await DataRepo.getInstance().loadData(filename);
    const dataMember = data.QueueMember;
    for (let i = 0; i < dataMember.length; i++) {
        let temp = await pageDetails.validateMemberIsAddedOnQueue(dataMember[i].FullName, dataMember[i].UserName,dataMember.length-i);
        logFailTestcase(temp, `validate Member Is Added On Queue failed!`);

        temp = await pageDetails.findMemberOnQueueList("Add members", dataMember[i].FullName, dataMember[i].UserName);
        logFailTestcase(temp, `can not find Member has full name : ${dataMember[i].FullName} On Add members List`);

        temp = await pageDetails.validateAddMemberIconIsInVisible(dataMember[i].UserName);
        logFailTestcase(temp, `validate Add Member Icon Is InVisible failed!`)
    }

});
