import { FieldManager } from "./FieldManager";

class ButtonFieldManager extends FieldManager {
    constructor(driver?, element?) {
        super(driver, element);
    }
    async setValue(value: any): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async getValue(): Promise<string> {
        throw new Error("Method not implemented.");
    }
    async click(): Promise<void> {
        await super.click();
    }
}

export { ButtonFieldManager };
