import { Before, When } from "@cucumber/cucumber";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { SaleForm } from "../../../../page-objects/back-office-portal/general/sale/sale-forms/SaleForm";
import { convertPathFileDataToDataRegression, getCurrentDateTime, logFailTestcase } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { DataRepo } from './../../../../core/modals/data_repo';


const loader = require("csv-load-sync");
let saleForm: SaleForm;
let globalPageObject: GlobalPageObject;

Before(async function () {
    const context: ICommonContext = this.context;
    saleForm = new SaleForm(context.driverService);
    globalPageObject = new GlobalPageObject(context.driverService);
});

When("User inputs valid data into sale form {string}", async (filename) => {
    const rows = loader(convertPathFileDataToDataRegression(filename));
    const row = rows[0];
    //#region Declare variable
    //#region Sales section
    const Pipeline = row.Pipeline;
    const Stage = row.Stage;
    const SaleName = row.SaleName;
    const Product = row.Product;
    const SalesRep = row.SalesRep;
    const Currency = row.Currency;
    const Amount = row.Amount;
    const ClosedDate = row.ClosedDate;
    const Team = row.Team;
    const TeamMember = row.TeamMember;
    const Phone = row.Phone;
    const TimeToCall = row.TimeToCall;
    const AnnualContractValue = row.AnnualContractValue;
    const CloseQuarter = row.CloseQuarter;
    const Type = row.Type;
    const DealSource = row.DealSource;
    const ProductPL = row.ProductPL;
    const DealStatus = row.DealStatus;
    const Region = row.Region;
    const Capex = row.Capex;
    const RiskChallenges = row.RiskChallenges;
    const Arr = row.Arr;
    const Maintenance = row.Maintenance;
    const ProfessionalService = row.ProfessionalService;
    const DealPeriod = row.DealPeriod;
    const Description = row.Description;
    //#endregion

    //#region Contact
    // const ChooseFromExistingContact = row.ChooseFromExistingContact;
    const FirstNameContact = row.FirstNameContact;
    const LastNameContact = row.LastNameContact;
    const EmailContact = row.EmailContact;
    const PhoneContact = row.PhoneContact;
    //#endregion
    //#endregion
    let temp = true;

    await globalPageObject.waitForSeconds(6000);
    //#region Input valudes
    //#region Sales section
    if (Pipeline) {
        temp = await saleForm.inputPipelineSalesOnSaleForm(Pipeline);
        logFailTestcase(temp, "Input Pipeline on Sale form failed!");
    }
    if (Stage) {
        temp = await saleForm.inputSalesStageSalesAccountInfoOnSaleForm(Stage);
        logFailTestcase(temp, "Input Stage on Sale form failed!");
    }
    if (SaleName) {
        temp = await saleForm.inputSaleNameSalesOnSaleForm(SaleName);
        logFailTestcase(temp, "Input SaleName on Sale form failed!");
    }
    if (Product) {
        temp = await saleForm.inputProductSalesOnSaleForm(Product);
        logFailTestcase(temp, "Input Product on Sale form failed!");
    }
    if (SalesRep) {
        temp = await saleForm.inputSalesRepSalesOnSaleForm(SalesRep);
        logFailTestcase(temp, "Input SalesRep on Sale form failed!");
    }
    if (Currency) {
        temp = await saleForm.inputCurrencySalesOnSaleForm(Currency);
        logFailTestcase(temp, "Input Currency on Sale form failed!");
    }
    if (Amount) {
        temp = await saleForm.inputTotalDealAmountSalesOnSaleForm(Amount);
        logFailTestcase(temp, "Input Amount on Sale form failed!");
    }
    if (ClosedDate) {
        temp = await saleForm.inputClosedDateSalesOnSaleForm(ClosedDate);
        logFailTestcase(temp, "Input ClosedDate on Sale form failed!");
    }
    if (Team) {
        temp = await saleForm.inputTeamOnSaleForm(Team);
        logFailTestcase(temp, `Input Team failed!`);
    }
    if (TeamMember) {
        temp = await saleForm.inputTeamMemberOnSaleForm(TeamMember);
        logFailTestcase(temp, `Input TeamMember failed!`);
    }
    if (Phone) {
        temp = await saleForm.inputPhoneOnSaleForm(Phone);
        logFailTestcase(temp, `Input Phone failed!`);
    }
    if (TimeToCall) {
        temp = await saleForm.inputTimeToCallOnSaleForm(TimeToCall);
        logFailTestcase(temp, `Input TimeToCall failed!`);
    }
    if (AnnualContractValue) {
        temp = await saleForm.inputAnnualContractValueSalesOnSaleForm(AnnualContractValue);
        logFailTestcase(temp, "Input AnnualContractValue on Sale form failed!");
    }
    if (CloseQuarter) {
        temp = await saleForm.inputCloseQuarterSalesOnSaleForm(CloseQuarter);
        logFailTestcase(temp, "Input CloseQuarter on Sale form failed!");
    }
    if (Type) {
        temp = await saleForm.inputSalesTypeSalesOnSaleForm(Type);
        logFailTestcase(temp, "Input Type  on Sale form failed!");
    }
    if (DealSource) {
        temp = await saleForm.inputDealSourceSalesOnSaleForm(DealSource);
        logFailTestcase(temp, "Input DealSource on Sale form failed!");
    }
    if (ProductPL) {
        temp = await saleForm.inputProductPlSalesOnSaleForm(ProductPL);
        logFailTestcase(temp, "Input ProductPL on Sale form failed!");
    }
    if (DealStatus) {
        temp = await saleForm.inputDealStatusSalesOnSaleForm(DealStatus);
        logFailTestcase(temp, "Input DealStatus on Sale form failed!");
    }
    if (Region) {
        temp = await saleForm.inputRegionSalesOnSaleForm(Region);
        logFailTestcase(temp, "Input Region on Sale form failed!");
    }
    if (Capex) {
        temp = await saleForm.inputCAPEXSalesOnSaleForm(Capex);
        logFailTestcase(temp, "Input Capex on Sale form failed!");
    }
    if (RiskChallenges) {
        temp = await saleForm.inputRisksChallengesSalesOnSaleForm(RiskChallenges);
        logFailTestcase(temp, "Input RiskChallenges on Sale form failed!");
    }
    if (Arr) {
        temp = await saleForm.inputARRSalesOnSaleForm(Arr);
        logFailTestcase(temp, "Input  on Sale form failed!");
    }
    if (Maintenance) {
        temp = await saleForm.inputLicenseAndMaintenanceSalesOnSaleForm(Maintenance);
        logFailTestcase(temp, "Input Maintenance on Sale form failed!");
    }
    if (ProfessionalService) {
        temp = await saleForm.inputProfessionalServiceSalesOnSaleForm(ProfessionalService);
        logFailTestcase(temp, "Input ProfessionalService on Sale form failed!");
    }
    if (DealPeriod) {
        temp = await saleForm.inputDealPeriodSalesOnSaleForm(DealPeriod);
        logFailTestcase(temp, "Input DealPeriod on Sale form failed!");
    }
    if (Description) {
        temp = await saleForm.inputDescriptionSalesOnSaleForm(Description);
        logFailTestcase(temp, "Input Description on Sale form failed!");
    }
    //#endregion

    //#region Contact section
    if (FirstNameContact) {
        temp = await saleForm.inputFirstNameContactOnSaleForm(FirstNameContact);
        logFailTestcase(temp, "Input FirstNameContact on Sale form failed!");
    }
    if (LastNameContact) {
        temp = await saleForm.inputLastNameContactOnSaleForm(LastNameContact);
        logFailTestcase(temp, "Input LastNameContact on Sale form failed!");
    }
    if (EmailContact) {
        temp = await saleForm.inputEmailContactOnSaleForm(EmailContact);
        logFailTestcase(temp, "Input EmailContact on Sale form failed!");
    }
    if (PhoneContact) {
        temp = await saleForm.inputPhoneContactOnSaleForm(PhoneContact);
        logFailTestcase(temp, "Input PhoneContact on Sale form failed!");
    }
});
    //#endregion

//@VARSAM @SALE
When('User fills data for Create Sale form {string}', async function (dataKey: string) {
        try {
            let data = await DataRepo.getInstance().getFieldValue(dataKey);
            await saleForm.inputFirstNameAccountInfoOnSaleForm(data.FirstName)
            await saleForm.inputLastNameAccountInfoOnSaleForm(data.LastName)
            await saleForm.inputEmailAccountInfoOnSaleForm(data.Email)
            await saleForm.inputKAMAccountInfoOnSaleForm(data.KAM)
            await saleForm.inputSalesStageSalesAccountInfoOnSaleForm(data.SalesStage)
            await saleForm.inputSaleNameSalesOnSaleForm(data.SalesName)
            await saleForm.inputSalesRepSalesOnSaleForm(data.SalesRep)
            await saleForm.inputProductSalesOnSaleForm(data.Product)
            await saleForm.inputTeamOnSaleForm(data.Team)
            await saleForm.inputTeamMemberOnSaleForm(data.TeamMember)
            await saleForm.inputPhoneOnSaleForm(data.Phone)
            await saleForm.inputTotalDealAmountSalesOnSaleForm(data.Amount)
            await saleForm.inputDescriptionSalesOnSaleForm(data.Description)
            await saleForm.saveCreateSalePerson();
        } catch (error) {
            logFailTestcase(false, (error as Error).message + "\r\n" + (error as Error).stack);
        }
});

When("User fills data for Edit Sale form {string}", async (dataKey) => {
    try {
        let data = await DataRepo.getInstance().getFieldValue(dataKey)
        await saleForm.inputPipelineSalesOnSaleForm(data.Pipeline)
        await saleForm.inputSalesStageSalesAccountInfoOnSaleForm(data.SalesStage)
        await saleForm.inputSaleNameSalesOnSaleForm(data.SalesName)
        await saleForm.inputSalesRepSalesOnSaleForm(data.SalesRep)
        await saleForm.inputTeamOnSaleForm(data.Team)
        await saleForm.inputTeamMemberOnSaleForm(data.TeamMember)
        await saleForm.inputPhoneOnSaleForm(data.Phone)
        await saleForm.inputTimeToCallOnSaleForm(data.TimeToCall)
        await saleForm.inputTotalDealAmountSalesOnSaleForm(data.Amount)
        await saleForm.inputDescriptionSalesOnSaleForm(data.Description)
        await saleForm.saveCreateSalePerson();
    } catch (error) {
        logFailTestcase(false, (error as Error).message + "\r\n" + (error as Error).stack);
    }
})
When("User verifies data is correct at Edit Sale form {string}", async function (dataKey) {
    try {
        let data = await DataRepo.getInstance().getFieldValue(dataKey);
        await saleForm.validateValueSaleForm(data.Pipeline, "Pipeline");
        await saleForm.validateValueSaleForm(data.SalesStage, "Sales Stage");
        await saleForm.validateValueSaleForm(data.SalesName, "Sales Name");
        await saleForm.validateValueSaleForm(data.SalesRep, "Sales Rep.");
        await saleForm.validateValueSaleForm(data.Product, "Product");
        await saleForm.validateValueSaleForm(data.CloseDate, "Close Date");
        await saleForm.validateValueSaleForm(data.Team, "Team");
        await saleForm.validateValueSaleForm(data.TeamMember, "Team Member");
        await saleForm.validateValueSaleForm(data.Phone, "Phone");
        if (data.TimeToCall) {
            await saleForm.validateValueSaleForm(data.TimeToCall, "Time To Call");
        }
        else {
            await saleForm.validateValueSaleForm(getCurrentDateTime(true), "Time To Call");
        }
        await saleForm.validateValueSaleForm(data.Amount, "Amount");
        await saleForm.validateValueSaleForm(data.Description, "Description");
        await saleForm.pressCloseSaleFormButton()
    } catch (error) {
        logFailTestcase(false, (error as Error).message + "\r\n" + (error as Error).stack);
    }
})

