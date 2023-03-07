import axios from "axios";
import { accessTokenBop } from "../access-token/access-token";
import { getLineInFileTxt, logFailMessage, logInfoMessage, logSuccessMessage, logWarningMessage } from "../functions";
import { Helpers } from "../helpers";
import { fileNameLogin } from "../variables";
import { UserProfileInfo } from "./UserProfileInfo";

const fs = require('fs');

async function getUserProfileObject(username: string, urlApi: string = "") {
    try {
        let baseUrl = "https://api.staging.contemisaasdev.com/users/api/v1/users/retrieveUserDetailsRequest";
        if (urlApi) {
            baseUrl = `${urlApi}/users/api/v1/users/retrieveUserDetailsRequest`
        }

        const token = accessTokenBop;

        // Header
        const header = {
            'authorization': `Bearer ${token}`,
            'content-type': 'application/vnd.api+json'
        }

        const body = {
            "data": {
                "type": "retrieveUserDetailsRequests",
                "id": `${username.trim()}`
            }
        }

        const res = await axios.post(baseUrl, body, { headers: header });
        const result = res.data;
        if (res.status === 200) {
            logSuccessMessage("\n\t=> Set User profile passed!");
        }
        return result;
    } catch (error) {
        logFailMessage("\t=> Get User profile failed!");
        console.log(error);
        return { 'Message': "Get User profile failed!" };
    }
}

export async function setUserProfile() {
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
    logInfoMessage("\nurl=" + url);

    const line2 = getLineInFileTxt(fileNameLogin, 1);
    const username = line2.substring(9);
    logInfoMessage("username=" + username);

    const line3 = getLineInFileTxt(fileNameLogin, 2);
    const password = Helpers.decode(line3.substring(9));
    logInfoMessage("password=" + "*".repeat(password.length));

    let urlApi = "";
    if (url.includes("staging")) {
        logInfoMessage("\nUSP: Running on Staging...");
        urlApi = "https://api.staging.contemisaasdev.com";
    }
    else {
        logInfoMessage("\nUSP: Running on PROD...");
        urlApi = "https://api.seamless.insure";
    }
    logInfoMessage("urlApi=" + urlApi);


    let body = await getUserProfileObject(username, urlApi);

    if (body['Message'] && body['Message'] === "Get User profile failed!") {
        logWarningMessage(`\n\n\t => Get User profile of account "${username}" failed!`);
        logWarningMessage(`\n\t => Using User profile of "${UserProfileInfo.getDisplayName()}" as default!`);
    }
    else {
        const storeData = (data, path) => {
            try {
                fs.writeFileSync(path, JSON.stringify(data, null, 4));
            } catch (error) {
                console.error(error);
            }
        }
        const dirName = "./src/shared/user-profile";
        UserProfileInfo.resetNewAttributes(body);
        storeData(body, `${dirName}/user-profile-object.json`);
    }
}