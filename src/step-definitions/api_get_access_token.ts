import pactum from 'pactum';
import * as fs from 'fs';
import { GlobalVar } from '../core/global-var';
import { env } from '../shared/env.config';


let accessToken: string = "";
const PATH_TOKEN = `src/step-definitions/api/access.token`;


export class AccessTokenRequest {
    constructor() {
        //constructor :D
    }

    public async requestToken(): Promise<string> {
        const jBody = {
            "AuthParameters": {
                "USERNAME": env().API_DEFAULT_USERNAME,
                "PASSWORD": env().API_DEFAULT_PASSWORD,
            },
            "AuthFlow": env().API_DEFAULT_AUTHFLOW,
            "ClientId": env().API_DEFAULT_CLIENT_ID
        }
        const res = await pactum.spec()
            .post(env().API_DEFAULT_AUTH_DOMAIN)
            .withHeaders('X-Amz-Target', env().API_DEFAULT_AUTH_X_AMZ_TARGET)
            .withHeaders('Content-Type', env().API_DEFAULT_AUTH_CONTENT_TYPE_HEADER)
            .withBody(jBody)
            .expectStatus(200)
            .returns("AuthenticationResult.AccessToken");
        return String(res);
    }

    async getAccessToken() {
        accessToken = GlobalVar.getInstance().getValue("AccessToken");
        if (!accessToken) {
            accessToken = await this.requestToken();
            GlobalVar.getInstance().addValue("AccessToken", accessToken);
        }
        // console.log(accessToken);
        return accessToken;
    }
    async loadAccessToken(resetToken: boolean = false) {
        if (!fs.existsSync(PATH_TOKEN)) {
            return false;
        }
        if (resetToken) {
            await fs.writeFileSync(PATH_TOKEN, ``);
        }
        let token = fs.readFileSync(PATH_TOKEN, 'utf8');
        if (!token) {
            token = await this.requestToken();
        }
        accessToken = token;
        await fs.writeFileSync(PATH_TOKEN, token);
        pactum.request.setDefaultHeaders(`Authorization`, `Bearer ${token}`);
        console.log("AccessToken " + accessToken);
    }

}