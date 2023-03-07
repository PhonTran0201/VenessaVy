export class FieldError extends Error {
    constructor(element: any, value: string, message?: string) {
        super(message);
    }

    getDetail(): string {
        return `Error: ${this.message}`;
    }
}