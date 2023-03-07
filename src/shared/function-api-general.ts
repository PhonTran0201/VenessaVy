import axios from 'axios'
import { accessTokenBop } from './access-token/access-token';
import { logFailMessage, logSuccessMessage, logWarningMessage } from './functions';

/**
 * This function is used for get Token on Staging, NOT used for login PROD
 * @param username 
 * @param password 
 * @returns 
 */
export async function getTokenLogin(username: string, password: string) {
  try {
    // Url
    const url = 'https://cognito-idp.eu-west-2.amazonaws.com';

    // Header
    const header = {
      'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth',
      'Content-Type': 'application/x-amz-json-1.1'
    }

    // Body
    const body = {
      "AuthParameters": {
        "USERNAME": username.trim(),
        "PASSWORD": password.trim()
      },
      "AuthFlow": "USER_PASSWORD_AUTH",
      "ClientId": "4v243m8dn2munspvf6un70mtn6"
    };

    const res = await axios.post(url, body, { headers: header });
    const result = res.data.AuthenticationResult.AccessToken;
    logSuccessMessage("\t=> Get Access token passed!");
    return result;
  } catch (error) {
    logFailMessage("\t=> Get Access token failed!");
    console.log(error);
    return 'invalid_token';
  }
}

export async function getTenantSetting(username: string, password: string, urlApi: string, tenantId: string) {
  try {
    const baseUrl = `${urlApi}/tenancy/api/v1/tenantSettings/${tenantId}`;
    const token = accessTokenBop ? accessTokenBop : await getTokenLogin(username, password);// Nếu UI chưa chạy thì chưa có accessToken, nên mới dùng api
    // Header
    const header = {
      'authorization': `Bearer ${token}`
    }
    let res = await axios.get(baseUrl, { headers: header });

    return res.data;
  } catch (error) {
    console.log("getTenantSetting");
    console.log(error);
    return { 'Message': "Get tenant setting failed!" };
  }
}