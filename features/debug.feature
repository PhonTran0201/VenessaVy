@44 @VAR-7379 @RegressionTest @Staging @Varsam
Feature: [VAR-303][Regression][TC] Implement Reward log (VAR-303)

    @VAR-7380
    Scenario: [Auto][SmokeTest] Check Reward Log form - Export by select all programs - case 2
        Given User navigates to Reward Log page
        When User opens Reward Log Export form
        And User inputs data into Reward Log Export form "./data_json/VAR-7380_1.json"
        And User presses Export button on Reward Log Export form
        Then System display a message "Export customer is processing, we will notify to you after it export successfully"
        And User downloads exported file on Reward log Page
        And User verifies information is shown correctly in the exported file "./data_json/VAR-7380_2.json"

    @VAR-7386 @SmokeTest
    Scenario: [Auto][SmokeTest] Create Program successfully
        Given User navigates to Reward Programs
        And User selects "Programs" tab in Reward Programs
        When User presses create button on Program configuration
        And User inputs valid data into program form "./data_json/VAR-7386.json"
        Then System display a message "Create program successfully!"
        And System shows correct information of the program on the list "./data_json/VAR-7386.json"
        And User presses "edit" a program on the list
        And User verifies information is shown correctly on program form "./data_json/VAR-7386.json"


    @VAR-7381 @SmokeTest
    Scenario: [Auto][SmokeTest] Check Add program
        Given User navigates to Reward Log page
        When User opens Reward Log Export form
        Then User verifies program field on Reward Log Export form works properly "./data_json/VAR-7386.json"

    @VAR-7382
    Scenario: [Auto][SmokeTest] Check Reward Log form - Export by select all programs - case 3
        Given User navigates to Reward Log page
        When User opens Reward Log Export form
        And User inputs data into Reward Log Export form "./data_json/VAR-7382_1.json"
        And User presses Export button on Reward Log Export form
        Then System display a message "Export customer is processing, we will notify to you after it export successfully"
        And User downloads exported file on Reward log Page
        And User verifies information is shown correctly in the exported file "./data_json/VAR-7382_2.json"

    @VAR-7384 @SmokeTest
    Scenario: [Auto][SmokeTest] Delete a Program successfully
        Given User navigates to Reward Programs
        And User selects "Programs" tab in Reward Programs
        When User presses "delete" a program on the list
        Then System display a message "Delete program successfully!"
        And System does not show the program on the list "./data_json/VAR-7386.json"

    @VAR-7385 @SmokeTest
    Scenario: [Auto][SmokeTest] Check delete program
        Given User navigates to Reward Log page
        When User opens Reward Log Export form
        Then User can not find the program option on Reward Log Export form "./data_json/VAR-7386.json"

    @VAR-7383
    Scenario: [Auto][SmokeTest] Check Reward Log form - Export by select all programs - case 1
        Given User navigates to Reward Log page
        And User stores Reward Log list "RewardLogList"
        When User opens Reward Log Export form
        And User presses Export button on Reward Log Export form
        Then System display a message "Export customer is processing, we will notify to you after it export successfully"
        And User downloads exported file on Reward log Page
        And User verifies information is shown correctly in the exported file "RewardLogList"



