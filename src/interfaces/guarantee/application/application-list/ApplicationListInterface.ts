export interface ApplicationListInterface {
    //#region Validate value
    validateApplicationsNameValueOnList(ExpectedValue: string, positionRow?: number, isUsedForSearch?: boolean): Promise<boolean>;
    validateApplicationsPeriodValueOnList(ExpectedValue: string, positionRow?: number, isUsedForSearch?: boolean): Promise<boolean>;
    validateFrameAgmtNoValueOnList(ExpectedValue: string, positionRow?: number, isUsedForSearch?: boolean): Promise<boolean>;
    validateDebtorValueOnList(ExpectedValue: string, positionRow?: number, isUsedForSearch?: boolean): Promise<boolean>;
    validateProductValueOnList(ExpectedValue: string, positionRow?: number, isUsedForSearch?: boolean): Promise<boolean>;
    validateBenificiaryValueOnList(ExpectedValue: string, positionRow?: number, isUsedForSearch?: boolean): Promise<boolean>;
    validateStatusValueOnList(ExpectedValue: string, positionRow?: number, isUsedForSearch?: boolean): Promise<boolean>;
    //#endregion

    //#region Open Form
    openApplicationDetailByRow(positionRow: number): Promise<boolean>;
    //#endregion

    getValueFrameAgmtNoOnList(positionRow?: number): Promise<string>;
    getValueProductOnList(positionRow?: number): Promise<string>;
    getValueApplicationNoOnList(positionRow?: number): Promise<string>;
}