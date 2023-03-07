let common = [
	"features_folder/**/*.feature", // Specify our feature files
	"--require src/core/hooks/**/*.ts",
	"--require-module ts-node/register", // Load TypeScript module
	"--require src/step-definitions/**/*.ts", // Load step definitions
	"--format progress-bar", // Load custom formatter
	"--format @cucumber/pretty-formatter", // Load custom formatter
	`--format-options '{"theme":{"datatable border":["green"],"datatable content":["green","italic"],"docstring content":["green","italic"],"docstring delimiter":["green"],"feature description":["white"],"feature keyword":["bold","green"],"rule keyword":["yellow"],"scenario keyword":["greenBright","underline"],"scenario name":["green","underline"],"step keyword":["blue","bold"],"step text":["white","italic"],"tag":["blue"]}}'`,
	"--format json:reports/test_report.json", // cucumer html report formatter
	"--format rerun:@rerun.txt",
].join(" ");

module.exports = {
	default: common,
};
