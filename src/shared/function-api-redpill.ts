import axios from 'axios';
import { getDate, addDate, logSuccessMessage, logFailMessage } from './functions';


export async function getCompanyInformationJSON(token: string) {
  try {
    // Url
    const baseUrl = `https://api.staging.contemisaasdev.com/scoring-api/api/v1/scores/calculate?method=3rd-assessment&_preventToast=true`;

    // Header
    const header = {
      'authorization': `Bearer ${token}`,
      'content-type': 'application/json'
    };
    let firstPhaseStartDate = getDate(2).split("/").reverse().join("-");
    let firstPhaseEndDate = addDate(getDate(2), 364).split("/").reverse().join("-");


    // Body
    const body = {
      "nin": "997035364",
      "inputFactor": {
        "_isTesting": false,
        "orgNo": "997035364",
        "products": [
          {
            "Id": "4f3c923c-c8e8-4a13-8c93-3b3a4d4988dd",
            "Name": "Skattetrekksgaranti",
            "MetaData": {
              "oId": 4,
              "Types": [
                {
                  "Id": "Tax_Deduction",
                  "Name": "Tax Guarantee"
                }
              ],
              "Configs": {
                "Phases": {
                  "Phase1": {
                    "Duration": 1,
                    "Validation": 1
                  }
                }
              }
            }
          }
        ],
        "totalContractAmount": 100000,
        "numberOfEmployees": 10,
        "currency": "NOK",
        "industry": "Other letting of real estate",
        "firstPhaseGuaranteeAmount": 100000,
        "firstPhaseStart": `${firstPhaseStartDate}T00:00:00+07:00`,
        "firstPhaseEnd": `${firstPhaseEndDate}T00:00:00+07:00`,
        "utilizedExposure": 0,
        "agentSource": "hogs-testing",
        "existingCustomer": false
      }
    }
    let res = await axios.post(baseUrl, body, { headers: header });
    return res.data.data.cachedScore.CompanyInformation;
  } catch (error) {
    console.log("getCompanyInformationJSON");
    console.log(error);
    return { 'Message': "Get Company Information JSON failed" };
  }
}


export async function getRawData(token: string) {
  try {
    // Url
    const baseUrl = `https://ecs-test.hogs.r53.bitbit.net`;

    // Header
    const header = {
      'authorization': `Bearer ${token}`,
      'content-type': 'application/json'
    };
    let firstPhaseStartDate = getDate(2).split("/").reverse().join("-");
    let firstPhaseEndDate = addDate(getDate(2), 364).split("/").reverse().join("-");

    // Body
    const body = {
      "OrgNo": "997035364",
      "Products": [
        {
          "Id": "4",
          "Name": "Skattetrekksgaranti",
          "MetaData": {
            "OId": 4,
            "Types": [
              {
                "Id": "Tax_Deduction",
                "Name": "Tax Guarantee"
              }
            ],
            "Configs": {
              "Phases": {
                "Phase1": {
                  "Duration": 1,
                  "Validation": 1
                }
              }
            }
          }
        }
      ],
      "TotalContractAmount": 100000,
      "NumberOfEmployees": 10,
      "Currency": "NOK",
      "Industry": "Other letting of real estate",
      "FirstPhaseGuaranteeAmount": 100000,
      "FirstPhaseStart": `${firstPhaseStartDate}T17:00:00.000Z`,
      "FirstPhaseEnd": `${firstPhaseEndDate}T17:00:00.000Z`,
      "UtilizedExposure": 0,
      "AgentSource": "hogs-testing",
      "ExistingCustomer": false,
      "CompanyInformation": await getCompanyInformationJSON(token)
    }
    let res = await axios.post(baseUrl, body, { headers: header });
    return res.data;
  } catch (error) {
    console.log("getRawData");
    console.log(error);
    return { 'Message': "Get Raw Data failed" };
  }
}

export async function compareRawData(rawData: any) {
  try {
    let expectedValue = {
      "Acceptance": true,
      "Build": "7208 / v193",
      "DatabaseStatus": "Query failed 1048 (23000): Column 'value' cannot be null (database closed)",
      "GuaranteePrice": 2000,
      "Message": "The guarantee request has been approved",
      "PremiumRate": 0.013000000000000001
    }

    if (JSON.stringify(expectedValue) == JSON.stringify(rawData)) {
      logSuccessMessage('API Raw Data matches expected Raw Data');
      console.log("Actual Data:", rawData);  
      return true;
    }
    console.log("Actual Data:", rawData);
    logFailMessage('API Raw Data does not match expected Raw Data');
    return false;
  } catch (error) {
    console.log(`compareRawData`);
    console.log(error);
    return false;
  }
}