import { By, Locator } from 'selenium-webdriver';
import { ValidateField } from './classes';
export var dataTestcase: ValidateField[] = [];
export var dataTestExecution = {
    "id": "",
    "name": "",
    "description": "",
    "updatedDate": "",
    "data": [
        {
            "key": "",
            "value": ""
        }
    ]
}
export function resetDataTestcase() {
    dataTestcase = [];
}
export const toastError: Locator = By.xpath("//div[@id='toast-container']/div[contains(@class,'toast-error')]/div");
export const toastSuccess: Locator = By.xpath("//div[@id='toast-container']/div[contains(@class,'toast-success')]/div");

export const locator_progressbarActive: Locator = By.xpath("//ng-progress/div[contains(@class,'ng-progress-bar') and @active='true'] | //ng-progress/div[contains(@class,'ng-progress-bar -active')]");
export const locator_progressbarNotActive: Locator = By.xpath("//ng-progress/div[contains(@class,'ng-progress-bar') and @active='false'] | //ng-progress/div[not(@active) and @class='ng-progress-bar']");

//Scenario name
export let scenarioName = "";
export function setScenarioName(name: string) {
    scenarioName = name;
}

//Url
export let currentUrl = "";
export function setCurrentUrl(url: string) {
    currentUrl = url;
}

//Sub error messages
export let subErrorMessages = "\n\tSub error messages: ";
export function pushSubErrorMessage(errorMessage: string) {
    subErrorMessages = subErrorMessages + "\n\t\t- " + errorMessage;
}
export function resetSubErrorMessage() {
    subErrorMessages = "\n\tSub error messages: ";
}
export var resultColumn = function (module, itemid, item, expected, actual, date, note) {
    this.module = module;
    this.itemid = itemid;
    this.item = item;
    this.expected = expected;
    this.actual = actual;
    this.date = date;
    this.note = note;
}

export const fileNameLogin = "./data/data_default.txt";

/**
 * scenarioTags has type Set. This variable stores all tags of level Test case (scenario) or level Feature
 * Set is a new data structure introduced in ES6, similar to Map.
 * A typescript Set allows us to store distinct values in a List similar to other programming languages e.g. Java, C#.
 */
export let scenarioTags = new Set<string>();

export const ProjectNameGlobalVariable = getProjectName();

export const DownloadFilePathGlobalVariable = getDownloadFilePath();

function getDownloadFilePath() {
    let projectName = getProjectName();
    let downloadFilePath = "";

    if (__dirname.includes("jenkins") && !__dirname.includes(".jenkins")) {
        console.log("Running on jenkins...");
        downloadFilePath = __dirname.substring(0, __dirname.lastIndexOf(projectName) + projectName.length) + "\\Downloads";
        downloadFilePath = downloadFilePath.replace(/\\/g, '/');
    }
    else {
        console.log("Running on local...");
        downloadFilePath = __dirname.substring(0, __dirname.lastIndexOf(projectName) + projectName.length) + "\\downloads";
        downloadFilePath = downloadFilePath.replace(/\//g, "\\");
    }
    console.log(`Download File Path>>>: ${downloadFilePath}`);
    return downloadFilePath;
}


function getProjectName() {
    let projectName = "";
    if (!(__dirname.includes("jenkins") && !__dirname.includes(".jenkins"))){
        projectName = "VenessaVy";
        if (__dirname.includes("Auto Varsam Preview UAT")) {
            projectName = "Auto Varsam Preview UAT";
        }
    }
    else {
        projectName = "Test-Framework";
        if (__dirname.includes("Atlas-Test-Framework")) {
            projectName = "Atlas-Test-Framework";
        }
        if (__dirname.includes("hogse-test-framework")) {
            projectName = "hogse-test-framework";
        }
        if (__dirname.includes("Test-Framework-Clone")) {
            projectName = "Test-Framework-Clone";
        }
    }
    return projectName;
}

export const monthsArray = [
    { "month": "January", "mon": "Jan", "value": 1 },
    { "month": "February", "mon": "Feb", "value": 2 },
    { "month": "March", "mon": "Mar", "value": 3 },
    { "month": "April", "mon": "Apr", "value": 4 },
    { "month": "May", "mon": "May", "value": 5 },
    { "month": "June", "mon": "Jun", "value": 6 },
    { "month": "July", "mon": "Jul", "value": 7 },
    { "month": "August", "mon": "Aug", "value": 8 },
    { "month": "September", "mon": "Sep", "value": 9 },
    { "month": "October", "mon": "Oct", "value": 10 },
    { "month": "November", "mon": "Nov", "value": 11 },
    { "month": "December", "mon": "Dec", "value": 12 }
]