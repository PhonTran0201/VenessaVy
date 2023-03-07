import { By } from "selenium-webdriver";
import { DataRepo } from "../../../../../core/modals/DataRepo";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";
import { scenarioTags } from "../../../../../shared/variables";
import { PaymentOptionFormInsurance } from "./PaymentOptionFormInsurance";

export class PaymentOptionFormInsuranceVarsam extends PaymentOptionFormInsurance {
    constructor(driverService: SeleniumWebDriverService) {
        super(driverService);
    }


    protected cmbPaymentFrequencyCollapsed = By.xpath("//app-payment-option//div[./label[text()=' Payment Option ']]//ng-select");

    public async inputDataIntoSelectPaymentOptionForm(PaymentType: string, PaymentFrequency: string): Promise<boolean> {
        try {
            if (scenarioTags.has(`@PaymentOptionVarsam`)) {
                const data: any = await DataRepo.getInstance().loadMasterData("PaymentOption");
                PaymentFrequency = data[PaymentFrequency]
            }
            let ele = await this.getFieldType(this.cmbPaymentFrequencyCollapsed);
            await ele.setValue(PaymentFrequency);
            let eleButton = await this.getFieldType(this.btnOKSelectPaymentOptionEnabled);
            await eleButton.click();
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            return true;
        } catch (error) {
            console.log("inputDataIntoSelectPaymentOptionForm");
            console.log(error);
            return false;
        }
    }
}