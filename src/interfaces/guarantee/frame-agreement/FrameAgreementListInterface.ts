export interface FrameAgreementListInterface {
    //#region Methods to validate Frame agreement list
    validateFrameAgmtNoOnFrameAgreementList(expectedValue: string, positionRow?: number): Promise<boolean>;
    validatePeriodOnFrameAgreementList(expectedValue: string, positionRow?: number): Promise<boolean>;
    validateNameNoOnFrameAgreementList(expectedValue: string, positionRow?: number): Promise<boolean>;
    validateLimitExposureNoOnFrameAgreementList(expectedValue: string, positionRow?: number): Promise<boolean>;
    validateCapacityOnFrameAgreementList(expectedValue: string, positionRow?: number): Promise<boolean>;
    validateRemainingCapacityOnFrameAgreementList(expectedValue: string, positionRow?: number): Promise<boolean>;
    validateTypeOnFrameAgreementList(expectedValue: string, positionRow?: number): Promise<boolean>;
    validateStatusOnFrameAgreementList(expectedValue: string, positionRow?: number): Promise<boolean>;

    validateFrameAgreementNTSType(expectedValue: string, positionRow?: number): Promise<boolean>;
    validateCreatedApplicationButton(expectedValue: string, positionRow?: number): Promise<boolean>;
    //#endregion

    //#region Open detail
    openFrameAgreementDetails(selectedFrameAgreement: string): Promise<boolean>;
    openFrameAgreementDetailsByRow(positionRow?: number): Promise<boolean>;
    openCreateApplicationOptionsFormByRow(positionRow?: number): Promise<boolean>;
    //#endregion

    //#region Get value on list
    getFrameAgreementNo(): Promise<string>;
    getFrameAgreementNoByRow(positionRow?: number): Promise<string>;
    getPeriodByRow(positionRow?: number): Promise<string>;
    getNameByRow(positionRow?: number): Promise<string>;
    getLimitExposureByRow(positionRow?: number): Promise<number>;
    getCapacityByRow(positionRow?: number): Promise<number>;
    getRemainingCapacityByRow(positionRow?: number): Promise<number>;
    getStatusByRow(positionRow?: number): Promise<string>;
    //#endregion
}