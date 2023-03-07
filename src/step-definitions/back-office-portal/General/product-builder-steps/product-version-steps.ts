import { Before, Given, Then, When } from "@cucumber/cucumber";
import { SeleniumWebDriverService } from "../../../../core/selenium-webdriver.service";
import { GlobalBrowserWindowHandle } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalBrowserWindowHandle";
import { GlobalConfirmationForm } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalConfirmationForm";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { GlobalPeripherals } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPeripherals";
import { ProductDetailsProductBuilder } from "../../../../page-objects/back-office-portal/general/product-builder/product-details/ProductDetailsProductBuilder";
import { ProductListProductBuilder } from "../../../../page-objects/back-office-portal/general/product-builder/product-list/ProductListProductBuilder";
import { ProductVersionDetailProductBuilder } from "../../../../page-objects/back-office-portal/general/product-builder/product-version-detail/ProductVersionDetailProductBuilder";
import { ProductVersionTabCoversProductBuilder } from "../../../../page-objects/back-office-portal/general/product-builder/product-versions/ProductVersionTabCoversProductBuilder";
import { ProductVersionTabQuestionsProductBuilder } from "../../../../page-objects/back-office-portal/general/product-builder/product-versions/ProductVersionTabQuestionsProductBuilder";
import { ProductVersionTabSalesProcessProductBuilder } from "../../../../page-objects/back-office-portal/general/product-builder/product-versions/ProductVersionTabSalesProcessProductBuilder";
import { PageFactory } from "../../../../page-objects/PageFactory";
import { convertPathFileDataToDataRegression, logFailTestcase, logInfoMessage, logSuccessMessage } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { pushObjectToDataArrayWithUniqueKey } from "../../../../storage-data/functions/data-test-execution";

let productListProductBuilder: ProductListProductBuilder;
let productDetailsProductBuilder: ProductDetailsProductBuilder;
let productVersionTabCoversProductBuilder: ProductVersionTabCoversProductBuilder;
let productVersionTabSalesProcessProductBuilder: ProductVersionTabSalesProcessProductBuilder;
let productVersionTabQuestionsProductBuilder: ProductVersionTabQuestionsProductBuilder;
let globalPageObject: GlobalPageObject;
let globalBrowserWindowHandle: GlobalBrowserWindowHandle;
let productVersionDetailProductBuilder: ProductVersionDetailProductBuilder;
let globalConfirmationForm: GlobalConfirmationForm;
const loader = require("csv-load-sync");

Before(async function () {
    const context: ICommonContext = this.context;
    productListProductBuilder = new ProductListProductBuilder(context.driverService);
    productDetailsProductBuilder = new ProductDetailsProductBuilder(context.driverService);
    productVersionTabCoversProductBuilder = new ProductVersionTabCoversProductBuilder(context.driverService);
    globalPageObject = new GlobalPageObject(context.driverService);
    globalBrowserWindowHandle = new GlobalBrowserWindowHandle(context.driverService);
    productVersionDetailProductBuilder = new ProductVersionDetailProductBuilder(context.driverService);
    productVersionTabQuestionsProductBuilder = new ProductVersionTabQuestionsProductBuilder(context.driverService);
    productVersionTabSalesProcessProductBuilder = new ProductVersionTabSalesProcessProductBuilder(context.driverService);
    globalConfirmationForm = new GlobalConfirmationForm(context.driverService);
});

Given("User navigates to cover tab", async () => {
    let temp = await productVersionDetailProductBuilder.navigateToCoversTabProductVersion();
    logFailTestcase(temp, "navigate To Covers Tab Product Version failed!");
});
Given("User navigates to questions tab", async () => {
    let temp = await productVersionDetailProductBuilder.navigateToQuestionsTabProductVersion();
    logFailTestcase(temp, "navigate To Questions Tab Product Version failed!");
});
Given("User navigates to Sales Process tab", async () => {
    let temp = await productVersionDetailProductBuilder.navigateToSalesProcessTabProductVersion();
    logFailTestcase(temp, "navigate To Sales Process Product Version failed!");
});

When("User navigates to cover tab of the product version details page {string}", async function (filename) {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const ProductName = row.ProductName;
    const ProductVersion = row.ProductVersion;

    let temp = await productListProductBuilder.SearchAndFilterProductName(ProductName);
    logFailTestcase(temp, "searches and filters the product failed!");

    temp = await productListProductBuilder.openProductByNameOnProductList(ProductName);
    logFailTestcase(temp, "open Product By Name On Product List failed!");

    if (ProductVersion) {
        temp = await productDetailsProductBuilder.cloneProductByVersion(ProductVersion);
        logFailTestcase(temp, "clone Product Version on Row 1 failed!");
    }

    temp = await productVersionDetailProductBuilder.navigateToCoversTabProductVersion();
    logFailTestcase(temp, "navigate To Covers Tab Product Version failed!");
});

Then("User verifies Covers UI is working properly {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];

    const StrategyTypeOptions = row.StrategyTypeOptions;
    const SourceQuestionOptions = row.SourceQuestionOptions;
    const OperationOptions = row.OperationOptions;
    const CombineComparisonsWithOptions = row.CombineComparisonsWithOptions;

    let temp = await productVersionTabCoversProductBuilder.validateRemoveCoverButtonIsExistedOnEachCover(1);
    logFailTestcase(temp, "validate Remove Cover Button Is Existsed on Each Cover failed!");

    temp = await productVersionTabCoversProductBuilder.selectCoverByRow();
    logFailTestcase(temp, `select Cover by row failed!`);

    if (StrategyTypeOptions) {
        let array = StrategyTypeOptions.split(";");
        for (let i = 0; i < array.length; i++) {
            temp = await productVersionTabCoversProductBuilder.inputStrategyType(array[i]);
            logFailTestcase(temp, `can not find '${array[i]}' option when select Strategy Type!`);
        }
    }
    if (SourceQuestionOptions) {
        let array = SourceQuestionOptions.split(";");
        for (let i = 0; i < array.length; i++) {
            temp = await productVersionTabCoversProductBuilder.inputSourceQuestion(array[i]);
            logFailTestcase(temp, `can not find '${array[i]}' option when select Source Question!`);
        }
    }
    if (OperationOptions) {
        let array = OperationOptions.split(";");
        for (let i = 0; i < array.length; i++) {
            temp = await productVersionTabCoversProductBuilder.inputOperation(array[i]);
            logFailTestcase(temp, `can not find '${array[i]}' option when select Operation!`);
        }
    }
    if (CombineComparisonsWithOptions) {
        let array = CombineComparisonsWithOptions.split(";");
        for (let i = 0; i < array.length; i++) {
            temp = await productVersionTabCoversProductBuilder.inputCombineComparisonsWith(array[i]);
            logFailTestcase(temp, `can not find '${array[i]}' option when select Combine Comparisons With!`);
        }
    }

});

When("User adds a new cover to cover list in the left menu {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const CoverName = row.CoverName;

    let temp = await productVersionTabCoversProductBuilder.addNewCover(CoverName);
    logFailTestcase(temp, `click add a new cover failed`);

    temp = await productVersionTabCoversProductBuilder.validateCoverIsAdded(CoverName);
    logFailTestcase(temp, `a new cover is not existed on cover list`);
});

When("User inputs cover information on cover details {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const CoverName = row.CoverName;
    const CoverID = row.CoverID;
    const DisplayName = row.DisplayName;
    const IndustryCode = row.IndustryCode;
    const ReportingCode = row.ReportingCode;
    const StrategyType = row.StrategyType;
    const SourceQuestion = row.SourceQuestion;
    const Operation = row.Operation;
    const TargetValue = row.TargetValue;
    const CombineComparisonsWith = row.CombineComparisonsWith;

    let temp = await productVersionTabCoversProductBuilder.selectCoverByName(CoverName);
    logFailTestcase(temp, `select Cover by ${CoverName} name failed!`);

    if (CoverID) {
        temp = await productVersionTabCoversProductBuilder.inputCoverID(CoverID);
        logFailTestcase(temp, `input Cover ID '${CoverID}' failed!`);
    }
    if (DisplayName) {
        temp = await productVersionTabCoversProductBuilder.inputDisplayName(DisplayName);
        logFailTestcase(temp, `input DisplayName '${DisplayName}' failed!`);
    }
    if (IndustryCode) {
        temp = await productVersionTabCoversProductBuilder.inputIndustryCode(IndustryCode);
        logFailTestcase(temp, `input IndustryCode '${IndustryCode}' failed!`);
    }
    if (ReportingCode) {
        temp = await productVersionTabCoversProductBuilder.inputReportingCode(ReportingCode);
        logFailTestcase(temp, `input ReportingCode '${ReportingCode}' failed!`);
    }
    if (ReportingCode) {
        temp = await productVersionTabCoversProductBuilder.inputReportingCode(ReportingCode);
        logFailTestcase(temp, `input ReportingCode '${ReportingCode}' failed!`);
    }
    if (StrategyType) {
        temp = await productVersionTabCoversProductBuilder.inputStrategyType(StrategyType);
        logFailTestcase(temp, `input StrategyType '${StrategyType}' failed!`);
    }
    if (SourceQuestion) {
        temp = await productVersionTabCoversProductBuilder.inputSourceQuestion(SourceQuestion);
        logFailTestcase(temp, `input SourceQuestion '${SourceQuestion}' failed!`);
    }
    if (Operation) {
        temp = await productVersionTabCoversProductBuilder.inputOperation(Operation);
        logFailTestcase(temp, `input Operation '${Operation}' failed!`);
    }
    if (TargetValue) {
        temp = await productVersionTabCoversProductBuilder.inputTargetValue(TargetValue);
        logFailTestcase(temp, `input TargetValue '${TargetValue}' failed!`);
    }
    if (CombineComparisonsWith) {
        temp = await productVersionTabCoversProductBuilder.inputCombineComparisonsWith(CombineComparisonsWith);
        logFailTestcase(temp, `input TargetValue '${CombineComparisonsWith}' failed!`);
    }

    await globalPageObject.waitForSeconds(500)
    temp = await productVersionTabCoversProductBuilder.pressSaveButton();
    logFailTestcase(temp, `Press SaveForm failed!`);

    await globalPageObject.waitForProgressBarLoaded();

    temp = await globalPageObject.checkToastSuccessExistWithMessage(`Saved successfully!`);
    logFailTestcase(temp, `Toast Success with Message: 'Saved successfully!' did not show!`);
});

Then("User verifies cover information on cover details {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const CoverName = row.CoverName;
    const CoverID = row.CoverID;
    const DisplayName = row.DisplayName;
    const IndustryCode = row.IndustryCode;
    const ReportingCode = row.ReportingCode;
    const StrategyType = row.StrategyType;
    const SourceQuestion = row.SourceQuestion;
    const Operation = row.Operation;
    const TargetValue = row.TargetValue;
    const CombineComparisonsWith = row.CombineComparisonsWith;

    let temp = await productVersionTabCoversProductBuilder.selectCoverByName(CoverName);
    logFailTestcase(temp, `select Cover by ${CoverName} name failed!`);

    temp = await productVersionTabCoversProductBuilder.validateCoverTitleValue("Working on cover: " + CoverName);
    logFailTestcase(temp, `validate Cover Title '${CoverName}' failed!`);

    if (CoverID) {
        temp = await productVersionTabCoversProductBuilder.validateCoverIDValue(CoverID);
        logFailTestcase(temp, `validate Cover ID '${CoverID}' failed!`);
    }
    if (DisplayName) {
        temp = await productVersionTabCoversProductBuilder.validateDisplayNameValue(DisplayName);
        logFailTestcase(temp, `validate DisplayName '${DisplayName}' failed!`);
    }
    if (IndustryCode) {
        temp = await productVersionTabCoversProductBuilder.validateIndustryCodeValue(IndustryCode);
        logFailTestcase(temp, `validate IndustryCode '${IndustryCode}' failed!`);
    }
    if (ReportingCode) {
        temp = await productVersionTabCoversProductBuilder.validateReportingCodeValue(ReportingCode);
        logFailTestcase(temp, `validate ReportingCode '${ReportingCode}' failed!`);
    }
    if (ReportingCode) {
        temp = await productVersionTabCoversProductBuilder.validateReportingCodeValue(ReportingCode);
        logFailTestcase(temp, `validate ReportingCode '${ReportingCode}' failed!`);
    }
    if (StrategyType) {
        temp = await productVersionTabCoversProductBuilder.validateStrategyTypeValue(StrategyType);
        logFailTestcase(temp, `validate StrategyType '${StrategyType}' failed!`);
    }
    if (SourceQuestion) {
        temp = await productVersionTabCoversProductBuilder.validateSourceQuestionValue(SourceQuestion);
        logFailTestcase(temp, `validate SourceQuestion '${SourceQuestion}' failed!`);
    }
    if (Operation) {
        temp = await productVersionTabCoversProductBuilder.validateOperationValue(Operation);
        logFailTestcase(temp, `validate Operation '${Operation}' failed!`);
    }
    if (TargetValue) {
        temp = await productVersionTabCoversProductBuilder.validateTargetValue(TargetValue);
        logFailTestcase(temp, `validate TargetValue '${TargetValue}' failed!`);
    }
    if (CombineComparisonsWith) {
        temp = await productVersionTabCoversProductBuilder.validateCombineComparisonsWithValue(CombineComparisonsWith);
        logFailTestcase(temp, `validate TargetValue '${CombineComparisonsWith}' failed!`);
    }
});

When("User verifies the limit of the cover list is working properly", async () => {
    let actualTotalCovers = await productVersionTabCoversProductBuilder.countTheNumberOfCoverOnList();
    let totalCoversMustAdded = 29 - actualTotalCovers;
    const CoverName = await productVersionTabCoversProductBuilder.getCoverNameByRow(1);
    let temp = true;
    for (let i = 1; i <= totalCoversMustAdded; i++) {
        temp = await productVersionTabCoversProductBuilder.cloneCoverByName(CoverName);
        logFailTestcase(temp, `clone cover name ${i} '${CoverName}' failed!`);
        // await globalPageObject.waitForSeconds(100);
    }
    actualTotalCovers = await productVersionTabCoversProductBuilder.countTheNumberOfCoverOnList();

    if (actualTotalCovers != 29) {
        logFailTestcase(temp, `Total cover records was cloned is not enought 30 records`);
    }

    logInfoMessage('Validate adding new cover when exists 29 records..');
    temp = await productVersionTabCoversProductBuilder.addNewCover(CoverName + "Version1");
    logFailTestcase(temp, "Can not add new cover to cover List");

    logInfoMessage('Validate adding new cover when exists 30 records..');
    temp = await productVersionTabCoversProductBuilder.validateAddCoverButtonIsDisabled(CoverName + "Version2");
    logFailTestcase(temp, "Add cover button is not disabled when total cover records is full");

    logInfoMessage('Validate adding new cover when remove 1 record...');
    temp = await productVersionTabCoversProductBuilder.removeCoverByName(CoverName + "Version1");
    logFailTestcase(temp, "Can not remove cover from cover List");

    temp = await productVersionTabCoversProductBuilder.addNewCover(CoverName + "Version2");
    logFailTestcase(temp, "Can not add new cover to cover List");

});

When("User deletes a cover on cover list in the left menu {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const CoverName = row.CoverName;

    let temp = await productVersionTabCoversProductBuilder.removeCoverByName(CoverName);
    logFailTestcase(temp, `delete a cover failed`);

    temp = await productVersionTabCoversProductBuilder.pressSaveButton();
    logFailTestcase(temp, `press save button failed`);

    await globalPageObject.waitForProgressBarLoaded_v2(1000);
    temp = await globalPageObject.checkToastSuccessExistWithMessage(`Saved successfully!`);
    logFailTestcase(temp, `Toast Success with Message: 'Saved successfully!' did not show!`);


});

Then("System does not shown the cover on cover list {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const CoverName = row.CoverName;
    await globalBrowserWindowHandle.refreshPage();
    await globalPageObject.waitForSeconds(5000);
    let temp = await productVersionTabCoversProductBuilder.validateCoverIsAdded(CoverName);
    logFailTestcase(!temp, `${CoverName} is still shown on cover list`);
});

When("User verifies UI at the product version details {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];

    const Status = row.Status;
    const AlertMessage = row.AlertMessage;

    let temp = true;
    if (Status?.localeCompare("Active") === 0) {
        temp = await productVersionDetailProductBuilder.checkStatusActiveExist();
        logFailTestcase(temp, `Not found icon status Active!`);
    }

    temp = await productVersionDetailProductBuilder.validateValueAlertSuccess(AlertMessage);
    logFailTestcase(temp, `Incorrect Allert Message`);
});

//#region Questions tab
When("User can not reorder questions tag", async () => {
    const initialListOfQuestions = await productVersionTabQuestionsProductBuilder.getListOfQuestions();
    logFailTestcase(initialListOfQuestions.length > 0, `Can Not get any question in list`);

    let temp = await productVersionTabQuestionsProductBuilder.dragAndDropQuestion(initialListOfQuestions[0], initialListOfQuestions[initialListOfQuestions.length - 1]);
    logFailTestcase(temp, `Element not found to drag and drop!`);

    await globalPageObject.waitForProgressBarLoaded_v2();
    const currentListOfQuestions = await productVersionTabQuestionsProductBuilder.getListOfQuestions();

    if (initialListOfQuestions.length !== currentListOfQuestions.length) {
        logFailTestcase(false, `Number of questions has been changed after reorder!`);
    }
    else {
        if (initialListOfQuestions[0] === currentListOfQuestions[currentListOfQuestions.length - 1]) {
            logFailTestcase(false, `Questions list has been reordered!`);
        }
    }
});

When("User adds and deletes new question at question tab on product details {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];

    const NameOfQuestion = row.NameOfQuestion;
    const ToastAdding = `'${NameOfQuestion}' has successfully added!`;
    const ToastDeleting = `'${NameOfQuestion}' has successfully deleted!`;

    let temp = true;
    //#region Xóa question nếu đã tồn tại
    temp = await productVersionTabQuestionsProductBuilder.isQuestionExist(NameOfQuestion);
    if (temp) {
        await productVersionTabQuestionsProductBuilder.pressDeleteQuestionByName(NameOfQuestion);
        await globalPageObject.waitForProgressBarLoaded_v2();
        await globalPageObject.pressYesForm();
        await globalPageObject.waitForProgressBarLoaded_v2();
    }
    //#endregion

    //#region Add new question
    temp = await productVersionTabQuestionsProductBuilder.inputNameOfQuestion(NameOfQuestion);
    logFailTestcase(temp, `Input Name of Question failed!`);

    temp = await productVersionTabQuestionsProductBuilder.pressAddQuestionButton();
    logFailTestcase(temp, `Press Add button failed!`);

    temp = await productVersionTabQuestionsProductBuilder.validateValueToastMessageUnderQuestionList(ToastAdding);
    logFailTestcase(temp);

    let arrayQuestionTagAfterAddQuestion = await productVersionTabQuestionsProductBuilder.getListOfQuestions();
    if (arrayQuestionTagAfterAddQuestion[arrayQuestionTagAfterAddQuestion.length - 1] !== NameOfQuestion) {
        logFailTestcase(temp, `Add question "${NameOfQuestion}" failed!`);
    }

    await globalPageObject.waitForProgressBarLoaded_v2(3000);
    temp = await globalPageObject.pressSaveTab();
    logFailTestcase(temp, `Press Save button failed!`);
    await globalPageObject.waitForProgressBarLoaded_v2();
    temp = await globalPageObject.checkToastSuccessExistWithMessage("Saved successfully!");
    logFailTestcase(temp, `Not found toast message`);
    await globalPageObject.closeAllToastSuccess();
    await globalPageObject.waitForProgressBarLoaded_v2(3000);

    arrayQuestionTagAfterAddQuestion = await productVersionTabQuestionsProductBuilder.getListOfQuestions();
    if (arrayQuestionTagAfterAddQuestion[arrayQuestionTagAfterAddQuestion.length - 1] !== NameOfQuestion) {
        logFailTestcase(false, `Save new question "${NameOfQuestion}" failed!`);
    }
    //#endregion


    //#region Delete question
    temp = await productVersionTabQuestionsProductBuilder.pressDeleteQuestionByName(NameOfQuestion);
    logFailTestcase(temp, `Press delete question "${NameOfQuestion}" failed!`);

    temp = await globalConfirmationForm.validateValueConfirmMessage(`You are deleting question '${NameOfQuestion}'. Are you sure?`);
    logFailTestcase(temp, `Incorrect confirm message`);

    await globalPageObject.pressYesForm();

    temp = await productVersionTabQuestionsProductBuilder.validateValueToastMessageUnderQuestionList(ToastDeleting);
    logFailTestcase(temp, `Not found toast delete succeed: "${ToastDeleting}"`);

    temp = await globalPageObject.pressSaveTab();
    logFailTestcase(temp, `Press Save button failed!`);

    temp = await productVersionTabQuestionsProductBuilder.isQuestionExist(NameOfQuestion);
    logFailTestcase(!temp, `Question "${NameOfQuestion}" has NOT been deleted!`);
    //#endregion
});


When("User reorders questions tag but no savings", async () => {
    await globalPageObject.waitForProgressBarLoaded_v2(2000);
    const initialListOfQuestions = await productVersionTabQuestionsProductBuilder.getListOfQuestions();
    logFailTestcase(initialListOfQuestions.length > 0, `Can Not get any question in list`);

    let temp = await productVersionTabQuestionsProductBuilder.dragAndDropQuestion(initialListOfQuestions[0], initialListOfQuestions[initialListOfQuestions.length - 1]);
    logFailTestcase(temp, `Element not found to drag and drop!`);

    await globalPageObject.waitForProgressBarLoaded_v2();
    await globalPageObject.waitForProgressBarLoaded_v2();
    await globalPageObject.waitForProgressBarLoaded_v2();


    const currentListOfQuestions = await productVersionTabQuestionsProductBuilder.getListOfQuestions();
    console.log(initialListOfQuestions);
    console.log(currentListOfQuestions);

    if (initialListOfQuestions.length !== currentListOfQuestions.length) {
        logFailTestcase(false, `Number of questions has been changed after reorder!`);
    }
    else {
        if (initialListOfQuestions[0] !== currentListOfQuestions[currentListOfQuestions.length - 1]) {
            logFailTestcase(false, `Questions list has NOT been reordered!`);
        }
    }

    const version = await (await productVersionDetailProductBuilder.getVersionOfProduct()).toLowerCase();
    logFailTestcase(version.length > 0, `Get Version failed!`);

    temp = await productDetailsProductBuilder.pressBackButton();
    logFailTestcase(temp, `Press Back button on Question tab failed!`);

    temp = await productDetailsProductBuilder.selectTheExistingProductVersion(version);
    logFailTestcase(temp, `Select Product version "${version}" failed!`);

    temp = await productVersionDetailProductBuilder.navigateToQuestionsTabProductVersion();
    logFailTestcase(temp, `Navigate to tab Question failed!`);

    const afterListOfQuestion = await productVersionTabQuestionsProductBuilder.getListOfQuestions();


    if (initialListOfQuestions.length !== afterListOfQuestion.length ||
        initialListOfQuestions[0] !== afterListOfQuestion[0]) {
        logFailTestcase(false, `List of Question has changed although we did not save`);
    }
});

When("User reorders questions tag successfully", async () => {
    const globalBrowserWindowHandlePage = PageFactory.getInstance().createGlobalBrowserWindowHandlePage();
    await globalBrowserWindowHandle.refreshPage();
    await globalPageObject.waitForProgressBarLoaded_v2();

    const initialListOfQuestions = await productVersionTabQuestionsProductBuilder.getListOfQuestions();
    logFailTestcase(initialListOfQuestions.length > 0, `Can Not get any question in list`);

    let temp = await productVersionTabQuestionsProductBuilder.dragAndDropQuestion(initialListOfQuestions[0], initialListOfQuestions[initialListOfQuestions.length - 1]);
    logFailTestcase(temp, `Element not found to drag and drop!`);

    await globalPageObject.waitForProgressBarLoaded_v2();
    await globalPageObject.waitForProgressBarLoaded_v2();

    const currentListOfQuestions = await productVersionTabQuestionsProductBuilder.getListOfQuestions();

    if (initialListOfQuestions.length !== currentListOfQuestions.length) {
        logFailTestcase(false, `Number of questions has been changed after reorder!`);
    }
    else {
        if (initialListOfQuestions[0] !== currentListOfQuestions[currentListOfQuestions.length - 1]) {
            logFailTestcase(false, `Questions list has NOT been reordered!`);
        }
    }

    const version = await (await productVersionDetailProductBuilder.getVersionOfProduct()).toLowerCase();
    logFailTestcase(version.length > 0, `Get Version failed!`);


    temp = await globalPageObject.pressSaveTab();
    logFailTestcase(temp, `Press Save button on Question tab failed!`);

    try {
        temp = await globalPageObject.checkToastSuccessExistWithMessage("Save successfully!");

    } catch (error) {
        console.log(error)
    }
    

    temp = await productDetailsProductBuilder.pressBackButton();
    logFailTestcase(temp, `Press Back button on Question tab failed!`);

    temp = await productDetailsProductBuilder.selectTheExistingProductVersion(version);
    logFailTestcase(temp, `Select Product version "${version}" failed!`);

    temp = await productVersionDetailProductBuilder.navigateToQuestionsTabProductVersion();
    logFailTestcase(temp, `Navigate to tab Question failed!`);

    const afterListOfQuestion = await productVersionTabQuestionsProductBuilder.getListOfQuestions();

    logFailTestcase(initialListOfQuestions.length === afterListOfQuestion.length, `Number of questions has been changed!`);
    logFailTestcase(initialListOfQuestions[0] === afterListOfQuestion[afterListOfQuestion.length - 1], `List of Question has NOT reordered after save!`);
});

When("User changes questions and actives new version", async () => {
    //#region Add question "QuestionTest"
    //#region Add new question
    let question = "QuestionTest";

    let temp = await productVersionTabQuestionsProductBuilder.inputNameOfQuestion(question);
    logFailTestcase(temp, `Input Name of Question failed!`);

    temp = await productVersionTabQuestionsProductBuilder.pressAddQuestionButton();
    logFailTestcase(temp, `Press Add button failed!`);

    temp = await productVersionTabQuestionsProductBuilder.validateValueToastMessageUnderQuestionList(`'${question}' has successfully added!`);
    logFailTestcase(temp);
    //#endregion

    //#region Edit question
    let initialListOfQuestions = await productVersionTabQuestionsProductBuilder.getListOfQuestions();

    let questionEdit = question;
    const questionAfterEdit = `${questionEdit}Edit`;

    temp = await productVersionTabQuestionsProductBuilder.editCurrentQuestion(questionEdit, questionAfterEdit);
    logFailTestcase(temp, `Edit currenct question failed!`);

    const globalPeripherals = new GlobalPeripherals(SeleniumWebDriverService.getInstance());
    await globalPeripherals.pressTabCurrentElement();

    temp = await productVersionTabQuestionsProductBuilder.isQuestionExist(questionAfterEdit);
    logFailTestcase(temp, `Not found question "${questionAfterEdit}" after edit name!`);

    let currentListOfQuestions = await productVersionTabQuestionsProductBuilder.getListOfQuestions();
    if (initialListOfQuestions.length !== currentListOfQuestions.length) {
        logFailTestcase(false, `1. Edit question failed!`);
    }

    await globalPageObject.pressSaveTab();
    await globalPageObject.waitForProgressBarLoaded_v2();

    await globalBrowserWindowHandle.refreshPage();

    currentListOfQuestions = await productVersionTabQuestionsProductBuilder.getListOfQuestions();
    if (initialListOfQuestions.length !== currentListOfQuestions.length ||
        currentListOfQuestions[currentListOfQuestions.length - 1] !== questionAfterEdit) {
        logFailTestcase(false, `2. Edit question failed!`);
    }
    //#endregion


    //#region Delete question
    initialListOfQuestions = await productVersionTabQuestionsProductBuilder.getListOfQuestions();
    temp = await productVersionTabQuestionsProductBuilder.pressDeleteQuestionByName(questionAfterEdit);
    logFailTestcase(temp, `Delete question "${questionAfterEdit}" failed!`);

    temp = await globalConfirmationForm.validateValueConfirmMessage(`You are deleting question '${questionAfterEdit}'. Are you sure?`);
    logFailTestcase(temp, `Incorrect confirm message`);

    await globalPageObject.pressYesForm();


    temp = await productVersionTabQuestionsProductBuilder.validateValueToastMessageUnderQuestionList(`'${questionAfterEdit}' has successfully deleted!`);
    logFailTestcase(temp);

    await globalPageObject.waitForSeconds(2000);

    currentListOfQuestions = await productVersionTabQuestionsProductBuilder.getListOfQuestions();

    if (initialListOfQuestions.length === currentListOfQuestions.length ||
        await productVersionTabQuestionsProductBuilder.isQuestionExist(questionAfterEdit)) {
        logFailTestcase(false, `Delete question failed!`);
    }
    logSuccessMessage("\n\t=> Delete question: passed!");
    //#endregion

    // Revert name of question as initial
    let questionEdited = "InsuredPersonNameTag";//For product travel
    let questionType = "Number";
    pushObjectToDataArrayWithUniqueKey("questionEdited", questionEdited);
    pushObjectToDataArrayWithUniqueKey("questionType", questionType);


    temp = await productVersionTabQuestionsProductBuilder.clickToSelectQuestion(questionEdited);
    logFailTestcase(temp, `Not found question "${questionEdited}"!`);

    temp = await productVersionTabQuestionsProductBuilder.inputQuestionTypes(questionType);
    logFailTestcase(temp, `Input Type "${questionType}" for question "${questionEdit}" failed!`);
    await globalPageObject.pressSaveTab();
    await globalPageObject.waitForProgressBarLoaded_v2();

    logSuccessMessage("\n\t=> Edit question: passed!");
    //#endregion


    //#region Replace old question
    temp = await productVersionDetailProductBuilder.navigateToSalesProcessTabProductVersion();
    logFailTestcase(temp, `Navigate to Sales Process Tab failed!`);

    temp = await productVersionTabSalesProcessProductBuilder.pressClearButtonAtQuestion(questionEdited);
    logFailTestcase(temp, `Remove question "${questionEdited}" failed!`);

    temp = await productVersionTabSalesProcessProductBuilder.dragAndDropQuestionIntoSection(questionEdited, "Insured Person", 1);
    logFailTestcase(temp, `Drag and drop question "${questionEdited}" failed!`);
    await globalPageObject.waitForProgressBarLoaded_v2();

    //#endregion

    await globalPageObject.pressSaveTab();
    await globalPageObject.waitForProgressBarLoaded_v2();

    temp = await globalPageObject.pressPublishTab();
    logFailTestcase(temp, `Press Publish button failed!`);
    await globalPageObject.waitForProgressBarLoaded_v2();
    //#endregion
});

When("User selects an existing question as {string} at question tab on product details", async (questionName) => {
    let temp = await productVersionTabQuestionsProductBuilder.clickToSelectQuestion(questionName);
    logFailTestcase(temp, `Select question "${questionName}" failed!`);
});


When(`User inputs information into product version questions detail form at section Advanced Properties {string}`, async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename))
    for (let i = 0; i < rows.length; i++) {
        const QuestionName = rows[i].QuestionName;
        const SensitivityLevel = rows[i].SensitivityLevel;
        const CreatePolicy = rows[i].CreatePolicy;
        const MTAPolicy = rows[i].MTAPolicy;
        const RenewPolicy = rows[i].RenewPolicy;

        let temp = await productVersionTabQuestionsProductBuilder.clickToSelectQuestion(QuestionName);
        logFailTestcase(temp);

        temp = await productVersionTabQuestionsProductBuilder.expandAdvancedPropertiesSection();
        logFailTestcase(temp);

        if (SensitivityLevel) {
            temp = await productVersionTabQuestionsProductBuilder.inputSensivityLevel(SensitivityLevel);
            logFailTestcase(temp);
        }
        if (CreatePolicy) {
            temp = await productVersionTabQuestionsProductBuilder.inputNewBusinessFlowModification(CreatePolicy)
            logFailTestcase(temp);
        }
        if (MTAPolicy) {
            temp = await productVersionTabQuestionsProductBuilder.inputMTABusinessFlowModification(MTAPolicy)
            logFailTestcase(temp);
        }
        if (RenewPolicy) {
            temp = await productVersionTabQuestionsProductBuilder.inputRenewBusinessFlowModification(RenewPolicy)
            logFailTestcase(temp);
        }

        await globalPageObject.waitForSeconds(500)
        temp = await productVersionTabCoversProductBuilder.pressSaveButton();
        logFailTestcase(temp, `Press SaveForm failed!`);

        await globalPageObject.waitForProgressBarLoaded();

        temp = await globalPageObject.checkToastSuccessExistWithMessage(`Saved successfully!`);
        // logFailTestcase(temp, `Toast Success with Message: 'Saved successfully!' did not show!`);
    }
});

//#endregion

When("User checks Conditional Question Behaviours section at question tab on product details", async () => {
    // For test case: https://contemi.atlassian.net/browse/VAR-2421
    let temp = true;

    // Steps 7
    const behaviorName = "Set value based on condition";
    temp = await productVersionTabQuestionsProductBuilder.inputSelectBehaviors(behaviorName);
    logFailTestcase(temp, `Select behavior "${behaviorName}" failed!`);

    temp = await productVersionTabQuestionsProductBuilder.pressAddConditionMainButtonAtConditionalQuestionBehaviors(behaviorName);
    logFailTestcase(temp, `Press Add button of section ${behaviorName} failed!`);

    // Step 10
    let temp1 = await productVersionTabQuestionsProductBuilder.isQuestionIdAtConditionalQuestionBehaviorsExist(behaviorName, 2, 1);
    let temp2 = await productVersionTabQuestionsProductBuilder.isWhereAtConditionalQuestionBehaviorsExist(behaviorName, 2, 1);
    let temp3 = await productVersionTabQuestionsProductBuilder.isAndValueIsAtConditionalQuestionBehaviorsExist(behaviorName, 2, 1);
    logFailTestcase(temp1 && temp2 && temp3, `Condition 2 is Not found!`);


    temp = await productVersionTabQuestionsProductBuilder.pressRemoveLastConditionMainButtonAtConditionalQuestionBehaviors(behaviorName);
    logFailTestcase(temp, `Press Remove last condition failed!`);

    //Step 11
    temp1 = await productVersionTabQuestionsProductBuilder.isQuestionIdAtConditionalQuestionBehaviorsExist(behaviorName, 2, 1);
    temp2 = await productVersionTabQuestionsProductBuilder.isWhereAtConditionalQuestionBehaviorsExist(behaviorName, 2, 1);
    temp3 = await productVersionTabQuestionsProductBuilder.isAndValueIsAtConditionalQuestionBehaviorsExist(behaviorName, 2, 1);
    logFailTestcase(!(temp1 || temp2 || temp3), `Condition 2 is still displayed!`);

    // Step 12 -> 15
    const initialListOfQuestions = await productVersionTabQuestionsProductBuilder.getListOfQuestions();
    for (const iterator of initialListOfQuestions) {
        temp = await productVersionTabQuestionsProductBuilder.inputQuestionIdAtConditionalQuestionBehaviors(behaviorName, 1, 1, iterator);
        logFailTestcase(temp, `Input question "${iterator}" failed!`);
    }

    const wheres = ["EqualsValue", "LessThanValue", "LessThanOrEqualValue", "MoreThanValue", "NotEqualsValue", "NotEmptyValue", "IsEmptyValue", "MoreOrEqualThanValue"];
    for (const iterator of wheres) {
        temp = await productVersionTabQuestionsProductBuilder.inputWhereAtConditionalQuestionBehaviors(behaviorName, 1, 1, iterator);
        logFailTestcase(temp, `Input where "${iterator}" failed!`);
    }

    for (const iterator of initialListOfQuestions) {
        temp = await productVersionTabQuestionsProductBuilder.inputAndValueIsAtConditionalQuestionBehaviors(behaviorName, 1, 1, iterator);
        logFailTestcase(temp, `Input And Value is "${iterator}" failed!`);
    }

    //Steps 16
    temp = await productVersionTabQuestionsProductBuilder.pressAddConditionSubButtonAtConditionalQuestionBehaviors(behaviorName, 1);
    logFailTestcase(temp, `Press Add button of section "${behaviorName}", Condition 1 failed!`);


    temp1 = await productVersionTabQuestionsProductBuilder.isQuestionIdAtConditionalQuestionBehaviorsExist(behaviorName, 1, 2);
    temp2 = await productVersionTabQuestionsProductBuilder.isWhereAtConditionalQuestionBehaviorsExist(behaviorName, 1, 2);
    temp3 = await productVersionTabQuestionsProductBuilder.isAndValueIsAtConditionalQuestionBehaviorsExist(behaviorName, 1, 2);
    logFailTestcase(temp1 && temp2 && temp3, `Question 2 of Condition 1 is Not found!`);


    // Step 17, Đó là nút delete
    temp = await productVersionTabQuestionsProductBuilder.pressDeleteButtonQuestionAtConditionalQuestionBehaviors(behaviorName, 1, 2);
    logFailTestcase(temp, `Press delete button for question 2 at condition 1 failed!`);


    temp1 = await productVersionTabQuestionsProductBuilder.isQuestionIdAtConditionalQuestionBehaviorsExist(behaviorName, 1, 2);
    temp2 = await productVersionTabQuestionsProductBuilder.isWhereAtConditionalQuestionBehaviorsExist(behaviorName, 1, 2);
    temp3 = await productVersionTabQuestionsProductBuilder.isAndValueIsAtConditionalQuestionBehaviorsExist(behaviorName, 1, 2);
    logFailTestcase(!(temp1 && temp2 && temp3), `Question 2 of Condition 1 is still found!`);


    // Steps 18 -> 21
    const questionId = "NoOfTravellers";
    const where = "EqualsValue";
    const andValueIs = "5";
    const value = "1000";
    temp = await productVersionTabQuestionsProductBuilder.inputQuestionIdAtConditionalQuestionBehaviors(behaviorName, 1, 1, questionId);
    logFailTestcase(temp, `Input question Id "${questionId}" failed!`);

    temp = await productVersionTabQuestionsProductBuilder.inputWhereAtConditionalQuestionBehaviors(behaviorName, 1, 1, where);
    logFailTestcase(temp, `Input Where "${where}" failed!`);

    temp = await productVersionTabQuestionsProductBuilder.inputAndValueIsAtConditionalQuestionBehaviors(behaviorName, 1, 1, andValueIs);
    logFailTestcase(temp, `Input And Value is "${andValueIs}" failed!`);

    temp = await productVersionTabQuestionsProductBuilder.inputValueAtConditionalQuestionBehaviors(behaviorName, 1, value);
    logFailTestcase(temp, `Input Value "${andValueIs}" failed!`);

    temp = await globalPageObject.pressSaveTab();
    logFailTestcase(temp, `Press Save button failed!`);

    //#region Sales process Step 22 -> 23
    const questionEdited = "LuggageExcessTag";
    temp = await productVersionDetailProductBuilder.navigateToSalesProcessTabProductVersion();
    logFailTestcase(temp, `Navigate to Sales Process Tab failed!`);

    await globalPageObject.closeAllToastSuccess();

    temp = await productVersionTabSalesProcessProductBuilder.pressClearButtonAtQuestion(questionEdited);
    logFailTestcase(temp, `Remove question "${questionEdited}" failed!`);

    temp = await productVersionTabSalesProcessProductBuilder.dragAndDropQuestionIntoSection(questionEdited, "Insured Person", 1);
    logFailTestcase(temp, `Drag and drop question "${questionEdited}" failed!`);
    await globalPageObject.waitForProgressBarLoaded_v2();

    temp = await globalPageObject.pressSaveTab();
    logFailTestcase(temp, `Press Save button failed!`);

    temp = await globalPageObject.pressPublishTab();
    logFailTestcase(temp, `Press Publish button failed!`);
    await globalPageObject.waitForProgressBarLoaded_v2();
    //#endregion
});

When("User adds new questions at question tab on product details {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    for (let i = 0; i < rows.length; i++) {
        const NameOfQuestion = rows[i].NameOfQuestion || rows[i].QuestionName;
        const ToastAdding = `'${NameOfQuestion}' has successfully added!`;

        let temp = true;
        //#region Xóa question nếu đã tồn tại
        temp = await productVersionTabQuestionsProductBuilder.isQuestionExist(NameOfQuestion);
        if (temp) {
            await productVersionTabQuestionsProductBuilder.pressDeleteQuestionByName(NameOfQuestion);
            await globalPageObject.waitForProgressBarLoaded_v2();
            await globalPageObject.pressYesForm();
            await globalPageObject.waitForProgressBarLoaded_v2();
        }
        //#endregion

        //#region Add new question
        temp = await productVersionTabQuestionsProductBuilder.inputNameOfQuestion(NameOfQuestion);
        logFailTestcase(temp, `Input Name of Question failed!`);

        temp = await productVersionTabQuestionsProductBuilder.pressAddQuestionButton();
        logFailTestcase(temp, `Press Add button failed!`);

        temp = await productVersionTabQuestionsProductBuilder.validateValueToastMessageUnderQuestionList(ToastAdding);
        logFailTestcase(temp);

        let arrayQuestionTagAfterAddQuestion = await productVersionTabQuestionsProductBuilder.getListOfQuestions();
        if (arrayQuestionTagAfterAddQuestion[arrayQuestionTagAfterAddQuestion.length - 1] !== NameOfQuestion) {
            logFailTestcase(temp, `Add question "${NameOfQuestion}" failed!`);
        }

        temp = await globalPageObject.pressSaveTab();
        logFailTestcase(temp, `Press Save button failed!`);

        await globalPageObject.checkToastSuccessExistWithMessage("Save successfully!");
        await globalPageObject.closeAllToastSuccess();
        await globalPageObject.waitForProgressBarLoaded_v2(3000);

        arrayQuestionTagAfterAddQuestion = await productVersionTabQuestionsProductBuilder.getListOfQuestions();
        if (arrayQuestionTagAfterAddQuestion[arrayQuestionTagAfterAddQuestion.length - 1] !== NameOfQuestion) {
            logFailTestcase(false, `Save new question "${NameOfQuestion}" failed!`);
        }
    }
});

When('User drags and drops questions to layout at sales process tab on product detail {string}', async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    for (let i = 0; i < rows.length; i++) {
        const NameOfQuestion = rows[i].NameOfQuestion || rows[i].QuestionName;
        const sectionName = rows[i].sectionName;

        let temp = await productVersionTabSalesProcessProductBuilder.pressClearButtonAtQuestion(NameOfQuestion);
        logFailTestcase(temp, `Remove question "${NameOfQuestion}" failed!`);

        temp = await productVersionTabSalesProcessProductBuilder.dragAndDropQuestionIntoSection(NameOfQuestion, sectionName, 1);
        logFailTestcase(temp, `Drag and drop question "${NameOfQuestion}" failed!`);
        await globalPageObject.waitForProgressBarLoaded_v2();

    }
    let temp = await globalPageObject.pressSaveTab();
    await globalPageObject.waitForProgressBarLoaded_v2();
    await globalPageObject.waitForProgressBarLoaded_v2();
    logFailTestcase(temp, `Press Save button failed!`);
})