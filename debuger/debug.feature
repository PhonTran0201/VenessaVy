# @15 @RegressionTest
# Feature: [New staging] [Regression Test] - Claim document

# 	### Version ban đầu là v94 - Version dùng để clone là v92 (draft) 9 8
# 	## Modify ofrm File 16_VAR-1755
# 	@TEST_VAR_000
# 	Scenario: [TC_Regression] [Login] Login successfully
# 		Given User navigate to login page "./data/data_default.txt"
# 		When User input credentials data from csv file "./data/data_default.txt"
# 		And User clicks "Login" button
# 		Then User is navigated to "Dashboard" page

# 	@TEST_VAR_3900_Done
# 	Scenario: [TC_Regression] Verify create a New Business quote for product (Fritidshus or Villahem or Cabin) that has Y-Factor, and the customer is a good credit customer
# 		Given User navigates to Account list
# 		And User searches an account on recent accounts search field "./data_varsam/varsam_staging/SAAS-5708_data_open_account.csv"
# 		When User is on Select a product page
# 		And User selects a sale channel "SaleChannel" and product "ProductFritidshus"
# 		# When User fill data for product Hem "PopulateProductVillahemExcludeQuestion"
# 		# When User fill data for product Villahem "PopulateProductVillahemExcludeQuestion"
# 		When User fill data for product Fritidshus "DataProductFritidshusCabin"
# 		And User presses Next button on Create Quote form
# 		And User inputs data at Premium section on Creating Quote form for Varsam product "DataProductFritidshusCabin"
# 		And User presses Calculate button at Premium section on Creating Quote form
# 		Then User verifies info on Creating Quote form for Varsam product Fritidshus "DataProductFritidshusCabin"
# 		And User presses Approve button on Creating Quote form
# 		And User presses Accept button on Creating Quote form
# 		And User purchases quote at Creating Quote page
# 		And User selects Payment Option "./data_varsam/varsam_preview/VAR-2034_data_payment_option.csv"
# 		And User verifies policy information at Policy Created page
# 		And User verifies policy information at policy detail page for Varsam product "DataProductFritidshusCabin"
		

# 		And User adjusts policy at Policy detail
# 		When User fill data for product Fritidshus "DataProductFritidshusCabinMTA"
# 		And User presses Next button on Create Quote form
# 		And User inputs data at Premium section on Creating Quote form for Varsam product "DataProductFritidshusCabinMTA"
# 		And User presses Calculate button at Premium section on Creating Quote form
# 		Then User verifies info on Creating Quote form for Varsam product Fritidshus "DataProductFritidshusCabinMTA"
# 		And User verifies info on Creating Quote form for Varsam product section Adjustment "DataProductFritidshusCabinMTA"
# 		And User presses Accept button on Creating Quote form
# 		And User purchases quote at Creating Quote page
# 		And User verifies policy information at Policy Created page
# 		And User verifies policy information at policy detail page for Varsam product "DataProductFritidshusCabinMTA"





@44 @VAR-7379 @RegressionTest @Staging @Varsam
Feature: [VAR-303][Regression][TC] Implement Reward log (VAR-303)

    @VAR-7380
    Scenario: [Auto][SmokeTest] Check Reward Log form - Export by select all programs - case 2\
    Given User goes to the page that has link "https://docs.google.com/forms/d/e/1FAIpQLSfhLTCy-YvYMG5-iU3nrTCaLEMOFUPI1MPEbtKUawVLGJK-sg/viewform"
    #     Given User navigates to Reward Log page
    #     When User opens Reward Log Export form
    #     And User inputs data into Reward Log Export form "./data_json/VAR-7380_1.json"
    #     And User presses Export button on Reward Log Export form
    #     Then System display a message "Export customer is processing, we will notify to you after it export successfully"
    #     And User downloads exported file on Reward log Page
    #     And User verifies information is shown correctly in the exported file "./data_json/VAR-7380_2.json"

    # @VAR-7386 @SmokeTest
    # Scenario: [Auto][SmokeTest] Create Program successfully
    #     Given User navigates to Reward Programs
    #     And User selects "Programs" tab in Reward Programs
    #     When User presses create button on Program configuration
    #     And User inputs valid data into program form "./data_json/VAR-7386.json"
    #     Then System display a message "Create program successfully!"
    #     And System shows correct information of the program on the list "./data_json/VAR-7386.json"
    #     And User presses "edit" a program on the list
    #     And User verifies information is shown correctly on program form "./data_json/VAR-7386.json"


    # @VAR-7381 @SmokeTest
    # Scenario: [Auto][SmokeTest] Check Add program
    #     Given User navigates to Reward Log page
    #     When User opens Reward Log Export form
    #     Then User verifies program field on Reward Log Export form works properly "./data_json/VAR-7386.json"

    # @VAR-7382
    # Scenario: [Auto][SmokeTest] Check Reward Log form - Export by select all programs - case 3
    #     Given User navigates to Reward Log page
    #     When User opens Reward Log Export form
    #     And User inputs data into Reward Log Export form "./data_json/VAR-7382_1.json"
    #     And User presses Export button on Reward Log Export form
    #     Then System display a message "Export customer is processing, we will notify to you after it export successfully"
    #     And User downloads exported file on Reward log Page
    #     And User verifies information is shown correctly in the exported file "./data_json/VAR-7382_2.json"

    # @VAR-7384 @SmokeTest
    # Scenario: [Auto][SmokeTest] Delete a Program successfully
    #     Given User navigates to Reward Programs
    #     And User selects "Programs" tab in Reward Programs
    #     When User presses "delete" a program on the list
    #     Then System display a message "Delete program successfully!"
    #     And System does not show the program on the list "./data_json/VAR-7386.json"

    # @VAR-7385 @SmokeTest
    # Scenario: [Auto][SmokeTest] Check delete program
    #     Given User navigates to Reward Log page
    #     When User opens Reward Log Export form
    #     Then User can not find the program option on Reward Log Export form "./data_json/VAR-7386.json"

    # @VAR-7383
    # Scenario: [Auto][SmokeTest] Check Reward Log form - Export by select all programs - case 1
    #     Given User navigates to Reward Log page
    #     And User stores Reward Log list "RewardLogList"
    #     When User opens Reward Log Export form
    #     And User presses Export button on Reward Log Export form
    #     Then System display a message "Export customer is processing, we will notify to you after it export successfully"
    #     And User downloads exported file on Reward log Page
    #     And User verifies information is shown correctly in the exported file "RewardLogList"



