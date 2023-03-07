import { FieldManager } from "./FieldManager";

class MenuFieldManager extends FieldManager {
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
    super.click();
  }
}

export { MenuFieldManager };
