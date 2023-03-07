export class ValidateField {
    public nameField: string;
    public index: number = -1;
    public status: boolean = true;
    public message: string[] = [];
    public toastMessage: string[] = [];

    constructor(nameField: string, index: number, status: boolean, message: string[], toastMessage: string[]) {
        this.nameField = nameField;
        this.index = index;
        this.status = status;
        this.message = message;
        this.toastMessage = toastMessage;
    }
}
