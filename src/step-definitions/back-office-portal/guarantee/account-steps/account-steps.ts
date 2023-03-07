import { Before, Then, When } from "@cucumber/cucumber";
import te from "date-fns/esm/locale/te/index.js";
import { AccountForm } from "../../../../page-objects/back-office-portal/general/account/account-forms/AccountForm";
import { AccountList } from "../../../../page-objects/back-office-portal/general/account/account-list/AccountList";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { AccountFormGuarantee } from "../../../../page-objects/back-office-portal/guarantee/account/account-forms/AccountFormGuarantee";
import { AccountFormInsurance } from "../../../../page-objects/back-office-portal/insurance/account/account-forms/AccountFormInsurance";
import { getObjectBisnode } from "../../../../shared/function-api-bisnode";
import { convertPathFileDataToDataRegression, logFailTestcase } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";


let accountForm: AccountForm;
let accountList: AccountList;
let globalPageObject: GlobalPageObject;
let accountFormInsurance: AccountFormInsurance;
let accountFormGuarantee: AccountFormGuarantee;
const loader = require("csv-load-sync");


Before(async function () {
  const context: ICommonContext = this.context;
  accountForm = new AccountForm(context.driverService);
  accountList = new AccountList(context.driverService);
  accountFormInsurance = new AccountFormInsurance(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
  accountFormGuarantee = new AccountFormGuarantee(context.driverService);
});

When("User inputs valid Bisnode data", async () => {
  let temp = await accountList.openCreateNewAccountCompanyForm();
  logFailTestcase(temp);
  const BisnodeNo = '937340303';
  temp = await accountForm.inputOrgNoNumerAndClickMagnifyingGlassIcon(BisnodeNo);
  logFailTestcase(temp, "inputOrgNoBasicInformationAccountCompanyForm fails");
})

Then("System shows Bisnode information in account form", async () => {
  const ObjectBisnode = await getObjectBisnode();
  const CompanyName = ObjectBisnode.companyInformation.companyName.registeredName.name;
  console.log(CompanyName);
  const CompanyPhone = ObjectBisnode.companyInformation.contactPoints.electronicContactPoints.phoneNumbers[0].fullNumber;
  console.log(CompanyPhone);
  const Country = 'Norway';
  const VisitingAddress = ObjectBisnode.companyInformation.contactPoints.registeredAddress.streetAddress.street;
  console.log(VisitingAddress);
  const PostCode = ObjectBisnode.companyInformation.contactPoints.registeredAddress.streetAddress.postalCode;
  console.log(PostCode);
  const City = ObjectBisnode.companyInformation.contactPoints.registeredAddress.streetAddress.town;
  console.log(City);
  const CreditScore = ObjectBisnode.risk.failureScores.currentScore.scoreValue;
  console.log(CreditScore);
  const CreditRating = ObjectBisnode.risk.creditRatings.currentCreditRating.code;
  console.log(CreditRating);
  const CompanyRegistrationDate =
    ObjectBisnode.companyInformation.registrationInformation.registrationDate.day + "/"
    + ObjectBisnode.companyInformation.registrationInformation.registrationDate.month + "/"
    + ObjectBisnode.companyInformation.registrationInformation.registrationDate.year;
  console.log(CompanyRegistrationDate);

  let temp = await accountFormGuarantee.assertDataFilledInAccountFormAfterIntegrateBisnode(
    CompanyName,
    '',
    CompanyPhone,
    Country,
    VisitingAddress,
    '',
    PostCode,
    City,
    CreditScore,
    CreditRating,
    '',
    '',
    CompanyRegistrationDate
  );
  logFailTestcase(temp, `Assert data filled in Account Form after integrate with Bisnode: OrgNo "937340303" failed!`);
})

When("User inputs valid Org No. data {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const OrgNo = rows[0].OrgNo;
  let temp = await accountList.openCreateNewAccountCompanyForm();
  logFailTestcase(temp);
  temp = await accountForm.inputOrgNoNumerAndClickMagnifyingGlassIcon(OrgNo);
  logFailTestcase(temp, "inputOrgNoBasicInformationAccountCompanyForm fails");
})

Then("System shows Org information in account form {string}", async (filename) => {
  const rows = loader(convertPathFileDataToDataRegression(filename));
  const OrgNo = rows[0].OrgNo;
  const CompanyName = rows[0].CompanyName;
  const Email = rows[0].Email;
  const Country = rows[0].Country;
  const VisitingAddress = rows[0].VisitingAddress;
  const Postcode = rows[0].Postcode;
  const City = rows[0].City;
  const CreditScore = rows[0].CreditScore;
  const CreditRating = rows[0].CreditRating;
  const IndustryCode = rows[0].IndustryCode;
  const Industry = rows[0].Industry;


  let temp = await accountFormGuarantee.validateOrgNoValueOnAccountCompanyForm(OrgNo);
  logFailTestcase(temp, "Validate Org No Failed");

  temp = await accountFormGuarantee.validateCompanyNameValueOnAccountCompanyForm(CompanyName);
  logFailTestcase(temp, "Validate Company Name failed");

  temp = await accountFormGuarantee.validateEmailAddressValueOnAccountCompanyForm(Email);
  logFailTestcase(temp, "Validate Email Address failed");;

  temp = await accountFormGuarantee.validateCountryValueOnAccountCompanyForm(Country);
  logFailTestcase(temp, "Validate Country failed");

  temp = await accountFormGuarantee.validateVisitingAddressValueOnAccountCompanyForm(VisitingAddress);
  logFailTestcase(temp, "Validate VisitingAddress failed");

  temp = await accountFormGuarantee.validateVisitingPostcodeValueOnAccountCompanyForm(Postcode);
  logFailTestcase(temp, "Validate Postcode failed");

  temp = await accountFormGuarantee.validateVisitingCityValueOnAccountCompanyForm(City);
  logFailTestcase(temp, "Validate City failed");

  temp = await accountFormGuarantee.validateCreditScoreValueOnAccountCompanyForm(CreditScore);
  logFailTestcase(temp, "Validate CreditScore failed");

  temp = await accountFormGuarantee.validateCreditRatingValueOnAccountCompanyForm(CreditRating);
  logFailTestcase(temp, "Validate CreditRating failed");

  temp = await accountFormGuarantee.validateIndustryCodeValueOnAccountCompanyForm(IndustryCode);
  logFailTestcase(temp, "Validate IndustryCode failed");

  temp = await accountFormGuarantee.validateIndustryValueOnAccountCompanyForm(Industry);
  logFailTestcase(temp, "Validate Industry failed");

})