import { getTenantSetting } from '../function-api-general';
import { getLineInFileTxt, logInfoMessage, logSuccessMessage } from '../functions';
import { Helpers } from '../helpers';
import { UserProfileInfo } from '../user-profile/UserProfileInfo';
import { fileNameLogin } from '../variables';
import { setTenantSettingObject } from './tenant-setting-variable';
const fs = require('fs');


export async function setTenantSetting() {
  const line1 = getLineInFileTxt(fileNameLogin, 0).substring(4).trim();
  let url = "";
  if (line1.includes("#")) {
    url = line1.substring(0, line1.indexOf("#") - 1);
  }
  else if (line1.charAt(line1.length - 1) === "\/") {
    url = line1.slice(0, -1);
  }
  else {
    url = line1;
  }
  logInfoMessage("url=" + url);

  const line2 = getLineInFileTxt(fileNameLogin, 1);
  const username = line2.substring(9);
  logInfoMessage("username=" + username);

  const line3 = getLineInFileTxt(fileNameLogin, 2);
  const password = Helpers.decode(line3.substring(9));
  logInfoMessage("password=" + "*".repeat(password.length));

  const tenantId = line2.substring(line2.indexOf("@") + 1);
  logInfoMessage(("tenantId=") + tenantId);

  let urlApi = "";
    if (url.includes("staging")) {
        logInfoMessage("\nTNS: Running on Staging...\n");
        urlApi = "https://api.staging.contemisaasdev.com";
    }
    else {
        logInfoMessage("\nTNS: Running on PROD...\n");
        urlApi = "https://api.seamless.insure";
    }

  /**
   * Lưu ý: url trang web khác url request api
   */
  const tenantSettingObject = await getTenantSetting(username, password, urlApi, tenantId);
  if(UserProfileInfo.getTenantId() == 'manualtest-1'){
    tenantSettingObject.data.attributes.currencySymbolPlacement = "After";//For Test smoke on PROD contemi-testing
    logInfoMessage("Here...");
  }
  setTenantSettingObject(tenantSettingObject);
  const storeData = (data, path) => {
    try {
      fs.writeFileSync(path, JSON.stringify(data, null, 4));
    } catch (error) {
      console.error(error);
    }
  }
  const dirName = "./src/shared/tenant-setting";
  switch(tenantId.trim()){
    case "hogs-testing":{
        storeData(tenantSettingObject, `${dirName}/tenant-setting-object_ags_hogs.json`);
        storeData(tenantSettingObject, `${dirName}/tenant-setting-object_bop_hogs.json`);
        storeData(tenantSettingObject, `${dirName}/tenant-setting-object_cp_hogs.json`);
        break;
    }
    case "guarantee-testing":{
      storeData(tenantSettingObject, `${dirName}/tenant-setting-object_bop_atlas.json`);
      break;
    }
    case "hogsse-testing":{
      storeData(tenantSettingObject, `${dirName}/tenant-setting-object_bop_hogse.json`);
      break;
    }
    case "guarantee":{
      storeData(tenantSettingObject, `${dirName}/tenant-setting-object_bop_atlas.json`);
      storeData(tenantSettingObject, `${dirName}/tenant-setting-object_cp_atlas.json`);
      break;
    }
    default:{
      storeData(tenantSettingObject, `${dirName}/tenant-setting-object.json`);
      break;
    }
  }
  logSuccessMessage("\n\tSet Tenant Setting passed!\n");
}

// setTenantSetting();