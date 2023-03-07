export const defaultTimeOut =  10 * 60 * 1000;
export const waitForElementTimeOut = 40 * 1000;
export const CURRENT_DATE = new Date().toISOString();
export const CURRENT_DATE_US_FORMAT = CURRENT_DATE.slice(0, 10)


export const DEFAULT_QUOTE_START_DATE = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString()
export const QUOTE_START_DATE_US_FORMAT = DEFAULT_QUOTE_START_DATE.slice(0, 10)

export const DEFAULT_QUOTE_END_DATE = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
export const QUOTE_END_DATE_US_FORMAT = DEFAULT_QUOTE_END_DATE.slice(0, 10)

export const DEFAULT_QUOTE_EXPIRY_DATE = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
export const EXPIRY_DATE_US_FORMAT = DEFAULT_QUOTE_EXPIRY_DATE.slice(0, 10)
