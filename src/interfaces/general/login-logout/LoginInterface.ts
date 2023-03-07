export interface LoginInterface{
    navigate(data: string): Promise<boolean>;
    inputLogin(data: string, type: string): Promise<void>;
    inputUsername(username: string): Promise<boolean>;
    inputPassword(username: string): Promise<boolean>;
    pressLogin(): Promise<boolean>;
    pressResetPassword(): Promise<boolean>;
    isNavigatingInMainPageByName(pageName: string): Promise<boolean>;
    inputCustomerId(CustomerId: string): Promise<boolean>;
}