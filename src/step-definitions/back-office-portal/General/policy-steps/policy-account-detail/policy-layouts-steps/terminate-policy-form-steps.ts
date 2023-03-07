import { Before, Then, When } from "@cucumber/cucumber";
import { TerminatePolicyFormInsurance } from "../../../../../../page-objects/back-office-portal/insurance/policy/policy-layout/TerminatePolicyFormInsurance";
import { CreatingQuoteInsurance } from "../../../../../../page-objects/back-office-portal/insurance/quote/quote-layout/CreatingQuoteInsurance";
import { convertPathFileDataToDataRegression, logFailTestcase } from "../../../../../../shared/functions";
import { ICommonContext } from "../../../../../../shared/interfaces";
import { numberToCurrency } from "../../../../../../shared/tenant-setting/tenant-setting";

let terminatePolicyFormInsurance: TerminatePolicyFormInsurance;
let creatingQuoteInsurance: CreatingQuoteInsurance;

const loader = require("csv-load-sync");
Before(async function () {
    const context: ICommonContext = this.context;
    terminatePolicyFormInsurance = new TerminatePolicyFormInsurance(context.driverService);
    creatingQuoteInsurance = new CreatingQuoteInsurance(context.driverService);
});

When("User inputs valid data into Terminate Policy form {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));

    const EffectiveFrom = rows[0].EffectiveFrom;
    const Reason = rows[0].Reason;
    let temp = await terminatePolicyFormInsurance.inputDataToTerminatePolicyForm(EffectiveFrom, Reason);
    logFailTestcase(temp, "Input data to Terminate policy form failed!");
});

Then("User verifies New Premium on Terminate Policy form {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));

    const currency = rows[0].Currency;
    const NewPremium = numberToCurrency(rows[0].NewPremium,true, currency);
    let temp = await terminatePolicyFormInsurance.validateNewPremiumTerminatePolicyForm(NewPremium);
    logFailTestcase(temp);
});

