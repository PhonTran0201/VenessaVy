import { logFailMessage, logWarningMessage } from "../functions";
import tenantSettingAgsHogs from "./tenant-setting-object_ags_hogs.json";
import tenantSettingBopAtlas from "./tenant-setting-object_bop_atlas.json";
import tenantSettingBopHogs from "./tenant-setting-object_bop_hogs.json";
import tenantSettingBopHogse from "./tenant-setting-object_bop_hogse.json";
import tenantSettingCpAtlas from "./tenant-setting-object_cp_atlas.json";
import tenantSettingCpHogs from "./tenant-setting-object_cp_hogs.json";
import tenantSettingCpVarsam from "./tenant-setting-object_cp_varsam.json";

import tenantSettingBop from "./tenant-setting-object.json";// For Seamless
import { scenarioTags } from "../variables";
import { tenantSettingVariable } from "./tenant-setting-variable";


function getTenantSettingObjectByProject() {
  let tenantSetting: any = tenantSettingVariable;
  // if (tenantSetting) {
  //   return tenantSetting;
  // }
  tenantSetting = tenantSettingBop;
  if (scenarioTags.has("@Atlas")) {
    tenantSetting = tenantSettingBopAtlas;
  }
  if (scenarioTags.has("@Hogs") || scenarioTags.has("@Hogm")) {
    tenantSetting = tenantSettingBopHogs;
  }
  if (scenarioTags.has("@HOGSE")) {
    tenantSetting = tenantSettingBopHogse;
  }
  if (scenarioTags.has("@AgentPortalHogs")) {
    tenantSetting = tenantSettingAgsHogs;
  }
  if (scenarioTags.has("@CustomerPortalAtlas")) {
    tenantSetting = tenantSettingCpAtlas;
  }
  if (scenarioTags.has("@CustomerPortalHogs")) {
    tenantSetting = tenantSettingCpHogs;
  }
  if (scenarioTags.has("@CustomerPortalVarsam")) {
    tenantSetting = tenantSettingCpVarsam;
  }

  return tenantSetting;
}


export function numberToCurrency(number: any, displayCurrencySymbol: boolean = false, currencySymbol: string = "NOK") {
  const tenantSetting = getTenantSettingObjectByProject();
  const currencyDecimalPlaces = tenantSetting.data.attributes.numberFormatSetting.currencyDecimalDigits;
  const currencyThousandSeparator = tenantSetting.data.attributes.numberFormatSetting.currencyGroupSeparator;
  const currencyDecimalSeparator = tenantSetting.data.attributes.numberFormatSetting.currencyDecimalSeparator;

  let currency = (parseFloat(number) + 0.00000001).toFixed(currencyDecimalPlaces);/// vì toFixed không làm tròn lên ngay tại giá trị 5
  currency = currency.replace(".", currencyDecimalSeparator);
  currency = currency.replace(/\B(?=(\d{3})+(?!\d))/g, currencyThousandSeparator);
  let temp1 = currency.split(currencyDecimalSeparator);
  if (currencyDecimalPlaces != 0) {
    currency = temp1[0] + currencyDecimalSeparator + (temp1.length > 1 ? temp1[1].replace(/ /g, '') : "");
  }
  if (displayCurrencySymbol) {
    const currencySymbolPlacement = tenantSetting.data.attributes.currencySymbolPlacement;
    const defaultCurrency = currencySymbol || tenantSetting.data.attributes.defaultCurrency;

    switch (currencySymbolPlacement) {
      case "After":
        currency = currency + " " + defaultCurrency;
        break;
      case "Before":
        currency = defaultCurrency + " " + currency;
        break;
      default:
        // do nothing
        break;
    }
  }
  return currency.localeCompare("NaN") === 0 ? "" : currency;
}

export function getCurrencyDecimalSeparator() {
  const tenantSetting = getTenantSettingObjectByProject();
  const currencyDecimalSeparator = tenantSetting.data.attributes.numberFormatSetting.currencyDecimalSeparator;
  return currencyDecimalSeparator;
}
export function currencyToNumber(currency: any) {
  const tenantSetting = getTenantSettingObjectByProject();

  if (!currency) {
    return 0.0;
  }
  let strCurrency: string = currency.toString();
  let result: number = 0.0;
  const currencyDecimalSeparator = tenantSetting.data.attributes.numberFormatSetting.currencyDecimalSeparator || ".";
  if (strCurrency.includes(currencyDecimalSeparator)) {
    let integerPart = strCurrency.substring(0, strCurrency.indexOf(currencyDecimalSeparator)).replace(/[^\d-]/g, '');
    let decimalPart = strCurrency.substring(strCurrency.indexOf(currencyDecimalSeparator), strCurrency.length).replace(/\D/g, '');
    result = parseFloat(integerPart + "." + decimalPart);
  }
  else {
    result = parseFloat(strCurrency.replace(/[^\d-]/g, ''));
  }
  return result;
}

/*
input :
dd/MM/yyyy
yyyy-MM-dd
dd.MM.yyyy
dd-MM-yyyy
d-M-yyyy

out put  format tenant setting
*/
export function formatNumber2digit(number: string) {
  let temp = number;
  if (number.length == 1) {
    temp = "0" + number;
  }
  return temp;
}
export function formatNumber1digit(number: string) {
  let temp = number;
  if (number.length == 2) {
    temp = number.substring(1);
  }
  return temp;
}

export function formatDateTime(dateTime: string, displayDateFormat = 'dd/MM/yyyy') {
  const tenantSetting = getTenantSettingObjectByProject();
  let temp: string[];
  let temp2;
  let time;
  let day, month, year;
  if (!dateTime) {
    logWarningMessage("formatDateTime undefined parameter!");
    return "";
  }
  else if (dateTime.includes("-")) {
    temp = dateTime.split("-");
    switch (temp[0].length) {
      case 1:
        day = formatNumber2digit(temp[0]);
        month = formatNumber2digit(temp[1]);
        year = temp[2];
        break;

      case 2:
        if (temp[2].length > 2) {
          temp2 = temp[2].split(" ");
          time = temp2[1];
          year = temp2[0];
        }else{
          year = temp[2];
        }
        day = formatNumber2digit(temp[0]);
        month = formatNumber2digit(temp[1]);
        break;

      case 4:
        if (temp[2].length > 2) {
          temp2 = temp[2].split(" ");
          day = formatNumber2digit(temp2[0]);
          time = temp2[1];
        } else { day = formatNumber2digit(temp[2]); }
        month = formatNumber2digit(temp[1]);
        year = temp[0];
        break;

      default:
        console.log("incorrect formatDateTime on '-' !");
        break;
    }
  }
  else if (dateTime.includes("/")) {
    temp = dateTime.split("/");
    switch (temp[0].length) {
      case 1:
        day = formatNumber2digit(temp[0]);
        month = formatNumber2digit(temp[1]);
        year = temp[2];
        break;

      case 2:
        if (temp[2].length > 2) {
          temp2 = temp[2].split(" ");
          time = temp2[1];
          year = temp2[0];
        }else{
          year = temp[2];
        }
        day = formatNumber2digit(temp[0]);
        month = formatNumber2digit(temp[1]);
        break;

      case 4:
        if (temp[2].length > 2) {
          temp2 = temp[2].split(" ");
          day = formatNumber2digit(temp2[0]);
          time = temp2[1];
        } else { day = formatNumber2digit(temp[2]); }
        month = formatNumber2digit(temp[1]);
        year = temp[0];
        break;

      default:
        console.log("incorrect formatDateTime on '/' !");
        break;
    }
  }
  else if (dateTime.includes(".")) {
    temp = dateTime.split(".");
    switch (temp[0].length) {
      case 1:
        day = formatNumber2digit(temp[0]);
        month = formatNumber2digit(temp[1]);
        year = temp[2];
        break;

      case 2:
        if (temp[2].length > 2) {
          temp2 = temp[2].split(" ");
          time = temp2[1];
          year = temp2[0];
        }else{
          year = temp[2];
        }
        day = formatNumber2digit(temp[0]);
        month = formatNumber2digit(temp[1]);
        break;

      case 4:
        if (temp[2].length > 2) {
          
          day = formatNumber2digit(temp2[0]);
          time = temp2[1];
        } else { day = formatNumber2digit(temp[2]); }

        month = formatNumber2digit(temp[1]);
        year = temp[0];
        break;

      default:
        console.log("incorrect formatDateTime on '.' !");
        break;
    }
  }

  if(!displayDateFormat){
    displayDateFormat = tenantSetting.data.attributes.displayDateFormat;
  }
  let result: string = "";
  switch (displayDateFormat) {
    case `dd/MM/yyyy`:
      result = `${day}/${month}/${year}`;
      break;

    case `yyyy-MM-dd`:
      result = `${year}-${month}-${day}`;
      break;

    case `dd.MM.yyyy`:
      result = `${day}.${month}.${year}`;
      break;

    case `dd-MM-yyyy`:
      result = `${day}-${month}-${year}`;
      break;

    case `d-M-yyyy`:
      day = formatNumber1digit(day);
      month = formatNumber1digit(month);
      result = `${day}-${month}-${year}`;
      break;

    default:
      logFailMessage("can not find displayDateFormat !");
  }

  if (time && displayDateFormat.toLowerCase().includes("hh:mm")) {
    result = result + " " + time;
  }
  return result;
}

// Kiểm tra 2 Currency có gần bằng nhau hay không dựa vào độ chính xác accuracy
export function validateApproximateCurrency(firstCurrency: string, secondCurrency: string, accuracy = 0.5) {
  const firstNumber = currencyToNumber(firstCurrency);
  const secondNumber = currencyToNumber(secondCurrency);

  if (Math.abs(firstNumber - secondNumber) <= accuracy) {
    return true;
  } else {
    logWarningMessage(`\tExpectedValue: ${firstCurrency}\t-\tActualValue: ${secondCurrency}`);
    return false;
  }
}

//#region Get methods
export function getDefaultCurrency() {
  const tenantSetting = getTenantSettingObjectByProject();
  return tenantSetting.data.attributes.defaultCurrency;
}
//#endregion

export function getNumberDecimalSeparator() {
  const tenantSetting = getTenantSettingObjectByProject();
  return tenantSetting.data.attributes.numberFormatSetting.numberDecimalSeparator;
}

export function getCurrencyGroupSeparator() {
  const tenantSetting = getTenantSettingObjectByProject();
  return tenantSetting.data.attributes.numberFormatSetting.currencyGroupSeparator;
}