export interface GlobalPageObjectInterface{
    waitForProgressBarLoaded_v2(millisecondNumber?: number): Promise<boolean>;
    navigateToMainLogOut(): Promise<boolean>;
    checkDashboardButtonMenuExist(): Promise<boolean>;
}