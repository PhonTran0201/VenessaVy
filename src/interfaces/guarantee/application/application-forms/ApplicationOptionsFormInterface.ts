export interface ApplicationOptionsFormInterface {
    //#region Methods Input values
    inputProduct(Product: string): Promise<boolean>;
    inputApplicationType(ApplicationType: string): Promise<boolean>;
    inputDebtor(Debtor: string): Promise<boolean>;
    //#endregion

    //#region Methods validate values
    validateProduct(ExpectedValue: string): Promise<boolean>;
    validateApplicationType(ExpectedValue: string): Promise<boolean>;
    validateDebtor(ExpectedValue: string): Promise<boolean>;
    //#endregion
}
