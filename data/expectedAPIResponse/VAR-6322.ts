import { stash } from 'pactum'
import * as regex from '../../src/shared/regex'

export class GetPRTSPolicy {
    constructor(quoteRef) {
        stash.addDataTemplate({
            "GetPRSTPolicy": {
                "data": {
                    "type": "policies",
                    "id": "$S{policyId}",
                    "attributes": {
                        "reference": quoteRef,
                        "description": "Uptown Manhattan",
                        "period": {
                            "start": "2021-11-17T00:00:00+00:00",
                            "end": "2022-11-16T23:59:59+00:00"
                        },
                        "productName": "Premium redistribution seasonal tariff ",
                        "productVersionId": "productversion-93c967c7-a840-08da-c86c-47d8e9f7b9c1",
                        "productId": "product-e87e13b5-9bae-08da-34bd-54db132dbec5",
                        "answers": {
                            "temporalBounds": {
                                "start": "2021-11-17T00:00:00+00:00",
                                "end": "2022-11-16T23:59:59+00:00",
                                "insurancePeriodStrategy": "MidnightToMidnight"
                            },
                            "slices": [
                                {
                                    "effectiveDate": "2021-11-17T00:00:00+00:00",
                                    "value": {
                                        "PolicyHolderFirstNameTag": "Bruce",
                                        "PolicyHolderLastNameTag": "Nguyen",
                                        "PolicyHolderDOBTag": "2000-10-12T00:00:00Z",
                                        "PolicyHolderAgeTag": 21,
                                        "CustomerCreditScoreTag": null,
                                        "CustomerClaimCountTag": 22,
                                        "AddressTag": "Uptown Manhattan",
                                        "PostCodeTag": "3705",
                                        "CityTag": "SKIEN",
                                        "RentTypeTag": "Ikke utleid",
                                        "AlarmSystemTag": "Brannalarm med  lokal varsling",
                                        "SmokeDetectorTag": "Seriekoblede Røykvarslere",
                                        "WaterStopSystemTag": "Vannstoppesystem uten varsling",
                                        "ElectricityTag": "Elektrisk anlegg nyere enn 15 år",
                                        "NumberOfResidentsTag": "1",
                                        "IncludeHussoppCoverTag": true,
                                        "ContentSumInsuredTag": 300000,
                                        "ContentSumInsuredCalculationTag": 1839600.0,
                                        "ContentSumInsuredPremiumCalculationTag": 1839600.0,
                                        "ContentTypeTag": "Innbo og løsøre privat",
                                        "ResidenceTypeTag": "Innbo Hus",
                                        "DeductibleContentTag": 6000.0,
                                        "ContentCoverTag": "Standard dekning",
                                        "AddBicycleTag1": null,
                                        "BicycleSumInsuredTag1": null,
                                        "ElectricBicycleCoverTag1": null,
                                        "ElectricBicycleStandardCoverCalculationTag1": 0.0,
                                        "ElectricBicycleSuperCoverCalculationTag1": 0.0,
                                        "AddBicycleTag2": null,
                                        "BicycleSumInsuredTag2": null,
                                        "ElectricBicycleCoverTag2": null,
                                        "ElectricBicycleStandardCoverCalculationTag2": 0.0,
                                        "ElectricBicycleSuperCoverCalculationTag2": 0.0,
                                        "AddBicycleTag3": null,
                                        "BicycleSumInsuredTag3": null,
                                        "ElectricBicycleCoverTag3": null,
                                        "ElectricBicycleStandardCoverCalculationTag3": 0.0,
                                        "ElectricBicycleSuperCoverCalculationTag3": 0.0,
                                        "AddBicycleTag4": null,
                                        "BicycleSumInsuredTag4": null,
                                        "ElectricBicycleCoverTag4": null,
                                        "ElectricBicycleStandardCoverCalculationTag4": 0.0,
                                        "ElectricBicycleSuperCoverCalculationTag4": 0.0,
                                        "AddBicycleTag5": null,
                                        "BicycleSumInsuredTag5": null,
                                        "ElectricBicycleCoverTag5": null,
                                        "ElectricBicycleStandardCoverCalculationTag5": 0.0,
                                        "ElectricBicycleSuperCoverCalculationTag5": 0.0,
                                        "FinalBicycleStandardCoverTag": 0.0,
                                        "FinalBicycleSuperCoverTag": 0.0,
                                        "AdjustmentSelectionTag": 0.0,
                                        "InternalNoteTag": null,
                                        "ExternalTextTag": null,
                                        "TerminationTextTag": null,
                                        "CoverTypeTag": "Traffic only"
                                    }
                                }
                            ],
                            "isEmpty": false
                        },
                        "premium": {
                            "total": {
                                "amount": 2281736.77,
                                "currencyCode": "NOK",
                                "formattedAmount": "2 281 736,77 NOK"
                            },
                            "totalSalesDiscount": {
                                "amount": 0.0,
                                "currencyCode": "NOK",
                                "formattedAmount": "0,00 NOK"
                            },
                            "additionalComponents": {
                                "Commission-Product": {
                                    "amount": 0.0,
                                    "currencyCode": "NOK",
                                    "formattedAmount": "0,00 NOK"
                                },
                                "Commission-Sales": {
                                    "amount": 0.0,
                                    "currencyCode": "NOK",
                                    "formattedAmount": "0,00 NOK"
                                }
                            },
                            "totalProductCommission": {
                                "amount": 0.0,
                                "currencyCode": "NOK",
                                "formattedAmount": "0,00 NOK"
                            },
                            "totalUnderwritingAdjustment": {
                                "amount": 0.0,
                                "currencyCode": "NOK",
                                "formattedAmount": "0,00 NOK"
                            },
                            "totalSalesCommission": {
                                "amount": 0.0,
                                "currencyCode": "NOK",
                                "formattedAmount": "0,00 NOK"
                            },
                            "totalTariffPremium": {
                                "amount": 2281608.00,
                                "currencyCode": "NOK",
                                "formattedAmount": "2 281 608,00 NOK"
                            },
                            "totalDisplayPremium": {
                                "amount": 0.0,
                                "currencyCode": "",
                                "formattedAmount": ""
                            },
                            "tax": {
                                "amount": 128.77,
                                "currencyCode": "NOK",
                                "formattedAmount": "128,77 NOK"
                            },
                            "taxComponents": {
                                "Naturskade": {
                                    "amount": 128.77,
                                    "currencyCode": "NOK",
                                    "formattedAmount": "128,77 NOK"
                                }
                            },
                            "breakdown": [
                                {
                                    "coverId": 118272102,
                                    "coverName": "Hussopp",
                                    "tariffPremium": {
                                        "amount": 504.00,
                                        "currencyCode": "NOK",
                                        "formattedAmount": "504,00 NOK"
                                    },
                                    "salesDiscount": {
                                        "amount": 0.0,
                                        "currencyCode": "NOK",
                                        "formattedAmount": "0,00 NOK"
                                    },
                                    "underwritingAdjustment": {
                                        "amount": 0.0,
                                        "currencyCode": "NOK",
                                        "formattedAmount": "0,00 NOK"
                                    },
                                    "finalTariffPremium": {
                                        "amount": 504.00,
                                        "currencyCode": "NOK",
                                        "formattedAmount": "504,00 NOK"
                                    },
                                    "totalTax": {
                                        "amount": 0.0,
                                        "currencyCode": "NOK",
                                        "formattedAmount": "0,00 NOK"
                                    },
                                    "finalTariffPremiumIncTax": {
                                        "amount": 504.00,
                                        "currencyCode": "NOK",
                                        "formattedAmount": "504,00 NOK"
                                    },
                                    "additionalComponents": {
                                        "Commission-Product": {
                                            "amount": 0.0,
                                            "currencyCode": "NOK",
                                            "formattedAmount": "0,00 NOK"
                                        },
                                        "Commission-Sales": {
                                            "amount": 0.0,
                                            "currencyCode": "NOK",
                                            "formattedAmount": "0,00 NOK"
                                        }
                                    },
                                    "taxComponents": {},
                                    "reportingItems": {
                                        "OriginalTariff": {
                                            "amount": 504.0,
                                            "currencyCode": "NOK",
                                            "formattedAmount": "504,00 NOK"
                                        },
                                        "TotalDiscount": {
                                            "amount": 0.0,
                                            "currencyCode": "NOK",
                                            "formattedAmount": "0,00 NOK"
                                        },
                                        "TotalAtCostCommission": {
                                            "amount": 0.0,
                                            "currencyCode": "NOK",
                                            "formattedAmount": "0,00 NOK"
                                        }
                                    }
                                },
                                {
                                    "coverId": 111312130,
                                    "coverName": "Innbo Standard",
                                    "tariffPremium": {
                                        "amount": 2281104.00,
                                        "currencyCode": "NOK",
                                        "formattedAmount": "2 281 104,00 NOK"
                                    },
                                    "salesDiscount": {
                                        "amount": 0.0,
                                        "currencyCode": "NOK",
                                        "formattedAmount": "0,00 NOK"
                                    },
                                    "underwritingAdjustment": {
                                        "amount": 0.0,
                                        "currencyCode": "NOK",
                                        "formattedAmount": "0,00 NOK"
                                    },
                                    "finalTariffPremium": {
                                        "amount": 2281104.00,
                                        "currencyCode": "NOK",
                                        "formattedAmount": "2 281 104,00 NOK"
                                    },
                                    "totalTax": {
                                        "amount": 128.77,
                                        "currencyCode": "NOK",
                                        "formattedAmount": "128,77 NOK"
                                    },
                                    "finalTariffPremiumIncTax": {
                                        "amount": 2281232.77,
                                        "currencyCode": "NOK",
                                        "formattedAmount": "2 281 232,77 NOK"
                                    },
                                    "additionalComponents": {
                                        "Commission-Product": {
                                            "amount": 0.0,
                                            "currencyCode": "NOK",
                                            "formattedAmount": "0,00 NOK"
                                        },
                                        "Commission-Sales": {
                                            "amount": 0.0,
                                            "currencyCode": "NOK",
                                            "formattedAmount": "0,00 NOK"
                                        }
                                    },
                                    "taxComponents": {
                                        "Naturskade": {
                                            "amount": 128.77,
                                            "currencyCode": "NOK",
                                            "formattedAmount": "128,77 NOK"
                                        }
                                    },
                                    "reportingItems": {
                                        "OriginalTariff": {
                                            "amount": 2281104.00,
                                            "currencyCode": "NOK",
                                            "formattedAmount": "2 281 104,00 NOK"
                                        },
                                        "TotalDiscount": {
                                            "amount": 0.0,
                                            "currencyCode": "NOK",
                                            "formattedAmount": "0,00 NOK"
                                        },
                                        "TotalAtCostCommission": {
                                            "amount": 0.0,
                                            "currencyCode": "NOK",
                                            "formattedAmount": "0,00 NOK"
                                        }
                                    }
                                }
                            ],
                            "premiumBreakdownItems": []
                        },
                        "annualPremium": {
                            "total": {
                                "amount": 2281736.77,
                                "currencyCode": "NOK",
                                "formattedAmount": "2 281 736,77 NOK"
                            },
                            "totalSalesDiscount": {
                                "amount": 0.0,
                                "currencyCode": "NOK",
                                "formattedAmount": "0,00 NOK"
                            },
                            "additionalComponents": {
                                "Commission-Product": {
                                    "amount": 0.0,
                                    "currencyCode": "NOK",
                                    "formattedAmount": "0,00 NOK"
                                },
                                "Commission-Sales": {
                                    "amount": 0.0,
                                    "currencyCode": "NOK",
                                    "formattedAmount": "0,00 NOK"
                                }
                            },
                            "totalProductCommission": {
                                "amount": 0.0,
                                "currencyCode": "NOK",
                                "formattedAmount": "0,00 NOK"
                            },
                            "totalUnderwritingAdjustment": {
                                "amount": 0.0,
                                "currencyCode": "NOK",
                                "formattedAmount": "0,00 NOK"
                            },
                            "totalSalesCommission": {
                                "amount": 0.0,
                                "currencyCode": "NOK",
                                "formattedAmount": "0,00 NOK"
                            },
                            "totalTariffPremium": {
                                "amount": 2281608.00,
                                "currencyCode": "NOK",
                                "formattedAmount": "2 281 608,00 NOK"
                            },
                            "totalDisplayPremium": {
                                "amount": 0.0,
                                "currencyCode": "",
                                "formattedAmount": ""
                            },
                            "tax": {
                                "amount": 128.77,
                                "currencyCode": "NOK",
                                "formattedAmount": "128,77 NOK"
                            },
                            "taxComponents": {
                                "Naturskade": {
                                    "amount": 128.77,
                                    "currencyCode": "NOK",
                                    "formattedAmount": "128,77 NOK"
                                }
                            },
                            "breakdown": [
                                {
                                    "coverId": 118272102,
                                    "coverName": "Hussopp",
                                    "tariffPremium": {
                                        "amount": 504.00,
                                        "currencyCode": "NOK",
                                        "formattedAmount": "504,00 NOK"
                                    },
                                    "salesDiscount": {
                                        "amount": 0.0,
                                        "currencyCode": "NOK",
                                        "formattedAmount": "0,00 NOK"
                                    },
                                    "underwritingAdjustment": {
                                        "amount": 0.0,
                                        "currencyCode": "NOK",
                                        "formattedAmount": "0,00 NOK"
                                    },
                                    "finalTariffPremium": {
                                        "amount": 504.00,
                                        "currencyCode": "NOK",
                                        "formattedAmount": "504,00 NOK"
                                    },
                                    "totalTax": {
                                        "amount": 0.0,
                                        "currencyCode": "NOK",
                                        "formattedAmount": "0,00 NOK"
                                    },
                                    "finalTariffPremiumIncTax": {
                                        "amount": 504.00,
                                        "currencyCode": "NOK",
                                        "formattedAmount": "504,00 NOK"
                                    },
                                    "additionalComponents": {
                                        "Commission-Product": {
                                            "amount": 0.0,
                                            "currencyCode": "NOK",
                                            "formattedAmount": "0,00 NOK"
                                        },
                                        "Commission-Sales": {
                                            "amount": 0.0,
                                            "currencyCode": "NOK",
                                            "formattedAmount": "0,00 NOK"
                                        }
                                    },
                                    "taxComponents": {},
                                    "reportingItems": {
                                        "OriginalTariff": {
                                            "amount": 504.0,
                                            "currencyCode": "NOK",
                                            "formattedAmount": "504,00 NOK"
                                        },
                                        "TotalDiscount": {
                                            "amount": 0.0,
                                            "currencyCode": "NOK",
                                            "formattedAmount": "0,00 NOK"
                                        },
                                        "TotalAtCostCommission": {
                                            "amount": 0.0,
                                            "currencyCode": "NOK",
                                            "formattedAmount": "0,00 NOK"
                                        }
                                    }
                                },
                                {
                                    "coverId": 111312130,
                                    "coverName": "Innbo Standard",
                                    "tariffPremium": {
                                        "amount": 2281104.00,
                                        "currencyCode": "NOK",
                                        "formattedAmount": "2 281 104,00 NOK"
                                    },
                                    "salesDiscount": {
                                        "amount": 0.0,
                                        "currencyCode": "NOK",
                                        "formattedAmount": "0,00 NOK"
                                    },
                                    "underwritingAdjustment": {
                                        "amount": 0.0,
                                        "currencyCode": "NOK",
                                        "formattedAmount": "0,00 NOK"
                                    },
                                    "finalTariffPremium": {
                                        "amount": 2281104.00,
                                        "currencyCode": "NOK",
                                        "formattedAmount": "2 281 104,00 NOK"
                                    },
                                    "totalTax": {
                                        "amount": 128.77,
                                        "currencyCode": "NOK",
                                        "formattedAmount": "128,77 NOK"
                                    },
                                    "finalTariffPremiumIncTax": {
                                        "amount": 2281232.77,
                                        "currencyCode": "NOK",
                                        "formattedAmount": "2 281 232,77 NOK"
                                    },
                                    "additionalComponents": {
                                        "Commission-Product": {
                                            "amount": 0.0,
                                            "currencyCode": "NOK",
                                            "formattedAmount": "0,00 NOK"
                                        },
                                        "Commission-Sales": {
                                            "amount": 0.0,
                                            "currencyCode": "NOK",
                                            "formattedAmount": "0,00 NOK"
                                        }
                                    },
                                    "taxComponents": {
                                        "Naturskade": {
                                            "amount": 128.77,
                                            "currencyCode": "NOK",
                                            "formattedAmount": "128,77 NOK"
                                        }
                                    },
                                    "reportingItems": {
                                        "OriginalTariff": {
                                            "amount": 2281104.00,
                                            "currencyCode": "NOK",
                                            "formattedAmount": "2 281 104,00 NOK"
                                        },
                                        "TotalDiscount": {
                                            "amount": 0.0,
                                            "currencyCode": "NOK",
                                            "formattedAmount": "0,00 NOK"
                                        },
                                        "TotalAtCostCommission": {
                                            "amount": 0.0,
                                            "currencyCode": "NOK",
                                            "formattedAmount": "0,00 NOK"
                                        }
                                    }
                                }
                            ],
                            "premiumBreakdownItems": []
                        },
                        "terminationRequest": null,
                        "terminationReason": null,
                        "status": "Expired",
                        "canBeIncludedInSummary": false,
                        "actions": {
                            "Activate": {
                                "isAllowed": false
                            },
                            "Adjust": {
                                "isAllowed": true
                            },
                            "ProcessJobs": {
                                "isAllowed": false
                            },
                            "Terminate": {
                                "isAllowed": true
                            },
                            "Delete": {
                                "isAllowed": false
                            },
                            "StartRenewal": {
                                "isAllowed": false
                            },
                            "ViewCommission": {
                                "isAllowed": true
                            },
                            "ViewUnderwritingAdjustment": {
                                "isAllowed": true
                            },
                            "ViewSalesCommission": {
                                "isAllowed": true
                            },
                            "ViewSensitivePolicyRiskDetails": {
                                "isAllowed": true
                            },
                            "ViewProtectedPolicyRiskDetails": {
                                "isAllowed": false
                            },
                            "ViewBasicPolicyRiskDetails": {
                                "isAllowed": true
                            },
                            "GenerateDocument": {
                                "isAllowed": true
                            },
                            "SendDocument": {
                                "isAllowed": true
                            },
                            "ChangeRenewalModeToAutomaticRenewalPurchase": {
                                "isAllowed": false
                            },
                            "ChangeRenewalModeToAutomaticRenewalQuote": {
                                "isAllowed": false
                            },
                            "ChangeRenewalModeToManualRenewalQuote": {
                                "isAllowed": false
                            },
                            "ChangeRenewalModeToNoRenewal": {
                                "isAllowed": false
                            },
                            "ViewVehicleRegistrationLog": {
                                "isAllowed": true
                            },
                            "ClearPolicyNotifications": {
                                "isAllowed": true
                            },
                            "SendTerminationEmail": {
                                "isAllowed": true
                            },
                            "ResendPolicyDocument": {
                                "isAllowed": true
                            }
                        },
                        "createdDate": regex.StartWithCurrentDate,
                        "lastModifiedDate": regex.StartWithCurrentDate,
                        "version": 12,
                        "outstandingAdjustmentId": null,
                        "outstandingRenewalId": null,
                        "renewalChainId": null,
                        "renewedToPolicyId": null,
                        // "accountId": "account-df6466d1-4a1e-5c47-8b91-c0c83f7f36a3",
                        "policyHolderId": "1996565f-2a11-4703-845b-f0e685b89deb",
                        "tenantId": "varsam-staging",
                        "scope": "varsam-staging",
                        "createdBy": "Bruce Nguyen",
                        "salesPersonName": "Bruce Nguyen",
                        "salesOrganizationName": "varsam-staging",
                        "salesDiscount": 0.0,
                        "productCommission": 0.0,
                        "underwritingAdjustment": 0.0,
                        "underwritingAdjustmentReason": "",
                        "paymentMethod": "Invoice",
                        "paymentFrequency": "Monthly",
                        "paymentOptionName": "Autogiro - Monthly",
                        "paymentOptionValue": "autogiro-monthly",
                        "policyDocuments": [
                            {
                                "documentId": regex.UUID,
                                "documentType": "InsuranceCertificate",
                                "documentName": "Policy Document " + quoteRef,
                                "createdDate": null
                            }
                        ],
                        "periodData": {
                            "temporalBounds": {
                                "start": "2021-11-17T00:00:00+00:00",
                                "end": "2022-11-16T23:59:59+00:00",
                                "insurancePeriodStrategy": "MidnightToMidnight"
                            },
                            "slices": [
                                {
                                    "effectiveDate": "2021-11-17T00:00:00+00:00",
                                    "value": {
                                        "answers": {
                                            "PolicyHolderFirstNameTag": "Bruce",
                                            "PolicyHolderLastNameTag": "Nguyen",
                                            "PolicyHolderDOBTag": "2000-10-12T00:00:00Z",
                                            "PolicyHolderAgeTag": 21,
                                            "CustomerCreditScoreTag": null,
                                            "CustomerClaimCountTag": 22,
                                            "AddressTag": "Uptown Manhattan",
                                            "PostCodeTag": "3705",
                                            "CityTag": "SKIEN",
                                            "RentTypeTag": "Ikke utleid",
                                            "AlarmSystemTag": "Brannalarm med  lokal varsling",
                                            "SmokeDetectorTag": "Seriekoblede Røykvarslere",
                                            "WaterStopSystemTag": "Vannstoppesystem uten varsling",
                                            "ElectricityTag": "Elektrisk anlegg nyere enn 15 år",
                                            "NumberOfResidentsTag": "1",
                                            "IncludeHussoppCoverTag": true,
                                            "ContentSumInsuredTag": 300000,
                                            "ContentSumInsuredCalculationTag": 1839600.0,
                                            "ContentSumInsuredPremiumCalculationTag": 1839600.0,
                                            "ContentTypeTag": "Innbo og løsøre privat",
                                            "ResidenceTypeTag": "Innbo Hus",
                                            "DeductibleContentTag": 6000.0,
                                            "ContentCoverTag": "Standard dekning",
                                            "AddBicycleTag1": null,
                                            "BicycleSumInsuredTag1": null,
                                            "ElectricBicycleCoverTag1": null,
                                            "ElectricBicycleStandardCoverCalculationTag1": 0.0,
                                            "ElectricBicycleSuperCoverCalculationTag1": 0.0,
                                            "AddBicycleTag2": null,
                                            "BicycleSumInsuredTag2": null,
                                            "ElectricBicycleCoverTag2": null,
                                            "ElectricBicycleStandardCoverCalculationTag2": 0.0,
                                            "ElectricBicycleSuperCoverCalculationTag2": 0.0,
                                            "AddBicycleTag3": null,
                                            "BicycleSumInsuredTag3": null,
                                            "ElectricBicycleCoverTag3": null,
                                            "ElectricBicycleStandardCoverCalculationTag3": 0.0,
                                            "ElectricBicycleSuperCoverCalculationTag3": 0.0,
                                            "AddBicycleTag4": null,
                                            "BicycleSumInsuredTag4": null,
                                            "ElectricBicycleCoverTag4": null,
                                            "ElectricBicycleStandardCoverCalculationTag4": 0.0,
                                            "ElectricBicycleSuperCoverCalculationTag4": 0.0,
                                            "AddBicycleTag5": null,
                                            "BicycleSumInsuredTag5": null,
                                            "ElectricBicycleCoverTag5": null,
                                            "ElectricBicycleStandardCoverCalculationTag5": 0.0,
                                            "ElectricBicycleSuperCoverCalculationTag5": 0.0,
                                            "FinalBicycleStandardCoverTag": 0.0,
                                            "FinalBicycleSuperCoverTag": 0.0,
                                            "AdjustmentSelectionTag": 0.0,
                                            "InternalNoteTag": null,
                                            "ExternalTextTag": null,
                                            "TerminationTextTag": null,
                                            "CoverTypeTag": "Traffic only"
                                        },
                                        "uploadData": {
                                            "uploadFileReferenceData": null,
                                            "uploadResult": null
                                        },
                                        "covers": [
                                            {
                                                "id": 111312130,
                                                "name": "Innbo",
                                                "industryCode": "000",
                                                "reportingCode": "000",
                                                "displayName": "Innbo Standard"
                                            },
                                            {
                                                "id": 118272102,
                                                "name": "Hussopp",
                                                "industryCode": "000",
                                                "reportingCode": "000",
                                                "displayName": "Hussopp"
                                            }
                                        ],
                                        "purchaseConstraints": [
                                            {
                                                "name": "CustomerEmptyCreditScore",
                                                "displayText": "The customer does not have credit score. Users with permission 'Approve purchase constraint Level 3' can approve this.",
                                                "highlightedQuestions": [
                                                    "CustomerCreditScoreTag"
                                                ],
                                                "highlightedValue": null,
                                                "isActive": false,
                                                "severityLevel": 30,
                                                "approved": true
                                            }
                                        ],
                                        "policyDocuments": [
                                            {
                                                "documentId": regex.UUID,
                                                "documentType": "InsuranceCertificate",
                                                "documentName": "Policy Document " + quoteRef,
                                                "createdDate": null
                                            }
                                        ]
                                    }
                                }
                            ],
                            "isEmpty": false
                        },
                        "uploadData": {
                            "temporalBounds": {
                                "start": "2021-11-17T00:00:00+00:00",
                                "end": "2022-11-16T23:59:59+00:00",
                                "insurancePeriodStrategy": "MidnightToMidnight"
                            },
                            "slices": [
                                {
                                    "effectiveDate": "2021-11-17T00:00:00+00:00",
                                    "value": {
                                        "uploadFileReferenceData": null,
                                        "uploadResult": null
                                    }
                                }
                            ],
                            "isEmpty": false
                        },
                        "salesCommission": 0.0,
                        "hasDocumentInProduction": false,
                        "hasPolicyEmailSending": false,
                        "documentFailedMessage": "",
                        // "emailFailedMessage": "Policy email recipient must be valid when requesting email to be sent.",
                        "purchaseConstraints": {
                            "temporalBounds": {
                                "start": "2021-11-17T00:00:00+00:00",
                                "end": "2022-11-16T23:59:59+00:00",
                                "insurancePeriodStrategy": "MidnightToMidnight"
                            },
                            "slices": [
                                {
                                    "effectiveDate": "2021-11-17T00:00:00+00:00",
                                    "value": [
                                        {
                                            "name": "CustomerEmptyCreditScore",
                                            "displayText": "The customer does not have credit score. Users with permission 'Approve purchase constraint Level 3' can approve this.",
                                            "highlightedQuestions": [
                                                "CustomerCreditScoreTag"
                                            ],
                                            "highlightedValue": null,
                                            "isActive": false,
                                            "severityLevel": 30,
                                            "approved": true
                                        }
                                    ]
                                }
                            ],
                            "isEmpty": false
                        },
                        "renewalMode": "AutomaticRenewalQuote",
                        "salesChannelName": "Test Channel",
                        "bindingAgreementContext": {
                            "bindingAgreementId": null,
                            "uniqueMarketReference": null,
                            "carrierName": null,
                            "commission": null,
                            "multipleLayersMode": null,
                            "bindingLayers": null
                        },
                        "productCommissionSettings": {
                            "isAtCost": false,
                            "needToConvertCommissionRate": false
                        },
                        "previousInsurer": {
                            "isNewInsurance": true,
                            "previousInsuranceCompany": null
                        },
                        "terminationLetterStatus": {
                            "type": "DocumentIgnored",
                            "messages": [
                                "New_insurance_policy",
                                "Termination_letter_document_template_not_specified",
                                "Back_dated_policy"
                            ],
                            "isEmpty": false
                        },
                        "motorRegistryRequestData": null,
                        "additionalDiscounts": {},
                        "numberOfNotification": 1,
                        "earliestNotificationDate": regex.StartWithCurrentDate,
                        "latestNotificationDate": regex.StartWithCurrentDate,
                        "notifications": [
                            {
                                "type": "EmailFailed",
                                "message": "Policy email recipient must be valid when requesting email to be sent.",
                                "entryDate": regex.StartWithCurrentDate,
                                "isCleared": false,
                                "externalSourceId": null
                            }
                        ],
                        "fleetItemProcessingResult": null,
                        "lockedReason": null,
                        "renewalCount": 0,
                        "adjustmentCount": 0,
                        "coverUnderwritingAdjustments": {},
                        "renewalFailedMessage": null
                    }
                }

            }
        }

        )
    }
}