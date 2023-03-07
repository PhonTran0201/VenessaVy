import { FieldManager } from "./FieldManager";

class UndefinedFieldManager extends FieldManager {
    constructor(driver?, element?) {
        super(driver, element);
    }
    async setValue(value: any): Promise<void> {
        throw new Error("Method not implemented for undefined field manager.");
    }
    async getValue(): Promise<string> {
        throw new Error("Method not implemented for undefined field manager.");
    }
}

export { UndefinedFieldManager };
