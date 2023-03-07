export class DataConfig {
    static readonly TENANT: string = `varsam`; // varsam || seamless
    static readonly ENV: string = 'staging'; // staging || uat
    static readonly DEFAULT_ACCOUNT = "terry.contemi@varsam-staging"; // terry@manualtest-4 // terry.contemi@varsam-staging
    static readonly DEFAULT_PASSWORD = "@Anhdeptrai2020#";

    static readonly DEFAULT_ACCOUNT_2 = "bruce.contemi@contemi-testing";
    static readonly DEFAULT_PASSWORD_2 = "091299@tH";

    static readonly DATA_PATH: string = `src/core/modals/data/${DataConfig.TENANT}/${DataConfig.ENV}/`;
    static readonly MODAL_PATH: string = `src/core/modals/${DataConfig.TENANT}/${DataConfig.ENV}/`;

    static readonly DATA_MAPPING_PATH: string = `src/core/modals/data/MappingField.xlsx`;

    static readonly AWS_URL: string = `https://cognito-idp.eu-west-2.amazonaws.com`;
}