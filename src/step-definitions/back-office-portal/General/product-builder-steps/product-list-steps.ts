import { Before, Given, Then, When } from "@cucumber/cucumber";
import { GlobalBrowserWindowHandle } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalBrowserWindowHandle";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { Login } from "../../../../page-objects/back-office-portal/general/login-logout/Login";
import { ProductDetailsProductBuilder } from "../../../../page-objects/back-office-portal/general/product-builder/product-details/ProductDetailsProductBuilder";
import { ProductListProductBuilder } from "../../../../page-objects/back-office-portal/general/product-builder/product-list/ProductListProductBuilder";
import { ProductVersionDetailProductBuilder } from "../../../../page-objects/back-office-portal/general/product-builder/product-version-detail/ProductVersionDetailProductBuilder";
import { ProductVersionTabQuestionsProductBuilder } from "../../../../page-objects/back-office-portal/general/product-builder/product-versions/ProductVersionTabQuestionsProductBuilder";
import { convertPathFileDataToDataRegression, logFailTestcase } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { getValueDataOfDataTestExecution, pushObjectToDataArrayWithUniqueKey } from "../../../../storage-data/functions/data-test-execution";



let globalPageObject: GlobalPageObject;
let globalBrowserWindowHandle: GlobalBrowserWindowHandle;
let productListProductBuilder: ProductListProductBuilder;
let productDetailsProductBuilder: ProductDetailsProductBuilder;
let productVersionDetailProductBuilder: ProductVersionDetailProductBuilder;
let productVersionTabQuestionsProductBuilder: ProductVersionTabQuestionsProductBuilder;
let login: Login;
const loader = require("csv-load-sync");


Before(async function () {
    const context: ICommonContext = this.context;
    globalPageObject = new GlobalPageObject(context.driverService);
    globalBrowserWindowHandle = new GlobalBrowserWindowHandle(context.driverService);
    productListProductBuilder = new ProductListProductBuilder(context.driverService);
    productDetailsProductBuilder = new ProductDetailsProductBuilder(context.driverService);
    productVersionDetailProductBuilder = new ProductVersionDetailProductBuilder(context.driverService);
    productVersionTabQuestionsProductBuilder = new ProductVersionTabQuestionsProductBuilder(context.driverService);
    login = new Login(context.driverService);
});

Given("User navigates to Product Builder", async () => {
    let temp = await globalPageObject.navigateToMainProductBuilder();
    logFailTestcase(temp, "navigate To Main Product Builder failed!");
});

When("User opens the product on product list {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];
    const ProductName = row.ProductName;

    let temp = await productListProductBuilder.SearchAndFilterProductName(ProductName);
    logFailTestcase(temp, "searches and filters the product failed!");

    temp = await productListProductBuilder.openProductByNameOnProductList(ProductName);
    logFailTestcase(temp, "open Product By Name On Product List failed!");
    
    await globalPageObject.expandNumberOfItemMainList(50);

    const activeVersion = await productDetailsProductBuilder.getProductVersionDetailWithActiveStatus();
    logFailTestcase(activeVersion.length > 0, `Get Active version failed!`);
    pushObjectToDataArrayWithUniqueKey("activeVersionOfProduct", activeVersion);

    const urlOfProductVersion = await globalBrowserWindowHandle.getCurrentUrl();
    pushObjectToDataArrayWithUniqueKey("urlOfProductVersion", urlOfProductVersion);
});

When("User opens the active version on product details", async () => {
    let temp = await productDetailsProductBuilder.openProductVersionDetailWithActiveStatus();
    logFailTestcase(temp, `Open Product version with status Active failed!`);
});

When("User opens the draft version on product details", async () => {
    let temp = await productDetailsProductBuilder.openProductVersionDetailWithDraftStatus();
    logFailTestcase(temp, `Open Product version with status Draft failed!`);
});

When("User clones new version for product and reorder questions {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];

    const ProductName = row.ProductName;
    // Open draft version and save question list
    let temp = await productDetailsProductBuilder.openProductVersionDetailWithDraftStatus();
    logFailTestcase(temp, `Open Product version with status Draft failed!`);

    temp = await productVersionDetailProductBuilder.navigateToQuestionsTabProductVersion();
    logFailTestcase(temp, `Navigate to question tab failed!`);

    const version = await productVersionDetailProductBuilder.getVersionOfProduct();
    logFailTestcase(version.length > 0, `Get version failed!`);

    const initialListOfQuestions = await productVersionTabQuestionsProductBuilder.getListOfQuestions();
    logFailTestcase(initialListOfQuestions.length > 0, `Can Not get any question in list`);

    temp = await productDetailsProductBuilder.pressBackButton();
    logFailTestcase(temp, `Press back button failed!`);

    temp = await productDetailsProductBuilder.cloneProductByVersion(version.toLowerCase());
    logFailTestcase(temp, `Clone new version failed!`);

    temp = await productVersionDetailProductBuilder.validateValueAlertInfo("There are unsaved changes. Please save this product version before proceeding.");
    logFailTestcase(temp);

    temp = await productVersionDetailProductBuilder.validateValueProductTile(`PRODUCT ${ProductName.toUpperCase()} <NEW VERSION>`);
    logFailTestcase(temp, `Incorrect product title!`);


    temp = await productVersionDetailProductBuilder.navigateToQuestionsTabProductVersion();
    logFailTestcase(temp, `Navigate to question tab failed!`);

    temp = await productVersionTabQuestionsProductBuilder.dragAndDropQuestion(initialListOfQuestions[0], initialListOfQuestions[initialListOfQuestions.length - 1]);
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
});

Then("User reverts old version for product", async () => {
    const url = getValueDataOfDataTestExecution("urlOfProductVersion");
    const version = getValueDataOfDataTestExecution("activeVersionOfProduct");

    await login.navigate(url);
    let temp = await productDetailsProductBuilder.selectTheExistingProductVersion(version);
    logFailTestcase(temp, `Open version "${version}" failed!`);

    temp = await globalPageObject.pressActivateTab();
    logFailTestcase(temp, `Press Activate button failed!`);
    await globalPageObject.waitForProgressBarLoaded_v2();
});

When("User clones an active product version", async () => {
    const activeVersion = await productDetailsProductBuilder.getProductVersionDetailWithActiveStatus();
    logFailTestcase(activeVersion.length > 0, `Get Active version failed!`);

    pushObjectToDataArrayWithUniqueKey("activeVersionOfProduct", activeVersion);
    const urlProductVersion = await globalBrowserWindowHandle.getCurrentUrl();
    pushObjectToDataArrayWithUniqueKey("urlProductVersion", urlProductVersion);

    let temp = await productDetailsProductBuilder.cloneProductByActiveVersion();
    logFailTestcase(temp, `Clones active version failed!`);
});