@VAR-8009 @RegressionTest @SmokeTest @ci1
Feature: [Auto] Smoke test varsam-staging - 02/03/2023 - Module 1

	@TEST_VAR-7333
	Scenario: [TC_Regression] [Accounts] [Product] Open an existing person account
		Given User navigates to Account list
		When User searches an account on recent accounts search field "./data_varsam/varsam_staging/SAAS-5708_data_open_account.csv"
	@TEST_VAR-7528
	Scenario: [TC_Regression] [Varsam] [VAR-5803] Check new column "Type" in Quote list table
		Given User is on Quote list
		When User checks filter at column Type on Quote list
	@TEST_VAR-7016 @Auto
	Scenario: [TC_Regression] [Varsam] [VAR-819] Create quote
		Given User closes all opening entities
		Given User navigates to Account list
		When User searches an account on recent accounts search field "./data_varsam/varsam_staging/SAAS-5708_data_open_account.csv"
		
		## Steps 2 -> 3
		Given User is on Select a product page
		And User selects a sale channel from csv file "./data_varsam/varsam_staging/VAR-819_1_data_quote.csv"
		And User selects a product from csv file "./data_varsam/varsam_staging/VAR-819_1_data_quote.csv"
		# Post number = 5545
		When User inputs data on Create Quote form for Varsam product Innbo Seasonal "./data_varsam/varsam_staging/VAR-819_1_data_quote.csv"
		And User presses Next button on Create Quote form
		And User inputs data at Premium section on Creating Quote form for Varsam product Innbo Seasonal "./data_varsam/varsam_staging/VAR-819_1_data_quote_calculate_premium.csv"
		And User presses Calculate button at Premium section on Creating Quote form
		And User verifies info on Creating Quote form for Varsam product Innbo Seasonal "./data_varsam/varsam_staging/VAR-819_1_data_quote.csv"
		And User verifies info at Purchase Constraints on Creating Quote form "./data_varsam/varsam_staging/VAR-819_1_data_purchase_constraint1.csv"
		Then User presses Approve button on Creating Quote form
		And User verifies content on toast message "./data_varsam/varsam_staging/VAR-819_1_data_purchase_constraint2.csv"
		And User verifies info at Purchase Constraints on Creating Quote form "./data_varsam/varsam_staging/VAR-819_1_data_purchase_constraint2.csv"
		And User presses Accept button on Creating Quote form
		And User verifies info Quote Ready for Purchase on Creating Payment Quote form "./data_varsam/varsam_staging/VAR-819_1_data_quote.csv"
		
		##  @VAR-5803 => Check column "Type" for New Business
		Then System shows new quote in the Quote list "./data_varsam/varsam_staging/VAR-819_1_data_quote.csv"
		And User opens the first quote on Quote list
		And User presses Accept button on Creating Quote form
	@TEST_VAR-7017 @Auto
	Scenario: [TC_Regression] [Varsam] [VAR-819] Purchase policy
		## Steps 4 -> 5
		Given User purchases quote at Creating Quote page
		And User selects Payment Option "./data_varsam/varsam_staging/VAR-819_1_data_payment_option.csv"
		When User verifies policy information at Policy Created page
		And User verifies policy information at policy detail page "./data_varsam/varsam_staging/VAR-819_1_data_quote.csv"
		Then User validate the generate document on "Policy" documents "./data_varsam/varsam_staging/VAR-819_2_document_quote.csv"
		And User validate content in the dowloaded file "./baseline_pdf/VAR-819_Varsam_SofiaInnboSeasonal.pdf"
		Given User is on Policy list
		Then User verifies info in the Policy list from dataTestExecution
		And User opens the first policy on Policy list
	@TEST_VAR-7018 @Auto
	Scenario: [TC_Regression] [Varsam] [VAR-819] MTA policy
		Given User adjusts policy at Policy detail
		# And User accepts alert
		And User inputs data on Create Quote form for Varsam product Innbo Seasonal "./data_varsam/varsam_staging/VAR-819_3_data_quote_edit.csv"
		And User presses Next button on Create Quote form
		And User verifies info on Creating Quote form for Varsam product Innbo Seasonal "./data_varsam/varsam_staging/VAR-819_3_data_quote_verify.csv"
		And User presses Accept button on Creating Quote form
		And User verifies info Quote Ready for Purchase on Creating Payment Quote form "./data_varsam/varsam_staging/VAR-819_3_data_quote_verify.csv"
		
		##  @VAR-5803 => Check column "Type" for MTA
		Then System shows new quote in the Quote list "./data_varsam/varsam_staging/VAR-819_3_data_quote_verify.csv"
		And User opens the first quote on Quote list
		And User presses Accept button on Creating Quote form
		
		And User purchases quote at Creating Quote page
		And User verifies policy information at Policy Created page
		And User verifies policy information at policy detail page "./data_varsam/varsam_staging/VAR-819_3_data_quote_verify.csv"
		And User validate the generate document on "Policy" documents "./data_varsam/varsam_staging/VAR-819_2_document_quote.csv"
		And User validate content in the dowloaded file "./baseline_pdf/VAR-819_Varsam_SofiaInnboSeasonal_MTA.pdf"
		And User verifies tooltip Product version at policy detail page "./data_varsam/varsam_staging/VAR-819_3_data_quote_verify.csv"
		And User verifies popover Previous Insurer at policy detail page "./data_varsam/varsam_staging/VAR-819_3_data_quote_verify.csv"
	@TEST_VAR-7019 @Auto
	Scenario: [TC_Regression] [Varsam] [VAR-819] Terminate policy
		Given User terminates policy at Policy detail
		And User inputs valid data into Terminate Policy form "./data_varsam/varsam_staging/VAR-819_4_data_terminate_policy.csv"
		And User presses "Recalculate" button on "Terminate Policy" form
		When User verifies New Premium on Terminate Policy form "./data_varsam/varsam_staging/VAR-819_4_data_terminate_policy.csv"
		And User presses "Terminate" button on "Terminate Policy" form
		Then User verifies the status of policy after termination "./data_varsam/varsam_staging/VAR-819_4_data_terminate_policy.csv"
	@TEST_VAR-7024 @Auto
	Scenario: [TC_Regression] [Varsam] [VAR-821] Create quote
		Given User closes all opening entities
		Given User navigates to Account list
		When User searches an account on recent accounts search field "./data_varsam/varsam_staging/SAAS-5708_data_open_account.csv"
		
		
		## Steps 2 -> 3
		Given User is on Select a product page
		And User selects a sale channel from csv file "./data_varsam/varsam_staging/VAR-821_1_data_quote.csv"
		And User selects a product from csv file "./data_varsam/varsam_staging/VAR-821_1_data_quote.csv"
		# Post number = 5545
		When User inputs data on Create Quote form for Varsam product Innbo Seasonal "./data_varsam/varsam_staging/VAR-821_1_data_quote.csv"
		And User presses Next button on Create Quote form
		And User inputs data at Premium section on Creating Quote form for Varsam product Innbo Seasonal "./data_varsam/varsam_staging/VAR-821_1_data_quote_calculate_premium.csv"
		And User presses Calculate button at Premium section on Creating Quote form
		And User verifies info on Creating Quote form for Varsam product Innbo Seasonal - Renewal case "./data_varsam/varsam_staging/VAR-821_1_data_quote.csv"
		And User verifies info at Purchase Constraints on Creating Quote form "./data_varsam/varsam_staging/VAR-821_1_data_purchase_constraint1.csv"
		Then User presses Approve button on Creating Quote form
		And User verifies content on toast message "./data_varsam/varsam_staging/VAR-821_1_data_purchase_constraint2.csv"
		And User verifies info at Purchase Constraints on Creating Quote form "./data_varsam/varsam_staging/VAR-821_1_data_purchase_constraint2.csv"
		And User presses Accept button on Creating Quote form
		And User verifies info Quote Ready for Purchase on Creating Payment Quote form - Renewal case
	@TEST_VAR-7025 @Auto
	Scenario: [TC_Regression] [Varsam] [VAR-821] Purchase policy
		## Steps 4 -> 5
		Given User purchases quote at Creating Quote page
		And User selects Payment Option "./data_varsam/varsam_staging/VAR-821_1_data_payment_option.csv"
		When User verifies policy information at Policy Created page
		And User verifies policy information at policy detail page for Varsam product Innbo Seasonal - Renewal case "./data_varsam/varsam_staging/VAR-821_1_data_quote.csv"
		Then User validate the generate document on "Policy" documents "./data_varsam/varsam_staging/VAR-821_2_document_quote.csv"
		And User validate content in the dowloaded file for Varsam product Innbo Seasonal - Renewal case
	@TEST_VAR-7026 @Auto
	Scenario: [TC_Regression] [Varsam] [VAR-821] Check Renew quote and Purchase policy
		Given User is on Quote list
		And User verifies info of Create quote form after renew for Varsam product Innbo Seasonal - Renewal case
		And User verifies info on Creating Quote form after renew for Varsam product Innbo Seasonal - Renewal case "./data_varsam/varsam_staging/VAR-821_1_data_quote.csv"
		## Skip steps 7 because can't calculate premium for period contains in 2 different years
		And User presses Accept button on Creating Quote form
		And User verifies info Quote Ready for Purchase after renew on Creating Payment Quote form - Renewal case "./data_varsam/varsam_staging/VAR-821_1_data_quote.csv"
		Given User purchases quote at Creating Quote page
		And User selects Payment Option "./data_varsam/varsam_staging/VAR-821_1_data_payment_option.csv"
		When User verifies policy information at Policy Created page
		And User verifies policy information at policy detail page after renew for Varsam product Innbo Seasonal - Renewal case "./data_varsam/varsam_staging/VAR-821_1_data_quote.csv"
		Then User validate the generate document on "Policy" documents "./data_varsam/varsam_staging/VAR-821_2_document_quote.csv"
		And User validate content in the dowloaded file after renew for Varsam product Innbo Seasonal - Renewal case
	@TEST_VAR-7049 @Auto
	Scenario: [TC_Regression] [Varsam] [VAR-1165] Create quote
		Given User closes all opening entities
		And User navigates to Account list
		When User searches an account on recent accounts search field "./data_varsam/varsam_staging/SAAS-5708_data_open_account.csv"
		
		## Steps 2
		Given User is on Select a product page
		And User selects a sale channel from csv file "./data_varsam/varsam_staging/VAR-1165_1_data_quote.csv"
		And User selects a product from csv file "./data_varsam/varsam_staging/VAR-1165_1_data_quote.csv"
		# Post number = 5545
		When User inputs data on Create Quote form for Varsam product Innbo Seasonal "./data_varsam/varsam_staging/VAR-1165_1_data_quote.csv"
		And User presses Next button on Create Quote form
		And User inputs data at Premium section on Creating Quote form for Varsam product Innbo Seasonal "./data_varsam/varsam_staging/VAR-1165_1_data_quote_calculate_premium.csv"
		And User presses Calculate button at Premium section on Creating Quote form
		And User verifies info on Creating Quote form for Varsam product Innbo Seasonal "./data_varsam/varsam_staging/VAR-1165_1_data_quote.csv"
		And User verifies info at Purchase Constraints on Creating Quote form "./data_varsam/varsam_staging/VAR-1165_1_data_purchase_constraint1.csv"
		Then User presses Approve button on Creating Quote form
		And User verifies content on toast message "./data_varsam/varsam_staging/VAR-1165_1_data_purchase_constraint2.csv"
		And User verifies info at Purchase Constraints on Creating Quote form "./data_varsam/varsam_staging/VAR-1165_1_data_purchase_constraint2.csv"
		And User presses Accept button on Creating Quote form
		And User verifies info Quote Ready for Purchase on Creating Payment Quote form "./data_varsam/varsam_staging/VAR-1165_1_data_quote.csv"
	@TEST_VAR-7050 @Auto
	Scenario: [TC_Regression] [Varsam] [VAR-1165] Purchase policy
		## Steps 3
		Given User purchases quote at Creating Quote page
		And User selects Payment Option "./data_varsam/varsam_staging/VAR-1165_1_data_payment_option.csv"
		When User verifies policy information at Policy Created page
		And User verifies policy information at policy detail page "./data_varsam/varsam_staging/VAR-1165_1_data_quote.csv"
		Then User validate the generate document on "Policy" documents "./data_varsam/varsam_staging/VAR-1165_2_document_quote.csv"
		And User validate content in the dowloaded file "./baseline_pdf/VAR-1165_Varsam_SofiaInnboSeasonal.pdf"
	@TEST_VAR-7051 @Auto
	Scenario: [TC_Regression] [Varsam] [VAR-1165] MTA policy
		Given User adjusts policy at Policy detail
		# And User accepts alert
		And User inputs data on Create Quote form for Varsam product Innbo Seasonal "./data_varsam/varsam_staging/VAR-1165_3_data_quote_edit.csv"
		And User presses Next button on Create Quote form
		And User verifies info on Creating Quote form for Varsam product Innbo Seasonal "./data_varsam/varsam_staging/VAR-1165_3_data_quote_verify.csv"
		And User presses Accept button on Creating Quote form
		And User verifies info Quote Ready for Purchase on Creating Payment Quote form "./data_varsam/varsam_staging/VAR-1165_3_data_quote_verify.csv"
		And User purchases quote at Creating Quote page
		And User verifies policy information at Policy Created page
		And User verifies policy information at policy detail page "./data_varsam/varsam_staging/VAR-1165_3_data_quote_verify.csv"
		And User validate the generate document on "Policy" documents "./data_varsam/varsam_staging/VAR-1165_2_document_quote.csv"
		And User validate content in the dowloaded file "./baseline_pdf/VAR-1165_Varsam_SofiaInnboSeasonal_MTA.pdf"
		And User verifies tooltip Product version at policy detail page "./data_varsam/varsam_staging/VAR-1165_3_data_quote_verify.csv"
		And User verifies popover Previous Insurer at policy detail page "./data_varsam/varsam_staging/VAR-1165_3_data_quote_verify.csv"
	@TEST_VAR-7052 @Auto
	Scenario: [TC_Regression] [Varsam] [VAR-1165] Terminate policy
		Given User terminates policy at Policy detail
		And User inputs valid data into Terminate Policy form "./data_varsam/varsam_staging/VAR-1165_4_data_terminate_policy.csv"
		And User presses "Recalculate" button on "Terminate Policy" form
		When User verifies New Premium on Terminate Policy form "./data_varsam/varsam_staging/VAR-1165_4_data_terminate_policy.csv"
		And User presses "Terminate" button on "Terminate Policy" form
		Then User verifies the status of policy after termination "./data_varsam/varsam_staging/VAR-1165_4_data_terminate_policy.csv"
	@TEST_VAR-7054 @Auto
	Scenario: [TC_Regression] [Varsam] [VAR-1168] Cover type Full Insurance
		Given User closes all opening entities
		Given User navigates to Account list
		When User searches an account on recent accounts search field "./data_varsam/varsam_staging/SAAS-5708_data_open_account.csv"
		
		
		
		## Steps 2 Create quote
		Given User is on Select a product page
		And User selects a sale channel from csv file "./data_varsam/varsam_staging/VAR-1168_1_data_quote.csv"
		And User selects a product from csv file "./data_varsam/varsam_staging/VAR-1168_1_data_quote.csv"
		# Post number = 5545
		When User inputs data on Create Quote form for Varsam product Innbo Seasonal "./data_varsam/varsam_staging/VAR-1168_1_data_quote.csv"
		And User presses Next button on Create Quote form
		And User inputs data at Premium section on Creating Quote form for Varsam product Innbo Seasonal "./data_varsam/varsam_staging/VAR-1168_1_data_quote_calculate_premium.csv"
		And User presses Calculate button at Premium section on Creating Quote form
		And User verifies info on Creating Quote form for Varsam product Innbo Seasonal "./data_varsam/varsam_staging/VAR-1168_1_data_quote.csv"
		And User verifies info at Purchase Constraints on Creating Quote form "./data_varsam/varsam_staging/VAR-1168_1_data_purchase_constraint1.csv"
		Then User presses Approve button on Creating Quote form
		And User verifies content on toast message "./data_varsam/varsam_staging/VAR-1168_1_data_purchase_constraint2.csv"
		And User verifies info at Purchase Constraints on Creating Quote form "./data_varsam/varsam_staging/VAR-1168_1_data_purchase_constraint2.csv"
		And User presses Accept button on Creating Quote form
		And User verifies info Quote Ready for Purchase on Creating Payment Quote form "./data_varsam/varsam_staging/VAR-1168_1_data_quote.csv"
		
		
		## Steps 3 Purchase policy
		Given User purchases quote at Creating Quote page
		And User selects Payment Option "./data_varsam/varsam_staging/VAR-1168_1_data_payment_option.csv"
		When User verifies policy information at Policy Created page
		And User verifies policy information at policy detail page "./data_varsam/varsam_staging/VAR-1168_1_data_quote.csv"
		Then User validate the generate document on "Policy" documents "./data_varsam/varsam_staging/VAR-1168_1_document_quote.csv"
		And User validate content in the dowloaded file "./baseline_pdf/VAR-1168_1_Varsam_SofiaInnboSeasonal.pdf"
	@TEST_VAR-7055 @Auto
	Scenario: [TC_Regression] [Varsam] [VAR-1168] Cover type Partial insurance (step 5)
		## Steps 5 Create quote
		Given User is on Select a product page
		And User selects a sale channel from csv file "./data_varsam/varsam_staging/VAR-1168_2_data_quote.csv"
		And User selects a product from csv file "./data_varsam/varsam_staging/VAR-1168_2_data_quote.csv"
		# Post number = 5545
		When User inputs data on Create Quote form for Varsam product Innbo Seasonal "./data_varsam/varsam_staging/VAR-1168_2_data_quote.csv"
		And User presses Next button on Create Quote form
		And User inputs data at Premium section on Creating Quote form for Varsam product Innbo Seasonal "./data_varsam/varsam_staging/VAR-1168_2_data_quote_calculate_premium.csv"
		And User presses Calculate button at Premium section on Creating Quote form
		And User verifies info on Creating Quote form for Varsam product Innbo Seasonal "./data_varsam/varsam_staging/VAR-1168_2_data_quote.csv"
		And User verifies info at Purchase Constraints on Creating Quote form "./data_varsam/varsam_staging/VAR-1168_2_data_purchase_constraint1.csv"
		Then User presses Approve button on Creating Quote form
		And User verifies content on toast message "./data_varsam/varsam_staging/VAR-1168_2_data_purchase_constraint2.csv"
		And User verifies info at Purchase Constraints on Creating Quote form "./data_varsam/varsam_staging/VAR-1168_2_data_purchase_constraint2.csv"
		And User presses Accept button on Creating Quote form
		And User verifies info Quote Ready for Purchase on Creating Payment Quote form "./data_varsam/varsam_staging/VAR-1168_2_data_quote.csv"
		
		
		## Steps 5 Purchase policy
		Given User purchases quote at Creating Quote page
		And User selects Payment Option "./data_varsam/varsam_staging/VAR-1168_2_data_payment_option.csv"
		When User verifies policy information at Policy Created page
		And User verifies policy information at policy detail page "./data_varsam/varsam_staging/VAR-1168_2_data_quote.csv"
		Then User validate the generate document on "Policy" documents "./data_varsam/varsam_staging/VAR-1168_2_document_quote.csv"
		And User validate content in the dowloaded file "./baseline_pdf/VAR-1168_2_Varsam_SofiaInnboSeasonal.pdf"
	@TEST_VAR-7056 @Auto
	Scenario: [TC_Regression] [Varsam] [VAR-1168] Cover type Partial insurance (step 6)
		## Steps 6 Create quote
		Given User is on Select a product page
		And User selects a sale channel from csv file "./data_varsam/varsam_staging/VAR-1168_3_data_quote.csv"
		And User selects a product from csv file "./data_varsam/varsam_staging/VAR-1168_3_data_quote.csv"
		# Post number = 5545
		When User inputs data on Create Quote form for Varsam product Innbo Seasonal "./data_varsam/varsam_staging/VAR-1168_3_data_quote.csv"
		And User presses Next button on Create Quote form
		And User inputs data at Premium section on Creating Quote form for Varsam product Innbo Seasonal "./data_varsam/varsam_staging/VAR-1168_3_data_quote_calculate_premium.csv"
		And User presses Calculate button at Premium section on Creating Quote form
		And User verifies info on Creating Quote form for Varsam product Innbo Seasonal "./data_varsam/varsam_staging/VAR-1168_3_data_quote.csv"
		And User verifies info at Purchase Constraints on Creating Quote form "./data_varsam/varsam_staging/VAR-1168_3_data_purchase_constraint1.csv"
		Then User presses Approve button on Creating Quote form
		And User verifies content on toast message "./data_varsam/varsam_staging/VAR-1168_3_data_purchase_constraint2.csv"
		And User verifies info at Purchase Constraints on Creating Quote form "./data_varsam/varsam_staging/VAR-1168_3_data_purchase_constraint2.csv"
		And User presses Accept button on Creating Quote form
		And User verifies info Quote Ready for Purchase on Creating Payment Quote form "./data_varsam/varsam_staging/VAR-1168_3_data_quote.csv"
		
		
		## Steps 6 Purchase policy
		Given User purchases quote at Creating Quote page
		And User selects Payment Option "./data_varsam/varsam_staging/VAR-1168_3_data_payment_option.csv"
		When User verifies policy information at Policy Created page
		And User verifies policy information at policy detail page "./data_varsam/varsam_staging/VAR-1168_3_data_quote.csv"
		Then User validate the generate document on "Policy" documents "./data_varsam/varsam_staging/VAR-1168_3_document_quote.csv"
		And User validate content in the dowloaded file "./baseline_pdf/VAR-1168_3_Varsam_SofiaInnboSeasonal.pdf"
	@TEST_VAR-7057 @Auto
	Scenario: [TC_Regression] [Varsam] [VAR-1168] Cover type Traffic only (step 7)
		## Steps 7 Create quote
		Given User is on Select a product page
		And User selects a sale channel from csv file "./data_varsam/varsam_staging/VAR-1168_4_data_quote.csv"
		And User selects a product from csv file "./data_varsam/varsam_staging/VAR-1168_4_data_quote.csv"
		# Post number = 5545
		When User inputs data on Create Quote form for Varsam product Innbo Seasonal "./data_varsam/varsam_staging/VAR-1168_4_data_quote.csv"
		And User presses Next button on Create Quote form
		And User inputs data at Premium section on Creating Quote form for Varsam product Innbo Seasonal "./data_varsam/varsam_staging/VAR-1168_4_data_quote_calculate_premium.csv"
		And User presses Calculate button at Premium section on Creating Quote form
		And User verifies info on Creating Quote form for Varsam product Innbo Seasonal "./data_varsam/varsam_staging/VAR-1168_4_data_quote.csv"
		And User verifies info at Purchase Constraints on Creating Quote form "./data_varsam/varsam_staging/VAR-1168_4_data_purchase_constraint1.csv"
		Then User presses Approve button on Creating Quote form
		And User verifies content on toast message "./data_varsam/varsam_staging/VAR-1168_4_data_purchase_constraint2.csv"
		And User verifies info at Purchase Constraints on Creating Quote form "./data_varsam/varsam_staging/VAR-1168_4_data_purchase_constraint2.csv"
		And User presses Accept button on Creating Quote form
		And User verifies info Quote Ready for Purchase on Creating Payment Quote form "./data_varsam/varsam_staging/VAR-1168_4_data_quote.csv"
		
		## Steps 7 Purchase policy
		Given User purchases quote at Creating Quote page
		And User selects Payment Option "./data_varsam/varsam_staging/VAR-1168_4_data_payment_option.csv"
		When User verifies policy information at Policy Created page
		And User verifies policy information at policy detail page "./data_varsam/varsam_staging/VAR-1168_4_data_quote.csv"
		Then User validate the generate document on "Policy" documents "./data_varsam/varsam_staging/VAR-1168_4_document_quote.csv"
		And User validate content in the dowloaded file "./baseline_pdf/VAR-1168_4_Varsam_SofiaInnboSeasonal.pdf"
	@TEST_VAR-7058 @Auto
	Scenario: [TC_Regression] [Varsam] [VAR-1676] Create quote
		Given User closes all opening entities
		Given User navigates to Account list
		When User searches an account on recent accounts search field "./data_varsam/varsam_staging/SAAS-5708_data_open_account.csv"
		
		
		## Steps 2 -> 3
		Given User is on Select a product page
		And User selects a sale channel from csv file "./data_varsam/varsam_staging/VAR-1676_1_data_quote.csv"
		And User selects a product from csv file "./data_varsam/varsam_staging/VAR-1676_1_data_quote.csv"
		# Post number = 5545
		When User inputs data on Create Quote form for Varsam product Innbo Seasonal "./data_varsam/varsam_staging/VAR-1676_1_data_quote.csv"
		And User presses Next button on Create Quote form
		And User inputs data at Premium section on Creating Quote form for Varsam product Innbo Seasonal "./data_varsam/varsam_staging/VAR-1676_1_data_quote_calculate_premium.csv"
		And User presses Calculate button at Premium section on Creating Quote form
		And User verifies info on Creating Quote form for Varsam product Innbo Seasonal "./data_varsam/varsam_staging/VAR-1676_1_data_quote.csv"
		And User verifies info at Purchase Constraints on Creating Quote form "./data_varsam/varsam_staging/VAR-1676_1_data_purchase_constraint1.csv"
		Then User presses Approve button on Creating Quote form
		And User verifies content on toast message "./data_varsam/varsam_staging/VAR-1676_1_data_purchase_constraint2.csv"
		And User verifies info at Purchase Constraints on Creating Quote form "./data_varsam/varsam_staging/VAR-1676_1_data_purchase_constraint2.csv"
		And User presses Accept button on Creating Quote form
		And User verifies info Quote Ready for Purchase on Creating Payment Quote form "./data_varsam/varsam_staging/VAR-1676_1_data_quote.csv"
	@TEST_VAR-7059 @Auto
	Scenario: [TC_Regression] [Varsam] [VAR-1676] Purchase policy
		## Steps 4 -> 5
		Given User purchases quote at Creating Quote page
		And User selects Payment Option "./data_varsam/varsam_staging/VAR-1676_1_data_payment_option.csv"
		When User verifies policy information at Policy Created page
		And User verifies policy information at policy detail page "./data_varsam/varsam_staging/VAR-1676_1_data_quote.csv"
		Then User validate the generate document on "Policy" documents "./data_varsam/varsam_staging/VAR-1676_2_document_quote.csv"
		And User validate content in the dowloaded file "./baseline_pdf/VAR-1676_Varsam_SofiaInnboSeasonal.pdf"
	@TEST_VAR-7060 @Auto
	Scenario: [TC_Regression] [Varsam] [VAR-1676] MTA policy
		Given User adjusts policy at Policy detail
		# And User accepts alert
		And User inputs data on Create Quote form for Varsam product Innbo Seasonal "./data_varsam/varsam_staging/VAR-1676_3_data_quote_edit.csv"
		And User presses Next button on Create Quote form
		And User verifies info on Creating Quote form for Varsam product Innbo Seasonal "./data_varsam/varsam_staging/VAR-1676_3_data_quote_verify.csv"
		And User presses Accept button on Creating Quote form
		And User verifies info Quote Ready for Purchase on Creating Payment Quote form "./data_varsam/varsam_staging/VAR-1676_3_data_quote_verify.csv"
		And User purchases quote at Creating Quote page
		And User verifies policy information at Policy Created page
		And User verifies policy information at policy detail page "./data_varsam/varsam_staging/VAR-1676_3_data_quote_verify.csv"
		And User validate the generate document on "Policy" documents "./data_varsam/varsam_staging/VAR-1676_2_document_quote.csv"
		And User validate content in the dowloaded file "./baseline_pdf/VAR-1676_Varsam_SofiaInnboSeasonal_MTA.pdf"
		And User verifies tooltip Product version at policy detail page "./data_varsam/varsam_staging/VAR-1676_3_data_quote_verify.csv"
		And User verifies popover Previous Insurer at policy detail page "./data_varsam/varsam_staging/VAR-1676_3_data_quote_verify.csv"
	@TEST_VAR-7061 @Auto
	Scenario: [TC_Regression] [Varsam] [VAR-1676] Terminate policy
		Given User terminates policy at Policy detail
		And User inputs valid data into Terminate Policy form "./data_varsam/varsam_staging/VAR-1676_4_data_terminate_policy.csv"
		And User presses "Recalculate" button on "Terminate Policy" form
		When User verifies New Premium on Terminate Policy form "./data_varsam/varsam_staging/VAR-1676_4_data_terminate_policy.csv"
		And User presses "Terminate" button on "Terminate Policy" form
		Then User verifies the status of policy after termination "./data_varsam/varsam_staging/VAR-1676_4_data_terminate_policy.csv"
		And User verifies the period of policy after temination "./data_varsam/varsam_staging/VAR-1676_4_data_terminate_policy.csv"
	@TEST_VAR-7064 @Auto
	Scenario: [TC_Regression] [Varsam] [VAR-1677] Create quote
		Given User closes all opening entities
		Given User navigates to Account list
		When User searches an account on recent accounts search field "./data_varsam/varsam_staging/SAAS-5708_data_open_account.csv"
		
		
		
		## Steps 2 -> 3
		Given User is on Select a product page
		And User selects a sale channel from csv file "./data_varsam/varsam_staging/VAR-1677_1_data_quote.csv"
		And User selects a product from csv file "./data_varsam/varsam_staging/VAR-1677_1_data_quote.csv"
		# Post number = 5545
		When User inputs data on Create Quote form for Varsam product Innbo Seasonal "./data_varsam/varsam_staging/VAR-1677_1_data_quote.csv"
		And User presses Next button on Create Quote form
		And User inputs data at Premium section on Creating Quote form for Varsam product Innbo Seasonal "./data_varsam/varsam_staging/VAR-1677_1_data_quote_calculate_premium.csv"
		And User presses Calculate button at Premium section on Creating Quote form
		And User verifies info on Creating Quote form for Varsam product Innbo Seasonal - Renewal case - Partial Insurance "./data_varsam/varsam_staging/VAR-1677_1_data_quote.csv"
		And User verifies info at Purchase Constraints on Creating Quote form "./data_varsam/varsam_staging/VAR-1677_1_data_purchase_constraint1.csv"
		Then User presses Approve button on Creating Quote form
		And User verifies content on toast message "./data_varsam/varsam_staging/VAR-1677_1_data_purchase_constraint2.csv"
		And User verifies info at Purchase Constraints on Creating Quote form "./data_varsam/varsam_staging/VAR-1677_1_data_purchase_constraint2.csv"
		And User presses Accept button on Creating Quote form
		And User verifies info Quote Ready for Purchase on Creating Payment Quote form - Renewal case
	@TEST_VAR-7065 @Auto
	Scenario: [TC_Regression] [Varsam] [VAR-1677] Purchase policy
		## Steps 4 -> 5
		Given User purchases quote at Creating Quote page
		And User selects Payment Option "./data_varsam/varsam_staging/VAR-1677_1_data_payment_option.csv"
		When User verifies policy information at Policy Created page
		And User verifies policy information at policy detail page for Varsam product Innbo Seasonal - Renewal case "./data_varsam/varsam_staging/VAR-1677_1_data_quote.csv"
		Then User validate the generate document on "Policy" documents "./data_varsam/varsam_staging/VAR-1677_2_document_quote.csv"
		### Skip verifying the document
		# And User validate content in the dowloaded file for Varsam product Innbo Seasonal - Renewal case
	@TEST_VAR-7066 @Auto
	Scenario: [TC_Regression] [Varsam] [VAR-1677] Check Renew quote and Purchase policy
		#Step 5 -> 
		Given User is on Quote list
		And User verifies info of Create quote form after renew for Varsam product Innbo Seasonal - Renewal case
		And User verifies info on Creating Quote form after renew for Varsam product Innbo Seasonal - Renewal case "./data_varsam/varsam_staging/VAR-1677_1_data_quote.csv"
		And User presses Back button on Creating Payment Quote form
		
		#Step 7
		When User inputs Cover Type as "Full Insurance" then presses Next button on Create quote form for Varsam product Innbo Seasonal
		And User verifies info on Creating Quote form after renew for Varsam product Innbo Seasonal - Renewal case "./data_varsam/varsam_staging/VAR-1677_1_data_quote.csv"
		And User presses Back button on Creating Payment Quote form
		
		#Step 8
		When User inputs Cover Type as "Traffic only" then presses Next button on Create quote form for Varsam product Innbo Seasonal
		And User verifies info on Creating Quote form after renew for Varsam product Innbo Seasonal - Renewal case "./data_varsam/varsam_staging/VAR-1677_1_data_quote.csv"
		
		And User presses Accept button on Creating Quote form
		Given User purchases quote at Creating Quote page
		And User selects Payment Option "./data_varsam/varsam_staging/VAR-1677_1_data_payment_option.csv"
		When User verifies policy information at Policy Created page
		And User verifies policy information at policy detail page after renew for Varsam product Innbo Seasonal - Renewal case "./data_varsam/varsam_staging/VAR-1677_1_data_quote.csv"
		Then User validate the generate document on "Policy" documents "./data_varsam/varsam_staging/VAR-1677_2_document_quote.csv"
	@TEST_VAR-7071 @Auto
	Scenario: [TC_Regression] [Varsam] [VAR-1678] Cover type Full Insurance
		Given User closes all opening entities
		And User navigates to Account list
		When User searches an account on recent accounts search field "./data_varsam/varsam_staging/SAAS-5708_data_open_account.csv"
				
		
		## Steps 2 Create quote
		Given User is on Select a product page
		And User selects a sale channel from csv file "./data_varsam/varsam_staging/VAR-1678_1_data_quote.csv"
		And User selects a product from csv file "./data_varsam/varsam_staging/VAR-1678_1_data_quote.csv"
		# Post number = 5545
		When User inputs data on Create Quote form for Varsam product Innbo Seasonal "./data_varsam/varsam_staging/VAR-1678_1_data_quote.csv"
		And User presses Next button on Create Quote form
		And User inputs data at Premium section on Creating Quote form for Varsam product Innbo Seasonal "./data_varsam/varsam_staging/VAR-1678_1_data_quote_calculate_premium.csv"
		And User presses Calculate button at Premium section on Creating Quote form
		And User verifies info on Creating Quote form for Varsam product Innbo Seasonal "./data_varsam/varsam_staging/VAR-1678_1_data_quote.csv"
		And User verifies info at Purchase Constraints on Creating Quote form "./data_varsam/varsam_staging/VAR-1678_1_data_purchase_constraint1.csv"
		Then User presses Approve button on Creating Quote form
		And User verifies content on toast message "./data_varsam/varsam_staging/VAR-1678_1_data_purchase_constraint2.csv"
		And User verifies info at Purchase Constraints on Creating Quote form "./data_varsam/varsam_staging/VAR-1678_1_data_purchase_constraint2.csv"
		And User presses Accept button on Creating Quote form
		And User verifies info Quote Ready for Purchase on Creating Payment Quote form "./data_varsam/varsam_staging/VAR-1678_1_data_quote.csv"
		
		
		## Steps 3 Purchase policy
		Given User purchases quote at Creating Quote page
		And User selects Payment Option "./data_varsam/varsam_staging/VAR-1678_1_data_payment_option.csv"
		When User verifies policy information at Policy Created page
		And User verifies policy information at policy detail page "./data_varsam/varsam_staging/VAR-1678_1_data_quote.csv"
		Then User validate the generate document on "Policy" documents "./data_varsam/varsam_staging/VAR-1678_1_document_quote.csv"
		And User validate content in the dowloaded file "./baseline_pdf/VAR-1678_1_Varsam_SofiaInnboSeasonal.pdf"
	@TEST_VAR-7072 @Auto
	Scenario: [TC_Regression] [Varsam] [VAR-1678] Cover type Partial insurance
		## Steps 2 Create quote
		Given User is on Select a product page
		And User selects a sale channel from csv file "./data_varsam/varsam_staging/VAR-1678_2_data_quote.csv"
		And User selects a product from csv file "./data_varsam/varsam_staging/VAR-1678_2_data_quote.csv"
		# Post number = 5545
		When User inputs data on Create Quote form for Varsam product Innbo Seasonal "./data_varsam/varsam_staging/VAR-1678_2_data_quote.csv"
		And User presses Next button on Create Quote form
		And User inputs data at Premium section on Creating Quote form for Varsam product Innbo Seasonal "./data_varsam/varsam_staging/VAR-1678_2_data_quote_calculate_premium.csv"
		And User presses Calculate button at Premium section on Creating Quote form
		And User verifies info on Creating Quote form for Varsam product Innbo Seasonal "./data_varsam/varsam_staging/VAR-1678_2_data_quote.csv"
		And User verifies info at Purchase Constraints on Creating Quote form "./data_varsam/varsam_staging/VAR-1678_2_data_purchase_constraint1.csv"
		Then User presses Approve button on Creating Quote form
		And User verifies content on toast message "./data_varsam/varsam_staging/VAR-1678_2_data_purchase_constraint2.csv"
		And User verifies info at Purchase Constraints on Creating Quote form "./data_varsam/varsam_staging/VAR-1678_2_data_purchase_constraint2.csv"
		And User presses Accept button on Creating Quote form
		And User verifies info Quote Ready for Purchase on Creating Payment Quote form "./data_varsam/varsam_staging/VAR-1678_2_data_quote.csv"
		
		
		## Steps 3 Purchase policy
		Given User purchases quote at Creating Quote page
		And User selects Payment Option "./data_varsam/varsam_staging/VAR-1678_2_data_payment_option.csv"
		When User verifies policy information at Policy Created page
		And User verifies policy information at policy detail page "./data_varsam/varsam_staging/VAR-1678_2_data_quote.csv"
		Then User validate the generate document on "Policy" documents "./data_varsam/varsam_staging/VAR-1678_2_document_quote.csv"
		And User validate content in the dowloaded file "./baseline_pdf/VAR-1678_2_Varsam_SofiaInnboSeasonal.pdf"
	@TEST_VAR-7073 @Auto
	Scenario: [TC_Regression] [Varsam] [VAR-1678] Cover type Partial insurance 2
		## Steps 2 Create quote
		Given User is on Select a product page
		And User selects a sale channel from csv file "./data_varsam/varsam_staging/VAR-1678_3_data_quote.csv"
		And User selects a product from csv file "./data_varsam/varsam_staging/VAR-1678_3_data_quote.csv"
		# Post number = 5545
		When User inputs data on Create Quote form for Varsam product Innbo Seasonal "./data_varsam/varsam_staging/VAR-1678_3_data_quote.csv"
		And User presses Next button on Create Quote form
		And User inputs data at Premium section on Creating Quote form for Varsam product Innbo Seasonal "./data_varsam/varsam_staging/VAR-1678_3_data_quote_calculate_premium.csv"
		And User presses Calculate button at Premium section on Creating Quote form
		And User verifies info on Creating Quote form for Varsam product Innbo Seasonal "./data_varsam/varsam_staging/VAR-1678_3_data_quote.csv"
		And User verifies info at Purchase Constraints on Creating Quote form "./data_varsam/varsam_staging/VAR-1678_3_data_purchase_constraint1.csv"
		Then User presses Approve button on Creating Quote form
		And User verifies content on toast message "./data_varsam/varsam_staging/VAR-1678_3_data_purchase_constraint2.csv"
		And User verifies info at Purchase Constraints on Creating Quote form "./data_varsam/varsam_staging/VAR-1678_3_data_purchase_constraint2.csv"
		And User presses Accept button on Creating Quote form
		And User verifies info Quote Ready for Purchase on Creating Payment Quote form "./data_varsam/varsam_staging/VAR-1678_3_data_quote.csv"
		
		
		## Steps 3 Purchase policy
		Given User purchases quote at Creating Quote page
		And User selects Payment Option "./data_varsam/varsam_staging/VAR-1678_3_data_payment_option.csv"
		When User verifies policy information at Policy Created page
		And User verifies policy information at policy detail page "./data_varsam/varsam_staging/VAR-1678_3_data_quote.csv"
		Then User validate the generate document on "Policy" documents "./data_varsam/varsam_staging/VAR-1678_3_document_quote.csv"
		And User validate content in the dowloaded file "./baseline_pdf/VAR-1678_3_Varsam_SofiaInnboSeasonal.pdf"
	@TEST_VAR-7074 @Auto
	Scenario: [TC_Regression] [Varsam] [VAR-1678] Cover type Traffic only
		## Steps 2 Create quote
		Given User is on Select a product page
		And User selects a sale channel from csv file "./data_varsam/varsam_staging/VAR-1678_4_data_quote.csv"
		And User selects a product from csv file "./data_varsam/varsam_staging/VAR-1678_4_data_quote.csv"
		# Post number = 5545
		When User inputs data on Create Quote form for Varsam product Innbo Seasonal "./data_varsam/varsam_staging/VAR-1678_4_data_quote.csv"
		And User presses Next button on Create Quote form
		And User inputs data at Premium section on Creating Quote form for Varsam product Innbo Seasonal "./data_varsam/varsam_staging/VAR-1678_4_data_quote_calculate_premium.csv"
		And User presses Calculate button at Premium section on Creating Quote form
		And User verifies info on Creating Quote form for Varsam product Innbo Seasonal "./data_varsam/varsam_staging/VAR-1678_4_data_quote.csv"
		And User verifies info at Purchase Constraints on Creating Quote form "./data_varsam/varsam_staging/VAR-1678_4_data_purchase_constraint1.csv"
		Then User presses Approve button on Creating Quote form
		And User verifies content on toast message "./data_varsam/varsam_staging/VAR-1678_4_data_purchase_constraint2.csv"
		And User verifies info at Purchase Constraints on Creating Quote form "./data_varsam/varsam_staging/VAR-1678_4_data_purchase_constraint2.csv"
		And User presses Accept button on Creating Quote form
		And User verifies info Quote Ready for Purchase on Creating Payment Quote form "./data_varsam/varsam_staging/VAR-1678_4_data_quote.csv"
		
		
		## Steps 3 Purchase policy
		Given User purchases quote at Creating Quote page
		And User selects Payment Option "./data_varsam/varsam_staging/VAR-1678_4_data_payment_option.csv"
		When User verifies policy information at Policy Created page
		And User verifies policy information at policy detail page "./data_varsam/varsam_staging/VAR-1678_4_data_quote.csv"
		Then User validate the generate document on "Policy" documents "./data_varsam/varsam_staging/VAR-1678_4_document_quote.csv"
		And User validate content in the dowloaded file "./baseline_pdf/VAR-1678_4_Varsam_SofiaInnboSeasonal.pdf"
	@TEST_VAR-7076 @Auto
	Scenario: [TC_Regression] [Product Builder] Reorder question when user view/create questions - Check active version
		Given User closes all opening entities
		And User navigates to Product Builder
		And User opens the product on product list "./data_varsam/varsam_staging/VAR-2433_1_data_product_active_version.csv"
		When User opens the active version on product details
		Then User verifies UI at the product version details "./data_varsam/varsam_staging/VAR-2433_1_data_product_active_version.csv"
		And User navigates to questions tab
		And User can not reorder questions tag
	@TEST_VAR-7077 @Auto
	Scenario: [TC_Regression] [Product Builder] Reorder question when user view/create questions - Check draft version
		Given User navigates to Product Builder
		And User opens the product on product list "./data_varsam/varsam_staging/VAR-2433_2_data_product_draft_version.csv"
		When User opens the draft version on product details
		And User navigates to questions tab
		And User adds and deletes new question at question tab on product details "./data_varsam/varsam_staging/VAR-2433_2_data_product_draft_version.csv"
		Then User reorders questions tag but no savings
		And User reorders questions tag successfully
	#{noformat}## Clone new version and reorder question
	### Delete/Edit question => Drag and drop to Process layout => Public
	### Create quote with new version
	### Rever version{noformat}
	@TEST_VAR-7078 @Auto
	Scenario: [TC_Regression] [Product Builder] Reorder question when user edit/delete questions
		## v92 - status Draft
		Given User navigates to Product Builder
		And User opens the product on product list "./data_varsam/varsam_staging/VAR-2434_data_product_clone_version.csv"
		When User clones new version for product and reorder questions "./data_varsam/varsam_staging/VAR-2434_data_product_clone_version.csv"
		And User changes questions and actives new version
		And User navigates to Account list
		And User opens an account from precondition steps
		Then User is on Quote list
		And User checks field on Create quote form after edit questions "./data_varsam/varsam_staging/VAR-2434_data_product_clone_version.csv"
		And User reverts old version for product
	@TEST_VAR-7081 @Auto
	Scenario: [Regression][TC] Check Create Commission Configuration
		# Precondition - Create pipeline
		Given User navigates to Pipeline list
		And User inputs valid pipeline data from csv file "./data_varsam/varsam_staging/VAR-3738_data_pipeline.csv"
		
		# Step 2 -> 6, and step 8 - Create Commission
		And User is on Commission Configuration list
		And User opens Create Commission Configuration form
		When User inputs valid data into Commission Configuration form "./data_varsam/varsam_staging/VAR-3738_data_commission.csv"
		Then User presses "Save" button on "Commission Configuration" form
		And User verifies content on toast message "./data_varsam/varsam_staging/VAR-3738_data_commission.csv"
		And User verifies info at Commission Configuration list "./data_varsam/varsam_staging/VAR-3738_data_commission.csv"
		And User opens Update Commission Configuration form at first row
		And User verifies info into Commission Configuration form "./data_varsam/varsam_staging/VAR-3738_data_commission.csv"
		And User presses "X" button on "Commission Configuration" form
		# Step 7, Check Pipeline stage for other commission
		When User opens Create Commission Configuration form
		Then User checks options in Sale Stage on Commission Configuration form "./data_varsam/varsam_staging/VAR-3738_data_commission.csv"
	@TEST_VAR-7082 @Auto
	Scenario: [Regression][TC] Check Update/Delete Sale Commission Configuration
		# Step 1 -> 6, Re-select pipeline
		Given User is on Commission Configuration list
		When User verifies fields on Update Commission Configuration form
		
		# Steps 7 -> 9
		When User inputs valid data into Commission Configuration form "./data_varsam/varsam_staging/VAR-3739_data_commission.csv"
		Then User presses "Save" button on "Commission Configuration" form
		And User verifies content on toast message "./data_varsam/varsam_staging/VAR-3739_data_commission.csv"
		And User verifies info at Commission Configuration list "./data_varsam/varsam_staging/VAR-3739_data_commission.csv"
		And User opens Update Commission Configuration form at first row
		And User verifies info into Commission Configuration form "./data_varsam/varsam_staging/VAR-3739_data_commission.csv"
		And User presses "X" button on "Commission Configuration" form
		
		# Steps 10 -> 12
		Given User deletes a commission configuration
		Given User navigates to Pipeline list
		Given User deletes a pipeline
	@TEST_VAR-7083 @Auto @Household
	Scenario: [TC_Regression] [Households] Add memember different address to existing household
		Given System auto generates timestamp variables
		And User closes all opening entities
		
		# Precondition Create account - steps 1
		Given User navigates to Account list
		And User creates multiple person accounts "./data_json/VAR-7083_0.json"
		Given User navigates to Household list
		And User is on Suggestions Household tab
		And User verifies suggestions household list "./data_json/VAR-7083_0.json"
		When User creates a household from the suggestion "./data_json/VAR-7083_0.json"
		And User navigates to Household list
		And User verifies household list "./data_json/VAR-7083_0.json"
		
		# Steps 2 - 3
		Given User navigates to Account list
		And User creates multiple person accounts "./data_json/VAR-7083_1.json"
		Given User navigates to Household list
		And User is on Suggestions Household tab
		And User verifies suggestions household list "./data_json/VAR-7083_1.json"
		When User creates a household from the suggestion "./data_json/VAR-7083_1.json"
		And User navigates to Household list
		And User verifies household list "./data_json/VAR-7083_1.json"
		
		# # Step 4
		Given User updates address of account from household list "./data_json/VAR-7083_0.json"
		
		# # Steps 5
		And User navigates to Household list
		And User verifies household list "./data_json/VAR-7083_1.json"
		
		# # Step 6
		And User is on Suggestions Household tab
		And User verifies suggestions household list "./data_json/VAR-7083_2.json"
		
		# # Steps 7-> 8
		And User connects a member to household on Suggestion List "./data_json/VAR-7083_3.json"
		And User navigates to Household list
		And User verifies household list "./data_json/VAR-7083_3.json"
		
		# Steps 9
		Given User navigates to Account list
		And User creates multiple person accounts "./data_json/VAR-7083_4.json"
		
		# step 10 -> 12
		And User navigates to Household list
		And User add member to househouse "./data_json/VAR-7083_4.json"
	#Bug => https://contemi.atlassian.net/browse/VAR-6026
	@TEST_VAR-7084 @Auto
	Scenario: [TC_Regression] [Households] Remove member from existing household
		Given User navigates to Household list
		When User checks Remove button of each member on Household list
		Then User removes a member on Household list
		Given User navigates to Account list
		And User deletes an account from csv file "./data_json/VAR-7083_5.json"
	@TEST_VAR-7428 @Auto
	Scenario: [TC_Regression] Verify create a New Business quote for product (Fritidshus or Villahem or Cabin) that has Y-Factor, and the customer is a good credit customer
		Given User closes all opening entities
		Given User navigates to Account list
		And User searches an account on recent accounts search field "./data_varsam/varsam_staging/SAAS-5708_data_open_account.csv"
		When User is on Select a product page
		And User selects a sale channel "All Sales Channel" and product "Fritidshus"
		When User fill data for product Fritidshus "./data_json/VAR-7428.json"
		And User presses Next button on Create Quote form
		And User inputs data at Premium section on Creating Quote form for Varsam product "./data_json/VAR-7428.json"
		And User presses Calculate button at Premium section on Creating Quote form
		Then User verifies info on Creating Quote form for Varsam product Fritidshus "./data_json/VAR-7428.json"
