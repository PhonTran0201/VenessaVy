import axios from 'axios'
import { accessTokenBop } from './access-token/access-token';
import { getTokenLogin } from './function-api-general'


// Get token
async function getTokenBisnode() {
  try {
    // Url
    const url = 'https://login.bisnode.com/sandbox/v1/token.oauth2';

    // Header
    const header = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic YzNkNjBhZDctMTgxNC00MDUxLWI5MDQtNDRkNDU5YmE4YWIwOk82R0dWVzBqTHB6ck13UTJ4bGdya0FDUnZMeGhTc1VjNTZodTRSeHplSnR0eUI5MVVxU3BxY2wzRERXODY3Vk4='
    }

    // Body
    const dataBody = {
      'grant_type': 'client_credentials',
      'scope': 'credit_data_companies credit_data_persons no_beneficialowner no_ben'
    };

    let formBody: string[] = [];
    for (var property in dataBody) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(dataBody[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    let body = formBody.join("&");
    let res = await axios.post(url, body, { headers: header });

    return res.data.access_token;
  } catch (error) {
    console.log(error);
    return 'invalid_request';
  }
}


export async function getObjectBisnode(organization: string = '937340303') {
  let BisnodeObject: any = {};
  try {
    // Url
    const url = 'https://sandbox-api.bisnode.com/credit-data-companies/v2/companies/no';

    // Header
    const header = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${await getTokenBisnode()}`
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }

    // Body
    const dataBody = {
      "registrationNumber": `${organization}`,
      // "segments": [
      //     "COMPANY_INFORMATION",
      //     "FINANCE"
      // ]
  }
    let res = await axios.post(url, dataBody, { headers: header });

    BisnodeObject = res.data;
  } catch (error) {
    console.log(error);
    // BisnodeObject = {};
  }
  finally {
    return BisnodeObject;
  }
}


async function a() {
  const temp = await getObjectBisnode();
  console.log(temp.companyInformation.capital);
}
// a()

/**
 * 
 * @param postedDate format dd/mm/yyyy
 * @param status "exported", "new",...
 * @param username 
 * @param password 
 * @param id id instalment
 * @returns string status code = "200" if update succeed
 */
export async function updateInstalment(postedDate: string, status: string, username: string, password: string, id: string) {
  let Object: any = "invalid_code";
  try {
    // Url
    const url = `https://api.staging.contemisaasdev.com/guarantee-api/instalments/${id}`;

    const token = accessTokenBop ? accessTokenBop : await getTokenLogin(username, password);// Nếu UI chưa chạy thì chưa có accessToken, nên mới dùng api
    // Header
    const header = {
      'content-type': 'application/json',
      'authorization': `Bearer ${token}`
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }

    // Body
    //convert Posted date form dd/mm/yyyy to yyyy/mm/dd
    postedDate = postedDate.split("/").reverse().join("/");
    const dataBody = {
      "PostedDate": postedDate,
      "Status": status
    }
    let res = await axios.put(url, dataBody, { headers: header });

    Object = res.data.StatusCode.toString();
  } catch (error) {
    console.log("updateInstalment");
    console.log(error);
  }
  finally {
    return Object;
  }
}

