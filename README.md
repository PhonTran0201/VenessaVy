## Setting environment

Run `npm install` to restore all dependencies

## Running tests

Run `npm run test` to execute the tests

## Running report

Run `npm run report` to generate report

## Further instruction

1. features folder: contains all cucumber features and Scenarios
2. page-objects folder: contains all page object models, please see LoginPage for example.
3. step-definitions folder: contains all cucumber steps was defined in features folder. We define Given When Then for each feature here.

## Note

This project is using chromedriver version 79, so please make sure your chrome browser is updated to version 79. To update chrome to version 79, open chrome, go to Setting menu -> About chrome (or just paste this link to your browser: `chrome://settings/help`) -> Update to latest version.

## Meaning of tags

@RegressionTest
    - This tag decides a test case will not logout after finish execute.
    - The data on Jira will be attached on path "/data_regression/"

@CustomerPortalAtlas
    - It includes test cases that executed on Customer portal Atlas system

@CustomerPortalHogs
    - It includes test cases that executed on Customer portal Hogs system

@AgentPortalHogs
    - It includes test cases that executed on Agent portal Hogs system

@ThirdParty24Senven
    - It includes test cases that executed on 24Senven system

@HOGSE
    - It includes test cases that executed on BOP project HOGSE

@Atlas
    - It includes test cases that executed on BOP project Atlas

@Hogs
    - It includes test cases that executed on BOP project Hogs


System Language Tags: affect to test case level

- By default: we are testing in English(using tag @English)
- With Norwegian: using tags @Norway, @Norsk or @Norwegian
- With Swedish: using tags @Swedish, @Svenska
