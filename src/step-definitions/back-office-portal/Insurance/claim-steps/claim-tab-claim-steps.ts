import { Before, Then, When } from "@cucumber/cucumber";
import { GlobalPageObject } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPageObject";
import { GlobalPeripherals } from "../../../../page-objects/back-office-portal/general/GlobalPageObject/GlobalPeripherals";
import { ClaimTabClaimInsurance } from "../../../../page-objects/back-office-portal/insurance/claim/claim-details/tabs/claim-claim/claim-claim";
import { convertPathFileDataToDataRegression, logFailTestcase, randomModulus11ForSSN } from "../../../../shared/functions";
import { ICommonContext } from "../../../../shared/interfaces";
import { pushObjectToDataArrayWithUniqueKey } from "../../../../storage-data/functions/data-test-execution";


const loader = require("csv-load-sync");

let claimTabClaimInsurance: ClaimTabClaimInsurance;

let globalPageObject: GlobalPageObject;
let globalPeripherals: GlobalPeripherals;


Before(async function () {
  const context: ICommonContext = this.context;
  claimTabClaimInsurance = new ClaimTabClaimInsurance(context.driverService);
  globalPageObject = new GlobalPageObject(context.driverService);
  globalPeripherals = new GlobalPeripherals(context.driverService);
});

When("User inputs valid data to Claimant section at Claim tab {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  let Organization = row.Organization;
  const FirstName = row.FirstName;
  const LastName = row.LastName;
  const Address = row.Address;
  const Postcode = row.Postcode;
  const City = row.City;
  const Country = row.Country;
  const PhoneNumber = row.PhoneNumber;
  const EmailAddress = row.EmailAddress;
  const Type = row.Type;
  await globalPageObject.waitForProgressBarLoaded_v2();
  await globalPageObject.waitForProgressBarLoaded_v2();
  if (!Organization) {
    Organization = randomModulus11ForSSN();
  }
  pushObjectToDataArrayWithUniqueKey("Organization_recipient", Organization);

  if (Type) logFailTestcase(await claimTabClaimInsurance.selectType(Type), "select Type failed!");
  if (Organization) logFailTestcase(await claimTabClaimInsurance.inputValueClaimant("NIN / Organisation No.", Organization), "Input NIN/ Org No. falied!");
  if (FirstName) logFailTestcase(await claimTabClaimInsurance.inputValueClaimant("First Name", FirstName), "Input First Name failed!");
  if (LastName) logFailTestcase(await claimTabClaimInsurance.inputValueClaimant("Last Name", LastName), "Input Last Name failed!");
  if (Address) logFailTestcase(await claimTabClaimInsurance.inputValueClaimant("Address", Address), "Input Address failed!");
  if (Postcode) logFailTestcase(await claimTabClaimInsurance.inputValueClaimant("Postcode", Postcode), "Input Postcode failed!");
  if (City) logFailTestcase(await claimTabClaimInsurance.inputValueClaimant("City", City), "Input City failed!");
  if (Country) logFailTestcase(await claimTabClaimInsurance.inputValueClaimant("Country", Country), "Input Country failed!");
  if (PhoneNumber) logFailTestcase(await claimTabClaimInsurance.inputValueClaimant("Phone Number", PhoneNumber), "Input Phone Number failed!");
  if (EmailAddress) logFailTestcase(await claimTabClaimInsurance.inputValueClaimant("Email Address", EmailAddress), "Input Email Address failed!");

  let temp = await claimTabClaimInsurance.UnAddToRecipientList();
  logFailTestcase(temp, 'System still Updates To Recipient List');
});

When("User inputs valid data to Claim details section at Claim tab {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  const DateOccurred = row.DateOccurred;
  const TimeOccurred = row.TimeOccurred;
  const LocationAtWhichLossOccurred = row.LocationAtWhichLossOccurred;
  const DescriptionOfLossInDetails = row.DescriptionOfLossInDetails;
  const HowWasItCaused = row.HowWasItCaused;
  const WasAnotherPersonResponsibleForTheLoss = row.WasAnotherPersonResponsibleForTheLoss;
  const WereThereAnyWitnessesToTheLoss = row.WereThereAnyWitnessesToTheLoss;
  const NameAndContactOfPersonResponsible = row.NameAndContactOfPersonResponsible;
  const NameAndContactWitnesses = row.NameAndContactWitnesses;

  if (DateOccurred) {
    logFailTestcase(await claimTabClaimInsurance.inputDateOccuredClaimDetails(DateOccurred), "Input Date Occurred failed!");
  }
  if (TimeOccurred) {
    logFailTestcase(await claimTabClaimInsurance.inputTimeOccuredClaimDetails(TimeOccurred), "Input Time Occurred failed!");
  }
  if (DescriptionOfLossInDetails) {
    logFailTestcase(await claimTabClaimInsurance.inputDescriptionOfLossInDetailClaimDetails(DescriptionOfLossInDetails), "Input Description of Loss, Damage,.. failed!");
  }
  if (HowWasItCaused) {
    logFailTestcase(await claimTabClaimInsurance.inputHowWasItCausedClaimDetails(HowWasItCaused), "Input How was it caused? failed!");
  }
  if (WasAnotherPersonResponsibleForTheLoss) {
    logFailTestcase(await claimTabClaimInsurance.inputWasAnotherPersonResponsibleForTheLossClaimDetails(WasAnotherPersonResponsibleForTheLoss), "Select Yes/No Was Another Person Responsible for The Loss, Damage,... failed!");
  }
  if (WereThereAnyWitnessesToTheLoss) {
    logFailTestcase(await claimTabClaimInsurance.inputWereThereAnyWitnessesToTheLossClaimDetails(WereThereAnyWitnessesToTheLoss), "Select Yes/No Were There Any Witnesses To The Loss, Damage,... failed!");
  }
  if (NameAndContactOfPersonResponsible) {
    logFailTestcase(await claimTabClaimInsurance.inputNameAndContactPersonResponsibleOfTheLossClaimDetails(NameAndContactOfPersonResponsible), "Input Name and Contact Person responsible for The Loss failed!");
  }
  if (NameAndContactWitnesses) {
    logFailTestcase(await claimTabClaimInsurance.inputNameAndContactWitnessesToTheLossClaimDetail(NameAndContactWitnesses), "Input Name and Contact Witnesses to The Loss failed!");
  }
});

When("User inputs valid data to Others section at Claim tab {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  const AdditionalInformation = row.AdditionalInformation;

  if (AdditionalInformation) {
    logFailTestcase(await claimTabClaimInsurance.inputAdditionalInformationOthers(AdditionalInformation), "Input Additional Information failed!");
  }
});
Then("User checks all input data are removed on Claimant section at Claim tab", async () => {
  if (await claimTabClaimInsurance.getValueClaimant("NIN / Organisation No.")) {
    logFailTestcase(false, "Remove data at Organization failed!");
  }
  if (await claimTabClaimInsurance.getValueClaimant("First Name")) {
    logFailTestcase(false, "Remove data at First Name failed!");
  }
  if (await claimTabClaimInsurance.getValueClaimant("Last Name")) {
    logFailTestcase(false, "Remove data at Last Name failed!");
  }
  if (await claimTabClaimInsurance.getValueClaimant("Address")) {
    logFailTestcase(false, "Remove data at Address failed!");
  }
  if (await claimTabClaimInsurance.getValueClaimant("Postcode")) {
    logFailTestcase(false, "Remove data at Postcode failed!");
  }
  if (await claimTabClaimInsurance.getValueClaimant("City")) {
    logFailTestcase(false, "Remove data at City failed!");
  }
  if (await claimTabClaimInsurance.getValueClaimant("Country")) {
    logFailTestcase(false, "Remove data at Country failed!");
  }
  if (await claimTabClaimInsurance.getValueClaimant("Phone Number")) {
    logFailTestcase(false, "Remove data at Phone Number failed!");
  }
  if (await claimTabClaimInsurance.getValueClaimant("Email Address")) {
    logFailTestcase(false, "Remove data at Email Address failed!");
  }
});

Then("User checks all input data are removed on Claim details section at Claim tab", async () => {
  if (await claimTabClaimInsurance.getValueDateOccuredClaimDetails()) {
    logFailTestcase(false, "Remove data at Date Occurred failed!");
  }
  if (await claimTabClaimInsurance.getValueTimeOccuredClaimDetails()) {
    logFailTestcase(false, "Remove data at Time Occurred failed!");
  }
  if (await claimTabClaimInsurance.getValueDescriptionOfLossInDetailClaimDetails()) {
    logFailTestcase(false, "Remove data at Description Of Loss, Damage,... failed!");
  }
  if (await claimTabClaimInsurance.getValueHowWasItCausedClaimDetails()) {
    logFailTestcase(false, "Remove data at How was It caused? failed!");
  }
  if (await claimTabClaimInsurance.getValueWasAnotherPersonResponsibleForTheLossClaimDetails('yes') || await claimTabClaimInsurance.getValueWasAnotherPersonResponsibleForTheLossClaimDetails('no')) {
    logFailTestcase(false, "Remove data at Was Another Person Responsible for the Loss failed!");
  }
  if (await claimTabClaimInsurance.getValueWereThereAnyWitnessesToTheLossClaimDetails('yes') || await claimTabClaimInsurance.getValueWereThereAnyWitnessesToTheLossClaimDetails('no')) {
    logFailTestcase(false, "Remove data at Were There any Witnesses To the Loss, Damage,.. failed!");
  }
});


Then("User verifies info on Claimant section at Claim tab {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  const Organization = row.Organization;
  const CustomerType = row.CustomerType;
  const FirstName = row.FirstName;
  const LastName = row.LastName;
  const CompanyName = row.CompanyName;
  const Address = row.Address;
  const Postcode = row.Postcode;
  const City = row.City;
  const Country = row.Country;
  const PhoneNumber = row.PhoneNumber;
  const EmailAddress = row.EmailAddress;
  await globalPageObject.waitForProgressBarLoaded_v2();
  await globalPeripherals.pressPageUpCurrentElement();
  await globalPeripherals.pressPageUpCurrentElement();
  if (Organization) logFailTestcase(await claimTabClaimInsurance.validateValueClaimant("NIN / Organisation No.", Organization));
  if (CustomerType) logFailTestcase(await claimTabClaimInsurance.validateTypeValueClaimant(CustomerType));
  if (FirstName) logFailTestcase(await claimTabClaimInsurance.validateValueClaimant("First Name", FirstName));
  if (LastName) logFailTestcase(await claimTabClaimInsurance.validateValueClaimant("Last Name", LastName));
  if (CompanyName) logFailTestcase(await claimTabClaimInsurance.validateValueClaimant("Company Name", CompanyName));
  if (Address) logFailTestcase(await claimTabClaimInsurance.validateValueClaimant("Address", Address));
  if (Postcode) logFailTestcase(await claimTabClaimInsurance.validateValueClaimant("Postcode", Postcode));
  if (City) logFailTestcase(await claimTabClaimInsurance.validateValueClaimant("City", City));
  if (Country) logFailTestcase(await claimTabClaimInsurance.validateCountryValueClaimant(Country));
  if (PhoneNumber) logFailTestcase(await claimTabClaimInsurance.validateValueClaimant("Phone Number", PhoneNumber));
  if (EmailAddress) logFailTestcase(await claimTabClaimInsurance.validateValueClaimant("Email Address", EmailAddress));
});
Then("User verifies on Claim details section at Claim tab {string}", async (filename) => {
  // Not yet implemented
});


When("User selects the recipient from the recipient list {string}", async (filename) => {
  const row = loader(convertPathFileDataToDataRegression(filename))[0];
  const Recipient = row.Recipient;

  let temp = await claimTabClaimInsurance.inputValueClaimant("or select from Recipient List", Recipient);
  logFailTestcase(temp, "Input or select from Recipient List falied!");
});

When("User ticks checkbox to add claimant to recipient list", () => {

});

When("User clicks Copy from Policyholder button", async () => {
  let temp = await claimTabClaimInsurance.clickCopyFromPolicyholderButton();
  logFailTestcase(temp, 'click Copy From Policyholder Button failed!')
});
