import { BaseModal } from "./base.modal";

export class Quote extends BaseModal {
    getModelVarsam() {
        this.modal = {
            SalesChannel: '',
            Product: '', 
            StartDate: '', 
            EndDate: '', 
            FirstName: '', 
            LastName: '', 
            DOB: '', 
            CreditRating: '', 
            CustomerClaimCount: '', 
            Address: '', 
            PostCode: '', 
            City: '', 
            RentType: '', 
            AlarmSytem: '', 
            SmokeDetector: '', 
            WaterStopSystem: '', 
            Electricity: '', 
            NumberOfResidents: '', 
            Hussopp: '', 
            ContentSumInsured: '', 
            CoverType: '', 
            ContentType: '', 
            ResidenceType: '', 
            DeductibleContent: '', 
            ContentCover: '', 
            AddBicycle1: '', 
            BicycleSumInsured1: '', 
            ElectricBicycleCover1: '', 
            InternalNote: '', 
            ExternalText: '', 
            TerminationText: '', 
            AlertMessages: '', 
            ExpectedPremium: '', 
            ExpectedStatus: '', 
            Currency: '', 
            TotalPremiumAnnualPremium: '', 
            TotalPremiumPolicyPremium: '', 
            StatusPolicy: '', 
            NameOfPreviousInsurer: '', 
            RenewalMode: '', 
            TemplateDocName: '', 
            ProductVersion: '', 
            PreviousInsurerPopoverMessage: '', 
            PremiumFilePath: '', 
            CoverBreakdownFilePath: ''
        };
    }
    getModelSeamless() {
        throw new Error("Method not implemented.");
    }
    getModelSample() {
        throw new Error("Method not implemented.");
    }
    
}