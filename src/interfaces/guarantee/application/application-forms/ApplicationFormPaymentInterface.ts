export interface ApplicationFormPaymentInterface {
    //#region Methods Input values

    // 2. Other fee section
    inputEstablishmentFeeOther(EstablishmentFee: string): Promise<boolean>;
    //#endregion

    //#region Methods validate values
    // 1. Guarantee fee section
    validateGuaranteeFeeGuarantee(ExpectedValue: string): Promise<boolean>;
    validatePremiumRateGuarantee(ExpectedValue: string): Promise<boolean>;
    validatePaymentMethodGuarantee(ExpectedValue: string): Promise<boolean>;
    validateCommissionGuarantee(ExpectedValue: string): Promise<boolean>;
    validateCommissionRateGuarantee(ExpectedValue: string): Promise<boolean>;

    //#region Two Phase
    validateGuaranteeFeeGuaranteePhase2(ExpectedValue: string): Promise<boolean>;
    validateTotalGuaranteeFeeGuarantee(ExpectedValue: string): Promise<boolean>;
    validateCommissionGuaranteePhase2(ExpectedValue: string): Promise<boolean>;
    validateTotalCommissionGuarantee(ExpectedValue: string): Promise<boolean>;
    //#endregion
    //#endregion

    //#region Methods press Buttons
    pressCalculatePriceButtonOtherFee(): Promise<boolean>;
    pressResetButtonOtherFee(): Promise<boolean>;
    //#endregion
}
