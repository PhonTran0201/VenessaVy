import { FieldGenerator as FG } from "../FieldGenerator";
import { BaseModal } from "./base.modal";

export class User extends BaseModal {

    constructor(tenant) {
        super(tenant);
    }
    
    protected getModelVarsam() {
        this.modal = {
            email: FG.getEmail(),
            firstName: FG.getFirstName(),
            lastName: FG.getLastName(),
        };
    }
    protected getModelSeamless() {
        this.modal = {
            email: FG.getEmail(),
            firstName: FG.getFirstName(),
            lastName: FG.getLastName(),
            phone: FG.getPhoneNo(),
        };
    }
    
    protected getModelSample() {
        throw new Error("Method not implemented.");
    }
    
    
}