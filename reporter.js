var reporter = require('cucumber-html-reporter');

var options = {
    theme: 'hierarchy',
    jsonFile: 'reports/test_report.json',
    output: 'reports/test_report.html',
    reportSuiteAsScenarios: true,
    launchReport: true,
    metadata: {
        "App Version": "1.0.0",
        "Test Environment": "STAGING",
        "Browser": "Version 76.0.3809.100",
        "Platform": "Windows 10",
        "Executed": "Local"
    }
};

reporter.generate(options);