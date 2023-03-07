
// In Customer portal, It is called Frame agreement detail
export interface FrameAgreementFormInterface {
    //#region Validate values Details tab on FA form without Product list
    validateFrameAgreementNumber_FrameAgreementForm_DetailsTab(expectedValue: string): Promise<boolean>;
    validateName_FrameAgreementForm_DetailsTab(expectedValue: string): Promise<boolean>;
    validateStartDate_FrameAgreementForm_DetailsTab(expectedValue: string): Promise<boolean>;
    validateEndDate_FrameAgreementForm_DetailsTab(expectedValue: string): Promise<boolean>;
    validateUsed_FrameAgreementForm_DetailsTab(expectedValue: string): Promise<boolean>;
    validateRemainingCapacity_FrameAgreementForm_DetailsTab(expectedValue: string): Promise<boolean>;
    validateTotalLimitExposure_FrameAgreementForm_DetailsTab(expectedValue: string): Promise<boolean>;
    validateCurrency_FrameAgreementForm_DetailsTab(expectedValue: string): Promise<boolean>;
    //#endregion

    //#region Product list 
    validateProductName_ProductList_FrameAgreementForm_DetailsTab(expectedValue: string, positionRow?: number): Promise<boolean>;
    validateParameter_ProductList_FrameAgreementForm_DetailsTab(parameterName: string, expectedValue: string, positionRow?: number): Promise<boolean>;
    validateCombineParameters_ProductList_FrameAgreementForm_DetailsTab(expectedValue: string, positionRow?: number): Promise<boolean>;
}