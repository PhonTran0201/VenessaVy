

import { Before, Given, When } from "@cucumber/cucumber";
import { SeleniumWebDriverService } from "../../../../core/selenium-webdriver.service";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { GlobalPagination } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPagination";
import { ProductDetailsProductBuilder } from "../../../../page-objects/back-office-portal/general/product-builder/product-details/ProductDetailsProductBuilder";
import { convertPathFileDataToDataRegression, logFailTestcase } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";


let productDetailsProductBuilder: ProductDetailsProductBuilder;
let globalPageObject: GlobalPageObject;
const loader = require("csv-load-sync");

Before(async function () {
    const context: ICommonContext = this.context;
    productDetailsProductBuilder = new ProductDetailsProductBuilder(context.driverService);
    globalPageObject = new GlobalPageObject(context.driverService);
});


Given("User selects the existing product version on product details page {string}", async (filename) => {
    const row = loader(convertPathFileDataToDataRegression(filename))[0];

    // Để chọn version 3 phải chọn cuối trang
    // const globalPagination = new GlobalPagination(SeleniumWebDriverService.getInstance());
    // await globalPagination.pressDoubleRightButtonOnMainList();
    // await globalPageObject.waitForProgressBarLoaded_v2();

    const ProductVersion = row.ProductVersion;
    let temp = await productDetailsProductBuilder.findTheProductVersionOnTheList(ProductVersion);
    logFailTestcase(temp, `Can not find the Product Version '${ProductVersion}' on the list`);

    if (ProductVersion) {
        let temp = await productDetailsProductBuilder.selectTheExistingProductVersion(ProductVersion);
        logFailTestcase(temp, "select The Existing Product Version failed!");
    }
});

Given("User selects the product version {string} on product details page", async (ProductVersion) => {
    let temp = await productDetailsProductBuilder.findTheProductVersionOnTheList(ProductVersion);
    logFailTestcase(temp, `Can not find the Product Version '${ProductVersion}' on the list`);

    if (ProductVersion) {
        let temp = await productDetailsProductBuilder.selectTheExistingProductVersion(ProductVersion);
        logFailTestcase(temp, "select The Existing Product Version failed!");
    }
});

When(`User clones product from the product has version {string}`, async (ProductVersion) => {
    let temp = await productDetailsProductBuilder.findTheProductVersionOnTheList(ProductVersion);
    logFailTestcase(temp, `Can not find the Product Version '${ProductVersion}' on the list`);

    temp = await productDetailsProductBuilder.cloneProductByVersion(ProductVersion);
    logFailTestcase(temp, `Clone the Product Version '${ProductVersion}' failed!`);
});

When(`User presses {string} version on product version detail page`, async (buttonName) => {
    if (buttonName.localeCompare("Publish") === 0) {
        let temp = await productDetailsProductBuilder.pressPublishButton();
        logFailTestcase(temp);
    }
    else if (buttonName.localeCompare("Activate") === 0) {
        let temp = await productDetailsProductBuilder.pressActivateButton();
        logFailTestcase(temp);
    } else {
        logFailTestcase(false, `Can not find the button Name "${buttonName}" `);
    }
});