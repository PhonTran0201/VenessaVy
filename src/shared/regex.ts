import * as constant from "./constants"


// this file stores regex of commonly used pattern json fields
// special case: pipeline pattern is pattern-name+uuid 
// for ex: pipeline name is auto test -> its pattern would be auto-test+uuid
// do not change pipeline name on createPipelineRequest and Response
export const UUID = /{?\w{8}-?\w{4}-?\w{4}-?\w{4}-?\w{12}}?/
export const QuoteID = /^quote-{?\w{8}-?\w{4}-?\w{4}-?\w{4}-?\w{12}}?/
export const ProductVersionId = /^productversion-{?\w{8}-?\w{4}-?\w{4}-?\w{4}-?\w{12}}?/
export const ProductId = /^product-{?\w{8}-?\w{4}-?\w{4}-?\w{4}-?\w{12}}?/
export const Workflow = /^workflow-{?\w{8}-?\w{4}-?\w{4}-?\w{4}-?\w{12}}?/
export const Carrier = /^carrier-{?\w{8}-?\w{4}-?\w{4}-?\w{4}-?\w{12}}?/
export const Binder = /^binder-{?\w{8}-?\w{4}-?\w{4}-?\w{4}-?\w{12}}?/
export const BinderLayer = /^binderlayer-{?\w{8}-?\w{4}-?\w{4}-?\w{4}-?\w{12}}?/
export const InsuranceCompany = /^insurancecompany-{?\w{8}-?\w{4}-?\w{4}-?\w{4}-?\w{12}}?/
export const PipelineCode = /^auto-test-pipeline-{?\w{8}-?\w{4}-?\w{4}-?\w{4}-?\w{12}}?/
export const ZuluTime = /\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2]\d|3[0-1])T(?:[0-1]\d|2[0-3]):[0-5]\d:[0-5]\d\.\d{3}Z/
export const FullTime = /\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2]\d|3[0-1])T(?:[0-1]\d|2[0-3]):[0-5]\d:[0-5]\d\.\d{2,}\+\d{2}\:\d{2}/
export const ZuluTimeWithoutSecond = /\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2]\d|3[0-1])T(?:[0-1]\d|2[0-3]):[0-5]\d:[0-5]\d\Z/
export const Integer = /\d+/
export const PhoneNumber = /\+?\d+/
export const YYYYMMDD = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12]\d|3[01])$/
export const Month = /^([1-9]|1[012])$/
export const Day = /^([1-9]|[12][0-9]|3[01])$/
export const AgreementNo = /^HOGS-FA/
export const ApplicationNo = /^HOGS-A/
export const QuoteStatus = /(^Underwritten$)|(^InProgress$)|(^Accepted$)|(^Completed$)|(^Created$)/
export const ReleaseNoteType = /^new$|^improvement$|^fix$|^removed$/


//will match any string that starts with current date
export const StartWithCurrentDate = new RegExp("^" + constant.CURRENT_DATE_US_FORMAT, "g")

//will match any string that starts with exiry date, typically 30 days from start date
export const StartWithExpiryDate = new RegExp("^" + constant.EXPIRY_DATE_US_FORMAT, "g")

//wil match any string contains at least one non-whitespace character
export const NotNull = /(.|\s)*\S(.|\s)*/

export const Email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const Gender = /^male$|^female$/
export const CustomerAccountStatus = /^lost$|^prospect$|^customer$/
export const PreferredCommunication = /^email$|^phone$|^mail$/
export const PaymentFrequency = /^annually$|^semi-annually$|^quarterly$|^monthly$/
export const TargetGroupType = /^user$|^customer$/