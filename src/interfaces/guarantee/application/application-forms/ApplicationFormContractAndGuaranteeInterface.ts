export interface ApplicationFormContractAndGuaranteeInterface {
    //#region Methods Input values
    // 1. Underlying contract section
    inputTotalContractAmountUnderlying(TotalContractAmount: string): Promise<boolean>;
    inputContractReferenceUnderlying(ContractReference: string): Promise<boolean>;
    inputDateForSignedContractUnderlying(DateForSignedContract: string): Promise<boolean>;
    /**
     * 
     * @param UnderlyingContractDoc Just input one file at a time.
     * @returns 
     */
    inputUnderlyingContractDocUnderlying(UnderlyingContractDoc: string): Promise<boolean>;
    inputProjectUnderlying(Project: string): Promise<boolean>;
    inputProjectNameUnderlying(ProjectName: string): Promise<boolean>;
    inputProjectAddressUnderlying(ProjectAddress: string): Promise<boolean>;
    inputProjectDescriptionUnderlying(ProjectDescription: string): Promise<boolean>;
    inputContractCommitmentUnderlying(ContractCommitment: string): Promise<boolean>;
    inputGardsnummerUnderlying(Gardsnummer: string): Promise<boolean>;
    inputBruksnummerUnderlying(Bruksnummer: string): Promise<boolean>;
    inputKommuneUnderlying(Kommune: string): Promise<boolean>;

    // 2. Guarantee section
    inputPeriodStartGuarantee(PeriodStart: string): Promise<boolean>;
    inputPeriodEndGuarantee(PeriodEnd: string): Promise<boolean>;
    inputGuaranteeAmountGuarantee(GuaranteeAmount: string): Promise<boolean>;
    inputGuaranteeRateGuarantee(GuaranteeRate: string): Promise<boolean>;
    inputCommentGuarantee(Comment: string): Promise<boolean>;

    //Phase 2
    inputPeriodStartGuaranteePhase2(PeriodStartPhase2: string): Promise<boolean>;
    inputPeriodEndGuaranteePhase2(PeriodEndPhase2: string): Promise<boolean>;
    inputGuaranteeAmountGuaranteePhase2(GuaranteeAmountPhase2: string): Promise<boolean>;
    inputGuaranteeRateGuaranteePhase2(GuaranteeRatePhase2: string): Promise<boolean>;
    inputCommentGuaranteePhase2(CommentPhase2: string): Promise<boolean>;
    // Product 
    checkRenewGuaranteeGuarantee(): Promise<boolean>;

    // 3. Project information (specific for HOGSE product BRF Insats garanti)
    inputNumberOfUnitsProjectInformation(NumberOfUnits: string): Promise<boolean>;
    inputDateForCostEstimateProjectInformation(DateForCostEstimate: string): Promise<boolean>;
    inputStreetNameProjectInformation(StreetName: string, PositionRow: number): Promise<boolean>;
    inputHouseNumberProjectInformation(HouseNumber: string, PositionRow: number): Promise<boolean>;
    pressAddButtonProjectInformation(): Promise<boolean>;

    //#endregion
    validateTotalContractAmountMultipleGuarantee(amount: number): Promise<boolean>;
    validateGuaranteeAmountPhase1MultipleGuarantee(amount: number): Promise<boolean>;
    validateGuaranteeAmountPhase2MultipleGuarantee(amount: number): Promise<boolean>;
}
