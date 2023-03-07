import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded, logInfoMessage, waitUntilHorizontalProgressBarLoaded_v2, selectDropdownOption, logSuccessMessage, logFailMessage } from "../../../../../shared/functions";
import { dataTestcase } from "../../../../../shared/variables";
import { GlobalDateTimeContainer } from "../../../general/GlobalPageObject/GlobalDateTimeContainer";

const remote = require("selenium-webdriver/remote");

/**
 * This page object contains Quote Questions
 */
export class GlobalQuoteInsurance extends BasePage {
    
    public static description: string = "";
    public static product: string = "";
    public static state: string = "default";
    public static policyTerm: string = "default";
    public static premium: string = "";
    public static status: string = "default";

    private ClickNextBtn = By.xpath("//*[contains(text(),'Next') and @class='btn btn-primary-light' and not(@disabled)]");
    private EffectiveDateField = By.xpath("//input[@id='effectiveDate']");

    private BackToQuoteListBtn = By.xpath('//*[@id="btn-back-to-list"]');
    private QuoteRefNum = By.xpath("//h2[@class='quote-ref']");

    private startDateField = By.xpath('//*[@id="startDate"]');

    private firstQuote = By.xpath("(//app-customer-quote-list-widget//app-edit-link-col/a)[1]");


    public async clickNext() {
        try {
            await this.driverService.waitUntilElementVisible(this.ClickNextBtn);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await this.driverService.pressTab(this.ClickNextBtn);
            await this.driverService.click(this.ClickNextBtn);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            return true;
        } catch (error) {
            console.log(error);
            console.log("clickNext");
            return false;
        }
    }

    //backToQuoteListBtn
    public async clickBackToQuoteList() {
        try {
            await this.driverService.waitUntilElementVisible(this.BackToQuoteListBtn);
            await this.driverService.click(this.BackToQuoteListBtn);
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
        } catch (error) {
            console.log(error);
        }
    }

    public async inputCreateQuoteEffectiveDate(EffectiveDate: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.EffectiveDateField);
            await this.driverService.setText(this.EffectiveDateField, EffectiveDate);
            return true;
        } catch (error) {
            console.log("inputCreateQuoteEffectiveDate");
            console.log(error);
            return false;
        }
    }

    //DO NOT CHANGE

    // public async getRefNumber() {
    //     try {
    //         let quoteRefNumber = await this.driverService.getText(this.QuoteRefNum);
    //         dataTestcase[dataTestcase.length - 1].nameField = quoteRefNumber.replace(/\D/g, "");
    //         logInfoMessage(`\tCreate Quote: ${quoteRefNumber} was created!`);
    //         return true;
    //     } catch (error) {
    //         console.log("get Ref Number");
    //         console.log(error);
    //         return false;
    //     }
    // }

    public async getRefNumber() {
        try {
            await this.driverService.waitUntilElementVisible(this.QuoteRefNum);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 100);
            const result = (await this.driverService.getText(this.QuoteRefNum)).replace(/\D/g, "");;
            return result;
        } catch (error) {
            console.log('getRefNumber');
            console.log(error);
            return '';
        }
    }
    //In case of create multiple quotes at account detail

    public async assertQuotesAtQuoteWidget(
        selectedRow: number,
        expectedProduct_QuoteRef: string,
        expectedPremium: string): Promise<boolean> {
        try {
            let hrefProduct_QuoteRef = By.xpath(`(//app-customer-latest-quote//app-entity-details-link/a)[${selectedRow}]`);
            let lblPremium = By.xpath(`(//app-customer-latest-quote//app-customer-details-link/following-sibling::div[2])[${selectedRow}]`);
            let reloadbutton = By.xpath(`(//app-customer-summary//button[contains(@class,'circle')])[1]`);


            await this.driverService.waitUntilElementVisible(hrefProduct_QuoteRef);
            await this.driverService.waitForSeconds(2000);
            await this.driverService.click(reloadbutton);

            let actualProduct_QuoteRef = await this.driverService.getText(hrefProduct_QuoteRef);
            let actualPremium = await this.driverService.getText(lblPremium);


            let temp = await this.driverService.validateRecord(`Create quote - \"${expectedProduct_QuoteRef}\"`,
                [actualProduct_QuoteRef, expectedProduct_QuoteRef, "Assert at Product - Quote ref: Incorrect Product - Quote ref!"],
                [actualPremium, expectedPremium, "Assert at Premium: Incorrect Premium!"]
            );
            if (!temp) {
                return false;
            }

            return true;
        } catch (error) {
            console.log("assertQuotesAtQuoteWidget");
            console.log(error);
            return false;
        }
    }

    public async assertQuotesOrigoAtQuoteWidget(
        selectedRow: number,
        expectedProduct_QuoteRef: string,
        expectedPremium: string): Promise<boolean> {
        try {
            let hrefProduct_QuoteRef = By.xpath(`(//app-customer-latest-quote//app-entity-details-link/a)[${selectedRow}]`);
            let lblPremium = By.xpath(`(//app-customer-latest-quote//app-customer-details-link/following-sibling::div[2])[${selectedRow}]`);

            await this.driverService.waitUntilElementVisible(hrefProduct_QuoteRef);
            await this.driverService.waitForSeconds(2000);

            let actualProduct_QuoteRef = await this.driverService.getText(hrefProduct_QuoteRef);
            let actualPremium = await this.driverService.getText(lblPremium);


            let temp = await this.driverService.validateRecord(`Create quote - \"${expectedProduct_QuoteRef}\"`,
                [actualProduct_QuoteRef, expectedProduct_QuoteRef, "Assert at Product - Quote ref: Incorrect Product - Quote ref!"],
                [actualPremium, expectedPremium, "Assert at Premium: Incorrect Premium!"]
            );
            if (!temp) {
                return false;
            }

            return true;
        } catch (error) {
            console.log("assertQuotesAtQuoteWidget");
            console.log(error);
            return false;
        }
    }

    public async getStartDateForRenewPolicy() {
        try {
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await this.driverService.waitUntilElementVisible(this.startDateField);
            let startDate = await this.driverService.getAttributeValue(this.startDateField, 'value');
            startDate = startDate.substring(0, 10);
            return startDate;
        } catch (error) {
            console.log("getStartDateAtFirstPolicy");
            console.log(error);
            return "";
        }
    }

    public stringToNumberOnly(str: string) {
        return str.replace(/\D/g, "");
    }

    public async clickFirstQuote() {
        try {
            await this.driverService.waitUntilElementVisible(this.firstQuote);
            await this.driverService.click(this.firstQuote);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }




    //QUESTION FOR PRODUCT QUOTE

    //TRAVEL

    //Start Date 
    private StartDateField = By.xpath('//*[@id="startDate"]');

    //End Date
    private EndDateField = By.xpath('//*[@id="endDate"]');

    //Insured Person Name
    private InsuredPersonNameField = By.xpath('//*[@id="InsuredPersonNameTag"]');

    //Insured Person Age
    private InsuredPersonAgeField = By.xpath('//*[@id="InsuredPersonAgeTag"]');

    //Number Of Traveller
    private NumOfTravellerField = By.xpath('//*[@id="NoOfTravellers"]');
    private SingleAdultOpt = By.xpath('//*[@id="NoOfTravellers"]/option[1]');
    private TwoAdultsOpt = By.xpath('//*[@id="NoOfTravellers"]/option[2]');
    private FamilyOpt = By.xpath('//*[@id="NoOfTravellers"]/option[3]');
    private MoreThanFiveOpt = By.xpath('//*[@id="NoOfTravellers"]/option[4]');

    //Luggage Excess
    private LuggageExcessField = By.xpath('//*[@id="LuggageExcessTag"]//input');

    //Additional Cover
    private AdditionalCoverChoice = By.xpath('//*[contains(@id,"AdditionalCoverTag")]');
    private ChooseYesAC = By.xpath('//*[contains(@id,"AdditionalCoverTag")]/option[2]');
    private ChooseNoAC = By.xpath('//*[contains(@id,"AdditionalCoverTag")]/option[3]');

    //Company Name
    private CompanyNameField = By.xpath("//*[@id='CompanyNameTag']");

    //Organization Number
    private OrganizationNumField = By.xpath("//*[@id='OrganizationNumberTag']");

    //Industry Code
    private IndustryCodeField = By.xpath("//*[@id='IndustryCodeTag']");

    //Loss Ratio
    private LossRatioField = By.xpath("//*[@id='LossRatioTag']");

    //Sum Insured
    private SumInsuredField = By.xpath("//*[@id='SumInsuredTag']");



    //Sum Insured G or NOK
    private SumInsuredGorNOKField = By.xpath("//*[@id='BasicAmountTag']//div[@class='ng-input']/input");

    //Downscaling
    private DownScalingField = By.xpath("//select[@id='DownscalingTypeTag']");
    private NoDownScaling = By.xpath("(//*[@id='DownscalingTypeTag']/option)[1]");
    private Fivepercent = By.xpath("(//*[@id='DownscalingTypeTag']/option)[2]");
    private Twopercent = By.xpath("(//*[@id='DownscalingTypeTag']/option)[3]");

    //Coordinated
    private CoordinatedField = By.xpath("//*[@id='CoordinatedTag']//div[@class='ng-input']/input");

    //Does The Customer Have These Producys With Another Insurer Today
    private DoesTheCustomerHaveTheseProductsWithAnotherInsurerTodayField = By.xpath("//*[@id='OtherInsurerTag']");
    private AnotherInsurerYes = By.xpath("(//*[@id='OtherInsurerTag']/option)[2]");
    private AnotherInsurerNo = By.xpath("(//*[@id='OtherInsurerTag']/option)[3]");

    //How Many Claims Have You Had In The Last 5 Years
    private HowManyClaimsHaveYouHadInTheLast5YearsField = By.xpath("//*[@id='NumberOfClaimsTag']");

    //Have You Bought Group Life Policy
    private GroupLifePolicyField = By.xpath("//*[@id='OwnGroupLifePolicyTag']");
    private GroupLifePolicyFieldYes = By.xpath("(//*[@id='OwnGroupLifePolicyTag']/option)[2]");
    private GroupLifePolicyFieldNo = By.xpath("(//*[@id='OwnGroupLifePolicyTag']/option)[3]");

    //Sum Insured Type
    private SumInsuredTypeField = By.xpath("//*[@id='SumInsuredTypeTag']//div[@class='ng-input']/input");

    //EmployeeSSNTag
    private EmployeeSsnTagField = By.xpath("(//*[@id='InsuredNameTag'])[1]");

    //EmployeeDOBTag
    private EmployeeDobTagField = By.xpath("(//*[@id='InsuredNameTag'])[2]");

    //Number of People
    private NumberOfPeopleField = By.xpath("//*[@id='NumberOfPeople1Tag']");

    //How Many Employees To Be Insured
    private NumberOfPeople1Field = By.xpath("//*[@id='NumberOfPeopleTag']");

    //Man Labour Years
    private ManLabourYearsField = By.xpath("//*[@id='ManLabourYears1Tag']");

    //Upload Employees
    private uploademployeesField = By.xpath("//div[@class='ngx-file-drop__content']/input");

    //Customer Claim Count Tag
    private CustomerClaimCountTag = By.xpath("//*[@id='CustomerClaimCountTag']");

    //FUNCTION FOR FILLING

    public async inputStartDate(StartDate: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.StartDateField);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.StartDateField, StartDate);
            return true;
        } catch (error) {
            console.log("input StartDate");
            console.log(error);
            return false;
        }
    }

    public async inputEndDate(EndDate: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.EndDateField);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.click(this.EndDateField);
            let globalDateTimeContainer = new GlobalDateTimeContainer(this.driverService);
            await globalDateTimeContainer.inputDateTime(EndDate);
            return true;
        } catch (error) {
            console.log("input EndDate");
            console.log(error);
            return false;
        }
    }

    public async inputInsuredPersonName(InsuredPersonName: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.InsuredPersonNameField);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.InsuredPersonNameField, InsuredPersonName);
            return true;
        } catch (error) {
            console.log("input Insured Person Name");
            console.log(error);
            return false;
        }
    }

    public async inputInsuredPersonAge(InsuredPersonAge: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.InsuredPersonAgeField);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.InsuredPersonAgeField, InsuredPersonAge);
            return true;
        } catch (error) {
            console.log("input Insured Person Age");
            console.log(error);
            return false;
        }
    }

    public async chooseNumOfTraveller(choice: string) {
        //additionalCoverChoice
        try {
            await this.driverService.waitUntilElementVisible(this.NumOfTravellerField);
            await this.driverService.click(this.NumOfTravellerField);

            if (choice.localeCompare("Single Adult") === 0) {
                //chooseYesAC
                await this.driverService.waitUntilElementVisible(this.SingleAdultOpt);
                await this.driverService.click(this.SingleAdultOpt);
            } else if (choice.localeCompare("Two Adults") === 0) {
                //chooseNoAC
                await this.driverService.waitUntilElementVisible(this.TwoAdultsOpt);
                await this.driverService.click(this.TwoAdultsOpt);
            } else if (choice.localeCompare("Family") === 0) {
                //chooseNoAC
                await this.driverService.waitUntilElementVisible(this.FamilyOpt);
                await this.driverService.click(this.FamilyOpt);
            } else if (choice.localeCompare("More than 5") === 0) {
                //chooseNoAC
                await this.driverService.waitUntilElementVisible(this.MoreThanFiveOpt);
                await this.driverService.click(this.MoreThanFiveOpt);
            } else {
                console.log("please select correct number of travellers");
            }
            return true;
        } catch (error) {
            console.log("choose Number of Traveller");
            console.log(error);
            return false;
        }
    }

    public async inputLuggageExcess(LuggageExcess: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.LuggageExcessField);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.LuggageExcessField, LuggageExcess);
            await selectDropdownOption(LuggageExcess, "", this.driverService);
            return true;
        } catch (error) {
            console.log("input Number of Traveller");
            console.log(error);
            return false;
        }
    }

    public async chooseAdditionalCover(choice: string) {
        //additionalCoverChoice
        try {
            await this.driverService.waitUntilElementVisible(this.AdditionalCoverChoice);
            await this.driverService.pressTabCurrentElement();
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
            for (let i = 1; i <= 4; i++) {
                await this.driverService.pressUp(this.AdditionalCoverChoice);
            }
            if (choice.toLocaleLowerCase().localeCompare('yes') === 0) {
                await this.driverService.pressDown(this.AdditionalCoverChoice);
            }
            if (choice.toLocaleLowerCase().localeCompare('no') === 0) {
                await this.driverService.pressDown(this.AdditionalCoverChoice);
                await this.driverService.pressDown(this.AdditionalCoverChoice);
            }
            return true;
        } catch (error) {
            console.log("choose Additional Cover")
            console.log(error);
            return false;
        }
    }

    //Company Input Name
    public async inputCompanyName(CompanyName: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.CompanyNameField);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.CompanyNameField, CompanyName);
            return true;
        } catch (error) {
            console.log("input Company Name");
            console.log(error);
            return false;
        }

    }

    //Organization Input
    public async inputOrganization(Organization: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.OrganizationNumField);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.OrganizationNumField, Organization);
            return true;
        } catch (error) {
            console.log("input Organization");
            console.log(error);
            return false;
        }
    }

    //Industry Code Input
    public async inputIndustryCode(IndustryCode: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.IndustryCodeField);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.IndustryCodeField, IndustryCode);
            return true;
        } catch (error) {
            console.log("input Industry Code");
            console.log(error);
            return false;
        }
    }

    //Loss Ratio Input
    public async inputLossRatio(LossRatio: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.LossRatioField);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.LossRatioField, LossRatio);
            return true;
        } catch (error) {
            console.log("input Loss Ratio");
            console.log(error);
            return false;
        }
    }

    //Sum Insured Input
    public async inputSumInsured(SumInsured: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.SumInsuredField);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.SumInsuredField, SumInsured);
            return true;
        } catch (error) {
            console.log("input Sum Insured");
            console.log(error);
            return false;
        }
    }

    //Sum Insured G or NOK
    public async inputSumInsuredGorNOK(SumInsuredGorNOK: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.SumInsuredGorNOKField);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.click(this.SumInsuredGorNOKField);
            await this.driverService.setText(this.SumInsuredGorNOKField, SumInsuredGorNOK);
            await this.driverService.pressEnterCurrentElement();
            return true;
        } catch (error) {
            console.log("input Sum Insured G or NOK");
            console.log(error);
            return false;
        }
    }

    //Downscaling Choose Answer
    public async chooseDownScaling(choice: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.DownScalingField);
            await this.driverService.click(this.DownScalingField);

            if (choice.localeCompare("No downscaling") === 0) {
                //choose No downscaling
                await this.driverService.waitUntilElementVisible(this.NoDownScaling);
                await this.driverService.click(this.NoDownScaling);
            } else if (choice.localeCompare("5%") === 0) {
                //choose 5%
                await this.driverService.waitUntilElementVisible(this.Fivepercent);
                await this.driverService.click(this.Fivepercent);
            } else if (choice.localeCompare("2%") === 0) {
                //choose 2%
                await this.driverService.waitUntilElementVisible(this.Twopercent);
                await this.driverService.click(this.Twopercent);
            } else {
                console.log("please select correct Downscaling");
            }
            return true;
        } catch (error) {
            console.log("choose Downscaling");
            console.log(error);
            return false;
        }
    }

    //Coordinated Input
    public async inputCoordinated(Coordinated: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.CoordinatedField);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.click(this.CoordinatedField);
            await this.driverService.setText(this.CoordinatedField, Coordinated);
            await this.driverService.pressEnterCurrentElement();
            return true;
        } catch (error) {
            console.log("input Coordinated");
            console.log(error);
            return false;
        }
    }

    //Products Insurer Choose Answer - Group Life
    public async chooseProductsInsurer(choice: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.DoesTheCustomerHaveTheseProductsWithAnotherInsurerTodayField);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.click(this.DoesTheCustomerHaveTheseProductsWithAnotherInsurerTodayField);

            if (choice.localeCompare("Yes") === 0) {
                //choose Yes
                await this.driverService.waitUntilElementVisible(this.AnotherInsurerYes);
                await this.driverService.click(this.AnotherInsurerYes);
            } else if (choice.localeCompare("No") === 0) {
                //choose No
                await this.driverService.waitUntilElementVisible(this.AnotherInsurerNo);
                await this.driverService.click(this.AnotherInsurerNo);
            } else {
                console.log("please select correct answer for question does the customer have these products with another insurer today");
            }
            return true;
        } catch (error) {
            console.log("choose Product Insurer");
            console.log(error);
            return false;
        }
    }

    //How Many Claims Have You Had In The Last 5 Years?
    public async inputClaims5Years(Claims5Years: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.HowManyClaimsHaveYouHadInTheLast5YearsField);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.HowManyClaimsHaveYouHadInTheLast5YearsField, Claims5Years);
            return true;
        } catch (error) {
            console.log("input How Many Claims Have You Had In The Last 5 Years");
            console.log(error);
            return false;
        }
    }

    //Have You Bought Group Life Policy Input
    public async chooseGroupLifePolicy(choice: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.GroupLifePolicyField);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.click(this.GroupLifePolicyField);

            if (choice.localeCompare("Yes") === 0) {
                //choose Yes
                await this.driverService.waitUntilElementVisible(this.GroupLifePolicyFieldYes);
                await this.driverService.click(this.GroupLifePolicyFieldYes);
            } else if (choice.localeCompare("No") === 0) {
                //choose No
                await this.driverService.waitUntilElementVisible(this.GroupLifePolicyFieldNo);
                await this.driverService.click(this.GroupLifePolicyFieldNo);
            } else {
                console.log("please select correct answer for question Have you bought Group Life Policy");
            }
            return true;
        } catch (error) {
            console.log("choose Group Life policy")
            console.log(error);
            return false;
        }
    }

    //Sum Insured Type Input
    public async inputSumInsuredType(SumInsuredType: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.SumInsuredTypeField);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.SumInsuredTypeField, SumInsuredType);
            await this.driverService.pressEnterCurrentElement();
            return true;
        } catch (error) {
            console.log("input Sum Insured Type")
            console.log(error);
            return false;
        }
    }

    //EmployeeSSNTag Input
    public async inputEmployeeSSNTag(EmployeeSSNTAG: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.EmployeeSsnTagField);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.EmployeeSsnTagField, EmployeeSSNTAG);
            return true;
        } catch (error) {
            console.log("input Employee SSN Tag");
            console.log(error);
            return false;
        }
    }

    //EmployeeDOBTag Input
    public async inputEmplyeeDOBTag(EmployeeDOBTAG: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.EmployeeDobTagField);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.EmployeeDobTagField, EmployeeDOBTAG);
            return true;
        } catch (error) {
            console.log("input Employee DOB Tag");
            console.log(error);
            return false;
        }
    }

    //Number Of People Input
    public async inputNumberOfPeople(NumberOfPeople: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.NumberOfPeopleField);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.NumberOfPeopleField, NumberOfPeople);
            await this.driverService.pressEnterCurrentElement();
            return true;
        } catch (error) {
            console.log("input Company Name");
            console.log(error);
            return false;
        }

    }

    //How Many Employees To Be Insured Input
    public async inputNumberOfPeople1(NumberOfPeople: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.NumberOfPeople1Field);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.NumberOfPeople1Field, NumberOfPeople);
            await this.driverService.pressEnterCurrentElement();
            return true;
        } catch (error) {
            console.log("input Company Name");
            console.log(error);
            return false;
        }

    }

    //Man Labour Years
    public async inputManLabourYears(ManLabouryears: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.ManLabourYearsField);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.ManLabourYearsField, ManLabouryears);
            return true;
        } catch (error) {
            console.log("input Company Name");
            console.log(error);
            return false;
        }

    }

    public async inputCustomerClaimCountTag(claimCount: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.CustomerClaimCountTag);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await this.driverService.setText(this.CustomerClaimCountTag, claimCount);
            return true;
        } catch (error) {
            console.log("input Customer Claim Count Tag");
            console.log(error);
            return false;
        }
    }

    public async uploadEmployees(uploademployee: string) {
        try {
            await this.driverService.scrollElementToView(await this.driverService.findElement(this.uploademployeesField));
            await this.driverService.waitUntilElementVisible(this.uploademployeesField);
            if (__dirname.includes("jenkins") && !__dirname.includes(".jenkins")) {
                logInfoMessage("\tSet File Detector on Jenkins...");
                await this.driverService.getDriver().setFileDetector(new remote.FileDetector());
                logInfoMessage("File dir: " + __dirname);
            }
            await (await this.driverService.findElement(this.uploademployeesField)).sendKeys(uploademployee);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            console.log("EMPLOYEES");
            return true;
        } catch (error) {
            console.log("upload Employees");
            console.log(error);
            return false;
        }
    }

    public async validateDocumentOnDocumentsSection(expectedValue: string) {
        try {

            let field = By.xpath(`//*[contains(@class,'document-list')]//a`);
            await this.driverService.waitUntilElementVisible(field)
            let actualValue = await this.driverService.getText(field)
            if (expectedValue.includes(actualValue)) {
                expectedValue = actualValue;
            }
            return await this.driverService.validateRecord("Validate generate Document: ",
                [actualValue, expectedValue, "Incorrect Document!"]
            );
        } catch (error) {
            console.log('validateDocumentOnDocumentsSection');
            console.log(error);
            return false;
        }
    }

    public async downloadDocumentOnDocumentsSection() {
        try {
            let field = By.xpath(`//*[contains(@class,'document-list')]//a`);
            await this.driverService.waitUntilElementVisible(field)
            await this.driverService.click(field);
            await waitUntilHorizontalProgressBarLoaded(this.driverService);
            return true;
        } catch (error) {
            console.log('downloadDocumentOnDocumentsSection');
            console.log(error);
            return false;
        }
    }

    public async validatePDFIconOnDocumentsSection() {
        try {
            let pdfIcon = By.xpath(`//*[contains(@class,'document-list')]//img[contains(@src,'./assets/images/document/pdf.png')]`);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            if (await this.driverService.isExisted(pdfIcon)) {
                logSuccessMessage('Validate PDF icon document: Test Passed!')
                return true;
            }
            logFailMessage('Validate PDF icon document: Test Failed!');
            return false;
        } catch (error) {
            console.log('validatePDFIconOnDocumentsSection');
            console.log(error);
            return false;
        }
    }
}