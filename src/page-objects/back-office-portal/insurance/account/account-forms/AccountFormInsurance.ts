import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2, waitUntilHorizontalProgressBarLoaded, logWarningMessage } from "../../../../../shared/functions";
import { AccountForm } from "../../../general/account/account-forms/AccountForm";


export class AccountFormInsurance extends AccountForm {
    constructor(driverService: SeleniumWebDriverService) {
        super(driverService);
    }

    public async assertafterpresseditorigo() {
        let editcreditscore: string;
        let editpostcode: string;
        let editeducation: string;
        let editregistration: string;

        editcreditscore = await this.driverService.getText(this.txtCreditScore);
        editpostcode = await this.driverService.getText(this.txtPostalPostcode);
        editeducation = await this.driverService.getText(this.cmbEducationaLevel);
        editregistration = await this.driverService.getText(this.dtpCompanyRegistrationDate);

        this.driverService.validateTestCase(
            "[TC] [Accounts] Update Origo Account",
            [editcreditscore, "", "Assert at Creditscore: Empty Creditscrore"],
            [editpostcode, "", "Assert at Postcode: Empty Postcode"],
            [editeducation, "", "Assert at Education: Empty Education"],
            [editregistration, "", "Assert at Registration: Empty Registration"]
        );
    }

    public async openEditOrigoAccountFormByName_OrgNo(selectedAccount: string, SelectedOrgNo: string): Promise<boolean> {
        try {
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await this.driverService.waitUntilElementLoaded(By.xpath('(//app-account-name-column//a)[1]'));
            for (let i = 1; i <= 30; i++) {
                let lblName = By.xpath(`(//table//tr[${i}]//td[contains(@class,'pgs-cus-name')]//*[self::*[text()]])[last()]`);
                let lblOrgNo = By.xpath(`//table//tr[${i}]//td[contains(@class,'pgs-cus-ssn')]//*[self::*[text()]]`);
                if (!(await this.driverService.isExisted(lblName))) {
                    break;
                }
                else {
                    if (
                        (await this.driverService.getText(lblName)).localeCompare(selectedAccount) === 0 &&
                        (await this.driverService.getText(lblOrgNo)).localeCompare(SelectedOrgNo) === 0
                    ) {
                        let btnEdit = By.xpath(`(//app-customer-act-column/button//*[contains(@class,'fa-edit')])[${i}]`);
                        await this.driverService.click(btnEdit);
                        await waitUntilHorizontalProgressBarLoaded(this.driverService);
                        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
                        await this.driverService.click(this.btnSearchOrgNo);
                        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
                        await this.assertafterpresseditorigo();
                        return true;
                    }
                }
            }
            logWarningMessage(`Can't find account with name \"${selectedAccount}\" into Account List`);
            return false;
        } catch (error) {
            console.log("openEditOrigoAccountFormByName_OrgNo");
            logWarningMessage(`Open Origo account with name "${selectedAccount}" and OrgNo "${SelectedOrgNo}": failed!`);
            console.log(error);
            return false;
        }
    }

    public async assertDataFilledInAccountFormAfterIntegrateCreditsafe(
        CompanyName: string,
        EmailAddress: string,
        CompanyPhone: string,
        Country: string,
        VisitingAddress: string,
        ExtraAddress: string,
        Postcode: string,
        City: string,
        CreditScore: string,
        CreditRating: string,
        IndustryCode: string,
        Industry: string,
        CompanyRegristrationDate: string
    ): Promise<boolean> {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtCompanyName);

            let actualCompanyName = await this.driverService.getAttributeValue(this.txtCompanyName, 'value');
            let actualEmailAddress = await this.driverService.getAttributeValue(this.txtEmailAddressCompany, 'value');
            let actualCompanyPhone = await this.driverService.getAttributeValue(this.txtCompanyPhone, 'value');

            let txtCountry = By.xpath("//ng-select[contains(@class,'pgs-json-schema-control-country')]//span[contains(@class,'ng-value-label')]");
            let actualCountry = await this.driverService.getText(txtCountry);
            let actualVisitingAddress = await this.driverService.getAttributeValue(this.txtVisitingAddress, 'value');
            let actualExtraAddress = await this.driverService.getAttributeValue(this.txtVisitingExtraAddress, 'value');
            let actualPostcode = await this.driverService.getAttributeValue(this.txtVisitingPostcode, 'value');
            let actualCity = await this.driverService.getAttributeValue(this.txtVisitingCity, 'value');
            let actualCreditScore = await this.driverService.getAttributeValue(this.txtCreditScore, 'value');
            let actualCreditRating = await this.driverService.getAttributeValue(this.cmbCreditRating, 'value');

            let txtIndustryCode = By.xpath("//ng-select[contains(@class,'pgs-json-schema-control-industry-code')]//span[contains(@class,'ng-value-label')]");
            let actualIndustryCode = await this.driverService.getText(txtIndustryCode);
            let actualIndustry = await this.driverService.getAttributeValue(this.cmbIndustry, 'value');
            let actualCompanyRegristrationDate = await this.driverService.getAttributeValue(this.dtpCompanyRegistrationDate, 'value');


            return this.driverService.validateRecord(
                "assert Data Filled In Account Form After Integrate Creditsafe",
                [actualCompanyName, CompanyName, "Incorrect at Company Name!"],
                // [actualEmailAddress, EmailAddress, "Incorrect at Email Address!"],
                // [actualCompanyPhone, CompanyPhone, "Incorrect at Company Phone!"],
                [actualCountry, Country, "Incorrect at Country!"],
                [actualVisitingAddress, VisitingAddress, "Incorrect at Visiting Address!"],
                // [actualExtraAddress, ExtraAddress,"Incorrect at ExtraAddress!"],
                [actualPostcode, Postcode, "Incorrect at Postcode!"],
                [actualCity, City, "Incorrect at City!"],
                // [actualCreditScore, CreditScore, "Incorrect at Credit Score!"],
                // [actualCreditRating, CreditRating, "Incorrect at Credit Rating!"],
                [actualIndustryCode, IndustryCode, "Incorrect at Industry code!"],
                // [actualIndustry, Industry, "Incorrect at Industry!"],
                [actualCompanyRegristrationDate, CompanyRegristrationDate, "Incorrect at Company Regristration Date!"]
            );
        } catch (error) {
            console.log("assertDataFilledInAccountFormAfterIntegrateCreditsafe");
            console.log(error);
            return false;
        }
    }
}

